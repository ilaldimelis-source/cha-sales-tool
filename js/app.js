// app.js — Navigation, routing, PAGE_CONFIG, initApp

// ══════════════════════════════════════════════════════
// CRASH PROTECTION
// ══════════════════════════════════════════════════════
window._chaAppStarted = false;
window._chaErrors = [];

window.onerror = function (msg, src, line) {
  // #region agent log
  fetch('http://127.0.0.1:7347/ingest/4aa1827a-5cdd-4035-8984-1fb063ffa870',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb7e63'},body:JSON.stringify({sessionId:'fb7e63',runId:'audit-run-1',hypothesisId:'H1',location:'js/app.js:window.onerror',message:'Global JS error trapped',data:{msg:String(msg||''),src:String(src||''),line:Number(line||0)},timestamp:Date.now()})}).catch(function(){});
  // #endregion
  window._chaErrors.push({
    msg: msg,
    src: src,
    line: line,
    time: new Date().toISOString()
  });
  console.error('[CHA] JS Error:', msg, 'in', src, 'line', line);
  if (!window._chaAppStarted) {
    document.body.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:var(--cha-bg-muted);font-family:sans-serif;gap:16px;">' +
      '<img src="logo.png" style="width:60px;height:60px;border-radius:50%;" />' +
      '<div style="font-size:18px;font-weight:600;color:#1e293b;">CHA Command Center</div>' +
      '<div style="font-size:13px;color:var(--cha-danger-text);background:var(--cha-danger-bg);padding:10px 16px;border-radius:8px;border:1px solid #fecaca;">A script error occurred. Please refresh the page.</div>' +
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
// AUTO-POPULATE GROQ API KEY FROM /api/groq-key
// Fetches the shared office key from the Vercel serverless function
// on page load and saves it to localStorage — but only when nothing
// is already saved. This means:
//   • Agents who have entered their own personal key: untouched.
//   • Agents who have previously clicked "skip": untouched.
//   • Agents with no key at all: get the shared key automatically
//     so chat.js picks it up at runtime without ever prompting.
// Uses the safe wrappers above so incognito / quota errors don't crash.
// Cache-buster on the URL prevents the service worker's
// stale-while-revalidate path from caching the key response.
// ══════════════════════════════════════════════════════
// Groq key auto-populate runs from chaAfterAuthUserReady() in js/storage-utils.js
// after Clerk sets window.CHA_USER (scoped per user).

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
  if (typeof chaSet === 'function') {
    chaSet('cha_font_size', size);
  } else {
    safeSetItem('cha_font_size', size);
  }
  var btns = document.querySelectorAll('.font-toggle-btn');
  btns.forEach(function (btn) {
    var isActive = btn.textContent.trim().toLowerCase() === size;
    btn.classList.toggle('active', isActive);
    // P1 Task 7: a11y — mirror the visual active state on aria-pressed
    // so screen readers announce the current font size choice.
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}
function _initFontSize() {
  var saved =
    typeof chaGet === 'function'
      ? chaGet('cha_font_size', 'm')
      : safeGetItem('cha_font_size') || 'm';
  if (typeof saved !== 'string') saved = 'm';
  setFontSize(saved);
}

// ══════════════════════════════════════════════════════
// TOPBAR WELCOME GREETING
// Reads window.CHA_USER (set by js/auth.js after Clerk
// loads) and renders a minimal "Good morning, FirstName"
// chip inside the topbar (before S/M/L font controls).
// Idempotent.
// ══════════════════════════════════════════════════════
function _buildGreetingText() {
  var hr = new Date().getHours();
  var gr =
    hr < 12 ? 'Good Morning' : hr < 17 ? 'Good Afternoon' : 'Good Evening';
  var custom = '';
  try {
    custom = (
      (typeof chaGet === 'function'
        ? chaGet('preferredName', '') || chaGet('cha_display_name', '')
        : safeGetItem('preferredName') || safeGetItem('cha_display_name')) || ''
    ).trim();
  } catch (_e) {
    custom = '';
  }
  if (custom) return gr + ' ! ' + custom;
  var first = 'Agent';
  try {
    var u = window.CHA_USER;
    if (u) first = u.firstName || u.name || 'Agent';
  } catch (_e) {
    /* ignore */
  }
  return gr + ' ! ' + first;
}

function _refreshTopbarGreeting() {
  var el = document.getElementById('topbarWelcome');
  if (!el) return;
  // If the inline editor is open, leave it alone — don't clobber the input.
  if (el.querySelector && el.querySelector('input')) return;
  el.textContent = _buildGreetingText();
}

// P1 Task 6: Click-to-edit greeting in the topbar.
// Clicking the welcome chip swaps it for an inline <input> prefilled
// with the current custom name (from cha_display_name). Enter or blur
// saves via saveDisplayName() (defined in js/myspace.js), which already
// persists to localStorage and calls _refreshTopbarGreeting(). Escape
// cancels without saving.
function _openTopbarGreetingEditor() {
  var el = document.getElementById('topbarWelcome');
  if (!el) return;
  if (el.querySelector && el.querySelector('input')) return;

  var current = '';
  try {
    current = (
      (typeof chaGet === 'function'
        ? chaGet('preferredName', '') || chaGet('cha_display_name', '')
        : safeGetItem('preferredName') || safeGetItem('cha_display_name')) || ''
    ).trim();
  } catch (_e) {
    current = '';
  }

  var input = document.createElement('input');
  input.type = 'text';
  input.className = 'topbar-welcome-input';
  input.value = current;
  input.placeholder = 'Your name';
  input.setAttribute('aria-label', 'Edit display name');
  input.maxLength = 40;

  var committed = false;
  var commit = function () {
    if (committed) return;
    committed = true;
    var val = (input.value || '').trim();
    try {
      if (typeof saveDisplayName === 'function') {
        saveDisplayName(val);
      } else {
        if (typeof chaSet === 'function') {
          chaSet('preferredName', val);
          chaSet('cha_display_name', val);
        } else {
          safeSetItem('preferredName', val);
          safeSetItem('cha_display_name', val);
        }
      }
    } catch (_e) {
      /* ignore */
    }
    el.textContent = _buildGreetingText();
  };
  var cancel = function () {
    if (committed) return;
    committed = true;
    el.textContent = _buildGreetingText();
  };

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
      input.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  });
  input.addEventListener('blur', commit);

  el.textContent = '';
  el.appendChild(input);
  try {
    input.focus();
    input.select();
  } catch (_e) {
    /* ignore */
  }
}

function _initTopbarExtras() {
  try {
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;

    // Welcome greeting — insert just before the S/M/L font toggle.
    // Clicking the greeting opens an inline editor to change the display name.
    if (!document.getElementById('topbarWelcome')) {
      var w = document.createElement('div');
      w.id = 'topbarWelcome';
      w.className = 'topbar-welcome';
      w.setAttribute('role', 'button');
      w.setAttribute('tabindex', '0');
      w.setAttribute('title', 'Click to edit your display name');
      w.setAttribute('aria-label', 'Edit display name');
      w.textContent = _buildGreetingText();
      w.addEventListener('click', _openTopbarGreetingEditor);
      w.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          _openTopbarGreetingEditor();
        }
      });
      var ft = document.getElementById('fontToggle');
      if (ft && ft.parentNode) {
        ft.parentNode.insertBefore(w, ft);
      } else {
        topbar.appendChild(w);
      }
    }
  } catch (e) {
    console.error('[CHA] topbar extras failed:', e);
  }
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
      { id: 'objections', label: 'Rebuttals', render: renderObjections },
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
      { id: 'callflow', label: 'Call Flow', render: renderCallFlow },
      { id: 'closes', label: 'Closing Lines', render: renderCloses },
      { id: 'recovery', label: 'Control the Call', render: renderRecovery }
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
  cheatsheet: {
    label: 'Cheat Sheet',
    subs: [
      { id: 'cheatsheets', label: 'Cheat Sheet', render: renderCheatsheets }
    ]
  },
  training: {
    label: 'Training',
    subs: [
      { id: 'traininghome', label: 'CHA Academy', render: renderTrainingHome }
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
      {
        id: 'myspacehub',
        label: 'My Space',
        render: renderMySpaceHub
      },
      {
        id: 'salestracker',
        label: 'Sales Tracker',
        render: renderSalesTracker
      },
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

// P0 Task 3: Scroll-reset helper — ensures every page switch starts at top.
// Resets both window scroll and the main content scroll container so users
// never land mid-page when navigating between tabs.
function _resetScrollTop() {
  try {
    var mc = document.getElementById('main-content');
    if (mc && typeof mc.scrollTo === 'function') {
      mc.scrollTo(0, 0);
    } else if (mc) {
      mc.scrollTop = 0;
    }
    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
  } catch (_e) {
    /* ignore */
  }
}

function showPage(id) {
  // #region agent log
  fetch('http://127.0.0.1:7347/ingest/4aa1827a-5cdd-4035-8984-1fb063ffa870',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb7e63'},body:JSON.stringify({sessionId:'fb7e63',runId:'audit-run-1',hypothesisId:'H2',location:'js/app.js:showPage',message:'showPage invoked',data:{id:String(id||'')},timestamp:Date.now()})}).catch(function(){});
  // #endregion
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
  if (id === 'dashboard') {
    setTimeout(function () {
      if (typeof chaDashRefreshWidgets === 'function') chaDashRefreshWidgets();
    }, 0);
  }
  _resetScrollTop();
}

var _dashLookupState = {
  planId: '',
  searchQuery: ''
};

var CHA_DASH_ACTIVITY_KEY = 'cha_dash_activity_v1';
var CHA_DASH_RECENT_KEY = 'cha_dash_recent_plans_v1';
var _dashSuggestIdx = -1;
var _dashSuggestList = [];

function chaDashTodayIso() {
  var d = new Date();
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  );
}

function chaDashLoadActivity() {
  var today = chaDashTodayIso();
  try {
    var o = null;
    if (typeof chaGet === 'function') {
      o = chaGet(CHA_DASH_ACTIVITY_KEY, null);
    } else {
      var raw = localStorage.getItem(CHA_DASH_ACTIVITY_KEY);
      o = raw ? JSON.parse(raw) : null;
    }
    if (!o || o.d !== today) {
      return { d: today, lookups: 0, scripts: 0 };
    }
    return {
      d: o.d,
      lookups: Number(o.lookups) || 0,
      scripts: Number(o.scripts) || 0
    };
  } catch (_e) {
    return { d: today, lookups: 0, scripts: 0 };
  }
}

function chaDashSaveActivity(o) {
  try {
    if (typeof chaSet === 'function') {
      chaSet(CHA_DASH_ACTIVITY_KEY, o);
    } else {
      localStorage.setItem(CHA_DASH_ACTIVITY_KEY, JSON.stringify(o));
    }
  } catch (_e) {}
}

function chaDashBumpLookup() {
  var a = chaDashLoadActivity();
  a.lookups = (Number(a.lookups) || 0) + 1;
  chaDashSaveActivity(a);
}

function chaDashBumpScript() {
  var a = chaDashLoadActivity();
  a.scripts = (Number(a.scripts) || 0) + 1;
  chaDashSaveActivity(a);
}

function chaDashRecentLoad() {
  try {
    var arr = [];
    if (typeof chaGet === 'function') {
      arr = chaGet(CHA_DASH_RECENT_KEY, []);
    } else {
      var raw = localStorage.getItem(CHA_DASH_RECENT_KEY);
      arr = raw ? JSON.parse(raw) : [];
    }
    return Array.isArray(arr) ? arr.slice(0, 5) : [];
  } catch (_e2) {
    return [];
  }
}

function chaDashRecentSave(arr) {
  try {
    if (typeof chaSet === 'function') {
      chaSet(CHA_DASH_RECENT_KEY, arr.slice(0, 5));
    } else {
      localStorage.setItem(CHA_DASH_RECENT_KEY, JSON.stringify(arr.slice(0, 5)));
    }
  } catch (_e3) {}
}

function chaDashRecentPush(plan) {
  if (!plan || !plan.id) return;
  var row = {
    id: String(plan.id),
    name: String(plan.name || ''),
    type: String(_dashLookupDisplayType(plan) || plan.type || '')
  };
  var list = chaDashRecentLoad().filter(function (x) {
    return String(x.id) !== row.id;
  });
  list.unshift(row);
  chaDashRecentSave(list);
}

function chaDashClearRecent() {
  try {
    if (typeof chaRemove === 'function') {
      chaRemove(CHA_DASH_RECENT_KEY);
    } else {
      localStorage.removeItem(CHA_DASH_RECENT_KEY);
    }
  } catch (_e) {}
  chaDashRenderRecentChips();
  chaDashRefreshWidgets();
}

function chaDashFmtMoney(n) {
  var x = Number(n) || 0;
  return '$' + Math.round(x).toLocaleString();
}

function chaDashWeeklyProgressHtml() {
  var tiers = window.CHA_BONUS_TIERS_FOR_DASH || [];
  var bundle =
    typeof chaAnalyticsReadBundle === 'function' ? chaAnalyticsReadBundle() : null;
  var deals = bundle && bundle.stats ? Number(bundle.stats.weekDeals) || 0 : 0;
  var addons = bundle && bundle.stats ? Number(bundle.stats.weekAddons) || 0 : 0;
  var prem =
    bundle && bundle.stats ? Number(bundle.stats.weekSales || 0) : 0;
  var next = null;
  var activeIdx = -1;
  var ti;
  for (ti = 0; ti < tiers.length; ti++) {
    var achieved = deals >= tiers[ti].deals && addons >= tiers[ti].addons;
    if (achieved) activeIdx = ti;
    if (!next && !achieved) next = tiers[ti];
  }
  var gd = next ? Math.max(0, next.deals - deals) : 0;
  var ga = next ? Math.max(0, next.addons - addons) : 0;
  var msg = next
    ? gd +
      ' deal' +
      (gd === 1 ? '' : 's') +
      ' + ' +
      ga +
      ' add-on' +
      (ga === 1 ? '' : 's') +
      ' to next tier'
    : 'Top tier unlocked this week';
  var topTier = tiers.length ? tiers[tiers.length - 1] : null;
  var pct = topTier
    ? Math.min(
        100,
        Math.round(Math.min(deals / topTier.deals, addons / topTier.addons) * 100)
      )
    : 0;
  var markerHtml = '<div class="dash-cc-tier-markers">';
  for (ti = 0; ti < tiers.length; ti++) {
    var label = '$' + tiers[ti].bonus.toLocaleString() + ' tier';
    markerHtml +=
      '<span class="dash-cc-tier-marker' +
      (ti === activeIdx ? ' active' : '') +
      '">' +
      label +
      '</span>';
  }
  markerHtml += '</div>';
  return (
    '<div class="dash-cc-stat-row dash-cc-stat-row-3"><div><div class="dash-cc-big">' +
    deals +
    '</div><div class="dash-cc-lbl">Deals</div></div><div><div class="dash-cc-big">' +
    addons +
    '</div><div class="dash-cc-lbl">Add-ons</div></div><div><div class="dash-cc-big">' +
    chaDashFmtMoney(prem) +
    '</div><div class="dash-cc-lbl">Weekly premium</div></div></div>' +
    '<div class="dash-cc-progress-wrap"><div class="dash-cc-progress"><span style="width:' +
    pct +
    '%"></span></div></div>' +
    markerHtml +
    '<p class="dash-cc-msg">' +
    escHTML(msg) +
    '</p>'
  );
}

function chaDashOpenPhcsSearch() {
  window.open(
    'https://www.multiplan.com/webcenter/portal/ProviderSearch',
    '_blank',
    'noopener,noreferrer'
  );
}

function chaDashOpenFirstHealthSearch() {
  window.open(
    'https://providerlocator.firsthealth.com/',
    '_blank',
    'noopener,noreferrer'
  );
}

function chaDashWidgetsHtml() {
  var ic = function (paths) {
    return (
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      paths +
      '</svg>'
    );
  };
  var globe =
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>';
  return (
    '<div id="dashCommandWidgets" class="dash-cc-grid dash-cc-grid-pair">' +
    '<div class="dash-cc-card dash-cc-card-weekly"><div class="dash-cc-card-title">Weekly Progress</div>' +
    chaDashWeeklyProgressHtml() +
    '</div>' +
    '<div class="dash-cc-card dash-cc-card-actions"><div class="dash-cc-card-title">Quick Actions</div><div class="dash-cc-actions dash-cc-actions-5">' +
    '<button type="button" class="dash-cc-action" onclick="_showComboPage(\'myspace\',\'salestracker\')">' +
    ic('<circle cx="12" cy="12" r="10"/><path d="M8 12h8m-4-4v8"/>') +
    '<span>Log sale</span></button>' +
    '<button type="button" class="dash-cc-action" onclick="chaDashFocusLookup()">' +
    ic('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>') +
    '<span>Find a Plan</span></button>' +
    '<button type="button" class="dash-cc-action" onclick="_showComboPage(\'scripts\',\'planscripts\')">' +
    ic('<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>') +
    '<span>Scripts</span></button>' +
    '<button type="button" class="dash-cc-action" onclick="chaDashOpenPhcsSearch()">' +
    ic(globe) +
    '<span>PHCS</span></button>' +
    '<button type="button" class="dash-cc-action" onclick="chaDashOpenFirstHealthSearch()">' +
    ic(globe) +
    '<span>FirstHealth Search</span></button>' +
    '</div></div>' +
    '</div>'
  );
}

function chaDashFocusLookup() {
  showPage('dashboard');
  setTimeout(function () {
    var el = document.getElementById('dashLookupSearch');
    if (el) {
      el.focus();
      chaDashRenderRecentChips();
    }
  }, 50);
}

function chaDashRenderRecentChips() {
  var wrap = document.getElementById('dashLookupRecentChips');
  if (!wrap) return;
  var recent = chaDashRecentLoad();
  if (!recent.length) {
    wrap.innerHTML = '';
    wrap.style.display = 'none';
    return;
  }
  wrap.style.display = 'flex';
  wrap.innerHTML =
    '<span class="dash-lookup-recent-label">Recent</span>' +
    recent
      .map(function (r) {
        return (
          '<button type="button" class="dash-lookup-chip" onclick="dashLookupSelectPlan(\'' +
          escHTML(String(r.id)) +
          '\')">' +
          escHTML(r.name) +
          '</button>'
        );
      })
      .join('');
}

function chaDashSuggestUpdate(q) {
  var box = document.getElementById('dashLookupSuggest');
  if (!box) return;
  var v = String(q || '')
    .trim()
    .toLowerCase();
  _dashSuggestList = [];
  _dashSuggestIdx = -1;
  if (v.length < 3) {
    box.style.display = 'none';
    box.innerHTML = '';
    return;
  }
  var all = _dashLookupAllPlans();
  var scored = [];
  var pi;
  for (pi = 0; pi < all.length; pi++) {
    var p = all[pi];
    var nm = String(p.name || '').toLowerCase();
    if (nm.indexOf(v) !== -1) {
      scored.push({ p: p, sc: 0 });
      continue;
    }
    if (typeof fuzzyMatch === 'function' && v.length >= 3 && fuzzyMatch(v, nm)) {
      scored.push({ p: p, sc: 1 });
    }
  }
  scored.sort(function (a, b) {
    return (
      a.sc - b.sc ||
      String(a.p.name).length - String(b.p.name).length
    );
  });
  var out = scored.slice(0, 8).map(function (x) {
    return x.p;
  });
  _dashSuggestList = out;
  if (!out.length) {
    box.style.display = 'none';
    box.innerHTML = '';
    return;
  }
  var escRe = function (s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  var parts = v.split(/\s+/).filter(function (x) {
    return x.length > 0;
  });
  var hl = function (name) {
    var s = escHTML(name);
    for (var hi = 0; hi < parts.length; hi++) {
      if (parts[hi].length < 2) continue;
      var r = new RegExp('(' + escRe(parts[hi]) + ')', 'ig');
      s = s.replace(r, '<mark>$1</mark>');
    }
    return s;
  };
  box.style.display = 'block';
  box.innerHTML = out
    .map(function (p, idx) {
      return (
        '<button type="button" class="dash-lookup-suggest-item' +
        (idx === 0 ? ' active' : '') +
        '" data-idx="' +
        idx +
        '" onclick="chaDashPickSuggest(' +
        idx +
        ')"><span class="dash-lookup-suggest-name">' +
        hl(p.name) +
        '</span><span class="dash-lookup-suggest-meta">' +
        escHTML(_dashLookupDisplayType(p)) +
        '</span></button>'
      );
    })
    .join('');
}

function chaDashPickSuggest(idx) {
  var p = _dashSuggestList[idx];
  if (!p) return;
  _dashLookupState.searchQuery = '';
  var si = document.getElementById('dashLookupSearch');
  if (si) si.value = '';
  var box = document.getElementById('dashLookupSuggest');
  if (box) {
    box.style.display = 'none';
    box.innerHTML = '';
  }
  _dashSuggestList = [];
  _dashSuggestIdx = -1;
  dashLookupSelectPlan(String(p.id));
}

function chaDashSuggestHighlight(idx) {
  var box = document.getElementById('dashLookupSuggest');
  if (!box) return;
  var btns = box.querySelectorAll('.dash-lookup-suggest-item');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.toggle('active', i === idx);
  }
}

function chaDashWireLookupEnhancements() {
  var si = document.getElementById('dashLookupSearch');
  if (!si || si.dataset.chaDashWired === '1') return;
  si.dataset.chaDashWired = '1';
  si.addEventListener('focus', function () {
    if (!String(si.value || '').trim()) chaDashRenderRecentChips();
  });
  si.addEventListener('blur', function () {
    setTimeout(function () {
      var box = document.getElementById('dashLookupSuggest');
      if (box && document.activeElement && box.contains(document.activeElement))
        return;
      if (box) box.style.display = 'none';
    }, 180);
  });
  si.addEventListener('keydown', function (e) {
    if (!_dashSuggestList.length || !document.getElementById('dashLookupSuggest'))
      return;
    var box = document.getElementById('dashLookupSuggest');
    if (!box || box.style.display === 'none') return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      _dashSuggestIdx = Math.min(
        _dashSuggestList.length - 1,
        _dashSuggestIdx + 1
      );
      if (_dashSuggestIdx < 0) _dashSuggestIdx = 0;
      chaDashSuggestHighlight(_dashSuggestIdx);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _dashSuggestIdx = Math.max(0, _dashSuggestIdx - 1);
      chaDashSuggestHighlight(_dashSuggestIdx);
    } else if (e.key === 'Enter' && _dashSuggestList.length) {
      e.preventDefault();
      var pick = _dashSuggestIdx >= 0 ? _dashSuggestIdx : 0;
      chaDashPickSuggest(pick);
    }
  });
}

function chaDashRefreshWidgets() {
  var el = document.getElementById('dashCommandWidgets');
  if (!el || typeof chaDashWidgetsHtml !== 'function') return;
  var wrap = document.createElement('div');
  wrap.innerHTML = chaDashWidgetsHtml();
  var next = wrap.firstElementChild;
  if (next) el.replaceWith(next);
}

function chaDashRenderSimilarPlans() {
  var el = document.getElementById('dashLookupSimilar');
  if (!el) return;
  var sel = _dashLookupSelectedPlan();
  var html = '';
  if (sel && typeof chaPickSimilarPlansForDash === 'function') {
    var sim = chaPickSimilarPlansForDash(sel, 3);
    if (sim && sim.length) {
      html =
        '<div class="dash-lookup-similar-label">Similar plans</div><div class="dash-lookup-similar-row">';
      for (var i = 0; i < sim.length; i++) {
        var sp = sim[i];
        html +=
          '<button type="button" class="dash-lookup-similar-chip" onclick="dashLookupSelectPlan(\'' +
          escHTML(String(sp.id)) +
          '\')">' +
          escHTML(sp.name) +
          '</button>';
      }
      html += '</div>';
    }
  }
  el.innerHTML = html;
}

function _dashLookupProviderUrl(network) {
  var net = String(network || '').toLowerCase();
  if (
    net.indexOf('first health') !== -1 ||
    net.indexOf('first health epo') !== -1
  ) {
    return 'https://providerlocator.firsthealth.com';
  }
  if (net.indexOf('phcs') !== -1 || net.indexOf('multiplan') !== -1) {
    return 'https://www.multiplan.com/webcenter/portal/ProviderSearch';
  }
  if (net.indexOf('managed care') !== -1) {
    return 'https://www.bcsins.com';
  }
  return 'https://www.bcsins.com';
}

function _dashLookupAllPlans() {
  if (typeof POLICY_DOCS === 'undefined' || !POLICY_DOCS.length) return [];
  var out = POLICY_DOCS.filter(function (p) {
    if (!p || !String(p.name || '').trim()) return false;
    if (typeof _pdIsDisplayablePlan === 'function' && !_pdIsDisplayablePlan(p)) {
      return false;
    }
    return true;
  });
  out.sort(function (a, b) {
    return String(a.name).localeCompare(String(b.name));
  });
  return out;
}

function _dashLookupFilteredPlans() {
  var all = _dashLookupAllPlans();
  var q = String(_dashLookupState.searchQuery || '').trim().toLowerCase();
  if (!q) return all;
  return all.filter(function (p) {
    return String(p.name || '').toLowerCase().indexOf(q) !== -1;
  });
}

function _dashLookupDisplayType(plan) {
  if (!plan) return '—';
  var n = String(plan.name || '').toLowerCase();
  if (
    /\bmedfirst\b|\btruehealth\b|\bgoodhealth\b|\btdk\b|\bsmartchoice\b|\bghdp\b/.test(
      n
    )
  ) {
    return 'MEC — Minimum Essential Coverage';
  }
  if (
    /\bpinnacle stm\b|\baccess health\b|\bsmart health\b|\bgalena\b|\ballstate enhanced\b|\ballstate copay\b|\ballstate essentials\b/.test(
      n
    )
  ) {
    return 'STM — Short Term Medical';
  }
  if (
    /\bharmony\b|\bsigma\b|\beverest\b|\bpinnacle protect\b|\bbwa americare\b|\bbwa paramount\b|\bhealth choice\b|\ballstate health access\b|\bmychoice\b/.test(
      n
    )
  ) {
    return 'Limited Benefit';
  }
  return plan.type || '—';
}

function _dashLookupSelectedPlan() {
  var plans = _dashLookupFilteredPlans();
  if (!plans.length) return null;
  var i;
  for (i = 0; i < plans.length; i++) {
    if (String(plans[i].id) === String(_dashLookupState.planId)) {
      return plans[i];
    }
  }
  if (plans.length === 1) {
    _dashLookupState.planId = plans[0].id;
    return plans[0];
  }
  _dashLookupState.planId = plans[0].id;
  return plans[0];
}

function _dashLookupGridInnerHtml(selected) {
  return (
    '<div class="dash-lookup-cell"><span>Network</span><strong>' +
    escHTML((selected && selected.network) || '—') +
    '</strong></div>' +
    '<div class="dash-lookup-cell"><span>Underwriter</span><strong>' +
    escHTML((selected && selected.carrier) || '—') +
    '</strong></div>' +
    '<div class="dash-lookup-cell"><span>Type</span><strong>' +
    escHTML(selected ? _dashLookupDisplayType(selected) : '—') +
    '</strong></div>' +
    '<div class="dash-lookup-cell"><span>Association</span><strong>' +
    escHTML((selected && selected.assoc) || '—') +
    '</strong></div>'
  );
}

function _dashLookupSyncSelectAndGrid() {
  var sel = document.getElementById('dashPlanLookupSelect');
  var grid = document.getElementById('dashLookupGrid');
  var provBtn = document.querySelector('#dashPlanLookupMount .dash-lookup-provider');
  var plans = _dashLookupFilteredPlans();
  if (!plans.length) {
    _dashLookupState.planId = '';
  }
  var selected = _dashLookupSelectedPlan();
  var providerUrl = _dashLookupProviderUrl(selected ? selected.network : '');
  if (sel) {
    if (!plans.length) {
      sel.innerHTML = '<option value="">No plans found</option>';
    } else {
      var opts = '';
      for (var j = 0; j < plans.length; j++) {
        var p = plans[j];
        opts +=
          '<option value="' +
          escHTML(String(p.id)) +
          '"' +
          (selected && selected.id === p.id ? ' selected' : '') +
          '>' +
          escHTML(p.name) +
          '</option>';
      }
      sel.innerHTML = opts;
    }
  }
  if (grid) {
    grid.innerHTML = _dashLookupGridInnerHtml(selected);
  }
  if (provBtn) {
    provBtn.disabled = !providerUrl;
  }
}

function renderDashboardLookupCard() {
  var plans = _dashLookupFilteredPlans();
  var selected = _dashLookupSelectedPlan();
  var providerUrl = _dashLookupProviderUrl(selected ? selected.network : '');
  var html = '<div class="dash-lookup-card dash-lookup-card--option-d">';
  html += '<div class="dash-lookup-head-option-d">';
  html +=
    '<div class="dash-lookup-head-icon-wrap" aria-hidden="true"><svg class="dash-lookup-head-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>';
  html += '<div class="dash-lookup-head-titles">';
  html += '<div class="dash-lookup-head-title-main">Plan lookup</div>';
  html +=
    '<div class="dash-lookup-head-sub-main">Network, underwriter, provider search</div>';
  html += '</div></div>';
  html += '<div class="dash-lookup-input-wrap">';
  html +=
    '<input id="dashLookupSearch" type="text" placeholder="Quick plan lookup — start typing a plan name…" oninput="dashLookupFilter(this.value)" autocomplete="off">';
  html += '<span class="dash-lookup-kbd">Ctrl + L</span>';
  html +=
    '<div id="dashLookupSuggest" class="dash-lookup-suggest" style="display:none" role="listbox" aria-label="Matching plans"></div>';
  html += '</div>';
  html +=
    '<div id="dashLookupRecentChips" class="dash-lookup-recent-chips" style="display:none"></div>';
  html += '<select id="dashPlanLookupSelect" class="dash-lookup-select" onchange="dashLookupSelectPlan(this.value)">';
  plans.forEach(function (p) {
    html +=
      '<option value="' +
      escHTML(String(p.id)) +
      '"' +
      (selected && selected.id === p.id ? ' selected' : '') +
      '>' +
      escHTML(p.name) +
      '</option>';
  });
  html += '</select>';
  html += '<div class="dash-lookup-grid" id="dashLookupGrid">';
  html += _dashLookupGridInnerHtml(selected);
  html += '</div>';
  html += '<div class="dash-lookup-actions dash-lookup-actions-embedded">';
  html +=
    '<button type="button" class="dash-lookup-provider" onclick="dashLookupOpenProvider()"' +
    (providerUrl ? '' : ' disabled') +
    '><svg class="dash-lookup-btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="8" r="4"/><path d="M4 20v-1a6 6 0 0 1 6-6"/><circle cx="18" cy="18" r="3"/><path d="m22 22-2.5-2.5"/></svg><span>Find a provider</span></button>';
  html +=
    '<button type="button" class="dash-lookup-copy" onclick="dashLookupCopy()"><svg class="dash-lookup-btn-icon dash-lookup-btn-icon-sm" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg><span>Copy info</span></button>';
  html += '</div>';
  html += '</div>';
  return html;
}

function dashLookupRefresh() {
  var mount = document.getElementById('dashPlanLookupMount');
  if (mount) mount.innerHTML = renderDashboardLookupCard();
  var si = document.getElementById('dashLookupSearch');
  if (si) si.value = _dashLookupState.searchQuery || '';
  chaDashWireLookupEnhancements();
  chaDashSuggestUpdate(_dashLookupState.searchQuery || '');
  chaDashRenderRecentChips();
}

function dashLookupFilter(query) {
  _dashLookupState.searchQuery = query == null ? '' : String(query);
  _dashLookupSyncSelectAndGrid();
  chaDashSuggestUpdate(_dashLookupState.searchQuery);
}

function dashLookupSelectPlan(planId) {
  if (!planId) return;
  _dashLookupState.planId = planId;
  chaDashBumpLookup();
  var list = _dashLookupAllPlans();
  var found = null;
  var ri;
  for (ri = 0; ri < list.length; ri++) {
    if (String(list[ri].id) === String(planId)) {
      found = list[ri];
      break;
    }
  }
  if (found) chaDashRecentPush(found);
  _dashLookupSyncSelectAndGrid();
  chaDashRefreshWidgets();
}

function dashLookupOpenProvider() {
  var selected = _dashLookupSelectedPlan();
  var providerUrl = _dashLookupProviderUrl(selected ? selected.network : '');
  if (!providerUrl) return;
  window.open(providerUrl, '_blank', 'noopener');
}

function dashLookupCopy() {
  var selected = _dashLookupSelectedPlan();
  if (!selected || typeof safeCopy !== 'function') return;
  var providerUrl = _dashLookupProviderUrl(selected.network);
  var text = [
    'Plan: ' + selected.name,
    'Network: ' + (selected.network || '—'),
    'Underwriter: ' + (selected.carrier || '—'),
    'Type: ' + _dashLookupDisplayType(selected),
    'Association: ' + (selected.assoc || '—'),
    'Provider URL: ' + (providerUrl || '—')
  ].join('\n');
  safeCopy(text).then(function () {}).catch(function () {});
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

  var homeName = 'there';
  try {
    var dName = (
      (typeof chaGet === 'function'
        ? chaGet('preferredName', '') || chaGet('cha_display_name', '')
        : safeGetItem('preferredName') || safeGetItem('cha_display_name')) || ''
    ).trim();
    if (dName) homeName = dName;
    else if (window.CHA_USER) {
      homeName = window.CHA_USER.firstName || window.CHA_USER.name || 'there';
    }
  } catch (_e) {}
  var now = new Date();
  var day = now.toLocaleDateString('en-US', { weekday: 'long' });
  var date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  var subtitle = day + ' · ' + date;
  var html =
    '<div class="ph"><div class="pt">Welcome back, ' +
    escHTML(homeName) +
    '</div><div class="pd">' +
    escHTML(subtitle) +
    '</div></div>';
  html += '<div class="dashboard-home-stack">';
  html += '<div id="dashPlanLookupMount"></div>';
  html += chaDashWidgetsHtml();
  html += '</div>';
  pg.innerHTML = html;
  dashLookupRefresh();
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
  if (subId === 'salestracker') {
    var stNav = document.querySelector(
      '.nb[onclick="showPage(\'salestracker\')"]'
    );
    if (stNav) btn = stNav;
  } else if (parentId === 'myspace' && subId === 'myspacehub') {
    btn = document.querySelector('.nb[onclick="showPage(\'myspace\')"]');
  }
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
  if (parentId === 'scripts' && subId === 'planscripts') {
    if (typeof chaDashBumpScript === 'function') chaDashBumpScript();
  }
  _resetScrollTop();
}

function renderSubTabs(parentId, activeSubId) {
  var container = document.getElementById('subtabs-' + parentId);
  if (!container) return;
  if (parentId === 'myspace' && activeSubId === 'salestracker') {
    container.innerHTML = '';
    return;
  }
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
    var arr =
      typeof chaGet === 'function'
        ? chaGet('cha_favorites', [])
        : JSON.parse(safeGetItem('cha_favorites') || '[]');
    return Array.isArray(arr) ? arr : [];
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
  if (typeof chaSet === 'function') {
    chaSet('cha_favorites', favs);
  } else {
    safeSetItem('cha_favorites', JSON.stringify(favs));
  }
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
    if (typeof chaSet === 'function') {
      chaSet('cha_tour_done', '1');
    } else {
      safeSetItem('cha_tour_done', '1');
    }
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
  if (typeof chaSet === 'function') {
    chaSet('cha_tour_done', '1');
  } else {
    safeSetItem('cha_tour_done', '1');
  }
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
// Ensure at least one plan button is visually selected whenever the
// Benefits Reference panel opens. chat.js already sets the first plan
// as the active one at init, but after the agent clicks "All Plans"
// (which clears every .active class) and then closes + reopens the
// panel, no button is highlighted. This wrapper fixes that case
// without touching chat.js: if no .br-plan-btn has .active, trigger
// a click on the first visible plan button, which re-runs chat.js's
// own selection logic end-to-end.
function _chaEnsureFirstPlanSelected() {
  var bar = document.getElementById('br-plan-bar');
  if (!bar) return;
  if (bar.querySelector('.br-plan-btn.active')) return;
  var first = bar.querySelector('.br-plan-btn');
  if (first && typeof first.click === 'function') first.click();
}

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
    _chaEnsureFirstPlanSelected();
  }
}

// ══════════════════════════════════════════════════════
// COLOR-CODED PLAN TYPE BADGES ON .br-plan-btn
// chat.js creates the plan buttons with only a data-id attribute.
// We observe the .br-plan-bar for DOM mutations and, for each plan
// button, look up its group (MEC/STM/Limited) from the BR_PLANS
// global (populated by chat.js's brInit) and add data-group so
// CSS can color-code the badge per group. Done from app.js with a
// MutationObserver so chat.js remains untouched.
// ══════════════════════════════════════════════════════
(function _chaSetupPlanBadgeObserver() {
  function applyGroupAttrs() {
    var bar = document.getElementById('br-plan-bar');
    if (!bar) return;
    if (typeof BR_PLANS === 'undefined' || !BR_PLANS || !BR_PLANS.length) {
      return;
    }
    var btns = bar.querySelectorAll('.br-plan-btn');
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
      if (btn.getAttribute('data-group')) continue;
      var id = btn.dataset.id;
      if (!id) continue;
      var plan = null;
      for (var j = 0; j < BR_PLANS.length; j++) {
        if (BR_PLANS[j].id === id) {
          plan = BR_PLANS[j];
          break;
        }
      }
      if (plan && plan.group) {
        btn.setAttribute('data-group', plan.group);
      }
    }
  }
  function tryInit() {
    var bar = document.getElementById('br-plan-bar');
    if (!bar) {
      setTimeout(tryInit, 400);
      return;
    }
    var obs = new MutationObserver(applyGroupAttrs);
    obs.observe(bar, { childList: true });
    // Apply to anything already rendered
    applyGroupAttrs();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
})();

function _closeBenefitsSidebar() {
  if (typeof brOpen !== 'undefined') {
    brOpen = false;
  }
  var panel = document.getElementById('br-panel');
  var toggle = document.getElementById('br-toggle');
  if (panel) {
    panel.classList.remove('open');
    panel.classList.remove('br-expanded');
  }
  if (toggle) toggle.classList.remove('open');
  var brEx = document.getElementById('br-expand');
  if (brEx) {
    brEx.textContent = 'Expand';
    brEx.setAttribute('aria-pressed', 'false');
  }
  document.body.classList.remove('br-open');
}

// ── INIT ──────────────────────────────────────────────
function initApp() {
  _initFontSize();
  _initTopbarExtras();
  // Clerk may set window.CHA_USER after initApp runs. Refresh
  // the greeting once it's available (poll up to ~6 seconds).
  var _ghTries = 0;
  var _ghTimer = setInterval(function () {
    _ghTries++;
    if (window.CHA_USER || _ghTries > 30) {
      clearInterval(_ghTimer);
      if (window.CHA_USER) {
        _refreshTopbarGreeting();
      }
    }
  }, 200);
  _initSidebar();
  showPage('dashboard');
  // Start onboarding tour for first-time users
  var tourDone =
    typeof chaGet === 'function'
      ? chaGet('cha_tour_done', '')
      : safeGetItem('cha_tour_done');
  if (!tourDone) {
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
  // #region agent log
  fetch('http://127.0.0.1:7347/ingest/4aa1827a-5cdd-4035-8984-1fb063ffa870',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fb7e63'},body:JSON.stringify({sessionId:'fb7e63',runId:'audit-run-1',hypothesisId:'H2',location:'js/app.js:initApp',message:'initApp completed',data:{appStarted:!!window._chaAppStarted,hasSidebar:!!document.querySelector('.sidebar')},timestamp:Date.now()})}).catch(function(){});
  // #endregion
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

// Auto-close mobile sidebar after navigation item click.
(function _chaSidebarAutoClose() {
  function bind() {
    var items = document.querySelectorAll('.sidebar a, .sidebar button, .sidebar .nav-item, .sidebar .nb');
    for (var i = 0; i < items.length; i++) {
      if (items[i].dataset.autoCloseBound === '1') continue;
      items[i].dataset.autoCloseBound = '1';
      items[i].addEventListener('click', function () {
        var sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.remove('open');
        var overlay = document.querySelector('.sidebar-overlay');
        if (overlay) overlay.style.display = 'none';
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();

// ── Keyboard Shortcuts ────────────────────────────────
document.addEventListener('keydown', function (e) {
  // Ctrl+L — focus plan lookup search on dashboard
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
    e.preventDefault();
    var pls = document.getElementById('dashLookupSearch');
    if (pls) {
      pls.focus();
      try {
        pls.select();
      } catch (_e) {
        /* no-op */
      }
      if (typeof chaDashRenderRecentChips === 'function') chaDashRenderRecentChips();
    } else {
      showPage('dashboard');
      setTimeout(function () {
        var plsi = document.getElementById('dashLookupSearch');
        if (!plsi) return;
        plsi.focus();
        try {
          plsi.select();
        } catch (_e2) {
          /* no-op */
        }
        if (typeof chaDashRenderRecentChips === 'function') chaDashRenderRecentChips();
      }, 40);
    }
    return;
  }
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
  safeCopy(text)
    .then(function () {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1500);
    })
    .catch(function () {});
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
