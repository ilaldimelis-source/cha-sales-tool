// objections.js — Objections tab (battle cards + rebuttal panel)
var objCat = 'All';
const OBJ_CATS = [
  'All',
  'Price',
  'Delay',
  'Trust',
  'Spouse',
  'Coverage',
  'Timing',
  'Hospital'
];

const OBJECTIONS = [
  {
    cat: 'Price',
    obj: "It's Too Expensive",
    diag: 'Is it the monthly itself, or just not seeing how it actually protects you yet?',
    real: "They haven't connected the cost to what they're actually protected from. The premium feels real — the exposure doesn't yet.",
    best: "I hear you — that's one of the most common concerns. Most people are already spending money unpredictably on healthcare… this just makes it controlled and actually protects you.",
    soft: "Totally fair — you're just trying to make the right decision. Would it help if I showed you how this actually plays out in a real situation?",
    strong:
      "Right — but if something happens, the cost isn't the monthly premium. It's a much bigger number. This is really about preventing that.",
    bridge:
      'Based on that — does this feel like it actually makes sense for you?',
    close: "Perfect — let's get you protected starting [date].",
    avoid: [
      "Don't lower the price before establishing value",
      "Don't apologize for the cost",
      "Don't let silence after the price go unfilled — fill it with value"
    ],
    when: 'Use after discovery when budget is the stated objection.'
  },
  {
    cat: 'Delay',
    obj: 'I Need to Think About It',
    diag: 'What specifically are you wanting to think through?',
    real: "One unresolved concern underneath. 'Think about it' is almost never about thinking — it's about one thing they haven't said yet.",
    best: "Of course — you should feel comfortable. Usually when someone says that, there's just one thing that isn't fully clear yet.",
    soft: "No pressure at all — I just want to make sure you're not stuck guessing later.",
    strong:
      'Totally — but usually when people wait, nothing actually changes except they stay uncovered.',
    bridge:
      'If we clear that part up right now, would you feel good moving forward?',
    close: "Let's go ahead and get this set up so you're not exposed.",
    avoid: [
      "Never say 'okay, call me back'",
      "Don't accept the delay without asking what specifically they need to think about",
      "Don't let them hang up without a scheduled follow-up"
    ],
    when: 'Use any time prospect tries to delay without a specific reason.'
  },
  {
    cat: 'Spouse',
    obj: 'I Need to Talk to My Spouse',
    diag: 'In your own mind — does this make sense for you?',
    real: "Sometimes true, sometimes a delay. Either way, they haven't fully committed personally yet.",
    best: "Of course — that's important. If you feel good about it, it's much easier to explain it to them.",
    soft: 'Totally respect that — I just want to make sure you feel confident about it first.',
    strong:
      'If it makes sense to you, usually the only thing your spouse wants is clarity — not delay.',
    bridge: "Let's make sure you feel 100% solid explaining it.",
    close:
      "Worst case, they review it after — but at least you're protected starting today.",
    avoid: [
      "Don't fight the objection",
      "Don't hang up without either a 3-way call offer or a firm scheduled callback",
      'Never let them leave without their own personal buy-in first'
    ],
    when: 'Use when spouse is invoked as a delay — get personal buy-in before accepting the objection.'
  },
  {
    cat: 'Delay',
    obj: 'Send Me the Information',
    diag: 'What would you want to understand when you look at it?',
    real: "They want an exit from the call without saying no directly. 'Send me info' is almost always a polite stall.",
    best: 'I can definitely send it — I just want to make sure it actually makes sense when you read it.',
    soft: "No problem at all — I just don't want you looking at something confusing.",
    strong:
      "Most people I send it to don't end up moving forward because they don't understand it without context.",
    bridge: "Let me walk you through the key part now — it'll take 2 minutes.",
    close: 'That way you have both — coverage AND the info.',
    avoid: [
      "Don't just send information and hope for the best",
      'Always get a scheduled callback before hanging up',
      'Information sent without follow-up is almost never read'
    ],
    when: 'Use when they ask for materials as an exit strategy.'
  },
  {
    cat: 'Trust',
    obj: "I Don't Trust This",
    diag: 'Is it the plan itself, or just not seeing something like this before?',
    real: "They've been burned before, heard something negative, or don't know enough to feel safe.",
    best: 'I actually respect that — you should question things like this.',
    soft: 'Totally fair — especially with how confusing insurance is.',
    strong:
      "Everything I'm telling you is verifiable — I'd rather you check than just take my word.",
    bridge:
      'This is administered by [administrator], uses [network], underwritten by [underwriter].',
    close:
      'Does that give you enough clarity to feel comfortable moving forward?',
    avoid: [
      "Don't get defensive",
      "Don't oversell to compensate for skepticism",
      "Never promise things the plan doesn't cover — that deepens distrust",
      'Always disclose limitations proactively'
    ],
    when: 'Use with prospects who are inherently skeptical or have had bad experiences before.'
  },
  {
    cat: 'Timing',
    obj: "I'll Wait for Open Enrollment",
    diag: "What's your plan if something happens between now and then?",
    real: "They think open enrollment is their only option or that waiting is safe. They don't understand their current exposure.",
    best: "A lot of people say that — the concern is just the gap. Between now and then, if something happens, you're fully exposed.",
    soft: "I get it — ACA is a great option when it's available. This is just about protecting you during the wait.",
    strong:
      "Waiting doesn't reduce risk — it just leaves you exposed until that window opens.",
    bridge:
      "This is just protection until that window opens — it's a bridge, not a replacement.",
    close: "Let's get the bridge in place so you're covered.",
    avoid: [
      "Don't dismiss the ACA or open enrollment",
      "Don't suggest this is a permanent replacement",
      "Be compliant — acknowledge what this plan is and what it isn't"
    ],
    when: 'Use when prospect plans to wait for ACA open enrollment instead of acting now.'
  },
  {
    cat: 'Coverage',
    obj: 'I Have Coverage',
    diag: 'Is it active right now, and do you know your deductible?',
    real: "They may have something insufficient, lapsed, or with major gaps. Don't assume their coverage is solid.",
    best: "That's great — most people think they're fully covered until they look closer.",
    soft: "I just want to make sure there aren't any gaps you're unaware of.",
    strong:
      "A lot of plans leave people exposed in ways they don't realize until it's too late.",
    bridge: "Let's just compare quickly so you know for sure.",
    close: 'Does it make sense to fill that gap?',
    avoid: [
      "Don't assume their coverage is comprehensive",
      "Don't immediately pivot to selling — ask about their current plan first",
      "Don't dismiss their existing coverage — build on top of it"
    ],
    when: 'Use when prospect says they already have some form of coverage.'
  },
  {
    cat: 'Coverage',
    obj: 'Pre-Existing Condition',
    diag: 'Are you more focused on that being covered, or just having protection overall?',
    real: "Prospect is worried they'll be denied or that the condition won't be covered. Needs full honest framing.",
    best: 'I appreciate you being upfront — that actually helps a lot.',
    soft: 'No worries — a lot of people are in that situation.',
    strong:
      "Even if that condition isn't covered immediately, you're still exposed to everything else starting day one.",
    bridge: 'This protects you from anything new starting day one.',
    close: "Let's at least make sure you're not fully exposed.",
    avoid: [
      'Never imply the pre-existing condition is covered from day one',
      'Be clear about the 12-month exclusion period',
      "Don't lose the sale without pivoting to what IS covered immediately"
    ],
    when: 'Use when prospect discloses a health condition and worries about coverage.'
  },
  {
    cat: 'Hospital',
    obj: 'Hospital / Catastrophic — Indemnity',
    diag: 'Are you mainly concerned about a major event or everyday coverage?',
    real: 'Prospect is comparing indemnity to major medical. Needs honest framing of how fixed daily benefits work vs full coverage.',
    best: "Great question — and I want to be very clear here. This is not major medical — it's designed to offset those big hits.",
    soft: "Totally fair — that's the most important thing to understand about this type of plan.",
    strong:
      "This isn't major medical — it pays you directly when you're admitted. Cash in your pocket to offset the financial hit.",
    bridge:
      'It pays you directly — cash in your pocket when something happens.',
    close: 'Would having that buffer in place make you feel more secure?',
    avoid: [
      'Never say the plan covers the hospital bill — it pays a fixed daily benefit',
      "Don't skip the 30-day wait and 12/12 pre-ex disclosures",
      "Don't let the comparison to major medical kill the sale without a reframe"
    ],
    when: 'Use when prospect asks about major events, surgery, or catastrophic coverage on an indemnity plan.'
  }
];

var _objBattleIdx = -1;

function _objEsc(s) {
  if (typeof escHTML === 'function') return escHTML(String(s == null ? '' : s));
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderObjections() {
  _objBattleIdx = -1;
  var html =
    '<div class="ph"><div class="pt">Objection <span>Handler</span></div><div class="pd">Battle cards: tap an objection to read the primary rebuttal and diagnostic opener. Filter by category above.</div></div>';
  html += '<div class="stabs">';
  OBJ_CATS.forEach(function (c) {
    html +=
      '<button class="stab ' +
      (c === objCat ? 'active' : '') +
      '" onclick="setObjCat(\'' +
      c +
      '\')">' +
      c +
      '</button>';
  });
  html += '</div><div id="objList"></div>';
  var _page_objections = document.getElementById('page-objections');
  if (_page_objections) _page_objections.innerHTML = html;
  renderObjList();
}

function setObjCat(c) {
  objCat = c;
  _objBattleIdx = -1;
  renderObjections();
}

function _objCatClass(cat) {
  var known = {
    Price: 'obj-cat-price',
    Delay: 'obj-cat-delay',
    Spouse: 'obj-cat-spouse',
    Trust: 'obj-cat-trust',
    Timing: 'obj-cat-timing',
    Coverage: 'obj-cat-coverage',
    Hospital: 'obj-cat-hospital'
  };
  return known[cat] || 'obj-cat-default';
}

function _objSelectBattle(gi) {
  if (_objBattleIdx === gi) {
    _objBattleIdx = -1;
  } else {
    _objBattleIdx = gi;
  }
  renderObjList();
}

function _objBattleDrawerHtml(o) {
  return (
    '<div class="obj-battle-drawer-inner">' +
    '<div class="obj-battle-rebuttal"><strong>Ask first:</strong> ' +
    _objEsc(o.diag) +
    '</div>' +
    '<div class="obj-battle-rebuttal u-mt10"><strong>Rebuttal:</strong> ' +
    _objEsc(o.best) +
    '</div>' +
    '<div class="obj-battle-rebuttal u-mt10"><strong>Bridge:</strong> ' +
    _objEsc(o.bridge) +
    '</div>' +
    '</div>'
  );
}

function renderObjList() {
  var filtered =
    objCat === 'All'
      ? OBJECTIONS
      : OBJECTIONS.filter(function (o) {
          return o.cat === objCat;
        });
  var html = '';
  html += '<div class="obj-battle-list">';
  filtered.forEach(function (o) {
    var gi = OBJECTIONS.indexOf(o);
    var inCat = objCat === 'All' || o.cat === objCat;
    var open = inCat && gi === _objBattleIdx;
    html += '<div class="obj-battle-item' + (open ? ' is-open' : '') + '">';
    html +=
      '<button type="button" class="obj-battle-row' +
      (open ? ' is-active' : '') +
      '" onclick="_objSelectBattle(' +
      gi +
      ')" aria-expanded="' +
      (open ? 'true' : 'false') +
      '">';
    html +=
      '<span class="obj-cat-badge ' +
      _objCatClass(o.cat) +
      '">' +
      o.cat +
      '</span>';
    html +=
      '<span class="obj-battle-title">&ldquo;' +
      _objEsc(o.obj) +
      '&rdquo;</span>';
    html +=
      '<span class="obj-battle-chev" aria-hidden="true">▼</span></button>';
    html +=
      '<div class="obj-battle-drawer" role="region" aria-label="Rebuttal"' +
      (open ? '' : ' hidden') +
      '>';
    if (open) html += _objBattleDrawerHtml(o);
    html += '</div></div>';
  });
  html += '</div>';

  html += _objBuildPlanFitSection();
  var _objList = document.getElementById('objList');
  if (_objList) _objList.innerHTML = html;
}

// Plan fit / framing / compliance (from PLANS) — kept out of Plan Vault (data-only).
function _objBuildPlanFitSection() {
  if (typeof PLANS === 'undefined' || !PLANS.length) return '';
  var cards = [];
  for (var i = 0; i < PLANS.length; i++) {
    var p = PLANS[i];
    if (!p || !p.framing) continue;
    var one = [];
    one.push('<article class="obj-planfit-card">');
    one.push('<h3 class="obj-planfit-name">' + _objEsc(p.name) + '</h3>');
    one.push(
      '<div class="obj-planfit-block"><span class="obj-planfit-lbl">Framing</span><div class="obj-planfit-txt">' +
        _objEsc(p.framing) +
        '</div></div>'
    );
    if (p.fitYes && p.fitYes.length) {
      one.push(
        '<div class="obj-planfit-block"><span class="obj-planfit-lbl">Best fit</span><ul class="obj-planfit-ul">'
      );
      for (var j = 0; j < p.fitYes.length; j++) {
        one.push('<li>' + _objEsc(p.fitYes[j]) + '</li>');
      }
      one.push('</ul></div>');
    }
    if (p.fitNo && p.fitNo.length) {
      one.push(
        '<div class="obj-planfit-block"><span class="obj-planfit-lbl">Not a fit</span><ul class="obj-planfit-ul">'
      );
      for (var k = 0; k < p.fitNo.length; k++) {
        one.push('<li>' + _objEsc(p.fitNo[k]) + '</li>');
      }
      one.push('</ul></div>');
    }
    if (p.compliance) {
      one.push(
        '<div class="obj-planfit-compliance"><span class="obj-planfit-compliance-lbl">Compliance</span>' +
          _objEsc(p.compliance) +
          '</div>'
      );
    }
    one.push('</article>');
    cards.push(one.join(''));
  }
  if (!cards.length) return '';
  return (
    '<section class="obj-planfit-section" aria-label="Plan fit and framing">' +
    '<h2 class="obj-planfit-h">Plan fit &amp; framing</h2>' +
    '<p class="obj-planfit-intro">Product-level framing, fit filters, and delivery compliance — Plan Vault stays data-only.</p>' +
    '<div class="obj-planfit-grid">' +
    cards.join('') +
    '</div></section>'
  );
}
