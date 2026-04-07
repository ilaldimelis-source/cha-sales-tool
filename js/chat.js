// chat.js — Benefits Reference chat panel
// ── SOB LOOKUP — Synonym-Aware, Cross-Plan, Instant + Ask AI ─────────────
var brActivePlan = null;
var brSearchAllPlans = false;
var brOpen = false;
var BR_PLANS = [];
var _brInitDone = false;
// ── LUCIDE-STYLE SVG ICONS ──────────────────────────────────────────
var LI = {
  check:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  ban: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  warn: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  clock:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  file: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  bulb: '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  brain:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z"/></svg>',
  mic: '<svg style="width:12px;height:12px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>',
  clipboard:
    '<svg style="width:14px;height:14px;vertical-align:middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/></svg>',
  dot: '<svg style="width:5px;height:5px;vertical-align:middle;margin-right:4px" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>'
};
// Smart engine — no API key needed

function brBuildSOB(p) {
  var entries = [];
  var hasExplicitDiag = false;
  p.benefits.forEach(function (b) {
    b.items.forEach(function (item) {
      entries.push({ category: b.category, text: item });
      if (
        /x-ray|radiology|imaging|diagnostic x|diagnostic test|lab work|laboratory|pathology|radiology/i.test(
          item
        )
      )
        hasExplicitDiag = true;
    });
  });
  // For plans on recognized networks without explicit diagnostic line items,
  // add network discount entries so queries for x-ray, labs, imaging find real info
  if (
    !hasExplicitDiag &&
    p.network &&
    /First Health|PHCS|MultiPlan/i.test(p.network)
  ) {
    entries.push({
      category: 'Network Discount Services',
      text:
        'Diagnostic X-Ray and Labs — if member stays in the ' +
        p.network +
        ' Network they will receive a discount. This is not a fixed benefit but a network discount through ' +
        p.network +
        '.'
    });
    entries.push({
      category: 'Network Discount Services',
      text:
        'Outpatient lab work, radiology, and imaging services — available at ' +
        p.network +
        ' negotiated discount rates at participating facilities.'
    });
  }
  p.limitations.forEach(function (l) {
    entries.push({ category: 'Exclusions / Limitations', text: l });
  });
  entries.push({
    category: 'Waiting Periods',
    text: p.waitingPeriods.join(' | ')
  });
  entries.push({ category: 'Pre-Existing Conditions', text: p.preEx });
  entries.push({ category: 'Agent Note', text: p.planNotes });
  return entries;
}

var brActiveFilter = 'all';

function brInit() {
  if (_brInitDone) return;
  if (typeof POLICY_DOCS === 'undefined' || !POLICY_DOCS.length) return;
  if (!document.getElementById('br-plan-bar')) return;
  _brInitDone = true;

  BR_PLANS = POLICY_DOCS.map(function (p) {
    return {
      id: p.id,
      name: p.name,
      group: p.group,
      type: p.type,
      entries: brBuildSOB(p)
    };
  });
  if (!BR_PLANS.length) return;
  brActivePlan = BR_PLANS[0];

  // Build filter bar: All Plans | MEC | STM | Limited
  var filterBar = document.getElementById('br-filter-bar');
  var filters = [
    { key: 'all', label: 'All Plans' },
    { key: 'MEC', label: 'MEC' },
    { key: 'STM', label: 'STM' },
    { key: 'Limited', label: 'Limited' }
  ];
  filters.forEach(function (f) {
    var btn = document.createElement('button');
    btn.className = 'br-filter-btn' + (f.key === 'all' ? ' active' : '');
    btn.textContent = f.label;
    btn.dataset.filter = f.key;
    btn.onclick = function () {
      brActiveFilter = f.key;
      document.querySelectorAll('.br-filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.filter === f.key);
      });
      if (f.key === 'all') {
        brSearchAllPlans = true;
        brRenderPlanButtons(null);
      } else {
        brSearchAllPlans = false;
        brRenderPlanButtons(f.key);
        // Auto-select first plan in this group
        var firstInGroup = BR_PLANS.find(function (p) {
          return p.group === f.key;
        });
        if (firstInGroup) {
          brActivePlan = firstInGroup;
          document.querySelectorAll('.br-plan-btn').forEach(function (b) {
            b.classList.toggle('active', b.dataset.id === firstInGroup.id);
          });
        }
      }
      document.getElementById('br-msgs').innerHTML = '';
      brShowWelcome();
    };
    filterBar.appendChild(btn);
  });

  // Build plan buttons
  brRenderPlanButtons(null);

  // Build search index on init
  buildSearchIndex();
  brShowWelcome();
}

function brRenderPlanButtons(groupFilter) {
  var planBar = document.getElementById('br-plan-bar');
  if (!planBar) return;
  planBar.innerHTML = '';

  var plans = groupFilter
    ? BR_PLANS.filter(function (p) {
        return p.group === groupFilter;
      })
    : BR_PLANS;

  plans.forEach(function (p) {
    var btn = document.createElement('button');
    btn.className =
      'br-plan-btn' +
      (p.id === brActivePlan.id && !brSearchAllPlans ? ' active' : '');
    btn.textContent = p.name;
    btn.dataset.id = p.id;
    btn.onclick = function () {
      brSearchAllPlans = false;
      brActiveFilter = p.group;
      document.querySelectorAll('.br-filter-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.filter === p.group);
      });
      brActivePlan = BR_PLANS.find(function (x) {
        return x.id === p.id;
      });
      // Sync sticky plan context
      if (brActivePlan && typeof setActivePlan === 'function') {
        setActivePlan(
          brActivePlan.id,
          brActivePlan.name,
          brActivePlan.group || ''
        );
      }
      document.querySelectorAll('.br-plan-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.id === p.id);
      });
      document.getElementById('br-msgs').innerHTML = '';
      brShowWelcome();
    };
    planBar.appendChild(btn);
  });
}

function brShowWelcome() {
  var html =
    "Hey! I'm your Benefits AI. Pick a plan or ask me anything about coverage, copays, exclusions, or waiting periods.";

  // Plan type cards
  var groupColors = {
    MEC: {
      dot: '#22c55e',
      bg: 'rgba(34,197,94,0.06)',
      border: 'rgba(34,197,94,0.2)',
      pill: 'rgba(34,197,94,0.1)',
      pillColor: '#22c55e'
    },
    STM: {
      dot: '#5B8DEF',
      bg: 'rgba(91,141,239,0.06)',
      border: 'rgba(91,141,239,0.2)',
      pill: 'rgba(91,141,239,0.1)',
      pillColor: '#5B8DEF'
    },
    Limited: {
      dot: '#7C3AED',
      bg: 'rgba(124,58,237,0.06)',
      border: 'rgba(124,58,237,0.2)',
      pill: 'rgba(124,58,237,0.1)',
      pillColor: '#7C3AED'
    }
  };
  if (BR_PLANS.length) {
    html += '<div class="br-welcome-cards">';
    BR_PLANS.forEach(function (p) {
      var gc = groupColors[p.group] || groupColors.MEC;
      html +=
        '<div class="br-welcome-card" style="border-color:' +
        gc.border +
        ';background:' +
        gc.bg +
        ';" onclick="brWelcomePick(\'' +
        escHTML(p.id) +
        '\')">' +
        '<span class="bwc-dot" style="background:' +
        gc.dot +
        ';"></span>' +
        '<span class="bwc-name">' +
        p.name +
        '</span>' +
        '<span class="bwc-type" style="background:' +
        gc.pill +
        ';color:' +
        gc.pillColor +
        ';">' +
        p.group +
        '</span></div>';
    });
    html += '</div>';
  }

  // Quick suggestions
  html += '<div class="br-quick-suggestions">';
  var suggestions = [
    "What's covered?",
    "What's excluded?",
    'Waiting periods?',
    'Best for self-employed?'
  ];
  suggestions.forEach(function (s) {
    html +=
      '<button class="br-quick-sug" onclick="brQuick(\'' +
      escHTML(s) +
      '\')">' +
      s +
      '</button>';
  });
  html += '</div>';

  brAddMsg('ai', html);
}

function brWelcomePick(planId) {
  var plan = BR_PLANS.find(function (p) {
    return p.id === planId;
  });
  if (!plan) return;
  brSearchAllPlans = false;
  brActiveFilter = plan.group;
  brActivePlan = plan;
  document.querySelectorAll('.br-filter-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.filter === plan.group);
  });
  document.querySelectorAll('.br-plan-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.id === planId);
  });
  if (typeof setActivePlan === 'function') {
    setActivePlan(plan.id, plan.name, plan.group || '');
  }
  document.getElementById('br-input').value = 'Tell me about ' + plan.name;
  document.getElementById('br-input').dispatchEvent(new Event('input'));
  brSend();
}

document.getElementById('br-toggle').addEventListener('click', function () {
  brOpen = !brOpen;
  document.getElementById('br-panel').classList.toggle('open', brOpen);
  document.getElementById('br-toggle').classList.toggle('open', brOpen);
  document.body.classList.toggle('br-open', brOpen);
  if (brOpen) {
    document.getElementById('br-input').focus();
    brScroll();
  }
});

document.getElementById('br-input').addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 110) + 'px';
  document.getElementById('br-send').disabled = !this.value.trim();
});

document.getElementById('br-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    brSend();
  }
});

document.getElementById('br-send').disabled = true;

function brQuick(text) {
  document.getElementById('br-input').value = text;
  document.getElementById('br-input').dispatchEvent(new Event('input'));
  brSend();
}

function brClear() {
  document.getElementById('br-msgs').innerHTML = '';
  var inp = document.getElementById('br-input');
  if (inp) {
    inp.value = '';
    inp.style.height = 'auto';
  }
  document.getElementById('br-send').disabled = true;
  // Reset to all-plans mode
  brSearchAllPlans = false;
  brActiveFilter = 'all';
  if (BR_PLANS.length) brActivePlan = BR_PLANS[0];
  document.querySelectorAll('.br-filter-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.filter === 'all');
  });
  brRenderPlanButtons(null);
  // Clear any stuck typing indicator
  var typing = document.getElementById('br-typing-ind');
  if (typing) typing.remove();
  brShowWelcome();
}

function brAddMsg(role, html) {
  var msgs = document.getElementById('br-msgs');
  // Always clear any leftover typing indicator first
  var stale = document.getElementById('br-typing-ind');
  if (stale) stale.remove();
  if (role === 'ai') {
    // Show typing indicator, then reveal answer after 600ms
    var typing = document.createElement('div');
    typing.className = 'br-typing';
    typing.id = 'br-typing-ind';
    typing.innerHTML =
      '<span class="br-tdot"></span><span class="br-tdot"></span><span class="br-tdot"></span>';
    msgs.appendChild(typing);
    brScroll();
    // Safety: force-clear after 3s in case setTimeout fails
    setTimeout(function () {
      var stuck = document.getElementById('br-typing-ind');
      if (stuck) stuck.remove();
    }, 3000);
    setTimeout(function () {
      var t = document.getElementById('br-typing-ind');
      if (t) t.remove();
      var d = document.createElement('div');
      d.className = 'br-msg ai';
      d.innerHTML =
        '<div class="br-lbl">Results</div><div class="br-bub">' +
        html +
        '</div>';
      msgs.appendChild(d);
      brScroll();
    }, 600);
    return;
  }
  var d = document.createElement('div');
  d.className = 'br-msg ' + role;
  d.innerHTML =
    '<div class="br-lbl">' +
    (role === 'user' ? 'You' : 'Results') +
    '</div><div class="br-bub">' +
    html +
    '</div>';
  msgs.appendChild(d);
  brScroll();
}

function brScroll() {
  var msgs = document.getElementById('br-msgs');
  setTimeout(function () {
    msgs.scrollTop = msgs.scrollHeight;
  }, 40);
}

function brSearch(query) {
  var expandedTerms = expandSearchSynonyms(query.toLowerCase());
  var plansToSearch = brSearchAllPlans
    ? BR_PLANS
    : brActivePlan
      ? [brActivePlan]
      : [];
  var allResults = [];

  plansToSearch.forEach(function (plan) {
    var results = [];
    plan.entries.forEach(function (entry) {
      var text = entry.text.toLowerCase();
      var cat = entry.category.toLowerCase();
      var score = 0;
      // FIX: Use word-boundary-safe matching instead of naive .includes()
      expandedTerms.forEach(function (term) {
        if (brTermMatch(entry.text, term)) score += 2;
        if (brTermMatch(entry.category, term)) score += 1;
      });
      if (score > 0)
        results.push({
          entry: entry,
          score: score,
          planName: plan.name,
          planId: plan.id
        });
    });
    allResults = allResults.concat(results);
  });

  allResults.sort(function (a, b) {
    return b.score - a.score;
  });
  return allResults.slice(0, 20);
}

function brFormatResults(results, query) {
  if (!results.length) {
    var expandedTerms = expandSearchSynonyms(query.toLowerCase());
    var synonymNote =
      expandedTerms.length > 1
        ? '<br><small style="color:#B8ADA0">Also searched: ' +
          expandedTerms.slice(1, 5).join(', ') +
          (expandedTerms.length > 5 ? ' + more' : '') +
          '</small>'
        : '';
    return (
      '<span style="color:#9A8F7E">No results for <em>' +
      escHTML(query) +
      '</em>' +
      (brSearchAllPlans ? ' across all plans' : ' in ' + brActivePlan.name) +
      '.' +
      synonymNote +
      '<br>Try different keywords or tap "All Plans" to search everything.</span>' +
      '<div style="margin-top:8px;"><button onclick="brAskAI(decodeURIComponent(\'' +
      encodeURIComponent(query) +
      '\'))" style="background:#5175F1;color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;">Ask AI for help</button></div>'
    );
  }

  var expandedTerms = expandSearchSynonyms(query.toLowerCase());

  // FIX: Word-boundary-safe highlighting — prevents "ER" highlighting inside "covered"
  function highlight(text) {
    var safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    expandedTerms.forEach(function (term) {
      if (term.length < 2) return;
      var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var boundary =
        term.length <= 3 || BR_ABBREVS.indexOf(term.toLowerCase()) !== -1
          ? '\\b'
          : '';
      var re = new RegExp('(' + boundary + escaped + boundary + ')', 'gi');
      safe = safe.replace(
        re,
        '<mark style="background:#FFF3CD;padding:0 2px;border-radius:2px;font-weight:700">$1</mark>'
      );
    });
    return safe;
  }

  // Group by plan, then by category
  var byPlan = {};
  results.forEach(function (r) {
    var key = r.planName || 'Unknown';
    if (!byPlan[key]) byPlan[key] = {};
    var cat = r.entry.category;
    if (!byPlan[key][cat]) byPlan[key][cat] = [];
    byPlan[key][cat].push(r.entry.text);
  });

  var html =
    '<div style="font-size:11px;color:#9A8F7E;margin-bottom:8px">' +
    results.length +
    ' result(s)' +
    (brSearchAllPlans
      ? ' across all plans'
      : ' in <strong>' + brActivePlan.name + '</strong>') +
    '</div>';

  var catColors = {
    'Exclusions / Limitations': '#FFFFFF',
    'Waiting Periods': '#FFFFFF',
    'Pre-Existing Conditions': '#FFFFFF',
    'Agent Note': '#F8FAFF'
  };
  var catBorders = {
    'Exclusions / Limitations': '#E8EBF5',
    'Waiting Periods': '#E8EBF5',
    'Pre-Existing Conditions': '#E8EBF5',
    'Agent Note': '#E8EBF5'
  };
  var catLeftBorders = {
    'Exclusions / Limitations': '#DC2626',
    'Waiting Periods': '#F59E0B',
    'Pre-Existing Conditions': '#F59E0B',
    'Agent Note': '#5175F1'
  };
  var catIcons = {
    'Exclusions / Limitations': LI.ban,
    'Waiting Periods': LI.clock,
    'Pre-Existing Conditions': LI.warn,
    'Agent Note': LI.bulb
  };

  Object.keys(byPlan).forEach(function (planName) {
    if (brSearchAllPlans) {
      html +=
        '<div style="font-size:11px;font-weight:800;color:#5175F1;margin:8px 0 4px;letter-spacing:0.04em;text-transform:uppercase;">' +
        LI.file +
        ' ' +
        planName +
        '</div>';
    }
    var grouped = byPlan[planName];
    Object.keys(grouped).forEach(function (cat) {
      var bg = catColors[cat] || '#FFFFFF';
      var border = catBorders[cat] || '#E8EBF5';
      var leftBorder = catLeftBorders[cat] || '#29A26A';
      var icon = catIcons[cat] || LI.check;
      html +=
        '<div style="background:' +
        bg +
        ';border:1px solid ' +
        border +
        ';border-left:3px solid ' +
        leftBorder +
        ';border-radius:8px;padding:9px 12px;margin-bottom:7px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:6px;color:#374151">' +
        icon +
        ' ' +
        cat +
        '</div>';
      grouped[cat].forEach(function (text) {
        html +=
          '<div style="font-size:12.5px;line-height:1.55;margin-bottom:4px;color:#1C2035;padding-left:8px;border-left:2px solid #E8EBF5">' +
          LI.dot +
          ' ' +
          highlight(text) +
          '</div>';
      });
      html += '</div>';
    });
  });

  // Add "Ask AI" button for deeper questions
  html +=
    '<div style="margin-top:8px;text-align:center;"><button onclick="brAskAI(decodeURIComponent(\'' +
    encodeURIComponent(query) +
    '\'))" style="background:#5175F1;color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;opacity:0.85;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.85">' +
    LI.brain +
    ' Deep Analysis</button></div>';

  return html;
}

function _brBottomLine(status, query) {
  var q = query.toLowerCase();
  if (status === 'Covered')
    return 'Yes — ' + query + ' is covered under this plan.';
  if (status === 'Not Covered')
    return 'No — ' + query + ' is not covered by this plan.';
  if (status === 'Discount Available')
    return 'Network discount available, not a fixed benefit.';
  return 'See details below for ' + query + '.';
}

function _brCollapseBullets(html) {
  // If more than 6 bullet-style divs in a section, collapse extras
  var marker = 'margin-bottom:2px;line-height:1.5;">';
  var parts = html.split(marker);
  if (parts.length <= 7) return html;
  var out = '';
  for (var i = 0; i < parts.length; i++) {
    if (i === 6) {
      out += '<div class="br-collapsed-extra" style="display:none;">';
    }
    out += parts[i];
    if (i < parts.length - 1) out += marker;
  }
  out += '</div>';
  out +=
    "<button class=\"br-show-more\" onclick=\"var ex=this.previousElementSibling;var vis=ex.style.display!=='none';ex.style.display=vis?'none':'';this.textContent=vis?'Show more...':'Show less';\">Show more...</button>";
  return out;
}

var _brSendLock = false;
function brSend() {
  if (_brSendLock) return;
  var inp = document.getElementById('br-input');
  var query = inp.value.trim();
  if (!query) return;
  _brSendLock = true;
  setTimeout(function () {
    _brSendLock = false;
  }, 300);

  inp.value = '';
  inp.style.height = 'auto';
  document.getElementById('br-send').disabled = true;

  brAddMsg('user', escHTML(query));

  // PRIMARY BEHAVIOR: Dashboard first → AI fallback → Safe fallback
  var plansToUse = brSearchAllPlans
    ? BR_PLANS
    : brActivePlan
      ? [brActivePlan]
      : [];
  var structured = brStructuredAnswer(query, plansToUse);

  // Extract status from the answer HTML for bottom-line
  var statusMatch = structured.match(
    /font-weight:800;color:#[0-9A-Fa-f]+;">([\w\s]+)<\/span>/
  );
  var status = statusMatch ? statusMatch[1].trim() : '';
  var bottomLine =
    '<div class="br-bottom-line">' + _brBottomLine(status, query) + '</div>';

  // Remove "Based on the policy documents..." prefix if present
  structured = structured.replace(
    /Based on the policy documents[^<]*\.\s*/gi,
    ''
  );

  var finalHtml = bottomLine + _brCollapseBullets(structured);
  brAddMsg('ai', finalHtml);

  document.getElementById('br-send').disabled = false;
  document.getElementById('br-input').focus();
}

// ── STRUCTURED ANSWER ENGINE ──────────────────────────────────────────
// Dashboard-first → AI fallback → Safe fallback
// Returns: Coverage Status | Internal Answer | Client Rebuttal | Source Type

var REBUTTALS = {
  notCovered: [
    "That one's not on this plan — but here's what IS working for you: this plan covers the benefits people actually use day-to-day at a price that won't break the bank. Let me show you what you're getting.",
    "I hear you. That specific benefit isn't included, and I want to be straight with you about that. What this plan DOES give you is solid coverage where it counts — and at a premium that makes sense. Want me to walk you through the benefits you'd actually use?",
    "That's not part of this plan, and I'd rather be honest than dance around it. But let me ask you this — how often would you realistically use that versus something like your doctor visits, prescriptions, or hospital coverage? Because those are all covered here.",
    "Fair question. That's excluded from this plan. But most of my clients pick this plan because it covers what hits their wallet the hardest — ER visits, hospital stays, prescriptions — without the premium going through the roof. Does that line up with what you're looking for?",
    "Not on this one, I'll be upfront about that. But the reason people choose this plan is the value — you're getting real coverage for the things that actually come up, and you're not paying extra for benefits you'll never touch. Let me show you what I mean.",
    "That's not included — and I'd rather tell you now than have you find out later. But here's what I want you to see: look at everything this plan DOES cover. Most people are surprised how much they're getting for this premium.",
    "It's not covered under this plan. But before you write it off — can I show you what IS included? Because nine times out of ten, when people see the full picture, they realize this plan handles the stuff they'd actually need."
  ],
  covered: [
    "You're covered for that — it's built right into the plan. No surprises.",
    "Good news — that's included. Let me show you exactly how it works so you know what to expect.",
    "You're all set on that one. It's part of your core benefits.",
    "That's covered. And the best part — you don't have to jump through hoops to use it.",
    "Yes, that's in there. This is one of the reasons people like this plan — it covers the things that actually matter."
  ],
  partial: [
    'You do have coverage for that, but there are some limits I want you to know about upfront — no surprises down the road.',
    "It's covered, but with a cap. Let me walk you through exactly what the plan pays so you know what to expect.",
    "There is a benefit for that — it's not unlimited, but it's there. Let me break down the numbers so you can see if it works for your situation.",
    "You're partially covered. I'd rather explain the details now so you feel confident about what you're getting."
  ],
  verify: [
    "That's a great detail question — let me pull up the exact language so I give you the right answer, not a guess.",
    'I want to get you the precise answer on that, not a ballpark. Give me one second to look it up.',
    'Good question — rather than wing it, let me check the specifics so you have the real numbers.',
    'I could give you a general answer, but you deserve the exact details. Let me confirm that real quick.'
  ],
  waiting: [
    "You're covered for that — but there is a waiting period before it kicks in. For accidents, you're covered from Day 1. For sickness, it's 30 days. After that, you're good to go.",
    "That benefit does have a waiting period, and I want to be upfront about that. The good news is once it's met, you're fully covered. Let me explain the timeline.",
    "There's a short waiting period on that one — it's standard across the industry. But once you clear it, the coverage is there when you need it."
  ],
  preex: [
    "If that's something you've been treated for in the last 12 months, there is a waiting period on it — I want to be transparent. After 12 months, you're covered just like anything else. And everything that's NOT pre-existing? Covered right away.",
    "Pre-existing conditions do have a 12-month exclusion period — that's industry standard. But here's the thing: after that year, it's covered. And in the meantime, all your other benefits are active from day one.",
    "I want to be honest with you — if it's pre-existing, there's a 12-month wait. But don't let that be the only thing you see. Everything else on this plan is working for you right away, and after 12 months, that condition is covered too."
  ],
  discount: [
    "That's not a fixed copay benefit on this plan, but you DO get a discount through the network. If you stay in-network, you'll pay negotiated rates — which can save you a significant amount compared to retail pricing. Let me show you how that works.",
    "There's no set copay for that, but here's what most people miss — your network gives you access to discounted rates. That means you're not paying full price. It's not the same as a copay, but it's real savings you can count on.",
    "It's not covered as a fixed benefit, but you do have network discount access for that. In-network providers will bill at negotiated rates, which can mean significant savings compared to going without any plan at all.",
    "That one works a little differently — instead of a copay, you get network pricing. Your plan gives you access to discounted rates through the network, so you're paying less than you would out of pocket. Let me walk you through it."
  ]
};

function pickRebuttal(type) {
  var arr = REBUTTALS[type] || REBUTTALS.notCovered;
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── TOPIC-SPECIFIC OVERRIDES ─────────────────────────────────
// Returns a pre-built structured answer for known topics, or null to fall through
function _brTopicOverride(query, plans) {
  var q = query.toLowerCase().trim();
  if (!plans.length) return null;

  // Determine plan types present
  var hasGroup = {};
  plans.forEach(function (p) {
    var pd =
      typeof POLICY_DOCS !== 'undefined'
        ? POLICY_DOCS.find(function (d) {
            return d.id === p.id;
          })
        : null;
    var g = pd ? pd.group : p.group || '';
    hasGroup[g] = true;
  });
  var isMEC = hasGroup.MEC;
  var isSTM = hasGroup.STM;
  var isLimited = hasGroup.Limited;
  var isSC = plans.some(function (p) {
    return p.id === 'smartchoice2500';
  });

  // Check if a specific plan is tier 4-5
  var mecTier45 = plans.some(function (p) {
    return /medf[45]|ghdp[45]|tdk[45]/.test(p.id);
  });
  var mecTier13 = plans.some(function (p) {
    return /medf[123]|trueh1|ghdp[123]|tdk[123]/.test(p.id);
  });

  // Build a quick card
  function card(status, answer, rebuttalType) {
    var statusColor =
      status === 'Covered'
        ? '#15803D'
        : status === 'Not Covered'
          ? '#DC2626'
          : status === 'Discount Available'
            ? '#D97706'
            : status === 'No Deductible'
              ? '#5B8DEF'
              : status === 'Excluded 12 Months'
                ? '#DC2626'
                : status === 'Waiting Period Applies'
                  ? '#D97706'
                  : '#6B7280';
    var statusBg =
      status === 'Covered'
        ? '#E3F6ED'
        : status === 'Not Covered'
          ? 'rgba(220,38,38,0.06)'
          : status === 'Discount Available'
            ? '#FFFBEB'
            : status === 'No Deductible'
              ? 'rgba(91,141,239,0.06)'
              : status === 'Excluded 12 Months'
                ? 'rgba(220,38,38,0.06)'
                : status === 'Waiting Period Applies'
                  ? '#FFFBEB'
                  : '#F8F9FE';
    var statusBorder =
      status === 'Covered'
        ? '#C6F0D8'
        : status === 'Not Covered'
          ? 'rgba(220,38,38,0.15)'
          : status === 'Discount Available'
            ? '#FEF3C7'
            : status === 'No Deductible'
              ? 'rgba(91,141,239,0.2)'
              : status === 'Excluded 12 Months'
                ? 'rgba(220,38,38,0.15)'
                : status === 'Waiting Period Applies'
                  ? '#FEF3C7'
                  : '#E5E7EB';
    var statusIcon =
      status === 'Covered'
        ? LI.check
        : status === 'Not Covered'
          ? LI.ban
          : status === 'No Deductible'
            ? LI.check
            : status === 'Excluded 12 Months'
              ? LI.ban
              : status === 'Waiting Period Applies'
                ? LI.clock
                : LI.warn;
    var rebuttal = pickRebuttal(
      rebuttalType ||
        (status === 'Covered'
          ? 'covered'
          : status === 'Not Covered' || status === 'Excluded 12 Months'
            ? 'notCovered'
            : status === 'Waiting Period Applies'
              ? 'waiting'
              : status === 'Discount Available'
                ? 'discount'
                : 'covered')
    );

    var html =
      '<div style="border-radius:12px;overflow:hidden;border:1.5px solid ' +
      statusBorder +
      ';">';
    html +=
      '<div style="background:' +
      statusBg +
      ';padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ' +
      statusBorder +
      ';">';
    html +=
      '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">' +
      statusIcon +
      '</span><span style="font-size:13px;font-weight:800;color:' +
      statusColor +
      ';">' +
      status.toUpperCase() +
      '</span></div>';
    html +=
      '<span style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:2px 8px;border-radius:99px;background:' +
      statusColor +
      ';color:#fff;">' +
      LI.clipboard +
      ' Dashboard</span></div>';
    // Auto-bold dollar amounts, key terms, and plan names in the answer
    var fmtAnswer = answer
      .replace(
        /(\$[\d,]+(?:\/\w+)?(?:\s*(?:copay|deductible|maximum|max|per|day|year|visit|incident|month))?)/gi,
        '<strong>$1</strong>'
      )
      .replace(
        /\b(NOT COVERED|NOT covered|NO\b [A-Z][a-z]+|EXCLUDED|NOT ACA|ZERO|REQUIRES PREAUTHORIZATION|COMPLIANCE|12\/12|Day 1)\b/g,
        '<strong style="color:#DC2626">$1</strong>'
      )
      .replace(/\b(COVERED|INCLUDED|available)\b/gi, function (m) {
        return m === m.toUpperCase()
          ? '<strong style="color:#15803D">' + m + '</strong>'
          : m;
      });

    html +=
      '<div style="padding:10px 14px;background:#F8FAFF;border-bottom:1px solid #E8EBF5;">';
    html +=
      '<div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B7280;margin-bottom:4px;">&#128203; Internal Answer</div>';
    html +=
      '<div style="font-size:12.5px;color:#1C2035;line-height:1.55;">' +
      fmtAnswer +
      '</div></div>';
    html += '<div style="padding:10px 14px;background:#F8FAFF;">';
    html +=
      '<div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B7280;margin-bottom:4px;">&#127908; Say This to Client</div>';
    html +=
      '<div style="font-size:13px;color:#1C2035;line-height:1.55;font-style:italic;">"' +
      rebuttal +
      '"</div></div></div>';
    return html;
  }

  // ── DEDUCTIBLE / OOP ──
  if (/deductible|out.of.pocket|\boop\b|max.out/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Smart Choice offers multiple deductible options: $1,500, $2,500, $3,000, or $3,500 individual. Family deductible is 2x the individual amount. Out-of-pocket maximum is $9,200 individual / $18,400 family. Copays do NOT count toward the deductible. Out-of-network has NO coverage — in-network only. Always confirm which deductible tier the member selected at enrollment in NEO.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'STM deductible options: $500, $1,000, $2,000, $2,500, $5,000, $7,500, or $10,000. Coinsurance is 80/20 after deductible. Coinsurance out-of-pocket limit: $2,000 or $4,000. Confirm deductible amount chosen at enrollment. Deductibles and limits RESET each policy term.',
        'covered'
      );
    if (isMEC)
      return card(
        'No Deductible',
        'This MEC plan has NO deductible and NO out-of-pocket maximum. This is a fixed dollar benefit plan — it pays set amounts per service listed in the Schedule of Benefits. The plan does not work like major medical insurance. There is no deductible to meet before benefits begin. Benefits are subject to copay amounts, visit limits, and annual maximums per the schedule.',
        'covered'
      );
    if (isLimited)
      return card(
        'No Deductible',
        'This Limited Benefit plan has NO deductible and NO out-of-pocket maximum. It is a fixed cash indemnity plan that pays set dollar amounts per service per day, regardless of the actual cost of care. The member is responsible for any amount above the plan benefit. Benefits are paid directly to the member, not to the provider.',
        'covered'
      );
  }

  // ── MATERNITY / PREGNANCY ──
  if (
    /maternit|pregnan|childbirth|prenatal|deliver[yie]|\bbaby\b|\bnewborn\b/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Not Covered',
        'MATERNITY AND NEWBORN CARE ARE EXCLUDED per the Smart Choice plan document. This includes: pregnancy, childbirth, prenatal care, delivery, dependent child pregnancy, infertility diagnosis, and infertility treatment. The only exception: initial postpartum depression screening up to 1 year is covered at 100%. This plan is NOT ACA-compliant and does not include ACA essential maternity benefits.',
        'notCovered'
      );
    if (isSTM)
      return card(
        'Not Covered',
        'STANDARD MATERNITY AND CHILDBIRTH ARE NOT COVERED on STM plans. This includes: normal pregnancy, prenatal care, delivery, and newborn care. EXCEPTION: Complications of pregnancy (e.g., ectopic pregnancy, toxemia, cesarean section due to medical emergency) ARE covered as any other sickness, subject to the 5-day sickness waiting period, deductible, and coinsurance. Do NOT enroll someone expecting to use maternity benefits.',
        'notCovered'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'MATERNITY IS NOT COVERED on this MEC plan. Excluded services include: pregnancy, childbirth, prenatal care, delivery, newborn well-baby inpatient care, neonatal intensive care (NICU), and any pregnancy-related complications. This is a non-ACA plan — it does not include ACA essential maternity benefits. COMPLIANCE: You MUST disclose this exclusion on every enrollment call.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Not Covered',
        'MATERNITY AND PREGNANCY ARE NOT COVERED on this Limited Benefit plan. Excluded services include: pregnancy, childbirth, prenatal care, delivery, and all pregnancy-related services. This plan is not ACA-compliant and does not include maternity benefits.',
        'notCovered'
      );
  }

  // ── MENTAL HEALTH / SUBSTANCE ABUSE ──
  if (
    /mental.health|mental.illness|\btherapy\b|counseling|psychiatr|substance.abuse|\brehab\b|addiction/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Covered',
        'Smart Choice mental health coverage: Inpatient mental health — $250 copay after deductible, 8-day limit. Outpatient office — $50 copay after deductible, 8-visit limit. Telehealth mental health — $0 copay via preferred platform (no limit). Residential treatment covered with preauthorization. Covered providers: Licensed Psychiatrist, Psychologist, Clinical Social Worker, Professional Counselor, Marriage & Family Therapist. Substance use disorder has same benefits. NOTE: Visit limits are strict — 8 days inpatient, 8 visits outpatient per benefit period.',
        'partial'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'MENTAL HEALTH AND SUBSTANCE ABUSE ARE NOT COVERED on this MEC plan. This includes: inpatient mental health, outpatient therapy, counseling, psychiatry, substance abuse treatment, drug rehabilitation, and alcohol rehabilitation. Telemedicine through Opyn Live is available at $0 for general health consults but does NOT include mental health therapy. TDK plans include 4 virtual mental health visits/year through MyLiveDoc — but MedFirst, TrueHealth, and GoodHealth plans do NOT include any mental health benefit. COMPLIANCE: You MUST disclose this exclusion.',
        'notCovered'
      );
    if (isSTM)
      return card(
        'Not Covered',
        'MENTAL HEALTH AND SUBSTANCE ABUSE ARE NOT COVERED OR VERY LIMITED on STM plans. Pinnacle STM: Limited inpatient mental health ($100/day, max 31 days) and outpatient ($50/day, max 10 visits). Substance abuse: same limited benefit. Access Health, Smart Health, Galena: Mental health coverage varies — check specific plan schedule at enrollment. Do NOT represent STM as having comprehensive mental health coverage.',
        'notCovered'
      );
    if (isLimited) {
      var hasHC200 = plans.some(function (p) {
        return /harmonycare|sigmacare/.test(p.id);
      });
      var hasNCS300 = plans.some(function (p) {
        return p.id === 'healthchoicesilver';
      });
      if (hasHC200)
        return card(
          'Covered',
          'Mental health inpatient benefit: $150-$500/day up to 60 days (tiers 200+ only). Mental health outpatient: $50/day up to 20 days. NOT available on tiers 100A and 100.',
          'partial'
        );
      if (hasNCS300)
        return card(
          'Covered',
          'Mental health inpatient benefit available on tier 300+ — $150-$500/day up to 60 days. Outpatient: $50/day up to 20 days. NOT available on tiers 100A, 100, 200.',
          'partial'
        );
      return card(
        'Not Covered',
        'Mental illness and substance abuse are not covered on this plan.',
        'notCovered'
      );
    }
  }

  // ── DENTAL / VISION ──
  if (
    /\bdental\b|\bteeth\b|\bdentist\b|\bvision\b|\beye\b|\bglasses\b|\bcontacts?\b|\boptometrist\b/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Not Covered',
        'Dental and vision are not covered. Corrective lenses post-surgery may be covered in limited circumstances.',
        'notCovered'
      );
    return card(
      'Not Covered',
      'Dental and vision are not included in this plan. A separate dental and vision policy is required. Some plans include discount programs for vision savings.',
      'notCovered'
    );
  }

  // ── PRESCRIPTION / RX ──
  if (
    /prescription|\brx\b|\bdrug\b|medication|pharmacy|\bgeneric\b|\bbrand\b/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Covered',
        'Prescription drugs covered with copays. Generic: $12 copay. See formulary for brand and specialty drug tiers.',
        'covered'
      );
    if (isMEC) {
      var tier1Rx = plans.some(function (p) {
        return /medf1|trueh1|ghdp1/.test(p.id);
      });
      if (tier1Rx)
        return card(
          'Discount Available',
          'This plan includes BestChoiceRx prescription DISCOUNT CARD only — not drug insurance. Members pay discounted rates at participating pharmacies. No drug insurance benefit.',
          'discount'
        );
      if (mecTier45)
        return card(
          'Covered',
          'Generic $0 copay. Preferred Generic $5. Non-Preferred Generic $5-$10 retail / $5-$20 mail order. Brand $40 retail / $80 mail order (prior auth required). $150/person/month benefit limit for non-preventive drugs. Specialty not covered.',
          'covered'
        );
      return card(
        'Covered',
        'Generic $0 copay (acute/preventive). Preferred Generic $5 copay (200 maintenance drugs). Specialty drugs not covered — Prescription Assistance Program available. $150/month benefit limit for non-preventive maintenance drugs.',
        'covered'
      );
    }
    if (isSTM) {
      var isPinnacle = plans.some(function (p) {
        return p.id === 'pinnacle';
      });
      if (isPinnacle)
        return card(
          'Discount Available',
          'Outpatient prescription drugs are NOT covered as insurance on Pinnacle STM. Rx Savers discount card is included.',
          'discount'
        );
      return card(
        'Covered',
        'Prescription drugs covered subject to deductible and coinsurance — confirm formulary at enrollment.',
        'covered'
      );
    }
    if (isLimited)
      return card(
        'Not Covered',
        'Prescription drugs are not covered as insurance on this plan. A prescription discount savings program is included.',
        'notCovered'
      );
  }

  // ── XRAY / IMAGING ──
  if (
    /x.?ray|imaging|\bmri\b|\bct.scan\b|\bpet.scan\b|radiology|ultrasound/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Covered',
        'X-ray and lab covered. Advanced imaging (MRI/CT/PET) covered but REQUIRES PREAUTHORIZATION — fax to 855-613-4102 or visit guidecm.com before scheduling.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'X-ray, imaging, MRI, and CT scans are covered as outpatient medical expenses, subject to deductible and coinsurance.',
        'covered'
      );
    if (isMEC) {
      if (mecTier45)
        return card(
          'Not Covered',
          'X-ray and imaging are NOT covered as insurance on this plan. Surgery, ER, and ambulance ARE covered on this tier. For imaging use First Health PPO in-network providers at providersearch.multiplan.com for discounted rates.',
          'notCovered'
        );
      return card(
        'Not Covered',
        'X-ray and imaging are NOT covered as insurance on this plan. Members can access pre-negotiated discounted rates through the First Health PPO network at providersearch.multiplan.com.',
        'notCovered'
      );
    }
    if (isLimited) {
      var hasHCTier200 = plans.some(function (p) {
        return /harmonycare|sigmacare|healthchoicesilver/.test(p.id);
      });
      if (hasHCTier200)
        return card(
          'Covered',
          'Basic Pathology and Radiology benefit available — $50-$75/day for 1-3 days per year. Advanced imaging (MRI/CT) available at average 60% discount through Imaging Savings Program — this is a discount, not insurance.',
          'partial'
        );
      return card(
        'Not Covered',
        'X-ray and imaging are not a standalone benefit. Chiropractic savings program includes discounted x-rays.',
        'notCovered'
      );
    }
  }

  // ── BLOOD WORK / LAB ──
  if (
    /blood.?work|blood.?test|\blab\b|\blabs\b|laboratory|urinalysis|pathology/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Covered',
        'Blood work and lab tests are covered, subject to deductible and coinsurance.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Blood work and lab tests are covered as outpatient medical expenses, subject to deductible and coinsurance.',
        'covered'
      );
    if (isMEC)
      return card(
        'Discount Available',
        'Blood work and lab tests are NOT covered as insurance on this plan. Members can access discounted rates through the First Health PPO network at providersearch.multiplan.com.',
        'discount'
      );
    if (isLimited) {
      var isHC = plans.some(function (p) {
        return p.id === 'harmonycare';
      });
      var isBWA = plans.some(function (p) {
        return /bwapara|bwaamericare/.test(p.id);
      });
      if (isHC)
        return card(
          'Covered',
          'Blood work covered through QuestSelect Unlimited Lab Program at $0 copay for 1,000+ outpatient lab tests including blood tests, urinalysis, pap smears, biopsies, and cultures. Present QuestSelect card at any Quest Diagnostics location. STAT/emergency labs and lab work ordered during hospitalization not included.',
          'covered'
        );
      if (isBWA)
        return card(
          'Discount Available',
          'Blood work available through DirectLabs at up to 80% off. No doctor visit needed. Access at directlabs.com/4members. NOT insurance — prepay out of pocket. Not available in NJ, NY, RI.',
          'discount'
        );
      return card(
        'Discount Available',
        'Blood work available through Laboratory Savings Program at discounted rates — NOT insurance. Access at ncegapaffordplus.com. Not available in NY, NJ, RI.',
        'discount'
      );
    }
  }

  // ── CHIROPRACTIC ──
  if (/chiropractic|chiropractor|adjustment|spinal/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Chiropractic care is covered, subject to scope of practice regulations, deductible, and coinsurance.',
        'covered'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'Chiropractic care is not covered on this MEC plan.',
        'notCovered'
      );
    if (isSTM)
      return card(
        'Not Covered',
        'Chiropractic care is generally not covered on STM plans — confirm specific plan schedule.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Discount Available',
        'Chiropractic care is not covered as insurance. A chiropractic savings program is included — free initial consultation, up to 50% off diagnostic services and x-rays, unlimited treatments at 30% savings from 12,000+ chiropractors nationwide.',
        'discount'
      );
  }

  // ── SURGERY ──
  if (/\bsurger|surgical|operation|\bprocedure\b/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Surgery covered subject to deductible and coinsurance. Certain elective surgeries excluded.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Surgery covered subject to deductible and coinsurance.',
        'covered'
      );
    if (isMEC) {
      if (mecTier13)
        return card(
          'Not Covered',
          'Surgery is not covered on this MEC Tier 1-3 plan. Upgrade to MedFirst/GoodHealth/TDK 4 or 5 for surgery benefits.',
          'notCovered'
        );
      var isTier4 = plans.some(function (p) {
        return /medf4|ghdp4|tdk4/.test(p.id);
      });
      if (isTier4)
        return card(
          'Covered',
          'In/Outpatient Surgery: $1,000/year maximum $2,000/year — subject to 12/12 pre-existing condition rule.',
          'covered'
        );
      return card(
        'Covered',
        'In/Outpatient Surgery: $1,500/day maximum $4,500/year — subject to 12/12 pre-existing condition rule.',
        'covered'
      );
    }
    if (isLimited)
      return card(
        'Covered',
        'Surgery benefit available on tiers 200+ — $400-$1,500 per day up to 3 days depending on tier. Not available on tiers 100A/100.',
        'partial'
      );
  }

  // ── EMERGENCY ROOM ──
  if (/emergency.room|\ber\b|emergency.care/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Emergency room covered, subject to deductible and coinsurance.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Emergency Room covered — subject to deductible, coinsurance, and additional ER deductible. Additional ER deductible waived if admitted within 24 hours.',
        'covered'
      );
    if (isMEC) {
      if (mecTier13)
        return card(
          'Not Covered',
          'Emergency Room is not covered on this MEC Tier 1-3 plan. Available on Tier 4 and 5 only.',
          'notCovered'
        );
      return card(
        'Covered',
        'Emergency Room: $1,000 per incident — ONLY if admitted to the hospital. If the member goes to the ER and is NOT admitted, there is NO ER benefit. Subject to 12/12 pre-existing condition rule. Ambulance: $500 per incident, also only if admitted. COMPLIANCE: Always tell the member the ER benefit requires hospital admission.',
        'partial'
      );
    }
    if (isLimited)
      return card(
        'Covered',
        'Emergency Room benefit: $50-$200 per day, maximum 1 day per year — this is a fixed cash benefit only, NOT full ER bill coverage. The plan pays the stated amount regardless of actual ER charges. Member is responsible for the difference. Not available on tier 100A. Check your specific tier for exact ER benefit amount.',
        'partial'
      );
  }

  // ── CANCER / CHEMO / RADIATION ──
  if (/\bcancer\b|\bchemo\b|chemotherap|radiation|oncolog|\btumor\b/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Chemotherapy and radiation covered, subject to deductible and coinsurance.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Cancer covered after 30-day waiting period from effective date. Chemotherapy and radiation covered as medically necessary treatment, subject to deductible and coinsurance.',
        'waiting'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'Cancer treatment, chemotherapy, and radiation are not covered on this MEC plan.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Not Covered',
        'Cancer treatment, chemotherapy, and radiation are not covered as insurance on this limited benefit plan. Fixed hospital confinement benefit applies if admitted.',
        'notCovered'
      );
  }

  // ── DIALYSIS / KIDNEY ──
  if (/dialysis|kidney|\brenal\b/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Dialysis covered, subject to deductible and coinsurance.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Dialysis covered as medically necessary treatment, subject to deductible and coinsurance.',
        'covered'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'Dialysis is not covered on this MEC plan.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Not Covered',
        'Dialysis not covered on this limited benefit plan.',
        'notCovered'
      );
  }

  // ── ORGAN TRANSPLANT ──
  if (/transplant|\borgan\b/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Organ transplants covered for approved organ types — preauthorization required. Contact guidecm.com.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Organ transplants may be covered as major surgery, subject to deductible, coinsurance, and plan maximum. Confirm with carrier.',
        'verify'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'Organ transplants are not covered on this MEC plan.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Not Covered',
        'Organ transplants are not covered on this limited benefit plan.',
        'notCovered'
      );
  }

  // ── ACUPUNCTURE ──
  if (/acupuncture/i.test(q)) {
    if (isSC)
      return card('Not Covered', 'Acupuncture not covered.', 'notCovered');
    if (isMEC)
      return card(
        'Not Covered',
        'Acupuncture is not covered on this MEC plan.',
        'notCovered'
      );
    if (isSTM)
      return card(
        'Not Covered',
        'Acupuncture is not covered on STM plans.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Discount Available',
        'Acupuncture not covered as insurance. Alternative medicine savings program available through GapAfford Plus — save 25% at 8,000+ providers at ncegapaffordplus.com.',
        'discount'
      );
  }

  // ── PHYSICAL THERAPY / REHAB ──
  if (
    /physical.therap|\bpt\b|\brehab\b|rehabilitation|occupational.therap|speech.therap/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Not Covered',
        'Physical therapy exclusions apply — check plan document.',
        'notCovered'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'Physical therapy, occupational therapy, speech therapy, and rehabilitative therapy are not covered on this MEC plan.',
        'notCovered'
      );
    if (isSTM)
      return card(
        'Not Covered',
        'Physical therapy coverage is very limited on STM plans — confirm specific plan schedule.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Not Covered',
        'Physical therapy, speech therapy, and occupational therapy are not covered on this limited benefit plan.',
        'notCovered'
      );
  }

  // ── AMBULANCE ──
  if (/ambulance|transport|air.ambulance/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'Ambulance covered, subject to deductible and coinsurance.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Ambulance covered, subject to deductible and coinsurance.',
        'covered'
      );
    if (isMEC) {
      if (mecTier13)
        return card(
          'Not Covered',
          'Ambulance is not covered on this MEC Tier 1-3 plan.',
          'notCovered'
        );
      return card(
        'Covered',
        'Ambulance: $500 per incident if admitted — subject to 12/12 pre-existing condition rule. Only covered if patient is admitted to hospital.',
        'partial'
      );
    }
    if (isLimited)
      return card(
        'Covered',
        'Ambulance benefit varies by tier — check plan schedule for amounts.',
        'partial'
      );
  }

  // ── DME / MEDICAL EQUIPMENT ──
  if (/durable.medical|dme|wheelchair|walker|crutch|cpap|oxygen/i.test(q)) {
    if (isSC)
      return card(
        'Covered',
        'DME covered when medically necessary and preauthorized. Rental preferred over purchase when cost-effective.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'DME covered as medically necessary, subject to deductible and coinsurance.',
        'covered'
      );
    if (isMEC)
      return card(
        'Not Covered',
        'Durable medical equipment and prosthetics are not covered on this MEC plan.',
        'notCovered'
      );
    if (isLimited)
      return card(
        'Not Covered',
        'DME not covered on this limited benefit plan.',
        'notCovered'
      );
  }

  // ── WAITING PERIOD ──
  if (/waiting.period|when.does.coverage|how.soon|effective.date/i.test(q)) {
    if (isSC)
      return card(
        'Waiting Period Applies',
        'Smart Choice coverage begins on the effective date. Copay-based benefits (PCP, specialist, urgent care) are available immediately with no deductible. Services subject to the deductible require the deductible to be met first. Preauthorization is required for inpatient stays, advanced imaging, and certain services — failure to preauthorize results in denial. Pre-existing condition rules may apply — review plan document.',
        'waiting'
      );
    if (isMEC)
      return card(
        'Waiting Period Applies',
        'MEC WAITING PERIODS: Accidents/injuries — covered from Day 1, no waiting period. All sickness benefits — 30-day waiting period from effective date. No benefits for sickness during the first 30 days. Preventive care and telemedicine ($0 Opyn Live) are available from Day 1. 12/12 pre-existing condition rule applies to hospitalization — conditions diagnosed or treated in prior 12 months are excluded from hospital benefits for first 12 months.',
        'waiting'
      );
    if (isSTM)
      return card(
        'Waiting Period Applies',
        'STM WAITING PERIODS: Accidents/injuries — covered from Day 1 (effective date). Sickness — 5-day waiting period from effective date. Cancer — 30-day waiting period from effective date. No benefits for sickness during the first 5 days or cancer during the first 30 days. Pre-existing conditions are excluded for the entire coverage period if diagnosed/treated in the 12 months prior to effective date.',
        'waiting'
      );
    if (isLimited)
      return card(
        'Waiting Period Applies',
        'LIMITED PLAN WAITING PERIODS: Accidents/injuries — covered from Day 1, no waiting period. All sickness benefits — 30-day waiting period from effective date. No sickness benefits during the first 30 days. Pre-existing conditions are excluded for the first 12 months from effective date (12/12 rule).',
        'waiting'
      );
  }

  // ── PRE-EXISTING CONDITIONS ──
  if (/pre.existing|prior.condition|existing.condition|history.of/i.test(q)) {
    if (isSC)
      return card(
        'Excluded 12 Months',
        'Smart Choice pre-existing condition rules: Benefits are subject to Medical Necessity determination. No traditional 12/12 pre-existing exclusion is explicitly stated in the plan document, but coverage is limited to medically necessary services as determined by the plan. Always verify with carrier for any applicable pre-existing condition rules before enrollment.',
        'preex'
      );
    if (isMEC)
      return card(
        'Excluded 12 Months',
        'PRE-EXISTING CONDITION RULE (12/12): Hospitalization benefits are NOT payable for any condition diagnosed or treated in the 12 months prior to the coverage effective date, for the first 12 months of coverage. After 12 months, the condition is covered like any other. Doctor visit copay benefits and outpatient benefits do NOT have a pre-existing exclusion — those are available regardless of health history. Telemedicine and preventive care are also not subject to pre-ex.',
        'preex'
      );
    if (isSTM)
      return card(
        'Not Covered',
        'PRE-EXISTING CONDITIONS ARE EXCLUDED. Any condition diagnosed, treated, or symptomatic in the 12 months prior to the effective date is NOT covered for the ENTIRE coverage period. This is stricter than MEC plans — there is no 12-month lookthrough. If the member has a pre-existing condition, STM will NOT cover it. New conditions developed under the current term become pre-existing if the member renews to a new term.',
        'preex'
      );
    if (isLimited)
      return card(
        'Excluded 12 Months',
        'PRE-EXISTING CONDITION RULE (12/12): Conditions diagnosed or treated in the 12 months prior to the effective date are excluded from ALL benefits for the first 12 months of coverage. After 12 months, the condition is covered. This applies to hospitalization, surgery, and all other plan benefits.',
        'preex'
      );
  }

  // ── ACA / COMPLIANCE ──
  if (
    /\baca\b|obamacare|affordable.care|marketplace|minimum.essential|tax.penalty|open.enrollment/i.test(
      q
    )
  ) {
    if (isSC)
      return card(
        'Not Covered',
        'SMART CHOICE IS NOT ACA-COMPLIANT MAJOR MEDICAL INSURANCE. It is a limited medical group health benefit plan administered by Detego Health LLC. It does not meet ACA minimum essential coverage requirements. It does not cover all 10 ACA essential health benefits. Members in states with individual mandates (CA, MA, NJ, DC, RI, VT) may face state tax penalties. COMPLIANCE: You MUST disclose this is NOT traditional insurance and NOT ACA-compliant on every enrollment.',
        'notCovered'
      );
    return card(
      'Not Covered',
      'THIS PLAN IS NOT ACA-COMPLIANT. It does NOT qualify as minimum essential coverage under the Affordable Care Act. It does not cover all 10 ACA essential health benefits (maternity, mental health, substance abuse, pediatric dental/vision, etc. are excluded or limited). Members in states with individual mandates may face state tax penalties. This is NOT marketplace insurance and is NOT available through HealthCare.gov. COMPLIANCE: You MUST clearly disclose on every call that this is NOT ACA major medical insurance.',
      'notCovered'
    );
  }

  // ── COPAY / COST / HOW MUCH ──
  if (
    /\bcopay\b|co-pay|\bcost\b|how.much|\bprice\b|\bpay\b|\bcharge\b|\bfee\b|\bpremium\b/i.test(
      q
    )
  ) {
    if (isMEC) {
      if (mecTier13)
        return card(
          'Covered',
          'MEC TIER 1-3 COPAYS: Primary Care — $25 copay, 3-4 visits/year, $150 max/visit. Specialist/Urgent Care — $50 copay, 1-4 visits/year, $300 max/visit. Telemedicine — $0 copay, unlimited visits (Opyn Live). Hospital — $1,000/day, $5,000-$15,000/year max (varies by tier). No deductible. No surgery, ER, or ambulance on Tier 1-3. All sickness benefits subject to 30-day waiting period.',
          'covered'
        );
      return card(
        'Covered',
        'MEC TIER 4-5 COPAYS: Wellness Exam — $25 copay, 1/year. Primary Care — $50 copay, 4-5 visits/year. Specialist/Urgent Care — $75 copay, 4-5 visits/year. Telemedicine — $0 (Opyn Live). Hospital — $1,000-$1,500/day. Surgery — $1,000-$1,500/day. ER (if admitted) — $1,000/incident. Ambulance (if admitted) — $500/incident. Rx — Generic $0, Preferred $5, Brand $40 retail (prior auth). No deductible.',
        'covered'
      );
    }
    if (isSTM)
      return card(
        'Covered',
        'STM plans use deductible + coinsurance structure. Doctor visits: $25-$50 copay (not subject to deductible on some plans). Hospital, surgery, ER: subject to deductible then 80/20 coinsurance. Deductible options: $500-$10,000. Coinsurance limit: $2,000 or $4,000 out-of-pocket. Confirm specific copay/deductible chosen at enrollment.',
        'covered'
      );
    if (isLimited)
      return card(
        'Covered',
        'LIMITED PLAN BENEFITS: Fixed dollar amounts per service per day. Doctor visits — $50-$75/day. Hospital — $100-$1,000/day depending on tier (max 30 days). Surgery (tiers 200+) — $400-$1,500/day. ER (tiers 100+) — $50-$100/day, 1 day max. No deductible, no coinsurance. Plan pays stated amount — member pays the difference between benefit and actual bill.',
        'covered'
      );
    if (isSC)
      return card(
        'Covered',
        'SMART CHOICE COPAYS: PCP — $40 copay (10 visits/yr). Specialist — $50 copay (10 visits/yr). Urgent Care — $60 copay (3 visits/yr). Telehealth — $0. ER — $250 copay after deductible (3 visits). Outpatient hospital — $750 copay after deductible. Inpatient — $2,500 copay after deductible (1 admission, 5 days). Generic Rx — $12 copay. Deductible: $1,500-$3,500 options. OOP max: $9,200 individual.',
        'covered'
      );
  }

  // ── DOCTOR / PCP / SPECIALIST / OFFICE VISIT ──
  if (
    /\bdoctor\b|\bpcp\b|primary.care|specialist|office.visit|physician/i.test(q)
  ) {
    if (isMEC) {
      if (mecTier13)
        return card(
          'Covered',
          'DOCTOR VISITS (MEC TIER 1-3): Primary Care — $25 copay, 3-4 visits per year, $150 max per visit. Specialist or Urgent Care — $50 copay, 1-4 visits per year, $300 max per visit. In-network providers only (First Health PPO). All sickness visits subject to 30-day waiting period. Find providers at providersearch.multiplan.com.',
          'covered'
        );
      return card(
        'Covered',
        'DOCTOR VISITS (MEC TIER 4-5): Wellness Exam — $25 copay, 1 visit/year, $150 max. Primary Care — $50 copay, 4-5 visits/year, $150 max. Specialist or Urgent Care — $75 copay, 4-5 visits/year, $300 max. In-network only (First Health PPO). Sickness visits subject to 30-day waiting period.',
        'covered'
      );
    }
    if (isSTM)
      return card(
        'Covered',
        'DOCTOR VISITS (STM): PCP and specialist visits available — copay structure varies by plan. Pinnacle STM: $50 copay for office visit. Access Health Plan 2: $15 PCP / $25 specialist. Galena Elite: $30 PCP / $45 specialist. Some copays are not subject to deductible. Confirm your specific plan at enrollment.',
        'covered'
      );
    if (isLimited)
      return card(
        'Covered',
        'DOCTOR VISITS (LIMITED): Primary Care — $50/day, 3-5 days per year depending on tier. 1000 tier: $75/day. Specialty Care — $50/day, same visit limits. 1000 tier: $75/day specialist. These are fixed benefit amounts — the plan pays the stated amount per visit day, member pays any difference above the benefit.',
        'covered'
      );
    if (isSC)
      return card(
        'Covered',
        'DOCTOR VISITS (SMART CHOICE): PCP — $40 copay, 10 visits/year (not subject to deductible). Specialist — $50 copay, 10 visits/year. PCP includes: internal medicine, general medicine, OB/GYN, pediatrics, family practice, physician assistants. Physician office services (labs, x-ray, allergy testing during visit) — $40 copay. In-network only (First Health EPO).',
        'covered'
      );
  }

  // ── TELEMEDICINE / TELEHEALTH ──
  if (
    /telemedicine|telehealth|virtual.doctor|virtual.visit|opyn|mylive/i.test(q)
  ) {
    if (isMEC)
      return card(
        'Covered',
        'TELEMEDICINE: $0 copay, unlimited visits through Opyn Live. Board-certified physicians available 24/7. Can prescribe most common medications. Available from Day 1 — no waiting period. TDK plans use MyLiveDoc instead of Opyn Live and include 4 virtual mental health visits/year per family member.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'Telemedicine may be available depending on specific STM plan. Check plan documents for telehealth provider and copay details.',
        'covered'
      );
    if (isLimited)
      return card(
        'Covered',
        'Telemedicine is included on most limited benefit plans. Check your specific plan for telehealth provider details and copay amount.',
        'covered'
      );
    if (isSC)
      return card(
        'Covered',
        'TELEHEALTH (SMART CHOICE): $0 copay through preferred telehealth platform. Includes: Primary Care, Mental Health, and Urgent Care virtual visits. Web-based, video, or telephone visits with licensed physicians. No visit limit for telehealth.',
        'covered'
      );
  }

  // ── HOSPITAL / HOSPITALIZATION / INPATIENT ──
  if (/\bhospital\b|hospitalization|inpatient|admitted|admission/i.test(q)) {
    if (isMEC) {
      if (mecTier13)
        return card(
          'Covered',
          'HOSPITAL (MEC TIER 1-3): In-patient hospitalization — $1,000/day. Annual maximums: MedFirst 1/TrueHealth 1/GoodHealth 1 = $5,000/year. MedFirst 2/GoodHealth 2 = $10,000/year. MedFirst 3/GoodHealth 3 = $15,000/year. 12/12 pre-existing condition exclusion applies. Hospital benefits are NOT limited to in-network only. No surgery, ER, or ambulance on Tier 1-3. 30-day sickness waiting period applies.',
          'covered'
        );
      return card(
        'Covered',
        'HOSPITAL (MEC TIER 4-5): In-patient — Tier 4: $1,000/day, $10,000/year max. Tier 5: $1,500/day, $15,000/year max. Surgery — Tier 4: $1,000/year, $2,000 max. Tier 5: $1,500/day, $4,500/year max. ER (if admitted) — $1,000/incident. Ambulance (if admitted) — $500/incident. All subject to 12/12 pre-ex rule. 30-day sickness waiting period.',
        'covered'
      );
    }
    if (isSTM)
      return card(
        'Covered',
        'HOSPITAL (STM): Inpatient hospitalization covered subject to deductible and coinsurance (80/20). Room and board at average standard rate. ICU covered. Outpatient surgery covered. Preauthorization may be required. Confirm deductible amount at enrollment.',
        'covered'
      );
    if (isLimited)
      return card(
        'Covered',
        'HOSPITAL (LIMITED): Hospital confinement benefit pays fixed daily amount for each day admitted. Amounts by tier: 100A=$100/day, 200=$200/day, 300=$300/day, 500=$500/day, 750=$750/day, 1000=$1,000/day. Maximum 30 days per confinement. This is a FIXED BENEFIT — the plan pays the stated daily amount regardless of actual hospital charges. Member is responsible for any amount above the plan benefit.',
        'covered'
      );
    if (isSC)
      return card(
        'Covered',
        'HOSPITAL (SMART CHOICE): Inpatient — $2,500 copay after deductible, 1 admission per family per benefit period (up to 5 days). Outpatient facility — $750 copay after deductible, 3 per family. PREAUTHORIZATION REQUIRED for all inpatient admissions — failure to preauthorize = denial of benefits. Elective surgeries excluded from outpatient benefit. In-network only (First Health EPO).',
        'covered'
      );
  }

  // ── NETWORK / PROVIDER / IN-NETWORK ──
  if (
    /\bnetwork\b|provider|in.network|out.of.network|first.health|phcs|multiplan/i.test(
      q
    )
  ) {
    if (isMEC)
      return card(
        'Covered',
        'NETWORK: First Health PPO. Outpatient physician and wellness benefits require in-network providers. Hospital indemnity benefits are NOT limited to in-network. Find providers at providersearch.multiplan.com or call MultiPlan. For services not covered as insurance, members can still access pre-negotiated discounted rates through First Health PPO in-network providers.',
        'covered'
      );
    if (isSTM)
      return card(
        'Covered',
        'NETWORK: PHCS Practitioner Plus Ancillary Network. Members can see any doctor, but using in-network providers avoids balance billing and provides negotiated rates. Facility charges: plan pays up to 150% of Medicare allowable. Find providers at providersearch.multiplan.com or call 888-371-7427.',
        'covered'
      );
    if (isLimited)
      return card(
        'Covered',
        'NETWORK: Most limited plans use First Health network. BWA Americare uses PHCS. Everest uses MultiPlan PPO. Using in-network providers ensures negotiated rates and reduces balance billing risk. Find providers at providersearch.multiplan.com.',
        'covered'
      );
    if (isSC)
      return card(
        'Covered',
        'NETWORK: First Health EPO — IN-NETWORK ONLY. This is an EPO plan — there is ZERO out-of-network coverage except for true medical emergencies (required by law). ALL providers MUST be verified in the First Health network BEFORE every appointment. Out-of-network services will NOT be covered and the member pays 100%. Find providers at providersearch.multiplan.com. COMPLIANCE: Always verify the provider is in-network before enrollment.',
        'covered'
      );
  }

  return null; // No topic match — fall through to general search
}

function brStructuredAnswer(query, plans) {
  // Check topic-specific overrides first
  var topicResult = _brTopicOverride(query, plans);
  if (topicResult) return topicResult;

  var q = query.toLowerCase().trim();
  var expandedTerms = expandSearchSynonyms(q);
  var specificTerms = getSpecificTerms(q);
  // Combine both for matching — use expanded for finding, specific for highlighting
  var searchTerms = expandedTerms.slice();
  specificTerms.forEach(function (t) {
    if (searchTerms.indexOf(t) === -1) searchTerms.push(t);
  });
  // Also add query words individually for partial matching (skip stop words + short words)
  var STOP_WORDS = [
    'the',
    'this',
    'that',
    'what',
    'does',
    'they',
    'them',
    'their',
    'have',
    'has',
    'had',
    'been',
    'being',
    'will',
    'would',
    'could',
    'should',
    'about',
    'from',
    'with',
    'just',
    'like',
    'more',
    'some',
    'than',
    'were',
    'there',
    'here',
    'when',
    'where',
    'which',
    'into',
    'also',
    'each',
    'other',
    'only',
    'very',
    'much',
    'such',
    'over',
    'most',
    'same',
    'make',
    'after',
    'before',
    'back',
    'even',
    'take',
    'come',
    'give',
    'look',
    'find',
    'know',
    'want',
    'tell',
    'work',
    'keep',
    'help',
    'show',
    'turn',
    'move',
    'live',
    'long',
    'got',
    'get',
    'getting',
    'any',
    'can',
    'are',
    'for',
    'but',
    'all',
    'how',
    'who',
    'its',
    'our',
    'you',
    'your',
    'his',
    'her',
    'him',
    'she',
    'really',
    'still',
    'cover',
    'covered',
    'coverage',
    'include',
    'included',
    'includes',
    'plan',
    'plans',
    'process',
    'service',
    'services',
    'cost',
    'costs',
    'need',
    'needs',
    'going',
    'much',
    'many',
    'also',
    'right',
    'good',
    'best',
    'info',
    'information',
    'question',
    'answer'
  ];
  q.split(/\s+/).forEach(function (w) {
    if (
      w.length >= 4 &&
      STOP_WORDS.indexOf(w) === -1 &&
      searchTerms.indexOf(w) === -1
    )
      searchTerms.push(w);
  });

  // Search dashboard content
  var allBenefits = [],
    allExclusions = [],
    allWaiting = [],
    allPreex = [];
  var matchedPlans = [];

  plans.forEach(function (plan) {
    var benefits = [],
      exclusions = [],
      waiting = [],
      preex = [];
    var hasMatch = false;

    plan.entries.forEach(function (entry) {
      var matched = false;
      var cat = entry.category.toLowerCase();
      // FIX: Use brTermMatch for word-boundary-safe matching
      for (var i = 0; i < searchTerms.length; i++) {
        if (
          brTermMatch(entry.text, searchTerms[i]) ||
          brTermMatch(entry.category, searchTerms[i])
        ) {
          matched = true;
          break;
        }
      }
      if (!matched) return;
      hasMatch = true;

      // If benefit TEXT itself says "NOT covered", treat as exclusion — not a benefit
      var textSaysNot =
        /\bNOT covered\b|\bNOT COVERED\b/i.test(entry.text) &&
        !/discount|savings|negotiated/i.test(entry.text);
      if (cat.includes('exclusion') || cat.includes('limitation'))
        exclusions.push(entry.text);
      else if (cat.includes('waiting')) waiting.push(entry.text);
      else if (cat.includes('pre-existing')) preex.push(entry.text);
      else if (textSaysNot) exclusions.push(entry.text);
      else benefits.push(entry.text);
    });

    if (hasMatch) {
      matchedPlans.push({
        name: plan.name,
        benefits: benefits,
        exclusions: exclusions,
        waiting: waiting,
        preex: preex
      });
      allBenefits = allBenefits.concat(benefits);
      allExclusions = allExclusions.concat(exclusions);
      allWaiting = allWaiting.concat(waiting);
      allPreex = allPreex.concat(preex);
    }
  });

  var totalMatches =
    allBenefits.length +
    allExclusions.length +
    allWaiting.length +
    allPreex.length;

  // Detect discount/network-rate benefits
  var discountBenefits = allBenefits.filter(function (b) {
    return /discount|negotiated rate|network discount|network rate|savings/i.test(
      b
    );
  });
  var isDiscountOnly =
    discountBenefits.length > 0 &&
    discountBenefits.length === allBenefits.length;

  // Determine coverage status and source
  var status, internalAnswer, rebuttalType, sourceType;

  if (totalMatches === 0) {
    // No dashboard match → not in the plan = not covered
    status = 'Not Covered';
    internalAnswer =
      '"' +
      query +
      "\" is not listed in the Schedule of Benefits for this plan. If it's not listed, it's not covered.";
    rebuttalType = 'notCovered';
    sourceType = 'Dashboard';
  } else if (allBenefits.length > 0 && allExclusions.length === 0) {
    if (isDiscountOnly) {
      status = 'Discount Available';
      internalAnswer = discountBenefits.slice(0, 3).join(' | ');
      rebuttalType = 'discount';
    } else {
      status = 'Covered';
      internalAnswer = allBenefits.slice(0, 3).join(' | ');
      rebuttalType = allWaiting.length
        ? 'waiting'
        : allPreex.length
          ? 'preex'
          : 'covered';
    }
    sourceType = 'Dashboard';
  } else if (allExclusions.length > 0 && allBenefits.length === 0) {
    status = 'Not Covered';
    internalAnswer = allExclusions.slice(0, 3).join(' | ');
    rebuttalType = 'notCovered';
    sourceType = 'Dashboard';
  } else if (allBenefits.length > 0 && allExclusions.length > 0) {
    // Check if exclusions clearly say NOT/NO covered
    var clearNoExclusions = allExclusions.filter(function (e) {
      return /\bNO\b|\bNOT\b|\bnot cover|\bno cover/i.test(e);
    });
    var clearNo = clearNoExclusions.length > 0;
    if (clearNo && allBenefits.length <= 2) {
      // Check if the benefits are discount/network type — show discount, not "not covered"
      if (discountBenefits.length > 0) {
        status = 'Discount Available';
        internalAnswer =
          discountBenefits[0] + ' — Note: ' + clearNoExclusions[0];
        rebuttalType = 'discount';
      } else {
        // Few benefits + clear exclusion → Not Covered (e.g. "NO mental health" with tangential matches)
        status = 'Not Covered';
        internalAnswer =
          clearNoExclusions[0] +
          (allBenefits.length ? ' (Note: ' + allBenefits[0] + ')' : '');
        rebuttalType = 'notCovered';
      }
    } else if (clearNo && allBenefits.length > 2) {
      // Many benefits + some qualified exclusions → Covered with limitation note
      status = 'Covered';
      internalAnswer = allBenefits[0] + ' — Note: ' + clearNoExclusions[0];
      rebuttalType = 'partial';
    } else {
      status = isDiscountOnly ? 'Discount Available' : 'Covered';
      internalAnswer =
        'Benefit: ' + allBenefits[0] + ' — BUT: ' + allExclusions[0];
      rebuttalType = isDiscountOnly ? 'discount' : 'partial';
    }
    sourceType = 'Dashboard';
  } else if (allWaiting.length > 0 || allPreex.length > 0) {
    status = 'Covered';
    internalAnswer =
      (allWaiting[0] || '') +
      (allPreex.length ? ' | Pre-ex: ' + allPreex[0] : '');
    rebuttalType = allPreex.length ? 'preex' : 'waiting';
    sourceType = 'Dashboard';
  } else {
    status = 'Not Covered';
    internalAnswer = 'No clear benefit found for "' + query + '" in this plan.';
    rebuttalType = 'notCovered';
    sourceType = 'Dashboard';
  }

  var rebuttal = pickRebuttal(rebuttalType);

  // Build structured HTML output
  var statusColor =
    status === 'Covered'
      ? '#15803D'
      : status === 'Not Covered'
        ? '#DC2626'
        : '#D97706';
  var statusBg =
    status === 'Covered'
      ? '#E3F6ED'
      : status === 'Not Covered'
        ? 'rgba(220,38,38,0.06)'
        : '#FFFBEB';
  var statusBorder =
    status === 'Covered'
      ? '#C6F0D8'
      : status === 'Not Covered'
        ? 'rgba(220,38,38,0.15)'
        : '#FEF3C7';
  var statusIcon =
    status === 'Covered'
      ? LI.check
      : status === 'Not Covered'
        ? LI.ban
        : LI.warn;
  var sourceIcon = sourceType === 'Dashboard' ? LI.clipboard : LI.brain;

  var html =
    '<div style="border-radius:12px;overflow:hidden;border:1.5px solid ' +
    statusBorder +
    ';">';

  // Status bar
  html +=
    '<div style="background:' +
    statusBg +
    ';padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ' +
    statusBorder +
    ';">';
  html +=
    '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">' +
    statusIcon +
    '</span><span style="font-size:13px;font-weight:800;color:' +
    statusColor +
    ';">' +
    status.toUpperCase() +
    '</span></div>';
  html +=
    '<span style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:2px 8px;border-radius:99px;background:' +
    statusColor +
    ';color:#fff;">' +
    sourceIcon +
    ' ' +
    sourceType +
    '</span>';
  html += '</div>';

  // Internal answer
  html +=
    '<div style="padding:10px 14px;background:#F8FAFF;border-bottom:1px solid #E8EBF5;">';
  html +=
    '<div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B7280;margin-bottom:4px;">&#128203; Internal Answer</div>';
  html +=
    '<div style="font-size:12.5px;color:#1C2035;line-height:1.55;">' +
    brHl(internalAnswer, specificTerms) +
    '</div>';
  html += '</div>';

  // Client rebuttal — enhanced for Not Covered and Discount Available
  html += '<div style="padding:10px 14px;background:#F8FAFF;">';
  if (status === 'Not Covered') {
    // Build plan-specific rebuttal from real data
    var planName = matchedPlans.length
      ? matchedPlans[0].name
      : brActivePlan
        ? brActivePlan.name
        : 'This plan';
    var topBens = [];
    var srcPlan = brActivePlan
      ? brActivePlan
      : BR_PLANS.length
        ? BR_PLANS[0]
        : null;
    if (srcPlan) {
      srcPlan.entries.forEach(function (e) {
        var c = e.category.toLowerCase();
        if (
          c.includes('exclusion') ||
          c.includes('limitation') ||
          c.includes('waiting') ||
          c.includes('pre-existing') ||
          c.includes('agent note') ||
          c.includes('network discount')
        )
          return;
        if (topBens.length < 3)
          topBens.push(
            e.text
              .split(' — ')[0]
              .split(':')[0]
              .replace(/^\$\d+\s*copay\s*—?\s*/i, '')
              .trim()
          );
      });
    }
    var benList = topBens.length
      ? topBens.join(', ')
      : 'doctor visits, telemedicine, and hospital coverage';
    var topBen = topBens.length ? topBens[0] : 'doctor visits';
    var specificRebuttal =
      planName +
      ' does not cover ' +
      query +
      '. Say this: "That benefit isn\'t included — what this plan does cover is ' +
      benList +
      '. Most people find ' +
      topBen +
      ' is what they use most. Does that work?"';
    html +=
      '<div class="comp-script-block" style="border-left:3px solid #15803D;background:#F0FDF4;border-radius:12px;padding:14px;margin-top:2px;">';
    html +=
      '<div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#15803D;margin-bottom:6px;">SAY THIS →</div>';
    html +=
      '<div style="font-size:13px;color:#1C2035;line-height:1.55;font-style:italic;">"' +
      specificRebuttal +
      '"</div>';
    html += '</div>';
  } else if (status === 'Discount Available') {
    html +=
      '<div class="comp-script-block" style="border-left:3px solid #D97706;background:#FFFBEB;border-radius:12px;padding:14px;margin-top:2px;">';
    html +=
      '<div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#D97706;margin-bottom:6px;">' +
      LI.mic +
      ' SAY THIS →</div>';
    html +=
      '<div style="font-size:13px;color:#1C2035;line-height:1.55;font-style:italic;">"' +
      rebuttal +
      '"</div>';
    html += '</div>';
  } else {
    html +=
      '<div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B7280;margin-bottom:4px;">' +
      LI.mic +
      ' &#127908; Say This to Client</div>';
    html +=
      '<div style="font-size:13px;color:#1C2035;line-height:1.55;font-style:italic;">"' +
      rebuttal +
      '"</div>';
  }
  html += '</div>';

  html += '</div>';

  // If multiple plans matched, show per-plan detail below
  if (matchedPlans.length > 1) {
    html +=
      '<div style="margin-top:8px;font-size:10px;color:#9A8F7E;">' +
      matchedPlans.length +
      ' plans matched — showing combined result</div>';
  }
  if (matchedPlans.length === 1 && plans.length > 1) {
    html +=
      '<div style="margin-top:6px;font-size:10px;color:#9A8F7E;">Found in: <strong>' +
      matchedPlans[0].name +
      '</strong></div>';
  }

  // Expandable detail (keep existing deep analysis available)
  if (totalMatches > 0) {
    html +=
      '<details style="margin-top:8px;"><summary style="font-size:11px;color:#5175F1;cursor:pointer;font-weight:600;">View full benefit details (' +
      totalMatches +
      ' matches)</summary>';
    html += '<div style="margin-top:6px;">';
    matchedPlans.forEach(function (pm) {
      html +=
        '<div style="font-size:11px;font-weight:700;color:#1C2035;margin:6px 0 4px;">' +
        pm.name +
        '</div>';
      pm.benefits.forEach(function (b) {
        html +=
          '<div style="font-size:11px;color:#15803D;padding-left:8px;margin-bottom:2px;">' +
          LI.check +
          ' ' +
          brHl(b, specificTerms) +
          '</div>';
      });
      pm.exclusions.forEach(function (e) {
        html +=
          '<div style="font-size:11px;color:#DC2626;padding-left:8px;margin-bottom:2px;">' +
          LI.ban +
          ' ' +
          brHl(e, specificTerms) +
          '</div>';
      });
      pm.waiting.forEach(function (w) {
        html +=
          '<div style="font-size:11px;color:#C2410C;padding-left:8px;margin-bottom:2px;">' +
          LI.clock +
          ' ' +
          brHl(w, specificTerms) +
          '</div>';
      });
      pm.preex.forEach(function (p) {
        html +=
          '<div style="font-size:11px;color:#C2410C;padding-left:8px;margin-bottom:2px;">' +
          LI.warn +
          ' ' +
          brHl(p, specificTerms) +
          '</div>';
      });
    });
    html += '</div></details>';
  }

  return html;
}

// Legacy function — still available via "Ask AI" buttons in old results
function brAskAI(query) {
  var plansToUse = brSearchAllPlans
    ? BR_PLANS
    : brActivePlan
      ? [brActivePlan]
      : [];
  var answer = brSmartAnswer(query, plansToUse);
  brAddMsg('ai', answer);
}

// Broad category terms that should NOT be used alone for matching in Smart Analysis
// These cause false positives (e.g. "diagnostic" matching "preventive health services")
var BROAD_CATEGORY_TERMS = [
  'diagnostic',
  'imaging',
  'screening',
  'preventive',
  'outpatient',
  'inpatient',
  'ambulatory',
  'pathology',
  'surgical',
  'medical',
  'health',
  'care',
  'service',
  'services',
  'treatment',
  'benefit',
  'benefits',
  'covered',
  'coverage',
  'plan',
  'visit'
];

function getSpecificTerms(query) {
  var q = query.toLowerCase().trim();
  var specific = [q];
  // Only add DIRECT synonyms from the map (first-level lookup), not fuzzy matches
  if (SEARCH_SYNONYMS[q]) {
    SEARCH_SYNONYMS[q].forEach(function (s) {
      if (BROAD_CATEGORY_TERMS.indexOf(s) === -1) specific.push(s);
    });
  }
  // Also check for multi-word queries where each word might be a key
  var words = q.split(/\s+/);
  words.forEach(function (w) {
    if (w.length > 2 && SEARCH_SYNONYMS[w]) {
      SEARCH_SYNONYMS[w].forEach(function (s) {
        if (
          BROAD_CATEGORY_TERMS.indexOf(s) === -1 &&
          specific.indexOf(s) === -1
        )
          specific.push(s);
      });
    }
  });
  var unique = [];
  specific.forEach(function (t) {
    if (unique.indexOf(t) === -1) unique.push(t);
  });
  return unique;
}

function brSmartAnswer(query, plans) {
  var q = query.toLowerCase().trim();
  var expandedTerms = expandSearchSynonyms(q);
  var specificTerms = getSpecificTerms(q); // Only specific, non-broad terms for matching

  // Detect question type
  var isCovered =
    /cover|include|have|offer|provide|get|eligible|does it|is .+ covered|can i/i.test(
      q
    );
  var isNotCovered =
    /not cover|exclud|exclu|what.+not|isn.t cover|doesn.t cover|no coverage/i.test(
      q
    );
  var isCopay = /copay|co-pay|cost|how much|price|pay|charge|fee/i.test(q);
  var isWaiting =
    /wait|waiting period|when .+ start|how long|day 1|effective/i.test(q);
  var isPreEx =
    /pre-existing|preexisting|pre ex|prior condition|existing condition/i.test(
      q
    );

  var html =
    '<div style="background:#F8FAFF;border:1px solid #E8EBF5;border-left:3px solid #5175F1;border-radius:8px;padding:12px;">';
  html +=
    '<div style="font-size:10px;font-weight:800;color:#5175F1;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px;">' +
    LI.brain +
    ' Smart Analysis</div>';

  var foundAnything = false;

  plans.forEach(function (plan) {
    var planMatches = {
      benefits: [],
      exclusions: [],
      waiting: [],
      preex: [],
      notes: []
    };
    var hasDirectMatch = false; // Track if ANY specific term actually matched

    plan.entries.forEach(function (entry) {
      // FIX: Use brTermMatch for word-boundary-safe matching
      var matched = false;
      for (var i = 0; i < specificTerms.length; i++) {
        if (
          brTermMatch(entry.text, specificTerms[i]) ||
          brTermMatch(entry.category, specificTerms[i])
        ) {
          matched = true;
          hasDirectMatch = true;
          break;
        }
      }
      if (!matched) return;

      if (cat.includes('exclusion') || cat.includes('limitation'))
        planMatches.exclusions.push(entry.text);
      else if (cat.includes('waiting')) planMatches.waiting.push(entry.text);
      else if (cat.includes('pre-existing')) planMatches.preex.push(entry.text);
      else if (cat.includes('agent note')) planMatches.notes.push(entry.text);
      else planMatches.benefits.push(entry.text);
    });

    var hasResults =
      planMatches.benefits.length ||
      planMatches.exclusions.length ||
      planMatches.waiting.length ||
      planMatches.preex.length;
    if (!hasResults) return;
    foundAnything = true;

    html += '<div style="margin-bottom:10px;">';
    html +=
      '<div style="font-size:12px;font-weight:800;color:#1C2035;margin-bottom:6px;">' +
      LI.file +
      ' ' +
      plan.name +
      '</div>';

    if (planMatches.benefits.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #29A26A;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#15803D;margin-bottom:4px;">' +
        LI.check +
        ' &#9989; COVERED</div>';
      planMatches.benefits.forEach(function (b) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;padding-left:8px;border-left:2px solid #29A26A;">' +
          LI.dot +
          ' ' +
          brHl(b, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (planMatches.exclusions.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;">' +
        LI.ban +
        ' &#10060; NOT COVERED / LIMITED</div>';
      planMatches.exclusions.forEach(function (e) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;padding-left:8px;border-left:2px solid #DC2626;">' +
          LI.dot +
          ' ' +
          brHl(e, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (isWaiting && planMatches.waiting.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #F59E0B;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#C2410C;margin-bottom:4px;">' +
        LI.clock +
        ' &#9203; WAITING PERIODS</div>';
      planMatches.waiting.forEach(function (w) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;">' +
          LI.dot +
          ' ' +
          brHl(w, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    if (isPreEx && planMatches.preex.length) {
      html +=
        '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #F59E0B;border-radius:8px;padding:8px 10px;margin-bottom:5px;">';
      html +=
        '<div style="font-size:10px;font-weight:800;color:#C2410C;margin-bottom:4px;">' +
        LI.warn +
        ' &#9888;&#65039; PRE-EXISTING CONDITIONS</div>';
      planMatches.preex.forEach(function (p) {
        html +=
          '<div style="font-size:12px;color:#1C2035;margin-bottom:3px;">' +
          LI.dot +
          ' ' +
          brHl(p, specificTerms) +
          '</div>';
      });
      html += '</div>';
    }

    // Smart verdict — only give definitive COVERED if specific terms matched benefit entries
    if (
      !planMatches.benefits.length &&
      planMatches.exclusions.length &&
      isCovered
    ) {
      html +=
        '<div style="font-size:11px;color:#DC2626;font-weight:700;margin-top:4px;">' +
        LI.warn +
        ' This does not appear to be covered under ' +
        plan.name +
        '</div>';
    } else if (
      planMatches.benefits.length &&
      !planMatches.exclusions.length &&
      isCovered
    ) {
      html +=
        '<div style="font-size:11px;color:#15803D;font-weight:700;margin-top:4px;">' +
        LI.check +
        ' Yes, this appears to be covered under ' +
        plan.name +
        '</div>';
    } else if (
      planMatches.benefits.length &&
      planMatches.exclusions.length &&
      isCovered
    ) {
      html +=
        '<div style="font-size:11px;color:#D97706;font-weight:700;margin-top:4px;">' +
        LI.warn +
        ' Partial coverage — see benefits AND exclusions above for ' +
        plan.name +
        '</div>';
    }
    html +=
      '<div style="font-size:10px;color:#6B7280;font-style:italic;margin-top:6px;padding-top:4px;border-top:1px dashed rgba(0,0,0,0.08);">⚠️ Always verify against the full Schedule of Benefits before confirming coverage to the prospect.</div>';

    html += '</div>';
  });

  if (!foundAnything) {
    html += '<div style="font-size:12px;color:#6B7280;line-height:1.6;">';
    html +=
      '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-left:3px solid #DC2626;border-radius:8px;padding:10px;margin-bottom:8px;">';
    html +=
      '<div style="font-size:10px;font-weight:800;color:#DC2626;margin-bottom:4px;">' +
      LI.ban +
      ' NOT SPECIFICALLY LISTED</div>';
    html +=
      '<strong>"' +
      query.replace(/</g, '&lt;') +
      '"</strong> is not specifically listed in the Schedule of Benefits.</div>';
    html += '<div style="font-size:11px;color:#6B7280;line-height:1.6;">';
    html +=
      LI.dot +
      ' Plans state: <em>"does not cover any service NOT listed in Schedule of Benefits"</em><br>';
    html +=
      LI.dot +
      ' If the member needs this service, check if it falls under a broader covered category<br>';
    html +=
      LI.dot +
      ' Try broader terms: hospital, outpatient, surgery, office visit<br>';
    html += LI.dot + ' Tap "All Plans" to compare across every plan';
    html += '</div></div>';
  }

  if (specificTerms.length > 1) {
    html +=
      '<div style="font-size:10px;color:#9CA3AF;margin-top:6px;border-top:1px solid rgba(0,0,0,0.06);padding-top:6px;">Searched: ' +
      specificTerms.slice(0, 8).join(', ') +
      (specificTerms.length > 8 ? ' + more' : '') +
      '</div>';
  }

  html += '</div>';
  return html;
}

// FIX: Word-boundary-safe highlighting for short terms / medical abbreviations
function brHl(text, terms) {
  var safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  terms.forEach(function (term) {
    if (term.length < 2) return;
    var escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var boundary =
      term.length <= 3 || BR_ABBREVS.indexOf(term.toLowerCase()) !== -1
        ? '\\b'
        : '';
    var re = new RegExp('(' + boundary + escaped + boundary + ')', 'gi');
    safe = safe.replace(
      re,
      '<mark style="background:#FFF3CD;padding:0 2px;border-radius:2px;font-weight:700">$1</mark>'
    );
  });
  return safe;
}

// ── ROTATING PLACEHOLDER TEXT ─────────────────────────
var _brPlaceholders = [
  'Ask about copays...',
  "What's excluded?",
  'Compare MEC vs STM...'
];
var _brPlaceholderIdx = 0;
function _brRotatePlaceholder() {
  var inp = document.getElementById('br-input');
  if (!inp || inp === document.activeElement || inp.value.trim()) return;
  _brPlaceholderIdx = (_brPlaceholderIdx + 1) % _brPlaceholders.length;
  inp.placeholder = _brPlaceholders[_brPlaceholderIdx];
}

// ── INIT: Build search index & start chat panel ──────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    buildSearchIndex();
    brInit();
    setInterval(_brRotatePlaceholder, 3000);
  });
} else {
  setTimeout(function () {
    buildSearchIndex();
    brInit();
    setInterval(_brRotatePlaceholder, 3000);
  }, 0);
}
