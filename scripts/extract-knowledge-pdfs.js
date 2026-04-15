/**
 * Extract full text from every PDF in knowledge_base/, map to POLICY_DOCS `source`
 * strings, and write js/plan-pdf-raw-text.js (CHA_PDF_RAW_BY_SOURCE + merge IIFE).
 *
 * Run from repo root: node scripts/extract-knowledge-pdfs.js
 */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const ROOT = path.join(__dirname, '..');
const KB = path.join(ROOT, 'knowledge_base');
const OUT = path.join(ROOT, 'js', 'plan-data-pdf-raw.js');
const LOG = path.join(ROOT, 'knowledge_base', 'EXTRACTION_LOG.md');

/** knowledge_base filename -> exact `source` field in plan-data / plan-data-extended */
const DISK_TO_SOURCE = {
  'MEC_MedFirst1_SPD_Jan25.pdf': 'MEC_MedFirst1_SPDh_Jan25.pdf',
  'AccessHealthBrochure2.pdf': 'Access_Health_STM.pdf',
  'SmartHealth_v3 (2).pdf': 'SmartHealth_v3.pdf',
  'NEO-SGIC_AFRP STM Limited-Elite (1).pdf': 'NEOSGIC_AFRP_STM_LimitedElite_1.pdf',
  'BCS_Brochure_1 (1).pdf': 'BCS_Brochure_1.pdf',
  'Everest_Brochure_REV (1).pdf': 'Everest_Brochure_REV.pdf',
  'BWABrochurePlan2MBR-Americare2_REV.pdf': 'BWABrochurePlan2MBRAmericare2_REV.pdf',
  'Smart Choice 1500 Plan Doc 2025   .pdf': 'Smart_Choice_1500_Plan_Doc_2025.pdf',
  'Smart Choice 3000 Plan Doc 2025 .pdf': 'Smart_Choice_3000_Plan_Doc_2025.pdf',
  'Smart Choice 3500 Plan Doc 2025.pdf': 'Smart_Choice_3500_Plan_Doc_2025.pdf',
  'Smart Choice 2500 Plan Doc 2025  .pdf': 'Smart_Choice_2500_Plan_Doc_2025__.pdf',
  'MEC_TrueHealth2_SPD_Jan25 (1).pdf': 'MEC_TrueHealth2_SPD_Jan25.pdf',
  'MEC_TrueHealth3_SPD_Jan25 (1).pdf': 'MEC_TrueHealth3_SPD_Jan25.pdf',
  'Allstate Enhanced STM PPO Plan.pdf': 'Allstate_Enhanced_STM_PPO_Brochure.pdf',
  'Allstate Copay Enhanced STM PPO Plan.pdf':
    'Allstate_Copay_Enhanced_STM_PPO_Brochure.pdf',
  'Allstate Essentials STM PPO Plan.pdf': 'Allstate_Essentials_STM_PPO_Brochure.pdf',
  'Allstate Health Access.pdf': 'Allstate_Health_Access_Brochure.pdf'
};

const ALL_SOURCES = new Set(
  [
    'MEC_MedFirst1_SPDh_Jan25.pdf',
    'MEC_MedFirst2_SPD_Jan25.pdf',
    'MEC_MedFirst3_SPD_Jan25.pdf',
    'MEC_MedFirst4_SPD_Jan25.pdf',
    'MEC_MedFirst5_SPD_Jan25.pdf',
    'MEC_TrueHealth1_SPD_Jan25.pdf',
    'MEC_GHDP1_1.pdf',
    'MEC_GHDP2_1.pdf',
    'MEC_GHDP3_1.pdf',
    'MEC_GHDP4_1.pdf',
    'MEC_GHDP5_2.pdf',
    'TDK_Promo_Combined.pdf',
    'Pinnacle_STM_Brochure.pdf',
    'Access_Health_STM.pdf',
    'SmartHealth_v3.pdf',
    'NEOSGIC_AFRP_STM_LimitedElite_1.pdf',
    'HarmonyCarePLUS_Brochure_8949272987_V3_0625.pdf',
    'AFSLIC20_SCP_Brochure_rev.pdf',
    'HealthChoiceSilverBrochure2.pdf',
    'Everest_Brochure_REV.pdf',
    'BCS_Brochure_1.pdf',
    'BWABrochurePlan2MBRAmericare2_REV.pdf',
    'Smart_Choice_2500_Plan_Doc_2025__.pdf',
    'Smart_Choice_1500_Plan_Doc_2025.pdf',
    'Smart_Choice_3000_Plan_Doc_2025.pdf',
    'Smart_Choice_3500_Plan_Doc_2025.pdf',
    'Pinnacle_Protect_Plan1_Brochure.pdf',
    'Pinnacle_Protect_Plan2_Brochure.pdf',
    'Pinnacle_Protect_Plan3_Brochure.pdf',
    'Pinnacle_Protect_Plan4_Brochure.pdf',
    'Pinnacle_CriticalCare_Plan1_Brochure.pdf',
    'Pinnacle_CriticalCare_Plan2_Brochure.pdf',
    'Pinnacle_CriticalCare_Plan3_Brochure.pdf',
    'Pinnacle_CriticalCare_Plan4_Brochure.pdf',
    'Allstate_Enhanced_STM_PPO_Brochure.pdf',
    'Allstate_Copay_Enhanced_STM_PPO_Brochure.pdf',
    'Allstate_Essentials_STM_PPO_Brochure.pdf',
    'Allstate_Health_Access_Brochure.pdf',
    'MyChoice_Low_Brochure_1.pdf',
    'MyChoice_Mid_Brochure_1.pdf',
    'MyChoice_High_Brochure_1.pdf',
    'MEC_TrueHealth2_SPD_Jan25.pdf',
    'MEC_TrueHealth3_SPD_Jan25.pdf'
  ].filter(Boolean)
);

function slugId(name) {
  return (
    'kb-' +
    name
      .replace(/\.pdf$/i, '')
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
      .slice(0, 48)
  );
}

function resolveSourceKey(diskName) {
  if (DISK_TO_SOURCE[diskName]) return DISK_TO_SOURCE[diskName];
  if (ALL_SOURCES.has(diskName)) return diskName;
  const n = diskName.toLowerCase().replace(/\s+/g, ' ').replace(/\(\d+\)/g, '').trim();
  for (const s of ALL_SOURCES) {
    if (s.toLowerCase() === n) return s;
  }
  return null;
}

function minimalOrphanPlan(diskName, rawText) {
  const id = slugId(diskName);
  return {
    id,
    name: diskName.replace(/\.pdf$/i, ''),
    group: 'Limited',
    type: 'Knowledge base PDF',
    carrier: '—',
    assoc: '',
    network: '—',
    source: diskName,
    rawText,
    benefits: [
      {
        category: 'Document',
        items: [
          'This entry was auto-created from a PDF in knowledge_base that does not map to an existing plan `source` field.'
        ]
      }
    ],
    limitations: [
      'Reference-only document — verify with carrier before quoting to members.'
    ],
    waitingPeriods: ['See PDF text in rawText / Benefits AI.'],
    preEx: 'See PDF text.',
    planNotes:
      'Imported from knowledge_base/' +
      diskName +
      ' for full-text search in Benefits Reference AI.'
  };
}

async function main() {
  const files = fs
    .readdirSync(KB)
    .filter((f) => f.toLowerCase().endsWith('.pdf'))
    .sort();

  const bySource = {};
  const orphans = [];
  const lines = ['# knowledge_base PDF extraction', '', `Generated: ${new Date().toISOString()}`, ''];

  for (const file of files) {
    const abs = path.join(KB, file);
    process.stdout.write('Extracting: ' + file + ' ... ');
    let text = '';
    try {
      const buf = fs.readFileSync(abs);
      const data = await pdf(buf);
      text = (data.text || '').trim();
      if (!text) text = '[No extractable text from PDF parser]';
      console.log('OK (' + text.length + ' chars, ' + (data.numpages || '?') + ' pages)');
    } catch (e) {
      console.log('FAIL: ' + e.message);
      text = '[PDF extraction failed: ' + e.message + ']';
    }

    lines.push('## ' + file);
    lines.push('- Characters: ' + text.length);
    const srcKey = resolveSourceKey(file);
    if (srcKey) {
      bySource[srcKey] = text;
      lines.push('- Mapped to POLICY_DOCS `source`: `' + srcKey + '`');
    } else {
      orphans.push({ file, text });
      lines.push('- **No matching plan `source`** → orphan POLICY_DOCS entry `' + slugId(file) + '`');
    }
    lines.push('');
  }

  const orphanPlansJson = JSON.stringify(orphans.map((o) => minimalOrphanPlan(o.file, o.text)));

  const header = `// AUTO-GENERATED by scripts/extract-knowledge-pdfs.js — do not edit by hand.
// Regenerate: node scripts/extract-knowledge-pdfs.js
`;

  const body =
    'var CHA_PDF_RAW_BY_SOURCE = ' +
    JSON.stringify(bySource, null, 0) +
    ';\n' +
    'var CHA_ORPHAN_PDF_PLANS = ' +
    orphanPlansJson +
    ';\n' +
    '(function chaMergePdfExtractsIntoPolicyDocs() {\n' +
    '  if (typeof POLICY_DOCS === "undefined" || !POLICY_DOCS.length) return;\n' +
    '  var map = typeof CHA_PDF_RAW_BY_SOURCE !== "undefined" ? CHA_PDF_RAW_BY_SOURCE : {};\n' +
    '  POLICY_DOCS.forEach(function (p) {\n' +
    '    if (!p || !p.source) return;\n' +
    '    var t = map[p.source];\n' +
    '    if (t) p.rawText = t;\n' +
    '  });\n' +
    '  if (typeof CHA_ORPHAN_PDF_PLANS !== "undefined" && CHA_ORPHAN_PDF_PLANS.length) {\n' +
    '    var ids = {};\n' +
    '    POLICY_DOCS.forEach(function (p) {\n' +
    '      ids[p.id] = 1;\n' +
    '    });\n' +
    '    CHA_ORPHAN_PDF_PLANS.forEach(function (plan) {\n' +
    '      if (!ids[plan.id]) {\n' +
    '        POLICY_DOCS.push(plan);\n' +
    '        ids[plan.id] = 1;\n' +
    '      }\n' +
    '    });\n' +
    '  }\n' +
    '  if (typeof chaApplyKnowledgeBasePdfToDocs === "function") {\n' +
    '    chaApplyKnowledgeBasePdfToDocs(POLICY_DOCS);\n' +
    '  }\n' +
    '})();\n';

  fs.writeFileSync(OUT, header + body, 'utf8');
  fs.writeFileSync(LOG, lines.join('\n'), 'utf8');

  console.log('\nWrote', path.relative(ROOT, OUT));
  console.log('Wrote', path.relative(ROOT, LOG));
  console.log('Sources with extract:', Object.keys(bySource).length);
  console.log('Orphan plans:', orphans.length);
}

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});
