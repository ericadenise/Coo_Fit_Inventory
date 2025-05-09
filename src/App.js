import React, { useState, useEffect } from "react";
// Updated React component with scoring logic and aesthetic styling (simplified)
import { useState } from "react";
import "./COOFitInventory.css"; // Make sure this file exists in the same directory

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
  // [All other questions from original code]
  // Copy the full questions array from your working version
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
  // [All other trait profiles from original code]
  // Copy the full trait profiles from your working version
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

export default function COOFitInventory() {
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

        const payload = {
          user: userInfo,
          profile: computed.profile,
          stage: computed.stage,
          traits: computed.traits,
          answers: newAnswers
        };

        // Optional: Add fetch with error handling
        try {
          fetch("https://your-placeholder-webhook-url.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
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
              <h1 className="form-title">COO Fit Inventory</h1>
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
                <h2 className="report-title">Your COO Fit Inventory Results</h2>
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
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="insights-container">
                <div className="insight-column">
                  <h3 className="insights-title">Why These Traits Matter</h3>
                  <ul className="insights-list">
                    <li>These traits are aligned to how you lead and where your business stands today.</li>
                    <li>They support your unique strengths while complementing gaps in execution.</li>
                    <li>They'll protect your energy while reinforcing trust, delivery, and culture.</li>
                  </ul>
                </div>
                
                <div className="insight-column">
                  <h3 className="insights-title">Power of Two Fit</h3>
                  <ul className="insights-list">
                    <li>Your ideal COO balances you — not just with skills, but style.</li>
                    <li>They'll reinforce what works while helping you grow with less friction.</li>
                    <li>This match creates a dynamic partnership — one that scales well under pressure.</li>
                  </ul>
                </div>
              </div>
              
              <div className="action-section">
                <h3 className="action-title">Next Steps</h3>
                <div className="action-buttons">
                  <button className="action-button primary-button">
                    Schedule a Strategic Fit Call
                  </button>
                  
                  <button className="action-button secondary-button" onClick={() => window.print()}>
                    Download Report as PDF
                  </button>
                  
                  <button className="action-button secondary-button">
                    Get the Inventory Starter Packet
                  </button>
                </div>
              </div>
            </div>
            
            <div className="next-steps-section">
              <h3 className="next-steps-title">What's Next: Assessing Your Potential COO</h3>
              <p className="next-steps-text">
                You've clarified what kind of COO you need. Now it's time to explore whether your current candidate — or future hire — aligns with this fit.
              </p>
              <p className="next-steps-text">
                We've created a candidate assessment experience that helps you evaluate this alignment clearly and confidently. You can preview it here: <a href="#" className="text-link">[Assessment Link]</a> Stay tuned — we'll send access to the starter packet and options to explore this further.
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
