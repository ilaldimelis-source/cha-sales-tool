/* js/course-215.js -- FL 2-15 Crash Course -- ES5 only, no arrow functions */
/* jshint esversion: 5 */

(function() {
'use strict';

/* ── QA200 DATA ── */
var QA200 = [
  {n:1,q:"The minimum age at which a person can sign a life insurance application is",a:"15 years",exp:"15 = applicant minimum. 18 = agent minimum. Very common trick -- do NOT mix these up.",t:"fl",trick:true},
  {n:2,q:"Under a life insurance policy, the ________ has the authority to name the beneficiary.",a:"Owner (policyowner)",exp:"The policyowner controls all policy rights. When owner and insured are both choices -- always pick owner.",t:"life"},
  {n:3,q:"Under Florida law, a variable annuity policyowner must be notified of the accumulated value of the contract",a:"Once each year",exp:"Florida requires at least annual notification of variable annuity accumulated value.",t:"fl"},
  {n:4,q:"W misstated age as 50 (true age was 59). What happens under the misstatement of age provision?",a:"Proceeds reduced based on what premium at age 59 would have purchased",exp:"Misstatement of age NEVER cancels the policy. Benefits are adjusted. No time limit on this provision.",t:"life"},
  {n:5,q:"An example of an unfair trade practice is",a:"An agent making a material misrepresentation to the insured",exp:"Misrepresentation = unfair trade practice. Replacement is legal. Denying claim within reasonable time is NOT unfair.",t:"trade"},
  {n:6,q:"What are adjustable rates for life policy loans in Florida based on?",a:"Moody's Corporate Bond Index",exp:"Florida-specific. Adjustable policy loan rates tied to Moody's Corporate Bond Index. Fixed rate cap = 10%.",t:"fl"},
  {n:7,q:"K made a fraudulent statement on her health insurance application. In the event of a claim, the insurance company is required to pay",a:"Nothing",exp:"Fraud voids the policy entirely. The incontestable clause does NOT protect fraud. Fraud is always contestable.",t:"trade",trick:true},
  {n:8,q:"What is Florida's definition of Life insurance replacement?",a:"A new policy is bought and an old policy is terminated",exp:"Both must occur: new policy purchased AND old policy terminated.",t:"fl"},
  {n:9,q:"When replacing or exchanging an annuity, the agent must disclose to the annuitant",a:"The possible tax ramifications as a result of the transaction",exp:"Switching annuities can trigger taxes and surrender charges -- the client must know.",t:"fl"},
  {n:10,q:"The Florida Employee Health Care Access Act was established to make",a:"Group health insurance available to employers with up to 50 employees",exp:"FEHCAA = group health for small employers (up to 50) on a guaranteed-issue basis.",t:"fl"},
  {n:11,q:"An example of unfair discrimination would be",a:"Offering different premiums for individuals of the same risk classification",exp:"Same risk = same premium. Charging different rates for same risk class = unfair discrimination.",t:"trade",trick:true},
  {n:12,q:"The free-look period for all qualified Long-term care policies sold in Florida is __ days.",a:"30 days",exp:"LTC free-look = 30 days in Florida. Same as Medicare Supplement.",t:"fl"},
  {n:13,q:"The waiting period for a pre-existing condition under a Medicare Supplement policy may NOT go beyond",a:"6 months",exp:"Maximum 6-month pre-existing condition exclusion for Medicare Supplement policies.",t:"health"},
  {n:14,q:"Convincing a prospective insured to buy based on exaggerations is called",a:"Twisting",exp:"Twisting = using misrepresentation or exaggeration to convince someone to replace existing policy. Different company required.",t:"trade"},
  {n:15,q:"Which two entities regulate variable annuities?",a:"Department of Financial Services (DFS) and Securities Exchange Commission (SEC)",exp:"Variable = insurance + securities = two regulators. DFS handles insurance side, SEC handles securities side.",t:"fl",trick:true},
  {n:16,q:"Defamation occurs when an agent makes a false statement intended to",a:"Malign another insurer",exp:"False statements to damage a competitor's reputation. Must be FALSE to be defamation.",t:"trade"},
  {n:17,q:"Which of the following is NOT an unfair claim settlement practice?",a:"Needing written documentation of claim details",exp:"Requiring written documentation is completely normal and NOT unfair. Failing to respond, offering too little, and not acting ARE unfair.",t:"trade",trick:true},
  {n:18,q:"When is a Group Health policy required to provide coverage for a newborn child?",a:"At the moment of birth",exp:"No waiting period. No notification required. No extra premium needed first. Coverage begins at birth.",t:"health",trick:true},
  {n:19,q:"Omitting information that affects the issuance or the rate of an insurance contract is called:",a:"Concealment",exp:"Concealment = intentionally omitting information that would affect policy issuance or rate.",t:"trade"},
  {n:20,q:"Within how many days after policy delivery can a Medicare Supplement policy be returned for a 100% premium refund?",a:"30 days",exp:"Medicare Supplement free-look = 30 days from delivery.",t:"fl"},
  {n:21,q:"A life insurance policyowner would like to file a complaint against a life insurance agent. In Florida, the entity that oversees these complaints is the",a:"Department of Financial Services (DFS)",exp:"DFS = agents and complaints. OIR = insurance companies. FIGA = insolvency. NAIC = advisory only.",t:"fl"},
  {n:22,q:"When is it acceptable to share commissions with another agent?",a:"As long as both agents are licensed for the same lines of insurance",exp:"Both must hold licenses for the same lines. Same company or same state do not matter.",t:"fl"},
  {n:23,q:"Which organization was established to provide funds to protect an insured in the event of an insurer's insolvency?",a:"Florida Insurance Guaranty Fund Association (FIGA)",exp:"FIGA protects policyholders when an insurer becomes insolvent. Funded by insurance companies.",t:"fl"},
  {n:24,q:"In Florida, deceptive advertising is considered to be",a:"A form of misrepresentation",exp:"Florida law specifically classifies deceptive advertising as a form of misrepresentation.",t:"fl"},
  {n:25,q:"A mutual insurance company vs a stock insurance company -- what is the main contrast?",a:"Stock owned by shareholders; mutual owned by policyholders",exp:"Stock = shareholders, non-participating. Mutual = policyholders, participating, pays dividends.",t:"life"},
  {n:26,q:"According to Florida law, group life insurance conversion privileges must NOT",a:"Require evidence of insurability",exp:"Converting group life to individual = NO health exam required. That is the point of the conversion privilege.",t:"fl",trick:true},
  {n:27,q:"According to Florida's rules on disclosure, a life insurance applicant is expected to be provided with",a:"A Buyer's Guide and Policy Summary",exp:"Both required: Buyer's Guide AND Policy Summary. Every life insurance applicant in Florida.",t:"fl"},
  {n:28,q:"Within how many days must a licensee notify the DFS of a change in address?",a:"30 days",exp:"Agent must notify DFS within 30 days of any address change.",t:"fl"},
  {n:29,q:"All of the following will result in the suspension of an agent's license EXCEPT",a:"Acting with fiduciary responsibility",exp:"Fiduciary responsibility is REQUIRED -- it is good behavior, not a violation. Misrepresentation, forgery, and felonies will get you suspended.",t:"fl",trick:true},
  {n:30,q:"All of these are a prerequisite for becoming a licensed agent EXCEPT",a:"Graduate from high school",exp:"NO high school diploma required. Requirements: be 18, FL resident, complete prelicensing course, pass exam.",t:"fl",trick:true},
  {n:31,q:"If an agent would like to sell Variable annuities, which state examination must the agent pass?",a:"Life and Variable Contracts",exp:"Variable annuities require the Life and Variable Contracts exam -- not just the regular life exam.",t:"fl"},
  {n:32,q:"An agent selling Medicare Supplement policies must provide every applicant with a(n)",a:"Suitability form",exp:"Must be given to EVERY Medicare Supplement applicant without exception.",t:"health"},
  {n:33,q:"K is an agent who made an improper sale of an annuity. Which corrective action would the DFS likely order?",a:"Pay monetary restitution to the client",exp:"DFS can require agent to personally repay the client from agent's own funds for an improper sale.",t:"fl"},
  {n:34,q:"J told a claimant that his rights might be impaired if he does not complete a release form within a specified time. What could J be guilty of?",a:"Coercion",exp:"Threatening someone's rights to pressure them into signing = coercion.",t:"trade"},
  {n:35,q:"Nonprofit life insurance providers covered by a special section in the Florida insurance code are called",a:"Fraternal life insurance organizations",exp:"Fraternal = nonprofit lodge-based organizations with a special section in FL insurance code.",t:"fl"},
  {n:36,q:"Asset protection can be provided by a long-term care partnership policy if the policyholder qualifies for",a:"Medicaid",exp:"LTC partnership policies protect assets from Medicaid spend-down. Dollar-for-dollar asset protection.",t:"health"},
  {n:37,q:"T is an agent reminded that he has a responsibility to handle clients' funds in an honest and ethical manner. This is referred to as",a:"Fiduciary responsibility",exp:"Fiduciary responsibility = handling money honestly and ethically for clients and insurers.",t:"fl"},
  {n:38,q:"Employers with less than __ employees are affected by Florida's Health Insurance Coverage Continuation Act (Mini COBRA).",a:"20 employees",exp:"Mini-COBRA (FL) = fewer than 20 employees. Federal COBRA = 20+ employees.",t:"fl"},
  {n:39,q:"A Key Employee policy is taken out by Company X on its VP. The employee later leaves for Company Y. If the employee dies and the policy is unchanged, where do proceeds go?",a:"Company X",exp:"Company X still owns it, pays premiums, receives proceeds. Employee leaving has no effect on policy.",t:"life",trick:true},
  {n:40,q:"The individual most likely to buy a Medicare Supplement policy would be a(n):",a:"68-year old male covered by Medicare",exp:"Medicare Supplement fills Medicare's gaps. Must already be ON Medicare. Not for Medicaid recipients.",t:"health"},
  {n:41,q:"Under a Long Term Care policy, which benefit would typically be excluded or limited?",a:"Alcohol rehabilitation",exp:"Alcohol rehabilitation is typically excluded or limited under LTC policies.",t:"health"},
  {n:42,q:"What is the excise tax rate the IRS imposes on individuals age 73+ who do not take required minimum distributions?",a:"25%",exp:"25% excise tax for skipping RMDs at age 73+.",t:"life"},
  {n:43,q:"To be eligible for Social Security disability benefits, an employee must be unable to perform:",a:"Any occupation",exp:"Social Security = cannot perform ANY occupation. Very strict standard vs. own occupation disability policies.",t:"health",trick:true},
  {n:44,q:"The individual Health Insurance policy that offers the broadest protection is a(n)",a:"Major Medical policy",exp:"Major Medical = broadest coverage. Fewer limitations than basic plans.",t:"health"},
  {n:45,q:"When does a life insurance contract become effective if the initial premium is not collected during the application process?",a:"When producer delivers policy and collects initial premium",exp:"All three must happen: delivery + premium payment + good health statement.",t:"life"},
  {n:46,q:"All are true statements regarding the underwriting process, EXCEPT:",a:"AIDS and HIV virus exams can be conducted in a discriminatory fashion",exp:"HIV/AIDS testing CANNOT be discriminatory -- must be done uniformly. Written consent required.",t:"life",trick:true},
  {n:47,q:"Consumer reports requested by an underwriter can be used to determine:",a:"Probability of making timely premium payments",exp:"Consumer/credit reports assess financial reliability -- not health or tobacco use.",t:"life"},
  {n:48,q:"All of the following statements about Major Medical benefits are true, EXCEPT:",a:"Benefits have no maximum limit",exp:"Major Medical DOES have maximums. The false statement is no maximum limit.",t:"health",trick:true},
  {n:49,q:"Which of these Nonforfeiture Options continues a build-up of cash value?",a:"Reduced Paid-Up",exp:"Reduced Paid-Up = ONLY nonforfeiture option that keeps building cash value. Extended Term does NOT.",t:"life",trick:true},
  {n:50,q:"K is an insured under a life insurance policy owned by a third party. Which statement is true?",a:"K has no ownership rights",exp:"Only the policyowner exercises policy rights. Insured under third-party owned policy has zero control.",t:"life"},
  {n:51,q:"A statement on an insurance application that must be true to the best of one's knowledge is known as:",a:"A representation",exp:"Representation = true to best of knowledge. Warranty = guaranteed absolutely true (any error voids policy).",t:"life"},
  {n:52,q:"T cash surrenders a life policy and requests proceeds payable to an unrelated third party. T would likely be red-flagged for violation of",a:"Anti-money laundering rules",exp:"Proceeds to unrelated third party = classic money laundering red flag under USA PATRIOT Act.",t:"life"},
  {n:53,q:"All of these statements about the Waiver of Premium provision are correct, EXCEPT:",a:"Insured must be eligible for Social Security disability for claim to be accepted",exp:"Social Security disability is NOT required. Waiver of Premium has its own policy-defined disability standard.",t:"life",trick:true},
  {n:54,q:"Which provision prevents an insurer from changing terms by referring to documents not found within the policy?",a:"Entire Contract Provision",exp:"Entire Contract = WYSIWYG. Everything that is part of the contract must be IN the policy.",t:"life"},
  {n:55,q:"Which policy has flexible premium and death benefit and allows policyowner control of the investment aspect?",a:"Variable Universal Life",exp:"Flexible premiums (universal) + investment control (variable) = Variable Universal Life.",t:"life"},
  {n:56,q:"Which policy feature allows an insured to defer current health charges to the following year's deductible?",a:"Carryover provision",exp:"Carryover = last 3 months of the year expenses can count toward next year's deductible.",t:"health"},
  {n:57,q:"A firm would stand to lose a lot of money if its project manager died. Which type of policy should it purchase?",a:"Key Person Life Policy",exp:"Company owns it, pays premiums, receives proceeds to offset financial loss from losing a key employee.",t:"life"},
  {n:58,q:"P notices 5 questions on a life application were not answered. What should P do?",a:"Set up a meeting with the applicant to answer the remaining questions",exp:"Must meet in person -- applicant must initial any changes. Never submit incomplete.",t:"life"},
  {n:59,q:"Information obtained from a phone conversation to the proposed insured can be found in which report?",a:"Inspection report",exp:"Inspection reports can include phone conversation info, interviews with neighbors, associates, etc.",t:"life"},
  {n:60,q:"A pilot declines an additional premium modification for risk. The insurer will likely issue coverage with a(n)",a:"Aviation Exclusion",exp:"When substandard applicant declines extra premium, insurer may issue with an exclusion for that specific risky activity.",t:"life"},
  {n:61,q:"How long does coverage normally remain on a limited-pay life policy?",a:"Age 100",exp:"Limited-Pay = pay for a set period, but coverage lasts entire life until death or age 100.",t:"life"},
  {n:62,q:"The cash value in a(n) ____________ Life policy may fluctuate to reflect changing mortality cost, interest, and expense factors.",a:"Universal Life",exp:"Universal Life is the unbundled policy where cash value fluctuates based on all three visible components.",t:"life"},
  {n:63,q:"When funds are shifted directly from one IRA to another IRA, what percentage of tax is withheld?",a:"None (0%)",exp:"Direct trustee-to-trustee IRA transfers have ZERO withholding. Money never passes through your hands.",t:"life"},
  {n:64,q:"Which of the following situations does a Critical Illness plan cover?",a:"Leukemia",exp:"Critical Illness = specific listed conditions like cancer, heart attack, stroke. NOT asthma or accidents.",t:"health"},
  {n:65,q:"How long does an individual have to rollover funds from an IRA or qualified plan?",a:"60 days",exp:"Rollover must be completed within 60 days or income taxes AND 10% penalty apply.",t:"life"},
  {n:66,q:"Which provision states who may select policy options, designate beneficiaries, and receive financial benefits?",a:"Owner's Rights provision",exp:"Owner's Rights provision spells out exactly who controls the policy and all associated financial benefits.",t:"life"},
  {n:67,q:"J let her life insurance policy lapse 8 months ago. She can reestablish coverage under which provision?",a:"Reinstatement provision",exp:"Reinstatement = restore lapsed policy with proof of insurability, back premiums, outstanding loans + interest.",t:"life"},
  {n:68,q:"A company that owns a Key Person policy may do all of the following EXCEPT",a:"Change the policy's interest rate",exp:"The INSURER sets interest rates, not the policyowner. Company can cancel, change beneficiary, and borrow against cash value.",t:"life",trick:true},
  {n:69,q:"A life policy with death benefit and cash value that fluctuate according to the performance of its underlying investment portfolio is:",a:"Variable Life",exp:"Variable Life = both death benefit and cash value fluctuate with investments. Policyholder bears risk.",t:"life"},
  {n:70,q:"B receives yearly dividends and interest from a participating life insurance policy. Which should B include as gross income?",a:"Interest only",exp:"Policy dividends = return of premium = NOT taxable. Interest earned ON those dividends IS taxable.",t:"life",trick:true},
  {n:71,q:"An individual personally received eligible rollover funds from a profit-sharing plan. What is the income tax withholding requirement?",a:"20% is withheld for income taxes",exp:"20% is withheld when you personally receive a rollover check. Must roll over within 60 days.",t:"life"},
  {n:72,q:"A characteristic of Preferred Provider Organizations (PPOs) would be:",a:"Discounted fees for the patient",exp:"PPO providers offer pre-negotiated discounts. No PCP required. Out-of-network IS allowed. Capitation = HMO only.",t:"health"},
  {n:73,q:"What does a Face Amount Plus Cash Value Policy pay upon the insured's death?",a:"Face amount plus the policy's cash value",exp:"This policy pays BOTH the death benefit AND the accumulated cash value upon death.",t:"life"},
  {n:74,q:"At what time must a policyowner have insurable interest on the insured for the life policy to be valid?",a:"At the time of application",exp:"Insurable interest for life/health = only required when policy is PURCHASED. NOT required at time of death.",t:"life",trick:true},
  {n:75,q:"What type of policy would only provide coverage for specific types of illnesses (cancer, stroke, etc.)?",a:"Dread Disease insurance",exp:"Dread Disease (Critical Illness) = covers only specific listed conditions.",t:"health"},
  {n:76,q:"Who has the right to change a revocable beneficiary?",a:"Policyowner",exp:"Policyowner can change revocable beneficiary at any time, without beneficiary's permission.",t:"life"},
  {n:77,q:"A variable insurance policy:",a:"Does not guarantee a return on its investment accounts",exp:"Policyholder assumes ALL investment risk. Returns depend entirely on market performance. No guarantees.",t:"life"},
  {n:78,q:"The USA Patriot Act was enacted in:",a:"2001",exp:"Enacted after September 11, 2001. Requires insurance companies to establish anti-money laundering programs.",t:"life"},
  {n:79,q:"What type of life insurance gives the greatest amount of coverage for a limited period of time?",a:"Term life",exp:"Term life = greatest coverage for lowest cost for a specified period. Pure protection, no cash value.",t:"life"},
  {n:80,q:"The amount of coverage on a group credit life policy is limited to:",a:"The insured's total loan value",exp:"Group credit life coverage = 100% of the outstanding debt amount -- no more.",t:"life"},
  {n:81,q:"How would a contingent beneficiary receive proceeds in an AD&D policy?",a:"If the primary beneficiary dies before the insured",exp:"Contingent beneficiary only receives proceeds when the primary beneficiary has predeceased the insured.",t:"life"},
  {n:82,q:"Variable Whole Life Insurance can be described as:",a:"Both an insurance and securities product",exp:"Variable Life = regulated by DFS (insurance) AND SEC (securities). Always both.",t:"life"},
  {n:83,q:"At what point does a Whole Life Insurance policy endow?",a:"When the cash value equals the death benefit",exp:"Endowment point = cash value equals face amount, typically at age 100.",t:"life"},
  {n:84,q:"A Universal Life policy is called unbundled because the owner can see the interest earned, cost of insurance, and the",a:"Expense charges",exp:"The three unbundled Universal Life components: interest earned, cost of insurance, and expense charges.",t:"life"},
  {n:85,q:"Generally, how long is a benefit period for a Major Medical Expense Plan?",a:"One year",exp:"Typical benefit period for Major Medical Expense plan = one year.",t:"health"},
  {n:86,q:"Which of the following statements about the classification of applicants is INCORRECT?",a:"Substandard applicants are never declined by underwriters",exp:"FALSE -- substandard CAN be declined, issued at higher rates, or issued with exclusions.",t:"life",trick:true},
  {n:87,q:"T has a $50,000 life policy with an AD&D rider. Five years later, T commits suicide. How much will the insurer pay?",a:"$50,000",exp:"Base life policy pays after the suicide clause period (5 years in force). AD&D does NOT pay for suicide.",t:"life",trick:true},
  {n:88,q:"Which of these life products is NOT considered interest-sensitive?",a:"Modified Whole Life",exp:"Modified Whole Life = NOT interest-sensitive. Variable Life, Interest-Sensitive WL, and Variable Universal Life ARE.",t:"life",trick:true},
  {n:89,q:"Which of the following costs would a Basic Hospital/Surgical policy likely cover?",a:"Surgically removing a facial birthmark",exp:"Surgical procedure = covered. Lost income, nursing home care, and war injuries are excluded.",t:"health"},
  {n:90,q:"Premature IRA distributions are assessed a penalty tax of:",a:"10%",exp:"10% penalty on premature IRA distributions before age 59.5, PLUS regular income taxes.",t:"life"},
  {n:91,q:"Why must an insurance applicant answer all questions on the application?",a:"Statements and representations on the application are part of the consideration for issuing a policy",exp:"Application answers form part of the consideration (exchange of value) making the contract binding.",t:"life"},
  {n:92,q:"Which statement is correct regarding premium payment schedule for whole life policies?",a:"Premiums are payable throughout the insured's lifetime; coverage lasts until death",exp:"This describes Straight Whole Life specifically.",t:"life"},
  {n:93,q:"A policy of adhesion can only be modified by whom?",a:"The insurance company",exp:"Contract of adhesion = written entirely by the insurer. Applicant takes it or leaves it. Ambiguity favors the insured.",t:"life"},
  {n:94,q:"The provision that can be used to put an insurance policy back in force after it has lapsed due to nonpayment is called:",a:"Reinstatement",exp:"Reinstatement = restore lapsed policy with proof of insurability, back premiums, outstanding loans + interest.",t:"life"},
  {n:95,q:"On a life insurance policy, who is qualified to change the beneficiary designation?",a:"Policyowner",exp:"Only the policyowner can change a revocable beneficiary. Insurer does not control this.",t:"life"},
  {n:96,q:"Agent J sends application and premium check to insurer. Check was made out to J instead of insurer. What should J do?",a:"Return to customer, collect a new check made out to the insurance company, and send it",exp:"Never alter a check. Never deposit client funds in personal account. Get a brand new check made correctly.",t:"fl"},
  {n:97,q:"Taking receipt of premiums and holding them for the insurance company is an example of:",a:"Fiduciary responsibility",exp:"Collecting and properly holding premiums for the insurance company = appropriate fiduciary behavior.",t:"fl"},
  {n:98,q:"What action should a producer take if the initial premium is NOT submitted with the application?",a:"Keep the application until premium is paid",exp:"No receipt given without premium. Do not forward without premium.",t:"life"},
  {n:99,q:"K (insured) and P (sole beneficiary) both die in accident. K dies before P. Under Common Disaster provision:",a:"Proceeds will be payable to K's estate if P dies within a specified time",exp:"Common Disaster provision protects against proceeds going to P's estate if P dies shortly after K.",t:"life"},
  {n:100,q:"The provision that limits the time period during which the company may dispute a health claim's validity is called:",a:"Time Limit on Certain Defenses",exp:"Limits how long insurer can dispute based on application misstatements (typically 2-3 years). After that = incontestable.",t:"health"},
  {n:101,q:"K pays on a $20,000 20-Year Endowment for 10 years and dies from an auto accident. How much does the insurer pay?",a:"$20,000 death benefit",exp:"Endowment pays face amount upon death (during term) OR survival to end. Death during term = full face amount.",t:"life"},
  {n:102,q:"P loses an arm in a farm accident and is paid $10,000 from his AD&D policy. This benefit is known as the",a:"Capital Sum",exp:"Loss of ONE limb or eye = Capital Sum (50% of face). Loss of BOTH or death = Principal Sum (100%).",t:"life"},
  {n:103,q:"C's premium is due September 1. C forgets and is hospitalized September 10. How will the insurer handle the claim?",a:"Pay the claim in full minus the premium due",exp:"31-day grace period means coverage continues through September. Claim is valid -- unpaid premium is deducted from payout.",t:"health"},
  {n:104,q:"X has a DI policy covering until age 65. Insurer can change premium rate for the overall risk class. Which renewability feature?",a:"Guaranteed Renewable",exp:"Cannot cancel but CAN raise premiums for the entire risk class. Noncancellable = premiums can NEVER increase.",t:"health"},
  {n:105,q:"M is disabled 6 months, dies from complications. DI policy pays $2,000/month. What is owed to her estate?",a:"Earned, but unpaid benefits",exp:"Benefits that accrued but were not yet paid are owed to the estate.",t:"health"},
  {n:106,q:"Which of these is an element of a Single Premium annuity?",a:"Lump-sum payment",exp:"Single Premium annuity = purchased with one lump-sum payment upfront.",t:"annuity"},
  {n:107,q:"How does group insurance differ from individual insurance?",a:"Premiums are lower",exp:"Group insurance = lower premiums due to lower admin and selling costs. No evidence of insurability required.",t:"life"},
  {n:108,q:"A 45-year-old bought an annuity that pays $1,500/month beginning at age 60. Which annuity did she purchase?",a:"Deferred Fixed annuity",exp:"DEFERRED = payments start later (age 60). FIXED = guaranteed $1,500/month. Not immediate, not variable.",t:"annuity"},
  {n:109,q:"Who makes the legally enforceable promises in a unilateral insurance policy?",a:"Insurance company",exp:"Unilateral = only ONE party makes legally enforceable promises -- the insurer. Insured can stop paying with no legal consequences.",t:"life"},
  {n:110,q:"S received a $500,000 lump sum buyout and wants guaranteed income for life immediately. What type of annuity is best?",a:"Single Premium (Immediate) annuity",exp:"One lump sum + income starts right away + lasts for life = Single Premium Immediate Annuity.",t:"annuity"},
  {n:111,q:"What is the elimination period of an individual disability policy?",a:"Time period a disabled person must wait before benefits are paid",exp:"No benefits during elimination period. Like a time-based deductible. Longer elimination = lower premium.",t:"health"},
  {n:112,q:"Disability policies do NOT normally pay for disabilities arising from which of the following?",a:"War",exp:"War is a standard exclusion in disability policies.",t:"health"},
  {n:113,q:"Which is the MOST important factor when deciding how much Disability Income coverage to purchase?",a:"Applicant's monthly income",exp:"DI replaces lost income -- the amount of income to replace determines how much coverage is needed.",t:"health"},
  {n:114,q:"Which of the following are Equity Indexed annuities typically invested in?",a:"S&P 500",exp:"Equity Indexed Annuities = linked to a stock market index (typically S&P 500) with a floor to protect against losses.",t:"annuity"},
  {n:115,q:"Which of the following is NOT included in an annuity contract?",a:"AD&D rider",exp:"AD&D is a life insurance rider -- NOT in annuity contracts. Annuities DO have: free-look period, beneficiaries, nonforfeiture benefits.",t:"annuity",trick:true},
  {n:116,q:"Which statement concerning an Individual Straight Life annuity is accurate?",a:"Payments are made to an annuitant for life",exp:"Straight Life annuity pays as long as the annuitant lives, then stops. Nothing to beneficiaries.",t:"annuity"},
  {n:117,q:"B is a teacher injured in a car accident, cannot work, and is receiving monthly benefits. Which type of policy does B have?",a:"Disability Income policy",exp:"DI = pays monthly income replacement when insured cannot work due to injury or illness.",t:"health"},
  {n:118,q:"S dies while in the process of converting her group life insurance to an individual policy. What happens to the claim?",a:"Full benefits are payable under the Master contract",exp:"If insured dies DURING conversion period, full death benefits are payable under the group (master) contract.",t:"life"},
  {n:119,q:"What is the basic function of an annuity?",a:"The systematic liquidation of accumulated funds",exp:"Annuity = pays out savings in regular installments. Opposite of life insurance which accumulates to pay a lump sum at death.",t:"annuity"},
  {n:120,q:"Which type of provider is known for stressing preventative medical care?",a:"Health Maintenance Organizations (HMOs)",exp:"HMOs emphasize PREVENTIVE care to keep members healthy and reduce expensive future claims.",t:"health"},
  {n:121,q:"Which of these statements is INCORRECT regarding a PPO?",a:"PPOs are NOT a type of managed care systems",exp:"FALSE -- PPOs ARE managed care. Both HMO and PPO are managed care. This is the #1 most common trick question on the exam.",t:"health",trick:true},
  {n:122,q:"HIPAA portability rules -- what do they offer a person changing from one group plan to another?",a:"Limits the ability of a new employer plan to exclude coverage for preexisting conditions",exp:"Based on prior creditable coverage. Does NOT guarantee coverage or require employers to offer health coverage.",t:"health"},
  {n:123,q:"What is issued to each employee of an employer health plan?",a:"Certificate",exp:"Group plan employees receive a certificate of coverage. The employer holds the master policy.",t:"health"},
  {n:124,q:"Under which circumstances will COBRA continuation coverage end?",a:"All group health plans are terminated by the employer",exp:"COBRA ends when employer terminates ALL group health plans. Moving, becoming uninsurable, or disability do NOT end COBRA.",t:"health",trick:true},
  {n:125,q:"The premiums for continued health insurance coverage under COBRA are paid for by the",a:"Employee",exp:"Employee pays 100% of COBRA premiums (up to 102% of group rate). Former employer no longer contributes.",t:"health"},
  {n:126,q:"COBRA gives workers whose employment has been terminated the right to:",a:"Continue group health benefits",exp:"COBRA = continuation of the SAME group health coverage for a limited period after job loss.",t:"health"},
  {n:127,q:"If S dies, the company must allow his surviving spouse and dependents to continue COBRA coverage for maximum of how many months?",a:"36 months",exp:"Employee DIES = 36 months COBRA. Job loss = 18 months. Death, divorce, dependents aging out = 36 months.",t:"health",trick:true},
  {n:128,q:"A departing employee decides to continue group coverage through COBRA. Who pays the premium?",a:"The employee",exp:"When you leave a job, former employer stops contributing. Employee pays up to 102% of group rate.",t:"health"},
  {n:129,q:"A group major medical policyholder providing benefits on a self-funding basis may limit its total liability for claims by purchasing",a:"A stop-loss contract",exp:"Stop-loss contract = caps the self-funded group's total liability once total claims exceed a threshold.",t:"health"},
  {n:130,q:"A stock insurance company is:",a:"Owned exclusively by its shareholders",exp:"Stock company = owned by shareholders. Customers get no policy dividends.",t:"life"},
  {n:131,q:"The part of a life insurance policy guaranteed to be true is called a(n):",a:"Warranty",exp:"Warranty = guaranteed absolutely true. If wrong (even by mistake) = voids policy. Representation = true to best knowledge only.",t:"life",trick:true},
  {n:132,q:"T has a $50,000 life policy with AD&D rider. T commits suicide after 5 years in force. Insurer pays?",a:"$50,000 (base life policy only, not AD&D)",exp:"Base life policy pays after suicide clause period (5 years in force). AD&D does NOT pay for suicide.",t:"life",trick:true},
  {n:133,q:"A(n) _________ beneficiary may be changed by the policyowner WITHOUT the consent of the beneficiary.",a:"Revocable beneficiary",exp:"Revocable = can be changed anytime without consent. Irrevocable = requires beneficiary's written consent to change.",t:"life"},
  {n:134,q:"Which of the following MUST be included in a Medicare Supplement policy's Outline of Coverage?",a:"The policy's limitations and exceptions",exp:"Limitations and exceptions are required in the Medicare Supplement Outline of Coverage.",t:"health"},
  {n:135,q:"G purchased a Family Income policy at age 40 with a 20-year rider. G dies at age 50. Family receives income for how long?",a:"10 years",exp:"The rider period runs from the date of PURCHASE (age 40), not death. G dies at 50 = 10 years into the 20-year period. 10 years remain.",t:"life"},
  {n:136,q:"A father dies 3 years after buying a life policy on his infant daughter. Premiums waived under which provision?",a:"Payor provision",exp:"PAYOR PROVISION for juvenile policies. If the payor (parent/guardian) dies or is disabled, premiums are waived.",t:"life"},
  {n:137,q:"Which statement about PPOs is INCORRECT?",a:"PPOs are NOT a type of managed care systems",exp:"FALSE -- PPOs ARE managed care. Both HMO and PPO = managed care. Most tested trick on the exam.",t:"health",trick:true},
  {n:138,q:"COBRA -- employee dies. How long does surviving spouse get COBRA?",a:"36 months",exp:"Employee DEATH = 36 months. Job loss = 18 months. 36 months also applies to divorce and dependents aging out.",t:"health"},
  {n:139,q:"What does the Florida Employee Health Care Access Act require?",a:"Small group benefit plans to be issued on a guarantee-issue basis",exp:"All small group plans (up to 50 employees) must accept all applicants -- cannot deny.",t:"fl"},
  {n:140,q:"Which provision prevents insurer from changing contract terms by referencing outside documents?",a:"Entire Contract Provision",exp:"Entire Contract = WYSIWYG. Everything that is part of the contract must be IN the policy.",t:"life"},
  {n:141,q:"A Business Overhead Expense policy would cover which of the following if a business owner becomes disabled?",a:"Utilities and office rent",exp:"BOE covers business expenses: rent, utilities, employee salaries. NOT owner's own salary.",t:"health",trick:true},
  {n:142,q:"Stock vs Mutual: which issues participating policies and pays policy dividends?",a:"Mutual company",exp:"Mutual = policyholders own it + participating + pays policy dividends (return of premium = not taxable).",t:"life"},
  {n:143,q:"An insured must notify an insurer of a medical claim within ___ days after an accident.",a:"20 days",exp:"Notice of claim = 20 days after accident (or as soon as reasonably possible).",t:"health"},
  {n:144,q:"Which Federal law allows an insurer to obtain an inspection report on a potential insured?",a:"Fair Credit Reporting Act (FCRA)",exp:"FCRA governs collection and use of consumer credit information including inspection reports.",t:"life"},
  {n:145,q:"The Legal Actions provision is designed to do all of the following EXCEPT:",a:"Protect the producer",exp:"Legal Actions provision protects the INSURED (not the producer) and gives insurer adequate time to research claims.",t:"life",trick:true},
  {n:146,q:"Which of the following BEST describes a warranty?",a:"Statement guaranteed to be true",exp:"Warranty = guaranteed absolutely true. Representation = true to best of knowledge. Any warranty error can void the policy.",t:"life"},
  {n:147,q:"Which type of life insurance allows the policyowner to have level premiums and choose from investment options?",a:"Variable Life",exp:"Variable Life = level/fixed premiums + investment option choices. Universal = flexible NOT level premiums.",t:"life"},
  {n:148,q:"What must an insurer obtain to conduct an HIV test?",a:"Written consent",exp:"Florida requires written consent before any HIV testing. Must also be conducted uniformly.",t:"fl"},
  {n:149,q:"Replacement is",a:"Closely regulated and requires full disclosure",exp:"Replacement is legal but closely regulated. Agent must notify both old and new insurers. Full disclosure required.",t:"fl"},
  {n:150,q:"Which organization makes reimbursement payments directly to the insured for covered medical expenditures?",a:"Commercial insurer",exp:"Commercial insurers pay reimbursements directly to insured. HMOs and PPOs typically pay providers directly.",t:"health"},
  {n:151,q:"A long-term care lapse notice must be delivered to both the applicant and",a:"Secondary addressee",exp:"LTC lapse notice goes to policyholder AND a designated secondary addressee at least 30 days before cancellation.",t:"health"},
  {n:152,q:"In Florida, which agency is responsible for the rehabilitation or liquidation of insurers?",a:"Department of Financial Services (DFS)",exp:"DFS handles rehabilitation and liquidation of failing insurers in Florida.",t:"fl"},
  {n:153,q:"Which statement regarding the Misstatement of Age provision is true?",a:"Coverage will be adjusted to reflect the insured's true age if a misstatement is discovered",exp:"Never cancels. Never voids. No time limit. Benefits are recalculated for what the correct premium would have purchased.",t:"life"},
  {n:154,q:"The entity whose sole purpose is sharing medical data among its member companies is called the",a:"Medical Information Bureau (MIB)",exp:"MIB = clearinghouse of health information shared among insurance company members.",t:"life"},
  {n:155,q:"What type of life insurance would be used for mortgage protection as the death benefit decreases over time?",a:"Decreasing Term",exp:"Decreasing Term = death benefit shrinks over time as you pay down your mortgage balance. Premium stays level.",t:"life"},
  {n:156,q:"A policyowner is allowed to pay premiums more than once a year under which provision?",a:"Mode of Premium provision",exp:"Mode of Premium = allows policyowner to select frequency of premium payments.",t:"life"},
  {n:157,q:"The four elements of a valid insurance contract are:",a:"Competent parties, Legal purpose, Offer and acceptance, Consideration (C.L.O.C.)",exp:"C.L.O.C. = Competent parties + Legal purpose + Offer/Acceptance + Consideration. All four must exist.",t:"life"},
  {n:158,q:"Which type of receipt gives coverage even if the applicant is found uninsurable?",a:"Binding receipt",exp:"Binding = coverage guaranteed even if found uninsurable. Conditional = coverage only if found insurable.",t:"life"},
  {n:159,q:"How long does an employee have to convert group life to individual after leaving a job?",a:"31 days",exp:"31-day conversion period. No health exam required. Must convert within 31 days of group coverage ending.",t:"life"},
  {n:160,q:"Per Stirpes distribution means:",a:"Deceased beneficiary's share passes to their heirs (by bloodline)",exp:"Per Stirpes = by bloodline. If beneficiary predeceases insured, their share goes to their own children.",t:"life"},
  {n:161,q:"Which provision allows extra life insurance to be purchased at certain life events without a health exam?",a:"Guaranteed Insurability Option (GIO)",exp:"GIO = buy additional coverage at marriage, birth of child, or specified dates without evidence of insurability.",t:"life"},
  {n:162,q:"The Cost of Living Rider adjusts coverage based on:",a:"Consumer Price Index (CPI)",exp:"Cost of Living Rider adjusts death benefit for inflation using the CPI. No extra health exam required.",t:"life"},
  {n:163,q:"Which annuity type pays proceeds from investments in an insurer's separate investment accounts?",a:"Variable annuity",exp:"Variable annuity = invested in separate accounts. Returns fluctuate. Policyholder bears ALL investment risk.",t:"annuity"},
  {n:164,q:"An agent puts the premium on a new policy into their personal bank account before forwarding to the company. This is:",a:"Commingling (and theft/misappropriation)",exp:"Commingling = mixing client funds with personal funds. Illegal and can result in license revocation.",t:"fl"},
  {n:165,q:"Which type of insurance company is owned by its policyholders and issues participating policies?",a:"Mutual company",exp:"Mutual company: owned by policyholders, issues participating policies, can pay policy dividends.",t:"life"},
  {n:166,q:"Under a contributory group life plan, at least what percentage of eligible employees must participate?",a:"75%",exp:"Contributory group plan (employees pay part of premium) = minimum 75% employee participation required.",t:"life"},
  {n:167,q:"Which disability renewability type provides the MOST protection for the insured (no cancel AND no rate increase)?",a:"Noncancellable",exp:"Noncancellable = insurer cannot cancel AND cannot raise premiums. Best protection for the insured.",t:"health"},
  {n:168,q:"An insurance company incorporated in another country doing business in Florida is called:",a:"Alien insurer",exp:"Alien = incorporated in another country. Foreign = incorporated in another US state. Domestic = incorporated in Florida.",t:"life"},
  {n:169,q:"What is the PRINCIPAL SUM in an AD&D policy?",a:"100% of the face amount -- paid for accidental death or loss of both limbs/eyes",exp:"Principal Sum = 100% for accidental death or total loss. Capital Sum = 50% for loss of one limb or eye.",t:"life"},
  {n:170,q:"Which provision states that the insurer cannot contest the policy after a specific number of years?",a:"Incontestable Clause",exp:"Life insurance = 2 years. Health insurance = 3 years. After that, insurer cannot contest based on misstatements. Fraud always contestable.",t:"life"},
  {n:171,q:"A 55-year-old received a $30,000 distribution from a 401k, minus $6,000 withholding. No rollover. Which taxes apply?",a:"Income taxes plus a 10% penalty tax on the full $30,000",exp:"Penalty applies to the FULL $30,000 not just the net. Age 55 is before 59.5 so penalty applies.",t:"life"},
  {n:172,q:"Which of these is a type of whole life insurance that has premiums lower during the first few years then jump higher?",a:"Modified Whole Life",exp:"Modified Whole Life = low premiums for first few years, then permanently higher. Death benefit stays level.",t:"life"},
  {n:173,q:"Under HIPAA, a pre-existing condition exclusion period may not exceed:",a:"12 months (18 months for late enrollees)",exp:"HIPAA limits pre-existing exclusion to 12 months (or 18 months for late enrollees), reduced by prior creditable coverage.",t:"health"},
  {n:174,q:"Which type of annuity is typically linked to a stock market index with a guaranteed minimum floor?",a:"Equity Indexed Annuity",exp:"EIA = linked to stock market index (typically S&P 500) with a floor that protects against market losses.",t:"annuity"},
  {n:175,q:"What is reinsurance?",a:"Insurance for insurance companies -- insurer transfers risk to a reinsurer",exp:"Ceding company transfers risk to assuming company (reinsurer). Two types: Treaty (automatic) and Facultative (specific).",t:"life"},
  {n:176,q:"Which settlement option pays income the beneficiary cannot outlive?",a:"Life Income",exp:"Life Income settlement = provides income for the beneficiary's entire life. Amount based on life expectancy.",t:"life"},
  {n:177,q:"What does the payor provision on a juvenile life policy do?",a:"Waives premiums if the payor (parent/guardian) dies or becomes disabled",exp:"PAYOR provision = if the person paying premiums for a child's policy dies or is disabled, premiums are waived.",t:"life"},
  {n:178,q:"Which type of life insurance policy is specifically designed to pay off a decreasing loan balance?",a:"Decreasing Term (credit life)",exp:"Credit life insurance is decreasing term -- death benefit decreases as the loan balance decreases.",t:"life"},
  {n:179,q:"How does the incontestable clause differ between life and health insurance?",a:"Life = 2 years; Health = 3 years",exp:"Life insurance incontestable period = 2 years. Health insurance = 3 years. Fraud is ALWAYS contestable.",t:"life"},
  {n:180,q:"An HMO doctor is paid a flat monthly fee per enrolled member regardless of services rendered. This is called:",a:"Capitation",exp:"Capitation = HMO pays flat fee per member per month. PPO uses discounted fee-for-service instead.",t:"health"},
  {n:181,q:"Under a participating life insurance policy, dividends are:",a:"A return of excess premium -- not taxable",exp:"Policy dividends = return of overpaid premium = NOT taxable income. If left to accumulate interest, that interest IS taxable.",t:"life"},
  {n:182,q:"What is the minimum number of lives required for a group life policy in Florida?",a:"2 lives",exp:"Florida allows group life policies for groups of at least 2 persons. Most other states require 5 or more.",t:"fl"},
  {n:183,q:"A fraternal benefit society must exist for reasons:",a:"Other than insurance",exp:"Fraternal = nonprofit, lodge system, ritualistic work, representative government. Must exist for non-insurance reasons.",t:"life"},
  {n:184,q:"Which type of agent authority is explicitly granted in writing in the agent's contract?",a:"Express authority",exp:"Express = written, specific authority in the contract. Implied = customary expected authority. Apparent = public belief.",t:"life"},
  {n:185,q:"What does estoppel prevent an insurer from doing?",a:"Denying a claim when the insurer's own agent caused the consumer to rely on inaccurate information",exp:"Estoppel = prevents insurer from taking a position that contradicts what its agent represented to the consumer.",t:"life"},
  {n:186,q:"Which provision allows an insured to reduce coverage rather than lapse a policy when they can no longer pay premiums?",a:"Reduced Paid-Up nonforfeiture option",exp:"Reduced Paid-Up = smaller permanent policy, no more premiums, still builds cash value. Better than lapsing.",t:"life"},
  {n:187,q:"A doctor who is employed directly by an HMO facility and treats only HMO members is part of what arrangement?",a:"Closed panel",exp:"Closed panel = salaried HMO doctors working exclusively in HMO facilities. Open panel allows outside contracted physicians.",t:"health"},
  {n:188,q:"Which type of health plan provides benefits for a FIXED DAILY AMOUNT regardless of actual hospital costs?",a:"Hospital Indemnity plan",exp:"Hospital Indemnity = fixed daily benefit no matter what the actual expenses are. Different from major medical.",t:"health"},
  {n:189,q:"A 1035 Exchange allows a policyowner to:",a:"Exchange one life insurance policy for another without triggering a taxable event",exp:"1035 Exchange = tax-free swap of one life policy for another (or for an annuity). No tax on the gain.",t:"life"},
  {n:190,q:"What is the maximum advertising gift an agent can give a prospective insured in Florida?",a:"$25",exp:"FL law caps advertising gifts at $25 per prospective insured. Anything more = rebating (illegal).",t:"fl"},
  {n:191,q:"Under a surplus lines policy, which of the following is TRUE?",a:"It is NOT protected by the state guaranty fund (FIGA)",exp:"Surplus lines covers unusual risks. NOT backed by FIGA. Must go through a licensed surplus lines broker.",t:"life"},
  {n:192,q:"What does subrogation give the insurer the right to do?",a:"Pursue a liable third party to recover claims paid",exp:"After paying a claim, insurer can sue the at-fault third party to recover what it paid. Prevents double recovery.",t:"life"},
  {n:193,q:"The free-look period for a standard life insurance policy in Florida begins:",a:"On the date the policy is delivered",exp:"Free-look = 14 days from date of DELIVERY. Not the application date. Not the issue date.",t:"fl"},
  {n:194,q:"The NAIC (National Association of Insurance Commissioners) is best described as:",a:"Advisory only -- it creates model laws but has no direct regulatory power",exp:"NAIC = advisory body. Creates model laws for states to adopt. Has NO direct power to regulate insurers.",t:"fl"},
  {n:195,q:"Under Florida law, how long must an agent keep business records?",a:"3 years",exp:"FL agents must retain business records for a minimum of 3 years at their place of business.",t:"fl"},
  {n:196,q:"An agent who churns a policy is doing what?",a:"Unnecessarily replacing a policy within the SAME company using misleading information",exp:"Churning = replacing within same company. Twisting = replacing to a DIFFERENT company. Both are illegal.",t:"trade"},
  {n:197,q:"Which concept means both parties to an insurance contract must fully disclose all relevant information?",a:"Utmost good faith",exp:"Utmost good faith = full, honest disclosure by both parties. Material misrepresentation violates this principle.",t:"life"},
  {n:198,q:"An insurer that is formed and incorporated in the same state where it writes business is called:",a:"Domestic insurer",exp:"Domestic = incorporated in the same state. Foreign = different US state. Alien = different country.",t:"life"},
  {n:199,q:"What is a reciprocal insurer?",a:"Unincorporated organization where members (subscribers) insure each other",exp:"Reciprocal insurer = risk sharing not transfer. Managed by an attorney-in-fact. Members are both insurers and insured.",t:"life"},
  {n:200,q:"Which of the following is the correct order for the Straight Line Selling method?",a:"Opening, Prequalify, Tie-Down, Price, Credibility, HOLD, Teaser, Tie-Down 3x, Benefits, Close, Rebuttals",exp:"From the CHA sales training manual. Memorize this sequence -- it drives every successful call.",t:"fl"}
];

/* ── BUILD FC (flashcards) FROM QA200 ── */
var C215_FC = [];
var C215_QZ = [];

(function buildData() {
  var i, item, pool, wrongs, opts, correctPos;
  var allAnswers = [];
  for (i = 0; i < QA200.length; i++) {
    allAnswers.push(QA200[i].a);
  }
  for (i = 0; i < QA200.length; i++) {
    item = QA200[i];
    // Flashcard
    C215_FC.push({ t: item.t, q: item.q, a: item.a, e: item.exp, trick: item.trick || false });
    // Quiz -- build 3 wrong answers from pool
    pool = [];
    var j;
    for (j = 0; j < QA200.length; j++) {
      if (j !== i && QA200[j].a !== item.a) {
        pool.push(QA200[j].a);
      }
    }
    // Shuffle pool
    pool.sort(function() { return Math.random() - 0.5; });
    wrongs = pool.slice(0, 3);
    opts = wrongs.slice(0, 3);
    correctPos = Math.floor(Math.random() * 4);
    opts.splice(correctPos, 0, item.a);
    C215_QZ.push({ t: item.t, q: item.q, opts: opts, a: correctPos, e: item.exp, trick: item.trick || false });
  }
})();

/* ── STATE ── */
var c215State = {
  activeTab: 'priority',
  fc: { queue: [], idx: 0, marked: {}, filter: 'all' },
  qz: { queue: [], idx: 0, correct: 0, total: 0, answered: false, filter: 'all' },
  tracker: {},
  qa200Filter: 'all',
  qa200Search: ''
};

/* ── TRACKER PERSISTENCE ── */
function c215LoadTracker() {
  try {
    var raw = localStorage.getItem('c215_tracker');
    c215State.tracker = raw ? JSON.parse(raw) : {};
  } catch (e) {
    c215State.tracker = {};
  }
}

function c215SaveTracker() {
  try {
    localStorage.setItem('c215_tracker', JSON.stringify(c215State.tracker));
  } catch (e) {}
}

function c215RecordAnswer(topic, correct) {
  if (!c215State.tracker[topic]) {
    c215State.tracker[topic] = { correct: 0, total: 0 };
  }
  c215State.tracker[topic].total++;
  if (correct) { c215State.tracker[topic].correct++; }
  c215SaveTracker();
}

/* ── HELPERS ── */
function el(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls) { e.className = cls; }
  if (text !== undefined) { e.textContent = text; }
  return e;
}

function topicColor(t) {
  var map = { trade: '#991b1b', fl: '#0f766e', life: '#1e40af', health: '#166534', annuity: '#5b21b6' };
  return map[t] || '#475569';
}

function topicLabel(t) {
  var map = { trade: 'Trade', fl: 'FL Rules', life: 'Life', health: 'Health', annuity: 'Annuities', trick: 'Trick' };
  return map[t] || t;
}

function topicBadgeClass(t) {
  var map = { trade: 'c215-badge-trade', fl: 'c215-badge-fl', life: 'c215-badge-life', health: 'c215-badge-health', annuity: 'c215-badge-annuity', trick: 'c215-badge-trick' };
  return map[t] || 'c215-badge-fl';
}

/* ── MAIN RENDER ── */
function c215Render() {
  var root = document.getElementById('cha-course215-root');
  if (!root) { return; }
  root.innerHTML = '';

  // Header
  var hdr = el('div', 'c215-header');
  hdr.innerHTML = '<div class="c215-header-eyebrow">Florida Life &amp; Health Insurance</div>'
    + '<div class="c215-header-title">2-15 Crash Course</div>'
    + '<div class="c215-header-sub">XCEL Solutions Review Notes + 200 Practice Questions</div>'
    + '<div class="c215-header-badges">'
    + '<span class="c215-badge c215-badge-gold">200 Q&amp;A</span>'
    + '<span class="c215-badge c215-badge-blue">Flashcards</span>'
    + '<span class="c215-badge c215-badge-blue">Practice Quiz</span>'
    + '<span class="c215-badge c215-badge-blue">Cheat Sheets</span>'
    + '<span class="c215-badge c215-badge-blue">Study Tracker</span>'
    + '</div>';
  root.appendChild(hdr);

  // Tab bar
  var tabs = [
    { id: 'cheat',      label: 'Cheat Sheets' },
    { id: 'mnemonics',  label: 'Mnemonics' },
    { id: 'priority',   label: 'Priority' },
    { id: 'numbers',    label: 'Key Numbers' },
    { id: 'flashcards', label: 'Flashcards' },
    { id: 'quiz',       label: 'Quiz' },
    { id: 'tracker',    label: 'Tracker' },
    { id: 'qa200',      label: '200 Q&amp;A' }
  ];
  var tabBar = el('div', 'c215-tabs');
  for (var ti = 0; ti < tabs.length; ti++) {
    (function(tab) {
      var btn = el('button', 'c215-tab' + (c215State.activeTab === tab.id ? ' active' : ''));
      btn.innerHTML = tab.label;
      btn.onclick = function() { c215SwitchTab(tab.id); };
      tabBar.appendChild(btn);
    })(tabs[ti]);
  }
  root.appendChild(tabBar);

  // Section container
  var sections = el('div', 'c215-sections');
  root.appendChild(sections);

  c215RenderSection(sections);
}

function c215SwitchTab(id) {
  c215State.activeTab = id;
  var root = document.getElementById('cha-course215-root');
  if (!root) { return; }
  // Update tab buttons
  var btns = root.querySelectorAll('.c215-tab');
  var tabOrder = ['cheat', 'mnemonics', 'priority', 'numbers', 'flashcards', 'quiz', 'tracker', 'qa200'];
  for (var i = 0; i < btns.length; i++) {
    btns[i].className = 'c215-tab' + (tabOrder[i] === id ? ' active' : '');
  }
  // Re-render section area
  var sections = root.querySelector('.c215-sections');
  if (sections) {
    sections.innerHTML = '';
    c215RenderSection(sections);
  }
}

function c215RenderSection(container) {
  var id = c215State.activeTab;
  if (id === 'priority') { c215RenderPriority(container); }
  else if (id === 'cheat') { c215RenderCheat(container); }
  else if (id === 'numbers') { c215RenderNumbers(container); }
  else if (id === 'flashcards') { c215RenderFlashcards(container); }
  else if (id === 'quiz') { c215RenderQuiz(container); }
  else if (id === 'mnemonics') { c215RenderMnemonics(container); }
  else if (id === 'tracker') { c215RenderTracker(container); }
  else if (id === 'qa200') { c215RenderQA200(container); }
}

/* ── PRIORITY TAB ── */
function c215RenderPriority(container) {
  var html = '';

  html += '<div class="c215-callout red">'
    + '<span class="c215-callout-label">Highest Frequency Topics</span>'
    + 'Every one of these appeared multiple times on the 200-question simulation. Know them cold before anything else.'
    + '</div>';

  var cards = [
    { term: 'Stock vs Mutual Companies', def: '<strong>Stock = shareholders own it, NON-participating, no policy dividends</strong><br><strong>Mutual = policyholders own it, PARTICIPATING, pays policy dividends</strong>' },
    { term: 'Term / Whole / Universal / Variable', def: '<strong>Term</strong> = temp, no cash value, cheapest, greatest coverage<br><strong>Whole</strong> = permanent, fixed, cash value, endows at 100<br><strong>Universal</strong> = flexible premium, unbundled (3 costs visible)<br><strong>Variable</strong> = YOU invest, market risk, SEC + DFS regulated' },
    { term: 'Nonforfeiture Options', def: '<strong>Cash Surrender</strong> = cancel, take cash<br><strong>Reduced Paid-Up</strong> = smaller policy, STILL builds cash value<br><strong>Extended Term</strong> = same benefit, limited time, NO cash value growth' },
    { term: 'HMO vs PPO', def: '<strong>HMO</strong> = needs PCP gatekeeper, capitation, preventive, closed panel<br><strong>PPO</strong> = no PCP, fee-for-service, in AND out of network<br><strong>BOTH ARE MANAGED CARE</strong> -- #1 trick question on exam' },
    { term: '7 Unfair Trade Practices', def: '<strong>My Turtle Rides Cars Down Steep Underpasses</strong><br>Misrepresentation, Twisting, Rebating, Coercion, Defamation, Sliding, Unfair Discrimination' },
    { term: 'Florida Regulatory Bodies', def: '<strong>DFS</strong> = agents (licensing, complaints)<br><strong>OIR</strong> = insurance companies (rates, solvency)<br><strong>FIGA</strong> = pays claims when insurer goes broke<br><strong>NAIC</strong> = advisory only, no real power' },
    { term: 'Policy Contract -- C.L.O.C.', def: '<strong>C</strong>ompetent parties, <strong>L</strong>egal purpose, <strong>O</strong>ffer and acceptance, <strong>C</strong>onsideration<br>All four must exist for a valid contract' },
    { term: 'Incontestable Clause', def: 'Life insurance: <strong>2 years</strong>. Health insurance: <strong>3 years</strong>.<br>After this period: cannot contest application mistakes.<br><strong>EXCEPTION: Fraud can ALWAYS be contested</strong>' },
    { term: 'COBRA Rules', def: 'Employee pays 100% (up to 102%). <strong>18 months</strong> job loss. <strong>36 months</strong> dependents.<br>FL Mini-COBRA = less than 20 employees' },
    { term: 'Disability -- Noncancellable vs Guaranteed Renewable', def: '<strong>Noncancellable</strong> = cannot cancel AND cannot raise premium -- locked forever<br><strong>Guaranteed Renewable</strong> = cannot cancel BUT CAN raise for whole risk class' },
    { term: 'Insurable Interest', def: 'Required at <strong>TIME OF APPLICATION only</strong> -- NOT at time of death.<br>Any financial loss from insured dying or becoming ill.' },
    { term: 'Representations vs Warranties', def: '<strong>Representation</strong> = believed true to best of knowledge (not absolute)<br><strong>Warranty</strong> = guaranteed true -- if even slightly wrong, policy VOIDS' }
  ];

  html += '<div class="c215-dlabel">Must-Know Concepts</div>';
  html += '<div class="c215-grid">';
  for (var i = 0; i < cards.length; i++) {
    html += '<div class="c215-card">'
      + '<div class="c215-card-term">' + cards[i].term + '</div>'
      + '<div class="c215-card-def">' + cards[i].def + '</div>'
      + '</div>';
  }
  html += '</div>';

  html += '<div class="c215-dlabel">Mnemonic -- 7 Unfair Trade Practices</div>';
  html += '<div class="c215-mnemonic">'
    + '<div class="c215-mnemonic-phrase">My Turtle Rides Cars Down Steep Underpasses</div>'
    + '<div class="c215-mnemonic-line"><span>M</span>isrepresentation -- lying or misleading about what a policy does<br>'
    + '<span>T</span>wisting -- lies to get someone to cancel existing policy and buy new one<br>'
    + '<span>R</span>ebating -- giving money, gifts, or commissions to induce a sale<br>'
    + '<span>C</span>oercion -- threatening or pressuring someone to buy or sign<br>'
    + '<span>D</span>efamation -- false statements to damage a competitor\'s reputation<br>'
    + '<span>S</span>liding -- adding coverage to a policy without the customer knowing<br>'
    + '<span>U</span>nfair Discrimination -- same risk group, different prices, no legitimate reason</div>'
    + '</div>';

  html += '<div class="c215-dlabel">Top Trick Questions</div>';
  var tricks = [
    { title: 'PPO Managed Care', body: '"PPOs are NOT a type of managed care system" -- <strong>FALSE.</strong> Both HMO and PPO are managed care. Always.' },
    { title: 'Policyowner vs Insured', body: 'When both are answer choices -- always pick <strong>policyowner.</strong> Only use "insured" when policyowner is NOT a listed option.' },
    { title: 'Waiver of Premium + SS Disability', body: 'Waiver of Premium does NOT require Social Security disability eligibility. The policy defines its own disability standard independently.' },
    { title: 'Proof of Claim = NOT Illegal', body: 'Requiring written documentation of a claim is NOT an unfair claim settlement practice. It is normal and required.' },
    { title: 'Key Person After Employee Leaves', body: 'If a key employee goes to Company Y, the death proceeds STILL go to Company X (original owner).' },
    { title: 'Insurable Interest Timing', body: 'Insurable interest is required at TIME OF APPLICATION only -- NOT at time of death. Frequently tested.' },
    { title: 'High School Diploma NOT Required', body: 'No high school diploma required. Only: be 18, FL resident, complete prelicensing, pass the exam.' },
    { title: 'Extended Term vs Reduced Paid-Up', body: 'Extended Term does NOT build cash value. Reduced Paid-Up DOES continue building cash value.' }
  ];
  html += '<div class="c215-grid">';
  for (var ti = 0; ti < tricks.length; ti++) {
    html += '<div class="c215-callout purple">'
      + '<span class="c215-callout-label">Trick: ' + tricks[ti].title + '</span>'
      + tricks[ti].body + '</div>';
  }
  html += '</div>';

  container.innerHTML = html;
}

/* ── CHEAT SHEETS TAB ── */
function c215RenderCheat(container) {
  var html = '';

  html += '<div class="c215-callout gold">'
    + '<span class="c215-callout-label">All Testable FL Numbers At a Glance</span>'
    + '<strong>AGES:</strong> Sign app = 15 | Agent = 18 | Early withdrawal penalty ends = 59.5 | Medicare = 65 | RMD starts = 73 | WL endows = 100<br><br>'
    + '<strong>FREE-LOOK:</strong> Life = 14 days (delivery) | LTC = 30 days | Med Supp = 30 days<br><br>'
    + '<strong>FL RULES:</strong> Policy loan max = 10% (Moody\'s for adjustable) | Address change = 30 days | Records = 3 years | Adv. file = 4 years | Adv. gift max = $25<br><br>'
    + '<strong>COBRA:</strong> Job loss = 18 months | Death/divorce/aging = 36 months | Pay 102% | Less than 20 employees = Mini-COBRA<br><br>'
    + '<strong>LTC:</strong> Free-look = 30 days | ADLs needed = 2 of 6 for 90 days | Lapse notice = 30 days to policyowner + secondary<br><br>'
    + '<strong>TAX:</strong> Direct IRA transfer = 0% | Personal rollover = 20% withheld | Redeposit in 60 days | Penalty before 59.5 = 10%'
    + '</div>';

  // Policy comparison table
  html += '<div class="c215-dlabel">Policy Types Comparison</div>';
  html += '<div class="c215-table-wrap"><table class="c215-tbl">'
    + '<tr><th>Policy Type</th><th>Duration</th><th>Cash Value?</th><th>Premium</th><th>Key Feature</th></tr>'
    + '<tr><td><strong>Term Life</strong></td><td>Temporary</td><td class="no">No</td><td>Lowest</td><td>Greatest coverage, lowest cost</td></tr>'
    + '<tr><td><strong>Straight Whole Life</strong></td><td>Permanent</td><td class="yes">Yes</td><td>Fixed forever</td><td>Endows at age 100</td></tr>'
    + '<tr><td><strong>Modified Whole Life</strong></td><td>Permanent</td><td class="yes">Yes</td><td>Low then higher</td><td>NOT interest-sensitive</td></tr>'
    + '<tr><td><strong>Universal Life</strong></td><td>Permanent</td><td class="yes">Yes</td><td>Flexible</td><td>Unbundled -- see all 3 costs</td></tr>'
    + '<tr><td><strong>Variable Life</strong></td><td>Permanent</td><td class="yes">Fluctuates</td><td>Fixed</td><td>DFS + SEC regulated</td></tr>'
    + '<tr><td><strong>Variable Universal Life</strong></td><td>Permanent</td><td class="yes">Fluctuates</td><td>Flexible</td><td>Most flexible -- DFS + SEC</td></tr>'
    + '</table></div>';

  // HMO vs PPO
  html += '<div class="c215-dlabel">HMO vs PPO</div>';
  html += '<div class="c215-table-wrap"><table class="c215-tbl">'
    + '<tr><th>Feature</th><th>HMO</th><th>PPO</th></tr>'
    + '<tr><td>PCP required?</td><td class="yes">YES -- gatekeeper</td><td class="no">NO</td></tr>'
    + '<tr><td>Out-of-network covered?</td><td class="no">NO</td><td class="yes">YES (costs more)</td></tr>'
    + '<tr><td>How doctors paid?</td><td>Capitation (flat per member/month)</td><td>Discounted fee-for-service</td></tr>'
    + '<tr><td>Is it managed care?</td><td class="yes">YES</td><td class="yes">YES -- biggest trick question!</td></tr>'
    + '</table></div>';

  // Nonforfeiture
  html += '<div class="c215-dlabel">Nonforfeiture Options</div>';
  html += '<div class="c215-table-wrap"><table class="c215-tbl">'
    + '<tr><th>Option</th><th>What Happens</th><th>Still Builds Cash Value?</th></tr>'
    + '<tr><td><strong>Cash Surrender</strong></td><td>Cancel policy, receive cash</td><td class="no">No -- policy ends</td></tr>'
    + '<tr><td><strong>Reduced Paid-Up</strong></td><td>Smaller permanent policy, no more premiums</td><td class="yes">YES</td></tr>'
    + '<tr><td><strong>Extended Term</strong></td><td>Same coverage, limited time, no premiums</td><td class="no">No</td></tr>'
    + '</table></div>';

  // COBRA
  html += '<div class="c215-dlabel">COBRA Quick Reference</div>';
  html += '<div class="c215-table-wrap"><table class="c215-tbl">'
    + '<tr><th>Situation</th><th>Duration</th></tr>'
    + '<tr><td>Employee loses job / hours cut</td><td><strong>18 months</strong></td></tr>'
    + '<tr><td>Dependents if employee dies, divorces, or goes on Medicare</td><td><strong>36 months</strong></td></tr>'
    + '<tr><td>Who pays?</td><td>Employee pays up to <strong>102%</strong> of group rate</td></tr>'
    + '<tr><td>Federal COBRA covers employers with...</td><td><strong>20 or more</strong> employees</td></tr>'
    + '<tr><td>Florida Mini-COBRA covers employers with...</td><td><strong>Less than 20</strong> employees</td></tr>'
    + '</table></div>';

  // IRA Tax table
  html += '<div class="c215-dlabel">IRA / Retirement Tax Rules</div>';
  html += '<div class="c215-table-wrap"><table class="c215-tbl">'
    + '<tr><th>Situation</th><th>Withheld</th><th>Penalty</th></tr>'
    + '<tr><td>Direct IRA to IRA transfer (trustee-to-trustee)</td><td class="yes"><strong>0%</strong></td><td>None</td></tr>'
    + '<tr><td>YOU personally receive rollover check</td><td><strong>20% withheld</strong></td><td>10% if not rolled over in 60 days</td></tr>'
    + '<tr><td>Early IRA withdrawal (before 59.5)</td><td>Income taxes owed</td><td><strong>10% penalty</strong></td></tr>'
    + '<tr><td>Skip Required Minimum Distributions at age 73+</td><td>N/A</td><td><strong>25% excise tax</strong></td></tr>'
    + '</table></div>';

  // Regulatory agencies
  html += '<div class="c215-dlabel">Florida Regulatory Agencies</div>';
  html += '<div class="c215-table-wrap"><table class="c215-tbl">'
    + '<tr><th>Agency</th><th>Oversees</th><th>Key Responsibilities</th></tr>'
    + '<tr><td><strong>DFS</strong></td><td>Agents</td><td>Licensing, complaints, fiduciary oversight, rehab/liquidation of failing insurers</td></tr>'
    + '<tr><td><strong>OIR</strong></td><td>Insurance Companies</td><td>Rates, policy forms, financial solvency</td></tr>'
    + '<tr><td><strong>FIGA</strong></td><td>Policyholders</td><td>Pays claims when an insurer becomes insolvent</td></tr>'
    + '<tr><td><strong>NAIC</strong></td><td>Advisory only</td><td>Creates model laws for states -- no direct regulatory power</td></tr>'
    + '</table></div>';

  // Renewability types
  html += '<div class="c215-dlabel">Renewability Types</div>';
  html += '<div class="c215-table-wrap"><table class="c215-tbl">'
    + '<tr><th>Type</th><th>Can Insurer Cancel?</th><th>Can Insurer Raise Premiums?</th></tr>'
    + '<tr><td><strong>Noncancellable</strong></td><td class="no">NO</td><td class="no">NO -- locked forever</td></tr>'
    + '<tr><td><strong>Guaranteed Renewable</strong></td><td class="no">NO</td><td class="yes">YES -- class basis only</td></tr>'
    + '<tr><td><strong>Conditionally Renewable</strong></td><td class="yes">YES -- specific conditions</td><td class="yes">YES</td></tr>'
    + '<tr><td><strong>Optionally Renewable</strong></td><td class="yes">YES -- at renewal date</td><td class="yes">YES</td></tr>'
    + '</table></div>';

  // Commonly missed one-liners
  html += '<div class="c215-dlabel">Most Commonly Missed -- One-Liners</div>';
  html += '<div class="c215-callout blue">'
    + '<span class="c215-callout-label">These will appear as trap answers</span>'
    + 'PPO IS managed care -- the exam says it\'s NOT -- always FALSE<br>'
    + 'High school diploma = NOT required for FL agent license<br>'
    + 'Insurable interest required at time of APPLICATION only, not at death<br>'
    + 'Free-look period starts at date of DELIVERY, not application<br>'
    + 'Waiver of Premium does NOT require SS disability -- uses own policy definition<br>'
    + 'Requiring written documentation of a claim = NOT an unfair practice<br>'
    + 'Key person policy proceeds go to the COMPANY, regardless of where the employee works<br>'
    + 'Modified Whole Life = NOT interest-sensitive. Variable Life and Universal Life ARE.<br>'
    + 'Group life: employees receive CERTIFICATE. Employer holds MASTER POLICY.<br>'
    + 'Misstatement of age = adjusts benefit, never cancels, no time limit'
    + '</div>';

  container.innerHTML = html;
}

/* ── KEY NUMBERS TAB ── */
function c215RenderNumbers(container) {
  var html = '';

  var sections = [
    {
      label: 'Age Numbers',
      items: [
        { n: '15', d: '<strong>Min age to sign a life insurance application</strong>Applicant age -- not agent age' },
        { n: '18', d: '<strong>Minimum agent age</strong>Must also be FL resident + complete prelicensing' },
        { n: '59.5', d: '<strong>Early withdrawal penalty ends</strong>IRA/annuity penalty-free withdrawals begin' },
        { n: '65', d: '<strong>Medicare eligibility age</strong>Med Supp open enrollment starts 3 months BEFORE this' },
        { n: '73', d: '<strong>Required Minimum Distributions start</strong>25% excise tax if skipped' },
        { n: '100', d: '<strong>Whole Life endowment age</strong>Cash value equals face amount' }
      ]
    },
    {
      label: 'Free-Look Periods',
      items: [
        { n: '14d', d: '<strong>Life insurance free-look</strong>From date of DELIVERY (not application)' },
        { n: '30d', d: '<strong>LTC free-look period</strong>Long-term care insurance from delivery' },
        { n: '30d', d: '<strong>Medicare Supplement free-look</strong>30 days from delivery' }
      ]
    },
    {
      label: 'FL-Specific Numbers',
      items: [
        { n: '10%', d: '<strong>Max fixed policy loan rate</strong>FL life insurance policy loans' },
        { n: '6mo', d: '<strong>Med Supp pre-existing exclusion max</strong>Cannot exceed 6 months' },
        { n: '30d', d: '<strong>Address change notification</strong>Notify DFS within 30 days' },
        { n: '3yr', d: '<strong>Agent records retention</strong>Business records kept at place of business' },
        { n: '$25', d: '<strong>Max advertising gift</strong>Agent to prospective insured' },
        { n: '45d', d: '<strong>Reinstatement auto-approval</strong>If insurer takes no action in 45 days' }
      ]
    },
    {
      label: 'COBRA Numbers',
      items: [
        { n: '18mo', d: '<strong>COBRA -- job loss / hour reduction</strong>For employee + covered family' },
        { n: '36mo', d: '<strong>COBRA -- death / divorce / aging out</strong>Death of employee, divorce, dependent aging out' },
        { n: '20+', d: '<strong>Federal COBRA threshold</strong>Applies to employers with 20 or more employees' },
        { n: '102%', d: '<strong>COBRA premium max</strong>Employee pays full group premium + 2%' }
      ]
    },
    {
      label: 'LTC and Health Numbers',
      items: [
        { n: '2', d: '<strong>ADLs required for LTC benefits</strong>Must be unable to perform 2 of 6 ADLs' },
        { n: '90d', d: '<strong>ADL impairment duration required</strong>Must be impaired for at least 90 days' },
        { n: '30d', d: '<strong>LTC lapse notice advance</strong>To policyowner AND secondary addressee' },
        { n: '20d', d: '<strong>Notice of claim deadline</strong>After accident on health policy' },
        { n: '15d', d: '<strong>Claim form deadline</strong>Insurer must provide claim forms within 15 days of notice' },
        { n: '31d', d: '<strong>Grace period -- life policies</strong>Coverage continues during grace period' }
      ]
    },
    {
      label: 'Tax and Penalty Numbers',
      items: [
        { n: '0%', d: '<strong>IRA direct transfer withholding</strong>Trustee-to-trustee, money never touches your hands' },
        { n: '20%', d: '<strong>Personal rollover check withholding</strong>When check is made out to you personally' },
        { n: '10%', d: '<strong>Early withdrawal penalty</strong>Before age 59.5 on IRA/annuity (plus ordinary income tax)' },
        { n: '25%', d: '<strong>Skip RMD excise tax</strong>For skipping Required Minimum Distributions at age 73+' },
        { n: '60d', d: '<strong>Rollover redeposit deadline</strong>Must redeposit personal rollover check within 60 days' }
      ]
    }
  ];

  for (var si = 0; si < sections.length; si++) {
    html += '<div class="c215-dlabel">' + sections[si].label + '</div>';
    html += '<div class="c215-numgrid">';
    var items = sections[si].items;
    for (var ni = 0; ni < items.length; ni++) {
      html += '<div class="c215-numcard">'
        + '<div class="c215-numcard-n">' + items[ni].n + '</div>'
        + '<div class="c215-numcard-d">' + items[ni].d + '</div>'
        + '</div>';
    }
    html += '</div>';
  }

  container.innerHTML = html;
}

/* ── FLASHCARDS TAB ── */
function c215RenderFlashcards(container) {
  if (c215State.fc.queue.length === 0) {
    c215FcApplyFilter('all');
  }

  var got = 0, missed = 0;
  var keys = Object.keys(c215State.fc.marked);
  for (var ki = 0; ki < keys.length; ki++) {
    if (c215State.fc.marked[keys[ki]] === 'got') { got++; }
    else if (c215State.fc.marked[keys[ki]] === 'missed') { missed++; }
  }
  var total = got + missed;
  var pct = total > 0 ? Math.round(got / total * 100) : 0;
  var left = Math.max(0, c215State.fc.queue.length - c215State.fc.idx - 1);

  var html = '<div class="c215-fc-wrap">';

  // Score bar
  html += '<div class="c215-fc-scorebar">'
    + '<div><span class="c215-fc-score-n" style="color:#166534">' + got + '</span><span class="c215-fc-score-lbl">Got It</span></div>'
    + '<div><span class="c215-fc-score-n" style="color:#991b1b">' + missed + '</span><span class="c215-fc-score-lbl">Missed</span></div>'
    + '<div><span class="c215-fc-score-n" style="color:#1e40af">' + left + '</span><span class="c215-fc-score-lbl">Left</span></div>'
    + '<div><span class="c215-fc-score-n" style="color:#5b21b6">' + pct + '%</span><span class="c215-fc-score-lbl">Accuracy</span></div>'
    + '</div>';

  // Filters
  var filters = [
    { id: 'all', label: 'All 200' },
    { id: 'fl', label: 'FL Rules' },
    { id: 'life', label: 'Life' },
    { id: 'health', label: 'Health' },
    { id: 'trade', label: 'Trade' },
    { id: 'annuity', label: 'Annuities' },
    { id: 'trick', label: 'Tricks' },
    { id: 'missed', label: 'Missed' }
  ];
  html += '<div class="c215-fc-filters">';
  for (var fi = 0; fi < filters.length; fi++) {
    var isActive = c215State.fc.filter === filters[fi].id;
    html += '<button class="c215-filter-btn' + (isActive ? ' active' : '') + '" '
      + 'onclick="c215FcFilter(\'' + filters[fi].id + '\')">' + filters[fi].label + '</button>';
  }
  html += '</div>';

  // Progress bar
  var progPct = c215State.fc.queue.length > 0 ? Math.round((c215State.fc.idx + 1) / c215State.fc.queue.length * 100) : 0;
  html += '<div class="c215-fc-progress"><div class="c215-fc-progress-fill" id="c215FcProg" style="width:' + progPct + '%"></div></div>';

  // Card
  var card = c215State.fc.queue.length > 0 ? c215State.fc.queue[c215State.fc.idx] : null;
  html += '<div class="c215-flashcard" id="c215FcCard" onclick="c215FcReveal()">';
  if (card) {
    html += '<span class="c215-fc-topic-badge ' + topicBadgeClass(card.t) + '">' + topicLabel(card.t) + '</span>';
    if (card.trick) { html += '<span class="c215-trick-badge">TRICK</span>'; }
    html += '<div class="c215-fc-q" id="c215FcQ">' + card.q + '</div>';
    html += '<div class="c215-fc-hint" id="c215FcHint">Tap to reveal answer</div>';
    html += '<div class="c215-fc-answer" id="c215FcAns">'
      + '<div class="c215-fc-ans-lbl">Correct Answer</div>'
      + '<div class="c215-fc-ans-text" id="c215FcAnsText">' + card.a + '</div>'
      + '<div class="c215-fc-ans-exp" id="c215FcAnsExp">' + card.e + '</div>'
      + '</div>';
  } else {
    html += '<div class="c215-fc-hint">No cards in this filter.</div>';
  }
  html += '</div>';

  // Counter
  html += '<div class="c215-fc-counter">Card ' + (c215State.fc.idx + 1) + ' of ' + c215State.fc.queue.length + '</div>';

  // Controls
  html += '<div class="c215-fc-controls">'
    + '<button class="c215-btn" onclick="c215FcPrev()">Back</button>'
    + '<div style="display:flex;gap:.4rem;flex-wrap:wrap;justify-content:center;">'
    + '<button class="c215-btn c215-btn-got" id="c215FcGotBtn" onclick="c215FcMark(\'got\')" style="display:none">Got It</button>'
    + '<button class="c215-btn c215-btn-missed" id="c215FcMissBtn" onclick="c215FcMark(\'missed\')" style="display:none">Missed</button>'
    + '<button class="c215-btn c215-btn-primary" id="c215FcRevBtn" onclick="c215FcReveal()">Reveal</button>'
    + '</div>'
    + '<button class="c215-btn" onclick="c215FcNext()">Next</button>'
    + '</div>';

  html += '<div class="c215-fc-aux-btns">'
    + '<button class="c215-btn" onclick="c215FcShuffle()">Shuffle</button>'
    + '<button class="c215-btn" onclick="c215FcReset()">Reset All</button>'
    + '</div>';

  html += '</div>'; // fc-wrap
  container.innerHTML = html;
}

function c215FcApplyFilter(filter) {
  c215State.fc.filter = filter;
  if (filter === 'all') {
    c215State.fc.queue = C215_FC.slice();
  } else if (filter === 'trick') {
    c215State.fc.queue = C215_FC.filter(function(c) { return c.trick; });
  } else if (filter === 'missed') {
    var missed = [];
    for (var i = 0; i < C215_FC.length; i++) {
      if (c215State.fc.marked[i] === 'missed') { missed.push(C215_FC[i]); }
    }
    c215State.fc.queue = missed.length > 0 ? missed : C215_FC.slice();
  } else {
    c215State.fc.queue = C215_FC.filter(function(c) { return c.t === filter; });
  }
  c215State.fc.idx = 0;
}

function c215FcFilter(filter) {
  c215FcApplyFilter(filter);
  c215SwitchTab('flashcards');
}

function c215FcReveal() {
  var card = document.getElementById('c215FcCard');
  if (!card || card.classList.contains('revealed')) { return; }
  card.classList.add('revealed');
  var revBtn = document.getElementById('c215FcRevBtn');
  var gotBtn = document.getElementById('c215FcGotBtn');
  var missBtn = document.getElementById('c215FcMissBtn');
  if (revBtn) { revBtn.style.display = 'none'; }
  if (gotBtn) { gotBtn.style.display = 'block'; }
  if (missBtn) { missBtn.style.display = 'block'; }
}

function c215FcMark(result) {
  var origIdx = C215_FC.indexOf(c215State.fc.queue[c215State.fc.idx]);
  if (origIdx >= 0) { c215State.fc.marked[origIdx] = result; }
  c215FcNext();
}

function c215FcNext() {
  if (c215State.fc.idx < c215State.fc.queue.length - 1) {
    c215State.fc.idx++;
  } else {
    c215State.fc.idx = 0;
  }
  c215SwitchTab('flashcards');
}

function c215FcPrev() {
  if (c215State.fc.idx > 0) {
    c215State.fc.idx--;
  } else {
    c215State.fc.idx = c215State.fc.queue.length - 1;
  }
  c215SwitchTab('flashcards');
}

function c215FcShuffle() {
  c215State.fc.queue.sort(function() { return Math.random() - 0.5; });
  c215State.fc.idx = 0;
  c215SwitchTab('flashcards');
}

function c215FcReset() {
  c215State.fc.marked = {};
  c215State.fc.idx = 0;
  c215SwitchTab('flashcards');
}

/* ── QUIZ TAB ── */
function c215RenderQuiz(container) {
  if (c215State.qz.queue.length === 0) {
    c215QzApplyFilter('all');
  }

  var html = '<div class="c215-qz-wrap">';

  // Filters
  var filters = [
    { id: 'all', label: 'All 200' },
    { id: 'fl', label: 'FL Rules' },
    { id: 'life', label: 'Life' },
    { id: 'health', label: 'Health' },
    { id: 'trade', label: 'Trade' },
    { id: 'annuity', label: 'Annuities' },
    { id: 'trick', label: 'Tricks' }
  ];
  html += '<div class="c215-fc-filters" style="margin-bottom:.85rem">';
  for (var fi = 0; fi < filters.length; fi++) {
    var isActive = c215State.qz.filter === filters[fi].id;
    html += '<button class="c215-filter-btn' + (isActive ? ' active' : '') + '" '
      + 'onclick="c215QzFilter(\'' + filters[fi].id + '\')">' + filters[fi].label + '</button>';
  }
  html += '</div>';

  // Results screen (shown when done)
  if (c215State.qz.idx >= c215State.qz.queue.length && c215State.qz.total > 0) {
    var pct = Math.round(c215State.qz.correct / c215State.qz.total * 100);
    var msg = pct >= 90 ? 'Exam-ready on this topic!' : pct >= 75 ? 'Good progress. Review missed topics, then retry.' : 'Keep studying. Read the topic section, then retry.';
    html += '<div class="c215-qz-results show">'
      + '<div class="c215-qz-pct">' + pct + '%</div>'
      + '<div style="font-size:.8rem;color:#64748b;margin-bottom:.75rem;">Final Score</div>'
      + '<div class="c215-qz-breakdown">'
      + '<div><span class="c215-qz-stat-n" style="color:#166534">' + c215State.qz.correct + '</span><span class="c215-qz-stat-lbl">Correct</span></div>'
      + '<div><span class="c215-qz-stat-n" style="color:#991b1b">' + (c215State.qz.total - c215State.qz.correct) + '</span><span class="c215-qz-stat-lbl">Wrong</span></div>'
      + '</div>'
      + '<div class="c215-qz-msg">' + msg + '</div>'
      + '<button class="c215-btn c215-btn-primary" onclick="c215QzRestart()">Try Again</button>'
      + '</div>';
    html += '</div>';
    container.innerHTML = html;
    return;
  }

  // Meta row
  html += '<div class="c215-qz-meta">'
    + '<div class="c215-qz-info">Question ' + (c215State.qz.idx + 1) + ' of ' + c215State.qz.queue.length + '</div>'
    + '<div class="c215-qz-score">Score: ' + c215State.qz.correct + '/' + c215State.qz.total + '</div>'
    + '</div>';

  // Progress bar
  var progPct = c215State.qz.queue.length > 0 ? Math.round((c215State.qz.idx / c215State.qz.queue.length) * 100) : 0;
  html += '<div class="c215-qz-progress"><div class="c215-qz-prog-fill" style="width:' + progPct + '%"></div></div>';

  // Question card
  var q = c215State.qz.queue[c215State.qz.idx];
  if (q) {
    html += '<div class="c215-qz-card">'
      + '<span class="c215-fc-topic-badge ' + topicBadgeClass(q.t) + '">' + topicLabel(q.t) + '</span>';
    if (q.trick) { html += '<span class="c215-trick-badge">TRICK</span>'; }
    html += '<div class="c215-qz-q">' + q.q + '</div>';
    html += '<div class="c215-qz-opts" id="c215QzOpts">';
    for (var oi = 0; oi < q.opts.length; oi++) {
      html += '<button class="c215-qz-opt" onclick="c215QzAnswer(' + oi + ',' + q.a + ',\'' + String(q.e).replace(/'/g, '&#39;') + '\')">'
        + String.fromCharCode(65 + oi) + '. ' + q.opts[oi] + '</button>';
    }
    html += '</div>';
    html += '<div class="c215-qz-explain" id="c215QzExplain"></div>';
    html += '<button class="c215-qz-next" id="c215QzNext" onclick="c215QzNext()">Next Question</button>';
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
}

function c215QzApplyFilter(filter) {
  c215State.qz.filter = filter;
  var pool;
  if (filter === 'all') {
    pool = C215_QZ.slice();
  } else if (filter === 'trick') {
    pool = C215_QZ.filter(function(q) { return q.trick; });
  } else {
    pool = C215_QZ.filter(function(q) { return q.t === filter; });
  }
  pool.sort(function() { return Math.random() - 0.5; });
  c215State.qz.queue = pool;
  c215State.qz.idx = 0;
  c215State.qz.correct = 0;
  c215State.qz.total = 0;
  c215State.qz.answered = false;
}

function c215QzFilter(filter) {
  c215QzApplyFilter(filter);
  c215SwitchTab('quiz');
}

function c215QzAnswer(selected, correct, exp) {
  if (c215State.qz.answered) { return; }
  c215State.qz.answered = true;
  c215State.qz.total++;
  var isCorrect = selected === correct;
  if (isCorrect) { c215State.qz.correct++; }
  c215RecordAnswer(c215State.qz.queue[c215State.qz.idx].t, isCorrect);

  var opts = document.querySelectorAll('.c215-qz-opt');
  for (var i = 0; i < opts.length; i++) {
    opts[i].disabled = true;
    if (i === correct) { opts[i].classList.add('correct'); }
    else if (i === selected && !isCorrect) { opts[i].classList.add('wrong'); }
  }

  var explainEl = document.getElementById('c215QzExplain');
  if (explainEl) {
    explainEl.innerHTML = exp;
    explainEl.className = 'c215-qz-explain show';
  }
  var nextBtn = document.getElementById('c215QzNext');
  if (nextBtn) { nextBtn.className = 'c215-qz-next show'; }
}

function c215QzNext() {
  c215State.qz.answered = false;
  c215State.qz.idx++;
  c215SwitchTab('quiz');
}

function c215QzRestart() {
  c215QzApplyFilter(c215State.qz.filter);
  c215SwitchTab('quiz');
}

/* ── TRACKER TAB ── */
function c215RenderTracker(container) {
  var topics = [
    { key: 'fl', label: 'FL Rules', color: '#0f766e' },
    { key: 'life', label: 'Life Insurance', color: '#1e40af' },
    { key: 'health', label: 'Health & COBRA', color: '#166534' },
    { key: 'trade', label: 'Trade Practices', color: '#991b1b' },
    { key: 'annuity', label: 'Annuities', color: '#5b21b6' }
  ];

  var html = '<div class="c215-callout gold">'
    + '<span class="c215-callout-label">How This Works</span>'
    + 'Every quiz answer you submit is tracked here by topic. Below 70% = Needs Work. 70-89% = Getting There. 90%+ = Mastered. Take the Quiz to update your scores.'
    + '</div>';

  html += '<div class="c215-tracker-grid">';
  for (var ti = 0; ti < topics.length; ti++) {
    var tp = topics[ti];
    var d = c215State.tracker[tp.key];
    var pct = d && d.total > 0 ? Math.round(d.correct / d.total * 100) : null;
    var status = pct === null ? 'No data yet' : pct >= 90 ? 'Mastered' : pct >= 70 ? 'Getting There' : 'Needs Work';
    var statusColor = pct === null ? '#64748b' : pct >= 90 ? '#166534' : pct >= 70 ? '#92400e' : '#991b1b';
    var barColor = pct === null ? '#e2e8f0' : pct >= 90 ? '#22c55e' : pct >= 70 ? '#f5c842' : '#ef4444';
    var barWidth = pct !== null ? pct + '%' : '0%';

    html += '<div class="c215-tracker-card" style="border-top-color:' + tp.color + '">'
      + '<div class="c215-tracker-topic">' + tp.label + '</div>'
      + '<div class="c215-tracker-pct" style="color:' + statusColor + '">' + (pct !== null ? pct + '%' : '--') + '</div>'
      + '<div class="c215-tracker-status" style="color:' + statusColor + '">' + status + '</div>'
      + '<div class="c215-tracker-bar-bg"><div class="c215-tracker-bar-fill" style="width:' + barWidth + ';background:' + barColor + '"></div></div>'
      + '<div class="c215-tracker-tally">' + (d ? d.correct + ' / ' + d.total + ' correct' : 'No answers yet') + '</div>'
      + '</div>';
  }
  html += '</div>';

  // Study recommendations
  var needsWork = [];
  for (var i = 0; i < topics.length; i++) {
    var d2 = c215State.tracker[topics[i].key];
    if (d2 && d2.total > 0) {
      var p = Math.round(d2.correct / d2.total * 100);
      if (p < 70) { needsWork.push(topics[i].label); }
    }
  }

  if (needsWork.length > 0) {
    html += '<div class="c215-callout red">'
      + '<span class="c215-callout-label">Focus Here</span>'
      + '<strong>Needs Work:</strong> ' + needsWork.join(', ') + '. Open the Quiz tab, filter by these topics, and drill until you hit 90%+.'
      + '</div>';
  } else {
    html += '<div class="c215-callout green">'
      + '<span class="c215-callout-label">Status</span>'
      + (Object.keys(c215State.tracker).length === 0
        ? 'Take the Practice Quiz to start tracking your scores by topic.'
        : 'All tracked topics are at 70%+. Keep pushing toward 90%+ on each.')
      + '</div>';
  }

  html += '<button class="c215-btn" style="margin-top:1rem" onclick="c215ClearTracker()">Clear All Tracker Data</button>';

  container.innerHTML = html;
}

function c215ClearTracker() {
  if (confirm('Clear all tracker data? This cannot be undone.')) {
    c215State.tracker = {};
    try { localStorage.removeItem('c215_tracker'); } catch (e) {}
    c215SwitchTab('tracker');
  }
}

/* ── 200 Q&A TAB ── */
function c215RenderQA200(container) {
  var topicColors = { trade: '#991b1b', fl: '#0f766e', life: '#1e40af', health: '#166534', annuity: '#5b21b6' };
  var filter = c215State.qa200Filter;
  var search = c215State.qa200Search.toLowerCase();

  var html = '<div class="c215-fc-filters" style="margin-bottom:.75rem">';
  var fltrs = [
    { id: 'all', label: 'All 200' },
    { id: 'fl', label: 'FL Rules' },
    { id: 'life', label: 'Life' },
    { id: 'health', label: 'Health' },
    { id: 'trade', label: 'Trade' },
    { id: 'annuity', label: 'Annuities' },
    { id: 'trick', label: 'Tricks' }
  ];
  for (var fi = 0; fi < fltrs.length; fi++) {
    html += '<button class="c215-filter-btn' + (filter === fltrs[fi].id ? ' active' : '') + '" '
      + 'onclick="c215Qa200Filter(\'' + fltrs[fi].id + '\')">' + fltrs[fi].label + '</button>';
  }
  html += '</div>';

  html += '<input class="c215-search" type="text" placeholder="Search questions, answers, keywords..." '
    + 'value="' + c215State.qa200Search.replace(/"/g, '&quot;') + '" '
    + 'oninput="c215Qa200Search(this.value)" />';

  var filtered = QA200.filter(function(q) {
    var matchTopic = filter === 'all' || q.t === filter || (filter === 'trick' && q.trick);
    var matchSearch = !search || q.q.toLowerCase().indexOf(search) >= 0 || q.a.toLowerCase().indexOf(search) >= 0 || (q.exp && q.exp.toLowerCase().indexOf(search) >= 0);
    return matchTopic && matchSearch;
  });

  html += '<div style="font-size:.65rem;color:#64748b;margin-bottom:.75rem;font-family:monospace;letter-spacing:.08em;text-transform:uppercase;">Showing ' + filtered.length + ' of 200 questions</div>';

  for (var qi = 0; qi < filtered.length; qi++) {
    var q = filtered[qi];
    var color = topicColors[q.t] || '#475569';
    html += '<div class="c215-qa-item" style="border-left-color:' + color + '">'
      + '<div class="c215-qa-head">'
      + '<div class="c215-qa-meta">'
      + '<span class="c215-qa-n">Q' + q.n + '</span>'
      + '<span class="c215-fc-topic-badge ' + topicBadgeClass(q.t) + '">' + topicLabel(q.t) + '</span>'
      + (q.trick ? '<span class="c215-trick-badge">TRICK</span>' : '')
      + '</div>'
      + '<div class="c215-qa-q">' + q.q + '</div>'
      + '</div>'
      + '<div class="c215-qa-body">'
      + '<div class="c215-qa-ans-lbl">Correct Answer</div>'
      + '<div class="c215-qa-ans">' + q.a + '</div>'
      + '<div class="c215-qa-exp">' + q.exp + '</div>'
      + '</div>'
      + '</div>';
  }

  container.innerHTML = html;
}

function c215Qa200Filter(filter) {
  c215State.qa200Filter = filter;
  c215SwitchTab('qa200');
}

function c215Qa200Search(val) {
  c215State.qa200Search = val;
  c215SwitchTab('qa200');
}

/* ── MNEMONICS TAB ── */
function c215RenderMnemonics(container) {
  var html = '';

  var mnems = [
    {
      phrase: 'COAL -- 4 Elements of a Valid Insurance Contract',
      lines: [
        ['C', 'Consideration', 'exchange of value (premium + representations vs promise to pay claims)'],
        ['O', 'Offer and Acceptance', 'applicant offers, insurer accepts by issuing the policy'],
        ['A', 'Adequate (competent) parties', 'legally competent, right age, sound mind'],
        ['L', 'Legal purpose', 'contract cannot be for an illegal purpose']
      ]
    },
    {
      phrase: 'CUAA -- 4 Unique Aspects of Insurance Contracts',
      lines: [
        ['C', 'Conditional', 'pays ONLY if conditions are met'],
        ['U', 'Unilateral', 'ONLY the insurer is legally bound to perform'],
        ['A', 'Adhesion', 'insurer wrote it; any ambiguity favors the insured'],
        ['A', 'Aleatory', 'unequal exchange based on chance']
      ]
    },
    {
      phrase: 'C-R-E -- Nonforfeiture Options',
      lines: [
        ['C', 'Cash Surrender', 'take the cash value, policy ends completely'],
        ['R', 'Reduced Paid-Up', 'smaller permanent policy, zero more premiums, STILL builds cash value'],
        ['E', 'Extended Term', 'same face amount, limited time, NO cash value growth']
      ]
    },
    {
      phrase: 'CRAPO -- Dividend Options (only A has taxable interest)',
      lines: [
        ['C', 'Cash', 'receive dividend as cash -- NOT taxable'],
        ['R', 'Reduce premium', 'apply to next premium -- NOT taxable'],
        ['A', 'Accumulate at interest', 'leave with insurer -- INTEREST IS TAXABLE'],
        ['P', 'Paid-up additions', 'buy more whole life coverage -- NOT taxable'],
        ['O', 'One-year term', 'buy one year of term -- NOT taxable']
      ],
      warning: 'Only the A option (Accumulate at Interest) creates taxable income -- on the interest earned, not the dividend itself.'
    },
    {
      phrase: 'BATTED -- 6 Activities of Daily Living (LTC Trigger)',
      lines: [
        ['B', 'Bathing', ''],
        ['A', 'Ambulating', ''],
        ['T', 'Toileting', ''],
        ['T', 'Transferring', ''],
        ['E', 'Eating', ''],
        ['D', 'Dressing', '']
      ],
      warning: 'Must be unable to perform 2 of 6 for expected 90+ days, OR have cognitive impairment, to trigger LTC benefits.'
    },
    {
      phrase: 'Nobody Gets Canned Or Caught -- Renewability Best to Worst',
      lines: [
        ['N', 'Noncancellable', 'best: cannot cancel AND cannot raise rates -- locked forever'],
        ['G', 'Guaranteed Renewable', 'cannot cancel, CAN raise premiums for whole class'],
        ['C', 'Conditionally Renewable', 'can cancel only on specific defined conditions'],
        ['O', 'Optionally Renewable', 'insurer can cancel at renewal dates'],
        ['C', 'Cancelable', 'worst: anytime with notice']
      ]
    },
    {
      phrase: 'FREE -- SHARE -- BARE -- Medicare Part A SNF Coverage',
      lines: [
        ['Days 1-20', 'FREE', 'Medicare pays 100%'],
        ['Days 21-100', 'SHARE', 'You pay coinsurance each day'],
        ['Day 101+', 'BARE', 'Medicare pays nothing -- need LTC or pay out of pocket']
      ]
    },
    {
      phrase: 'CARE vs AID -- Medicare vs Medicaid',
      lines: [
        ['CARE', 'Medicare', 'You paid through your CAREER (FICA payroll taxes)'],
        ['AID', 'Medicaid', 'Government AID for those who need financial help (income-based)']
      ]
    },
    {
      phrase: '10 -- 21 -- 30 -- FL Free Look Periods',
      lines: [
        ['10 days', 'Life insurance', 'from date of delivery'],
        ['21 days', 'Annuity -- age 65+', 'FL-specific rule'],
        ['30 days', 'Medigap and LTC policies', 'both 30 days in Florida']
      ]
    },
    {
      phrase: '3 -- 1 -- 3 -- FL Guaranty Fund Limits',
      lines: [
        ['$300,000', 'Death benefit protection', ''],
        ['$100,000', 'Cash value protection', ''],
        ['$300,000', 'Health claims protection', '']
      ],
      warning: 'Cannot be advertised or used as a sales tool. Must disclose existence but never promote it to sell policies.'
    },
    {
      phrase: 'My Turtle Rides Cars Down Steep Underpasses -- 7 Unfair Trade Practices',
      lines: [
        ['M', 'Misrepresentation', 'lying or misleading about a policy'],
        ['T', 'Twisting', 'lies to move client to a DIFFERENT company'],
        ['R', 'Rebating', 'money or gifts to induce a purchase'],
        ['C', 'Coercion', 'threats or pressure to make someone buy'],
        ['D', 'Defamation', 'false statements to damage a competitor'],
        ['S', 'Sliding', 'adding coverage without the customer knowing'],
        ['U', 'Unfair Discrimination', 'different prices for same risk class, no reason']
      ]
    },
    {
      phrase: 'YOU pay = Tax Free / BOSS pays = Tax You -- Disability Income Tax Rule',
      lines: [
        ['YOU pay', 'Tax Free', 'you pay premiums personally (after-tax) -- benefits are completely tax-free'],
        ['BOSS pays', 'Tax You', 'employer pays premiums (pre-tax deduction) -- benefits are fully taxable as income'],
        ['Mixed', 'Proportional', 'benefits taxed in proportion to what the employer paid']
      ]
    },
    {
      phrase: '50K Free -- Group Life Tax Rule',
      lines: [
        ['First $50,000', 'Tax-free to employee', 'of employer-paid group life coverage'],
        ['Above $50,000', 'Taxable imputed income', 'calculated using IRS Table I'],
        ['Employee-paid portion', 'Always tax-free', 'paid with after-tax dollars']
      ]
    },
    {
      phrase: 'MEC = Funded Too Fast -- 7-Pay Test',
      lines: [
        ['Trigger', 'Fails 7-Pay Test', 'funded faster than 7 equal annual premiums would allow'],
        ['Consequence 1', 'Gains out FIRST (LIFO)', 'taxable on distribution'],
        ['Consequence 2', 'Loans are taxable', 'plus 10% penalty if under 59.5'],
        ['Exception', 'Death benefit STILL tax-free', 'always, even in a MEC']
      ],
      warning: 'If you MEC it, you wreck the tax benefits. But the death benefit is always income-tax free.'
    },
    {
      phrase: 'Twisting vs Churning -- Both Illegal',
      lines: [
        ['Twisting', 'Different company', 'uses false or misleading comparisons to move client to a NEW company'],
        ['Churning', 'Same company', 'replaces within the SAME company to earn new commissions'],
        ['Both', 'Illegal', 'both will appear on the exam -- know the distinction']
      ]
    },
    {
      phrase: 'Variable = Securities License / Indexed = No License',
      lines: [
        ['Variable WL', 'YES -- securities license', 'subaccounts, DFS + SEC regulated'],
        ['Variable UL (VUL)', 'YES -- securities license', 'subaccounts, DFS + SEC regulated'],
        ['Variable Annuity', 'YES -- securities license', 'separate accounts, DFS + SEC regulated'],
        ['Indexed UL (IUL)', 'NO -- no license needed', '0% floor + cap, NOT a security'],
        ['Fixed Indexed Annuity', 'NO -- no license needed', 'linked to index with floor, NOT a security']
      ],
      warning: 'Simple test: does the product have SUBACCOUNTS? YES = securities license required. NO = no securities license needed.'
    }
  ];

  html += '<div class="c215-callout gold" style="margin-bottom:1rem;">'
    + '<span class="c215-callout-label">All 16 Exam Mnemonics</span>'
    + 'Write the first 6 on your scratch paper before Question 1: COAL, C-R-E, CRAPO, BATTED, Nobody Gets Canned, My Turtle Rides. These appear constantly.'
    + '</div>';

  for (var mi = 0; mi < mnems.length; mi++) {
    var m = mnems[mi];
    html += '<div class="c215-mnemonic" style="margin-bottom:.75rem;">';
    html += '<div class="c215-mnemonic-phrase">' + m.phrase + '</div>';
    html += '<div class="c215-mnemonic-line">';
    for (var li = 0; li < m.lines.length; li++) {
      var line = m.lines[li];
      html += '<span style="color:#f5c842;font-weight:700;">' + line[0] + '</span>';
      if (line[1]) {
        html += ' <span style="color:#fff;font-weight:600;">' + line[1] + '</span>';
      }
      if (line[2]) {
        html += ' <span style="color:#94a3b8;"> -- ' + line[2] + '</span>';
      }
      html += '<br>';
    }
    html += '</div>';
    if (m.warning) {
      html += '<div style="margin-top:.6rem;padding:.5rem .8rem;background:rgba(245,200,66,.12);border-left:2px solid #f5c842;border-radius:0 6px 6px 0;font-size:.78rem;color:#fef3cd;line-height:1.5;">' + m.warning + '</div>';
    }
    html += '</div>';
  }

  // Brain dump card
  html += '<div class="c215-callout red" style="margin-top:.5rem;">'
    + '<span class="c215-callout-label">Brain Dump -- Write These on Scratch Paper Before Question 1</span>'
    + '<strong>C-R-E:</strong> Cash / Reduced Paid-Up (builds CV) / Extended Term (does NOT)<br>'
    + '<strong>COAL:</strong> Consideration / Offer & Acceptance / Adequate parties / Legal purpose<br>'
    + '<strong>CRAPO:</strong> Cash / Reduce / Accumulate (interest taxable!) / Paid-up adds / One-year term<br>'
    + '<strong>BATTED:</strong> Bathing / Ambulating / Toileting / Transferring / Eating / Dressing<br>'
    + '<strong>3-1-3:</strong> $300K death / $100K cash value / $300K health (FL Guaranty Fund)<br>'
    + '<strong>Free look:</strong> 10 days life / 21 days annuity 65+ / 30 days Medigap+LTC<br>'
    + '<strong>COBRA:</strong> 18mo termination / 36mo divorce+death / 60-day election window<br>'
    + '<strong>IRA taxes:</strong> 0% direct transfer / 20% personal rollover withheld / 10% early penalty / 25% skip RMDs<br>'
    + '<strong>Variable = YES securities license. Indexed = NO securities license.</strong>'
    + '</div>';

  container.innerHTML = html;
}


/* ── INIT ── */
function c215Init() {
  c215LoadTracker();
  var root = document.getElementById('cha-course215-root');
  if (root) {
    c215Render();
  }
}

// Expose globally so showPage can trigger init
window.c215Init = c215Init;
window.c215FcFilter = c215FcFilter;
window.c215FcReveal = c215FcReveal;
window.c215FcMark = c215FcMark;
window.c215FcNext = c215FcNext;
window.c215FcPrev = c215FcPrev;
window.c215FcShuffle = c215FcShuffle;
window.c215FcReset = c215FcReset;
window.c215QzFilter = c215QzFilter;
window.c215QzAnswer = c215QzAnswer;
window.c215QzNext = c215QzNext;
window.c215QzRestart = c215QzRestart;
window.c215SwitchTab = c215SwitchTab;
window.c215ClearTracker = c215ClearTracker;
window.c215Qa200Filter = c215Qa200Filter;
window.c215Qa200Search = c215Qa200Search;

(function hookCourse215ShowPage() {
  var origShowPage = window.showPage;
  if (typeof origShowPage === 'function') {
    window.showPage = function (id) {
      origShowPage(id);
      if (id === 'course215' && typeof window.c215Init === 'function') {
        window.c215Init();
      }
    };
  }
})();

document.addEventListener('DOMContentLoaded', c215Init);

})();