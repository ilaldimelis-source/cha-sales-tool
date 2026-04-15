// plan-data.js — POLICY_DOCS array (pure data, no functions)
// Loaded before policy-docs.js which handles render/filter/toggle
//
// Text below is copied verbatim from knowledge_base/Plan_Reference_Table.pdf
// (official plan name / network / underwriter / association matrix).
var CHA_KNOWLEDGE_BASE_REF_TEXT =
  'Plan Reference Table\n' +
  'LIMITED\n' +
  'Plan Name Network Underwriter Association\n' +
  'MedFirst 1-5 First Health MBA VP Limited / TVP\n' +
  'TrueHealth 1-3 First Health MBA VP Limited / TVP\n' +
  'GoodHealth 1-5 First Health MBA Good Health Partners\n' +
  'TDK 1-5 First Health Detego Health Health Care Data Analytics\n' +
  'HarmonyCare First Health Everest NCE\n' +
  'SigmaCare MultiPlan Everest NCE\n' +
  'Everest MultiPlan AFSLIC NCE\n' +
  'Pinnacle Protect 1-4 PHCS Everest AWA\n' +
  'BWA Americare 2-4 PHCS American Public Life BWA\n' +
  'STM\n' +
  'Plan Name Network Underwriter Association\n' +
  'Pinnacle STM PHCS Everest AWA\n' +
  'Access Health STM PHCS AFSLIC NCE\n' +
  'Smart Health STM PHCS Standard Life NCE\n' +
  'Galena STM MultiPlan Southern Guarantee AFRP\n' +
  'SmartChoice 1500 First Health EPO Detego Health Population Science Mgmt\n' +
  'SmartChoice 3000 First Health EPO Detego Health Population Science Mgmt\n' +
  'SmartChoice 3500 First Health EPO Detego Health Population Science Mgmt\n' +
  'MEC\n' +
  'Plan Name Network Underwriter Association\n' +
  'MedFirst 1-5 First Health MBA TVP\n' +
  'TrueHealth 1-3 First Health MBA TVP\n' +
  'GoodHealth 1-5 First Health MBA Good Health Partners\n' +
  'TDK 1-5 First Health Detego Health Health Care Data Analytics\n' +
  '\n' +
  '-- 1 of 1 --\n';

function chaApplyKnowledgeBasePdfToDocs(docs) {
  if (typeof docs === 'undefined' || !docs || !docs.length) return;
  var ref = CHA_KNOWLEDGE_BASE_REF_TEXT;
  var header =
    '=== OFFICIAL REFERENCE (knowledge_base/Plan_Reference_Table.pdf) ===\n' +
    ref +
    '=== END REFERENCE TABLE ===\n\n';
  var idsMedTrue = {
    medf1: 1,
    medf2: 1,
    medf3: 1,
    medf4: 1,
    medf5: 1,
    trueh1: 1,
    trueh2: 1,
    trueh3: 1
  };
  var idsGood = { ghdp1: 1, ghdp2: 1, ghdp3: 1, ghdp4: 1, ghdp5: 1 };
  var idsTdk = { tdk1: 1, tdk2: 1, tdk3: 1, tdk4: 1, tdk5: 1 };
  var i;
  for (i = 0; i < docs.length; i++) {
    var p = docs[i];
    if (!p || typeof p !== 'object') continue;
    if (typeof p.rawText === 'string' && p.rawText.indexOf('=== OFFICIAL REFERENCE') === -1) {
      p.rawText = header + p.rawText;
    }
    var id = p.id;
    if (idsMedTrue[id]) {
      p.network = 'First Health';
      p.carrier = 'Merchants Benefit Administration (MBA)';
      p.assoc = 'VP Limited Partnership / The Vitamin Patch (TVP)';
    } else if (idsGood[id]) {
      p.network = 'First Health';
      p.carrier = 'Merchants Benefit Administration (MBA)';
      p.assoc = 'Good Health Partners';
    } else if (idsTdk[id]) {
      p.network = 'First Health';
      p.carrier = 'Detego Health';
      p.assoc = 'Health Care Data Analytics';
    } else if (id === 'pinnacle') {
      p.network = 'PHCS';
      p.carrier = 'Everest';
      p.assoc = 'AWA';
    } else if (id === 'accesshealth') {
      p.network = 'PHCS';
      p.carrier = 'AFSLIC';
      p.assoc = 'NCE';
    } else if (id === 'smarthealth') {
      p.network = 'PHCS';
      p.carrier = 'Standard Life';
      p.assoc = 'NCE';
    } else if (id === 'galena') {
      p.network = 'MultiPlan';
      p.carrier = 'Southern Guarantee';
      p.assoc = 'AFRP';
    } else if (id === 'harmonycare') {
      p.network = 'First Health';
      p.carrier = 'Everest';
      p.assoc = 'NCE';
    } else if (id === 'sigmacare') {
      p.network = 'MultiPlan';
      p.carrier = 'Everest';
      p.assoc = 'NCE';
    } else if (id === 'everest') {
      p.network = 'MultiPlan';
      p.carrier = 'AFSLIC';
      p.assoc = 'NCE';
    } else if (
      id === 'pinnacleprotect1' ||
      id === 'pinnacleprotect2' ||
      id === 'pinnacleprotect3' ||
      id === 'pinnacleprotect4'
    ) {
      p.network = 'PHCS';
      p.carrier = 'Everest';
      p.assoc = 'AWA';
    } else if (
      id === 'pinnaclecriticalcare1' ||
      id === 'pinnaclecriticalcare2' ||
      id === 'pinnaclecriticalcare3' ||
      id === 'pinnaclecriticalcare4'
    ) {
      p.network = 'PHCS';
      p.carrier = 'Everest';
      p.assoc = 'AWA';
    } else if (id === 'bwapara' || id === 'bwaamericare') {
      p.network = 'PHCS';
      p.carrier = 'American Public Life';
      p.assoc = 'BWA';
    } else if (
      id === 'smartchoice2500' ||
      id === 'smartchoice1500' ||
      id === 'smartchoice3000' ||
      id === 'smartchoice3500'
    ) {
      p.network = 'First Health EPO';
      p.carrier = 'Detego Health';
      p.assoc = 'Population Science Management';
    }
  }
}

var POLICY_DOCS = [
  {
    group: 'MEC',
    id: 'medf1',
    rawText: 'MedFirst 1 Physician Services1 (Utilizes the First Health Network)2 Details Primary Care Office Visit 3 visits / yr Specialist or Urgent Care Office Visit 1 visits / yr In-Patient Hospitalization Benefit $1,000 / Day Co-pay Maximum / Visit $25 $150 ly Co-pay Maximum / Visit n $50 $300 O $5,000 / Year Maximum 12/12 mo Pre-Ex3 Telemedicine Use Participating Pharmacies only ing Advocacy $0 Consult Fee Details No Maximum Discount Prescriptions Only Details Hospital Bill Reducer rain Plan Sponsor Plan Administrator T (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. t (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months n of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. e This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are Ag covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: ly � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive n guidelines supported by the Health Resources and Services Administration. Guidelines can be found in O https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip e Benefit s Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical Interval 1 per lifetime 1 per plan year U Alcohol Misuse: Unhealthy Alcohol Use g Screening and Counseling 1 per plan year inin Aspirin: Preventive Medication As prescribed ra Bacteriuria Screening 1 per plan year nt T BRCA Risk Assessment and Genetic Age Counseling/Testing 1 per plan year Requirements By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for Breast Cancer Preventive Medications As prescribed women who are at increased risk for breast cancer and at low risk for adverse medica- tion effects. Breast Cancer Screening 1 time every 2 plan years Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children g Up to Age 5 1 per plan year ainin Depression Screening 1 per plan year nt Tr Diabetes Screening Age Fall Prevention: Older Adults 1 per plan year 1 per plan year Folic Acid Supplementation As prescribed Gestational Diabetes Mellitus Screening 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. ly Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or n every 5 years with hrHPV testing in combi- nation with cytology. Sexually active women age 24 and younger O and in older women who are at increased risk infection. Starting in adults at age 50 years and con- e tinuing until age 75 years. s Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and Ucounseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up Screening for depression in the general adult population, including pregnant and postpartum women. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate followup. Pregnant and postpartum persons at increased risk of perinatal depression should be refer to counseling interventions. Screening for abnormal blood glucose as part of cardiovascular risk assessment in adults aged 40 to 70 years who are overweight or obese. Clinicians should offer or refer patients with abnormal blood glucose to intensive behavioral counseling interventions to promote a healthful diet and physical activity. Exercise interventions for community-dwelling adults age 65 years and older who are at increased risk for falls. Daily supplement containing 0.4 to 0.8 mg (400 to 800g) of folic acid for all women planning or capable of pregnancy. Asymptomatic pregnant women after 24 weeks of gestation. Page 2 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Gonorrhea Prophylactic Medication Gonorrhea Screening As prescribed 1 per plan year Healthy Diet and Physical Activity Counseling to Prevent Cardiovascular Disease 1 per plan year Hemoglobinopathies Screening 1 per plan year Hepatitis B Screening 1 ',
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
    rawText: 'MedFirst 2 Physician Services1 (Utilizes the First Health Network)2 Details Co-pay Maximum/ Visit Primary Care Office Visit Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit 4 visits / yr 2 visits / yr $1,000 / Day $25 $150 ly Co-pay Maximum / Visit $50 $300 On $10,000 / Year Maximum 12/12 mo Pre-Ex3 Telemedicine Participating Pharmacies only $0 Consult Fee Details eNo Maximum Us Details Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to a monthly maximum) g Pharmacy Retail � up to a 30 day supply (Acute & Preventive Generic) Member Pays Generic - $0 Copay in Pharmacy Retail up to a 30-day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay in Prescription Terms & Conditions a RX Plan includes discounts when the prescription if off of the formulary. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and r brand drugs. T Advocacy Details Hospital Bill Reducer ent Plan Sponsor Plan Administrator g (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. A(3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: ly � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive n guidelines supported by the Health Resources and Services Administration. Guidelines can be found in O https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip e Benefit s Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical Interval 1 per lifetime 1 per plan year U Alcohol Misuse: Unhealthy Alcohol Use g Screening and Counseling 1 per plan year inin Aspirin: Preventive Medication As prescribed ra Bacteriuria Screening 1 per plan year nt T BRCA Risk Assessment and Genetic Age Counseling/Testing 1 per plan year Requirements By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for Breast Cancer Preventive Medications As prescribed women who are at increased risk for breast cancer and at low risk for adverse medica- tion effects. Breast Cancer Screening 1 time every 2 plan years Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children g Up to Age 5 1 per plan year ainin Depression Screening 1 per plan year nt Tr Diabetes Screening Age Fall Prevention: Older Adults 1 per plan year 1 per plan year Folic Acid Supplementation As prescribed Gestational Diabetes Mellitus Screening 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. ly Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or n every 5 years with hrHPV testing in combi- nation with cytology. Sexually active women age 24 and younger O and in older women who are at increased risk infection. Starting in adults at age 50 years and con- e tinuing until age 75 years. s Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and Ucounseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up Screening for depression in the general adult population, including pregnant and postpartum women. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate followup. Pregnant and postpartum persons at increased risk of perinatal depression should be refer to counseling interventions. Screening for abnormal blood glucose as part of cardiovascular risk assessment in adults aged 40 to 70 years who are overweight or obese. Clinicians should offer or refer patients with abnormal blood glucose to intensive behavioral counseling interventions to promote a healthful diet and physical activity. Exercise interventi',
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
    rawText: 'MedFirst 3 Physician Services1 (Utilizes the First Health Network)2 Details Co-pay Maximum/ Visit Primary Care Office Visit 4 visits / yr Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit Telemedicine 4 visits / yr ly $1,000 / Day $25 $150 Co-pay Maximum / Visit $50 $300 $15,000 / Year Maximum 12/12 mo Pre-Ex3 Details On $0 Consult Fee No Maximum Participating Pharmacies only Details e Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to the monthly maximum) s Pharmacy Retail � up to a 30 day supply U (Acute & Preventive Generic) Member Pays Generic - $0 Copay Pharmacy Retail up to a 30 day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay ing Non-Prefered Generic Member Pays Retail 30-day $5 & $10 Copay Mail Order 90-day $5 & $20 Copay in Brand (Prior Authorization Required) Member Pays Retail 30-day $40, Mail Order 90-day $80 Prescription Terms & Conditions a Non-Preventive Maintenance Prescriptions - (All available generic and brand drugs. Specialty drugs are not covered). For all non-preventive generic & brand name drugs there is $150 benefit limit per person per month. RX Plan includes discounts when the monthly benefit limit r of $150 per person is exceded. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and brand drugs. T Advocacy Details t Hospital Bill Reducer en Plan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. g (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months Aof coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: ly � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive n guidelines supported by the Health Resources and Services Administration. Guidelines can be found in O https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip e Benefit s Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical Interval 1 per lifetime 1 per plan year U Alcohol Misuse: Unhealthy Alcohol Use g Screening and Counseling 1 per plan year inin Aspirin: Preventive Medication As prescribed ra Bacteriuria Screening 1 per plan year nt T BRCA Risk Assessment and Genetic Age Counseling/Testing 1 per plan year Requirements By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for Breast Cancer Preventive Medications As prescribed women who are at increased risk for breast cancer and at low risk for adverse medica- tion effects. Breast Cancer Screening 1 time every 2 plan years Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children g Up to Age 5 1 per plan year ainin Depression Screening 1 per plan year nt Tr Diabetes Screening Age Fall Prevention: Older Adults 1 per plan year 1 per plan year Folic Acid Supplementation As prescribed Gestational Diabetes Mellitus Screening 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. ly Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or n every 5 years with hrHPV testing in combi- nation with cytology. Sexually active women age 24 and younger O and in older women who are at increased risk infection. Starting in adults at age 50 years and con- e tinuing until age 75 years. s Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and Ucounseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up Screening for depression in the general adult population, including pregnant and postpartum women. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate followup. Pregnant and postpartum p',
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
    rawText: 'MedFirst 4 Physician Services1 (Utilizes the First Health Network)2 Details Co-pay Maximum/ Visit Wellness Exam 1 Visit / yr Primary Care Office Visit Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit In/Outpatient Surgery 4 visits / yr 4 visits / yr $1,000 / Day $1,000 / Year $25 $150 Co-pay Maximum/ Visit $50 $150 ly Co-pay Maximum / Visit $75 $300 n $10,000 / Year Maximum 12/12 mo Pre-Ex3 O $2,000 / Year Maximum 12/12 mo Pre-Ex3 Emergency Room (if admitted) Ambulance Benefit (if admitted) Telemedicine $1,000/Per Incident $500/Per Incident e Details Us $0 Consult Fee 12/12 mo Pre-Ex3 12/12 mo Pre-Ex3 No Maximum Participating Pharmacies only Details Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to the monthly maximum) g Pharmacy Retail � up to a 30 day supply (Acute & Preventive Generic) Member Pays Generic - $0 Copay in Pharmacy Retail up to a 30 day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay in Non-Prefered Generic Member Pays Retail 30-day $5 & $10 Copay Mail Order 90-day $5 & $20 Copay a Brand (Prior Authorization Required) Member Pays Retail 30-day $40, Mail Order 90-day $80 rPrescription Terms & Conditions Non-Preventive Maintenance Prescriptions - (All available generic and brand drugs. Specialty drugs are not covered). For all non-preventive generic & brand name drugs there is $150 benefit limit per person per month. RX Plan includes discounts when the monthly benefit limit T of $150 per person is exceded. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and brand drugs. t Advocacy Details n Hospital Bill Reducer ePlan Sponsor Plan Administrator g (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. A(2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: ly � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive n guidelines supported by the Health Resources and Services Administration. Guidelines can be found in O https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip e Benefit s Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical Interval 1 per lifetime 1 per plan year U Alcohol Misuse: Unhealthy Alcohol Use g Screening and Counseling 1 per plan year inin Aspirin: Preventive Medication As prescribed ra Bacteriuria Screening 1 per plan year nt T BRCA Risk Assessment and Genetic Age Counseling/Testing 1 per plan year Requirements By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for Breast Cancer Preventive Medications As prescribed women who are at increased risk for breast cancer and at low risk for adverse medica- tion effects. Breast Cancer Screening 1 time every 2 plan years Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children g Up to Age 5 1 per plan year ainin Depression Screening 1 per plan year nt Tr Diabetes Screening Age Fall Prevention: Older Adults 1 per plan year 1 per plan year Folic Acid Supplementation As prescribed Gestational Diabetes Mellitus Screening 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. ly Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or n every 5 years with hrHPV testing in combi- nation with cytology. Sexually active women age 24 and younger O and in older women who are at increased risk infection. Starting in adults at age 50 years and con- e tinuing until age 75 years. s Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and Ucounseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-u',
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
    rawText: 'MedFirst 5 Physician Services1 (Utilizes the First Health Network)2 Details Co-pay Maximum/ Visit Wellness Exam 1 Visit / yr Primary Care Office Visit Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit In/Outpatient Surgery Emergency Room (if admitted) Ambulance Benefit (if admitted) Telemedicine 5 visits / yr 5 visits / yr $1,500 / Day $1,500 / Day $25 $150 Co-pay Maximum/ Visit $50 $150 ly Co-pay Maximum / Visit $75 $300 n $15,000 / Year Maximum 12/12 mo Pre-Ex3 O $4,500 / Year Maximum 12/12 mo Pre-Ex3 $1,000/Per Incident $500/Per Incident e Details Us $0 Consult Fee 12/12 mo Pre-Ex3 12/12 mo Pre-Ex3 No Maximum Participating Pharmacies only Details Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to the monthly maximum) g Pharmacy Retail � up to a 30 day supply (Acute & Preventive Generic) Member Pays Generic - $0 Copay in Pharmacy Retail up to a 30 day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay in Non-Prefered Generic Member Pays Retail 30-day $5 & $10 Copay Mail Order 90-day $5 & $20 Copay a Brand (Prior Authorization Required) Member Pays Retail 30-day $40, Mail Order 90-day $80 rPrescription Terms & Conditions Non-Preventive Maintenance Prescriptions - (All available generic and brand drugs. Specialty drugs are not covered). For all non-preventive T generic & brand name drugs there is $150 benefit limit per person per month. RX Plan includes discounts when the monthly benefit limit of $150 per person is exceded. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and brand drugs. t Advocacy Details n Hospital Bill Reducer gePlan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. A(2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: ly � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive n guidelines supported by the Health Resources and Services Administration. Guidelines can be found in O https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip e Benefit s Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical Interval 1 per lifetime 1 per plan year U Alcohol Misuse: Unhealthy Alcohol Use g Screening and Counseling 1 per plan year inin Aspirin: Preventive Medication As prescribed ra Bacteriuria Screening 1 per plan year nt T BRCA Risk Assessment and Genetic Age Counseling/Testing 1 per plan year Requirements By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for Breast Cancer Preventive Medications As prescribed women who are at increased risk for breast cancer and at low risk for adverse medica- tion effects. Breast Cancer Screening 1 time every 2 plan years Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children g Up to Age 5 1 per plan year ainin Depression Screening 1 per plan year nt Tr Diabetes Screening Age Fall Prevention: Older Adults 1 per plan year 1 per plan year Folic Acid Supplementation As prescribed Gestational Diabetes Mellitus Screening 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. ly Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or n every 5 years with hrHPV testing in combi- nation with cytology. Sexually active women age 24 and younger O and in older women who are at increased risk infection. Starting in adults at age 50 years and con- e tinuing until age 75 years. s Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and Ucounseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up ',
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
    rawText: 'True Health 1 Physician Services1 (Utilizes the First Health Network)2 Primary Care Office Visit 3 visits / yr Specialist or Urgent Care Office Visit 1 visits / yr In-Patient Hospitalization Benefit Telemedicine $1,000 / Day Details Co-pay Maximum / Visit $25 $150 Co-pay Maximum / Visit $50 $300 $5,000 / Year Maximum 12/12 mo Pre-Ex3 Details $0 Consult Fee No Maximum Participating Pharmacies only Advocacy Discount Prescriptions Only Details Hospital Bill Reducer Plan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive guidelines supported by the Health Resources and Services Administration. Guidelines can be found in https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip Benefit Interval Requirements Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical 1 per lifetime 1 per plan year Alcohol Misuse: Unhealthy Alcohol Use Screening and Counseling 1 per plan year Aspirin: Preventive Medication As prescribed Bacteriuria Screening 1 per plan year BRCA Risk Assessment and Genetic Counseling/Testing 1 per plan year Breast Cancer Preventive Medications As prescribed Breast Cancer Screening 1 time every 2 plan years By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for women who are at increased risk for breast cancer and at low risk for adverse medication effects. Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children Up to Age 5 1 per plan year Depression Screening 1 per plan year Diabetes Screening Fall Prevention: Older Adults Folic Acid Supplementation 1 per plan year 1 per plan year As prescribed Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or every 5 years with hrHPV testing in combination with cytology. Sexually active women age 24 and younger and in older women who are at increased risk infection. Starting in adults at age 50 years and continuing until age 75 years. Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and counseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up Screening for depression in the general adult population, including pregnant and postpartum women. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow- up. Pregnant and postpartum persons at increased risk of perinatal depression should be refer to counseling interventions. Screening for abnormal blood glucose as part of cardiovascular risk assessment in adults aged 40 to 70 years who are overweight or obese. Clinicians should offer or refer patients with abnormal blood glucose to intensive behavioral counseling interventions to promote a healthful diet and physical activity. Exercise interventions for community-dwelling adults age 65 years and older who are at increased risk for falls. Daily supplement containing 0.4 to 0.8 mg (400 to 800g) of folic acid for all women planning or capable of pregnancy. Gestational Diabetes Mellitus Screening 1 per plan year Asymptomatic pregnant women after 24 weeks of gestation. Page 2 MEC/Preventive Health Services Summary of Benefits Benefit Gonorrhea Prophylactic Medication Gonorrhea Screening Healthy Diet and Physical Activity Counseling to Prevent Cardiovascular Disease Hemoglobinopathies Screening Hepatitis B Screening Hepatitis C Virus (HCV) Infection Screening High Blood Pressure Screening HIV Preexposure Prophylaxis for the Prevention of HIV Infection HIV Screening Hypothyroidism Screening Intimate Partner Violence Screening Lung Cancer Screening Obesity screening and Counseling Osteoporosis Screening Phenylketonuria Screening Preventive H',
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
    rawText: 'GHDP-1 Physician Services1 (Utilizes the First Health Network)2 Primary Care Office Visit 3 visits / yr Specialist or Urgent Care Office Visit 1 visits / yr In-Patient Hospitalization Benefit Telemedicine $1,000 / Day Details Co-pay Maximum / Visit $25 $150 Co-pay Maximum / Visit $50 $300 $5,000 / Year Maximum 12/12 mo Pre-Ex3 Details $0 Consult Fee No Maximum Participating Pharmacies only Some people need care. Everyone can use support. Advocacy Discount Prescriptions Only Details Hearing from and connecting with someone who can relate to what we\'re facing is a fundamental human need. When we know we\'re not alone in what we\'re facing, everyone feels better. Kindly Human is designed to provide easy access to support 24/7 for everyday challenges that we all face. Details Hospital Bill Reducer Plan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive guidelines supported by the Health Resources and Services Administration. Guidelines can be found in https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip Benefit Interval Requirements Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical 1 per lifetime 1 per plan year Alcohol Misuse: Unhealthy Alcohol Use Screening and Counseling 1 per plan year Aspirin: Preventive Medication As prescribed Bacteriuria Screening 1 per plan year BRCA Risk Assessment and Genetic Counseling/Testing 1 per plan year Breast Cancer Preventive Medications As prescribed Breast Cancer Screening 1 time every 2 plan years By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for women who are at increased risk for breast cancer and at low risk for adverse medication effects. Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children Up to Age 5 1 per plan year Depression Screening 1 per plan year Diabetes Screening 1 per plan year Fall Prevention: Older Adults Folic Acid Supplementation Gestational Diabetes Mellitus Screening 1 per plan year As prescribed 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or every 5 years with hrHPV testing in combination with cytology. Sexually active women age 24 and younger and in older women who are at increased risk infection. Starting in adults at age 50 years and continuing until age 75 years. Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and counseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up Screening for depression in the general adult population, including pregnant and postpartum women. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate followup. Pregnant and postpartum persons at increased risk of perinatal depression should be refer to counseling interventions. Screening for abnormal blood glucose as part of cardiovascular risk assessment in adults aged 40 to 70 years who are overweight or obese. Clinicians should offer or refer patients with abnormal blood glucose to intensive behavioral counseling interventions to promote a healthful diet and physical activity. Exercise interventions for community-dwelling adults age 65 years and older who are at increased risk for falls. Daily supplement containing 0.4 to 0.8 mg (400 to 800g) of folic acid for all women planning or capable of pregnancy. Asymptomatic pregnant women after 24 weeks of gestation. Page 2 MEC/Preventive Health Services Summary of Benefits Benefit Gonorrhea Prophylactic Medication Gonorrhea Screening Heal',
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
    rawText: 'GHDP-2 Physician Services1 (Utilizes the First Health Network)2 Primary Care Office Visit Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit Telemedicine Details 4 visits / yr Co-pay $25 Maximum/ Visit $150 2 visits / yr Co-pay $50 Maximum / Visit $300 $1,000 / Day $10,000 / Year Maximum 12/12 mo Pre-Ex3 Details $0 Consult Fee No Maximum Participating Pharmacies only Details Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to a monthly maximum) Pharmacy Retail � up to a 30 day supply (Acute & Preventive Generic) Member Pays Generic - $0 Copay Pharmacy Retail up to a 30-day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay Prescription Terms & Conditions RX Plan includes discounts when the prescription is off of the formulary. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and brand drugs. Some people need care. Everyone can use support. Details Hearing from and connecting with someone who can relate to what we\'re facing is a fundamental human need. When we know we\'re not alone in what we\'re facing, everyone feels better. Kindly Human is designed to provide easy access to support 24/7 for everyday challenges that we all face. Advocacy Details Hospital Bill Reducer Plan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive guidelines supported by the Health Resources and Services Administration. Guidelines can be found in https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip Benefit Interval Requirements Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical 1 per lifetime 1 per plan year Alcohol Misuse: Unhealthy Alcohol Use Screening and Counseling 1 per plan year Aspirin: Preventive Medication As prescribed Bacteriuria Screening 1 per plan year BRCA Risk Assessment and Genetic Counseling/Testing 1 per plan year Breast Cancer Preventive Medications As prescribed Breast Cancer Screening 1 time every 2 plan years By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for women who are at increased risk for breast cancer and at low risk for adverse medication effects. Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children Up to Age 5 1 per plan year Depression Screening 1 per plan year Diabetes Screening 1 per plan year Fall Prevention: Older Adults Folic Acid Supplementation Gestational Diabetes Mellitus Screening 1 per plan year As prescribed 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or every 5 years with hrHPV testing in combination with cytology. Sexually active women age 24 and younger and in older women who are at increased risk infection. Starting in adults at age 50 years and continuing until age 75 years. Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and counseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up Screening for depression in the general adult population, including pregnant and postpartum women. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate followup. Pregnant and postpartum persons at increased risk of perinatal depression should be refer to counseling interventions. Screening for abnormal blood glucose as part of cardiovascular risk assessment in adult',
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
    rawText: 'GHDP-3 Physician Services1 (Utilizes the First Health Network)2 Primary Care Office Visit Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit Telemedicine Details 4 visits / yr 4 visits / yr $1,000 / Day Co-pay Maximum/ Visit $25 $150 Co-pay Maximum / Visit $50 $300 $15,000 / Year Maximum 12/12 mo Pre-Ex3 Details $0 Consult Fee No Maximum Participating Pharmacies only Details Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to the monthly maximum) Pharmacy Retail � up to a 30 day supply (Acute & Preventive Generic) Member Pays Generic - $0 Copay Pharmacy Retail up to a 30 day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay Non-Prefered Generic Member Pays Retail 30-day $5 & $10 Copay Mail Order 90-day $5 & $20 Copay Brand (Prior Authorization Required) Member Pays Retail 30-day $40, Mail Order 90-day $80 Prescription Terms & Conditions Non-Preventive Maintenance Prescriptions - (All available generic and brand drugs. Specialty drugs are not covered). For all non-preventive generic & brand name drugs there is $150 benefit limit per person per month. RX Plan includes discounts when the monthly benefit limit of $150 per person is exceded. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and brand drugs. Some people need care. Everyone can use support. Details Hearing from and connecting with someone who can relate to what we\'re facing is a fundamental human need. When we know we\'re not alone in what we\'re facing, everyone feels better. Kindly Human is designed to provide easy access to support 24/7 for everyday challenges that we all face. Advocacy Details Hospital Bill Reducer Plan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive guidelines supported by the Health Resources and Services Administration. Guidelines can be found in https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip Benefit Interval Requirements Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical 1 per lifetime 1 per plan year Alcohol Misuse: Unhealthy Alcohol Use Screening and Counseling 1 per plan year Aspirin: Preventive Medication As prescribed Bacteriuria Screening 1 per plan year BRCA Risk Assessment and Genetic Counseling/Testing 1 per plan year Breast Cancer Preventive Medications As prescribed Breast Cancer Screening 1 time every 2 plan years By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for women who are at increased risk for breast cancer and at low risk for adverse medication effects. Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children Up to Age 5 1 per plan year Depression Screening 1 per plan year Diabetes Screening 1 per plan year Fall Prevention: Older Adults Folic Acid Supplementation Gestational Diabetes Mellitus Screening 1 per plan year As prescribed 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or every 5 years with hrHPV testing in combination with cytology. Sexually active women age 24 and younger and in older women who are at increased risk infection. Starting in adults at age 50 years and continuing until age 75 years. Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and counseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fluoride deficient. Screening for major depressive disorder (MDD) in adolescents aged 12 to 18 years. Screening should be implemented with adequate systems in place to ensure accurate diagnosis, effective treatment, and appropriate follow-up Screening for depression i',
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
    rawText: 'GHDP-4 Physician Services1 (Utilizes the First Health Network)2 Wellness Exam Primary Care Office Visit Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit In/Outpatient Surgery Emergency Room (if admitted) Ambulance Benefit (if admitted) Telemedicine Details 1 Visit / yr Co-pay $25 Maximum/ Visit $150 4 visits / yr Co-pay $50 Maximum/ Visit $150 4 visits / yr Co-pay $75 Maximum / Visit $300 $1,000 / Day $10,000 / Year Maximum 12/12 mo Pre-Ex3 $1,000 / Year $2,000 / Year Maximum 12/12 mo Pre-Ex3 $1,000/Per Incident 12/12 mo Pre-Ex3 $500/Per Incident 12/12 mo Pre-Ex3 Details $0 Consult Fee No Maximum Participating Pharmacies only Details Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to the monthly maximum) Pharmacy Retail � up to a 30 day supply (Acute & Preventive Generic) Member Pays Generic - $0 Copay Pharmacy Retail up to a 30 day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay Non-Prefered Generic Member Pays Retail 30-day $5 & $10 Copay Mail Order 90-day $5 & $20 Copay Brand (Prior Authorization Required) Member Pays Retail 30-day $40, Mail Order 90-day $80 Prescription Terms & Conditions Non-Preventive Maintenance Prescriptions - (All available generic and brand drugs. Specialty drugs are not covered). For all non-preventive generic & brand name drugs there is $150 benefit limit per person per month. RX Plan includes discounts when the monthly benefit limit of $150 per person is exceded. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and brand drugs. Some people need care. Everyone can use support. Details Hearing from and connecting with someone who can relate to what we\'re facing is a fundamental human need. When we know we\'re not alone in what we\'re facing, everyone feels better. Kindly Human is designed to provide easy access to support 24/7 for everyday challenges that we all face. Advocacy Details Hospital Bill Reducer Plan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive guidelines supported by the Health Resources and Services Administration. Guidelines can be found in https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip Benefit Interval Requirements Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical 1 per lifetime 1 per plan year Alcohol Misuse: Unhealthy Alcohol Use Screening and Counseling 1 per plan year Aspirin: Preventive Medication As prescribed Bacteriuria Screening 1 per plan year BRCA Risk Assessment and Genetic Counseling/Testing 1 per plan year Breast Cancer Preventive Medications As prescribed Breast Cancer Screening 1 time every 2 plan years By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for women who are at increased risk for breast cancer and at low risk for adverse medication effects. Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children Up to Age 5 1 per plan year Depression Screening 1 per plan year Diabetes Screening 1 per plan year Fall Prevention: Older Adults Folic Acid Supplementation Gestational Diabetes Mellitus Screening 1 per plan year As prescribed 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or every 5 years with hrHPV testing in combination with cytology. Sexually active women age 24 and younger and in older women who are at increased risk infection. Starting in adults at age 50 years and continuing until age 75 years. Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and counseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is fl',
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
    rawText: 'GHDP-5 Physician Services1 (Utilizes the First Health Network)2 Wellness Exam Primary Care Office Visit Specialist or Urgent Care Office Visit In-Patient Hospitalization Benefit In/Outpatient Surgery Emergency Room (if admitted) Ambulance Benefit (if admitted) Telemedicine Details 1 Visit / yr 5 visits / yr 5 visits / yr Co-pay $25 Co-pay $50 Co-pay $75 Maximum/ Visit $150 Maximum/ Visit $150 Maximum / Visit $300 $1,500 / Day $1,500 / Day $15,000 / Year Maximum $4,500 / Year Maximum $1,000/Per Incident $500/Per Incident Details 12/12 mo Pre-Ex3 12/12 mo Pre-Ex3 12/12 mo Pre-Ex3 12/12 mo Pre-Ex3 $0 Consult Fee No Maximum Participating Pharmacies only Details Preventive & Acute Prescriptions - (Subject to Formulary - Not subject to the monthly maximum) Pharmacy Retail � up to a 30 day supply (Acute & Preventive Generic) Member Pays Generic - $0 Copay Pharmacy Retail up to a 30 day supply or Mailorder up to a 90-day supply. (200 Generic Maintenance Drugs) Member Pays Preferred Generic - $5 Copay Non-Prefered Generic Member Pays Retail 30-day $5 & $10 Copay Mail Order 90-day $5 & $20 Copay Brand (Prior Authorization Required) Member Pays Retail 30-day $40, Mail Order 90-day $80 Prescription Terms & Conditions Non-Preventive Maintenance Prescriptions - (All available generic and brand drugs. Specialty drugs are not covered). For all non-preventive generic & brand name drugs there is $150 benefit limit per person per month. RX Plan includes discounts when the monthly benefit limit of $150 per person is exceded. Specialty drugs are not covered but the RX provider offers a Prescription Assistance Program - Member must qualify for PAP according to income guidelines. Mail order is optional for generic and brand drugs. Some people need care. Everyone can use support. Details Hearing from and connecting with someone who can relate to what we\'re facing is a fundamental human need. When we know we\'re not alone in what we\'re facing, everyone feels better. Kindly Human is designed to provide easy access to support 24/7 for everyday challenges that we all face. Advocacy Details Hospital Bill Reducer Plan Sponsor Plan Administrator (1) All sickness benefits are subject to a 30-day waiting period before benefits are payable under the plan. (2) Outpatient physician services and wellness benefits are subject to in-network providers only. Inpatient Hospital indemnity benefits are not. (3) Hospitalization benefits are not payable for a Pre-Existing Condition as defined in Section 2.56 Definitions for the first Twelve [12] Months of coverage This Plan does not cover services unless listed in the Schedule of Benefits, so please review that list carefully. This group health plan is limited to covering preventive and wellness services as required by the Patient Protection and Affordable Care Act as well as other benefits noted in the Summary Plan Description, which describes the benefits covered by the Plan and how these benefits are covered, including information on copays, deductibles, and limitations. MEC/Preventive Health Services Summary of Benefits Preventive Health Services - Covered Benefits1 Benefits are automatically subject to 29 CFR � 2590.715 -2713(a). Amendments to this section through legislative act or regulation are automatically incorporated into this document by reference. Preventive Services covered in this section are explained in more detail through the following official resources: � Medical services with a rating of "A" or "B" from the current recommendations of the United States Preventive Services Task Force. See https://www.uspreventiveservicestaskforce.org � Preventive care and screenings for infants, children, and adolescents provided for in the comprehensive guidelines supported by the Health Resources and Services Administration. Guidelines can be found in https://www.hrsa.gov � Immunizations recommended by the Advisory Committee on Immunization Practices of the Centers for Disease Control and Prevention for certain individuals only. See https://www.cdc.gov/vaccines/acip Benefit Interval Requirements Abdominal Aortic Aneurysm Screening Adult Annual Standard Physical 1 per lifetime 1 per plan year Alcohol Misuse: Unhealthy Alcohol Use Screening and Counseling 1 per plan year Aspirin: Preventive Medication As prescribed Bacteriuria Screening 1 per plan year BRCA Risk Assessment and Genetic Counseling/Testing 1 per plan year Breast Cancer Preventive Medications As prescribed Breast Cancer Screening 1 time every 2 plan years By ultrasonography in men ages 65-75 years who have ever smoked. Adults, one (1) physical preventive exam per plan year. Screenings for unhealthy alcohol use in adults 18 years or older, including pregnant women, and providing persons engaged in risky or hazardous drinking with brief behavioral counseling interventions to reduce unhealthy alcohol use. Adults ages 50 to 59 with high risk of cardiovascular diseases and for the primary prevention of cardiovascular disease and colorectal cancer. Low-dose aspirin (81 mg/d) as preventive medication for women after 12 weeks of gestation who are at high risk for preeclampsia. Screening for asymptomatic bacteriuria with urine culture in pregnant women at 12 to 16 weeks\' gestation or at the first prenatal visit, if later. Screening to women who have family members with breast, ovarian, tubal, or peritoneal cancer with one of several screening tools designed to identify a family history that may be associated with an increased risk for potentially harmful mutations in breast cancer susceptibility genes (BRCA 1 or BRCA2 ). Women with positive screening results should receive genetic counseling and, if indicated after counseling, BRCA testing. Risk-reducing medications, such as tamoxifen, raloxifene, or aromatase inhibitors for women who are at increased risk for breast cancer and at low risk for adverse medication effects. Screening mammography for women age 50 years and older. Coverage limited to 2D mammograms only. 1None of the Preventive Health Services are covered if they are provided at a hospital. Page 1 MEC/Preventive Health Services Summary of Benefits Preventive Health Services Benefit Interval Requirements Breastfeeding Support, Supplies and Counseling In Conjunction with each birth Cervical Cancer Screening: with Cytology (Pap Smear) 1 time every 3 plan years Cervical Cancer Screening: with Combination of Cytology and Human Papilloma Virus (HPV) testing 1 time every 5 plan years Chlamydia Screening 1 per plan year Colorectal Cancer Screening benefit subject to at home test kit for initial screening. If positive, the plan will provide benefits for a colonoscapy. 1 time every 5 plan years Contraceptive Methods and Counseling As prescribed Dental Caries Prevention: Infants and Children Up to Age 5 1 per plan year Depression Screening 1 per plan year Diabetes Screening 1 per plan year Fall Prevention: Older Adults Folic Acid Supplementation Gestational Diabetes Mellitus Screening 1 per plan year As prescribed 1 per plan year Interventions during pregnancy and after birth to support breastfeeding. Costs for renting breastfeeding equipment will be covered in conjunction with each birth. Women age 21 to 65 years with cervical cytology alone. Women age 30 to 65 years with high-risk papillomavirus (hrHPV) testing alone, or every 5 years with hrHPV testing in combination with cytology. Sexually active women age 24 and younger and in older women who are at increased risk infection. Starting in adults at age 50 years and continuing until age 75 years. Food and Drug Administration (FDA) approved contraceptive methods, sterilization procedures, and patient education and counseling for all women with reproductive capacity, not including abortifacient drugs. Application of fluoride varnish to the primary teeth of all infants and children starting at the age of primary tooth eruption and prescription of oral fluoride supplementation starting at age 6 months for children whose water supply is flu',
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
    rawText: 'HEALTHCARE DATA ANALYTICS PLAN HIGHLIGHTS LIMITED HEALTH & WELLNESS PLANS CONTACT US (866) 360-4646 memberservices@detegohealth.com 600-1020-5 Limited Health & Wellness Plans Looking for low-cost coverage? Our Limited Health & Wellness Plans are an affordable option instead of regular health insurance. They offer important coverage to keep you healthy and help prevent illness. Stay covered under the ACA while taking care of your health. 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Partners Network Access We offer one of the largest directly contracted national PPO networks, the First Health Network with more than 5,700 hospitals, 52,000 ancillary facilities, and 993,000 professional providers. Telemedicine Connect with Board-Certified Physicians, anytime, anywhere in the United States who can diagnose and treat virtually. 24/7 access to primary care, urgent care, and mental health care! MyLiveDoc: (855) 226-6567 Pharmacy Solution: Urgent Care (immediate need) and Home Delivery (chronic need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MyLiveDoc: (855) 226-6567 Prescription Access Assistance ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health� and provides prescription access assistance to our members. Our Pharmaceutical Access Coordinators specialize in researching ways to help our members get the brand-name medications they need and save them money. ScriptAide: (866) 837-1515 � � Discover A Better Plan Member Advocates & Balance Bill Services NaviClaim is the exclusive Member Advocate for Detego Health�. NaviClaim reviews your bill for accuracy and re-prices it to ensure fair reimbursement. Once re-priced, NaviClaim sends the claim to your third-party administrator (TPA) for processing. NaviClaim: (866) 837-1436 Third-Party Administrator (TPA) As a third-party administrator, Detego Health LLC� specializes in the sourcing and management of health benefits plans. We act as an advocate, working to limit the costs of healthcare without sacrificing quality or access to care. Detego Health: (866) 815-6001 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Services Concierge Services Customer Care Detego Health� has Care Guides available at (866) 815-6001, Monday - Friday from 7:00AM - 5:00PM (CST) to support your every need. Member Portal MyLiveDoc Portal When you are logged on, you can access your Membership Savings Card, Formulary list, Prescription history, and more! 600-1020-5 �2024 Population Science Management. All Rights Reserved. 600-1020-5 �2024 Population Science Management. All Rights Reserved. PLAN OVERVIEW 2025 - 2026 � LIMITED HEALTH & WELLNESS PLAN: TDK 1 � LIMITED HEALTH & WELLNESS PLAN: TDK 2 � LIMITED HEALTH & WELLNESS PLAN: TDK 3 � LIMITED HEALTH & WELLNESS PLAN: TDK 4 � LIMITED HEALTH & WELLNESS PLAN: TDK 5 Group Name: Healthcare Data Analytics Effective Date: April 1, 2025 600-1022-5 NETWORK Welcome to First Health! We are grateful for the opportunity to serve you. Our CORE VALUES Put People First Rise To The Challenge Join Forces Create Simplicity Inspire Trust Champion Safety And Quality NATIONAL PPO NETWORK with more than... 5,700 HOSPITALS 52,000 ANCILLARY FACILITIES 993,000 PROFESSIONAL PROVIDERS In order to find an in-network doctor, urgent care center, hospital or other provider, use our online provider search tool (866) 360-4646 600-1022-5 memberservices@detegohealth.com Our Care Guides are available from 7AM - 5PM CST to support your every need. �2025 Population Science Management. All Rights Reserved. TELEMEDICINE 24/7 ACCESS PRIMARY CARE URGENT CARE MENTAL HEALTH CARE Connect with BOARD-CERTIFIED PHYSICIANS, ANYTIME, ANYWHERE IN THE UNITED STATES. NO CLAIMS OR COPAY EVERY STATE CARE COORDINATION EXCLUSIVE DOCTORS Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. WE TREAT 50+ ROUTINE MEDICAL CONDITIONS! � ACNE � ALLERGIES � COLD/FLU � CONSTIPATION � COUGH � DIARRHEA � EAR PROBLEMS � FEVER � HEADACHE � INSECT BITES � NAUSEA / VOMITING � PINK EYE � RASH � RESPIRATORY PROBLEMS � URINARY PROBLEMS � AND MORE Why Therapy? � ALCOHOL / DRUGS / TOBACCO RELIANCE � CHILD OR ELDER CARE MATTERS � CO-DEPENDENCY � EATING DISORDERS � PHYSICAL / SEXUAL / EMOTIONAL ABUSE � RELATIONSHIP CONCERNS � STRESS AND ANXIETY � WORK OR PERSONAL CONFLICTS PRIMARY CARE Same Day Appointments Access a Virtual Primary Care appointment the same day of requesting it! Or, schedule when it\'s best for you. Same Provider Each Visit See the same provider each visit so that they can best understand your health needs and provide personalized care. Annual Wellness Check An annual wellness check can help you get on a better health trajectory, get a personalized care plan, and learn about your overall health! URGENT CARE Instant Access To Care Virtual Urgent Care visits can be accessed as short as in 20 minutes! You can also schedule appointments when it best works for you. In House Providers See the same provider each visit so that they can best understand your health needs and provide personalized care. MENTAL HEALTH THERAPY Annual Visits MyLiveDoc includes four mental health visits annually for each family member. Available to adults and adolescents 12 years and older. Convenient Scheduling Easy access to a licensed, Master\'s level counselor within 1-3 days. Should you need in-person care, our team is able to provide referrals when needed. Same Therapist Each Visit See the same therapist each visit to best understand your personal needs. Our counselors are trained in clinical assessments and care coordination. Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PHARMACY SOLUTION With our FREE drug program, you\'ll have access to over 1,000 quality maintenance medications that you can have delivered right to your doorstep for FREE with membership. You\'ll also have access to urgent care medications that you can pick up at your local retail pharmacy for FREE. Our medication list contains over 95% of the top prescribed generic medications in the US for conditions such as: � High Cholesterol � Diabetes � Mental Health � Allergy � Thyroid � Asthma � Men\'s Health � Women\'s Health � High Blood Pressure � Urgent Care � And More... HOME DELIVERY (Chronic Need) OR URGENT CARE (Immediate Need) Home Delivery (chronic need) or Urgent Care (immediate need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MEMBERSHIP SAVINGS CARD Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PRESCRIPTION ACCESS ASSISTANCE ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health�. ScriptAide provides pharmaceutical advocacy services, reducing the financial burden. Our direct-to-member support services are staffed by Pharmaceutical Access Coordinators specialized in helping members acquire prescribed medications using their PAP and SPIP programs. Every Patient HAS ACCESS TO BENEFIT CONSULTING AND COMPREHENSIVE CLINICAL SUPPORT. CALL US AT 866.837-1515 Patient Assistance Program (PAP) PAP is designed for members in the United States who require non-covered medications and demonstrate qualifying financial need. Those who qualify will receive their medications for free, with no co-pays or shipping costs. A valid prescription is required to participate. Self-Pay Importation Program (SPIP) SPIP is available to members in the United States who require non-covered medications. Through this program, individuals can import their prescribed medications at their own cost, typically saving 40-45%',
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
          'Urgent Care Facility: $50 copay — 1 visit/yr — $300 max/visit'
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
          'Ambulance: NOT covered',
          'Outpatient Surgery: NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Rx: Available via MyLiveDoc',
          'Brand/specialty drugs: NOT covered'
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
    rawText: 'HEALTHCARE DATA ANALYTICS PLAN HIGHLIGHTS LIMITED HEALTH & WELLNESS PLANS CONTACT US (866) 360-4646 memberservices@detegohealth.com 600-1020-5 Limited Health & Wellness Plans Looking for low-cost coverage? Our Limited Health & Wellness Plans are an affordable option instead of regular health insurance. They offer important coverage to keep you healthy and help prevent illness. Stay covered under the ACA while taking care of your health. 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Partners Network Access We offer one of the largest directly contracted national PPO networks, the First Health Network with more than 5,700 hospitals, 52,000 ancillary facilities, and 993,000 professional providers. Telemedicine Connect with Board-Certified Physicians, anytime, anywhere in the United States who can diagnose and treat virtually. 24/7 access to primary care, urgent care, and mental health care! MyLiveDoc: (855) 226-6567 Pharmacy Solution: Urgent Care (immediate need) and Home Delivery (chronic need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MyLiveDoc: (855) 226-6567 Prescription Access Assistance ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health� and provides prescription access assistance to our members. Our Pharmaceutical Access Coordinators specialize in researching ways to help our members get the brand-name medications they need and save them money. ScriptAide: (866) 837-1515 � � Discover A Better Plan Member Advocates & Balance Bill Services NaviClaim is the exclusive Member Advocate for Detego Health�. NaviClaim reviews your bill for accuracy and re-prices it to ensure fair reimbursement. Once re-priced, NaviClaim sends the claim to your third-party administrator (TPA) for processing. NaviClaim: (866) 837-1436 Third-Party Administrator (TPA) As a third-party administrator, Detego Health LLC� specializes in the sourcing and management of health benefits plans. We act as an advocate, working to limit the costs of healthcare without sacrificing quality or access to care. Detego Health: (866) 815-6001 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Services Concierge Services Customer Care Detego Health� has Care Guides available at (866) 815-6001, Monday - Friday from 7:00AM - 5:00PM (CST) to support your every need. Member Portal MyLiveDoc Portal When you are logged on, you can access your Membership Savings Card, Formulary list, Prescription history, and more! 600-1020-5 �2024 Population Science Management. All Rights Reserved. 600-1020-5 �2024 Population Science Management. All Rights Reserved. PLAN OVERVIEW 2025 - 2026 � LIMITED HEALTH & WELLNESS PLAN: TDK 1 � LIMITED HEALTH & WELLNESS PLAN: TDK 2 � LIMITED HEALTH & WELLNESS PLAN: TDK 3 � LIMITED HEALTH & WELLNESS PLAN: TDK 4 � LIMITED HEALTH & WELLNESS PLAN: TDK 5 Group Name: Healthcare Data Analytics Effective Date: April 1, 2025 600-1022-5 NETWORK Welcome to First Health! We are grateful for the opportunity to serve you. Our CORE VALUES Put People First Rise To The Challenge Join Forces Create Simplicity Inspire Trust Champion Safety And Quality NATIONAL PPO NETWORK with more than... 5,700 HOSPITALS 52,000 ANCILLARY FACILITIES 993,000 PROFESSIONAL PROVIDERS In order to find an in-network doctor, urgent care center, hospital or other provider, use our online provider search tool (866) 360-4646 600-1022-5 memberservices@detegohealth.com Our Care Guides are available from 7AM - 5PM CST to support your every need. �2025 Population Science Management. All Rights Reserved. TELEMEDICINE 24/7 ACCESS PRIMARY CARE URGENT CARE MENTAL HEALTH CARE Connect with BOARD-CERTIFIED PHYSICIANS, ANYTIME, ANYWHERE IN THE UNITED STATES. NO CLAIMS OR COPAY EVERY STATE CARE COORDINATION EXCLUSIVE DOCTORS Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. WE TREAT 50+ ROUTINE MEDICAL CONDITIONS! � ACNE � ALLERGIES � COLD/FLU � CONSTIPATION � COUGH � DIARRHEA � EAR PROBLEMS � FEVER � HEADACHE � INSECT BITES � NAUSEA / VOMITING � PINK EYE � RASH � RESPIRATORY PROBLEMS � URINARY PROBLEMS � AND MORE Why Therapy? � ALCOHOL / DRUGS / TOBACCO RELIANCE � CHILD OR ELDER CARE MATTERS � CO-DEPENDENCY � EATING DISORDERS � PHYSICAL / SEXUAL / EMOTIONAL ABUSE � RELATIONSHIP CONCERNS � STRESS AND ANXIETY � WORK OR PERSONAL CONFLICTS PRIMARY CARE Same Day Appointments Access a Virtual Primary Care appointment the same day of requesting it! Or, schedule when it\'s best for you. Same Provider Each Visit See the same provider each visit so that they can best understand your health needs and provide personalized care. Annual Wellness Check An annual wellness check can help you get on a better health trajectory, get a personalized care plan, and learn about your overall health! URGENT CARE Instant Access To Care Virtual Urgent Care visits can be accessed as short as in 20 minutes! You can also schedule appointments when it best works for you. In House Providers See the same provider each visit so that they can best understand your health needs and provide personalized care. MENTAL HEALTH THERAPY Annual Visits MyLiveDoc includes four mental health visits annually for each family member. Available to adults and adolescents 12 years and older. Convenient Scheduling Easy access to a licensed, Master\'s level counselor within 1-3 days. Should you need in-person care, our team is able to provide referrals when needed. Same Therapist Each Visit See the same therapist each visit to best understand your personal needs. Our counselors are trained in clinical assessments and care coordination. Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PHARMACY SOLUTION With our FREE drug program, you\'ll have access to over 1,000 quality maintenance medications that you can have delivered right to your doorstep for FREE with membership. You\'ll also have access to urgent care medications that you can pick up at your local retail pharmacy for FREE. Our medication list contains over 95% of the top prescribed generic medications in the US for conditions such as: � High Cholesterol � Diabetes � Mental Health � Allergy � Thyroid � Asthma � Men\'s Health � Women\'s Health � High Blood Pressure � Urgent Care � And More... HOME DELIVERY (Chronic Need) OR URGENT CARE (Immediate Need) Home Delivery (chronic need) or Urgent Care (immediate need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MEMBERSHIP SAVINGS CARD Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PRESCRIPTION ACCESS ASSISTANCE ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health�. ScriptAide provides pharmaceutical advocacy services, reducing the financial burden. Our direct-to-member support services are staffed by Pharmaceutical Access Coordinators specialized in helping members acquire prescribed medications using their PAP and SPIP programs. Every Patient HAS ACCESS TO BENEFIT CONSULTING AND COMPREHENSIVE CLINICAL SUPPORT. CALL US AT 866.837-1515 Patient Assistance Program (PAP) PAP is designed for members in the United States who require non-covered medications and demonstrate qualifying financial need. Those who qualify will receive their medications for free, with no co-pays or shipping costs. A valid prescription is required to participate. Self-Pay Importation Program (SPIP) SPIP is available to members in the United States who require non-covered medications. Through this program, individuals can import their prescribed medications at their own cost, typically saving 40-45%',
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
          'Urgent Care Facility: $50 copay — 2 visits/yr — $300 max/visit'
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
          'Ambulance: NOT covered',
          'Outpatient Surgery: NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Rx: Available via MyLiveDoc',
          'Brand/specialty drugs: NOT covered'
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
    rawText: 'HEALTHCARE DATA ANALYTICS PLAN HIGHLIGHTS LIMITED HEALTH & WELLNESS PLANS CONTACT US (866) 360-4646 memberservices@detegohealth.com 600-1020-5 Limited Health & Wellness Plans Looking for low-cost coverage? Our Limited Health & Wellness Plans are an affordable option instead of regular health insurance. They offer important coverage to keep you healthy and help prevent illness. Stay covered under the ACA while taking care of your health. 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Partners Network Access We offer one of the largest directly contracted national PPO networks, the First Health Network with more than 5,700 hospitals, 52,000 ancillary facilities, and 993,000 professional providers. Telemedicine Connect with Board-Certified Physicians, anytime, anywhere in the United States who can diagnose and treat virtually. 24/7 access to primary care, urgent care, and mental health care! MyLiveDoc: (855) 226-6567 Pharmacy Solution: Urgent Care (immediate need) and Home Delivery (chronic need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MyLiveDoc: (855) 226-6567 Prescription Access Assistance ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health� and provides prescription access assistance to our members. Our Pharmaceutical Access Coordinators specialize in researching ways to help our members get the brand-name medications they need and save them money. ScriptAide: (866) 837-1515 � � Discover A Better Plan Member Advocates & Balance Bill Services NaviClaim is the exclusive Member Advocate for Detego Health�. NaviClaim reviews your bill for accuracy and re-prices it to ensure fair reimbursement. Once re-priced, NaviClaim sends the claim to your third-party administrator (TPA) for processing. NaviClaim: (866) 837-1436 Third-Party Administrator (TPA) As a third-party administrator, Detego Health LLC� specializes in the sourcing and management of health benefits plans. We act as an advocate, working to limit the costs of healthcare without sacrificing quality or access to care. Detego Health: (866) 815-6001 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Services Concierge Services Customer Care Detego Health� has Care Guides available at (866) 815-6001, Monday - Friday from 7:00AM - 5:00PM (CST) to support your every need. Member Portal MyLiveDoc Portal When you are logged on, you can access your Membership Savings Card, Formulary list, Prescription history, and more! 600-1020-5 �2024 Population Science Management. All Rights Reserved. 600-1020-5 �2024 Population Science Management. All Rights Reserved. PLAN OVERVIEW 2025 - 2026 � LIMITED HEALTH & WELLNESS PLAN: TDK 1 � LIMITED HEALTH & WELLNESS PLAN: TDK 2 � LIMITED HEALTH & WELLNESS PLAN: TDK 3 � LIMITED HEALTH & WELLNESS PLAN: TDK 4 � LIMITED HEALTH & WELLNESS PLAN: TDK 5 Group Name: Healthcare Data Analytics Effective Date: April 1, 2025 600-1022-5 NETWORK Welcome to First Health! We are grateful for the opportunity to serve you. Our CORE VALUES Put People First Rise To The Challenge Join Forces Create Simplicity Inspire Trust Champion Safety And Quality NATIONAL PPO NETWORK with more than... 5,700 HOSPITALS 52,000 ANCILLARY FACILITIES 993,000 PROFESSIONAL PROVIDERS In order to find an in-network doctor, urgent care center, hospital or other provider, use our online provider search tool (866) 360-4646 600-1022-5 memberservices@detegohealth.com Our Care Guides are available from 7AM - 5PM CST to support your every need. �2025 Population Science Management. All Rights Reserved. TELEMEDICINE 24/7 ACCESS PRIMARY CARE URGENT CARE MENTAL HEALTH CARE Connect with BOARD-CERTIFIED PHYSICIANS, ANYTIME, ANYWHERE IN THE UNITED STATES. NO CLAIMS OR COPAY EVERY STATE CARE COORDINATION EXCLUSIVE DOCTORS Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. WE TREAT 50+ ROUTINE MEDICAL CONDITIONS! � ACNE � ALLERGIES � COLD/FLU � CONSTIPATION � COUGH � DIARRHEA � EAR PROBLEMS � FEVER � HEADACHE � INSECT BITES � NAUSEA / VOMITING � PINK EYE � RASH � RESPIRATORY PROBLEMS � URINARY PROBLEMS � AND MORE Why Therapy? � ALCOHOL / DRUGS / TOBACCO RELIANCE � CHILD OR ELDER CARE MATTERS � CO-DEPENDENCY � EATING DISORDERS � PHYSICAL / SEXUAL / EMOTIONAL ABUSE � RELATIONSHIP CONCERNS � STRESS AND ANXIETY � WORK OR PERSONAL CONFLICTS PRIMARY CARE Same Day Appointments Access a Virtual Primary Care appointment the same day of requesting it! Or, schedule when it\'s best for you. Same Provider Each Visit See the same provider each visit so that they can best understand your health needs and provide personalized care. Annual Wellness Check An annual wellness check can help you get on a better health trajectory, get a personalized care plan, and learn about your overall health! URGENT CARE Instant Access To Care Virtual Urgent Care visits can be accessed as short as in 20 minutes! You can also schedule appointments when it best works for you. In House Providers See the same provider each visit so that they can best understand your health needs and provide personalized care. MENTAL HEALTH THERAPY Annual Visits MyLiveDoc includes four mental health visits annually for each family member. Available to adults and adolescents 12 years and older. Convenient Scheduling Easy access to a licensed, Master\'s level counselor within 1-3 days. Should you need in-person care, our team is able to provide referrals when needed. Same Therapist Each Visit See the same therapist each visit to best understand your personal needs. Our counselors are trained in clinical assessments and care coordination. Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PHARMACY SOLUTION With our FREE drug program, you\'ll have access to over 1,000 quality maintenance medications that you can have delivered right to your doorstep for FREE with membership. You\'ll also have access to urgent care medications that you can pick up at your local retail pharmacy for FREE. Our medication list contains over 95% of the top prescribed generic medications in the US for conditions such as: � High Cholesterol � Diabetes � Mental Health � Allergy � Thyroid � Asthma � Men\'s Health � Women\'s Health � High Blood Pressure � Urgent Care � And More... HOME DELIVERY (Chronic Need) OR URGENT CARE (Immediate Need) Home Delivery (chronic need) or Urgent Care (immediate need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MEMBERSHIP SAVINGS CARD Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PRESCRIPTION ACCESS ASSISTANCE ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health�. ScriptAide provides pharmaceutical advocacy services, reducing the financial burden. Our direct-to-member support services are staffed by Pharmaceutical Access Coordinators specialized in helping members acquire prescribed medications using their PAP and SPIP programs. Every Patient HAS ACCESS TO BENEFIT CONSULTING AND COMPREHENSIVE CLINICAL SUPPORT. CALL US AT 866.837-1515 Patient Assistance Program (PAP) PAP is designed for members in the United States who require non-covered medications and demonstrate qualifying financial need. Those who qualify will receive their medications for free, with no co-pays or shipping costs. A valid prescription is required to participate. Self-Pay Importation Program (SPIP) SPIP is available to members in the United States who require non-covered medications. Through this program, individuals can import their prescribed medications at their own cost, typically saving 40-45%',
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
          'Urgent Care Facility: $50 copay — 4 visits/yr — $300 max/visit'
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
          'ER Facility: $1,500/day — $4,500/yr max',
          'ER Professional: NOT covered',
          'Ambulance: NOT covered',
          'Outpatient Surgery: NOT covered'
        ]
      },
      {
        category: 'Preventive / MEC',
        items: ['ACA preventive: $0 copay — 1 visit/yr — $150 max/visit']
      },
      {
        category: 'Prescriptions',
        items: [
          'Rx: Available via MyLiveDoc',
          'Brand/specialty drugs: NOT covered'
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
    rawText: 'HEALTHCARE DATA ANALYTICS PLAN HIGHLIGHTS LIMITED HEALTH & WELLNESS PLANS CONTACT US (866) 360-4646 memberservices@detegohealth.com 600-1020-5 Limited Health & Wellness Plans Looking for low-cost coverage? Our Limited Health & Wellness Plans are an affordable option instead of regular health insurance. They offer important coverage to keep you healthy and help prevent illness. Stay covered under the ACA while taking care of your health. 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Partners Network Access We offer one of the largest directly contracted national PPO networks, the First Health Network with more than 5,700 hospitals, 52,000 ancillary facilities, and 993,000 professional providers. Telemedicine Connect with Board-Certified Physicians, anytime, anywhere in the United States who can diagnose and treat virtually. 24/7 access to primary care, urgent care, and mental health care! MyLiveDoc: (855) 226-6567 Pharmacy Solution: Urgent Care (immediate need) and Home Delivery (chronic need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MyLiveDoc: (855) 226-6567 Prescription Access Assistance ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health� and provides prescription access assistance to our members. Our Pharmaceutical Access Coordinators specialize in researching ways to help our members get the brand-name medications they need and save them money. ScriptAide: (866) 837-1515 � � Discover A Better Plan Member Advocates & Balance Bill Services NaviClaim is the exclusive Member Advocate for Detego Health�. NaviClaim reviews your bill for accuracy and re-prices it to ensure fair reimbursement. Once re-priced, NaviClaim sends the claim to your third-party administrator (TPA) for processing. NaviClaim: (866) 837-1436 Third-Party Administrator (TPA) As a third-party administrator, Detego Health LLC� specializes in the sourcing and management of health benefits plans. We act as an advocate, working to limit the costs of healthcare without sacrificing quality or access to care. Detego Health: (866) 815-6001 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Services Concierge Services Customer Care Detego Health� has Care Guides available at (866) 815-6001, Monday - Friday from 7:00AM - 5:00PM (CST) to support your every need. Member Portal MyLiveDoc Portal When you are logged on, you can access your Membership Savings Card, Formulary list, Prescription history, and more! 600-1020-5 �2024 Population Science Management. All Rights Reserved. 600-1020-5 �2024 Population Science Management. All Rights Reserved. PLAN OVERVIEW 2025 - 2026 � LIMITED HEALTH & WELLNESS PLAN: TDK 1 � LIMITED HEALTH & WELLNESS PLAN: TDK 2 � LIMITED HEALTH & WELLNESS PLAN: TDK 3 � LIMITED HEALTH & WELLNESS PLAN: TDK 4 � LIMITED HEALTH & WELLNESS PLAN: TDK 5 Group Name: Healthcare Data Analytics Effective Date: April 1, 2025 600-1022-5 NETWORK Welcome to First Health! We are grateful for the opportunity to serve you. Our CORE VALUES Put People First Rise To The Challenge Join Forces Create Simplicity Inspire Trust Champion Safety And Quality NATIONAL PPO NETWORK with more than... 5,700 HOSPITALS 52,000 ANCILLARY FACILITIES 993,000 PROFESSIONAL PROVIDERS In order to find an in-network doctor, urgent care center, hospital or other provider, use our online provider search tool (866) 360-4646 600-1022-5 memberservices@detegohealth.com Our Care Guides are available from 7AM - 5PM CST to support your every need. �2025 Population Science Management. All Rights Reserved. TELEMEDICINE 24/7 ACCESS PRIMARY CARE URGENT CARE MENTAL HEALTH CARE Connect with BOARD-CERTIFIED PHYSICIANS, ANYTIME, ANYWHERE IN THE UNITED STATES. NO CLAIMS OR COPAY EVERY STATE CARE COORDINATION EXCLUSIVE DOCTORS Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. WE TREAT 50+ ROUTINE MEDICAL CONDITIONS! � ACNE � ALLERGIES � COLD/FLU � CONSTIPATION � COUGH � DIARRHEA � EAR PROBLEMS � FEVER � HEADACHE � INSECT BITES � NAUSEA / VOMITING � PINK EYE � RASH � RESPIRATORY PROBLEMS � URINARY PROBLEMS � AND MORE Why Therapy? � ALCOHOL / DRUGS / TOBACCO RELIANCE � CHILD OR ELDER CARE MATTERS � CO-DEPENDENCY � EATING DISORDERS � PHYSICAL / SEXUAL / EMOTIONAL ABUSE � RELATIONSHIP CONCERNS � STRESS AND ANXIETY � WORK OR PERSONAL CONFLICTS PRIMARY CARE Same Day Appointments Access a Virtual Primary Care appointment the same day of requesting it! Or, schedule when it\'s best for you. Same Provider Each Visit See the same provider each visit so that they can best understand your health needs and provide personalized care. Annual Wellness Check An annual wellness check can help you get on a better health trajectory, get a personalized care plan, and learn about your overall health! URGENT CARE Instant Access To Care Virtual Urgent Care visits can be accessed as short as in 20 minutes! You can also schedule appointments when it best works for you. In House Providers See the same provider each visit so that they can best understand your health needs and provide personalized care. MENTAL HEALTH THERAPY Annual Visits MyLiveDoc includes four mental health visits annually for each family member. Available to adults and adolescents 12 years and older. Convenient Scheduling Easy access to a licensed, Master\'s level counselor within 1-3 days. Should you need in-person care, our team is able to provide referrals when needed. Same Therapist Each Visit See the same therapist each visit to best understand your personal needs. Our counselors are trained in clinical assessments and care coordination. Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PHARMACY SOLUTION With our FREE drug program, you\'ll have access to over 1,000 quality maintenance medications that you can have delivered right to your doorstep for FREE with membership. You\'ll also have access to urgent care medications that you can pick up at your local retail pharmacy for FREE. Our medication list contains over 95% of the top prescribed generic medications in the US for conditions such as: � High Cholesterol � Diabetes � Mental Health � Allergy � Thyroid � Asthma � Men\'s Health � Women\'s Health � High Blood Pressure � Urgent Care � And More... HOME DELIVERY (Chronic Need) OR URGENT CARE (Immediate Need) Home Delivery (chronic need) or Urgent Care (immediate need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MEMBERSHIP SAVINGS CARD Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PRESCRIPTION ACCESS ASSISTANCE ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health�. ScriptAide provides pharmaceutical advocacy services, reducing the financial burden. Our direct-to-member support services are staffed by Pharmaceutical Access Coordinators specialized in helping members acquire prescribed medications using their PAP and SPIP programs. Every Patient HAS ACCESS TO BENEFIT CONSULTING AND COMPREHENSIVE CLINICAL SUPPORT. CALL US AT 866.837-1515 Patient Assistance Program (PAP) PAP is designed for members in the United States who require non-covered medications and demonstrate qualifying financial need. Those who qualify will receive their medications for free, with no co-pays or shipping costs. A valid prescription is required to participate. Self-Pay Importation Program (SPIP) SPIP is available to members in the United States who require non-covered medications. Through this program, individuals can import their prescribed medications at their own cost, typically saving 40-45%',
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
          'Urgent Care Facility: $75 copay — 4 visits/yr — $300 max/visit'
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
          'Outpatient Surgery: $1,000/day — $10,000/yr max',
          'ER Facility: $1,000/day — $2,000/yr max',
          'ER Professional: $1,000/incident',
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
          'Rx: Available via MyLiveDoc',
          'Brand/specialty drugs: NOT covered'
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
    rawText: 'HEALTHCARE DATA ANALYTICS PLAN HIGHLIGHTS LIMITED HEALTH & WELLNESS PLANS CONTACT US (866) 360-4646 memberservices@detegohealth.com 600-1020-5 Limited Health & Wellness Plans Looking for low-cost coverage? Our Limited Health & Wellness Plans are an affordable option instead of regular health insurance. They offer important coverage to keep you healthy and help prevent illness. Stay covered under the ACA while taking care of your health. 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Partners Network Access We offer one of the largest directly contracted national PPO networks, the First Health Network with more than 5,700 hospitals, 52,000 ancillary facilities, and 993,000 professional providers. Telemedicine Connect with Board-Certified Physicians, anytime, anywhere in the United States who can diagnose and treat virtually. 24/7 access to primary care, urgent care, and mental health care! MyLiveDoc: (855) 226-6567 Pharmacy Solution: Urgent Care (immediate need) and Home Delivery (chronic need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MyLiveDoc: (855) 226-6567 Prescription Access Assistance ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health� and provides prescription access assistance to our members. Our Pharmaceutical Access Coordinators specialize in researching ways to help our members get the brand-name medications they need and save them money. ScriptAide: (866) 837-1515 � � Discover A Better Plan Member Advocates & Balance Bill Services NaviClaim is the exclusive Member Advocate for Detego Health�. NaviClaim reviews your bill for accuracy and re-prices it to ensure fair reimbursement. Once re-priced, NaviClaim sends the claim to your third-party administrator (TPA) for processing. NaviClaim: (866) 837-1436 Third-Party Administrator (TPA) As a third-party administrator, Detego Health LLC� specializes in the sourcing and management of health benefits plans. We act as an advocate, working to limit the costs of healthcare without sacrificing quality or access to care. Detego Health: (866) 815-6001 600-1020-5 �2024 Population Science Management. All Rights Reserved. Our Services Concierge Services Customer Care Detego Health� has Care Guides available at (866) 815-6001, Monday - Friday from 7:00AM - 5:00PM (CST) to support your every need. Member Portal MyLiveDoc Portal When you are logged on, you can access your Membership Savings Card, Formulary list, Prescription history, and more! 600-1020-5 �2024 Population Science Management. All Rights Reserved. 600-1020-5 �2024 Population Science Management. All Rights Reserved. PLAN OVERVIEW 2025 - 2026 � LIMITED HEALTH & WELLNESS PLAN: TDK 1 � LIMITED HEALTH & WELLNESS PLAN: TDK 2 � LIMITED HEALTH & WELLNESS PLAN: TDK 3 � LIMITED HEALTH & WELLNESS PLAN: TDK 4 � LIMITED HEALTH & WELLNESS PLAN: TDK 5 Group Name: Healthcare Data Analytics Effective Date: April 1, 2025 600-1022-5 NETWORK Welcome to First Health! We are grateful for the opportunity to serve you. Our CORE VALUES Put People First Rise To The Challenge Join Forces Create Simplicity Inspire Trust Champion Safety And Quality NATIONAL PPO NETWORK with more than... 5,700 HOSPITALS 52,000 ANCILLARY FACILITIES 993,000 PROFESSIONAL PROVIDERS In order to find an in-network doctor, urgent care center, hospital or other provider, use our online provider search tool (866) 360-4646 600-1022-5 memberservices@detegohealth.com Our Care Guides are available from 7AM - 5PM CST to support your every need. �2025 Population Science Management. All Rights Reserved. TELEMEDICINE 24/7 ACCESS PRIMARY CARE URGENT CARE MENTAL HEALTH CARE Connect with BOARD-CERTIFIED PHYSICIANS, ANYTIME, ANYWHERE IN THE UNITED STATES. NO CLAIMS OR COPAY EVERY STATE CARE COORDINATION EXCLUSIVE DOCTORS Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. WE TREAT 50+ ROUTINE MEDICAL CONDITIONS! � ACNE � ALLERGIES � COLD/FLU � CONSTIPATION � COUGH � DIARRHEA � EAR PROBLEMS � FEVER � HEADACHE � INSECT BITES � NAUSEA / VOMITING � PINK EYE � RASH � RESPIRATORY PROBLEMS � URINARY PROBLEMS � AND MORE Why Therapy? � ALCOHOL / DRUGS / TOBACCO RELIANCE � CHILD OR ELDER CARE MATTERS � CO-DEPENDENCY � EATING DISORDERS � PHYSICAL / SEXUAL / EMOTIONAL ABUSE � RELATIONSHIP CONCERNS � STRESS AND ANXIETY � WORK OR PERSONAL CONFLICTS PRIMARY CARE Same Day Appointments Access a Virtual Primary Care appointment the same day of requesting it! Or, schedule when it\'s best for you. Same Provider Each Visit See the same provider each visit so that they can best understand your health needs and provide personalized care. Annual Wellness Check An annual wellness check can help you get on a better health trajectory, get a personalized care plan, and learn about your overall health! URGENT CARE Instant Access To Care Virtual Urgent Care visits can be accessed as short as in 20 minutes! You can also schedule appointments when it best works for you. In House Providers See the same provider each visit so that they can best understand your health needs and provide personalized care. MENTAL HEALTH THERAPY Annual Visits MyLiveDoc includes four mental health visits annually for each family member. Available to adults and adolescents 12 years and older. Convenient Scheduling Easy access to a licensed, Master\'s level counselor within 1-3 days. Should you need in-person care, our team is able to provide referrals when needed. Same Therapist Each Visit See the same therapist each visit to best understand your personal needs. Our counselors are trained in clinical assessments and care coordination. Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PHARMACY SOLUTION With our FREE drug program, you\'ll have access to over 1,000 quality maintenance medications that you can have delivered right to your doorstep for FREE with membership. You\'ll also have access to urgent care medications that you can pick up at your local retail pharmacy for FREE. Our medication list contains over 95% of the top prescribed generic medications in the US for conditions such as: � High Cholesterol � Diabetes � Mental Health � Allergy � Thyroid � Asthma � Men\'s Health � Women\'s Health � High Blood Pressure � Urgent Care � And More... HOME DELIVERY (Chronic Need) OR URGENT CARE (Immediate Need) Home Delivery (chronic need) or Urgent Care (immediate need) services are available with select plans. Please refer to your specific plan details to confirm coverage and availability of these services. MEMBERSHIP SAVINGS CARD Concierge Support Services For any questions about your membership benefits: MyLiveDoc 855-226-6567 600-1022-5 �2025 Population Science Management. All Rights Reserved. PRESCRIPTION ACCESS ASSISTANCE ScriptAide is the exclusive Pharmaceutical Advocate for Detego Health�. ScriptAide provides pharmaceutical advocacy services, reducing the financial burden. Our direct-to-member support services are staffed by Pharmaceutical Access Coordinators specialized in helping members acquire prescribed medications using their PAP and SPIP programs. Every Patient HAS ACCESS TO BENEFIT CONSULTING AND COMPREHENSIVE CLINICAL SUPPORT. CALL US AT 866.837-1515 Patient Assistance Program (PAP) PAP is designed for members in the United States who require non-covered medications and demonstrate qualifying financial need. Those who qualify will receive their medications for free, with no co-pays or shipping costs. A valid prescription is required to participate. Self-Pay Importation Program (SPIP) SPIP is available to members in the United States who require non-covered medications. Through this program, individuals can import their prescribed medications at their own cost, typically saving 40-45%',
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
          'Urgent Care Facility: $75 copay — 5 visits/yr — $300 max/visit'
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
          'Outpatient Surgery: $1,500/day — $15,000/yr max',
          'ER Facility: NOT covered',
          'ER Professional: $1,000/incident',
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
          'Rx: Available via MyLiveDoc',
          'Brand/specialty drugs: NOT covered'
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
    rawText: 'PINNACLE SHORT TERM MEDICAL An EverestTM Product TABLE OF CONTENTS 03 State Availability 04 Plan Highlights 05 Eligibility 06 About Everest 07 Schedule of Benefits 08 Key Terms & Overview 10 FAQs 13 Network Info 14 About AWA 15 Rx Savers STATE AVAILABILITY State IL NV OH WI Reapply Rules 60 day wait before applying for another plan Cannot exceed 185 days in any 365 day period Not Allowed Must have 63 day break after 18 months coverage PLAN HIGHLIGHTS Length of Coverage Members may enroll for 6-month or 364-day policy terms, subject to state regulations. Refer to the information below on consecutive policy terms. PPO Access and Cost Savings Pinnacle STM is NOT a network plan. However, covered persons have access to physicians participating in the PHCS Practitioner & Ancillary network, which provides members with in-network negotiated rates.* PHCS contracted pricing does not apply to "facility" charges, which are covered up to 150% of Medicare allowable charges. * *Exception: In the State of Nebraska, all applicable provider, facility and ancillary charges are covered up to 150% of Medicare allowable charges. Coverage Effective Date Next day coverage; later effective date available, but not to exceed 60 days from date of transmission Waiting Period 5 days for sickness 30 days for cancer No waiting period for injuries How will consecutive policy terms work? At the end of their policy term, members may re-apply for another policy term, up to a maximum of 36 months of coverage, as allowed by the specific regulations set in their state. Will the plan benefits carry-over between terms? Deductible and coinsurance and all benefit limits will reset with each policy block (may be up to 12 month blocks). After your plan expires This Short Term Medical insurance is nonrenewable, and policy termination is not considered a qualifying life event for purposes of enrolling in a plan. Therefore, depending on your policy\'s termination date and state laws about reapplying for a new plan, when your Pinnacle STM Health Insurance expires, you may have a gap in insurance coverage until you can begin coverage with new Short Term Medical Insurance or an ACA or other comprehensive insurance plan. You must re-apply for a new STM policy if you want to remain covered after expiration of your existing policy. Your new plan is not an extension of your current plan. As a result, your deductibles, waiting periods, maximum benefit limits and maximum out-of-pocket obligations will reset under your new policy and any illness or condition you develop under your current policy will be considered a preexisting condition under your new plan. DISCLAIMER: This coverage is not required to comply with certain federal market requirements for health insurance, principally those contained in the Affordable Care Act. Be sure to check your Certificate carefully to make sure you are aware of any exclusions or limitations regarding coverage of preexisting conditions or health benefits (such as hospitalization, emergency services, maternity care, preventive care, prescription drugs, and mental health and substance use disorder services). Your Certificate might also have lifetime and/or annual dollar limits on health benefits. If this coverage expires or you lose eligibility for this coverage, you might have to wait until an open enrollment period to get other health insurance coverage. THIS PLAN PROVIDES LIMITED BENEFIT COVERAGE. IT IS NOT DESIGNED TO COVER ALL MEDICAL EXPENSES AND IT IS NOT A MAJOR MEDICAL OR COMPREHENSIVE HEALTHCARE POLICY. PLEASE READ YOUR POLICY CAREFULLY! IS PINNACLE RIGHT FOR YOU? Unexpected illnesses and accidents happen every day, and the resulting medical bills can be disastrous. Pinnacle STM Health Insurance helps to protect you from the medical bills that can result from unexpected Injuries and Sickness. Safeguard your financial future with Pinnacle STM Health Insurance. It provides the peace of mind and health care access you need at a price you can afford. Plans available up to 12 months* Simple application process Flexibility to choose your own physician and hospital Next Day Coverage Valuable Health Insurance Coverage for times of transition Between Jobs If you\'re between jobs, consider Short Term Medical. For about half the cost of COBRA 2, Short Term Medical offers next-day coverage to help you bridge the insurance gap. Waiting for Employer Benefits Often new employers impose a waiting period before you\'re eligible for health benefits. With Short Term Medical, you stay insured and can choose your own plan duration. Temporary Employees When your employment schedule is unpredictable, it\'s hard to maintain health coverage. Short Term Medical offers you flexible coverage options to suit your situation. New Graduates When your employment schedule is unpredictable, it\'s hard to maintain health coverage. Short Term Medical offers you flexible coverage options to suit your situation. This Pinnacle STM Health Insurance Plan does not qualify as the minimum essential coverage required by the Affordable Care Act (ACA). Unless you purchase a plan that provides minimum essential coverage in accordance with the ACA, you may be subject to a federal tax penalty. Underwritten by Everest Reinsurance Company, rated A+ Superior by the A.M. Best Company (5/7/21). A.M. Best is an independent global rating organization that examines insurance companies and publishes its opinion on their financial strength. Everest Reinsurance Company, 100 Everest Way, Warren, NJ 07059. Benefits not available in all states at this time. Members can be enrolled only once. Duplicate or multiple memberships are not allowed. Coverage is not provided for members age 65 or over, coverage will terminate at the end of the month insured turns age 65. If coverage is canceled, persons may not re-enroll in coverage with Everest Reinsurance Company until six months after their termination date. * States may vary ** Short Term Medical insurance is often a lower-cost alternative to COBRA. However, if you purchase Short Term Medical rather than maintaining COBRA coverage, you may give up your rights to coverage for pre-existing conditions or guaranteed health insurance in the future. Short Term Medical benefits may be limited compared to COBRA coverage. ABOUT EVEREST REINSURANCE A solid foundation to rely on Everest is a leading global reinsurance and insurance organization with extensive product and distribution capabilities, a strong balance sheet and an innovative culture. Throughout our history, Everest has maintained its discipline and focus on creating long term value through underwriting excellence and strong risk and capital management. A global leader in reinsurance and insurance For over 40 years, Everest has been a global leader in reinsurance with a broad footprint, deep client relationships, underwriting excellence, responsive service and customized solutions. Our insurance arm draws upon impressive global resources and financial strength to tailor each policy to meet the individual needs of our customers. Ascend with experienced leaders Our diverse leaders rely on deep knowledge and decades of industry experience to deliver long-term value for our shareholders. We aim to provide strength and stability through a smart, nimble, and disciplined approach. Recognized throughout the industry Everest Reinsurance Company is rated A+ Superior by the A.M. Best Company (5/7/21). A.M. Best is an independent global rating organization that examines insurance companies and publishes its opinion on their financial strength. Recognized throughout the industry Everest Re is a longstanding U.S. property and casualty reinsurer offering a diverse range of products. We rely on proven financial strength, underwriting excellence, and industry proficiency to customize smart solutions for our clients. We rank among the top reinsurers with locations around the world. Our approach is client-centered, and unique in each region. We have a ',
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
    rawText: 'Access Health Limited Duration Group Short Term Medical Insurance Carrier & Underwritter BR-AFS-STM-2022 Underwritten by American Financial Security Life Insurance Co in AL, AR, AZ, KY, MS, NE, NV, OH, OK, TX, WI, GA, IL, IN, and VA. This short-term medical insurance (evidenced by Certificate form AF ST CERT 818 ) is underwritten by American Financial Services Life Insurance Company. Non insurance association membership benefits are provided by The National Congress of Employers (NCE). Product Summary Deductible Options $500, $1,000, $2,000, $2,500, $5,000, $7,500, $10,000 Coinsurance Options 80%/20% Coinsurance Limit $2,000 or $4,000 Length of Coverage Available for up to 36 months of coverage depending upon state regulations. Network � PHCS network giving members voluntary access to in-network negotiated rate � Facility charge: Plan pays up to 150% of Medicare allowable charges � There is no requirement to go to an in-network provider transmission Eligibility 18 � 64 1/2 Child coverage policies from 2-17 Waiting Period � 5 days for sickness � 30 days for cancer. No waiting period for injuries. Pre-existing Waiver Rider: Pre-Existing Waiver Rider option will waive any conditions that were covered during the prior coverage period which means con- sumers will not have to re-qualify for another term to begin. Terms of coverage and limitations may vary by state. Who is this plan good for? � For those who have part-time or temporary employment � For those who have recently graduated � For those who are without adequate health insurance How will consecutive policy terms work? When a member applies for consecutive terms in one enrollment, they will be issued their initial term of coverage, and subsequent terms will be pending. The waiting period on all subsequent terms will be waived. Members will not have to reapply for additional terms. When subsequent terms of coverage are set to begin, the member will receive an email stating their plan has continued into the next term. The email will provide them with their new monthly rate (if applicable), and they will have the opportunity to opt out at that time. If the member has selected the pre-ex waiver rider, the waiting periods for sickness and cancer will be waived in subsequent terms. Deductible and coinsurance and all benefit limits will reset with each 12 month period of coverage. DISCLAIMER: THIS COVERAGE IS NOT REQUIRED TO COMPLY WITH CERTAIN FEDERAL MARKET REQUIREMENTS FOR HEALTH INSURANCE, PRINCIPALLY THOSE CONTAINED IN THE AFFORDABLE CARE ACT. BE SURE TO CHECK THE CERTIFICATE CAREFULLY TO MAKE SURE YOU ARE AWARE OF ANY EXCLUSIONS OR LIMITATIONS REGARDING COVERAGE OF PRE-EXISTING CONDITIONS OR HEALTH BENEFITS (SUCH AS HOSPITALIZATION, EMERGENCY SERVICES, MATERNITY CARE, PREVENTIVE CARE, PRESCRIPTION DRUGS, AND MENTAL HEALTH AND SUBSTANCE USE DISORDER SERVICES). YOUR COVERAGE ALSO HAS LIFETIME AND/OR COVERAGE PERIOD DOLLAR LIMITS ON HEALTH BENEFITS. IF THIS COVERAGE EXPIRES OR YOU LOSE ELIGIBILITY FOR THIS COVERAGE, YOU MIGHT HAVE TO WAIT UNTIL AN OPEN ENROLLMENT PERIOD TO GET OTHER HEALTH INSURANCE COVERAGE. THIS INFORMATION IS A BRIEF DESCRIPTION OF THE IMPORTANT FEATURES OF THE GROUP INSURANCE POLICY. COVERAGE MAY NOT BE AVAILABLE IN ALL STATES OR CERTAIN TERMS MAY BE DIFFERENT WHERE REQUIRED BY STATE LAW. PRE-EXISTING CONDITIONS ARE NOT COVERED, AND BENEFITS ARE SUBJECT TO THE POLICY LIMITATIONS AND EXCLUSIONS. REFER TO THE POLICY, CERTIFICATE AND RIDERS FOR COMPLETE DETAILS. Deductible Options Coinsurance Options Coinsurance Limit Coverage Period Maximum Options Plan 1 Plan 2 Plan 3 $500, $1,000, $2,000, $2,500, $5,000, $500, $1,000, $2,000, $2,500, $5,000, $500, $1,000, $2,000, $2,500, $5,000, $7,500, $10,000 $7,500, $10,000 $7,500, $10,000 80/20 80/20 80/20 $2,000, $4,000 $2,000, $4,000 $2,000, $4,000 $250,000, $500,000, $1,000,000 $250,000, $500,000, $1,000,000 $250,000, $500,000, $1,000,000 / Urgent Care Copay - Specialist $25, maximum 2 $40, maximum 2 $15, unlimited $25, unlimited $25, maximum 2 $40, maximum 2 Copay - Wellness Care Urgent Care Additional Deductible $50, maximum 1 After the copayment shown above, any additional service performed during a be subject to Deductible and Coinsurance. $2,000 per coverage period. $50, maximum 1 After the Copayment shown above, any other covered services or tests performed the Plan Deductible and Coinsurance. $50, maximum 1 After the Copayment shown above, any other covered services or tests performed the Plan Deductible and Coinsurance. No Additional Deductible $100, maximum 1 No Additional Deductible Unless specified otherwise, the following benefits are for Insured and each Covered Dependent subject to the plan Deductible, Coinsurance Percentage, Out-Of-Pocket Maximum and Policy Maximum chosen. Benefits are limited to the Usual, Reasonable and Customary for each Covered Expense, in addition to any specific limits stated in the Group Policy. Average Standard Room Rate Hospital Intensive or Critical Care Doctor Visits miscel- laneous expense, is limited to $1,500. Subject to Deductible and Coinsurance miscellaneous medical charges are limited to $2,000 per day. Subject to Deductible and Coinsurance during a Hospital stay are limited to $500 per Covered Person per Coverage Period. Subject to Deductible and Coinsurance Subject to Deductible and Coinsurance Subject to Deductible and Coinsurance Subject to Deductible and Coinsurance Outpatient Hospital Surgery or Ambulatory Surgical Center miscellaneous medical charges are limited to $1,500 per day. Subject to Deductible and Coinsurance Subject to Deductible and Coinsurance Outpatient Miscellaneous Hospital Expenses Emergency Room Treatment Emergency Room Additional Deductible Surgeon Assistant Surgeon Administration of Anesthetics Outpatient Hospital expenses, excluding $1,500 per Covered Person per Coverage Period for all Eligible Expenses combined. visit, including professional and facility services, will not exceed $250 per visit. Subject to Deductible and Coinsurance Subject to the Emergency Room Additional Deductible shown below, then Deductible and Coinsurance. The Additional Deductible is waived if admitted within 24 hours of Emergency Room Treatment. Subject to Deductible and Coinsurance Subject to the Emergency Room Additional Deductible shown below, then Deductible and Coinsurance. The Additional Deductible is waived if admitted within 24 hours of Emergency Room Treatment. No Additional Deductible $250, maximum 1 No Additional Deductible Surgical Services $5,000 per surgery, for all Eligible Expenses combined, not to exceed $10,000 per Covered Person per Coverage Period. Subject to Deductible and Coinsurance $1,000 per surgery, for all Eligible Expenses combined, not to exceed $2,000 per Covered Person per Coverage Period. Subject to Deductible and Coinsurance Subject to Deductible and Coinsurance Subject to Deductible and Coinsurance $1,000 per surgery, for all Eligible Expenses combined, not to exceed $2,000 per Covered Person per Coverage Period. Subject to Deductible and Coinsurance Subject to Deductible and Coinsurance Plan 1 Plan 2 Plan 3 Organ, Tissue, Bone Marrow Transplants Extended Care Facility Hospice Care (AIDS) Joint/Tendon Surgery Knee Injury or Disorder Gallbladder Surgery Appendectomy Kidney Stones Temporomandibular Joint Disorder (TMJ) Home Health Care Therapy Services - Physical Therapist, Speech Therapist and Occupational Therapist Ambulance, Ground or Air Durable Medical Equipment and Medical Supplies Subject to Deductible and Coinsurance up to $50,000 per Coverage Period for all Covered Expenses including Inpatient Hospital, Surgical and Outpatient Miscellaneous Medical Covered Expenses. Subject to Deductible and Coinsurance up to $50,000 per Coverage Period for all Covered Expenses including Inpatient Hospital, Surgical and Outpatient Miscellaneous Medical Covered Expenses. Subject to Deductible and Coinsurance up to $50,000 per Coverage Period for all Covered Expenses',
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
    rawText: 'S_m__ar_t_H_e_a_lt_h Short Term Medical Carriers & Underwriters Association Florida, Louisiana, South Carolina and Tennessee � All rights reserved. Neo Insurance Solutions, LLC, 2020 02/20 Association NCE association is the National Congress of Employers. A national association that represents America\'s small and medium sized businesses via networking, advocacy, and information sharing. Roughly forty-one million Americans go without healthcare ever day; families of the selfemployed, or those working for small businesses, make up sixty percent of that total. The NCE seeks to provide its members with reliable services, resources, and benefits regardless of one\'s circumstances or means. The NCE Association is a great way for you and your family to save money on out-of-pocket medical expenses. Your savings start from the first dollar, with no limits. Our cost savings program gives members access to pre-negotiated, lowered rates. There are no deductibles, Pre-Existing conditions limitations, medical exams, claim forms, limitations on usage or age restrictions. � Prescription Discount Benefits � Vitamin and Supplement Discounts � Brand � Name Mail Order � Pet Rx � Nutrition and Weight Loss Counseling � Imaging Savings Program � Speech Therapy � Glasses Discounts � HearingSavings Program � Travel Discounts � Vehicle Discounts � Flowers � Spa Discounts � Movie Tickets � Restaurant.com � Medical Supplies & Equipment Disclaimer: NCE Association benefits are not affiliated with American Financial Security Life Insurance Company or Standard Life And Casualty Insurance Company. The benefits listed are not insurance and do not provide coverage, they only provide discounts and services. Benefit discounts and services vary by state. Please refer to the NCE Handbook for complete details. Non-Insurance Benefits RightWay Healthcare\'s team of expert Patient Advisors work with members to assist in navigating the confusing and expensive world of healthcare, taking the hassle out of healthcare and saving them valuable time and money. Disclaimer: The Providers listed are not affiliated with American Financial Security Life Insurance Company or Standard Life And Casualty Insurance Company. The discounts and services are not insurance and do not provide coverage. They only provide discounts and services. Network PHCS Network (Private Healthcare Systems) Persons insured under this plan may choose to be treated in or out of the PHCS network. This membership entitles you access to doctors and hospital facilities who have contracted to provide specific medical care at negotiated prices. � Locate providers at: www.phcs.com � Approximately 900,000 healthcare providers under contract � Estimated 57 million consumers accessing the network products � 110 million claims processed through the networks each year Facility Charges Plan pays up to 150% of Medicare allowable charges. Disclaimer: The amount of reduction varies by state and type of medical service received. Members must pay for all services, no portion of any provider\'s fees will be reimbursed or otherwise paid by MultiPlan PHCS network. PHCS does not process claims, they only provide a network of providers who have agreed to accept negotiated prices. The list of participating providers is subject to change without notice. The PHCS network is not affiliated with American Financial Security Life Insurance Company or Standard Life And Casualty Insurance Company and the insurance benefits provided are not dependent on the use of this network. For more information about this network please visit Multiplan.com. Product Summary Deductible Options $500, $1,000, $2,000, $2,500, $5,000, $7,500, $10,000 Coinsurance Options 80/20 Coinsurance Limit $2,000 or $4,000 Length of Coverage Available for up to 36 months of coverage depending upon state regulations. � PHCS network giving members access to in-network negotiated rate Network � Facility charge: Plan pays up to 150% of Medicare allowable charges Next day coverage; later effective date available, but not to exceed 60 days from date Coverage Effective Date of transmission Eligibility 18 � 64 1/2 Child coverage policies from 2-17 5 days for sickness 30 days for cancer. Waiting Period No waiting period for injuries. Pre-existing Waiver Rider: Pre-Existing Waiver Rider option will waive any conditions that were covered during the prior coverage period which means consumers will not have to re-qualify for another term to begin. Terms of coverage and limitations may vary by state. Who is this plan good for? � For those who are between jobs or have been laid off � For those who are waiting for employer benefits � For those who have part-time or temporary employment � For those who have recently graduated � For those who are without adequate health insurance How will consecutive policy terms work? When a customer applies for consecutive policy terms in one enrollment, they will be issued their initial term of coverage, and subsequent terms will be pending. The waiting period on all subsequent terms will be waived. Customers will not have to reapply for additional terms. When subsequent terms of coverage are set to begin, the customer will receive an email stating their plan has continued into the next term. The email will provide them with their new monthly rate (if applicable), and they will have the opportunity to opt out at this time. Will the plan benefits carry-over between terms? If the customer has selected the pre-ex waiver rider, the policy waiting periods for sickness and cancer will be waived in subsequent terms. Deductible and coinsurance and all benefit limits will reset with each 12 month block of coverage. DISCLAIMER: THIS COVERAGE IS NOT REQUIRED TO COMPLY WITH CERTAIN FEDERAL MARKET REQUIREMENTS FOR HEALTH INSURANCE, PRINCIPALLY THOSE CONTAINED IN THE AFFORDABLE CARE ACT. BE SURE TO CHECK THE CERTIFICATE CAREFULLY TO MAKE SURE YOU ARE AWARE OF ANY EXCLUSIONS OR LIMITATIONS REGARDING COVERAGE OF PRE-EXISTING CONDITIONS OR HEALTH BENEFITS (SUCH AS HOSPITALIZATION, EMERGENCY SERVICES, MATERNITY CARE, PREVENTIVE CARE, PRESCRIPTION DRUGS, AND MENTAL HEALTH AND SUBSTANCE USE DISORDER SERVICES). YOUR COVERAGE ALSO HAS LIFETIME AND/OR ANNUAL DOLLAR LIMITS ON HEALTH BENEFITS. IF THIS COVERAGE EXPIRES OR YOU LOSE ELIGIBILITY FOR THIS COVERAGE, YOU MIGHT HAVE TO WAIT UNTIL AN OPEN ENROLLMENT PERIOD TO GET OTHER HEALTH INSURANCE COVERAGE. THIS INFORMATION IS A BRIEF DESCRIPTION OF THE IMPORTANT FEATURES OF THIS INSURANCE PLAN. COVERAGE MAY NOT BE AVAILABLE IN ALL STATES OR CERTAIN TERMS MAY BE DIFFERENT WHERE REQUIRED BY STATE LAW. PRE-EXISTING CONDITIONS ARE NOT COVERED, AND BENEFITS ARE SUBJECT TO THE POLICY LIMITATIONS AND EXCLUSIONS. REFER TO THE POLICY, CERTIFICATE AND RIDERS FOR COMPLETE DETAILS. Plan Benefits Unless specified otherwise, the following benefits are for Insured and each Covered Dependent subject to the plan Deductible, Coinsurance Percentage, Out-Of-Pocket Maximum and Policy Maximum chosen. Benefits are limited to the Usual, Reasonable and Customary for each Covered Expense, in addition to any specific limits stated in the policy. Limited Traditional Deductible Options $500, $1,000, $2,000, $2,500, $5,000, $7,500, $10,000 $500, $1,000, $2,000, $2,500, $5,000, $7,500, $10,000 Coinsurance Options 80/20 80/20 Coinsurance Limit $2,000, $4,000 $2,000, $4,000 Coverage Period Maximum Options $250,000, $500,000, $1,000,000 $250,000, $500,000, $1,000,000 Doctor Office Consultation Copay - Physician Office and Urgent Care Visits Copay - Specialist Copay - Wellness Physician Office and Urgent Care Visits Urgent Care Additional Deductible $25, maximum 2 $25, maximum 2 $40, maximum 2 $40, maximum 2 $50, maximum 1 $50, maximum 1 Physician Office Visits and Urgent Care Facility visits in excess of the 2 Visits per Covered Person per Coverage Period covered by the Copayments are subject to Deductible and Coinsurance. Urgent Care Facility Visits also subject to the Urgent Care Faci',
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
    rawText: 'Short Term Medical Insurance Galena Plans Brought to you by Southern Guaranty Insurance Company ELITE w w w. s g i c i n s u r a n c e . c o m STC2000AFRP Dear Member, Thank you for choosing an Association for Responsible Planners (AFRP) membership plan, which includes an array of savings, service and insurance benefits. Included in the AFRP membership is access to the Short Term Medical (STM) policy. Your STM policy is insured by SGIC, a US based insurance company with its corporate headquarters in Clearwater, FL. The SGIC employees are excited to bring you personalized support to help you navigate your health insurance coverage. In the following pages, you will find a summary of your AFRP membership benefits and the SGIC Short Term Medical health insurance policy. We are committed to providing members with overall product satisfaction and superior customer service. For any membership or billing related questions please don\'t hesitate to contact us at 866-870-7730 Monday through Friday 9:00 a.m. to 6:00 p.m. EST. For any insurance benefits, eligibility and claims related questions, please contact us at (888) 304-7442. Sincerely, Who is SGIC? SGIC is an independently owned and operated insurance company offering a new Short Term Medical product suite: the "Galena Plans". Our mission is to bring affordable healthcare alternatives to the average American. Our vision is to provide peace of mind through a more personal approach to the difficult to navigate medical insurance industry. The Peace of Mind People. Why SGIC Galena Plans Low-Cost Plans | May be less than half the cost of major medical plans Anytime Enrollment | No qualifying event needed Flexibility | Multiple plan designs | Various policy lengths | Range of deductible and coinsurance options National PPO Network | No balance-billing with In-Network Providers Enroll once for insurance coverage that last 3 terms up to 36 months.* 3 Terms Term 1 12 months Term 2 12 months Term 3 12 months ***Pre-existing conditions and coverage limits disclosure. This coverage is not required to comply with certain federal market requirements, principally those contained in the Affordable Care Act (ACA). Review your Certificate carefully to be sure you are aware of and understand any exclusions and limitations regarding coverage of pre-existing conditions or health benefits. Your coverage may also have lifetime and/or annual limits on health benefits. First Health Network Through First Health you have access to providers, specialists, and hospitals nationwide at discounted rates 6,000 hospitals 1,046,000 professional providers 137,000 ancillary facilities Approximately 98% of hospital and 95% of physicians are retained each year Please visit www.sgicdualnetwork.com to verify your provider is in the network prior to receiving service. First Health Network access is not available in New Mexico for certain fully insured limited benefit plans due to state regulations. In addition to the First Health Network, you have access to participating providers in the MultiPlan Network First Health is a brand name of First Health Group Corp Galena Plans by SGIC - Summary of Benefits Per Person Deductible You pay up to Coinsurance % paid by SGIC Coinsurance Maximum You pay up to Coverage Period Maximum SGIC Pays up to Office Visit Wellness Visit Urgent Care Emergency Room Ambulance Services Inpatient Surgery Outpatient Surgery Surgical Office Standard Room & ICU Inpatient Doctor Visits Outpatient Diagnostics Advanced Radiology Professional Covered OT/PT Chiropractic Visits Inpatient Professional Pharmacy Solutions by ReviveHealth ECONOMY $5,000 / $7,500 / $10,000 50% / 70% / 80% $5,000 / $10,000 $500,000 Copay: Primary $40; Specialty $60 Up to $250 per term $60 Copay Accident: $500 Copay; Sickness: $750 Copay Ground: Up to $250; Air: Up to $1,000 $2,000 per Covered Surgery, up to 1 per term $2,000 per Covered Surgery, up to 1 per term $1,000 per Covered Surgery, up to 1 per term Up to $1,500 per day Up to $60 per visit Up to $500 per term Up to $1,000 per term Up to $40 per day Not Covered Not Covered Not Covered S TA N DA R D $2,500 / $5,000 / $7,500 / $10,000 50% / 70% / 80% $5,000 / $10,000 $1,000,000 *Copay: Primary $40; Specialty $60 *$40 Copay $60 Copay Accident: $500 Copay; Sickness: $750 Copay Ground: Up to $500; Air: Up to $1,000 $4,000 per Covered Surgery, up to 2 per term $4,000 per Covered Surgery, up to 1 per term $1,000 per Covered Surgery, up to 2 per term Up to $2,500 per day Up to $80 per visit Up to $1,000 per term Up to $1,500 per term Up to $60 per day Not Covered Not Covered $50 per day; up to 10 days ELITE $2,500 / $5,000 / $7,500 / $10,000 50% / 70% / 80% $2,500 / $5,000 / $10,000 $2,000,000 *Copay: Primary $30; Specialty $45 *$40 Copay *$60 Copay Accident: $500 Copay; Sickness: $750 Copay Ground: Up to $1,000; Air: Up to $2,500 $8,000 per Covered Surgery, up to 3 per term $8,000 per Covered Surgery, up to 2 per term $1,000 per Covered Surgery, up to 3 per term Up to $3,000 per day Up to $100 per visit *Copay: Pathology $40; Radiology $60 *$250 copay Up to $60 per day Up to $60 per day $100 per day; up to 30 days $100 per day; up to 10 days $0 Urgent Care Medications $0 Maintenance Medications with Free Home Delivery *Indicates copay only and not subject to deductible and plan coinsurance. All benefit limits listed above are per covered person. No benefits will be paid for a health condition that exists 12 months prior to the date your insurance takes effect. State rules may vary. Unless specified otherwise, the following benefits are for the Insured and each Covered Dependent subject to the plan Deductible, Coinsurance Percentage, Coinsurance Maximum, and Coverage Period Maximum chosen. Benefits are limited to the maximum allowable expense for each Covered Person, in addition to any specific limits stated in the policy. Pharmacy benefits are provided through a membership service with ReviveHealth. See ReviveHealth materials for full details. Savings and out of pocket costs may vary please see your ReviveHealth plan. Pharmacy Solutions No claims or copays All 50 states Free Home Delivery Easy transfers and refills 1,000 MEDICATIONS Access to over 1,000 medications for both routine/maintenance needs and acute/urgent needs -- all at no extra cost! PHARMACIST CONSULTATION Speak with one of their licensed, registered pharmacists at your convenience to learn more about your medications and options. RX SAVINGS CARD Save up to 80% on all other medications at your local pharmacy. MEDICATIONS FOR.... � High Cholesterol � Diabetes � Mental Health � Allergies � Thyroid � Asthma � Men\'s Health � Women\'s Health � High Blood Pressure � and more! SGIC is excited to offer a prescription membership service through our partnership with ReviveHealth that will provide access to a variety of no-cost medications, pharmacy support, and discounts. ReviveHealth is a non-insurance prescription solution and provider. Solution is not dependant on injury or illness being covered by one of the plans and may be used for current or pre-existing prescriptions. How Does Your Pharmacy Program Work? $0 at the Pharmacy for Urgent Care Prescriptions See your primary care physician or urgent care provider. If prescribed one of the program\'s 70 listed medications, go to one of the 70,000 participating retail pharmacies including Walgreens and CVS. $0 Home Delivery on Your Maintenance Medications through ManifestRx Pharmacy � 425 Maintenance Medications � 3 Month Supply 80% off not Covered Prescriptions If for any reason your prescription is not covered, you will have access to a discount card with up to 80% off retail costs. See next page for more details Pharmacy Solutions If your medication has refills left - simply transfer your medication to Revive. Transferring a Medication 1. Select the `My Medication\' tab in your Member Portal. 2. Type in the search bar the name of the medication you wish to have transferred. 3. Complete the required fi',
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
    rawText: 'For agent use only Benefit Description Hospital Confinement Benefit Primary Care Doctors Office Visit Benefit Specialty Care Doctors\' Office Visit Benefit Emergency Room Benefit Basic Pathology & Radiology Benefit* Advance Studies Benefit* Surgery Benefit Anesthesia Benefit Mental Health Inpatient Benefit Mental Health Outpatient Benefit Supplemental Accident Inpatient Admission Benefit Supplemental Accident Emergency Room Benefit Hospital Intensive Care Unit Benefit Additional Hospital Admission Benefit Accidental Death Benefit Critical Illness Type Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Admission Max Day Maximum Benefit 100A $100 30 $50 3 $50 3 � � � � � � � � � � � � � � � � � � � � � � � � 100 $100 30 $50 3 $50 3 $50 1 � � � � � � � � � � � � � � � � � � � $10,000 $10,000 $1,000 200 $200 30 $50 3 $50 5 $50 1 $50 1 $50 1 $400 3 20% 3 $150 60 $50 20 $500 1 $250 1 � � � $10,000 $10,000 $1,000 200+ $200 30 $50 5 $50 5 $50 1 $50 3 $50 3 $400 3 20% 3 $250 60 $50 20 $500 1 $250 1 � � � $10,000 $10,000 $1,000 300 $300 30 $50 5 $50 5 $50 1 � � � � $750 3 20% 3 $375 60 $50 20 $500 1 $250 1 � � � $10,000 $10,000 $1,000 500 $500 30 $50 5 $50 5 $50 1 $50 2 $50 2 $1,000 3 20% 3 $500 60 $50 20 $500 1 $250 1 � � � $10,000 $10,000 $1,000 750 $750 30 $50 5 $50 5 $75 1 $50 2 $50 2 $1,500 3 20% 3 � � � � � � � � � � � $10,000 $10,000 $1,000 1000 $1,000 30 $75 5 $75 5 $100 1 $75 3 $75 3 � � 20% 3 � � � � � � � � � � � $10,000 $10,000 $1,000 *There is no coverage for a Pre-existing condition for a continuous period of 12 months following the effective date of a covered person under the Policy *There is a 30 day waiting period immediately following the Coverage Effective Date; does not apply to an injury. *Benefits are based on an annual period per insured from effective date. What is NCE? NCE is the National Congress of Employers, a national association that represents America\'s small and medium-sized businesses via networking, advocacy, and information sharing. The NCE seeks to provide it\'s members with reliable services, resources, and benefits regardless of one\'s circumstances or means. The NCE is committed to providing members with valuable benefits and superior customer service. Membership and insurance enrollment opportunities are offered to individuals and families. Membership Packet and ID Cards Once a successful payment has been processed with an application, members will instantly receive a Purchase Confirmation E-mail from NCE Member Services. The e-mail includes the NCE Membership Handbook, a sample certificate of insurance and additional information. Registration and login instructions for your individualized Member Services Portal will be received in a secondary e-mail. Pending Carrier approval of your application, your fulfillment packet will be placed in the mail by the carrier which will include the hard copy of the handbook and personalized Certificate of Insurance within 7-10 business days from enrollment. Harmony Care Monthly Membership The billing statement will reflect the monthly premium for health benefits as well as the NCE association membership. Rates do not include an association one-time, non-refundable enrollment fee, which is processed at the time of enrollment. Effective dates vary based on enrollment date. The initial premium draft, inclusive of the non-refundable, one-time enrollment fee, is processed the day of enrollment. Future drafts occur once a month, approximately every 30 days. Please make sure you have sufficient funds before you enroll. Credit cards and bank automatic draft is available. What is Limited Medical Coverage? A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services. Great when looking to supplement a higher deductible Major Medical plan Who is Eligible? Adult members, aged 18-65 Dependent Children, age 1-25 Harmony Care - GapAfford Plus - NCE Membership Benefits GapAfford Plus The GapAfford Plus Program is a great way for individuals and families to save money on out-of-pocket medical expenses. Your savings start from the first dollar, with no limits. Our cost savings program gives members access to pre-negotiated, lowered rates. There are no: Deductibles Pre-existing condition limitations Medical exams Claim forms Limitation on usage Age restrictions Prescription Discount Benefits Use our discount Rx card and save an average of 15% on brand-name and 55% on generic medications at participating pharmacies.All FDA approved drugs are discounted with the card. Even lifestyle drugs can be obtained at greatly reduced rates. The pharmacy network is national in scope. Cards can be used for all family members. There is no limit on the number of prescriptions filled. No forms to fill out. You do not have to activate the card. The card can be used over and over. Simply present your member ID card to the pharmacist, along with your prescription to receive the discounts. The Aetna Dental Access Network As a member of the GapAfford Plus program, you and your family have access to a national network of over 132,000 available dental practice locations through one of the largest dental discount networks in America, the Aetna Dental Access Network. Participating dental locations provide savings that range from 15-50% per visit, on average, on dental services including cleanings, x-rays, fillings, root canals, crowns, bridges and orthodontia. Advantages of this discount program: No pre-existing condition exclusions No benefit maximum Cosmetic dentistry included Orthodontia always included Can be used in addition to dental insurance or enhance existing insurance The OUTLOOK Vision Network We have contracted with over 10,000 eye care locations nationwide. The OUTLOOK Vision provider panel includes ophthalmologists, optometrists, independent optical centers and national chain locations. The vision program provides: Savings of 10% to 50% on most prescription eyeglasses, frames, and lenses, through a national network of over 10,000 independent and chain vision optical centers. 10% to 30% discounts on medical eye exams and surgical procedures, such as PRK and LASIK (where available and approved). Pet Rx About 50% of the medications prescribed by your vet are actually the same medications prescribed to people, only in different dosages. You can fill these prescriptions at your neighborhood pharmacy. We have even made arrangements with a US FDA-approved specialty, mail-order pharmacy to fill those special medications and compounds not available at your local pharmacy. Alternative Medicine Save an average of 25% at over 8,000 trained, qualified, and fully credentialed providers nationwide including acupuncture, massage and other integrated wellness therapies. Chiropractic Care Program offers a free initial consultation and up to 50% savings on diagnostic services and x-rays (if necessary), and unlimited treatments at 30% savings from a national network of over 12,000 chiropractors. Hearing Savings Program Receive customized care and, if needed, purchase brand name hearing aids at substantial savings. Save 20% to 50% off Manufacturer\'s Suggested Retail Pricing. Imaging Savings Program Our network providers can save members an average of 60% off of the usual cost for advanced radiology testing, such as Magnetic Resonance Imaging (MRI) and Computerized Tomography (CT) scans. Medical Bill Negotiations Members can save on their existing medical bills. Patient advocates work on your behalf to protect your interest and save you money. No minimum bill requirement. Medical Supplies and Equipment Save from 20% to 50% off your medical supply needs. Items include',
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
    rawText: 'Limited Benefit Health Insurance Plans Limited Benefit Insurance underwritten by: American Financial Security Life Insurance Co. Group Policy Form AF FI Policy 721 issued to the National Congress of Employers AFS LM 721 SCP BR Sigma Care Plus Benefit Description Hospital Confinement Benefit Per Day Max Day Primary Care Doctors Office Visit Benefit Per Day Max Day Specialty Care Doctors\' Office Visit Benefit Per Day Max Day Emergency Room Benefit Per Day Max Day Basic Pathology & Radiology Benefit* Per Day Max Day Advance Studies Benefit* Per Day Max Day Surgery Benefit Per Day Max Day Anesthesia Benefit Mental Health Inpatient Benefit Per Day Max Day Per Day Max Day Mental Health Outpatient Benefit Supplemental Accident Inpatient Admission Benefit Supplemental Accident Emergency Room Benefit Hospital Intensive Care Unit Benefit Additional Hospital Admission Benefit Per Day Max Day Per Day Max Day Per Day Max Day Per Day Max Day Per Admission Max Day Accidental Death Benefit Critical Illness Maximum Benefit 100A $100 30 $50 3 $50 3 - - - - 100 $100 30 $50 3 $50 3 $50 1 - $10,000 - 200 $200 30 $50 5 $50 5 $50 1 $50 1 $50 1 - - $10,000 200+ $200 30 $50 5 $50 5 $50 2 $50 3 $50 3 $400 3 20% 3 $10,000 $1,000 300 $300 30 $50 5 $50 5 $50 1 $400 3 20% 3 $150 60 $50 20 $500 1 $250 1 - $10,000 $1,000 500 $500 30 $50 5 $50 5 $50 1 $50 2 $50 2 $750 3 20% 3 $250 60 $50 20 $500 1 $250 1 - $10,000 $1,000 750 $750 30 $50 5 $50 5 $75 1 $50 2 $50 2 $1000 3 20% 3 $375 60 $50 20 $500 2 $250 1 $10,000 $1,000 1000 $1000 30 $75 5 $75 5 $100 1 $75 3 $75 3 $1500 3 20% 3 $500 60 $50 20 $500 3 $250 1 - $10,000 $1,000 *There is no coverage for a Pre-existing condition for a continuous period of 12 months following the effective date of a covered person under the Policy *Benefits are based on an annual period per insured from effective date. 2 � Sigma Care Plus *There is a 30 day waiting period immediately following the Coverage Effective Date; does not apply to an injury. Limited Medical Benefit Policy v1 What is NCE? NCE is the National Congress of Employers, a national association that represents America\'s small and medium-sized businesses via networking, advocacy, and information sharing. The NCE seeks to provide it\'s members with reliable services, resources, and benefits regardless of one\'s circumstances or means. The NCE is committed to providing members with valuable benefits and superior customer service. Membership and insurance enrollment opportunities are offered to individuals and families. Membership Packet and ID Cards Once a successful payment has been processed with an application, members will instantly receive a Purchase Confirmation E-mail from NCE Member Services. The e-mail includes the NCE Membership Handbook, a sample certificate of insurance and additional information. Registration and login instructions for your individualized Member Services Portal will be received in a secondary e-mail. Pending Carrier approval of your application, your fulfillment packet will be placed in the mail by the carrier which will include the hard copy of the handbook and personalized Certificate of Insurance within 7-10 business days from enrollment. Sigma Care Plus Monthly Membership The billing statement will reflect the monthly premium for health benefits as well as the NCE association membership. Rates do not include an association one-time, non-refundable enrollment fee, which is processed at the time of enrollment. Effective dates vary based on enrollment date. The initial premium draft, inclusive of the non-refundable, one-time enrollment fee, is processed the day of enrollment. Future drafts occur once a month, approximately every 30 days. Please make sure you have sufficient funds before you enroll. Credit cards and bank automatic draft is available. What is Limited Medical Coverage? A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services. Great when Looking to supplement a higher deductible Major Medical plan Who is Eligible? Adult members, aged 18-65 Dependent Children, age 1-25 3 � Sigma Care Plus Limited Medical Benefit Cash Policy v1 Sigma Care Plus GapAfford Plus - NCE Membership Benefits GapAfford Plus The GapAfford Plus Program is a great way for individuals and families to save money on out-of-pocket medical expenses. Your savings start from the first dollar, with no limits. Our cost savings program gives members access to pre-negotiated, lowered rates. There are no: � Deductibles � Pre-existing condition limitations � Medical exams � Claim forms � Limitation on usage � Age restrictions Prescription Discount Benefits Use our discount Rx card and save an average of 15% on brand-name and 55% on generic medications at participating pharmacies. All FDA approved drugs are discounted with the card. Even lifestyle drugs can be obtained at greatly reduced rates. The pharmacy network is national in scope. Cards can be used for all family members. There is no limit on the number of prescriptions filled. No forms to fill out. You do not have to activate the card. The card can be used over and over. Simply present your member ID card to the pharmacist, along with your prescription to receive the discounts. The Aetna Dental Access Network As a member of the GapAfford Plus program, you and your family have access to a national network of over 132,000 available dental practice locations through one of the largest dental discount networks in America, the Aetna Dental Access Network. Participating dental locations provide savings that range from 15-50% per visit, on average, on dental services including cleanings, x-rays, fillings, root canals, crowns, bridges and orthodontia. Advantages of this discount program: No pre-existing condition exclusions No benefit maximum Cosmetic dentistry included Orthodontia always included Can be use in addition to dental insurance or enhance existing dental insurance The OUTLOOK Vision Network We have contracted with over 10,000 eye care locations nationwide. The OUTLOOK Vision provider panel includes ophthalmologists, optometrists, independent optical centers and national chain locations. The vision program provides: Savings of 10% to 50% on most prescription eyeglasses, frames, and lenses, through a national network of over 10,000 independent and chain vision optical centers. 10% to 30% discounts on medical eye exams and surgical procedures, such as PRK and LASIK (where available and approved). Pet Rx About 50% of the medications prescribed by your vet are actually the same medications prescribed to people, only in different dosages. You can fill these prescriptions at your neighborhood pharmacy. We have even made arrangements with a US FDA-approved specialty, mail-order pharmacy to fill those special medications and compounds not available at your local pharmacy. Alternative Medicine Save an average of 25% at over 8,000 trained, qualified, and fully credentialed providers nationwide including acupuncture, massage and other integrated wellness therapies. Chiropractic Care Program offers a free initial consultation and up to 50% savings on diagnostic services and x-rays (if necessary), and unlimited treatments at 30% savings from a national network of over 12,000 chiropractors. Hearing Savings Program Receive customized care and, if needed, purchase brand name hearing aids at substantial savings. Save 20% to 50% off Manufacturer\'s Suggested Retail Pricing. Imaging Savings Program Our network providers can save members an average of 60% off of the usual cost for advanced radiology testing, such as Magnetic Resonance Imaging (MRI) and Computerized Tomography (CT) scans. Medical Bill Negotiations Members can save on their existing medical bills. Patient advocates work on your behalf to protect your interests and save you',
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
    rawText: 'NCE Health Choice Silver Limited Benefit Health Insurance Plans Limited Benefit Insurance underwritten by: American Financial Security Life Insurance Co. Limited Medical Benefit Cash Policy v1 NCE Health Choice Plus � 1 NCE Health Choice Silver Benefit Decription Hospital Confinement Benefit Per Day Max Day Primary Care Doctors Office Visit Benefit Per Day Max Day Specialty Care Doctors\' Office Visit Benefit Per Day Max Day Emergency Room Benefit Per Day Max Day Basic Pathology & Radiology Benefit* Per Day Max Day Advance Studies Benefit* Per Day Max Day Surgery Benefit Per Day Max Day Anesthesia Benefit Per Day Max Day Mental Health Inpatient Benefit Per Day Max Day Mental Health Outpatient Benefit Per Day Max Day Supplemental Accident Inpatient Admission Benefit Per Day Max Day Supplemental Accident Emergency Room Benefit Per Day Max Day Hospital Intensive Care Unit Benefit Per Day Max Day Additional Hospital Admission Benefit Per Admission Max Day Accidental Death Benefit Critical Illness Maximum Benefit * Benefits are based on an annual period per insured from effective date. 100A 100 200 200+ 300 500 750 1000 1000+ $100 30 $50 3 $50 3 - $100 30 $50 3 $50 3 $50 1 1 1 - $200 30 $50 5 $50 5 $50 1 $50 1 $50 1 - $200 30 $50 5 $50 5 $50 2 $50 3 $50 3 50% 3 20% 3 - $300 30 $50 5 $50 5 $50 1 50% 3 20% 3 $150 60 $50 20 $500 1 $250 1 - $500 30 $50 5 $50 5 $50 1 $50 2 $50 2 70% 3 20% 3 $250 60 $50 20 $500 1 $250 1 - $750 30 $50 5 $50 5 $75 1 $50 2 $50 2 80% 3 20% 3 $375 60 $50 20 $500 2 $250 1 - $1000 30 $75 5 $75 5 $100 1 $75 3 $75 3 100% 3 20% 3 $500 60 $50 20 $500 3 $250 1 - $1000 30 $100 5 $100 5 $200 1 $100 3 $200 3 100% 3 25% 3 $500 60 $50 20 $500 3 $250 1 $1000 15 $1000 5 $10,000 $10,000 $10,000 $10,000 $10,000 $10,000 $10,000 $10,000 $10,000 n/a n/a n/a $1,000 $1,000 $1,000 $1,000 $1,000 $1,000 *There is a 30 day waiting period immediately following the Coverage Effective Date; does not apply to an injury. 2 � NCE Health Choice Silver Limited Medical Benefit Policyv1 NCE Health Choice Silver What is NCE? NCE is the National Congress of Employers, a national association that represents America\'s small and medium sized businesses via networking, advocacy, and information sharing. The NCE seeks to provide it\'s members with reliable services, resources, and benefits regardless of one\'s circumstances or means. The NCE is committed to providing members with valuable benefits and superior customer service. Membership and insurance enrollment opportunities are offered to individuals and families. Membership Packet and ID Cards Once a successful payment has been processed with an application, members will instantly receive a Purchase Confirmation E-mail from NCE Member Services. The e-mail includes the NCE Membership Handbook, a sample certificate of insurance and additional information. Registration and login instructions for your individualized Member Services Portal will be received in a secondary e-mail. Pending Carrier approval of your application, your fulfillment packet will be placed in the mail by the carrier which will include the hard copy of the handbook and personalized Certificate of Insurance within 7-10 business days from enrollment. Monthly Membership The rates reflect the monthly premium for health benefits as well as the NCE association membership. Rates do not include an association one-time, non-refundable enrollment fee, which is processed at the time of enrollment. Effective dates vary based on enrollment date. The initial premium draft, inclusive of the non-refundable, one-time enrollment fee, is processed the day of enrollment. Future drafts occur once a month, approximately every 30 days. Please make sure you have sufficient funds before you enroll. Credit cards and bank automatic draft is available. What is Limited Medical Coverage? A Limited Benefit Medical plan is not a comprehensive major medical plan, nor is it intended to replace a major medical plan. The plan is intended to provide you, and your covered dependents, with basic insurance coverage that is capped at specific amounts for specific services. Great When: � Major Medical is not an option � Major Medical is too costly � Looking to supplement a higher deductible Major Medical plan Who is Eligible? � Adults, 65 and older � Dependent Children, age 1-25 Limited Medical Benefit Cash Policy v1 NCE Health Choice Silver � 3 NCE Health Choice Silver GapAfford Plus - NCE Membership Benefits GapAfford Plus The GapAfford Plus Program is a great way for individuals and families to save money on out-of-pocket medical expenses. Your savings start from the first dollar, with no limits. Our cost savings program gives members access to pre-negotiated, lowered rates. There are no: � Deductibles � Pre-existing condition limitations � Medical exams � Claim forms � Limitation on usage � Age restrictions The OUTLOOK Vision Network We have contracted with over 10,000 eye care locations nationwide. The OUTLOOK Vision provider panel includes ophthalmologists, optometrists, independent optical centers and national chain locations. The vision program provides: � Savings of 10% to 50% on most prescription eyeglasses, frames, and lenses, through a national network of over 10,000 independent and chain vision optical centers. � 10% to 30% discounts on medical eye exams and surgical procedures, such as PRK and LASIK (where available and approved). Prescription Discount Benefits Use our discount Rx card and save an average of 15% on brand-name and 55% on generic medications at participating pharmacies. All FDA approved drugs are discounted with the card. Even lifestyle drugs can be obtained at greatly reduced rates. � The pharmacy network is national in scope. � Cards can be used for all family members. There is no limit on the number of prescriptions filled. � No forms to fill out. You do not have to activate the card. The card can be used over and over. Simply present your member ID card to the pharmacist, along with your prescription to receive the discounts. The Aetna Dental Access Network As a member of the GapAfford Plus program, you and your family have access to a national network of over 132,000 available dental practice locations through one of the largest dental discount networks in America, the Aetna Dental Access Network. Participating dental locations provide savings that range from 15-50% per visit, on average, on dental services including cleanings, x-rays, fillings, root canals, crowns, bridges and orthodontia. Advantages of this discount program: � No pre-existing condition exclusions � No benefit maximum � Cosmetic dentistry included � Orthodontia always included � Can be use in addition to dental insurance or enhance existing dental insurance Pet Rx About 50% of the medications prescribed by your vet are actually the same medications prescribed to people, only in different dosages. You can fill these prescriptions at your neighborhood pharmacy. We have even made arrangements with a US FDA-approved specialty, mail-order pharmacy to fill those special medications and compounds not available at your local pharmacy. Alternative Medicine Save an average of 25% at over 8,000 trained, qualified, and fully credentialed providers nationwide including acupuncture, massage and other integrated wellness therapies. Chiropractic Care Program offers a free initial consultation and up to 50% savings on diagnostic services and x-rays (if necessary), and unlimited treatments at 30% savings from a national network of over 12,000 chiropractors. Hearing Savings Program Receive customized care and, if needed, purchase brand name hearing aids at substantial savings. Save 20% to 50% off Manufacturer\'s Suggested Retail Pricing. Imaging Savings Program Our network providers can save members an average of 60% off of the usual cost for advanced radiology testing, such as Magnetic Resonance Imaging (MRI) and Computerized Tomography (CT) scans. Medical Bill Negotiations Members can save on their existing medi',
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
    rawText: 'Everest Reinsurance Company Offered Through: NCE Carrier: Everest Insurance Type: Group Fixed Indemnity Insurance Provider Options: Multiplan PPO Network For Agent Use Only MEDICAL EXPENSES CAN ADD UP QUICK. IS YOUR CLIENT PROTECTED? Accidents and illnesses can happen when they least expect it. Their focus should be on their health--not their wallet. But even after their medical insurance pays its portion, they could be facing unplanned bills for deductibles, copays, and coinsurance. Everest provides fixed payments that can help them manage these costs by providing a cash benefit for covered expenses. They can use the money however they wish, so they can focus on their recovery, not their bills. How does Group Indemnity Insurance Work? Group Indemnity Insurance can supplement existing coverage and provide cash to help cover medical and living expenses. Below is an example of how benefits might be paid under Plan 1000+.* Indemnity A 35-year-old woman gets into an accident and must go to Insurance the Emergency Room. She spends 2 days in the Hospital and Provides fixed upon release, a follow up appointment with her doctor. payments to help manage Hospital admission benefit expenses arising ER admission benefit $1,000 $100 from a medical Hospital confinement benefit $2000 cost. Physician office benefit $75 TOTAL $3,175 *Payouts are estimates and not guaranteed. The examples shown may vary from the plan offering. Your individual experience may also vary. Benefits paid are determined based on individual situations. Terms, conditions, and exclusions apply. See full policy for details. How might they use these benefits? Payments can be used for major medical copays and deductibles, or even things like transportation, child care, housekeeping help, or whatever else you may need. How they use the money is up to them! Why Everest Group Indemnity Insurance ? Multiplan PPO Network Benefits are paid directly to you to spend as you see fit Fast payment with simplified claims process Some states may have minimum coverage requirements. See policy documents for a complete description of benefits, exclusions, limitations, and conditions of coverage. Features and availability vary by location, and are subject to change. EVEREST PRODUCTS ARE LIMITED BENEFIT POLICIES--READ YOUR POLICY CAREFULLY. THESE POLICIES ARE NOT MAJOR MEDICAL INSURANCE AND ARE NOT INTENDED TO BE A SUBSTITUTE FOR MAJOR MEDICAL COVERAGE. For Agent Use Only Group Fixed Indemnity Plan Details Benefit Eligibility Pre-existing Condition Limitation Underwriting Level Confinement Benefits Hospital Confinement ICU Confinement Hospital Benefits Hospital Admission Emergency Room Plan 100 12-12 Pre-Existing Conditions Guaranteed Issue 30 Days Per Confinement/ 90 Days Per Certificate Year $100 $100 Emergency Room 2 per certificate year N/A $50 N/A Plan 200 Plan 200+ Plan 300 12-12 Pre-Existing Conditions Guaranteed Issue 30 Days Per Confinement/ 90 Days Per Certificate Year $200 $200 Emergency Room 2 per certificate year N/A $50 N/A 12-12 Pre-Existing Conditions 12-12 Pre-Existing Conditions Guaranteed Issue Guaranteed Issue 30 Days Per 30 Days Per Confinement/ 90 Days Per Confinement/ 90 Days Per Certificate Year Certificate Year $200 $300 $200 $300 Emergency Room 2 per Emergency Room 2 per certificate year N/A certificate year N/A $50 $50 Surgery-3 maximum days per certificate year (maximum Surgery-3 maximum days per certificate year (maximum days are shared between inpatient days are shared between inpatient and outpatient) and outpatient) Procedure Benefits Surgery Anesthesia Outpatient Benefits Lab X-Rays Advanced Diagnostic Physician\'s Office N/A N/A Physicians\'s Office-3 per certificate year N/A N/A N/A $50 N/A N/A X-Rays & Labs-4 covered days per certificate year/Advanced Diagnosticcovered days per certificate year/Physicians\'s Office- 3 per certificate year Combined Inpatient & Outpatient $250 per day 25% X-Rays & Labs-4 covered days per certificate year/Advanced Diagnosticcovered days per certificate year/Physicians\'s Office- 3 per certificate year Combined Inpatient & Outpatient $250 per day 25% Physicians\'s Office-3 per certificate year $50 $50 N/A $50 $50 N/A $50 $50 N/A $50 $50 $50 This coverage contains a Pre-Existing Condition Exclusion. Pre-Existing Condition means a condition for which a Covered Person received medical treatment, diagnosis, care or advice, including diagnostic tests or medications, during the months prior to the Covered Person\'s effective date of coverage. There is no cancel age. There is not chiropractic or acupuncture coverage. Benefits are per person. Policy terms, conditions, exclusions and limitations may vary by state. This product may not be available in all states. See Certificate for details. For Agent Use Only Group Fixed Indemnity Plan Details Benefit Eligiblity Pre-existing Condition Limitation Underwriting Level Confinement Benefits Hospital Confinement ICU Confinement Hospital Benefits Hospital Admission Emergency Room Procedure Benefits Surgery Anesthesia Outpatient Benefits Lab X-Rays Advanced Diagnostic Physician\'s Office Plan 500 Plan 750 Plan 1000 Plan 1000+ 12-12 Pre-Existing Conditions Guaranteed Issue 30 Days Per Confinement/ 90 Days Per Certificate Year $500 $500 Emergency Room 2 per certificate year N/A $50 Surgery-3 maximum days per certificate year (maximum days are shared between inpatient and outpatient) 12-12 Pre-Existing Conditions Guaranteed Issue 30 Days Per Confinement/ 90 Days Per Certificate Year $750 $750 12-12 Pre-Existing Conditions Guaranteed Issue 30 Days Per Confinement/ 90 Days Per Certificate Year $1000 $1000 Emergency Room 2 per certificate year Emergency Room 2 per certificate year N/A $75 Surgery-3 maximum days per certificate year (maximum days are shared between inpatient and outpatient) N/A $100 Surgery-3 maximum days per certificate year (maximum days are shared between inpatient and outpatient) 12-12 Pre-Existing Conditions Guaranteed Issue 30 Days Per Confinement/ 90 Days Per Certificate Year $1000 $1000 Hospital Admission-5 per certificate year/Emergency Room- 2 per certificate year $1,000 $100 Surgery-3 maximum days per certificate year (maximum days are shared between inpatient and outpatient) Combined Inpatient & Outpatient, $350 per day 25% X-Rays & Labs-8 covered days per certificate year/Advanced Diagnostic-6 covered days per certificate year/Physicians\'s Office- per certificate year Combined Inpatient & Outpatient, $400 per day 25% X-Rays & Labs-8 covered days per certificate year/Advanced Diagnostic-6 covered days per certificate year/Physicians\'s Office5 per certificate year Combined Inpatient & Outpatient, $500 per day 25% Combined Inpatient & Outpatient, $500 per day 25% X-Rays & Labs-12 covered days per X-Rays & Labs-12 covered days per certificate year/Advanced Diagnostic- certificate year/Advanced Diagnostic- 6 covered days per certificate 6 covered days per certificate year/Physicians\'s Office-5 per year/Physicians\'s Office-5 per certificate year certificate year $50 $50 $75 $100 $50 $50 $75 $100 $50 $50 $75 $100 $50 $50 $75 $75 This coverage contains a Pre-Existing Condition Exclusion. Pre-Existing Condition means a condition for which a Covered Person received medical treatment, diagnosis, care or advice, including diagnostic tests or medications, during the months prior to the Covered Person\'s effective date of coverage. There is no cancel age. There is not chiropractic or acupuncture coverage. Benefits are per person. Policy terms, conditions, exclusions and limitations may vary by state. This product may not be available in all states. See Certificate for details.. For Agent Use Only Everest FAQ\'s What is Group Fixed Indemnity Insurance? A group fixed indemnity insurance policy is a supplemental health plan that pays a set amount of money for specific covered medical expenses. It\'s also known as indemnity insurance, fixed benefit insurance, or fee for service insurance. Where can I find participating pr',
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
    rawText: 'MBR is a service that combines medical bill repricing, healthcare advocacy, and bill negotiation into one. With MBR PLUS, members have the flexibility to seek medical care from any licensed healthcare provider. Members pay a $25 Pre-Pay for Primary Care Office Visits. (See page 2 for details) Concierge Style Healthcare Advocacy Medical Bill Repricing and Direct Bill Negotiations Guidance on how to obtain Financial Assistance. At MBR, our mission is to serve as a concierge-style service, helping our members navigate the complex and often overwhelming healthcare system. We strive to ensure that you receive the highest quality care at the most competitive prices. To that end, we offer bill negotiation services to assist our members in lowering their medical bills. Our dedicated support team is committed to guiding you through the entire process, from financial aid to negotiating your bills directly. While we cannot guarantee the outcome of any claim or bill, our team of experts is dedicated to making your experience as stress-free and enjoyable as possible. Our system, known as the Reference Based Pricing System, reprices healthcare bills to between 150% to 200% of the "Medicare Allowable Rates." This approach is widely accepted in the Healthcare Self-Insured Group Marketplace, with over 70% of employer groups in America using it to lower medical service rates. By utilizing this costcontainment method, we can typically achieve even lower provider fees and reduce out-of-pocket medical expenses for our members, often surpassing the savings offered by common PPO networks. MBR PLUS Members receive significant discounts on all medical bills submitted by doctors or hospitals who agree to participate in our Referenced Based Pricing system. HOW IT WORKS FIRST we recommend that you call MBR prior to visiting a provider, so our team can provide all necessary documents and instructions. This is not required. SECOND Visit your provider and show them your MBR card at the time of service. THIRD Pay a $25 Pre-Pay for Primary Care Office Visits and $50 Pre-Pay for Specialist Office Visits and then your provider should mail all remaining medical bills to MBR for repricing. FOURTH You should complete your insurance claim forms to receive Insured Benefits. The MBR team can provide those forms and provide instructions on how to complete them. FIFTH Once bills are submitted for repricing, both you and your healthcare provider will receive a detailed Explanation of Benefits (EOB) from MBR through traditional mail. This document will specify the billed amount and any discounts applied. LASTLY You should expect to receive a final bill from your medical provider, which should align with the amount due on the EOB you have already received. Additionally, your insurance company may provide you with additional funds to help cover any outstanding balances. Remember, the MBR team is here to help you through the entire process. If you require assistance, feel free to contact MBR\'s dedicated support team at 877-278-4668. MBR helps lower medical bills by utilizing PPO Networks, Referenced Based Pricing, and Direct Bill Negotiation. Please note that while we strive to help, we cannot guarantee the outcome of any claim or the amount of savings on any bill. Medical providers may decline to honor this service. BWA BUSINESS WORKERS OF AMERICA ASSOCIATK>N C Directlabs SERIOUS MEDICAL CONDITIONS SUCH AS HEART DISEASE, PROSTATE CANCER, DIABETES, THYROID DISEASE AND MORE, CAN GO UNDETECTED FOR UP TO TWO YEARS-WITHOUT NOTICEABLE SYMPTOMS. THE EARLIER A PROBLEM IS DETECTED, THE EASIER AND MORE LIKELY IT IS TO BE TREATABLE. YOU NOW HAVE DIRECT ACCESS TO MAJOR CLINICAL LABS ACROSS THE USA* FOR THOSE IMPORTANT BLOOD TESTS - AND AT DISCOUNTED PRICES. TAKE CHARGE OF YOUR HEALTH AND FITNESS TODAY! IT IS SIMPLE: A DOCTOR\'S APPOINTMENT IS NOT NECESSARY. ALL BLOOD TESTS ARE OFFERED AT A SAVINGS OF UP TO 80% OFF TYPICAL LAB COSTS AND THROUGH THE SAME CUA-CERTIFIED ACCREDITED LABS USED BY YOUR PHYSICIAN. DIRECTLABS SERVICES INCLUDE: BLOOD, URINE, SALIVA, HAIR AND FECAL TESTS. ORDERING ONLINE 0 Create Account: Go to https://directlabs.com/4members and click Register at the top right corner. Complete the information and submit your registration. 0 Your MyDLS account will allow you to place orders, sign HIPAA forms. print requisitions. and view and print results, all online. Keep your username and password that you created in a safe place. 0 Print your Documents: After ordering your tests, DirectLabs� will generate a requisition and upload it to your online account. An email will be sent notifying you that it is available for you to print. If an "at home" kit is ordered, it will be mailed to the address provided in the order. 0 Go to Lab Location: Using the Lab Locator**. find a patient service center location convenient to your home or work. 0 Results: Results are available online withing 24-48 hours for most tests. You will receive an email letting you know when they are available. If you would like your results sent to yourHealth Care Provider, you must log into your account and submit the HIPAA form. ORDERING BY PHONE 0 Call l-800-908-0000 and provide code R-CALSTAR. 0 Your MyDLS account will be created for you automatically and you will receive an email with your username and password to access your account. You will provide your personal information for your order along with your credit card information for payment. 0 Print your Documents: After ordering your tests, DirectLabs� will generate a requisition and upload it to your online account. An email will be sent notifying you that it is available for you to print. If an "at home" kit is ordered, it will be mailed to the address provided in the order. G) Go to Lab Location: Using the Lab Locator**, find a patient service center location convenient to your home or work. 0 Results: Results are available online withing 24-48 hours for most tests. You will receive an email letting you know when they are available. If you would like your results sent to your Health Care Provider, you must log into your account and submit the HIPAA form. . PRESCRIPTION SAVINGS! Free Rx Coupon Card Free Rx Drug Card,CCoommplpimliemntes noft:s of: PROGRAM HIGHLIGHTS Save up to 80% on prescriptions Free pharmacy coupon card Accepted at over 68,000 pharmacies nationwide Discounts on brand & generic drugs No restrictions & HIPAA compliant The card below is pre-activated and can be used immediately to save up to 80% on your prescription drugs. � Bring the discount coupon card to your pharmacy. � � Present the coupon card to the pharmacist when paying. � � Save on your prescriptions! � FRONT THIS PROGRAM IS NOT INSURANCE. BACK Health Wearhouse.com America\'s Trusted Online Pharmacy BWA is proud to partner with HealthWarehouse to provide affordable prices on prescription medications SAVE 30 TO 90% ON YOUR PRESCRIPTION MEDICATION HOW TO ORDER: CHECK YOUR MEDICATION PRICES ONLINE OR GIVE US A CALL 888 - 706 - 7608 HTTPS://TRY.HEALTHWAREHOUSE.COM/BWA/ With our focus on technology and sourcing, we are able to remove layers of cost between the manufacturer and the customer. Our proprietary software allows us to process prescription products efficiently and cost effectively. We don\'t have the substantial overhead costs of traditional retail pharmacy chains, nor the requirement to artificially keep prescription drug costs higher in order to maintain insurance reimbursements. Therefore, we are able to keep our cost low, and pass along the savings to our patients! HealthWarehouse is here for you through Compassion, Convenience, and Transparency. � Hospital Indemnity Insurance Prepared for: Business Workers of America � Group Hospital Insurance A hospital stay can be expensive. Are you protected? Accidents and illnesses can happen when you least expect it. Your focus should be on your health--not your wallet. But even after your medical insurance pays its portion, you could be facing unplanned',
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
    rawText: 'MEMBERSHIP PACKAGE OUR MISSION The mission of the Business Workers of America Association, a not-for-profit member association founded in 2001, is to assist in improving the lives of American workers and their families. The association will accomplish this mission through thefollowing activities and/or services: Providing valuable information and education about their trade or profession Representing American Worker\'s interest in influencing both Federal and State legislation that will directly benefit the individuals and their families in attaining a better lifestyle, higher incomes, lower cost of health care or supplemental health benefits Supporting trade colleges or institutions that provide free or low cost higher education and skill training programs Providing scholarships or grants to members or family members who want to attend a college or trade school that will teach them a skill or trade and allow them to enter an apprentice or startup professional program Directing and assisting members to federal or state programs available to them that would aid in acquiring financial assistance and improving their life opportunities Making available health care, supplemental benefits and wellness programs that would improve their family\'s overall health and wellness Supporting institutions that educate and train workers to better accomplish the demands of their workplace or profession Supporting the charities that are dedicated to accomplishing the same goals and mission of the association ASSOCATION BENEFITS AS A MEMBER OF BWA you and your family are entitled to a package of benefits and services. This booklet outlines the benefits included with your membership. MBR simplifies the process when visiting a Primary Care Doctor or Specialist. $25 pre-pay for Primary Care Office Visits. $25 pre-pay for Urgent Care Facility Visits. Most Urgent Care Facilities provide consultations, lab testing, x-rays and more. $50 pre-pay for Specialist Doctor Visits. *Choose a network physician for maximum savings To locate a PHCS network provider, call 888-371-7427 or visit www.MultiPlan.com MBR helps lower medical bills by utilizing PPO Networks, Reference-Based Pricing, and Direct Bill Negotiation. Please note that while we strive to assist, we cannot guarantee the outcome of any claim or the amount of savings on any bill. *A majority of the time, MBR reprices bills to amounts exceeding Medicare\'s allowable rate, but medical providers may still decline to honor this service. Please have your provider call MBR at 877-278-4668 with any questions they may have. MBR-062524-198 Members receive significant discounts on all medical bills submitted by doctors or hospitals who agree to participate in our Referenced Based Pricing system. HOW IT WORKS 1st FIRST we recommend that you call MBR prior to visiting a provider, so our team can provide all necessary documents and instructions. This is not required. 2nd SECOND Visit your provider and show them your MBR card at the time of service. 3rd THIRD Pay a $25 Pre-Pay for Primary Care Office Visits and $50 Pre-Pay for Specialist Office Visits and then your provider should mail all remaining medical bills to MBR for repricing. 4th 5th FOURTH You should complete your insurance claim forms to receive Insured Benefits. The MBR team can provide those forms and provide instructions on how to complete them. FIFTH Once bills are submitted for repricing, both you and your healthcare provider will receive a detailed Explanation of Benefits (EOB) from MBR through traditional mail. This document will specify the billed amount and any discounts applied. 6th SIXTH You should expect to receive a final bill from your medical provider, which should align with the amount due on the EOB you have already received. Additionally, your insurance company may provide you with additional funds to help cover any outstanding balances. Remember, the MBR team is here to help you through the entire process MBR-062524-198 Additional MBR Services MANAGED CARE Q. What is the Primary Service Managed Care Provides? A. MBR will help reprice and reduce medical providers bills. Q. How Does MBR Reprice Medical Bills? A. MBR uses one of the nation\'s largest provider networks to provide members with access to quality, affordable health care. Members have access to more than 5,500 hospitals, over 164,000 ancillary facilities, and over 1.3 million health care providers in the United States, including Puerto Rico. The network covers over 95% of the US population. Q. What are the Advantages for the Member? A. Helps reduce out of pocket cost for the member. WHITE GLOVE ADVOCACY Q. What is the Primary Service White Glove Advocacy Provides? A. Advocacy medical specialists assists members both before and after visiting a provider. Q. How Does Advocacy Assist Members? A. MBR Advocacy Specialists can help members find a low-cost provider in advance of their visit. For members who have a remaining balance on their medical bills after discounts and insurance benefits are applied, MBR Advocates negotiate with hospital or providers to help reduce the balance. Q. What Other Service Does White Glove Advocacy Perform? A. Advocates negotiate to reduce any medical bill balance after insurance is applied. They use advanced software technology, and their expertise in billing rules and financial assistance to sometimes even eliminate the remaining balance completely. To locate a PHCS network provider, call 888-371-7427 or visit www.MultiPlan.com MBR-062524-198 Are you financially prepared? Hospital indemnity insurance may help cover the costs of an unexpected illness or serious accident that results in a hospital stay, outpatient surgery or treatment in a doctor\'s office. Focus on recovery, not your finances, with a hospital indemnity plan from APL. How it works 1 CHOOSE the plan that best helps protect you and your family. 12 RECEIVE treatment in a covered facility. 3 FILE your claim online or mail it in. You\'ll receive benefit funds to use however you wish. Key features � You may be covered for doctor\'s office visits, urgent care, outpatient surgery, hospital stays and more! � You decide how to use the benefit funds-for medical and non-medical expenses � Guarantee Issue with no medical questions or exams � Cost-effective premiums with convenient payroll deduction THE INSURANCE POLICY UNDER WHICH THIS CERTIFICATE IS ISSUED IS NOT A POLICY OF WORKERS\' COMPENSATION INSURANCE. YOU SHOULD CONSULT YOUR EMPLOYER TO DETERMINE WHETHER YOUR EMPLOYER IS A SUBSCRIBER TO THE WORKERS\' COMPENSATION SYSTEM. I Summary of Benefits for Business Workers of America Assn. HSA Compatible Spouse Coverage Dependent Child(ren) Coverage Pre-Existing Condition Period/Pre-Existing Condition Exclusion Period Pregnancy Coverage Hospital Admission Benefit Hospital Confinement Benefit Intensive Care Unit Admission Benefit Intensive Care Unit Benefit No Available Available Not applicable Plan 2 Included $750 per day; max of 1 day(s) $200 per day; max of 30 day(s) $1,500 per day; max of 1 day(s) $350 per day; max of 30 day(s) Accident & Sickness Surgery Benefit Inpatient Surgery Outpatient Surgery in a Hospital, Outpatient Facility or Freestanding Outpatient Surgery Center General Anesthesia Benefit $500 per day; max of 1 day(s) $300 per day; max of 1 days(s) $125 per day Outpatient Accident & Sickness Treatment Benefit Emergency Room $200 per day; max of 2 day(s) Urgent Care Facility Physician\'s Office $50 per day; max of 3 day(s) $50 per day; max of 3 day(s) Physical, Speech or Occupational Therapy Facility $15 per day; max of 5 days(s) APSB-22552(TXas)-0122 MedChoiceTM Group Hospital Indemnity Insurance APL. Additional Rider(s) Portability Option Rider Occupational Exclusion Rider Continuity of Coverage Amendment Rider (Takeover) Plan 2 Included Not included Included, credit given for time served under prior coverage for: Pre-Existing Condition Period Additional Treatment Treatment for Serious Mental Illness Treatment for',
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
    rawText: 'Page |0 A Guide to Your Health Benefits Smart Choice 2500 Limited Medical $2,500 / $5,000 Individual / Family Deductible $9,200 / $18,400 Individual / Family Max Out of Pocket Network: First Health Effective: 6/1/2025 Note: The deductible year may differ from the plan year. Please contact your benefits administrator to confirm which deductible period applies to your plan. Page |1 Table of Contents TABLE OF CONTENTS ....................................................................................................................................... 1 BENEFIT SUMMARY.............................................................................................................................................. 5 PRESCRIPTION BENEFITS............................................................................................................................................ 9 CONTACT INFORMATION .................................................................................................................................. 10 MEMBER SERVICES...................................................................................................................................................... 10 GUIDECM (PRECERTIFICATION AND CASE MANAGEMENT) ............................................................................................. 10 NAVICLAIM (MEMBER ADVOCATES) ............................................................................................................................. 10 SCRIPTAIDE (PATIENT ASSISTANCE PROGRAM & PATIENT IMPORTATION PROGRAM) ....................................................... 10 VENDOR CONTACT INFORMATION .................................................................................................................. 11 GREEN IMAGING ........................................................................................................................................................... 11 DIATHRIVE................................................................................................................................................................... 11 CONNECTDME............................................................................................................................................................. 11 INTRODUCTION .................................................................................................................................................. 12 THIS DOCUMENT IS YOUR SUMMARY PLAN DESCRIPTION (SPD) ...................................................................................... 12 HOW TO USE THIS DOCUMENT..................................................................................................................................... 12 ABOUT YOUR I.D. CARD ............................................................................................................................................... 12 SCHEDULE OF BENEFITS AND BENEFITS SUMMARY........................................................................................................ 12 YOUR RIGHTS AND RESPONSIBILITIES AS A MEMBER ..................................................................................................... 13 You have the right to: .......................................................................................................................................... 13 You have the responsibility to:............................................................................................................................ 13 THE PLAN AND HOW IT WORKS ....................................................................................................................... 14 ABOUT THE PLAN ....................................................................................................................................................... 14 HOW THE NETWORK WORKS....................................................................................................................................... 15 USING OUT-OF-NETWORK PROVIDERS: ......................................................................................................................... 15 Exception ............................................................................................................................................................. 15 HOW THE PLAN COMPONENTS WORK........................................................................................................................... 15 Allowable Charge ................................................................................................................................................ 16 Coinsurance ......................................................................................................................................................... 16 Copayment (Copay)............................................................................................................................................. 16 Deductible* .......................................................................................................................................................... 16 Out-of-pocket Limit* ........................................................................................................................................... 16 Utilization Review ............................................................................................................................................... 16 Preauthorization Requirements ......................................................................................................................... 17 Expansion of Benefits .......................................................................................................................................... 17 Continuity of Care................................................................................................................................................ 17 PREAUTHORIZATION REQUIREMENTS ........................................................................................................... 18 PREAUTHORIZING PROCESS.......................................................................................................................................... 18 BENEFITS REQUIRING PREAUTHORIZATION ................................................................................................................... 18 PREAUTHORIZATION EXCEPTIONS................................................................................................................................. 19 Emergencies ........................................................................................................................................................ 19 EFFECT ON BENEFITS .................................................................................................................................................. 19 BENEFIT DESCRIPTIONS.................................................................................................................................... 20 BENEFIT DESCRIPTIONS............................................................................................................................................... 20 WHAT\'S COVERED....................................................................................................................................................... 20 COVERED SERVICES- ADDITIONAL INFORMATION ........................................................................................................... 22 Ambulance Services............................................................................................................................................. 22 Anesthesia Services ............................................................................................................................................. 22 Drugs Administered In An Outpatient Setting...........................',
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
/* Knowledge-base PDF full text merges + reference table prepend: see js/plan-data-pdf-raw.js */
