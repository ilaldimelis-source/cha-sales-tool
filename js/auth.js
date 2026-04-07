// auth.js — CHA Session Guard
// Loaded as FIRST script in index.html
// Redirects to login if no valid Clerk session
// Also handles logout button and user display

(function () {
  'use strict';

  // ── CONFIG ─────────────────────────────────────────────────────────────────
  // Replace with your real Clerk publishable key after Clerk setup
  var CLERK_PK = 'pk_test_d2hvbGUtdmlwZXItODkuY2xlcmsuYWNjb3VudHMuZGV2JA';

  // ── INJECT CLERK SDK ────────────────────────────────────────────────────────
  function injectClerkScript(callback) {
    var s = document.createElement('script');
    s.setAttribute('data-clerk-publishable-key', CLERK_PK);
    // Replace [your-clerk-frontend-api] after Clerk setup
    s.src = 'https://whole-viper-89.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
    s.crossOrigin = 'anonymous';
    s.onload = callback;
    s.onerror = function () {
      // Auth script failed to load — redirect to login for safety
      window.location.replace('/login.html');
    };
    document.head.appendChild(s);
  }

  // ── SESSION CHECK ───────────────────────────────────────────────────────────
  function checkSession() {
    if (!window.Clerk) {
      window.location.replace('/login.html');
      return;
    }

    window.Clerk.load().then(function () {
      var user = window.Clerk.user;

      if (!user) {
        // No session → go to login
        window.location.replace('/login.html');
        return;
      }

      // Session valid — render user info in sidebar
      renderUserInfo(user);

    }).catch(function () {
      window.location.replace('/login.html');
    });
  }

  // ── RENDER USER INFO IN SIDEBAR ─────────────────────────────────────────────
  function renderUserInfo(user) {
    // Get role from Clerk public metadata
    var role = (user.publicMetadata && user.publicMetadata.role) || 'agent';
    var name = user.firstName || user.emailAddresses[0].emailAddress.split('@')[0];
    var initials = name.slice(0, 2).toUpperCase();
    var isManager = role === 'manager';

    // Wait for DOM to be ready, then inject
    function inject() {
      var nav = document.querySelector('.nav');
      if (!nav) { setTimeout(inject, 100); return; }

      // User card at bottom of sidebar
      var userCard = document.createElement('div');
      userCard.id = 'auth-user-card';
      userCard.style.cssText = [
        'margin-top:auto',
        'padding:10px 12px',
        'border-top:1px solid rgba(255,255,255,0.07)',
        'display:flex',
        'align-items:center',
        'gap:9px',
        'cursor:default'
      ].join(';');

      userCard.innerHTML =
        '<div style="width:32px;height:32px;border-radius:999px;background:#5175f1;color:#fff;' +
        'display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;">' +
        initials + '</div>' +
        '<div style="min-width:0;flex:1;">' +
          '<div style="font-size:12px;font-weight:700;color:#f1f5f9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escHTMLsafe(name) + '</div>' +
          '<div style="font-size:10px;color:' + (isManager ? '#4ade80' : '#94a3b8') + ';font-weight:600;letter-spacing:.04em;">' +
            (isManager ? '★ Manager' : 'Agent') +
          '</div>' +
        '</div>' +
        '<button id="logout-btn" title="Sign out" style="background:transparent;border:none;color:#64748b;cursor:pointer;padding:4px;border-radius:6px;flex-shrink:0;" ' +
          'onmouseover="this.style.color=\'#f87171\'" onmouseout="this.style.color=\'#64748b\'">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>' +
          '<polyline points="16 17 21 12 16 7"/>' +
          '<line x1="21" y1="12" x2="9" y2="12"/></svg>' +
        '</button>';

      // Insert user card after nav div
      nav.parentNode.insertBefore(userCard, nav.nextSibling);

      // Logout handler
      document.getElementById('logout-btn').addEventListener('click', function () {
        doLogout();
      });

      // Manager-only: show Office tab
      if (isManager) {
        showManagerTab();
      }

      // Store role globally for other JS files to use
      window.CHA_USER = { name: name, role: role, isManager: isManager, email: user.emailAddresses[0].emailAddress };
    }

    inject();
  }

  // ── LOGOUT ──────────────────────────────────────────────────────────────────
  function doLogout() {
    var btn = document.getElementById('logout-btn');
    if (btn) btn.style.opacity = '0.5';
    window.Clerk.signOut().then(function () {
      window.location.replace('/login.html');
    }).catch(function () {
      window.location.replace('/login.html');
    });
  }

  // Make logout callable globally (e.g. from a menu)
  window.chaLogout = doLogout;

  // ── MANAGER TAB ─────────────────────────────────────────────────────────────
  function showManagerTab() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var btn = document.createElement('button');
    btn.className = 'nb';
    btn.setAttribute('onclick', "showPage('office')");
    btn.innerHTML =
      '<span class="nb-icon">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>' +
          '<circle cx="9" cy="7" r="4"/>' +
          '<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>' +
          '<path d="M16 3.13a4 4 0 0 1 0 7.75"/>' +
        '</svg>' +
      '</span>' +
      '<span class="nb-label">Office</span>';

    nav.appendChild(btn);
  }

  // ── SAFE ESCAPE ─────────────────────────────────────────────────────────────
  function escHTMLsafe(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ── BOOT ────────────────────────────────────────────────────────────────────
  // Show loading overlay while auth checks
  document.addEventListener('DOMContentLoaded', function () {
    // Inject a loading overlay so the app doesn't flash before auth check
    var overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'background:#0f172a', 'z-index:99999',
      'display:flex', 'align-items:center', 'justify-content:center',
      'flex-direction:column', 'gap:14px'
    ].join(';');
    overlay.innerHTML =
      '<img src="/logo.png" style="width:48px;height:48px;border-radius:12px;background:#162436;padding:6px;" />' +
      '<div style="width:32px;height:32px;border:3px solid rgba(255,255,255,0.1);border-top-color:#5175f1;border-radius:50%;animation:authspin 0.7s linear infinite;"></div>' +
      '<div style="font-family:sans-serif;font-size:13px;color:#64748b;">Verifying access...</div>' +
      '<style>@keyframes authspin{to{transform:rotate(360deg)}}</style>';

    document.body.prepend(overlay);

    injectClerkScript(function () {
      checkSession();
      // Remove overlay after session confirmed (renderUserInfo fires)
      var orig = renderUserInfo;
      renderUserInfo = function(user) {
        orig(user);
        setTimeout(function () {
          var ov = document.getElementById('auth-overlay');
          if (ov) ov.remove();
        }, 300);
      };
    });
  });

})();
