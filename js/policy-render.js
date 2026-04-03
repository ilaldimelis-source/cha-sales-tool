// policy-render.js — Policy Reference tab render/filter/toggle functions
var policyDocFilter = 'All';
var policyDocSearch = '';
var policyDocOpen = null;
var _pdSearchTimer;

function renderPolicydocs() {
  var html = '<div class="ph"><div class="pt">Policy Benefits <span>Reference</span></div>';
  html += '<div class="pd">Real written benefits, limitations, and exclusions sourced directly from plan documents. Tap any plan to see the full details.</div></div>';

  // Compliance banner
  html += '<div class="comp-banner"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> <strong>Source documents:</strong> Benefits, limitations, and exclusions below are extracted directly from official plan brochures and SPDs. Always verify current rates and state-specific variations with your carrier before enrollment.</div>';

  // Filter tabs
  html += '<div class="stabs" style="margin-bottom:16px;">';
  ['All','MEC','STM','Limited'].forEach(function(f) {
    html += '<button class="stab' + (f === policyDocFilter ? ' active' : '') + '" onclick="policyDocFilter=\'' + f + '\';policyDocFilterChanged()">' + (f==='All'?'All Plans':f==='MEC'?'MEC Plans':f==='STM'?'Short-Term Medical':'Limited Benefit') + '</button>';
  });
  html += '</div>';

  // Search box — this is a stable container that won't be destroyed
  html += '<div style="position:relative;margin-bottom:18px;">';
  html += '<span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--txt-muted)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>';
  html += '<input type="text" id="pdSearchInput" placeholder="Search plans, benefits, exclusions..." value="' + escHTML(policyDocSearch) + '" aria-label="Search plans, benefits, exclusions" oninput="policyDocSearchTyping(this.value)" style="width:100%;padding:9px 14px 9px 36px;border:1.5px solid var(--rule2);border-radius:var(--r-pill);font-family:var(--font-body);font-size:.82rem;background:#FFFFFF;color:var(--txt-head);outline:none;" onfocus="this.style.borderColor=\'#5175F1\'" onblur="this.style.borderColor=\'var(--rule2)\'">';
  html += '</div>';

  // Results container — only this part gets re-rendered on search
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
  // Update filter tab active states
  var tabs = document.querySelectorAll('.stabs .stab');
  var filters = ['All','MEC','STM','Limited'];
  tabs.forEach(function(tab, i) {
    if (filters[i] === policyDocFilter) tab.classList.add('active');
    else tab.classList.remove('active');
  });
}

function renderPolicyResults() {
  var html = '';
  // Filter and search plans
  var filtered = POLICY_DOCS.filter(function(p) {
    var groupOk = policyDocFilter === 'All' || p.group === policyDocFilter;
    if (!groupOk) return false;
    if (!policyDocSearch.trim()) return true;
    var q = policyDocSearch.toLowerCase();
    var expandedTerms = expandSearchSynonyms(q);
    var searchable = (p.name + ' ' + p.type + ' ' + p.carrier + ' ' + p.network + ' ' + p.planNotes + ' ' +
      p.limitations.join(' ') + ' ' + p.benefits.map(function(b){return b.category + ' ' + b.items.join(' ');}).join(' ') +
      ' ' + (p.preEx || '') + ' ' + (p.waitingPeriods || []).join(' ')).toLowerCase();
    for (var t = 0; t < expandedTerms.length; t++) {
      if (brTermMatch(searchable, expandedTerms[t])) return true;
    }
    return false;
  });

  if (!filtered.length) {
    html += '<div style="text-align:center;padding:40px;color:var(--txt-muted);font-size:.88rem;">No plans match your search.</div>';
    return html;
  }

  // Group by type
  var groups = [{key:'MEC',label:'MEC Plans',color:'#5175F1'},{key:'STM',label:'Short-Term Medical',color:'#F59E0B'},{key:'Limited',label:'Limited Benefit Plans',color:'#DC2626'}];
  groups.forEach(function(grp) {
    var plans = filtered.filter(function(p){return p.group===grp.key;});
    if (!plans.length) return;

    html += '<div style="margin-bottom:8px;display:flex;align-items:center;gap:10px;">';
    html += '<div style="font-family:var(--font-display);font-size:1rem;font-weight:800;color:var(--txt-hero)">' + grp.label + '</div>';
    html += '<div style="flex:1;height:1px;background:var(--rule)"></div>';
    html += '<span style="background:' + grp.color + '18;color:' + grp.color + ';border-radius:999px;padding:2px 10px;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em">' + plans.length + ' plans</span>';
    html += '</div>';

    plans.forEach(function(plan) {
      var isOpen = policyDocOpen === plan.id;
      html += '<div id="pd-' + plan.id + '" style="background:#FFFFFF;border:1.5px solid ' + (isOpen ? grp.color : 'var(--rule)') + ';border-radius:var(--r-lg);margin-bottom:8px;overflow:hidden;box-shadow:var(--shadow-card);transition:all 0.18s;">';

      // Header
      html += '<div onclick="policyDocToggle(\'' + plan.id + '\')" style="padding:14px 18px;cursor:pointer;display:flex;align-items:flex-start;gap:12px;">';
      html += '<div class="u-flex1">';
      html += '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">';
      html += '<span style="font-family:var(--font-ui);font-size:1rem;font-weight:800;color:var(--txt-hero)">' + plan.name + '</span>';
      html += '<span style="background:' + grp.color + '18;color:' + grp.color + ';border-radius:999px;padding:2px 10px;font-size:.6rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">' + plan.type + '</span>';
      html += '</div>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;">';
      html += '<span style="background:rgba(62,207,142,0.10);color:#2E7D52;border-radius:999px;padding:2px 9px;font-size:.62rem;font-weight:700;letter-spacing:0.04em">' + plan.network + '</span>';
      html += '<span style="background:rgba(26,31,54,0.06);color:var(--txt-body);border-radius:999px;padding:2px 9px;font-size:.62rem;font-weight:600">' + plan.carrier + '</span>';
      html += '<span style="background:rgba(245,166,35,0.10);color:#A07A06;border-radius:999px;padding:2px 9px;font-size:.62rem;font-weight:600">' + plan.assoc + '</span>';
      html += '</div></div>';
      html += '<span style="color:var(--txt-muted);font-size:11px;flex-shrink:0;transform:' + (isOpen?'rotate(180deg)':'rotate(0)') + ';transition:transform 0.2s;margin-top:4px">▼</span>';
      html += '</div>';

      if (isOpen) {
        html += '<div style="padding:0 18px 20px;border-top:1px solid var(--rule);">';

        // Agent note
        html += '<div style="background:rgba(81,117,241,0.06);border-left:3px solid #5175F1;border-radius:0 var(--r-md) var(--r-md) 0;padding:10px 14px;margin:14px 0;font-family:var(--font-body);font-size:.82rem;color:var(--txt-body);line-height:1.6;">';
        html += '<span style="font-family:var(--font-ui);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5175F1;display:block;margin-bottom:4px;">Agent Note</span>';
        html += plan.planNotes + '</div>';

        // Waiting periods + pre-ex strip
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">';
        html += '<div style="background:rgba(62,207,142,0.07);border:1px solid rgba(62,207,142,0.18);border-radius:var(--r-md);padding:10px 12px;">';
        html += '<div style="font-family:var(--font-ui);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2E7D52;margin-bottom:6px;">Waiting Periods</div>';
        plan.waitingPeriods.forEach(function(w){html += '<div style="font-size:.78rem;color:var(--txt-body);margin-bottom:3px;font-weight:600">• ' + w + '</div>';});
        html += '</div>';
        html += '<div style="background:rgba(237,95,116,0.07);border:1px solid rgba(237,95,116,0.18);border-radius:var(--r-md);padding:10px 12px;">';
        html += '<div style="font-family:var(--font-ui);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#DC2626;margin-bottom:6px;">Pre-Existing Conditions</div>';
        html += '<div style="font-size:.78rem;color:var(--txt-body);font-weight:600">' + plan.preEx + '</div>';
        html += '</div></div>';

        // Benefits section
        html += '<div style="font-family:var(--font-ui);font-size:.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--txt-muted);margin-bottom:10px;display:flex;align-items:center;gap:8px;">Covered Benefits<span style="flex:1;height:1px;background:var(--rule);display:block"></span></div>';
        html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px;margin-bottom:16px;">';
        plan.benefits.forEach(function(bcat) {
          html += '<div style="background:var(--bg-card2);border:1px solid var(--rule);border-radius:var(--r-md);padding:12px 14px;">';
          html += '<div style="font-family:var(--font-ui);font-size:.68rem;font-weight:800;color:var(--txt-head);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.06em">' + bcat.category + '</div>';
          bcat.items.forEach(function(item){
            html += '<div style="font-size:.78rem;color:var(--txt-body);margin-bottom:4px;padding-left:10px;border-left:2px solid rgba(81,117,241,0.20);line-height:1.5;font-weight:500">' + item + '</div>';
          });
          html += '</div>';
        });
        html += '</div>';

        // Limitations section
        html += '<div style="font-family:var(--font-ui);font-size:.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--txt-muted);margin-bottom:10px;display:flex;align-items:center;gap:8px;">Limitations & Exclusions<span style="flex:1;height:1px;background:var(--rule);display:block"></span></div>';
        html += '<div style="background:rgba(237,95,116,0.04);border:1px solid rgba(237,95,116,0.14);border-radius:var(--r-md);padding:14px 16px;">';
        plan.limitations.forEach(function(lim){
          html += '<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;">';
          html += '<span style="color:#DC2626;flex-shrink:0;margin-top:1px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>';
          html += '<div style="font-size:.78rem;color:var(--txt-body);line-height:1.5;font-weight:500">' + lim + '</div>';
          html += '</div>';
        });
        html += '</div>';

        // Source document reference
        html += '<div style="margin-top:12px;padding:8px 12px;background:var(--bg-card2);border-radius:var(--r-md);font-size:.7rem;color:var(--txt-muted);font-weight:600;">';
        html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="margin-right:5px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
        html += 'Source: ' + plan.source + '</div>';

        html += '</div>'; // end open body
      }
      html += '</div>'; // end plan card
    });
    html += '<div style="margin-bottom:20px;"></div>';
  });

  return html;
}

function policyDocToggle(id) {
  policyDocOpen = (policyDocOpen === id) ? null : id;
  var container = document.getElementById('pdResultsContainer');
  if (container) container.innerHTML = renderPolicyResults();
  if (policyDocOpen) {
    setTimeout(function(){
      var el = document.getElementById('pd-' + id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 50);
  }
}
