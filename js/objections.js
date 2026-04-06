// objections.js — Objections tab
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

function renderObjections() {
  var html =
    '<div class="ph"><div class="pt">Objection <span>Handler</span></div><div class="pd">Filter by category. Tap any card for scripts, diagnostic question, bridge, and close.</div></div>';
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
  renderObjections();
}

function renderObjList() {
  var filtered =
    objCat === 'All'
      ? OBJECTIONS
      : OBJECTIONS.filter(function (o) {
          return o.cat === objCat;
        });
  var html = '';
  filtered.forEach(function (o, i) {
    var gi = OBJECTIONS.indexOf(o);
    html += '<div class="xcard" id="ox' + gi + '">';
    html += '<div class="xcard-hd" onclick="toggleXcard(\'ox' + gi + '\')">';
    html +=
      '<div class="xcard-hd-l"><div class="xcard-label" style="display:flex;align-items:center;gap:8px;">' + (typeof favStarHTML === 'function' ? favStarHTML('objection', 'obj-' + gi, o.obj, o.best, 'Objections') : '') + '"' + o.obj + '"</div>';
    html +=
      '<span style="display:inline-flex;align-items:center;font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:3px 10px;border-radius:999px;background:rgba(92,104,120,0.10);color:#5C6878;margin-top:4px;border:1px solid rgba(92,104,120,0.15);">' +
      o.cat +
      '</span></div>';
    html += '<span class="xcard-chev" aria-hidden="true">▼</span></div>';
    html += '<div class="xcard-body">';
    html +=
      '<div class="ibox ibox-diag"><span class="sbox-lbl"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> Ask First</span><br>' +
      o.diag +
      '</div>';
    html +=
      '<div class="ibox ibox-why"><span class="sbox-lbl"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17H8v-2.3A7 7 0 0 1 5 9a7 7 0 0 1 7-7z"/></svg> What It Means</span><br>' +
      o.real +
      '</div>';
    html += '<div style="display:flex;gap:8px;margin:10px 0;">';
    html +=
      '<button class="rtab active" onclick="switchTab(event,\'ox' +
      gi +
      "','best')\">Best</button>";
    html +=
      '<button class="rtab" onclick="switchTab(event,\'ox' +
      gi +
      "','soft')\">Softer</button>";
    html +=
      '<button class="rtab" onclick="switchTab(event,\'ox' +
      gi +
      "','strong')\">Stronger</button></div>";
    html +=
      '<div id="ox' +
      gi +
      '-best" class="rpanel active sbox">' +
      o.best +
      '</div>';
    html +=
      '<div id="ox' + gi + '-soft" class="rpanel sbox">' + o.soft + '</div>';
    html +=
      '<div id="ox' +
      gi +
      '-strong" class="rpanel sbox">' +
      o.strong +
      '</div>';
    html +=
      '<div class="ibox ibox-bridge u-mt10"><span class="sbox-lbl"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg> Bridge</span><br>' +
      o.bridge +
      '</div>';
    html +=
      '<div class="ibox ibox-bridge" style="border-color:rgba(212,96,122,0.2);background:rgba(212,96,122,0.05);"><span class="sbox-lbl" style="color:var(--charcoal);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/></svg> Close</span><br>' +
      o.close +
      '</div>';
    html += '</div></div>';
  });
  var _objList = document.getElementById('objList');
  if (_objList) _objList.innerHTML = html;
}

