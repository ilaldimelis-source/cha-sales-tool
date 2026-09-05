// office.js - Office tab (manager-only inbound call tracker)
// Must load BEFORE js/app.js so PAGE_CONFIG can reference renderOfficeCalls.
var OFFICE_STORE_KEY = 'cha_office_calls_v1';
var OFFICE_RETAIN_DAYS = 730;
var OFFICE_ID_RETAIN_DAYS = 365;
// contact = counts toward Contacts (denominator of close rate)
// sold = counts toward Sold
// pin = shown as one of the 9 main tiles
var OFFICE_DISPOS = [
  { d: 'Dead Air / Hung Up', contact: false, sold: false, pin: true },
  { d: 'Needs Major Med', contact: true, sold: false, pin: true },
  { d: "Can't Afford", contact: true, sold: false, pin: true },
  { d: 'Not Interested', contact: true, sold: false, pin: true },
  { d: 'Pitched to Payment - No Sale', contact: true, sold: false, pin: true },
  { d: 'Medicaid / ACA', contact: true, sold: false, pin: true },
  { d: 'Requested Callback', contact: true, sold: false, pin: true },
  { d: 'Sale', contact: true, sold: true, pin: true },
  { d: 'Post Date', contact: true, sold: true, pin: true },
  { d: 'No Answer', contact: false, sold: false, pin: false },
  { d: 'Answering Machine', contact: false, sold: false, pin: false },
  { d: 'Bad Phone Number', contact: false, sold: false, pin: false },
  { d: 'Customer Disconnected', contact: false, sold: false, pin: false },
  { d: 'Wrong Number', contact: false, sold: false, pin: false },
  { d: 'Hung Up in Pre-Qual/Sizzle', contact: false, sold: false, pin: false },
  { d: 'Needs To Speak With Spouse', contact: true, sold: false, pin: false },
  { d: 'Future Call Back', contact: true, sold: false, pin: false },
  { d: 'Already Purchased', contact: true, sold: false, pin: false },
  { d: 'Vision Only', contact: true, sold: false, pin: false },
  { d: 'Dental Only', contact: true, sold: false, pin: false },
  { d: 'Do NOT Call', contact: true, sold: false, pin: false },
  { d: 'Transferred to Spanish', contact: true, sold: false, pin: false },
  {
    d: 'Transferred to Customer Service',
    contact: true,
    sold: false,
    pin: false
  },
  { d: 'Front Transfer', contact: true, sold: false, pin: false }
];
var OFFICE_MAP = {};
(function () {
  var i;
  for (i = 0; i < OFFICE_DISPOS.length; i++) {
    OFFICE_MAP[OFFICE_DISPOS[i].d] = OFFICE_DISPOS[i];
  }
})();
var _ofcDate = '';
var _ofcPeriod = 'day';
var _ofcMoreOpen = false;
var _ofcNoteTimer = null;
var _ofcPhone = '';
var _ofcRangeStart = '';
var _ofcRangeEnd = '';
var _ofcQuotaHit = false;
function _ofcEsc(s) {
  if (typeof escHTML === 'function') {
    return escHTML(String(s == null ? '' : s));
  }
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function _ofcIso(d) {
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  );
}
function _ofcToday() {
  return _ofcIso(new Date());
}
function _ofcParse(iso) {
  var p = iso.split('-');
  return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
}
function _ofcShift(iso, days) {
  var d = _ofcParse(iso);
  d.setDate(d.getDate() + days);
  return _ofcIso(d);
}
function _ofcRange() {
  var d = _ofcParse(_ofcDate);
  var start, end;
  if (_ofcPeriod === 'week') {
    var off = (d.getDay() + 6) % 7;
    start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - off);
    end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
  } else if (_ofcPeriod === 'month') {
    start = new Date(d.getFullYear(), d.getMonth(), 1);
    end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  } else if (_ofcPeriod === 'range') {
    start = _ofcParse(_ofcRangeStart || _ofcToday());
    end = _ofcParse(_ofcRangeEnd || _ofcToday());
    if (end < start) {
      var swap = start;
      start = end;
      end = swap;
    }
  } else {
    start = d;
    end = d;
  }
  return { s: _ofcIso(start), e: _ofcIso(end) };
}
function _ofcRangeLabel() {
  var mons = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var r = _ofcRange();
  var s = _ofcParse(r.s);
  var e = _ofcParse(r.e);
  if (_ofcPeriod === 'day') {
    if (_ofcDate === _ofcToday()) return 'Today';
    return days[s.getDay()] + ', ' + mons[s.getMonth()] + ' ' + s.getDate();
  }
  if (_ofcPeriod === 'month') {
    return mons[s.getMonth()] + ' ' + s.getFullYear();
  }
  if (_ofcPeriod === 'range') {
    return (
      mons[s.getMonth()] +
      ' ' +
      s.getDate() +
      ' - ' +
      mons[e.getMonth()] +
      ' ' +
      e.getDate()
    );
  }
  return (
    mons[s.getMonth()] +
    ' ' +
    s.getDate() +
    ' - ' +
    mons[e.getMonth()] +
    ' ' +
    e.getDate()
  );
}
function _ofcStepDays() {
  if (_ofcPeriod === 'week') return 7;
  if (_ofcPeriod === 'month') return 0;
  return 1;
}
function _ofcStep(dir) {
  if (_ofcPeriod === 'month') {
    var d = _ofcParse(_ofcDate);
    d.setDate(1);
    d.setMonth(d.getMonth() + dir);
    _ofcDate = _ofcIso(d);
    return;
  }
  _ofcDate = _ofcShift(_ofcDate, dir * _ofcStepDays());
}
function _ofcLoad() {
  var o = null;
  try {
    if (typeof chaGet === 'function') {
      o = chaGet(OFFICE_STORE_KEY, null);
    }
  } catch (_e) {
    o = null;
  }
  if (!o || typeof o !== 'object') return { _v: 2 };
  if (o._v === 2) return o;
  var keys = Object.keys(o);
  var i, j, rows, out;
  for (i = 0; i < keys.length; i++) {
    if (keys[i] === '_v') continue;
    rows = o[keys[i]];
    if (Object.prototype.toString.call(rows) !== '[object Array]') continue;
    out = [];
    for (j = 0; j < rows.length; j++) {
      if (_ofcIsEncoded(rows[j])) {
        out.push(rows[j]);
      } else {
        out.push(_ofcEncode(rows[j]));
      }
    }
    o[keys[i]] = out;
  }
  o._v = 2;
  return o;
}
function _ofcSave(store) {
  var cutoff = _ofcShift(_ofcToday(), -OFFICE_RETAIN_DAYS);
  var idCutoff = _ofcShift(_ofcToday(), -OFFICE_ID_RETAIN_DAYS);
  var keys = Object.keys(store);
  var i, j, rows;
  for (i = 0; i < keys.length; i++) {
    if (keys[i] < cutoff) {
      delete store[keys[i]];
      continue;
    }
    if (keys[i] < idCutoff) {
      rows = store[keys[i]];
      if (Object.prototype.toString.call(rows) === '[object Array]') {
        for (j = 0; j < rows.length; j++) {
          if (_ofcIsEncoded(rows[j])) {
            if (rows[j].length > 2) rows[j] = [rows[j][0], rows[j][1]];
          } else {
            if (rows[j].p) rows[j].p = '';
            if (rows[j].lid) rows[j].lid = '';
            if (rows[j].n) rows[j].n = '';
          }
        }
      }
    }
  }
  try {
    if (typeof chaSet === 'function') chaSet(OFFICE_STORE_KEY, store);
    _ofcQuotaHit = false;
  } catch (_e) {
    _ofcQuotaHit = true;
  }
}
function _ofcDigits(v) {
  return String(v || '').replace(/[^0-9]/g, '');
}
function _ofcIsPhone(v) {
  var n = _ofcDigits(v).length;
  return n === 10 || n === 11;
}
function _ofcDispoIndex(label) {
  var i;
  for (i = 0; i < OFFICE_DISPOS.length; i++) {
    if (OFFICE_DISPOS[i].d === label) return i;
  }
  return -1;
}
function _ofcEncode(row) {
  var mins = 0;
  var dt;
  if (typeof row.t === 'number') {
    dt = new Date(row.t);
    mins = dt.getHours() * 60 + dt.getMinutes();
  }
  var out = [
    mins,
    _ofcDispoIndex(row.d),
    String(row.lid || ''),
    String(row.p || ''),
    String(row.n || '')
  ];
  while (out.length > 2 && out[out.length - 1] === '') {
    out.pop();
  }
  return out;
}
function _ofcDecode(arr, iso) {
  var mins = Number(arr[0]) || 0;
  var di = Number(arr[1]);
  var d = _ofcParse(iso);
  d.setHours(Math.floor(mins / 60), mins % 60, 0, 0);
  return {
    t: d.getTime(),
    d: OFFICE_DISPOS[di] ? OFFICE_DISPOS[di].d : '',
    lid: arr[2] || '',
    p: arr[3] || '',
    n: arr[4] || ''
  };
}
function _ofcIsEncoded(r) {
  return Object.prototype.toString.call(r) === '[object Array]';
}
function _ofcEncodeAll(rows) {
  var out = [];
  var i;
  for (i = 0; i < rows.length; i++) {
    out.push(_ofcEncode(rows[i]));
  }
  return out;
}
function _ofcRawDay(store, iso) {
  var rows = store[iso];
  return Object.prototype.toString.call(rows) === '[object Array]' ? rows : [];
}
function _ofcDayRows(store, iso) {
  var raw = _ofcRawDay(store, iso);
  var out = [];
  var i;
  for (i = 0; i < raw.length; i++) {
    out.push(_ofcIsEncoded(raw[i]) ? _ofcDecode(raw[i], iso) : raw[i]);
  }
  return out;
}
function _ofcRangeRows(store) {
  var r = _ofcRange();
  var out = [];
  var keys = Object.keys(store);
  var i, j, rows;
  keys.sort();
  for (i = 0; i < keys.length; i++) {
    if (keys[i] === '_v') continue;
    if (keys[i] < r.s || keys[i] > r.e) continue;
    rows = _ofcDayRows(store, keys[i]);
    for (j = 0; j < rows.length; j++) out.push(rows[j]);
  }
  return out;
}
function _ofcLog(label) {
  if (!OFFICE_MAP[label]) return;
  var store = _ofcLoad();
  var iso = _ofcPeriod === 'day' ? _ofcDate : _ofcToday();
  var rows = _ofcDayRows(store, iso).slice();
  var pv = String(_ofcPhone || '').slice(0, 40);
  var prow = { t: Date.now(), d: label, n: '', lid: '', p: '' };
  if (pv) {
    if (_ofcIsPhone(pv)) {
      prow.p = pv;
    } else {
      prow.lid = pv;
    }
  }
  rows.push(prow);
  store[iso] = _ofcRawDay(store, iso).concat([_ofcEncode(prow)]);
  _ofcPhone = '';
  _ofcSave(store);
  _ofcRender();
}
function _ofcDelete(idx) {
  var store = _ofcLoad();
  var rows = _ofcDayRows(store, _ofcDate).slice();
  if (idx < 0 || idx >= rows.length) return;
  rows.splice(idx, 1);
  store[_ofcDate] = _ofcEncodeAll(rows);
  _ofcSave(store);
  _ofcRender();
}
function _ofcSetNote(idx, val) {
  var store = _ofcLoad();
  var rows = _ofcDayRows(store, _ofcDate).slice();
  if (idx < 0 || idx >= rows.length) return;
  rows[idx].n = String(val || '').slice(0, 120);
  store[_ofcDate] = _ofcEncodeAll(rows);
  _ofcSave(store);
}
function _ofcSetField(idx, field, val) {
  var store = _ofcLoad();
  var rows = _ofcDayRows(store, _ofcDate).slice();
  if (idx < 0 || idx >= rows.length) return;
  rows[idx][field] = String(val || '').slice(0, 40);
  store[_ofcDate] = _ofcEncodeAll(rows);
  _ofcSave(store);
}
function _ofcStats(rows) {
  var s = {
    total: rows.length,
    contact: 0,
    sale: 0,
    postdate: 0,
    counts: {},
    more: 0
  };
  var i, r, m;
  for (i = 0; i < rows.length; i++) {
    r = rows[i];
    s.counts[r.d] = (s.counts[r.d] || 0) + 1;
    m = OFFICE_MAP[r.d];
    if (!m) continue;
    if (m.contact) s.contact++;
    if (r.d === 'Sale') s.sale++;
    if (r.d === 'Post Date') s.postdate++;
    if (!m.pin) s.more++;
  }
  s.sold = s.sale + s.postdate;
  s.rate = s.contact > 0 ? Math.round((s.sold / s.contact) * 100) + '%' : '-';
  return s;
}
function _ofcTimeLabel(ms) {
  var d = new Date(ms);
  var h = d.getHours();
  var m = String(d.getMinutes()).padStart(2, '0');
  var ap = h < 12 ? 'AM' : 'PM';
  h = h % 12;
  if (h === 0) h = 12;
  return h + ':' + m + ' ' + ap;
}
function _ofcTile(label, n, isSold) {
  return (
    '<button type="button" class="ofc-tile' +
    (isSold ? ' ofc-tile-sold' : '') +
    '" data-office-dispo="' +
    _ofcEsc(label) +
    '"><span class="ofc-tile-l">' +
    _ofcEsc(label) +
    '</span><span class="ofc-tile-n">' +
    (n ? n : '') +
    '</span></button>'
  );
}
function _ofcRender() {
  var page = document.getElementById('page-officecalls');
  if (!page) return;
  if (!(window.CHA_USER && window.CHA_USER.isManager)) {
    page.innerHTML =
      '<div class="ph"><div class="pt">Office</div>' +
      '<div class="pd">This area is available to managers only.</div></div>';
    return;
  }
  if (!_ofcDate) _ofcDate = _ofcToday();
  var store = _ofcLoad();
  var rows = _ofcRangeRows(store);
  var s = _ofcStats(rows);
  var isDay = _ofcPeriod === 'day';
  var dayRows = isDay ? _ofcDayRows(store, _ofcDate) : [];
  var html = '';
  var i, dsp, periods, p;
  html +=
    '<div class="ph"><div class="pt">Office <span>Call Tracker</span></div>' +
    '<div class="pd">Tap a dispo to log it. Notes and lead IDs are optional.</div></div>';
  html += '<div class="ofc-topbar">';
  html += '<div class="ofc-periods">';
  periods = [
    ['day', 'Today'],
    ['week', 'Week'],
    ['month', 'Month'],
    ['range', 'Range']
  ];
  for (i = 0; i < periods.length; i++) {
    p = periods[i];
    html +=
      '<button type="button" class="ofc-period' +
      (_ofcPeriod === p[0] ? ' ofc-period-on' : '') +
      '" data-office-period="' +
      p[0] +
      '">' +
      p[1] +
      '</button>';
  }
  html += '</div>';
  html += '<div class="ofc-datenav">';
  if (_ofcPeriod !== 'range') {
    html +=
      '<button type="button" class="ofc-navbtn" data-office-nav="-1" aria-label="Previous">&#8592;</button>';
  }
  html +=
    '<span class="ofc-datelabel">' + _ofcEsc(_ofcRangeLabel()) + '</span>';
  if (_ofcPeriod !== 'range') {
    html +=
      '<button type="button" class="ofc-navbtn" data-office-nav="1" aria-label="Next">&#8594;</button>';
  }
  html += '</div></div>';
  if (_ofcPeriod === 'range') {
    html +=
      '<div class="ofc-rangebar">' +
      '<input type="date" class="ofc-range-in" data-office-rangestart="1" value="' +
      _ofcEsc(_ofcRangeStart || _ofcToday()) +
      '" />' +
      '<span class="ofc-range-to">to</span>' +
      '<input type="date" class="ofc-range-in" data-office-rangeend="1" value="' +
      _ofcEsc(_ofcRangeEnd || _ofcToday()) +
      '" />' +
      '</div>';
  }
  if (_ofcQuotaHit) {
    html +=
      '<div class="ofc-quota-warn">Storage is full. Recent calls are not being saved. Delete old entries or clear space.</div>';
  }
  html += '<div class="ofc-metrics">';
  html +=
    '<div class="ofc-metric"><div class="ofc-metric-k">Calls</div><div class="ofc-metric-v">' +
    s.total +
    '</div></div>';
  html +=
    '<div class="ofc-metric"><div class="ofc-metric-k">Contacts</div><div class="ofc-metric-v">' +
    s.contact +
    '</div></div>';
  html +=
    '<div class="ofc-metric"><div class="ofc-metric-k">Sold</div><div class="ofc-metric-v ofc-metric-good">' +
    s.sold +
    '</div><div class="ofc-metric-sub">' +
    s.sale +
    ' sale / ' +
    s.postdate +
    ' post</div></div>';
  html +=
    '<div class="ofc-metric"><div class="ofc-metric-k">Close</div><div class="ofc-metric-v">' +
    _ofcEsc(s.rate) +
    '</div><div class="ofc-metric-sub">of contacts</div></div>';
  html += '</div>';
  html +=
    '<div class="ofc-phonebar">' +
    '<input type="text" class="ofc-phone-in" data-office-phone="1" ' +
    'placeholder="Paste Lead ID or phone, then tap a dispo" value="' +
    _ofcEsc(_ofcPhone) +
    '" />' +
    '<span class="ofc-paste-hint">' +
    (_ofcPhone ? (_ofcIsPhone(_ofcPhone) ? 'phone' : 'lead ID') : '') +
    '</span>' +
    '<button type="button" class="ofc-phone-clr" data-office-phoneclear="1">Clear</button>' +
    '</div>';
  html += '<div class="ofc-tiles">';
  for (i = 0; i < OFFICE_DISPOS.length; i++) {
    dsp = OFFICE_DISPOS[i];
    if (!dsp.pin) continue;
    html += _ofcTile(dsp.d, s.counts[dsp.d] || 0, dsp.sold);
  }
  html += '</div>';
  html +=
    '<button type="button" class="ofc-more" data-office-more="1">' +
    (_ofcMoreOpen ? '&#9660;' : '&#9654;') +
    ' More dispos <span class="ofc-more-n">' +
    (s.more ? s.more + ' logged' : '') +
    '</span></button>';
  if (_ofcMoreOpen) {
    html += '<div class="ofc-tiles ofc-tiles-more">';
    for (i = 0; i < OFFICE_DISPOS.length; i++) {
      dsp = OFFICE_DISPOS[i];
      if (dsp.pin) continue;
      html += _ofcTile(dsp.d, s.counts[dsp.d] || 0, false);
    }
    html += '</div>';
  }
  if (isDay) {
    html += '<div class="ofc-log"><div class="ofc-log-k">Call log</div>';
    if (!dayRows.length) {
      html += '<div class="ofc-log-empty">No calls logged yet.</div>';
    } else {
      for (i = dayRows.length - 1; i >= 0; i--) {
        html += '<div class="ofc-log-row">';
        html +=
          '<span class="ofc-log-t">' +
          _ofcEsc(_ofcTimeLabel(dayRows[i].t)) +
          '</span>';
        html += '<span class="ofc-log-d">' + _ofcEsc(dayRows[i].d) + '</span>';
        html +=
          '<input type="text" class="ofc-log-id" data-office-lid="' +
          i +
          '" placeholder="Lead ID" value="' +
          _ofcEsc(dayRows[i].lid || '') +
          '" />';
        html +=
          '<input type="text" class="ofc-log-phone" data-office-rowphone="' +
          i +
          '" placeholder="Phone" value="' +
          _ofcEsc(dayRows[i].p || '') +
          '" />';
        html +=
          '<input type="text" class="ofc-log-note" data-office-note="' +
          i +
          '" placeholder="Note" value="' +
          _ofcEsc(dayRows[i].n) +
          '" />';
        html +=
          '<button type="button" class="ofc-log-x" data-office-del="' +
          i +
          '" aria-label="Delete">&times;</button>';
        html += '</div>';
      }
    }
    html += '</div>';
  } else {
    html +=
      '<div class="ofc-log-empty">Individual call notes show on the Today view.</div>';
  }
  page.innerHTML = html;
}
function _ofcFind(t) {
  var attrs = [
    'data-office-dispo',
    'data-office-nav',
    'data-office-del',
    'data-office-period',
    'data-office-more',
    'data-office-phoneclear'
  ];
  var i;
  while (t && t !== document) {
    if (t.getAttribute) {
      for (i = 0; i < attrs.length; i++) {
        if (t.getAttribute(attrs[i]) !== null) return t;
      }
    }
    t = t.parentNode;
  }
  return null;
}
function _ofcOnClick(e) {
  var el = _ofcFind(e.target);
  if (!el) return;
  var v;
  v = el.getAttribute('data-office-dispo');
  if (v !== null) {
    _ofcLog(v);
    return;
  }
  v = el.getAttribute('data-office-period');
  if (v !== null) {
    _ofcPeriod = v;
    _ofcDate = _ofcToday();
    if (v === 'range' && !_ofcRangeStart) {
      _ofcRangeStart = _ofcShift(_ofcToday(), -6);
      _ofcRangeEnd = _ofcToday();
    }
    _ofcRender();
    return;
  }
  v = el.getAttribute('data-office-nav');
  if (v !== null) {
    _ofcStep(Number(v));
    _ofcRender();
    return;
  }
  v = el.getAttribute('data-office-more');
  if (v !== null) {
    _ofcMoreOpen = !_ofcMoreOpen;
    _ofcRender();
    return;
  }
  v = el.getAttribute('data-office-phoneclear');
  if (v !== null) {
    _ofcPhone = '';
    _ofcRender();
    return;
  }
  v = el.getAttribute('data-office-del');
  if (v !== null) {
    _ofcDelete(Number(v));
  }
}
function _ofcOnInput(e) {
  var t = e.target;
  if (!t || !t.getAttribute) return;
  var val = t.value;
  var hint;
  if (t.getAttribute('data-office-phone') !== null) {
    _ofcPhone = String(val || '').slice(0, 40);
    hint = document.querySelector('#page-officecalls .ofc-paste-hint');
    if (hint) {
      hint.textContent = _ofcPhone
        ? _ofcIsPhone(_ofcPhone)
          ? 'phone'
          : 'lead ID'
        : '';
    }
    return;
  }
  if (t.getAttribute('data-office-rangestart') !== null) {
    _ofcRangeStart = String(val || '');
    _ofcRender();
    return;
  }
  if (t.getAttribute('data-office-rangeend') !== null) {
    _ofcRangeEnd = String(val || '');
    _ofcRender();
    return;
  }
  var lidx = t.getAttribute('data-office-lid');
  if (lidx !== null) {
    clearTimeout(_ofcNoteTimer);
    _ofcNoteTimer = setTimeout(function () {
      _ofcSetField(Number(lidx), 'lid', val);
    }, 400);
    return;
  }
  var pidx = t.getAttribute('data-office-rowphone');
  if (pidx !== null) {
    clearTimeout(_ofcNoteTimer);
    _ofcNoteTimer = setTimeout(function () {
      _ofcSetField(Number(pidx), 'p', val);
    }, 400);
    return;
  }
  var idx = t.getAttribute('data-office-note');
  if (idx === null) return;
  clearTimeout(_ofcNoteTimer);
  _ofcNoteTimer = setTimeout(function () {
    _ofcSetNote(Number(idx), val);
  }, 400);
}
function renderOfficeCalls() {
  var page = document.getElementById('page-officecalls');
  if (page && !page.getAttribute('data-office-bound')) {
    page.setAttribute('data-office-bound', '1');
    page.addEventListener('click', _ofcOnClick);
    page.addEventListener('input', _ofcOnInput);
  }
  _ofcRender();
}
if (typeof window !== 'undefined') {
  window.renderOfficeCalls = renderOfficeCalls;
}
