const book = window.BOOK_DATA;
const chapters = book.chapters;

const els = {
  chapterList: document.getElementById("chapterList"),
  chapterTitle: document.getElementById("chapterTitle"),
  chapterDeck: document.getElementById("chapterDeck"),
  chapterCopy: document.getElementById("chapterCopy"),
  chapterNumber: document.getElementById("chapterNumber"),
  chapterIndicator: document.getElementById("chapterIndicator"),
  chapterProgress: document.getElementById("chapterProgress"),
  progressLabel: document.getElementById("progressLabel"),
  contentsPanel: document.getElementById("contentsPanel"),
  searchOverlay: document.getElementById("searchOverlay"),
  searchInput: document.getElementById("searchInput"),
  toast: document.getElementById("toast"),
  audioBadge: document.getElementById("audioBadge"),
  audioPlayer: document.getElementById("audioPlayer"),
  chapterAudio: document.getElementById("chapterAudio"),
  audioChapterNumber: document.getElementById("audioChapterNumber"),
  audioChapterTitle: document.getElementById("audioChapterTitle"),
  audioPrevious: document.getElementById("audioPrevious"),
  audioPlay: document.getElementById("audioPlay"),
  audioNext: document.getElementById("audioNext"),
  audioElapsed: document.getElementById("audioElapsed"),
  audioRemaining: document.getElementById("audioRemaining"),
  audioSeek: document.getElementById("audioSeek"),
  audioSpeed: document.getElementById("audioSpeed"),
  audioMinimize: document.getElementById("audioMinimize"),
  audioRestore: document.getElementById("audioRestore"),
  audioRestoreTitle: document.getElementById("audioRestoreTitle"),
  audioMiniPlay: document.getElementById("audioMiniPlay"),
  audioMiniExpand: document.getElementById("audioMiniExpand"),
};

const STYLES = [
  {
    id: "lontar",
    name: "Lontar",
    blurb: "Naskah daun lontar — gading lembut & hijau tropis",
    colors: ["#f4efe4", "#3f6b4e", "#b08948"],
    themeColor: "#f4efe4",
  },
  {
    id: "batik",
    name: "Batik Indigo",
    blurb: "Biru nila klasik dengan aksen emas",
    colors: ["#f3efe6", "#1e3a6e", "#c4a35a"],
    themeColor: "#f3efe6",
  },
  {
    id: "merapi",
    name: "Merapi",
    blurb: "Malam vulkanik — arang & bara",
    colors: ["#1c1714", "#c45c3e", "#d4a574"],
    themeColor: "#1c1714",
  },
  {
    id: "hijau",
    name: "Hijau Nusantara",
    blurb: "Hutan & bambu — sejuk dan terang",
    colors: ["#eef5ef", "#2f6a4a", "#8a9a4a"],
    themeColor: "#eef5ef",
  },
  {
    id: "borobudur",
    name: "Borobudur",
    blurb: "Batu candi & senja keemasan",
    colors: ["#efe9df", "#6b5344", "#a67c52"],
    themeColor: "#efe9df",
  },
];

const state = {
  chapter: Math.min(Number(localStorage.getItem("pb-chapter") || 0), chapters.length - 1),
  audioChapter: Math.min(Number(localStorage.getItem("pb-chapter") || 0), chapters.length - 1),
  textSize: Number(localStorage.getItem("pb-text-size") || 17),
  karaoke: localStorage.getItem("pb-karaoke") !== "false",
  styleId: localStorage.getItem("pb-style") || "lontar",
  timing: null,
  wordEls: [],
  activeWord: -1,
  toastTimer: null,
  pendingParagraph: null,
  pendingQuery: "",
  freezeKaraokeScroll: false,
};

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitWords(text) {
  return text.match(/\S+|\s+/g) || [];
}

function contentWords(text) {
  return splitWords(text).filter((token) => !/^\s+$/.test(token));
}

function meaningfulTimingWords(words) {
  if (!words?.length) return [];
  return words.filter((word) => word?.text && !/^\s+$/.test(word.text));
}

function normalizeToken(text) {
  return String(text || "").toLowerCase().replace(/[^0-9a-zà-ÿ]+/gi, "");
}

/** Map display tokens to timing words even when ElevenLabs merges verse refs. */
function alignTimingToDisplay(displayTokens, timingWords) {
  const aligned = Array.from({ length: displayTokens.length }, () => null);
  let i = 0;
  let j = 0;

  while (i < displayTokens.length && j < timingWords.length) {
    const display = displayTokens[i];
    const timing = timingWords[j];
    const timingText = timing.text;
    const displayNorm = normalizeToken(display);
    const timingNorm = normalizeToken(timingText);

    if (display === timingText || (displayNorm && displayNorm === timingNorm)) {
      aligned[i] = timing;
      i += 1;
      j += 1;
      continue;
    }

    // Timing token covers multiple display tokens, e.g. "(Ibrani 1:14)"
    if (timingText.includes(" ") || (timingNorm && displayNorm && timingNorm.startsWith(displayNorm) && timingNorm.length > displayNorm.length)) {
      const parts = [i];
      let joinedSpace = display;
      let joinedNoSpace = display;
      let matched = false;
      let k = i;
      while (k + 1 < displayTokens.length) {
        k += 1;
        parts.push(k);
        joinedSpace = parts.map((index) => displayTokens[index]).join(" ");
        joinedNoSpace += displayTokens[k];
        if (
          joinedSpace === timingText
          || normalizeToken(joinedSpace) === timingNorm
          || normalizeToken(joinedNoSpace) === timingNorm
        ) {
          matched = true;
          break;
        }
        const spaceNorm = normalizeToken(joinedSpace);
        const noSpaceNorm = normalizeToken(joinedNoSpace);
        if (timingNorm && !(timingNorm.startsWith(spaceNorm) || timingNorm.startsWith(noSpaceNorm))) {
          parts.pop();
          break;
        }
      }
      if (matched) {
        const total = parts.reduce((sum, index) => sum + Math.max(normalizeToken(displayTokens[index]).length, 1), 0);
        let elapsed = 0;
        parts.forEach((partIndex, partOrder) => {
          const weight = Math.max(normalizeToken(displayTokens[partIndex]).length, 1) / total;
          const start = timing.start + (timing.end - timing.start) * elapsed;
          elapsed += weight;
          const end = partOrder === parts.length - 1
            ? timing.end
            : timing.start + (timing.end - timing.start) * elapsed;
          aligned[partIndex] = { text: displayTokens[partIndex], start, end };
        });
        i = parts[parts.length - 1] + 1;
        j += 1;
        continue;
      }
    }

    // Multiple timing tokens cover one display token, e.g. "6)," ← "6)" + ","
    if (displayNorm && timingNorm && displayNorm.startsWith(timingNorm) && displayNorm.length > timingNorm.length) {
      let start = timing.start;
      let end = timing.end;
      let acc = timingText;
      j += 1;
      while (j < timingWords.length) {
        acc += timingWords[j].text;
        end = timingWords[j].end;
        j += 1;
        if (normalizeToken(acc) === displayNorm || acc === display) break;
        if (!displayNorm.startsWith(normalizeToken(acc))) {
          j -= 1;
          break;
        }
      }
      aligned[i] = { text: display, start, end };
      i += 1;
      continue;
    }

    aligned[i] = timing;
    i += 1;
    j += 1;
  }

  return aligned;
}

function renderSyncedHtml(text, alignedTiming, startWordIndex = 0) {
  if (!alignedTiming?.length) return escapeHtml(text);

  const tokens = splitWords(text);
  let wordIndex = 0;
  return tokens.map((token) => {
    if (/^\s+$/.test(token)) return token;
    const meta = alignedTiming[wordIndex];
    const globalIndex = startWordIndex + wordIndex;
    wordIndex += 1;
    return `<span class="sync-word" data-word="${globalIndex}" data-start="${meta?.start ?? ""}" data-end="${meta?.end ?? ""}">${escapeHtml(token)}</span>`;
  }).join("");
}

function renderParagraphHtml(paragraph, paragraphIndex, alignedTiming, startWordIndex = 0) {
  const id = `p-${paragraphIndex}`;
  if (!alignedTiming?.length) {
    return `<p id="${id}" data-paragraph="${paragraphIndex}">${escapeHtml(paragraph)}</p>`;
  }
  return `<p id="${id}" data-paragraph="${paragraphIndex}">${renderSyncedHtml(paragraph, alignedTiming, startWordIndex)}</p>`;
}

function chapterSearchText(chapter) {
  return `${chapter.title} ${chapter.paragraphs.join(" ")}`.toLocaleLowerCase("id");
}

function renderContents() {
  const query = document.getElementById("chapterSearch").value.trim().toLocaleLowerCase("id");
  const visible = chapters
    .map((chapter, index) => ({ chapter, index }))
    .filter(({ chapter }) => !query || chapterSearchText(chapter).includes(query));

  els.chapterList.innerHTML = visible.length
    ? visible.map(({ chapter, index }) => `
      <li>
        <button class="chapter-link ${index === state.chapter ? "active" : ""}" data-chapter="${index}" ${index === state.chapter ? 'aria-current="page"' : ""}>
          <span class="chapter-link-number">${String(index + 1).padStart(2, "0")}</span>
          <span class="chapter-link-title">${escapeHtml(chapter.title)}${chapter.audio ? ' <em class="has-audio">♪</em>' : ""}</span>
        </button>
      </li>`).join("")
    : '<li class="no-results">Tidak ada bab yang cocok.</li>';
}

async function loadTiming(chapter) {
  state.timing = null;
  if (!chapter.timing) return null;
  try {
    const response = await fetch(chapter.timing);
    if (!response.ok) return null;
    const data = await response.json();
    state.timing = data;
    return data;
  } catch {
    return null;
  }
}

function collectWordElements() {
  state.wordEls = [
    ...els.chapterNumber.querySelectorAll(".sync-word"),
    ...els.chapterTitle.querySelectorAll(".sync-word"),
    ...els.chapterCopy.querySelectorAll(".sync-word"),
  ];
  state.activeWord = -1;
}

function splitSpokenTitle(chapter) {
  const spoken = (chapter.spokenTitle || `Bab ${chapter.number}. ${chapter.title}.`).trim();
  const match = spoken.match(/^(Bab\s+\d+\.)\s*(.+)$/i);
  if (!match) {
    return {
      label: `Bab ${chapter.number}.`,
      title: chapter.title,
      spoken,
    };
  }
  return {
    label: match[1],
    title: match[2].replace(/\.$/, ""),
    spoken,
  };
}

function setActiveWord(index) {
  if (index === state.activeWord) return;
  if (state.activeWord >= 0) {
    state.wordEls[state.activeWord]?.classList.remove("is-speaking");
  }
  state.activeWord = index;
  if (!state.karaoke) return;
  const word = state.wordEls[index];
  if (!word) return;
  word.classList.add("is-speaking");
  if (state.freezeKaraokeScroll) return;
  const rect = word.getBoundingClientRect();
  const topPad = 120;
  const bottomPad = 180;
  if (rect.top < topPad || rect.bottom > window.innerHeight - bottomPad) {
    word.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function clearSearchHits() {
  document.querySelectorAll("mark.search-hit").forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;
    while (mark.firstChild) parent.insertBefore(mark.firstChild, mark);
    parent.removeChild(mark);
    parent.normalize();
  });
  document.querySelectorAll(".search-hit-word").forEach((el) => el.classList.remove("search-hit-word"));
  document.querySelectorAll(".search-flash").forEach((el) => el.classList.remove("search-flash"));
}

function tokensMatch(a, b) {
  if (!a || !b) return false;
  return a === b || a.startsWith(b) || b.startsWith(a);
}

/** Prefer the matched phrase (not the whole paragraph) so tall paragraphs still land on the words. */
function resolveSearchTarget(container, query) {
  if (!container) return null;
  const trimmed = (query || "").trim();
  if (!trimmed) return container;

  const syncWords = [...container.querySelectorAll(".sync-word")];
  if (syncWords.length) {
    const needles = contentWords(trimmed).map((token) => normalizeToken(token)).filter(Boolean);
    if (needles.length) {
      const hay = syncWords.map((el) => normalizeToken(el.textContent));
      for (let i = 0; i <= hay.length - needles.length; i += 1) {
        if (needles.every((needle, offset) => tokensMatch(hay[i + offset], needle))) {
          const hitWords = syncWords.slice(i, i + needles.length);
          hitWords.forEach((el) => el.classList.add("search-hit-word"));
          return hitWords[0];
        }
      }
    }
  }

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const full = nodes.map((node) => node.textContent).join("");
  const index = full.toLocaleLowerCase("id").indexOf(trimmed.toLocaleLowerCase("id"));
  if (index < 0 || !nodes.length) return container;

  const matchLength = trimmed.length;
  let startRemaining = index;
  let endRemaining = index + matchLength;
  let startNode = null;
  let startOffset = 0;
  let endNode = null;
  let endOffset = 0;
  for (const node of nodes) {
    const length = node.textContent.length;
    if (!startNode && startRemaining < length) {
      startNode = node;
      startOffset = startRemaining;
    } else if (!startNode) {
      startRemaining -= length;
    }
    if (!endNode && endRemaining <= length) {
      endNode = node;
      endOffset = endRemaining;
      break;
    }
    endRemaining -= length;
  }
  if (!startNode || !endNode) return container;

  try {
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    const mark = document.createElement("mark");
    mark.className = "search-hit";
    mark.appendChild(range.extractContents());
    range.insertNode(mark);
    return mark;
  } catch {
    return container;
  }
}

function clearSpeakingHighlight() {
  state.wordEls.forEach((el) => el.classList.remove("is-speaking"));
  state.activeWord = -1;
}

function syncHighlight(currentTime) {
  if (!state.karaoke || !state.wordEls.length) return;
  if (state.chapter !== state.audioChapter) return;
  let index = -1;
  for (let i = 0; i < state.wordEls.length; i += 1) {
    const start = Number(state.wordEls[i].dataset.start);
    const end = Number(state.wordEls[i].dataset.end);
    if (Number.isFinite(start) && Number.isFinite(end) && currentTime >= start && currentTime < end) {
      index = i;
      break;
    }
    if (Number.isFinite(start) && currentTime >= start) index = i;
  }
  if (index >= 0) setActiveWord(index);
}

function applyStyle(styleId) {
  const style = STYLES.find((item) => item.id === styleId) || STYLES[0];
  state.styleId = style.id;
  document.body.dataset.style = style.id;
  localStorage.setItem("pb-style", style.id);
  const meta = document.getElementById("themeColorMeta");
  if (meta) meta.content = style.themeColor;
  document.querySelectorAll(".style-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.style === style.id);
  });
}

function setKaraoke(enabled) {
  state.karaoke = Boolean(enabled);
  localStorage.setItem("pb-karaoke", String(state.karaoke));
  document.body.classList.toggle("karaoke-on", state.karaoke);
  document.body.classList.toggle("karaoke-off", !state.karaoke);
  const toggle = document.getElementById("karaokeToggle");
  const setting = document.getElementById("karaokeSetting");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(state.karaoke));
    toggle.textContent = state.karaoke ? "Karaoke" : "Jelajah";
  }
  if (setting) setting.checked = state.karaoke;
  if (!state.karaoke) clearSpeakingHighlight();
  else if (!els.chapterAudio.paused) syncHighlight(els.chapterAudio.currentTime || 0);
}

function updateMediaSession() {
  if (!("mediaSession" in navigator)) return;
  const chapter = chapters[state.audioChapter];
  if (!chapter) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: chapter.title,
    artist: "Ellen G. White",
    album: "Pertentangan Besar",
  });
  navigator.mediaSession.setActionHandler("play", () => { els.chapterAudio.play().catch(() => {}); });
  navigator.mediaSession.setActionHandler("pause", () => { els.chapterAudio.pause(); });
  navigator.mediaSession.setActionHandler("previoustrack", () => changeAudioChapter(-1));
  navigator.mediaSession.setActionHandler("nexttrack", () => changeAudioChapter(1));
  try {
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (typeof details.seekTime === "number") els.chapterAudio.currentTime = details.seekTime;
    });
  } catch {
    /* older browsers */
  }
}

function renderStyleGrid() {
  const grid = document.getElementById("styleGrid");
  if (!grid) return;
  grid.innerHTML = STYLES.map((style) => `
    <button type="button" class="style-card ${style.id === state.styleId ? "active" : ""}" data-style="${style.id}">
      <div class="style-swatches">${style.colors.map((color) => `<span style="background:${color}"></span>`).join("")}</div>
      <strong>${escapeHtml(style.name)}</strong>
      <small>${escapeHtml(style.blurb)}</small>
    </button>
  `).join("");
}

function snippetAround(text, query, radius = 70) {
  const lower = text.toLocaleLowerCase("id");
  const index = lower.indexOf(query);
  if (index < 0) return escapeHtml(text.slice(0, radius * 2)) + (text.length > radius * 2 ? "…" : "");
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + query.length + radius);
  const before = escapeHtml(text.slice(start, index));
  const match = escapeHtml(text.slice(index, index + query.length));
  const after = escapeHtml(text.slice(index + query.length, end));
  return `${start > 0 ? "…" : ""}${before}<mark>${match}</mark>${after}${end < text.length ? "…" : ""}`;
}

function searchBook(query) {
  const normalized = query.trim().toLocaleLowerCase("id");
  if (!normalized) return [];
  const results = [];
  chapters.forEach((chapter, chapterIndex) => {
    if (chapter.title.toLocaleLowerCase("id").includes(normalized)) {
      results.push({
        chapterIndex,
        paragraphIndex: null,
        location: `Bab ${chapterIndex + 1} · Judul`,
        title: chapter.title,
        snippet: escapeHtml(chapter.title),
      });
    }
    chapter.paragraphs.forEach((paragraph, paragraphIndex) => {
      if (!paragraph.toLocaleLowerCase("id").includes(normalized)) return;
      results.push({
        chapterIndex,
        paragraphIndex,
        location: `Bab ${chapterIndex + 1} · Paragraf ${paragraphIndex + 1}`,
        title: chapter.title,
        snippet: snippetAround(paragraph, normalized),
      });
    });
  });
  return results.slice(0, 60);
}

async function jumpToSearchResult(chapterIndex, paragraphIndex, query) {
  state.pendingParagraph = paragraphIndex;
  state.pendingQuery = query || "";
  state.freezeKaraokeScroll = true;
  clearSearchHits();
  els.searchOverlay.hidden = true;
  els.searchInput.value = "";
  await renderChapter(chapterIndex, {
    scroll: false,
    autoplay: false,
    followAudio: false,
  });

  const finish = () => {
    const container = paragraphIndex == null
      ? els.chapterTitle
      : document.getElementById(`p-${paragraphIndex}`);
    state.pendingParagraph = null;
    state.pendingQuery = "";
    if (!container) {
      document.getElementById("reader").scrollIntoView({ behavior: "smooth", block: "start" });
      state.freezeKaraokeScroll = false;
      return;
    }
    const target = resolveSearchTarget(container, query) || container;
    container.classList.add("search-flash");
    const rect = target.getBoundingClientRect();
    const topPad = 120;
    const centerOffset = Math.max(topPad, (window.innerHeight / 2) - (rect.height / 2));
    const nextTop = Math.max(0, window.scrollY + rect.top - centerOffset);
    window.scrollTo({ top: nextTop, behavior: "smooth" });
    window.setTimeout(() => {
      container.classList.remove("search-flash");
      state.freezeKaraokeScroll = false;
    }, 2600);
  };

  window.requestAnimationFrame(() => window.requestAnimationFrame(finish));
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateAudioTimeline() {
  const chapter = chapters[state.audioChapter];
  const duration = Number.isFinite(els.chapterAudio.duration) && els.chapterAudio.duration > 0
    ? els.chapterAudio.duration
    : chapter?.duration || 0;
  const current = els.chapterAudio.currentTime || 0;
  els.audioElapsed.textContent = formatTime(current);
  els.audioRemaining.textContent = `−${formatTime(Math.max(0, duration - current))}`;
  els.audioSeek.value = duration ? String(Math.round((current / duration) * 1000)) : "0";
  syncHighlight(current);
}

function showAudioPlayer(show) {
  els.audioPlayer.hidden = !show;
  document.body.classList.toggle("has-audio-player", show);
  if (!show) {
    els.audioRestore.hidden = true;
    document.body.classList.remove("audio-collapsed");
  }
}

function setAudioCollapsed(collapsed) {
  document.body.classList.toggle("audio-collapsed", collapsed);
  els.audioPlayer.setAttribute("aria-hidden", String(collapsed));
  els.audioRestore.hidden = !collapsed;
}

function setPlaying(isPlaying) {
  els.audioPlayer.classList.toggle("playing", isPlaying);
  els.audioRestore.classList.toggle("playing", isPlaying);
  const label = isPlaying ? "Jeda audiobook" : "Putar audiobook";
  els.audioPlay.setAttribute("aria-label", label);
  els.audioMiniPlay?.setAttribute("aria-label", label);
  if ("mediaSession" in navigator) {
    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  }
}

async function syncAudioChapter(index, { autoplay = false } = {}) {
  const chapter = chapters[index];
  state.audioChapter = index;
  els.audioChapterNumber.textContent = `Bab ${index + 1}`;
  els.audioChapterTitle.textContent = chapter.title;
  els.audioRestoreTitle.textContent = chapter.title;
  els.audioPrevious.disabled = index === 0;
  els.audioNext.disabled = index === chapters.length - 1;
  els.audioBadge.hidden = !chapter.audio;
  updateMediaSession();

  if (!chapter.audio) {
    els.chapterAudio.pause();
    showAudioPlayer(false);
    return;
  }

  showAudioPlayer(true);
  const nextSrc = chapter.audio;
  const currentSrc = els.chapterAudio.getAttribute("src") || "";
  if (!currentSrc.endsWith(nextSrc)) {
    els.chapterAudio.src = nextSrc;
    els.audioElapsed.textContent = "0:00";
    els.audioRemaining.textContent = `−${formatTime(chapter.duration || 0)}`;
  }
  if (autoplay) {
    try {
      await els.chapterAudio.play();
    } catch {
      showToast("Audio belum bisa diputar. Ketuk putar sekali lagi.");
    }
  }
}

async function changeAudioChapter(delta) {
  const next = state.audioChapter + delta;
  if (next < 0 || next >= chapters.length || !chapters[next].audio) return;
  if (state.karaoke) {
    await renderChapter(next, { scroll: true, autoplay: true, followAudio: true });
  } else {
    await syncAudioChapter(next, { autoplay: true });
    showToast(`Audio: Bab ${next + 1}`);
  }
}

async function renderChapter(index, { scroll = true, autoplay = false, followAudio = null } = {}) {
  state.chapter = Math.max(0, Math.min(chapters.length - 1, index));
  const chapter = chapters[state.chapter];
  const { label, title, spoken } = splitSpokenTitle(chapter);
  const shouldFollowAudio = followAudio == null ? state.karaoke : followAudio;

  els.chapterDeck.textContent = state.karaoke
    ? (chapter.audio ? "Audio tersedia — sorot karaoke aktif." : "Audio untuk bab ini belum diekspor.")
    : (chapter.audio ? "Mode jelajah: audio bisa tetap berjalan di latar." : "Audio untuk bab ini belum diekspor.");
  els.chapterIndicator.textContent = `${String(state.chapter + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;
  els.chapterProgress.style.width = `${((state.chapter + 1) / chapters.length) * 100}%`;
  els.progressLabel.textContent = `Bab ${state.chapter + 1} dari ${chapters.length}`;
  document.getElementById("previousTitle").textContent = chapters[state.chapter - 1]?.title || "Awal buku";
  document.getElementById("nextTitle").textContent = chapters[state.chapter + 1]?.title || "Akhir buku";
  document.getElementById("previousChapter").disabled = state.chapter === 0;
  document.getElementById("bottomPrevious").disabled = state.chapter === 0;
  document.getElementById("nextChapter").disabled = state.chapter === chapters.length - 1;
  document.getElementById("bottomNext").disabled = state.chapter === chapters.length - 1;

  const timing = await loadTiming(chapter);
  const timingWords = meaningfulTimingWords(timing?.words);
  const spokenTitleBody = spoken.replace(/^(Bab\s+\d+\.)\s*/i, "");
  const labelTokens = contentWords(label);
  const titleTokens = contentWords(spokenTitleBody);
  const paragraphTokenCounts = chapter.paragraphs.map((paragraph) => contentWords(paragraph).length);
  const displayTokens = [
    ...labelTokens,
    ...titleTokens,
    ...chapter.paragraphs.flatMap((paragraph) => contentWords(paragraph)),
  ];
  const alignedTiming = timingWords.length ? alignTimingToDisplay(displayTokens, timingWords) : [];
  const labelWordCount = labelTokens.length;
  const titleWordCount = titleTokens.length;

  if (alignedTiming.length) {
    els.chapterNumber.innerHTML = renderSyncedHtml(label, alignedTiming.slice(0, labelWordCount), 0);
    els.chapterTitle.innerHTML = renderSyncedHtml(
      spokenTitleBody,
      alignedTiming.slice(labelWordCount, labelWordCount + titleWordCount),
      labelWordCount
    );
  } else {
    els.chapterNumber.textContent = label.replace(/\.$/, "").toUpperCase();
    els.chapterTitle.textContent = title;
  }

  let cursor = labelWordCount + titleWordCount;
  els.chapterCopy.innerHTML = chapter.paragraphs.map((paragraph, paragraphIndex) => {
    if (!alignedTiming.length) return renderParagraphHtml(paragraph, paragraphIndex, null);
    const count = paragraphTokenCounts[paragraphIndex];
    const slice = alignedTiming.slice(cursor, cursor + count);
    const html = renderParagraphHtml(paragraph, paragraphIndex, slice, cursor);
    cursor += count;
    return html;
  }).join("");

  collectWordElements();
  renderContents();
  localStorage.setItem("pb-chapter", String(state.chapter));
  setBookmarkState();

  if (shouldFollowAudio || autoplay) {
    await syncAudioChapter(state.chapter, { autoplay });
  } else {
    els.audioBadge.hidden = !chapters[state.audioChapter]?.audio;
    if (chapters[state.audioChapter]?.audio) showAudioPlayer(true);
  }

  if (scroll && state.pendingParagraph == null) {
    document.getElementById("reader").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setBookmarkState() {
  const bookmarks = JSON.parse(localStorage.getItem("pb-bookmarks") || "[]");
  const saved = bookmarks.includes(state.chapter);
  const button = document.getElementById("bookmarkButton");
  button.classList.toggle("bookmarked", saved);
  button.setAttribute("aria-label", saved ? "Hapus penanda bab" : "Simpan penanda bab");
  button.title = saved ? "Hapus penanda" : "Simpan penanda";
}

function applyTextSize(size) {
  state.textSize = Math.max(14, Math.min(23, size));
  els.chapterCopy.style.setProperty("--reader-size", `${state.textSize}px`);
  localStorage.setItem("pb-text-size", String(state.textSize));
  const label = document.getElementById("settingsTextSize");
  if (label) label.textContent = String(state.textSize);
}

function openContents() { els.contentsPanel.classList.add("open"); }
function closeContents() { els.contentsPanel.classList.remove("open"); }

async function toggleAudiobook() {
  const target = state.karaoke ? state.chapter : state.audioChapter;
  if (!chapters[target]?.audio) {
    if (chapters[state.chapter]?.audio) {
      await syncAudioChapter(state.chapter, { autoplay: true });
      return;
    }
    showToast("Audio untuk bab ini belum tersedia.");
    return;
  }
  if (els.chapterAudio.paused) {
    if (state.karaoke && state.audioChapter !== state.chapter) {
      await syncAudioChapter(state.chapter, { autoplay: true });
      return;
    }
    try {
      await els.chapterAudio.play();
      updateMediaSession();
    } catch {
      showToast("Audio belum bisa diputar.");
    }
  } else {
    els.chapterAudio.pause();
  }
}

els.chapterList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chapter]");
  if (!button) return;
  renderChapter(Number(button.dataset.chapter), { followAudio: state.karaoke });
  closeContents();
});

document.getElementById("contentsToggle").addEventListener("click", openContents);
document.getElementById("closeContents").addEventListener("click", closeContents);
document.getElementById("chapterSearch").addEventListener("input", renderContents);

document.getElementById("startReadingButton").addEventListener("click", () => {
  document.getElementById("reader").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("listenButton").addEventListener("click", async () => {
  await renderChapter(0, { scroll: true, autoplay: true });
});

document.getElementById("previousChapter").addEventListener("click", () => renderChapter(state.chapter - 1, { followAudio: state.karaoke }));
document.getElementById("nextChapter").addEventListener("click", () => renderChapter(state.chapter + 1, { followAudio: state.karaoke }));
document.getElementById("bottomPrevious").addEventListener("click", () => renderChapter(state.chapter - 1, { followAudio: state.karaoke }));
document.getElementById("bottomNext").addEventListener("click", () => renderChapter(state.chapter + 1, { followAudio: state.karaoke }));

document.getElementById("bookmarkButton").addEventListener("click", () => {
  const bookmarks = JSON.parse(localStorage.getItem("pb-bookmarks") || "[]");
  const next = bookmarks.includes(state.chapter)
    ? bookmarks.filter((index) => index !== state.chapter)
    : [...bookmarks, state.chapter];
  localStorage.setItem("pb-bookmarks", JSON.stringify(next));
  setBookmarkState();
  showToast(next.includes(state.chapter) ? "Bab disimpan sebagai penanda." : "Penanda bab dihapus.");
});

document.getElementById("increaseText").addEventListener("click", () => applyTextSize(state.textSize + 1));
document.getElementById("decreaseText").addEventListener("click", () => applyTextSize(state.textSize - 1));
document.getElementById("settingsIncreaseText").addEventListener("click", () => applyTextSize(state.textSize + 1));
document.getElementById("settingsDecreaseText").addEventListener("click", () => applyTextSize(state.textSize - 1));

document.getElementById("settingsButton").addEventListener("click", () => {
  document.getElementById("settingsOverlay").hidden = false;
});
document.getElementById("closeSettings").addEventListener("click", () => {
  document.getElementById("settingsOverlay").hidden = true;
});
document.getElementById("settingsOverlay").addEventListener("click", (event) => {
  if (event.target === document.getElementById("settingsOverlay")) {
    document.getElementById("settingsOverlay").hidden = true;
  }
});
document.getElementById("styleGrid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-style]");
  if (!card) return;
  applyStyle(card.dataset.style);
  showToast(`Gaya ${STYLES.find((s) => s.id === card.dataset.style)?.name || ""} aktif.`);
});
document.getElementById("karaokeSetting").addEventListener("change", (event) => {
  setKaraoke(event.target.checked);
  showToast(state.karaoke ? "Karaoke dinyalakan." : "Mode jelajah: audio tetap bisa berjalan.");
});
document.getElementById("karaokeToggle").addEventListener("click", () => {
  setKaraoke(!state.karaoke);
  showToast(state.karaoke ? "Karaoke dinyalakan." : "Mode jelajah aktif.");
});

document.getElementById("searchButton").addEventListener("click", () => {
  els.searchOverlay.hidden = false;
  els.searchInput.focus();
});
document.getElementById("closeSearch").addEventListener("click", () => { els.searchOverlay.hidden = true; });
els.searchOverlay.addEventListener("click", (event) => {
  if (event.target === els.searchOverlay) els.searchOverlay.hidden = true;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    els.searchOverlay.hidden = true;
    document.getElementById("settingsOverlay").hidden = true;
    closeContents();
  }
});

els.searchInput.addEventListener("input", () => {
  const query = els.searchInput.value.trim();
  const results = document.getElementById("searchResults");
  if (!query) {
    results.innerHTML = '<p class="search-hint">Hasil menampilkan tempat tepat di dalam bab. Ketuk untuk loncat ke sana.</p>';
    return;
  }
  const matches = searchBook(query);
  if (!matches.length) {
    results.innerHTML = '<p class="search-hint">Tidak ada bagian yang cocok.</p>';
    return;
  }
  results.innerHTML = matches.map((match) => `
    <button class="search-result" type="button"
      data-chapter="${match.chapterIndex}"
      data-paragraph="${match.paragraphIndex == null ? "" : match.paragraphIndex}"
      data-query="${escapeHtml(query)}">
      <span class="search-loc">${escapeHtml(match.location)}</span>
      <strong>${escapeHtml(match.title)}</strong>
      <span class="search-snippet">${match.snippet}</span>
    </button>
  `).join("");
});

document.getElementById("searchResults").addEventListener("click", (event) => {
  const result = event.target.closest("[data-chapter]");
  if (!result) return;
  const chapterIndex = Number(result.dataset.chapter);
  const paragraphRaw = result.dataset.paragraph;
  const paragraphIndex = paragraphRaw === "" ? null : Number(paragraphRaw);
  jumpToSearchResult(chapterIndex, paragraphIndex, result.dataset.query || els.searchInput.value.trim());
});

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = {
    title: `${chapters[state.chapter].title} — Pertentangan Besar`,
    text: "Baca Pertentangan Besar.",
  };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareData.title}\n${window.location.href}`);
      showToast("Tautan bacaan disalin.");
    } else showToast("Fitur berbagi tidak tersedia pada perangkat ini.");
  } catch (error) {
    if (error.name !== "AbortError") showToast("Tautan belum dapat dibagikan.");
  }
});

els.audioPlay.addEventListener("click", toggleAudiobook);
els.audioPrevious.addEventListener("click", () => changeAudioChapter(-1));
els.audioNext.addEventListener("click", () => changeAudioChapter(1));
els.audioSeek.addEventListener("input", () => {
  const chapter = chapters[state.audioChapter];
  const duration = els.chapterAudio.duration || chapter?.duration || 0;
  els.chapterAudio.currentTime = (Number(els.audioSeek.value) / 1000) * duration;
});
els.audioSpeed.addEventListener("change", () => {
  els.chapterAudio.playbackRate = Number(els.audioSpeed.value);
  localStorage.setItem("pb-audio-speed", els.audioSpeed.value);
});
els.audioMinimize.addEventListener("click", () => setAudioCollapsed(true));
els.audioMiniExpand.addEventListener("click", () => setAudioCollapsed(false));
els.audioMiniPlay.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAudiobook();
});
els.chapterAudio.addEventListener("play", () => {
  setPlaying(true);
  updateMediaSession();
});
els.chapterAudio.addEventListener("pause", () => setPlaying(false));
els.chapterAudio.addEventListener("timeupdate", updateAudioTimeline);
els.chapterAudio.addEventListener("loadedmetadata", updateAudioTimeline);
els.chapterAudio.addEventListener("ended", () => {
  const next = state.audioChapter + 1;
  if (next < chapters.length && chapters[next].audio) {
    changeAudioChapter(1);
  } else {
    setPlaying(false);
  }
});
els.chapterAudio.addEventListener("error", () => {
  setPlaying(false);
  showToast("File audio bab ini tidak dapat dimuat.");
});

// Keep listening when the screen locks / tab hides (do not auto-pause).
document.addEventListener("visibilitychange", () => {
  if (document.hidden) return;
  if (!els.chapterAudio.paused) updateMediaSession();
});

window.addEventListener("scroll", () => {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const progress = available > 0 ? (window.scrollY / available) * 100 : 0;
  document.getElementById("progressBar").style.width = `${progress}%`;
}, { passive: true });

renderStyleGrid();
applyStyle(state.styleId);
setKaraoke(state.karaoke);

const savedSpeed = localStorage.getItem("pb-audio-speed") || "1";
els.audioSpeed.value = savedSpeed;
els.chapterAudio.playbackRate = Number(savedSpeed);
applyTextSize(state.textSize);
renderChapter(state.chapter, { scroll: false, followAudio: true });
