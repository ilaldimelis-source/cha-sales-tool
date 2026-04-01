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

## L006 — Single-file HTML architecture — all CSS/JS is inline
**What:** This is a ~6200-line single-file HTML app. There are no separate .js or .css files. Three `<style>` blocks exist (lines ~20, ~21-68, ~5424). All JavaScript is inline `<script>` blocks.
**Rule:** Never attempt to split into separate files. All edits are to `index.html` only. When searching for a function, use Grep on index.html directly.

---

## L007 — GitHub Pages requires `.nojekyll` and explicit Pages activation
**What:** Pushing to GitHub alone doesn't publish the site. GitHub Pages must be manually enabled in Settings → Pages → Source: main / root. `.nojekyll` prevents Jekyll from interfering with the single-file app.
**Rule:** Remind user to enable Pages after first push. Always include `.nojekyll` in the repo root.
