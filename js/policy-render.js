// policy-render.js â€” Policy Reference tab render/filter/toggle functions
var policyDocFilter = 'All';
var policyDocSearch = '';
var policyDocOpen = null;
var _pdSearchTimer;

function renderPolicydocs() {
  var html = '<div class="ph"><div class="pt">Policy Benefits <span>Reference</span></div>';
  html += '<div class="pd">Real written benefits, limitations, and exclusions sourced directly from plan documents. Tap any plan to see the full details.</div></div>';

  // Compliance banner
  html += '<div class="comp-banner"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> <strong>Source documents:</strong> Benefits, limitations, and exclusions below are extracted directly from official plan broch]res and SPDs. Always verify current rates and state-specific variations with your carrier before enrollment.</div>';

  // Filter tabs
  html += '<div class="stabs" style="margin-bottom:16px;">';
  ['All','MEC','STM','Limited'].forEach(function(f) {
    html += '<button class="stab" + (f === policyDocFilter ? ' active' : '') + '" onclick="policyDocFilter=\'' + f + '\';policyDocFilterChanged()">' + (f==='All'?'All Plans':f==='MEC'?'MEC Plans':f==='STM'?'Short-Term Medical':'Limited Benefit') + '</button>';
  });
  html += '</div>';

  // Search box â€” this is a stable container that won't be destroyed
  html += '<div style="position:relative;margin-bottom:18px;">';
  html += '<span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--txt-muted)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>';
  html += '<input type="text" id="pdSearchInput" placeholder="Search plans, benefits, exclusions..." value="' + escHTML(policyDocSearch) + '" aria-label="Search plans, benefits, exclusions" oninput="policyDocSearchTyping(this.value)" style="width:100%;padding:9px 14px 9px 36px;border:1.5px solid var(--rule2);border-radius:var(--r-pill);font-family:var(--font-body);font-size:.82rem;background:#FFFFFF;color:var(--txt-head);outline:none;" onfocus="this.style.borderColor=\'#5175F1\'" onblur="this.style.borderColor=\'var(--rule2)\'">';
  html += '</div>';

  // Results container â€” only this part gets re-rendered on search
  html += '<div id="pdResultsContainer">';
  html += renderPolicyResults();
  html += '</div>';

  var _page_policydocs = document.getElementById('page-policydocs'); if(_page_policydocs) _page_policydocs.innerHTML = html;
}

function policyDocSearchTyping(val) {
  policyDocSearch = val;
  clearTimeout(_pdSearchTimer);
  _pdSearchTimer = setTimeout(function() {
    var container = document.getElementById('pdResultsContainer');
    if (container) container.innerHTML = renderPolicyResults();
  }, 200);
}

function policyDocFilterChanged() {
  var container = document.getElementById('pdResultsContainer');
  if (container) {
    container.innerHTML = renderPolicyResults();
  }
  
 "•@][PÛ\ÜÓ\İœ\Ú
	ØXİ]™IÊNÂˆ[ÙHX‹˜Û\ÜÓ\İœ™[[İ™J	ØXİ]™IÊNÂˆJNÂŸB‚™[˜İ[Ûˆ™[™\”ÛXŞT™\İ[Ê
HÂˆ˜\ˆ[H	ÉÎÂ