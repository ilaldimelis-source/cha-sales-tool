// plans-benefits.js — Plans & Benefits tab + Network Guide

const BENEFITS = [
  {
    icon: 'hospital',
    name: 'Hospitalization (Indemnity Benefit)',
    hint: 'Varies by plan type',
    howItWorks:
      'How hospital benefits pay out depends entirely on the plan type. Some pay cash directly to you, others cover through insurance mechanics.',
    byPlan: [
      {
        type: 'MEC',
        desc: '$500-$1,500/day indemnity paid to you, not the hospital'
      },
      {
        type: 'BWA',
        desc: 'Fixed daily benefit + MBR repricing on remaining bills'
      },
      { type: 'STM', desc: 'Deductible + coinsurance (80/20 or 50/50)' },
      {
        type: 'Limited',
        desc: 'Fixed daily cash benefit ($100-$1,000/day)'
      }
    ],
    sayThis:
      '"If you are admitted to the hospital, your plan provides financial support to help cover costs. The exact benefit depends on your specific plan."',
    neverSay:
      'Don\'t say the plan "covers" hospitalization fully. MEC and Limited plans pay a set amount — they don\'t cover the entire bill. Don\'t compare to major medical.',
    ifTheyAsk:
      '"What if my hospital bill is more than what the plan pays?" → "The plan pays its stated benefit. For remaining balances, advocacy services like MyHealthcare Ninja can help negotiate and reduce bills."',
    official:
      'A fixed daily hospital benefit paid directly to the insured when admitted to the hospital. Example: $1,000/day up to $10,000 annual max depending on tier.',
    simple:
      'Hospital benefits work differently by plan — MEC pays a daily cash amount to you, STM covers through deductible and coinsurance, and limited plans pay a fixed daily benefit.',
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
    hint: 'Copay, pre-pay, or fixed benefit',
    howItWorks:
      'How you pay for doctor visits depends on the plan. All plans have visit limits per year and require in-network providers for best rates.',
    byPlan: [
      { type: 'MEC', desc: '$25-$75 copay per visit, 3-5 visits/year' },
      {
        type: 'BWA',
        desc: '$25 pre-pay PCP, $50 specialist — MBR reprices the rest'
      },
      { type: 'STM', desc: '$25-$50 copay for limited visits, then deductible' },
      {
        type: 'Limited',
        desc: 'Fixed dollar amount per visit (e.g. $50/visit)'
      }
    ],
    sayThis:
      '"You see a doctor for a low, predictable cost — always less than paying out of pocket. The exact amount depends on your plan."',
    neverSay:
      'Don\'t say "copay" for BWA plans — they use pre-pays with MBR repricing, not traditional copays. Don\'t promise unlimited visits — all plans have annual limits.',
    ifTheyAsk:
      '"How many visits do I get?" → "Your plan includes a set number of visits per year at the reduced rate. I can look up the exact number for your specific plan."',
    official:
      'Covered primary care physician visits with a flat copay and annual visit limit. Example (TrueHealth 2): PCP $25 copay, Specialist $50 copay, limited visits per year.',
    simple:
      'How you pay for doctor visits depends on your plan — some use copays, others use pre-pays with bill repricing, and some pay a fixed benefit amount per visit.',
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
    hint: 'Not the ER — visit limits apply',
    howItWorks:
      'Same-day care for non-emergency situations. Faster and cheaper than the ER. All plans have visit limits.',
    byPlan: [
      { type: 'MEC', desc: '$75 copay (same tier as specialist)' },
      { type: 'BWA', desc: '$25 pre-pay, remaining bills repriced by MBR' },
      { type: 'STM', desc: '$25-$60 copay with visit limits' },
      { type: 'Limited', desc: 'Fixed benefit amount per visit' }
    ],
    sayThis:
      '"For non-emergency situations, urgent care gets you seen the same day at a fraction of the ER cost."',
    neverSay:
      'Don\'t say urgent care and the ER are the same benefit. Don\'t say urgent care is for emergencies — it\'s for non-life-threatening situations only.',
    ifTheyAsk:
      '"What\'s the difference between urgent care and the ER?" → "Urgent care handles same-day non-emergencies like infections, sprains, or flu. The ER is for life-threatening situations like chest pain or severe injury."',
    official:
      'Covered urgent care visits with a flat copay and visit limit. Example structure: $40–$75 copay, visit limit depending on plan tier.',
    simple:
      'Same-day care for non-emergencies. Costs vary by plan type — copay, pre-pay, or fixed benefit depending on the plan.',
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
    hint: '$0 consult, unlimited, 24/7',
    howItWorks:
      '$0 virtual doctor consultations available 24/7 on most plans. No visit limits. Available by phone or video.',
    byPlan: [
      { type: 'MEC', desc: '$0 via Opyn — unlimited visits' },
      { type: 'BWA', desc: '$0 telemedicine included' },
      { type: 'STM', desc: 'Varies — check plan details' },
      { type: 'Limited', desc: 'May include telemedicine benefit' }
    ],
    sayThis:
      '"You can talk to a doctor 24/7 from your phone for $0. No appointment needed, no visit limits."',
    neverSay:
      'Don\'t say telemedicine replaces in-person care. Don\'t say it handles emergencies — it\'s for consultations only.',
    ifTheyAsk:
      '"Can I get prescriptions through telemedicine?" → "Yes, the doctor can prescribe medications during a virtual visit when appropriate."',
    official:
      '24/7 virtual doctor access with $0 consultation fee. Many plans use services like MyLiveDoc or similar telehealth providers.',
    simple:
      'Talk to a doctor by phone or video for $0. Available 24/7 on most plans with no visit limits.',
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
    hint: 'Varies — some plans exclude Rx',
    howItWorks:
      'Rx benefits vary significantly between plan types. MEC plans have the most comprehensive coverage. Most STM plans do not include Rx.',
    byPlan: [
      {
        type: 'MEC',
        desc: 'Preventive generic $0, preferred $5, $150/mo limit on non-preventive'
      },
      { type: 'BWA', desc: 'Rx discount program included' },
      {
        type: 'STM',
        desc: 'Usually NOT covered — except Galena (ReviveHealth)'
      },
      { type: 'Limited', desc: 'Rx discount program or not covered' }
    ],
    sayThis:
      '"Your plan includes prescription benefits to help reduce medication costs. The specifics depend on your plan tier."',
    neverSay:
      'Don\'t say all plans cover prescriptions — most STM plans do NOT include Rx. Don\'t say medications are free — even MEC plans have a $150/month limit on non-preventive drugs.',
    ifTheyAsk:
      '"Are my medications covered?" → "That depends on the specific medication and your plan. Preventive generics are typically $0 on MEC plans. I can help you check the formulary for your specific medication."',
    official:
      'Coverage for generic medications through formulary pricing or discount programs. Example: Generic $0–$5 copay. Specialty drugs typically not covered, but assistance programs may exist.',
    simple:
      'Prescription benefits vary significantly. MEC plans cover preventive generics at $0 with a $150/month limit on non-preventive drugs. Most STM plans do not include Rx coverage.',
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
    hint: '12/12 rule — must disclose',
    howItWorks:
      'Most plans have a 12/12 pre-existing condition clause. Anything diagnosed or treated in the last 12 months has a 12-month waiting period before benefits apply.',
    byPlan: [
      { type: 'MEC', desc: '12/12 month pre-ex on hospital benefits' },
      { type: 'BWA', desc: '12/12 month pre-ex clause' },
      { type: 'STM', desc: 'Pre-ex excluded entirely or 12/12 rule' },
      { type: 'Limited', desc: '12/12 month pre-ex typical' }
    ],
    sayThis:
      '"I want to be upfront — any condition diagnosed in the past 12 months would have a 12-month waiting period before hospital benefits apply."',
    neverSay:
      'Never skip the pre-ex disclosure. Never say pre-existing conditions are "covered" without explaining the waiting period. This is a compliance requirement.',
    ifTheyAsk:
      '"So my diabetes won\'t be covered?" → "Hospital benefits related to a pre-existing condition would have a 12-month waiting period. Your doctor visits, telemedicine, and prescriptions are not affected by the pre-ex clause."',
    official:
      'Conditions diagnosed or treated in the 12 months before the policy effective date are excluded for the first 12 months of the plan.',
    simple:
      'Anything diagnosed in the last 12 months typically has a 12-month waiting period before benefits apply. This must always be disclosed.',
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
    hint: '30-day sickness, injury immediate',
    howItWorks:
      'Standard 30-day waiting period for sickness benefits and scheduled doctor visits. Injuries are typically covered immediately from day one.',
    byPlan: [
      { type: 'All plans', desc: '30-day wait for sickness and scheduled visits' },
      { type: 'All plans', desc: 'Injuries covered immediately' }
    ],
    sayThis:
      '"There is a standard 30-day waiting period for sickness-related benefits. However, if you have an injury, you are covered from day one."',
    neverSay:
      'Don\'t say there are no waiting periods. Don\'t say coverage starts immediately for everything — only injuries are immediate.',
    ifTheyAsk:
      '"Why is there a waiting period?" → "The 30-day waiting period is standard across these plans. It prevents someone from signing up only when they are already sick, which keeps premiums lower for everyone."',
    official:
      'A defined period before certain benefits activate. STM example: Accidents → day one. Sickness → 5-day wait. Cancer → 30-day wait. MEC example: Sickness → 30-day wait.',
    simple:
      'Most plans have a 30-day waiting period for sickness benefits. Injuries are typically covered immediately. Scheduled doctor visits also have a 30-day wait.',
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
    hint: 'PPO — verify before visiting',
    howItWorks:
      'All plans use PPO networks for doctor visits and outpatient services. Using in-network providers means lower costs. Always verify before visiting.',
    byPlan: [
      { type: 'MEC', desc: 'First Health PPO network' },
      { type: 'BWA', desc: 'PHCS PPO network + MBR repricing' },
      { type: 'STM', desc: 'PHCS or plan-specific PPO network' },
      { type: 'Limited', desc: 'Varies — check plan documents' }
    ],
    sayThis:
      '"Your plan uses a PPO network, which means you have a large selection of doctors to choose from. Always verify your doctor is in-network before your visit."',
    neverSay:
      'Don\'t say members can see any doctor they want without consequences. Out-of-network visits may not be covered or may cost significantly more.',
    ifTheyAsk:
      '"How do I find a doctor?" → "You can search for in-network providers on the network website, or call the number on your insurance card for help finding a provider near you."',
    official:
      'Healthcare providers contracted at pre-negotiated rates. Networks used in this portfolio: First Health, PHCS (MultiPlan), MultiPlan, and Managed Care.',
    simple:
      'All plans use PPO networks. Staying in-network means lower costs. Members should always verify their provider is in-network before visiting.',
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
    hint: 'Optional extras on base plan',
    howItWorks:
      'Optional supplemental products that stack on top of the base plan. Each add-on has its own premium, terms, and claims process.',
    byPlan: [
      { type: 'Dental/Vision', desc: 'Ameritas plans — separate premium' },
      { type: 'Accident', desc: 'Compass VAB — 70% commission' },
      { type: 'Rx Discount', desc: 'RxSavers or Recuro — flat $10 commission' },
      { type: 'GAP/Critical', desc: 'Additional financial protection layers' }
    ],
    sayThis:
      '"These optional add-ons give you extra layers of protection. Each one is separate from your base plan and has its own benefits."',
    neverSay:
      'Don\'t present add-ons before the base plan is confirmed. Don\'t say add-ons are required — they are always optional.',
    ifTheyAsk:
      '"Do I need the add-ons?" → "They are completely optional. I recommend them because they fill gaps that the base plan doesn\'t cover, but the choice is always yours."',
    official:
      'Optional supplemental benefits added to the base plan for additional premium. Options: Critical illness, Accident coverage, Dental, Vision, Hospital gap.',
    simple:
      'Optional extras stack on the base plan — each add-on has its own premium, terms, and claims path. Present only after the base plan is confirmed.',
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

window._toggleBenefitCard = function (id) {
  var card = document.getElementById(id);
  if (!card) return;
  card.classList.toggle('expanded');
  var tog = card.querySelector('.bc-toggle');
  if (tog)
    tog.textContent = card.classList.contains('expanded')
      ? String.fromCharCode(8722)
      : '+';
};

function renderBenefits() {
  // Categorize benefits by index into the BENEFITS array
  var categories = [
    {
      label: 'Core Benefits',
      desc: 'The main coverage features agents explain on every call',
      color: 'var(--accent)',
      indices: [0, 1, 2, 3, 8]
    },
    {
      label: 'Rx & Pharmacy',
      desc: 'Prescription drug coverage and discount programs',
      color: '#7C3AED',
      indices: [4]
    },
    {
      label: 'Rules & Limitations',
      desc: 'Pre-existing conditions, waiting periods, and network rules every agent must disclose',
      color: '#d97706',
      indices: [5, 6, 7]
    }
  ];

  var html =
    '<div class="ph"><div class="pt">Benefit <span>Explainer</span></div><div class="pd">Plain English + sales framing for every benefit. Search or browse by category to learn what each benefit means, how to explain it, and what never to say.</div></div>';

  // Search bar
  html += '<div style="position:relative;margin-bottom:22px;">';
  html +=
    '<svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);pointer-events:none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  html +=
    '<input type="text" id="benefitSearchInput" placeholder="Search benefits — e.g. copay, pre-existing, telemedicine..." oninput="_filterBenefitCards(this.value)" style="width:100%;height:44px;border-radius:999px;border:1.5px solid #E5E7EB;padding:0 40px 0 44px;font-size:14px;font-family:var(--font-body);background:#F8F9FE;color:var(--text-primary);outline:none;transition:border-color 0.15s;" onfocus="this.style.borderColor=\'#5B8DEF\'" onblur="this.style.borderColor=\'#E5E7EB\'" />';
  html +=
    '<button id="benefitSearchClear" onclick="_clearBenefitSearch()" style="display:none;position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9CA3AF;font-size:18px;line-height:1;padding:4px;">&times;</button>';
  html += '</div>';
  html +=
    '<div id="benefitNoResults" style="display:none;text-align:center;padding:24px 0;color:var(--text-secondary);font-size:14px;">No benefits match your search.</div>';

  // Render each category
  categories.forEach(function (cat) {
    html += '<div class="benefit-cat-section" style="margin-bottom:28px;">';
    // Section header
    html +=
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">';
    html +=
      '<div style="width:4px;height:22px;border-radius:2px;background:' +
      cat.color +
      ';flex-shrink:0;"></div>';
    html +=
      '<div><div style="font-family:var(--font-ui);font-size:16px;font-weight:700;color:var(--text-primary);">' +
      cat.label +
      '</div>';
    html +=
      '<div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">' +
      cat.desc +
      '</div></div>';
    html += '</div>';

    html += '<div class="benefit-cards-wrap">';
    cat.indices.forEach(function (i) {
      var b = BENEFITS[i];
      var cardId = 'bx' + i;
      var searchBits = [
        b.name,
        b.hint || '',
        b.simple || '',
        b.official || '',
        b.frame || '',
        b.misunderstand || '',
        b.notsay || '',
        b.followup || '',
        b.bridge || '',
        b.howItWorks || '',
        b.sayThis || '',
        b.neverSay || '',
        b.ifTheyAsk || ''
      ];
      if (b.byPlan) {
        for (var si = 0; si < b.byPlan.length; si++) {
          searchBits.push(b.byPlan[si].type + ' ' + b.byPlan[si].desc);
        }
      }
      var searchData = escHTML(searchBits.join(' ').toLowerCase());
      html +=
        '<div class="benefit-card benefit-card-item" id="' +
        cardId +
        '" data-benefit-search="' +
        searchData +
        '" onclick="_toggleBenefitCard(\'' +
        cardId +
        '\')">';
      html += '<div class="bc-row">';
      html += '<div class="bc-row-left">';
      html +=
        '<div class="bc-dot" style="background:' + cat.color + '"></div>';
      html += '<div>';
      html += '<div class="bc-name">' + b.name + '</div>';
      html += '<div class="bc-hint">' + (b.hint || '') + '</div>';
      html += '</div></div>';
      html += '<span class="bc-toggle">+</span>';
      html += '</div>';
      html += '<div class="bc-detail">';
      html += '<div class="bc-grid">';
      html += '<div class="bc-box bc-box-blue">';
      html += '<div class="bc-box-lbl bc-lbl-blue">How it works</div>';
      html += '<div class="bc-box-txt">' + b.howItWorks + '</div>';
      html += '</div>';
      html += '<div class="bc-box bc-box-amber">';
      html += '<div class="bc-box-lbl bc-lbl-amber">By plan type</div>';
      if (b.byPlan) {
        for (var pi = 0; pi < b.byPlan.length; pi++) {
          html += '<div class="bc-plan-row">';
          html +=
            '<span class="bc-plan-type">' + b.byPlan[pi].type + '</span>';
          html +=
            '<span class="bc-plan-desc">' + b.byPlan[pi].desc + '</span>';
          html += '</div>';
        }
      }
      html += '</div>';
      html += '<div class="bc-box bc-box-green bc-full">';
      html += '<div class="bc-box-lbl bc-lbl-green">Say this</div>';
      html += '<div class="bc-box-txt">' + b.sayThis + '</div>';
      html += '</div>';
      html += '<div class="bc-box bc-box-red bc-full">';
      html += '<div class="bc-box-lbl bc-lbl-red">Never say</div>';
      html += '<div class="bc-box-txt">' + b.neverSay + '</div>';
      html += '</div>';
      if (b.ifTheyAsk) {
        html += '<div class="bc-box bc-box-blue-light bc-full">';
        html += '<div class="bc-box-lbl bc-lbl-blue">If they ask</div>';
        html += '<div class="bc-box-txt">' + b.ifTheyAsk + '</div>';
        html += '</div>';
      }
      html += '</div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '</div>'; // close category section
  });

  var _page_benefits = document.getElementById('page-benefits');
  if (_page_benefits) _page_benefits.innerHTML = html;
}

function _filterBenefitCards(query) {
  var q = (query || '').toLowerCase().trim();
  var clearBtn = document.getElementById('benefitSearchClear');
  var noResults = document.getElementById('benefitNoResults');
  if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
  var cards = document.querySelectorAll('.benefit-card-item');
  var visibleCount = 0;
  cards.forEach(function (card) {
    if (!q) {
      card.style.display = '';
      visibleCount++;
      return;
    }
    var searchStr =
      (card.getAttribute('data-benefit-search') || '') +
      ' ' +
      card.textContent.toLowerCase();
    var match = searchStr.indexOf(q) !== -1;
    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });
  // Show/hide category sections that have no visible cards
  document.querySelectorAll('.benefit-cat-section').forEach(function (sec) {
    var vis = 0;
    sec.querySelectorAll('.benefit-card-item').forEach(function (c) {
      if (c.style.display !== 'none') vis++;
    });
    sec.style.display = q && vis === 0 ? 'none' : '';
  });
  if (noResults)
    noResults.style.display = q && visibleCount === 0 ? 'block' : 'none';
}

function _clearBenefitSearch() {
  var input = document.getElementById('benefitSearchInput');
  if (input) {
    input.value = '';
    _filterBenefitCards('');
    input.focus();
  }
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

function isDisplayablePlanDoc(plan) {
  if (!plan) return false;
  var id = String(plan.id || '').toLowerCase();
  var type = String(plan.type || '').toLowerCase();
  var carrier = String(plan.carrier || '').trim();
  var network = String(plan.network || '').trim();
  if (!String(plan.name || '').trim()) return false;
  if (id.indexOf('kb-') === 0) return false;
  if (type === 'knowledge base pdf') return false;
  if (carrier === '—' && network === '—') return false;
  return true;
}

function renderPlans() {
  var html =
    '<div class="ph">' +
    '<div class="pt">Plan <span>Vault</span></div>' +
    '<div class="pd">Find the right plan for every client.</div>' +
    '</div>';

  // P3 Task 10: Sticky filter bar — wraps the tab pills and search
  // input so they stay visible while scrolling through plan cards.
  html += '<div class="plans-filter-bar">';

  // ── Pill Tabs ──
  var tabDefs = [
    { key: 'All', label: 'All', color: 'var(--text-primary)' },
    { key: 'MEC', label: 'MEC', color: '#22c55e' },
    { key: 'STM', label: 'STM', color: '#5B8DEF' },
    { key: 'Limited', label: 'Limited', color: '#7C3AED' }
  ];
  html += '<div style="display:flex;gap:8px;margin-bottom:16px;">';
  tabDefs.forEach(function (t) {
    var isActive = t.key === activePlanGroup;
    html +=
      '<button onclick="setPlanGroup(\'' +
      t.key +
      '\')" style="padding:9px 22px;border-radius:999px;font-family:var(--font-ui);font-size:14px;font-weight:600;cursor:pointer;transition:all 0.15s;border:2px solid ' +
      (isActive ? t.color : '#E5E7EB') +
      ';background:' +
      (isActive ? t.color : '#fff') +
      ';color:' +
      (isActive ? '#fff' : 'var(--text-secondary)') +
      ';">' +
      t.label +
      '</button>';
  });
  html += '</div>';

  // ── Search Bar ──
  html +=
    '<div id="planSearchWrap" style="position:relative;margin-bottom:16px;">';
  html +=
    '<svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);pointer-events:none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  html +=
    '<input type="text" id="planSearchInput" placeholder="Search by plan name, benefit, or coverage type..." oninput="filterPlanSearch(this.value)" style="width:100%;height:44px;border-radius:999px;border:1.5px solid #E5E7EB;padding:0 40px 0 44px;font-size:14px;font-family:var(--font-body);background:#F8F9FE;color:var(--text-primary);outline:none;transition:border-color 0.15s;" onfocus="this.style.borderColor=\'#5B8DEF\'" onblur="this.style.borderColor=\'#E5E7EB\'" />';
  html +=
    '<button id="planSearchClear" onclick="clearPlanSearch()" style="display:none;position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9CA3AF;font-size:18px;line-height:1;padding:4px;">&times;</button>';
  html += '</div>';
  html += '</div>'; // close .plans-filter-bar
  html +=
    '<div id="planNoResults" style="display:none;text-align:center;padding:24px 0;color:var(--text-secondary);font-size:14px;">No plans match your search.</div>';
  html += '<div id="planGroupsWrap"></div>';

  // P3 Task 11: Plan detail drawer — slide-in panel replacing the
  // old inline expand pattern. Skeleton is injected once per render;
  // openPlanDrawer() populates it from the (hidden) inline pv-detail.
  html +=
    '<div id="plan-drawer-overlay" class="plan-drawer-overlay" onclick="closePlanDrawer()"></div>';
  html +=
    '<div id="plan-drawer" class="plan-drawer" role="dialog" aria-modal="true" aria-labelledby="plan-drawer-title" aria-hidden="true">' +
    '<div class="plan-drawer-header">' +
    '<div id="plan-drawer-title" class="plan-drawer-title"></div>' +
    '<button type="button" class="plan-drawer-close" aria-label="Close plan details" onclick="closePlanDrawer()">&times;</button>' +
    '</div>' +
    '<div id="plan-drawer-body" class="plan-drawer-body"></div>' +
    '</div>';
  var _page_plans =
    document.getElementById('allplans-vault') ||
    document.getElementById('page-plans');
  if (_page_plans) _page_plans.innerHTML = html;
  renderPlanGroups();
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
  renderPlans();
}

function _toggleVaultPlanGroup(ev) {
  var row = ev && ev.currentTarget;
  if (!row || !row.classList || !row.classList.contains('plan-group-row')) return;
  var t = ev.target;
  if (t && t.closest && (t.closest('button') || t.closest('a') || t.closest('.plan-card')))
    return;
  row.classList.toggle('expanded');
  var ind = row.querySelector('.plan-group-expand-ind');
  if (ind) ind.textContent = row.classList.contains('expanded') ? '\u2212' : '+';
}

function renderPlanGroups() {
  var wrap = document.getElementById('planGroupsWrap');
  if (!wrap) return;

  var groupDefs = [
    {
      key: 'MEC',
      label: 'MEC Plans',
      desc: 'Minimum Essential Coverage',
      borderColor: '#22c55e'
    },
    {
      key: 'STM',
      label: 'Short-Term Medical',
      desc: 'Temporary bridge coverage',
      borderColor: '#5B8DEF'
    },
    {
      key: 'Limited',
      label: 'Limited Benefit Plans',
      desc: 'Fixed indemnity',
      borderColor: '#7C3AED'
    }
  ];
  var showGroups =
    activePlanGroup === 'All'
      ? groupDefs
      : groupDefs.filter(function (g) {
          return g.key === activePlanGroup;
        });

  // Simple divider
  var _divider = function (label) {
    return (
      '<div style="font-family:var(--font-ui);font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.08em;margin:14px 0 8px;padding-top:12px;border-top:1px solid #E5E7EB;">' +
      label +
      '</div>'
    );
  };

  var html = '';
  showGroups.forEach(function (grp) {
    var docs = POLICY_DOCS.filter(function (p) {
      return p.group === grp.key && isDisplayablePlanDoc(p);
    });
    if (!docs.length) return;

    html +=
      '<div class="plan-group-row" data-plan-group="' +
      grp.key +
      '" onclick="_toggleVaultPlanGroup(event)">';
    html +=
      '<div class="plan-group-header">' +
      '<div style="flex:1;min-width:0;">' +
      '<div class="plan-group-name">' +
      grp.label +
      '</div>' +
      '<div class="plan-group-oneliner">' +
      grp.desc +
      '</div>' +
      '</div>' +
      '<span class="plan-type-badge">' +
      grp.key +
      '</span>' +
      '<span class="plan-group-expand-ind benefit-expand-indicator" aria-hidden="true">+</span>' +
      '</div>';
    html += '<div class="plan-group-detail">';

    docs.forEach(function (doc) {
      var badgeBg =
        grp.key === 'MEC'
          ? 'rgba(34,197,94,0.10)'
          : grp.key === 'STM'
            ? 'rgba(91,141,239,0.10)'
            : 'rgba(124,58,237,0.10)';
      var badgeColor =
        grp.key === 'MEC'
          ? '#22c55e'
          : grp.key === 'STM'
            ? '#5B8DEF'
            : '#7C3AED';

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
        '" style="border-left:4px solid ' +
        grp.borderColor +
        ';margin-bottom:8px;">';

      // ── COLLAPSED: header row only ──
      html +=
        '<div style="padding:14px 18px;display:flex;align-items:center;gap:10px;">';
      // Name
      html +=
        '<div style="flex:1;min-width:0;">' +
        '<div style="font-family:var(--font-ui);font-size:15px;font-weight:700;color:var(--text-primary);line-height:1.3;">' +
        doc.name +
        '</div>';
      html += '</div>';
      // Type pill
      html +=
        '<span style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:' +
        badgeBg +
        ';color:' +
        badgeColor +
        ';white-space:nowrap;flex-shrink:0;">' +
        grp.key +
        '</span>';
      // View Details button
      html +=
        '<button id="pv-toggle-' +
        doc.id +
        '" onclick="openPlanDrawer(\'' +
        doc.id +
        '\')" style="padding:6px 14px;border-radius:8px;font-family:var(--font-ui);font-size:12px;font-weight:600;color:var(--accent);background:rgba(91,141,239,0.08);border:1px solid rgba(91,141,239,0.2);cursor:pointer;white-space:nowrap;display:flex;align-items:center;gap:4px;flex-shrink:0;">' +
        '<span class="pv-toggle-text">View Details</span>' +
        '<svg class="pv-chev" id="pv-chev-' +
        doc.id +
        '" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s;"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</button>';
      html += '</div>';

      // ── EXPANDED: flat sections ──
      html +=
        '<div class="pv-detail" id="pv-detail-' +
        doc.id +
        '" style="display:none;border-top:1px solid #E5E7EB;padding:14px 18px;">';

      // Meta badges
      html +=
        '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">';
      html +=
        '<span style="font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:rgba(46,125,82,0.08);color:#2E7D52;border:1px solid rgba(46,125,82,0.15);">' +
        doc.network +
        '</span>';
      html +=
        '<span style="font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:rgba(92,104,120,0.07);color:#5C6878;border:1px solid rgba(92,104,120,0.14);">' +
        doc.carrier +
        '</span>';
      if (doc.assoc)
        html +=
          '<span style="font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:rgba(196,150,10,0.08);color:#A07A06;border:1px solid rgba(196,150,10,0.15);">' +
          doc.assoc +
          '</span>';
      html += '</div>';

      // Coverage highlights (max 5)
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
      if (topBullets.length) {
        html += _divider('Coverage Highlights');
        topBullets.forEach(function (b) {
          html +=
            '<div style="font-size:13px;color:var(--text-secondary);padding-left:8px;margin-bottom:2px;line-height:1.5;">&#8226; ' +
            b +
            '</div>';
        });
      }

      // Rx Coverage
      var rxItems = [];
      doc.benefits.forEach(function (bcat) {
        if (bcat.category.toLowerCase().indexOf('prescription') !== -1) {
          bcat.items.forEach(function (item) {
            rxItems.push(item);
          });
        }
      });
      if (rxItems.length) {
        html += _divider('Rx Coverage');
        rxItems.forEach(function (item) {
          html +=
            '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' +
            item +
            '</div>';
        });
      }

      // Waiting Periods
      html += _divider('Waiting Periods');
      doc.waitingPeriods.forEach(function (w) {
        html +=
          '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' +
          w +
          '</div>';
      });

      // Pre-Ex Rules
      html += _divider('Pre-Ex Rules');
      html +=
        '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' +
        doc.preEx +
        '</div>';

      // Exclusions — flat list, no collapsible
      if (doc.limitations.length) {
        html += _divider('Exclusions');
        doc.limitations.forEach(function (lim) {
          html +=
            '<div style="font-size:13px;color:var(--text-secondary);padding-left:8px;margin-bottom:2px;line-height:1.5;"><span style="color:#DC2626;">&#10005;</span> ' +
            lim +
            '</div>';
        });
      }

      // Sales framing / fit / script compliance → Live Call → Rebuttals
      // (Plan Vault cards stay data-only: benefits, limits, carrier facts.)
      html += _divider('Agent scripts');
      html +=
        '<div style="font-size:13px;color:var(--text-secondary);line-height:1.55;padding:10px 12px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">' +
        'Framing, best-fit / not-a-fit, and delivery notes for this plan family live under ' +
        '<strong>Live Call → Rebuttals</strong> (Plan fit &amp; framing section).</div>';

      // Source (canonical file lives under /knowledge_base only)
      html +=
        '<div style="font-size:11px;color:var(--text-muted);margin-top:12px;padding-top:8px;border-top:1px solid #E5E7EB;">Source: <a href="' +
        escHTML(chaKnowledgeBaseUrl(doc.source)) +
        '" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;">' +
        escHTML(doc.source) +
        '</a></div>';
      html += '</div>'; // close pv-detail
      html += '</div>'; // close plan-card
    });
    html += '</div></div>';
  });
  wrap.innerHTML = html;
}

// P3 Task 11: Plan detail drawer — slide-in panel.
// Pulls the plan's name + already-generated pv-detail HTML into the
// drawer so we don't duplicate render logic. The inline pv-detail
// stays hidden (CSS) and acts purely as a data source.
function openPlanDrawer(id) {
  var drawer = document.getElementById('plan-drawer');
  var overlay = document.getElementById('plan-drawer-overlay');
  var title = document.getElementById('plan-drawer-title');
  var body = document.getElementById('plan-drawer-body');
  var detail = document.getElementById('pv-detail-' + id);
  if (!drawer || !overlay || !title || !body || !detail) return;

  // Resolve the plan name from POLICY_DOCS (fallback: first h-line text).
  var name = id;
  try {
    if (typeof POLICY_DOCS !== 'undefined') {
      var doc = POLICY_DOCS.find(function (p) {
        return p.id === id;
      });
      if (doc) name = doc.name;
    }
  } catch (_e) {
    /* ignore */
  }
  title.textContent = name;
  body.innerHTML = detail.innerHTML;
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('plan-drawer-lock');

  // Set sticky plan context (matches old togglePlanVault behavior)
  if (typeof setActivePlan === 'function') {
    try {
      var d2 =
        typeof POLICY_DOCS !== 'undefined'
          ? POLICY_DOCS.find(function (p) {
              return p.id === id;
            })
          : null;
      if (d2) setActivePlan(d2.id, d2.name, d2.group || d2.type || '');
    } catch (_e) {
      /* ignore */
    }
  }

  // Scroll the drawer body to top so every open starts at the top.
  try {
    body.scrollTop = 0;
  } catch (_e) {
    /* ignore */
  }
}

function closePlanDrawer() {
  var drawer = document.getElementById('plan-drawer');
  var overlay = document.getElementById('plan-drawer-overlay');
  if (!drawer || !overlay) return;
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('plan-drawer-lock');
}

// Global Escape key handler for the drawer (registered once).
if (typeof window !== 'undefined' && !window._planDrawerKeyBound) {
  window._planDrawerKeyBound = true;
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var drawer = document.getElementById('plan-drawer');
    if (drawer && drawer.classList.contains('open')) {
      closePlanDrawer();
    }
  });
}

var _openPlanVault = null;
function _updateToggleBtn(id, open) {
  var btn = document.getElementById('pv-toggle-' + id);
  if (!btn) return;
  var textEl = btn.querySelector('.pv-toggle-text');
  if (textEl) textEl.textContent = open ? 'Hide Details' : 'View Details';
}
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
    if (prev) prev.style.display = 'none';
    if (prevChev) {
      prevChev.style.transform = '';
    }
    _updateToggleBtn(_openPlanVault, false);
  }
  if (isOpen) {
    detail.style.display = 'none';
    if (chev) {
      chev.style.transform = '';
    }
    _updateToggleBtn(id, false);
    _openPlanVault = null;
  } else {
    detail.style.display = 'block';
    if (chev) {
      chev.style.transform = 'rotate(180deg)';
    }
    _updateToggleBtn(id, true);
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

// ══════════════════════════════════════════════════════
// RENDER: COMPARE
// ══════════════════════════════════════════════════════
var selPlans = [0, 5];

// ══════════════════════════════════════════════════════
// COMPARE — data lookup helpers
// Quick Compare and Full Compare both use these so data,
// fallback text, and cell styling stay consistent.
// ══════════════════════════════════════════════════════

// Explicit mapping: PLANS family name → POLICY_DOCS id array.
// PLANS has 14 plan-family entries; POLICY_DOCS has 27 per-tier
// entries. Many plans map to multiple tiers (e.g. MedFirst 1–5 →
// medf1..medf5). Explicit map avoids fragile fuzzy name matching.
var _COMPARE_PLAN_MAP = {
  'MedFirst 1–5': ['medf1', 'medf2', 'medf3', 'medf4', 'medf5'],
  'TrueHealth 1–3': ['trueh1'],
  'GoodHealth 1–5': ['ghdp1', 'ghdp2', 'ghdp3', 'ghdp4', 'ghdp5'],
  'TDK 1–5': ['tdk1', 'tdk2', 'tdk3', 'tdk4', 'tdk5'],
  SmartChoice: ['smartchoice2500'],
  'Pinnacle STM / Pinnacle Protect': ['pinnacle'],
  'Access Health Traditional STM': ['accesshealth'],
  'Smart Health STM Traditional': ['smarthealth'],
  'Galena STM Elite': ['galena'],
  'Everest Summit Plans': ['everest'],
  'HarmonyCare / SigmaCare': ['harmonycare', 'sigmacare'],
  'BWA Paramount': ['bwapara'],
  'BWA Americare 2–4': ['bwaamericare'],
  'HealthChoice Silver': ['healthchoicesilver']
};

// Resolve a PLANS entry to its POLICY_DOCS source documents.
function _compFindDocs(planName) {
  if (typeof POLICY_DOCS === 'undefined') return [];
  var ids = _COMPARE_PLAN_MAP[planName] || [];
  var out = [];
  for (var i = 0; i < ids.length; i++) {
    for (var j = 0; j < POLICY_DOCS.length; j++) {
      if (POLICY_DOCS[j].id === ids[i]) {
        out.push(POLICY_DOCS[j]);
        break;
      }
    }
  }
  return out;
}

// Uniform cell styling per status — only 3 colors allowed:
//   'covered'    → green  (explicitly covered benefit)
//   'notcovered' → red    (explicitly excluded / limitation)
//   'verify' / 'neutral' → gray (informational or unknown → VERIFY)
function _compCellStyle(status) {
  if (status === 'covered') {
    return 'background:#f0fdf4;color:#166534;';
  }
  if (status === 'notcovered') {
    return 'background:#fef2f2;color:#991b1b;';
  }
  return 'background:#f8fafc;color:#475569;';
}

// Trim long benefit strings so compare cells stay readable.
function _compTruncate(s, max) {
  s = String(s || '');
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '…';
}

// Look up a topic against POLICY_DOCS structured data, falling back
// to PLANS topPoints / limitations, then to 'VERIFY'. Returns
// {status, text}.
function _compLookup(plan, topic) {
  // Informational rows — read straight from PLANS, neutral styling.
  if (topic === 'Network')
    return { status: 'neutral', text: plan.network || 'VERIFY' };
  if (topic === 'Plan Type')
    return { status: 'neutral', text: plan.type || 'VERIFY' };

  var tests = {
    Copays: {
      cats: /doctor|physician|urgent|specialist/i,
      items: /copay|\$\d+\s*(pcp|primary|specialist|office|visit|urgent)/i,
      limits: /no copay|copay.*not covered/i
    },
    'Emergency Room': {
      cats: /emergency/i,
      items: /emergency\s*room|\ber\b/i,
      limits: /emergency\s*room|\ber\b.*not covered|no emergency/i
    },
    'Pre-Existing': {
      cats: /pre.?exist/i,
      items: /pre.?exist/i,
      limits: /pre.?exist/i
    }
  };
  var t = tests[topic];
  if (!t) return { status: 'verify', text: 'VERIFY' };

  var docs = _compFindDocs(plan.name);

  // 1. Search POLICY_DOCS benefits[].items[]
  for (var d = 0; d < docs.length; d++) {
    var doc = docs[d];
    var cats = doc.benefits || [];
    for (var b = 0; b < cats.length; b++) {
      var cat = cats[b];
      var catHit = t.cats.test(cat.category || '');
      var items = cat.items || [];
      for (var k = 0; k < items.length; k++) {
        if (catHit || t.items.test(items[k])) {
          return {
            status: 'covered',
            text: _compTruncate(items[k], 90)
          };
        }
      }
    }
  }

  // 2. Pre-Existing: prefer the dedicated doc.preEx field
  if (topic === 'Pre-Existing') {
    for (var d2 = 0; d2 < docs.length; d2++) {
      if (docs[d2].preEx) {
        return {
          status: 'notcovered',
          text: _compTruncate(docs[d2].preEx, 90)
        };
      }
    }
  }

  // 3. Search POLICY_DOCS limitations[]
  for (var d3 = 0; d3 < docs.length; d3++) {
    var limits = docs[d3].limitations || [];
    for (var l = 0; l < limits.length; l++) {
      if (t.limits.test(limits[l])) {
        return {
          status: 'notcovered',
          text: _compTruncate(limits[l], 90)
        };
      }
    }
  }

  // 4. Fall back to PLANS topPoints / limitations
  var topPoints = plan.topPoints || [];
  for (var p = 0; p < topPoints.length; p++) {
    if (t.items.test(topPoints[p])) {
      return { status: 'covered', text: _compTruncate(topPoints[p], 90) };
    }
  }
  var planLimits = plan.limitations || [];
  for (var pl = 0; pl < planLimits.length; pl++) {
    if (t.limits.test(planLimits[pl])) {
      return {
        status: 'notcovered',
        text: _compTruncate(planLimits[pl], 90)
      };
    }
  }

  return { status: 'verify', text: 'VERIFY' };
}

function buildQuickCompare() {
  var selA = document.getElementById('qc-plan-a');
  var selB = document.getElementById('qc-plan-b');
  var out = document.getElementById('qc-result');
  if (!selA || !selB || !out) return;
  var idxA = parseInt(selA.value, 10);
  var idxB = parseInt(selB.value, 10);
  if (isNaN(idxA) || isNaN(idxB)) {
    out.innerHTML =
      '<div style="color:#94a3b8;font-size:13px;padding:12px;">Select two plans above.</div>';
    return;
  }
  var pA = PLANS[idxA];
  var pB = PLANS[idxB];
  if (!pA || !pB) return;

  var topics = [
    'Plan Type',
    'Network',
    'Copays',
    'Emergency Room',
    'Pre-Existing'
  ];

  var tbl =
    '<table style="width:100%;border-collapse:collapse;font-size:13px;">';
  tbl +=
    '<thead><tr style="background:#f1f5f9;">' +
    '<th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">Topic</th>' +
    '<th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">' +
    escHTML(pA.name) +
    '</th>' +
    '<th style="padding:10px 12px;text-align:left;font-weight:700;color:#475569;border-bottom:2px solid #e2e8f0;">' +
    escHTML(pB.name) +
    '</th></tr></thead><tbody>';

  for (var t = 0; t < topics.length; t++) {
    var sA = _compLookup(pA, topics[t]);
    var sB = _compLookup(pB, topics[t]);
    tbl += '<tr>';
    tbl +=
      '<td style="padding:10px 12px;font-weight:600;color:#1e293b;border-bottom:1px solid #f1f5f9;">' +
      topics[t] +
      '</td>';
    tbl +=
      '<td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;' +
      _compCellStyle(sA.status) +
      '">' +
      escHTML(sA.text) +
      '</td>';
    tbl +=
      '<td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;' +
      _compCellStyle(sB.status) +
      '">' +
      escHTML(sB.text) +
      '</td>';
    tbl += '</tr>';
  }
  tbl += '</tbody></table>';
  out.innerHTML = tbl;
}

function renderCompare() {
  // ── Quick Compare Card ──
  var qcHtml =
    '<div style="background:#fff;border:1.5px solid var(--border);border-radius:16px;padding:18px 20px;margin-bottom:16px;">';
  qcHtml +=
    '<div style="font-size:15px;font-weight:800;color:#1e293b;margin-bottom:12px;">Quick Compare</div>';
  qcHtml +=
    '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px;">';
  qcHtml +=
    '<div style="flex:1;min-width:140px;"><label style="font-size:11px;font-weight:700;color:#64748b;display:block;margin-bottom:4px;">Plan A</label>';
  qcHtml +=
    '<select id="qc-plan-a" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;color:#1e293b;background:#f8fafc;">';
  qcHtml += '<option value="">Select...</option>';
  for (var qi = 0; qi < PLANS.length; qi++) {
    qcHtml +=
      '<option value="' + qi + '">' + escHTML(PLANS[qi].name) + '</option>';
  }
  qcHtml += '</select></div>';
  qcHtml +=
    '<div style="flex:1;min-width:140px;"><label style="font-size:11px;font-weight:700;color:#64748b;display:block;margin-bottom:4px;">Plan B</label>';
  qcHtml +=
    '<select id="qc-plan-b" style="width:100%;padding:8px 10px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;color:#1e293b;background:#f8fafc;">';
  qcHtml += '<option value="">Select...</option>';
  for (var qj = 0; qj < PLANS.length; qj++) {
    qcHtml +=
      '<option value="' + qj + '">' + escHTML(PLANS[qj].name) + '</option>';
  }
  qcHtml += '</select></div>';
  qcHtml +=
    '<button onclick="buildQuickCompare()" style="padding:8px 18px;background:#5175f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">Compare Now</button>';
  qcHtml += '</div>';
  qcHtml +=
    '<div id="qc-result" style="min-height:40px;"><div style="color:#94a3b8;font-size:13px;">Select two plans and tap Compare Now.</div></div>';
  qcHtml += '</div>';

  var html = qcHtml;
  html +=
    '<div class="ph"><div class="pt">Compare <span>Plans</span></div><div class="pd">Select up to 3 plans to compare side by side.</div></div>';
  PLAN_GROUPS.forEach(function (grp) {
    var plans = PLANS.filter(function (p) {
      return p.group === grp.key;
    });
    html +=
      '<div style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:var(--r-card);padding:14px 18px;margin-bottom:10px;">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:12px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;">' +
      grp.label +
      '</div>';
    html += '<div class="comp-sel">';
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
  document.querySelectorAll('.comp-btn').forEach(function (b) {
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

  var neutralStyle = _compCellStyle('neutral');
  var greenStyle = _compCellStyle('covered');
  var redStyle = _compCellStyle('notcovered');

  // ── Table start with mobile scroll ──
  var html =
    '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;margin-top:16px;border:1.5px solid #E5E7EB;border-radius:14px;">';
  html += '<table class="ctable" style="min-width:500px;">';

  // ── Header row (neutral — no color accents per group) ──
  html += '<thead><tr><th style="min-width:120px;">Feature</th>';
  plans.forEach(function (p) {
    html +=
      '<th>' +
      '<div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:2px;">' +
      p.name +
      '</div>' +
      '<span style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-secondary);">' +
      p.group +
      '</span></th>';
  });
  html += '</tr></thead><tbody>';

  // ── Standard info rows (neutral gray cells) ──
  var rows = [
    { k: 'type', l: 'Plan Type' },
    { k: 'network', l: 'Network' },
    { k: 'admin', l: 'Administrator' },
    { k: 'assoc', l: 'Association' },
    { k: 'idealClient', l: 'Ideal Client' },
    { k: 'notGood', l: 'Not Good For' }
  ];
  rows.forEach(function (r) {
    html += '<tr><td>' + r.l + '</td>';
    plans.forEach(function (p) {
      html +=
        '<td style="' + neutralStyle + '">' + (p[r.k] || 'VERIFY') + '</td>';
    });
    html += '</tr>';
  });

  // ── Row: Top Benefits — uniform green (covered) ──
  html += '<tr><td>Top Benefits</td>';
  plans.forEach(function (p) {
    var items = (p.topPoints || []).slice(0, 5);
    var body = items.length
      ? items
          .map(function (t) {
            return '&#10003; ' + t;
          })
          .join('<br>')
      : 'VERIFY';
    html +=
      '<td style="font-size:12px;line-height:1.6;' +
      greenStyle +
      '">' +
      body +
      '</td>';
  });
  html += '</tr>';

  // ── Row: Main Limits — uniform red (not covered) ──
  html += '<tr><td>Main Limits</td>';
  plans.forEach(function (p) {
    var items = (p.limitations || []).slice(0, 4);
    var body = items.length
      ? items
          .map(function (t) {
            return '&#10005; ' + t;
          })
          .join('<br>')
      : 'VERIFY';
    html +=
      '<td style="font-size:12px;line-height:1.6;' +
      redStyle +
      '">' +
      body +
      '</td>';
  });
  html += '</tr>';

  // ── Row: Best Fit — neutral ──
  html += '<tr><td>Best Fit</td>';
  plans.forEach(function (p) {
    var items = (p.fitYes || []).slice(0, 3);
    var body = items.length
      ? items
          .map(function (t) {
            return '&#10003; ' + t;
          })
          .join('<br>')
      : 'VERIFY';
    html +=
      '<td style="font-size:12px;line-height:1.6;' +
      neutralStyle +
      '">' +
      body +
      '</td>';
  });
  html += '</tr>';

  // ── Row: Bad Fit — neutral ──
  html += '<tr><td>Bad Fit</td>';
  plans.forEach(function (p) {
    var items = (p.fitNo || []).slice(0, 3);
    var body = items.length
      ? items
          .map(function (t) {
            return '&#10005; ' + t;
          })
          .join('<br>')
      : 'VERIFY';
    html +=
      '<td style="font-size:12px;line-height:1.6;' +
      neutralStyle +
      '">' +
      body +
      '</td>';
  });
  html += '</tr>';

  html += '</tbody></table></div>';
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

// ══════════════════════════════════════════════════════
// AUTO-CLEAR SEARCH INPUTS WHEN AGENT SELECTS A PLAN
// When the agent clicks a plan button in the Benefits Reference
// panel's .br-plan-bar, clear every search/input box so the next
// action starts fresh. Uses event delegation on document so it
// works for dynamically-created plan buttons (chat.js creates them)
// without ever modifying chat.js itself. Runs after chat.js's own
// onclick handler (bubbling phase), so it cannot interfere with
// plan selection logic.
// ══════════════════════════════════════════════════════
document.addEventListener('click', function (e) {
  var t = e.target;
  if (!t || typeof t.closest !== 'function') return;
  var btn = t.closest('.br-plan-btn');
  if (!btn) return;
  // Benefits Reference chat textarea
  var chatInput = document.getElementById('br-input');
  if (chatInput) chatInput.value = '';
  // Benefits Reference in-panel plan search
  var brPlanSearch = document.getElementById('br-plan-search');
  if (brPlanSearch) brPlanSearch.value = '';
  // Plans tab search (if that page is also open)
  var planSearch = document.getElementById('planSearchInput');
  if (planSearch) {
    planSearch.value = '';
    if (typeof filterPlanSearch === 'function') filterPlanSearch('');
  }
});

// Dashboard: similar plans (read-only POLICY_DOCS; additive helper for app.js)
function chaPickSimilarPlansForDash(plan, limit) {
  if (!plan || typeof POLICY_DOCS === 'undefined' || !POLICY_DOCS.length) return [];
  var lim = Math.min(8, Math.max(1, Number(limit) || 3));
  var net = String(plan.network || '').trim().toLowerCase();
  var typ = String(plan.type || '').trim().toLowerCase();
  var scored = [];
  var i;
  for (i = 0; i < POLICY_DOCS.length; i++) {
    var p = POLICY_DOCS[i];
    if (!p || String(p.id) === String(plan.id)) continue;
    if (typeof _pdIsDisplayablePlan === 'function' && !_pdIsDisplayablePlan(p)) {
      continue;
    }
    var pn = String(p.network || '').trim().toLowerCase();
    var pt = String(p.type || '').trim().toLowerCase();
    var score = 0;
    if (net && pn === net) score += 3;
    if (typ && pt === typ) score += 2;
    if (score > 0) scored.push({ p: p, score: score });
  }
  scored.sort(function (a, b) {
    return (
      b.score - a.score || String(a.p.name).localeCompare(String(b.p.name))
    );
  });
  var out = [];
  for (i = 0; i < scored.length && out.length < lim; i++) {
    out.push(scored[i].p);
  }
  return out;
}
