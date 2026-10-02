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
var policyDocTierId = '';
var _pdProfileReq = 0;

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
  { label: 'Plan type', vault: 'type', paths: ['identity.product_type'] },
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
  { label: 'Pre-certification', paths: ['administration.precert'] },
  {
    label: 'Member services',
    paths: ['administration.customer_service']
  }
];

var PD_PLAN_TIERS = {
  goodhealth13: [
    { id: 'ghdp-1', label: 'GoodHealth 1' },
    { id: 'ghdp-2', label: 'GoodHealth 2' },
    { id: 'ghdp-3', label: 'GoodHealth 3' }
  ],
  goodhealth45: [
    { id: 'ghdp-4', label: 'GoodHealth 4' },
    { id: 'ghdp-5', label: 'GoodHealth 5' }
  ],
  tdk13: [
    { id: 'tdk-1', label: 'TDK 1' },
    { id: 'tdk-2', label: 'TDK 2' },
    { id: 'tdk-3', label: 'TDK 3' }
  ],
  tdk45: [
    { id: 'tdk-4', label: 'TDK 4' },
    { id: 'tdk-5', label: 'TDK 5' }
  ],
  smartchoice: [
    { id: 'smart-choice-1500', label: 'SmartChoice 1500' },
    { id: 'smart-choice-2500', label: 'SmartChoice 2500' },
    { id: 'smart-choice-3000', label: 'SmartChoice 3000' },
    { id: 'smart-choice-3500', label: 'SmartChoice 3500' }
  ],
  accesshealth: [
    { id: 'access-health-stm-lite', label: 'Access Health Lite' },
    { id: 'access-health-stm-traditional', label: 'Access Health Traditional' }
  ],
  smarthealth: [
    { id: 'smarthealth-stm-limited', label: 'Smart Health Limited' },
    { id: 'smarthealth-stm-traditional', label: 'Smart Health Traditional' }
  ],
  galena: [
    { id: 'afrp-galena-stm-economy', label: 'Galena Economy' },
    { id: 'afrp-galena-stm-standard', label: 'Galena Standard' },
    { id: 'afrp-galena-stm-elite', label: 'Galena Elite' }
  ],
  harmonycare: [
    { id: 'harmony-care-plus-100', label: 'HarmonyCare 100' },
    { id: 'harmony-care-plus-100a', label: 'HarmonyCare 100A' },
    { id: 'harmony-care-plus-200', label: 'HarmonyCare 200' },
    { id: 'harmony-care-plus-200-plus', label: 'HarmonyCare 200+' },
    { id: 'harmony-care-plus-300', label: 'HarmonyCare 300' },
    { id: 'harmony-care-plus-500', label: 'HarmonyCare 500' },
    { id: 'harmony-care-plus-750', label: 'HarmonyCare 750' },
    { id: 'harmony-care-plus-1000', label: 'HarmonyCare 1000' }
  ],
  sigmacare: [
    { id: 'sigma-care-plus-100', label: 'SigmaCare 100' },
    { id: 'sigma-care-plus-100a', label: 'SigmaCare 100A' },
    { id: 'sigma-care-plus-200', label: 'SigmaCare 200' },
    { id: 'sigma-care-plus-200-plus', label: 'SigmaCare 200+' },
    { id: 'sigma-care-plus-300', label: 'SigmaCare 300' },
    { id: 'sigma-care-plus-500', label: 'SigmaCare 500' },
    { id: 'sigma-care-plus-750', label: 'SigmaCare 750' },
    { id: 'sigma-care-plus-1000', label: 'SigmaCare 1000' }
  ],
  healthchoicesilver: [
    { id: 'health-choice-silver-100', label: 'Health Choice Silver 100' },
    { id: 'health-choice-silver-100a', label: 'Health Choice Silver 100A' },
    { id: 'health-choice-silver-200', label: 'Health Choice Silver 200' },
    { id: 'health-choice-silver-200-plus', label: 'Health Choice Silver 200+' },
    { id: 'health-choice-silver-300', label: 'Health Choice Silver 300' },
    { id: 'health-choice-silver-500', label: 'Health Choice Silver 500' },
    { id: 'health-choice-silver-750', label: 'Health Choice Silver 750' },
    { id: 'health-choice-silver-1000', label: 'Health Choice Silver 1000' }
  ],
  bwapara: [
    { id: 'paramount-1', label: 'Paramount 1' },
    { id: 'paramount-2', label: 'Paramount 2' },
    { id: 'paramount-3', label: 'Paramount 3' },
    { id: 'paramount-4', label: 'Paramount 4' },
    { id: 'paramount-5', label: 'Paramount 5' },
    { id: 'paramount-6', label: 'Paramount 6' }
  ],
  bwaamericare: [
    { id: 'bwa-americare-2', label: 'Americare 2' },
    { id: 'bwa-americare-3', label: 'Americare 3' },
    { id: 'bwa-americare-4', label: 'Americare 4' }
  ],
  pinnacleprotect: [
    { id: 'pinnacle-protect-2', label: 'Protect 2' },
    { id: 'pinnacle-protect-3', label: 'Protect 3' },
    { id: 'pinnacle-protect-4', label: 'Protect 4' }
  ],
  pinnaclecriticalcare: [
    { id: 'pinnacle-critical-care-1', label: 'Critical Care 1' },
    { id: 'pinnacle-critical-care-2', label: 'Critical Care 2' },
    { id: 'pinnacle-critical-care-3', label: 'Critical Care 3' },
    { id: 'pinnacle-critical-care-4', label: 'Critical Care 4' }
  ],
  allstatestm: [
    { id: 'allstate-enhanced-stm-ppo', label: 'Enhanced' },
    { id: 'allstate-copay-enhanced-stm-ppo', label: 'Copay Enhanced' },
    { id: 'allstate-essentials-stm-ppo', label: 'Essentials' }
  ],
  pinnacle: [{ id: 'pinnacle-stm-traditional', label: 'Pinnacle STM' }]
};

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
  if (
    leaf.vs !== 'VERIFIED' &&
    leaf.vs !== 'VERIFIED_SINGLE_SOURCE' &&
    leaf.vs !== 'VERIFIED_MULTI_SOURCE'
  ) {
    return '';
  }
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

var PD_CC_CONDITIONS = [
  {
    group: 'Cardiac',
    items: [
      [
        'schedule.heart_attack_myocardial_infarction',
        'Heart Attack (Myocardial Infarction)'
      ],
      ['schedule.sudden_cardiac_arrest', 'Sudden Cardiac Arrest'],
      [
        'schedule.coronary_artery_disease_requiring_bypass',
        'Coronary Artery Disease requiring Coronary Artery Bypass'
      ],
      [
        'schedule.coronary_artery_disease_requiring_angioplasty',
        'Coronary Artery Disease requiring Angioplasty'
      ]
    ]
  },
  {
    group: 'Cerebral vascular disease',
    items: [
      ['schedule.stroke', 'Stroke'],
      ['schedule.ruptured_brain_aneurysm', 'Ruptured Brain Aneurysm'],
      ['schedule.transient_ischemic_attack', 'Transient Ischemic Attack']
    ]
  },
  {
    group: 'Other specified illness',
    items: [
      [
        'schedule.bone_marrow_or_stem_cell_transplant',
        'Bone Marrow / Stem Cell Transplant'
      ],
      ['schedule.coma', 'Coma'],
      ['schedule.end_stage_renal_failure', 'End Stage Renal Failure'],
      [
        'schedule.major_organ_failure_requiring_transplant',
        'Major Organ Failure requiring Transplant'
      ],
      [
        'schedule.occupational_infectious_hepatitis_b_c_or_d',
        'Occupational Infectious Hepatitis B, C or D'
      ],
      ['schedule.occupational_infectious_hiv', 'Occupational Infectious HIV'],
      ['schedule.benign_brain_tumor', 'Benign Brain Tumor']
    ]
  },
  {
    group: 'Permanent paralysis',
    items: [
      ['schedule.quadriplegia', 'Quadriplegia'],
      ['schedule.paraplegia', 'Paraplegia'],
      ['schedule.hemiplegia_or_diplegia', 'Hemiplegia / Diplegia']
    ]
  },
  {
    group: 'Other accident',
    items: [['schedule.severe_burns', 'Severe Burns']]
  },
  {
    group: 'Cancer',
    items: [
      ['schedule.cancer_invasive', 'Invasive'],
      ['schedule.cancer_non_invasive', 'Non-Invasive'],
      ['schedule.skin_cancer', 'Skin Cancer']
    ]
  }
];

function _pdFactRow(label, text, wide) {
  if (!_pdHasFact(text)) return '';
  return (
    '<div class="pv-fact' +
    (wide ? ' pv-cc-wide' : '') +
    '"><dt>' +
    escHTML(label) +
    '</dt><dd>' +
    escHTML(text) +
    '</dd></div>'
  );
}

function _pdUnmappedFact(profile, key) {
  var node;
  if (!profile || !profile.unmapped) return '';
  node = profile.unmapped[key];
  if (!node) return '';
  if (
    node.vs !== 'VERIFIED' &&
    node.vs !== 'VERIFIED_SINGLE_SOURCE' &&
    node.vs !== 'VERIFIED_MULTI_SOURCE'
  ) {
    return '';
  }
  if (!_pdHasFact(node.v)) return '';
  return String(node.v);
}

function _pdCriticalCareFacts(profile) {
  var html = '';
  var conditions = '';
  var count = 0;
  var g;
  var i;
  var item;
  var text;
  if (!_pdUnmappedFact(profile, 'benefit.critical_care_amount')) return '';
  html += _pdFactRow(
    'Critical Care benefit',
    _pdUnmappedFact(profile, 'benefit.critical_care_amount')
  );
  html += _pdFactRow(
    'Daily Hospital Confinement',
    _pdVerifiedLeaf(profile, 'benefits.hospital_daily')
  );
  html += _pdFactRow(
    'Confinement limits',
    _pdUnmappedFact(profile, 'benefit.confinement_limits')
  );
  html += _pdFactRow(
    'Critical Care waiting period',
    _pdUnmappedFact(profile, 'waiting_period.critical_care')
  );
  for (g = 0; g < PD_CC_CONDITIONS.length; g++) {
    for (i = 0; i < PD_CC_CONDITIONS[g].items.length; i++) {
      item = PD_CC_CONDITIONS[g].items[i];
      text = _pdUnmappedFact(profile, item[0]);
      if (!_pdHasFact(text)) continue;
      conditions += _pdFactRow(
        PD_CC_CONDITIONS[g].group + ': ' + item[1],
        text
      );
      count += 1;
    }
  }
  if (count) {
    html +=
      '<div class="pv-cc-toggle-row"><button type="button" class="pv-cc-toggle" data-pv-cc-toggle="1" aria-expanded="false" aria-controls="pv-cc-conditions">' +
      escHTML('Covered conditions and benefit percentages (' + count + ')') +
      '</button></div>';
    html +=
      '<div id="pv-cc-conditions" class="pv-cc-conditions">' +
      conditions +
      '</div>';
  }
  html += _pdFactRow(
    'Exclusions',
    _pdVerifiedLeaf(profile, 'limitations.excluded_services'),
    true
  );
  return html;
}

function _pdSlotIsVaultFallback(plan, profile, slot) {
  var i;
  if (!slot || !slot.vault || !plan) return false;
  if (profile && slot.paths) {
    for (i = 0; i < slot.paths.length; i++) {
      if (_pdVerifiedLeaf(profile, slot.paths[i])) return false;
    }
  }
  return _pdHasFact(plan[slot.vault]);
}

function _pdFactsInner(plan, profile) {
  var html = '';
  var i;
  var slot;
  var text;
  var mark;
  for (i = 0; i < PD_FACT_SLOTS.length; i++) {
    slot = PD_FACT_SLOTS[i];
    text = _pdSlotValue(plan, profile, slot);
    if (!text) continue;
    mark = '';
    if (_pdSlotIsVaultFallback(plan, profile, slot)) {
      mark =
        '<span class="br-ref-card-badge br-ref-card-badge-nc">NOT CONFIRMED</span> ';
    }
    html +=
      '<div class="pv-fact"><dt>' +
      escHTML(slot.label) +
      '</dt><dd>' +
      mark +
      escHTML(text) +
      '</dd></div>';
  }
  html += _pdCriticalCareFacts(profile);
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

function _pdPlanTiers(plan) {
  var rows;
  if (!plan || !plan.id || !PD_PLAN_TIERS[plan.id]) return [];
  rows = PD_PLAN_TIERS[plan.id];
  if (!rows || !rows.length) return [];
  return rows;
}

function _pdSelectedTier(plan) {
  var rows = _pdPlanTiers(plan);
  var i;
  if (!rows.length) return null;
  if (policyDocTierId) {
    for (i = 0; i < rows.length; i++) {
      if (rows[i].id === policyDocTierId) return rows[i];
    }
  }
  return rows[0];
}

function _pdTierHtml(plan) {
  var rows = _pdPlanTiers(plan);
  var active;
  var html;
  var i;
  var on;
  if (rows.length < 2) return '';
  active = _pdSelectedTier(plan);
  html = '<div class="pv-tiers" role="group" aria-label="Plan tiers">';
  for (i = 0; i < rows.length; i++) {
    on = active && rows[i].id === active.id;
    html +=
      '<button type="button" class="pv-tier' +
      (on ? ' pv-tier-on' : '') +
      '" data-pv-tier="' +
      escHTML(rows[i].id) +
      '" aria-pressed="' +
      (on ? 'true' : 'false') +
      '">' +
      escHTML(rows[i].label) +
      '</button>';
  }
  html += '</div>';
  return html;
}

function _pdMarkTierButtons(tierId) {
  var root =
    document.getElementById('page-policydocs') ||
    document.getElementById('page-allplans');
  var buttons;
  var i;
  var id;
  var on;
  if (!root) return;
  buttons = root.querySelectorAll('.pv-tier');
  for (i = 0; i < buttons.length; i++) {
    id = buttons[i].getAttribute('data-pv-tier');
    on = id === tierId;
    if (on) {
      if (buttons[i].className.indexOf('pv-tier-on') === -1) {
        buttons[i].className += ' pv-tier-on';
      }
    } else {
      buttons[i].className = buttons[i].className
        .replace(' pv-tier-on', '')
        .replace('pv-tier-on', '');
    }
    buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
  }
}

function _pdFetchProfile(plan, profileId) {
  var requestedCard = plan.id;
  var requestedTier = profileId;
  var req = ++_pdProfileReq;
  if (!profileId || typeof brLoadProfile !== 'function') return;
  brLoadProfile(profileId)
    .then(function (profile) {
      var current;
      if (req !== _pdProfileReq) return;
      if (policyDocSelected !== requestedCard) return;
      if (_pdPlanTiers(plan).length) {
        current = _pdSelectedTier(plan);
        if (!current || current.id !== requestedTier) return;
      }
      if (!profile) {
        _pdApplyProfile(plan, null);
        return;
      }
      _pdApplyProfile(plan, profile);
    })
    .catch(function () {
      if (req !== _pdProfileReq) return;
      if (policyDocSelected !== requestedCard) return;
      _pdApplyProfile(plan, null);
    });
}

function _pdSelectTier(tierId) {
  var plan;
  var rows;
  var i;
  var found = false;
  if (!policyDocOpen || !tierId) return;
  plan = _pdFindPlan(policyDocOpen);
  if (!plan) return;
  rows = _pdPlanTiers(plan);
  for (i = 0; i < rows.length; i++) {
    if (rows[i].id === tierId) found = true;
  }
  if (!found) return;
  if (policyDocTierId === tierId) return;
  policyDocTierId = tierId;
  _pdMarkTierButtons(tierId);
  _pdApplyProfile(plan, null);
  _pdFetchProfile(plan, tierId);
}

function _pdApplyProfile(plan, profile) {
  var facts = document.getElementById('pv-facts');
  var badge = document.getElementById('pv-doc-badge');
  var label;
  if (policyDocSelected !== plan.id) return;
  if (facts) {
    facts.innerHTML = _pdFactsInner(plan, profile);
    if (
      plan.id === 'pinnaclecriticalcare' &&
      facts.parentNode &&
      facts.parentNode.className.indexOf('pv-panel') !== -1
    ) {
      facts.parentNode.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }
  if (!badge) return;
  label = profile ? _pdDocLabel(profile.doc_completeness) : '';
  if (!label) {
    badge.innerHTML = '';
    return;
  }
  badge.innerHTML = '<span class="pv-doc-badge">' + escHTML(label) + '</span>';
}

function _pdFillDocBadge(plan) {
  var mapped;
  var tier;
  var requested;
  var req;
  if (!plan) return;
  mapped = _pdPlanTiers(plan);
  if (mapped.length) {
    tier = _pdSelectedTier(plan);
    if (tier) {
      policyDocTierId = tier.id;
      _pdFetchProfile(plan, tier.id);
    }
    return;
  }
  if (
    typeof brLoadPlanAliases !== 'function' ||
    typeof brMatchPlan !== 'function' ||
    typeof brLoadProfile !== 'function'
  ) {
    return;
  }
  requested = plan.id;
  req = ++_pdProfileReq;
  brLoadPlanAliases()
    .then(function (rows) {
      var profileId;
      if (req !== _pdProfileReq) return null;
      if (policyDocSelected !== requested) return null;
      profileId = _pdProfileId(plan, rows || []);
      if (!profileId) return null;
      return brLoadProfile(profileId);
    })
    .then(function (profile) {
      if (req !== _pdProfileReq) return;
      if (policyDocSelected !== requested) return;
      if (!profile) return;
      _pdApplyProfile(plan, profile);
    })
    .catch(function () {});
}

function _pdBrochureControls(plan) {
  var tiers;
  var i;
  var html;
  if (plan.id === 'allstatestm') {
    tiers = [
      ['Enhanced', 'Allstate Enhanced STM PPO Plan.pdf'],
      ['Copay Enhanced', 'Allstate Copay Enhanced STM PPO Plan.pdf'],
      ['Essentials', 'Allstate Essentials STM PPO Plan.pdf']
    ];
    html = '';
    for (i = 0; i < tiers.length; i++) {
      html +=
        '<a class="pv-action" href="' +
        escHTML(chaKnowledgeBaseUrl(tiers[i][1])) +
        '" target="_blank" rel="noopener noreferrer">' +
        escHTML(tiers[i][0]) +
        '</a>';
    }
    return html;
  }
  if (_pdHasFact(plan.source)) {
    return (
      '<a class="pv-action" href="' +
      escHTML(chaKnowledgeBaseUrl(plan.source)) +
      '" target="_blank" rel="noopener noreferrer">Brochure</a>'
    );
  }
  return '<button type="button" class="pv-action" disabled title="No brochure on file">No brochure on file</button>';
}

function _pdDetailHtml(plan) {
  if (!plan) {
    return '<p class="pv-status">No plan is selected.</p>';
  }
  var scriptIndex = _pdScriptIndex(plan);
  var html = _pdTierHtml(plan);
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
  html += _pdBrochureControls(plan);
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
    html += '<div class="pv-grid">';
    for (i = 0; i < groupPlans.length; i++) {
      var plan = groupPlans[i];
      var open = plan.id === policyDocOpen;
      html +=
        '<button type="button" class="pv-card' +
        (open ? ' pv-card-open' : '') +
        '" id="pd-' +
        escHTML(plan.id) +
        '" data-pv-id="' +
        escHTML(plan.id) +
        '" aria-expanded="' +
        (open ? 'true' : 'false') +
        '"><span class="pv-card-name">' +
        escHTML(plan.name) +
        '</span><span class="pv-card-network">' +
        escHTML(plan.network || '') +
        '</span><span class="pv-card-carrier">' +
        escHTML(plan.carrier || '') +
        '</span></button>';
    }
    html += '</div></section>';
  }
  return html;
}

function _pdColumnCount(grid) {
  var cols = window.getComputedStyle(grid).gridTemplateColumns;
  if (!cols || cols === 'none') return 1;
  return cols.split(' ').length;
}

function _pdScrollPanel(panel) {
  var rect = panel.getBoundingClientRect();
  var view = window.innerHeight || document.documentElement.clientHeight;
  if (rect.bottom > view + 1) {
    panel.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}

function _pdPlacePanel(shouldScroll) {
  var old = document.querySelector('#page-policydocs .pv-panel');
  if (old && old.parentNode) old.parentNode.removeChild(old);
  var cards = document.querySelectorAll('#page-policydocs .pv-card');
  var i;
  for (i = 0; i < cards.length; i++) {
    var on = cards[i].getAttribute('data-pv-id') === policyDocOpen;
    cards[i].setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) {
      if (cards[i].className.indexOf('pv-card-open') === -1) {
        cards[i].className += ' pv-card-open';
      }
    } else {
      cards[i].className = cards[i].className
        .replace(' pv-card-open', '')
        .replace('pv-card-open', '');
    }
  }
  if (!policyDocOpen) return;
  var card = document.getElementById('pd-' + policyDocOpen);
  if (!card || !card.parentNode) return;
  var grid = card.parentNode;
  var gridCards = [];
  var child = grid.firstChild;
  while (child) {
    if (child.className && child.className.indexOf('pv-card') !== -1) {
      gridCards.push(child);
    }
    child = child.nextSibling;
  }
  var index = 0;
  for (i = 0; i < gridCards.length; i++) {
    if (gridCards[i] === card) index = i;
  }
  var cols = _pdColumnCount(grid);
  var rowEnd = Math.floor(index / cols) * cols + cols - 1;
  if (rowEnd > gridCards.length - 1) rowEnd = gridCards.length - 1;
  var panel = document.createElement('div');
  panel.className = 'pv-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Plan details');
  var plan = _pdFindPlan(policyDocOpen);
  panel.innerHTML = _pdDetailHtml(plan);
  var after = gridCards[rowEnd];
  if (after.nextSibling) grid.insertBefore(panel, after.nextSibling);
  else grid.appendChild(panel);
  _pdFillDocBadge(plan);
  if (typeof setActivePlan === 'function' && plan) {
    setActivePlan(plan.id, plan.name, plan.group || plan.type || '');
  }
  if (shouldScroll) _pdScrollPanel(panel);
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
  html += '<div id="pv-list" class="pv-board" aria-label="Plan cards"></div>';
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
  var host = document.getElementById('pdResultsContainer');
  if (!list) {
    if (host) host.innerHTML = '';
    return;
  }
  var plans = _pdFilteredPlans();
  if (!plans.length) {
    policyDocSelected = '';
    policyDocOpen = '';
    list.innerHTML = '<p class="pv-status">No plans match your search.</p>';
    return;
  }
  var still = false;
  var i;
  if (policyDocOpen) {
    for (i = 0; i < plans.length; i++) {
      if (plans[i].id === policyDocOpen) still = true;
    }
  }
  if (!still) {
    policyDocOpen = '';
    policyDocSelected = '';
    policyDocTierId = '';
  } else {
    policyDocSelected = policyDocOpen;
  }
  list.innerHTML = _pdListHtml(plans);
  if (policyDocOpen) _pdPlacePanel(false);
}

function policyDocToggle(id) {
  if (policyDocOpen === id) {
    policyDocOpen = '';
    policyDocSelected = '';
    policyDocTierId = '';
    _pdPlacePanel(false);
    return;
  }
  policyDocTierId = '';
  policyDocOpen = id;
  policyDocSelected = id;
  var container = document.getElementById('pv-list');
  if (container) _pdPlacePanel(true);
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
  window.addEventListener('resize', function () {
    if (!policyDocOpen) return;
    if (!document.getElementById('pv-list')) return;
    _pdPlacePanel(false);
  });
  root.addEventListener('input', function (event) {
    if (event.target && event.target.id === 'pdSearchInput') {
      policyDocSearchTyping(event.target.value);
    }
  });
}

function _pdToggleCoveredConditions(button) {
  var panel = document.getElementById('pv-cc-conditions');
  var open;
  if (!panel || !button) return;
  open = panel.className.indexOf('pv-cc-open') === -1;
  if (open) {
    panel.className += ' pv-cc-open';
  } else {
    panel.className = panel.className
      .replace(' pv-cc-open', '')
      .replace('pv-cc-open', '');
  }
  button.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function _pdOnClick(event) {
  var node = event.target;
  while (node && node !== event.currentTarget) {
    if (node.getAttribute && node.getAttribute('data-pv-cc-toggle')) {
      _pdToggleCoveredConditions(node);
      return;
    }
    if (node.getAttribute && node.getAttribute('data-pv-tier')) {
      _pdSelectTier(node.getAttribute('data-pv-tier'));
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
      node.className.indexOf('pv-card') !== -1
    ) {
      policyDocToggle(node.getAttribute('data-pv-id'));
      return;
    }
    node = node.parentNode;
  }
}

function _pdOnKey(event) {
  if (event.key !== 'Escape') return;
  if (!policyDocOpen) return;
  policyDocOpen = '';
  policyDocSelected = '';
  policyDocTierId = '';
  _pdPlacePanel(false);
}
