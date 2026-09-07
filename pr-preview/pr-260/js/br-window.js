// br-window.js — desktop drag/resize for #br-panel (viewport > 768px)
(function () {
  'use strict';

  var BP = 768;
  var MIN_W = 400;
  var MIN_H = 320;
  var EDGE = 12;
  var DEFAULT_W = 560;
  var DEFAULT_H = 760;
  var OFFSET = 24;
  var STEP = 12;
  var STEP_SHIFT = 48;
  var DRAG_CLASS = 'br-window-dragging';
  var DIRS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
  var LABELS = {
    n: 'Resize top',
    s: 'Resize bottom',
    e: 'Resize right',
    w: 'Resize left',
    ne: 'Resize top-right',
    nw: 'Resize top-left',
    se: 'Resize bottom-right',
    sw: 'Resize bottom-left'
  };

  var panel = null;
  var head = null;
  var mode = null;
  var dir = null;
  var startPX = 0;
  var startPY = 0;
  var startX = 0;
  var startY = 0;
  var startW = 0;
  var startH = 0;
  var dragMoved = false;
  var swallowClick = null;

  function isDesktop() {
    return window.innerWidth > BP;
  }

  function parseVar(name) {
    var raw = document.documentElement.style.getPropertyValue(name);
    var n = parseFloat(raw);
    if (isNaN(n)) return null;
    return n;
  }

  function readGeom() {
    var x = parseVar('--br-x');
    var y = parseVar('--br-y');
    var w = parseVar('--br-w');
    var h = parseVar('--br-h');
    if (x === null || y === null || w === null || h === null) return null;
    return { x: x, y: y, w: w, h: h };
  }

  function applyGeom(x, y, w, h) {
    var root = document.documentElement;
    root.style.setProperty('--br-x', Math.round(x) + 'px');
    root.style.setProperty('--br-y', Math.round(y) + 'px');
    root.style.setProperty('--br-w', Math.round(w) + 'px');
    root.style.setProperty('--br-h', Math.round(h) + 'px');
  }

  function clearGeom() {
    var root = document.documentElement;
    root.style.removeProperty('--br-x');
    root.style.removeProperty('--br-y');
    root.style.removeProperty('--br-w');
    root.style.removeProperty('--br-h');
  }

  function clampGeom(x, y, w, h) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var maxW = vw - EDGE * 2;
    var maxH = vh - EDGE * 2;
    if (maxW < MIN_W) maxW = MIN_W;
    if (maxH < MIN_H) maxH = MIN_H;
    if (w < MIN_W) w = MIN_W;
    if (h < MIN_H) h = MIN_H;
    if (w > maxW) w = maxW;
    if (h > maxH) h = maxH;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x + w > vw) x = vw - w;
    if (y + h > vh) y = vh - h;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    return { x: x, y: y, w: w, h: h };
  }

  function defaultGeom() {
    var w = DEFAULT_W;
    var h = DEFAULT_H;
    var x = window.innerWidth - w - OFFSET;
    var y = OFFSET;
    return clampGeom(x, y, w, h);
  }

  function syncViewport() {
    if (!isDesktop()) {
      clearGeom();
      endInteraction(false);
      return;
    }
    var g = readGeom();
    if (!g) g = defaultGeom();
    else g = clampGeom(g.x, g.y, g.w, g.h);
    applyGeom(g.x, g.y, g.w, g.h);
  }

  function tryCapture(el, pointerId) {
    if (!el || typeof el.setPointerCapture !== 'function') return;
    try {
      el.setPointerCapture(pointerId);
    } catch (e) {}
  }

  function beginDragClass() {
    document.documentElement.classList.add(DRAG_CLASS);
  }

  function endInteraction(suppress) {
    if (!mode) {
      document.documentElement.classList.remove(DRAG_CLASS);
      return;
    }
    mode = null;
    dir = null;
    document.documentElement.classList.remove(DRAG_CLASS);
    if (suppress && dragMoved) queueSwallowClick();
    dragMoved = false;
  }

  function queueSwallowClick() {
    if (swallowClick) {
      document.removeEventListener('click', swallowClick, true);
      swallowClick = null;
    }
    swallowClick = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      document.removeEventListener('click', swallowClick, true);
      swallowClick = null;
    };
    document.addEventListener('click', swallowClick, true);
    setTimeout(function () {
      if (!swallowClick) return;
      document.removeEventListener('click', swallowClick, true);
      swallowClick = null;
    }, 50);
  }

  function isFromButton(target) {
    var n = target;
    while (n && n !== head) {
      if (n.nodeType === 1 && n.nodeName === 'BUTTON') return true;
      n = n.parentNode;
    }
    return false;
  }

  function snapshotStart(e) {
    var g = readGeom();
    if (!g) g = defaultGeom();
    startPX = e.clientX;
    startPY = e.clientY;
    startX = g.x;
    startY = g.y;
    startW = g.w;
    startH = g.h;
    dragMoved = false;
  }

  function resizeFrom(currentDir, dx, dy) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var maxW = vw - EDGE * 2;
    var maxH = vh - EDGE * 2;
    if (maxW < MIN_W) maxW = MIN_W;
    if (maxH < MIN_H) maxH = MIN_H;

    var w = startW;
    var h = startH;
    if (currentDir.indexOf('e') !== -1) w = startW + dx;
    if (currentDir.indexOf('w') !== -1) w = startW - dx;
    if (currentDir.indexOf('s') !== -1) h = startH + dy;
    if (currentDir.indexOf('n') !== -1) h = startH - dy;

    if (w < MIN_W) w = MIN_W;
    if (w > maxW) w = maxW;
    if (h < MIN_H) h = MIN_H;
    if (h > maxH) h = maxH;

    var x = startX;
    var y = startY;
    var right = startX + startW;
    var bottom = startY + startH;
    if (currentDir.indexOf('w') !== -1) x = right - w;
    if (currentDir.indexOf('n') !== -1) y = bottom - h;

    if (x < 0) {
      if (currentDir.indexOf('w') !== -1) {
        x = 0;
        w = right;
        if (w > maxW) w = maxW;
        if (w < MIN_W) w = MIN_W;
      } else {
        x = 0;
      }
    }
    if (y < 0) {
      if (currentDir.indexOf('n') !== -1) {
        y = 0;
        h = bottom;
        if (h > maxH) h = maxH;
        if (h < MIN_H) h = MIN_H;
      } else {
        y = 0;
      }
    }
    if (x + w > vw) {
      if (currentDir.indexOf('e') !== -1) {
        w = vw - x;
        if (w < MIN_W) {
          w = MIN_W;
          x = vw - w;
        }
        if (w > maxW) w = maxW;
      } else {
        x = vw - w;
      }
    }
    if (y + h > vh) {
      if (currentDir.indexOf('s') !== -1) {
        h = vh - y;
        if (h < MIN_H) {
          h = MIN_H;
          y = vh - h;
        }
        if (h > maxH) h = maxH;
      } else {
        y = vh - h;
      }
    }
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    applyGeom(x, y, w, h);
  }

  function onHeadDown(e) {
    if (!isDesktop()) return;
    if (e.button !== 0) return;
    if (isFromButton(e.target)) return;
    mode = 'move';
    dir = null;
    snapshotStart(e);
    beginDragClass();
    tryCapture(e.target, e.pointerId);
    e.preventDefault();
  }

  function onHeadDblClick(e) {
    if (!isDesktop()) return;
    if (isFromButton(e.target)) return;
    endInteraction(false);
    var g = defaultGeom();
    applyGeom(g.x, g.y, g.w, g.h);
  }

  function onResizeDown(e, handleDir) {
    if (!isDesktop()) return;
    if (e.button !== 0) return;
    mode = 'resize';
    dir = handleDir;
    snapshotStart(e);
    beginDragClass();
    tryCapture(e.target, e.pointerId);
    e.preventDefault();
  }

  function onMove(e) {
    if (!mode) return;
    if (!isDesktop()) {
      endInteraction(false);
      return;
    }
    var dx = e.clientX - startPX;
    var dy = e.clientY - startPY;
    if (dx !== 0 || dy !== 0) dragMoved = true;
    if (mode === 'move') {
      var g = clampGeom(startX + dx, startY + dy, startW, startH);
      applyGeom(g.x, g.y, g.w, g.h);
      return;
    }
    if (mode === 'resize' && dir) {
      resizeFrom(dir, dx, dy);
    }
  }

  function onUp() {
    if (!mode) return;
    endInteraction(true);
  }

  function onHandleKey(e, handleDir) {
    if (!isDesktop()) return;
    var key = e.key;
    if (
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight' &&
      key !== 'ArrowUp' &&
      key !== 'ArrowDown'
    ) {
      return;
    }
    e.preventDefault();
    var step = e.shiftKey ? STEP_SHIFT : STEP;
    var dx = 0;
    var dy = 0;
    if (key === 'ArrowRight') dx = step;
    if (key === 'ArrowLeft') dx = -step;
    if (key === 'ArrowDown') dy = step;
    if (key === 'ArrowUp') dy = -step;
    var g = readGeom();
    if (!g) g = defaultGeom();
    startX = g.x;
    startY = g.y;
    startW = g.w;
    startH = g.h;
    resizeFrom(handleDir, dx, dy);
  }

  function insertHandles() {
    if (!panel) return;
    if (panel.querySelector('.br-resize')) return;
    var i;
    for (i = 0; i < DIRS.length; i++) {
      var d = DIRS[i];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'br-resize';
      btn.setAttribute('data-dir', d);
      btn.setAttribute('aria-label', LABELS[d]);
      if (d === 'se') {
        var grip = document.createElement('span');
        grip.className = 'br-resize-grip';
        grip.setAttribute('aria-hidden', 'true');
        btn.appendChild(grip);
      }
      (function (handleDir) {
        btn.addEventListener('pointerdown', function (e) {
          onResizeDown(e, handleDir);
        });
        btn.addEventListener('keydown', function (e) {
          onHandleKey(e, handleDir);
        });
      })(d);
      panel.appendChild(btn);
    }
  }

  function init() {
    panel = document.getElementById('br-panel');
    if (!panel) return;
    head = panel.querySelector('.br-head');
    insertHandles();
    syncViewport();
    if (head) {
      head.addEventListener('pointerdown', onHeadDown);
      head.addEventListener('dblclick', onHeadDblClick);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
    window.addEventListener('resize', syncViewport);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
