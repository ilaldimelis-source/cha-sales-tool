# CHA Sales Command Center - Standing Rules

Owner: Mey. One list, replacing the scattered copies in project instructions, CLAUDE.md and notes.
Last merged: 2026-11-04. Each rule ends with its date (YYYY-MM or YYYY-MM-DD). No date means none was recorded.
Plan figures live in the plan cards (cards/<slug>.md), not here. This file holds decisions and rules only. It holds no client data.

---

## 1. Sources & verification

- Source ranking: (1) live client e-signs, (2) live NEO / FirstEnroll / Premier portals, (3) carrier PDFs, newest first, (4) manager messages, used only to find documents. - 2026-11-04
- These are NOT sources: repo data, the ledger, old docs, scripts, sheets, TalentLMS, memory. - 2026-11-04
- If a fact is not in a ranked source, write NOT FOUND. Never guess it and never copy it from another plan. - 2026-11-04
- F1: a fact read on one tier's e-sign and used on another tier's card is tagged "confirm on <tier>". - 2026-11-04
- E1: plan cards use one format. Front matter: plan, tiers, family, platform, plan_type, carrier_underwriter, administrator, sponsor, network, billing_name, last_verified, sources. Then these sections: Benefits, Pre-existing + look-back, Waiting periods, Exclusions & limitations, Rx, Fees, Cancel / refund / grace, Eligibility & app knockouts, Renewal / max term, Must-say disclosures, Open questions. Every fact is tagged [source, date]. - 2026-11-04
- Corrections come only from ranked sources 1-3. Unresolved facts stay open and are never papered over. - 2026-11-04
- Benefit grids are read from page images, transcribed by hand, then corroborated by string presence against the source PDF. Plain text extraction (G-016) and pdf.js coordinate clustering (G-188) are not allowed. - 2026-09
- A dash in a printed grid is not a zero and not a value, so write no fact for it. The only exception is a page that defines its own dash notation (the Recuro comparison table). - 2026-09
- Never remap column order inside a read. Record the printed left-to-right order and check both end columns before trusting any remap. - 2026-09
- Structural checks (line counts, hashes, scope, frozen leaves) do not catch wrong values, so every changed value is read by hand before commit. - 2026-09
- The unit of verification is the leaf. Each fact carries source, page, section, governance and confidence, and lands on one schema path (113 keys, scripts/lib/base-schema.json). - 2026-09
- NEO's own product Info pages beat the app for Smart Health STM and Harbor STM carrier, underwriter and claims-admin details. - 2026-10
- State availability comes from the portal STATES tab, never from a brochure state list. - 2026-09-19
- The FirstEnroll TDK brochure leaves out the pre-existing limit and the sickness wait, so use plan-document language. - 2026-09
- Do not run scripts/build-plan-pdf-knowledge.js as a full regeneration. Add or update extracts one plan at a time. - 2026-09
- data/plan-index.json STATUS_UNCERTAIN stubs (has_profile: false) are expected. A missing profile falls through to NOT CONFIRMED. - 2026-09-24
- Leftover discontinued plan names in the shared formulary files (bestchoicerx, ventegra) are deliberate. Do not treat them as a bug or rewrite them. - 2026-09
- For Harbor, do not copy a waiting period or a 12/12 clause from another plan into Harbor reference data. - 2026-09

## 2. Compliance positions

- Never say "labs are covered", "PPO", "covered" or "$0 / free" without verifying it in a source document. - date not recorded
- Never call Detego Health an underwriter. It is the TPA (claims administrator). - date not recorded
- Never name the wrong billing entity on a recorded call. - date not recorded
- Never claim that GHDP 1 satisfies MEC, and never say that it does not. Its MEC status is unverified. - date not recorded
- Pre-existing exclusions on STM plans depend on the condition, not on the care setting. - date not recorded
- For a client with active Medicaid, frame a limited-benefit plan as an add-on that never replaces coverage. Steering a client away from comprehensive coverage is a section 7 violation. - date not recorded
- Do not upsell TDK 3 to TDK 4 on the hospital benefit, because TDK 4's inpatient annual max is lower and nothing offsets it (live upsell trap). - date not recorded
- Access Health: the "$2,000" figure is a coinsurance limit. Do not call it a MOOP. - date not recorded
- A1: SmartChoice pre-existing. Read the NEO post-close script as written and add no On Call pre-existing line. Never state 12/12 or any specific term, because the held SmartChoice documents set none. - 2026-11-04
- B2: the SmartChoice pharmacy name in the app stays on hold until NEO confirms which program applies (the e-sign says MyLiveDoc, the portal says Ventegra). - 2026-11-04
- C1: GHDP 1 follows the Dec 2024 GHDP-1 Summary of Benefits, even where the FirstEnroll Info tab differs. - 2026-11-04 (first set 2026-09-19)
- D1: the Harbor and WB Choice / Select statement name stays "Neo Health Solutions". No descriptor is printed in any source. - 2026-11-04
- The SmartChoice statement name is "NEOINS" (Neo Insurance Solutions). - 2026-11-04
- Other NEO plans bill as "Neo Health Solutions". TDK bills as "First Enroll". - 2026-10
- Access Health, Harmony Care, Harmony Care +, Advanced Wellness PLUS and Sigma Care PLUS bill as FirstEnroll. - 2026-10-20
- The Access Health underwriter is American Financial Security Life Insurance Company or Standard Life and Casualty, depending on the state. This replaces the AFSLIC-only decision of 2026-10-20. - 2026-11-04
- The AdvantCare network is MultiPlan only (confirmed with Premier) and is named "MultiPlan PPO Network" in the script and on On Call. - 2026-10-31 (first set 2026-10-20)
- Allstate STM PPO is offered through LIFE Association. - 2026-10-20
- GoodHealth enrollments have no acknowledgment checkboxes. - 2026-10-20
- When the CHA Sales Script PDF and the NEO / FirstEnroll / Premier plan sheets disagree on an underwriter or association name, the scripts use the sheets' wording. - 2026-10-21
- Premier "ACA Add-on Only" products (AWA SmileAssure, Direct Access DVH, VSP) can be sold with an ACA plan or with any core plan. - 2026-10
- TVP Health is approved to sell. - 2026-10
- The New York Life term life add-on can be sold to any individual. - 2026-10

## 3. Scripts & disclosures

- Script wording is verbatim. Approximate wording counts as a compliance violation.
- Never change script text in js/call-playbook.js.
- Paramount script held: not used until Paramount Plans 2-6 are verified. - 2026-11-04
- Read plan disclosures before collecting payment, in every script, SmartChoice included. - 2026-10
- When a call needs a specific recorded statement, the compliance-gate language comes before the answer.
- Agent scripts name the underwriter, association, billing administrator and network in the order set by the compliance key.
- Pre-existing and waiting-period lines follow each plan's own carrier document. This replaces the universal 12-and-12 line. SmartChoice gets no pre-existing line. - 2026-10-18
- Read the SmartChoice NEO post-close verification script as written, including its maternity line. - 2026-10-20
- The 30-day free look is not said on live calls, because DocuSign covers it. This holds even though NEO's Harbor rubric scores it. - 2026-10-20
- No "private company, not government" line in the opening. Saying "Central Health Advisors" is enough. - 2026-10
- Harbor scripts drop "Everest is also the plan administrator". - 2026-10-20
- Harbor's pre-existing look-back and waiting periods apply to all Harbor tiers (figures are on the cards). - 2026-10-20
- Carrier-mandated text with "minimum essential coverage" wording is read or signed exactly as written. The never-say-MEC rule covers only the agent's own words. - 2026-10-20
- CHA customer service hours (855-736-1590) are 8:00 a.m. to 9:00 p.m. ET. - 2026-10-20
- Unfinished [VERIFY] / [COUNT THE BOXES] blanks in Premier scripts are kept but flagged so agents do not read them aloud. - 2026-10-21
- On Call Disclosures use one short template in the same order for every plan, filled from the reviewed Live Call Scripts facts. - 2026-10-26
- Verbal disclosures follow the sales-script recap layout: "Just for your records...", then network, administrator, statement name, plan type / not ACA / exclusion line, then pre-existing and waiting periods. Keep the wording short and beginner-friendly. - 2026-10-26
- AWA SimpleShield, HealthEssential, HealthBoost and AdvantCare 50 stay hidden from On Call and the core cheat sheets. - 2026-10-31 (first set 2026-10-20 / 10-26)
- SmartChoice is labeled Limited on On Call, never MEC. - 2026-10-26
- SmartChoice keeps its own exclusion line verbatim ("does not provide coverage for maternity, or substance abuse for drugs and alcohol"). Every other plan, CrownPoint included, keeps "does not provide coverage for maternity, substance abuse, or psychiatric services". - 2026-10-31 (first set 2026-10-26)
- On Call disclosures drop the "plan doesn't pay for prescriptions" lines and the state eligibility lines. NexusCare keeps its Nevada subsidy line and its MO/OK "not renewable" line. - 2026-10-26
- Carrier terms already in the e-sign (including the Unified Life 7-statement disclaimer and the AWA TrueHealth Terms & Conditions) are not read aloud. Verbal disclosures keep only the must-say points. - 2026-10-26
- The AWA TrueHealth 30-day examination period does not need to be said aloud. - 2026-10-26
- Never say "there's no insurance company" or "no insurance company is named" in disclosures. - 2026-10-26
- The GoodHealth Post Close disclosure is stated exactly as: "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services." - 2026-10-31
- Limited-benefit Post Close scripts get the welcome-email line that names each plan's Schedule / Summary of Benefits. - 2026-10-31
- TVP and AdvantCare disclosures do not get the "$0 deductible and no out-of-pocket maximum" wording. - 2026-10-31
- Every On Call disclosure confirm question asks "Do you understand that this isn't major medical or an ACA plan, it has limits, and it doesn't cover maternity, substance abuse or psychiatric care..." with each plan's own exclusion line. - 2026-10-31
- The SmartChoice disclosure keeps the ERISA line plus a Schedule of Benefits line. - 2026-10-31
- The SmartChoice On Call Short view uses Mey's own intro plus 10 short Working Owner questions, with the portal's legal references kept in. - 2026-11-03
- On Call App questions keep a Short view only for SmartChoice. Every other plan shows the exact portal wording plus the "Client confused?" explanation. - 2026-11-04
- Known script vs reference conflicts kept verbatim by decision: the Harbor 12-and-12 / 30-day lines and the five Goodlife script conflicts. Resolve them when carrier documents arrive. - 2026-09
- The two-ID-card paragraph is unverified. Confirm it with NEO and FirstEnroll before relying on it, then make it the same across all scripts. - 2026-09

## 4. Code rules

- Never rewrite, minify or optimize existing code unless asked.
- CSS changes go only in an override block at the bottom of <style>.
- Never touch JS data arrays unless explicitly told to.
- No smart quotes, em-dashes or HTML entities inside <script> blocks.
- No !important on JS-controlled visibility classes.
- One change at a time, and confirm before starting.
- Always treat the uploaded index.html as the source of truth.
- Theme is Mondly: #ECEEF8 background, black nav pills, high border-radius, soft shadows.
- All colors flow through css/tokens.css (--cha-* tokens). Never use warm hex values. The blocked list (FAF5F5, FDF9F7, FCF7F7, F7F2F2, FEF2F2, FDF2F8, F5F0E8, FAFBFC, FAFAFA) is enforced by scripts/verify.js.
- Status colors use the semantic tokens only (--cha-warning-*, --cha-danger-*, --cha-success-*).
- Dark mode is permanently removed. Do not bring it back.
- Stylesheet order never changes: tokens.css, then styles.css, then sales-tracker.css.
- Script load order in index.html never changes without testing: the 25-file list in CLAUDE.md, with app.js second to last and chat.js last.
- No defer on any script tag.
- No async/await anywhere. Use .then().catch() only.
- Never change answer logic in js/chat.js.
- Never change POLICY_DOCS data values in js/plan-data.js.
- Do not modify the protected Sales Tracker functions without explicit approval: _stParseReceipt, _stInjectCombinedPolicyPremiums, _stSplitReceipts, _stMatchPlanName, _stLoadSales, _stSaveSales, _stComputeLineCommission, _stStampDealCommission.
- Do not modify the scoped storage helpers without explicit approval: chaKey, chaGet, chaSet, chaClearSensitive.
- Plan lineup guard: no discontinued plan names in js/ outside the exempt files. A kept script name gets a "// lineup-guard-ignore: script name" comment. - 2026-10
- Discontinued POLICY_DOCS records are hidden through PD_HIDDEN_IDS, never deleted. - 2026-10
- js/chat.js and js/plan-data.js cannot be edited for lint fixes. Use inline eslint-disable-next-line comments. - 2026-09
- The inline <style> block in index.html is not linted, so review changes there by hand.
- Do not add ESLint or Stylelint rules that fight Prettier. Leave the two disabled Stylelint rules off unless they are reviewed by hand.
- Adding a plan: registry entry (js/plan-registry.js), POLICY_DOCS object, script if needed, PDF to project files, npm run check, then commit and push.

## 5. Git / PR / merge rules

- Cursor does all repo, git and GitHub work (branches, commits, pushes, PRs, merges). Mey does not click through GitHub. - 2026-11
- Never push directly to main. Vercel auto-deploys on merge to main.
- Automated or scheduled updates go out as a PR and are never merged until Mey says APPROVE - MERGE. - 2026-11
- Never open a new PR while another open PR touches the same file. Run one PR at a time per file.
- Before pushing any branch, run git fetch origin && git rebase origin/main.
- On a conflict, rebase. Do not merge.
- Never commit without running npm run check.
- Pre-commit checklist: npm run check, no defer, app.js second to last, the script order in CLAUDE.md, sw2.js bumped, no async/await.
- Bump sw2.js CACHE_NAME by exactly +1 on every commit. Read the current value from main first and never assume it.
- CI (format:check, then lint, then verify) must be green before merge. That means 0 errors. Warnings are allowed.
- Pre-commit and pre-push hooks (lint-staged + scripts/verify.js) must pass. Use --no-verify only for a critical hotfix, and sparingly.
- Never commit scratch files (.pr-body-*.md, pr_body_*.md, lint-*.txt, stylelint reports, screenshots/, AUDIT_REPORT.md, squash-merge bodies).

## 6. Privacy & security

- E-signs and portals are read-only. Never submit, change or enroll anything. - 2026-11-04
- No client data anywhere: no names, member IDs, contact or payment details in the repo, docs, cards, memory or replies. - 2026-11-04
- Never send emails to carriers. - 2026-11-04
- Never reuse passwords seen in Teams. - 2026-11-04

## 7. How Mey wants replies

- Every reply ends with exactly one of: SEND THIS TO CURSOR / APPROVE - COMMIT/PR / APPROVE - MERGE / STOP - FIX THIS FIRST. - 2026-11-04
- Ask any question that needs her decision as a multiple-choice question. - 2026-11-04
- Keep replies short and simple. Long multi-part reports overwhelm her. - 2026-11-04
- Give one recommendation, not several optional paths, unless a real decision is still open. - 2026-11
- Tactical mode: no repeated broad audits. Inspect only what blocks the next action, then move straight on to implement, commit/PR or merge. - 2026-11
- When she needs to confirm something, give a clickable link plus a prompt she can paste. Never ask her to go looking. - 2026-11
- Never ask her to find or paste code that Cursor can read itself. - 2026-11
- Live-call (On Call) screens stay as simple, clean and short as possible. - 2026-11

## 8. Preview & roll back

- Every PR gets a Vercel preview link. Check the preview before saying APPROVE - MERGE.
- If a deploy goes bad, use Vercel instant rollback from the dashboard: Deployments > the previous good deployment > Promote / Instant Rollback.
- If the site goes blank after a commit, run npm run revert.
