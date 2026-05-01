// chat.js — Benefits Reference chat panel
// Plan answers (local lookup + AI context) come only from POLICY_DOCS in
// plan-data.js / plan-data-extended.js. That data must match the official PDFs
// stored under CHA_KNOWLEDGE_BASE (/knowledge_base) — not /docs, /data, or /plans.
// ── SOB LOOKUP — Synonym-Aware, Cross-Plan, Instant + Ask AI ─────────────
var brActivePlan = null;
var brSearchAllPlans = false;
var brOpen = false;
var BR_PLANS = [];
var _brInitDone = false;
// Office key — scoped per Clerk user (see js/storage-utils.js). Console: brSetOfficeKey('gsk_...')
function brSetOfficeKey(key) {
  if (typeof chaSet === 'function') {
    chaSet('cha_groq_key', key);
  } else {
    localStorage.setItem('cha_groq_key', key);
  }
}
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
  // Always inject network discount for diagnostic/labs on eligible networks
  if (p.network && /First Health|PHCS|MultiPlan/i.test(p.network)) {
    entries.push({
      category: 'Network Discount Services',
      text: 'Diagnostic X-Ray and Labs — If the member stays in the ' + p.network + ' Network they will receive a negotiated discount. This is not a fixed insurance benefit — it is a network discount through ' + p.network + '. Member pays discounted rate at participating facilities.'
    });
    entries.push({
      category: 'Network Discount Services',
      text: 'Lab work, blood tests, radiology, imaging (MRI, CT scan, X-ray) — available at ' + p.network + ' negotiated rates. Always use an in-network lab or facility to receive the discount.'
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

function brIsRealPlanRecord(plan) {
  if (!plan) return false;
  var id = String(plan.id || '').toLowerCase();
  var type = String(plan.type || '').toLowerCase();
  var name = String(plan.name || '').trim();
  var carrier = String(plan.carrier || '').trim();
  var network = String(plan.network || '').trim();
  if (!id || !name) return false;
  // Exclude orphan knowledge-base file rows injected by plan-data-pdf-raw.js.
  if (id.indexOf('kb-') === 0) return false;
  if (type === 'knowledge base pdf') return false;
  if (carrier === '—' && network === '—') return false;
  return true;
}

function brGetPlanCategory(plan) {
  if (!plan) return '';
  var group = String(plan.group || '').trim();
  if (group === 'MEC' || group === 'STM' || group === 'Limited') return group;

  var type = String(plan.type || '').toLowerCase();
  if (type.indexOf('limited') !== -1) return 'Limited';
  if (type.indexOf('stm') !== -1 || type.indexOf('short term') !== -1) return 'STM';
  if (type.indexOf('mec') !== -1) return 'MEC';
  return group;
}

// ── AI STATUS INDICATOR ─────────────────────────────────────────────────────
function _brSetStatus(mode) {
  var el = document.getElementById('br-ai-status');
  var lbl = document.getElementById('br-ai-label');
  if (!el || !lbl) return;
  el.className = 'br-ai-status';
  if (mode === 'ai') {
    el.classList.add('br-ai-active');
    lbl.textContent = 'Groq AI Active';
  } else if (mode === 'thinking') {
    el.classList.add('br-ai-thinking');
    lbl.textContent = 'AI Thinking...';
  } else {
    el.classList.add('br-ai-local');
    lbl.textContent = 'Plan Lookup';
  }
}


function brInit() {
  if (_brInitDone) return;
  if (typeof POLICY_DOCS === 'undefined' || !POLICY_DOCS.length) return;
  if (!document.getElementById('br-plan-bar')) return;
  _brInitDone = true;

  BR_PLANS = POLICY_DOCS.filter(function (p) {
    return brIsRealPlanRecord(p);
  }).map(function (p) {
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

  // ── SMART PLAN SEARCH BAR ──────────────────────────────────────
  var searchWrap = document.createElement('div');
  searchWrap.style.cssText = 'padding:8px 12px 0;background:var(--bg-surface);';
  var searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'br-plan-search';
  searchInput.placeholder = 'Search plans... (e.g. "MedFirst", "Everest", "STM")';
  searchInput.style.cssText = 'width:100%;font-size:13px;padding:9px 14px;border-radius:8px;border:1px solid var(--border-light, var(--border-default));background:var(--bg-surface);color:var(--text-primary);box-sizing:border-box;outline:none;';
  searchInput.addEventListener('focus', function () {
    searchInput.style.borderColor = '#5175f1';
  });
  searchInput.addEventListener('blur', function () {
    searchInput.style.borderColor = '#e2e8f0';
  });
  searchWrap.appendChild(searchInput);

  var noMatchMsg = document.createElement('div');
  noMatchMsg.id = 'br-search-no-match';
  noMatchMsg.style.cssText = 'display:none;font-size:12px;color:var(--text-tertiary);padding:6px 14px 0;';
  noMatchMsg.textContent = 'No plans found \u2014 try a different term';
  searchWrap.appendChild(noMatchMsg);

  var navSection = document.getElementById('br-filter-bar').parentNode;
  navSection.insertBefore(searchWrap, navSection.firstChild);

  // Synonym map for plan search
  var PLAN_SEARCH_SYNONYMS = {
    'mec': 'MEC', 'minimum essential': 'MEC',
    'stm': 'STM', 'short term': 'STM', 'short-term': 'STM',
    'limited': 'Limited', 'indemnity': 'Limited',
    'detego': 'GHDP', 'ghdp': 'GHDP',
    'medfirst': 'MedFirst', 'med first': 'MedFirst',
    'everest': 'Everest',
    'smart choice': 'Smart Choice', 'smartchoice': 'Smart Choice',
    'pinnacle': 'Pinnacle',
    'harmony': 'HarmonyCare', 'harmonycare': 'HarmonyCare',
    'access': 'Access Health',
    'bcs': 'Limited',
    'afslic': 'Limited', 'american fidelity': 'Limited',
    'tdk': 'TDK',
    'neo': 'STM', 'smart health': 'Smart Health',
    'goodhealth': 'GoodHealth', 'good health': 'GoodHealth',
    'truehealth': 'trueh', 'true health': 'trueh',
    'galena': 'Galena',
    'sigmacare': 'SigmaCare', 'sigma': 'SigmaCare',
    'nce': 'NCE', 'health choice': 'NCE',
    'bwa': 'BWA', 'paramount': 'Paramount', 'americare': 'Americare',
    // ── Extended plan synonyms (batch 2) ──
    // Pinnacle Protect (4 plans)
    'pinnacle protect': 'pinnacleprotect',
    'pinnacleprotect': 'pinnacle protect',
    'protect plan': 'pinnacleprotect',
    // Pinnacle Critical Care (4 plans)
    'critical care': 'pinnaclecriticalcare',
    'criticalcare': 'critical care',
    'pinnacle critical': 'pinnaclecriticalcare',
    // Allstate STM / Limited (4 plans)
    'allstate': 'allstateenhancedstm',
    'allstate enhanced': 'allstateenhancedstm',
    'allstate copay': 'allstatecopayenhancedstm',
    'copay enhanced': 'allstatecopayenhancedstm',
    'allstate essentials': 'allstateessentialsstm',
    'essentials stm': 'allstateessentialsstm',
    'health access': 'allstatehealthaccess',
    'allstate access': 'health access',
    // MyChoice (3 plans)
    'mychoice': 'mychoice',
    'my choice': 'mychoice'
  };

  // Fuzzy match: check if 80% of chars in needle appear in haystack in order
  function _brFuzzyMatch(needle, haystack) {
    needle = needle.toLowerCase();
    haystack = haystack.toLowerCase();
    if (haystack.indexOf(needle) !== -1) return true;
    var hi = 0;
    var matched = 0;
    for (var ni = 0; ni < needle.length; ni++) {
      for (var j = hi; j < haystack.length; j++) {
        if (needle[ni] === haystack[j]) {
          matched++;
          hi = j + 1;
          break;
        }
      }
    }
    return matched >= Math.ceil(needle.length * 0.8);
  }

  // Filter plan buttons by search term
  function _brFilterPlansBySearch(term) {
    var planBar = document.getElementById('br-plan-bar');
    if (!planBar) return;
    var noMatch = document.getElementById('br-search-no-match');
    var btns = planBar.querySelectorAll('.br-plan-btn');
    if (!term) {
      // Show all
      for (var i = 0; i < btns.length; i++) btns[i].style.display = '';
      if (noMatch) noMatch.style.display = 'none';
      return;
    }
    var lowerTerm = term.toLowerCase().trim();
    // Check synonym map first
    var synonymTarget = null;
    var synonymKeys = Object.keys(PLAN_SEARCH_SYNONYMS);
    for (var s = 0; s < synonymKeys.length; s++) {
      if (lowerTerm === synonymKeys[s] || lowerTerm.indexOf(synonymKeys[s]) !== -1) {
        synonymTarget = PLAN_SEARCH_SYNONYMS[synonymKeys[s]];
        break;
      }
    }
    // Also check if a synonym key starts with the search term
    if (!synonymTarget) {
      for (var sk = 0; sk < synonymKeys.length; sk++) {
        if (synonymKeys[sk].indexOf(lowerTerm) === 0) {
          synonymTarget = PLAN_SEARCH_SYNONYMS[synonymKeys[sk]];
          break;
        }
      }
    }
    // Check group-level synonyms (MEC/STM/Limited)
    var groupTarget = null;
    if (synonymTarget === 'MEC' || synonymTarget === 'STM' || synonymTarget === 'Limited') {
      groupTarget = synonymTarget;
      synonymTarget = null;
    }
    var visibleCount = 0;
    for (var b = 0; b < btns.length; b++) {
      var btnName = btns[b].textContent;
      var btnNameLower = btnName.toLowerCase();
      var show = false;
      // Group filter
      if (groupTarget) {
        var planObj = BR_PLANS.find(function (p) { return p.name === btnName; });
        if (planObj && brGetPlanCategory(planObj) === groupTarget) show = true;
      }
      // Synonym target match
      if (synonymTarget && btnNameLower.indexOf(synonymTarget.toLowerCase()) !== -1) show = true;
      // Exact/partial match
      if (btnNameLower.indexOf(lowerTerm) !== -1) show = true;
      // Fuzzy/typo tolerance
      if (!show && lowerTerm.length >= 3) {
        show = _brFuzzyMatch(lowerTerm, btnName);
      }
      btns[b].style.display = show ? '' : 'none';
      if (show) visibleCount++;
    }
    if (noMatch) noMatch.style.display = visibleCount === 0 ? '' : 'none';
  }

  searchInput.addEventListener('keyup', function () {
    _brFilterPlansBySearch(searchInput.value);
  });

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
      // Clear search bar when filter is clicked
      var _si = document.getElementById('br-plan-search');
      if (_si) _si.value = '';
      var _nm = document.getElementById('br-search-no-match');
      if (_nm) _nm.style.display = 'none';
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
          return brGetPlanCategory(p) === f.key;
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

  // Set initial AI status
  var _initKey =
    typeof chaGroqKeyString === 'function' ? chaGroqKeyString() : '';
  _brSetStatus(_initKey && _initKey !== 'skip' && _initKey.length > 20 ? 'ai' : 'local');

  // Groq AI is provided automatically via the shared company key
  // fetched by ai-tools.js into _aiGroqFallbackKey. Agents do not
  // manage their own keys, so no ⚙ AI settings button is rendered.
}

function brRenderPlanButtons(groupFilter) {
  var planBar = document.getElementById('br-plan-bar');
  if (!planBar) return;
  planBar.innerHTML = '';
  // Show all plans in filtered views without requiring horizontal scroll.
  planBar.style.flexWrap = groupFilter ? 'wrap' : 'nowrap';
  planBar.style.overflowX = groupFilter ? 'hidden' : 'auto';
  planBar.style.overflowY = 'hidden';

  var plans = groupFilter
    ? BR_PLANS.filter(function (p) {
        return brGetPlanCategory(p) === groupFilter;
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
      brActiveFilter = brGetPlanCategory(p);
      document.querySelectorAll('.br-filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.filter === brGetPlanCategory(p));
      });
      brActivePlan = BR_PLANS.find(function (x) {
        return x.id === p.id;
      });
      // Sync sticky plan context
      if (brActivePlan && typeof setActivePlan === 'function') {
        setActivePlan(
          brActivePlan.id,
          brActivePlan.name,
          brGetPlanCategory(brActivePlan) || ''
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
  var planName = brActivePlan ? brActivePlan.name : 'a plan';
  var planGroup = brActivePlan ? brActivePlan.group : '';
  var groupDot = { MEC: '#22c55e', STM: '#5B8DEF', Limited: '#7C3AED' };
  var dot = groupDot[planGroup] || '#94a3b8';

  var html = '<div style="text-align:center;padding:16px 8px 8px;">';
  // Active plan badge
  if (brActivePlan) {
    html += '<div style="display:inline-flex;align-items:center;gap:6px;background:var(--bg-surface-muted);border:1px solid var(--border-light, var(--border-default));border-radius:999px;padding:5px 14px;margin-bottom:12px;">';
    html += '<span style="width:7px;height:7px;border-radius:50%;background:' + dot + ';display:inline-block;"></span>';
    html += '<span style="font-size:12px;font-weight:700;color:var(--text-primary);">' + escHTML(planName) + '</span>';
    html += '<span style="font-size:10px;font-weight:600;color:var(--text-secondary);">' + escHTML(planGroup) + '</span>';
    html += '</div>';
  }
  html += '<div style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:14px;">Use the chips above or type any question below — copays, exclusions, waiting periods, x-ray, Rx, and more.</div>';
  html += '</div>';

  // Quick suggestion buttons — 2 per row, simple
  var suggestions = [
    { label: 'What are the copays?', q: 'What are the copays?' },
    { label: "What's NOT covered?", q: 'What is NOT covered? List all exclusions.' },
    { label: 'Waiting periods?', q: 'What are the waiting periods and pre-existing condition rules?' },
    { label: 'X-Ray & Labs?', q: 'Is x-ray and lab work covered?' }
  ];
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:0 4px 8px;">';
  suggestions.forEach(function(s) {
    html += '<button onclick="brQuick(\'' + escHTML(s.q) + '\')" style="padding:9px 10px;border-radius:8px;border:1px solid var(--border-light, var(--border-default));background:var(--bg-surface);font-size:12px;font-weight:600;color:var(--text-secondary);cursor:pointer;text-align:left;line-height:1.4;">' + escHTML(s.label) + '</button>';
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
  brActiveFilter = brGetPlanCategory(plan);
  brActivePlan = plan;
  document.querySelectorAll('.br-filter-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.filter === brGetPlanCategory(plan));
  });
  document.querySelectorAll('.br-plan-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.id === planId);
  });
  if (typeof setActivePlan === 'function') {
    setActivePlan(plan.id, plan.name, brGetPlanCategory(plan) || '');
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
  var btn = document.getElementById('br-toggle');
  if (btn) {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
  }
  if (brOpen) {
    document.getElementById('br-input').focus();
    brScroll();
  }
});

(function () {
  var ex = document.getElementById('br-expand');
  if (!ex) return;
  ex.addEventListener('click', function (ev) {
    ev.stopPropagation();
    var panel = document.getElementById('br-panel');
    if (!panel) return;
    var on = panel.classList.toggle('br-expanded');
    ex.setAttribute('aria-pressed', on ? 'true' : 'false');
    ex.textContent = on ? 'Shrink' : 'Expand';
  });
})();

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
  if (e.ctrlKey && e.key === 'Enter') {
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
  // Clear search bar
  var _si = document.getElementById('br-plan-search');
  if (_si) _si.value = '';
  var _nm = document.getElementById('br-search-no-match');
  if (_nm) _nm.style.display = 'none';
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
    var _m0 = document.getElementById('br-msgs');
    if (_m0)
      setTimeout(function () {
        _m0.scrollTop = _m0.scrollHeight;
      }, 50);
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
      var _m1 = document.getElementById('br-msgs');
      if (_m1)
        setTimeout(function () {
          _m1.scrollTop = _m1.scrollHeight;
        }, 50);
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
  var _m = document.getElementById('br-msgs');
  if (_m)
    setTimeout(function () {
      _m.scrollTop = _m.scrollHeight;
    }, 50);
}

function brScroll() {
  var msgs = document.getElementById('br-msgs');
  setTimeout(function () {
    if (!msgs) return;
    var last = msgs.lastElementChild;
    if (last && typeof last.scrollIntoView === 'function') {
      last.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      msgs.scrollTop = msgs.scrollHeight;
    }
  }, 80);
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

// ── GROQ AI INTEGRATION (ES5 safe — no async/await) ──────────
function brShowTyping() {
  _brSetStatus('thinking');
  var msgs = document.getElementById('br-msgs');
  if (!msgs || document.getElementById('br-typing')) return;
  var div = document.createElement('div');
  div.id = 'br-typing';
  div.style.cssText =
    'display:flex;gap:4px;padding:12px 16px;align-items:center;';
  div.innerHTML =
    '<div class="br-ai-dot"></div><div class="br-ai-dot" style="animation-delay:0.2s"></div><div class="br-ai-dot" style="animation-delay:0.4s"></div>';
  msgs.appendChild(div);
  brScroll();
}
function brHideTyping() {
  var t = document.getElementById('br-typing');
  if (t) t.remove();
  // Reset status after AI responds
  var key = typeof chaGroqKeyString === 'function' ? chaGroqKeyString() : '';
  _brSetStatus(key && key !== 'skip' && key.length > 20 ? 'ai' : 'local');
}

/** Replace weak “I don’t know” phrasing with a consultative pivot (compliance-safe). */
function _brSanitizeAiUnknowns(t) {
  if (!t || typeof t !== 'string') return t;
  var piv =
    "The plan text we have doesn't spell that out word-for-word—here's what it *does* say, and we'll keep STATUS as VERIFY until you match it to the carrier-facing line.";
  return t
    .replace(/\bI\s+don'?t\s+know\b/gi, piv)
    .replace(/\bI\s+do\s+not\s+know\b/gi, piv)
    .replace(/\bI\s+am\s+not\s+sure\b/gi, piv)
    .replace(/\bI'?m\s+not\s+sure\b/gi, piv)
    .replace(/\bI\s+cannot\s+(answer|tell|say)\b/gi, piv)
    .replace(/\bI\s+can'?t\s+(answer|tell|say)\b/gi, piv)
    .replace(/\bno\s+idea\b/gi, piv);
}

/** True if combined model text signals an exclusion / non-benefit (tier-1). */
function _brTierExclusionSignals(lower) {
  return (
    lower.indexOf('exclusion') !== -1 ||
    lower.indexOf('not covered') !== -1 ||
    lower.indexOf('not a benefit') !== -1
  );
}

function _brHudRow(label, value) {
  if (!value && label !== 'PLAN' && label !== 'STATUS') return '';
  return (
    '<div style="display:grid;grid-template-columns:88px 1fr;gap:8px 12px;align-items:start;padding:6px 0;border-bottom:1px solid rgb(15 23 42 / 0.06);font-size:12px;line-height:1.45;">' +
    '<span style="font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);">' +
    escHTML(label) +
    '</span>' +
    '<span style="color:var(--text-primary);">' +
    value +
    '</span></div>'
  );
}

function brRenderAIAnswer(text, planName, planSource) {
  var srcFile = planSource || '';
  text = _brSanitizeAiUnknowns(text);
  var status = 'VERIFY';
  var fact = '';
  var sayThis = '';
  var sourceFromModel = '';
  var lines = text.split('\n');
  for (var li = 0; li < lines.length; li++) {
    var line = lines[li].trim();
    var up = line.toUpperCase();
    if (up.indexOf('STATUS:') === 0) {
      var sv = line.substring(7).trim().toUpperCase();
      if (sv.indexOf('NOT COVERED') !== -1) status = 'NOT COVERED';
      else if (sv.indexOf('PARTIAL') !== -1) status = 'PARTIAL';
      else if (sv.indexOf('COVERED') !== -1) status = 'COVERED';
      else status = 'VERIFY';
    } else if (up.indexOf('FACT:') === 0) {
      fact = line.substring(5).trim();
    } else if (up.indexOf('ANSWER:') === 0) {
      if (!fact) fact = line.substring(7).trim();
    } else if (up.indexOf('SAY THIS:') === 0) {
      sayThis = line.substring(9).trim().replace(/^"|"$/g, '');
    } else if (up.indexOf('SOURCE:') === 0) {
      sourceFromModel = line.substring(7).trim();
    }
  }
  if (!fact)
    fact = text
      .replace(/STATUS:.*\n?/i, '')
      .replace(/FACT:.*\n?/i, '')
      .replace(/ANSWER:.*\n?/i, '')
      .replace(/SAY THIS:.*\n?/i, '')
      .replace(/SOURCE:.*\n?/i, '')
      .trim();
  if (!fact)
    fact =
      'Use the plan PDF or carrier materials to confirm this point; keep the conversation consultative until the exact policy language is in hand.';
  var _unconfirmed =
    fact.indexOf('[UNCONFIRMED: PLEASE CHECK PLAN DOCS]') !== -1 ||
    sayThis.indexOf('[UNCONFIRMED: PLEASE CHECK PLAN DOCS]') !== -1 ||
    text.indexOf('[UNCONFIRMED: PLEASE CHECK PLAN DOCS]') !== -1;
  if (_unconfirmed) {
    status = 'VERIFY';
  }
  var combinedLower = (fact + ' ' + sayThis + ' ' + text).toLowerCase();
  // Tier 1: exclusion / not covered / not a benefit → NOT COVERED
  if (_brTierExclusionSignals(combinedLower)) {
    status = 'NOT COVERED';
  }
  // Override COVERED when text contradicts coverage
  if (status === 'COVERED') {
    var _checkText = combinedLower;
    if (
      _checkText.indexOf('not covered') !== -1 ||
      _checkText.indexOf('no coverage') !== -1 ||
      _checkText.indexOf('not a covered') !== -1 ||
      _checkText.indexOf('not a benefit') !== -1 ||
      _checkText.indexOf('exclusion') !== -1 ||
      _checkText.indexOf('no reimbursement') !== -1
    ) {
      status = 'NOT COVERED';
    }
  }
  var borderColor = '#f59e0b';
  var bgColor = '#fffbeb';
  if (status === 'COVERED') {
    borderColor = '#22c55e';
    bgColor = '#f0fdf4';
  } else if (status === 'NOT COVERED') {
    borderColor = '#ef4444';
    bgColor = 'var(--cha-danger-bg)';
  } else if (status === 'PARTIAL') {
    borderColor = '#3b82f6';
    bgColor = '#eff6ff';
  }
  var statusHud = status;
  if (status === 'NOT COVERED') statusHud = '\u274c NOT COVERED';
  else if (status === 'COVERED') statusHud = '\u2705 COVERED';
  else if (status === 'PARTIAL') statusHud = '\u25d1 PARTIAL';
  else if (status === 'VERIFY') statusHud = '\u26a0 VERIFY';

  var sourceHud = escHTML(sourceFromModel || srcFile || planName || 'Plan document');

  var sayBlock = '';
  if (sayThis) {
    var safeText = sayThis.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    sayBlock =
      '<div style="background:var(--bg-surface-raised);border-radius:8px;padding:8px 10px;margin-top:4px;">' +
      '<div style="font-size:12px;font-style:italic;color:var(--text-secondary);">' +
      escHTML(sayThis) +
      '</div>' +
      '<button onclick="navigator.clipboard.writeText(\'' +
      safeText +
      "');this.textContent='Copied!';var b=this;setTimeout(function(){b.textContent='Copy';},2000);\" " +
      'style="margin-top:6px;font-size:10px;padding:3px 10px;border-radius:999px;border:1px solid var(--border-light, var(--border-default));background:var(--bg-surface);cursor:pointer;color:var(--text-secondary);">Copy</button></div>';
  }

  var html =
    '<div style="border-left:4px solid ' +
    borderColor +
    ';background:' +
    bgColor +
    ';border-radius:12px;padding:12px 14px;margin-bottom:10px;border:1px solid ' +
    borderColor +
    '35;">' +
    '<div style="font-family:var(--font-ui);font-size:10px;font-weight:800;letter-spacing:0.1em;color:var(--text-secondary);margin-bottom:6px;">BENEFITS HUD</div>' +
    _brHudRow('PLAN', escHTML(planName || '')) +
    _brHudRow('STATUS', statusHud) +
    _brHudRow('FACT', escHTML(fact).replace(/\n/g, '<br>')) +
    _brHudRow('SAY THIS', sayBlock || '<span style="color:var(--text-tertiary);">—</span>') +
    _brHudRow('SOURCE', sourceHud) +
    '</div>';
  brAddMsg('ai', html);
}

// ── LOCAL LOOKUP — checks POLICY_DOCS before calling AI ──
function brLocalLookup(query, plan) {
  var q =
    typeof _brFixTypos === 'function'
      ? _brFixTypos(query.toLowerCase())
      : query.toLowerCase();
  var result = { confident: false, status: 'VERIFY', data: '', source: '' };
  var allData = [];
  if (plan.benefits) {
    for (var b = 0; b < plan.benefits.length; b++) {
      var cat = plan.benefits[b];
      if (cat.items) {
        for (var ci = 0; ci < cat.items.length; ci++)
          allData.push(cat.items[ci]);
      }
      if (cat.category) allData.push(cat.category);
    }
  }
  if (plan.limitations) allData = allData.concat(plan.limitations);
  if (plan.waitingPeriods) allData = allData.concat(plan.waitingPeriods);
  if (plan.preEx)
    allData.push(
      typeof plan.preEx === 'string' ? plan.preEx : JSON.stringify(plan.preEx)
    );
  if (plan.planNotes)
    allData.push(
      typeof plan.planNotes === 'string'
        ? plan.planNotes
        : JSON.stringify(plan.planNotes)
    );

  var STOP = ['what','is','are','the','a','an','for','this','that','does','do','have','has','would','will','can','i','you','my','your','our','we','they','them','about','listed','there','any','plan','cover','covered','coverage','on','in','to','of','with','be','been','from','get','if','how','much','me','all','one','time','times','per','as','year','years','month','monthly','day','day']; 
  var qClean = q.replace(/[^a-z0-9\s]/g, ' ');
  var words = qClean.split(/\s+/).filter(function(w){
    return w.length >= 3 && STOP.indexOf(w) === -1;
  });
  var terms = words.length > 0 ? words.slice() : [q];
  if (typeof _brExpandTerm === 'function') {
    for (var k = 0; k < words.length; k++) {
      var expanded = _brExpandTerm(words[k]);
      for (var e = 0; e < expanded.length; e++) {
        if (terms.indexOf(expanded[e]) === -1) terms.push(expanded[e]);
      }
    }
  }

  var SYNONYMS = {
    'exclusion':['exclusion','exclusions','limitation','limitations','excluded','not covered','not eligible'],
    'exclusions':['exclusion','exclusions','limitation','limitations','excluded','not covered','not eligible'],
    'bloodwork':['bloodwork','blood work','lab','labs','laboratory','lab test','blood test','lab work'],
    'labs':['bloodwork','blood work','lab','labs','laboratory','lab test','blood test','lab work'],
    'lab':['bloodwork','blood work','lab','labs','laboratory','lab test','blood test','lab work'],
    'xray':['xray','x-ray','radiology','imaging','diagnostic imaging'],
    'network':['network','ppo','in-network','out-of-network','first health','multiplan','phcs'],
    'waiting':['waiting','waiting period','wait','30-day','30 day','sickness','injury'],
    'periods':['waiting','waiting period','wait','30-day','30 day','sickness','injury'],
    'preex':['pre-existing','pre existing','preex','pre-ex','12/12','look-back','lookback'],
    'preexisting':['pre-existing','pre existing','preex','pre-ex','12/12','look-back','lookback'],
    'er':['emergency room','er','emergency'],
    'emergency':['emergency room','er','emergency'],
    'rx':['rx','prescription','prescriptions','pharmacy','drug','medication','script'],
    'prescription':['rx','prescription','prescriptions','pharmacy','drug','medication','script'],
    'deductible':['deductible','deductibles'],
    'copay':['copay','copays','copayment'],
    'copays':['copay','copays','copayment'],
    'urgent':['urgent care','urgent'],
    'ambulance':['ambulance'],
    'hospital':['hospital','inpatient','hospitalization','admission'],
    'inpatient':['hospital','inpatient','hospitalization','admission'],
    'outpatient':['outpatient','surgery','outpatient surgery'],
    'mental':['mental health','mental','psychiatry','therapy','counseling'],
    'dental':['dental','dentist','teeth'],
    'vision':['vision','eye','optometry','eyeglass'],
    'preventive':['preventive','preventative','wellness','checkup','annual']
  };
  var originalTerms = terms.slice();
  for (var s = 0; s < originalTerms.length; s++) {
    var syns = SYNONYMS[originalTerms[s]];
    if (syns) {
      for (var ss = 0; ss < syns.length; ss++) {
        if (terms.indexOf(syns[ss]) === -1) terms.push(syns[ss]);
      }
    }
  }

  var matched = [];
  for (var i = 0; i < allData.length; i++) {
    var entry = String(allData[i]).toLowerCase();
    for (var j = 0; j < terms.length; j++) {
      if (entry.indexOf(terms[j]) !== -1) {
        matched.push(allData[i]);
        break;
      }
    }
  }

  matched = matched.slice(0, 3);

  if (matched.length > 0) {
    result.confident = true;
    // Only count NOT COVERED if the MAJORITY of matches say so — prevents one
    // unrelated exclusion line from poisoning a query that IS covered
    var notCoveredCount = 0;
    var coveredCount = 0;
    matched.forEach(function (m) {
      var ml = String(m).toLowerCase();
      if (
        ml.indexOf('not a covered insurance benefit') !== -1 ||
        ml.indexOf('will not be considered eligible') !== -1 ||
        ml.indexOf('not covered') !== -1 ||
        ml.indexOf('excluded') !== -1 ||
        ml.indexOf('no coverage') !== -1
      ) {
        notCoveredCount++;
      } else {
        coveredCount++;
      }
    });
    result.data = matched.slice(0, 3).join('\n');
    var mt = result.data.toLowerCase();
    // Neutral info queries — waiting period (non-STM), pre-existing, network
    // are informational facts, not coverage yes/no. Use VERIFY (neutral amber)
    // instead of classifying as COVERED / NOT COVERED. STM plans keep the
    // existing classification for waiting period because their waiting rules
    // are a material yes/no sales point.
    var _isSTM = plan && (plan.group === 'STM' || plan.type === 'STM');
    var _isInfoQuery =
      q.indexOf('pre-existing') !== -1 ||
      q.indexOf('pre existing') !== -1 ||
      q.indexOf('network') !== -1 ||
      (!_isSTM && q.indexOf('waiting period') !== -1);
    if (_isInfoQuery) {
      result.status = 'VERIFY';
    } else if (notCoveredCount > coveredCount) {
      result.status = 'NOT COVERED';
    } else if (
      mt.indexOf('discount') !== -1 &&
      (mt.indexOf('not insurance') !== -1 || mt.indexOf('discount only') !== -1)
    ) {
      result.status = 'DISCOUNT';
    } else {
      result.status = 'COVERED';
    }
  }
  return result;
}

function brRenderLocalResult(result, planName) {
  _brSetStatus('local');
  var borderColor = '#22c55e';
  var bgColor = '#f0fdf4';
  var badgeColor = '#16a34a';
  var icon = '✓';
  var label = result.status;
  if (result.status === 'NOT COVERED') {
    borderColor = '#ef4444';
    bgColor = 'var(--cha-danger-bg)';
    badgeColor = '#dc2626';
    icon = '✗';
  } else if (result.status === 'VERIFY') {
    borderColor = '#f59e0b';
    bgColor = '#fffbeb';
    badgeColor = '#d97706';
    icon = '⚠';
  } else if (result.status === 'DISCOUNT') {
    borderColor = '#8b5cf6';
    bgColor = '#f5f3ff';
    badgeColor = '#7c3aed';
    icon = '%';
    label = 'DISCOUNT ONLY';
  }
  var html =
    '<div style="border-left:4px solid ' +
    borderColor +
    ';background:' +
    bgColor +
    ';border-radius:12px;padding:14px 16px;margin-bottom:10px;border:1px solid ' +
    borderColor +
    '30;">' +
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
    '<span style="background:' +
    badgeColor +
    ';color:#fff;font-size:9px;font-weight:700;letter-spacing:1px;padding:3px 8px;border-radius:999px;white-space:nowrap;word-break:keep-all;">' +
    icon +
    ' ' +
    label +
    '</span>' +
    '<span style="font-size:12px;font-weight:500;color:var(--text-primary);">' +
    escHTML(planName) +
    '</span>' +
    '<span style="font-size:9px;color:var(--text-tertiary);margin-left:auto;">From plan documents</span></div>' +
    '<div style="font-size:13px;color:var(--text-secondary);line-height:1.7;">' +
    escHTML(result.data).replace(/\n/g, '<br>') +
    '</div></div>';
  brAddMsg('ai', html);
}

/** Match server normalizeRagPreferredPlanId — POLICY_DOCS uses tdk5, chunks use tdk-5. */
function brNormalizePlanIdForBrApi(planId) {
  var id = planId ? String(planId).trim() : '';
  if (!id) return null;
  var lower = id.toLowerCase();
  var m = lower.match(/^tdk([1-5])$/);
  if (m) return 'tdk-' + m[1];
  return id;
}

function brServerAnswer(query, planId) {
  var ragPlanId = brNormalizePlanIdForBrApi(planId);
  return fetch('/api/br-answer?t=' + Date.now(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      planId: ragPlanId || null,
      matchCount: 8,
      matchThreshold: 0.3
    })
  }).then(function (response) {
    if (!response.ok) throw new Error('br-answer error ' + response.status);
    return response.json();
  }).then(function (data) {
    console.log('[CHA DEBUG] API response:', data);
    return data;
  });
}

/** Normalize API / model status strings for badge + color logic. */
function normalizeBrStatus(raw) {
  var s = String(raw == null ? '' : raw)
    .replace(/[\u00a0\u2007\u202f]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.]+$/g, '')
    .toUpperCase();
  if (s === 'NOTCOVERED' || /^NOT\s+COVERED/.test(s)) return 'NOT COVERED';
  if (s === 'COVERED') return 'COVERED';
  if (s === 'VERIFY') return 'VERIFY';
  if (s === 'PARTIAL') return 'PARTIAL';
  if (s === 'INFO') return 'INFO';
  return s;
}

function brStatusColor(status) {
  var s = normalizeBrStatus(status);
  if (s === 'COVERED') {
    return { border: '#22c55e', bg: '#f0fdf4', badge: '#16a34a', text: '#166534' };
  }
  if (s === 'NOT COVERED') {
    return { border: '#ef4444', bg: 'var(--cha-danger-bg)', badge: '#dc2626', text: '#7f1d1d' };
  }
  if (s === 'PARTIAL') {
    return { border: '#3b82f6', bg: '#eff6ff', badge: '#2563eb', text: '#1e3a8a' };
  }
  if (s === 'INFO') {
    return {
      border: '#5175f1',
      bg: '#eef1fb',
      badge: '#eef1fb',
      badgeFg: '#3550c8',
      text: '#3550c8'
    };
  }
  if (s === 'VERIFY') {
    return { border: '#f59e0b', bg: '#fffbeb', badge: '#d97706', text: '#78350f' };
  }
  return { border: '#f59e0b', bg: '#fffbeb', badge: '#d97706', text: '#78350f' };
}

function brStatusBadgeIcon(status) {
  var s = normalizeBrStatus(status);
  if (s === 'NOT COVERED') return '\u274c ';
  if (s === 'COVERED') return '\u2705 ';
  if (s === 'VERIFY') return '\u26a0\ufe0f ';
  if (s === 'PARTIAL') return '\u25cf ';
  if (s === 'INFO') return '\u24d8 ';
  return '\u26a0\ufe0f ';
}

/** Client-side guard when API/status and visible answer text disagree (stale cache, model drift). */
function brAnswerTextImpliesNotCovered(fact, sayThis) {
  var t = (String(fact || '') + '\n' + String(sayThis || ''))
    .toLowerCase()
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ');
  if (t.indexOf('not a covered insurance benefit') !== -1) return true;
  if (t.indexOf('will not be considered eligible') !== -1) return true;
  if (t.indexOf('is not covered under the plan') !== -1) return true;
  if (t.indexOf('is not covered under this plan') !== -1) return true;
  return false;
}

function brRenderServerAnswer(payload, planName, planSource) {
  var fact = String(
    (payload && payload.fact) || '[UNCONFIRMED: PLEASE CHECK PLAN DOCS]'
  );
  var sayThis = String((payload && payload.sayThis) || '');
  var status = normalizeBrStatus((payload && payload.status) || 'VERIFY');
  if (
    status !== 'INFO' &&
    (status === 'COVERED' || status === 'PARTIAL') &&
    brAnswerTextImpliesNotCovered(fact, sayThis)
  ) {
    console.warn(
      '[CHA BR] brRenderServerAnswer: forcing NOT COVERED (answer text contradicts status ' +
        status +
        ')'
    );
    status = 'NOT COVERED';
  }
  if (!/^(COVERED|NOT COVERED|VERIFY|PARTIAL|INFO)$/.test(status)) {
    status = 'VERIFY';
  }
  var source = String((payload && payload.source) || planSource || planName || 'Plan PDF');
  var requestId = String((payload && payload.requestId) || '');
  var c = brStatusColor(status);

  var sayBlock = '<span style="color:var(--text-tertiary);">—</span>';
  if (sayThis) {
    var safeText = sayThis.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    sayBlock =
      '<div style="background:var(--bg-surface-raised);border-radius:8px;padding:8px 10px;margin-top:4px;">' +
      '<div style="font-size:12px;font-style:italic;color:var(--text-secondary);">' +
      escHTML(sayThis).replace(/\n/g, '<br>') +
      '</div>' +
      '<button onclick="navigator.clipboard.writeText(\'' +
      safeText +
      "');this.textContent='Copied!';var b=this;setTimeout(function(){b.textContent='Copy';},2000);\" " +
      'style="margin-top:6px;font-size:10px;padding:3px 10px;border-radius:999px;border:1px solid var(--border-light, var(--border-default));background:var(--bg-surface);cursor:pointer;color:var(--text-secondary);">Copy</button></div>';
  }

  var sourceHud = escHTML(source);
  if (requestId) sourceHud += '<div style="margin-top:4px;color:var(--text-tertiary);">Request: ' + escHTML(requestId) + '</div>';

  var html =
    '<div style="border-left:4px solid ' +
    c.border +
    ';background:' +
    c.bg +
    ';border-radius:12px;padding:12px 14px;margin-bottom:10px;border:1px solid ' +
    c.border +
    '35;">' +
    '<div style="font-family:var(--font-ui);font-size:10px;font-weight:800;letter-spacing:0.1em;color:var(--text-secondary);margin-bottom:6px;">BENEFITS HUD</div>' +
    _brHudRow('PLAN', escHTML(planName || '')) +
    _brHudRow(
      'STATUS',
      '<span style="display:inline-block;background:' +
        c.badge +
        ';color:' +
        (c.badgeFg || '#fff') +
        ';font-size:10px;font-weight:700;letter-spacing:0.04em;padding:2px 8px;border-radius:999px;">' +
        brStatusBadgeIcon(status) +
        escHTML(status) +
        '</span>'
    ) +
    _brHudRow('FACT', '<span style="color:' + c.text + ';">' + escHTML(fact).replace(/\n/g, '<br>') + '</span>') +
    _brHudRow('SAY THIS', sayBlock) +
    _brHudRow('SOURCE', sourceHud) +
    '</div>';
  brAddMsg('ai', html);
}

function brAIAnswer(query, planId) {
  console.log('[CHA BR] build=local-first-v2');

  var plan = null;
  if (typeof POLICY_DOCS !== 'undefined') {
    for (var i = 0; i < POLICY_DOCS.length; i++) {
      if (POLICY_DOCS[i].id === planId) { plan = POLICY_DOCS[i]; break; }
    }
  }
  if (!plan) { brAddMsg('ai', 'Please select a plan first.'); return; }

  // ── TIER 1: Local deterministic lookup from POLICY_DOCS ──
  var local = null;
  try { local = brLocalLookup(query, plan); } catch (e) {
    console.warn('[CHA BR] local lookup threw, falling through:', e);
  }

  var localStatusUpper = local && local.status ? String(local.status).toUpperCase().trim() : '';
  var trustedLocalStatuses = ['COVERED', 'NOT COVERED', 'INFO', 'PARTIAL', 'DISCOUNT'];
  var isTrustedLocal = local && local.confident &&
    trustedLocalStatuses.indexOf(localStatusUpper) !== -1;
  if (isTrustedLocal) {
    console.log('[CHA BR] Local lookup confident:', local.status, '— using POLICY_DOCS answer');
    try {
      brHideTyping();
    } catch (e) {}

    var lines = String(local.data || '')
      .split('\n')
      .filter(function (l) {
        return l.trim().length > 3;
      });
    if (lines.length > 3) lines = lines.slice(0, 3);
    var factText = lines.join('\n');
    // eslint-disable-next-line no-useless-assignment
    var sayText = '';
    if (lines.length > 0) {
      var firstLine = lines[0].split('—')[0].split(':');
      sayText =
        firstLine.length > 1 ? firstLine[1].trim() : firstLine[0].trim();
      if (sayText.length > 60) sayText = sayText.substring(0, 57) + '...';
    } else {
      sayText = 'Check the plan document for details.';
    }

    var statusForPayload = localStatusUpper;
    if (statusForPayload === 'DISCOUNT') statusForPayload = 'PARTIAL';

    brRenderServerAnswer(
      {
        status: statusForPayload,
        fact: factText,
        sayThis: sayText,
        source: local.source || (plan.source || 'Plan document'),
        scope: 'policy_docs',
        requestId: 'local_' + Date.now()
      },
      plan.name,
      plan.source || ''
    );

    var _brI = document.getElementById('br-input');
    if (_brI) {
      _brI.disabled = false;
      _brI.focus();
    }
    var _brS = document.getElementById('br-send');
    if (_brS) _brS.disabled = false;

    var _brM = document.getElementById('br-msgs');
    if (_brM) _brM.scrollTop = _brM.scrollHeight;

    return;
  }

  // ── TIER 2: Server RAG fallback (/api/br-answer) ──
  console.log('[CHA RAG] Local not confident, calling /api/br-answer for plan:', planId, 'query:', query);
  brShowTyping();
  brServerAnswer(query, plan.id)
    .catch(function (err) {
      console.warn('[CHA RAG] First attempt failed, retrying once:', err.message);
      return brServerAnswer(query, plan.id);
    })
    .then(function (payload) {
      brHideTyping();
      brRenderServerAnswer(payload, plan.name, plan.source || '');
    })
    .catch(function (err) {
      brHideTyping();
      console.warn('[CHA RAG] API failed after retry — showing VERIFY:', err.message);
      brRenderServerAnswer(
        {
          status: 'VERIFY',
          fact: 'Could not reach the benefits server. Try again in a moment.',
          sayThis: 'Hang on—let me pull the exact plan language.',
          source: 'CHA Command Center',
          scope: 'none',
          requestId: ''
        },
        plan.name,
        plan.source || ''
      );
    });
}

function brShowSetupModal() {
  var existing = document.getElementById('br-setup-modal');
  if (existing) {
    existing.remove();
  }
  var currentKey =
    typeof chaGroqKeyString === 'function' ? chaGroqKeyString() : '';
  var hasKey = currentKey && currentKey !== 'skip' && currentKey !== '';
  var modal = document.createElement('div');
  modal.id = 'br-setup-modal';
  modal.style.cssText =
    'position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;';
  modal.innerHTML =
    '<div style="background:var(--bg-surface);border-radius:16px;padding:28px;width:320px;box-shadow:0 20px 60px rgba(0,0,0,0.3);">' +
    '<div style="font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">' +
    (hasKey ? 'AI Settings' : 'Enable AI Answers') +
    '</div>' +
    (hasKey
      ? '<div style="font-size:12px;color:#16a34a;margin-bottom:12px;">✓ AI is active</div>'
      : '') +
    '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:16px;line-height:1.6;">' +
    (hasKey
      ? 'Update or reset your Groq API key.'
      : 'Enter your free Groq API key for AI-powered answers.<br>Get one at <a href="https://console.groq.com" target="_blank" style="color:#5175f1;">console.groq.com</a>') +
    '</div>' +
    '<input id="br-api-input" type="password" placeholder="gsk_..." value="' +
    (hasKey ? currentKey : '') +
    '" style="width:100%;padding:10px 12px;border:1px solid var(--border-light, var(--border-default));border-radius:8px;font-size:13px;margin-bottom:12px;box-sizing:border-box;" />' +
    '<div style="display:flex;gap:8px;">' +
    '<button onclick="brSaveApiKey()" style="flex:1;padding:10px;background:#5175f1;color:white;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;">Save Key</button>' +
    '<button onclick="brSkipSetup()" style="padding:10px 16px;background:var(--bg-surface);color:var(--text-secondary);border:1px solid var(--border-light, var(--border-default));border-radius:8px;font-size:13px;cursor:pointer;">Skip</button>' +
    '</div>' +
    '<button onclick="brTestConnection()" style="width:100%;margin-top:8px;padding:10px;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;border-radius:8px;font-size:13px;cursor:pointer;">Test Connection</button>' +
    (hasKey
      ? '<button onclick="brResetApiKey()" style="width:100%;margin-top:8px;padding:8px;background:var(--bg-surface);color:#ef4444;border:1px solid #fecaca;border-radius:8px;font-size:12px;cursor:pointer;">Reset AI Key</button>'
      : '') +
    '<div style="font-size:10px;color:var(--text-tertiary);margin-top:10px;text-align:center;">Saved locally only</div></div>';
  document.body.appendChild(modal);
}
function brResetApiKey() {
  if (typeof chaRemove === 'function') {
    chaRemove('cha_groq_key');
  } else {
    localStorage.removeItem('cha_groq_key');
  }
  var modal = document.getElementById('br-setup-modal');
  if (modal) modal.remove();
  brShowSetupModal();
}
function brTestConnection() {
  var apiKey =
    typeof chaGroqKeyString === 'function' ? chaGroqKeyString() : '';
  if (!apiKey || apiKey === 'skip') {
    alert('No API key saved. Please enter your Groq key first.');
    return;
  }
  var testBtn = document.querySelector('[onclick="brTestConnection()"]');
  if (testBtn) testBtn.textContent = 'Testing...';
  fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Say OK' }]
    })
  })
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      if (data.choices && data.choices[0]) {
        if (testBtn) testBtn.textContent = 'Connection OK ✓';
        if (testBtn) testBtn.style.background = '#dcfce7';
        alert('Groq AI connected successfully! AI answers are now active.');
      } else {
        if (testBtn) testBtn.textContent = 'Test Failed';
        alert('Connected but got unexpected response: ' + JSON.stringify(data));
      }
    })
    .catch(function (err) {
      if (testBtn) testBtn.textContent = 'Connection Failed';
      if (testBtn) testBtn.style.background = 'var(--cha-danger-bg)';
      if (testBtn) testBtn.style.color = '#dc2626';
      alert(
        'Connection failed: ' +
          err.message +
          '. Check your API key or browser console.'
      );
    });
}
function brSaveApiKey() {
  var input = document.getElementById('br-api-input');
  if (!input || !input.value.trim()) return;
  if (typeof chaSet === 'function') {
    chaSet('cha_groq_key', input.value.trim());
  } else {
    localStorage.setItem('cha_groq_key', input.value.trim());
  }
  var modal = document.getElementById('br-setup-modal');
  if (modal) modal.style.display = 'none';
  brAddMsg('ai', 'AI mode enabled! Select a plan and ask anything.');
}
function brSkipSetup() {
  if (typeof chaSet === 'function') {
    chaSet('cha_groq_key', 'skip');
  } else {
    localStorage.setItem('cha_groq_key', 'skip');
  }
  var modal = document.getElementById('br-setup-modal');
  if (modal) modal.style.display = 'none';
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

  // Benefits Reference always uses /api/br-answer (server RAG). Client Groq key is not required for this panel.
  if (brActivePlan) {
    brAIAnswer(query, brActivePlan.id);
  } else {
    brAddMsg('ai', '<div style="color:var(--text-secondary)">Please select a plan first.</div>');
  }

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
  specialist: ['specialty', 'specialist visit', 'specialist care', 'special doctor'],
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
  surgery: ['surgical', 'operation', 'procedure', 'outpatient surgery', 'inpatient surgery'],
  ambulance: ['transport', 'ems'],
  copay: ['copays', 'co-pay', 'co pay', 'copay amount', 'cost', 'how much', 'fee', 'charge', 'office cost'],
  'primary care': ['pcp', 'doctor visit', 'office visit', 'physician visit', 'gp'],
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

  // Rx queries: pull ALL items from the matching category for completeness
  var _isRxQuery = /prescription|rx|\bdrug|pharmacy/i.test(topic);
  var _rxCategoryPulled = false;

  // Search benefits
  planDoc.benefits.forEach(function (bcat) {
    // For Rx queries, if the category itself matches, pull every item
    if (_isRxQuery && !_rxCategoryPulled) {
      var _catMatch = false;
      for (var ci = 0; ci < searchTerms.length; ci++) {
        var _cre = new RegExp(
          '\\b' + searchTerms[ci].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b',
          'i'
        );
        if (_cre.test(bcat.category)) { _catMatch = true; break; }
      }
      if (_catMatch) {
        _rxCategoryPulled = true;
        bcat.items.forEach(function (item) {
          if (
            /\bNOT covered\b|\bNOT COVERED\b/i.test(item) &&
            !/discount|savings|negotiated/i.test(item)
          ) {
            exclusionHits.push(item);
          } else {
            benefitHits.push(item);
          }
        });
        return; // skip per-item matching for this category
      }
    }
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
  var _maxBenefits = _isRxQuery ? 10 : 3;
  var status, items;
  if (benefitHits.length > 0 && exclusionHits.length === 0) {
    status = 'Covered';
    items = benefitHits.slice(0, _maxBenefits);
  } else if (exclusionHits.length > 0 && benefitHits.length === 0) {
    status = 'Not Covered';
    items = exclusionHits.slice(0, 2);
  } else if (benefitHits.length > 0 && exclusionHits.length > 0) {
    status = 'Covered';
    items = benefitHits.slice(0, _maxBenefits).concat(['⚠ ' + exclusionHits[0]]);
  } else if (waitingHits.length > 0) {
    status = 'Verify';
    items = waitingHits.slice(0, 4);
  } else {
    status = 'Verify';
    items = [];
  }

  // rawText fallback — only when structured data found nothing
  if (status === 'Verify' && items.length === 0 && planDoc.rawText) {
    var _rtSnippets = [];
    searchTerms.forEach(function (t) {
      var _ri = planDoc.rawText.toLowerCase().indexOf(t.toLowerCase());
      while (_ri !== -1 && _rtSnippets.length < 3) {
        var _start = Math.max(0, _ri - 40);
        var _end = Math.min(planDoc.rawText.length, _ri + t.length + 120);
        _rtSnippets.push('...' + planDoc.rawText.substring(_start, _end).replace(/\s+/g, ' ').trim() + '...');
        _ri = planDoc.rawText.toLowerCase().indexOf(t.toLowerCase(), _ri + t.length);
      }
    });
    if (_rtSnippets.length) {
      items = _rtSnippets;
    }
  }

  return { status: status, label: topic, items: items, source: planDoc.name };
}

// Special cases that need whole-plan answers (deductible, network, etc.)
function _brSpecialCase(topic, planDoc) {
  if (!planDoc) return null;
  var t = topic.toLowerCase();
  // Exclusions chip — show the top 5 most relevant limitations
  // from plan.limitations[], filter out generic / pre-ex-only entries,
  // and append a short "here is what IS covered" rebuttal line.
  if (/\bexclusion|\bnot covered|\bwhat.+not\b|\bno coverage/.test(t)) {
    var rawLims = (planDoc.limitations || []).slice();
    // Filter generic fluff and pre-ex-only lines
    var filteredLims = rawLims.filter(function (l) {
      if (!l || typeof l !== 'string') return false;
      var ll = l.toLowerCase();
      if (/does not cover services unless listed/.test(ll)) return false;
      if (/^\s*pre.?existing|12\s*\/\s*12|12-month.*exclusion/.test(ll))
        return false;
      return true;
    });
    // Rank: prefer items that clearly state an exclusion
    filteredLims.sort(function (a, b) {
      var ax = /not covered|excluded|no coverage|not included/i.test(a) ? 0 : 1;
      var bx = /not covered|excluded|no coverage|not included/i.test(b) ? 0 : 1;
      return ax - bx;
    });
    var topLims = filteredLims.slice(0, 5);
    // If nothing solid remains, return VERIFY instead of NOT COVERED
    if (!topLims.length) {
      return {
        status: 'Verify',
        label: 'Exclusions & Limitations',
        items: [
          'Plan limitations are not clearly spelled out in the reference data — verify with the carrier before quoting exclusions.'
        ],
        sayThis:
          'I want to verify the exclusions directly with the carrier before I tell you something incorrect.',
        source: planDoc.name
      };
    }
    // Pick a top benefit to use in the rebuttal line
    var topBenefitName = 'your core covered benefits';
    try {
      if (planDoc.benefits && planDoc.benefits.length) {
        var firstCat = planDoc.benefits[0];
        if (firstCat && firstCat.title) {
          topBenefitName = firstCat.title.toLowerCase();
        } else if (firstCat && firstCat.items && firstCat.items.length) {
          topBenefitName = 'doctor visits and core benefits';
        }
      }
    } catch (_e) {
      /* ignore */
    }
    var rebuttal =
      'This plan does cover ' +
      topBenefitName +
      '. Would you like me to walk you through what is included?';
    return {
      status: 'Not Covered',
      label: 'Exclusions & Limitations',
      items: topLims,
      sayThis: rebuttal,
      source: planDoc.name
    };
  }
  // X-ray / Labs / Imaging
  if (/\bx.?ray\b|\blab\b|\blabs\b|\bblood work\b|\bbloodwork\b|\bimaging\b|\bmri\b|\bct scan\b|\bradiology\b|\bdiagnostic\b/.test(t)) {
    var hasNetwork = !!(planDoc.network && /First Health|PHCS|MultiPlan/i.test(planDoc.network));
    var networkNote = hasNetwork
      ? 'Network discount available through ' + planDoc.network + ' — member pays negotiated rate at in-network facilities. Not a fixed insurance benefit.'
      : null;

    // Check if plan explicitly covers as a benefit
    var diagBenefitItems = [];
    planDoc.benefits.forEach(function(bcat) {
      bcat.items.forEach(function(item) {
        if (/x.?ray|lab|imaging|radiology|diagnostic|blood/i.test(item)) diagBenefitItems.push(item);
      });
    });

    // Check if plan explicitly excludes it
    var diagExcluded = false;
    planDoc.limitations.forEach(function(lim) {
      if (/x.?ray|lab|imaging|radiology|diagnostic/i.test(lim) && /not covered|excluded|no coverage/i.test(lim)) {
        diagExcluded = true;
      }
    });

    if (diagBenefitItems.length && !diagExcluded) {
      return { status: 'Covered', label: 'Diagnostic X-Ray & Labs', items: diagBenefitItems.slice(0,3), sayThis: diagBenefitItems[0], networkDiscount: networkNote, source: planDoc.name };
    }
    if (diagExcluded) {
      return { status: 'Not Covered', label: 'Diagnostic X-Ray & Labs', items: ['Diagnostic X-Ray and Labs are not listed as a covered benefit on this plan.'], sayThis: 'X-ray and lab work are not a covered benefit on this plan.', networkDiscount: networkNote, source: planDoc.name };
    }
    // Not explicitly covered or excluded — treat as not a fixed benefit
    if (hasNetwork) {
      return { status: 'Not Covered', label: 'Diagnostic X-Ray & Labs', items: ['Not a fixed covered benefit on this plan — no set dollar benefit for X-ray or labs.'], sayThis: 'X-ray and lab work are not a fixed covered benefit on this plan.', networkDiscount: networkNote, source: planDoc.name };
    }
    return { status: 'Verify', label: 'Diagnostic X-Ray & Labs', items: ['Not confirmed in plan documents — verify with carrier.'], source: planDoc.name };
  }
  // Copays chip — pull all copay/visit cost data from benefits
  if (/\bcopay|\bco-pay|\bco pay|\bhow much|copays for/.test(t)) {
    var copayItems = [];
    planDoc.benefits.forEach(function (bcat) {
      bcat.items.forEach(function (item) {
        if (/copay|\$\d+\s*(copay|per visit|\/visit)|visit.*\$|copay.*visit/i.test(item)) {
          copayItems.push(item);
        }
      });
    });
    if (!copayItems.length) {
      // fallback — grab all physician/visit benefit lines
      planDoc.benefits.forEach(function (bcat) {
        if (/physician|doctor|visit|office|urgent|specialist/i.test(bcat.category)) {
          copayItems = copayItems.concat(bcat.items.slice(0, 3));
        }
      });
    }
    if (copayItems.length) {
      return {
        status: 'Covered',
        label: 'Copays',
        items: copayItems.slice(0, 6),
        sayThis: copayItems[0],
        source: planDoc.name
      };
    }
  }
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
  if (/\btelemedicine\b|\btelehealth\b|\bvirtual\b/.test(t)) {
    var teleItems = [];
    planDoc.benefits.forEach(function (bcat) {
      if (/tele|virtual/i.test(bcat.category)) teleItems = teleItems.concat(bcat.items.slice(0, 3));
    });
    if (!teleItems.length) teleItems = ['Telemedicine included — $0 consultation fee. Available 24/7. Can prescribe most common medications.'];
    return { status: 'Covered', label: 'Telemedicine', items: teleItems, sayThis: '$0 telemedicine — available 24/7, they can prescribe most common medications right over the phone.', source: planDoc.name };
  }
  if (/\bmaternity\b|\bpregnancy\b|\bpregnant\b|\bprenatal\b/.test(t)) {
    return { status: 'Not Covered', label: 'Maternity / Pregnancy', items: ['Maternity, pregnancy, and prenatal care are NOT covered under this plan.'], sayThis: 'Maternity and pregnancy are not covered on this plan — that\'s an important disclosure I want to make sure is clear.', source: planDoc.name };
  }
  if (/\bmental health\b|\btherapy\b|\bcounseling\b|\bpsychiatry\b/.test(t)) {
    var mhItems = [];
    planDoc.benefits.forEach(function (bcat) {
      if (/mental|behavioral|therapy|counseling/i.test(bcat.category)) mhItems = mhItems.concat(bcat.items.slice(0, 3));
    });
    var mhExcluded = planDoc.limitations && planDoc.limitations.some(function(l){ return /mental|behavioral/i.test(l); });
    if (mhItems.length) return { status: 'Covered', label: 'Mental Health', items: mhItems, source: planDoc.name };
    if (mhExcluded) return { status: 'Not Covered', label: 'Mental Health', items: ['Mental health and behavioral health services are not covered on this plan.'], sayThis: 'Mental health coverage is not included on this plan — that\'s a disclosure I always share upfront.', source: planDoc.name };
    return { status: 'Verify', label: 'Mental Health', items: ['Mental health coverage varies by plan tier — verify with carrier before advising.'], source: planDoc.name };
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
    var preExText = planDoc.preEx || '12-month exclusion for conditions diagnosed/treated in prior 12 months';
    return {
      status: 'Covered',
      label: 'Pre-Existing Conditions',
      items: [preExText],
      sayThis: '12-month exclusion for conditions diagnosed or treated in the prior 12 months.',
      source: planDoc.name
    };
  }
  if (/\brx\b|\bprescription\b|\bmedication\b|\bdrug\b|\bmeds\b|\bpharmacy\b/.test(t)) {
    // Find Rx info from benefits categories
    var rxItems = [];
    planDoc.benefits.forEach(function (bcat) {
      if (/prescri|rx|pharm|medication|drug/i.test(bcat.category)) {
        rxItems = rxItems.concat(bcat.items);
      }
    });
    // Also grab Rx-related limitations
    var rxLimits = [];
    planDoc.limitations.forEach(function (lim) {
      if (/prescri|rx|pharm|medication|drug/i.test(lim)) {
        rxLimits.push(lim);
      }
    });
    if (rxItems.length > 0) {
      var isDiscount = rxItems.join(' ').toLowerCase().indexOf('discount') !== -1;
      var rxSayThis;
      if (planDoc.group === 'MEC') {
        rxSayThis = 'You have access to the BestChoiceRx discount card which you can use at major pharmacies for savings on prescriptions.';
      } else {
        rxSayThis = rxItems[0];
      }
      var combined = rxItems.slice(0, 3);
      if (rxLimits.length > 0) combined.push('⚠ ' + rxLimits[0]);
      return {
        status: isDiscount ? 'Discount' : 'Covered',
        label: 'Prescriptions / Rx',
        items: combined,
        sayThis: rxSayThis,
        source: planDoc.name
      };
    }
    if (rxLimits.length > 0) {
      return {
        status: 'Not Covered',
        label: 'Prescriptions / Rx',
        items: rxLimits.slice(0, 2),
        source: planDoc.name
      };
    }
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

  // Neutral info topics — override to 'Info' so no COVERED badge renders
  var _isInfoQuery =
    /waiting\s*period|pre[\s-]?existing|pre[\s-]?ex|network/i.test(cleaned);
  if (_isInfoQuery) {
    results.forEach(function (r) {
      if (r.status === 'Covered' || r.status === 'Verify') r.status = 'Info';
    });
  }

  // Determine overall status
  var covCount = 0,
    notCount = 0,
    verCount = 0,
    infoCount = 0;
  results.forEach(function (r) {
    if (r.status === 'Covered' || r.status === 'Discount') covCount++;
    else if (r.status === 'Not Covered') notCount++;
    else if (r.status === 'Info') infoCount++;
    else verCount++;
  });
  var overallStatus;
  if (results.length === 1) overallStatus = results[0].status;
  else if (infoCount === results.length) overallStatus = 'Info';
  else if (covCount > 0 && notCount > 0) overallStatus = 'Partial';
  else if (covCount > 0) overallStatus = 'Covered';
  else if (notCount > 0 && verCount === 0) overallStatus = 'Not Covered';
  else overallStatus = 'Verify';

  // ── BUILD HTML OUTPUT (status strip) ──
  var _sc = {
    Covered: {
      border: '#e2e8f0',
      bg: '#fff',
      badge: '#dcfce7',
      badgeText: '#15803d',
      icon: '✓'
    },
    'Not Covered': {
      border: '#e2e8f0',
      bg: '#fff',
      badge: 'var(--cha-danger-bg)',
      badgeText: '#dc2626',
      icon: '✗'
    },
    Verify: {
      border: '#e2e8f0',
      bg: '#fff',
      badge: '#fefce8',
      badgeText: '#a16207',
      icon: '⚠'
    },
    Partial: {
      border: '#e2e8f0',
      bg: '#fff',
      badge: '#eff6ff',
      badgeText: '#3b82f6',
      icon: '◐'
    },
    Discount: {
      border: '#e2e8f0',
      bg: '#fff',
      badge: '#f5f3ff',
      badgeText: '#7c3aed',
      icon: '%'
    },
    Info: {
      border: '#e2e8f0',
      bg: '#fff',
      badge: '#eff6ff',
      badgeText: '#5175f1',
      icon: 'ℹ'
    }
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
      '<span style="font-size:11px;font-weight:600;color:var(--text-secondary);">' +
      results.length +
      ' items found</span>';
    html +=
      '<span style="font-size:10px;color:var(--text-tertiary);">' +
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
    // Status row: plain header for Info, badge pill for everything else
    html +=
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">';
    if (r.status === 'Info') {
      html +=
        '<span style="font-size:14px;font-weight:600;color:#5175f1;">' +
        c.icon +
        ' ' +
        r.label.charAt(0).toUpperCase() +
        r.label.slice(1) +
        '</span>';
    } else {
      html +=
        '<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;background:' +
        c.badge +
        ';color:' +
        c.badgeText +
        ';font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;word-break:keep-all;">' +
        c.icon +
        ' ' +
        r.status +
        '</span>';
      html +=
        '<span style="font-size:14px;font-weight:600;color:var(--text-primary);">' +
        r.label.charAt(0).toUpperCase() +
        r.label.slice(1) +
        '</span>';
    }
    html += '</div>';
    // Divider
    html +=
      '<div style="height:1px;background:var(--border-light, var(--border-default));margin-bottom:8px;"></div>';
    // Data
    if (r.items.length) {
      r.items.forEach(function (item) {
        html +=
          '<div style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:2px;">• ' +
          item +
          '</div>';
      });
    } else {
      html +=
        '<div style="font-size:13px;color:var(--text-tertiary);line-height:1.6;">Not confirmed in plan documents. Confirm with carrier before quoting.</div>';
    }
    // SAY THIS section (for Covered/Discount/Not Covered with items)
    if ((r.status === 'Covered' || r.status === 'Discount') && r.items.length) {
      var sayText = r.sayThis || r.items[0];
      html +=
        '<div style="background:var(--bg-surface-raised);border-radius:8px;padding:8px 10px;margin-top:8px;">';
      html +=
        '<div style="font-size:9px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;white-space:nowrap;">SAY THIS →</div>';
      html +=
        '<div style="font-size:11px;color:var(--text-secondary);font-style:italic;line-height:1.5;word-break:normal;overflow-wrap:break-word;">"' +
        sayText +
        '"</div>';
      html += '</div>';
    } else if (r.status === 'Not Covered' && r.items.length) {
      html +=
        '<div style="background:var(--bg-surface-raised);border-radius:8px;padding:8px 10px;margin-top:8px;">';
      html +=
        '<div style="font-size:9px;font-weight:700;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;white-space:nowrap;">SAY THIS →</div>';
      html +=
        '<div style="font-size:13px;color:var(--text-primary);font-style:italic;line-height:1.5;word-break:normal;overflow-wrap:break-word;">"That benefit isn\'t included on this plan — let me show you what IS covered."</div>';
      html += '</div>';
    }
    // Network discount callout — shown on ANY status if result has networkDiscount set
    if (r.networkDiscount) {
      html += '<div style="background:#ecfdf5;border:1.5px solid #6ee7b7;border-radius:8px;padding:9px 12px;margin-top:8px;display:flex;gap:8px;align-items:flex-start;">';
      html += '<span style="font-size:14px;flex-shrink:0;">🔬</span>';
      html += '<div><div style="font-size:10px;font-weight:800;color:#065f46;letter-spacing:.8px;margin-bottom:3px;">NETWORK DISCOUNT AVAILABLE</div>';
      html += '<div style="font-size:12px;color:#065f46;font-weight:600;line-height:1.5;">' + r.networkDiscount + '</div></div></div>';
    }
    html += '</div>';
  });

  // Source
  html +=
    '<div style="font-size:10px;color:var(--text-tertiary);text-align:right;margin-top:2px;">Source: ' +
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
    '<div style="background:var(--bg-surface-raised);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #5175F1;border-radius:8px;padding:12px;">';
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

      var cat = (entry.category || '').toLowerCase();
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
      '<div style="font-size:12px;font-weight:800;color:var(--text-primary);margin-bottom:6px;">' +
      LI.file +
      ' ' +
      plan.name +
      '</div>';

    if (planMatches.benefits.length) {
      html +=
        '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #29A26A;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#15803D;margin-bottom:4px;">' +
        LI.check +
        ' &#9989; COVERED</div>';
      planMatches.benefits.forEach(function (b) {
        html +=
          '<div style="font-size:12px;color:var(--text-primary);margin-bottom:3px;padding-left:8px;border-left:2px solid #29A26A;">' +
          LI.dot +
          ' ' +
          brHl(b, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (planMatches.exclusions.length) {
      html +=
        '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #DC2626;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;">' +
        LI.ban +
        ' &#10060; NOT COVERED / LIMITED</div>';
      planMatches.exclusions.forEach(function (e) {
        html +=
          '<div style="font-size:12px;color:var(--text-primary);margin-bottom:3px;padding-left:8px;border-left:2px solid #DC2626;">' +
          LI.dot +
          ' ' +
          brHl(e, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (isWaiting && planMatches.waiting.length) {
      html +=
        '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #F59E0B;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#C2410C;margin-bottom:4px;">' +
        LI.clock +
        ' &#9203; WAITING PERIODS</div>';
      planMatches.waiting.forEach(function (w) {
        html +=
          '<div style="font-size:12px;color:var(--text-primary);margin-bottom:3px;">' +
          LI.dot +
          ' ' +
          brHl(w, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (isPreEx && planMatches.preex.length) {
      html +=
        '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #F59E0B;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#C2410C;margin-bottom:4px;">' +
        LI.warn +
        ' &#9888;&#65039; PRE-EXISTING CONDITIONS</div>';
      planMatches.preex.forEach(function (p) {
        html +=
          '<div style="font-size:12px;color:var(--text-primary);margin-bottom:3px;">' +
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
      '<div style="font-size:10px;color:var(--text-secondary);font-style:italic;margin-top:6px;padding-top:4px;border-top:1px dashed var(--border-light, var(--border-default));">⚠️ Always verify against the full Schedule of Benefits before confirming coverage to the prospect.</div>';

    html += '</div>';
  });

  if (!foundAnything) {
    html += '<div style="font-size:12px;color:var(--text-secondary);line-height:1.6;">';
    html +=
      '<div style="background:var(--bg-surface);border:1px solid var(--border-light, var(--border-default));border-left:3px solid #DC2626;border-radius:8px;padding:10px;margin-bottom:8px;">';
    html +=
      '<div style="font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;">' +
      LI.ban +
      ' NOT SPECIFICALLY LISTED</div>';
    html +=
      '<strong>"' +
      query.replace(/</g, '&lt;') +
      '"</strong> is not specifically listed in the Schedule of Benefits.</div>';
    html += '<div style="font-size:11px;color:var(--text-secondary);line-height:1.6;">';
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
      '<div style="font-size:10px;color:var(--text-tertiary);margin-top:6px;border-top:1px solid var(--border-light, var(--border-default));padding-top:6px;">Searched: ' +
      specificTerms.slice(0, 8).join(', ') +
      (specificTerms.length > 8 ? ' + more' : '') +
      '</div>';
  }

  html += '</div>';
  return html;
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

// ═══════════════════════════════════════════════════
// CHA BRAIN CHAT BOX (Live Playbook panel)
// Local-first conceptual router + KB search + optional Groq call.
// ES5 only (no async/await).
// ═══════════════════════════════════════════════════
var CHA_BRAIN_KEYWORDS = {
  spouse: 'objections',
  wife: 'objections',
  husband: 'objections',
  price: 'objections',
  expensive: 'objections',
  budget: 'objections',
  deductible: 'benefits',
  copay: 'benefits',
  coinsurance: 'benefits',
  network: 'benefits',
  premium: 'benefits',
  rx: 'benefits',
  compliance: 'compliance',
  disclosure: 'compliance',
  'red flag': 'compliance'
};

var CHA_BRAIN_PROMPT =
  'You are an elite Sales Assistant for CHA insurance agents. ' +
  'MAX 2 sentences. Never say I do not know. ' +
  'Use format: FACT: ... SAY THIS: ... ' +
  'If not found, use: DOCUMENTATION GAP: This detail is not in the official Summary of Benefits.';

var CHA_PDF_KNOWLEDGE_PROMPT = [
  'You are a CHA Sales assistant helping insurance agents. You have complete knowledge of all health insurance plans from the official plan documents.',
  '',
  'PLAN KNOWLEDGE (from official PDFs):',
  '',
  'TDK PLANS (MEC)',
  'Network: First Health | Underwriter: Detego Health | Customer Service: (866) 815-6001',
  'TDK 1: PCP $25 (3/yr), Specialist $50 (1/yr), Hospital $1,000/day ($5,000 max), ER: Not Covered, Telemedicine $0, Rx: MyLiveDoc formulary, No SSN required',
  'TDK 2: PCP $25 (4/yr), Specialist $50 (2/yr), Hospital $1,000/day ($10,000 max), ER: Not Covered, Telemedicine $0, Rx: MyLiveDoc formulary, No SSN required',
  'TDK 3: PCP $25 (4/yr), Specialist $50 (4/yr), Hospital $1,000/day ($15,000 max), ER: Not Covered, Telemedicine $0, Rx: MyLiveDoc formulary, No SSN required',
  'TDK 4: PCP $50 (4/yr), Specialist $75 (4/yr), Hospital $1,000/day ($10,000 max), ER $1,000/day if admitted, Surgery $1,000/day ($2,000 max), Ambulance $500, SSN REQUIRED',
  'TDK 5: PCP $50 (5/yr), Specialist $75 (5/yr), Hospital $1,500/day ($15,000 max), ER $1,500/day if admitted, Surgery $1,500/day ($4,500 max), Ambulance $500, SSN REQUIRED',
  '',
  'MEDFIRST PLANS (MEC)',
  'Network: First Health | Underwriter: MBA | Billing: FirstEnroll',
  'MedFirst 1: PCP $25 (3/yr), Specialist $50 (1/yr), Hospital $1,000/day ($5,000 max), ER: Not Covered, Rx: Discount only, No SSN',
  'MedFirst 2: PCP $25 (4/yr), Specialist $50 (2/yr), Hospital $1,000/day ($10,000 max), ER: Not Covered, Rx: Generic $0, Preferred $5, No SSN',
  'MedFirst 3: PCP $25 (4/yr), Specialist $50 (4/yr), Hospital $1,000/day ($15,000 max), ER: Not Covered, Rx: Generic $0, Preferred $5, Non-Pref $5-10, Brand $40, No SSN',
  'MedFirst 4: Wellness $25, PCP $50 (4/yr), Specialist $75 (4/yr), Hospital $1,000/day ($10,000 max), ER $1,000 if admitted, Surgery $1,000 ($2,000 max), Ambulance $500, Rx: Full formulary, SSN REQUIRED',
  'MedFirst 5: Wellness $25, PCP $50 (5/yr), Specialist $75 (5/yr), Hospital $1,500/day ($15,000 max), ER $1,500 if admitted, Surgery $1,500 ($4,500 max), Ambulance $500, Rx: Full formulary, SSN REQUIRED',
  '',
  'TRUEHEALTH PLANS (MEC)',
  'Network: First Health | Underwriter: MBA',
  'TrueHealth 1: PCP $25 (3/yr), Specialist $50 (1/yr), Hospital $1,000/day ($5,000 max), ER: Not Covered, Rx: Discount only',
  'TrueHealth 2: PCP $25 (4/yr), Specialist $50 (2/yr), Hospital $1,000/day ($10,000 max), ER: Not Covered, Rx: Generic $0, Preferred $5',
  'TrueHealth 3: PCP $25 (4/yr), Specialist $50 (4/yr), Hospital $1,000/day ($15,000 max), ER: Not Covered, Rx: Generic $0, Preferred $5, Non-Pref $5-10, Brand $40',
  '',
  'GOODHEALTH PLANS (MEC)',
  'Network: First Health | Underwriter: MBA | Association: Good Health Partners',
  'GoodHealth 1: PCP $25 (3/yr), Specialist $50 (1/yr), Hospital $1,000/day ($5,000 max), ER: Not Covered, Rx: Discount only',
  'GoodHealth 2: PCP $25 (4/yr), Specialist $50 (2/yr), Hospital $1,000/day ($10,000 max), ER: Not Covered, Rx: Generic $0, Preferred $5',
  'GoodHealth 3: PCP $25 (4/yr), Specialist $50 (4/yr), Hospital $1,000/day ($15,000 max), ER: Not Covered, Rx: Generic $0, Preferred $5, Non-Pref $5-10, Brand $40',
  'GoodHealth 4: Wellness $25, PCP $50 (4/yr), Specialist $75 (4/yr), Hospital $1,000/day ($10,000 max), ER $1,000 if admitted, Surgery $1,000 ($2,000 max), Ambulance $500, SSN REQUIRED',
  'GoodHealth 5: Wellness $25, PCP $50 (5/yr), Specialist $75 (5/yr), Hospital $1,500/day ($15,000 max), ER $1,500 if admitted, Surgery $1,500 ($4,500 max), Ambulance $500, SSN REQUIRED',
  '',
  'HARMONYCARE PLANS (Indemnity)',
  'Network: GapAfford Plus | Underwriter: Everest | Association: NCE | Guaranteed Issue',
  'HarmonyCare 100A: PCP $50 (3/yr), Specialist $50 (3/yr), Hospital $100/day (30 days), ER: Not Covered, Surgery: Not Covered',
  'HarmonyCare 100: PCP $50 (3/yr), Specialist $50 (3/yr), Hospital $100/day (30 days), ER $50 (1/yr), Accidental Death $10,000, Critical Illness $1,000',
  'HarmonyCare 200: PCP $50 (3/yr), Specialist $50 (5/yr), Hospital $200/day (30 days), ER $50 (1/yr), Surgery $400/day (3 days), Mental Health Inpatient $150/day (60 days), Mental Health Outpatient $50 (20/yr)',
  'HarmonyCare 200+: PCP $50 (5/yr), Specialist $50 (5/yr), Hospital $200/day (30 days), ER $50 (1/yr), Surgery $400/day (3 days), Accident Inpatient $500, Accident ER $250',
  'HarmonyCare 300: PCP $50 (5/yr), Specialist $50 (5/yr), Hospital $300/day (30 days), ER $50 (1/yr), Surgery $750/day (3 days), Accident Inpatient $500, Accident ER $250',
  'HarmonyCare 500: PCP $50 (5/yr), Specialist $50 (5/yr), Hospital $500/day (30 days), ER $50 (1/yr), Surgery $1,000/day (3 days), Pathology/Radiology $50 (2/yr)',
  'HarmonyCare 750: PCP $50 (5/yr), Specialist $50 (5/yr), Hospital $750/day (30 days), ER $75 (1/yr), Surgery $1,500/day (3 days)',
  'HarmonyCare 1000: PCP $75 (5/yr), Specialist $75 (5/yr), Hospital $1,000/day (30 days), ER $100 (1/yr), Surgery: Not Covered',
  '',
  'EVEREST PLANS (Indemnity)',
  'Network: MultiPlan | Underwriter: AFSLIC | Guaranteed Issue',
  'Everest 100: Hospital $100/day (30 days/confinement, 90/yr), ICU $100/day, ER $50 (2/yr), PCP $50 (3/yr)',
  'Everest 200: Hospital $200/day, ICU $200/day, ER $50 (2/yr), Labs $50 (4/yr), X-rays $50 (4/yr), PCP $50 (3/yr)',
  'Everest 200+: Hospital $200/day, Surgery $250/day (3 days), Anesthesia 25%, ER $50 (2/yr), PCP $50 (3/yr)',
  'Everest 300: Hospital $300/day, Surgery $250/day (3 days), Anesthesia 25%, ER $50 (2/yr), PCP $50 (3/yr)',
  '',
  'BWA AMERICARE PLANS (Indemnity)',
  'Network: PHCS (MultiPlan) | Underwriter: American Public Life | Association: BWA | Guaranteed Issue',
  'BWA Americare 2-4: PCP $25 pre-pay, Specialist $50 pre-pay, Urgent Care $25 pre-pay, Hospital: Network repricing via MBR, White Glove Advocacy included',
  '',
  'ACCESS HEALTH STM',
  'Network: PHCS | Underwriter: AFSLIC | Association: NCE | Medical Underwriting Required',
  'Deductible Options: $500, $1,000, $2,000, $2,500, $5,000, $7,500, $10,000',
  'Coinsurance: 80/20, Limit: $2,000 or $4,000',
  'Coverage Max: $250,000, $500,000, $1,000,000',
  'PCP: $15-$25, Specialist: $25-$40, Wellness: $50 (1/yr)',
  'Waiting Period: 5 days sickness, 30 days cancer',
  'Pre-Ex: Not covered (waiver rider available)',
  'Length: Up to 36 months',
  '',
  'SMARTHEALTH STM',
  'Network: PHCS | Underwriter: Standard Life and Casualty | Medical Underwriting Required',
  'Deductible Options: $500, $1,000, $2,000, $2,500, $5,000, $7,500, $10,000',
  'Coinsurance: 80/20',
  'Facility Charges: 150% Medicare allowable',
  'Waiting Period: 5 days sickness, 30 days cancer',
  'Pre-Ex: Not covered (waiver rider available)',
  'RightWay Healthcare advocacy included',
  '',
  'PINNACLE STM',
  'Network: PHCS | Underwriter: Everest | Association: AWA | Medical Underwriting Required',
  'Deductible Options: $1,000, $2,500, $5,000, $7,500, $10,000',
  'Coinsurance: 80/20, 70/30, or 50/50',
  'Coverage Max: $250,000, $500,000, $1,000,000, $2,000,000',
  'Waiting Period: 5 days sickness, 30 days cancer',
  'Next day coverage available',
  'Length: 6 or 364 days, renewable up to 36 months',
  '',
  'SMARTCHOICE PLANS (Limited Medical)',
  'Network: First Health EPO | Underwriter: Detego Health | Medical Underwriting Required',
  'SmartChoice 1500: Deductible $1,500/$3,000, Max OOP $9,200/$18,400',
  'SmartChoice 2500: Deductible $2,500/$5,000, Max OOP $9,200/$18,400',
  'SmartChoice 3000: Deductible $3,000/$6,000, Max OOP $9,200/$18,400',
  'SmartChoice 3500: Deductible $3,500/$7,000, Max OOP $9,200/$18,400',
  '',
  'UNIVERSAL RULES (ALL PLANS)',
  '- Pre-Existing Condition: 12/12 rule',
  '- Waiting Period: 30 days for sickness, immediate for accidents',
  '- NOT Covered: Maternity, Mental Health (most plans), Substance Abuse',
  '- Telemedicine: $0 copay with MyLiveDoc or First Health',
  '- Rx Card: GoodRx discount included',
  '- Cancellation: 30-day written notice required',
  '',
  'PRESCRIPTION TIERS (MEC Plans with Rx)',
  '- Generic: $0 copay',
  '- Preferred Generic: $5 copay',
  '- Non-Preferred Generic: $5-$10 copay (retail) / $5-$20 (mail)',
  '- Brand (Prior Auth Required): $40 retail / $80 mail order',
  '- Monthly benefit limit: $150/person for non-preventive drugs',
  '- Specialty drugs: Not covered (PAP available for income-qualified)',
  '',
  'COMMON SERVICES NOT COVERED',
  '- Cancer treatment (covered after 30-day waiting period on STM only)',
  '- Infusions (not typically covered on MEC/Indemnity)',
  '- Chemotherapy (limited coverage on some Indemnity plans)',
  '- Dialysis (not covered)',
  '- Organ transplants (not covered)',
  '- Weight loss surgery (not covered)',
  '- Cosmetic procedures (not covered)',
  '',
  'RESPONSE RULES:',
  '1. Give SHORT, DIRECT answers',
  '2. Always state the plan name first',
  '3. Include copay amounts and visit limits',
  '4. If something is NOT covered, say so clearly',
  '5. If unsure, say: "I recommend checking the plan document for that specific detail."',
  '6. Format with bold for plan names and key numbers'
].join('\n');

function _chaGetPlanContext() {
  var p = window.activePlan;
  if (!p || !p.name) {
    return 'Active Plan Context: None selected. Answer across all known plans.';
  }
  return (
    'Active Plan Context: ' +
    p.name +
    ' (' +
    (p.type || 'unknown') +
    '). Prioritize this plan first, then compare if asked.'
  );
}

function detectScope(query) {
  var q = String(query || '').toLowerCase();
  var keys = Object.keys(CHA_BRAIN_KEYWORDS);
  for (var i = 0; i < keys.length; i++) {
    if (q.indexOf(keys[i]) !== -1) return CHA_BRAIN_KEYWORDS[keys[i]];
  }
  return 'benefits';
}

function checkConceptualRouter(query) {
  if (typeof KNOWLEDGE_BASE === 'undefined' || !KNOWLEDGE_BASE.conceptual) return null;
  var q = String(query || '').toLowerCase();
  if (q.indexOf('er') !== -1 && (q.indexOf('urgent') !== -1 || q.indexOf('uc') !== -1)) {
    return { answer: KNOWLEDGE_BASE.conceptual.erVsUrgent, scope: 'benefits' };
  }
  if (q.indexOf('what') !== -1 && q.indexOf('premium') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.whatIsPremium, scope: 'vocabulary' };
  if (q.indexOf('what') !== -1 && q.indexOf('deductible') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.whatIsDeductible, scope: 'vocabulary' };
  if (q.indexOf('what') !== -1 && q.indexOf('coinsurance') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.whatIsCoinsurance, scope: 'vocabulary' };
  if (q.indexOf('what') !== -1 && q.indexOf('copay') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.whatIsCopay, scope: 'vocabulary' };
  if (q.indexOf('out of pocket') !== -1 || q.indexOf('oop') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.whatIsOOP, scope: 'vocabulary' };
  if (q.indexOf('mec') !== -1 && q.indexOf('stm') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.mecVsStm, scope: 'plans' };
  if (q.indexOf('difference') !== -1 && (q.indexOf('mec') !== -1 || q.indexOf('stm') !== -1)) return { answer: KNOWLEDGE_BASE.conceptual.mecVsStm, scope: 'plans' };
  if (q.indexOf('pre-existing') !== -1 || q.indexOf('preexisting') !== -1 || q.indexOf('12/12') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.preExisting, scope: 'compliance' };
  if (q.indexOf('prescription') !== -1 || q.indexOf(' rx') !== -1 || q.indexOf('medication') !== -1) return { answer: KNOWLEDGE_BASE.conceptual.rx, scope: 'benefits' };
  return null;
}

function searchKnowledgeBase(query) {
  var q = String(query || '').toLowerCase();
  var out = [];
  if (typeof KNOWLEDGE_BASE === 'undefined') return out;
  var planNames = KNOWLEDGE_BASE.plans ? Object.keys(KNOWLEDGE_BASE.plans) : [];
  for (var i = 0; i < planNames.length; i++) {
    var pn = planNames[i];
    var pdata = KNOWLEDGE_BASE.plans[pn];
    var pstr = JSON.stringify(pdata).toLowerCase();
    if (pn.toLowerCase().indexOf(q) !== -1 || pstr.indexOf(q) !== -1) {
      out.push({ source: pn, data: pdata, type: 'plan' });
    }
  }
  var terms = KNOWLEDGE_BASE.vocabulary ? Object.keys(KNOWLEDGE_BASE.vocabulary) : [];
  for (var j = 0; j < terms.length; j++) {
    if (q.indexOf(terms[j]) !== -1) out.push({ source: terms[j], data: KNOWLEDGE_BASE.vocabulary[terms[j]], type: 'vocabulary' });
  }
  var obs = KNOWLEDGE_BASE.objections ? Object.keys(KNOWLEDGE_BASE.objections) : [];
  for (var k = 0; k < obs.length; k++) {
    if (q.indexOf(obs[k]) !== -1) out.push({ source: obs[k], data: KNOWLEDGE_BASE.objections[obs[k]], type: 'objection' });
  }
  return out;
}

function _chaIsDebugBadgeEnabled() {
  try {
    var p = new URLSearchParams(window.location.search || '');
    var q = (p.get('debug') || '').toLowerCase();
    if (q === 'true' || q === '1' || q === 'yes') return true;
    var stored = '';
    if (typeof chaGet === 'function') {
      stored = chaGet('cha_debug_chat_badge', '');
    } else {
      stored = localStorage.getItem('cha_debug_chat_badge') || '';
    }
    return (
      stored === true ||
      stored === 'true' ||
      stored === '1' ||
      stored === 1
    );
  } catch (_e) {
    return false;
  }
}

function _chaDebugBadgeHtml(meta) {
  if (!_chaIsDebugBadgeEnabled() || !meta) return '';
  var planName = escHTML(meta.planName || 'Unknown plan');
  var matchCount = Number(meta.matchCount || 0);
  var sourceFile = escHTML(meta.sourceFile || 'Unknown source');
  return (
    '<div style="margin-top:6px;font-size:11px;color:#6b7280;background:var(--bg-surface-muted);border:1px solid var(--border-light, var(--border-default));border-radius:999px;padding:3px 8px;display:inline-block;">' +
    '📎 ' + planName + ' | ' + matchCount + ' matches | ' + sourceFile +
    '</div>'
  );
}

function formatResponse(content, scope, debugMeta) {
  return (
    '<div class="ai-response">' +
    '<div class="response-content">' + content + '</div>' +
    _chaDebugBadgeHtml(debugMeta) +
    '<div class="source-tag">[Source: ' + scope + ' knowledge base]</div>' +
    '</div>'
  );
}

function _chaPlanListPreview(maxCount) {
  var rt = window.CHA_PDF_KNOWLEDGE_RUNTIME;
  if (!rt || typeof rt.listAvailablePlanNames !== 'function') return 'Plan index unavailable.';
  var names = rt.listAvailablePlanNames();
  var safeLimit = maxCount || 10;
  if (!names.length) return 'No plan documents are currently available.';
  if (names.length <= safeLimit) return names.join(', ');
  return names.slice(0, safeLimit).join(', ') + ', and ' + (names.length - safeLimit) + ' more.';
}

function _chaBuildGroundedPrompt(planMeta, topChunks) {
  var excerpts = [];
  for (var i = 0; i < topChunks.length; i++) {
    excerpts.push('[Excerpt ' + (i + 1) + '] ' + topChunks[i].text);
  }
  return [
    'You are a CHA plan document assistant for live agent questions.',
    'Read the provided plan PDF excerpts and answer the specific question clearly.',
    'Use ONLY the provided excerpts. Do not use outside knowledge, assumptions, or prior context.',
    'Return a short, clean answer with exact numbers from the document.',
    'Do NOT paste raw OCR/extracted text blocks.',
    'Do NOT repeat excerpt labels like "[Excerpt 1]" in the final answer.',
    'Preferred output style: "MedFirst 1 PCP Copay: $25, 3 visits/year".',
    'If multiple values are needed, use 1-3 concise bullet lines.',
    'Preserve exact amounts, limits, visit counts, percentages, and conditions from excerpts.',
    'If the detail is not explicitly in excerpts, respond exactly with:',
    '"That specific detail is not in the ' + planMeta.planName + ' document."',
    '',
    'Plan Name: ' + planMeta.planName,
    'Plan Files: ' + (planMeta.pdfFiles || []).join(', '),
    '',
    'EXCERPTS:',
    excerpts.join('\n\n')
  ].join('\n');
}

function _chaBrainScroll() {
  var chat = document.getElementById('chat-messages');
  if (chat) chat.scrollTop = chat.scrollHeight;
}

function handleChatMessage(userMessage) {
  var chatContainer = document.getElementById('chat-messages');
  if (!chatContainer) return;
  var clean = String(userMessage || '').trim();
  if (!clean) return;
  chatContainer.innerHTML += '<div class="user-message">' + escHTML(clean) + '</div>';

  var scope = 'plan documents';
  chatContainer.innerHTML +=
    '<div class="ai-message"><div class="response-content">Searching plan documents...</div></div>';
  _chaBrainScroll();

  var sharedKey =
    (typeof _aiGroqFallbackKey !== 'undefined' && _aiGroqFallbackKey) ||
    (typeof chaGroqKeyString === 'function' ? chaGroqKeyString() : '') ||
    '';
  if (!sharedKey || sharedKey === 'skip' || sharedKey.length < 20) {
    chatContainer.innerHTML +=
      '<div class="ai-message">' +
      formatResponse(
        'Groq API key not found. Configure `window.GROQ_API_KEY` or set `GROQ_API_KEY` in Vercel for `/api/groq-key`.',
        scope
      ) +
      '</div>';
    _chaBrainScroll();
    return;
  }
  var runtime = window.CHA_PDF_KNOWLEDGE_RUNTIME;
  if (!runtime) {
    chatContainer.innerHTML +=
      '<div class="ai-message">' +
      formatResponse('Plan PDF runtime is not loaded.', scope) +
      '</div>';
    _chaBrainScroll();
    return;
  }

  var resolution = runtime.resolvePlan(clean, window.activePlan || null);
  if (resolution.status === 'no_plan') {
    var hasPlanLikeWords = /(plan|medfirst|truehealth|goodhealth|smart|harmony|everest|bwa|allstate|pinnacle|sigma|mychoice|galena|access)/i.test(clean);
    chatContainer.innerHTML +=
      '<div class="ai-message">' +
      formatResponse(
        hasPlanLikeWords
          ? 'I do not have that plan. Available plans include: ' + _chaPlanListPreview(12)
          : 'Which plan are you asking about?',
        scope
      ) +
      '</div>';
    _chaBrainScroll();
    return;
  }
  if (resolution.status === 'ambiguous') {
    chatContainer.innerHTML +=
      '<div class="ai-message">' +
      formatResponse(
        'I found multiple matching plans. Please name one specific plan.',
        scope
      ) +
      '</div>';
    _chaBrainScroll();
    return;
  }

  var planMeta = runtime.getPlanMeta(resolution.planId);
  if (!planMeta) {
    chatContainer.innerHTML +=
      '<div class="ai-message">' +
      formatResponse(
        'I do not have that plan. Available plans include: ' + _chaPlanListPreview(12),
        scope
      ) +
      '</div>';
    _chaBrainScroll();
    return;
  }
  if (planMeta.status === 'excluded' || planMeta.status === 'missing_pdf') {
    chatContainer.innerHTML +=
      '<div class="ai-message">' +
      formatResponse(
        'That plan document is not loaded yet for ' + planMeta.planName + '.',
        scope
      ) +
      '</div>';
    _chaBrainScroll();
    return;
  }

  runtime
    .loadPlanContent(planMeta.planId)
    .then(function (planPayload) {
      var topChunks = runtime.retrieveTopChunks(planPayload, clean, 8);
      if (!topChunks.length) {
        return {
          fallback:
            'That specific detail is not in the ' + planMeta.planName + ' document.',
          topChunks: []
        };
      }
      var systemPrompt = _chaBuildGroundedPrompt(planMeta, topChunks);
      return fetch((window.GROQ_API_URL || CHA_GROQ_ENDPOINT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sharedKey
        },
        body: JSON.stringify({
          model: 'llama-3.1-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Agent question: ' + clean }
          ],
          max_tokens: 450,
          temperature: 0
        })
      })
        .then(function (r) {
          if (!r.ok) throw new Error('API error ' + r.status);
          return r.json();
        })
        .then(function (data) {
          return { data: data, topChunks: topChunks };
        });
    })
    .then(function (result) {
      // eslint-disable-next-line no-useless-assignment
      var msg = '';
      var debugMeta = {
        planName: planMeta.planName || '',
        matchCount: 0,
        sourceFile:
          planMeta && planMeta.pdfFiles && planMeta.pdfFiles.length
            ? planMeta.pdfFiles[0]
            : ''
      };
      if (result && result.fallback) {
        msg = result.fallback;
      } else {
        var data = result && result.data;
        var rawMsg =
          data && data.choices && data.choices[0] && data.choices[0].message
            ? String(data.choices[0].message.content || '').trim()
            : '';
        if (!rawMsg) {
          msg =
            'That specific detail is not in the ' + planMeta.planName + ' document.';
        } else {
          msg = rawMsg;
        }
      }
      if (result && result.topChunks && result.topChunks.length) {
        debugMeta.matchCount = result.topChunks.length;
      }
      chatContainer.innerHTML +=
        '<div class="ai-message">' + formatResponse(escHTML(msg), scope, debugMeta) + '</div>';
      _chaBrainScroll();
    })
    .catch(function () {
      chatContainer.innerHTML +=
        '<div class="ai-message">' +
        formatResponse(
          'Sorry, I could not process that question. Please try again.',
          scope
        ) +
        '</div>';
      _chaBrainScroll();
    });
}

function initBrainChatBox() {
  var chatInput = document.getElementById('chat-input');
  var sendBtn = document.getElementById('send-btn');
  if (sendBtn && !sendBtn.dataset.chaBound) {
    sendBtn.dataset.chaBound = '1';
    sendBtn.addEventListener('click', function () {
      if (!chatInput) return;
      var msg = chatInput.value.trim();
      if (msg) {
        handleChatMessage(msg);
        chatInput.value = '';
      }
    });
  }
  if (chatInput && !chatInput.dataset.chaBound) {
    chatInput.dataset.chaBound = '1';
    chatInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        var msg = chatInput.value.trim();
        if (msg) {
          handleChatMessage(msg);
          chatInput.value = '';
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBrainChatBox);
} else {
  setTimeout(initBrainChatBox, 0);
}

// Unhide chat for testing via ?showchat=1 (must run after css/styles.css hide rule; uses !important)
if (window.location.search.indexOf('showchat=1') !== -1) {
  window.addEventListener('DOMContentLoaded', function () {
    var el = document.querySelectorAll('#br-toggle,#br-panel');
    for (var i = 0; i < el.length; i++) {
      el[i].style.setProperty('display', 'block', 'important');
    }
  });
  // Fallback if DOMContentLoaded already fired (e.g. script at end of body)
  var el2 = document.querySelectorAll('#br-toggle,#br-panel');
  for (var j = 0; j < el2.length; j++) {
    el2[j].style.setProperty('display', 'block', 'important');
  }
}
