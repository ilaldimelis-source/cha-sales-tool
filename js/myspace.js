// myspace.js — My Space tab (Hub + Mindset + Notes + Saved Scripts)

// Landing tab: opens first when navigating to My Space (not Sales Tracker).
function renderMySpaceHub() {
  var html =
    '<div class="ph"><div class="pt">My <span>Space</span></div><div class="pd">Your personal hub — jump to tracker, mindset, or notes.</div></div>';
  html += '<div class="msh-grid">';
  html +=
    '<button type="button" class="msh-card" onclick="_showComboPage(\'myspace\',\'salestracker\')">' +
    '<div class="msh-card-k">Sales Tracker</div>' +
    '<div class="msh-card-d">Log deals, add-ons, and weekly production.</div></button>';
  html +=
    '<button type="button" class="msh-card" onclick="_showComboPage(\'myspace\',\'mindset\')">' +
    '<div class="msh-card-k">Mindset</div>' +
    '<div class="msh-card-d">Closer principles before every shift.</div></button>';
  html +=
    '<button type="button" class="msh-card" onclick="_showComboPage(\'myspace\',\'notes\')">' +
    '<div class="msh-card-k">Notes</div>' +
    '<div class="msh-card-d">Display name, scratch pad, favorites, saved scripts.</div></button>';
  html +=
    '<button type="button" class="msh-card msh-card-wide" onclick="showPage(\'objections\')">' +
    '<div class="msh-card-k">Rebuttals</div>' +
    '<div class="msh-card-d">Plan framing, fit guides, and objection battle cards live here — Plan Vault stays data-only.</div></button>';
  html += '</div>';
  var el = document.getElementById('page-myspacehub');
  if (el) el.innerHTML = html;
}

const MINDSET = [
  {
    n: '01',
    c: 'var(--charcoal)',
    r: 'You are not selling. You are qualifying.',
    d: 'Your job is to find people who need what you have and match them properly. Stop trying to convince people. Start trying to understand them. The right match sells itself.'
  },
  {
    n: '02',
    c: '#7a5f00',
    r: 'Talk less. Ask more.',
    d: "Every time you resist the urge to pitch and ask one more question instead, your close rate goes up. The prospect's words are more persuasive than yours."
  },
  {
    n: '03',
    c: '#29A26A',
    r: 'Silence after a close is power.',
    d: 'After a closing question, stop talking. Not pausing — stopping. The next person who speaks loses leverage. Most agents lose deals by filling the silence with more selling.'
  },
  {
    n: '04',
    c: 'var(--charcoal2)',
    r: 'Never create confusion with too many details.',
    d: 'Three benefits that solve their problem beat ten features that sound impressive. Simplicity creates confidence. Complexity creates hesitation. Always ask: what are the three things that matter for THIS person?'
  },
  {
    n: '05',
    c: 'var(--charcoal)',
    r: 'Validate before you redirect.',
    d: "Never dismiss what a prospect says. Cushion it first — 'That makes complete sense' — then pivot. Feeling heard is what opens the door to being influenced."
  },
  {
    n: '06',
    c: '#7a5f00',
    r: 'The stated objection is rarely the real one.',
    d: "'It's too expensive' usually means 'I don't see the value yet.' 'I need to think' usually means 'I have one concern I didn't say.' Always ask: 'Is it the cost itself, or something else?'"
  },
  {
    n: '07',
    c: '#29A26A',
    r: 'Sell the fit. Not the features.',
    d: "Nobody cares about benefits in the abstract. They care about whether this solves their specific problem. 'The plan has telemedicine' is a feature. 'You can talk to a doctor at 2am when your kid has a fever — for free' is a fit."
  },
  {
    n: '08',
    c: 'var(--charcoal2)',
    r: "Keep momentum. Don't let the call die.",
    d: 'Momentum is fragile. Every time you pause too long, every time you let them lead you off-topic without a bridge back — you lose control. Control through questions, not monologues.'
  }
];

// ══════════════════════════════════════════════════════
// RENDER: MINDSET
// ══════════════════════════════════════════════════════
function renderMindset() {
  var html =
    '<div class="ph"><div class="pt">Top Closer <span>Mindset</span></div><div class="pd">Read this before every call day. These are non-negotiables.</div></div>';
  html +=
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">';
  MINDSET.forEach(function (m) {
    html += '<div class="mindset-card">';
    html +=
      '<div style="font-size:28px;font-weight:900;color:' +
      m.c +
      ';opacity:0.3;line-height:1;">' +
      m.n +
      '</div>';
    html +=
      '<div class="mr" style="font-size:16px;font-weight:800;color:var(--charcoal3);margin:6px 0;">' +
      m.r +
      '</div>';
    html +=
      '<div class="md" style="font-size:13px;color:var(--warmgray3);">' +
      m.d +
      '</div></div>';
  });
  html += '</div>';
  var _page_mindset = document.getElementById('page-mindset');
  if (_page_mindset) _page_mindset.innerHTML = html;
}

// ══════════════════════════════════════════════════════
// RENDER: NOTES
// ══════════════════════════════════════════════════════
function renderNotes() {
  var saved = getSavedScripts();
  var notesVal =
    safeGetItem(
      'cha_notes_' + ((window.CHA_USER && window.CHA_USER.email) || 'shared')
    ) || '';
  var html =
    '<div class="ph"><div class="pt">My <span>Notes</span></div><div class="pd">Write your own scripts, custom phrasing, and reminders. Everything saves automatically.</div></div>';

  // Settings: Display Name
  var savedName = '';
  try {
    savedName = safeGetItem('cha_display_name') || '';
  } catch (_e) {
    savedName = '';
  }
  html += '<div class="settings-block">';
  html += '<div class="settings-block-title">Settings</div>';
  html +=
    '<label class="settings-block-label" for="displayNameInput">Display Name</label>';
  html +=
    '<input type="text" id="displayNameInput" class="settings-input" ' +
    'placeholder="How should we greet you?" value="' +
    escHTML(savedName) +
    '" oninput="saveDisplayName(this.value)" />';
  html +=
    '<div class="settings-save-row"><span id="displayNameMsg" style="color:#29A26A;font-size:11px;opacity:0;transition:opacity 0.5s;">\u2713 Saved</span></div>';
  html += '</div>';

  html +=
    '<textarea class="notes-ta" id="notesTA" aria-label="Agent notes" placeholder="Write your notes here...">' +
    escHTML(notesVal) +
    '</textarea>';
  html +=
    '<div style="display:flex;gap:8px;margin-top:8px;align-items:center;">';
  html += '<button class="btn btn-rose" onclick="saveNotes()">Save</button>';
  html += '<button class="btn btn-ghost" onclick="clearNotes()">Clear</button>';
  html +=
    '<span id="saveMsg" style="color:#29A26A;font-size:12px;opacity:0;transition:opacity 0.5s;">✓ Saved</span></div>';
  // Favorites section
  var favs = typeof getFavorites === 'function' ? getFavorites() : [];
  html += '<div style="margin-top:24px;"><div class="slbl">Favorites</div>';
  if (favs.length === 0) {
    html +=
      '<div style="color:var(--warmgray3);font-size:13px;padding:12px 0;">No favorites yet. Tap the star icon on any script, objection, or plan card to save it here.</div>';
  } else {
    favs.forEach(function (f, idx) {
      html += '<div class="fav-card">';
      html += '<div class="fav-card-info">';
      html += '<div class="fav-card-title">' + escHTML(f.title) + '</div>';
      if (f.source)
        html += '<div class="fav-card-source">' + escHTML(f.source) + '</div>';
      if (f.preview)
        html +=
          '<div class="fav-card-preview">' + escHTML(f.preview) + '</div>';
      html += '</div>';
      html +=
        '<button class="fav-remove" onclick="removeFavorite(' +
        idx +
        ')" title="Remove">&times;</button>';
      html += '</div>';
    });
  }
  html += '</div>';
  html += '<div style="margin-top:24px;"><div class="slbl">Saved Scripts</div>';
  html += '<div style="display:flex;gap:8px;margin:10px 0;">';
  html +=
    '<textarea id="scriptInput" style="flex:1;background:#FFFFFF;border:1px solid #E8EBF5;border-radius:10px;padding:8px 12px;font-size:13px;color:var(--charcoal3);resize:none;height:60px;" placeholder="Paste a script or line to save..."></textarea>';
  html +=
    '<button class="btn btn-rose" onclick="saveScript()" style="align-self:flex-end;">Save Script</button></div>';
  html += '<div id="savedList"></div></div>';
  var _page_notes = document.getElementById('page-notes');
  if (_page_notes) _page_notes.innerHTML = html;
  renderSavedScripts();
  var _notesTA = document.getElementById('notesTA');
  if (_notesTA) {
    _notesTA.addEventListener('input', function () {
      clearTimeout(window._nt);
      window._nt = setTimeout(saveNotes, 1500);
    });
  }
}

function saveDisplayName(val) {
  try {
    safeSetItem('cha_display_name', (val || '').trim());
  } catch (_e) {
    /* ignore */
  }
  var m = document.getElementById('displayNameMsg');
  if (m) {
    m.style.opacity = '1';
    clearTimeout(window._dnmt);
    window._dnmt = setTimeout(function () {
      m.style.opacity = '0';
    }, 1500);
  }
  // Refresh the topbar greeting immediately if present
  try {
    if (typeof _refreshTopbarGreeting === 'function') {
      _refreshTopbarGreeting();
    }
  } catch (_e) {
    /* ignore */
  }
}

function saveNotes() {
  safeSetItem(
    'cha_notes_' + ((window.CHA_USER && window.CHA_USER.email) || 'shared'),
    document.getElementById('notesTA').value
  );
  var m = document.getElementById('saveMsg');
  if (m) {
    m.style.opacity = '1';
    setTimeout(function () {
      m.style.opacity = '0';
    }, 1800);
  }
}
function clearNotes() {
  if (confirm('Clear notes?')) {
    document.getElementById('notesTA').value = '';
    saveNotes();
  }
}
function getSavedScripts() {
  try {
    return JSON.parse(
      safeGetItem(
        'cha_scripts_' +
          ((window.CHA_USER && window.CHA_USER.email) || 'shared')
      ) || '[]'
    );
  } catch (e) {
    return [];
  }
}
function saveScript() {
  var v = document.getElementById('scriptInput').value.trim();
  if (!v) return;
  var s = getSavedScripts();
  s.unshift(v);
  safeSetItem(
    'cha_scripts_' + ((window.CHA_USER && window.CHA_USER.email) || 'shared'),
    JSON.stringify(s.slice(0, 30))
  );
  document.getElementById('scriptInput').value = '';
  renderSavedScripts();
}
function deleteScript(i) {
  var s = getSavedScripts();
  s.splice(i, 1);
  safeSetItem(
    'cha_scripts_' + ((window.CHA_USER && window.CHA_USER.email) || 'shared'),
    JSON.stringify(s)
  );
  renderSavedScripts();
}
function removeFavorite(idx) {
  var favs = typeof getFavorites === 'function' ? getFavorites() : [];
  if (idx >= 0 && idx < favs.length) {
    favs.splice(idx, 1);
    safeSetItem('cha_favorites', JSON.stringify(favs));
    renderNotes();
  }
}
function renderSavedScripts() {
  var s = getSavedScripts();
  var el = document.getElementById('savedList');
  if (!el) return;
  if (!s.length) {
    el.innerHTML =
      '<div style="color:var(--warmgray3);font-size:12px;padding:12px 0;">No saved scripts yet.</div>';
    return;
  }
  var html = '';
  s.forEach(function (sc, i) {
    html +=
      '<div class="saved-item" style="display:flex;align-items:flex-start;gap:8px;background:var(--milk);border:1px solid rgba(210,160,170,0.22);border-radius:12px;padding:10px 14px;margin-bottom:6px;">';
    html +=
      '<div class="saved-text" style="flex:1;font-size:12px;color:#7A5A6A;">' +
      escHTML(sc) +
      '</div>';
    html +=
      '<button onclick="deleteScript(' +
      i +
      ')" style="color:var(--warmgray3);background:none;border:none;cursor:pointer;font-size:14px;flex-shrink:0;">✕</button></div>';
  });
  el.innerHTML = html;
}

// ══════════════════════════════════════════════════════
// SALES TRACKER (My Space, first subtab)
// Thin shim — all logic lives in js/sales-tracker.js. This
// global function exists so PAGE_CONFIG in app.js can
// reference renderSalesTracker by name without depending on
// the script load order between sales-tracker.js and app.js.
// ══════════════════════════════════════════════════════
function renderSalesTracker() {
  if (typeof _stRender === 'function') {
    _stRender();
  } else {
    var p = document.getElementById('page-salestracker');
    if (p) {
      p.innerHTML =
        '<div style="padding:24px;text-align:center;color:var(--text-secondary);">Sales Tracker is loading…</div>';
    }
  }
}
