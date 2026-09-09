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
var brResolvedPlanId = null;
var brResolvedPlanName = null;
var _brPendingQuery = '';
var _brPendingIntentId = null;
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


function brBindPanelChrome() {
  var row = document.getElementById('br-intent-row');
  if (row && !row.getAttribute('data-br-bound')) {
    row.setAttribute('data-br-bound', '1');
    row.addEventListener('click', function (e) {
      var el = e.target;
      while (el && el !== row) {
        var intentId = el.getAttribute && el.getAttribute('data-intent');
        if (intentId) {
          brOnIntentClick(intentId);
          return;
        }
        el = el.parentNode;
      }
    });
  }
  var msgs = document.getElementById('br-msgs');
  if (msgs && !msgs.getAttribute('data-br-cand-bound')) {
    msgs.setAttribute('data-br-cand-bound', '1');
    msgs.addEventListener('click', function (e) {
      var el = e.target;
      while (el && el !== msgs) {
        var planId = el.getAttribute && el.getAttribute('data-plan-id');
        if (planId) {
          brOnCandidateClick(
            planId,
            el.getAttribute('data-plan-name') || planId
          );
          return;
        }
        el = el.parentNode;
      }
    });
  }
}

function brInit() {
  if (_brInitDone) return;
  _brInitDone = true;
  brBindPanelChrome();

  var filterBar = document.getElementById('br-filter-bar');
  var planBar = document.getElementById('br-plan-bar');
  if (!filterBar || !planBar) {
    if (typeof buildSearchIndex === 'function') {
      buildSearchIndex();
    }
    brShowWelcome();
    var _initKeyEarly =
      typeof chaGroqKeyString === 'function' ? chaGroqKeyString() : '';
    _brSetStatus(
      _initKeyEarly && _initKeyEarly !== 'skip' && _initKeyEarly.length > 20
        ? 'ai'
        : 'local'
    );
    return;
  }

  if (typeof POLICY_DOCS === 'undefined' || !POLICY_DOCS.length) return;

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
  var html = '<div style="text-align:center;padding:16px 8px 8px;">';
  if (brResolvedPlanName) {
    html +=
      '<div style="display:inline-flex;align-items:center;gap:6px;background:var(--bg-surface-muted);border:1px solid var(--border-light, var(--border-default));border-radius:999px;padding:5px 14px;margin-bottom:12px;">';
    html +=
      '<span style="font-size:12px;font-weight:700;color:var(--text-primary);">' +
      escHTML(brResolvedPlanName) +
      '</span>';
    html += '</div>';
  }
  html +=
    '<div style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:14px;">Name the plan, then use the buttons below or type a question. Copays, exclusions, pre-ex, and waiting periods are separate lookups.</div>';
  html += '</div>';

  brAddMsg('ai', html);
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

  var sayBlock = '';
  if (sayThis) {
    sayBlock =
      '<div style="background:var(--bg-surface-raised);border-radius:8px;padding:8px 10px;margin-top:4px;">' +
      '<div style="font-size:12px;font-style:italic;color:var(--text-secondary);">' +
      escHTML(sayThis).replace(/\n/g, '<br>') +
      '</div></div>';
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



var _brSendLock = false;

function brIsVsAnswerable(vs) {
  return (
    vs === 'VERIFIED' ||
    vs === 'VERIFIED_SINGLE_SOURCE' ||
    vs === 'VERIFIED_MULTI_SOURCE'
  );
}

function brLeafSourceLabel(leaf, planName) {
  var bits = [];
  if (leaf && leaf.sec) bits.push(String(leaf.sec));
  if (leaf && leaf.pg != null && leaf.pg !== '') bits.push('p.' + leaf.pg);
  if (leaf && leaf.src != null && leaf.src !== '') bits.push('src ' + leaf.src);
  if (!bits.length) return planName || '';
  return bits.join(' | ');
}

function brAskWhichPlan() {
  brAddMsg(
    'ai',
    '<div style="color:var(--text-secondary);font-size:13px;">Which plan? Type the plan name so the matching profile can be loaded. Do not guess.</div>'
  );
}

function brRenderCandidates(candidates) {
  var html =
    '<div style="color:var(--text-secondary);font-size:13px;margin-bottom:8px;">Several plans match. Pick one:</div>';
  var i;
  var c;
  var list = candidates || [];
  for (i = 0; i < list.length; i++) {
    c = list[i];
    html +=
      '<button type="button" class="br-plan-candidate" data-plan-id="' +
      escHTML(c.planId) +
      '" data-plan-name="' +
      escHTML(c.displayName || c.planId) +
      '">' +
      escHTML(c.displayName || c.planId) +
      '</button>';
  }
  brAddMsg('ai', html);
}

function brRenderIntentLeaves(profile, intent, planName) {
  var keys = intent.keys || [];
  var i;
  var keyPath;
  var leaf;
  var answerable;
  var factLines = [];
  var sourceParts = [];
  var answerableCount = 0;
  var srcLabel;
  var dns;
  var n;
  for (i = 0; i < keys.length; i++) {
    keyPath = keys[i];
    leaf =
      typeof window.brReadLeaf === 'function'
        ? window.brReadLeaf(profile, keyPath)
        : null;
    answerable = !!(leaf && brIsVsAnswerable(leaf.vs));
    if (answerable) {
      answerableCount += 1;
      factLines.push(keyPath + ': ' + String(leaf.v));
      srcLabel = brLeafSourceLabel(leaf, '');
      if (srcLabel) sourceParts.push(srcLabel);
    } else {
      factLines.push(keyPath + ': NOT CONFIRMED');
    }
  }
  n = 0;
  dns = profile && profile.do_not_say;
  if (dns && dns.length) {
    for (i = 0; i < dns.length; i++) {
      if (dns[i]) n += 1;
    }
  }
  factLines.push('Do-not-say rules on file for this plan: ' + n);
  brRenderServerAnswer(
    {
      status: answerableCount === keys.length && keys.length > 0 ? 'INFO' : 'VERIFY',
      fact: factLines.join('\n'),
      sayThis: '',
      source: sourceParts.length ? sourceParts.join(' | ') : planName || '',
      requestId: ''
    },
    planName,
    ''
  );
}

function brAnswerWithProfile(planId, planName, query, intentId) {
  if (typeof window.brLoadProfile !== 'function') {
    brAddMsg(
      'ai',
      '<div style="color:var(--text-secondary);font-size:13px;">Profile loader is not available.</div>'
    );
    return;
  }
  window.brLoadProfile(planId).then(function (profile) {
    if (!profile) {
      brRenderServerAnswer(
        {
          status: 'VERIFY',
          fact: 'NOT CONFIRMED. No held document confirms this. The carrier document is needed.',
          sayThis: 'I need the carrier document before I can answer that.',
          source: planName || planId || '',
          requestId: ''
        },
        planName || planId,
        ''
      );
      return;
    }
    brResolvedPlanId = profile.plan_id || planId;
    if (profile.display_name) brResolvedPlanName = profile.display_name;

    var intent = null;
    if (intentId && typeof window.brGetIntent === 'function') {
      intent = window.brGetIntent(intentId);
    } else if (query && typeof window.brMatchIntent === 'function') {
      intent = window.brMatchIntent(query);
    }

    var name = brResolvedPlanName || planName || planId;
    if (!intent) {
      brShowTyping();
      brServerAnswer(query, brResolvedPlanId)
        .catch(function (err) {
          console.warn('[CHA RAG] First attempt failed, retrying once:', err.message);
          return brServerAnswer(query, brResolvedPlanId);
        })
        .then(function (payload) {
          brHideTyping();
          brRenderServerAnswer(payload, name, '');
        })
        .catch(function (err) {
          brHideTyping();
          console.warn('[CHA RAG] API failed after retry - showing VERIFY:', err.message);
          brRenderServerAnswer(
            {
              status: 'VERIFY',
              fact: 'Could not reach the benefits server. Try again in a moment.',
              sayThis: 'Hang on - let me pull the exact plan language.',
              source: 'CHA Command Center',
              scope: 'none',
              requestId: ''
            },
            name,
            ''
          );
        });
      return;
    }

    brRenderIntentLeaves(profile, intent, name);
  });
}

function brOnIntentClick(intentId) {
  var intent =
    typeof window.brGetIntent === 'function' ? window.brGetIntent(intentId) : null;
  var label = intent && intent.label ? intent.label : intentId;
  brAddMsg('user', escHTML(label));
  if (!brResolvedPlanId) {
    _brPendingIntentId = intentId;
    _brPendingQuery = '';
    brAskWhichPlan();
    return;
  }
  brAnswerWithProfile(brResolvedPlanId, brResolvedPlanName, '', intentId);
}

function brOnCandidateClick(planId, planName) {
  brResolvedPlanId = planId;
  brResolvedPlanName = planName;
  var q = _brPendingQuery;
  var intentId = _brPendingIntentId;
  _brPendingQuery = '';
  _brPendingIntentId = null;
  brAnswerWithProfile(planId, planName, q, intentId);
}

function brTokenizePlanQuery(raw) {
  if (raw == null) return [];
  var s = String(raw);
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  s = s.replace(/\+/g, ' plus ');
  s = s.replace(/(\d),(?=\d)/g, '$1');
  s = s.toLowerCase();
  s = s.replace(/([a-z])([0-9])/g, '$1 $2');
  s = s.replace(/([0-9])([a-z])/g, '$1 $2');
  s = s.replace(/[^a-z0-9]+/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  if (!s) return [];
  return s.split(' ');
}

function brQueryIsPlanNameOnly(query, planId, displayName) {
  var q = brTokenizePlanQuery(query);
  if (!q.length) return false;
  var consumed = {};
  var names = [planId, displayName];
  var i;
  var j;
  var toks;
  for (i = 0; i < names.length; i++) {
    toks = brTokenizePlanQuery(names[i]);
    for (j = 0; j < toks.length; j++) consumed[toks[j]] = true;
  }
  for (i = 0; i < q.length; i++) {
    if (!consumed[q[i]]) return false;
  }
  return true;
}

function brConfirmResolvedPlan(planId) {
  if (typeof window.brLoadProfile !== 'function') {
    brRenderPlanConfirmation(null, planId);
    return;
  }
  window.brLoadProfile(planId).then(function (profile) {
    brRenderPlanConfirmation(profile, planId);
  });
}

function brRenderPlanConfirmation(profile, planId) {
  var name = planId;
  var completeness = 'unknown';
  var confidence = 'unknown';
  brResolvedPlanId = planId;
  if (profile) {
    brResolvedPlanId = profile.plan_id || planId;
    if (profile.display_name) {
      name = profile.display_name;
      brResolvedPlanName = profile.display_name;
    } else {
      brResolvedPlanName = brResolvedPlanId;
    }
    if (profile.doc_completeness != null && profile.doc_completeness !== '') {
      completeness = String(profile.doc_completeness);
    }
    if (profile.profile_confidence != null && profile.profile_confidence !== '') {
      confidence = String(profile.profile_confidence);
    }
  } else {
    brResolvedPlanName = planId;
  }
  brAddMsg(
    'ai',
    '<div style="color:var(--text-secondary);font-size:13px;line-height:1.6;">' +
      '<div style="font-weight:700;color:var(--text-primary);margin-bottom:6px;">' +
      escHTML(name) +
      '</div>' +
      '<div>Document completeness: ' +
      escHTML(completeness) +
      '</div>' +
      '<div>Profile confidence: ' +
      escHTML(confidence) +
      '</div>' +
      '<div style="margin-top:6px;">Ask a question or use the buttons.</div>' +
      '</div>'
  );
}

function brSend() {
  if (_brSendLock) return;
  var inp = document.getElementById('br-input');
  if (!inp) return;
  var query = inp.value.trim();
  if (!query) return;
  _brSendLock = true;
  setTimeout(function () {
    _brSendLock = false;
  }, 300);

  inp.value = '';
  inp.style.height = 'auto';
  var sendBtn = document.getElementById('br-send');
  if (sendBtn) sendBtn.disabled = true;

  brAddMsg('user', escHTML(query));

  function afterMatch(match) {
    if (!match) match = { status: 'NONE' };
    if (match.status === 'EXACT') {
      brResolvedPlanId = match.planId;
      var intentId = _brPendingIntentId;
      _brPendingIntentId = null;
      var intentFromQuery =
        query && typeof window.brMatchIntent === 'function'
          ? window.brMatchIntent(query)
          : null;
      if (intentId || intentFromQuery) {
        brAnswerWithProfile(match.planId, match.planId, query, intentId);
      } else if (typeof window.brLoadProfile === 'function') {
        window.brLoadProfile(match.planId).then(function (profile) {
          var id = (profile && profile.plan_id) || match.planId;
          var display = (profile && profile.display_name) || match.planId;
          if (brQueryIsPlanNameOnly(query, id, display)) {
            brRenderPlanConfirmation(profile, match.planId);
          } else {
            brAnswerWithProfile(match.planId, match.planId, query, null);
          }
        });
      } else if (brQueryIsPlanNameOnly(query, match.planId, match.planId)) {
        brConfirmResolvedPlan(match.planId);
      } else {
        brAnswerWithProfile(match.planId, match.planId, query, null);
      }
    } else if (match.status === 'AMBIGUOUS') {
      _brPendingQuery = query;
      brRenderCandidates(match.candidates || []);
    } else if (brResolvedPlanId) {
      brAnswerWithProfile(brResolvedPlanId, brResolvedPlanName, query, _brPendingIntentId);
      _brPendingIntentId = null;
    } else {
      brAskWhichPlan();
    }
    if (sendBtn) sendBtn.disabled = false;
    if (inp) inp.focus();
  }

  function runMatch() {
    var match = { status: 'NONE' };
    if (typeof window.brMatchPlan === 'function') {
      match = window.brMatchPlan(query);
    }
    afterMatch(match);
  }

  if (typeof window.brLoadPlanAliases === 'function') {
    window.brLoadPlanAliases().then(runMatch).catch(runMatch);
  } else {
    runMatch();
  }
}


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

// Unhide chat for testing via ?showchat=1 (html.cha-chat-enabled wins on specificity)
if (window.location.search.indexOf('showchat=1') !== -1) {
  document.documentElement.classList.add('cha-chat-enabled');
}
