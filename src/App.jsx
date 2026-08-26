import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CreateStudyPlan } from './components/CreateStudyPlan';
import { DashboardView } from './components/DashboardView';
import { AIRoadmapView } from './components/AIRoadmapView';
import { QuizView } from './components/QuizView';
import { StudentTutorView } from './components/StudentTutorView';
import { TeacherCoPilotView } from './components/TeacherCoPilotView';
import { AgentTraceModal } from './components/AgentTraceModal';
import { OfflineLowBandwidthBanner } from './components/OfflineLowBandwidthBanner';
import { Heart, Globe, Cpu, Award } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [isTraceOpen, setIsTraceOpen] = useState(false);
  const [studyPlan, setStudyPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('SHIKSHA_STUDY_PLAN');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isDyslexiaMode) {
      document.body.classList.add('dyslexia-friendly');
    } else {
      document.body.classList.remove('dyslexia-friendly');
    }
  }, [isDyslexiaMode]);

  useEffect(() => {
    if (isLowBandwidth) {
      document.body.classList.add('low-bandwidth-mode');
    } else {
      document.body.classList.remove('low-bandwidth-mode');
    }
  }, [isLowBandwidth]);

  return (
    <div className="app-container">
      {/* Background Ambient Glow Orbs */}
      {!isLowBandwidth && (
        <div className="ambient-bg">
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
          <div className="ambient-orb ambient-orb-3" />
        </div>
      )}

      {/* Top Banner: Rural 2G / Offline Low-Bandwidth Mode */}
      <OfflineLowBandwidthBanner 
        isLowBandwidth={isLowBandwidth}
        onToggle={() => setIsLowBandwidth(!isLowBandwidth)}
      />

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => setCurrentLanguage(lang)}
        isDyslexiaMode={isDyslexiaMode}
        onToggleDyslexia={() => setIsDyslexiaMode(!isDyslexiaMode)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onOpenTrace={() => setIsTraceOpen(true)}
      />

      {/* Content Body Rendering Complete User Flow */}
      <main className="main-content">
        {activeTab === 'landing' && (
          <LandingPage 
            onNavigate={(tab) => setActiveTab(tab)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'create-plan' && (
          <CreateStudyPlan 
            onPlanCreated={(plan) => setStudyPlan(plan)}
            onNavigate={(tab) => setActiveTab(tab)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView 
            studyPlan={studyPlan}
            onNavigate={(tab) => setActiveTab(tab)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'roadmap' && (
          <AIRoadmapView 
            onNavigate={(tab) => setActiveTab(tab)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView 
            onNavigate={(tab) => setActiveTab(tab)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'tutor' && (
          <StudentTutorView 
            currentLanguage={currentLanguage}
            onOpenTrace={() => setIsTraceOpen(true)}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherCoPilotView 
            currentLanguage={currentLanguage}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.5rem', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', background: 'rgba(7,11,19,0.9)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Award size={14} color="var(--accent-saffron)" /> Built for National Hackathons & Educational Equity
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Globe size={14} color="var(--accent-cyan)" /> Aligned with UN SDG 4 & NEP 2020
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Cpu size={14} color="var(--accent-indigo)" /> Powered by Google Antigravity Multi-Agent Framework
          </span>
        </div>
        <div>ShikshaSetu AI (शिक्षासेतु) © 2026 • Bridging Language, Pedagogy & Opportunity</div>
      </footer>

      {/* Antigravity Glass-Box Agent Inspector Modal */}
      <AgentTraceModal 
        isOpen={isTraceOpen}
        onClose={() => setIsTraceOpen(false)}
      />
    </div>
  );
}

export default App;
