// js/meds.js - Meds check (Oct 2026), built for live calls.
// Everything comes from pap-lookup.com (Ventec SW LLC; CHA has an
// agreement to use it): the PAP med list, manufacturer, income
// multiplier and the poverty-line figures. The limit for a household is
// worked out the same way pap-lookup does it:
//   multiplier% x (1-person amount + (household - 1) x extra-person amount)
// The agent types every med the client says ("eliquis, ozempc, metformn");
// typos are matched to the closest med on the list.
// Data: data/meds.json (synced from pap-lookup.com).

var MEDS_JSON_URL = 'data/meds.json?v=1792193893000';
var medsData = null;
var medsLoadStarted = false;
var medsList = [];
var medsByKey = {};
var medsState = { text: '', hh: '1' };
var medsTimer = null;

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
    .replace(/[^a-z0-9 -]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '');
}

function medsBuildIndex() {
  medsList = [];
  medsByKey = {};
  (medsData.meds || []).forEach(function (m) {
    var item = { n: m[0], m: m[1], f: m[2], key: medsKey(m[0]) };
    medsList.push(item);
    if (!medsByKey[item.key]) medsByKey[item.key] = item;
  });
}

// pap-lookup's household limit (all its meds use the 48-state figures).
function medsLimit(item) {
  var n = parseInt(medsState.hh, 10) || 1;
  var base = medsData.fpl.base['48'];
  var extra = medsData.fpl.extra['48'];
  var pct = item.f / 100;
  return pct * base + (n - 1) * extra * pct;
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

// Closest med on the list: exact, then starts-with, then typo.
function medsMatch(typed) {
  var k = medsKey(typed);
  if (!k) return null;
  if (medsByKey[k]) return { item: medsByKey[k], exact: true };
  var best = null;
  var bestScore = 99;
  var max = k.length <= 4 ? 1 : k.length <= 8 ? 2 : 3;
  for (var i = 0; i < medsList.length; i++) {
    var it = medsList[i];
    var score;
    if (k.length >= 3 && it.key.indexOf(k) === 0) {
      score = 0.5 + (it.key.length - k.length) / 100;
    } else {
      var head =
        it.key.length > k.length + 3 ? it.key.slice(0, k.length) : it.key;
      score = medsDist(k, head, max);
      if (head !== it.key) score += 0.3 + (it.key.length - k.length) / 100;
    }
    if (score < bestScore) {
      bestScore = score;
      best = it;
    }
  }
  if (best && bestScore <= max + 0.5) return { item: best, exact: false };
  return null;
}

// Split what the agent typed: commas, new lines, semicolons, "and", "/".
function medsParse(text) {
  var parts = String(text || '').split(/[,;\n\/]+|\s+and\s+|\s+&\s+/i);
  var out = [];
  var seen = {};
  var add = function (typed, m) {
    var id = m ? m.item.n : 'x:' + typed.toLowerCase();
    if (seen[id]) return;
    seen[id] = 1;
    out.push({
      typed: typed,
      item: m ? m.item : null,
      exact: m ? m.exact : false
    });
  };
  parts.forEach(function (raw) {
    var t = raw
      .replace(/\d+(\.\d+)?\s*(mg|mcg|ml|units?)\b/gi, '')
      .replace(/^\s+|\s+$/g, '');
    if (!t) return;
    var m = medsMatch(t);
    if (!m && t.indexOf(' ') !== -1) {
      // "eliquis ozempic" typed without a comma: try each word.
      t.split(/\s+/).forEach(function (w) {
        add(w, medsMatch(w));
      });
      return;
    }
    add(t, m);
  });
  return out;
}

function medsTag(tone, text) {
  return (
    '<span class="med-tag med-tag-' + tone + '">' + medsEsc(text) + '</span>'
  );
}

function medsRowHtml(row) {
  if (!row.item) {
    return (
      '<div class="med-line is-miss"><div class="med-c-name"><b>' +
      medsEsc(row.typed) +
      '</b></div><div class="med-c-wide">Not on the PAP list</div></div>'
    );
  }
  var it = row.item;
  var popular = (medsData.popular || []).indexOf(it.n) !== -1;
  return (
    '<div class="med-line"><div class="med-c-name"><b>' +
    (popular
      ? '<span class="med-star" title="Most popular">&#9733;</span> '
      : '') +
    medsEsc(it.n) +
    '</b>' +
    (row.typed && !row.exact
      ? '<span class="med-typed">you typed "' + medsEsc(row.typed) + '"</span>'
      : '') +
    '</div>' +
    '<div class="med-c-maker">' +
    medsEsc(it.m) +
    '</div>' +
    '<div class="med-c-mult">' +
    medsTag('mid', it.f + '% FPL') +
    '</div>' +
    '<div class="med-c-lim">' +
    medsTag('ok', 'up to ' + medsMoney(medsLimit(it))) +
    '</div></div>'
  );
}

function medsSummaryHtml(rows) {
  var found = rows.filter(function (r) {
    return r.item;
  }).length;
  var html = medsTag('mid', found + ' of ' + rows.length + ' on the PAP list');
  var tiers = (medsData.rxsavers && medsData.rxsavers.tiers) || [];
  if (found && tiers.length) {
    var tier = Math.min(found, tiers.length);
    html += medsTag(
      'neutral',
      'RxSavers: ' +
        found +
        ' brand ' +
        (found === 1 ? 'med' : 'meds') +
        ' = Tier ' +
        tier +
        ', $' +
        tiers[tier - 1].toFixed(2) +
        '/mo' +
        (found > tiers.length ? ' (highest tier listed)' : '')
    );
  }
  return '<div class="med-summary">' + html + '</div>';
}

function medsRenderResults() {
  var host = document.getElementById('meds-results');
  if (!host || !medsData) return;
  var text = medsState.text;
  var multi = /[,;\n\/]|\s+and\s+/i.test(text);
  var rows;
  var summary = '';
  if (multi) {
    rows = medsParse(text);
    summary = medsSummaryHtml(rows);
  } else if (medsKey(text)) {
    var k = medsKey(text);
    rows = medsList
      .filter(function (it) {
        return it.key.indexOf(k) !== -1;
      })
      .map(function (it) {
        return { item: it, exact: true };
      });
    if (!rows.length) rows = medsParse(text);
  } else {
    rows = medsList.map(function (it) {
      return { item: it, exact: true };
    });
  }
  host.innerHTML =
    summary +
    '<div class="med-table">' +
    '<div class="med-line med-head"><div>Medication</div><div>Manufacturer</div><div>Income multiplier</div><div>FPL for ' +
    medsEsc(medsState.hh) +
    (medsState.hh === '1' ? ' person' : ' people') +
    '</div></div>' +
    rows.map(medsRowHtml).join('') +
    '</div>' +
    '<p class="med-src">Source: ' +
    medsEsc(medsData.source) +
    ', ' +
    medsEsc(medsData.asOf) +
    '. ' +
    medsList.length +
    ' meds.</p>' +
    '<p class="med-rxs">RxSavers: not insurance, approval not guaranteed, client and doctor sign each application.</p>';
}

function medsOnInput(e) {
  var t = e.target;
  if (t.id === 'meds-text') medsState.text = t.value;
  else if (t.id === 'meds-hh') medsState.hh = t.value;
  else return;
  if (medsTimer) clearTimeout(medsTimer);
  medsTimer = setTimeout(medsRenderResults, 150);
}

function renderMeds() {
  var root = document.getElementById('page-meds');
  if (!root) return;
  if (!root.getAttribute('data-meds-ready')) {
    var hh = '';
    for (var i = 1; i <= 20; i++)
      hh += '<option value="' + i + '">' + i + '</option>';
    root.innerHTML =
      '<div class="med-page">' +
      '<header class="med-header"><h2>Meds check</h2>' +
      "<p>Type the client's meds as they say them, separated by commas. Typos are fine.</p></header>" +
      '<div class="med-form">' +
      '<label class="med-f-meds"><span>Client meds</span><textarea id="meds-text" rows="1" autocomplete="off" spellcheck="false" placeholder="eliquis, ozempic, trulicity"></textarea></label>' +
      '<label><span>Family unit size</span><select id="meds-hh">' +
      hh +
      '</select></label>' +
      '</div>' +
      '<div id="meds-results"><p class="med-empty">Loading meds...</p></div>' +
      '</div>';
    root.setAttribute('data-meds-ready', '1');
    root.addEventListener('input', medsOnInput);
    root.addEventListener('change', medsOnInput);
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
