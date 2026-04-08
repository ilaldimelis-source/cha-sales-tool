// app.js — Navigation, routing, PAGE_CONFIG, initApp

// ══════════════════════════════════════════════════════
// CRASH PROTECTION
// ══════════════════════════════════════════════════════
window._chaAppStarted = false;
window._chaErrors = [];

window.onerror = function (msg, src, line) {
  window._chaErrors.push({
    msg: msg,
    src: src,
    line: line,
    time: new Date().toISOString()
  });
  console.error('[CHA] JS Error:', msg, 'in', src, 'line', line);
  if (!window._chaAppStarted) {
    document.body.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#f8fafc;font-family:sans-serif;gap:16px;">' +
      '<img src="logo.png" style="width:60px;height:60px;border-radius:50%;" />' +
      '<div style="font-size:18px;font-weight:600;color:#1e293b;">CHA Command Center</div>' +
      '<div style="font-size:13px;color:#ef4444;background:#fef2f2;padding:10px 16px;border-radius:8px;border:1px solid #fecaca;">A script error occurred. Please refresh the page.</div>' +
      '<button onclick="location.reload()" style="padding:10px 24px;background:#5175f1;color:white;border:none;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;">Refresh Now</button>' +
      '<div style="font-size:11px;color:#94a3b8;">Error: ' +
      msg +
      '</div></div>';
  }
  return false;
};
window.onunhandledrejection = function (event) {
  console.error('[CHA] Unhandled Promise:', event.reason);
};

// ══════════════════════════════════════════════════════
// SAFE LOCALSTORAGE WRAPPER (incognito / quota guard)
// ══════════════════════════════════════════════════════
function safeGetItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function safeSetItem(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch (_e) {
    /* ignore storage errors */
  }
}

// ══════════════════════════════════════════════════════
// FONT SIZE TOGGLE (S / M / L)
// ══════════════════════════════════════════════════════
function setFontSize(size) {
  var b = document.body;
  b.classList.remove('font-s', 'font-m', 'font-l');
  b.classList.add('font-' + size);
  // Also set on html for CSS var fallback
  var html = document.documentElement;
  html.classList.remove('font-s', 'font-m', 'font-l');
  html.classList.add('font-' + size);
  safeSetItem('cha_font_size', size);
  var btns = document.querySelectorAll('.font-toggle-btn');
  btns.forEach(function (btn) {
    btn.classList.toggle(
      'active',
      btn.textContent.trim().toLowerCase() === size
    );
  });
}
function _initFontSize() {
  var saved = safeGetItem('cha_font_size') || 'm';
  setFontSize(saved);
}

// ══════════════════════════════════════════════════════
// CLIPBOARD FALLBACK (Safari / older browsers)
// ══════════════════════════════════════════════════════
function safeCopy(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback: textarea + execCommand
  return new Promise(function (resolve) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    resolve();
  });
}

// ══════════════════════════════════════════════════════
// LOCALSTORAGE PREFIX MIGRATION (scc_ → cha_)
// ══════════════════════════════════════════════════════
(function _migrateLsKeys() {
  try {
    var migrations = [
      ['scc_notes', 'cha_notes'],
      ['scc_scripts', 'cha_scripts']
    ];
    migrations.forEach(function (pair) {
      var old = localStorage.getItem(pair[0]);
      if (old !== null && localStorage.getItem(pair[1]) === null) {
        localStorage.setItem(pair[1], old);
        localStorage.removeItem(pair[0]);
      } else if (old !== null) {
        localStorage.removeItem(pair[0]);
      }
    });
  } catch (_e) {
    /* ignore migration errors */
  }
})();

// ══════════════════════════════════════════════════════
// PAGE CONSOLIDATION CONFIG & NAVIGATION
// ══════════════════════════════════════════════════════

var PAGE_CONFIG = {
  livecall: {
    label: 'Live Call',
    subs: [
      { id: 'live', label: 'Live Assist', render: renderLive },
      { id: 'objections', label: 'Objections', render: renderObjections },
      { id: 'qarebuttals', label: 'Q&A Rebuttals', render: renderQaRebuttals },
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
  plans: {
    label: 'Plans',
    subs: [
      { id: 'policydocs', label: 'Plans', render: renderPolicydocs },
      { id: 'compare', label: 'Compare', render: renderCompare },
      { id: 'benefits', label: 'Benefits', render: renderBenefits }
    ]
  },
  scripts: {
    label: 'Scripts',
    subs: [
      { id: 'planscripts', label: 'Plan Scripts', render: renderPlanScripts },
      { id: 'allscripts', label: 'All Scripts', render: renderScripts },
      { id: 'closes', label: 'Closing Lines', render: renderCloses },
      { id: 'callflow', label: 'Call Flow', render: renderCallFlow },
      { id: 'recovery', label: 'Recovery', render: renderRecovery }
    ]
  },
  networkguide: {
    label: 'Network Guide',
    subs: [
      {
        id: 'networkexplainer',
        label: 'Network Guide',
        render: renderNetworkexplainer
      }
    ]
  },
  training: {
    label: 'Training',
    subs: [
      { id: 'traininghome', label: 'Training', render: renderTrainingHome }
    ]
  },
  compliance: {
    label: 'Compliance',
    subs: [
      {
        id: 'compliancecenter',
        label: 'Compliance Center',
        render: renderComplianceCenter
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

function trackRecentPage(id) {
  try {
    var recent = JSON.parse(safeGetItem('cha_recent') || '[]');
    recent = recent.filter(function (r) {
      return r !== id;
    });
    recent.unshift(id);
    if (recent.length > 4) recent = recent.slice(0, 4);
    safeSetItem('cha_recent', JSON.stringify(recent));
  } catch (_e) {
    /* ignore storage errors */
  }
}
function getRecentPages() {
  try {
    return JSON.parse(safeGetItem('cha_recent') || '[]');
  } catch (e) {
    return [];
  }
}

function showPage(id) {
  var searchOverlay = document.getElementById('srOverlay');
  if (searchOverlay && searchOverlay.classList.contains('show')) closeSearch();
  if (id !== 'dashboard') trackRecentPage(id);
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
    dashboard: renderDashboard
  };
  if (renderMap[id]) {
    try {
      renderMap[id]();
    } catch (e) {
      var errPg = document.getElementById('page-' + id);
      if (errPg)
        errPg.innerHTML =
          '<div style="padding:24px;color:#B91C1C;">Something went wrong. Please try again.</div>';
    }
  }
}

function renderDashboard() {
  var pg = document.getElementById('page-dashboard');
  if (!pg || pg.innerHTML.trim()) return;
  var ic = function (d) {
    return (
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      d +
      '</svg>'
    );
  };

  // ── GREETING CARD (Task 1) ──────────────────────────────────────────────
  var _greetHtml = '';
  try {
    var _u = window.CHA_USER;
    if (_u) {
      var _h = new Date().getHours();
      var _greet = _h < 12 ? 'Good morning' : _h < 17 ? 'Good afternoon' : 'Good evening';
      var _fname = _u.name || 'Agent';
      var _role = _u.role || 'agent';
      var _isM = _role === 'manager';
      var _today = new Date();
      var _days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var _months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var _dateStr = _days[_today.getDay()] + ', ' + _months[_today.getMonth()] + ' ' + _today.getDate() + ', ' + _today.getFullYear();
      _greetHtml =
        '<div style="background:linear-gradient(135deg,#1e293b 0%,#243b55 100%);border-radius:16px;padding:20px 24px;margin-bottom:16px;color:#fff;">' +
          '<div style="font-size:22px;font-weight:800;margin-bottom:4px;">' + _greet + ', ' + escHTML(_fname) + '</div>' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' +
            '<span style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.04em;' +
            (_isM ? 'background:#166534;color:#4ade80;' : 'background:#1e3a5f;color:#93c5fd;') + '">' +
            (_isM ? '★ Manager' : 'Agent') + '</span>' +
          '</div>' +
          '<div style="font-size:13px;color:#94a3b8;">' + _dateStr + '</div>' +
        '</div>';
    }
  } catch (_ge) { /* skip greeting gracefully */ }

  // ── SMART DASHBOARD WIDGETS (Task 4) ────────────────────────────────────
  var _widgetHtml = '';
  try {
    // Plan of the Day
    _widgetHtml +=
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-bottom:16px;">';
    _widgetHtml +=
      '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:16px 18px;">' +
        '<div style="font-size:11px;font-weight:700;color:#166534;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;">Plan of the Day</div>' +
        '<div style="font-size:17px;font-weight:800;color:#1e293b;margin-bottom:4px;">MedFirst 3</div>' +
        '<div style="font-size:12px;color:#374151;line-height:1.5;">Best value MEC for healthy self-employed adults — lead with this today.</div>' +
      '</div>';

    // Enrollment Goal Counter
    var _goalToday = new Date().toISOString().slice(0, 10);
    var _goalKey = 'cha_goal_' + _goalToday;
    var _goalCount = parseInt(safeGetItem(_goalKey), 10) || 0;
    _widgetHtml +=
      '<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;padding:16px 18px;">' +
        '<div style="font-size:11px;font-weight:700;color:#1e40af;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;">Today\'s Enrollments</div>' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<span id="cha-goal-count" style="font-size:32px;font-weight:900;color:#1e293b;">' + _goalCount + '</span>' +
          '<button onclick="chaIncrementGoal()" style="width:36px;height:36px;border-radius:999px;border:2px solid #3b82f6;background:#fff;color:#3b82f6;font-size:20px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;" title="Add enrollment">+</button>' +
        '</div>' +
        '<div style="font-size:11px;color:#64748b;margin-top:4px;">Tap + after each enrollment</div>' +
      '</div>';

    _widgetHtml += '</div>';
  } catch (_we) { /* skip widgets gracefully */ }

  var cards = [
    {
      page: 'livecall',
      title: 'Live Call',
      desc: 'Mid-call tools, objections, and AI assist',
      icon: ic('<path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2z"/>')
    },
    {
      page: 'plans',
      title: 'Plans',
      desc: 'Every plan, sell it view and full details',
      icon: ic(
        '<rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/><path d="M8 10h8M8 14h5"/>'
      )
    },
    {
      page: 'scripts',
      title: 'Scripts',
      desc: 'Every script for every situation',
      icon: ic(
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
      )
    },
    {
      page: 'networkguide',
      title: 'Network Guide',
      desc: 'Provider networks, lookup tools, and coverage rules',
      icon: ic(
        '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
      )
    },
    {
      page: 'training',
      title: 'Training',
      desc: 'Learn, study, and practice',
      icon: ic(
        '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'
      )
    },
    {
      page: 'compliance',
      title: 'Compliance',
      desc: 'Disclosures, audit, and compliance rules',
      icon: ic(
        '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'
      )
    },
    {
      page: 'myspace',
      title: 'My Space',
      desc: 'Notes and saved favorites',
      icon: ic('<path d="M2 20h20M4 20L2 8l6 5 4-7 4 7 6-5-2 12H4z"/>')
    }
  ];
  var html =
    '<div class="ph"><div class="pt">Command <span>Center</span></div><div class="pd">Your starting point. Tap any section to jump in.</div></div>';
  html += _greetHtml;
  html += _widgetHtml;
  html += '<div class="dash-grid">';
  cards.forEach(function (c) {
    html += '<div class="dash-card" onclick="showPage(\'' + c.page + '\')">';
    html += '<div class="dash-icon">' + c.icon + '</div>';
    html += '<div class="dash-title">' + c.title + '</div>';
    html += '<div class="dash-desc">' + c.desc + '</div>';
    html += '</div>';
  });
  html += '</div>';
  // Cheat Sheets full-width card
  html +=
    '<div class="dash-card dash-card-full" onclick="showPage(\'training\');setTimeout(function(){openTrainingSection(\'cheatsheets\');},50)" style="margin-top:12px;border-left:3px solid #5B8DEF;display:flex;align-items:center;gap:16px;">';
  html +=
    '<div class="dash-icon">' +
    ic(
      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h5M8 15h6"/>'
    ) +
    '</div>';
  html += '<div><div class="dash-title">Cheat Sheets</div>';
  html +=
    '<div class="dash-desc">Plan names, networks, underwriters, and associations at a glance</div></div>';
  html += '</div>';
  // Recently visited strip
  var recent = getRecentPages();
  if (recent.length) {
    var labelMap = {};
    Object.keys(PAGE_CONFIG).forEach(function (pid) {
      labelMap[pid] = PAGE_CONFIG[pid].label;
      PAGE_CONFIG[pid].subs.forEach(function (s) {
        labelMap[s.id] = s.label;
      });
    });
    labelMap.dashboard = 'Dashboard';
    html +=
      '<div class="dash-recent-strip"><div class="dash-recent-label">Recently Visited</div><div class="dash-recent-pills">';
    recent.forEach(function (rid) {
      var lbl = labelMap[rid] || rid;
      html +=
        '<button class="dash-recent-pill" onclick="showPage(\'' +
        rid +
        '\')">' +
        lbl +
        '</button>';
    });
    html += '</div></div>';
  }
  // Agent quick reference strip
  html += '<div class="dash-ref-strip">';
  html +=
    '<div class="dash-ref-card"><div class="dash-ref-title">Say Every Call</div><div class="dash-ref-text">Disclose plan type &middot; Pre-ex exclusion &middot; Waiting periods &middot; Fixed benefit amounts &middot; NOT ACA major medical</div></div>';
  html +=
    '<div class="dash-ref-card"><div class="dash-ref-title">Pre-Existing Rule</div><div class="dash-ref-text">12/12 — conditions diagnosed or treated in prior 12 months excluded for first 12 months of coverage</div></div>';
  html +=
    '<div class="dash-ref-card"><div class="dash-ref-title">Network</div><div class="dash-ref-text">Always confirm provider is IN NETWORK before the call ends. First Health network on most plans.</div></div>';
  html += '</div>';
  // Keyboard shortcut hint
  html +=
    '<div class="dash-kb-strip"><div class="dash-kb-title">Keyboard Shortcuts</div><div class="dash-kb-list">';
  html += '<span class="dash-kb"><kbd>1</kbd> Home</span>';
  html += '<span class="dash-kb"><kbd>2</kbd> Live Call</span>';
  html += '<span class="dash-kb"><kbd>3</kbd> Plans</span>';
  html += '<span class="dash-kb"><kbd>4</kbd> Scripts</span>';
  html += '<span class="dash-kb"><kbd>5</kbd> Network</span>';
  html += '<span class="dash-kb"><kbd>6</kbd> Training</span>';
  html += '<span class="dash-kb"><kbd>7</kbd> Compliance</span>';
  html += '<span class="dash-kb"><kbd>8</kbd> My Space</span>';
  html += '<span class="dash-kb"><kbd>Ctrl+K</kbd> Search</span>';
  html += '<span class="dash-kb"><kbd>Ctrl+B</kbd> Benefits</span>';
  html += '<span class="dash-kb"><kbd>Esc</kbd> Close</span>';
  html += '</div></div>';
  pg.innerHTML = html;
}

// ── Enrollment goal increment (Task 4) ──
function chaIncrementGoal() {
  var _d = new Date().toISOString().slice(0, 10);
  var _k = 'cha_goal_' + _d;
  var _c = (parseInt(safeGetItem(_k), 10) || 0) + 1;
  safeSetItem(_k, String(_c));
  var _el = document.getElementById('cha-goal-count');
  if (_el) _el.textContent = _c;
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
    b.removeAttribute('aria-current');
  });
  var btn = document.querySelector(
    '.nb[onclick="showPage(\'' + parentId + '\')"]'
  );
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'page');
  }
  renderSubTabs(parentId, subId);
  var subs = PAGE_CONFIG[parentId].subs;
  subs.forEach(function (s) {
    var inner = document.getElementById('page-' + s.id);
    if (inner) inner.style.display = s.id === subId ? 'block' : 'none';
  });
  for (var i = 0; i < subs.length; i++) {
    if (subs[i].id === subId) {
      if (subs[i].render) {
        try {
          subs[i].render();
        } catch (e) {
          // Log error for debugging, show helpful recovery message
          if (typeof console !== 'undefined')
            console.error('Tab render error [' + subId + ']:', e);
          var errPage = document.getElementById('page-' + subId);
          if (errPage)
            errPage.innerHTML =
              '<div style="padding:24px;text-align:center;">' +
              '<div style="color:#B91C1C;font-weight:700;margin-bottom:8px;">This tab failed to load.</div>' +
              '<div style="color:var(--text-secondary);font-size:13px;margin-bottom:12px;">Try refreshing with Ctrl+Shift+R to clear the cache.</div>' +
              '<button onclick="location.reload(true)" style="padding:8px 20px;border-radius:8px;background:var(--accent);color:#fff;border:none;font-family:var(--font-ui);font-weight:600;cursor:pointer;">Refresh Now</button>' +
              '</div>';
        }
      }
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

// ══════════════════════════════════════════════════════
// STICKY PLAN CONTEXT
// ══════════════════════════════════════════════════════
window.activePlan = null;

function setActivePlan(planId, planName, planType) {
  window.activePlan = {
    id: planId,
    name: planName,
    type: (planType || '').toLowerCase()
  };
  _renderPlanPill();
}

function clearActivePlan() {
  window.activePlan = null;
  var pill = document.getElementById('plan-pill');
  if (pill) pill.remove();
}

function _renderPlanPill() {
  var existing = document.getElementById('plan-pill');
  if (existing) existing.remove();
  if (!window.activePlan) return;
  var p = window.activePlan;
  var typeClass =
    p.type === 'mec' ? 'mec' : p.type === 'stm' ? 'stm' : 'limited';
  var pill = document.createElement('span');
  pill.id = 'plan-pill';
  pill.className = 'plan-pill';
  pill.innerHTML =
    '<span class="plan-pill-type ' +
    typeClass +
    '">' +
    escHTML(p.type.toUpperCase()) +
    '</span>' +
    escHTML(p.name) +
    '<button class="plan-pill-x" onclick="clearActivePlan()" title="Clear plan">&times;</button>';
  var topbar = document.querySelector('.topbar');
  var livebadge = topbar ? topbar.querySelector('.livebadge') : null;
  if (livebadge) {
    topbar.insertBefore(pill, livebadge);
  } else if (topbar) {
    topbar.appendChild(pill);
  }
}

// ══════════════════════════════════════════════════════
// FAVORITES SYSTEM
// ══════════════════════════════════════════════════════
function getFavorites() {
  try {
    return JSON.parse(safeGetItem('cha_favorites') || '[]');
  } catch (e) {
    return [];
  }
}

function isFavorite(type, id) {
  return getFavorites().some(function (f) {
    return f.type === type && f.id === id;
  });
}

function toggleFavorite(type, id, title, preview, source) {
  var favs = getFavorites();
  var idx = -1;
  for (var i = 0; i < favs.length; i++) {
    if (favs[i].type === type && favs[i].id === id) {
      idx = i;
      break;
    }
  }
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.unshift({
      type: type,
      id: id,
      title: title,
      preview: (preview || '').substring(0, 120),
      source: source || ''
    });
    if (favs.length > 50) favs = favs.slice(0, 50);
  }
  safeSetItem('cha_favorites', JSON.stringify(favs));
  // Update star state
  document
    .querySelectorAll(
      '.fav-star[data-fav-type="' + type + '"][data-fav-id="' + id + '"]'
    )
    .forEach(function (star) {
      star.classList.toggle('active', isFavorite(type, id));
    });
}

function favStarHTML(type, id, title, preview, source) {
  var active = isFavorite(type, id) ? ' active' : '';
  return (
    '<button class="fav-star' +
    active +
    '" data-fav-type="' +
    escHTML(type) +
    '" data-fav-id="' +
    escHTML(id) +
    '" onclick="toggleFavorite(\'' +
    escHTML(type) +
    "','" +
    escHTML(id) +
    "','" +
    escHTML((title || '').replace(/'/g, '&#39;')) +
    "','" +
    escHTML((preview || '').replace(/'/g, '&#39;').substring(0, 120)) +
    "','" +
    escHTML((source || '').replace(/'/g, '&#39;')) +
    '\')" title="Toggle favorite">' +
    '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fav-empty"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
    '<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fav-filled"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
    '</button>'
  );
}

// ══════════════════════════════════════════════════════
// ONBOARDING TOUR
// ══════════════════════════════════════════════════════
var _tourStep = 0;
var TOUR_STEPS = [
  {
    target: '.sidebar',
    title: 'Navigation Sidebar',
    desc: 'All your tools in one place. Tap any section to jump straight to it.',
    pos: 'right'
  },
  {
    target: '.sw',
    title: 'Smart Search',
    desc: 'Search plans, objections, benefits, and closes instantly. Press / or Ctrl+K to open.',
    pos: 'bottom'
  },
  {
    target: '#br-toggle',
    title: 'Benefits Chat',
    desc: 'Mid-call AI lookup. Ask any coverage question and get instant answers from plan data.',
    pos: 'left'
  },
  {
    target: '#page-dashboard',
    title: 'Command Center',
    desc: 'Your home base. Quick links, cheat sheets, and keyboard shortcuts all in one view.',
    pos: 'top'
  }
];

function startTour() {
  _tourStep = 0;
  _showTourStep();
}

function _showTourStep() {
  // Remove previous
  var old = document.getElementById('tour-overlay');
  if (old) old.remove();
  var oldTip = document.getElementById('tour-tooltip');
  if (oldTip) oldTip.remove();

  if (_tourStep >= TOUR_STEPS.length) {
    safeSetItem('cha_tour_done', '1');
    return;
  }

  var step = TOUR_STEPS[_tourStep];
  var el = document.querySelector(step.target);
  if (!el) {
    _tourStep++;
    _showTourStep();
    return;
  }

  var rect = el.getBoundingClientRect();

  // Overlay
  var ov = document.createElement('div');
  ov.id = 'tour-overlay';
  ov.className = 'tour-overlay';
  ov.onclick = function () {
    _endTour();
  };
  document.body.appendChild(ov);

  // Spotlight
  var spot = document.createElement('div');
  spot.className = 'tour-spotlight';
  spot.style.top = rect.top - 6 + 'px';
  spot.style.left = rect.left - 6 + 'px';
  spot.style.width = rect.width + 12 + 'px';
  spot.style.height = rect.height + 12 + 'px';
  ov.appendChild(spot);

  // Tooltip
  var tip = document.createElement('div');
  tip.id = 'tour-tooltip';
  tip.className = 'tour-tooltip';
  var isLast = _tourStep === TOUR_STEPS.length - 1;
  tip.innerHTML =
    '<div class="tour-step-count">Step ' +
    (_tourStep + 1) +
    ' of ' +
    TOUR_STEPS.length +
    '</div>' +
    '<div class="tour-title">' +
    step.title +
    '</div>' +
    '<div class="tour-desc">' +
    step.desc +
    '</div>' +
    '<div class="tour-btns">' +
    '<button class="tour-btn-skip" onclick="_endTour()">Skip</button>' +
    '<button class="tour-btn-next" onclick="_nextTourStep()">' +
    (isLast ? 'Done' : 'Next') +
    '</button>' +
    '</div>';

  // Position tooltip
  var top, left;
  if (step.pos === 'right') {
    top = rect.top;
    left = rect.right + 16;
  } else if (step.pos === 'bottom') {
    top = rect.bottom + 12;
    left = rect.left;
  } else if (step.pos === 'left') {
    top = rect.top;
    left = rect.left - 336;
  } else {
    top = rect.bottom + 12;
    left = rect.left;
  }
  // Clamp to viewport
  if (left < 16) left = 16;
  if (left + 320 > window.innerWidth) left = window.innerWidth - 336;
  if (top < 16) top = 16;
  tip.style.top = top + 'px';
  tip.style.left = left + 'px';
  document.body.appendChild(tip);
}

function _nextTourStep() {
  _tourStep++;
  _showTourStep();
}

function _endTour() {
  safeSetItem('cha_tour_done', '1');
  var ov = document.getElementById('tour-overlay');
  if (ov) ov.remove();
  var tip = document.getElementById('tour-tooltip');
  if (tip) tip.remove();
}

// ── COLLAPSIBLE SIDEBAR ──────────────────────────────
function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('sidebar-collapsed');
  var collapsed = sidebar.classList.contains('sidebar-collapsed');
  safeSetItem('cha-sidebar-collapsed', collapsed ? '1' : '0');
}

function _initSidebar() {
  var saved = safeGetItem('cha-sidebar-collapsed');
  if (saved === '1') {
    var sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.add('sidebar-collapsed');
  }
}

// ── BENEFITS SIDEBAR HELPERS ─────────────────────────
function _toggleBenefitsSidebar() {
  if (typeof brOpen !== 'undefined') {
    brOpen = !brOpen;
  }
  var panel = document.getElementById('br-panel');
  var toggle = document.getElementById('br-toggle');
  if (panel) panel.classList.toggle('open');
  if (toggle) toggle.classList.toggle('open');
  document.body.classList.toggle('br-open');
  if (panel && panel.classList.contains('open')) {
    var input = document.getElementById('br-input');
    if (input) input.focus();
  }
}

function _closeBenefitsSidebar() {
  if (typeof brOpen !== 'undefined') {
    brOpen = false;
  }
  var panel = document.getElementById('br-panel');
  var toggle = document.getElementById('br-toggle');
  if (panel) panel.classList.remove('open');
  if (toggle) toggle.classList.remove('open');
  document.body.classList.remove('br-open');
}

// ── INIT ──────────────────────────────────────────────
function initApp() {
  _initFontSize();
  _initSidebar();
  showPage('dashboard');
  // Start onboarding tour for first-time users
  if (!safeGetItem('cha_tour_done')) {
    setTimeout(startTour, 600);
  }
  // Inject floating quick-action bar
  if (!document.getElementById('fab-bar')) {
    var fab = document.createElement('div');
    fab.id = 'fab-bar';
    fab.className = 'fab-bar';
    fab.innerHTML =
      '<button class="fab-btn" onclick="showPage(\'dashboard\')" title="Home"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></button>' +
      '<button class="fab-btn" onclick="showPage(\'livecall\')" title="Live Call"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2z"/></svg></button>' +
      '<button class="fab-btn" onclick="showPage(\'scripts\')" title="Scripts"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></button>' +
      '<button class="fab-btn" onclick="showPage(\'plans\')" title="Plans"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><rect x="3" y="6" width="18" height="16" rx="2"/><path d="M8 10h8M8 14h5"/></svg></button>';
    document.body.appendChild(fab);
  }
}
function _safeInitApp() {
  try {
    initApp();
    window._chaAppStarted = true;
  } catch (e) {
    console.error('[CHA] initApp failed:', e);
    window.onerror(e.message, 'app.js', 0, 0, e);
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _safeInitApp);
} else {
  _safeInitApp();
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
        _closeBenefitsSidebar();
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

// ── Keyboard Shortcuts ────────────────────────────────
document.addEventListener('keydown', function (e) {
  // Ctrl+K — open search overlay
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (typeof openSearch === 'function') {
      openSearch();
    } else {
      var gs = document.getElementById('gs');
      if (gs) gs.focus();
    }
    return;
  }
  // Ctrl+B — toggle benefits sidebar
  if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
    e.preventDefault();
    _toggleBenefitsSidebar();
    return;
  }
  // Escape — close search AND benefits sidebar
  if (e.key === 'Escape') {
    var srOverlay = document.getElementById('srOverlay');
    if (
      srOverlay &&
      srOverlay.classList.contains('show') &&
      typeof closeSearch === 'function'
    )
      closeSearch();
    var brPanel = document.getElementById('br-panel');
    if (brPanel && brPanel.classList.contains('open')) {
      _closeBenefitsSidebar();
    }
    return;
  }
  // Skip shortcuts when typing in input/textarea
  var tag = (e.target.tagName || '').toLowerCase();
  if (
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    e.target.isContentEditable
  )
    return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  var key = e.key;
  // Number keys 1-8 for page navigation
  var numMap = {
    1: 'dashboard',
    2: 'livecall',
    3: 'plans',
    4: 'scripts',
    5: 'networkguide',
    6: 'training',
    7: 'compliance',
    8: 'myspace'
  };
  if (numMap[key]) {
    e.preventDefault();
    showPage(numMap[key]);
    return;
  }
  var letterKey = key.toLowerCase();
  var map = {
    h: 'dashboard',
    l: 'livecall',
    p: 'plans',
    s: 'scripts',
    n: 'networkguide',
    t: 'training',
    c: 'compliance',
    m: 'myspace'
  };
  if (map[letterKey]) {
    e.preventDefault();
    showPage(map[letterKey]);
    return;
  }
  if (letterKey === '/') {
    e.preventDefault();
    if (typeof openSearch === 'function') {
      openSearch();
    } else {
      var gs2 = document.getElementById('gs');
      if (gs2) gs2.focus();
    }
  }
});

// ── Copy Compliance Text ─────────────────────────────
function copyCompliance(btn) {
  var banner = btn.closest('.comp-banner');
  if (!banner) return;
  var text = banner.textContent
    .replace('Copy', '')
    .replace('Copied!', '')
    .trim();
  safeCopy(text).then(function () {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 1500);
  });
}

// ── Auto-inject copy buttons into compliance banners + script blocks ──
(function () {
  var observer = new MutationObserver(function () {
    document.querySelectorAll('.comp-banner').forEach(function (banner) {
      if (banner.querySelector('.comp-copy-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'comp-copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('onclick', 'copyCompliance(this)');
      banner.appendChild(btn);
    });
    // Inject copy pills into sbox script panels and comp-script-block
    document
      .querySelectorAll('.sbox, .comp-script-block')
      .forEach(function (block) {
        if (block.querySelector('.script-copy-btn')) return;
        var btn = document.createElement('button');
        btn.className = 'script-copy-btn';
        btn.textContent = 'Copy';
        btn.setAttribute('onclick', 'copyScript(this)');
        block.appendChild(btn);
      });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

// ── Service Worker — DISABLED to prevent stale cache issues ──
// SW was caching old JS files and preventing updates from reaching users.
// Uncomment to re-enable after cache issues are resolved.
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js');
// }
