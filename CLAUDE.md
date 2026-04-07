# CHA Sales Command Center — Claude Code Reference

## Project

- Static SPA — vanilla HTML/CSS/JS, no framework, no build step
- Hosted on GitHub Pages from main branch
- Live URL: https://ilaldimelis-source.github.io/cha-sales-tool/

## File Structure

- index.html — app shell, all HTML
- css/styles.css — all styling
- js/plan-data.js — POLICY_DOCS array (27 plan objects, pure data)
- js/policy-docs.js — render functions for plan cards
- js/plans-benefits.js — Plans tab, Compare tab, Benefits tab
- js/chat.js — Benefits Reference chatbot
- js/utils.js — shared search engine, synonym expansion, fuzzy matching
- js/training.js — Training tab
- js/call-playbook.js — Scripts tab, Call Flow, Plan Scripts
- js/ai-tools.js — AI Tools tab
- js/live-assist.js — Live Assist tab
- js/compliance.js — Compliance tab
- js/recovery-data.js — recovery scenario data
- js/objections.js — objections tab
- js/myspace.js — My Space tab
- js/app.js — routing, navigation, initApp — loads LAST

## Color System

- Sidebar: #243b55
- Chat header: #1E2D3D
- Accent blue: #5175f1
- MEC green: #22c55e
- STM blue: #3b82f6
- Limited purple: #a78bfa
- Text primary: #1e293b
- Text body: #374151
- Text muted: #94a3b8
- Border: #e2e8f0
- Background light: #f8fafc

## CSS Conventions

- Pills: border-radius 999px
- Cards: border-radius 12-16px
- Inputs: border-radius 8-10px
- Borders: 1px solid #e2e8f0
- Transitions: 0.15s ease
- Shadows: 0 2px 8px rgba(0,0,0,0.04)

## Hard Rules — NEVER change these

- Script text content in js/call-playbook.js — not one word
- Answer logic functions in js/chat.js (brStructuredAnswer, brLookupBenefit, brExtractItems, brFixTypos, brExpandTerm)
- POLICY_DOCS array data values in js/plan-data.js
- PLANS array data values in js/plans-benefits.js
- Any compliance disclosure text

## Active Branch

- main only — all other branches deleted

## Cache Busting

- Scripts load with ?v=TIMESTAMP — run npm run version:bust to update

## PWA

- sw.js handles cache-first strategy
- manifest.json — short_name "CHA Sales"
- logo.png — real CHA circular blue logo
