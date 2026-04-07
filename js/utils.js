// utils.js — Icons, escHTML, search engine, shared utilities

function escHTML(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── ICON HELPERS ──────────────────────────────────────
function mkIcon(p) {
  return (
    '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
    p +
    '</svg>'
  );
}
function iconBox(p) {
  return (
    '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:rgba(26,29,38,0.07);border-radius:8px;color:#5C6878;flex-shrink:0;">' +
    mkIcon(p) +
    '</span>'
  );
}
var P = {
  money:
    '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  think:
    '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>',
  users:
    '<circle cx="8" cy="7" r="3"/><circle cx="16" cy="7" r="3"/><path d="M2 21v-2a6 6 0 0 1 6-6M16 13a6 6 0 0 1 6 6v2"/>',
  email:
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
  confused:
    '<circle cx="12" cy="12" r="9"/><path d="M16 14s-1.5-1.5-4-1.5-4 1.5-4 1.5M9 9h.01M15 9h.01"/>',
  noentry:
    '<circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>',
  briefcase:
    '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  hospital:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>',
  clipboard:
    '<rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/>',
  seedling:
    '<path d="M12 22V12M8 12C8 8 4 6 2 7c1 4 4 5 6 5z"/><path d="M16 12c0-4 4-6 6-5-1 4-4 5-6 5z"/>',
  zipper:
    '<circle cx="12" cy="12" r="9"/><path d="M7 9h.01M17 9h.01"/><line x1="8" y1="14" x2="16" y2="14"/>',
  wall: '<rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="8" height="4" rx="1"/><rect x="13" y="10" width="8" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/>',
  wave: '<path d="M18 11V5a1 1 0 0 0-2 0v3M14 6V4a1 1 0 0 0-2 0v4M10 7V5a1 1 0 0 0-2 0v6l-2-2a1 1 0 0 0-1.5 1.5l3 3.5V17a5 5 0 0 0 10 0v-7a1 1 0 0 0-2 0"/>',
  search:
    '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  medal: '<circle cx="12" cy="8" r="5"/><path d="M8 13.3V22l4-2 4 2v-8.7"/>',
  barchart: '<path d="M3 20h18M7 20V12M12 20V6M17 20v-4"/>',
  crystal: '<circle cx="12" cy="12" r="8"/><path d="M9 9l6 6M15 9l-6 6"/>',
  returnarr:
    '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  scales:
    '<path d="M12 3v18"/><path d="M5 8l7-5 7 5"/><path d="M3 17h6M15 17h6"/>',
  refresh:
    '<path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/>',
  lightning: '<path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2z"/>',
  brain: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  circle: '<circle cx="12" cy="12" r="9"/>',
  flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  masks:
    '<path d="M2 10c0-4 3-7 7-7s7 3 7 7"/><path d="M9 17c0 3 2 5 5 5s5-2 5-5V10"/>',
  checkbox:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 12l3.5 3.5 6-7"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>',
  package:
    '<path d="M21 8l-9-5-9 5v10l9 5 9-5V8z"/><polyline points="3 8 12 13 21 8"/><line x1="12" y1="22" x2="12" y2="13"/>',
  boxing:
    '<path d="M8 14s0-3 3-3h5a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H9l-1-4z"/><path d="M8 14V9a3 3 0 0 1 3-3h2"/>',
  mute: '<path d="M11 5 6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>',
  warning:
    '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>',
  xmark:
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  crown: '<path d="M2 20h20M4 20L2 8l6 5 4-7 4 7 6-5-2 12H4z"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  mobile:
    '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  pill: '<path d="M10.5 20.5L3.5 13.5a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>',
  hourglass: '<path d="M5 3H19M5 21H19M7 3v5l5 4-5 4v5M17 3v5l-5 4 5 4v5"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9"/><path d="M3 12h18"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'
};

// ══════════════════════════════════════════════════════
function toggleXcard(id) {
  var el = document.getElementById(id);
  var body = el.querySelector('.xcard-body');
  el.classList.toggle('open');
  body.style.display = el.classList.contains('open') ? 'block' : 'none';
}

function toggleCard(id, bodyClass) {
  var el = document.getElementById(id);
  var body = el.querySelector('.' + bodyClass);
  el.classList.toggle('open');
  body.style.display = el.classList.contains('open') ? 'block' : 'none';
}

function switchTab(e, prefix, tab) {
  e.stopPropagation();
  var card =
    e.target.closest('.xcard') ||
    e.target.closest('.rec-card') ||
    e.target.closest('.lrp') ||
    document.getElementById('liveResult');
  if (!card) return;
  card.querySelectorAll('.rtab').forEach(function (t) {
    t.classList.remove('active');
  });
  card.querySelectorAll('.rpanel').forEach(function (p) {
    p.classList.remove('active');
  });
  e.target.classList.add('active');
  var el = document.getElementById(prefix + '-' + tab);
  if (el) el.classList.add('active');
}

// ══════════════════════════════════════════════════════
// SEARCH SYNONYM ENGINE + PRE-BUILT INDEX
// ══════════════════════════════════════════════════════
var SEARCH_SYNONYMS = {
  // ── Common typos ──
  copya: ['copay'],
  copyas: ['copay', 'copays'],
  coypay: ['copay'],
  docter: ['doctor', 'physician', 'pcp'],
  docotr: ['doctor', 'physician', 'pcp'],
  urgn: ['urgent care'],
  urgnt: ['urgent care'],
  coverd: ['covered'],
  covrage: ['coverage'],
  prescripton: ['prescription'],
  perscription: ['prescription'],
  hosptial: ['hospital'],
  hopsital: ['hospital'],
  specalist: ['specialist'],
  specilist: ['specialist'],
  emergancy: ['emergency'],
  emrgency: ['emergency'],
  deductable: ['deductible'],
  dedcutible: ['deductible'],
  maturnity: ['maternity'],
  maternty: ['maternity'],
  pregancy: ['pregnancy'],
  chripractor: ['chiropractic'],
  chiropratic: ['chiropractic'],
  theropy: ['therapy'],
  theraphy: ['therapy'],
  telmedicine: ['telemedicine'],
  ambulence: ['ambulance'],
  benifits: ['benefits'],
  exlcusions: ['exclusions'],
  waitng: ['waiting'],
  // ── Short aliases ──
  dr: ['doctor', 'physician', 'pcp', 'primary care'],
  doc: ['doctor', 'physician', 'pcp'],
  meds: ['medication', 'prescription', 'drugs'],
  pills: ['medication', 'prescription'],
  hosp: ['hospital', 'hospitalization', 'inpatient'],
  ded: ['deductible'],
  preex: ['pre-existing', 'pre existing'],
  'pre ex': ['pre-existing', 'pre existing'],
  wait: ['waiting period', 'waiting'],
  preg: ['pregnancy', 'pregnant', 'maternity'],
  birth: ['childbirth', 'maternity'],
  mental: ['mental health', 'therapy', 'counseling', 'psychiatry'],
  psych: ['psychiatry', 'mental health', 'counseling'],
  tele: ['telemedicine', 'telehealth', 'virtual visit'],
  surg: ['surgery', 'surgical'],
  amb: ['ambulance', 'transport', 'ems'],
  chiro: ['chiropractic', 'chiropractor', 'spinal', 'spine'],
  tooth: ['dental', 'teeth', 'dentist'],
  eyes: ['vision', 'eye', 'glasses', 'optometrist'],
  scan: ['ct scan', 'mri', 'imaging', 'radiology'],
  blood: ['blood work', 'blood test', 'laboratory', 'labs'],
  'online doctor': ['telemedicine', 'telehealth', 'virtual visit'],
  'virtual doctor': ['telemedicine', 'telehealth', 'virtual visit'],
  // ── Standard synonyms ──
  'x-ray': [
    'x-ray',
    'xray',
    'radiology',
    'radiograph',
    'imaging',
    'diagnostic',
    'x ray'
  ],
  xray: [
    'x-ray',
    'xray',
    'radiology',
    'radiograph',
    'imaging',
    'diagnostic',
    'x ray'
  ],
  'x ray': [
    'x-ray',
    'xray',
    'radiology',
    'radiograph',
    'imaging',
    'diagnostic',
    'x ray'
  ],
  er: [
    'emergency room',
    'emergency',
    'er visit',
    'emergency department',
    'ed visit'
  ],
  emergency: [
    'emergency room',
    'emergency',
    'er visit',
    'er',
    'emergency department'
  ],
  'emergency room': [
    'emergency room',
    'emergency',
    'er visit',
    'er',
    'emergency department'
  ],
  mri: ['mri', 'imaging', 'magnetic resonance', 'radiology', 'diagnostic'],
  'ct scan': [
    'ct scan',
    'ct',
    'imaging',
    'radiology',
    'diagnostic',
    'cat scan'
  ],
  'cat scan': [
    'ct scan',
    'ct',
    'imaging',
    'radiology',
    'diagnostic',
    'cat scan'
  ],
  lab: [
    'lab',
    'laboratory',
    'labs',
    'blood work',
    'blood test',
    'pathology',
    'diagnostic'
  ],
  labs: [
    'lab',
    'laboratory',
    'labs',
    'blood work',
    'blood test',
    'pathology',
    'diagnostic'
  ],
  'blood work': [
    'lab',
    'laboratory',
    'labs',
    'blood work',
    'blood test',
    'pathology'
  ],
  'blood test': [
    'lab',
    'laboratory',
    'labs',
    'blood work',
    'blood test',
    'pathology'
  ],
  rx: [
    'rx',
    'prescription',
    'prescriptions',
    'drug',
    'drugs',
    'medication',
    'pharmacy',
    'formulary'
  ],
  prescription: [
    'rx',
    'prescription',
    'prescriptions',
    'drug',
    'drugs',
    'medication',
    'pharmacy'
  ],
  medication: [
    'rx',
    'prescription',
    'prescriptions',
    'drug',
    'drugs',
    'medication',
    'pharmacy'
  ],
  doctor: [
    'doctor',
    'physician',
    'pcp',
    'primary care',
    'office visit',
    'doctor visit'
  ],
  pcp: [
    'doctor',
    'physician',
    'pcp',
    'primary care',
    'office visit',
    'doctor visit'
  ],
  specialist: ['specialist', 'specialist visit', 'referral'],
  'urgent care': ['urgent care', 'urgentcare', 'walk-in', 'walk in'],
  telehealth: [
    'telehealth',
    'telemedicine',
    'virtual visit',
    'virtual care',
    'telemed'
  ],
  telemedicine: [
    'telehealth',
    'telemedicine',
    'virtual visit',
    'virtual care',
    'telemed'
  ],
  dental: ['dental', 'dentist', 'teeth', 'oral'],
  vision: ['vision', 'eye', 'eyes', 'eyeglasses', 'contacts', 'optical'],
  'mental health': [
    'mental health',
    'behavioral health',
    'counseling',
    'therapy',
    'psychiatr'
  ],
  therapy: [
    'mental health',
    'behavioral health',
    'counseling',
    'therapy',
    'physical therapy'
  ],
  surgery: [
    'surgery',
    'surgical',
    'operation',
    'outpatient surgery',
    'inpatient'
  ],
  hospital: [
    'hospital',
    'hospitalization',
    'inpatient',
    'admission',
    'admitted',
    'hospital indemnity'
  ],
  maternity: ['maternity', 'pregnancy', 'prenatal', 'obstetric'],
  pregnancy: ['maternity', 'pregnancy', 'prenatal', 'obstetric'],
  'pre-existing': ['pre-existing', 'preexisting', 'pre-ex', 'prior condition'],
  copay: ['copay', 'co-pay', 'copayment', 'co-payment'],
  deductible: ['deductible', 'ded', 'out of pocket', 'oop'],
  oop: [
    'out of pocket',
    'oop',
    'out-of-pocket',
    'out of pocket maximum',
    'oop max'
  ],
  'waiting period': [
    'waiting period',
    'waiting',
    'sickness waiting',
    '30-day',
    '30 day'
  ],
  network: [
    'network',
    'first health',
    'in-network',
    'out of network',
    'provider'
  ],
  cancer: ['cancer', 'oncology', 'tumor', 'malignant'],
  heart: ['heart', 'cardiac', 'cardiovascular', 'cardiology'],
  diabetes: ['diabetes', 'diabetic', 'insulin', 'a1c'],
  ambulance: ['ambulance', 'emergency transport', 'ems'],
  rehab: [
    'rehabilitation',
    'rehab',
    'physical therapy',
    'occupational therapy'
  ],
  chiropractic: ['chiropractic', 'chiropractor', 'spinal', 'spine', 'chiro'],
  aca: [
    'aca',
    'affordable care act',
    'obamacare',
    'marketplace',
    'major medical'
  ],
  stm: ['stm', 'short-term', 'short term medical', 'temporary'],
  mec: ['mec', 'minimum essential coverage', 'preventive'],
  'physical therapy': [
    'physical therapy',
    'pt',
    'rehab',
    'rehabilitation',
    'physiotherapy'
  ],
  pt: ['physical therapy', 'pt', 'rehab', 'rehabilitation', 'physiotherapy'],
  ultrasound: ['ultrasound', 'imaging', 'diagnostic', 'sonogram'],
  wellness: [
    'wellness',
    'preventive',
    'annual physical',
    'physical exam',
    'screening'
  ],
  screening: [
    'screening',
    'preventive',
    'wellness',
    'mammogram',
    'colonoscopy',
    'diagnostic'
  ],
  immunization: [
    'immunization',
    'vaccine',
    'vaccination',
    'immunizations',
    'shot'
  ],
  vaccine: ['vaccine', 'vaccination', 'immunization', 'immunizations', 'shot'],
  inpatient: [
    'inpatient',
    'hospital',
    'hospitalization',
    'admission',
    'admitted'
  ],
  outpatient: ['outpatient', 'outpatient surgery', 'ambulatory', 'same day'],
  transplant: ['transplant', 'organ', 'tissue'],
  'pre-auth': [
    'pre-auth',
    'preauthorization',
    'pre-authorization',
    'prior authorization',
    'precertification'
  ],
  mammogram: [
    'mammogram',
    'mammography',
    'breast screening',
    'breast cancer screening',
    'screening',
    'preventive',
    'diagnostic imaging'
  ],
  mammography: [
    'mammogram',
    'mammography',
    'breast screening',
    'breast cancer screening',
    'screening',
    'preventive'
  ],
  colonoscopy: [
    'colonoscopy',
    'colon screening',
    'colon cancer screening',
    'screening',
    'preventive',
    'diagnostic'
  ],
  endoscopy: [
    'endoscopy',
    'colonoscopy',
    'upper gi',
    'diagnostic',
    'procedure'
  ],
  biopsy: ['biopsy', 'pathology', 'diagnostic', 'lab', 'tissue'],
  dialysis: ['dialysis', 'kidney', 'renal', 'end stage'],
  prosthetic: [
    'prosthetic',
    'prosthetics',
    'durable medical equipment',
    'dme',
    'artificial limb'
  ],
  dme: [
    'durable medical equipment',
    'dme',
    'prosthetic',
    'wheelchair',
    'walker',
    'oxygen'
  ],
  hearing: ['hearing', 'hearing aid', 'audiology', 'audiologist', 'ear'],
  allergy: ['allergy', 'allergist', 'allergy testing', 'immunotherapy'],
  dermatology: ['dermatology', 'dermatologist', 'skin', 'rash'],
  'sleep study': ['sleep study', 'sleep apnea', 'polysomnography', 'cpap'],
  infusion: [
    'infusion',
    'infusion therapy',
    'iv therapy',
    'chemotherapy',
    'injection'
  ],
  hospice: ['hospice', 'palliative', 'end of life', 'terminal'],
  'skilled nursing': [
    'skilled nursing',
    'snf',
    'nursing facility',
    'long term care',
    'ltc'
  ],
  'home health': ['home health', 'home care', 'home nursing', 'visiting nurse'],
  'occupational therapy': [
    'occupational therapy',
    'ot',
    'rehab',
    'rehabilitation'
  ],
  'speech therapy': [
    'speech therapy',
    'speech language',
    'slp',
    'speech pathologist'
  ],
  preventive: [
    'preventive',
    'preventative',
    'wellness',
    'annual physical',
    'screening',
    'check-up',
    'checkup'
  ],
  generic: [
    'generic',
    'brand',
    'formulary',
    'rx',
    'prescription',
    'drug',
    'tier'
  ],
  brand: [
    'brand',
    'generic',
    'formulary',
    'rx',
    'prescription',
    'drug',
    'tier',
    'name brand'
  ],
  'prior authorization': [
    'prior authorization',
    'pre-auth',
    'preauthorization',
    'pre-authorization',
    'precertification',
    'pre-cert'
  ]
};

function expandSearchSynonyms(query) {
  var q = query.toLowerCase().trim();
  var terms = [q];
  if (SEARCH_SYNONYMS[q]) terms = terms.concat(SEARCH_SYNONYMS[q]);
  // Also expand individual words for multi-word queries
  var qWords = q.split(/\s+/).filter(function (w) {
    return w.length >= 3;
  });
  Object.keys(SEARCH_SYNONYMS).forEach(function (key) {
    // Exact key match on full query already handled above
    if (key === q) return;
    // FIX: For short queries (<=3 chars), only allow exact key match (already done above).
    // Do NOT let "er" match inside "surgery", "cancer", "dermatology", etc.
    if (q.length <= 3) return;
    // Full query is a substring of the key — safe for longer queries
    if (key.includes(q)) {
      terms = terms.concat(SEARCH_SYNONYMS[key]);
    } else if (q.includes(key) && key.length >= 3) {
      // Key must appear as a whole word in query (not inside another word)
      var keyRe = new RegExp(
        '(?:^|\\s)' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\s|$)'
      );
      if (keyRe.test(q)) terms = terms.concat(SEARCH_SYNONYMS[key]);
    }
    // Fuzzy match on full query — only for 4+ char queries
    if (q.length >= 4 && fuzzyMatch(q, key)) {
      terms = terms.concat(SEARCH_SYNONYMS[key]);
      terms.push(key);
    }
    // Fuzzy match on individual words (catches misspellings in multi-word queries)
    if (qWords.length > 1) {
      qWords.forEach(function (w) {
        if (w === key) {
          terms = terms.concat(SEARCH_SYNONYMS[key]);
          terms.push(key);
        } else if (w.length >= 4 && fuzzyMatch(w, key)) {
          terms = terms.concat(SEARCH_SYNONYMS[key]);
          terms.push(key);
        }
      });
    }
  });
  var unique = [];
  terms.forEach(function (t) {
    var trimmed = t.trim();
    if (trimmed && unique.indexOf(trimmed) === -1) unique.push(trimmed);
  });
  return unique;
}

function fuzzyMatch(query, text) {
  if (query.length < 4) return text.includes(query);
  if (text.includes(query)) return true;
  // Try removing each character from query (handles extra char typo)
  for (var i = 0; i < query.length; i++) {
    var shortened = query.slice(0, i) + query.slice(i + 1);
    if (shortened.length >= 3 && text.includes(shortened)) return true;
  }
  // Try doubling each character (handles missing double letter: mamogram→mammogram)
  for (var k = 0; k < query.length; k++) {
    var doubled = query.slice(0, k) + query[k] + query.slice(k);
    if (text.includes(doubled)) return true;
  }
  // Try swapping adjacent characters (handles transposition typos)
  for (var j = 0; j < query.length - 1; j++) {
    var swapped =
      query.slice(0, j) + query[j + 1] + query[j] + query.slice(j + 2);
    if (text.includes(swapped)) return true;
  }
  return false;
}

// ── WORD-BOUNDARY-SAFE MATCHING ─────────────────────────
// Short terms (<=3 chars) and medical abbreviations use \b word boundaries
// to prevent "ER" matching inside "covered", "OOP" inside random words, etc.
var BR_ABBREVS = [
  'er',
  'oop',
  'pcp',
  'rx',
  'pt',
  'ot',
  'dme',
  'snf',
  'ltc',
  'ems',
  'mri',
  'ct',
  'iv',
  'gi',
  'or',
  'ob',
  'ed',
  'uc',
  'ded'
];

function brTermMatch(text, term) {
  if (!term || term.length < 2) return false;
  var tl = term.toLowerCase();
  // Use word-boundary matching for ALL terms to prevent false substring matches
  // (e.g., "er visit" matching inside "per visit")
  var escaped = tl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var re = new RegExp('\\b' + escaped + '\\b', 'i');
  return re.test(text);
}

function matchesExpanded(text, expandedTerms) {
  for (var i = 0; i < expandedTerms.length; i++) {
    if (brTermMatch(text, expandedTerms[i])) return true;
  }
  return false;
}

// ── PRE-BUILT SEARCH INDEX ───────────────────────────
// Built once at page load. Each entry: {type, title, preview, searchText, action}
var SEARCH_INDEX = [];
var _searchIndexBuilt = false;

function buildSearchIndex() {
  if (_searchIndexBuilt) return;
  SEARCH_INDEX = [];

  // Index OBJECTIONS
  if (typeof OBJECTIONS !== 'undefined') {
    OBJECTIONS.forEach(function (o, i) {
      SEARCH_INDEX.push({
        type: 'Objection Handler',
        title: '"' + o.obj + '"',
        preview: o.real.slice(0, 100),
        searchText: (
          o.obj +
          ' ' +
          o.best +
          ' ' +
          o.real +
          ' ' +
          o.cat
        ).toLowerCase(),
        action: function () {
          closeSearch();
          showPage('objections');
          setTimeout(function () {
            var el = document.getElementById('ox' + i);
            if (el) {
              el.classList.add('open');
              el.querySelector('.xcard-body').style.display = 'block';
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 200);
        }
      });
    });
  }

  // Index BENEFITS
  if (typeof BENEFITS !== 'undefined') {
    BENEFITS.forEach(function (b, i) {
      SEARCH_INDEX.push({
        type: 'Benefit Explainer',
        title: b.name,
        preview: b.simple.slice(0, 100),
        searchText: (
          b.name +
          ' ' +
          b.simple +
          ' ' +
          b.official +
          ' ' +
          b.frame +
          ' ' +
          (b.misunderstand || '') +
          ' ' +
          (b.followup || '') +
          ' ' +
          (b.bridge || '')
        ).toLowerCase(),
        action: function () {
          closeSearch();
          showPage('benefits');
          setTimeout(function () {
            var el = document.getElementById('bx' + i);
            if (el) {
              el.classList.add('open');
              el.querySelector('.xcard-body').style.display = 'block';
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 200);
        }
      });
    });
  }

  // Index PLANS
  if (typeof PLANS !== 'undefined') {
    PLANS.forEach(function (p, i) {
      SEARCH_INDEX.push({
        type: 'Plan Vault',
        title: p.name,
        preview: (p.bestFor || p.tagline || '').slice(0, 100),
        searchText: (
          p.name +
          ' ' +
          p.bestFor +
          ' ' +
          p.type +
          ' ' +
          (p.tagline || '') +
          ' ' +
          (p.network || '') +
          ' ' +
          (p.topPoints || []).join(' ') +
          ' ' +
          (p.limitations || []).join(' ') +
          ' ' +
          (p.objections || []).join(' ') +
          ' ' +
          (p.compliance || '') +
          ' ' +
          (p.framing || '') +
          ' ' +
          (p.idealClient || '') +
          ' ' +
          (p.notGood || '')
        ).toLowerCase(),
        action: function () {
          closeSearch();
          showPage('plans');
          setTimeout(function () {
            var el = document.getElementById('pc' + i);
            if (el) {
              el.classList.add('open');
              el.querySelector('.plan-body').style.display = 'block';
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 200);
        }
      });
    });
  }

  // Index POLICY_DOCS with per-benefit granularity
  if (typeof POLICY_DOCS !== 'undefined') {
    POLICY_DOCS.forEach(function (p) {
      var allBenText = p.benefits
        .map(function (b) {
          return b.category + ' ' + b.items.join(' ');
        })
        .join(' ');
      var allLimText = (p.limitations || []).join(' ');
      SEARCH_INDEX.push({
        type: 'Policy Reference',
        title: p.name,
        preview: p.type,
        searchText: (
          p.name +
          ' ' +
          p.type +
          ' ' +
          p.carrier +
          ' ' +
          p.network +
          ' ' +
          (p.planNotes || '') +
          ' ' +
          allLimText +
          ' ' +
          (p.preEx || '') +
          ' ' +
          (p.waitingPeriods || []).join(' ') +
          ' ' +
          allBenText
        ).toLowerCase(),
        planId: p.id,
        benefits: p.benefits,
        limitations: p.limitations,
        action: function () {
          var pid = p.id;
          closeSearch();
          showPage('allplans');
          setTimeout(function () {
            policyDocOpen = pid;
            var container = document.getElementById('pdResultsContainer');
            if (container) container.innerHTML = renderPolicyResults();
            setTimeout(function () {
              var el = document.getElementById('pd-' + pid);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }, 200);
        }
      });
    });
  }

  // Index CLOSES
  if (typeof CLOSES !== 'undefined') {
    CLOSES.forEach(function (c, i) {
      SEARCH_INDEX.push({
        type: 'Closing Lines',
        title: (c.type || 'Close') + ' — ' + (c.line || '').slice(0, 50),
        preview: (c.when || '').slice(0, 100),
        searchText: (
          (c.line || '') +
          ' ' +
          (c.type || '') +
          ' ' +
          (c.when || '') +
          ' ' +
          (c.tone || '') +
          ' ' +
          (c.bridge || '') +
          ' ' +
          (c.hesitate || '')
        ).toLowerCase(),
        action: function () {
          closeSearch();
          showPage('closes');
        }
      });
    });
  }

  // Index RECOVERY
  if (typeof RECOVERY !== 'undefined') {
    RECOVERY.forEach(function (r, i) {
      SEARCH_INDEX.push({
        type: 'Recovery Scripts',
        title: r.label || 'Recovery',
        preview: (r.situation || '').slice(0, 100),
        searchText: (
          (r.label || '') +
          ' ' +
          (r.situation || '') +
          ' ' +
          (r.goal || '') +
          ' ' +
          (r.script || '') +
          ' ' +
          (r.soft || '') +
          ' ' +
          (r.strong || '') +
          ' ' +
          (r.bridge || '') +
          ' ' +
          (r.acknowledge || '')
        ).toLowerCase(),
        action: function () {
          closeSearch();
          showPage('recovery');
        }
      });
    });
  }

  _searchIndexBuilt = true;
}

// ══════════════════════════════════════════════════════
// SEARCH (indexed, instant)
// ══════════════════════════════════════════════════════
var _searchTimer;
function debouncedSearch(val) {
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(function () {
    if (val.trim().length > 0) {
      document.getElementById('srOverlay').classList.add('show');
      var srInput = document.getElementById('srInput');
      if (srInput) {
        srInput.value = val;
        srInput.focus();
      }
      doSearch(val);
    }
  }, 150);
}
function debouncedOverlaySearch(val) {
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(function () {
    doSearch(val);
  }, 150);
}

function getBadgeClass(type) {
  var t = type.toLowerCase();
  if (t.includes('objection')) return 'sr-badge-objection';
  if (t.includes('plan vault') || t.includes('plan ')) return 'sr-badge-plan';
  if (t.includes('policy')) return 'sr-badge-policy';
  if (t.includes('benefit')) return 'sr-badge-benefit';
  if (t.includes('clos')) return 'sr-badge-close';
  if (t.includes('recovery')) return 'sr-badge-recovery';
  if (t.includes('training')) return 'sr-badge-training';
  return 'sr-badge-default';
}
function getSourceLabel(sec) {
  var t = sec.toLowerCase();
  if (t.includes('objection') || t.includes('recovery')) return 'Live Assist';
  if (t.includes('plan vault') || t.includes('plan ') || t.includes('benefit'))
    return 'Plans & Benefits';
  if (t.includes('policy')) return 'Policy Docs';
  if (t.includes('clos') || t.includes('script')) return 'All Plan Scripts';
  if (t.includes('training')) return 'Training';
  if (t.includes('compliance') || t.includes('disclosure')) return 'Compliance';
  return '';
}

function hlSearch(text, terms) {
  var safe = escHTML(text);
  terms.forEach(function (term) {
    if (term.length < 2) return;
    var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // FIX: Use word boundaries for short terms to prevent highlighting inside words
    var boundary =
      term.length <= 3 || BR_ABBREVS.indexOf(term.toLowerCase()) !== -1
        ? '\\b'
        : '';
    var re = new RegExp('(' + boundary + escaped + boundary + ')', 'gi');
    safe = safe.replace(re, '<mark class="sr-hl">$1</mark>');
  });
  return safe;
}

function doSearch(val) {
  buildSearchIndex();
  document.getElementById('scBtn').style.display =
    val.length > 0 ? 'block' : 'none';
  if (!val.trim()) {
    document.getElementById('srList').innerHTML = '';
    document.getElementById('srMatchCount').textContent = '';
    return;
  }
  var expandedTerms = expandSearchSynonyms(val.toLowerCase());
  var res = [];

  SEARCH_INDEX.forEach(function (item) {
    var matched = false;
    for (var i = 0; i < expandedTerms.length; i++) {
      if (brTermMatch(item.searchText, expandedTerms[i])) {
        matched = true;
        break;
      }
    }
    if (!matched && val.length >= 4) {
      matched = fuzzyMatch(val.toLowerCase(), item.searchText);
    }
    if (!matched) return;

    if (item.type === 'Policy Reference' && item.benefits) {
      var matchedBens = [],
        matchedLims = [];
      item.benefits.forEach(function (bcat) {
        bcat.items.forEach(function (itm) {
          if (
            matchesExpanded(itm, expandedTerms) ||
            matchesExpanded(bcat.category, expandedTerms)
          )
            matchedBens.push(itm);
        });
      });
      (item.limitations || []).forEach(function (lim) {
        if (matchesExpanded(lim, expandedTerms)) matchedLims.push(lim);
      });
      var prev = '';
      if (matchedBens.length) prev = matchedBens[0];
      else if (matchedLims.length) prev = matchedLims[0];
      else prev = item.preview;
      res.push({
        sec: 'Policy Reference — ' + item.title,
        txt:
          (matchedBens.length
            ? 'Benefit: '
            : matchedLims.length
              ? 'Exclusion: '
              : '') + prev.slice(0, 120),
        prev:
          (matchedBens.length
            ? matchedBens.length + ' benefit match(es)'
            : '') +
          (matchedLims.length
            ? (matchedBens.length ? ' · ' : '') +
              matchedLims.length +
              ' exclusion match(es)'
            : ''),
        action: item.action,
        type: item.type
      });
    } else {
      res.push({
        sec: item.type,
        txt: item.title,
        prev: item.preview + '...',
        action: item.action,
        type: item.type
      });
    }
  });

  // Match count
  document.getElementById('srMatchCount').textContent =
    res.length +
    ' result' +
    (res.length !== 1 ? 's' : '') +
    ' for "' +
    val +
    '"';

  window.srActions = res.map(function (r) {
    return r.action;
  });
  document.getElementById('srList').innerHTML = res.length
    ? res
        .map(function (r, i) {
          return (
            '<div class="sr-item" onclick="srActions[' +
            i +
            ']()">' +
            '<span class="sr-badge ' +
            getBadgeClass(r.sec) +
            '">' +
            escHTML(r.sec) +
            '</span>' +
            (getSourceLabel(r.sec)
              ? '<span class="sr-source-pill">' +
                getSourceLabel(r.sec) +
                '</span>'
              : '') +
            '<div class="sr-item-title">' +
            hlSearch(r.txt, expandedTerms) +
            '</div>' +
            '<div class="sr-item-preview">' +
            hlSearch(r.prev, expandedTerms) +
            '</div>' +
            (r.prev && r.prev.includes('match(es)')
              ? '<div class="sr-item-detail">' + escHTML(r.prev) + '</div>'
              : '') +
            '</div>'
          );
        })
        .join('')
    : '<div class="sr-empty"><div class="sr-empty-icon">🔍</div><div class="sr-empty-title">No results for "' +
      escHTML(val) +
      '"</div><div class="sr-empty-suggestions"><b>Common terms:</b> x-ray, ER, hospital, surgery, prescription, copay<br><b>Plan types:</b> MEC, ACA, STM<br><b>Screenings:</b> mammogram, colonoscopy, ultrasound<br><b>Therapy:</b> physical therapy, mental health, chiropractic</div></div>';

  if (!document.getElementById('srOverlay').classList.contains('show')) {
    document.getElementById('srOverlay').classList.add('show');
    var srInput = document.getElementById('srInput');
    if (srInput && !srInput.value) srInput.value = val;
  }
}

function openSearch() {
  var overlay = document.getElementById('srOverlay');
  if (overlay) overlay.classList.add('show');
  var srInput = document.getElementById('srInput');
  if (srInput) {
    srInput.value = '';
    srInput.focus();
  }
}

function closeSearch() {
  document.getElementById('srOverlay').classList.remove('show');
  document.getElementById('gs').value = '';
  document.getElementById('scBtn').style.display = 'none';
  var srInput = document.getElementById('srInput');
  if (srInput) srInput.value = '';
}
