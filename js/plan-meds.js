// js/plan-meds.js - Plan meds check (Nov 2026).
// The agent picks the plan being sold and types every med the client
// takes. Each med shows what THIS plan does with it:
//   ok    = on the plan's list, with the plan's own copay
//   no    = not covered on this plan
//   check = CHA's list is not complete, or the plan's list is not on file
//   none  = the plan has no drug list
// Which list a plan uses and what the plan pays come from
// data/formulary-plan-rules.json (each line cites its plan document).
// The formulary files only say which drugs are on a list. The plan rules
// always win over copays printed inside the formulary files.
// Used by the Meds tab (renderMeds in js/meds.js) and the On Call meds box
// (cwMedsHtml in js/call-workspace.js).

var PM_RULES_URL = 'data/formulary-plan-rules.json?v=1793720535338';
var pmRules = null;
var pmRulesLoading = false;
var pmIndex = {};
var pmLoading = {};
var pmWaiters = [];
var pmState = { fam: 'smartchoice', tier: '2500', meds: [], typing: '' };

// Families shown in the Meds tab plan picker. Each tier points at a plan id
// in the rules file. A tier set to null has no drug list; its Rx line is
// read from PD_SHORT_VALUES (js/policy-docs.js) when one exists.
var PM_FAMS = [
  {
    id: 'smartchoice',
    name: 'SmartChoice',
    tiers: [
      ['1500', 'smart-choice-1500'],
      ['2500', 'smart-choice-2500'],
      ['3000', 'smart-choice-3000'],
      ['3500', 'smart-choice-3500']
    ]
  },
  {
    id: 'tdk',
    name: 'TDK',
    tiers: [
      ['1', 'tdk-1'],
      ['2', 'tdk-2'],
      ['3', 'tdk-3'],
      ['4', 'tdk-4'],
      ['5', 'tdk-5']
    ]
  },
  {
    id: 'goodhealth',
    name: 'GoodHealth',
    tiers: [
      ['Wellness', null, 'ghdp-wellness'],
      ['1', null, 'ghdp-1'],
      ['2', 'ghdp-2'],
      ['3', 'ghdp-3'],
      ['4', 'ghdp-4'],
      ['5', 'ghdp-5']
    ]
  },
  {
    id: 'harbor',
    name: 'Harbor STM',
    tiers: [
      ['Essential', 'harbor-stm-essential'],
      ['Access', 'harbor-stm-access'],
      ['Secure', 'harbor-stm-secure']
    ]
  },
  { id: 'primeprotect', name: 'PrimeProtect', tiers: [['', 'primeprotect']] },
  {
    id: 'tvp',
    name: 'TVP Health',
    tiers: [
      ['1', 'tvp-1'],
      ['2', 'tvp-2'],
      ['3', 'tvp-3'],
      ['4', 'tvp-4'],
      ['5', 'tvp-5']
    ]
  },
  { id: 'advantcare', name: 'AdvantCare', tiers: [['', 'advantcare']] },
  {
    id: 'allstatecopay',
    name: 'Allstate Copay Enhanced',
    tiers: [['', 'allstate-copay-enhanced-stm-ppo']]
  },
  { id: 'other', name: 'Any other plan', tiers: [['', null]] }
];

// On Call family name + tier -> plan id in the rules file.
function pmPlanIdForCall(famName, tier) {
  var t = String(tier || '');
  var map = {
    SmartChoice: 'smart-choice-' + t,
    TDK: 'tdk-' + t,
    'TVP Health': 'tvp-' + t
  };
  if (map[famName]) return map[famName];
  if (famName === 'GoodHealth') {
    return /^[2-5]$/.test(t) ? 'ghdp-' + t : null;
  }
  if (famName === 'Harbor STM') return 'harbor-stm-' + t.toLowerCase();
  if (famName === 'PrimeProtect') return 'primeprotect';
  if (famName === 'AdvantCare') return 'advantcare';
  if (famName === 'Allstate STM PPO' && t === 'Copay Enhanced') {
    return 'allstate-copay-enhanced-stm-ppo';
  }
  return null;
}

// Rx line for a plan with no drug list (GoodHealth Wellness/1 on On Call).
function pmNoListRx(famName, tier) {
  if (typeof PD_SHORT_VALUES === 'undefined') return '';
  var id = '';
  if (famName === 'GoodHealth') {
    id = tier === 'Wellness' ? 'ghdp-wellness' : 'ghdp-' + tier;
  }
  var v = id && PD_SHORT_VALUES[id];
  return v && v.rx ? v.rx : '';
}

function pmEsc(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Drug name -> match key: lower case, no strength, no dose form words.
var PM_FORM_WORDS =
  /\b(tab|tabs|tablet|tablets|cap|caps|capsule|capsules|soln|solution|susp|suspension|cream|oint|ointment|gel|lot|lotion|er|xr|xl|sr|dr|ec|odt|chew|chewable|inj|injection|oral|syr|syrup|aer|neb|pwdr|powder|foam|pad|patch|patches|drops|spray|kit|pack|hcl|sodium|calcium|potassium|besylate|maleate|mesylate|tartrate|succinate|citrate|sulfate|acetate|fumarate|hydrochloride|prefill|pen|kwikpen|vial)\b/g;

function pmKey(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\[[a-z]+\]/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\d+(\.\d+)?\s*(mg|mcg|ml|g|units?|%)?/g, ' ')
    .replace(/[^a-z ]+/g, ' ')
    .replace(PM_FORM_WORDS, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^\s+|\s+$/g, '');
}

// Typo distance (Levenshtein with an early stop).
function pmDist(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  var prev = [];
  var i;
  var j;
  for (j = 0; j <= b.length; j++) prev[j] = j;
  for (i = 1; i <= a.length; i++) {
    var cur = [i];
    var low = i;
    for (j = 1; j <= b.length; j++) {
      var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (cur[j] < low) low = cur[j];
    }
    if (low > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// One index per formulary file: key -> entries, plus first-word keys.
function pmAddEntry(idx, rawName, entry) {
  var full = pmKey(rawName);
  if (!full) return;
  entry.key = full;
  (idx.full[full] = idx.full[full] || []).push(entry);
  var first = full.split(' ')[0];
  if (first.length >= 3)
    (idx.first[first] = idx.first[first] || []).push(entry);
}

function pmBuildIndex(fid, data) {
  var idx = { full: {}, first: {} };
  if (fid === 'ventegra' || fid === 'bestchoicerx') {
    data.forEach(function (r) {
      pmAddEntry(idx, r.name, {
        name: r.name,
        strength: r.strength || '',
        form: r.form || '',
        tier: fid === 'ventegra' ? r.tier_label : r.formulary_type,
        plans: r.plans || []
      });
    });
  } else if (fid === 'mylivedoc') {
    ['urgent_care', 'chronic'].forEach(function (sec) {
      (data[sec] || []).forEach(function (r) {
        var e = {
          name: r.name,
          brand: r.brand || '',
          strength: r.strength || '',
          form: r.form || '',
          tier: sec
        };
        pmAddEntry(idx, r.name, e);
        if (r.brand) {
          pmAddEntry(idx, r.brand, {
            name: r.name,
            brand: r.brand,
            strength: e.strength,
            form: e.form,
            tier: sec
          });
        }
      });
    });
  } else if (fid === 'shieldpbm' || fid === 'primeprotect_aca') {
    (data.rows || []).forEach(function (r) {
      pmAddEntry(idx, r.name, {
        name: r.name,
        tier: r.tier || r.category || '',
        flags: r.flags || []
      });
    });
  }
  idx.firstKeys = Object.keys(idx.first);
  return idx;
}

// Find a typed med in one formulary. Returns { entries, fixed, key } or null.
function pmFind(fid, typed) {
  var idx = pmIndex[fid];
  if (!idx) return null;
  var k = pmKey(typed);
  if (!k) return null;
  if (idx.full[k]) return { entries: idx.full[k], fixed: false };
  var first = k.split(' ')[0];
  if (idx.first[first]) return { entries: idx.first[first], fixed: false };
  if (first.length < 4) return null;
  var max = first.length <= 6 ? 1 : first.length <= 9 ? 2 : 3;
  var best = null;
  var bestD = max + 1;
  for (var i = 0; i < idx.firstKeys.length; i++) {
    var c = idx.firstKeys[i];
    var d = pmDist(first, c, max);
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  if (best && bestD <= max) return { entries: idx.first[best], fixed: true };
  return null;
}

// Is the typed med on the pap-lookup list (js/meds.js)?
function pmPap(typed) {
  if (typeof medsMatch !== 'function') return null;
  if (typeof medsData === 'undefined' || !medsData) return null;
  return medsMatch(typed);
}

function pmPrettyName(found, typed) {
  var t = String(typed || '').replace(/^\s+|\s+$/g, '');
  if (!found) return t.charAt(0).toUpperCase() + t.slice(1);
  // Show the matched drug's main word (no salt, strength or form), plus a
  // second word when the agent typed two words that match it.
  var key = found.entries[0].key.split(' ');
  var tk = pmKey(typed).split(' ');
  var n = key[0];
  if (tk.length > 1 && key[1] && key[1] === tk[1]) n += ' ' + key[1];
  return n.charAt(0).toUpperCase() + n.slice(1);
}

function pmHas(entries, test) {
  for (var i = 0; i < entries.length; i++) if (test(entries[i])) return true;
  return false;
}

// The verdict for one med on one plan.
function pmVerdict(planId, typed) {
  var rule = planId && pmRules ? pmRules.plans[planId] : null;
  var pap = pmPap(typed);
  var papName = pap ? pap.item.n : '';
  var out = { name: '', tone: 'none', text: '', fixed: false, pap: papName };
  if (!rule) {
    out.name = pmPrettyName(null, typed);
    out.text = 'No drug list for this plan';
    return out;
  }
  if (rule.status !== 'list') {
    out.name = pmPrettyName(null, typed);
    out.tone = rule.status === 'no_list' ? 'none' : 'check';
    out.text =
      rule.status === 'no_list'
        ? rule.summary
        : 'List not on file. Check with carrier';
    return out;
  }
  var found = pmFind(rule.formulary, typed);
  out.name = pmPrettyName(found, typed);
  out.fixed = !!(found && found.fixed);
  var e = found ? found.entries : [];
  var fid = rule.formulary;

  if (fid === 'ventegra') {
    if (
      found &&
      pmHas(e, function (x) {
        return x.tier === 'Generic';
      })
    ) {
      out.tone = 'ok';
      out.text = '$12 / 30 days retail';
    } else if (found) {
      out.tone = 'no';
      out.text = 'Brand: not covered on SmartChoice';
    } else {
      out.tone = 'no';
      out.text = 'Not on the Ventegra acute formulary';
    }
    return out;
  }
  if (fid === 'mylivedoc') {
    var urgent = pmHas(e, function (x) {
      return x.tier === 'urgent_care';
    });
    var chronic = pmHas(e, function (x) {
      return x.tier === 'chronic';
    });
    if (planId === 'tdk-1') {
      if (urgent) {
        out.tone = 'ok';
        out.text = '$0 urgent care med at retail';
      } else if (chronic) {
        out.tone = 'no';
        out.text = 'Home delivery med: not on TDK 1';
      } else {
        out.tone = 'check';
        out.text = 'Not in the CHA list. List not complete';
      }
      return out;
    }
    if (urgent || chronic) {
      out.tone = 'ok';
      out.text = urgent
        ? '$0 urgent care med at retail'
        : '$0 by free home delivery';
    } else {
      out.tone = 'check';
      out.text = 'Not in the CHA list. List not complete, ask MyLiveDoc';
    }
    return out;
  }
  if (fid === 'bestchoicerx') {
    var onGh =
      found &&
      pmHas(e, function (x) {
        return x.plans.indexOf('GoodHealth ' + planId.slice(-1)) !== -1;
      });
    if (planId === 'ghdp-2') {
      out.tone = found ? 'check' : 'no';
      out.text = found
        ? 'On the GoodHealth 3-5 list. GoodHealth 2 list not confirmed'
        : 'Not on the formulary. Rx discount only';
      return out;
    }
    if (onGh) {
      out.tone = 'ok';
      out.text = '$0 acute/preventive or $5 maintenance generic';
    } else {
      out.tone = 'check';
      out.text =
        'Not on the $0/$5 list. Up to $150/mo plan benefit (brand $40, prior auth)';
    }
    return out;
  }
  if (fid === 'shieldpbm') {
    if (found) {
      var pa = pmHas(e, function (x) {
        return x.flags.indexOf('PA') !== -1;
      });
      var generic = pmHas(e, function (x) {
        return x.tier === 'tier1';
      });
      out.tone = 'ok';
      out.text =
        'With Rx rider: ' +
        (generic ? '$25 generic' : '$500 Rx deductible, then coinsurance') +
        (pa ? ', needs prior auth' : '');
    } else {
      out.tone = 'check';
      out.text = 'Not on the Shield PBM list (list not complete)';
    }
    return out;
  }
  if (fid === 'primeprotect_aca') {
    if (found) {
      out.tone = 'ok';
      out.text = '$0 ACA preventive (Rx program, not insurance)';
    } else {
      out.tone = 'none';
      out.text = 'Not on the $0 ACA list. Discount price only';
    }
    return out;
  }
  out.text = 'No drug list for this plan';
  return out;
}

// Load the rules file and the one formulary a plan needs, then call cb.
function pmEnsure(planId, cb) {
  if (typeof fetch !== 'function') return;
  if (!pmRules) {
    pmWaiters.push(function () {
      pmEnsure(planId, cb);
    });
    if (pmRulesLoading) return;
    pmRulesLoading = true;
    fetch(PM_RULES_URL)
      .then(function (r) {
        if (!r.ok) throw new Error('load failed');
        return r.json();
      })
      .then(function (d) {
        pmRules = d;
        var w = pmWaiters;
        pmWaiters = [];
        w.forEach(function (f) {
          f();
        });
      })
      .catch(function () {
        pmRulesLoading = false;
        pmWaiters = [];
      });
    return;
  }
  var rule = planId ? pmRules.plans[planId] : null;
  var fid = rule && rule.status === 'list' ? rule.formulary : '';
  if (!fid || pmIndex[fid]) {
    if (cb) cb();
    return;
  }
  if (pmLoading[fid]) {
    pmLoading[fid].push(cb);
    return;
  }
  pmLoading[fid] = [cb];
  fetch(pmRules.formularies[fid] + '?v=1793720535338')
    .then(function (r) {
      if (!r.ok) throw new Error('load failed');
      return r.json();
    })
    .then(function (d) {
      pmIndex[fid] = pmBuildIndex(fid, d);
      var w = pmLoading[fid];
      delete pmLoading[fid];
      w.forEach(function (f) {
        if (f) f();
      });
    })
    .catch(function () {
      delete pmLoading[fid];
    });
}

function pmReady(planId) {
  if (!pmRules) return false;
  var rule = planId ? pmRules.plans[planId] : null;
  if (!rule || rule.status !== 'list') return true;
  return !!pmIndex[rule.formulary];
}

// ---- Meds tab: Plan meds check (layout B, chips) ----

function pmFam() {
  for (var i = 0; i < PM_FAMS.length; i++) {
    if (PM_FAMS[i].id === pmState.fam) return PM_FAMS[i];
  }
  return PM_FAMS[0];
}

function pmTierRow() {
  var f = pmFam();
  for (var i = 0; i < f.tiers.length; i++) {
    if (f.tiers[i][0] === pmState.tier) return f.tiers[i];
  }
  return f.tiers[0];
}

function pmToneClass(tone) {
  return tone === 'ok'
    ? 'ok'
    : tone === 'no'
      ? 'bad'
      : tone === 'check'
        ? 'warn'
        : 'neutral';
}

function pmChipsHtml() {
  var t = pmTierRow();
  var planId = t[1];
  if (!pmState.meds.length) {
    return '<p class="pm-empty">Type a med and press Enter. Commas work too.</p>';
  }
  if (!pmReady(planId))
    return '<p class="pm-empty">Loading the drug list...</p>';
  var counts = { ok: 0, no: 0, check: 0, none: 0 };
  var noList = !planId && t[2];
  var chips = pmState.meds
    .map(function (typed, i) {
      var v = pmVerdict(planId, typed);
      if (noList) v.text = pmNoListRx('GoodHealth', t[0]) || v.text;
      counts[v.tone]++;
      return (
        '<span class="pm-chip med-tag-' +
        pmToneClass(v.tone) +
        '"><b>' +
        pmEsc(v.name) +
        '</b>' +
        (v.fixed ? '<i>you typed "' + pmEsc(typed) + '"</i>' : '') +
        '<span>' +
        pmEsc(v.text) +
        '</span>' +
        (v.pap && v.tone !== 'ok'
          ? '<button type="button" class="pm-pap" data-pm-pap="' +
            pmEsc(v.pap) +
            '">PAP check</button>'
          : '') +
        '<button type="button" class="pm-x" data-pm-del="' +
        i +
        '" aria-label="Remove ' +
        pmEsc(v.name) +
        '">x</button></span>'
      );
    })
    .join('');
  var sum =
    '<div class="pm-sum"><span>' +
    counts.ok +
    ' of ' +
    pmState.meds.length +
    ' on the list</span><span>' +
    (counts.no
      ? '<b class="pm-sum-no">' + counts.no + ' not covered</b>'
      : '') +
    (counts.check
      ? '<b class="pm-sum-check">' + counts.check + ' to check</b>'
      : '') +
    '</span></div>';
  return '<div class="pm-chips">' + chips + '</div>' + sum;
}

function pmSourceHtml() {
  var t = pmTierRow();
  var rule = t[1] && pmRules ? pmRules.plans[t[1]] : null;
  var gap = rule && rule.gap ? ' Gap: ' + rule.gap + '.' : '';
  var req = rule && rule.requires ? ' Only with: ' + rule.requires + '.' : '';
  return (
    '<p class="med-src">Source: ' +
    pmEsc(rule ? rule.source : 'Plan card Rx line') +
    '.' +
    pmEsc(req + gap) +
    ' Only say a med is covered when it is green.</p>'
  );
}

function pmRenderBox() {
  var box = document.getElementById('pm-out');
  if (!box) return;
  box.innerHTML = pmChipsHtml() + pmSourceHtml();
}

function pmPickerHtml() {
  var f = pmFam();
  var fams = PM_FAMS.map(function (x) {
    return (
      '<button type="button" class="pm-pill' +
      (x.id === f.id ? ' is-on' : '') +
      '" data-pm-fam="' +
      x.id +
      '">' +
      pmEsc(x.name) +
      '</button>'
    );
  }).join('');
  var tiers =
    f.tiers.length > 1
      ? '<div class="pm-pills pm-tiers">' +
        f.tiers
          .map(function (t) {
            return (
              '<button type="button" class="pm-pill' +
              (t[0] === pmTierRow()[0] ? ' is-on' : '') +
              '" data-pm-tier="' +
              pmEsc(t[0]) +
              '">' +
              pmEsc(t[0]) +
              '</button>'
            );
          })
          .join('') +
        '</div>'
      : '';
  return '<div class="pm-pills">' + fams + '</div>' + tiers;
}

function pmPageHtml() {
  return (
    '<div class="pm-card"><p class="pm-label">1. Plan you are selling</p><div id="pm-picker">' +
    pmPickerHtml() +
    '</div><p class="pm-label">2. Type each med the client takes, press Enter</p>' +
    '<input id="pm-input" type="text" autocomplete="off" spellcheck="false" placeholder="metformin" value="' +
    pmEsc(pmState.typing) +
    '"><div id="pm-out"></div></div>'
  );
}

function pmRefresh() {
  var planId = pmTierRow()[1];
  pmRenderBox();
  pmEnsure(planId, pmRenderBox);
}

function pmAddTyped(text) {
  String(text || '')
    .split(/[,;\n]+/)
    .forEach(function (p) {
      var t = p.replace(/^\s+|\s+$/g, '');
      if (!t) return;
      var k = t.toLowerCase();
      for (var i = 0; i < pmState.meds.length; i++) {
        if (pmState.meds[i].toLowerCase() === k) return;
      }
      pmState.meds.push(t);
    });
}

function pmOnClick(e) {
  var t = e.target.closest
    ? e.target.closest(
        '[data-pm-fam],[data-pm-tier],[data-pm-del],[data-pm-pap]'
      )
    : null;
  if (!t) return;
  if (t.hasAttribute('data-pm-fam')) {
    pmState.fam = t.getAttribute('data-pm-fam');
    pmState.tier = pmFam().tiers[0][0];
  } else if (t.hasAttribute('data-pm-tier')) {
    pmState.tier = t.getAttribute('data-pm-tier');
  } else if (t.hasAttribute('data-pm-del')) {
    pmState.meds.splice(parseInt(t.getAttribute('data-pm-del'), 10), 1);
  } else if (t.hasAttribute('data-pm-pap')) {
    if (typeof medsShowMode === 'function') {
      medsShowMode('pap', t.getAttribute('data-pm-pap'));
    }
    return;
  }
  var pk = document.getElementById('pm-picker');
  if (pk) pk.innerHTML = pmPickerHtml();
  pmRefresh();
}

function pmOnKey(e) {
  if (!e.target || e.target.id !== 'pm-input') return;
  if (e.key === 'Enter') {
    e.preventDefault();
    pmAddTyped(e.target.value);
    e.target.value = '';
    pmState.typing = '';
    pmRefresh();
  } else if (e.key === 'Backspace' && !e.target.value && pmState.meds.length) {
    pmState.meds.pop();
    pmRefresh();
  }
}

function pmOnInput(e) {
  if (!e.target || e.target.id !== 'pm-input') return;
  var v = e.target.value;
  if (/[,;]\s*$/.test(v)) {
    pmAddTyped(v);
    e.target.value = '';
    pmState.typing = '';
    pmRefresh();
    return;
  }
  pmState.typing = v;
}

function renderPlanMeds(host) {
  if (!host) return;
  if (!host.getAttribute('data-pm-ready')) {
    host.innerHTML = pmPageHtml();
    host.setAttribute('data-pm-ready', '1');
    host.addEventListener('click', pmOnClick);
    host.addEventListener('keydown', pmOnKey);
    host.addEventListener('input', pmOnInput);
  }
  pmRefresh();
}
