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

var DOCUSIGN_ACK_BOXES = [
  {
    num: 1,
    section: 'Working Owner Application',
    where: 'Working Owner Application, under General Questions',
    says: 'By checking the box, Applicant certifies you are not applying on behalf any other individuals...',
    script: "You're only signing up yourself and your dependents.",
    context: 'Right after the 10 questions that already show Yes.'
  },
  {
    num: 2,
    section: 'Health info (HIPAA)',
    where:
      'At the end of the Authorization to Use and Disclose Protected Health Information',
    says: 'By checking the box, you agree to the terms of this Authorization.',
    script: 'The plan can use your health info to run your coverage.',
    context: 'After the 11-item numbered list.'
  },
  {
    num: 3,
    section: 'Plan Type and Participant Coverage',
    where: 'At the end of Plan Type and Participant Coverage',
    says: 'Confirmation: I agree to the above disclosures',
    script:
      'You read the plan type, the MyLiveDoc pharmacy and the medication rules.',
    context: ''
  },
  {
    num: 4,
    section: 'Managed Care',
    where: 'Under Managed Care, after the first 2 paragraphs',
    says: 'I have read and understand the information set forth above',
    script: 'You read how the managed care plan works.',
    context:
      'Easy to miss. It sits between paragraphs, right after the red bold line.'
  },
  {
    num: 5,
    section: 'Plan Participation',
    where: 'At the end of Terms and Conditions of Plan Participation',
    says: 'Working Owner Confirmation: I agree to the terms above',
    script:
      'You agree to the Working Owner terms: surveys, 3 Preferred Units and a yearly K-1.',
    context: ''
  },
  {
    num: 6,
    section: 'Joinder Agreement',
    where: 'At the end of the Joinder Agreement',
    says: 'Working Owner Confirmation: I agree to the above joinder agreement',
    script:
      "You're joining the company as a Working Owner. That's what gives you the group plan.",
    context: ''
  },
  {
    num: 7,
    section: 'Spousal Consent',
    where: 'At the end of Spousal Consent',
    says: 'Spouse Confirmation: I agree to the above joinder agreement (if applicable)',
    script: "Please check this one too, even if you're not married.",
    context: 'Always check box 7, married or not.'
  },
  {
    num: 8,
    section: 'Member Attestation',
    where: 'At the end of Member Attestation',
    says: 'Working Owner Confirmation: I agree to the above attestation',
    script: "Your information is true and you're self-employed.",
    context: 'Right before the Additional Member Attestations heading.'
  },
  {
    num: 9,
    section: 'Working Owner question 1 of 10',
    where: 'Under Additional Member Attestations, question 1 of 10',
    says: 'Do you acknowledge that you will be admitted as a Working Owner under Section 5.01(c)...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: 'One box per question, 10 in a row.'
  },
  {
    num: 10,
    section: 'Working Owner question 2 of 10',
    where: 'Under Additional Member Attestations, question 2 of 10',
    says: 'Do you understand that, as a Working Owner, you are expected to complete assigned activities...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 11,
    section: 'Working Owner question 3 of 10',
    where: 'Under Additional Member Attestations, question 3 of 10',
    says: 'Do you agree that the Company may assign projects to you at its discretion?',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 12,
    section: 'Working Owner question 4 of 10',
    where: 'Under Additional Member Attestations, question 4 of 10',
    says: 'Do you understand that you will receive a Guaranteed Payment for each response...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 13,
    section: 'Working Owner question 5 of 10',
    where: 'Under Additional Member Attestations, question 5 of 10',
    says: 'Do you acknowledge that you have been granted three (3) Preferred Units...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 14,
    section: 'Working Owner question 6 of 10',
    where: 'Under Additional Member Attestations, question 6 of 10',
    says: 'Do you understand that the Preferred Units are not registered under the Securities Act...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 15,
    section: 'Working Owner question 7 of 10',
    where: 'Under Additional Member Attestations, question 7 of 10',
    says: 'Do you understand that you are eligible to participate in Company benefit plans...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 16,
    section: 'Working Owner question 8 of 10',
    where: 'Under Additional Member Attestations, question 8 of 10',
    says: 'Do you agree to maintain the confidentiality of all Company information...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 17,
    section: 'Working Owner question 9 of 10',
    where: 'Under Additional Member Attestations, question 9 of 10',
    says: 'Do you understand that if you fail to meet the conditions of Working Owner status...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: ''
  },
  {
    num: 18,
    section: 'Working Owner question 10 of 10',
    where: 'Under Additional Member Attestations, question 10 of 10',
    says: 'Do you confirm that you have read and understood all the Terms and Conditions...',
    script:
      'Same question you already said Yes to. Check the box at the start of the line.',
    context: 'Last of the 10.'
  },
  {
    num: 19,
    section: 'Applicant Representations',
    where: 'At the end of Applicant Representations and Warranties',
    says: 'Confirmation: I confirm that all of the above is true',
    script: 'This covers the 7 items above it. Last box before you sign.',
    context:
      'The page says to initial each item, but there is no initials spot.'
  },
  {
    num: 20,
    section: 'Electronic Signature',
    where: 'Under Electronic Signature',
    says: 'Check here if signing as a Parent or Legal Guardian for the Primary Applicant',
    script: "Leave this one blank unless you're signing for someone else.",
    context: '',
    skip: true
  }
];

var __dsAckCoachIndex = 0;
var __dsAckChecks = [];
var __dsAckSkipDone = false;
var __dsAckAskOpen = -1;
var __dsAckScrollTo = false;

function __dsAckEsc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

setTimeout(function () {
  var group = document.querySelector('.ds-walkthrough-group');
  if (!group) return;
  var tabsBar = group.querySelector('.ds-walkthrough-tabs');
  var panelsWrap = group.querySelector('.ds-tab-panels');
  var search = group.querySelector('#dsSearchInput');
  if (!tabsBar || !panelsWrap || !search) return;

  if (!document.getElementById('ds-ack-coach-style')) {
    var st = document.createElement('style');
    st.id = 'ds-ack-coach-style';
    st.textContent =
      '.ds-ack-wrap{padding-bottom:8px}' +
      '.ds-ack-header-strip{margin-bottom:14px}' +
      '.ds-ack-title{font-size:18px;font-weight:700;color:#0f172a;margin:0 0 6px}' +
      '.ds-ack-sub{font-size:13px;color:#64748b;line-height:1.45;margin:0}' +
      '.ds-ack-summary{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}' +
      '.ds-ack-stat{flex:1;min-width:120px;border:1px solid #e2e8f0;border-radius:14px;background:#fff;padding:10px 12px;box-shadow:0 1px 3px rgba(0,0,0,0.04)}' +
      '.ds-ack-stat-label{font-size:10px;font-weight:700;letter-spacing:0.06em;color:#1a4692;text-transform:uppercase;margin-bottom:4px}' +
      '.ds-ack-stat-val{font-size:13px;font-weight:600;color:#0f172a;line-height:1.35}' +
      '.ds-ack-total-line{font-size:12px;color:#64748b;margin:0 0 12px}' +
      '.ds-ack-progress-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px}' +
      '.ds-ack-progress-label{font-size:12px;font-weight:600;color:#334155}' +
      '.ds-ack-progress-track{flex:1;height:8px;background:#e2e8f0;border-radius:999px;overflow:hidden;min-width:80px}' +
      '.ds-ack-progress-fill{height:100%;background:#1a4692;border-radius:999px;width:0}' +
      '.ds-ack-coach-shell{position:relative;border:1px solid #e2e8f0;border-radius:14px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.04);padding:14px 16px;margin-bottom:12px}' +
      '.ds-ack-section{margin-bottom:14px}' +
      '.ds-ack-section:last-child{margin-bottom:0}' +
      '.ds-ack-lbl{font-size:10px;font-weight:700;letter-spacing:0.06em;color:#1a4692;text-transform:uppercase;margin-bottom:6px}' +
      '.ds-ack-body{font-size:14px;color:#1e293b;line-height:1.45}' +
      '.ds-ack-says{background:var(--cha-danger-bg);color:var(--cha-danger-text);border:1px solid #fecaca;border-radius:10px;padding:10px 12px;font-size:14px;line-height:1.45}' +
      '.ds-ack-context{font-size:12px;color:#64748b;line-height:1.4;margin-top:4px}' +
      '.ds-ack-nav{display:flex;flex-wrap:wrap;align-items:center;gap:10px}' +
      '.ds-ack-btn{padding:10px 16px;border-radius:999px;border:1px solid #000;background:#fff;font-weight:600;font-size:12px;cursor:pointer;color:#000}' +
      '.ds-ack-btn:hover{background:var(--cha-bg-muted)}' +
      '.ds-ack-btn:disabled{opacity:0.45;cursor:not-allowed}' +
      '.ds-ack-btn.ds-ack-primary{background:#1a4692;color:#fff;border-color:#1a4692}' +
      '.ds-ack-btn.ds-ack-primary:hover{background:#153a7a}' +
      '.ds-ack-jump{display:flex;align-items:center;gap:8px;margin-left:auto;font-size:12px;color:#475569}' +
      '.ds-ack-jump select{padding:8px 10px;border-radius:10px;border:1px solid #cbd5e1;font-size:12px;background:#fff}' +
      '.ds-ack-success{border:1px solid #bbf7d0;border-radius:14px;background:#ecfdf5;padding:16px;text-align:center}' +
      '.ds-ack-success-msg{font-size:15px;font-weight:600;color:#065f46;margin:0 0 12px}' +
      '.ds-ack-success .ds-ack-btn{display:inline-block}' +
      '.ds-ack2{display:flex;flex-direction:column;gap:20px;padding-bottom:8px;color:#1e293b}' +
      '.ds-ack2-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px}' +
      '.ds-ack2-kicker{font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--cha-text-secondary)}' +
      '.ds-ack2-title{margin:2px 0 0;font-size:26px;font-weight:800;color:#1e293b}' +
      '.ds-ack2-head-right{display:flex;flex-wrap:wrap;align-items:center;gap:10px}' +
      '.ds-ack2-tiers{display:flex;gap:4px;background:#fff;padding:5px;border-radius:999px;box-shadow:0 4px 14px rgba(30,41,59,0.08)}' +
      '.ds-ack2-tier{border:0;background:transparent;color:#1e293b;font:inherit;font-size:13px;font-weight:600;padding:0 16px;min-height:40px;border-radius:999px;cursor:pointer}' +
      '.ds-ack2-tier.is-on{background:#111827;color:#fff;font-weight:700}' +
      '.ds-ack2-count{background:#fff;border-radius:999px;padding:11px 16px;font-size:13px;font-weight:600;box-shadow:0 4px 14px rgba(30,41,59,0.08)}' +
      '.ds-ack2-count-skip{color:var(--cha-warning-text)}' +
      '.ds-ack2-cols{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}' +
      '.ds-ack2-main{flex:999 1 520px;min-width:0;display:flex;flex-direction:column;gap:20px}' +
      '.ds-ack2-card{background:#fff;border-radius:28px;box-shadow:0 10px 30px rgba(30,41,59,0.08);box-sizing:border-box}' +
      '.ds-ack2-step{padding:30px;display:flex;flex-direction:column;gap:20px}' +
      '.ds-ack2-step-top{display:flex;flex-wrap:wrap;align-items:center;gap:14px}' +
      '.ds-ack2-step-name{flex:1;min-width:0}' +
      '.ds-ack2-badge{flex:none;width:60px;height:60px;border-radius:20px;background:#4060e8;color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800}' +
      '.ds-ack2-badge.is-skip{background:var(--cha-warning-bg);color:var(--cha-warning-text)}' +
      '.ds-ack2-meta{font-size:13px;font-weight:600;color:var(--cha-text-secondary)}' +
      '.ds-ack2-section{font-size:21px;font-weight:800}' +
      '.ds-ack2-skip-pill{background:var(--cha-warning-bg);color:var(--cha-warning-text);font-weight:700;font-size:13px;padding:8px 14px;border-radius:999px}' +
      '.ds-ack2-block{display:flex;flex-direction:column;gap:6px}' +
      '.ds-ack2-lbl{font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--cha-text-secondary);margin-bottom:4px}' +
      '.ds-ack2-lbl-blue{color:#3047c9}' +
      '.ds-ack2-where{font-size:24px;font-weight:800;line-height:1.3}' +
      '.ds-ack2-next{background:#eef1ff;border-radius:20px;padding:16px 20px}' +
      '.ds-ack2-next-text{font-size:18px;font-weight:700;color:#1e2f8f;line-height:1.45}' +
      '.ds-ack2-say{background:#f5f6fc;border-radius:20px;padding:18px 20px}' +
      '.ds-ack2-say-text{font-size:20px;font-weight:600;line-height:1.4}' +
      '.ds-ack2-tip{font-size:14px;color:#374151;line-height:1.45;padding-left:14px;position:relative}' +
      '.ds-ack2-tip:before{content:"";position:absolute;left:0;top:7px;width:7px;height:7px;border-radius:999px;background:#3047c9}' +
      '.ds-ack2-track{height:10px;background:#eceef8;border-radius:999px;overflow:hidden}' +
      '.ds-ack2-fill{height:10px;background:#4060e8;border-radius:999px}' +
      '.ds-ack2-nav{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px}' +
      '.ds-ack2-btn{border:0;background:#eceef8;color:#1e293b;font:inherit;font-weight:700;font-size:15px;padding:0 26px;min-height:48px;border-radius:999px;cursor:pointer}' +
      '.ds-ack2-btn:disabled{opacity:0.45;cursor:not-allowed}' +
      '.ds-ack2-btn.ds-ack2-primary{background:#111827;color:#fff}' +
      '.ds-ack2-done{padding:28px;display:flex;flex-direction:column;align-items:flex-start;gap:16px}' +
      '.ds-ack2-done-msg{font-size:20px;font-weight:800;color:var(--cha-success-text);background:var(--cha-success-bg);border-radius:18px;padding:16px 20px}' +
      '.ds-ack2-jump{padding:20px 22px;display:flex;flex-direction:column;gap:12px}' +
      '.ds-ack2-jump-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px}' +
      '.ds-ack2-jump-title{font-size:15px;font-weight:800}' +
      '.ds-ack2-jump-note{font-size:13px;color:var(--cha-text-secondary)}' +
      '.ds-ack2-jump-grid{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:8px}' +
      '.ds-ack2-jump-btn{border:0;background:#eceef8;color:#1e293b;font:inherit;font-weight:700;font-size:14px;min-height:44px;border-radius:14px;cursor:pointer}' +
      '.ds-ack2-jump-btn.is-done{background:var(--cha-success-bg);color:var(--cha-success-text)}' +
      '.ds-ack2-jump-btn.is-skip{background:var(--cha-warning-bg);color:var(--cha-warning-text)}' +
      '.ds-ack2-jump-btn.is-current{background:#111827;color:#fff}' +
      '.ds-ack2-asks{flex:1 1 320px;min-width:0;padding:22px;display:flex;flex-direction:column;gap:10px}' +
      '.ds-ack2-ask{background:#f5f6fc;border-radius:18px}' +
      '.ds-ack2-ask.is-open{box-shadow:inset 0 0 0 2px #111827}' +
      '.ds-ack2-ask-btn{width:100%;border:0;background:transparent;font:inherit;color:inherit;text-align:left;display:flex;align-items:center;gap:12px;padding:14px 16px;min-height:48px;cursor:pointer}' +
      '.ds-ack2-dot{flex:none;width:12px;height:12px;border-radius:999px;background:#d97706}' +
      '.ds-ack2-dot-red{background:#dc2626}' +
      '.ds-ack2-dot-green{background:#16a34a}' +
      '.ds-ack2-ask-title{flex:1;min-width:0;font-size:14px;font-weight:700}' +
      '.ds-ack2-ask-sign{font-size:18px;font-weight:700;color:var(--cha-text-secondary)}' +
      '.ds-ack2-ask-body{padding:0 16px 16px;display:flex;flex-direction:column;gap:12px}' +
      '.ds-ack2-ask-one{font-size:14px;font-weight:600;color:#374151;line-height:1.5}' +
      '.ds-ack2-ask-say{background:#fff;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.55}' +
      '.ds-ack2-pb-q{font-size:14px;font-weight:700}' +
      '.ds-ack2-pb-a{font-size:14px;line-height:1.5;color:#374151}' +
      '@media (max-width:640px){.ds-ack2-jump-grid{grid-template-columns:repeat(5,minmax(0,1fr))}.ds-ack2-step{padding:22px}.ds-ack2-where{font-size:20px}}' +
      '.ds-ack3-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:12px}' +
      '.ds-ack3-sub{font-size:14px;font-weight:600;color:var(--cha-text-secondary);margin-top:4px}' +
      '.ds-ack3-head-right{display:flex;align-items:center;gap:10px}' +
      '.ds-ack3-count{font-size:14px;font-weight:700}' +
      '.ds-ack3-reset{border:0;background:#fff;color:#1e293b;font:inherit;font-weight:700;font-size:13px;padding:0 16px;min-height:44px;border-radius:999px;box-shadow:0 4px 14px rgba(30,41,59,0.06);cursor:pointer}' +
      '.ds-ack3-list{flex:1 1 360px;min-width:0;display:flex;flex-direction:column;gap:10px}' +
      '.ds-ack3-row{border-radius:22px;box-sizing:border-box;background:#fff}' +
      '.ds-ack3-row.is-open{padding:20px;display:flex;flex-direction:column;gap:14px;border:2px solid #111827;box-shadow:0 14px 34px rgba(30,41,59,0.12)}' +
      '.ds-ack3-row.is-open.is-skip{border-color:#f59e0b}' +
      '.ds-ack3-closed{width:100%;border:0;font:inherit;color:inherit;text-align:left;display:flex;align-items:center;gap:14px;padding:9px 14px;min-height:62px;cursor:pointer}' +
      '.ds-ack3-closed.is-done{opacity:0.75}' +
      '.ds-ack3-closed.is-skip{background:#fffbeb;outline:2px dashed #f59e0b;outline-offset:-2px}' +
      '.ds-ack3-open-top{display:flex;align-items:center;gap:14px}' +
      '.ds-ack3-open-name{flex:1;min-width:0}' +
      '.ds-ack3-open-where{font-size:19px;font-weight:800;line-height:1.3}' +
      '.ds-ack3-mark{flex:none;min-width:46px;height:46px;padding:0 8px;box-sizing:border-box;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;background:#eceef8;color:#1e293b}' +
      '.ds-ack3-mark.is-big{min-width:56px;height:56px;font-size:19px}' +
      '.ds-ack3-mark.is-current{background:#4060e8;color:#fff}' +
      '.ds-ack3-mark.is-done{background:var(--cha-success-bg);color:var(--cha-success-text)}' +
      '.ds-ack3-mark.is-skip{background:var(--cha-warning-bg);color:var(--cha-warning-text)}' +
      '.ds-ack3-short{flex:1;min-width:0;font-size:15px;font-weight:700}' +
      '.ds-ack3-tag{font-size:13px;font-weight:600;color:var(--cha-text-secondary)}' +
      '.ds-ack3-next{background:#f5f6fc;border-radius:16px;padding:12px 14px}' +
      '.ds-ack3-next-lbl{font-size:12px;font-weight:700;color:var(--cha-text-secondary);margin-bottom:3px}' +
      '.ds-ack3-next-text{font-size:15px;font-weight:700;color:#1e2f8f;line-height:1.4}' +
      '.ds-ack3-say{font-size:17px;font-weight:600;line-height:1.45}' +
      '.ds-ack3-check{align-self:flex-start;border:0;background:#111827;color:#fff;font:inherit;font-weight:800;font-size:15px;padding:0 24px;min-height:52px;border-radius:999px;cursor:pointer}' +
      '.ds-ack3-check.is-skip{background:var(--cha-warning-bg);color:var(--cha-warning-text)}' +
      '.ds-ack4-wrap{flex:none;width:400px;max-width:100%;display:flex;flex-direction:column;align-items:center;gap:10px}' +
      '.ds-ack4-tagline{background:#111827;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:8px 14px;border-radius:999px}' +
      '.ds-ack4-phone{width:390px;max-width:100%;height:720px;box-sizing:border-box;background:#111827;border-radius:48px;padding:14px;box-shadow:0 20px 50px rgba(17,24,39,0.25)}' +
      '.ds-ack4-screen{height:100%;overflow-y:auto;background:#fff;border-radius:36px;padding:18px 14px;box-sizing:border-box;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:13px;color:#333;line-height:1.4}' +
      '.ds-ack4-note{font-size:12px;color:var(--cha-text-secondary);text-align:center;max-width:380px}' +
      '.ds-ack4-top{text-align:center;padding:6px 0 2px}' +
      '.ds-ack4-top-t{font-size:17px;font-weight:700}' +
      '.ds-ack4-ph{font-size:11px;color:#8a8f98;margin:6px 0}' +
      '.ds-ack4-bar{background:#428bca;color:#fff;font-size:15px;font-weight:700;text-align:center;padding:8px;margin:14px 0 10px;border-radius:4px}' +
      '.ds-ack4-title{color:#1a4692;font-size:17px;text-align:center;margin:18px 0 8px;line-height:1.25;padding-bottom:6px;border-bottom:1px solid #1a4692}' +
      '.ds-ack4-title.is-left{text-align:left;font-size:15px}' +
      '.ds-ack4-h4{font-size:14px;font-weight:500;margin:10px 0 6px}' +
      '.ds-ack4-field{display:flex;justify-content:space-between;gap:8px;font-size:12px;padding:5px 0;border-bottom:1px solid #eef0f3}' +
      '.ds-ack4-field span:last-child{color:#8a8f98}' +
      '.ds-ack4-small{font-size:12px;color:#555}' +
      '.ds-ack4-small.is-center{text-align:center;margin-bottom:8px}' +
      '.ds-ack4-tiny{font-size:10px;font-style:italic;color:#555}' +
      '.ds-ack4-lines{display:flex;flex-direction:column;gap:6px;margin:8px 0 12px}' +
      '.ds-ack4-lines div{height:7px;background:#e3e6ec;border-radius:4px}' +
      '.ds-ack4-yes{display:flex;justify-content:space-between;font-size:11px;color:#555;padding:3px 0}' +
      '.ds-ack4-num-line{display:flex;gap:6px;align-items:center;font-size:11px;color:#8a8f98;margin:3px 0}' +
      '.ds-ack4-num-line div{flex:1;height:7px;background:#e3e6ec;border-radius:4px}' +
      '.ds-ack4-label{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0}' +
      '.ds-ack4-label.is-center{justify-content:center;text-align:center}' +
      '.ds-ack4-red{color:#c0392b;font-size:13px}' +
      '.ds-ack4-red.is-bold{font-weight:700}' +
      '.ds-ack4-box{flex:none;display:inline-flex;align-items:center;gap:4px;padding:3px;border-radius:6px}' +
      '.ds-ack4-box input{width:18px;height:18px;margin:0;accent-color:#1a4692;cursor:pointer}' +
      '.ds-ack4-box.is-on{background:#fef08a;box-shadow:0 0 0 3px #4060e8}' +
      '.ds-ack4-box.is-skip{background:var(--cha-warning-bg);box-shadow:0 0 0 3px #f59e0b}' +
      '.ds-ack4-num{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 5px;border-radius:999px;background:#111827;color:#fff;font-family:system-ui,sans-serif;font-size:11px;font-weight:700}' +
      '.ds-ack4-big{color:#1a4692;font-size:17px;font-weight:700;text-align:center;margin:14px 0 4px}' +
      '.ds-ack4-q{display:flex;gap:6px;align-items:flex-start;font-size:12px;line-height:1.4;margin:5px 0}' +
      '.ds-ack4-qn{flex:none;width:18px}' +
      '.ds-ack4-rep{font-size:11px;margin:6px 0}' +
      '.ds-ack4-sigbox{border:1px solid #cfd4dc;border-radius:4px;padding:10px;font-size:12px;color:#8a8f98;margin:8px 0}' +
      '.ds-ack4-sign{background:#5cb85c;color:#fff;text-align:center;font-weight:700;padding:10px;border-radius:4px;font-size:14px;opacity:0.6;margin-bottom:30px}';
    document.head.appendChild(st);
  }

  var ackTab = document.createElement('button');
  ackTab.type = 'button';
  ackTab.className = 'ds-tab';
  ackTab.setAttribute('data-tab', 'ack');
  ackTab.setAttribute('role', 'tab');
  ackTab.setAttribute('aria-selected', 'false');
  ackTab.textContent = 'ACKNOWLEDGMENT BOXES';
  tabsBar.appendChild(ackTab);

  var ackPanel = document.createElement('div');
  ackPanel.className = 'ds-panel';
  ackPanel.setAttribute('data-panel', 'ack');
  ackPanel.setAttribute('role', 'tabpanel');
  ackPanel.setAttribute('hidden', '');
  ackPanel.innerHTML = '<div class="ds-ack-root" id="dsAckCoachRoot"></div>';
  panelsWrap.appendChild(ackPanel);

  var DS_ACK_CHECK_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  function dsAckSteps() {
    var steps = [];
    var b;
    for (var s = 0; s < DOCUSIGN_ACK_BOXES.length; s++) {
      b = DOCUSIGN_ACK_BOXES[s];
      if (b.num >= 9 && b.num <= 18) {
        if (b.num === 9) {
          steps.push({
            num: '9-18',
            boxes: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            section: 'The 10 Working Owner questions',
            where: 'Under Additional Member Attestations',
            says: 'One box at the start of each of the 10 questions',
            script:
              'These are the same 10 questions you already said Yes to. Check all 10.',
            context: ''
          });
        }
        continue;
      }
      steps.push({
        num: String(b.num),
        boxes: [b.num],
        section: b.section,
        where: b.where,
        says: b.says,
        script: b.script,
        context: b.context,
        skip: !!b.skip
      });
    }
    return steps;
  }

  function dsAckStepDone(st) {
    if (st.skip) return __dsAckSkipDone;
    for (var i = 0; i < st.boxes.length; i++) {
      if (!__dsAckChecks[st.boxes[i]]) return false;
    }
    return true;
  }

  function dsAckPhoneHtml(curBoxes, curSkip) {
    function lines(n) {
      var w = [100, 96, 98, 88, 94, 72];
      var s = '<div class="ds-ack4-lines" aria-hidden="true">';
      for (var i = 0; i < n; i++) {
        s += '<div style="width:' + w[i % w.length] + '%"></div>';
      }
      return s + '</div>';
    }
    function bar(t) {
      return '<div class="ds-ack4-bar">' + t + '</div>';
    }
    function title(t, left) {
      return (
        '<div class="ds-ack4-title' +
        (left ? ' is-left' : '') +
        '">' +
        t +
        '</div>'
      );
    }
    function h4(t) {
      return '<div class="ds-ack4-h4">' + t + '</div>';
    }
    function field(a, b) {
      return (
        '<div class="ds-ack4-field"><span>' +
        a +
        '</span><span>' +
        b +
        '</span></div>'
      );
    }
    function box(n) {
      var on = curBoxes.indexOf(n) >= 0;
      return (
        '<span class="ds-ack4-box' +
        (on ? (curSkip ? ' is-skip' : ' is-on') : '') +
        '" id="dsAckPhoneBox' +
        n +
        '"><input type="checkbox" data-ack-box="' +
        n +
        '" aria-label="Box ' +
        n +
        '"' +
        (__dsAckChecks[n] ? ' checked' : '') +
        '>' +
        (on ? '<span class="ds-ack4-num">' + n + '</span>' : '') +
        '</span>'
      );
    }
    function red(t, bold) {
      return (
        '<span class="ds-ack4-red' +
        (bold ? ' is-bold' : '') +
        '">' +
        t +
        '</span>'
      );
    }
    function after(n, t, center) {
      return (
        '<div class="ds-ack4-label' +
        (center ? ' is-center' : '') +
        '">' +
        box(n) +
        red(t) +
        '</div>'
      );
    }
    function before(n, t, bold, left) {
      return (
        '<div class="ds-ack4-label' +
        (left ? '' : ' is-center') +
        '">' +
        red(t, bold) +
        box(n) +
        '</div>'
      );
    }
    var q10 = [
      'Do you acknowledge that you will be admitted as a Working Owner under <b>Section 5.01(c)</b> ...',
      'Do you understand that, as a Working Owner, you are expected to complete assigned activities ...',
      'Do you agree that the Company may assign projects to you at its discretion?',
      'Do you understand that you will receive a <b>Guaranteed Payment</b> for each response ...',
      'Do you acknowledge that you have been granted <b>three (3) Preferred Units</b> ...',
      'Do you understand that the Preferred Units are <b>not registered under the Securities Act of 1933</b> ...',
      'Do you understand that you are eligible to participate in Company benefit plans ...',
      'Do you agree to maintain the <b>confidentiality</b> of all Company information ...',
      'Do you understand that if you fail to meet the conditions of Working Owner status, the Company may exercise its <b>Call Right</b> ...',
      'Do you confirm that you have read and understood all the Terms and Conditions and the LLC Agreement ...'
    ];
    var h = '';
    var i;
    h +=
      '<div class="ds-ack4-top"><div class="ds-ack4-top-t">Electronic Signature</div><div class="ds-ack4-ph">[Enrollment company header]</div></div>';
    h += bar('Member Information');
    h +=
      field('Name', '[Client name]') +
      field('Address', '[Address]') +
      field('Phone', '[Phone]') +
      field('Email', '[Email]') +
      field('Date of birth', '[DOB]');
    h += bar('Product Information');
    h += h4('SmartChoice [1500 / 2500 / 3000 / 3500]');
    h +=
      field('Active date', '[MM/DD/YYYY]') +
      field('Monthly premium', '[$000.00]');
    h += h4('General Questions');
    h +=
      '<div class="ds-ack4-small">10 Working Owner questions, each answered <b>Yes</b></div>';
    h +=
      '<div class="ds-ack4-ph">[Add-on products show here only if sold]</div>';
    h += title('Population Science Management Working Owner Application');
    h += lines(4);
    h += h4('SmartChoice [plan]');
    h += h4('General Questions');
    for (i = 0; i < 10; i++) {
      h +=
        '<div class="ds-ack4-yes"><span>Question ' +
        (i + 1) +
        '</span><b>Yes</b></div>';
    }
    h += after(
      1,
      'By checking the box, Applicant certifies you are not applying on behalf any other individuals other than those who are considered dependents.'
    );
    h += title('Health Plan Enrollment');
    h += title(
      'AUTHORIZATION TO USE AND DISCLOSE PROTECTED HEALTH INFORMATION',
      true
    );
    for (i = 0; i < 11; i++) {
      h +=
        '<div class="ds-ack4-num-line"><span>' +
        (i + 1) +
        '.</span><div></div></div>';
    }
    h += lines(2);
    h += after(
      2,
      'By checking the box, you agree to the terms of this Authorization.',
      true
    );
    h += title('Medication Disclosures', true) + lines(5);
    h += title('Plan Type and Participant Coverage', true);
    h +=
      field('Plan Name', 'SmartChoice [plan]') +
      field('Pharmacy Plan', 'MyLiveDoc');
    h += lines(3);
    h += before(3, 'Confirmation: I agree to the above disclosures');
    h += title('PLAN TERMS AND CONDITIONS') + h4('Managed Care');
    h += lines(4) + lines(4);
    h += before(
      4,
      'I have read and understand the information set forth above:',
      true,
      true
    );
    h += lines(5);
    var mids = [
      'Rates and Contract Terms',
      'Billing and Collections',
      'Termination and Cancellation',
      'Summary of Benefits & Coverage',
      'Underwriting Guidelines',
      'Conditions of Plan Coordination'
    ];
    for (i = 0; i < mids.length; i++) {
      h += title(mids[i]) + lines(3);
    }
    h +=
      title('Terms and Conditions of Plan Participation') + lines(6) + lines(4);
    h += before(
      5,
      'Working Owner Confirmation: I agree to the terms above',
      true
    );
    h += title('Joinder Agreement') + lines(5);
    h += before(
      6,
      'Working Owner Confirmation: I agree to the above joinder agreement'
    );
    h += title('Spousal Consent');
    h +=
      '<div class="ds-ack4-small">I, [Spouse name], spouse of [Client name], acknowledge ...</div>';
    h += lines(4);
    h += before(
      7,
      'Spouse Confirmation: I agree to the above joinder agreement (if applicable)'
    );
    h += title('Member Information');
    h +=
      field('Full Name', '[Client name]') +
      field('SSN last 4', '[XXXX]') +
      field('Tobacco', '[Y/N]');
    h += title('Member Attestation') + lines(7);
    h += before(
      8,
      'Working Owner Confirmation: I agree to the above attestation',
      true
    );
    h += '<div class="ds-ack4-big">Additional Member Attestations</div>';
    h +=
      '<div class="ds-ack4-small is-center">Please check each of the following acknowledgements</div>';
    for (i = 0; i < 10; i++) {
      h +=
        '<div class="ds-ack4-q"><span class="ds-ack4-qn">' +
        (i + 1) +
        '.</span>' +
        box(9 + i) +
        '<span>' +
        q10[i] +
        '</span></div>';
    }
    h += title('Applicant Representations and Warranties');
    h +=
      '<div class="ds-ack4-tiny">Please read all 7 items below carefully as you will be required to initial each one ...</div>';
    for (i = 0; i < 7; i++) {
      h +=
        '<div class="ds-ack4-rep"><b>By Checking Below, I state that</b> <span class="ds-ack4-ph">[item ' +
        (i + 1) +
        ']</span></div>';
    }
    h += lines(2);
    h += before(19, 'Confirmation: I confirm that all of the above is true');
    h += '<div class="ds-ack4-ph">[Add-on terms show here only if sold]</div>';
    h += title('Payment Method') + field('Account', '[XXXX]');
    h += title('Electronic Signature');
    h += after(
      20,
      'Check here if signing as a Parent or Legal Guardian for the Primary Applicant'
    );
    h += '<div class="ds-ack4-sigbox">[Client types full name here]</div>';
    h += '<div class="ds-ack4-sign">Sign</div>';
    return h;
  }

  function renderAckCoach() {
    var root = document.getElementById('dsAckCoachRoot');
    if (!root) return;
    var steps = dsAckSteps();
    var total = steps.length;
    var i;
    var cur = __dsAckCoachIndex;
    if (cur >= total) cur = -1;
    var curBoxes = cur >= 0 ? steps[cur].boxes : [];
    var curSkip = cur >= 0 && !!steps[cur].skip;
    var doneCount = 0;
    for (i = 0; i < total; i++) {
      if (dsAckStepDone(steps[i])) doneCount++;
    }

    var rowsHtml = '';
    for (i = 0; i < total; i++) {
      var st = steps[i];
      var isDone = dsAckStepDone(st);
      if (i === cur) {
        rowsHtml +=
          '<div class="ds-ack3-row is-open' +
          (st.skip ? ' is-skip' : '') +
          '">' +
          '<div class="ds-ack3-open-top">' +
          '<div class="ds-ack3-mark is-big' +
          (st.skip ? ' is-skip' : ' is-current') +
          '">' +
          __dsAckEsc(st.num) +
          '</div>' +
          '<div class="ds-ack3-open-name">' +
          '<div class="ds-ack2-meta">' +
          (st.skip ? 'Box 20 - leave blank' : 'Box ' + __dsAckEsc(st.num)) +
          '</div>' +
          '<div class="ds-ack3-open-where">' +
          __dsAckEsc(st.where) +
          '</div></div></div>' +
          '<div class="ds-ack3-next">' +
          '<div class="ds-ack3-next-lbl">The box is next to</div>' +
          '<div class="ds-ack3-next-text">"' +
          __dsAckEsc(st.says) +
          '"</div></div>' +
          '<div class="ds-ack3-say">' +
          __dsAckEsc(st.script) +
          '</div>' +
          (st.context
            ? '<div class="ds-ack2-tip">' + __dsAckEsc(st.context) + '</div>'
            : '') +
          '<button type="button" class="ds-ack3-check' +
          (st.skip ? ' is-skip' : '') +
          '" data-ack-check="' +
          i +
          '">' +
          (st.skip ? 'Left blank, finish' : 'They checked it, next') +
          '</button>' +
          '</div>';
      } else {
        var cls = 'ds-ack3-row ds-ack3-closed';
        var mcls = 'ds-ack3-mark';
        var tag = '';
        if (isDone) {
          cls += ' is-done';
          mcls += ' is-done';
          tag = 'Done';
        } else if (st.skip) {
          cls += ' is-skip';
          mcls += ' is-skip';
          tag = 'Leave blank';
        }
        rowsHtml +=
          '<button type="button" class="' +
          cls +
          '" data-ack-open="' +
          i +
          '">' +
          '<span class="' +
          mcls +
          '">' +
          (isDone ? DS_ACK_CHECK_SVG : __dsAckEsc(st.num)) +
          '</span>' +
          '<span class="ds-ack3-short">' +
          __dsAckEsc(st.section) +
          '</span>' +
          '<span class="ds-ack3-tag">' +
          tag +
          '</span>' +
          '</button>';
      }
    }

    var asks =
      (window.docusignWalkthroughData &&
        window.docusignWalkthroughData.whatClientsAsk) ||
      [];
    var askHtml = '';
    for (i = 0; i < asks.length; i++) {
      var a = asks[i];
      var open = i === __dsAckAskOpen;
      var pb = '';
      var pbs = a.pushback || [];
      for (var p = 0; p < pbs.length; p++) {
        pb +=
          '<div class="ds-ack2-pb">' +
          '<div class="ds-ack2-pb-q">"' +
          __dsAckEsc(pbs[p].q) +
          '"</div>' +
          '<div class="ds-ack2-pb-a">' +
          __dsAckEsc(pbs[p].a) +
          '</div></div>';
      }
      askHtml +=
        '<div class="ds-ack2-ask' +
        (open ? ' is-open' : '') +
        '">' +
        '<button type="button" class="ds-ack2-ask-btn" data-ack-ask="' +
        i +
        '" aria-expanded="' +
        (open ? 'true' : 'false') +
        '">' +
        '<span class="ds-ack2-dot ds-ack2-dot-' +
        __dsAckEsc(a.severity || 'amber') +
        '" aria-hidden="true"></span>' +
        '<span class="ds-ack2-ask-title">' +
        __dsAckEsc(a.title) +
        '</span>' +
        '<span class="ds-ack2-ask-sign" aria-hidden="true">' +
        (open ? '-' : '+') +
        '</span>' +
        '</button>' +
        (open
          ? '<div class="ds-ack2-ask-body">' +
            '<div class="ds-ack2-ask-one">' +
            __dsAckEsc(a.oneLiner) +
            '</div>' +
            '<div class="ds-ack2-ask-say">' +
            '<div class="ds-ack2-lbl">Say this</div>' +
            '<div>' +
            __dsAckEsc(a.sayThis) +
            '</div></div>' +
            pb +
            '</div>'
          : '') +
        '</div>';
    }

    var oldPhone = document.getElementById('dsAckPhone');
    var keepScroll = oldPhone ? oldPhone.scrollTop : 0;

    root.innerHTML =
      '<div class="ds-ack2">' +
      '<div class="ds-ack3-head">' +
      '<div>' +
      '<h3 class="ds-ack2-title">SmartChoice e-sign boxes</h3>' +
      '<div class="ds-ack3-sub">The phone shows what the client sees. The box you are on lights up.</div>' +
      '</div>' +
      '<div class="ds-ack3-head-right">' +
      '<div class="ds-ack3-count">' +
      doneCount +
      ' of ' +
      total +
      ' done</div>' +
      '<button type="button" class="ds-ack3-reset" id="dsAckStartOver">Start over</button>' +
      '</div></div>' +
      '<div class="ds-ack2-cols">' +
      '<div class="ds-ack3-list">' +
      (doneCount === total
        ? '<div class="ds-ack2-done-msg" role="status">All boxes done. The client can sign.</div>'
        : '') +
      rowsHtml +
      '</div>' +
      '<div class="ds-ack4-wrap">' +
      '<div class="ds-ack4-tagline">Practice copy - no client info</div>' +
      '<div class="ds-ack4-phone"><div class="ds-ack4-screen" id="dsAckPhone">' +
      dsAckPhoneHtml(curBoxes, curSkip) +
      '</div></div>' +
      '<div class="ds-ack4-note">Gray lines stand in for the legal text. Box labels and section names match the real e-sign.</div>' +
      '</div>' +
      '<div class="ds-ack2-card ds-ack2-asks">' +
      '<div class="ds-ack2-lbl">What clients ask most</div>' +
      askHtml +
      '</div>' +
      '</div></div>';

    var phone = document.getElementById('dsAckPhone');
    if (phone) {
      phone.scrollTop = keepScroll;
      if (__dsAckScrollTo && curBoxes.length) {
        var target = document.getElementById('dsAckPhoneBox' + curBoxes[0]);
        if (target) {
          var top =
            target.getBoundingClientRect().top -
            phone.getBoundingClientRect().top +
            phone.scrollTop -
            160;
          if (phone.scrollTo) {
            phone.scrollTo({ top: top, behavior: 'smooth' });
          } else {
            phone.scrollTop = top;
          }
        }
      }
    }
    __dsAckScrollTo = false;

    if (!root.__dsAck4Bound) {
      root.__dsAck4Bound = true;
      root.addEventListener('change', function (e) {
        var t = e.target;
        if (!t || !t.hasAttribute || !t.hasAttribute('data-ack-box')) return;
        var bn = parseInt(t.getAttribute('data-ack-box'), 10);
        if (isNaN(bn)) return;
        __dsAckChecks[bn] = !!t.checked;
        renderAckCoach();
      });
      root.addEventListener('click', function (e) {
        var t = e.target.closest('button');
        if (!t || !root.contains(t)) return;
        var all = dsAckSteps();
        var v;
        var j;
        if (t.id === 'dsAckStartOver') {
          __dsAckChecks = [];
          __dsAckSkipDone = false;
          __dsAckCoachIndex = 0;
          __dsAckAskOpen = -1;
          __dsAckScrollTo = true;
        } else if (t.hasAttribute('data-ack-check')) {
          v = parseInt(t.getAttribute('data-ack-check'), 10);
          if (isNaN(v) || !all[v]) return;
          if (all[v].skip) {
            __dsAckSkipDone = true;
          } else {
            for (j = 0; j < all[v].boxes.length; j++) {
              __dsAckChecks[all[v].boxes[j]] = true;
            }
          }
          var nx = -1;
          for (j = v + 1; j < all.length; j++) {
            if (!dsAckStepDone(all[j])) {
              nx = j;
              break;
            }
          }
          if (nx === -1) {
            for (j = 0; j < all.length; j++) {
              if (!dsAckStepDone(all[j])) {
                nx = j;
                break;
              }
            }
          }
          __dsAckCoachIndex = nx;
          __dsAckScrollTo = true;
        } else if (t.hasAttribute('data-ack-open')) {
          v = parseInt(t.getAttribute('data-ack-open'), 10);
          if (isNaN(v)) return;
          __dsAckCoachIndex = v;
          __dsAckScrollTo = true;
        } else if (t.hasAttribute('data-ack-ask')) {
          v = parseInt(t.getAttribute('data-ack-ask'), 10);
          if (isNaN(v)) return;
          __dsAckAskOpen = __dsAckAskOpen === v ? -1 : v;
        } else {
          return;
        }
        renderAckCoach();
      });
    }
  }

  function activateDsTab(key) {
    var tabs = group.querySelectorAll('.ds-tab');
    var i;
    for (i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      var k = t.getAttribute('data-tab');
      var on = k === key;
      if (on) {
        t.classList.add('is-active');
        t.setAttribute('aria-selected', 'true');
      } else {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      }
    }
    var keys = ['ask', 'att', 'full', 'ack'];
    for (i = 0; i < keys.length; i++) {
      var pk = keys[i];
      var p = group.querySelector('[data-panel="' + pk + '"]');
      if (!p) continue;
      if (pk === key) {
        p.classList.add('is-active');
        p.removeAttribute('hidden');
      } else {
        p.classList.remove('is-active');
        p.setAttribute('hidden', '');
      }
    }
    if (key === 'ack') {
      renderAckCoach();
    }
  }

  tabsBar.addEventListener(
    'click',
    function (e) {
      var tab = e.target.closest('.ds-tab');
      if (!tab || !tabsBar.contains(tab)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      var key = tab.getAttribute('data-tab');
      if (search.value && search.value.trim()) {
        search.value = '';
        search.dispatchEvent(new Event('input', { bubbles: true }));
      }
      activateDsTab(key);
    },
    true
  );

  search.addEventListener(
    'input',
    function () {
      var v = (search.value || '').trim();
      var ackP = group.querySelector('[data-panel="ack"]');
      if (ackP) {
        if (v) {
          ackP.setAttribute('hidden', '');
        }
      }
    },
    true
  );
}, 0);
