// call-playbook.js — Call Playbook tab (Call Flow, Closes, Scripts, Plan Scripts)

function copyScriptBubble(btn) {
  var bubble = btn.closest('div[style*="border-radius:16px"]');
  if (!bubble) return;
  var textEl = bubble.querySelector('.ps-bubble-text');
  if (!textEl) return;
  var text = textEl.textContent || textEl.innerText;
  if (typeof safeCopy === 'function') {
    safeCopy(text)
      .then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () {
          btn.textContent = 'Copy';
        }, 1500);
      })
      .catch(function () {});
  }
}

const CLOSES = [
  {
    line: "It sounds like you're about 90% there. What's the 10% that's holding you back?",
    type: 'soft',
    when: 'They seem interested but hesitating without a clear objection.',
    tone: "Genuinely curious. You're helping them identify their own concern.",
    before:
      'After presenting. When temperature is warm but not fully committed.',
    bridge:
      "'I want to make sure you feel completely good about this.' → this close.",
    hesitate:
      "Let the silence sit. They'll fill it. Their answer is your next objection."
  },
  {
    line: 'What would make you feel completely comfortable moving forward today?',
    type: 'soft',
    when: 'Analytical or cautious buyers who need to feel in control.',
    tone: 'Open and collaborative. Let them give you the answer.',
    before: "After you've presented fully and there's still hesitation.",
    bridge:
      "'I've covered everything I think is relevant. Tell me what's still open.'",
    hesitate: 'Whatever they say becomes your final objection to handle.'
  },
  {
    line: "The risk of waiting is that anything that happens between now and when you enroll becomes pre-existing. Getting covered today means you're protected immediately.",
    type: 'urgency',
    when: 'They want to delay with no specific reason. Based on fact — not fear.',
    tone: 'Informative. State it as a fact, not a threat.',
    before:
      'After addressing their specific concerns, when only inertia is left.',
    bridge:
      "'I hear you on wanting to think about it. Here's the one thing I want you to factor in...' → this line.",
    hesitate: "'Does that change your thinking at all?'"
  },
  {
    line: 'I can get you started today for [amount]. Should we use a credit card or bank account?',
    type: 'direct',
    when: "They've agreed conceptually but haven't committed to action.",
    tone: 'Direct and professional. No hedging.',
    before: "After they say 'yes this makes sense' or similar agreement.",
    bridge: "'Perfect. Let's get that in place right now.' → this line.",
    hesitate: "'Is there another payment method that works better for you?'"
  },
  {
    line: "You have a gap right now. This fills it. We can have you covered by tomorrow. That's all this is.",
    type: 'direct',
    when: "Prospects who've been going back and forth and need simple clarity.",
    tone: 'Simple, certain, calm. Let the clarity do the work.',
    before:
      'After multiple objections have been handled. When they need simplicity.',
    bridge:
      "'Let me cut through everything we've discussed and say it simply...'",
    hesitate: "Silence. Let it sit. Don't add anything."
  },
  {
    line: 'Does this make sense for your situation?',
    type: 'tiedown',
    when: 'After explaining a key benefit. Gets micro-commitments throughout the call.',
    tone: 'Genuine question. You actually want to know.',
    before:
      'After presenting each major benefit during the presentation phase.',
    bridge:
      "Use after every benefit: '[benefit explanation]' → 'Does that make sense for your situation?'",
    hesitate: "If no: 'What part doesn't make sense? Let me clarify.'"
  },
  {
    line: "So we're in agreement that [X] is the most important thing for you right now, correct?",
    type: 'agreement',
    when: 'Summary close. Confirms their stated need before presenting the solution.',
    tone: "Confirmatory. You're reflecting back what they told you.",
    before: 'After discovery, before or during presentation.',
    bridge:
      "'Based on what you've told me, [restate their pain] is the main thing. Is that right?' → this line.",
    hesitate:
      "'Let me make sure I've got this right...' and restate it differently."
  },
  {
    line: "I'm going to be in and out of calls all day — let's lock in a specific time right now so I'm available. Does 2pm or 4pm work better for you?",
    type: 'soft',
    when: "They say they'll call back. Never leave without a scheduled time.",
    tone: "Helpful and practical. You're doing them a favor.",
    before: 'Whenever a prospect tries to end the call without committing.',
    bridge: "'I want to make sure we have time to do this properly...'",
    hesitate:
      "Give them two specific options only. No open-ended 'whenever works for you.'"
  }
];

const CF_STEPS = [
  {
    num: 1,
    color: 'var(--charcoal)',
    title: 'Opening',
    goal: 'Open the call with confidence. Set the frame and earn the next 60 seconds.',
    lines: [
      "Hey [Name], this is [Your Name] calling about your health coverage inquiry. I've got a couple of questions for you before I recommend anything — is now okay?",
      "[Name], this is [Your Name]. I'm looking at your inquiry right now — before I walk you through your options, tell me: what's your coverage situation like right now?"
    ],
    listen:
      'Wait for their pace. Match their tone. Move into Discovery the moment they engage.',
    mistakes: [
      'Launching into a pitch before earning permission',
      'Sounding like a script instead of a human',
      'Skipping past their first answer to rush into benefits'
    ]
  },
  {
    num: 2,
    color: '#7a5f00',
    title: 'Discovery',
    goal: 'Surface the real situation: budget, gap, fear, stakes, and future picture. Listen more than you talk.',
    lines: [
      'If you found something that actually made sense for your situation, what kind of range are you comfortable working with per month?',
      "What's going on with your coverage right now? Are you between jobs, self-employed — what's the situation?",
      "What's your biggest concern about not having any coverage right now?",
      'If you had a medical situation tomorrow — ER, urgent care, something unexpected — what happens? Are you covered?',
      'What would it mean for you to have something in place that covers the basics — doctor visits, prescriptions, emergencies?'
    ],
    listen:
      'Write down the exact words they use for budget, gap, and fear. You will repeat them back during Positioning.',
    mistakes: [
      'Talking over their answers',
      'Asking yes/no questions instead of open ones',
      'Moving to Positioning before you have a clear picture of the stakes'
    ]
  },
  {
    num: 3,
    color: '#29A26A',
    title: 'Validation',
    goal: 'Acknowledge what they just shared. Make them feel heard before you recommend anything.',
    lines: [
      "That makes complete sense — and honestly, that's exactly why I want to make sure I'm recommending the right thing for your specific situation, not just something generic.",
      "That's the most important thing you've told me. A lot of people I work with have had that experience — and it changes how I'd approach this with you.",
      "I appreciate you being honest about that. Then it's even more important that whatever we do, it's the right fit — I'm not going to put you in something that doesn't work for you."
    ],
    listen:
      'Tone shift. If they relax after you validate, you earned trust. If they stay guarded, slow down.',
    mistakes: [
      'Skipping validation and jumping into the pitch',
      'Sounding scripted instead of genuine',
      "Validating and then immediately contradicting them"
    ]
  },
  {
    num: 4,
    color: 'var(--charcoal2)',
    title: 'Positioning',
    goal: 'Recommend the plan type that matches what they told you. Tie the plan directly to their words.',
    lines: [
      "This plan pays set amounts for the services you actually use most — office visits, urgent care, ER. You know exactly what you're getting and exactly what you're spending. No surprises.",
      "This covers your preventive care — annual wellness, screenings, immunizations — at no deductible. It's not full major medical, but it keeps you covered for staying healthy and it fits your budget.",
      "This is a short-term medical plan — it covers you for the unexpected: hospital stays, surgery, serious illness or injury. It's real protection for what actually costs you money."
    ],
    listen:
      'Watch for head-nod cues: "that makes sense", "okay", "right". Those are buying signals — move to Rebuttals or Closing.',
    mistakes: [
      'Positioning a plan that does not match their stated needs',
      'Over-explaining features instead of tying to their situation',
      'Pitching more than one plan at once'
    ]
  },
  {
    num: 5,
    color: 'var(--charcoal)',
    title: 'Rebuttals',
    goal: 'Handle the objection. Diagnose the real concern, acknowledge, reframe, bridge back to the close.',
    lines: [
      "I hear you — that's one of the most common concerns. Most people are already spending money unpredictably on healthcare… this just makes it controlled and actually protects you.",
      "Of course — you should feel comfortable. Usually when someone says that, there's just one thing that isn't fully clear yet.",
      "Of course — that's important. If you feel good about it, it's much easier to explain it to them.",
      'I can definitely send it — I just want to make sure it actually makes sense when you read it.'
    ],
    listen:
      'The first objection is rarely the real one. Diagnose with a soft question before you respond.',
    mistakes: [
      'Arguing instead of acknowledging',
      'Lowering the price before establishing value',
      "Accepting 'let me think about it' without asking what specifically"
    ]
  },
  {
    num: 6,
    color: 'var(--charcoal)',
    title: 'Closing Statement',
    goal: 'Summarize coverage, confirm understanding on a recorded line, then collect contact information in order.',
    lines: [
      'Your coverage is scheduled to start on ______, pending enrollment and verification.',
      'You can see in-network providers with no referral required, and the plan includes day-to-day benefits and fixed hospital benefits, all with no deductible.',
      'Before we proceed, can you confirm that everything we have reviewed about the plan and its limitations has been explained and understood?',
      '[Wait for Answer]',
      'OK Perfect — what is a good email we can send all this over to?',
      'Would you like your insurance cards issued with a middle initial, or just your first and last name?',
      'What is the physical mailing address where we should send your hard-copy documents to?',
      'And just to confirm, is this phone number ________ the best number for the insurance company to reach you if they have any follow-up or verification questions?'
    ],
    listen:
      'Wait for confirmation on understanding. Then collect email, name format, address, and callback number in that exact order.',
    mistakes: [
      'Collecting info before getting the understanding confirmation',
      'Skipping the recorded line confirmation',
      'Rushing through the contact info collection'
    ]
  },
  {
    num: 7,
    color: '#7a5f00',
    title: 'Collect Payment',
    goal: 'Collect the initial payment cleanly. After asking for the card number — SAY NOTHING. Whoever talks first loses.',
    lines: [
      'For the initial payment, which card type would you prefer to put on file?',
      '[Wait for Answer]',
      'OK go ahead with the card number. OR: I am ready for the card number when you are ready.',
      '[DO NOT SPEAK — WHOEVER TALKS FIRST LOSES]'
    ],
    listen:
      'Complete silence after asking for card number. Do not fill the silence. Do not add anything. Wait.',
    mistakes: [
      'Talking after asking for the card number',
      'Offering options or reassurance during the silence',
      'Sounding nervous or apologetic about collecting payment'
    ]
  },
  {
    num: 8,
    color: '#29A26A',
    title: 'Compliance Lines',
    goal: 'Deliver every required disclosure on a recorded line, clearly and without softening.',
    lines: [
      "I want to be upfront with you — this is not an ACA-compliant plan. It's a [limited benefit / short-term medical / MEC] plan, which is why the pricing is different. Let me tell you specifically what it does and doesn't cover.",
      "One important thing to know: pre-existing conditions — meaning things you've been diagnosed or treated for in the last 12 months — aren't covered during the first 12 months of this plan. After that, you're covered going forward.",
      "I do need to make sure you're aware: this plan does not cover mental health treatment, maternity, or substance abuse rehab. Those are excluded under this type of plan.",
      "For illness — cold, flu, anything like that — there's a 30-day waiting period from your start date. Injuries are covered from day one."
    ],
    listen:
      'Get a verbal acknowledgement after each disclosure. Do not move on until they confirm.',
    mistakes: [
      'Softening or glossing over the non-ACA disclosure',
      'Skipping the pre-existing 12/12 clause',
      'Rushing through exclusions so the prospect does not register them'
    ]
  },
  {
    num: 9,
    color: 'var(--charcoal2)',
    title: 'Verification',
    goal: 'Verify citizenship, accuracy of health info, and SSN on the recorded line before issuing the DocuSign link.',
    lines: [
      'Before we complete the enrollment, I do need to verify a few items on this recorded line.',
      'Can you please confirm that you are a United States citizen or legal resident, and that all health information you provided today is accurate and complete to the best of your knowledge?',
      'Lastly, for identity verification purposes, please confirm your Social Security number.',
      '[Wait for Answer]'
    ],
    listen:
      'Listen for clear verbal confirmation on each item. No mumbles, no half-answers.',
    mistakes: [
      'Skipping the recorded citizenship/health info confirmation',
      'Rushing SSN collection without giving them time to respond',
      'Moving to the DocuSign link before verification is complete'
    ]
  },
  {
    num: 10,
    color: '#29A26A',
    title: 'Send DocuSign',
    goal: 'Send the OneEnrollment link, walk them through document review, get signature. Your job is to guide, not rush.',
    lines: [
      'This is the final step. I am sending you a text now from a 732 number labeled ONE ENROLLMENT. Please click the link once you receive it. Let me know when you see it.',
      '[Wait for Answer]',
      'Great. Please open the link and, if possible, place your phone on speaker so I can walk you through the document.',
      'Your role here is simply to confirm that everything has been entered correctly.',
      'I will have you verify the spelling of your first and last name, your home address, email address, and phone number, as well as confirm that your date of birth and gender are accurate.',
      'I will also ask you to confirm the payment method on file and the billing address associated with the application. Once you have reviewed everything, let me know — does it all look correct?',
      '[Wait for Answer]',
      'As you scroll down, you will see what is called a bill-by-benefit breakdown. It is just a transparent summary showing how the policy is set up and how the cost is allocated across the benefits.',
      '[TDK plans only] You will also see the specific name of the plan — TDK stands for Transforming Data to Knowledge, administered through Detego Health.',
      '[MedFirst 4/5 and TDK 4/5 only] As you scroll through the document there will be acknowledgement boxes to check off — there should be 8 of them.',
      '[BWA Paramount only] There will be 13 acknowledgement boxes to check off.',
      'At the bottom, enter your first and last name — please capitalize both. Then sign electronically with your finger.',
      'You can leave the last checkbox unchecked unless you are applying for your child only. Click Accept and tell me what you see.',
      '[You have successfully signed your document]'
    ],
    listen:
      'Wait for them to confirm they see the link. Guide them step by step. Do not rush the signature.',
    mistakes: [
      'Sending the link without confirming they received it',
      'Rushing through the document review',
      'Not noting the plan-specific checkbox counts (8 for some, 13 for BWA)'
    ]
  },
  {
    num: 11,
    color: 'var(--butter2)',
    title: 'Post Close',
    goal: 'Submit the application, give confirmation number, provide network website, recap carrier and admin details, deliver the pre-existing / waiting period disclosure, ask for referrals, and close warmly.',
    lines: [
      'Perfect — I have received your signature on my end. I am going to go ahead and submit your application to the insurance carrier now.',
      'Congratulations, [Customer Name] — your application is complete. Do you have a pen and paper?',
      'Our customer service number is 855-736-1590, available Monday through Friday, 9:00 a.m. to 9:00 p.m. Eastern.',
      'Your confirmation number is CHA561337 — please keep that for your records. If anyone calls claiming to be from our agency and cannot provide that number, they are not affiliated with us.',
      'Now go ahead and write down [FIRST HEALTH NETWORK / MULTIPLAN PHCS NETWORK / MULTIPLAN NETWORK].',
      'The website to search providers: [providerlocator.firsthealth.com / providersearch.multiplan.com]',
      'Your plan uses the [network] for doctors and hospitals. The insurance benefits are underwritten by [carrier] and offered through [association]. Your monthly billing is handled through FirstEnroll / NEO Insurance Solutions.',
      'I do want to clarify that this is a private, [limited-benefit / short-term] plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.',
      'I also want to explain the 12 and 12 pre-existing condition clause — anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness, and scheduled doctor visits.',
      'If you have any friends or family members that need quality coverage, please give them my information. We will find them the right plan just as we did for you.',
      'Alright [customer name], you have been an absolute pleasure. Do you have any questions before we disconnect?'
    ],
    listen:
      'Give them time to write down the confirmation number and network info. Do not rush. This is the last impression they have of you.',
    mistakes: [
      'Skipping the pre-existing / 30-day waiting period disclosure in the post close',
      'Forgetting to ask for referrals',
      'Not giving them time to write down the confirmation number',
      'Skipping the non-ACA / no maternity / no substance abuse / no psych services disclosure'
    ]
  }
];

var PLAN_SCRIPTS = [
  {
    name: 'Pre-Qualification',
    planType: 'Shared',
    sections: [
      {
        title: 'Pre-Qualification Script',
        content:
          "Pre Qualification\nCentral Health Advisors, this is (FIRST AND LAST NAME). I'll be your licensed health insurance agent assisting you today. Please note that this call may be recorded for training and quality assurance.\nWere you looking for an individual or family plan TODAY?\n(IF INDIVIDUAL) - (Move on to next question)\n(IF FAMILY) - And how many family members will be included onto the plan TODAY?\nOK! GREAT! Now are you currently insured?\n✔ (IF YES) And do you have that plan through the state, Marketplace, or through your employer?\n✔ (IF YES) And just so I know how to HELP you today, were you looking for better coverage, lower rates, or is your policy expiring?\n✖ (IF NO) Just so I know how to better HELP you, how long have you been without coverage?\nDo you have any pre-existing medical conditions I should be aware of?\nAre you currently taking any medications you'd like me to make sure are covered?\nWhat is your Date of Birth?\nPlease verify your zip code?\nAre you a tobacco user?\nOn average, how many times would you say that you go to the doctors on a yearly basis?\nDo you have any doctors that you would like to keep in the network, just so I can place you into a plan that they participate in?\nDo you have any upcoming surgeries, procedures or any treatments scheduled?\nPerfect! Now to see if you may qualify for any state programs or any government subsidies, how much money do you make on a yearly basis BEFORE TAX?\nIs there a monthly price range you're hoping to stay within so I can narrow down the best options?\nExcellent. Assuming we find the right fit, how soon would you like your coverage to begin?\nPerfect. I'm going to submit your information into my system now so I can pull up all of your available options. Give me about 30 to 60 seconds while I review everything, and I'll be right back with you.\n(THIS IS THE SIZZLE!!!!)"
      }
    ]
  },
  {
    name: 'Everest / HarmonyCare / SigmaCare',
    planType: 'Limited',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          "✖ ( DO NOT ASK IF THEY ARE STILL THERE)\nAlright [Customer Name], I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through the Multiplan Network/FirstHealth Network. This plan offers fixed benefits for doctor visits, hospital care, and prescription savings. You have the flexibility to see any provider within the network, and there's no requirement for referrals to visit a specialist. Another key advantage is nationwide access—this coverage can be used anywhere the network is accepted. And most importantly, there is no deductible. Does everything sound clear so far?\n▶ ( Wait for Answer )\nGreat. Based on everything we've reviewed, the monthly rate for this plan comes out to $___. There is a one-time standard group association fee of $___ to activate your membership within the plan. That brings the total for the first month to $___, and then moving forward, your monthly cost is simply $___ thereafter. Now, assuming this plan meets your medical needs, would the initial first-month amount of $___ be affordable for you today?\n▶ ( Wait for answer )\nPerfect. What I'll do next is walk you through the full benefits of the program. If everything looks good to you, we'll move forward with submitting the application to the insurance company. During the verification process, you'll receive an email that includes an outline of your coverage along with digital insurance cards. Your physical cards will then arrive by mail within approximately one to three weeks. Okay?\n▶ ( Wait for answer )\nYou don't need referrals to see a specialist. When you visit a doctor, the bill is first reduced to the network's contracted rate, and then your doctor visit benefit is applied. So if a provider bills higher, the network adjusts it first, and your benefit helps cover the cost after that.\n▶ ( Wait for Answer )\nPeople like this plan because it's simple. Unlike traditional plans with deductibles and coinsurance, this plan has no deductible and pays defined benefit amounts toward covered services—so you know what the plan contributes and can plan your expenses more easily.\n✖ ( DO NOT WAIT - GO TO RX )"
      },
      {
        title: 'Prescription (RX)',
        content:
          "You'll also receive access to a prescription discount program you can use at major pharmacies. Discounts vary, but many members find it helpful. The plan does not include benefits for mental health, substance abuse, or pregnancy-related care. You won't be needing coverage for those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement',
        content:
          "Your coverage is scheduled to start on ______, pending enrollment and verification. You can see in-network providers with no referral required, and the plan includes day-to-day benefits and fixed hospital benefits, all with no deductible. Before we proceed, can you confirm that everything we've reviewed about the plan and its limitations has been explained and understood?\n▶ ( Wait for Answer )\nOK Perfect, what is a good email we can send all this over to?\nWould you like your insurance cards issued with a middle initial, or just your first and last name?\nWhat is the physical mailing address where we should send your hard-copy documents to?\nGreat. And just to confirm, is this phone number ________ the best number for the insurance company to reach you if they have any follow-up or verification questions?\nBefore we complete the enrollment, I do need to verify a few items on this recorded line. Can you please confirm that you are a United States citizen or legal resident, and that all health information you provided today is accurate and complete to the best of your knowledge? Lastly, for identity verification purposes, please confirm your Social Security number?\n▶ ( Wait for Answer )\nFor the initial payment, which card type would you prefer you put on file?\n▶ ( Wait for Answer )\nOk go ahead with the card number. (OR) I'm ready for the card number when you're ready.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )"
      },
      {
        title: 'Verification',
        content:
          "This is the final step. I'm sending you a text now from a 732 number labeled 'ONE ENROLLMENT.' Please click the link once you receive it. Let me know when you see it.\n▶ ( Wait for Answer )\nGreat. Please open the link and, if possible, place your phone on speaker so I can walk you through the document. Your role here is simply to confirm that everything has been entered correctly. I'll have you verify the spelling of your first and last name, your home address, email address, and phone number, as well as confirm that your date of birth and gender are accurate. I'll also ask you to confirm the payment method on file and the billing address associated with the application. Once you've reviewed everything, let me know—does it all look correct?\n▶ ( Wait for Answer)\nAs you scroll down, you'll see what's called a bill-by-benefit breakdown. It's just a transparent summary showing how the policy is set up and how the cost is allocated across the benefits. (Everest has 1 check box asking consent for email in the middle of the verification.)\nAt the bottom, enter your first and last name—please capitalize both. Then sign electronically with your finger. You can leave the last checkbox unchecked unless you're applying for your child only. Click 'Accept' and tell me what you see.\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          "Perfect—I've received your signature on my end. I'm going to go ahead and submit your application to the insurance carrier now.\n✔ ( If it goes through )\nCongratulations [Customer Name], your application is complete. Do you have a pen and paper? Our customer service number is 855-736-1590, available Monday through Friday, 9:00 a.m. to 9:00 p.m. Eastern.\nYour confirmation number is CHA561337—please keep that for your records. If anyone calls claiming to be from our agency and can't provide that number, they're not affiliated with us.\nNow go ahead and write down MULTIPLAN NETWORK - FIRST HEALTH NETWORK.\nThe website you can visit to search providers is: providersearch.multiplan.com - providerlocator.firsthealth.com\nWith today's payment, your policy will become effective on _______. Your second payment will then be due 30 days from that effective date.\nThe insurance benefits are underwritten by Everest Reinsurance Company / American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE). Your monthly billing is handled through FirstEnroll.\nI do want to clarify that this is a private, limited-benefit plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\nIf you have any friends or family members that need quality coverage, please give them my information. We will find them the right plan just as we did for you.\nAlright [Customer Name], you've been an absolute pleasure. Now do you have any questions before we disconnect?\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )"
      }
    ]
  },
  {
    name: 'Access Health STM',
    planType: 'STM',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          "Access Health STM\nAlright [Customer Name], I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through Access Health Lite which uses the Multiplan PHCS Network. You have the flexibility to see any provider within the network, and there's no requirement for referrals to visit a specialist. You are going to receive coverage for doctors visits, blood and lab work, urgent care, medical, surgical, hospital, and emergency room coverage. This plan requires medical underwriting and has a set deductible of $__________.\nIn order to determine eligibility I will read you a list of 15 conditions. Please confirm if you currently have or if you've ever been diagnosed with the following conditions:\nHeart Disorder, Stroke, Chron's Disease, Ulcerative Colitis, Liver or Kidney Disorder, Emphysema, COPD, Cancer or Tumor, Alcohol or Drug Abuse, HIV or AIDS, Multiple Sclerosis, Tuberculosis, Autism, Schizophrenia, Lupus, Bariatric or Weight Loss Surgery, Pregnancy?\n▶ ( Wait for Answer )\nGreat. Based on everything we've reviewed, the monthly rate for this plan comes out to $___. There is a one-time standard group association fee of $___ to activate your membership within the plan. That brings the total for the first month to $___, and then moving forward, your monthly cost is simply $___ thereafter. Now, assuming this plan meets your medical needs, would the initial first-month amount of $___ be affordable for you today?\n▶ ( Wait for answer )\nFor your doctor's visits, you'll have access to a large PHCS network and you do not need a referral to see a specialist. Every time you go to the doctor's office you'll have a co-pay for your visit. For primary doctors visits and urgent care it's a $____ co-pay and for your specialist visits it's a $____ co-pay. Those visits aren't subject to the deductible. Your deductible will generally come into play in the event of hospitalization or surgery. For those services you have a $_____ deductible as well as 80/20 coinsurance with a Maximum out of Pocket of $2000 and with a cap of $_______.  How is this sounding so far?\n✖ ( DO NOT WAIT - GO TO RX )"
      },
      {
        title: 'Prescription (RX)',
        content:
          "You'll also receive access to a prescription discount program you can use at major pharmacies. Discounts vary, but many members find it helpful.\n✖ ( DO NOT WAIT GO INTO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement',
        content:
          "Your coverage is scheduled to start on ______, pending enrollment and verification. You can see in-network providers with no referral required, and the plan includes day-to-day benefits and for more serious care, such as hospital stays or surgeries, the plan uses the deductible and coinsurance we've reviewed. Before we proceed, can you confirm that everything we've reviewed about the plan and its limitations has been explained and understood?\n▶ ( Wait for Answer )\nOK Perfect, what is a good email we can send all this over to?\nWhat is the physical mailing address where we should send your hard-copy documents to?\nGreat. And just to confirm, is this phone number ________ the best number for the insurance company to reach you?\nBefore we complete the enrollment, I do need to verify a few items on this recorded line. Can you please confirm that you are a United States citizen or legal resident, and that all health information you provided today is accurate and complete to the best of your knowledge? Lastly, for identity verification purposes, please confirm your Social Security number?\n▶ ( Wait for Answer )\nFor the initial payment, which card type would you prefer you put on file?\n▶ ( Wait for Answer )\nOk go ahead with the card number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )"
      },
      {
        title: 'Post Close',
        content:
          "Congratulations [Customer Name], your application is complete. Do you have a pen and paper? Our customer service number is 855-736-1590, available Monday through Friday, 9:00 a.m. to 9:00 p.m. Eastern.\nYour confirmation number is CHA561337—please keep that for your records.\nNow go ahead and write down MULTIPLAN PHCS NETWORK.\nThe website you can visit to search providers is: providersearch.multiplan.com\nThe insurance benefits are underwritten by American Financial Security Life Insurance Company and offered through the National Congress of Employers (NCE). Your monthly billing is handled through FirstEnroll.\nI do want to clarify that this is a private, short term health plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\nI also want to explain the 12 and 12 pre-existing condition clause, which states anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\nAlright [Customer Name], you've been an absolute pleasure. Now do you have any questions before we disconnect?"
      }
    ]
  },
  {
    name: 'TrueHealth / MedFirst / GoodHealth 1,2,3',
    planType: 'MEC',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          "✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through the FirstHealth Network. This plan offers fixed benefits for doctor visits, hospital care, and prescription savings. You have the flexibility to see any provider within the network, and there's no requirement for referrals to visit a specialist. Another key advantage is nationwide access—this coverage can be used anywhere the network is accepted. And most importantly, there is no deductible. Does everything sound clear so far?\n▶ ( Wait for Answer )\nGreat. Based on everything we've reviewed, the monthly rate for this plan comes out to $___. There is a one-time standard group association fee of $___ to activate your membership within the plan. That brings the total for the first month to $___, and then moving forward, your monthly cost is simply $___ thereafter. Now, assuming this plan meets your medical needs, would the initial first-month amount of $___ be affordable for you today?\n▶ ( Wait for answer )\nYou don't need referrals to see a specialist. When you visit a primary physician you will have a $25.00 Co-pay. When you visit a specialist you will have a $50.00 co-pay. People like this plan because it's simple. Unlike traditional plans with deductibles and coinsurance, this plan has no deductible and pays defined benefit amounts toward covered services—so you know what the plan contributes and can plan your expenses more easily.\n✖ ( DO NOT WAIT - GO TO RX )"
      },
      {
        title: 'Prescription (RX)',
        content:
          "You'll also receive access to a prescription discount program you can use at major pharmacies. Discounts vary, but many members find it helpful. The plan does not include benefits for mental health, substance abuse, or pregnancy-related care. You won't be needing coverage for those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement',
        content:
          "Your coverage is scheduled to start on ______, pending enrollment and verification. You can see in-network providers with no referral required, and the plan includes day-to-day benefits and fixed hospital benefits, all with no deductible. Before we proceed, can you confirm that everything we've reviewed about the plan and its limitations has been explained and understood?\n▶ ( Wait for Answer )\nOK Perfect, what is a good email we can send all this over to?\nWhat is the physical mailing address where we should send your hard-copy documents to?\nBefore we complete the enrollment, I do need to verify a few items on this recorded line. Can you please confirm that you are a United States citizen or legal resident, and that all health information you provided today is accurate and complete to the best of your knowledge? Lastly, for identity verification purposes, please confirm your Social Security number?\n▶ ( Wait for Answer )\nFor the initial payment, which card type would you prefer you put on file?\n▶ ( Wait for Answer )\nOk go ahead with the card number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )"
      },
      {
        title: 'Post Close',
        content:
          "Congratulations [Customer Name], your application is complete. Do you have a pen and paper? Our customer service number is 855-736-1590, available Monday through Friday, 9:00 a.m. to 9:00 p.m. Eastern.\nYour confirmation number is CHA561337—please keep that for your records.\nNow go ahead and write down FIRST HEALTH NETWORK.\nThe website you can visit to search providers is: providerlocator.firsthealth.com\nThe Plan Administrator / Claims Administrator: Merchants Benefit Administration (MBA). Your monthly billing is handled through FirstEnroll.\nI do want to clarify that this is a private, limited-benefit plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\nI also want to explain the 12 and 12 pre-existing condition clause — anything diagnosed in the last 12 months would have a 12-month waiting period. There is a standard 30-day waiting period for any hospital, sickness and scheduled doctor visits.\nAlright [Customer Name], you've been an absolute pleasure. Now do you have any questions before we disconnect?"
      }
    ]
  },
  {
    name: 'MedFirst / GoodHealth 4,5',
    planType: 'MEC',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          'MedFirst / GoodHealth 4,5 (Need Primary SSN)\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through the FirstHealth Network. This plan offers fixed benefits for doctor visits, hospital care, and prescription savings. No referrals required. Nationwide access. No deductible. Does everything sound clear so far?\n▶ ( Wait for Answer )\nGreat. The monthly rate for this plan comes out to $___. One-time standard group association fee of $___. Total first month: $___. Monthly after: $___. Would the initial first-month amount be affordable for you today?\n▶ ( Wait for answer )\nWhen you visit a primary physician you will have a $50.00 co-pay. When you visit a specialist/Urgent Care you will have a $75.00 co-pay. No deductible. Defined benefit amounts.\n✖ ( DO NOT WAIT - GO TO RX )'
      },
      {
        title: 'Prescription (RX)',
        content:
          "You'll also receive access to a prescription discount program. The plan does not include benefits for mental health, substance abuse, or pregnancy-related care. You won't be needing coverage for those services, correct?\n✖ ( DO NOT WAIT - GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement',
        content:
          "Your coverage is scheduled to start on ______. Before we proceed, can you confirm that everything we've reviewed about the plan and its limitations has been explained and understood?\n▶ ( Wait for Answer )\nOK Perfect, what is a good email we can send all this over to?\nWhat is the physical mailing address where we should send your hard-copy documents to?\nCan you please confirm you are a United States citizen or legal resident, and that all health information you provided today is accurate? Lastly, for identity verification purposes, please confirm your Social Security number?\n▶ ( Wait for Answer )\nFor the initial payment, which card type would you prefer?\n▶ ( Wait for Answer )\nOk go ahead with the card number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )"
      },
      {
        title: 'Verification',
        content:
          "I'm sending you a text now from a 732 number labeled 'ONE ENROLLMENT.' Please click the link once you receive it.\n▶ ( Wait for Answer )\nVerify spelling of name, address, email, phone, DOB, gender, payment method and billing address. Does it all look correct?\n▶ ( Wait for Answer)\nAs you scroll down you'll see the bill-by-benefit breakdown. There will be acknowledgement boxes to check off — there should be 8 of them.\nAt the bottom, enter your first and last name—capitalize both. Sign electronically. Leave last checkbox unchecked unless applying for child only. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          "Congratulations [Customer Name], your application is complete. Our customer service number is 855-736-1590, Monday–Friday 9am–9pm Eastern.\nYour confirmation number is CHA561337.\nFirst Health Network — providerlocator.firsthealth.com\nPlan Administrator / Claims Administrator: Merchants Benefit Administration (MBA). Monthly billing through FirstEnroll.\nThis is a private, limited-benefit plan — NOT ACA or major medical. Does not cover maternity, substance abuse, or psychiatric services.\n12/12 pre-existing condition clause. 30-day waiting period for hospital, sickness and scheduled doctor visits.\nAlright [Customer Name], you've been an absolute pleasure. Any questions before we disconnect?"
      }
    ]
  },
  {
    name: 'TDK 1,2,3',
    planType: 'MEC',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          'TDK 1,2,3 (Need Primary SSN)\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through the FirstHealth Network. Fixed benefits, no referrals required, nationwide access, no deductible. Does everything sound clear so far?\n▶ ( Wait for Answer )\nMonthly rate: $___. One-time association fee: $___. First month total: $___. Monthly after: $___.\nWould the initial first-month amount be affordable for you today?\n▶ ( Wait for answer )\n$25.00 PCP co-pay. $50.00 specialist co-pay. No deductible.\n✖ ( DO NOT WAIT - GO TO RX )'
      },
      {
        title: 'Prescription (RX)',
        content:
          "Prescription discount program at major pharmacies. The plan does not include benefits for mental health, substance abuse, or pregnancy-related care. You won't be needing coverage for those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement',
        content:
          'Coverage starts ______. Can you confirm everything reviewed about the plan and its limitations has been explained and understood?\n▶ ( Wait for Answer )\nEmail, mailing address, phone confirmation. SSN for identity verification.\n▶ ( Wait for Answer )\nCard type for initial payment?\n▶ ( Wait for Answer )\nGo ahead with the card number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )'
      },
      {
        title: 'Verification',
        content:
          "Text from 732 number labeled 'ONE ENROLLMENT.' Click the link.\n▶ ( Wait for Answer )\nVerify all info. Bill-by-benefit breakdown on scroll.\nYou will also see the specific plan name — TDK stands for Transforming Data to Knowledge, administered through Detego Health.\nThere should be 8 acknowledgement boxes to check off.\nSign electronically. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          "Congratulations [Customer Name], your application is complete. Customer service: 855-736-1590, Mon–Fri 9am–9pm Eastern.\nConfirmation number: CHA561337.\nFirst Health Network — providerlocator.firsthealth.com\nPlan Administrator: Detego Health. Monthly billing through FirstEnroll / NEO Insurance Solutions.\nNOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-existing clause. 30-day waiting period for hospital, sickness and scheduled doctor visits.\nAlright [Customer Name], you've been an absolute pleasure. Any questions before we disconnect?"
      }
    ]
  },
  {
    name: 'TDK 4,5',
    planType: 'MEC',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          'TDK 4,5 (Need Primary SSN)\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. FirstHealth Network. Fixed benefits. No referrals. Nationwide access. No deductible.\n▶ ( Wait for Answer )\nMonthly rate: $___. Association fee: $___. First month: $___. Monthly after: $___.\nAffordable today?\n▶ ( Wait for answer )\n$50.00 PCP co-pay. $75.00 specialist/Urgent Care co-pay. No deductible.\n✖ ( DO NOT WAIT - GO TO RX )'
      },
      {
        title: 'Prescription (RX)',
        content:
          "Prescription discount program. No mental health, substance abuse, or pregnancy-related care coverage. You won't be needing those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement & Verification',
        content:
          "Coverage starts ______. Understanding confirmed on recorded line.\nEmail, address, phone, SSN collected.\n▶ ( Wait for Answer )\nCard type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )\nText from 732 labeled 'ONE ENROLLMENT.' Verify all info. Bill-by-benefit breakdown.\nTDK = Transforming Data to Knowledge, administered through Detego Health.\n8 acknowledgement boxes. Sign electronically. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nFirst Health Network — providerlocator.firsthealth.com\nPlan Administrator: Detego Health. Billing through FirstEnroll / NEO Insurance Solutions.\nNOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period.\nAlright [Customer Name], any questions before we disconnect?'
      }
    ]
  },
  {
    name: 'BWA Paramount 1-6',
    planType: 'Limited',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          'BWA Paramount 1-6 (First Enroll)\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through the Managed Care Network. Fixed benefits for doctor visits, hospital care, and prescription savings. No referrals required. Nationwide access. No deductible.\n▶ ( Wait for Answer )\nMonthly rate: $___. One-time association fee: $___. First month total: $___. Monthly after: $___.\nAffordable today?\n▶ ( Wait for answer )\n$25.00 pre-pay for PCP. $50.00 pre-pay for specialist. No deductible. Defined benefit amounts.\n✖ ( DO NOT WAIT - GO TO RX )'
      },
      {
        title: 'Prescription (RX)',
        content:
          "Prescription discount program. No mental health, substance abuse, or pregnancy-related care. You won't be needing coverage for those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement',
        content:
          'Coverage starts ______. Understanding confirmed.\nEmail, address, phone, SSN collected.\n▶ ( Wait for Answer )\nCard type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )'
      },
      {
        title: 'Verification',
        content:
          "Text from 732 labeled 'ONE ENROLLMENT.' Verify all info. Bill-by-benefit breakdown.\nThere should be 13 acknowledgement boxes to check off.\nSign electronically. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nManaged Care Network.\nUnderwritten by BCS Insurance Company, offered through Business Workers of America.\nMonthly billing through FirstEnroll.\nNOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period.\nAlright [Customer Name], any questions before we disconnect?'
      }
    ]
  },
  {
    name: 'BWA Americare 2,3,4',
    planType: 'Limited',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          'BWA Americare 2,3,4 (First Enroll)\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through the PHCS PPO NETWORK (Private HealthCare Systems). Fixed benefits. No referrals. Nationwide access. No deductible.\n▶ ( Wait for Answer )\nMonthly rate: $___. Association fee: $___. First month: $___. Monthly after: $___.\nAffordable today?\n▶ ( Wait for answer )\n$25.00 pre-pay PCP. $50.00 pre-pay specialist. No deductible. Defined benefits.\n✖ ( DO NOT WAIT - GO TO RX )'
      },
      {
        title: 'Prescription (RX)',
        content:
          "Prescription discount program. No mental health, substance abuse, or pregnancy-related care. You won't be needing those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement & Verification',
        content:
          "Coverage starts ______. Understanding confirmed.\nEmail, address, phone, SSN collected. Card type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )\nText from 732 labeled 'ONE ENROLLMENT.' Verify all info. 13 acknowledgement boxes.\nSign electronically. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nPHCS Network — providersearch.multiplan.com\nUnderwritten by The Group Benefits Plan through ERISA, offered through Business Workers of America. Billing through FirstEnroll.\nNOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period.\nAlright [Customer Name], any questions before we disconnect?'
      }
    ]
  },
  {
    name: 'Health Choice Silver',
    planType: 'Limited',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          "Health Choice Silver\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. Multiplan Network. Fixed benefits. No referrals. Nationwide access. No deductible.\n▶ ( Wait for Answer )\nMonthly rate: $___. Association fee: $___. First month: $___. Monthly after: $___. Affordable today?\n▶ ( Wait for answer )\nWhen you visit a doctor, the bill is first reduced to the network's contracted rate, and then your doctor visit benefit is applied. No deductible. Defined benefit amounts.\n✖ ( DO NOT WAIT - GO TO RX )"
      },
      {
        title: 'Prescription (RX)',
        content:
          "Prescription discount program. No mental health, substance abuse, or pregnancy-related care. You won't be needing those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement & Verification',
        content:
          "Coverage starts ______. Understanding confirmed.\nEmail, address, phone, SSN. Card type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )\nText from 732 labeled 'ONE ENROLLMENT.' Verify all info. Bill-by-benefit breakdown. Sign. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nMultiplan Network — providersearch.multiplan.com\nUnderwritten by American Financial Security Life Insurance Company, offered through National Congress of Employers (NCE). Billing through FirstEnroll.\nNOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period.\nAlright [Customer Name], any questions before we disconnect?'
      }
    ]
  },
  {
    name: 'NEO Pinnacle STM Traditional',
    planType: 'STM',
    sections: [
      {
        title: 'Opening & Medical Underwriting',
        content:
          "NEO Pinnacle STM Traditional\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. AWA Americas Workers Association — Multiplan PHCS Network. Coverage for doctor visits, blood and lab work, urgent care, medical, surgical, hospital, and emergency room. Requires medical underwriting. Deductible: $__________.\nIn order to determine eligibility I will read you a list of 15 conditions. Please confirm if you currently have or if you've ever been diagnosed with the following:\nHeart Disorder, Stroke, Chron's Disease, Ulcerative Colitis, Liver or Kidney Disorder, Emphysema, COPD, Cancer or Tumor, Alcohol or Drug Abuse, HIV or AIDS, Multiple Sclerosis, Tuberculosis, Autism, Schizophrenia, Lupus, Bariatric or Weight Loss Surgery, Pregnancy?\n▶ ( Wait for Answer )\nMonthly rate: $___. AWA association fee: $___. First month: $___. Monthly after: $___. Affordable today?\n▶ ( Wait for answer )\nPCP/urgent care co-pay: $____. Specialist co-pay: $____. Not subject to deductible.\nFor hospitalization/surgery: $_____ deductible + additional $500.00, plus 80/20 or 50/50 coinsurance. Max out-of-pocket: $2000. Cap: $_______.\nHow is this sounding so far?\n✖ ( DO NOT WAIT - GO TO RX )"
      },
      {
        title: 'Prescription, Closing & Verification',
        content:
          "Prescription discount program. No mental health, substance abuse, or pregnancy-related care (STM plans).\nCoverage starts ______. Understanding confirmed.\nEmail, address, phone, SSN. Card type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )\nText from 848 number labeled 'ONE ENROLLMENT.' Verify all info. Sign. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          "Customer service: 855-736-1590. Confirmation: CHA561337.\nMultiplan PHCS Network — providersearch.multiplan.com\nUnderwritten by Everest Reinsurance Company, offered through AWA Americas Workers Association. Billing through Neo Health Solutions.\nThis is a private, SHORT TERM health plan — NOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period.\nDependent changes can be done on plan's annual anniversary.\nAlright [Customer Name], any questions before we disconnect?"
      }
    ]
  },
  {
    name: 'AFRP Galena STM Elite / Standard / Economy',
    planType: 'STM',
    sections: [
      {
        title: 'Opening & Medical Underwriting',
        content:
          "AFRP Galena STM (Elite / Standard / Economy)\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], I have some excellent news for you. SGIC — Multiplan PHCS Network. Coverage for doctor visits, blood and lab work, urgent care, medical, surgical, hospital, and emergency room. Medical underwriting required. Deductible: $__________.\nEligibility conditions list (read all 17):\nHeart Disorder, Stroke, Chron's Disease, Ulcerative Colitis, Liver or Kidney Disorder, Emphysema, COPD, Cancer or Tumor, Alcohol or Drug Abuse, HIV or AIDS, Multiple Sclerosis, Tuberculosis, Autism, Schizophrenia, Lupus, Bariatric or Weight Loss Surgery, Pregnancy?\n▶ ( Wait for Answer )\nMonthly rate: $___. AWA association fee: $___. First month: $___. Monthly after: $___. Affordable today?\n▶ ( Wait for answer )\nPCP co-pay: $40.00. Specialist co-pay: $60.00. Not subject to deductible.\nFor hospitalization/surgery: $_____ deductible + 80/20, 70/30 or 50/50 coinsurance. Max OOP: $5,000 or $10,000.\nEconomy plan note: Doctor visits ARE subject to deductible.\nHow is this sounding so far?\n✖ ( DO NOT WAIT - GO TO RX )"
      },
      {
        title: 'Prescription, Closing & Verification',
        content:
          "Prescription discount program.\nCoverage starts ______. Understanding confirmed on recorded line.\nEmail, address, phone, SSN. Card type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )\nText from 848 number labeled 'ONE ENROLLMENT.' Verify all info. Sign. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nMultiplan Network — providersearch.multiplan.com\nUnderwritten by SGIC (Southern Guarantee Insurance Company), offered through Association for Responsible Partners. Billing through Neo Health Solutions.\nThis is a private, SHORT TERM health plan — NOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period.\nDependent changes on annual anniversary.\nAlright [Customer Name], any questions before we disconnect?'
      }
    ]
  },
  {
    name: 'Smart Health STM Traditional / Limited',
    planType: 'STM',
    sections: [
      {
        title: 'Opening & Medical Underwriting',
        content:
          'Smart Health STM (Traditional or Limited)\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )\nAlright [Customer Name], SLACIC — Multiplan PHCS Network. Coverage for doctor visits, blood and lab work, urgent care, medical, surgical, hospital, and emergency room. Medical underwriting required. Deductible: $__________.\nEligibility conditions list (17 conditions same as other STM plans).\n▶ ( Wait for Answer )\nMonthly rate: $___. Association fee: $___. First month: $___. Monthly after: $___. Affordable today?\n▶ ( Wait for answer )\nPCP co-pay: $_____. Specialist co-pay: $_____. Not subject to deductible.\nFor hospitalization/surgery: $_____ deductible + 80/20 coinsurance. Max OOP: $2000. Cap: $_____.\n(Limited plan note: Doctor visits subject to deductible.)\nHow is this sounding so far?\n✖ ( DO NOT WAIT - GO TO RX )'
      },
      {
        title: 'Prescription, Closing & Verification',
        content:
          "Prescription discount program.\nCoverage starts ______. Understanding confirmed.\nEmail, address, phone, SSN. Card type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )\nText from 848 labeled 'ONE ENROLLMENT.' Verify all info. Sign. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nPHCS Network — providersearch.multiplan.com\nUnderwritten by SLACIC (Standard Life and Casualty Insurance Company), offered through NCE (National Congress of Employers). Billing through Neo Health Solutions.\nThis is a private, SHORT TERM health plan — NOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period. Dependent changes on annual anniversary.\nAlright [Customer Name], any questions before we disconnect?'
      }
    ]
  },
  {
    name: 'Pinnacle Protect Plan 1-4',
    planType: 'Limited',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          "Pinnacle Protect Plan 1-4\n✖ ( DO NOT ASK IF THEY ARE STILL THERE)\nAlright [Customer Name], I have some excellent news for you. Multiplan PHCS Network. Fixed benefits for doctor visits, hospital care, and prescription savings. No referrals. Nationwide access. No deductible.\n▶ ( Wait for Answer )\nMonthly rate: $___. Association fee: $___. First month: $___. Monthly after: $___. Affordable today?\n▶ ( Wait for answer )\nWhen you visit a doctor, the bill is first reduced to the network's contracted rate, and then your doctor visit benefit is applied. No deductible. Defined benefit amounts.\n✖ ( DO NOT WAIT - GO TO RX )"
      },
      {
        title: 'Prescription (RX)',
        content:
          "Prescription discount program. No mental health, substance abuse, or pregnancy-related care. You won't be needing those services, correct?\n✖ ( DO NOT WAIT GO RIGHT TO CLOSING STATEMENT )"
      },
      {
        title: 'Closing Statement & Verification',
        content:
          "Coverage starts ______. Understanding confirmed.\nEmail, address, phone, SSN. Card type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )\nText from 848 labeled 'ONE ENROLLMENT.' Verify all info. Sign. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nMultiplan PHCS Network — providersearch.multiplan.com\nUnderwritten by Everest Reinsurance Company, offered through AWA Americas Workers Association. Billing through Neo Health Solutions.\nNOT ACA or major medical. No maternity, substance abuse, or psychiatric coverage.\n12/12 pre-ex clause. 30-day waiting period.\nAlright [Customer Name], any questions before we disconnect?'
      }
    ]
  },
  {
    name: 'NEO Smart Choice',
    planType: 'MEC',
    sections: [
      {
        title: 'Opening & Benefits',
        content:
          'NEO Smart Choice\n✖ ( DO NOT ASK IF THEY ARE STILL THERE)\nAlright [Customer Name], I have some excellent news for you. First Health EPO Network. Fixed benefits for doctor visits, hospital care, and prescription savings. No referrals. Nationwide access. Coverage outside network limited to emergencies.\n▶ ( Wait for Answer )\nMonthly rate: $___. Enrollment fee: $___. First month: $___. Monthly after: $___. Affordable today?\n▶ ( Wait for answer )\nPreventive/wellness care (annual physical, routine screening, mammogram, colonoscopy, pap smear) covered 100% in-network.\n$40.00 PCP co-pay. $50.00 specialist co-pay. $60.00 urgent care co-pay.\nFor hospitalization/surgery: $1,500/$2,500/$3,000/$3,500 deductible. Max OOP: $9,200.\nPrescriptions: $12 copay for preferred generics. Savings card for brand-name.\n✖ ( DO NOT WAIT - GO TO RX )'
      },
      {
        title: 'Disclosure & Closing',
        content:
          'I do want to clarify that this is a private short term plan, not an ACA or major medical plan, and it does not provide coverage for maternity, substance abuse, or psychiatric services.\nCoverage starts ______. Understanding confirmed.\nEmail, address, phone, SSN. Card type and number.\n✖ ( DO NOT SPEAK WHOEVER TALKS FIRST LOSES )'
      },
      {
        title: 'Verification',
        content:
          "Text from 848 labeled 'ONE ENROLLMENT.' Verify all info. Sign. Click 'Accept.'\n(You've successfully signed your document)"
      },
      {
        title: 'Post Close',
        content:
          'Customer service: 855-736-1590. Confirmation: CHA561337.\nFirst Health Network — providerlocator.firsthealth.com\nUnderwritten by Detego Health, offered through Population Science Management. Billing through Neo Health Solutions.\n12/12 pre-ex clause. 30-day waiting period. Dependent changes on annual anniversary.\nAlright [Customer Name], any questions before we disconnect?\n✖ ( DO NOT ASK IF THEY ARE STILL THERE )'
      }
    ]
  }
];

const ISA_SCRIPTS = {
  openings: [
    {
      label: 'Standard',
      line: "Hey [Name], this is [Your Name] calling about your health coverage inquiry. I've got a couple of questions for you before I recommend anything — is now okay?"
    },
    {
      label: 'Stronger',
      line: "[Name], this is [Your Name]. I'm looking at your inquiry right now — before I walk you through your options, tell me: what's your coverage situation like right now?"
    }
  ],
  transitions: [
    {
      label: 'Discovery → Positioning',
      line: "Alright — based on everything you just told me, I think I know exactly what's going to work here. Let me show you something."
    },
    {
      label: 'Positioning → Close',
      line: "This is the one I'd put you in. Here's why it fits — [benefit tied to their words]. Let's get this set up."
    },
    {
      label: 'After objection — bridge back',
      line: "I hear you — and I want to come back to that. But first: you told me [what they said]. Does this plan solve that? Because that's the most important thing."
    }
  ],
  discovery: [
    {
      label: 'Budget frame',
      line: 'If you found something that actually made sense for your situation, what kind of range are you comfortable working with per month?'
    },
    {
      label: 'Gap opener',
      line: "What's going on with your coverage right now? Are you between jobs, self-employed — what's the situation?"
    },
    {
      label: 'Fear unlock',
      line: "What's your biggest concern about not having any coverage right now?"
    },
    {
      label: 'Stakes question',
      line: 'If you had a medical situation tomorrow — ER, urgent care, something unexpected — what happens? Are you covered?'
    },
    {
      label: 'Future picture',
      line: 'What would it mean for you to have something in place that covers the basics — doctor visits, prescriptions, emergencies?'
    }
  ],
  validation: [
    {
      label: 'After they share a concern',
      line: "That makes complete sense — and honestly, that's exactly why I want to make sure I'm recommending the right thing for your specific situation, not just something generic."
    },
    {
      label: 'After a past bad experience',
      line: "That's the most important thing you've told me. A lot of people I work with have had that experience — and it changes how I'd approach this with you."
    },
    {
      label: 'After financial stress',
      line: "I appreciate you being honest about that. Then it's even more important that whatever we do, it's the right fit — I'm not going to put you in something that doesn't work for you."
    }
  ],
  positioning: [
    {
      label: 'Limited benefit plan',
      line: "This plan pays set amounts for the services you actually use most — office visits, urgent care, ER. You know exactly what you're getting and exactly what you're spending. No surprises."
    },
    {
      label: 'MEC plan',
      line: "This covers your preventive care — annual wellness, screenings, immunizations — at no deductible. It's not full major medical, but it keeps you covered for staying healthy and it fits your budget."
    },
    {
      label: 'STM plan',
      line: "This is a short-term medical plan — it covers you for the unexpected: hospital stays, surgery, serious illness or injury. It's real protection for what actually costs you money."
    }
  ],
  bridges: [
    {
      label: 'Price objection',
      line: "I hear you on the price — and let me put that in context. The average ER visit without coverage runs $2,000 to $5,000. This plan is [price] a month. We're talking about whether the risk is worth it."
    },
    {
      label: 'Think about it',
      line: "Take all the time you need — I just want to ask: what specifically are you thinking through? Because if there's something about the plan itself, I'd rather we solve that now."
    },
    {
      label: 'Spouse objection',
      line: "Of course — I respect that completely. Can I ask: is there something about the plan that would concern your spouse? Because I'd hate for you to walk away without being able to answer their questions."
    }
  ],
  closes: [
    {
      label: 'Logistics close (Softer)',
      line: "Alright — let's get this locked in. I just need your date of birth to confirm your rate — are you looking at the 1st or the 15th for your start date?"
    },
    {
      label: 'Direct close (Stronger)',
      line: "You've got the information. You know the price. You know what it covers. The only decision left is whether you want to be protected starting this month. What do you want to do?"
    }
  ],
  'compliance-lines': [
    {
      label: 'ACA non-compliance',
      line: "I want to be upfront with you — this is not an ACA-compliant plan. It's a [limited benefit / short-term medical / MEC] plan, which is why the pricing is different. Let me tell you specifically what it does and doesn't cover."
    },
    {
      label: 'Pre-existing condition clause',
      line: "One important thing to know: pre-existing conditions — meaning things you've been diagnosed or treated for in the last 12 months — aren't covered during the first 12 months of this plan. After that, you're covered going forward."
    },
    {
      label: 'Mental health / maternity exclusion',
      line: "I do need to make sure you're aware: this plan does not cover mental health treatment, maternity, or substance abuse rehab. Those are excluded under this type of plan."
    },
    {
      label: 'Waiting period',
      line: "For illness — cold, flu, anything like that — there's a 30-day waiting period from your start date. Injuries are covered from day one."
    }
  ]
};

function renderCloses() {
  var groups = {
    assumptive: 'Assumptive Closes',
    soft: 'Soft Closes',
    direct: 'Direct Closes',
    urgency: 'Urgency Closes',
    tiedown: 'Tie-Down Closes',
    agreement: 'Agreement Closes'
  };
  var html =
    '<div class="ph"><div class="pt">Closing <span>Lines</span></div><div class="pd">The right close at the right moment. Tap any line for full context.</div></div>';
  Object.keys(groups).forEach(function (type) {
    var items = CLOSES.filter(function (c) {
      return c.type === type;
    });
    if (!items.length) return;
    html += '<div class="cg-title">' + groups[type] + '</div>';
    items.forEach(function (c, idx) {
      var id = 'cl-' + type + '-' + idx;
      html += '<div class="close-item" id="' + id + '">';
      html +=
        '<div class="close-top" onclick="toggleClose(\'' +
        id +
        '\')" style="padding:14px 18px;cursor:pointer;display:flex;align-items:center;gap:12px;">';
      html += '<div class="close-line u-flex1">"' + c.line + '"</div>';
      html +=
        typeof favStarHTML === 'function'
          ? favStarHTML('close', id, c.line.substring(0, 60), c.line, 'Closes')
          : '';
      html += '<span class="ctype ' + type + '">' + type + '</span></div>';
      html +=
        '<div class="close-detail" style="display:none;padding:14px 18px;border-top:1px solid rgba(220,170,180,0.2);">';
      html +=
        '<div class="field"><div class="field-lbl">When to Use</div><div class="field-txt">' +
        c.when +
        '</div></div>';
      html +=
        '<div class="field"><div class="field-lbl">Tone</div><div class="field-txt">' +
        c.tone +
        '</div></div>';
      html +=
        '<div class="field"><div class="field-lbl">Before You Say This</div><div class="field-txt">' +
        c.before +
        '</div></div>';
      html += '<div class="sbox u-mt10">' + (c.script || '') + '</div>';
      html +=
        '<div class="ibox ibox-bridge" style="margin-top:8px;"><span class="sbox-lbl">If They Hesitate</span><br>' +
        c.hesitate +
        '</div>';
      html += '</div></div>';
    });
  });
  var _page_closes = document.getElementById('page-closes');
  if (_page_closes) _page_closes.innerHTML = html;
}

function toggleClose(id) {
  toggleCard(id, 'close-detail');
}

// ══════════════════════════════════════════════════════
// LIVE CALL GPS — vertical step guide (Scripts → Call Flow)
// ══════════════════════════════════════════════════════
var LIVE_CALL_GPS = [
  {
    title: 'Hook',
    scripts: [
      "Hey [Name], this is [Your Name] calling about your health coverage inquiry. I've got a couple of questions for you before I recommend anything — is now okay?",
      "[Name], this is [Your Name]. I'm looking at your inquiry right now — before I walk you through your options, tell me: what's your coverage situation like right now?"
    ],
    compliance: [
      'Open with permission and purpose. If the call is recorded, state the recording disclosure clearly before health or payment details.'
    ]
  },
  {
    title: 'Discovery',
    scripts: [
      "If you found something that actually made sense for your situation, what kind of range are you comfortable working with per month?",
      "What's going on with your coverage right now? Are you between jobs, self-employed — what's the situation?",
      "What's your biggest concern about not having any coverage right now?"
    ],
    compliance: [
      'Do not skip pre-qual health questions required for the product type you may enroll. Never guarantee approval or coverage before underwriting rules are satisfied.'
    ]
  },
  {
    title: 'Pitch',
    scripts: [
      "This plan pays set amounts for the services you actually use most — office visits, urgent care, ER. You know exactly what you're getting and exactly what you're spending.",
      'This covers your preventive care — annual wellness, screenings, immunizations — at no deductible. It is not full major medical, but it keeps you covered for staying healthy and it fits your budget.',
      "This is a short-term medical plan — it covers you for the unexpected: hospital stays, surgery, serious illness or injury. It's real protection for what actually costs you money."
    ],
    compliance: [
      'Match pitch to what they said in discovery. Never describe a limited-benefit or STM product as comprehensive major medical or ACA-equivalent.'
    ]
  },
  {
    title: 'Close',
    scripts: [
      'Your coverage is scheduled to start on ______, pending enrollment and verification.',
      'Before we proceed, can you confirm that everything we have reviewed about the plan and its limitations has been explained and understood?',
      'For the initial payment, which card type would you prefer to put on file?'
    ],
    compliance: [
      'On a recorded line: disclose non-ACA status, pre-existing / waiting rules, excluded services (e.g. mental health, maternity, substance abuse where applicable), and collect explicit understanding before payment.',
      'After card collection: repeat network, carrier, confirmation number, and material limitations in post-close — same standards as compliance training.'
    ]
  }
];

function _lcEsc(s) {
  if (typeof escHTML === 'function') return escHTML(String(s));
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function _lcCfLines(cfIdx) {
  var row = CF_STEPS[cfIdx];
  if (!row || !row.lines) return [];
  return row.lines.slice();
}

// HUD stages: script strings are verbatim from CF_STEPS / LIVE_CALL_GPS (no edits).
function _lcBuildGpsHudStages() {
  return [
    {
      label: 'Opening',
      scripts: _lcCfLines(0),
      compliance: LIVE_CALL_GPS[0] ? LIVE_CALL_GPS[0].compliance.slice() : []
    },
    {
      label: 'Prequalify',
      scripts: _lcCfLines(1),
      compliance: LIVE_CALL_GPS[1] ? LIVE_CALL_GPS[1].compliance.slice() : []
    },
    {
      label: 'Tie-Down',
      scripts: _lcCfLines(2),
      compliance: []
    },
    {
      label: 'Hold',
      scripts: _lcCfLines(4),
      compliance: []
    },
    {
      label: 'Benefits',
      scripts: LIVE_CALL_GPS[2] ? LIVE_CALL_GPS[2].scripts.slice() : [],
      compliance: LIVE_CALL_GPS[2] ? LIVE_CALL_GPS[2].compliance.slice() : []
    },
    {
      label: 'Close',
      scripts: _lcCfLines(5).concat(_lcCfLines(6)),
      compliance: LIVE_CALL_GPS[3] ? LIVE_CALL_GPS[3].compliance.slice() : []
    },
    {
      label: 'Verification',
      scripts: _lcCfLines(7).concat(_lcCfLines(8)).concat(_lcCfLines(9)),
      compliance: LIVE_CALL_GPS[3] ? LIVE_CALL_GPS[3].compliance.slice() : []
    },
    {
      label: 'Post-Close',
      scripts: _lcCfLines(10),
      compliance: []
    }
  ];
}

function _lcGpsFocusStage(n) {
  window._lcGpsStage = n;
  var trk = document.getElementById('lc-gps-tracker');
  if (trk) {
    var btns = trk.querySelectorAll('.lc-gps-trk-i');
    for (var i = 0; i < btns.length; i++) {
      if (i === n) btns[i].classList.add('is-active');
      else btns[i].classList.remove('is-active');
    }
  }
  var el = document.getElementById('lc-gps-stage-' + n);
  if (el && typeof el.scrollIntoView === 'function') {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function _renderLiveCallGpsHtml() {
  var stages = _lcBuildGpsHudStages();
  var html =
    '<section class="lc-gps-wrap lc-gps-hud-root" aria-label="Live Call GPS">' +
    '<div class="lc-gps-head">' +
    '<div class="lc-gps-kicker">Training / Scripts</div>' +
    '<h2 class="lc-gps-title">Live Call <span>GPS</span></h2>' +
    '<p class="lc-gps-sub">HUD: tap a stage to jump. Script lines are verbatim from your playbook.</p>' +
    '</div>' +
    '<nav class="lc-gps-tracker" id="lc-gps-tracker" aria-label="Call stage tracker">';
  for (var ti = 0; ti < stages.length; ti++) {
    html +=
      '<button type="button" class="lc-gps-trk-i' +
      (ti === 0 ? ' is-active' : '') +
      '" id="lc-gps-trk-' +
      ti +
      '" onclick="_lcGpsFocusStage(' +
      ti +
      ')">' +
      _lcEsc(stages[ti].label) +
      '</button>';
  }
  html += '</nav><div class="lc-gps-hud-blocks">';
  for (var gi = 0; gi < stages.length; gi++) {
    var step = stages[gi];
    html +=
      '<section class="lc-gps-hud-block" id="lc-gps-stage-' +
      gi +
      '" aria-labelledby="lc-gps-hud-h-' +
      gi +
      '">';
    html +=
      '<div class="lc-gps-hud-block-head"><span class="lc-gps-hud-idx">' +
      (gi + 1) +
      '</span><h3 class="lc-gps-h lc-gps-hud-h" id="lc-gps-hud-h-' +
      gi +
      '">' +
      _lcEsc(step.label) +
      '</h3></div>';
    html += '<div class="lc-gps-scripts">';
    for (var si = 0; si < step.scripts.length; si++) {
      html += '<p class="lc-gps-line">' + _lcEsc(step.scripts[si]) + '</p>';
    }
    html += '</div>';
    if (step.compliance && step.compliance.length) {
      html += '<div class="lc-gps-compliance-wrap">';
      for (var ci = 0; ci < step.compliance.length; ci++) {
        html +=
          '<div class="lc-gps-compliance"><span class="lc-gps-compliance-lbl">Compliance</span>' +
          _lcEsc(step.compliance[ci]) +
          '</div>';
      }
      html += '</div>';
    }
    html += '</section>';
  }
  html += '</div></section>';
  return html;
}

// ══════════════════════════════════════════════════════
// RENDER: CALL FLOW
// ══════════════════════════════════════════════════════
function renderCallFlow() {
  var html = _renderLiveCallGpsHtml();
  html +=
    '<div class="ph"><div class="pt">Call Flow <span>Blueprint</span></div><div class="pd">The anatomy of a perfect call. Tap each step to expand.</div></div>';
  CF_STEPS.forEach(function (s, i) {
    html += '<div class="cf-step" id="cf' + i + '">';
    html +=
      '<div onclick="toggleCF(' +
      i +
      ')" style="display:flex;align-items:center;gap:14px;padding:16px 20px;cursor:pointer;">';
    var _cfBubbleBg =
      s.num <= 4 ? '#5B8DEF' : s.num <= 8 ? '#10b981' : '#8b5cf6';
    html +=
      '<div style="width:32px;height:32px;border-radius:50%;background:' +
      _cfBubbleBg +
      ';display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:700;font-size:.82rem;color:#ffffff;flex-shrink:0;letter-spacing:0.01em;">' +
      s.num +
      '</div>';
    html +=
      '<div class="cf-title" style="flex:1;font-weight:700;">' +
      s.title +
      '</div>';
    html +=
      '<span style="color:var(--warmgray3);font-size:12px;" aria-hidden="true">▼</span></div>';
    html +=
      '<div class="cf-body" style="display:none;padding:0 20px 16px 66px;">';
    html +=
      '<div class="field"><div class="field-lbl">Goal</div><div class="field-txt">' +
      s.goal +
      '</div></div>';
    html += '<div class="slbl u-mt10">What to Say</div>';
    if (s.lines)
      s.lines.forEach(function (l) {
        html += '<div class="sbox" style="margin-bottom:6px;">' + l + '</div>';
      });
    if (s.mistakes) {
      html +=
        '<div class="ibox ibox-avoid" style="margin-top:8px;"><span class="sbox-lbl" style="color:var(--error);">Avoid</span><br>';
      s.mistakes.forEach(function (m) {
        html +=
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> ' +
          m +
          '<br>';
      });
      html += '</div>';
    }
    if (s.listen) {
      html +=
        '<div class="ibox ibox-bridge" style="margin-top:8px;"><span class="sbox-lbl">Listen For</span><br>' +
        s.listen +
        '</div>';
    }
    html += '</div></div>';
  });
  var _page_callflow = document.getElementById('page-callflow');
  if (_page_callflow) _page_callflow.innerHTML = html;
}

function toggleCF(i) {
  toggleCard('cf' + i, 'cf-body');
}

var planScriptFilter = 'All';
var planScriptActive = -1;
var planScriptSection = 0;

function _psTypeColor(t) {
  return t === 'MEC'
    ? '#5175F1'
    : t === 'STM'
      ? '#F59E0B'
      : t === 'Limited'
        ? '#DC2626'
        : '#29A26A';
}
function _psTypeBg(t) {
  return t === 'MEC'
    ? 'rgba(81,117,241,0.08)'
    : t === 'STM'
      ? 'rgba(245,166,35,0.08)'
      : t === 'Limited'
        ? 'rgba(237,95,116,0.08)'
        : 'rgba(62,207,142,0.08)';
}

function _filterPsCards(query) {
  var q = (query || '').toLowerCase().trim();
  var clearBtn = document.getElementById('psSearchClear');
  if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
  var cards = document.querySelectorAll('.ps-card');
  var vis = 0;
  cards.forEach(function (c) {
    var searchStr =
      (c.getAttribute('data-ps-search') || '') +
      ' ' +
      c.textContent.toLowerCase();
    var match = !q || searchStr.indexOf(q) !== -1;
    c.style.display = match ? '' : 'none';
    if (match) vis++;
  });
  // Show/hide no results message
  var noMsg = document.getElementById('psNoResults');
  if (!noMsg) {
    var grid = document.getElementById('psCardGrid');
    if (grid) {
      grid.insertAdjacentHTML(
        'afterend',
        '<div id="psNoResults" style="display:none;text-align:center;padding:24px 0;color:var(--text-secondary);font-size:14px;">No plans match your search.</div>'
      );
      noMsg = document.getElementById('psNoResults');
    }
  }
  if (noMsg) noMsg.style.display = q && vis === 0 ? 'block' : 'none';
}

function renderPlanScripts() {
  var html = '<div class="ph"><div class="pt">Plan <span>Scripts</span></div>';
  html +=
    '<div class="pd">Complete sales scripts for every plan. Select a plan, then follow each section step by step during the call.</div></div>';
  html += '<div class="stabs" style="margin-bottom:16px;">';
  ['All', 'MEC', 'STM', 'Limited', 'Shared'].forEach(function (f) {
    html +=
      '<button class="stab' +
      (f === planScriptFilter ? ' active' : '') +
      '" onclick="planScriptFilter=\'' +
      f +
      '\';planScriptActive=-1;planScriptSection=0;renderPlanScripts()">' +
      f +
      '</button>';
  });
  html += '</div>';
  var filtered = PLAN_SCRIPTS.filter(function (p) {
    if (planScriptFilter === 'All') return true;
    return p.planType === planScriptFilter;
  });
  if (filtered.length === 0) {
    html +=
      '<div style="text-align:center;padding:40px;color:var(--txt-muted)">No plans in this category</div>';
    var _page_planscripts = document.getElementById('page-planscripts');
    if (_page_planscripts) _page_planscripts.innerHTML = html;
    return;
  }
  // ── DEFAULT VIEW: all plans as clickable cards ──
  if (planScriptActive < 0 || planScriptActive >= filtered.length) {
    // Search bar
    html += '<div style="position:relative;margin-bottom:14px;">';
    html +=
      '<svg style="position:absolute;left:16px;top:50%;transform:translateY(-50%);pointer-events:none;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    html +=
      '<input type="text" id="psSearchInput" placeholder="Search plans..." oninput="_filterPsCards(this.value)" style="width:100%;height:44px;border-radius:999px;border:1.5px solid #E5E7EB;padding:0 40px 0 44px;font-size:14px;font-family:var(--font-body);background:#F8F9FE;color:var(--text-primary);outline:none;transition:border-color 0.15s;" onfocus="this.style.borderColor=\'#5B8DEF\'" onblur="this.style.borderColor=\'#E5E7EB\'" />';
    html +=
      '<button id="psSearchClear" onclick="var i=document.getElementById(\'psSearchInput\');if(i){i.value=\'\';_filterPsCards(\'\');i.focus();}" style="display:none;position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9CA3AF;font-size:18px;line-height:1;padding:4px;">&times;</button>';
    html += '</div>';
    html +=
      '<div id="psCardGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;">';
    filtered.forEach(function (p, idx) {
      var tc = _psTypeColor(p.planType);
      var bg = _psTypeBg(p.planType);
      html +=
        '<div class="ps-card" data-ps-search="' +
        (p.name + ' ' + p.planType).toLowerCase() +
        '" onclick="planScriptActive=' +
        idx +
        ";planScriptSection=0;renderPlanScripts()\" style=\"background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:16px 18px;cursor:pointer;transition:all 0.15s ease;min-height:90px;display:flex;flex-direction:column;justify-content:space-between;\" onmouseover=\"this.style.borderColor='#5175f1';this.style.boxShadow='0 0 0 2px rgba(81,117,241,0.15)';this.style.transform='translateY(-1px)'\" onmouseout=\"this.style.borderColor='#e2e8f0';this.style.boxShadow='none';this.style.transform='none'\">";
      html +=
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">';
      html +=
        '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' +
        tc +
        ';flex-shrink:0;"></span>';
      html +=
        '<span style="font-family:var(--font-ui);font-size:14px;font-weight:700;color:var(--text-primary);line-height:1.3;">' +
        p.name +
        '</span>';
      html += '</div>';
      html +=
        '<div style="display:flex;align-items:center;gap:4px;margin-bottom:6px;">';
      html +=
        '<span style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:999px;background:' +
        bg +
        ';color:' +
        tc +
        ';">' +
        p.planType +
        '</span>';
      html += '</div>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:3px;">';
      var pillLabels = [
        'Opening',
        'RX',
        'Closing',
        'Verify',
        'Post-Close',
        'Benefits'
      ];
      p.sections.forEach(function (s, si) {
        var pl = pillLabels[si] || s.title;
        html +=
          '<span style="font-size:9px;padding:2px 6px;border-radius:999px;background:#f1f5f9;color:#64748b;">' +
          pl +
          '</span>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    var _page_planscripts = document.getElementById('page-planscripts');
    if (_page_planscripts) _page_planscripts.innerHTML = html;
    return;
  }

  // ── SELECTED PLAN VIEW ──
  var activePlan = filtered[planScriptActive];
  var typeColor = _psTypeColor(activePlan.planType);

  // Back button + quick plan switcher dropdown
  html +=
    '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;">';
  html +=
    '<button onclick="planScriptActive=-1;renderPlanScripts()" style="padding:6px 14px;border-radius:999px;border:1.5px solid #E5E7EB;background:#fff;color:var(--text-secondary);cursor:pointer;font-family:var(--font-ui);font-size:12px;font-weight:600;">\u2190 All Plans</button>';
  html +=
    '<label style="font-family:var(--font-ui);font-size:11px;font-weight:700;color:#64748b;letter-spacing:.06em;text-transform:uppercase;">Plan:</label>';
  html +=
    '<select onchange="planScriptActive=parseInt(this.value,10);planScriptSection=0;renderPlanScripts()" style="flex:1;min-width:200px;max-width:360px;padding:7px 12px;border-radius:10px;border:1.5px solid #e2e8f0;background:#fff;color:#1e293b;font-family:var(--font-ui);font-size:13px;font-weight:600;cursor:pointer;outline:none;">';
  filtered.forEach(function (p, idx) {
    html +=
      '<option value="' +
      idx +
      '"' +
      (idx === planScriptActive ? ' selected' : '') +
      '>' +
      p.name +
      ' (' +
      p.planType +
      ')</option>';
  });
  html += '</select>';
  html += '</div>';

  // Plan card wrapper
  html +=
    '<div style="background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">';

  // Sticky plan name header
  html +=
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">';
  html +=
    '<span style="font-family:var(--font-ui);font-size:18px;font-weight:700;color:#1e293b;">' +
    activePlan.name +
    '</span>';
  html +=
    '<span style="padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.06em;background:' +
    typeColor +
    ';color:#fff;">' +
    activePlan.planType +
    '</span></div>';
  html +=
    '<div style="font-size:12px;color:#94a3b8;margin-bottom:16px;">' +
    activePlan.sections.length +
    ' sections — follow in order during the call</div>';

  // Progress tracker dots
  var secLabels = [
    'Opening',
    'Benefits',
    'Rx',
    'Closing',
    'Verification',
    'Post-Close'
  ];
  html +=
    '<div style="display:flex;align-items:center;gap:0;margin-bottom:20px;padding:10px 0;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9;">';
  activePlan.sections.forEach(function (sec, si) {
    var isCurrent = si === planScriptSection;
    var dotLabel = sec.title || secLabels[si] || 'Section ' + (si + 1);
    html += '<div style="display:flex;align-items:center;flex:1;min-width:0;">';
    html +=
      '<button onclick="planScriptSection=' +
      si +
      ';renderPlanScripts()" style="display:flex;flex-direction:column;align-items:center;gap:4px;border:none;background:none;cursor:pointer;min-width:0;flex-shrink:0;">';
    html +=
      '<div style="width:12px;height:12px;border-radius:50%;background:' +
      (isCurrent ? '#5B8DEF' : si < planScriptSection ? '#BBF7D0' : '#e2e8f0') +
      ';border:2px solid ' +
      (isCurrent ? '#5B8DEF' : si < planScriptSection ? '#15803D' : '#cbd5e1') +
      ';"></div>';
    html +=
      '<span style="font-size:9px;font-weight:' +
      (isCurrent ? '700' : '500') +
      ';color:' +
      (isCurrent ? '#5B8DEF' : '#94a3b8') +
      ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:60px;">' +
      dotLabel +
      '</span>';
    html += '</button>';
    if (si < activePlan.sections.length - 1)
      html +=
        '<div style="flex:1;height:2px;background:' +
        (si < planScriptSection ? '#BBF7D0' : '#e2e8f0') +
        ';margin:0 2px;margin-bottom:16px;"></div>';
    html += '</div>';
  });
  html += '</div>';

  // Render ALL sections as colored bubbles
  var bubbleStyles = [
    { label: 'OPENING', bg: '#EFF6FF', border: '#BFDBFE', color: '#1D4ED8' },
    { label: 'BENEFITS', bg: '#F0FDF4', border: '#BBF7D0', color: '#15803D' },
    {
      label: 'PRESCRIPTIONS / RX',
      bg: '#FAF5FF',
      border: '#E9D5FF',
      color: '#7C3AED'
    },
    {
      label: 'CLOSING STATEMENT',
      bg: '#FFFBEB',
      border: '#FDE68A',
      color: '#B45309'
    },
    {
      label: 'VERIFICATION',
      bg: '#FFF1F2',
      border: '#FECDD3',
      color: '#BE123C'
    },
    { label: 'POST-CLOSE', bg: '#F8FAFC', border: '#E2E8F0', color: '#475569' }
  ];

  activePlan.sections.forEach(function (sec, si) {
    if (si !== planScriptSection) return;
    var c = sec.content || '';
    c = c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    c = c.replace(/\n/g, '<br>');
    // Line-by-line parsing handles all symbols — no pre-wrapping needed
    var lines = c.split('<br>');
    var parsedLines = [];
    lines.forEach(function (line) {
      var trimLine = line.trim();
      if (!trimLine) {
        parsedLines.push('<div style="height:8px;"></div>');
        return;
      }
      if (/\( *DO NOT|\( *do not|✖/.test(trimLine)) {
        // Strip existing ✖ prefix to avoid double
        var cleanDo = trimLine.replace(/^✖\s*/, '');
        parsedLines.push(
          '<div style="background:#fff1f2;border-left:3px solid #dc2626;border-radius:8px;padding:8px 16px;margin:12px 0;font-size:12px;font-weight:700;color:#dc2626;letter-spacing:0.5px;">✖ ' +
            cleanDo +
            '</div>'
        );
      } else if (/\( *[Ww]ait for/.test(trimLine)) {
        // Strip existing ▶ prefix to avoid double
        var cleanWait = trimLine.replace(/^▶\s*/, '');
        parsedLines.push(
          '<div style="background:#fffbeb;border-left:3px solid #f59e0b;border-radius:8px;padding:8px 16px;margin:12px 0;font-size:13px;font-style:italic;color:#92400e;">▶ ' +
            cleanWait +
            '</div>'
        );
      } else {
        var parsed = trimLine;
        // Strip any stray ✔/✖/▶ that were in original data (handled by block detection above)
        parsed = parsed.replace(
          /(_{3,}|\$___)/g,
          '<span style="background:#fef08a;padding:1px 6px;border-radius:6px;font-weight:600;color:#713f12;">$1</span>'
        );
        parsed = parsed.replace(
          /\[Customer Name\]/gi,
          '<span style="background:#dbeafe;color:#1d4ed8;padding:1px 6px;border-radius:6px;font-weight:600;">[Customer Name]</span>'
        );
        parsedLines.push(
          '<div style="margin-bottom:16px;">' + parsed + '</div>'
        );
      }
    });
    c = parsedLines.join('');

    var bs = bubbleStyles[Math.min(si, bubbleStyles.length - 1)];
    var secLabel = sec.title || bs.label;
    var secId = 'ps-sec-' + si;

    html +=
      '<div id="' +
      secId +
      '" style="max-width:720px;margin:0 auto 24px;position:relative;">';
    // Large bold section header
    html +=
      '<div style="font-family:var(--font-ui);font-size:22px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#1e293b;background:#ffffff;border:1px solid #e2e8f0;border-bottom:none;padding:14px 24px;border-radius:14px 14px 0 0;">' +
      secLabel +
      '</div>';
    // Script card body
    html +=
      '<div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 14px 14px;padding:28px;">';
    // Script text
    html +=
      '<div class="ps-bubble-text" style="font-size:17px;line-height:1.9;color:#1e293b;font-family:var(--font-body);">' +
      c +
      '</div>';
    html += '</div>';
    // Tap to Copy button
    html +=
      '<button onclick="copyScriptBubble(this)" style="display:block;width:100%;max-width:720px;margin:8px auto 0;font-family:var(--font-ui);font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:10px 20px;border-radius:10px;border:1.5px solid #5175f1;background:rgba(81,117,241,0.08);color:#5175f1;cursor:pointer;transition:background .15s;">TAP TO COPY</button>';
    html += '</div>';
  });

  html += '</div>'; // close plan card wrapper
  // Progress footer
  html +=
    '<div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #e2e8f0;background:#fff;padding:14px 24px;margin-top:20px;border-radius:12px;">';
  if (planScriptSection > 0) {
    html +=
      '<button onclick="planScriptSection--;renderPlanScripts()" style="padding:7px 16px;border-radius:999px;border:1px solid #e2e8f0;background:#fff;color:#374151;cursor:pointer;font-family:var(--font-ui);font-size:12px;font-weight:600;">← Back</button>';
  } else {
    html +=
      '<button onclick="planScriptActive=-1;renderPlanScripts()" style="padding:7px 16px;border-radius:999px;border:1px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;font-family:var(--font-ui);font-size:12px;font-weight:600;">← All Plans</button>';
  }
  html +=
    '<span style="font-size:12px;font-weight:700;color:#1e293b;">Section ' +
    (planScriptSection + 1) +
    ' of ' +
    activePlan.sections.length +
    '</span>';
  if (planScriptSection < activePlan.sections.length - 1) {
    html +=
      '<button onclick="planScriptSection++;renderPlanScripts()" style="padding:7px 16px;border-radius:999px;border:none;background:#5175f1;color:#fff;cursor:pointer;font-family:var(--font-ui);font-size:12px;font-weight:600;">Next →</button>';
  } else {
    html +=
      '<button onclick="planScriptActive=-1;renderPlanScripts()" style="padding:7px 16px;border-radius:999px;border:none;background:#16a34a;color:#fff;cursor:pointer;font-family:var(--font-ui);font-size:12px;font-weight:600;">Finish ✓</button>';
  }
  html += '</div>';
  var _page_planscripts = document.getElementById('page-planscripts');
  if (_page_planscripts) _page_planscripts.innerHTML = html;
}
