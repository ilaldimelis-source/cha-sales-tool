// policy-docs.js — render and toggle functions for plan cards
// Requires: js/plan-data.js loaded first (provides POLICY_DOCS global)

// ── RENDER: POLICY BENEFITS REFERENCE ──────────────────────────
var policyDocFilter = 'All';
var policyDocSearch = '';
var policyDocOpen = null;
var _pdSearchTimer;

function _pdIsDisplayablePlan(p) {
  if (!p) return false;
  var id = String(p.id || '').toLowerCase();
  var type = String(p.type || '').toLowerCase();
  var carrier = String(p.carrier || '').trim();
  var network = String(p.network || '').trim();
  if (!String(p.name || '').trim()) return false;
  if (id.indexOf('kb-') === 0) return false;
  if (type === 'knowledge base pdf') return false;
  // Raw PDF rows use placeholder metadata like "— · —".
  if (carrier === '—' && network === '—') return false;
  return true;
}

function _pdFindSalesPlan(doc) {
  if (typeof PLANS === 'undefined') return null;
  for (var i = 0; i < PLANS.length; i++) {
    if (
      doc.name.indexOf(PLANS[i].name.split(' ')[0]) !== -1 ||
      PLANS[i].name.indexOf(doc.name.split(' ')[0]) !== -1
    ) {
      if (PLANS[i].group === doc.group) return PLANS[i];
    }
  }
  return null;
}

var policyDocSelected = '';

var PD_SCRIPT_BY_ID = {
  goodhealth13: 'TrueHealth / MedFirst / GoodHealth 1,2,3',
  goodhealth45: 'MedFirst / GoodHealth 4,5',
  tdk13: 'TDK 1,2,3',
  tdk45: 'TDK 4,5',
  smartchoice: 'NEO Smart Choice',
  pinnacle: 'NEO Pinnacle STM Traditional',
  accesshealth: 'Access Health STM',
  harmonycare: 'Everest / HarmonyCare / SigmaCare',
  sigmacare: 'Everest / HarmonyCare / SigmaCare',
  everest: 'Everest / HarmonyCare / SigmaCare',
  bwapara: 'BWA Paramount 1-6',
  bwaamericare: 'BWA Americare 2,3,4',
  healthchoicesilver: 'Health Choice Silver',
  harborstmessential: 'Harbor STM Essential',
  harborstmaccess: 'Harbor STM Access',
  harborstmsecure: 'Harbor STM Secure',
  goodlifewbchoice:
    'Goodlife Partners WB Choice and WB Select (Match Doctor visits to Plan)',
  goodlifewbselect:
    'Goodlife Partners WB Choice and WB Select (Match Doctor visits to Plan)',
  pinnacleprotect: 'Pinnacle Protect Plan 1-4'
};

var PD_GROUPS = [
  { key: 'MEC', label: 'MEC' },
  { key: 'STM', label: 'Short-term medical' },
  { key: 'Limited', label: 'Limited benefit' }
];

var PD_FACT_SLOTS = [
  { label: 'Plan type', vault: 'type' },
  { label: 'Network', vault: 'network', paths: ['identity.network'] },
  { label: 'Deductible', paths: ['cost_sharing.deductible'] },
  { label: 'Coinsurance', paths: ['cost_sharing.coinsurance'] },
  {
    label: 'Coinsurance out-of-pocket maximum',
    paths: ['cost_sharing.moop']
  },
  {
    label: 'Coverage period maximum',
    paths: ['cost_sharing.term_max', 'unmapped.cost_sharing.coverage_maximum']
  },
  { label: 'Primary care', paths: ['benefits.pcp'] },
  { label: 'Specialist', paths: ['benefits.specialist'] },
  { label: 'Urgent care', paths: ['benefits.urgent_care'] },
  {
    label: 'Underwriter',
    vault: 'carrier',
    paths: ['identity.underwriter', 'identity.carrier']
  },
  { label: 'Plan administrator', paths: ['identity.administrator'] },
  { label: 'Billing administrator', paths: ['identity.billing_entity'] },
  {
    label: 'Claims administrator',
    paths: ['administration.claims_administrator']
  },
  { label: 'Association', vault: 'assoc', paths: ['identity.association'] },
  { label: 'State availability', paths: ['availability.states'] },
  { label: 'Coverage term', paths: ['administration.term_length'] },
  { label: 'Age limit', paths: ['eligibility.age_max'] },
  { label: 'Pre-certification', paths: ['administration.precert'] }
];

function _pdHasFact(value) {
  if (value == null) return false;
  var text = String(value).replace(/^\s+|\s+$/g, '');
  if (!text) return false;
  if (text === '-' || text === '\u2014' || text === '\u2013') return false;
  return true;
}

function _pdFilteredPlans() {
  return POLICY_DOCS.filter(function (p) {
    if (!_pdIsDisplayablePlan(p)) return false;
    var groupOk = policyDocFilter === 'All' || p.group === policyDocFilter;
    if (!groupOk) return false;
    if (!policyDocSearch.trim()) return true;
    var q = policyDocSearch.toLowerCase();
    var expandedTerms = expandSearchSynonyms(q);
    var searchable = (
      p.name +
      ' ' +
      p.type +
      ' ' +
      p.carrier +
      ' ' +
      p.network +
      ' ' +
      p.planNotes +
      ' ' +
      p.limitations.join(' ') +
      ' ' +
      p.benefits
        .map(function (b) {
          return b.category + ' ' + b.items.join(' ');
        })
        .join(' ') +
      ' ' +
      (p.preEx || '') +
      ' ' +
      (p.waitingPeriods || []).join(' ')
    ).toLowerCase();
    var t;
    for (t = 0; t < expandedTerms.length; t++) {
      if (brTermMatch(searchable, expandedTerms[t])) return true;
    }
    return false;
  });
}

function _pdFindPlan(id) {
  var i;
  for (i = 0; i < POLICY_DOCS.length; i++) {
    if (POLICY_DOCS[i].id === id) return POLICY_DOCS[i];
  }
  return null;
}

function _pdScriptIndex(plan) {
  if (!plan || typeof PLAN_SCRIPTS === 'undefined') return -1;
  var wanted = PD_SCRIPT_BY_ID[plan.id] || '';
  var i;
  if (wanted) {
    for (i = 0; i < PLAN_SCRIPTS.length; i++) {
      if (PLAN_SCRIPTS[i].name === wanted) return i;
    }
    return -1;
  }
  var name = String(plan.name || '');
  var hits = [];
  for (i = 0; i < PLAN_SCRIPTS.length; i++) {
    var sn = PLAN_SCRIPTS[i].name;
    if (sn === name || sn.indexOf(name) !== -1) hits.push(i);
  }
  if (hits.length === 1) return hits[0];
  return -1;
}

function _pdDocLabel(code) {
  if (code === 'FULL_DOCS') return 'Complete';
  if (code === 'PARTIAL_DOCS') return 'Partial';
  if (code === 'PORTAL_ONLY') return 'Portal only';
  if (code === 'SOB_ONLY') return 'Summary only';
  if (code === 'NO_CURRENT_SOURCE') return 'No current source';
  if (code === 'STATUS_UNCERTAIN') return 'Uncertain';
  return '';
}

function _pdLeafNode(profile, path) {
  var leaf = null;
  if (profile && typeof brReadLeaf === 'function') {
    leaf = brReadLeaf(profile, path);
  }
  if (leaf) return leaf;
  if (!profile || path !== 'unmapped.cost_sharing.coverage_maximum')
    return null;
  var bucket = profile.unmapped;
  if (!bucket) return null;
  var node = bucket['cost_sharing.coverage_maximum'];
  if (!node || typeof node !== 'object') return null;
  return {
    v: node.v === undefined ? null : node.v,
    vs: node.vs === undefined ? null : node.vs
  };
}

function _pdVerifiedLeaf(profile, path) {
  var leaf = _pdLeafNode(profile, path);
  if (!leaf) return '';
  if (leaf.vs !== 'VERIFIED' && leaf.vs !== 'VERIFIED_SINGLE_SOURCE') return '';
  if (!_pdHasFact(leaf.v)) return '';
  return String(leaf.v);
}

function _pdSlotValue(plan, profile, slot) {
  var i;
  var text;
  if (profile && slot.paths) {
    for (i = 0; i < slot.paths.length; i++) {
      text = _pdVerifiedLeaf(profile, slot.paths[i]);
      if (text) return text;
    }
  }
  if (slot.vault && plan && _pdHasFact(plan[slot.vault])) {
    return String(plan[slot.vault]);
  }
  return '';
}

function _pdFactsInner(plan, profile) {
  var html = '';
  var i;
  var text;
  for (i = 0; i < PD_FACT_SLOTS.length; i++) {
    text = _pdSlotValue(plan, profile, PD_FACT_SLOTS[i]);
    if (!text) continue;
    html +=
      '<div class="pv-fact"><dt>' +
      escHTML(PD_FACT_SLOTS[i].label) +
      '</dt><dd>' +
      escHTML(text) +
      '</dd></div>';
  }
  return html;
}

function _pdAliasHasId(rows, planId) {
  var i;
  if (!rows || !planId) return false;
  for (i = 0; i < rows.length; i++) {
    if (rows[i] && rows[i].plan_id === planId) return true;
  }
  return false;
}

function _pdProfileId(plan, rows) {
  var match;
  if (!plan || typeof brMatchPlan !== 'function') return '';
  match = brMatchPlan(plan.name);
  if (!match || match.status !== 'EXACT' || !match.planId) return '';
  if (_pdAliasHasId(rows, match.planId)) return match.planId;
  return '';
}

function _pdApplyProfile(plan, profile) {
  var facts = document.getElementById('pv-facts');
  var badge = document.getElementById('pv-doc-badge');
  var label;
  if (policyDocSelected !== plan.id) return;
  if (facts) facts.innerHTML = _pdFactsInner(plan, profile);
  if (!badge) return;
  label = profile ? _pdDocLabel(profile.doc_completeness) : '';
  if (!label) {
    badge.innerHTML = '';
    return;
  }
  badge.innerHTML = '<span class="pv-doc-badge">' + escHTML(label) + '</span>';
}

function _pdFillDocBadge(plan) {
  if (!plan) return;
  if (
    typeof brLoadPlanAliases !== 'function' ||
    typeof brMatchPlan !== 'function' ||
    typeof brLoadProfile !== 'function'
  ) {
    return;
  }
  var requested = plan.id;
  brLoadPlanAliases()
    .then(function (rows) {
      var profileId;
      if (policyDocSelected !== requested) return null;
      profileId = _pdProfileId(plan, rows || []);
      if (!profileId) return null;
      return brLoadProfile(profileId);
    })
    .then(function (profile) {
      if (policyDocSelected !== requested) return;
      if (!profile) return;
      _pdApplyProfile(plan, profile);
    })
    .catch(function () {});
}

function _pdDetailHtml(plan) {
  if (!plan) {
    return '<p class="pv-status">No plan is selected.</p>';
  }
  var scriptIndex = _pdScriptIndex(plan);
  var hasDoc = _pdHasFact(plan.source);
  var html =
    '<button type="button" class="pv-back" data-pv-back="1">Back to list</button>';
  html += '<div class="pv-detail-top"><div>';
  html += '<h2 class="pv-detail-name">' + escHTML(plan.name) + '</h2>';
  html += '<div class="pv-badges">';
  html +=
    '<span class="pv-badge pv-badge-' +
    escHTML(plan.group) +
    '">' +
    escHTML(plan.group) +
    '</span>';
  html += '</div></div>';
  html += '<div class="pv-actions">';
  if (hasDoc) {
    html +=
      '<a class="pv-action" href="' +
      escHTML(chaKnowledgeBaseUrl(plan.source)) +
      '" target="_blank" rel="noopener noreferrer">Brochure</a>';
  } else {
    html +=
      '<button type="button" class="pv-action" disabled>Brochure</button>';
  }
  if (scriptIndex >= 0) {
    html +=
      '<button type="button" class="pv-action" data-pv-script="' +
      scriptIndex +
      '">Open script</button>';
  } else {
    html +=
      '<button type="button" class="pv-action" disabled>Open script</button>';
  }
  html += '</div></div>';
  html += '<dl class="pv-facts" id="pv-facts">';
  html += _pdFactsInner(plan, null);
  html += '</dl>';
  html += '<div id="pv-doc-badge" class="pv-doc-slot"></div>';
  return html;
}

function _pdListHtml(plans) {
  var html = '';
  var g;
  var i;
  for (g = 0; g < PD_GROUPS.length; g++) {
    var groupPlans = [];
    for (i = 0; i < plans.length; i++) {
      if (plans[i].group === PD_GROUPS[g].key) groupPlans.push(plans[i]);
    }
    if (!groupPlans.length) continue;
    html +=
      '<section class="pv-group" data-plan-group="' + PD_GROUPS[g].key + '">';
    html +=
      '<h2 class="pv-divider"><span>' +
      escHTML(PD_GROUPS[g].label) +
      '</span><span class="pv-count">' +
      groupPlans.length +
      '</span></h2>';
    for (i = 0; i < groupPlans.length; i++) {
      var plan = groupPlans[i];
      var selected = plan.id === policyDocSelected ? ' pv-row-selected' : '';
      html +=
        '<button type="button" class="pv-row' +
        selected +
        '" id="pd-' +
        escHTML(plan.id) +
        '" data-pv-id="' +
        escHTML(plan.id) +
        '"><span class="pv-row-name">' +
        escHTML(plan.name) +
        '</span></button>';
    }
    html += '</section>';
  }
  return html;
}

function _pdMarkSelection() {
  var rows = document.querySelectorAll('#pv-list .pv-row');
  var i;
  for (i = 0; i < rows.length; i++) {
    var on = rows[i].getAttribute('data-pv-id') === policyDocSelected;
    if (on) {
      if (rows[i].className.indexOf('pv-row-selected') === -1) {
        rows[i].className += ' pv-row-selected';
      }
    } else {
      rows[i].className = rows[i].className
        .replace(' pv-row-selected', '')
        .replace('pv-row-selected', '');
    }
  }
}

function _pdShowDetail(openMobile) {
  var pane = document.getElementById('pv-detail');
  var page = document.querySelector('#page-policydocs .pv-page');
  var plan = _pdFindPlan(policyDocSelected);
  if (pane) pane.innerHTML = _pdDetailHtml(plan);
  _pdMarkSelection();
  _pdFillDocBadge(plan);
  if (plan && typeof setActivePlan === 'function') {
    setActivePlan(plan.id, plan.name, plan.group || plan.type || '');
  }
  if (!page) return;
  if (openMobile && window.matchMedia('(max-width: 900px)').matches) {
    if (page.className.indexOf('pv-show-detail') === -1) {
      page.className += ' pv-show-detail';
    }
  }
}

function renderPolicydocs() {
  try {
    return _renderPolicydocsInner();
  } catch (e) {
    var pg =
      document.getElementById('page-policydocs') ||
      document.getElementById('page-allplans');
    if (pg)
      pg.innerHTML =
        '<div style="padding:24px;color:#B91C1C;">Plans failed to load. Please refresh the page (Ctrl+Shift+R).</div>';
  }
}
function _renderPolicydocsInner() {
  var html = '<div class="pv-page">';
  html += '<header class="pv-header"><h2 class="pv-title">Plan Vault</h2>';
  html +=
    '<p class="pv-lead">Find the right plan for every client.</p></header>';
  html += '<div class="stabs pv-filters">';
  ['All', 'MEC', 'STM', 'Limited'].forEach(function (f) {
    html +=
      '<button type="button" class="stab' +
      (f === policyDocFilter ? ' active' : '') +
      '" data-pv-filter="' +
      f +
      '">' +
      (f === 'All' ? 'All' : f) +
      '</button>';
  });
  html += '</div>';
  html += '<div class="pv-search-wrap">';
  html +=
    '<input type="text" id="pdSearchInput" class="pv-search" placeholder="Search plans, benefits, exclusions..." value="' +
    escHTML(policyDocSearch) +
    '" aria-label="Search plans, benefits, exclusions">';
  html +=
    '<button id="pdSearchClear" type="button" class="pv-search-clear" aria-label="Clear plan search"' +
    (policyDocSearch ? '' : ' style="display:none"') +
    '>&times;</button>';
  html += '</div>';
  html += '<div class="pv-split">';
  html += '<div id="pv-list" class="pv-list" aria-label="Plan list"></div>';
  html += '<div id="pv-detail" class="pv-detail" aria-live="polite"></div>';
  html += '</div>';
  html += '<div id="pdResultsContainer" class="pv-results-host"></div>';
  html += '</div>';

  var _page_policydocs =
    document.getElementById('page-policydocs') ||
    document.getElementById('page-allplans');
  if (_page_policydocs) _page_policydocs.innerHTML = html;
  _pdBindKeys();
  renderPolicyResults();
}

function policyDocSearchTyping(val) {
  policyDocSearch = val;
  policyDocOpen = null;
  var clearBtn = document.getElementById('pdSearchClear');
  if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
  clearTimeout(_pdSearchTimer);
  _pdSearchTimer = setTimeout(function () {
    renderPolicyResults();
  }, 100);
}

function clearPdSearch() {
  policyDocSearch = '';
  policyDocOpen = null;
  var input = document.getElementById('pdSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  var clearBtn = document.getElementById('pdSearchClear');
  if (clearBtn) clearBtn.style.display = 'none';
  renderPolicyResults();
}

function policyDocFilterChanged() {
  policyDocOpen = null;
  var tabs = document.querySelectorAll(
    '#page-policydocs .stab, #page-allplans .stab'
  );
  var filters = ['All', 'MEC', 'STM', 'Limited'];
  tabs.forEach(function (tab, i) {
    if (filters[i] === policyDocFilter) tab.classList.add('active');
    else tab.classList.remove('active');
  });
  renderPolicyResults();
}

function renderPolicyResults() {
  var list = document.getElementById('pv-list');
  var pane = document.getElementById('pv-detail');
  var host = document.getElementById('pdResultsContainer');
  if (!list || !pane) {
    if (host) host.innerHTML = '';
    return;
  }
  var page = document.querySelector('#page-policydocs .pv-page');
  if (page) {
    page.className = page.className
      .replace(' pv-show-detail', '')
      .replace('pv-show-detail', '');
  }
  var plans = _pdFilteredPlans();
  if (!plans.length) {
    policyDocSelected = '';
    list.innerHTML = '<p class="pv-status">No plans match your search.</p>';
    pane.innerHTML = '<p class="pv-status">No plan is selected.</p>';
    return;
  }
  var keep = null;
  var i;
  if (policyDocOpen) {
    for (i = 0; i < plans.length; i++) {
      if (plans[i].id === policyDocOpen) keep = plans[i];
    }
  }
  var selected = keep || plans[0];
  policyDocSelected = selected.id;
  policyDocOpen = selected.id;
  list.innerHTML = _pdListHtml(plans);
  pane.innerHTML = _pdDetailHtml(selected);
  _pdFillDocBadge(selected);
}

function policyDocToggle(id) {
  policyDocOpen = id;
  policyDocSelected = id;
  var container = document.getElementById('pv-list');
  if (container) _pdShowDetail(true);
  else renderPolicyResults();
}

function _pdBindKeys() {
  var root =
    document.getElementById('page-policydocs') ||
    document.getElementById('page-allplans');
  if (!root || root.getAttribute('data-pv-bound')) return;
  root.setAttribute('data-pv-bound', '1');
  root.addEventListener('click', _pdOnClick);
  root.addEventListener('keydown', _pdOnKey);
  root.addEventListener('input', function (event) {
    if (event.target && event.target.id === 'pdSearchInput') {
      policyDocSearchTyping(event.target.value);
    }
  });
}

function _pdOnClick(event) {
  var node = event.target;
  while (node && node !== event.currentTarget) {
    if (node.getAttribute && node.getAttribute('data-pv-back') === '1') {
      var page = document.querySelector('#page-policydocs .pv-page');
      if (page) {
        page.className = page.className
          .replace(' pv-show-detail', '')
          .replace('pv-show-detail', '');
      }
      return;
    }
    if (node.getAttribute && node.getAttribute('data-pv-filter')) {
      policyDocFilter = node.getAttribute('data-pv-filter');
      policyDocFilterChanged();
      return;
    }
    if (node.id === 'pdSearchClear') {
      clearPdSearch();
      return;
    }
    if (node.getAttribute && node.getAttribute('data-pv-script') != null) {
      var index = parseInt(node.getAttribute('data-pv-script'), 10);
      if (!isNaN(index)) {
        planScriptFilter = 'All';
        planScriptActive = index;
        planScriptSection = 0;
        if (typeof _showComboPage === 'function') {
          _showComboPage('scripts', 'planscripts');
        }
      }
      return;
    }
    if (
      node.tagName === 'BUTTON' &&
      node.getAttribute('data-pv-id') &&
      node.className.indexOf('pv-row') !== -1
    ) {
      policyDocSelected = node.getAttribute('data-pv-id');
      policyDocOpen = policyDocSelected;
      _pdShowDetail(true);
      return;
    }
    node = node.parentNode;
  }
}

function _pdOnKey(event) {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  var list = document.getElementById('pv-list');
  if (!list || !list.contains(event.target)) return;
  var rows = list.querySelectorAll('button.pv-row');
  var index = -1;
  var i;
  for (i = 0; i < rows.length; i++) {
    if (rows[i] === document.activeElement) index = i;
  }
  if (index < 0) return;
  var next = event.key === 'ArrowDown' ? index + 1 : index - 1;
  if (next < 0 || next >= rows.length) return;
  event.preventDefault();
  rows[next].focus();
  policyDocSelected = rows[next].getAttribute('data-pv-id');
  policyDocOpen = policyDocSelected;
  _pdShowDetail(false);
}
