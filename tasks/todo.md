# Active Tasks — CHA Sales Command Center

> Last updated: April 3, 2026

---

## Completed

- [x] Refactor: Split 6,200-line monolithic index.html into 12 modular JS files (L006)
- [x] Refactor: Split policy-docs.js (1,727 lines) into policy-data.js + policy-render.js
- [x] Cleanup: Deleted unused package.json (pdf-parse, pdf2json never used)
- [x] Cleanup: Removed reference PDFs from repo root (content already in JS data)
- [x] Cleanup: Extracted CHA_PHONE, CHA_CONFIRMATION, PROVIDER_URLS constants in call-playbook.js
- [x] Cleanup: Consolidated duplicate highlight logic in chat.js (removed local highlight(), use brHl())
- [x] Cleanup: Added localStorage error handling in app.js (try-catch on all read/write)
- [x] Cleanup: Renamed FIX comments to NOTE in utils.js and chat.js
- [x] Cleanup: Updated CLAUDE.md and PROJECT_NOTES.md with stack + file structure

---

## Upcoming / Ideas

- [ ] Consider splitting plans-benefits.js (573 lines) into plans.js + benefits.js + network.js
- [ ] Add automated tests or a QA checklist for tab-by-tab verification
