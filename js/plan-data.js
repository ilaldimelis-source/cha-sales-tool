// plan-data.js — POLICY_DOCS array (pure data, no functions)
// Loaded before policy-docs.js which handles render/filter/toggle
var POLICY_DOCS = [
  {
    group: 'MEC',
    id: 'medf1',
    name: 'MedFirst 1',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MhBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    network: 'First Health',
    source: 'MEC_MedFirst1_SPDh_Jan25.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care Office Visit: $25 copay — 3 visits/yr — $150 max/visit',
          'Specialist or Urgent Care: $50 copay — 1 visit/yr — $300 max/visit',
          'All sickness benefits subject to 30-day waiting period',
          'Outpatient physician services: in-network providers only'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'In-Patient Hospitalization: $1,000/day — $5,000/year maximum',
          '12/12 pre-existing condition exclusion applies',
          'Hospital indemnity benefits are NOT limited to in-network only'
        ]
      },
      {
        category: 'Telemedicine',
        items: [
          '$0 consult fee — No maximum visits',
          'Board-certified physicians available 24/7'
        ]
      },
      {
        category: 'Prescriptions',
        items: [
          'Discount prescriptions only — participating pharmacies',
          'No formulary drug coverage — discount program only'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: [
          'Preventive health services covered per ACA §2713(a)',
          'Annual physical exam: 1 per plan year',
          'Immunizations per CDC/ACIP recommendations',
          'USPSTF "A" and "B" rated screenings covered'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse / drug rehabilitation coverage',
      'Pre-existing conditions: excluded for first 12 months of coverage (12/12 rule)',
      '30-day waiting period for all sickness benefits',
      'Benefits are FIXED AMOUNTS toward services — not full bill coverage',
      'Outpatient physician and wellness benefits: in-network providers only',
      'NO dental procedures covered',
      'NO cosmetic surgery (unless medically necessary per defined criteria)',
      'NO services outside the United States',
      'NO experimental or investigational treatments',
      'NO routine foot care (flat feet, corns, bunions, calluses, toenails)',
      'NO vision exams, eyeglasses, contacts, hearing aids',
      'NO abortion services',
      'NO claims from non-medically necessary services',
      'NO Workers Compensation claims',
      'Plan does not cover any service NOT listed in Schedule of Benefits',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: [
      '30 days — all sickness benefits',
      'Day 1 — accident/injury coverage'
    ],
    preEx:
      '12-month exclusion for conditions diagnosed/treated in prior 12 months',
    planNotes:
      'Entry-level MEC. PCP and specialist visit limits are very low (3/yr and 1/yr). Hospital indemnity $5,000/yr max. Rx is discount-only. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'medf2',
    name: 'MedFirst 2',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    network: 'First Health',
    source: 'MEC_MedFirst2_SPD_Jan25.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care Office Visit: $25 copay — 4 visits/yr — $150 max/visit',
          'Specialist or Urgent Care: $50 copay — 2 visits/yr — $300 max/visit',
          'All sickness benefits subject to 30-day waiting period'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'In-Patient Hospitalization: $1,000/day — $10,000/year maximum',
          '12/12 pre-existing condition exclusion applies'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay (acute & preventive) — up to 30-day supply',
          'Preferred generic (200 maintenance drugs): $5 copay — retail 30-day or mail 90-day',
          'Off-formulary: discount pricing applies',
          'Specialty drugs NOT covered — Prescription Assistance Program available (income-based)',
          'Mail order optional for generic and brand drugs'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: [
          'Full ACA-required preventive services covered',
          'Annual physical: 1 per plan year'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse / drug rehabilitation coverage',
      'Pre-existing conditions: excluded first 12 months (12/12)',
      '30-day sickness waiting period',
      'Specialty drugs NOT covered',
      'NO dental, vision, hearing aids',
      'NO cosmetic surgery (unless medically necessary)',
      'NO experimental treatments',
      'NO services outside the United States',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion for prior 12-month diagnosed conditions',
    planNotes:
      'Step up from MedFirst 1. Adds formulary Rx ($0 generic), doubles hospital max to $10,000, adds 1 more PCP and specialist visit. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'medf3',
    name: 'MedFirst 3',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    network: 'First Health',
    source: 'MEC_MedFirst3_SPD_Jan25.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care Office Visit: $25 copay — 4 visits/yr — $150 max/visit',
          'Specialist or Urgent Care: $50 copay — 4 visits/yr — $300 max/visit'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'In-Patient Hospitalization: $1,000/day — $15,000/year maximum',
          '12/12 pre-existing condition exclusion applies'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay (acute & preventive)',
          'Preferred generic (200 maintenance drugs): $5 copay',
          'Non-preferred generic: $5–$10 retail / $5–$20 mail order',
          'Brand (prior auth required): $40 retail / $80 mail order',
          '$150/month benefit limit per person for non-preventive Rx',
          'Specialty drugs NOT covered — PAP available',
          'Mail order optional'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services', 'Annual physical 1/yr']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse / drug rehabilitation coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      '$150/month Rx cap for non-preventive medications',
      'Specialty drugs NOT covered',
      'NO dental, vision, hearing',
      'NO experimental treatments',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion for prior 12-month conditions',
    planNotes:
      'Mid-tier MEC. Specialist visits jump to 4/yr. Hospital max $15,000. Full brand Rx with $150/mo cap. Good balance plan. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'medf4',
    name: 'MedFirst 4',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    network: 'First Health',
    source: 'MEC_MedFirst4_SPD_Jan25.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Wellness Exam: $25 copay — 1 visit/yr — $150 max',
          'Primary Care Office Visit: $50 copay — 4 visits/yr — $150 max',
          'Specialist or Urgent Care: $75 copay — 4 visits/yr — $300 max'
        ]
      },
      {
        category: 'Hospital & Surgery',
        items: [
          'In-Patient Hospitalization: $1,000/day — $10,000/year max — 12/12 pre-ex',
          'In/Outpatient Surgery: $1,000/year — $2,000/year max — 12/12 pre-ex',
          'Emergency Room (if admitted): $1,000/per incident — 12/12 pre-ex',
          'Ambulance (if admitted): $500/per incident — 12/12 pre-ex'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay',
          'Preferred generic: $5 copay',
          'Non-preferred generic: $5–$10 retail',
          'Brand (prior auth): $40 retail / $80 mail order',
          '$150/month benefit limit for non-preventive Rx',
          'Specialty drugs NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services', 'Annual physical 1/yr']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan',
          'No out-of-pocket maximum',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Accidents: Covered from Day 1',
          'Preventive care: ACA-required services at $0',
          'Advocacy: Hospital Bill Reducer — MyHealthcare Ninja'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse / drug rehabilitation coverage',
      'Pre-existing conditions excluded first 12 months (12/12)',
      '30-day sickness waiting period',
      'ER only covered if admitted — observation stays not covered',
      'Ambulance only covered if admitted',
      '$150/month Rx cap for non-preventive medications',
      'Specialty drugs NOT covered',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — pre-negotiated discounted rates available through First Health PPO at providersearch.multiplan.com',
      'MRI and CT scans: Not covered as insurance — discounted rates available in-network',
      'Blood work and lab tests: Not a covered insurance benefit — discounted rates available through First Health PPO network',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Mental health and substance abuse: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Dental and vision: Not covered',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Specialty prescription drugs: Not covered — Prescription Assistance Program available',
      'NICU neonatal intensive care: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'First MedFirst tier with surgery benefit, ER benefit (if admitted), and ambulance. Copays increase: $50 PCP / $75 specialist. | 30-day waiting period for all sickness benefits. Injuries Day 1. | 12/12 pre-existing condition rule applies to hospitalization, surgery, ER, and ambulance | Network: First Health PPO — outpatient physician and wellness in-network only. Find providers at providersearch.multiplan.com'
  },
  {
    group: 'MEC',
    id: 'medf5',
    name: 'MedFirst 5',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    network: 'First Health',
    source: 'MEC_MedFirst5_SPD_Jan25.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Wellness Exam: $25 copay — 1 visit/yr — $150 max',
          'Primary Care Office Visit: $50 copay — 5 visits/yr — $150 max',
          'Specialist or Urgent Care: $75 copay — 5 visits/yr — $300 max'
        ]
      },
      {
        category: 'Hospital & Surgery',
        items: [
          'In-Patient Hospitalization: $1,500/day — $15,000/year max — 12/12 pre-ex',
          'In/Outpatient Surgery: $1,500/day — $4,500/year max — 12/12 pre-ex',
          'Emergency Room (if admitted): $1,000/per incident — 12/12 pre-ex',
          'Ambulance (if admitted): $500/per incident — 12/12 pre-ex'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay',
          'Preferred generic: $5 copay',
          'Non-preferred generic: $5–$10 retail / $5–$20 mail order',
          'Brand (prior auth): $40 retail / $80 mail order',
          '$150/month benefit limit for non-preventive Rx',
          'Specialty drugs NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services', 'Annual physical 1/yr']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan',
          'No out-of-pocket maximum',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Accidents: Covered from Day 1',
          'Preventive care: ACA-required services at $0',
          'Advocacy: Hospital Bill Reducer — MyHealthcare Ninja'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse / drug rehabilitation coverage',
      'Pre-existing conditions excluded first 12 months (12/12)',
      '30-day sickness waiting period',
      'ER covered only if admitted',
      'Ambulance covered only if admitted',
      '$150/month Rx cap for non-preventive medications',
      'Specialty drugs NOT covered',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — pre-negotiated discounted rates available through First Health PPO at providersearch.multiplan.com',
      'MRI and CT scans: Not covered as insurance — discounted rates available in-network',
      'Blood work and lab tests: Not a covered insurance benefit — discounted rates available through First Health PPO network',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Mental health and substance abuse: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Dental and vision: Not covered',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Specialty prescription drugs: Not covered — Prescription Assistance Program available',
      'NICU neonatal intensive care: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Top MedFirst tier. Hospital $1,500/day up to $15,000. Surgery $4,500/yr max. 5 PCP and specialist visits. Most comprehensive MEC option. | 30-day waiting period for all sickness benefits. Injuries Day 1. | 12/12 pre-existing condition rule applies to hospitalization, surgery, ER, and ambulance | Network: First Health PPO — outpatient physician and wellness in-network only. Find providers at providersearch.multiplan.com'
  },
  {
    group: 'MEC',
    id: 'trueh1',
    name: 'TrueHealth 1',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    network: 'First Health',
    source: 'MEC_TrueHealth1_SPD_Jan25.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care Office Visit: $25 copay — 3 visits/yr — $150 max/visit',
          'Specialist or Urgent Care: $50 copay — 1 visit/yr — $300 max/visit'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'In-Patient Hospitalization: $1,000/day — $5,000/year maximum',
          '12/12 pre-existing condition exclusion applies'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: ['Discount prescriptions only — participating pharmacies']
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services', 'Annual physical 1/yr']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse / drug rehabilitation coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'Rx is discount-only — no formulary coverage',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Same exclusions as MedFirst 1 — see MedFirst 1 full exclusions list',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Identical structure to MedFirst 1. Marketed under TrueHealth association. Good entry plan for healthy, budget-conscious prospects. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'ghdp1',
    name: 'GoodHealth 1 (GHDP-1)',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'Good Health Distribution Partners',
    network: 'First Health',
    source: 'MEC_GHDP1_1.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $25 copay — 3 visits/yr — $150 max',
          'Specialist or Urgent Care: $50 copay — 1 visit/yr — $300 max'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'In-Patient Hospitalization: $1,000/day — $5,000/year max — 12/12 pre-ex'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: ['Discount prescriptions only — participating pharmacies']
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services']
      },
      {
        category: 'Peer Support',
        items: ['Kindly Human — 24/7 peer support access (non-medical)']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse / drug rehabilitation coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'Rx is discount-only — no formulary coverage',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Same structure as MedFirst 1 / TrueHealth 1 but under GoodHealth association. Includes Kindly Human peer support benefit. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'ghdp2',
    name: 'GoodHealth 2 (GHDP-2)',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'Good Health Distribution Partners',
    network: 'First Health',
    source: 'MEC_GHDP2_1.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $25 copay — 4 visits/yr — $150 max',
          'Specialist or Urgent Care: $50 copay — 2 visits/yr — $300 max'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'In-Patient Hospitalization: $1,000/day — $10,000/year max — 12/12 pre-ex'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay (acute & preventive)',
          'Preferred generic (200 drugs): $5 copay',
          'Off-formulary: discount pricing',
          'Specialty drugs NOT covered — PAP available'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'Specialty drugs NOT covered',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'GoodHealth equivalent of MedFirst 2. Adds formulary generic Rx. Hospital max $10,000. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'ghdp3',
    name: 'GoodHealth 3 (GHDP-3)',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'Good Health Distribution Partners',
    network: 'First Health',
    source: 'MEC_GHDP3_1.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $25 copay — 4 visits/yr — $150 max',
          'Specialist or Urgent Care: $50 copay — 4 visits/yr — $300 max'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'In-Patient Hospitalization: $1,000/day — $15,000/year max — 12/12 pre-ex'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay',
          'Preferred generic: $5 copay',
          'Non-preferred generic: $5–$10 retail / $5–$20 mail order',
          'Brand (prior auth): $40 retail / $80 mail order',
          '$150/month benefit limit for non-preventive Rx',
          'Specialty drugs NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      '$150/month Rx cap for non-preventive',
      'Specialty drugs NOT covered',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'GoodHealth equivalent of MedFirst 3. Full brand Rx with $150/mo cap. Hospital max $15,000. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'ghdp4',
    name: 'GoodHealth 4 (GHDP-4)',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'Good Health Distribution Partners',
    network: 'First Health',
    source: 'MEC_GHDP4_1.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Wellness Exam: $25 copay — 1 visit/yr — $150 max',
          'Primary Care: $50 copay — 4 visits/yr — $150 max',
          'Specialist or Urgent Care: $75 copay — 4 visits/yr — $300 max'
        ]
      },
      {
        category: 'Hospital & Surgery',
        items: [
          'In-Patient Hospitalization: $1,000/day — $10,000/year max — 12/12 pre-ex',
          'In/Outpatient Surgery: $1,000/year — $2,000/year max — 12/12 pre-ex',
          'Emergency Room (if admitted): $1,000/per incident — 12/12 pre-ex',
          'Ambulance (if admitted): $500/per incident — 12/12 pre-ex'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay',
          'Preferred generic: $5 copay',
          'Brand (prior auth): $40 retail / $80 mail order',
          '$150/month cap non-preventive Rx',
          'Specialty drugs NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan',
          'No out-of-pocket maximum',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Accidents: Covered from Day 1',
          'Preventive care: ACA-required services at $0',
          'Advocacy: Hospital Bill Reducer — MyHealthcare Ninja'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'ER covered only if admitted',
      'Ambulance covered only if admitted',
      '$150/month Rx cap',
      'Specialty drugs NOT covered',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — pre-negotiated discounted rates available through First Health PPO at providersearch.multiplan.com',
      'MRI and CT scans: Not covered as insurance — discounted rates available in-network',
      'Blood work and lab tests: Not a covered insurance benefit — discounted rates available through First Health PPO network',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Mental health and substance abuse: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Dental and vision: Not covered',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Specialty prescription drugs: Not covered — Prescription Assistance Program available',
      'NICU neonatal intensive care: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'GoodHealth equivalent of MedFirst 4. Adds surgery, ER (if admitted), ambulance. | 30-day waiting period for all sickness benefits. Injuries Day 1. | 12/12 pre-existing condition rule applies to hospitalization, surgery, ER, and ambulance | Network: First Health PPO — outpatient physician and wellness in-network only. Find providers at providersearch.multiplan.com'
  },
  {
    group: 'MEC',
    id: 'ghdp5',
    name: 'GoodHealth 5 (GHDP-5)',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'Good Health Distribution Partners',
    network: 'First Health',
    source: 'MEC_GHDP5_2.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Wellness Exam: $25 copay — 1 visit/yr — $150 max',
          'Primary Care: $50 copay — 5 visits/yr — $150 max',
          'Specialist or Urgent Care: $75 copay — 5 visits/yr — $300 max'
        ]
      },
      {
        category: 'Hospital & Surgery',
        items: [
          'In-Patient Hospitalization: $1,500/day — $15,000/year max — 12/12 pre-ex',
          'In/Outpatient Surgery: $1,500/day — $4,500/year max — 12/12 pre-ex',
          'Emergency Room (if admitted): $1,000/per incident — 12/12 pre-ex',
          'Ambulance (if admitted): $500/per incident — 12/12 pre-ex'
        ]
      },
      {
        category: 'Telemedicine',
        items: ['$0 consult fee — No maximum']
      },
      {
        category: 'Prescriptions',
        items: [
          'Formulary generic: $0 copay',
          'Preferred generic: $5 copay',
          'Non-preferred generic: $5–$10 retail',
          'Brand (prior auth): $40 retail / $80 mail order',
          '$150/month cap non-preventive Rx',
          'Specialty drugs NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['Full ACA preventive services']
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan',
          'No out-of-pocket maximum',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Accidents: Covered from Day 1',
          'Preventive care: ACA-required services at $0',
          'Advocacy: Hospital Bill Reducer — MyHealthcare Ninja'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'NO maternity or pregnancy coverage',
      'NO mental health coverage',
      'NO substance abuse coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'ER covered only if admitted',
      'Ambulance covered only if admitted',
      '$150/month Rx cap',
      'Specialty drugs NOT covered',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — pre-negotiated discounted rates available through First Health PPO at providersearch.multiplan.com',
      'MRI and CT scans: Not covered as insurance — discounted rates available in-network',
      'Blood work and lab tests: Not a covered insurance benefit — discounted rates available through First Health PPO network',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Mental health and substance abuse: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Dental and vision: Not covered',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Specialty prescription drugs: Not covered — Prescription Assistance Program available',
      'NICU neonatal intensive care: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'GoodHealth equivalent of MedFirst 5. Top tier — hospital $1,500/day, $15,000/yr. Surgery $4,500/yr. 5 PCP and specialist visits. | 30-day waiting period for all sickness benefits. Injuries Day 1. | 12/12 pre-existing condition rule applies to hospitalization, surgery, ER, and ambulance | Network: First Health PPO — outpatient physician and wellness in-network only. Find providers at providersearch.multiplan.com'
  },
  {
    group: 'MEC',
    id: 'tdk1',
    name: 'TDK 1',
    type: 'MEC — Limited Health & Wellness',
    carrier: 'Detego Health LLC (TPA)',
    assoc: 'Healthcare Data Analytics',
    network: 'First Health',
    source: 'TDK_Promo_Combined.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $25 copay — 3 visits/yr — $150 max/visit',
          'Specialist: $50 copay — 1 visit/yr — $300 max/visit',
          'Urgent Care: $50 copay — 1 visit/yr — $300 max/visit'
        ]
      },
      {
        category: 'Telemedicine (MyLiveDoc)',
        items: [
          'Virtual Primary Care: $0 copay',
          'Virtual Urgent Care: $0 copay',
          'Virtual Mental Health: 4 visits/yr per family member'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'Inpatient: $1,000/day — $5,000/yr max',
          'Outpatient: NOT covered',
          'Emergency Room: NOT covered',
          'Ambulance: NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Retail generic: available through MyLiveDoc pharmacy solution',
          'Home delivery (chronic): available with select plans',
          'Brand/specialty drugs: NOT covered — ScriptAide PAP/SPIP available'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          'Inpatient: NOT covered',
          'Outpatient: NOT covered (virtual available through MyLiveDoc)'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'This is a Limited Health & Wellness Plan',
      'NO maternity or pregnancy coverage',
      'NO mental health inpatient/outpatient coverage',
      'NO substance abuse coverage',
      'NO ER, outpatient, ambulance, or surgery coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'No out-of-pocket maximum',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Entry-level TDK plan. Detego Health admin, First Health network, MyLiveDoc telemedicine. Basic PCP + specialist + hospital only. Good for healthy individuals who primarily need preventive + doctor visits. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'tdk2',
    name: 'TDK 2',
    type: 'MEC — Limited Health & Wellness',
    carrier: 'Detego Health LLC (TPA)',
    assoc: 'Healthcare Data Analytics',
    network: 'First Health',
    source: 'TDK_Promo_Combined.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $25 copay — 4 visits/yr — $150 max/visit',
          'Specialist: $50 copay — 2 visits/yr — $300 max/visit',
          'Urgent Care: $50 copay — 2 visits/yr — $300 max/visit'
        ]
      },
      {
        category: 'Telemedicine (MyLiveDoc)',
        items: [
          'Virtual Primary Care: $0 copay',
          'Virtual Urgent Care: $0 copay',
          'Virtual Mental Health: 4 visits/yr per family member'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'Inpatient: $1,000/day — $10,000/yr max',
          'Outpatient: NOT covered',
          'Emergency Room: NOT covered',
          'Ambulance: NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Retail generic: available through MyLiveDoc pharmacy solution',
          'Home delivery (chronic): available with select plans',
          'Brand/specialty drugs: NOT covered — ScriptAide PAP/SPIP available'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          'Inpatient: NOT covered',
          'Outpatient: NOT covered (virtual available through MyLiveDoc)'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'This is a Limited Health & Wellness Plan',
      'NO maternity or pregnancy coverage',
      'NO mental health inpatient/outpatient coverage',
      'NO ER, outpatient, ambulance, or surgery coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'No out-of-pocket maximum',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Mid-tier TDK plan. More visits (4 PCP, 2 specialist) and higher hospital cap ($10,000/yr). Same Detego Health admin, First Health network, MyLiveDoc telemedicine. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'tdk3',
    name: 'TDK 3',
    type: 'MEC — Limited Health & Wellness',
    carrier: 'Detego Health LLC (TPA)',
    assoc: 'Healthcare Data Analytics',
    network: 'First Health',
    source: 'TDK_Promo_Combined.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $25 copay — 4 visits/yr — $150 max/visit',
          'Specialist: $50 copay — 4 visits/yr — $300 max/visit',
          'Urgent Care: $50 copay — 4 visits/yr — $300 max/visit'
        ]
      },
      {
        category: 'Telemedicine (MyLiveDoc)',
        items: [
          'Virtual Primary Care: $0 copay',
          'Virtual Urgent Care: $0 copay',
          'Virtual Mental Health: 4 visits/yr per family member'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'Inpatient: $1,000/day — $15,000/yr max',
          'Outpatient: NOT covered',
          'Emergency Room: NOT covered',
          'Ambulance: NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Retail generic: available through MyLiveDoc pharmacy solution',
          'Home delivery (chronic): available with select plans',
          'Brand/specialty drugs: NOT covered — ScriptAide PAP/SPIP available'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          'Inpatient: NOT covered',
          'Outpatient: NOT covered (virtual available through MyLiveDoc)'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan, pays set amounts per service',
          'No out-of-pocket maximum — benefits capped per visit/day per schedule',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Advocacy: Hospital Bill Reducer included — MyHealthcare Ninja',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Preventive care: ACA-required preventive services covered at $0 cost'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'This is a Limited Health & Wellness Plan',
      'NO maternity or pregnancy coverage',
      'NO mental health inpatient/outpatient coverage',
      'NO ER, outpatient, ambulance, or surgery coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'No out-of-pocket maximum',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Deductible: None — this plan has no deductible, do not mislead members',
      'Out-of-pocket maximum: None — benefits are fixed dollar amounts per service',
      'Surgery: Not covered on Tier 1-3 — available on MedFirst/GoodHealth/TDK 4 and 5',
      'Emergency Room: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'Ambulance: Not covered on Tier 1-3 — available on Tier 4 and 5',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — no reimbursement',
      'MRI and CT scans: Not covered as insurance',
      'Blood work and lab tests: Not a covered insurance benefit',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Alternative medicine and homeopathy: Not covered',
      'Physical therapy, occupational therapy, speech therapy, rehabilitative therapy: Not covered',
      'Mental health and substance abuse treatment: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Newborn well-baby inpatient care: Not covered',
      'Neonatal intensive care NICU: Not covered',
      'Dental and vision: Not covered — discount only through plan add-ons',
      'Prescription drugs: Discount card only (BestChoiceRx on Tier 1) — not insurance. Tier 2-3 include actual Rx copay coverage per formulary',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'Durable medical equipment DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care, private duty nursing, long-term care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss treatment and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Sexual dysfunction treatment: Not covered',
      'TMJ temporomandibular joint syndrome: Not covered',
      'Biofeedback training: Not covered',
      'Aquatic therapy and massage therapy: Not covered',
      'Hearing aids and hearing exams: Not covered',
      'Non-emergency care outside the US: Not covered',
      'Workers compensation conditions: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Top of the basic TDK plans. 4 specialist visits (vs 1–2 on TDK 1–2), $15,000/yr hospital max. Still no ER/outpatient/surgery. | MEC Plan — not ACA major medical. Covers preventive services plus fixed dollar benefits listed in schedule only. If a service is not listed, it is not covered. | 30-day waiting period applies to all sickness benefits. Injuries covered Day 1. | 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months not covered for first 12 months. | Network: First Health PPO — members must use in-network providers for outpatient physician and wellness benefits. Find providers at providersearch.multiplan.com | For services not covered as insurance, members may access pre-negotiated discounted rates through First Health PPO network'
  },
  {
    group: 'MEC',
    id: 'tdk4',
    name: 'TDK 4',
    type: 'MEC — Limited Health & Wellness',
    carrier: 'Detego Health LLC (TPA)',
    assoc: 'Healthcare Data Analytics',
    network: 'First Health',
    source: 'TDK_Promo_Combined.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $50 copay — 4 visits/yr — $150 max/visit',
          'Specialist: $75 copay — 4 visits/yr — $300 max/visit',
          'Urgent Care: $75 copay — 4 visits/yr — $300 max/visit'
        ]
      },
      {
        category: 'Telemedicine (MyLiveDoc)',
        items: [
          'Virtual Primary Care: $0 copay',
          'Virtual Urgent Care: $0 copay',
          'Virtual Mental Health: 4 visits/yr per family member'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'Inpatient: $1,000/day — $10,000/yr max',
          'Outpatient: $1,000/day — $10,000/yr max',
          'Emergency Room: $1,000/incident',
          'Ambulance: $500/incident (if admitted)'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Retail generic: available through MyLiveDoc pharmacy solution',
          'Home delivery (chronic): available through MyLiveDoc',
          'Brand/specialty drugs: NOT covered — ScriptAide PAP/SPIP available'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          'Inpatient: NOT covered',
          'Outpatient: NOT covered (virtual available through MyLiveDoc)'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan',
          'No out-of-pocket maximum',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Accidents: Covered from Day 1',
          'Preventive care: ACA-required services at $0',
          'Advocacy: Hospital Bill Reducer — MyHealthcare Ninja'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'This is a Limited Health & Wellness Plan',
      'NO maternity or pregnancy coverage',
      'NO mental health inpatient/outpatient coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'No out-of-pocket maximum',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Higher copays than TDK 1–3 ($50 PCP, $75 specialist)',
      'Ambulance covered only if admitted',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — pre-negotiated discounted rates available through First Health PPO at providersearch.multiplan.com',
      'MRI and CT scans: Not covered as insurance — discounted rates available in-network',
      'Blood work and lab tests: Not a covered insurance benefit — discounted rates available through First Health PPO network',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Mental health and substance abuse: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Dental and vision: Not covered',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Specialty prescription drugs: Not covered — Prescription Assistance Program available',
      'NICU neonatal intensive care: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Enhanced TDK plan with ER + outpatient + ambulance. Higher copays ($50/$75) but adds hospital outpatient, ER ($1,000/incident), and ambulance ($500 if admitted). Same Detego Health admin. | 30-day waiting period for all sickness benefits. Injuries Day 1. | 12/12 pre-existing condition rule applies to hospitalization, surgery, ER, and ambulance | Network: First Health PPO — outpatient physician and wellness in-network only. Find providers at providersearch.multiplan.com'
  },
  {
    group: 'MEC',
    id: 'tdk5',
    name: 'TDK 5',
    type: 'MEC — Limited Health & Wellness',
    carrier: 'Detego Health LLC (TPA)',
    assoc: 'Healthcare Data Analytics',
    network: 'First Health',
    source: 'TDK_Promo_Combined.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Primary Care: $50 copay — 5 visits/yr — $150 max/visit',
          'Specialist: $75 copay — 5 visits/yr — $300 max/visit',
          'Urgent Care: $75 copay — 5 visits/yr — $300 max/visit'
        ]
      },
      {
        category: 'Telemedicine (MyLiveDoc)',
        items: [
          'Virtual Primary Care: $0 copay',
          'Virtual Urgent Care: $0 copay',
          'Virtual Mental Health: 4 visits/yr per family member'
        ]
      },
      {
        category: 'Hospital',
        items: [
          'Inpatient: $1,500/day — $15,000/yr max',
          'Outpatient: $1,500/day — $15,000/yr max',
          'In/Outpatient Surgery: $1,500/day — $4,500/yr max',
          'Emergency Room: $1,000/incident — $2,000/yr max',
          'Ambulance: $500/incident (if admitted)'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Retail generic: available through MyLiveDoc pharmacy solution',
          'Home delivery (chronic): available through MyLiveDoc',
          'Brand/specialty drugs: NOT covered — ScriptAide PAP/SPIP available'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          'Inpatient: NOT covered',
          'Outpatient: NOT covered (virtual available through MyLiveDoc)'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed dollar benefit plan',
          'No out-of-pocket maximum',
          'Telemedicine: $0 consult fee, unlimited visits — Opyn Live',
          'Accidents: Covered from Day 1',
          'Preventive care: ACA-required services at $0',
          'Advocacy: Hospital Bill Reducer — MyHealthcare Ninja'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant major medical insurance',
      'This is a Limited Health & Wellness Plan',
      'NO maternity or pregnancy coverage',
      'NO mental health inpatient/outpatient coverage',
      'Pre-existing conditions excluded first 12 months',
      '30-day sickness waiting period',
      'No out-of-pocket maximum',
      'Benefits are FIXED AMOUNTS — not full bill coverage',
      'Higher copays ($50 PCP, $75 specialist)',
      'Ambulance covered only if admitted',
      'X-ray and diagnostic imaging: Not a covered insurance benefit — pre-negotiated discounted rates available through First Health PPO at providersearch.multiplan.com',
      'MRI and CT scans: Not covered as insurance — discounted rates available in-network',
      'Blood work and lab tests: Not a covered insurance benefit — discounted rates available through First Health PPO network',
      'Chiropractic care: Not covered',
      'Acupuncture: Not covered',
      'Mental health and substance abuse: Not covered',
      'Maternity, pregnancy, childbirth, prenatal care, delivery: Not covered',
      'Dental and vision: Not covered',
      'Radiation and chemotherapy: Not covered',
      'Dialysis: Not covered',
      'Organ transplants: Not covered',
      'DME and prosthetics: Not covered',
      'Skilled nursing facilities: Not covered',
      'Hospice care: Not covered',
      'Genetic testing: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Specialty prescription drugs: Not covered — Prescription Assistance Program available',
      'NICU neonatal intensive care: Not covered'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — accidents'],
    preEx: '12-month exclusion',
    planNotes:
      'Top-tier TDK plan. Highest benefits: $1,500/day hospital, $15,000/yr max. Adds outpatient surgery ($4,500/yr). 5 PCP and specialist visits. ER + ambulance included. Mirrors GoodHealth 5 structure. | 30-day waiting period for all sickness benefits. Injuries Day 1. | 12/12 pre-existing condition rule applies to hospitalization, surgery, ER, and ambulance | Network: First Health PPO — outpatient physician and wellness in-network only. Find providers at providersearch.multiplan.com'
  },
  {
    group: 'STM',
    id: 'pinnacle',
    name: 'Pinnacle STM',
    type: 'Short-Term Medical',
    carrier: 'Everest Reinsurance Company',
    assoc: 'AWA — Americas Workers Association',
    network: 'PHCS Practitioner & Ancillary',
    source: 'Pinnacle_STM_Brochure.pdf',
    benefits: [
      {
        category: 'Doctor Visits',
        items: [
          'Doctor Office Consultation: $50 copay',
          'Wellness Benefit: $50 copay',
          'Doctor visits in-hospital: subject to deductible and coinsurance'
        ]
      },
      {
        category: 'Deductible & Coinsurance',
        items: [
          'Deductible options: $500 / $1,000 / $2,000 / $2,500 / $5,000 / $7,500 / $10,000',
          'Coinsurance: 50/50 or 80/20 (options vary — plan pays 50% or 80%)',
          'Out-of-pocket maximum: $5,000'
        ]
      },
      {
        category: 'Hospital & Surgery',
        items: [
          'Inpatient hospital: average standard room rate — subject to deductible/coinsurance',
          'ICU: average standard room rate',
          'Outpatient surgery: $500 deductible per surgery — max 3',
          'ER: $500 deductible per visit — max 3 visits',
          'Advanced diagnostic: $500 per occurrence',
          'Ambulance: $250 per transport (injury and sickness)'
        ]
      },
      {
        category: 'Extended Benefits',
        items: [
          'Extended care facility: $150/day — max 30 days',
          'Home health care: $50/visit — max 30 days',
          'Physical, occupational, speech therapy: $50/day — max 20 visits'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          'Inpatient mental health: $100/day — max 31 days',
          'Outpatient mental health: $50/day — max 10 visits',
          'Substance abuse inpatient: $100/day — max 31 days',
          'Substance abuse outpatient: $50/day — max 10 visits'
        ]
      },
      {
        category: 'Coverage Terms',
        items: [
          'Coverage length: 6-month or 364-day terms',
          'Consecutive terms available — up to 36 months max',
          'Next-day coverage effective date',
          'Benefits and deductibles RESET each policy block'
        ]
      },
      {
        category: 'Coverage Summary',
        items: [
          'Accidents: Covered from Day 1 (effective date)',
          'Sickness: Covered after 5-day waiting period from effective date',
          'Cancer: Covered after 30-day waiting period from effective date',
          'Doctor visits and urgent care: Covered — subject to deductible and coinsurance',
          'Inpatient hospitalization: Covered — subject to deductible and coinsurance',
          'Surgery (inpatient and outpatient): Covered — subject to deductible and coinsurance',
          'Emergency room: Covered — subject to deductible and additional ER deductible (waived if admitted within 24 hours)',
          'Ambulance: Covered — subject to deductible and coinsurance',
          'X-ray, lab work, blood work, diagnostic imaging: Covered as outpatient miscellaneous medical expenses — subject to deductible and coinsurance',
          'MRI and CT scans: Covered — subject to deductible and coinsurance',
          'Network: PHCS Practitioner Plus Ancillary Network — members can see any doctor but in-network avoids balance billing. Find providers at providersearch.multiplan.com',
          'Complications of pregnancy: Covered — standard maternity/childbirth NOT covered'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NO maternity coverage',
      'Pre-existing conditions: excluded 12 months if treated in prior 60 months',
      '5-day waiting period for sickness',
      '30-day waiting period for cancer',
      'NO waiting period for injuries (Day 1)',
      'NO prescription drug benefits (except drugs administered in-hospital)',
      'NO spinal manipulation or adjustments',
      'NO vision or dental treatments, foot care, orthotics',
      'NO cosmetic, experimental, or non-medically necessary treatment',
      'NO self-inflicted injuries, felony, under-the-influence, military service',
      'NO intercollegiate sports injuries',
      'Charges in excess of Maximum Allowable Expense NOT covered',
      'Joint/tendon surgery capped per schedule',
      'Kidney stones, appendectomy: capped per schedule',
      'AIDS/HIV: benefit-capped per schedule',
      'First 6 months: excluded — hysterectomy (unless cancer), tonsillectomy, adenoidectomy, hernia repair, gallbladder surgery, nasal/sinus surgery',
      'Plan terminates — NOT a qualifying life event for ACA enrollment',
      'Deductibles and limits RESET under new policy — any condition developed becomes pre-existing',
      'Pre-existing conditions: Not covered for conditions diagnosed or treated in the 12 months prior to effective date',
      'Maternity, standard childbirth, prenatal care, delivery services: Not covered — complications of pregnancy only',
      'Mental health and substance abuse: Not covered or very limited — check specific plan schedule',
      'Dental and vision: Not covered',
      'Prescription drugs (Pinnacle STM): Not covered as insurance — Rx Savers discount card included',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Non-emergency care outside US: Not covered',
      'Workers compensation conditions: Not covered',
      'Hazardous activity injuries: Not covered',
      'This plan is NOT ACA minimum essential coverage — not compliant with ACA requirements',
      'This plan cannot be renewed — member must reapply for new plan at end of term. New conditions developed under current plan become pre-existing on new plan',
      'Age limit: Coverage terminates at end of month member turns 65'
    ],
    waitingPeriods: [
      'Day 1 — injuries',
      '5 days — sickness',
      '30 days — cancer'
    ],
    preEx:
      'Conditions treated in prior 60 months excluded for first 12 months of coverage',
    planNotes:
      'True STM with deductible/coinsurance. Has limited mental health and substance abuse coverage. Next-day effective. PHCS network access. Policy terminates — NOT renewable as permanent coverage. | STM plan — not ACA compliant. Designed as temporary bridge coverage during life transitions. | Deductible options vary — confirm deductible chosen at enrollment ($500 to $10,000 options available) | Coinsurance: Plan pays percentage after deductible is met | Coverage period maximum applies — confirm at enrollment | Next-day coverage available if applied online with credit card or bank debit'
  },
  {
    group: 'STM',
    id: 'accesshealth',
    name: 'Access Health STM',
    type: 'Short-Term Medical',
    carrier: 'American Financial Security Life Insurance Co.',
    assoc: 'National Congress of Employers (NCE)',
    network: 'PHCS',
    source: 'Access_Health_STM.pdf',
    benefits: [
      {
        category: 'Doctor Visits (Plan 1)',
        items: [
          'PCP / Urgent Care: $25 copay — 2 visits — not subject to deductible',
          'Specialist: $40 copay — not subject to deductible'
        ]
      },
      {
        category: 'Doctor Visits (Plan 2)',
        items: [
          'PCP: $15 copay — unlimited — not subject to deductible',
          'Specialist: $25 copay'
        ]
      },
      {
        category: 'Doctor Visits (Plan 3)',
        items: [
          'PCP / Urgent Care: $25 copay — 2 visits — not subject to deductible',
          'Specialist: $40 copay'
        ]
      },
      {
        category: 'Deductible & Coinsurance',
        items: [
          'Deductible options: $500 / $1,000 / $2,000 / $2,500 / $5,000 / $7,500 / $10,000',
          'Coinsurance: 80/20',
          'Coinsurance limit: $2,000 or $4,000',
          'Coverage period maximum: $250,000 / $500,000 / $1,000,000'
        ]
      },
      {
        category: 'Network',
        items: [
          'PHCS network — voluntary access to in-network negotiated rates',
          'Facility charges: plan pays up to 150% of Medicare allowable',
          'No requirement to use in-network providers'
        ]
      },
      {
        category: 'Coverage Terms',
        items: [
          'Available up to 36 months depending on state',
          'Next-term waiting periods waived if consecutive enrollment',
          'Pre-ex waiver rider available to waive conditions from prior term'
        ]
      },
      {
        category: 'Coverage Summary',
        items: [
          'Accidents: Covered from Day 1 (effective date)',
          'Sickness: Covered after 5-day waiting period from effective date',
          'Cancer: Covered after 30-day waiting period from effective date',
          'Doctor visits and urgent care: Covered — subject to deductible and coinsurance',
          'Inpatient hospitalization: Covered — subject to deductible and coinsurance',
          'Surgery (inpatient and outpatient): Covered — subject to deductible and coinsurance',
          'Emergency room: Covered — subject to deductible and additional ER deductible (waived if admitted within 24 hours)',
          'Ambulance: Covered — subject to deductible and coinsurance',
          'X-ray, lab work, blood work, diagnostic imaging: Covered as outpatient miscellaneous medical expenses — subject to deductible and coinsurance',
          'MRI and CT scans: Covered — subject to deductible and coinsurance',
          'Network: PHCS Practitioner Plus Ancillary Network — members can see any doctor but in-network avoids balance billing. Find providers at providersearch.multiplan.com',
          'Complications of pregnancy: Covered — standard maternity/childbirth NOT covered'
        ]
      },
      {
        category: 'Hospital (Plan 1)',
        items: [
          'Standard room: up to $1,500/day including inpatient miscellaneous (except professional fees)',
          'ICU/Critical Care: subject to deductible and coinsurance',
          'In-hospital doctor visits: up to $500 per person per coverage period',
          'Outpatient hospital surgery: up to $1,500/day including miscellaneous (except professional fees)',
          'Outpatient misc expenses: up to $1,500 per person per coverage period combined'
        ]
      },
      {
        category: 'Hospital (Plan 2)',
        items: [
          'Standard room: up to $2,000/day including inpatient miscellaneous (except professional fees)',
          'ICU/Critical Care: subject to deductible and coinsurance',
          'In-hospital doctor visits: up to $500 per person per coverage period',
          'Outpatient hospital surgery: subject to deductible and coinsurance',
          'ER additional deductible: $250 max 1 per coverage period'
        ]
      },
      {
        category: 'Hospital (Plan 3)',
        items: [
          'Standard room: subject to deductible and coinsurance',
          'ICU/Critical Care: subject to deductible and coinsurance',
          'In-hospital doctor visits: up to $500 per person per coverage period',
          'Outpatient hospital surgery: subject to deductible and coinsurance'
        ]
      },
      {
        category: 'Surgery (All Plans)',
        items: [
          'Plan 1: $5,000 per surgery — max $10,000 per coverage period',
          'Plans 2 & 3: $1,000 per surgery — max $2,000 per coverage period',
          'Assistant surgeon: subject to deductible and coinsurance',
          'Anesthesia: subject to deductible and coinsurance'
        ]
      },
      {
        category: 'Specific Procedures (All Plans)',
        items: [
          'Organ/tissue/bone marrow transplants: up to $50,000 per coverage period',
          'Joint/tendon surgery: up to $3,000 per coverage period',
          'Knee injury or disorder: up to $3,000 per coverage period (both knees)',
          'Gallbladder surgery: up to $3,000 per coverage period',
          'Appendectomy: up to $3,000 per coverage period',
          'Kidney stones: up to $3,000 per coverage period',
          'TMJ: up to $3,000 per coverage period',
          'AIDS: up to $10,000 per coverage period'
        ]
      },
      {
        category: 'Extended & Home Care (All Plans)',
        items: [
          'Extended care facility: up to $100/day — max 30 days per coverage period',
          'Hospice care: up to $5,000 per coverage period',
          'Home health care: up to $30/day — max 30 days per coverage period',
          'Therapy (PT/speech/OT): up to $30/day — max 15 days per coverage period'
        ]
      },
      {
        category: 'Ambulance & Equipment (All Plans)',
        items: [
          'Ground ambulance: up to $500 per trip',
          'Air ambulance: up to $1,000 per trip',
          'Durable medical equipment: subject to deductible and coinsurance',
          'Bone density testing: up to $150 per coverage period'
        ]
      },
      {
        category: 'Prescription & Wellness',
        items: [
          'Rx discount card: save up to 80% at 68,000+ pharmacies — NOT insurance',
          'HealthWarehouse mail-order: save 30–90% on prescriptions',
          'NCE member discounts: dental, vision, hearing, chiropractic, labs'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NO maternity coverage',
      'Pre-existing conditions: excluded (12/12 standard lookback)',
      '5-day waiting period for sickness',
      '30-day waiting period for cancer',
      'NO waiting period for injuries',
      'NOT renewable as permanent coverage',
      'Temporary plan only',
      'State variations apply — not available in all states',
      'Pre-existing conditions: Not covered for conditions diagnosed or treated in the 12 months prior to effective date',
      'Maternity, standard childbirth, prenatal care, delivery services: Not covered — complications of pregnancy only',
      'Mental health and substance abuse: Not covered or very limited — check specific plan schedule',
      'Dental and vision: Not covered',
      'Prescription drugs (Pinnacle STM): Not covered as insurance — Rx Savers discount card included',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Non-emergency care outside US: Not covered',
      'Workers compensation conditions: Not covered',
      'Hazardous activity injuries: Not covered',
      'This plan is NOT ACA minimum essential coverage — not compliant with ACA requirements',
      'This plan cannot be renewed — member must reapply for new plan at end of term. New conditions developed under current plan become pre-existing on new plan',
      'Age limit: Coverage terminates at end of month member turns 65',
      'NO outpatient prescription drug coverage',
      'NO dental or vision coverage',
      'NO mental health or substance abuse coverage',
      'Surgery caps vary by plan — Plan 1: $5K/surgery, Plans 2-3: $1K/surgery',
      'ER visit cap: $250 per visit (Plans 1 & 3)',
      'Rx is discount card only — NOT insurance benefit'
    ],
    waitingPeriods: [
      'Day 1 — injuries',
      '5 days — sickness',
      '30 days — cancer'
    ],
    preEx:
      '12/12 pre-existing exclusion (may be waived with consecutive enrollment rider)',
    planNotes:
      'Three plan options. PHCS network access. Pre-ex waiver rider available for consecutive terms. Up to $1M policy max. | STM plan — not ACA compliant. Designed as temporary bridge coverage during life transitions. | Deductible options vary — confirm deductible chosen at enrollment ($500 to $10,000 options available) | Coinsurance: Plan pays percentage after deductible is met | Coverage period maximum applies — confirm at enrollment | Next-day coverage available if applied online with credit card or bank debit'
  },
  {
    group: 'STM',
    id: 'smarthealth',
    name: 'Smart Health STM',
    type: 'Short-Term Medical',
    carrier: 'Standard Life and Casualty Insurance Company (SLACIC)',
    assoc: 'National Congress of Employers (NCE)',
    network: 'PHCS',
    source: 'SmartHealth_v3.pdf',
    benefits: [
      {
        category: 'Deductible & Coinsurance (Both Plans)',
        items: [
          'Deductible options: $500 / $1,000 / $2,000 / $2,500 / $5,000 / $7,500 / $10,000',
          'Coinsurance: 80/20',
          'Coinsurance limit: $2,000 or $4,000',
          'Coverage period maximum: $250,000 / $500,000 / $1,000,000'
        ]
      },
      {
        category: 'Doctor Visits (Both Plans)',
        items: [
          'PCP / Urgent Care: $25 copay — max 2 visits — not subject to deductible',
          'Specialist: $40 copay — max 2 visits',
          'Wellness: $50 copay — max 1 visit',
          'Office/urgent care visits beyond copay limit: subject to deductible & coinsurance',
          'Office visit max benefit: $2,000 per coverage period (Limited plan only)'
        ]
      },
      {
        category: 'Hospital (Limited Plan)',
        items: [
          'Standard room: up to $1,500/day including inpatient misc (except professional fees)',
          'ICU/Critical Care: up to $2,000/day including inpatient misc (except professional fees)',
          'In-hospital doctor visits: up to $50/day — max $500 per coverage period'
        ]
      },
      {
        category: 'Hospital (Traditional Plan)',
        items: [
          'Standard room: subject to deductible and coinsurance',
          'ICU/Critical Care: subject to deductible and coinsurance',
          'In-hospital doctor visits: subject to deductible and coinsurance'
        ]
      },
      {
        category: 'Emergency Room (Both Plans)',
        items: [
          'ER: subject to ER additional deductible then deductible & coinsurance',
          'Limited plan: ER capped at $250/visit including physician, observation, misc',
          'ER additional deductible waived if admitted within 24 hours',
          'No additional ER deductible on either plan'
        ]
      },
      {
        category: 'Surgery (Limited Plan)',
        items: [
          'Surgical services: up to $5,000 per surgery — max $10,000 per coverage period',
          'Assistant surgeon: up to $1,000 per surgery — max $2,000 per coverage period',
          'Anesthesia: up to $1,000 per surgery — max $2,000 per coverage period',
          'Joint/tendon surgery: up to $3,000 per coverage period (both knees)',
          'Gallbladder: up to $3,000; Appendectomy: up to $3,000; Kidney stones: up to $3,000'
        ]
      },
      {
        category: 'Surgery (Traditional Plan)',
        items: [
          'Surgical services: subject to deductible and coinsurance',
          'Assistant surgeon: subject to deductible and coinsurance',
          'Anesthesia: subject to deductible and coinsurance',
          'Joint/tendon, gallbladder, appendectomy, kidney stones: up to $3,000 each'
        ]
      },
      {
        category: 'Other Covered Expenses (Both Plans)',
        items: [
          'Organ/tissue/bone marrow transplants: Limited up to $50,000 / Traditional up to $100,000',
          'Skilled nursing facility: up to $100/day — max 30 days',
          'Hospice care: up to $5,000 per coverage period',
          'AIDS: up to $10,000 per coverage period',
          'Home health care: up to $30/day — max 30 days',
          'Therapy (PT/speech/OT): up to $30/day — max 15 days',
          'Ambulance: ground up to $500/trip — air up to $1,000/trip',
          'DME and medical supplies: subject to deductible and coinsurance',
          'Bone density testing: up to $150 per coverage period'
        ]
      },
      {
        category: 'Network & Rx',
        items: [
          'PHCS network — approximately 900,000 healthcare providers',
          'Facility charges: plan pays up to 150% of Medicare allowable',
          'RightWay Healthcare patient advisors for navigation assistance',
          'NCE Association member discounts: prescriptions, vision, hearing, dental, nutrition',
          'Rx discount card available — NOT insurance benefit'
        ]
      },
      {
        category: 'Coverage Terms',
        items: [
          'Next-day coverage available',
          'Up to 36 months coverage depending on state',
          'Eligibility: ages 18–64½ (children 2–17)',
          'Pre-existing waiver rider available for consecutive terms'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NO maternity coverage (complications of pregnancy covered)',
      'Pre-existing conditions excluded — 36-month lookback period',
      '5-day waiting period for sickness',
      '30-day waiting period for cancer',
      'No waiting period for injuries',
      'NOT renewable as permanent coverage',
      'NO outpatient prescription drugs',
      'NO dental or vision coverage',
      'NO mental health or substance abuse coverage',
      'NO speech therapy',
      'NO allergy testing or injections',
      'Limited plan: hospital room capped at $1,500/day; surgery at $5,000/surgery',
      'Traditional plan: no specific dollar caps but subject to deductible/coinsurance/max',
      'Association discounts are NOT insurance — no coverage guarantee'
    ],
    waitingPeriods: [
      'Day 1 — injuries',
      '5 days — sickness',
      '30 days — cancer'
    ],
    preEx: '36-month lookback — exclusion for conditions diagnosed or treated within 36 months prior to effective date',
    planNotes: 'PHCS network STM with two sub-plans: Limited (capped benefits) and Traditional (subject to deductible/coinsurance). Includes RightWay patient advocacy. Pre-ex is 36-month lookback — longer than most STM plans. Up to $1M policy max.'
  },
  {
    group: 'STM',
    id: 'galena',
    name: 'Galena STM Elite / Standard / Economy',
    type: 'Short-Term Medical',
    carrier: 'Southern Guaranty Insurance Company (SGIC)',
    assoc: 'Association for Responsible Planners (AFRP)',
    network: 'First Health + MultiPlan',
    source: 'NEOSGIC_AFRP_STM_LimitedElite_1.pdf',
    benefits: [
      {
        category: 'ELITE — Deductible & Coinsurance',
        items: [
          'Deductible: $2,500 / $5,000 / $7,500 / $10,000',
          'Coinsurance: SGIC pays 50% / 70% / 80%',
          'Coinsurance maximum (out-of-pocket): $2,500 / $5,000 / $10,000',
          'Coverage period maximum: $2,000,000'
        ]
      },
      {
        category: 'ELITE — Doctor Visits',
        items: [
          'Office visit: PCP $30 copay / Specialty $45 copay — not subject to deductible',
          'Wellness: $40 copay — not subject to deductible',
          'Urgent care: $60 copay — not subject to deductible',
          'ER: Accident $500 copay / Sickness $750 copay'
        ]
      },
      {
        category: 'ELITE — Hospital & Surgery',
        items: [
          'Standard room & ICU: up to $3,000/day',
          'Inpatient doctor visits: up to $100/visit',
          'Inpatient surgery: $8,000 per surgery — up to 3 per term',
          'Outpatient surgery: $8,000 per surgery — up to 2 per term',
          'Surgical office: $1,000 per surgery — up to 3 per term',
          'Ambulance: Ground up to $1,000 / Air up to $2,500'
        ]
      },
      {
        category: 'ELITE — Diagnostics & Therapy',
        items: [
          'Outpatient diagnostics: Pathology $40 copay / Radiology $60 copay',
          'Advanced radiology: $250 copay',
          'PT/OT covered: up to $60/day',
          'Chiropractic: up to $60/day',
          'Mental health inpatient: $100/day — up to 30 days',
          'Mental health outpatient professional: $100/day — up to 10 days'
        ]
      },
      {
        category: 'STANDARD — Deductible & Coinsurance',
        items: [
          'Deductible: $2,500 / $5,000 / $7,500 / $10,000',
          'Coinsurance: SGIC pays 50% / 70% / 80%',
          'Coinsurance maximum: $5,000 / $10,000',
          'Coverage period maximum: $1,000,000'
        ]
      },
      {
        category: 'STANDARD — Doctor Visits & ER',
        items: [
          'Office visit: PCP $40 copay / Specialty $60 copay — not subject to deductible',
          'Wellness: $40 copay — not subject to deductible',
          'Urgent care: $60 copay — not subject to deductible',
          'ER: Accident $500 copay / Sickness $750 copay'
        ]
      },
      {
        category: 'STANDARD — Hospital & Surgery',
        items: [
          'Standard room & ICU: up to $2,500/day',
          'Inpatient doctor visits: up to $80/visit',
          'Inpatient surgery: $4,000 per surgery — up to 2 per term',
          'Outpatient surgery: $4,000 per surgery — up to 1 per term',
          'Surgical office: $1,000 per surgery — up to 2 per term',
          'Ambulance: Ground up to $500 / Air up to $1,000'
        ]
      },
      {
        category: 'STANDARD — Diagnostics & Therapy',
        items: [
          'Outpatient diagnostics: up to $1,000 per term',
          'Advanced radiology: up to $1,500 per term',
          'PT/OT: up to $60/day',
          'Chiropractic: NOT covered',
          'Inpatient professional: $50/day — up to 10 days'
        ]
      },
      {
        category: 'ECONOMY — Deductible & Coinsurance',
        items: [
          'Deductible: $5,000 / $7,500 / $10,000',
          'Coinsurance: SGIC pays 50% / 70% / 80%',
          'Coinsurance maximum: $5,000 / $10,000',
          'Coverage period maximum: $500,000'
        ]
      },
      {
        category: 'ECONOMY — Doctor Visits & ER',
        items: [
          'Office visit: PCP $40 copay / Specialty $60 copay',
          'Wellness: up to $250 per term',
          'Urgent care: $60 copay',
          'ER: Accident $500 copay / Sickness $750 copay'
        ]
      },
      {
        category: 'ECONOMY — Hospital & Surgery',
        items: [
          'Standard room & ICU: up to $1,500/day',
          'Inpatient doctor visits: up to $60/visit',
          'Inpatient surgery: $2,000 per surgery — up to 1 per term',
          'Outpatient surgery: $2,000 per surgery — up to 1 per term',
          'Surgical office: $1,000 per surgery — up to 1 per term',
          'Ambulance: Ground up to $250 / Air up to $1,000'
        ]
      },
      {
        category: 'ECONOMY — Diagnostics',
        items: [
          'Outpatient diagnostics: up to $500 per term',
          'Advanced radiology: up to $1,000 per term',
          'PT/OT: up to $40/day',
          'Chiropractic: NOT covered',
          'Mental health: NOT covered',
          'Inpatient professional: NOT covered'
        ]
      },
      {
        category: 'Pharmacy',
        items: [
          'ReviveHealth pharmacy program: 1,000+ medications at $0 cost',
          'Urgent care medications: $0',
          'Maintenance medications: $0 with free home delivery',
          'Rx savings card: up to 80% off at local pharmacy',
          'Pharmacist consultation available'
        ]
      },
      {
        category: 'Coverage Summary',
        items: [
          'Accidents: Covered from Day 1 (effective date)',
          'Sickness: Covered after 5-day waiting period from effective date',
          'Cancer: Covered after 30-day waiting period from effective date',
          'Doctor visits and urgent care: Covered — subject to deductible and coinsurance',
          'Inpatient hospitalization: Covered — subject to deductible and coinsurance',
          'Surgery (inpatient and outpatient): Covered — subject to deductible and coinsurance',
          'Emergency room: Covered — subject to deductible and additional ER deductible (waived if admitted within 24 hours)',
          'Ambulance: Covered — subject to deductible and coinsurance',
          'X-ray, lab work, blood work, diagnostic imaging: Covered as outpatient miscellaneous medical expenses — subject to deductible and coinsurance',
          'MRI and CT scans: Covered — subject to deductible and coinsurance',
          'Network: First Health + MultiPlan — members can see any doctor but in-network avoids balance billing. Find providers at myfirsthealth.com or multiplan.com',
          'Complications of pregnancy: Covered — standard maternity/childbirth NOT covered'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NO maternity coverage',
      'Pre-existing conditions: no benefits for conditions existing 12 months prior to effective date',
      'State rules may vary on pre-ex lookback',
      'NOT renewable as permanent coverage',
      'Coverage period deductibles and limits RESET each 12-month term',
      'New illness under current policy becomes pre-existing under new policy',
      'First Health Network access NOT available in New Mexico for certain plans',
      'Economy plan: doctor visits subject to deductible — no copay',
      'Mental health: limited — Elite only has inpatient 30 days / outpatient 10 days',
      'ReviveHealth pharmacy is a membership service — NOT insurance',
      'Pre-existing conditions: Not covered for conditions diagnosed or treated in the 12 months prior to effective date',
      'Maternity, standard childbirth, prenatal care, delivery services: Not covered — complications of pregnancy only',
      'Mental health and substance abuse: Not covered or very limited — check specific plan schedule',
      'Dental and vision: Not covered',
      'Prescription drugs: Not covered as insurance — ReviveHealth pharmacy membership included',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Non-emergency care outside US: Not covered',
      'Workers compensation conditions: Not covered',
      'Hazardous activity injuries: Not covered',
      'This plan is NOT ACA minimum essential coverage — not compliant with ACA requirements',
      'This plan cannot be renewed — member must reapply for new plan at end of term. New conditions developed under current plan become pre-existing on new plan',
      'Age limit: Coverage terminates at end of month member turns 65',
      'STANDARD: No chiropractic; Mental health inpatient only (no outpatient)',
      'ECONOMY: No chiropractic, no mental health, no inpatient professional',
      'Pre-existing: 12-month lookback — conditions within 12 months prior excluded',
      'Pharmacy through ReviveHealth is membership service — NOT insurance coverage',
      '6-month surgery waiting period for hysterectomy, tonsillectomy, hernia, gallbladder, sinus, deviated septum (unless cancer-related)'
    ],
    waitingPeriods: [
      'Day 1 — injuries',
      '5 days — sickness (state-specific)',
      '30 days — cancer'
    ],
    preEx:
      '12-month exclusion for conditions existing within 12 months prior to effective date',
    planNotes:
      'Most comprehensive STM available. Elite tier has $2M max, $30/$45 copays, $3,000/day hospital. ReviveHealth pharmacy is a major value-add. Closest to major medical of all STM options. | STM plan — not ACA compliant. Designed as temporary bridge coverage during life transitions. | Deductible options vary — confirm deductible chosen at enrollment ($500 to $10,000 options available) | Coinsurance: Plan pays percentage after deductible is met | Coverage period maximum applies — confirm at enrollment | Next-day coverage available if applied online with credit card or bank debit'
  },
  {
    group: 'Limited',
    id: 'harmonycare',
    name: 'HarmonyCare PLUS',
    type: 'Limited Benefit / Fixed Indemnity',
    carrier: 'American Financial Security Life Insurance Co.',
    assoc: 'National Congress of Employers (NCE)',
    network: 'First Health',
    source: 'HarmonyCarePLUS_Brochure_8949272987_V3_0625.pdf',
    benefits: [
      {
        category: 'Hospital Confinement',
        items: [
          '100A tier: $100/day — max 30 days',
          '200 tier: $200/day — max 30 days',
          '300 tier: $300/day — max 30 days',
          '500 tier: $500/day — max 30 days',
          '750 tier: $750/day — max 30 days',
          '1000 tier: $1,000/day — max 30 days'
        ]
      },
      {
        category: 'Doctor Office Visits',
        items: [
          'Primary Care: $50/day — tiers vary: 3 or 5 max days/yr',
          '1000 tier: $75/day — 5 max days/yr',
          'Specialty Care: $50/day — tiers 100A–1000',
          '1000 tier: $75/day specialist'
        ]
      },
      {
        category: 'Emergency Room',
        items: [
          'ER benefit (100 tier and above — NOT available on 100A): $50/day — max 1 day/yr',
          '1000 tier: $100/day — max 1 day/yr'
        ]
      },
      {
        category: 'Surgery & Procedures',
        items: [
          '200/200+ tier: Surgery $400/day — max 3 days; Anesthesia 20%',
          '300 tier: Surgery $750/day — 3 days; 500 tier: $1,000/day — 3 days',
          '750 tier: Surgery $1,500/day — 3 days; 1000 tier: NO surgery benefit',
          'Pathology & Radiology: 200 tier $50/day 1 day; 200+ $50/day 3 days; 500/750 $50/day 2 days; 1000 $75/day 3 days',
          'Advanced Studies: 200 tier $50/day 1 day; 200+ $50/day 3 days; 500/750 $50/day 2 days; 1000 $75/day 3 days'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          '200 tier: Inpatient $150/day — max 60 days',
          '200+ tier: Inpatient $250/day — max 60 days',
          '300 tier: Inpatient $375/day — max 60 days',
          '500 tier: Inpatient $500/day — max 60 days',
          '750 and 1000 tiers: NO mental health benefit',
          '200–500 tiers: Outpatient $50/day — max 20 days',
          '750 and 1000 tiers: NO outpatient mental health'
        ]
      },
      {
        category: 'Accident Benefits',
        items: [
          '200–500 tiers: Supplemental Accident Inpatient Admission: $500/day — 1 day',
          '200–500 tiers: Supplemental Accident ER: $250/day — 1 day',
          '750 and 1000 tiers: NO supplemental accident benefit'
        ]
      },
      {
        category: 'Additional Benefits',
        items: [
          'Accidental Death: $10,000 (all tiers except 100A)',
          'Critical Illness: $1,000 (100+ tiers)',
          'No deductible — no coinsurance',
          'Guaranteed issue underwriting'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed cash indemnity plan that pays set dollar amounts per service regardless of actual cost',
          'No out-of-pocket maximum — plan pays fixed benefit amounts up to stated limits',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Sickness: 30-day waiting period applies',
          'Pre-existing conditions: Not covered for first 12 months from effective date',
          'Hospital confinement benefit: Pays fixed daily amount for each day admitted — see plan tier for amount',
          'Accidental death benefit: $10,000 maximum on all tiers',
          'HOW THE BENEFIT WORKS: This plan pays a FIXED DOLLAR AMOUNT per service per day — NOT the actual bill. Example: If a doctor visit costs $200 and the plan pays $50/day, the member receives $50 and is responsible for the remaining $150. The benefit is paid directly to the member. Using in-network providers reduces the gap because of pre-negotiated discounted rates.',
          'Pre-negotiated network discounts: Members who use in-network providers (First Health or PHCS depending on plan) receive pre-negotiated discounted rates on services. This reduces the gap between the actual bill and the fixed benefit amount. Always verify the provider is in-network before the appointment at providersearch.multiplan.com.'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: QuestSelect Unlimited Lab Program — $0 copay for 1,000+ outpatient lab tests including blood tests, urinalysis, pap smears, biopsies, cultures. Use any Quest Diagnostics location nationwide. Present QuestSelect card at appointment.',
          'Imaging savings: Average 60% off MRI and CT scans through Imaging Savings Program — discount only, not insurance',
          'Chiropractic savings: Free initial consult, up to 50% off diagnostic services and x-rays, unlimited treatments at 30% savings — discount only',
          'Mental health inpatient (tiers 200+ only): $150-$500/day up to 60 days — NOT available on tiers 100A and 100',
          'Mental health outpatient (tiers 200+ only): $50/day up to 20 days — NOT available on tiers 100A and 100',
          'Surgery benefit (tiers 200+ only): $400-$1,500 per day up to 3 days',
          'Critical illness benefit: $1,000 on all tiers except 100A',
          'Emergency room benefit (tiers 100+ only): $50-$100 per day, 1 day maximum — NOT available on tier 100A'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NOT major medical — does not pay full medical bills',
      'Benefits are FIXED DOLLAR AMOUNTS per service — not percentage of actual charge',
      'Pre-existing conditions: NO coverage for 12 months following effective date (12/12)',
      '30-day waiting period immediately following Coverage Effective Date (does not apply to injury)',
      'Benefits based on annual period per insured from effective date',
      'Limited tiers (100A, 100): no ER benefit, no surgery, no mental health',
      '750 and 1000 tiers: NO mental health, NO accident benefits, NO surgery',
      'Balance billing risk if charges exceed fixed benefit amounts',
      'NOT intended to replace major medical coverage',
      'Maternity, pregnancy, childbirth, prenatal care: Not covered',
      'Dental and vision: Not covered',
      'Prescription drugs: Not covered as insurance — discount savings program included',
      'Physical therapy, speech therapy, occupational therapy: Not covered',
      'Home health care and hospice: Not covered',
      'Custodial care: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Voluntary sterilization reversal: Not covered',
      'Workers compensation conditions: Not covered',
      'This plan is NOT ACA compliant and is NOT major medical insurance',
      'Plan pays fixed cash benefit amounts — member is responsible for any amount above the plan benefit',
      'Mental health and substance abuse (tiers 100A and 100): Not covered on these tiers — available on tier 200 and above',
      'Lab work during hospitalization: Not covered under QuestSelect program',
      'Emergency/STAT lab work: Not covered under QuestSelect',
      'Fertility testing, bone marrow, spinal fluid tests: Not covered under QuestSelect',
      'X-ray as standalone benefit: Not covered as insurance — chiropractic savings program includes discounted x-rays'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — injuries'],
    preEx:
      '12-month exclusion for conditions diagnosed/treated in prior 12 months',
    planNotes:
      'Fixed indemnity with 8 tiers (100A through 1000). Higher tiers add surgery, mental health, accident benefits. Pays you directly — not the hospital. Guaranteed issue.'
  },
  {
    group: 'Limited',
    id: 'sigmacare',
    name: 'SigmaCare Plus',
    type: 'Limited Benefit / Fixed Indemnity',
    carrier: 'American Financial Security Life Insurance Co.',
    assoc: 'National Congress of Employers (NCE)',
    network: 'First Health',
    source: 'AFSLIC20_SCP_Brochure_rev.pdf',
    benefits: [
      {
        category: 'Hospital Confinement',
        items: [
          '100A: $100/day — max 30 days',
          '200+: $200/day — max 30 days',
          '500: $500/day — max 30 days',
          '1000: $1,000/day — max 30 days'
        ]
      },
      {
        category: 'Doctor Office Visits',
        items: [
          'Primary Care: $50/day — 3 days (100A/100) or 5 days (200+)',
          '1000 tier: $75/day — 5 days',
          'Specialty: $50/day — 3 days (100A/100) or 5 days (200+)'
        ]
      },
      {
        category: 'Emergency Room',
        items: [
          '100 tier: $50/day — 1 day; 200+: $50/day — 1-2 days; 1000: $100/day'
        ]
      },
      {
        category: 'Surgery & Procedures',
        items: [
          '200+ tiers: Surgery $400–$1,500/day — 3 days; Anesthesia 20%',
          'Pathology & Radiology (200+ tiers): $50/day',
          'Advanced Studies (200+ tiers): $50/day'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          '200+ tiers: Inpatient $150/day — 60 days; Outpatient $50/day — 20 days'
        ]
      },
      {
        category: 'Additional',
        items: [
          'Accidental Death: $10,000 (100+ tiers)',
          'Critical Illness: $1,000 (200+ tiers)',
          'No deductible — guaranteed issue'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed cash indemnity plan that pays set dollar amounts per service regardless of actual cost',
          'No out-of-pocket maximum — plan pays fixed benefit amounts up to stated limits',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Sickness: 30-day waiting period applies',
          'Pre-existing conditions: Not covered for first 12 months from effective date',
          'Hospital confinement benefit: Pays fixed daily amount for each day admitted — see plan tier for amount',
          'Accidental death benefit: $10,000 maximum on all tiers',
          'HOW THE BENEFIT WORKS: This plan pays a FIXED DOLLAR AMOUNT per service per day — NOT the actual bill. Example: If a doctor visit costs $200 and the plan pays $50/day, the member receives $50 and is responsible for the remaining $150. The benefit is paid directly to the member. Using in-network providers reduces the gap because of pre-negotiated discounted rates.',
          'Pre-negotiated network discounts: Members who use in-network providers (First Health or PHCS depending on plan) receive pre-negotiated discounted rates on services. This reduces the gap between the actual bill and the fixed benefit amount. Always verify the provider is in-network before the appointment at providersearch.multiplan.com.'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: Laboratory Savings Program — discounted rates at ncegapaffordplus.com. Not available in NY, NJ, RI.',
          'Imaging savings: Average 60% off MRI and CT scans — discount only, not insurance',
          'Mental health inpatient (tiers 200+ only): $150-$500/day up to 60 days',
          'Mental health outpatient (tiers 200+ only): $50/day up to 20 days',
          'Critical illness: $1,000 on tiers 200+',
          'Surgery benefit (tiers 200+ only): $400-$1,000 per day up to 3 days'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NOT major medical',
      'Benefits are FIXED AMOUNTS — not actual bill payment',
      '12/12 pre-existing condition exclusion',
      '30-day waiting period for sickness (not applicable to injury)',
      'Balance billing risk for charges above fixed benefit',
      'NOT a substitute for major medical coverage',
      'Maternity, pregnancy, childbirth, prenatal care: Not covered',
      'Dental and vision: Not covered',
      'Prescription drugs: Not covered as insurance — discount savings program included',
      'Physical therapy, speech therapy, occupational therapy: Not covered',
      'Home health care and hospice: Not covered',
      'Custodial care: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Voluntary sterilization reversal: Not covered',
      'Workers compensation conditions: Not covered',
      'This plan is NOT ACA compliant and is NOT major medical insurance',
      'Plan pays fixed cash benefit amounts — member is responsible for any amount above the plan benefit'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — injuries'],
    preEx: '12-month exclusion for prior 12-month conditions',
    planNotes:
      'Very similar structure to HarmonyCare. Same underwriter (AFSLIC), same association (NCE). Multiple tiers. Differentiated by plan name/branding.'
  },
  {
    group: 'Limited',
    id: 'healthchoicesilver',
    name: 'NCE Health Choice Silver',
    type: 'Limited Benefit / Fixed Indemnity',
    carrier: 'American Financial Security Life Insurance Co.',
    assoc: 'National Congress of Employers (NCE)',
    network: 'MultiPlan',
    source: 'HealthChoiceSilverBrochure2.pdf',
    benefits: [
      {
        category: 'Hospital Confinement',
        items: [
          'All tiers: 30-day maximum confinement',
          '100A/100: $100/day; 200/200+: $200/day; 300: $300/day',
          '500: $500/day; 750: $750/day; 1000: $1,000/day; 1000+: $1,000/day'
        ]
      },
      {
        category: 'Doctor Office Visits',
        items: [
          'Primary Care: $50/day — 3 days (100A/100) or 5 days (200+)',
          '1000 tier: $75/day; 1000+ tier: $100/day — 5 days',
          'Specialty Care: same structure as PCP visits'
        ]
      },
      {
        category: 'Emergency Room',
        items: [
          '100 tier+: $50–$200/day — 1-2 days per year',
          '1000+ tier: $200/day'
        ]
      },
      {
        category: 'Surgery & Procedures',
        items: [
          '200+ tiers: Surgery benefit 50%–100% of charges — 3 days',
          'Anesthesia: 20–25% — 3 days',
          'Pathology & Radiology: $50–$200/day — 1-3 days',
          'Advanced Studies: $50–$200/day — 1-3 days'
        ]
      },
      {
        category: 'Mental Health',
        items: [
          '300+ tiers: Inpatient $150–$500/day — 60 days',
          '300+ tiers: Outpatient $50/day — 20 days'
        ]
      },
      {
        category: 'Enhanced Benefits (1000+ only)',
        items: [
          'Hospital ICU: $1,000/day — 15 days',
          'Additional Hospital Admission: $1,000 — up to 5 admissions',
          'Supplemental Accident Inpatient: $500/day — 3 days',
          'Supplemental Accident ER: $250/day'
        ]
      },
      {
        category: 'Additional',
        items: [
          'Accidental Death: $10,000 (all tiers)',
          'Critical Illness: $1,000 (200+ tiers)',
          'No deductible — no coinsurance'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed cash indemnity plan that pays set dollar amounts per service regardless of actual cost',
          'No out-of-pocket maximum — plan pays fixed benefit amounts up to stated limits',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Sickness: 30-day waiting period applies',
          'Pre-existing conditions: Not covered for first 12 months from effective date',
          'Hospital confinement benefit: Pays fixed daily amount for each day admitted — see plan tier for amount',
          'Accidental death benefit: $10,000 maximum on all tiers',
          'HOW THE BENEFIT WORKS: This plan pays a FIXED DOLLAR AMOUNT per service per day — NOT the actual bill. Example: If a doctor visit costs $200 and the plan pays $50/day, the member receives $50 and is responsible for the remaining $150. The benefit is paid directly to the member. Using in-network providers reduces the gap because of pre-negotiated discounted rates.',
          'Pre-negotiated network discounts: Members who use in-network providers (First Health or PHCS depending on plan) receive pre-negotiated discounted rates on services. This reduces the gap between the actual bill and the fixed benefit amount. Always verify the provider is in-network before the appointment at providersearch.multiplan.com.'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: Laboratory Savings Program — discounted rates at ncegapaffordplus.com. Not available in NY, NJ, RI.',
          'Imaging savings: Average 60% off MRI and CT scans — discount only',
          'Chiropractic savings: Free consult, up to 50% off x-rays, 30% off unlimited treatments',
          'Mental health inpatient (tiers 300+ only): $150-$500/day up to 60 days',
          'Mental health outpatient (tiers 300+ only): $50/day up to 20 days',
          'Critical illness: $1,000 on tiers 200+',
          'Surgery benefit (tiers 200+ only): 50%-100% per day up to 3 days',
          'Hospital ICU benefit (tier 1000+ only): $1,000/day up to 15 days',
          'Additional hospital admission benefit (tier 1000+ only): $1,000 per admission — up to 5 admissions'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NOT major medical',
      'Benefits are FIXED AMOUNTS — not actual bill payment',
      '12/12 pre-existing condition exclusion',
      '30-day waiting period for sickness (injury exempt)',
      'Balance billing risk',
      'NO Mental Health coverage below 300 tier',
      'NOT a substitute for major medical',
      'Maternity, pregnancy, childbirth, prenatal care: Not covered',
      'Dental and vision: Not covered',
      'Prescription drugs: Not covered as insurance — discount savings program included',
      'Physical therapy, speech therapy, occupational therapy: Not covered',
      'Home health care and hospice: Not covered',
      'Custodial care: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Voluntary sterilization reversal: Not covered',
      'Workers compensation conditions: Not covered',
      'This plan is NOT ACA compliant and is NOT major medical insurance',
      'Plan pays fixed cash benefit amounts — member is responsible for any amount above the plan benefit',
      'Mental health (tiers 100A, 100, 200): Not covered — available on tier 300 and above',
      'Substance abuse disorders: Not covered',
      'Prescription drugs: Not covered',
      'NO pregnancy coverage',
      'NO outpatient prescription drugs',
      'NO dental services',
      'NO speech, physical or occupational therapy',
      'NO substance abuse coverage',
      'NO hospice or home health care',
      'Eligible ages: 65+ adults, dependents 1-25'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — injuries'],
    preEx: '12-month exclusion for prior 12-month conditions',
    planNotes:
      'MultiPlan network (broader than First Health). 9 tiers including 1000+ with ICU and admission benefits. Surgery at 1000 tier pays 100% of charges up to benefit max.'
  },
  {
    group: 'Limited',
    id: 'everest',
    name: 'Everest Fixed Indemnity (100–1000+)',
    type: 'Limited Benefit / Fixed Indemnity',
    carrier: 'Everest Reinsurance Company',
    assoc: 'National Congress of Employers (NCE)',
    network: 'MultiPlan PPO',
    source: 'Everest_Brochure_REV.pdf',
    benefits: [
      {
        category: 'Hospital Confinement',
        items: [
          'Plan 100: $100/day — 30 days/confinement, 90 days/cert year',
          'Plan 200: $200/day — 30 days/confinement, 90 days/cert year',
          'Plan 200+: $200/day — same limits',
          'Plan 300: $300/day — same limits',
          'Plan 500: $500/day; Plan 1000: $1,000/day; Plan 1000+: $1,000/day'
        ]
      },
      {
        category: 'ICU Confinement',
        items: [
          'Plan 100: $100/day — 30 days/confinement, 90 days/cert year',
          'Plan 200: $200/day — 30 days/confinement, 90 days/cert year',
          'Plan 200+: $200/day — same limits',
          'Plan 300: $300/day — same limits',
          'Plan 500: $500/day; Plan 750: $750/day; Plan 1000: $1,000/day; Plan 1000+: $1,000/day'
        ]
      },
      {
        category: 'Doctor Office (Outpatient)',
        items: [
          'Plans 100–300: Physician $50/day — 3 visits/cert year',
          'Plans 500–750: Physician $50/day — 5 visits/cert year',
          'Plan 1000: Physician $75/day — 5 visits/cert year',
          'Plan 1000+: Physician $75/day — 5 visits/cert year'
        ]
      },
      {
        category: 'Emergency Room',
        items: [
          'Plans 100–300: $50/day — 2/cert year',
          'Plan 500: $50/day — 2/cert year',
          'Plan 750: $75/day — 2/cert year',
          'Plan 1000: $100/day — 2/cert year',
          'Plan 1000+: $100/day — 2/cert year'
        ]
      },
      {
        category: 'Hospital Admission Benefit',
        items: [
          'Plan 1000+ only: $1,000 per admission — up to 5 admissions/cert year'
        ]
      },
      {
        category: 'Surgery & Procedures',
        items: [
          'Plans 200+/300: Surgery $250/day combined inpatient & outpatient — 3 days',
          'Plan 500: Surgery $350/day — 3 days',
          'Plan 750: Surgery $400/day — 3 days',
          'Plans 1000/1000+: Surgery $500/day — 3 days',
          'Anesthesia: 25% — 3 days (all surgery-eligible plans)',
          'Plans 200/200+/300: Labs $50/day — 4 days; X-Rays $50/day — 4 days',
          'Plans 500/750: Labs $50/day — 8 days; X-Rays $50/day — 8 days',
          'Plans 1000/1000+: Labs $75/day — 12 days; X-Rays $75/day — 12 days',
          'Advanced Diagnostic: Plans 200–300 $50/day — 4 days; 500–750 $50/day — 6 days; 1000/1000+ $75/day — 6 days'
        ]
      },
      {
        category: 'NCE Discount Benefits',
        items: [
          'Dental discount: Aetna Dental Access network — 15-50% savings at 262,000+ locations',
          'Vision discount: OUTLOOK Vision — 10-50% off at 12,000+ locations',
          'Rx discount card: save up to 80% at participating pharmacies',
          'Lab savings: DirectLabs — up to 80% off blood tests at CLIA-certified labs',
          'Hearing savings: 20-50% off brand-name hearing aids',
          'Chiropractic discount: free initial consult + up to 50% on x-rays + 30% on treatments',
          'Medical bill negotiation: patient advocates negotiate on your behalf'
        ]
      },
      {
        category: 'Additional',
        items: [
          'Guaranteed issue underwriting',
          'Benefits paid directly to you',
          'Multiplan PPO network access for negotiated rates',
          'Fast payment — simplified claims process',
          'ICU Confinement matches Hospital Confinement rate for each plan tier',
          'No chiropractic or acupuncture coverage',
          'No cancel age',
          'Benefits are per person'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed cash indemnity plan that pays set dollar amounts per service regardless of actual cost',
          'No out-of-pocket maximum — plan pays fixed benefit amounts up to stated limits',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Sickness: 30-day waiting period applies',
          'Pre-existing conditions: Not covered for first 12 months from effective date',
          'Hospital confinement benefit: Pays fixed daily amount for each day admitted — see plan tier for amount',
          'Accidental death benefit: $10,000 maximum on all tiers',
          'HOW THE BENEFIT WORKS: This plan pays a FIXED DOLLAR AMOUNT per service per day — NOT the actual bill. Example: If a doctor visit costs $200 and the plan pays $50/day, the member receives $50 and is responsible for the remaining $150. The benefit is paid directly to the member. Using in-network providers reduces the gap because of pre-negotiated discounted rates.',
          'Pre-negotiated network discounts: Members who use in-network providers (First Health or PHCS depending on plan) receive pre-negotiated discounted rates on services. This reduces the gap between the actual bill and the fixed benefit amount. Always verify the provider is in-network before the appointment at providersearch.multiplan.com.'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: Laboratory Savings Program — discounted rates. Not available in NY, NJ, RI.',
          'Chiropractic savings: Free consult, up to 50% off diagnostic services and x-rays, 30% off unlimited treatments',
          'Imaging savings: Average 60% off MRI and CT scans — discount only'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NOT major medical — not intended as a substitute for major medical',
      'Benefits are FIXED DOLLAR AMOUNTS — not bill payment',
      '12/12 pre-existing condition limitation applies to ALL plans',
      '30-day waiting period for sickness',
      'ICU Confinement benefit available on ALL plans: Plans 100/200/200+/300 ($100/$200/$200/$300 per day) — Plans 500/750/1000/1000+ ($500/$750/$1,000/$1,000 per day) — 30 days per confinement, 90 days per cert year',
      'Hospital admission benefit only on 1000+ plan',
      'No surgery benefit on Plan 100',
      'Balance billing risk',
      'NOT a qualifying life event if coverage ends',
      'Maternity, pregnancy, childbirth, prenatal care: Not covered',
      'Dental and vision: Not covered',
      'Prescription drugs: Not covered as insurance — discount savings program included',
      'Physical therapy, speech therapy, occupational therapy: Not covered',
      'Home health care and hospice: Not covered',
      'Custodial care: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Voluntary sterilization reversal: Not covered',
      'Workers compensation conditions: Not covered',
      'This plan is NOT ACA compliant and is NOT major medical insurance',
      'Plan pays fixed cash benefit amounts — member is responsible for any amount above the plan benefit',
      'Mental illness and substance abuse: Not covered',
      'Maternity and standard childbirth: Not covered — complications of pregnancy covered as any other sickness',
      'Chiropractic care: Not covered as insurance — savings program available',
      'Acupuncture: Not covered',
      'Gender transformation services: Not covered',
      'Hazardous occupation injuries: Not covered',
      'Intoxication-related injuries: Not covered',
      'Narcotic-related losses (unless prescribed): Not covered',
      'War and armed forces service: Not covered',
      'Workers compensation: Not covered',
      'NO mental health or substance abuse coverage',
      'NO chiropractic or acupuncture coverage',
      'NO pregnancy or maternity coverage (complications covered)',
      'NO coverage outside US except 30-day business/pleasure travel for emergencies',
      'NCE discount benefits are NOT insurance'
    ],
    waitingPeriods: [
      '30 days — sickness (30 days/confinement or 90 days/cert year)',
      'Day 1 — injuries'
    ],
    preEx: '12-month exclusion for prior 12-month conditions',
    planNotes:
      'Multiple Everest plan versions in portfolio (REV, REV_1, REV_2). Plans 100 through 1000+. Guaranteed issue. MultiPlan PPO network. Cash benefits paid directly to member.'
  },
  {
    group: 'Limited',
    id: 'bwapara',
    name: 'BWA Paramount (MBR)',
    type: 'Limited Benefit / Reference-Based Pricing',
    carrier: 'BCS Insurance Company',
    assoc: 'Business Workers of America (BWA)',
    network: 'Managed Care / Reference-Based Pricing',
    source: 'BCS_Brochure_1.pdf',
    benefits: [
      {
        category: 'Doctor Visits (Pre-Pay)',
        items: [
          'Primary Care Office Visits: $25 pre-pay',
          'Specialist Office Visits: $50 pre-pay',
          'Urgent Care: $25 pre-pay'
        ]
      },
      {
        category: 'Medical Bill Repricing (MBR)',
        items: [
          'Bills repriced to 150%–200% of Medicare Allowable Rates',
          'Reference-Based Pricing system used — over 70% of employer groups in US',
          'Doctor or hospital submits bills to MBR for repricing',
          'Member receives Explanation of Benefits (EOB) showing repriced amount',
          'MBR team provides claim forms and instructions'
        ]
      },
      {
        category: 'Additional Member Benefits',
        items: [
          'Hospital bill reducer and medical bill negotiation',
          'Concierge healthcare advocacy',
          'Financial assistance guidance',
          'DirectLabs: discounted blood tests at major labs — no doctor visit required',
          'Savings up to 80% on lab tests'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed cash indemnity plan that pays set dollar amounts per service regardless of actual cost',
          'No out-of-pocket maximum — plan pays fixed benefit amounts up to stated limits',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Sickness: 30-day waiting period applies',
          'Pre-existing conditions: Not covered for first 12 months from effective date',
          'Hospital confinement benefit: Pays fixed daily amount for each day admitted — see plan tier for amount',
          'Accidental death benefit: $10,000 maximum on all tiers',
          'HOW THE BENEFIT WORKS: This plan pays a FIXED DOLLAR AMOUNT per service per day — NOT the actual bill. Example: If a doctor visit costs $200 and the plan pays $50/day, the member receives $50 and is responsible for the remaining $150. The benefit is paid directly to the member. Using in-network providers reduces the gap because of pre-negotiated discounted rates.',
          'Pre-negotiated network discounts: Members who use in-network providers (First Health or PHCS depending on plan) receive pre-negotiated discounted rates on services. This reduces the gap between the actual bill and the fixed benefit amount. Always verify the provider is in-network before the appointment at providersearch.multiplan.com.'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: DirectLabs program — up to 80% off blood tests, urine, saliva, hair and fecal tests. No doctor appointment needed. Access at directlabs.com/4members. Not available in NJ, NY, RI.',
          'Prescription discount: Included — discount card for pharmacy savings'
        ]
      },
      {
        category: 'Hospital Insurance (BCS EssentialCare)',
        items: [
          'First Day Hospital Confinement: $1,000 — max 1 day/year',
          'First Day ICU Confinement: $200 — max 1 day/year',
          'Hospital Confinement (day 2+): $300/day — max 10 days/year',
          'ICU Confinement (day 2+): $500/day — max 10 days/year',
          'Emergency Room: $200/day — max 1 day/year',
          'Doctor Office Visit: $50/day — max 3 days/year',
          'Urgent Care: $125/day — max 2 days/year',
          'Chiropractic: $25/day — max 5 days/year',
          'Ambulance (Air): $200 — max 1/year',
          'Ambulance (Ground/Water): $100 — max 1/year',
          'Wellness Visit: $50 — max 1/year'
        ]
      },
      {
        category: 'Prescription & Lab Benefits',
        items: [
          'Rx discount card: save up to 80% at 68,000+ pharmacies — NOT insurance',
          'HealthWarehouse mail-order pharmacy: save 30–90%',
          'DirectLabs: discounted blood tests — up to 80% off — no doctor visit required',
          'Working Advantage employee perks program'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NOT major medical',
      'Benefits are pre-pays + reference-based repricing — NOT guaranteed bill coverage',
      'Medical providers may DECLINE to honor Reference-Based Pricing',
      'MBR cannot guarantee outcome of any claim or savings amount',
      'Balance billing possible if provider does not accept repriced amount',
      '12/12 pre-existing condition exclusion',
      '30-day sickness waiting period',
      'NO substance abuse or psychiatric coverage',
      'NO maternity coverage',
      'Managed Care network — verify provider availability',
      'Maternity, pregnancy, childbirth, prenatal care: Not covered',
      'Dental and vision: Not covered',
      'Prescription drugs: Not covered as insurance — discount savings program included',
      'Physical therapy, speech therapy, occupational therapy: Not covered',
      'Home health care and hospice: Not covered',
      'Custodial care: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Voluntary sterilization reversal: Not covered',
      'Workers compensation conditions: Not covered',
      'This plan is NOT ACA compliant and is NOT major medical insurance',
      'Plan pays fixed cash benefit amounts — member is responsible for any amount above the plan benefit',
      'DirectLabs is NOT insurance — members prepay for tests at discounted rates',
      'Prescription drugs: Not covered as insurance — discount card included',
      'Hospital insurance: 12/12 pre-existing condition limitation',
      'Hospital insurance: 75% benefit reduction at age 70',
      'Hospital insurance: no portability option',
      'Hospital insurance: 0-day benefit waiting period',
      'Normal pregnancy included in hospital insurance (complications always covered)'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — injuries'],
    preEx: '12-month exclusion',
    planNotes:
      'Unique structure — uses Reference-Based Pricing instead of traditional network. MBR reprices bills to 150–200% of Medicare. Provider acceptance not guaranteed. Call MBR BEFORE visiting provider: 877-278-4668.'
  },
  {
    group: 'Limited',
    id: 'bwaamericare',
    name: 'BWA Americare (2, 3, 4)',
    type: 'Limited Benefit / Fixed Indemnity',
    carrier: 'American Public Life',
    assoc: 'Business Workers of America (BWA)',
    network: 'PHCS',
    source: 'BWABrochurePlan2MBRAmericare2_REV.pdf',
    benefits: [
      {
        category: 'Doctor Visits (Pre-Pay)',
        items: [
          'Primary Care: $25 pre-pay',
          'Urgent Care: $25 pre-pay',
          'Specialist: $50 pre-pay',
          'PHCS network physicians — call 888-371-7427 or visit MultiPlan.com'
        ]
      },
      {
        category: 'Medical Bill Assistance (MBR)',
        items: [
          'Bills submitted to MBR for repricing via Reference-Based Pricing',
          'Repriced to 150%–200% Medicare Allowable Rates',
          'EOB issued to member and provider',
          'Balance handled through negotiation with provider'
        ]
      },
      {
        category: 'Network',
        items: [
          'PHCS network access — choose in-network for best savings',
          'MultiPlan: locate providers at 888-371-7427 or MultiPlan.com'
        ]
      },
      {
        category: 'Plan Structure',
        items: [
          'No deductible — fixed cash indemnity plan that pays set dollar amounts per service regardless of actual cost',
          'No out-of-pocket maximum — plan pays fixed benefit amounts up to stated limits',
          'Accidents: Covered from Day 1 — no waiting period for injury',
          'Sickness: 30-day waiting period applies',
          'Pre-existing conditions: Not covered for first 12 months from effective date',
          'Hospital confinement benefit: Pays fixed daily amount for each day admitted — see plan tier for amount',
          'Accidental death benefit: $10,000 maximum on all tiers',
          'HOW THE BENEFIT WORKS: This plan pays a FIXED DOLLAR AMOUNT per service per day — NOT the actual bill. Example: If a doctor visit costs $200 and the plan pays $50/day, the member receives $50 and is responsible for the remaining $150. The benefit is paid directly to the member. Using in-network providers reduces the gap because of pre-negotiated discounted rates.',
          'Pre-negotiated network discounts: Members who use in-network providers (First Health or PHCS depending on plan) receive pre-negotiated discounted rates on services. This reduces the gap between the actual bill and the fixed benefit amount. Always verify the provider is in-network before the appointment at providersearch.multiplan.com.'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: DirectLabs program — up to 80% off blood tests, urine, saliva, hair and fecal tests. No doctor appointment needed. Access at directlabs.com/4members. Not available in NJ, NY, RI.',
          'Prescription discount: Included — discount card for pharmacy savings'
        ]
      },
      {
        category: 'Hospital Indemnity (APL MedChoice Plan 3)',
        items: [
          'Hospital Admission: $1,000/day — max 1 day',
          'Hospital Confinement: $300/day — max 30 days',
          'ICU Admission: $2,000/day — max 1 day',
          'ICU Confinement: $500/day — max 30 days',
          'Inpatient Surgery: $500/day — max 1 day',
          'Outpatient Surgery: $300/day — max 1 day',
          'General Anesthesia: $125/day',
          'ER: $300/day — max 2 days',
          'Urgent Care: $50/day — max 3 days',
          'Physician Office: $50/day — max 3 days',
          'PT/Speech/OT: $15/day — max 5 days'
        ]
      },
      {
        category: 'Mental Health & Additional (Plan 3)',
        items: [
          'Serious Mental Illness treatment: Included',
          'Alcohol/Drug Addiction treatment: Included',
          'Portability option: Included',
          'Continuity of Coverage (Takeover): Included — credit for time served under prior coverage',
          'Pregnancy: complications always covered; normal pregnancy included'
        ]
      },
      {
        category: 'Prescription & Lab Benefits',
        items: [
          'Rx discount card: save up to 80% at 68,000+ pharmacies — NOT insurance',
          'HealthWarehouse mail-order pharmacy: save 30–90%',
          'DirectLabs: discounted blood tests — up to 80% off',
          'LetsGetChecked: 25% off home health tests'
        ]
      }
    ],
    limitations: [
      'NOT ACA-compliant insurance',
      'NOT major medical',
      'Pre-pays are for office visits — hospital bills repriced through MBR',
      'MBR cannot guarantee savings or claim outcomes',
      'Providers may decline Reference-Based Pricing',
      '12/12 pre-existing condition exclusion',
      '30-day sickness waiting period',
      'NO maternity coverage',
      'NO substance abuse coverage',
      'NO psychiatric services coverage',
      'Balance billing risk',
      'Maternity, pregnancy, childbirth, prenatal care: Not covered',
      'Dental and vision: Not covered',
      'Prescription drugs: Not covered as insurance — discount savings program included',
      'Physical therapy, speech therapy, occupational therapy: Not covered',
      'Home health care and hospice: Not covered',
      'Custodial care: Not covered',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Hearing aids: Not covered',
      'Voluntary sterilization reversal: Not covered',
      'Workers compensation conditions: Not covered',
      'This plan is NOT ACA compliant and is NOT major medical insurance',
      'Plan pays fixed cash benefit amounts — member is responsible for any amount above the plan benefit',
      'DirectLabs is NOT insurance — members prepay for tests at discounted rates',
      'Prescription drugs: Not covered as insurance — discount card included',
      'Hospital indemnity: no pre-existing condition limitation for Plan 3',
      'Hospital indemnity: pregnancy included (Plan 3)',
      'Hospital indemnity: occupational exclusion rider may apply',
      'Hospital indemnity benefits paid per day per calendar year',
      'Serious mental illness and addiction treatment included (Plan 3)'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — injuries'],
    preEx: '12-month exclusion',
    planNotes: 'BWA plan using PHCS network + MBR bill repricing. Plan 3 includes APL MedChoice hospital indemnity with $1,000 admission, $300/day confinement, $2,000 ICU admission, mental health and addiction treatment included. $25 PCP / $50 specialist pre-pay. Call MBR at 877-278-4668.'
  },
  {
    group: 'MEC',
    id: 'smartchoice2500',
    name: 'Smart Choice',
    type: 'MEC — Limited Medical EPO Plan',
    carrier: 'Detego Health LLC (Claims Administrator)',
    assoc: 'Population Science Management',
    network: 'First Health EPO — IN-NETWORK ONLY',
    source: 'Smart_Choice_2500_Plan_Doc_2025__.pdf',
    benefits: [
      {
        category: 'Deductible & Out-of-Pocket',
        items: [
          'Individual Deductible: $1,500 / $2,500 / $3,000 / $3,500 (four options)',
          'Family Deductible (Embedded): 2x individual amount',
          'Individual Out-of-Pocket Maximum: $9,200',
          'Family Out-of-Pocket Maximum: $18,400',
          'Once annual Out-of-Pocket Limit reached: most Covered Services paid 100%',
          'Copays DO NOT apply toward the Deductible',
          'EPO — OUT-OF-NETWORK SERVICES NOT COVERED (except emergencies)'
        ]
      },
      {
        category: 'Doctor Visits (Copay — not subject to deductible)',
        items: [
          'Primary Care Physician (PCP): $40 copay — 10 visit limit/year',
          'Specialist: $50 copay — 10 visit limit/year',
          'Copay waived if referred by Guardianship',
          'PCP includes: internal medicine, general medicine, OB/GYN, general pediatrics, family practice, physician assistants',
          'Physician Office Services (labs, x-ray, allergy testing, supplies, drugs during visit): $40 copay'
        ]
      },
      {
        category: 'Telehealth (Preferred Platform — $0 copay)',
        items: [
          'Primary Care telehealth: $0 copay',
          'Mental Health telehealth: $0 copay',
          'Urgent Care telehealth: $0 copay',
          'Web-based, video, or telephonic visits with licensed physician'
        ]
      },
      {
        category: 'Urgent Care',
        items: [
          'Urgent Care Facility: $60 copay — 3 visit limit/year',
          'Copay waived if referred by Guardianship'
        ]
      },
      {
        category: 'Emergency Services',
        items: [
          'Emergency Room: $250 copay after Deductible — 3 visits per family per benefit period',
          'ER copay waived if admitted within 24 hours for same diagnosis',
          'Out-of-network ER treated as In-network for true emergencies (required by law)',
          'Emergency Transportation (Ground Ambulance): $1,500 max payment after Deductible — 1 per family per benefit period',
          'Air Ambulance: $1,500 max after Deductible — In-network level if emergent'
        ]
      },
      {
        category: 'Hospital & Surgery',
        items: [
          'Outpatient Hospital/Facility Services: $750 copay after Deductible — 3 per family per benefit period',
          'Elective surgeries EXCLUDED from Outpatient benefit',
          'Inpatient Hospital/Facility: $2,500 copay after Deductible — 1 per family per benefit period (up to 5 days)',
          'Preauthorization REQUIRED for all inpatient admissions',
          'Failure to preauthorize = denial of benefits'
        ]
      },
      {
        category: 'Advanced Diagnostics & Imaging',
        items: [
          'CT, MRI, MRA, MRS, PET, SPECT scans and Nuclear Medicine: $250 copay after Deductible',
          '3 per benefit period limit',
          'Preauthorization REQUIRED',
          'Radiology (X-ray) & Other Diagnostic Tests: $75 copay after Deductible — 3 per family per benefit period'
        ]
      },
      {
        category: 'Mental Health & Substance Use Disorder',
        items: [
          'Inpatient Mental Health: $250 copay after Deductible — 8 day limit',
          'Outpatient Mental Health Office Services: $50 copay after Deductible — 8 visit limit',
          'Telehealth Mental Health: $0 copay (via preferred platform)',
          'Covered providers: Licensed Psychiatrist, Psychologist, Clinical Social Worker, Professional Counselor, Marriage & Family Therapist',
          'Residential Treatment covered with preauthorization',
          'Partial hospitalization, day treatment programs covered'
        ]
      },
      {
        category: 'Preventive Services',
        items: [
          'ACA-required preventive services: Plan pays 100% (no cost to member)',
          'Pediatric immunizations (under age 7): Plan pays 100%',
          'Age 7 and older immunizations: Plan pays 100%',
          'Colorectal cancer screenings (starting age 45): Plan pays 100% at recommended frequency',
          'Mammography: covered',
          'Pap smears: covered',
          'ACA preventive services outside frequency limits: Same as any other illness'
        ]
      },
      {
        category: 'Prescriptions (Rx)',
        items: [
          'Retail (30-day supply): Preferred Generic $12 copay',
          'Brand Name Drugs: NOT COVERED',
          'Non-preferred Brand Name Drugs: NOT COVERED',
          'Home Delivery (90-day): Preferred Generic via ScriptCo only',
          'Specialty Drugs: Patient Assistance through ScriptAide (income-based — not insurance coverage)',
          'Pharmacy Benefit Manager: Ventegra (Acute Formulary Only for retail)',
          'Generic drugs substituted whenever available; penalty applies if brand requested when generic available'
        ]
      },
      {
        category: 'Other Covered Services',
        items: [
          'Allergy Testing: $50 copay — 2 visit limit; Allergy Shots: $25 copay — 10 visit limit',
          'Diabetic Services/Education: $50 copay after Deductible — 1 visit limit; Diabetic Supplies via DiaThrive',
          'Drugs Administered Outpatient: $50 copay after Deductible — 7 combined visit limit',
          'Durable Medical Equipment (DME): $50 copay after Deductible — 7 combined; preauth if $500+',
          'Home Health Care / Home Health Aide / Respiratory Care: $50 copay after Deductible — 7 combined (preauth required)',
          'Home Infusion Therapy: $150 copay after Deductible — 10 combined visits',
          'Skilled Nursing Care: $50 copay after Deductible — 7 combined (preauth required)',
          'Hospice Services: $50 copay after Deductible — 7 combined (preauth required)',
          'Rehabilitation Services: $50 copay after Deductible — 8 combined visit limit',
          'Therapy & Manipulations (PT, OT, Speech, Chiro): $50 copay after Deductible — 8 combined',
          'Organ & Tissue Transplants: Covered with preauthorization (liver, heart, lung, kidney, kidney-pancreas, bone marrow, stem cell, cornea, and more)',
          'Breast prostheses post-cancer: covered (1 per side/2 years custom; 2 standard/year)',
          'Cochlear implants: covered including evaluation, implant, surgery, fitting',
          'Clinical trials (ACA approved): routine patient costs covered',
          'Green Imaging: preferred imaging partner — Fax orders to 866-653-0882'
        ]
      },
      {
        category: 'Maternity',
        items: [
          'Maternity/Newborn Care: NOT COVERED',
          'Dependent Child Pregnancy: NOT COVERED',
          'Initial postpartum depression screening up to 1 year: Plan pays 100%',
          'Infertility diagnosis: NOT COVERED',
          'Infertility treatment: NOT COVERED'
        ]
      },
      {
        category: 'Preauthorization Required',
        items: [
          'Advanced Diagnostic Imaging (CT/MRI/MRA/CAT/PET)',
          'Durable Medical Equipment (DME) over $500',
          'Genetic Testing',
          'Hospice Care',
          'Inpatient Hospital admissions',
          'Inpatient Physical Rehabilitation',
          'Organ and tissue transplants',
          'Skilled Nursing Care',
          'Certain prescription drugs',
          'Long-Term Acute Care',
          'Failure to preauthorize = denial or reduction of benefits — member is responsible for costs'
        ]
      },
      {
        category: 'Contact & Claims',
        items: [
          'Member Services: 866-815-6001 | memberservices@detegohealth.com',
          'Preauthorization (GuideCM): 866-837-1714 | info@guidecm.com',
          'Member Advocates (NaviClaim): 866-837-1436 | info@naviclaim.com',
          'Prescription Assistance (ScriptAide): 866-837-1515 | info@scriptaide.com',
          'Claims mailed to: PO Box 211609, Eagan MN 55121 | Payor ID: 62599',
          'Claims must be filed within 15 months of date of service'
        ]
      },
      {
        category: 'Additional Coverage',
        items: [
          'Deductible options available: $1,500, $2,500, $3,000, or $3,500 individual (family deductible is 2x the individual amount chosen). The plan document on file covers the $2,500 option. Out-of-pocket maximum: $9,200 individual / $18,400 family. Confirm deductible tier selected at enrollment in NEO.',
          'Out-of-pocket maximum: $9,200 individual / $18,400 family — in-network only',
          'Out-of-network: Deductible and OOP not covered — all out-of-network expenses member responsibility',
          'Coinsurance: Plan pays percentage after deductible is met — confirm at enrollment',
          'Chiropractic care: Covered subject to scope of practice regulations',
          'Dialysis: Covered',
          'Chemotherapy: Covered',
          'DME durable medical equipment: Covered when medically necessary and preauthorized',
          'Organ transplants: Covered for approved organs — preauthorization required',
          'Home health care: Covered — preauthorization required',
          'Hospice: Covered — preauthorization required',
          'Generic Rx: $12 copay'
        ]
      }
    ],
    limitations: [
      'EPO PLAN — ZERO out-of-network coverage except true emergencies',
      'ALL providers MUST be in First Health network — verify BEFORE every appointment',
      'NOT ACA-compliant major medical insurance',
      'NOT traditional insurance — Group health benefit plan administered by Detego Health LLC',
      'Maternity/newborn care: NOT COVERED (except initial postpartum depression screening)',
      'Infertility services: NOT COVERED',
      'Brand name and non-preferred prescription drugs: NOT COVERED',
      'Specialty drugs: NOT COVERED as insurance — ScriptAide patient assistance program available (income-based)',
      'Elective surgeries excluded from Outpatient Hospital benefit',
      'Mental Health inpatient: 8-day limit; Outpatient: 8-visit limit',
      'Inpatient Hospital: 1 admission per family per benefit period (up to 5 days)',
      'Outpatient surgery/facility: 3 per family per benefit period',
      'ER: 3 per family per benefit period',
      'Ambulance: 1 per family per benefit period',
      'Advanced imaging (CT/MRI/PET): 3 per benefit period — preauth required',
      'PCP and Specialist office visits: 10 per year each',
      'Urgent Care: 3 visits per year',
      'Rehabilitation/Therapy: 8 combined visits per year',
      'Cosmetic surgery: NOT COVERED (unless traumatic injury, congenital abnormality, or post-cancer)',
      'Vision and hearing exams (routine): NOT COVERED',
      'Dental procedures: NOT COVERED (except specific oral surgery per plan terms)',
      'Weight loss programs, obesity treatment: NOT COVERED',
      'Experimental/investigational treatments: NOT COVERED',
      'Alternative therapies (massage, acupuncture, aromatherapy, naturopathy): NOT COVERED',
      'Applied Behavior Analysis Therapy: NOT COVERED',
      'Custodial care: NOT COVERED',
      'Private duty nursing: NOT COVERED',
      'Long-term rehabilitation programs: NOT COVERED',
      'Services outside United States: NOT COVERED (except emergency)',
      'Failure to preauthorize required services = denial of benefits',
      'Charges in excess of Contracted Amount: NOT COVERED (member responsibility)',
      'Maternity and newborn care: Not covered — excluded per plan document',
      'Cosmetic surgery: Not covered',
      'Weight loss and bariatric surgery: Not covered',
      'Infertility treatment: Not covered',
      'Routine foot care: Not covered',
      'Dental and vision: Not covered (except post-surgery corrective lenses)',
      'Failure to preauthorize required services results in denial of benefits',
      'Out-of-network services: No benefits — all care must be in-network'
    ],
    waitingPeriods: [
      'No traditional sickness waiting period — deductible/copay structure applies from Day 1',
      'Preauthorization required BEFORE inpatient admissions and certain services',
      'ER: must notify plan within 24 hours of emergency admission'
    ],
    preEx:
      'No traditional 12/12 pre-existing condition exclusion stated in this plan document. Benefits subject to Medical Necessity determination. Verify with carrier for any applicable pre-ex rules.',
    planNotes:
      'Smart Choice 2500 is a true EPO group health benefit plan — the most comprehensive plan in the CHA portfolio. Four deductible options: $1,500 / $2,500 / $3,000 / $3,500 individual with $9,200 OOP max. Includes real major services: inpatient hospital, outpatient surgery, ER, mental health, labs, imaging, transplants. KEY: EPO means ZERO out-of-network — always verify doctor is in First Health network before enrolling. Administered by Detego Health LLC. NOT traditional insurance. Preauthorization required for hospital, imaging, and many other services — failure to preauthorize = denied claim. | This is a limited medical plan — not ACA-compliant major medical | Preauthorization required for: inpatient stays, advanced imaging, DME, transplants, hospice, certain surgeries and drugs | In-network and out-of-network deductibles and OOP do not cross-accumulate | Copays do not apply toward deductible'
  }
];
