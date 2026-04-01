# Lessons Learned — CHA Sales Command Center

> Read this at the start of every session. Updated after every correction.

---

## L001 — Missing `<style>` tag breaks entire dashboard
**What happened:** After replacing the main CSS block on line 20, the second `<style>` block on line 21 lost its opening tag. Raw CSS rendered as visible body text — entire UI disappeared.
**Rule:** After any edit that touches a `<style>` block boundary, immediately verify the next line still has its opening `<style>` tag. Never assume adjacent blocks survived a replacement.

---

## L002 — Service worker caches stale content after edits
**What happened:** After fixing the missing `<style>` tag, the preview still showed old content because the SW cached the broken version.
**Rule:** When debugging display issues after a code change, always bust the SW cache first: `caches.keys().then(names => names.forEach(n => caches.delete(n)))`. Bump cache version (`cha-command-center-vN`) with every deploy.

---

## L003 — `.includes()` substring matching causes false positives in benefit search
**What happened:** Searching "ER" matched inside "covered", "excluded", "provider", "member", etc. Synonym expansion for short queries (≤3 chars) pulled in unrelated categories (surgery, cancer, dermatology all contain "er").
**Rule:** Always use `brTermMatch()` (word-boundary regex) for matching. Never use raw `.includes()` on benefit text with short terms. All abbreviations (ER, OOP, PCP, RX, PT, etc.) must use `\b` word boundaries. Short queries (≤3 chars) must skip the `key.includes(q)` synonym expansion path.

---

## L004 — Removing variable declarations while editing match blocks
**What happened:** When refactoring the matching loop in `brStructuredAnswer`, removed `var cat = entry.category.toLowerCase()` along with `var text`. The `cat` variable was still used 4 lines later, causing a ReferenceError at runtime.
**Rule:** When editing a forEach/loop body, read the full block top-to-bottom before saving. Verify every variable used in the block is still declared after the edit.

---

## L005 — Broad synonym terms cause incorrect coverage badges
**What happened:** `'oop'` mapped to `'maximum'`, which matched too many unrelated entries and inflated match counts, causing incorrect COVERED/NOT COVERED status.
**Rule:** Keep synonyms specific. Avoid single generic words like `'maximum'`, `'care'`, `'service'` as synonym targets. Use phrase-level synonyms (`'out of pocket maximum'`) instead.

---

## L006 — Multi-file architecture — split by tab
**What:** App was refactored from a single 6,200-line `index.html` into 12 JS files + 1 CSS file + HTML shell (~223 lines). Each sidebar tab has its own JS file.
**Rule:** Edit the specific tab's JS file, not index.html. Script load order matters (see comments in index.html). When adding a new global variable, make sure it's not a `const` that duplicates a name in another file — `const` re-declarations crash silently in browsers.

---

## L007 — GitHub Pages requires `.nojekyll` and explicit Pages activation
**What:** Pushing to GitHub alone doesn't publish the site. GitHub Pages must be manually enabled in Settings → Pages → Source: main / root. `.nojekyll` prevents Jekyll from interfering with the single-file app.
**Rule:** Remind user to enable Pages after first push. Always include `.nojekyll` in the repo root.

---

## L008 — `const` re-declarations across files crash silently in browsers
**What happened:** During the multi-file refactor, `ISA_SCRIPTS` was declared with `const` in both `call-playbook.js` and `training.js`. When both files loaded, the second `const` declaration caused a silent runtime error that prevented ALL code after it in `training.js` from executing — `MINDSET`, `renderProcess`, `renderCheatsheets` were all undefined.
**Rule:** After splitting code into separate files, check ALL `const` declarations across every file for duplicates. A duplicate `const` in a later-loading file silently kills everything after it. Use `var` for globals that might appear in multiple files, or ensure each `const` name is unique across all files.

---

## L009 — Service worker caches old file versions during refactors
**What happened:** After fixing the `const` duplicate in training.js, the browser still served the old cached version. Functions remained undefined until the SW cache was manually cleared.
**Rule:** During multi-file refactors, always bump `CACHE_NAME` in `sw.js` AND clear caches before testing. After any structural change, run: `caches.keys().then(n => n.forEach(c => caches.delete(c)))` in the console.
