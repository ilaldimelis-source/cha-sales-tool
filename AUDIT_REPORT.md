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
