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
Deployed on Vercel, auto-deploys on merge to `main`.
Live URL: https://cha-sales-tool.vercel.app/

## Sales Tracker architecture (current)

- Sales Tracker page has a page-level KPI strip above the internal tab bar.
- Internal tabs: `This Week`, `All Sales`, `Reconcile`, `Paychecks`, `Chargebacks`, `History`.
- Add Sale uses a fixed FAB + slide-over panel mounted as a body-level overlay root.
- Dark mode has been permanently removed from this app and should not be reintroduced.
- Service worker cache: read `CACHE_NAME` from `sw2.js` and bump by exactly +1. Never assume the version.

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
- css/styles.css — shared app styling
- css/sales-tracker.css — Sales Tracker styles
- js/storage-utils.js — scoped localStorage helpers
- js/auth.js — Clerk session
- js/speed-insights.js — Vercel Speed Insights
- js/plan-registry.js — MASTER PLAN LIST (edit this to add new plans)
- js/utils.js — search engine, synonyms, fuzzy match
- js/recovery-data.js — recovery data
- js/objections.js — objections tab
- js/knowledge_base.js — knowledge base
- js/plan-data.js — POLICY_DOCS array (plan benefit data objects)
- js/plan-data-extended.js — extended plan data
- js/plan-data-pdf-raw.js — extracted plan PDF text
- js/plan-pdf-map.js — plan-to-PDF map
- js/pdf-knowledge-runtime.js — PDF knowledge runtime
- js/policy-docs.js — plan card render functions
- js/plans-benefits.js — Plans tab, Benefits
- js/call-playbook.js — Scripts tab, Plan Scripts
- js/live-assist.js — Live Assist tab
- js/ai-tools.js — AI Tools tab
- js/training.js — Training tab
- js/compliance.js — Compliance tab
- js/docusign-walkthrough.js — DocuSign walkthrough
- js/myspace.js — My Space tab
- js/sales-tracker.js — Sales Tracker
- js/office.js — Office tab
- js/app.js — routing, navigation, initApp
- js/chat.js — Benefits Reference chatbot

## Stylesheet load order in index.html (NEVER CHANGE)

1. css/tokens.css (FIRST — defines `--cha-*` tokens used by the rest of the CSS)
2. css/styles.css
3. css/sales-tracker.css

## Script Load Order in index.html (NEVER CHANGE)

1. js/storage-utils.js
2. js/auth.js
3. js/speed-insights.js
4. js/plan-registry.js
5. js/utils.js
6. js/recovery-data.js
7. js/objections.js
8. js/knowledge_base.js
9. js/plan-data.js
10. js/plan-data-extended.js
11. js/plan-data-pdf-raw.js
12. js/plan-pdf-map.js
13. js/pdf-knowledge-runtime.js
14. js/policy-docs.js
15. js/plans-benefits.js
16. js/call-playbook.js
17. js/live-assist.js
18. js/ai-tools.js
19. js/training.js
20. js/compliance.js
21. js/docusign-walkthrough.js
22. js/myspace.js
23. js/sales-tracker.js
24. js/office.js
25. js/app.js
26. js/chat.js (after app.js)

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

## Plan index vs profile files

`data/plan-index.json` is generated from the ledger registry and may contain
STATUS_UNCERTAIN stubs with `has_profile: false` and no file in `data/plans/`.
Only `has_profile: true` rows are expected to have a profile file.
`data/plan-aliases.json` is built from `data/plans/` only, so stubs are
unreachable from plan matching. The SPA does not read `plan-index.json` at
runtime; a missing profile file falls through to NOT CONFIRMED.

As of 2026-09-24: 156 index rows = 154 profile files + 2 uncertain stubs
(harmony-care-100-plus, ngl-dental). The three MedValue stubs were removed
with the unsold plans.

## Shared formulary files left unedited

`data/bestchoicerx-formulary.json` and `data/ventegra-formulary.json` still
name MedFirst, TrueHealth, and MedValue inside shared `plans` arrays that also
name plans still sold (GoodHealth on BestChoiceRx, SmartChoice on Ventegra).
Those entries are unreachable because the removed plans are no longer
selectable. The files were deliberately left unedited. Do not treat the
leftover names as a bug, and do not rewrite the repeated arrays to drop them.

## Known open items

The two-ID-card paragraph ("one is a discount card for
prescriptions and other added benefits like dental and
vision") appears in 11 scripts and was removed from 6, per
the Sept 2026 script PDF. The claim is unverified against
any carrier brochure. Confirm with Neo and FirstEnroll
before relying on it, and make it consistent across all
scripts once confirmed.

Harbor STM Essential, Access and Secure were added without
enrollUrl, waiting period, coverage term, brochure PDF map
or PDF extract. The brochure HarborSTM_Brochure_08202026.pdf
is not in the repo. Harbor waiting periods are unconfirmed
pending the Neo certificate of coverage - do not copy a
30-day wait or a 12/12 clause from another plan.

Harbor STM scripts state a 12-and-12 pre-existing clause and
a 30-day waiting period for hospital, sickness and scheduled
doctor visits. Neither figure appears in the HarborSTM
brochure, which states only that pre-existing conditions are
not covered, with limitations reapplied to each new coverage
period. The plan cards, compliance notes and knowledge base
correctly omit both figures, so the spoken script and the
reference data disagree. Kept verbatim by decision, Sept 2026. Resolve when the Neo certificate of coverage arrives.

The WB Choice & Select member guide is not in the repo, so
chat reports NOT CONFIRMED for both Goodlife plans while
the Plans tab states the benefits as fact. Add
`WB_Choice___Select_-_Member_Guide.pdf` and build profiles
under data/plans/ to close this. The same applies to Harbor
STM.

The Goodlife script conflicts with the member guide in five
places: it sells prescription savings and a discount card
when all prescription drugs are excluded; it says the plan
pays at any hospital when office visits and preventive are
in-network only; it gives providerlocator.firsthealth.com
when the guide gives firsthealthlbp.com; it states no annual
visit limits when both plans have them; and it omits the
30-day free look and the $10,000 group term life. Kept
verbatim by decision, Sept 2026.

## Plan profile benefit verification

The converter maps onto 113 keys. Source of truth: scripts/lib/base-schema.json (array length 113).

Benefit grids are read from page images and transcribed by hand, then corroborated by string presence against the authoritative PDF, and written at VERIFIED_SINGLE_SOURCE. Plain text extraction (G-016) and pdf.js coordinate clustering (G-188) are both disallowed for benefit grids.

- A dash in a printed grid is not a zero and not a value. Write no fact. Sole exception: a page that defines its own dash notation in-page (Recuro comparison table).
- Never remap column order inside a read. Report printed left-to-right order and validate both end columns before trusting any remap.
- Structural checks (line counts, hashes, changed-file scope, frozen-leaf comparison) do not catch wrong values. Every changed value is manually read before commit.
- The unit of verification is the leaf, not the summary of benefits. Each fact carries source, page, section, governance and confidence and lands on one schema path.

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
- sw2.js CACHE_NAME must be bumped by 1 on every commit — check current main version first before bumping

## Before EVERY Commit — Mandatory Checklist

1. npm run check — syntax check all JS files
2. Verify NO defer on script tags in index.html
3. Verify app.js is second-to-last script in index.html
4. Verify plan-registry.js is first script in index.html
5. Bump sw2.js cache version by 1
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
