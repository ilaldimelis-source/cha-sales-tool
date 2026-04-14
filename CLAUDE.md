# CHA Sales Command Center — Claude Code Reference

## Project

Static SPA — vanilla HTML/CSS/JS, no framework, no build step.
Hosted on GitHub Pages from main branch.
Live URL: https://ilaldimelis-source.github.io/cha-sales-tool/

## File Structure

- index.html — app shell
- css/styles.css — all styling
- js/plan-registry.js — MASTER PLAN LIST (edit this to add new plans)
- js/plan-data.js — POLICY_DOCS array (27 plan benefit data objects)
- js/policy-docs.js — plan card render functions
- js/plans-benefits.js — Plans tab, Compare, Benefits
- js/chat.js — Benefits Reference chatbot
- js/utils.js — search engine, synonyms, fuzzy match
- js/training.js — Training tab
- js/call-playbook.js — Scripts tab, Plan Scripts
- js/ai-tools.js — AI Tools tab
- js/live-assist.js — Live Assist tab
- js/compliance.js — Compliance tab
- js/recovery-data.js — recovery data
- js/objections.js — objections tab
- js/myspace.js — My Space tab
- js/app.js — routing, navigation, initApp (LOADS LAST)

## Script Load Order in index.html (NEVER CHANGE)

1. js/plan-registry.js (FIRST)
2. js/utils.js
3. js/recovery-data.js
4. js/objections.js
5. js/plan-data.js
6. js/policy-docs.js
7. js/plans-benefits.js
8. js/call-playbook.js
9. js/live-assist.js
10. js/ai-tools.js
11. js/training.js
12. js/compliance.js
13. js/myspace.js
14. js/app.js (LAST — no exceptions)
15. js/chat.js (after app.js)

## Color System

- Sidebar: #243b55
- Chat header: #1E2D3D
- Accent: #5175f1
- MEC: #22c55e
- STM: #3b82f6
- Limited: #a78bfa
- Text primary: #1e293b
- Text body: #374151
- Text muted: #94a3b8
- Border: #e2e8f0
- Background: #f8fafc

## HARD RULES — NEVER VIOLATE

- NO defer on any script tag
- NO async/await anywhere — use .then().catch() only
- app.js MUST be the last script loaded (before chat.js)
- plan-registry.js MUST be the first script loaded
- NEVER change script load order without testing
- NEVER commit without running: npm run check
- NEVER change script text in js/call-playbook.js
- NEVER change answer logic in js/chat.js
- NEVER change POLICY_DOCS data values in js/plan-data.js

## If Site Goes Blank After a Commit

Run immediately: npm run revert

## Adding a New Plan

1. Add entry to js/plan-registry.js CHA_PLAN_REGISTRY array
2. Add data object to POLICY_DOCS in js/plan-data.js
3. Add script to js/call-playbook.js if needed
4. Upload PDF to project files
5. Run npm run check
6. Commit and push

## MERGE SAFETY RULES

- Never open a new PR while another PR touching the same file is still open
- Always run: git fetch origin && git rebase origin/main before pushing any branch
- Never push directly to main
- If a conflict appears, rebase do not merge
- One PR at a time per file — wait for merge before starting next change to same file
- sw.js CACHE_NAME must be bumped by 1 on every commit — check current main version first before bumping

## Before EVERY Commit — Mandatory Checklist

1. npm run check — syntax check all JS files
2. Verify NO defer on script tags in index.html
3. Verify app.js is second-to-last script in index.html
4. Verify plan-registry.js is first script in index.html
5. Bump sw.js cache version by 1
6. Verify NO async/await in any JS file
