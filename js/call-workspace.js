// js/call-workspace.js - On Call workspace (Oct 2026).
// One screen for a live call on MEC and STM plans:
//   find the plan (search or Browse), see network / administrator /
//   association / billing, then three tabs in call order:
//   1. Plan & meds   - tier benefits + PAP check (pap-lookup data, meds.js)
//   2. App questions - from js/app-questions.js
//   3. Before enrollment - the plan script's word-for-word recap with the
//      confirm questions, read live from PLAN_SCRIPTS (call-playbook.js).
// Benefit values come from the plan documents (tier table, Oct 16 2026).
// Limited plans are not listed here.

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
    type: 'MEC',
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
  all: 'allstate'
};

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
  step: 0,
  done: {},
  note: false
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
  cwState.tab = 'call';
  cwState.step = 0;
  cwState.done = {};
  cwState.note = false;
  renderCallWorkspace();
}

// Before-enrollment block from the live plan script.
function cwScriptBlock(scriptName) {
  var s = scriptName ? CW_SCRIPTS[scriptName] : null;
  if (!s || !s.text) return null;
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

function cwPlanTab(tier) {
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
    '<div class="cw-two"><section class="cw-card"><h3>Benefits</h3>' +
    ben +
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
  if (!plan) {
    return (
      '<div class="cw-status"><b>No application questions on file</b><span>None sent for ' +
      cwEsc(fam.name) +
      ' yet.</span></div>'
    );
  }
  return appqListHtml(plan, 'cw');
}

function cwDiscTab(fam, tier) {
  var blk = cwScriptBlock(tier.script);
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
        return '<p class="cw-say">' + cwEsc(p.t) + '</p>';
      }
      total++;
      var a = conf[i];
      if (a === 'Yes') yes++;
      if (a === 'No') anyNo = true;
      return (
        '<div class="cw-confirm' +
        (a === 'No' ? ' is-no' : '') +
        '"><p>' +
        cwEsc(p.t) +
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
  var st = anyNo
    ? [
        'stop',
        'Hold',
        'The client said No. Explain that point again before payment.'
      ]
    : ready
      ? ['ok', 'Ready for payment', 'The client confirmed every point.']
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
    '</span></div><section class="cw-card cw-script"><span class="cw-label">Say word for word - before enrollment</span>' +
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

// PROTOTYPE (preview only): step-by-step call with a compliance rail.
var CW_STEPS = [
  'Open',
  'Discover',
  'Present',
  'Disclose',
  'Enroll',
  'Post-close'
];

var CW_NEVER_SAY = [
  'It is major medical, or an ACA plan',
  'Covers everything / full coverage / acts like regular insurance',
  'Your doctor is covered (never guarantee a provider)',
  'Price is only good today / you must enroll now',
  'Locks in your rate / never goes up',
  'You can write it off on your taxes'
];

function cwPlanScript(scriptName) {
  if (typeof PLAN_SCRIPTS === 'undefined' || !scriptName) return null;
  var i;
  for (i = 0; i < PLAN_SCRIPTS.length; i++) {
    if (PLAN_SCRIPTS[i].name === scriptName) return PLAN_SCRIPTS[i];
  }
  for (i = 0; i < PLAN_SCRIPTS.length; i++) {
    if (String(PLAN_SCRIPTS[i].name).indexOf(scriptName) !== -1) {
      return PLAN_SCRIPTS[i];
    }
  }
  return null;
}

function cwDiscCounts() {
  var fam = cwFam(cwState.fam);
  var tier = cwTier(fam, cwState.tier);
  var blk = cwScriptBlock(tier.script);
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

function cwDiscReady() {
  var c = cwDiscCounts();
  return c.total > 0 && c.yes === c.total;
}

function cwSayHtml(text) {
  return String(text || '')
    .split(/\n\n+/)
    .map(function (p) {
      var cue = /^[▶✖✔]/.test(p.replace(/^\s+/, ''));
      return (
        '<p class="' +
        (cue ? 'cw-cue' : 'cw-say') +
        '">' +
        cwEsc(p).replace(/\n/g, '<br>') +
        '</p>'
      );
    })
    .join('');
}

function cwStepBody(fam, tier) {
  var ps = cwPlanScript(tier.script);
  var pre =
    typeof PLAN_SCRIPTS !== 'undefined' && PLAN_SCRIPTS[0]
      ? PLAN_SCRIPTS[0].sections[0].content
      : '';
  var cut = pre.indexOf('OK! GREAT!');
  var secs = ps ? ps.sections : [];
  var pick = function (names) {
    return secs
      .filter(function (x) {
        return names(x.title);
      })
      .map(function (x) {
        return (
          '<span class="cw-label">' +
          cwEsc(x.title) +
          '</span>' +
          cwSayHtml(x.content)
        );
      })
      .join('');
  };
  var s = cwState.step;
  if (s === 0) return cwSayHtml(cut > 0 ? pre.slice(0, cut) : pre);
  if (s === 1) return cwSayHtml(cut > 0 ? pre.slice(cut) : '');
  if (s === 2) {
    return (
      pick(function (t) {
        return !/Closing|Verification|Post Close/.test(t);
      }) || '<p class="cw-muted">No script on file for this plan.</p>'
    );
  }
  if (s === 3) return cwDiscTab(fam, tier);
  if (s === 4) {
    return pick(function (t) {
      return /Closing|Verification/.test(t);
    });
  }
  return pick(function (t) {
    return /Post Close/.test(t);
  });
}

function cwCallTab(fam, tier) {
  var c = cwDiscCounts();
  var ready = c.total > 0 && c.yes === c.total;
  var steps = CW_STEPS.map(function (label, i) {
    var cls = 'cw-step';
    if (i === cwState.step) cls += ' is-on';
    else if (cwState.done[i]) cls += ' is-done';
    if (i >= 4 && !ready) cls += ' is-lock';
    return (
      '<button type="button" class="' +
      cls +
      '" data-cw-step="' +
      i +
      '"><i>' +
      (cwState.done[i] && i !== cwState.step ? '✓' : String(i + 1)) +
      '</i>' +
      label +
      '</button>'
    );
  }).join('');
  var lock =
    cwState.step === 3 && !ready
      ? '<div class="cw-lock">Enroll and payment unlock when every disclosure has a Yes.</div>'
      : '';
  var doneSteps = CW_STEPS.filter(function (x, i) {
    return cwState.done[i];
  });
  var note =
    'Plan quoted: ' +
    fam.name +
    (fam.tiers.length > 1 ? ' ' + tier.tier : '') +
    ' (' +
    fam.platform +
    '). Steps done: ' +
    (doneSteps.length ? doneSteps.join(', ') : 'none') +
    '. Disclosures confirmed: ' +
    c.yes +
    ' of ' +
    c.total +
    '.';
  var pct = c.total ? Math.round((c.yes / c.total) * 100) : 0;
  var rail =
    '<aside class="cw-rail">' +
    '<section class="cw-card"><span class="cw-label">Disclosures before payment</span>' +
    '<div class="cw-count"><b>' +
    c.yes +
    '</b><span>of ' +
    c.total +
    ' confirmed</span><em class="' +
    (ready ? 'is-ok' : 'is-wait') +
    '">' +
    (ready ? 'Ready for payment' : 'Payment locked') +
    '</em></div><div class="cw-meter"><i style="width:' +
    pct +
    '%" class="' +
    (ready ? 'is-ok' : '') +
    '"></i></div></section>' +
    '<section class="cw-card"><span class="cw-label">Plan facts</span>' +
    fam.facts
      .map(function (f) {
        return (
          '<div class="cw-rfact"><span>' +
          cwEsc(f[0]) +
          '</span><b>' +
          cwEsc(f[1]) +
          '</b></div>'
        );
      })
      .join('') +
    '</section>' +
    '<section class="cw-card"><span class="cw-label">Rx check</span><input id="cw-meds" class="cw-rmeds" placeholder="Type meds, separated by commas" value="' +
    cwEsc(cwState.meds) +
    '"><div id="cw-meds-out">' +
    (cwState.meds ? cwMedsHtml() : '') +
    '</div></section>' +
    '<section class="cw-card cw-never"><span class="cw-label">Never say</span><ul>' +
    CW_NEVER_SAY.map(function (x) {
      return '<li>' + cwEsc(x) + '</li>';
    }).join('') +
    '</ul></section></aside>';
  return (
    '<div class="cw-call"><div class="cw-callmain"><div class="cw-steps">' +
    steps +
    '</div><section class="cw-card cw-script"><span class="cw-label">Step ' +
    (cwState.step + 1) +
    ' - ' +
    CW_STEPS[cwState.step] +
    ' - read word for word</span>' +
    cwStepBody(fam, tier) +
    '</section>' +
    lock +
    '<div class="cw-actions"><button type="button" class="cw-done" data-cw-done="1">' +
    (cwState.done[cwState.step] ? 'Done ✓ Next step' : 'Mark done') +
    '</button><button type="button" class="cw-notebtn" data-cw-note="1">Call note</button></div>' +
    (cwState.note ? '<div class="cw-note">' + cwEsc(note) + '</div>' : '') +
    '</div>' +
    rail +
    '</div>'
  );
}

function cwSugHtml() {
  var h = '';
  var groups = cwSearch(cwState.q);
  if (!groups.length) {
    h +=
      '<p class="cw-muted">No plan matches. Try the plan name or tier number.</p>';
  }
  groups.forEach(function (g, gi) {
    h +=
      '<div class="cw-sug"><b>' +
      cwEsc(g.fam.name) +
      '</b><span class="cw-type">' +
      cwEsc(g.fam.type) +
      '</span>' +
      g.tiers
        .map(function (t) {
          return (
            '<button type="button" class="cw-chip' +
            (gi === 0 && t === g.hit ? ' is-on' : '') +
            '" data-cw-pick="' +
            cwEsc(g.fam.name) +
            '|' +
            cwEsc(t) +
            '">' +
            cwEsc(t) +
            '</button>'
          );
        })
        .join('') +
      '</div>';
  });
  return h;
}

function cwPickerHtml() {
  var h =
    '<div class="cw-card cw-picker"><div class="cw-row"><input id="cw-q" class="cw-search" type="text" autocomplete="off" spellcheck="false" placeholder="Find a plan: sc 1500, harbor access, tdk 3" value="' +
    cwEsc(cwState.q) +
    '"><button type="button" class="cw-link" data-cw-browse="1">' +
    (cwState.browse ? 'Close' : 'Browse') +
    '</button></div>';
  if (cwState.q) {
    h += cwSugHtml();
  } else if (cwState.browse) {
    h +=
      '<div class="cw-browse"><div>' +
      ['MEC', 'STM']
        .map(function (ty) {
          return (
            '<button type="button" class="cw-chip' +
            (cwState.type === ty ? ' is-on' : '') +
            '" data-cw-type="' +
            ty +
            '">' +
            ty +
            '</button>'
          );
        })
        .join('') +
      '</div><div>' +
      CW_FAMS.filter(function (f) {
        return f.type === cwState.type;
      })
        .map(function (f) {
          return (
            '<button type="button" class="cw-chip' +
            (f.name === cwState.fam ? ' is-on' : '') +
            '" data-cw-fam="' +
            cwEsc(f.name) +
            '">' +
            cwEsc(f.name) +
            '</button>'
          );
        })
        .join('') +
      '</div>';
    var cf = cwFam(cwState.fam);
    if (cf.type === cwState.type) {
      h +=
        '<div>' +
        cf.tiers
          .map(function (t) {
            return (
              '<button type="button" class="cw-chip' +
              (t.tier === cwState.tier ? ' is-on' : '') +
              '" data-cw-pick="' +
              cwEsc(cf.name) +
              '|' +
              cwEsc(t.tier) +
              '">' +
              cwEsc(t.tier) +
              '</button>'
            );
          })
          .join('') +
        '</div>';
    }
    h += '</div>';
  }
  return h + '</div>';
}

var CW_ICON_MEC =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z"/></svg>';
var CW_ICON_STM =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/></svg>';

function cwGreeting() {
  var g = '';
  try {
    if (typeof _buildGreetingText === 'function') g = _buildGreetingText();
  } catch (_e) {
    g = '';
  }
  return g ? g.replace(' ! ', ', ') : 'Welcome';
}

function cwStartHtml() {
  var tiles = function (type) {
    return CW_FAMS.filter(function (f) {
      return f.type === type;
    })
      .map(function (f) {
        return (
          '<button type="button" class="cw-tile' +
          (cwState.startFam === f.name ? ' is-on' : '') +
          '" data-cw-start="' +
          cwEsc(f.name) +
          '"><span class="cw-ico cw-ico-' +
          (f.platform === 'FirstEnroll' ? 'fe' : 'neo') +
          '">' +
          (type === 'MEC' ? CW_ICON_MEC : CW_ICON_STM) +
          '</span>' +
          cwEsc(f.name.replace(/ (STM|STM PPO)$/, '')) +
          '</button>'
        );
      })
      .join('');
  };
  var tierRow = '';
  if (cwState.startFam) {
    var sf = cwFam(cwState.startFam);
    tierRow =
      '<div class="cw-start-tiers"><b>' +
      cwEsc(sf.name) +
      '</b>' +
      sf.tiers
        .map(function (x) {
          return (
            '<button type="button" class="cw-chip" data-cw-pick="' +
            cwEsc(sf.name) +
            '|' +
            cwEsc(x.tier) +
            '">' +
            cwEsc(x.tier) +
            '</button>'
          );
        })
        .join('') +
      '</div>';
  }
  return (
    '<div class="cw-start"><img class="cw-start-logo" src="logo.png" alt="Central Health Advisors"><h2>' +
    cwEsc(cwGreeting()) +
    '</h2><p>Which plan are you selling?</p><div class="cw-start-search"><input id="cw-q" type="text" autocomplete="off" spellcheck="false" placeholder="sc 1500, harbor access, tdk 3" value="' +
    cwEsc(cwState.q) +
    '"></div>' +
    (cwState.q
      ? '<div class="cw-card cw-start-sug">' + cwSugHtml() + '</div>'
      : '<div class="cw-start-groups"><span class="cw-label">MEC</span><div class="cw-tiles">' +
        tiles('MEC') +
        '</div><span class="cw-label">STM</span><div class="cw-tiles">' +
        tiles('STM') +
        '</div>' +
        tierRow +
        '</div>') +
    '</div>'
  );
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
    cwFocus('cw-q');
    return;
  }
  var fam = cwFam(cwState.fam);
  var tier = cwTier(fam, cwState.tier);
  var aqPlan =
    fam.aq && typeof appqFind === 'function' ? appqFind(fam.aq) : null;
  var block = cwScriptBlock(tier.script);
  var confirmCount = block
    ? block.paras.filter(function (p) {
        return p.confirm;
      }).length
    : 0;
  var name = fam.name + (fam.tiers.length > 1 ? ' ' + tier.tier : '');
  var tabs = [
    ['call', 'Call steps', ''],
    ['plan', 'Plan & meds', ''],
    ['q', 'App questions', aqPlan ? String(aqPlan.qs.length) : 'none'],
    ['d', 'Before enrollment', confirmCount ? String(confirmCount) : 'none']
  ];
  var body =
    cwState.tab === 'call'
      ? cwCallTab(fam, tier)
      : cwState.tab === 'q'
        ? cwQuestionsTab(fam)
        : cwState.tab === 'd'
          ? cwDiscTab(fam, tier)
          : cwPlanTab(tier);
  root.innerHTML =
    '<div class="cw-page"><header class="cw-hero cw-hero-' +
    (fam.platform === 'FirstEnroll' ? 'fe' : 'neo') +
    '"><span class="cw-kicker">ON CALL</span><h2>' +
    cwEsc(name) +
    '</h2><p>' +
    cwEsc(fam.platform + ' - ' + fam.type) +
    '</p><button type="button" class="cw-change" data-cw-change="1">Change plan</button></header>' +
    cwPickerHtml() +
    '<div class="cw-facts">' +
    fam.facts
      .map(function (f) {
        return (
          '<div class="cw-fact"><span>' +
          cwEsc(f[0]) +
          '</span><b>' +
          cwEsc(f[1]) +
          '</b></div>'
        );
      })
      .join('') +
    '</div><div class="cw-tabs">' +
    tabs
      .map(function (t) {
        return (
          '<button type="button" class="cw-tab' +
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
    '</div><div class="cw-body">' +
    body +
    '</div></div>';
  if (keepFocus) cwFocus(keepFocus);
  cwBind(root);
}

function cwOnClick(e) {
  var t = e.target.closest
    ? e.target.closest(
        '[data-cw-pick],[data-cw-browse],[data-cw-type],[data-cw-fam],[data-cw-tab],[data-cw-conf],[data-cw-start],[data-cw-change],[data-cw-step],[data-cw-done],[data-cw-note]'
      )
    : null;
  if (!t) return;
  var v = t.getAttribute('data-cw-pick');
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
  v = t.getAttribute('data-cw-step');
  if (v) {
    var sn = parseInt(v, 10);
    if (sn >= 4 && !cwDiscReady()) return;
    cwState.step = sn;
    renderCallWorkspace();
    return;
  }
  if (t.getAttribute('data-cw-done')) {
    if (cwState.step === 3 && !cwDiscReady()) return;
    cwState.done[cwState.step] = true;
    if (cwState.step < 5) cwState.step++;
    renderCallWorkspace();
    return;
  }
  if (t.getAttribute('data-cw-note')) {
    cwState.note = !cwState.note;
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
