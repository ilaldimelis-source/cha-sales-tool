window.docusignWalkthroughData = {
  whatClientsAsk: [
    {
      severity: 'amber',
      title: 'What is a Working Owner?',
      oneLiner:
        'A self-employed person who joins a company as a small owner -- that is what unlocks the group health plan.',
      sayThis:
        'A Working Owner is someone who both owns part of a business and actively works in it. You are not a W-2 employee, and you are not just a passive owner. For this plan, becoming a Working Owner is what makes you eligible -- it is how self-employed people qualify for a group health plan.',
      pushback: [
        {
          q: 'Am I taking on liability?',
          a: 'No. As a limited member, your only obligation is your monthly premium. You are not on the hook for the companys debts.'
        },
        {
          q: 'Do I have to do real work?',
          a: 'No. Just fill out occasional short surveys when they come. Each takes a few minutes.'
        }
      ]
    },
    {
      severity: 'amber',
      title: 'Why am I becoming an owner of a company?',
      oneLiner:
        'The ownership structure is the legal vehicle that unlocks the group health plan -- it is not separate.',
      sayThis:
        'Federal law (ERISA) only allows group health plans -- it is hard for self-employed people to access them on their own. So this company set up a structure where you become a small partial owner. That ownership is what makes you eligible for the group plan. You are not investing money. You are not taking on debt. It is just the legal framework.',
      pushback: [
        {
          q: 'So this is not real insurance?',
          a: 'It absolutely is. It is a federally-governed ERISA group health plan. The Working Owner structure is just how you qualify for it as a self-employed person.'
        }
      ]
    },
    {
      severity: 'red',
      title: 'Call Right',
      oneLiner:
        'The companys right to remove you if you stop paying or stop responding to surveys.',
      sayThis:
        'This is just the companys right to remove you if you do not hold up your end -- mainly, paying premium on time and answering surveys when they come. Same idea as any membership being terminated for non-compliance. As long as you pay and respond, you are completely fine.',
      pushback: [
        {
          q: 'So they can just kick me out?',
          a: 'Only for failing to meet the conditions. They cannot arbitrarily remove paying, compliant members.'
        },
        {
          q: 'Do I owe money if they remove me?',
          a: 'No. Repurchase is just the legal term for unwinding your Working Owner status. You do not pay anything to leave.'
        }
      ]
    },
    {
      severity: 'red',
      title: 'Schedule K-1 / Will this mess up my taxes?',
      oneLiner:
        'A tax form you get yearly because you are technically a partner in the LLC. Hand it to your tax preparer.',
      sayThis:
        'Each year you will receive a tax form called a K-1. It just shows your share of any partnership activity -- usually very small. You hand it to whoever does your taxes, and they handle the rest. Most preparers see dozens of K-1s per year. It is routine.',
      pushback: [
        {
          q: 'Will this affect my unemployment / SNAP / disability?',
          a: 'It is reportable income but typically very small. If you have a benefit at risk, check with a tax/benefits advisor.'
        },
        {
          q: 'Do I have to file extra forms myself?',
          a: 'No. Your tax preparer just attaches the K-1 to your normal return.'
        }
      ]
    },
    {
      severity: 'red',
      title: 'Specialty meds & prescriptions',
      oneLiner:
        'About 70 acute generic meds covered. Chronic = mail order. Specialty meds (biologics, GLP-1s) NOT covered.',
      sayThis:
        'The plan covers about 70 acute generic medications through MyLiveDoc. Chronic medications come via mail order. Specialty medications -- things like Humira, Ozempic, Enbrel, biologics, and injectables -- are not covered, but a third-party Patient Assistance Program can help source them based on your income.',
      pushback: [
        {
          q: 'Im on Ozempic / Humira -- what do I do?',
          a: 'You would need to use the Patient Assistance Program. Qualification is based on income and household size.'
        },
        {
          q: 'Why are they excluded?',
          a: 'Specialty meds are very high-cost. The plan keeps premiums low by routing them through the PAP instead.'
        }
      ]
    },
    {
      severity: 'amber',
      title: 'Spousal Consent -- why does my spouse sign?',
      oneLiner:
        'Legal protection so your spouse cannot claim the LLC ownership in case of divorce. Skip if unmarried.',
      sayThis:
        'It is a legal protection that says your spouse will not have a claim on the LLC ownership interest in case of divorce. It is for the company, not for you. If you are not married, this section is left blank.',
      pushback: [
        {
          q: 'My spouse is not available right now.',
          a: 'They can sign separately. We can pause and complete the rest later.'
        },
        {
          q: 'Why does this even apply to insurance?',
          a: 'Because of the LLC ownership structure -- the spousal consent is about the LLC interest, not the health coverage itself.'
        }
      ]
    },
    {
      severity: 'green',
      title: 'When will I be charged?',
      oneLiner:
        'Initial payment hits today. Recurring around the 20th of each month for the FOLLOWING month.',
      sayThis:
        'Your initial payment hits today when we complete enrollment. After that, recurring payments are around the 20th of each month for the following months coverage. The charge will show as NEOINS on your statement.',
      pushback: [
        {
          q: 'What if my payment fails?',
          a: '30-day grace period. NSF fee is $35 per failed ACH attempt. NEO can retry within 15 days.'
        },
        {
          q: 'What if the 20th is a weekend?',
          a: 'The charge may go through on the next business day.'
        }
      ]
    },
    {
      severity: 'amber',
      title: 'How do I cancel?',
      oneLiner:
        '15 days notice via email or phone. Less than 15 days = 30+ day delay where you still owe premium.',
      sayThis:
        'Email csr@neoinsurancesolutions.com or call (866) 870-7730 -- at least 15 days before your next bill date. Less than 15 days notice means a 30+ day delay where you are still on the hook for premium during that window.',
      pushback: [
        {
          q: 'Can I cancel anytime?',
          a: 'Yes, with 15 days notice. There is no contract lock-in.'
        },
        {
          q: 'Do I get a refund?',
          a: 'Refunds are subject to review. If claims have been paid, refund may not apply.'
        }
      ]
    }
  ],
  redFlagsChecklist: [
    'Client takes biologics, injectables, GLP-1s, or any specialty med -- flag specialty exclusion BEFORE submission',
    'Client is on chronic medications -- set expectation: mail order only',
    'Client works W-2 job -- plan requires self-employed; this is a big problem',
    'Client is married -- spousal consent box must be checked',
    'Client has work-related injury risk -- plan excludes work-related claims',
    'Client wants flexibility to cancel -- 15-day notice rule + 30-day delay penalty',
    'Client asks "is this real insurance?" -- clarify: ERISA group health plan via LLC structure, not ACA marketplace coverage'
  ],
  attestations: [
    {
      number: 1,
      severity: 'green',
      shortLabel: 'WO Admission',
      title: 'Working Owner Admission',
      docusignText:
        'Do you acknowledge that you will be admitted as a Working Owner under Section 5.01(c) of the LLC Agreement for Population Science Management USA?',
      whatItMeans:
        'You are being added as a partial owner (limited member) of an LLC called Population Science Management. This is the legal structure that lets you access the group health plan.',
      sayToClient:
        'This is just confirming you are being added to the company that runs the health plan. You are becoming a Working Owner -- that is the legal status that gives you access to the group plan as a self-employed person. You are not investing money, and you are not taking on debt.',
      pushback: [
        {
          q: 'Am I taking on liability for this company?',
          a: 'No. As a limited member, your liability is limited. You are only responsible for your monthly premium, not the companys debts.'
        },
        {
          q: 'Why does it have to be set up this way?',
          a: 'Because federal law (ERISA) only allows group health plans, not individual ones. The Working Owner structure makes you eligible for the group.'
        }
      ]
    },
    {
      number: 2,
      severity: 'green',
      shortLabel: 'Communication',
      title: 'Working Owner Activities & Communication',
      docusignText:
        'Do you understand that, as a Working Owner, you are expected to complete assigned activities, respond to Company requests, and maintain regular communication regarding Working Owner matters?',
      whatItMeans:
        'You will occasionally get short health/consumer surveys throughout the year. You are expected to fill them out and stay reachable.',
      sayToClient:
        'Throughout the year, the company will send you short surveys about your healthcare experiences. They use the data to improve the plan. It is not a job in the traditional sense -- just answer when they come, and keep your contact info updated.',
      pushback: [
        {
          q: 'How often, how long?',
          a: 'Occasional, throughout the year. Each is brief, usually a few minutes.'
        },
        {
          q: 'What if I ignore them?',
          a: 'Repeated non-response can technically trigger the Call Right (item 9) and risk your plan access. Just respond when they come.'
        }
      ]
    },
    {
      number: 3,
      severity: 'green',
      shortLabel: 'Project Assignment',
      title: 'Project Assignment',
      docusignText:
        'Do you agree that the Company may assign projects to you at its discretion?',
      whatItMeans:
        'The company can decide which surveys/data requests to send you. You do not pick them.',
      sayToClient:
        'This just means the company chooses which surveys to send -- you cannot pick and choose. Standard wording. The "projects" here are surveys, not work assignments.',
      pushback: [
        {
          q: 'Are they going to give me actual work?',
          a: 'No. "Projects" in this context means data requests / surveys only.'
        }
      ]
    },
    {
      number: 4,
      severity: 'red',
      shortLabel: 'K-1 Payment',
      title: 'Guaranteed Payment (IRC 707(c))',
      docusignText:
        'Do you understand that you will receive a Guaranteed Payment for each response to an information request, as defined under Internal Revenue Code Section 707(c)?',
      whatItMeans:
        'You get paid a small amount for each survey you complete. The IRS classifies this as a Guaranteed Payment under tax code 707(c). That is why you get a K-1.',
      sayToClient:
        'When you fill out a survey, you receive a small payment. The IRS classifies it as a Guaranteed Payment from a partnership -- that is why you get a K-1 tax form at year end. Your tax preparer will know exactly what to do with it.',
      pushback: [
        {
          q: 'How much will I get paid?',
          a: 'Small amount per survey. Not income replacement -- compensation for participating.'
        },
        {
          q: 'Will this complicate my taxes?',
          a: 'The K-1 just gets handed to your tax preparer. Routine.'
        },
        {
          q: 'Will this affect unemployment / disability / SNAP?',
          a: 'Reportable income but typically very small. Check with a tax/benefits advisor if you have a benefit at risk.'
        }
      ]
    },
    {
      number: 5,
      severity: 'amber',
      shortLabel: '3 Units',
      title: 'Three Preferred Units Granted',
      docusignText:
        'Do you acknowledge that you have been granted three (3) Preferred Units in the Company as compensation for your personal services?',
      whatItMeans:
        'You are being given 3 ownership units in the LLC at no cost. They are given as compensation for participating.',
      sayToClient:
        'You are being given 3 ownership units at no cost. You are not buying them. They are given as compensation for your participation. These units are what officially make you a Working Owner and give you access to the health plan.',
      pushback: [
        {
          q: 'Are these worth money?',
          a: 'Not tradeable on a public market, no listed dollar value. Legal instrument, not an investment.'
        },
        { q: 'Can I sell them?', a: 'No -- covered in the next attestation.' },
        {
          q: 'Will I owe taxes on getting them?',
          a: 'The K-1 reflects any tax-relevant activity. Direct specifics to your tax preparer.'
        }
      ]
    },
    {
      number: 6,
      severity: 'amber',
      shortLabel: 'Securities Act',
      title: 'Securities Act Disclosure (No Public Market)',
      docusignText:
        'Do you understand that the Preferred Units are not registered under the Securities Act of 1933 and that there is no public market for these units?',
      whatItMeans:
        'These units are NOT a stock you can sell, trade, or cash in. They exist only inside this LLC structure.',
      sayToClient:
        'These units are not like stocks you can sell on the stock market. Not registered with the SEC, no place to trade them. They only exist within this company structure -- a legal tool, not an investment you can cash out.',
      pushback: [
        {
          q: 'So why call them units?',
          a: 'Legal term for ownership in an LLC. Same way corporations have shares, LLCs have units.'
        },
        {
          q: 'Can I lose money on these?',
          a: 'No. You did not put money in to get them, so there is nothing to lose.'
        }
      ]
    },
    {
      number: 7,
      severity: 'green',
      shortLabel: 'Eligibility',
      title: 'Benefit Plan Eligibility',
      docusignText:
        'Do you understand that you are eligible to participate in Company benefit plans subject to eligibility requirements and timely payment of any required premiums?',
      whatItMeans:
        'You qualify for the health plan AS LONG AS you keep paying your monthly premium on time. Stop paying = lose coverage.',
      sayToClient:
        'As long as you stay current on your monthly payment, you stay on the health plan. If payment lapses past the grace period, you can lose coverage.',
      pushback: [
        {
          q: 'What is the grace period?',
          a: '30 days after a missed payment. After that, NEO can cancel back to your last paid month.'
        },
        {
          q: 'What if my card expires?',
          a: 'Update payment info before the next bill date. Otherwise you are treated like a missed payment.'
        }
      ]
    },
    {
      number: 8,
      severity: 'green',
      shortLabel: 'Confidentiality',
      title: 'Confidentiality (Section 14.03)',
      docusignText:
        'Do you agree to maintain the confidentiality of all Company information and to comply with Section 14.03 of the LLC Agreement?',
      whatItMeans:
        'Anything you learn about the company internally -- survey content, internal documents -- you agree not to share publicly.',
      sayToClient:
        'Standard confidentiality. If the company shares anything internal with you, you agree not to forward or post it publicly. Same kind of clause every employer or partnership has.',
      pushback: [
        {
          q: 'Does this stop me from posting reviews?',
          a: 'It restricts internal company info, not your personal opinion. You can review the plan publicly the same way you would any service.'
        }
      ]
    },
    {
      number: 9,
      severity: 'red',
      shortLabel: 'CALL RIGHT',
      title: 'Call Right (Biggest Confusion Point)',
      docusignText:
        'Do you understand that if you fail to meet the conditions of Working Owner status, the Company may exercise its Call Right to repurchase your Membership Interest?',
      whatItMeans:
        'If you stop paying, stop responding to surveys, or break the rules, the company can force you to give up Working Owner status -- which means losing access to the health plan.',
      sayToClient:
        'This is just the companys right to remove you if you do not hold up your end -- mainly, paying premium and answering surveys. Same idea as any membership terminated for non-compliance. As long as you do those, you are fine.',
      pushback: [
        {
          q: 'So they can just kick me out?',
          a: 'Only if you fail to meet the conditions. They cannot arbitrarily remove paying, compliant members.'
        },
        {
          q: 'What does "repurchase" mean -- do I owe money?',
          a: 'No. Just the legal mechanism of unwinding your Working Owner status. You do not pay anything to leave.'
        },
        {
          q: 'Can they do this for any reason?',
          a: 'No. Only for failure to meet documented conditions.'
        }
      ]
    },
    {
      number: 10,
      severity: 'green',
      shortLabel: 'Final Confirm',
      title: 'Final Confirmation',
      docusignText:
        'Do you confirm that you have read and understood all the Terms and Conditions and the LLC Agreement, and that you are legally able to provide services as a Working Owner?',
      whatItMeans:
        'You have read everything, you understand it, and there is nothing legally stopping you from being a Working Owner (e.g. no employer non-compete).',
      sayToClient:
        'Final confirmation that you have gone through everything we just covered, you understand it, and nothing legally prevents you from being a Working Owner -- meaning your current job does not have a contract that blocks you. For most people, this is automatic.',
      pushback: [
        {
          q: 'What if I have a non-compete with my employer?',
          a: 'Non-competes typically cover competing businesses, not survey participation. If truly worried, recommend they review their employment contract -- but this almost never blocks anyone.'
        },
        {
          q: 'I have not read every page of the LLC Agreement.',
          a: 'Acknowledge that. Key terms are summarized in this DocuSign. Full LLC Agreement is available on request from PSM.'
        }
      ]
    }
  ],
  glossary: [
    {
      term: 'Working Owner',
      def: 'A self-employed person who joins a company as a small partial owner. That ownership is what makes them eligible for the companys group health plan.'
    },
    {
      term: 'Population Science Management (PSM)',
      def: 'The company that owns the LLC. The LLC sponsors the actual health plan.'
    },
    {
      term: 'LLC Agreement',
      def: 'The rulebook of the company the client is joining.'
    },
    {
      term: 'Section 5.01(c)',
      def: 'The specific paragraph in the rulebook that covers Working Owners. (Just say "the Working Owner section.")'
    },
    {
      term: 'Limited Member',
      def: 'A junior owner. Has ownership but no control. Not liable for company debts.'
    },
    {
      term: 'Preferred Units',
      def: 'Like shares in a company, but for an LLC. The client gets 3 of them for free as a thank-you for participating.'
    },
    {
      term: 'Securities Act of 1933',
      def: 'Federal law that regulates stocks. The disclosure confirms these units are NOT regulated stocks -- meaning the client cannot sell them like Apple stock.'
    },
    {
      term: 'Guaranteed Payment (IRC 707(c))',
      def: 'A small payment the client gets each time they fill out a survey. The IRS calls it a Guaranteed Payment because it comes from a partnership.'
    },
    {
      term: 'Schedule K-1',
      def: 'A tax form the client gets every year because they are technically a partner in the LLC. They hand it to their tax preparer. That is it.'
    },
    {
      term: 'IRS Form 1065',
      def: 'The tax form the LLC files. The K-1 is the clients share of that filing. The client does NOT have to file Form 1065 themselves.'
    },
    {
      term: 'Call Right',
      def: 'The companys right to remove the client (and end their plan) if they do not follow the rules -- mainly: pay premium and respond to surveys.'
    },
    {
      term: 'ERISA Group Health Plan',
      def: 'A federal-law-governed group health plan. Normally only employers can offer one. The Working Owner setup lets self-employed people qualify.'
    },
    {
      term: 'Joinder Agreement',
      def: 'The "I agree to join the LLC" form. By signing, the client officially becomes a Working Owner.'
    },
    {
      term: 'Spousal Consent',
      def: 'A waiver where the spouse agrees they have no claim on the LLC ownership in case of divorce. Unmarried clients skip it.'
    },
    {
      term: 'Capital Contribution',
      def: 'Money the client might be asked to put into the LLC. In practice, this almost never happens -- the monthly premium is the only payment.'
    },
    {
      term: 'TCPA Consent',
      def: 'Permission to contact the client by auto-dialed call, text, or pre-recorded voicemail. Standard for autopay programs.'
    },
    {
      term: 'Rescission',
      def: 'When the company cancels coverage retroactively, as if it never existed. Happens if the client lied during enrollment.'
    },
    {
      term: 'NEO / NEOINS',
      def: 'NEO Insurance Solutions -- the billing company. Shows up as NEOINS on bank statements.'
    },
    {
      term: 'NSF Fee',
      def: '$35 fee charged by NEO when a payment bounces (Non-Sufficient Funds).'
    },
    {
      term: 'Specialty Medication',
      def: 'Expensive, complex meds -- biologics, injectables, GLP-1s like Ozempic. Not covered.'
    },
    {
      term: 'MyLiveDoc Pharmacy',
      def: 'The plans pharmacy. Covers about 70 generic acute medications. Chronic meds = mail order only.'
    },
    {
      term: 'Patient Assistance Program (PAP)',
      def: 'A discount program (not insurance) that helps low-income patients get specialty meds. PSM partners with one for clients who need it.'
    },
    {
      term: 'Centers of Excellence (COE)',
      def: 'Top hospitals/clinics the plan steers members toward for big procedures.'
    },
    {
      term: 'Pre-existing Conditions',
      def: 'Health conditions the client had before enrolling. These ARE covered -- but lying about them = coverage cancelled.'
    },
    {
      term: 'Qualifying Life Event (QLE)',
      def: 'Marriage, divorce, baby, job loss -- life events that let you change plans outside open enrollment.'
    },
    {
      term: 'Open Enrollment',
      def: 'The yearly window where members can switch plans without needing a QLE.'
    },
    { term: 'Initial Contract', def: 'First 12 months on the plan.' },
    {
      term: 'Renewal Contract',
      def: 'Each subsequent 12-month period. Rates may change.'
    },
    {
      term: 'Deductible Year',
      def: 'The 12-month window the deductible counts toward. Three options exist (Calendar / Non-Calendar / Anniversary).'
    },
    {
      term: 'PHI (Protected Health Information)',
      def: 'The clients health data. HIPAA-protected. They authorize PSM to use it for risk assessment.'
    },
    {
      term: 'De-identified Data',
      def: 'Health data with the clients name and ID stripped out. Used for research and reports.'
    },
    {
      term: 'Business Associate',
      def: 'A vendor (like the Plans actuary) who is contractually bound by HIPAA rules.'
    }
  ],
  workingOwnerOverview: {
    title: 'What is a Working Owner?',
    summary:
      'A non-W-2 individual with an ownership interest who also provides personal services to the plan sponsor. The person is not just an owner on paper -- they are actively working in the business.',
    cards: [
      {
        heading: 'Simple explanation for agents',
        body: 'Someone with an ownership stake in a business who is actively performing work or services for it. Different from a passive investor or someone who only holds ownership without working.'
      },
      {
        heading: 'Why it matters',
        bullets: [
          'Working Owner participation is part of plan eligibility.',
          'Person must have an ownership interest in the business.',
          'Person must also be actively providing personal services.',
          'Working Owners are NOT eligible for COBRA benefits.'
        ]
      },
      {
        heading: 'Suggested talking track',
        body: 'A Working Owner is someone who both owns part of the business and actively works in it. Not a W-2 employee, not just a passive owner. For this plan, that active ownership status is part of eligibility.'
      }
    ]
  },
  planPositioning: {
    title: 'Important Plan Positioning',
    intro:
      'Quick comparison tool. Full plan documents govern final eligibility, exclusions, limitations, preauthorization, and claims handling.',
    cards: [
      {
        heading: 'How these plans work',
        bullets: [
          'Limited medical plans with plan-specific visit, day, and service limits.',
          'Benefits structured around copays after deductible for many higher-cost services.',
          'Standard out-of-network services are not covered.',
          'Members must agree to become Working Owners to be eligible.'
        ]
      },
      {
        heading: 'Common rules across all four plans',
        bullets: [
          'Preauthorization may be required; failure can result in denied or reduced benefits.',
          'Emergency room and emergency transport pay at in-network level if emergent.',
          'Preventive care, office visits, and urgent care are covered before deductibles are met.'
        ]
      }
    ]
  },
  bigPicture: {
    title: 'The Big Picture',
    summary:
      'The client is not just buying insurance. They are becoming a Working Owner (limited LLC member) of a subsidiary of Population Science Management USA, LLC. That LLC sponsors an ERISA group health plan, and Working Owners get access to it.',
    points: [
      'Self-employed individuals cannot easily access ERISA group health plans on their own.',
      'By becoming a Working Owner, they qualify as a member of a group plan.',
      'In exchange, they fill out occasional health/consumer surveys.',
      'They are granted 3 Preferred Units (non-tradeable) as compensation.',
      'They will receive a Schedule K-1 tax form each year.'
    ]
  },
  sections: [
    {
      number: 1,
      title: 'Member Information',
      body: 'Name, address, phone, email, DOB, gender. Nothing tricky.'
    },
    {
      number: 2,
      title: 'Product Information (3 Line Items)',
      intro: 'Three separate products on the contract:',
      bullets: [
        'SmartChoice 1500 -- the core plan ($489.00/mo for member age 30-44)',
        'AssistPro Discount -- add-on ($22.99/mo)',
        'Prime Health Pass Discount -- add-on ($39.99/mo)'
      ],
      outro: 'First product = core plan. Everything after = add-ons.'
    },
    {
      number: 3,
      title: 'PSM Working Owner Application',
      body: 'Where the LLC stuff begins. Job title is Consumer Data Respondent (CDR). EEO statement and ADA accommodation language. Standard employment-style boilerplate.'
    },
    {
      number: 4,
      title: 'HIPAA / PHI Authorization (11 items)',
      intro: 'Authorizes PSM to use and disclose PHI for:',
      bullets: [
        'Risk assessment to the health plan',
        'Use by the Plans actuary (Business Associate under HIPAA)',
        'De-identified data analysis (reports, research, sharing with third parties)'
      ],
      outro:
        'Authorization valid until revoked or member leaves the plan. Revoke in writing to legal@populationsciencemanagement.com. Refusing means cannot enroll.'
    },
    {
      number: 5,
      title: 'Medication Disclosures',
      warning: true,
      intro:
        'Top source of post-sale complaints. Confirm verbally before submission.',
      bullets: [
        'ALL specialty medications EXCLUDED -- biologics, injectables, GLP-1s, anything high-cost / high-complexity',
        'Specialty meds routed through 3rd-party Patient Assistance Program (income-based)',
        'MyLiveDoc pharmacy: about 70 acute generic medications',
        'All chronic medications = mail order only',
        'Anything not on formulary = pay out of pocket at retail'
      ]
    },
    {
      number: 6,
      title: 'Plan Type and Participant Coverage',
      bullets: [
        'Plan Name: SmartChoice 1500',
        'Pharmacy Plan: MyLiveDoc',
        'Pre-existing conditions ARE covered',
        'Misstatements/omissions = coverage termination or denied claims'
      ]
    },
    {
      number: 7,
      title: 'Managed Care Section',
      body: 'PSM uses a managed care model with Centers of Excellence and evidence-based medicine. Not every doctor/hospital is in-network. Not every medication or procedure is covered.'
    },
    {
      number: 8,
      title: 'Rates & Contract Terms -- Three Deductible Year Options',
      warning: true,
      intro: 'Three different ways the deductible year resets:',
      bullets: [
        'Option 1 -- Calendar Year (GigCare): resets Jan 1 every year. Enroll Sept -> deductible runs 4 months -> resets Jan 1.',
        'Option 2 -- Non-Calendar Year (RBP/PPO): resets 12 months after effective date. Enroll Sept -> resets next October 1.',
        'Option 3 -- Anniversary Date (TDK): resets on enrollment day. Enroll Aug 21, 2024 -> resets Aug 21, 2025.'
      ],
      outro:
        'New Deductible Year rates presented 1 month before renewal. Plan reserves right to adjust rates if claims/utilization exceed projections.'
    },
    {
      number: 9,
      title: 'Billing & Collections (NEO Insurance Solutions)',
      intro: 'NEO = the billing company. Shows up as NEOINS on credit cards.',
      bullets: [
        'Initial payment charged immediately at enrollment',
        'Recurring around the 20th of each month for FOLLOWING months coverage',
        'ACH or credit/debit card',
        'NSF fee = $35 per failed attempt (NEO retries within 15 days)',
        'Member liable for any claims paid during delinquency'
      ]
    },
    {
      number: 10,
      title: 'Termination & Cancellation',
      warning: true,
      bullets: [
        'Email csr@neoinsurancesolutions.com to cancel',
        'Minimum 15 days notice required',
        'Less than 15 days = 30+ day delay, member still liable for premium',
        'NEO can rescind back to day one if client lied during underwriting -- means coverage was never in effect',
        'Claims not yet received by NEO at cancellation = members responsibility'
      ]
    },
    {
      number: 11,
      title: 'Non-Payment Cancellation',
      bullets: [
        '30-day grace period',
        'After grace: NEO may cancel retroactively to month of last full payment'
      ]
    },
    {
      number: 12,
      title: 'Summary of Benefits & Coverage (SBC)',
      body: 'Required by ACA. Find SBCs on TPA website by searching Plans.'
    },
    {
      number: 13,
      title: 'Underwriting Guidelines',
      body: 'Plans underwriting rules apply during initial enrollment AND every renewal. Re-evaluated at renewal.'
    },
    {
      number: 14,
      title: 'Conditions of Plan Coordination',
      warning: true,
      intro:
        'Work-related injuries/illnesses are EXCLUDED -- even without filing workers comp:',
      bullets: [
        'Workers compensation-eligible events',
        'Employers liability',
        'Own Occupation / Occupational Accident coverage',
        'Any sickness or injury arising from work for wage or profit'
      ]
    },
    {
      number: 15,
      title:
        'Terms and Conditions of Plan Participation (Working Owner -- 11 Items)',
      intro: 'LLC ownership terms:',
      bullets: [
        'Working Owner Status under Section 5.01(c)',
        'Expectation of Services -- failure can trigger Call Right',
        'Guaranteed Payment per IRS 707(c)',
        'Grant of 3 Preferred Units -- not registered, no public market',
        'Working Owner Benefits -- only as long as WO status + premiums paid',
        'Confidentiality',
        'Call Right',
        'Amendment',
        'Severability',
        'Additional Representations',
        'Schedule K-1 issued annually via Form 1065'
      ]
    },
    {
      number: 16,
      title: 'Joinder Agreement',
      body: 'The formal "I am joining the LLC" document. Confirms limited member status, possible capital contributions, transfer restrictions, and that units are not registered under securities laws.'
    },
    {
      number: 17,
      title: 'Spousal Consent',
      warning: true,
      intro: 'If married, spouse acknowledges:',
      bullets: [
        'Reviewed the LLC Agreement',
        'No claim on LLC interest in case of divorce',
        'Appoints client as attorney-in-fact for LLC matters',
        'Will not bequeath any interest by will',
        'Will not pledge or encumber any interest'
      ],
      outro: 'Unmarried = section skipped/blank.'
    },
    {
      number: 18,
      title: 'Member Information Table',
      body: 'Confirms data captured (name, SSN last 4, DOB, gender, mobile, email, tobacco status, dependents, oldest age covered).'
    },
    {
      number: 19,
      title: 'Member Attestation',
      intro: 'Five items attested to:',
      bullets: [
        'Information is truthful and accurate',
        'Plan can ask for wage & tax statement to verify eligibility',
        'Plan can modify fees based on risk/utilization',
        'Member must accept Plan requirements',
        'Member is SELF-EMPLOYED and can prove it'
      ],
      outro:
        'Changes outside Open Enrollment require a Qualifying Life Event (26 CFR 1.125-4).'
    },
    {
      number: 20,
      title: 'Additional Member Attestations (10 Checkboxes)',
      body: 'See the dedicated "10 Additional Member Attestations" tab for the full deep dive on each.'
    },
    {
      number: 21,
      title: 'Applicant Representations and Warranties (8 Items)',
      intro: '8 individual checkboxes:',
      bullets: [
        'Plan excludes specialty medications',
        'Contributions returned if rescinded -- minus claims paid',
        'Application does not guarantee or bind PSM to coverage',
        'TCPA Consent for auto-dialed calls / texts / pre-recorded messages',
        'Info gathered for statistical/actuarial use only',
        'Right to request restrictions on PHI use, with right to revoke',
        'Only the signatory is admitted as Working Owner',
        'Penalty of perjury'
      ]
    },
    {
      number: 22,
      title: 'Terms and Conditions for AssistPro Discount (Add-On)',
      bullets: [
        'Cancel: notify NEO 3 business days before next payment',
        'Refund Policy: full satisfaction within 30 days',
        'Sold by independent agents (not NEO employees)'
      ]
    },
    {
      number: 23,
      title: 'Terms and Conditions for Prime Health Pass Discount (Add-On)',
      body: 'Same boilerplate as AssistPro for the Prime Health Pass product.'
    },
    {
      number: 24,
      title: 'Payment Method',
      body: 'Shows actual payment info on file (ACH, name, routing, last 4). Verify with client.'
    },
    {
      number: 25,
      title: 'Electronic Signature',
      body: 'Final signature with date, IP address, and browser system info captured.'
    }
  ],
  faq: [
    {
      q: 'Why am I becoming an owner of a company? I just want insurance.',
      a: 'The Working Owner structure is the legal vehicle that lets you access this group health plan as a self-employed person. You are given 3 Preferred Units as compensation for surveys -- you do not pay anything to receive them.'
    },
    {
      q: 'What is a Schedule K-1? Will it mess up my taxes?',
      a: 'A partnership tax form showing your share of partnership income. Usually small. Hand to your tax preparer with your other documents.'
    },
    {
      q: 'Why does my spouse need to sign?',
      a: 'Legal protection that says your spouse will not have a claim on the LLC interest in case of divorce. Skip if unmarried.'
    },
    {
      q: 'What about my prescriptions?',
      a: 'Plan covers about 70 acute generic medications via MyLiveDoc. Chronic meds = mail order. Specialty meds (biologics, GLP-1s) NOT covered -- but PAP can help based on income.'
    },
    {
      q: 'When will I be charged?',
      a: 'Initial payment hits today/tomorrow. Recurring around 20th of each month for FOLLOWING months coverage. Shows as NEOINS on statement.'
    },
    {
      q: 'What if I miss a payment?',
      a: '30-day grace period. After: NEO can cancel back to last paid month. NSF fee $35 per failed ACH attempt.'
    },
    {
      q: 'How do I cancel?',
      a: 'Email csr@neoinsurancesolutions.com or call (866) 870-7730 -- 15 days before next bill date. Less than 15 days = 30+ day delay where you still owe premium.'
    },
    {
      q: 'What if I have a workers comp injury?',
      a: 'Work-related injuries NOT covered, even without filing workers comp. Plan is for non-occupational illness/injury only.'
    },
    {
      q: 'Can they raise my rates?',
      a: 'Yes -- rates can adjust during a contract if claims/utilization exceed projections. New rates sent 1 month before renewal.'
    },
    {
      q: 'What does Call Right mean?',
      a: 'Companys right to buy back your Preferred Units (and end plan access) if you fail to meet Working Owner conditions.'
    },
    {
      q: 'What happens if I lie on the application?',
      a: 'Coverage rescinded back to day one -- you owe for any claims paid. Possible criminal fraud penalties.'
    },
    {
      q: 'What is TCPA consent?',
      a: 'You agree to receive automated calls, texts, and pre-recorded messages from PSM and partners. Standard for autopay/billing.'
    }
  ],
  searchSynonyms: {
    shots: ['injectables', 'injection', 'needle', 'biologic'],
    ozempic: ['glp-1', 'glp1', 'specialty medication', 'biologic'],
    humira: ['biologic', 'specialty medication', 'injectable'],
    enbrel: ['biologic', 'specialty medication', 'injectable'],
    'kick out': ['call right', 'remove', 'terminate', 'repurchase'],
    removed: ['call right', 'repurchase', 'terminate'],
    taxes: ['k-1', 'schedule k-1', '1065', 'guaranteed payment'],
    tax: ['k-1', 'schedule k-1', '1065'],
    cancel: ['termination', 'terminate', '15 days', '30 day'],
    cancellation: ['termination', 'terminate', '15 days', '30 day'],
    refund: ['rescission', 'return contributions'],
    spouse: ['spousal', 'spousal consent', 'married'],
    married: ['spousal', 'spousal consent'],
    divorce: ['spousal', 'spousal consent', 'llc interest'],
    preexisting: ['pre-existing', 'conditions', 'health status'],
    preex: ['pre-existing', 'conditions', 'health status'],
    meds: ['medications', 'prescriptions', 'formulary'],
    rx: ['prescriptions', 'medications', 'mylivedoc', 'formulary'],
    prescription: ['prescriptions', 'medications', 'mylivedoc', 'formulary'],
    pharmacy: ['mylivedoc', 'prescriptions', 'mail order'],
    bill: ['billing', 'neoins', 'neo', 'payment', 'charge'],
    charge: ['billing', 'neoins', 'payment', 'ach', 'debit'],
    payment: ['billing', 'neoins', 'ach', 'autopay'],
    late: ['grace', 'nsf', '30-day', 'missed payment'],
    bounced: ['nsf', '$35', 'ach reject', 'returned'],
    k1: ['k-1', 'schedule k-1', 'guaranteed payment', '1065'],
    unit: ['preferred units', 'ownership', 'llc'],
    shares: ['preferred units', 'ownership', 'llc'],
    stock: ['preferred units', 'securities act'],
    quit: ['cancel', 'termination', '15 days'],
    leaving: ['cancel', 'termination', '15 days'],
    'call right': [
      'kick out',
      'remove me',
      'throw out',
      'forced out',
      'kicked out',
      'remove'
    ],
    'k-1': ['k1', 'tax form', 'yearly tax', 'partnership tax'],
    'schedule k-1': ['k1', 'tax form', 'yearly form'],
    'working owner': [
      'owner',
      'wo',
      'partial owner',
      'limited member',
      'self employed owner'
    ],
    'preferred units': ['units', 'shares', 'stock', '3 units', 'three units'],
    'spousal consent': [
      'spouse',
      'wife',
      'husband',
      'partner',
      'married',
      'marriage',
      'divorce'
    ],
    rescission: [
      'rescind',
      'cancel back',
      'lying',
      'lied',
      'fraud',
      'dishonest',
      'false info'
    ],
    specialty: [
      'biologics',
      'biologic',
      'glp-1',
      'glp1',
      'ozempic',
      'humira',
      'enbrel',
      'expensive meds',
      'specialty drugs',
      'injectables',
      'injectable'
    ],
    mylivedoc: ['pharmacy', 'rx', 'prescription', 'medication', 'meds'],
    'pre-existing': [
      'preex',
      'pre ex',
      'preexisting',
      'pre existing',
      'health condition',
      'chronic'
    ],
    termination: [
      'cancel',
      'cancellation',
      'quit',
      'stop',
      'leave',
      'end coverage'
    ],
    billing: [
      'payment',
      'charge',
      'billed',
      'neoins',
      'neo',
      'autopay',
      'ach',
      'card'
    ],
    nsf: ['bounce', 'bounced', 'failed payment', 'declined', 'returned'],
    tcpa: ['robocall', 'auto dial', 'auto-dial', 'text message', 'sms'],
    'workers comp': [
      'workers compensation',
      'work-related',
      'work injury',
      'on the job',
      'occupational'
    ],
    erisa: ['group plan', 'group health', 'federal plan'],
    'guaranteed payment': [
      'paid',
      'survey payment',
      'survey pay',
      'getting paid'
    ],
    'open enrollment': [
      'oe',
      'enrollment window',
      'change plans',
      'switch plans'
    ],
    qle: [
      'qualifying life event',
      'life event',
      'baby',
      'marriage',
      'divorce',
      'job loss'
    ],
    deductible: ['ded', 'out of pocket', 'oop'],
    phi: ['health info', 'medical info', 'health data', 'protected health'],
    hipaa: ['health privacy', 'medical privacy'],
    pap: [
      'patient assistance',
      'specialty medication',
      'help with meds',
      'discount program'
    ],
    'capital contribution': [
      'extra payment',
      'additional money',
      'put in money'
    ],
    joinder: ['join the llc', 'sign on', 'membership form'],
    preauthorization: ['preauth', 'prior auth', 'authorization', 'approval'],
    'centers of excellence': [
      'coe',
      'top hospitals',
      'best doctors',
      'best hospitals'
    ],
    'limited medical': [
      'not full insurance',
      'capped benefits',
      'fixed dollar'
    ],
    attestations: ['checkboxes', 'agreements', 'i agree', 'acknowledge']
  }
};
