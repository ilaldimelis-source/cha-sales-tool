// js/app-questions.js - Application questions checklist (Oct 2026).
// Questions are copied word for word from the carrier applications Mey
// sent on Oct 17 2026. "ex" is a plain-language explanation agents use
// only if the client is confused, after reading the question as written.
// "ok" is the answer that keeps the client eligible for that plan.
// Shown two ways: its own tab (page-appq) and a box inside the matching
// plan scripts (appqScriptBoxHtml, called from call-playbook.js).

var APPQ_PLANS = [
  {
    id: 'harbor',
    name: 'Harbor STM',
    platform: 'NEO',
    step: 'Opening & Medical Underwriting',
    scripts: ['Harbor STM Secure', 'Harbor STM Access', 'Harbor STM Essential'],
    qs: [
      {
        q: 'Is the Primary Applicant or any Proposed Covered Person eligible for Medicaid or Medicare?',
        ex: 'This asks if you or anyone on the plan can get Medicare or Medicaid right now. Medicare is usually for people 65 or older or with certain disabilities. Medicaid is the state program based on income.',
        ok: 'No'
      },
      {
        q: 'Is the Primary Applicant or any Proposed Covered Person now pregnant, an expectant parent, in the process of adopting, in the process of surrogate pregnancy or undergoing infertility treatment?',
        ex: 'This asks if anyone on the plan is pregnant right now, expecting a baby, adopting, using a surrogate, or getting fertility treatment.',
        ok: 'No'
      },
      {
        q: 'Is the Primary Applicant or any Proposed Covered Person over 275 pounds if female or over 325 pounds if male?',
        ex: 'This asks if any woman on the plan weighs more than 275 pounds, or any man more than 325 pounds.',
        ok: 'No'
      },
      {
        q: 'Will the Primary Applicant or any Proposed Covered Person have any other group major medical health insurance or individual major medical health insurance in force on the requested effective date?',
        ex: 'This asks if anyone will still have other major medical insurance, like a job plan or a Marketplace plan, on the day this plan starts.',
        ok: 'No'
      },
      {
        q: "Within the last 5 years has the Primary Applicant or any Proposed Covered Person been diagnosed with, received treatment, abnormal test results, medication, consultation for, or had symptoms of: Insulin or medication dependent diabetes except gestational; stroke; transient ischemic attack (TIA); cancer, except basal cell skin cancer; malignant or benign tumor; Crohn's disease; ulcerative colitis; rheumatoid arthritis; systemic lupus; chronic obstructive pulmonary disease (COPD); emphysema; cystic fibrosis; hepatitis C; multiple sclerosis; muscular dystrophy; alcohol or drug abuse; bipolar disorder or schizophrenia; hospitalization for mental disorder or an eating disorder; or, any diseases or disorders of the following: liver; kidney; blood; pancreas; lung; brain; heart or circulatory including heart attack or catheterization?",
        ex: 'In the last 5 years, has anyone on the plan been diagnosed, treated, taken medicine, seen a doctor, had abnormal test results, or had symptoms for anything on this list? If you are not sure about one, tell me which one and I will read it again.',
        ok: 'No'
      },
      {
        q: 'Within the past 5 years, has the Primary Applicant or any Proposed Covered Person been diagnosed or treated by a physician or medical practitioner for: Acquired Immune Deficiency Syndrome (AIDS); AIDS Related Complex (ARC); or, tested positive for Human Immunodeficiency Virus (HIV)?',
        ex: 'In the last 5 years, has anyone on the plan been diagnosed or treated for HIV or AIDS, or tested positive for HIV?',
        ok: 'No'
      },
      {
        q: 'If the Primary Applicant and all Proposed Covered Person(s) are United States citizens, please answer "No" to this question. If the Applicant or any Proposed Covered Person is not a United States Citizen, has that person resided outside the United States for more than 4 weeks over the last 12 months?',
        ex: 'If everyone on the plan is a U.S. citizen, the answer is No. If someone is not a citizen, this asks if they lived outside the U.S. for more than 4 weeks in the last 12 months.',
        ok: 'No'
      },
      {
        q: 'I acknowledge I have selected the optional Consecutive Short Term Medical Insurance Plan Amendment. In doing so, I understand: the Primary Applicant and all Proposed Covered Person(s) are selecting coverage with an auto reapply option that will allow an extension of coverage per the terms of the Amendment; benefit limits, deductible and coinsurance will reset each new Coverage Period; medical conditions covered during a prior Coverage Period may not be covered under a Subsequent Coverage Period; premiums may change at the start of each new Coverage Period; and, I may cancel at any time.',
        ex: 'This option lets your coverage start a new period automatically. Each new period, the deductible and limits start over, a condition covered before may not be covered in the new period, and the price can change. You can cancel at any time.',
        ok: 'Yes'
      }
    ]
  },
  {
    id: 'pinnacle',
    name: 'Pinnacle STM',
    platform: 'NEO',
    step: 'Opening & Medical Underwriting',
    scripts: ['NEO Pinnacle STM Traditional'],
    qs: [
      {
        q: 'Is the Applicant or any Proposed Covered Person eligible for Medicaid or Medicare?',
        ex: 'This asks if you or anyone on the plan can get Medicare or Medicaid right now. Medicare is usually for people 65 or older or with certain disabilities. Medicaid is the state program based on income.',
        ok: 'No'
      },
      {
        q: 'Is the Applicant or any Proposed Covered Person now pregnant, an expectant parent, in process of adoption or undergoing infertility treatment?',
        ex: 'This asks if anyone on the plan is pregnant right now, expecting a baby, adopting, using a surrogate, or getting fertility treatment.',
        ok: 'No'
      },
      {
        q: 'Is the Applicant or any Proposed Covered Person over 325 pounds if male, or over 275 pounds if female?',
        ex: 'This asks if any woman on the plan weighs more than 275 pounds, or any man more than 325 pounds.',
        ok: 'No'
      },
      {
        q: 'Will the Applicant or any Proposed Covered Person have any other group major medical health insurance or individual major medical health insurance in force on the requested effective date?',
        ex: 'This asks if anyone will still have other major medical insurance, like a job plan or a Marketplace plan, on the day this plan starts.',
        ok: 'No'
      },
      {
        q: "Within the last 5 years has any applicant been diagnosed with, received treatment, abnormal test results, medication, consultation for, or had symptoms of: Insulin or medication dependent diabetes except gestational (diabetes does not apply to residents of DC), stroke, transient ischemic attack (TIA), cancer or tumor except basal cell skin cancer, Crohn's disease, ulcerative colitis, rheumatoid arthritis, systemic lupus, chronic obstructive pulmonary disease (COPD), emphysema, cystic fibrosis, hepatitis C, multiple sclerosis, muscular dystrophy, alcohol or drug abuse; bipolar disorder or schizophrenia; hospitalization for mental disorder, an eating disorder; or any diseases or disorders of the following: liver, kidney, blood, pancreas, lung, brain, heart or circulatory including heart attack or catheterization?",
        ex: 'In the last 5 years, has anyone on the plan been diagnosed, treated, taken medicine, seen a doctor, had abnormal test results, or had symptoms for anything on this list? If you are not sure about one, tell me which one and I will read it again.',
        ok: 'No'
      },
      {
        q: 'Within the past 5 years, has the Applicant or any Proposed Covered Person been diagnosed or treated by a physician or medical practitioner for Acquired Immune Deficiency Syndrome (AIDS), AIDS Related Complex (ARC) or tested positive for Human Immunodeficiency Virus (HIV)? (Residents of Wisconsin do not need to disclose HIV test results)',
        ex: 'In the last 5 years, has anyone on the plan been diagnosed or treated for HIV or AIDS, or tested positive for HIV?',
        ok: 'No'
      },
      {
        q: 'If the Applicant and all Proposed Covered Person(s) are United States citizens, please answer "No" to this question. If the Applicant or any Proposed Covered Person is not a United States Citizen, has that person resided outside the United States for more than 4 weeks over the last 12 months?',
        ex: 'If everyone on the plan is a U.S. citizen, the answer is No. If someone is not a citizen, this asks if they lived outside the U.S. for more than 4 weeks in the last 12 months.',
        ok: 'No'
      }
    ]
  },
  {
    id: 'access',
    name: 'Access Health STM',
    platform: 'FirstEnroll',
    step: 'Opening & Medical Underwriting',
    scripts: ['Access Health STM'],
    qs: [
      {
        q: 'Has any person proposed for coverage been a legal resident of the United States for less than the past 12 consecutive months?',
        ex: 'Has anyone on the plan been a legal U.S. resident for less than the last 12 months in a row?',
        ok: 'No'
      },
      {
        q: 'Will there be any other health insurance in force on the requested effective date of this coverage?',
        ex: 'Will anyone on the plan have any other health insurance on the day this plan starts?',
        ok: 'No'
      },
      {
        q: 'Is the proposed insured, spouse, or any dependent child now pregnant, undergoing infertility treatment, or in the process of adoption?',
        ex: 'Is anyone on the plan pregnant right now, getting fertility treatment, or in the process of adopting?',
        ok: 'No'
      },
      {
        q: 'Has any person proposed for coverage ever been declined for health insurance due to health reasons?',
        ex: 'Has an insurance company ever turned anyone on the plan down for health insurance because of their health?',
        ok: 'No'
      },
      {
        q: 'Is any person proposed for coverage currently eligible for Medicaid?',
        ex: 'Can anyone on the plan get Medicaid right now? Medicaid is the state program based on income.',
        ok: 'No'
      },
      {
        q: "Within the past 5 years, have you or any other person to be insured been aware of, diagnosed, treated by a member of the medical profession, or taken mediation for \u2022cancer or a tumor, \u2022stroke, \u2022heart disorder, \u2022heart attack, \u2022coronary bypass or stent, \u2022peripheral vascular disease, \u2022carotid artery disease, \u2022COPD (Chronic Obstructive Pulmonary Disease) or emphysema, \u2022kidney disorder or disease (other than kidney stones), \u2022liver disorder or disease, \u2022neurological disorder, \u2022degenerative disc disease or herniation/bulge, \u2022rheumatoid arthritis, \u2022degenerative joint disease of the knee or hip, \u2022diabetes, \u2022Crohn's disease or ulcerative colitis, \u2022bipolar disorder or schizophrenia, \u2022any eating disorder, [or] \u2022alcohol abuse or chemical dependency,[ \u2022or does anyone listed on the application currently weigh over 250 pounds (women) or over 300 pounds (men)]?",
        ex: 'In the last 5 years, has anyone on the plan known about, been diagnosed with, been treated for, or taken medicine for anything on this list? It also asks if any woman weighs over 250 pounds or any man over 300 pounds.',
        ok: 'No'
      },
      {
        q: 'Have you or any other person to be insured been hospitalized for a mental health condition in the past 5 years or been treated by a member of the medical profession for a mental health condition in the past 12 months?',
        ex: 'Has anyone been in the hospital for a mental health condition in the last 5 years, or seen a doctor or counselor for a mental health condition in the last 12 months?',
        ok: 'No'
      },
      {
        q: 'Have you or any other person to be insured ever been diagnosed or treated for Acquired Immune Deficiency Syndrome (AIDS), AIDS-related complex, or any other immune system disorder such as HIV?',
        ex: 'Has anyone on the plan ever been diagnosed or treated for HIV, AIDS, or another immune system disorder?',
        ok: 'No'
      }
    ]
  },
  {
    id: 'smartchoice',
    name: 'SmartChoice',
    platform: 'NEO',
    step: 'Verification',
    scripts: ['NEO Smart Choice'],
    qs: [
      {
        q: 'Do you acknowledge that you will be admitted as a Working Owner under Section 5.01(c) of the LLC Agreement for Population Science Management USA?',
        ex: 'To join this plan, you become a Working Owner of the company, Population Science Management USA. This asks you to confirm that.',
        ok: 'Yes'
      },
      {
        q: 'Do you understand that, as a Working Owner, you are expected to complete assigned activities, respond to Company requests, and maintain regular communication regarding Working Owner matters?',
        ex: 'As a Working Owner, the company will send you some tasks, like surveys, and expects you to answer them and stay in touch.',
        ok: 'Yes'
      },
      {
        q: 'Do you agree that the Company may assign projects to you at its discretion?',
        ex: 'The company can send you projects, which are surveys, whenever it chooses.',
        ok: 'Yes'
      },
      {
        q: 'Do you understand that you will receive a Guaranteed Payment for each response to an information request, as defined under Internal Revenue Code Section 707(c)?',
        ex: 'You get paid for each information request you answer. The tax law section is just how that payment is classified.',
        ok: 'Yes'
      },
      {
        q: 'Do you acknowledge that you have been granted three (3) Preferred Units in the Company as compensation for your personal services?',
        ex: 'You receive 3 Preferred Units, a small ownership share in the company, for your services.',
        ok: 'Yes'
      },
      {
        q: 'Do you understand that the Preferred Units are not registered under the Securities Act of 1933 and that there is no public market for these units?',
        ex: 'Those units are not registered stock, and they cannot be sold on a market.',
        ok: 'Yes'
      },
      {
        q: 'Do you understand that you are eligible to participate in Company benefit plans subject to eligibility requirements and timely payment of any required premiums?',
        ex: "Being a Working Owner lets you join the company's benefit plans, as long as you are eligible and pay on time.",
        ok: 'Yes'
      },
      {
        q: 'Do you agree to maintain the confidentiality of all Company information and to comply with Section 14.03 of the LLC Agreement?',
        ex: 'You agree to keep company information private.',
        ok: 'Yes'
      },
      {
        q: 'Do you understand that if you fail to meet the conditions of Working Owner status, the Company may exercise its Call Right to repurchase your Membership Interest?',
        ex: 'If you do not meet the Working Owner terms, the company can buy back your ownership share.',
        ok: 'Yes'
      },
      {
        q: 'Do you confirm that you have read and understood all the Terms and Conditions and the LLC Agreement, and that you are legally able to provide services as a Working Owner?',
        ex: 'You confirm you have read the terms and the agreement, and that nothing stops you from doing the Working Owner tasks, like a rule from a current or past employer.',
        ok: 'Yes'
      }
    ],
    talk: [
      {
        t: 'What is a Working Owner?',
        say: 'A Working Owner is someone who owns a small part of a company and does some work for it. For this plan, becoming a Working Owner of Population Science Management USA is what makes you eligible for the group health plan.',
        qa: [
          [
            'Do I have to do real work?',
            'The activities are short surveys. Each takes a few minutes.'
          ]
        ]
      },
      {
        t: 'Why am I becoming an owner of a company?',
        say: "Self-employed people usually can't join a group health plan on their own. Becoming a Working Owner is how you qualify. You are not investing any money. The ownership units are given to you for your services.",
        qa: [
          [
            'So this is not real insurance?',
            "It's a federally governed ERISA group health plan. It's not major medical."
          ]
        ]
      },
      {
        t: 'Call Right',
        say: "If you don't meet the Working Owner conditions, the company can buy back your ownership share, and your Working Owner status ends.",
        qa: [
          [
            'So they can just kick me out?',
            "Only if you don't meet the Working Owner conditions."
          ]
        ]
      },
      {
        t: 'Prescriptions and specialty meds',
        say: "The plan covers preferred generic medications for $12 for a 30-day supply, if they're on the Ventegra acute formulary. Brand-name and specialty drugs, like Humira, Ozempic and Enbrel, are not covered. For specialty drugs, the ScriptAide Patient Assistance Program may help, based on your income.",
        qa: [
          [
            "I'm on Ozempic or Humira. What do I do?",
            "It isn't covered by this plan. You can apply to the Patient Assistance Program; approval depends on your income."
          ]
        ]
      }
    ]
  }
];

var appqState = { plan: 'harbor', ans: {}, help: {}, open: {} };

function appqEsc(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function appqFind(id) {
  for (var i = 0; i < APPQ_PLANS.length; i++) {
    if (APPQ_PLANS[i].id === id) return APPQ_PLANS[i];
  }
  return null;
}

function appqForScript(scriptName) {
  for (var i = 0; i < APPQ_PLANS.length; i++) {
    if (APPQ_PLANS[i].scripts.indexOf(scriptName) !== -1) return APPQ_PLANS[i];
  }
  return null;
}

function appqStatus(plan) {
  var ans = appqState.ans[plan.id] || {};
  var answered = 0;
  var stops = [];
  plan.qs.forEach(function (q, i) {
    if (!ans[i]) return;
    answered++;
    if (ans[i] !== q.ok) stops.push(i + 1);
  });
  if (stops.length) {
    return {
      tone: 'stop',
      title: 'Stop',
      text:
        'Question ' +
        stops.join(', ') +
        ' rules out ' +
        plan.name +
        '. Do not submit; check another plan.'
    };
  }
  if (answered === plan.qs.length) {
    return {
      tone: 'ok',
      title: 'All clear',
      text: 'Every answer qualifies. Continue the application.'
    };
  }
  return {
    tone: 'wait',
    title: answered + ' of ' + plan.qs.length + ' answered',
    text: 'Read each question word for word.'
  };
}

function appqListHtml(plan, where) {
  var ans = appqState.ans[plan.id] || {};
  var help = appqState.help[plan.id] || {};
  var st = appqStatus(plan);
  var w = ' data-appq-where="' + where + '"';
  var html =
    '<div class="appq-status appq-' +
    st.tone +
    '"><b>' +
    appqEsc(st.title) +
    '</b><span>' +
    appqEsc(st.text) +
    '</span><button type="button" class="appq-reset" data-appq-reset="' +
    plan.id +
    '"' +
    w +
    '>Start over</button></div>';
  html += '<ol class="appq-list">';
  plan.qs.forEach(function (q, i) {
    var a = ans[i];
    var bad = a && a !== q.ok;
    var cls = a ? (bad ? ' is-bad' : ' is-good') : '';
    var yn = ['Yes', 'No']
      .map(function (v) {
        return (
          '<button type="button" class="appq-ans' +
          (a === v ? ' is-on' : '') +
          '" data-appq-ans="' +
          plan.id +
          ':' +
          i +
          ':' +
          v +
          '"' +
          w +
          '>' +
          v +
          '</button>'
        );
      })
      .join('');
    html +=
      '<li class="appq-q' +
      cls +
      '"><span class="appq-num">' +
      (i + 1) +
      '</span><div class="appq-body"><p class="appq-text">' +
      appqEsc(q.q) +
      '</p><button type="button" class="appq-help-btn" data-appq-help="' +
      plan.id +
      ':' +
      i +
      '"' +
      w +
      '>' +
      (help[i] ? 'Hide explanation' : 'Client confused?') +
      '</button>' +
      (help[i]
        ? '<div class="appq-help"><span>Say it simply</span>' +
          appqEsc(q.ex) +
          '</div>'
        : '') +
      (bad
        ? '<p class="appq-warn">' +
          (q.ok === 'Yes'
            ? 'Needs Yes to enroll in ' + appqEsc(plan.name) + '.'
            : 'Not eligible for ' + appqEsc(plan.name) + '.') +
          '</p>'
        : '') +
      '</div><div class="appq-yn">' +
      yn +
      '</div></li>';
  });
  html += '</ol>';
  if (plan.talk && plan.talk.length) {
    html +=
      '<h3 class="appq-talk-h">If the client asks</h3><div class="appq-talk">';
    plan.talk.forEach(function (c, ci) {
      var on = help['t' + ci];
      var qa = c.qa
        .map(function (x) {
          return (
            '<p class="appq-tq"><b>Q: ' +
            appqEsc(x[0]) +
            '</b><br>A: ' +
            appqEsc(x[1]) +
            '</p>'
          );
        })
        .join('');
      html +=
        '<div class="appq-tcard"><button type="button" class="appq-thead" data-appq-help="' +
        plan.id +
        ':t' +
        ci +
        '"' +
        w +
        '>' +
        appqEsc(c.t) +
        '<span>' +
        (on ? 'Hide' : 'Open') +
        '</span></button>' +
        (on
          ? '<div class="appq-tbody"><div class="appq-help"><span>Say this</span>' +
            appqEsc(c.say) +
            '</div>' +
            qa +
            '</div>'
          : '') +
        '</div>';
    });
    html += '</div>';
  }
  html +=
    '<p class="appq-src">Copied from the carrier application, Oct 17 2026. Read the question first; use the explanation only if the client is confused. Answers are not saved.</p>';
  return html;
}

// Box shown inside a plan script, on the step where the questions are asked.
function appqScriptBoxHtml(scriptName, sectionTitle) {
  var plan = appqForScript(scriptName);
  if (!plan || plan.step !== sectionTitle) return '';
  var isOpen = !!appqState.open[plan.id];
  var st = appqStatus(plan);
  return (
    '<div class="appq-box" id="appq-box-' +
    plan.id +
    '"><button type="button" class="appq-box-head" data-appq-toggle="' +
    plan.id +
    '"><b>Application questions</b><span class="appq-pill appq-' +
    st.tone +
    '">' +
    appqEsc(st.title) +
    '</span><span class="appq-chev">' +
    (isOpen ? 'Hide' : 'Show ' + plan.qs.length) +
    '</span></button>' +
    (isOpen
      ? '<div class="appq-box-body">' + appqListHtml(plan, 'box') + '</div>'
      : '') +
    '</div>'
  );
}

function appqRefresh(where, planId) {
  if (where === 'box') {
    var box = document.getElementById('appq-box-' + planId);
    var plan = appqFind(planId);
    if (box && plan) {
      var tmp = document.createElement('div');
      tmp.innerHTML = appqScriptBoxHtml(plan.scripts[0], plan.step);
      if (tmp.firstChild) box.parentNode.replaceChild(tmp.firstChild, box);
    }
  }
  if (document.getElementById('appq-root')) renderAppQuestions();
}

function appqOnClick(e) {
  var t =
    e.target && e.target.closest
      ? e.target.closest(
          '[data-appq-ans],[data-appq-help],[data-appq-reset],[data-appq-toggle],[data-appq-plan]'
        )
      : null;
  if (!t) return;
  var where = t.getAttribute('data-appq-where');
  var v = t.getAttribute('data-appq-ans');
  if (v) {
    var p = v.split(':');
    var cur = appqState.ans[p[0]] || (appqState.ans[p[0]] = {});
    cur[p[1]] = cur[p[1]] === p[2] ? '' : p[2];
    appqRefresh(where, p[0]);
    return;
  }
  v = t.getAttribute('data-appq-help');
  if (v) {
    var h = v.split(':');
    var hs = appqState.help[h[0]] || (appqState.help[h[0]] = {});
    hs[h[1]] = !hs[h[1]];
    appqRefresh(where, h[0]);
    return;
  }
  v = t.getAttribute('data-appq-reset');
  if (v) {
    appqState.ans[v] = {};
    appqRefresh(where, v);
    return;
  }
  v = t.getAttribute('data-appq-toggle');
  if (v) {
    appqState.open[v] = !appqState.open[v];
    appqRefresh('box', v);
    return;
  }
  v = t.getAttribute('data-appq-plan');
  if (v) {
    appqState.plan = v;
    renderAppQuestions();
  }
}
document.addEventListener('click', appqOnClick);

function renderAppQuestions() {
  var root = document.getElementById('page-appq');
  if (!root) return;
  var plan = appqFind(appqState.plan) || APPQ_PLANS[0];
  root.innerHTML =
    '<div class="appq-page" id="appq-root"><header class="appq-hero appq-hero-' +
    (plan.platform === 'FirstEnroll' ? 'fe' : 'neo') +
    '"><div><h2>' +
    appqEsc(plan.name) +
    '</h2><p>Application questions - read word for word</p></div><div class="appq-seg">' +
    APPQ_PLANS.map(function (p) {
      return (
        '<button type="button" class="' +
        (p.id === plan.id ? 'is-on' : '') +
        '" data-appq-plan="' +
        p.id +
        '">' +
        appqEsc(p.name) +
        '</button>'
      );
    }).join('') +
    '</div></header>' +
    appqListHtml(plan, 'page') +
    '</div>';
}
