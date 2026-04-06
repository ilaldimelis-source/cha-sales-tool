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

const ISA_PROCESS_STAGES = [
  {
    title: '1. Foundation — Before the Call',
    icon: 'circle',
    objective:
      'Arrive in the right state. Confidence is contagious. So is anxiety.',
    phrases: [
      "'I'm calling to help, not to sell.' (internal reset)",
      "'If this isn't right for them, I'll say so.'",
      "'My certainty is my most valuable asset on this call.'"
    ],
    psychology:
      'Prospects read your state before your words. Agents who are internally uncertain project it through rushed pacing, filler words, and defensive tone. Reset before every call.',
    tone: 'Settled. Slow. Certain.',
    mistakes: [
      'Starting calls right after a rejection without resetting',
      'Reviewing objections right before a call — it primes you for defense mode',
      'Reading from a script word-for-word with no variation'
    ],
    avoid: [
      "'I'll just see how this one goes'",
      "'They're probably not going to buy'"
    ]
  },
  {
    title: '2. Opening — First 15 Seconds',
    icon: 'circle',
    objective:
      "Lower the guard. Create a human moment. Don't sound like a call center.",
    phrases: [
      "'Hey [Name], this is [Your Name] — I'm calling about the health coverage inquiry you submitted. Did I catch you at a decent time?'",
      "'I'll keep it short — I just want to make sure I'm looking at the right options for your situation before I give you any recommendations.'"
    ],
    psychology:
      "People make a go/no-go decision in 5 seconds. A warm, permission-asking opener signals you're different from the average sales call.",
    tone: 'Easy. Casual. Not reading.',
    mistakes: [
      'Opening with product names or prices immediately',
      'Sounding rushed or robotic',
      'Not asking permission to proceed'
    ],
    avoid: [
      "'Hi this is [Name] from XYZ insurance calling today—'",
      "'Are you the decision maker?'"
    ]
  },
  {
    title: '3. Discovery — Diagnose Before Prescribing',
    icon: 'circle',
    objective:
      'Find the real situation. Budget, health history, gap in coverage, emotional driver.',
    phrases: [
      "'Before I recommend anything — help me understand your situation. What's going on with coverage right now?'",
      "'What's been your biggest concern about not having coverage?'",
      "'If you could have one thing solved for you today, what would that be?'",
      "'What would happen if you had a medical event tomorrow and you weren't covered?'"
    ],
    psychology:
      "People don't resist plans they helped design. When you reflect their words back in your recommendation, you're not pitching — you're confirming.",
    tone: 'Curious. Unhurried. Genuinely interested.',
    mistakes: [
      'Asking two questions at once',
      'Moving to pitch mode the second you hear budget',
      'Ignoring emotional content in their answers'
    ],
    avoid: [
      "'So basically you want something cheap, right?'",
      "'Great, let me tell you about our plans—'"
    ]
  },
  {
    title: '4. Emotional Validation — Mirror First',
    icon: 'circle',
    objective: 'Make the prospect feel heard before they hear your solution.',
    phrases: [
      "'That makes total sense — and I want to make sure whatever I recommend actually fits what you just described.'",
      "'A lot of the people I work with are in exactly that situation.'",
      "'I don't want to put you into anything that doesn't solve that — so let me show you something specific.'"
    ],
    psychology:
      "The brain buys emotionally and justifies logically. If someone doesn't feel heard, they don't lower their guard. Validation is the fastest trust-builder in sales.",
    tone: 'Warm. Unhurried. Sincere. No performative enthusiasm.',
    mistakes: [
      'Using validation as a mechanical step before launching into pitch',
      "Over-validating with empty phrases like 'absolutely, totally, for sure, definitely'",
      'Moving too fast past an emotional response'
    ],
    avoid: [
      "'Awesome! So—'",
      "'Great, great. So basically—'",
      "'I hear you — anyway, so the plan—'"
    ]
  },
  {
    title: '5. Authority Positioning — Be the Expert',
    icon: 'circle',
    objective:
      'Establish credibility without ego. Be the guide, not the salesperson.',
    phrases: [
      "'Based on what you just told me, I know exactly what type of plan fits your situation.'",
      "'I work with a lot of people in [their situation] and I'll be honest about what works and what doesn't.'",
      "'There are a few different ways this can go — let me walk you through them so you can pick what makes sense for you.'"
    ],
    psychology:
      'Prospects defer to confident experts. When you position as someone who has seen their situation many times, you reduce friction.',
    tone: 'Confident. Measured. Authoritative without arrogance.',
    mistakes: [
      "Saying 'I think this might work for you—' (uncertainty)",
      "Overselling with 'This is the BEST plan on the market!'",
      'Skipping this step and going directly to plan details'
    ],
    avoid: [
      "'I think maybe this could work—'",
      "'I'm not sure which one is better for you—'"
    ]
  },
  {
    title: '6. Plan Positioning — Present the Fit',
    icon: 'circle',
    objective:
      "Present the plan in terms of their situation, not the plan's features.",
    phrases: [
      "'Based on your budget and what you're looking for, this is what I'd recommend—'",
      "'Here's what this plan does for someone in your situation specifically—'",
      "'The reason this fits you is [tie to what they said in discovery].'"
    ],
    psychology:
      "Features don't sell. Fit sells. Connect every benefit to something they said they needed.",
    tone: 'Precise. Direct. Confident.',
    mistakes: [
      'Reading every plan feature in order',
      "Explaining plans people don't care about",
      'Mentioning competitor plans without being asked'
    ],
    avoid: [
      "'So the plan has a $1,500 deductible and 80/20 coinsurance after—' (no context)"
    ]
  },
  {
    title: '7. Future Pacing — Make Them See Coverage',
    icon: 'circle',
    objective:
      'Create an emotional picture of what it looks like to be protected.',
    phrases: [
      "'Imagine you wake up tomorrow and you don't feel right. With this plan in place, you call the telemedicine line, see a doctor in 20 minutes, and you're not staring at a $300 bill.'",
      "'Six months from now, when your renewal comes up — you'll be glad this was in place.'"
    ],
    psychology:
      "Humans buy from projected future states. Future pacing short-circuits overthinking by making the plan feel real before they've paid for it.",
    tone: 'Calm. Descriptive. Not hype.',
    mistakes: [
      'Using unrealistic scenarios',
      "Promising outcomes the plan doesn't guarantee"
    ],
    avoid: ["'You're going to love it!'", "'This will save you thousands!'"]
  },
  {
    title: '8. Assumptive Close — Lead Them Forward',
    icon: 'circle',
    objective:
      'Transition to enrollment naturally without asking for permission.',
    phrases: [
      "'Alright — let's get you set up. I just need to grab a couple of details.'",
      "'The effective date is the 1st — are you okay with that or would the 15th work better?'",
      "'Let me pull up the enrollment — what's the best email for your welcome packet?'"
    ],
    psychology:
      "Assumptive closing works because it removes the binary yes/no decision. You're not asking if they want it — you're asking which option they prefer.",
    tone: 'Natural. Confident. Not rushed.',
    mistakes: [
      "Asking 'So do you want to go ahead?'",
      'Apologizing after the close',
      'Explaining more features after the close (you re-open the sale)'
    ],
    avoid: ["'So... should we do it?'", "'Only if you want to—'"]
  },
  {
    title: "9. Objection Alignment — Don't Fight, Redirect",
    icon: 'circle',
    objective:
      'Align with the objection, reframe it, and bridge back to the value.',
    phrases: [
      "'I completely understand — and let me ask you something...'",
      "'That's actually a really common concern, and here's what I've seen—'",
      "'What specifically is making you hesitate?'"
    ],
    psychology:
      'Resistance is increased by resistance. When you agree first, then reframe, you remove the confrontation.',
    tone: 'Calm. Not defensive. Never frustrated.',
    mistakes: [
      'Immediately countering with a pitch',
      'Getting defensive when challenged',
      'Giving up after one objection'
    ],
    avoid: [
      "'But the plan is really good though—'",
      "'I already explained that—'"
    ]
  },
  {
    title: '10. Compliance Delivery — Be Clear, Be Calm',
    icon: 'circle',
    objective:
      'Deliver all required disclosures clearly without killing momentum.',
    phrases: [
      "'Before we finalize — this plan does not cover mental health, maternity, or substance abuse. Those are excluded.'",
      "'This is not ACA-compliant coverage — it's a [plan type] — which is why the pricing is different.'",
      "'Pre-existing conditions have a 12-month look-back and 12-month waiting period.'"
    ],
    psychology:
      "Delivered with calm authority, compliance disclosures actually build trust. They signal honesty. Agents who rush through disclosures signal they're hiding something.",
    tone: 'Steady. Clear. Unhurried. Like you say it on every single call.',
    mistakes: [
      'Rushing disclosures at the end like legal fine print',
      'Sounding apologetic or nervous delivering limitations',
      'Omitting disclosures because they might object'
    ],
    avoid: [
      'Mumbling or speeding through exclusions',
      "Saying 'the only bad thing is...'"
    ]
  },
  {
    title: '11. Final Check — Before You Hang Up',
    icon: 'circle',
    objective: 'Verify the client understood what they enrolled in.',
    phrases: [
      "'Before I let you go — do you have any questions about what this plan covers or how it works?'",
      "'I want to make sure you feel confident about what you just enrolled in.'",
      "'You'll get an email confirmation with all the details — save the customer service number in your phone.'"
    ],
    psychology:
      "A buyer who fully understands what they purchased doesn't cancel. Cancellations are often caused by confusion, not regret.",
    tone: 'Warm. Reassuring. Professional wrap-up.',
    mistakes: [
      'Hanging up immediately after getting card info',
      'Skipping the confirmation summary',
      'Not giving contact info for follow-up questions'
    ],
    avoid: ['Rushing off the phone after enrollment']
  }
];
// ISA_SCRIPTS is defined in call-playbook.js (loaded first)
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
const ISA_RED_FLAGS = [
  {
    says: 'So this covers everything, right?',
    means: "They've misunderstood the scope — or you didn't make it clear.",
    matters:
      'Enrolling someone who expects comprehensive coverage in a limited plan is a compliance violation and a future cancellation.',
    ask: "'What specifically are you hoping to have covered? Let me walk through what this plan does and doesn't include.'",
    correct:
      'Slow down. Walk through inclusions AND exclusions clearly. Get verbal confirmation.',
    stop: "If they insist on everything being covered and won't accept the limitations after multiple explanations."
  },
  {
    says: 'I need pregnancy covered.',
    means: 'Maternity is a high priority for them.',
    matters:
      'Most limited plans and STM plans exclude maternity. Enrolling someone expecting this coverage is fraud.',
    ask: "'Is pregnancy coverage a requirement for you right now, or is it more of a nice-to-have?'",
    correct:
      "Be direct: 'This plan does not cover maternity. If that's a need, this is not the right plan for you.'",
    stop: 'If maternity is a real need. Do not move forward. Refer to ACA marketplace.'
  },
  {
    says: 'I go to therapy every week.',
    means: 'Mental health is a regular, high-frequency need.',
    matters:
      'Mental health is excluded from most limited and STM plans. This would be a serious coverage gap.',
    ask: "'Is your mental health coverage a requirement for this plan? Because I need to be upfront about what this plan includes.'",
    correct:
      "Disclose clearly: 'Mental health treatment is excluded under this plan.' Then evaluate if an alternative exists.",
    stop: 'If mental health is a primary need and no suitable alternative exists.'
  },
  {
    says: 'I have a lot of ongoing conditions.',
    means: 'High likelihood of pre-ex exclusion triggering on most claims.',
    matters:
      "This person may be buying something that won't cover what they actually need to use it for.",
    ask: "'Can you walk me through your main conditions and how frequently you're using care for them?'",
    correct:
      'Explain the 12/12 pre-existing condition rule clearly. Evaluate whether the plan actually helps them.',
    stop: 'If their primary use case is ongoing treatment for conditions they already have.'
  },
  {
    says: 'I just want the cheapest thing.',
    means:
      "Price-driven, not value-driven. May not understand or care what they're buying.",
    matters:
      'Selling based on price without confirming understanding of coverage is a compliance risk.',
    ask: "'What are the most important things for you to have covered, even in the cheapest option?'",
    correct:
      "Establish a minimum coverage baseline before recommending. Don't just go to the floor.",
    stop: "If they won't engage with coverage details at all."
  },
  {
    says: 'I need surgery soon.',
    means:
      "Pre-existing condition. Most plans won't cover a known upcoming procedure.",
    matters:
      'Enrolling someone expecting surgery coverage on a plan with waiting periods or pre-ex exclusions is misrepresentation.',
    ask: "'Has this surgery been scheduled or recommended by a doctor? I want to make sure I'm clear about what this plan would cover.'",
    correct:
      'If the surgery is related to a prior diagnosis, most plans will NOT cover it. Say this directly.',
    stop: "If they're expecting the plan to cover a known, scheduled surgery. Don't proceed."
  },
  {
    says: 'I want ACA but cheaper.',
    means:
      "They don't understand that ACA is a specific type of plan with specific rules.",
    matters:
      "They may enroll expecting ACA-equivalent coverage at a non-ACA price. That's a setup for disappointment.",
    ask: "'What is it about ACA coverage that you specifically need? Is it a particular benefit, a subsidy you qualify for, or just comprehensive protection?'",
    correct:
      "Explain the difference clearly. Help them understand what they'd be getting and what they'd be giving up.",
    stop: 'If they genuinely qualify for a subsidy and an ACA plan would be more affordable and better suited.'
  },
  {
    says: "I don't care, just sign me up.",
    means: "Disengaged. They may not understand what they're buying.",
    matters: 'An uninformed buyer is a cancellation and a compliance problem.',
    ask: "'I appreciate that — but I want to make sure you actually know what you're getting. Let me take 2 minutes.'",
    correct:
      "Don't skip disclosure because they seem agreeable. Go through the key points.",
    stop: 'Never skip compliance disclosures for an agreeable prospect.'
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
const ISA_CLOSES = [
  {
    name: 'Assumptive Close',
    when: "You've completed discovery, positioned the plan, and the prospect has shown interest without a hard objection.",
    tone: 'Natural. Confident. Like this is the obvious next step.',
    weak: "'So... do you want to go ahead with this?'",
    better:
      "'Based on everything you told me, this plan fits perfectly. Let me pull up the enrollment.'",
    elite:
      "'Alright — this is the right fit for your situation. Let me grab your date of birth to confirm the rate and get your start date locked in. Are you thinking the 1st or the 15th?'"
  },
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
      "'I don't want to push you into anything — but I also don't want you to go another week without coverage if this is the right fit. Based on everything we talked about, does this solve what you need it to solve?'"
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

function renderProcess() {
  var html =
    '<div class="ph"><div class="pt">Sales <span>Process Trainer</span></div><div class="pd">Master every stage of a structured, compliant, confident call.</div></div>';
  ISA_PROCESS_STAGES.forEach(function (s, i) {
    var body = '';
    body += '<div class="trn-two-col" style="margin-bottom:12px;">';
    body += '<div><div class="trn-sec-label">KEY PHRASES</div>';
    s.phrases.forEach(function (p) {
      body += '<div style="font-family:var(--font-body);font-size:14px;font-style:italic;color:#374151;line-height:1.8;margin-bottom:6px;padding:8px 12px;background:#F8F9FE;border-radius:8px;">' + p + '</div>';
    });
    body += '</div><div><div class="trn-sec-label">PSYCHOLOGY</div><div style="font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;">' + s.psychology + '</div></div></div>';
    body += '<div class="trn-two-col">';
    body += '<div><div class="trn-sec-label" style="color:#B91C1C;">MISTAKES TO AVOID</div>';
    s.mistakes.forEach(function (m) {
      body += '<div style="font-family:var(--font-body);font-size:14px;color:#374151;margin-bottom:4px;padding-left:10px;border-left:2px solid #B91C1C;">' + m + '</div>';
    });
    body += '</div><div><div class="trn-sec-label" style="color:#15803D;">TONE</div><div style="font-family:var(--font-body);font-size:14px;color:#15803D;font-weight:700;background:#F0FDF4;border-radius:8px;padding:10px;">' + s.tone + '</div></div></div>';
    html += _trnOpenCard(s.title, body);
  });
  var _page_process = document.getElementById('page-process');
  if (_page_process) _page_process.innerHTML = html;
}

var isaObjCat = 'All';
function renderObjobjections() {
  var cats = ['All', 'Price', 'Delay', 'Trust', 'Spouse', 'Coverage', 'Timing'];
  var html =
    '<div class="ph"><div class="pt">Objection <span>Master System</span></div><div class="pd">Every objection decoded. Tactical, not generic.</div></div>';
  html += '<div class="stabs">';
  cats.forEach(function (c) {
    html +=
      '<button class="stab' +
      (c === isaObjCat ? ' active' : '') +
      '" onclick="setIsaObjCat(\'' +
      c +
      '\')">' +
      c +
      '</button>';
  });
  html += '</div><div id="isa-obj-list"></div>';
  var _io = document.getElementById('page-isaobj');
  if (_io) _io.innerHTML = html;
  renderIsaObjList();
}
function setIsaObjCat(c) {
  isaObjCat = c;
  renderObjobjections();
}
function renderIsaObjList() {
  var filtered =
    isaObjCat === 'All'
      ? ISA_OBJECTIONS
      : ISA_OBJECTIONS.filter(function (o) {
          return o.cat === isaObjCat;
        });
  var html = '';
  filtered.forEach(function (o, i) {
    html +=
      '<div style="background:var(--milk);border:1px solid var(--rule);border-radius:12px;margin-bottom:10px;overflow:hidden">';
    html +=
      '<div style="padding:14px 18px;cursor:pointer;display:flex;align-items:center;gap:10px" onclick="toggleIsaObj(\'io' +
      i +
      '\')">';
    html +=
      '<span style="background:rgba(92,104,120,0.08);color:var(--charcoal);border-radius:8px;padding:3px 8px;font-size:9px;font-weight:700;letter-spacing:1px">' +
      o.cat.toUpperCase() +
      '</span>';
    html +=
      '<div style="font-weight:700;font-size:13px;flex:1;color:var(--charcoal3)">' +
      o.obj +
      '</div><span style="color:var(--warmgray3)" aria-hidden="true">▼</span></div>';
    html += '<div id="io' + i + '" style="display:none;padding:0 18px 16px">';
    html +=
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">';
    html +=
      '<div><div style="font-size:10px;font-weight:700;color:var(--warmgray3);letter-spacing:1px;margin-bottom:4px">WHAT THEY REALLY MEAN</div><div style="font-size:12px;color:var(--charcoal)">' +
      o.means +
      '</div></div>';
    html +=
      '<div><div style="font-size:10px;font-weight:700;color:var(--warmgray3);letter-spacing:1px;margin-bottom:4px">DIAGNOSE FIRST</div><div style="font-size:12px;color:var(--charcoal)">' +
      o.diag +
      '</div></div></div>';
    html +=
      '<div style="font-size:10px;font-weight:700;color:var(--charcoal);letter-spacing:1px;margin-bottom:6px">BEST RESPONSE</div>';
    html +=
      '<div class="sbox" style="margin-bottom:8px;font-size:12px">' +
      o.response +
      '</div>';
    html +=
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">';
    html +=
      '<div><div style="font-size:9px;font-weight:700;color:var(--warmgray3);letter-spacing:1px;margin-bottom:4px">SOFTER VERSION</div><div class="sbox" style="font-size:11px">' +
      o.soft +
      '</div></div>';
    html +=
      '<div><div style="font-size:9px;font-weight:700;color:var(--warmgray3);letter-spacing:1px;margin-bottom:4px">STRONGER VERSION</div><div class="sbox" style="font-size:11px">' +
      o.strong +
      '</div></div></div>';
    html +=
      '<div style="font-size:9px;font-weight:700;color:var(--error);letter-spacing:1px;margin-bottom:4px"> COMPLIANCE NOTE</div>';
    html +=
      '<div style="font-size:11px;color:var(--charcoal);background:var(--error-light);border-radius:8px;padding:8px">' +
      o.compliance +
      '</div>';
    html += '</div></div>';
  });
  var el = document.getElementById('isa-obj-list');
  if (el) el.innerHTML = html;
}
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
    body += '<div style="margin-top:12px;"><div class="trn-sec-label">HOW TO EXPLAIN IT</div>';
    body += '<div style="font-family:var(--font-body);font-size:14px;font-style:italic;color:#374151;line-height:1.8;padding:12px 14px;background:#F8F9FE;border-radius:8px;">' + p.explain + '</div></div>';
    body += '<div style="height:12px;"></div>';
    body += _trnTwoCols('RIGHT FIT', p.rightfit, 'WRONG FIT', p.wrongfit);
    body += '<div style="margin-top:12px;padding:10px 14px;background:#FEF2F2;border-left:3px solid #B91C1C;border-radius:12px;font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;"><strong style="color:#B91C1C;">Compliance:</strong> ' + p.compliance + '</div>';
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
    body += '<div><div class="trn-sec-label">TECHNICAL DEFINITION</div><div style="font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;">' + item.tech + '</div></div>';
    body += '<div><div class="trn-sec-label" style="color:#15803D;">SAY IT THIS WAY</div><div style="font-family:var(--font-body);font-size:14px;font-style:italic;color:#374151;line-height:1.8;padding:12px 14px;background:#F8F9FE;border-radius:8px;">' + item.plain + '</div></div>';
    body += '</div>';
    body += '<div style="padding:10px 14px;background:#FEF2F2;border-left:3px solid #B91C1C;border-radius:12px;font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;"><strong style="color:#B91C1C;">Never say:</strong> ' + item.dontsay + '</div>';
    html += _trnOpenCard(item.term, body);
  });
  document.getElementById('page-simplifier').innerHTML = html;
}

function renderRedflags() {
  var html =
    '<div class="ph"><div class="pt">Red Flag <span>Detector</span></div><div class="pd">Spot misalignment early. Protect your client. Protect yourself.</div></div>';
  ISA_RED_FLAGS.forEach(function (rf, i) {
    html +=
      '<div style="background:var(--milk);border:1px solid rgba(200,60,60,0.2);border-radius:12px;padding:18px 20px;margin-bottom:10px">';
    html +=
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">';
    html += '<span style="font-size:18px"></span>';
    html +=
      '<div style="font-weight:800;font-size:13px;color:var(--error)">Prospect says: "' +
      rf.says +
      '"</div></div>';
    html +=
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px">';
    html +=
      '<div><div style="font-size:9px;font-weight:700;color:var(--warmgray3);letter-spacing:1px;margin-bottom:4px">WHAT IT MEANS</div><div style="font-size:11px;color:var(--charcoal)">' +
      rf.means +
      '</div></div>';
    html +=
      '<div><div style="font-size:9px;font-weight:700;color:var(--warmgray3);letter-spacing:1px;margin-bottom:4px">WHY IT MATTERS</div><div style="font-size:11px;color:var(--charcoal)">' +
      rf.matters +
      '</div></div>';
    html +=
      '<div><div style="font-size:9px;font-weight:700;color:var(--warmgray3);letter-spacing:1px;margin-bottom:4px">ASK THIS</div><div style="font-size:11px;color:var(--charcoal);font-style:italic">' +
      rf.ask +
      '</div></div>';
    html += '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    html +=
      '<div><div style="font-size:9px;font-weight:700;color:#29A26A;letter-spacing:1px;margin-bottom:4px">CORRECT APPROACH</div><div style="font-size:11px;color:var(--charcoal)">' +
      rf.correct +
      '</div></div>';
    html +=
      '<div style="background:var(--error-light);border-radius:8px;padding:10px"><div style="font-size:9px;font-weight:700;color:var(--error);letter-spacing:1px;margin-bottom:4px">STOP IF:</div><div style="font-size:11px;color:var(--charcoal)">' +
      rf.stop +
      '</div></div>';
    html += '</div></div>';
  });
  document.getElementById('page-redflags').innerHTML = html;
}

function renderRoleplay() {
  var html =
    '<div class="ph"><div class="pt">Roleplay <span>Simulator</span></div><div class="pd">Practice the hard conversations before they\'re real. Study what elite looks like.</div></div>';
  ISA_ROLEPLAY.forEach(function (sc, i) {
    var body = '';
    body += '<div style="font-family:var(--font-body);font-size:14px;color:#6B7280;margin-bottom:12px;">' + sc.desc + '</div>';
    body += '<div style="padding:14px;background:#F8F9FE;border-radius:12px;margin-bottom:12px;"><div class="trn-sec-label">PROSPECT SAYS</div>';
    body += '<div style="font-family:var(--font-body);font-size:14px;font-weight:700;color:#111827;font-style:italic;line-height:1.8;">&ldquo;' + sc.says + '&rdquo;</div></div>';
    body += '<div class="trn-two-col">';
    body += '<div class="trn-col-red"><div class="trn-col-label" style="color:#B91C1C;">WEAK RESPONSE</div><div class="trn-col-text">' + sc.weak + '</div></div>';
    body += '<div class="trn-col-green"><div class="trn-col-label" style="color:#15803D;">ELITE RESPONSE</div><div class="trn-col-text">' + sc.response + '</div></div>';
    body += '</div>';
    html += _trnOpenCard(sc.profile, body);
  });
  document.getElementById('page-roleplay').innerHTML = html;
}

function renderClosinglab() {
  var html =
    '<div class="ph"><div class="pt">Closing <span>Lab</span></div><div class="pd">Know your closes. Know when to use them. Know the difference between weak and elite.</div></div>';
  html += '<div style="background:#F0FDF4;border-left:3px solid #15803D;border-radius:12px;padding:14px 18px;margin-bottom:18px;font-family:var(--font-ui);font-size:14px;font-weight:700;color:#15803D;">Silence Rule: After you close, whoever speaks first loses. Deliver the close. Stop talking. Wait.</div>';
  ISA_CLOSES.forEach(function (cl, i) {
    var body = '';
    body += '<div class="trn-two-col" style="margin-bottom:12px;">';
    body += '<div><div class="trn-sec-label">WHEN TO USE</div><div style="font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;">' + cl.when + '</div></div>';
    body += '<div><div class="trn-sec-label">TONE</div><div style="font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;">' + cl.tone + '</div></div>';
    body += '</div>';
    body += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">';
    body += '<div class="trn-col-red"><div class="trn-col-label" style="color:#B91C1C;">WEAK</div><div class="trn-col-text" style="font-style:italic;">' + cl.weak + '</div></div>';
    body += '<div style="border-left:3px solid #d97706;background:#FFFBEB;border-radius:12px;padding:14px;"><div class="trn-col-label" style="color:#d97706;">BETTER</div><div class="trn-col-text" style="font-style:italic;">' + cl.better + '</div></div>';
    body += '<div class="trn-col-green"><div class="trn-col-label" style="color:#15803D;">ELITE</div><div class="trn-col-text" style="font-style:italic;">' + cl.elite + '</div></div>';
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
  [' Mental health — EXCLUDED. Say it every call.',' Maternity — EXCLUDED. Say it every call.',' Substance abuse rehab — EXCLUDED. Say it every call.',' 30-day waiting period for illness — DISCLOSE.',' 12/12 pre-ex clause — DISCLOSE.',' Not ACA-compliant — DISCLOSE.',' Not major medical — DISCLOSE.'].forEach(function(item) {
    compBody += '<div style="font-family:var(--font-body);font-size:14px;color:#374151;padding:8px 0;border-bottom:1px solid #E5E7EB;">' + item + '</div>';
  });
  html += _trnOpenCard('Compliance Non-Negotiables', compBody);

  // Plan Reference Table card
  var tableBody = '<div style="overflow-x:auto;"><table class="ctable" style="border:2px solid #C8CEDD;min-width:600px;">';
  tableBody += '<thead><tr><th style="font-size:13px;">Plan Name</th><th style="font-size:13px;">Network</th><th style="font-size:13px;">Underwriter / Admin</th><th style="font-size:13px;">Association</th></tr></thead><tbody>';
  if (typeof PLANS !== 'undefined') {
    PLANS.forEach(function(p) {
      tableBody += '<tr><td style="font-weight:700;font-size:14px;color:var(--text-primary);">' + p.name + '</td>';
      tableBody += '<td style="font-size:13px;">' + (p.network || '—') + '</td>';
      tableBody += '<td style="font-size:13px;">' + (p.admin || '—') + '</td>';
      tableBody += '<td style="font-size:13px;">' + (p.assoc || '—') + '</td></tr>';
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
      body += '<div onclick="copyDiscovery(this)" data-q="' + q.replace(/"/g, '&quot;') + '" ';
      body += 'style="padding:12px 14px;background:#F8F9FE;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:8px;cursor:pointer;font-family:var(--font-body);font-size:14px;color:#374151;line-height:1.7;transition:all 0.15s;" ';
      body += "onmouseover=\"this.style.borderColor='#5B8DEF'\" onmouseout=\"this.style.borderColor='#E5E7EB'\">";
      body += '\u201c' + q + '\u201d';
      body += '<span style="display:block;font-family:var(--font-ui);font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9CA3AF;margin-top:5px;">Tap to copy</span>';
      body += '</div>';
    });
    html += _trnOpenCard(cat.type + ' — ' + cat.label + ' (' + cat.questions.length + ' questions)', body);
  });

  html +=
    '<div id="discoveryCopied" style="display:none;position:fixed;bottom:30px;right:30px;background:#29A26A;color:#fff;border-radius:12px;padding:12px 20px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Copied to clipboard ✓</div>';

  var _page_discovery = document.getElementById('page-discovery');
  if (_page_discovery) _page_discovery.innerHTML = html;
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
      '"Based on everything you told me, this really makes sense for your situation. Want to go ahead?"',
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
  html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">';
  typeNames.forEach(function (t, ti) {
    var isActive = ti === 0 ? ' ce-tab-active' : '';
    html += '<button class="ce-tab' + isActive + '" style="background:' + (ti === 0 ? typeBg[t] : 'transparent') + ';color:' + typeColors[t] + ';border:1px solid ' + (ti === 0 ? typeColors[t] : '#C8CEDD') + ';border-radius:12px;padding:7px 16px;font-size:12px;font-weight:800;cursor:pointer;transition:all 0.15s;font-family:var(--font-ui);" onclick="switchCeTab(\'' + t + '\')" data-ce-type="' + t + '">' + t + '</button>';
  });
  html += '</div>';

  // Tab panels
  typeNames.forEach(function (t, ti) {
    var col = typeColors[t] || 'var(--charcoal3)';
    var bg = typeBg[t] || 'rgba(212,96,122,0.1)';
    html += '<div class="ce-panel" id="ce-panel-' + t.replace(/[^a-zA-Z]/g, '') + '" style="display:' + (ti === 0 ? 'block' : 'none') + ';">';
    closingLines[t].forEach(function (line) {
      html += '<div onclick="copyClose(this)" data-line="' + line.replace(/"/g, '&quot;') + '" style="display:flex;align-items:flex-start;gap:10px;padding:12px;background:#F8F9FE;border:1px solid #E5E7EB;border-radius:12px;margin-bottom:8px;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor=\'#5B8DEF\'" onmouseout="this.style.borderColor=\'#E5E7EB\'">';
      html += '<span style="background:' + bg + ';color:' + col + ';border-radius:12px;padding:3px 10px;font-size:10px;font-weight:800;white-space:nowrap;flex-shrink:0;">' + t + '</span>';
      html += '<div style="font-family:var(--font-body);font-size:14px;font-style:italic;color:#374151;line-height:1.8;">' + line + '</div></div>';
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
  if (navigator.clipboard) navigator.clipboard.writeText(line);
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
    Assumptive: 'var(--charcoal3)', Soft: '#29A26A', Direct: '#7a5f00',
    Urgency: 'var(--sec)', 'Tie-Down': '#904020', Agreement: '#2A5A90'
  };
  var typeBg = {
    Assumptive: 'rgba(212,96,122,0.1)', Soft: 'rgba(41,162,106,0.1)',
    Direct: 'rgba(184,134,11,0.1)', Urgency: 'rgba(123,104,184,0.1)',
    'Tie-Down': 'rgba(200,110,60,0.1)', Agreement: 'rgba(42,90,144,0.1)'
  };
  // Hide all panels
  document.querySelectorAll('.ce-panel').forEach(function(p) { p.style.display = 'none'; });
  // Show selected panel
  var panelId = 'ce-panel-' + type.replace(/[^a-zA-Z]/g, '');
  var panel = document.getElementById(panelId);
  if (panel) panel.style.display = 'block';
  // Update tab styles
  document.querySelectorAll('.ce-tab').forEach(function(btn) {
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
  html += '<div id="closeCopied" style="display:none;position:fixed;bottom:30px;right:30px;background:#29A26A;color:#fff;border-radius:12px;padding:12px 20px;font-weight:700;font-size:13px;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Copied ✓</div>';

  pg.innerHTML = html;
}

// ══════════════════════════════════════════════════════
// TRAINING HOME PAGE + SECTION VIEW SYSTEM
// ══════════════════════════════════════════════════════

var _trainingView = 'home'; // 'home' or section id

var TRAINING_SECTIONS = [
  {
    group: 'LIVE CALL TOOLS',
    items: [
      { id: 'cheatsheets', title: 'Cheat Sheets', desc: 'Quick reference for plans, networks, and underwriters', icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h8M8 11h5M8 15h6"/>', render: renderCheatsheets },
      { id: 'closingtools', title: 'Closing Tools', desc: 'Closing generators, techniques, and practice lab', icon: '<circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>', render: renderClosingtools },
      { id: 'roleplay', title: 'Roleplay', desc: 'Mock call practice and objection drills', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>', render: renderRoleplay }
    ]
  },
  {
    group: 'LEARN & STUDY',
    items: [
      { id: 'productvault', title: 'Product Training Vault', desc: 'Know exactly what you\'re selling and what you\'re not', icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', render: renderProductvault },
      { id: 'process', title: 'Process', desc: 'Full call flow from open to close', icon: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>', render: renderProcess },
      { id: 'simplifier', title: 'Terms', desc: 'Plain-English explanations for any insurance term', icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>', render: renderSimplifier },
      { id: 'discovery', title: 'Discovery', desc: 'Questioning frameworks that uncover real pain', icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', render: renderDiscovery }
    ]
  }
];

function renderTrainingHome() {
  var pg = document.getElementById('page-traininghome');
  if (!pg) return;

  // Always reset to home when tab is navigated to
  _trainingView = 'home';

  var arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8CEDD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  var html = '<div class="ph"><div class="pt">Training <span>Center</span></div><div class="pd">Build your skills. Choose a section below.</div></div>';

  TRAINING_SECTIONS.forEach(function(group, gi) {
    if (gi > 0) html += '<div style="height:28px;"></div>';
    html += '<div class="trn-group-label">' + group.group + '</div>';
    html += '<div class="trn-home-grid">';
    group.items.forEach(function(item) {
      html += '<div class="trn-home-card" onclick="openTrainingSection(\'' + item.id + '\')">';
      html += '<div class="trn-home-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + item.icon + '</svg></div>';
      html += '<div class="trn-home-info"><div class="trn-home-title">' + item.title + '</div><div class="trn-home-desc">' + item.desc + '</div></div>';
      html += '<div class="trn-home-arrow">' + arrow + '</div>';
      html += '</div>';
    });
    html += '</div>';
  });

  pg.innerHTML = html;
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
  TRAINING_SECTIONS.forEach(function(group) {
    group.items.forEach(function(item) {
      if (item.id === sectionId) sectionConfig = item;
    });
  });
  if (!sectionConfig) return;

  // Build page with back button + container for the section render + bottom pill strip
  pg.innerHTML = '<button class="trn-back-btn" onclick="backToTrainingHome()">&larr; Training</button><div id="page-' + sectionId + '"></div>' + _trnBottomStrip(sectionId);

  // Now call the original render function — the target container exists in the DOM
  sectionConfig.render();
}

function _trnBottomStrip(activeId) {
  var allItems = [];
  TRAINING_SECTIONS.forEach(function(group) {
    group.items.forEach(function(item) { allItems.push(item); });
  });
  var html = '<div style="position:sticky;bottom:0;background:#FFFFFF;border-top:2px solid #E5E7EB;padding:10px 20px;display:flex;flex-wrap:wrap;gap:8px;z-index:50;margin-top:24px;">';
  allItems.forEach(function(item) {
    var isActive = item.id === activeId;
    var bg = isActive ? '#5B8DEF' : '#F4F6FB';
    var color = isActive ? '#FFFFFF' : '#374151';
    var border = isActive ? '1.5px solid #5B8DEF' : '1.5px solid #E5E7EB';
    html += '<button onclick="openTrainingSection(\'' + item.id + '\')" style="background:' + bg + ';color:' + color + ';border:' + border + ';border-radius:999px;padding:6px 16px;font-family:var(--font-ui);font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.15s;">' + item.title + '</button>';
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
  html += '<span class="trn-card-chev" id="' + id + '-chev" aria-hidden="true">&#9660;</span>';
  html += '</div>';
  html += '<div class="trn-card-body" id="' + id + '-body" style="display:none;">';
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
  html += '<div class="trn-col-green"><div class="trn-col-label" style="color:#15803D;">' + leftLabel + '</div><div class="trn-col-text">' + leftText + '</div></div>';
  html += '<div class="trn-col-red"><div class="trn-col-label" style="color:#B91C1C;">' + rightLabel + '</div><div class="trn-col-text">' + rightText + '</div></div>';
  html += '</div>';
  return html;
}
