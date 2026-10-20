import { useState } from 'react';
import './App.css';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import CVPreview from './components/CVPreview';

const emptyGeneralInfo = { name: '', email: '', phone: '' };
const defaultConfig = {
  accentColor: '#284b75',
  fontFamily: 'Arial, sans-serif',
  generalInfoAlignment: 'left',
};

function App() {
  const [generalInfo, setGeneralInfo] = useState({ ...emptyGeneralInfo });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [cvConfig, setCvConfig] = useState({ ...defaultConfig });
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  function handleGeneralChange(event) {
    const { name, value } = event.target;
    setGeneralInfo((previous) => ({ ...previous, [name]: value }));
  }

  function handleClear() {
    if (!window.confirm('Clear all CV information? This cannot be undone.')) return;
    setGeneralInfo({ ...emptyGeneralInfo });
    setEducation([]);
    setExperience([]);
    setDataVersion((version) => version + 1);
  }

  function handleLoadExample() {
    const hasData = Object.values(generalInfo).some(Boolean)
      || education.length > 0 || experience.length > 0;
    if (hasData && !window.confirm('Replace your current CV with example data?')) return;

    setGeneralInfo({
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+44 7700 900000',
    });
    setEducation([
      { id: crypto.randomUUID(), school: 'University of Manchester',
        degree: 'BSc Computer Science', startDate: '2016-09', endDate: '2019-06', hidden: false },
      { id: crypto.randomUUID(), school: 'Manchester College',
        degree: 'Information Technology', startDate: '2014-09', endDate: '2016-06', hidden: false },
    ]);
    setExperience([
      { id: crypto.randomUUID(), company: 'Atlas Digital', position: 'Frontend Developer',
        startDate: '2022-03', endDate: '', hidden: false,
        description: 'Developed responsive React applications and reusable UI components.' },
      { id: crypto.randomUUID(), company: 'Northstar Solutions', position: 'Junior Web Developer',
        startDate: '2019-07', endDate: '2022-02', hidden: false,
        description: 'Built and maintained websites and resolved frontend issues.' },
    ]);
    setDataVersion((version) => version + 1);
  }

  function updateConfig(name, value) {
    setCvConfig((previous) => ({ ...previous, [name]: value }));
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>CV Application</h1>
        <p>Build your professional CV in real time.</p>
      </header>

      <div className="cv-toolbar">
        <button type="button" className="toolbar-button clear-button" onClick={handleClear}>Clear All</button>
        <button type="button" className="toolbar-button primary-button" onClick={handleLoadExample}>Load Example</button>
        <button type="button" className="toolbar-button"
          onClick={() => setIsConfigOpen((open) => !open)}
          aria-expanded={isConfigOpen} aria-controls="cv-configuration">
          {isConfigOpen ? 'Close Configuration' : 'Configuration'}
        </button>
      </div>

      {isConfigOpen && (
        <section id="cv-configuration" className="cv-config-panel" aria-label="CV configuration">
          <h2>CV Configuration</h2>
          <div className="config-grid">
            <label className="config-field">
              <span>Accent color</span>
              <input type="color" value={cvConfig.accentColor}
                onChange={(event) => updateConfig('accentColor', event.target.value)} />
            </label>
            <label className="config-field">
              <span>Font family</span>
              <select value={cvConfig.fontFamily}
                onChange={(event) => updateConfig('fontFamily', event.target.value)}>
                <option value="Arial, sans-serif">Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Verdana, sans-serif">Verdana</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
              </select>
            </label>
            <label className="config-field">
              <span>General info alignment</span>
              <select value={cvConfig.generalInfoAlignment}
                onChange={(event) => updateConfig('generalInfoAlignment', event.target.value)}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </label>
          </div>
          <button type="button" className="toolbar-button reset-config-button"
            onClick={() => setCvConfig({ ...defaultConfig })}>Reset Configuration</button>
        </section>
      )}

      <div className="cv-builder">
        <div className="cv-editor">
          <GeneralInfo key={`general-${dataVersion}`}
            generalInfo={generalInfo} handleChange={handleGeneralChange} />

          <details className="editor-details">
            <summary>
              <span>Education <span className="entry-count">({education.length})</span></span>
              <span className="details-chevron" aria-hidden="true" />
            </summary>
            <Education key={`education-${dataVersion}`}
              education={education} setEducation={setEducation} />
          </details>

          <details className="editor-details">
            <summary>
              <span>Experience <span className="entry-count">({experience.length})</span></span>
              <span className="details-chevron" aria-hidden="true" />
            </summary>
            <Experience key={`experience-${dataVersion}`}
              experience={experience} setExperience={setExperience} />
          </details>
        </div>

        <div className="cv-preview-container"
          style={{ '--cv-accent': cvConfig.accentColor, fontFamily: cvConfig.fontFamily }}>
          <CVPreview generalInfo={generalInfo} education={education}
            experience={experience} cvConfig={cvConfig} />
        </div>
      </div>
    </main>
  );
}

export default App;
