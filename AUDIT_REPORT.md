# Roadmap audits — Same-Day / Post-Date + Plan database

Static code review and data-shape review only (no parser, commission, or storage logic was modified for this document).

---

## TASK 3 — Same-Day vs Post-Date sale logic

### Storage shape (sales array)

- Persisted rows use a numeric timestamp field **`ts`** (milliseconds, normalized to **9:00 local** on a calendar day in several code paths). There is **no top-level `dateSold` string** on the saved object; UI copy refers to “Date Sold” but storage is **`ts`**.
- There is **no dedicated `effectiveDate` / `activeDate` field** on the saved sale object for commission/week bucketing. Parser output may include policy / active text inside **`notes`** or product metadata from `_stParseReceipt`, but **weekly stats and paycheck math key off `ts` only**.

### Same-Day mode (`_stGetSaleMode() !== 'post'`)

1. **Bulk paste (`_stAddParsedReceipts`)**  
   For each receipt chunk, timestamp `rcTs` is:
   - **`parsed.saleDate`** converted to local date at 9:00 when the parser populated a `Date`, else  
   - **`fallbackTs + rc2 * 60000`** where `fallbackTs = _stReadDateSoldTs()` reads **`#st-date-sold`**, else today-ish behavior inside `_stReadDateSoldTs`.
2. **Manual single add (`_stAddSale`)**  
   New rows use **`ts: _stReadDateSoldTs()`** from **`#st-date-sold`**.
3. **Receipt textarea** (`_stReceiptInputChanged`) auto-fills **`#st-date-sold`** from **`parsed.saleDate`** when present so the agent can override before add.

### Post-Date mode (`_stGetSaleMode() === 'post'`)

- **`_stReadPostDate()`** requires a **future** calendar date from **`#st-postdate-billing`** (ISO).  
- Bulk and manual flows **do not append to `_stLoadSales()`**; they push structured objects into **`cha_postdates`** via **`_stLoadPostDates` / `_stSavePostDates`** (`billDate`, `customer`, `plan`, `amount`, `raw`, etc.).
- **`_stConfirmPostDate`** later moves a post-date into normal sales (out of scope of this audit’s line-by-line walk, but it is the intended “when billing date arrives” path).

### What drives “This Week”, paycheck, and week-at-a-glance

- **`_stCalcStats`**: includes rows with **`s.ts >= weekStart`** (week start from **`_stStartOfWeek(now)`**). Day buckets for the glance strip assign amounts using **`new Date(s.ts)`** weekday → bucket index.
- **`_stPaycheckBreakdown`**: sums deal components for **`s.ts >= stats.weekStart`**.
- **Today’s counts**: `stats.todayCount` increments when **`s.ts >= todayStart`** (start of today) for rows that are not chargeback-skipped in that loop — **note**: this line appears **before** the **`s.ts < weekStart` continue**, so any non-chargeback row with timestamp on or after “today” increments today count even if it were outside the current ISO week window (unusual but possible with manipulated or future `ts`).

### Comparison to “expected behavior” in the prompt

| Expectation | Current behavior | Match? |
|-------------|------------------|--------|
| Same-day: `dateSold` = today | Implemented as **`ts`** from **`#st-date-sold`** / parsed sale date, not a separate `dateSold` field | Partial — same idea, different field name |
| Same-day: `effectiveDate` from receipt | Not stored as a first-class field for stats | No — policy/active lives in text/metadata, not used for week filters |
| Post-date: sale in week of chosen sold date, not today | Post-dated path stores **pending** rows in **`cha_postdates`** until confirm; not in weekly sales stats | Partial — model is “pending queue + bill date”, not “future-dated row in main sales” |
| Post-date: “Pending” until `dateSold` | Pending UI exists for post-dates list/banner; normal sales use **`status`** (`pending` / `valid` / etc.), not a dedicated “post-dated” status on main rows | Partial |
| Day strip on actual sold day | Uses **`ts`** only | Yes, for rows in **`_stLoadSales()`** |

### Bugs / risks (documentation only — no fix in this PR)

1. **Field naming vs mental model**: Agents/docs may speak of `dateSold` / `effectiveDate`, but persistence and all rollups use **`ts`** only; there is no enforced pairing with policy effective date.
2. **`todayCount` ordering**: Incrementing **`todayCount`** before excluding **`ts < weekStart`** may mis-state “today” if a sale row has a future `ts` still on the same calendar day edge case (low probability, but the control flow is worth a future fix if metrics matter).
3. **Bulk post-date flash**: `_stBuildAddedFlash` for post-dated chunks uses **`Date.now()`-based** placeholders for messaging, not **`billDate`** — UX messaging may not reflect the billing week (cosmetic).

### Recommendations (future work)

1. Document in UI copy that **week filters and paycheck use the “Date Sold” field → `ts`**, not confirmation-line policy active date.
2. Optionally persist **`soldDateIso`** / **`policyActiveIso`** as read-only metadata for support, **without** changing commission math until product sign-off.
3. Revisit **`todayCount`** loop order if “today” must mean “today and in current commission week”.

---

## TASK 4 — Plan database sanity

### Registry (`js/plan-registry.js`)

- **Count**: **27** active plan objects (`id: '…'` entries).
- **`active: false`**: none in the current array (only mentioned in comments).
- **High-level mix (by `type` field)**:
  - **MEC** (17): MedFirst 1–5, TrueHealth 1, GoodHealth 1–5, TDK 1–5, Smart Choice 2500.
  - **STM** (4): Pinnacle STM, Access Health STM, Smart Health STM, Galena STM bundle.
  - **Limited** (6): HarmonyCare PLUS, SigmaCare Plus, NCE Health Choice Silver, Everest Fixed Indemnity, BWA Paramount, BWA Americare.
- **Families / networks (qualitative)**: Registry spans **MedFirst, TrueHealth, GoodHealth, TDK, Smart Choice, Pinnacle, Access Health, Smart Health, Galena, HarmonyCare, SigmaCare, NCE Health Choice, Everest, BWA** with **First Health / PHCS / MultiPlan / Managed Care** style network strings — suitable for a coverage spot-check, but **not validated against carrier contracts**.

### PDF map (`js/plan-pdf-map.js`)

- **Entries**: **53** `"planId":` records in the auto-generated map (broader than registry count; includes aliases / legacy ids).
- **Spot check**: Registry ids such as **`medf1`**, **`ghdp1`**, **`tdk1`**, **`trueh1`** appear in **`CHA_PLAN_PDF_MAP`** with `pdfFiles` arrays.
- **Runtime 404 check**: **Not executed** in this audit (would need HTTP fetch against deployed `knowledge_base/` URLs). Recommend a small CI script that `HEAD`-requests each `pdfFiles` entry.

### Plan Vault vs registry

- Vault rendering is driven by app JS that consumes **`CHA_PLAN_REGISTRY`** (and related plan-data). **No automated diff** was run in this PR between “registry ids” and “Vault DOM”; recommend a one-off script: `registryIds.filter(id => !pdfMapHas(id))` when run in browser context.

### Duplicates / broken entries

- **Duplicate ids**: none observed in **`CHA_PLAN_REGISTRY`** (27 unique `id` values).
- **Empty `pdfFile` in registry**: not systematically scanned; each visible row includes **`pdfFile: '…pdf'`** in the portions reviewed.

### Recommendations

1. Add an automated **`registry id ⊆ pdf map`** check in CI (browser `window` shim or regex-based extractor).
2. Add **`HEAD`** PDF smoke tests against the static host.
3. Keep **embedding / vector expansion** blocked on OpenAI quota as noted — no change here.

---

## TASK 10 — Final redesign hygiene audit (sessions 108-131)

Scope: conservative cleanup only; no parser/storage/commission/user-scope behavior changes.

### Applied cleanup

- Removed debug-only `console.log` traces from `js/sales-tracker.js` receipt chunking and render diagnostics.
- Added missing a11y semantics to Add Sale slide-over panel:
  - `role="dialog"`
  - `aria-modal="true"`
  - `aria-labelledby="st-add-sale-title"` on panel and matching `id` on heading.

### Cache-bust consistency

- `sw2.js` cache name verified at `cha-command-center-v379`.
- `index.html` `?v=` query values are consistent (`1776970500000`) across CSS and JS assets.
- No stale mixed timestamp variants found.

### Protected function drift check

- Confirmed no edits in this audit to protected parser/storage/commission/user-scope functions:
  - `_stParseReceipt`, `_stInjectCombinedPolicyPremiums`, `_stSplitReceipts`, `_stMatchPlanName`
  - `_stLoadSales`, `_stSaveSales`
  - `_stComputeLineCommission`, `_stStampDealCommission`
  - `chaKey`, `chaGet`, `chaSet`, `chaClearSensitive`

### Optional PDF map orphan status (`npm run plan-check`)

- Registry plans: 27
- PDF map entries: 53
- Registry plans missing map entries: 0
- PDF map orphan entries: 26
- Newly missing registry plans: none

### Flagged (not changed in this pass)

- Additional `console.log` statements exist outside Sales Tracker core (not removed in this hygiene pass to avoid unrelated behavior risk).
- Potential CSS dead-selector cleanup remains intentionally conservative; no broad removals were performed without high-confidence usage proof.

---

## TASK 11 — Production console errors (CSP worker blob, connection refused, meta deprecation)

Investigation only for Issues 1–2; Issue 3 fixed in code (meta tag + cache bump).

### Issue 1 — CSP worker blob violation

**Worker creation sites in first-party code**

- None found: `grep` for `new Worker(`, `SharedWorker`, and `Worker(` across `*.js` / `*.html` returned **no matches**.

**Blob `URL.createObjectURL` (not workers)**

- `js/sales-tracker.js` (approx. lines 4084–4090) — `_stExportAllSalesCsv`: creates a `Blob` for CSV download and `URL.createObjectURL(blob)` for a temporary `<a download>`. This is a **download link**, not a Web Worker.

**Third-party scripts that may spawn blob workers**

- `index.html` — Clerk: `script` `src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@4/dist/clerk.browser.js"` (also `js/auth.js` loads Clerk from `clerk.accounts.dev` in other flows).
- `index.html` — `js/speed-insights.js` injects `/_vercel/speed-insights/script.js` (prod) or `https://va.vercel-scripts.com/v1/speed-insights/script.debug.js` (dev). Vercel Speed Insights commonly uses workers internally.

**Recommendation**

- **A) Extend CSP** — Add an explicit `worker-src` (and often `child-src` for older browsers) allowing blob workers used by trusted third parties, e.g. include `blob:` (and typically `'self'`) in `worker-src` alongside your existing `default-src`. This preserves Clerk / Speed Insights behavior without forking libraries.
- **B** / **C** are possible (remove worker-dependent SDKs or reconfigure them) but are **feature / infra decisions**, not appropriate for a report-only hygiene pass.

### Issue 2 — `ERR_CONNECTION_REFUSED` (likely five failures)

**Leaked localhost / non-HTTPS runtime URLs**

- `http://127.0.0.1:7347/ingest/...` — **Cursor / agent debug ingest probes** (not reachable in production):
  - `index.html:8` — CSP `connect-src` explicitly allows `http://127.0.0.1:7347`
  - `index.html:63-64` — two `fetch(...)` probes in `<head>`
  - `index.html:68` — `navigator.sendBeacon(...)` to same host
  - `js/app.js:11, 445, 1765` — `fetch` on `window.onerror`, `showPage`, `initApp`
  - `js/chat.js:2887` — `fetch` in chat path
  - `js/live-assist.js:226, 301, 316` — `fetch` in Live Assist flows

**Count:** **9** first-party references to `127.0.0.1:7347` in shipped app sources (excluding `playwright.config.js`). Any subset can surface as **connection refused** in DevTools on Vercel; **five** matches a plausible subset on initial load + first navigation (e.g. head probes + `initApp` + `showPage` + one more).

**Other external URLs (representative; not exhaustive of every string in data files)**

- `https://api.groq.com/openai/v1/chat/completions` — `index.html` (window default), `js/chat.js`, `js/utils.js`, `js/sales-tracker.js`
- `https://fonts.googleapis.com/...`, `https://fonts.gstatic.com` — `index.html`
- `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@4/dist/clerk.browser.js` — `index.html`
- `https://whole-viper-89.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js` — `js/auth.js` (and `login.html`)
- `https://va.vercel-scripts.com/v1/speed-insights/script.debug.js` — `js/speed-insights.js` (dev hostname only)
- `/_vercel/speed-insights/script.js` — `js/speed-insights.js` (relative, production)
- Relative `/api/groq-key`, `/api/br-answer` etc. — various modules (same-origin; not the refused pattern unless API missing)

**Likely culprits for the user’s five `ERR_CONNECTION_REFUSED`**

- The **`http://127.0.0.1:7347`** debug ingest / beacon calls above. They always fail off the developer machine; **remove or gate behind dev** in a future PR (not done here per instructions).

### Issue 3 — Deprecated `apple-mobile-web-app-capable`

- **Fixed in this PR:** added `<meta name="mobile-web-app-capable" content="yes" />` next to the existing Apple meta in `index.html`.
- **Cache:** `sw2.js` bumped `v379` → `v380`; `index.html` asset `?v=` timestamps advanced to `1776972000000`.
