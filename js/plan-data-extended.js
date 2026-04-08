// js/plan-data-extended.js
// Extended plan data — new plans added 2026-04-08
// Do NOT modify plan-data.js — this file extends it safely
// Load AFTER plan-data.js in index.html

(function () {
  var EXTENDED_PLANS = [

    // SMART CHOICE 1500
    {
      id: 'smartchoice1500',
      name: 'Smart Choice 1500',
      group: 'MEC',
      type: 'MEC',
      carrier: 'NEO Insurance Solutions / Population Science Management',
      network: 'First Health Network',
      benefits: [
        { category: 'Deductible', items: ['Individual $1,500 / Family $3,000 (Embedded)'] },
        { category: 'Out-of-Pocket Max', items: ['Individual $9,200 / Family $18,400'] },
        { category: 'Primary Care Visit', items: ['$40 copay — 12 visit limit per year'] },
        { category: 'Specialist Visit', items: ['$50 copay — 12 visit limit per year'] },
        { category: 'Urgent Care', items: ['$250 copay after deductible — 5 visit limit'] },
        { category: 'Emergency Room', items: ['$1,500 max payment after deductible — 4 per family per benefit period'] },
        { category: 'Inpatient Hospital', items: ['$2,500 copay after deductible — 1 per family, up to 7 days'] },
        { category: 'Outpatient Hospital', items: ['$60 copay after deductible — 4 per family (elective surgeries excluded)'] },
        { category: 'Telehealth', items: ['$0 copay — Primary Care, Mental Health, Urgent Care'] },
        { category: 'Ambulance', items: ['Ground: $750 copay after deductible. Air: $2,500 copay after deductible'] },
        { category: 'Advanced Imaging', items: ['$250 copay after deductible — 4 per benefit period'] },
        { category: 'Radiology/X-ray', items: ['$75 copay after deductible — 4 per family per benefit period'] },
        { category: 'Mental Health Inpatient', items: ['$250 copay after deductible — 10 day limit'] },
        { category: 'Mental Health Outpatient', items: ['$50 copay after deductible — 10 visit limit'] },
        { category: 'Preventive Care', items: ['ACA required services — Plan pays 100%'] },
        { category: 'Prescriptions', items: ['Generic $12 copay retail 30-day. Specialty via ScriptAide patient assistance'] },
        { category: 'Rehabilitation', items: ['$50 copay after deductible — 10 visit combined limit'] },
        { category: 'Home Health / Hospice / Skilled Nursing', items: ['$50 copay after deductible — 10 visit limit each'] },
        { category: 'DME', items: ['$50 copay after deductible — 10 visit limit (precertification required if $500+)'] },
        { category: 'Maternity', items: ['Not covered (except ACA preventive services)'] },
        { category: 'Infertility', items: ['Not covered'] },
        { category: 'Out-of-Network', items: ['Not covered (emergency at in-network level)'] }
      ],
      limitations: [
        'Supplement to health insurance — NOT a substitute for major medical',
        'Does not satisfy ACA minimum essential coverage requirement',
        'Out-of-network services not covered except emergencies',
        'Elective surgeries excluded from outpatient facility benefit',
        'Maternity not covered except ACA preventive',
        'No infertility coverage',
        'Mental health inpatient limited to 10 days',
        'Preauthorization required for home health, skilled nursing, DME $500+',
        'Outpatient joint/spine/connective tissue limited to $5,000',
        'PT/OT/ST/Cardiac/Pulmonary rehab limited to 30 visits',
        'Brand name and specialty Rx not covered — generic only at $12 copay',
        'Network: First Health — in-network only for most benefits'
      ],
      waitingPeriods: ['No waiting period for acute conditions; standard plan effective date applies'],
      preEx: '12-month look-back / 12-month exclusion period for pre-existing conditions',
      source: 'Smart_Choice_1500_Plan_Doc_2025.pdf',
      rawText: 'Smart Choice 1500 Limited Medical. Individual deductible $1,500 family $3,000 embedded. Out-of-pocket max individual $9,200 family $18,400. Network First Health. Primary care $40 copay 12 visit limit. Specialist $50 copay 12 visit limit. Urgent care $250 copay after deductible 5 visit limit. Emergency room $1,500 max payment after deductible 4 per family per benefit period. Inpatient hospital $2,500 copay after deductible 1 per family up to 7 days. Outpatient hospital $60 copay after deductible 4 per family elective surgeries excluded. Telehealth $0 copay primary care mental health urgent care. Ambulance ground $750 air $2,500 copay after deductible. Advanced diagnostic imaging CT MRI $250 copay after deductible 4 per benefit period. Radiology x-ray $75 copay after deductible 4 per family. Mental health inpatient $250 copay 10 day limit. Mental health outpatient $50 copay 10 visit limit. Preventive care ACA required plan pays 100%. Prescriptions generic $12 copay 30-day retail ventegra formulary. Specialty drugs ScriptAide patient assistance program income based. Rehabilitation $50 copay 10 visit combined limit. Home health hospice skilled nursing $50 copay 10 visit limit. DME $50 copay 10 visit limit precertification required if over $500. Maternity not covered except ACA preventive. Infertility not covered. Out-of-network not covered. Pre-existing condition 12 month look-back 12 month exclusion period. Supplement to health insurance not a substitute for major medical does not satisfy ACA minimum essential coverage. Preauthorization required for home health skilled nursing DME over $500. Failure to obtain preauthorization results in denial of benefits. Outpatient joint spine connective tissue $5,000 benefit limit. PT OT ST cardiac pulmonary rehab 30 visit limit. Member services 886-815-6001 memberservices@detegohealth.com www.detegohealth.com. GuideCM precertification 866-837-1714. NaviClaim member advocates 866-837-1436. ScriptAide patient assistance 866-837-1515. Green Imaging advanced diagnostics 844-968-4647. Pharmacy benefit manager Ventegra 30-day retail ScriptCo 90-day mail order.'
    },

    // SMART CHOICE 3000
    {
      id: 'smartchoice3000',
      name: 'Smart Choice 3000',
      group: 'MEC',
      type: 'MEC',
      carrier: 'NEO Insurance Solutions / Population Science Management',
      network: 'First Health Network',
      benefits: [
        { category: 'Deductible', items: ['Individual $3,000 / Family $6,000 (Embedded)'] },
        { category: 'Out-of-Pocket Max', items: ['Individual $9,200 / Family $18,400'] },
        { category: 'Primary Care Visit', items: ['$40 copay — 7 visit limit per year'] },
        { category: 'Specialist Visit', items: ['$50 copay — 7 visit limit per year'] },
        { category: 'Urgent Care', items: ['$250 copay after deductible — 3 visit limit'] },
        { category: 'Emergency Room', items: ['$1,500 max payment after deductible — 2 per family per benefit period'] },
        { category: 'Inpatient Hospital', items: ['$2,500 copay after deductible — 1 per family, up to 4 days'] },
        { category: 'Outpatient Hospital', items: ['$60 copay after deductible — 2 per family (elective surgeries excluded)'] },
        { category: 'Telehealth', items: ['$0 copay — Primary Care, Mental Health, Urgent Care'] },
        { category: 'Ambulance', items: ['Ground: $750 copay after deductible. Air: $2,500 copay after deductible'] },
        { category: 'Advanced Imaging', items: ['$250 copay after deductible — 2 per benefit period'] },
        { category: 'Radiology/X-ray', items: ['$75 copay after deductible — 2 per family per benefit period'] },
        { category: 'Mental Health Inpatient', items: ['$250 copay after deductible — 5 day limit'] },
        { category: 'Mental Health Outpatient', items: ['$50 copay after deductible — 5 visit limit'] },
        { category: 'Preventive Care', items: ['ACA required services — Plan pays 100%'] },
        { category: 'Prescriptions', items: ['Generic $12 copay retail 30-day via Ventegra formulary'] },
        { category: 'Rehabilitation', items: ['$50 copay after deductible — 5 visit combined limit'] },
        { category: 'Home Health / Hospice / Skilled Nursing', items: ['$50 copay after deductible — 5 visit limit each'] },
        { category: 'DME', items: ['$50 copay after deductible — 5 visit combined limit'] },
        { category: 'Maternity', items: ['Not covered'] },
        { category: 'Out-of-Network', items: ['Not covered (emergency at in-network level)'] }
      ],
      limitations: [
        'Supplement to health insurance — NOT major medical',
        'Does not satisfy ACA minimum essential coverage',
        'Fewer visits than Smart Choice 1500 — lower tier plan',
        'Inpatient limited to 4 days vs 7 days on SC1500',
        'Only 7 PCP/specialist visits vs 12 on SC1500',
        'Elective surgeries excluded',
        'Preauthorization required for home health, skilled nursing, DME $500+',
        'Outpatient joint/spine/connective tissue limited to $5,000',
        'PT/OT/ST/Cardiac/Pulmonary rehab limited to 30 visits'
      ],
      waitingPeriods: ['Standard plan effective date applies'],
      preEx: '12-month look-back / 12-month exclusion period',
      source: 'Smart_Choice_3000_Plan_Doc_2025.pdf',
      rawText: 'Smart Choice 3000 Limited Medical. Individual deductible $3,000 family $6,000 embedded. Out-of-pocket max individual $9,200 family $18,400. Network First Health. Primary care $40 copay 7 visit limit. Specialist $50 copay 7 visit limit. Urgent care $250 copay after deductible 3 visit limit. Emergency room $1,500 max payment after deductible 2 per family per benefit period. Inpatient hospital $2,500 copay after deductible 1 per family up to 4 days. Outpatient hospital $60 copay after deductible 2 per family elective surgeries excluded. Telehealth $0 copay. Ambulance ground $750 air $2,500 after deductible. Advanced imaging $250 copay 2 per benefit period. Radiology x-ray $75 copay 2 per family. Mental health inpatient $250 copay 5 day limit. Mental health outpatient $50 copay 5 visit limit. Preventive ACA plan pays 100%. Prescriptions generic $12 copay ventegra formulary. Rehabilitation $50 copay 5 visit limit. Home health hospice skilled nursing $50 copay 5 visit limit. DME $50 copay 5 visit limit. Maternity not covered. Out-of-network not covered. Pre-existing 12 month look-back 12 month exclusion. Supplement not substitute for major medical does not satisfy ACA MEC requirement. Preauthorization required failure results in denial. Member services 886-815-6001 memberservices@detegohealth.com.'
    },

    // SMART CHOICE 3500
    {
      id: 'smartchoice3500',
      name: 'Smart Choice 3500',
      group: 'MEC',
      type: 'MEC',
      carrier: 'NEO Insurance Solutions / Population Science Management',
      network: 'First Health Network',
      benefits: [
        { category: 'Deductible', items: ['Individual $3,500 / Family $7,000 (Embedded)'] },
        { category: 'Out-of-Pocket Max', items: ['Individual $9,200 / Family $18,400'] },
        { category: 'Primary Care Visit', items: ['$40 copay — 5 visit limit per year'] },
        { category: 'Specialist Visit', items: ['$50 copay — 5 visit limit per year'] },
        { category: 'Urgent Care', items: ['$250 copay after deductible — 2 visit limit'] },
        { category: 'Emergency Room', items: ['$1,500 max payment after deductible — 1 per family per benefit period'] },
        { category: 'Inpatient Hospital', items: ['$2,500 copay after deductible — 1 per family, up to 3 days'] },
        { category: 'Outpatient Hospital', items: ['$60 copay after deductible — 1 per family (elective surgeries excluded)'] },
        { category: 'Telehealth', items: ['$0 copay — Primary Care, Mental Health, Urgent Care'] },
        { category: 'Advanced Imaging', items: ['$250 copay after deductible — 1 per benefit period'] },
        { category: 'Radiology/X-ray', items: ['$75 copay after deductible — 1 per family per benefit period'] },
        { category: 'Mental Health Inpatient', items: ['$250 copay after deductible — 3 day limit'] },
        { category: 'Mental Health Outpatient', items: ['$50 copay after deductible — 3 visit limit'] },
        { category: 'Preventive Care', items: ['ACA required services — Plan pays 100%'] },
        { category: 'Prescriptions', items: ['Generic $12 copay retail 30-day via Ventegra formulary'] },
        { category: 'Rehabilitation', items: ['$50 copay after deductible — 3 visit combined limit'] },
        { category: 'Home Health / Hospice / Skilled Nursing', items: ['$50 copay after deductible — 3 visit limit each'] },
        { category: 'DME', items: ['$50 copay after deductible — 3 visit combined limit'] },
        { category: 'Maternity', items: ['Not covered'] },
        { category: 'Out-of-Network', items: ['Not covered'] }
      ],
      limitations: [
        'Lowest tier Smart Choice plan — most limited visit counts',
        'Only 5 PCP/specialist visits per year',
        'Only 1 ER visit per family per benefit period',
        'Only 1 outpatient facility visit per family',
        'Inpatient limited to 3 days',
        'Supplement to health insurance — NOT major medical',
        'Does not satisfy ACA minimum essential coverage',
        'Preauthorization required for home health, skilled nursing, DME $500+'
      ],
      waitingPeriods: ['Standard plan effective date applies'],
      preEx: '12-month look-back / 12-month exclusion period',
      source: 'Smart_Choice_3500_Plan_Doc_2025.pdf',
      rawText: 'Smart Choice 3500 Limited Medical. Individual deductible $3,500 family $7,000 embedded. Out-of-pocket max individual $9,200 family $18,400. Network First Health. Primary care $40 copay 5 visit limit. Specialist $50 copay 5 visit limit. Urgent care $250 copay 2 visit limit. Emergency room $1,500 max payment 1 per family per benefit period. Inpatient hospital $2,500 copay 1 per family up to 3 days. Outpatient hospital $60 copay 1 per family elective surgeries excluded. Telehealth $0 copay. Advanced imaging $250 copay 1 per benefit period. Radiology $75 copay 1 per family. Mental health inpatient $250 copay 3 day limit. Mental health outpatient $50 copay 3 visit limit. Preventive ACA 100%. Prescriptions generic $12 copay ventegra formulary. Rehab $50 copay 3 visit limit. Home health hospice skilled nursing $50 copay 3 visit limit. DME $50 copay 3 visit limit. Maternity not covered. Out-of-network not covered. Pre-existing 12 month look-back 12 month exclusion. Supplement not major medical does not satisfy ACA MEC. Member services 886-815-6001 memberservices@detegohealth.com.'
    },

    // PINNACLE PROTECT PLAN 1
    {
      id: 'pinnacleprotect1',
      name: 'Pinnacle Protect Plan 1',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'Multiplan PHCS Practitioner & Ancillary Network',
      benefits: [
        { category: 'Plan Type', items: ['Limited Medical — fixed cash benefit per covered service'] },
        { category: 'Underwriting', items: ['Guaranteed Issue'] },
        { category: 'Pre-Existing Condition', items: ['12-month look-back / 12-month exclusion period (12/12)'] },
        { category: 'Hospital Confinement', items: ['$400/day — 10 days per confinement, 30 days per certificate year'] },
        { category: 'ICU Confinement', items: ['$400/day — 10 days per confinement, 30 days per certificate year'] },
        { category: 'Hospital Admission', items: ['$400 — 2 per certificate year'] },
        { category: 'In-Hospital Physician Visit', items: ['$50 — 3 days per certificate year'] },
        { category: 'Surgery Inpatient', items: ['$500 — 1 maximum day per certificate year'] },
        { category: 'Surgery Outpatient', items: ['$500 — 1 maximum day (shared with inpatient max)'] },
        { category: 'Anesthesia', items: ['25% of surgery benefit'] },
        { category: 'Outpatient Surgery Center', items: ['$500 — 1 day per certificate year'] },
        { category: 'Blood Products', items: ['$35 — 3 days per certificate year'] },
        { category: 'Lab', items: ['$30 — 2 per certificate year'] },
        { category: 'X-Rays', items: ['$25 — 2 per certificate year'] },
        { category: 'Advanced Diagnostic', items: ['$250 — 1 per certificate year'] },
        { category: "Physician's Office", items: ['$50 — 2 per certificate year'] },
        { category: 'Urgent Care', items: ['$50 — 1 per certificate year'] },
        { category: 'Emergency Room', items: ['$100 — 1 per certificate year'] },
        { category: 'Wellness', items: ['$75 — 1 per certificate year'] }
      ],
      limitations: [
        'Limited benefit plan — NOT comprehensive health insurance',
        'NOT a substitute for major medical coverage',
        'Does not satisfy ACA minimum essential coverage requirement',
        'Pays fixed cash amounts — member responsible for all amounts above benefit',
        'PHCS network provides discounted billing but plan pays fixed amounts only',
        'Pre-existing conditions excluded for first 12 months',
        'Surgery limited to 1 day per year inpatient and outpatient combined',
        'ER limited to 1 visit per year at $100',
        'No mental health, maternity, or prescription drug coverage'
      ],
      waitingPeriods: ['Pre-existing conditions excluded for 12 months from effective date'],
      preEx: '12/12 — 12-month look-back, 12-month exclusion for pre-existing conditions',
      source: 'Pinnacle_Protect_Plan1_Brochure.pdf',
      rawText: 'Pinnacle Protect Plan 1 Limited Medical. Guaranteed Issue. Pre-existing 12 month look-back 12 month exclusion 12-12. PHCS Practitioner Ancillary Network Multiplan. Fixed cash benefit per covered service. Hospital confinement $400 per day 10 days per confinement 30 days per certificate year. ICU confinement $400 per day 10 days per confinement 30 days per certificate year. Hospital admission $400 2 per certificate year. In-hospital physician visit $50 3 days per certificate year. Surgery inpatient $500 outpatient $500 1 maximum day per certificate year shared between inpatient and outpatient. Anesthesia 25%. Outpatient surgery center $500 1 day per certificate year. Blood products $35 3 days per certificate year. Lab $30 2 per certificate year. X-rays $25 2 per certificate year. Advanced diagnostic $250 1 per certificate year. Physicians office $50 2 per certificate year. Urgent care $50 1 per certificate year. Emergency room $100 1 per certificate year. Wellness $75 1 per certificate year. This product is a supplement to health insurance and is not a substitute for major medical coverage. Benefits provided are not intended to cover all medical expenses. Does not satisfy ACA minimum essential coverage requirement. Fixed cash benefit member pays amounts above benefit. PHCS network may provide discounted bill for covered services. Pre-existing condition excluded for first 12 months from effective date.'
    },

    // PINNACLE PROTECT PLAN 2
    {
      id: 'pinnacleprotect2',
      name: 'Pinnacle Protect Plan 2',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'Multiplan PHCS Practitioner & Ancillary Network',
      benefits: [
        { category: 'Plan Type', items: ['Limited Medical — fixed cash benefit, higher tier than Plan 1'] },
        { category: 'Underwriting', items: ['Guaranteed Issue'] },
        { category: 'Pre-Existing Condition', items: ['12-month look-back / 12-month exclusion period'] },
        { category: 'Network', items: ['Multiplan PHCS Practitioner & Ancillary Network'] }
      ],
      limitations: [
        'Limited benefit plan — NOT comprehensive health insurance',
        'NOT a substitute for major medical coverage',
        'Does not satisfy ACA minimum essential coverage requirement',
        'Pre-existing conditions excluded for first 12 months',
        'Fixed cash benefits — member responsible for amounts above benefit'
      ],
      waitingPeriods: ['Pre-existing conditions excluded for 12 months'],
      preEx: '12/12 — 12-month look-back, 12-month exclusion',
      source: 'Pinnacle_Protect_Plan2_Brochure.pdf',
      rawText: 'Pinnacle Protect Plan 2 Limited Medical Guaranteed Issue. Higher benefit tier than Plan 1. PHCS Practitioner Ancillary Network Multiplan. Fixed cash benefit per covered service. Pre-existing 12 month look-back 12 month exclusion. Supplement to health insurance not substitute for major medical. Does not satisfy ACA minimum essential coverage. Member pays amounts above fixed benefit. PHCS network provides discounted billing.'
    },

    // PINNACLE PROTECT PLAN 3
    {
      id: 'pinnacleprotect3',
      name: 'Pinnacle Protect Plan 3',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'Multiplan PHCS Practitioner & Ancillary Network',
      benefits: [
        { category: 'Plan Type', items: ['Limited Medical — fixed cash benefit, higher tier than Plan 2'] },
        { category: 'Underwriting', items: ['Guaranteed Issue'] },
        { category: 'Pre-Existing Condition', items: ['12-month look-back / 12-month exclusion period'] },
        { category: 'Network', items: ['Multiplan PHCS Practitioner & Ancillary Network'] }
      ],
      limitations: [
        'Limited benefit plan — NOT comprehensive health insurance',
        'NOT a substitute for major medical coverage',
        'Does not satisfy ACA minimum essential coverage requirement',
        'Pre-existing conditions excluded for first 12 months'
      ],
      waitingPeriods: ['Pre-existing conditions excluded for 12 months'],
      preEx: '12/12 — 12-month look-back, 12-month exclusion',
      source: 'Pinnacle_Protect_Plan3_Brochure.pdf',
      rawText: 'Pinnacle Protect Plan 3 Limited Medical Guaranteed Issue. Higher benefit tier than Plan 2. PHCS Practitioner Ancillary Network Multiplan. Fixed cash benefit per covered service. Pre-existing 12 month look-back 12 month exclusion. Supplement to health insurance not substitute for major medical. Does not satisfy ACA MEC requirement.'
    },

    // PINNACLE PROTECT PLAN 4
    {
      id: 'pinnacleprotect4',
      name: 'Pinnacle Protect Plan 4',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'Multiplan PHCS Practitioner & Ancillary Network',
      benefits: [
        { category: 'Plan Type', items: ['Limited Medical — fixed cash benefit, highest Pinnacle Protect tier'] },
        { category: 'Underwriting', items: ['Guaranteed Issue'] },
        { category: 'Pre-Existing Condition', items: ['12-month look-back / 12-month exclusion period'] },
        { category: 'Network', items: ['Multiplan PHCS Practitioner & Ancillary Network'] }
      ],
      limitations: [
        'Limited benefit plan — NOT comprehensive health insurance',
        'NOT a substitute for major medical coverage',
        'Does not satisfy ACA minimum essential coverage requirement',
        'Pre-existing conditions excluded for first 12 months'
      ],
      waitingPeriods: ['Pre-existing conditions excluded for 12 months'],
      preEx: '12/12 — 12-month look-back, 12-month exclusion',
      source: 'Pinnacle_Protect_Plan4_Brochure.pdf',
      rawText: 'Pinnacle Protect Plan 4 Limited Medical Guaranteed Issue. Highest Pinnacle Protect tier. PHCS Practitioner Ancillary Network Multiplan. Fixed cash benefit per covered service. Pre-existing 12 month look-back 12 month exclusion. Supplement to health insurance not substitute for major medical. Does not satisfy ACA MEC requirement.'
    },

    // PINNACLE CRITICAL CARE PLAN 1
    {
      id: 'pinnaclecriticalcare1',
      name: 'Pinnacle Critical Care Plan 1',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'NEO / Pinnacle Network',
      benefits: [
        { category: 'Plan Type', items: ['Critical Care supplement — designed as add-on to STM or other coverage'] },
        { category: 'Coverage Focus', items: ['Critical illness and hospital-level events'] },
        { category: 'Network', items: ['Pinnacle / NEO network'] }
      ],
      limitations: [
        'Supplemental plan — designed to pair with other coverage',
        'Limited benefit — not comprehensive health insurance',
        'Does not satisfy ACA minimum essential coverage'
      ],
      waitingPeriods: ['Check certificate for specific waiting periods'],
      preEx: 'Check certificate for pre-existing condition terms',
      source: 'Pinnacle_CriticalCare_Plan1_Brochure.pdf',
      rawText: 'Pinnacle Critical Care Plan 1. Supplemental critical care plan. Designed as add-on coverage. Limited benefit not comprehensive health insurance. Does not satisfy ACA minimum essential coverage. Pairs with STM or other primary coverage. NEO Pinnacle network.'
    },

    // PINNACLE CRITICAL CARE PLAN 2
    {
      id: 'pinnaclecriticalcare2',
      name: 'Pinnacle Critical Care Plan 2',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'NEO / Pinnacle Network',
      benefits: [
        { category: 'Plan Type', items: ['Critical Care supplement — higher tier than Plan 1'] },
        { category: 'Network', items: ['Pinnacle / NEO network'] }
      ],
      limitations: ['Supplemental plan', 'Limited benefit', 'Does not satisfy ACA MEC'],
      waitingPeriods: ['Check certificate for waiting periods'],
      preEx: 'Check certificate for pre-existing condition terms',
      source: 'Pinnacle_CriticalCare_Plan2_Brochure.pdf',
      rawText: 'Pinnacle Critical Care Plan 2. Supplemental critical care higher tier than Plan 1. Limited benefit not comprehensive. Does not satisfy ACA MEC. NEO Pinnacle network.'
    },

    // PINNACLE CRITICAL CARE PLAN 3
    {
      id: 'pinnaclecriticalcare3',
      name: 'Pinnacle Critical Care Plan 3',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'NEO / Pinnacle Network',
      benefits: [
        { category: 'Plan Type', items: ['Critical Care supplement — higher tier than Plan 2'] },
        { category: 'Network', items: ['Pinnacle / NEO network'] }
      ],
      limitations: ['Supplemental plan', 'Limited benefit', 'Does not satisfy ACA MEC'],
      waitingPeriods: ['Check certificate for waiting periods'],
      preEx: 'Check certificate for pre-existing condition terms',
      source: 'Pinnacle_CriticalCare_Plan3_Brochure.pdf',
      rawText: 'Pinnacle Critical Care Plan 3. Supplemental critical care higher tier than Plan 2. Limited benefit not comprehensive. Does not satisfy ACA MEC. NEO Pinnacle network.'
    },

    // PINNACLE CRITICAL CARE PLAN 4
    {
      id: 'pinnaclecriticalcare4',
      name: 'Pinnacle Critical Care Plan 4',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Pinnacle / NEO Insurance Solutions',
      network: 'NEO / Pinnacle Network',
      benefits: [
        { category: 'Plan Type', items: ['Critical Care supplement — highest Pinnacle Critical Care tier'] },
        { category: 'Network', items: ['Pinnacle / NEO network'] }
      ],
      limitations: ['Supplemental plan', 'Limited benefit', 'Does not satisfy ACA MEC'],
      waitingPeriods: ['Check certificate for waiting periods'],
      preEx: 'Check certificate for pre-existing condition terms',
      source: 'Pinnacle_CriticalCare_Plan4_Brochure.pdf',
      rawText: 'Pinnacle Critical Care Plan 4. Supplemental critical care highest tier. Limited benefit not comprehensive. Does not satisfy ACA MEC. NEO Pinnacle network.'
    },

    // ALLSTATE ENHANCED STM PPO
    {
      id: 'allstateenhancedstm',
      name: 'Allstate Enhanced STM PPO Plan',
      group: 'STM',
      type: 'STM',
      carrier: 'Allstate / NEO Insurance Solutions',
      network: 'PPO Network',
      benefits: [
        { category: 'Plan Type', items: ['Short Term Medical — PPO network'] },
        { category: 'Deductible Options', items: ['$2,500 / $5,000 / $7,500 / $10,000 / $25,000'] },
        { category: 'Coinsurance Options', items: ['0% / 20% / 50% depending on deductible tier'] },
        { category: 'Coverage Period Maximum', items: ['$1,000,000'] },
        { category: 'Office Visits', items: ['Subject to deductible and coinsurance including preventive'] },
        { category: 'Outpatient Services', items: ['Subject to deductible and coinsurance — $5,000 limit on joint/spine/connective tissue; 30-visit PT/OT/ST/Cardiac/Pulmonary rehab limit'] },
        { category: 'Inpatient Hospital', items: ['Subject to deductible and coinsurance'] },
        { category: 'Emergency Room', items: ['$250 access fee + deductible and coinsurance (waived if admitted)'] },
        { category: 'Urgent Care', items: ['$50 access fee — deductible waived, remaining subject to coinsurance'] },
        { category: 'Diagnostic/Lab/X-ray', items: ['Subject to deductible and coinsurance'] },
        { category: 'Child Immunizations', items: ['First dollar benefit (no deductible)'] },
        { category: 'Out-of-Network', items: ['Deductibles and coinsurance doubled; coinsurance % same'] }
      ],
      limitations: [
        'Short term medical — NOT ACA-compliant long-term coverage',
        'Pre-existing conditions may be excluded — underwriting required',
        'Family deductible capped at 3x individual',
        'Outpatient joint/spine/connective tissue limited to $5,000',
        'PT/OT/ST/Cardiac/Pulmonary rehab limited to 30 visits',
        'Out-of-network costs doubled',
        'Copays not applicable to out-of-network services',
        'No pharmacy copay plan included'
      ],
      waitingPeriods: ['No waiting period stated for most covered services'],
      preEx: 'Underwriting required — pre-existing conditions subject to review',
      source: 'Allstate_Enhanced_STM_PPO_Brochure.pdf',
      rawText: 'Allstate Enhanced STM PPO Plan Short Term Medical. Deductibles from $2,500 to $25,000. Coinsurance from 0% to 50%. Coverage period maximum $1,000,000. Office visits including preventive subject to deductible and coinsurance. Outpatient services subject to deductible and coinsurance $5,000 benefit limit on joint neck spine connective tissue tendons ligaments cartilage. 30 visit limit for PT OT ST cardiac pulmonary rehabilitation. Adult screenings subject to deductible and coinsurance. Inpatient hospital stays subject to deductible and coinsurance. Emergency room $250 access fee waived if admitted subject to deductible and coinsurance. Diagnostic x-ray lab subject to deductible and coinsurance. Urgent care $50 access fee deductible waived remaining subject to coinsurance. Child immunizations first dollar benefit no deductible. Out-of-network deductibles and coinsurance doubled. Family deductible capped at 3x individual. Copays not applicable out-of-network. Short term medical not ACA compliant. Pre-existing conditions subject to underwriting review. No waiting period stated. NEO Insurance Solutions PPO network Allstate.'
    },

    // ALLSTATE COPAY ENHANCED STM PPO
    {
      id: 'allstatecopayenhancedstm',
      name: 'Allstate Copay Enhanced STM PPO Plan',
      group: 'STM',
      type: 'STM',
      carrier: 'Allstate / NEO Insurance Solutions',
      network: 'PPO Network',
      benefits: [
        { category: 'Plan Type', items: ['Short Term Medical — PPO with copay structure'] },
        { category: 'Deductible Options', items: ['$6,000 or $8,000'] },
        { category: 'Coinsurance', items: ['0% (no coinsurance after deductible)'] },
        { category: 'Coverage Period Maximum', items: ['$5,000,000'] },
        { category: 'Office Visits (Copay)', items: ['$40 PCP / $60 Specialist including preventive'] },
        { category: 'Pharmacy', items: ['$10 copay on generic drugs — maximum benefit $3,000'] },
        { category: 'Outpatient Services', items: ['Subject to deductible — $5,000 limit on joint/spine/connective tissue; 30-visit PT/OT/ST rehab limit'] },
        { category: 'Inpatient Hospital', items: ['Subject to deductible'] },
        { category: 'Emergency Room', items: ['$250 access fee + deductible (waived if admitted)'] },
        { category: 'Urgent Care', items: ['$50 access fee — deductible waived, remaining subject to coinsurance'] },
        { category: 'Child Immunizations', items: ['First dollar benefit'] },
        { category: 'Out-of-Network', items: ['Deductibles doubled; copays not applicable out-of-network'] }
      ],
      limitations: [
        'Short term medical — NOT ACA-compliant',
        '$5M coverage period maximum — higher than Enhanced STM',
        'Copays additional to deductible and coinsurance',
        'Outpatient joint/spine/connective tissue limited to $5,000',
        'PT/OT/ST/Cardiac/Pulmonary rehab limited to 30 visits',
        'Copays not applicable to out-of-network',
        'Pre-existing conditions subject to underwriting'
      ],
      waitingPeriods: ['No waiting period stated for most services'],
      preEx: 'Underwriting required',
      source: 'Allstate_Copay_Enhanced_STM_PPO_Brochure.pdf',
      rawText: 'Allstate Copay Enhanced STM PPO Plan Short Term Medical. Choose between $6,000 and $8,000 deductible. Coinsurance 0%. Coverage period maximum $5,000,000. Office visits copay $40 PCP $60 specialist including preventive. Pharmacy $10 copay on generic drugs maximum benefit $3,000. Outpatient services subject to deductible $5,000 limit joint neck spine connective tissue 30 visit limit PT OT ST cardiac pulmonary rehab. Adult screenings includes immunizations subject to deductible and coinsurance. Inpatient hospital stays subject to deductible. Emergency room $250 access fee waived if admitted deductible applies. Urgent care $50 access fee deductible waived remaining subject to coinsurance. Child immunizations first dollar benefit. Out-of-network deductibles doubled copays not applicable. Short term medical not ACA compliant. Pre-existing conditions subject to underwriting. No waiting period stated. NEO Insurance Solutions PPO network Allstate.'
    },

    // ALLSTATE ESSENTIALS STM PPO
    {
      id: 'allstateessentialsstm',
      name: 'Allstate Essentials STM PPO Plan',
      group: 'STM',
      type: 'STM',
      carrier: 'Allstate / NEO Insurance Solutions',
      network: 'PPO Network',
      benefits: [
        { category: 'Plan Type', items: ['Short Term Medical — entry-level STM PPO'] },
        { category: 'Deductible Options', items: ['$5,000 / $10,000 / $25,000'] },
        { category: 'Coinsurance', items: ['40% (member pays 40% after deductible)'] },
        { category: 'Coinsurance OOP Max', items: ['$7,500 per member'] },
        { category: 'Coverage Period Maximum', items: ['$250,000'] },
        { category: 'Office Visits', items: ['Subject to deductible and coinsurance including preventive'] },
        { category: 'Outpatient Services', items: ['Subject to deductible and coinsurance — $15,000 limit; $5,000 joint/spine limit; 30-visit PT/OT/ST rehab limit'] },
        { category: 'Inpatient Hospital', items: ['Subject to deductible and coinsurance'] },
        { category: 'Emergency Room', items: ['$250 access fee + deductible and coinsurance (waived if admitted)'] },
        { category: 'Urgent Care', items: ['$50 access fee — deductible waived, remaining subject to coinsurance'] },
        { category: 'Child Immunizations', items: ['First dollar benefit'] },
        { category: 'Out-of-Network', items: ['Deductibles doubled; coinsurance same'] }
      ],
      limitations: [
        'Entry-level STM — lowest coverage maximum at $250,000',
        '40% coinsurance — member pays significant portion after deductible',
        'Not ACA-compliant — short term medical only',
        '$15,000 outpatient service limit',
        'Outpatient joint/spine/connective tissue limited to $5,000',
        'PT/OT/ST/Cardiac/Pulmonary rehab limited to 30 visits',
        'Out-of-network deductibles doubled',
        'Pre-existing conditions subject to underwriting'
      ],
      waitingPeriods: ['No waiting period stated'],
      preEx: 'Underwriting required',
      source: 'Allstate_Essentials_STM_PPO_Brochure.pdf',
      rawText: 'Allstate Essentials STM PPO Plan Short Term Medical. Deductibles $5,000 $10,000 $25,000. Coinsurance 40% member pays 40% after deductible. Coinsurance OOP max $7,500. Coverage period maximum $250,000. Office visits including preventive subject to deductible and coinsurance. Outpatient services $15,000 limit $5,000 limit joint neck spine connective tissue 30 visit limit PT OT ST cardiac pulmonary rehab. Inpatient hospital subject to deductible and coinsurance. Emergency room $250 access fee waived if admitted. Urgent care $50 access fee deductible waived. Child immunizations first dollar. Out-of-network deductibles doubled. Entry level STM lowest coverage max $250,000. 40% coinsurance. Not ACA compliant. Pre-existing conditions subject to underwriting. NEO Insurance Solutions Allstate PPO.'
    },

    // ALLSTATE HEALTH ACCESS
    {
      id: 'allstatehealthaccess',
      name: 'Allstate Health Access',
      group: 'Limited',
      type: 'Limited',
      carrier: 'Allstate / NEO Insurance Solutions',
      network: 'Provider search available through plan',
      benefits: [
        { category: 'Eligibility Note', items: ['Males over 300 lbs and females over 250 lbs NOT eligible'] },
        { category: 'Deductible', items: ['$0'] },
        { category: 'Waiting Period', items: ['3 months for preventive services only'] },
        { category: 'Hospital Admission (PLUS tier)', items: ['Year 1: $6,000 / Year 2: $9,000 / Year 3: $12,000'] },
        { category: 'Hospital Confinement Sickness (PLUS)', items: ['$6,000 — unlimited days'] },
        { category: 'Hospital Confinement Injury (PLUS)', items: ['$6,000 — unlimited days'] },
        { category: 'ICU Confinement (PLUS)', items: ['$6,000 — 60 days'] },
        { category: 'Emergency Room (PLUS)', items: ['$300'] },
        { category: 'Surgery Tier 1 (PLUS)', items: ['$10,000 — 3 days'] },
        { category: 'Surgery Tier 2 (PLUS)', items: ['$5,000 — 4 days'] },
        { category: 'Outpatient Surgery (PLUS)', items: ['$5,000 — 4 days'] },
        { category: 'Anesthesia Tier 1 (PLUS)', items: ['$5,000'] },
        { category: 'Ambulatory Surgical Center (PLUS)', items: ['$3,000 — 3 days'] },
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
      preEx: '12-month exclusion — 1-year look-back for signs/symptoms or treatment',
      source: 'Allstate_Health_Access_Brochure.pdf',
      rawText: 'Allstate Health Access Limited Medical Metal Gap indemnity three tiers CORE VALUE PLUS. Weight restriction males over 300 lbs females over 250 lbs not eligible. Deductible $0. Waiting period 3 months preventive only. Pre-existing condition exclusion 12 months from effective date 1 year look-back for signs symptoms treatment diagnosis. Hospital admission PLUS year 1 $6,000 year 2 $9,000 year 3 $12,000. Hospital confinement sickness PLUS $6,000 unlimited days. Hospital confinement injury PLUS $6,000 unlimited days. ICU PLUS $6,000 60 days. Emergency room PLUS $300. Surgery tier 1 PLUS $10,000 3 days. Surgery tier 2 PLUS $5,000 4 days. Outpatient surgery PLUS $5,000 4 days. Anesthesia PLUS $5,000. Ambulatory surgical center PLUS $3,000 3 days. Office visit PLUS $200 4 visits. Urgent care PLUS $150 4 visits. Inpatient physician PLUS $200 4 visits. Preventive office visit PLUS $175 2 visits. Radiology PLUS $200. Laboratory test PLUS $35 10 visits. Chemotherapy PLUS $4,000 monthly max. Observation unit PLUS $1,500 3 days. Ambulance ground water PLUS $25,000. Ambulance air PLUS $1,500 2 days. Office visit increasing benefit year 1 $4,000 year 2 $6,000 year 3 $8,000 PLUS. Exclusions mental illness substance abuse hazardous activities eye exams hearing cosmetic gastric bypass chronic pain foot conditions outside US war self-inflicted injury felony. Not ACA compliant limited benefit fixed indemnity. NEO Insurance Solutions Allstate.'
    },

    // MYCHOICE PLAN LOW
    {
      id: 'mychoicelow',
      name: 'MyChoice - Plan Low',
      group: 'Limited',
      type: 'Limited',
      carrier: 'BWA / FirstEnroll',
      network: 'See plan certificate for network details',
      benefits: [
        { category: 'Plan Type', items: ['Limited benefit — MyChoice entry-level plan'] },
        { category: 'Tier', items: ['Low tier — lowest benefit levels of MyChoice series'] }
      ],
      limitations: [
        'Limited benefit plan — not comprehensive health insurance',
        'Not a substitute for major medical',
        'Does not satisfy ACA minimum essential coverage',
        'See plan certificate for exact benefit amounts'
      ],
      waitingPeriods: ['Check certificate for waiting periods'],
      preEx: 'Check certificate for pre-existing condition terms',
      source: 'MyChoice_Low_Brochure_1.pdf',
      rawText: 'MyChoice Plan Low Limited benefit entry level lowest tier of MyChoice series. BWA FirstEnroll. Not comprehensive health insurance not substitute for major medical does not satisfy ACA MEC. See certificate for exact benefit amounts waiting periods pre-existing condition terms network details.'
    },

    // MYCHOICE PLAN MID
    {
      id: 'mychoicemid',
      name: 'MyChoice - Plan Mid',
      group: 'Limited',
      type: 'Limited',
      carrier: 'BWA / FirstEnroll',
      network: 'See plan certificate for network details',
      benefits: [
        { category: 'Plan Type', items: ['Limited benefit — MyChoice mid-tier plan'] },
        { category: 'Tier', items: ['Mid tier — moderate benefit levels of MyChoice series'] }
      ],
      limitations: [
        'Limited benefit plan — not comprehensive health insurance',
        'Not a substitute for major medical',
        'Does not satisfy ACA minimum essential coverage',
        'See plan certificate for exact benefit amounts'
      ],
      waitingPeriods: ['Check certificate for waiting periods'],
      preEx: 'Check certificate for pre-existing condition terms',
      source: 'MyChoice_Mid_Brochure_1.pdf',
      rawText: 'MyChoice Plan Mid Limited benefit mid tier moderate benefits of MyChoice series. BWA FirstEnroll. Not comprehensive health insurance not substitute for major medical does not satisfy ACA MEC. See certificate for exact benefit amounts.'
    },

    // MYCHOICE PLAN HIGH
    {
      id: 'mychoicehigh',
      name: 'MyChoice - Plan High',
      group: 'Limited',
      type: 'Limited',
      carrier: 'BWA / FirstEnroll',
      network: 'See plan certificate for network details',
      benefits: [
        { category: 'Plan Type', items: ['Limited benefit — MyChoice highest-tier plan'] },
        { category: 'Tier', items: ['High tier — highest benefit levels of MyChoice series'] }
      ],
      limitations: [
        'Limited benefit plan — not comprehensive health insurance',
        'Not a substitute for major medical',
        'Does not satisfy ACA minimum essential coverage',
        'See plan certificate for exact benefit amounts'
      ],
      waitingPeriods: ['Check certificate for waiting periods'],
      preEx: 'Check certificate for pre-existing condition terms',
      source: 'MyChoice_High_Brochure_1.pdf',
      rawText: 'MyChoice Plan High Limited benefit highest tier best benefits of MyChoice series. BWA FirstEnroll. Not comprehensive health insurance not substitute for major medical does not satisfy ACA MEC. See certificate for exact benefit amounts.'
    },

    // TRUE HEALTH 2
    {
      id: 'trueh2',
      name: 'TrueHealth 2',
      group: 'MEC',
      type: 'MEC',
      carrier: 'Merchants Benefit Administration (MBA)',
      network: 'First Health Network',
      benefits: [
        { category: 'Primary Care Visit', items: ['$25 copay / $150 max per visit — 4 visits per year'] },
        { category: 'Specialist / Urgent Care', items: ['$50 copay / $300 max per visit — 2 visits per year'] },
        { category: 'Inpatient Hospitalization', items: ['$1,000 per day — $10,000 per year maximum — 12/12 pre-ex applies'] },
        { category: 'Telemedicine', items: ['$0 consult fee — unlimited'] },
        { category: 'Prescriptions Generic', items: ['$0 copay — generic acute/preventive drugs on formulary'] },
        { category: 'Prescriptions Maintenance', items: ['Preferred Generic $5 copay — 200 generic maintenance drugs'] },
        { category: 'Prescription Terms', items: ['Specialty drugs not covered — Prescription Assistance Program available income-based. Mail order optional.'] },
        { category: 'Hospital Bill Reducer', items: ['Advocacy service included'] }
      ],
      limitations: [
        'MEC plan — covers preventive and limited physician services only',
        'NOT comprehensive major medical coverage',
        'Hospitalization subject to 12-month pre-existing condition exclusion',
        '30-day waiting period for all sickness benefits',
        'Outpatient physician services in-network only',
        'Inpatient hospital indemnity not network-restricted',
        'Specialty drugs not covered',
        'Only 2 specialist visits per year',
        'Does not cover services not listed in Schedule of Benefits'
      ],
      waitingPeriods: ['30-day waiting period for all sickness benefits'],
      preEx: '12/12 — 12-month look-back, 12-month exclusion for hospitalization benefits',
      source: 'MEC_TrueHealth2_SPD_Jan25.pdf',
      rawText: 'TrueHealth 2 MEC Minimum Essential Coverage. Physician services First Health Network. Primary care $25 copay $150 max per visit 4 visits per year. Specialist urgent care $50 copay $300 max per visit 2 visits per year. Inpatient hospitalization $1,000 per day $10,000 per year maximum 12 12 pre-existing exclusion. Telemedicine $0 consult fee unlimited. Prescriptions generic $0 copay acute preventive formulary. Preferred generic $5 copay 200 maintenance drugs. Specialty drugs not covered prescription assistance program income based. Mail order optional. Hospital bill reducer advocacy. 30 day waiting period sickness benefits. Outpatient physician services in-network only. Inpatient hospital indemnity not network restricted. MEC plan covers preventive limited physician services not comprehensive major medical. Group health plan ACA minimum essential coverage preventive wellness.'
    },

    // TRUE HEALTH 3
    {
      id: 'trueh3',
      name: 'TrueHealth 3',
      group: 'MEC',
      type: 'MEC',
      carrier: 'Merchants Benefit Administration (MBA)',
      network: 'First Health Network',
      benefits: [
        { category: 'Primary Care Visit', items: ['$25 copay / $150 max per visit — 4 visits per year'] },
        { category: 'Specialist / Urgent Care', items: ['$50 copay / $300 max per visit — 4 visits per year'] },
        { category: 'Inpatient Hospitalization', items: ['$1,000 per day — $15,000 per year maximum — 12/12 pre-ex applies'] },
        { category: 'Telemedicine', items: ['$0 consult fee — unlimited'] },
        { category: 'Prescriptions Generic', items: ['$0 copay — generic acute/preventive drugs on formulary'] },
        { category: 'Prescriptions Maintenance', items: ['Preferred Generic $5 copay — 200 generic maintenance drugs'] },
        { category: 'Prescriptions Non-preferred Generic', items: ['Retail 30-day $5/$10 copay. Mail order 90-day $5/$20 copay'] },
        { category: 'Prescriptions Brand', items: ['Prior Authorization required — Retail 30-day $40. Mail order 90-day $80'] },
        { category: 'Prescription Terms', items: ['$150 benefit limit per person per month for non-preventive maintenance Rx. Specialty drugs not covered.'] },
        { category: 'Hospital Bill Reducer', items: ['Advocacy service included'] }
      ],
      limitations: [
        'MEC plan — covers preventive and limited physician services only',
        'NOT comprehensive major medical coverage',
        'Higher hospitalization max ($15,000/yr) vs TrueHealth 2 ($10,000/yr)',
        'More specialist visits (4/yr) vs TrueHealth 2 (2/yr)',
        'Brand prescriptions require prior authorization',
        '$150/person/month benefit limit for non-preventive maintenance Rx',
        'Specialty drugs not covered',
        '30-day waiting period for all sickness benefits',
        'Hospitalization subject to 12-month pre-existing condition exclusion',
        'Outpatient physician services in-network only'
      ],
      waitingPeriods: ['30-day waiting period for all sickness benefits'],
      preEx: '12/12 — 12-month look-back, 12-month exclusion for hospitalization benefits',
      source: 'MEC_TrueHealth3_SPD_Jan25.pdf',
      rawText: 'TrueHealth 3 MEC Minimum Essential Coverage. Physician services First Health Network. Primary care $25 copay $150 max 4 visits per year. Specialist urgent care $50 copay $300 max 4 visits per year higher than TrueHealth 2. Inpatient hospitalization $1,000 per day $15,000 per year maximum 12 12 pre-existing exclusion. Telemedicine $0 unlimited. Prescriptions generic $0 copay formulary. Preferred generic maintenance $5 copay 200 drugs. Non-preferred generic retail 30 day $5 $10 mail order 90 day $5 $20. Brand prior authorization required retail 30 day $40 mail order 90 day $80. $150 benefit limit per person per month non-preventive maintenance prescriptions. Specialty drugs not covered prescription assistance income based. 30 day waiting period sickness. Outpatient physician in-network only. MEC not comprehensive major medical. Hospital bill reducer advocacy included.'
    }

  ];

  if (typeof POLICY_DOCS !== 'undefined' && Array.isArray(POLICY_DOCS)) {
    var existingIds = POLICY_DOCS.map(function (p) { return p.id; });
    EXTENDED_PLANS.forEach(function (plan) {
      if (existingIds.indexOf(plan.id) === -1) {
        POLICY_DOCS.push(plan);
      }
    });
  } else {
    window._CHA_EXTENDED_PLANS = EXTENDED_PLANS;
  }

})();
