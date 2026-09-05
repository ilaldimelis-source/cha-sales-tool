'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const {
  planMatchesToken,
  recordApplies,
  unregisteredTokens,
  parseSourceRef,
  mapComplianceRisk,
  gapBlocksStatement,
  mapOpenGap,
  attachToProfile,
  summarizeAttachment
} = require('../lib/attach-compliance.js');

function addon(id) {
  return { plan_id: id, is_addon: true, listed_on: ['neo'] };
}

function core(id, listed) {
  return {
    plan_id: id,
    is_addon: false,
    listed_on: listed || ['firstenroll']
  };
}

describe('plan id matching', function () {
  it('matches exact ids and pipe lists', function () {
    const applied = recordApplies(
      { plan_id: 'tdk-1 | tdk-2 | tdk-3' },
      core('tdk-2')
    );
    assert.equal(applied.matches, true);
    assert.equal(applied.portfolio, false);
    assert.equal(
      recordApplies({ plan_id: 'tdk-1 | tdk-2' }, core('harbor-stm-access'))
        .matches,
      false
    );
  });

  it('expands spaced ranges', function () {
    assert.equal(
      planMatchesToken(core('paramount-4'), 'paramount-1 .. paramount-6'),
      true
    );
    assert.equal(
      planMatchesToken(core('paramount-7'), 'paramount-1 .. paramount-6'),
      false
    );
  });

  it('attaches ALL_ADDONS only to add-ons with PORTFOLIO scope', function () {
    const record = { compliance_id: 'K-011', plan_id: 'ALL_ADDONS' };
    const onAddon = recordApplies(record, addon('assistpro-discount'));
    const onCore = recordApplies(record, core('smart-choice-1500'));
    assert.equal(onAddon.matches, true);
    assert.equal(onAddon.portfolio, true);
    assert.equal(onCore.matches, false);
  });

  it('attaches discount-programs to that product class', function () {
    const record = { plan_id: 'discount-programs' };
    const disc = {
      plan_id: 'assistpro-discount',
      is_addon: true,
      product_type: 'discount_program',
      listed_on: ['neo']
    };
    assert.equal(recordApplies(record, disc).matches, true);
    assert.equal(recordApplies(record, disc).portfolio, true);
    assert.equal(
      recordApplies(record, core('smart-choice-1500')).matches,
      false
    );
  });

  it('attaches ALL_PRODUCT_NAMES to every plan as PORTFOLIO', function () {
    const record = { plan_id: 'ALL_PRODUCT_NAMES' };
    const applied = recordApplies(record, core('paramount-4'));
    assert.equal(applied.matches, true);
    assert.equal(applied.portfolio, true);
  });

  it('matches family -ALL and glob prefixes', function () {
    assert.equal(
      planMatchesToken(
        core('health-choice-silver-100a'),
        'health-choice-silver-ALL'
      ),
      true
    );
    assert.equal(
      planMatchesToken(core('pinnacle-hi-1-sa'), 'pinnacle-hi-*'),
      true
    );
    assert.equal(
      planMatchesToken(core('questselect-sa'), 'questselect*'),
      true
    );
    assert.equal(
      planMatchesToken(core('smart-choice-1500'), 'all-smart-choice'),
      true
    );
  });

  it('strips parenthetical notes from glob tokens', function () {
    assert.equal(
      planMatchesToken(
        core('health-choice-silver-200'),
        'health-choice-silver-* (all 8)'
      ),
      true
    );
  });

  it('inherits a family prefix from shorthand pipe lists', function () {
    const record = {
      plan_id: 'smart-choice-1500 | 2500 | 3000 | 3500'
    };
    assert.equal(
      recordApplies(record, core('smart-choice-1500')).matches,
      true
    );
    assert.equal(
      recordApplies(record, core('smart-choice-2500')).matches,
      true
    );
    assert.equal(
      recordApplies(record, core('smart-choice-3500')).matches,
      true
    );
    assert.equal(recordApplies(record, core('tdk-1')).matches, false);
    assert.equal(
      recordApplies(record, core('smart-choice-1500')).portfolio,
      false
    );
  });
});

describe('compliance mapping', function () {
  it('maps ledger columns into the profile risk shape', function () {
    const risk = mapComplianceRisk(
      {
        compliance_id: 'K-001',
        VERIFIED_FACT: 'OOP is not a ceiling',
        SOURCE: 'source 21, page 5, Benefit Summary',
        WHAT_AN_AGENT_COULD_MISSTATE: 'the most you pay is $9200',
        SAFE_CLIENT_FACING_EXPLANATION: 'visit caps sit beside the OOP',
        WHAT_NOT_TO_SAY: "Do not say 'the most you'll ever pay is $9,200'",
        VERIFY_BEFORE_SAYING: 'Always',
        fact_class: 'verified_plan_fact'
      },
      false
    );
    assert.equal(risk.risk_id, 'K-001');
    assert.equal(risk.source.src, 21);
    assert.equal(risk.source.pg, 5);
    assert.equal(risk.source.sec, 'Benefit Summary');
    assert.equal(risk.fact_class, 'verified_plan_fact');
    assert.equal(risk.scope, undefined);
    assert.match(risk.do_not_say, /most you'll ever pay/);
  });

  it('marks wildcard risks PORTFOLIO', function () {
    const risk = mapComplianceRisk(
      {
        compliance_id: 'K-017',
        finding: 'names lie',
        plan_id: 'ALL_PRODUCT_NAMES'
      },
      true
    );
    assert.equal(risk.scope, 'PORTFOLIO');
    assert.equal(risk.verified_fact, 'names lie');
    assert.equal(risk.fact_class, 'internal_interpretation');
  });

  it('parses a SOURCE string without fabricating missing pages', function () {
    const src = parseSourceRef({
      SOURCE: 'source 82, live NEO Info page',
      url: 'https://example.test'
    });
    assert.equal(src.src, 82);
    assert.equal(src.pg, null);
    assert.equal(src.url, 'https://example.test');
  });
});

describe('gaps', function () {
  it('blocks when no document answers the question', function () {
    const gap = mapOpenGap({
      gap_id: 'G-109',
      plan_id: 'pinnacle-hi-*',
      question: 'per-day or per-confinement?',
      result: 'NOT_FOUND_IN_SOURCE',
      note: 'never says per day or per confinement'
    });
    assert.equal(gap.gap_id, 'G-109');
    assert.equal(gap.field, '');
    assert.equal(gap.what_is_unknown, 'per-day or per-confinement?');
    assert.equal(gap.blocks_statement, true);
    assert.equal(
      gapBlocksStatement({
        gap_id: 'G-001',
        what_is_missing: 'Nothing missing - this is a correction.',
        category: 'critical_corrections'
      }),
      false
    );
  });
});

describe('attachToProfile', function () {
  it('fills compliance_risks, open_gaps, and a flat do_not_say list', function () {
    const profile = attachToProfile(
      {},
      core('paramount-4'),
      [
        {
          compliance_id: 'K-044',
          plan_id: 'paramount-1 | paramount-4',
          VERIFIED_FACT: 'membership includes HI',
          WHAT_NOT_TO_SAY: 'Do not say unlimited',
          fact_class: 'verified_plan_fact'
        },
        {
          compliance_id: 'K-017',
          plan_id: 'ALL_PRODUCT_NAMES',
          finding: 'names lie',
          agent_action_required: 'Never type a product from its name'
        }
      ],
      [
        {
          gap_id: 'G-006',
          plan_ids: ['paramount-4'],
          what_is_missing: 'Paramount_4_BOOKLET.pdf is not in Drive',
          category: 'missing_active_plan_documents'
        }
      ]
    );
    assert.equal(profile.compliance_risks.length, 2);
    assert.equal(profile.compliance_risks[0].risk_id, 'K-017');
    assert.equal(profile.compliance_risks[0].scope, 'PORTFOLIO');
    assert.equal(profile.compliance_risks[1].scope, undefined);
    assert.equal(profile.open_gaps.length, 1);
    assert.equal(profile.open_gaps[0].blocks_statement, true);
    assert.deepEqual(profile.do_not_say, [
      'Do not say unlimited',
      'Never type a product from its name'
    ]);
  });

  it('reports tokens that match no registry plan', function () {
    const rows = unregisteredTokens(
      [
        {
          compliance_id: 'K-X',
          plan_id: 'premchoice-UNREGISTERED | paramount-4'
        }
      ],
      [core('paramount-4')],
      'compliance'
    );
    assert.equal(rows.length, 1);
    assert.equal(rows[0].plan_id, 'premchoice-UNREGISTERED');
  });

  it('summarizes profiles with risks and blocking gaps', function () {
    const summary = summarizeAttachment([
      {
        compliance_risks: [{ risk_id: 'K-1' }],
        open_gaps: [{ blocks_statement: true }]
      },
      { compliance_risks: [], open_gaps: [{ blocks_statement: false }] }
    ]);
    assert.equal(summary.profilesWithComplianceRisks, 1);
    assert.equal(summary.profilesWithBlockingGaps, 1);
  });
});
