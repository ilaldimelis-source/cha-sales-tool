// ai-tools.js — AI Tools tab (Psych Profile, Compliance AI, Coaching AI, Discovery, Closing Engine)

function renderPsychprofile() {
  var html = '<div class="ph"><div class="pt">Client <span>Profiler</span></div>';
  html += '<div class="pd">Answer 5 quick questions about how your prospect is talking. The AI identifies their personality style and tells you exactly how to sell to them.</div></div>';

  html += '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;padding:24px;margin-bottom:16px;">';
  html += '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal3);margin-bottom:16px;">What signals are you picking up on this call?</div>';

  var questions = [
    {id:'q1', label:'How are they communicating?', opts:['Very direct, wants to get to the point fast','Asking lots of detailed questions about benefits','Friendly and personal, sharing about their life','Enthusiastic, big picture, talking about the future']},
    {id:'q2', label:'What is their main concern?', opts:['Results — does this actually work?','Accuracy — what exactly does it cover and not cover?','Relationships — will this affect my family?','Recognition — what do others say about this?']},
    {id:'q3', label:'How do they respond to your pitch?', opts:['Challenges you, pushes back fast','Asks follow-up questions, wants more data','Pauses, says they want to think or talk to someone','Gets excited, then suddenly hesitates']},
    {id:'q4', label:'What is their pace on the call?', opts:['Fast — they interrupt, they decide quickly','Slow and methodical — they want to understand everything','Moderate — they follow your lead','Variable — up and down with their emotions']},
    {id:'q5', label:'What word describes their vibe?', opts:['Controlling','Calculating','Caring','Charming']}
  ];

  questions.forEach(function(q) {
    html += '<div style="margin-bottom:18px;">';
    html += '<div style="font-weight:700;font-size:13px;color:var(--charcoal3);margin-bottom:8px;">' + q.label + '</div>';
    html += '<div style="display:flex;flex-direction:column;gap:6px;">';
    q.opts.forEach(function(opt, oi) {
      html += '<label style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--milk);border:1.5px solid rgba(220,170,180,0.2);border-radius:12px;cursor:pointer;font-size:13px;color:var(--charcoal);">';
      html += '<input type="radio" name="' + q.id + '" value="' + oi + '" style="accent-color:var(--charcoal3);"> ' + opt + '</label>';
    });
    html += '</div></div>';
  });

  html += '<button onclick="analyzePsych()" style="background:rgba(212,96,122,0.13);color:var(--charcoal3);border:1px solid rgba(212,96,122,0.3);border-radius:12px;padding:12px 28px;font-weight:800;font-size:14px;cursor:pointer;width:100%;margin-top:8px;">Analyze Client →</button>';
  html += '</div>';
  html += '<div id="psychResult" class="u-hide"></div>';

  var _page_psychprofile = document.getElementById('page-psychprofile'); if(_page_psychprofile) _page_psychprofile.innerHTML = html;
}

function analyzePsych() {
  var scores = {Driver:0, Analytical:0, Amiable:0, Expressive:0};
  var maps = [
    ['Driver','Analytical','Amiable','Expressive'],
    ['Driver','Analytical','Amiable','Expressive'],
    ['Driver','Analytical','Amiable','Expressive'],
    ['Driver','Analytical','Amiable','Expressive'],
    ['Driver','Analytical','Amiable','Expressive']
  ];
  var answered = 0;
  for (var qi = 1; qi <= 5; qi++) {
    var sel = document.querySelector('input[name="q' + qi + '"]:checked');
    if (sel) { scores[maps[qi-1][parseInt(sel.value)]]++; answered++; }
  }
  if (answered < 3) {
    alert('Please answer at least 3 questions for an accurate profile.');
    return;
  }
  var top = 'Driver', topScore = 0;
  Object.keys(scores).forEach(function(k) { if (scores[k] > topScore) { top = k; topScore = scores[k]; }});

  var profiles = {
    Driver: {
      icon:'', color:'var(--charcoal3)', bg:'rgba(212,96,122,0.08)',
      desc:'Drivers are results-oriented, decisive, and impatient. They want the bottom line fast and they make quick decisions when they trust the outcome.',
      sell:'Get to the point immediately. Lead with the result, not the features. They want to know it works — not how it works.',
      tone:'Confident, direct, fast-paced. Match their energy. Do not over-explain.',
      do:['Lead with the outcome: "This protects you starting tomorrow."','Skip the backstory. One sentence per benefit.','Give them a decision point early: "Does this sound like what you need?"','Match their pace — if they talk fast, you talk fast.','Close decisively: "Let\'s get this activated."'],
      dont:['Over-explaining — they will tune out','Long lists of features','Asking lots of questions before getting to the point','Soft or apologetic language'],
      scripts:['"Here is the short version: doctor visits, telemedicine, hospital coverage — starting tomorrow. No deductible."','"You told me the main thing was getting something in place fast. This does exactly that."','"Let\'s just get it done. Application takes about 4 minutes."']
    },
    Analytical: {
      icon:'', color:'var(--sec)', bg:'rgba(123,104,184,0.08)',
      desc:'Analyticals are detail-oriented, systematic, and risk-averse. They need accuracy and proof. They will ask about the fine print.',
      sell:'Give them structure, specifics, and data. Walk through benefits methodically. Answer every question precisely.',
      tone:'Calm, precise, thorough. Do not rush. Give them numbers.',
      do:['Use exact numbers: "$25 PCP copay, $50 specialist, $1,000/day hospital benefit up to $10,000."','Acknowledge limitations proactively — they will find them anyway.','Structure the call: "I am going to walk you through four things."','Welcome detailed questions — it means they are engaged.','Give them the compliance disclosures slowly and clearly.'],
      dont:['Vague language like "lots of coverage" or "really affordable"','Skipping limitations','Rushing to close before they feel fully informed','Emotional appeals without data to back them up'],
      scripts:['"The plan has a $25 primary care copay, $50 specialist copay. Hospital pays $1,000 per day up to $10,000 annually. Telemedicine is $0."','"I want to be completely upfront: this is a limited-benefit plan. Pre-existing conditions from the last 12 months have a 12-month exclusion. Does that make sense so far?"','"Take your time with this — I want you to feel completely clear before we proceed."']
    },
    Amiable: {
      icon:'', color:'#29A26A', bg:'rgba(41,162,106,0.08)',
      desc:'Amiables are relationship-focused, conflict-averse, and loyal. They want to feel heard, safe, and understood. They buy from people they trust.',
      sell:'Build personal connection before anything else. Show that you care about their specific situation. Make them feel safe making the decision.',
      tone:'Warm, patient, personal. Use their name. Reference what they told you.',
      do:['Reference personal details they shared: "You mentioned your daughter — let\'s make sure she is covered too."','Slow down and let them talk.','Validate before pivoting: "That makes complete sense."','Make the decision feel safe: "You can adjust this if anything changes."','Never pressure — offer options, not ultimatums.'],
      dont:['Rushing to close before they feel comfortable','Being transactional — they want a relationship','Ignoring emotional signals','Pushing back hard on hesitation — they will shut down'],
      scripts:['"Based on everything you shared with me, I really think this is going to give you the peace of mind you are looking for."','"There is no pressure here at all — I just want to make sure you have the right information to make the best decision for your family."','"A lot of people in your exact situation go with this plan because it handles the everyday things without the big insurance price tag."']
    },
    Expressive: {
      icon:'', color:'#7a5f00', bg:'rgba(184,134,11,0.08)',
      desc:'Expressives are enthusiastic, big-picture thinkers who respond to stories and vision. They get excited quickly — and lose interest quickly. They want to feel special.',
      sell:'Paint the picture. Connect coverage to their lifestyle and goals. Keep energy high. Move fast before enthusiasm fades.',
      tone:'Enthusiastic, storytelling, visionary. Match their excitement. Make it feel like a great decision.',
      do:['Open with the big picture: "Imagine having a doctor available anytime on your phone."','Use stories: "Most of my clients in your situation say telemedicine alone was worth it."','Keep the call moving — Expressives lose focus in long explanations.','Celebrate the decision: "You are making a smart move."','Get commitment while enthusiasm is high.'],
      dont:['Getting too detailed — they lose interest in the weeds','Slow methodical walkthroughs','Letting the call stall — momentum is everything','Ignoring their excitement when it shows up'],
      scripts:['"Picture this: 2AM, your kid has a fever. You open your phone, doctor is on in minutes, prescription called in. That is what this plan gives you."','"Honestly, the people who enroll in this are usually the ones who think ahead. You clearly do."','"You are going to love this — let\'s get it locked in while I have you."']
    }
  };

  var p = profiles[top];
  var el = document.getElementById('psychResult');
  var html = '<div style="background:' + p.bg + ';border:2px solid ' + p.color + '44;border-radius:12px;padding:24px;margin-bottom:16px;">';
  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">';
  html += '<span style="font-size:40px;">' + p.icon + '</span>';
  html += '<div><div style="font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--charcoal3);">' + top + ' Personality</div>';
  html += '<div style="font-size:12px;color:var(--warmgray3);margin-top:2px;">Confidence: ' + Math.round((topScore/5)*100) + '% match based on your answers</div></div></div>';
  html += '<div style="font-size:14px;color:var(--charcoal);line-height:1.7;margin-bottom:16px;">' + p.desc + '</div>';

  html += '<div style="background:#FFFFFF;border-radius:12px;padding:16px;margin-bottom:10px;">';
  html += '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:' + p.color + ';margin-bottom:6px;">HOW TO SELL TO THEM</div>';
  html += '<div style="font-size:13px;color:var(--charcoal3);">' + p.sell + '</div></div>';

  html += '<div style="background:#FFFFFF;border-radius:12px;padding:16px;margin-bottom:10px;">';
  html += '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:' + p.color + ';margin-bottom:6px;">TONE & PACE</div>';
  html += '<div style="font-size:13px;color:var(--charcoal3);">' + p.tone + '</div></div>';

  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">';
  html += '<div style="background:#FFFFFF;border-radius:12px;padding:14px;">';
  html += '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:#29A26A;margin-bottom:8px;">✓ DO THIS</div>';
  p.do.forEach(function(d) { html += '<div style="font-size:12px;color:var(--charcoal3);margin-bottom:5px;padding-left:8px;border-left:2px solid #29A26A;">'+d+'</div>'; });
  html += '</div><div style="background:#FFFFFF;border-radius:12px;padding:14px;">';
  html += '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:var(--charcoal3);margin-bottom:8px;">✕ AVOID THIS</div>';
  p.dont.forEach(function(d) { html += '<div style="font-size:12px;color:var(--charcoal3);margin-bottom:5px;padding-left:8px;border-left:2px solid var(--charcoal);">'+d+'</div>'; });
  html += '</div></div>';

  html += '<div style="background:#FFFFFF;border-radius:12px;padding:14px;">';
  html += '<div style="font-weight:800;font-size:11px;letter-spacing:1.5px;color:' + p.color + ';margin-bottom:10px;">EXACT SCRIPTS FOR THIS PERSONALITY</div>';
  p.scripts.forEach(function(s) {
    html += '<div style="background:var(--milk);border-left:3px solid var(--charcoal);border-radius:8px;padding:12px 14px;font-size:13px;color:var(--charcoal3);margin-bottom:8px;line-height:1.6;">' + s + '</div>';
  });
  html += '</div></div>';

  el.innerHTML = html;
  el.style.display = 'block';
  el.scrollIntoView({behavior:'smooth', block:'start'});
}

// ══════════════════════════════════════════════════════
// RENDER: COMPLIANCE AI
// ══════════════════════════════════════════════════════
function renderComplianceai() {
  var flagged = [
    {bad:'"This covers everything"', why:'Implies comprehensive coverage that does not exist on limited benefit plans.', fix:'"This plan covers specific benefits — doctor visits, telemedicine, and hospital indemnity benefits."'},
    {bad:'"You\'ll never pay anything"', why:'No plan eliminates all out-of-pocket costs. This creates a false expectation.', fix:'"Your out-of-pocket is significantly reduced — for example, a $25 copay instead of a $200 full-price visit."'},
    {bad:'"It\'s just like Obamacare"', why:'These plans are NOT ACA-compliant. Comparing them to ACA creates serious misrepresentation exposure.', fix:'"This is a private limited-benefit plan — it is different from ACA major medical, and I want to explain exactly how."'},
    {bad:'"This is real insurance"', why:'Ambiguous. Limited benefit and STM plans are not major medical insurance. Must clarify the type.', fix:'"This is a licensed health benefit plan administered by [carrier]. It is a limited-benefit plan, not major medical."'},
    {bad:'"Pre-existing conditions are covered"', why:'All plans in this portfolio exclude pre-ex for 12 months. This is a direct misrepresentation.', fix:'"Pre-existing conditions diagnosed or treated in the last 12 months have a 12-month exclusion period. After that, they are covered."'},
    {bad:'"You can see any doctor"', why:'All plans have network requirements. Some are EPO (in-network only). Out-of-network costs vary.', fix:'"You can see any doctor within the [First Health / PHCS / Multiplan] network — one of the largest in the country."'},
    {bad:'"Mental health is covered"', why:'MEC and standard limited benefit plans do not include mental health coverage.', fix:'"This plan does not include benefits for mental health services. I want to make sure you have the full picture."'},
    {bad:'"This covers maternity"', why:'None of the plans in this portfolio cover maternity or pregnancy-related care.', fix:'"This plan does not provide coverage for maternity or pregnancy-related care. You will not be needing those services, correct?"'},
    {bad:'"No waiting period"', why:'All plans have waiting periods — sickness 30 days on MEC, 5 days on STM. Only accidents are covered day one.', fix:'"Accident coverage starts day one. For sickness benefits, there is a standard waiting period of [5 or 30] days."'},
    {bad:'"This is better than your current plan"', why:'Comparative claims without full knowledge of their current plan create misrepresentation risk.', fix:'"Based on what you described, this plan addresses the gap you mentioned — let me walk you through exactly what it covers."'},
    {bad:'"The hospital bill is covered"', why:'Indemnity plans pay a fixed benefit — not the actual bill. Implies full payment which does not happen.', fix:'"The plan pays a fixed daily hospital benefit of $[amount] directly to you — it helps offset the hospital cost."'},
    {bad:'"This is cheap insurance"', why:'"Cheap" undermines perceived value and can imply inferior coverage without proper context.', fix:'"This plan is designed to be affordable — you get real benefits at a price that makes sense for your situation."'}
  ];

  var html = '<div class="ph"><div class="pt">Compliance <span>AI</span></div>';
  html += '<div class="pd">Type or paste any phrase you are considering saying. The AI flags it instantly and gives you the compliant version.</div></div>';

  html += '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;padding:20px;margin-bottom:20px;">';
  html += '<div style="font-weight:700;font-size:13px;color:var(--charcoal3);margin-bottom:10px;">Check a phrase before you say it:</div>';
  html += '<div style="display:flex;gap:8px;">';
  html += '<input id="complianceInput" type="text" aria-label="Type what you are about to say" placeholder="Type what you are about to say..." style="flex:1;background:var(--milk);border:1px solid #E8EBF5;border-radius:12px;padding:10px 16px;font-size:13px;color:var(--charcoal3);" onkeydown="if(event.key===\'Enter\')checkCompliance()">';
  html += '<button onclick="checkCompliance()" style="background:rgba(212,96,122,0.13);color:var(--charcoal3);border:1px solid rgba(212,96,122,0.3);border-radius:12px;padding:10px 20px;font-weight:800;font-size:13px;cursor:pointer;white-space:nowrap;">Check It</button>';
  html += '</div>';
  html += '<div id="complianceResult" style="margin-top:14px;display:none;"></div></div>';

  html += '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal3);margin-bottom:12px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg> Flagged Phrases — Never Say These</div>';
  flagged.forEach(function(f, i) {
    html += '<div style="background:#FFFFFF;border:1px solid rgba(220,38,38,0.15);border-radius:12px;margin-bottom:10px;overflow:hidden;">';
    html += '<div style="background:rgba(200,60,80,0.05);padding:12px 16px;border-bottom:1px solid rgba(200,60,80,0.1);">';
    html += '<div style="display:flex;align-items:center;gap:8px;"><span style="color:var(--charcoal3);font-size:16px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span><div style="font-weight:700;font-size:14px;color:var(--charcoal3);">' + f.bad + '</div></div>';
    html += '<div style="font-size:12px;color:var(--charcoal3);margin-top:4px;padding-left:26px;">' + f.why + '</div></div>';
    html += '<div style="padding:12px 16px;">';
    html += '<div style="display:flex;align-items:flex-start;gap:8px;"><span style="color:#29A26A;font-size:16px;">✔</span>';
    html += '<div style="font-size:13px;color:#29A26A;font-weight:600;line-height:1.5;">' + f.fix + '</div></div></div></div>';
  });

  var _page_complianceai = document.getElementById('page-complianceai'); if(_page_complianceai) _page_complianceai.innerHTML = html;
}

function checkCompliance() {
  var input = document.getElementById('complianceInput').value.toLowerCase().trim();
  if (!input) return;
  var flags = [
    {trigger:['covers everything','full coverage','covered for everything'], msg:'Implies comprehensive coverage.', fix:'Say: "This plan covers specific benefits — I want to walk you through exactly what those are."'},
    {trigger:["won't pay","never pay","pay nothing","zero out of pocket"], msg:'No plan eliminates all costs.', fix:'Say: "Your out-of-pocket is reduced significantly — for example, a $25 copay instead of the full visit price."'},
    {trigger:['obamacare','aca','marketplace','just like regular'], msg:'These plans are NOT ACA-compliant. Never compare.', fix:'Say: "This is a private limited-benefit plan — different from ACA major medical, and I will explain exactly how."'},
    {trigger:['pre-existing','pre existing','preexisting'], msg:'Pre-ex is excluded 12 months on all plans.', fix:'Say: "Pre-existing conditions from the last 12 months have a 12-month exclusion. After that window, they are covered."'},
    {trigger:['any doctor','see anyone','all doctors'], msg:'All plans have network restrictions.', fix:'Say: "Any doctor within the [network] — one of the largest provider networks in the country."'},
    {trigger:['mental health','therapy','psychiatric'], msg:'MEC and limited plans do NOT cover mental health.', fix:'Say: "This plan does not include mental health benefits — I always disclose that upfront."'},
    {trigger:['maternity','pregnancy','prenatal'], msg:'No plans in this portfolio cover maternity.', fix:'Say: "This plan does not cover maternity or pregnancy-related care."'},
    {trigger:['no waiting','starts immediately','covered right away','day one for sick'], msg:'Sickness has a waiting period. Only accidents are day one.', fix:'Say: "Accident coverage is day one. Sickness benefits begin after the standard waiting period of [X] days."'},
    {trigger:['covers the bill','pays the bill','pays everything','pays the hospital'], msg:'Indemnity plans pay fixed benefits — not the actual bill.', fix:'Say: "The plan pays a fixed daily benefit toward the hospital cost — not the full bill, but a defined amount directly to you."'},
    {trigger:['cheap','cheapest','bargain'], msg:'Undermines value and perceived quality.', fix:'Say: "This is designed to be affordable while giving you real everyday benefits."'},
    {trigger:['real insurance','actual insurance'], msg:'Ambiguous — must specify plan type.', fix:'Say: "This is a licensed private health benefit plan — a limited-benefit plan, not major medical."'}
  ];

  var result = document.getElementById('complianceResult');
  var found = false;
  for (var i = 0; i < flags.length; i++) {
    var f = flags[i];
    for (var j = 0; j < f.trigger.length; j++) {
      if (input.indexOf(f.trigger[j]) > -1) {
        result.innerHTML = '<div style="background:rgba(200,60,80,0.06);border:1.5px solid rgba(200,60,80,0.25);border-radius:12px;padding:16px;">' +
          '<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;"><span style="font-size:20px;"></span><div style="font-weight:800;color:var(--charcoal3);">Compliance Flag Detected</div></div>' +
          '<div style="font-size:13px;color:var(--charcoal3);margin-bottom:12px;">' + f.msg + '</div>' +
          '<div style="background:rgba(41,162,106,0.08);border:1px solid rgba(41,162,106,0.25);border-radius:8px;padding:12px 14px;">' +
          '<div style="font-size:10px;font-weight:800;color:#29A26A;letter-spacing:1.5px;margin-bottom:6px;">COMPLIANT VERSION</div>' +
          '<div style="font-size:13px;color:#29A26A;font-weight:600;">' + f.fix + '</div></div></div>';
        result.style.display = 'block';
        found = true;
        break;
      }
    }
    if (found) break;
  }
  if (!found) {
    result.innerHTML = '<div style="background:rgba(41,162,106,0.08);border:1.5px solid rgba(41,162,106,0.25);border-radius:12px;padding:14px;display:flex;gap:10px;align-items:center;">' +
      '<span style="font-size:24px;"></span><div style="font-size:13px;color:#29A26A;font-weight:700;">No compliance flags detected. Phrase looks good — always make sure to include the full required disclosures on every enrollment.</div></div>';
    result.style.display = 'block';
  }
}

// ══════════════════════════════════════════════════════
// RENDER: DISCOVERY QUESTION GENERATOR
// ══════════════════════════════════════════════════════
function renderDiscovery() {
  var categories = [
    {type:'S', label:'Situation', color:'var(--charcoal)', icon:'', desc:'Establish context. Keep brief — move to Problem quickly.',
     questions:['What are you currently doing for coverage?','How long have you been without coverage?','Are you looking for coverage for just yourself or your family too?','Are you self-employed, between jobs, or did your employer coverage recently end?','What coverage did you have before this?']},
    {type:'P', label:'Problem', color:'#7a5f00', icon:'', desc:'Surface the gap. Get them to say the problem in their own words.',
     questions:['What worries you most about being uninsured right now?','Has going without coverage ever cost you money out of pocket?','What happens if you need to see a doctor — what does that look like for you today?','What is the biggest risk of staying without a plan right now?','What has kept you from getting coverage up until now?']},
    {type:'I', label:'Implication', color:'var(--charcoal2)', icon:'', desc:'Make the problem bigger. Connect the gap to real financial consequences.',
     questions:['What would happen financially if you ended up in the hospital without coverage?','If you got into an accident tomorrow, what would that cost you out of pocket?','How much would one ER visit set you back right now?','Has not having coverage ever made you hesitate to go to the doctor when you probably should have?','If something happened and you had a $15,000 hospital bill — how would that change your financial situation?']},
    {type:'N', label:'Need-Payoff', color:'#29A26A', icon:'', desc:'Let them sell themselves. Ask what it would feel like to have this solved.',
     questions:['So having something in place would give you peace of mind?','If you had a plan that covered your doctor visits and gave you telemedicine at no cost — how would that change things?','How important is it to get this handled now rather than waiting?','Would it help to know that if something happened, you had coverage in place?','If we could get you covered starting tomorrow, would that solve the problem you described?']}
  ];

  var html = '<div class="ph"><div class="pt">Discovery <span>Questions</span></div>';
  html += '<div class="pd">SPIN-based question bank. Tap any question to copy it. Use Situation first, then Problem, then Implication, then Need-Payoff before presenting.</div></div>';

  html += '<div style="background:rgba(81,117,241,0.04);border:1px solid rgba(220,170,180,0.2);border-radius:12px;padding:14px 16px;margin-bottom:20px;font-size:13px;color:var(--charcoal);line-height:1.6;">';
  html += '<strong style="color:var(--charcoal3);">The SPIN Rule:</strong> Never present before you diagnose. Run at least one Problem and one Implication question before showing any plan. The prospect\'s pain must be real to them — not just to you.';
  html += '</div>';

  categories.forEach(function(cat, ci) {
    var did = 'disc-' + ci;
    html += '<div class="xcard" id="' + did + '" style="margin-bottom:10px;">';
    // Header — clickable toggle
    html += '<div class="xcard-hd" onclick="toggleDisc(\'' + did + '\')" style="display:flex;align-items:center;gap:12px;padding:14px 18px;cursor:pointer;">';
    html += '<div style="width:34px;height:34px;border-radius:50%;background:rgba(26,29,38,0.08);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:700;font-size:.9rem;color:#5C6878;flex-shrink:0;">' + cat.type + '</div>';
    html += '<div class="u-flex1"><div class="xcard-label">' + cat.label + ' Questions</div>';
    html += '<div class="xcard-sub">' + cat.desc + '</div></div>';
    html += '<div style="display:flex;align-items:center;gap:8px;">';
    html += '<span style="font-family:var(--font-ui);font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:999px;background:rgba(26,29,38,0.06);color:var(--txt-muted);">' + cat.questions.length + ' questions</span>';
    html += '<span class="xcard-chev" id="' + did + '-chev">▼</span></div>';
    html += '</div>';
    // Body — hidden by default
    html += '<div id="' + did + '-body" style="display:none;padding:4px 18px 16px;border-top:1px solid var(--rule);">';
    cat.questions.forEach(function(q) {
      html += '<div onclick="copyDiscovery(this)" data-q="' + q.replace(/"/g,'&quot;') + '" ';
      html += 'style="padding:11px 14px;background:var(--bg-card2);border:1px solid var(--rule);border-radius:8px;margin-top:8px;cursor:pointer;font-family:var(--font-body);font-size:.8rem;color:var(--txt-head);line-height:1.55;transition:all 0.15s;" ';
      html += 'onmouseover="this.style.borderColor=\'rgba(92,104,120,0.28)\';this.style.background=\'var(--bg-card3)\'" ';
      html += 'onmouseout="this.style.borderColor=\'var(--rule)\';this.style.background=\'var(--bg-card2)\'">';
      html += '\u201c' + q + '\u201d';
      html += '<span style="display:block;font-family:var(--font-ui);font-size:.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--txt-muted);margin-top:5px;">Tap to copy</span>';
      html += '</div>';
    });
    html += '</div></div>';
  });

  html += '<div id="discoveryCopied" style="display:none;position:fixed;bottom:30px;right:30px;background:#29A26A;color:#fff;border-radius:12px;padding:12px 20px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Copied to clipboard ✓</div>';

  var _page_discovery = document.getElementById('page-discovery'); if(_page_discovery) _page_discovery.innerHTML = html;
}

function toggleDisc(id) {
  var body = document.getElementById(id + '-body');
  var chev = document.getElementById(id + '-chev');
  var card = document.getElementById(id);
  var isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
  card.classList.toggle('open', !isOpen);
}

function copyDiscovery(el) {
  var q = el.getAttribute('data-q');
  if (navigator.clipboard) navigator.clipboard.writeText(q);
  var toast = document.getElementById('discoveryCopied');
  if (toast) { toast.style.display='block'; setTimeout(function(){toast.style.display='none';},2000); }
}

function renderClosingengine() {
  var situations = [
    {situation:'Prospect seems ready — engaged, no major objections', closes:[
      {type:'Assumptive', line:'"Let\'s go ahead and get this activated so you\'re covered."'},
      {type:'Assumptive', line:'"Based on everything we covered, let\'s get this started. I\'ll pull up the application now."'},
      {type:'Assumptive', line:'"Great — I\'ll go ahead and lock in that start date for you."'}
    ]},
    {situation:'Prospect is hesitant about timing', closes:[
      {type:'Soft', line:'"Would you prefer coverage starting tomorrow or the first of next month?"'},
      {type:'Soft', line:'"Do you want to get this in place today or would the 1st work better for your budget?"'},
      {type:'Soft', line:'"Should we start you on the basic plan and adjust from there, or go with the full coverage now?"'}
    ]},
    {situation:'Prospect is engaged but hasn\'t committed', closes:[
      {type:'Direct', line:'"Let\'s take care of the application while we\'re on the phone."'},
      {type:'Direct', line:'"Everything sounds good on my end — let\'s just get this submitted."'},
      {type:'Direct', line:'"The next step is simple — I just need a few details to get you enrolled."'}
    ]},
    {situation:'Prospect is stalling — mentions they\'ll think about it', closes:[
      {type:'Urgency', line:'"The rate I quoted you is based on today — I can\'t guarantee it holds if we reconnect next week."'},
      {type:'Urgency', line:'"Every day without coverage is a day you\'re exposed. This takes four minutes to activate."'},
      {type:'Urgency', line:'"The longer we wait, the longer you\'re unprotected. There\'s no reason to delay something that starts working tomorrow."'}
    ]},
    {situation:'Prospect agreed with your points — wants confirmation before deciding', closes:[
      {type:'Tie-Down', line:'"So having coverage for doctor visits and telemedicine is important to you, right? That\'s exactly what this does."'},
      {type:'Tie-Down', line:'"You said your biggest concern was an unexpected emergency — this addresses that starting day one, correct?"'},
      {type:'Tie-Down', line:'"It sounds like cost and real coverage were your two priorities — this plan hits both. Does that feel right?"'}
    ]},
    {situation:'Prospect says they are interested but wants to talk to someone', closes:[
      {type:'Agreement', line:'"Totally — is your [spouse/partner] available right now? I can walk you both through it in five minutes."'},
      {type:'Agreement', line:'"I completely respect that. What time tomorrow can all three of us connect so nobody has to play telephone?"'},
      {type:'Agreement', line:'"That makes sense. If they have questions, what are they typically worried about? I can address that now so you have the full picture."'}
    ]}
  ];

  var typeColors = {Assumptive:'var(--charcoal3)',Soft:'#29A26A',Direct:'#7a5f00',Urgency:'var(--sec)','Tie-Down':'#904020',Agreement:'#2A5A90'};
  var typeBg = {Assumptive:'rgba(212,96,122,0.1)',Soft:'rgba(41,162,106,0.1)',Direct:'rgba(184,134,11,0.1)',Urgency:'rgba(123,104,184,0.1)','Tie-Down':'rgba(200,110,60,0.1)',Agreement:'rgba(42,90,144,0.1)'};

  var html = '<div class="ph"><div class="pt">Closing <span>Engine</span></div>';
  html += '<div class="pd">Find the right close for your exact situation. Tap a line to copy it.</div></div>';

  html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">';
  Object.keys(typeColors).forEach(function(t) {
    html += '<span style="background:' + typeBg[t] + ';color:' + typeColors[t] + ';border-radius:12px;padding:5px 14px;font-size:12px;font-weight:800;">' + t + '</span>';
  });
  html += '</div>';

  situations.forEach(function(s) {
    html += '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;margin-bottom:12px;overflow:hidden;">';
    html += '<div style="background:#F8FAFF;padding:14px 18px;border-bottom:1px solid #E8EBF5;">';
    html += '<div style="font-size:11px;font-weight:800;letter-spacing:1.5px;color:var(--warmgray3);margin-bottom:4px;">SITUATION</div>';
    html += '<div style="font-size:13px;font-weight:700;color:var(--charcoal3);">' + s.situation + '</div></div>';
    html += '<div style="padding:14px 18px;">';
    s.closes.forEach(function(c) {
      var col = typeColors[c.type] || 'var(--charcoal3)';
      var bg = typeBg[c.type] || 'rgba(212,96,122,0.1)';
      html += '<div onclick="copyClose(this)" data-line="' + c.line.replace(/"/g,'&quot;') + '" style="display:flex;align-items:flex-start;gap:10px;padding:12px;background:var(--milk);border:1px solid rgba(220,170,180,0.2);border-radius:12px;margin-bottom:8px;cursor:pointer;" onmouseover="this.style.background=\'var(--milk)\'" onmouseout="this.style.background=\'var(--milk)\'">';
      html += '<span style="background:' + bg + ';color:' + col + ';border-radius:12px;padding:3px 10px;font-size:10px;font-weight:800;white-space:nowrap;flex-shrink:0;">' + c.type + '</span>';
      html += '<div style="font-size:13px;color:var(--charcoal3);line-height:1.5;">' + c.line + '</div></div>';
    });
    html += '</div></div>';
  });

  html += '<div id="closeCopied" style="display:none;position:fixed;bottom:30px;right:30px;background:#29A26A;color:#fff;border-radius:12px;padding:12px 20px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Copied ✓</div>';
  var _page_closingengine = document.getElementById('page-closingengine'); if(_page_closingengine) _page_closingengine.innerHTML = html;
}

function copyClose(el) {
  var line = el.getAttribute('data-line');
  if (navigator.clipboard) navigator.clipboard.writeText(line);
  var toast = document.getElementById('closeCopied');
  if (toast) { toast.style.display='block'; setTimeout(function(){toast.style.display='none';},2000); }
}

// ══════════════════════════════════════════════════════
// RENDER: CALL COACH AI
// ══════════════════════════════════════════════════════
function renderCoachingai() {
  var html = '<div class="ph"><div class="pt">Call Coach <span>AI</span></div>';
  html += '<div class="pd">Paste in something you said on a call. The AI identifies confidence leaks, filler words, and weak language — then rewrites it stronger.</div></div>';

  html += '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;padding:20px;margin-bottom:16px;">';
  html += '<div style="font-weight:700;font-size:13px;color:var(--charcoal3);margin-bottom:8px;">Paste what you said on the call:</div>';
  html += '<textarea id="coachInput" placeholder="Example: Maybe this could work for you, I think it might help..." style="width:100%;height:80px;background:var(--milk);border:1px solid #E8EBF5;border-radius:12px;padding:12px;font-size:13px;color:var(--charcoal3);resize:none;box-sizing:border-box;"></textarea>';
  html += '<button onclick="analyzeCall()" style="width:100%;background:rgba(212,96,122,0.13);color:var(--charcoal3);border:1px solid rgba(212,96,122,0.3);border-radius:12px;padding:12px;font-weight:800;font-size:14px;cursor:pointer;margin-top:10px;">Analyze My Language →</button>';
  html += '</div>';
  html += '<div id="coachResult" class="u-hide"></div>';

  // Common patterns library
  html += '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal3);margin:20px 0 12px;">Common Confidence Leaks — Know These Cold</div>';
  var leaks = [
    {bad:'Maybe this could work.',good:'Based on what you told me, this is the right plan for your situation.',why:'Maybe signals uncertainty. You are the expert — speak like one.'},
    {bad:'I think this might help.',good:'This plan directly addresses what you described.',why:'Think + might = double uncertainty. Use declarative language.'},
    {bad:'It\'s not that expensive.',good:'At $[X] a month, this is less than the cost of one urgent care visit.',why:'Don\'t define value by price. Anchor to comparison.'},
    {bad:'Sorry to bother you.',good:'I appreciate your time — this will only take a few minutes.',why:'Apologizing for your call signals low value. Never apologize for offering help.'},
    {bad:'If you\'re interested...',good:'When we get you enrolled today...',why:'If suggests they might not be. Assume the sale.'},
    {bad:'Does that make sense?',good:'Is there anything you want me to walk through again?',why:'Asking if it makes sense implies you think it might not. Ask for their questions instead.'},
    {bad:'Umm... so... basically...',good:'[Pause. Breathe. Then speak.]',why:'Filler words signal unpreparedness. Silence is more powerful than umm.'},
    {bad:'I\'m not sure but I think...',good:'Let me confirm that for you — [give the exact answer].',why:'Uncertainty about your own product kills credibility instantly.'},
    {bad:'It\'s kind of like regular insurance.',good:'This is a private limited-benefit plan. Here is exactly how it works.',why:'Kind of = vague. Also a compliance issue — never compare to regular insurance.'},
    {bad:'A lot of people don\'t really use it much.',good:'Most members use telemedicine for their everyday needs — it resolves about 70% of common conditions.',why:'Underselling your own product before the client even asks.'}
  ];

  leaks.forEach(function(l) {
    html += '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;margin-bottom:10px;overflow:hidden;">';
    html += '<div style="padding:12px 16px;background:rgba(200,60,80,0.04);border-bottom:1px solid rgba(200,60,80,0.1);">';
    html += '<div style="display:flex;gap:8px;align-items:flex-start;"><span style="color:var(--charcoal3);flex-shrink:0;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span><div style="font-size:13px;color:var(--charcoal3);font-weight:600;">' + l.bad + '</div></div>';
    html += '<div style="font-size:11px;color:#B08090;margin-top:4px;padding-left:20px;">' + l.why + '</div></div>';
    html += '<div style="padding:12px 16px;display:flex;gap:8px;align-items:flex-start;"><span style="color:#29A26A;flex-shrink:0;">✔</span>';
    html += '<div style="font-size:13px;color:#29A26A;font-weight:700;">' + l.good + '</div></div></div>';
  });

  var _page_coachingai = document.getElementById('page-coachingai'); if(_page_coachingai) _page_coachingai.innerHTML = html;
}

function analyzeCall() {
  var input = document.getElementById('coachInput').value.trim();
  if (!input) return;
  var lower = input.toLowerCase();

  var flags = [
    {triggers:['maybe','might','could work','might help','possibly'], label:'Uncertainty Language', severity:'high', suggestion:'Replace with declarative statements. You are the expert.'},
    {triggers:['i think','i believe','i feel like','i suppose'], label:'Hedging Language', severity:'high', suggestion:'State facts directly. Remove "I think" — just say it.'},
    {triggers:['sorry','apologize','bother','interrupt'], label:'Apologetic Opener', severity:'medium', suggestion:'Never apologize for offering help. Say "I appreciate your time" instead.'},
    {triggers:['umm','uh','um,','uh,','basically','you know','like,'], label:'Filler Words', severity:'medium', suggestion:'Pause instead of filling silence. Silence reads as confidence.'},
    {triggers:['if you are interested','if you want','if you decide'], label:'Assumptive Failure', severity:'high', suggestion:'Use "when" not "if." Assume the sale.'},
    {triggers:['not that expensive','pretty cheap','affordable enough'], label:'Weak Value Language', severity:'medium', suggestion:'Anchor to comparison: "Less than the cost of one urgent care visit."'},
    {triggers:['make sense?','does that make sense','understand?'], label:'Competence Signal', severity:'low', suggestion:'Ask "What questions do you have?" instead of implying it might be confusing.'},
    {triggers:['kind of like','sort of like','similar to regular','like obamacare','like major medical'], label:'Compliance Risk + Vague Comparison', severity:'critical', suggestion:'This is a compliance issue. Never compare to ACA or regular insurance. State the plan type specifically.'},
    {triggers:["i'm not sure","not sure about that","i don't know"], label:'Knowledge Gap Signal', severity:'high', suggestion:'Say: "Let me confirm that for you." Never signal uncertainty about your product.'},
    {triggers:['no one really','people don\'t usually','not many people'], label:'Underselling', severity:'medium', suggestion:'Never diminish your product before the client does. Lead with value.'}
  ];

  var found = [];
  flags.forEach(function(f) {
    f.triggers.forEach(function(t) {
      if (lower.indexOf(t) > -1 && found.indexOf(f) === -1) found.push(f);
    });
  });

  var severityColor = {critical:'var(--charcoal3)', high:'var(--charcoal3)', medium:'#7a5f00', low:'var(--sec)'};
  var severityBg = {critical:'rgba(200,60,80,0.08)', high:'rgba(92,104,120,0.04)', medium:'rgba(184,134,11,0.06)', low:'rgba(123,104,184,0.06)'};

  var el = document.getElementById('coachResult');
  var html = '';

  if (!found.length) {
    html = '<div style="background:rgba(41,162,106,0.08);border:1.5px solid rgba(41,162,106,0.25);border-radius:12px;padding:20px;display:flex;gap:12px;align-items:center;">';
    html += '<span style="font-size:32px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 12l3.5 3.5 6-7"/></svg></span><div><div style="font-weight:800;font-size:15px;color:#29A26A;">No confidence leaks detected.</div>';
    html += '<div style="font-size:13px;color:#3A7A6A;margin-top:4px;">Your language is strong and direct. Keep going.</div></div></div>';
  } else {
    html += '<div style="background:#FFFFFF;border:1px solid #E8EBF5;border-radius:12px;padding:20px;margin-bottom:16px;">';
    html += '<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--charcoal3);margin-bottom:4px;">' + found.length + ' issue' + (found.length>1?'s':'') + ' found</div>';
    html += '<div style="font-size:12px;color:var(--warmgray3);margin-bottom:16px;">Your original: <em style="color:var(--charcoal);">"' + escHTML(input) + '"</em></div>';
    found.forEach(function(f) {
      html += '<div style="background:' + severityBg[f.severity] + ';border-left:3px solid ' + severityColor[f.severity] + ';border-radius:8px;padding:12px 14px;margin-bottom:10px;">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">';
      html += '<span style="background:' + severityColor[f.severity] + '22;color:' + severityColor[f.severity] + ';border-radius:12px;padding:2px 10px;font-size:10px;font-weight:800;">' + f.severity.toUpperCase() + '</span>';
      html += '<div style="font-weight:700;font-size:13px;color:var(--charcoal3);">' + f.label + '</div></div>';
      html += '<div style="font-size:12px;color:var(--charcoal);">' + f.suggestion + '</div></div>';
    });

    // Rewrite suggestion
    var rewrite = input
      .replace(/maybe /gi,'')
      .replace(/i think /gi,'')
      .replace(/i believe /gi,'')
      .replace(/might /gi,'will ')
      .replace(/could /gi,'will ')
      .replace(/sort of /gi,'')
      .replace(/kind of /gi,'')
      .replace(/if you are interested/gi,'when we get you enrolled')
      .replace(/if you want/gi,'when you are ready')
      .replace(/does that make sense\??/gi,'What questions do you have?')
      .replace(/umm+,?\s*/gi,'')
      .replace(/uh,?\s*/gi,'')
      .replace(/basically,?\s*/gi,'')
      .replace(/you know,?\s*/gi,'');

    html += '<div style="margin-top:16px;background:var(--milk);border-left:3px solid #29A26A;border-radius:12px;padding:14px 16px;">';
    html += '<div style="font-size:10px;font-weight:800;letter-spacing:1.5px;color:#29A26A;margin-bottom:8px;">STRONGER VERSION</div>';
    html += '<div style="font-size:14px;color:#2A4A40;font-weight:600;line-height:1.6;">"' + escHTML(rewrite.trim()) + '"</div></div>';
    html += '</div>';
  }

  el.innerHTML = html;
  el.style.display = 'block';
  el.scrollIntoView({behavior:'smooth', block:'start'});
}
