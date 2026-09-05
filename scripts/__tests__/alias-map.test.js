'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const BASE_SCHEMA = require('../lib/base-schema.json');
const ALIAS_MAP = require('../lib/alias-map.json');
const ARCHIVE = require('../lib/derived-keys-archive.json');

describe('frozen base schema', function () {
  it('has the contracted destination count', function () {
    assert.equal(BASE_SCHEMA.length, 113);
    assert.equal(new Set(BASE_SCHEMA).size, 113);
  });

  it('does not use the derived-keys archive as the contract', function () {
    assert.equal(ARCHIVE.length, 152);
    assert.notEqual(JSON.stringify(BASE_SCHEMA), JSON.stringify(ARCHIVE));
  });
});

describe('alias-map destinations stay inside the contract', function () {
  it('maps every alias to a base-schema destination', function () {
    const dests = Object.keys(ALIAS_MAP);
    assert.ok(dests.length > 0);
    for (let i = 0; i < dests.length; i++) {
      const dest = ALIAS_MAP[dests[i]];
      assert.ok(
        BASE_SCHEMA.indexOf(dest) !== -1,
        dests[i] + ' -> ' + dest + ' is not in base-schema.json'
      );
    }
  });

  it('keeps the documented waiting-period and claims aliases', function () {
    assert.equal(
      ALIAS_MAP['waiting_period.sickness'],
      'limitations.waiting_period_sickness'
    );
    assert.equal(
      ALIAS_MAP['administration.claims'],
      'administration.claims_administrator'
    );
    assert.equal(
      ALIAS_MAP['administration.claims_and_contacts'],
      'administration.claims_administrator'
    );
  });

  it('does not alias combined or supplemental-accident schedule rows', function () {
    const blocked = [
      'benefit_schedule.primary_and_specialty_combined_max_days_per_coverage_year',
      'benefit_schedule.basic_pathology_basic_radiology_advance_studies',
      'benefit_schedule.inpatient_outpatient_surgery',
      'benefit_schedule.supplemental_accident_emergency_room',
      'benefit_schedule.supplemental_accident_inpatient_admission'
    ];
    for (let i = 0; i < blocked.length; i++) {
      assert.equal(
        ALIAS_MAP[blocked[i]],
        undefined,
        blocked[i] + ' should stay unmapped'
      );
    }
  });
});
