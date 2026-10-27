#!/usr/bin/env python3
"""Force-align an ElevenLabs chapter MP3 to its text for karaoke sync.

Usage:
  export ELEVENLABS_API_KEY=sk_...
  python3 scripts/align-chapter.py 1

Writes: audiobook/bab-01-timing.json
"""

from __future__ import annotations

import json
import os
import ssl
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
API_URL = "https://api.elevenlabs.io/v1/forced-alignment"


def ssl_context() -> ssl.SSLContext:
    try:
        import certifi

        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        context = ssl.create_default_context()
        # Common python.org macOS install: certificates not installed yet.
        try:
            import certifi as _  # noqa: F401
        except Exception:
            pass
        return context


def align_with_curl(audio_path: Path, text: str, api_key: str) -> dict:
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as handle:
        handle.write(text)
        text_file = Path(handle.name)

    try:
        result = subprocess.run(
            [
                "curl",
                "-sS",
                "--fail-with-body",
                "-X",
                "POST",
                API_URL,
                "-H",
                f"xi-api-key: {api_key}",
                "-H",
                "Accept: application/json",
                "-F",
                f"file=@{audio_path};type=audio/mpeg",
                "-F",
                f"text=<{text_file}",
            ],
            check=False,
            capture_output=True,
            text=True,
            timeout=900,
        )
    finally:
        text_file.unlink(missing_ok=True)

    if result.returncode != 0:
        detail = (result.stdout or result.stderr or "").strip()
        raise SystemExit(f"Alignment failed via curl: {detail or result.returncode}")

    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as error:
        raise SystemExit(f"Unexpected response: {result.stdout[:500]}") from error


def align_with_urllib(audio_path: Path, text: str, api_key: str) -> dict:
    boundary = "----pbalignboundary7MA4YWxkTrZu0gW"
    audio_bytes = audio_path.read_bytes()
    text_bytes = text.encode("utf-8")
    body = bytearray()
    body.extend(f"--{boundary}\r\n".encode())
    body.extend(
        f'Content-Disposition: form-data; name="file"; filename="{audio_path.name}"\r\n'.encode()
    )
    body.extend(b"Content-Type: audio/mpeg\r\n\r\n")
    body.extend(audio_bytes)
    body.extend(b"\r\n")
    body.extend(f"--{boundary}\r\n".encode())
    body.extend(b'Content-Disposition: form-data; name="text"\r\n\r\n')
    body.extend(text_bytes)
    body.extend(b"\r\n")
    body.extend(f"--{boundary}--\r\n".encode())

    request = urllib.request.Request(
        API_URL,
        data=bytes(body),
        method="POST",
        headers={
            "xi-api-key": api_key,
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Accept": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=900, context=ssl_context()) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise SystemExit(f"Alignment failed ({error.code}): {detail}") from error
    except urllib.error.URLError as error:
        raise error


def align(chapter_number: int, api_key: str) -> Path:
    if api_key in {"sk_your_key_here", "your_key_here"} or "your_key" in api_key:
        raise SystemExit(
            "Replace sk_your_key_here with your real ElevenLabs API key from Profile → API Key."
        )

    slug = f"{chapter_number:02d}"
    audio_path = ROOT / "audiobook" / f"bab-{slug}.mp3"
    if not audio_path.exists():
        alt = ROOT / "audiobook" / "ElevenLabs_Chapter_1.mp3"
        if chapter_number == 1 and alt.exists():
            audio_path = alt
        else:
            raise SystemExit(f"Missing audio: {audio_path}")

    text_path = ROOT / "chapters" / f"bab-{slug}.txt"
    if not text_path.exists():
        raise SystemExit(f"Missing text: {text_path}")

    text = text_path.read_text(encoding="utf-8").strip()
    print(f"Aligning bab-{slug}: {audio_path.name} ({audio_path.stat().st_size} bytes) + {len(text)} chars")
    print("Using macOS curl (avoids Python SSL cert issues)...")

    try:
        payload = align_with_curl(audio_path, text, api_key)
    except SystemExit:
        raise
    except Exception as error:
        print(f"curl path failed ({error}); trying urllib...")
        try:
            payload = align_with_urllib(audio_path, text, api_key)
        except urllib.error.URLError as url_error:
            raise SystemExit(
                "SSL/network error. Either:\n"
                "  1) Open /Applications/Python 3.13/Install Certificates.command\n"
                "  2) Or ensure curl works: curl -I https://api.elevenlabs.io\n"
                f"Details: {url_error}"
            ) from url_error

    words = [
        {
            "text": word["text"],
            "start": round(float(word["start"]), 3),
            "end": round(float(word["end"]), 3),
            "loss": float(word.get("loss", 0)),
        }
        for word in payload.get("words", [])
    ]
    characters = [
        {
            "text": char["text"],
            "start": round(float(char["start"]), 3),
            "end": round(float(char["end"]), 3),
        }
        for char in payload.get("characters", [])
    ]
    out = {
        "chapter": chapter_number,
        "audio": f"audiobook/bab-{slug}.mp3",
        "sourceText": f"chapters/bab-{slug}.txt",
        "loss": payload.get("loss"),
        "wordCount": len(words),
        "words": words,
        "characters": characters,
    }
    out_path = ROOT / "audiobook" / f"bab-{slug}-timing.json"
    out_path.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {out_path} ({len(words)} words, loss={out['loss']})")
    return out_path


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("Usage: python3 scripts/align-chapter.py <chapter-number>")
    api_key = os.environ.get("ELEVENLABS_API_KEY", "").strip()
    if not api_key:
        raise SystemExit(
            "Set ELEVENLABS_API_KEY first.\n"
            "Example:\n  export ELEVENLABS_API_KEY=sk_...\n  python3 scripts/align-chapter.py 1"
        )
    align(int(sys.argv[1]), api_key)


if __name__ == "__main__":
    main()
