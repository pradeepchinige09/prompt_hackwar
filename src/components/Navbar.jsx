import React from 'react';
import { Sparkles, Languages, Sun, Moon, Type, Cpu, GraduationCap, Users, Compass, LayoutDashboard, HelpCircle, Home, Award } from 'lucide-react';
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
    <nav className="navbar" id="app-navbar">
      <div className="nav-inner">
        {/* Brand */}
        <div className="nav-brand" onClick={() => onTabChange('landing')}>
          <div className="brand-icon-wrapper">
            🎓
          </div>
          <div className="brand-text">
            <h1>ShikshaSetu AI</h1>
            <div className="brand-tagline">शिक्षासेतु • Vernacular Multi-Agent Bridge</div>
          </div>
        </div>

        {/* Center Tabs for Complete User Flow */}
        <div className="nav-tabs">
          <button 
            className={`nav-tab-btn ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => onTabChange('landing')}
            id="tab-landing-home"
            title="Home Landing"
          >
            <Home size={15} /> Home
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'create-plan' ? 'active' : ''}`}
            onClick={() => onTabChange('create-plan')}
            id="tab-create-plan"
            title="Study Plan Wizard"
          >
            Plan
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
            id="tab-dashboard"
            title="Student Learner Dashboard"
          >
            <LayoutDashboard size={15} /> Dashboard
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => onTabChange('roadmap')}
            id="tab-ai-roadmap"
            title="Interactive Concept Tree"
          >
            <Compass size={15} /> Roadmap
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => onTabChange('quiz')}
            id="tab-quiz-assessment"
            title="Diagnostic Quiz"
          >
            <Award size={15} /> Quiz
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'tutor' ? 'active' : ''}`}
            onClick={() => onTabChange('tutor')}
            id="tab-student-learner"
            title="Socratic AI Tutor & Canvas"
          >
            <GraduationCap size={15} /> AI Tutor
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'teacher' ? 'active' : ''}`}
            onClick={() => onTabChange('teacher')}
            id="tab-teacher-copilot"
            title="Teacher Diagnostic Co-Pilot"
          >
            <Users size={15} /> Educator
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'trace' ? 'active' : ''}`}
            onClick={onOpenTrace}
            id="tab-agent-inspector"
            title="Glass-Box Inspector"
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
            id="toggle-dyslexia-btn"
          >
            <Type size={17} />
          </button>

          {/* Light / Dark Mode Toggle */}
          <button 
            className="icon-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            id="toggle-theme-btn"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
