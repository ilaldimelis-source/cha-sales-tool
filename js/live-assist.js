// live-assist.js — Live Assist tab (Live, Control the Call, QA Rebuttals)

// ── SOA One-Tap Copy ──
var SOA_TEXT =
  'This is a supplemental fixed indemnity health plan — not major medical insurance. It is not minimum essential coverage under the ACA. Pre-existing conditions are excluded for the first 12 months. Benefits are fixed dollar amounts, not full coverage. This plan is NOT ACA-compliant major medical insurance.';
function copySOA(el) {
  safeCopy(SOA_TEXT)
    .then(function () {
      el.style.background = '#D1FAE5';
      var hint = el.querySelector('.soa-copy-hint');
      if (hint) hint.textContent = 'Copied!';
      setTimeout(function () {
        el.style.background = '#EEF3FF';
        if (hint) hint.textContent = 'Tap to copy';
      }, 1500);
    })
    .catch(function () {});
}

// ── Copy Script Block ──
function copyScript(btn) {
  var block =
    btn.closest('.sbox') ||
    btn.closest('.comp-script-block') ||
    btn.closest('.la-sec-text') ||
    btn.parentElement;
  if (!block) return;
  var text = block.textContent.replace(/Copy|Copied!/g, '').trim();
  safeCopy(text)
    .then(function () {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1500);
    })
    .catch(function () {});
}

function showToast(message, kind) {
  var id = 'cha-toast-lite';
  var old = document.getElementById(id);
  if (old) old.remove();
  var t = document.createElement('div');
  t.id = id;
  t.textContent = message;
  t.style.cssText =
    'position:fixed;right:20px;bottom:20px;z-index:99999;padding:10px 14px;border-radius:10px;font-size:12px;font-weight:600;color:#fff;' +
    (kind === 'error' ? 'background:#ef4444;' : 'background:#10b981;');
  document.body.appendChild(t);
  setTimeout(function () {
    if (t && t.parentNode) t.parentNode.removeChild(t);
  }, 1800);
}

var CHA_SCRIPT_LINES = [
  { text: "Central Health Advisors, this is [NAME]. I'll be your licensed health insurance agent assisting you today.", tone: 'authority' },
  { text: 'Please note that this call may be recorded for training and quality assurance.', tone: 'authority' },
  { text: 'Were you looking for an individual or family plan TODAY?', tone: 'friendly' },
  { text: 'OK! GREAT! Now are you currently insured?', tone: 'friendly' },
  { text: 'Do you have any pre-existing medical conditions I should be aware of?', tone: 'friendly' },
  { text: "Are you currently taking any medications you'd like me to make sure are covered?", tone: 'friendly' },
  { text: 'What is your Date of Birth?', tone: 'friendly' },
  { text: 'Please verify your zip code?', tone: 'friendly' },
  { text: 'Are you a tobacco user?', tone: 'friendly' },
  { text: 'How many times do you go to the doctors on a yearly basis?', tone: 'friendly' },
  { text: "Do you have any doctors you'd like to keep in the network?", tone: 'friendly' },
  { text: 'Do you have any upcoming surgeries, procedures or treatments scheduled?', tone: 'friendly' },
  { text: 'How much money do you make on a yearly basis BEFORE TAX?', tone: 'authority' },
  { text: "Is there a monthly price range you're hoping to stay within?", tone: 'friendly' },
  { text: 'Assuming we find the right fit, how soon would you like your coverage to begin?', tone: 'friendly' },
  { text: "I'm going to submit your information into my system now. Give me about 30-60 seconds...", tone: 'authority' }
];
var chaScriptIndex = parseInt(localStorage.getItem('scriptIndex') || '0', 10);
var complianceChecklist = { agency: false, recording: false, exclusions: false, preex: false };
var academyProgress = JSON.parse(localStorage.getItem('academyProgress') || '{"1":false,"2":false,"3":false,"4":false}');

function showCurrentLine() {
  var display = document.getElementById('script-display');
  var counter = document.getElementById('line-counter');
  if (!display || !counter) return;
  if (chaScriptIndex < 0) chaScriptIndex = 0;
  if (chaScriptIndex >= CHA_SCRIPT_LINES.length) chaScriptIndex = CHA_SCRIPT_LINES.length - 1;
  var line = CHA_SCRIPT_LINES[chaScriptIndex];
  var toneColor = line.tone === 'authority' ? '#6366F1' : '#F59E0B';
  var toneIcon = line.tone === 'authority' ? 'AUTHORITY' : 'FRIENDLY';
  display.innerHTML =
    '<div class="script-line" style="box-shadow:0 0 12px ' + toneColor + ';border-left:4px solid ' + toneColor + ';">' +
    '<div class="tone-indicator" style="color:' + toneColor + ';">' + toneIcon + '</div>' +
    '<p>' + escHTML(line.text) + '</p></div>';
  counter.textContent = (chaScriptIndex + 1) + ' / ' + CHA_SCRIPT_LINES.length;
}

function nextLine() {
  chaScriptIndex = Math.min(chaScriptIndex + 1, CHA_SCRIPT_LINES.length - 1);
  localStorage.setItem('scriptIndex', String(chaScriptIndex));
  showCurrentLine();
}
function prevLine() {
  chaScriptIndex = Math.max(chaScriptIndex - 1, 0);
  localStorage.setItem('scriptIndex', String(chaScriptIndex));
  showCurrentLine();
}
function resetScript() {
  chaScriptIndex = 0;
  localStorage.setItem('scriptIndex', '0');
  showCurrentLine();
}
function updateChecklist(item) {
  var el = document.getElementById('check-' + item);
  complianceChecklist[item] = !!(el && el.checked);
  checkSubmitEligibility();
}
function checkSubmitEligibility() {
  var btn = document.getElementById('submit-sale-btn');
  if (!btn) return;
  var ok = true;
  var keys = Object.keys(complianceChecklist);
  for (var i = 0; i < keys.length; i++) {
    if (!complianceChecklist[keys[i]]) ok = false;
  }
  btn.disabled = !ok;
}
function attemptSubmit() {
  var ok = true;
  var keys = Object.keys(complianceChecklist);
  for (var i = 0; i < keys.length; i++) {
    if (!complianceChecklist[keys[i]]) ok = false;
  }
  if (!ok) {
    showToast('Complete all compliance disclosures first.', 'error');
    return false;
  }
  showToast('Sale submitted.', 'success');
  return true;
}

function copyToClipboard(text) {
  safeCopy(text).then(function () { showToast('Copied.', 'success'); }).catch(function () {});
}
function markComplete(moduleNum) {
  academyProgress[moduleNum] = true;
  localStorage.setItem('academyProgress', JSON.stringify(academyProgress));
  updateProgressBar();
}
function updateProgressBar() {
  var completed = 0;
  var vals = Object.keys(academyProgress);
  for (var i = 0; i < vals.length; i++) if (academyProgress[vals[i]]) completed++;
  var fill = document.getElementById('progress-fill');
  var text = document.querySelector('.progress-text');
  if (fill) fill.style.width = ((completed / 4) * 100) + '%';
  if (text) text.textContent = completed + '/4 Complete';
}

function parseReceipt(rawText) {
  var text = String(rawText || '');
  var out = [];
  var dateMatch = text.match(/Confirmation Date:\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/i);
  var saleDate = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  var autoDate = !dateMatch;
  var re = /(?:premium|monthly)[:\s]*\$?([\d,]+\.?\d*)/gi;
  var m;
  var idx = 0;
  while ((m = re.exec(text)) !== null) {
    var monthly = parseFloat(String(m[1]).replace(',', '')) || 0;
    out.push({
      id: Date.now() + idx,
      date: saleDate,
      dateAutoDefaulted: autoDate,
      member: 'Client ' + (idx + 1),
      product: 'Plan ' + (idx + 1),
      monthlyPremium: monthly,
      commission: monthly * 0.25,
      timestamp: new Date().toISOString()
    });
    idx++;
  }
  return out;
}
function parseAndReview() {
  var input = document.getElementById('receipt-input');
  if (!input) return;
  var deals = parseReceipt(input.value || '');
  // #region agent log
  fetch('http://127.0.0.1:7347/ingest/4aa1827a-5cdd-4035-8984-1fb063ffa870',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb7e63'},body:JSON.stringify({sessionId:'fb7e63',runId:'audit-run-1',hypothesisId:'H5',location:'js/live-assist.js:parseAndReview',message:'Receipt parse executed',data:{deals:deals.length,inputLen:String((input.value||'')).length},timestamp:Date.now()})}).catch(function(){});
  // #endregion
  if (!deals.length) {
    showToast('No receipts found. Check your paste.', 'error');
    return;
  }
  showReviewModal(deals);
}
function updateTotals() {
  var deals = [];
  try { deals = JSON.parse(localStorage.getItem('trackerDeals') || '[]'); } catch (_e) {}
  var today = new Date().toDateString();
  var weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  var dailyTotal = 0;
  var dailyCom = 0;
  var weeklyTotal = 0;
  var weeklyCom = 0;
  for (var i = 0; i < deals.length; i++) {
    var d = deals[i];
    var when = new Date(d.timestamp || Date.now());
    if (when.toDateString() === today) {
      dailyTotal += Number(d.monthlyPremium) || 0;
      dailyCom += Number(d.commission) || 0;
    }
    if (when >= weekAgo) {
      weeklyTotal += Number(d.monthlyPremium) || 0;
      weeklyCom += Number(d.commission) || 0;
    }
  }
  var dailyEl = document.getElementById('daily-total');
  var weeklyEl = document.getElementById('weekly-total');
  if (dailyEl) dailyEl.innerHTML = 'Today: $' + dailyTotal.toFixed(2) + ' <span style="color:#10B981;">| Commission: $' + dailyCom.toFixed(2) + '</span>';
  if (weeklyEl) weeklyEl.innerHTML = 'This Week: $' + weeklyTotal.toFixed(2) + ' <span style="color:#10B981;">| Commission: $' + weeklyCom.toFixed(2) + '</span>';
}

function showReviewModal(deals) {
  var modal = document.getElementById('review-modal');
  var tbody = document.getElementById('review-table-body');
  if (!modal || !tbody) return;
  var rows = [];
  for (var i = 0; i < deals.length; i++) {
    var d = deals[i];
    rows.push(
      '<tr>' +
        '<td style="' + (d.dateAutoDefaulted ? 'background:#EF4444;color:white;' : '') + '">' +
          (d.dateAutoDefaulted ? '⚠️ ' : '') + escHTML(d.date) +
        '</td>' +
        '<td>' + escHTML(d.member) + '</td>' +
        '<td>' + escHTML(d.product) + '</td>' +
        '<td>$' + Number(d.monthlyPremium || 0).toFixed(2) + '</td>' +
        '<td style="color:#10B981;font-weight:600;">$' + Number(d.commission || 0).toFixed(2) + '</td>' +
      '</tr>'
    );
  }
  // #region agent log
  var __chaWarnCount = 0;
  for (var wi = 0; wi < deals.length; wi++) { if (deals[wi] && deals[wi].dateAutoDefaulted) __chaWarnCount++; }
  fetch('http://127.0.0.1:7347/ingest/4aa1827a-5cdd-4035-8984-1fb063ffa870',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb7e63'},body:JSON.stringify({sessionId:'fb7e63',runId:'audit-run-1',hypothesisId:'H5',location:'js/live-assist.js:showReviewModal',message:'Receipt review modal rendered',data:{rows:deals.length,defaultedDates:__chaWarnCount},timestamp:Date.now()})}).catch(function(){});
  // #endregion
  tbody.innerHTML = rows.join('');
  modal.style.display = 'flex';
  window.__chaPendingDeals = deals;
}

function closeReviewModal() {
  var modal = document.getElementById('review-modal');
  if (modal) modal.style.display = 'none';
}

function confirmReviewModal() {
  var deals = window.__chaPendingDeals || [];
  // #region agent log
  fetch('http://127.0.0.1:7347/ingest/4aa1827a-5cdd-4035-8984-1fb063ffa870',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb7e63'},body:JSON.stringify({sessionId:'fb7e63',runId:'audit-run-1',hypothesisId:'H5',location:'js/live-assist.js:confirmReviewModal',message:'Receipt review confirm triggered',data:{pendingDeals:deals.length},timestamp:Date.now()})}).catch(function(){});
  // #endregion
  if (!deals.length) {
    closeReviewModal();
    return;
  }
  try {
    var existing = JSON.parse(localStorage.getItem('trackerDeals') || '[]');
    localStorage.setItem('trackerDeals', JSON.stringify(existing.concat(deals)));
  } catch (_e) {}
  closeReviewModal();
  updateTotals();
  showToast('Parsed ' + deals.length + ' receipt line(s).', 'success');
  window.__chaPendingDeals = [];
}

function _bindBentoKeys() {
  if (document.body.dataset.chaBentoKeys === '1') return;
  document.body.dataset.chaBentoKeys = '1';
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      nextLine();
    }
    if (e.code === 'Escape') resetScript();
    if (e.code === 'ArrowRight') nextLine();
    if (e.code === 'ArrowLeft') prevLine();
  });
}

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

function openLaPanel(type) {
  var overlay = document.getElementById('la-panel-overlay');
  var panel = document.getElementById('la-panel');
  var title = document.getElementById('la-panel-title');
  var body = document.getElementById('la-panel-body');
  if (!overlay || !panel || !title || !body) return;

  var html = '';
  if (type === 'closes') {
    title.textContent = 'Closing Lines';
    if (typeof CLOSES !== 'undefined') {
      var groups = {
        assumptive: 'Assumptive',
        soft: 'Soft',
        direct: 'Direct',
        urgency: 'Urgency',
        tiedown: 'Tie-Down',
        agreement: 'Agreement'
      };
      html += '<div class="la-hud-panel">';
      Object.keys(groups).forEach(function (t) {
        var items = CLOSES.filter(function (c) {
          return c.type === t;
        });
        if (!items.length) return;
        html += '<div class="la-hud-group-lbl">' + groups[t] + '</div>';
        items.forEach(function (c) {
          html +=
            '<button type="button" class="la-hud-line" onclick="copyClose(this)" data-line=\'"' +
            c.line +
            '\'">&ldquo;' +
            c.line +
            '&rdquo;</button>';
        });
      });
      html += '</div>';
    }
  } else if (type === 'recovery') {
    title.textContent = 'Control the Call';
    if (typeof RECOVERY !== 'undefined') {
      html += '<div class="la-hud-panel la-hud-panel-stack">';
      RECOVERY.forEach(function (r, i) {
        html += '<details class="la-hud-details">';
        html +=
          '<summary class="la-hud-sum"><span class="la-hud-sum-t">' +
          r.label +
          '</span></summary>';
        html += '<div class="la-hud-details-body">';
        html += '<p class="la-hud-sit">' + r.situation + '</p>';
        html += '<div class="la-hud-k">Acknowledge</div>';
        html += '<div class="la-hud-script">' + r.acknowledge + '</div>';
        html += '<div class="la-hud-k">Bridge</div>';
        html += '<div class="la-hud-script">' + r.bridge + '</div>';
        html += '<div class="la-hud-k">Script</div>';
        html += '<div class="la-hud-script">' + r.script + '</div>';
        html += '</div></details>';
      });
      html += '</div>';
    }
  } else if (type === 'benefits') {
    title.textContent = 'Benefit Explainer';
    if (typeof BENEFITS !== 'undefined') {
      var top5 = BENEFITS.slice(0, 5);
      html += '<div class="la-hud-panel la-hud-panel-stack">';
      top5.forEach(function (b) {
        html += '<details class="la-hud-details">';
        html +=
          '<summary class="la-hud-sum"><span class="la-hud-sum-t">' +
          b.name +
          '</span></summary>';
        html += '<div class="la-hud-details-body">';
        html += '<div class="la-hud-k">Simple explanation</div>';
        html += '<div class="la-hud-plain">' + b.simple + '</div>';
        html += '<div class="la-hud-k">Common misunderstanding</div>';
        html += '<div class="la-hud-plain">' + b.misunderstand + '</div>';
        html +=
          '<div class="la-hud-never"><strong>Never say:</strong> ' +
          b.notsay +
          '</div>';
        html += '</div></details>';
      });
      html += '</div>';
    }
  } else if (type === 'planvault') {
    title.textContent = 'Plan Vault';
    if (typeof POLICY_DOCS !== 'undefined') {
      var groupColors = { MEC: '#5B8DEF', STM: '#d97706', Limited: '#dc2626' };
      html += '<div class="la-hud-panel la-hud-panel-stack">';
      POLICY_DOCS.forEach(function (p) {
        var gColor = groupColors[p.group] || '#6B7280';
        html +=
          '<button type="button" class="la-hud-plan-row" onclick="closeLaPanel();showPage(\'policydocs\')">';
        html +=
          '<span class="la-hud-plan-badge" style="background:' +
          gColor +
          '">' +
          p.group +
          '</span>';
        html += '<span class="la-hud-plan-name">' + p.name + '</span>';
        html += '</button>';
      });
      html += '</div>';
    }
  }

  body.innerHTML = html;
  overlay.classList.add('show');
  panel.classList.add('show');
}

function closeLaPanel() {
  var overlay = document.getElementById('la-panel-overlay');
  var panel = document.getElementById('la-panel');
  if (overlay) overlay.classList.remove('show');
  if (panel) panel.classList.remove('show');
}

function renderLive() {
  var arrow =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="la-nav-arrow"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  var html = '<div class="la-live-hud">';
  html +=
    '<div class="ph la-ph-tight"><div class="pt">Live <span>Assist</span></div><div class="pd la-pd-one">Tap. Say it. Next.</div></div>';
  html += '<div id="liveResult" class="lrp"></div>';
  html += '<div class="la-nav-grid">';
  html +=
    '<div class="la-nav-card la-nav-card-hud" onclick="openLaPanel(\'closes\')"><div class="la-nav-inner"><div class="la-nav-title">Closes</div></div>' +
    arrow +
    '</div>';
  html +=
    '<div class="la-nav-card la-nav-card-hud" onclick="openLaPanel(\'recovery\')"><div class="la-nav-inner"><div class="la-nav-title">Control Call</div></div>' +
    arrow +
    '</div>';
  html +=
    '<div class="la-nav-card la-nav-card-hud" onclick="openLaPanel(\'benefits\')"><div class="la-nav-inner"><div class="la-nav-title">Benefits</div></div>' +
    arrow +
    '</div>';
  html +=
    '<div class="la-nav-card la-nav-card-hud" onclick="openLaPanel(\'planvault\')"><div class="la-nav-inner"><div class="la-nav-title">Plan Vault</div></div>' +
    arrow +
    '</div>';
  html += '</div>';
  html +=
    '<div class="soa-copy-strip la-soa-hud" onclick="copySOA(this)">' +
    '<div class="la-soa-hud-txt"><strong>SOA</strong> <span class="la-soa-hint">Tap = copy full wording</span></div>' +
    '<button type="button" class="la-soa-cheat cheat-sheet-btn" onclick="event.stopPropagation();showPage(\'cheatsheet\')">📋 Cheat Sheet</button></div>';
  html += '<div class="bento-container">';
  html += '<div class="bento-card playbook-box"><div class="card-header"><h2>📜 Live Playbook</h2><span id="line-counter">1 / 16</span></div><div id="script-display"></div>';
  html += '<div class="playbook-controls"><button onclick="prevLine()">← Prev</button><button onclick="nextLine()" class="primary-btn">Next Line →</button><button onclick="resetScript()">Reset</button></div>';
  html += '<div class="shortcuts-hint">SPACE = next, ESC = reset, ←/→ = navigate</div>';
  html += '<div class="compliance-checklist"><h4>🔒 Audit Lock - Complete Before Submit:</h4>' +
    '<label><input type="checkbox" id="check-agency" onchange="updateChecklist(\'agency\')"> Agency: "Central Health Advisors"</label>' +
    '<label><input type="checkbox" id="check-recording" onchange="updateChecklist(\'recording\')"> Recording: "This call may be recorded"</label>' +
    '<label><input type="checkbox" id="check-exclusions" onchange="updateChecklist(\'exclusions\')"> Exclusions: "Pregnancy, Mental Health, Substance Abuse excluded"</label>' +
    '<label><input type="checkbox" id="check-preex" onchange="updateChecklist(\'preex\')"> 12/12 Rule disclosed</label>' +
    '<button id="submit-sale-btn" disabled onclick="attemptSubmit()">Submit Sale</button></div></div>';
  html += '<div class="bento-card brain-box"><div class="card-header"><h2>🧠 The Brain</h2></div>';
  html += '<div class="chat-container" id="chat-messages"><div class="ai-message welcome">Ask me anything about plans, benefits, objections, or compliance.</div></div>';
  html += '<div class="chat-input-container"><input type="text" id="chat-input" placeholder="Type your question..." /><button id="send-btn">Send</button></div>';
  html += '<div class="quick-actions"><button onclick="handleChatMessage(\'MEC vs STM?\')">MEC vs STM</button><button onclick="handleChatMessage(\'Spouse objection?\')">Spouse</button><button onclick="handleChatMessage(\'12/12 rule?\')">12/12 Rule</button><button onclick="handleChatMessage(\'ER vs UC?\')">ER vs UC</button></div></div>';
  html += '<div class="bento-card academy-box"><div class="tracker-section"><h3>📋 Receipt Tracker</h3><textarea id="receipt-input" placeholder="Paste carrier receipt here..."></textarea><button onclick="parseAndReview()">Parse Receipt</button><div id="daily-total"></div><div id="weekly-total"></div></div>';
  html += '<div class="academy-section"><h3>🎓 CHA Academy</h3><div class="progress-bar"><div id="progress-fill"></div></div><p class="progress-text">0/4 Complete</p>';
  html += '<details><summary>📚 Module 1: Insurance Vocabulary</summary><div class="vocab-card"><strong>Premium</strong><p>Monthly payment to keep membership active</p><button class="copy-btn" onclick="copyToClipboard(\'Your monthly rate is $___\')">📋 COPY</button></div><button onclick="markComplete(1)">Mark Complete</button></details>';
  html += '<details><summary>📋 Module 2: Know Your Plans</summary><div class="plan-card"><strong>MEC</strong><p>No deductible, copays for doctors.</p></div><div class="plan-card"><strong>STM</strong><p>Deductible + coinsurance + max OOP.</p></div><button onclick="markComplete(2)">Mark Complete</button></details>';
  html += '<details><summary>🛡️ Module 3: Compliance Shield</summary><div class="compliance-row never-say"><span class="wrong">❌ "ACA compliant"</span> <span class="right">✓ "Private market plan"</span></div><button onclick="markComplete(3)">Mark Complete</button></details>';
  html += '<details><summary>🎯 Module 4: Objection Mastery</summary><div class="objection-card"><strong>"Spouse"</strong><div class="response-row"><span>"Let\'s see if you qualify so you have something real to show them."</span></div></div><button onclick="markComplete(4)">Mark Complete</button></details>';
  html += '</div></div>';
  html += '<div id="review-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9999;align-items:center;justify-content:center;">';
  html +=   '<div style="width:min(900px,95vw);max-height:85vh;overflow:auto;background:#111827;border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:16px;color:#E5E7EB;">';
  html +=     '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="margin:0;">Receipt Review</h3><button onclick="closeReviewModal()" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#E5E7EB;border-radius:8px;padding:6px 10px;">Close</button></div>';
  html +=     '<table style="width:100%;border-collapse:collapse;font-size:13px;"><thead><tr><th style="text-align:left;padding:8px;border-bottom:1px solid rgba(255,255,255,0.15);">Date</th><th style="text-align:left;padding:8px;border-bottom:1px solid rgba(255,255,255,0.15);">Member</th><th style="text-align:left;padding:8px;border-bottom:1px solid rgba(255,255,255,0.15);">Product</th><th style="text-align:left;padding:8px;border-bottom:1px solid rgba(255,255,255,0.15);">Premium</th><th style="text-align:left;padding:8px;border-bottom:1px solid rgba(255,255,255,0.15);">Commission</th></tr></thead><tbody id="review-table-body"></tbody></table>';
  html +=     '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;"><button onclick="closeReviewModal()" style="background:#374151;border:none;color:#fff;border-radius:8px;padding:8px 12px;">Cancel</button><button onclick="confirmReviewModal()" style="background:#10B981;border:none;color:#fff;border-radius:8px;padding:8px 12px;">Confirm & Save</button></div>';
  html +=   '</div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="la-section-label la-sec-tight">Rebuttals</div>';
  // Slide-in panel overlay + panel (injected once)
  html +=
    '<div id="la-panel-overlay" class="la-panel-overlay" onclick="closeLaPanel()"></div>';
  html += '<div id="la-panel" class="la-panel">';
  html +=
    '<div class="la-panel-header"><div id="la-panel-title" class="la-panel-title"></div><button class="la-panel-close" onclick="closeLaPanel()">&times;</button></div>';
  html += '<div id="la-panel-body" class="la-panel-body"></div>';
  html += '</div>';
  // Objection quick list (compact rows — same expand/collapse behavior)
  html += '<div class="la-qlist">';
  for (var i = 0; i < Math.min(6, OBJECTIONS.length); i++) {
    var o = OBJECTIONS[i];
    var catCls =
      typeof _objCatClass === 'function'
        ? _objCatClass(o.cat)
        : 'obj-cat-default';
    html += '<div class="la-qrow" id="liveobj' + i + '">';
    html +=
      '<button type="button" class="la-qrow-hd" onclick="toggleLiveObj(' +
      i +
      ')" aria-expanded="false">';
    html +=
      '<span class="obj-cat-badge ' +
      catCls +
      '">' +
      o.cat +
      '</span>';
    html +=
      '<span class="la-qtext">&ldquo;' + o.obj + '&rdquo;</span>';
    html +=
      '<span class="la-qchev" id="liveobjchev' +
      i +
      '" aria-hidden="true">▼</span></button>';
    html +=
      '<div class="la-qbody" id="liveobjbody' + i + '" style="display:none;">';
    html +=
      '<div class="la-section"><span class="la-sec-lbl">Diagnostic Question First</span><div class="la-sec-text">' +
      o.diag +
      '</div></div>';
    html +=
      '<div class="la-section"><span class="la-sec-lbl">What This Usually Means</span><div class="la-sec-text">' +
      o.real +
      '</div></div>';
    html +=
      '<div style="display:flex;gap:6px;margin:8px 0 6px;flex-wrap:wrap;"><button class="rtab active" onclick="switchTab(event,\'lo' +
      i +
      '\',\'best\')">Best Response</button><button class="rtab" onclick="switchTab(event,\'lo' +
      i +
      '\',\'soft\')">Softer</button><button class="rtab" onclick="switchTab(event,\'lo' +
      i +
      "','strong')\">Stronger</button></div>";
    html +=
      '<div id="lo' +
      i +
      '-best" class="rpanel active sbox">' +
      o.best +
      '</div>';
    html +=
      '<div id="lo' + i + '-soft" class="rpanel sbox">' + o.soft + '</div>';
    html +=
      '<div id="lo' + i + '-strong" class="rpanel sbox">' + o.strong + '</div>';
    html +=
      '<div class="la-section" style="margin-top:12px;"><span class="la-sec-lbl">Bridge Line</span><div class="la-sec-text">' +
      o.bridge +
      '</div></div>';
    html +=
      '<div class="la-section la-section-close"><span class="la-sec-lbl">Close Line</span><div class="la-sec-text">' +
      o.close +
      '</div></div>';
    html += '</div></div>';
  }
  html += '</div></div>';
  var _page_live = document.getElementById('page-live');
  if (_page_live) _page_live.innerHTML = html;
  showCurrentLine();
  updateProgressBar();
  updateTotals();
  checkSubmitEligibility();
  if (typeof initBrainChatBox === 'function') initBrainChatBox();
  _bindBentoKeys();
}

function toggleLiveObj(i) {
  var body = document.getElementById('liveobjbody' + i);
  var chev = document.getElementById('liveobjchev' + i);
  var row = document.getElementById('liveobj' + i);
  var btn = row ? row.querySelector('.la-qrow-hd') : null;
  if (!body) return;
  var open = body.style.display !== 'none';
  if (open) {
    body.style.display = 'none';
    if (chev) chev.style.transform = '';
    if (row) row.classList.remove('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    return;
  }
  for (var j = 0; j < 6; j++) {
    var b2 = document.getElementById('liveobjbody' + j);
    var c2 = document.getElementById('liveobjchev' + j);
    var r2 = document.getElementById('liveobj' + j);
    var bbtn = r2 ? r2.querySelector('.la-qrow-hd') : null;
    if (b2) b2.style.display = 'none';
    if (c2) c2.style.transform = '';
    if (r2) r2.classList.remove('is-open');
    if (bbtn) bbtn.setAttribute('aria-expanded', 'false');
  }
  body.style.display = 'block';
  if (chev) chev.style.transform = 'rotate(180deg)';
  if (row) {
    row.classList.add('is-open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ══════════════════════════════════════════════════════
// RENDER: RECOVERY
// ══════════════════════════════════════════════════════
function renderRecovery() {
  var html =
    '<div class="ph"><div class="pt">Control the <span>Call</span></div><div class="pd">Answer. Bridge. Close. Every situation handled.</div></div>';
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
      '<span style="color:var(--txt-muted);font-size:11px;" aria-hidden="true">▼</span></div>';

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
      '<button class="rtab active" onclick="switchTab(event,\'rec' +
      i +
      "','script')\">Best</button>";
    html +=
      '<button class="rtab" onclick="switchTab(event,\'rec' +
      i +
      "','soft')\">Softer</button>";
    html +=
      '<button class="rtab" onclick="switchTab(event,\'rec' +
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
      '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:18px 22px;box-shadow:var(--shadow-card)">';
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
