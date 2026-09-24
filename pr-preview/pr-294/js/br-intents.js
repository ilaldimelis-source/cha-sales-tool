// br-intents.js - intent id -> key paths and trigger words. Keyword presence only.
(function (global) {
  'use strict';

  var BR_INTENTS = [
    {
      id: 'copays',
      label: 'Copays',
      keys: [
        'benefits.pcp',
        'benefits.specialist',
        'benefits.urgent_care',
        'benefits.er',
        'benefits.telehealth'
      ],
      triggers: [
        'copay',
        'copays',
        'copayment',
        'primary care',
        'pcp',
        'specialist',
        'urgent care',
        'emergency room',
        'telehealth',
        'telemedicine'
      ]
    },
    {
      id: 'exclusions',
      label: 'Exclusions',
      keys: [
        'limitations.excluded_services',
        'limitations.pregnancy_exclusion'
      ],
      triggers: ['exclusion', 'exclusions', 'not covered', 'excluded']
    },
    {
      id: 'preex',
      label: 'Pre-Ex',
      keys: [
        'limitations.pre_existing',
        'limitations.pre_ex_scope',
        'limitations.lookback_months'
      ],
      triggers: [
        'pre-ex',
        'preex',
        'pre-existing',
        'pre existing',
        'lookback',
        'look-back',
        'look back'
      ]
    },
    {
      id: 'waiting',
      label: 'Waiting periods',
      keys: [
        'limitations.waiting_period_sickness',
        'limitations.waiting_period_other'
      ],
      triggers: ['waiting period', 'wait period']
    },
    {
      id: 'network',
      label: 'Network',
      keys: [
        'identity.network',
        'administration.network_lookup',
        'administration.provider_verification'
      ],
      triggers: [
        'network',
        'out-of-network',
        'out of network',
        'provider search'
      ]
    },
    {
      id: 'whosbehind',
      label: "Who's behind it",
      keys: [
        'identity.carrier',
        'identity.underwriter',
        'identity.administrator',
        'administration.claims_administrator',
        'identity.association'
      ],
      triggers: [
        "who's behind",
        'who is behind',
        'whos behind',
        'carrier',
        'underwriter',
        'administrator',
        'association'
      ]
    },
    {
      id: 'postclose',
      label: 'Post-close',
      keys: [
        'compliance.verification_script',
        'compliance.required_disclosures'
      ],
      triggers: [
        'post-close',
        'post close',
        'postclose',
        'verification script',
        'required disclosure',
        'after the sale'
      ]
    }
  ];

  function brGetIntent(intentId) {
    var i;
    for (i = 0; i < BR_INTENTS.length; i++) {
      if (BR_INTENTS[i].id === intentId) return BR_INTENTS[i];
    }
    return null;
  }

  function brMatchIntent(query) {
    var q = String(query || '').toLowerCase();
    if (!q) return null;
    var i;
    var t;
    var intent;
    for (i = 0; i < BR_INTENTS.length; i++) {
      intent = BR_INTENTS[i];
      for (t = 0; t < intent.triggers.length; t++) {
        if (q.indexOf(intent.triggers[t]) !== -1) {
          return intent;
        }
      }
    }
    return null;
  }

  global.BR_INTENTS = BR_INTENTS;
  global.brGetIntent = brGetIntent;
  global.brMatchIntent = brMatchIntent;
})(typeof window !== 'undefined' ? window : this);
