// compliance.js -- Compliance Hub tab

function renderComplianceCenter() {
  var html =
    '<div class="ph"><div class="pt">Compliance <span>Center</span></div><p class="ps">Required disclosures and audit standards. Review before every shift.</p></div>';

  html +=
    '<div id="comp-tab-bar" style="display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap;">' +
    '<button onclick="showCompTab(\'every-call\')" id="comp-tab-every-call" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;border:none;cursor:pointer;background:#1e293b;color:#fff;">Every Call</button>' +
    '<button onclick="showCompTab(\'plan-rules\')" id="comp-tab-plan-rules" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;border:none;cursor:pointer;background:#f1f3f9;color:#64748b;">Plan Rules</button>' +
    '<button onclick="showCompTab(\'red-flags\')" id="comp-tab-red-flags" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;border:none;cursor:pointer;background:#f1f3f9;color:#64748b;">Red Flags</button>' +
    '<button onclick="showCompTab(\'call-audit\')" id="comp-tab-call-audit" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;border:none;cursor:pointer;background:#f1f3f9;color:#64748b;">Call Audit</button>' +
    '</div>';

  // TAB 1: every-call
  html += '<div id="comp-panel-every-call" style="display:block;">';

  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #f59e0b;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:12px;">REQUIRED ON EVERY CALL</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html +=
    '&#8226; State your full name and Central Health Advisors within the first 30 seconds<br>';
  html +=
    '&#8226; State the exact plan name verbally and the plan type (MEC group plan, short-term medical, or fixed indemnity limited benefit)<br>';
  html +=
    '&#8226; Name the billing administrator by name -- FirstEnroll or NEO Insurance Solutions (both for TDK)<br>';
  html += '&#8226; State this is NOT ACA-compliant major medical insurance<br>';
  html +=
    '&#8226; State this is a limited benefit plan -- it does not cover everything<br>';
  html +=
    '&#8226; State the 30-day waiting period for sickness (accidents covered Day 1)<br>';
  html +=
    '&#8226; State pre-existing conditions are excluded for the first 12 months<br>';
  html +=
    '&#8226; State maternity, substance abuse, and psychiatric services are NOT covered<br>';
  html +=
    '&#8226; State benefits are fixed dollar amounts -- the plan pays the scheduled amount, not the full bill<br>';
  html +=
    '&#8226; State the member is responsible for any balance after the plan pays<br>';
  html +=
    '&#8226; Tell member to verify providers are in-network themselves -- never guarantee a specific doctor<br>';
  html +=
    '&#8226; Break down first month cost AND ongoing monthly cost separately including enrollment fee<br>';
  html +=
    '&#8226; Collect SSN and payment only after all material disclosures are complete<br>';
  html +=
    '&#8226; Give member time to read DocuSign -- never rush or push for signature<br>';
  html +=
    '&#8226; Give confirmation number CHA561337 and customer service number 855-736-1590 before disconnecting';
  html += '</div></div>';

  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #5B8DEF;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5B8DEF;margin-bottom:14px;">DISCLOSURE SCRIPTS</div>';

  html +=
    '<div style="margin-bottom:14px;"><div style="font-size:11px;font-weight:800;color:#5175F1;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em;">OPENING (first 2 min)</div>';
  html +=
    '<div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:14px;font-size:13px;color:var(--text-primary);line-height:1.8;font-style:italic;">"I do want to clarify that this is a private, limited-benefit plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services."</div></div>';

  html +=
    '<div style="margin-bottom:14px;"><div style="font-size:11px;font-weight:800;color:#D97706;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em;">PRE-EXISTING</div>';
  html +=
    '<div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:14px;font-size:13px;color:var(--text-primary);line-height:1.8;font-style:italic;">"If you have any conditions you have been treated for in the last 12 months, those are pre-existing and not covered for the first 12 months. After that, they are covered. Do you have any conditions you are currently being treated for?"</div></div>';

  html +=
    '<div style="margin-bottom:14px;"><div style="font-size:11px;font-weight:800;color:#C2410C;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em;">WAITING PERIOD</div>';
  html +=
    '<div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:14px;font-size:13px;color:var(--text-primary);line-height:1.8;font-style:italic;">"There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits."</div></div>';

  html +=
    '<div><div style="font-size:11px;font-weight:800;color:#1e293b;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em;">PRE-EX LEGAL DEFINITION (read verbatim)</div>';
  html +=
    '<div class="comp-script-block" style="background:var(--bg-surface-raised);border-radius:8px;padding:14px;font-size:13px;color:var(--text-primary);line-height:1.8;font-style:italic;">"An illness, injury, or condition for which medical advice, diagnosis, care, or treatment was recommended to, or received by, a covered person -- or that manifested symptoms which would cause an ordinarily prudent person to seek diagnosis or treatment -- within the 12 months immediately preceding the effective date."</div></div>';
  html += '</div>';

  html += '</div>';

  // TAB 2: plan-rules
  html += '<div id="comp-panel-plan-rules" style="display:none;">';

  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #5B8DEF;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5B8DEF;margin-bottom:8px;">MEC PLANS <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:rgba(91,141,239,0.12);color:#5B8DEF;margin-left:6px;letter-spacing:0;">MEC</span></div>';
  html +=
    '<div style="font-size:12px;color:#848A9C;margin-bottom:10px;">Applies to: TrueHealth 1-3, MedFirst 1-5, GoodHealth 1-5, TDK 1-5, NEO Smart Choice, First Enroll MEDVALUE</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html += '&#8226; This is a group plan -- not individual insurance<br>';
  html +=
    '&#8226; Member becomes a Working Owner of the sponsoring organization<br>';
  html +=
    '&#8226; Name the correct Benefits Administrator: TDK = Detego Health | MedFirst/GoodHealth = MBA | NEO Smart Choice = Population Science Management | MEDVALUE = HC Data Consulting LLC<br>';
  html +=
    '&#8226; Name the billing admin: TDK = FirstEnroll AND NEO Insurance Solutions (both) | All others = FirstEnroll only<br>';
  html +=
    '&#8226; State exact visit limits and dollar caps -- never overstate benefits<br>';
  html +=
    '&#8226; Tiers 1-3 (MedFirst/GoodHealth/TrueHealth): NO surgery, NO ER, NO ambulance -- Rx discount only on tier 1<br>';
  html +=
    '&#8226; Tiers 4-5: Surgery, ER (if admitted), and ambulance (if admitted) ARE covered with limits<br>';
  html +=
    '&#8226; MEDVALUE: Labs $50 3/yr, ER $500 1/yr, surgery covered with prior auth<br>';
  html +=
    '&#8226; Prescriptions: state formulary type -- brand NOT covered on most plans<br>';
  html += '&#8226; 30-day waiting period for sickness -- injury Day 1';
  html += '</div></div>';

  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #F59E0B;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:8px;">STM PLANS <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:rgba(245,158,11,0.12);color:#C2410C;margin-left:6px;letter-spacing:0;">STM</span></div>';
  html +=
    '<div style="font-size:12px;color:#848A9C;margin-bottom:10px;">Applies to: Access Health STM, NEO Pinnacle STM, AFRP Galena Elite/Standard/Economy, Smart Health Traditional/Limited</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html +=
    '&#8226; State this is short-term medical -- not permanent coverage<br>';
  html +=
    '&#8226; Read the 15-condition underwriting list in full and document member answers<br>';
  html +=
    '&#8226; State the exact deductible and coinsurance the member selected<br>';
  html +=
    '&#8226; Doctor visits NOT subject to deductible on most STM plans -- EXCEPTION: Galena Economy doctor visits ARE subject to deductible<br>';
  html +=
    '&#8226; Hospital, surgery, serious illness = subject to deductible<br>';
  html +=
    '&#8226; No maternity, no mental health inpatient, no substance abuse -- state all three<br>';
  html += '&#8226; Dependent changes only on annual anniversary<br>';
  html +=
    '&#8226; Access Health STM: sickness wait = 5 days (NOT 30) | pre-ex lookback = 36 months (NOT 12)<br>';
  html +=
    '&#8226; Galena Economy: deductible $5K-$10K | coverage max $500K<br>';
  html +=
    '&#8226; Galena Standard: deductible $2.5K-$10K | coverage max $1M<br>';
  html += '&#8226; Galena Elite: deductible $2.5K-$10K | coverage max $2M<br>';
  html +=
    '&#8226; NEO Pinnacle STM: deductible $500-$10K | MOOP $5K | coverage max $1M<br>';
  html +=
    '&#8226; Billing: FirstEnroll = Access Health STM | NEO = Pinnacle STM, Galena (all tiers), Smart Health';
  html += '</div></div>';

  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #DC2626;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:8px;">LIMITED BENEFIT PLANS <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:rgba(220,38,38,0.10);color:#DC2626;margin-left:6px;letter-spacing:0;">LIMITED</span></div>';
  html +=
    '<div style="font-size:12px;color:#848A9C;margin-bottom:10px;">Applies to: Everest, HarmonyCare, SigmaCare, BWA Paramount 1-6, BWA Americare 2/3/4, Health Choice Silver, Pinnacle Protect 1-4</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html +=
    '&#8226; State this is a fixed indemnity / limited benefit plan -- not major medical<br>';
  html +=
    '&#8226; Plan pays a fixed cash benefit -- NOT a percentage of the bill -- member may owe significant balance<br>';
  html += '&#8226; No true out-of-pocket maximum on any of these plans<br>';
  html +=
    '&#8226; No deductible -- but do not imply this means full coverage<br>';
  html +=
    '&#8226; Everest/HarmonyCare/SigmaCare tiers 100A and 100: NO surgery -- must disclose<br>';
  html +=
    '&#8226; Mental health only on tiers 200-500 -- NOT on 750 or 1000<br>';
  html += '&#8226; Surgery starts at tier 200+<br>';
  html +=
    '&#8226; BWA Americare: pregnancy IS included | Everest/HarmonyCare: pregnancy NOT covered<br>';
  html +=
    '&#8226; Pinnacle Protect Plans 2-4 and Health Choice Silver: verify exact limits in SOB before enrolling<br>';
  html +=
    '&#8226; Billing: FirstEnroll = Everest, HarmonyCare, SigmaCare, BWA Paramount, BWA Americare, Health Choice Silver | NEO = Pinnacle Protect 1-4';
  html += '</div></div>';

  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #1e293b;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#1e293b;margin-bottom:12px;">TDK SPECIFIC <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;background:rgba(30,41,59,0.10);color:#1e293b;margin-left:6px;letter-spacing:0;">TDK</span></div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;margin-bottom:16px;">';
  html += '&#8226; State plan name verbally: "TDK 1" (or 2/3/4/5)<br>';
  html +=
    '&#8226; Member becomes Working Owner of Healthcare Data Analytics (HCDA)<br>';
  html +=
    '&#8226; Detego Health = Third-Party Administrator NOT the underwriter<br>';
  html +=
    '&#8226; Billing: Name the billing admin -- either FirstEnroll OR NEO Insurance Solutions depending on which portal was used to enroll. Do not name both unless both apply.<br>';
  html += '&#8226; Labs, X-rays, imaging: NOT COVERED on any tier<br>';
  html +=
    '&#8226; Outpatient surgery: NOT COVERED on TDK 1/2/3 -- covered on TDK 4/5 only<br>';
  html +=
    '&#8226; ER: NOT COVERED on TDK 1/2/3 | TDK 4/5: ONLY if admitted -- no benefit if not admitted<br>';
  html +=
    '&#8226; Mental health inpatient: NOT COVERED -- MyLiveDoc telehealth only (4 visits/yr)<br>';
  html +=
    '&#8226; Prescriptions: MyLiveDoc formulary ONLY -- brand/specialty NOT covered<br>';
  html += '&#8226; No out-of-pocket maximum on any tier<br>';
  html +=
    '&#8226; Member must complete required annual Working Owner activities';
  html += '</div>';

  html +=
    '<div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">VISIT LIMITS BY TIER (from carrier plan comparison doc)</div>';
  html += '<div style="overflow-x:auto;margin-bottom:16px;">';
  html += '<table style="width:100%;border-collapse:collapse;font-size:11px;">';
  html += '<thead><tr style="background:var(--bg-surface-raised);">';
  html +=
    '<th style="padding:6px 10px;text-align:left;border:1px solid var(--border-light,var(--border-default));">Benefit</th>';
  html +=
    '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 1</th>';
  html +=
    '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 2</th>';
  html +=
    '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 3</th>';
  html +=
    '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 4</th>';
  html +=
    '<th style="padding:6px 10px;text-align:center;border:1px solid var(--border-light,var(--border-default));">TDK 5</th>';
  html += '</tr></thead><tbody>';
  var tdkRows = [
    [
      'PCP copay / visits / max',
      '$25 / 3/yr / $150',
      '$25 / 4/yr / $150',
      '$25 / 4/yr / $150',
      '$50 / 4/yr / $150',
      '$50 / 5/yr / $150'
    ],
    [
      'Specialist copay / visits / max',
      '$50 / 1/yr / $300',
      '$50 / 2/yr / $300',
      '$50 / 4/yr / $300',
      '$75 / 4/yr / $300',
      '$75 / 5/yr / $300'
    ],
    [
      'Urgent Care copay / visits / max',
      '$50 / 1/yr / $300',
      '$50 / 2/yr / $300',
      '$50 / 4/yr / $300',
      '$75 / 4/yr / $300',
      '$75 / 5/yr / $300'
    ],
    [
      'Preventive',
      '$0 / 1/yr / $150',
      '$0 / 1/yr / $150',
      '$0 / 1/yr / $150',
      '$0 / 1/yr / $150',
      '$0 / 1/yr / $150'
    ],
    [
      'Telehealth (MyLiveDoc)',
      '$0 unlimited',
      '$0 unlimited',
      '$0 unlimited',
      '$0 unlimited',
      '$0 unlimited'
    ],
    [
      'Inpatient Hospital / day',
      '$1,000 / $5,000 max',
      '$1,000 / $10,000 max',
      '$1,000 / $15,000 max',
      '$1,000 / $10,000 max',
      '$1,500 / $15,000 max'
    ],
    [
      'Outpatient Surgery',
      'NOT COVERED',
      'NOT COVERED',
      'NOT COVERED',
      '$1,000/incident',
      '$1,500/incident'
    ],
    [
      'Emergency Room',
      'NOT COVERED',
      'NOT COVERED',
      'NOT COVERED',
      '$1,000/day $2,000/yr max',
      '$1,500/day $4,500/yr max'
    ],
    [
      'Ambulance',
      'NOT COVERED',
      'NOT COVERED',
      'NOT COVERED',
      '$500 if admitted',
      '$500 if admitted'
    ]
  ];
  tdkRows.forEach(function (r, i) {
    var bg = i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-surface-raised)';
    html += '<tr style="background:' + bg + ';">';
    r.forEach(function (cell, ci) {
      var isNotCovered = cell === 'NOT COVERED';
      html +=
        '<td style="padding:5px 10px;border:1px solid var(--border-light,var(--border-default));' +
        (ci > 0 ? 'text-align:center;' : '') +
        (isNotCovered ? 'color:#DC2626;font-weight:700;' : '') +
        '">' +
        escHTML(cell) +
        '</td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';

  html +=
    '<div style="background:var(--cha-danger-bg);border:1px solid #FECACA;border-radius:8px;padding:12px;margin-bottom:12px;">';
  html +=
    '<div style="font-size:11px;font-weight:800;color:#DC2626;margin-bottom:6px;">ER RULE -- MUST STATE ON EVERY TDK CALL</div>';
  html +=
    '<div style="font-size:12px;color:var(--text-primary);line-height:1.7;">TDK 1/2/3: ER is NOT COVERED -- no benefit regardless of admission. TDK 4/5: ER benefit pays ONLY if member is admitted. If not admitted = no benefit. Member may still owe the full ER bill.</div>';
  html += '</div>';

  html +=
    '<div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:8px;">8 WORKING OWNER ATTESTATIONS MEMBER SIGNS IN DOCUSIGN</div>';
  html +=
    '<div style="font-size:12px;color:var(--text-primary);line-height:1.9;">';
  html +=
    '1. Fully read and consent to the HCDA New Working Owner Joinder Agreement<br>';
  html +=
    '2. HCDA plans are not major medical and should not substitute for major medical coverage<br>';
  html += '3. HCDA plans do not comply with the ACA<br>';
  html +=
    '4. Hospital Indemnity Benefit does not cover pre-existing conditions<br>';
  html +=
    '5. HCDA Plans have a limited schedule of benefits -- only pays items specifically listed<br>';
  html += '6. There is a 30-day waiting period for sickness benefits<br>';
  html +=
    '7. This is a supplement not a substitute for major medical -- lack of major medical may result in additional tax obligation<br>';
  html +=
    '8. Working Owner must dedicate substantial time to the business and/or earn compensation exceeding the cost of the benefit program';
  html += '</div></div>';

  html += '</div>';

  // TAB 3: red-flags
  html += '<div id="comp-panel-red-flags" style="display:none;">';
  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-left:4px solid #DC2626;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:8px;">RED FLAGS -- NEVER DO THESE</div>';
  html +=
    '<div style="font-size:12px;color:#848A9C;margin-bottom:14px;">Any of the following = compliance violation.</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">IDENTITY</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;margin-bottom:14px;">';
  html +=
    '&#8226; Never identify as an enrollment center, government agent, ACA representative, or state exchange rep<br>';
  html +=
    '&#8226; Never imply the call is related to Healthcare.gov, a state marketplace, or any government program<br>';
  html +=
    '&#8226; Never confirm or allow member to believe this is official insurance or government-sponsored coverage';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">BENEFITS</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;margin-bottom:14px;">';
  html +=
    '&#8226; Never confirm a specific doctor is in-network -- always tell member to verify at carrier website<br>';
  html +=
    '&#8226; Never confirm prescriptions are fully covered without disclosing all limitations<br>';
  html +=
    '&#8226; Never claim nationwide coverage without clarifying network type and out-of-network restrictions<br>';
  html +=
    '&#8226; Never say the plan covers a service without stating visit limits and dollar caps<br>';
  html +=
    '&#8226; Never imply the plan has a true out-of-pocket maximum if it does not<br>';
  html +=
    '&#8226; Never describe TDK as covering ER, labs, imaging, or outpatient surgery on tiers 1/2/3';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">COMPARISON / STEERING</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;margin-bottom:14px;">';
  html +=
    '&#8226; Never discourage ACA plans or steer member away from ACA toward a commission-based product<br>';
  html +=
    '&#8226; Never claim the offered plan is better or cheaper without factual side-by-side disclosures<br>';
  html +=
    '&#8226; Never use the term PPO to imply full PPO coverage -- clarify it means negotiated network rates only';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">ENROLLMENT</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;margin-bottom:14px;">';
  html +=
    '&#8226; Never use urgency statements like "price is only good today" or "coverage may not be available later"<br>';
  html +=
    '&#8226; Never collect payment before all material disclosures are complete<br>';
  html +=
    '&#8226; Never rush member through DocuSign or push for signature without allowing time to read';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">POST-SALE</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:1.9;">';
  html +=
    '&#8226; Always provide confirmation number CHA561337 and customer service number before disconnecting<br>';
  html +=
    '&#8226; Never make it difficult for member to access plan documents after enrollment<br>';
  html +=
    '&#8226; Never require member to cancel their card to stop billing -- proper cancellation must be available through member services';
  html += '</div></div>';
  html += '</div>';

  // TAB 4: call-audit
  html += '<div id="comp-panel-call-audit" style="display:none;">';
  html +=
    '<div style="background:var(--bg-surface);border:1px solid var(--border-light,var(--border-default));border-radius:12px;padding:0;margin-bottom:16px;overflow:hidden;">';
  html +=
    '<div style="background:#1e293b;padding:14px 20px;"><div style="font-size:.72rem;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;color:#fff;">UNIVERSAL CALL AUDIT</div></div>';
  html += '<div style="padding:20px;">';
  html +=
    '<div style="font-size:12px;color:#848A9C;margin-bottom:16px;">Applies to every plan, every call. These are the scored items on the audit rubric.</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">OPENING</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:2;margin-bottom:14px;">';
  html +=
    '&#9744; Stated full name and Central Health Advisors within first 30 seconds<br>';
  html += '&#9744; Stated exact plan name verbally<br>';
  html +=
    '&#9744; Stated plan type (MEC group plan / short-term medical / fixed indemnity limited benefit)<br>';
  html += '&#9744; Did NOT imply government, ACA, or marketplace connection';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">DISCLOSURES</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:2;margin-bottom:14px;">';
  html += '&#9744; Stated NOT ACA-compliant / NOT major medical<br>';
  html +=
    '&#9744; Stated plan type limitations clearly (not full bill coverage)<br>';
  html += '&#9744; Named billing administrator correctly by name<br>';
  html += '&#9744; Named network correctly<br>';
  html += '&#9744; Stated 30-day waiting period for sickness<br>';
  html += '&#9744; Stated pre-existing condition exclusion (12 months)<br>';
  html +=
    '&#9744; Stated maternity, substance abuse, psychiatric NOT covered<br>';
  html +=
    '&#9744; Stated visit limits and dollar caps accurately -- did not overstate benefits';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">ENROLLMENT</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:2;margin-bottom:14px;">';
  html +=
    '&#9744; Broke down first month cost and ongoing monthly cost separately<br>';
  html += '&#9744; Collected SSN and payment AFTER all disclosures<br>';
  html += '&#9744; Did not rush DocuSign -- gave member time to read<br>';
  html +=
    '&#9744; Sent verification link and walked member through correctly<br>';
  html += '&#9744; Stated 30-day free look period';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">POST-CLOSE</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:2;margin-bottom:14px;">';
  html += '&#9744; Gave confirmation number CHA561337<br>';
  html += '&#9744; Gave customer service number 855-736-1590<br>';
  html += '&#9744; Did NOT ask if member is still there after close<br>';
  html += '&#9744; Closed warmly -- referral ask made';
  html += '</div>';

  html +=
    '<div style="font-size:11px;font-weight:800;color:#111827;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid var(--border-light,var(--border-default));">RED FLAGS CHECK</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-primary);line-height:2;">';
  html += '&#9744; No urgency / pressure language used<br>';
  html += '&#9744; No ACA comparison or steering<br>';
  html += '&#9744; No guaranteed doctor or prescription claims<br>';
  html += '&#9744; No assumptive closing language';
  html += '</div></div></div>';
  html += '</div>';

  document.getElementById('page-compliancecenter').innerHTML = html;
}

window.showCompTab = function (tab) {
  var panels = ['every-call', 'plan-rules', 'red-flags', 'call-audit'];
  for (var i = 0; i < panels.length; i++) {
    var panel = document.getElementById('comp-panel-' + panels[i]);
    var btn = document.getElementById('comp-tab-' + panels[i]);
    if (panel) panel.style.display = panels[i] === tab ? 'block' : 'none';
    if (btn) {
      btn.style.background = panels[i] === tab ? '#1e293b' : '#f1f3f9';
      btn.style.color = panels[i] === tab ? '#fff' : '#64748b';
    }
  }
};

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
        'Plan is identified as a limited benefit or fixed indemnity plan -- not major medical',
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
        'Plan is not major medical or ACA-compliant -- stated explicitly',
        'Benefits are limited and subject to caps -- stated explicitly',
        'Waiting periods apply to sickness and certain services -- stated explicitly',
        'Pre-existing conditions are excluded during the exclusion period -- stated explicitly',
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
    '<div style="font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:4px;">[AI] AI Call Scorer</div>';
  html +=
    '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;">Paste a call transcript or a few sentences from a call. AI scores compliance 1-10 and flags every issue with fixes.</div>';
  html +=
    '<textarea id="auditTranscript" rows="5" placeholder="Paste call transcript here..." style="width:100%;background:var(--bg-surface-raised);border:1px solid var(--border-light, var(--border-default));border-radius:10px;padding:12px;font-size:13px;color:var(--text-secondary);resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>';
  html +=
    '<div style="margin-top:10px;display:flex;gap:10px;align-items:stretch;">';
  html +=
    '<button id="auditBtn" type="button" onclick="runCallAudit()" style="flex:1;background:#5175f1;color:#fff;border:none;border-radius:10px;padding:12px;font-weight:800;font-size:14px;cursor:pointer;">Score This Call [AI] AI</button>';
  html +=
    '<button id="auditClearBtn" type="button" onclick="clearCallAudit()" style="flex:0 0 auto;background:var(--bg-surface);color:var(--text-secondary);border:1px solid var(--border-light, var(--border-default));border-radius:10px;padding:12px 18px;font-weight:700;font-size:14px;cursor:pointer;">Clear</button>';
  html += '</div>';
  html += '<div id="auditResult" style="margin-top:14px;display:none;"></div>';
  html += '</div>';

  document.getElementById('page-callaudit').innerHTML = html;
  var auditTranscriptEl = document.getElementById('auditTranscript');
  if (auditTranscriptEl) {
    auditTranscriptEl.oninput = function () {
      hideCallAuditResults();
    };
  }
}

function hideCallAuditResults() {
  var result = document.getElementById('auditResult');
  if (!result) return;
  result.style.display = 'none';
  result.innerHTML = '';
}

function clearCallAudit() {
  var transcript = document.getElementById('auditTranscript');
  if (transcript) transcript.value = '';
  hideCallAuditResults();
  var btn = document.getElementById('auditBtn');
  if (btn) {
    btn.disabled = false;
    btn.textContent = 'Score This Call [AI] AI';
  }
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
            has(/my name is|this is .+ (with|from|calling)|i['']?m .+ with/) &&
            has(/licens/) &&
            has(/agency|advisor|central health/)
        },
        {
          label: 'Call purpose stated clearly',
          pass: has(
            /reason (for|i['']?m calling)|calling (about|regarding)|reach(ing)? out (about|regarding)|the reason/
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
            'Plan identified as limited benefit or fixed indemnity -- not major medical',
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
            /(first|initial|today['']?s) (payment|charge|draft|cost)|first (month|payment) (is|will be|comes to)/
          )
        }
      ]
    },
    {
      name: 'Required Disclosures',
      checks: [
        {
          label:
            'Plan is not major medical / not ACA-compliant -- stated explicitly',
          pass: has(
            /not major medical|not aca|not affordable care|non[-\s]?aca/
          )
        },
        {
          label:
            'Benefits are limited and subject to caps -- stated explicitly',
          pass: has(
            /limited benefit|subject to (cap|limit)|maximum|capped|benefit cap/
          )
        },
        {
          label: 'Waiting periods apply -- stated explicitly',
          pass: has(/waiting period/)
        },
        {
          label:
            'Pre-existing excluded during exclusion period -- stated explicitly',
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
      var icon = c.pass ? '[OK]' : '[X]';
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
