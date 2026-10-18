// PROTOTYPE (preview only, Oct 18): grouped navigation.
// Five places in the sidebar; sub-pages show as black pills on top.
// Pages themselves are unchanged.
var PROTO_GROUPS = {
  oncall: { nav: 'oncall', pages: [] },
  plans: {
    nav: 'plans',
    pages: [
      ['plans', 'Plans'],
      ['quickreference', 'Quick Ref'],
      ['addons', 'Add-Ons'],
      ['meds', 'Meds'],
      ['networkguide', 'Network']
    ]
  },
  learn: {
    nav: 'scripts',
    pages: [
      ['scripts', 'Scripts'],
      ['training', 'CHA Academy'],
      ['cheatsheet', 'Cheat Sheet']
    ]
  },
  myspace: {
    nav: 'myspace',
    pages: [
      ['salestracker', 'Sales Tracker'],
      ['notes', 'Notes'],
      ['mindset', 'Mindset']
    ]
  }
};

var PROTO_PAGE_GROUP = {};
(function () {
  Object.keys(PROTO_GROUPS).forEach(function (g) {
    PROTO_GROUPS[g].pages.forEach(function (p) {
      PROTO_PAGE_GROUP[p[0]] = g;
    });
  });
  PROTO_PAGE_GROUP.myspace = 'myspace';
  PROTO_PAGE_GROUP.myspacehub = 'myspace';
  PROTO_PAGE_GROUP.cheatsheets = 'learn';
  PROTO_PAGE_GROUP.planscripts = 'learn';
  PROTO_PAGE_GROUP.docusign = 'learn';
  PROTO_PAGE_GROUP.traininghome = 'learn';
  PROTO_PAGE_GROUP.benefittalk = 'learn';
  PROTO_PAGE_GROUP.policydocs = 'plans';
  PROTO_PAGE_GROUP.quickref = 'plans';
  PROTO_PAGE_GROUP.networkexplainer = 'plans';
})();

var protoCurrent = 'dashboard';

function protoGo(id) {
  if (id === 'notes' || id === 'mindset' || id === 'salestracker') {
    _showComboPage('myspace', id);
  } else {
    showPage(id);
  }
  protoAfter(id);
}

function protoNavButton(id) {
  return document.querySelector('.nb[onclick="showPage(\'' + id + '\')"]');
}

function protoAfter(id) {
  if (id === 'myspace' || id === 'myspacehub') {
    _showComboPage('myspace', 'salestracker');
    id = 'salestracker';
  }
  protoCurrent = id;
  document.body.setAttribute('data-proto-page', id);
  var g = PROTO_PAGE_GROUP[id];
  var bar = document.getElementById('proto-pills');
  if (bar) {
    var pages = g ? PROTO_GROUPS[g].pages : [];
    bar.innerHTML = pages
      .map(function (p) {
        return (
          '<button type="button" class="proto-pill' +
          (p[0] === id ||
          (PROTO_PAGE_GROUP[id] === g && p[0] === protoParentOf(id))
            ? ' is-on'
            : '') +
          '" data-proto-go="' +
          p[0] +
          '">' +
          p[1] +
          '</button>'
        );
      })
      .join('');
    bar.style.display = pages.length ? '' : 'none';
  }
  if (g) {
    document.querySelectorAll('.nb').forEach(function (b) {
      b.classList.remove('active');
      b.removeAttribute('aria-current');
    });
    var btn = protoNavButton(PROTO_GROUPS[g].nav);
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'page');
    }
  }
}

function protoParentOf(id) {
  var map = {
    policydocs: 'plans',
    quickref: 'quickreference',
    networkexplainer: 'networkguide',
    planscripts: 'scripts',
    docusign: 'scripts',
    traininghome: 'training',
    benefittalk: 'training',
    cheatsheets: 'cheatsheet'
  };
  return map[id] || id;
}

function protoInit() {
  if (typeof showPage !== 'function') {
    setTimeout(protoInit, 100);
    return;
  }
  document.body.classList.add('proto-layout');
  // Sidebar: hide the pages that now live under a group.
  [
    'quickreference',
    'addons',
    'meds',
    'salestracker',
    'networkguide',
    'training'
  ].forEach(function (id) {
    var b = protoNavButton(id);
    if (b) b.style.display = 'none';
  });
  var learn = protoNavButton('scripts');
  if (learn) {
    var lbl = learn.querySelector('.nb-label');
    if (lbl) lbl.textContent = 'Learn';
  }
  // Pill bar above the pages.
  var main = document.getElementById('main-content');
  if (main && !document.getElementById('proto-pills')) {
    var bar = document.createElement('div');
    bar.id = 'proto-pills';
    bar.className = 'proto-pills';
    bar.style.display = 'none';
    main.insertBefore(bar, main.firstChild);
    bar.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-proto-go]') : null;
      if (t) protoGo(t.getAttribute('data-proto-go'));
    });
  }
  // Re-run after every page change.
  var orig = window.showPage;
  window.showPage = function (id) {
    orig(id);
    protoAfter(id);
  };
  var origCombo = window._showComboPage;
  window._showComboPage = function (p, s) {
    origCombo(p, s);
    protoAfter(s);
  };
  // Keys 1-5 follow the sidebar order.
  document.addEventListener(
    'keydown',
    function (e) {
      var tag =
        e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        (e.target && e.target.isContentEditable)
      )
        return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var map = {
        1: 'dashboard',
        2: 'oncall',
        3: 'plans',
        4: 'scripts',
        5: 'salestracker'
      };
      if (map[e.key]) {
        e.preventDefault();
        e.stopImmediatePropagation();
        protoGo(map[e.key]);
      } else if (/^[6-9]$/.test(e.key)) {
        e.stopImmediatePropagation();
      }
    },
    true
  );
  protoAfter('dashboard');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', protoInit);
} else {
  protoInit();
}
