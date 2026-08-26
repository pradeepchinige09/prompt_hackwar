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
import { CURRICULUM_TOPICS } from './data/curriculumData';
import { Heart, Globe, Cpu, Award } from 'lucide-react';

export function App() {
  // Sync tab with URL hash for browser back/forward and refresh support
  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['landing', 'create-plan', 'dashboard', 'roadmap', 'quiz', 'tutor', 'teacher'];
      if (validTabs.includes(hash)) return hash;
    }
    return 'landing';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedTopic, setSelectedTopic] = useState(CURRICULUM_TOPICS[0]);
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

  // Navigate with URL hash history support
  const navigateTo = (tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
    }
  };

  // Listen to browser Back and Forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['landing', 'create-plan', 'dashboard', 'roadmap', 'quiz', 'tutor', 'teacher'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  const handlePlanCreated = (newPlan) => {
    setStudyPlan(newPlan);
    if (newPlan && newPlan.language) {
      setCurrentLanguage(newPlan.language);
    }
    navigateTo('dashboard');
  };

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
        onTabChange={navigateTo}
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
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'create-plan' && (
          <CreateStudyPlan 
            onPlanCreated={handlePlanCreated}
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView 
            studyPlan={studyPlan}
            onNavigate={navigateTo}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'roadmap' && (
          <AIRoadmapView 
            onNavigate={navigateTo}
            onSelectTopic={(topic) => setSelectedTopic(topic)}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView 
            onNavigate={navigateTo}
            currentLanguage={currentLanguage}
            initialTopicId={selectedTopic?.id}
            onTopicSelect={(topicId) => {
              const found = CURRICULUM_TOPICS.find(t => t.id === topicId);
              if (found) setSelectedTopic(found);
            }}
          />
        )}

        {activeTab === 'tutor' && (
          <StudentTutorView 
            currentLanguage={currentLanguage}
            onOpenTrace={() => setIsTraceOpen(true)}
            externalTopic={selectedTopic}
            onTopicChange={(topic) => setSelectedTopic(topic)}
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
