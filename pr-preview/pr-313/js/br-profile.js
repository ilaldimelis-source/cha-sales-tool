// br-profile.js - on-demand plan profile loader. Fetch one file by plan_id.
(function (global) {
  'use strict';

  var _cache = {};
  var _inflight = {};

  function brLoadProfile(planId) {
    var id = planId == null ? '' : String(planId);
    if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(id)) {
      return Promise.resolve(null);
    }
    if (_cache[id]) {
      return Promise.resolve(_cache[id]);
    }
    if (_inflight[id]) {
      return _inflight[id];
    }
    var url = 'data/plans/' + id + '.json';
    var p = fetch(url)
      .then(function (res) {
        if (!res || !res.ok) {
          throw new Error('profile load failed');
        }
        return res.json();
      })
      .then(function (data) {
        _inflight[id] = null;
        if (!data || typeof data !== 'object') {
          return null;
        }
        _cache[id] = data;
        return data;
      })
      .catch(function () {
        _inflight[id] = null;
        return null;
      });
    _inflight[id] = p;
    return p;
  }

  function brReadLeaf(profile, keyPath) {
    if (
      !profile ||
      typeof profile !== 'object' ||
      keyPath == null ||
      keyPath === ''
    ) {
      return null;
    }
    var parts = String(keyPath).split('.');
    var node = profile;
    var i;
    var key;
    for (i = 0; i < parts.length; i++) {
      key = parts[i];
      if (
        !node ||
        typeof node !== 'object' ||
        !Object.prototype.hasOwnProperty.call(node, key)
      ) {
        return null;
      }
      node = node[key];
    }
    if (!node || typeof node !== 'object') {
      return null;
    }
    return {
      v: node.v === undefined ? null : node.v,
      vs: node.vs === undefined ? null : node.vs,
      src: node.src === undefined ? null : node.src,
      pg: node.pg === undefined ? null : node.pg,
      sec: node.sec === undefined ? null : node.sec,
      conf: node.conf === undefined ? null : node.conf,
      cur: node.cur === undefined ? null : node.cur
    };
  }

  global.brLoadProfile = brLoadProfile;
  global.brReadLeaf = brReadLeaf;
})(typeof window !== 'undefined' ? window : this);
