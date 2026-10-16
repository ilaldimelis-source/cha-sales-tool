// js/meds.js - Meds check (Oct 2026), built for live calls.
// The agent types every med the client says ("eliquis, ozempc, metformn").
// Each med is matched (typos allowed) and gets one line: PAP program and
// income limit (pap-lookup.com list; CHA has an agreement with Ventec SW
// LLC), whether the client qualifies now, and whether the program still
// takes them after they enroll in one of our plans (official program
// insurance wording). Tap a line for details, our plan coverage and GoodRx.
// Data: data/meds.json. Plans: CHA_PLAN_REGISTRY (NEO + FirstEnroll).

var MEDS_JSON_URL = 'data/meds.json?v=1792193126000';
var medsData = null;
var medsLoadStarted = false;
var medsIndex = [];
var medsByKey = {};
var medsState = { text: '', hh: '1', inc: '', st: '48', open: '' };

var MEDS_PLAN_RULES = [
  {
    groups: ['TDK'],
    label: 'TDK 1-5',
    test: function (d) {
      return !!d.tdk;
    },
    val: function (d) {
      return d.tdk === 'c' ? '$0 by mail' : '$0 at retail';
    },
    sub: function (d) {
      return d.tdk === 'c'
        ? 'MyLiveDoc list, 90-day mail order. TDK 1: home delivery not covered'
        : 'MyLiveDoc urgent care list, $250 max per person per year';
    },
    tone: 'ok'
  },
  {
    groups: ['GoodHealth'],
    label: 'GoodHealth 3-5',
    test: function (d) {
      return !!d.gh;
    },
    val: function () {
      return '$5 retail / $5 mail';
    },
    sub: function () {
      return 'BestChoiceRx preferred generic list';
    },
    tone: 'ok'
  },
  {
    groups: ['Smart Choice'],
    label: 'Smart Choice',
    test: function (d) {
      return !!d.sc && d.k === 'g';
    },
    val: function () {
      return '$12 preferred generic';
    },
    sub: function () {
      return 'If it is on the Ventegra acute list. Brand not covered';
    },
    tone: 'ok'
  },
  {
    ids: ['allstatestmcopay'],
    label: 'Allstate Copay Enhanced STM',
    test: function (d) {
      return d.k === 'g';
    },
    val: function () {
      return '$10 generic copay';
    },
    sub: function () {
      return '$3,000 Rx max';
    },
    tone: 'ok'
  },
  {
    groups: ['Harbor'],
    label: 'Harbor STM',
    test: function (d) {
      return d.k === 'g' || d.k === 'b';
    },
    val: function (d) {
      return d.k === 'g' ? '$25 generic copay' : '$500 Rx deductible';
    },
    sub: function (d) {
      return d.k === 'g'
        ? 'Only with the optional Rx rider. $5,000 Rx max'
        : 'Then coinsurance. Only with the optional Rx rider. $5,000 Rx max';
    },
    tone: 'mid'
  },
  {
    groups: ['Galena'],
    label: 'Galena STM',
    test: function (d) {
      return d.k === 'g';
    },
    val: function () {
      return '$0 by mail if on its list';
    },
    sub: function () {
      return 'ReviveHealth membership, maintenance meds by home delivery';
    },
    tone: 'mid'
  }
];

function medsEsc(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function medsMoney(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function medsKey(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\(insulin\)/g, '')
    .replace(/[^a-z0-9 -]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '');
}

function medsPlans() {
  var reg = typeof CHA_PLAN_REGISTRY !== 'undefined' ? CHA_PLAN_REGISTRY : [];
  return reg.filter(function (p) {
    return p.active !== false;
  });
}

function medsRuleMatches(rule, p) {
  if (rule.ids) return rule.ids.indexOf(p.id) !== -1;
  return rule.groups.indexOf(p.group) !== -1;
}

function medsBuildIndex() {
  medsIndex = [];
  medsByKey = {};
  var list = medsData.drugs || [];
  for (var i = 0; i < list.length; i++) {
    var d = list[i];
    var words = [medsKey(d.n)];
    if (d.a) {
      for (var j = 0; j < d.a.length; j++) words.push(medsKey(d.a[j]));
    }
    for (var w = 0; w < words.length; w++) {
      if (!medsByKey[words[w]] || d.pap) medsByKey[words[w]] = d;
      medsIndex.push({ key: words[w], d: d });
    }
  }
}

function medsFind(name) {
  return medsByKey[medsKey(name)] || null;
}

// Typo distance (Damerau-Levenshtein, optimal string alignment).
function medsDist(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  var prev2 = [];
  var prev = [];
  var cur;
  var i;
  var j;
  for (j = 0; j <= b.length; j++) prev[j] = j;
  for (i = 1; i <= a.length; i++) {
    cur = [i];
    var rowMin = i;
    for (j = 1; j <= b.length; j++) {
      var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      var v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (
        i > 1 &&
        j > 1 &&
        a.charAt(i - 1) === b.charAt(j - 2) &&
        a.charAt(i - 2) === b.charAt(j - 1)
      )
        v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[b.length];
}

// Best match for one typed med: exact, then starts-with, then typo.
function medsMatch(typed) {
  var k = medsKey(typed);
  if (!k) return null;
  if (medsByKey[k]) return { d: medsByKey[k], exact: true };
  var best = null;
  var bestScore = 99;
  var max = k.length <= 4 ? 1 : k.length <= 8 ? 2 : 3;
  for (var i = 0; i < medsIndex.length; i++) {
    var it = medsIndex[i];
    var score;
    if (k.length >= 4 && it.key.indexOf(k) === 0) {
      score = 0.5 + (it.key.length - k.length) / 100;
    } else {
      var head =
        it.key.length > k.length + 3 ? it.key.slice(0, k.length) : it.key;
      score = medsDist(k, head, max);
      if (head !== it.key) score += 0.3 + (it.key.length - k.length) / 100;
    }
    if (it.d.pap) score -= 0.05;
    if (score < bestScore) {
      bestScore = score;
      best = it.d;
    }
  }
  if (best && bestScore <= max + 0.5) return { d: best, exact: false };
  return null;
}

// Split what the agent typed: commas, new lines, semicolons, "and", "/".
function medsParse(text) {
  var parts = String(text || '').split(/[,;\n\/]+|\s+and\s+|\s+&\s+/i);
  var out = [];
  var seen = {};
  parts.forEach(function (raw) {
    var t = raw
      .replace(/\d+(\.\d+)?\s*(mg|mcg|ml|units?)\b/gi, '')
      .replace(/^\s+|\s+$/g, '');
    if (!t) return;
    var m = medsMatch(t);
    if (!m && t.indexOf(' ') !== -1) {
      // "eliquis ozempic" without a comma: try each word.
      t.split(/\s+/).forEach(function (w) {
        var mw = medsMatch(w);
        var id = mw ? mw.d.n : 'x:' + w;
        if (seen[id]) return;
        seen[id] = 1;
        out.push({
          typed: w,
          d: mw ? mw.d : null,
          exact: mw ? mw.exact : false
        });
      });
      return;
    }
    var id = m ? m.d.n : 'x:' + t;
    if (seen[id]) return;
    seen[id] = 1;
    out.push({ typed: t, d: m ? m.d : null, exact: m ? m.exact : false });
  });
  return out;
}

function medsPap(d) {
  if (!d) return null;
  if (d.pap) return d.pap;
  if (d.see) {
    var other = medsFind(d.see);
    if (other && other.pap) return other.pap;
  }
  return null;
}

function medsFplBase(n, st) {
  var t = medsData.fpl.table[st] || medsData.fpl.table['48'];
  return t[0] + t[1] * (n - 1);
}

function medsIncome() {
  var v = parseFloat(String(medsState.inc).replace(/[^0-9.]/g, ''));
  return isFinite(v) && v > 0 ? v : 0;
}

var MEDS_AFTER = {
  yes: ['ok', 'Stays eligible'],
  likely: ['mid', 'Likely stays eligible'],
  unclear: ['warn', 'Ask the program'],
  not_checked: ['warn', 'Ask the program'],
  no: ['bad', 'Not eligible']
};

var MEDS_AFTER_TEXT = {
  yes: 'The program checks coverage for this drug, not insurance in general. Most of our plans do not cover brand drugs.',
  likely:
    'The program does not say how it treats plans like ours. The client lists the plan on the application.',
  unclear:
    'The program rules conflict or are not published. Ask the program before the client counts on it.',
  not_checked:
    'Not checked yet. Ask the program whether a private plan affects eligibility.',
  no: 'The program turns away anyone with private insurance. Make sure the client knows this before they enroll in our plan.'
};

function medsTag(tone, text) {
  return (
    '<span class="med-tag med-tag-' + tone + '">' + medsEsc(text) + '</span>'
  );
}

function medsPlanPays(d) {
  var plans = medsPlans();
  var rows = [];
  for (var r = 0; r < MEDS_PLAN_RULES.length; r++) {
    var rule = MEDS_PLAN_RULES[r];
    var has = plans.some(function (p) {
      return medsRuleMatches(rule, p);
    });
    if (has && rule.test(d))
      rows.push(rule.label + ': ' + rule.val(d) + ' (' + rule.sub(d) + ')');
  }
  return rows;
}

function medsRowHtml(item, idx) {
  var d = item.d;
  var typedNote =
    d && !item.exact
      ? '<span class="med-typed">you typed "' + medsEsc(item.typed) + '"</span>'
      : '';
  if (!d) {
    return (
      '<div class="med-line is-miss"><div class="med-c-name"><b>' +
      medsEsc(item.typed) +
      '</b><span class="med-typed">Not found. Check the spelling.</span></div>' +
      '<div class="med-c-prog med-hide-m">-</div><div class="med-c-lim med-hide-m">-</div><div class="med-c-now med-hide-m">-</div><div class="med-c-after med-hide-m">-</div><div class="med-hide-m"></div></div>'
    );
  }
  var p = medsPap(d);
  var open = medsState.open === d.n;
  var cells;
  if (p) {
    var n = parseInt(medsState.hh, 10) || 1;
    var fpl = medsFplBase(n, medsState.st);
    var limit = (fpl * p.f) / 100;
    var inc = medsIncome();
    var now = inc
      ? inc <= limit
        ? medsTag('ok', 'Qualifies')
        : medsTag('bad', 'Over limit')
      : '<span class="med-dim">Enter income</span>';
    var after = MEDS_AFTER[p.o] || MEDS_AFTER.not_checked;
    var prog = (medsData.programs[p.p] || {}).name || 'Program not on file';
    cells =
      '<div class="med-c-prog">' +
      medsEsc(prog) +
      '</div>' +
      '<div class="med-c-lim">' +
      p.f +
      '% - ' +
      medsMoney(limit) +
      '</div>' +
      '<div class="med-c-now">' +
      now +
      '</div>' +
      '<div class="med-c-after">' +
      medsTag(after[0], after[1]) +
      '</div>';
  } else {
    var pays = medsPlanPays(d).length;
    cells =
      '<div class="med-c-prog med-dim">Not a PAP med</div><div class="med-c-lim med-dim med-hide-m">-</div><div class="med-c-now med-dim med-hide-m">-</div>' +
      '<div class="med-c-after">' +
      (pays
        ? medsTag('neutral', pays + (pays === 1 ? ' plan pays' : ' plans pay'))
        : '<span class="med-dim">No plan pays</span>') +
      '</div>';
  }
  return (
    '<button type="button" class="med-line' +
    (open ? ' is-open' : '') +
    '" data-meds-open="' +
    medsEsc(d.n) +
    '" aria-expanded="' +
    (open ? 'true' : 'false') +
    '"><div class="med-c-name"><b>' +
    medsEsc(d.n) +
    '</b>' +
    typedNote +
    '</div>' +
    cells +
    '<div class="med-c-arrow" aria-hidden="true">' +
    (open ? '&#9650;' : '&#9660;') +
    '</div></button>' +
    (open ? medsDetailHtml(d, idx) : '')
  );
}

function medsDetailHtml(d) {
  var p = medsPap(d);
  var left = '';
  if (p) {
    var prog = medsData.programs[p.p] || {};
    var url = p.u || prog.url;
    left +=
      '<div class="med-label">If they enroll in our plan</div><p>' +
      medsEsc(MEDS_AFTER_TEXT[p.o] || MEDS_AFTER_TEXT.not_checked) +
      '</p>';
    if (p.q)
      left +=
        '<blockquote class="med-quote">"' + medsEsc(p.q) + '"</blockquote>';
    if (p.x)
      left +=
        '<p class="med-warn">The drug maker\'s site no longer lists this med in its program (checked Oct 2026). Confirm before applying.</p>';
    if (url)
      left +=
        '<a class="med-btn med-btn-accent" href="' +
        medsEsc(url) +
        '" target="_blank" rel="noopener">Program site</a>';
  }
  var pays = medsPlanPays(d);
  var right =
    '<div class="med-label">Our plans</div><p>' +
    (pays.length
      ? medsEsc(pays.join('; '))
      : 'Not covered by the plans we sell, or not on file.') +
    '</p>' +
    '<a class="med-btn" href="https://www.goodrx.com/' +
    medsEsc(medsKey(d.n).replace(/\s+/g, '-')) +
    '" target="_blank" rel="noopener">GoodRx price</a>';
  return (
    '<div class="med-detail"><div>' +
    left +
    '</div><div>' +
    right +
    '</div></div>'
  );
}

function medsSummaryHtml(items) {
  var found = items.filter(function (it) {
    return it.d;
  });
  var paps = found.filter(function (it) {
    return medsPap(it.d);
  });
  var inc = medsIncome();
  var n = parseInt(medsState.hh, 10) || 1;
  var fpl = medsFplBase(n, medsState.st);
  var ok = [];
  var fit = [];
  if (inc) {
    paps.forEach(function (it) {
      var p = medsPap(it.d);
      if (inc <= (fpl * p.f) / 100) {
        ok.push(it.d.n);
        if (p.o === 'yes' || p.o === 'likely') fit.push(it.d.n);
      }
    });
  }
  var html =
    medsTag(
      'neutral',
      found.length + (found.length === 1 ? ' med found' : ' meds found')
    ) +
    medsTag(
      'mid',
      paps.length + ' PAP ' + (paps.length === 1 ? 'med' : 'meds')
    );
  if (inc)
    html += medsTag(
      ok.length ? 'ok' : 'bad',
      ok.length +
        ' qualif' +
        (ok.length === 1 ? 'ies' : 'y') +
        ' now' +
        (ok.length ? ': ' + ok.join(', ') : '')
    );
  if (inc && ok.length)
    html += medsTag(
      fit.length ? 'ok' : 'warn',
      'Still eligible on our plan: ' + (fit.length ? fit.join(', ') : 'none')
    );
  html +=
    '<span class="med-dim">Poverty line for ' +
    n +
    ': ' +
    medsMoney(fpl) +
    (inc ? ' - client is at ' + Math.round((inc / fpl) * 100) + '%' : '') +
    '</span>';
  return '<div class="med-summary">' + html + '</div>';
}

function medsRxSaversHtml() {
  var t = (medsData.rxsavers && medsData.rxsavers.tiers) || [];
  var tiers = t
    .map(function (v, i) {
      return '<span>Tier ' + (i + 1) + ' $' + v.toFixed(2) + '</span>';
    })
    .join('');
  return (
    '<details class="med-rxs"><summary><b>RxSavers</b><span>Not insurance. Approval not guaranteed. Client and doctor sign each application. Never tell a client to say they have no insurance.</span><span class="med-rxs-open">Prices</span></summary>' +
    '<div class="med-rxs-tiers">' +
    tiers +
    '<em>per month</em></div></details>'
  );
}

function medsRenderResults() {
  var host = document.getElementById('meds-results');
  if (!host || !medsData) return;
  var items = medsParse(medsState.text);
  if (!items.length) {
    host.innerHTML =
      '<p class="med-empty">Type the meds the client says, separated by commas. Example: eliquis, ozempic, metformin</p>' +
      medsRxSaversHtml();
    return;
  }
  host.innerHTML =
    medsSummaryHtml(items) +
    '<div class="med-table" role="list">' +
    '<div class="med-line med-head" aria-hidden="true"><div>Med</div><div>PAP program</div><div>Income limit for ' +
    medsEsc(medsState.hh) +
    '</div><div>Client now</div><div>After our plan</div><div></div></div>' +
    items.map(medsRowHtml).join('') +
    '</div>' +
    '<p class="med-src">PAP meds and income limits: pap-lookup.com list. Program insurance rules: official program sites, checked ' +
    medsEsc(medsData.checked) +
    '. Poverty line: HHS ' +
    medsEsc(medsData.fpl.year) +
    '. Plans: Plan Vault.</p>' +
    medsRxSaversHtml();
}

var medsTimer = null;

function medsOnInput(e) {
  var t = e.target;
  if (t.id === 'meds-text') medsState.text = t.value;
  else if (t.id === 'meds-inc') medsState.inc = t.value;
  else if (t.id === 'meds-hh') medsState.hh = t.value;
  else if (t.id === 'meds-st') medsState.st = t.value;
  else return;
  if (medsTimer) clearTimeout(medsTimer);
  medsTimer = setTimeout(medsRenderResults, 150);
}

function medsOnClick(e) {
  var row = e.target.closest ? e.target.closest('[data-meds-open]') : null;
  if (!row) return;
  var name = row.getAttribute('data-meds-open');
  medsState.open = medsState.open === name ? '' : name;
  medsRenderResults();
}

function renderMeds() {
  var root = document.getElementById('page-meds');
  if (!root) return;
  if (!root.getAttribute('data-meds-ready')) {
    var hh = '';
    for (var i = 1; i <= 10; i++)
      hh += '<option value="' + i + '">' + i + '</option>';
    root.innerHTML =
      '<div class="med-page">' +
      '<header class="med-header"><h2>Meds check</h2>' +
      "<p>Type the client's meds as they say them. Commas, typos and spaces are fine.</p></header>" +
      '<div class="med-form">' +
      '<label class="med-f-meds"><span>Client meds</span><textarea id="meds-text" rows="1" autocomplete="off" spellcheck="false" placeholder="eliquis, ozempic, metformin"></textarea></label>' +
      '<label><span>Household</span><select id="meds-hh">' +
      hh +
      '</select></label>' +
      '<label><span>Yearly income</span><input id="meds-inc" type="text" inputmode="numeric" placeholder="$0"></label>' +
      '<label><span>State</span><select id="meds-st"><option value="48">48 states + DC</option><option value="AK">Alaska</option><option value="HI">Hawaii</option></select></label>' +
      '</div>' +
      '<div id="meds-results"><p class="med-empty">Loading meds...</p></div>' +
      '</div>';
    root.setAttribute('data-meds-ready', '1');
    root.addEventListener('input', medsOnInput);
    root.addEventListener('change', medsOnInput);
    root.addEventListener('click', medsOnClick);
  }
  if (medsData) {
    medsRenderResults();
    return;
  }
  if (medsLoadStarted) return;
  medsLoadStarted = true;
  fetch(MEDS_JSON_URL)
    .then(function (response) {
      if (!response.ok) throw new Error('load failed');
      return response.json();
    })
    .then(function (data) {
      medsData = data;
      medsBuildIndex();
      medsRenderResults();
    })
    .catch(function () {
      medsLoadStarted = false;
      var host = document.getElementById('meds-results');
      if (host)
        host.innerHTML =
          '<p class="med-empty">Meds could not load. Check your connection and open the tab again.</p>';
    });
}
