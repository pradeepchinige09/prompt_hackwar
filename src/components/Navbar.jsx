import React from 'react';
import { Sparkles, Languages, Sun, Moon, Type, Cpu, GraduationCap, Users } from 'lucide-react';
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
        <div className="nav-brand" onClick={() => onTabChange('student')}>
          <div className="brand-icon-wrapper">
            🎓
          </div>
          <div className="brand-text">
            <h1>ShikshaSetu AI</h1>
            <div className="brand-tagline">शिक्षासेतु • Vernacular Multi-Agent Bridge</div>
          </div>
        </div>

        {/* Center Tabs: Learner vs Educator */}
        <div className="nav-tabs">
          <button 
            className={`nav-tab-btn ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => onTabChange('student')}
            id="tab-student-learner"
          >
            <GraduationCap size={16} /> Student Learner
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'teacher' ? 'active' : ''}`}
            onClick={() => onTabChange('teacher')}
            id="tab-teacher-copilot"
          >
            <Users size={16} /> Educator Co-Pilot
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'trace' ? 'active' : ''}`}
            onClick={onOpenTrace}
            id="tab-agent-inspector"
          >
            <Cpu size={16} /> Antigravity Trace
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
