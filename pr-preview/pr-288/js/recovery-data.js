// data.js — Shared data (RECOVERY scenarios)

const RECOVERY = [
  {
    icon: 'money',
    color: 'var(--charcoal)',
    label: "It's Too Expensive / Over My Budget",
    situation:
      'Prospect says the plan costs too much or is out of their budget.',
    goal: 'Reframe cost as a value decision. Anchor to what uninsured exposure actually costs versus the monthly premium.',
    acknowledge:
      "I hear you — and honestly that's one of the most common concerns.",
    bridge:
      'Can I ask you something quick — is it the monthly itself, or just not seeing the value yet?',
    move: 'Because when something happens without coverage, the out-of-pocket exposure is significant.',
    script:
      "I hear you on the budget — and that makes complete sense. But here's what I want you to think about: going without coverage means you're fully exposed if something happens. At $[X] a month, you're protecting yourself from a much bigger financial risk. Can we get your coverage started today?",
    soft: 'Let me show you how this actually protects you in a real situation so you can decide if it makes sense — fair?',
    strong:
      "Going without coverage doesn't save money — it delays a much bigger financial exposure. One accident, one illness, one hospital stay and you're completely out of pocket. The plan is $[X] a month. That's the cost of protecting yourself. Let's get it done.",
    mistakes: [
      'Apologizing for the price',
      'Offering a discount before reframing value',
      "Saying 'I understand' and then going quiet",
      'Not anchoring to a real dollar comparison'
    ]
  },
  {
    icon: 'think',
    color: '#7a5f00',
    label: 'I Need to Think About It',
    situation:
      "Prospect says they need more time, want to think it over, or aren't ready to decide.",
    goal: "Identify the real unspoken concern. 'Think about it' is almost never the actual reason — something is unresolved.",
    acknowledge: 'Of course — you should feel good about it.',
    bridge: 'Can I ask… what specifically are you wanting to think through?',
    move: "Because usually when someone says that, there's just one thing that isn't fully clear yet. If we clear that up right now, would you feel comfortable moving forward?",
    script:
      "I respect that completely. Before I let you go — what's the one thing that's making you pause? I've talked to a lot of people in your exact situation and it's usually something I can clear up in 30 seconds. What's on your mind?",
    soft: 'No pressure at all — I just want to make sure you have everything you need. Is it the price, the coverage details, or something else?',
    strong:
      "Here's my honest concern: the longer you wait, the longer you're unprotected. Nothing changes between now and tomorrow except you spent another day without coverage. Tell me the concern and let's handle it right now.",
    mistakes: [
      "Saying 'okay, call me when you're ready' and hanging up",
      'Not asking what they actually want to think about',
      'Launching into more features instead of asking the diagnostic question',
      'Accepting the delay without any pushback'
    ]
  },
  {
    icon: 'users',
    color: 'var(--charcoal2)',
    label: 'I Need to Talk to My Spouse / Partner',
    situation:
      'Prospect says they need to check with their spouse or partner before deciding.',
    goal: 'Find out if this is a genuine joint decision or a stall. Offer to include the spouse now, or lock in a concrete callback with both on the line.',
    acknowledge: '100% — that makes sense.',
    bridge:
      "Out of curiosity, what do you think they'd want to know before feeling comfortable with this?",
    move: 'Got it — so if we covered that clearly, would they usually trust your judgment on something like this?',
    script:
      "Absolutely — is your partner available right now? I'd love to do a quick three-way and just answer any questions directly. It usually takes five minutes and then you both have what you need to decide together. Can we do that right now?",
    soft: "Let's make sure you feel solid explaining it so it's an easy yes when you talk to them. Are they available for a quick 2–3 minutes now so we can just handle it together?",
    strong:
      "If the plan itself is something you feel good about, we can get the application started — you'd have the option to cancel within the review period if your partner has concerns.",
    mistakes: [
      "Saying 'okay, talk to them and call me back' with no follow-up time",
      'Treating the spouse as an obstacle instead of a co-buyer',
      'Not offering a three-way call immediately',
      "Accepting 'I'll call you' without a scheduled time"
    ]
  },
  {
    icon: 'email',
    color: '#29A26A',
    label: 'Just Send Me the Information',
    situation:
      'Prospect asks you to email information so they can review it later instead of deciding now.',
    goal: 'Redirect from passive review to active conversation. Information alone rarely closes. Stay on the phone and address the real concern.',
    acknowledge: 'I can definitely send that over.',
    bridge:
      'Quick question though — what would you be looking to understand when you review it?',
    move: "Because most people I send it to don't actually know what they're looking at. Let me walk you through the key parts now — it'll take 2 minutes and make the email actually make sense.",
    script:
      "Happy to send something. What would be the one thing you'd want it to answer? Because if I can just answer that for you right now, you'd be in a much better spot than waiting for an email. What's the concern?",
    soft: "Absolutely — I'll send you the summary. And can I follow up tomorrow morning to walk through it with you? A five-minute call after you've seen it is way more useful than just leaving it in your inbox.",
    strong:
      "I send information every day and it almost never helps because it can't answer follow-up questions. What would actually help you right now is getting your specific concern answered. What is it?",
    mistakes: [
      'Sending an email without a scheduled follow-up call',
      'Treating the email request as a win instead of a stall',
      'Not asking what specific question the information would answer',
      'Sending long PDFs — they overwhelm, not convince'
    ]
  },
  {
    icon: 'confused',
    color: 'var(--butter2)',
    label: 'Confused About Coverage',
    situation:
      "Prospect doesn't understand what the plan covers, confuses it with major medical, or isn't clear on how the benefits work.",
    goal: 'Simplify. Stop explaining features and start translating into their real life. Confusion kills trust — clarity rebuilds it.',
    acknowledge:
      "Yeah — that's completely normal, this stuff isn't explained clearly anywhere.",
    bridge:
      'Let me simplify it real quick: this helps with your everyday visits, gives you 24/7 telemedicine, and most importantly — protects you from major financial hits.',
    move: 'Let me show you how it works in a real situation so it clicks.',
    script:
      'Forget the plan name for a second. If you got sick tomorrow and needed to see a doctor — this plan makes sure your doctor visit is affordable instead of full cost. If you woke up at 2AM feeling terrible, you could call a doctor on your phone for free. And if something serious happened and you ended up in the hospital, the plan pays a benefit directly to you. Is that the kind of coverage you were looking for?',
    soft: "Let me back up — that's on me. The core of this plan is simple: affordable doctor visits, telemedicine 24/7, and hospital protection. What's the piece that still feels unclear?",
    strong:
      "Let me ask you this: what would you need this plan to do for you to feel like it was worth it? Tell me that and I'll tell you straight up whether this does it.",
    mistakes: [
      'Adding more features when the prospect is already overwhelmed',
      "Using terms like 'indemnity' or 'MEC' without explaining them",
      'Skipping compliance disclosures to simplify — they still need to be said',
      "Assuming confusion means they're not interested"
    ]
  },
  {
    icon: 'noentry',
    color: 'var(--warmgray3)',
    label: "I Don't Trust This / Sounds Too Good to Be True",
    situation:
      'Prospect expresses skepticism about the plan, questions its legitimacy, or compares it negatively to name-brand coverage.',
    goal: "Validate their skepticism — it's healthy. Then give specific, verifiable facts that build real credibility without overselling.",
    acknowledge:
      'I actually respect that — you should question things like this.',
    bridge:
      "Can I ask — is it the benefits that feel off, or just that you haven't seen something like this before?",
    move: "This is administered by [X], uses [First Health / PHCS], underwritten by [X]. I'm also licensed — you can verify everything. Let me walk you through how a claim actually works so there are no surprises.",
    script:
      "Your skepticism is exactly right — you should push back on this. Let me give you the specifics: the network is [First Health/PHCS], the administrator is [name], the underwriter is [name]. I'm licensed in your state. And I'm going to walk you through every limitation because I'd rather you enroll knowing exactly what you have than be surprised later. Fair?",
    soft: "I completely understand why you'd be cautious. Let me be fully transparent: this is a limited benefit plan — it is not major medical and it doesn't cover everything. Here's exactly what it does cover, and here's exactly what it doesn't. You tell me if it fits.",
    strong:
      "Here's my test for a good plan: does it do what it says it does, are the companies behind it real, and does the price make sense for what you get? I'll walk you through all three right now. If it doesn't pass your test, I'll tell you.",
    mistakes: [
      'Getting defensive when they compare it to BCBS or ACA plans',
      'Overselling to overcome skepticism — this creates chargebacks',
      'Skipping limitations — this destroys trust when they find out later',
      'Not providing verifiable credentials when asked'
    ]
  },
  {
    icon: 'clock',
    color: 'var(--charcoal)',
    label: "I'll Wait for Open Enrollment",
    situation:
      "Prospect says they'll wait for ACA open enrollment, employer benefits, or another upcoming coverage window.",
    goal: "Make the gap real. Calculate exactly how many months they'll be unprotected and what a single event in that window could cost.",
    acknowledge: 'Got it — a lot of people say that.',
    bridge:
      "Just so I understand — what's your plan if something happens between now and then?",
    move: "Because that's usually where people get hit the hardest. This is really just about protecting you during that gap — not replacing ACA.",
    script:
      "I'm completely with you on using open enrollment for permanent coverage — that's the right call. My only concern is that you've got [X] months between now and then with zero protection. If anything happens in that window, you're paying 100% out of pocket. This plan is $[X]/month. It keeps you covered through the gap and you cancel it the day your new plan starts. Can we at least protect you in the meantime?",
    soft: "That makes total sense. And I'd never try to talk you out of getting major medical when enrollment opens. This is just about the [X] months until then. What happens if something comes up in the meantime?",
    strong:
      "Open enrollment is [X] months away. That's [X] months of driving, working, and living without coverage. I can't tell you nothing will happen — nobody can. What I can tell you is that this plan is $[X]/month to make sure that if something does happen, you're not wiped out. Let's get you covered today.",
    mistakes: [
      "Arguing against ACA or open enrollment — it's a legitimate option",
      'Not calculating the exact months in the gap',
      'Failing to position the plan clearly as a bridge, not a replacement',
      'Letting them off the phone without making the gap risk real'
    ]
  },
  {
    icon: 'briefcase',
    color: '#7a5f00',
    label: 'I Think I Get Coverage Through Work',
    situation:
      'Prospect believes they may have or will soon have employer-sponsored coverage.',
    goal: "Verify whether the coverage is real, current, and active. Most employer plans have waiting periods the prospect hasn't thought through.",
    acknowledge: "That's great if you do.",
    bridge: 'Quick question — is it active right now or starting later?',
    move: "Most plans have a 30–90 day waiting period. So this is really about making sure you're not exposed during that window.",
    script:
      "Good news — employer coverage is the gold standard. Let me ask: is it active today, or does it kick in at a future date? Because if there's a waiting period, even 30 days, you'd be unprotected in that window. This plan can cover that gap and you'd cancel it the day your work coverage starts. Is there any window between now and when it's active?",
    soft: "Totally makes sense. Just want to make sure — when exactly does the employer coverage start? If it's today, you're all set. If there's any gap at all, even a short one, it's worth having something in place.",
    strong:
      "Here's what I've seen happen: people assume they're covered through work, skip getting anything else, and then find out the employer plan doesn't start for 60 days. Can you confirm right now that the coverage is active and when exactly it starts? Because if there's any gap, that's exactly what this plan fills.",
    mistakes: [
      'Pushing back on employer coverage before gathering information',
      'Assuming the employer plan is active without asking',
      'Not asking about waiting periods or coverage start dates',
      'Giving up too quickly when they mention work coverage'
    ]
  },
  {
    icon: 'hospital',
    color: 'var(--charcoal2)',
    label: 'I Have a Pre-Existing Condition',
    situation:
      "Prospect discloses a health condition and worries the plan won't cover them or will deny them.",
    goal: 'Be fully honest about the exclusion period without losing the enrollment. Frame what IS covered and why starting now is still the right move.',
    acknowledge: 'I appreciate you being upfront — that actually helps a lot.',
    bridge:
      'Let me ask — are you more concerned about that being covered, or just having protection overall?',
    move: "Because even if that condition has a waiting period — you're still fully protected from anything new starting day one. Which is usually what people need most.",
    script:
      'Here is how it works, and I will be direct: your condition has a 12-month exclusion from your plan start date. After 12 months, it is fully covered. But right now you are exposed to everything else — a new illness, an accident, an ER visit, your preventive care. This plan covers all of that from day one. Starting the clock today is better than starting it later.',
    soft: 'I appreciate you sharing that. The pre-existing condition will have a waiting period — that is standard and I want to be upfront about it. But everything new that happens after your start date is covered immediately. Getting a plan in place today starts that 12-month window.',
    strong:
      "This is actually the most important reason to enroll today. Yes, that condition has a 12-month window — honest truth. But every day you wait is a day you're unprotected from an accident, a new diagnosis, an ER visit. Start the clock today. Do not wait.",
    mistakes: [
      'Implying the pre-existing condition will be covered from day one',
      'Being vague or evasive about the exclusion period',
      'Over-explaining until the prospect disengages',
      'Not pivoting to what IS covered starting day one'
    ]
  },
  {
    icon: 'clipboard',
    color: '#29A26A',
    label: 'I Need to Read the Fine Print First',
    situation:
      'Prospect wants to review all documents before committing. May be genuine caution or a polite delay tactic.',
    goal: 'Deliver the key disclosures verbally right now. Make the fine print feel like a confirmation of what was said, not an obstacle.',
    acknowledge: 'Smart — you definitely should understand it.',
    bridge: 'Can I ask — what specifically would you be looking for?',
    move: "Let me give you the 3 things that matter so you're not reading blind: what's covered, what's excluded, and any waiting periods.",
    script:
      'Let me be the fine print. Here is what matters: this is a limited benefit plan — not major medical. Preventive care and telemedicine are covered from day one. Pre-existing conditions have a 12-month exclusion. Benefits are fixed amounts toward covered services, not the full bill. Those are the things people are usually looking for in the paperwork.',
    soft: "Absolutely — I'll send you the full summary of benefits after we talk. But let me cover the top three things right now so you're reading it with context instead of from scratch. That usually answers 80 percent of the questions before you even open the document.",
    strong:
      'Here is the honest truth: most of what is in the fine print I just told you. The rest is legal language around the same concepts. If there is a specific concern you are trying to protect against, tell me what it is and I will tell you right now whether this plan covers it.',
    mistakes: [
      'Agreeing to wait while they read documents without a follow-up plan',
      'Not walking through key terms verbally before sending anything',
      'Sending a long PDF without context and expecting a callback',
      'Getting defensive if they push back on any term in the document'
    ]
  },
  {
    icon: 'seedling',
    color: '#29A26A',
    label: 'First Time Getting Coverage — No Price Benchmark',
    situation:
      'Prospect has never had insurance before, has no idea what coverage costs, and has no benchmark for what is normal.',
    goal: 'Anchor them to a price range before asking budget. Give context so they can respond to a number without feeling blind. Then move to a binary choice.',
    acknowledge: 'Totally normal — most people have no idea what this costs.',
    bridge:
      'Let me give you a quick benchmark… the monthly cost varies depending on the coverage level and plan tier you select.',
    move: "Let's find what actually makes sense for you.",
    script:
      'Totally makes sense — this is new territory and you have no frame of reference. Plans vary based on coverage level — on the lower end you get telemedicine, preventive care, and a few doctor visits. On the higher end you add hospital coverage and more visit allowances. Would you feel better keeping it leaner, or is more comprehensive coverage worth a higher monthly if the fit is right?',
    soft: 'No worries at all. Think of it like a car payment — some people want the base model to stay lean, some want more coverage for peace of mind. Which direction does your gut go?',
    strong:
      "Going completely without coverage is always the most expensive option — it just doesn't feel like it until something happens. I can show you what fits at different coverage levels. Are you leaning toward something lean and affordable, or the most protection per dollar?",
    mistakes: [
      'Asking for a budget before giving any price context — they will freeze or hang up',
      'Accepting no budget answer and moving on',
      'Over-explaining the range instead of moving to a binary choice',
      'Making them feel embarrassed for not knowing prices'
    ]
  },
  {
    icon: 'zipper',
    color: 'var(--charcoal2)',
    label: "Won't Give a Budget",
    situation:
      "Prospect refuses to give a budget number, deflects, says they don't know, or gives a non-answer when asked what they can spend.",
    goal: 'Get usable budget information without confrontation. Use a forced binary choice to extract a range they can commit to.',
    acknowledge:
      "No worries — I'm not trying to box you into anything. I just don't want to show you something completely unrealistic.",
    bridge:
      "Would you say you're leaning more toward basic protection or something more comprehensive?",
    move: 'That one answer changes everything I show you.',
    script:
      "I get it — it's hard to budget for something you've never priced before. Let me make it simple. Option one: a leaner plan — telemedicine, preventive care, and a few doctor visits. Option two: more comprehensive — adds hospital coverage and more visit allowances. Which direction makes more sense for where you are right now?",
    soft: 'No pressure on the number. Just tell me which matters more right now: keeping the monthly cost as low as possible, or getting the most coverage for the price. That tells me everything I need.',
    strong:
      "I need at least a general direction to point you at the right plan — otherwise I end up showing you something that doesn't fit. I'm not asking you to commit. Just tell me: are you leaning toward something lean or something more comprehensive?",
    mistakes: [
      "Accepting 'I don't know' and moving on without a range — you pitch the wrong plan",
      'Asking for a budget three times in a row — it sounds like interrogation',
      'Presenting a plan without any budget anchor — leads to sticker shock at close',
      "Making them feel like it's a trick — frame it as your tool to help them"
    ]
  },
  {
    icon: 'hospital',
    color: 'var(--charcoal)',
    label: 'Hospital / Catastrophic — Indemnity Plans',
    situation:
      "Prospect asks what happens in a major event — surgery, cancer, long hospital stay — on a plan with hospital indemnity. They're comparing to major medical.",
    goal: 'Be fully honest about how indemnity works. Frame the daily benefit as real financial protection versus zero. Disclose the 12/12 pre-ex and 30-day wait clearly, then close.',
    acknowledge:
      "Great question — and I want to be completely straight with you here. This is not major medical — it's designed to help offset those big costs.",
    bridge:
      "If you're admitted, it pays you directly — $1,000/day up to [X]. It's not covering the full bill — but it puts real cash in your pocket so you're not walking into it with nothing.",
    move: 'For most people without any coverage at all, having $1,000 a day working for you is a completely different situation than having zero. Does that make sense as the protection it provides?',
    script:
      "Here is how the hospital benefit works — and I always explain this clearly. If you get admitted — actually admitted — the plan pays $1,000 per day directly to you, up to $15,000 for the year. That is not the full hospital bill. A hospital stay can be a significant financial hit. But $1,000 a day paid directly to you while you're dealing with that is real money. New conditions after your plan starts have a 30-day sickness waiting period. Pre-existing conditions from the last 12 months have a 12-month exclusion. Once you're past that, the benefit runs every day you're admitted. Does that make sense?",
    soft: "I know it's not the same as major medical — and I'll never tell you it is. What I will say is a fixed daily benefit paid directly to you when you're in the hospital is a real safety net for someone without coverage. It's the difference between nothing and real protection.",
    strong:
      "Right now you have zero hospital protection. Right now you have zero hospital protection. One bad accident or one admission and you're fully out of pocket with nothing to offset it. With this plan you have $1,000 a day — up to $15,000 — working in your favor. Is it major medical? No. Is it dramatically better than nothing when the worst happens? Absolutely.",
    mistakes: [
      'Saying the plan covers the hospital bill — it pays a fixed daily benefit, not the actual charge',
      'Getting defensive when they compare it to major medical',
      'Skipping the 30-day wait and 12/12 pre-ex disclosures — highest compliance risk on this objection',
      'Letting the comparison to major medical kill the sale without a reframe',
      'Not closing immediately after explaining — confirm they understand, then move forward'
    ]
  }
];
