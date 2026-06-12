#!/usr/bin/env node
/* scripts/generate-course-215.js -- Build js/course-215.js from remixed HTML + QA200 */
'use strict';

var fs = require('fs');
var path = require('path');
var generateUiEngine = require('./generate-course-215-ui.js');

var ROOT = path.join(__dirname, '..');
var HTML_PATH = path.join(ROOT, 'remixed-51a5fde9.html');
if (!fs.existsSync(HTML_PATH)) {
  HTML_PATH = path.join(__dirname, 'remixed-51a5fde9.html');
}
var QA_PATH = path.join(ROOT, 'js', 'course-215.js');
var OUT_PATH = path.join(ROOT, 'js', 'course-215.js');

var SECTION_IDS = [
  'blueprint', 'priority', 'examtraps', 'strategy', 'cheatsheet', 'mnemonics',
  'life', 'annuities', 'provisions', 'health', 'disability', 'medicare',
  'florida', 'numbers', 'illegal'
];

var C215_TABS = [
  { id: 'blueprint', label: 'Blueprint', type: 'content' },
  { id: 'priority', label: 'Priority', type: 'content' },
  { id: 'examtraps', label: 'Exam Traps', type: 'content' },
  { id: 'strategy', label: 'Strategy', type: 'content' },
  { id: 'cheatsheet', label: 'Cheat Sheets', type: 'content' },
  { id: 'mnemonics', label: 'Mnemonics', type: 'mnemonics' },
  { id: 'flashcards', label: 'Flashcards', type: 'flashcards' },
  { id: 'life', label: 'Life Insurance', type: 'content' },
  { id: 'annuities', label: 'Annuities', type: 'content' },
  { id: 'provisions', label: 'Provisions', type: 'content' },
  { id: 'health', label: 'Health', type: 'content' },
  { id: 'disability', label: 'Disability', type: 'content' },
  { id: 'medicare', label: 'Medicare', type: 'content' },
  { id: 'florida', label: 'FL Statutes', type: 'content' },
  { id: 'numbers', label: 'All Numbers', type: 'numbers' },
  { id: 'illegal', label: 'Illegal Practices', type: 'content' },
  { id: 'quiz', label: 'Quiz', type: 'quiz' }
];

var EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu;

function stripEmoji(text) {
  return text.replace(EMOJI_RE, '').replace(/\s+/g, ' ').trim();
}

function slugify(text) {
  var s = stripEmoji(text)
    .toLowerCase()
    .replace(/\u2014/g, '--')
    .replace(/—/g, '--')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return s || 'section';
}

function replaceEmDash(text) {
  return text.replace(/\u2014/g, '--').replace(/—/g, '--');
}

function removeEmTags(html) {
  return html.replace(/<\/?em>/gi, '');
}

function transformHtml(html) {
  var result = replaceEmDash(html);

  result = result.replace(/class="card"/g, 'class="c215-ref-card"');
  result = result.replace(/class="box red"/g, 'class="c215-ref-trap"');
  result = result.replace(/class="box green"/g, 'class="c215-ref-tip"');
  result = result.replace(/class="box yellow"/g, 'class="c215-ref-warn"');
  result = result.replace(/class="box blue"/g, 'class="c215-ref-info"');
  result = result.replace(/class="box orange"/g, 'class="c215-ref-warn"');
  result = result.replace(/class="box purple"/g, 'class="c215-ref-info"');
  result = result.replace(/class="box dark"/g, 'class="c215-ref-note"');
  result = result.replace(/class="mnemonic"/g, 'class="c215-ref-mnem"');
  result = result.replace(/table class="t"/g, 'table class="c215-ref-tbl"');
  result = result.replace(/class="compare"/g, 'class="c215-ref-compare"');
  result = result.replace(/class="numgrid"/g, 'class="c215-ref-numgrid"');
  result = result.replace(/class="numcard"/g, 'class="c215-ref-numcard"');
  result = result.replace(/class="exam-tip"/g, 'class="c215-ref-tip"');
  result = result.replace(/class="trap-tip"/g, 'class="c215-ref-trap"');
  result = result.replace(/class="big-tip"/g, 'class="c215-ref-brain"');

  result = result.replace(/class="grid2"/g, 'class="c215-grid"');
  result = result.replace(/class="grid3"/g, 'class="c215-grid"');

  result = result.replace(
    /(<div class="c215-ref-card)([^"]*)">([\s\S]*?<span class="tag tag-hot")/gi,
    function (m, prefix, extra, rest) {
      if (m.indexOf('c215-hot-card') >= 0) { return m; }
      return prefix + extra + ' c215-hot-card">' + rest;
    }
  );
  result = result.replace(
    /<span class="tag tag-hot">[^<]*<\/span>/gi,
    '<span class="c215-hot-ribbon">HOT</span>'
  );
  result = result.replace(/<span class="tag tag-[^"]*">([^<]*)<\/span>/gi, '<span class="c215-card-tag">$1</span>');

  result = removeEmTags(result);
  return result.trim();
}

function splitAccordions(sectionHtml) {
  var groups = [];
  var re = /<div class="tlabel">([^<]*)<\/div>/gi;
  var matches = [];
  var m;
  while ((m = re.exec(sectionHtml)) !== null) {
    matches.push({ title: m[1], index: m.index, end: m.index + m[0].length });
  }

  if (matches.length === 0) {
    groups.push({ id: 'content', title: 'Content', html: transformHtml(sectionHtml) });
    return groups;
  }

  var pre = sectionHtml.slice(0, matches[0].index).trim();
  if (pre) {
    groups.push({ id: 'intro', title: 'Overview', html: transformHtml(pre) });
  }

  var usedIds = {};
  var i;
  for (i = 0; i < matches.length; i++) {
    var start = matches[i].end;
    var end = i + 1 < matches.length ? matches[i + 1].index : sectionHtml.length;
    var content = sectionHtml.slice(start, end).trim();
    var title = replaceEmDash(stripEmoji(matches[i].title));
    var id = slugify(title);
    if (usedIds[id]) {
      usedIds[id]++;
      id = id + '-' + usedIds[id];
    } else {
      usedIds[id] = 1;
    }
    groups.push({ id: id, title: title, html: transformHtml(content) });
  }
  return groups;
}

function extractSections(html) {
  var sections = {};
  var i, sid, re, match, inner;
  for (i = 0; i < SECTION_IDS.length; i++) {
    sid = SECTION_IDS[i];
    re = new RegExp('<section id="' + sid + '"[^>]*>([\\s\\S]*?)<\\/section>', 'i');
    match = html.match(re);
    if (!match) {
      console.warn('WARN: section not found: ' + sid);
      sections[sid] = [];
      continue;
    }
    inner = match[1];
    sections[sid] = splitAccordions(inner);
  }
  return sections;
}

function extractMnemonics(html) {
  var sectionRe = /<section id="mnemonics"[^>]*>([\s\S]*?)<\/section>/i;
  var sectionMatch = html.match(sectionRe);
  if (!sectionMatch) return [];

  var sectionHtml = sectionMatch[1];
  var blockRe = /<div class="mnemonic">([\s\S]*?)<\/div>\s*(?=<div class="mnemonic">|<\/section>|$)/gi;
  var items = [];
  var m;
  while ((m = blockRe.exec(sectionHtml)) !== null) {
    var block = m[1];
    var phraseMatch = block.match(/<div class="word">([^<]*)<\/div>/i);
    var breakdownMatch = block.match(/<div class="breakdown">([\s\S]*?)<\/div>/i);
    if (!phraseMatch) continue;
    var phrase = replaceEmDash(stripEmoji(phraseMatch[1]));
    var breakdownHtml = breakdownMatch ? transformHtml(breakdownMatch[1]) : '';
    breakdownHtml = breakdownHtml
      .replace(/class="word"/g, '')
      .replace(/class="breakdown"/g, '');
    items.push({
      id: slugify(phrase.split(' ')[0] || phrase),
      phrase: phrase,
      html: '<div class="c215-mnemonic-line">' + breakdownHtml + '</div>'
    });
  }
  return items;
}

function extractBrainDump(html) {
  var priorityRe = /<section id="priority"[^>]*>([\s\S]*?)<\/section>/i;
  var priorityMatch = html.match(priorityRe);
  if (!priorityMatch) return [];

  var bigTipRe = /<div class="big-tip">([\s\S]*?)<\/div>/i;
  var bigTipMatch = priorityMatch[1].match(bigTipRe);
  if (!bigTipMatch) return [];

  var liRe = /<li>([^<]*(?:<[^/][^>]*>[^<]*)*)<\/li>/gi;
  var items = [];
  var lm;
  while ((lm = liRe.exec(bigTipMatch[1])) !== null) {
    var text = lm[1].replace(/<[^>]+>/g, '').trim();
    text = replaceEmDash(stripEmoji(text));
    if (text) items.push(text);
  }

  if (items.length > 6) {
    return items.slice(0, 6);
  }
  return items;
}

function extractQA200(existingJs) {
  var start = existingJs.indexOf('var QA200 = [');
  if (start < 0) throw new Error('QA200 array not found in ' + QA_PATH);
  var end = existingJs.indexOf('];', start);
  if (end < 0) throw new Error('QA200 array end not found');
  return existingJs.slice(start, end + 2);
}

function jsString(value) {
  return JSON.stringify(value);
}

function serializeSections(sections) {
  var lines = ['var C215_SECTIONS = {'];
  var keys = Object.keys(sections);
  var ki, groups, gi;
  for (ki = 0; ki < keys.length; ki++) {
    lines.push('  ' + jsString(keys[ki]) + ': [');
    groups = sections[keys[ki]];
    for (gi = 0; gi < groups.length; gi++) {
      lines.push('    { id: ' + jsString(groups[gi].id) +
        ', title: ' + jsString(groups[gi].title) +
        ', html: ' + jsString(groups[gi].html) + ' }' +
        (gi < groups.length - 1 ? ',' : ''));
    }
    lines.push('  ]' + (ki < keys.length - 1 ? ',' : ''));
  }
  lines.push('};');
  return lines.join('\n');
}

function serializeMnemonics(items) {
  var lines = ['var C215_MNEMONICS = ['];
  var i;
  for (i = 0; i < items.length; i++) {
    lines.push('  { id: ' + jsString(items[i].id) +
      ', phrase: ' + jsString(items[i].phrase) +
      ', html: ' + jsString(items[i].html) + ' }' +
      (i < items.length - 1 ? ',' : ''));
  }
  lines.push('];');
  return lines.join('\n');
}

function serializeBrainDump(items) {
  var lines = ['var C215_BRAIN_DUMP = ['];
  var i;
  for (i = 0; i < items.length; i++) {
    lines.push('  ' + jsString(items[i]) + (i < items.length - 1 ? ',' : ''));
  }
  lines.push('];');
  return lines.join('\n');
}

function serializeTabs(tabs) {
  var lines = ['var C215_TABS = ['];
  var i;
  for (i = 0; i < tabs.length; i++) {
    lines.push('  { id: ' + jsString(tabs[i].id) +
      ', label: ' + jsString(tabs[i].label) +
      ', type: ' + jsString(tabs[i].type) + ' }' +
      (i < tabs.length - 1 ? ',' : ''));
  }
  lines.push('];');
  return lines.join('\n');
}

function countLines(text) {
  return text.split('\n').length;
}

function main() {
  var issues = [];

  if (!fs.existsSync(HTML_PATH)) {
    throw new Error('Missing HTML source: ' + HTML_PATH);
  }
  if (!fs.existsSync(QA_PATH)) {
    throw new Error('Missing QA source: ' + QA_PATH);
  }

  var html = fs.readFileSync(HTML_PATH, 'utf8');
  var existingJs = fs.readFileSync(QA_PATH, 'utf8');
  var qa200Block = extractQA200(existingJs);

  var sections = extractSections(html);
  var mnemonics = extractMnemonics(html);
  var brainDump = extractBrainDump(html);

  if (mnemonics.length !== 16) {
    issues.push('Expected 16 mnemonics, got ' + mnemonics.length);
  }
  if (brainDump.length !== 6) {
    issues.push('Expected 6 brain dump items, got ' + brainDump.length);
  }

  var parts = [];
  parts.push('/* js/course-215.js -- FL 2-15 Crash Course -- generated by scripts/generate-course-215.js */');
  parts.push('/* jshint esversion: 5 */');
  parts.push('');
  parts.push('(function() {');
  parts.push("'use strict';");
  parts.push('');
  parts.push('/* -- QA200 DATA (copied as-is) -- */');
  parts.push(qa200Block);
  parts.push('');
  parts.push(serializeSections(sections));
  parts.push('');
  parts.push(serializeMnemonics(mnemonics));
  parts.push('');
  parts.push(serializeBrainDump(brainDump));
  parts.push('');
  parts.push(serializeTabs(C215_TABS));
  parts.push('');
  parts.push(generateUiEngine());
  parts.push('})();');
  parts.push('');

  var output = parts.join('\n');
  fs.writeFileSync(OUT_PATH, output, 'utf8');

  var sectionCounts = {};
  var sid;
  for (sid in sections) {
    if (sections.hasOwnProperty(sid)) {
      sectionCounts[sid] = sections[sid].length;
    }
  }

  console.log('Generated: ' + OUT_PATH);
  console.log('Line count: ' + countLines(output));
  console.log('QA200: preserved from existing file');
  console.log('C215_SECTIONS accordion groups: ' + JSON.stringify(sectionCounts));
  console.log('C215_MNEMONICS: ' + mnemonics.length);
  console.log('C215_BRAIN_DUMP: ' + brainDump.length);
  console.log('C215_TABS: ' + C215_TABS.length);
  if (issues.length) {
    console.log('Issues:');
    issues.forEach(function (msg) { console.log('  - ' + msg); });
  } else {
    console.log('Issues: none');
  }
}

main();
