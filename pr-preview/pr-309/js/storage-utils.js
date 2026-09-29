// js/storage-utils.js — Clerk-scoped localStorage helpers + legacy migration
// Loaded before auth.js. Exposes window.chaKey / chaGet / chaSet / chaRemove.
'use strict';

(function () {
  function chaPurgeGroqKeyStorage() {
    try {
      var toRemove = [];
      var i;
      var k;
      for (i = 0; i < localStorage.length; i++) {
        k = localStorage.key(i);
        if (k && k.indexOf('cha_groq_key') === 0) {
          toRemove.push(k);
        }
      }
      for (i = 0; i < toRemove.length; i++) {
        localStorage.removeItem(toRemove[i]);
      }
    } catch (_e) {}
  }

  chaPurgeGroqKeyStorage();

  var CHA_LEGACY_BASES = [
    'preferredName',
    'cha_display_name',
    'cha_monthly_goal',
    'cha_tour_done',
    'cha_favorites',
    'cha_dash_activity_v1',
    'cha_dash_recent_plans_v1',
    'cha_st_tab',
    'chaGlobalSearchRecent',
    'cha_lib_last_tag',
    'cha_font_size',
    'cha_debug_chat_badge',
    'scriptIndex',
    'academyProgress',
    'trackerDeals'
  ];

  function chaKey(base) {
    var user = (window.CHA_USER && window.CHA_USER.id) || 'anonymous';
    return base + '__' + user;
  }

  function chaTryMigrateLegacy(base) {
    if (String(base || '').indexOf('cha_groq_key') === 0) return;
    var uid = window.CHA_USER && window.CHA_USER.id;
    if (!uid || uid === 'anonymous') return;
    var sk = chaKey(base);
    if (localStorage.getItem(sk) !== null) return;
    var g = localStorage.getItem(base);
    if (g === null) return;
    var val;
    try {
      val = JSON.parse(g);
    } catch (_e) {
      val = g;
    }
    try {
      localStorage.setItem(sk, JSON.stringify(val));
      localStorage.removeItem(base);
    } catch (_e2) {}
  }

  function chaMigrateAllLegacyBases() {
    for (var i = 0; i < CHA_LEGACY_BASES.length; i++) {
      chaTryMigrateLegacy(CHA_LEGACY_BASES[i]);
    }
  }

  function chaGet(base, fallback) {
    chaTryMigrateLegacy(base);
    try {
      var raw = localStorage.getItem(chaKey(base));
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (_e) {
      return fallback;
    }
  }

  function chaSet(base, value) {
    if (String(base || '').indexOf('cha_groq_key') === 0) return;
    try {
      localStorage.setItem(chaKey(base), JSON.stringify(value));
    } catch (_e) {}
  }

  function chaRemove(base) {
    try {
      localStorage.removeItem(chaKey(base));
    } catch (_e) {}
  }

  function chaClearSensitive() {
    chaPurgeGroqKeyStorage();
    try {
      window.CHA_USER = undefined;
    } catch (_e2) {}
  }

  function chaClearAllForUser(userId) {
    if (!userId || userId === 'anonymous') return;
    var bases = CHA_LEGACY_BASES.concat([
      'cha_sales',
      'cha_postdates',
      'cha_commission_rates'
    ]);
    var seen = {};
    for (var i = 0; i < bases.length; i++) {
      var b = bases[i];
      if (seen[b]) continue;
      seen[b] = true;
      try {
        localStorage.removeItem(b + '__' + userId);
      } catch (_e) {}
    }
    chaPurgeGroqKeyStorage();
  }

  function chaAfterAuthUserReady() {
    chaMigrateAllLegacyBases();
    if (typeof window.chaMigrateMySpaceNotesScripts === 'function') {
      try {
        window.chaMigrateMySpaceNotesScripts();
      } catch (_e) {}
    }
    if (typeof window.laHydrateFromStorage === 'function') {
      try {
        window.laHydrateFromStorage();
      } catch (_e2) {}
    }
    if (typeof window.initAcademy === 'function') {
      try {
        window.initAcademy();
      } catch (_e3) {}
    }
    var dash = document.getElementById('page-dashboard');
    if (
      dash &&
      dash.classList.contains('active') &&
      typeof window.chaDashRefreshWidgets === 'function'
    ) {
      window.chaDashRefreshWidgets();
    }
  }

  window.chaKey = chaKey;
  window.chaGet = chaGet;
  window.chaSet = chaSet;
  window.chaRemove = chaRemove;
  window.chaTryMigrateLegacy = chaTryMigrateLegacy;
  window.chaClearSensitive = chaClearSensitive;
  window.chaClearAllForUser = chaClearAllForUser;
  window.chaAfterAuthUserReady = chaAfterAuthUserReady;
})();
