// utils.js — Icons, escHTML, search engine, shared utilities

function escHTML(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}




// ── ICON HELPERS ─────────────────────────────────────
function mkIcon(p){return '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';}
function iconBox(p){return '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:rgba(26,29,38,0.07);border-radius:8px;color:#5C6878;flex-shrink:0;">'+mkIcon(p)+'</span>';}
function iconLg(p){return '<span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;background:rgba(92,104,120,0.08);border-radius:10px;color:var(--charcoal);">'+mkIcon(p)+'</span>';}
var P = {
  money:     '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  think:     '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01M15 9h.01"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>',
  users:     '<circle cx="8" cy="7" r="3"/><circle cx="16" cy="7" r="3"/><path d="M2 21v-2a6 6 0 0 1 6-6M16 13a6 6 0 0 1 6 6v2"/>',
  email:     '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
  confused: '<circle cx="12" cy="12" r="9"/><text x="12" y="16" font-size="8" font-weight="bold" fill="currentColor" text-anchor="middle">?</text>',
  thatch:     '<path d="M11 3h2V6h-2-6zM13 3h2v6h-2-6z"/><path d="M2 6h11v9a3 3 0 0 1-3 3 H5-0c-1.5 0-5-1.5-5-3V6z"/>',
  shake:      '<path d="M0 4c0-1 1-2 2-2s4 3 8 35 4-3 6-3c1 0 2 1 2 2"/><circle cx="18" cy="5" r="2" fill="currentColor"/>',
  smile:      '<circle cx="8" cy="9" r="1" fill="currentColor"/><circle cx="16" cy="9" r="1" fill="currentColor"/><path d="M9 15.5c3 1.5 5.6 1.5 6 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></g></svg>',
  git:       '<circle cx="11" cy="11" r="8" fill="none"/><circle cx="8" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="6" r="2" fill="currentColor"/><path d="M16 16 A8 8 0 0 1 8 8"/>',
  github: 