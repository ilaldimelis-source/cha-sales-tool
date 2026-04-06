// app.js — Navigation, routing, PAGE_CONFIG, initApp

// ══════════════════════════════════════════════════════
// PAGE CONSOLIDATION CONFIG & NAVIGATION
// ══════════════════════════════════════════════════════

var PAGE_CONFIG = {
  liveassist: {
    label: 'Live Assist',
    subs: [
      { id: 'live', label: 'Live Assist', render: renderLive },
      {
        id: 'recovery',
        label: 'Regain Control (Rebuttals)',
        render: renderRecovery
      },
      { id: 'qarebuttals', label: 'Q&A Rebuttals', render: renderQaRebuttals }
    ]
  },
  plansbenefit: {
    label: 'Plans & Benefits',
    subs: [
      { id: 'plans', label: 'Plan Vault', render: renderPlans },
      { id: 'compare', label: 'Compare', render: renderCompare },
      { id: 'benefits', label: 'Benefits', render: renderBenefits }
    ]
  },
  callplaybook: {
    label: 'Call Playbook',
    subs: [
      { id: 'callflow', label: 'Call Flow', render: renderCallFlow },
      { id: 'closes', label: 'Closes', render: renderCloses },
      { id: 'scripts', label: 'Scripts', render: renderScripts },
      {
        id: 'planscripts',
        label: 'ALL Plan Scripts',
        render: renderPlanScripts
      }
    ]
  },
  aitools: {
    label: 'AI Tools',
    subs: [
      {
        id: 'psychprofile',
        label: 'Client Profiler',
        render: renderPsychprofile
      },
      {
        id: 'complianceai',
        label: 'Compliance AI',
        render: renderComplianceai
      },
      { id: 'coachingai', label: 'Call Coach', render: renderCoachingai }
    ]
  },
  training: {
    label: 'Training',
    subs: [
      { id: 'traininghome', label: 'Training', render: renderTrainingHome }
    ]
  },
  reference: {
    label: 'Network Guide',
    subs: [
      {
        id: 'networkexplainer',
        label: 'Network Guide',
        render: renderNetworkexplainer
      }
    ]
  },
  compliance: {
    label: 'Compliance Hub',
    subs: [
      {
        id: 'compliancecenter',
        label: 'Compliance Center',
        render: renderComplianceCenter
      },
      {
        id: 'calldisclosures',
        label: 'Call Disclosures',
        render: renderCallDisclosures
      },
      {
        id: 'complianceflags',
        label: 'Red Flags',
        render: renderComplianceFlags
      },
      { id: 'callaudit', label: 'Call Audit', render: renderCallAudit }
    ]
  },
  myspace: {
    label: 'My Space',
    subs: [
      { id: 'mindset', label: 'Mindset', render: renderMindset },
      { id: 'notes', label: 'Notes', render: renderNotes }
    ]
  }
};

var SUB_TO_PARENT = {};
Object.keys(PAGE_CONFIG).forEach(function (parentId) {
  PAGE_CONFIG[parentId].subs.forEach(function (sub) {
    SUB_TO_PARENT[sub.id] = parentId;
  });
});

function showPage(id) {
  var searchOverlay = document.getElementById('srOverlay');
  if (searchOverlay && searchOverlay.classList.contains('show')) closeSearch();
  // Safety: if target page doesn't exist yet, defer
  var target = document.getElementById('page-' + id);
  if (!target) {
    if (!window._spRetry) window._spRetry = 0;
    if (window._spRetry++ < 20) {
      setTimeout(function () {
        showPage(id);
      }, 100);
    }
    return;
  }
  window._spRetry = 0;
  if (PAGE_CONFIG[id]) {
    _showComboPage(id, PAGE_CONFIG[id].subs[0].id);
    return;
  }
  if (SUB_TO_PARENT[id]) {
    _showComboPage(SUB_TO_PARENT[id], id);
    return;
  }
  document.querySelectorAll('.page, .combo-page').forEach(function (p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('.nb').forEach(function (b) {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  var pg = document.getElementById('page-' + id);
  if (pg) pg.classList.add('active');
  var btn = document.querySelector('.nb[onclick="showPage(\'' + id + '\')"]');
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'page');
  }
  var renderMap = {
    objections: renderObjections,
    policydocs: renderPolicydocs,
    dashboard: renderDashboard
  };
  if (renderMap[id]) renderMap[id]();
}

function renderDashboard() {
  var pg = document.getElementById('page-dashboard');
  if (!pg || pg.innerHTML.trim()) return;
  var ic = function(d) { return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var cards = [
    { page:'liveassist', title:'Live Assist', desc:'Objections, closes, and scripts for active calls', icon: ic('<path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2z"/>') },
    { page:'plansbenefit', title:'Plans & Benefits', desc:'Every plan, benefit details, and comparisons', icon: ic('<rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/><path d="M8 10h8M8 14h5"/>') },
    { page:'callplaybook', title:'Call Playbook', desc:'Call flow, closing techniques, and scripts', icon: ic('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>') },
    { page:'compliance', title:'Compliance Hub', desc:'Disclosures, red flags, and audit tools', icon: ic('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>') },
    { page:'policydocs', title:'Policy Reference', desc:'Full SOB lookup for every plan', icon: ic('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>') },
    { page:'training', title:'Training', desc:'Roleplay, discovery, closing lab, and cheat sheets', icon: ic('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>') }
  ];
  var html = '<div class="ph"><div class="pt">Command <span>Center</span></div><div class="pd">Your starting point. Tap any section to jump in.</div></div>';
  html += '<div class="dash-grid">';
  cards.forEach(function(c) {
    html += '<div class="dash-card" onclick="showPage(\'' + c.page + '\')">';
    html += '<div class="dash-icon">' + c.icon + '</div>';
    html += '<div class="dash-title">' + c.title + '</div>';
    html += '<div class="dash-desc">' + c.desc + '</div>';
    html += '</div>';
  });
  html += '</div>';
  // Agent quick reference strip
  html += '<div class="dash-ref-strip">';
  html += '<div class="dash-ref-card"><div class="dash-ref-title">Say Every Call</div><div class="dash-ref-text">Disclose plan type &middot; Pre-ex exclusion &middot; Waiting periods &middot; Fixed benefit amounts &middot; NOT ACA major medical</div></div>';
  html += '<div class="dash-ref-card"><div class="dash-ref-title">Pre-Existing Rule</div><div class="dash-ref-text">12/12 — conditions diagnosed or treated in prior 12 months excluded for first 12 months of coverage</div></div>';
  html += '<div class="dash-ref-card"><div class="dash-ref-title">Network</div><div class="dash-ref-text">Always confirm provider is IN NETWORK before the call ends. First Health network on most plans.</div></div>';
  html += '</div>';
  pg.innerHTML = html;
}

function _showComboPage(parentId, subId) {
  document.querySelectorAll('.page, .combo-page').forEach(function (p) {
    p.classList.remove('active');
    if (p.classList.contains('page')) p.style.display = '';
  });
  var comboPage = document.getElementById('page-' + parentId);
  if (comboPage) comboPage.classList.add('active');
  document.querySelectorAll('.nb').forEach(function (b) {
    b.classList.remove('active');
  });
  var btn = document.querySelector(
    '.nb[onclick="showPage(\'' + parentId + '\')"]'
  );
  if (btn) btn.classList.add('active');
  renderSubTabs(parentId, subId);
  var subs = PAGE_CONFIG[parentId].subs;
  subs.forEach(function (s) {
    var inner = document.getElementById('page-' + s.id);
    if (inner) inner.style.display = s.id === subId ? 'block' : 'none';
  });
  for (var i = 0; i < subs.length; i++) {
    if (subs[i].id === subId) {
      if (subs[i].render) subs[i].render();
      break;
    }
  }
}

function renderSubTabs(parentId, activeSubId) {
  var container = document.getElementById('subtabs-' + parentId);
  if (!container) return;
  var config = PAGE_CONFIG[parentId];
  if (!config || config.subs.length <= 1) {
    container.innerHTML = '';
    return;
  }
  var html = '<div class="page-subtabs-inner">';
  config.subs.forEach(function (sub) {
    var isActive = sub.id === activeSubId ? ' active' : '';
    html +=
      '<button class="stab' +
      isActive +
      '" onclick="_showComboPage(\'' +
      parentId +
      "','" +
      sub.id +
      '\')">' +
      sub.label +
      '</button>';
  });
  html += '</div>';
  container.innerHTML = html;
}

// ── INIT ──────────────────────────────────────────────
function initApp() {
  showPage('dashboard');
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ── Click-Outside-to-Close System ──────────────────────────
   Reusable: add entries to CLOSEABLE to handle future components.
   Each entry: { el, isOpen, close, ignore }
     el      — selector string for the panel/overlay
     isOpen  — function returning true when the component is visible
     close   — function that closes the component
     ignore  — array of selectors whose clicks should NOT close it
*/
(function () {
  var CLOSEABLE = [
    {
      el: '.sidebar',
      isOpen: function (e) {
        return e.classList.contains('open');
      },
      close: function (e) {
        e.classList.remove('open');
      },
      ignore: ['#mobMenu']
    },
    {
      el: '#srOverlay',
      isOpen: function (e) {
        return e.classList.contains('show');
      },
      close: function () {
        if (typeof closeSearch === 'function') closeSearch();
      },
      ignore: ['.sw', '#scBtn']
    },
    {
      el: '#br-panel',
      isOpen: function (e) {
        return e.classList.contains('open');
      },
      close: function () {
        brOpen = false;
        document.getElementById('br-panel').classList.remove('open');
        document.getElementById('br-toggle').classList.remove('open');
      },
      ignore: ['#br-toggle']
    },
    {
      el: '#liveResult',
      isOpen: function (e) {
        return e.classList.contains('show');
      },
      close: function (e) {
        e.classList.remove('show');
      },
      ignore: []
    }
  ];

  document.addEventListener('click', function (event) {
    CLOSEABLE.forEach(function (cfg) {
      var panel = document.querySelector(cfg.el);
      if (!panel || !cfg.isOpen(panel)) return;

      // Click is inside the panel — do nothing
      if (panel.contains(event.target)) return;

      // Click is on a trigger/ignore element — do nothing
      var ignored = false;
      cfg.ignore.forEach(function (sel) {
        var ig = document.querySelector(sel);
        if (ig && ig.contains(event.target)) ignored = true;
      });
      if (ignored) return;

      // Click is outside — close it
      cfg.close(panel);
    });
  });
})();

// ── Keyboard Shortcut: Ctrl+K → focus search ────────
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    var gs = document.getElementById('gs');
    if (gs) gs.focus();
  }
  if (e.key === 'Escape') {
    var srOverlay = document.getElementById('srOverlay');
    if (srOverlay && srOverlay.classList.contains('show') && typeof closeSearch === 'function') closeSearch();
  }
});

// ── Copy Compliance Text ─────────────────────────────
function copyCompliance(btn) {
  var banner = btn.closest('.comp-banner');
  if (!banner) return;
  var text = banner.textContent.replace('Copy', '').replace('Copied!', '').trim();
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
  });
}

// ── Auto-inject copy buttons into compliance banners ──
(function() {
  var observer = new MutationObserver(function() {
    document.querySelectorAll('.comp-banner').forEach(function(banner) {
      if (banner.querySelector('.comp-copy-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'comp-copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('onclick', 'copyCompliance(this)');
      banner.appendChild(btn);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

// ── Service Worker ───────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
