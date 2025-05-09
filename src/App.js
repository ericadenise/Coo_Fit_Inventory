// Updated React component with scoring logic and dynamic profile rendering
import { useState, useEffect } from "react";

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
  // ... rest of questions array
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
    { tone: "Stability Advocate", trait: "Protects what's working and filters distractions" }
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
    { tone: "Load-Lightening Leader", trait: "Removes the burden you're carrying so you can breathe again" },
    { tone: "Reliability Engine", trait: "Doesn't flinch when chaos hits — they just move" },
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
    if (i >= questions.length) return; // Safety check for index out of bounds
    
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

export default function COOFitInventory() {
  const today = new Date().toLocaleDateString();
  const [step, setStep] = useState(-1);
  const [userInfo, setUserInfo] = useState({ name: '', company: '', email: '', employees: '' });
  const [answers, setAnswers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Set page number in the footer
  useEffect(() => {
    if (showReport) {
      setCurrentPage(1);
    }
  }, [showReport]);

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
        setIsSubmitting(true);
        const computed = calculateProfile(newAnswers);
        setResult(computed);

        const payload = {
          user: userInfo,
          profile: computed.profile,
          stage: computed.stage,
          traits: computed.traits,
          answers: newAnswers
        };

        // Add error handling to the fetch request
        fetch("https://your-placeholder-webhook-url.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Submission successful:", data);
          setShowReport(true);
        })
        .catch(err => {
          console.error("Error submitting inventory:", err);
          // Continue to show the report even if the submission fails
          setError("There was an issue submitting your data, but we can still show your report.");
          setShowReport(true);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
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
      
      {isSubmitting && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing your results...</p>
        </div>
      )}
      
      {step === -1 ? (
        <div className="intro-section">
          <div className="user-info-form">
            <h2 className="form-title">Start Your COO Fit Inventory</h2>
            <input 
              className="input-field" 
              placeholder="Your Name" 
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} 
            />
            <input 
              className="input-field" 
              placeholder="Company Name" 
              value={userInfo.company}
              onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })} 
            />
            <input 
              className="input-field" 
              placeholder="Email Address" 
              type="email" 
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} 
            />
            <input 
              className="input-field" 
              placeholder="Number of Employees" 
              value={userInfo.employees}
              onChange={(e) => setUserInfo({ ...userInfo, employees: e.target.value })} 
            />
            <button className="start-button" onClick={handleStart}>Begin Inventory</button>
          </div>
        </div>
      ) : !showReport ? (
        <div className="question-section">
          <div className="question-container">
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
            <div className="progress-indicator">
              Question {step + 1} of {questions.length}
            </div>
          </div>
        </div>
      ) : result ? (
        <div className="report-section">
          <div className="report-container">
            <h2 className="report-title">Your COO Fit Inventory Report</h2>
            <p className="profile-description">You're a {result.profile}. {stageDescriptions[result.stage]}</p>
            <div className="traits-container">
              {result.traits.map((trait, idx) => (
                <div key={idx} className="trait-card">
                  <h3 className="trait-title">{trait.tone}</h3>
                  <p className="trait-description">{trait.trait}</p>
                </div>
              ))}
            </div>
            <div className="insights-container">
              <h3 className="insights-title">Why These Traits Matter</h3>
              <ul className="insights-list">
                <li>These traits are aligned to how you lead and where your business stands today.</li>
                <li>They support your unique strengths while complementing gaps in execution.</li>
                <li>They'll protect your energy while reinforcing trust, delivery, and culture.</li>
              </ul>
              <h3 className="insights-title">Power of Two Fit</h3>
              <ul className="insights-list">
                <li>Your ideal COO balances you — not just with skills, but style.</li>
                <li>They'll reinforce what works while helping you grow with less friction.</li>
                <li>This match creates a dynamic partnership — one that scales well under pressure.</li>
              </ul>
              <div className="action-buttons">
                <button className="action-button">Schedule a Strategic Fit Call</button>
                <button className="action-button" onClick={() => window.print()}>Download Inventory Report as PDF</button>
                <button className="action-button">Discover the Inventory Starter Packet</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      {result && (
        <div className="next-steps-section">
          <h3 className="next-steps-title">What's Next: Assessing Your Potential COO</h3>
          <p className="next-steps-text">
            You've clarified what kind of COO you need. Now it's time to explore whether your current candidate — or future hire — aligns with this fit.
          </p>
          <p className="next-steps-text">
            We've created a candidate assessment experience that helps you evaluate this alignment clearly and confidently. You can preview it here: [Assessment Link Placeholder] Stay tuned — we'll send access to the starter packet and options to explore this further.
          </p>
        </div>
      )}
      
      <div className="footer">
        <p>Generated by the COO Fit Inventory • CoEvolution Project</p>
        <p>© 2025 • <a href="https://www.coevolutionproject.com" target="_blank" rel="noopener noreferrer">www.coevolutionproject.com</a></p>
        <p>{today}</p>
        <p>Contact: hello@coevolutionproject.com</p>
        <p>Page <span className="page-number">{currentPage}</span></p>
      </div>
    </div>
  );
}
