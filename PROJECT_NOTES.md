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
| Structure | HTML shell (`index.html`, ~223 lines) + 13 JS files + 1 CSS file |
| Styling | External CSS (`css/styles.css`) |
| Logic | External JavaScript (12 files in `js/`) |
| Fonts | Google Fonts — Inter (400, 500, 600, 700) |
| Offline | Service Worker (`sw.js`) — stale-while-revalidate, v8 cache |
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
│   ├── utils.js
│   ├── data.js
│   ├── objections.js
│   ├── plans-benefits.js
│   ├── call-playbook.js
│   ├── live-assist.js
│   ├── ai-tools.js
│   ├── training.js
│   ├── compliance.js
│   ├── policy-data.js
│   ├── policy-render.js
│   ├── app.js
│   └── chat.js
├── logo.png
├── sw.js
├── .nojekyll
├── .gitignore
├── CLAUDE.md
├── PROJECT_NOTES.md
└── tasks/
    ├── todo.md
    └── lessons.md
```
