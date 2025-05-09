/* COOFitInventory.css - Modern, clean styling for the COO Fit Inventory */

/* ===== BASE STYLES ===== */
:root {
  --primary-color: #4a6bda;
  --primary-hover: #3a58c7;
  --primary-light: #eef2ff;
  --secondary-color: #3c3f54;
  --accent-color: #ff9d6c;
  --background-color: #f8f9fc;
  --card-color: white;
  --text-color: #1a1d2d;
  --text-light: #6b7280;
  --border-color: #e1e4e8;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
  --shadow: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
  --border-radius: 12px;
  --border-radius-sm: 6px;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --transition: all 0.2s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--text-color);
  margin-bottom: 0.5rem;
  font-weight: 600;
  line-height: 1.2;
}

p {
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
  font-family: var(--font-sans);
  border: none;
  outline: none;
  transition: var(--transition);
}

input {
  font-family: var(--font-sans);
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  width: 100%;
  outline: none;
  transition: var(--transition);
}

input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(74, 107, 218, 0.1);
}

/* ===== LAYOUT ===== */
.inventory-container {
  max-width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background-color: var(--background-color);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Background decorative elements */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

.bg-shape-1 {
  width: 500px;
  height: 500px;
  background-color: rgba(74, 107, 218, 0.03);
  top: -200px;
  right: -200px;
}

.bg-shape-2 {
  width: 400px;
  height: 400px;
  background-color: rgba(255, 157, 108, 0.03);
  bottom: -100px;
  left: -150px;
}

.bg-shape-3 {
  width: 300px;
  height: 300px;
  background-color: rgba(74, 107, 218, 0.02);
  top: 40%;
  left: 5%;
}

/* ===== HEADER & LOGO ===== */
.logo-container {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

.company-logo {
  height: 40px;
  width: auto;
}

/* ===== ERROR & LOADING STATES ===== */
.error-message {
  display: flex;
  align-items: center;
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.error-icon {
  width: 20px;
  height: 20px;
  fill: #b91c1c;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 1.5rem;
}

.spinner-inner {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
}

/* ===== INTRO SECTION / USER INFO FORM ===== */
.intro-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

.user-info-form {
  background-color: var(--card-color);
  border-radius: var(--border-radius);
  padding: 2.5rem;
  width: 100%;
  max-width: 560px;
  box-shadow: var(--shadow);
}

.form-title {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
}

.form-subtitle {
  text-align: center;
  color: var(--text-light);
  font-weight: 400;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.form-field {
  margin-bottom: 1.5rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--secondary-color);
}

.start-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  margin-top: 1.5rem;
  font-size: 1rem;
  box-shadow: var(--shadow-sm);
}

.start-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.button-arrow {
  width: 20px;
  height: 20px;
  fill: currentColor;
  margin-left: 0.5rem;
}

.privacy-note {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-light);
  margin-top: 1.5rem;
}

/* ===== QUESTION SECTION ===== */
.question-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  min-height: 60vh;
  position: relative;
  z-index: 1;
}

.question-container {
  background-color: var(--card-color);
  border-radius: var(--border-radius);
  padding: 2.5rem;
  width: 100%;
  max-width: 700px;
  box-shadow: var(--shadow);
}

.progress-bar {
  height: 6px;
  background-color: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-indicator {
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.question-counter {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.question-text {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.4;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-button {
  text-align: left;
  background-color: var(--primary-light);
  padding: 1.25rem 1.5rem;
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 400;
  transition: var(--transition);
  line-height: 1.5;
  border: 1px solid transparent;
}

.option-button:hover {
  background-color: rgba(74, 107, 218, 0.15);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.option-button:active {
  transform: translateY(0);
}

/* ===== REPORT SECTION ===== */
.report-section {
  position: relative;
  z-index: 1;
  padding: 0 1rem;
}

.report-container {
  background-color: var(--card-color);
  border-radius: var(--border-radius);
  padding: 2.5rem;
  width: 100%;
  margin: 0 auto 2rem;
  box-shadow: var(--shadow);
  max-width: 900px;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
}

.report-title {
  font-size: 1.8rem;
  color: var(--secondary-color);
}

.report-date {
  font-size: 0.9rem;
  color: var(--text-light);
}

.profile-card {
  background-color: var(--primary-light);
  border-radius: var(--border-radius);
  padding: 2rem;
  margin-bottom: 2.5rem;
  border-left: 4px solid var(--primary-color);
}

.profile-title {
  font-size: 1.6rem;
  margin-bottom: 0.75rem;
  color: var(--primary-color);
}

.profile-description {
  font-size: 1.05rem;
  color: var(--secondary-color);
  line-height: 1.6;
}

.traits-wrapper {
  margin-bottom: 2.5rem;
}

.traits-title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

.traits-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.trait-card {
  background-color: white;
  border-radius: var(--border-radius-sm);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.trait-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.trait-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.trait-number {
  background-color: var(--primary-color);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.trait-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--secondary-color);
}

.trait-description {
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
}

.insights-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.insight-column {
  display: flex;
  flex-direction: column;
}

.insights-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
}

.insights-list li {
  margin-bottom: 0.75rem;
  color: var(--text-light);
}

.insights-list li:last-child {
  margin-bottom: 0;
}

.action-section {
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
}

.action-title {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 0.85rem 1.25rem;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
}

.primary-button {
  background-color: var(--primary-color);
  color: white;
}

.primary-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.secondary-button {
  background-color: white;
  color: var(--secondary-color);
  border: 1px solid var(--border-color);
}

.secondary-button:hover {
  background-color: #f9fafb;
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.button-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
  margin-right: 0.5rem;
}

.next-steps-section {
  background-color: var(--card-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2rem;
  box-shadow: var(--shadow);
}

.next-steps-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
}

.next-steps-text {
  font-size: 1rem;
  color: var(--text-light);
  line-height: 1.6;
}

.text-link {
  color: var(--primary-color);
  font-weight: 500;
}

.text-link:hover {
  text-decoration: underline;
}

/* ===== FOOTER ===== */
.footer {
  background-color: var(--secondary-color);
  padding: 2rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
}

.footer-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.footer p {
  color: #e5e7eb;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.footer p:last-child {
  margin-bottom: 0;
}

.footer-link {
  color: #e5e7eb;
  text-decoration: underline;
}

.footer-link:hover {
  color: white;
}

.page-number {
  font-weight: 600;
}

/* ===== PRINT STYLES ===== */
@media print {
  .inventory-container {
    background-color: white;
  }
  
  .bg-shape {
    display: none;
  }
  
  .start-button, .action-button {
    display: none;
  }
  
  .report-container, .next-steps-section {
    box-shadow: none;
    border: 1px solid #e1e4e8;
  }
  
  .trait-card {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  .footer {
    background-color: white;
    border-top: 1px solid #e1e4e8;
    padding: 1rem 0;
  }
  
  .footer p {
    color: #4b5563;
  }
  
  .footer-link {
    color: #4b5563;
  }
}

/* ===== RESPONSIVE STYLES ===== */
@media (max-width: 768px) {
  .report-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .report-date {
    margin-top: 0.5rem;
  }
  
  .traits-container {
    grid-template-columns: 1fr;
  }
  
  .insights-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
    justify-content: center;
  }
  
  .user-info-form, .question-container, .report-container, .next-steps-section {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .form-title {
    font-size: 1.8rem;
  }
  
  .question-text {
    font-size: 1.3rem;
  }
  
  .profile-title {
    font-size: 1.4rem;
  }
  
  .report-title {
    font-size: 1.5rem;
  }
}
