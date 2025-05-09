// Updated React component with scoring logic and dynamic profile rendering
import { useState } from "react";




// Placeholder question set (use full set in real app)
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
      "I struggle to stay consistent unless I’m highly motivated.",
      "I do okay, but it depends on the day.",
      "I finish most things I start.",
      "I’m extremely disciplined — once I begin, I always follow through."
    ]
  },
  {
    id: 4,
    category: "powerOfTwo",
    dimension: "trust",
    question: "How much autonomy are you comfortable giving your COO?",
    options: [
      "Very little – I need to stay in control of most decisions.",
      "Some – I’ll delegate once I’ve established deep trust.",
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
      "We’re a lean crew wearing too many hats — org structure isn’t really a thing yet.",
      "We’re hiring fast, but clarity is lagging — roles are blurry, and ownership shifts daily.",
      "We have roles on paper, but real accountability still depends on a few power players.",
      "Team roles and processes are strong. Accountability is built into the culture.",
      "Everything’s in its place — but we’re not always quick to pivot or reassign ownership."
    ]
  }
  // Remaining 20 questions inserted here (including neo and powerOfTwo types)
  ,
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
      "I tend to stick to what’s proven.",
      "I’ll listen but need strong evidence.",
      "I’m open to exploring new angles occasionally.",
      "I welcome fresh ideas and test them often.",
      "I actively seek out bold, unconventional strategies."
    ]
  },
  {
    id: 8,
    category: "neo",
    facet: "deliberation",
    question: "When facing a major decision, what’s your natural style?",
    options: [
      "I go with my gut quickly.",
      "I make fast decisions, then adjust.",
      "I think it through, but won’t overanalyze.",
      "I weigh pros and cons carefully.",
      "I analyze everything before making a move."
    ]
  },
  {
    id: 9,
    category: "businessStage",
    question: "What’s true of your systems and operations?",
    options: [
      "It’s mostly reactive. I’m still patching holes as we go.",
      "We’re building systems, but they often break when pressure hits.",
      "Some systems are dialed in — others get bypassed or ignored.",
      "Operations run smoothly — even when I’m not around to check.",
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
      "I like goals, but I don’t obsess over them.",
      "I try to hit goals, but I’m okay with near misses.",
      "I consistently push toward clear goals.",
      "I’m highly goal-driven and track results closely."
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
      "I’m high-energy, always multitasking or moving."
    ]
  },
  {
    id: 12,
    category: "powerOfTwo",
    dimension: "challenge",
    question: "How do you prefer to be challenged by your second-in-command?",
    options: [
      "I don’t want to be challenged — it disrupts my flow.",
      "Only in private and very diplomatically.",
      "I’m okay with pushback if it’s well-reasoned.",
      "I value directness — just keep it respectful.",
      "I want a partner who questions me openly and constructively."
    ]
  },
  {
    id: 13,
    category: "businessStage",
    question: "What’s driving your strategy and growth efforts right now?",
    options: [
      "We’re chasing product-market fit — still figuring out where to place our bets.",
      "It’s all about speed — we’re trying to outpace competition and lock in traction.",
      "We’re stabilizing — internal alignment matters more than market speed right now.",
      "We’re optimizing — refining delivery, improving margins, and protecting culture.",
      "We’re steady, but need to reignite creativity — growth is flat or dependent on legacy plays."
    ]
  },
  {
    id: 14,
    category: "neo",
    facet: "trust",
    question: "How easily do you trust new leaders in your organization?",
    options: [
      "It takes me a long time — I need full proof of competence.",
      "I’m slow to trust but open to it with evidence.",
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
      "I’ll try to work through it, even if I’m unsure.",
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
      "Not at all — I focus only on what’s in front of me.",
      "Slightly — I occasionally think ahead.",
      "Moderately — I enjoy imagining what’s possible.",
      "Often — I spend time envisioning possibilities.",
      "Constantly — I live in the future and new ideas."
    ]
  },
  {
    id: 18,
    category: "businessStage",
    question: "What’s your biggest internal challenge today?",
    options: [
      "It’s on me — I’m still holding the business together.",
      "I can’t delegate fast enough — stuff’s falling through the cracks.",
      "We’re wrestling between legacy habits and scalable systems.",
      "Protecting what works while avoiding burnout or cultural erosion.",
      "Rebuilding urgency and innovation without breaking what we’ve built."
    ]
  },
  {
    id: 19,
    category: "neo",
    facet: "altruism",
    question: "How much do you prioritize the needs of others in your leadership decisions?",
    options: [
      "I mostly prioritize my own strategy.",
      "I consider others, but it’s not my default.",
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
      "Most of it — I’ll delegate, but I stay close.",
      "Some — I want a pulse on operations without being hands-on.",
      "Very little — I’d rather not manage daily execution.",
      "None — I want the COO to fully own execution."
    ]
  },
  {
    id: 21,
    category: "neo",
    facet: "tenderMindedness",
    question: "How emotionally responsive are you to challenges or conflicts in your business?",
    options: [
      "I shut it down — I don’t deal with feelings at work.",
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
      "Not very — I pivot frequently if something isn’t working.",
      "Somewhat — I try, but I reprioritize often.",
      "Moderate — I finish most major items.",
      "Strong — I’m committed unless there’s a major shift.",
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
      "I’m fine with it but don’t seek it out.",
      "I enjoy being around my team regularly.",
      "I’m highly energized by team connection and interaction."
    ]
  },
  {
    id: 24,
    category: "powerOfTwo",
    dimension: "feedback",
    question: "How do you prefer to receive operational feedback from your COO?",
    options: [
      "Not often — I prefer to be left alone unless it’s critical.",
      "Rarely — only when something’s broken.",
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

const traitProfiles = {
  "The Visionary Hurricane": [
    { tone: "Execution-Focused Machine", trait: "Owns priorities, delivers consistently, and closes loops" },
    { tone: "Systems-Driven Builder", trait: "Puts order behind your momentum without slowing it down" },
    { tone: "Grounded & Unflappable", trait: "Brings calm to the storm and clarity to the chaos" },
    { tone: "Strategic Guardrails", trait: "Helps you stop chasing everything and focus on what matters" },
    { tone: "Quietly Accountable", trait: "Doesn't ask for attention — just keeps the business moving" },
    { tone: "Healthy Challenger", trait: "Pushes back when needed, but with loyalty and logic" }
  ],
  "The Controlled Strategist": [
    { tone: "Precision-Oriented Planner", trait: "Creates structure and order in the face of chaos" },
    { tone: "Risk-Aware Decision Maker", trait: "Thinks carefully before acting and reduces volatility" },
    { tone: "Loyal Executor", trait: "Implements your vision with discipline and patience" },
    { tone: "Data-Guided Leader", trait: "Leans into analytics and clarity, not just charisma" },
    { tone: "Consistency Over Chaos", trait: "Brings rhythm and pattern to execution and priorities" },
    { tone: "Stability Advocate", trait: "Protects what’s working and filters distractions" }
  ],
  "The Intuitive Builder": [
    { tone: "Culture-Conscious Strategist", trait: "Protects people while pushing performance" },
    { tone: "Empathetic Partner", trait: "Understands both the emotional and operational terrain" },
    { tone: "Values-Driven Builder", trait: "Anchors operations in meaning and trust" },
    { tone: "Team Whisperer", trait: "Brings cohesion to complexity and stability to vision" },
    { tone: "Supportive Challenger", trait: "Stands firm while deeply understanding your style" },
    { tone: "Soft-Spoken Enforcer", trait: "Holds accountability without eroding morale" }
  ],
  "The Lone Architect": [
    { tone: "Independent Operator", trait: "Thinks deeply, works quietly, and executes solo" },
    { tone: "Creative Mechanic", trait: "Supports innovation without unnecessary interference" },
    { tone: "Bridge to Others", trait: "Translates your internal brilliance into shared systems" },
    { tone: "Protective Collaborator", trait: "Respects boundaries while building trust" },
    { tone: "Detail Interpreter", trait: "Helps you turn nuance into repeatable operations" },
    { tone: "Trust-Builder", trait: "Provides patient accountability and responsive ownership" }
  ],
  "The Exhausted Operator": [
    { tone: "Load-Lightening Leader", trait: "Removes the burden you’re carrying so you can breathe again" },
    { tone: "Reliability Engine", trait: "Doesn’t flinch when chaos hits — they just move" },
    { tone: "Team Stabilizer", trait: "Protects your culture while you catch your breath" },
    { tone: "Ownership Advocate", trait: "Takes things off your plate and sees them through" },
    { tone: "System Builder", trait: "Builds back-end clarity while protecting front-end results" },
    { tone: "Loyal Right Hand", trait: "Stays calm, moves fast, and restores capacity" }
  ],
  "The Dispersed Generalist": [
    { tone: "Priority Clarifier", trait: "Helps you focus and stop juggling everything at once" },
    { tone: "Decision Streamliner", trait: "Cuts through noise and clears bottlenecks" },
    { tone: "Structure Maker", trait: "Brings process to your pile of tools, tactics, and ideas" },
    { tone: "Execution Partner", trait: "Turns your to-do list into what actually gets done" },
    { tone: "Business Lens Sharpening", trait: "Filters shiny objects and anchors you in outcomes" },
    { tone: "Quiet Force Multiplier", trait: "Works behind the scenes to elevate your effectiveness" }
  ]
};

const stageDescriptions = {
  earlyChaos: "Your business is still early — fast-moving, scrappy, and highly dependent on your energy. Structure is minimal, and the weight of execution still sits on your shoulders.",
  growthStrain: "The business is growing fast — but execution is inconsistent, and the team’s feeling stretched. You’re juggling momentum with increasing complexity.",
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

export default function COOFitInventory() {
  const [step, setStep] = useState(-1);
  const [userInfo, setUserInfo] = useState({ name: '', company: '', email: '', employees: '' });
  const [answers, setAnswers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    if (userInfo.name && userInfo.company && userInfo.email && userInfo.employees) {
      setStep(0);
    } else {
      alert("Please fill out all fields to begin.");
    }
  };

  const handleAnswer = (answer) => {
  const newAnswers = [...answers, answer];
  setAnswers(newAnswers);
  if (step + 1 < questions.length) {
    setStep(step + 1);
  } else {
    const computed = calculateProfile(newAnswers);
    setResult(computed);

    const payload = {
      user: userInfo,
      profile: computed.profile,
      stage: computed.stage,
      traits: computed.traits,
      answers: newAnswers
    };

    fetch("https://your-placeholder-webhook-url.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    setShowReport(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 print:bg-white print:text-black print:p-4 print:max-w-full print:shadow-none">
      <div className="mb-4 print:mb-6">
        <img src="/logo.png" alt="Company Logo" className="h-10 print:h-12" />
      </div>
      {step === -1 ? (
        <div className="border rounded p-4 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">Start Your COO Fit Inventory</h2>
            <input className="w-full border p-2 rounded mb-2" placeholder="Your Name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
            <input className="w-full border p-2 rounded mb-2" placeholder="Company Name" onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })} />
            <input className="w-full border p-2 rounded mb-2" placeholder="Email Address" type="email" onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
            <input className="w-full border p-2 rounded mb-4" placeholder="Number of Employees" onChange={(e) => setUserInfo({ ...userInfo, employees: e.target.value })} />
            <button className="bg-blue-600 text-white py-2 px-4 rounded" $1>$2</button>
          </div>
        </div>
      ) : !showReport ? (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">{questions[step].question}</h2>
            <div className="space-y-2">
              {questions[step].options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full text-left"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : result ? (
        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Your COO Fit Inventory Report</h2>
            <p className="mb-6 italic">You’re a {result.profile}. {stageDescriptions[result.stage]}</p>
            <div className="space-y-4">
              {result.traits.map((trait, idx) => (
                <div key={idx} className="border rounded p-4">
                  <h3 className="font-semibold text-lg">{trait.tone}</h3>
                  <p>{trait.trait}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-bold">Why These Traits Matter</h3>
              <ul className="list-disc list-inside">
                <li>These traits are aligned to how you lead and where your business stands today.</li>
                <li>They support your unique strengths while complementing gaps in execution.</li>
                <li>They’ll protect your energy while reinforcing trust, delivery, and culture.</li>
              </ul>
              <h3 className="text-lg font-bold">Power of Two Fit</h3>
              <ul className="list-disc list-inside">
                <li>Your ideal COO balances you — not just with skills, but style.</li>
                <li>They’ll reinforce what works while helping you grow with less friction.</li>
                <li>This match creates a dynamic partnership — one that scales well under pressure.</li>
              </ul>
              <div className="mt-6 print:hidden">
                <Button className="mr-2">Schedule a Strategic Fit Call</Button>
                <Button variant="outline" className="mr-2" onClick={() => window.print()}>Download Inventory Report as PDF</Button>
                <Button variant="secondary">Discover the Inventory Starter Packet</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
      {result && (
        <div className="mt-10 border-t pt-6 print:block print:page-break-before-always">
          <h3 className="text-xl font-bold mb-2">What’s Next: Assessing Your Potential COO</h3>
          <p className="text-base mb-4">
            You’ve clarified what kind of COO you need. Now it’s time to explore whether your current candidate — or future hire — aligns with this fit.
          </p>
          <p className="text-base">
            We’ve created a candidate assessment experience that helps you evaluate this alignment clearly and confidently. You can preview it here: [Assessment Link Placeholder] Stay tuned — we’ll send access to the starter packet and options to explore this further.
          </p>
        </div>
      )}
      <div className="mt-8 text-center text-sm text-gray-500 print:block hidden">
        <p>Generated by the COO Fit Inventory • CoEvolution Project</p>
        <p>© 2025 • <a href="https://www.coevolutionproject.com" target="_blank" rel="noopener noreferrer">www.coevolutionproject.com</a></p>
        <p>{new Date().toLocaleDateString()}</p>
        <p>Contact: hello@coevolutionproject.com</p>
        <p>Page <span className="pageNumber"></span></p>
      </div>
    </div>
  );
