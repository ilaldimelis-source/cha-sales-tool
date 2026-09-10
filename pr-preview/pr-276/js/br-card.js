// br-card.js -- 12-section Benefits Reference card (fixture layout only).
// Does not read data/plans. Does not replace brRenderServerAnswer.
(function () {
  'use strict';

  var LONG_MAX_PX = 240;
  var LONG_CHARS = 21125;

  var SECTION_ORDER = [
    { key: 'plan', label: 'PLAN', loud: false, ncCopy: 'No plan identified.' },
    {
      key: 'clientSituation',
      label: 'CLIENT SITUATION',
      loud: false,
      ncCopy: 'Not captured.'
    },
    {
      key: 'quickAnswer',
      label: 'QUICK ANSWER',
      loud: true,
      ncCopy:
        'No held source confirms this. It is not established as covered or excluded.'
    },
    {
      key: 'watchOut',
      label: 'WATCH OUT',
      rail: 'danger',
      loud: true,
      ncCopy:
        'No held source establishes a watch-out here. That is not a confirmation that none exists.'
    },
    {
      key: 'complianceGate',
      label: 'COMPLIANCE GATE',
      rail: 'danger',
      boxed: true,
      loud: true,
      ncCopy:
        'No held source establishes a compliance requirement here. That is not a confirmation that none exists.'
    },
    {
      key: 'whatToSay',
      label: 'WHAT TO SAY',
      serif: true,
      loud: true,
      ncCopy: 'No approved wording yet. Nothing may be generated.'
    },
    {
      key: 'nextQuestion',
      label: 'NEXT QUESTION',
      loud: false,
      ncCopy: 'None written.'
    },
    {
      key: 'howItWorks',
      label: 'HOW IT WORKS',
      disclosure: true,
      loud: false,
      ncCopy: 'Not confirmed.'
    },
    {
      key: 'clientMayPay',
      label: 'CLIENT MAY PAY',
      disclosure: true,
      loud: false,
      ncCopy: 'Not confirmed.'
    },
    {
      key: 'doNotSay',
      label: 'DO NOT SAY',
      loud: true,
      ncCopy:
        'No restrictions recorded. This is not clearance to describe the plan freely.'
    },
    {
      key: 'source',
      label: 'SOURCE',
      quiet: true,
      loud: false,
      ncCopy: 'No source document held.'
    },
    {
      key: 'confidence',
      label: 'CONFIDENCE',
      quiet: true,
      loud: false,
      ncCopy: 'Not scored.'
    }
  ];

  function el(tag, className) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    return n;
  }

  function setText(node, s) {
    node.textContent = s == null ? '' : String(s);
  }

  function closestAttr(node, attr) {
    var n = node;
    while (n && n !== document) {
      if (n.getAttribute && n.getAttribute(attr) != null) return n;
      n = n.parentNode;
    }
    return null;
  }

  function sectionState(sec) {
    if (!sec || !sec.state) return 'NOT_CONFIRMED';
    return sec.state;
  }

  function chevronSvg() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'br-ref-card-chevron');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('d', 'M9 6l6 6-6 6');
    svg.appendChild(path);
    return svg;
  }

  function makeLongPlaceholder(len) {
    var chunk = 'FIXTURE PLACEHOLDER EXCLUSIONS TEXT NOT SOURCE DATA. ';
    var out = '[FIXTURE PLACEHOLDER -- NOT A SOURCE DOCUMENT] ';
    while (out.length < len) {
      out += chunk;
    }
    return out.substring(0, len);
  }

  function appendLines(parent, text) {
    var parts = String(text).split('\n');
    var i;
    for (i = 0; i < parts.length; i++) {
      if (i) parent.appendChild(document.createElement('br'));
      parent.appendChild(document.createTextNode(parts[i]));
    }
  }

  function notConfirmedBody(copy) {
    var wrap = el('div', 'br-ref-card-nc');
    var badge = el('span', 'br-ref-card-badge br-ref-card-badge-nc');
    setText(badge, 'NOT CONFIRMED');
    wrap.appendChild(badge);
    var p = el('p', 'br-ref-card-nc-copy');
    setText(p, copy);
    wrap.appendChild(p);
    return wrap;
  }

  function notConfirmedQuiet(copy) {
    var p = el('p', 'br-ref-card-nc-quiet');
    setText(p, copy);
    return p;
  }

  function blockedBody(sec) {
    var wrap = el('div', 'br-ref-card-blocked');
    var badge = el('span', 'br-ref-card-badge br-ref-card-badge-block');
    setText(badge, 'NOT CONFIRMED - BLOCKING GAP');
    wrap.appendChild(badge);
    var a = el('p', 'br-ref-card-blocked-copy');
    setText(
      a,
      sec && sec.notEstablished
        ? sec.notEstablished
        : 'This fact is not established.'
    );
    wrap.appendChild(a);
    var b = el('p', 'br-ref-card-blocked-copy');
    setText(
      b,
      sec && sec.nextStep
        ? sec.nextStep
        : 'A source document must confirm it before it can be used.'
    );
    wrap.appendChild(b);
    var id = el('p', 'br-ref-card-gap-id');
    setText(id, 'Gap id: ' + ((sec && sec.gapId) || 'UNKNOWN'));
    wrap.appendChild(id);
    return wrap;
  }

  function answeredValue(sec, spec) {
    var wrap = el('div', 'br-ref-card-value');
    if (spec.key === 'quickAnswer' && sec.statusPill) {
      var pill = el('span', 'br-ref-card-pill');
      setText(pill, sec.statusPill);
      wrap.appendChild(pill);
      var sentence = el('span', 'br-ref-card-qa-sentence');
      setText(sentence, sec.value || '');
      wrap.appendChild(sentence);
      return wrap;
    }
    appendLines(wrap, sec.value || '');
    return wrap;
  }

  function conflictedValue(sec, spec) {
    var wrap = answeredValue(sec, spec);
    var mark = el('span', 'br-ref-card-conflict');
    setText(mark, 'Conflict ' + ((sec && sec.conflictId) || 'UNKNOWN'));
    wrap.appendChild(mark);
    return wrap;
  }

  function fillContent(holder, sec, spec) {
    var state = sectionState(sec);
    if (state === 'BLOCKED') {
      holder.appendChild(blockedBody(sec));
      return;
    }
    if (state === 'NOT_CONFIRMED') {
      if (spec.loud) {
        holder.appendChild(notConfirmedBody(spec.ncCopy));
      } else {
        holder.appendChild(notConfirmedQuiet(spec.ncCopy));
      }
      return;
    }
    if (state === 'CONFLICTED') {
      holder.appendChild(conflictedValue(sec, spec));
      return;
    }
    holder.appendChild(answeredValue(sec, spec));
  }

  function renderSection(data, spec) {
    var sec = data && data[spec.key] ? data[spec.key] : null;
    var state = sectionState(sec);
    var section = el('section', 'br-ref-card-sec');
    if (spec.rail === 'danger') {
      section.className += ' br-ref-card-sec-danger';
    }
    if (spec.quiet) section.className += ' br-ref-card-sec-quiet';
    if (spec.serif) section.className += ' br-ref-card-sec-serif';
    if (spec.boxed) section.className += ' br-ref-card-sec-boxed';
    if (spec.disclosure) section.className += ' br-ref-card-sec-disc';
    section.setAttribute('data-br-card-section', spec.label);
    section.setAttribute('data-br-card-state', state);

    if (spec.disclosure) {
      var btn = el('button', 'br-ref-card-disc');
      btn.type = 'button';
      btn.setAttribute('data-br-card-disc', spec.key);
      btn.setAttribute('aria-expanded', 'false');
      var btnLabel = el('span', 'br-ref-card-disc-label');
      setText(btnLabel, spec.label);
      btn.appendChild(btnLabel);
      var preview = el('span', 'br-ref-card-disc-preview');
      if (sec && sec.collapse && sec.collapse.summary) {
        setText(preview, sec.collapse.summary);
      } else if (state === 'NOT_CONFIRMED') {
        setText(preview, 'Not confirmed');
      } else if (state === 'BLOCKED') {
        setText(preview, 'Blocking gap');
      } else {
        setText(preview, 'Show details');
      }
      btn.appendChild(preview);
      btn.appendChild(chevronSvg());
      section.appendChild(btn);
      if (sec && sec.collapse && sec.collapse.citation) {
        var cite = el('p', 'br-ref-card-long-cite');
        setText(cite, sec.collapse.citation);
        section.appendChild(cite);
      }
      var panel = el('div', 'br-ref-card-disc-panel');
      panel.hidden = true;
      if (sec && sec.collapse && state === 'ANSWERED') {
        var longBody = el('div', 'br-ref-card-long-body');
        longBody.setAttribute('data-br-card-long', '1');
        longBody.setAttribute(
          'data-br-card-char-count',
          String((sec.value || '').length)
        );
        longBody.setAttribute('data-br-card-max-height', String(LONG_MAX_PX));
        setText(longBody, sec.value || '');
        panel.appendChild(longBody);
      } else {
        var discBody = el('div', 'br-ref-card-body');
        fillContent(discBody, sec, spec);
        panel.appendChild(discBody);
      }
      section.appendChild(panel);
      return section;
    }

    var label = el('div', 'br-ref-card-label');
    setText(label, spec.label);
    var body = el('div', 'br-ref-card-body');
    if (spec.boxed) {
      var box = el('div', 'br-ref-card-gate');
      fillContent(box, sec, spec);
      body.appendChild(box);
    } else {
      fillContent(body, sec, spec);
    }
    section.appendChild(label);
    section.appendChild(body);
    return section;
  }

  function brRenderCard(data) {
    var msgs = document.getElementById('br-msgs');
    if (!msgs) return null;
    var card = el('article', 'br-ref-card');
    card.setAttribute('data-br-card', '1');
    var i;
    var spec;
    for (i = 0; i < SECTION_ORDER.length; i++) {
      spec = SECTION_ORDER[i];
      card.appendChild(renderSection(data || {}, spec));
    }
    msgs.appendChild(card);
    return card;
  }

  function toggleDisc(btn) {
    var section = btn.parentNode;
    if (!section) return;
    var open = btn.getAttribute('aria-expanded') === 'true';
    var next = !open;
    btn.setAttribute('aria-expanded', next ? 'true' : 'false');
    if (next) {
      section.className = section.className + ' is-open';
    } else {
      section.className = section.className.replace(/\s*is-open\b/g, '');
    }
    var panels = section.getElementsByClassName('br-ref-card-disc-panel');
    if (panels && panels[0]) panels[0].hidden = !next;
  }

  function whatToSayEmpty() {
    return { state: 'NOT_CONFIRMED' };
  }

  function fxPlan(n) {
    return {
      state: 'ANSWERED',
      value:
        '[FIXTURE ' +
        n +
        '] Placeholder plan name. Not a real plan. Not source-backed.'
    };
  }

  function answered(v) {
    return { state: 'ANSWERED', value: v };
  }

  function fixture1() {
    return {
      plan: fxPlan(1),
      clientSituation: answered(
        '[FIXTURE] Placeholder client situation. Not a real case.'
      ),
      quickAnswer: {
        state: 'ANSWERED',
        statusPill: 'FIXTURE STATUS',
        value: 'Placeholder one-sentence answer. Not source-backed.'
      },
      watchOut: answered(
        '[FIXTURE] Placeholder watch-out line. Not plan language.'
      ),
      complianceGate: answered(
        '[FIXTURE] Placeholder compliance gate. Not real compliance wording.'
      ),
      whatToSay: whatToSayEmpty(),
      nextQuestion: answered(
        '[FIXTURE] Placeholder next question. Not a real prompt.'
      ),
      howItWorks: answered(
        '[FIXTURE] Placeholder how-it-works sentence. Not a benefit description.'
      ),
      clientMayPay: answered(
        '[FIXTURE] Placeholder cost line. Not a premium or copay.'
      ),
      doNotSay: answered(
        '[FIXTURE] Placeholder do-not-say line. Not an approved restriction.'
      ),
      source: answered('[FIXTURE] Placeholder source label. Not a document.'),
      confidence: answered(
        '[FIXTURE] Placeholder confidence. Not a real score.'
      )
    };
  }

  function nc() {
    return { state: 'NOT_CONFIRMED' };
  }

  function fixture2() {
    return {
      plan: fxPlan(2),
      clientSituation: nc(),
      quickAnswer: nc(),
      watchOut: nc(),
      complianceGate: nc(),
      whatToSay: whatToSayEmpty(),
      nextQuestion: nc(),
      howItWorks: nc(),
      clientMayPay: nc(),
      doNotSay: nc(),
      source: nc(),
      confidence: nc()
    };
  }

  function fixture3() {
    var d = fixture1();
    d.plan = fxPlan(3);
    d.quickAnswer = {
      state: 'CONFLICTED',
      statusPill: 'FIXTURE STATUS',
      value: 'Placeholder conflicted sentence. Not source-backed.',
      conflictId: 'FIXTURE-CONFLICT-001'
    };
    d.whatToSay = whatToSayEmpty();
    return d;
  }

  function fixture4() {
    var d = fixture1();
    d.plan = fxPlan(4);
    d.watchOut = {
      state: 'BLOCKED',
      notEstablished:
        '[FIXTURE] Pre-existing provision is not established in any held placeholder source.',
      nextStep:
        '[FIXTURE] A source document must be attached before this section can be used on a call.',
      gapId: 'FIXTURE-GAP-001'
    };
    d.whatToSay = whatToSayEmpty();
    d.howItWorks = {
      state: 'ANSWERED',
      collapse: {
        summary: '[FIXTURE] 18 sections, source pages 34 to 41',
        citation:
          '[FIXTURE] Placeholder citation pp. 34-41. Not a real source document.'
      },
      value: makeLongPlaceholder(LONG_CHARS)
    };
    return d;
  }

  var FIXTURES = {
    1: fixture1,
    2: fixture2,
    3: fixture3,
    4: fixture4
  };

  function showFixture(id) {
    var fn = FIXTURES[String(id)];
    if (!fn) return;
    var msgs = document.getElementById('br-msgs');
    if (!msgs) return;
    var old = msgs.getElementsByClassName('br-ref-card');
    while (old.length) {
      old[0].parentNode.removeChild(old[0]);
    }
    var card = brRenderCard(fn());
    var bar = document.getElementById('br-ref-fx');
    if (bar) {
      var buttons = bar.getElementsByTagName('button');
      var i;
      for (i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute('data-br-card-fx') === String(id)) {
          buttons[i].setAttribute('aria-pressed', 'true');
        } else {
          buttons[i].setAttribute('aria-pressed', 'false');
        }
      }
    }
    return card;
  }

  function injectSwitcher() {
    var panel = document.getElementById('br-panel');
    var msgs = document.getElementById('br-msgs');
    if (!panel || !msgs) return;
    if (document.getElementById('br-ref-fx')) return;
    var bar = el('div', 'br-ref-fx');
    bar.id = 'br-ref-fx';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Fixture cards');
    var note = el('span', 'br-ref-fx-note');
    setText(note, 'DEV FIXTURES');
    bar.appendChild(note);
    var labels = [
      ['1', '1 Verified'],
      ['2', '2 Not confirmed'],
      ['3', '3 Conflicted'],
      ['4', '4 Blocking + long']
    ];
    var i;
    var btn;
    for (i = 0; i < labels.length; i++) {
      btn = el('button', 'br-ref-fx-btn');
      btn.type = 'button';
      btn.setAttribute('data-br-card-fx', labels[i][0]);
      btn.setAttribute('aria-pressed', 'false');
      setText(btn, labels[i][1]);
      bar.appendChild(btn);
    }
    panel.insertBefore(bar, msgs);
  }

  function urlHasBrcard() {
    return String(window.location.href).indexOf('brcard=1') !== -1;
  }

  document.addEventListener('click', function (e) {
    var fx = closestAttr(e.target, 'data-br-card-fx');
    if (fx) {
      showFixture(fx.getAttribute('data-br-card-fx'));
      return;
    }
    var disc = closestAttr(e.target, 'data-br-card-disc');
    if (disc) toggleDisc(disc);
  });

  function brHasExactFlag(name) {
    var search = String(window.location.search || '');
    var pairs;
    var i;
    var pair;
    var eq;
    var key;
    var val;
    if (search.charAt(0) === '?') {
      search = search.substring(1);
    }
    if (!search) {
      return false;
    }
    pairs = search.split('&');
    for (i = 0; i < pairs.length; i++) {
      pair = pairs[i];
      if (!pair) {
        continue;
      }
      eq = pair.indexOf('=');
      if (eq === -1) {
        key = pair;
        val = '';
      } else {
        key = pair.substring(0, eq);
        val = pair.substring(eq + 1);
      }
      try {
        key = decodeURIComponent(key);
        val = decodeURIComponent(val);
      } catch (_decodeErr) {
        continue;
      }
      if (key === name && val === '1') {
        return true;
      }
    }
    return false;
  }

  function brBuildPreExCard(profile, intent) {
    function notConfirmed() {
      return { state: 'NOT_CONFIRMED' };
    }
    function isNonEmptyString(s) {
      return typeof s === 'string' && s.length > 0;
    }
    function getLeaf(obj, path) {
      var parts;
      var node;
      var i;
      if (!obj || typeof obj !== 'object') {
        return null;
      }
      parts = String(path).split('.');
      node = obj;
      for (i = 0; i < parts.length; i++) {
        if (!node || typeof node !== 'object') {
          return null;
        }
        node = node[parts[i]];
      }
      if (!node || typeof node !== 'object') {
        return null;
      }
      return node;
    }
    function fieldInKeys(field, keys) {
      var k;
      if (!keys || !keys.length) {
        return false;
      }
      for (k = 0; k < keys.length; k++) {
        if (keys[k] === field) {
          return true;
        }
      }
      return false;
    }

    var data = {
      plan: notConfirmed(),
      clientSituation: notConfirmed(),
      quickAnswer: notConfirmed(),
      watchOut: notConfirmed(),
      complianceGate: notConfirmed(),
      whatToSay: notConfirmed(),
      nextQuestion: notConfirmed(),
      howItWorks: notConfirmed(),
      clientMayPay: notConfirmed(),
      doNotSay: notConfirmed(),
      source: notConfirmed(),
      confidence: notConfirmed()
    };
    var leaf;
    var v;
    var vs;
    var gaps;
    var matching;
    var seen;
    var ids;
    var i;
    var g;
    var gid;
    var srcParts;
    var dns;

    if (profile && isNonEmptyString(profile.display_name)) {
      data.plan = { state: 'ANSWERED', value: profile.display_name };
    }

    leaf = getLeaf(profile, 'limitations.pre_existing');
    if (leaf) {
      v = leaf.v;
      vs = leaf.vs;
      if (v == null) {
        data.quickAnswer = notConfirmed();
      } else if (
        isNonEmptyString(v) &&
        (vs === 'VERIFIED' || vs === 'VERIFIED_SINGLE_SOURCE')
      ) {
        data.quickAnswer = {
          state: 'ANSWERED',
          statusPill: vs,
          value: v
        };
      } else if (vs === 'CONFLICTED' && isNonEmptyString(v)) {
        data.quickAnswer = {
          state: 'CONFLICTED',
          value: v,
          conflictId: ''
        };
      }
    }

    gaps = profile && profile.open_gaps;
    matching = [];
    if (gaps && gaps.length) {
      for (i = 0; i < gaps.length; i++) {
        g = gaps[i];
        if (!g || g.blocks_statement !== true) {
          continue;
        }
        if (!isNonEmptyString(g.field)) {
          continue;
        }
        if (!fieldInKeys(g.field, intent && intent.keys)) {
          continue;
        }
        matching.push(g);
      }
    }
    if (matching.length) {
      seen = {};
      ids = [];
      for (i = 0; i < matching.length; i++) {
        gid = matching[i].gap_id;
        if (!isNonEmptyString(gid) || seen[gid]) {
          continue;
        }
        seen[gid] = true;
        ids.push(gid);
      }
      data.watchOut = {
        state: 'BLOCKED',
        notEstablished: matching[0].what_is_unknown,
        nextStep:
          'A source document must establish this before any specific period, lookback or clause may be stated on a call.',
        gapId: ids.join(' and ')
      };
    }

    leaf = getLeaf(profile, 'compliance.verification_script');
    if (leaf && isNonEmptyString(leaf.v)) {
      data.complianceGate = { state: 'ANSWERED', value: leaf.v };
      srcParts = ['Source ' + leaf.src];
      if (leaf.sec) {
        srcParts.push(leaf.sec);
      }
      if (leaf.pg != null) {
        srcParts.push('p. ' + leaf.pg);
      }
      data.source = { state: 'ANSWERED', value: srcParts.join(' ') };
    }

    dns = profile && profile.do_not_say;
    if (
      dns &&
      Object.prototype.toString.call(dns) === '[object Array]' &&
      dns.length
    ) {
      data.doNotSay = { state: 'ANSWERED', value: dns.join('\n') };
    }

    if (profile && profile.profile_confidence != null) {
      data.confidence = {
        state: 'ANSWERED',
        value: profile.profile_confidence
      };
    }

    return data;
  }

  window.brHasExactFlag = brHasExactFlag;
  window.brBuildPreExCard = brBuildPreExCard;
  window.brRenderCard = brRenderCard;

  if (urlHasBrcard()) {
    injectSwitcher();
    showFixture('1');
  }
})();
