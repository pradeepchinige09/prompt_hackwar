import React from 'react';
import { 
  Sun, Moon, Compass, Award, 
  GraduationCap, Cpu, Home, LayoutDashboard, Users, Type
} from 'lucide-react';
import { LANGUAGES } from '../data/curriculumData';

export function Navbar({ 
  activeTab, 
  onTabChange, 
  currentLanguage, 
  onLanguageChange, 
  isDyslexiaMode, 
  onToggleDyslexia, 
  theme, 
  onToggleTheme,
  onOpenTrace
}) {
  return (
    <header className="navbar-container" role="banner">
      <nav className="navbar-content" role="navigation" aria-label="Main Navigation">
        {/* Brand Logo & Tagline */}
        <button 
          className="nav-brand" 
          onClick={() => onTabChange('landing')}
          style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}
          aria-label="ShikshaSetu AI Home - Return to Landing Page"
        >
          <div className="brand-logo">
            <span className="brand-icon">🏛️</span>
          </div>
          <div>
            <h1 className="brand-title">
              ShikshaSetu <span>AI</span>
            </h1>
            <p className="brand-subtitle">शिक्षासेतु • Socratic & Vernacular AI</p>
          </div>
        </button>

        {/* Center Tabs for Complete User Flow */}
        <div className="nav-tabs" role="tablist" aria-label="Platform Views">
          <button 
            className={`nav-tab-btn ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => onTabChange('landing')}
            id="tab-landing-home"
            title="Home Landing"
            aria-label="Home Landing"
            role="tab"
            aria-selected={activeTab === 'landing'}
          >
            <Home size={15} /> Home
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'create-plan' ? 'active' : ''}`}
            onClick={() => onTabChange('create-plan')}
            id="tab-create-plan"
            title="Study Plan Wizard"
            aria-label="Study Plan Wizard"
            role="tab"
            aria-selected={activeTab === 'create-plan'}
          >
            Plan
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
            id="tab-dashboard"
            title="Student Learner Dashboard"
            aria-label="Student Learner Dashboard"
            role="tab"
            aria-selected={activeTab === 'dashboard'}
          >
            <LayoutDashboard size={15} /> Dashboard
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => onTabChange('roadmap')}
            id="tab-ai-roadmap"
            title="Interactive Concept Tree"
            aria-label="Interactive Concept Tree"
            role="tab"
            aria-selected={activeTab === 'roadmap'}
          >
            <Compass size={15} /> Roadmap
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => onTabChange('quiz')}
            id="tab-quiz-assessment"
            title="Diagnostic Quiz"
            aria-label="Diagnostic Quiz"
            role="tab"
            aria-selected={activeTab === 'quiz'}
          >
            <Award size={15} /> Quiz
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'tutor' ? 'active' : ''}`}
            onClick={() => onTabChange('tutor')}
            id="tab-student-learner"
            title="Socratic AI Tutor & Canvas"
            aria-label="Socratic AI Tutor and Canvas"
            role="tab"
            aria-selected={activeTab === 'tutor'}
          >
            <GraduationCap size={15} /> AI Tutor
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'teacher' ? 'active' : ''}`}
            onClick={() => onTabChange('teacher')}
            id="tab-teacher-copilot"
            title="Teacher Diagnostic Co-Pilot"
            aria-label="Teacher Diagnostic Co-Pilot"
            role="tab"
            aria-selected={activeTab === 'teacher'}
          >
            <Users size={15} /> Educator
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'trace' ? 'active' : ''}`}
            onClick={onOpenTrace}
            id="tab-agent-inspector"
            title="Glass-Box Inspector"
            aria-label="Glass-Box Agent Inspector"
            role="tab"
            aria-selected={false}
          >
            <Cpu size={15} /> Trace
          </button>
        </div>

        {/* Right Actions: Lang, Dyslexia, Theme */}
        <div className="nav-actions">
          {/* Vernacular Language Selector */}
          <div className="lang-select-wrapper">
            <select
              className="select-custom"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              id="language-selector"
              title="Change Vernacular Language"
              aria-label="Select Vernacular Language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dyslexia Accessible Font Toggle */}
          <button 
            className={`icon-btn ${isDyslexiaMode ? 'active' : ''}`}
            onClick={onToggleDyslexia}
            title={isDyslexiaMode ? "Dyslexia Friendly Mode: ON" : "Toggle Dyslexia Friendly Mode"}
            aria-label={isDyslexiaMode ? "Disable Dyslexia Friendly Mode" : "Enable Dyslexia Friendly Mode"}
            id="toggle-dyslexia-btn"
          >
            <Type size={17} />
          </button>

          {/* Light / Dark Mode Toggle */}
          <button 
            className="icon-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            id="toggle-theme-btn"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
