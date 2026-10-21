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

// Plan lineup, Oct 2026 (NEO and FirstEnroll storefronts, Oct 15).
// Display-layer overrides so POLICY_DOCS data values stay untouched.
var PD_HIDDEN_IDS = {
  everest: true,
  pinnaclecriticalcare: true,
  awasafeguard: true,
  allstateplans: true,
  pinnaclehi: true,
  pinnaclecriticalcaresa: true,
  americanfinancialci: true
};

var PD_GROUP_OVERRIDE = {
  harmonycareseries: 'Limited',
  advancedwellnessplus: 'Limited'
};

var PD_NAME_OVERRIDE = {
  pinnacleprotect: 'Pinnacle Protect 2-4',
  allstatestm: 'Allstate STM PPO'
};

var PD_PLATFORM = {
  smartchoice: 'NEO',
  pinnacle: 'NEO',
  smarthealth: 'NEO',
  galena: 'NEO',
  harborstmessential: 'NEO',
  harborstmaccess: 'NEO',
  harborstmsecure: 'NEO',
  goodlifewbchoice: 'NEO',
  goodlifewbselect: 'NEO',
  pinnacleprotect: 'NEO',
  allstatestm: 'NEO',
  allstatehealthaccess: 'NEO',
  simpleshield: 'NEO',
  goodhealth13: 'FirstEnroll',
  goodhealth45: 'FirstEnroll',
  ghdpwellness: 'FirstEnroll',
  tdk13: 'FirstEnroll',
  tdk45: 'FirstEnroll',
  accesshealth: 'FirstEnroll',
  harmonycare: 'FirstEnroll',
  harmonycareseries: 'FirstEnroll',
  advancedwellnessplus: 'FirstEnroll',
  sigmacare: 'FirstEnroll',
  healthchoicesilver: 'FirstEnroll',
  bwapara: 'FirstEnroll',
  bwaamericare: 'FirstEnroll'
};

// Cards for current plans that have a plan profile but no POLICY_DOCS row.
var PD_EXTRA_DOCS = [
  {
    id: 'ghdpwellness',
    name: 'GoodHealth Wellness',
    group: 'MEC',
    type: 'MEC',
    carrier: '',
    network: 'First Health',
    assoc: '',
    source: '',
    planNotes: '',
    benefits: [],
    limitations: [],
    waitingPeriods: [],
    preEx: ''
  },
  {
    id: 'simpleshield',
    name: 'AWA SimpleShield',
    group: 'Limited',
    type: 'Fixed indemnity',
    carrier: 'Southern Guaranty Insurance Company (SGIC)',
    network: 'First Health + MultiPlan',
    assoc: 'American Workers Association (AWA)',
    source: '',
    planNotes: '',
    benefits: [],
    limitations: [],
    waitingPeriods: [],
    preEx: ''
  }
];

var _pdDocsCache = null;

function _pdAllDocs() {
  var out = [];
  var all;
  var i;
  var p;
  var copy;
  if (_pdDocsCache) return _pdDocsCache;
  all = POLICY_DOCS.concat(PD_EXTRA_DOCS);
  for (i = 0; i < all.length; i++) {
    p = all[i];
    if (!p || PD_HIDDEN_IDS[p.id]) continue;
    if (PD_GROUP_OVERRIDE[p.id] || PD_NAME_OVERRIDE[p.id]) {
      copy = Object.assign({}, p);
      if (PD_GROUP_OVERRIDE[p.id]) copy.group = PD_GROUP_OVERRIDE[p.id];
      if (PD_NAME_OVERRIDE[p.id]) copy.name = PD_NAME_OVERRIDE[p.id];
      p = copy;
    }
    out.push(p);
  }
  _pdDocsCache = out;
  return out;
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
  goodhealth13: 'MedFirst/GoodHealth 1,2,3', // lineup-guard-ignore: script name
  goodhealth45: 'MedFirst/ GoodHealth 4, 5 (Need Primary SSN)', // lineup-guard-ignore: script name
  tdk13: 'TDK 1,2,3 (Need Primary SSN)',
  tdk45: 'TDK 4,5 (Need Primary SSN)',
  smartchoice: 'NEO Smart Choice',
  pinnacle: 'NEO Pinnacle STM Traditional',
  accesshealth: 'Access Health STM',
  harmonycare:
    'Advanced Wellness or HarmonyCare and SigmaCare (Match Network to Plan)',
  sigmacare:
    'Advanced Wellness or HarmonyCare and SigmaCare (Match Network to Plan)',
  everest:
    'Advanced Wellness or HarmonyCare and SigmaCare (Match Network to Plan)',
  harmonycarebase:
    'Advanced Wellness or HarmonyCare and SigmaCare (Match Network to Plan)',
  advancedwellnessplus:
    'Advanced Wellness or HarmonyCare and SigmaCare (Match Network to Plan)',
  bwapara: 'BWA Paramount 1-6 (First Enroll)',
  bwaamericare: 'BWA Americare 2,3,4 (First Enroll)',
  healthchoicesilver: 'Health Choice Silver',
  harborstmessential: 'Harbor STM Essential',
  harborstmaccess: 'Harbor STM Access',
  harborstmsecure: 'Harbor STM Secure',
  goodlifewbchoice:
    'Goodlife Partners WB CHOICE and WB SELECT (Match Doctor visits to Plan)',
  goodlifewbselect:
    'Goodlife Partners WB CHOICE and WB SELECT (Match Doctor visits to Plan)',
  pinnacleprotect: 'Pinnacle Protect Plan 1 - 4' // lineup-guard-ignore: script name
};

var PD_GROUPS = [
  { key: 'MEC', label: 'MEC' },
  { key: 'STM', label: 'Short-term medical' },
  { key: 'Limited', label: 'Limited benefit' },
  { key: 'Limited medical', label: 'Limited medical' }
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
  { label: 'Telemedicine', paths: ['benefits.telehealth'] },
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

var PD_INDEMNITY_SLOTS = [
  ['Hospital daily', 'benefits.hospital_daily'],
  ['Hospital admission', 'benefits.hospital_admission'],
  ['ICU', 'benefits.icu'],
  ['Inpatient surgery', 'benefits.surgery_inpatient'],
  ['Outpatient surgery', 'benefits.surgery_outpatient'],
  ['Anesthesia', 'benefits.anesthesia'],
  ['Accidental death', 'benefits.accidental_death'],
  ['Critical illness', 'benefits.critical_illness'],
  ['Mental health, inpatient', 'benefits.mental_health_inpatient'],
  ['Mental health, outpatient', 'benefits.mental_health_outpatient']
];

var PD_PLAN_TIERS = {
  ghdpwellness: [{ id: 'ghdp-wellness', label: 'GoodHealth Wellness' }],
  simpleshield: [
    { id: 'awa-simpleshield-membership-1', label: 'Plan 1' },
    { id: 'awa-simpleshield-membership-2', label: 'Plan 2' }
  ],
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
  pinnacle: [{ id: 'pinnacle-stm-traditional', label: 'Pinnacle STM' }],
  allstatehealthaccess: [
    { id: 'allstate-health-access-value', label: 'Value' },
    { id: 'allstate-health-access-core', label: 'Core' },
    { id: 'allstate-health-access-plus', label: 'Plus' }
  ],
  harmonycareseries: [
    { id: 'harmony-care-100', label: '100' },
    { id: 'harmony-care-100a', label: '100A' },
    { id: 'harmony-care-100b', label: '100B' },
    { id: 'harmony-care-200', label: '200' },
    { id: 'harmony-care-200-plus', label: '200+' },
    { id: 'harmony-care-300', label: '300' },
    { id: 'harmony-care-500', label: '500' },
    { id: 'harmony-care-750', label: '750' },
    { id: 'harmony-care-1000', label: '1000' }
  ],
  advancedwellnessplus: [
    { id: 'advanced-wellness-plus-100', label: '100' },
    { id: 'advanced-wellness-plus-100a', label: '100A' },
    { id: 'advanced-wellness-plus-200', label: '200' },
    { id: 'advanced-wellness-plus-200-plus', label: '200+' },
    { id: 'advanced-wellness-plus-300', label: '300' },
    { id: 'advanced-wellness-plus-500', label: '500' },
    { id: 'advanced-wellness-plus-750', label: '750' },
    { id: 'advanced-wellness-plus-1000', label: '1000' }
  ],
  awasafeguard: [
    { id: 'awa-safe-guard-100', label: 'Safe Guard 100' },
    { id: 'awa-safe-guard-accident-100000-sa', label: 'Accident $100,000 SA' },
    {
      id: 'awa-safe-guard-accident-hospital-5000-500',
      label: 'AH $5,000/$500'
    },
    {
      id: 'awa-safe-guard-accident-hospital-5000-500-sa',
      label: 'AH $5,000/$500 SA'
    },
    {
      id: 'awa-safe-guard-accident-hospital-5000-1000',
      label: 'AH $5,000/$1,000'
    },
    {
      id: 'awa-safe-guard-accident-hospital-5000-1000-sa',
      label: 'AH $5,000/$1,000 SA'
    },
    { id: 'awa-safeguard-add-ame-ci-adv', label: 'ADD/AME/CI ADV' },
    { id: 'awa-safeguard-add-ame-ci-sa', label: 'ADD/AME/CI SA' }
  ],
  allstateplans: [
    { id: 'allstate-cancer-heart-stroke', label: 'Cancer and Heart/Stroke' },
    { id: 'allstate-dental-ppo', label: 'Dental PPO' },
    { id: 'allstate-hospital-expense', label: 'Hospital Expense' },
    { id: 'allstate-plan-enhancer', label: 'Plan Enhancer' },
    { id: 'allstate-specified-care', label: 'Specified Care' },
    { id: 'allstate-specified-care-sa', label: 'Specified Care SA' }
  ],
  pinnaclehi: [
    { id: 'pinnacle-hi-1', label: 'Plan 1' },
    { id: 'pinnacle-hi-1-sa', label: 'Plan 1 SA' },
    { id: 'pinnacle-hi-2', label: 'Plan 2' },
    { id: 'pinnacle-hi-2-sa', label: 'Plan 2 SA' }
  ],
  pinnaclecriticalcaresa: [
    { id: 'pinnacle-critical-care-1-sa', label: 'Plan 1 SA' },
    { id: 'pinnacle-critical-care-2-sa', label: 'Plan 2 SA' },
    { id: 'pinnacle-critical-care-3-sa', label: 'Plan 3 SA' },
    { id: 'pinnacle-critical-care-4-sa', label: 'Plan 4 SA' }
  ],
  americanfinancialci: [
    { id: 'american-financial-ci-2500', label: '$2,500' },
    { id: 'american-financial-ci-5000', label: '$5,000' },
    { id: 'american-financial-ci-7500', label: '$7,500' },
    { id: 'american-financial-ci-10000', label: '$10,000' }
  ]
};

// Plan Vault short values (Oct 2026). One entry per tier id (or card id
// for single-tier cards), read from the carrier brochures and approved by
// the owner on Oct 16 2026. Values not printed in any brochure are left
// out, so their tile does not show. Source sheet: CHA_Plan_Tier_Values.csv.
var PD_SHORT_VALUES = {
  'ghdp-wellness': {
    primary_care: 'Not listed (only listed services covered)',
    specialist: 'Not listed (only listed services covered)',
    urgent_care: 'Not listed (only listed services covered)',
    telehealth: '$0 consult, no max',
    hospital: 'Not listed (only listed services covered)',
    surgery: 'Not listed (only listed services covered)',
    er: 'Not listed (only listed services covered)',
    rx: 'Discount card only (BestChoiceRx)',
    pre_existing: 'None stated (no hospital benefit)',
    waiting_period: '30 days, sickness benefits'
  },
  'ghdp-1': {
    primary_care: '$25 copay, $150 max, 3 visits/yr',
    specialist: '$50 copay, $300 max, 1 visit/yr (shared w/ urgent care)',
    urgent_care: '$50 copay, $300 max, 1 visit/yr (shared w/ specialist)',
    telehealth: '$0 consult, no max',
    hospital: '$1,000/day, max $5,000/yr',
    surgery: 'Not listed (only listed services covered)',
    er: 'Not listed (only listed services covered)',
    rx: 'Discount card only (BestChoiceRx)',
    pre_existing: '12/12, hospital benefits only',
    waiting_period: '30 days, sickness benefits'
  },
  'ghdp-2': {
    primary_care: '$25 copay, $150 max, 4 visits/yr',
    specialist: '$50 copay, $300 max, 2 visits/yr (shared w/ urgent care)',
    urgent_care: '$50 copay, $300 max, 2 visits/yr (shared w/ specialist)',
    telehealth: '$0 consult, no max',
    hospital: '$1,000/day, max $10,000/yr',
    surgery: 'Not listed (only listed services covered)',
    er: 'Not listed (only listed services covered)',
    rx: 'Acute/preventive generic $0; 200 maint. generics $5 (retail 30 / mail 90); off-formulary discount; specialty not covered',
    pre_existing: '12/12, hospital benefits only',
    waiting_period: '30 days, sickness benefits'
  },
  'ghdp-3': {
    primary_care: '$25 copay, $150 max, 4 visits/yr',
    specialist: '$50 copay, $300 max, 4 visits/yr (shared w/ urgent care)',
    urgent_care: '$50 copay, $300 max, 4 visits/yr (shared w/ specialist)',
    telehealth: '$0 consult, no max',
    hospital: '$1,000/day, max $15,000/yr',
    surgery: 'Not listed (only listed services covered)',
    er: 'Not listed (only listed services covered)',
    rx: 'Generic $0; maint. generic $5; non-pref generic $5/$10; brand $40 retail w/ PA; $150/mo cap; specialty not covered',
    pre_existing: '12/12, hospital benefits only',
    waiting_period: '30 days, sickness benefits'
  },
  'ghdp-4': {
    primary_care: '$50 copay, $150 max, 4 visits/yr',
    specialist: '$75 copay, $300 max, 4 visits/yr (shared w/ urgent care)',
    urgent_care: '$75 copay, $300 max, 4 visits/yr (shared w/ specialist)',
    telehealth: '$0 consult, no max',
    hospital: '$1,000/day, max $10,000/yr',
    surgery: "IP/OP combined: $1,000 (printed '/ Year'), max $2,000/yr",
    er: '$1,000/incident, if admitted',
    rx: 'Generic $0; maint. generic $5; non-pref generic $5/$10; brand $40 retail w/ PA; $150/mo cap; specialty not covered',
    pre_existing: '12/12, hospital benefits only',
    waiting_period: '30 days, sickness benefits'
  },
  'ghdp-5': {
    primary_care: '$50 copay, $150 max, 5 visits/yr',
    specialist: '$75 copay, $300 max, 5 visits/yr (shared w/ urgent care)',
    urgent_care: '$75 copay, $300 max, 5 visits/yr (shared w/ specialist)',
    telehealth: '$0 consult, no max',
    hospital: '$1,500/day, max $15,000/yr',
    surgery: 'IP/OP combined: $1,500/day, max $4,500/yr',
    er: '$1,000/incident, if admitted',
    rx: 'Generic $0; maint. generic $5; non-pref generic $5/$10; brand $40 retail w/ PA; $150/mo cap; specialty not covered',
    pre_existing: '12/12, hospital benefits only',
    waiting_period: '30 days, sickness benefits'
  },
  'tdk-1': {
    deductible: '$0 (none)',
    primary_care: '$25 copay, $150 max, 3 visits/yr',
    specialist: '$50 copay, $300 max, 1 visit/yr',
    urgent_care: '$50 copay, $300 max, 1 visit/yr',
    telehealth: '$0 consult, no max (MyLiveDoc)',
    hospital: '$1,000/day, max $5,000/yr',
    surgery: 'Not covered (outpatient); no IP surgery row',
    er: 'Not covered',
    rx: '70+ free Rx; discount card. Home delivery not covered; brand/specialty not covered',
    pre_existing: '12/12, hospital-related benefits',
    waiting_period: '30 days (not virtual care/Rx; not emergent care; 1st year)'
  },
  'tdk-2': {
    deductible: '$0 (none)',
    primary_care: '$25 copay, $150 max, 4 visits/yr',
    specialist: '$50 copay, $300 max, 2 visits/yr',
    urgent_care: '$50 copay, $300 max, 2 visits/yr',
    telehealth: '$0 consult, no max (MyLiveDoc)',
    hospital: '$1,000/day, max $10,000/yr',
    surgery: 'Not covered (outpatient); no IP surgery row',
    er: 'Not covered',
    rx: '1,000+ free Rx; discount card. Brand/specialty not covered',
    pre_existing: '12/12, hospital-related benefits',
    waiting_period: '30 days (not virtual care/Rx; not emergent care; 1st year)'
  },
  'tdk-3': {
    deductible: '$0 (none)',
    primary_care: '$25 copay, $150 max, 4 visits/yr',
    specialist: '$50 copay, $300 max, 4 visits/yr',
    urgent_care: '$50 copay, $300 max, 4 visits/yr',
    telehealth: '$0 consult, no max (MyLiveDoc)',
    hospital: '$1,000/day, max $15,000/yr',
    surgery: 'Not covered (outpatient); no IP surgery row',
    er: 'Not covered',
    rx: '70+ free Rx; discount card. Brand/specialty not covered',
    pre_existing: '12/12, hospital-related benefits',
    waiting_period: '30 days (not virtual care/Rx; not emergent care; 1st year)'
  },
  'tdk-4': {
    deductible: '$0 (none)',
    primary_care: '$50 copay, $150 max, 4 visits/yr',
    specialist: '$75 copay, $300 max, 4 visits/yr',
    urgent_care: '$75 copay, $300 max, 4 visits/yr',
    telehealth: '$0 consult, no max (MyLiveDoc)',
    hospital: '$1,000/day, max $10,000/yr',
    surgery: 'IP/OP: $1,000/day, max $2,000/yr',
    er: '$1,000/incident, if admitted',
    rx: '1,000+ free Rx; discount card. Brand/specialty not covered',
    pre_existing: '12/12, hospital-related benefits',
    waiting_period: '30 days (not virtual care/Rx; not emergent care; 1st year)'
  },
  'tdk-5': {
    deductible: '$0 (none)',
    primary_care: '$50 copay, $150 max, 5 visits/yr',
    specialist: '$75 copay, $300 max, 5 visits/yr',
    urgent_care: '$75 copay, $300 max, 5 visits/yr',
    telehealth: '$0 consult, no max (MyLiveDoc)',
    hospital: '$1,500/day, max $15,000/yr',
    surgery: 'IP/OP: $1,500/day, max $4,500/yr',
    er: '$1,000/incident, if admitted',
    rx: '1,000+ free Rx; discount card. Brand/specialty not covered',
    pre_existing: '12/12, hospital-related benefits',
    waiting_period: '30 days (not virtual care/Rx; not emergent care; 1st year)'
  },
  'smart-choice-1500': {
    deductible: '$1,500 ind / $3,000 fam; OOP $9,200 / $18,400',
    primary_care: '$40 copay, 12 visits/yr',
    specialist: '$50 copay, 12 visits/yr',
    urgent_care: '$60 copay, 5 visits/yr',
    telehealth: '$0 copay (PCP, urgent, mental health)',
    hospital: '$2,500 copay after ded, 1 admit/family/yr, up to 7 days',
    surgery:
      'OP facility $750 copay after ded, 4/family/yr, elective excluded; IP via hospital row',
    er: '$250 copay after ded, 4/family/yr',
    rx: 'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered'
  },
  'smart-choice-2500': {
    deductible: '$2,500 ind / $5,000 fam; OOP $9,200 / $18,400',
    primary_care: '$40 copay, 10 visits/yr',
    specialist: '$50 copay, 10 visits/yr',
    urgent_care: '$60 copay, 3 visits/yr',
    telehealth: '$0 copay (PCP, urgent, mental health)',
    hospital: '$2,500 copay after ded, 1 admit/family/yr, up to 5 days',
    surgery:
      'OP facility $750 copay after ded, 3/family/yr, elective excluded; IP via hospital row',
    er: '$250 copay after ded, 3/family/yr',
    rx: 'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered'
  },
  'smart-choice-3000': {
    deductible: '$3,000 ind / $6,000 fam; OOP $9,200 / $18,400',
    primary_care: '$40 copay, 7 visits/yr',
    specialist: '$50 copay, 7 visits/yr',
    urgent_care: '$60 copay, 3 visits/yr',
    telehealth: '$0 copay (PCP, urgent, mental health)',
    hospital: '$2,500 copay after ded, 1 admit/family/yr, up to 4 days',
    surgery:
      'OP facility $750 copay after ded, 2/family/yr, elective excluded; IP via hospital row',
    er: '$250 copay after ded, 2/family/yr',
    rx: 'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered'
  },
  'smart-choice-3500': {
    deductible: '$3,500 ind / $7,000 fam; OOP $9,200 / $18,400',
    primary_care: '$40 copay, 5 visits/yr',
    specialist: '$50 copay, 5 visits/yr',
    urgent_care: '$60 copay, 2 visits/yr',
    telehealth: '$0 copay (PCP, urgent, mental health)',
    hospital: '$2,500 copay after ded, 1 admit/family/yr, up to 3 days',
    surgery:
      'OP facility $750 copay after ded, 1/family/yr, elective excluded; IP via hospital row',
    er: '$250 copay after ded, 1/family/yr',
    rx: 'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered'
  },
  goodlifewbchoice: {
    deductible: '$0 (none)',
    primary_care: 'You pay $60, plan pays up to $100, 5 visits/yr',
    specialist: 'You pay $75, plan pays up to $125, 3 visits/yr',
    urgent_care: 'You pay $75, plan pays up to $75, 2 visits/yr',
    telehealth: 'Not covered',
    hospital: '$1,500/day, 10 days/yr',
    surgery:
      'Tiered schedule $250-$25,000 (7 tiers); asst surgeon 20%, anesthesia 30%',
    er: '$750/visit, 1/yr',
    rx: 'Not covered (all Rx excluded)',
    pre_existing: '12/12, hospital and surgery only',
    waiting_period: '30 days sickness; accidents day 1'
  },
  goodlifewbselect: {
    deductible: '$0 (none)',
    primary_care: 'You pay $50, plan pays up to $150, 8 visits/yr',
    specialist: 'You pay $75, plan pays up to $150, 3 visits/yr',
    urgent_care: 'You pay $75, plan pays up to $125, 3 visits/yr',
    telehealth: 'Not covered',
    hospital: '$2,500/day, 10 days/yr',
    surgery:
      'Tiered schedule $500-$50,000 (7 tiers); asst surgeon 20%, anesthesia 30%',
    er: '$750/visit, 3/yr',
    rx: 'Not covered (all Rx excluded)',
    pre_existing: '12/12, hospital and surgery only',
    waiting_period: '30 days sickness; accidents day 1'
  },
  harborstmessential: {
    deductible:
      'Ded $2,500/$5,000/$7,500/$10,000; coins 30/20/0%; coins OOP max $5,000; period max $750,000',
    primary_care: '$50 copay, 3 visits (in-network only)',
    specialist: '$50 copay, 3 visits (in-network only)',
    urgent_care: '$50 copay, 3 visits (in-network only)',
    surgery: 'IP ded/coins / OP $500 access fee then ded/coins',
    er: '$500 access fee per admission, then ded/coins',
    rx: 'Optional Rx rider: generic $25 copay; brand/specialty $500 Rx ded then coins; $5,000 max',
    pre_existing:
      'Not covered; limits reapply each new coverage period; optional Pre-Ex rider (not in OH)'
  },
  harborstmaccess: {
    deductible:
      'Ded $2,500/$5,000/$7,500/$10,000; coins 30/20/0%; coins OOP max $5,000; period max $1,000,000',
    primary_care: '$40 copay, 3 visits (in-network only)',
    specialist: '$40 copay, 3 visits (in-network only)',
    urgent_care: '$40 copay, 3 visits (in-network only)',
    surgery: 'IP ded/coins / OP No access fee; ded/coins',
    er: 'No access fee; ded/coins',
    rx: 'Optional Rx rider: generic $25 copay; brand/specialty $500 Rx ded then coins; $5,000 max',
    pre_existing:
      'Not covered; limits reapply each new coverage period; optional Pre-Ex rider (not in OH)'
  },
  harborstmsecure: {
    deductible:
      'Ded $2,500/$5,000/$7,500/$10,000; coins 30/20/0%; coins OOP max $5,000; period max $1,500,000',
    primary_care: '$40 copay, unlimited (in-network only)',
    specialist: '$40 copay, unlimited (in-network only)',
    urgent_care: '$40 copay, unlimited (in-network only)',
    surgery: 'IP ded/coins / OP No access fee; ded/coins',
    er: 'No access fee; ded/coins',
    rx: 'Optional Rx rider: generic $25 copay; brand/specialty $500 Rx ded then coins; $5,000 max',
    pre_existing:
      'Not covered; limits reapply each new coverage period; optional Pre-Ex rider (not in OH)'
  },
  'pinnacle-stm-traditional': {
    deductible:
      'Ded $500-$10,000; coins 50/50 or 80/20; OOP max $5,000; period max $1,000,000',
    primary_care: '$50 copay',
    hospital: 'Average standard room rate, ded/coins',
    icu: 'Average standard room rate',
    surgery: 'IP ded/coins / OP $500 deductible per surgery (max 3)',
    er: '$500 ER deductible per visit (max 3), then ded/coins',
    rx: 'Excluded except Dr-administered; AWA Rx discount (Clever Rx)',
    pre_existing: 'Excluded first 12 mo, 60-mo lookback (may vary by state)',
    waiting_period: 'Injury none; sickness 5 days; cancer 30 days'
  },
  'afrp-galena-stm-economy': {
    deductible:
      'Ded $5,000/$7,500/$10,000; plan pays 50/70/80%; coins max $5,000/$10,000; period max $500,000',
    primary_care: '$40 copay (not marked copay-only)',
    specialist: '$60 copay (not marked copay-only)',
    urgent_care: '$60 copay (not marked copay-only)',
    hospital: 'Up to $1,500/day (Standard Room & ICU row)',
    icu: 'Up to $1,500/day (shared row with room)',
    surgery:
      'IP $2,000/surgery, 1/term / OP $2,000, 1/term / office $1,000, 1/term',
    er: 'Accident $500 copay; sickness $750 copay',
    rx: 'Outpatient Rx not insured; ReviveHealth membership: $0 urgent care meds, $0 maintenance meds home delivery, up to 80% discount card',
    pre_existing: 'Excluded; 12-month lookback',
    waiting_period: 'Injury next day; sickness 5 days; cancer 30 days'
  },
  'afrp-galena-stm-standard': {
    deductible:
      'Ded $2,500/$5,000/$7,500/$10,000; plan pays 50/70/80%; coins max $5,000/$10,000; period max $1,000,000',
    primary_care: '$40 copay (copay-only, no ded)',
    specialist: '$60 copay (copay-only, no ded)',
    urgent_care: '$60 copay (not marked copay-only)',
    hospital: 'Up to $2,500/day (Standard Room & ICU row)',
    icu: 'Up to $2,500/day (shared row with room)',
    surgery:
      'IP $4,000/surgery, 2/term / OP $4,000, 1/term / office $1,000, 2/term',
    er: 'Accident $500 copay; sickness $750 copay',
    rx: 'Outpatient Rx not insured; ReviveHealth membership: $0 urgent care meds, $0 maintenance meds home delivery, up to 80% discount card',
    pre_existing: 'Excluded; 12-month lookback',
    waiting_period: 'Injury next day; sickness 5 days; cancer 30 days'
  },
  'afrp-galena-stm-elite': {
    deductible:
      'Ded $2,500/$5,000/$7,500/$10,000; plan pays 50/70/80%; coins max $2,500/$5,000/$10,000; period max $2,000,000',
    primary_care: '$30 copay (copay-only, no ded)',
    specialist: '$45 copay (copay-only, no ded)',
    urgent_care: '$60 copay (copay-only, no ded)',
    hospital: 'Up to $3,000/day (Standard Room & ICU row)',
    icu: 'Up to $3,000/day (shared row with room)',
    surgery:
      'IP $8,000/surgery, 3/term / OP $8,000, 2/term / office $1,000, 3/term',
    er: 'Accident $500 copay; sickness $750 copay',
    rx: 'Outpatient Rx not insured; ReviveHealth membership: $0 urgent care meds, $0 maintenance meds home delivery, up to 80% discount card',
    pre_existing: 'Excluded; 12-month lookback',
    waiting_period: 'Injury next day; sickness 5 days; cancer 30 days'
  },
  'smarthealth-stm-limited': {
    deductible:
      'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
    primary_care: '$25 copay, max 2 (then ded/coins)',
    specialist: '$40 copay, max 2',
    urgent_care: '$25 copay, max 2 (shared with office)',
    hospital: 'Up to $1,500/day',
    icu: 'Up to $2,000/day',
    surgery:
      'Up to $5,000/surgery, $10,000/period; OP facility up to $1,500/day',
    er: 'Ded/coins, up to $250/visit; no addl ER ded (waived if admitted 24h)',
    rx: 'Outpatient Rx excluded; NCE Rx discount card',
    pre_existing:
      'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
    waiting_period: 'Injury none; sickness 5 days; cancer 30 days'
  },
  'smarthealth-stm-traditional': {
    deductible:
      'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
    primary_care: '$25 copay, max 2 (then ded/coins)',
    specialist: '$40 copay, max 2',
    urgent_care: '$25 copay, max 2 (shared with office)',
    hospital: 'Ded/coins',
    icu: 'Ded/coins',
    surgery: 'IP and OP ded/coins',
    er: 'Ded/coins; no addl ER ded',
    rx: 'Outpatient Rx excluded; NCE Rx discount card',
    pre_existing:
      'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
    waiting_period: 'Injury none; sickness 5 days; cancer 30 days'
  },
  'access-health-stm-traditional': {
    deductible:
      'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
    primary_care: '$15 copay, unlimited',
    specialist: '$25 copay, unlimited',
    urgent_care: '$15 copay, unlimited (+$100 urgent care deductible, 1/yr)',
    telehealth: 'MyTelemedicine via NCE membership (cost not printed)',
    hospital: 'Subject to deductible + coinsurance',
    icu: 'Subject to deductible + coinsurance',
    surgery: 'Subject to deductible + coinsurance',
    er: 'Deductible + coinsurance after $250 ER deductible (1/yr); waived if admitted in 24 hrs',
    rx: 'Outpatient Rx excluded; NCE Rx discount card',
    pre_existing:
      'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
    waiting_period: 'Injury none; sickness 5 days; cancer 30 days'
  },
  'access-health-stm-lite': {
    deductible:
      'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
    primary_care: '$25 copay, max 2 visits',
    specialist: '$40 copay, max 2 visits',
    urgent_care: '$25 copay, max 2 visits',
    telehealth: 'MyTelemedicine via NCE membership (cost not printed)',
    rx: 'Outpatient Rx excluded; NCE Rx discount card',
    pre_existing:
      'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
    waiting_period: 'Injury none; sickness 5 days; cancer 30 days'
  },
  'allstate-enhanced-stm-ppo': {
    deductible:
      'Ded $2.5k-$25k (9 designs); coins 0/20/50%; coins OOP $0 or $5k; period max $1,000,000',
    primary_care: 'Ded/coins (incl preventive)',
    specialist: 'Ded/coins',
    urgent_care: '$50 access fee, ded waived, then coins',
    hospital: 'Ded/coins',
    surgery: 'Ded/coins (OP surgeon/anesthesia in OP services)',
    er: '$250 access fee (waived if admitted), then ded/coins'
  },
  'allstate-copay-enhanced-stm-ppo': {
    deductible: 'Ded $6k or $8k; coins 0%; coins OOP $0; period max $5,000,000',
    primary_care:
      '$40 copay; visits: <=6 mo single 1/family 3, >6 mo single 2/family 4',
    specialist: '$60 copay (same visit limits)',
    urgent_care: '$50 access fee, ded waived, then coins',
    hospital: 'Ded/coins',
    surgery: 'Ded/coins (OP surgeon/anesthesia in OP services)',
    er: '$250 access fee (waived if admitted), then ded/coins',
    rx: '$10 generic copay; $3,000 max'
  },
  'allstate-essentials-stm-ppo': {
    deductible:
      'Ded $5k/$10k/$25k; coins 40%; coins OOP $7.5k; period max $250,000',
    primary_care: 'Ded/coins (incl preventive)',
    specialist: 'Ded/coins',
    urgent_care: '$50 access fee, ded waived, then coins',
    hospital: 'Ded/coins',
    surgery: 'Ded/coins; OP services $15,000 limit',
    er: '$250 access fee (waived if admitted), then ded/coins'
  },
  'harmony-care-plus-100a': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '- (dash as printed)',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-plus-100': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-plus-200': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$400/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-plus-200-plus': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$400/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-plus-300': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$300/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$750/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-plus-500': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$500/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$1,000/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-plus-750': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$750/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$1,500/day, max 3 days/yr',
    er: '$75/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-plus-1000': {
    primary_care: '$75/day, max 5 days/yr',
    specialist: '$75/day, max 5 days/yr',
    hospital: '$1,000/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '$100/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-100a': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '- (dash as printed)',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-100': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-200': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-200-plus': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$400/day, max 3 days/yr',
    er: '$50/day, max 2 days/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-300': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$300/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$400/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-500': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$500/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$750/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-750': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$750/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$1,000/day, max 3 days/yr',
    er: '$75/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'sigma-care-plus-1000': {
    primary_care: '$75/day, max 5 days/yr',
    specialist: '$75/day, max 5 days/yr',
    hospital: '$1,000/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '$1,500/day, max 3 days/yr',
    er: '$100/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-100a': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '- (dash as printed)',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-100': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-200': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '- (dash as printed)',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-200-plus': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '50%/day, max 3 days/yr',
    er: '$50/day, max 2 days/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-300': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$300/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '50%/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-500': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$500/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '70%/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-750': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    hospital: '$750/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '80%/day, max 3 days/yr',
    er: '$75/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'health-choice-silver-1000': {
    primary_care: '$75/day, max 5 days/yr',
    specialist: '$75/day, max 5 days/yr',
    hospital: '$1,000/day, max 30 days/yr',
    icu: '- (dash as printed)',
    surgery: '100%/day, max 3 days/yr',
    er: '$100/day, max 1 day/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)',
    pre_existing: 'No coverage 12 mo after effective date (FirstEnroll Terms)',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-100a': {
    primary_care: '$50/day; PCP+specialist combined max 3 days/yr',
    specialist: '$50/day; PCP+specialist combined max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    surgery: '- (dash on FirstEnroll Info page)',
    er: '- (dash on FirstEnroll Info page)',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness; none for injury'
  },
  'harmony-care-100b': {
    primary_care: '$50/day; PCP+specialist combined max 3 days/yr',
    specialist: '$50/day; PCP+specialist combined max 3 days/yr',
    hospital: '$100/day, max 30 days/yr',
    surgery: '- (dash on FirstEnroll Info page)',
    er: '- (dash on FirstEnroll Info page)'
  },
  'harmony-care-100': {
    primary_care: '$50/day; PCP+specialist combined max 3 days/yr',
    specialist: '$50/day; PCP+specialist combined max 3 days/yr',
    hospital: '$100/day, max 31 days/yr',
    surgery: '- (dash on FirstEnroll Info page)',
    er: '$50/day, max 1 day/yr',
    pre_existing: 'No coverage 12 mo after effective date',
    waiting_period: '30 days for sickness'
  },
  'harmony-care-200': {
    primary_care: '$50/day; PCP+specialist combined max 5 days/yr',
    specialist: '$50/day; PCP+specialist combined max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    surgery: '- (dash on FirstEnroll Info page)',
    er: '$50/day, max 1 day/yr'
  },
  'harmony-care-200-plus': {
    primary_care: '$50/day; PCP+specialist combined max 5 days/yr',
    specialist: '$50/day; PCP+specialist combined max 5 days/yr',
    hospital: '$200/day, max 30 days/yr',
    surgery: '$400/day, max 3 days/yr',
    er: '$50/day, max 2 days/yr'
  },
  'harmony-care-300': {
    primary_care: '$50/day; PCP+specialist combined max 5 days/yr',
    specialist: '$50/day; PCP+specialist combined max 5 days/yr',
    hospital: '$300/day, max 30 days/yr',
    surgery: '$400/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr'
  },
  'harmony-care-500': {
    primary_care: '$50/day; PCP+specialist combined max 5 days/yr',
    specialist: '$50/day; PCP+specialist combined max 5 days/yr',
    hospital: '$500/day, max 30 days/yr',
    surgery: '$750/day, max 3 days/yr',
    er: '$50/day, max 1 day/yr'
  },
  'harmony-care-750': {
    primary_care: '$50/day; PCP+specialist combined max 5 days/yr',
    specialist: '$50/day; PCP+specialist combined max 5 days/yr',
    hospital: '$750/day, max 30 days/yr',
    surgery: '$1,000/day, max 3 days/yr',
    er: '$75/day, max 1 day/yr'
  },
  'harmony-care-1000': {
    primary_care: '$75/day; PCP+specialist combined max 5 days/yr',
    specialist: '$75/day; PCP+specialist combined max 5 days/yr',
    hospital: '$1,000/day, max 30 days/yr',
    surgery: '$1.500 (as printed)/day, max 3 days/yr',
    er: '$100/day, max 1 day/yr'
  },
  'advanced-wellness-plus-100a': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    surgery: '- (dash on FirstEnroll Info page)',
    er: '- (dash on FirstEnroll Info page)',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'advanced-wellness-plus-100': {
    primary_care: '$50/day, max 3 days/yr',
    specialist: '$50/day, max 3 days/yr',
    surgery: '- (dash on FirstEnroll Info page)',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'advanced-wellness-plus-200': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    surgery: '- (dash on FirstEnroll Info page)',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'advanced-wellness-plus-200-plus': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    surgery: '$400/day, max 3 days/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'advanced-wellness-plus-300': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    surgery: '$400/day, max 3 days/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'advanced-wellness-plus-500': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    surgery: '$750/day, max 3 days/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'advanced-wellness-plus-750': {
    primary_care: '$50/day, max 5 days/yr',
    specialist: '$50/day, max 5 days/yr',
    surgery: '$1,000/day, max 3 days/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'advanced-wellness-plus-1000': {
    primary_care: '$75/day, max 5 days/yr',
    specialist: '$75/day, max 5 days/yr',
    surgery: '$1,500/day, max 3 days/yr',
    rx: 'Discount card only (GapAfford Plus, not insurance)'
  },
  'paramount-1': {
    primary_care: "MBR $25 pre-pay; Doctor's Office $50/day, 3 days/yr",
    specialist: 'MBR $50 pre-pay',
    urgent_care: '$125/day, 2 days/yr',
    hospital: 'Day 1 $1,000 (1 day/yr); day 2+ $100/day, max 10 days/yr',
    icu: 'Day 1 $200 (1 day/yr); day 2+ $200/day, max 10 days/yr',
    er: '$200/day, 1 day/yr',
    rx: 'Discount card only (Rx coupon card; HealthWarehouse 30-90% off)',
    pre_existing: '12/12',
    waiting_period: '0 days'
  },
  'paramount-2': {
    primary_care: "MBR $25 pre-pay; Doctor's Office $50/day, 3 days/yr",
    specialist: 'MBR $50 pre-pay',
    urgent_care: '$125/day, 2 days/yr',
    hospital: 'Day 1 $1,000 (1 day/yr); day 2+ $300/day, max 10 days/yr',
    icu: 'Day 1 $200 (1 day/yr); day 2+ $500/day, max 10 days/yr',
    er: '$200/day, 1 day/yr',
    rx: 'Discount card only (Rx coupon card; HealthWarehouse 30-90% off)',
    pre_existing: '12/12',
    waiting_period: '0 days'
  },
  'paramount-3': {
    primary_care: "MBR $25 pre-pay; Doctor's Office $75/day, 3 days/yr",
    specialist: 'MBR $50 pre-pay',
    urgent_care: '$150/day, 2 days/yr',
    hospital: 'Day 1 $1,000 (1 day/yr); day 2+ $300/day, max 10 days/yr',
    icu: 'Day 1 $200 (1 day/yr); day 2+ $300/day, max 10 days/yr',
    surgery: 'IP $1,500 / OP $500 (hospital or ASC)',
    er: '$200/day, 1 day/yr',
    rx: 'Discount card only (Rx coupon card; HealthWarehouse 30-90% off)',
    pre_existing: '12/12',
    waiting_period: '0 days'
  },
  'bwa-americare-2': {
    primary_care: "MBR $25 pre-pay; Physician's Office $50/day, max 3 days",
    specialist: 'MBR $50 pre-pay',
    urgent_care: 'MBR $25 pre-pay; $50/day, max 3 days',
    hospital: 'Admission $750 (max 1 day); confinement $200/day, max 30 days',
    icu: 'ICU admission $1,500 (max 1 day); ICU $350/day, max 30 days',
    surgery: 'IP $500/day (1 day) / OP $300/day (1 day); anesthesia $125/day',
    er: '$200/day, max 2 days',
    rx: 'Discount card only (Rx coupon card; HealthWarehouse 30-90% off)',
    pre_existing: '12/12 pre-existing clause'
  },
  'bwa-americare-3': {
    primary_care: "MBR $25 pre-pay; Physician's Office $50/day, max 3 days",
    specialist: 'MBR $50 pre-pay',
    urgent_care: 'MBR $25 pre-pay; $50/day, max 3 days',
    hospital: 'Admission $1,000 (max 1 day); confinement $300/day, max 30 days',
    icu: 'ICU admission $2,000 (max 1 day); ICU $500/day, max 30 days',
    surgery: 'IP $500/day (1 day) / OP $300/day (1 day); anesthesia $125/day',
    er: '$300/day, max 2 days',
    rx: 'Discount card only (Rx coupon card; HealthWarehouse 30-90% off)',
    pre_existing: '12/12 pre-existing clause'
  },
  'bwa-americare-4': {
    primary_care: "MBR $25 pre-pay; Physician's Office $75/day, max 5 days",
    specialist: 'MBR $50 pre-pay',
    urgent_care: 'MBR $25 pre-pay; $75/day, max 5 days',
    hospital: 'Admission $2,000 (max 1 day); confinement $500/day, max 30 days',
    icu: 'ICU admission $2,000 (max 1 day); ICU $500/day, max 30 days',
    surgery: 'IP $750/day (1 day) / OP $400/day (1 day); anesthesia $300/day',
    er: '$500/day, max 2 days',
    rx: 'Discount card only (Rx coupon card; HealthWarehouse 30-90% off)',
    pre_existing: '12/12 pre-existing clause'
  },
  'pinnacle-protect-2': {
    primary_care: '$60, 2 visits/yr',
    urgent_care: '$50, 2 days/yr',
    hospital:
      'Admission $400 (2/yr); $500/day, 10 days/confinement, 30 days/yr',
    icu: '$500/day, 10 days/confinement, 30 days/yr',
    surgery:
      'IP or OP $500 (1 day/yr); OP surgery $500 (1 day/yr); anesthesia 25%',
    er: '$300, 1 day/yr',
    pre_existing: '12/12 pre-existing clause',
    waiting_period:
      'Critical illness 30 days; others per schedule (not on file)'
  },
  'pinnacle-protect-3': {
    primary_care: '$60, 3 visits/yr',
    urgent_care: '$50, 2 days/yr',
    hospital:
      'Admission $1,250 (2/yr); $1,500/day, 10 days/confinement, 30 days/yr',
    icu: '$1,000/day, 10 days/confinement, 30 days/yr',
    surgery:
      'IP or OP $2,000 (1 day/yr); OP surgery $1,000 (1 day/yr); anesthesia 25%',
    er: '$500, 1 day/yr',
    pre_existing: 'May apply (no period stated)',
    waiting_period: 'Critical illness 30 days'
  },
  'pinnacle-protect-4': {
    primary_care: '$75, 3 visits/yr',
    urgent_care: '$50, 2 days/yr',
    hospital:
      'Admission $2,000 (2/yr); $3,000/day, 10 days/confinement, 30 days/yr',
    icu: '$1,500/day, 10 days/confinement, 30 days/yr',
    surgery:
      'IP or OP $3,000 (1 day/yr); OP surgery $1,500 (1 day/yr); anesthesia 25%',
    er: '$1,000, 1 day/yr',
    pre_existing: 'May apply (no period stated)',
    waiting_period: 'Critical illness 30 days'
  },
  'allstate-health-access-value': {
    deductible: '$0',
    primary_care: 'Office visit $100, 4 days',
    urgent_care: '$200, 2 days',
    hospital: 'Admission $6,000 (1 day); confinement $100, unlimited days',
    icu: '$100, 60 days (sickness or injury)',
    surgery:
      'Tier 1 $8,000 (2) / Tier 2 $3,000 (2) / OP $3,000 (2) / ASC $500 (2)',
    er: '$250, 1 day',
    pre_existing: '12 months after effective date (12-month lookback)',
    waiting_period: '3 months (preventive)'
  },
  'allstate-health-access-core': {
    deductible: '$0',
    primary_care: 'Office visit $150, 7 days',
    urgent_care: '$150, 3 days',
    hospital:
      'Admission $2,000 (2 days); sickness $3,000, unlimited; injury Yr1 $4,000 / Yr2 $6,000 / Yr3 $8,000, unlimited',
    icu: '$5,000, 60 days (sickness or injury)',
    surgery:
      'Tier 1 $9,000 (3) / Tier 2 $4,000 (3) / OP $4,000 (2) / ASC $500 (2)',
    er: '$300, 2 days',
    pre_existing: '12 months after effective date (12-month lookback)',
    waiting_period: '3 months (preventive)'
  },
  'allstate-health-access-plus': {
    deductible: '$0',
    primary_care: 'Office visit $175, 10 days',
    urgent_care: '$200, 4 days',
    hospital:
      'Admission $2,000 (3 days); sickness $4,000, unlimited; injury Yr1 $6,000 / Yr2 $9,000 / Yr3 $12,000, unlimited',
    icu: '$6,000, 60 days (sickness or injury)',
    surgery:
      'Tier 1 $10,000 (4) / Tier 2 $5,000 (4) / OP $5,000 (3) / ASC $500 (3)',
    er: '$300, 3 days',
    pre_existing: '12 months after effective date (12-month lookback)',
    waiting_period: '3 months (preventive)'
  }
};

// Tiers that have no profile file of their own load the shared one.
var PD_TIER_PROFILE = {
  'allstate-health-access-value': 'allstate-health-access',
  'allstate-health-access-core': 'allstate-health-access',
  'allstate-health-access-plus': 'allstate-health-access'
};

var PD_SHORT_SECTIONS = [
  { title: 'Costs', keys: [['deductible', 'Deductible and cost sharing']] },
  {
    title: 'Doctor visits',
    keys: [
      ['primary_care', 'Primary care'],
      ['specialist', 'Specialist'],
      ['urgent_care', 'Urgent care'],
      ['telehealth', 'Telemedicine']
    ]
  },
  {
    title: 'Hospital',
    keys: [
      ['hospital', 'Hospital stay'],
      ['icu', 'ICU'],
      ['surgery', 'Surgery'],
      ['er', 'Emergency room']
    ]
  },
  { title: 'Prescriptions', keys: [['rx', 'Prescriptions']] },
  {
    title: 'Disclose',
    warn: true,
    keys: [
      ['pre_existing', 'Pre-existing'],
      ['waiting_period', 'Waiting period']
    ]
  }
];

function _pdShortValues(plan) {
  var tier = _pdSelectedTier(plan);
  if (tier && PD_SHORT_VALUES[tier.id]) return PD_SHORT_VALUES[tier.id];
  if (plan && PD_SHORT_VALUES[plan.id]) return PD_SHORT_VALUES[plan.id];
  return null;
}

function _pdKeyValueHtml(text) {
  var m = String(text).match(/^((?:[^,;(]|,(?=\d)){1,26})([,;]\s+|\s+\()(.*)$/);
  if (!m) return '<span class="pv-kv-big">' + escHTML(text) + '</span>';
  return (
    '<span class="pv-kv-big">' +
    escHTML(m[1]) +
    '</span> <span class="pv-kv-note">' +
    escHTML((m[2].indexOf('(') !== -1 ? '(' : '') + m[3]) +
    '</span>'
  );
}

function _pdShortSectionsHtml(short) {
  var html = '';
  var rows = '';
  var warn = '';
  var s;
  var i;
  var key;
  var text;
  for (s = 0; s < PD_SHORT_SECTIONS.length; s++) {
    for (i = 0; i < PD_SHORT_SECTIONS[s].keys.length; i++) {
      key = PD_SHORT_SECTIONS[s].keys[i];
      text = short[key[0]];
      if (!text || /^not listed/i.test(text)) continue;
      if (PD_SHORT_SECTIONS[s].warn) {
        warn +=
          '<div class="pv-warn-line"><b>' +
          escHTML(key[1]) +
          ':</b> ' +
          escHTML(text) +
          '</div>';
      } else {
        rows +=
          '<div class="pv-kv"><span class="pv-kv-k">' +
          escHTML(key[0] === 'deductible' ? 'Deductible' : key[1]) +
          '</span><span class="pv-kv-v">' +
          _pdKeyValueHtml(text) +
          '</span></div>';
      }
    }
  }
  if (rows) html += '<div class="pv-kvs">' + rows + '</div>';
  if (warn) html += '<div class="pv-warns">' + warn + '</div>';
  return html;
}

// Plans list (Oct 2026 option C): one row per plan with type, network and
// platform; the plan opens in place under its row.
var PD_NETWORK_SHORT = {
  goodhealth13: 'First Health',
  goodhealth45: 'First Health',
  ghdpwellness: 'First Health',
  tdk13: 'First Health',
  tdk45: 'First Health',
  smartchoice: 'First Health',
  goodlifewbchoice: 'First Health',
  goodlifewbselect: 'First Health',
  harmonycare: 'First Health LBP',
  harmonycareseries: 'First Health LBP',
  advancedwellnessplus: 'First Health LBP',
  sigmacare: 'First Health LBP',
  allstatehealthaccess: 'First Health',
  pinnacle: 'PHCS',
  smarthealth: 'PHCS',
  accesshealth: 'PHCS',
  bwaamericare: 'PHCS',
  pinnacleprotect: 'MultiPlan',
  healthchoicesilver: 'MultiPlan',
  galena: 'First Health + MultiPlan',
  simpleshield: 'First Health + MultiPlan',
  harborstmessential: 'Cigna PPO',
  harborstmaccess: 'Cigna PPO',
  harborstmsecure: 'Cigna PPO',
  allstatestm: 'Aetna Open Choice PPO',
  bwapara: 'No network (MBR)'
};

var PD_TYPE_LABEL = {
  MEC: 'MEC',
  STM: 'Short-term medical',
  Limited: 'Limited benefit',
  'Limited medical': 'Limited medical'
};

var policyDocPlatform = 'All';

function _pdHasFact(value) {
  if (value == null) return false;
  var text = String(value).replace(/^\s+|\s+$/g, '');
  if (!text) return false;
  if (text === '-' || text === '\u2014' || text === '\u2013') return false;
  return true;
}

function _pdFilteredPlans() {
  return _pdAllDocs().filter(function (p) {
    if (!_pdIsDisplayablePlan(p)) return false;
    // Plans tab filter (Oct 2026): "Limited" also covers "Limited medical".
    var groupOk =
      policyDocFilter === 'All' ||
      p.group === policyDocFilter ||
      (policyDocFilter === 'Limited' && p.group === 'Limited medical');
    if (!groupOk) return false;
    if (
      policyDocPlatform !== 'All' &&
      (PD_PLATFORM[p.id] === 'NEO' ? 'NEO' : 'FE') !== policyDocPlatform
    ) {
      return false;
    }
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
  var docs = _pdAllDocs();
  for (i = 0; i < docs.length; i++) {
    if (docs[i].id === id) return docs[i];
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

function _pdIndemnityFacts(profile) {
  var html = '';
  var i;
  var text;
  if (!profile) return '';
  for (i = 0; i < PD_INDEMNITY_SLOTS.length; i++) {
    text = _pdVerifiedLeaf(profile, PD_INDEMNITY_SLOTS[i][1]);
    html += _pdFactRow(PD_INDEMNITY_SLOTS[i][0], text);
  }
  if (!html) return '';
  return (
    '<div class="pv-indemnity"><div class="pv-indemnity-label">Indemnity</div>' +
    html +
    '</div>'
  );
}

var PD_KEY_TERM_SLOTS = [
  ['Facility payment limit', 'cost_sharing.ucr_cap'],
  ['MEC / ACA status', 'compliance.mec_status'],
  ['Prescription drugs generic', 'benefits.rx_generic'],
  ['Prescription drugs brand', 'benefits.rx_brand'],
  ['Prescription drugs specialty', 'benefits.rx_specialty'],
  ['Wellness', 'benefits.wellness'],
  ['Preventive', 'benefits.preventive'],
  ['Cancellation', 'administration.cancellation']
];

function _pdKeyTermFacts(profile) {
  var html = '';
  var i;
  var text;
  if (!profile) return '';
  for (i = 0; i < PD_KEY_TERM_SLOTS.length; i++) {
    text = _pdVerifiedLeaf(profile, PD_KEY_TERM_SLOTS[i][1]);
    html += _pdFactRow(PD_KEY_TERM_SLOTS[i][0], text);
  }
  if (!html) return '';
  return (
    '<div class="pv-indemnity"><div class="pv-indemnity-label">Key terms</div>' +
    html +
    '</div>'
  );
}

// Plan Vault panel, Oct 2026: verified facts grouped into short sections
// of tiles. Values are the same verified profile leaves as before; only the
// layout changes. A section with no verified facts is not shown.
function _pdSlotByLabel(label) {
  var i;
  for (i = 0; i < PD_FACT_SLOTS.length; i++) {
    if (PD_FACT_SLOTS[i].label === label) return PD_FACT_SLOTS[i];
  }
  return null;
}

function _pdPathSlots(pairs) {
  var out = [];
  var i;
  for (i = 0; i < pairs.length; i++) {
    out.push({ label: pairs[i][0], paths: [pairs[i][1]] });
  }
  return out;
}

function _pdSections() {
  var L = _pdSlotByLabel;
  return [
    {
      title: 'Costs',
      slots: [
        L('Deductible'),
        L('Coinsurance'),
        L('Coinsurance out-of-pocket maximum'),
        L('Coverage period maximum')
      ]
    },
    {
      title: 'Doctor visits',
      slots: [
        L('Primary care'),
        L('Specialist'),
        L('Urgent care'),
        L('Telemedicine')
      ].concat(
        _pdPathSlots([
          ['Preventive', 'benefits.preventive'],
          ['Wellness', 'benefits.wellness']
        ])
      )
    },
    {
      title: 'Hospital',
      slots: _pdPathSlots(PD_INDEMNITY_SLOTS).concat(
        _pdPathSlots([
          ['Emergency room', 'benefits.er'],
          ['Ambulance', 'benefits.ambulance']
        ])
      )
    },
    {
      title: 'Prescriptions',
      slots: _pdPathSlots([
        ['Generic', 'benefits.rx_generic'],
        ['Brand', 'benefits.rx_brand'],
        ['Specialty', 'benefits.rx_specialty']
      ])
    },
    {
      title: 'Disclose',
      warn: true,
      slots: _pdPathSlots([
        ['Pre-existing', 'limitations.pre_existing'],
        ['Waiting period, sickness', 'limitations.waiting_period_sickness'],
        ['Waiting period, other', 'limitations.waiting_period_other']
      ])
    },
    {
      title: 'Who is behind it',
      slots: [
        L('Plan type'),
        L('Network'),
        L('Underwriter'),
        L('Plan administrator'),
        L('Billing administrator'),
        L('Claims administrator'),
        L('Association')
      ]
    },
    {
      title: 'Other',
      slots: [
        L('State availability'),
        L('Coverage term'),
        L('Age limit'),
        L('Pre-certification'),
        L('Member services')
      ].concat(
        _pdPathSlots([
          ['MEC / ACA status', 'compliance.mec_status'],
          ['Facility payment limit', 'cost_sharing.ucr_cap'],
          ['Cancellation', 'administration.cancellation']
        ])
      )
    }
  ];
}

function _pdFactsInner(plan, profile) {
  var html = '';
  var sections = _pdSections();
  var s;
  var i;
  var slot;
  var text;
  var mark;
  var tiles;
  var short = _pdShortValues(plan);
  if (short) {
    html = _pdShortSectionsHtml(short);
    sections = sections.slice(5);
  }
  for (s = 0; s < sections.length; s++) {
    tiles = '';
    for (i = 0; i < sections[s].slots.length; i++) {
      slot = sections[s].slots[i];
      if (!slot) continue;
      text = _pdSlotValue(plan, profile, slot);
      if (!text) continue;
      mark = '';
      if (_pdSlotIsVaultFallback(plan, profile, slot)) {
        mark =
          '<span class="br-ref-card-badge br-ref-card-badge-nc">NOT CONFIRMED</span> ';
      }
      tiles +=
        '<div class="pv-tile' +
        (text.length > 90 ? ' pv-tile-wide' : '') +
        '"><div class="pv-tile-k">' +
        escHTML(slot.label) +
        '</div><div class="pv-tile-v">' +
        mark +
        escHTML(text) +
        '</div></div>';
    }
    if (!tiles) continue;
    html +=
      '<section class="pv-sec' +
      (sections[s].warn ? ' pv-sec-warn' : '') +
      '"><h3 class="pv-sec-title">' +
      escHTML(sections[s].title) +
      '</h3><div class="pv-tiles">' +
      tiles +
      '</div></section>';
  }
  html += _pdCriticalCareFacts(profile);
  return html;
}

function _pdFactsWithMore(plan, profile) {
  var short = _pdShortValues(plan);
  var full = _pdFactsInner(plan, profile);
  var cut;
  if (!short) {
    cut = full.indexOf('<h3 class="pv-sec-title">Who is behind it</h3>');
    if (cut === -1) return full;
    cut = full.lastIndexOf('<section', cut);
    return (
      full.slice(0, cut) +
      '<details class="pv-more"><summary>More details: administrator, states, cancellation</summary>' +
      full.slice(cut) +
      '</details>'
    );
  }
  cut = full.indexOf('<section');
  if (cut === -1) return full;
  return (
    full.slice(0, cut) +
    '<details class="pv-more"><summary>More details: administrator, states, cancellation</summary>' +
    full.slice(cut) +
    '</details>'
  );
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
  brLoadProfile(PD_TIER_PROFILE[profileId] || profileId)
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
    facts.innerHTML = _pdFactsWithMore(plan, profile);
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
  var html = '<div class="pv-open-top">';
  html += _pdTierHtml(plan) || '<span></span>';
  html += '<div class="pv-actions">';
  html += _pdBrochureControls(plan);
  if (scriptIndex >= 0) {
    html +=
      '<button type="button" class="pv-action" data-pv-script="' +
      scriptIndex +
      '">Script</button>';
  }
  html += '</div></div>';
  html += '<div class="pv-facts" id="pv-facts">';
  html += _pdFactsWithMore(plan, null);
  html += '</div>';
  html += '<div id="pv-doc-badge" class="pv-doc-slot"></div>';
  return html;
}

function _pdPlatformTag(plan) {
  var platform = plan ? PD_PLATFORM[plan.id] : '';
  if (!platform) return '';
  return (
    '<span class="pv-plat pv-plat-' +
    (platform === 'NEO' ? 'neo' : 'fe') +
    '">' +
    (platform === 'NEO' ? 'NEO' : 'FE') +
    '</span>'
  );
}

function _pdListHtml(plans) {
  var html = '<div class="pv-rows">';
  var g;
  var i;
  var plan;
  var open;
  for (g = 0; g < PD_GROUPS.length; g++) {
    for (i = 0; i < plans.length; i++) {
      plan = plans[i];
      if (plan.group !== PD_GROUPS[g].key) continue;
      open = plan.id === policyDocOpen;
      html +=
        '<button type="button" class="pv-row' +
        (open ? ' pv-row-open' : '') +
        '" id="pd-' +
        escHTML(plan.id) +
        '" data-pv-id="' +
        escHTML(plan.id) +
        '" aria-expanded="' +
        (open ? 'true' : 'false') +
        '"><span class="pv-row-name">' +
        escHTML(plan.name) +
        '</span><span class="pv-row-type">' +
        escHTML(PD_TYPE_LABEL[plan.group] || plan.group || '') +
        '</span><span class="pv-row-net">' +
        escHTML(PD_NETWORK_SHORT[plan.id] || '') +
        '</span>' +
        _pdPlatformTag(plan) +
        '<span class="pv-row-icon" aria-hidden="true">' +
        (open ? '-' : '+') +
        '</span></button>';
    }
  }
  return html + '</div>';
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
  var rows = document.querySelectorAll('#page-policydocs .pv-row');
  var i;
  var on;
  var icon;
  for (i = 0; i < rows.length; i++) {
    on = rows[i].getAttribute('data-pv-id') === policyDocOpen;
    rows[i].setAttribute('aria-expanded', on ? 'true' : 'false');
    rows[i].className = on ? 'pv-row pv-row-open' : 'pv-row';
    icon = rows[i].querySelector('.pv-row-icon');
    if (icon) icon.textContent = on ? '-' : '+';
  }
  if (!policyDocOpen) return;
  var row = document.getElementById('pd-' + policyDocOpen);
  if (!row || !row.parentNode) return;
  var panel = document.createElement('div');
  panel.className = 'pv-panel pv-row-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Plan details');
  var plan = _pdFindPlan(policyDocOpen);
  panel.innerHTML = _pdDetailHtml(plan);
  if (row.nextSibling) row.parentNode.insertBefore(panel, row.nextSibling);
  else row.parentNode.appendChild(panel);
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
// NEO / FirstEnroll gradient switch, same look as Quick Reference.
function _pdSegHtml() {
  var notes = {
    All: 'NEO bills through Neo Health Solutions. FirstEnroll bills through FirstEnroll.',
    NEO: 'Billing: Neo Health Solutions',
    FE: 'Billing: FirstEnroll'
  };
  return (
    '<div class="qr-seg" role="group" aria-label="Platform">' +
    [
      ['All', 'All plans', 'all'],
      ['NEO', 'NEO', 'neo'],
      ['FE', 'FirstEnroll', 'fe']
    ]
      .map(function (f) {
        var on = f[0] === policyDocPlatform;
        return (
          '<button type="button" class="qr-seg-btn qr-seg-' +
          f[2] +
          (on ? ' is-on' : '') +
          '" aria-pressed="' +
          (on ? 'true' : 'false') +
          '" data-pv-plat="' +
          f[0] +
          '">' +
          f[1] +
          '</button>'
        );
      })
      .join('') +
    '</div><p class="qr-seg-note">' +
    notes[policyDocPlatform] +
    '</p>'
  );
}

function _renderPolicydocsInner() {
  var html = '<div class="pv-page pv-page-list">';
  html += '<div id="pv-seg">' + _pdSegHtml() + '</div>';
  html += '<div class="pv-toolbar">';
  html += '<div class="pv-search-wrap">';
  html +=
    '<input type="text" id="pdSearchInput" class="pv-search" placeholder="Search a plan, benefit or network" value="' +
    escHTML(policyDocSearch) +
    '" aria-label="Search a plan, benefit or network">';
  html +=
    '<button id="pdSearchClear" type="button" class="pv-search-clear" aria-label="Clear plan search"' +
    (policyDocSearch ? '' : ' style="display:none"') +
    '>&times;</button>';
  html += '</div>';
  html +=
    '<select id="pdTypeSelect" class="pv-type-select" aria-label="Plan type">';
  [
    ['All', 'All types'],
    ['MEC', 'MEC'],
    ['STM', 'STM'],
    ['Limited', 'Limited']
  ].forEach(function (f) {
    html +=
      '<option value="' +
      f[0] +
      '"' +
      (f[0] === policyDocFilter ? ' selected' : '') +
      '>' +
      f[1] +
      '</option>';
  });
  html += '</select></div>';
  html += '<div id="pv-list" class="pv-board" aria-label="Plans"></div>';
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
  var seg = document.getElementById('pv-seg');
  if (seg) seg.innerHTML = _pdSegHtml();
  var tabs = document.querySelectorAll(
    '#page-policydocs .pv-filters .stab, #page-allplans .pv-filters .stab'
  );
  var platTabs = document.querySelectorAll(
    '#page-policydocs .pv-plat-filters .stab'
  );
  platTabs.forEach(function (tab) {
    if (tab.getAttribute('data-pv-plat') === policyDocPlatform) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  var filters = [
    'All',
    'MEC',
    'STM',
    'Limited',
    'Limited medical',
    'More plans'
  ];
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
  root.addEventListener('change', function (event) {
    if (event.target && event.target.id === 'pdTypeSelect') {
      policyDocFilter = event.target.value;
      policyDocFilterChanged();
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
    if (node.getAttribute && node.getAttribute('data-pv-plat')) {
      policyDocPlatform = node.getAttribute('data-pv-plat');
      policyDocFilterChanged();
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
      (node.className.indexOf('pv-card') !== -1 ||
        node.className.indexOf('pv-row') !== -1)
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
