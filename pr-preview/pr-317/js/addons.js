// Add-Ons page. Reads data/addons.json as published.
// Does not register products as plans.

var AO_JSON_URL = 'data/addons.json?v=1790682000000';

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

var AO_DISCOUNT_LINE =
  'This is a discount program, not insurance. It does not pay a claim and does not go toward a deductible.';

var AO_CATEGORY_EXPLANATION = {
  'Accident (AME)':
    'Helps pay eligible medical expenses resulting from a covered accident.',
  'AD&D':
    'Pays a benefit for a covered accidental death or qualifying loss, such as loss of a limb or eyesight.',
  'Critical illness':
    "Pays a benefit following a covered critical illness diagnosis, subject to the policy's terms and covered conditions."
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

var aoPlatformFilter = 'both';
var aoStateFromSearch = false;

function aoBuildView(products, stateCode, textQuery, platform) {
  var matched = [];
  var i;
  for (i = 0; i < products.length; i++) {
    if (platform && platform !== 'both' && products[i].platform !== platform) {
      continue;
    }
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

function aoFindProduct(name) {
  var products = aoData && aoData.products ? aoData.products : [];
  var i;
  for (i = 0; i < products.length; i++) {
    if (products[i].name === name) return products[i];
  }
  return null;
}

function aoMarkerHtml(product) {
  var html = '';
  if (product.is_discount_program) {
    html +=
      '<span class="ao-badge ao-badge-discount">Discount, not insurance</span>';
  }
  if (AO_PLAN_NOT_ADDON[product.name]) {
    html +=
      '<span class="ao-badge ao-badge-plan">Limited medical plan, not an add-on</span>';
  }
  return html;
}

function aoRowHtml(product, dim) {
  var cls = 'ao-row';
  if (dim) cls += ' ao-row-hold';
  if (product.name === aoSelectedName) cls += ' ao-row-selected';
  var price = aoHasPrice(product)
    ? '<span class="ao-row-price">' + aoMoney(product.price_member) + '</span>'
    : '<span class="ao-row-price ao-row-none">No price</span>';
  var markers = aoMarkerHtml(product);
  return (
    '<button type="button" class="' +
    cls +
    '" data-ao-name="' +
    aoEsc(product.name) +
    '">' +
    '<span class="ao-row-copy"><span class="ao-row-name">' +
    aoEsc(product.name) +
    '</span>' +
    (markers ? '<span class="ao-badges">' + markers + '</span>' : '') +
    '<span class="ao-badge ao-badge-platform">' +
    aoEsc(product.platform) +
    '</span></span>' +
    price +
    '</button>'
  );
}

function aoTierBits(product) {
  var bits = [];
  var tiers = product.tiers || {};
  var feeSet =
    product.enrollment_fee !== null &&
    typeof product.enrollment_fee !== 'undefined';
  if (tiers.spouse !== null && typeof tiers.spouse !== 'undefined') {
    bits.push('Spouse ' + aoMoney(tiers.spouse));
  }
  if (tiers.children !== null && typeof tiers.children !== 'undefined') {
    bits.push('Children ' + aoMoney(tiers.children));
  }
  if (tiers.family !== null && typeof tiers.family !== 'undefined') {
    bits.push('Family ' + aoMoney(tiers.family));
  }
  if (feeSet) bits.push(aoMoney(product.enrollment_fee) + ' fee');
  return bits;
}

function aoColRowHtml(product) {
  var cls = 'ao-row ao-col-row';
  var marker = '';
  var price;
  var bits;
  var line;
  if (product.name === aoSelectedName) cls += ' ao-row-selected';
  if (AO_PLAN_NOT_ADDON[product.name]) {
    marker =
      '<span class="ao-badges"><span class="ao-badge ao-badge-plan">Limited medical plan, not an add-on</span></span>';
  }
  if (aoHasPrice(product)) {
    price =
      '<span class="ao-col-price">' + aoMoney(product.price_member) + '</span>';
  } else {
    price =
      '<span class="ao-col-price ao-col-price-note">' +
      aoEsc(product.price_note || 'Price not published') +
      '</span>';
  }
  bits = aoTierBits(product);
  if (product.is_discount_program) {
    line =
      '<span class="ao-line2"><span class="ao-line-discount">Discount, not insurance</span>';
    if (bits.length) {
      line +=
        '<span class="ao-line-muted"> \u00b7 ' +
        aoEsc(bits.join(' \u00b7 ')) +
        '</span>';
    }
    line += '</span>';
  } else {
    line =
      '<span class="ao-line2 ao-line-muted">' +
      aoEsc([product.category].concat(bits).join(' \u00b7 ')) +
      '</span>';
  }
  return (
    '<button type="button" class="' +
    cls +
    '" data-ao-name="' +
    aoEsc(product.name) +
    '"><span class="ao-col-main"><span class="ao-col-titleline"><span class="ao-row-name">' +
    aoEsc(product.name) +
    '</span>' +
    marker +
    '</span>' +
    line +
    '</span>' +
    price +
    '</button>'
  );
}

function aoColTone(label) {
  if (label === 'FirstEnroll') return 'ao-col-fe';
  if (label === 'NEO') return 'ao-col-neo';
  return '';
}

function aoColHtml(label, items) {
  var html = '';
  var i;
  html +=
    '<section class="ao-col ' +
    aoColTone(label) +
    '" data-ao-table="' +
    aoEsc(label) +
    '" data-ao-count="' +
    items.length +
    '">';
  html +=
    '<div class="ao-col-head"><h2 class="ao-col-title">' +
    aoEsc(label) +
    '</h2><p class="ao-col-count">' +
    items.length +
    '</p></div><div class="ao-col-body">';
  for (i = 0; i < items.length; i++) html += aoColRowHtml(items[i]);
  html += '</div></section>';
  return html;
}

function aoIsAvailableTable(section) {
  return section.kind === 'cards' && !section.dim;
}

function aoTablesForSection(section) {
  var products = section.items || [];
  var fe = [];
  var neo = [];
  var i;
  var label;
  var tables = [];
  if (section.id !== 'all' || aoPlatformFilter !== 'both') {
    label = aoListLabel(section);
    if (!label) {
      label = aoPlatformFilter === 'both' ? 'Add-ons' : aoPlatformFilter;
    }
    return [{ label: label, items: products }];
  }
  for (i = 0; i < products.length; i++) {
    if (products[i].platform === 'FirstEnroll') fe.push(products[i]);
    else neo.push(products[i]);
  }
  if (fe.length) tables.push({ label: 'FirstEnroll', items: fe });
  if (neo.length) tables.push({ label: 'NEO', items: neo });
  return tables;
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
  var rest = '';
  var pending = [];
  var s;
  var i;
  var t;
  var products;
  var label;
  var tables;
  function flushCols() {
    var block = '';
    var n;
    var cls;
    if (!pending.length) return '';
    cls = 'ao-cols';
    if (pending.length === 1) cls += ' ao-cols-one';
    block += '<div class="' + cls + '">';
    for (n = 0; n < pending.length; n++) {
      block += aoColHtml(pending[n].label, pending[n].items);
    }
    block += '</div>';
    pending = [];
    return block;
  }
  for (s = 0; s < sections.length; s++) {
    if (aoIsAvailableTable(sections[s])) {
      tables = aoTablesForSection(sections[s]);
      for (t = 0; t < tables.length; t++) {
        if (!tables[t].items.length) continue;
        pending.push(tables[t]);
      }
      continue;
    }
    html += flushCols();
    products = aoSectionProducts(sections[s]);
    if (!products.length) continue;
    label = aoListLabel(sections[s]);
    rest += '<section class="ao-group" data-ao-group="' + sections[s].id + '">';
    if (label) rest += '<h2 class="ao-divider">' + aoEsc(label) + '</h2>';
    if (sections[s].kind === 'chips') {
      for (i = 0; i < products.length; i++)
        rest += aoUnavailableHtml(products[i]);
    } else {
      for (i = 0; i < products.length; i++) {
        rest += aoRowHtml(products[i], sections[s].dim);
      }
    }
    rest += '</section>';
  }
  html += flushCols();
  if (rest) html += '<div class="ao-rest">' + rest + '</div>';
  return html;
}

function aoHasDescription(product) {
  if (
    !product ||
    product.description === null ||
    typeof product.description === 'undefined'
  ) {
    return false;
  }
  return String(product.description).replace(/^\s+|\s+$/g, '') !== '';
}

function aoStateBlock(product) {
  if (product.states === null) {
    return '<p class="ao-availability-missing">No availability given in the source. Confirm on the platform before quoting.</p>';
  }
  return '';
}

function aoDetailHtml(product) {
  var html;
  var explain;
  var feeSet;
  if (!product) return '';
  html = '';
  if (product.is_discount_program) {
    html += '<p class="ao-discount-note">' + aoEsc(AO_DISCOUNT_LINE) + '</p>';
  }
  html +=
    '<div class="ao-panel-top"><h2 class="ao-detail-name">' +
    aoEsc(product.name) +
    '</h2><button type="button" class="ao-panel-close" data-ao-close="1">Close</button></div>';
  html +=
    '<div class="ao-badges"><span class="ao-badge ao-badge-platform">' +
    aoEsc(product.platform) +
    '</span><span class="ao-badge ao-badge-category">' +
    aoEsc(product.category) +
    '</span></div>';
  explain = AO_CATEGORY_EXPLANATION[product.category];
  if (explain) {
    html +=
      '<h3 class="ao-detail-label">WHAT THIS IS</h3><p class="ao-explain">' +
      aoEsc(explain) +
      '</p>';
  }
  if (aoHasDescription(product)) {
    html += '<p class="ao-description">' + aoEsc(product.description) + '</p>';
  }
  feeSet =
    product.enrollment_fee !== null &&
    typeof product.enrollment_fee !== 'undefined';
  if (feeSet) {
    html +=
      '<p class="ao-fee-line">One-time enrollment fee ' +
      aoMoney(product.enrollment_fee) +
      '</p>';
  }
  html += aoStateBlock(product);
  return html;
}

function aoStateCodes() {
  if (aoData && aoData.state_lists && aoData.state_lists.all51) {
    return aoData.state_lists.all51;
  }
  return [];
}

function aoViewQuery() {
  var searchEl = document.getElementById('ao-search');
  var stateEl = document.getElementById('ao-state');
  var query = searchEl ? searchEl.value : '';
  var dropdown = stateEl ? stateEl.value : '';
  var searched = aoMatchState(query, aoStateCodes());
  return {
    stateCode: searched || dropdown || '',
    textQuery: searched ? '' : query
  };
}

function aoEmptyPlatformMessage(stateCode) {
  var other = aoPlatformFilter === 'NEO' ? 'FirstEnroll' : 'NEO';
  var stateName = stateCode ? AO_STATE_NAMES[stateCode] || stateCode : '';
  if (stateName) {
    return (
      'No ' +
      aoPlatformFilter +
      ' add-ons for ' +
      stateName +
      '. ' +
      other +
      ' may still have add-ons for this state.'
    );
  }
  return (
    'No ' + aoPlatformFilter + ' add-ons. ' + other + ' may still have add-ons.'
  );
}

function aoCurrentView() {
  var query = aoViewQuery();
  return {
    stateCode: query.stateCode,
    sections: aoBuildView(
      aoData.products,
      query.stateCode,
      query.textQuery,
      aoPlatformFilter
    )
  };
}

function aoSetToken(el, token, on) {
  var padded = ' ' + el.className + ' ';
  var has = padded.indexOf(' ' + token + ' ') !== -1;
  if (on && !has) el.className += ' ' + token;
  if (!on && has) {
    el.className = padded
      .replace(' ' + token + ' ', ' ')
      .replace(/^\s+|\s+$/g, '');
  }
}

function aoMarkSelection() {
  var rows = document.querySelectorAll(
    '#ao-list .ao-grid-row, #ao-list .ao-row'
  );
  var i;
  var token;
  for (i = 0; i < rows.length; i++) {
    token =
      rows[i].className.indexOf('ao-grid-row') !== -1
        ? 'ao-grid-row-on'
        : 'ao-row-selected';
    aoSetToken(
      rows[i],
      token,
      rows[i].getAttribute('data-ao-name') === aoSelectedName
    );
  }
}

function aoOpenPanel() {
  var pane = document.getElementById('ao-detail');
  var product = aoFindProduct(aoSelectedName);
  if (!pane) return;
  if (!product) {
    aoClosePanel();
    return;
  }
  pane.innerHTML = aoDetailHtml(product);
  aoSetToken(pane, 'ao-panel-open', true);
  aoMarkSelection();
}

function aoClosePanel() {
  var pane = document.getElementById('ao-detail');
  aoSelectedName = '';
  if (pane) {
    pane.innerHTML = '';
    aoSetToken(pane, 'ao-panel-open', false);
  }
  aoMarkSelection();
}

function aoProductInSections(sections, name) {
  var s;
  var products;
  var i;
  for (s = 0; s < sections.length; s++) {
    if (sections[s].kind === 'chips') continue;
    products = aoSectionProducts(sections[s]);
    for (i = 0; i < products.length; i++) {
      if (products[i].name === name) return true;
    }
  }
  return false;
}

function aoRenderResults() {
  var list = document.getElementById('ao-list');
  var pane = document.getElementById('ao-detail');
  if (!list || !pane) return;
  if (!aoData || !aoData.products) {
    list.innerHTML =
      '<p class="ao-status">Add-on list could not be loaded.</p>';
    aoClosePanel();
    return;
  }
  var view = aoCurrentView();
  var sections = view.sections;
  var emptyText;
  if (!sections.length) {
    emptyText = 'No add-ons match.';
    if (aoPlatformFilter !== 'both') {
      emptyText = aoEmptyPlatformMessage(view.stateCode);
    }
    list.innerHTML = '<p class="ao-status">' + aoEsc(emptyText) + '</p>';
    aoSyncLead();
    aoClosePanel();
    return;
  }
  if (aoSelectedName && !aoProductInSections(sections, aoSelectedName)) {
    aoSelectedName = '';
  }
  list.innerHTML = aoListHtml(sections);
  aoSyncLead();
  if (aoSelectedName) aoOpenPanel();
  else aoClosePanel();
}

function aoOnListClick(event) {
  var node = event.target;
  while (node && node !== event.currentTarget) {
    if (node.getAttribute && node.getAttribute('data-ao-clear-state') === '1') {
      aoClearState();
      return;
    }
    if (node.getAttribute && node.getAttribute('data-ao-platform')) {
      aoPlatformFilter = node.getAttribute('data-ao-platform');
      var pills = document.querySelectorAll('#page-addons [data-ao-platform]');
      var p;
      for (p = 0; p < pills.length; p++) {
        if (pills[p] === node) {
          if (pills[p].className.indexOf('active') === -1) {
            pills[p].className += ' active';
          }
        } else {
          pills[p].className = pills[p].className
            .replace(' active', '')
            .replace('active', '');
        }
      }
      aoRenderResults();
      return;
    }
    if (node.getAttribute && node.getAttribute('data-ao-close') === '1') {
      aoClosePanel();
      return;
    }
    if (node.getAttribute && node.getAttribute('data-ao-name')) {
      var rowCls = node.className || '';
      if (
        rowCls.indexOf('ao-grid-row') !== -1 ||
        (node.tagName === 'BUTTON' && rowCls.indexOf('ao-row') !== -1)
      ) {
        aoSelectedName = node.getAttribute('data-ao-name');
        aoOpenPanel();
        return;
      }
    }
    node = node.parentNode;
  }
}

function aoFocusableRows() {
  var list = document.getElementById('ao-list');
  if (!list) return [];
  return list.querySelectorAll('tr.ao-grid-row, button.ao-row');
}

function aoOnListKey(event) {
  var rows;
  var index;
  var i;
  var next;
  var target;
  var list;
  if (event.key === 'Escape') {
    if (!aoSelectedName) return;
    aoClosePanel();
    return;
  }
  target = event.target;
  if (event.key === 'Enter' || event.key === ' ') {
    if (
      !target ||
      !target.className ||
      target.className.indexOf('ao-grid-row') === -1
    ) {
      return;
    }
    event.preventDefault();
    aoSelectedName = target.getAttribute('data-ao-name');
    aoOpenPanel();
    return;
  }
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  list = document.getElementById('ao-list');
  if (!list || !list.contains(event.target)) return;
  rows = aoFocusableRows();
  index = -1;
  for (i = 0; i < rows.length; i++) {
    if (rows[i] === document.activeElement) index = i;
  }
  if (index < 0) return;
  next = event.key === 'ArrowDown' ? index + 1 : index - 1;
  if (next < 0 || next >= rows.length) return;
  event.preventDefault();
  rows[next].focus();
  if (aoSelectedName) {
    aoSelectedName = rows[next].getAttribute('data-ao-name');
    aoOpenPanel();
  }
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

function aoSyncStateChrome(event) {
  var searchEl = document.getElementById('ao-search');
  var stateEl = document.getElementById('ao-state');
  var target = event && event.target;
  var searched;
  if (!searchEl || !stateEl) return;
  if (target && target === stateEl) {
    aoStateFromSearch = false;
    return;
  }
  searched = aoMatchState(searchEl.value, aoStateCodes());
  if (searched) {
    stateEl.value = searched;
    aoStateFromSearch = true;
    return;
  }
  if (
    !String(searchEl.value || '').replace(/^\s+|\s+$/g, '') &&
    aoStateFromSearch
  ) {
    stateEl.value = '';
    aoStateFromSearch = false;
  }
}

function aoSyncLead() {
  var lead = document.getElementById('ao-lead');
  var code;
  var name;
  if (!lead) return;
  code = aoViewQuery().stateCode;
  name = code ? AO_STATE_NAMES[code] || code : '';
  if (!name) {
    lead.className = 'ao-lead';
    lead.textContent = 'Prices and state availability for enrollment add-ons.';
    return;
  }
  lead.className = 'ao-lead ao-lead-on';
  lead.innerHTML =
    'Showing add-ons available in ' +
    aoEsc(name) +
    ' <button type="button" class="ao-state-clear" data-ao-clear-state="1">Clear</button>';
}

function aoClearState() {
  var searchEl = document.getElementById('ao-search');
  var stateEl = document.getElementById('ao-state');
  if (searchEl && aoMatchState(searchEl.value, aoStateCodes())) {
    searchEl.value = '';
  }
  if (stateEl) stateEl.value = '';
  aoStateFromSearch = false;
  aoRenderResults();
}

function aoOnControl(event) {
  aoSyncStateChrome(event);
  aoRenderResults();
}

function renderAddons() {
  var root = document.getElementById('page-addons');
  if (!root) return;
  if (!root.getAttribute('data-ao-ready')) {
    root.innerHTML =
      '<div class="ao-page">' +
      '<header class="ao-header"><h2 class="ao-title">Add-Ons</h2>' +
      '<p id="ao-lead" class="ao-lead">Prices and state availability for enrollment add-ons.</p></header>' +
      '<div class="ao-controls">' +
      '<input id="ao-search" class="ao-search" type="search" placeholder="Search name, description, category, or a state" aria-label="Search add-ons">' +
      '<select id="ao-state" class="ao-state" aria-label="Filter by state"><option value="">All states</option></select>' +
      '<div class="ao-platforms" role="group" aria-label="Filter by platform">' +
      '<button type="button" class="stab active" data-ao-platform="both">Both</button>' +
      '<button type="button" class="stab" data-ao-platform="FirstEnroll">FirstEnroll</button>' +
      '<button type="button" class="stab" data-ao-platform="NEO">NEO</button>' +
      '</div>' +
      '</div>' +
      '<div class="ao-split">' +
      '<div id="ao-list" class="ao-list" aria-label="Add-on list"><p class="ao-status">Loading add-ons...</p></div>' +
      '<div id="ao-detail" class="ao-detail ao-panel" aria-live="polite"></div>' +
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
      if (list) {
        list.innerHTML =
          '<p class="ao-status">Add-on list could not be loaded.</p>';
      }
      aoClosePanel();
    });
}
