// compliance.js — Compliance Hub tab

function renderComplianceCenter() {
  var html =
    '<div class="ph"><div class="pt">Compliance <span>Center</span></div><p class="ps">Required disclosures, red flags, and audit standards. Review before every shift.</p></div>';
  html +=
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:12px;">⚠️ MUST SAY ON EVERY CALL</div>';
  html +=
    '<div style="font-size:14px;color:#1C2035;line-height:1.8;">• This is <b>NOT</b> ACA-compliant major medical insurance<br>• <b>Must disclose network, underwriter, association, and billing</b> — DISCLOSE.<br>• This is a <b>limited benefit</b> plan — it does not cover everything<br>• <b>Pre-existing conditions</b> are excluded for the first 12 months<br>• There is a <b>30-day waiting period</b> for sickness benefits (accidents are Day 1)<br>• <b>Maternity / pregnancy is NOT covered</b><br>• Benefits are <b>fixed dollar amounts</b> — the plan pays the scheduled amount, not the full bill<br>• <b>Mental health</b> is NOT covered on most plans (limited on select tiers)<br>• <b>Substance abuse</b> treatment is NOT covered<br>• Member is responsible for any <b>balance</b> after the plan pays</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #F59E0B;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:12px;"><svg style="width:12px;height:12px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/></svg> PLAN-SPECIFIC DISCLOSURES</div>';
  html +=
    '<div style="margin-bottom:12px;padding:12px;background:#F8FAFF;border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">MEC Plans (MedFirst, TrueHealth, GoodHealth, TDK)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• Outpatient physician/wellness: <b>in-network only</b><br>• Hospital indemnity: not network-restricted<br>• Rx varies by tier — some formulary, some discount-only<br>• Does NOT cover services unless listed in Schedule of Benefits</div></div>';
  html +=
    '<div style="margin-bottom:12px;padding:12px;background:#F8FAFF;border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">STM Plans (Pinnacle, Access Health, SmartHealth, Galena)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• <b>5-day sickness wait</b>, 30-day cancer wait, Day 1 injuries<br>• NOT renewable as permanent coverage<br>• Deductible/coinsurance structure — explain OOP clearly</div></div>';
  html +=
    '<div style="margin-bottom:12px;padding:12px;background:#F8FAFF;border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">Fixed Indemnity (HarmonyCare, SigmaCare, Everest, Health Choice)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• Benefits are <b>cash payments</b> to member, not providers<br>• <b>Balance billing</b> is likely<br>• Mental health only on 200–500 tiers (NOT 750/1000)<br>• Surgery starts at 200+ tier — 100A has NO surgery</div></div>';
  html +=
    '<div style="padding:12px;background:#F8FAFF;border-radius:8px;"><div style="font-weight:800;font-size:13px;margin-bottom:4px;">Smart Choice (EPO)</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">• <b>EPO = zero out-of-network</b> — must use First Health<br>• Brand Rx NOT covered — generic only ($12)<br>• Maternity NOT covered<br>• Mental health: 8 days inpatient / 8 visits outpatient per year</div></div></div>';
  html +=
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #29A26A;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin-bottom:12px;"><svg style="width:12px;height:12px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> PRE-CALL CHECKLIST</div>';
  html +=
    '<div style="font-size:13px;color:#1C2035;line-height:2;">☐ State this is NOT major medical / NOT ACA-compliant<br>☐ Disclose the 30-day sickness waiting period<br>☐ Explain pre-existing condition exclusion (12/12)<br>☐ Confirm maternity is NOT covered<br>☐ Explain benefits are fixed dollar amounts<br>☐ Never guarantee coverage without verifying SOB<br>☐ Never compare these plans to ACA as equivalent<br>☐ Give prospect time to ask questions before closing<br>☐ Never use high-pressure or fear-based tactics</div></div>';
  // ── Merged Call Disclosures ──
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5B8DEF;margin:28px 0 14px;">CALL DISCLOSURE SCRIPTS</div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5175F1;margin-bottom:10px;">OPENING DISCLOSURE (FIRST 2 MIN)</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:14px;color:#1C2035;line-height:1.8;font-style:italic;">"I do want to clarify that this is a <b>private, limited-benefit plan</b>, not an <b>ACA or major medical plan</b>, and it does not provide coverage for <b>maternity, substance abuse, or psychiatric services</b>."</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#D97706;margin-bottom:10px;">⏳ PRE-EXISTING DISCLOSURE</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:14px;color:#1C2035;line-height:1.8;font-style:italic;">"If you have any conditions you\'ve been treated for in the last 12 months, those are <b>pre-existing</b> and <b>not covered</b> for the first 12 months. After that, they\'re covered. Do you have any conditions you\'re currently being treated for?"</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:10px;">📅 WAITING PERIOD DISCLOSURE</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:14px;color:#1C2035;line-height:1.8;font-style:italic;">"For <b>accidents</b>, you\'re covered <b>Day 1</b>. For <b>sickness</b>, there\'s a <b>30-day waiting period</b>. After 30 days, you\'re fully covered for sickness benefits."</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:10px;">🚫 MATERNITY / EXCLUSIONS</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:14px;color:#1C2035;line-height:1.8;font-style:italic;">"This plan does <b>not cover maternity</b>, <b>substance abuse</b>, and <b>mental health</b> is limited or not included depending on the tier."</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin-bottom:10px;">✓ CLOSING VERIFICATION</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:14px;color:#1C2035;line-height:1.8;font-style:italic;">"Before we finalize:<br>1. This is a <b>limited benefit plan</b>, not major medical<br>2. Pre-existing conditions <b>excluded 12 months</b><br>3. <b>30-day sickness waiting period</b><br>4. <b>Maternity not covered</b><br><br>Do you understand and agree to move forward?"</div></div>';
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
      '<div style="margin-bottom:18px;"><div style="font-size:13px;font-weight:800;color:#1C2035;padding:10px 0 6px;border-bottom:2px solid #E8EBF5;margin-bottom:8px;letter-spacing:0.02em;">' +
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
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #29A26A;border-radius:12px;padding:16px;margin-top:12px;"><div style="font-size:13px;font-weight:800;color:#166534;margin-bottom:6px;">Audit Standard</div><div style="font-size:12px;color:#4F566B;line-height:1.7;">Every item on this checklist reflects a compliance or sales quality requirement. Any item left unchecked during a call review indicates a gap that must be addressed before the next call.</div></div>';

  // AI Transcript Scorer section
  html +=
    '<div style="margin-top:24px;background:#fff;border:2px solid #e2e8f0;border-radius:16px;padding:20px;">';
  html +=
    '<div style="font-size:16px;font-weight:700;color:#1e293b;margin-bottom:4px;">✦ AI Call Scorer</div>';
  html +=
    '<div style="font-size:13px;color:#64748b;margin-bottom:14px;">Paste a call transcript or a few sentences from a call. AI scores compliance 1-10 and flags every issue with fixes.</div>';
  html +=
    '<textarea id="auditTranscript" rows="5" placeholder="Paste call transcript here..." style="width:100%;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px;font-size:13px;color:#374151;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>';
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
    '<div style="background:#fff;border:2px solid #e2e8f0;border-radius:14px;padding:20px;">';
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
    '<div style="font-size:13px;color:#64748b;margin-top:2px;">' +
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
      '<div style="margin-bottom:12px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">';
    html +=
      '<div style="background:#f8fafc;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;">';
    html +=
      '<div style="font-size:13px;font-weight:800;color:#1e293b;">' +
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
