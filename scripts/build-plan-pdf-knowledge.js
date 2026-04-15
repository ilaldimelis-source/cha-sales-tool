/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const JS_DIR = path.join(ROOT, 'js');
const KB_DIR = path.join(ROOT, 'knowledge_base');
const OUT_MAP_JS = path.join(JS_DIR, 'plan-pdf-map.js');
const OUT_INDEX_JSON = path.join(KB_DIR, 'extracted', 'index.json');
const OUT_PLANS_DIR = path.join(KB_DIR, 'extracted', 'plans');

const EXPLICIT_EXCLUDED_PLAN_IDS = {
  sigmacare: true,
  pinnaclecriticalcare1: true,
  pinnaclecriticalcare2: true,
  pinnaclecriticalcare3: true,
  pinnaclecriticalcare4: true,
  mychoicelow: true,
  mychoicemid: true,
  mychoicehigh: true
};

function readJs(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitChunks(rawText, maxLen) {
  var text = String(rawText || '');
  if (!text) return [];
  var chunks = [];
  var sentences = text.split(/(?<=[.?!])\s+/);
  var current = '';
  for (var i = 0; i < sentences.length; i++) {
    var sentence = sentences[i];
    if (!sentence) continue;
    if ((current + ' ' + sentence).trim().length > maxLen && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += (current ? ' ' : '') + sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function uniq(arr) {
  var seen = {};
  var out = [];
  for (var i = 0; i < arr.length; i++) {
    var k = arr[i];
    if (!k || seen[k]) continue;
    seen[k] = true;
    out.push(k);
  }
  return out;
}

function loadPlanData() {
  var context = {
    window: {},
    console: console
  };
  vm.createContext(context);
  vm.runInContext(readJs('js/plan-registry.js'), context, {
    filename: 'plan-registry.js'
  });
  vm.runInContext(readJs('js/plan-data.js'), context, { filename: 'plan-data.js' });
  vm.runInContext(readJs('js/plan-data-extended.js'), context, {
    filename: 'plan-data-extended.js'
  });
  return {
    registry: context.CHA_PLAN_REGISTRY || [],
    docs: context.POLICY_DOCS || []
  };
}

function buildAliasSet(name, id) {
  var aliases = [];
  var normalized = normalizeText(name);
  var raw = String(name || '');
  if (raw) aliases.push(raw);
  if (normalized) aliases.push(normalized);
  if (id) aliases.push(String(id));

  var noParens = raw.replace(/\([^)]*\)/g, '').trim();
  if (noParens && noParens !== raw) {
    aliases.push(noParens);
    aliases.push(normalizeText(noParens));
  }

  var compactDigits = noParens.replace(/\s+(\d+)/g, '$1');
  if (compactDigits && compactDigits !== noParens) {
    aliases.push(compactDigits);
    aliases.push(normalizeText(compactDigits));
  }

  return uniq(aliases);
}

function buildCanonicalMap(registry, docs) {
  var mapById = {};
  var diskFiles = {};
  var kbEntries = fs.readdirSync(KB_DIR);
  for (var i = 0; i < kbEntries.length; i++) {
    var entry = kbEntries[i];
    if (/\.pdf$/i.test(entry)) diskFiles[entry] = true;
  }

  for (var r = 0; r < registry.length; r++) {
    var reg = registry[r];
    mapById[reg.id] = {
      planId: reg.id,
      planName: reg.name,
      type: reg.type || '',
      group: reg.group || '',
      aliases: buildAliasSet(reg.name, reg.id),
      pdfFiles: reg.pdfFile ? [reg.pdfFile] : [],
      status: 'ready',
      missingFiles: []
    };
  }

  for (var d = 0; d < docs.length; d++) {
    var doc = docs[d];
    var existing = mapById[doc.id];
    if (!existing) {
      existing = {
        planId: doc.id,
        planName: doc.name || doc.id,
        type: doc.type || '',
        group: doc.group || '',
        aliases: buildAliasSet(doc.name || doc.id, doc.id),
        pdfFiles: [],
        status: 'ready',
        missingFiles: []
      };
      mapById[doc.id] = existing;
    } else {
      existing.aliases = uniq(existing.aliases.concat(buildAliasSet(doc.name || doc.id, doc.id)));
      if (doc.name && !existing.planName) existing.planName = doc.name;
    }
    if (doc.source && existing.pdfFiles.indexOf(doc.source) === -1) {
      existing.pdfFiles.push(doc.source);
    }
  }

  var keys = Object.keys(mapById);
  for (var k = 0; k < keys.length; k++) {
    var id = keys[k];
    var item = mapById[id];
    if (EXPLICIT_EXCLUDED_PLAN_IDS[id]) {
      item.status = 'excluded';
      item.exclusionReason = 'missing_pdf_by_scope_decision';
      continue;
    }
    var missing = [];
    for (var p = 0; p < item.pdfFiles.length; p++) {
      if (!diskFiles[item.pdfFiles[p]]) missing.push(item.pdfFiles[p]);
    }
    item.missingFiles = missing;
    if (missing.length) {
      item.status = 'missing_pdf';
    }
  }

  return mapById;
}

function extractPlanKnowledge(plan, mapEntry) {
  var chunks = splitChunks(plan.rawText || '', 2200);
  var documents = [];
  for (var i = 0; i < mapEntry.pdfFiles.length; i++) {
    documents.push({
      fileName: mapEntry.pdfFiles[i],
      sourceType: /certificate/i.test(mapEntry.pdfFiles[i])
        ? 'certificate'
        : /brochure/i.test(mapEntry.pdfFiles[i])
          ? 'brochure'
          : 'spd',
      pages: [
        {
          pageNumber: 1,
          text: String(plan.rawText || ''),
          normalizedText: normalizeText(plan.rawText || '')
        }
      ]
    });
  }

  return {
    planId: plan.id,
    planName: plan.name || mapEntry.planName,
    status: mapEntry.status,
    documents: documents,
    chunks: chunks.map(function (chunk, idx) {
      return {
        chunkId: plan.id + '-c' + (idx + 1),
        text: chunk,
        tokenEstimate: Math.ceil(chunk.length / 4),
        pageRange: '1-1',
        normalizedText: normalizeText(chunk)
      };
    })
  };
}

function writeMapJs(mapById) {
  var mapArray = Object.keys(mapById).map(function (id) {
    return mapById[id];
  });
  mapArray.sort(function (a, b) {
    return String(a.planName).localeCompare(String(b.planName));
  });

  var aliasIndex = {};
  for (var i = 0; i < mapArray.length; i++) {
    var plan = mapArray[i];
    for (var a = 0; a < plan.aliases.length; a++) {
      aliasIndex[normalizeText(plan.aliases[a])] = plan.planId;
    }
    aliasIndex[normalizeText(plan.planName)] = plan.planId;
  }

  var output =
    '// AUTO-GENERATED by scripts/build-plan-pdf-knowledge.js\n' +
    '// Regenerate with: node scripts/build-plan-pdf-knowledge.js\n' +
    '(function () {\n' +
    '  window.CHA_PLAN_PDF_MAP = ' +
    JSON.stringify(mapArray, null, 2) +
    ';\n' +
    '  window.CHA_PLAN_ALIAS_INDEX = ' +
    JSON.stringify(aliasIndex, null, 2) +
    ';\n' +
    '})();\n';

  fs.writeFileSync(OUT_MAP_JS, output, 'utf8');
}

function writeKnowledgeArtifacts(mapById, docs) {
  ensureDir(path.dirname(OUT_INDEX_JSON));
  ensureDir(OUT_PLANS_DIR);

  var docsById = {};
  for (var i = 0; i < docs.length; i++) {
    docsById[docs[i].id] = docs[i];
  }

  var index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    plans: []
  };

  var ids = Object.keys(mapById);
  ids.sort();
  for (var p = 0; p < ids.length; p++) {
    var id = ids[p];
    var mapEntry = mapById[id];
    var doc = docsById[id];
    var hasText = !!(doc && doc.rawText && String(doc.rawText).trim());
    var artifact = {
      planId: id,
      planName: mapEntry.planName,
      status: hasText ? mapEntry.status : 'missing_pdf',
      pdfFiles: mapEntry.pdfFiles,
      chunkFile: 'plans/' + id + '.json'
    };
    index.plans.push(artifact);

    var planPayload = extractPlanKnowledge(doc || { id: id, name: mapEntry.planName, rawText: '' }, mapEntry);
    planPayload.status = artifact.status;
    fs.writeFileSync(
      path.join(OUT_PLANS_DIR, id + '.json'),
      JSON.stringify(planPayload, null, 2),
      'utf8'
    );
  }

  fs.writeFileSync(OUT_INDEX_JSON, JSON.stringify(index, null, 2), 'utf8');
}

function main() {
  var loaded = loadPlanData();
  var mapById = buildCanonicalMap(loaded.registry, loaded.docs);
  writeMapJs(mapById);
  writeKnowledgeArtifacts(mapById, loaded.docs);
  console.log('Wrote', path.relative(ROOT, OUT_MAP_JS));
  console.log('Wrote', path.relative(ROOT, OUT_INDEX_JSON));
  console.log('Wrote plan artifacts in', path.relative(ROOT, OUT_PLANS_DIR));
}

main();
