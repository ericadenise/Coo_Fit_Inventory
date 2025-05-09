import React, { useState } from 'react';
import './COOFitInventory.css';

// Real questions from the original code
const questions = [
  {
    id: 1,
    category: "businessStage",
    question: "How are decisions made in your business?",
    options: [
      "I make most decisions on the fly — fast and instinct-driven.",
      "I still make most decisions, but the business is growing faster than I can scale myself.",
      "We're adding structure, but decision-making is political or unclear.",
      "Decisions are owned by the right people with the right data.",
      "Our decision-making is clean but slow — we lean on precedent more than bold moves."
    ]
  },
  {
    id: 2,
    category: "neo",
    facet: "order",
    question: "How often do you rely on structure and detailed planning to stay on top of your responsibilities?",
    options: [
      "Rarely – I go with the flow and figure it out as I go.",
      "Occasionally – I like structure but don't always follow it.",
      "Sometimes – I make loose plans and adapt when needed.",
      "Often – I plan most things carefully.",
      "Always – I rely heavily on systems and structure to function."
    ]
  },
  {
    id: 3,
    category: "neo",
    facet: "selfDiscipline",
    question: "How would you describe your follow-through on tasks you initiate?",
    options: [
      "I often start but rarely finish unless someone pushes me.",
      "I struggle to stay consistent unless I'm highly motivated.",
      "I do okay, but it depends on the day.",
      "I finish most things I start.",
      "I'm extremely disciplined — once I begin, I always follow through."
    ]
  },
  {
    id: 4,
    category: "powerOfTwo",
    dimension: "trust",
    question: "How much autonomy are you comfortable giving your COO?",
    options: [
      "Very little – I need to stay in control of most decisions.",
      "Some – I'll delegate once I've established deep trust.",
      "A fair amount – I like to collaborate but retain final say.",
      "A lot – I prefer to delegate and let them lead within their lane.",
      "Full autonomy – I want them to fully own operations."
    ]
  },
  {
    id: 5,
    category: "businessStage",
    question: "What best describes how your team is structured right now?",
    options: [
      "We're a lean crew wearing too many hats — org structure isn't really a thing yet.",
      "We're hiring fast, but clarity is lagging — roles are blurry, and ownership shifts daily.",
      "We have roles on paper, but real accountability still depends on a few power players.",
      "Team roles and processes are strong. Accountability is built into the culture.",
      "Everything's in its place — but we're not always quick to pivot or reassign ownership."
    ]
  },
  {
    id: 6,
    category: "neo",
    facet: "assertiveness",
    question: "How do you typically express your opinions in team discussions?",
    options: [
      "I rarely speak up unless asked.",
      "I sometimes contribute, but not forcefully.",
      "I share my views when I feel confident.",
      "I often voice my thoughts and influence direction.",
      "I lead discussions and drive consensus."
    ]
  },
  {
    id: 7,
    category: "neo",
    facet: "openness",
    question: "How do you approach new ideas or unconventional strategies?",
    options: [
      "I tend to stick to what's proven.",
      "I'll listen but need strong evidence.",
      "I'm open to exploring new angles occasionally.",
      "I welcome fresh ideas and test them often.",
      "I actively seek out bold, unconventional strategies."
    ]
  },
  {
    id: 8,
    category: "neo",
    facet: "deliberation",
    question: "When facing a major decision, what's your natural style?",
    options: [
      "I go with my gut quickly.",
      "I make fast decisions, then adjust.",
      "I think it through, but won't overanalyze.",
      "I weigh pros and cons carefully.",
      "I analyze everything before making a move."
    ]
  },
  {
    id: 9,
    category: "businessStage",
    question: "What's true of your systems and operations?",
    options: [
      "It's mostly reactive. I'm still patching holes as we go.",
      "We're building systems, but they often break when pressure hits.",
      "Some systems are dialed in — others get bypassed or ignored.",
      "Operations run smoothly — even when I'm not around to check.",
      "Operations are clean and predictable, but sometimes overly rigid or slow to adapt."
    ]
  },
  {
    id: 10,
    category: "neo",
    facet: "achievementStriving",
    question: "How driven are you by goals and performance benchmarks?",
    options: [
      "Not very — I care more about process than outcome.",
      "I like goals, but I don't obsess over them.",
      "I try to hit goals, but I'm okay with near misses.",
      "I consistently push toward clear goals.",
      "I'm highly goal-driven and track results closely."
    ]
  },
  {
    id: 11,
    category: "neo",
    facet: "activity",
    question: "How do you manage your day-to-day pace and workload?",
    options: [
      "I prefer a slower pace and time to think.",
      "I like to ease into things and avoid high-pressure flow.",
      "I manage a balanced pace.",
      "I tend to stay active and involved all day.",
      "I'm high-energy, always multitasking or moving."
    ]
  },
  {
    id: 12,
    category: "powerOfTwo",
    dimension: "challenge",
    question: "How do you prefer to be challenged by your second-in-command?",
    options: [
      "I don't want to be challenged — it disrupts my flow.",
      "Only in private and very diplomatically.",
      "I'm okay with pushback if it's well-reasoned.",
      "I value directness — just keep it respectful.",
      "I want a partner who questions me openly and constructively."
    ]
  },
  {
    id: 13,
    category: "businessStage",
    question: "What's driving your strategy and growth efforts right now?",
    options: [
      "We're chasing product-market fit — still figuring out where to place our bets.",
      "It's all about speed — we're trying to outpace competition and lock in traction.",
      "We're stabilizing — internal alignment matters more than market speed right now.",
      "We're optimizing — refining delivery, improving margins, and protecting culture.",
      "We're steady, but need to reignite creativity — growth is flat or dependent on legacy plays."
    ]
  },
  {
    id: 14,
    category: "neo",
    facet: "trust",
    question: "How easily do you trust new leaders in your organization?",
    options: [
      "It takes me a long time — I need full proof of competence.",
      "I'm slow to trust but open to it with evidence.",
      "I cautiously give people the benefit of the doubt.",
      "I trust people fairly quickly unless they give me a reason not to.",
      "I give trust easily and build relationships fast."
    ]
  },
  {
    id: 15,
    category: "neo",
    facet: "modesty",
    question: "How do you typically carry yourself with your team or peers?",
    options: [
      "I carry strong authority and prefer recognition.",
      "I like to be visible and influential.",
      "I balance confidence with humility.",
      "I prefer a low profile and quiet influence.",
      "I avoid attention and let others take credit."
    ]
  },
  {
    id: 16,
    category: "neo",
    facet: "competence",
    question: "How confident are you in managing unexpected business issues?",
    options: [
      "I tend to get overwhelmed easily.",
      "I often freeze or avoid tough calls.",
      "I'll try to work through it, even if I'm unsure.",
      "I handle most issues calmly and methodically.",
      "I thrive in challenges and feel highly competent."
    ]
  },
  {
    id: 17,
    category: "neo",
    facet: "fantasy",
    question: "How active is your internal world of ideas and future thinking?",
    options: [
      "Not at all — I focus only on what's in front of me.",
      "Slightly — I occasionally think ahead.",
      "Moderately — I enjoy imagining what's possible.",
      "Often — I spend time envisioning possibilities.",
      "Constantly — I live in the future and new ideas."
    ]
  },
  {
    id: 18,
    category: "businessStage",
    question: "What's your biggest internal challenge today?",
    options: [
      "It's on me — I'm still holding the business together.",
      "I can't delegate fast enough — stuff's falling through the cracks.",
      "We're wrestling between legacy habits and scalable systems.",
      "Protecting what works while avoiding burnout or cultural erosion.",
      "Rebuilding urgency and innovation without breaking what we've built."
    ]
  },
  {
    id: 19,
    category: "neo",
    facet: "altruism",
    question: "How much do you prioritize the needs of others in your leadership decisions?",
    options: [
      "I mostly prioritize my own strategy.",
      "I consider others, but it's not my default.",
      "I try to balance my goals with team needs.",
      "I often adjust based on team needs.",
      "I almost always prioritize others before myself."
    ]
  },
  {
    id: 20,
    category: "powerOfTwo",
    dimension: "control",
    question: "How much control do you want to retain over day-to-day operations?",
    options: [
      "All of it — I need to be involved in every detail.",
      "Most of it — I'll delegate, but I stay close.",
      "Some — I want a pulse on operations without being hands-on.",
      "Very little — I'd rather not manage daily execution.",
      "None — I want the COO to fully own execution."
    ]
  },
  {
    id: 21,
    category: "neo",
    facet: "tenderMindedness",
    question: "How emotionally responsive are you to challenges or conflicts in your business?",
    options: [
      "I shut it down — I don't deal with feelings at work.",
      "I ignore it and focus on performance.",
      "I acknowledge it if necessary.",
      "I try to understand emotional impact.",
      "I lead with empathy and emotional insight."
    ]
  },
  {
    id: 22,
    category: "neo",
    facet: "dutifulness",
    question: "How committed are you to following through on organizational commitments?",
    options: [
      "Not very — I pivot frequently if something isn't working.",
      "Somewhat — I try, but I reprioritize often.",
      "Moderate — I finish most major items.",
      "Strong — I'm committed unless there's a major shift.",
      "Very strong — I always follow through."
    ]
  },
  {
    id: 23,
    category: "neo",
    facet: "gregariousness",
    question: "How energized are you by being around and engaging with your team?",
    options: [
      "I prefer to work alone as much as possible.",
      "I tolerate group work but avoid it when I can.",
      "I'm fine with it but don't seek it out.",
      "I enjoy being around my team regularly.",
      "I'm highly energized by team connection and interaction."
    ]
  },
  {
    id: 24,
    category: "powerOfTwo",
    dimension: "feedback",
    question: "How do you prefer to receive operational feedback from your COO?",
    options: [
      "Not often — I prefer to be left alone unless it's critical.",
      "Rarely — only when something's broken.",
      "Sometimes — I like occasional insight and alignment.",
      "Often — I want updates and insight into execution.",
      "Constantly — I expect transparent and regular feedback."
    ]
  },
  {
    id: 25,
    category: "businessStage",
    question: "Which of these best reflects your focus for the next 6–12 months?",
    options: [
      "Survival — make it through without collapsing.",
      "Stability — get control over growth chaos.",
      "Structure — clean up and formalize execution.",
      "Scale — grow the right things the right way.",
      "Renewal — rebuild innovation and internal trust."
    ]
  }
];

// Enhanced trait profiles with expanded descriptions
const traitProfiles = {
  "The Visionary Hurricane": [
    { 
      tone: "Execution-Focused Machine", 
      trait: "Owns priorities, delivers consistently, and closes loops",
      expanded: "This partner brings structured reliability to your visionary energy. While you generate ideas rapidly, they create the systems to capture, prioritize, and execute them. They transform your vision into tangible outcomes through methodical planning, consistent follow-through, and relentless focus on results. Look for someone who maintains detailed task lists, consistently completes what they start, and finds satisfaction in crossing items off their list—reflecting their natural discipline and organizational skills."
    },
    { 
      tone: "Systems-Driven Builder", 
      trait: "Puts order behind your momentum without slowing it down",
      expanded: "Where you might resist structure that feels constraining, this partner thrives on creating organized frameworks that enhance rather than hinder your creativity. They naturally develop repeatable processes, documentation, and logical structures. They'll transform your fast-moving operation from reactive to proactive by implementing systems that scale your vision while preserving your ability to move quickly and pivot when needed."
    },
    { 
      tone: "Grounded & Unflappable", 
      trait: "Brings calm to the storm and clarity to the chaos",
      expanded: "This trait represents emotional stability combined with a cooperative approach. In high-pressure situations where you might feel heightened stress or impatience, this partner remains steady and emotionally balanced. Their calm decision-making under pressure complements your intensity. They're the stabilizing force who can absorb the turbulence of rapid growth, helping the team distinguish between genuine emergencies and normal business challenges."
    },
    { 
      tone: "Strategic Guardrails", 
      trait: "Helps you stop chasing everything and focus on what matters",
      expanded: "This partner possesses careful thinking combined with the confidence to provide constructive challenge. They help filter your stream of ideas through strategic lenses, preventing wasteful diversions while protecting your core innovations. Look for someone who can respectfully push back, asking clarifying questions that reveal which opportunities truly align with your vision, and which are distractions. They'll help you avoid the 'shiny object syndrome' that derails many visionary leaders."
    },
    { 
      tone: "Quietly Accountable", 
      trait: "Doesn't ask for attention — just keeps the business moving",
      expanded: "This reflects someone with a strong sense of responsibility combined with lower need for excitement and moderate humility. They don't need the spotlight but take profound satisfaction in organizational achievement. They'll diligently track commitments across the business, foster a culture of accountability, and ensure the team delivers on promises. They value results over recognition, creating stability and reliability in execution that allows you to focus on the future."
    },
    { 
      tone: "Healthy Challenger", 
      trait: "Pushes back when needed, but with loyalty and logic",
      expanded: "With balanced assertiveness and high candor, this partner provides the crucial counterbalance visionary leaders need. They're comfortable delivering candid feedback, questioning assumptions, and presenting alternative perspectives—without undermining your leadership. Their focus remains on strengthening ideas rather than competitive posturing. This healthy tension prevents groupthink while maintaining strong mutual respect and organizational alignment."
    }
  ],
  "The Controlled Strategist": [
    { 
      tone: "Precision-Oriented Planner", 
      trait: "Creates structure and order in the face of chaos",
      expanded: "This partner excels at bringing methodical organization to your analytical approach. With a highly disciplined mindset and natural orderliness, they design systems that transform abstract strategies into concrete action plans. While you focus on conceptual frameworks and strategic direction, they establish the detailed processes needed for flawless implementation. Look for someone who finds satisfaction in creating clarity from complexity through structured planning, standard operating procedures, and defined metrics."
    },
    { 
      tone: "Risk-Aware Decision Maker", 
      trait: "Thinks carefully before acting and reduces volatility",
      expanded: "This reflects thoughtful consideration combined with constructive caution directed toward positive risk management. Unlike impulsive operators who might create unpredictable outcomes, this partner conducts thoughtful scenario planning and anticipates potential issues before they arise. They balance your careful strategic approach with complementary operational risk management, ensuring that execution stays aligned with your measured vision while preventing avoidable disruptions."
    },
    { 
      tone: "Loyal Executor", 
      trait: "Implements your vision with discipline and patience",
      expanded: "With a strong sense of commitment and respect for guidance, this partner demonstrates exceptional dedication to transforming your strategies into reality. They take deep personal responsibility for executing plans exactly as envisioned. Their strong sense of organizational loyalty means they'll preserve your strategic intent throughout implementation, even when facing obstacles. They find satisfaction in methodically building what you've designed, making them the perfect complement to your strategic mind."
    },
    { 
      tone: "Data-Guided Leader", 
      trait: "Leans into analytics and clarity, not just charisma",
      expanded: "This partner shares your appreciation for objective analysis but applies it to different domains. While you focus on strategic data, they monitor operational metrics that reveal execution quality. Their moderate sociability combined with careful deliberation means they lead through evidence rather than force of personality. Look for someone who naturally thinks in measurable outcomes, regularly refers to data in conversations, and builds dashboards that translate complex operations into clear insights."
    },
    { 
      tone: "Consistency Over Chaos", 
      trait: "Brings rhythm and pattern to execution and priorities",
      expanded: "This reflects strong self-discipline and moderate energy levels. Unlike erratic operators who create confusion with constantly shifting priorities, this partner establishes dependable cadences for work—regular review cycles, consistent communication patterns, and predictable resource allocation. They'll create the operational stability your analytical mind values, reducing the friction and noise that can distract from your strategic focus."
    },
    { 
      tone: "Stability Advocate", 
      trait: "Protects what's working and filters distractions",
      expanded: "With a measured approach to change but high capability, this partner excels at preserving and optimizing systems that produce results. They resist arbitrary changes while remaining receptive to evidence-based improvements. This provides essential continuity while you consider long-term strategic shifts. They help distinguish between genuine opportunities and diversions by evaluating how potential changes might impact operational stability and team effectiveness."
    }
  ],
  "The Intuitive Builder": [
    { 
      tone: "Culture-Conscious Strategist", 
      trait: "Protects people while pushing performance",
      expanded: "This partner balances natural cooperation with strong drive for results. They understand that sustainable performance requires both human connection and clear standards. While you naturally focus on relationship dynamics and team cohesion, they apply this sensibility to creating performance systems that challenge people without burning them out. Look for someone who regularly discusses both team wellbeing and objective metrics, seeing them as complementary rather than competing priorities."
    },
    { 
      tone: "Empathetic Partner", 
      trait: "Understands both the emotional and operational terrain",
      expanded: "With high emotional intelligence and capacity for trust, this partner excels at reading both organizational dynamics and individual needs. They translate your people-centric intuition into practical systems that honor relationships while driving results. They'll notice subtle shifts in team energy or engagement that might escape more task-focused operators, allowing early intervention before small issues become significant problems."
    },
    { 
      tone: "Values-Driven Builder", 
      trait: "Anchors operations in meaning and trust",
      expanded: "This reflects strong care for others combined with practical capability. Unlike purely metrics-driven operators, this partner builds systems that express and reinforce your organization's deeper values. They understand that how work gets done matters as much as what gets accomplished. They naturally embed your cultural priorities into everyday operational practices, creating alignment between stated values and lived experience that builds authentic trust throughout the organization."
    },
    { 
      tone: "Team Whisperer", 
      trait: "Brings cohesion to complexity and stability to vision",
      expanded: "With balanced sociability and natural trust, this partner excels at fostering genuine collaboration across different functions. They translate your intuitive understanding of team dynamics into practical collaboration structures. They create the conditions for psychological safety while maintaining accountability, allowing diverse perspectives to emerge without devolving into unproductive conflict. They're particularly skilled at helping technical and non-technical team members find common ground."
    },
    { 
      tone: "Supportive Challenger", 
      trait: "Stands firm while deeply understanding your style",
      expanded: "This partner demonstrates healthy assertiveness balanced with respect for direction. They provide the crucial blend of support and constructive challenge that intuitive leaders need. They respect your people-first approach while ensuring it doesn't lead to avoidance of difficult decisions. Look for someone comfortable having candid conversations, providing feedback, and addressing performance issues directly—but who does so with genuine care and interpersonal skill rather than cold detachment."
    },
    { 
      tone: "Soft-Spoken Enforcer", 
      trait: "Holds accountability without eroding morale",
      expanded: "With moderate assertiveness combined with high emotional intelligence, this partner maintains performance standards without creating unnecessary tension. Unlike forceful operators who might damage the culture you've built, they create accountability through clear expectations and consistent follow-through rather than dominance. They embody the principle that compassion and accountability are complementary forces rather than opposing values."
    }
  ],
  "The Lone Architect": [
    { 
      tone: "Independent Operator", 
      trait: "Thinks deeply, works quietly, and executes solo",
      expanded: "This partner shares your preference for independent work while complementing it with practical execution skills. Where you focus on intellectual exploration and conceptual design, they apply similar independent focus to implementation. They require minimal oversight and thrive on autonomous problem-solving. Look for someone who demonstrates consistent self-direction, requires little external motivation, and produces high-quality output without constant collaboration."
    },
    { 
      tone: "Creative Mechanic", 
      trait: "Supports innovation without unnecessary interference",
      expanded: "With moderate openness to new ideas and strong capability, this partner respects your creative process while providing the technical foundation it requires. They understand when to apply structure and when to preserve flexibility. Unlike rigidly systematic operators who might constrain your thinking, they create enabling frameworks that support your innovation process without overwhelming it with unnecessary process. They translate your conceptual breakthroughs into scalable systems."
    },
    { 
      tone: "Bridge to Others", 
      trait: "Translates your internal brilliance into shared systems",
      expanded: "This reflects moderate sociability combined with natural straightforwardness. While comfortable with your more reserved style, this partner excels at the external communication and stakeholder management your ideas require to gain traction. They respect your need for deep thinking space while ensuring your insights reach and influence the broader organization. They transform your complex internal models into accessible frameworks others can understand and implement."
    },
    { 
      tone: "Protective Collaborator", 
      trait: "Respects boundaries while building trust",
      expanded: "With natural trust balanced with respect for guidelines, this partner understands your need for psychological space while creating the collaborative interfaces your business requires. They'll buffer you from unnecessary social demands while ensuring critical relationships remain strong. Look for someone who intuitively recognizes when to include you in discussions versus when to represent your interests, protecting your focus while maintaining organizational alignment."
    },
    { 
      tone: "Detail Interpreter", 
      trait: "Helps you turn nuance into repeatable operations",
      expanded: "This partner combines orderliness with emotional intelligence, allowing them to perceive the subtle distinctions in your thinking and translate them into clear operational guidelines. They extract the critical elements from your complex mental models and transform them into processes others can follow consistently. They find satisfaction in meticulously documenting and systematizing your insights, creating leverage that extends your intellectual impact across the organization."
    },
    { 
      tone: "Trust-Builder", 
      trait: "Provides patient accountability and responsive ownership",
      expanded: "With strong sense of responsibility and balanced assertiveness, this partner demonstrates deep commitment to your vision while providing the accountability mechanisms it requires. Rather than demanding immediate results or constant updates (which might feel intrusive to your thinking style), they establish clear agreements, maintain unobtrusive progress tracking, and provide thoughtful updates aligned with your communication preferences."
    }
  ],
  "The Exhausted Operator": [
    { 
      tone: "Load-Lightening Leader", 
      trait: "Removes the burden you're carrying so you can breathe again",
      expanded: "This partner demonstrates strong capability coupled with dedication to commitments, allowing them to assume responsibility for operational domains that are currently consuming your energy. Unlike partially-committed deputies who require constant oversight, they take complete ownership of their areas, driving results while truly reducing your cognitive and emotional load. Look for someone with demonstrated capacity to fully own complex functions, make sound independent decisions, and proactively solve problems before escalating."
    },
    { 
      tone: "Reliability Engine", 
      trait: "Doesn't flinch when chaos hits — they just move",
      expanded: "With emotional resilience and strong self-discipline, this partner maintains steady productivity regardless of circumstances. While you've been managing through exhaustion, they bring fresh energy and emotional stability. They thrive under pressure, maintaining clear thinking and decisive action even during crises. Their consistent execution creates a foundation of stability that allows you to gradually recover from burnout without fearing operational collapse."
    },
    { 
      tone: "Team Stabilizer", 
      trait: "Protects your culture while you catch your breath",
      expanded: "This reflects balanced interpersonal warmth with high emotional intelligence. This partner understands that your current exhaustion makes cultural stewardship challenging, so they step in to maintain team cohesion and values alignment. They recognize subtle signs of cultural drift and address them proactively. They reinforce your leadership vision through their daily interactions, preserving what you've built while giving you space to recharge."
    },
    { 
      tone: "Ownership Advocate", 
      trait: "Takes things off your plate and sees them through",
      expanded: "With strong drive for achievement and natural competence, this partner demonstrates complete follow-through rather than partial handoffs. Unlike operators who escalate decisions back to you, they take genuine ownership of outcomes. They establish clear decision rights, maintain appropriate transparency, and develop the organizational muscle of distributed accountability. They understand that true relief requires transferring not just tasks but results ownership."
    },
    { 
      tone: "System Builder", 
      trait: "Builds back-end clarity while protecting front-end results",
      expanded: "This partner combines natural orderliness with careful consideration, creating the operational infrastructure your organization needs without disrupting current performance. They implement systems methodically, starting with the most pressing operational gaps. They understand that in your exhausted state, you need both immediate relief and long-term structural solutions, sequencing improvements to deliver both simultaneously."
    },
    { 
      tone: "Loyal Right Hand", 
      trait: "Stays calm, moves fast, and restores capacity",
      expanded: "With strong commitment to obligations and moderate trust, this partner demonstrates unwavering dedication to both you and the organization during this challenging period. They step up without seeking to replace you, supporting your leadership while creating space for recovery. Look for someone who naturally picks up slack without drawing attention to it, maintains appropriate confidentiality, and genuinely wants to see you succeed rather than seeing your exhaustion as their opportunity."
    }
  ],
  "The Dispersed Generalist": [
    { 
      tone: "Priority Clarifier", 
      trait: "Helps you focus and stop juggling everything at once",
      expanded: "This partner brings natural order and thoughtful consideration to your diverse interests and activities. While you naturally engage with a wide range of opportunities, they excel at evaluating relative importance and strategic alignment. They create the filtering mechanisms and prioritization frameworks that prevent diffusion of effort. Look for someone who consistently asks 'why this matters now' and can diplomatically redirect energy from interesting but non-critical activities toward genuine strategic priorities."
    },
    { 
      tone: "Decision Streamliner", 
      trait: "Cuts through noise and clears bottlenecks",
      expanded: "With strong capability and self-discipline, this partner accelerates organizational decision-making that might otherwise stall due to your broad focus. They establish clear decision processes, appropriate delegation thresholds, and efficient information flows. Unlike operators who might make decisions unilaterally, they focus on creating systems that enable faster, better decisions throughout the organization while maintaining appropriate involvement from you on truly strategic matters."
    },
    { 
      tone: "Structure Maker", 
      trait: "Brings process to your pile of tools, tactics, and ideas",
      expanded: "This reflects natural reliability combined with moderate openness to new approaches. This partner excels at organizing diverse initiatives into coherent frameworks without stifling creativity. They create the connective tissue between your various activities, identifying synergies and dependencies that might otherwise be missed. They transform apparent fragmentation into intentional portfolio management, revealing the underlying logic in your diverse interests."
    },
    { 
      tone: "Execution Partner", 
      trait: "Turns your to-do list into what actually gets done",
      expanded: "With strong achievement drive and sense of responsibility, this partner transforms intentions into completed actions. They establish the accountability mechanisms, progress tracking, and follow-through habits that convert your extensive idea generation into tangible outcomes. Unlike reactive operators, they build proactive execution systems that anticipate needs and prevent last-minute scrambles. They find satisfaction in moving initiatives from concept to completion."
    },
    { 
      tone: "Business Lens Sharpening", 
      trait: "Filters shiny objects and anchors you in outcomes",
      expanded: "This partner demonstrates careful deliberation combined with results orientation. They help evaluate opportunities through rigorous business criteria rather than novelty or intellectual interest alone. They maintain focus on key performance indicators and strategic outcomes when competing priorities emerge. Look for someone who consistently references impact measures in discussions, naturally asks about expected returns, and helps distinguish between genuinely promising opportunities and interesting distractions."
    },
    { 
      tone: "Quiet Force Multiplier", 
      trait: "Works behind the scenes to elevate your effectiveness",
      expanded: "With moderate humility and strong capability, this partner amplifies your impact without seeking personal recognition. They identify opportunities to systematize your strengths and compensate for gaps in your attention. They create leverage through thoughtful delegation, process design, and resource alignment. Their focus remains on organizational results rather than personal visibility, making them the ideal complement to your wide-ranging leadership style."
    }
  ]
};

const stageDescriptions = {
  earlyChaos: "Your business is still early — fast-moving, scrappy, and highly dependent on your energy. Structure is minimal, and the weight of execution still sits on your shoulders.",
  growthStrain: "The business is growing fast — but execution is inconsistent, and the team's feeling stretched. You're juggling momentum with increasing complexity.",
  transitionalTension: "You're at a turning point — the team is growing, and roles are evolving, but alignment is messy. You're balancing speed with the need for real systems.",
  operationalMaturity: "Your company has strong systems and clear roles. Execution is reliable, but it can come at the cost of innovation or flexibility.",
  slowingInnovation: "Operations are steady, but things are starting to feel too predictable. Innovation feels harder. You need to reignite momentum without breaking what works."
};

function calculateProfile(answers) {
  const neoScores = {};
  const powerPrefs = {
    trust: 0,
    control: 0,
    challenge: 0,
    feedback: 0
  };
  const stageAnswers = [];

  answers.forEach((answer, i) => {
    if (i >= questions.length) return; // Safety check
    
    const question = questions[i];
    const score = question.options.indexOf(answer) + 1;
    
    if (question.category === 'neo') {
      if (!neoScores[question.facet]) neoScores[question.facet] = [];
      neoScores[question.facet].push(score);
    } else if (question.category === 'powerOfTwo') {
      powerPrefs[question.dimension] += score;
    } else if (question.category === 'businessStage') {
      stageAnswers.push(score);
    }
  });

  // Make sure we have stage answers to avoid division by zero
  if (stageAnswers.length === 0) {
    return {
     profile: "The Dispersed Generalist", // Default profile
      stage: "transitionalTension", // Default stage
      traits: traitProfiles["The Dispersed Generalist"]
    };
  }

  const avgStage = stageAnswers.reduce((a, b) => a + b, 0) / stageAnswers.length;
  let stage = 'transitionalTension';
  if (avgStage <= 1.8) stage = 'earlyChaos';
  else if (avgStage <= 2.4) stage = 'growthStrain';
  else if (avgStage <= 3.2) stage = 'transitionalTension';
  else if (avgStage <= 4) stage = 'operationalMaturity';
  else stage = 'slowingInnovation';

  const facetAverages = {};
  for (const facet in neoScores) {
    const scores = neoScores[facet];
    facetAverages[facet] = scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  const high = (val) => val >= 4;
  const low = (val) => val <= 2.4;

  let profile = "The Dispersed Generalist";

  if (high(facetAverages.fantasy) && low(facetAverages.order)) {
    profile = "The Visionary Hurricane";
  } else if (high(facetAverages.order) && low(facetAverages.openness)) {
    profile = "The Controlled Strategist";
  } else if (high(facetAverages.altruism) && high(facetAverages.tenderMindedness)) {
    profile = "The Intuitive Builder";
  } else if (high(facetAverages.fantasy) && low(facetAverages.gregariousness)) {
    profile = "The Lone Architect";
  } else if (high(facetAverages.dutifulness) && low(facetAverages.activity)) {
    profile = "The Exhausted Operator";
  }

  return {
    profile,
    stage,
    traits: traitProfiles[profile]
  };
}

function App() {
  const today = new Date().toLocaleDateString();
  const [step, setStep] = useState(-1);
  const [userInfo, setUserInfo] = useState({ name: '', company: '', email: '', employees: '' });
  const [answers, setAnswers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleStart = () => {
    if (userInfo.name && userInfo.company && userInfo.email && userInfo.employees) {
      setStep(0);
      setError(null);
    } else {
      setError("Please fill out all fields to begin.");
    }
  };

  const handleAnswer = (answer) => {
    try {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      if (step + 1 < questions.length) {
        setStep(step + 1);
      } else {
        const computed = calculateProfile(newAnswers);
        setResult(computed);

        // Optional: Add fetch with error handling
        try {
          fetch("https://your-placeholder-webhook-url.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user: userInfo,
              profile: computed.profile,
              stage: computed.stage,
              traits: computed.traits,
              answers: newAnswers
            })
          });
        } catch (err) {
          console.error("Error submitting data:", err);
        }

        setShowReport(true);
      }
    } catch (err) {
      console.error("Error processing answer:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="inventory-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Company Logo" className="company-logo" />
      </div>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      <div className="content-wrapper">
        {step === -1 ? (
          <div className="intro-section">
            <div className="user-info-form">
              <h1 className="form-title">Your COO - Power of Two Profile</h1>
              <h2 className="form-subtitle">Discover your leadership profile and ideal operations partner</h2>
              
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input 
                  id="name"
                  className="input-field" 
                  placeholder="e.g., Jane Smith" 
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} 
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="company">Company</label>
                <input 
                  id="company"
                  className="input-field" 
                  placeholder="e.g., Acme Inc." 
                  value={userInfo.company}
                  onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })} 
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input 
                  id="email"
                  className="input-field" 
                  placeholder="e.g., jane@example.com" 
                  type="email" 
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} 
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="employees">Team Size</label>
                <input 
                  id="employees"
                  className="input-field" 
                  placeholder="e.g., 25" 
                  value={userInfo.employees}
                  onChange={(e) => setUserInfo({ ...userInfo, employees: e.target.value })} 
                />
              </div>
              
              <button className="start-button" onClick={handleStart}>
                Begin Inventory
              </button>
              
              <p className="privacy-note">Your information will only be used to provide your personalized report.</p>
            </div>
          </div>
        ) : !showReport ? (
          <div className="question-section">
            <div className="question-container">
              <div className="progress-bar">
                <div className="progress-indicator" style={{ width: `${(step / (questions.length - 1)) * 100}%` }}></div>
              </div>
              <p className="question-counter">Question {step + 1} of {questions.length}</p>
              
              <h2 className="question-text">{questions[step].question}</h2>
              
              <div className="options-container">
                {questions[step].options.map((option, idx) => (
                  <button
                    key={idx}
                    className="option-button"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : result ? (
          <div className="report-section">
            <div className="report-container">
              <div className="report-header">
                <h2 className="report-title">Your COO - Power of Two Profile™ Results</h2>
                <p className="report-date">{today}</p>
              </div>
              
              <div className="profile-card">
                <h3 className="profile-title">{result.profile}</h3>
                <p className="profile-description">{stageDescriptions[result.stage]}</p>
              </div>
              
              <div className="traits-wrapper">
                <h3 className="traits-title">Your Ideal Operations Partner</h3>
                <div className="traits-container">
                  {result.traits.map((trait, idx) => (
                    <div key={idx} className="trait-card">
                      <div className="trait-header">
                        <span className="trait-number">{idx + 1}</span>
                        <h4 className="trait-title">{trait.tone}</h4>
                      </div>
                      <p className="trait-description">{trait.trait}</p>
                      <hr style={{ margin: "1rem 0", borderTop: "1px solid #e1e4e8", borderBottom: "none" }} />
                      <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>{trait.expanded}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="insights-container">
                <div className="insight-column">
                  <h3 className="insights-title">Why These Traits Matter</h3>
                  <ul className="insights-list">
                    <li>These traits are specifically aligned to <strong style={{ color: "#4a6bda" }}>your leadership style</strong> and where your business stands today.</li>
                    <li>They're designed to support your unique strengths while complementing gaps in your execution approach.</li>
                    <li>The right COO with these traits will protect your energy while reinforcing trust, delivery, and culture.</li>
                    <li>These traits reflect underlying personality factors that ensure deeper compatibility beyond just skills or experience.</li>
                  </ul>
                </div>
                
                <div className="insight-column">
                  <h3 className="insights-title">Power of Two Fit</h3>
                  <ul className="insights-list">
                    <li>Your ideal COO balances you — not just with skills, but with complementary personality traits and work style.</li>
                    <li>They'll reinforce what works while helping you grow with less friction and better alignment.</li>
                    <li>This match creates a dynamic partnership — one that scales well under pressure and adapts to changing needs.</li>
                    <li>Together, you can create a leadership dynamic where 1 + 1 = 3 in terms of organizational impact.</li>
                  </ul>
                </div>
              </div>
              
             <div className="action-section">
                <h3 className="action-title">Next Steps</h3>
                <div className="action-buttons">
                  <a 
                    href="https://calendly.com/ericalane/employee_selection_strategy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-button primary-button"
                    style={{ textDecoration: "none" }}
                  >
                    Schedule an Employee Selection Strategy Call
                  </a>
                  
                  <button className="action-button secondary-button" onClick={() => window.print()}>
                    Download Report as PDF
                  </button>
                  
                  <a 
                    href="https://coevolutionproject.com/assessment-starter-package/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-button secondary-button"
                    style={{ textDecoration: "none" }}
                  >
                    The Assessment Starter Pack
                  </a>
                </div>
              </div>
            </div>
            
         <div className="action-section">
                <h3 className="action-title">Next Steps</h3>
                <div className="action-buttons">
                  <a 
                    href="https://calendly.com/ericalane/employee_selection_strategy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-button primary-button"
                    style={{ textDecoration: "none" }}
                  >
                    Schedule an Employee Selection Strategy Call
                  </a>
                  
                  <button className="action-button secondary-button" onClick={() => window.print()}>
                    Download Report as PDF
                  </button>
                  
                  <a 
                    href="https://coevolutionproject.com/assessment-starter-package/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-button secondary-button"
                    style={{ textDecoration: "none" }}
                  >
                    The Assessment Starter Pack
                  </a>
                </div>
              </div>
            </div>
            
            <div className="next-steps-section">
              <h3 className="next-steps-title">What's Next: Assessing Your Potential COO</h3>
              <p className="next-steps-text">
                You've clarified what kind of COO you need. Now it's time to explore whether your current candidate — or future hire — aligns with this fit.
              </p>
              <p className="next-steps-text">
                <a 
                  href="https://calendly.com/ericalane/employee_selection_strategy" 
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Strategy Call
                </a> to discuss your COO/Second-in-Command needs.
              </p>
            </div>
          </div>
        ) : null}
      </div>
      
      <div className="footer">
        <div className="footer-content">
          <p>Generated by the COO Fit Inventory • CoEvolution Project</p>
          <p>© 2025 • <a href="https://www.coevolutionproject.com" target="_blank" rel="noopener noreferrer" className="footer-link">www.coevolutionproject.com</a></p>
          <p>Contact: <a href="mailto:hello@coevolutionproject.com" className="footer-link">hello@coevolutionproject.com</a></p>
          <p>Page <span className="page-number">1</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;
