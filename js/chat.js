// chat.js — Benefits Reference chat panel
// ── SOB LOOKUP — Synonym-Aware, Cross-Plan, Instant + Ask AI ─────────────
var brActivePlan = null;
var brSearchAllPlans = false;
var brOpen = false;
var BR_PLANS = [];
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
      if (/x-ray|radiology|imaging|diagnostic x|diagnostic test|lab work|laboratory|pathology|radiology/i.test(item)) hasExplicitDiag = true;
    });
  });
  // For plans on recognized networks without explicit diagnostic line items,
  // add network discount entries so queries for x-ray, labs, imaging find real info
  if (!hasExplicitDiag && p.network && /First Health|PHCS|MultiPlan/i.test(p.network)) {
    entries.push({
      category: 'Network Discount Services',
      text: 'Diagnostic X-Ray and Labs — if member stays in the ' + p.network + ' Network they will receive a discount. This is not a fixed benefit but a network discount through ' + p.network + '.'
    });
    entries.push({
      category: 'Network Discount Services',
      text: 'Outpatient lab work, radiology, and imaging services — available at ' + p.network + ' negotiated discount rates at participating facilities.'
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
  if (typeof POLICY_DOCS === 'undefined' || !POLICY_DOCS.length) return;
  if (!document.getElementById('br-plan-bar')) return;

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
        setActivePlan(brActivePlan.id, brActivePlan.name, brActivePlan.group || '');
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
  var name = brSearchAllPlans
    ? 'All Plans'
    : brActivePlan
      ? brActivePlan.name
      : 'a plan';
  brAddMsg(
    'ai',
    LI.clipboard +
      ' <strong>' +
      name +
      '</strong> loaded — type any keyword to search benefits, even abbreviations like x-ray, ER, MRI, rx, chiro.<br><small style="color:#9A8F7E">Synonym matching is ON — "x-ray" also finds radiology, imaging, diagnostic, etc.</small>'
  );
}

document.getElementById('br-toggle').addEventListener('click', function () {
  brOpen = !brOpen;
  document.getElementById('br-panel').classList.toggle('open', brOpen);
  document.getElementById('br-toggle').classList.toggle('open', brOpen);
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
  brShowWelcome();
}

function brAddMsg(role, html) {
  var msgs = document.getElementById('br-msgs');
  var d = document.createElement('div');
  d.className = 'br-msg ' + role;
  d.innerHTML =
    '<div class="br-lbl">' +
    (role === 'user'
      ? 'You'
      : role === 'ai-thinking'
        ? 'AI Thinking...'
        : 'Results') +
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

function brSend() {
  var inp = document.getElementById('br-input');
  var query = inp.value.trim();
  if (!query) return;

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
  brAddMsg('ai', structured);

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

function brStructuredAnswer(query, plans) {
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
      var textSaysNot = /\bNOT covered\b|\bNOT COVERED\b/i.test(entry.text) && !/discount|savings|negotiated/i.test(entry.text);
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
  var discountBenefits = allBenefits.filter(function(b) {
    return /discount|negotiated rate|network discount|network rate|savings/i.test(b);
  });
  var isDiscountOnly = discountBenefits.length > 0 && discountBenefits.length === allBenefits.length;

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
        internalAnswer = discountBenefits[0] + ' — Note: ' + clearNoExclusions[0];
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
    '<div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B7280;margin-bottom:4px;">Internal Answer</div>';
  html +=
    '<div style="font-size:12.5px;color:#1C2035;line-height:1.55;">' +
    brHl(internalAnswer, specificTerms) +
    '</div>';
  html += '</div>';

  // Client rebuttal — enhanced for Not Covered and Discount Available
  html += '<div style="padding:10px 14px;background:#F8FAFF;">';
  if (status === 'Not Covered') {
    // Build plan-specific rebuttal from real data
    var planName = (matchedPlans.length ? matchedPlans[0].name : (brActivePlan ? brActivePlan.name : 'This plan'));
    var topBens = [];
    var srcPlan = brActivePlan ? brActivePlan : (BR_PLANS.length ? BR_PLANS[0] : null);
    if (srcPlan) {
      srcPlan.entries.forEach(function(e) {
        var c = e.category.toLowerCase();
        if (c.includes('exclusion') || c.includes('limitation') || c.includes('waiting') || c.includes('pre-existing') || c.includes('agent note') || c.includes('network discount')) return;
        if (topBens.length < 3) topBens.push(e.text.split(' — ')[0].split(':')[0].replace(/^\$\d+\s*copay\s*—?\s*/i,'').trim());
      });
    }
    var benList = topBens.length ? topBens.join(', ') : 'doctor visits, telemedicine, and hospital coverage';
    var topBen = topBens.length ? topBens[0] : 'doctor visits';
    var specificRebuttal = planName + ' does not cover ' + query + '. Say this: "That benefit isn\'t included — what this plan does cover is ' + benList + '. Most people find ' + topBen + ' is what they use most. Does that work?"';
    html += '<div class="comp-script-block" style="border-left:3px solid #15803D;background:#F0FDF4;border-radius:12px;padding:14px;margin-top:2px;">';
    html += '<div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#15803D;margin-bottom:6px;">SAY THIS →</div>';
    html += '<div style="font-size:13px;color:#1C2035;line-height:1.55;font-style:italic;">"' + specificRebuttal + '"</div>';
    html += '</div>';
  } else if (status === 'Discount Available') {
    html += '<div class="comp-script-block" style="border-left:3px solid #D97706;background:#FFFBEB;border-radius:12px;padding:14px;margin-top:2px;">';
    html += '<div style="font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#D97706;margin-bottom:6px;">' + LI.mic + ' SAY THIS →</div>';
    html += '<div style="font-size:13px;color:#1C2035;line-height:1.55;font-style:italic;">"' + rebuttal + '"</div>';
    html += '</div>';
  } else {
    html += '<div style="font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B7280;margin-bottom:4px;">' + LI.mic + ' Say This to Client</div>';
    html += '<div style="font-size:13px;color:#1C2035;line-height:1.55;font-style:italic;">"' + rebuttal + '"</div>';
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
        ' COVERED</div>';
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
        ' NOT COVERED / LIMITED</div>';
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
        ' WAITING PERIODS</div>';
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
        ' PRE-EXISTING CONDITIONS</div>';
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

// ── INIT: Build search index & start chat panel ──────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    buildSearchIndex();
    brInit();
  });
} else {
  setTimeout(function () {
    buildSearchIndex();
    brInit();
  }, 0);
}
