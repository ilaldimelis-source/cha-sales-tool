// On Call Disclosures tab text (Oct 26 2026, approved by Mey).
// One short template per plan, read word for word before payment.
// map: 'Family|Tier' -> block id. A paragraph ending in the
// Wait for answer marker is a confirm question. hide: families
// kept off On Call (no reviewed script). Edit wording only with
// Mey's approval.
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
        'AWA TrueHealth Value is a private association membership with limited benefit hospital indemnity insurance, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Unified Life Insurance Company, and it's offered through your membership in the Affiliated Workers Association (AWA).",
        "It uses the MultiPlan Limited Benefit Plan Network, a discount network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Terms & Conditions The Group Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership, is not major medical or comprehensive medical insurance coverage, and is not an Essential Health Benefit Plan under the federal Affordable Care Act (ACA) nor a policy of Worker's Compensation under state law. AWA TrueHealth membership benefits and services are exempt from the requirements of the 2010 Federal Health Care Reform Law. This limited medical plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. There is a 12-month waiting period for pre-existing conditions for the Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership. Which means, if you have had care rendered or prescribed to you by a physician within 12 months of your effective date, you will have a waiting period for 12 months before any claims related to your condition will be covered. There is a 30-day waiting period for sickness under the Accident & Sickness Hospital Indemnity insurance and you will not receive benefits under such insurance for all covered sicknesses until your membership has been in effect for 30 days (not applicable for residents of ID and TX). In addition, normal pregnancy or childbirth is not covered under the Accident & Sickness Hospital Indemnity Policy. The following premium rates apply for the coverage underwritten by Unified Life Insurance Company included in the AWA TrueHealth Value membership. The premium rates by coverage election are: Member = $30.18, Member + Spouse = $60.37, Member + Child(ren) = $54.33, Family = $81.50. Coverage is subject to termination in accordance with the Association Group Master Policy provisions. Do you acknowledge and agree to the Terms & Conditions I read to you? Member must answer YES.\n( Wait for YES )",
        'UNIFIED LIFE INSURANCE COMPANY SPECIFIC DISCLAIMER You have applied to purchase a Unified Life Limited Benefit (LM) plan. Before your application can be processed you are required to read, and acknowledge your understanding of 7 facts regarding the LM plan offered by Unified. 1) This LM plan is not major medical insurance and should not be viewed as a substitute for major medical coverage. 2) This LM plan does not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." 3) This LM plan does not cover any pre-existing conditions. 4) This LM plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. 5) This LM plan has a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. 6) This LM plan has no prescription drug benefits. Prescription drug costs will not be covered under any circumstances. 7) This LM plan has a 30-day waiting period before coverage is provided. (Not applicable in TX or ID). THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. Do you acknowledge that I have read the 7 Unified Life Insurance Company Specific Disclaimer statements to you? Do your further acknowledge that you have no questions regarding any of the limitations and exclusions of the Unified Life LIMITED BENEFIT plan?\n( Wait for YES )',
        "Your membership has a 30-day examination period, which means you have thirty (30) days from your membership's effective date to review the program information and make any changes or cancel. If you wish to cancel during the examination period, you may be eligible to receive a refund of your first month's payment, as long as you have not utilized any services or filed any claims during that time period. The one-time enrollment fee is non-refundable. Do you understand the examination period? Member must answer YES.\n( Wait for YES )",
        'To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel on or after your billing date and that payment has drafted, your membership ends before the next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions, shown as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_2: {
      paras: [
        'AWA TrueHealth 1 is a private association membership with limited benefit hospital indemnity insurance, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Unified Life Insurance Company, and it's offered through your membership in the Affiliated Workers Association (AWA).",
        "It uses the MultiPlan Limited Benefit Plan Network, a discount network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Terms & Conditions The Group Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership, is not major medical or comprehensive medical insurance coverage, and is not an Essential Health Benefit Plan under the federal Affordable Care Act (ACA) nor a policy of Worker's Compensation under state law. AWA TrueHealth membership benefits and services are exempt from the requirements of the 2010 Federal Health Care Reform Law. This limited medical plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. There is a 12-month waiting period for pre-existing conditions for the Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership. Which means, if you have had care rendered or prescribed to you by a physician within 12 months of your effective date, you will have a waiting period for 12 months before any claims related to your condition will be covered. There is a 30-day waiting period for sickness under the Accident & Sickness Hospital Indemnity insurance and you will not receive benefits under such insurance for all covered sicknesses until your membership has been in effect for 30 days (not applicable for residents of ID and TX). In addition, normal pregnancy or childbirth is not covered under the Accident & Sickness Hospital Indemnity Policy. The following premium rates apply for the coverage underwritten by Unified Life Insurance Company included in the AWA TrueHealth 1 membership. The premium rates by coverage election are: Member = $43.55, Member + Spouse = $86.49, Member + Child(ren) = $77.84, Family = $116.76. Coverage is subject to termination in accordance with the Association Group Master Policy provisions. Do you acknowledge and agree to the Terms & Conditions I read to you? Member must answer YES.\n( Wait for YES )",
        'UNIFIED LIFE INSURANCE COMPANY SPECIFIC DISCLAIMER You have applied to purchase a Unified Life Limited Benefit (LM) plan. Before your application can be processed you are required to read, and acknowledge your understanding of 7 facts regarding the LM plan offered by Unified. 1) This LM plan is not major medical insurance and should not be viewed as a substitute for major medical coverage. 2) This LM plan does not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." 3) This LM plan does not cover any pre-existing conditions. 4) This LM plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. 5) This LM plan has a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. 6) This LM plan has no prescription drug benefits. Prescription drug costs will not be covered under any circumstances. 7) This LM plan has a 30-day waiting period before coverage is provided. (Not applicable in TX or ID). THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. Do you acknowledge that I have read the 7 Unified Life Insurance Company Specific Disclaimer statements to you? Do your further acknowledge that you have no questions regarding any of the limitations and exclusions of the Unified Life LIMITED BENEFIT plan?\n( Wait for YES )',
        "Your membership has a 30-day examination period, which means you have thirty (30) days from your membership's effective date to review the program information and make any changes or cancel. If you wish to cancel during the examination period, you may be eligible to receive a refund of your first month's payment, as long as you have not utilized any services or filed any claims during that time period. The one-time enrollment fee is non-refundable. Do you understand the examination period? Member must answer YES.\n( Wait for YES )",
        'To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel on or after your billing date and that payment has drafted, your membership ends before the next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions, shown as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_3: {
      paras: [
        'AWA TrueHealth 2 is a private association membership with limited benefit hospital indemnity insurance, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Unified Life Insurance Company, and it's offered through your membership in the Affiliated Workers Association (AWA).",
        "It uses the MultiPlan Limited Benefit Plan Network, a discount network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Terms & Conditions The Group Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership, is not major medical or comprehensive medical insurance coverage, and is not an Essential Health Benefit Plan under the federal Affordable Care Act (ACA) nor a policy of Worker's Compensation under state law. AWA TrueHealth membership benefits and services are exempt from the requirements of the 2010 Federal Health Care Reform Law. This limited medical plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. There is a 12-month waiting period for pre-existing conditions for the Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership. Which means, if you have had care rendered or prescribed to you by a physician within 12 months of your effective date, you will have a waiting period for 12 months before any claims related to your condition will be covered. There is a 30-day waiting period for sickness under the Accident & Sickness Hospital Indemnity insurance and you will not receive benefits under such insurance for all covered sicknesses until your membership has been in effect for 30 days (not applicable for residents of ID and TX). In addition, normal pregnancy or childbirth is not covered under the Accident & Sickness Hospital Indemnity Policy. The following premium rates apply for the coverage underwritten by Unified Life Insurance Company included in the AWA TrueHealth 2 membership. The premium rates by coverage election are: Member = $86.22, Member + Spouse = $172.45, Member + Child(ren) = $155.20, Family = $232.81. Coverage is subject to termination in accordance with the Association Group Master Policy provisions. Do you acknowledge and agree to the Terms & Conditions I read to you? Member must answer YES.\n( Wait for YES )",
        'UNIFIED LIFE INSURANCE COMPANY SPECIFIC DISCLAIMER You have applied to purchase a Unified Life Limited Benefit (LM) plan. Before your application can be processed you are required to read, and acknowledge your understanding of 7 facts regarding the LM plan offered by Unified. 1) This LM plan is not major medical insurance and should not be viewed as a substitute for major medical coverage. 2) This LM plan does not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." 3) This LM plan does not cover any pre-existing conditions. 4) This LM plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. 5) This LM plan has a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. 6) This LM plan has no prescription drug benefits. Prescription drug costs will not be covered under any circumstances. 7) This LM plan has a 30-day waiting period before coverage is provided. (Not applicable in TX or ID). THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. Do you acknowledge that I have read the 7 Unified Life Insurance Company Specific Disclaimer statements to you? Do your further acknowledge that you have no questions regarding any of the limitations and exclusions of the Unified Life LIMITED BENEFIT plan?\n( Wait for YES )',
        "Your membership has a 30-day examination period, which means you have thirty (30) days from your membership's effective date to review the program information and make any changes or cancel. If you wish to cancel during the examination period, you may be eligible to receive a refund of your first month's payment, as long as you have not utilized any services or filed any claims during that time period. The one-time enrollment fee is non-refundable. Do you understand the examination period? Member must answer YES.\n( Wait for YES )",
        'To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel on or after your billing date and that payment has drafted, your membership ends before the next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions, shown as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_4: {
      paras: [
        'AWA TrueHealth 3 is a private association membership with limited benefit hospital indemnity insurance, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Unified Life Insurance Company, and it's offered through your membership in the Affiliated Workers Association (AWA).",
        "It uses the MultiPlan Limited Benefit Plan Network, a discount network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Terms & Conditions The Group Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership, is not major medical or comprehensive medical insurance coverage, and is not an Essential Health Benefit Plan under the federal Affordable Care Act (ACA) nor a policy of Worker's Compensation under state law. AWA TrueHealth membership benefits and services are exempt from the requirements of the 2010 Federal Health Care Reform Law. This limited medical plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. There is a 12-month waiting period for pre-existing conditions for the Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership. Which means, if you have had care rendered or prescribed to you by a physician within 12 months of your effective date, you will have a waiting period for 12 months before any claims related to your condition will be covered. There is a 30-day waiting period for sickness under the Accident & Sickness Hospital Indemnity insurance and you will not receive benefits under such insurance for all covered sicknesses until your membership has been in effect for 30 days (not applicable for residents of ID and TX). In addition, normal pregnancy or childbirth is not covered under the Accident & Sickness Hospital Indemnity Policy. The following premium rates apply for the coverage underwritten by Unified Life Insurance Company included in the AWA TrueHealth 3 membership. The premium rates by coverage election are: Member = $107.00, Member + Spouse = $214.00, Member + Child(ren) = $192.60, Family = $288.90. Coverage is subject to termination in accordance with the Association Group Master Policy provisions. Do you acknowledge and agree to the Terms & Conditions I read to you? Member must answer YES.\n( Wait for YES )",
        'UNIFIED LIFE INSURANCE COMPANY SPECIFIC DISCLAIMER You have applied to purchase a Unified Life Limited Benefit (LM) plan. Before your application can be processed you are required to read, and acknowledge your understanding of 7 facts regarding the LM plan offered by Unified. 1) This LM plan is not major medical insurance and should not be viewed as a substitute for major medical coverage. 2) This LM plan does not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." 3) This LM plan does not cover any pre-existing conditions. 4) This LM plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. 5) This LM plan has a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. 6) This LM plan has no prescription drug benefits. Prescription drug costs will not be covered under any circumstances. 7) This LM plan has a 30-day waiting period before coverage is provided. (Not applicable in TX or ID). THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. Do you acknowledge that I have read the 7 Unified Life Insurance Company Specific Disclaimer statements to you? Do your further acknowledge that you have no questions regarding any of the limitations and exclusions of the Unified Life LIMITED BENEFIT plan?\n( Wait for YES )',
        "Your membership has a 30-day examination period, which means you have thirty (30) days from your membership's effective date to review the program information and make any changes or cancel. If you wish to cancel during the examination period, you may be eligible to receive a refund of your first month's payment, as long as you have not utilized any services or filed any claims during that time period. The one-time enrollment fee is non-refundable. Do you understand the examination period? Member must answer YES.\n( Wait for YES )",
        'To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel on or after your billing date and that payment has drafted, your membership ends before the next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions, shown as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    awatruehealth_5: {
      paras: [
        'AWA TrueHealth 4 is a private association membership with limited benefit hospital indemnity insurance, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Unified Life Insurance Company, and it's offered through your membership in the Affiliated Workers Association (AWA).",
        "It uses the MultiPlan Limited Benefit Plan Network, a discount network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "Terms & Conditions The Group Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership, is not major medical or comprehensive medical insurance coverage, and is not an Essential Health Benefit Plan under the federal Affordable Care Act (ACA) nor a policy of Worker's Compensation under state law. AWA TrueHealth membership benefits and services are exempt from the requirements of the 2010 Federal Health Care Reform Law. This limited medical plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. There is a 12-month waiting period for pre-existing conditions for the Accident & Sickness Hospital Indemnity insurance offered in the AWA TrueHealth membership. Which means, if you have had care rendered or prescribed to you by a physician within 12 months of your effective date, you will have a waiting period for 12 months before any claims related to your condition will be covered. There is a 30-day waiting period for sickness under the Accident & Sickness Hospital Indemnity insurance and you will not receive benefits under such insurance for all covered sicknesses until your membership has been in effect for 30 days (not applicable for residents of ID and TX). In addition, normal pregnancy or childbirth is not covered under the Accident & Sickness Hospital Indemnity Policy. The following premium rates apply for the coverage underwritten by Unified Life Insurance Company included in the AWA TrueHealth 4 membership. The premium rates by coverage election are: Member = $134.92, Member + Spouse = $269.84, Member + Child(ren) = $242.86, Family = $364.28. Coverage is subject to termination in accordance with the Association Group Master Policy provisions. Do you acknowledge and agree to the Terms & Conditions I read to you? Member must answer YES.\n( Wait for YES )",
        'UNIFIED LIFE INSURANCE COMPANY SPECIFIC DISCLAIMER You have applied to purchase a Unified Life Limited Benefit (LM) plan. Before your application can be processed you are required to read, and acknowledge your understanding of 7 facts regarding the LM plan offered by Unified. 1) This LM plan is not major medical insurance and should not be viewed as a substitute for major medical coverage. 2) This LM plan does not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." 3) This LM plan does not cover any pre-existing conditions. 4) This LM plan will not provide protection from potential tax penalties which may result from a failure to purchase major medical coverage. 5) This LM plan has a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. 6) This LM plan has no prescription drug benefits. Prescription drug costs will not be covered under any circumstances. 7) This LM plan has a 30-day waiting period before coverage is provided. (Not applicable in TX or ID). THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. Do you acknowledge that I have read the 7 Unified Life Insurance Company Specific Disclaimer statements to you? Do your further acknowledge that you have no questions regarding any of the limitations and exclusions of the Unified Life LIMITED BENEFIT plan?\n( Wait for YES )',
        "Your membership has a 30-day examination period, which means you have thirty (30) days from your membership's effective date to review the program information and make any changes or cancel. If you wish to cancel during the examination period, you may be eligible to receive a refund of your first month's payment, as long as you have not utilized any services or filed any claims during that time period. The one-time enrollment fee is non-refundable. Do you understand the examination period? Member must answer YES.\n( Wait for YES )",
        'To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel on or after your billing date and that payment has drafted, your membership ends before the next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions, shown as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Unified Life insurance premium, $___ AWA membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    ghdp_45: {
      paras: [
        'GoodHealth is a private, self-funded group health plan with limited benefits, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "There's no insurance company on this plan; Merchants Benefit Administration, or MBA, administers it, and it's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate, and the plan is governed by a federal law called ERISA.",
        "It uses the First Health Network. Doctor and wellness visits must be in-network, out-of-network services aren't covered, and hospital benefits aren't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and anything above them is your cost. Benefits and visit counts start over every July 1, so your first plan year may be shorter than 12 months.',
        "For prescriptions, the plan uses BestChoice Rx at participating pharmacies, with the copays and limits we went over; specialty drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms of it, in the 12 months before your start date, the hospital, surgery, emergency room and ambulance benefits won't pay for it in your first 12 months. Sickness has a 30-day waiting period.",
        "Anything not listed in your schedule of benefits isn't covered. NICU care and preventive services at a hospital aren't covered either.",
        'The GHDP plan is not a Major Medical or Comprehensive Coverage. The GHDP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To become and remain eligible for the health benefits sponsored by Good Health Distribution Partners (GHDP), the primary enrollee must register as an affiliate or Limited Partner. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ GoodHealth plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    sigma: {
      paras: [
        'Sigma Care PLUS is a private, limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through your membership in the National Congress of Employers (NCE).",
        "It uses the First Health Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card at participating pharmacies, which isn't insurance.",
        "If you had medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for it in your first 12 months. Sickness benefits have a 30-day waiting period from your start date; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may go up at renewal. You can end coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Sigma Care PLUS insurance premium, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    sigma_2: {
      paras: [
        'Sigma Care PLUS is a private, limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through your membership in the National Congress of Employers (NCE).",
        "It uses the First Health Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card at participating pharmacies, which isn't insurance.",
        "If you had medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for it in your first 12 months. Sickness benefits have a 30-day waiting period from your start date; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may go up at renewal. You can end coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Sigma Care PLUS insurance premium, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    nexus_ppo: {
      paras: [
        'NexusCare PPO STM is a private short-term medical insurance plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by The North River Insurance Company, and it's offered through the Communicating for America Association.",
        "It uses the Cigna PPO for Shared Administration network; you can go out of network, but you'll pay more. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. That includes the coverage period maximum. In network, your out-of-pocket maximum is met once you meet your deductible, except for the $250 ER copay; out of network, there's no out-of-pocket maximum.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'This plan is not required to follow federal health insurance rules under the Affordable Care Act. If this coverage ends or you lose eligibility, you might have to wait until an open enrollment period to get other health insurance.',
        "I/we understand this insurance contains a Pre-existing Condition exclusion, Waiting Periods for Sickness, a Pre-certification Penalty and other restrictions and exclusions. Pre-existing conditions are excluded under this plan. The exact definition and look-back period are in your certificate, so please review it. I/we understand that no benefits are payable for Sicknesses which arise during the first 3 days following an Insured Person's Coverage Effective Date. No benefits are payable for Cancer which arises during the first 30 days following an Insured Person's Effective Date.",
        'THIS PLAN PROVIDES LIMITED BENEFIT COVERAGE. IT IS NOT DESIGNED TO COVER ALL MEDICAL EXPENSES AND IT IS NOT A MAJOR MEDICAL OR COMPREHENSIVE HEALTH CARE POLICY. PLEASE READ YOUR CERTIFICATE CAREFULLY! Pre-authorization is required for the Epic PPO plan and a $1,000 penalty is applied to expenses not pre-authorized.\n( Nevada residents only, read word for word: ) YOU MAY BE ELIGIBLE FOR A SUBSIDY IF PURCHASING A "QUALIFIED HEALTH PLAN" WHICH PROVIDES MORE COVERAGE AT POSSIBLY A LOWER COST. FOR MORE INFORMATION, PLEASE CHECK: https://www.nevadahealthlink.com/',
        'This is short-term coverage for the term you select, and it ends at the end of the paid period in which you turn 65. To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time. You can cancel after a minimum 30-day enrollment.\n( MO and OK residents only, also say: ) This policy is not renewable or extendable.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions, shown as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ Communicating for America Association membership, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month; rates can change in later periods if you select multiple durations. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    risehealth: {
      paras: [
        'RiseHealth STM is a private short-term medical group insurance plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company or Standard Life and Casualty Insurance Company, depending on your state. It includes the NCE GapAfford Plus program, with non-insurance discounts like dental, vision and prescriptions.",
        "It uses the First Health Limited Benefit Plan Network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. All benefits are limited to usual, reasonable and customary amounts. Your $2,000 coinsurance limit caps only your coinsurance; your deductible, copays, additional deductibles and anything over a benefit limit are on top of it, so it is not an out-of-pocket maximum.',
        "For prescriptions, GapAfford Plus gives you a discount card, which isn't insurance.",
        'Pre-existing conditions are excluded. If you get a new policy for another term, anything new from the earlier term counts as pre-existing.',
        "Anything not listed in your schedule of benefits isn't covered.",
        'This coverage is not required to comply with federal health insurance rules under the Affordable Care Act. If it expires or you lose eligibility, you might have to wait until an open enrollment period to get other health insurance.',
        'I understand that short term health insurance is not a substitute for comprehensive major medical insurance. I understand this Short Term Medical insurance contains a Pre-existing Condition exclusion, a Pre-certification Penalty and other restrictions and exclusions. I agree that coverage will not become effective for me or any dependent whose medical status, prior to the effective date, has changed and therefore results in a yes answer to any of the medical questions on this application. If my medical status changes in this way, coverage will be declined for all individuals included on this application.',
        "This is short-term coverage. It isn't renewable or extendable, but a new policy can be issued every 6 or 12 months, up to 36 months total, as long as you keep paying, and rates can go up each term based on your age. Coverage ends at the end of the paid period in which you turn 65. To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions, shown as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS.'
    },
    allstate_stm: {
      paras: [
        'The Allstate Enhanced STM PPO Plan is private short-term medical insurance, not an ACA plan and not major medical insurance.',
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and it's offered through the LIFE Association; the membership is not the insurance.",
        "It uses the Aetna Open Choice PPO network. Out of network, your deductible and coinsurance limit double, the coinsurance percentage stays the same, and copays don't apply. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance out-of-pocket limit caps only your coinsurance; your deductible, copays, access fees and anything over a benefit limit are on top of it.',
        'The plan is medically underwritten and does not cover pre-existing conditions.',
        "Your certificate lists all exclusions and limitations and controls your benefits. Anything not listed in your schedule of benefits isn't covered.",
        'Your monthly payment is charged to your payment method on file each month after today, unless you cancel.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    allstate_stm_2: {
      paras: [
        'The Allstate Copay Enhanced STM PPO Plan is private short-term medical insurance, not an ACA plan and not major medical insurance.',
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and it's offered through the LIFE Association; the membership is not the insurance.",
        "It uses the Aetna Open Choice PPO network. Out of network, your deductible and coinsurance limit double, the coinsurance percentage stays the same, and copays don't apply. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance out-of-pocket limit caps only your coinsurance; your deductible, copays, access fees and anything over a benefit limit are on top of it.',
        'For prescriptions, generic drugs have a $10 copay, up to a $3,000 maximum benefit.',
        'The plan is medically underwritten and does not cover pre-existing conditions.',
        "Your certificate lists all exclusions and limitations and controls your benefits. Anything not listed in your schedule of benefits isn't covered.",
        'Your monthly payment is charged to your payment method on file each month after today, unless you cancel.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    allstate_stm_3: {
      paras: [
        'The Allstate Essentials STM PPO Plan is private short-term medical insurance, not an ACA plan and not major medical insurance.',
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and it's offered through the LIFE Association; the membership is not the insurance.",
        "It uses the Aetna Open Choice PPO network. Out of network, your deductible and coinsurance limit double, the coinsurance percentage stays the same, and copays don't apply. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance out-of-pocket limit caps only your coinsurance; your deductible, copays, access fees and anything over a benefit limit are on top of it.',
        'The plan is medically underwritten and does not cover pre-existing conditions.',
        "Your certificate lists all exclusions and limitations and controls your benefits. Anything not listed in your schedule of benefits isn't covered.",
        'Your monthly payment is charged to your payment method on file each month after today, unless you cancel.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ for ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    advantcare: {
      paras: [
        'AdvantCare is a private group health plan, not an ACA plan and not major medical insurance. It does not cover labor and delivery, or inpatient mental health and substance abuse treatment.',
        "No insurance company is named on this plan; Aither Health administers it, and it's offered through Consumer Data Partners, LP, which does business as VistaWell. You join as a Limited Partner of Consumer Data Partners, and the plan has the federal protections of ERISA.",
        "It uses the MultiPlan Limited Benefit Plan network, in-network only. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. There's no deductible, and your out-of-pocket maximum is for in-network services only.",
        'For prescriptions, the plan covers only preventive generic drugs on the formulary, as outlined by the Affordable Care Act, at a $0 copay.',
        "Services at a hospital, including preventive care and doctor visits, aren't covered unless your schedule says so, and partial hospitalization isn't covered. Anything not listed in your schedule of benefits isn't covered.",
        "Your plan also comes with the AdvantCare Savings Program, which is made up of non-insured discounts, like chiropractic, podiatry and counseling. Those are not insurance; you pay the provider directly to get the discount. The Plan is not insurance or a Medicare prescription drug plan; and it is not minimum creditable coverage under Massachusetts law. The plan provides discounts at participating providers for services. The plan does not make payments directly to providers. You must pay the plan's participating providers directly at the time of service to receive a discount. The range of discounts will vary depending upon provider type and service. The discount plan organization is Gallagher Affinity Insurance Services, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008, (888) 868-6199. For a provider listing, visit findbestbenefits.com and login using your member ID and zip code. Do you acknowledge and accept these disclosures?\n\u25b6 ( Wait for YES )",
        "To cancel, call Customer Service at (214) 436-8907, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel your automatic payments, all memberships you're enrolled in are cancelled too.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and your billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee (only if your quote shows one), $___ for ___ add-on, if any. Then $___ a month, drafted automatically from the card or bank account you give me. Billing is through Premier Health Solutions, LLC; your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    advantcare_2: {
      paras: [
        'AdvantCare is a private group health plan, not an ACA plan and not major medical insurance. It does not cover labor and delivery, or inpatient mental health and substance abuse treatment.',
        "No insurance company is named on this plan; Aither Health administers it, and it's offered through Consumer Data Partners, LP, which does business as VistaWell. You join as a Limited Partner of Consumer Data Partners, and the plan has the federal protections of ERISA.",
        "It uses the MultiPlan Limited Benefit Plan network, in-network only. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. There's no deductible, and your out-of-pocket maximum is for in-network services only.",
        'For prescriptions, the plan covers only preventive generic drugs on the formulary, as outlined by the Affordable Care Act, at a $0 copay.',
        "For the hospital benefit only, the plan won't pay for any illness, injury or condition you got, or were advised to get, medical advice, diagnosis, care or treatment for, or had symptoms of that would make a reasonable person seek care, in the 12 months before your start date. That lasts as long as the plan is in force.",
        "Services at a hospital, including preventive care and doctor visits, aren't covered unless your schedule says so, and partial hospitalization isn't covered. Anything not listed in your schedule of benefits isn't covered.",
        "Your plan also comes with the AdvantCare Savings Program, which is made up of non-insured discounts, like chiropractic, podiatry and counseling. Those are not insurance; you pay the provider directly to get the discount. The Plan is not insurance or a Medicare prescription drug plan; and it is not minimum creditable coverage under Massachusetts law. The plan provides discounts at participating providers for services. The plan does not make payments directly to providers. You must pay the plan's participating providers directly at the time of service to receive a discount. The range of discounts will vary depending upon provider type and service. The discount plan organization is Gallagher Affinity Insurance Services, Inc., at 2850 W. Golf Road, Rolling Meadows, IL 60008, (888) 868-6199. For a provider listing, visit findbestbenefits.com and login using your member ID and zip code. Do you acknowledge and accept these disclosures?\n\u25b6 ( Wait for YES )",
        "To cancel, call Customer Service at (214) 436-8907, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel your automatic payments, all memberships you're enrolled in are cancelled too.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and your billing comes from Premier Health Solutions, which may show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee (only if your quote shows one), $___ for ___ add-on, if any. Then $___ a month, drafted automatically from the card or bank account you give me. Billing is through Premier Health Solutions, LLC; your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    ghdp_123: {
      paras: [
        'GoodHealth is a private, self-funded employee benefit plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "There's no insurance company on this plan; benefits are paid from the plan sponsor's own assets. Merchants Benefit Administration, or MBA, administers it and processes claims, and it's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate, and the plan is governed by a federal law called ERISA.",
        "It uses the First Health Network. Doctor and wellness visits must be in-network, out-of-network services aren't covered, and hospital benefits aren't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Once you use your visits for the year or a bill goes over the per-visit maximum, the rest is your cost, even in-network, and the plan doesn't reprice or discount it. Benefits and visit counts start over every July 1, so your first plan year may be shorter than 12 months.",
        "For prescriptions, you get BestChoice Rx at participating pharmacies, a discount card only, which isn't insurance; specialty drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms of it, in the 12 months before your start date, the hospital benefit won't pay for it in your first 12 months. Sickness has a 30-day waiting period.",
        "There's no emergency room, ambulance or surgery benefit on GoodHealth 1, 2 or 3, and NICU care and preventive services at a hospital aren't covered. Anything not listed in your schedule of benefits isn't covered.",
        'The GHDP plan is not a Major Medical or Comprehensive Coverage. The GHDP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To become and remain eligible for the health benefits sponsored by Good Health Distribution Partners (GHDP), the primary enrollee must register as an affiliate or Limited Partner. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'To stop payments, call FirstEnroll at (732) 876-9733 at least 3 business days before your draft date. The authorization also asks you to tell FirstEnroll in writing at least 15 days before your next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    ghdp_123_2: {
      paras: [
        'GoodHealth is a private, self-funded employee benefit plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "There's no insurance company on this plan; benefits are paid from the plan sponsor's own assets. Merchants Benefit Administration, or MBA, administers it and processes claims, and it's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate, and the plan is governed by a federal law called ERISA.",
        "It uses the First Health Network. Doctor and wellness visits must be in-network, out-of-network services aren't covered, and hospital benefits aren't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Once you use your visits for the year or a bill goes over the per-visit maximum, the rest is your cost, even in-network, and the plan doesn't reprice or discount it. Benefits and visit counts start over every July 1, so your first plan year may be shorter than 12 months.",
        "For prescriptions, the plan uses BestChoice Rx at participating pharmacies: generic acute and preventive drugs are $0, and about 200 preferred generic maintenance drugs are $5. Specialty drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms of it, in the 12 months before your start date, the hospital benefit won't pay for it in your first 12 months. Sickness has a 30-day waiting period.",
        "There's no emergency room, ambulance or surgery benefit on GoodHealth 1, 2 or 3, and NICU care and preventive services at a hospital aren't covered. Anything not listed in your schedule of benefits isn't covered.",
        'The GHDP plan is not a Major Medical or Comprehensive Coverage. The GHDP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To become and remain eligible for the health benefits sponsored by Good Health Distribution Partners (GHDP), the primary enrollee must register as an affiliate or Limited Partner. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'To stop payments, call FirstEnroll at (732) 876-9733 at least 3 business days before your draft date. The authorization also asks you to tell FirstEnroll in writing at least 15 days before your next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    ghdp_123_3: {
      paras: [
        'GoodHealth is a private, self-funded employee benefit plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "There's no insurance company on this plan; benefits are paid from the plan sponsor's own assets. Merchants Benefit Administration, or MBA, administers it and processes claims, and it's offered through Good Health Distribution Partners (GHDP). You join GHDP as a Working Owner, as a Limited Partner or affiliate, and the plan is governed by a federal law called ERISA.",
        "It uses the First Health Network. Doctor and wellness visits must be in-network, out-of-network services aren't covered, and hospital benefits aren't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Once you use your visits for the year or a bill goes over the per-visit maximum, the rest is your cost, even in-network, and the plan doesn't reprice or discount it. Benefits and visit counts start over every July 1, so your first plan year may be shorter than 12 months.",
        "For prescriptions, the plan uses BestChoice Rx at participating pharmacies: generic acute and preventive drugs are $0, about 200 preferred generic maintenance drugs are $5, non-preferred generics are $5 or $10 retail, and brand drugs with prior authorization are $40 retail. Non-preventive drugs have a $150 limit per person per month, and specialty drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms of it, in the 12 months before your start date, the hospital benefit won't pay for it in your first 12 months. Sickness has a 30-day waiting period.",
        "There's no emergency room, ambulance or surgery benefit on GoodHealth 1, 2 or 3, and NICU care and preventive services at a hospital aren't covered. Anything not listed in your schedule of benefits isn't covered.",
        'The GHDP plan is not a Major Medical or Comprehensive Coverage. The GHDP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To become and remain eligible for the health benefits sponsored by Good Health Distribution Partners (GHDP), the primary enrollee must register as an affiliate or Limited Partner. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'To stop payments, call FirstEnroll at (732) 876-9733 at least 3 business days before your draft date. The authorization also asks you to tell FirstEnroll in writing at least 15 days before your next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    awp: {
      paras: [
        'Advanced Wellness PLUS is a private, limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through your membership in the National Congress of Employers (NCE).",
        "It uses the First Health Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount program at participating pharmacies. It's a discount, not insurance, and discounts vary.",
        "If you had medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for it in your first 12 months. Sickness benefits have a 30-day waiting period from your start date; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may go up at renewal. You can end coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    awp_2: {
      paras: [
        'Advanced Wellness PLUS is a private, limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through your membership in the National Congress of Employers (NCE).",
        "It uses the First Health Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount program at participating pharmacies. It's a discount, not insurance, and discounts vary.",
        "If you had medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for it in your first 12 months. Sickness benefits have a 30-day waiting period from your start date; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may go up at renewal. You can end coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    americare: {
      paras: [
        "BWA AmeriCare is a private, limited-benefit hospital indemnity plan, not an ACA plan, not major medical insurance and not a replacement for workers' compensation. It does not provide coverage for maternity, substance abuse, or psychiatric services.",
        "It's underwritten by American Public Life Insurance Company, and it's offered through your membership in the Business Workers of America (BWA). It's set up as an employee welfare benefit plan through the association, under a federal law called ERISA.",
        "You understand this Membership includes the Medical Bill Repricing (MBR) service. MBR provides PPO network repricing. Members must utilize In-Network providers to receive network rates. MBR provides only Medical Bill Repricing and Healthcare Advocacy Services. MBR is not insurance and provides no guarantee to pay, nor guarantees the outcome of any claim. PHCS is the repricing network. Check that your doctor is a PHCS provider at 888-371-7427 or multiplan.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You also get a free prescription discount card, which isn't insurance; discounts vary.",
        "The Summary of Benefits lists the pre-existing condition exclusion period as not applicable. The plan pays nothing for hernia, adenoids, tonsils, varicose veins, appendix, or disorders of the reproductive organs in the first six months after your effective date, unless it's an emergency.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'You understand this Membership nor the Hospital Indemnity Insurance provide minimum essential benefits under the Affordable Care Act, is not a substitute for major medical insurance coverage, or intended to replace existing Health Insurance.',
        "To cancel, FirstEnroll needs written notice at least 15 days before your next billing date. If you cancel or a payment can't be collected, your BWA membership and all its benefits end.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ American Public Life hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ for ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    americare_2: {
      paras: [
        "BWA AmeriCare is a private, limited-benefit hospital indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services. It also does not replace workers' compensation insurance.",
        "It's underwritten by American Public Life Insurance Company, and it's offered through the Business Workers of America (BWA). It's set up as an employee welfare benefit plan through the association, so a federal law called ERISA applies.",
        "It uses the PHCS network for repricing. To find a PHCS provider, call 888-371-7427 or visit multiplan.com. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You also get a free prescription discount card, which isn't insurance, and discounts vary.",
        "The Summary of Benefits lists the pre-existing condition exclusion period as not applicable. For the first six months after your effective date, the plan pays nothing for hernia, adenoids, tonsils, varicose veins, appendix, or disorders of the reproductive organs, unless it's an emergency.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'You understand this Membership includes the Medical Bill Repricing (MBR) service. MBR provides PPO network repricing. Members must utilize In-Network providers to receive network rates. MBR provides only Medical Bill Repricing and Healthcare Advocacy Services. MBR is not insurance and provides no guarantee to pay, nor guarantees the outcome of any claim.',
        'You understand this Membership nor the Hospital Indemnity Insurance provide minimum essential benefits under the Affordable Care Act, is not a substitute for major medical insurance coverage, or intended to replace existing Health Insurance.',
        "To cancel, give FirstEnroll written notice at least 15 days before your next billing date; if you cancel or a payment can't be collected, your BWA membership and all its benefits end.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ American Public Life hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    wb: {
      paras: [
        'WB Choice is a private, scheduled fixed indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named for these health benefits; Merchants Benefit Administration, MBA, administers it, and it's offered through the Wellness Brands Health Plan, sponsored by Wellness Brands Management LLC. It's an employer-sponsored group health plan for eligible employees and Working Owners, and you join Good Life Partners, LP as a Limited Partner.",
        "It uses the First Health network, and doctor, specialist, urgent care and preventive visits are paid in-network only. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't. Because it pays fixed amounts, the federal No Surprises Act does not apply, so providers may bill you above what the plan pays, unless your state law says otherwise.",
        'Prescription drugs are not covered.',
        "Hospital stays and surgeries aren't paid in your first 12 months for a condition you had medical advice, diagnosis, care or treatment for in the 12 months before your effective date; your other benefits aren't affected. Sickness has a 30-day waiting period, and accidents are covered from your effective date.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'It is a supplement to health insurance and is not a substitute for major medical coverage, and not having major medical coverage may mean an additional payment with your taxes in some states.',
        'Your contribution is charged each month unless you cancel, due on the first with a 31-day grace period. To cancel or for billing questions, call (866) 870-7730.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ WB ___ monthly contribution, $___ one-time enrollment fee if one applies, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    wb_2: {
      paras: [
        'WB Select is a private, scheduled fixed indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named for these health benefits; Merchants Benefit Administration, MBA, administers it, and it's offered through the Wellness Brands Health Plan, sponsored by Wellness Brands Management LLC. It's an employer-sponsored group health plan for eligible employees and Working Owners, and you join Good Life Partners, LP as a Limited Partner.",
        "It uses the First Health network, and doctor, specialist, urgent care and preventive visits are paid in-network only. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't. Because it pays fixed amounts, the federal No Surprises Act does not apply, so providers may bill you above what the plan pays, unless your state law says otherwise.",
        'Prescription drugs are not covered.',
        "Hospital stays and surgeries aren't paid in your first 12 months for a condition you had medical advice, diagnosis, care or treatment for in the 12 months before your effective date; your other benefits aren't affected. Sickness has a 30-day waiting period, and accidents are covered from your effective date.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'It is a supplement to health insurance and is not a substitute for major medical coverage, and not having major medical coverage may mean an additional payment with your taxes in some states.',
        'Your contribution is charged each month unless you cancel, due on the first with a 31-day grace period. To cancel or for billing questions, call (866) 870-7730.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ WB ___ monthly contribution, $___ one-time enrollment fee if one applies, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    ghdp_wellness: {
      paras: [
        'GoodHealth Wellness is a private, self-funded preventive care plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "There's no insurance company on this plan; Merchants Benefit Administration, or MBA, administers it, and benefits are paid from the plan sponsor's own assets. It's a group health plan for Working Owners who join Good Health Distribution Partners as a Limited Partner or affiliate, governed by a federal law called ERISA.",
        "It uses the First Health network, in-network only, and preventive services at a hospital aren't covered. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It has no benefits for sick visits, specialists, urgent care, the emergency room or hospital stays.',
        "For prescriptions, you get the BestChoice Rx discount card at participating pharmacies, which isn't insurance, and specialty drugs aren't covered.",
        "There's a 30-day waiting period for sickness.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'The GHDP plan is not a Major Medical or Comprehensive Coverage. The GHDP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To become and remain eligible for the health benefits sponsored by Good Health Distribution Partners (GHDP), the primary enrollee must register as an affiliate or Limited Partner. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'The plan year runs 7/1 to 6/30, and benefits and visit counts reset every July 1, so your first year may be shorter. To stop payments, call FirstEnroll at (732) 876-9733 at least 3 business days before your draft date, and tell FirstEnroll in writing at least 15 days before your next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    tvp: {
      paras: [
        'TVP Health Plan is a private group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named for the health plan; Merchant's Benefit Administrators administers it, and Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit. You join the VP Limited Partnership as a Limited Partner; The Vitamin Patch, LLC is the general partner.",
        "It uses the First Health network, and out-of-network preventive and doctor services aren't covered. Search providerlocator.com with code FHMBA, or call (800) 226-5116. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays only up to the maximum per visit, so anything above that is yours to pay.',
        "Prescriptions are discounts only, through HarmonyRx, which isn't insurance.",
        "For hospital and facility benefits, anything you had medical advice, diagnosis, care, treatment or symptoms for in the 12 months before your start date isn't covered for your first 12 months.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'You are becoming a Limited Partner in the VP, Limited Partnership, and agree and acknowledge you have read and consent to the terms set forth in the Limited Partnership Agreement which is incorporated by reference in its entirety, and you further agree to comply with terms and conditions of that Agreement. You understand that the TVP benefit plans are not major medical insurance and should not be viewed as a substitute for major medical coverage. The TVP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." The Hospital Indemnity Benefit of these plans does not cover any pre-existing conditions. The TVP Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. The TVP Plans have a 30-day waiting period for sickness before coverage is provided. THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'To cancel, call Customer Service at (214) 436-8881, Monday to Friday, 7 a.m. to 7 p.m. Central. Coverage ends at 65 for members and spouses, and at 26 for children.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tvp_2: {
      paras: [
        'TVP Health Plan is a private group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named for the health plan; Merchant's Benefit Administrators administers it, and Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit. You join the VP Limited Partnership as a Limited Partner; The Vitamin Patch, LLC is the general partner.",
        "It uses the First Health network, and out-of-network preventive and doctor services aren't covered. Search providerlocator.com with code FHMBA, or call (800) 226-5116. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays only up to the maximum per visit, so anything above that is yours to pay.',
        'Acute and preventive generics are $0, and 200 preferred generic maintenance drugs are $5.',
        "For hospital and facility benefits, anything you had medical advice, diagnosis, care, treatment or symptoms for in the 12 months before your start date isn't covered for your first 12 months.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'You are becoming a Limited Partner in the VP, Limited Partnership, and agree and acknowledge you have read and consent to the terms set forth in the Limited Partnership Agreement which is incorporated by reference in its entirety, and you further agree to comply with terms and conditions of that Agreement. You understand that the TVP benefit plans are not major medical insurance and should not be viewed as a substitute for major medical coverage. The TVP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." The Hospital Indemnity Benefit of these plans does not cover any pre-existing conditions. The TVP Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. The TVP Plans have a 30-day waiting period for sickness before coverage is provided. THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'To cancel, call Customer Service at (214) 436-8881, Monday to Friday, 7 a.m. to 7 p.m. Central. Coverage ends at 65 for members and spouses, and at 26 for children.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tvp_3: {
      paras: [
        'TVP Health Plan is a private group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named for the health plan; Merchant's Benefit Administrators administers it, and Amalgamated Life Insurance Company underwrites only the $5,000 group term life benefit. You join the VP Limited Partnership as a Limited Partner; The Vitamin Patch, LLC is the general partner.",
        "It uses the First Health network, and out-of-network preventive and doctor services aren't covered. Search providerlocator.com with code FHMBA, or call (800) 226-5116. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays only up to the maximum per visit, so anything above that is yours to pay.',
        'Acute and preventive generics are $0, preferred generics $10 and non-preferred generics $20, with a $3,000 per person per year limit on non-preventive drugs.',
        "For hospital and facility benefits, anything you had medical advice, diagnosis, care, treatment or symptoms for in the 12 months before your start date isn't covered for your first 12 months.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'You are becoming a Limited Partner in the VP, Limited Partnership, and agree and acknowledge you have read and consent to the terms set forth in the Limited Partnership Agreement which is incorporated by reference in its entirety, and you further agree to comply with terms and conditions of that Agreement. You understand that the TVP benefit plans are not major medical insurance and should not be viewed as a substitute for major medical coverage. The TVP plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." The Hospital Indemnity Benefit of these plans does not cover any pre-existing conditions. The TVP Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits. The TVP Plans have a 30-day waiting period for sickness before coverage is provided. THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. To maintain your status as a Working Owner, you agree that you intend to dedicate 20 hours per week to your business and/or you intend to earn compensation in excess of the cost of your benefit program.',
        'To cancel, call Customer Service at (214) 436-8881, Monday to Friday, 7 a.m. to 7 p.m. Central. Coverage ends at 65 for members and spouses, and at 26 for children.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    galena: {
      paras: [
        'The Galena plan is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Southern Guaranty Insurance Company, SGIC, and it's offered through the Association for Responsible Planners, or AFRP.",
        "It uses the First Health and MultiPlan networks. Check that your doctor is in the network at sgicdualnetwork.com before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance maximum caps coinsurance only; your deductible, copays and anything over a benefit limit are on top of it.',
        "Outpatient prescriptions aren't covered; your pharmacy benefit is a ReviveHealth membership, which isn't insurance.",
        "Pre-existing conditions are not covered: anything you got medical advice, diagnosis, care or treatment for, or had symptoms that would make a careful person get care, in the 12 months before your coverage starts. State rules may vary. Injuries are covered starting the next day; sickness has a 5-day wait and cancer a 30-day wait. Some surgeries aren't covered in your first 6 months, like a hysterectomy unless for cancer, tonsils or adenoids, sinus or deviated septum surgery, ear tubes, hernia repair, and gallbladder removal.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'Your term is 12 months with an auto re-apply option for up to 3 terms or 36 months, and you may cancel at any time.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Galena plan, $___ AFRP membership if a monthly fee applies, $___ one-time AFRP association fee, $___ ___ add-on if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    smarthealth_trad: {
      paras: [
        'SmartHealth Traditional is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Standard Life and Casualty Insurance Company or American Financial Security Life Insurance Company, depending on your state, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the PHCS network from MultiPlan, and you can see doctors in or out of the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance limit caps coinsurance only; your deductible, copays, anything over a benefit limit and amounts above the usual and customary charge are on top of it.',
        "Outpatient prescriptions aren't covered; you get the NCE prescription discount program, which isn't insurance.",
        'Pre-existing conditions are not covered: anything you received or were advised to get medical advice, diagnosis, care, treatment, tests or prescriptions for, or had symptoms that would make a reasonable person get care, in the 36 months before your coverage starts. Sickness has a 5-day wait and cancer a 30-day wait; injuries on or after your start date have no wait.',
        "Anything not listed in your schedule of benefits isn't covered.",
        "Coverage can run up to 36 months. Your payment is collected on your bill date each month, and if it can't be collected, your coverage is canceled.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time association fee, $___ Pre-Existing Waiver Rider and $___ ___ if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    access: {
      paras: [
        'Access Health is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company.\nClaims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the MultiPlan PHCS network, and you can see providers in or out of the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance limit caps coinsurance only; your deductible and anything over a benefit limit are on top of it.',
        "Outpatient prescription drugs aren't covered; you get a prescription discount card, which isn't insurance.",
        "PRE-EXISTING CONDITIONS ARE NOT COVERED, AND BENEFITS ARE SUBJECT TO THE POLICY LIMITATIONS AND EXCLUSIONS. That means anything you saw a doctor about, were tested or treated for, took prescription medicine for, or had symptoms of in the 36 months before your start date isn't covered. Illness is covered only if it begins more than 5 days after your effective date, and cancer more than 30 days after; injuries have no waiting period.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'THIS COVERAGE IS NOT REQUIRED TO COMPLY WITH CERTAIN FEDERAL MARKET REQUIREMENTS FOR HEALTH INSURANCE, PRINCIPALLY THOSE CONTAINED IN THE AFFORDABLE CARE ACT. IF THIS COVERAGE EXPIRES OR YOU LOSE ELIGIBILITY FOR THIS COVERAGE, YOU MIGHT HAVE TO WAIT UNTIL AN OPEN ENROLLMENT PERIOD TO GET OTHER HEALTH INSURANCE COVERAGE.',
        'Coverage ends on the last day your premium is paid, at age 65, or when your Medicare starts.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ Pre-Existing Waiver Rider or ___ if chosen. Then $___ a month. Your statement shows FirstEnroll.'
    },
    nexus_base: {
      paras: [
        'NexusCare Base STM is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by The North River Insurance Company, and it's offered through the Communicating for America Association.",
        "This plan has no provider network; you can choose any provider, and it pays its own eligible-expense amounts, called reference-based pricing. Before you get care, confirm with the provider how they will bill this plan; I can't guarantee any provider takes the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Once you meet your deductible, your out-of-pocket maximum is met and the plan pays 100% of eligible expenses, except copays, up to the coverage period maximum.',
        "I/we understand this insurance contains a Pre-existing Condition exclusion, Waiting Periods for Sickness, a Pre-certification Penalty and other restrictions and exclusions. The exact pre-existing definition and look-back period are in your certificate. I/we understand that no benefits are payable for Sicknesses which arise during the first 3 days following an Insured Person's Coverage Effective Date. No benefits are payable for Cancer which arises during the first 30 days following an Insured Person's Effective Date.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'THIS PLAN PROVIDES LIMITED BENEFIT COVERAGE. IT IS NOT DESIGNED TO COVER ALL MEDICAL EXPENSES AND IT IS NOT A MAJOR MEDICAL OR COMPREHENSIVE HEALTH CARE POLICY. PLEASE READ YOUR CERTIFICATE CAREFULLY! This plan is not required to follow federal health insurance rules under the Affordable Care Act. If this coverage ends or you lose eligibility, you might have to wait until an open enrollment period to get other health insurance.',
        '\u25b6 ( Nevada residents only: )\nYOU MAY BE ELIGIBLE FOR A SUBSIDY IF PURCHASING A "QUALIFIED HEALTH PLAN" WHICH PROVIDES MORE COVERAGE AT POSSIBLY A LOWER COST. FOR MORE INFORMATION, PLEASE CHECK: https://www.nevadahealthlink.com/',
        'To cancel, call Customer Service at (214) 436-8881, Monday to Friday, 7 a.m. to 7 p.m. Central, after a minimum 30-day enrollment. Coverage ends at the end of the paid period in which you turn 65, and dependents come off at 26.\n\u25b6 ( MO, NC, OK, TX only: )\nThis policy is not renewable or extendable.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ association membership, $___ one-time enrollment fee, $___ ___ if your quote includes another product. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    pinnacle_protect: {
      paras: [
        'Pinnacle Protect is a private fixed indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Everest Reinsurance Company, claims are handled by InsuranceTPA.com, and it's offered through the American Workers Association, or AWA.",
        "There are no network requirements, and the plan pays the same either way. You also get access to the PHCS Practitioner and Ancillary network from MultiPlan; if you use it, check that the provider participates before each visit. I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        'No benefits are paid for a pre-existing condition for a set number of months after your coverage starts, as shown in your Schedule of Benefits. Critical illness has a 30-day waiting period, other waiting periods are in your Schedule of Benefits, and if a condition is diagnosed before its waiting period ends, no benefits are paid for it.',
        "Anything not listed in your schedule of benefits isn't covered.",
        "It's renewable but ends at the end of the month you turn 65, and if you cancel, you can't re-enroll with Everest Reinsurance Company until six months after your coverage ends.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership if a monthly fee applies, $___ one-time AWA association fee, $___ ___ add-on if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    smarthealth_ltd: {
      paras: [
        'SmartHealth Limited is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Standard Life and Casualty Insurance Company or American Financial Security Life Insurance Company, depending on your state, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the PHCS network from MultiPlan, and you can see doctors in or out of the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Hospital, surgery and ER benefits pay only up to fixed dollar amounts, and anything above is yours. Your coinsurance limit caps coinsurance only; your deductible, copays, anything over a benefit limit and amounts above the usual and customary charge are on top of it.',
        "Outpatient prescriptions aren't covered; you get the NCE prescription discount program, which isn't insurance.",
        'Pre-existing conditions are not covered: anything you received or were advised to get medical advice, diagnosis, care, treatment, tests or prescriptions for, or had symptoms that would make a reasonable person get care, in the 36 months before your coverage starts. Sickness has a 5-day wait and cancer a 30-day wait; injuries on or after your start date have no wait.',
        "Anything not listed in your schedule of benefits isn't covered.",
        "Coverage can run up to 36 months. Your payment is collected on your bill date each month, and if it can't be collected, your coverage is canceled.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time association fee, $___ Pre-Existing Waiver Rider and $___ ___ if chosen. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor: {
      paras: [
        'HarborSTM Essential is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state, claims are handled by Administrative Concepts, Inc., and it's offered through the American Workers Association, or AWA. AWA and its discounts are not insurance.",
        "It uses the Cigna Healthcare PPO network, and office visits are covered in-network only. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance out-of-pocket maximum caps coinsurance only; your deductible, copays, access fees, pre-authorization penalties and anything over a benefit maximum are on top of it.',
        'Prescriptions are covered only if you add the optional Outpatient Prescription Drug Rider for an extra premium.',
        'Pre-existing conditions are not covered: anything you received or were advised to get care, testing, diagnosis or treatment for, took a prescription for, or had symptoms a provider could have diagnosed or that would make a reasonable person get care, in the 5 years before your coverage starts. Without the Pre-Existing Conditions Rider, this applies for your whole coverage period and every consecutive one, and a condition that starts or is treated now can count as pre-existing in the next one. Sickness has a 5-day wait, cancer and wellness benefits a 30-day wait, and an injury on or after your start date has no wait.',
        "Anything not listed in your schedule of benefits isn't covered.",
        "It's not renewable and ends at the end of the month you turn 65. If you cancel, you can't re-enroll with Everest Reinsurance Company until six months after your coverage ends.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor_2: {
      paras: [
        'HarborSTM Access is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state, claims are handled by Administrative Concepts, Inc., and it's offered through the American Workers Association, or AWA. AWA and its discounts are not insurance.",
        "It uses the Cigna Healthcare PPO network, and office visits are covered in-network only. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance out-of-pocket maximum caps coinsurance only; your deductible, copays, access fees, pre-authorization penalties and anything over a benefit maximum are on top of it.',
        'Prescriptions are covered only if you add the optional Outpatient Prescription Drug Rider for an extra premium.',
        'Pre-existing conditions are not covered: anything you received or were advised to get care, testing, diagnosis or treatment for, took a prescription for, or had symptoms a provider could have diagnosed or that would make a reasonable person get care, in the 5 years before your coverage starts. Without the Pre-Existing Conditions Rider, this applies for your whole coverage period and every consecutive one, and a condition that starts or is treated now can count as pre-existing in the next one. Sickness has a 5-day wait, cancer and wellness benefits a 30-day wait, and an injury on or after your start date has no wait.',
        "Anything not listed in your schedule of benefits isn't covered.",
        "It's not renewable and ends at the end of the month you turn 65. If you cancel, you can't re-enroll with Everest Reinsurance Company until six months after your coverage ends.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    harbor_3: {
      paras: [
        'HarborSTM Secure is a private short-term medical plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by Everest Reinsurance Company or Everest Denali Insurance Company, depending on your state, claims are handled by Administrative Concepts, Inc., and it's offered through the American Workers Association, or AWA. AWA and its discounts are not insurance.",
        "It uses the Cigna Healthcare PPO network, and office visits are covered in-network only. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance out-of-pocket maximum caps coinsurance only; your deductible, copays, access fees, pre-authorization penalties and anything over a benefit maximum are on top of it.',
        'Prescriptions are covered only if you add the optional Outpatient Prescription Drug Rider for an extra premium.',
        'Pre-existing conditions are not covered: anything you received or were advised to get care, testing, diagnosis or treatment for, took a prescription for, or had symptoms a provider could have diagnosed or that would make a reasonable person get care, in the 5 years before your coverage starts. Without the Pre-Existing Conditions Rider, this applies for your whole coverage period and every consecutive one, and a condition that starts or is treated now can count as pre-existing in the next one. Sickness has a 5-day wait, cancer and wellness benefits a 30-day wait, and an injury on or after your start date has no wait.',
        "Anything not listed in your schedule of benefits isn't covered.",
        "It's not renewable and ends at the end of the month you turn 65. If you cancel, you can't re-enroll with Everest Reinsurance Company until six months after your coverage ends.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership, $___ one-time AWA enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    risehealth_lite: {
      paras: [
        'RiseHealth STM ___ is a private short-term medical group plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company or Standard Life and Casualty Insurance Company, depending on your state. The NCE GapAfford Plus program is included; its dental, vision and prescription discounts are not insurance.",
        "It uses the First Health Limited Benefit Plan Network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your coinsurance limit caps coinsurance only and is not an out-of-pocket maximum; your deductible, copays and anything over a benefit limit are on top of it.',
        "For prescriptions, GapAfford Plus gives you a discount card, which isn't insurance.",
        'Pre-existing conditions are excluded, and on a new policy for another term, anything that came up during the earlier term counts as pre-existing. Your rates can also go up with each new term based on your age.',
        "Anything not listed in your schedule of benefits isn't covered.",
        'This coverage is not required to comply with federal health insurance rules under the Affordable Care Act. If it expires or you lose eligibility, you might have to wait until an open enrollment period to get other health insurance. I understand that short term health insurance is not a substitute for comprehensive major medical insurance. I understand this Short Term Medical insurance contains a Pre-existing Condition exclusion, a Pre-certification Penalty and other restrictions and exclusions. I agree that coverage will not become effective for me or any dependent whose medical status, prior to the effective date, has changed and therefore results in a yes answer to any of the medical questions on this application. If my medical status changes in this way, coverage will be declined for all individuals included on this application.',
        "It isn't renewable or extendable, but a new policy can be issued every 6 or 12 months, up to 36 months total, as long as you keep paying, and it ends at the end of the paid period in which you turn 65. To cancel, call Customer Service at (214) 436-8881, Monday to Friday, 7 a.m. to 7 p.m. Central.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will show on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    tdk_123: {
      paras: [
        'TDK 1 is a private limited group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named on this plan; Detego Health administers it and processes claims. You become a Working Owner of Healthcare Data Analytics, or HCDA, and the plan is governed by a federal law called ERISA. You're expected to complete about 8 to 10 short activities a year, like health surveys, and your coverage can end if you don't. You'll also get K-1 tax documents by email.",
        "It uses the First Health network: doctor visits and preventive care are in-network only, preventive care at a hospital isn't covered, and the hospital benefit isn't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't. Visit limits reset each 12-month benefit year. There is no emergency room, ambulance or outpatient surgery benefit, and labs, X-rays and imaging get discounted pricing only.",
        "You get 70+ free prescriptions from MyLiveDoc's formulary and a discount card for other medications, which isn't insurance; specialty and preferred brand drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms that would make a prudent person seek care, in the 12 months before your start date, the hospital benefit won't pay for it in your first 12 months. There's a 30-day wait from your start date before you can use benefits, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'The HCDA plan is not a Major Medical or Comprehensive Coverage. The HCDA plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. This plan specifically excludes all specialty medications, including human growth hormones. The HCDA Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits.',
        "To cancel, call First Enroll at (732) 876-9733, Monday to Friday, 10:00am to 5:30pm Eastern. Coverage ends on the last day you've paid for, including if a payment isn't made within 30 days of its due date.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and First Enroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_123_2: {
      paras: [
        'TDK 2 is a private limited group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named on this plan; Detego Health administers it and processes claims. You become a Working Owner of Healthcare Data Analytics, or HCDA, and the plan is governed by a federal law called ERISA. You're expected to complete about 8 to 10 short activities a year, like health surveys, and your coverage can end if you don't. You'll also get K-1 tax documents by email.",
        "It uses the First Health network: doctor visits and preventive care are in-network only, preventive care at a hospital isn't covered, and the hospital benefit isn't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't. Visit limits reset each 12-month benefit year. There is no emergency room, ambulance or outpatient surgery benefit, and labs, X-rays and imaging get discounted pricing only.",
        "You get 1,000+ free prescriptions from MyLiveDoc's formulary and a discount card for other medications, which isn't insurance; specialty and preferred brand drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms that would make a prudent person seek care, in the 12 months before your start date, the hospital benefit won't pay for it in your first 12 months. There's a 30-day wait from your start date before you can use benefits, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'The HCDA plan is not a Major Medical or Comprehensive Coverage. The HCDA plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. This plan specifically excludes all specialty medications, including human growth hormones. The HCDA Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits.',
        "To cancel, call First Enroll at (732) 876-9733, Monday to Friday, 10:00am to 5:30pm Eastern. Coverage ends on the last day you've paid for, including if a payment isn't made within 30 days of its due date.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and First Enroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_123_3: {
      paras: [
        'TDK 3 is a private limited group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named on this plan; Detego Health administers it and processes claims. You become a Working Owner of Healthcare Data Analytics, or HCDA, and the plan is governed by a federal law called ERISA. You're expected to complete about 8 to 10 short activities a year, like health surveys, and your coverage can end if you don't. You'll also get K-1 tax documents by email.",
        "It uses the First Health network: doctor visits and preventive care are in-network only, preventive care at a hospital isn't covered, and the hospital benefit isn't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't. Visit limits reset each 12-month benefit year. There is no emergency room, ambulance or outpatient surgery benefit, and labs, X-rays and imaging get discounted pricing only.",
        "You get 70+ free prescriptions from MyLiveDoc's formulary and a discount card for other medications, which isn't insurance; specialty and preferred brand drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms that would make a prudent person seek care, in the 12 months before your start date, the hospital benefit won't pay for it in your first 12 months. There's a 30-day wait from your start date before you can use benefits, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'The HCDA plan is not a Major Medical or Comprehensive Coverage. The HCDA plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. This plan specifically excludes all specialty medications, including human growth hormones. The HCDA Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits.',
        "To cancel, call First Enroll at (732) 876-9733, Monday to Friday, 10:00am to 5:30pm Eastern. Coverage ends on the last day you've paid for, including if a payment isn't made within 30 days of its due date.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and First Enroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    harmony_plus: {
      paras: [
        'Harmony Care + 100A is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE. NCE's discount services are not insurance.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, with no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card at participating pharmacies, which isn't insurance, and discounts vary.",
        "If you received medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for it in your first 12 months. Sickness benefits have a 30-day waiting period; injuries don't.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month year from your effective date, and premiums may increase at renewal. You can end coverage at any time, effective the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ ___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_2: {
      paras: [
        'Harmony Care + 100 is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card for participating pharmacies; it isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_3: {
      paras: [
        'Harmony Care + 200 is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card for participating pharmacies; it isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_4: {
      paras: [
        'Harmony Care + 200+ is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card for participating pharmacies; it isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_5: {
      paras: [
        'Harmony Care + 300 is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card for participating pharmacies; it isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_6: {
      paras: [
        'Harmony Care + 500 is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card for participating pharmacies; it isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_7: {
      paras: [
        'Harmony Care + 750 is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card for participating pharmacies; it isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_plus_8: {
      paras: [
        'Harmony Care + 1000 is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card for participating pharmacies; it isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    primeprotect: {
      paras: [
        'PrimeProtect ___ is a private fixed indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by National Guardian Life Insurance Company, and it includes Gallagher Affinity Insurance Services discount services at no extra cost, which aren't insurance; you pay the provider directly to get the discount.",
        "It gives you access to the First Health Network and the Hooray Health Network of retail clinics and urgent care centers. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "For prescriptions, you get SimpleScripts Rx, a set list of drugs at no cost plus discounts on others; it isn't insurance and isn't provided by National Guardian Life.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'PrimeProtect is a supplement to health insurance or health care sharing programs. It is not major medical insurance and is not a substitute for major medical insurance.',
        'THE SERVICES DESCRIBED ABOVE ARE NOT INSURANCE AND ARE NOT PROVIDED BY NATIONAL GUARDIAN LIFE INSURANCE COMPANY. INSURANCE BENEFITS UNDERWRITTEN BY NATIONAL GUARDIAN LIFE INSURANCE COMPANY ARE NOT DEPENDENT ON THE USE OF NETWORK PROVIDERS.',
        'To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    primeprotect_2: {
      paras: [
        'PrimeProtect ___ is a private fixed indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by National Guardian Life Insurance Company, and it includes Gallagher Affinity Insurance Services discount services at no extra cost, which aren't insurance; you pay the provider directly to get the discount.",
        "It gives you access to the First Health Network and the Hooray Health Network of retail clinics and urgent care centers. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "For prescriptions, you get SimpleScripts Rx, a set list of drugs at no cost plus discounts on others; it isn't insurance and isn't provided by National Guardian Life.",
        "The critical illness benefit isn't paid for a condition first diagnosed in your first 30 days of coverage, pays once per person, and doesn't pay for a recurring illness.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'PrimeProtect is a supplement to health insurance or health care sharing programs. It is not major medical insurance and is not a substitute for major medical insurance.',
        'THE SERVICES DESCRIBED ABOVE ARE NOT INSURANCE AND ARE NOT PROVIDED BY NATIONAL GUARDIAN LIFE INSURANCE COMPANY. INSURANCE BENEFITS UNDERWRITTEN BY NATIONAL GUARDIAN LIFE INSURANCE COMPANY ARE NOT DEPENDENT ON THE USE OF NETWORK PROVIDERS.',
        'To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    crownpoint: {
      paras: [
        'CrownPoint STM is a private short-term medical group insurance plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity.',
        'This is short-term medical insurance, and it is not required to comply with federal health insurance rules under the Affordable Care Act. If this coverage expires or you lose eligibility, you might have to wait until an open enrollment period to get other health insurance.',
        "It's underwritten by Everest Reinsurance Company and offered through the Affiliated Workers Association, or AWA; your AWA PreferPlus membership benefits, like gym and savings programs, aren't insurance.",
        "It uses the PHCS Practitioner & Ancillary Network from MultiPlan. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more.',
        'Pre-existing conditions are excluded; your certificate has the exact definition and look-back period.',
        "Please check your certificate for exclusions and limits on things like hospitalization, emergency services, maternity care, preventive care, prescription drugs, and mental health and substance use care, as well as any dollar limits. Anything not listed in your schedule of benefits isn't covered.",
        'You understand this insurance contains a Pre-existing Condition exclusion, a Pre-certification Penalty and other restrictions and exclusions. You agree that coverage will not become effective for you or any dependent whose medical status, prior to the effective date, has changed and therefore results in a "yes" answer to any of the medical questions on this Application. If your medical status changes in this way, coverage will be declined for all individuals included on this Application.',
        'This short-term coverage is not renewable or extendable, and it ends at the end of the paid period in which you turn 65. To cancel, call Customer Service at (214) 436-8881, Monday through Friday, 7 a.m. to 7 p.m. Central Time.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ AWA membership dues, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows Premier Health Solutions, as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS, depending on your bank.'
    },
    allstate_ha: {
      paras: [
        'Allstate Health Access is a private fixed indemnity limited medical plan, not an ACA plan and not major medical insurance. It does not cover mental illness or substance abuse, weight-loss surgery, cosmetic services, eye exams and glasses, routine hearing care, sleep disorders, chronic pain disorders, experimental treatment, hazardous activities, or care outside the United States or Canada.',
        "It's underwritten by National Health Insurance Company, Integon National Insurance Company or Integon Indemnity Corporation, depending on your state, and it's offered through the LIFE Association.",
        "It uses the First Health Network for discounts, and the plan pays the same fixed amount in or out of network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "Pre-existing conditions aren't covered for your first 12 months. That's anything you got medical advice, consultation, diagnosis, care, treatment, tests or a prescription for, or had symptoms serious enough that a provider could diagnose it or a reasonable person would get care, in the year before coverage starts, even if never diagnosed, plus a pregnancy that exists the day before coverage starts. Injury and sickness benefits have no waiting period; preventive visits have a 3-month wait.",
        "Anything not listed in your schedule of benefits isn't covered.",
        '\u25b6 ( Only if the client added Recuro: )\nRecuro benefits are optional and are not insurance.',
        'Your payment is charged to your payment method on file each month after today until you cancel.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ LIFE Association membership, $___ one-time association fee, if one applies, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    tdk_45: {
      paras: [
        'TDK 4 is a private limited group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named on this plan; Detego Health administers it and processes your claims, and it's offered through Healthcare Data Analytics, or HCDA. You join as a Working Owner of HCDA, so you'll get K-1 tax documents by email, and the plan is governed by a federal law called ERISA.",
        "It uses the First Health Network; doctor visits and preventive care must be in-network, and preventive care isn't covered at a hospital, but the hospital benefit isn't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't. Visit limits reset each 12-month benefit year.",
        "For prescriptions, you get 1,000+ free prescriptions from MyLiveDoc's formulary and a discount card for others, which isn't insurance; specialty and preferred brand drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms that would make a prudent person seek care, in the 12 months before your start date, the hospital, surgery, emergency room and ambulance benefits won't pay for it in your first 12 months. You can't use benefits for your first 30 days, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Lab work, X-rays and imaging aren't covered; you only get discounted pricing. Anything not listed in your schedule of benefits isn't covered.",
        'The HCDA plan is not a Major Medical or Comprehensive Coverage. The HCDA plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. This plan specifically excludes all specialty medications, including human growth hormones. The HCDA Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits.',
        "Your coverage can end if you don't complete the required Working Owner activities, about 8 to 10 short ones a year, like health surveys, most taking 5 to 15 minutes on your phone. To cancel, call First Enroll Customer Service at (732) 876-9733, Monday through Friday, 10:00am to 5:30pm Eastern. Coverage ends on the last day you've paid for, including when a payment isn't made within 30 days of its due date.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and First Enroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    tdk_45_2: {
      paras: [
        'TDK 5 is a private limited group health plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "No insurance company is named on this plan; Detego Health administers it and processes your claims, and it's offered through Healthcare Data Analytics, or HCDA. You join as a Working Owner of HCDA, so you'll get K-1 tax documents by email, and the plan is governed by a federal law called ERISA.",
        "It uses the First Health Network; doctor visits and preventive care must be in-network, and preventive care isn't covered at a hospital, but the hospital benefit isn't limited to the network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't. Visit limits reset each 12-month benefit year.",
        "For prescriptions, you get 1,000+ free prescriptions from MyLiveDoc's formulary and a discount card for others, which isn't insurance; specialty and preferred brand drugs aren't covered.",
        "If you had medical advice, diagnosis, care or treatment for a condition, or symptoms that would make a prudent person seek care, in the 12 months before your start date, the hospital, surgery, emergency room and ambulance benefits won't pay for it in your first 12 months. You can't use benefits for your first 30 days, except MyLiveDoc virtual care, the pharmacy benefit and emergencies.",
        "Lab work, X-rays and imaging aren't covered; you only get discounted pricing. Anything not listed in your schedule of benefits isn't covered.",
        'The HCDA plan is not a Major Medical or Comprehensive Coverage. The HCDA plans do not comply with the Affordable Care Act (ACA), otherwise known as "Obamacare." THIS IS A SUPPLEMENT TO HEALTH INSURANCE AND IS NOT A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. LACK OF MAJOR MEDICAL COVERAGE (OR OTHER MINIMUM ESSENTIAL COVERAGE) MAY RESULT IN AN ADDITIONAL PAYMENT WITH YOUR TAXES. This plan specifically excludes all specialty medications, including human growth hormones. The HCDA Plans have a limited schedule of benefits and will only pay for those items specifically listed in the schedule of benefits.',
        "Your coverage can end if you don't complete the required Working Owner activities, about 8 to 10 short ones a year, like health surveys, most taking 5 to 15 minutes on your phone. To cancel, call First Enroll Customer Service at (732) 876-9733, Monday through Friday, 10:00am to 5:30pm Eastern. Coverage ends on the last day you've paid for, including when a payment isn't made within 30 days of its due date.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and First Enroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows First Enroll.'
    },
    hd: {
      paras: [
        'HD HealthAscent is a private limited-benefit group hospital indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by ManhattanLife Insurance and Annuity Company and offered through The Health Depot Association. The membership's gym and savings benefits aren't insurance, and ManhattanLife doesn't provide and isn't affiliated with them or the network.",
        "It uses the First Health Limited Benefit Plan Network. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "If, in the 12 months before your start date, you got or were advised to get medical advice, diagnosis, care or treatment for a condition, were prescribed drugs for it, or had symptoms that should have led you to seek care, the plan won't pay for that condition or its complications until you've been covered 12 months in a row.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'To cancel, call Customer Service at (214) 436-8882, Monday through Friday, 7 a.m. to 7 p.m. Central Time. If you cancel on or after your billing date and that payment has already drafted, your membership ends before the next billing date.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Premier Health Solutions will bill you, shown on your statement as PHS-HEALTH-BILL, PHSHEALTH or HEALTHPHS?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ HD HealthAscent monthly membership, which includes the insurance and your Health Depot Association membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Premier Health Solutions, LLC bills you, and your statement may show "PHS-HEALTH-BILL," "PHSHEALTH" or "HEALTHPHS," depending on your bank.'
    },
    smartchoice: {
      paras: [
        'I do want to clarify that this is a private, limited medical plan, not an ACA or major medical plan, and it does not provide coverage for maternity, or substance abuse for drugs and alcohol.',
        "No insurance company is named on this plan; Detego Health administers it, and it's offered through Population Science Management USA. You join as a Working Owner of Population Science Management USA, and the plan is governed by a federal law called ERISA.",
        "It uses the First Health network, in-network only; out-of-network care is your full cost, except for emergencies. Check that your doctor is in the network before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your out-of-pocket limit is for covered in-network services; anything past the plan's limits, or not covered, doesn't count toward it.",
        "Preferred generics are a $12 copay for a 30-day supply at participating retail pharmacies, from the Ventegra Acute Formulary only; brand-name and specialty drugs aren't covered.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'To cancel, send a request to the plan; coverage ends on the last day of the month the plan receives it.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ plan, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    pinnacle_stm: {
      paras: [
        'Pinnacle Short Term Medical is private short-term medical insurance, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, or substance abuse for drugs and alcohol.',
        "It's underwritten by Everest Reinsurance Company and offered through the American Workers Association, or AWA.",
        "It's not a network plan, so you can use any doctor or hospital, and you also have access to the PHCS Practitioner and Ancillary network from MultiPlan. For hospitals and other facilities, the plan pays no more than 150% of what Medicare allows, and the facility can bill you for the rest. Check that your doctor participates in PHCS before your visit; I can't guarantee they take the plan.",
        'Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. Your out-of-pocket maximum caps only your coinsurance; your deductible, copays, the additional deductibles, the pre-certification penalty, and anything over a benefit limit or above what the plan allows are on top of it.',
        "Prescriptions aren't covered, except drugs a doctor gives you during covered inpatient or outpatient care. Your AWA membership includes the Rx Savers with Clever Rx discount program, which isn't insurance, and discounts vary.",
        "Pre-existing conditions are excluded for your first 12 months. That's anything you got treatment, diagnosis, care or advice for, including tests or medications, or had symptoms that would make a reasonable person get care, in the 60 months before coverage starts. There's a 5-day wait for sickness and a 30-day wait for cancer, and no wait for injuries on or after your start date. Some surgeries aren't covered in your first 6 months: a hysterectomy unless it's for cancer, tonsils or adenoids, sinus or deviated septum surgery, ear tubes, hernia repair, and gallbladder removal.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'This is temporary coverage for the term you choose, 6 months or 364 days. It is not renewable, and it ends at the end of the month you turn 65.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and Neo Health Solutions will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Pinnacle insurance premium, $___ one-time AWA (American Workers Association) association fee, $___ AWA monthly membership fee, if one applies, $___ add-on, if any. Then $___ a month. Your statement shows Neo Health Solutions.'
    },
    hcs: {
      paras: [
        'Health Choice Silver is a private limited-benefit fixed indemnity plan, not an ACA plan and not major medical insurance. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It gives you access to the MultiPlan network for discounts. You understand that the benefits included with the Accident and Sickness Hospital Indemnity Plan are not dependent on the use of the MultiPlan PPO Network. To use the discounts, check that your provider participates at multiplan.com before the visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You get a prescription discount card for participating pharmacies, which isn't insurance, and discounts vary.",
        "If a physician rendered or prescribed care for a condition in the 12 months before your effective date, claims for that condition aren't covered for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services. You understand that if there are any discrepancies between what the agent told you about the plan and what the actual policy states, that the policy terms will apply.',
        "To cancel, send written notice to NCE at least 10 days, and to FirstEnroll at least 15 days, before your next bill date. If you cancel or a payment can't be collected, your membership and benefits end.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Health Choice Silver insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll. The first month membership fee will be billed today and you agree to be automatically billed each month for the future monthly membership fees.'
    },
    paramount_123: {
      paras: [
        'BWA Paramount is a private limited-benefit hospital indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by BCS Insurance Company and offered through the Business Workers of America, or BWA.",
        "There's no network: you can see any licensed provider. The plan includes a Medical Bill Repricing service, MBR. It is important to understand that MBR is not an insurance provider and cannot guarantee the payment or outcome of any claim. Providers can decline it, so call MBR before your visit; I can't guarantee they'll accept it.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. The insurance pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. At age 70, all insurance benefit amounts drop to 75%.",
        "You get a free prescription discount card, which isn't insurance, and discounts vary.",
        'On the insurance, a condition from the 12 months before coverage starts can be excluded for your first 12 months; your certificate defines pre-existing. The plan lists no benefit waiting period.',
        "Anything not listed in your schedule of benefits isn't covered.",
        "ESSENTIALCARE PRODUCTS ARE LIMITED BENEFIT POLICIES - READ YOUR POLICY CAREFULLY. THESE POLICIES ARE NOT MAJOR MEDICAL INSURANCE AND ARE NOT INTENDED TO BE A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. You understand this Membership nor the Hospital Indemnity Insurance provide minimum essential benefits under the Affordable Care Act, is not a substitute for major medical insurance coverage, nor is it intended to replace existing Health Insurance. If there's ever a difference between what I've told you and the written membership and product terms, the written terms govern.",
        "To cancel, call the Customer Service Center at 877-697-0026, any time. FirstEnroll needs written notice at least 15 days before your next billing date to stop the draft, and if you cancel or a payment can't be collected, your BWA membership and all its benefits end.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ BCS hospital indemnity insurance, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    paramount_456: {
      paras: [
        "BWA Paramount is a private limited-benefit plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services. It's a Business Workers of America membership with three parts: BCS hospital indemnity insurance that pays fixed amounts, the Sharewell Health Share, which is health care sharing and not insurance, and a Medical Bill Repricing service.",
        "The insurance is underwritten by BCS Insurance Company, Sharewell Health Share is not an insurance company, and it's offered through the Business Workers of America, or BWA.",
        "There's no network: you can see any licensed provider. The plan includes a Medical Bill Repricing service, MBR. It is important to understand that MBR is not an insurance provider and cannot guarantee the payment or outcome of any claim. Providers can decline it, so call MBR before your visit; I can't guarantee they'll accept it.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. The insurance pays set amounts with no out-of-pocket maximum, so you pay whatever it doesn't. At age 70, all insurance benefit amounts drop to 75%. With Sharewell, you pay the Unshared Amount of eligible expenses before sharing starts.",
        "The SimpleScripts Rx $0 prescription plan starts on the 15th of the month after your effective date, and you get a free discount card, which isn't insurance, and discounts vary.",
        "On the insurance, a condition from the 12 months before coverage starts can be excluded for your first 12 months; your certificate defines pre-existing. The plan lists no benefit waiting period. For Sharewell, anything you were examined for, took medication for, had symptoms of or were treated for in the 24 months before your membership starts is pre-existing. It isn't eligible for your first year; then sharing for it is capped at $30,000 per need in year two, $60,000 in year three and $150,000 in year four, with no cap from year five.",
        "Anything not listed in your schedule of benefits isn't covered.",
        "You understand BWA Member Benefits, Sharewell Health Share, and insurance included in the BWA membership are not substitutes for major medical insurance coverage or intended to replace existing health insurance. If the member is unable to share in all or part of an eligible medical need, the member will remain solely financially liable for any and all unpaid medical needs. If you join this organization instead of purchasing health insurance, you will be considered uninsured. If there's ever a difference between what I've told you and the written membership and product terms, the written terms govern.",
        "To cancel, call the Customer Service Center at 877-697-0026, any time. FirstEnroll needs written notice at least 15 days before your next billing date to stop the draft, and if you cancel or a payment can't be collected, your BWA membership and all its benefits end.",
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will bill you, with the charge showing as Your Benefit Plan on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ BCS hospital indemnity insurance, $___ Sharewell Health Share, $___ Business Workers of America membership, $___ one-time, non-refundable enrollment fee, $___ add-on, if any. Then $___ a month. FirstEnroll bills you on behalf of the Business Workers of America, and your statement shows Your Benefit Plan.'
    },
    harmony: {
      paras: [
        'Harmony Care is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card, which isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Harmony Care insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    },
    harmony_2: {
      paras: [
        'Harmony Care is a private limited-benefit fixed indemnity plan, not an ACA plan, not major medical insurance, and not a Medicare supplement. It does not provide coverage for maternity, substance abuse, or psychiatric services.',
        "It's underwritten by American Financial Security Life Insurance Company, claims are handled by WebTPA, and it's offered through the National Congress of Employers, or NCE.",
        "It uses the First Health Limited Benefit Network. Check that your doctor is in the network at firsthealthlbp.com before each visit; I can't guarantee they take the plan.",
        "Every benefit has the limits we went over, and once you reach a limit, the plan pays nothing more. It pays set amounts, and there's no out-of-pocket maximum, so you pay whatever the plan doesn't.",
        "You may also get a prescription discount card, which isn't insurance, and discounts vary.",
        "If you got medical advice, diagnosis, care or treatment for a condition in the 12 months before your coverage starts, the plan won't pay for that condition for your first 12 months. No sickness benefits are paid for your first 30 days; that wait doesn't apply to injuries.",
        "Anything not listed in your schedule of benefits isn't covered.",
        'A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services.',
        'Benefits run on a 12-month coverage year from your effective date, and premiums may increase upon renewal. You can end your coverage at any time, and it ends on the date you ask.',
        'Do you understand this is not major medical or an ACA plan, it has the limits we went over, and FirstEnroll will show on your statement?\n\u25b6 ( Wait for answer )'
      ],
      bill: 'Your first payment is $___: $___ Harmony Care insurance premium, $___ NCE membership, $___ one-time, non-refundable NCE enrollment fee, $___ add-on, if any. Then $___ a month. Your statement shows FirstEnroll.'
    }
  },
  hide: ['AWA SimpleShield', 'HealthEssential', 'HealthBoost', 'AdvantCare 50']
};
