// js/meds.js - Meds tab (Oct 2026)
// One search card per medication: what the plans we sell pay for it,
// patient assistance (PAP) that is open to our plan members, and the
// cost steps when nothing pays. Data: data/meds.json (plan drug lists,
// PAP rules checked on official program sites, 2026 poverty line).
// Plan rows come from the plan documents in Plan Vault. Only plans in
// CHA_PLAN_REGISTRY (NEO + FirstEnroll storefronts) are shown.

var MEDS_JSON_URL = 'data/meds.json?v=1792200100000';
var medsData = null;
var medsLoadStarted = false;
var medsIndex = [];
var medsState = {
  q: '',
  sel: '',
  plat: 'All',
  type: 'All',
  inc: '',
  hh: '1',
  st: '48'
};

// What each plan we sell pays, from the Rx line of its plan documents
// (see PD_SHORT_VALUES in js/policy-docs.js). A rule only shows a row
// when the drug list or drug kind says the plan pays something.
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
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '');
}

function medsPlans() {
  var reg = typeof CHA_PLAN_REGISTRY !== 'undefined' ? CHA_PLAN_REGISTRY : [];
  return reg.filter(function (p) {
    return p.active !== false;
  });
}

function medsPlanPasses(p) {
  if (medsState.plat !== 'All' && p.platform !== medsState.plat) return false;
  if (medsState.type !== 'All' && p.type !== medsState.type) return false;
  return true;
}

function medsRuleMatches(rule, p) {
  if (rule.ids) return rule.ids.indexOf(p.id) !== -1;
  return rule.groups.indexOf(p.group) !== -1;
}

function medsFind(name) {
  var k = medsKey(name);
  for (var i = 0; i < medsIndex.length; i++) {
    if (medsIndex[i].key === k) return medsIndex[i].d;
  }
  return null;
}

function medsBuildIndex() {
  medsIndex = [];
  var list = medsData.drugs || [];
  for (var i = 0; i < list.length; i++) {
    var d = list[i];
    var words = [medsKey(d.n)];
    if (d.a) {
      for (var j = 0; j < d.a.length; j++) words.push(medsKey(d.a[j]));
    }
    medsIndex.push({ key: medsKey(d.n), words: words, d: d });
  }
}

function medsSearch(q) {
  var k = medsKey(q);
  if (!k) return [];
  var starts = [];
  var inside = [];
  for (var i = 0; i < medsIndex.length; i++) {
    var it = medsIndex[i];
    var hit = 0;
    for (var j = 0; j < it.words.length; j++) {
      if (it.words[j].indexOf(k) === 0) hit = 2;
      else if (!hit && it.words[j].indexOf(k) > 0) hit = 1;
    }
    if (hit === 2) starts.push(it.d);
    else if (hit === 1) inside.push(it.d);
  }
  var byName = function (a, b) {
    return a.n.length - b.n.length || (a.n < b.n ? -1 : 1);
  };
  starts.sort(byName);
  inside.sort(byName);
  return starts.concat(inside).slice(0, 8);
}

// PAP record for a drug, or for the sheet name's matching product.
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

function medsChip(group, value, label) {
  var on = medsState[group] === value;
  return (
    '<button type="button" class="med-chip' +
    (on ? ' is-on' : '') +
    '" data-meds-filter="' +
    group +
    '" data-meds-value="' +
    medsEsc(value) +
    '" aria-pressed="' +
    (on ? 'true' : 'false') +
    '">' +
    medsEsc(label) +
    '</button>'
  );
}

function medsPlanRowsHtml(d) {
  var plans = medsPlans().filter(medsPlanPasses);
  var html = '';
  var covered = {};
  for (var r = 0; r < MEDS_PLAN_RULES.length; r++) {
    var rule = MEDS_PLAN_RULES[r];
    var matched = plans.filter(function (p) {
      return medsRuleMatches(rule, p);
    });
    if (!matched.length) continue;
    if (!rule.test(d)) continue;
    var meta = matched[0].platform + ' - ' + matched[0].type;
    matched.forEach(function (p) {
      covered[p.id] = 1;
    });
    html +=
      '<div class="med-row">' +
      '<div class="med-row-main"><b>' +
      medsEsc(rule.label) +
      '</b> <span class="med-row-meta">' +
      medsEsc(meta) +
      '</span><div class="med-row-sub">' +
      medsEsc(rule.sub(d)) +
      '</div></div>' +
      '<span class="med-val med-val-' +
      rule.tone +
      '">' +
      medsEsc(rule.val(d)) +
      '</span></div>';
  }
  var rest = [];
  var seen = {};
  plans.forEach(function (p) {
    if (covered[p.id]) return;
    var label = p.group;
    if (seen[label]) return;
    seen[label] = 1;
    rest.push(label);
  });
  if (!html && !rest.length) {
    return '<p class="med-empty">No plans match these filters.</p>';
  }
  if (rest.length) {
    html +=
      '<details class="med-rest"><summary><span>' +
      (html
        ? 'Other ' + rest.length + ' plan families'
        : 'All ' + rest.length + ' plan families') +
      ': not covered or not on file</span><span class="med-rest-open">Show list</span></summary>' +
      '<p>' +
      medsEsc(rest.join(', ')) +
      '</p></details>';
  }
  return html;
}

function medsGoodRxUrl(name) {
  var slug = String(name)
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return 'https://www.goodrx.com/' + slug;
}

function medsStepsHtml(d) {
  return (
    '<div class="med-label">Lower the cost</div>' +
    '<ol class="med-steps">' +
    '<li><b>Discount card from the plan</b><span>Customer shows the plan Rx card at the pharmacy (RxSavers, BestChoiceRx, GapAfford Plus, NCE, Clever Rx).</span></li>' +
    '<li><b>Compare cash prices on GoodRx</b><span>Customer enters a zip and sees nearby pharmacy prices. Use the coupon instead of the card, not with it. Prices change; never promise one.</span>' +
    '<a class="med-btn med-btn-dark" href="' +
    medsGoodRxUrl(d.n) +
    '" target="_blank" rel="noopener">Open GoodRx</a></li>' +
    '<li><b>Ask the doctor</b><span>About a generic or a med a plan covers. The doctor decides.</span></li>' +
    '</ol>'
  );
}

function medsCalcHtml(p) {
  var canCalc = p.s === 'ready' && (p.f || p.dol);
  if (!canCalc) {
    var msg =
      p.s === 'call'
        ? 'No fixed income limit published. Customer calls the program.'
        : 'Income limit not published. Customer checks with the program.';
    return '<p class="med-pap-note">' + medsEsc(msg) + '</p>';
  }
  var n = parseInt(medsState.hh, 10) || 1;
  var fplAmt = medsFplBase(n, medsState.st);
  var limit = p.f ? (fplAmt * p.f) / 100 : p.dol[0] + p.dol[1] * (n - 1);
  var inc = parseFloat(String(medsState.inc).replace(/[^0-9.]/g, ''));
  var hh = '';
  for (var i = 1; i <= 10; i++) {
    hh +=
      '<option value="' +
      i +
      '"' +
      (String(i) === medsState.hh ? ' selected' : '') +
      '>' +
      i +
      '</option>';
  }
  var sts = [
    ['48', '48 states + DC'],
    ['AK', 'Alaska'],
    ['HI', 'Hawaii']
  ];
  var st = sts
    .map(function (s) {
      return (
        '<option value="' +
        s[0] +
        '"' +
        (s[0] === medsState.st ? ' selected' : '') +
        '>' +
        s[1] +
        '</option>'
      );
    })
    .join('');
  var result;
  var limitTxt =
    'Limit for ' +
    n +
    (n === 1 ? ' person' : ' people') +
    ': ' +
    medsMoney(limit);
  if (!isFinite(inc) || inc <= 0) {
    result =
      '<div class="med-result"><b>Enter yearly household income</b><span>' +
      medsEsc(limitTxt) +
      '</span></div>';
  } else {
    var pct = Math.round((inc / fplAmt) * 100);
    var ok = inc <= limit;
    result =
      '<div class="med-result ' +
      (ok ? 'is-ok' : 'is-over') +
      '"><b>' +
      (ok ? 'Likely qualifies' : 'Over the limit') +
      '</b><span>' +
      pct +
      '% of the poverty line. ' +
      medsEsc(limitTxt) +
      '</span></div>';
  }
  return (
    '<div class="med-calc">' +
    '<label><span>Yearly income</span><input id="meds-inc" type="text" inputmode="numeric" placeholder="$0" value="' +
    medsEsc(medsState.inc) +
    '"></label>' +
    '<label><span>Household</span><select id="meds-hh">' +
    hh +
    '</select></label>' +
    '<label><span>State</span><select id="meds-st">' +
    st +
    '</select></label>' +
    '</div>' +
    '<div id="meds-result">' +
    result +
    '</div>'
  );
}

function medsPapHtml(d) {
  var p = medsPap(d);
  if (!p) {
    if (d.k === 'b')
      return '<p class="med-pap-none">No patient assistance program confirmed for our plan members.</p>';
    return '';
  }
  var prog = medsData.programs[p.p] || { name: '', url: '' };
  var url = p.u || prog.url;
  var badge =
    p.o === 'yes'
      ? '<span class="med-badge med-badge-ok">Open to our plan members</span>'
      : '<span class="med-badge med-badge-mid">Apply and list the plan</span>';
  var forName =
    d.see && !d.pap
      ? '<p class="med-pap-note">For ' + medsEsc(d.see) + '.</p>'
      : '';
  return (
    '<div class="med-pap">' +
    '<div class="med-pap-head"><div class="med-label">Patient Assistance (PAP)</div>' +
    badge +
    '</div>' +
    forName +
    '<div><b>' +
    medsEsc(prog.name) +
    '</b><div class="med-pap-rule">' +
    medsEsc(p.r) +
    (p.i ? '. ' + medsEsc(p.i) : '') +
    '</div></div>' +
    (p.q
      ? '<blockquote class="med-quote">"' + medsEsc(p.q) + '"</blockquote>'
      : '') +
    medsCalcHtml(p) +
    '<div class="med-btns">' +
    (url
      ? '<a class="med-btn med-btn-accent" href="' +
        medsEsc(url.split(' ')[0]) +
        '" target="_blank" rel="noopener">Open program site</a>'
      : '') +
    '<a class="med-btn" href="https://www.pap-lookup.com/" target="_blank" rel="noopener">Check on pap-lookup.com</a>' +
    '</div>' +
    '<p class="med-rule">The program decides; say "may qualify". Never tell a customer to say they have no insurance. Agents do not fill out PAP forms.</p>' +
    '</div>'
  );
}

function medsCardHtml(d) {
  var kind =
    d.k === 'b'
      ? '<span class="med-pill med-pill-brand">Brand</span>'
      : d.k === 'g'
        ? '<span class="med-pill med-pill-gen">Generic</span>'
        : '';
  var pap = medsPap(d);
  var papPill = pap
    ? '<span class="med-pill med-pill-pap">PAP for our plan members</span>'
    : '';
  var extra = [];
  if (d.a && d.a.length) extra.push('Also called ' + d.a.join(', '));
  if (d.qs) extra.push('Quick Sheet: ' + d.qs);
  var papBlock = medsPapHtml(d);
  return (
    '<article class="med-card">' +
    '<div class="med-card-head"><h3>' +
    medsEsc(d.n) +
    '</h3>' +
    kind +
    papPill +
    '</div>' +
    (extra.length
      ? '<p class="med-card-sub">' + medsEsc(extra.join(' - ')) + '</p>'
      : '') +
    '<div class="med-card-grid' +
    (papBlock ? '' : ' is-single') +
    '">' +
    '<div class="med-col">' +
    '<div class="med-label">On the plans we sell</div>' +
    '<div class="med-chips">' +
    medsChip('plat', 'All', 'All plans') +
    medsChip('plat', 'NEO', 'NEO') +
    medsChip('plat', 'FirstEnroll', 'FirstEnroll') +
    '<span class="med-chip-gap"></span>' +
    medsChip('type', 'All', 'All types') +
    medsChip('type', 'Limited', 'Limited') +
    medsChip('type', 'MEC', 'MEC') +
    medsChip('type', 'STM', 'STM') +
    '</div>' +
    '<div id="meds-plan-rows">' +
    medsPlanRowsHtml(d) +
    '</div>' +
    medsStepsHtml(d) +
    '</div>' +
    (papBlock ? '<div class="med-col">' + papBlock + '</div>' : '') +
    '</div>' +
    '<p class="med-src">Plan coverage: plan documents in Plan Vault. Drug lists: MyLiveDoc (TDK), BestChoiceRx (GoodHealth), Ventegra (Smart Choice). PAP: official program sites, checked ' +
    medsEsc(medsData.checked) +
    '. Poverty line: HHS ' +
    medsEsc(medsData.fpl.year) +
    '.</p>' +
    '</article>'
  );
}

function medsSheetHtml() {
  var html = '';
  (medsData.sheet || []).forEach(function (s) {
    var body = '';
    s.g.forEach(function (g) {
      var pills = g.d
        .map(function (name) {
          var d = medsFind(name);
          var isBrand = g.l.indexOf('Brand') === 0;
          var pap = d && medsPap(d) ? '<b class="med-pap-tag">PAP</b>' : '';
          return (
            '<button type="button" class="med-sheet-pill ' +
            (isBrand ? 'is-brand' : 'is-gen') +
            '" data-meds-pick="' +
            medsEsc(d ? d.n : name) +
            '">' +
            medsEsc(name) +
            pap +
            '</button>'
          );
        })
        .join('');
      body +=
        '<div class="med-sheet-group"><div class="med-label">' +
        medsEsc(g.l) +
        '</div><div class="med-sheet-pills">' +
        pills +
        '</div></div>';
    });
    html +=
      '<section class="med-sheet-card"><div class="med-sheet-head"><b>' +
      medsEsc(s.c) +
      '</b>' +
      (s.note ? '<span>' + medsEsc(s.note) + '</span>' : '') +
      '</div>' +
      body +
      '</section>';
  });
  return (
    '<div class="med-sheet-title"><h3>Med Quick Sheet</h3><span>Tap a med to open its card. PAP shows only where a program is open to our plan members.</span></div>' +
    '<div class="med-sheet">' +
    html +
    '</div>' +
    '<p class="med-src">Meds in the same category are not interchangeable. Not on this sheet? Ask a supervisor.</p>'
  );
}

function medsResultsHtml() {
  if (!medsState.q || medsState.sel) return '';
  var hits = medsSearch(medsState.q);
  if (!hits.length) {
    return (
      '<div class="med-hits"><p class="med-empty">Not in our drug lists. Ask a supervisor, or check cash prices on <a href="' +
      medsGoodRxUrl(medsState.q) +
      '" target="_blank" rel="noopener">GoodRx</a>.</p></div>'
    );
  }
  return (
    '<div class="med-hits" role="listbox">' +
    hits
      .map(function (d) {
        return (
          '<button type="button" class="med-hit" data-meds-pick="' +
          medsEsc(d.n) +
          '"><b>' +
          medsEsc(d.n) +
          '</b><span>' +
          (d.k === 'b' ? 'Brand' : d.k === 'g' ? 'Generic' : '') +
          (medsPap(d) ? ' - PAP' : '') +
          '</span></button>'
        );
      })
      .join('') +
    '</div>'
  );
}

function medsRenderBody() {
  var host = document.getElementById('meds-body');
  if (!host || !medsData) return;
  var d = medsState.sel ? medsFind(medsState.sel) : null;
  host.innerHTML =
    medsResultsHtml() + (d ? medsCardHtml(d) : '') + medsSheetHtml();
}

function medsRenderPlanRows() {
  var d = medsState.sel ? medsFind(medsState.sel) : null;
  var host = document.getElementById('meds-plan-rows');
  if (d && host) host.innerHTML = medsPlanRowsHtml(d);
  document.querySelectorAll('#page-meds .med-chip').forEach(function (b) {
    var on =
      medsState[b.getAttribute('data-meds-filter')] ===
      b.getAttribute('data-meds-value');
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

function medsRenderResult() {
  var d = medsState.sel ? medsFind(medsState.sel) : null;
  var p = medsPap(d);
  var host = document.getElementById('meds-result');
  if (!p || !host) return;
  var tmp = document.createElement('div');
  tmp.innerHTML = medsCalcHtml(p);
  var fresh = tmp.querySelector('#meds-result');
  if (fresh) host.innerHTML = fresh.innerHTML;
}

function medsPick(name) {
  medsState.sel = name;
  medsState.q = name;
  var input = document.getElementById('meds-search');
  if (input) input.value = name;
  medsRenderBody();
  var card = document.querySelector('#page-meds .med-card');
  if (card && card.scrollIntoView) card.scrollIntoView({ block: 'nearest' });
}

function medsOnInput(e) {
  var t = e.target;
  if (t.id === 'meds-search') {
    // The blur 'change' event would re-render before the click lands.
    if (e.type === 'change') return;
    medsState.q = t.value;
    medsState.sel = '';
    var exact = medsFind(t.value);
    if (exact && medsSearch(t.value).length === 1) medsState.sel = exact.n;
    medsRenderBody();
    return;
  }
  if (t.id === 'meds-inc') {
    medsState.inc = t.value;
    medsRenderResult();
    return;
  }
  if (t.id === 'meds-hh') {
    medsState.hh = t.value;
    medsRenderResult();
    return;
  }
  if (t.id === 'meds-st') {
    medsState.st = t.value;
    medsRenderResult();
  }
}

function medsOnKey(e) {
  if (e.target.id !== 'meds-search' || e.key !== 'Enter') return;
  var hits = medsSearch(e.target.value);
  if (hits.length) {
    e.preventDefault();
    medsPick(hits[0].n);
  }
}

function medsOnClick(e) {
  var pick = e.target.closest ? e.target.closest('[data-meds-pick]') : null;
  if (pick) {
    medsPick(pick.getAttribute('data-meds-pick'));
    return;
  }
  var chip = e.target.closest ? e.target.closest('[data-meds-filter]') : null;
  if (chip) {
    medsState[chip.getAttribute('data-meds-filter')] =
      chip.getAttribute('data-meds-value');
    medsRenderPlanRows();
  }
}

function renderMeds() {
  var root = document.getElementById('page-meds');
  if (!root) return;
  if (!root.getAttribute('data-meds-ready')) {
    root.innerHTML =
      '<div class="med-page">' +
      '<header class="med-header"><h2>Meds</h2>' +
      '<p>Search a medication. Only what works with the plans we sell on NEO and FirstEnroll.</p></header>' +
      '<input id="meds-search" class="med-search" type="search" autocomplete="off" placeholder="Search a medication (brand or generic)" aria-label="Search a medication">' +
      '<div id="meds-body"><p class="med-empty">Loading meds...</p></div>' +
      '</div>';
    root.setAttribute('data-meds-ready', '1');
    root.addEventListener('input', medsOnInput);
    root.addEventListener('change', medsOnInput);
    root.addEventListener('keydown', medsOnKey);
    root.addEventListener('click', medsOnClick);
  }
  if (medsData) {
    medsRenderBody();
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
      medsRenderBody();
    })
    .catch(function () {
      medsLoadStarted = false;
      var host = document.getElementById('meds-body');
      if (host)
        host.innerHTML =
          '<p class="med-empty">Meds could not load. Check your connection and open the tab again.</p>';
    });
}
