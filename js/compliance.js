// compliance.js — Compliance Hub tab

function renderComplianceCenter() {
  var html =
    '<div class="ph"><div class="pt">Compliance <span>Center</span></div><p class="ps">Required disclosures, red flags, and audit standards. Review before every shift.</p></div>';
  html +=
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:12px;">⚠️ MUST SAY ON EVERY CALL</div>';
  html +=
    '<div style="font-size:14px;color:#1C2035;line-height:1.8;">• This is <b>NOT</b> ACA-compliant major medical insurance<br>• This is a <b>limited benefit</b> plan — it does not cover everything<br>• <b>Pre-existing conditions</b> are excluded for the first 12 months<br>• There is a <b>30-day waiting period</b> for sickness benefits (accidents are Day 1)<br>• <b>Maternity / pregnancy is NOT covered</b><br>• Benefits are <b>fixed dollar amounts</b> — the plan pays the scheduled amount, not the full bill<br>• <b>Mental health</b> is NOT covered on most plans (limited on select tiers)<br>• <b>Substance abuse</b> treatment is NOT covered<br>• Member is responsible for any <b>balance</b> after the plan pays</div></div>';
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
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin-bottom:10px;">✓ CLOSING VERIFICATION</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:14px;color:#1C2035;line-height:1.8;font-style:italic;">"Before we finalize:<br>1. This is a <b>limited benefit plan</b>, not major medical<br>2. Pre-existing conditions <b>excluded 12 months</b><br>3. <b>30-day sickness waiting period</b><br>4. <b>Maternity not covered</b><br>5. Benefits are <b>fixed amounts</b> — you may owe a balance<br><br>Do you understand and agree to move forward?"</div></div>';
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
  result.innerHTML =
    '<div style="color:#64748b;font-size:13px;padding:10px;">AI is scoring this call...</div>';
  var btn = document.getElementById('auditBtn');
  if (btn) {
    btn._orig = btn.textContent;
    btn.textContent = 'Scoring...';
    btn.disabled = true;
  }

  var sys =
    'You are a compliance auditor for Central Health Advisors (CHA), a health insurance telesales agency. Agents sell MEC, STM, and limited benefit plans — NOT ACA/major medical insurance.\n\nScore this call transcript for compliance and sales quality.\n\nCOMPLIANCE RULES:\n- Must disclose: NOT ACA-compliant, not major medical\n- Must disclose: pre-existing conditions excluded 12 months\n- Must disclose: 30-day sickness waiting period, Day 1 accidents only\n- Must disclose: maternity/pregnancy NOT covered\n- Mental health NOT covered on MEC/limited plans\n- Network required — cannot say "any doctor"\n- Hospital pays FIXED benefit, not full bill\n- Never compare to Obamacare/ACA/regular insurance\n- Never say "full coverage" or "covers everything"\n\nRespond in EXACTLY this format:\nSCORE: [1-10]\nGRADE: [A/B/C/D/F]\nSTRONG: [what the agent did well, 1-2 sentences]\nFLAGS: [numbered list of compliance/quality issues, or "None found"]\nFIX: [top 1-2 specific improvements the agent should make next call]';

  if (typeof _aiGroq === 'function') {
    _aiGroq(
      sys,
      'CALL TRANSCRIPT:\n' + transcript,
      function (text) {
        if (btn) {
          btn.textContent = btn._orig;
          btn.disabled = false;
        }
        var lines = text.split('\n');
        var score = '',
          grade = '',
          strong = '',
          flagsText = '',
          fix = '';
        lines.forEach(function (l) {
          if (l.indexOf('SCORE:') === 0) score = l.replace('SCORE:', '').trim();
          if (l.indexOf('GRADE:') === 0) grade = l.replace('GRADE:', '').trim();
          if (l.indexOf('STRONG:') === 0)
            strong = l.replace('STRONG:', '').trim();
          if (l.indexOf('FLAGS:') === 0)
            flagsText = l.replace('FLAGS:', '').trim();
          if (l.indexOf('FIX:') === 0) fix = l.replace('FIX:', '').trim();
        });
        var sc = parseInt(score) || 5;
        var gc =
          sc >= 9
            ? '#16a34a'
            : sc >= 7
              ? '#2563eb'
              : sc >= 5
                ? '#d97706'
                : '#dc2626';
        var noFlags =
          flagsText === 'None found' ||
          flagsText === '' ||
          flagsText === 'None';
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
          sc +
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
          (noFlags
            ? 'No compliance issues found'
            : 'Issues flagged — review below') +
          '</div></div></div>';
        if (strong)
          html +=
            '<div style="background:#f0fdf4;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:13px;color:#15803d;"><strong>✓ Strong:</strong> ' +
            escHTML(strong) +
            '</div>';
        if (!noFlags)
          html +=
            '<div style="background:#fef2f2;border-radius:8px;padding:12px 14px;margin-bottom:12px;"><div style="font-size:10px;font-weight:800;color:#dc2626;letter-spacing:1px;margin-bottom:6px;">FLAGS</div><div style="font-size:13px;color:#374151;white-space:pre-line;">' +
            escHTML(flagsText) +
            '</div></div>';
        if (fix)
          html +=
            '<div style="background:#eff6ff;border-radius:8px;padding:12px 14px;"><div style="font-size:10px;font-weight:800;color:#2563eb;letter-spacing:1px;margin-bottom:6px;">IMPROVE NEXT CALL</div><div style="font-size:13px;color:#1e40af;">' +
            escHTML(fix) +
            '</div></div>';
        html += '</div>';
        result.innerHTML = html;
      },
      function (err) {
        if (btn) {
          btn.textContent = btn._orig;
          btn.disabled = false;
        }
        if (err === 'no-key') {
          result.innerHTML =
            '<div style="background:#fef9c3;border:1px solid #fde047;border-radius:10px;padding:14px;font-size:13px;color:#713f12;">⚠ No Groq API key. Click <strong>⚙ AI</strong> in the Benefits panel to add your free key from <a href="https://console.groq.com" target="_blank" style="color:#5175f1;">console.groq.com</a></div>';
          return;
        }
        result.innerHTML =
          '<div style="color:#dc2626;font-size:13px;padding:10px;">AI error: ' +
          escHTML(err) +
          '</div>';
      }
    );
  } else {
    if (btn) {
      btn.textContent = btn._orig;
      btn.disabled = false;
    }
    result.innerHTML =
      '<div style="color:#dc2626;font-size:13px;padding:10px;">AI engine not loaded. Refresh the page.</div>';
  }
}
