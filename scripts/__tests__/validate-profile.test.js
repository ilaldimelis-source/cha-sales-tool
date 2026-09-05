'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  emptyNotFoundLeaf,
  validateLeaf,
  validateProfile,
  validateRegistryCoverage,
  findFamilyIdenticalFields,
  notFoundRatio
} = require('../lib/validate-profile.js');

function leaf(overrides) {
  return Object.assign(
    {
      v: 'value',
      src: 1,
      pg: 1,
      sec: 'section',
      url: null,
      cur: 'CURRENT',
      app: 'EXACT_VARIANT',
      gov: [],
      auth: 1,
      conf: 'HIGH',
      vs: 'VERIFIED'
    },
    overrides || {}
  );
}

function profileWith(fields, extras) {
  const profile = Object.assign(
    { plan_id: 'plan-a', family: 'Family', variant: 'A' },
    extras || {}
  );
  const names = Object.keys(fields);
  for (let i = 0; i < names.length; i++) {
    setPath(profile, names[i], fields[names[i]]);
  }
  return profile;
}

function setPath(obj, dotted, value) {
  const parts = dotted.split('.');
  let node = obj;
  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    const last = i === parts.length - 1;
    if (last) {
      node[key] = value;
      return;
    }
    if (!node[key] || typeof node[key] !== 'object') node[key] = {};
    node = node[key];
  }
}

describe('G1 citation', function () {
  it('passes when a non-null fact has src and a page', function () {
    const fails = validateLeaf(
      leaf({ src: 12, pg: 0, sec: '', url: null }),
      'identity.network',
      'p1'
    );
    assert.equal(
      fails.filter(function (x) {
        return x.gate === 'G1';
      }).length,
      0
    );
  });

  it('fails when a non-null fact has no src and no citation', function () {
    const fails = validateLeaf(
      leaf({ src: null, pg: null, sec: '', url: null }),
      'identity.network',
      'p1'
    );
    const g1 = fails.filter(function (x) {
      return x.gate === 'G1';
    });
    assert.ok(g1.length >= 1);
  });
});

describe('G2 applicability', function () {
  it('passes FAMILY_WIDE with non-empty gov', function () {
    const fails = validateLeaf(
      leaf({ app: 'FAMILY_WIDE', gov: ['plan-a', 'plan-b'] }),
      'identity.network',
      'p1'
    );
    assert.equal(
      fails.filter(function (x) {
        return x.gate === 'G2';
      }).length,
      0
    );
  });

  it('fails FAMILY_WIDE with empty gov', function () {
    const fails = validateLeaf(
      leaf({ app: 'FAMILY_WIDE', gov: [] }),
      'identity.network',
      'p1'
    );
    assert.equal(
      fails.filter(function (x) {
        return x.gate === 'G2';
      }).length,
      1
    );
  });
});

describe('G3 superseded high confidence', function () {
  it('passes HIGH with CURRENT', function () {
    const fails = validateLeaf(
      leaf({ conf: 'HIGH', cur: 'CURRENT' }),
      'identity.network',
      'p1'
    );
    assert.equal(
      fails.filter(function (x) {
        return x.gate === 'G3';
      }).length,
      0
    );
  });

  it('fails HIGH with SUPERSEDED', function () {
    const fails = validateLeaf(
      leaf({ conf: 'HIGH', cur: 'SUPERSEDED' }),
      'identity.network',
      'p1'
    );
    assert.equal(
      fails.filter(function (x) {
        return x.gate === 'G3';
      }).length,
      1
    );
  });
});

describe('G4 sole high-auth on protected fields', function () {
  it('passes HIGH benefits fact from rank 1', function () {
    const item = leaf({ conf: 'HIGH', auth: 1 });
    const profile = profileWith({ 'benefits.pcp': item }, { plan_id: 'p1' });
    const result = validateProfile(profile, { fieldKeys: ['benefits.pcp'] });
    assert.equal(
      result.fails.filter(function (x) {
        return x.gate === 'G4';
      }).length,
      0
    );
    assert.equal(
      result.warns.filter(function (x) {
        return x.gate === 'G4';
      }).length,
      0
    );
    assert.equal(item.conf, 'HIGH');
    assert.equal(item.vs, 'VERIFIED');
  });

  it('warns and caps HIGH benefits fact from sole auth>=6 source', function () {
    const item = leaf({
      conf: 'HIGH',
      auth: 7,
      vs: 'VERIFIED',
      src: 34
    });
    const profile = profileWith(
      { 'benefits.office_visits': item },
      { plan_id: 'p1' }
    );
    const result = validateProfile(profile, {
      fieldKeys: ['benefits.office_visits']
    });
    assert.equal(
      result.fails.filter(function (x) {
        return x.gate === 'G4';
      }).length,
      0
    );
    assert.equal(result.g4Caps.length, 1);
    assert.equal(
      result.warns.filter(function (x) {
        return x.gate === 'G4';
      }).length,
      1
    );
    assert.equal(result.warns[0].severity, 'WARN');
    assert.equal(item.conf, 'MEDIUM');
    assert.equal(item.vs, 'NEEDS_MANUAL_VERIFICATION');
    assert.equal(result.g4Caps[0].source_id, 34);
    assert.equal(result.g4Caps[0].auth, 7);
    assert.equal(result.g4Caps[0].original_conf, 'HIGH');
  });
});

describe('G5 unknown currentness cap', function () {
  it('passes UNKNOWN at MEDIUM', function () {
    const fails = validateLeaf(
      leaf({ cur: 'UNKNOWN', conf: 'MEDIUM' }),
      'identity.network',
      'p1'
    );
    assert.equal(
      fails.filter(function (x) {
        return x.gate === 'G5';
      }).length,
      0
    );
  });

  it('fails UNKNOWN at HIGH', function () {
    const fails = validateLeaf(
      leaf({ cur: 'UNKNOWN', conf: 'HIGH' }),
      'identity.network',
      'p1'
    );
    assert.equal(
      fails.filter(function (x) {
        return x.gate === 'G5';
      }).length,
      1
    );
  });
});

describe('G6 registry coverage', function () {
  it('passes when every fact plan_id is in the registry', function () {
    const fails = validateRegistryCoverage(
      [{ plan_id: 'plan-a', field: 'identity.network' }],
      ['plan-a', 'plan-b']
    );
    assert.equal(fails.length, 0);
  });

  it('fails when a fact plan_id is missing from the registry', function () {
    const fails = validateRegistryCoverage(
      [{ plan_id: 'ghost-plan', field: 'identity.network' }],
      ['plan-a']
    );
    assert.equal(fails.length, 1);
    assert.equal(fails[0].gate, 'G6');
    assert.equal(fails[0].plan_id, 'ghost-plan');
  });
});

describe('G7 family-wide identical fields', function () {
  const keys = ['identity.network'];

  it('does not warn when variant values differ', function () {
    const profiles = [
      profileWith(
        { 'identity.network': leaf({ v: 'First Health' }) },
        { family: 'Smart Choice', plan_id: 'a' }
      ),
      profileWith(
        { 'identity.network': leaf({ v: 'PHCS' }) },
        { family: 'Smart Choice', plan_id: 'b' }
      )
    ];
    const warns = findFamilyIdenticalFields(profiles, keys);
    assert.equal(warns.length, 0);
  });

  it('warns when a field is byte-identical across all variants', function () {
    const profiles = [
      profileWith(
        { 'identity.network': leaf({ v: 'First Health' }) },
        { family: 'Smart Choice', plan_id: 'a' }
      ),
      profileWith(
        { 'identity.network': leaf({ v: 'First Health' }) },
        { family: 'Smart Choice', plan_id: 'b' }
      )
    ];
    const warns = findFamilyIdenticalFields(profiles, keys);
    assert.equal(warns.length, 1);
    assert.equal(warns[0].gate, 'G7');
    assert.equal(warns[0].field, 'identity.network');
  });
});

describe('G8 not-found ratio', function () {
  const keys = [
    'identity.network',
    'identity.product_type',
    'benefits.pcp',
    'limitations.maternity',
    'administration.claims'
  ];

  it('does not warn at or below 40%', function () {
    const fields = {
      'identity.network': leaf(),
      'identity.product_type': leaf(),
      'benefits.pcp': leaf(),
      'limitations.maternity': emptyNotFoundLeaf(),
      'administration.claims': leaf()
    };
    const profile = profileWith(fields);
    assert.ok(notFoundRatio(profile, keys) <= 0.4);
    const result = validateProfile(profile, { fieldKeys: keys });
    assert.equal(
      result.warns.filter(function (x) {
        return x.gate === 'G8';
      }).length,
      0
    );
  });

  it('warns when more than 40% of keys are NOT_FOUND_IN_SOURCE', function () {
    const fields = {
      'identity.network': leaf(),
      'identity.product_type': emptyNotFoundLeaf(),
      'benefits.pcp': emptyNotFoundLeaf(),
      'limitations.maternity': emptyNotFoundLeaf(),
      'administration.claims': emptyNotFoundLeaf()
    };
    const profile = profileWith(fields);
    assert.ok(notFoundRatio(profile, keys) > 0.4);
    const result = validateProfile(profile, { fieldKeys: keys });
    assert.equal(
      result.warns.filter(function (x) {
        return x.gate === 'G8';
      }).length,
      1
    );
  });
});

describe('NOT_FOUND scaffolds skip fact gates', function () {
  it('does not FAIL G1/G2 on a searched-and-missing leaf', function () {
    const fails = validateLeaf(
      emptyNotFoundLeaf(),
      'limitations.waiting_period',
      'p1'
    );
    assert.equal(fails.length, 0);
  });
});
