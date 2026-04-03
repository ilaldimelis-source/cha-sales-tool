// live-assist.js — Live Assist tab (Live, Recovery, QA Rebuttals)

var QA_REBUTTALS = [
  {
    q: 'So how much will the doctor visit cost me?',
    a: "Harmony Care pays doctor visits as a fixed cash benefit based on the plan's limits. The plan contributes a set amount toward the visit, and anything above that amount would be your responsibility. Providers charge differently, the benefit is meant to help offset the cost, not cover it in full."
  },
  {
    q: 'Is there a co-pay when I go to the doctor?',
    a: "There isn't a traditional copay. Instead of copays, the plan pays a defined cash benefit per visit, up to the plan's limits. This is one of the reasons the monthly cost stays lower."
  },
  {
    q: 'Will the doctor bill my insurance?',
    a: 'The provider typically bills you directly, and the plan pays the benefit according to the policy terms. Harmony Care is a cash benefit plan and does not coordinate payment with providers like major medical insurance.'
  },
  {
    q: 'Does this work for any doctor?',
    a: 'You can see any doctor you choose within the network. The plan pays the same fixed benefit amount regardless of which provider you see and does not negotiate or reprice bills.'
  },
  {
    q: 'How many times can I use it for doctor visits?',
    a: 'Doctor visit benefits are limited to a set number of visits per year, as outlined in the policy. These limits will be clearly stated in the coverage documents.'
  },
  {
    q: 'What if the visit is expensive?',
    a: 'The plan still pays the same fixed benefit amount. Any charges above that benefit would be your responsibility. This is why the plan is considered financial assistance rather than full coverage.'
  },
  {
    q: 'Can I use this for specialists?',
    a: 'Yes. Doctor visit benefits apply to licensed physicians, including specialists. There are no referral requirements as long as they are in network.'
  },
  {
    q: 'Does this cover follow-up visits?',
    a: "Benefits are paid per visit, up to the plan's annual visit limits. Each visit is treated separately."
  },
  {
    q: "Why wouldn't I just pay cash for Doctor Visits?",
    a: 'These plans provide pre-negotiated rates that are typically lower than cash pay prices.'
  },
  {
    q: 'Can I receive this in email?',
    a: 'Yes I am going to send you over the terms and conditions in the verification E-Signature where you will have to accept prior to enrolling you into the plan.'
  },
  {
    q: 'Is this a PPO or HMO Policy?',
    a: 'These plans use a PPO NETWORK of doctors. You do not need a referral to see a specialist however you must be in network to receive benefits.'
  },
  { q: "What's an emergency situation?", a: 'An emergency room visit.' },
  {
    q: "What's the difference between a Short Term (STM) plan and an ACA or major medical?",
    a: 'A STM plan has waiting periods on pre-existing conditions, has limitations on coverage (Pregnancy, Substance or Alcohol Abuse Treatment, Mental Health services). STM plans can only be held for up to 2 years.'
  },
  {
    q: "What's the difference between the network and the underwriter?",
    a: 'The Underwriter is who pays the claims and the network is the different doctors and facilities you can go to.'
  },
  {
    q: "What's a QLE?",
    a: 'Loss of Major Medical Health Insurance within 60 days. This could mean an individual was fired from a job where they were provided insurance. Having a baby, moving to a different state, getting married, getting divorced, aging out of parents plans, losing medicaid, gaining US Citizenship.'
  },
  {
    q: 'How do you get paid?',
    a: 'I work for Central Health Advisors, an Insurance Agency and receive a weekly salary.'
  }
];

function renderLive() {
  var html =
    '<div class="ph"><div class="pt">Live <span>Assist</span></div><div class="pd">Your mid-call tactical panel. Search anything or tap a quick shortcut below.</div></div>';
  html += '<div id="liveResult" class="lrp"></div>';
  html +=
    '<div class="quick-panel"><div class="qp-title">Common Objections — Quick Launch</div><div class="qp-items">';
  for (var i = 0; i < Math.min(6, OBJECTIONS.length); i++) {
    html +=
      '<div class="qp-item" onclick="showLiveObj(' +
      i +
      ')"><div class="qp-item-q">"' +
      OBJECTIONS[i].obj +
      '"</div><div class="qp-item-hint">' +
      OBJECTIONS[i].cat +
      ' · Tap for scripts + bridge</div></div>';
  }
  html += '</div></div>';
  html += '<div class="live-grid">';
  html +=
    '<div class="live-card" onclick="showPage(\'closes\')"><div class="live-card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/></svg></div><div class="live-card-title">Closing Lines</div><div class="live-card-desc">Assumptive, soft, direct, urgency closes</div></div>';
  html +=
    '<div class="live-card" onclick="showPage(\'recovery\')"><div class="live-card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg></div><div class="live-card-title">Regain Control</div><div class="live-card-desc">Recovery scripts for any situation</div></div>';
  html +=
    '<div class="live-card" onclick="showPage(\'benefits\')"><div class="live-card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l4-4h12l4 4-10 13L2 7z"/><path d="M2 7h20"/></svg></div><div class="live-card-title">Benefit Explainer</div><div class="live-card-desc">Plain-English for any benefit question</div></div>';
  html +=
    '<div class="live-card" onclick="showPage(\'plans\')"><div class="live-card-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/></svg></div><div class="live-card-title">Plan Vault</div><div class="live-card-desc">Framing, fit, and compliance for every plan</div></div>';
  html += '</div>';
  var _page_live = document.getElementById('page-live');
  if (_page_live) _page_live.innerHTML = html;
}

function openRecoveryFromLive(idx) {
  showPage('recovery');
  setTimeout(function () {
    var body = document.getElementById('recbody' + idx);
    var chev = document.getElementById('rechev' + idx);
    if (body) {
      body.style.display = 'block';
      if (chev) chev.style.transform = 'rotate(180deg)';
      var el = document.getElementById('rec' + idx);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 200);
}

function showLiveObj(i) {
  var o = OBJECTIONS[i];
  var el = document.getElementById('liveResult');
  var html =
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">';
  html +=
    '<div><span style="display:inline-flex;align-items:center;font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 10px;border-radius:999px;background:rgba(92,104,120,0.08);color:#5C6878;">Objection · ' +
    o.cat +
    '</span></div>';
  html +=
    '<button class="lrp-close" onclick="document.getElementById(\'liveResult\').classList.remove(\'show\')">✕</button></div>';
  html += '<div class="lrp-obj">"' + o.obj + '"</div>';
  html +=
    '<div class="ibox ibox-diag"><span class="sbox-lbl"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> Diagnostic Question First</span><br>' +
    o.diag +
    '</div>';
  html +=
    '<div class="ibox ibox-why"><span class="sbox-lbl"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17H8v-2.3A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/></svg> What This Usually Means</span><br>' +
    o.real +
    '</div>';
  html +=
    '<div style="display:flex;gap:8px;margin:12px 0;"><button class="rtab active" onclick="switchLivTab(event,\'lr' +
    i +
    '\',\'best\')">Best Response</button><button class="rtab" onclick="switchLivTab(event,\'lr' +
    i +
    '\',\'soft\')">Softer</button><button class="rtab" onclick="switchLivTab(event,\'lr' +
    i +
    "','strong')\">Stronger</button></div>";
  html +=
    '<div id="lr' +
    i +
    '-best" class="rpanel active sbox">' +
    o.best +
    '</div>';
  html += '<div id="lr' + i + '-soft" class="rpanel sbox">' + o.soft + '</div>';
  html +=
    '<div id="lr' + i + '-strong" class="rpanel sbox">' + o.strong + '</div>';
  html +=
    '<div class="ibox ibox-bridge u-mt10"><span class="sbox-lbl"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg> Bridge Line</span><br>' +
    o.bridge +
    '</div>';
  html +=
    '<div class="ibox ibox-bridge" style="border-color:rgba(212,96,122,0.2);background:rgba(212,96,122,0.05);"><span class="sbox-lbl" style="color:var(--charcoal);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/></svg> Close Line</span><br>' +
    o.close +
    '</div>';
  el.innerHTML = html;
  el.classList.add('show');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function switchLivTab(e, prefix, tab) {
  switchTab(e, prefix, tab);
}

// ══════════════════════════════════════════════════════
// RENDER: RECOVERY
// ══════════════════════════════════════════════════════
function renderRecovery() {
  var html =
    '<div class="ph"><div class="pt">Regain <span>Control</span></div><div class="pd">Answer. Bridge. Close. Every situation handled.</div></div>';
  RECOVERY.forEach(function (r, i) {
    html += '<div class="rec-card" id="rec' + i + '">';

    // ── HEADER ──
    html +=
      '<div class="rec-hd" onclick="toggleRec(' +
      i +
      ')" style="display:flex;align-items:center;gap:12px;padding:16px 20px;cursor:pointer;">';
    html += iconBox(P[r.icon] || P.circle);
    html += '<div class="u-flex1"><div class="rec-label">' + r.label + '</div>';
    html +=
      '<div style="font-size:.68rem;color:var(--txt-muted);margin-top:2px;font-family:var(--font-body);">' +
      r.situation +
      '</div></div>';
    html +=
      '<span style="color:var(--txt-muted);font-size:11px;">▼</span></div>';

    // ── BODY ──
    html +=
      '<div class="rec-body" style="display:none;padding:0 20px 20px;border-top:1px solid var(--rule);">';

    // Answer + Bridge block
    html += '<div style="margin-top:16px;">';
    html += '<div class="slbl u-mb8">Answer + Bridge</div>';

    // Acknowledge
    html +=
      '<div style="margin-bottom:8px;padding:10px 14px;background:rgba(26,29,38,0.04);border-radius:8px;border-left:3px solid var(--pastel-blue2);">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--txt-muted);margin-bottom:4px;">Acknowledge</div>';
    html +=
      '<div style="font-family:var(--font-body);font-size:.82rem;color:var(--txt-head);font-style:italic;line-height:1.6;">' +
      r.acknowledge +
      '</div>';
    html += '</div>';

    // Bridge
    html +=
      '<div style="margin-bottom:8px;padding:10px 14px;background:rgba(26,29,38,0.04);border-radius:8px;border-left:3px solid var(--pastel-blue2);">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--txt-muted);margin-bottom:4px;">Bridge</div>';
    html +=
      '<div style="font-family:var(--font-body);font-size:.82rem;color:var(--txt-head);font-style:italic;line-height:1.6;">' +
      r.bridge +
      '</div>';
    html += '</div>';

    // Move (Close Bridge)
    html +=
      '<div style="margin-bottom:16px;padding:10px 14px;background:rgba(26,29,38,0.04);border-radius:8px;border-left:3px solid var(--pastel-blue2);">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--txt-muted);margin-bottom:4px;">Close Bridge</div>';
    html +=
      '<div style="font-family:var(--font-body);font-size:.82rem;color:var(--txt-head);font-style:italic;line-height:1.6;">' +
      r.move +
      '</div>';
    html += '</div>';
    html += '</div>';

    // Script tabs
    html += '<div class="slbl u-mb8">Full Script</div>';
    html += '<div style="display:flex;gap:6px;margin-bottom:8px;">';
    html +=
      '<button class="rtab active" onclick="switchRecTab(event,\'rec' +
      i +
      "','script')\">Best</button>";
    html +=
      '<button class="rtab" onclick="switchRecTab(event,\'rec' +
      i +
      "','soft')\">Softer</button>";
    html +=
      '<button class="rtab" onclick="switchRecTab(event,\'rec' +
      i +
      "','strong')\">Stronger</button>";
    html += '</div>';
    html +=
      '<div id="rec' +
      i +
      '-script" class="rpanel active sbox u-mb8">' +
      r.script +
      '</div>';
    html +=
      '<div id="rec' +
      i +
      '-soft" class="rpanel sbox u-mb8">' +
      r.soft +
      '</div>';
    html +=
      '<div id="rec' +
      i +
      '-strong" class="rpanel sbox u-mb8">' +
      r.strong +
      '</div>';

    // Watch out
    html += '<div class="slbl" style="margin:12px 0 8px;">Watch Out</div>';
    html +=
      '<div style="padding:10px 14px;background:rgba(224,80,80,0.05);border-radius:8px;border:1px solid rgba(224,80,80,0.12);">';
    r.mistakes.forEach(function (m) {
      html +=
        '<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:5px;font-family:var(--font-body);font-size:.76rem;color:var(--txt-body);line-height:1.5;">';
      html +=
        '<span style="color:var(--error);margin-top:1px;flex-shrink:0;">' +
        mkIcon(P.xmark) +
        '</span>' +
        m +
        '</div>';
    });
    html += '</div>';

    // Final Close block
    html +=
      '<div style="margin-top:16px;padding:14px 16px;background:rgba(92,104,120,0.06);border-radius:12px;border:1px solid var(--rule2);">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:.6rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--txt-muted);margin-bottom:10px;">Final Close</div>';
    html += '<div class="sbox" style="margin-bottom:8px;font-style:normal;">';
    html +=
      '<span style="font-family:var(--font-ui);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--txt-muted);display:block;margin-bottom:4px;">Ask</span>';
    html +=
      '"Based on what we went over… do you feel like this would actually help you if something unexpected happened?"';
    html += '</div>';
    html +=
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">';
    // YES
    html +=
      '<div style="padding:10px 12px;background:rgba(46,125,82,0.07);border-radius:8px;border-left:3px solid #2E7D52;">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#2E7D52;margin-bottom:4px;">YES</div>';
    html +=
      '<div style="font-family:var(--font-body);font-size:.78rem;color:var(--txt-body);font-style:italic;line-height:1.5;">"Perfect — let\'s go ahead and get you covered so you\'re not exposed."</div>';
    html += '</div>';
    // HESITATION
    html +=
      '<div style="padding:10px 12px;background:rgba(196,150,10,0.07);border-radius:8px;border-left:3px solid #C4960A;">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C4960A;margin-bottom:4px;">Hesitation</div>';
    html +=
      '<div style="font-family:var(--font-body);font-size:.78rem;color:var(--txt-body);font-style:italic;line-height:1.5;">"What\'s still holding you back right now?"</div>';
    html += '</div>';
    html += '</div></div>';

    html += '</div></div>';
  });
  var _page_recovery = document.getElementById('page-recovery');
  if (_page_recovery) _page_recovery.innerHTML = html;
}

function switchRecTab(e, prefix, tab) {
  switchTab(e, prefix, tab);
}

function toggleRec(i) {
  toggleCard('rec' + i, 'rec-body');
}

function renderQaRebuttals() {
  var html = '<div class="ph"><div class="pt">Q&A <span>Rebuttals</span></div>';
  html +=
    '<div class="pd">Common client questions about doctor visits under Limited Med plans — with QA-safe, compliant responses you can use verbatim on live calls.</div></div>';
  html += '<div style="display:flex;flex-direction:column;gap:12px;">';
  QA_REBUTTALS.forEach(function (item) {
    html +=
      '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;padding:18px 22px;box-shadow:var(--shadow-card)">';
    html +=
      '<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">';
    html +=
      '<span style="flex-shrink:0;width:30px;height:30px;border-radius:50%;background:rgba(237,95,116,0.12);color:#DC2626;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:800">Q</span>';
    html +=
      '<div style="font-family:var(--font-ui);font-size:.95rem;font-weight:800;color:var(--txt-hero);line-height:1.45">' +
      item.q +
      '</div>';
    html += '</div>';
    html += '<div style="display:flex;align-items:flex-start;gap:10px">';
    html +=
      '<span style="flex-shrink:0;width:30px;height:30px;border-radius:50%;background:rgba(62,207,142,0.12);color:#29A26A;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:800">A</span>';
    html +=
      '<div style="font-family:var(--font-body);font-size:.88rem;color:var(--txt-body);line-height:1.7">' +
      item.a +
      '</div>';
    html += '</div></div>';
  });
  html += '</div>';
  var _page_qarebuttals = document.getElementById('page-qarebuttals');
  if (_page_qarebuttals) _page_qarebuttals.innerHTML = html;
}
