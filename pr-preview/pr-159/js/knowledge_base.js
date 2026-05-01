// js/knowledge_base.js
// Centralized local knowledge used by the in-app Brain chat.

var KNOWLEDGE_BASE = {
  plans: {
    'MedFirst 1': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      association: 'VP Limited/TVP',
      deductible: 'NONE',
      primaryCopay: '$25',
      specialistCopay: '$50',
      hospitalBenefit: '$1,000/day, $5,000/year max',
      telemedicine: '$0',
      rx: 'Discount only',
      preExisting: '12/12 rule',
      waitingPeriod: '30 days',
      exclusions: ['Mental health', 'Substance abuse', 'Pregnancy'],
      providerSearch: 'providerlocator.firsthealth.com'
    },
    'MedFirst 2': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      deductible: 'NONE',
      primaryCopay: '$25 (4 visits/yr, $150 max)',
      specialistCopay: '$50 (2 visits/yr, $300 max)',
      hospitalBenefit: '$1,000/day, $10,000/year max',
      rx: 'Generic $0, Preferred $5',
      preventiveCare: 'Fully covered'
    },
    'MedFirst 3': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      deductible: 'NONE',
      primaryCopay: '$25',
      specialistCopay: '$50'
    },
    'MedFirst 4': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      deductible: 'NONE',
      primaryCopay: '$50',
      specialistCopay: '$75',
      requiresSSN: true
    },
    'MedFirst 5': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      deductible: 'NONE',
      primaryCopay: '$50',
      specialistCopay: '$75',
      requiresSSN: true
    },
    'TrueHealth 1-3': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      association: 'VP Limited/TVP',
      deductible: 'NONE',
      primaryCopay: '$25',
      specialistCopay: '$50'
    },
    'GoodHealth 1-3': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      association: 'Good Health Partners',
      deductible: 'NONE',
      primaryCopay: '$25',
      specialistCopay: '$50'
    },
    'GoodHealth 4-5': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'MBA',
      deductible: 'NONE',
      primaryCopay: '$50',
      specialistCopay: '$75',
      requiresSSN: true
    },
    'TDK 1-3': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'Detego Health',
      association: 'Health Care Data Analytics',
      deductible: 'NONE',
      primaryCopay: '$25',
      specialistCopay: '$50',
      requiresSSN: true,
      billing: 'NEO Insurance Solutions'
    },
    'TDK 4-5': {
      type: 'MEC',
      network: 'First Health',
      underwriter: 'Detego Health',
      deductible: 'NONE',
      primaryCopay: '$50',
      specialistCopay: '$75',
      requiresSSN: true
    },
    'GHDP-1': {
      type: 'MEC',
      network: 'First Health',
      deductible: 'NONE',
      primaryCopay: '$25 (3 visits/yr)',
      specialistCopay: '$50 (1 visit/yr)',
      hospitalBenefit: '$1,000/day, $5,000/year max',
      includes: 'Kindly Human peer support 24/7'
    },
    HarmonyCare: {
      type: 'Indemnity',
      network: 'First Health (GapAfford Plus)',
      underwriter: 'Everest/AFSLIC',
      association: 'NCE',
      deductible: 'NONE',
      structure: 'Network repricing + indemnity cash benefits'
    },
    SigmaCare: {
      type: 'Indemnity',
      network: 'MultiPlan',
      underwriter: 'Everest',
      association: 'NCE',
      deductible: 'NONE',
      providerSearch: 'providersearch.multiplan.com'
    },
    Everest: {
      type: 'Indemnity',
      network: 'MultiPlan',
      underwriter: 'AFSLIC',
      association: 'NCE',
      deductible: 'NONE'
    },
    'Health Choice Silver': {
      type: 'Indemnity',
      network: 'MultiPlan',
      underwriter: 'AFSLIC',
      association: 'NCE',
      deductible: 'NONE'
    },
    'BWA Paramount 1-6': {
      type: 'Indemnity',
      network: 'Managed Care Network',
      underwriter: 'BCS Insurance',
      association: 'BWA',
      deductible: 'NONE',
      primaryPrepay: '$25',
      specialistPrepay: '$50'
    },
    'BWA Americare 2-4': {
      type: 'Indemnity',
      network: 'PHCS PPO',
      underwriter: 'ERISA Group Benefits',
      association: 'BWA',
      deductible: 'NONE',
      primaryPrepay: '$25',
      specialistPrepay: '$50'
    },
    'Pinnacle Protect 1-4': {
      type: 'Indemnity',
      network: 'PHCS',
      underwriter: 'Everest',
      association: 'AWA',
      deductible: 'NONE'
    },
    'Access Health STM': {
      type: 'STM',
      network: 'PHCS (MultiPlan)',
      underwriter: 'AFSLIC',
      association: 'NCE',
      coinsurance: '80/20',
      maxOOP: '$2,000 after deductible'
    },
    'SmartHealth STM Traditional': {
      type: 'STM',
      network: 'PHCS',
      underwriter: 'Standard Life',
      association: 'NCE',
      coinsurance: '80/20 or 50/50'
    },
    'Pinnacle STM Traditional': {
      type: 'STM',
      network: 'PHCS (voluntary)',
      underwriter: 'Everest',
      association: 'AWA',
      coinsurance: '80/20 or 50/50'
    },
    'Galena STM Elite': {
      type: 'STM',
      network: 'First Health + MultiPlan',
      underwriter: 'SGIC',
      association: 'AFRP',
      primaryCopay: '$40',
      specialistCopay: '$60'
    },
    'SmartChoice 1500': {
      type: 'STM',
      network: 'First Health EPO',
      underwriter: 'Detego Health',
      deductible: '$1,500'
    },
    'SmartChoice 2500': {
      type: 'STM',
      network: 'First Health EPO',
      underwriter: 'Detego Health',
      deductible: '$2,500'
    },
    'SmartChoice 3000': {
      type: 'STM',
      network: 'First Health EPO',
      underwriter: 'Detego Health',
      deductible: '$3,000'
    },
    'SmartChoice 3500': {
      type: 'STM',
      network: 'First Health EPO',
      underwriter: 'Detego Health',
      deductible: '$3,500'
    }
  },
  vocabulary: {
    premium: {
      definition: 'Monthly payment to keep membership active',
      sayThis: 'Your monthly rate is $___'
    },
    deductible: {
      definition: 'Amount you pay first before plan helps',
      sayThis: 'You pay the first $X,XXX, then the plan kicks in'
    },
    coinsurance: {
      definition: '% split between you and insurance after deductible',
      sayThis: 'The company covers about 80% after that, you cover 20%'
    },
    copay: {
      definition: 'Fixed dollar amount per visit',
      sayThis: "Every time you see the doctor, there's just a $XX copay"
    },
    maxOutOfPocket: {
      definition: 'Maximum you pay per year before plan covers 100%',
      sayThis: "The most you'd ever pay is $X,XXX per year"
    }
  },
  planTypes: {
    MEC: {
      fullName: 'Minimum Essential Coverage',
      hasDeductible: false,
      hasCopays: true,
      hasCoinsurance: false,
      guaranteedIssue: true
    },
    STM: {
      fullName: 'Short-Term Medical',
      hasDeductible: true,
      hasCopays: true,
      hasCoinsurance: true,
      requiresUnderwriting: true
    },
    Indemnity: {
      fullName: 'Fixed Indemnity / Limited Benefit',
      hasDeductible: false,
      hasCopays: false,
      guaranteedIssue: true
    }
  },
  objections: {
    spouse: {
      objection: 'I need to talk to my spouse/partner',
      scripts: [
        "Absolutely - is your partner available right now? I'd love to do a quick three-way and just answer any questions directly.",
        "Let's make sure you feel solid explaining it so it's an easy yes when you talk to them.",
        "I understand you want to talk to your husband/wife but right now there is nothing to talk about yet because we didn't go over how the plan works."
      ]
    },
    price: {
      objection: "It's too expensive / Over my budget",
      scripts: [
        'I hear you on the budget, and that makes complete sense.',
        "Going without coverage doesn't save money - it delays a much bigger financial exposure."
      ]
    }
  },
  compliance: {
    neverSay: [
      {
        wrong: 'Full coverage',
        right: 'Protection for major events, subject to plan limits'
      },
      { wrong: 'ACA compliant', right: 'Private market plan' }
    ],
    mustDisclose: [
      { item: 'Agency name', script: 'Central Health Advisors' },
      {
        item: 'Recording',
        script: 'This call may be recorded for training and quality assurance'
      }
    ]
  },
  conceptual: {
    erVsUrgent:
      'ER: Life-threatening only. Urgent Care: Minor issues. Using UC saves money and gets faster treatment.',
    whatIsPremium:
      "FACT: Monthly subscription to keep membership active. SAY THIS: 'Your monthly rate is $___'",
    whatIsDeductible:
      "FACT: What you pay first before plan helps. SAY THIS: 'You pay the first $X,XXX, then the plan kicks in'",
    whatIsCoinsurance:
      "FACT: % split after deductible. SAY THIS: 'The company covers about 80% after that'",
    whatIsCopay:
      "FACT: Fixed fee per visit. SAY THIS: 'Every time you see the doctor, there's just a $XX copay'",
    whatIsOOP:
      "FACT: Yearly cap. SAY THIS: 'The most you'd ever pay is $X,XXX per year'",
    mecVsStm:
      'MEC: No deductible, copays for doctors, guaranteed issue. STM: Has deductible + coinsurance, requires underwriting.',
    whatIsIndemnity:
      'FACT: Network reduces bill first, then plan pays fixed cash benefits toward remaining balance.',
    preExisting:
      '12/12 rule: Any condition diagnosed in last 12 months has 12-month waiting period.',
    rx: "Most plans include prescription discount card. SAY THIS: 'You'll receive access to a prescription discount program at major pharmacies.'"
  },
  company: {
    name: 'Central Health Advisors',
    customerService: '855-736-1590 (Mon-Fri, 9am-9pm Eastern)',
    confirmationNumber: 'CHA561337'
  }
};
