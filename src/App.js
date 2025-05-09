import React, { useState } from 'react';
import './COOFitInventory.css';  // Import the CSS file

function App() {
  const [step, setStep] = useState(-1);
  const [userInfo, setUserInfo] = useState({ name: '', company: '', email: '', employees: '' });
  const [answers, setAnswers] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Sample questions for testing (just 3 questions to keep it simple)
  const questions = [
    {
      id: 1,
      category: "sample",
      question: "Sample question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
    },
    {
      id: 2,
      category: "sample",
      question: "Sample question 2?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
    },
    {
      id: 3,
      category: "sample",
      question: "Sample question 3?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
    }
  ];

  const handleStart = () => {
    if (userInfo.name && userInfo.company && userInfo.email && userInfo.employees) {
      setStep(0);
      setError(null);
    } else {
      setError("Please fill out all fields to begin.");
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setResult({
        profile: "Sample Profile",
        description: "This is a sample profile description."
      });
      setShowReport(true);
    }
  };

  return (
    <div className="inventory-container">
      <div className="logo-container">
        <h1>COO Fit Inventory</h1>
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
              <h2 className="form-subtitle">Start your assessment</h2>
              
              <div className="form-field">
                <label htmlFor="name">Your Name</label>
                <input 
                  id="name"
                  className="input-field" 
                  placeholder="Your Name" 
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} 
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="company">Company</label>
                <input 
                  id="company"
                  className="input-field" 
                  placeholder="Company Name" 
                  value={userInfo.company}
                  onChange={(e) => setUserInfo({ ...userInfo, company: e.target.value })} 
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input 
                  id="email"
                  className="input-field" 
                  placeholder="Email Address" 
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
                  placeholder="Number of Employees" 
                  value={userInfo.employees}
                  onChange={(e) => setUserInfo({ ...userInfo, employees: e.target.value })} 
                />
              </div>
              
              <button className="start-button" onClick={handleStart}>
                Begin Inventory
              </button>
            </div>
          </div>
        ) : !showReport ? (
          <div className="question-section">
            <div className="question-container">
              <div className="progress-bar">
                <div 
                  className="progress-indicator" 
                  style={{ width: `${(step / (questions.length - 1)) * 100}%` }}
                ></div>
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
                <h2 className="report-title">Your Results</h2>
                <p className="report-date">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="profile-card">
                <h3 className="profile-title">{result.profile}</h3>
                <p className="profile-description">{result.description}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      
      <div className="footer">
        <div className="footer-content">
          <p>COO Fit Inventory Example</p>
        </div>
      </div>
    </div>
  );
}

export default App;
