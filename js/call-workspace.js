// js/call-workspace.js - On Call workspace (Oct 2026).
// One screen for a live call on MEC and STM plans:
//   find the plan (search or Browse), see network / administrator /
//   association / billing, then three tabs in call order:
//   1. Plan & meds   - tier benefits + PAP check (pap-lookup data, meds.js)
//   2. App questions - from js/app-questions.js
//   3. Before enrollment - the plan script's word-for-word recap with the
//      confirm questions, read live from PLAN_SCRIPTS (call-playbook.js).
// Benefit values come from the plan documents (tier table, Oct 16 2026).
// Oct 22 2026: Limited, fixed indemnity and Premier plans added (see
// "More plan families" below), app questions from the portals.

var CW_FAMS = [
  {
    name: 'TDK',
    type: 'MEC',
    platform: 'FirstEnroll',
    aq: 'tdk',
    facts: [
      ['Network', 'First Health'],
      ['Administrator', 'Detego Health'],
      ['Sponsor', 'HCDA (Working Owner)'],
      ['Billing', 'First Enroll']
    ],
    tiers: [
      {
        tier: '1',
        ben: [
          ['Doctor', '$25 copay, $150 max, 3 visits/yr', 0],
          ['Specialist', '$50 copay, $300 max, 1 visit/yr', 0],
          ['Urgent care', '$50 copay, $300 max, 1 visit/yr', 0],
          ['Telehealth', '$0 consult, no max (MyLiveDoc)', 0],
          ['ER', 'Not covered', 0],
          ['Hospital', '$1,000/day, max $5,000/yr', 0],
          ['Surgery', 'Not covered (outpatient); no IP surgery row', 0],
          [
            'Rx',
            '70+ free Rx; discount card. Home delivery not covered; brand/specialty not covered',
            0
          ],
          ['Deductible', '$0 (none)', 0],
          [
            'Waiting period',
            '30 days (not virtual care/Rx; not emergent care; 1st year)',
            1
          ],
          ['Pre-existing', '12/12, hospital-related benefits', 1]
        ],
        script: 'TDK 1,2,3'
      },
      {
        tier: '2',
        ben: [
          ['Doctor', '$25 copay, $150 max, 4 visits/yr', 0],
          ['Specialist', '$50 copay, $300 max, 2 visits/yr', 0],
          ['Urgent care', '$50 copay, $300 max, 2 visits/yr', 0],
          ['Telehealth', '$0 consult, no max (MyLiveDoc)', 0],
          ['ER', 'Not covered', 0],
          ['Hospital', '$1,000/day, max $10,000/yr', 0],
          ['Surgery', 'Not covered (outpatient); no IP surgery row', 0],
          [
            'Rx',
            '1,000+ free Rx; discount card. Brand/specialty not covered',
            0
          ],
          ['Deductible', '$0 (none)', 0],
          [
            'Waiting period',
            '30 days (not virtual care/Rx; not emergent care; 1st year)',
            1
          ],
          ['Pre-existing', '12/12, hospital-related benefits', 1]
        ],
        script: 'TDK 1,2,3'
      },
      {
        tier: '3',
        ben: [
          ['Doctor', '$25 copay, $150 max, 4 visits/yr', 0],
          ['Specialist', '$50 copay, $300 max, 4 visits/yr', 0],
          ['Urgent care', '$50 copay, $300 max, 4 visits/yr', 0],
          ['Telehealth', '$0 consult, no max (MyLiveDoc)', 0],
          ['ER', 'Not covered', 0],
          ['Hospital', '$1,000/day, max $15,000/yr', 0],
          ['Surgery', 'Not covered (outpatient); no IP surgery row', 0],
          ['Rx', '70+ free Rx; discount card. Brand/specialty not covered', 0],
          ['Deductible', '$0 (none)', 0],
          [
            'Waiting period',
            '30 days (not virtual care/Rx; not emergent care; 1st year)',
            1
          ],
          ['Pre-existing', '12/12, hospital-related benefits', 1]
        ],
        script: 'TDK 1,2,3'
      },
      {
        tier: '4',
        ben: [
          ['Doctor', '$50 copay, $150 max, 4 visits/yr', 0],
          ['Specialist', '$75 copay, $300 max, 4 visits/yr', 0],
          ['Urgent care', '$75 copay, $300 max, 4 visits/yr', 0],
          ['Telehealth', '$0 consult, no max (MyLiveDoc)', 0],
          ['ER', '$1,000/incident, if admitted', 0],
          ['Hospital', '$1,000/day, max $10,000/yr', 0],
          ['Surgery', 'IP/OP: $1,000/day, max $2,000/yr', 0],
          [
            'Rx',
            '1,000+ free Rx; discount card. Brand/specialty not covered',
            0
          ],
          ['Deductible', '$0 (none)', 0],
          [
            'Waiting period',
            '30 days (not virtual care/Rx; not emergent care; 1st year)',
            1
          ],
          ['Pre-existing', '12/12, hospital-related benefits', 1]
        ],
        script: 'TDK 4,5'
      },
      {
        tier: '5',
        ben: [
          ['Doctor', '$50 copay, $150 max, 5 visits/yr', 0],
          ['Specialist', '$75 copay, $300 max, 5 visits/yr', 0],
          ['Urgent care', '$75 copay, $300 max, 5 visits/yr', 0],
          ['Telehealth', '$0 consult, no max (MyLiveDoc)', 0],
          ['ER', '$1,000/incident, if admitted', 0],
          ['Hospital', '$1,500/day, max $15,000/yr', 0],
          ['Surgery', 'IP/OP: $1,500/day, max $4,500/yr', 0],
          [
            'Rx',
            '1,000+ free Rx; discount card. Brand/specialty not covered',
            0
          ],
          ['Deductible', '$0 (none)', 0],
          [
            'Waiting period',
            '30 days (not virtual care/Rx; not emergent care; 1st year)',
            1
          ],
          ['Pre-existing', '12/12, hospital-related benefits', 1]
        ],
        script: 'TDK 4,5'
      }
    ]
  },
  {
    name: 'GoodHealth',
    type: 'MEC',
    platform: 'FirstEnroll',
    aq: '',
    facts: [
      ['Network', 'First Health'],
      ['Administrator', "Merchant's Benefit Administrators (MBA)"],
      ['Sponsor', 'Good Health Distribution Partners'],
      ['Billing', 'FirstEnroll']
    ],
    tiers: [
      {
        tier: 'Wellness',
        ben: [
          ['Doctor', 'Not listed (only listed services covered)', 0],
          ['Specialist', 'Not listed (only listed services covered)', 0],
          ['Urgent care', 'Not listed (only listed services covered)', 0],
          ['Telehealth', '$0 consult, no max', 0],
          ['ER', 'Not listed (only listed services covered)', 0],
          ['Hospital', 'Not listed (only listed services covered)', 0],
          ['Surgery', 'Not listed (only listed services covered)', 0],
          ['Rx', 'Discount card only (BestChoiceRx)', 0],
          ['Deductible', 'Not on file', 0],
          ['Waiting period', '30 days, sickness benefits', 1],
          ['Pre-existing', 'None stated (no hospital benefit)', 1]
        ],
        script: ''
      },
      {
        tier: '1',
        ben: [
          ['Doctor', '$25 copay, $150 max, 3 visits/yr', 0],
          [
            'Specialist',
            '$50 copay, $300 max, 1 visit/yr (shared w/ urgent care)',
            0
          ],
          [
            'Urgent care',
            '$50 copay, $300 max, 1 visit/yr (shared w/ specialist)',
            0
          ],
          ['Telehealth', '$0 consult, no max', 0],
          ['ER', 'Not listed (only listed services covered)', 0],
          ['Hospital', '$1,000/day, max $5,000/yr', 0],
          ['Surgery', 'Not listed (only listed services covered)', 0],
          ['Rx', 'Discount card only (BestChoiceRx)', 0],
          ['Deductible', 'Not on file', 0],
          ['Waiting period', '30 days, sickness benefits', 1],
          ['Pre-existing', '12/12, hospital benefits only', 1]
        ],
        script: 'GoodHealth 1,2,3'
      },
      {
        tier: '2',
        ben: [
          ['Doctor', '$25 copay, $150 max, 4 visits/yr', 0],
          [
            'Specialist',
            '$50 copay, $300 max, 2 visits/yr (shared w/ urgent care)',
            0
          ],
          [
            'Urgent care',
            '$50 copay, $300 max, 2 visits/yr (shared w/ specialist)',
            0
          ],
          ['Telehealth', '$0 consult, no max', 0],
          ['ER', 'Not listed (only listed services covered)', 0],
          ['Hospital', '$1,000/day, max $10,000/yr', 0],
          ['Surgery', 'Not listed (only listed services covered)', 0],
          [
            'Rx',
            'Acute/preventive generic $0; 200 maint. generics $5 (retail 30 / mail 90); off-formulary discount; specialty not covered',
            0
          ],
          ['Deductible', 'Not on file', 0],
          ['Waiting period', '30 days, sickness benefits', 1],
          ['Pre-existing', '12/12, hospital benefits only', 1]
        ],
        script: 'GoodHealth 1,2,3'
      },
      {
        tier: '3',
        ben: [
          ['Doctor', '$25 copay, $150 max, 4 visits/yr', 0],
          [
            'Specialist',
            '$50 copay, $300 max, 4 visits/yr (shared w/ urgent care)',
            0
          ],
          [
            'Urgent care',
            '$50 copay, $300 max, 4 visits/yr (shared w/ specialist)',
            0
          ],
          ['Telehealth', '$0 consult, no max', 0],
          ['ER', 'Not listed (only listed services covered)', 0],
          ['Hospital', '$1,000/day, max $15,000/yr', 0],
          ['Surgery', 'Not listed (only listed services covered)', 0],
          [
            'Rx',
            'Generic $0; maint. generic $5; non-pref generic $5/$10; brand $40 retail w/ PA; $150/mo cap; specialty not covered',
            0
          ],
          ['Deductible', 'Not on file', 0],
          ['Waiting period', '30 days, sickness benefits', 1],
          ['Pre-existing', '12/12, hospital benefits only', 1]
        ],
        script: 'GoodHealth 1,2,3'
      },
      {
        tier: '4',
        ben: [
          ['Doctor', '$50 copay, $150 max, 4 visits/yr', 0],
          [
            'Specialist',
            '$75 copay, $300 max, 4 visits/yr (shared w/ urgent care)',
            0
          ],
          [
            'Urgent care',
            '$75 copay, $300 max, 4 visits/yr (shared w/ specialist)',
            0
          ],
          ['Telehealth', '$0 consult, no max', 0],
          ['ER', '$1,000/incident, if admitted', 0],
          ['Hospital', '$1,000/day, max $10,000/yr', 0],
          [
            'Surgery',
            "IP/OP combined: $1,000 (printed '/ Year'), max $2,000/yr",
            0
          ],
          [
            'Rx',
            'Generic $0; maint. generic $5; non-pref generic $5/$10; brand $40 retail w/ PA; $150/mo cap; specialty not covered',
            0
          ],
          ['Deductible', 'Not on file', 0],
          ['Waiting period', '30 days, sickness benefits', 1],
          ['Pre-existing', '12/12, hospital benefits only', 1]
        ],
        script: 'GoodHealth 4,5'
      },
      {
        tier: '5',
        ben: [
          ['Doctor', '$50 copay, $150 max, 5 visits/yr', 0],
          [
            'Specialist',
            '$75 copay, $300 max, 5 visits/yr (shared w/ urgent care)',
            0
          ],
          [
            'Urgent care',
            '$75 copay, $300 max, 5 visits/yr (shared w/ specialist)',
            0
          ],
          ['Telehealth', '$0 consult, no max', 0],
          ['ER', '$1,000/incident, if admitted', 0],
          ['Hospital', '$1,500/day, max $15,000/yr', 0],
          ['Surgery', 'IP/OP combined: $1,500/day, max $4,500/yr', 0],
          [
            'Rx',
            'Generic $0; maint. generic $5; non-pref generic $5/$10; brand $40 retail w/ PA; $150/mo cap; specialty not covered',
            0
          ],
          ['Deductible', 'Not on file', 0],
          ['Waiting period', '30 days, sickness benefits', 1],
          ['Pre-existing', '12/12, hospital benefits only', 1]
        ],
        script: 'GoodHealth 4,5'
      }
    ]
  },
  {
    name: 'SmartChoice',
    type: 'Limited',
    platform: 'NEO',
    aq: 'smartchoice',
    facts: [
      ['Network', 'First Health - in-network only'],
      ['Administrator', 'Detego Health'],
      ['Sponsor', 'Population Science Management'],
      ['Billing', 'Neo Health Solutions']
    ],
    tiers: [
      {
        tier: '1500',
        ben: [
          ['Doctor', '$40 copay, 12 visits/yr', 0],
          ['Specialist', '$50 copay, 12 visits/yr', 0],
          ['Urgent care', '$60 copay, 5 visits/yr', 0],
          ['Telehealth', '$0 copay (PCP, urgent, mental health)', 0],
          ['ER', '$250 copay after ded, 4/family/yr', 0],
          [
            'Hospital',
            '$2,500 copay after ded, 1 admit/family/yr, up to 7 days',
            0
          ],
          [
            'Surgery',
            'OP facility $750 copay after ded, 4/family/yr, elective excluded; IP via hospital row',
            0
          ],
          [
            'Rx',
            'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered',
            0
          ],
          ['Deductible', '$1,500 ind / $3,000 fam; OOP $9,200 / $18,400', 0]
        ],
        script: 'NEO Smart Choice'
      },
      {
        tier: '2500',
        ben: [
          ['Doctor', '$40 copay, 10 visits/yr', 0],
          ['Specialist', '$50 copay, 10 visits/yr', 0],
          ['Urgent care', '$60 copay, 3 visits/yr', 0],
          ['Telehealth', '$0 copay (PCP, urgent, mental health)', 0],
          ['ER', '$250 copay after ded, 3/family/yr', 0],
          [
            'Hospital',
            '$2,500 copay after ded, 1 admit/family/yr, up to 5 days',
            0
          ],
          [
            'Surgery',
            'OP facility $750 copay after ded, 3/family/yr, elective excluded; IP via hospital row',
            0
          ],
          [
            'Rx',
            'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered',
            0
          ],
          ['Deductible', '$2,500 ind / $5,000 fam; OOP $9,200 / $18,400', 0]
        ],
        script: 'NEO Smart Choice'
      },
      {
        tier: '3000',
        ben: [
          ['Doctor', '$40 copay, 7 visits/yr', 0],
          ['Specialist', '$50 copay, 7 visits/yr', 0],
          ['Urgent care', '$60 copay, 3 visits/yr', 0],
          ['Telehealth', '$0 copay (PCP, urgent, mental health)', 0],
          ['ER', '$250 copay after ded, 2/family/yr', 0],
          [
            'Hospital',
            '$2,500 copay after ded, 1 admit/family/yr, up to 4 days',
            0
          ],
          [
            'Surgery',
            'OP facility $750 copay after ded, 2/family/yr, elective excluded; IP via hospital row',
            0
          ],
          [
            'Rx',
            'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered',
            0
          ],
          ['Deductible', '$3,000 ind / $6,000 fam; OOP $9,200 / $18,400', 0]
        ],
        script: 'NEO Smart Choice'
      },
      {
        tier: '3500',
        ben: [
          ['Doctor', '$40 copay, 5 visits/yr', 0],
          ['Specialist', '$50 copay, 5 visits/yr', 0],
          ['Urgent care', '$60 copay, 2 visits/yr', 0],
          ['Telehealth', '$0 copay (PCP, urgent, mental health)', 0],
          ['ER', '$250 copay after ded, 1/family/yr', 0],
          [
            'Hospital',
            '$2,500 copay after ded, 1 admit/family/yr, up to 3 days',
            0
          ],
          [
            'Surgery',
            'OP facility $750 copay after ded, 1/family/yr, elective excluded; IP via hospital row',
            0
          ],
          [
            'Rx',
            'Preferred generic $12 (30-day, Ventegra acute formulary); brand/specialty not covered',
            0
          ],
          ['Deductible', '$3,500 ind / $7,000 fam; OOP $9,200 / $18,400', 0]
        ],
        script: 'NEO Smart Choice'
      }
    ]
  },
  {
    name: 'Harbor STM',
    type: 'STM',
    platform: 'NEO',
    aq: 'harbor',
    facts: [
      ['Network', 'Cigna Healthcare PPO'],
      ['Underwriter', 'Everest Reinsurance Co. (or Everest Denali by state)'],
      ['Association', 'American Workers Association (AWA)'],
      ['Billing', 'Neo Health Solutions']
    ],
    tiers: [
      {
        tier: 'Essential',
        ben: [
          ['Doctor', '$50 copay, 3 visits (in-network only)', 0],
          ['Specialist', '$50 copay, 3 visits (in-network only)', 0],
          ['Urgent care', '$50 copay, 3 visits (in-network only)', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', '$500 access fee per admission, then ded/coins', 0],
          ['Hospital', 'Not on file', 0],
          ['Surgery', 'IP ded/coins / OP $500 access fee then ded/coins', 0],
          [
            'Rx',
            'Optional Rx rider: generic $25 copay; brand/specialty $500 Rx ded then coins; $5,000 max',
            0
          ],
          [
            'Deductible',
            'Ded $2,500/$5,000/$7,500/$10,000; coins 30/20/0%; coins OOP max $5,000; period max $750,000',
            0
          ],
          ['Waiting period', 'Not on file (none printed)', 1],
          [
            'Pre-existing',
            'Not covered; limits reapply each new coverage period; optional Pre-Ex rider (not in OH)',
            1
          ]
        ],
        script: 'Harbor STM Essential'
      },
      {
        tier: 'Access',
        ben: [
          ['Doctor', '$40 copay, 3 visits (in-network only)', 0],
          ['Specialist', '$40 copay, 3 visits (in-network only)', 0],
          ['Urgent care', '$40 copay, 3 visits (in-network only)', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', 'No access fee; ded/coins', 0],
          ['Hospital', 'Not on file', 0],
          ['Surgery', 'IP ded/coins / OP No access fee; ded/coins', 0],
          [
            'Rx',
            'Optional Rx rider: generic $25 copay; brand/specialty $500 Rx ded then coins; $5,000 max',
            0
          ],
          [
            'Deductible',
            'Ded $2,500/$5,000/$7,500/$10,000; coins 30/20/0%; coins OOP max $5,000; period max $1,000,000',
            0
          ],
          ['Waiting period', 'Not on file (none printed)', 1],
          [
            'Pre-existing',
            'Not covered; limits reapply each new coverage period; optional Pre-Ex rider (not in OH)',
            1
          ]
        ],
        script: 'Harbor STM Access'
      },
      {
        tier: 'Secure',
        ben: [
          ['Doctor', '$40 copay, unlimited (in-network only)', 0],
          ['Specialist', '$40 copay, unlimited (in-network only)', 0],
          ['Urgent care', '$40 copay, unlimited (in-network only)', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', 'No access fee; ded/coins', 0],
          ['Hospital', 'Not on file', 0],
          ['Surgery', 'IP ded/coins / OP No access fee; ded/coins', 0],
          [
            'Rx',
            'Optional Rx rider: generic $25 copay; brand/specialty $500 Rx ded then coins; $5,000 max',
            0
          ],
          [
            'Deductible',
            'Ded $2,500/$5,000/$7,500/$10,000; coins 30/20/0%; coins OOP max $5,000; period max $1,500,000',
            0
          ],
          ['Waiting period', 'Not on file (none printed)', 1],
          [
            'Pre-existing',
            'Not covered; limits reapply each new coverage period; optional Pre-Ex rider (not in OH)',
            1
          ]
        ],
        script: 'Harbor STM Secure'
      }
    ]
  },
  {
    name: 'Pinnacle STM',
    type: 'STM',
    platform: 'NEO',
    aq: 'pinnacle',
    facts: [
      ['Network', 'PHCS (MultiPlan)'],
      ['Underwriter', 'Everest Reinsurance Company'],
      ['Association', 'American Workers Association (AWA)'],
      ['Billing', 'Neo Health Solutions']
    ],
    tiers: [
      {
        tier: 'Traditional',
        ben: [
          ['Doctor', '$50 copay', 0],
          ['Specialist', 'Not on file (one office copay row, $50)', 0],
          ['Urgent care', 'Not on file', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', '$500 ER deductible per visit (max 3), then ded/coins', 0],
          ['Hospital', 'Average standard room rate, ded/coins', 0],
          [
            'Surgery',
            'IP ded/coins / OP $500 deductible per surgery (max 3)',
            0
          ],
          [
            'Rx',
            'Excluded except Dr-administered; AWA Rx discount (Clever Rx)',
            0
          ],
          [
            'Deductible',
            'Ded $500-$10,000; coins 50/50 or 80/20; OOP max $5,000; period max $1,000,000',
            0
          ],
          ['Waiting period', 'Injury none; sickness 5 days; cancer 30 days', 1],
          [
            'Pre-existing',
            'Excluded first 12 mo, 60-mo lookback (may vary by state)',
            1
          ]
        ],
        script: 'NEO Pinnacle STM Traditional'
      }
    ]
  },
  {
    name: 'Galena STM',
    type: 'STM',
    platform: 'NEO',
    aq: '',
    facts: [
      ['Network', 'MultiPlan / PHCS'],
      ['Underwriter', 'Southern Guaranty Insurance Company (SGIC)'],
      ['Association', 'Association for Responsible Planners (AFRP)'],
      ['Billing', 'Neo Health Solutions']
    ],
    tiers: [
      {
        tier: 'Economy',
        ben: [
          ['Doctor', '$40 copay (not marked copay-only)', 0],
          ['Specialist', '$60 copay (not marked copay-only)', 0],
          ['Urgent care', '$60 copay (not marked copay-only)', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', 'Accident $500 copay; sickness $750 copay', 0],
          ['Hospital', 'Up to $1,500/day (Standard Room & ICU row)', 0],
          [
            'Surgery',
            'IP $2,000/surgery, 1/term / OP $2,000, 1/term / office $1,000, 1/term',
            0
          ],
          [
            'Rx',
            'Outpatient Rx not insured; ReviveHealth membership: $0 urgent care meds, $0 maintenance meds home delivery, up to 80% discount card',
            0
          ],
          [
            'Deductible',
            'Ded $5,000/$7,500/$10,000; plan pays 50/70/80%; coins max $5,000/$10,000; period max $500,000',
            0
          ],
          [
            'Waiting period',
            'Injury next day; sickness 5 days; cancer 30 days',
            1
          ],
          ['Pre-existing', 'Excluded; 12-month lookback', 1]
        ],
        script: 'AFRP Galena STM Economy'
      },
      {
        tier: 'Standard',
        ben: [
          ['Doctor', '$40 copay (copay-only, no ded)', 0],
          ['Specialist', '$60 copay (copay-only, no ded)', 0],
          ['Urgent care', '$60 copay (not marked copay-only)', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', 'Accident $500 copay; sickness $750 copay', 0],
          ['Hospital', 'Up to $2,500/day (Standard Room & ICU row)', 0],
          [
            'Surgery',
            'IP $4,000/surgery, 2/term / OP $4,000, 1/term / office $1,000, 2/term',
            0
          ],
          [
            'Rx',
            'Outpatient Rx not insured; ReviveHealth membership: $0 urgent care meds, $0 maintenance meds home delivery, up to 80% discount card',
            0
          ],
          [
            'Deductible',
            'Ded $2,500/$5,000/$7,500/$10,000; plan pays 50/70/80%; coins max $5,000/$10,000; period max $1,000,000',
            0
          ],
          [
            'Waiting period',
            'Injury next day; sickness 5 days; cancer 30 days',
            1
          ],
          ['Pre-existing', 'Excluded; 12-month lookback', 1]
        ],
        script: 'AFRP Galena STM Standard'
      },
      {
        tier: 'Elite',
        ben: [
          ['Doctor', '$30 copay (copay-only, no ded)', 0],
          ['Specialist', '$45 copay (copay-only, no ded)', 0],
          ['Urgent care', '$60 copay (copay-only, no ded)', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', 'Accident $500 copay; sickness $750 copay', 0],
          ['Hospital', 'Up to $3,000/day (Standard Room & ICU row)', 0],
          [
            'Surgery',
            'IP $8,000/surgery, 3/term / OP $8,000, 2/term / office $1,000, 3/term',
            0
          ],
          [
            'Rx',
            'Outpatient Rx not insured; ReviveHealth membership: $0 urgent care meds, $0 maintenance meds home delivery, up to 80% discount card',
            0
          ],
          [
            'Deductible',
            'Ded $2,500/$5,000/$7,500/$10,000; plan pays 50/70/80%; coins max $2,500/$5,000/$10,000; period max $2,000,000',
            0
          ],
          [
            'Waiting period',
            'Injury next day; sickness 5 days; cancer 30 days',
            1
          ],
          ['Pre-existing', 'Excluded; 12-month lookback', 1]
        ],
        script: 'AFRP Galena STM Elite'
      }
    ]
  },
  {
    name: 'SmartHealth STM',
    type: 'STM',
    platform: 'NEO',
    aq: '',
    facts: [
      ['Network', 'PHCS (MultiPlan)'],
      ['Underwriter', 'Standard Life and Casualty / AFSLIC (by state)'],
      ['Association', 'National Congress of Employers (NCE)'],
      ['Billing', 'Neo Health Solutions']
    ],
    tiers: [
      {
        tier: 'Traditional',
        ben: [
          ['Doctor', '$25 copay, max 2 (then ded/coins)', 0],
          ['Specialist', '$40 copay, max 2', 0],
          ['Urgent care', '$25 copay, max 2 (shared with office)', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', 'Ded/coins; no addl ER ded', 0],
          ['Hospital', 'Ded/coins', 0],
          ['Surgery', 'IP and OP ded/coins', 0],
          ['Rx', 'Outpatient Rx excluded; NCE Rx discount card', 0],
          [
            'Deductible',
            'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
            0
          ],
          ['Waiting period', 'Injury none; sickness 5 days; cancer 30 days', 1],
          [
            'Pre-existing',
            'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
            1
          ]
        ],
        script: 'Smart Health STM Traditional'
      },
      {
        tier: 'Limited',
        ben: [
          ['Doctor', '$25 copay, max 2 (then ded/coins)', 0],
          ['Specialist', '$40 copay, max 2', 0],
          ['Urgent care', '$25 copay, max 2 (shared with office)', 0],
          ['Telehealth', 'Not on file', 0],
          [
            'ER',
            'Ded/coins, up to $250/visit; no addl ER ded (waived if admitted 24h)',
            0
          ],
          ['Hospital', 'Up to $1,500/day', 0],
          [
            'Surgery',
            'Up to $5,000/surgery, $10,000/period; OP facility up to $1,500/day',
            0
          ],
          ['Rx', 'Outpatient Rx excluded; NCE Rx discount card', 0],
          [
            'Deductible',
            'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
            0
          ],
          ['Waiting period', 'Injury none; sickness 5 days; cancer 30 days', 1],
          [
            'Pre-existing',
            'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
            1
          ]
        ],
        script: 'Smart Health STM Limited'
      }
    ]
  },
  {
    name: 'Access Health STM',
    type: 'STM',
    platform: 'FirstEnroll',
    aq: 'access',
    facts: [
      ['Network', 'PHCS (MultiPlan)'],
      ['Underwriter', 'American Financial Security Life Insurance Co.'],
      ['Association', 'National Congress of Employers (NCE)'],
      ['Billing', 'FirstEnroll']
    ],
    tiers: [
      {
        tier: 'Traditional',
        ben: [
          ['Doctor', '$15 copay, unlimited', 0],
          ['Specialist', '$25 copay, unlimited', 0],
          [
            'Urgent care',
            '$15 copay, unlimited (+$100 urgent care deductible, 1/yr)',
            0
          ],
          [
            'Telehealth',
            'MyTelemedicine via NCE membership (cost not printed)',
            0
          ],
          [
            'ER',
            'Deductible + coinsurance after $250 ER deductible (1/yr); waived if admitted in 24 hrs',
            0
          ],
          ['Hospital', 'Subject to deductible + coinsurance', 0],
          ['Surgery', 'Subject to deductible + coinsurance', 0],
          ['Rx', 'Outpatient Rx excluded; NCE Rx discount card', 0],
          [
            'Deductible',
            'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
            0
          ],
          ['Waiting period', 'Injury none; sickness 5 days; cancer 30 days', 1],
          [
            'Pre-existing',
            'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
            1
          ]
        ],
        script: 'Access Health STM'
      },
      {
        tier: 'Lite',
        ben: [
          ['Doctor', '$25 copay, max 2 visits', 0],
          ['Specialist', '$40 copay, max 2 visits', 0],
          ['Urgent care', '$25 copay, max 2 visits', 0],
          [
            'Telehealth',
            'MyTelemedicine via NCE membership (cost not printed)',
            0
          ],
          ['ER', 'Not on file', 0],
          ['Hospital', 'Not on file', 0],
          ['Surgery', 'Not on file', 0],
          ['Rx', 'Outpatient Rx excluded; NCE Rx discount card', 0],
          [
            'Deductible',
            'Ded $500-$10,000; coins 80/20; coins limit $2,000/$4,000; period max $250K/$500K/$1M',
            0
          ],
          ['Waiting period', 'Injury none; sickness 5 days; cancer 30 days', 1],
          [
            'Pre-existing',
            'Excluded; 36-month lookback; Pre-Ex Waiver Rider for later terms',
            1
          ]
        ],
        script: 'Access Health STM'
      }
    ]
  },
  {
    name: 'Allstate STM PPO',
    type: 'STM',
    platform: 'NEO',
    aq: '',
    facts: [
      ['Network', 'Aetna Open Choice PPO'],
      ['Underwriter', 'National Health Ins. Co. / Integon (by state)'],
      ['Association', 'LIFE Association'],
      ['Billing', 'Not on file']
    ],
    tiers: [
      {
        tier: 'Enhanced',
        ben: [
          ['Doctor', 'Ded/coins (incl preventive)', 0],
          ['Specialist', 'Ded/coins', 0],
          ['Urgent care', '$50 access fee, ded waived, then coins', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', '$250 access fee (waived if admitted), then ded/coins', 0],
          ['Hospital', 'Ded/coins', 0],
          ['Surgery', 'Ded/coins (OP surgeon/anesthesia in OP services)', 0],
          ['Rx', 'Not on file', 0],
          [
            'Deductible',
            'Ded $2.5k-$25k (9 designs); coins 0/20/50%; coins OOP $0 or $5k; period max $1,000,000',
            0
          ],
          ['Waiting period', 'Not on file', 1],
          ['Pre-existing', 'Not on file', 1]
        ],
        script: ''
      },
      {
        tier: 'Copay Enhanced',
        ben: [
          [
            'Doctor',
            '$40 copay; visits: <=6 mo single 1/family 3, >6 mo single 2/family 4',
            0
          ],
          ['Specialist', '$60 copay (same visit limits)', 0],
          ['Urgent care', '$50 access fee, ded waived, then coins', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', '$250 access fee (waived if admitted), then ded/coins', 0],
          ['Hospital', 'Ded/coins', 0],
          ['Surgery', 'Ded/coins (OP surgeon/anesthesia in OP services)', 0],
          ['Rx', '$10 generic copay; $3,000 max', 0],
          [
            'Deductible',
            'Ded $6k or $8k; coins 0%; coins OOP $0; period max $5,000,000',
            0
          ],
          ['Waiting period', 'Not on file', 1],
          ['Pre-existing', 'Not on file', 1]
        ],
        script: ''
      },
      {
        tier: 'Essentials',
        ben: [
          ['Doctor', 'Ded/coins (incl preventive)', 0],
          ['Specialist', 'Ded/coins', 0],
          ['Urgent care', '$50 access fee, ded waived, then coins', 0],
          ['Telehealth', 'Not on file', 0],
          ['ER', '$250 access fee (waived if admitted), then ded/coins', 0],
          ['Hospital', 'Ded/coins', 0],
          ['Surgery', 'Ded/coins; OP services $15,000 limit', 0],
          ['Rx', 'Not on file', 0],
          [
            'Deductible',
            'Ded $5k/$10k/$25k; coins 40%; coins OOP $7.5k; period max $250,000',
            0
          ],
          ['Waiting period', 'Not on file', 1],
          ['Pre-existing', 'Not on file', 1]
        ],
        script: ''
      }
    ]
  }
];

// On Call wording of each plan's before-enrollment recap and bill line,
// approved by Mey Oct 17 2026. Used only on the On Call tab; the Scripts
// tab (PLAN_SCRIPTS in call-playbook.js) is unchanged.
var CW_SCRIPTS = {
  'Access Health STM': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Multiplan PHCS Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).\n\nYour monthly billing is handled through FirstEnroll, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see FirstEnroll on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show FirstEnroll."
  },
  'GoodHealth 1,2,3': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the FirstHealth Network for doctors and hospitals.\n\nThe Plan Administrator / Claims Administrator: Merchant's Benefit Administrators (MBA)\n\nYour monthly billing is handled through FirstEnroll, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see FirstEnroll on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nMedFirst/GoodHealth/ \u25b6 ( Say whatever plan you're selling ) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nYou'll join as a Limited Partner of Good Health Distribution, which is how you qualify for this group plan.\n\nOut-of-network services are not covered, and preventive care is not covered at a hospital.\n\nThe hospital benefit pays a fixed daily amount up to your plan's limit. Neonatal intensive care is not covered.\n\nThis plan is sponsored by Good Health Distribution for its Limited Partners. It is governed by a federal law called ERISA.", // lineup-guard-ignore: script name
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show FirstEnroll."
  },
  'GoodHealth 4,5': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the FirstHealth Network for doctors and hospitals.\n\nThe Plan Administrator / Claims Administrator: Merchant's Benefit Administrators (MBA)\n\nYour monthly billing is handled through FirstEnroll, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see FirstEnroll on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nMedFirst/GoodHealth \u25b6 ( Say whatever plan you're selling ) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nYou'll join as a Limited Partner of Good Health Distribution, which is how you qualify for this group plan.\n\nOut-of-network services are not covered, and preventive care is not covered at a hospital.\n\nThe hospital benefit pays a fixed daily amount up to your plan's limit. Neonatal intensive care is not covered.\n\nThis plan is sponsored by Good Health Distribution for its Limited Partners. It is governed by a federal law called ERISA.", // lineup-guard-ignore: script name
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show FirstEnroll."
  },
  'TDK 1,2,3': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the FirstHealth Network for doctors and hospitals.\n\nThe Plan Administrator / Claims Administrator: Detego Health\n\nYour monthly billing is handled through First Enroll, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see First Enroll on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nTDK is a limited-benefit MEC group health plan through the HCDA Working Owner program. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services. To join and stay eligible, you'll become a Working Owner of Healthcare Data Analytics, or HCDA. That means completing about 8 to 10 activities a year, like health assessments and surveys, and answering the company's requests. You're paid for those activities on a debit card.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nThis plan is sponsored by HCDA for its Working Owners. It is governed by a federal law called ERISA.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show First Enroll."
  },
  'TDK 4,5': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the FirstHealth Network for doctors and hospitals.\n\nThe Plan Administrator / Claims Administrator: Detego Health\n\nYour monthly billing is handled through First Enroll, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see First Enroll on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nTDK is a limited-benefit MEC group health plan through the HCDA Working Owner program. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services. To join and stay eligible, you'll become a Working Owner of Healthcare Data Analytics, or HCDA. That means completing about 8 to 10 activities a year, like health assessments and surveys, and answering the company's requests. You're paid for those activities on a debit card.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nThis plan is sponsored by HCDA for its Working Owners. It is governed by a federal law called ERISA.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show First Enroll."
  },
  'NEO Pinnacle STM Traditional': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Multiplan PHCS Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by Everest Reinsurance Company and offered through the AWA American Workers Association.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, or substance abuse for drugs and alcohol.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'AFRP Galena STM Elite': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Multiplan Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by (SGIC) Southern Guaranty Insurance Company and offered through the Association for Responsible Planners.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'AFRP Galena STM Standard': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Multiplan Network/ PHCS Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by (SGIC) Southern Guaranty Insurance Company and offered through the Association for Responsible Planners.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'AFRP Galena STM Economy': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Multiplan Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by (SGIC) Southern Guaranty Insurance Company and offered through the Association for Responsible Planners.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'Smart Health STM Traditional': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Multiplan Network/ PHCS Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by (SLACIC) Standard Life and Casualty Insurance Company and offered through the (NCE) National Congress of Employers.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'Smart Health STM Limited': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Multiplan Network/ PHCS Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by (SLACIC) Standard Life and Casualty Insurance Company and offered through the (NCE) National Congress of Employers.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'NEO Smart Choice': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the FirstHealth Network for doctors and hospitals.\n\nThe plan benefits are administered by Detego Health and offered through Population Science Management.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, limited medical plan, not an ACA or major medical plan, and it does not provide coverage for maternity, or substance abuse for drugs and alcohol.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'Harbor STM Secure': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Cigna Healthcare PPO Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by Everest Reinsurance Company, or Everest Denali Insurance Company depending on the state you live in. Everest is also the plan administrator.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\n- I also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital,sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'Harbor STM Access': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Cigna Healthcare PPO Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by Everest Reinsurance Company, or Everest Denali Insurance Company depending on the state you live in. Everest is also the plan administrator.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\n- I also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital,sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  },
  'Harbor STM Essential': {
    text: "Before we complete your enrollment, I want to go over the main details of the plan so you know exactly what you're getting. Your plan uses the Cigna Healthcare PPO Network for doctors and hospitals.\n\nThe insurance benefits are underwritten by Everest Reinsurance Company, or Everest Denali Insurance Company depending on the state you live in. Everest is also the plan administrator.\n\nYour monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statements. All of this will be clearly outlined in your policy documents.\n\nSo you'll see Neo Health Solutions on your statement. Does that make sense?\n\u25b6 ( Wait for answer )\n\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\n\nDo you understand this is not major medical or an ACA plan, and it doesn't cover the services I just mentioned?\n\u25b6 ( Wait for answer )\n\n- I also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital,sickness and scheduled doctor visits.\n\nDo you understand how the pre-existing condition clause and the waiting period work?\n\u25b6 ( Wait for answer )\n\nIf you need to add or change dependents in the future, that can be done on the plan's annual anniversary, without having to cancel your coverage.",
    bill: "Here's how your first payment of $___ breaks down: $___ is the monthly plan cost, $___ is the one-time enrollment fee, and $___ is for ___ (add-on, if any). After this month you'll pay $___ a month: $___ for the plan and $___ for ___ (add-on). Your statements will show Neo Health Solutions."
  }
};

var CW_ALIAS = {
  sc: 'smartchoice',
  gh: 'goodhealth',
  good: 'goodhealth',
  hb: 'harbor',
  pin: 'pinnacle',
  gal: 'galena',
  sh: 'smarthealth',
  ah: 'accesshealth',
  access: 'accesshealth',
  all: 'allstate',
  hcp: 'harmonycareplus',
  hc: 'harmonycare',
  aw: 'advancedwellness',
  awp: 'advancedwellnessplus',
  sigma: 'sigmacare',
  hcs: 'healthchoicesilver',
  silver: 'healthchoicesilver',
  para: 'paramount',
  ameri: 'americare',
  nexus: 'nexuscare',
  crown: 'crownpoint',
  rise: 'risehealth',
  hd: 'hdhealthascent',
  he: 'healthessential',
  th: 'awatruehealth',
  pp: 'pinnacleprotect',
  prime: 'primeprotect',
  boost: 'healthboost',
  ac: 'advantcare',
  tvp: 'tvphealth',
  wb: 'wbchoice',
  ss: 'simpleshield'
};

// ---------------------------------------------------------------
// More plan families (Oct 22 2026). Network, underwriter, association,
// claims and billing come from CHA_QUICK_REF (plans-benefits.js) through
// the qr name, so there is one source for those facts. No benefit table
// is copied here: the Plan tab links to the plan card and the script.
// The Before enrollment tab reads the live recap from the plan script's
// Post Close (PLAN_SCRIPTS). aqNone: checked on the enrollment portal
// Oct 22 2026 (test client, never submitted) and there are no
// application questions. aqTodo: not checked yet.
// ---------------------------------------------------------------
function cwTiers(list, script) {
  return list.map(function (t) {
    return {
      tier: t,
      ben: [],
      script: typeof script === 'function' ? script(t) : script || ''
    };
  });
}

var CW_NONE_FE =
  'Checked on the FirstEnroll portal Oct 22 2026: no application questions. You only fill in the member, contact, payment and authorization pages.';
var CW_NONE_NEO =
  'Checked on the NEO portal Oct 22 2026: no application questions. You only fill in the member, contact, payment and authorization pages.';
var CW_NONE_PR =
  'Checked on the Premier portal Oct 22 2026: no application questions. You only fill in the member, contact, payment and authorization pages.';
var CW_LV_SCRIPT =
  'Advanced Wellness or HarmonyCare and SigmaCare (Match Network to Plan)';
var CW_LV_TIERS = ['100A', '100', '200', '200+', '300', '500', '750', '1000'];

CW_FAMS.push(
  {
    name: 'Allstate Health Access',
    qr: 'Allstate Health Access',
    type: 'Limited',
    platform: 'NEO',
    aq: 'allstateha',
    tiers: cwTiers(['Plan'], '')
  },
  {
    name: 'WB Choice / Select',
    qr: 'WB Select / WB Choice',
    type: 'Limited',
    platform: 'NEO',
    aqNone: CW_NONE_NEO,
    tiers: cwTiers(
      ['Choice', 'Select'],
      'Goodlife Partners WB CHOICE and WB SELECT (Match Doctor visits to Plan)'
    )
  },
  {
    name: 'Pinnacle Protect',
    qr: 'Pinnacle Protect',
    type: 'Limited',
    platform: 'NEO',
    aqNone: CW_NONE_NEO,
    tiers: cwTiers(['2', '3', '4'], 'Pinnacle Protect Plan 1 - 4') // lineup-guard-ignore: script name
  },
  {
    name: 'AWA SimpleShield',
    qr: 'AWA SimpleShield',
    type: 'Fixed indemnity',
    platform: 'NEO',
    aqTodo:
      'Not checked yet. The NEO cart would not continue with SimpleShield on Oct 22 2026. Check the application on the portal.',
    tiers: cwTiers(['1', '2'], '')
  },
  {
    name: 'Harmony Care PLUS',
    qr: 'Harmony Care PLUS',
    type: 'Limited',
    platform: 'FirstEnroll',
    aqNone: CW_NONE_FE,
    tiers: cwTiers(CW_LV_TIERS, CW_LV_SCRIPT)
  },
  {
    name: 'Harmony Care',
    qr: 'Harmony Care',
    type: 'Limited',
    platform: 'FirstEnroll',
    aqNone: CW_NONE_FE,
    tiers: cwTiers(
      ['100A', '100B', '100', '200', '200+', '300', '500', '750', '1000'],
      CW_LV_SCRIPT
    )
  },
  {
    name: 'Advanced Wellness PLUS',
    qr: 'Advanced Wellness PLUS',
    type: 'Limited',
    platform: 'FirstEnroll',
    aq: 'afslic20',
    tiers: cwTiers(CW_LV_TIERS, CW_LV_SCRIPT)
  },
  {
    name: 'Sigma Care PLUS',
    qr: 'Sigma Care PLUS',
    type: 'Limited',
    platform: 'FirstEnroll',
    aq: 'afslic20',
    tiers: cwTiers(CW_LV_TIERS, CW_LV_SCRIPT)
  },
  {
    name: 'Health Choice Silver',
    qr: 'Health Choice Silver',
    type: 'Limited',
    platform: 'FirstEnroll',
    aqNone: CW_NONE_FE,
    tiers: cwTiers(['Over 65'].concat(CW_LV_TIERS), 'Health Choice Silver')
  },
  {
    name: 'BWA Paramount',
    qr: 'BWA Paramount',
    type: 'Limited',
    platform: 'FirstEnroll',
    aqNone: CW_NONE_FE,
    tiers: cwTiers(
      ['1', '2', '3', '4', '5', '6'],
      'BWA Paramount 1-6 (First Enroll)'
    )
  },
  {
    name: 'BWA Americare',
    qr: 'BWA Americare',
    type: 'Limited',
    platform: 'FirstEnroll',
    aqNone: CW_NONE_FE,
    tiers: cwTiers(['2', '3', '4'], 'BWA Americare 2,3,4 (First Enroll)')
  },
  {
    name: 'NexusCare STM',
    qr: 'NexusCare STM',
    type: 'STM',
    platform: 'Premier',
    aq: 'nexuscare',
    tiers: cwTiers(['Base', 'PPO'], function (t) {
      return 'NexusCare ' + t + ' STM';
    })
  },
  {
    name: 'CrownPoint STM',
    qr: 'CrownPoint STM',
    type: 'STM',
    platform: 'Premier',
    aq: 'crownpoint',
    tiers: cwTiers(['Standard'], 'CrownPoint STM')
  },
  {
    name: 'RiseHealth STM',
    qr: 'RiseHealth STM',
    type: 'STM',
    platform: 'Premier',
    aq: 'risehealth',
    tiers: cwTiers(['Traditional', 'Lite Plus', 'Lite'], function (t) {
      return 'RiseHealth STM ' + t;
    })
  },
  {
    name: 'HD HealthAscent',
    qr: 'HD HealthAscent',
    type: 'Limited',
    platform: 'Premier',
    aq: 'hdhealthascent',
    tiers: cwTiers(['1', '2', '3'], function (t) {
      return 'HD HealthAscent Plan ' + t;
    })
  },
  {
    name: 'HealthEssential',
    qr: 'HealthEssential',
    type: 'Limited',
    platform: 'Premier',
    aqNone: CW_NONE_PR,
    tiers: cwTiers(['1', '2', '3', '4'], function (t) {
      return t === '4'
        ? 'HealthEssential 4'
        : 'HealthEssential 1, 2, 3 (Match Visits to Plan)';
    })
  },
  {
    name: 'AWA TrueHealth',
    qr: 'AWA TrueHealth',
    type: 'Limited',
    platform: 'Premier',
    aqNone: CW_NONE_PR,
    tiers: cwTiers(['Value', '1', '2', '3', '4'], function (t) {
      return 'AWA TrueHealth ' + t;
    })
  },
  {
    name: 'PrimeProtect',
    qr: 'PrimeProtect',
    type: 'Fixed indemnity',
    platform: 'Premier',
    aqNone: CW_NONE_PR,
    tiers: cwTiers(
      ['Basic', 'Plus', 'Preferred', 'Premium', 'Platinum'],
      'PrimeProtect Basic, Plus, Preferred, Premium, Platinum'
    )
  },
  {
    name: 'HealthBoost',
    qr: 'HealthBoost',
    type: 'Fixed indemnity',
    platform: 'Premier',
    aqTodo:
      'Not checked yet. HealthBoost was not on the Florida Premier storefront on Oct 22 2026. Check the application on the portal.',
    tiers: cwTiers(['1', '2', '3', '4'], function (t) {
      if (t === '1' || t === '2') {
        return 'HealthBoost ' + t + ' and HealthBoost + DPC ' + t;
      }
      return 'HealthBoost 3 and 4 and HealthBoost + DPC 3 and 4';
    })
  },
  {
    name: 'AdvantCare 50',
    qr: 'AdvantCare 50',
    type: 'Fixed indemnity',
    platform: 'Premier',
    aqTodo:
      'Not checked yet. AdvantCare 50 was not on the Florida Premier storefront on Oct 22 2026. Check the application on the portal.',
    tiers: cwTiers(['1', '2', '3'], '')
  },
  {
    name: 'AdvantCare',
    qr: 'AdvantCare (MEC)',
    type: 'MEC',
    platform: 'Premier',
    aqNone: CW_NONE_PR,
    tiers: cwTiers(
      [
        '2',
        '3',
        '3+',
        '6',
        '6+',
        '9',
        '9+',
        '12',
        '12+',
        'WellPremium',
        'WellPremium+'
      ],
      function (t) {
        if (t === '2') return 'AdvantCare 2';
        if (/^WellPremium/.test(t)) {
          return 'AdvantCare WellPremium and WellPremium+';
        }
        return 'AdvantCare 3, 6, 9, 12 and 3+, 6+, 9+, 12+ (Match Visits to Plan)';
      }
    )
  },
  {
    name: 'TVP Health',
    qr: 'TVP Health',
    type: 'MEC',
    platform: 'Premier',
    aqNone: CW_NONE_PR,
    tiers: cwTiers(['1', '2', '3', '4', '5'], function (t) {
      return Number(t) <= 3
        ? 'TVP Health Plan 1, 2, 3 (Match Visits to Plan)'
        : 'TVP Health Plan 4, 5 (Match Visits to Plan)';
    })
  }
);

// Quick Reference names and app-question status for the first nine
// families, which keep their own facts and benefit tables above.
(function () {
  var extra = {
    TDK: { qr: 'TDK' },
    GoodHealth: { qr: 'GoodHealth (GHDP)', aqNone: CW_NONE_FE },
    SmartChoice: { qr: 'SmartChoice' },
    'Harbor STM': { qr: 'Harbor STM' },
    'Pinnacle STM': { qr: 'Pinnacle STM' },
    'Galena STM': { qr: 'AFRP Galena STM', aq: 'galena' },
    'SmartHealth STM': { qr: 'SmartHealth STM', aq: 'smarthealth' },
    'Access Health STM': { qr: 'Access Health STM' },
    'Allstate STM PPO': { qr: 'Allstate STM PPO', aq: 'allstatestm' }
  };
  CW_FAMS.forEach(function (f) {
    var x = extra[f.name];
    if (!x) return;
    Object.keys(x).forEach(function (k) {
      f[k] = x[k];
    });
  });
})();

// Plans with no reviewed script stay off On Call (Mey, Oct 26 2026).
(function () {
  if (typeof CW_DISC === 'undefined' || !CW_DISC.hide) return;
  for (var i = CW_FAMS.length - 1; i >= 0; i--) {
    if (CW_DISC.hide.indexOf(CW_FAMS[i].name) !== -1) CW_FAMS.splice(i, 1);
  }
})();

var CW_TYPES = ['MEC', 'STM', 'Limited', 'Fixed indemnity'];

// On Call script names that differ from the PLAN_SCRIPTS name.
var CW_PS_NAME = {
  'GoodHealth 1,2,3': 'MedFirst/GoodHealth 1,2,3', // lineup-guard-ignore: script name
  'GoodHealth 4,5': 'MedFirst/ GoodHealth 4, 5 (Need Primary SSN)', // lineup-guard-ignore: script name
  'TDK 1,2,3': 'TDK 1,2,3 (Need Primary SSN)',
  'TDK 4,5': 'TDK 4,5 (Need Primary SSN)'
};

function cwQr(fam) {
  if (typeof CHA_QUICK_REF === 'undefined' || !fam.qr) return null;
  for (var i = 0; i < CHA_QUICK_REF.length; i++) {
    if (CHA_QUICK_REF[i].name === fam.qr) return CHA_QUICK_REF[i];
  }
  return null;
}

function cwFacts(fam) {
  if (fam.facts) return fam.facts;
  var q = cwQr(fam);
  if (!q) return [];
  var out = [
    ['Network', q.network],
    [q.uwLabel || 'Underwriter', q.uw],
    ['Association', q.assoc],
    ['Billing', q.billing]
  ];
  return out.filter(function (f) {
    return f[1];
  });
}

function cwLiveScript(name) {
  if (!name || typeof PLAN_SCRIPTS === 'undefined') return null;
  var want = CW_PS_NAME[name] || name;
  for (var i = 0; i < PLAN_SCRIPTS.length; i++) {
    if (PLAN_SCRIPTS[i].name === want) return PLAN_SCRIPTS[i];
  }
  return null;
}

function cwParas(text) {
  return String(text || '')
    .split(/\n\s*\n+/)
    .map(function (p) {
      return p.replace(/^\s+|\s+$/g, '');
    })
    .filter(Boolean);
}

function cwPostClose(name) {
  var s = cwLiveScript(name);
  if (!s) return [];
  for (var i = 0; i < s.sections.length; i++) {
    if (s.sections[i].title === 'Post Close') {
      return cwParas(s.sections[i].content);
    }
  }
  return [];
}

// The recap block of the live Post Close: from "Just for your records"
// up to the referral line.
function cwLiveRecap(name) {
  var paras = cwPostClose(name);
  var out = [];
  var on = false;
  for (var i = 0; i < paras.length; i++) {
    var at = paras[i].search(/Just for your records/i);
    if (!on && at !== -1) {
      on = true;
      out.push(paras[i].slice(at));
      continue;
    }
    if (on && /^If you have any friends/i.test(paras[i])) break;
    if (on) out.push(paras[i]);
  }
  return out;
}

// Escapes text and marks [VERIFY ...] placeholders left in a script.
function cwVerifyHtml(t) {
  return cwEsc(t).replace(/\[VERIFY[^\]]*\]/g, function (m) {
    return (
      '<mark class="cw-verify" title="Not filled in on the script yet">' +
      m +
      '</mark>'
    );
  });
}

var cwState = {
  fam: '',
  tier: '',
  startFam: '',
  type: 'MEC',
  q: '',
  browse: false,
  tab: 'plan',
  meds: '',
  hh: '1',
  conf: {},
  homeType: '',
  askQ: '',
  askOpen: {}
};
var cwMedsTimer = null;

function cwEsc(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cwCompact(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function cwDist(a, b) {
  var p = [];
  var c;
  var i;
  var j;
  for (j = 0; j <= b.length; j++) p[j] = j;
  for (i = 1; i <= a.length; i++) {
    c = [i];
    for (j = 1; j <= b.length; j++) {
      c[j] = Math.min(
        p[j] + 1,
        c[j - 1] + 1,
        p[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1)
      );
    }
    p = c;
  }
  return p[b.length];
}

function cwNear(w, c) {
  var tol = w.length >= 8 ? 2 : 1;
  for (var L = w.length - 1; L <= w.length + 1; L++) {
    for (var i = 0; i + L <= c.length; i++) {
      if (cwDist(w, c.slice(i, i + L)) <= tol) return true;
    }
  }
  return false;
}

function cwFam(name) {
  for (var i = 0; i < CW_FAMS.length; i++) {
    if (CW_FAMS[i].name === name) return CW_FAMS[i];
  }
  return CW_FAMS[0];
}

function cwTier(fam, tier) {
  for (var i = 0; i < fam.tiers.length; i++) {
    if (fam.tiers[i].tier === tier) return fam.tiers[i];
  }
  return fam.tiers[0];
}

// Search: returns [{fam, tiers:[...], hit:'tier typed or empty'}]
function cwSearch(q) {
  var words = [];
  String(q || '')
    .toLowerCase()
    .split(/\s+/)
    .forEach(function (w) {
      if (!w) return;
      var m = w.match(/^([a-z]+)(\d+)$/);
      if (m) {
        words.push(m[1]);
        words.push(m[2]);
      } else words.push(w);
    });
  if (!words.length) return [];
  words = words.map(function (w) {
    return cwCompact(CW_ALIAS[w] || w);
  });
  var hits = [];
  CW_FAMS.forEach(function (f) {
    f.tiers.forEach(function (t) {
      var c = cwCompact(f.name + ' ' + t.tier);
      var tc = cwCompact(t.tier);
      var s = 0;
      var ok = true;
      words.forEach(function (w) {
        if (tc === w) s += 3;
        else if (c.indexOf(w) === 0) s += 3;
        else if (c.indexOf(w) !== -1) s += 2;
        else if (w.length >= 4 && cwNear(w, c)) s += 1;
        else ok = false;
      });
      if (ok && s > 0) hits.push({ fam: f, tier: t.tier, s: s });
    });
  });
  hits.sort(function (a, b) {
    return b.s - a.s;
  });
  var groups = [];
  hits.forEach(function (h) {
    var g = null;
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].fam === h.fam) g = groups[i];
    }
    if (!g) {
      g = { fam: h.fam, list: [] };
      groups.push(g);
    }
    g.list.push(h.tier);
  });
  var qc = cwCompact(q);
  return groups.slice(0, 3).map(function (g) {
    var all = g.list.length > 1 || g.fam.tiers.length === 1;
    var tiers = all
      ? g.fam.tiers.map(function (t) {
          return t.tier;
        })
      : g.list;
    var hit = qc.indexOf(cwCompact(g.list[0])) !== -1 ? g.list[0] : '';
    if (tiers.length === 1) hit = tiers[0];
    return { fam: g.fam, tiers: tiers, hit: hit };
  });
}

function cwPick(famName, tier) {
  var f = cwFam(famName);
  cwState.fam = f.name;
  cwState.tier = tier;
  cwState.type = f.type;
  cwState.q = '';
  cwState.browse = false;
  cwState.startFam = '';
  cwState.homeType = '';
  cwState.tab = 'plan';
  cwState.askQ = '';
  cwRemember(f.name, tier);
  renderCallWorkspace();
}

// Before-enrollment block from the live plan script.
function cwScriptBlock(scriptName) {
  var s = scriptName ? CW_SCRIPTS[scriptName] : null;
  if (!s || !s.text) {
    var recap = cwLiveRecap(scriptName);
    if (!recap.length) return null;
    return {
      live: true,
      name: cwLiveScript(scriptName).name,
      paras: recap.map(function (p) {
        var wait = /\u25b6 \( ?Wait for [Aa]nswer ?\)\s*$/.test(p);
        return {
          t: p.replace(/\n?\u25b6 \( ?Wait for [Aa]nswer ?\)\s*$/, ''),
          confirm: wait
        };
      }),
      bill: ''
    };
  }
  return {
    paras: s.text.split(/\n\n+/).map(function (p) {
      var wait = /\u25b6 \( Wait for answer \)\s*$/.test(p);
      return {
        t: p.replace(/\n?\u25b6 \( Wait for answer \)\s*$/, ''),
        confirm: wait
      };
    }),
    bill: s.bill
  };
}

function cwMedsHtml() {
  if (typeof medsData === 'undefined' || !medsData) {
    return '<p class="cw-muted">Loading meds...</p>';
  }
  var rows = cwState.meds
    .split(/[,;\n]+/)
    .map(function (t) {
      return t.replace(/^\s+|\s+$/g, '');
    })
    .filter(Boolean);
  if (!rows.length) {
    return '<p class="cw-muted">Type the meds the client takes, separated by commas.</p>';
  }
  var n = parseInt(cwState.hh, 10) || 1;
  return rows
    .map(function (t) {
      var m = medsMatch(t);
      if (!m) {
        return (
          '<div class="cw-med"><b>' +
          cwEsc(t) +
          '</b><span class="cw-tag cw-tag-grey">Not on the PAP list</span></div>'
        );
      }
      var it = m.item;
      var lim =
        (it.f / 100) *
        (medsData.fpl.base['48'] + (n - 1) * medsData.fpl.extra['48']);
      return (
        '<div class="cw-med"><b>' +
        cwEsc(it.n) +
        '</b><span class="cw-muted">' +
        (m.exact ? '' : 'you typed "' + cwEsc(t) + '" - ') +
        cwEsc(it.m) +
        '</span><span class="cw-tag cw-tag-pap">PAP available - household income up to $' +
        Math.round(lim).toLocaleString('en-US') +
        '/yr</span></div>'
      );
    })
    .join('');
}

function cwEnsureMeds() {
  if (typeof medsData !== 'undefined' && medsData) return;
  if (typeof MEDS_JSON_URL === 'undefined' || typeof fetch !== 'function') {
    return;
  }
  if (cwEnsureMeds.started) return;
  cwEnsureMeds.started = true;
  fetch(MEDS_JSON_URL)
    .then(function (r) {
      if (!r.ok) throw new Error('load failed');
      return r.json();
    })
    .then(function (d) {
      medsData = d;
      medsBuildIndex();
      var box = document.getElementById('cw-meds-out');
      if (box) box.innerHTML = cwMedsHtml();
    })
    .catch(function () {
      cwEnsureMeds.started = false;
    });
}

// Benefits and visit limits for plan families with no On Call table,
// copied from the enrollment portal Info pages (Oct 31 2026). Each row is
// [label, value, warn]. A dash on the portal is not a value, so it is left out.
var CW_PORTAL_BEN = {
  'AWA TrueHealth': {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      Value: [
        ['Doctor', '$65 per visit, 3 visits/yr', 0],
        ['Hospital', '$250/day, max 15 days/yr', 0],
        ['ICU', 'Not included', 0],
        ['Hospital admission', 'Not included', 0],
        ['Surgery', 'Not included', 0],
        ['Outpatient surgery facility', 'Not included', 0],
        ['Labs, x-ray, MRI/CT', '$25/day, 2 days/yr combined', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        ['Waiting period', '30 days for sickness (not ID or TX)', 1],
        [
          'Pre-existing',
          '12-month wait for conditions treated in the 12 months before the effective date',
          1
        ]
      ],
      1: [
        ['Doctor', '$60 per visit, 4 visits/yr', 0],
        ['Hospital', '$250/day, max 15 days/yr', 0],
        ['ICU', '$250/day, max 3 days/yr (on top of hospital)', 0],
        ['Hospital admission', '$200 first day, 1/yr', 0],
        ['Surgery', 'Not included', 0],
        ['Outpatient surgery facility', '$200/day, 1/yr', 0],
        ['Labs, x-ray, MRI/CT', '$50/day, 2 days/yr combined', 0],
        ['ER', '$100/visit, 1/yr', 0],
        ['Ambulance', '$100, 1/yr', 0],
        ['Waiting period', '30 days for sickness (not ID or TX)', 1],
        [
          'Pre-existing',
          '12-month wait for conditions treated in the 12 months before the effective date',
          1
        ]
      ],
      2: [
        ['Doctor', '$70 per visit, 5 visits/yr', 0],
        ['Hospital', '$500/day, max 30 days/yr', 0],
        ['ICU', '$500/day, max 3 days/yr (on top of hospital)', 0],
        ['Hospital admission', '$500 first day, 1/yr', 0],
        [
          'Surgery',
          '100% of surgical fee schedule, 1 day/yr; anesthesia 25%',
          0
        ],
        ['Outpatient surgery facility', '$300/day, 1/yr', 0],
        ['Labs, x-ray, MRI/CT', '$75/day, 2 days/yr combined', 0],
        ['ER', '$150/visit, 1/yr', 0],
        ['Ambulance', '$150, 1/yr', 0],
        ['Waiting period', '30 days for sickness (not ID or TX)', 1],
        [
          'Pre-existing',
          '12-month wait for conditions treated in the 12 months before the effective date',
          1
        ]
      ],
      3: [
        ['Doctor', '$75 per visit, 5 visits/yr', 0],
        ['Hospital', '$750/day, max 30 days/yr', 0],
        ['ICU', '$750/day, max 3 days/yr (on top of hospital)', 0],
        ['Hospital admission', '$750 first day, 1/yr', 0],
        [
          'Surgery',
          '100% of surgical fee schedule, 1 day/yr; anesthesia 25%',
          0
        ],
        ['Outpatient surgery facility', '$400/day, 1/yr', 0],
        ['Labs, x-ray, MRI/CT', '$85/day, 2 days/yr combined', 0],
        ['ER', '$200/visit, 1/yr', 0],
        ['Ambulance', '$200, 1/yr', 0],
        ['Waiting period', '30 days for sickness (not ID or TX)', 1],
        [
          'Pre-existing',
          '12-month wait for conditions treated in the 12 months before the effective date',
          1
        ]
      ],
      4: [
        ['Doctor', '$85 per visit, 5 visits/yr', 0],
        ['Hospital', '$1,000/day, max 30 days/yr', 0],
        ['ICU', '$1,000/day, max 3 days/yr (on top of hospital)', 0],
        ['Hospital admission', '$1,000 first day, 1/yr', 0],
        [
          'Surgery',
          '100% of surgical fee schedule, 1 day/yr; anesthesia 25%',
          0
        ],
        ['Outpatient surgery facility', '$500/day, 1/yr', 0],
        ['Labs, x-ray, MRI/CT', '$100/day, 2 days/yr combined', 0],
        ['ER', '$250/visit, 1/yr', 0],
        ['Ambulance', '$250, 1/yr', 0],
        ['Waiting period', '30 days for sickness (not ID or TX)', 1],
        [
          'Pre-existing',
          '12-month wait for conditions treated in the 12 months before the effective date',
          1
        ]
      ]
    }
  },
  HealthEssential: {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      1: [
        ['Doctor', '$75 per visit, 3 visits/yr', 0],
        ['Hospital', '$200/day, max 10 days per stay', 0],
        ['Hospital admission', '$500 first day, 1/yr', 0],
        ['ICU', 'Not included', 0],
        ['Inpatient surgery', '$500/day, 2 days/yr', 0],
        ['Outpatient surgery', '$500/day, 1 day(s)/yr', 0],
        ['Outpatient labs', 'Not included', 0],
        ['Inpatient labs', 'Not included', 0],
        ['ER (sickness only)', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'Pre-existing',
          'Not paid for the first 12 months; 12-month lookback (may vary by state)',
          1
        ]
      ],
      2: [
        ['Doctor', '$75 per visit, 3 visits/yr', 0],
        ['Hospital', '$200/day, max 10 days per stay', 0],
        ['Hospital admission', '$500 first day, 1/yr', 0],
        ['ICU', 'Not included', 0],
        ['Inpatient surgery', '$500/day, 2 days/yr', 0],
        ['Outpatient surgery', '$500/day, 1 day(s)/yr', 0],
        [
          'Outpatient labs',
          '$50/day, 2 days/yr (plus wellness labs $50/day, 2 days/yr)',
          0
        ],
        ['Inpatient labs', '$50/day, 1 day(s)/yr', 0],
        ['ER (sickness only)', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'Pre-existing',
          'Not paid for the first 12 months; 12-month lookback (may vary by state)',
          1
        ]
      ],
      3: [
        ['Doctor', '$75 per visit, 6 visits/yr', 0],
        ['Hospital', '$1,000/day, max 10 days per stay', 0],
        ['Hospital admission', '$500 first day, 1/yr', 0],
        ['ICU', 'Not included', 0],
        ['Inpatient surgery', '$1,000/day, 2 days/yr', 0],
        ['Outpatient surgery', '$1,000/day, 1 day(s)/yr', 0],
        [
          'Outpatient labs',
          '$200/day, 2 days/yr (plus wellness labs $200/day, 2 days/yr)',
          0
        ],
        ['Inpatient labs', '$200/day, 1 day(s)/yr', 0],
        ['ER (sickness only)', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'Pre-existing',
          'Not paid for the first 12 months; 12-month lookback (may vary by state)',
          1
        ]
      ],
      4: [
        ['Doctor', '$100 per visit, 6 visits/yr', 0],
        ['Hospital', '$1,500/day, max 90 days per stay', 0],
        ['Hospital admission', '$500 first day, 1/yr', 0],
        ['ICU', '$1,500/day, max 30 days/yr', 0],
        ['Inpatient surgery', '$1,500/day, 2 days/yr', 0],
        ['Outpatient surgery', '$1,500/day, 2 day(s)/yr', 0],
        [
          'Outpatient labs',
          '$250/day, 2 days/yr (plus wellness labs $250/day, 2 days/yr)',
          0
        ],
        ['Inpatient labs', '$250/day, 2 day(s)/yr', 0],
        ['ER (sickness only)', '$250/visit, 1/yr', 0],
        ['Ambulance', '$250, 1/yr', 0],
        [
          'Pre-existing',
          'Not paid for the first 12 months; 12-month lookback (may vary by state)',
          1
        ]
      ]
    }
  },
  'HD HealthAscent': {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      1: [
        ['Doctor', '$75 per visit, 4 visits/yr', 0],
        ['Hospital', '$300/day, max 31 days per stay', 0],
        [
          'Observation unit',
          '$75 / $150 / $225 (12-23 hrs / 24-47 hrs / 48+ hrs)',
          0
        ],
        ['ICU', 'Not included', 0],
        ['First day in hospital', 'Not included', 0],
        ['Urgent care', 'Not included', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        ['Surgery', 'Not included', 0],
        ['Labs', 'Surgical pathology $50, PAP/PSA $50, other $25', 0],
        ['Imaging', 'MRI/PET/CT $100, mammogram $50, other $50', 0],
        ['Therapy (PT/OT/speech)', '$25', 0],
        ['Outpatient max', '$4,000/yr for all outpatient benefits', 0],
        [
          'Pre-existing',
          'Not paid until insured 12 months; 12-month lookback',
          1
        ]
      ],
      2: [
        ['Doctor', '$75 per visit, 4 visits/yr', 0],
        ['Hospital', '$500/day, max 31 days per stay', 0],
        [
          'Observation unit',
          '$125 / $250 / $375 (12-23 hrs / 24-47 hrs / 48+ hrs)',
          0
        ],
        ['ICU', '$500/day, max 31 days per stay', 0],
        ['First day in hospital', '$500, 1/yr', 0],
        ['Urgent care', '$150/visit, 2/yr', 0],
        ['ER', '$150/visit, 1/yr', 0],
        ['Ambulance', 'Ground $200, air $600, 2 trips/yr', 0],
        [
          'Surgery',
          'Per surgical schedule; outpatient facility $500/day; max $50,000/yr',
          0
        ],
        ['Labs', 'Surgical pathology $100, PAP/PSA $100, other $75', 0],
        ['Imaging', 'MRI/PET/CT $200, mammogram $100, other $100', 0],
        ['Therapy (PT/OT/speech)', '$75', 0],
        ['Outpatient max', '$4,000/yr for all outpatient benefits', 0],
        [
          'Pre-existing',
          'Not paid until insured 12 months; 12-month lookback',
          1
        ]
      ],
      3: [
        ['Doctor', '$100 per visit, 4 visits/yr', 0],
        ['Hospital', '$1,000/day, max 31 days per stay', 0],
        [
          'Observation unit',
          '$250 / $500 / $750 (12-23 hrs / 24-47 hrs / 48+ hrs)',
          0
        ],
        ['ICU', '$1,000/day, max 31 days per stay', 0],
        ['First day in hospital', '$1,000, 1/yr', 0],
        ['Urgent care', '$250/visit, 2/yr', 0],
        ['ER', '$250/visit, 1/yr', 0],
        ['Ambulance', 'Ground $300, air $900, 2 trips/yr', 0],
        [
          'Surgery',
          'Per surgical schedule; outpatient facility $500/day; max $50,000/yr',
          0
        ],
        ['Labs', 'Surgical pathology $150, PAP/PSA $150, other $100', 0],
        ['Imaging', 'MRI/PET/CT $300, mammogram $150, other $150', 0],
        ['Therapy (PT/OT/speech)', '$100', 0],
        ['Outpatient max', '$4,000/yr for all outpatient benefits', 0],
        [
          'Pre-existing',
          'Not paid until insured 12 months; 12-month lookback',
          1
        ]
      ]
    }
  },
  'TVP Health': {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      1: [
        ['Preventive', '100% in-network (preventive services list)', 0],
        ['Doctor', '$25 copay, $150 max per visit, 3 visits/yr', 0],
        [
          'Specialist / urgent care',
          '$50 copay, $300 max per visit, 1 visit/yr',
          0
        ],
        ['Hospital', '$1,000/day, max $5,000/yr (if admitted)', 0],
        ['Surgery', 'Not included', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        ['Rx', 'Discount prescriptions only (HarmonyRx)', 0],
        ['Telehealth', '$0, unlimited', 0],
        ['Group term life', '$5,000', 0],
        ['Waiting period', '30 days for sickness', 1],
        [
          'Pre-existing',
          'Hospital benefit does not cover pre-existing conditions',
          1
        ]
      ],
      2: [
        ['Preventive', '100% in-network (preventive services list)', 0],
        ['Doctor', '$25 copay, $150 max per visit, 4 visits/yr', 0],
        [
          'Specialist / urgent care',
          '$50 copay, $300 max per visit, 2 visits/yr',
          0
        ],
        ['Hospital', '$1,000/day, max $10,000/yr (if admitted)', 0],
        ['Surgery', 'Not included', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'Rx',
          'Acute and preventive generics $0; 200 maintenance generics $5',
          0
        ],
        ['Telehealth', '$0, unlimited', 0],
        ['Group term life', '$5,000', 0],
        ['Waiting period', '30 days for sickness', 1],
        [
          'Pre-existing',
          'Hospital benefit does not cover pre-existing conditions',
          1
        ]
      ],
      3: [
        ['Preventive', '100% in-network (preventive services list)', 0],
        ['Doctor', '$25 copay, $150 max per visit, 4 visits/yr', 0],
        [
          'Specialist / urgent care',
          '$50 copay, $300 max per visit, 4 visits/yr',
          0
        ],
        ['Hospital', '$1,000/day, max $15,000/yr (if admitted)', 0],
        ['Surgery', 'Not included', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'Rx',
          'Acute and preventive generics $0; 200 maintenance generics $10; non-preferred generic $20; $3,000/yr limit on non-preventive drugs',
          0
        ],
        ['Telehealth', '$0, unlimited', 0],
        ['Group term life', '$5,000', 0],
        ['Waiting period', '30 days for sickness', 1],
        [
          'Pre-existing',
          'Hospital benefit does not cover pre-existing conditions',
          1
        ]
      ],
      4: [
        ['Preventive', '100% in-network (preventive services list)', 0],
        ['Wellness exam', '$0 copay, $150 max, 1/yr', 0],
        ['Doctor', '$50 copay, $150 max per visit, 4 visits/yr', 0],
        [
          'Specialist / urgent care',
          '$75 copay, $300 max per visit, 4 visits/yr',
          0
        ],
        ['Hospital', '$1,000/day, max $10,000/yr (if admitted)', 0],
        ['Surgery', '$1,000/day, max $2,000/yr', 0],
        ['ER', '$1,000 per incident (if admitted)', 0],
        ['Ambulance', '$500 per incident (if admitted)', 0],
        [
          'Rx',
          'Acute and preventive generics $0; 200 maintenance generics $10; non-preferred generic $20; $3,000/yr limit on non-preventive drugs',
          0
        ],
        ['Telehealth', '$0, unlimited', 0],
        ['Group term life', '$5,000', 0],
        ['Waiting period', '30 days for sickness', 1],
        [
          'Pre-existing',
          'Hospital benefit does not cover pre-existing conditions',
          1
        ]
      ],
      5: [
        ['Preventive', '100% in-network (preventive services list)', 0],
        ['Wellness exam', '$0 copay, $150 max, 1/yr', 0],
        ['Doctor', '$50 copay, $150 max per visit, 5 visits/yr', 0],
        [
          'Specialist / urgent care',
          '$75 copay, $300 max per visit, 5 visits/yr',
          0
        ],
        ['Hospital', '$1,500/day, max $15,000/yr (if admitted)', 0],
        ['Surgery', '$1,500/day, max $4,500/yr', 0],
        ['ER', '$1,000 per incident (if admitted)', 0],
        ['Ambulance', '$500 per incident (if admitted)', 0],
        [
          'Rx',
          'Acute and preventive generics $0; 200 maintenance generics $10; non-preferred generic $20; $3,000/yr limit on non-preventive drugs',
          0
        ],
        ['Telehealth', '$0, unlimited', 0],
        ['Group term life', '$5,000', 0],
        ['Waiting period', '30 days for sickness', 1],
        [
          'Pre-existing',
          'Hospital benefit does not cover pre-existing conditions',
          1
        ]
      ]
    }
  },
  AdvantCare: {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      2: [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay, 2 visits/yr', 0],
        ['Specialist', 'Not included', 0],
        ['Labs', '$50 copay, 1 panel/yr', 0],
        ['Mental health / SUD office', '$25 copay, 2 visits/yr combined', 0],
        ['Hospital', 'Not included', 0],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      3: [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '3 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', 'Not included', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$5,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      '3+': [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '3 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', '$50 copay, 1 visit(s)/yr', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$5,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      6: [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '6 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', 'Not included', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$10,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      '6+': [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '6 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', '$50 copay, 2 visit(s)/yr', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$10,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      9: [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '9 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', 'Not included', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$15,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      '9+': [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '9 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', '$50 copay, 3 visit(s)/yr', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$15,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      12: [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '12 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', '$50 copay, 1 visit(s)/yr', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$15,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      '12+': [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$25 copay', 0],
        ['Specialist', '$50 copay', 0],
        ['Visit limit', '12 visits/yr, doctor and specialist combined', 0],
        ['Urgent care', '$50 copay, 4 visit(s)/yr', 0],
        ['Mental health / SUD outpatient', '$50 copay', 0],
        [
          'Hospital',
          '$20,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      WellPremium: [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$35 copay existing doctor, $70 new doctor', 0],
        ['Specialist', '$75 copay existing doctor, $150 new doctor', 0],
        ['Urgent care', '$75 copay', 0],
        [
          'Mental health / SUD outpatient',
          '$75 existing doctor, $150 new doctor',
          0
        ],
        ['Labs', '$50 copay per panel', 0],
        ['X-ray / imaging', '$50 copay per image', 0],
        ['CT / MRI / PET', '$500 copay per image', 0],
        ['Pregnancy office visits', '$75 existing doctor, $150 new doctor', 0],
        ['Hospital', 'Not listed on the portal', 0],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ],
      'WellPremium+': [
        ['Deductible', '$0 in-network', 0],
        [
          'Max out of pocket',
          '$9,200 individual / $18,400 family (in-network)',
          0
        ],
        ['Preventive', '$0 in-network', 0],
        ['Doctor', '$35 copay existing doctor, $70 new doctor', 0],
        ['Specialist', '$75 copay existing doctor, $150 new doctor', 0],
        ['Urgent care', '$75 copay', 0],
        [
          'Mental health / SUD outpatient',
          '$75 existing doctor, $150 new doctor',
          0
        ],
        ['Labs', '$50 copay per panel', 0],
        ['X-ray / imaging', '$50 copay per image', 0],
        ['CT / MRI / PET', '$500 copay per image', 0],
        ['Pregnancy office visits', '$75 existing doctor, $150 new doctor', 0],
        [
          'Hospital',
          '$20,000 indemnity hospital benefit (incl. mental health/SUD)',
          0
        ],
        ['Rx', 'Preventive generics only, $0', 0],
        ['Where', 'In-network only; not covered at a hospital', 1]
      ]
    }
  },
  'AdvantCare 50': {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      1: [
        ['Deductible', '$5,000/yr', 0],
        ['Plan year limit', '$50,000', 0],
        [
          'Hospital, ICU, inpatient surgery',
          'Per the inpatient payment schedule, 3 stays/yr',
          0
        ],
        ['Outpatient surgery', 'Not included', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'Waiting period',
          '1 month for sickness; 3 months for facilities (not ER, ambulance, diabetes, high blood pressure, accidents, unscheduled hospital stays)',
          1
        ],
        [
          'Pre-existing',
          '12 months (does not apply to diabetes or high blood pressure)',
          1
        ]
      ],
      2: [
        ['Deductible', '$5,000/yr', 0],
        ['Plan year limit', '$50,000', 0],
        [
          'Hospital, ICU, inpatient surgery',
          'Per the inpatient payment schedule, 3 stays/yr',
          0
        ],
        ['Outpatient surgery', 'Per the outpatient payment schedule, 3/yr', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'Waiting period',
          '1 month for sickness; 3 months for facilities (not ER, ambulance, diabetes, high blood pressure, accidents, unscheduled hospital stays)',
          1
        ],
        [
          'Pre-existing',
          '12 months (does not apply to diabetes or high blood pressure)',
          1
        ]
      ],
      3: [
        ['Deductible', '$5,000/yr', 0],
        ['Plan year limit', '$50,000', 0],
        [
          'Hospital, ICU, inpatient surgery',
          'Per the inpatient payment schedule, 3 stays/yr',
          0
        ],
        ['Outpatient surgery', 'Per the outpatient payment schedule, 3/yr', 0],
        ['ER', '$1,500, 1 visit/yr', 0],
        ['Ambulance', '$500, 1 transport/yr', 0],
        [
          'Waiting period',
          '1 month for sickness; 3 months for facilities (not ER, ambulance, diabetes, high blood pressure, accidents, unscheduled hospital stays)',
          1
        ],
        [
          'Pre-existing',
          '12 months (does not apply to diabetes or high blood pressure)',
          1
        ]
      ]
    }
  },
  PrimeProtect: {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      Basic: [
        ['Doctor', '$150 per visit, 2 visits/yr', 0],
        ['Urgent care', '$175 per visit, 1 visit(s)/yr', 0],
        [
          'Wellness',
          'Physical $150, mammogram $100, pap $150, colonoscopy $1,000, child shots $100 (1 each/yr)',
          0
        ],
        ['Labs and x-ray', '$40/day, 2 days/yr', 0],
        ['MRI / CT / other imaging', 'Not included', 0],
        ['Hospital', 'Not included', 0],
        ['Surgery', 'Not included', 0],
        ['ER (sickness)', 'Not included', 0],
        ['Critical illness', 'Not included', 0],
        ['Accident', 'Up to $1,000 per accident, $0 deductible', 0]
      ],
      Plus: [
        ['Doctor', '$150 per visit, 3 visits/yr', 0],
        ['Urgent care', '$175 per visit, 1 visit(s)/yr', 0],
        [
          'Wellness',
          'Physical $150, mammogram $100, pap $150, colonoscopy $1,000, child shots $100 (1 each/yr)',
          0
        ],
        ['Labs and x-ray', '$40/day, 2 days/yr', 0],
        ['MRI / CT / other imaging', 'Not included', 0],
        ['Hospital', 'Not included', 0],
        ['Surgery', 'Not included', 0],
        ['ER (sickness)', 'Not included', 0],
        ['Critical illness', 'Not included', 0],
        ['Accident', 'Up to $1,000 per accident, $0 deductible', 0]
      ],
      Preferred: [
        ['Doctor', '$150 per visit, 3 visits/yr', 0],
        ['Urgent care', '$175 per visit, 2 visit(s)/yr', 0],
        [
          'Wellness',
          'Physical $150, mammogram $100, pap $150, colonoscopy $1,000, child shots $100 (1 each/yr)',
          0
        ],
        ['Labs and x-ray', '$40/day, 3 days/yr', 0],
        [
          'MRI / CT / other imaging',
          'MRI $100, CT $50, other $40 (1 each/yr)',
          0
        ],
        ['Hospital', '$200/day, max 30 days/yr', 0],
        [
          'Surgery',
          '$500 inpatient and $500 outpatient, 1 each/yr; anesthesia 20%',
          0
        ],
        ['ER (sickness)', '$50 per visit, 3/yr', 0],
        [
          'Critical illness',
          '$2,000 for cancer, stroke or heart attack; 30-day wait',
          0
        ],
        ['Accident', 'Up to $2,500 per accident, $0 deductible', 0]
      ],
      Premium: [
        ['Doctor', '$150 per visit, 3 visits/yr', 0],
        ['Urgent care', '$175 per visit, 2 visit(s)/yr', 0],
        [
          'Wellness',
          'Physical $150, mammogram $100, pap $150, colonoscopy $1,000, child shots $100 (1 each/yr)',
          0
        ],
        ['Labs and x-ray', '$50/day, 6 days/yr', 0],
        [
          'MRI / CT / other imaging',
          'MRI $150, CT $75, other $50 (1 each/yr)',
          0
        ],
        ['Hospital', '$500/day, max 30 days/yr', 0],
        [
          'Surgery',
          '$1,000 inpatient and $1,000 outpatient, 1 each/yr; anesthesia 20%',
          0
        ],
        ['ER (sickness)', '$50 per visit, 3/yr', 0],
        [
          'Critical illness',
          '$4,000 for cancer, stroke or heart attack; 30-day wait',
          0
        ],
        ['Accident', 'Up to $2,500 per accident, $0 deductible', 0]
      ],
      Platinum: [
        ['Doctor', '$150 per visit, 4 visits/yr', 0],
        ['Urgent care', '$175 per visit, 2 visit(s)/yr', 0],
        [
          'Wellness',
          'Physical $150, mammogram $100, pap $150, colonoscopy $1,000, child shots $100 (1 each/yr)',
          0
        ],
        ['Labs and x-ray', '$60/day, 6 days/yr', 0],
        [
          'MRI / CT / other imaging',
          'MRI $200, CT $100, other $60 (1 each/yr)',
          0
        ],
        ['Hospital', '$1,000/day, max 30 days/yr', 0],
        [
          'Surgery',
          '$1,500 inpatient and $1,500 outpatient, 1 each/yr; anesthesia 20%',
          0
        ],
        ['ER (sickness)', '$50 per visit, 3/yr', 0],
        [
          'Critical illness',
          '$6,000 for cancer, stroke or heart attack; 30-day wait',
          0
        ],
        ['Accident', 'Up to $5,000 per accident, $0 deductible', 0]
      ]
    }
  },
  HealthBoost: {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      1: [
        ['Doctor', '$65 per visit, 2 visits/yr', 0],
        ['Labs', '$25/day, 2 days/yr', 0],
        ['Hospital', '$250/day, max 15 days per stay', 0],
        ['ICU', 'Not included', 0],
        ['Hospital admission', 'Not included', 0],
        ['Outpatient surgery facility', 'Not included', 0],
        ['Inpatient surgery', 'Not included', 0],
        ['ER', 'Not included', 0],
        ['Ambulance', 'Not included', 0],
        [
          'HealthBoost + DPC adds',
          'Unlimited $0 virtual care; $25 primary care visits; $50 urgent care; $25 chronic care visits',
          0
        ],
        [
          'Waiting period',
          '1 month for sickness; 3 months for facilities (not ER, ambulance, office visits, diabetes, high blood pressure, accidents, unscheduled hospital stays)',
          1
        ]
      ],
      2: [
        ['Doctor', '$70 per visit, 4 visits/yr', 0],
        ['Labs', '$50/day, 2 days/yr', 0],
        ['Hospital', '$500/day, max 30 days per stay', 0],
        ['ICU', '$500/day, max 30 days per stay', 0],
        ['Hospital admission', '$250, 1 per stay', 0],
        ['Outpatient surgery facility', '$200/day, 1/yr', 0],
        ['Inpatient surgery', 'Not included', 0],
        ['ER', '$150/visit, 1/yr', 0],
        ['Ambulance', '$200, 1/yr', 0],
        [
          'HealthBoost + DPC adds',
          'Unlimited $0 virtual care; $25 primary care visits; $50 urgent care; $25 chronic care visits',
          0
        ],
        [
          'Waiting period',
          '1 month for sickness; 3 months for facilities (not ER, ambulance, office visits, diabetes, high blood pressure, accidents, unscheduled hospital stays)',
          1
        ]
      ],
      3: [
        ['Doctor', '$75 per visit, 5 visits/yr', 0],
        ['Labs', '$85/day, 2 days/yr', 0],
        ['Hospital', '$750/day, max 30 days per stay', 0],
        ['ICU', '$750/day, max 30 days per stay', 0],
        ['Hospital admission', '$500, 1 per stay', 0],
        ['Outpatient surgery facility', '$400/day, 1/yr', 0],
        ['Inpatient surgery', '$500 surgeon, $125 anesthesia, 1/yr', 0],
        ['ER', '$200/visit, 1/yr', 0],
        ['Ambulance', '$200, 1/yr', 0],
        [
          'HealthBoost + DPC adds',
          'Unlimited $0 virtual care; $25 primary care visits; $50 urgent care; $25 chronic care visits',
          0
        ],
        [
          'Waiting period',
          '1 month for sickness; 3 months for facilities (not ER, ambulance, office visits, diabetes, high blood pressure, accidents, unscheduled hospital stays)',
          1
        ]
      ],
      4: [
        ['Doctor', '$75 per visit, 6 visits/yr', 0],
        ['Labs', '$125/day, 2 days/yr', 0],
        ['Hospital', '$1,000/day, max 30 days per stay', 0],
        ['ICU', '$1,000/day, max 30 days per stay', 0],
        ['Hospital admission', '$750, 1 per stay', 0],
        ['Outpatient surgery facility', '$600/day, 1/yr', 0],
        ['Inpatient surgery', '$750 surgeon, $250 anesthesia, 1/yr', 0],
        ['ER', '$250/visit, 1/yr', 0],
        ['Ambulance', '$300, 1/yr', 0],
        [
          'HealthBoost + DPC adds',
          'Unlimited $0 virtual care; $25 primary care visits; $50 urgent care; $25 chronic care visits',
          0
        ],
        [
          'Waiting period',
          '1 month for sickness; 3 months for facilities (not ER, ambulance, office visits, diabetes, high blood pressure, accidents, unscheduled hospital stays)',
          1
        ]
      ]
    }
  },
  'NexusCare STM': {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      Base: [
        ['Deductible', '$5,000 / $10,000 / $15,000 / $20,000 (family 2x)', 0],
        ['Coinsurance', '0%', 0],
        ['Max out of pocket', 'Met once the deductible is met', 0],
        ['Coverage max', '$500,000 or $1,000,000', 0],
        ['Doctor', '$30 copay, then plan pays 100%', 0],
        ['Specialist', '$60 copay, then plan pays 100%', 0],
        ['Urgent care', '$60 copay, then plan pays 100%', 0],
        [
          'Preventive exam',
          '1 visit up to $100, no deductible (3-month wait)',
          0
        ],
        ['ER', '$250 copay/day, then deductible', 0],
        ['Hospital', 'After deductible, plan pays 100%', 0],
        ['Mental health / SUD', 'Not covered', 0],
        [
          'Pre-existing',
          'Pre-existing exclusion and sickness waiting periods apply (length not on the portal)',
          1
        ]
      ],
      PPO: [
        [
          'Deductible',
          'In-network $5,000 / $8,000 / $10,000; out-of-network $6,600 / $10,600 / $13,300',
          0
        ],
        ['Coinsurance', '0% in-network; 25% out-of-network', 0],
        [
          'Max out of pocket',
          'In-network: met once the deductible is met; out-of-network: none',
          0
        ],
        [
          'Coverage max',
          'In-network $500,000 or $1,000,000; out-of-network $375,000 or $750,000',
          0
        ],
        [
          'Doctor / specialist / urgent care',
          'In-network: no charge after deductible',
          0
        ],
        ['Preventive exam', '1 visit up to $100 in-network (3-month wait)', 0],
        ['ER', '$250 copay, then deductible (copay waived if admitted)', 0],
        ['Hospital', 'In-network: no charge after deductible', 0],
        ['Mental health / SUD', 'In-network: no charge after deductible', 0],
        [
          'Pre-existing',
          'Pre-existing exclusion and sickness waiting periods apply (length not on the portal)',
          1
        ]
      ]
    }
  },
  'CrownPoint STM': {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      Standard: [
        ['Network', 'PHCS Practitioner & Ancillary', 0],
        ['Deductible', '$2,500 / $5,000 / $10,000', 0],
        ['Coinsurance', '50/50 or 80/20', 0],
        ['Max out of pocket', '$5,000', 0],
        ['Coverage max', '$1,000,000', 0],
        ['Doctor', '$50 copay, unlimited visits', 0],
        ['Wellness', '$50 copay, 1 visit', 0],
        [
          'Hospital',
          'Average standard room rate, after deductible and coinsurance',
          0
        ],
        ['Outpatient surgery', 'Extra $500 deductible per surgery (max 3)', 0],
        ['ER', 'Extra $500 deductible per visit (max 3)', 0],
        ['Advanced imaging', 'Extra $500 deductible per occurrence', 0],
        ['Ambulance', '$250 per transport', 0],
        [
          'Mental health / SUD',
          'Inpatient $100/day, 31 days; outpatient $50/day, 10 visits',
          0
        ],
        ['Therapy (PT/OT/speech)', '$50/day, 20 visits', 0],
        [
          'Pre-existing',
          'Pre-existing exclusion applies (length not on the portal)',
          1
        ]
      ]
    }
  },
  'RiseHealth STM': {
    src: 'Premier portal Info page (1enrollment.com), checked Oct 31 2026',
    tiers: {
      Traditional: [
        ['Deductible options', '$500 to $10,000', 0],
        ['Coinsurance', '80/20, $2,000 coinsurance limit', 0],
        ['Coverage max', '$250,000, $500,000 or $1,000,000', 0],
        ['Wellness', '$50 copay, 1 visit, no deductible', 0],
        ['Doctor', '$15 copay, unlimited', 0],
        ['Specialist', '$25 copay, unlimited', 0],
        ['Urgent care', '$15 copay, unlimited; extra $100 deductible', 0],
        ['Hospital', 'After deductible and coinsurance', 0],
        [
          'ER',
          'Extra $250 deductible (waived if admitted in 24 hrs), then deductible and coinsurance',
          0
        ],
        ['Ambulance', 'Up to $500 ground, $1,000 air', 0],
        [
          'Pre-existing',
          'Pre-existing exclusion applies (length not on the portal)',
          1
        ]
      ],
      'Lite Plus': [
        ['Deductible options', '$500 to $10,000', 0],
        ['Coinsurance', '80/20, $2,000 coinsurance limit', 0],
        ['Coverage max', '$250,000, $500,000 or $1,000,000', 0],
        ['Wellness', '$50 copay, 1 visit, no deductible', 0],
        ['Doctor', '$25 copay, unlimited', 0],
        ['Specialist', '$40 copay, unlimited', 0],
        ['Urgent care', '$25 copay, unlimited', 0],
        [
          'Hospital',
          'After deductible/coinsurance, up to $1,500/day (ICU up to $2,000/day)',
          0
        ],
        [
          'Surgery',
          'After deductible/coinsurance, up to $5,000 per surgery, $10,000 per period',
          0
        ],
        ['ER', 'No extra ER deductible; then deductible and coinsurance', 0],
        ['Ambulance', 'Up to $500 ground, $1,000 air', 0],
        [
          'Office visit max',
          '$2,000 per period for doctor and urgent care visits combined',
          0
        ],
        [
          'Pre-existing',
          'Pre-existing exclusion applies (length not on the portal)',
          1
        ]
      ],
      Lite: [
        ['Deductible options', '$500 to $10,000', 0],
        ['Coinsurance', '80/20, $2,000 coinsurance limit', 0],
        ['Coverage max', '$250,000, $500,000 or $1,000,000', 0],
        ['Wellness', '$50 copay, 1 visit, no deductible', 0],
        ['Doctor', '$25 copay, 2 visits per period', 0],
        ['Specialist', '$40 copay, 2 visits per period', 0],
        ['Urgent care', '$25 copay, 2 visits per period', 0],
        [
          'Hospital',
          'After deductible/coinsurance, up to $1,500/day (ICU up to $2,000/day)',
          0
        ],
        [
          'Surgery',
          'After deductible/coinsurance, up to $5,000 per surgery, $10,000 per period',
          0
        ],
        ['ER', 'No extra ER deductible; then deductible and coinsurance', 0],
        ['Ambulance', 'Up to $500 ground, $1,000 air', 0],
        [
          'Office visit max',
          '$2,000 per period for doctor and urgent care visits combined',
          0
        ],
        [
          'Pre-existing',
          'Pre-existing exclusion applies (length not on the portal)',
          1
        ]
      ]
    }
  },
  'Harmony Care': {
    src: 'FirstEnroll portal Info page, checked Oct 31 2026',
    tiers: {
      '100A': [
        ['Hospital', '$100/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 3 days/yr combined', 0]
      ],
      '100B': [
        ['Hospital', '$100/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 3 days/yr combined', 0]
      ],
      100: [
        ['Hospital', '$100/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 3 days/yr combined', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Accidental death', '$10,000', 0]
      ],
      200: [
        ['Hospital', '$200/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 1 day(s)/yr', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Accidental death', '$10,000', 0]
      ],
      '200+': [
        ['Hospital', '$200/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 3 day(s)/yr', 0],
        ['ER', '$50/day, 2/yr', 0],
        ['Surgery', '$400/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      300: [
        ['Hospital', '$300/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Surgery', '$400/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $150/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 1/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      500: [
        ['Hospital', '$500/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 2 day(s)/yr', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Surgery', '$750/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $250/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 1/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      750: [
        ['Hospital', '$750/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 2 day(s)/yr', 0],
        ['ER', '$75/day, 1/yr', 0],
        ['Surgery', '$1,000/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $375/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 2/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      1000: [
        ['Hospital', '$1,000/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$75/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$75/day, 3 day(s)/yr', 0],
        ['ER', '$100/day, 1/yr', 0],
        ['Surgery', '$1,500/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $500/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 3/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ]
    }
  },
  'Advanced Wellness PLUS': {
    src: 'FirstEnroll portal Info page, checked Oct 31 2026',
    tiers: {
      '100A': [
        ['Hospital', '$100/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 3 days/yr combined', 0]
      ],
      100: [
        ['Hospital', '$100/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 3 days/yr combined', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Accidental death', '$10,000', 0]
      ],
      200: [
        ['Hospital', '$200/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 1 day(s)/yr', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Accidental death', '$10,000', 0]
      ],
      '200+': [
        ['Hospital', '$200/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 3 day(s)/yr', 0],
        ['ER', '$50/day, 2/yr', 0],
        ['Surgery', '$400/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      300: [
        ['Hospital', '$300/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Surgery', '$400/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $150/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 1/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      500: [
        ['Hospital', '$500/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 2 day(s)/yr', 0],
        ['ER', '$50/day, 1/yr', 0],
        ['Surgery', '$750/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $250/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 1/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      750: [
        ['Hospital', '$750/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$50/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$50/day, 2 day(s)/yr', 0],
        ['ER', '$75/day, 1/yr', 0],
        ['Surgery', '$1,000/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $375/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 2/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ],
      1000: [
        ['Hospital', '$1,000/day, max 30 days', 0],
        ['Doctor (primary or specialist)', '$75/day, 5 days/yr combined', 0],
        ['Labs, x-ray, imaging', '$75/day, 3 day(s)/yr', 0],
        ['ER', '$100/day, 1/yr', 0],
        ['Surgery', '$1,500/day, 3 days/yr', 0],
        ['Anesthesia', '20%, 3 days/yr', 0],
        [
          'Mental health',
          'Inpatient $500/day, 60 days; outpatient $50/day, 20 days',
          0
        ],
        ['Accident', 'Hospital admission $500, 3/yr; ER $250, 1/yr', 0],
        ['Accidental death', '$10,000', 0],
        ['Critical illness', '$1,000', 0]
      ]
    }
  }
};

// Plan card benefits (POLICY_DOCS) for families with no On Call table,
// so the Plan tab always shows benefits and visit limits when the plan
// card has them. Read only: the card data is not changed.
// Tiers that have their own plan card (the family card covers the rest).
var CW_TIER_VAULT = {
  'WB Choice / Select': {
    Choice: 'goodlifewbchoice',
    Select: 'goodlifewbselect'
  }
};

function cwCardBenefits(fam, tier) {
  var q = fam ? cwQr(fam) : null;
  var byTier = fam && CW_TIER_VAULT[fam.name];
  var id = (byTier && tier && byTier[tier.tier]) || (q && q.vault);
  if (!id || typeof POLICY_DOCS === 'undefined') return null;
  for (var i = 0; i < POLICY_DOCS.length; i++) {
    if (POLICY_DOCS[i].id === id) {
      var b = POLICY_DOCS[i].benefits || [];
      return b.length ? b : null;
    }
  }
  return null;
}

function cwCardBenHtml(cats) {
  return cats
    .map(function (c) {
      var rows = (c.items || [])
        .map(function (item) {
          var s = String(item || '');
          var k = s.indexOf(': ');
          if (k > 0 && k <= 34) {
            return (
              '<div class="cw-ben"><span>' +
              cwEsc(s.slice(0, k)) +
              '</span><b>' +
              cwEsc(s.slice(k + 2)) +
              '</b></div>'
            );
          }
          return (
            '<div class="cw-ben cw-ben-full"><b>' + cwEsc(s) + '</b></div>'
          );
        })
        .join('');
      return (
        '<div class="cw-bcat">' + cwEsc(c.category || '') + '</div>' + rows
      );
    })
    .join('');
}

function cwPlanTab(tier, fam) {
  var q = fam ? cwQr(fam) : null;
  var ls = cwLiveScript(tier.script);
  var head =
    '<div class="cw-row cw-ben-head"><h3>Benefits</h3>' +
    (ls
      ? '<button type="button" class="cw-link cw-goscript" data-cw-script="' +
        cwEsc(ls.name) +
        '">Go to script &#8594;</button>'
      : '') +
    '</div>';
  var links = '';
  var cardBen = '';
  var portal = fam && CW_PORTAL_BEN[fam.name];
  var pRows = portal && portal.tiers[tier.tier];
  if (!tier.ben.length && pRows) {
    cardBen =
      pRows
        .map(function (b) {
          return (
            '<div class="cw-ben' +
            (b[2] ? ' is-warn' : '') +
            '"><span>' +
            cwEsc(b[0]) +
            '</span><b>' +
            cwEsc(b[1]) +
            '</b></div>'
          );
        })
        .join('') +
      '<p class="cw-foot">Source: ' +
      cwEsc(portal.src) +
      '.</p>';
  } else if (!tier.ben.length) {
    var cats = cwCardBenefits(fam, tier);
    if (cats) {
      cardBen =
        '<p class="cw-muted">From the plan card. Match the tier the client picked.</p>' +
        cwCardBenHtml(cats);
    } else {
      links =
        '<p class="cw-muted">No benefit sheet on file for this plan yet. Read the benefits from the plan script.</p>';
    }
    if (q && q.vault) {
      links +=
        '<div class="cw-row cw-links"><button type="button" class="cw-link" data-cw-vault="' +
        cwEsc(q.vault) +
        '">Open plan card</button></div>';
    }
  }
  var ben = tier.ben
    .map(function (b) {
      return (
        '<div class="cw-ben' +
        (b[2] ? ' is-warn' : '') +
        '"><span>' +
        cwEsc(b[0]) +
        '</span><b>' +
        cwEsc(b[1]) +
        '</b></div>'
      );
    })
    .join('');
  var hh = '';
  for (var i = 1; i <= 10; i++) {
    hh +=
      '<option value="' +
      i +
      '"' +
      (String(i) === cwState.hh ? ' selected' : '') +
      '>' +
      i +
      (i === 1 ? ' person' : ' people') +
      '</option>';
  }
  return (
    '<div class="cw-two"><section class="cw-card">' +
    head +
    ben +
    cardBen +
    links +
    '</section><section class="cw-card"><div class="cw-row"><h3>Meds - PAP check</h3><select id="cw-hh" class="cw-select">' +
    hh +
    '</select></div><input id="cw-meds" class="cw-input" type="text" autocomplete="off" spellcheck="false" placeholder="eliquis, ozempic, metformin" value="' +
    cwEsc(cwState.meds) +
    '"><div id="cw-meds-out">' +
    cwMedsHtml() +
    '</div><p class="cw-foot">Source: pap-lookup.com. RxSavers: not insurance, approval not guaranteed.</p></section></div>'
  );
}

function cwQuestionsTab(fam) {
  var plan = fam.aq && typeof appqFind === 'function' ? appqFind(fam.aq) : null;
  if (!plan && fam.aqNone) {
    return (
      '<div class="cw-status cw-ok"><b>No application questions</b><span>' +
      cwEsc(fam.aqNone) +
      '</span></div>'
    );
  }
  if (!plan && fam.aqTodo) {
    return (
      '<div class="cw-status cw-wait"><b>Not checked yet</b><span>' +
      cwEsc(fam.aqTodo) +
      '</span></div>'
    );
  }
  if (!plan) {
    return (
      '<div class="cw-status"><b>No application questions on file</b><span>None sent for ' +
      cwEsc(fam.name) +
      ' yet.</span></div>'
    );
  }
  return appqListHtml(plan, 'cw');
}

// Disclosures block for one plan tier: the approved short template in
// CW_DISC (js/oncall-disclosures.js) first, then the old script text.
function cwDiscBlock(fam, tier) {
  var id =
    typeof CW_DISC !== 'undefined' && CW_DISC.map
      ? CW_DISC.map[fam.name + '|' + tier.tier]
      : '';
  var d = id ? CW_DISC.blocks[id] : null;
  if (!d) return cwScriptBlock(tier.script);
  return {
    paras: d.paras.map(function (p) {
      var wait = /▶ \( Wait for answer \)\s*$/.test(p);
      return {
        t: p.replace(/\n?▶ \( Wait for answer \)\s*$/, ''),
        confirm: wait
      };
    }),
    bill: d.bill
  };
}

// Agent-only note lines (start with the play arrow) are shown smaller.
function cwDiscSayHtml(t) {
  return t
    .split('\n')
    .map(function (line) {
      if (/^▶ \(/.test(line)) {
        return '<span class="cw-disc-note">' + cwEsc(line) + '</span>';
      }
      return cwDiscKeyHtml(line);
    })
    .join('\n');
}

// Disclosures: highlight key words so agents can scan (Oct 26 2026).
// Red pill = limits and what is not covered, blue pill = numbers and
// time, purple pill = network, company and statement names. Text is unchanged.
var CW_KEY_RE = new RegExp(
  '(' +
    [
      "isn't major medical or an ACA plan",
      'not an ACA plan',
      'not major medical',
      "isn't major medical",
      'not a Medicare supplement',
      'does not provide coverage for [^.]+',
      "isn't covered",
      "aren't covered",
      'not covered',
      'pays nothing(?: more)?',
      'no out-of-pocket maximum',
      'not renewable(?: or extendable)?',
      "isn't renewable",
      'Pre-existing conditions',
      "isn't insurance",
      'not insurance',
      "(?:can't|doesn't) guarantee payment",
      'can decline it'
    ].join('|') +
    ')|(' +
    [
      '\\$[\\d,]+(?:\\.\\d+)?',
      '\\b\\d[\\d,]*(?:\\.\\d+)?%',
      '\\b\\d{3}-\\d{3}-\\d{4}\\b',
      '\\b\\d+-(?:day|month|year)\\b',
      '\\b\\d+ (?:days?|months?|years?|visits?)(?: in a row)?\\b',
      '\\bturn 65\\b',
      '\\bat 26\\b'
    ].join('|') +
    ')|(' +
    [
      'Neo Health Solutions',
      'Premier Health Solutions',
      'FirstEnroll',
      'PHS-HEALTH-BILL',
      'PHSHEALTH',
      'HEALTHPHS',
      '(?:[A-Z][\\w&.-]*\\s)+(?:PPO\\s)?[Nn]etwork\\b',
      '(?:[A-Z][\\w&.-]*\\s)+Company\\b',
      '(?:[A-Z][\\w&.-]*\\s)+Association\\b'
    ].join('|') +
    ')',
  'g'
);

function cwDiscKeyHtml(t) {
  t = String(t == null ? '' : t);
  if (/\[VERIFY/.test(t)) return cwVerifyHtml(t);
  var out = '';
  var last = 0;
  var m;
  CW_KEY_RE.lastIndex = 0;
  while ((m = CW_KEY_RE.exec(t))) {
    if (!m[0]) {
      CW_KEY_RE.lastIndex++;
      continue;
    }
    var cls = m[1] ? 'cw-k-warn' : m[2] ? 'cw-k-num' : 'cw-k-name';
    out +=
      cwEsc(t.slice(last, m.index)) +
      '<b class="' +
      cls +
      '">' +
      cwEsc(m[0]) +
      '</b>';
    last = m.index + m[0].length;
  }
  return out + cwEsc(t.slice(last));
}

function cwDiscTab(fam, tier) {
  var blk = cwDiscBlock(fam, tier);
  if (!blk) {
    return (
      '<div class="cw-status"><b>No script</b><span>No call script on file for ' +
      cwEsc(fam.name + ' ' + tier.tier) +
      ' yet.</span></div>'
    );
  }
  var key = fam.name + '|' + tier.tier;
  var conf = cwState.conf[key] || {};
  var total = 0;
  var yes = 0;
  var anyNo = false;
  var body = blk.paras
    .map(function (p, i) {
      if (!p.confirm) {
        return '<p class="cw-say">' + cwDiscSayHtml(p.t) + '</p>';
      }
      total++;
      var a = conf[i];
      if (a === 'Yes') yes++;
      if (a === 'No') anyNo = true;
      return (
        '<div class="cw-confirm' +
        (a === 'No' ? ' is-no' : '') +
        '"><p>' +
        cwDiscKeyHtml(p.t) +
        '</p><div class="cw-yn"><button type="button" class="cw-ans' +
        (a === 'Yes' ? ' is-yes' : '') +
        '" data-cw-conf="' +
        i +
        ':Yes">Yes</button><button type="button" class="cw-ans' +
        (a === 'No' ? ' is-no' : '') +
        '" data-cw-conf="' +
        i +
        ':No">No</button>' +
        (a === 'No'
          ? '<span>Explain it again in plain words, then ask once more.</span>'
          : '') +
        '</div></div>'
      );
    })
    .join('');
  var ready = total > 0 && yes === total && !anyNo;
  var st = !total
    ? [
        'wait',
        'Read the recap',
        'Say each part word for word. This recap has no confirm questions.'
      ]
    : anyNo
      ? [
          'stop',
          'Hold',
          'The client said No. Explain that point again before payment.'
        ]
      : ready
        ? ['ok', 'Ready to send DocuSign', 'The client confirmed every point.']
        : [
            'wait',
            yes + ' of ' + total + ' confirmed',
            'Read each part, then ask the green question.'
          ];
  return (
    '<div class="cw-status cw-' +
    st[0] +
    '"><b>' +
    st[1] +
    '</b><span>' +
    st[2] +
    '</span></div><section class="cw-card cw-script"><span class="cw-label">' +
    (blk.live
      ? 'Say word for word - recap from the ' + cwEsc(blk.name) + ' script'
      : 'Say word for word - before enrollment') +
    '</span><span class="cw-k-legend"><b class="cw-k-warn">Limits / not covered</b><b class="cw-k-num">Numbers</b><b class="cw-k-name">Names</b></span>' +
    body +
    '</section>' +
    (blk.bill
      ? '<section class="cw-card cw-bill' +
        (ready ? '' : ' is-dim') +
        '"><span class="cw-label">Then the bill breakdown</span><p>' +
        cwEsc(blk.bill) +
        '</p></section>'
      : '')
  );
}

// ---------------------------------------------------------------
// Live Call look (Oct 22 2026, approved by Mey on the design canvas):
// a search-only home with Recent and Browse by type, a glass call
// screen with four tabs: Plan, Disclosures, App questions, Client asks.
// ---------------------------------------------------------------
var CW_TYPE_LABEL = {
  MEC: 'MEC',
  STM: 'Short-term',
  Limited: 'Limited',
  'Fixed indemnity': 'Fixed indemnity'
};
var CW_RECENT_KEY = 'cha_oncall_recent';

function cwGreeting() {
  var g = '';
  try {
    if (typeof _buildGreetingText === 'function') g = _buildGreetingText();
  } catch (_e) {
    g = '';
  }
  return g ? g.replace(' ! ', ', ') : 'Welcome';
}

function cwPlat(fam) {
  return fam.platform === 'FirstEnroll'
    ? 'fe'
    : fam.platform === 'Premier'
      ? 'pr'
      : 'neo';
}

function cwRecent() {
  var r = typeof chaGet === 'function' ? chaGet(CW_RECENT_KEY, []) : [];
  if (!Array.isArray(r)) return [];
  return r.filter(function (x) {
    return x && x.fam && cwFamExists(x.fam);
  });
}

function cwFamExists(name) {
  for (var i = 0; i < CW_FAMS.length; i++) {
    if (CW_FAMS[i].name === name) return true;
  }
  return false;
}

function cwRemember(famName, tier) {
  if (typeof chaSet !== 'function') return;
  var r = cwRecent().filter(function (x) {
    return !(x.fam === famName && x.tier === tier);
  });
  r.unshift({ fam: famName, tier: tier });
  chaSet(CW_RECENT_KEY, r.slice(0, 4));
}

function cwRowHtml(fam, tiers) {
  var open = cwState.startFam === fam.name;
  return (
    '<div class="cwg-row' +
    (open ? ' is-open' : '') +
    '"><button type="button" class="cwg-row-head" data-cw-start="' +
    cwEsc(fam.name) +
    '" aria-expanded="' +
    (open ? 'true' : 'false') +
    '"><span class="cwg-dot cwg-dot-' +
    cwPlat(fam) +
    '"></span><b>' +
    cwEsc(fam.name) +
    '</b><span class="cwg-meta">' +
    cwEsc((CW_TYPE_LABEL[fam.type] || fam.type) + ' \u00b7 ' + fam.platform) +
    '</span><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>' +
    (open
      ? '<div class="cwg-tiers">' +
        tiers
          .map(function (t) {
            return (
              '<button type="button" class="cwg-btn" data-cw-pick="' +
              cwEsc(fam.name) +
              '|' +
              cwEsc(t) +
              '">' +
              cwEsc(t) +
              '</button>'
            );
          })
          .join('') +
        '</div>'
      : '') +
    '</div>'
  );
}

function cwHomeListHtml() {
  var rows = [];
  if (cwState.q) {
    cwSearch(cwState.q).forEach(function (g) {
      rows.push(cwRowHtml(g.fam, g.tiers));
    });
  } else {
    CW_FAMS.forEach(function (f) {
      if (f.type !== cwState.homeType) return;
      rows.push(
        cwRowHtml(
          f,
          f.tiers.map(function (t) {
            return t.tier;
          })
        )
      );
    });
  }
  return (
    (cwState.q
      ? ''
      : '<button type="button" class="cwg-back" data-cw-home-type="">\u2039 All types</button>') +
    '<section class="cwg-panel cwg-list">' +
    (rows.length
      ? rows.join('')
      : '<p class="cwg-empty">No plan matches. Try the plan name or tier.</p>') +
    '</section>'
  );
}

function cwHomeIdleHtml() {
  var recent = cwRecent();
  var counts = {};
  CW_FAMS.forEach(function (f) {
    counts[f.type] = (counts[f.type] || 0) + 1;
  });
  return (
    (recent.length
      ? '<span class="cwg-label">Recent</span><div class="cwg-chips">' +
        recent
          .map(function (r) {
            var f = cwFam(r.fam);
            var name = f.name + (f.tiers.length > 1 ? ' ' + r.tier : '');
            return (
              '<button type="button" class="cwg-btn cwg-chip" data-cw-pick="' +
              cwEsc(r.fam) +
              '|' +
              cwEsc(r.tier) +
              '"><span class="cwg-dot cwg-dot-' +
              cwPlat(f) +
              '"></span>' +
              cwEsc(name) +
              '</button>'
            );
          })
          .join('') +
        '</div>'
      : '') +
    '<span class="cwg-label">Browse by type</span><div class="cwg-types">' +
    CW_TYPES.map(function (ty) {
      return (
        '<button type="button" class="cwg-btn cwg-type" data-cw-home-type="' +
        cwEsc(ty) +
        '"><b>' +
        cwEsc(CW_TYPE_LABEL[ty] || ty) +
        '</b><span>' +
        (counts[ty] || 0) +
        ' plans</span></button>'
      );
    }).join('') +
    '</div>'
  );
}

function cwStartHtml() {
  return (
    '<div class="cwg cwg-home"><div class="cwg-wrap">' +
    '<section class="cwg-panel cwg-hero"><div class="cwg-logo"><img src="logo.png" alt="Central Health Advisors"></div><h2>' +
    cwEsc(cwGreeting()) +
    '</h2><p>Which plan are you selling?</p><label class="cwg-sr" for="cw-q">Find a plan</label><div class="cwg-search"><svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="cw-q" type="search" autocomplete="off" spellcheck="false" placeholder="sc 1500, harbor access, tdk 3" value="' +
    cwEsc(cwState.q) +
    '"></div></section>' +
    (cwState.q || cwState.homeType ? cwHomeListHtml() : cwHomeIdleHtml()) +
    '</div></div>'
  );
}

// Client asks: safe answers from Mey's CHA Live Call Scripts draft
// (cheat sheet) with this plan's network, insurer, association and
// billing filled in from cwFacts. A [bracket] is a blank the agent fills.
function cwAskCards(fam) {
  var facts = cwFacts(fam);
  var get = function (re) {
    for (var i = 0; i < facts.length; i++) {
      if (re.test(facts[i][0])) {
        return String(facts[i][1])
          .replace(/\s*\([^)]*\)/g, '')
          .replace(/\s+$/, '');
      }
    }
    return '';
  };
  var net = get(/^Network/) || '[network name]';
  var uwLabel = '';
  facts.forEach(function (f) {
    if (/Underwriter|Administrator|Sponsor/.test(f[0]) && !uwLabel) {
      uwLabel = f[0];
    }
  });
  var group = /Administrator|Sponsor/.test(uwLabel);
  var uw = get(/Underwriter|Administrator|Sponsor/) || '[insurer]';
  var assoc = get(/Association|Sponsor/) || '[association]';
  var bill = get(/^Billing/) || '[billing name]';
  var stm = fam.type === 'STM';
  var fixed = fam.type === 'Fixed indemnity';
  var c = [];
  c.push([
    'Is my doctor in network?',
    'The plan uses the ' +
      net +
      ' network. I can\u2019t confirm a provider for you, because networks change. Search them on [provider website] or call the office and ask if they take ' +
      net +
      ', before you go.'
  ]);
  c.push([
    'Am I fully covered?',
    'No plan like this covers everything. It pays the benefits listed in your schedule of benefits, up to the limits we went over. Anything not listed isn\u2019t covered, so keep your plan documents handy.'
  ]);
  c.push([
    'Is this ' + net + ' insurance?',
    group
      ? 'No. ' +
        net +
        ' is the doctor network you use. There\u2019s no insurance company on this plan; ' +
        uw +
        ' processes the claims. The membership with ' +
        assoc +
        ' is separate from the insurance.'
      : 'No. ' +
        net +
        ' is the doctor network you use. Your insurance is underwritten by ' +
        uw +
        '. The membership with ' +
        assoc +
        ' is separate from the insurance.'
  ]);
  c.push([
    'Is this real insurance?',
    group
      ? 'It\u2019s a group health plan sponsored by ' +
        assoc +
        ', not an insurance policy; ' +
        uw +
        ' handles claims.'
      : 'Yes, it\u2019s a ' +
        (stm ? 'short-term medical' : fixed ? 'fixed indemnity' : 'limited') +
        ' plan underwritten by ' +
        uw +
        ', a licensed insurance company. It\u2019s limited coverage, not major medical.'
  ]);
  c.push([
    'Is this Obamacare?',
    'No. It\u2019s a private plan, not an ACA or Marketplace plan, and it\u2019s not major medical. If you want ACA coverage, open enrollment or a qualifying life event is the way in.'
  ]);
  if (stm) {
    c.push([
      'Am I approved?',
      'Not yet. The plan is medically underwritten, so it\u2019s issued only if the carrier approves your application. Answer the health questions accurately; wrong answers can void the coverage.'
    ]);
  }
  c.push([
    'Why is it so much cheaper?',
    stm
      ? 'Because it covers less. It has limits, waiting periods and exclusions that ACA plans don\u2019t, and it can turn people down for health reasons. That\u2019s the trade-off for the lower price.'
      : 'Because it covers less. It has limits, waiting periods and exclusions that ACA plans don\u2019t. That\u2019s the trade-off for the lower price.'
  ]);
  if (stm) {
    c.push([
      'What if I go to the ER or need surgery?',
      'Emergency, hospital and surgery go to your deductible and coinsurance, up to the coverage period maximum.'
    ]);
    c.push([
      'So the most I\u2019ll ever pay is $[X]?',
      'Not quite. $[X] is your coinsurance limit after the deductible. Your deductible, copays, access fees, penalties for skipping pre-authorization, and anything above a benefit maximum don\u2019t count toward it.'
    ]);
    c.push([
      'What are the plan\u2019s limits?',
      'It means the plan has caps. There\u2019s a total maximum it will pay during your coverage period. Some services also have their own caps, like a set number of visits or a dollar limit. Once a cap is reached, the plan stops paying for that, and anything over it is yours. It also pays only its allowed amount, so a provider can bill you for the difference.'
    ]);
    c.push([
      'Can I keep this until Medicare?',
      'It\u2019s temporary coverage for a set coverage period. It\u2019s not renewable; extra terms, if available, are new coverage, limits reset and new conditions may not be covered.'
    ]);
  }
  if (fixed) {
    c.push([
      'What if I go to the ER or the hospital?',
      'The plan pays a set amount, $[X] per day up to $[Y], and you owe the rest of the bill.'
    ]);
  }
  c.push([
    'Who charges me and how do I cancel?',
    'You\u2019ll see ' +
      bill +
      ' on your statement. It\u2019s an automatic monthly draft. To cancel, call [number from the plan documents]; [notice period].'
  ]);
  c.push([
    'Is this better than my job\u2019s plan or the Marketplace?',
    'They\u2019re different. ACA and employer plans are major medical. This is limited coverage at a lower price. If you have access to major medical, compare both side by side before you decide.'
  ]);
  c.push([
    'How do I know you\u2019re legit?',
    'We\u2019re Central Health Advisors, a licensed private agency. I\u2019m licensed in your state. Your plan is through ' +
      (group ? assoc : uw) +
      ', and you\u2019ll get your documents by email to review before anything is final. Our confirmation number is CHA561337; anyone calling from us will have it.'
  ]);
  if (stm) {
    c.push([
      'What do deductible and coinsurance mean?',
      'Deductible: what you pay first each coverage period before the plan pays its share. Coinsurance: after the deductible you split the bill, like 80/20 (plan 80%, you 20%). Max out-of-pocket: the cap on your coinsurance share for the coverage period; after that the plan pays 100% of covered costs up to its limits.'
    ]);
  }
  var own = (CW_ASK_TERMS[fam.name] || []).concat(CW_ASK_PLAN[fam.name] || []);
  var ownQ = own.map(function (x) {
    return x[0].toLowerCase();
  });
  if (fam.name === 'Harbor STM') {
    ownQ.push('so the most i\u2019ll ever pay is $[x]?');
    ownQ.push('what do deductible and coinsurance mean?');
  }
  return own.concat(
    c.filter(function (x) {
      return ownQ.indexOf(x[0].toLowerCase()) < 0;
    })
  );
}

// Plan-specific client questions (SmartChoice: Mey's Oct 2026 list,
// the version that matches the app questions: 3 Preferred Units,
// assigned projects, a payment for each survey response).
// ERISA / Working Owner in plain words (Mey, Oct 26 2026). Shown
// only for plans whose disclosures name them.
var CW_ASK_TERMS = {
  SmartChoice: [
    [
      'What\u2019s a Working Owner?',
      'You own a small part of Population Science Management USA and do some work for it, like short surveys. That\u2019s how you qualify for its group health plan. Keep doing the tasks to stay eligible.'
    ],
    [
      'What\u2019s ERISA?',
      'A federal law for job-based health plans. It sets rules the plan has to follow, like giving you your plan info and a fair way to appeal a denied claim.'
    ]
  ],
  TDK: [
    [
      'What\u2019s a Working Owner?',
      'You own a small part of Healthcare Data Analytics (HCDA) and do some work for it, like short surveys. That\u2019s how you qualify for its group health plan. If you skip the tasks, coverage can end.'
    ],
    [
      'What\u2019s ERISA?',
      'A federal law for job-based health plans. It sets rules the plan has to follow, like giving you your plan info and a fair way to appeal a denied claim.'
    ]
  ],
  GoodHealth: [
    [
      'What\u2019s a Working Owner?',
      'You join Good Health Distribution Partners (GHDP) as a part-owner, called a Limited Partner. That\u2019s how you qualify for its group health plan.'
    ],
    [
      'What\u2019s ERISA?',
      'A federal law for job-based health plans. It sets rules the plan has to follow, like giving you your plan info and a fair way to appeal a denied claim.'
    ]
  ],
  AdvantCare: [
    [
      'What\u2019s ERISA?',
      'A federal law for job-based health plans. It sets rules the plan has to follow, like giving you your plan info and a fair way to appeal a denied claim.'
    ]
  ],
  'BWA Americare': [
    [
      'What\u2019s ERISA?',
      'A federal law for job-based health plans. It sets rules the plan has to follow, like giving you your plan info and a fair way to appeal a denied claim.'
    ]
  ]
};

// Harbor STM cost basics (Mey, Oct 26 2026): HarborSTM brochure 0827
// and the NEO HarborSTM training (Units 2-4); the $5,000 is a coinsurance-only max, so it is never
// called the most the client will pay.
var CW_ASK_PLAN = {
  'Harbor STM': [
    [
      'What\u2019s a deductible?',
      'What you pay first. Yours is $[deductible]. After that, the plan helps pay.'
    ],
    [
      'What\u2019s coinsurance?',
      'After your deductible, you split the bill. Yours is [30% / 20% / 0%]. At 20%, you pay 20% and the plan pays 80%.'
    ],
    [
      'What\u2019s a copay?',
      'A set price per visit, with no deductible first. Doctor and urgent care visits: $50 on Essential (3 visits), $40 on Access (3 visits), $40 on Secure (no limit). In-network only.'
    ],
    [
      'What\u2019s an access fee?',
      'Essential only. ER visits, outpatient surgery and advanced imaging cost a flat $500 first, before your deductible. Access and Secure don\u2019t have it.'
    ],
    [
      'What\u2019s the max out-of-pocket?',
      'Your plan has a $5,000 in-network coinsurance limit. Once your in-network coinsurance hits $5,000, the plan pays 100% of covered in-network costs, up to its limits. Your deductible, copays and fees don\u2019t count toward it.'
    ],
    [
      'So the most I\u2019ll pay is $5,000?',
      'No. That\u2019s only in-network coinsurance. Your deductible, copays, fees and anything over a plan limit are extra. Out-of-network care has no limit.'
    ],
    [
      'Can I go out of network?',
      'For some care, yes, but it costs more: a higher deductible, higher coinsurance and no $5,000 limit. You may also owe what\u2019s above the plan\u2019s allowed amount. Doctor and urgent care visits are in-network only. In an emergency, you pay in-network costs until you\u2019re stable.'
    ],
    [
      'Is my pre-existing condition covered?',
      'Not in your first term. An optional rider costs extra and helps only for back-to-back terms you buy together: a condition that starts in your first term won\u2019t count as pre-existing in the next. It isn\u2019t sold in Ohio.'
    ],
    [
      'Can you give me an example?',
      'In-network, $2,500 deductible, 20% coinsurance. A $10,000 bill: you pay $2,500 + $1,500 = $4,000. A $50,000 bill: you pay $2,500 + the $5,000 limit = $7,500. The plan pays the rest, up to its limits.'
    ]
  ],
  SmartChoice: [
    [
      'What does this have to do with health insurance?',
      'Great question. This is a group health plan, not individual insurance. To join the group, you become a Working Owner of Population Science Management. That membership is what makes you eligible for the plan. Sharing your health data is part of being a member. Does that make sense?'
    ],
    [
      'Share what info?',
      'It\u2019s short surveys about your health and the products and services you use. You do them in the Covered365 app, and you get a payment for each survey you respond to. You need to keep doing them to stay eligible for the plan.'
    ],
    [
      'Do I have to do the surveys?',
      'Yes. Doing them regularly is part of staying eligible for the plan.'
    ],
    [
      'Am I buying a company or stock?',
      'No, you\u2019re not buying anything. As a Working Owner, you\u2019re given 3 Preferred Units for your services. They aren\u2019t publicly traded and can\u2019t be sold on a market. The full terms are in the agreement you\u2019ll sign.'
    ],
    [
      'What are the assigned activities?',
      'Mainly the surveys, any projects the company assigns you, and staying in touch when they reach out to you.'
    ],
    [
      'Will this affect my taxes?',
      'Your survey payments may count as income. For tax questions, please check with your tax preparer.'
    ],
    [
      'Who sees my information?',
      'How your information is used is explained in the Working Owner agreement you\u2019ll sign in DocuSign.'
    ],
    [
      'Is this legit?',
      'Yes. The plan is administered by Detego Health and offered through Population Science Management. You\u2019ll get all your documents to review and sign before anything is final.'
    ]
  ]
};

function cwBlankHtml(t) {
  return cwEsc(t).replace(/\[[^\]]+\]/g, function (m) {
    return '<mark class="cwg-blank">' + m + '</mark>';
  });
}

function cwAskTab(fam) {
  var q = String(cwState.askQ || '').toLowerCase();
  var cards = cwAskCards(fam).filter(function (c) {
    return !q || (c[0] + ' ' + c[1]).toLowerCase().indexOf(q) !== -1;
  });
  return (
    '<label class="cwg-sr" for="cw-ask">Search client questions</label><div class="cwg-search cwg-search-sm"><svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="cw-ask" type="search" autocomplete="off" spellcheck="false" placeholder="Search: doctor, cancel, approved" value="' +
    cwEsc(cwState.askQ) +
    '"></div><div class="cwg-cards">' +
    (cards.length
      ? cards
          .map(function (c) {
            var on = !!cwState.askOpen[c[0]];
            return (
              '<button type="button" class="cwg-btn cwg-card' +
              (on ? ' is-open' : '') +
              '" data-cw-ask="' +
              cwEsc(c[0]) +
              '" aria-expanded="' +
              (on ? 'true' : 'false') +
              '"><span class="cwg-card-q">' +
              cwEsc(c[0]) +
              '<span aria-hidden="true">' +
              (on ? '\u2212' : '+') +
              '</span></span>' +
              (on
                ? '<span class="cwg-card-a">' + cwBlankHtml(c[1]) + '</span>'
                : '') +
              '</button>'
            );
          })
          .join('')
      : '<p class="cwg-empty">No question matches.</p>') +
    '</div>'
  );
}

function cwConfirmCounts(fam, tier) {
  var blk = cwDiscBlock(fam, tier);
  var conf = cwState.conf[fam.name + '|' + tier.tier] || {};
  var total = 0;
  var yes = 0;
  if (blk) {
    blk.paras.forEach(function (p, i) {
      if (!p.confirm) return;
      total++;
      if (conf[i] === 'Yes') yes++;
    });
  }
  return { total: total, yes: yes };
}

function cwBind(root) {
  if (root.getAttribute('data-cw-ready')) return;
  root.setAttribute('data-cw-ready', '1');
  root.addEventListener('click', cwOnClick);
  root.addEventListener('input', cwOnInput);
  root.addEventListener('change', cwOnInput);
  root.addEventListener('keydown', cwOnKey);
}

function cwFocus(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.focus();
  var v = el.value || '';
  if (el.setSelectionRange) el.setSelectionRange(v.length, v.length);
}

function renderCallWorkspace(keepFocus) {
  var root = document.getElementById('page-oncall');
  if (!root) return;
  cwEnsureMeds();
  if (!cwState.fam) {
    root.innerHTML = cwStartHtml();
    cwBind(root);
    cwFocus(keepFocus || 'cw-q');
    return;
  }
  var fam = cwFam(cwState.fam);
  var tier = cwTier(fam, cwState.tier);
  var aqPlan =
    fam.aq && typeof appqFind === 'function' ? appqFind(fam.aq) : null;
  var cc = cwConfirmCounts(fam, tier);
  var aqBadge = '';
  if (aqPlan) {
    var st = appqStatus(aqPlan);
    var ans = appqState.ans[aqPlan.id] || {};
    var n = 0;
    Object.keys(ans).forEach(function (k) {
      if (ans[k]) n++;
    });
    aqBadge = st.tone === 'stop' ? '!' : n + '/' + String(aqPlan.qs.length);
  } else if (fam.aqNone) {
    aqBadge = '0';
  }
  var name = fam.name + (fam.tiers.length > 1 ? ' ' + tier.tier : '');
  var tabs = [
    ['plan', 'Plan', ''],
    ['d', 'Disclosures', cc.total ? cc.yes + '/' + cc.total : ''],
    ['q', 'App questions', aqBadge],
    ['ask', 'Client asks', '']
  ];
  var body =
    cwState.tab === 'q'
      ? cwQuestionsTab(fam)
      : cwState.tab === 'd'
        ? cwDiscTab(fam, tier)
        : cwState.tab === 'ask'
          ? cwAskTab(fam)
          : cwPlanTab(tier, fam);
  var facts = cwFacts(fam).filter(function (f) {
    return !/^Association|^Sponsor$/.test(f[0]);
  });
  root.innerHTML =
    '<div class="cwg cwg-call"><div class="cwg-wrap cwg-wrap-wide">' +
    '<header class="cwg-panel cwg-head"><div class="cwg-head-top"><div class="cwg-logo cwg-logo-sm"><img src="logo.png" alt=""></div><div class="cwg-head-name"><span class="cwg-kicker">' +
    cwEsc(
      'ON CALL \u00b7 ' +
        fam.platform +
        ' \u00b7 ' +
        (CW_TYPE_LABEL[fam.type] || fam.type)
    ).toUpperCase() +
    '</span><h2>' +
    cwEsc(name) +
    '</h2></div><button type="button" class="cwg-btn cwg-change" data-cw-change="1">Change plan</button></div><div class="cwg-facts">' +
    facts
      .map(function (f) {
        return (
          '<div class="cwg-btn cwg-fact"><span>' +
          cwEsc(f[0]) +
          '</span><b>' +
          cwEsc(f[1]) +
          '</b></div>'
        );
      })
      .join('') +
    '</div></header><nav class="cwg-panel cwg-tabs" aria-label="Call steps">' +
    tabs
      .map(function (t) {
        return (
          '<button type="button" class="cwg-tab' +
          (cwState.tab === t[0] ? ' is-on' : '') +
          '" data-cw-tab="' +
          t[0] +
          '">' +
          t[1] +
          (t[2] ? '<span>' + t[2] + '</span>' : '') +
          '</button>'
        );
      })
      .join('') +
    '</nav><div class="cw-body cwg-body">' +
    body +
    '</div></div></div>';
  if (keepFocus) cwFocus(keepFocus);
  cwBind(root);
}

function cwOnClick(e) {
  var t = e.target.closest
    ? e.target.closest(
        '[data-cw-pick],[data-cw-browse],[data-cw-type],[data-cw-fam],[data-cw-tab],[data-cw-conf],[data-cw-start],[data-cw-change],[data-cw-vault],[data-cw-script],[data-cw-home-type],[data-cw-ask]'
      )
    : null;
  if (!t) return;
  if (t.hasAttribute('data-cw-home-type')) {
    cwState.homeType = t.getAttribute('data-cw-home-type');
    cwState.startFam = '';
    renderCallWorkspace();
    return;
  }
  var v = t.getAttribute('data-cw-ask');
  if (v) {
    cwState.askOpen[v] = !cwState.askOpen[v];
    renderCallWorkspace();
    return;
  }
  v = t.getAttribute('data-cw-vault');
  if (v) {
    if (typeof qrOpenInVault === 'function') qrOpenInVault(v);
    return;
  }
  v = t.getAttribute('data-cw-script');
  if (v) {
    if (typeof qrOpenScript === 'function') qrOpenScript(v);
    return;
  }
  v = t.getAttribute('data-cw-pick');
  if (v) {
    var p = v.split('|');
    cwPick(p[0], p[1]);
    return;
  }
  v = t.getAttribute('data-cw-start');
  if (v) {
    var sf = cwFam(v);
    if (sf.tiers.length === 1) {
      cwPick(sf.name, sf.tiers[0].tier);
      return;
    }
    cwState.startFam = cwState.startFam === v ? '' : v;
    renderCallWorkspace();
    return;
  }
  if (t.getAttribute('data-cw-change')) {
    cwState.fam = '';
    cwState.q = '';
    cwState.startFam = '';
    cwState.homeType = '';
    cwState.browse = false;
    cwState.tab = 'plan';
    renderCallWorkspace();
    return;
  }
  if (t.getAttribute('data-cw-browse')) {
    cwState.browse = !cwState.browse;
    cwState.q = '';
    cwState.type = cwFam(cwState.fam).type;
    renderCallWorkspace();
    return;
  }
  v = t.getAttribute('data-cw-type');
  if (v) {
    cwState.type = v;
    renderCallWorkspace();
    return;
  }
  v = t.getAttribute('data-cw-fam');
  if (v) {
    cwState.fam = v;
    cwState.tier = cwFam(v).tiers[0].tier;
    renderCallWorkspace();
    return;
  }
  v = t.getAttribute('data-cw-tab');
  if (v) {
    cwState.tab = v;
    renderCallWorkspace();
    return;
  }
  v = t.getAttribute('data-cw-conf');
  if (v) {
    var c = v.split(':');
    var key = cwState.fam + '|' + cwState.tier;
    var cur = cwState.conf[key] || (cwState.conf[key] = {});
    cur[c[0]] = cur[c[0]] === c[1] ? '' : c[1];
    renderCallWorkspace();
  }
}

function cwOnInput(e) {
  var t = e.target;
  if (t.id === 'cw-q') {
    if (e.type !== 'input') return;
    cwState.q = t.value;
    renderCallWorkspace('cw-q');
  } else if (t.id === 'cw-ask') {
    if (e.type !== 'input') return;
    cwState.askQ = t.value;
    renderCallWorkspace('cw-ask');
  } else if (t.id === 'cw-meds') {
    if (e.type !== 'input') return;
    cwState.meds = t.value;
    if (cwMedsTimer) clearTimeout(cwMedsTimer);
    cwMedsTimer = setTimeout(function () {
      var box = document.getElementById('cw-meds-out');
      if (box) box.innerHTML = cwMedsHtml();
    }, 150);
  } else if (t.id === 'cw-hh') {
    cwState.hh = t.value;
    var box = document.getElementById('cw-meds-out');
    if (box) box.innerHTML = cwMedsHtml();
  }
}

function cwOnKey(e) {
  if (!e.target || e.target.id !== 'cw-q') return;
  if (e.key === 'Escape') {
    cwState.q = '';
    renderCallWorkspace('cw-q');
    return;
  }
  if (e.key !== 'Enter') return;
  var groups = cwSearch(cwState.q);
  if (groups.length && groups[0].hit) {
    e.preventDefault();
    cwPick(groups[0].fam.name, groups[0].hit);
  }
}
