const legacyChapterTitles = [
  '“God With Us”',
  "The Chosen People",
  '“The Fullness of the Time”',
  "Unto You a Saviour",
  "The Dedication",
  '“We Have Seen His Star”',
  "As a Child",
  "The Passover Visit",
  "Days of Conflict",
  "The Voice in the Wilderness",
  "The Baptism",
  "The Temptation",
  "The Victory",
  '“We Have Found the Messias”',
  "At the Marriage Feast",
  "In His Temple",
  "Nicodemus",
  '“He Must Increase”',
  "At Jacob’s Well",
  '“Except Ye See Signs and Wonders”',
  "Bethesda and the Sanhedrin",
  "Imprisonment and Death of John",
  '“The Kingdom of God Is at Hand”',
  '“Is Not This the Carpenter’s Son?”',
  "The Call by the Sea",
  "At Capernaum",
  '“Thou Canst Make Me Clean”',
  "Levi-Matthew",
  "The Sabbath",
  '“He Ordained Twelve”',
  "The Sermon on the Mount",
  "The Centurion",
  "Who Are My Brethren?",
  "The Invitation",
  '“Peace, Be Still”',
  "The Touch of Faith",
  "The First Evangelists",
  "Come Rest Awhile",
  '“Give Ye Them to Eat”',
  "A Night on the Lake",
  "The Crisis in Galilee",
  "Tradition",
  "Barriers Broken Down",
  "The True Sign",
  "The Foreshadowing of the Cross",
  "He Was Transfigured",
  "Ministry",
  "Who Is the Greatest?",
  "At the Feast of Tabernacles",
  "Among Snares",
  '“The Light of Life”',
  "The Divine Shepherd",
  "The Last Journey From Galilee",
  "The Good Samaritan",
  "Not With Outward Show",
  "Blessing the Children",
  '“One Thing Thou Lackest”',
  '“Lazarus, Come Forth”',
  "Priestly Plottings",
  "The Law of the New Kingdom",
  "Zacchaeus",
  "The Feast at Simon’s House",
  '“Thy King Cometh”',
  "A Doomed People",
  "The Temple Cleansed Again",
  "Controversy",
  "Woes on the Pharisees",
  "In the Outer Court",
  "On the Mount of Olives",
  '“The Least of These My Brethren”',
  "A Servant of Servants",
  '“In Remembrance of Me”',
  '“Let Not Your Heart Be Troubled”',
  "Gethsemane",
  "Before Annas and the Court of Caiaphas",
  "Judas",
  "In Pilate’s Judgment Hall",
  "Calvary",
  '“It Is Finished”',
  "In Joseph’s Tomb",
  '“The Lord Is Risen”',
  '“Why Weepest Thou?”',
  "The Walk to Emmaus",
  '“Peace Be Unto You”',
  "By the Sea Once More",
  "Go Teach All Nations",
  '“To My Father, and Your Father”',
];

const importedChapters = window.DESIRE_OF_AGES_CHAPTERS;
const audiobookTracks = window.DESIRE_OF_AGES_AUDIO;

if (!Array.isArray(importedChapters) || importedChapters.length !== 87) {
  throw new Error("The complete Desire of Ages chapter data could not be loaded.");
}

if (!Array.isArray(audiobookTracks) || audiobookTracks.length !== 87) {
  throw new Error("The Desire of Ages audiobook data could not be loaded.");
}

const chapters = importedChapters.map((chapter) => chapter.title);

const chapterDetails = {
  0: {
    scripture: "This chapter is based on Matthew 1:23; John 1:14.",
    paragraphs: [
      "His name shall be called Immanuel, … God with us. The light of the knowledge of the glory of God is seen in the face of Jesus Christ. From the days of eternity the Lord Jesus Christ was one with the Father; He was the image of God, the image of His greatness and majesty, the outshining of His glory.",
      "By coming to dwell with us, Jesus was to reveal God both to humanity and to angels. He was the Word of God—God’s thought made audible. In His prayer for His disciples He says, “I have declared unto them Thy name”—merciful and gracious, long-suffering, and abundant in goodness and truth—“that the love wherewith Thou hast loved Me may be in them, and I in them.”",
      "But not alone for His earthborn children was this revelation given. Our little world is the lesson book of the universe. God’s wonderful purpose of grace, the mystery of redeeming love, is the theme into which angels desire to look, and it will be their study throughout endless ages.",
      "Through Christ’s redeeming work the government of God stands justified. The Omnipotent One is made known as the God of love. The charges of the adversary are refuted, and his character unveiled. Rebellion can never again arise. Sin can never again enter the universe. Through eternal ages all are secure from apostasy.",
      "In taking our nature, the Saviour has bound Himself to humanity by a tie that is never to be broken. Through the eternal ages He is linked with us. “God so loved the world, that He gave His only-begotten Son.” He gave Him not only to bear our sins, and to die as our sacrifice; He gave Him to the fallen race.",
    ],
  },
  1: {
    scripture: "This chapter reflects on Israel’s calling and the hope of the promised Messiah.",
    paragraphs: [
      "For more than a thousand years the Jewish people had awaited the Saviour’s coming. Upon this event they had rested their brightest hopes. In song and prophecy, in temple rite and household prayer, they had enshrined His name.",
      "God had called Israel to preserve among humanity the knowledge of His law and of the symbols and prophecies that pointed to the Saviour. He desired them to be as wells of salvation to the world. What Abraham was in the land of his sojourn, what Joseph was in Egypt, and Daniel in the courts of Babylon, the Hebrew people were to be among the nations.",
      "Yet faith had grown dim and hope had narrowed into earthly ambition. The people looked for a deliverer from national power rather than a deliverer from sin. Still, among them were steadfast souls who treasured the promise and waited for the consolation of Israel.",
    ],
  },
  2: {
    scripture: "This chapter is based on Galatians 4:4 and the providence surrounding Christ’s birth.",
    paragraphs: [
      "When the fullness of the time was come, God sent forth His Son. Providence had directed the movements of nations and the tide of human impulse and influence until the world was ripe for the coming of the Deliverer.",
      "The nations were united under one government. One language was widely spoken and was everywhere recognized as the language of literature. From all lands the Jews of the dispersion gathered to Jerusalem to the annual feasts, and as these returned to the places of their sojourn they could spread throughout the world the tidings of the Messiah’s coming.",
      "At this time the systems of heathenism were losing their hold upon the people. Humanity was weary of pageant and fable. They longed for a religion that could satisfy the heart. Then Jesus came to restore in humanity the image of its Maker.",
    ],
  },
  3: {
    scripture: "This chapter is based on Luke 2:1–20.",
    paragraphs: [
      "The King of glory stooped low to take humanity. His earthly surroundings were rude and forbidding. His glory was veiled, that the majesty of His outward form might not become an object of attraction. He shunned all outward display.",
      "Above the hills of Bethlehem the heavens opened, and an innumerable company of angels revealed the praise that had filled heaven. To humble shepherds came the announcement: “Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people.”",
      "Heaven and earth were no wider apart today than when shepherds listened to the angels’ song. Humanity is still as much the object of heaven’s solicitude as when ordinary people met angels at noonday and talked with heavenly messengers in the vineyards and fields.",
    ],
  },
  30: {
    scripture: "This chapter is based on Matthew 5–7.",
    paragraphs: [
      "Christ seldom gathered His disciples alone to receive His words. He did not choose for His audience only those who knew the way of life. It was His work to reach the multitudes who were in ignorance and error.",
      "The Beatitudes were His greeting to the whole human family. Looking upon the vast throng gathered to hear the Sermon on the Mount, He seemed for the moment to have forgotten that He was not in heaven, and He used the familiar salutation of the world of light.",
      "The words of Christ contain nothing that is nonessential. The Sermon on the Mount is heaven’s benediction to the world, a voice from the throne of God. It was given to humanity to be the law of duty and the light of heaven, their hope and consolation in despondency.",
    ],
  },
  77: {
    scripture: "This chapter is based on Matthew 27:31–53; Mark 15:20–38; Luke 23:26–46; John 19:16–30.",
    paragraphs: [
      "A vast multitude followed Jesus from the judgment hall to Calvary. The news of His condemnation had spread throughout Jerusalem, and people of all classes and ranks flocked toward the place of crucifixion.",
      "To the angels and the unfallen worlds the cry, “It is finished,” had a deep significance. It was for them as well as for us that the great work of redemption had been accomplished. They with us share the fruits of Christ’s victory.",
      "Christ did not yield up His life until He had accomplished the work which He came to do, and with His parting breath He exclaimed, “It is finished.” The battle had been won. His right hand and His holy arm had gotten Him the victory.",
    ],
  },
  80: {
    scripture: "This chapter is based on Matthew 28:2–15; Mark 16:1–11; Luke 24:1–12; John 20:1–18.",
    paragraphs: [
      "The night of the first day of the week had worn slowly away. The darkest hour, just before daybreak, had come. Christ was still a prisoner in His narrow tomb. The great stone was in its place; the Roman seal was unbroken; the Roman guards were keeping their watch.",
      "Suddenly there is an earthquake. The heavens seem to open, and from them descends an angel clothed with the armor of God. The countenance of the heavenly messenger is like lightning, and his garments white as snow.",
      "The voice that cried from the cross, “It is finished,” was heard among the dead. It pierced the walls of sepulchers and summoned the sleepers to arise. So will it be when the voice of Christ shall be heard from heaven at the final resurrection.",
    ],
  },
};

const genericParagraphs = (title, number) => [
  `In chapter ${number}, ${title}, the story of Jesus unfolds through moments of teaching, healing, conflict, and compassion. Ellen G. White invites the reader to look beyond the event itself and see the character of God revealed in Christ.`,
  "The Gospel record is presented not as distant history, but as a living appeal. In every encounter, Christ meets human need with truth and grace—calling the proud to humility, the burdened to rest, and the searching heart to faith.",
  "This chapter belongs to a larger portrait: the Son of God walking among humanity, bearing its sorrow and revealing a kingdom built not by force, but by self-giving love.",
];

const initialUrl = new URL(window.location.href);
const linkedChapter = Number.parseInt(initialUrl.searchParams.get("chapter") || "", 10);
const linkedQuote = initialUrl.searchParams.get("quote");
const linkedParagraph = initialUrl.searchParams.get("paragraph");

const state = {
  chapter: Number.isInteger(linkedChapter)
    ? linkedChapter - 1
    : Number.parseInt(localStorage.getItem("da-current-chapter") || "0", 10),
  fontSize: Number.parseInt(localStorage.getItem("da-font-size") || "19", 10),
  bookmarks: JSON.parse(localStorage.getItem("da-bookmarks") || "[]"),
  audioChapter: -1,
  pendingHighlight: linkedQuote,
  pendingParagraph: linkedParagraph,
  selectedQuote: "",
  selectedReference: "",
  selectedParagraph: "",
  shareUrl: "",
};

if (!Number.isInteger(state.chapter) || state.chapter < 0 || state.chapter >= chapters.length) {
  state.chapter = 0;
}

const elements = {
  body: document.body,
  chapterList: document.querySelector("#chapterList"),
  chapterSearch: document.querySelector("#chapterSearch"),
  chapterNumber: document.querySelector("#chapterNumber"),
  chapterTitle: document.querySelector("#chapterTitle"),
  chapterPermalink: document.querySelector("#chapterPermalink"),
  canonicalLink: document.querySelector("#canonicalLink"),
  chapterBody: document.querySelector("#chapterBody"),
  chapterCount: document.querySelector("#chapterCount"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton"),
  previousFooter: document.querySelector("#previousChapterFooter"),
  nextFooter: document.querySelector("#nextChapterFooter"),
  previousTitle: document.querySelector("#previousTitle"),
  nextTitle: document.querySelector("#nextTitle"),
  progressBar: document.querySelector("#progressBar"),
  bookmarkButton: document.querySelector("#bookmarkButton"),
  contentsButton: document.querySelector("#contentsButton"),
  closeRailButton: document.querySelector("#closeRailButton"),
  overlay: document.querySelector("#overlay"),
  themeButton: document.querySelector("#themeButton"),
  readerListenButton: document.querySelector("#readerListenButton"),
  readerAudioDuration: document.querySelector("#readerAudioDuration"),
  toast: document.querySelector("#toast"),
  reader: document.querySelector("#reader"),
  selectionShare: document.querySelector("#selectionShare"),
  shareBackdrop: document.querySelector("#shareBackdrop"),
  shareQuote: document.querySelector("#shareQuote"),
  shareCitation: document.querySelector("#shareCitation"),
  closeShareButton: document.querySelector("#closeShareButton"),
  nativeShareButton: document.querySelector("#nativeShareButton"),
  shareX: document.querySelector("#shareX"),
  shareFacebook: document.querySelector("#shareFacebook"),
  shareWhatsApp: document.querySelector("#shareWhatsApp"),
  copyShareLink: document.querySelector("#copyShareLink"),
  audioPlayer: document.querySelector("#audioPlayer"),
  chapterAudio: document.querySelector("#chapterAudio"),
  audioChapterNumber: document.querySelector("#audioChapterNumber"),
  audioChapterTitle: document.querySelector("#audioChapterTitle"),
  audioPrevious: document.querySelector("#audioPrevious"),
  audioPlay: document.querySelector("#audioPlay"),
  audioNext: document.querySelector("#audioNext"),
  audioElapsed: document.querySelector("#audioElapsed"),
  audioRemaining: document.querySelector("#audioRemaining"),
  audioSeek: document.querySelector("#audioSeek"),
  audioSpeed: document.querySelector("#audioSpeed"),
  audioMinimize: document.querySelector("#audioMinimize"),
  audioRestore: document.querySelector("#audioRestore"),
  audioRestoreTitle: document.querySelector("#audioRestoreTitle"),
};

function getChapterDetails(index) {
  const chapter = importedChapters[index];
  if (!chapter) {
    throw new Error(`Chapter ${index + 1} is missing from the imported book data.`);
  }
  return chapter;
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );
}

function getSearchSnippet(text, query) {
  const matchIndex = text.toLowerCase().indexOf(query.toLowerCase());
  if (matchIndex < 0) return "";
  const start = Math.max(0, matchIndex - 48);
  const end = Math.min(text.length, matchIndex + query.length + 72);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  const before = escapeHtml(text.slice(start, matchIndex));
  const match = escapeHtml(text.slice(matchIndex, matchIndex + query.length));
  const after = escapeHtml(text.slice(matchIndex + query.length, end));
  return `${prefix}${before}<mark>${match}</mark>${after}${suffix}`;
}

function renderChapterList(query = "") {
  const trimmedQuery = query.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();
  const matches = chapters
    .map((title, index) => {
      const details = getChapterDetails(index);
      const content = details.paragraphs.map((paragraph) => paragraph.text).join(" ");
      const titleMatches = `${index + 1} ${title}`.toLowerCase().includes(normalizedQuery);
      const contentMatches = content.toLowerCase().includes(normalizedQuery);
      return {
        title,
        index,
        matches: !normalizedQuery || titleMatches || contentMatches,
        snippet: normalizedQuery && contentMatches ? getSearchSnippet(content, trimmedQuery) : "",
      };
    })
    .filter(({ matches: isMatch }) => isMatch);

  if (!matches.length) {
    elements.chapterList.innerHTML = '<p class="no-results">No titles or passages match your search.</p>';
    return;
  }

  elements.chapterList.innerHTML = matches
    .map(
      ({ title, index, snippet }) => `
        <button
          class="chapter-item ${index === state.chapter ? "active" : ""}"
          type="button"
          data-chapter="${index}"
          data-highlight="${snippet ? encodeURIComponent(trimmedQuery) : ""}"
        >
          <span class="index">${String(index + 1).padStart(2, "0")}</span>
          <span>
            <span class="title">${title}</span>
            ${snippet ? `<span class="match-snippet">${snippet}</span>` : ""}
          </span>
        </button>
      `,
    )
    .join("");
}

function getChapterPermalink(index) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("chapter", String(index + 1));
  return url.toString();
}

function renderChapter({ scroll = false, historyMode = "" } = {}) {
  const index = state.chapter;
  const details = getChapterDetails(index);
  const permalink = getChapterPermalink(index);

  elements.chapterNumber.textContent = `Chapter ${index + 1}`;
  elements.chapterTitle.textContent = chapters[index];
  elements.chapterPermalink.href = permalink;
  elements.chapterPermalink.setAttribute("aria-label", `Permalink to chapter ${index + 1}: ${chapters[index]}`);
  const hasChapterUrl = new URL(window.location.href).searchParams.has("chapter") || Boolean(historyMode);
  elements.canonicalLink.href = hasChapterUrl ? permalink : new URL(".", window.location.href).toString();
  document.title = hasChapterUrl ? `${chapters[index]} | The Desire of Ages` : "The Desire of Ages | Ellen G. White";
  if (historyMode === "push") {
    window.history.pushState({ chapter: index + 1 }, "", permalink);
  } else if (historyMode === "replace") {
    window.history.replaceState({ chapter: index + 1 }, "", permalink);
  }
  elements.chapterBody.innerHTML = `
    ${details.paragraphs
      .map(
        (paragraph) => `
          <p id="paragraph-${paragraph.id.replace(".", "-")}">
            <span class="paragraph-text">${escapeHtml(paragraph.text)}</span>
            <span class="paragraph-reference">${escapeHtml(paragraph.ref)}</span>
          </p>
        `,
      )
      .join("")}
  `;
  elements.chapterCount.textContent = `${String(index + 1).padStart(2, "0")} / ${chapters.length}`;
  elements.progressBar.style.width = `${((index + 1) / chapters.length) * 100}%`;
  elements.previousButton.disabled = index === 0;
  elements.previousFooter.disabled = index === 0;
  elements.nextButton.disabled = index === chapters.length - 1;
  elements.nextFooter.disabled = index === chapters.length - 1;
  elements.previousTitle.textContent = index > 0 ? chapters[index - 1] : "Book introduction";
  elements.nextTitle.textContent = index < chapters.length - 1 ? chapters[index + 1] : "End of book";
  elements.bookmarkButton.classList.toggle("active", state.bookmarks.includes(index));
  elements.bookmarkButton.setAttribute(
    "aria-label",
    state.bookmarks.includes(index) ? "Remove chapter bookmark" : "Bookmark chapter",
  );

  localStorage.setItem("da-current-chapter", String(index));
  renderChapterList(elements.chapterSearch.value);
  syncAudioChapter(index);

  if (state.pendingHighlight) {
    const quote = state.pendingHighlight;
    state.pendingHighlight = "";
    const paragraph = state.pendingParagraph;
    state.pendingParagraph = "";
    window.requestAnimationFrame(() => highlightPassage(quote, paragraph));
  } else if (scroll) {
    elements.reader.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function changeChapter(delta) {
  const nextChapter = state.chapter + delta;
  if (nextChapter < 0 || nextChapter >= chapters.length) return;
  state.chapter = nextChapter;
  state.pendingHighlight = "";
  renderChapter({ scroll: true, historyMode: "push" });
}

function createTextMap(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const positions = [];
  let normalized = "";
  let previousWasSpace = true;
  let node;

  while ((node = walker.nextNode())) {
    for (let offset = 0; offset < node.data.length; offset += 1) {
      const character = node.data[offset];
      if (/\s/.test(character)) {
        if (!previousWasSpace && normalized.length) {
          normalized += " ";
          positions.push({ node, offset });
          previousWasSpace = true;
        }
      } else {
        normalized += character;
        positions.push({ node, offset });
        previousWasSpace = false;
      }
    }
  }

  return { normalized: normalized.trim(), positions };
}

function highlightPassage(quote, paragraphId = "") {
  if (!quote) return false;
  const normalizedQuote = quote.replace(/\s+/g, " ").trim();
  const { normalized, positions } = createTextMap(elements.chapterBody);
  const matchIndex = normalized.toLowerCase().indexOf(normalizedQuote.toLowerCase());
  if (matchIndex < 0 || !positions[matchIndex]) {
    const paragraph = paragraphId ? document.querySelector(`#paragraph-${CSS.escape(paragraphId.replace(".", "-"))}`) : null;
    paragraph?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }

  const endIndex = matchIndex + normalizedQuote.length - 1;
  const start = positions[matchIndex];
  const end = positions[Math.min(endIndex, positions.length - 1)];
  const range = document.createRange();
  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset + 1);

  if (window.CSS?.highlights && window.Highlight) {
    CSS.highlights.clear();
    CSS.highlights.set("shared-quote", new Highlight(range));
  } else if (start.node === end.node) {
    const mark = document.createElement("mark");
    mark.className = "shared-quote-fallback";
    range.surroundContents(mark);
  }

  const target = range.getBoundingClientRect();
  window.scrollTo({
    top: window.scrollY + target.top - 150,
    behavior: "smooth",
  });
  return true;
}

function openRail(focusSearch = false) {
  if (window.innerWidth > 800) {
    elements.reader.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    elements.body.classList.add("rail-open");
  }
  if (focusSearch) {
    window.setTimeout(() => elements.chapterSearch.focus(), 250);
  }
}

function closeRail() {
  elements.body.classList.remove("rail-open");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function buildShareUrl(quote) {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("chapter", String(state.chapter + 1));
  url.searchParams.set("quote", quote);
  if (state.selectedParagraph) {
    url.searchParams.set("paragraph", state.selectedParagraph);
  }
  url.hash = "quote";
  return url.toString();
}

function closeShareDialog() {
  elements.shareBackdrop.classList.remove("open");
}

function expandReference(reference) {
  const match = reference.match(/^DA\s+(\d+)\.(\d+)$/i);
  if (!match) return "The Desire of Ages";
  return `The Desire of Ages, p. ${match[1]}, par. ${match[2]}`;
}

function getShareContent({ includeLink = false } = {}) {
  const citation = expandReference(state.selectedReference);
  const lines = [`“${state.selectedQuote}”`, `— ${citation}`];
  if (includeLink) lines.push(state.shareUrl);
  return lines.join("\n\n");
}

function openShareDialog() {
  if (!state.selectedQuote) return;
  state.shareUrl = buildShareUrl(state.selectedQuote);
  const shareText = getShareContent();
  elements.shareQuote.textContent = `“${state.selectedQuote}”`;
  elements.shareCitation.textContent = `— ${expandReference(state.selectedReference)}`;
  elements.shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(state.shareUrl)}`;
  elements.shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(state.shareUrl)}`;
  elements.shareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${state.shareUrl}`)}`;
  elements.shareBackdrop.classList.add("open");
  elements.selectionShare.classList.remove("visible");
  window.getSelection()?.removeAllRanges();
  elements.closeShareButton.focus();
}

function updateSelectionShare() {
  if (elements.shareBackdrop.classList.contains("open")) return;
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !selection.rangeCount) {
    elements.selectionShare.classList.remove("visible");
    return;
  }

  const range = selection.getRangeAt(0);
  const selectionNode =
    range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentElement
      : range.commonAncestorContainer;
  const quote = selection.toString().replace(/\s+/g, " ").trim();

  if (!selectionNode || !elements.chapterBody.contains(selectionNode) || quote.length < 3) {
    elements.selectionShare.classList.remove("visible");
    return;
  }

  state.selectedQuote = quote.slice(0, 500);
  const paragraph = selectionNode.closest("p");
  state.selectedReference = paragraph?.querySelector(".paragraph-reference")?.textContent.trim() || "";
  state.selectedParagraph = paragraph?.id.replace("paragraph-", "").replace("-", ".") || "";
  const rect = range.getBoundingClientRect();
  elements.selectionShare.style.left = `${Math.max(12, Math.min(window.innerWidth - 135, rect.left + rect.width / 2 - 58))}px`;
  elements.selectionShare.style.top = `${Math.max(12, Math.min(window.innerHeight - 52, rect.bottom + 9))}px`;
  elements.selectionShare.classList.add("visible");
}

async function shareNatively() {
  const shareData = {
    title: `${chapters[state.chapter]} — The Desire of Ages`,
    text: getShareContent(),
    url: state.shareUrl,
  };

  const canUseNativeShare =
    typeof navigator.share === "function" &&
    (typeof navigator.canShare !== "function" || navigator.canShare(shareData));

  if (canUseNativeShare) {
    try {
      await navigator.share(shareData);
      closeShareDialog();
    } catch (error) {
      if (error.name !== "AbortError") {
        await copyShareLink("Safari could not open sharing. Quote and link copied instead.");
      }
    }
    return;
  }

  await copyShareLink("Native sharing is unavailable. Quote and link copied instead.");
}

function copyTextFallback(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);
  const copied = document.execCommand("copy");
  textArea.remove();
  return copied;
}

async function copyShareLink(successMessage = "Quote link copied") {
  let copied = false;
  const shareContent = getShareContent({ includeLink: true });

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareContent);
      copied = true;
    }
  } catch {
    copied = false;
  }

  if (!copied) {
    copied = copyTextFallback(shareContent);
  }

  if (copied) {
    showToast(successMessage === "Quote link copied" ? "Quote and link copied" : successMessage);
    closeShareDialog();
  } else {
    showToast("Could not copy the link");
  }
}

function toggleBookmark() {
  const bookmarkIndex = state.bookmarks.indexOf(state.chapter);
  if (bookmarkIndex >= 0) {
    state.bookmarks.splice(bookmarkIndex, 1);
    showToast("Bookmark removed");
  } else {
    state.bookmarks.push(state.chapter);
    showToast("Chapter bookmarked");
  }
  localStorage.setItem("da-bookmarks", JSON.stringify(state.bookmarks));
  renderChapter();
}

function formatAudioTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const rounded = Math.floor(seconds);
  const minutes = Math.floor(rounded / 60);
  return `${minutes}:${String(rounded % 60).padStart(2, "0")}`;
}

function updateAudioTimeline() {
  const duration =
    Number.isFinite(elements.chapterAudio.duration) && elements.chapterAudio.duration > 0
      ? elements.chapterAudio.duration
      : audiobookTracks[state.audioChapter]?.duration || 0;
  const currentTime = elements.chapterAudio.currentTime || 0;
  elements.audioElapsed.textContent = formatAudioTime(currentTime);
  elements.audioRemaining.textContent = `−${formatAudioTime(Math.max(0, duration - currentTime))}`;
  elements.audioSeek.value = duration ? String(Math.round((currentTime / duration) * 1000)) : "0";
}

function syncAudioChapter(index, autoplay = false) {
  if (state.audioChapter === index) {
    if (autoplay) playAudiobook();
    return;
  }

  const wasPlaying = !elements.chapterAudio.paused;
  state.audioChapter = index;
  elements.chapterAudio.src = audiobookTracks[index].url;
  elements.audioChapterNumber.textContent = `Chapter ${index + 1}`;
  elements.audioChapterTitle.textContent = chapters[index];
  elements.audioRestoreTitle.textContent = chapters[index];
  elements.audioPrevious.disabled = index === 0;
  elements.audioNext.disabled = index === chapters.length - 1;
  elements.audioSeek.value = "0";
  elements.audioElapsed.textContent = "0:00";
  elements.audioRemaining.textContent = `−${formatAudioTime(audiobookTracks[index].duration)}`;
  elements.readerAudioDuration.textContent = `${Math.round(audiobookTracks[index].duration / 60)} min`;
  elements.readerListenButton.classList.remove("playing");

  if (autoplay || wasPlaying) {
    playAudiobook();
  }
}

async function playAudiobook() {
  try {
    await elements.chapterAudio.play();
  } catch {
    showToast("The audiobook could not start. Please try again.");
  }
}

function toggleAudiobook() {
  if (elements.chapterAudio.paused) {
    playAudiobook();
  } else {
    elements.chapterAudio.pause();
  }
}

function setAudioPlaying(isPlaying) {
  elements.audioPlayer.classList.toggle("playing", isPlaying);
  elements.audioRestore.classList.toggle("playing", isPlaying);
  elements.readerListenButton.classList.toggle("playing", isPlaying);
  elements.audioPlay.setAttribute("aria-label", isPlaying ? "Pause audiobook" : "Play audiobook");
}

function setAudioCollapsed(isCollapsed, moveFocus = true) {
  elements.body.classList.toggle("audio-collapsed", isCollapsed);
  elements.audioPlayer.setAttribute("aria-hidden", String(isCollapsed));
  elements.audioPlayer.inert = isCollapsed;
  elements.audioRestore.setAttribute("aria-hidden", String(!isCollapsed));
  localStorage.setItem("da-audio-collapsed", String(isCollapsed));
  if (!moveFocus) return;
  if (isCollapsed) {
    elements.audioRestore.focus();
  } else {
    elements.audioMinimize.focus();
  }
}

function changeAudioChapter(delta) {
  const nextChapter = state.audioChapter + delta;
  if (nextChapter < 0 || nextChapter >= chapters.length) return;
  state.chapter = nextChapter;
  renderChapter({ scroll: true, historyMode: "push" });
  syncAudioChapter(nextChapter, true);
}

function setTheme(isDark) {
  elements.body.classList.toggle("dark", isDark);
  elements.themeButton.setAttribute("aria-label", isDark ? "Use light theme" : "Use dark theme");
  localStorage.setItem("da-theme", isDark ? "dark" : "light");
}

function changeFontSize(delta) {
  state.fontSize = Math.min(25, Math.max(16, state.fontSize + delta));
  document.documentElement.style.setProperty("--reader-size", `${state.fontSize}px`);
  localStorage.setItem("da-font-size", String(state.fontSize));
  showToast(`Reading text: ${state.fontSize}px`);
}

elements.chapterList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chapter]");
  if (!button) return;
  state.chapter = Number(button.dataset.chapter);
  state.pendingHighlight = button.dataset.highlight ? decodeURIComponent(button.dataset.highlight) : "";
  closeRail();
  renderChapter({ scroll: true, historyMode: "push" });
});

elements.chapterSearch.addEventListener("input", (event) => renderChapterList(event.target.value));
elements.previousButton.addEventListener("click", () => changeChapter(-1));
elements.nextButton.addEventListener("click", () => changeChapter(1));
elements.previousFooter.addEventListener("click", () => changeChapter(-1));
elements.nextFooter.addEventListener("click", () => changeChapter(1));
elements.bookmarkButton.addEventListener("click", toggleBookmark);
elements.contentsButton.addEventListener("click", () => openRail());
elements.closeRailButton.addEventListener("click", closeRail);
elements.overlay.addEventListener("click", closeRail);
elements.selectionShare.addEventListener("pointerdown", (event) => {
  // Safari collapses the selected range on pointer-down unless the default focus change is prevented.
  event.preventDefault();
});
elements.selectionShare.addEventListener("click", openShareDialog);
elements.closeShareButton.addEventListener("click", closeShareDialog);
elements.shareBackdrop.addEventListener("click", (event) => {
  if (event.target === elements.shareBackdrop) closeShareDialog();
});
elements.nativeShareButton.addEventListener("click", shareNatively);
elements.copyShareLink.addEventListener("click", () => copyShareLink());
elements.readerListenButton.addEventListener("click", () => {
  if (elements.body.classList.contains("audio-collapsed")) {
    setAudioCollapsed(false);
  }
  toggleAudiobook();
});
elements.audioPlay.addEventListener("click", toggleAudiobook);
elements.audioPrevious.addEventListener("click", () => changeAudioChapter(-1));
elements.audioNext.addEventListener("click", () => changeAudioChapter(1));
elements.audioSeek.addEventListener("input", () => {
  const duration = elements.chapterAudio.duration || audiobookTracks[state.audioChapter].duration;
  elements.chapterAudio.currentTime = (Number(elements.audioSeek.value) / 1000) * duration;
});
elements.audioSpeed.addEventListener("change", () => {
  elements.chapterAudio.playbackRate = Number(elements.audioSpeed.value);
  localStorage.setItem("da-audio-speed", elements.audioSpeed.value);
});
elements.audioMinimize.addEventListener("click", () => setAudioCollapsed(true));
elements.audioRestore.addEventListener("click", () => setAudioCollapsed(false));
elements.chapterAudio.addEventListener("play", () => setAudioPlaying(true));
elements.chapterAudio.addEventListener("pause", () => setAudioPlaying(false));
elements.chapterAudio.addEventListener("timeupdate", updateAudioTimeline);
elements.chapterAudio.addEventListener("loadedmetadata", updateAudioTimeline);
elements.chapterAudio.addEventListener("ended", () => {
  if (state.audioChapter < chapters.length - 1) changeAudioChapter(1);
});
elements.chapterAudio.addEventListener("error", () => {
  setAudioPlaying(false);
  showToast("This audiobook chapter could not be loaded.");
});
elements.themeButton.addEventListener("click", () => setTheme(!elements.body.classList.contains("dark")));
document.querySelector("#increaseFont").addEventListener("click", () => changeFontSize(1));
document.querySelector("#decreaseFont").addEventListener("click", () => changeFontSize(-1));
document.querySelector("#startReadingButton").addEventListener("click", () => {
  elements.reader.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#listenButton").addEventListener("click", () => {
  state.chapter = 0;
  renderChapter({ scroll: true, historyMode: "push" });
  window.setTimeout(() => syncAudioChapter(0, true), 650);
});
document.querySelector("#searchButton").addEventListener("click", () => openRail(true));
document.querySelector("#homeButton").addEventListener("click", () => {
  document.querySelector("#home").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeRail();
    closeShareDialog();
    elements.selectionShare.classList.remove("visible");
  }
  if (event.target.matches("input")) return;
  if (event.key === "ArrowLeft") changeChapter(-1);
  if (event.key === "ArrowRight") changeChapter(1);
});

document.addEventListener("selectionchange", () => {
  window.clearTimeout(updateSelectionShare.timeout);
  updateSelectionShare.timeout = window.setTimeout(updateSelectionShare, 80);
});

window.addEventListener("popstate", () => {
  const chapter = Number.parseInt(new URL(window.location.href).searchParams.get("chapter") || "1", 10);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > chapters.length) return;
  state.chapter = chapter - 1;
  state.pendingHighlight = "";
  renderChapter({ scroll: true });
});

const savedTheme = localStorage.getItem("da-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedAudioSpeed = localStorage.getItem("da-audio-speed") || "1";
const savedAudioCollapsed = localStorage.getItem("da-audio-collapsed") === "true";
elements.audioSpeed.value = savedAudioSpeed;
elements.chapterAudio.playbackRate = Number(savedAudioSpeed);
setAudioCollapsed(savedAudioCollapsed, false);
setTheme(savedTheme ? savedTheme === "dark" : prefersDark);
document.documentElement.style.setProperty("--reader-size", `${state.fontSize}px`);
renderChapter();
