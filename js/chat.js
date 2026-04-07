// chat.js — Benefits Reference chat panel
// ── SOB LOOKUP — Synonym-Aware, Cross-Plan, Instant + Ask AI ─────────────
var brActivePlan = null;
var brSearchAllPlans = false;
var brOpen = false;
var BR_PLANS = [];
var _brInitDone = false;
// ── LUCIDE-STYLE SVG ICONS ──────────────────────────────────────────
var LI = {
  check:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  ban: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  warn: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  clock:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  file: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  bulb: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  brain:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z"/></svg>',
  mic: '<svg style="width:12px;height:12px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>',
  clipboard:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/></svg>',
  dot: '<svg style="width:5px;height:5px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>'
};
// Smart engine — no API key needed

function brBuildSOB(p) {
  var entries = [];
  var hasExplicitDiag = false;
  p.benefits.forEach(function (b) {
    b.items.forEach(function (item) {
      entries.push({ category: b.category, text: item });
      if (
        /x-ray|radiology|imaging|diagnostic x|diagnostic test|lab work|laboratory|pathology|radiology/i.test(
          item
        )
      )
        hasExplicitDiag = true;
    });
  });
  // For plans on recognized networks without explicit diagnostic line items,
  // add network discount entries so queries for x-ray, labs, imaging find real info
  if (
    !hasExplicitDiag &&
    p.network &&
    /First Health|PHCS|MultiPlan/i.test(p.network)
  ) {
    entries.push({
      category: 'Network Discount Services',
      text:
        'Diagnostic X-Ray and Labs — if member stays in the ' +
        p.network +
        ' Network they will receive a discount. This is not a fixed benefit but a network discount through ' +
        p.network +
        '.'
    });
    entries.push({
      category: 'Network Discount Services',
      text:
        'Outpatient lab work, radiology, and imaging services — available at ' +
        p.network +
        ' negotiated discount rates at participating facilities.'
    });
  }
  p.limitations.forEach(function (l) {
    entries.push({ category: 'Exclusions / Limitations', text: l });
  });
  entries.push({
    category: 'Waiting Periods',
    text: p.waitingPeriods.join(' | ')
  });
  entries.push({ category: 'Pre-Existing Conditions', text: p.preEx });
  entries.push({ category: 'Agent Note', text: p.planNotes });
  return entries;
}

var brActiveFilter = 'all';

function brInit() {
  if (_brInitDone) return;
  if (typeof POLICY_DOCS === 'undefined' || !POLICY_DOCS.length) return;
  if (!document.getElementById('br-plan-bar')) return;
  _brInitDone = true;

  BR_PLANS = POLICY_DOCS.map(function (p) {
    return {
      id: p.id,
      name: p.name,
      group: p.group,
      type: p.type,
      entries: brBuildSOB(p)
    };
  });
  if (!BR_PLANS.length) return;
  brActivePlan = BR_PLANS[0];

  // Build filter bar: All Plans | MEC | STM | Limited
  var filterBar = document.getElementById('br-filter-bar');
  var filters = [
    { key: 'all', label: 'All Plans' },
    { key: 'MEC', label: 'MEC' },
    { key: 'STM', label: 'STM' },
    { key: 'Limited', label: 'Limited' }
  ];
  filters.forEach(function (f) {
    var btn = document.createElement('button');
    btn.className = 'br-filter-btn' + (f.key === 'all' ? ' active' : '');
    btn.textContent = f.label;
    btn.dataset.filter = f.key;
    btn.onclick = function () {
      brActiveFilter = f.key;
      document.querySelectorAll('.br-filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.filter === f.key);
      });
      if (f.key === 'all') {
        brSearchAllPlans = true;
        brRenderPlanButtons(null);
      } else {
        brSearchAllPlans = false;
        brRenderPlanButtons(f.key);
        // Auto-select first plan in this group
        var firstInGroup = BR_PLANS.find(function (p) {
          return p.group === f.key;
        });
        if (firstInGroup) {
          brActivePlan = firstInGroup;
          document.querySelectorAll('.br-plan-btn').forEach(function (b) {
            b.classList.toggle('active', b.dataset.id === firstInGroup.id);
          });
        }
      }
      document.getElementById('br-msgs').innerHTML = '';
      brShowWelcome();
    };
    filterBar.appendChild(btn);
  });

  // Build plan buttons
  brRenderPlanButtons(null);

  // Build search index on init
  buildSearchIndex();
  brShowWelcome();
}

function brRenderPlanButtons(groupFilter) {
  var planBar = document.getElementById('br-plan-bar');
  if (!planBar) return;
  planBar.innerHTML = '';

  var plans = groupFilter
    ? BR_PLANS.filter(function (p) {
        return p.group === groupFilter;
      })
    : BR_PLANS;

  plans.forEach(function (p) {
    var btn = document.createElement('button');
    btn.className =
      'br-plan-btn' +
      (p.id === brActivePlan.id && !brSearchAllPlans ? ' active' : '');
    btn.textContent = p.name;
    btn.dataset.id = p.id;
    btn.onclick = function () {
      brSearchAllPlans = false;
      brActiveFilter = p.group;
      document.querySelectorAll('.br-filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.filter === p.group);
      });
      brActivePlan = BR_PLANS.find(function (x) {
        return x.id === p.id;
      });
      // Sync sticky plan context
      if (brActivePlan && typeof setActivePlan === 'function') {
        setActivePlan(
          brActivePlan.id,
          brActivePlan.name,
          brActivePlan.group || ''
        );
      }
      document.querySelectorAll('.br-plan-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.id === p.id);
      });
      document.getElementById('br-msgs').innerHTML = '';
      brShowWelcome();
    };
    planBar.appendChild(btn);
  });
}

function brShowWelcome() {
  var html =
    "Hey! I'm your Benefits AI. Pick a plan or ask me anything about coverage, copays, exclusions, or waiting periods.";

  // Plan type cards
  var groupColors = {
    MEC: {
      dot: '#22c55e',
      bg: 'rgba(34,197,94,0.06)',
      border: 'rgba(34,197,94,0.2)',
      pill: 'rgba(34,197,94,0.1)',
      pillColor: '#22c55e'
    },
    STM: {
      dot: '#5B8DEF',
      bg: 'rgba(91,141,239,0.06)',
      border: 'rgba(91,141,239,0.2)',
      pill: 'rgba(91,141,239,0.1)',
      pillColor: '#5B8DEF'
    },
    Limited: {
      dot: '#7C3AED',
      bg: 'rgba(124,58,237,0.06)',
      border: 'rgba(124,58,237,0.2)',
      pill: 'rgba(124,58,237,0.1)',
      pillColor: '#7C3AED'
    }
  };
  if (BR_PLANS.length) {
    html += '<div class="br-welcome-cards">';
    BR_PLANS.forEach(function (p) {
      var gc = groupColors[p.group] || groupColors.MEC;
      html +=
        '<div class="br-welcome-card" style="border-color:' +
        gc.border +
        ';background:' +
        gc.bg +
        ';" onclick="brWelcomePick(\'' +
        escHTML(p.id) +
        '\')">' +
        '<span class="bwc-dot" style="background:' +
        gc.dot +
        ';"></span>' +
        '<span class="bwc-name">' +
        p.name +
        '</span>' +
        '<span class="bwc-type" style="background:' +
        gc.pill +
        ';color:' +
        gc.pillColor +
        ';">' +
        p.group +
        '</span></div>';
    });
    html += '</div>';
  }

  // Quick suggestions
  html += '<div class="br-quick-suggestions">';
  var suggestions = [
    "What's covered?",
    "What's excluded?",
    'Waiting periods?',
    'Copays?'
  ];
  suggestions.forEach(function (s) {
    html +=
      '<button class="br-quick-sug" onclick="brQuick(\'' +
      escHTML(s) +
      '\')">' +
      s +
      '</button>';
  });
  html += '</div>';

  brAddMsg('ai', html);
}

function brWelcomePick(planId) {
  var plan = BR_PLANS.find(function (p) {
    return p.id === planId;
  });
  if (!plan) return;
  brSearchAllPlans = false;
  brActiveFilter = plan.group;
  brActivePlan = plan;
  document.querySelectorAll('.br-filter-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.filter === plan.group);
  });
  document.querySelectorAll('.br-plan-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.id === planId);
  });
  if (typeof setActivePlan === 'function') {
    setActivePlan(plan.id, plan.name, plan.group || '');
  }
  document.getElementById('br-input').value = 'Tell me about ' + plan.name;
  document.getElementById('br-input').dispatchEvent(new Event('input'));
  brSend();
}

document.getElementById('br-toggle').addEventListener('click', function () {
  brOpen = !brOpen;
  document.getElementById('br-panel').classList.toggle('open', brOpen);
  document.getElementById('br-toggle').classList.toggle('open', brOpen);
  document.body.classList.toggle('br-open', brOpen);
  if (brOpen) {
    document.getElementById('br-input').focus();
    brScroll();
  }
});

document.getElementById('br-input').addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 110) + 'px';
  document.getElementById('br-send').disabled = !this.value.trim();
});

document.getElementById('br-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    brSend();
  }
});

document.getElementById('br-send').disabled = true;

function brQuick(text) {
  var inp = document.getElementById('br-input');
  if (!inp) return;
  // Check if a plan is selected
  if (!brActivePlan && !brSearchAllPlans) {
    brAddMsg(
      'ai',
      '<div style="color:var(--text-secondary);font-size:13px;">Please select a plan first, then try again.</div>'
    );
    return;
  }
  inp.value = text;
  inp.dispatchEvent(new Event('input'));
  // Reset send lock in case it's stuck
  _brSendLock = false;
  brSend();
}

function brClear() {
  document.getElementById('br-msgs').innerHTML = '';
  var inp = document.getElementById('br-input');
  if (inp) {
    inp.value = '';
    inp.style.height = 'auto';
  }
  document.getElementById('br-send').disabled = true;
  // Reset to all-plans mode
  brSearchAllPlans = false;
  brActiveFilter = 'all';
  if (BR_PLANS.length) brActivePlan = BR_PLANS[0];
  document.querySelectorAll('.br-filter-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.filter === 'all');
  });
  brRenderPlanButtons(null);
  // Clear any stuck typing indicator
  var typing = document.getElementById('br-typing-ind');
  if (typing) typing.remove();
  brShowWelcome();
}

function brAddMsg(role, html) {
  var msgs = document.getElementById('br-msgs');
  // Always clear any leftover typing indicator first
  var stale = document.getElementById('br-typing-ind');
  if (stale) stale.remove();
  if (role === 'ai') {
    // Show typing indicator, then reveal answer after 600ms
    var typing = document.createElement('div');
    typing.className = 'br-typing';
    typing.id = 'br-typing-ind';
    typing.innerHTML =
      '<span class="br-tdot"></span><span class="br-tdot"></span><span class="br-tdot"></span>';
    msgs.appendChild(typing);
    brScroll();
    // Safety: force-clear after 3s in case setTimeout fails
    setTimeout(function () {
      var stuck = document.getElementById('br-typing-ind');
      if (stuck) stuck.remove();
    }, 3000);
    setTimeout(function () {
      var t = document.getElementById('br-typing-ind');
      if (t) t.remove();
      var d = document.createElement('div');
      d.className = 'br-msg ai';
      d.innerHTML =
        '<div class="br-lbl">Results</div><div class="br-bub">' +
        html +
        '</div>';
      msgs.appendChild(d);
      brScroll();
    }, 600);
    return;
  }
  var d = document.createElement('div');
  d.className = 'br-msg ' + role;
  d.innerHTML =
    '<div class="br-lbl">' +
    (role === 'user' ? 'You' : 'Results') +
    '</div><div class="br-bub">' +
    html +
    '</div>';
  msgs.appendChild(d);
  brScroll();
}

function brScroll() {
  var msgs = document.getElementById('br-msgs');
  setTimeout(function () {
    msgs.scrollTop = msgs.scrollHeight;
  }, 40);
}

function _brBottomLine(status, query) {
  if (status === 'Covered')
    return 'Yes — ' + query + ' is covered under this plan.';
  if (status === 'Not Covered')
    return 'No — ' + query + ' is not covered by this plan.';
  if (status === 'Discount Available')
    return 'Network discount available, not a fixed benefit.';
  if (status === 'Verify')
    return 'Verify — not clearly listed. Check plan document before advising.';
  if (status === 'No Deductible') return 'No deductible on this plan.';
  if (status === 'Excluded 12 Months')
    return 'Pre-existing conditions excluded for 12 months.';
  if (status === 'Waiting Period Applies')
    return 'Waiting period applies — see details.';
  return 'See details below for ' + query + '.';
}

function _brCollapseBullets(html) {
  // If more than 6 bullet-style divs in a section, collapse extras
  var marker = 'margin-bottom:2px;line-height:1.5;">';
  var parts = html.split(marker);
  if (parts.length <= 7) return html;
  var out = '';
  for (var i = 0; i < parts.length; i++) {
    if (i === 6) {
      out += '<div class="br-collapsed-extra" style="display:none;">';
    }
    out += parts[i];
    if (i < parts.length - 1) out += marker;
  }
  out += '</div>';
  out +=
    "<button class=\"br-show-more\" onclick=\"var ex=this.previousElementSibling;var vis=ex.style.display!=='none';ex.style.display=vis?'none':'';this.textContent=vis?'Show more...':'Show less';\">Show more...</button>";
  return out;
}

var _brSendLock = false;
function brSend() {
  if (_brSendLock) return;
  var inp = document.getElementById('br-input');
  var query = inp.value.trim();
  if (!query) return;
  _brSendLock = true;
  setTimeout(function () {
    _brSendLock = false;
  }, 300);

  inp.value = '';
  inp.style.height = 'auto';
  document.getElementById('br-send').disabled = true;

  brAddMsg('user', escHTML(query));

  // PRIMARY BEHAVIOR: Dashboard first → AI fallback → Safe fallback
  var plansToUse = brSearchAllPlans
    ? BR_PLANS
    : brActivePlan
      ? [brActivePlan]
      : [];
  var structured = brStructuredAnswer(query, plansToUse);

  // Extract status from the answer HTML for bottom-line
  var statusMatch = structured.match(
    /font-weight:800;color:#[0-9A-Fa-f]+;">([\w\s]+)<\/span>/
  );
  var status = statusMatch ? statusMatch[1].trim() : '';
  var bottomLine =
    '<div class="br-bottom-line">' + _brBottomLine(status, query) + '</div>';

  // Remove "Based on the policy documents..." prefix if present
  structured = structured.replace(
    /Based on the policy documents[^<]*\.\s*/gi,
    ''
  );

  var finalHtml = bottomLine + _brCollapseBullets(structured);
  brAddMsg('ai', finalHtml);

  document.getElementById('br-send').disabled = false;
  document.getElementById('br-input').focus();
}

// ── STRUCTURED ANSWER ENGINE ──────────────────────────────────────────
// Dashboard-first → AI fallback → Safe fallback
// Returns: Coverage Status | Internal Answer | Client Rebuttal | Source Type

// ══════════════════════════════════════════════════════
// BENEFITS REFERENCE ENGINE — COMPLETE REWRITE
// Source-grounded, per-topic, multi-part, typo-tolerant
// ══════════════════════════════════════════════════════

var BR_TYPO_MAP = {
  perscription: 'prescription',
  hosptial: 'hospital',
  deductable: 'deductible',
  emergancy: 'emergency',
  telmedicine: 'telemedicine',
  chiropratic: 'chiropractic',
  maternty: 'maternity',
  ambulence: 'ambulance',
  benifits: 'benefits',
  exlcusions: 'exclusions',
  waitng: 'waiting',
  covrage: 'coverage',
  copyas: 'copays',
  docter: 'doctor',
  urgnt: 'urgent',
  coverd: 'covered',
  physcian: 'physician',
  dedcutible: 'deductible',
  hopsital: 'hospital',
  specalist: 'specialist',
  specilist: 'specialist',
  emrgency: 'emergency',
  pregancy: 'pregnancy',
  prescripton: 'prescription',
  coypay: 'copay',
  theropy: 'therapy',
  theraphy: 'therapy',
  hospitlization: 'hospitalization',
  deductables: 'deductibles',
  vists: 'visits',
  vist: 'visit',
  vistis: 'visits',
  docotr: 'doctor',
  copay: 'copay',
  benfits: 'benefits'
};

var BR_SYNONYM_MAP = {
  er: ['emergency room', 'emergency', 'emergency care'],
  'emergency room': ['er', 'emergency'],
  pcp: ['primary care', 'doctor visit', 'physician', 'office visit'],
  doctor: [
    'physician',
    'pcp',
    'primary care',
    'dr',
    'doc',
    'provider',
    'office visit'
  ],
  'urgent care': ['urgent visit', 'walk in', 'walk-in'],
  specialist: ['specialty', 'specialist visit'],
  rx: [
    'prescription',
    'medication',
    'drugs',
    'pharmacy',
    'meds',
    'drug coverage'
  ],
  prescription: ['rx', 'medication', 'drugs', 'pharmacy', 'meds'],
  deductible: ['ded', 'deductibles'],
  'out of pocket': ['oop', 'out-of-pocket', 'maximum out of pocket'],
  hospital: ['hospitalization', 'inpatient', 'admitted'],
  'pre-existing': ['pre existing', 'preexisting', 'pre-ex', 'preex'],
  'waiting period': ['waiting', 'how soon', 'when does coverage start'],
  xray: ['x-ray', 'x ray', 'imaging', 'mri', 'ct scan', 'radiology'],
  lab: ['laboratory', 'blood work', 'bloodwork', 'blood test', 'labs'],
  chiropractic: ['chiropractor', 'chiro', 'adjustment'],
  maternity: ['pregnancy', 'pregnant', 'childbirth', 'prenatal', 'baby'],
  'mental health': [
    'mental',
    'therapy',
    'therapist',
    'counseling',
    'psychiatry'
  ],
  dental: ['teeth', 'dentist', 'tooth'],
  vision: ['eye', 'eyes', 'glasses', 'contacts', 'optometrist'],
  telemedicine: ['telehealth', 'virtual visit', 'virtual doctor', 'tele'],
  surgery: ['surgical', 'operation', 'procedure'],
  ambulance: ['transport', 'ems'],
  copay: ['copays', 'co-pay', 'co pay', 'copay amount'],
  network: ['in network', 'in-network', 'provider network', 'providers'],
  cancer: ['chemo', 'chemotherapy', 'radiation', 'oncology'],
  dialysis: ['kidney', 'renal'],
  transplant: ['organ transplant'],
  dme: ['durable medical equipment', 'wheelchair', 'walker', 'cpap'],
  preventive: ['wellness', 'annual exam', 'physical exam', 'screening'],
  acupuncture: ['acupuncture'],
  'physical therapy': ['pt', 'occupational therapy', 'speech therapy', 'rehab']
};

// Fix typos in query
function _brFixTypos(q) {
  var words = q.split(/\s+/);
  return words
    .map(function (w) {
      return BR_TYPO_MAP[w] || w;
    })
    .join(' ');
}

// Expand a term using synonym map
function _brExpandTerm(term) {
  var results = [term];
  Object.keys(BR_SYNONYM_MAP).forEach(function (key) {
    if (key === term || BR_SYNONYM_MAP[key].indexOf(term) !== -1) {
      if (results.indexOf(key) === -1) results.push(key);
      BR_SYNONYM_MAP[key].forEach(function (s) {
        if (results.indexOf(s) === -1) results.push(s);
      });
    }
  });
  return results;
}

// Extract individual benefit topics from a query
function _brExtractItems(query) {
  var q = _brFixTypos(query.toLowerCase().trim());
  q = q.replace(/\?+$/, '').trim();
  // Detect "copays for X, Y, and Z" pattern — extract X, Y, Z
  var forMatch = q.match(
    /(?:copays?|costs?|fees?|coverage)\s+(?:for|of)\s+(.+)/i
  );
  if (forMatch) q = forMatch[1];
  // Remove common question framing
  q = q.replace(
    /^(what|does|is|are|do|how|can you|tell me about|show me|look up|check)\s+(the|a|an|my|this|it|its|plan|me)?\s*/gi,
    ''
  );
  q = q.replace(
    /\s+(look like|on this plan|in this plan|for this plan)\s*$/gi,
    ''
  );
  q = q
    .replace(/\b(cover|covered|include|included|have)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (q.length < 2) q = _brFixTypos(query.toLowerCase().trim());
  // Split on commas, "and", "or"
  var parts = q.split(/\s*(?:,\s*(?:and\s+)?|,|\band\b|\bor\b)\s*/);
  var items = [];
  parts.forEach(function (p) {
    p = p.trim();
    if (p && p.length > 1) items.push(p);
  });
  return items.length ? items : [q];
}

// Search one plan's POLICY_DOCS data for a single benefit topic
function _brLookupBenefit(planDoc, topic) {
  if (!planDoc)
    return { status: 'Verify', label: topic, items: [], source: '' };
  var searchTerms = _brExpandTerm(topic);
  var benefitHits = [];
  var exclusionHits = [];

  // Search benefits
  planDoc.benefits.forEach(function (bcat) {
    bcat.items.forEach(function (item) {
      for (var i = 0; i < searchTerms.length; i++) {
        var re = new RegExp(
          '\\b' + searchTerms[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b',
          'i'
        );
        if (re.test(item) || re.test(bcat.category)) {
          // Check if this item says NOT covered
          if (
            /\bNOT covered\b|\bNOT COVERED\b/i.test(item) &&
            !/discount|savings|negotiated/i.test(item)
          ) {
            exclusionHits.push(item);
          } else {
            benefitHits.push(item);
          }
          break;
        }
      }
    });
  });

  // Search limitations for DIRECT exclusions of this topic
  planDoc.limitations.forEach(function (lim) {
    for (var i = 0; i < searchTerms.length; i++) {
      var re = new RegExp(
        '\\b' + searchTerms[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b',
        'i'
      );
      if (
        re.test(lim) &&
        /\bnot\b|\bno\b|\bexcluded\b|\bnot covered\b/i.test(lim)
      ) {
        exclusionHits.push(lim);
        break;
      }
    }
  });

  // Search waiting periods
  var waitingHits = [];
  searchTerms.forEach(function (t) {
    var re = new RegExp(
      '\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b',
      'i'
    );
    planDoc.waitingPeriods.forEach(function (w) {
      if (re.test(w)) waitingHits.push(w);
    });
    if (re.test(planDoc.preEx)) waitingHits.push(planDoc.preEx);
  });

  // Determine status
  var status, items;
  if (benefitHits.length > 0 && exclusionHits.length === 0) {
    status = 'Covered';
    items = benefitHits.slice(0, 3);
  } else if (exclusionHits.length > 0 && benefitHits.length === 0) {
    status = 'Not Covered';
    items = exclusionHits.slice(0, 2);
  } else if (benefitHits.length > 0 && exclusionHits.length > 0) {
    status = 'Covered';
    items = benefitHits.slice(0, 2).concat(['⚠ ' + exclusionHits[0]]);
  } else if (waitingHits.length > 0) {
    status = 'Covered';
    items = waitingHits.slice(0, 2);
  } else {
    status = 'Verify';
    items = [];
  }

  return { status: status, label: topic, items: items, source: planDoc.name };
}

// Special cases that need whole-plan answers (deductible, network, etc.)
function _brSpecialCase(topic, planDoc) {
  if (!planDoc) return null;
  var t = topic.toLowerCase();
  if (/deductible|out.of.pocket|\boop\b/.test(t)) {
    if (planDoc.group === 'MEC' || planDoc.group === 'Limited') {
      return {
        status: 'Covered',
        label: 'Deductible / OOP',
        items: [
          'No deductible — fixed dollar benefit plan. No out-of-pocket maximum. Benefits are set amounts per service.'
        ],
        source: planDoc.name
      };
    }
    if (planDoc.group === 'STM') {
      return {
        status: 'Covered',
        label: 'Deductible / OOP',
        items: [
          'Deductible options: $500-$10,000. Coinsurance 80/20. Confirm deductible chosen at enrollment.'
        ],
        source: planDoc.name
      };
    }
  }
  if (/\bnetwork\b|\bprovider\b|\bin.network\b/.test(t)) {
    return {
      status: 'Covered',
      label: 'Network',
      items: [
        planDoc.network +
          ' — ' +
          (planDoc.network.indexOf('EPO') !== -1
            ? 'IN-NETWORK ONLY. Verify provider before every visit.'
            : 'In-network preferred. Find providers at providersearch.multiplan.com')
      ],
      source: planDoc.name
    };
  }
  if (/waiting.period|\bhow.soon\b|\bwhen.does\b/.test(t)) {
    return {
      status: 'Covered',
      label: 'Waiting Periods',
      items: planDoc.waitingPeriods.slice(0, 3),
      source: planDoc.name
    };
  }
  if (/pre.existing|\bpre.ex\b|\bpreex\b/.test(t)) {
    return {
      status: planDoc.group === 'STM' ? 'Not Covered' : 'Covered',
      label: 'Pre-Existing Conditions',
      items: [planDoc.preEx],
      source: planDoc.name
    };
  }
  return null;
}

// ══════════════════════════════════════════════════════
// MAIN ENGINE — replaces brStructuredAnswer
// ══════════════════════════════════════════════════════
function brStructuredAnswer(query, plans) {
  if (!plans || !plans.length)
    return '<div style="color:var(--text-secondary)">Please select a plan first.</div>';

  // Get the POLICY_DOCS entry for the active plan
  var plan = plans[0];
  var planDoc = null;
  if (typeof POLICY_DOCS !== 'undefined') {
    planDoc = POLICY_DOCS.find(function (d) {
      return d.id === plan.id;
    });
  }
  if (!planDoc)
    return '<div style="color:var(--text-secondary)">Plan data not found. Select a different plan.</div>';

  // Fix typos in the query
  var cleaned = _brFixTypos(query.toLowerCase().trim());

  // Extract individual benefit items
  var items = _brExtractItems(cleaned);

  // Look up each item
  var results = [];
  items.forEach(function (item) {
    // Check special cases first
    var special = _brSpecialCase(item, planDoc);
    if (special) {
      results.push(special);
      return;
    }
    // General lookup
    results.push(_brLookupBenefit(planDoc, item));
  });

  // Determine overall status
  var covCount = 0,
    notCount = 0,
    verCount = 0;
  results.forEach(function (r) {
    if (r.status === 'Covered') covCount++;
    else if (r.status === 'Not Covered') notCount++;
    else verCount++;
  });
  var overallStatus;
  if (results.length === 1) overallStatus = results[0].status;
  else if (covCount > 0 && notCount > 0) overallStatus = 'Partial';
  else if (covCount > 0) overallStatus = 'Covered';
  else if (notCount > 0 && verCount === 0) overallStatus = 'Not Covered';
  else overallStatus = 'Verify';

  // ── BUILD HTML OUTPUT ──
  // Status config per type
  var _sc = {
    Covered: { border: '#bbf7d0', bg: '#f0fdf4', badge: '#16a34a', icon: '✓' },
    'Not Covered': {
      border: '#fecaca',
      bg: '#fff1f2',
      badge: '#dc2626',
      icon: '✗'
    },
    Verify: { border: '#fde68a', bg: '#fffbeb', badge: '#d97706', icon: '⚠' },
    Partial: { border: '#bfdbfe', bg: '#eff6ff', badge: '#2563eb', icon: '◐' }
  };
  var oc = _sc[overallStatus] || _sc.Verify;

  var html = '';

  // Multi-part summary badge
  if (results.length > 1) {
    var covL = results.filter(function (r) {
      return r.status === 'Covered';
    }).length;
    var notL = results.filter(function (r) {
      return r.status === 'Not Covered';
    }).length;
    var verL = results.filter(function (r) {
      return r.status === 'Verify';
    }).length;
    var parts = [];
    if (covL) parts.push(covL + ' covered');
    if (notL) parts.push(notL + ' not covered');
    if (verL) parts.push(verL + ' verify');
    html +=
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">';
    html +=
      '<span style="font-size:11px;font-weight:600;color:#64748b;">' +
      results.length +
      ' items found</span>';
    html +=
      '<span style="font-size:10px;color:#94a3b8;">' +
      parts.join(' · ') +
      '</span>';
    html += '</div>';
  }

  // Per-item result cards
  results.forEach(function (r) {
    var c = _sc[r.status] || _sc.Verify;
    html +=
      '<div style="border:1px solid ' +
      c.border +
      ';background:' +
      c.bg +
      ';border-radius:12px;padding:14px 16px;margin-bottom:10px;">';
    // Status row: badge + label
    html +=
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">';
    html +=
      '<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;background:' +
      c.badge +
      ';color:#fff;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;">' +
      c.icon +
      ' ' +
      r.status +
      '</span>';
    html +=
      '<span style="font-size:14px;font-weight:700;color:#1e293b;">' +
      r.label.charAt(0).toUpperCase() +
      r.label.slice(1) +
      '</span>';
    html += '</div>';
    // Divider
    html +=
      '<div style="height:1px;background:rgba(0,0,0,0.06);margin-bottom:8px;"></div>';
    // Data
    if (r.items.length) {
      r.items.forEach(function (item) {
        html +=
          '<div style="font-size:13px;color:#374151;line-height:1.6;margin-bottom:2px;">• ' +
          item +
          '</div>';
      });
    } else {
      html +=
        '<div style="font-size:13px;color:#94a3b8;line-height:1.6;">Not confirmed in plan documents. Confirm with carrier before quoting.</div>';
    }
    // SAY THIS section (only for Covered/Not Covered with items)
    if (r.status === 'Covered' && r.items.length) {
      html +=
        '<div style="background:#f8fafc;border-radius:8px;padding:10px 12px;margin-top:8px;">';
      html +=
        '<div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;">SAY THIS →</div>';
      html +=
        '<div style="font-size:13px;color:#1e293b;font-style:italic;line-height:1.5;">"' +
        r.items[0] +
        '"</div>';
      html += '</div>';
    } else if (r.status === 'Not Covered' && r.items.length) {
      html +=
        '<div style="background:#f8fafc;border-radius:8px;padding:10px 12px;margin-top:8px;">';
      html +=
        '<div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;">SAY THIS →</div>';
      html +=
        '<div style="font-size:13px;color:#1e293b;font-style:italic;line-height:1.5;">"That benefit isn\'t included on this plan tier — let me show you what IS covered."</div>';
      html += '</div>';
    }
    html += '</div>';
  });

  // Source
  html +=
    '<div style="font-size:10px;color:#94a3b8;text-align:right;margin-top:2px;">Source: ' +
    planDoc.name +
    '</div>';
  return html;
}

function brHl(text, terms) {
  var safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  terms.forEach(function (term) {
    if (term.length < 2) return;
    var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var boundary =
      term.length <= 3 || BR_ABBREVS.indexOf(term.toLowerCase()) !== -1
        ? '\\b'
        : '';
    var re = new RegExp('(' + boundary + escaped + boundary + ')', 'gi');
    safe = safe.replace(
      re,
      '<mark style="background:#FFF3CD;padding:0 2px;border-radius:2px;font-weight:700">$1</mark>'
    );
  });
  return safe;
}

// Legacy function — still available via "Ask AI" buttons in old results
function brAskAI(query) {
  var plansToUse = brSearchAllPlans
    ? BR_PLANS
    : brActivePlan
      ? [brActivePlan]
      : [];
  var answer = brSmartAnswer(query, plansToUse);
  brAddMsg('ai', answer);
}

// Broad category terms that should NOT be used alone for matching in Smart Analysis
// These cause false positives (e.g. "diagnostic" matching "preventive health services")
var BROAD_CATEGORY_TERMS = [
  'diagnostic',
  'imaging',
  'screening',
  'preventive',
  'outpatient',
  'inpatient',
  'ambulatory',
  'pathology',
  'surgical',
  'medical',
  'health',
  'care',
  'service',
  'services',
  'treatment',
  'benefit',
  'benefits',
  'covered',
  'coverage',
  'plan',
  'visit'
];

function getSpecificTerms(query) {
  var q = query.toLowerCase().trim();
  var specific = [q];
  // Only add DIRECT synonyms from the map (first-level lookup), not fuzzy matches
  if (SEARCH_SYNONYMS[q]) {
    SEARCH_SYNONYMS[q].forEach(function (s) {
      if (BROAD_CATEGORY_TERMS.indexOf(s) === -1) specific.push(s);
    });
  }
  // Also check for multi-word queries where each word might be a key
  var words = q.split(/\s+/);
  words.forEach(function (w) {
    if (w.length > 2 && SEARCH_SYNONYMS[w]) {
      SEARCH_SYNONYMS[w].forEach(function (s) {
        if (
          BROAD_CATEGORY_TERMS.indexOf(s) === -1 &&
          specific.indexOf(s) === -1
        )
          specific.push(s);
      });
    }
  });
  var unique = [];
  specific.forEach(function (t) {
    if (unique.indexOf(t) === -1) unique.push(t);
  });
  return unique;
}

function brSmartAnswer(query, plans) {
  var q = query.toLowerCase().trim();
  var expandedTerms = expandSearchSynonyms(q);
  var specificTerms = getSpecificTerms(q); // Only specific, non-broad terms for matching

  // Detect question type
  var isCovered =
    /cover|include|have|offer|provide|get|eligible|does it|is .+ covered|can i/i.test(
      q
    );
  var isNotCovered =
    /not cover|exclud|exclu|what.+not|isn.t cover|doesn.t cover|no coverage/i.test(
      q
    );
  var isCopay = /copay|co-pay|cost|how much|price|pay|charge|fee/i.test(q);
  var isWaiting =
    /wait|waiting period|when .+ start|how long|day 1|effective/i.test(q);
  var isPreEx =
    /pre-existing|preexisting|pre ex|prior condition|existing condition/i.test(
      q
    );

  var html =
    '<div style="background:#F8FAFF;border:1px solid #E8EBF5;border-left:3px solid #5175F1;border-radius:8px;padding:12px;">';
  html +=
    '<div style="font-size:10px;font-weight:800;color:#5175F1;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px;">' +
    LI.brain +
    ' Smart Analysis</div>';

  var foundAnything = false;

  plans.forEach(function (plan) {
    var planMatches = {
      benefits: [],
      exclusions: [],
      waiting: [],
      preex: [],
      notes: []
    };
    var hasDirectMatch = false; // Track if ANY specific term actually matched

    plan.entries.forEach(function (entry) {
      // FIX: Use brTermMatch for word-boundary-safe matching
      var matched = false;
      for (var i = 0; i < specificTerms.length; i++) {
        if (
          brTermMatch(entry.text, specificTerms[i]) ||
          brTermMatch(entry.category, specificTerms[i])
        ) {
          matched = true;
          hasDirectMatch = true;
          break;
        }
      }
      if (!matched) return;

      if (cat.includes('exclusion') || cat.includes('limitation'))
        planMatches.exclusions.push(entry.text);
      else if (cat.includes('waiting')) planMatches.waiting.push(entry.text);
      else if (cat.includes('pre-existing')) planMatches.preex.push(entry.text);
      else if (cat.includes('agent note')) planMatches.notes.push(entry.text);
      else planMatches.benefits.push(entry.text);
    });

    var hasResults =
      planMatches.benefits.length ||
      planMatches.exclusions.length ||
      planMatches.waiting.length ||
      planMatches.preex.length;
    if (!hasResults) return;
    foundAnything = true;

    html += '<div style="margin-bottom:10px;">';
    html +=
      '<div style="font-size:12px;font-weight:800;color:#1C2035;margin-bottom:6px;">' +
      LI.file +
      ' ' +
      plan.name +
      '</div>';

    if (planMatches.benefits.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #29A26A;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#15803D;margin-bottom:4px;">' +
        LI.check +
        ' &#9989; COVERED</div>';
      planMatches.benefits.forEach(function (b) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;padding-left:8px;border-left:2px solid #29A26A;">' +
          LI.dot +
          ' ' +
          brHl(b, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (planMatches.exclusions.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;">' +
        LI.ban +
        ' &#10060; NOT COVERED / LIMITED</div>';
      planMatches.exclusions.forEach(function (e) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;padding-left:8px;border-left:2px solid #DC2626;">' +
          LI.dot +
          ' ' +
          brHl(e, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (isWaiting && planMatches.waiting.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #F59E0B;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#C2410C;margin-bottom:4px;">' +
        LI.clock +
        ' &#9203; WAITING PERIODS</div>';
      planMatches.waiting.forEach(function (w) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;">' +
          LI.dot +
          ' ' +
          brHl(w, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (isPreEx && planMatches.preex.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #F59E0B;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#C2410C;margin-bottom:4px;">' +
        LI.warn +
        ' &#9888;&#65039; PRE-EXISTING CONDITIONS</div>';
      planMatches.preex.forEach(function (p) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;">' +
          LI.dot +
          ' ' +
          brHl(p, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    // Smart verdict — only give definitive COVERED if specific terms matched benefit entries
    if (
      !planMatches.benefits.length &&
      planMatches.exclusions.length &&
      isCovered
    ) {
      html +=
        '<div style="font-size:11px;color:#DC2626;font-weight:700;margin-top:4px;">' +
        LI.warn +
        ' This does not appear to be covered under ' +
        plan.name +
        '</div>';
    } else if (
      planMatches.benefits.length &&
      !planMatches.exclusions.length &&
      isCovered
    ) {
      html +=
        '<div style="font-size:11px;color:#15803D;font-weight:700;margin-top:4px;">' +
        LI.check +
        ' Yes, this appears to be covered under ' +
        plan.name +
        '</div>';
    } else if (
      planMatches.benefits.length &&
      planMatches.exclusions.length &&
      isCovered
    ) {
      html +=
        '<div style="font-size:11px;color:#D97706;font-weight:700;margin-top:4px;">' +
        LI.warn +
        ' Partial coverage — see benefits AND exclusions above for ' +
        plan.name +
        '</div>';
    }
    html +=
      '<div style="font-size:10px;color:#6B7280;font-style:italic;margin-top:6px;padding-top:4px;border-top:1px dashed rgba(0,0,0,0.08);">⚠️ Always verify against the full Schedule of Benefits before confirming coverage to the prospect.</div>';

    html += '</div>';
  });

  if (!foundAnything) {
    html += '<div style="font-size:12px;color:#6B7280;line-height:1.6;">';
    html +=
      '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:8px;padding:10px;margin-bottom:8px;">';
    html +=
      '<div style="font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;">' +
      LI.ban +
      ' NOT SPECIFICALLY LISTED</div>';
    html +=
      '<strong>"' +
      query.replace(/</g, '&lt;') +
      '"</strong> is not specifically listed in the Schedule of Benefits.</div>';
    html += '<div style="font-size:11px;color:#6B7280;line-height:1.6;">';
    html +=
      LI.dot +
      ' Plans state: <em>"does not cover any service NOT listed in Schedule of Benefits"</em><br>';
    html +=
      LI.dot +
      ' If the member needs this service, check if it falls under a broader covered category<br>';
    html +=
      LI.dot +
      ' Try broader terms: hospital, outpatient, surgery, office visit<br>';
    html += LI.dot + ' Tap "All Plans" to compare across every plan';
    html += '</div></div>';
  }

  if (specificTerms.length > 1) {
    html +=
      '<div style="font-size:10px;color:#9CA3AF;margin-top:6px;border-top:1px solid rgba(0,0,0,0.06);padding-top:6px;">Searched: ' +
      specificTerms.slice(0, 8).join(', ') +
      (specificTerms.length > 8 ? ' + more' : '') +
      '</div>';
  }

  html += '</div>';
  return html;
}

// FIX: Word-boundary-safe highlighting for short terms / medical abbreviations
function brHl(text, terms) {
  var safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  terms.forEach(function (term) {
    if (term.length < 2) return;
    var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var boundary =
      term.length <= 3 || BR_ABBREVS.indexOf(term.toLowerCase()) !== -1
        ? '\\b'
        : '';
    var re = new RegExp('(' + boundary + escaped + boundary + ')', 'gi');
    safe = safe.replace(
      re,
      '<mark style="background:#FFF3CD;padding:0 2px;border-radius:2px;font-weight:700">$1</mark>'
    );
  });
  return safe;
}

// ── ROTATING PLACEHOLDER TEXT ─────────────────────────
var _brPlaceholders = [
  'Ask about copays...',
  "What's excluded on this plan?",
  'Compare MEC vs STM...',
  'Is urgent care covered?',
  'What are the waiting periods?'
];
var _brPlaceholderIdx = 0;
function _brRotatePlaceholder() {
  var inp = document.getElementById('br-input');
  if (!inp || inp === document.activeElement || inp.value.trim()) return;
  _brPlaceholderIdx = (_brPlaceholderIdx + 1) % _brPlaceholders.length;
  inp.placeholder = _brPlaceholders[_brPlaceholderIdx];
}

// ── INIT: Build search index & start chat panel ──────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    buildSearchIndex();
    brInit();
    setInterval(_brRotatePlaceholder, 4000);
  });
} else {
  setTimeout(function () {
    buildSearchIndex();
    brInit();
    setInterval(_brRotatePlaceholder, 4000);
  }, 0);
}
