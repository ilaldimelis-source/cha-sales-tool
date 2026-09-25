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
var aoSelectedName = '';

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
    rows.push(['Member + spouse', product.tiers.spouse]);
  }
  if (
    product.tiers.children !== null &&
    typeof product.tiers.children !== 'undefined'
  ) {
    rows.push(['Member + children', product.tiers.children]);
  }
  if (
    product.tiers.family !== null &&
    typeof product.tiers.family !== 'undefined'
  ) {
    rows.push(['Family', product.tiers.family]);
  }
  return rows;
}

function aoListLabel(section) {
  if (section.id === 'fe') return 'FirstEnroll';
  if (section.id === 'neo') return 'NEO';
  if (section.id === 'confirm') return 'Confirm first';
  if (section.id === 'unavailable') return 'Not available';
  if (section.id === 'hold') return 'On hold';
  return section.title || '';
}

function aoSectionProducts(section) {
  var list = [];
  var i;
  var g;
  if (section.kind === 'confirm') {
    for (g = 0; g < section.groups.length; g++) {
      for (i = 0; i < section.groups[g].items.length; i++) {
        list.push(section.groups[g].items[i]);
      }
    }
    return list;
  }
  for (i = 0; i < section.items.length; i++) list.push(section.items[i]);
  return list;
}

function aoFirstSelectable(sections) {
  var s;
  var i;
  var products;
  for (s = 0; s < sections.length; s++) {
    if (sections[s].kind === 'chips') continue;
    products = aoSectionProducts(sections[s]);
    for (i = 0; i < products.length; i++) return products[i];
  }
  return null;
}

function aoFindProduct(name) {
  var products = aoData && aoData.products ? aoData.products : [];
  var i;
  for (i = 0; i < products.length; i++) {
    if (products[i].name === name) return products[i];
  }
  return null;
}

function aoRowHtml(product, dim) {
  var cls = 'ao-row';
  if (dim) cls += ' ao-row-hold';
  if (product.name === aoSelectedName) cls += ' ao-row-selected';
  var price = aoHasPrice(product)
    ? '<span class="ao-row-price">' + aoMoney(product.price_member) + '</span>'
    : '<span class="ao-row-price ao-row-none">No price</span>';
  return (
    '<button type="button" class="' +
    cls +
    '" data-ao-name="' +
    aoEsc(product.name) +
    '">' +
    '<span class="ao-row-copy"><span class="ao-row-name">' +
    aoEsc(product.name) +
    '</span><span class="ao-badge ao-badge-platform">' +
    aoEsc(product.platform) +
    '</span></span>' +
    price +
    '</button>'
  );
}

function aoUnavailableHtml(product) {
  return (
    '<div class="ao-unavailable" data-ao-name="' +
    aoEsc(product.name) +
    '">' +
    aoEsc(product.name) +
    '</div>'
  );
}

function aoListHtml(sections) {
  var html = '';
  var s;
  var i;
  var products;
  var label;
  for (s = 0; s < sections.length; s++) {
    label = aoListLabel(sections[s]);
    html += '<section class="ao-group" data-ao-group="' + sections[s].id + '">';
    if (label) html += '<h2 class="ao-divider">' + aoEsc(label) + '</h2>';
    products = aoSectionProducts(sections[s]);
    if (sections[s].kind === 'chips') {
      for (i = 0; i < products.length; i++)
        html += aoUnavailableHtml(products[i]);
    } else {
      for (i = 0; i < products.length; i++) {
        html += aoRowHtml(products[i], sections[s].dim);
      }
    }
    html += '</section>';
  }
  return html;
}

function aoStateNames(codes) {
  var names = [];
  var i;
  for (i = 0; i < codes.length; i++) {
    names.push(AO_STATE_NAMES[codes[i]] || codes[i]);
  }
  return names.join(', ');
}

function aoMissingStates(product) {
  var all = aoStateCodes();
  var missing = [];
  var i;
  for (i = 0; i < all.length; i++) {
    if (product.states.indexOf(all[i]) === -1) missing.push(all[i]);
  }
  return missing;
}

function aoDetailHtml(product) {
  if (!product) {
    return '<p class="ao-status">No add-on is selected.</p>';
  }
  var badges =
    '<span class="ao-badge ao-badge-platform">' +
    aoEsc(product.platform) +
    '</span><span class="ao-badge ao-badge-category">' +
    aoEsc(product.category) +
    '</span>';
  if (product.is_discount_program) {
    badges +=
      '<span class="ao-badge ao-badge-discount">Discount, not insurance</span>';
  }
  if (AO_PLAN_NOT_ADDON[product.name]) {
    badges +=
      '<span class="ao-badge ao-badge-plan">Limited medical plan, not an add-on</span>';
  }
  if (product.on_hold) {
    badges += '<span class="ao-badge ao-badge-hold">On hold</span>';
  }
  var priceBlock;
  if (aoHasPrice(product)) {
    priceBlock =
      '<div class="ao-detail-price"><p class="ao-detail-amount">' +
      aoMoney(product.price_member) +
      '</p><p class="ao-detail-period">per month, Member</p></div>';
  } else {
    priceBlock = '';
  }
  var body;
  if (!aoHasPrice(product)) {
    body =
      '<p class="ao-detail-unpublished">' +
      aoEsc(product.price_note || 'Price not published') +
      '</p>';
  } else {
    var tiers = aoTierRows(product);
    var feeSet =
      product.enrollment_fee !== null &&
      typeof product.enrollment_fee !== 'undefined';
    if (!tiers.length && !feeSet) {
      body = '';
    } else {
      body = '<table class="ao-table"><tbody>';
      var i;
      for (i = 0; i < tiers.length; i++) {
        body +=
          '<tr><th scope="row">' +
          aoEsc(tiers[i][0]) +
          '</th><td>' +
          aoMoney(tiers[i][1]) +
          '</td></tr>';
      }
      if (feeSet) {
        body +=
          '<tr class="ao-fee-row"><th scope="row">One-time enrollment fee</th><td>' +
          aoMoney(product.enrollment_fee) +
          '</td></tr>';
      }
      body += '</tbody></table>';
    }
  }
  var states;
  if (product.states === null) {
    states =
      '<p class="ao-availability-missing">No availability given in the source. Confirm on the platform before quoting.</p>';
  } else {
    var missing = aoMissingStates(product);
    states =
      '<h3 class="ao-detail-label">Available in</h3><p class="ao-availability">' +
      aoEsc(aoStateNames(product.states)) +
      '</p>';
    if (missing.length) {
      states +=
        '<p class="ao-availability-off">Not available in ' +
        aoEsc(aoStateNames(missing)) +
        '.</p>';
    }
  }
  return (
    '<button type="button" class="ao-back" data-ao-back="1">Back to list</button>' +
    '<div class="ao-detail-top"><div><h2 class="ao-detail-name">' +
    aoEsc(product.name) +
    '</h2><div class="ao-badges">' +
    badges +
    '</div></div>' +
    priceBlock +
    '</div><p class="ao-description">' +
    aoEsc(product.description || '') +
    '</p>' +
    body +
    states
  );
}

function aoStateCodes() {
  if (aoData && aoData.state_lists && aoData.state_lists.all51) {
    return aoData.state_lists.all51;
  }
  return [];
}

function aoCurrentView() {
  var searchEl = document.getElementById('ao-search');
  var stateEl = document.getElementById('ao-state');
  var query = searchEl ? searchEl.value : '';
  var dropdown = stateEl ? stateEl.value : '';
  var searched = aoMatchState(query, aoStateCodes());
  var stateCode = searched || dropdown || '';
  var textQuery = searched ? '' : query;
  return aoBuildView(aoData.products, stateCode, textQuery);
}

function aoMarkSelection() {
  var rows = document.querySelectorAll('#ao-list .ao-row');
  var i;
  for (i = 0; i < rows.length; i++) {
    if (rows[i].getAttribute('data-ao-name') === aoSelectedName) {
      rows[i].className +=
        rows[i].className.indexOf('ao-row-selected') === -1
          ? ' ao-row-selected'
          : '';
    } else {
      rows[i].className = rows[i].className
        .replace(' ao-row-selected', '')
        .replace('ao-row-selected', '');
    }
  }
}

function aoShowDetail(openMobile) {
  var pane = document.getElementById('ao-detail');
  var page = document.querySelector('#page-addons .ao-page');
  if (pane) pane.innerHTML = aoDetailHtml(aoFindProduct(aoSelectedName));
  aoMarkSelection();
  if (!page) return;
  if (openMobile && window.matchMedia('(max-width: 900px)').matches) {
    page.className +=
      page.className.indexOf('ao-show-detail') === -1 ? ' ao-show-detail' : '';
  }
}

function aoRenderResults() {
  var list = document.getElementById('ao-list');
  var pane = document.getElementById('ao-detail');
  if (!list || !pane) return;
  if (!aoData || !aoData.products) {
    list.innerHTML = '';
    pane.innerHTML =
      '<p class="ao-status">Add-on list could not be loaded.</p>';
    return;
  }
  var sections = aoCurrentView();
  var page = document.querySelector('#page-addons .ao-page');
  if (page) {
    page.className = page.className
      .replace(' ao-show-detail', '')
      .replace('ao-show-detail', '');
  }
  if (!sections.length) {
    aoSelectedName = '';
    list.innerHTML = '<p class="ao-status">No add-ons match.</p>';
    pane.innerHTML = '<p class="ao-status">No add-on is selected.</p>';
    return;
  }
  var first = aoFirstSelectable(sections);
  aoSelectedName = first ? first.name : '';
  list.innerHTML = aoListHtml(sections);
  pane.innerHTML = aoDetailHtml(first);
}

function aoOnListClick(event) {
  var node = event.target;
  while (node && node !== event.currentTarget) {
    if (node.getAttribute && node.getAttribute('data-ao-back') === '1') {
      var page = document.querySelector('#page-addons .ao-page');
      if (page) {
        page.className = page.className
          .replace(' ao-show-detail', '')
          .replace('ao-show-detail', '');
      }
      return;
    }
    if (
      node.tagName === 'BUTTON' &&
      node.getAttribute('data-ao-name') &&
      node.className.indexOf('ao-row') !== -1
    ) {
      aoSelectedName = node.getAttribute('data-ao-name');
      aoShowDetail(true);
      return;
    }
    node = node.parentNode;
  }
}

function aoOnListKey(event) {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  var list = document.getElementById('ao-list');
  if (!list || !list.contains(event.target)) return;
  var rows = list.querySelectorAll('button.ao-row');
  var index = -1;
  var i;
  for (i = 0; i < rows.length; i++) {
    if (rows[i] === document.activeElement) index = i;
  }
  if (index < 0) return;
  var next = event.key === 'ArrowDown' ? index + 1 : index - 1;
  if (next < 0 || next >= rows.length) return;
  event.preventDefault();
  rows[next].focus();
  aoSelectedName = rows[next].getAttribute('data-ao-name');
  aoShowDetail(false);
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
      '<div class="ao-split">' +
      '<div id="ao-list" class="ao-list" aria-label="Add-on list"><p class="ao-status">Loading add-ons...</p></div>' +
      '<div id="ao-detail" class="ao-detail" aria-live="polite"><p class="ao-status">Loading add-ons...</p></div>' +
      '</div></div>';
    root.setAttribute('data-ao-ready', '1');
    root.addEventListener('input', aoOnControl);
    root.addEventListener('change', aoOnControl);
    root.addEventListener('click', aoOnListClick);
    root.addEventListener('keydown', aoOnListKey);
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
      var list = document.getElementById('ao-list');
      var pane = document.getElementById('ao-detail');
      if (list) list.innerHTML = '';
      if (pane)
        pane.innerHTML =
          '<p class="ao-status">Add-on list could not be loaded.</p>';
    });
}
