// On Call Disclosures tab text (Oct 26 2026, approved by Mey).
// Recap layout per plan (Oct 26 2026): must-say points only, read word
// for word before payment; carrier terms are acknowledged in the e-sign.
// map: 'Family|Tier' -> block id. A paragraph ending in the
// Wait for answer marker is a confirm question. hide: families
// kept off On Call (no reviewed script). Edit wording only with
// Mey's approval.
// Oct 26 2026: discount / association "not insurance" lines and the
// Harbor rider sentence removed (Mey). Harbor $5,000 line per the NEO
// HarborSTM training (Unit 2-3), Oct 26 2026.
// Oct 31 2026: universal format (Mey). Every block: 1 network, 2 who,
// 3 billing, 4 what it is + exclusions, 5 limits, 6 pre-existing and
// waits (if any), 7 Schedule of Benefits, 8 plan must-say (if any),
// 9 confirm. GoodHealth and SmartChoice line 4 stay verbatim.
var CW_DISC = {
  map: {
    'AWA TrueHealth|Value': 'awatruehealth',
    'AWA TrueHealth|1': 'awatruehealth_2',
    'AWA TrueHealth|2': 'awatruehealth_3',
    'AWA TrueHealth|3': 'awatruehealth_4',
    'AWA TrueHealth|4': 'awatruehealth_5',
    'GoodHealth|4': 'ghdp_45',
    'GoodHealth|5': 'ghdp_45',
    'Sigma Care PLUS|100A': 'sigma',
    'Sigma Care PLUS|100': 'sigma',
    'Sigma Care PLUS|200': 'sigma',
    'Sigma Care PLUS|200+': 'sigma',
    'Sigma Care PLUS|300': 'sigma_2',
    'Sigma Care PLUS|500': 'sigma_2',
    'Sigma Care PLUS|750': 'sigma_2',
    'Sigma Care PLUS|1000': 'sigma_2',
    'NexusCare STM|PPO': 'nexus_ppo',
    'RiseHealth STM|Traditional': 'risehealth',
    'Allstate STM PPO|Enhanced': 'allstate_stm',
    'Allstate STM PPO|Copay Enhanced': 'allstate_stm_2',
    'Allstate STM PPO|Essentials': 'allstate_stm_3',
    'AdvantCare|2': 'advantcare',
    'AdvantCare|3': 'advantcare_2',
    'AdvantCare|3+': 'advantcare_2',
    'AdvantCare|6': 'advantcare_2',
    'AdvantCare|6+': 'advantcare_2',
    'AdvantCare|9': 'advantcare_2',
    'AdvantCare|9+': 'advantcare_2',
    'AdvantCare|12': 'advantcare_2',
    'AdvantCare|12+': 'advantcare_2',
    'AdvantCare|WellPremium': 'advantcare',
    'AdvantCare|WellPremium+': 'advantcare_2',
    'GoodHealth|1': 'ghdp_123',
    'GoodHealth|2': 'ghdp_123_2',
    'GoodHealth|3': 'ghdp_123_3',
    'Advanced Wellness PLUS|100A': 'awp',
    'Advanced Wellness PLUS|100': 'awp',
    'Advanced Wellness PLUS|200': 'awp',
    'Advanced Wellness PLUS|200+': 'awp',
    'Advanced Wellness PLUS|300': 'awp_2',
    'Advanced Wellness PLUS|500': 'awp_2',
    'Advanced Wellness PLUS|750': 'awp_2',
    'Advanced Wellness PLUS|1000': 'awp_2',
    'BWA Americare|2': 'americare',
    'BWA Americare|3': 'americare_2',
    'BWA Americare|4': 'americare',
    'WB Choice / Select|Choice': 'wb',
    'WB Choice / Select|Select': 'wb_2',
    'GoodHealth|Wellness': 'ghdp_wellness',
    'TVP Health|1': 'tvp',
    'TVP Health|2': 'tvp_2',
    'TVP Health|3': 'tvp_3',
    'TVP Health|4': 'tvp_3',
    'TVP Health|5': 'tvp_3',
    'Galena STM|Economy': 'galena',
    'Galena STM|Elite': 'galena',
    'Galena STM|Standard': 'galena',
    'SmartHealth STM|Traditional': 'smarthealth_trad',
    'Access Health STM|Traditional': 'access',
    'Access Health STM|Lite': 'access',
    'NexusCare STM|Base': 'nexus_base',
    'Pinnacle Protect|2': 'pinnacle_protect',
    'Pinnacle Protect|3': 'pinnacle_protect',
    'Pinnacle Protect|4': 'pinnacle_protect',
    'SmartHealth STM|Limited': 'smarthealth_ltd',
    'Harbor STM|Essential': 'harbor',
    'Harbor STM|Access': 'harbor_2',
    'Harbor STM|Secure': 'harbor_3',
    'RiseHealth STM|Lite Plus': 'risehealth_lite',
    'RiseHealth STM|Lite': 'risehealth_lite',
    'TDK|1': 'tdk_123',
    'TDK|2': 'tdk_123_2',
    'TDK|3': 'tdk_123_3',
    'Harmony Care PLUS|100A': 'harmony_plus',
    'Harmony Care PLUS|100': 'harmony_plus_2',
    'Harmony Care PLUS|200': 'harmony_plus_3',
    'Harmony Care PLUS|200+': 'harmony_plus_4',
    'Harmony Care PLUS|300': 'harmony_plus_5',
    'Harmony Care PLUS|500': 'harmony_plus_6',
    'Harmony Care PLUS|750': 'harmony_plus_7',
    'Harmony Care PLUS|1000': 'harmony_plus_8',
    'PrimeProtect|Basic': 'primeprotect',
    'PrimeProtect|Plus': 'primeprotect',
    'PrimeProtect|Preferred': 'primeprotect_2',
    'PrimeProtect|Premium': 'primeprotect_2',
    'PrimeProtect|Platinum': 'primeprotect_2',
    'CrownPoint STM|Standard': 'crownpoint',
    'Allstate Health Access|Plan': 'allstate_ha',
    'TDK|4': 'tdk_45',
    'TDK|5': 'tdk_45_2',
    'HD HealthAscent|1': 'hd',
    'HD HealthAscent|2': 'hd',
    'HD HealthAscent|3': 'hd',
    'SmartChoice|1500': 'smartchoice',
    'SmartChoice|2500': 'smartchoice',
    'SmartChoice|3000': 'smartchoice',
    'SmartChoice|3500': 'smartchoice',
    'Pinnacle STM|Traditional': 'pinnacle_stm',
    'Harmony Care|100A': 'harmony',
    'Harmony Care|100B': 'harmony',
    'Harmony Care|100': 'harmony',
    'Harmony Care|200': 'harmony',
    'Harmony Care|200+': 'harmony',
    'Harmony Care|300': 'harmony_2',
    'Harmony Care|500': 'harmony_2',
    'Harmony Care|750': 'harmony_2',
    'Harmony Care|1000': 'harmony_2',
    'Health Choice Silver|Over 65': 'hcs',
    'Health Choice Silver|100A': 'hcs',
    'Health Choice Silver|100': 'hcs',
    'Health Choice Silver|200': 'hcs',
    'Health Choice Silver|200+': 'hcs',
    'Health Choice Silver|300': 'hcs',
    'Health Choice Silver|500': 'hcs',
    'Health Choice Silver|750': 'hcs',
    'Health Choice Silver|1000': 'hcs',
    'BWA Paramount|1': 'paramount_123',
    'BWA Paramount|2': 'paramount_123',
    'BWA Paramount|3': 'paramount_123',
    'BWA Paramount|4': 'paramount_456',
    'BWA Paramount|5': 'paramount_456',
    'BWA Paramount|6': 'paramount_456'
  },
  blocks: {
    awatruehealth: {
      paras: [
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company and offered through the Affiliated Workers Association (AWA).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private association membership with limited-benefit hospital indemnity insurance, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_2: {
      paras: [
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company and offered through the Affiliated Workers Association (AWA).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private association membership with limited-benefit hospital indemnity insurance, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_3: {
      paras: [
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company and offered through the Affiliated Workers Association (AWA).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private association membership with limited-benefit hospital indemnity insurance, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_4: {
      paras: [
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company and offered through the Affiliated Workers Association (AWA).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private association membership with limited-benefit hospital indemnity insurance, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_5: {
      paras: [
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company and offered through the Affiliated Workers Association (AWA).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private association membership with limited-benefit hospital indemnity insurance, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    ghdp_45: {
      paras: [
        "Your plan uses the First Health Network. Doctor and wellness visits are in-network only; the hospital benefit isn't.",
        'Merchants Benefit Administration (MBA) administers the plan, and you join Good Health Distribution Partners (GHDP) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        'Every benefit has limits; past a limit, you pay. Benefits and visits reset every July 1, so your first plan year may be shorter than 12 months.',
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital, surgery, ER and ambulance benefits for your first 12 months. Sickness has a 30-day wait.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. NICU care and preventive care at a hospital aren't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ GoodHealth plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    sigma: {
      paras: [
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Sigma Care PLUS insurance premium, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    sigma_2: {
      paras: [
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Sigma Care PLUS insurance premium, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    nexus_ppo: {
      paras: [
        "Your plan uses the Cigna PPO for Shared Administration network. You can go out of network, but you'll pay more.",
        "It's underwritten by The North River Insurance Company and offered through the Communicating for America Association.",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits, including the coverage period maximum; past a limit, you pay. In network, your out-of-pocket maximum is met once you meet your deductible, except the $250 ER copay. Out of network, there's no out-of-pocket maximum.",
        "Pre-existing conditions aren't covered; your certificate has the look-back. Sickness in your first 3 days and cancer in your first 30 days aren't covered.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It doesn't follow ACA rules, so if it ends you may have to wait for open enrollment. Coverage lasts for the term you pick and ends at the end of the paid period in which you turn 65.",
        '\u25b6 ( Nevada residents only, read word for word: )\nYOU MAY BE ELIGIBLE FOR A SUBSIDY IF PURCHASING A "QUALIFIED HEALTH PLAN" WHICH PROVIDES MORE COVERAGE AT POSSIBLY A LOWER COST. FOR MORE INFORMATION, PLEASE CHECK: https://www.nevadahealthlink.com/',
        '\u25b6 ( MO and OK residents only: )\nThis policy is not renewable or extendable.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ Communicating for America Association membership, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month; rates can change in later periods if you select multiple durations. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    risehealth: {
      paras: [
        'Your plan uses the First Health Limited Benefit Plan Network.',
        "It's underwritten by American Financial Security Life Insurance Company or Standard Life and Casualty Insurance Company, depending on your state, and offered through the National Congress of Employers (NCE).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Benefits are limited to usual, reasonable and customary amounts. Your $2,000 coinsurance limit caps only your coinsurance; your deductible, copays and additional deductibles are on top.',
        "Pre-existing conditions aren't covered. On a new policy for another term, anything from the earlier term counts as pre-existing.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It doesn't follow ACA rules, so if it ends you may have to wait for open enrollment. It isn't renewable, but while you keep paying, a new policy can be issued every 6 or 12 months, up to 36 months, and rates can go up each term. It ends at the end of the paid period in which you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    allstate_stm: {
      paras: [
        "Your plan uses the Aetna Open Choice PPO network. Out of network, your deductible and coinsurance limit double, and copays don't apply.",
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and offered through the LIFE Association.",
        'Your bill will show Neo Health Solutions.',
        'This is private short-term medical, not an ACA or major medical plan.',
        'Every benefit has limits; past a limit, you pay. Your coinsurance limit caps only your coinsurance; your deductible, copays and access fees are on top.',
        "Pre-existing conditions aren't covered; this plan is medically underwritten.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Your certificate lists all exclusions and limits.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    allstate_stm_2: {
      paras: [
        "Your plan uses the Aetna Open Choice PPO network. Out of network, your deductible and coinsurance limit double, and copays don't apply.",
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and offered through the LIFE Association.",
        'Your bill will show Neo Health Solutions.',
        'This is private short-term medical, not an ACA or major medical plan.',
        'Every benefit has limits; past a limit, you pay. Your coinsurance limit caps only your coinsurance; your deductible, copays and access fees are on top.',
        "Pre-existing conditions aren't covered; this plan is medically underwritten.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Your certificate lists all exclusions and limits.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    allstate_stm_3: {
      paras: [
        "Your plan uses the Aetna Open Choice PPO network. Out of network, your deductible and coinsurance limit double, and copays don't apply.",
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and offered through the LIFE Association.",
        'Your bill will show Neo Health Solutions.',
        'This is private short-term medical, not an ACA or major medical plan.',
        'Every benefit has limits; past a limit, you pay. Your coinsurance limit caps only your coinsurance; your deductible, copays and access fees are on top.',
        "Pre-existing conditions aren't covered; this plan is medically underwritten.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Your certificate lists all exclusions and limits.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    advantcare: {
      paras: [
        'Your plan uses the MultiPlan PPO Network, in-network only.',
        'Aither Health administers the plan, and you join Consumer Data Partners, LP (VistaWell) as a Limited Partner. A federal law called ERISA governs the plan.',
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private group health plan, not an ACA or major medical plan. It doesn't cover labor and delivery, or inpatient mental health and substance abuse treatment.",
        "Every benefit has limits; past a limit, you pay. There's no deductible, and your out-of-pocket maximum counts in-network care only.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Care at a hospital, including preventive care and doctor visits, isn't covered unless your schedule says so, and partial hospitalization isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover labor and delivery, or inpatient mental health and substance abuse treatment, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee (only if your quote shows one), $___ for ___ add-on, if any. Then $___ a month, drafted automatically from the card or bank account you give me. Billing is through Premier Health Solutions, LLC; your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    advantcare_2: {
      paras: [
        'Your plan uses the MultiPlan PPO Network, in-network only.',
        'Aither Health administers the plan, and you join Consumer Data Partners, LP (VistaWell) as a Limited Partner. A federal law called ERISA governs the plan.',
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private group health plan, not an ACA or major medical plan. It doesn't cover labor and delivery, or inpatient mental health and substance abuse treatment.",
        "Every benefit has limits; past a limit, you pay. There's no deductible, and your out-of-pocket maximum counts in-network care only.",
        'Pre-existing conditions from the 12 months before you start are never covered by the hospital benefit.',
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Care at a hospital, including preventive care and doctor visits, isn't covered unless your schedule says so, and partial hospitalization isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover labor and delivery, or inpatient mental health and substance abuse treatment, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee (only if your quote shows one), $___ for ___ add-on, if any. Then $___ a month, drafted automatically from the card or bank account you give me. Billing is through Premier Health Solutions, LLC; your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    ghdp_123: {
      paras: [
        "Your plan uses the First Health Network. Doctor and wellness visits are in-network only; the hospital benefit isn't.",
        'Merchants Benefit Administration (MBA) administers the plan, and you join Good Health Distribution Partners (GHDP) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        'Every benefit has limits; past a limit, you pay, even in-network. Benefits and visits reset every July 1, so your first plan year may be shorter than 12 months.',
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital benefit for your first 12 months. Sickness has a 30-day wait.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. GoodHealth 1, 2 and 3 have no ER, ambulance or surgery benefit, and NICU care and preventive care at a hospital aren't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    ghdp_123_2: {
      paras: [
        "Your plan uses the First Health Network. Doctor and wellness visits are in-network only; the hospital benefit isn't.",
        'Merchants Benefit Administration (MBA) administers the plan, and you join Good Health Distribution Partners (GHDP) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        'Every benefit has limits; past a limit, you pay, even in-network. Benefits and visits reset every July 1, so your first plan year may be shorter than 12 months.',
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital benefit for your first 12 months. Sickness has a 30-day wait.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. GoodHealth 1, 2 and 3 have no ER, ambulance or surgery benefit, and NICU care and preventive care at a hospital aren't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    ghdp_123_3: {
      paras: [
        "Your plan uses the First Health Network. Doctor and wellness visits are in-network only; the hospital benefit isn't.",
        'Merchants Benefit Administration (MBA) administers the plan, and you join Good Health Distribution Partners (GHDP) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        'Every benefit has limits; past a limit, you pay, even in-network. Benefits and visits reset every July 1, so your first plan year may be shorter than 12 months.',
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital benefit for your first 12 months. Sickness has a 30-day wait.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. GoodHealth 1, 2 and 3 have no ER, ambulance or surgery benefit, and NICU care and preventive care at a hospital aren't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    awp: {
      paras: [
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    awp_2: {
      paras: [
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    americare: {
      paras: [
        "Your plan uses the PHCS network for repricing (888-371-7427 or multiplan.com). The repricing service isn't insurance and doesn't guarantee payment; use in-network providers to get network rates.",
        "It's underwritten by American Public Life Insurance Company and offered through the Business Workers of America (BWA). A federal law called ERISA applies.",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit hospital indemnity plan, not an ACA or major medical plan, and it doesn't replace workers' comp. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "There's no pre-existing exclusion period. For your first 6 months, the plan pays nothing for hernia, adenoids, tonsils, varicose veins, appendix or reproductive-organ disorders, except emergencies.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ American Public Life hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    americare_2: {
      paras: [
        "Your plan uses the PHCS network for repricing (888-371-7427 or multiplan.com). The repricing service isn't insurance and doesn't guarantee payment; use in-network providers to get network rates.",
        "It's underwritten by American Public Life Insurance Company and offered through the Business Workers of America (BWA). A federal law called ERISA applies.",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit hospital indemnity plan, not an ACA or major medical plan, and it doesn't replace workers' comp. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "There's no pre-existing exclusion period. For your first 6 months, the plan pays nothing for hernia, adenoids, tonsils, varicose veins, appendix or reproductive-organ disorders, except emergencies.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ American Public Life hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    wb: {
      paras: [
        'Your plan uses the First Health Network. Doctor, specialist, urgent care and preventive visits are in-network only.',
        'Merchants Benefit Administration (MBA) administers it through the Wellness Brands Health Plan, and you join Good Life Partners, LP as a Limited Partner.',
        'Your bill will show Neo Health Solutions.',
        "This is a private, scheduled fixed indemnity plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum, and the No Surprises Act doesn't apply, so providers may bill you for the rest unless your state says otherwise.",
        "Pre-existing conditions from the 12 months before you start aren't covered for hospital stays and surgeries for your first 12 months. Sickness has a 30-day wait; accidents are covered right away.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Your contribution is due on the first, with a 31-day grace period.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ WB ___ monthly contribution, $___ one-time enrollment fee if one applies, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    wb_2: {
      paras: [
        'Your plan uses the First Health Network. Doctor, specialist, urgent care and preventive visits are in-network only.',
        'Merchants Benefit Administration (MBA) administers it through the Wellness Brands Health Plan, and you join Good Life Partners, LP as a Limited Partner.',
        'Your bill will show Neo Health Solutions.',
        "This is a private, scheduled fixed indemnity plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum, and the No Surprises Act doesn't apply, so providers may bill you for the rest unless your state says otherwise.",
        "Pre-existing conditions from the 12 months before you start aren't covered for hospital stays and surgeries for your first 12 months. Sickness has a 30-day wait; accidents are covered right away.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Your contribution is due on the first, with a 31-day grace period.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ WB ___ monthly contribution, $___ one-time enrollment fee if one applies, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    ghdp_wellness: {
      paras: [
        'Your plan uses the First Health Network, in-network only.',
        'Merchants Benefit Administration (MBA) administers the plan, and you join Good Health Distribution Partners (GHDP) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "This is a private, self-funded preventive care plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Benefits and visits reset every July 1, so your first plan year may be shorter than 12 months.',
        'Sickness has a 30-day wait.',
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. There are no benefits for sick visits, specialists, urgent care, the ER or hospital stays, and preventive care at a hospital isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    tvp: {
      paras: [
        'Your plan uses the First Health network for preventive and doctor services, in-network only. Search providerlocator.com with code FHMBA, or call (800) 226-5116.',
        'Merchants Benefit Administration (MBA) administers the plan, and you join the VP Limited Partnership as a Limited Partner. Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit.',
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays only up to the per-visit maximum.',
        "Pre-existing conditions aren't covered by the hospital benefit. Sickness has a 30-day wait.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Coverage ends at 65 for members and spouses, and at 26 for children.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tvp_2: {
      paras: [
        'Your plan uses the First Health network for preventive and doctor services, in-network only. Search providerlocator.com with code FHMBA, or call (800) 226-5116.',
        'Merchants Benefit Administration (MBA) administers the plan, and you join the VP Limited Partnership as a Limited Partner. Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit.',
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays only up to the per-visit maximum.',
        "Pre-existing conditions aren't covered by the hospital benefit. Sickness has a 30-day wait.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Coverage ends at 65 for members and spouses, and at 26 for children.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tvp_3: {
      paras: [
        'Your plan uses the First Health network for preventive and doctor services, in-network only. Search providerlocator.com with code FHMBA, or call (800) 226-5116.',
        'Merchants Benefit Administration (MBA) administers the plan, and you join the VP Limited Partnership as a Limited Partner. Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit.',
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays only up to the per-visit maximum.',
        "Pre-existing conditions aren't covered by the hospital benefit. Sickness has a 30-day wait.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Coverage ends at 65 for members and spouses, and at 26 for children.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    galena: {
      paras: [
        'Your plan uses the First Health and MultiPlan networks.',
        "It's underwritten by Southern Guaranty Insurance Company (SGIC) and offered through the Association for Responsible Planners (AFRP).",
        'Your bill will show Neo Health Solutions.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Your coinsurance maximum caps only coinsurance; your deductible and copays are on top.',
        "Pre-existing conditions from the 12 months before you start aren't covered. Sickness has a 5-day wait and cancer 30 days; injuries are covered the next day. Some surgeries aren't covered your first 6 months.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Your term is 12 months, and you can auto re-apply for up to 36 months.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Galena plan, $___ AFRP membership if a monthly fee applies, $___ one-time AFRP association fee, $___ ___ add-on if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    smarthealth_trad: {
      paras: [
        'Your plan uses the PHCS network from MultiPlan, and you can go in or out of network.',
        "It's underwritten by Standard Life and Casualty Insurance Company or American Financial Security Life Insurance Company, depending on your state, and offered through the National Congress of Employers (NCE).",
        'Your bill will show Neo Health Solutions.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Your coinsurance limit caps only coinsurance; your deductible, copays and amounts above the usual and customary charge are on top.',
        "Pre-existing conditions from the 36 months before you start aren't covered. Sickness has a 5-day wait and cancer 30 days; injuries have none.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Coverage can run up to 36 months, and your payment is collected on your bill date each month.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time association fee, $___ Pre-Existing Waiver Rider and $___ ___ if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    access: {
      paras: [
        'Your plan uses the MultiPlan PHCS network, and you can go in or out of network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Your coinsurance limit caps only your coinsurance; your deductible is on top.',
        "Pre-existing conditions from the 36 months before you start aren't covered. Sickness has a 5-day wait and cancer 30 days; injuries have none.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It doesn't follow ACA rules, so if it ends you may have to wait for open enrollment. It ends when payments stop, at 65, or when Medicare starts.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ Pre-Existing Waiver Rider or ___ if chosen. Then $___ a month. Your statement shows FirstEnroll.'
    },
    nexus_base: {
      paras: [
        "There's no provider network. You can see any provider, and the plan pays its own eligible-expense amounts, called reference-based pricing.",
        "It's underwritten by The North River Insurance Company and offered through the Communicating for America Association.",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Once you meet your deductible, your out-of-pocket maximum is met, and the plan pays 100% of eligible expenses, except copays, up to the coverage period maximum.',
        "Pre-existing conditions aren't covered; your certificate has the look-back. Sickness in your first 3 days and cancer in your first 30 days aren't covered.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It doesn't follow ACA rules, so if it ends you may have to wait for open enrollment. It ends at the end of the paid period in which you turn 65, and dependents come off at 26.",
        '\u25b6 ( Nevada residents only, read word for word: )\nYOU MAY BE ELIGIBLE FOR A SUBSIDY IF PURCHASING A "QUALIFIED HEALTH PLAN" WHICH PROVIDES MORE COVERAGE AT POSSIBLY A LOWER COST. FOR MORE INFORMATION, PLEASE CHECK: https://www.nevadahealthlink.com/',
        '\u25b6 ( MO, NC, OK, TX only: )\nThis policy is not renewable or extendable.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ association membership, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    pinnacle_protect: {
      paras: [
        "There's no network requirement, and the plan pays the same either way. You also get the PHCS Practitioner and Ancillary network from MultiPlan.",
        "It's underwritten by Everest Reinsurance Company and offered through the American Workers Association (AWA).",
        'Your bill will show Neo Health Solutions.',
        "This is a private fixed indemnity plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions aren't covered for the months in your Schedule of Benefits. Critical illness has a 30-day wait; other waits are in your Schedule, and a condition diagnosed during a wait isn't covered.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It's renewable but ends at the end of the month you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership if a monthly fee applies, $___ one-time AWA association fee, $___ ___ add-on if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    smarthealth_ltd: {
      paras: [
        'Your plan uses the PHCS network from MultiPlan, and you can go in or out of network.',
        "It's underwritten by Standard Life and Casualty Insurance Company or American Financial Security Life Insurance Company, depending on your state, and offered through the National Congress of Employers (NCE).",
        'Your bill will show Neo Health Solutions.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Hospital, surgery and ER benefits pay only up to fixed dollar amounts. Your coinsurance limit caps only coinsurance; your deductible, copays and amounts above the usual and customary charge are on top.',
        "Pre-existing conditions from the 36 months before you start aren't covered. Sickness has a 5-day wait and cancer 30 days; injuries have none.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Coverage can run up to 36 months, and your payment is collected on your bill date each month.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time association fee, $___ Pre-Existing Waiver Rider and $___ ___ if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor: {
      paras: [
        'Your plan uses the Cigna Healthcare PPO network. Office visits are in-network only.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state, and offered through the American Workers Association (AWA).",
        'Your bill will show Neo Health Solutions.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. Your $5,000 in-network coinsurance limit doesn't include your deductible, copays or access fees, and out-of-network care has no limit.",
        "Pre-existing conditions from the 5 years before you start aren't covered. Sickness has a 5-day wait, and cancer and wellness 30 days; injuries have none.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor_2: {
      paras: [
        'Your plan uses the Cigna Healthcare PPO network. Office visits are in-network only.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state, and offered through the American Workers Association (AWA).",
        'Your bill will show Neo Health Solutions.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. Your $5,000 in-network coinsurance limit doesn't include your deductible, copays or access fees, and out-of-network care has no limit.",
        "Pre-existing conditions from the 5 years before you start aren't covered. Sickness has a 5-day wait, and cancer and wellness 30 days; injuries have none.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor_3: {
      paras: [
        'Your plan uses the Cigna Healthcare PPO network. Office visits are in-network only.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state, and offered through the American Workers Association (AWA).",
        'Your bill will show Neo Health Solutions.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. Your $5,000 in-network coinsurance limit doesn't include your deductible, copays or access fees, and out-of-network care has no limit.",
        "Pre-existing conditions from the 5 years before you start aren't covered. Sickness has a 5-day wait, and cancer and wellness 30 days; injuries have none.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    risehealth_lite: {
      paras: [
        'Your plan uses the First Health Limited Benefit Plan Network.',
        "It's underwritten by American Financial Security Life Insurance Company or Standard Life and Casualty Insurance Company, depending on your state, and offered through the National Congress of Employers (NCE).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. Your coinsurance limit caps only your coinsurance; your deductible and copays are on top.',
        "Pre-existing conditions aren't covered. On a new policy for another term, anything from the earlier term counts as pre-existing.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "It doesn't follow ACA rules, so if it ends you may have to wait for open enrollment. It isn't renewable, but while you keep paying, a new policy can be issued every 6 or 12 months, up to 36 months, and rates can go up each term. It ends at the end of the paid period in which you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tdk_123: {
      paras: [
        "Your plan uses the First Health network. Doctor visits and preventive care are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        'Detego Health administers the plan, and you join Healthcare Data Analytics (HCDA) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "This is a private, limited group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. There's no out-of-pocket maximum, and visit limits reset each 12-month benefit year.",
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital benefit for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc, the pharmacy benefit and emergencies.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. There's no ER, ambulance or outpatient surgery benefit, and labs and X-rays are discount only.",
        "You'll do about 8 to 10 short Working Owner activities a year, like health surveys, to keep your coverage. You'll get K-1 tax documents by email.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_123_2: {
      paras: [
        "Your plan uses the First Health network. Doctor visits and preventive care are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        'Detego Health administers the plan, and you join Healthcare Data Analytics (HCDA) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "This is a private, limited group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. There's no out-of-pocket maximum, and visit limits reset each 12-month benefit year.",
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital benefit for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc, the pharmacy benefit and emergencies.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. There's no ER, ambulance or outpatient surgery benefit, and labs and X-rays are discount only.",
        "You'll do about 8 to 10 short Working Owner activities a year, like health surveys, to keep your coverage. You'll get K-1 tax documents by email.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_123_3: {
      paras: [
        "Your plan uses the First Health network. Doctor visits and preventive care are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        'Detego Health administers the plan, and you join Healthcare Data Analytics (HCDA) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "This is a private, limited group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. There's no out-of-pocket maximum, and visit limits reset each 12-month benefit year.",
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital benefit for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc, the pharmacy benefit and emergencies.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. There's no ER, ambulance or outpatient surgery benefit, and labs and X-rays are discount only.",
        "You'll do about 8 to 10 short Working Owner activities a year, like health surveys, to keep your coverage. You'll get K-1 tax documents by email.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    harmony_plus: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_2: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_3: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_4: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_5: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_6: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_7: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_8: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    primeprotect: {
      paras: [
        'Your plan gives you access to the First Health Network and the Hooray Health Network of retail clinics and urgent care centers.',
        "It's underwritten by National Guardian Life Insurance Company.",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private fixed indemnity plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    primeprotect_2: {
      paras: [
        'Your plan gives you access to the First Health Network and the Hooray Health Network of retail clinics and urgent care centers.',
        "It's underwritten by National Guardian Life Insurance Company.",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private fixed indemnity plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "The critical illness benefit doesn't pay for a condition first diagnosed in your first 30 days, pays once per person, and doesn't pay for a recurring illness.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    crownpoint: {
      paras: [
        'Your plan uses the PHCS Practitioner & Ancillary Network from MultiPlan.',
        "It's underwritten by Everest Reinsurance Company and offered through the Affiliated Workers Association (AWA).",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay.',
        "Pre-existing conditions aren't covered; your certificate has the look-back.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Check your certificate for exclusions and dollar limits, including hospital, emergency, maternity, preventive, prescription, and mental health and substance use care.",
        "It doesn't follow ACA rules, so if it ends you may have to wait for open enrollment. It isn't renewable or extendable and ends at the end of the paid period in which you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership dues, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    allstate_ha: {
      paras: [
        'Your plan uses the First Health Network for discounts, and the plan pays the same in or out of network.',
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and offered through the LIFE Association.",
        'Your bill will show Neo Health Solutions.',
        "This is a private fixed indemnity limited medical plan, not an ACA or major medical plan. It doesn't cover mental illness or substance abuse, weight-loss surgery, cosmetic care, eye exams and glasses, routine hearing care, sleep or chronic pain disorders, experimental treatment, hazardous activities, or care outside the U.S. or Canada.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the year before you start, including a pregnancy, aren't covered for your first 12 months. Preventive visits have a 3-month wait; injuries and sickness have none.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover mental illness or substance abuse, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    tdk_45: {
      paras: [
        "Your plan uses the First Health network. Doctor visits and preventive care are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        'Detego Health administers the plan, and you join Healthcare Data Analytics (HCDA) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "This is a private, limited group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. There's no out-of-pocket maximum, and visit limits reset each 12-month benefit year.",
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital, surgery, ER and ambulance benefits for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc, the pharmacy benefit and emergencies.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Labs and X-rays are discount only.",
        "You'll do about 8 to 10 short Working Owner activities a year, like health surveys, to keep your coverage. You'll get K-1 tax documents by email.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_45_2: {
      paras: [
        "Your plan uses the First Health network. Doctor visits and preventive care are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        'Detego Health administers the plan, and you join Healthcare Data Analytics (HCDA) as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show FirstEnroll.',
        "This is a private, limited group health plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. There's no out-of-pocket maximum, and visit limits reset each 12-month benefit year.",
        "Pre-existing conditions from the 12 months before you start aren't covered by the hospital, surgery, ER and ambulance benefits for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc, the pharmacy benefit and emergencies.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. Labs and X-rays are discount only.",
        "You'll do about 8 to 10 short Working Owner activities a year, like health surveys, to keep your coverage. You'll get K-1 tax documents by email.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    hd: {
      paras: [
        'Your plan uses the First Health Limited Benefit Plan Network.',
        "It's underwritten by ManhattanLife Insurance and Annuity Company and offered through The Health Depot Association.",
        'Your bill will show Premier Health Solutions, or PHS-HEALTH-BILL.',
        "This is a private, limited-benefit group hospital indemnity plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start, including complications, aren't covered until you've had the plan 12 months in a row.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Premier Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ HD HealthAscent monthly membership, which includes the insurance and your Health Depot Association membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show "PHS-HEALTH-BILL," "PHSHEALTH" or "HEALTHPHS," depending on your bank.'
    },
    smartchoice: {
      paras: [
        "Your plan uses the First Health network, in-network only. Out-of-network care isn't covered, except emergencies.",
        'Detego Health administers the plan, and you join Population Science Management USA as a Working Owner. A federal law called ERISA governs the plan.',
        'Your bill will show Neo Health Solutions.',
        'I do want to clarify that this is a private, limited medical plan, not an ACA or major medical plan, and it does not provide coverage for maternity, or substance abuse for drugs and alcohol.',
        'Every benefit has limits; past a limit, you pay. Your out-of-pocket limit only counts in-network covered care.',
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity or substance abuse, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    pinnacle_stm: {
      paras: [
        "It's not a network plan, so you can use any doctor or hospital, and you also get the PHCS Practitioner and Ancillary network from MultiPlan. Facilities are paid no more than 150% of Medicare, and they can bill you the rest.",
        "It's underwritten by Everest Reinsurance Company and offered through the American Workers Association (AWA).",
        'Your bill will show Neo Health Solutions.',
        "This is private short-term medical, not an ACA or major medical plan. It doesn't cover maternity, or substance abuse for drugs and alcohol.",
        'Every benefit has limits; past a limit, you pay. Your out-of-pocket maximum caps only your coinsurance; your deductible, copays, additional deductibles and pre-certification penalty are on top.',
        "Pre-existing conditions from the 60 months before you start aren't covered for your first 12 months. Sickness has a 5-day wait and cancer 30 days; injuries have none. Some surgeries aren't covered your first 6 months.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "This is temporary coverage for 6 months or 364 days. It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity or substance abuse, and your bill will show Neo Health Solutions?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Pinnacle insurance premium, $___ one-time AWA (American Workers Association) association fee, $___ AWA monthly membership fee, if one applies, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    hcs: {
      paras: [
        'Your plan uses the MultiPlan network for discounts.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA or major medical plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Health Choice Silver insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll. The first month membership fee will be billed today and you agree to be automatically billed each month for the future monthly membership fees.'
    },
    paramount_123: {
      paras: [
        "There's no network, so you can see any licensed provider. Your Medical Bill Repricing (MBR) service isn't insurance, can't guarantee payment, and providers can decline it.",
        "It's underwritten by BCS Insurance Company and offered through the Business Workers of America (BWA).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit hospital indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum. At age 70, all benefit amounts drop to 75%.',
        "Pre-existing conditions from the 12 months before you start can be excluded for your first 12 months. There's no benefit waiting period.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. If anything I've said differs from your written terms, the written terms govern.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ BCS hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    paramount_456: {
      paras: [
        "There's no network, so you can see any licensed provider. Your membership includes a Medical Bill Repricing (MBR) service, which isn't insurance, can't guarantee payment, and providers can decline it.",
        "It's offered through the Business Workers of America (BWA). BCS Insurance Company underwrites the insurance, and Sharewell Health Share is health care sharing, not insurance.",
        'Your bill will show Your Benefit Plan, from FirstEnroll.',
        "This is a private, limited-benefit plan, not an ACA, major medical or Medicare supplement plan: BCS hospital indemnity insurance, the Sharewell Health Share and the MBR service. It doesn't cover maternity, substance abuse or psychiatric care.",
        "Every benefit has limits; past a limit, you pay. The insurance pays set amounts, with no out-of-pocket maximum, and drops to 75% at age 70. With Sharewell, you pay the Unshared Amount before sharing starts, and anything it doesn't share is yours.",
        "Pre-existing conditions from the 12 months before you start can be excluded from the insurance for your first 12 months; there's no benefit waiting period. For Sharewell, anything from the 24 months before you join isn't shared your first year, then it's capped per need at $30,000 in year two, $60,000 in year three and $150,000 in year four.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered. If anything I've said differs from your written terms, the written terms govern.",
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show Your Benefit Plan, from FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ BCS hospital indemnity insurance, $___ Sharewell Health Share, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. FirstEnroll bills you on behalf of the Business Workers of America, and your statement shows Your Benefit Plan.'
    },
    harmony: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Harmony Care insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_2: {
      paras: [
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE).",
        'Your bill will show FirstEnroll.',
        "This is a private, limited-benefit fixed indemnity plan, not an ACA, major medical or Medicare supplement plan. It doesn't cover maternity, substance abuse or psychiatric care.",
        'Every benefit has limits; past a limit, you pay. It pays set amounts, with no out-of-pocket maximum.',
        "Pre-existing conditions from the 12 months before you start aren't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Your Schedule of Benefits lists what the plan pays for each service, and anything not listed there isn't covered.",
        'Benefits run on a 12-month year from your start date, and premiums may go up at renewal.',
        "Do you understand that this isn't major medical or an ACA plan, it has limits, it doesn't cover maternity, substance abuse or psychiatric care, and your bill will show FirstEnroll?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Harmony Care insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    }
  },
  hide: ['AWA SimpleShield', 'HealthEssential', 'HealthBoost', 'AdvantCare 50']
};
