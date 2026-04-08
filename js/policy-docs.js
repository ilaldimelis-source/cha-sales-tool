// policy-docs.js — render and toggle functions for plan cards
// Requires: js/plan-data.js loaded first (provides POLICY_DOCS global)

// ── RENDER: POLICY BENEFITS REFERENCE ──────────────────────────
var policyDocFilter = 'All';
var policyDocSearch = '';
var policyDocOpen = null;
var _pdSearchTimer;

function _pdFindSalesPlan(doc) {
  if (typeof PLANS === 'undefined') return null;
  for (var i = 0; i < PLANS.length; i++) {
    if (
      doc.name.indexOf(PLANS[i].name.split(' ')[0]) !== -1 ||
      PLANS[i].name.indexOf(doc.name.split(' ')[0]) !== -1
    ) {
      if (PLANS[i].group === doc.group) return PLANS[i];
    }
  }
  return null;
}

function renderPolicydocs() {
  try {
    return _renderPolicydocsInner();
  } catch (e) {
    var pg =
      document.getElementById('page-policydocs') ||
      document.getElementById('page-allplans');
    if (pg)
      pg.innerHTML =
        '<div style="padding:24px;color:#B91C1C;">Plans failed to load. Please refresh the page (Ctrl+Shift+R).</div>';
  }
}
function _renderPolicydocsInner() {
  var html = '<div class="ph"><div class="pt">Plan <span>Vault</span></div>';
  html +=
    '<div class="pd">Find the right plan for every client. Tap any card for full details.</div></div>';

  // Filter tabs
  html += '<div class="stabs" style="margin-bottom:12px;">';
  ['All', 'MEC', 'STM', 'Limited'].forEach(function (f) {
    html +=
      '<button class="stab' +
      (f === policyDocFilter ? ' active' : '') +
      '" onclick="policyDocFilter=\'' +
      f +
      '\';policyDocFilterChanged()">' +
      (f === 'All' ? 'All' : f) +
      '</button>';
  });
  html += '</div>';

  // Search box
  html += '<div style="position:relative;margin-bottom:14px;">';
  html +=
    '<svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);pointer-events:none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  html +=
    '<input type="text" id="pdSearchInput" placeholder="Search plans, benefits, exclusions..." value="' +
    escHTML(policyDocSearch) +
    '" aria-label="Search plans, benefits, exclusions" oninput="policyDocSearchTyping(this.value)" style="width:100%;height:44px;border-radius:999px;border:1.5px solid #E5E7EB;padding:0 40px 0 44px;font-size:14px;font-family:var(--font-body);background:#F8F9FE;color:var(--text-primary);outline:none;transition:border-color 0.15s;" onfocus="this.style.borderColor=\'#5B8DEF\'" onblur="this.style.borderColor=\'#E5E7EB\'">';
  html +=
    '<button id="pdSearchClear" onclick="clearPdSearch()" style="display:' +
    (policyDocSearch ? 'block' : 'none') +
    ';position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9CA3AF;font-size:18px;line-height:1;padding:4px;">&times;</button>';
  html += '</div>';

  // Results container
  html += '<div id="pdResultsContainer">';
  html += renderPolicyResults();
  html += '</div>';

  var _page_policydocs =
    document.getElementById('page-policydocs') ||
    document.getElementById('page-allplans');
  if (_page_policydocs) _page_policydocs.innerHTML = html;
}

function policyDocSearchTyping(val) {
  policyDocSearch = val;
  var clearBtn = document.getElementById('pdSearchClear');
  if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
  clearTimeout(_pdSearchTimer);
  _pdSearchTimer = setTimeout(function () {
    var container = document.getElementById('pdResultsContainer');
    if (container) container.innerHTML = renderPolicyResults();
  }, 100);
}

function clearPdSearch() {
  policyDocSearch = '';
  var input = document.getElementById('pdSearchInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  var clearBtn = document.getElementById('pdSearchClear');
  if (clearBtn) clearBtn.style.display = 'none';
  var container = document.getElementById('pdResultsContainer');
  if (container) container.innerHTML = renderPolicyResults();
}

function policyDocFilterChanged() {
  var container = document.getElementById('pdResultsContainer');
  if (container) {
    container.innerHTML = renderPolicyResults();
  }
  // Update filter tab active states
  var tabs = document.querySelectorAll('.stabs .stab');
  var filters = ['All', 'MEC', 'STM', 'Limited'];
  tabs.forEach(function (tab, i) {
    if (filters[i] === policyDocFilter) tab.classList.add('active');
    else tab.classList.remove('active');
  });
}

function _pdBadge(grp) {
  var bg =
    grp === 'MEC'
      ? 'rgba(91,141,239,0.10)'
      : grp === 'STM'
        ? 'rgba(245,158,11,0.10)'
        : 'rgba(239,68,68,0.08)';
  var col = grp === 'MEC' ? '#5B8DEF' : grp === 'STM' ? '#d97706' : '#dc2626';
  return (
    '<span style="display:inline-block;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:' +
    bg +
    ';color:' +
    col +
    ';">' +
    grp +
    '</span>'
  );
}

function _pdGrpColor(grp) {
  return grp === 'MEC' ? '#5B8DEF' : grp === 'STM' ? '#d97706' : '#dc2626';
}

function _pdExpandedDetail(plan) {
  var gc = _pdGrpColor(plan.group);
  var salesPlan = _pdFindSalesPlan(plan);

  // ── Card helper: bordered rounded box ──
  var _card = function (borderColor, content) {
    return (
      '<div style="background:var(--bg-card);border:1.5px solid #E5E7EB;border-left:3px solid ' +
      borderColor +
      ';border-radius:var(--r-card);padding:14px 16px;margin-bottom:10px;">' +
      content +
      '</div>'
    );
  };
  var _label = function (text, color) {
    return (
      '<div style="font-family:var(--font-ui);font-size:11px;font-weight:700;color:' +
      color +
      ';text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">' +
      text +
      '</div>'
    );
  };
  var _pill = function (text, bg, color) {
    return (
      '<span style="display:inline-block;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:.06em;padding:3px 10px;border-radius:999px;background:' +
      bg +
      ';color:' +
      color +
      ';margin-right:4px;margin-bottom:4px;">' +
      text +
      '</span>'
    );
  };

  var html =
    '<div id="pd-detail-' +
    plan.id +
    '" style="background:var(--bg-card);border:2px solid ' +
    gc +
    ';border-radius:var(--r-card);margin-bottom:16px;overflow:hidden;animation:cha-fade-in 0.18s ease both;">';

  // ── Header ──
  html +=
    '<div style="padding:16px 20px;border-bottom:1.5px solid #E5E7EB;display:flex;align-items:center;gap:12px;">';
  html += '<div style="flex:1;min-width:0;">';
  html +=
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">' +
    _pdBadge(plan.group) +
    '<span style="font-family:var(--font-ui);font-size:17px;font-weight:700;color:var(--text-primary);">' +
    plan.name +
    '</span></div>';
  // Meta pills
  html += '<div style="display:flex;flex-wrap:wrap;gap:0;margin-top:4px;">';
  html += _pill(plan.network, 'rgba(34,197,94,0.08)', '#15803D');
  html += _pill(plan.carrier, 'rgba(91,141,239,0.08)', '#5B8DEF');
  if (plan.assoc) html += _pill(plan.assoc, 'rgba(245,158,11,0.08)', '#d97706');
  html += '</div>';
  html += '</div>';
  html +=
    '<button onclick="policyDocToggle(\'' +
    plan.id +
    '\')" style="background:none;border:1px solid #E5E7EB;border-radius:8px;padding:6px;cursor:pointer;color:var(--text-secondary);flex-shrink:0;" aria-label="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  html += '</div>';

  // ── Body ──
  html += '<div style="padding:16px 20px;">';

  // Coverage highlights — top 5
  var topBullets = [];
  plan.benefits.forEach(function (bcat) {
    bcat.items.forEach(function (item) {
      if (topBullets.length < 5 && !/NOT covered/i.test(item))
        topBullets.push(item);
    });
  });
  if (topBullets.length) {
    var covHtml = _label('Coverage Highlights', 'var(--accent)');
    topBullets.forEach(function (b) {
      covHtml +=
        '<div style="font-size:13px;color:var(--text-secondary);padding-left:8px;margin-bottom:3px;line-height:1.5;">&#8226; ' +
        b +
        '</div>';
    });
    html += _card('var(--accent)', covHtml);
  }

  // Rx Coverage
  var rxItems = [];
  plan.benefits.forEach(function (bcat) {
    if (/prescription|rx/i.test(bcat.category)) {
      bcat.items.forEach(function (item) {
        rxItems.push(item);
      });
    }
  });
  if (rxItems.length) {
    var rxHtml = _label('Rx Coverage', '#7C3AED');
    rxItems.slice(0, 3).forEach(function (item) {
      rxHtml +=
        '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">&#8226; ' +
        item +
        '</div>';
    });
    html += _card('#7C3AED', rxHtml);
  }

  // Waiting Periods + Pre-Ex side by side
  var wpHtml = _label('Waiting Periods', '#15803D');
  plan.waitingPeriods.forEach(function (w) {
    wpHtml +=
      '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' +
      w +
      '</div>';
  });
  var peHtml = _label('Pre-Ex Rules', '#B91C1C');
  peHtml +=
    '<div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">' +
    plan.preEx +
    '</div>';
  html +=
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">' +
    _card('#15803D', wpHtml) +
    _card('#B91C1C', peHtml) +
    '</div>';

  // Key exclusions — only top 5 most important, no full dump
  if (plan.limitations.length) {
    var keyExclusions = plan.limitations
      .filter(function (l) {
        return /\bNO\b|\bNOT\b|not cover|excluded/i.test(l);
      })
      .slice(0, 5);
    if (!keyExclusions.length) keyExclusions = plan.limitations.slice(0, 5);
    var exHtml = _label('Key Exclusions', '#B91C1C');
    keyExclusions.forEach(function (lim) {
      exHtml +=
        '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:3px;line-height:1.5;"><span style="color:#DC2626;font-weight:600;">&#10005;</span> ' +
        lim +
        '</div>';
    });
    if (plan.limitations.length > 5) {
      exHtml +=
        '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">' +
        (plan.limitations.length - 5) +
        ' more exclusions — ask Benefits AI for details</div>';
    }
    html += _card('#B91C1C', exHtml);
  }

  // Sales Notes + Compliance — from PLANS array
  if (salesPlan) {
    var salesHtml = _label('Sales Framing', 'var(--accent)');
    salesHtml +=
      '<div style="font-size:13px;color:var(--text-secondary);line-height:1.6;">' +
      salesPlan.framing +
      '</div>';
    html += _card('var(--accent)', salesHtml);

    // Compliance callout
    html +=
      '<div style="background:rgba(245,158,11,0.06);border:1.5px solid rgba(245,158,11,0.25);border-radius:var(--r-card);padding:12px 14px;margin-bottom:10px;display:flex;align-items:flex-start;gap:10px;">';
    html +=
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    html +=
      '<div style="font-size:12px;color:#92400E;line-height:1.5;">' +
      '<strong style="text-transform:uppercase;letter-spacing:.04em;">Compliance:</strong> ' +
      salesPlan.compliance +
      '</div></div>';
  }

  // Source
  html +=
    '<div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Source: ' +
    plan.source +
    '</div>';

  html += '</div>'; // body
  html += '</div>'; // card
  return html;
}

function renderPolicyResults() {
  var html = '';
  var filtered = POLICY_DOCS.filter(function (p) {
    var groupOk = policyDocFilter === 'All' || p.group === policyDocFilter;
    if (!groupOk) return false;
    if (!policyDocSearch.trim()) return true;
    var q = policyDocSearch.toLowerCase();
    var expandedTerms = expandSearchSynonyms(q);
    var searchable = (
      p.name +
      ' ' +
      p.type +
      ' ' +
      p.carrier +
      ' ' +
      p.network +
      ' ' +
      p.planNotes +
      ' ' +
      p.limitations.join(' ') +
      ' ' +
      p.benefits
        .map(function (b) {
          return b.category + ' ' + b.items.join(' ');
        })
        .join(' ') +
      ' ' +
      (p.preEx || '') +
      ' ' +
      (p.waitingPeriods || []).join(' ')
    ).toLowerCase();
    for (var t = 0; t < expandedTerms.length; t++) {
      if (brTermMatch(searchable, expandedTerms[t])) return true;
    }
    return false;
  });

  if (!filtered.length) {
    return '<div style="text-align:center;padding:40px;color:var(--text-muted);font-size:14px;">No plans match your search.</div>';
  }

  var groups = [
    { key: 'MEC', label: 'MEC Plans', color: '#5B8DEF' },
    { key: 'STM', label: 'Short-Term Medical', color: '#d97706' },
    { key: 'Limited', label: 'Limited Benefit', color: '#dc2626' }
  ];

  groups.forEach(function (grp) {
    var plans = filtered.filter(function (p) {
      return p.group === grp.key;
    });
    if (!plans.length) return;

    // Group header
    html +=
      '<div style="display:flex;align-items:center;gap:10px;margin:18px 0 10px;">';
    html +=
      '<div style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:' +
      grp.color +
      ';text-transform:uppercase;letter-spacing:.06em;">' +
      grp.label +
      '</div>';
    html += '<div style="flex:1;height:1px;background:#E5E7EB;"></div>';
    html +=
      '<span style="font-family:var(--font-ui);font-size:12px;font-weight:600;color:var(--text-muted);">' +
      plans.length +
      '</span></div>';

    // Card grid
    html +=
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin-bottom:6px;">';
    plans.forEach(function (plan) {
      var isOpen = policyDocOpen === plan.id;
      var borderColor = isOpen ? grp.color : '#C8CEDD';
      var bgColor = isOpen
        ? grp.key === 'MEC'
          ? 'rgba(91,141,239,0.04)'
          : grp.key === 'STM'
            ? 'rgba(245,158,11,0.04)'
            : 'rgba(239,68,68,0.03)'
        : '#FFFFFF';

      html +=
        '<div id="pd-' +
        plan.id +
        '" style="background:' +
        bgColor +
        ';border:2px solid ' +
        borderColor +
        ';border-radius:14px;cursor:pointer;transition:border-color 0.15s, background 0.15s;" onclick="policyDocToggle(\'' +
        plan.id +
        '\')">';
      html +=
        '<div style="padding:14px 16px;display:flex;align-items:flex-start;gap:10px;">';
      html += '<div style="flex:1;min-width:0;">';
      html +=
        '<div style="margin-bottom:6px;">' + _pdBadge(plan.group) + '</div>';
      html +=
        '<div style="font-family:var(--font-ui);font-size:15px;font-weight:700;color:var(--text-primary);line-height:1.3;margin-bottom:3px;">' +
        plan.name +
        '</div>';
      html +=
        '<div style="font-size:12px;color:var(--text-secondary);line-height:1.4;">' +
        plan.network +
        ' &middot; ' +
        plan.carrier +
        '</div>';
      html += '</div>';
      html +=
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' +
        (isOpen ? grp.color : '#9CA3AF') +
        '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:6px;transition:transform 0.2s;' +
        (isOpen ? 'transform:rotate(180deg);' : '') +
        '" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
      html += '</div></div>';
    });
    html += '</div>';

    // Expanded detail for open plan in this group
    if (policyDocOpen) {
      var openPlan = plans.filter(function (p) {
        return p.id === policyDocOpen;
      })[0];
      if (openPlan) {
        html += _pdExpandedDetail(openPlan);
      }
    }
  });

  return html;
}

function policyDocToggle(id) {
  policyDocOpen = policyDocOpen === id ? null : id;
  var container = document.getElementById('pdResultsContainer');
  if (container) container.innerHTML = renderPolicyResults();
  if (policyDocOpen) {
    // Set sticky plan context
    var plan = POLICY_DOCS.find(function (p) {
      return p.id === id;
    });
    if (plan && typeof setActivePlan === 'function') {
      setActivePlan(plan.id, plan.name, plan.group || plan.type || '');
    }
    setTimeout(function () {
      var el = document.getElementById('pd-detail-' + id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}
