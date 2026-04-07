// auth.js — CHA Session Guard v2 — Production Ready
// Loaded FIRST in index.html — guards every page load
// Handles: session check, user display, logout, inactivity timer, manager tab

(function () {
  'use strict';

  var CLERK_PK = 'pk_test_d2hvbGUtdmlwZXItODkuY2xlcmsuYWNjb3VudHMuZGV2JA';
  var LOGIN_URL = '/login.html';
  var INACTIVITY_MS = 30 * 60 * 1000; // 30 minutes
  var _inactivityTimer = null;
  var _clerkInstance = null;

  // ── LOADING OVERLAY ─────────────────────────────────────────────────────────
  function showOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:#0f172a;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;';
    overlay.innerHTML =
      '<img src="/logo.png" style="width:48px;height:48px;border-radius:12px;background:#162436;padding:6px;" />' +
      '<div style="width:32px;height:32px;border:3px solid rgba(255,255,255,0.1);border-top-color:#5175f1;border-radius:50%;animation:authspin 0.7s linear infinite;"></div>' +
      '<div style="font-family:sans-serif;font-size:13px;color:#64748b;">Verifying access...</div>' +
      '<style>@keyframes authspin{to{transform:rotate(360deg)}}</style>';
    document.body.prepend(overlay);
  }

  function hideOverlay() {
    setTimeout(function() {
      var ov = document.getElementById('auth-overlay');
      if (ov) ov.remove();
    }, 300);
  }

  // ── WAIT FOR CLERK SDK (loaded via static script tag in index.html head) ────
  // Clerk @5 auto-loads via static script tag with data-clerk-publishable-key.
  // Do NOT call .load() again — just wait for .loaded === true.
  function waitForClerk(callback, attempts) {
    if (!attempts) attempts = 0;
    if (window.Clerk && window.Clerk.loaded) {
      callback();
    } else if (attempts < 50) {
      setTimeout(function() { waitForClerk(callback, attempts + 1); }, 200);
    } else {
      console.error('[CHA Auth] Clerk SDK never loaded');
      goToLogin();
    }
  }

  // ── REDIRECT TO LOGIN ────────────────────────────────────────────────────────
  function goToLogin() {
    window.location.replace(LOGIN_URL);
  }

  // ── SESSION CHECK ────────────────────────────────────────────────────────────
  function checkSession() {
    _clerkInstance = window.Clerk;
    var user = _clerkInstance.user;
    if (!user) {
      goToLogin();
      return;
    }
    renderUserInfo(user);
    hideOverlay();
    startInactivityTimer();
  }

  // ── INACTIVITY TIMER ─────────────────────────────────────────────────────────
  function startInactivityTimer() {
    function reset() {
      clearTimeout(_inactivityTimer);
      _inactivityTimer = setTimeout(function() {
        showTimeoutOverlay();
      }, INACTIVITY_MS);
    }
    ['mousemove','keydown','click','touchstart','scroll'].forEach(function(ev) {
      document.addEventListener(ev, reset, { passive: true });
    });
    reset();
  }

  function showTimeoutOverlay() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,0.97);z-index:999999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;';
    overlay.innerHTML =
      '<div style="font-family:sans-serif;font-size:18px;font-weight:700;color:#fff;">Session timed out</div>' +
      '<div style="font-family:sans-serif;font-size:13px;color:#94a3b8;">Signing you out for security...</div>';
    document.body.appendChild(overlay);
    setTimeout(function() {
      doLogout();
    }, 2000);
  }

  // ── LOGOUT ───────────────────────────────────────────────────────────────────
  function doLogout() {
    clearTimeout(_inactivityTimer);
    var clerk = window.Clerk || _clerkInstance;
    if (clerk && typeof clerk.signOut === 'function') {
      clerk.signOut()
        .then(function() { goToLogin(); })
        .catch(function() { goToLogin(); });
    } else {
      goToLogin();
    }
  }
  window.chaLogout = doLogout;

  // ── RENDER USER IN SIDEBAR ───────────────────────────────────────────────────
  function renderUserInfo(user) {
    var role = 'agent';
    try { role = (user.publicMetadata && user.publicMetadata.role) || 'agent'; } catch(e) {}
    var firstName = '';
    try { firstName = user.firstName || ''; } catch(e) {}
    var email = '';
    try { email = user.emailAddresses[0].emailAddress; } catch(e) {}
    var name = firstName || (email ? email.split('@')[0] : 'Agent');
    var initials = name.slice(0,2).toUpperCase();
    var isManager = role === 'manager';

    // Store globally — used by dashboard greeting, notes, etc.
    window.CHA_USER = {
      name: name,
      firstName: firstName,
      role: role,
      isManager: isManager,
      email: email
    };

    function inject() {
      var nav = document.querySelector('.nav');
      if (!nav) { setTimeout(inject, 150); return; }
      // Avoid duplicate injection
      if (document.getElementById('auth-user-card')) return;

      var card = document.createElement('div');
      card.id = 'auth-user-card';
      card.style.cssText = 'margin-top:auto;padding:10px 12px;border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:9px;';
      card.innerHTML =
        '<div style="width:32px;height:32px;border-radius:999px;background:#5175f1;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;">' + escSafe(initials) + '</div>' +
        '<div style="min-width:0;flex:1;">' +
          '<div style="font-size:12px;font-weight:700;color:#f1f5f9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escSafe(name) + '</div>' +
          '<div style="font-size:10px;font-weight:600;letter-spacing:.04em;color:' + (isManager ? '#16a34a' : '#94a3b8') + ';">' + (isManager ? '★ Manager' : 'Agent') + '</div>' +
        '</div>' +
        '<button id="logout-btn" title="Sign out" style="background:transparent;border:none;color:#64748b;cursor:pointer;padding:4px;border-radius:6px;flex-shrink:0;">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
        '</button>';

      nav.parentNode.insertBefore(card, nav.nextSibling);

      document.getElementById('logout-btn').addEventListener('click', doLogout);

      if (isManager) addManagerTab(nav);
    }
    inject();
  }

  // ── MANAGER TAB ──────────────────────────────────────────────────────────────
  function addManagerTab(nav) {
    if (document.getElementById('manager-nav-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'manager-nav-btn';
    btn.className = 'nb';
    btn.setAttribute('onclick', "showPage('office')");
    btn.innerHTML =
      '<span class="nb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' +
      '<path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>' +
      '<span class="nb-label">Office</span>';
    nav.appendChild(btn);
  }

  // ── SAFE HTML ESCAPE ─────────────────────────────────────────────────────────
  function escSafe(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── BOOT ─────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    showOverlay();
    waitForClerk(checkSession);
  });

})();
