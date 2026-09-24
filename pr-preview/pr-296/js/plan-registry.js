/*
==================================================
HOW TO ADD A NEW PLAN
==================================================
STEP 1 — Add entry to CHA_PLAN_REGISTRY below
STEP 2 — Add plan data object to POLICY_DOCS in js/plan-data.js
STEP 3 — Add plan script to js/call-playbook.js if needed
STEP 4 — Upload PDF to the knowledge_base/ folder only (served as /knowledge_base/…)
STEP 5 — Commit and push

Plan automatically appears everywhere — chat panel, plan grid,
compare tool, enroll buttons, training mode.

To hide a plan without deleting: set active: false
Plan IDs must match exactly between plan-registry.js and plan-data.js
==================================================
*/

var CHA_PLAN_REGISTRY = [
  {
    id: 'ghdp1',
    name: 'GoodHealth 1 (GHDP-1)',
    type: 'MEC',
    group: 'GoodHealth',
    tier: 1,
    carrier: 'Merchants Benefit Administration (MBA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'MEC_GHDP1_1.pdf',
    active: true
  },
  {
    id: 'ghdp2',
    name: 'GoodHealth 2 (GHDP-2)',
    type: 'MEC',
    group: 'GoodHealth',
    tier: 2,
    carrier: 'Merchants Benefit Administration (MBA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'MEC_GHDP2_1.pdf',
    active: true
  },
  {
    id: 'ghdp3',
    name: 'GoodHealth 3 (GHDP-3)',
    type: 'MEC',
    group: 'GoodHealth',
    tier: 3,
    carrier: 'Merchants Benefit Administration (MBA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'MEC_GHDP3_1.pdf',
    active: true
  },
  {
    id: 'ghdp4',
    name: 'GoodHealth 4 (GHDP-4)',
    type: 'MEC',
    group: 'GoodHealth',
    tier: 4,
    carrier: 'Merchants Benefit Administration (MBA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'MEC_GHDP4_1.pdf',
    active: true
  },
  {
    id: 'ghdp5',
    name: 'GoodHealth 5 (GHDP-5)',
    type: 'MEC',
    group: 'GoodHealth',
    tier: 5,
    carrier: 'Merchants Benefit Administration (MBA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'MEC_GHDP5_2.pdf',
    active: true
  },
  {
    id: 'tdk1',
    name: 'TDK 1',
    type: 'MEC',
    group: 'TDK',
    tier: 1,
    carrier: 'Detego Health LLC (TPA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'TDK_Promo_Combined.pdf',
    active: true
  },
  {
    id: 'tdk2',
    name: 'TDK 2',
    type: 'MEC',
    group: 'TDK',
    tier: 2,
    carrier: 'Detego Health LLC (TPA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'TDK_Promo_Combined.pdf',
    active: true
  },
  {
    id: 'tdk3',
    name: 'TDK 3',
    type: 'MEC',
    group: 'TDK',
    tier: 3,
    carrier: 'Detego Health LLC (TPA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'TDK_Promo_Combined.pdf',
    active: true
  },
  {
    id: 'tdk4',
    name: 'TDK 4',
    type: 'MEC',
    group: 'TDK',
    tier: 4,
    carrier: 'Detego Health LLC (TPA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'TDK_Promo_Combined.pdf',
    active: true
  },
  {
    id: 'tdk5',
    name: 'TDK 5',
    type: 'MEC',
    group: 'TDK',
    tier: 5,
    carrier: 'Detego Health LLC (TPA)',
    network: 'First Health PPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'TDK_Promo_Combined.pdf',
    active: true
  },
  {
    id: 'smartchoice2500',
    name: 'Smart Choice',
    type: 'MEC',
    group: 'Smart Choice',
    tier: 1,
    carrier: 'NEO Insurance Solutions',
    network: 'First Health EPO',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'Smart_Choice_2500_Plan_Doc_2025__.pdf',
    active: true
  },
  {
    id: 'pinnacle',
    name: 'Pinnacle STM',
    type: 'STM',
    group: 'Pinnacle',
    tier: 1,
    carrier: 'Everest Reinsurance Company',
    network: 'PHCS/MultiPlan',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'Pinnacle_STM_Brochure.pdf',
    active: true
  },
  {
    id: 'accesshealth',
    name: 'Access Health STM',
    type: 'STM',
    group: 'Access Health',
    tier: 1,
    carrier: 'SGIC',
    network: 'PHCS/MultiPlan',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'Access_Health_STM.pdf',
    active: true
  },
  {
    id: 'harborstmessential',
    name: 'Harbor STM Essential',
    type: 'STM',
    group: 'Harbor',
    tier: 1,
    carrier:
      'Everest Reinsurance Company, or Everest Denali Insurance Company depending on state',
    network: 'Cigna Healthcare PPO for Shared Administration',
    enrollUrl: '',
    pdfFile: '',
    active: true
  },
  {
    id: 'harborstmaccess',
    name: 'Harbor STM Access',
    type: 'STM',
    group: 'Harbor',
    tier: 1,
    carrier:
      'Everest Reinsurance Company, or Everest Denali Insurance Company depending on state',
    network: 'Cigna Healthcare PPO for Shared Administration',
    enrollUrl: '',
    pdfFile: '',
    active: true
  },
  {
    id: 'harborstmsecure',
    name: 'Harbor STM Secure',
    type: 'STM',
    group: 'Harbor',
    tier: 1,
    carrier:
      'Everest Reinsurance Company, or Everest Denali Insurance Company depending on state',
    network: 'Cigna Healthcare PPO for Shared Administration',
    enrollUrl: '',
    pdfFile: '',
    active: true
  },
  {
    id: 'smarthealth',
    name: 'Smart Health STM',
    type: 'STM',
    group: 'Smart Health',
    tier: 1,
    carrier: 'SGIC',
    network: 'PHCS/MultiPlan',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'SmartHealth_v3.pdf',
    active: true
  },
  {
    id: 'galena',
    name: 'Galena STM Elite / Standard / Economy',
    type: 'STM',
    group: 'Galena',
    tier: 1,
    carrier: 'SGIC',
    network: 'PHCS/MultiPlan',
    enrollUrl: 'https://www.neofirstenroll.com',
    pdfFile: 'NEOSGIC_AFRP_STM_LimitedElite_1.pdf',
    active: true
  },
  {
    id: 'harmonycare',
    name: 'HarmonyCare PLUS',
    type: 'Limited',
    group: 'HarmonyCare',
    tier: 1,
    carrier: 'American Financial Security Life Insurance Co.',
    network: 'MultiPlan',
    enrollUrl: 'https://www.firstenroll.com',
    pdfFile: 'HarmonyCarePLUS_Brochure_8949272987_V3_0625.pdf',
    active: true
  },
  {
    id: 'sigmacare',
    name: 'SigmaCare Plus',
    type: 'Limited',
    group: 'SigmaCare',
    tier: 1,
    carrier: 'American Financial Security Life Insurance Co.',
    network: 'MultiPlan',
    enrollUrl: 'https://www.firstenroll.com',
    pdfFile: 'AFSLIC20_SCP_Brochure_rev.pdf',
    active: true
  },
  {
    id: 'healthchoicesilver',
    name: 'NCE Health Choice Silver',
    type: 'Limited',
    group: 'NCE Health Choice',
    tier: 1,
    carrier: 'American Financial Security Life Insurance Co.',
    network: 'MultiPlan',
    enrollUrl: 'https://www.firstenroll.com',
    pdfFile: 'HealthChoiceSilverBrochure2.pdf',
    active: true
  },
  {
    id: 'everest',
    name: 'Everest Fixed Indemnity',
    type: 'Limited',
    group: 'Everest',
    tier: 1,
    carrier: 'Everest Reinsurance Company',
    network: 'MultiPlan',
    enrollUrl: 'https://www.firstenroll.com',
    pdfFile: 'Everest_Brochure_REV.pdf',
    active: true
  },
  {
    id: 'bwapara',
    name: 'BWA Paramount (MBR)',
    type: 'Limited',
    group: 'BWA',
    tier: 1,
    carrier: 'BCS Insurance',
    network: 'Managed Care / RBP',
    enrollUrl: 'https://www.firstenroll.com',
    pdfFile: 'BCS_Brochure_1.pdf',
    active: true
  },
  {
    id: 'bwaamericare',
    name: 'BWA Americare (2, 3, 4)',
    type: 'Limited',
    group: 'BWA',
    tier: 1,
    carrier: 'American Public Life',
    network: 'PHCS / RBP',
    enrollUrl: 'https://www.firstenroll.com',
    pdfFile: 'BWABrochurePlan2MBRAmericare2_REV.pdf',
    active: true
  },
  {
    id: 'goodlifewbchoice',
    name: 'Goodlife Partners WB Choice',
    type: 'Limited',
    group: 'Goodlife',
    tier: 1,
    carrier:
      'Wellness Brands Management LLC, general partner of Good Life Partners LP',
    network: 'First Health Network, a CVS Health company',
    enrollUrl: '',
    pdfFile: '',
    active: true
  },
  {
    id: 'goodlifewbselect',
    name: 'Goodlife Partners WB Select',
    type: 'Limited',
    group: 'Goodlife',
    tier: 1,
    carrier:
      'Wellness Brands Management LLC, general partner of Good Life Partners LP',
    network: 'First Health Network, a CVS Health company',
    enrollUrl: '',
    pdfFile: '',
    active: true
  }
];

function chaGetPlan(id) {
  for (var i = 0; i < CHA_PLAN_REGISTRY.length; i++) {
    if (CHA_PLAN_REGISTRY[i].id === id) return CHA_PLAN_REGISTRY[i];
  }
  return null;
}

function chaGetPlansByType(type) {
  var result = [];
  for (var i = 0; i < CHA_PLAN_REGISTRY.length; i++) {
    var p = CHA_PLAN_REGISTRY[i];
    if (p.active && (type === 'All' || p.type === type)) result.push(p);
  }
  return result;
}

function chaGetEnrollUrl(planId) {
  var plan = chaGetPlan(planId);
  return plan ? plan.enrollUrl : 'https://www.neofirstenroll.com';
}

function chaGetPlanName(planId) {
  var plan = chaGetPlan(planId);
  return plan ? plan.name : planId;
}

function chaGetPlanNetwork(planId) {
  var plan = chaGetPlan(planId);
  return plan ? plan.network : 'Unknown network';
}

function chaValidateRegistry() {
  var errors = [];
  for (var i = 0; i < CHA_PLAN_REGISTRY.length; i++) {
    var p = CHA_PLAN_REGISTRY[i];
    if (!p.id) errors.push('Plan at index ' + i + ' missing id');
    if (!p.name) errors.push('Plan ' + p.id + ' missing name');
    if (!p.type) errors.push('Plan ' + p.id + ' missing type');
    if (p.enrollUrl == null) errors.push('Plan ' + p.id + ' missing enrollUrl');
    if (!p.network) errors.push('Plan ' + p.id + ' missing network');
  }
  if (errors.length > 0) {
    console.warn('[CHA Registry] Validation errors:', errors);
  }
}

chaValidateRegistry();
