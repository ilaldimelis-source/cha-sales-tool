// ai-tools.js — AI Tools tab (Client Profiler / psych profile, Discovery, Closing Engine)

// ── SHARED GROQ HELPER ───────────────────────────────────────────────────────

// Env-provided shared company Groq key, fetched once at script load
// from /api/groq-key (a Vercel serverless function that reads
// process.env.GROQ_API_KEY). Agents never manage this key — it is
// applied automatically for everyone the moment the app loads.
// The ?t= cache-buster prevents the service worker's stale-while-
// revalidate path from caching the response.
var _aiGroqFallbackKey = '';
fetch('/api/groq-key?t=' + Date.now())
  .then(function (r) {
    if (!r.ok) return null;
    return r.json();
  })
  .then(function (d) {
    if (d && d.key) {
      _aiGroqFallbackKey = d.key;
    }
  })
  .catch(function () {
    // Network failure or 500 — silently leave fallback empty.
    // _aiNoKeyMsg will then show the unavailable message.
  });

function _aiGroq(systemPrompt, userMsg, onSuccess, onError) {
  // Company key from /api/groq-key always wins so agents do not have
  // to do anything. localStorage is only consulted if the shared key
  // failed to load (e.g. network blip during initial fetch).
  var key = _aiGroqFallbackKey || '';
  if (!key || key.length < 20) {
    var lsKey =
      typeof chaGroqKeyString === 'function' ? chaGroqKeyString() : '';
    if (lsKey && lsKey !== 'skip' && lsKey.length >= 20) {
      key = lsKey;
    }
  }
  if (!key || key.length < 20) {
    if (onError) onError('no-key');
    return;
  }
  fetch(CHA_GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + key
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 600,
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMsg }
      ]
    })
  })
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (d) {
      onSuccess(d.choices[0].message.content.trim());
    })
    .catch(function (e) {
      if (onError) onError(e.message);
    });
}
function _aiLoadingBtn(btnId, msg) {
  var b = document.getElementById(btnId);
  if (b) {
    b._orig = b.textContent;
    b.textContent = msg || 'Analyzing...';
    b.disabled = true;
  }
}
function _aiResetBtn(btnId) {
  var b = document.getElementById(btnId);
  if (b && b._orig) {
    b.textContent = b._orig;
    b.disabled = false;
  }
}
function _aiNoKeyMsg(elId) {
  var el = document.getElementById(elId);
  if (el) {
    el.innerHTML =
      '<div style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;padding:14px 16px;font-size:13px;color:#475569;">AI assistant is unavailable. Please contact your manager.</div>';
    el.style.display = 'block';
  }
}

function renderPsychprofile() {
  var html =
    '<div class="ph"><div class="pt">Client <span>Profiler</span></div>';
  html +=
    '<div class="pd">Answer 5 quick questions about how your prospect is talking. The AI identifies their personality style and tells you exactly how to sell to them.</div></div>';

  html +=
    '<div style="background:#FFFFFF;border:2px solid #C8CEDD;border-radius:20px;padding:24px;margin-bottom:16px;">';
  html +=
    '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal3);margin-bottom:16px;">What signals are you picking up on this call?</div>';

  var questions = [
    {
      id: 'q1',
      label: 'How are they communicating?',
      opts: [
        'Very direct, wants to get to the point fast',
        'Asking lots of detailed questions about benefits',
        'Friendly and personal, sharing about their life',
        'Enthusiastic, big picture, talking about the future'
      ]
    },
    {
      id: 'q2',
      label: 'What is their main concern?',
      opts: [
        'Results — does this actually work?',
        'Accuracy — what exactly does it cover and not cover?',
        'Relationships — will this affect my family?',
        'Recognition — what do others say about this?'
      ]
    },
    {
      id: 'q3',
      label: 'How do they respond to your pitch?',
      opts: [
        'Challenges you, pushes back fast',
        'Asks follow-up questions, wants more data',
        'Pauses, says they want to think or talk to someone',
        'Gets excited, then suddenly hesitates'
      ]
    },
    {
      id: 'q4',
      label: 'What is their pace on the call?',
      opts: [
        'Fast — they interrupt, they decide quickly',
        'Slow and methodical — they want to understand everything',
        'Moderate — they follow your lead',
        'Variable — up and down with their emotions'
      ]
    },
    {
      id: 'q5',
      label: 'What word describes their vibe?',
      opts: ['Controlling', 'Calculating', 'Caring', 'Charming']
    }
  ];

  questions.forEach(function (q) {
    html += '<div style="margin-bottom:18px;">';
    html +=
      '<div style="font-weight:700;font-size:13px;color:var(--charcoal3);margin-bottom:8px;">' +
      q.label +
      '</div>';
    html += '<div style="display:flex;flex-direction:column;gap:6px;">';
    q.opts.forEach(function (opt, oi) {
      html +=
        '<label style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--milk);border:1.5px solid rgba(220,170,180,0.2);border-radius:12px;cursor:pointer;font-size:13px;color:var(--charcoal);">';
      html +=
        '<input type="radio" name="' +
        q.id +
        '" value="' +
        oi +
        '" style="accent-color:var(--charcoal3);"> ' +
        opt +
        '</label>';
    });
    html += '</div></div>';
  });

  html +=
    '<button onclick="analyzePsych()" style="background:rgba(212,96,122,0.13);color:var(--charcoal3);border:1px solid rgba(212,96,122,0.3);border-radius:12px;padding:12px 28px;font-weight:800;font-size:14px;cursor:pointer;width:100%;margin-top:8px;">Analyze Client →</button>';
  html += '</div>';
  html += '<div id="psychResult" class="u-hide"></div>';

  var _page_psychprofile = document.getElementById('page-psychprofile');
  if (_page_psychprofile) _page_psychprofile.innerHTML = html;
}

function analyzePsych() {
  var scores = { Driver: 0, Analytical: 0, Amiable: 0, Expressive: 0 };
  var maps = [
    ['Driver', 'Analytical', 'Amiable', 'Expressive'],
    ['Driver', 'Analytical', 'Amiable', 'Expressive'],
    ['Driver', 'Analytical', 'Amiable', 'Expressive'],
    ['Driver', 'Analytical', 'Amiable', 'Expressive'],
    ['Driver', 'Analytical', 'Amiable', 'Expressive']
  ];
  var answered = 0;
  for (var qi = 1; qi <= 5; qi++) {
    var sel = document.querySelector('input[name="q' + qi + '"]:checked');
    if (sel) {
      scores[maps[qi - 1][parseInt(sel.value)]]++;
      answered++;
    }
  }
  if (answered < 3) {
    alert('Please answer at least 3 questions for an accurate profile.');
    return;
  }
  var top = 'Driver',
    topScore = 0;
  Object.keys(scores).forEach(function (k) {
    if (scores[k] > topScore) {
      top = k;
      topScore = scores[k];
    }
  });

  var profiles = {
    Driver: {
      icon: '',
      color: 'var(--charcoal3)',
      bg: 'rgba(212,96,122,0.08)',
      desc: 'Drivers are results-oriented, decisive, and impatient. They want the bottom line fast and they make quick decisions when they trust the outcome.',
      sell: 'Get to the point immediately. Lead with the result, not the features. They want to know it works — not how it works.',
      tone: 'Confident, direct, fast-paced. Match their energy. Do not over-explain.',
      do: [
        'Lead with the outcome: "This protects you starting tomorrow."',
        'Skip the backstory. One sentence per benefit.',
        'Give them a decision point early: "Does this sound like what you need?"',
        'Match their pace — if they talk fast, you talk fast.',
        'Close decisively: "Let\'s get this activated."'
      ],
      dont: [
        'Over-explaining — they will tune out',
        'Long lists of features',
        'Asking lots of questions before getting to the point',
        'Soft or apologetic language'
      ],
      scripts: [
        '"Here is the short version: doctor visits, telemedicine, hospital coverage — starting tomorrow. No deductible."',
        '"You told me the main thing was getting something in place fast. This does exactly that."',
        '"Let\'s just get it done. Application takes about 4 minutes."'
      ]
    },
    Analytical: {
      icon: '',
      color: 'var(--sec)',
      bg: 'rgba(123,104,184,0.08)',
      desc: 'Analyticals are detail-oriented, systematic, and risk-averse. They need accuracy and proof. They will ask about the fine print.',
      sell: 'Give them structure, specifics, and data. Walk through benefits methodically. Answer every question precisely.',
      tone: 'Calm, precise, thorough. Do not rush. Give them numbers.',
      do: [
        'Use exact numbers: "$25 PCP copay, $50 specialist, $1,000/day hospital benefit up to $10,000."',
        'Acknowledge limitations proactively — they will find them anyway.',
        'Structure the call: "I am going to walk you through four things."',
        'Welcome detailed questions — it means they are engaged.',
        'Give them the compliance disclosures slowly and clearly.'
      ],
      dont: [
        'Vague language like "lots of coverage" or "really affordable"',
        'Skipping limitations',
        'Rushing to close before they feel fully informed',
        'Emotional appeals without data to back them up'
      ],
      scripts: [
        '"The plan has a $25 primary care copay, $50 specialist copay. Hospital pays $1,000 per day up to $10,000 annually. Telemedicine is $0."',
        '"I want to be completely upfront: this is a limited-benefit plan. Pre-existing conditions from the last 12 months have a 12-month exclusion. Does that make sense so far?"',
        '"Take your time with this — I want you to feel completely clear before we proceed."'
      ]
    },
    Amiable: {
      icon: '',
      color: '#29A26A',
      bg: 'rgba(41,162,106,0.08)',
      desc: 'Amiables are relationship-focused, conflict-averse, and loyal. They want to feel heard, safe, and understood. They buy from people they trust.',
      sell: 'Build personal connection before anything else. Show that you care about their specific situation. Make them feel safe making the decision.',
      tone: 'Warm, patient, personal. Use their name. Reference what they told you.',
      do: [
        'Reference personal details they shared: "You mentioned your daughter — let\'s make sure she is covered too."',
        'Slow down and let them talk.',
        'Validate before pivoting: "That makes complete sense."',
        'Make the decision feel safe: "You can adjust this if anything changes."',
        'Never pressure — offer options, not ultimatums.'
      ],
      dont: [
        'Rushing to close before they feel comfortable',
        'Being transactional — they want a relationship',
        'Ignoring emotional signals',
        'Pushing back hard on hesitation — they will shut down'
      ],
      scripts: [
        '"Based on everything you shared with me, I really think this is going to give you the peace of mind you are looking for."',
        '"There is no pressure here at all — I just want to make sure you have the right information to make the best decision for your family."',
        '"A lot of people in your exact situation go with this plan because it handles the everyday things without the big insurance price tag."'
      ]
    },
    Expressive: {
      icon: '',
      color: '#7a5f00',
      bg: 'rgba(184,134,11,0.08)',
      desc: 'Expressives are enthusiastic, big-picture thinkers who respond to stories and vision. They get excited quickly — and lose interest quickly. They want to feel special.',
      sell: 'Paint the picture. Connect coverage to their lifestyle and goals. Keep energy high. Move fast before enthusiasm fades.',
      tone: 'Enthusiastic, storytelling, visionary. Match their excitement. Make it feel like a great decision.',
      do: [
        'Open with the big picture: "Imagine having a doctor available anytime on your phone."',
        'Use stories: "Most of my clients in your situation say telemedicine alone was worth it."',
        'Keep the call moving — Expressives lose focus in long explanations.',
        'Celebrate the decision: "You are making a smart move."',
        'Get commitment while enthusiasm is high.'
      ],
      dont: [
        'Getting too detailed — they lose interest in the weeds',
        'Slow methodical walkthroughs',
        'Letting the call stall — momentum is everything',
        'Ignoring their excitement when it shows up'
      ],
      scripts: [
        '"Picture this: 2AM, your kid has a fever. You open your phone, doctor is on in minutes, prescription called in. That is what this plan gives you."',
        '"Honestly, the people who enroll in this are usually the ones who think ahead. You clearly do."',
        '"You are going to love this — let\'s get it locked in while I have you."'
      ]
    }
  };

  var p = profiles[top];
  var el = document.getElementById('psychResult');
  var html =
    '<div style="background:' +
    p.bg +
    ';border:2px solid ' +
    p.color +
    '44;border-radius:12px;padding:24px;margin-bottom:16px;">';
  html +=
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">';
  html += '<span style="font-size:40px;">' + p.icon + '</span>';
  html +=
    '<div><div style="font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--charcoal3);">' +
    top +
    ' Personality</div>';
  html +=
    '<div style="font-size:12px;color:var(--warmgray3);margin-top:2px;">Confidence: ' +
    Math.round((topScore / 5) * 100) +
    '% match based on your answers</div></div></div>';
  html +=
    '<div style="font-size:14px;color:var(--charcoal);line-height:1.7;margin-bottom:16px;">' +
    p.desc +
    '</div>';

  html +=
    '<div style="background:#FFFFFF;border-radius:12px;padding:16px;margin-bottom:10px;">';
  html +=
    '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:' +
    p.color +
    ';margin-bottom:6px;">HOW TO SELL TO THEM</div>';
  html +=
    '<div style="font-size:13px;color:var(--charcoal3);">' +
    p.sell +
    '</div></div>';

  html +=
    '<div style="background:#FFFFFF;border-radius:12px;padding:16px;margin-bottom:10px;">';
  html +=
    '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:' +
    p.color +
    ';margin-bottom:6px;">TONE & PACE</div>';
  html +=
    '<div style="font-size:13px;color:var(--charcoal3);">' +
    p.tone +
    '</div></div>';

  html +=
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">';
  html += '<div style="background:#FFFFFF;border-radius:12px;padding:14px;">';
  html +=
    '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:#29A26A;margin-bottom:8px;">✓ DO THIS</div>';
  p.do.forEach(function (d) {
    html +=
      '<div style="font-size:12px;color:var(--charcoal3);margin-bottom:5px;padding-left:8px;border-left:2px solid #29A26A;">' +
      d +
      '</div>';
  });
  html +=
    '</div><div style="background:#FFFFFF;border-radius:12px;padding:14px;">';
  html +=
    '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:var(--charcoal3);margin-bottom:8px;">✕ AVOID THIS</div>';
  p.dont.forEach(function (d) {
    html +=
      '<div style="font-size:12px;color:var(--charcoal3);margin-bottom:5px;padding-left:8px;border-left:2px solid var(--charcoal);">' +
      d +
      '</div>';
  });
  html += '</div></div>';

  html += '<div style="background:#FFFFFF;border-radius:12px;padding:14px;">';
  html +=
    '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:' +
    p.color +
    ';margin-bottom:10px;">EXACT SCRIPTS FOR THIS PERSONALITY</div>';
  p.scripts.forEach(function (s) {
    html +=
      '<div style="background:var(--milk);border-left:3px solid var(--charcoal);border-radius:8px;padding:12px 14px;font-size:13px;color:var(--charcoal3);margin-bottom:8px;line-height:1.6;">' +
      s +
      '</div>';
  });
  html += '</div></div>';

  el.innerHTML = html;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // AI-powered live scripts for this personality
  var aiDiv = document.createElement('div');
  aiDiv.id = 'psychAiScripts';
  aiDiv.style.cssText =
    'margin-top:12px;padding:14px 16px;background:var(--cha-bg-muted);border:1px solid #e2e8f0;border-radius:12px;font-size:13px;color:#64748b;';
  aiDiv.textContent =
    '✦ AI generating personalized scripts for this prospect...';
  el.appendChild(aiDiv);

  var sys =
    'You are an elite health insurance sales coach at Central Health Advisors. Generate 3 ultra-specific, conversational scripts for a ' +
    top +
    ' personality prospect. Scripts must be for selling private health benefit plans (MEC/STM/limited benefit — NOT ACA). Each script: max 2 sentences, ready to say verbatim, no placeholders. Format: 1. [script] 2. [script] 3. [script]';
  _aiGroq(
    sys,
    'Generate 3 live call scripts for a ' +
      top +
      ' type prospect who is considering enrolling in a private health benefit plan today.',
    function (text) {
      aiDiv.innerHTML =
        '<div style="font-size:10px;font-weight:800;color:#5175f1;letter-spacing:1px;margin-bottom:8px;">✦ AI SCRIPTS FOR THIS PROSPECT</div>' +
        '<div style="font-size:13px;color:#374151;line-height:1.8;white-space:pre-line;">' +
        escHTML(text) +
        '</div>';
    },
    function () {
      aiDiv.textContent = '';
    }
  );
}
