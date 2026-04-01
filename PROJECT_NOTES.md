# PROJECT_NOTES.md — CHA Sales Command Center

## Overview
Single-page web app for Central Health Advisors insurance sales agents. Deployed on GitHub Pages. No server, no build step, no dependencies at runtime.

## Live URL
**https://ilaldimelis-source.github.io/cha-sales-tool/**

## Repository
**https://github.com/ilaldimelis-source/cha-sales-tool**

---

## Stack
| Layer | Technology |
|-------|-----------|
| Structure | HTML shell (`index.html`, ~223 lines) + 12 JS files + 1 CSS file |
| Styling | External CSS (`css/styles.css`) |
| Logic | External JavaScript (12 files in `js/`) |
| Fonts | Google Fonts — Inter (400, 500, 600, 700) |
| Offline | Service Worker (`sw.js`) — stale-while-revalidate, v7 cache |
| Hosting | GitHub Pages (static, no Jekyll — `.nojekyll` present) |
| Build | None — direct file editing |

---

## File Structure
```
cha-sales-tool/
├── index.html              # HTML shell (~223 lines)
├── css/
│   └── styles.css          # All CSS combined
├── js/
│   ├── utils.js            # Icons, escHTML, search engine, shared utilities
│   ├── data.js             # RECOVERY data (shared across tabs)
│   ├── objections.js       # Objections tab
│   ├── plans-benefits.js   # Plans & Benefits tab + Network Guide
│   ├── call-playbook.js    # Call Playbook tab (Closes, Call Flow, Scripts)
│   ├── live-assist.js      # Live Assist tab (Live, Recovery, QA Rebuttals)
│   ├── ai-tools.js         # AI Tools tab (Psych, Compliance AI, Coaching)
│   ├── training.js         # Training tab (Process, Product Vault, etc.)
│   ├── compliance.js       # Compliance Hub tab
│   ├── policy-docs.js      # Policy Reference tab (27 plan documents)
│   ├── app.js              # Navigation, init, CLOSEABLE, My Space, SW
│   └── chat.js             # Benefits Reference chat panel
├── logo.png                # CHA logo (36KB PNG)
├── sw.js                   # Service worker (cache v7)
├── .nojekyll               # Prevents Jekyll on GitHub Pages
├── .gitignore              # Excludes node_modules, dev files
├── CLAUDE.md               # AI agent instructions
├── PROJECT_NOTES.md        # This file
└── tasks/
    ├── todo.md             # Active task tracker
    └── lessons.md          # Hard-won lessons, read every session
```

---

## CSS Architecture
- **`css/styles.css`** — All CSS combined (main, search overlay, responsive, chat panel)
- **Design system:** Light theme (`#FCFDFE` bg, `#5175F1` accent, `#FFFFFF` cards, Inter font)
- **~84 CSS custom properties** in `:root`

---

## JavaScript Architecture
12 external JS files loaded via `<script src>` tags in `index.html`.
Load order matters — see comments in index.html for dependency chain.

### Key Data Structures
| Variable | Description |
|----------|-------------|
| `POLICY_DOCS[]` | 27 insurance plans with benefits, exclusions, waiting periods (~line 3358) |
| `PLANS[]` | Plan vault data for sales framing |
| `OBJECTIONS[]` | Objection handlers with scripts |
| `BENEFITS[]` | Benefit explainer entries |
| `CLOSES[]` | Closing line scripts |
| `RECOVERY[]` | Recovery/regain-control scripts |
| `SEARCH_SYNONYMS{}` | Synonym map for search expansion (~line 1881) |
| `BR_PLANS[]` | Built from POLICY_DOCS at runtime by `brInit()` |
| `SEARCH_INDEX[]` | Pre-built search index across all content |

### Key Functions
| Function | Location | Purpose |
|----------|----------|---------|
| `showPage(id)` | ~line 5170 | Navigate between dashboard sections |
| `brTermMatch(text, term)` | ~line 2030 | **Word-boundary-safe** term matching (critical — do not revert to .includes()) |
| `expandSearchSynonyms(q)` | ~line 1964 | Expand query to synonym set |
| `brStructuredAnswer(q, plans)` | ~line 5820 | Main chat answer engine |
| `brFormatResults(results, q)` | ~line 5684 | Format search results |
| `brSearch(q)` | ~line 5661 | Search across plan entries |
| `brHl(text, terms)` | ~line 6117 | Word-boundary-safe highlighting |
| `brInit()` | ~line 5513 | Initialize Benefits Reference panel |
| `escHTML(str)` | ~line 207 | HTML escape — ALWAYS use for user input in innerHTML |

### Navigation Pages
`liveassist`, `objections`, `plansbenefit`, `callplaybook`, `aitools`, `training`, `network`, `policydocs`, `compliance`, `myspace`

### CLOSEABLE System (click-outside-to-close)
Array near end of file before `</body>`. Controls: `.sidebar`, `#srOverlay`, `#br-panel`, `#liveResult`.

---

## Plans in POLICY_DOCS (27 total)
**MEC (17):** MedFirst 1-5, TrueHealth 1, GoodHealth 1-5, TDK 1-5, Smart Choice
**STM (4):** Pinnacle STM, Access Health STM, Smart Health STM, Galena STM
**Limited (6):** HarmonyCare PLUS, SigmaCare Plus, NCE Health Choice Silver, Everest Fixed Indemnity, BWA Paramount, BWA Americare

---

## Security Notes
- Content Security Policy: `script-src 'self' 'unsafe-inline'`
- XSS protection: `escHTML()` must be used for all user-generated content in innerHTML
- No server-side code — all data is client-side only
- No authentication — designed for internal agent use

---

## Deployment
```bash
git add index.html logo.png sw.js .nojekyll .gitignore
git commit -m "description"
git push origin main
# GitHub Pages auto-deploys within ~60 seconds
```
Bump `CACHE_NAME` in `sw.js` with every deploy (`cha-command-center-vN`).
