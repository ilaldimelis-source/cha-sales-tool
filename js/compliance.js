// compliance.js — Compliance Hub tab

function renderComplianceCenter() {
  var html =
    '<div class="ph"><div class="pt">Compliance <span>Center</span></div><p class="ps">Required disclosures, red flags, and audit standards. Review before every shift.</p></div>';
  html +=
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html +=
    '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:12px;">⚠️ MUST SAY ON EVERY CALL</div>';
  html +=
    '<div style="font-size:13px;color:#1C2035;line-height:1.8;">• This is <b>NOT</b> ACA-compliant major medical insurance<br>• This is a <b>limited benefit</b> plan — it does not cover everything<br>• <b>Pre-existing conditions</b> are excluded for the first 12 months<br>• There is a <b>30-day waiting period</b> for sickness benefits (accidents are Day 1)<br>• <b>Maternity / pregnancy is NOT covered</b><br>• Benefits are <b>fixed dollar amounts</b> — the plan pays the scheduled amount, not the full bill<br>• <b>Mental health</b> is NOT covered on most plans (limited on select tiers)<br>• <b>Substance abuse</b> treatment is NOT covered<br>• Member is responsible for any <b>balance</b> after the plan pays</div></div>';
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
  html += '<div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5B8DEF;margin:28px 0 14px;">CALL DISCLOSURE SCRIPTS</div>';
  html += '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5175F1;margin-bottom:10px;">OPENING DISCLOSURE (first 2 min)</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"Before I go any further — what I\'m showing you today is <b>not major medical insurance</b>. It\'s a <b>limited benefit health plan</b> that helps cover everyday medical costs at a fraction of the cost. It does not cover everything. Does that make sense?"</div></div>';
  html += '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#D97706;margin-bottom:10px;">⏳ PRE-EXISTING DISCLOSURE</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"If you have any conditions you\'ve been treated for in the last 12 months, those are <b>pre-existing</b> and <b>not covered</b> for the first 12 months. After that, they\'re covered. Do you have any conditions you\'re currently being treated for?"</div></div>';
  html += '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:10px;">📅 WAITING PERIOD DISCLOSURE</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"For <b>accidents</b>, you\'re covered <b>Day 1</b>. For <b>sickness</b>, there\'s a <b>30-day waiting period</b>. After 30 days, you\'re fully covered for sickness benefits."</div></div>';
  html += '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:10px;">🚫 MATERNITY / EXCLUSIONS</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"This plan does <b>not cover maternity</b>, <b>substance abuse</b>, and <b>mental health</b> is limited or not included depending on the tier."</div></div>';
  html += '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin-bottom:10px;">✓ CLOSING VERIFICATION</div><div class="comp-script-block" style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"Before we finalize:<br>1. This is a <b>limited benefit plan</b>, not major medical<br>2. Pre-existing conditions <b>excluded 12 months</b><br>3. <b>30-day sickness waiting period</b><br>4. <b>Maternity not covered</b><br>5. Benefits are <b>fixed amounts</b> — you may owe a balance<br><br>Do you understand and agree to move forward?"</div></div>';
  document.getElementById('page-compliancecenter').innerHTML = html;
}

function renderCallDisclosures() {
  var html =
    '<div class="ph"><div class="pt">Call <span>Disclosures</span></div><p class="ps">Word-for-word scripts for required disclosures.</p></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#5175F1;margin-bottom:10px;"><svg style="width:12px;height:12px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> OPENING DISCLOSURE (first 2 min)</div><div style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"Before I go any further — what I\'m showing you today is <b>not major medical insurance</b>. It\'s a <b>limited benefit health plan</b> that helps cover everyday medical costs at a fraction of the cost. It does not cover everything. Does that make sense?"</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#D97706;margin-bottom:10px;">⏳ PRE-EXISTING DISCLOSURE</div><div style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"If you have any conditions you\'ve been treated for in the last 12 months, those are <b>pre-existing</b> and <b>not covered</b> for the first 12 months. After that, they\'re covered. Do you have any conditions you\'re currently being treated for?"</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#C2410C;margin-bottom:10px;">📅 WAITING PERIOD DISCLOSURE</div><div style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"For <b>accidents</b>, you\'re covered <b>Day 1</b>. For <b>sickness</b>, there\'s a <b>30-day waiting period</b>. After 30 days, you\'re fully covered for sickness benefits."</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#DC2626;margin-bottom:10px;">🚫 MATERNITY / EXCLUSIONS</div><div style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"This plan does <b>not cover maternity</b>, <b>substance abuse</b>, and <b>mental health</b> is limited or not included depending on the tier."</div></div>';
  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:20px;margin-bottom:16px;"><div style="font-size:.72rem;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#15803D;margin-bottom:10px;"><svg style="width:12px;height:12px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> CLOSING VERIFICATION</div><div style="background:#F8FAFF;border-radius:8px;padding:16px;font-size:13px;color:#1C2035;line-height:1.8;font-style:italic;">"Before we finalize:<br>1. This is a <b>limited benefit plan</b>, not major medical<br>2. Pre-existing conditions <b>excluded 12 months</b><br>3. <b>30-day sickness waiting period</b><br>4. <b>Maternity not covered</b><br>5. Benefits are <b>fixed amounts</b> — you may owe a balance<br><br>Do you understand and agree to move forward?"</div></div>';
  document.getElementById('page-calldisclosures').innerHTML = html;
}

function renderComplianceFlags() {
  var sections = [
    {
      title: 'LEAD SOURCE / INTAKE',
      icon: '🚨',
      flags: [
        {
          flag: 'Leads from sites that look like Healthcare.gov, state exchanges, or ACA/Obamacare branding',
          risk: 'CRITICAL',
          action:
            'These leads are misrepresenting the source. Do NOT assume government origin. Disclose you are a private sales org immediately.'
        },
        {
          flag: 'Landing pages mention open enrollment, Silver/Gold plans, "ACA compliant," or government programs',
          risk: 'CRITICAL',
          action:
            'Client believes they are buying ACA. You MUST correct this before any presentation.'
        },
        {
          flag: 'Agent assumes or reinforces government origin',
          risk: 'CRITICAL',
          action:
            'Never imply you are connected to Healthcare.gov or any government marketplace. State clearly: "I am a licensed agent with a private agency."'
        }
      ]
    },
    {
      title: 'OPENING CALL',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      flags: [
        {
          flag: 'Saying "enrollment center," "government agent," "state exchange rep," or "ACA representative"',
          risk: 'CRITICAL',
          action:
            'These terms imply government affiliation. NEVER use them. Say: "My name is ___, I\'m a licensed agent with Central Health Advisors."'
        },
        {
          flag: 'Implying the call is tied to Healthcare.gov, Marketplace, or government insurance',
          risk: 'CRITICAL',
          action:
            'Letting the client believe this is official government insurance is the #1 compliance violation. Correct immediately.'
        },
        {
          flag: 'Not clearly stating licensed agent status and agency name at start of call',
          risk: 'HIGH',
          action:
            'REQUIRED: State your name, that you are a licensed agent, and your agency name in the first 30 seconds.'
        }
      ]
    },
    {
      title: 'PRODUCT DESCRIPTION',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/></svg>',
      flags: [
        {
          flag: 'Calling it "comprehensive health insurance," "major medical," or "same as ACA"',
          risk: 'CRITICAL',
          action:
            'These are material misrepresentations. Say: "This is a limited benefit plan — it covers specific services at fixed amounts."'
        },
        {
          flag: 'Calling fixed indemnity "insurance," "health insurance," or "full coverage"',
          risk: 'CRITICAL',
          action:
            'Fixed indemnity pays cash amounts — it is NOT insurance that pays medical bills. Disclose this clearly.'
        },
        {
          flag: 'Saying "PPO" when it\'s not a real PPO, or "nationwide coverage" without limits',
          risk: 'HIGH',
          action:
            'First Health/MultiPlan are discount networks, not true PPOs. Say: "You have access to negotiated rates through the network."'
        },
        {
          flag: 'Saying "covers everything" or "works like ACA"',
          risk: 'CRITICAL',
          action:
            'This is false. These are limited benefit plans with caps, exclusions, and waiting periods. NEVER imply full coverage.'
        }
      ]
    },
    {
      title: 'COST / BENEFIT',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      flags: [
        {
          flag: 'Saying "no deductible" without explaining payout limits and caps',
          risk: 'HIGH',
          action:
            'While technically no deductible, benefits are CAPPED. Must explain: per-day caps, per-incident caps, annual caps.'
        },
        {
          flag: 'Quoting low copays without explaining payout limits',
          risk: 'HIGH',
          action:
            '$25 copay sounds great — but max $150/visit, limited visits/year. Always explain the full picture.'
        },
        {
          flag: 'Hiding per-day, per-incident, annual, or lifetime caps',
          risk: 'CRITICAL',
          action:
            'Omitting benefit caps is a material omission. The FTC considers this deception. Always disclose ALL caps.'
        },
        {
          flag: 'Not clearly explaining monthly premium vs. one-time enrollment fee',
          risk: 'MEDIUM',
          action:
            'Break down: "Your first month is $___ which includes a one-time enrollment fee of $___. After that, it\'s $___ per month."'
        }
      ]
    },
    {
      title: 'PROVIDER / PRESCRIPTION',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
      flags: [
        {
          flag: 'Confirming a doctor is covered without checking reimbursement rules',
          risk: 'HIGH',
          action:
            'NEVER say "your doctor is covered." Say: "You can search for in-network providers at [website]. Benefits are subject to the schedule."'
        },
        {
          flag: "Saying prescriptions are covered without explaining it's discount-only",
          risk: 'HIGH',
          action:
            'Most plans have Rx discount programs, NOT real drug coverage. Say: "You get access to a prescription discount program."'
        },
        {
          flag: 'Saying "you have network access" without clarifying discount vs. insurance',
          risk: 'HIGH',
          action:
            'Network access = negotiated rates, NOT insurance coverage. Clarify: "The network provides discounted rates, but you pay the discounted price."'
        }
      ]
    },
    {
      title: 'COMPARISON / STEERING',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
      flags: [
        {
          flag: 'Saying ACA is "too expensive" or "bad coverage"',
          risk: 'CRITICAL',
          action:
            'NEVER disparage ACA plans. This is a compliance violation. Present your plan on its own merits.'
        },
        {
          flag: 'Saying "you don\'t qualify" for ACA without a real reason',
          risk: 'CRITICAL',
          action:
            'Almost everyone qualifies for ACA during open enrollment. Do not lie about eligibility to steer toward commission products.'
        },
        {
          flag: 'Saying your plan is "better" or "cheaper" than ACA without proof',
          risk: 'HIGH',
          action:
            'Comparative claims require documentation. Stick to: "This plan covers these specific services at these amounts."'
        },
        {
          flag: 'Steering clients away from ACA toward commission products',
          risk: 'CRITICAL',
          action:
            'If ACA is a better fit, say so. Selling the wrong product = chargebacks, complaints, and potential legal action.'
        }
      ]
    },
    {
      title: 'PRESSURE TACTICS',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      flags: [
        {
          flag: 'Using false urgency: "only good today," "must enroll now," "won\'t be available later"',
          risk: 'HIGH',
          action:
            'These plans are available anytime. False urgency is deceptive. Let the client decide on their timeline.'
        },
        {
          flag: 'Saying "easy cancellation" without explaining the actual process',
          risk: 'HIGH',
          action:
            'Explain the real cancellation process. If it involves calling a number and waiting, say that.'
        },
        {
          flag: 'Not giving documents BEFORE taking payment',
          risk: 'CRITICAL',
          action:
            'Client must receive and acknowledge plan documents before any payment is processed.'
        }
      ]
    },
    {
      title: 'PAYMENT / VERIFICATION',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="22" height="16" x="1" y="4" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
      flags: [
        {
          flag: 'Taking payment BEFORE completing all required disclosures',
          risk: 'CRITICAL',
          action:
            'ALL disclosures must be completed and acknowledged BEFORE any payment information is collected. This is non-negotiable.'
        },
        {
          flag: 'Telling client "don\'t ask questions," "rush through," or "don\'t interrupt" during verification',
          risk: 'CRITICAL',
          action:
            "Verification exists to protect the client. They must be given time to read, ask questions, and understand what they're signing."
        },
        {
          flag: 'Having client e-sign without time to read',
          risk: 'HIGH',
          action:
            'Client must have adequate time to review all documents. Rushing = compliance violation + chargeback risk.'
        },
        {
          flag: 'Saying "this is not major medical" BUT implying it IS through the rest of the call',
          risk: 'CRITICAL',
          action:
            'Saying the disclaimer but contradicting it throughout the call is worse than not saying it. The FTC looks at the OVERALL impression.'
        }
      ]
    },
    {
      title: 'POST-SALE',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
      flags: [
        {
          flag: 'No immediate documents sent after enrollment',
          risk: 'HIGH',
          action:
            'Client must receive confirmation email, plan documents, and ID cards promptly. Delays = complaints.'
        },
        {
          flag: 'Making cancellation difficult: long hold times, blocking access to agent',
          risk: 'HIGH',
          action:
            'If a client wants to cancel, help them. Blocking cancellation = chargebacks + complaints.'
        },
        {
          flag: 'Telling client to "cancel the card" instead of proper cancellation',
          risk: 'CRITICAL',
          action:
            'Never advise card cancellation as a plan cancellation method. This creates billing disputes and does not properly cancel coverage.'
        }
      ]
    },
    {
      title: 'STRUCTURAL (COMPANY-LEVEL)',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
      flags: [
        {
          flag: 'Shared scripts, staff, HR, compliance, or bank accounts across companies',
          risk: 'CRITICAL',
          action:
            'FTC views this as "common enterprise" — all entities become liable for violations of any one entity.'
        },
        {
          flag: 'Leadership involved in scripts, training, leads, AND payments',
          risk: 'CRITICAL',
          action:
            'FTC can assign INDIVIDUAL liability to leaders who control deceptive practices.'
        },
        {
          flag: 'No separation between marketing, sales, and compliance functions',
          risk: 'HIGH',
          action:
            "These must be independent. If the same people write scripts AND handle complaints, that's a structural red flag."
        }
      ]
    },
    {
      title: 'PROSPECT-LEVEL (ORIGINAL FLAGS)',
      icon: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      flags: [
        {
          flag: 'Prospect mentions pregnancy',
          risk: 'CRITICAL',
          action:
            'Maternity NOT covered. Do NOT sell if this is their primary need. Refer to ACA.'
        },
        {
          flag: 'Being treated for cancer/heart disease/diabetes',
          risk: 'CRITICAL',
          action: 'Pre-existing — excluded 12 months. Disclose clearly.'
        },
        {
          flag: 'Asks "does this cover everything?"',
          risk: 'HIGH',
          action:
            'NEVER say yes. Say: "This covers services listed in the Schedule of Benefits."'
        },
        {
          flag: "Seems confused about what they're buying",
          risk: 'HIGH',
          action:
            'Stop and re-explain. Get verbal confirmation before continuing.'
        },
        {
          flag: 'Needs mental health or substance abuse treatment',
          risk: 'HIGH',
          action:
            'Most plans do NOT cover this. Only select tiers have limited mental health (200-500 only on HarmonyCare).'
        },
        {
          flag: 'Has upcoming scheduled surgery',
          risk: 'HIGH',
          action:
            'If within 30-day wait or pre-existing, NOT covered. Be transparent.'
        },
        {
          flag: 'Asks about expensive brand-name drugs',
          risk: 'MEDIUM',
          action:
            'Most plans have limited or discount-only Rx. Smart Choice generics only ($12).'
        },
        {
          flag: 'Elderly (65+) or mentions Medicare',
          risk: 'HIGH',
          action:
            'NOT a Medicare supplement. Do not sell as Medicare replacement.'
        },
        {
          flag: 'Rushes to sign up without questions',
          risk: 'MEDIUM',
          action:
            'Slow down. Rushed sale = higher chargeback risk. Use closing verification.'
        },
        {
          flag: 'Asks about out-of-network on Smart Choice',
          risk: 'HIGH',
          action: 'Smart Choice EPO = ZERO out-of-network coverage.'
        }
      ]
    }
  ];
  var html =
    '<div class="ph"><div class="pt">Red <span>Flags</span></div><p class="ps">Complete compliance red flag reference — lead source through post-sale. Know these cold.</p></div>';
  html +=
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:12px;padding:14px;margin-bottom:16px;"><div style="font-weight:800;font-size:13px;color:#DC2626;margin-bottom:4px;">⚠️ FTC WARNING</div><div style="font-size:12px;color:#848A9C;line-height:1.6;">If these red flags exist, the FTC considers them: <b>Deception</b>, <b>Material Omission</b>, <b>Common Enterprise</b>, and <b>Individual Liability</b>. Agents AND leadership can be held personally responsible.</div></div>';
  sections.forEach(function (sec) {
    html +=
      '<div style="margin-bottom:20px;"><div style="font-size:14px;font-weight:800;color:#1C2035;margin-bottom:10px;padding-bottom:6px;border-bottom:2px solid #E8EBF5;">' +
      sec.icon +
      ' ' +
      sec.title +
      '</div>';
    sec.flags.forEach(function (rf) {
      html +=
        '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:14px;margin-bottom:8px;"><div style="font-size:12px;font-weight:700;color:#1C2035;margin-bottom:6px;">🚩 ' +
        escHTML(rf.flag) +
        '</div><div style="font-size:11px;color:#848A9C;line-height:1.6;">' +
        escHTML(rf.action) +
        '</div></div>';
    });
    html += '</div>';
  });
  document.getElementById('page-complianceflags').innerHTML = html;
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
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #29A26A;border-radius:12px;padding:16px;margin-top:12px;"><div style="font-size:13px;font-weight:800;color:#166534;margin-bottom:6px;">Audit Standard</div><div style="font-size:12px;color:#4F566B;line-height:1.7;">Every item on this checklist reflects a compliance or sales quality requirement. Any item left unchecked during a call review indicates a gap that must be addressed before the next call. Use this checklist consistently across all call reviews to maintain audit readiness.</div></div>';
  document.getElementById('page-callaudit').innerHTML = html;
}
