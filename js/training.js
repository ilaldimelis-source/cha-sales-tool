// training.js — Training tab (Process, Product Vault, Simplifier, Red Flags, Roleplay, Closing Lab, Cheat Sheets, Discovery, Closing Engine)

const TRAINING = [
  {
    id: 'spin',
    icon: 'zipper',
    color: 'var(--charcoal)',
    title: 'SPIN Selling',
    author: 'Neil Rackham',
    tagline: 'The question framework that closes complex sales',
    why: "SPIN was built for exactly what you do — selling solutions to people who don't know they need them yet. Every call you run, you're diagnosing a problem before presenting a solution. That's SPIN.",
    core: 'SPIN is a discovery framework. You ask four types of questions in sequence to build pain before presenting a solution. The system works because people are more motivated by pain than by gain. Your job is to make the pain visible before you pitch the plan.',
    principles: [
      'Never pitch before you diagnose. Presenting too early kills sales.',
      "The prospect's pain must feel real to them — not just to you.",
      'Questions do more selling than any pitch ever will.',
      'Implication questions are the most powerful — they make small problems feel urgent.',
      'Need-Payoff questions let the prospect sell themselves.'
    ],
    framework: [
      {
        label: 'S — Situation',
        color: 'var(--charcoal)',
        desc: 'Establish the context. What is their current coverage situation?',
        examples: [
          'What kind of coverage do you have right now?',
          'How long have you been without coverage?',
          'Is anyone else on the plan with you?'
        ],
        note: "Keep this brief. Situation questions are necessary but low value. Don't over-ask."
      },
      {
        label: 'P — Problem',
        color: '#7a5f00',
        desc: 'Expose the gap. What is actually wrong with their current situation?',
        examples: [
          "What happens if you get sick and don't have coverage?",
          'Has going without coverage ever cost you out of pocket?',
          "What's your biggest concern about not having a plan right now?"
        ],
        note: 'This is where the call pivots. Get them to say the problem in their own words.'
      },
      {
        label: 'I — Implication',
        color: 'var(--charcoal2)',
        desc: 'Make the problem bigger. Connect the gap to real financial and personal consequences.',
        examples: [
          'If something happened tomorrow — an accident, an ER visit — what would that look like financially?',
          'How much would one hospital stay set you back without any coverage?',
          'Has not having coverage ever made you hesitate to go to the doctor when you needed to?'
        ],
        note: 'This is the most important question type. A small problem becomes urgent when its consequences are real.'
      },
      {
        label: 'N — Need-Payoff',
        color: '#29A26A',
        desc: 'Let them close themselves. Ask them to describe the value of solving the problem.',
        examples: [
          'If you had a plan that covered your doctor visits and gave you telemedicine at zero cost, how would that change things?',
          'Would it take some stress off knowing that if something happened, you had coverage in place?',
          'How important is it to get this handled now rather than waiting?'
        ],
        note: 'After a strong Need-Payoff answer, your plan presentation is the answer to their own question.'
      }
    ],
    application:
      "On a health insurance call, run a compressed SPIN sequence during discovery. You don't need all four categories every call — but you need Problem and Implication before you present. The moment a prospect says 'I guess if something happened I'd be in trouble' — that's your green light.",
    mistakes: [
      'Jumping to pitch after one situation question',
      'Asking implication questions that sound like scare tactics — keep them grounded in reality',
      'Skipping Need-Payoff and just presenting the plan — let them ask for it',
      'Asking all four types in robotic sequence — weave them naturally'
    ],
    drill:
      'Before your next call: write down one Situation, one Problem, one Implication, and one Need-Payoff question for your most common prospect type. Run those four questions every call for one week.'
  },
  {
    id: 'challenger',
    icon: 'wall',
    color: '#7a5f00',
    title: 'The Challenger Sale',
    author: 'Matthew Dixon & Brent Adamson',
    tagline: 'Teach, tailor, take control',
    why: "The research behind Challenger Sale found that the top performing reps don't just build relationships — they challenge the prospect's thinking and reframe how they see their own problem. In insurance, most people think 'I'll just wait' or 'I'll use the ER.' Your job is to reframe that belief before it kills the sale.",
    core: 'Challengers win by teaching prospects something new about their situation, tailoring the message to what matters to that specific person, and then taking control of the conversation toward a decision. The key insight: customers want to be taught, not just served.',
    principles: [
      "Lead with insight, not rapport. Don't spend 5 minutes building small talk before getting to value.",
      'Reframe the way they see the problem before presenting your solution.',
      'Constructive tension is good — challenge comfortable assumptions.',
      'Tailor your message to what this specific person actually cares about.',
      "Don't be afraid to push back when a prospect is wrong about something important."
    ],
    framework: [
      {
        label: 'Warm Up',
        color: 'var(--charcoal)',
        desc: 'Lead with a relevant, surprising insight before asking any questions.',
        examples: [
          "Most people I talk to think going without coverage saves money. It usually doesn't — one ER visit is $3,000 minimum.",
          'The most common gap I see: people assume they can just sign up whenever. Most windows are closed 8-9 months out of the year.',
          "A lot of people don't realize the plan they have covers nothing until the deductible is met. That can be $5,000 to $7,500."
        ],
        note: "The insight should create a small moment of 'huh, I didn't know that.' That's the opening."
      },
      {
        label: 'Reframe',
        color: '#7a5f00',
        desc: "Connect the insight to their specific situation. Show them the problem they didn't know they had.",
        examples: [
          "Based on what you told me, if something happened right now, you're looking at full out-of-pocket. That's the gap we're solving.",
          "You mentioned you've been without coverage for 4 months. That's 4 months of exposure — and it only takes one day to change everything."
        ],
        note: 'This is where you make it personal, not generic.'
      },
      {
        label: 'Rational Drowning',
        color: 'var(--charcoal2)',
        desc: 'Give them the data that makes the status quo feel expensive.',
        examples: [
          'Average urgent care without coverage: $250. Average ER visit: $2,800. Average hospital stay: $20,000+. This plan is $6 a day.',
          "Open enrollment closes in December. It doesn't reopen until November. That's a potential 9-month gap."
        ],
        note: 'Numbers do the emotional work here. Keep them simple and real.'
      },
      {
        label: 'Emotional Impact',
        color: '#29A26A',
        desc: 'Connect the rational data to a real personal fear or goal.',
        examples: [
          'Nobody plans to get sick. But everybody plans to keep their savings intact.',
          'You mentioned your kid — one pediatric ER visit can run $1,500 to $3,000. That changes the math pretty fast.'
        ],
        note: "One emotional anchor is enough. Don't overdo it."
      },
      {
        label: 'The New Way',
        color: 'var(--butter2)',
        desc: 'Now present your solution as the obvious answer to the problem you just made visible.',
        examples: [
          "That's exactly why this plan exists — it fills the gap while you're between windows, at a price that doesn't require you to sacrifice anything else."
        ],
        note: "At this point they should be asking you for the plan. You're the answer to a question they now realize they have."
      }
    ],
    application:
      "Use the Challenger reframe specifically on 'I'll just wait' and 'I don't really need it right now' objections. Lead with data about what going uninsured actually costs. Then present the plan as the logical solution to the problem you surfaced.",
    mistakes: [
      "Teaching without tailoring — generic insights don't land",
      'Being confrontational instead of constructively challenging',
      'Skipping the emotional step and staying purely rational',
      'Presenting before the reframe is complete'
    ],
    drill:
      "Write your three strongest 'reframe' lines — the ones that make prospects rethink their assumption that waiting is safe. Memorize them. Use one per call during discovery."
  },
  {
    id: 'voss',
    icon: 'wave',
    color: 'var(--charcoal2)',
    title: 'Never Split the Difference',
    author: 'Chris Voss',
    tagline: 'FBI negotiation tactics for sales conversations',
    why: "Chris Voss spent decades negotiating hostage situations. The same principles that work when the stakes are life and death work when someone is deciding whether to spend $200 a month. The core insight: people don't make decisions logically. They make them emotionally, and then justify them logically. Your job is to work with the emotional brain, not against it.",
    core: "Tactical empathy is the foundation. You make the other person feel heard before you try to move them. Labels, calibrated questions, and the power of 'No' are your primary tools. The goal is not to convince — it's to guide them to a decision they feel ownership of.",
    principles: [
      'Tactical empathy: acknowledge what they feel before you address what they said.',
      'Labeling: name the emotion out loud — it defuses it.',
      "Calibrated questions: 'How' and 'What' questions that make them think and reveal information.",
      'The power of No: let them say no to small things — it gives them control and keeps them engaged.',
      'Mirroring: repeat their last 3 words as a question to get them to keep talking.',
      'Late night FM DJ voice: slow down, drop your pitch, project calm.'
    ],
    framework: [
      {
        label: 'Mirroring',
        color: 'var(--charcoal)',
        desc: 'Repeat the last 2-3 words the prospect said as a question. Gets them to elaborate without resistance.',
        examples: [
          "Prospect: 'I just don't think I need this right now.' You: 'Don't need this right now?'",
          "Prospect: 'It seems expensive.' You: 'Seems expensive?'",
          "Prospect: 'I want to talk to my husband first.' You: 'Talk to your husband first?'"
        ],
        note: 'Silence after the mirror. Let them fill it. They almost always give you the real objection.'
      },
      {
        label: 'Labeling',
        color: '#7a5f00',
        desc: "Name what you think they're feeling. Starts with 'It seems like...' or 'It sounds like...' or 'It feels like...'",
        examples: [
          'It seems like cost is the main concern here.',
          "It sounds like you've had a bad experience with plans like this before.",
          "It feels like you're not sure this is the right time."
        ],
        note: "Don't say 'I feel like you...' — say 'It seems like...' The label is about them, not you. After you label, be quiet."
      },
      {
        label: 'Calibrated Questions',
        color: 'var(--charcoal2)',
        desc: 'Open-ended How and What questions that create thinking, not defensiveness.',
        examples: [
          'How would you handle a major medical bill right now without coverage?',
          'What would need to be true for this to make sense for your situation?',
          "What's your biggest concern about moving forward today?",
          'How does your situation look if nothing changes in the next 6 months?'
        ],
        note: 'Never ask Why — it sounds accusatory. How and What keep them thinking forward.'
      },
      {
        label: 'The Accusation Audit',
        color: '#29A26A',
        desc: 'List everything bad the prospect might be thinking about you or the plan — before they say it. Defuses resistance preemptively.',
        examples: [
          "You're probably thinking this sounds like every other insurance call you've gotten.",
          "I know this might feel like I'm just trying to sell you something.",
          'You might be wondering if this plan is actually as good as it sounds.'
        ],
        note: "Say the negative thing they're thinking before they do. It builds trust instantly."
      },
      {
        label: 'No-Oriented Question',
        color: 'var(--butter2)',
        desc: "Ask questions where 'no' is the answer you want — gives them a sense of control.",
        examples: [
          'Is it a bad idea to at least see what the cost looks like?',
          'Would it be ridiculous to take 5 minutes to look at the options?',
          'Have you totally given up on getting coverage handled before the end of the year?'
        ],
        note: "A 'no' here actually moves the sale forward. They say no to the negative frame, which means yes to the positive outcome."
      }
    ],
    application:
      'Use Voss techniques specifically when calls get emotionally charged. When someone is frustrated, defensive, or shutting down — label before you respond. When someone goes quiet — mirror. When you want real information — calibrated questions. The late-night FM DJ voice is for payment collection: slow, calm, certain.',
    mistakes: [
      'Trying to convince with logic when the person is in an emotional state',
      'Filling silence after a label or mirror — the silence is the technique',
      "Asking 'Why' questions — they create defensiveness",
      'Moving too fast — Voss tactics require patience and silence'
    ],
    drill:
      "This week: use a label on every objection before you respond. 'It sounds like [their emotion].' Then pause. Notice how the energy of the call changes."
  },
  {
    id: 'compliance',
    icon: 'search',
    color: '#29A26A',
    title: 'Insurance Compliance',
    author: 'Licensed Agent Standards',
    tagline:
      'What you must say, what you must never say, and why it protects you',
    why: "Compliance isn't just about following rules — it's about protecting yourself, your license, and your client. One misrepresentation claim can cost you your license and lead to legal exposure. Every required disclosure is also a trust-builder — transparent agents close more sales and have fewer chargebacks.",
    core: 'These plans are NOT ACA-compliant major medical insurance. They are private, limited benefit or short-term plans with specific exclusions. You must disclose this on every call, every enrollment. The disclosures are not optional and they are not negotiable.',
    principles: [
      'Every enrollment requires: plan type, pre-ex exclusion, waiting periods, benefit limits, and non-ACA status.',
      'Never imply a plan covers something it does not cover.',
      'Never compare your plan to ACA or major medical without accurately stating the differences.',
      'The recorded line is your protection — use it correctly every time.',
      "Transparency doesn't kill sales. It kills bad sales. Good prospects stay when you're honest.",
      'Chargebacks and cancellations almost always trace back to a misunderstood expectation set during enrollment.'
    ],
    framework: [
      {
        label: 'Required Every Enrollment',
        color: 'var(--charcoal)',
        desc: 'Non-negotiable disclosures. Every single call. Every single plan.',
        examples: [
          'This is a private, limited-benefit plan — NOT an ACA or major medical plan.',
          'This plan does not provide coverage for maternity, substance abuse, or psychiatric services.',
          'Pre-existing conditions diagnosed or treated in the last 12 months are excluded for the first 12 months of the plan.',
          'There is a standard 30-day waiting period for sickness, hospital, and scheduled doctor visits.',
          'Benefits are fixed amounts toward covered services — not full bill coverage.'
        ],
        note: 'These are not optional. They are required on every recorded enrollment.'
      },
      {
        label: 'Never Say',
        color: 'var(--charcoal)',
        desc: 'Language that creates misrepresentation exposure.',
        examples: [
          "Never say: 'This covers everything' or 'This is full coverage'",
          "Never say: 'Your pre-existing condition will be covered'",
          "Never say: 'This is just like regular insurance'",
          "Never say: 'You can go to any doctor you want' if the plan has network restrictions",
          "Never say: 'This replaces your current coverage' if it does not",
          "Never say: 'Mental health is covered' on MEC or standard limited benefit plans"
        ],
        note: 'If you say any of these things and the client later disputes coverage, you have a misrepresentation claim. Your license is at risk.'
      },
      {
        label: 'The Recorded Line Protocol',
        color: '#7a5f00',
        desc: 'What must happen on the recorded portion of every enrollment.',
        examples: [
          'Confirm US citizenship or legal residency',
          'Confirm all health information provided is accurate and complete',
          'Collect SSN for identity verification',
          'Confirm understanding of plan limitations before taking payment',
          'Confirm the closing statement including non-ACA status and exclusions'
        ],
        note: 'The recorded line is your legal protection. Everything stated on it must be accurate. Do not rush through it.'
      },
      {
        label: 'STM-Specific Disclosures',
        color: 'var(--charcoal2)',
        desc: 'Additional required disclosures specific to short-term medical plans.',
        examples: [
          'Short-term medical plans are temporary — they are NOT renewable as permanent coverage',
          'Pre-existing conditions from the prior 12 months are excluded',
          'Access Health STM: read the 15-condition underwriting list before confirming eligibility',
          'Cancer coverage begins after a 30-day waiting period (Pinnacle)',
          'Sickness coverage begins after a 5-day waiting period (Pinnacle)'
        ],
        note: 'STM plans require underwriting disclosure. If the prospect has conditions on the exclusion list, they may not be eligible.'
      },
      {
        label: 'Post-Close Compliance',
        color: '#29A26A',
        desc: 'Required disclosures that belong in the post-close, not just the enrollment.',
        examples: [
          'Confirm plan type (limited-benefit or short-term) — not ACA or major medical',
          'Restate maternity, substance abuse, psychiatric exclusions',
          'Explain the 12-and-12 pre-existing clause by name',
          'State the 30-day waiting period for sickness, hospital, and scheduled visits',
          'Provide confirmation number and customer service number'
        ],
        note: 'Post-close disclosures create a second layer of protection and reduce chargebacks significantly.'
      }
    ],
    application:
      'Build compliance into your delivery so it sounds natural, not like a legal disclaimer. The best agents say the required lines with confidence, not apology. A compliant disclosure delivered confidently builds trust — it signals you have nothing to hide.',
    mistakes: [
      "Rushing through disclosures so fast the prospect doesn't register them",
      "Omitting exclusions because you're afraid they'll kill the sale",
      'Not getting the understanding confirmation before taking payment',
      'Failing to state the non-ACA status clearly on every enrollment'
    ],
    drill:
      'Record yourself saying the closing statement and post-close disclosures. Play it back. Do they sound natural? Do you sound confident or apologetic? Rehearse until confident delivery is automatic.'
  },
  {
    id: 'objection-psych',
    icon: 'users',
    color: 'var(--butter2)',
    title: 'Objection Psychology',
    author: 'Sales Behavioral Science',
    tagline: "Why people object and what's actually happening in their brain",
    why: "Most objections are not what they appear to be. A prospect who says 'it's too expensive' is rarely objecting to the price — they're expressing uncertainty about value. Understanding the psychological mechanism behind an objection tells you exactly how to respond to what's actually happening, not just what was said.",
    core: "Objections are a form of self-protection. The brain's threat-detection system fires when a purchase decision feels risky. Your job is not to overcome the objection — it's to reduce the perceived threat until the decision feels safe. This requires understanding which type of threat the objection represents.",
    principles: [
      'Every objection is a request for more certainty — not a rejection.',
      'The stated objection is almost never the real objection.',
      "Arguing with an objection makes the resistance stronger — it's neurological.",
      'Acknowledgment before reframe: the brain cannot receive new information while it feels unheard.',
      'The antidote to price objections is value clarity, not price reduction.',
      'Urgency created by real consequences is ethical. Manufactured pressure is manipulation.'
    ],
    framework: [
      {
        label: 'Loss Aversion',
        color: 'var(--charcoal)',
        desc: 'People fear losing money 2x more than they value gaining the same amount. Frame coverage as loss prevention.',
        examples: [
          'Without this plan, one ER visit costs $2,800 on average. The plan is $192 a month. The plan is the cheaper option.',
          'You are not spending $200. You are eliminating the risk of a $20,000 bill.',
          'Every month without coverage is a month where an accident or illness costs you everything out of pocket.'
        ],
        note: "Prospect psychology responds more strongly to 'what you could lose' than 'what you could gain.' Always anchor to the cost of going uninsured."
      },
      {
        label: 'Status Quo Bias',
        color: '#7a5f00',
        desc: 'People prefer the current state even when change is clearly better. Going uninsured feels familiar and safe.',
        examples: [
          "I know going without coverage feels normal because you've been doing it — but normal doesn't mean protected.",
          "The question isn't whether staying uninsured is comfortable. It's whether it's smart.",
          "You've been lucky so far. But luck is not a health plan."
        ],
        note: "Don't fight the status quo directly. Acknowledge it and reframe it as a risk, not a safe default."
      },
      {
        label: 'Social Proof',
        color: 'var(--charcoal2)',
        desc: 'People look to others to validate decisions. Use social proof to normalize enrollment.',
        examples: [
          'Most of the people I talk to in your situation end up going with a plan exactly like this one.',
          "Self-employed folks especially — this is the most common solution I see when someone doesn't have employer coverage.",
          "The people who wait usually call back after something happens. You're ahead of that curve by calling now."
        ],
        note: 'Normalize the decision. Uncertainty is reduced when the prospect feels like others like them have already made this choice.'
      },
      {
        label: 'Commitment and Consistency',
        color: '#29A26A',
        desc: "People follow through on commitments they've made out loud. Use micro-commitments throughout the call.",
        examples: [
          'Earlier you said having doctor visit coverage was important to you — this plan gives you that from day one.',
          "You mentioned your biggest concern was an unexpected emergency — that's exactly what this addresses.",
          "You agreed that $6 a day is less than the cost of one urgent care visit — so let's make sure you have that protection."
        ],
        note: 'Reference what they said earlier in the call. They are more likely to act in a way that is consistent with their own stated values.'
      },
      {
        label: 'The Certainty Principle',
        color: 'var(--butter2)',
        desc: "Objections exist because a decision doesn't feel certain enough. Identify which dimension of certainty is missing.",
        examples: [
          'Not sure about the value? → Use numbers and comparison to make value concrete.',
          'Not sure about the plan being real? → Verification, carrier name, network name, state license.',
          'Not sure about the timing? → Make the cost of waiting concrete and immediate.',
          'Not sure about the decision maker? → Loop in the spouse or partner now, not later.'
        ],
        note: 'Ask: what would make this feel certain enough to move forward? Then answer exactly that question.'
      }
    ],
    application:
      'Before you respond to any objection, ask yourself: what is the underlying psychological mechanism here? Is this loss aversion, status quo bias, social proof gap, or a certainty gap? Your answer determines your response. Respond to the mechanism, not just the words.',
    mistakes: [
      'Responding to objections before acknowledging the emotion behind them',
      "Treating every objection as a price objection when it's really a trust or certainty issue",
      'Using logical arguments on emotionally-driven objections',
      'Applying pressure instead of reducing perceived risk — pressure increases resistance'
    ],
    drill:
      'For each of your 5 most common objections, write down: (1) the real psychological mechanism, and (2) the one sentence that addresses that mechanism directly. Memorize those 5 sentences.'
  }
];

const ISA_OBJECTIONS = [
  {
    cat: 'Price',
    obj: "It's too expensive.",
    means: "They haven't seen the value yet. Or they're comparing to $0.",
    diag: "'Compared to what — what are you paying now?'",
    mistake: 'Immediately discount or apologize for the price.',
    response:
      "'I hear you — and I want to put that in context. The average ER visit without coverage is $3,000 to $10,000. What we're really deciding is whether [price]/month is worth protecting against that. What's your current plan if something happens tomorrow?'",
    soft: "'I understand the price matters — can I show you what this plan would actually save you if you had to use it even once?'",
    strong:
      "'Let me ask you something — what does no coverage cost you if you end up in the ER next month? Because that's the real number we should be comparing this to.'",
    bridge:
      "'If the price makes sense relative to the risk, is there anything else stopping you from getting protected today?'",
    close:
      "'At [price] a month, that's less than a copay for a single doctor visit. Let's get you covered — what's your start date preference?'",
    compliance: "Don't promise it will save them a specific dollar amount."
  },
  {
    cat: 'Price',
    obj: "I can't afford anything right now.",
    means: "Budget is real OR they don't see enough value to prioritize it.",
    diag: "'Can I ask — what would you normally spend on something like this if the plan actually made sense for you?'",
    mistake: 'Immediately move to the cheapest plan without confirming value.',
    response:
      "'I completely understand — and I'd rather not put you in something that doesn't fit. Can I ask: if the right plan was $X a month, would that be workable?'",
    soft: "'There are options at different price points. Let me find the one that protects you most for the least.'",
    strong:
      "'What would one unplanned ER visit cost you right now without coverage? Because that's what we're protecting against.'",
    bridge:
      "'If I can find something in a range that works, can we move forward today?'",
    close:
      "'Let me show you the lowest-cost option that still gives you meaningful protection — if it makes sense, we can get it done in 5 minutes.'",
    compliance:
      "Don't misrepresent benefit levels to make a cheaper plan sound fuller than it is."
  },
  {
    cat: 'Delay',
    obj: 'I need to think about it.',
    means:
      'Something is unresolved — often trust, understanding, or they want an exit.',
    diag: "'Of course — can I ask what specifically you're weighing? Because I want to make sure you have the right information before you decide.'",
    mistake: "Saying 'sure, take your time' and hanging up.",
    response:
      "'Totally fair — and I want to help you think through it right now while you have the information fresh. Is it the price? The coverage? Something I didn't explain well?'",
    soft: "'What would you need to feel confident moving forward? Let's get there now if we can.'",
    strong:
      "'I don't want to pressure you — but I also don't want you to hang up without coverage because there was something I could have answered. What's the specific thing?'",
    bridge: "'If I address that, can we get you protected today?'",
    close:
      "'Great — so the only thing left is [resolved issue]. Based on that, let's get your effective date locked in.'",
    compliance:
      "Don't create false urgency around price increases or limited availability."
  },
  {
    cat: 'Delay',
    obj: 'Send me the information.',
    means: 'They want a polite exit. Rarely followed up.',
    diag: "'Absolutely — I can do that. Out of curiosity, what specifically would you be looking for in the information?'",
    mistake:
      'Agreeing without a plan to follow up, or sending a generic brochure.',
    response:
      "'I can absolutely do that — and I'll be honest with you: most people who ask for information to review end up not reviewing it. What I'd rather do is answer your specific questions right now while I have everything in front of me.'",
    soft: "'What would the information need to say to make you comfortable moving forward?'",
    strong:
      "'The information I'd send is exactly what I've been walking you through. What specific part do you want to look at more closely?'",
    bridge:
      "'If I can answer that right now, would you be open to moving forward today?'",
    close:
      "'Great — then let's skip the email and get you enrolled. What's your start date preference?'",
    compliance:
      "Don't send materials with incorrect or inflated benefit descriptions."
  },
  {
    cat: 'Trust',
    obj: "I don't trust this.",
    means: "They've been burned before, or this sounds too good to be cheap.",
    diag: "'That's completely fair — what's making you skeptical? Is it the price, the plan, or something about this call?'",
    mistake:
      "Getting defensive. Trying to 'prove' legitimacy by over-explaining.",
    response:
      "'I respect that — and honestly, the fact that you're skeptical is a good sign. It means you're paying attention. Let me tell you exactly what this plan is, what it isn't, what it costs, and where you can verify every piece of information independently.'",
    soft: "'What would I need to show you to make you feel more confident?'",
    strong:
      "'I'd rather you push back on me now than enroll in something you don't believe in. What specifically feels off?'",
    bridge:
      "'If we verify the specifics and everything checks out — is there anything else holding you back?'",
    close:
      "'Based on what you now know — does this make sense for your situation?'",
    compliance:
      "Never dismiss legitimate skepticism. Never say 'trust me' without verification options."
  },
  {
    cat: 'Spouse',
    obj: 'I need to talk to my spouse.',
    means: 'Genuine spousal involvement OR using spouse as a delay tactic.',
    diag: "'Of course — can I ask: is your spouse also uninsured, or do they have separate coverage?'",
    mistake: 'Immediately backing off without understanding the real blocker.',
    response:
      "'Completely makes sense — I respect that. Let me ask you this: is there a specific concern your spouse would have that I can help you answer right now? Because I'd rather you go to them with a confident recommendation than just a question.'",
    soft: "'Would it help if I walked you through the key points so you feel prepared to explain it to them?'",
    strong:
      "'What's the main thing your spouse would want to know? Let me address that now.'",
    bridge:
      "'If you had the answers to their main questions, would you be able to make this decision together tonight?'",
    close:
      "'Great — so the main thing they'd want to know is [X]. Here's the answer: [Y]. Based on that — does this make sense?'",
    compliance:
      "Don't pressure someone to enroll against their spouse's wishes."
  },
  {
    cat: 'Coverage',
    obj: 'I already have coverage.',
    means:
      'They may have minimal coverage and not realize it, or they want to compare.',
    diag: "'Good — what do you have right now? Who's the carrier and what kind of plan is it?'",
    mistake:
      'Backing off immediately without understanding what they actually have.',
    response:
      "'Good — can I ask what type of plan it is and what it costs? Because a lot of people I talk to are paying more for less, or have coverage gaps they're not aware of. I'm not trying to replace something good — but I'd hate for you to find out there's a gap when you actually need it.'",
    soft: "'I'm not here to replace something that's working — I just want to make sure what you have actually covers what you think it does.'",
    strong:
      "'What does it cover if you go to the ER? What's the deductible? What does it cost you?'",
    bridge:
      "'If it turns out there's a meaningful gap — would you be open to supplementing or switching?'",
    close:
      "'Based on what you just described — [gap]. This plan covers that directly. Can we get it set up?'",
    compliance:
      "Don't claim their current plan is worse than it is without factual basis."
  },
  {
    cat: 'Coverage',
    obj: "I'm healthy, I don't need it.",
    means: "They're underestimating risk because they feel good right now.",
    diag: "'That's actually when the best time to get coverage is — can I ask, when was the last time you had something unexpected health-wise?'",
    mistake: 'Immediately jumping into scare tactics.',
    response:
      "'The healthiest people I talk to are the ones who never think they'll need it — right up until they do. The ER doesn't care how healthy you are when you break your arm or get a kidney stone. This plan costs [price] a month. One unexpected ER visit costs $3,000 minimum.'",
    soft: "'Being healthy is great — this plan actually costs less because of it. You're locking in a low rate while you're healthy.'",
    strong:
      "'Can I ask — if you had a medical emergency tomorrow, what's your plan right now? Because that's the gap we're filling.'",
    bridge:
      "'If the price makes sense and it's just a safety net you hope to never use — is there any reason not to have it?'",
    close:
      "'At [price] a month, it's the cheapest it'll ever be for you right now. Let's lock it in while your health is good.'",
    compliance: "Don't imply coverage is guaranteed regardless of health."
  },
  {
    cat: 'Timing',
    obj: "I'll wait for open enrollment.",
    means:
      "They think ACA marketplace is the right answer — or they don't understand what open enrollment is for.",
    diag: "'Can I ask — do you currently have an employer plan or a qualifying life event coming up?'",
    mistake:
      'Agreeing that open enrollment is better without understanding their situation.',
    response:
      "'I want to make sure open enrollment is actually available to you — because if you don't have employer coverage or a qualifying life event, you may not be able to enroll in an ACA plan outside of open enrollment.'",
    soft: "'Open enrollment makes sense if you have employer-sponsored coverage coming — do you?'",
    strong:
      "'When's your open enrollment? And what's your plan between now and then if something happens?'",
    bridge:
      "'If I could show you coverage at a significantly lower cost than an ACA plan — would you at least want to compare?'",
    close:
      "'The gap between now and open enrollment is when things happen. Let me get you covered in the meantime.'",
    compliance:
      "Never tell someone they can't get ACA coverage if they're actually eligible."
  },
  {
    cat: 'Timing',
    obj: 'I want ACA.',
    means:
      'They want comprehensive coverage OR they think ACA = the only real insurance.',
    diag: "'What makes ACA the right fit for your situation? Do you qualify for a subsidy or have a specific health need?'",
    mistake: 'Dismissing ACA or badmouthing it.',
    response:
      "'ACA is a great option for the right person — and I'm not trying to talk you out of it. I just want to make sure you've compared the real numbers. For most people without a subsidy, ACA runs $350 to $700 a month for an individual with a $3,000 to $8,000 deductible.'",
    soft: "'If ACA is the right fit, I'll tell you. Can I ask what your budget is so we can compare honestly?'",
    strong:
      "'What specific coverage are you looking for from ACA? Because I want to see if what I have solves the same problem for less.'",
    bridge:
      "'If I could match the core protection you're looking for at a lower price — would that be worth considering?'",
    close:
      "'Let me show you exactly what this plan covers versus what you'd get from an ACA plan at double the price — give me 90 seconds.'",
    compliance:
      "Never say ACA is 'bad' or discourage someone from ACA if it genuinely fits them better."
  }
];
const ISA_PRODUCT_TYPES = [
  {
    title: 'Limited Benefit Plan',
    icon: 'circle',
    what: 'A health plan that pays fixed dollar amounts per covered service — not based on actual cost. Benefits are scheduled: $X for a doctor visit, $Y for urgent care, $Z for ER, etc.',
    whatnot:
      "Not major medical. Not ACA-compliant. Won't cover everything. Benefit caps apply per service.",
    bestfor:
      'Self-employed, gig workers, part-time employees, early retirees between coverage.',
    notfor:
      'Anyone with serious chronic conditions, upcoming planned procedures, or high-frequency care needs.',
    explain:
      "You know exactly what you're getting and what it pays. If you go to urgent care, this plan pays $[amount]. No deductible, no surprise.",
    compliance:
      'Must disclose: this is a limited benefit plan, not ACA-compliant, not major medical.',
    rightfit:
      'Maria, 34, freelance graphic designer. No employer coverage, healthy, mainly needs urgent care and Rx.',
    wrongfit:
      'John, 52, with diabetes, upcoming knee surgery, and regular specialist visits.'
  },
  {
    title: 'MEC / Preventive Plan',
    icon: 'circle',
    what: 'Minimum Essential Coverage plan covering preventive services only — annual wellness, immunizations, screenings. Not comprehensive coverage.',
    whatnot:
      'Does NOT cover sick visits, ER, hospital stays, surgery, or prescriptions (beyond preventive). Not major medical.',
    bestfor:
      'Very healthy individuals who want coverage for staying healthy, or those who need MEC-level compliance at the lowest cost.',
    notfor:
      'Anyone who wants coverage for illness, injury, or unexpected medical events.',
    explain:
      "This covers your preventive care — your annual physical, screenings, immunizations — at no deductible. It's not designed to cover you if you get sick. It's the foundation, not the whole structure.",
    compliance:
      'Must disclose: this is preventive-only coverage. It does not cover illness treatment. It is not major medical.',
    rightfit:
      'Alex, 27, healthy, employed part-time, mainly wants annual wellness covered.',
    wrongfit:
      'Someone with any chronic condition or who plans to use care beyond prevention.'
  },
  {
    title: 'Short-Term Medical (STM)',
    icon: 'circle',
    what: 'A health insurance plan designed to cover major medical events — illness, injury, hospitalization — with a deductible, coinsurance, and out-of-pocket max structure.',
    whatnot:
      'Not ACA-compliant. Pre-existing condition exclusions apply (12/12 clause typical). Mental health, maternity, and substance abuse typically excluded. Waiting period for illness (usually 30 days).',
    bestfor:
      "People between jobs, waiting for employer benefits, aged off parents' plan, self-employed wanting major protection at a lower price than ACA.",
    notfor:
      'People with ongoing conditions, expecting pregnancy, needing mental health treatment, or high-frequency care.',
    explain:
      "Think of this as your protection against the expensive unexpected. ER, hospitalization, surgery, serious illness — that's what this handles. It won't cover therapy appointments or prenatal visits, but it will protect you from a $50,000 hospital bill.",
    compliance:
      'Must disclose: not ACA-compliant, pre-existing conditions excluded per 12/12 rule, maternity and mental health excluded, 30-day waiting period for illness.',
    rightfit:
      'Derek, 31, just left corporate job, self-employed, healthy, wants major event coverage.',
    wrongfit: 'Lisa, 29, pregnant, with asthma and regular therapy visits.'
  },
  {
    title: 'Fixed Indemnity / Hospital Indemnity',
    icon: 'circle',
    what: 'Pays a fixed cash benefit when a qualifying event occurs — typically hospitalization. Benefit is paid to you, not to the provider, regardless of actual cost.',
    whatnot:
      "Not major medical. Not ACA-compliant. Doesn't pay based on bills — pays based on events. Not a standalone coverage solution for most people.",
    bestfor:
      'As a supplement to existing coverage. Good for covering out-of-pocket costs when hospitalized. Also for gig workers who could lose income during a hospital stay.',
    notfor:
      "As someone's only health coverage unless they clearly understand the limitation.",
    explain:
      "If you're admitted to a hospital, this plan pays you [amount] cash per day or per admission — regardless of what the hospital charges. You can use it for your deductible, your rent, your bills.",
    compliance:
      'Must disclose: this is not major medical, pays fixed benefits regardless of actual expenses.',
    rightfit:
      'Sandra, 45, already has a high-deductible ACA plan. Wants something to cover the first $3,000 deductible if hospitalized.',
    wrongfit:
      'Someone who has no other insurance and thinks this is their only protection.'
  }
];
const ISA_SIMPLIFIER = [
  {
    term: 'Deductible',
    tech: 'The amount you pay out-of-pocket for covered services before your insurance begins to pay.',
    plain:
      'The bill you pay first before the plan kicks in. Think of it like a threshold: once you hit that number, the insurance starts helping.',
    dontsay:
      "Don't say: 'Once your deductible is met, the plan pays everything.' It doesn't — coinsurance still applies."
  },
  {
    term: 'Coinsurance',
    tech: 'The percentage of costs you share with the insurer after your deductible is met.',
    plain:
      "After your deductible, you and the plan split the cost. 80/20 means the plan pays 80%, you pay 20%. It's a shared bill.",
    dontsay:
      "Don't say 'after the deductible, you only pay 20%' without explaining the out-of-pocket maximum."
  },
  {
    term: 'Copay',
    tech: 'A fixed amount you pay for a covered service at the time of care.',
    plain:
      "A flat fee. You walk in, you pay $40, done. Doesn't count toward deductible in many plans.",
    dontsay:
      "Don't imply copays exist in all plan types — many limited benefit and STM plans don't work on copay structures."
  },
  {
    term: 'Pre-Existing Condition Limitation',
    tech: "Coverage exclusion or reduced benefits for conditions diagnosed or treated before the plan's effective date.",
    plain:
      "If you had it before the plan started, the plan may not cover it — at least for a certain time period. After the waiting period, you're typically covered going forward.",
    dontsay:
      "Don't say 'pre-existing conditions are covered' if a 12/12 clause applies. That's a compliance violation."
  },
  {
    term: 'Waiting Period',
    tech: 'A specified time after the policy effective date during which benefits are not payable for certain services.',
    plain:
      "A delay. If you get sick in the first 30 days, the plan won't cover it. After that, you're covered. Injuries are typically covered Day 1.",
    dontsay:
      "Don't forget to disclose the waiting period. Skipping this causes cancellations and complaints."
  },
  {
    term: 'Fixed Benefit',
    tech: 'A predetermined dollar amount paid per covered service regardless of actual cost.',
    plain:
      'The plan pays you a set amount — say $150 for urgent care — no matter what the bill is. If the visit costs $300, you cover the difference.',
    dontsay: "Don't imply fixed benefits cover the full bill. They often don't."
  },
  {
    term: 'Preventive-Only Coverage',
    tech: 'Coverage limited to preventive care services with no benefits for sick or injury care.',
    plain:
      'This covers keeping you healthy — checkups, shots, screenings — but not treating illness or injury.',
    dontsay:
      'Never imply preventive-only plans cover sick visits or emergencies.'
  },
  {
    term: 'Network Access',
    tech: 'The list of providers, hospitals, and facilities that have contracted rates with the insurance plan.',
    plain:
      'Your plan has a list of approved doctors. Use those doctors and you pay less. Go outside the list and you pay more — or everything.',
    dontsay:
      "Don't tell prospects 'you can see any doctor' unless the plan specifically allows out-of-network at the same benefit level."
  },
  {
    term: 'Not ACA-Compliant',
    tech: 'The plan does not meet the requirements of the Affordable Care Act and does not provide essential health benefits.',
    plain:
      "This plan plays by different rules than marketplace plans. It can cost less — but it also doesn't cover everything ACA plans are required to cover.",
    dontsay:
      "Never downplay this. 'Not ACA-compliant' is a required disclosure, not an option."
  },
  {
    term: 'Maximum Benefit',
    tech: 'The highest dollar amount the plan will pay for a specific service or overall during a benefit period.',
    plain:
      "There's a ceiling on what the plan will pay. Once you hit it, you're responsible for the rest.",
    dontsay:
      "Don't gloss over maximums. If the hospital benefit cap is $10,000 and the surgery costs $40,000, that gap matters."
  },
  {
    term: 'Short-Term Medical',
    tech: 'A health plan designed to provide temporary coverage for major medical events with a limited contract duration.',
    plain:
      "Coverage for the unexpected — ER, hospitalization, surgery — while you're between jobs or waiting for employer coverage. Not forever, not comprehensive, but real protection.",
    dontsay:
      "Don't call it 'real health insurance' in a way that implies ACA-equivalency."
  }
];
const ISA_CLOSES = [
  {
    name: 'Logistics Close',
    when: 'Prospect is ready but needs direction to move forward.',
    tone: 'Efficient. Helpful. Removing friction.',
    weak: "'Okay so what's your information?'",
    better:
      "'Let's get you set up — I'll just need a couple of pieces of info to finalize this.'",
    elite:
      "'Perfect — let's get your coverage effective. Two quick things: your date of birth, and the best email for your confirmation. What's the date of birth?'"
  },
  {
    name: 'Soft Close',
    when: 'Prospect is hesitant. You want to lower the pressure and check alignment.',
    tone: 'Warm. Non-threatening. Open.',
    weak: "'I don't want to push you, so whatever you decide is fine.'",
    better: "'Does this feel like the right fit for where you are right now?'",
    elite:
      "'I don't want to push you into anything — but I also don't want you to go another week without coverage if this is the right fit. From what we've gone over, does this solve what you need it to solve?'"
  },
  {
    name: 'Direct Close',
    when: 'All information has been given. Prospect understands the plan. No unresolved objection.',
    tone: 'Clear. Confident. Respectful.',
    weak: "'So should we do this?'",
    better:
      "'You've got all the information. The plan fits your situation. What do you want to do?'",
    elite:
      "'You know the price. You know what it covers. You know what happens if you don't have it. The only decision left is whether you want to be covered starting this month. What are we doing?'"
  },
  {
    name: 'Compliance-Safe Confirmation Close',
    when: 'After enrollment is complete. Confirm understanding of what was purchased.',
    tone: 'Warm. Thorough. Professional.',
    weak: "'Okay you're all set, bye!'",
    better:
      "'Before I let you go — do you have any questions about how the plan works?'",
    elite:
      "'You're all set. Effective date is [date], confirmation number is [X], customer service is [number]. This plan is a [plan type] — not ACA, not major medical. It covers [key benefits], and does not cover mental health, maternity, or substance abuse. Any questions about any of that?'"
  }
];

const ISA_ROLEPLAY = [
  {
    profile: 'Skeptical Prospect',
    desc: 'Mike, 41. Laid off 3 months ago. Has been burned by a plan that denied claims. Immediately suspicious.',
    says: "Yeah, I've heard this before. Last plan I had denied everything. What makes this any different?",
    weak: 'Telling them the plan is different without being specific. Being defensive.',
    response:
      "That's the most important thing you could have told me. Can you walk me through what happened — what was denied and why? Because I want to be straight with you: if this plan has the same issue, I'll say so. But if it doesn't, I want to show you specifically how this is different."
  },
  {
    profile: 'Price Shopper',
    desc: 'Diana, 27. Shopping 4 different carriers. Every question is about price. Never asks about benefits.',
    says: "What's the cheapest you have?",
    weak: 'Going straight to your cheapest plan without asking about their situation.',
    response:
      "I can absolutely show you the lowest price — and I want to make sure whatever it is actually protects you. Tell me: if something happened, what would be most important for the plan to cover? Because the cheapest plan that doesn't cover that doesn't help you."
  },
  {
    profile: 'Burned by Past Insurance',
    desc: 'Teresa, 48. Paid for a plan for two years. Had a hospital stay. Plan barely paid. Feels scammed.',
    says: 'The last insurance I had for two years, I paid thousands of dollars, went to the hospital, and they barely covered anything.',
    weak: "Comparing your plan to hers with generic 'we're better' language. Making promises.",
    response:
      "Teresa, I'm really sorry that happened — that's exactly what shouldn't happen. Can you tell me what type of plan it was? Because I want to understand the specific issue. And then I'll walk you through exactly how this plan works — including the parts where you'd still have out-of-pocket exposure — so you go in with your eyes open."
  },
  {
    profile: 'Spouse Blocker',
    desc: "Robert, 35. Likes the plan. Every close attempt gets 'I need to run it by my wife.'",
    says: 'It sounds good, but I need to talk to my wife before I sign up for anything.',
    weak: "Saying 'okay' and scheduling a callback. Losing the momentum entirely.",
    response:
      "Absolutely — I respect that completely. Can I ask: what would be her main question or concern about this? Because I'd rather you go back to her with a confident answer than just a question mark. What does she typically want to know before a decision like this?"
  },
  {
    profile: 'Analytical Buyer',
    desc: 'James, 44. Engineer. Wants to read every document. Asks very specific questions about every exclusion.',
    says: 'Before I do anything, I need to understand the exact pre-existing condition exclusion language and how claims are processed.',
    weak: 'Trying to close too fast. Giving vague answers. Getting frustrated with the detail level.',
    response:
      "Absolutely — that's the exact right question. So the pre-existing condition rule is a 12/12 look-back: anything diagnosed or treated in the 12 months before your start date is excluded for the first 12 months of coverage. After month 12, you're covered going forward. Claims go through [administrator] — here's how that process works step by step..."
  },
  {
    profile: 'Delay/Stall Buyer',
    desc: 'Carlos, 39. Has been calling back for 3 weeks. Always interested, never decides.',
    says: "I'm just not ready yet. Let me think about it a little more.",
    weak: 'Scheduling another callback. Not addressing the real blocker.',
    response:
      "Carlos, I want to be straight with you — we've talked a few times and every time we get close, something holds it back. That tells me something specific isn't resolved, and I'd rather find out what it is than keep calling you. What's the real hesitation? Is it the plan, the price, or something I haven't addressed?"
  }
];


function toggleIsaObj(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function renderProductvault() {
  var html =
    '<div class="ph"><div class="pt">Product <span>Training Vault</span></div><div class="pd">Know what you\'re selling — and what you\'re not.</div></div>';
  ISA_PRODUCT_TYPES.forEach(function (p, i) {
    var body = '';
    body += _trnTwoCols('WHAT IT IS', p.what, "WHAT IT'S NOT", p.whatnot);
    body += '<div style="height:12px;"></div>';
    body += _trnTwoCols('BEST FOR', p.bestfor, 'NOT FOR', p.notfor);
    body +=
      '<div style="margin-top:12px;"><div class="trn-sec-label">HOW TO EXPLAIN IT</div>';
    body +=
      '<div style="font-family:var(--font-body);font-size:14px;font-style:italic;color:#374151;line-height:1.8;padding:12px 14px;background:#F8F9FE;border-radius:8px;">' +
      p.explain +
      '</div></div>';
    body += '<div style="height:12px;"></div>';
    body += _trnTwoCols('RIGHT FIT', p.rightfit, 'WRONG FIT', p.wrongfit);
    body +=
      '<div style="margin-top:12px;padding:10px 14px;background:#FEF2F2;border-left:3px solid #B91C1C;border-radius:12px;font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;"><strong style="color:#B91C1C;">Compliance:</strong> ' +
      p.compliance +
      '</div>';
    html += _trnOpenCard(p.title, body);
  });
  document.getElementById('page-productvault').innerHTML = html;
}

function renderSimplifier() {
  var html =
    '<div class="ph"><div class="pt">Term <span>Translator</span></div><div class="pd">Translate insurance terms into plain language — then use that language on calls.</div></div>';
  ISA_SIMPLIFIER.forEach(function (item, i) {
    var body = '';
    body += '<div class="trn-two-col" style="margin-bottom:12px;">';
    body +=
      '<div><div class="trn-sec-label">TECHNICAL DEFINITION</div><div style="font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;">' +
      item.tech +
      '</div></div>';
    body +=
      '<div><div class="trn-sec-label" style="color:#15803D;">SAY IT THIS WAY</div><div style="font-family:var(--font-body);font-size:14px;font-style:italic;color:#374151;line-height:1.8;padding:12px 14px;background:#F8F9FE;border-radius:8px;">' +
      item.plain +
      '</div></div>';
    body += '</div>';
    body +=
      '<div style="padding:10px 14px;background:#FEF2F2;border-left:3px solid #B91C1C;border-radius:12px;font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;"><strong style="color:#B91C1C;">Never say:</strong> ' +
      item.dontsay +
      '</div>';
    html += _trnOpenCard(item.term, body);
  });
  document.getElementById('page-simplifier').innerHTML = html;
}

function renderRoleplay() {
  var html =
    '<div class="ph"><div class="pt">Roleplay <span>Simulator</span></div><div class="pd">Practice the hard conversations before they\'re real. Study what elite looks like.</div></div>';
  ISA_ROLEPLAY.forEach(function (sc, i) {
    var body = '';
    body +=
      '<div style="font-family:var(--font-body);font-size:14px;color:#6B7280;margin-bottom:12px;">' +
      sc.desc +
      '</div>';
    body +=
      '<div style="padding:14px;background:#F8F9FE;border-radius:12px;margin-bottom:12px;"><div class="trn-sec-label">PROSPECT SAYS</div>';
    body +=
      '<div style="font-family:var(--font-body);font-size:14px;font-weight:700;color:#111827;font-style:italic;line-height:1.8;">&ldquo;' +
      sc.says +
      '&rdquo;</div></div>';
    body += '<div class="trn-two-col">';
    body +=
      '<div class="trn-col-red"><div class="trn-col-label" style="color:#B91C1C;">WEAK RESPONSE</div><div class="trn-col-text">' +
      sc.weak +
      '</div></div>';
    body +=
      '<div class="trn-col-green"><div class="trn-col-label" style="color:#15803D;">ELITE RESPONSE</div><div class="trn-col-text">' +
      sc.response +
      '</div></div>';
    body += '</div>';
    html += _trnOpenCard(sc.profile, body);
  });
  document.getElementById('page-roleplay').innerHTML = html;
}

function renderClosinglab() {
  var html =
    '<div class="ph"><div class="pt">Closing <span>Lab</span></div><div class="pd">Know your closes. Know when to use them. Know the difference between weak and elite.</div></div>';
  ISA_CLOSES.forEach(function (cl, i) {
    var body = '';
    body += '<div class="trn-two-col" style="margin-bottom:12px;">';
    body +=
      '<div><div class="trn-sec-label">WHEN TO USE</div><div style="font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;">' +
      cl.when +
      '</div></div>';
    body +=
      '<div><div class="trn-sec-label">TONE</div><div style="font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;">' +
      cl.tone +
      '</div></div>';
    body += '</div>';
    body +=
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">';
    body +=
      '<div class="trn-col-red"><div class="trn-col-label" style="color:#B91C1C;">WEAK</div><div class="trn-col-text" style="font-style:italic;">' +
      cl.weak +
      '</div></div>';
    body +=
      '<div style="border-left:3px solid #d97706;background:#FFFBEB;border-radius:12px;padding:14px;"><div class="trn-col-label" style="color:#d97706;">BETTER</div><div class="trn-col-text" style="font-style:italic;">' +
      cl.better +
      '</div></div>';
    body +=
      '<div class="trn-col-green"><div class="trn-col-label" style="color:#15803D;">ELITE</div><div class="trn-col-text" style="font-style:italic;">' +
      cl.elite +
      '</div></div>';
    body += '</div>';
    html += _trnCard('cl' + i, cl.name, body);
  });
  document.getElementById('page-closinglab').innerHTML = html;
}

function renderCheatsheets() {
  var html =
    '<div class="ph"><div class="pt">Cheat <span>Sheets</span></div><div class="pd">Scan fast. Use immediately.</div></div>';

  // Compliance card
  var compBody = '';
  [
    ' Mental health — EXCLUDED. Say it every call.',
    ' Maternity — EXCLUDED. Say it every call.',
    ' Substance abuse rehab — EXCLUDED. Say it every call.',
    ' Must disclose network, underwriter, association, and billing — DISCLOSE.',
    ' 30-day waiting period for illness — DISCLOSE.',
    ' 12/12 pre-ex clause — DISCLOSE.',
    ' Not ACA-compliant — DISCLOSE.',
    ' Not major medical — DISCLOSE.'
  ].forEach(function (item) {
    compBody +=
      '<div style="font-family:var(--font-body);font-size:14px;color:#374151;padding:8px 0;border-bottom:1px solid #E5E7EB;">' +
      item +
      '</div>';
  });
  html += _trnOpenCard('Compliance Non-Negotiables', compBody);

  // Plan Reference Table card
  var tableBody =
    '<div style="overflow-x:auto;"><table class="ctable" style="border:2px solid #C8CEDD;min-width:600px;">';
  tableBody +=
    '<thead><tr><th style="font-size:13px;">Plan Name</th><th style="font-size:13px;">Network</th><th style="font-size:13px;">Underwriter / Admin</th><th style="font-size:13px;">Association</th></tr></thead><tbody>';
  if (typeof PLANS !== 'undefined') {
    PLANS.forEach(function (p) {
      tableBody +=
        '<tr><td style="font-weight:700;font-size:14px;color:var(--text-primary);">' +
        p.name +
        '</td>';
      tableBody +=
        '<td style="font-size:13px;">' + (p.network || '—') + '</td>';
      tableBody += '<td style="font-size:13px;">' + (p.admin || '—') + '</td>';
      tableBody +=
        '<td style="font-size:13px;">' + (p.assoc || '—') + '</td></tr>';
    });
  }
  tableBody += '</tbody></table></div>';
  html += _trnOpenCard('Plan Reference Table', tableBody);

  document.getElementById('page-cheatsheets').innerHTML = html;
}

// ══════════════════════════════════════════════════════
// RENDER: DISCOVERY QUESTION GENERATOR
// ══════════════════════════════════════════════════════
function renderDiscovery() {
  var categories = [
    {
      type: 'S',
      label: 'Situation',
      color: 'var(--charcoal)',
      icon: '',
      desc: 'Establish context. Keep brief — move to Problem quickly.',
      questions: [
        'What are you currently doing for coverage?',
        'How long have you been without coverage?',
        'Are you looking for coverage for just yourself or your family too?',
        'Are you self-employed, between jobs, or did your employer coverage recently end?',
        'What coverage did you have before this?'
      ]
    },
    {
      type: 'P',
      label: 'Problem',
      color: '#7a5f00',
      icon: '',
      desc: 'Surface the gap. Get them to say the problem in their own words.',
      questions: [
        'What worries you most about being uninsured right now?',
        'Has going without coverage ever cost you money out of pocket?',
        'What happens if you need to see a doctor — what does that look like for you today?',
        'What is the biggest risk of staying without a plan right now?',
        'What has kept you from getting coverage up until now?'
      ]
    },
    {
      type: 'I',
      label: 'Implication',
      color: 'var(--charcoal2)',
      icon: '',
      desc: 'Make the problem bigger. Connect the gap to real financial consequences.',
      questions: [
        'What would happen financially if you ended up in the hospital without coverage?',
        'If you got into an accident tomorrow, what would that cost you out of pocket?',
        'How much would one ER visit set you back right now?',
        'Has not having coverage ever made you hesitate to go to the doctor when you probably should have?',
        'If something happened and you had a $15,000 hospital bill — how would that change your financial situation?'
      ]
    },
    {
      type: 'N',
      label: 'Need-Payoff',
      color: '#29A26A',
      icon: '',
      desc: 'Let them sell themselves. Ask what it would feel like to have this solved.',
      questions: [
        'So having something in place would give you peace of mind?',
        'If you had a plan that covered your doctor visits and gave you telemedicine at no cost — how would that change things?',
        'How important is it to get this handled now rather than waiting?',
        'Would it help to know that if something happened, you had coverage in place?',
        'If we could get you covered starting tomorrow, would that solve the problem you described?'
      ]
    }
  ];

  var html =
    '<div class="ph"><div class="pt">Discovery <span>Questions</span></div>';
  html +=
    '<div class="pd">SPIN-based question bank. Tap any question to copy it. Use Situation first, then Problem, then Implication, then Need-Payoff before presenting.</div></div>';

  html +=
    '<div style="background:rgba(81,117,241,0.04);border:1px solid rgba(220,170,180,0.2);border-radius:12px;padding:14px 16px;margin-bottom:20px;font-size:13px;color:var(--charcoal);line-height:1.6;">';
  html +=
    '<strong style="color:var(--charcoal3);">The SPIN Rule:</strong> Never present before you diagnose. Run at least one Problem and one Implication question before showing any plan. The prospect\'s pain must be real to them — not just to you.';
  html += '</div>';

  categories.forEach(function (cat, ci) {
    var body = '';
    cat.questions.forEach(function (q) {
      body +=
        '<div onclick="copyDiscovery(this)" data-q="' +
        q.replace(/"/g, '&quot;') +
        '" ';
      body +=
        'style="padding:12px 14px;background:#F8F9FE;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:8px;cursor:pointer;font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;transition:all 0.15s;" ';
      body +=
        'onmouseover="this.style.borderColor=\'#5B8DEF\'" onmouseout="this.style.borderColor=\'#E5E7EB\'">';
      body += '\u201c' + q + '\u201d';
      body +=
        '<span style="display:block;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9CA3AF;margin-top:5px;">Tap to copy</span>';
      body += '</div>';
    });
    html += _trnOpenCard(
      cat.type +
        ' — ' +
        cat.label +
        ' (' +
        cat.questions.length +
        ' questions)',
      body
    );
  });

  html +=
    '<div id="discoveryCopied" style="display:none;position:fixed;bottom:30px;right:30px;background:#29A26A;color:#fff;border-radius:12px;padding:12px 20px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Copied to clipboard ✓</div>';

  var _page_discovery = document.getElementById('page-discovery');
  if (_page_discovery) _page_discovery.innerHTML = html;
}

function copyDiscovery(el) {
  var q = el.getAttribute('data-q');
  safeCopy(q);
  var toast = document.getElementById('discoveryCopied');
  if (toast) {
    toast.style.display = 'block';
    setTimeout(function () {
      toast.style.display = 'none';
    }, 2000);
  }
}

// ══════════════════════════════════════════════════════
// RENDER: CLOSING ENGINE
// ══════════════════════════════════════════════════════
function renderClosingengine() {
  var closingLines = {
    Assumptive: [
      '"Let me go ahead and get that started — I just need your date of birth."',
      '"I\'ll get your ID card sent out today. What\'s the best email for you?"',
      '"Perfect — I\'ve got your address. Let me pull up your effective date."',
      '"You\'re going to love having this in place. Let\'s get you activated."'
    ],
    Soft: [
      '"I don\'t want to pressure you — but I do want to make sure you\'re protected. Can we lock this in?"',
      '"A lot of people feel the same way before they enroll and they\'re always glad they did. Should we move forward?"',
      '"There\'s no risk in getting covered today. Want me to walk you through the last step?"'
    ],
    Direct: [
      '"Let\'s get you enrolled today."',
      '"I need your date of birth and we\'re done."',
      '"You\'re approved. Let\'s activate your coverage now."',
      '"This is the right plan for you. Let\'s lock it in."'
    ],
    Urgency: [
      '"Rates are based on your age today — the longer we wait the more it costs."',
      '"I can only hold this rate until end of business today."',
      '"Your effective date is based on when we enroll — every day we wait is a day you\'re unprotected."',
      '"This is the lowest rate you\'ll qualify for. It only goes up from here."'
    ],
    'Tie-Down': [
      '"That makes sense, right?"',
      '"You can see how that would help your family, can\'t you?"',
      '"Having a doctor visit covered for $25 instead of $200 — that\'s a no-brainer, wouldn\'t you say?"',
      '"So you do want to make sure you\'re covered if something happens — correct?"'
    ],
    Agreement: [
      '"You said you wanted something affordable — this fits that. You said you wanted doctor visits covered — this does that. So let\'s get it done."',
      '"We already agreed the price works. We already agreed the coverage makes sense. The only thing left is to activate it."',
      '"You told me you don\'t want to be unprotected. This solves that. Let\'s move forward."',
      '"Everything you said you needed this plan covers. You ready to get started?"'
    ]
  };

  var typeColors = {
    Assumptive: 'var(--charcoal3)',
    Soft: '#29A26A',
    Direct: '#7a5f00',
    Urgency: 'var(--sec)',
    'Tie-Down': '#904020',
    Agreement: '#2A5A90'
  };
  var typeBg = {
    Assumptive: 'rgba(212,96,122,0.1)',
    Soft: 'rgba(41,162,106,0.1)',
    Direct: 'rgba(184,134,11,0.1)',
    Urgency: 'rgba(123,104,184,0.1)',
    'Tie-Down': 'rgba(200,110,60,0.1)',
    Agreement: 'rgba(42,90,144,0.1)'
  };

  var typeNames = Object.keys(closingLines);

  var html =
    '<div class="ph"><div class="pt">Closing <span>Engine</span></div>';
  html +=
    '<div class="pd">Find the right close for your exact situation. Tap a line to copy it.</div></div>';

  // Tab buttons
  html +=
    '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">';
  typeNames.forEach(function (t, ti) {
    var isActive = ti === 0 ? ' ce-tab-active' : '';
    html +=
      '<button class="ce-tab' +
      isActive +
      '" style="background:' +
      (ti === 0 ? typeBg[t] : 'transparent') +
      ';color:' +
      typeColors[t] +
      ';border:1px solid ' +
      (ti === 0 ? typeColors[t] : '#C8CEDD') +
      ';border-radius:12px;padding:7px 16px;font-size:12px;font-weight:800;cursor:pointer;transition:all 0.15s;font-family:var(--font-ui);" onclick="switchCeTab(\'' +
      t +
      '\')" data-ce-type="' +
      t +
      '">' +
      t +
      '</button>';
  });
  html += '</div>';

  // Tab panels
  typeNames.forEach(function (t, ti) {
    var col = typeColors[t] || 'var(--charcoal3)';
    var bg = typeBg[t] || 'rgba(212,96,122,0.1)';
    html +=
      '<div class="ce-panel" id="ce-panel-' +
      t.replace(/[^a-zA-Z]/g, '') +
      '" style="display:' +
      (ti === 0 ? 'block' : 'none') +
      ';">';
    closingLines[t].forEach(function (line) {
      html +=
        '<div onclick="copyClose(this)" data-line="' +
        line.replace(/"/g, '&quot;') +
        '" style="display:flex;align-items:flex-start;gap:10px;padding:12px;background:#F8F9FE;border:1px solid #E5E7EB;border-radius:12px;margin-bottom:8px;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor=\'#5B8DEF\'" onmouseout="this.style.borderColor=\'#E5E7EB\'">';
      html +=
        '<span style="background:' +
        bg +
        ';color:' +
        col +
        ';border-radius:12px;padding:3px 10px;font-size:10px;font-weight:800;white-space:nowrap;flex-shrink:0;">' +
        t +
        '</span>';
      html +=
        '<div style="font-family:var(--font-body);font-size:14px;font-style:italic;color:#374151;line-height:1.8;">' +
        line +
        '</div></div>';
    });
    html += '</div>';
  });

  html +=
    '<div id="closeCopied" style="display:none;position:fixed;bottom:30px;right:30px;background:#29A26A;color:#fff;border-radius:12px;padding:12px 20px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Copied ✓</div>';
  var _page_closingengine = document.getElementById('page-closingengine');
  if (_page_closingengine) _page_closingengine.innerHTML = html;
}

function copyClose(el) {
  var line = el.getAttribute('data-line');
  safeCopy(line);
  var toast = document.getElementById('closeCopied');
  if (toast) {
    toast.style.display = 'block';
    setTimeout(function () {
      toast.style.display = 'none';
    }, 2000);
  }
}

function switchCeTab(type) {
  var typeColors = {
    Assumptive: 'var(--charcoal3)',
    Soft: '#29A26A',
    Direct: '#7a5f00',
    Urgency: 'var(--sec)',
    'Tie-Down': '#904020',
    Agreement: '#2A5A90'
  };
  var typeBg = {
    Assumptive: 'rgba(212,96,122,0.1)',
    Soft: 'rgba(41,162,106,0.1)',
    Direct: 'rgba(184,134,11,0.1)',
    Urgency: 'rgba(123,104,184,0.1)',
    'Tie-Down': 'rgba(200,110,60,0.1)',
    Agreement: 'rgba(42,90,144,0.1)'
  };
  // Hide all panels
  document.querySelectorAll('.ce-panel').forEach(function (p) {
    p.style.display = 'none';
  });
  // Show selected panel
  var panelId = 'ce-panel-' + type.replace(/[^a-zA-Z]/g, '');
  var panel = document.getElementById(panelId);
  if (panel) panel.style.display = 'block';
  // Update tab styles
  document.querySelectorAll('.ce-tab').forEach(function (btn) {
    var t = btn.getAttribute('data-ce-type');
    if (t === type) {
      btn.style.background = typeBg[t] || 'transparent';
      btn.style.borderColor = typeColors[t] || '#C8CEDD';
      btn.classList.add('ce-tab-active');
    } else {
      btn.style.background = 'transparent';
      btn.style.borderColor = '#C8CEDD';
      btn.classList.remove('ce-tab-active');
    }
  });
}

// ══════════════════════════════════════════════════════
// RENDER: CLOSING TOOLS (merged Closing Engine + Closing Lab)
// ══════════════════════════════════════════════════════
function renderClosingtools() {
  var pg = document.getElementById('page-closingtools');
  if (!pg) return;

  // Render Closing Engine into a temp container
  var tempCE = document.createElement('div');
  tempCE.id = 'page-closingengine';
  document.body.appendChild(tempCE);
  renderClosingengine();
  var ceContent = tempCE.innerHTML;
  document.body.removeChild(tempCE);

  // Render Closing Lab into a temp container
  var tempCL = document.createElement('div');
  tempCL.id = 'page-closinglab';
  document.body.appendChild(tempCL);
  renderClosinglab();
  var clContent = tempCL.innerHTML;
  document.body.removeChild(tempCL);

  var html = ceContent;
  html += '<div class="trn-section-divider"></div>';
  html += clContent;
  html +=
    '<div id="closeCopied" style="display:none;position:fixed;bottom:30px;right:30px;background:#29A26A;color:#fff;border-radius:12px;padding:12px 20px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Copied ✓</div>';

  pg.innerHTML = html;
}

// ══════════════════════════════════════════════════════
// CHA ACADEMY — structured learning path (Training tab)
// ══════════════════════════════════════════════════════

function _caB64Encode(str) {
  try {
    return btoa(unescape(encodeURIComponent(String(str))));
  } catch (_e) {
    return '';
  }
}

function chaAcademyCopy(btn) {
  var b = btn.getAttribute('data-b64');
  if (!b) return;
  var t = '';
  try {
    t = decodeURIComponent(escape(atob(b)));
  } catch (_e) {
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(t);
  }
  var orig = btn.getAttribute('data-lbl') || 'Copy';
  btn.textContent = 'Copied';
  var self = btn;
  setTimeout(function () {
    self.textContent = orig;
  }, 1600);
}

function chaAcademySetStep(n, doScroll) {
  var w = document.getElementById('ca-academy-root');
  if (!w) return;
  if (doScroll) {
    var el = w.querySelector('details.ca-level[data-ca-step="' + n + '"]');
    if (el) {
      el.open = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  var st = w.querySelectorAll('.ca-path-step');
  for (var i = 0; i < st.length; i++) {
    st[i].classList.toggle('ca-path-step--on', i + 1 === n);
  }
  w.setAttribute('data-ca-active-step', String(n));
}

function chaAcademyGoStep(n) {
  chaAcademySetStep(n, true);
}

function _caCopyBtn(text) {
  var b = _caB64Encode(text);
  return (
    '<button type="button" class="ca-copy" data-b64="' +
    b +
    '" data-lbl="Copy" onclick="chaAcademyCopy(this)">Copy</button>'
  );
}

/** Progress path + scroll: highlights current level; step buttons jump to section. */
function chaAcademyInitProgress() {
  if (!document.getElementById('ca-academy-root')) return;

  function syncFromScroll() {
    var w2 = document.getElementById('ca-academy-root');
    if (!w2) return;
    var L = w2.querySelectorAll('details.ca-level[data-ca-step]');
    if (!L.length) return;
    var vh = window.innerHeight || 800;
    var targetY = vh * 0.32;
    var pick = 1;
    var best = 1e12;
    for (var j = 0; j < L.length; j++) {
      var r = L[j].getBoundingClientRect();
      var mid = (r.top + r.bottom) / 2;
      if (r.bottom < 120 || r.top > vh - 60) continue;
      var d = Math.abs(mid - targetY);
      if (d < best) {
        best = d;
        pick = parseInt(L[j].getAttribute('data-ca-step'), 10) || pick;
      }
    }
    chaAcademySetStep(pick, false);
  }

  chaAcademySetStep(1, false);
  syncFromScroll();

  if (!window._chaAcademyScrollHooked) {
    window._chaAcademyScrollHooked = true;
    var mc = document.getElementById('main-content');
    if (mc) {
      mc.addEventListener(
        'scroll',
        function () {
          if (!document.getElementById('ca-academy-root')) return;
          syncFromScroll();
        },
        { passive: true }
      );
    }
  }
}

function _caToolboxHtml() {
  var html =
    '<details class="ca-toolbox"><summary class="ca-toolbox-sum">More tools <span class="ca-toolbox-hint">vault, roleplay, closing…</span></summary><div class="ca-toolbox-body">';
  TRAINING_SECTIONS.forEach(function (group) {
    html += '<div class="ca-toolbox-group">' + escHTML(group.group) + '</div>';
    group.items.forEach(function (item) {
      html +=
        '<button type="button" class="ca-toolbox-pill" onclick="openTrainingSection(\'' +
        item.id +
        "')\">" +
        escHTML(item.title) +
        '</button>';
    });
  });
  html += '</div></details>';
  return html;
}

// ══════════════════════════════════════════════════════
// TRAINING HOME PAGE + SECTION VIEW SYSTEM
// ══════════════════════════════════════════════════════

var _trainingView = 'home'; // 'home' or section id
var TRAINING_SEARCH_QUERY = '';
var TRAINING_SEARCH_SCOPE = 'shared';
var LIB_LAST_TAG_KEY = 'cha_lib_last_tag';
var CHA_REQUIRED_DISCLOSURES = [
  'Network - explain how the network works for this plan',
  'Underwriter - state who underwrites the plan',
  'Association - explain the association membership if applicable',
  'Not ACA or major medical - no pregnancy, drug & alcohol, or mental health coverage',
  '12 & 12 Clause - explain the 12 month / 12 visit limitation',
  'Waiting period - verbally confirm the waiting period after client acknowledges DocuSign'
];

function _trnIsVisible(el) {
  return !!(el && el.style && el.style.display !== 'none');
}

function _trnGetScope() {
  if (TRAINING_SEARCH_SCOPE === 'library' || TRAINING_SEARCH_SCOPE === 'onboarding') {
    return 'library';
  }
  var lib = document.getElementById('page-traininghome');
  if (_trnIsVisible(lib)) return 'library';
  return 'shared';
}

function _trnSetStoredTag(scope, value) {
  try {
    localStorage.setItem(LIB_LAST_TAG_KEY, String(value || '').trim().toLowerCase());
  } catch (_e) {
    /* ignore */
  }
}

function _trnGetStoredTag(scope) {
  try {
    return String(localStorage.getItem(LIB_LAST_TAG_KEY) || '').trim();
  } catch (_e) {
    return '';
  }
}

function _trnActiveTagClass(scope, tag) {
  var current = _trnGetStoredTag(scope);
  return current === String(tag || '').trim().toLowerCase() ? ' is-active' : '';
}

function setTrainingSearchQuery(v) {
  TRAINING_SEARCH_QUERY = String(v || '').trim().toLowerCase();
  var lib = document.getElementById('page-traininghome');
  if (_trnIsVisible(lib)) {
    renderTrainingHome();
  }
}

function setTrainingSearchTag(v) {
  var q = String(v || '').trim().toLowerCase();
  var scope = _trnGetScope();
  _trnSetStoredTag(scope, q);
  setTrainingSearchQuery(q);
  var libInput = document.getElementById('caSearchInput');
  if (libInput) libInput.value = q;
}

function clearTrainingSearch() {
  var scope = _trnGetScope();
  _trnSetStoredTag(scope, '');
  setTrainingSearchQuery('');
  var libInput = document.getElementById('caSearchInput');
  if (libInput) libInput.value = '';
}

function clearFocusedTrainingSearch(event) {
  var e = event || window.event;
  var key = e && (e.key || e.code || e.keyCode);
  if (!(key === 'Escape' || key === 'Esc' || key === 27)) return;
  clearTrainingSearch();
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
}

function _caApplySearch() {
  var root = document.getElementById('ca-academy-root');
  if (!root) return;
  var q = TRAINING_SEARCH_QUERY;
  var hits = root.querySelectorAll('.ca-search-hit');
  for (var hi = 0; hi < hits.length; hi++) hits[hi].classList.remove('ca-search-hit');
  if (!q) return;

  var candidates = root.querySelectorAll(
    'details.ca-level, details.ca-nest, .ca-tl-item, .ca-obj-card, .ca-compliance-list li, details.ca-tactics, details.ca-toolbox'
  );
  var firstHit = null;
  for (var ci = 0; ci < candidates.length; ci++) {
    var el = candidates[ci];
    var txt = (el.textContent || '').toLowerCase();
    if (txt.indexOf(q) !== -1) {
      el.classList.add('ca-search-hit');
      var p = el.parentElement;
      while (p) {
        if (p.tagName === 'DETAILS') p.open = true;
        p = p.parentElement;
      }
      if (!firstHit) firstHit = el;
    }
  }
  if (firstHit && typeof firstHit.scrollIntoView === 'function') {
    firstHit.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

var TRAINING_SECTIONS = [
  {
    group: 'LIVE CALL TOOLS',
    items: [
      {
        id: 'closingtools',
        title: 'Closing Tools',
        desc: 'Closing generators, techniques, and practice lab',
        icon: '<circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
        render: renderClosingtools
      },
      {
        id: 'roleplay',
        title: 'Roleplay',
        desc: 'Mock call practice and objection drills',
        icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
        render: renderRoleplay
      }
    ]
  },
  {
    group: 'LEARN & STUDY',
    items: [
      {
        id: 'productvault',
        title: 'Product Training Vault',
        desc: "Know exactly what you're selling and what you're not",
        icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
        render: renderProductvault
      },
      {
        id: 'simplifier',
        title: 'Terms',
        desc: 'Plain-English explanations for any insurance term',
        icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
        render: renderSimplifier
      },
      {
        id: 'discovery',
        title: 'Discovery',
        desc: 'Questioning frameworks that uncover real pain',
        icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
        render: renderDiscovery
      }
    ]
  }
];

function renderTrainingHome() {
  var pg = document.getElementById('page-traininghome');
  if (!pg) return;

  _trainingView = 'home';
  TRAINING_SEARCH_SCOPE = 'library';
  if (!TRAINING_SEARCH_QUERY) {
    TRAINING_SEARCH_QUERY = _trnGetStoredTag('library');
  }

  if (pg.querySelector('#academyContainer')) {
    if (typeof initAcademy === 'function') initAcademy();
    return;
  }

  var html =
    '<div class="ca-wrap" id="ca-academy-root" data-ca-active-step="1">';

  html +=
    '<div class="ph ca-hero"><div class="pt">CHA <span>Academy</span></div><div class="pd">Structured learning path for new hires. Work Step 1 → 4 in order.</div></div>';
  html +=
    '<div class="ca-search-row"><div class="ca-search-input-wrap"><input id="caSearchInput" class="ca-search-input" type="text" placeholder="Search library: compliance, pre-ex, objection..." value="' +
    escHTML(TRAINING_SEARCH_QUERY) +
    '" oninput="setTrainingSearchQuery(this.value)" onkeydown="clearFocusedTrainingSearch(event)" /><button type="button" class="ca-search-clear" onclick="clearTrainingSearch()" aria-label="Clear library search">Clear</button></div><div class="ca-search-tags"><button type="button" class="ca-search-tag' +
    _trnActiveTagClass('library', 'compliance') +
    '" onclick="setTrainingSearchTag(\'compliance\')">Compliance</button><button type="button" class="ca-search-tag' +
    _trnActiveTagClass('library', 'script') +
    '" onclick="setTrainingSearchTag(\'script\')">Script</button><button type="button" class="ca-search-tag' +
    _trnActiveTagClass('library', 'objection') +
    '" onclick="setTrainingSearchTag(\'objection\')">Objection</button><button type="button" class="ca-search-tag' +
    _trnActiveTagClass('library', 'pre-existing') +
    '" onclick="setTrainingSearchTag(\'pre-existing\')">Pre-Ex</button></div></div>';

  html +=
    '<nav class="ca-path" aria-label="Learning path: four levels"><div class="ca-path-meter" aria-hidden="true"><div class="ca-path-meter-fill"></div></div><div class="ca-path-row">';
  html +=
    '<button type="button" class="ca-path-step ca-path-step--on" data-step="1" onclick="chaAcademyGoStep(1)"><span class="ca-path-step-n">1</span><span class="ca-path-step-l">Foundations</span></button>';
  html += '<span class="ca-path-join" aria-hidden="true">→</span>';
  html +=
    '<button type="button" class="ca-path-step" data-step="2" onclick="chaAcademyGoStep(2)"><span class="ca-path-step-n">2</span><span class="ca-path-step-l">Call Flow</span></button>';
  html += '<span class="ca-path-join" aria-hidden="true">→</span>';
  html +=
    '<button type="button" class="ca-path-step" data-step="3" onclick="chaAcademyGoStep(3)"><span class="ca-path-step-n">3</span><span class="ca-path-step-l">Objections</span></button>';
  html += '<span class="ca-path-join" aria-hidden="true">→</span>';
  html +=
    '<button type="button" class="ca-path-step" data-step="4" onclick="chaAcademyGoStep(4)"><span class="ca-path-step-n">4</span><span class="ca-path-step-l">Compliance</span></button>';
  html += '</div></nav>';

  function caBrain(title, body, why) {
    return (
      '<details class="ca-nest"><summary class="ca-nest-sum">' +
      escHTML(title) +
      '</summary><div class="ca-nest-body"><p class="ca-nest-line">' +
      escHTML(body) +
      '</p><div class="ca-why"><span class="ca-why-lbl">Why it matters:</span> ' +
      escHTML(why) +
      '</div><div class="ca-nest-actions">' +
      _caCopyBtn(body + ' ' + why) +
      '</div></div></details>'
    );
  }

  // —— Level 1 ——
  html +=
    '<details class="ca-level" data-ca-step="1" open><summary class="ca-level-sum"><span class="ca-level-badge">1</span><span class="ca-level-titles"><span class="ca-level-name">Level 1: Insurance Foundations</span><span class="ca-level-tag">Learn the basics before you dial</span></span></summary><div class="ca-level-body">';

  html += caBrain(
    'Premium',
    'Your monthly payment to keep coverage active',
    'This is what customers compare first'
  );
  html += caBrain(
    'Deductible',
    'Amount customer pays first before plan kicks in',
    "MEC and Indemnity have NO deductible - that's our advantage"
  );
  html += caBrain(
    'Copay',
    'Fixed fee for a visit (like $25 for doctor)',
    'Simple and predictable for customers'
  );
  html += caBrain(
    'Coinsurance',
    'Percentage split after deductible (like 80/20)',
    "STM plans use this, MEC/Indemnity don't"
  );
  html += caBrain(
    'Network',
    'List of doctors/hospitals with contracted rates',
    'First Health and MultiPlan are our networks'
  );

  var planMec =
    'No deductible, copays for doctors, preventative care, indemnity benefits for hospital';
  var planStm =
    'Short-term, has deductible + coinsurance + max out of pocket, works like Obamacare but cheaper';
  var planInd =
    'No deductible, 2-sided: network repricing first, then pays cash benefits toward remaining balance';
  html +=
    '<details class="ca-nest"><summary class="ca-nest-sum">Plan Types (MEC vs STM vs Indemnity)</summary><div class="ca-nest-body">' +
    '<div class="ca-plan-row"><span class="ca-plan-lbl">MEC:</span> <span class="ca-plan-txt">' +
    escHTML(planMec) +
    '</span></div>' +
    '<div class="ca-plan-row"><span class="ca-plan-lbl">STM:</span> <span class="ca-plan-txt">' +
    escHTML(planStm) +
    '</span></div>' +
    '<div class="ca-plan-row"><span class="ca-plan-lbl">Indemnity:</span> <span class="ca-plan-txt">' +
    escHTML(planInd) +
    '</span></div><div class="ca-nest-actions">' +
    _caCopyBtn('MEC: ' + planMec + ' STM: ' + planStm + ' Indemnity: ' + planInd) +
    '</div></div></details>';

  html += '</div></details>';

  // —— Level 2 ——
  html +=
    '<details class="ca-level" data-ca-step="2"><summary class="ca-level-sum"><span class="ca-level-badge">2</span><span class="ca-level-titles"><span class="ca-level-name">Level 2: The Sales Call</span><span class="ca-level-tag">Master each stage in order</span></span></summary><div class="ca-level-body ca-timeline">';

  var tieScript =
    "Is there a monthly price range you're hoping to stay within so I can narrow down the best options?";
  var stages2 = [
    {
      n: 1,
      t: 'Opening',
      b:
        "Use breaking rapport tonality (down tone). Sound happy. Slow steady pace. Assume it's the customer.",
      k: "Don't rush - people listen more when you're not desperate",
      s: ''
    },
    {
      n: 2,
      t: 'Prequalify',
      b:
        'Conversational 50/50. Gather eligibility info + listen for buying points + medical info',
      k: 'After this section, switch to 90% talking 10% listening',
      s: ''
    },
    {
      n: 3,
      t: 'Tie-Down Price',
      b:
        'Get their budget BEFORE you pitch. Ask income questions like marketplace does.',
      k: 'You should know what plan to sell BEFORE the hold',
      s: tieScript
    },
    {
      n: 4,
      t: 'Hold',
      b: 'Max 2 minutes. Build urgency. Get organized.',
      k: 'DO NOT leave them on hold longer than 2 minutes',
      s: ''
    },
    {
      n: 5,
      t: 'Teaser',
      b:
        "Come back with higher energy. Steady pace so they can't interrupt.",
      k: "DO NOT ask if they're still there - assume they are",
      s: ''
    },
    {
      n: 6,
      t: 'Benefits',
      b: "Read VERBATIM. 90% talking. Don't acknowledge 'oh that's great' comments.",
      k: 'LESS IS MORE. Do not add things to the script.',
      s: ''
    },
    {
      n: 7,
      t: 'Close',
      b: 'Assumptive close. Use close-ended questions (2 options that both work for us)',
      k: 'Whoever talks first loses - wait for their answer',
      s: ''
    },
    {
      n: 8,
      t: 'Post-Close',
      b: 'Read verification. Get signature. Read post-close to make sales stick.',
      k: 'Give them CHA561337 confirmation + 855-736-1590 customer service',
      s: ''
    }
  ];
  for (var si = 0; si < stages2.length; si++) {
    var st = stages2[si];
    html +=
      '<div class="ca-tl-item"><div class="ca-tl-dot">' +
      st.n +
      '</div><div class="ca-tl-card"><div class="ca-tl-kicker">Stage ' +
      st.n +
      '</div><div class="ca-tl-title">' +
      escHTML(st.t) +
      '</div><p class="ca-tl-body">' +
      escHTML(st.b) +
      '</p><div class="ca-tl-key"><span class="ca-tl-key-lbl">Key</span><p>' +
      escHTML(st.k) +
      '</p></div>';
    if (st.s) {
      html +=
        '<div class="ca-tl-script"><span class="ca-tl-script-lbl">Script line</span><p>' +
        escHTML(st.s) +
        '</p><div class="ca-tl-actions">' +
        _caCopyBtn(st.s) +
        '</div></div>';
    }
    html +=
      '<div class="ca-tl-actions">' +
      _caCopyBtn(st.b + ' ' + st.k + (st.s ? ' ' + st.s : '')) +
      '</div></div></div>';
  }
  html +=
    '<div class="ca-tl-actions ca-tl-actions--block">' +
    _caCopyBtn('CHA561337') +
    _caCopyBtn('855-736-1590') +
    '</div>';
  html += '</div></details>';

  // —— Level 3 ——
  html +=
    '<details class="ca-level" data-ca-step="3"><summary class="ca-level-sum"><span class="ca-level-badge">3</span><span class="ca-level-titles"><span class="ca-level-name">Level 3: Battle Cards</span><span class="ca-level-tag">Practice the hardest moments</span></span></summary><div class="ca-level-body">';

  var thinkScript =
    "I understand you need to think about it but right now there is nothing to really think about yet because we didn't go over how the plan works, and secondly, we don't even know if you are approved yet, so what I normally do is...";

  var objs = [
    {
      tag: 'PRICE',
      obj: "It's too expensive",
      a: 'Acknowledge: “I hear you — nobody wants to pay a dollar more than they have to.”',
      r: 'Respond: “Let’s anchor what you’re comparing: fixed dollars per month versus one ER visit without coverage.”',
      c: 'Continue: “If the premium fits the budget you gave me, does locking today beat risking another month bare?”',
      mode: 'arc'
    },
    {
      tag: 'DELAY',
      obj: 'I need to think about it',
      ex: thinkScript,
      mode: 'think'
    },
    {
      tag: 'SPOUSE',
      obj: 'I need to talk to my spouse',
      a: 'Acknowledge: “Makes sense — they should be in the loop.”',
      r: 'Respond: “What would they ask that I can answer for both of you in two minutes?”',
      c: 'Continue: “When are you both free for a three-way so we don’t lose the rate window?”',
      mode: 'arc'
    },
    {
      tag: 'DELAY',
      obj: 'Send me the information',
      a: 'Acknowledge: “Happy to get you something in writing.”',
      r: 'Respond: “These plans read wrong on paper without context — two minutes on the phone saves the back-and-forth.”',
      c: 'Continue: “What outcome do you need the paperwork to prove — budget, network, or waiting period?”',
      mode: 'arc'
    },
    {
      tag: 'TRUST',
      obj: "I don't trust this",
      a: 'Acknowledge: “Fair — there are a lot of voices in health coverage.”',
      r: 'Respond: “You’re enrolling with the carrier; we’re Central Health Advisors on the front end. You’ll get confirmation numbers and carrier materials.”',
      c: 'Continue: “What would you need to see on the enrollment confirmation to feel solid moving forward?”',
      mode: 'arc'
    }
  ];
  for (var oi = 0; oi < objs.length; oi++) {
    var o = objs[oi];
    html +=
      '<div class="ca-obj-card"><div class="ca-obj-head"><span class="ca-obj-pill">' +
      escHTML(o.tag) +
      '</span></div><p class="ca-obj-line ca-obj-obj">' +
      escHTML(o.obj) +
      '</p>';
    if (o.mode === 'think') {
      html +=
        '<p class="ca-arc-intro">Acknowledge → Respond → Continue</p><div class="ca-think-script"><p>' +
        escHTML(o.ex) +
        '</p><div class="ca-obj-footer">' +
        _caCopyBtn(o.ex) +
        '<span class="ca-obj-foot-hint">Example script</span></div></div></div>';
      continue;
    }
    var arcFull = o.obj + ' ' + o.a + ' ' + o.r + ' ' + o.c;
    html +=
      '<div class="ca-arc"><p class="ca-arc-intro">Acknowledge → Respond → Continue</p>' +
      '<div class="ca-arc-row"><span class="ca-arc-lbl">A</span><div class="ca-arc-main"><p>' +
      escHTML(o.a) +
      '</p></div>' +
      _caCopyBtn(o.a) +
      '</div><div class="ca-arc-row"><span class="ca-arc-lbl">R</span><div class="ca-arc-main"><p>' +
      escHTML(o.r) +
      '</p></div>' +
      _caCopyBtn(o.r) +
      '</div><div class="ca-arc-row"><span class="ca-arc-lbl">C</span><div class="ca-arc-main"><p>' +
      escHTML(o.c) +
      '</p></div>' +
      _caCopyBtn(o.c) +
      '</div></div><div class="ca-obj-footer">' +
      _caCopyBtn(arcFull) +
      '<span class="ca-obj-foot-hint">Full ARC</span></div></div>';
  }
  html += '</div></details>';

  // —— Level 4 ——
  html +=
    '<details class="ca-level" data-ca-step="4"><summary class="ca-level-sum"><span class="ca-level-badge">4</span><span class="ca-level-titles"><span class="ca-level-name">Level 4: Compliance Shield</span><span class="ca-level-tag">What you CANNOT mess up</span></span></summary><div class="ca-level-body">';

  var must = CHA_REQUIRED_DISCLOSURES.slice();
  var never = [
    { show: '\u274c "Just like marketplace"', copy: '"Just like marketplace"' },
    { show: '\u274c "Covers everything"', copy: '"Covers everything"' },
    { show: '\u274c "No pre-existing issues"', copy: '"No pre-existing issues"' },
    {
      show: '\u274c "Same as BCBS/major medical"',
      copy: '"Same as BCBS/major medical"'
    }
  ];
  var sayInstead = [
    { show: '\u2705 "This is a limited benefit plan"', copy: '"This is a limited benefit plan"' },
    { show: '\u2705 "Designed for healthy people"', copy: '"Designed for healthy people"' },
    {
      show: '\u2705 "Built for unexpected emergencies"',
      copy: '"Built for unexpected emergencies"'
    }
  ];

  html += '<div class="ca-compliance-block ca-compliance--must">';
  html += '<div class="ca-compliance-hd">MUST DISCLOSE</div><ul class="ca-compliance-list">';
  for (var mi = 0; mi < must.length; mi++) {
    html +=
      '<li><span class="ca-li-txt">' +
      escHTML(must[mi]) +
      '</span>' +
      _caCopyBtn(must[mi]) +
      '</li>';
  }
  html += '</ul></div>';

  html += '<div class="ca-compliance-block ca-compliance--never">';
  html += '<div class="ca-compliance-hd">NEVER SAY</div><ul class="ca-compliance-list">';
  for (var ni = 0; ni < never.length; ni++) {
    html +=
      '<li><span class="ca-li-txt ca-li-never">' +
      escHTML(never[ni].show) +
      '</span>' +
      _caCopyBtn('Never say: ' + never[ni].copy) +
      '</li>';
  }
  html += '</ul></div>';

  html += '<div class="ca-compliance-block ca-compliance--say">';
  html += '<div class="ca-compliance-hd">SAY INSTEAD</div><ul class="ca-compliance-list">';
  for (var si2 = 0; si2 < sayInstead.length; si2++) {
    html +=
      '<li><span class="ca-li-txt ca-li-good">' +
      escHTML(sayInstead[si2].show) +
      '</span>' +
      _caCopyBtn(sayInstead[si2].copy) +
      '</li>';
  }
  html += '</ul></div>';

  html += '</div></details>';

  // —— Sales tactics (collapsed) ——
  html +=
    '<details class="ca-tactics"><summary class="ca-tactics-sum">SALES TACTICS QUICK REFERENCE</summary><div class="ca-tactics-body">';
  html +=
    '<div class="ca-tac-block"><div class="ca-tac-hd">ARC Method</div><ul class="ca-tac-list">' +
    '<li><span class="ca-li-txt">A = Acknowledge what they said</span>' +
    _caCopyBtn('A = Acknowledge what they said') +
    '</li>' +
    '<li><span class="ca-li-txt">R = Respond to redirect back to pitch</span>' +
    _caCopyBtn('R = Respond to redirect back to pitch') +
    '</li>' +
    '<li><span class="ca-li-txt">C = Continue with script</span>' +
    _caCopyBtn('C = Continue with script') +
    '</li></ul></div>';
  html +=
    '<div class="ca-tac-block"><div class="ca-tac-hd">DON\'T DO</div><ul class="ca-tac-list">' +
    '<li><span class="ca-li-txt">Don\'t say "um" or "uh"</span>' +
    _caCopyBtn('Don\'t say "um" or "uh"') +
    '</li>' +
    '<li><span class="ca-li-txt">Don\'t say "basically" or "actually"</span>' +
    _caCopyBtn('Don\'t say "basically" or "actually"') +
    '</li>' +
    '<li><span class="ca-li-txt">Don\'t say "honestly" or "to be honest"</span>' +
    _caCopyBtn('Don\'t say "honestly" or "to be honest"') +
    '</li>' +
    '<li><span class="ca-li-txt">Don\'t add things to the script</span>' +
    _caCopyBtn('Don\'t add things to the script') +
    '</li>' +
    '<li><span class="ca-li-txt">Don\'t overtalk - LESS IS MORE</span>' +
    _caCopyBtn('Don\'t overtalk - LESS IS MORE') +
    '</li></ul></div>';
  html += '</div></details>';

  html += _caToolboxHtml();
  html += '</div>';

  pg.innerHTML = html;
  chaAcademyInitProgress();
  _caApplySearch();
}

function openTrainingSection(id) {
  _trainingView = id;
  _renderTrainingSection(id);
}

function backToTrainingHome() {
  _trainingView = 'home';
  renderTrainingHome();
}

function _renderTrainingSection(sectionId) {
  var pg = document.getElementById('page-traininghome');
  if (!pg) return;

  // Find the section config
  var sectionConfig = null;
  TRAINING_SECTIONS.forEach(function (group) {
    group.items.forEach(function (item) {
      if (item.id === sectionId) sectionConfig = item;
    });
  });
  if (!sectionConfig) return;

  // Build page with back button + container for the section render + bottom pill strip
  pg.innerHTML =
    '<button class="trn-back-btn" onclick="backToTrainingHome()">&larr; CHA Academy</button><div id="page-' +
    sectionId +
    '"></div>' +
    _trnBottomStrip(sectionId);

  // Now call the original render function — the target container exists in the DOM
  sectionConfig.render();
}

function _trnBottomStrip(activeId) {
  var allItems = [];
  TRAINING_SECTIONS.forEach(function (group) {
    group.items.forEach(function (item) {
      allItems.push(item);
    });
  });
  var html =
    '<div style="position:sticky;bottom:0;background:#FFFFFF;border-top:2px solid #E5E7EB;padding:10px 20px;display:flex;flex-wrap:wrap;gap:8px;z-index:50;margin-top:24px;">';
  allItems.forEach(function (item) {
    var isActive = item.id === activeId;
    var bg = isActive ? '#5B8DEF' : '#F4F6FB';
    var color = isActive ? '#FFFFFF' : '#374151';
    var border = isActive ? '1.5px solid #5B8DEF' : '1.5px solid #E5E7EB';
    html +=
      '<button onclick="openTrainingSection(\'' +
      item.id +
      '\')" style="background:' +
      bg +
      ';color:' +
      color +
      ';border:' +
      border +
      ';border-radius:999px;padding:6px 16px;font-family:var(--font-ui);font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.15s;">' +
      item.title +
      '</button>';
  });
  html += '</div>';
  return html;
}

// ══════════════════════════════════════════════════════
// REWRITE RENDER FUNCTIONS — COLLAPSED CARDS, PLAN VAULT STYLE
// ══════════════════════════════════════════════════════

// Toggle for training section cards
function toggleTrnCard(id) {
  var body = document.getElementById(id + '-body');
  var chev = document.getElementById(id + '-chev');
  if (!body) return;
  var isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.style.transform = isOpen ? '' : 'rotate(180deg)';
}

// Helper: wrap content in a collapsed card
function _trnCard(id, title, bodyHtml) {
  var html = '<div class="trn-card">';
  html += '<div class="trn-card-hd" onclick="toggleTrnCard(\'' + id + '\')">';
  html += '<div class="trn-card-title">' + title + '</div>';
  html +=
    '<span class="trn-card-chev" id="' +
    id +
    '-chev" aria-hidden="true">&#9660;</span>';
  html += '</div>';
  html +=
    '<div class="trn-card-body" id="' + id + '-body" style="display:none;">';
  html += bodyHtml;
  html += '</div></div>';
  return html;
}

// Helper: wrap content in an always-open card (no collapse)
function _trnOpenCard(title, bodyHtml) {
  var html = '<div class="trn-card">';
  html += '<div class="trn-card-hd trn-card-hd-static">';
  html += '<div class="trn-card-title">' + title + '</div>';
  html += '</div>';
  html += '<div class="trn-card-body" style="display:block;">';
  html += bodyHtml;
  html += '</div></div>';
  return html;
}

// Helper: two column green/red box
function _trnTwoCols(leftLabel, leftText, rightLabel, rightText) {
  var html = '<div class="trn-two-col">';
  html +=
    '<div class="trn-col-green"><div class="trn-col-label" style="color:#15803D;">' +
    leftLabel +
    '</div><div class="trn-col-text">' +
    leftText +
    '</div></div>';
  html +=
    '<div class="trn-col-red"><div class="trn-col-label" style="color:#B91C1C;">' +
    rightLabel +
    '</div><div class="trn-col-text">' +
    rightText +
    '</div></div>';
  html += '</div>';
  return html;
}

/* ===== ACADEMY REDESIGN ===== */
var academyProgress = {};
var academyViewLesson = {};
var academyViewLessonAgent = null;
var svgIcons = {
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>',
  lock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
  target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  chat: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  checkCircle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
  rocket: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>',
  doc: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>',
  copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  alert: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  dollar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
  card: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
  shield: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>'
};
var planReferenceData = {
  'smartchoice': {name:'SmartChoice',network:'First Health EPO',underwriter:'Detego Health',association:'Population Science Management',providerSearch:'providerlocator.firsthealth.com',type:'MEC'},
  'tdk': {name:'TDK 1-5',network:'First Health Network',underwriter:'Detego Health',association:'Health Care Data Analytics',providerSearch:'providerlocator.firsthealth.com',type:'MEC'},
  'goodhealth': {name:'GoodHealth 1-5',network:'First Health Network',underwriter:'',claimsAdmin:'Merchants Benefit Administrators (MBA)',association:'Good Health Distribution Partners',providerSearch:'providerlocator.firsthealth.com',type:'MEC'},
  'harmonycare': {name:'Harmony Care / Sigma Care',network:'First Health Network',underwriter:'American Financial Security Life Insurance Company (AFSLIC)',association:'National Congress of Employers (NCE)',providerSearch:'providerlocator.firsthealth.com',type:'Indemnity'},
  'medfirst': {name:'MedFirst 1-5 / TrueHealth 1-5',network:'First Health Network',underwriter:'',claimsAdmin:'Merchants Benefit Administrators (MBA)',association:'VP Limited Partnership / The Vitamin Patch (TVP)',providerSearch:'providerlocator.firsthealth.com',type:'MEC'},
  'pinnacle-stm': {name:'Pinnacle STM Traditional',network:'PHCS',underwriter:'Everest Reinsurance Company',association:'AWA (American Workers Association)',providerSearch:'providersearch.multiplan.com',type:'STM'},
  'pinnacle-protect': {name:'Pinnacle Protect Plan 1-4',network:'PHCS',underwriter:'Everest Reinsurance Company',association:'AWA (American Workers Association)',providerSearch:'providersearch.multiplan.com',type:'Indemnity'},
  'access-health': {name:'Access Health Traditional STM',network:'PHCS',underwriter:'AFSLIC (American Financial Security Life Insurance Company)',association:'NCE (National Congress of Employers)',providerSearch:'providersearch.multiplan.com',type:'STM'},
  'smart-health': {name:'Smart Health STM (Traditional)',network:'PHCS',underwriter:'SLACIC (Standard Life and Casualty Insurance Company)',association:'NCE (National Congress of Employers)',providerSearch:'providersearch.multiplan.com',type:'STM'},
  'bwa-americare': {name:'BWA Americare 2-4',network:'PHCS',underwriter:'American Public Life (APL)',association:'Business Workers of America (BWA)',providerSearch:'providersearch.multiplan.com',type:'Indemnity'},
  'galena': {name:'AFRP Galena STM Elite',network:'MultiPlan',underwriter:'SGIC (Southern Guarantee Insurance Company)',association:'Association for Responsible Planners',providerSearch:'providersearch.multiplan.com',type:'STM'},
  'everest': {name:'Everest Summit Plans',network:'MultiPlan',underwriter:'Everest Reinsurance Company',association:'National Congress of Employers',providerSearch:'providersearch.multiplan.com',type:'Indemnity'},
  'healthchoice': {name:'HealthChoice Silver',network:'MultiPlan',underwriter:'American Financial Security Life Insurance Company (AFSLIC)',association:'National Congress of Employers (NCE)',providerSearch:'providersearch.multiplan.com',type:'Indemnity'},
  'bwa-paramount': {name:'BWA Paramount Plans',network:'Managed Care',underwriter:'BCS Insurance Company',association:'Business Workers of America',providerSearch:'',type:'Indemnity'}
};
var dayConfig = [
  {num:1,title:'Basics',desc:'What we sell',icon:'book'},
  {num:2,title:'Pre-Qual',desc:'Opening scripts',icon:'target'},
  {num:3,title:'The Pitch',desc:'Present plans',icon:'chat'},
  {num:4,title:'Close',desc:'Seal the deal',icon:'checkCircle'},
  {num:5,title:'Go Live',desc:'First real call',icon:'rocket'}
];
function academyDayToneTip(dayNum) {
  var tips = [
    'Pause after asking a question — let them fill the silence.',
    'Your tone sets the trust level before your words do. Sound curious, not scripted.',
    'Slow down on pricing — rushing it kills deals. End every sentence like you expect a yes.',
    'A relaxed voice is more persuasive than a loud one. Mirror their pace, then gradually slow it down.',
    'You have earned the close — own it with your tone. Silence after presenting price is your best tool. Sound certain.'
  ];
  var i = dayNum - 1;
  if (i < 0 || i >= tips.length) return '';
  return (
    '<div class="academy-tone-tip"><strong>Tone & Energy</strong><p>' +
    tips[i] +
    '</p></div>'
  );
}
function academyGetViewLesson(dayNum, lessons) {
  var key = 'd' + dayNum;
  var fi = lessons.findIndex(function (l) {
    return !l;
  });
  var allDone = fi === -1;
  var defaultV = allDone ? 4 : fi;
  if (academyViewLesson[key] === undefined || academyViewLesson[key] === null) {
    return defaultV;
  }
  var v = academyViewLesson[key];
  if (typeof v !== 'number' || v < 0 || v > 4) return defaultV;
  if (!allDone && v === 4) return fi >= 0 ? fi : 0;
  return v;
}
function academySelectLesson(dayNum, lessonIndex) {
  academyViewLesson['d' + dayNum] = lessonIndex;
  loadDayContent(dayNum);
}
function initAcademy(){var agentId=localStorage.getItem('visibleAgentId')||'default';if(academyViewLessonAgent!==null&&academyViewLessonAgent!==agentId){academyViewLesson={};}academyViewLessonAgent=agentId;var saved=localStorage.getItem('academyProgress_'+agentId);if(saved){academyProgress=JSON.parse(saved);}else{academyProgress={};for(var i=1;i<=5;i++){academyProgress['day'+i]={lessons:[false,false,false,false],complete:false};}}renderDayCards();updateAcademyUI();initBenefitsPanel();}
function renderDayCards(){var grid=document.getElementById('daysGrid');if(!grid)return;var html='';for(var i=0;i<dayConfig.length;i++){var d=dayConfig[i];html+='<div class="day-card" data-day="'+d.num+'" onclick="selectDay('+d.num+')"><div class="day-icon-circle blue" id="dayIcon'+d.num+'">'+d.num+'</div><h3>'+d.title+'</h3><p class="day-desc">Day '+d.num+'</p><div class="day-progress"><div class="day-progress-bar" id="day'+d.num+'Progress"></div></div><span class="day-status" id="day'+d.num+'Status">Not started</span></div>';}grid.innerHTML=html;}
function saveAcademyProgress(){var agentId=localStorage.getItem('visibleAgentId')||'default';localStorage.setItem('academyProgress_'+agentId,JSON.stringify(academyProgress));}
function updateAcademyUI(){var totalLessons=20;var completedLessons=0;for(var d=1;d<=5;d++){var dayData=academyProgress['day'+d];var dayCompleted=dayData.lessons.filter(function(l){return l;}).length;completedLessons+=dayCompleted;var dayPercent=(dayCompleted/4)*100;var progressBar=document.getElementById('day'+d+'Progress');var statusEl=document.getElementById('day'+d+'Status');var dayCard=document.querySelector('.day-card[data-day="'+d+'"]');var iconEl=document.getElementById('dayIcon'+d);if(progressBar)progressBar.style.width=dayPercent+'%';if(dayData.complete){if(statusEl)statusEl.textContent='Complete';if(dayCard){dayCard.classList.add('completed');dayCard.classList.remove('locked');}if(iconEl){iconEl.classList.remove('blue','gray');iconEl.classList.add('green');iconEl.innerHTML=svgIcons.check;}}else{if(statusEl)statusEl.textContent=dayPercent>0?'In progress':'Not started';if(dayCard)dayCard.classList.remove('locked');if(iconEl){iconEl.classList.remove('gray','green');iconEl.classList.add('blue');iconEl.innerHTML=d;}}}var overallPercent=Math.round((completedLessons/totalLessons)*100);var percentEl=document.getElementById('academyProgressPercent');var ringEl=document.getElementById('academyProgressRing');if(percentEl)percentEl.textContent=overallPercent+'%';if(ringEl){var circumference=264;var offset=circumference-(overallPercent/100)*circumference;ringEl.style.strokeDashoffset=offset;}}
function selectDay(dayNum){document.querySelectorAll('.day-card').forEach(function(card){card.classList.remove('active');});document.querySelector('.day-card[data-day="'+dayNum+'"]').classList.add('active');document.querySelectorAll('.day-content').forEach(function(content){content.classList.remove('active');});document.getElementById('day'+dayNum+'Content').classList.add('active');loadDayContent(dayNum);}
function loadDayContent(dayNum){var container=document.getElementById('day'+dayNum+'Content');if(!container)return;var dayData=academyProgress['day'+dayNum];if(dayNum===1)container.innerHTML=generateDay1Content(dayData);else if(dayNum===2)container.innerHTML=generateDay2Content(dayData);else if(dayNum===3)container.innerHTML=generateDay3Content(dayData);else if(dayNum===4)container.innerHTML=generateDay4Content(dayData);else if(dayNum===5)container.innerHTML=generateDay5Content(dayData);}
function generateLessonCard(day,lessonIndex,title,desc,time,isComplete,isSelected,isUpNext){var status=isComplete?'completed':(isSelected?'current':'available');var checkContent=isComplete?svgIcons.check:(lessonIndex+1);var tag=isComplete?'Complete':(isUpNext?'Up Next':'Lesson '+(lessonIndex+1));var html='<div class="lesson-card '+status+'" role="button" tabindex="0" onclick="academySelectLesson('+day+','+lessonIndex+')" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();academySelectLesson('+day+','+lessonIndex+');}">';html+='<div class="lesson-check">'+checkContent+'</div>';html+='<div class="lesson-info"><div class="lesson-tag">'+tag+'</div><h4>'+title+'</h4><p>'+desc+'</p></div>';html+='<span class="lesson-time">'+time+'</span>';if(isSelected)html+='<button type="button" class="lesson-action" onclick="event.stopPropagation();academySelectLesson('+day+','+lessonIndex+')">'+(isComplete?'Review':'Start')+'</button>';html+='</div>';return html;}
function completeLesson(dayNum,lessonNum){academyProgress['day'+dayNum].lessons[lessonNum]=true;var allComplete=academyProgress['day'+dayNum].lessons.every(function(l){return l;});if(allComplete){academyProgress['day'+dayNum].complete=true;showConfetti();}var lessonsAfter=academyProgress['day'+dayNum].lessons;var nextFi=lessonsAfter.findIndex(function(l){return !l;});if(nextFi===-1){academyViewLesson['d'+dayNum]=4;}else{academyViewLesson['d'+dayNum]=nextFi;}saveAcademyProgress();updateAcademyUI();loadDayContent(dayNum);}
function copyScript(scriptId){var scriptEl=document.getElementById(scriptId);if(!scriptEl)return;var text=scriptEl.innerText||scriptEl.textContent;navigator.clipboard.writeText(text).then(function(){var btn=document.querySelector('[data-copy="'+scriptId+'"]');if(btn){btn.innerHTML=svgIcons.check+' Copied';btn.style.background='#34C759';setTimeout(function(){btn.innerHTML=svgIcons.copy+' Copy';btn.style.background='#4A90D9';},2000);}});}
function hideAllDayContent(){document.querySelectorAll('.day-content').forEach(function(el){el.classList.remove('active');});document.querySelectorAll('.day-card').forEach(function(card){card.classList.remove('active');});}
if (typeof window !== 'undefined') {
  window.academySelectLesson = academySelectLesson;
  window.selectDay = selectDay;
  window.completeLesson = completeLesson;
  window.copyScript = copyScript;
  window.hideAllDayContent = hideAllDayContent;
}
function showConfetti(){var colors=['#4A90D9','#34C759','#8B5CF6','#F59E0B','#EF4444'];for(var i=0;i<50;i++){var piece=document.createElement('div');piece.className='confetti-piece';piece.style.left=Math.random()*100+'vw';piece.style.background=colors[Math.floor(Math.random()*colors.length)];piece.style.animationDelay=Math.random()*0.5+'s';piece.style.animationDuration=(2+Math.random()*2)+'s';piece.style.borderRadius=Math.random()>0.5?'50%':'0';document.body.appendChild(piece);setTimeout(function(){piece.remove();},4000);}}
function generateDay1Content(dayData){var lessons=dayData.lessons;var firstIncomplete=lessons.findIndex(function(l){return !l;});var viewLesson=academyGetViewLesson(1,lessons);var html='<button class="back-btn" onclick="hideAllDayContent()">'+svgIcons.x+' Back to all days</button>';html+='<div class="day-header"><div class="day-header-icon">'+svgIcons.book+'</div><div><h2>Day 1: Insurance Basics</h2><p>4 quick lessons to build your foundation</p></div></div>';html+=academyDayToneTip(1);html+='<div class="lessons-list">';html+=generateLessonCard(1,0,'What We Sell','The 3 plan types and who they help','3 min',lessons[0],viewLesson===0,firstIncomplete===0&&!lessons[0]);html+=generateLessonCard(1,1,'Key Terms','7 words you will use every call','5 min',lessons[1],viewLesson===1,firstIncomplete===1&&!lessons[1]);html+=generateLessonCard(1,2,'ACA vs Private','Know the difference','4 min',lessons[2],viewLesson===2,firstIncomplete===2&&!lessons[2]);html+=generateLessonCard(1,3,'Required Disclosures','What you MUST say','3 min',lessons[3],viewLesson===3,firstIncomplete===3&&!lessons[3]);html+='</div>';if(viewLesson===0)html+=generateLesson1_1();else if(viewLesson===1)html+=generateLesson1_2();else if(viewLesson===2)html+=generateLesson1_3();else if(viewLesson===3)html+=generateLesson1_4();else html+='<div class="pro-tip" style="margin-top:24px;">'+svgIcons.check+'<div class="pro-tip-content"><div class="tip-label">Day 1 Complete!</div><p>Great job! Day 2 is now unlocked.</p></div></div>';return html;}
function generateLesson1_1(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>What We Sell</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.info+'<p>We sell 3 types of health plans. Each works differently. Here is the simple breakdown:</p></div>';html+='<div class="academy-fixed-benefits-callout">'+svgIcons.info+'<p><strong>Fixed benefits explained:</strong> The plan pays a set dollar amount per service — not the full bill. Agent must explain this clearly on every call.</p></div>';html+='<div class="plan-types-grid">';html+='<div class="plan-type-card"><div class="plan-type-header mec"><h4>MEC Plans</h4><div class="subtitle">Minimum Essential Coverage</div></div><ul class="plan-features"><li>'+svgIcons.check+' No deductible</li><li>'+svgIcons.check+' Copays for doctor visits</li><li>'+svgIcons.check+' Free preventive care</li></ul><div class="best-for"><strong>Best for:</strong> Healthy people, low monthly cost</div></div>';html+='<div class="plan-type-card"><div class="plan-type-header stm"><h4>STM Plans</h4><div class="subtitle">Short-Term Medical</div></div><ul class="plan-features"><li>'+svgIcons.check+' Has deductible/coinsurance</li><li>'+svgIcons.check+' Max out-of-pocket protection</li><li>'+svgIcons.check+' Requires medical underwriting</li></ul><div class="best-for"><strong>Best for:</strong> Gap coverage, healthy people</div></div>';html+='<div class="plan-type-card"><div class="plan-type-header indemnity"><h4>Indemnity Plans</h4><div class="subtitle">Fixed Cash Benefits</div></div><ul class="plan-features"><li>'+svgIcons.check+' No deductible</li><li>'+svgIcons.check+' Network repricing</li><li>'+svgIcons.check+' Guaranteed issue</li></ul><div class="best-for"><strong>Best for:</strong> Flexibility, predictable costs</div></div>';html+='</div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>Never tell customers a plan is "guaranteed issue" - it removes urgency!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(1,0)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson1_2(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Key Terms</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.info+'<p>These 7 words come up on almost every call. Know them!</p></div>';html+='<div class="terms-grid">';html+='<div class="term-card"><div class="term-icon">'+svgIcons.dollar+'</div><div><h5>Premium</h5><p>Monthly cost for coverage</p></div></div>';html+='<div class="term-card"><div class="term-icon">'+svgIcons.dollar+'</div><div><h5>Deductible</h5><p>Amount paid before insurance kicks in</p></div></div>';html+='<div class="term-card"><div class="term-icon">'+svgIcons.dollar+'</div><div><h5>Copay</h5><p>Fixed amount per visit (like $25)</p></div></div>';html+='<div class="term-card"><div class="term-icon">'+svgIcons.dollar+'</div><div><h5>Coinsurance</h5><p>Percentage split (80/20 = plan pays 80%)</p></div></div>';html+='<div class="term-card"><div class="term-icon">'+svgIcons.shield+'</div><div><h5>Max Out-of-Pocket</h5><p>Most you pay in a year</p></div></div>';html+='<div class="term-card"><div class="term-icon">'+svgIcons.search+'</div><div><h5>Network</h5><p>Doctors with contracted rates</p></div></div>';html+='<div class="term-card"><div class="term-icon">'+svgIcons.alert+'</div><div><h5>Pre-existing (12/12)</h5><p>12-month wait for recent conditions</p></div></div>';html+='</div>';html+='<button class="mark-complete-btn" onclick="completeLesson(1,1)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson1_3(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>ACA vs Private Plans</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.info+'<p>Customers often ask about the difference. Here is how to explain it:</p></div>';html+='<div class="compare-grid">';html+='<div class="compare-card aca"><h4>ACA / Marketplace</h4><ul><li>Open Enrollment: Nov 1 - Jan 15</li><li>Need qualifying event outside OE</li><li>Subsidies if income qualifies</li><li>Covers pre-existing day 1</li><li>Covers maternity, mental health</li><li>Higher monthly cost</li></ul></div>';html+='<div class="compare-card private"><h4>Our Private Plans</h4><ul><li>Enroll anytime</li><li>No qualifying event needed</li><li>No income requirements</li><li>12/12 pre-existing clause</li><li>No maternity, mental health</li><li>Lower monthly cost</li></ul></div>';html+='</div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>Never bash ACA! Say: "ACA is great for pre-existing. Our plans are better for healthier people who want lower costs."</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(1,2)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson1_4(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Required Disclosures</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.alert+'<p>You MUST say these on every call. Missing them = compliance violation!</p></div>';html+='<ul class="disclosure-list">';html+='<li class="disclosure-item">'+svgIcons.alert+'<p>"This call may be recorded for training and quality assurance."</p></li>';html+='<li class="disclosure-item">'+svgIcons.alert+'<p>"This is a private, limited-benefit plan, not ACA or major medical."</p></li>';html+='<li class="disclosure-item">'+svgIcons.alert+'<p>"Does not cover maternity, substance abuse, or psychiatric services."</p></li>';html+='<li class="disclosure-item">'+svgIcons.alert+'<p>"12/12 pre-existing clause - 12-month wait for recent conditions."</p></li>';html+='<li class="disclosure-item">'+svgIcons.alert+'<p>"30-day waiting period for hospital, sickness, scheduled visits."</p></li>';html+='</ul>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>These are built into the scripts. Just read word-for-word and you are compliant!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(1,3)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateDay2Content(dayData){var lessons=dayData.lessons;var firstIncomplete=lessons.findIndex(function(l){return !l;});var viewLesson=academyGetViewLesson(2,lessons);var html='<button class="back-btn" onclick="hideAllDayContent()">'+svgIcons.x+' Back to all days</button>';html+='<div class="day-header"><div class="day-header-icon">'+svgIcons.target+'</div><div><h2>Day 2: Pre-Qualification</h2><p>Master the opening - 4 lessons with real scripts</p></div></div>';html+=academyDayToneTip(2);html+='<div class="lessons-list">';html+=generateLessonCard(2,0,'Opening Script','Word-for-word when they pick up','4 min',lessons[0],viewLesson===0,firstIncomplete===0&&!lessons[0]);html+=generateLessonCard(2,1,'Prequal Questions','Info you need before picking a plan','5 min',lessons[1],viewLesson===1,firstIncomplete===1&&!lessons[1]);html+=generateLessonCard(2,2,'STM Knockout Questions','15 conditions for STM eligibility','3 min',lessons[2],viewLesson===2,firstIncomplete===2&&!lessons[2]);html+=generateLessonCard(2,3,'Tonality Guide','Sound confident and natural','4 min',lessons[3],viewLesson===3,firstIncomplete===3&&!lessons[3]);html+='</div>';if(viewLesson===0)html+=generateLesson2_1();else if(viewLesson===1)html+=generateLesson2_2();else if(viewLesson===2)html+=generateLesson2_3();else if(viewLesson===3)html+=generateLesson2_4();else html+='<div class="pro-tip" style="margin-top:24px;">'+svgIcons.check+'<div class="pro-tip-content"><div class="tip-label">Day 2 Complete!</div><p>You know the opening! Day 3 unlocked.</p></div></div>';return html;}
function generateLesson2_1(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Opening Script</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.phone+'<p>This is exactly what you say when they pick up. Read it word-for-word!</p></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Opening Script</span><button class="copy-btn" data-copy="openingScript" onclick="copyScript(\'openingScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="openingScript"><p>Central Health Advisors, this is <span class="fill-in">(FIRST AND LAST NAME)</span>. I will be your licensed health insurance agent assisting you today. Please note that this call may be recorded for training and quality assurance.</p><p>Were you looking for an individual or family plan TODAY?</p>';html+='<div class="script-branch"><div class="branch yes"><span class="branch-label">'+svgIcons.check+' If Individual</span><p>Move to next question</p></div><div class="branch hesitant"><span class="branch-label">If Family</span><p>How many family members will be included TODAY?</p></div></div>';html+='<p>OK! GREAT! Now are you currently insured?</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div></div></div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>Say "TODAY" with emphasis - it creates urgency!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(2,0)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson2_2(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Prequal Questions</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.doc+'<p>Gather this info to pick the right plan. Ask conversationally - do not rush!</p></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Prequal Questions</span><button class="copy-btn" data-copy="prequalScript" onclick="copyScript(\'prequalScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="prequalScript"><p>Do you have any pre-existing medical conditions?</p><p>Are you currently taking any medications?</p><p>What is your Date of Birth?</p><p>Please verify your zip code?</p><p>Are you a tobacco user?</p><p>How often do you go to the doctors yearly?</p><p>Do you have any doctors you want to keep in network?</p><p>Any upcoming surgeries or procedures scheduled?</p><p>To check for subsidies, how much do you make yearly BEFORE TAX?</p><p>Is there a monthly price range you are hoping to stay within?</p><p>When would you like coverage to begin?</p><p>I am submitting your info now. Give me 30 to 60 seconds while I review everything.</p>';html+='<div class="script-callout silence">'+svgIcons.alert+' THE SIZZLE - Put on hold 30-60 sec. Builds urgency!</div></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(2,1)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson2_3(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>STM Knockout Questions</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.alert+'<p>For STM plans, you MUST ask these. YES to any = they do NOT qualify for STM!</p></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' 15 Knockout Conditions</span><button class="copy-btn" data-copy="knockoutScript" onclick="copyScript(\'knockoutScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="knockoutScript"><p>In order to determine eligibility I will read you a list of 15 conditions. Please confirm if you currently have or have ever been diagnosed with:</p>';html+='<div class="knockout-list"><h4>'+svgIcons.alert+' The 15 Conditions:</h4><p>Heart Disorder, Stroke, Crohns Disease, Ulcerative Colitis, Liver or Kidney Disorder, Emphysema, COPD, Cancer or Tumor, Alcohol or Drug Abuse, HIV or AIDS, Multiple Sclerosis, Tuberculosis, Autism, Schizophrenia, Lupus, Bariatric Surgery, Pregnancy?</p></div>';html+='<div class="script-callout wait">'+svgIcons.play+' Wait for answer - Do NOT rush!</div></div></div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>If YES to any, say "What we can do instead is..." and pivot to MEC or Indemnity!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(2,2)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson2_4(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Tonality Guide</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.info+'<p>HOW you say it matters as much as WHAT you say. 3 tonality types:</p></div>';html+='<div class="tonality-cards">';html+='<div class="tonality-card down"><h4>Breaking Rapport</h4><div class="tone-type">Down Tone</div><p>For confident statements. Voice goes DOWN at end.</p></div>';html+='<div class="tonality-card up"><h4>Seeking Rapport</h4><div class="tone-type">Up Tone</div><p>For questions. Voice goes UP at end.</p></div>';html+='<div class="tonality-card neutral"><h4>Neutral</h4><div class="tone-type">Monotone</div><p>For reading disclosures. Flat delivery.</p></div>';html+='</div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Key Rules</span></div><div class="script-body">';html+='<p>Mirror customer energy +5-10%</p><p>Speak like a professional, not a friend</p><p>Stop overtalking - say your piece and STOP</p><p>Never say "basically," "actually," "honestly," "um/uh"</p><p>When in doubt, pause instead of filling with words</p></div></div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>Silence sounds confident! Just pause - do NOT fill with "um."</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(2,3)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateDay3Content(dayData){var lessons=dayData.lessons;var firstIncomplete=lessons.findIndex(function(l){return !l;});var viewLesson=academyGetViewLesson(3,lessons);var html='<button class="back-btn" onclick="hideAllDayContent()">'+svgIcons.x+' Back to all days</button>';html+='<div class="day-header"><div class="day-header-icon">'+svgIcons.chat+'</div><div><h2>Day 3: The Pitch</h2><p>Present plans with confidence</p></div></div>';html+=academyDayToneTip(3);html+='<div class="lessons-list">';html+=generateLessonCard(3,0,'Return from Hold','Coming back with the SIZZLE','3 min',lessons[0],viewLesson===0,firstIncomplete===0&&!lessons[0]);html+=generateLessonCard(3,1,'Price Presentation','Present the monthly cost','4 min',lessons[1],viewLesson===1,firstIncomplete===1&&!lessons[1]);html+=generateLessonCard(3,2,'Benefits Script','Walk through coverage','5 min',lessons[2],viewLesson===2,firstIncomplete===2&&!lessons[2]);html+=generateLessonCard(3,3,'Plan Lookup','Find network and underwriter','3 min',lessons[3],viewLesson===3,firstIncomplete===3&&!lessons[3]);html+='</div>';if(viewLesson===0)html+=generateLesson3_1();else if(viewLesson===1)html+=generateLesson3_2();else if(viewLesson===2)html+=generateLesson3_3();else if(viewLesson===3)html+=generateLesson3_4();else html+='<div class="pro-tip" style="margin-top:24px;">'+svgIcons.check+'<div class="pro-tip-content"><div class="tip-label">Day 3 Complete!</div><p>You can pitch! Day 4 unlocked.</p></div></div>';return html;}
function generateLesson3_1(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Return from Hold</h3></div><div class="lesson-detail-body">';html+='<div class="script-callout dont-wait">'+svgIcons.x+' DO NOT ask "are you still there?" - Start speaking immediately!</div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Teaser Script</span><button class="copy-btn" data-copy="teaserScript" onclick="copyScript(\'teaserScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="teaserScript"><p>Alright <span class="fill-in">[Customer Name]</span>, I have some excellent news for you. Based on the information you provided, I was able to locate a plan for you through the <span class="fill-in">[Network Name]</span>.</p><p>This plan offers fixed benefits for doctor visits, hospital care, and prescription savings. You have flexibility to see any provider within the network, no referrals needed for specialists.</p><p>Another key advantage is nationwide access. And most importantly, there is no deductible.</p><p>Does everything sound clear so far?</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div></div></div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>Come back at HIGHER energy! Speak at a steady pace they cannot interrupt.</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(3,0)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson3_2(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Price Presentation</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.dollar+'<p>After the teaser, present the price. Include enrollment fee in total. Make it affordable!</p></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Price Script</span><button class="copy-btn" data-copy="priceScript" onclick="copyScript(\'priceScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="priceScript"><p>Great. Based on everything we reviewed, the monthly rate comes out to <span class="fill-in">$___</span>.</p><p>There is a one-time standard group association fee of <span class="fill-in">$___</span> to activate your membership.</p><p>That brings the total for the first month to <span class="fill-in">$___</span>, and then moving forward, your monthly cost is simply <span class="fill-in">$___</span> thereafter.</p><p>Now, assuming this plan meets your medical needs, would the initial first-month amount be affordable for you today?</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div></div></div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>If they gave budget of $200, present at $180-190. Just under = no-brainer!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(3,1)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson3_3(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Benefits Script</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.doc+'<p>Once they agree price works, walk through benefits. Then RX, then closing - do NOT pause!</p></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Benefits + RX + Closing</span><button class="copy-btn" data-copy="benefitsScript" onclick="copyScript(\'benefitsScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="benefitsScript"><p>Perfect. What I will do next is walk you through the full benefits. If everything looks good, we will submit the application.</p><p>During verification, you will receive an email with coverage outline and digital insurance cards. Physical cards arrive by mail in 1-3 weeks. Okay?</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div>';html+='<p>You do not need referrals to see a specialist. When you visit a doctor, the bill is first reduced to the network contracted rate, then your benefit is applied.</p><p>People like this plan because it is simple - no deductible, pays defined benefit amounts.</p>';html+='<div class="script-callout dont-wait">'+svgIcons.x+' DO NOT WAIT - Go straight to RX!</div>';html+='<p><strong>RX:</strong> You will also receive access to a prescription discount program at major pharmacies.</p><p>The plan does not include benefits for mental health, substance abuse, or pregnancy-related care. You will not be needing coverage for those services, correct?</p>';html+='<div class="script-callout dont-wait">'+svgIcons.x+' DO NOT WAIT - Go to Closing Statement!</div></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(3,2)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson3_4(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Plan Lookup</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.search+'<p>Use this to find network, underwriter, and provider search URL for any plan.</p></div>';html+='<div class="plan-selector"><label>Select a Plan:</label><select id="planSelect" onchange="showPlanInfo()"><option value="">-- Choose a plan --</option>';html+='<optgroup label="First Health Network"><option value="smartchoice">SmartChoice</option><option value="tdk">TDK 1-5</option><option value="goodhealth">GoodHealth 1-5</option><option value="harmonycare">Harmony Care / Sigma Care</option><option value="medfirst">MedFirst 1-5 / TrueHealth 1-5</option></optgroup>';html+='<optgroup label="PHCS Network"><option value="pinnacle-stm">Pinnacle STM Traditional</option><option value="pinnacle-protect">Pinnacle Protect Plan 1-4</option><option value="access-health">Access Health Traditional STM</option><option value="smart-health">Smart Health STM (Traditional)</option><option value="bwa-americare">BWA Americare 2-4</option></optgroup>';html+='<optgroup label="MultiPlan Network"><option value="galena">AFRP Galena STM Elite</option><option value="everest">Everest Summit Plans</option><option value="healthchoice">HealthChoice Silver</option></optgroup>';html+='<optgroup label="Other / Managed Care"><option value="bwa-paramount">BWA Paramount Plans</option></optgroup></select></div>';html+='<div id="planInfoDisplay"></div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>Have this open during calls! You need the network and provider URL for post-close.</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(3,3)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function showPlanInfo(){var select=document.getElementById('planSelect');var display=document.getElementById('planInfoDisplay');var planKey=select.value;if(!planKey||!planReferenceData[planKey]){display.innerHTML='';return;}var plan=planReferenceData[planKey];var html='<div class="plan-info-card"><h4>'+plan.name+'</h4><div class="plan-info-grid">';html+='<div class="plan-info-item"><span>Network</span><strong>'+plan.network+'</strong></div>';if(plan.claimsAdmin)html+='<div class="plan-info-item"><span>Claims Admin</span><strong>'+plan.claimsAdmin+'</strong></div>';if(plan.underwriter)html+='<div class="plan-info-item"><span>Underwriter</span><strong>'+plan.underwriter+'</strong></div>';html+='<div class="plan-info-item"><span>Association</span><strong>'+plan.association+'</strong></div>';html+='<div class="plan-info-item"><span>Type</span><strong>'+plan.type+'</strong></div>';if(plan.providerSearch)html+='<div class="plan-info-item"><span>Provider Search</span><strong>'+plan.providerSearch+'</strong></div>';html+='</div></div>';display.innerHTML=html;}
function generateDay4Content(dayData){var lessons=dayData.lessons;var firstIncomplete=lessons.findIndex(function(l){return !l;});var viewLesson=academyGetViewLesson(4,lessons);var html='<button class="back-btn" onclick="hideAllDayContent()">'+svgIcons.x+' Back to all days</button>';html+='<div class="day-header"><div class="day-header-icon">'+svgIcons.checkCircle+'</div><div><h2>Day 4: Close & Verify</h2><p>Seal the deal - 4 lessons</p></div></div>';html+=academyDayToneTip(4);html+='<div class="lessons-list">';html+=generateLessonCard(4,0,'Collect Info','Email, address, phone confirmation','3 min',lessons[0],viewLesson===0,firstIncomplete===0&&!lessons[0]);html+=generateLessonCard(4,1,'Payment Collection','Get the card - then STOP TALKING','3 min',lessons[1],viewLesson===1,firstIncomplete===1&&!lessons[1]);html+=generateLessonCard(4,2,'Verification Walkthrough','Walk them through DocuSign','4 min',lessons[2],viewLesson===2,firstIncomplete===2&&!lessons[2]);html+=generateLessonCard(4,3,'Post-Close Script','What to say after they sign','5 min',lessons[3],viewLesson===3,firstIncomplete===3&&!lessons[3]);html+='</div>';if(viewLesson===0)html+=generateLesson4_1();else if(viewLesson===1)html+=generateLesson4_2();else if(viewLesson===2)html+=generateLesson4_3();else if(viewLesson===3)html+=generateLesson4_4();else html+='<div class="pro-tip" style="margin-top:24px;">'+svgIcons.check+'<div class="pro-tip-content"><div class="tip-label">Day 4 Complete!</div><p>You know how to close! Final day unlocked.</p></div></div>';return html;}
function generateLesson4_1(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Collect Info</h3></div><div class="lesson-detail-body">';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Info Collection</span><button class="copy-btn" data-copy="infoScript" onclick="copyScript(\'infoScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="infoScript"><p>OK Perfect, what is a good email we can send all this over to?</p><p>Would you like your cards issued with a middle initial, or just first and last name?</p><p>What is the physical mailing address for hard-copy documents?</p><p>Is this phone number <span class="fill-in">________</span> the best number for the insurance company to reach you?</p><p>Before we complete the enrollment, I do need to verify a few items on this recorded line. Can you please confirm that you are a United States citizen or legal resident, and that all health information you provided today is accurate and complete to the best of your knowledge? Lastly, for identity verification purposes, please confirm your Social Security number.</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(4,0)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson4_2(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Payment Collection</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.card+'<p>This is the most critical moment. Get the card, then STOP TALKING. Whoever speaks first loses!</p></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Payment Script</span><button class="copy-btn" data-copy="paymentScript" onclick="copyScript(\'paymentScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="paymentScript"><p>For the initial payment, which card type would you prefer to put on file?</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div><p>Ok go ahead with the card number.</p><div class="script-callout silence">'+svgIcons.x+' DO NOT SPEAK - WHOEVER TALKS FIRST LOSES</div></div></div>';html+='<div class="pro-tip">'+svgIcons.info+'<div class="pro-tip-content"><div class="tip-label">Pro Tip</div><p>MUTE yourself if you have to. The silence feels awkward but it WORKS!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(4,1)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson4_3(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Verification Walkthrough</h3></div><div class="lesson-detail-body">';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Verification Script</span><button class="copy-btn" data-copy="verifyScript" onclick="copyScript(\'verifyScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="verifyScript"><p>This is the final step. I am sending you a text now from a 732 number labeled "ONE ENROLLMENT." Please click the link once you receive it. Let me know when you see it.</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div><p>Great. Please open the link and, if possible, place your phone on speaker so I can walk you through.</p><p>Your role is to confirm everything is correct - spelling of name, address, email, phone, date of birth, gender, payment method.</p><p>Once you have reviewed, let me know - does it all look correct?</p><div class="script-callout wait">'+svgIcons.play+' Wait for answer</div><p>At the bottom, enter your first and last name - please capitalize both. Sign electronically with your finger. Click "Accept."</p></div></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Tape Confirmation Script</span><button class="copy-btn" data-copy="tapeConfirmScript" onclick="copyScript(\'tapeConfirmScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="tapeConfirmScript"><p><strong>SAY VERBATIM:</strong> "Before we complete the enrollment, I do need to verify a few items on this recorded line. Can you please confirm that you are a United States citizen or legal resident, and that all health information you provided today is accurate and complete to the best of your knowledge? Lastly, for identity verification purposes, please confirm your Social Security number."</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(4,2)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson4_4(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Post-Close Script</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.check+'<p>Once they sign, give them the important info. Use Plan Lookup for network details!</p></div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.doc+' Post-Close Script</span><button class="copy-btn" data-copy="postCloseScript" onclick="copyScript(\'postCloseScript\')">'+svgIcons.copy+' Copy</button></div>';html+='<div class="script-body" id="postCloseScript"><p>Congratulations <span class="fill-in">[Customer Name]</span>, your application is complete. Do you have a pen and paper?</p><p>Customer service: <strong>855-736-1590</strong>, Monday-Friday, 9am-9pm Eastern.</p><p>Confirmation number: <strong>CHA561337</strong> - keep this for your records.</p><p>Write down <span class="fill-in">[NETWORK NAME]</span>. Provider search: <span class="fill-in">[PROVIDER SEARCH URL]</span></p><p>Your policy is effective on <span class="fill-in">_______</span>. Second payment due 30 days from effective date.</p><p>You will receive two ID cards by mail in 7-10 business days.</p><p>I want to clarify this is a private, limited-benefit plan, not ACA. Does not cover maternity, substance abuse, or psychiatric.</p><p>12/12 pre-existing clause and 30-day waiting period.</p><p>If you have friends or family who need coverage, please give them my information!</p><p>Alright <span class="fill-in">[Customer Name]</span>, you have been an absolute pleasure. Any questions before we disconnect?</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(4,3)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateDay5Content(dayData){var lessons=dayData.lessons;var firstIncomplete=lessons.findIndex(function(l){return !l;});var viewLesson=academyGetViewLesson(5,lessons);var html='<button class="back-btn" onclick="hideAllDayContent()">'+svgIcons.x+' Back to all days</button>';html+='<div class="day-header"><div class="day-header-icon">'+svgIcons.rocket+'</div><div><h2>Day 5: Go Live Ready</h2><p>Final prep before your first call</p></div></div>';html+=academyDayToneTip(5);html+='<div class="lessons-list">';html+=generateLessonCard(5,0,'Common Objections','What they say and how to respond','6 min',lessons[0],viewLesson===0,firstIncomplete===0&&!lessons[0]);html+=generateLessonCard(5,1,'Never Say List','Words and phrases to avoid','3 min',lessons[1],viewLesson===1,firstIncomplete===1&&!lessons[1]);html+=generateLessonCard(5,2,'Full Call Flow','Visual overview of entire call','4 min',lessons[2],viewLesson===2,firstIncomplete===2&&!lessons[2]);html+=generateLessonCard(5,3,'Mock Call Checklist','Practice before going live','5 min',lessons[3],viewLesson===3,firstIncomplete===3&&!lessons[3]);html+='</div>';if(viewLesson===0)html+=generateLesson5_1();else if(viewLesson===1)html+=generateLesson5_2();else if(viewLesson===2)html+=generateLesson5_3();else if(viewLesson===3)html+=generateLesson5_4();else html+='<div class="pro-tip" style="margin-top:24px;">'+svgIcons.check+'<div class="pro-tip-content"><div class="tip-label">Academy Complete!</div><p>You are READY! Time to make your first sale. Read scripts word-for-word until natural!</p></div></div>';return html;}
function generateLesson5_1(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Common Objections</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.shield+'<p>Customers will push back. Click each objection to see the response:</p></div>';html+='<div class="objection-cards">';var objections=[{q:'How much will the doctor visit cost me?',a:'Harmony Care pays fixed cash benefits based on plan limits. The benefit helps offset costs, not cover them in full.'},{q:'Is there a copay?',a:'No traditional copay. Instead, the plan pays a defined cash benefit per visit. This keeps monthly costs lower.'},{q:'Can I receive this in email?',a:'Yes, I will send you the terms and conditions in the verification E-Signature you accept before enrolling.'},{q:'Is this a PPO or HMO?',a:'These plans use a PPO NETWORK. No referrals needed for specialists, but you must be in-network for benefits.'},{q:'What is the difference vs ACA?',a:'STM has waiting periods on pre-existing, no maternity/mental health, can be held up to 2 years. Lower cost for healthy people.'},{q:'How do you get paid?',a:'I work for Central Health Advisors, an Insurance Agency, and receive a weekly salary.'},{q:'Wait for Open Enrollment',a:'A lot of people say that — the concern is just the gap. Between now and then, if something happens, you are fully exposed.'}];for(var i=0;i<objections.length;i++){html+='<div class="objection-card" onclick="this.classList.toggle(\'open\')"><div class="objection-header"><h4>'+svgIcons.shield+' "'+objections[i].q+'"</h4><span class="toggle">▼</span></div><div class="objection-body"><p>'+objections[i].a+'</p></div></div>';}html+='</div>';html+='<button class="mark-complete-btn" onclick="completeLesson(5,0)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson5_2(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Never Say List</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.x+'<p>These words will hurt your sales. Avoid them at all costs!</p></div>';html+='<div class="never-say-grid">';var neverSay=['Basically...','Actually...','Honestly...','Um or Uh','You dont qualify','Guaranteed issue','Are you still there?','Adding to the script'];for(var i=0;i<neverSay.length;i++){html+='<div class="never-say-item">'+svgIcons.x+'<p>"'+neverSay[i]+'"</p></div>';}html+='</div>';html+='<div class="script-block"><div class="script-header"><span class="script-label">'+svgIcons.check+' Say This Instead</span></div><div class="script-body">';html+='<p><strong>Instead of "You dont qualify":</strong> "What we can do instead is..."</p>';html+='<p><strong>Instead of "Um/Uh":</strong> Just pause. Silence sounds confident!</p>';html+='<p><strong>Instead of asking after hold:</strong> Start speaking immediately with energy!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(5,1)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson5_3(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Full Call Flow</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.phone+'<p>The entire call from start to finish. Each step flows into the next!</p></div>';html+='<div class="call-flow-visual">';var steps=[['1. Opening','Introduce yourself, ask individual or family'],['2. Currently Insured?','Find their current situation'],['3. Prequal Questions','Gather medical info, DOB, zip, budget'],['4. The Sizzle','Put on hold 30-60 seconds'],['5. Teaser','Come back with energy, present plan'],['6. Price','Monthly + enrollment fee = first month total'],['7. Benefits','Walk through coverage, RX, exclusions'],['8. Closing Statement','Confirm understanding'],['9. Collect Info','Email, address, SSN verification'],['10. Payment','Get card number - DO NOT SPEAK'],['11. Verification','Walk through DocuSign'],['12. Post-Close','CS number, confirmation, network info']];for(var i=0;i<steps.length;i++){html+='<div class="flow-step"><div class="flow-line"><div class="flow-dot"></div>';if(i<steps.length-1)html+='<div class="flow-connector"></div>';html+='</div><div class="flow-content"><h4>'+steps[i][0]+'</h4><p>'+steps[i][1]+'</p></div></div>';}html+='</div>';html+='<button class="mark-complete-btn" onclick="completeLesson(5,2)">'+svgIcons.check+' Got it! Mark Complete</button></div></div>';return html;}
function generateLesson5_4(){var html='<div class="lesson-detail active"><div class="lesson-detail-header"><h3>Mock Call Checklist</h3></div><div class="lesson-detail-body">';html+='<div class="intro-bubble">'+svgIcons.doc+'<p>Before going live, practice and check off each item:</p></div>';html+='<div class="checklist-items">';var items=['Opened with full name and company','Pre-qualification completed all questions in order','Plan presentation started without asking if they are still there','Price stated clearly rate fee first month ongoing','Benefits walked in order doctor visits then RX no pause','RX disclosure said correctly moved straight to closing','Closing statement complete understanding confirmed on recorded line','Info collected in correct order email name address phone SSN','Silence held after card number did not fill it','Verification link sent and walked through correctly','Post close complete confirmation number network both disclosures','Tape confirmation done verbatim before submission','Referral ask made at end of post close','Call closed warmly did not ask if they are still there'];for(var i=0;i<items.length;i++){html+='<div class="checklist-item" onclick="this.classList.toggle(\'checked\');this.querySelector(\'input\').checked=this.classList.contains(\'checked\')"><input type="checkbox"><label>'+items[i]+'</label></div>';}html+='</div>';html+='<div class="pro-tip">'+svgIcons.rocket+'<div class="pro-tip-content"><div class="tip-label">You Are Ready!</div><p>Once all boxes checked, you are ready for your first live call. Read scripts word-for-word until natural!</p></div></div>';html+='<button class="mark-complete-btn" onclick="completeLesson(5,3)">'+svgIcons.check+' Complete Academy!</button></div></div>';return html;}
function toggleBenefitsPanel(){var panel=document.getElementById('benefitsPanel');var btn=document.getElementById('benefitsBubbleBtn');panel.classList.toggle('open');btn.classList.toggle('active');if(panel.classList.contains('open')){btn.innerHTML=svgIcons.x;loadBenefitsContent('scripts');}else{btn.innerHTML=svgIcons.book;}}
function switchBenefitsTab(tabId){document.querySelectorAll('.benefits-tab').forEach(function(tab){tab.classList.remove('active');});event.target.closest('.benefits-tab').classList.add('active');loadBenefitsContent(tabId);}
function initBenefitsPanel(){loadBenefitsContent('scripts');}
function loadBenefitsContent(tabId){var content=document.getElementById('benefitsContent');if(!content)return;var html='';if(tabId==='scripts'){html+='<div class="ref-card"><div class="ref-card-header"><span class="ref-card-title">'+svgIcons.phone+' Opening</span><button class="ref-copy-btn" onclick="copyRefScript(\'refOpening\')">'+svgIcons.copy+' Copy</button></div><div class="ref-card-body" id="refOpening"><p>Central Health Advisors, this is <span class="ref-highlight">(NAME)</span>. I will be your licensed agent...</p><p>Were you looking for individual or family plan TODAY?</p></div></div>';html+='<div class="ref-card"><div class="ref-card-header"><span class="ref-card-title">'+svgIcons.dollar+' Price</span><button class="ref-copy-btn" onclick="copyRefScript(\'refPrice\')">'+svgIcons.copy+' Copy</button></div><div class="ref-card-body" id="refPrice"><p>Monthly rate: <span class="ref-highlight">$___</span>. One-time fee: <span class="ref-highlight">$___</span>. Total first month: <span class="ref-highlight">$___</span>.</p></div></div>';html+='<div class="ref-card"><div class="ref-card-header"><span class="ref-card-title">'+svgIcons.card+' Payment</span><button class="ref-copy-btn" onclick="copyRefScript(\'refPayment\')">'+svgIcons.copy+' Copy</button></div><div class="ref-card-body" id="refPayment"><p>Which card type would you prefer?</p><p style="background:#1a1a2e;color:white;padding:8px;border-radius:6px;text-align:center;margin-top:8px;">'+svgIcons.x+' DO NOT SPEAK - WHOEVER TALKS FIRST LOSES</p></div></div>';html+='<div class="ref-card"><div class="ref-card-header"><span class="ref-card-title">'+svgIcons.check+' Post-Close</span><button class="ref-copy-btn" onclick="copyRefScript(\'refPostClose\')">'+svgIcons.copy+' Copy</button></div><div class="ref-card-body" id="refPostClose"><p>CS: <strong>855-736-1590</strong> (M-F 9am-9pm ET)</p><p>Confirmation#: <strong>CHA561337</strong></p></div></div>';}else if(tabId==='plans'){html+='<select class="ref-plan-select" id="refPlanSelect" onchange="showRefPlanInfo()"><option value="">-- Select Plan --</option>';html+='<optgroup label="First Health Network"><option value="smartchoice">SmartChoice</option><option value="tdk">TDK 1-5</option><option value="goodhealth">GoodHealth 1-5</option><option value="harmonycare">Harmony Care / Sigma Care</option><option value="medfirst">MedFirst 1-5 / TrueHealth 1-5</option></optgroup>';html+='<optgroup label="PHCS Network"><option value="pinnacle-stm">Pinnacle STM Traditional</option><option value="pinnacle-protect">Pinnacle Protect Plan 1-4</option><option value="access-health">Access Health Traditional STM</option><option value="smart-health">Smart Health STM (Traditional)</option><option value="bwa-americare">BWA Americare 2-4</option></optgroup>';html+='<optgroup label="MultiPlan Network"><option value="galena">AFRP Galena STM Elite</option><option value="everest">Everest Summit Plans</option><option value="healthchoice">HealthChoice Silver</option></optgroup>';html+='<optgroup label="Other / Managed Care"><option value="bwa-paramount">BWA Paramount Plans</option></optgroup></select>';html+='<div id="refPlanDisplay"></div>';html+='<div class="ref-card" style="background:#EFF6FF;margin-top:16px;"><div class="ref-card-title" style="margin-bottom:10px;">'+svgIcons.search+' Provider Search URLs</div><div class="ref-card-body"><p><strong>First Health:</strong> providerlocator.firsthealth.com</p><p><strong>PHCS/MultiPlan:</strong> providersearch.multiplan.com</p></div></div>';}else if(tabId==='objections'){var objs=[{q:'How much will doctor visit cost?',a:'Fixed cash benefits based on plan limits. Helps offset costs, not cover in full.'},{q:'Is there a copay?',a:'No traditional copay. Plan pays defined cash benefit per visit.'},{q:'I need to think about it',a:'What specific concerns can I address right now?'},{q:'Is this PPO or HMO?',a:'PPO NETWORK. No referrals needed, must be in-network for benefits.'},{q:'How do you get paid?',a:'I work for Central Health Advisors and receive a weekly salary.'}];for(var i=0;i<objs.length;i++){html+='<div class="ref-objection-item" onclick="this.classList.toggle(\'open\')"><h4>'+svgIcons.shield+' "'+objs[i].q+'"</h4><p>'+objs[i].a+'</p></div>';}}else if(tabId==='numbers'){html+='<div class="ref-number-grid"><div class="ref-number-card"><div class="label">Customer Service</div><div class="value">855-736-1590</div></div><div class="ref-number-card"><div class="label">Hours</div><div class="value">M-F 9am-9pm ET</div></div><div class="ref-number-card"><div class="label">Confirmation #</div><div class="value">CHA561337</div></div><div class="ref-number-card"><div class="label">Verification SMS</div><div class="value">732 Number</div></div></div>';html+='<div class="ref-card" style="margin-top:16px;"><div class="ref-card-title" style="margin-bottom:10px;">'+svgIcons.alert+' Required Disclosures</div><div class="ref-card-body" style="font-size:13px;"><p>'+svgIcons.check+' "Call may be recorded for training"</p><p>'+svgIcons.check+' "Private, limited-benefit plan, not ACA"</p><p>'+svgIcons.check+' "Does not cover maternity, substance abuse, psychiatric"</p><p>'+svgIcons.check+' "12/12 pre-existing + 30-day waiting period"</p></div></div>';html+='<div class="ref-card" style="background:#FEF3C7;"><div class="ref-card-title" style="margin-bottom:10px;">'+svgIcons.x+' Never Say</div><div class="ref-card-body" style="font-size:13px;"><p>'+svgIcons.x+' "Basically" / "Actually" / "Honestly"</p><p>'+svgIcons.x+' "Um" / "Uh" (just pause)</p><p>'+svgIcons.x+' "You dont qualify"</p><p>'+svgIcons.x+' "Guaranteed issue"</p></div></div>';}content.innerHTML=html;}
function showRefPlanInfo(){var select=document.getElementById('refPlanSelect');var display=document.getElementById('refPlanDisplay');var planKey=select.value;if(!planKey||!planReferenceData[planKey]){display.innerHTML='';return;}var plan=planReferenceData[planKey];var html='<div class="ref-plan-info"><p><strong>Network:</strong> '+plan.network+'</p>';if(plan.claimsAdmin)html+='<p><strong>Claims Admin:</strong> '+plan.claimsAdmin+'</p>';if(plan.underwriter)html+='<p><strong>Underwriter:</strong> '+plan.underwriter+'</p>';html+='<p><strong>Association:</strong> '+plan.association+'</p>';if(plan.providerSearch)html+='<p><strong>Provider Search:</strong> '+plan.providerSearch+'</p>';html+='</div>';display.innerHTML=html;}
function copyRefScript(scriptId){var el=document.getElementById(scriptId);if(!el)return;var text=el.innerText||el.textContent;navigator.clipboard.writeText(text);}
document.addEventListener('DOMContentLoaded',function(){if(document.getElementById('academyContainer')){initAcademy();}});
