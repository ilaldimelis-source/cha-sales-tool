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
      {
        id: 'productvault',
        label: 'Product Training Vault',
        render: renderProductvault
      },
      { id: 'process', label: 'Process', render: renderProcess },
      { id: 'simplifier', label: 'Terms', render: renderSimplifier },
      { id: 'redflags', label: 'Red Flags', render: renderRedflags },
      { id: 'roleplay', label: 'Roleplay', render: renderRoleplay },
      { id: 'discovery', label: 'Discovery', render: renderDiscovery },
      {
        id: 'closingengine',
        label: 'Closing Engine',
        render: renderClosingengine
      },
      { id: 'closinglab', label: 'Closing Lab', render: renderClosinglab },
      { id: 'cheatsheets', label: 'Cheat Sheets', render: renderCheatsheets }
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
    policydocs: renderPolicydocs
  };
  if (renderMap[id]) renderMap[id]();
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
  showPage('liveassist');
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

// ── Service Worker ───────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
