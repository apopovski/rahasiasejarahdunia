# ElevenLabs input — Pertentangan Besar

Voice: **BonaErwin - Bahasa Indonesia**

## Folders

| Path | Use |
|------|-----|
| `chapters/` | Full chapter text (one file each). Best for ElevenLabs **Projects / Studio**. |
| `chunks/` | Same text split under ~4500 characters. Best for **TTS API** (`with-timestamps`). |
| `manifest.json` | Index of all files, sizes, and chunk maps. |
| `book.json` | Structured paragraphs for the reader app (highlight/scroll). |

## Suggested workflow

1. In ElevenLabs, select voice **BonaErwin - Bahasa Indonesia**.
2. For API: send each file in `chunks/` to  
   `POST /v1/text-to-speech/{voice_id}/with-timestamps`  
   Save audio + alignment JSON per chunk.
3. For Studio: upload or paste each `chapters/bab-XX.txt`.
4. Keep `book.json` paragraph text identical to what was spoken so highlighting can align.

## Notes

- Drop caps from the print layout (`B` + `agi` → `Bagi`) are fixed.
- Layout hyphen breaks (`diungkap-kan` → `diungkapkan`) are cleaned; real reduplication (`orang-orang`) is kept.
- Each chapter file starts with a short spoken title: `Bab N. Title.`
