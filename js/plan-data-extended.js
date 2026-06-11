// js/plan-data-extended.js
// Extended plan data — new plans added 2026-04-08
// Do NOT modify plan-data.js — this file extends it safely
// Load AFTER plan-data.js in index.html

(function () {
  var EXTENDED_PLANS = [
    {
      id: 'pinnacleprotect',
      name: 'Pinnacle Protect 1-4',
      group: 'Limited',
      type: 'Limited Benefit / Fixed Indemnity',
      carrier: 'Everest Reinsurance Company',
      network: 'PHCS (Multiplan)',
      assoc: 'American Workers Association (AWA)',
      planNotes:
        'Four tiers (1-4). Guaranteed issue. Fixed cash benefits per covered service. Plan 1 benefit amounts confirmed from SOB; Plans 2-4 are higher tiers -- verify exact amounts in SOB.',
      benefits: [
        {
          category: 'Plan Tiers',
          items: [
            'Plan 1: entry-level fixed benefit amounts (see below)',
            'Plans 2-4: progressively higher benefit amounts -- verify in SOB',
            'All tiers: Guaranteed Issue -- no medical underwriting',
            'All tiers: 12/12 pre-existing condition exclusion',
            'Network: Multiplan PHCS Practitioner and Ancillary'
          ]
        },
        {
          category: 'Hospital (Plan 1 confirmed)',
          items: [
            'Hospital Confinement: $400/day -- 10 days/confinement, 30 days/yr',
            'ICU Confinement: $400/day -- 10 days/confinement, 30 days/yr',
            'Hospital Admission: $400 -- 2 per year',
            'In-Hospital Physician Visit: $50 -- 3 days/yr'
          ]
        },
        {
          category: 'Surgery (Plan 1 confirmed)',
          items: [
            'Inpatient Surgery: $500 -- 1 day/yr',
            'Outpatient Surgery: $500 -- 1 day/yr (shared max)',
            'Outpatient Surgery Center: $500 -- 1 day/yr',
            'Anesthesia: 25% of surgery benefit'
          ]
        },
        {
          category: 'Outpatient (Plan 1 confirmed)',
          items: [
            'Physician Office: $50 -- 2 per year',
            'Urgent Care: $50 -- 1 per year',
            'Emergency Room: $100 -- 1 per year',
            'Lab: $30 -- 2 per year',
            'X-Ray: $25 -- 2 per year',
            'Advanced Diagnostic: $250 -- 1 per year',
            'Blood Products: $35 -- 3 per year',
            'Wellness: $75 -- 1 per year'
          ]
        },
        {
          category: 'Plan Structure',
          items: [
            'Fixed cash benefits -- NOT full bill coverage',
            'Benefits paid directly -- member responsible for balance',
            '12/12 pre-existing condition exclusion',
            'Guaranteed issue -- no health questions'
          ]
        }
      ],
      limitations: [
        'NOT ACA-compliant major medical',
        'Fixed dollar amounts -- not full bill payment',
        '12/12 pre-existing condition exclusion',
        'Plans 2-4 benefit amounts -- verify in SOB',
        'No maternity coverage'
      ],
      waitingPeriods: ['30-day waiting period for sickness'],
      preEx: '12-month look-back / 12-month exclusion',
      source: 'pinnical_protect_1.pdf',
      rawText:
        'Pinnacle Protect 1 2 3 4 limited fixed benefit PHCS Multiplan Everest AWA guaranteed issue four tiers hospital confinement surgery outpatient physician urgent care ER lab xray 12 12 pre-existing not ACA not major medical'
    },
    {
      id: 'pinnaclecriticalcare',
      name: 'Pinnacle Critical Care 1-4',
      group: 'Limited',
      type: 'Limited Benefit / Fixed Indemnity',
      carrier: 'Everest Reinsurance Company',
      network: 'PHCS (Multiplan)',
      assoc: 'American Workers Association (AWA)',
      planNotes:
        'Four tiers (1-4). Critical care supplement -- designed as add-on to STM or other coverage. Verify exact benefit amounts per tier in SOB.',
      benefits: [
        {
          category: 'Plan Overview',
          items: [
            'Four tiers (1-4) with progressively higher benefit amounts',
            'Critical illness and hospital-level event coverage',
            'Designed as supplement to STM or other primary coverage',
            'Network: PHCS Multiplan',
            'Verify exact tier benefit amounts in SOB'
          ]
        },
        {
          category: 'Plan Structure',
          items: [
            'Fixed cash benefits -- NOT full bill coverage',
            '12/12 pre-existing condition exclusion',
            'Guaranteed issue -- no medical underwriting'
          ]
        }
      ],
      limitations: [
        'NOT ACA-compliant major medical',
        'Supplement plan -- not standalone coverage',
        'Fixed dollar amounts -- not full bill payment',
        '12/12 pre-existing condition exclusion',
        'Verify exact benefit amounts per tier in SOB'
      ],
      waitingPeriods: ['30-day waiting period for sickness'],
      preEx: '12-month look-back / 12-month exclusion',
      source: 'pinnical_protect_1.pdf',
      rawText:
        'Pinnacle Critical Care 1 2 3 4 limited fixed benefit PHCS Multiplan Everest AWA critical illness supplement four tiers 12 12 pre-existing not ACA not major medical'
    },
    {
      id: 'allstatestm',
      name: 'Allstate STM (Enhanced / Copay Enhanced / Essentials)',
      group: 'STM',
      type: 'STM',
      carrier: 'Allstate / NEO Insurance Solutions',
      network: 'PPO Network',
      assoc: 'NEO Insurance Solutions',
      planNotes:
        'Three tiers: Enhanced, Copay Enhanced, Essentials. All are short-term medical PPO plans underwritten by Allstate. Billed through NEO Insurance Solutions.',
      benefits: [
        {
          category: 'Plan Tiers',
          items: [
            'Enhanced STM: deductible options $2,500 / $5,000 / $7,500 / $10,000 / $25,000',
            'Copay Enhanced STM: deductible options $6,000 or $8,000 -- 0% coinsurance after deductible',
            'Essentials STM: deductible options $5,000 / $10,000 / $25,000 -- 40% coinsurance'
          ]
        },
        {
          category: 'Coverage Maximums',
          items: [
            'Enhanced STM: $1,000,000 coverage period maximum',
            'Copay Enhanced STM: $5,000,000 coverage period maximum',
            'Essentials STM: $250,000 coverage period maximum'
          ]
        },
        {
          category: 'Office Visits',
          items: [
            'Enhanced STM: subject to deductible and coinsurance',
            'Copay Enhanced STM: $40 PCP / $60 Specialist copay including preventive',
            'Essentials STM: subject to deductible and coinsurance'
          ]
        },
        {
          category: 'Emergency Room',
          items: [
            'All tiers: $250 access fee (waived if admitted)',
            'Enhanced / Essentials: remaining subject to deductible and coinsurance',
            'Copay Enhanced: remaining subject to deductible only'
          ]
        },
        {
          category: 'Urgent Care',
          items: [
            'All tiers: $50 access fee -- deductible waived, remaining subject to coinsurance'
          ]
        },
        {
          category: 'Prescriptions',
          items: [
            'Enhanced / Essentials: subject to deductible and coinsurance',
            'Copay Enhanced: $10 copay on generic drugs -- $3,000 maximum benefit'
          ]
        },
        {
          category: 'Other Benefits',
          items: [
            'All tiers: Child immunizations covered first dollar (no deductible)',
            'All tiers: PT/OT/ST rehab -- 30-visit limit',
            'Joint/spine/connective tissue: $5,000 limit (Enhanced/Copay) -- $15,000 limit (Essentials)',
            'Out-of-network: deductibles doubled on all tiers'
          ]
        },
        {
          category: 'Plan Structure',
          items: [
            'Short-term medical -- not ACA-compliant',
            'PPO network -- out-of-network coverage available at higher cost',
            'Billed through NEO Insurance Solutions',
            '12/12 pre-existing condition exclusion'
          ]
        }
      ],
      limitations: [
        'NOT ACA-compliant major medical',
        'Short-term plan -- coverage period limits apply',
        'No maternity, mental health, or substance abuse coverage',
        '12/12 pre-existing condition exclusion',
        'Essentials: 40% coinsurance and $250,000 max -- lowest tier',
        'Out-of-network deductibles doubled'
      ],
      waitingPeriods: ['30-day waiting period for sickness'],
      preEx: '12-month look-back / 12-month exclusion',
      source: 'AFSLIC20_SCP_Brochure_rev.pdf',
      rawText:
        'Allstate STM short term medical PPO three tiers Enhanced Copay Enhanced Essentials deductible options coinsurance coverage maximum office visits ER urgent care Rx child immunizations NEO Insurance Solutions 12 12 pre-existing not ACA'
    },
    {
      id: 'allstatehealthaccess',
      name: 'Allstate Health Access',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Allstate / NEO Insurance Solutions',
      network: 'Provider search available through plan',
      benefits: [
        {
          category: 'Eligibility Note',
          items: ['Males over 300 lbs and females over 250 lbs NOT eligible']
        },
        { category: 'Deductible', items: ['$0'] },
        {
          category: 'Waiting Period',
          items: ['3 months for preventive services only']
        },
        {
          category: 'Hospital Admission (PLUS tier)',
          items: ['Year 1: $6,000 / Year 2: $9,000 / Year 3: $12,000']
        },
        {
          category: 'Hospital Confinement Sickness (PLUS)',
          items: ['$6,000 — unlimited days']
        },
        {
          category: 'Hospital Confinement Injury (PLUS)',
          items: ['$6,000 — unlimited days']
        },
        { category: 'ICU Confinement (PLUS)', items: ['$6,000 — 60 days'] },
        { category: 'Emergency Room (PLUS)', items: ['$300'] },
        { category: 'Surgery Tier 1 (PLUS)', items: ['$10,000 — 3 days'] },
        { category: 'Surgery Tier 2 (PLUS)', items: ['$5,000 — 4 days'] },
        { category: 'Outpatient Surgery (PLUS)', items: ['$5,000 — 4 days'] },
        { category: 'Anesthesia Tier 1 (PLUS)', items: ['$5,000'] },
        {
          category: 'Ambulatory Surgical Center (PLUS)',
          items: ['$3,000 — 3 days']
        },
        { category: 'Office Visit (PLUS)', items: ['$200 — 4 covered visits'] },
        { category: 'Urgent Care (PLUS)', items: ['$150 — 4 visits'] },
        { category: 'Inpatient Physician (PLUS)', items: ['$200 — 4 visits'] },
        { category: 'Laboratory Tests (PLUS)', items: ['$35 — 10 visits'] },
        { category: 'Chemotherapy (PLUS)', items: ['$4,000 monthly max'] },
        { category: 'Observation Unit (PLUS)', items: ['$1,500 — 3 days'] },
        { category: 'Ambulance Ground (PLUS)', items: ['$25,000'] },
        { category: 'Ambulance Air (PLUS)', items: ['$1,500 — 2 days'] }
      ],
      limitations: [
        'Weight restriction: males over 300 lbs and females over 250 lbs NOT eligible',
        'Limited benefit — fixed indemnity amounts, not comprehensive coverage',
        'Pre-existing conditions excluded for 12 months from effective date',
        '1-year look-back for signs/symptoms or treatment = pre-existing',
        'Pregnancy existing before effective date = pre-existing condition',
        'NOT ACA compliant — not major medical coverage',
        '3-month waiting period for preventive services',
        'Excludes: mental illness, substance abuse, hazardous activities, eye exams, hearing, cosmetic, gastric bypass, chronic pain, foot conditions',
        'No coverage outside US or Canada',
        'No experimental or investigational treatments',
        'Hospital admission benefit increases in years 2 and 3',
        'Office visit benefit also increases Year 1 $4,000 Year 2 $6,000 Year 3 $8,000 PLUS tier'
      ],
      waitingPeriods: ['3 months waiting period for preventive services only'],
      preEx:
        '12-month exclusion — 1-year look-back for signs/symptoms or treatment',
      source: 'Allstate_Health_Access_Brochure.pdf',
      rawText:
        'Allstate Health Access Limited Medical Metal Gap indemnity three tiers CORE VALUE PLUS. Weight restriction males over 300 lbs females over 250 lbs not eligible. Deductible $0. Waiting period 3 months preventive only. Pre-existing condition exclusion 12 months from effective date 1 year look-back for signs symptoms treatment diagnosis. Hospital admission PLUS year 1 $6,000 year 2 $9,000 year 3 $12,000. Hospital confinement sickness PLUS $6,000 unlimited days. Hospital confinement injury PLUS $6,000 unlimited days. ICU PLUS $6,000 60 days. Emergency room PLUS $300. Surgery tier 1 PLUS $10,000 3 days. Surgery tier 2 PLUS $5,000 4 days. Outpatient surgery PLUS $5,000 4 days. Anesthesia PLUS $5,000. Ambulatory surgical center PLUS $3,000 3 days. Office visit PLUS $200 4 visits. Urgent care PLUS $150 4 visits. Inpatient physician PLUS $200 4 visits. Preventive office visit PLUS $175 2 visits. Radiology PLUS $200. Laboratory test PLUS $35 10 visits. Chemotherapy PLUS $4,000 monthly max. Observation unit PLUS $1,500 3 days. Ambulance ground water PLUS $25,000. Ambulance air PLUS $1,500 2 days. Office visit increasing benefit year 1 $4,000 year 2 $6,000 year 3 $8,000 PLUS. Exclusions mental illness substance abuse hazardous activities eye exams hearing cosmetic gastric bypass chronic pain foot conditions outside US war self-inflicted injury felony. Not ACA compliant limited benefit fixed indemnity. NEO Insurance Solutions Allstate.'
    },
    {
      id: 'mychoice',
      name: 'MyChoice (Low / Mid / High)',
      group: 'Limited',
      type: 'Limited Benefit / Fixed Indemnity',
      carrier: 'BWA / FirstEnroll',
      network: 'See plan certificate for network details',
      assoc: 'Business Workers of America (BWA)',
      planNotes:
        'Three tiers: Low, Mid, High. Verify exact benefit amounts per tier in plan certificate.',
      benefits: [
        {
          category: 'Plan Tiers',
          items: [
            'MyChoice Low: entry-level benefit amounts',
            'MyChoice Mid: moderate benefit amounts',
            'MyChoice High: highest benefit amounts',
            'All tiers: verify exact benefit amounts in plan certificate'
          ]
        },
        {
          category: 'Plan Structure',
          items: [
            'Limited benefit plan -- not comprehensive major medical',
            'Not ACA-compliant',
            'Billed through FirstEnroll',
            'BWA Business Workers of America association'
          ]
        }
      ],
      limitations: [
        'NOT ACA-compliant major medical',
        'Limited benefit -- not full bill coverage',
        'Verify exact benefit amounts per tier in plan certificate'
      ],
      waitingPeriods: ['Check plan certificate for waiting periods'],
      preEx: 'Check plan certificate for pre-existing condition terms',
      source: 'BWABrochurePlan2MBRAmericare2_REV.pdf',
      rawText:
        'MyChoice Low Mid High limited benefit three tiers BWA Business Workers America FirstEnroll not ACA not major medical verify plan certificate'
    }
  ];

  if (typeof POLICY_DOCS !== 'undefined' && Array.isArray(POLICY_DOCS)) {
    var existingIds = POLICY_DOCS.map(function (p) {
      return p.id;
    });
    EXTENDED_PLANS.forEach(function (plan) {
      if (existingIds.indexOf(plan.id) === -1) {
        POLICY_DOCS.push(plan);
      }
    });
  } else {
    window._CHA_EXTENDED_PLANS = EXTENDED_PLANS;
  }
})();
