// compliance.js — Compliance Hub tab

function renderComplianceCenter() {
  var html =
    '<div class="ph"><div class="pt">Compliance <span>Center</span></div><p class="ps">Required disclosures, red flags, and audit standards. Review before every shift.</p></div>';
  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #DC2626;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:12px;">⚠️ MUST SAY ON EVERY CALL</div>';
  html +=
    '<div style="font-size:14px;color:var(--text-primary);line-height:1.8;">• This is <b>NOT</b> ACA-compliant major medical insurance<br>• <b>Must disclose network, underwriter, association, and billing</b> — DISCLOSE.<br>• This is a <b>limited benefit</b> plan — it does not cover everything<br>• <b>Pre-existing conditions</b> are excluded for the first 12 months<br>• There is a <b>30-day waiting period</b> for sickness benefits (accidents are Day 1)<br>• <b>Maternity / pregnancy is NOT covered</b><br>• Benefits are <b>fixed dollar amounts</b> — the plan pays the scheduled amount, not the full bill<br>• <b>Mental health</b> is NOT covered on most plans (limited on select tiers)<br>• <b>Substance abuse</b> treatment is NOT covered<br>• Member is responsible for any <b>balance</b> after the plan pays</div></div>';
  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #F59E0B;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:12px;"><svg style="width:12px;height:12px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/></svg> PLAN-SPECIFIC DISCLOSURES</div>';
  html +=
    '<div style="margin-bottom:12px;padding:12px;background:var(--bg-surface-raised);border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">MEC Plans (MedFirst, TrueHealth, GoodHealth, TDK)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• Outpatient physician/wellness: <b>in-network only</b><br>• Hospital indemnity: not network-restricted<br>• Rx varies by tier — some formulary, some discount-only<br>• Does NOT cover services unless listed in Schedule of Benefits</div></div>';
  html +=
    '<div style="margin-bottom:12px;padding:12px;background:var(--bg-surface-raised);border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">STM Plans (Pinnacle, Access Health, SmartHealth, Galena)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• <b>5-day sickness wait</b>, 30-day cancer wait, Day 1 injuries<br>• NOT renewable as permanent coverage<br>• Deductible/coinsurance structure — explain OOP clearly</div></div>';
  html +=
    '<div style="margin-bottom:12px;padding:12px;background:var(--bg-surface-raised);border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">Fixed Indemnity (HarmonyCare, SigmaCare, Everest, Health Choice)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• Benefits are <b>cash payments</b> to member, not providers<br>• <b>Balance billing</b> is likely<br>• Mental health only on 200–500 tiers (NOT 750/1000)<br>• Surgery starts at 200+ tier — 100A has NO surgery</div></div>';
  html +=
    '<div style="padding:12px;background:var(--bg-surface-raised);border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">Smart Choice (EPO)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• <b>EPO = zero out-of-network</b> — must use First Health<br>• Brand Rx NOT covered — generic only ($12)<br>• Maternity NOT covered<br>• Mental health: 8 days inpatient / 8 visits outpatient per year</div></div></div>';
  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #29A26A;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin-bottom:12px;"><svg style="width:12px;height:12px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> PRE-CALL CHECKLIST</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:2;">☐ State this is NOT major medical / NOT ACA-compliant<br>☐ Disclose the 30-day sickness waiting period<br>☐ Explain pre-existing condition exclusion (12/12)<br>☐ Confirm maternity is NOT covered<br>☐ Explain benefits are fixed dollar amounts<br>☐ Never guarantee coverage without verifying SOB<br>☐ Never compare these plans to ACA as equivalent<br>☐ Give prospect time to ask questions before closing<br>☐ Never use high-pressure or fear-based tactics</div></div>';
  // ── Merged Call Disclosures ──
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5B8DEF;margin:28px 0 14px;">CALL DISCLOSURE SCRIPTS</div>';
  html +=
    '<div style="background:var(--bg-surface);border:2px solid var(--border-light, var(--border-default));border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5175F1;margin-bottom:10px;">OPENING DISCLOSURE (FIRST 2 MIN)</div><div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:16px;font-size:14px;color:var(--text-primary);line-height:1.8;font-style:italic;">"I do want to clarify that this is a <b>private, limited-benefit plan</b>, not an <b>ACA or major medical plan</b>, and it does not provide coverage for <b>maternity, substance abuse, or psychiatric services</b>."</div></div>';
  html +=
    '<div style="background:var(--bg-surface);border:2px solid var(--border-light, var(--border-default));border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#D97706;margin-bottom:10px;">⏳ PRE-EXISTING DISCLOSURE</div><div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:16px;font-size:14px;color:var(--text-primary);line-height:1.8;font-style:italic;">"If you have any conditions you\'ve been treated for in the last 12 months, those are <b>pre-existing</b> and <b>not covered</b> for the first 12 months. After that, they\'re covered. Do you have any conditions you\'re currently being treated for?"</div></div>';
  html +=
    '<div style="background:var(--bg-surface);border:2px solid var(--border-light, var(--border-default));border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:10px;">📅 WAITING PERIOD DISCLOSURE</div><div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:16px;font-size:14px;color:var(--text-primary);line-height:1.8;font-style:italic;">"There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits."</div></div>';
  html +=
    '<div style="background:var(--bg-surface);border:2px solid var(--border-light, var(--border-default));border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:10px;">🚫 MATERNITY / EXCLUSIONS</div><div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:16px;font-size:14px;color:var(--text-primary);line-height:1.8;font-style:italic;">"This plan does <b>not cover maternity</b>, <b>substance abuse</b>, and <b>mental health</b> is limited or not included depending on the tier."</div></div>';
  html +=
    '<div style="background:var(--bg-surface);border:2px solid var(--border-light, var(--border-default));border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin-bottom:10px;">✓ CLOSING VERIFICATION</div><div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:16px;font-size:14px;color:var(--text-primary);line-height:1.8;font-style:italic;">"Before we finalize:<br>1. This is a <b>limited benefit plan</b>, not major medical<br>2. Pre-existing conditions <b>excluded 12 months</b><br>3. <b>30-day sickness waiting period</b><br>4. <b>Maternity not covered</b><br>5. <b>Must disclose network, underwriter, association, and billing</b><br><br>Do you understand and agree to move forward?"</div></div>';
  html += '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #1e293b;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html += '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#1e293b;margin-bottom:12px;">UNIVERSAL REQUIREMENTS — EVERY CALL, EVERY PLAN</div>';
  html += '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html += '• State your <b>full name</b> and <b>Central Health Advisors</b> within the first 30 seconds<br>';
  html += '• State the <b>exact plan name</b> verbally (e.g. "TDK 1", "Access Health STM Plan 2", "Pinnacle Protect Plan 1")<br>';
  html += '• State the <b>plan type</b> — MEC group plan, short-term medical, or fixed indemnity limited benefit<br>';
  html += '• Name the <b>billing administrator</b> explicitly by name (FirstEnroll / Neo Health Solutions / both for TDK)<br>';
  html += '• Tell member they will receive an email from the <b>billing administrator</b> with portal access and plan documents<br>';
  html += '• Break down <b>first month cost AND ongoing monthly cost</b> separately — including enrollment fee<br>';
  html += '• If enrolling <b>add-ons</b> (AssistPro, etc.) — identify each add-on by name and price separately<br>';
  html += '• Tell member to <b>verify providers are in-network themselves</b> — never guarantee a specific doctor is covered<br>';
  html += '• Collect SSN and payment <b>only after all material disclosures are complete</b><br>';
  html += '• Give member time to <b>read DocuSign</b> — never rush or push for signature without allowing time to read<br>';
  html += '• State the <b>30-Day Free Look Period</b> — member can cancel within 30 days for a full refund<br>';
  html += '• Give member <b>confirmation number CHA561337</b> and customer service number before disconnecting';
  html += '</div></div>';
  html += '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #5B8DEF;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html += '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5B8DEF;margin-bottom:12px;">MEC PLANS — REQUIRED DISCLOSURES</div>';
  html += '<div style="font-size:12px;color:#848A9C;margin-bottom:8px;">Applies to: TrueHealth 1/2/3, MedFirst 1/2/3/4/5, GoodHealth 1/2/3/4/5, TDK 1/2/3/4/5, NEO Smart Choice, First Enroll MEDVALUE</div>';
  html += '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html += '• State this is a <b>group plan</b>, not individual insurance<br>';
  html += '• State member becomes a <b>Working Owner</b> of the sponsoring organization<br>';
  html += '• Name the correct <b>Benefits Administrator</b> for the plan enrolled:<br>';
  html += '&nbsp;&nbsp;&nbsp;— TDK 1-5: <b>Detego Health</b> (Third-Party Administrator — NOT the underwriter)<br>';
  html += '&nbsp;&nbsp;&nbsp;— MedFirst/GoodHealth 1-3: <b>Merchants Benefit Administration (MBA)</b><br>';
  html += '&nbsp;&nbsp;&nbsp;— MedFirst/GoodHealth 4-5: <b>Merchants Benefit Administration (MBA)</b><br>';
  html += '&nbsp;&nbsp;&nbsp;— NEO Smart Choice: <b>Population Science Management</b><br>';
  html += '&nbsp;&nbsp;&nbsp;— First Enroll MEDVALUE: <b>HC Data Consulting, LLC</b><br>';
  html += '• State the <b>exact visit limits and dollar caps</b> — never overstate benefits (see TDK card for TDK-specific limits)<br>';
  html += '• State what is <b>NOT covered</b> for the specific plan (labs, imaging, outpatient surgery vary by tier)<br>';
  html += '• TrueHealth/MedFirst/GoodHealth 1-3: <b>No surgery, no ER, no ambulance</b> — RX discount only on tier 1<br>';
  html += '• MedFirst/GoodHealth 4-5: Surgery, ER (if admitted), and ambulance (if admitted) ARE covered with limits<br>';
  html += '• MEDVALUE: Labs ($50, 3/yr), ER ($500, 1/yr), surgery covered with prior auth — NOT the same as TDK<br>';
  html += '• Prescriptions: state <b>formulary type and limitations</b> — brand NOT covered on most plans<br>';
  html += '• Read the <b>full pre-existing condition legal definition</b> verbatim:<br>';
  html += '<div style="background:var(--bg-surface-raised);border-radius:8px;padding:12px;margin:8px 0;font-style:italic;font-size:12px;line-height:1.7;">"An illness, injury, or condition for which medical advice, diagnosis, care, or treatment was recommended to, or received by, a covered person — or that manifested symptoms which would cause an ordinarily prudent person to seek diagnosis or treatment — within the 12 months immediately preceding the effective date."</div>';
  html += '• If member discloses a pre-existing condition — explicitly tell them it will <b>not be covered for the first 12 months</b><br>';
  html += '• 30-day waiting period applies to <b>sickness only</b> — injury and emergency are covered from Day 1';
  html += '</div></div>';
  html += '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #F59E0B;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html += '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:12px;">STM PLANS — REQUIRED DISCLOSURES</div>';
  html += '<div style="font-size:12px;color:#848A9C;margin-bottom:8px;">Applies to: Access Health STM (Plans 1/2/3), NEO Pinnacle STM Traditional, AFRP Galena Elite/Standard/Economy, Smart Health Traditional/Limited</div>';
  html += '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html += '• State this is a <b>short-term medical plan</b> — not permanent coverage<br>';
  html += '• State STM plans can only be held <b>up to 2 years (36 months)</b> depending on state<br>';
  html += '• Read the <b>15-condition medical underwriting list</b> in full and document member answers<br>';
  html += '• State the <b>exact deductible</b> the member selected<br>';
  html += '• State the <b>coinsurance percentage</b> (80/20 for most plans, 50/70/80% options for Galena)<br>';
  html += '• State the <b>coinsurance limit / max out-of-pocket</b> exactly<br>';
  html += '• Doctor visits are <b>NOT subject to deductible</b> on most STM plans — state this clearly<br>';
  html += '• <b>EXCEPTION — Galena Economy only</b>: doctor visits ARE subject to deductible — must state<br>';
  html += '• Hospital, surgery, serious illness = <b>subject to deductible</b> — state this clearly<br>';
  html += '• No maternity, no mental health inpatient, no substance abuse — state all three<br>';
  html += '• Dependent changes can only be made on <b>annual anniversary</b> — not mid-term<br>';
  html += '<br><b>Plan-specific variations to know:</b><br>';
  html += '• <b>Access Health STM</b>: Sickness wait = <b>5 days</b> (NOT 30 days) | Pre-ex lookback = <b>36 months</b> (NOT 12) | Out-of-network IS allowed (PHCS network, no requirement to stay in-network) | Plan 2 has <b>unlimited PCP and Specialist visits</b><br>';
  html += '• <b>NEO Pinnacle STM</b>: Deductible $500-$10,000 | MOOP $5,000 | Coverage max $1M | Doctor $50 copay | Additional deductible on ER ($500/visit, max 3) and outpatient surgery ($500/surgery, max 3)<br>';
  html += '• <b>Galena Economy</b>: Deductible $5K-$10K | Coverage max $500K | Hospital $1,500/day<br>';
  html += '• <b>Galena Standard</b>: Deductible $2.5K-$10K | Coverage max $1M | Hospital $2,500/day | OT/PT $50/day up to 10 days<br>';
  html += '• <b>Galena Elite</b>: Deductible $2.5K-$10K | Coverage max $2M | Hospital $3,000/day | OT/PT $60/day<br>';
  html += '• <b>Smart Health</b>: PCP/UC $25 copay max 2 | Specialist $40 copay max 2 | $2,000/period combined max | Hospital $1,500/day | ICU $2,000/day<br>';
  html += '<br><b>Billing by plan:</b><br>';
  html += '• FirstEnroll: Access Health STM<br>';
  html += '• Neo Health Solutions: NEO Pinnacle STM, AFRP Galena (all tiers), Smart Health Traditional and Limited';
  html += '</div></div>';
  html += '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #7C3AED;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html += '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#7C3AED;margin-bottom:12px;">LIMITED BENEFIT PLANS — REQUIRED DISCLOSURES</div>';
  html += '<div style="font-size:12px;color:#848A9C;margin-bottom:8px;">Applies to: Everest/HarmonyCare/SigmaCare (all tiers), BWA Paramount 1-6, BWA Americare 2/3/4, Health Choice Silver, Pinnacle Protect 1-4</div>';
  html += '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html += '• State this is a <b>fixed indemnity / limited benefit plan</b> — not major medical<br>';
  html += '• Explain the plan <b>pays a fixed cash benefit</b> toward covered services — NOT a percentage of the bill<br>';
  html += '• Member <b>may still owe significant out-of-pocket</b> costs above the fixed benefit after service<br>';
  html += '• Network <b>reduces the bill first</b>, then the fixed benefit is applied — this does not equal full coverage<br>';
  html += '• There is <b>no true out-of-pocket maximum</b> on any of these plans<br>';
  html += '• No deductible — but do not imply this means full coverage<br>';
  html += '• Pre-ex: 12/12 clause on Everest/HarmonyCare/Pinnacle Protect | <b>NOT applicable</b> on BWA Americare<br>';
  html += '• Pregnancy: included on BWA Americare and BWA Paramount | not covered on Everest/HarmonyCare<br>';
  html += '<br><b>Everest/HarmonyCare/SigmaCare — key tier differences:</b><br>';
  html += '• Tiers 100A and 100: <b>NO surgery benefit</b> — must disclose<br>';
  html += '• Mental health: only on tiers 200-500 ($150-$500/day inpatient, $50/day outpatient) — <b>NOT on 750 or 1000</b><br>';
  html += '• ER: NOT on tier 100A | $50-$100/day, 1 day/yr on all other tiers<br>';
  html += '• Surgery starts at tier 200 ($400/day, max 3 days/yr)<br>';
  html += '<br><b>BWA Paramount (BCS EssentialCare) — tier summary:</b><br>';
  html += '• Paramount 4 (BCS 1): Hospital $1,000 day 1 / $100 day 2+ | ICU $200 | ER $200 | Doctor $50 | UC $125<br>';
  html += '• Paramount 5 (BCS 2): Hospital $1,000 day 1 / $300 day 2+ | ICU $500 | ER $200 | Doctor $50 | UC $125<br>';
  html += '• Paramount 6 (BCS 3): Hospital $1,000 day 1 / $300 day 2+ | Surgery inpatient $1,500 / outpatient $500 | Doctor $75 | UC $150<br>';
  html += '<br><b>BWA Americare — tier summary:</b><br>';
  html += '• Plan 2: Hospital admission $750 | Confinement $200/day | ICU admission $1,500 | ER $200 max 2 days | UC $50 max 3 | Doctor $50 max 3<br>';
  html += '• Plan 3: Hospital admission $1,000 | Confinement $300/day | ICU admission $2,000 | ER $300 max 2 days | UC $50 max 3 | Doctor $50 max 3<br>';
  html += '<br><b>Pinnacle Protect Plan 1 (exact limits from carrier doc):</b><br>';
  html += '• Hospital $400/day (10 days/confinement, 30 days/yr) | Surgery $500 (1/yr shared in/out) | ER $100 (1/yr) | Doctor $50 (2/yr) | UC $50 (1/yr) | Lab $30 (2/yr) | X-ray $25 (2/yr) | Advanced diagnostic $250 (1/yr)<br>';
  html += '• Pinnacle Protect Plans 2-4: verify exact limits in plan SOB before enrolling<br>';
  html += '• Health Choice Silver: verify exact limits in plan SOB before enrolling<br>';
  html += '<br><b>Billing by plan:</b><br>';
  html += '• FirstEnroll: Everest, HarmonyCare, SigmaCare, BWA Paramount, BWA Americare, Health Choice Silver<br>';
  html += '• Neo Health Solutions: Pinnacle Protect 1-4';
  html += '</div></div>';
  html += '<div style="background:var(--bg-surface);border:2px solid #DC2626;border-radius:12px;padding:0;margin-bottom:16px;overflow:hidden;">';
  html += '<div style="background:#DC2626;padding:14px 20px;"><div style="font-size:.72rem;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;color:#fff;">TDK AUDIT REFERENCE — MOST AUDITED PLAN IN PORTFOLIO</div></div>';
  html += '<div style="padding:20px;">';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">';
  html += '<div>';
  html += '<div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">IDENTITY & STRUCTURE</div>';
  html += '<div style="font-size:12px;color:var(--text-primary);line-height:1.9;">';
  html += '• State plan name verbally: <b>"TDK 1"</b> (or 2/3/4/5)<br>';
  html += '• Member becomes <b>Working Owner of Healthcare Data Analytics (HCDA)</b><br>';
  html += '• <b>Detego Health</b> = Third-Party Administrator (NOT underwriter)<br>';
  html += '• Billing: <b>FirstEnroll AND NEO Insurance Solutions</b> — both must be named<br>';
  html += '• This is a <b>group plan</b>, not individual insurance<br>';
  html += '• Member must complete required <b>annual Working Owner activities</b>';
  html += '</div></div>';
  html += '<div>';
  html += '<div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">WHAT IS NOT COVERED — ALL TIERS</div>';
  html += '<div style="font-size:12px;color:var(--text-primary);line-height:1.9;">';
  html += '• Labs, X-rays, imaging: <b>NOT COVERED</b><br>';
  html += '• Outpatient surgery: <b>NOT COVERED</b><br>';
  html += '• Mental health inpatient: <b>NOT COVERED</b><br>';
  html += '• Mental health outpatient: MyLiveDoc telehealth only (4 visits/yr)<br>';
  html += '• Prescriptions: preferred generics via MyLiveDoc formulary ONLY — brand/specialty NOT covered<br>';
  html += '• ScriptAide PAP/SPIP available for non-covered meds<br>';
  html += '• <b>No out-of-pocket limit on any tier</b>';
  html += '</div></div></div>';
  html += '<div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">VISIT LIMITS BY TIER (from carrier plan comparison doc)</div>';
  html += '<div style="overflow-x:auto;margin-bottom:16px;">';
  html += '<table style="width:100%;border-collapse:collapse;font-size:11px;">';
  html += '<thead><tr style="background:var(--bg-surface-raised);">';
  html += '<th style="padding:6px 10px;text-align:left;border:1px solid var(--border-light,var(--border-default));">Benefit</th>';
  html += '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 1</th>';
  html += '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 2</th>';
  html += '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 3</th>';
  html += '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 4</th>';
  html += '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 5</th>';
  html += '</tr></thead><tbody>';
  var tdkRows = [
    ['PCP copay / visits / max', '$25 / 3/yr / $150', '$25 / 4/yr / $150', '$25 / 4/yr / $150', '$50 / 4/yr / $150', '$50 / 5/yr / $150'],
    ['Specialist copay / visits / max', '$50 / 1/yr / $300', '$50 / 2/yr / $300', '$50 / 4/yr / $300', '$75 / 4/yr / $300', '$75 / 5/yr / $300'],
    ['Urgent Care copay / visits / max', '$50 / 1/yr / $300', '$50 / 2/yr / $300', '$50 / 4/yr / $300', '$75 / 4/yr / $300', '$75 / 5/yr / $300'],
    ['Preventive', '$0 / 1/yr / $150', '$0 / 1/yr / $150', '$0 / 1/yr / $150', '$0 / 1/yr / $150', '$0 / 1/yr / $150'],
    ['Telehealth (MyLiveDoc)', '$0 unlimited', '$0 unlimited', '$0 unlimited', '$0 unlimited', '$0 unlimited'],
    ['Inpatient Hospital / day', '$1,000 / $5,000 max', '$1,000 / $10,000 max', '$1,000 / $15,000 max', '$1,000 / $10,000 max', '$1,500 / $15,000 max'],
    ['Outpatient Surgery', 'NOT COVERED', 'NOT COVERED', 'NOT COVERED', '$1,000/incident', '$1,500/incident'],
    ['Emergency Room', 'NOT COVERED', 'NOT COVERED', 'NOT COVERED', '$1,000/day $2,000/yr max', '$1,500/day $4,500/yr max'],
    ['Ambulance', 'NOT COVERED', 'NOT COVERED', 'NOT COVERED', '$500 if admitted', '$500 if admitted']
  ];
  tdkRows.forEach(function(r, i) {
    var bg = i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-surface-raised)';
    html += '<tr style="background:' + bg + ';">';
    r.forEach(function(cell, ci) {
      var isNotCovered = cell === 'NOT COVERED';
      html += '<td style="padding:5px 10px;border:1px solid var(--border-light,var(--border-default));' + (ci > 0 ? 'text-align:center;' : '') + (isNotCovered ? 'color:#DC2626;font-weight:700;' : '') + '">' + escHTML(cell) + '</td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  html += '<div style="background:var(--cha-danger-bg);border:1px solid #FECACA;border-radius:8px;padding:12px;margin-bottom:12px;">';
  html += '<div style="font-size:11px;font-weight:800;color:#DC2626;margin-bottom:6px;">ER RULE — MUST STATE ON EVERY TDK CALL</div>';
  html += '<div style="font-size:12px;color:var(--text-primary);line-height:1.7;">TDK 1/2/3: ER is NOT COVERED — no benefit regardless of admission.<br>TDK 4/5: ER benefit pays ONLY if member is admitted to the hospital. If not admitted = no benefit. Member may still owe the full ER bill.</div>';
  html += '</div>';
  html += '<div style="background:var(--bg-surface-raised);border-radius:8px;padding:12px;margin-bottom:12px;">';
  html += '<div style="font-size:11px;font-weight:800;color:var(--text-primary);margin-bottom:6px;">PRE-EXISTING CONDITION — FULL LEGAL DEFINITION (read verbatim)</div>';
  html += '<div style="font-size:12px;color:var(--text-primary);font-style:italic;line-height:1.7;">"An illness, injury, or condition for which medical advice, diagnosis, care, or treatment was recommended to, or received by, a covered person — or that manifested symptoms which would cause an ordinarily prudent person to seek diagnosis or treatment — within the 12 months immediately preceding the effective date."</div>';
  html += '</div>';
  html += '<div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">8 WORKING OWNER ATTESTATIONS MEMBER SIGNS IN DOCUSIGN</div>';
  html += '<div style="font-size:12px;color:var(--text-primary);line-height:1.9;">';
  html += '1. Fully read and consent to the HCDA New Working Owner Joinder Agreement<br>';
  html += '2. HCDA plans are not major medical and should not substitute for major medical coverage<br>';
  html += '3. HCDA plans do not comply with the ACA<br>';
  html += '4. Hospital Indemnity Benefit does not cover pre-existing conditions<br>';
  html += '5. HCDA Plans have a limited schedule of benefits — only pays items specifically listed<br>';
  html += '6. There is a 30-day waiting period for sickness benefits<br>';
  html += '7. This is a supplement, not a substitute for major medical — lack of major medical may result in additional tax obligation<br>';
  html += '8. Working Owner must dedicate substantial time to the business and/or earn compensation exceeding the cost of the benefit program';
  html += '</div>';
  html += '<div style="margin-top:12px;font-size:12px;color:var(--text-primary);line-height:1.7;">30-Day Free Look Period: member can cancel within 30 days for a full refund. State this before disconnecting.</div>';
  html += '</div></div>';
  html += '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #111827;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html += '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#111827;margin-bottom:12px;">RED FLAGS — NEVER DO THESE</div>';
  html += '<div style="font-size:12px;color:#848A9C;margin-bottom:12px;">Any of the following = compliance violation. Every item below is a scored element on the call audit rubric.</div>';
  var rfSections = [
    {
      title: 'OPENING / IDENTITY',
      items: [
        'Never identify as an enrollment center, government agent, ACA representative, or state exchange rep',
        'Never imply the call is related to Healthcare.gov, a state marketplace, or any government program',
        'Never confirm or allow member to believe this is "official" insurance or government-sponsored coverage',
        'Never assume or reinforce that the member came from a government website'
      ]
    },
    {
      title: 'BENEFITS / COVERAGE',
      items: [
        'Never confirm a specific doctor is in-network — always tell member to verify themselves at the carrier website',
        'Never confirm prescriptions are fully covered without disclosing all limitations and exclusions',
        'Never claim nationwide coverage without clarifying out-of-network restrictions or network type',
        'Never say the plan covers a service without stating visit limits and dollar caps',
        'Never imply the plan has a true out-of-pocket maximum if it does not',
        'Never describe TDK as covering ER, labs, imaging, or outpatient surgery — these are NOT covered on TDK 1/2/3'
      ]
    },
    {
      title: 'COMPARISON / STEERING',
      items: [
        'Never discourage ACA plans by claiming they are too expensive, deductibles are too high, or member does not qualify without explaining the actual eligibility process',
        'Never steer a consumer away from ACA coverage toward a commission-based product',
        'Never claim the offered plan is better or cheaper without factual side-by-side disclosures',
        'Never use the term "PPO" to imply full PPO coverage — clarify it means access to negotiated network rates'
      ]
    },
    {
      title: 'ENROLLMENT PRESSURE',
      items: [
        'Never use urgency statements such as "price is only good today" or "coverage may not be available later"',
        'Never claim easy cancellation without explaining the actual process and any restrictions',
        'Never collect payment before all material disclosures are complete',
        'Never rush member through DocuSign or push for electronic signature without allowing time to read',
        'Never use verification language that implies comprehensive coverage after technically disclaiming major medical'
      ]
    },
    {
      title: 'POST-SALE',
      items: [
        'Never make it difficult for member to access their plan documents after enrollment',
        'Always provide the confirmation number CHA561337 and customer service number before disconnecting',
        'Never require member to cancel their card to stop billing — proper cancellation must be available through member services'
      ]
    }
  ];
  rfSections.forEach(function(section) {
    html += '<div style="margin-bottom:12px;">';
    html += '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">' + escHTML(section.title) + '</div>';
    section.items.forEach(function(item) {
      html += '<div style="display:flex;align-items:flex-start;gap:8px;padding:4px 0;"><span style="color:#DC2626;font-weight:900;flex-shrink:0;margin-top:1px;">!</span><span style="font-size:12px;color:var(--text-primary);line-height:1.6;">' + escHTML(item) + '</span></div>';
    });
    html += '</div>';
  });
  html += '</div>';
  document.getElementById('page-compliancecenter').innerHTML = html;
}

function renderCallAudit() {
  var html =
    '<div class="ph"><div class="pt">Call <span>Audit</span></div><p class="ps">Universal compliance checklist for reviewing any sales call.</p></div>';
  var sections = [
    {
      heading: 'Call Opening',
      items: [
        'Agent identifies full name, license status, and agency name within the first 30 seconds',
        'Call purpose and reason for contact are stated clearly',
        'Recording disclosure is provided where required by state'
      ]
    },
    {
      heading: 'Plan Classification',
      items: [
        'Plan is identified as a limited benefit or fixed indemnity plan — not major medical',
        'Plan is identified as non-ACA and not a substitute for minimum essential coverage',
        'The term "PPO" is not used to describe network access arrangements',
        'The term "full coverage" is not used to describe capped benefit structures',
        'The term "insurance" is used only when the product qualifies as insurance under state law'
      ]
    },
    {
      heading: 'Benefit Accuracy',
      items: [
        'Benefit amounts are stated with correct per-day, per-visit, or per-incident caps',
        'Hospital benefits are described as fixed daily indemnity, not comprehensive coverage',
        'Outpatient-only limitations are disclosed where applicable',
        'Diagnostic and lab benefit limits are stated accurately',
        'Prescription coverage is described correctly (discount program vs. drug insurance)'
      ]
    },
    {
      heading: 'Waiting Periods & Pre-Existing Conditions',
      items: [
        'Sickness waiting period (typically 30 days) is clearly disclosed',
        'Accident-only Day 1 coverage is not generalized to all services',
        'Pre-existing condition exclusion period (typically 12 months) is explained in full',
        'Definition of pre-existing condition is stated: diagnosed or treated within the lookback period'
      ]
    },
    {
      heading: 'Network & Access',
      items: [
        'Network is described as access to negotiated rates, not guaranteed coverage',
        'Out-of-network implications (balance billing, no negotiated rates) are disclosed',
        'Provider count claims include context about what network access means',
        'No guarantee of specific provider availability is made'
      ]
    },
    {
      heading: 'Eligibility & Enrollment',
      items: [
        'Guaranteed issue is not presented as guaranteed coverage for all conditions',
        'Eligibility requirements and exclusions are explained before enrollment',
        'Enrollment fee vs. monthly premium is clearly broken down',
        'First payment amount (enrollment fee + first month) is stated separately from ongoing cost'
      ]
    },
    {
      heading: 'Required Disclosures',
      items: [
        'Plan is not major medical or ACA-compliant — stated explicitly',
        'Benefits are limited and subject to caps — stated explicitly',
        'Waiting periods apply to sickness and certain services — stated explicitly',
        'Pre-existing conditions are excluded during the exclusion period — stated explicitly',
        'Cancellation and refund terms are disclosed before payment is collected'
      ]
    }
  ];
  sections.forEach(function (s) {
    html +=
      '<div style="margin-bottom:18px;"><div style="font-size:13px;font-weight:800;color:var(--text-primary);padding:10px 0 6px;border-bottom:2px solid var(--border-light, var(--border-default));margin-bottom:8px;letter-spacing:0.02em;">' +
      escHTML(s.heading) +
      '</div>';
    s.items.forEach(function (item) {
      html +=
        '<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 4px;border-bottom:1px solid #F0EDE6;"><span style="flex-shrink:0;width:18px;height:18px;border:2px solid #C4BFB3;border-radius:4px;margin-top:1px;"></span><span style="font-size:12px;color:#3D3529;line-height:1.6;">' +
        escHTML(item) +
        '</span></div>';
    });
    html += '</div>';
  });
  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #29A26A;border-radius:12px;padding:16px;margin-top:12px;"><div style="font-size:13px;font-weight:800;color:#166534;margin-bottom:6px;">Audit Standard</div><div style="font-size:12px;color:#4F566B;line-height:1.7;">Every item on this checklist reflects a compliance or sales quality requirement. Any item left unchecked during a call review indicates a gap that must be addressed before the next call.</div></div>';

  // AI Transcript Scorer section
  html +=
    '<div style="margin-top:24px;background:var(--bg-surface);border:2px solid var(--border-light, var(--border-default));border-radius:16px;padding:20px;">';
  html +=
    '<div style="font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:4px;">✦ AI Call Scorer</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;">Paste a call transcript or a few sentences from a call. AI scores compliance 1-10 and flags every issue with fixes.</div>';
  html +=
    '<textarea id="auditTranscript" rows="5" placeholder="Paste call transcript here..." style="width:100%;background:var(--bg-surface-raised);border:1px solid var(--border-light, var(--border-default));border-radius:10px;padding:12px;font-size:13px;color:var(--text-secondary);resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>';
  html +=
    '<button id="auditBtn" onclick="runCallAudit()" style="margin-top:10px;width:100%;background:#5175f1;color:#fff;border:none;border-radius:10px;padding:12px;font-weight:800;font-size:14px;cursor:pointer;">Score This Call ✦ AI</button>';
  html += '<div id="auditResult" style="margin-top:14px;display:none;"></div>';
  html += '</div>';

  document.getElementById('page-callaudit').innerHTML = html;
}

function runCallAudit() {
  var transcript = document.getElementById('auditTranscript').value.trim();
  if (!transcript) return;
  var result = document.getElementById('auditResult');
  result.style.display = 'block';

  var t = transcript.toLowerCase();
  var has = function (re) {
    return re.test(t);
  };
  var absent = function (re) {
    return !re.test(t);
  };

  var categories = [
    {
      name: 'Call Opening',
      checks: [
        {
          label:
            'Agent identified full name, license status, and agency within first 30 seconds',
          pass:
            has(/my name is|this is .+ (with|from|calling)|i['’]?m .+ with/) &&
            has(/licens/) &&
            has(/agency|advisor|central health/)
        },
        {
          label: 'Call purpose stated clearly',
          pass: has(
            /reason (for|i['’]?m calling)|calling (about|regarding)|reach(ing)? out (about|regarding)|the reason/
          )
        },
        {
          label: 'Recording disclosure provided where required',
          pass: has(/recorded|recording|for (quality|training)/)
        }
      ]
    },
    {
      name: 'Plan Classification',
      checks: [
        {
          label:
            'Plan identified as limited benefit or fixed indemnity — not major medical',
          pass: has(
            /limited benefit|fixed indemnity|indemnity plan|not major medical/
          )
        },
        {
          label: 'Plan identified as non-ACA',
          pass: has(
            /not aca|non[-\s]?aca|not affordable care|not (a|an) aca|not obamacare/
          )
        },
        {
          label: '"PPO" not used to describe network access',
          pass: absent(/\bppo\b/)
        },
        {
          label: '"Full coverage" not used to describe capped benefits',
          pass: absent(/full coverage|covers everything|everything is covered/)
        },
        {
          label: '"Insurance" used correctly (not compared to major medical)',
          pass: absent(
            /regular insurance|like (real )?insurance|same as (insurance|obamacare|aca)/
          )
        }
      ]
    },
    {
      name: 'Benefit Accuracy',
      checks: [
        {
          label: 'Benefit amounts stated with correct caps',
          pass: has(
            /\$\s*\d[\d,]*\s*(per day|per visit|per incident|\/day|\/visit|max|maximum|cap|limit)/
          )
        },
        {
          label: 'Hospital benefits described as fixed daily indemnity',
          pass:
            has(
              /hospital.*(fixed|indemnity|per day|\/day|daily benefit|daily amount)/
            ) ||
            has(
              /(fixed|indemnity|per day|\/day|daily benefit|daily amount).*hospital/
            )
        },
        {
          label: 'Outpatient limitations disclosed',
          pass: has(/outpatient.*(limit|only|cap|visit|\d)/)
        },
        {
          label: 'Diagnostic and lab limits stated',
          pass: has(
            /(diagnostic|lab|labs|x[-\s]?ray|imaging|mri|ct scan).*(not covered|limit|discount|\$|cap)/
          )
        },
        {
          label:
            'Prescription described correctly (discount vs drug insurance)',
          pass: has(
            /(prescription|\brx\b|drug).*(discount|copay|formulary|generic|\$|not (drug )?insurance)/
          )
        }
      ]
    },
    {
      name: 'Waiting Periods & Pre-Existing',
      checks: [
        {
          label: '30-day sickness waiting period clearly disclosed',
          pass: has(/30[-\s]?day|thirty[-\s]?day/) && has(/sick|waiting period/)
        },
        {
          label: 'Accident Day 1 not generalized to all services',
          pass:
            has(/accident.*(day 1|day one|from day one)/) &&
            absent(/day 1.*everything|everything.*day 1|day one.*everything/)
        },
        {
          label: '12-month pre-existing exclusion explained',
          pass:
            has(/12[-\s]?month|twelve[-\s]?month/) &&
            has(/pre[-\s]?ex|pre[-\s]?exist/)
        },
        {
          label:
            'Definition of pre-existing stated (diagnosed or treated in prior 12 months)',
          pass: has(
            /(diagnosed|treated).*12 month|pre[-\s]?(existing|ex).*(diagnosed|treated)/
          )
        }
      ]
    },
    {
      name: 'Network & Access',
      checks: [
        {
          label:
            'Network described as negotiated rates, not guaranteed coverage',
          pass: has(
            /negotiated (rate|discount)|discounted rate|network (discount|rate|access)/
          )
        },
        {
          label: 'Out-of-network implications disclosed',
          pass: has(/out[-\s]?of[-\s]?network|out of network|balance bill/)
        },
        {
          label: 'No guarantee of specific provider availability',
          pass: absent(
            /guarantee.*(provider|doctor|hospital|specialist)|any doctor|any provider/
          )
        }
      ]
    },
    {
      name: 'Eligibility & Enrollment',
      checks: [
        {
          label: '"Guaranteed issue" not presented as guaranteed coverage',
          pass: absent(
            /guaranteed (issue|coverage|approval).*(all|every|any condition|everything)/
          )
        },
        {
          label: 'Eligibility requirements explained',
          pass: has(/eligibilit|qualif|requirement/)
        },
        {
          label: 'Enrollment fee vs monthly premium broken down',
          pass: has(/enrollment fee/) && has(/monthly|premium|per month/)
        },
        {
          label: 'First payment stated separately from ongoing cost',
          pass: has(
            /(first|initial|today['’]?s) (payment|charge|draft|cost)|first (month|payment) (is|will be|comes to)/
          )
        }
      ]
    },
    {
      name: 'Required Disclosures',
      checks: [
        {
          label:
            'Plan is not major medical / not ACA-compliant — stated explicitly',
          pass: has(
            /not major medical|not aca|not affordable care|non[-\s]?aca/
          )
        },
        {
          label: 'Benefits are limited and subject to caps — stated explicitly',
          pass: has(
            /limited benefit|subject to (cap|limit)|maximum|capped|benefit cap/
          )
        },
        {
          label: 'Waiting periods apply — stated explicitly',
          pass: has(/waiting period/)
        },
        {
          label:
            'Pre-existing excluded during exclusion period — stated explicitly',
          pass: has(
            /pre[-\s]?(existing|ex).*(exclud|not covered)|(exclud|not covered).*pre[-\s]?(existing|ex)/
          )
        }
      ]
    }
  ];

  // Compute score
  var totalChecks = 0;
  var passedChecks = 0;
  categories.forEach(function (cat) {
    cat.checks.forEach(function (chk) {
      totalChecks++;
      if (chk.pass) passedChecks++;
    });
  });
  var pct = totalChecks ? passedChecks / totalChecks : 0;
  var score = Math.max(1, Math.round(pct * 10));
  var grade =
    pct >= 0.9
      ? 'A'
      : pct >= 0.8
        ? 'B'
        : pct >= 0.7
          ? 'C'
          : pct >= 0.6
            ? 'D'
            : 'F';
  var gc =
    score >= 9
      ? '#16a34a'
      : score >= 7
        ? '#2563eb'
        : score >= 5
          ? '#d97706'
          : '#dc2626';

  // Build HTML
  var html =
    '<div style="background:var(--bg-surface);border:2px solid var(--border-light, var(--border-default));border-radius:14px;padding:20px;">';
  html +=
    '<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">';
  html +=
    '<div style="background:' +
    gc +
    '15;border:3px solid ' +
    gc +
    ';border-radius:14px;width:70px;height:70px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;">';
  html +=
    '<div style="font-size:26px;font-weight:900;color:' +
    gc +
    ';line-height:1;">' +
    score +
    '</div>';
  html +=
    '<div style="font-size:9px;font-weight:700;color:' +
    gc +
    ';letter-spacing:1px;">/ 10</div></div>';
  html +=
    '<div><div style="font-size:22px;font-weight:900;color:' +
    gc +
    ';">Grade: ' +
    grade +
    '</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-secondary);margin-top:2px;">' +
    passedChecks +
    ' of ' +
    totalChecks +
    ' compliance checks passed</div></div></div>';

  categories.forEach(function (cat) {
    var catPass = 0;
    var catTotal = cat.checks.length;
    cat.checks.forEach(function (c) {
      if (c.pass) catPass++;
    });
    var catColor =
      catPass === catTotal ? '#16a34a' : catPass > 0 ? '#d97706' : '#dc2626';
    html +=
      '<div style="margin-bottom:12px;border:1px solid var(--border-light, var(--border-default));border-radius:10px;overflow:hidden;">';
    html +=
      '<div style="background:var(--bg-surface-raised);padding:10px 14px;display:flex;justify-content:space-between;align-items:center;">';
    html +=
      '<div style="font-size:13px;font-weight:800;color:var(--text-primary);">' +
      escHTML(cat.name) +
      '</div>';
    html +=
      '<div style="font-size:11px;font-weight:700;color:' +
      catColor +
      ';">' +
      catPass +
      '/' +
      catTotal +
      '</div></div>';
    cat.checks.forEach(function (c) {
      var icon = c.pass ? '✓' : '✗';
      var iconColor = c.pass ? '#16a34a' : '#dc2626';
      var textColor = c.pass ? '#374151' : '#64748b';
      html +=
        '<div style="padding:8px 14px;border-top:1px solid #f1f5f9;display:flex;gap:10px;align-items:flex-start;">';
      html +=
        '<span style="color:' +
        iconColor +
        ';font-weight:800;font-size:14px;line-height:1.4;flex-shrink:0;">' +
        icon +
        '</span>';
      html +=
        '<span style="font-size:12px;color:' +
        textColor +
        ';line-height:1.5;">' +
        escHTML(c.label) +
        '</span>';
      html += '</div>';
    });
    html += '</div>';
  });

  html += '</div>';
  result.innerHTML = html;
}
