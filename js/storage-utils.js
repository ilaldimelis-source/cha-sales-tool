// js/storage-utils.js — Clerk-scoped localStorage helpers + legacy migration
// Loaded before auth.js. Exposes window.chaKey / chaGet / chaSet / chaRemove.
'use strict';

(function () {
  var CHA_LEGACY_BASES = [
    'cha_groq_key',
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
    'cha_theme',
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
    try {
      localStorage.setItem(chaKey(base), JSON.stringify(value));
    } catch (_e) {}
  }

  function chaRemove(base) {
    try {
      localStorage.removeItem(chaKey(base));
    } catch (_e) {}
  }

  /** Groq key and other string secrets stored as JSON strings */
  function chaGroqKeyString() {
    chaTryMigrateLegacy('cha_groq_key');
    var v = chaGet('cha_groq_key', '');
    if (v == null) return '';
    return typeof v === 'string' ? v : String(v);
  }

  function chaClearSensitive() {
    try {
      chaRemove('cha_groq_key');
    } catch (_e) {}
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
  }

  function chaAutoPopulateGroqIfEmpty() {
    var existing = chaGroqKeyString();
    if (existing) return;
    fetch('/api/groq-key?t=' + Date.now())
      .then(function (r) {
        if (!r.ok) return null;
        return r.json();
      })
      .then(function (d) {
        if (!d || !d.key) return;
        if (!chaGroqKeyString()) {
          chaSet('cha_groq_key', d.key);
        }
      })
      .catch(function () {});
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
    chaAutoPopulateGroqIfEmpty();
  }

  window.chaKey = chaKey;
  window.chaGet = chaGet;
  window.chaSet = chaSet;
  window.chaRemove = chaRemove;
  window.chaTryMigrateLegacy = chaTryMigrateLegacy;
  window.chaGroqKeyString = chaGroqKeyString;
  window.chaClearSensitive = chaClearSensitive;
  window.chaClearAllForUser = chaClearAllForUser;
  window.chaAfterAuthUserReady = chaAfterAuthUserReady;
})();
