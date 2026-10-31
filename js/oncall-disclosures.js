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
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company. It's offered through your membership in the Affiliated Workers Association (AWA).",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "AWA TrueHealth Value is a private association membership with limited benefit hospital indemnity insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything a doctor treated or prescribed for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company. It's offered through your membership in the Affiliated Workers Association (AWA).",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "AWA TrueHealth 1 is a private association membership with limited benefit hospital indemnity insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything a doctor treated or prescribed for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_3: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company. It's offered through your membership in the Affiliated Workers Association (AWA).",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "AWA TrueHealth 2 is a private association membership with limited benefit hospital indemnity insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything a doctor treated or prescribed for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_4: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company. It's offered through your membership in the Affiliated Workers Association (AWA).",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "AWA TrueHealth 3 is a private association membership with limited benefit hospital indemnity insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything a doctor treated or prescribed for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_5: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the MultiPlan Limited Benefit Plan Network, a discount network.',
        "It's underwritten by Unified Life Insurance Company. It's offered through your membership in the Affiliated Workers Association (AWA).",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "AWA TrueHealth 4 is a private association membership with limited benefit hospital indemnity insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything a doctor treated or prescribed for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait (not in Idaho or Texas).",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    ghdp_45: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health Network for doctor and wellness visits. Those visits must be in-network. Out-of-network services aren't covered. Hospital benefits aren't limited to the network.",
        "Merchants Benefit Administration (MBA) administers the plan. It's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate. The plan is governed by ERISA, a federal law.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        'Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays set amounts, and anything above them is your cost. Benefits and visit counts reset every July 1. So your first plan year may be shorter than 12 months.',
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital, surgery, ER and ambulance benefits for your first 12 months. Sickness has a 30-day wait.",
        "Anything not listed in your schedule of benefits isn't covered. NICU care and preventive services at a hospital aren't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ GoodHealth plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    sigma: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through your membership in the National Congress of Employers (NCE).",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Sigma Care PLUS is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Sigma Care PLUS insurance premium, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    sigma_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through your membership in the National Congress of Employers (NCE).",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Sigma Care PLUS is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Sigma Care PLUS insurance premium, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    nexus_ppo: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the Cigna PPO for Shared Administration network. You can go out of network, but you'll pay more.",
        "It's underwritten by The North River Insurance Company. It's offered through the Communicating for America Association.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "NexusCare PPO STM is a private short-term medical insurance plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over, including the coverage period maximum; past a limit the plan pays nothing more. In network, your out-of-pocket maximum is met once you meet your deductible, except for the $250 ER copay. Out of network, there's no out-of-pocket maximum. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered; your certificate has the definition and look-back. Sickness in your first 3 days and cancer in your first 30 days aren't covered.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It doesn't have to follow ACA rules. If it ends or you lose eligibility, you may have to wait for open enrollment to get other coverage.",
        '( Nevada residents only, read word for word: ) YOU MAY BE ELIGIBLE FOR A SUBSIDY IF PURCHASING A "QUALIFIED HEALTH PLAN" WHICH PROVIDES MORE COVERAGE AT POSSIBLY A LOWER COST. FOR MORE INFORMATION, PLEASE CHECK: https://www.nevadahealthlink.com/',
        'Coverage lasts for the term you select and ends at the end of the paid period in which you turn 65.\n( MO and OK residents only, also say: ) This policy is not renewable or extendable.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ Communicating for America Association membership, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month; rates can change in later periods if you select multiple durations. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    risehealth: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Plan Network.',
        "It's underwritten by American Financial Security Life Insurance Company or Standard Life and Casualty Insurance Company, depending on your state. It's offered through the National Congress of Employers, or NCE.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "RiseHealth STM is private short-term medical group insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. All benefits are limited to usual, reasonable and customary amounts. Your $2,000 coinsurance limit caps only your coinsurance. It isn't an out-of-pocket maximum. Your deductible, copays, additional deductibles and anything over a benefit limit are on top of it. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered. On a new policy for another term, anything from the earlier term counts as pre-existing.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It doesn't have to follow ACA rules. If it ends or you lose eligibility, you may have to wait for open enrollment to get other coverage.",
        "It isn't renewable or extendable. But while you keep paying, a new policy can be issued every 6 or 12 months, up to 36 months total. Rates can go up each term based on your age. Coverage ends at the end of the paid period in which you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    allstate_stm: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the Aetna Open Choice PPO network for doctors and hospitals. Out of network, your deductible and coinsurance limit double. The coinsurance percentage stays the same, and copays don't apply.",
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state. It's offered through the LIFE Association. The membership isn't the insurance.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement. Your monthly payment is charged to your payment method on file each month after today.",
        "The Allstate Enhanced STM PPO Plan is private short-term medical insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. Your coinsurance out-of-pocket limit caps only your coinsurance. Your deductible, copays, access fees and anything over a benefit limit are on top of it.",
        "Pre-existing conditions: this plan is medically underwritten and doesn't cover them.",
        "Your certificate lists all exclusions and limitations and controls your benefits. Anything not in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    allstate_stm_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the Aetna Open Choice PPO network for doctors and hospitals. Out of network, your deductible and coinsurance limit double. The coinsurance percentage stays the same, and copays don't apply.",
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state. It's offered through the LIFE Association. The membership isn't the insurance.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement. Your monthly payment is charged to your payment method on file each month after today.",
        "The Allstate Copay Enhanced STM PPO Plan is private short-term medical insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. Your coinsurance out-of-pocket limit caps only your coinsurance. Your deductible, copays, access fees and anything over a benefit limit are on top of it.",
        "Pre-existing conditions: this plan is medically underwritten and doesn't cover them.",
        "Your certificate lists all exclusions and limitations and controls your benefits. Anything not in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    allstate_stm_3: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the Aetna Open Choice PPO network for doctors and hospitals. Out of network, your deductible and coinsurance limit double. The coinsurance percentage stays the same, and copays don't apply.",
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state. It's offered through the LIFE Association. The membership isn't the insurance.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement. Your monthly payment is charged to your payment method on file each month after today.",
        "The Allstate Essentials STM PPO Plan is private short-term medical insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. Your coinsurance out-of-pocket limit caps only your coinsurance. Your deductible, copays, access fees and anything over a benefit limit are on top of it.",
        "Pre-existing conditions: this plan is medically underwritten and doesn't cover them.",
        "Your certificate lists all exclusions and limitations and controls your benefits. Anything not in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    advantcare: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the MultiPlan PPO Network for your covered care, and it's in-network only.",
        "Aither Health is the plan administrator. It's offered through Consumer Data Partners, LP, doing business as VistaWell. You join as a Limited Partner of Consumer Data Partners. The plan has the federal protections of ERISA.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "AdvantCare is a private group health plan. It's not an ACA plan and not major medical. It does not cover labor and delivery, or inpatient mental health and substance abuse treatment. Every benefit has the limits we went over; past a limit the plan pays nothing more. There's no deductible, and your out-of-pocket maximum is for in-network services only.",
        "Anything not listed in your schedule of benefits isn't covered. Services at a hospital, including preventive care and doctor visits, aren't covered unless your schedule says so. Partial hospitalization isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee (only if your quote shows one), $___ for ___ add-on, if any. Then $___ a month, drafted automatically from the card or bank account you give me. Billing is through Premier Health Solutions, LLC; your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    advantcare_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the MultiPlan PPO Network for your covered care, and it's in-network only.",
        "Aither Health is the plan administrator. It's offered through Consumer Data Partners, LP, doing business as VistaWell. You join as a Limited Partner of Consumer Data Partners. The plan has the federal protections of ERISA.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "AdvantCare is a private group health plan. It's not an ACA plan and not major medical. It does not cover labor and delivery, or inpatient mental health and substance abuse treatment. Every benefit has the limits we went over; past a limit the plan pays nothing more. There's no deductible, and your out-of-pocket maximum is for in-network services only.",
        'Pre-existing conditions: the hospital benefit never covers anything you got care or advice for, or had symptoms of, in the 12 months before you start.',
        "Anything not listed in your schedule of benefits isn't covered. Services at a hospital, including preventive care and doctor visits, aren't covered unless your schedule says so. Partial hospitalization isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee (only if your quote shows one), $___ for ___ add-on, if any. Then $___ a month, drafted automatically from the card or bank account you give me. Billing is through Premier Health Solutions, LLC; your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    ghdp_123: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health Network for doctor and wellness visits. Those visits must be in-network. Out-of-network services aren't covered. Hospital benefits aren't limited to the network.",
        "Merchants Benefit Administration (MBA) is the plan and claims administrator. Benefits are paid from the plan sponsor's own assets. It's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate. The plan is governed by ERISA, a federal law.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        "Every benefit has the limits we went over. Past a limit, the plan pays nothing more. Once you use your visits for the year, the rest is your cost. The same goes when a bill goes over the per-visit maximum. That's true even in-network, and the plan doesn't reprice or discount it. Benefits and visit counts reset every July 1. So your first plan year may be shorter than 12 months.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital benefit for your first 12 months. Sickness has a 30-day wait.",
        "Anything not listed in your schedule of benefits isn't covered. GoodHealth 1, 2 and 3 have no emergency room, ambulance or surgery benefit. NICU care and preventive services at a hospital aren't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    ghdp_123_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health Network for doctor and wellness visits. Those visits must be in-network. Out-of-network services aren't covered. Hospital benefits aren't limited to the network.",
        "Merchants Benefit Administration (MBA) is the plan and claims administrator. Benefits are paid from the plan sponsor's own assets. It's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate. The plan is governed by ERISA, a federal law.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        "Every benefit has the limits we went over. Past a limit, the plan pays nothing more. Once you use your visits for the year, the rest is your cost. The same goes when a bill goes over the per-visit maximum. That's true even in-network, and the plan doesn't reprice or discount it. Benefits and visit counts reset every July 1. So your first plan year may be shorter than 12 months.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital benefit for your first 12 months. Sickness has a 30-day wait.",
        "Anything not listed in your schedule of benefits isn't covered. GoodHealth 1, 2 and 3 have no emergency room, ambulance or surgery benefit. NICU care and preventive services at a hospital aren't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    ghdp_123_3: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health Network for doctor and wellness visits. Those visits must be in-network. Out-of-network services aren't covered. Hospital benefits aren't limited to the network.",
        "Merchants Benefit Administration (MBA) is the plan and claims administrator. Benefits are paid from the plan sponsor's own assets. It's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate. The plan is governed by ERISA, a federal law.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "-MedFirst/GoodHealth/ (Say whatever plan you're selling) is a limited-benefit MEC. It is NOT an ACA plan nor a major-medical or comprehensive coverage. It has a $0 deductible and no out-of-pocket maximum and it does not provide coverage for maternity, substance abuse, or psychiatric services.", // lineup-guard-ignore: script name
        "Every benefit has the limits we went over. Past a limit, the plan pays nothing more. Once you use your visits for the year, the rest is your cost. The same goes when a bill goes over the per-visit maximum. That's true even in-network, and the plan doesn't reprice or discount it. Benefits and visit counts reset every July 1. So your first plan year may be shorter than 12 months.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital benefit for your first 12 months. Sickness has a 30-day wait.",
        "Anything not listed in your schedule of benefits isn't covered. GoodHealth 1, 2 and 3 have no emergency room, ambulance or surgery benefit. NICU care and preventive services at a hospital aren't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    awp: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through your membership in the National Congress of Employers (NCE).",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Advanced Wellness PLUS is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    awp_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through your membership in the National Congress of Employers (NCE).",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Advanced Wellness PLUS is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    americare: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the PHCS network for repricing. To find a PHCS provider, call 888-371-7427 or visit multiplan.com. Your membership's Medical Bill Repricing service isn't insurance. It doesn't guarantee payment. You need to use in-network providers to get network rates.",
        "It's underwritten by American Public Life Insurance Company. It's offered through the Business Workers of America (BWA). It's an employee welfare benefit plan through the association, so a federal law called ERISA applies.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "BWA AmeriCare is a private, limited-benefit hospital indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum. You pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services. It also doesn't replace workers' compensation insurance.",
        "Pre-existing conditions: there's no pre-existing exclusion period. For your first 6 months, the plan pays nothing for hernia, adenoids, tonsils, varicose veins, appendix or reproductive-organ disorders, except emergencies.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ American Public Life hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    americare_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the PHCS network for repricing. To find a PHCS provider, call 888-371-7427 or visit multiplan.com. Your membership's Medical Bill Repricing service isn't insurance. It doesn't guarantee payment. You need to use in-network providers to get network rates.",
        "It's underwritten by American Public Life Insurance Company. It's offered through the Business Workers of America (BWA). It's an employee welfare benefit plan through the association, so a federal law called ERISA applies.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "BWA AmeriCare is a private, limited-benefit hospital indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum. You pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services. It also doesn't replace workers' compensation insurance.",
        "Pre-existing conditions: there's no pre-existing exclusion period. For your first 6 months, the plan pays nothing for hernia, adenoids, tonsils, varicose veins, appendix or reproductive-organ disorders, except emergencies.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ American Public Life hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    wb: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network. Doctor, specialist, urgent care and preventive visits are paid in network only.',
        "Merchants Benefit Administration (MBA) administers it. It's offered through the Wellness Brands Health Plan, sponsored by Wellness Brands Management LLC. It's an employer-sponsored group health plan for eligible employees and Working Owners. You join Good Life Partners, LP as a Limited Partner.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement. Your contribution is charged monthly. It's due on the first, with a 31-day grace period.",
        "WB Choice is a private, scheduled fixed indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. Because it pays fixed amounts, the federal No Surprises Act doesn't apply. So providers may bill you above what the plan pays, unless your state law says otherwise. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: hospital stays and surgeries aren't paid for your first 12 months for anything you got care or advice for in the 12 months before you start. Sickness has a 30-day wait; accidents are covered right away.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ WB ___ monthly contribution, $___ one-time enrollment fee if one applies, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    wb_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network. Doctor, specialist, urgent care and preventive visits are paid in network only.',
        "Merchants Benefit Administration (MBA) administers it. It's offered through the Wellness Brands Health Plan, sponsored by Wellness Brands Management LLC. It's an employer-sponsored group health plan for eligible employees and Working Owners. You join Good Life Partners, LP as a Limited Partner.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement. Your contribution is charged monthly. It's due on the first, with a 31-day grace period.",
        "WB Select is a private, scheduled fixed indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. Because it pays fixed amounts, the federal No Surprises Act doesn't apply. So providers may bill you above what the plan pays, unless your state law says otherwise. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: hospital stays and surgeries aren't paid for your first 12 months for anything you got care or advice for in the 12 months before you start. Sickness has a 30-day wait; accidents are covered right away.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ WB ___ monthly contribution, $___ one-time enrollment fee if one applies, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    ghdp_wellness: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network, in-network only.',
        "Merchants Benefit Administration (MBA) administers the plan. Benefits are paid from the plan sponsor's own assets. It's a group health plan for Working Owners. Working Owners join Good Health Distribution Partners (GHDP) as a Limited Partner or affiliate. The plan is governed by ERISA, a federal law.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "GoodHealth Wellness is a private, self-funded preventive care plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. The plan year runs 7/1 to 6/30. Benefits and visit counts reset every July 1. So your first year may be shorter. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        'Sickness has a 30-day wait.',
        "Anything not listed in your schedule of benefits isn't covered. There are no benefits for sick visits, specialists, urgent care, the emergency room or hospital stays. Preventive services at a hospital aren't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    tvp: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for preventive and doctor services. Out-of-network preventive and doctor services aren't covered. Search providerlocator.com with code FHMBA, or call (800) 226-5116.",
        'Merchants Benefit Administration (MBA) is the administrator of the health plan. Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit. You join the VP Limited Partnership as a Limited Partner. The Vitamin Patch, LLC is the general partner.',
        "Your monthly billing is handled through Premier Health Solutions, which is the name you'll see on your statement.",
        "TVP Health Plan is a private group health plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays only up to the per-visit maximum. Anything above that is yours to pay. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered by the hospital benefit. Sickness has a 30-day wait.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Coverage ends at 65 for members and spouses, and at 26 for children.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Premier Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tvp_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for preventive and doctor services. Out-of-network preventive and doctor services aren't covered. Search providerlocator.com with code FHMBA, or call (800) 226-5116.",
        'Merchants Benefit Administration (MBA) is the administrator of the health plan. Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit. You join the VP Limited Partnership as a Limited Partner. The Vitamin Patch, LLC is the general partner.',
        "Your monthly billing is handled through Premier Health Solutions, which is the name you'll see on your statement.",
        "TVP Health Plan is a private group health plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays only up to the per-visit maximum. Anything above that is yours to pay. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered by the hospital benefit. Sickness has a 30-day wait.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Coverage ends at 65 for members and spouses, and at 26 for children.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Premier Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tvp_3: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for preventive and doctor services. Out-of-network preventive and doctor services aren't covered. Search providerlocator.com with code FHMBA, or call (800) 226-5116.",
        'Merchants Benefit Administration (MBA) is the administrator of the health plan. Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit. You join the VP Limited Partnership as a Limited Partner. The Vitamin Patch, LLC is the general partner.',
        "Your monthly billing is handled through Premier Health Solutions, which is the name you'll see on your statement.",
        "TVP Health Plan is a private group health plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays only up to the per-visit maximum. Anything above that is yours to pay. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered by the hospital benefit. Sickness has a 30-day wait.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Coverage ends at 65 for members and spouses, and at 26 for children.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Premier Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    galena: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health and MultiPlan networks.',
        "It's underwritten by Southern Guaranty Insurance Company, SGIC. It's offered through the Association for Responsible Planners, or AFRP.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "The Galena plan is a private short-term medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. Your coinsurance maximum caps coinsurance only. Your deductible, copays and anything over a benefit limit are on top of it. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered. Sickness has a 5-day wait and cancer 30 days; injuries are covered the next day. Some surgeries aren't covered your first 6 months; your certificate lists them.",
        "Anything not in your schedule of benefits isn't covered. Your term is 12 months. You can auto re-apply for up to 3 terms or 36 months.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Galena plan, $___ AFRP membership if a monthly fee applies, $___ one-time AFRP association fee, $___ ___ add-on if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    smarthealth_trad: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the PHCS network from MultiPlan. You can see doctors in or out of network.',
        "It's underwritten by Standard Life and Casualty Insurance Company or American Financial Security Life Insurance Company, depending on your state. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "SmartHealth Traditional is a private short-term medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. Your coinsurance limit caps coinsurance only. Your deductible, copays, anything over a benefit limit and amounts above the usual and customary charge are on top of it. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care, advice, tests or a prescription for, or had symptoms of, in the 36 months before you start isn't covered. Sickness has a 5-day wait and cancer 30 days; injuries have none.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Coverage can run up to 36 months.',
        'Your payment is collected on your bill date each month.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time association fee, $___ Pre-Existing Waiver Rider and $___ ___ if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    access: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the MultiPlan PHCS network. You can see providers in or out of network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Access Health is a private short-term medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. Your coinsurance limit caps coinsurance only. Your deductible and anything over a benefit limit are on top of it. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you saw a doctor about, were tested or treated for, took prescription medicine for, or had symptoms of in the 36 months before you start isn't covered. Illness must start more than 5 days after you start, and cancer more than 30 days; injuries have no wait.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It doesn't have to follow ACA rules. If it ends or you lose eligibility, you may have to wait for open enrollment to get other coverage.",
        'Coverage ends on the last day your premium is paid, at age 65, or when your Medicare starts.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ Pre-Existing Waiver Rider or ___ if chosen. Then $___ a month. Your statement shows FirstEnroll.'
    },
    nexus_base: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "There's no provider network. You can see any provider, and the plan pays its own eligible-expense amounts, called reference-based pricing.",
        "It's underwritten by The North River Insurance Company. It's offered through the Communicating for America Association.",
        "Your monthly billing is handled through Premier Health Solutions, which is the name you'll see on your statement.",
        "NexusCare Base STM is a private short-term medical insurance plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. Once you meet your deductible, your out-of-pocket maximum is met. Then the plan pays 100% of eligible expenses, except copays, up to the coverage period maximum. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered; your certificate has the definition and look-back. Sickness in your first 3 days and cancer in your first 30 days aren't covered.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It doesn't have to follow ACA rules. If it ends or you lose eligibility, you may have to wait for open enrollment to get other coverage.",
        '\u25b6 ( Nevada residents only: )\nYOU MAY BE ELIGIBLE FOR A SUBSIDY IF PURCHASING A "QUALIFIED HEALTH PLAN" WHICH PROVIDES MORE COVERAGE AT POSSIBLY A LOWER COST. FOR MORE INFORMATION, PLEASE CHECK: https://www.nevadahealthlink.com/',
        'Coverage ends at the end of the paid period in which you turn 65. Dependents come off at 26.\n\u25b6 ( MO, NC, OK, TX only: )\nThis policy is not renewable or extendable.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Premier Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ association membership, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    pinnacle_protect: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'There are no network requirements, and the plan pays the same either way. You also get access to the PHCS Practitioner and Ancillary network from MultiPlan.',
        "It's underwritten by Everest Reinsurance Company. InsuranceTPA.com handles claims. It's offered through the American Workers Association, or AWA.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "Pinnacle Protect is a private fixed indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered for the number of months in your Schedule of Benefits. Critical illness has a 30-day wait, and other waits are in your Schedule. A condition diagnosed during a wait isn't covered.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It's renewable but ends at the end of the month you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership if a monthly fee applies, $___ one-time AWA association fee, $___ ___ add-on if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    smarthealth_ltd: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the PHCS network from MultiPlan. You can see doctors in or out of network.',
        "It's underwritten by Standard Life and Casualty Insurance Company or American Financial Security Life Insurance Company, depending on your state. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "SmartHealth Limited is a private short-term medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. Hospital, surgery and ER benefits pay only up to fixed dollar amounts. Anything above is yours. Your coinsurance limit caps coinsurance only. Your deductible, copays, anything over a benefit limit and amounts above the usual and customary charge are on top of it. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care, advice, tests or a prescription for, or had symptoms of, in the 36 months before you start isn't covered. Sickness has a 5-day wait and cancer 30 days; injuries have none.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Coverage can run up to 36 months.',
        'Your payment is collected on your bill date each month.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time association fee, $___ Pre-Existing Waiver Rider and $___ ___ if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the Cigna Healthcare PPO network. Office visits are covered in-network only.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state. Administrative Concepts, Inc. handles claims. It's offered through the American Workers Association, or AWA.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "HarborSTM Essential is a private short-term medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. Your plan has a $5,000 in-network coinsurance limit. Your deductible, copays, access fees and anything over a plan limit don't count toward it. Out-of-network care has no limit. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care, tests or a prescription for, or had symptoms of, in the 5 years before you start isn't covered. Sickness has a 5-day wait, and cancer and wellness 30 days; injuries have none.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the Cigna Healthcare PPO network. Office visits are covered in-network only.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state. Administrative Concepts, Inc. handles claims. It's offered through the American Workers Association, or AWA.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "HarborSTM Access is a private short-term medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. Your plan has a $5,000 in-network coinsurance limit. Your deductible, copays, access fees and anything over a plan limit don't count toward it. Out-of-network care has no limit. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care, tests or a prescription for, or had symptoms of, in the 5 years before you start isn't covered. Sickness has a 5-day wait, and cancer and wellness 30 days; injuries have none.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor_3: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the Cigna Healthcare PPO network. Office visits are covered in-network only.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state. Administrative Concepts, Inc. handles claims. It's offered through the American Workers Association, or AWA.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "HarborSTM Secure is a private short-term medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit the plan pays nothing more. Your plan has a $5,000 in-network coinsurance limit. Your deductible, copays, access fees and anything over a plan limit don't count toward it. Out-of-network care has no limit. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care, tests or a prescription for, or had symptoms of, in the 5 years before you start isn't covered. Sickness has a 5-day wait, and cancer and wellness 30 days; injuries have none.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    risehealth_lite: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Plan Network.',
        "It's underwritten by American Financial Security Life Insurance Company or Standard Life and Casualty Insurance Company, depending on your state. It's offered through the National Congress of Employers, or NCE.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "RiseHealth STM ___ is private short-term medical group insurance. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. Your coinsurance limit caps only your coinsurance. It isn't an out-of-pocket maximum. Your deductible, copays and anything over a benefit limit are on top of it. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered. On a new policy for another term, anything from the earlier term counts as pre-existing.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "It doesn't have to follow ACA rules. If it ends or you lose eligibility, you may have to wait for open enrollment to get other coverage.",
        "It isn't renewable or extendable. But while you keep paying, a new policy can be issued every 6 or 12 months, up to 36 months total. Rates can go up each term based on your age. Coverage ends at the end of the paid period in which you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tdk_123: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for doctor visits and preventive care. Those are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        "Detego Health is the plan and claims administrator. You join Healthcare Data Analytics, or HCDA, as a Working Owner. A federal law called ERISA governs the plan. You'll get K-1 tax documents by email.",
        "Your monthly billing is handled through First Enroll, which is the name you'll see on your statement.",
        "TDK 1 is a private limited group health plan. It's not an ACA plan and not major medical. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. Visit limits reset each 12-month benefit year.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital benefit for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered. There's no emergency room, ambulance or outpatient surgery benefit. Lab work, X-rays and imaging aren't covered; you only get discounted pricing.",
        'Coverage can end if you skip the required Working Owner activities. There are about 8 to 10 short ones a year, like health surveys.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see First Enroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_123_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for doctor visits and preventive care. Those are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        "Detego Health is the plan and claims administrator. You join Healthcare Data Analytics, or HCDA, as a Working Owner. A federal law called ERISA governs the plan. You'll get K-1 tax documents by email.",
        "Your monthly billing is handled through First Enroll, which is the name you'll see on your statement.",
        "TDK 2 is a private limited group health plan. It's not an ACA plan and not major medical. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. Visit limits reset each 12-month benefit year.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital benefit for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered. There's no emergency room, ambulance or outpatient surgery benefit. Lab work, X-rays and imaging aren't covered; you only get discounted pricing.",
        'Coverage can end if you skip the required Working Owner activities. There are about 8 to 10 short ones a year, like health surveys.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see First Enroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_123_3: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for doctor visits and preventive care. Those are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        "Detego Health is the plan and claims administrator. You join Healthcare Data Analytics, or HCDA, as a Working Owner. A federal law called ERISA governs the plan. You'll get K-1 tax documents by email.",
        "Your monthly billing is handled through First Enroll, which is the name you'll see on your statement.",
        "TDK 3 is a private limited group health plan. It's not an ACA plan and not major medical. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. Visit limits reset each 12-month benefit year.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital benefit for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered. There's no emergency room, ambulance or outpatient surgery benefit. Lab work, X-rays and imaging aren't covered; you only get discounted pricing.",
        'Coverage can end if you skip the required Working Owner activities. There are about 8 to 10 short ones a year, like health surveys.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see First Enroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    harmony_plus: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 100A is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 100 is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_3: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 200 is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_4: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 200+ is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_5: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 300 is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_6: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 500 is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_7: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 750 is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_8: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care + 1000 is a private, limited-benefit fixed indemnity plan. It's not an ACA plan, not major medical and not a Medicare supplement. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered. Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    primeprotect: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan gives you access to the First Health Network and the Hooray Health Network of retail clinics and urgent care centers.',
        "It's underwritten by National Guardian Life Insurance Company.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "PrimeProtect ___ is a private fixed indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum. You pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    primeprotect_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan gives you access to the First Health Network and the Hooray Health Network of retail clinics and urgent care centers.',
        "It's underwritten by National Guardian Life Insurance Company.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "PrimeProtect ___ is a private fixed indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum. You pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Anything not listed in your schedule of benefits isn't covered. The critical illness benefit isn't paid for a condition first diagnosed in your first 30 days of coverage. It pays once per person. It doesn't pay for a recurring illness.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    crownpoint: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the PHCS Practitioner & Ancillary Network from MultiPlan.',
        "It's underwritten by Everest Reinsurance Company. It's offered through the Affiliated Workers Association, or AWA.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "CrownPoint STM is a private short-term medical group insurance plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over. Past a limit, the plan pays nothing more. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions aren't covered; your certificate has the definition and look-back.",
        "Anything not listed in your schedule of benefits isn't covered. Check your certificate for exclusions and limits on things like hospitalization, emergency services, maternity care, preventive care, prescription drugs, and mental health and substance use care. Also check it for any dollar limits.",
        "It doesn't have to follow ACA rules. If it ends or you lose eligibility, you may have to wait for open enrollment to get other coverage.",
        "This short-term coverage isn't renewable or extendable. It ends at the end of the paid period in which you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership dues, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    allstate_ha: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Network for discounts. The plan pays the same fixed amount in or out of network.',
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state. It's offered through the LIFE Association.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement. Your payment method on file is charged each month after today.",
        "Allstate Health Access is a private fixed indemnity limited medical plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not cover mental illness or substance abuse, weight-loss surgery, cosmetic services, eye exams and glasses, routine hearing care, sleep disorders, chronic pain disorders, experimental treatment, hazardous activities, or care outside the United States or Canada.",
        "Pre-existing conditions: anything you got care, advice, tests or a prescription for, or had symptoms of, in the year before you start isn't covered for your first 12 months. That includes a pregnancy that exists before you start. Preventive visits have a 3-month wait; injuries and sickness have none.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    tdk_45: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for doctor visits and preventive care. Those are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        "Detego Health is the plan and claims administrator. You join Healthcare Data Analytics, or HCDA, as a Working Owner. A federal law called ERISA governs the plan. You'll get K-1 tax documents by email.",
        "Your monthly billing is handled through First Enroll, which is the name you'll see on your statement.",
        "TDK 4 is a private limited group health plan. It's not an ACA plan and not major medical. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. Visit limits reset each 12-month benefit year.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital, surgery, ER and ambulance benefits for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered. Lab work, X-rays and imaging aren't covered; you only get discounted pricing.",
        'Coverage can end if you skip the required Working Owner activities. There are about 8 to 10 short ones a year, like health surveys, most taking 5 to 15 minutes on your phone.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see First Enroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_45_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "Your plan uses the First Health network for doctor visits and preventive care. Those are in-network only, and preventive care at a hospital isn't covered. The hospital benefit isn't limited to the network.",
        "Detego Health is the plan and claims administrator. You join Healthcare Data Analytics, or HCDA, as a Working Owner. A federal law called ERISA governs the plan. You'll get K-1 tax documents by email.",
        "Your monthly billing is handled through First Enroll, which is the name you'll see on your statement.",
        "TDK 5 is a private limited group health plan. It's not an ACA plan and not major medical. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. Visit limits reset each 12-month benefit year.",
        "Pre-existing conditions: anything you got care or advice for, or had symptoms of, in the 12 months before you start isn't covered by the hospital, surgery, ER and ambulance benefits for your first 12 months. All benefits have a 30-day wait, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered. Lab work, X-rays and imaging aren't covered; you only get discounted pricing.",
        'Coverage can end if you skip the required Working Owner activities. There are about 8 to 10 short ones a year, like health surveys, most taking 5 to 15 minutes on your phone.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see First Enroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    hd: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Plan Network.',
        "It's underwritten by ManhattanLife Insurance and Annuity Company and offered through The Health Depot Association.",
        'Your monthly billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.',
        "HD HealthAscent is a private limited-benefit group hospital indemnity plan. It's not an ACA plan and not major medical. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay what it doesn't.",
        "Pre-existing conditions: anything you got care, advice or a prescription for, or had symptoms of, in the 12 months before you start isn't covered, including complications, until you've had the plan 12 months in a row.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ HD HealthAscent monthly membership, which includes the insurance and your Health Depot Association membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show "PHS-HEALTH-BILL," "PHSHEALTH" or "HEALTHPHS," depending on your bank.'
    },
    smartchoice: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health network, in-network only. Out-of-network care is your full cost, except emergencies.',
        'Detego Health is the plan administrator. You join Population Science Management USA as a Working Owner. A federal law called ERISA governs the plan.',
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "I do want to clarify that this is a private, limited medical plan, not an ACA or major medical plan, and it does not provide coverage for maternity, or substance abuse for drugs and alcohol. Every benefit has the limits we went over; past a limit the plan pays nothing more. Your out-of-pocket limit is for covered in-network services. Anything past the plan's limits, or not covered, doesn't count toward it.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ plan, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    pinnacle_stm: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "It's not a network plan, so you can use any doctor or hospital. You also get the PHCS Practitioner and Ancillary network from MultiPlan. For hospitals and other facilities, the plan pays no more than 150% of what Medicare allows. The facility can bill you for the rest.",
        "It's underwritten by Everest Reinsurance Company and offered through the American Workers Association, or AWA.",
        "Your monthly billing is handled through Neo Health Solutions, which is the name you'll see on your statement.",
        "Pinnacle Short Term Medical is private short-term medical insurance. It's not an ACA plan and not major medical. It does not provide coverage for maternity, or substance abuse for drugs and alcohol. Every benefit has the limits we went over; past a limit, the plan pays nothing more. Your out-of-pocket maximum caps only your coinsurance. Your deductible, copays and the additional deductibles are on top of it. So are the pre-certification penalty, and anything over a benefit limit or above what the plan allows.",
        "Pre-existing conditions: anything you got care, advice, tests or medication for, or had symptoms of, in the 60 months before you start isn't covered for your first 12 months. Sickness has a 5-day wait and cancer 30 days; injuries have none. Some surgeries aren't covered your first 6 months; your certificate lists them.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "This is temporary coverage for the term you choose, 6 months or 364 days. It isn't renewable and ends at the end of the month you turn 65.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see Neo Health Solutions on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Pinnacle insurance premium, $___ one-time AWA (American Workers Association) association fee, $___ AWA monthly membership fee, if one applies, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    hcs: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan gives you access to the MultiPlan network for discounts.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Health Choice Silver is a private limited-benefit fixed indemnity plan. It's not an ACA plan and not major medical. Every benefit has the limits we went over; past a limit, the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay what it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything a doctor treated or prescribed for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not in your schedule of benefits isn't covered.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Health Choice Silver insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll. The first month membership fee will be billed today and you agree to be automatically billed each month for the future monthly membership fees.'
    },
    paramount_123: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "There's no network, so you can see any licensed provider. The plan includes a Medical Bill Repricing (MBR) service. MBR isn't insurance and can't guarantee payment or the outcome of any claim. Providers can decline it.",
        "It's underwritten by BCS Insurance Company and offered through the Business Workers of America, or BWA.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "BWA Paramount is a private limited-benefit hospital indemnity plan. It's not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services. Every benefit has the limits we went over; past a limit, the plan pays nothing more. The insurance pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. At age 70, all insurance benefit amounts drop to 75%.",
        "Pre-existing conditions: on the insurance, a condition from the 12 months before you start can be excluded for your first 12 months. There's no benefit waiting period.",
        "Anything not listed in your schedule of benefits isn't covered. If there's ever a difference between what I've told you and the written membership and product terms, the written terms govern.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ BCS hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    paramount_456: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        "There's no network, so you can see any licensed provider. Your membership includes a Medical Bill Repricing (MBR) service. MBR isn't insurance and can't guarantee payment or the outcome of any claim. Providers can decline it.",
        "It's offered through the Business Workers of America, or BWA. BCS Insurance Company underwrites the insurance. Sharewell Health Share is health care sharing, not insurance. Anything it doesn't share is yours to pay.",
        'Your monthly billing is handled through FirstEnroll. The charge shows as Your Benefit Plan on your statement.',
        "BWA Paramount is a private limited-benefit plan. It's not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services. It's a BWA membership with three parts: BCS hospital indemnity insurance that pays fixed amounts, the Sharewell Health Share, and the MBR service. Every benefit has the limits we went over; past a limit, the plan pays nothing more. The insurance pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. At age 70, all insurance benefit amounts drop to 75%. With Sharewell, you pay the Unshared Amount of eligible expenses before sharing starts.",
        "Pre-existing conditions: on the insurance, a condition from the 12 months before you start can be excluded for your first 12 months. There's no benefit waiting period. For Sharewell, anything from the 24 months before you join isn't shared your first year. Then sharing for it is capped per need at $30,000 in year two, $60,000 in year three and $150,000 in year four, with no cap after that.",
        "Anything not listed in your schedule of benefits isn't covered. If there's ever a difference between what I've told you and the written membership and product terms, the written terms govern.",
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and FirstEnroll bills you, showing as Your Benefit Plan on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ BCS hospital indemnity insurance, $___ Sharewell Health Share, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. FirstEnroll bills you on behalf of the Business Workers of America, and your statement shows Your Benefit Plan.'
    },
    harmony: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care is a private limited-benefit fixed indemnity plan. It's not an ACA plan and not major medical. It's also not a Medicare supplement. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Harmony Care insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_2: {
      paras: [
        "Just for your records, here's a quick recap of what you'll see in your paperwork.",
        'Your plan uses the First Health Limited Benefit Network.',
        "It's underwritten by American Financial Security Life Insurance Company. WebTPA handles claims. It's offered through the National Congress of Employers, or NCE.",
        "Your monthly billing is handled through FirstEnroll, which is the name you'll see on your statement.",
        "Harmony Care is a private limited-benefit fixed indemnity plan. It's not an ACA plan and not major medical. It's also not a Medicare supplement. Every benefit has the limits we went over; past a limit the plan pays nothing more. It pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "Pre-existing conditions: anything you got care or advice for in the 12 months before you start isn't covered for your first 12 months. Sickness has a 30-day wait; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Benefits run on a 12-month coverage year from your effective date. Premiums may go up at renewal.',
        "Do you understand this isn't major medical or an ACA plan, it has the limits we went over, and you'll see FirstEnroll on your statement?\n\u25b6 ( Wait for answer )"
      ],
      bill: 'Your first payment is $___: $___ Harmony Care insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    }
  },
  hide: ['AWA SimpleShield', 'HealthEssential', 'HealthBoost', 'AdvantCare 50']
};
