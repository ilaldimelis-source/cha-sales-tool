# CHA Sales Command Center — Claude Code Reference

## Color palette — STRICT RULES

Never use warm hex values anywhere in the codebase. All colors MUST flow through css/tokens.css.

Blocked values (pre-commit hook rejects): FAF5F5, FDF9F7, FCF7F7, F7F2F2, FEF2F2, FDF2F8, F5F0E8, FAFBFC, FAFAFA

Use tokens instead:

- Page background: var(--cha-bg-page)
- Card background: var(--cha-bg-card)
- Muted surface: var(--cha-bg-muted)
- Subtle border: var(--cha-border-subtle)
- Primary text: var(--cha-text-primary)
- Accent blue: var(--cha-accent)

For status colors use semantic tokens:

- Warning: var(--cha-warning-bg) / var(--cha-warning-text)
- Danger: var(--cha-danger-bg) / var(--cha-danger-text)
- Success: var(--cha-success-bg) / var(--cha-success-text)

Enforced by scripts/verify.js. Do not bypass.

## Project

Static SPA — vanilla HTML/CSS/JS, no framework, no build step.
Hosted on GitHub Pages from main branch.
Live URL: https://ilaldimelis-source.github.io/cha-sales-tool/

## Sales Tracker architecture (current)

- Sales Tracker page has a page-level KPI strip above the internal tab bar.
- Internal tabs: `This Week`, `All Sales`, `Analytics`.
- Add Sale uses a fixed FAB + slide-over panel mounted as a body-level overlay root.
- Dark mode has been permanently removed from this app and should not be reintroduced.
- Service worker cache name is currently `cha-command-center-v379` in `sw2.js`.

## Protected Sales Tracker functions

- Do not modify parser/storage/commission core paths without explicit approval:
  - `_stParseReceipt`, `_stInjectCombinedPolicyPremiums`, `_stSplitReceipts`, `_stMatchPlanName`
  - `_stLoadSales`, `_stSaveSales`
  - `_stComputeLineCommission`, `_stStampDealCommission`
- Do not modify scoped storage helpers without explicit approval:
  - `chaKey`, `chaGet`, `chaSet`, `chaClearSensitive`

## File Structure

- index.html — app shell
- css/tokens.css — **FIRST stylesheet** in index.html; shared CHA palette tokens (`--cha-*`)
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

## Stylesheet load order in index.html (NEVER CHANGE)

1. css/tokens.css (FIRST — defines `--cha-*` tokens used by the rest of the CSS)

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
- Page / muted surfaces: use `var(--cha-bg-page)` and `var(--cha-bg-muted)` from css/tokens.css (do not use legacy warm grays)

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

## CI and lint quality bar

CI runs three steps in order via `.github/workflows/ci.yml`:
`format:check` -> `lint` -> `verify`. All three must be green
before merge.

### Tools and scope

- **Prettier** (`format:check`) - whole repo. Scoped via
  `.prettierignore` to skip generated/scratch directories.
  See `.prettierignore` for the canonical list.
- **ESLint** (`lint:js`) - all .js files. Config in
  `eslint.config.js`. `js/chat.js` and `js/plan-data.js` are
  in `.prettierignore` and cannot be edited for lint fixes -
  use inline `eslint-disable-next-line` comments instead.
- **Stylelint** (`lint:css`) - `css/*.css`. Config in
  `stylelint.config.mjs`. `selector-not-notation` and
  `declaration-property-value-keyword-no-deprecated` are
  intentionally disabled - both have unsafe auto-fixes that
  could shift cascade behavior or break line-breaking.
  Re-enable only after manual review.
- **HTMLHint** (`lint:html`) - `**/*.html`.
- **Project-specific** (`verify`) - `scripts/verify.js`.
  Palette warm-hex check, plan-registry sanity, sw cache
  version. Runs in about 2-3 seconds.

### Rule of thumb

- 0 errors required. Warnings allowed (currently 231 ESLint
  warnings).
- Formatting is Prettier's job. Don't add ESLint/Stylelint
  rules that fight Prettier.
- Inline styles in `index.html` (Mondly overrides, slide-over
  styles, Sales Tracker UI) are NOT linted by Stylelint - that
  only runs against `css/*.css`. Treat the inline `<style>`
  block as canonical and review changes there manually.

### Pre-commit hooks

`scripts/install-hooks.js` (auto-runs on `npm install`) installs
both `pre-commit` and `pre-push`. Each runs:

    npx lint-staged && node scripts/verify.js

`lint-staged` runs Prettier/ESLint/Stylelint on STAGED files only
(fast). `verify.js` runs project-specific checks. Both must pass
or the commit is blocked.

### Emergency bypass

If a critical hotfix needs to ship and a hook is being stubborn:

    git commit --no-verify
    git push --no-verify

Use sparingly. CI will still run on the PR and catch anything
real.

### Scratch files

The following file patterns are gitignored and must not be
committed:

- `.pr-body-*.md`, `pr_body_*.md` (PR body drafts for
  `gh pr edit --body-file`)
- `lint-*.txt`, `stylelint-full.txt`, `stylelint-report.json`,
  `stylelint-clean.json` (lint output captures)
- `screenshots/` (debug screenshots)
- `AUDIT_REPORT.md`, `squash-merge-body.md`,
  `merge-squash-body.txt` (one-off agent scratch)

If you find these tracked in a future commit, add them back to
.gitignore and `git rm --cached` them out.
