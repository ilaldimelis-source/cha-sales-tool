// Add-Ons page. Reads data/addons.json as published.
// Does not register products as plans.

var AO_JSON_URL = 'data/addons.json?v=1790273000000';

var AO_STATE_NAMES = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};

var AO_PLAN_NOT_ADDON = {
  'AWA SimpleShield Plan 1 (lower tier)': true,
  'AWA SimpleShield Plan 1 (higher tier)': true,
  'AWA SimpleShield Plan 2 (lower tier)': true,
  'AWA SimpleShield Plan 2 (higher tier)': true,
  'Pinnacle Protect Plan 2-4': true
};

var aoData = null;
var aoLoadStarted = false;

function aoEsc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function aoMoney(amount) {
  return '$' + Number(amount).toFixed(2);
}

function aoHasPrice(product) {
  return (
    product.price_member !== null && typeof product.price_member !== 'undefined'
  );
}

function aoMatchState(query, codes) {
  var q = String(query || '')
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase();
  if (!q) return null;
  var i;
  if (q.length === 2) {
    for (i = 0; i < codes.length; i++) {
      if (codes[i].toLowerCase() === q) return codes[i];
    }
  }
  var hit = null;
  for (i = 0; i < codes.length; i++) {
    var name = AO_STATE_NAMES[codes[i]];
    if (!name) continue;
    if (name.toLowerCase().indexOf(q) === 0) {
      if (hit) return null;
      hit = codes[i];
    }
  }
  return hit;
}

function aoTextMatch(product, query) {
  var q = String(query || '')
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase();
  if (!q) return true;
  var hay = (
    (product.name || '') +
    ' ' +
    (product.description || '') +
    ' ' +
    (product.category || '')
  ).toLowerCase();
  return hay.indexOf(q) !== -1;
}

function aoSortProducts(list) {
  var copy = list.slice();
  copy.sort(function (a, b) {
    var aNone = !aoHasPrice(a);
    var bNone = !aoHasPrice(b);
    if (aNone !== bNone) return aNone ? 1 : -1;
    if (!aNone && a.price_member !== b.price_member) {
      return a.price_member < b.price_member ? -1 : 1;
    }
    return a._aoIndex - b._aoIndex;
  });
  return copy;
}

function aoBuildView(products, stateCode, textQuery) {
  var matched = [];
  var i;
  for (i = 0; i < products.length; i++) {
    if (textQuery && !aoTextMatch(products[i], textQuery)) continue;
    matched.push(products[i]);
  }
  if (!stateCode) {
    var open = [];
    var held = [];
    for (i = 0; i < matched.length; i++) {
      if (matched[i].on_hold) held.push(matched[i]);
      else open.push(matched[i]);
    }
    var sections = [];
    if (open.length) {
      sections.push({
        id: 'all',
        title: '',
        kind: 'cards',
        dim: false,
        items: aoSortProducts(open)
      });
    }
    if (held.length) {
      sections.push({
        id: 'hold',
        title: 'On hold',
        kind: 'cards',
        dim: true,
        items: aoSortProducts(held)
      });
    }
    return sections;
  }
  var fe = [];
  var neo = [];
  var confirmFe = [];
  var confirmNeo = [];
  var unavailable = [];
  var onHold = [];
  for (i = 0; i < matched.length; i++) {
    var product = matched[i];
    if (product.on_hold) {
      onHold.push(product);
      continue;
    }
    if (product.states === null) {
      if (product.platform === 'FirstEnroll') confirmFe.push(product);
      else confirmNeo.push(product);
      continue;
    }
    if (product.states.indexOf(stateCode) !== -1) {
      if (product.platform === 'FirstEnroll') fe.push(product);
      else neo.push(product);
    } else {
      unavailable.push(product);
    }
  }
  var stateName = AO_STATE_NAMES[stateCode] || stateCode;
  var out = [];
  if (fe.length) {
    out.push({
      id: 'fe',
      title: 'FirstEnroll - available in ' + stateName,
      kind: 'cards',
      dim: false,
      items: aoSortProducts(fe)
    });
  }
  if (neo.length) {
    out.push({
      id: 'neo',
      title: 'NEO - available in ' + stateName,
      kind: 'cards',
      dim: false,
      items: aoSortProducts(neo)
    });
  }
  if (confirmFe.length || confirmNeo.length) {
    var confirmItems = [];
    if (confirmFe.length) {
      confirmItems.push({
        platform: 'FirstEnroll',
        items: aoSortProducts(confirmFe)
      });
    }
    if (confirmNeo.length) {
      confirmItems.push({
        platform: 'NEO',
        items: aoSortProducts(confirmNeo)
      });
    }
    out.push({
      id: 'confirm',
      title: 'Confirm first',
      kind: 'confirm',
      dim: false,
      groups: confirmItems
    });
  }
  if (unavailable.length) {
    out.push({
      id: 'unavailable',
      title: 'Not available',
      kind: 'chips',
      dim: false,
      items: aoSortProducts(unavailable)
    });
  }
  if (onHold.length) {
    out.push({
      id: 'hold',
      title: 'On hold',
      kind: 'cards',
      dim: true,
      items: aoSortProducts(onHold)
    });
  }
  return out;
}

function aoTierRows(product) {
  var rows = [];
  if (!product.tiers) return rows;
  if (aoHasPrice(product)) rows.push(['Member', product.price_member]);
  if (
    product.tiers.spouse !== null &&
    typeof product.tiers.spouse !== 'undefined'
  ) {
    rows.push(['Member + Spouse', product.tiers.spouse]);
  }
  if (
    product.tiers.children !== null &&
    typeof product.tiers.children !== 'undefined'
  ) {
    rows.push(['Member + Child(ren)', product.tiers.children]);
  }
  if (
    product.tiers.family !== null &&
    typeof product.tiers.family !== 'undefined'
  ) {
    rows.push(['Family', product.tiers.family]);
  }
  return rows;
}

function aoCardHtml(product, dim) {
  var cls = 'ao-card';
  if (dim) cls += ' ao-card-hold';
  var badges =
    '<span class="ao-badge ao-badge-platform">' +
    aoEsc(product.platform) +
    '</span>';
  if (product.is_discount_program) {
    badges +=
      '<span class="ao-badge ao-badge-discount">Discount, not insurance</span>';
  }
  if (AO_PLAN_NOT_ADDON[product.name]) {
    badges +=
      '<span class="ao-badge ao-badge-plan">Limited medical plan, not an add-on</span>';
  }
  var price;
  if (aoHasPrice(product))
    price = '<p class="ao-price">' + aoMoney(product.price_member) + '</p>';
  else if (product.price_note)
    price = '<p class="ao-price-note">' + aoEsc(product.price_note) + '</p>';
  else price = '<p class="ao-price-note">Price not published</p>';
  var tiers = aoTierRows(product);
  var tierHtml = '';
  if (tiers.length) {
    tierHtml = '<ul class="ao-tiers">';
    for (var i = 0; i < tiers.length; i++) {
      tierHtml +=
        '<li><span>' +
        aoEsc(tiers[i][0]) +
        '</span><span>' +
        aoMoney(tiers[i][1]) +
        '</span></li>';
    }
    tierHtml += '</ul>';
  }
  var fee = '';
  if (
    product.enrollment_fee !== null &&
    typeof product.enrollment_fee !== 'undefined'
  ) {
    fee =
      '<p class="ao-fee">One-time enrollment fee ' +
      aoMoney(product.enrollment_fee) +
      '</p>';
  }
  return (
    '<article class="' +
    cls +
    '" data-ao-name="' +
    aoEsc(product.name) +
    '">' +
    '<div class="ao-card-top"><h3 class="ao-name">' +
    aoEsc(product.name) +
    '</h3>' +
    price +
    '</div>' +
    '<p class="ao-category">' +
    aoEsc(product.category) +
    '</p>' +
    '<div class="ao-badges">' +
    badges +
    '</div>' +
    tierHtml +
    fee +
    '</article>'
  );
}

function aoSectionHtml(section) {
  var html = '<section class="ao-section" data-ao-group="' + section.id + '">';
  if (section.title)
    html += '<h2 class="ao-section-title">' + aoEsc(section.title) + '</h2>';
  if (section.kind === 'chips') {
    html += '<div class="ao-chips">';
    for (var i = 0; i < section.items.length; i++) {
      html +=
        '<span class="ao-chip" data-ao-name="' +
        aoEsc(section.items[i].name) +
        '">' +
        aoEsc(section.items[i].name) +
        '</span>';
    }
    html += '</div></section>';
    return html;
  }
  if (section.kind === 'confirm') {
    for (var g = 0; g < section.groups.length; g++) {
      html +=
        '<h3 class="ao-subhead">' +
        aoEsc(section.groups[g].platform) +
        '</h3><div class="ao-grid">';
      for (var c = 0; c < section.groups[g].items.length; c++) {
        html += aoCardHtml(section.groups[g].items[c], false);
      }
      html += '</div>';
    }
    html += '</section>';
    return html;
  }
  html += '<div class="ao-grid">';
  for (var n = 0; n < section.items.length; n++) {
    html += aoCardHtml(section.items[n], section.dim);
  }
  html += '</div></section>';
  return html;
}

function aoStateCodes() {
  if (aoData && aoData.state_lists && aoData.state_lists.all51) {
    return aoData.state_lists.all51;
  }
  return [];
}

function aoRenderResults() {
  var box = document.getElementById('ao-results');
  if (!box) return;
  if (!aoData || !aoData.products) {
    box.innerHTML = '<p class="ao-status">Add-on list could not be loaded.</p>';
    return;
  }
  var searchEl = document.getElementById('ao-search');
  var stateEl = document.getElementById('ao-state');
  var query = searchEl ? searchEl.value : '';
  var dropdown = stateEl ? stateEl.value : '';
  var searched = aoMatchState(query, aoStateCodes());
  var stateCode = searched || dropdown || '';
  var textQuery = searched ? '' : query;
  var sections = aoBuildView(aoData.products, stateCode, textQuery);
  if (!sections.length) {
    box.innerHTML = '<p class="ao-status">No add-ons match.</p>';
    return;
  }
  var html = '';
  for (var i = 0; i < sections.length; i++) html += aoSectionHtml(sections[i]);
  box.innerHTML = html;
}

function aoFillStates() {
  var select = document.getElementById('ao-state');
  if (!select || select.getAttribute('data-ao-filled')) return;
  var codes = aoStateCodes();
  var html = '<option value="">All states</option>';
  for (var i = 0; i < codes.length; i++) {
    var code = codes[i];
    var label = AO_STATE_NAMES[code]
      ? AO_STATE_NAMES[code] + ' (' + code + ')'
      : code;
    html += '<option value="' + aoEsc(code) + '">' + aoEsc(label) + '</option>';
  }
  select.innerHTML = html;
  select.setAttribute('data-ao-filled', '1');
}

function aoOnControl() {
  aoRenderResults();
}

function renderAddons() {
  var root = document.getElementById('page-addons');
  if (!root) return;
  if (!root.getAttribute('data-ao-ready')) {
    root.innerHTML =
      '<div class="ao-page">' +
      '<header class="ao-header"><h2 class="ao-title">Add-Ons</h2>' +
      '<p class="ao-lead">Prices and state availability for enrollment add-ons.</p></header>' +
      '<div class="ao-controls">' +
      '<input id="ao-search" class="ao-search" type="search" placeholder="Search name, description, category, or a state" aria-label="Search add-ons">' +
      '<select id="ao-state" class="ao-state" aria-label="Filter by state"><option value="">All states</option></select>' +
      '</div>' +
      '<div id="ao-results"><p class="ao-status">Loading add-ons...</p></div>' +
      '</div>';
    root.setAttribute('data-ao-ready', '1');
    root.addEventListener('input', aoOnControl);
    root.addEventListener('change', aoOnControl);
  }
  if (aoData) {
    aoFillStates();
    aoRenderResults();
    return;
  }
  if (aoLoadStarted) return;
  aoLoadStarted = true;
  fetch(AO_JSON_URL)
    .then(function (response) {
      if (!response.ok) throw new Error('load failed');
      return response.json();
    })
    .then(function (data) {
      var products = data.products || [];
      for (var i = 0; i < products.length; i++) products[i]._aoIndex = i;
      aoData = data;
      aoFillStates();
      aoRenderResults();
    })
    .catch(function () {
      var box = document.getElementById('ao-results');
      if (box)
        box.innerHTML =
          '<p class="ao-status">Add-on list could not be loaded.</p>';
    });
}
