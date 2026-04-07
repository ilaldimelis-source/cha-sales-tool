// plans-benefits.js — Plans & Benefits tab + Network Guide

const BENEFITS = [
  {
    icon: 'hospital',
    name: 'Hospitalization (Indemnity Benefit)',
    official:
      'A fixed daily hospital benefit paid directly to the insured when admitted to the hospital. Example: $1,000/day up to $10,000 annual max depending on tier.',
    simple:
      "If you're admitted to the hospital, the plan pays a set amount per day directly to YOU — not to the hospital. You control how it's used.",
    frame:
      "Hospital stays average $20,000–$40,000+ in the U.S. This benefit is designed to offset that financial hit directly in your pocket. It's not full coverage — it's a cash buffer that gives you control.",
    misunderstand:
      'Prospects assume this means the plan pays the full hospital bill. It does not. It pays a fixed daily benefit toward the bill. The difference matters — always clarify.',
    notsay:
      " Never say: 'This covers the hospital bill.' ✔ Say: 'This pays a fixed daily benefit toward the bill.'",
    followup:
      "Client asks: 'Who gets the money?' → 'It pays directly to you, so you control how it's used — not the hospital.'",
    bridge:
      '"So the big hospital protection is in place. Let\'s make sure your everyday doctor visits are covered too."'
  },
  {
    icon: 'users',
    name: 'Doctor Visits (PCP)',
    official:
      'Covered primary care physician visits with a flat copay and annual visit limit. Example (TrueHealth 2): PCP $25 copay, Specialist $50 copay, limited visits per year.',
    simple:
      'You see a doctor for a small flat copay instead of paying full price. Simple.',
    frame:
      'Without coverage: doctor visit = $150–$250. With this plan: $25–$50. Every visit saves you $100–$200. For someone who goes even twice a year, the plan pays for itself.',
    misunderstand:
      'People assume visits are unlimited. Most MEC plans have annual visit limits. Always know the limit for the specific plan before the call.',
    notsay:
      " Never say 'unlimited doctor visits' unless the plan explicitly allows it. Know the visit cap.",
    followup:
      "Client asks: 'Can I see my doctor?' → 'Just make sure they're in the First Health network before your first visit — I'll walk you through how to check.'",
    bridge:
      '"So everyday doctor visits are handled. Let\'s talk about urgent care and telemedicine, which most people use even more often."'
  },
  {
    icon: 'warning',
    name: 'Urgent Care',
    official:
      'Covered urgent care visits with a flat copay and visit limit. Example structure: $40–$75 copay, visit limit depending on plan tier.',
    simple:
      'Same-day care for non-emergency situations — without the ER price tag.',
    frame:
      'Urgent care without coverage: $150–$350 out of pocket. With this plan: $40–$75 copay. You save $100–$275 every single visit. For most people this is the most used benefit after telemedicine.',
    misunderstand:
      'Prospects confuse urgent care with the ER. They are very different — urgent care is for non-emergencies, costs far less, and is faster. ER is for life-threatening situations.',
    notsay:
      " Don't say urgent care and the ER are the same benefit or have the same cost.",
    followup:
      "Client asks: 'What's the difference between urgent care and the ER?' → 'Urgent care is for same-day non-emergencies. ER is for life-threatening situations. Using urgent care when appropriate saves you hundreds.'",
    bridge:
      '"Urgent care handles most everyday emergencies. But if something bigger happens, let me explain how hospital coverage works."'
  },
  {
    icon: 'mobile',
    name: 'Telemedicine',
    official:
      '24/7 virtual doctor access with $0 consultation fee. Many plans use services like MyLiveDoc or similar telehealth providers.',
    simple:
      'Talk to a real doctor anytime from your phone. $0 copay. No waiting room. They can prescribe most common medications.',
    frame:
      "Telemedicine resolves 60–70% of common medical needs: cold, flu, rash, allergies, UTIs, prescription refills. It's the most-used benefit on most plans and the one members thank you for first.",
    misunderstand:
      'People think telemedicine cannot prescribe medication. It can for most common conditions. This is a major selling point — always mention it.',
    notsay:
      " Don't say telemedicine replaces in-person care for serious conditions or injuries.",
    followup:
      "Client asks: 'Can they actually give me a prescription?' → 'Yes — for most common conditions like infections, cold, flu, allergies, they can call it in to your pharmacy directly.'",
    bridge:
      '"So you\'ve got a doctor available anytime from your phone. Now let me walk you through how prescriptions work."'
  },
  {
    icon: 'pill',
    name: 'Prescriptions (Rx)',
    official:
      'Coverage for generic medications through formulary pricing or discount programs. Example: Generic $0–$5 copay. Specialty drugs typically not covered, but assistance programs may exist.',
    simple:
      "Your everyday medications — generics for common conditions — are low copay or discounted through the plan's pharmacy network.",
    frame:
      'Many clients take 1–3 maintenance medications. Even saving $20–$50 per month on Rx helps offset the premium. Frame it as built-in savings, not just a feature.',
    misunderstand:
      'Prospects assume all drugs are covered at low cost. Specialty medications are typically NOT covered. Know the formulary and any monthly cap (e.g., $150/month) before the call.',
    notsay:
      " Never say 'all prescriptions are covered.' Know whether the plan covers specialty drugs before making any Rx claims.",
    followup:
      "Client asks: 'What about my [specialty medication]?' → 'Specialty drugs may not be on the formulary — let me check what's covered for your specific medication so there are no surprises.'",
    bridge:
      '"So everyday Rx is handled. Now let me explain something important about pre-existing conditions — I always cover this upfront so everything is clear."'
  },
  {
    icon: 'clock',
    name: 'Pre-Existing Conditions',
    official:
      'Conditions diagnosed or treated in the 12 months before the policy effective date are excluded for the first 12 months of the plan.',
    simple:
      "If you've been treated for something in the last 12 months before your plan starts, that condition isn't covered for the first 12 months. Anything new after your plan starts is covered.",
    frame:
      "Being transparent here builds trust and prevents chargebacks. A client who clearly understands pre-ex and still enrolls is a qualified, informed buyer. One who didn't understand it becomes a cancellation.",
    misunderstand:
      'Prospects compare this to ACA plans where pre-existing conditions are covered immediately. These are different plan types with different structures — and different price points. That trade-off is why the premium is affordable.',
    notsay:
      ' NEVER imply or suggest pre-existing conditions are covered from day one on a MEC, STM, or limited benefit plan. This is your most important compliance disclosure.',
    followup:
      "Client asks: 'What counts as pre-existing?' → 'Any condition you've been diagnosed with, treated for, or had symptoms of in the 12 months before your coverage starts.'",
    bridge:
      '"So new conditions are covered from day one. Pre-existing conditions have a 12-month window. Does that make sense before we move forward?"'
  },
  {
    icon: 'hourglass',
    name: 'Waiting Periods',
    official:
      'A defined period before certain benefits activate. STM example: Accidents → day one. Sickness → 5-day wait. Cancer → 30-day wait. MEC example: Sickness → 30-day wait.',
    simple:
      'Accidents are covered immediately — day one. Illness benefits start after a short waiting period. The specific length depends on the plan.',
    frame:
      "Waiting periods exist so people can't enroll while already sick and immediately claim benefits. It's the mechanism that keeps premiums affordable. Frame it as a feature of affordability, not a flaw.",
    misunderstand:
      'Prospects assume all benefits start day one. The accident vs. sickness distinction is important. Always clarify which benefits are immediate vs. which have a waiting period.',
    notsay:
      " Don't gloss over the waiting period or bury it. Disclose it clearly and matter-of-factly — it's required and it's honest.",
    followup:
      "Client asks: 'What if I get sick during the waiting period?' → 'During the waiting period that specific sickness wouldn't be covered under the plan. After the waiting period passes, sickness benefits are fully active.'",
    bridge:
      '"So from day one you\'re protected from accidents. Sickness coverage kicks in shortly after. You\'re covered either way — just on a short timeline."'
  },
  {
    icon: 'globe',
    name: 'Networks',
    official:
      'Healthcare providers contracted at pre-negotiated rates. Networks used in this portfolio: First Health, PHCS (MultiPlan), MultiPlan, and Managed Care.',
    simple:
      "Using doctors in the plan's network keeps your costs lower and prevents surprise balance bills. Always verify your doctor is in-network before your first visit.",
    frame:
      'Network access is what separates a plan that works from one that creates billing surprises. In-network = negotiated rates. Out-of-network = balance billing risk. Always encourage them to verify before using.',
    misunderstand:
      'Prospects assume their current doctor is automatically in-network. They need to verify. Always tell them how to check before their first appointment.',
    notsay:
      " Don't say 'you can see any doctor' if the plan has network restrictions. SmartChoice is an EPO — no out-of-network coverage at all.",
    followup:
      "Client asks: 'How do I find in-network doctors?' → 'Go to the network site on your member card — First Health, PHCS, or Multiplan depending on your plan. Search by zip code and specialty.'",
    bridge:
      '"So your network access is confirmed. Let\'s make sure the rest of your benefits are clear before we finalize."'
  },
  {
    icon: 'plus',
    name: 'Add-Ons & Supplements',
    official:
      'Optional supplemental benefits added to the base plan for additional premium. Options: Critical illness, Accident coverage, Dental, Vision, Hospital gap.',
    simple:
      'Add-ons let you build on top of the base plan. Think of them as layers — the base covers everyday medical, add-ons add financial protection for bigger events.',
    frame:
      'Add-ons are where plans become personal. The right add-on for the right prospect turns a good plan into complete protection. Always present after the base plan is confirmed.',
    misunderstand:
      'Prospects think add-ons are part of the base coverage. Each one is a separate benefit with its own terms, its own claims process, and its own premium.',
    notsay:
      " Don't present add-ons as required or bundled with the base plan. Don't push them before the base plan is confirmed.",
    followup:
      "Client asks: 'Can I add these later?' → 'Typically yes, but adding later may require going through underwriting again. It's usually easier and cleaner to add them now.'",
    bridge:
      '"The base plan is solid on its own. Want to see what we can add on to give you even more complete protection?"'
  }
];

const PLANS = [
  // ══════════════════════════════
  // GROUP 1: MEC PLANS
  // ══════════════════════════════
  {
    group: 'MEC',
    name: 'MedFirst 1–5',
    type: 'MEC — Minimum Essential Coverage',
    tagline: 'Preventive-first base plan with First Health network',
    network: 'First Health',
    admin: 'Merchants Benefit Administrators (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    bestFor:
      'Self-employed, gig workers, 1099 contractors, part-time employees who need affordable preventive coverage',
    notGood:
      'Anyone with active chronic conditions, ongoing specialist care, or specialty Rx needs above $150/month',
    idealClient:
      'Healthy 25–50, rarely sees doctors, wants preventive care + safety net, budget-conscious',
    topPoints: [
      'Preventive health services covered',
      'Annual physical exam covered',
      'Unlimited telemedicine from day one',
      'MedFirst 1-3: $25 PCP copay / $50 specialist & urgent care',
      'MedFirst 4-5: $50 PCP copay / $75 specialist & urgent care',
      'Rx discount tiers',
      'Hospital indemnity $1,000–$1,500/day (Tiers 3–5)'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      '12-month pre-existing condition exclusion',
      '30-day sickness waiting period',
      'NOT major medical insurance'
    ],
    framing:
      '"This plan keeps your everyday healthcare covered — doctor visits, preventive care, prescriptions, telemedicine — at a price that makes sense. It\'s designed for people who are generally healthy and want real coverage without paying major medical prices."',
    objections: [
      "Is this real insurance? → It's a federally compliant health benefit plan, not ACA major medical",
      'Pre-ex? → Excluded 12 months, then covered',
      'ER? → Covered if admitted on Tier 4+'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant major medical insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded for 12 months. (6) There is a 30-day sickness waiting period. (7) Benefits are fixed amounts toward services, not full bill coverage.',
    fitYes: [
      'Generally healthy, rarely sees doctors',
      'Budget is primary concern',
      'Self-employed / no employer benefits',
      'Needs preventive care covered',
      'Telemedicine user'
    ],
    fitNo: [
      'Active specialist needs',
      'Takes specialty medications',
      'Recent serious health history',
      'Expecting surgery or hospitalization soon',
      'Wants ACA-equivalent coverage'
    ]
  },

  {
    group: 'MEC',
    name: 'TrueHealth 1–3',
    type: 'MEC — Minimum Essential Coverage',
    tagline: 'Simplified MEC tiers with First Health network',
    network: 'First Health',
    admin: 'Merchants Benefit Administrators (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    bestFor:
      'Same profile as MedFirst — healthy, budget-conscious, needs preventive base coverage',
    notGood:
      'Same exclusions as MedFirst — not for chronic conditions, specialty Rx, or active health needs',
    idealClient:
      'Similar to MedFirst buyer; simpler tier structure may appeal to prospects who want fewer choices',
    topPoints: [
      'Preventive health services covered',
      'Annual physical exam covered',
      'TrueHealth 1: $25 PCP copay / $50 specialist & urgent care',
      'Unlimited telemedicine from day one',
      'Hospital indemnity on higher tiers',
      'Rx discount tiers'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      '12-month pre-existing condition exclusion',
      '30-day sickness waiting period',
      'NOT major medical insurance'
    ],
    framing:
      '"TrueHealth is a clean, simple version of our MEC coverage. Same core benefits — preventive care, doctor visits, telemedicine — with fewer tier options so it\'s easier to pick what fits."',
    objections: [
      'Same as MedFirst — pre-ex, waiting period, not major medical'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant major medical insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded for 12 months. (6) There is a 30-day sickness waiting period. (7) Benefits are fixed amounts toward services, not full bill coverage.',
    fitYes: [
      'Healthy, rarely uses healthcare',
      'Wants simple straightforward coverage',
      'Budget-conscious',
      'No employer benefits'
    ],
    fitNo: [
      'Has ongoing health conditions',
      'Wants comprehensive major medical',
      'Needs specialist access regularly'
    ]
  },

  {
    group: 'MEC',
    name: 'GoodHealth 1–5',
    type: 'MEC — Minimum Essential Coverage',
    tagline: 'MEC base plan via Good Health Distribution Partners',
    network: 'First Health',
    admin: 'Merchants Benefit Administrators (MBA)',
    assoc: 'Good Health Distribution Partners',
    bestFor:
      'Self-employed, gig workers, individuals needing affordable preventive-focused coverage',
    notGood:
      'Not for active health conditions, specialty medications, or anyone expecting significant medical utilization',
    idealClient:
      'Healthy adult, self-employed or freelance, needs affordable base coverage with doctor visit and hospital benefit access',
    topPoints: [
      'Preventive health services covered',
      'Annual physical exam covered',
      'GoodHealth 1-3: $25 PCP copay / $50 specialist & urgent care',
      'GoodHealth 4-5: $50 PCP copay / $75 specialist & urgent care',
      'Unlimited telemedicine from day one',
      'Rx discount tiers',
      'Hospital indemnity schedule'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      '12-month pre-existing condition exclusion',
      '30-day sickness waiting period',
      'NOT major medical insurance'
    ],
    framing:
      '"GoodHealth gives you the same preventive-first coverage structure — doctor visits, telemedicine, hospital protection — through the Good Health association. Same solid foundation."',
    objections: [
      'Pre-ex exclusion applies 12 months',
      'Not comprehensive insurance',
      'Waiting period for sickness'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant major medical insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded for 12 months. (6) There is a 30-day sickness waiting period. (7) Benefits are fixed amounts toward services, not full bill coverage.',
    fitYes: [
      'Healthy, infrequent healthcare user',
      'Budget is primary driver',
      'Needs preventive care access',
      'No employer plan available'
    ],
    fitNo: [
      'Active health conditions',
      'Specialty medications',
      'Expecting hospitalization',
      'Wants ACA-level coverage'
    ]
  },

  {
    group: 'MEC',
    name: 'TDK 1–5',
    type: 'MEC — Limited Health & Wellness',
    tagline: 'Detego Health MEC with concierge and pharmacy services',
    network: 'First Health',
    admin: 'Detego Health',
    assoc: 'Health Care Data Analytics',
    bestFor:
      'Budget-conscious individuals who want MEC base coverage with added concierge and pharmacy assistance',
    notGood:
      'Not for complex health needs; designed as affordable preventive and wellness plan',
    idealClient:
      'Cost-sensitive buyer who values telemedicine, pharmacy discounts, and preventive care in one affordable package',
    topPoints: [
      'Preventive health services covered',
      'Annual physical exam covered',
      'Telemedicine access',
      'Concierge services',
      'Pharmacy assistance program',
      'First Health network',
      'Affordable premium tiers'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      '12-month pre-existing condition exclusion',
      '30-day sickness waiting period',
      'NOT major medical insurance'
    ],
    framing:
      '"TDK is a limited health and wellness plan through Detego Health — designed for affordable preventive coverage with First Health access, telemedicine, and pharmacy help built in. It\'s not major medical, but it keeps your everyday needs covered affordably."',
    objections: [
      "Is this insurance? → It's a limited health and wellness benefit plan, not major medical insurance",
      'Pre-ex applies for 12 months'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant major medical insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded for 12 months. (6) There is a 30-day sickness waiting period. (7) Benefits are fixed amounts toward services, not full bill coverage.',
    fitYes: [
      'Very budget-conscious',
      'Needs preventive care and pharmacy help',
      'Healthy, low utilization expected',
      'Wants telemedicine access'
    ],
    fitNo: [
      'Has active medical conditions',
      'Needs real medical coverage',
      'Expecting any significant healthcare use'
    ]
  },

  {
    group: 'MEC',
    name: 'SmartChoice',
    type: 'MEC — Structured EPO Plan',
    tagline: 'Detego Health EPO with structured office visit benefits',
    network: 'First Health EPO',
    admin: 'Detego Health',
    assoc: 'Population Science Management',
    bestFor:
      'Individuals who want structured MEC coverage with defined office visit benefits and EPO network access',
    notGood:
      'Not for complex health conditions; EPO means no out-of-network coverage',
    idealClient:
      'Budget-conscious adult, comfortable with EPO network structure, needs office visits, telemedicine, and preventive care',
    topPoints: [
      'Preventive health services covered',
      'Annual physical exam covered',
      'Structured MEC plan',
      'Office visit benefits',
      'Telemedicine included',
      'First Health EPO network access'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      '12-month pre-existing condition exclusion',
      '30-day sickness waiting period',
      'NOT major medical insurance',
      'EPO — NO out-of-network coverage'
    ],
    framing:
      '"SmartChoice is a structured MEC plan through Detego Health with an EPO network — meaning you stay in-network, get your preventive care, office visits, and telemedicine covered at an affordable price. The trade-off for the lower cost is no out-of-network coverage."',
    objections: [
      'EPO means in-network only — always confirm their doctor is in First Health EPO before enrolling',
      'Pre-ex 12 months',
      'Not major medical'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant major medical insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded for 12 months. (6) There is a 30-day sickness waiting period. (7) Benefits are fixed amounts toward services, not full bill coverage. (8) EPO plan — NO out-of-network coverage. Confirm provider is in-network before enrolling.',
    fitYes: [
      'Comfortable staying in-network',
      'Budget is primary concern',
      'Healthy, preventive care focus',
      'Has confirmed in-network providers'
    ],
    fitNo: [
      'Wants out-of-network flexibility',
      'Has active conditions',
      'Needs specialist access regularly'
    ]
  },

  // ══════════════════════════════
  // GROUP 2: STM PLANS
  // ══════════════════════════════
  {
    group: 'STM',
    name: 'Pinnacle STM / Pinnacle Protect',
    type: 'Short-Term Medical',
    tagline: 'Fast-start bridge coverage — next-day activation',
    network: 'PHCS',
    admin: 'Everest Reinsurance Company',
    assoc: 'American Workers Association (AWA)',
    bestFor:
      'Between jobs, missed open enrollment, waiting for employer benefits, post-military transition',
    notGood:
      'Active pre-existing conditions, planning pregnancy, wanting ACA-compliant permanent coverage',
    idealClient:
      "Transitioning professional, recently separated from military, new grad off parents' plan, generally healthy",
    topPoints: [
      'Coverage starts next day',
      'No enrollment windows',
      'PHCS network access (900K+ providers)',
      'Deductible + coinsurance structure',
      'Accident coverage from day one',
      'Sickness covered after 5 days'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'Pre-existing conditions excluded (12-month lookback)',
      'NOT renewable as permanent coverage',
      'NOT major medical insurance',
      'Sickness: 5-day wait',
      'Cancer: 30-day wait'
    ],
    framing:
      '"This is your bridge plan. It covers you right now, tomorrow, while your situation is in transition. You\'re not locked in — when your permanent coverage starts, you stop this. But right now, you\'re protected."',
    objections: [
      "Not ACA → correct, that's why it's affordable and starts immediately",
      'Pre-ex → disclose clearly: prior 12 months excluded',
      'Wait for open enrollment → gap is months away, Pinnacle fills it now'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health coverage is limited or not covered depending on plan. (5) Pre-existing conditions from the prior 12 months are excluded. (6) This is a temporary plan — NOT renewable as permanent coverage. (7) This is NOT major medical insurance.',
    fitYes: [
      'Between jobs or transitioning',
      'Generally healthy',
      'Needs immediate coverage',
      'Understands this is temporary',
      'Budget-conscious'
    ],
    fitNo: [
      'Active pre-existing conditions needing treatment',
      'Wants ACA-equivalent coverage',
      'Planning pregnancy',
      'Wants long-term permanent coverage'
    ]
  },

  {
    group: 'STM',
    name: 'Access Health Traditional STM',
    type: 'Short-Term Medical',
    tagline: 'PHCS-network STM through National Congress of Employers',
    network: 'PHCS',
    admin: 'American Financial Security Life Insurance Company',
    assoc: 'National Congress of Employers',
    bestFor:
      'Individuals needing short-term bridge coverage with PHCS network access',
    notGood: 'Pre-existing conditions, ACA seekers, maternity needs',
    idealClient:
      'Gap coverage seeker, healthy, transitioning between coverage periods',
    topPoints: [
      'PHCS network access',
      'Short-term bridge coverage',
      'Deductible-based structure',
      'Next-day or fast-start coverage'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'Pre-existing conditions excluded (12-month lookback)',
      'NOT renewable as permanent coverage',
      'NOT major medical insurance'
    ],
    framing:
      '"Access Health gives you bridge coverage through PHCS while your situation sorts out. Same core STM structure — deductible, coinsurance, real network access — at an affordable short-term price."',
    objections: [
      'Not ACA → correct, temporary bridge plan',
      'Pre-ex applies',
      'Waiting periods apply for sickness'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health coverage is limited or not covered depending on plan. (5) Pre-existing conditions from the prior 12 months are excluded. (6) This is a temporary plan — NOT renewable as permanent coverage. (7) This is NOT major medical insurance.',
    fitYes: [
      'Healthy, transitioning',
      'Needs PHCS network access',
      'Short-term coverage need',
      'Gap between employer plans'
    ],
    fitNo: [
      'Active conditions',
      'Permanent coverage need',
      'Planning pregnancy'
    ]
  },

  {
    group: 'STM',
    name: 'Smart Health STM Traditional',
    type: 'Short-Term Medical',
    tagline: 'PHCS-network STM through Standard Life and Casualty',
    network: 'PHCS',
    admin: 'Standard Life and Casualty Insurance Company',
    assoc: 'National Congress of Employers',
    bestFor:
      'Healthy individuals needing short-term bridge coverage with PHCS network',
    notGood: 'Pre-existing conditions, ACA compliance requirement, maternity',
    idealClient:
      'Transitioning adult needing temporary coverage, comfortable with STM structure',
    topPoints: [
      'PHCS network access',
      'Bridge coverage structure',
      'Deductible + coinsurance',
      'Fast enrollment'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'Pre-existing conditions excluded (12-month lookback)',
      'NOT renewable as permanent coverage',
      'NOT major medical insurance'
    ],
    framing:
      "\"Smart Health is a straightforward STM option — PHCS network, deductible structure, covers you while you're between plans. It's temporary by design, and that's exactly what makes it affordable.\"",
    objections: [
      'Same STM objections: not ACA, pre-ex, waiting periods',
      'Not permanent coverage'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health coverage is limited or not covered depending on plan. (5) Pre-existing conditions from the prior 12 months are excluded. (6) This is a temporary plan — NOT renewable as permanent coverage. (7) This is NOT major medical insurance.',
    fitYes: [
      'Healthy, short-term need',
      'PHCS network preferred',
      'Gap coverage situation'
    ],
    fitNo: [
      'Active health conditions',
      'Long-term permanent need',
      'ACA compliance required'
    ]
  },

  {
    group: 'STM',
    name: 'Galena STM Elite',
    type: 'Short-Term Medical — Premium',
    tagline: 'Closest-to-major-medical STM with $2M policy max',
    network: 'MultiPlan',
    admin: 'Southern Guarantee Insurance Company',
    assoc: 'Association for Responsible Planners',
    bestFor:
      'Higher income professionals who want comprehensive-feel coverage temporarily',
    notGood:
      'Budget-conscious buyers; pre-existing conditions; maternity; ACA compliance need',
    idealClient:
      'Earns above median income, familiar with deductibles, wants real coverage feel temporarily, understands coinsurance',
    topPoints: [
      '$2M policy maximum',
      '$30 PCP / $45 specialist copays',
      '8 PCP + specialist visits',
      'Deductibles $2,500–$10,000',
      'Coinsurance: 50/50, 70/30, 80/20',
      'Mental health included',
      'Ambulance + advanced radiology',
      'MultiPlan network'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'Mental health: inpatient $100/day 30 days, outpatient 10 days only',
      'Pre-existing conditions excluded (12-month lookback)',
      'Out-of-network: 200% deductible applies',
      'Joint/tendon surgery capped at $10,000',
      'NOT renewable as permanent coverage'
    ],
    framing:
      '"Galena is the most comprehensive STM I have. It works like major medical — you pick your deductible, coinsurance kicks in after, and you have a $2 million ceiling. It\'s not ACA, but at $192/month versus BCBS at $348 with a $7,500 deductible, the math is hard to argue with."',
    objections: [
      'High deductible → you choose it, $2,500 option available',
      "Not ACA → correct, that's the trade-off for the price",
      'vs BCBS → $192 vs $348, similar deductible structure, Galena wins on price'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health coverage is limited or not covered depending on plan. (5) Pre-existing conditions from the prior 12 months are excluded. (6) This is a temporary plan — NOT renewable as permanent coverage. (7) This is NOT major medical insurance. Note: Galena has limited mental health — inpatient $100/day up to 30 days, outpatient up to 10 days. Must still disclose this is NOT full mental health coverage.',
    fitYes: [
      'Higher income, budget is secondary',
      'Understands deductibles/coinsurance',
      'Transitioning between coverage',
      'Healthy, no active pre-ex',
      'Wants $2M ceiling protection'
    ],
    fitNo: [
      'Budget is primary concern (use MEC instead)',
      'Active pre-existing conditions',
      'Wants ACA-compliant plan',
      'Planning pregnancy'
    ]
  },

  {
    group: 'STM',
    name: 'Everest Summit Plans',
    type: 'STM / Indemnity Hybrid',
    tagline: 'MultiPlan STM hybrid through Everest Reinsurance',
    network: 'MultiPlan',
    admin: 'Everest Reinsurance Company',
    assoc: 'National Congress of Employers',
    bestFor:
      'Individuals needing STM-style coverage with indemnity hybrid structure through MultiPlan network',
    notGood: 'Pre-existing conditions, permanent coverage need, ACA compliance',
    idealClient:
      'Transitioning adult comfortable with hybrid benefit structure, healthy, short-term need',
    topPoints: [
      'Everest Reinsurance backed',
      'MultiPlan network access',
      'STM + indemnity hybrid structure',
      'Bridge coverage'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'Pre-existing conditions excluded (12-month lookback)',
      'NOT renewable as permanent coverage',
      'NOT major medical insurance'
    ],
    framing:
      '"Everest Summit is a hybrid STM plan — it combines short-term medical structure with indemnity benefits, backed by Everest Reinsurance. Solid bridge coverage with MultiPlan network access."',
    objections: [
      'Pre-ex excluded',
      'Not ACA',
      'Hybrid structure — explain indemnity components clearly'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health coverage is limited or not covered depending on plan. (5) Pre-existing conditions from the prior 12 months are excluded. (6) This is a temporary plan — NOT renewable as permanent coverage. (7) This is NOT major medical insurance.',
    fitYes: [
      'Healthy, transitioning',
      'Short-term coverage gap',
      'Understands hybrid benefit structure'
    ],
    fitNo: [
      'Pre-existing conditions',
      'Long-term need',
      'ACA compliance required'
    ]
  },

  // ══════════════════════════════
  // GROUP 3: LIMITED BENEFIT PLANS
  // ══════════════════════════════
  {
    group: 'Limited',
    name: 'HarmonyCare / SigmaCare',
    type: 'Limited Benefit / Fixed Indemnity',
    tagline: 'First Health network fixed indemnity plans',
    network: 'First Health',
    admin: 'American Financial Security Life Insurance Company',
    assoc: 'National Congress of Employers',
    bestFor:
      'Individuals who need fixed indemnity coverage with First Health network access at an affordable price',
    notGood:
      'Anyone expecting full bill coverage; pre-existing conditions; ACA compliance requirement',
    idealClient:
      'Budget-conscious adult needing structured indemnity benefits with First Health network access',
    topPoints: [
      'First Health network access',
      'Fixed indemnity benefits for covered services',
      'PCP visit benefits',
      'Hospital indemnity',
      'Telemedicine access'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      'Pre-existing conditions excluded',
      'Fixed indemnity — pays SET AMOUNTS, not actual charges',
      'NOT major medical insurance',
      'Balance billing risk if out-of-network'
    ],
    framing:
      '"HarmonyCare and SigmaCare are fixed indemnity plans — that means the plan pays a set dollar amount toward covered services, not the full bill. You use First Health providers to minimize the gap. The value is the affordable premium for structured benefits."',
    objections: [
      "It only pays a set amount → correct, that's the indemnity structure, which is why the premium is affordable",
      'Not full coverage → disclose clearly: fixed amounts toward services'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded. (6) This plan pays FIXED SET AMOUNTS toward services — NOT the full bill. (7) This is a fixed indemnity plan, NOT major medical insurance.',
    fitYes: [
      'Needs affordable structured benefits',
      'Comfortable with fixed indemnity model',
      'Has First Health in-network providers nearby',
      'Budget is primary concern'
    ],
    fitNo: [
      'Expects full bill coverage',
      'Has significant health needs',
      'Needs comprehensive protection',
      'Does not understand indemnity model'
    ]
  },

  {
    group: 'Limited',
    name: 'BWA Paramount',
    type: 'Limited Benefit / Fixed Indemnity',
    tagline: 'Business Workers of America plan via Managed Care network',
    network: 'Managed Care',
    admin: 'BCS Insurance Company',
    assoc: 'Business Workers of America',
    bestFor:
      'Workers needing affordable fixed indemnity coverage through Managed Care network',
    notGood:
      'Pre-existing conditions, full coverage expectation, ACA compliance need',
    idealClient:
      'Working adult affiliated with BWA, needs affordable indemnity structure, Managed Care network access',
    topPoints: [
      'Managed Care network access',
      'Fixed indemnity benefit schedule',
      'Affordable premium structure',
      'Basic hospital and medical benefits'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      'Pre-existing conditions excluded',
      'Fixed indemnity — pays SET AMOUNTS, not actual charges',
      'NOT major medical insurance',
      'Balance billing risk if out-of-network'
    ],
    framing:
      '"BWA Paramount is a fixed indemnity benefit plan through the Business Workers of America association. The plan pays set dollar amounts toward covered services — it\'s not full coverage, but it\'s affordable structured protection."',
    objections: [
      'Set amounts only, not full bill coverage',
      'Managed Care network — verify providers',
      'Pre-ex exclusion applies'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded. (6) This plan pays FIXED SET AMOUNTS toward services — NOT the full bill. (7) This is a fixed indemnity plan, NOT major medical insurance.',
    fitYes: [
      'BWA association member',
      'Budget-conscious',
      'Understands indemnity model',
      'Managed Care network available in area'
    ],
    fitNo: [
      'Expects comprehensive coverage',
      'Has active conditions',
      'Needs broad network access'
    ]
  },

  {
    group: 'Limited',
    name: 'BWA Americare 2–4',
    type: 'Limited Benefit / Fixed Indemnity',
    tagline: 'PHCS-network indemnity plan through BWA',
    network: 'PHCS',
    admin: 'American Public Life',
    assoc: 'Business Workers of America',
    bestFor:
      'BWA members needing affordable fixed indemnity coverage with PHCS network access',
    notGood:
      'Full coverage expectation, pre-existing conditions, ACA compliance need',
    idealClient:
      'Budget-conscious working adult, BWA affiliated, comfortable with indemnity benefit structure and PHCS network',
    topPoints: [
      'PHCS network access',
      'Fixed indemnity benefit schedule',
      'Tiered plan options (2, 3, 4)',
      'American Public Life backed',
      'Hospital + medical indemnity benefits'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      'Pre-existing conditions excluded',
      'Fixed indemnity — pays SET AMOUNTS, not actual charges',
      'NOT major medical insurance',
      'Balance billing risk if out-of-network'
    ],
    framing:
      '"BWA Americare gives you structured indemnity benefits with PHCS network access — one of the largest networks available. It pays set dollar amounts toward covered services. The broad PHCS network helps minimize out-of-pocket gaps."',
    objections: [
      'Set amounts not full coverage → confirm they understand indemnity model',
      'Pre-ex exclusion applies',
      'Not major medical'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded. (6) This plan pays FIXED SET AMOUNTS toward services — NOT the full bill. (7) This is a fixed indemnity plan, NOT major medical insurance.',
    fitYes: [
      'Understands indemnity model',
      'PHCS network available in area',
      'Budget is primary concern',
      'BWA association member'
    ],
    fitNo: [
      'Expects full bill coverage',
      'Active health conditions',
      'Needs ACA-equivalent coverage'
    ]
  },

  {
    group: 'Limited',
    name: 'HealthChoice Silver',
    type: 'Limited Benefit / Fixed Indemnity',
    tagline: 'MultiPlan-network indemnity plan',
    network: 'MultiPlan',
    admin: 'American Financial Security Life Insurance Company',
    assoc: 'National Congress of Employers',
    bestFor:
      'Individuals needing affordable fixed indemnity benefits with broad MultiPlan network access',
    notGood:
      'Full coverage expectation, pre-existing conditions, ACA compliance need',
    idealClient:
      'Budget-conscious adult, needs some structured coverage, comfortable with indemnity model, MultiPlan network available',
    topPoints: [
      'MultiPlan network access (broad coverage)',
      'Fixed indemnity benefit schedule',
      'American Financial Security backed',
      'National Congress of Employers association',
      'Hospital + medical indemnity benefits'
    ],
    limitations: [
      'NOT ACA compliant',
      'NO maternity or pregnancy coverage',
      'NO drug or alcohol rehabilitation coverage',
      'NO mental health coverage',
      'Pre-existing conditions excluded',
      'Fixed indemnity — pays SET AMOUNTS, not actual charges',
      'NOT major medical insurance',
      'Balance billing risk if out-of-network'
    ],
    framing:
      '"HealthChoice Silver is a fixed indemnity plan with MultiPlan network access — broad provider coverage. It pays structured dollar amounts toward services. For someone who needs affordable protection and understands the indemnity model, it\'s solid coverage."',
    objections: [
      'Set amounts not full bill → indemnity model, disclosed upfront',
      'Pre-ex excluded',
      'Not ACA or major medical'
    ],
    compliance:
      'REQUIRED DISCLOSURES — say every enrollment: (1) This is NOT ACA-compliant insurance. (2) Maternity and pregnancy are NOT covered. (3) Drug and alcohol rehabilitation is NOT covered. (4) Mental health is NOT covered. (5) Pre-existing conditions are excluded. (6) This plan pays FIXED SET AMOUNTS toward services — NOT the full bill. (7) This is a fixed indemnity plan, NOT major medical insurance.',
    fitYes: [
      'Understands fixed indemnity model',
      'MultiPlan network available',
      'Budget-conscious',
      'Needs structured affordable coverage'
    ],
    fitNo: [
      'Expects comprehensive coverage',
      'Has active health needs',
      'ACA compliance required'
    ]
  }
];

function renderBenefits() {
  var html =
    '<div class="ph"><div class="pt">Benefit <span>Explainer</span></div><div class="pd">Plain English + sales framing for every benefit. With follow-up handling and bridge lines.</div></div>';
  html +=
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;">';
  BENEFITS.forEach(function (b, i) {
    html += '<div class="xcard" id="bx' + i + '">';
    html += '<div class="xcard-hd" onclick="toggleXcard(\'bx' + i + '\')">';
    html +=
      '<div class="xcard-hd-l" style="display:flex;align-items:center;gap:10px;">' +
      iconBox(P[b.icon] || P.circle) +
      '<div class="xcard-label">' +
      b.name +
      '</div></div>';
    html += '<span class="xcard-chev" aria-hidden="true">▼</span></div>';
    html += '<div class="xcard-body">';
    html +=
      '<div class="field"><div class="field-lbl" style="color:var(--charcoal2)">Official Meaning</div><div class="field-txt">' +
      b.official +
      '</div></div>';
    html +=
      '<div class="field"><div class="field-lbl" style="color:#7a5f00">Simple Explanation</div><div class="field-txt">' +
      b.simple +
      '</div></div>';

    html +=
      '<div class="field"><div class="field-lbl" style="color:var(--warmgray3)">Common Misunderstanding</div><div class="field-txt" style="color:var(--warmgray3)">' +
      b.misunderstand +
      '</div></div>';
    html +=
      '<div class="ibox ibox-avoid u-mt10"><span class="sbox-lbl" style="color:var(--error)">Never Say</span><br>' +
      b.notsay +
      '</div>';
    html +=
      '<div class="ibox ibox-bridge"><span class="sbox-lbl" style="color:#29A26A">Common Follow-Up</span><br>' +
      b.followup +
      '</div>';
    html +=
      '<div class="ibox ibox-bridge" style="border-color:rgba(212,96,122,0.2);background:rgba(212,96,122,0.05);"><span class="sbox-lbl" style="color:var(--charcoal)">Bridge Back</span><br>' +
      b.bridge +
      '</div>';
    html += '</div></div>';
  });
  html += '</div>';
  var _page_benefits = document.getElementById('page-benefits');
  if (_page_benefits) _page_benefits.innerHTML = html;
}

// ══════════════════════════════════════════════════════
// RENDER: PLANS
// ══════════════════════════════════════════════════════
var PLAN_GROUPS = [
  {
    key: 'MEC',
    label: 'MEC Plans',
    color: '#5B8DEF',
    desc: 'Minimum Essential Coverage — preventive-first base plans'
  },
  {
    key: 'STM',
    label: 'Short-Term Medical',
    color: '#d97706',
    desc: 'Temporary bridge coverage — major-medical style'
  },
  {
    key: 'Limited',
    label: 'Limited Benefit Plans',
    color: '#dc2626',
    desc: 'Fixed indemnity plans — pay set amounts toward services'
  }
];
var activePlanGroup = 'All';

// ── Combined All Plans view (Plan Vault + Policy Reference) ──
function renderAllPlans() {
  var pg = document.getElementById('page-allplans');
  if (!pg) return;
  // Inject unique containers — avoid clashing with combo-page id="page-plans"
  pg.innerHTML =
    '<div id="allplans-vault"></div><div id="allplans-policydocs" style="margin-top:32px;"></div>';
  renderPlans();
  if (typeof renderPolicydocs === 'function') renderPolicydocs();
}

function renderPlans() {
  var html =
    '<div class="ph"><div class="pt">Plan <span>Vault</span></div><div class="pd">Every plan from official policy documents. Tap any card for full coverage details.</div></div>';
  html +=
    '<div class="comp-banner"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> <strong>Core compliance — say every time:</strong> Disclose plan type, pre-existing exclusion, waiting periods, fixed/limited benefit amounts, and when a plan is NOT ACA major medical.</div>';
  // Benefits highlight cards — clickable filters
  var _bsvg = function (d) {
    return (
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      d +
      '</svg>'
    );
  };
  html +=
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-bottom:20px;">';
  var highlights = [
    {
      svg: _bsvg(
        '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>'
      ),
      label: 'Doctor Visits',
      desc: 'Fixed cash benefit per visit',
      filter: 'doctor|pcp|copay|office visit'
    },
    {
      svg: _bsvg(
        '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>'
      ),
      label: 'Prescriptions',
      desc: 'Rx discount or fixed benefit',
      filter: 'rx|prescription|drug'
    },
    {
      svg: _bsvg(
        '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'
      ),
      label: 'Emergency',
      desc: 'ER benefit up to plan max',
      filter: 'emergency|er |ambulance'
    },
    {
      svg: _bsvg(
        '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'
      ),
      label: 'Preventive',
      desc: 'Wellness visits covered',
      filter: 'preventive|wellness|physical|screening'
    },
    {
      svg: _bsvg(
        '<path d="M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17H8v-2.3A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/><path d="M9 18h6M10 22h4"/>'
      ),
      label: 'Dental/Vision',
      desc: 'Add-on available',
      filter: 'dental|vision|eye|teeth'
    },
    {
      svg: _bsvg(
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
      ),
      label: 'Telehealth',
      desc: '$0 virtual visits on most plans',
      filter: 'telehealth|telemedicine|virtual'
    }
  ];
  highlights.forEach(function (h, idx) {
    html +=
      '<div class="benefit-filter-card" data-filter="' +
      h.filter +
      '" onclick="filterPlansByBenefit(this)" style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:14px;padding:14px 16px;text-align:center;cursor:pointer;transition:border-color 0.15s, background 0.15s;">';
    html +=
      '<div style="margin-bottom:6px;color:var(--accent);">' + h.svg + '</div>';
    html +=
      '<div style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:2px;">' +
      h.label +
      '</div>';
    html +=
      '<div style="font-family:var(--font-body);font-size:12px;color:var(--text-secondary);">' +
      h.desc +
      '</div>';
    html += '</div>';
  });
  html += '</div>';
  html += '<div class="stabs" style="margin-bottom:20px;">';
  ['All', 'MEC', 'STM', 'Limited'].forEach(function (g) {
    html +=
      '<button class="stab ' +
      (g === activePlanGroup ? 'active' : '') +
      '" onclick="setPlanGroup(\'' +
      g +
      '\')">' +
      (g === 'All' ? 'All Plans' : g) +
      '</button>';
  });
  html += '</div>';
  // Plan search bar
  html +=
    '<div id="planSearchWrap" style="position:relative;margin-bottom:16px;">';
  html +=
    '<svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);pointer-events:none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  html +=
    '<input type="text" id="planSearchInput" placeholder="Search plans by name, type, or network..." oninput="filterPlanSearch(this.value)" style="width:100%;height:44px;border-radius:999px;border:1.5px solid #E5E7EB;padding:0 40px 0 44px;font-size:14px;font-family:var(--font-body);background:#F8F9FE;color:var(--text-primary);outline:none;transition:border-color 0.15s;" onfocus="this.style.borderColor=\'#5B8DEF\'" onblur="this.style.borderColor=\'#E5E7EB\'" />';
  html +=
    '<button id="planSearchClear" onclick="clearPlanSearch()" style="display:none;position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9CA3AF;font-size:18px;line-height:1;padding:4px;">&times;</button>';
  html += '</div>';
  html +=
    '<div id="planNoResults" style="display:none;text-align:center;padding:24px 0;color:var(--text-secondary);font-size:14px;">No plans match your search.</div>';
  html += '<div id="planGroupsWrap"></div>';
  var _page_plans =
    document.getElementById('allplans-vault') ||
    document.getElementById('page-plans');
  if (_page_plans) _page_plans.innerHTML = html;
  renderPlanGroups();
}

var _activeBenefitFilter = null;
function filterPlansByBenefit(el) {
  var filter = el.getAttribute('data-filter');
  var expandId = 'benefitExpand';
  var existing = document.getElementById(expandId);
  // Toggle off if same filter clicked again
  if (_activeBenefitFilter === filter) {
    _activeBenefitFilter = null;
    document.querySelectorAll('.benefit-filter-card').forEach(function (c) {
      c.style.borderColor = '#C8CEDD';
      c.style.background = '#FFFFFF';
    });
    if (existing) existing.remove();
    renderPlanGroups();
    return;
  }
  _activeBenefitFilter = filter;
  // Highlight active card
  document.querySelectorAll('.benefit-filter-card').forEach(function (c) {
    c.style.borderColor = '#C8CEDD';
    c.style.background = '#FFFFFF';
  });
  el.style.borderColor = '#5B8DEF';
  el.style.background = '#EEF3FF';

  // Build expanded section from POLICY_DOCS
  var terms = filter.split('|');
  var label = el.querySelector('div[style*="font-weight:700"]');
  var categoryName = label ? label.textContent : 'Benefit';
  var matches = [];
  POLICY_DOCS.forEach(function (doc) {
    var found = [];
    doc.benefits.forEach(function (bcat) {
      var catLower = bcat.category.toLowerCase();
      var itemsText = bcat.items.join(' ').toLowerCase();
      var hit = false;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i].trim().toLowerCase();
        if (catLower.indexOf(t) !== -1 || itemsText.indexOf(t) !== -1) {
          hit = true;
          break;
        }
      }
      if (hit) {
        bcat.items.forEach(function (item) {
          found.push(item);
        });
      }
    });
    if (found.length) {
      matches.push({
        name: doc.name,
        group: doc.group,
        network: doc.network,
        items: found
      });
    }
  });

  var html =
    '<div id="' +
    expandId +
    '" style="background:#F8F9FE;border:2px solid #5B8DEF;border-radius:14px;padding:18px 20px;margin-bottom:20px;animation:fadeIn 0.2s ease;">';
  html +=
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">';
  html +=
    '<div style="font-family:var(--font-ui);font-size:16px;font-weight:700;color:var(--text-primary);">' +
    categoryName +
    ' Coverage by Plan</div>';
  html +=
    '<span style="font-size:12px;color:var(--text-secondary);">' +
    matches.length +
    ' plans</span></div>';
  if (!matches.length) {
    html +=
      '<div style="font-size:14px;color:var(--text-secondary);padding:10px 0;">No plans have this benefit in policy documents.</div>';
  } else {
    matches.forEach(function (m) {
      var badgeBg =
        m.group === 'MEC'
          ? 'rgba(91,141,239,0.10)'
          : m.group === 'STM'
            ? 'rgba(245,158,11,0.10)'
            : 'rgba(239,68,68,0.08)';
      var badgeColor =
        m.group === 'MEC'
          ? '#5B8DEF'
          : m.group === 'STM'
            ? '#d97706'
            : '#dc2626';
      html +=
        '<div style="background:#FFFFFF;border:1.5px solid #E5E7EB;border-radius:10px;padding:12px 14px;margin-bottom:8px;">';
      html +=
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">';
      html +=
        '<span style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:var(--text-primary);">' +
        m.name +
        '</span>';
      html +=
        '<span style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:2px 6px;border-radius:999px;background:' +
        badgeBg +
        ';color:' +
        badgeColor +
        ';">' +
        m.group +
        '</span>';
      html +=
        '<span style="font-size:12px;color:var(--text-secondary);margin-left:auto;">' +
        m.network +
        '</span></div>';
      m.items.forEach(function (item) {
        html +=
          '<div style="font-size:13px;color:var(--text-secondary);padding-left:10px;margin-bottom:2px;line-height:1.5;">&#8226; ' +
          item +
          '</div>';
      });
      html +=
        '<div style="margin-top:6px;"><a href="javascript:void(0)" onclick="event.stopPropagation();showPage(\'policydocs\')" style="font-size:12px;color:#5B8DEF;text-decoration:none;font-weight:600;">See full plan &rarr;</a></div>';
      html += '</div>';
    });
  }
  html += '</div>';

  // Insert expansion below the filter card grid
  if (existing) existing.remove();
  var filterGrid = el.parentElement;
  if (filterGrid) filterGrid.insertAdjacentHTML('afterend', html);

  // Also filter plan cards below
  var wrap = document.getElementById('planGroupsWrap');
  if (!wrap) return;
  var cards = wrap.querySelectorAll('.plan-card');
  cards.forEach(function (card) {
    var text = card.textContent.toLowerCase();
    var matchFound = false;
    for (var i = 0; i < terms.length; i++) {
      if (text.indexOf(terms[i].trim()) !== -1) {
        matchFound = true;
        break;
      }
    }
    card.style.display = matchFound ? '' : 'none';
  });
}

// ── Plan Search ──
function filterPlanSearch(query) {
  var q = (query || '').toLowerCase().trim();
  var clearBtn = document.getElementById('planSearchClear');
  var noResults = document.getElementById('planNoResults');
  if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
  var wrap = document.getElementById('planGroupsWrap');
  if (!wrap) return;
  var cards = wrap.querySelectorAll('.plan-card');
  var visibleCount = 0;
  cards.forEach(function (card) {
    if (!q) {
      card.style.display = '';
      visibleCount++;
      return;
    }
    // Search data-plan-search attribute first (name, type, network, carrier, assoc), fallback to textContent
    var searchStr =
      (card.getAttribute('data-plan-search') || '') +
      ' ' +
      card.textContent.toLowerCase();
    var match = searchStr.indexOf(q) !== -1;
    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });
  // Also show/hide group headers
  var groups = wrap.querySelectorAll('[data-plan-group]');
  groups.forEach(function (grp) {
    var vis = 0;
    grp.querySelectorAll('.plan-card').forEach(function (c) {
      if (c.style.display !== 'none') vis++;
    });
    grp.style.display = q && vis === 0 ? 'none' : '';
  });
  if (noResults)
    noResults.style.display = q && visibleCount === 0 ? 'block' : 'none';
}

function clearPlanSearch() {
  var input = document.getElementById('planSearchInput');
  if (input) {
    input.value = '';
    filterPlanSearch('');
    input.focus();
  }
}

function setPlanGroup(g) {
  activePlanGroup = g;
  document.querySelectorAll('#page-plans .stab').forEach(function (b) {
    var txt = b.textContent === 'All Plans' ? 'All' : b.textContent;
    b.classList.toggle('active', txt === g);
  });
  renderPlanGroups();
}

function renderPlanGroups() {
  var wrap = document.getElementById('planGroupsWrap');
  if (!wrap) return;

  // Build from POLICY_DOCS for real benefit data
  var groupDefs = [
    {
      key: 'MEC',
      label: 'MEC Plans',
      desc: 'Minimum Essential Coverage — preventive-first base plans',
      color: '#5B8DEF'
    },
    {
      key: 'STM',
      label: 'Short-Term Medical',
      desc: 'Temporary bridge coverage — major-medical style',
      color: '#d97706'
    },
    {
      key: 'Limited',
      label: 'Limited Benefit Plans',
      desc: 'Fixed indemnity plans — pay set amounts toward services',
      color: '#dc2626'
    }
  ];
  var showGroups =
    activePlanGroup === 'All'
      ? groupDefs
      : groupDefs.filter(function (g) {
          return g.key === activePlanGroup;
        });

  var html = '';
  showGroups.forEach(function (grp) {
    var docs = POLICY_DOCS.filter(function (p) {
      return p.group === grp.key;
    });
    if (!docs.length) return;

    html +=
      '<div style="margin-bottom:28px;" data-plan-group="' + grp.key + '">';
    html +=
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">';
    html +=
      '<div style="font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--charcoal3);">' +
      grp.label +
      '</div>';
    html +=
      '<div style="flex:1;height:1px;background:rgba(200,206,221,0.5);"></div>';
    html +=
      '<span class="tag" style="background:rgba(91,141,239,0.1);color:#5B8DEF;">' +
      docs.length +
      ' plans</span></div>';
    html +=
      '<div style="font-size:12px;color:var(--warmgray3);margin-bottom:12px;">' +
      grp.desc +
      '</div>';

    docs.forEach(function (doc) {
      // Find matching PLANS entry for sales framing data
      var salesPlan = null;
      for (var si = 0; si < PLANS.length; si++) {
        if (
          doc.name.indexOf(PLANS[si].name.split(' ')[0]) !== -1 ||
          PLANS[si].name.indexOf(doc.name.split(' ')[0]) !== -1
        ) {
          if (PLANS[si].group === doc.group) {
            salesPlan = PLANS[si];
            break;
          }
        }
      }
      // Build quick-read flags
      var flags = [];
      var limText = doc.limitations.join(' ').toLowerCase();
      var benText = doc.benefits
        .map(function (b) {
          return b.items.join(' ');
        })
        .join(' ')
        .toLowerCase();
      if (
        limText.indexOf('in-network') !== -1 ||
        limText.indexOf('epo') !== -1 ||
        doc.network.indexOf('EPO') !== -1
      )
        flags.push('IN-NETWORK ONLY');
      if (
        limText.indexOf('not aca') !== -1 ||
        limText.indexOf('not major medical') !== -1
      )
        flags.push('NOT MAJOR MEDICAL');
      if (
        limText.indexOf('fixed amounts') !== -1 ||
        limText.indexOf('fixed indemnity') !== -1 ||
        limText.indexOf('set amounts') !== -1
      )
        flags.push('FIXED BENEFIT AMOUNTS');
      if (limText.indexOf('no maternity') !== -1) flags.push('NO MATERNITY');
      if (doc.preEx) flags.push('PRE-EX EXCLUSION');
      if (flags.length > 4) flags = flags.slice(0, 4);

      // Get top 3-5 benefit bullets
      var topBullets = [];
      doc.benefits.forEach(function (bcat) {
        bcat.items.forEach(function (item) {
          if (
            topBullets.length < 5 &&
            item.indexOf('NOT covered') === -1 &&
            item.indexOf('not covered') === -1
          )
            topBullets.push(item);
        });
      });

      var badgeBg =
        grp.key === 'MEC'
          ? 'rgba(91,141,239,0.10)'
          : grp.key === 'STM'
            ? 'rgba(245,158,11,0.10)'
            : 'rgba(239,68,68,0.08)';
      var badgeColor =
        grp.key === 'MEC'
          ? '#5B8DEF'
          : grp.key === 'STM'
            ? '#d97706'
            : '#dc2626';

      var planSearchStr = (
        doc.name +
        ' ' +
        doc.type +
        ' ' +
        doc.network +
        ' ' +
        doc.carrier +
        ' ' +
        (doc.assoc || '') +
        ' ' +
        doc.group
      ).toLowerCase();
      html +=
        '<div class="plan-card" data-plan-search="' +
        escHTML(planSearchStr) +
        '" id="pv-' +
        doc.id +
        '">';

      // ── COLLAPSED VIEW ──
      html +=
        '<div onclick="togglePlanVault(\'' +
        doc.id +
        '\')" style="padding:16px 20px;cursor:pointer;display:flex;align-items:flex-start;gap:12px;">';
      html += '<div style="flex:1;min-width:0;">';
      // Name + badge
      html +=
        '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">';
      html +=
        '<span style="font-family:var(--font-ui);font-size:16px;font-weight:700;color:var(--text-primary);line-height:1.3;">' +
        doc.name +
        '</span>';
      html +=
        '<span style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:' +
        badgeBg +
        ';color:' +
        badgeColor +
        ';">' +
        grp.key +
        '</span>';
      html += '</div>';
      // Summary line
      html +=
        '<div style="font-size:14px;color:var(--text-secondary);margin-bottom:8px;">' +
        doc.planNotes +
        '</div>';
      // Quick-read strip
      if (flags.length) {
        html +=
          '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;">';
        flags.forEach(function (f) {
          html +=
            '<span style="font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:.06em;padding:3px 8px;border-radius:999px;background:rgba(239,68,68,0.06);color:#B91C1C;border:1px solid rgba(239,68,68,0.15);">' +
            f +
            '</span>';
        });
        html += '</div>';
      }
      // Top bullets
      topBullets.forEach(function (b) {
        html +=
          '<div style="font-size:13px;color:var(--text-secondary);padding-left:10px;margin-bottom:2px;line-height:1.5;">&#8226; ' +
          b +
          '</div>';
      });
      html += '</div>';
      // Chevron
      html +=
        '<svg class="pv-chev" id="pv-chev-' +
        doc.id +
        '" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:4px;transition:transform 0.2s;" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
      html += '</div>';

      // ── EXPANDED VIEW ──
      html +=
        '<div class="pv-detail" id="pv-detail-' +
        doc.id +
        '" style="display:none;border-top:1.5px solid #E5E7EB;padding:16px 20px;">';

      // Meta strip
      html +=
        '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">';
      html +=
        '<span style="display:inline-flex;align-items:center;gap:4px;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 9px;border-radius:999px;background:rgba(46,125,82,0.08);color:#2E7D52;border:1px solid rgba(46,125,82,0.15);">' +
        doc.network +
        '</span>';
      html +=
        '<span style="display:inline-flex;align-items:center;gap:4px;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 9px;border-radius:999px;background:rgba(92,104,120,0.07);color:#5C6878;border:1px solid rgba(92,104,120,0.14);">' +
        doc.carrier +
        '</span>';
      if (doc.assoc)
        html +=
          '<span style="display:inline-flex;align-items:center;gap:4px;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:4px 9px;border-radius:999px;background:rgba(196,150,10,0.08);color:#A07A06;border:1px solid rgba(196,150,10,0.15);">' +
          doc.assoc +
          '</span>';
      html += '</div>';

      // Section: Coverage (all benefit categories except Preventive and Rx)
      var coverageCats = doc.benefits.filter(function (b) {
        var c = b.category.toLowerCase();
        return (
          c.indexOf('prescription') === -1 &&
          c.indexOf('preventive') === -1 &&
          c.indexOf('mec') === -1
        );
      });
      if (coverageCats.length) {
        html += '<div class="pv-section" style="margin-bottom:14px;">';
        html +=
          '<div style="font-family:var(--font-ui);font-size:13px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Coverage</div>';
        coverageCats.forEach(function (bcat) {
          html +=
            '<div style="margin-bottom:8px;"><div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:4px;">' +
            bcat.category +
            '</div>';
          bcat.items.forEach(function (item) {
            html +=
              '<div style="font-size:14px;color:var(--text-secondary);padding-left:12px;margin-bottom:2px;line-height:1.5;">&#8226; ' +
              item +
              '</div>';
          });
          html += '</div>';
        });
        html += '</div>';
      }

      // Section: Prescriptions / Rx
      var rxCats = doc.benefits.filter(function (b) {
        return b.category.toLowerCase().indexOf('prescription') !== -1;
      });
      if (rxCats.length) {
        html += '<div class="pv-section" style="margin-bottom:14px;">';
        html +=
          '<div style="font-family:var(--font-ui);font-size:13px;font-weight:700;color:#7C3AED;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Prescriptions / Rx</div>';
        rxCats.forEach(function (bcat) {
          bcat.items.forEach(function (item) {
            html +=
              '<div style="font-size:14px;color:var(--text-secondary);padding-left:12px;margin-bottom:2px;line-height:1.5;">&#8226; ' +
              item +
              '</div>';
          });
        });
        html += '</div>';
      }

      // Section: Waiting Periods + Pre-Existing
      html +=
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">';
      html +=
        '<div style="background:rgba(34,197,94,0.05);border:1.5px solid rgba(34,197,94,0.2);border-radius:12px;padding:12px 14px;">';
      html +=
        '<div style="font-family:var(--font-ui);font-size:12px;font-weight:700;color:#15803D;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Waiting Periods</div>';
      doc.waitingPeriods.forEach(function (w) {
        html +=
          '<div style="font-size:14px;color:var(--text-secondary);margin-bottom:2px;">' +
          w +
          '</div>';
      });
      html += '</div>';
      html +=
        '<div style="background:rgba(239,68,68,0.04);border:1.5px solid rgba(239,68,68,0.18);border-radius:12px;padding:12px 14px;">';
      html +=
        '<div style="font-family:var(--font-ui);font-size:12px;font-weight:700;color:#B91C1C;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Pre-Existing</div>';
      html +=
        '<div style="font-size:14px;color:var(--text-secondary);">' +
        doc.preEx +
        '</div>';
      html += '</div></div>';

      // Section: Preventive / MEC
      var prevCats = doc.benefits.filter(function (b) {
        var c = b.category.toLowerCase();
        return c.indexOf('preventive') !== -1 || c.indexOf('mec') !== -1;
      });
      if (prevCats.length) {
        html += '<div class="pv-section" style="margin-bottom:14px;">';
        html +=
          '<div style="font-family:var(--font-ui);font-size:13px;font-weight:700;color:#15803D;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Preventive / MEC</div>';
        prevCats.forEach(function (bcat) {
          bcat.items.forEach(function (item) {
            html +=
              '<div style="font-size:14px;color:var(--text-secondary);padding-left:12px;margin-bottom:2px;line-height:1.5;">&#8226; ' +
              item +
              '</div>';
          });
        });
        html += '</div>';
      }

      // Section: Exclusions
      if (doc.limitations.length) {
        html += '<div class="pv-section" style="margin-bottom:14px;">';
        html +=
          '<div onclick="togglePvSection(this)" style="font-family:var(--font-ui);font-size:13px;font-weight:700;color:#B91C1C;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;cursor:pointer;display:flex;align-items:center;gap:6px;">Exclusions <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg></div>';
        html += '<div class="pv-section-body">';
        doc.limitations.forEach(function (lim) {
          html +=
            '<div style="font-size:14px;color:var(--text-secondary);padding-left:12px;margin-bottom:2px;line-height:1.5;"><span style="color:#DC2626;">&#10005;</span> ' +
            lim +
            '</div>';
        });
        html += '</div></div>';
      }

      // Section: Sales Info (from PLANS data if matched)
      if (salesPlan) {
        html += '<div class="pv-section" style="margin-bottom:14px;">';
        html +=
          '<div onclick="togglePvSection(this)" style="font-family:var(--font-ui);font-size:13px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;cursor:pointer;display:flex;align-items:center;gap:6px;">Sales Framing & Fit Guide <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg></div>';
        html += '<div class="pv-section-body">';
        html +=
          '<div class="sbox" style="margin-bottom:10px;font-size:14px;">' +
          salesPlan.framing +
          '</div>';
        html +=
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">';
        html +=
          '<div style="background:rgba(41,162,106,0.05);border:1px solid rgba(41,162,106,0.2);border-radius:12px;padding:12px;"><div style="color:#29A26A;font-weight:700;font-size:11px;margin-bottom:6px;">BEST FIT WHEN...</div>';
        salesPlan.fitYes.forEach(function (f) {
          html +=
            '<div style="font-size:13px;color:var(--charcoal);margin-bottom:3px;">&#10003; ' +
            f +
            '</div>';
        });
        html += '</div>';
        html +=
          '<div style="background:rgba(200,60,80,0.05);border:1px solid rgba(200,60,80,0.15);border-radius:12px;padding:12px;"><div style="color:#B91C1C;font-weight:700;font-size:11px;margin-bottom:6px;">NOT A FIT WHEN...</div>';
        salesPlan.fitNo.forEach(function (f) {
          html +=
            '<div style="font-size:13px;color:var(--charcoal3);margin-bottom:3px;">&#10005; ' +
            f +
            '</div>';
        });
        html += '</div></div>';
        html +=
          '<div class="comp-banner" style="font-size:13px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> ' +
          salesPlan.compliance +
          '</div>';
        html += '</div></div>';
      }

      // Source
      html +=
        '<div style="font-size:12px;color:var(--text-muted);margin-top:6px;">Source: ' +
        doc.source +
        '</div>';
      html += '</div>'; // close pv-detail
      html += '</div>'; // close plan-card
    });
    html += '</div>';
  });
  wrap.innerHTML = html;
}

var _openPlanVault = null;
function togglePlanVault(id) {
  var detail = document.getElementById('pv-detail-' + id);
  var chev = document.getElementById('pv-chev-' + id);
  var card = document.getElementById('pv-' + id);
  if (!detail) return;
  var isOpen = detail.style.display !== 'none';
  // Close any other open card
  if (_openPlanVault && _openPlanVault !== id) {
    var prev = document.getElementById('pv-detail-' + _openPlanVault);
    var prevChev = document.getElementById('pv-chev-' + _openPlanVault);
    var prevCard = document.getElementById('pv-' + _openPlanVault);
    if (prev) prev.style.display = 'none';
    if (prevChev) {
      prevChev.style.transform = '';
      prevChev.setAttribute('stroke', '#999');
    }
    if (prevCard) prevCard.style.borderColor = '#C8CEDD';
  }
  if (isOpen) {
    detail.style.display = 'none';
    if (chev) {
      chev.style.transform = '';
      chev.setAttribute('stroke', '#999');
    }
    if (card) card.style.borderColor = '#C8CEDD';
    _openPlanVault = null;
  } else {
    detail.style.display = 'block';
    if (chev) {
      chev.style.transform = 'rotate(180deg)';
      chev.setAttribute('stroke', '#5B8DEF');
    }
    if (card) card.style.borderColor = '#5B8DEF';
    _openPlanVault = id;
    // Set sticky plan context
    if (
      typeof POLICY_DOCS !== 'undefined' &&
      typeof setActivePlan === 'function'
    ) {
      var doc = POLICY_DOCS.find(function (p) {
        return p.id === id;
      });
      if (doc) setActivePlan(doc.id, doc.name, doc.group || doc.type || '');
    }
    setTimeout(function () {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

function togglePvSection(header) {
  var body = header.nextElementSibling;
  var chev = header.querySelector('svg');
  if (!body) return;
  var isHidden = body.style.display === 'none';
  body.style.display = isHidden ? '' : 'none';
  if (chev) chev.style.transform = isHidden ? 'rotate(180deg)' : '';
}

function togglePlan(i) {
  toggleCard('pc' + i, 'plan-body');
}

function switchPlanTab(e, i, tab) {
  e.stopPropagation();
  var card = document.getElementById('pc' + i);
  card.querySelectorAll('.plan-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  card.querySelectorAll('.plan-section').forEach(function (s) {
    s.style.display = 'none';
    s.classList.remove('active');
  });
  e.target.classList.add('active');
  var sec = document.getElementById('pt' + i + '-' + tab);
  if (sec) {
    sec.style.display = 'block';
    sec.classList.add('active');
  }
}

// ══════════════════════════════════════════════════════
// RENDER: COMPARE
// ══════════════════════════════════════════════════════
var selPlans = [0, 5];
function renderCompare() {
  var html =
    '<div class="ph"><div class="pt">Compare <span>Plans</span></div><div class="pd">Select up to 3 plans to compare side by side.</div></div>';
  PLAN_GROUPS.forEach(function (grp) {
    var plans = PLANS.filter(function (p) {
      return p.group === grp.key;
    });
    html +=
      '<div style="margin-bottom:10px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--warmgray3);font-weight:700;margin-bottom:6px;">' +
      grp.label +
      '</div><div class="comp-sel">';
    plans.forEach(function (p) {
      var idx = PLANS.indexOf(p);
      html +=
        '<button class="comp-btn ' +
        (selPlans.indexOf(idx) > -1 ? 'sel' : '') +
        '" id="cb' +
        idx +
        '" onclick="toggleComp(' +
        idx +
        ')">' +
        p.name +
        '</button>';
    });
    html += '</div></div>';
  });
  html += '<div id="compTable"></div>';
  var _page_compare = document.getElementById('page-compare');
  if (_page_compare) _page_compare.innerHTML = html;
  buildCompTable();
}

function toggleComp(i) {
  var idx = selPlans.indexOf(i);
  if (idx > -1) {
    if (selPlans.length > 1) selPlans.splice(idx, 1);
  } else {
    if (selPlans.length >= 3) selPlans.shift();
    selPlans.push(i);
  }
  document.querySelectorAll('.comp-btn').forEach(function (b, bi) {
    b.classList.toggle(
      'sel',
      selPlans.indexOf(parseInt(b.id.replace('cb', ''))) > -1
    );
  });
  buildCompTable();
}

function buildCompTable() {
  var plans = selPlans.map(function (i) {
    return PLANS[i];
  });
  if (!plans.length) return;
  var rows = [
    { k: 'type', l: 'Plan Type' },
    { k: 'network', l: 'Network' },
    { k: 'admin', l: 'Administrator' },
    { k: 'assoc', l: 'Association' },
    { k: 'bestFor', l: 'Best For' },
    { k: 'notGood', l: 'Not Good For' },
    { k: 'idealClient', l: 'Ideal Client' }
  ];
  var html =
    '<div style="overflow-x:auto;"><table class="ctable"><thead><tr><th>Feature</th>';
  plans.forEach(function (p) {
    html += '<th>' + p.name + '</th>';
  });
  html += '</tr></thead><tbody>';
  rows.forEach(function (r) {
    html += '<tr><td>' + r.l + '</td>';
    plans.forEach(function (p) {
      html += '<td>' + (p[r.k] || '') + '</td>';
    });
    html += '</tr>';
  });
  html += '<tr><td>Top Benefits</td>';
  plans.forEach(function (p) {
    html +=
      '<td style="font-size:11px;">' +
      p.topPoints.slice(0, 4).join('<br>') +
      '</td>';
  });
  html += '</tr><tr><td>Main Limits</td>';
  plans.forEach(function (p) {
    html +=
      '<td style="font-size:11px;">' +
      p.limitations.slice(0, 4).join('<br>') +
      '</td>';
  });
  html += '</tr><tr><td>Best Fit ✓</td>';
  plans.forEach(function (p) {
    html +=
      '<td style="font-size:11px;color:#29A26A;">' +
      p.fitYes.slice(0, 3).join('<br>') +
      '</td>';
  });
  html += '</tr><tr><td>Bad Fit ✕</td>';
  plans.forEach(function (p) {
    html +=
      '<td style="font-size:11px;color:var(--charcoal3);">' +
      p.fitNo.slice(0, 3).join('<br>') +
      '</td>';
  });
  html += '</tr></tbody></table></div>';
  var _compTable = document.getElementById('compTable');
  if (_compTable) _compTable.innerHTML = html;
}

// ══════════════════════════════════════════════════════
// RENDER: NETWORK GUIDE
// ══════════════════════════════════════════════════════
function renderNetworkexplainer() {
  var networks = [
    {
      name: 'First Health Network',
      color: 'var(--charcoal3)',
      bg: 'rgba(212,96,122,0.07)',
      plans: [
        'MedFirst 1–5',
        'TrueHealth 1–3',
        'GoodHealth 1–5',
        'TDK 1–5',
        'SmartChoice (EPO — in-network only)',
        'HarmonyCare / SigmaCare'
      ],
      website: 'providerlocator.firsthealth.com',
      warning:
        'SmartChoice is EPO — the member MUST use in-network providers. No out-of-network coverage at all. Always verify their doctor is in this network before enrolling.',
      howto:
        'Go to providerlocator.firsthealth.com → enter zip code → search by doctor name or specialty'
    },
    {
      name: 'PHCS Network (MultiPlan)',
      color: 'var(--sec)',
      bg: 'rgba(123,104,184,0.07)',
      plans: [
        'Pinnacle STM',
        'Access Health STM',
        'Smart Health STM',
        'BWA Americare 2–4'
      ],
      website: 'providersearch.multiplan.com',
      warning: '',
      howto:
        'Go to providersearch.multiplan.com → select PHCS Practitioner & Ancillary → enter zip code'
    },
    {
      name: 'MultiPlan Network',
      color: '#29A26A',
      bg: 'rgba(41,162,106,0.07)',
      plans: [
        'Galena STM Elite',
        'Everest Summit Plans',
        'HealthChoice Silver'
      ],
      website: 'providersearch.multiplan.com',
      warning: '',
      howto:
        'Go to providersearch.multiplan.com → select MultiPlan → enter zip code'
    },
    {
      name: 'Managed Care Network',
      color: '#7a5f00',
      bg: 'rgba(184,134,11,0.07)',
      plans: ['BWA Paramount 1–6'],
      website: 'Contact carrier for provider lookup',
      warning: '',
      howto:
        "Contact the carrier directly to verify in-network providers in the member's area before enrolling"
    }
  ];

  var html = '<div class="ph"><div class="pt">Network <span>Guide</span></div>';
  html +=
    '<div class="pd">Which plans use which network, how to find providers, and what to watch out for.</div></div>';

  // Simple how billing works — no scripts
  html +=
    '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;padding:20px;margin-bottom:20px;">';
  html +=
    '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal3);margin-bottom:14px;">How It Works — Simple Version</div>';
  html += '<div style="display:flex;flex-direction:column;gap:10px;">';
  var steps = [
    {
      n: '1',
      label: 'Member visits an in-network doctor',
      color: 'var(--charcoal3)',
      bg: 'rgba(212,96,122,0.07)'
    },
    {
      n: '2',
      label: "Network reduces the doctor's bill to the contracted rate",
      color: '#7a5f00',
      bg: 'rgba(184,134,11,0.07)'
    },
    {
      n: '3',
      label: 'Plan benefit applies — member pays their copay',
      color: '#29A26A',
      bg: 'rgba(41,162,106,0.07)'
    },
    {
      n: '4',
      label: 'Member pays any remaining balance (if applicable)',
      color: 'var(--sec)',
      bg: 'rgba(123,104,184,0.07)'
    }
  ];
  steps.forEach(function (s) {
    html +=
      '<div style="display:flex;align-items:center;gap:12px;background:' +
      s.bg +
      ';border-radius:12px;padding:12px 16px;">';
    html +=
      '<div style="width:28px;height:28px;border-radius:50%;background:' +
      s.color +
      '22;border:2px solid ' +
      s.color +
      '55;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;color:' +
      s.color +
      ';flex-shrink:0;">' +
      s.n +
      '</div>';
    html +=
      '<div style="font-size:13px;color:var(--charcoal3);font-weight:600;">' +
      s.label +
      '</div></div>';
  });
  html +=
    '<div style="background:rgba(200,60,80,0.05);border:1px solid rgba(200,60,80,0.15);border-radius:12px;padding:12px 16px;font-size:12px;color:var(--charcoal3);margin-top:4px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> <strong>Important:</strong> On indemnity/limited benefit plans, the plan pays a fixed daily or per-visit amount — not a percentage of the bill. The member is responsible for any difference between the benefit and the actual charge.</div>';
  html += '</div></div>';

  // Network cards
  networks.forEach(function (n) {
    html +=
      '<div style="background:' +
      n.bg +
      ';border:1.5px solid ' +
      n.color +
      '33;border-radius:12px;padding:20px;margin-bottom:12px;">';

    // Name + plans
    html +=
      '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal3);margin-bottom:10px;">' +
      n.name +
      '</div>';
    html +=
      '<div style="font-size:11px;font-weight:800;letter-spacing:1.5px;color:var(--warmgray3);margin-bottom:6px;">PLANS ON THIS NETWORK</div>';
    html +=
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">';
    n.plans.forEach(function (p) {
      html +=
        '<span style="background:#FFFFFF;border:1px solid ' +
        n.color +
        '44;border-radius:12px;padding:4px 12px;font-size:12px;color:' +
        n.color +
        ';font-weight:700;">' +
        p +
        '</span>';
    });
    html += '</div>';

    // Provider search
    html +=
      '<div style="background:#FFFFFF;border-radius:12px;padding:12px 14px;margin-bottom:8px;">';
    html +=
      '<div style="font-size:11px;font-weight:800;letter-spacing:1.5px;color:var(--warmgray3);margin-bottom:4px;">HOW TO FIND A PROVIDER</div>';
    html +=
      '<div style="font-size:13px;color:var(--charcoal3);">' +
      n.howto +
      '</div>';
    if (n.website !== 'Contact carrier for provider lookup') {
      html +=
        '<a href="https://' +
        n.website +
        '" target="_blank" style="display:inline-block;margin-top:8px;background:rgba(212,96,122,0.1);color:var(--charcoal3);border:1px solid rgba(212,96,122,0.25);border-radius:12px;padding:5px 14px;font-size:12px;font-weight:700;text-decoration:none;">Open ' +
        n.website +
        ' →</a>';
    }
    html += '</div>';

    // Warning
    if (n.warning)
      html +=
        '<div style="background:rgba(200,60,80,0.05);border:1px solid rgba(200,60,80,0.15);border-radius:12px;padding:10px 14px;font-size:12px;color:var(--charcoal3);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> ' +
        n.warning +
        '</div>';

    html += '</div>';
  });

  var _page_networkexplainer = document.getElementById('page-networkexplainer');
  if (_page_networkexplainer) _page_networkexplainer.innerHTML = html;
}
