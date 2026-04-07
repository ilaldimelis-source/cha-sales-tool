// policy-docs.js — Policy Reference tab (POLICY_DOCS data + render/filter/toggle)
var POLICY_DOCS = [
  {
    group: 'MEC',
    id: 'medf1',
    name: 'MedFirst 1',
    type: 'MEC — Minimum Essential Coverage',
    carrier: 'Merchants Benefit Administration (MBA)',
    assoc: 'VP Limited Partnership / The Vitamin Patch (TVP)',
    network: 'First Health',
    source: 'MEC_MedFirst1_SPD_Jan25.pdf',
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
          'Coinsurance: 80/20 (plan pays 80%, you pay 20%)',
          'Coinsurance limit: $2,000 or $4,000 out-of-pocket max'
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
      'Age limit: Coverage terminates at end of month member turns 65'
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
        category: 'Network Access',
        items: [
          'PHCS network — approximately 900,000 healthcare providers',
          'Facility charges: plan pays up to 150% of Medicare allowable',
          'In-network and out-of-network access (in-network preferred for cost savings)'
        ]
      },
      {
        category: 'Deductible & Coinsurance',
        items: [
          'Deductible options: $500 / $1,000 / $2,000 / $2,500 / $5,000 / $7,500 / $10,000',
          'Coinsurance: 80/20',
          'Coinsurance limit: $2,000 or $4,000'
        ]
      },
      {
        category: 'Additional Benefits',
        items: [
          'RightWay Healthcare patient advisors for navigation assistance',
          'NCE Association member discounts: prescriptions, vision, hearing, dental, nutrition'
        ]
      },
      {
        category: 'Coverage Terms',
        items: [
          'Next-day coverage available',
          'Up to 36 months coverage depending on state'
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
      'Pre-existing conditions excluded (12/12)',
      '5-day waiting period for sickness',
      '30-day waiting period for cancer',
      'No waiting period for injuries',
      'NOT renewable as permanent coverage',
      'Association discounts are NOT insurance — no coverage guarantee',
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
    preEx: '12-month exclusion for prior 12-month conditions',
    planNotes:
      'PHCS network STM. Includes RightWay patient advocacy navigation. Very similar structure to Access Health STM. | STM plan — not ACA compliant. Designed as temporary bridge coverage during life transitions. | Deductible options vary — confirm deductible chosen at enrollment ($500 to $10,000 options available) | Coinsurance: Plan pays percentage after deductible is met | Coverage period maximum applies — confirm at enrollment | Next-day coverage available if applied online with credit card or bank debit'
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
        category: 'STANDARD',
        items: [
          'Deductible: $2,500 / $5,000 / $7,500 / $10,000',
          'Coverage max: $1,000,000',
          'PCP $40 / Specialty $60 copay',
          'Hospital: up to $2,500/day',
          'Surgery inpatient: $4,000 — up to 2 per term'
        ]
      },
      {
        category: 'ECONOMY',
        items: [
          'Deductible: $5,000 / $7,500 / $10,000',
          'Coverage max: $500,000',
          'Doctor visits subject to deductible (no copay)',
          'Hospital: up to $1,500/day'
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
          'Network: PHCS Practitioner Plus Ancillary Network — members can see any doctor but in-network avoids balance billing. Find providers at providersearch.multiplan.com',
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
          'ER benefit (100 tier+): $50/day — max 1 day/yr',
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
          'Accidental death benefit: $10,000 maximum on all tiers'
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
          'Accidental death benefit: $10,000 maximum on all tiers'
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
          'Accidental death benefit: $10,000 maximum on all tiers'
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
          'Additional hospital admission benefit (tier 1000+ only): $1,000 per admission up to 5 days'
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
      'Prescription drugs: Not covered'
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
        category: 'Additional',
        items: [
          'Guaranteed issue underwriting',
          'Benefits paid directly to you',
          'Multiplan PPO network access for negotiated rates',
          'Fast payment — simplified claims process'
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
          'Accidental death benefit: $10,000 maximum on all tiers'
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
      'No ICU additional benefit on most plans (ICU only on 1000+ tier)',
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
      'Workers compensation: Not covered'
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
          'Accidental death benefit: $10,000 maximum on all tiers'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: DirectLabs program — up to 80% off blood tests, urine, saliva, hair and fecal tests. No doctor appointment needed. Access at directlabs.com/4members. Not available in NJ, NY, RI.',
          'Prescription discount: Included — discount card for pharmacy savings'
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
      'Prescription drugs: Not covered as insurance — discount card included'
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
          'Accidental death benefit: $10,000 maximum on all tiers'
        ]
      },
      {
        category: 'Additional Benefits & Savings Programs',
        items: [
          'Blood work and lab tests: DirectLabs program — up to 80% off blood tests, urine, saliva, hair and fecal tests. No doctor appointment needed. Access at directlabs.com/4members. Not available in NJ, NY, RI.',
          'Prescription discount: Included — discount card for pharmacy savings'
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
      'Prescription drugs: Not covered as insurance — discount card included'
    ],
    waitingPeriods: ['30 days — sickness', 'Day 1 — injuries'],
    preEx: '12-month exclusion',
    planNotes:
      'BWA plan using PHCS network + MBR bill repricing. Tiered plans (2, 3, 4). $25 PCP / $50 specialist pre-pay. Submit medical bills to MBR at 877-278-4668 for repricing.'
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

// ── RENDER: POLICY BENEFITS REFERENCE ──────────────────────────
var policyDocFilter = 'All';
var policyDocSearch = '';
var policyDocOpen = null;
var _pdSearchTimer;

function renderPolicydocs() {
  var html =
    '<div class="ph"><div class="pt">Policy <span>Reference</span></div>';
  html +=
    '<div class="pd">Sourced from official plan documents. Verify rates with your carrier before enrollment.</div></div>';

  // Filter tabs
  html += '<div class="stabs" style="margin-bottom:12px;">';
  ['All', 'MEC', 'STM', 'Limited'].forEach(function (f) {
    html +=
      '<button class="stab' +
      (f === policyDocFilter ? ' active' : '') +
      '" onclick="policyDocFilter=\'' +
      f +
      '\';policyDocFilterChanged()">' +
      (f === 'All' ? 'All' : f) +
      '</button>';
  });
  html += '</div>';

  // Search box
  html += '<div style="position:relative;margin-bottom:14px;">';
  html +=
    '<svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);pointer-events:none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  html +=
    '<input type="text" id="pdSearchInput" placeholder="Search plans, benefits, exclusions..." value="' +
    escHTML(policyDocSearch) +
    '" aria-label="Search plans, benefits, exclusions" oninput="policyDocSearchTyping(this.value)" style="width:100%;height:44px;border-radius:999px;border:1.5px solid #E5E7EB;padding:0 40px 0 44px;font-size:14px;font-family:var(--font-body);background:#F8F9FE;color:var(--text-primary);outline:none;transition:border-color 0.15s;" onfocus="this.style.borderColor=\'#5B8DEF\'" onblur="this.style.borderColor=\'#E5E7EB\'">';
  html +=
    '<button id="pdSearchClear" onclick="clearPdSearch()" style="display:' +
    (policyDocSearch ? 'block' : 'none') +
    ';position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9CA3AF;font-size:18px;line-height:1;padding:4px;">&times;</button>';
  html += '</div>';

  // Results container
  html += '<div id="pdResultsContainer">';
  html += renderPolicyResults();
  html += '</div>';

  var _page_policydocs =
    document.getElementById('allplans-policydocs') ||
    document.getElementById('page-policydocs');
  if (_page_policydocs) _page_policydocs.innerHTML = html;
}

function policyDocSearchTyping(val) {
  policyDocSearch = val;
  var clearBtn = document.getElementById('pdSearchClear');
  if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
  clearTimeout(_pdSearchTimer);
  _pdSearchTimer = setTimeout(function () {
    var container = document.getElementById('pdResultsContainer');
    if (container) container.innerHTML = renderPolicyResults();
  }, 100);
}

function clearPdSearch() {
  policyDocSearch = '';
  var input = document.getElementById('pdSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  var clearBtn = document.getElementById('pdSearchClear');
  if (clearBtn) clearBtn.style.display = 'none';
  var container = document.getElementById('pdResultsContainer');
  if (container) container.innerHTML = renderPolicyResults();
}

function policyDocFilterChanged() {
  var container = document.getElementById('pdResultsContainer');
  if (container) {
    container.innerHTML = renderPolicyResults();
  }
  // Update filter tab active states
  var tabs = document.querySelectorAll('.stabs .stab');
  var filters = ['All', 'MEC', 'STM', 'Limited'];
  tabs.forEach(function (tab, i) {
    if (filters[i] === policyDocFilter) tab.classList.add('active');
    else tab.classList.remove('active');
  });
}

function _pdBadge(grp) {
  var bg =
    grp === 'MEC'
      ? 'rgba(91,141,239,0.10)'
      : grp === 'STM'
        ? 'rgba(245,158,11,0.10)'
        : 'rgba(239,68,68,0.08)';
  var col = grp === 'MEC' ? '#5B8DEF' : grp === 'STM' ? '#d97706' : '#dc2626';
  return (
    '<span style="display:inline-block;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:' +
    bg +
    ';color:' +
    col +
    ';">' +
    grp +
    '</span>'
  );
}

function _pdGrpColor(grp) {
  return grp === 'MEC' ? '#5B8DEF' : grp === 'STM' ? '#d97706' : '#dc2626';
}

function _pdSectionHead(label, color, collapsed) {
  var chevDir = collapsed ? '' : 'transform:rotate(180deg);';
  return (
    '<div onclick="pdToggleSection(this)" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:10px 0;border-bottom:1px solid #E5E7EB;margin-bottom:8px;">' +
    '<span style="font-family:var(--font-ui);font-size:13px;font-weight:700;color:' +
    color +
    ';text-transform:uppercase;letter-spacing:.06em;">' +
    label +
    '</span>' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' +
    color +
    '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;transition:transform 0.2s;' +
    chevDir +
    '" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></div>'
  );
}

function pdToggleSection(header) {
  var body = header.nextElementSibling;
  var chev = header.querySelector('svg');
  if (!body) return;
  var hidden = body.style.display === 'none';
  body.style.display = hidden ? '' : 'none';
  if (chev) chev.style.transform = hidden ? 'rotate(180deg)' : '';
}

function _pdExpandedDetail(plan) {
  var gc = _pdGrpColor(plan.group);
  var html =
    '<div id="pd-detail-' +
    plan.id +
    '" style="background:#FFFFFF;border:2px solid ' +
    gc +
    ';border-radius:16px;margin-bottom:16px;overflow:hidden;animation:riseUp 0.18s ease both;">';

  // ── Header bar ──
  html +=
    '<div style="padding:16px 20px;border-bottom:1.5px solid #E5E7EB;display:flex;align-items:center;gap:12px;">';
  html += '<div style="flex:1;min-width:0;">';
  html +=
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:2px;">' +
    _pdBadge(plan.group);
  html +=
    '<span style="font-family:var(--font-ui);font-size:17px;font-weight:700;color:var(--text-primary);">' +
    plan.name +
    '</span></div>';
  html +=
    '<div style="font-size:13px;color:var(--text-secondary);line-height:1.4;">' +
    plan.network +
    ' &middot; ' +
    plan.carrier +
    '</div>';
  if (plan.assoc)
    html +=
      '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">' +
      plan.assoc +
      '</div>';
  html += '</div>';
  html +=
    '<button onclick="policyDocToggle(\'' +
    plan.id +
    '\')" style="background:none;border:1px solid #E5E7EB;border-radius:8px;padding:6px;cursor:pointer;color:var(--text-secondary);flex-shrink:0;" aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  html += '</div>';

  // ── Content body ──
  html += '<div style="padding:16px 20px;">';

  // Quick Summary
  if (plan.planNotes) {
    html +=
      '<div style="background:#F8F9FE;border-left:3px solid ' +
      gc +
      ';border-radius:0 10px 10px 0;padding:10px 14px;margin-bottom:16px;font-size:14px;color:var(--text-secondary);line-height:1.55;">' +
      plan.planNotes +
      '</div>';
  }

  // Waiting Periods + Pre-Existing — always prominent
  html +=
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;">';
  html +=
    '<div style="background:rgba(34,197,94,0.05);border:1.5px solid rgba(34,197,94,0.2);border-radius:12px;padding:12px 14px;">';
  html +=
    '<div style="font-family:var(--font-ui);font-size:12px;font-weight:700;color:#15803D;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Waiting Periods</div>';
  plan.waitingPeriods.forEach(function (w) {
    html +=
      '<div style="font-size:14px;color:var(--text-primary);margin-bottom:3px;line-height:1.5;">' +
      w +
      '</div>';
  });
  html += '</div>';
  html +=
    '<div style="background:rgba(239,68,68,0.04);border:1.5px solid rgba(239,68,68,0.18);border-radius:12px;padding:12px 14px;">';
  html +=
    '<div style="font-family:var(--font-ui);font-size:12px;font-weight:700;color:#B91C1C;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Pre-Existing</div>';
  html +=
    '<div style="font-size:14px;color:var(--text-primary);line-height:1.5;">' +
    plan.preEx +
    '</div>';
  html += '</div></div>';

  // Benefits — grouped by category, separated into logical sections
  var benefitCats = { coverage: [], rx: [], preventive: [], other: [] };
  plan.benefits.forEach(function (bcat) {
    var cl = bcat.category.toLowerCase();
    if (cl.indexOf('prescription') !== -1 || cl.indexOf('rx') !== -1)
      benefitCats.rx.push(bcat);
    else if (cl.indexOf('preventive') !== -1 || cl.indexOf('mec') !== -1)
      benefitCats.preventive.push(bcat);
    else if (
      cl.indexOf('doctor') !== -1 ||
      cl.indexOf('hospital') !== -1 ||
      cl.indexOf('surgery') !== -1 ||
      cl.indexOf('telemedicine') !== -1 ||
      cl.indexOf('telehealth') !== -1 ||
      cl.indexOf('emergency') !== -1 ||
      cl.indexOf('ambulance') !== -1 ||
      cl.indexOf('urgent') !== -1
    )
      benefitCats.coverage.push(bcat);
    else benefitCats.other.push(bcat);
  });

  // Coverage section
  if (benefitCats.coverage.length) {
    html += _pdSectionHead('Benefits', '#5B8DEF', false);
    html += '<div style="margin-bottom:16px;">';
    benefitCats.coverage.forEach(function (bcat) {
      html += '<div style="margin-bottom:10px;">';
      html +=
        '<div style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:4px;">' +
        bcat.category +
        '</div>';
      bcat.items.forEach(function (item) {
        html +=
          '<div style="font-size:14px;color:var(--text-secondary);padding-left:14px;margin-bottom:2px;line-height:1.55;">&#8226; ' +
          item +
          '</div>';
      });
      html += '</div>';
    });
    html += '</div>';
  }

  // Prescriptions / Rx
  if (benefitCats.rx.length) {
    html += _pdSectionHead('Prescriptions / Rx', '#7C3AED', false);
    html += '<div style="margin-bottom:16px;">';
    benefitCats.rx.forEach(function (bcat) {
      bcat.items.forEach(function (item) {
        html +=
          '<div style="font-size:14px;color:var(--text-secondary);padding-left:14px;margin-bottom:2px;line-height:1.55;">&#8226; ' +
          item +
          '</div>';
      });
    });
    html += '</div>';
  }

  // Preventive / MEC
  if (benefitCats.preventive.length) {
    html += _pdSectionHead('Preventive / MEC', '#15803D', false);
    html += '<div style="margin-bottom:16px;">';
    benefitCats.preventive.forEach(function (bcat) {
      bcat.items.forEach(function (item) {
        html +=
          '<div style="font-size:14px;color:var(--text-secondary);padding-left:14px;margin-bottom:2px;line-height:1.55;">&#8226; ' +
          item +
          '</div>';
      });
    });
    html += '</div>';
  }

  // Other benefit categories (Peer Support, Concierge, etc.)
  if (benefitCats.other.length) {
    html += _pdSectionHead('Other Benefits', '#6B7280', false);
    html += '<div style="margin-bottom:16px;">';
    benefitCats.other.forEach(function (bcat) {
      html += '<div style="margin-bottom:8px;">';
      html +=
        '<div style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:4px;">' +
        bcat.category +
        '</div>';
      bcat.items.forEach(function (item) {
        html +=
          '<div style="font-size:14px;color:var(--text-secondary);padding-left:14px;margin-bottom:2px;line-height:1.55;">&#8226; ' +
          item +
          '</div>';
      });
      html += '</div>';
    });
    html += '</div>';
  }

  // Exclusions — collapsed by default
  if (plan.limitations.length) {
    html += _pdSectionHead(
      'Exclusions (' + plan.limitations.length + ')',
      '#B91C1C',
      true
    );
    html += '<div style="margin-bottom:16px;display:none;">';
    plan.limitations.forEach(function (lim) {
      html +=
        '<div style="font-size:14px;color:var(--text-secondary);padding-left:14px;margin-bottom:3px;line-height:1.55;"><span style="color:#DC2626;font-weight:600;">&#10005;</span> ' +
        lim +
        '</div>';
    });
    html += '</div>';
  }

  // Source
  html +=
    '<div style="padding-top:10px;border-top:1px solid #E5E7EB;font-size:12px;color:var(--text-muted);">Source: ' +
    plan.source +
    '</div>';

  html += '</div>'; // close content body
  html += '</div>'; // close detail card
  return html;
}

function renderPolicyResults() {
  var html = '';
  var filtered = POLICY_DOCS.filter(function (p) {
    var groupOk = policyDocFilter === 'All' || p.group === policyDocFilter;
    if (!groupOk) return false;
    if (!policyDocSearch.trim()) return true;
    var q = policyDocSearch.toLowerCase();
    var expandedTerms = expandSearchSynonyms(q);
    var searchable = (
      p.name +
      ' ' +
      p.type +
      ' ' +
      p.carrier +
      ' ' +
      p.network +
      ' ' +
      p.planNotes +
      ' ' +
      p.limitations.join(' ') +
      ' ' +
      p.benefits
        .map(function (b) {
          return b.category + ' ' + b.items.join(' ');
        })
        .join(' ') +
      ' ' +
      (p.preEx || '') +
      ' ' +
      (p.waitingPeriods || []).join(' ')
    ).toLowerCase();
    for (var t = 0; t < expandedTerms.length; t++) {
      if (brTermMatch(searchable, expandedTerms[t])) return true;
    }
    return false;
  });

  if (!filtered.length) {
    return '<div style="text-align:center;padding:40px;color:var(--text-muted);font-size:14px;">No plans match your search.</div>';
  }

  var groups = [
    { key: 'MEC', label: 'MEC Plans', color: '#5B8DEF' },
    { key: 'STM', label: 'Short-Term Medical', color: '#d97706' },
    { key: 'Limited', label: 'Limited Benefit', color: '#dc2626' }
  ];

  groups.forEach(function (grp) {
    var plans = filtered.filter(function (p) {
      return p.group === grp.key;
    });
    if (!plans.length) return;

    // Group header
    html +=
      '<div style="display:flex;align-items:center;gap:10px;margin:18px 0 10px;">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:' +
      grp.color +
      ';text-transform:uppercase;letter-spacing:.06em;">' +
      grp.label +
      '</div>';
    html += '<div style="flex:1;height:1px;background:#E5E7EB;"></div>';
    html +=
      '<span style="font-family:var(--font-ui);font-size:12px;font-weight:600;color:var(--text-muted);">' +
      plans.length +
      '</span></div>';

    // Card grid
    html +=
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin-bottom:6px;">';
    plans.forEach(function (plan) {
      var isOpen = policyDocOpen === plan.id;
      var borderColor = isOpen ? grp.color : '#C8CEDD';
      var bgColor = isOpen
        ? grp.key === 'MEC'
          ? 'rgba(91,141,239,0.04)'
          : grp.key === 'STM'
            ? 'rgba(245,158,11,0.04)'
            : 'rgba(239,68,68,0.03)'
        : '#FFFFFF';

      html +=
        '<div id="pd-' +
        plan.id +
        '" style="background:' +
        bgColor +
        ';border:2px solid ' +
        borderColor +
        ';border-radius:14px;cursor:pointer;transition:border-color 0.15s, background 0.15s;" onclick="policyDocToggle(\'' +
        plan.id +
        '\')">';
      html +=
        '<div style="padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">';
      html += '<div style="flex:1;min-width:0;">';
      html +=
        '<div style="margin-bottom:6px;">' + _pdBadge(plan.group) + '</div>';
      html +=
        '<div style="font-family:var(--font-ui);font-size:15px;font-weight:700;color:var(--text-primary);line-height:1.3;margin-bottom:3px;">' +
        plan.name +
        '</div>';
      html +=
        '<div style="font-size:12px;color:var(--text-secondary);line-height:1.4;">' +
        plan.network +
        ' &middot; ' +
        plan.carrier +
        '</div>';
      html += '</div>';
      html +=
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' +
        (isOpen ? grp.color : '#9CA3AF') +
        '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:6px;transition:transform 0.2s;' +
        (isOpen ? 'transform:rotate(180deg);' : '') +
        '" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
      html += '</div></div>';
    });
    html += '</div>';

    // Expanded detail for open plan in this group
    if (policyDocOpen) {
      var openPlan = plans.filter(function (p) {
        return p.id === policyDocOpen;
      })[0];
      if (openPlan) {
        html += _pdExpandedDetail(openPlan);
      }
    }
  });

  return html;
}

function policyDocToggle(id) {
  policyDocOpen = policyDocOpen === id ? null : id;
  var container = document.getElementById('pdResultsContainer');
  if (container) container.innerHTML = renderPolicyResults();
  if (policyDocOpen) {
    // Set sticky plan context
    var plan = POLICY_DOCS.find(function (p) {
      return p.id === id;
    });
    if (plan && typeof setActivePlan === 'function') {
      setActivePlan(plan.id, plan.name, plan.group || plan.type || '');
    }
    setTimeout(function () {
      var el = document.getElementById('pd-detail-' + id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}
