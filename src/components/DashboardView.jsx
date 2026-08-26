import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Flame, Award, Target, Zap, AlertCircle, BarChart2 
} from 'lucide-react';
import { CURRICULUM_TOPICS } from '../data/curriculumData';
import { learningEngine } from '../services/learningEngine';

export function DashboardView({ studyPlan, onNavigate, onSelectTopic, currentLanguage = 'en' }) {
  const [progress, setProgress] = useState(() => learningEngine.getProgress());
  const [recommendation, setRecommendation] = useState(() => learningEngine.getAdaptiveRecommendation(currentLanguage));

  useEffect(() => {
    setProgress(learningEngine.getProgress());
    setRecommendation(learningEngine.getAdaptiveRecommendation(currentLanguage));
  }, [currentLanguage]);

  const plan = studyPlan || {
    grade: "Grade 10",
    board: "State Board",
    subject: "Physics",
    language: currentLanguage || "hi",
    dailyMinutes: 30
  };

  const handleLaunchRecommendation = () => {
    if (recommendation?.topic && onSelectTopic) {
      onSelectTopic(recommendation.topic);
    }
    if (recommendation?.action) {
      onNavigate(recommendation.action);
    } else {
      onNavigate('tutor');
    }
  };

  // Multilingual UI headers
  const i18n = {
    welcome: {
      en: "Welcome Back, Scholar!",
      hi: "स्वागत है, युवा विद्वान!",
      hinglish: "Welcome Back, Scholar!",
      te: "స్వాగతం, యువ విద్వాంసుడా!",
      ta: "மீண்டும் வருக, இளம் அறிஞரே!",
      mr: "स्वागत आहे, युवा अभ्यासक!"
    },
    adaptiveCardTitle: {
      en: "Recommended Next Step (Adaptive AI)",
      hi: "अनुशंसित अगला कदम (अनुकूली एआई)",
      hinglish: "Recommended Next Step (Adaptive AI)",
      te: "సిఫార్సు చేయబడిన తదుపరి దశ (అడాప్టివ్ AI)",
      ta: "பரிந்துரைக்கப்பட்ட அடுத்த படி (தகவமைப்பு AI)",
      mr: "शिफारस केलेले पुढील पाऊल (अ‍ॅडॉप्टिव्ह AI)"
    },
    analyticsTitle: {
      en: "Learning Analytics & Topic Mastery",
      hi: "शिक्षण विश्लेषण और विषय महारत",
      hinglish: "Learning Analytics & Topic Mastery",
      te: "అభ్యాస విశ్లేషణలు & అంశాల ప్రావీణ్యం",
      ta: "கற்றல் பகுப்பாய்வு & தலைப்பு தேர்ச்சி",
      mr: "शिक्षण विश्लेषण आणि विषय प्रभुत्व"
    },
    achievementsTitle: {
      en: "Earned Badges & Achievements",
      hi: "अर्जित बैज और उपलब्धियां",
      hinglish: "Earned Badges & Achievements",
      te: "సాధించిన బ్యాడ్జ్‌లు & విజయాలు",
      ta: "பெற்ற பேட்ஜ்கள் & சாதனைகள்",
      mr: "मिळवलेले बॅज आणि उपलब्धी"
    }
  };

  const safeLang = i18n.welcome[currentLanguage] ? currentLanguage : 'en';

  const topicsList = [
    { id: 'optics-prism', name: 'Optics: Prism & Dispersion', icon: '🌈' },
    { id: 'mechanics-friction', name: 'Mechanics: Newton & Friction', icon: '🏏' },
    { id: 'biology-photosynthesis', name: 'Biology: Leaf Photosynthesis', icon: '🌿' },
    { id: 'math-fractions', name: 'Mathematics: Roti Fractions', icon: '🥧' }
  ];

  return (
    <div className="dashboard-container" id="student-dashboard-view">
      {/* Student Welcome Card */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(245,158,11,0.08))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span className="risk-tag risk-low" style={{ fontSize: '0.78rem' }}>Learner Dashboard</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-saffron-light)' }}>
                {plan.grade} • {plan.board} • {plan.language.toUpperCase()}
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{i18n.welcome[safeLang]} 🌟</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620 }}>
              Your progress updates dynamically after every Socratic conversation and diagnostic quiz.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              className="nav-tab-btn active"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.92rem', borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => onNavigate('roadmap')}
              id="dash-continue-roadmap-btn"
            >
              <span>AI Roadmap</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* FEATURE 6: Prominent Adaptive Recommendation Card */}
      {recommendation && (
        <div className="glass-card" style={{ marginBottom: '1.5rem', border: '1.5px solid rgba(245,158,11,0.5)', background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(15,23,42,0.9))' }} id="adaptive-recommendation-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: 'rgba(245,158,11,0.2)', color: 'var(--accent-saffron-light)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Zap size={13} /> {i18n.adaptiveCardTitle[safeLang]}
              </span>
              <span className={`risk-tag ${recommendation.tier === 'Mastered' ? 'risk-low' : recommendation.tier === 'Strong' ? 'risk-low' : recommendation.tier === 'Developing' ? 'risk-medium' : 'risk-high'}`}>
                {recommendation.tier} ({recommendation.mastery}%)
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Difficulty: {recommendation.difficulty}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: '1 1 500px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem', color: '#ffffff' }}>
                {recommendation.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                {recommendation.description}
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-saffron-light)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={13} />
                <span><strong>Target Area:</strong> {recommendation.reason}</span>
              </div>
            </div>

            <button
              className="nav-tab-btn active"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem', borderRadius: 'var(--radius-md)', alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, var(--accent-saffron), var(--accent-indigo))' }}
              onClick={handleLaunchRecommendation}
              id="launch-adaptive-step-btn"
            >
              <span>{recommendation.ctaText}</span>
            </button>
          </div>
        </div>
      )}

      {/* 4 Performance Metric Cards with Live XP and Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Overall Mastery</span>
            <Award size={18} color="var(--accent-saffron)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-saffron-light)' }}>
            {progress.overallMastery}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${progress.overallMastery}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-saffron), var(--accent-indigo))' }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{progress.overallTier}</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gamified XP & Level</span>
            <Zap size={18} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#facc15' }}>
            {progress.xp} XP
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Level {progress.level} Scholar • {100 - (progress.xp % 100)} XP to Level {progress.level + 1}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quizzes & Accuracy</span>
            <Target size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {progress.accuracyRate}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            {progress.totalQuestionsCorrect} / {progress.totalQuestionsAttempted} Questions Correct
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Learning Streak</span>
            <Flame size={18} color="var(--accent-rose)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fb7185' }}>
            {progress.streakDays} Days 🔥
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Daily practice maintained
          </div>
        </div>
      </div>

      {/* FEATURE 2: Learning Analytics Section */}
      <div className="glass-card" style={{ marginBottom: '1.5rem' }} id="learning-analytics-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={18} color="var(--accent-indigo-light)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{i18n.analyticsTitle[safeLang]}</h3>
          </div>
          <span className="risk-tag risk-low">Continuous Local Evaluation</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {topicsList.map(t => {
            const data = progress.topicAnalytics[t.id] || { mastery: 0, attempts: 0, tier: 'Needs Practice' };
            const matchedCurriculum = CURRICULUM_TOPICS.find(c => c.id === t.id);
            return (
              <div 
                key={t.id} 
                role="button"
                tabIndex={0}
                aria-label={`Practice ${t.name}, current mastery ${data.mastery}%`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (matchedCurriculum && onSelectTopic) onSelectTopic(matchedCurriculum);
                    onNavigate('tutor');
                  }
                }}
                style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'border-color var(--transition-fast)'
                }}
                onClick={() => {
                  if (matchedCurriculum && onSelectTopic) onSelectTopic(matchedCurriculum);
                  onNavigate('tutor');
                }}
                title="Click to launch AI Socratic Tutor for this concept"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{t.icon}</span> {t.name}
                  </span>
                  <span className={`risk-tag ${data.tier === 'Mastered' ? 'risk-low' : data.tier === 'Strong' ? 'risk-low' : data.tier === 'Developing' ? 'risk-medium' : 'risk-high'}`} style={{ fontSize: '0.7rem' }}>
                    {data.tier}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                  <div style={{ flex: 1, height: 7, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${data.mastery}%`, 
                        height: '100%', 
                        background: data.mastery >= 75 ? 'var(--accent-emerald)' : data.mastery >= 50 ? 'var(--accent-saffron)' : 'var(--accent-rose)' 
                      }} 
                    />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: 36 }}>{data.mastery}%</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  <span>{data.attempts} questions answered</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>Practice Now →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURE 3: Badges & Gamification Showcase */}
      <div className="glass-card" style={{ marginBottom: '1.5rem' }} id="achievements-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="var(--accent-saffron)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{i18n.achievementsTitle[safeLang]}</h3>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-saffron-light)', fontWeight: 600 }}>
            {progress.unlockedCount} of {progress.badges.length} Badges Unlocked
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem' }}>
          {progress.badges.map(b => {
            const isUnlocked = b.unlocked;
            const badgeTitle = b.name[safeLang] || b.name.en;
            const badgeDesc = b.description[safeLang] || b.description.en;

            return (
              <div 
                key={b.id}
                style={{ 
                  background: isUnlocked ? 'rgba(245,158,11,0.08)' : 'rgba(15,23,42,0.4)',
                  border: isUnlocked ? '1.5px solid rgba(245,158,11,0.4)' : '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem',
                  textAlign: 'center',
                  opacity: isUnlocked ? 1 : 0.55
                }}
              >
                <div style={{ fontSize: '1.85rem', marginBottom: '0.35rem' }}>{b.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isUnlocked ? 'var(--accent-saffron-light)' : 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  {badgeTitle}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {badgeDesc}
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.68rem', fontWeight: 600, color: isUnlocked ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                  {isUnlocked ? '✓ Unlocked' : '🔒 In Progress'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Tiles */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Curriculum Learning Portals</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div 
          className="glass-card" 
          role="button"
          tabIndex={0}
          aria-label="AI Learning Roadmap Visual Milestone Tree"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('roadmap');
            }
          }}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          onClick={() => onNavigate('roadmap')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 38, height: 38, fontSize: '1rem', background: 'rgba(6,182,212,0.2)', color: 'var(--accent-cyan)' }}>
              🗺️
            </div>
            <div>
              <h4 style={{ fontSize: '1rem' }}>AI Learning Roadmap</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visual Milestone Tree</span>
            </div>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Follow your structured concept graph across Optics, Mechanics, Photosynthesis, and Fractions.
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
            View Roadmap Tree <ArrowRight size={14} />
          </span>
        </div>

        <div 
          className="glass-card" 
          role="button"
          tabIndex={0}
          aria-label="Concept Knowledge Quiz Self-Assessment"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('quiz');
            }
          }}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          onClick={() => onNavigate('quiz')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 38, height: 38, fontSize: '1rem', background: 'rgba(245,158,11,0.2)', color: 'var(--accent-saffron)' }}>
              🎯
            </div>
            <div>
              <h4 style={{ fontSize: '1rem' }}>Concept Knowledge Quiz</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Self-Assessment</span>
            </div>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Take rapid diagnostic quizzes with instant feedback explaining common cognitive misconceptions.
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-saffron-light)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
            Take Diagnostic Quiz <ArrowRight size={14} />
          </span>
        </div>

        <div 
          className="glass-card" 
          role="button"
          tabIndex={0}
          aria-label="AI Socratic Tutor with Interactive Canvas"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('tutor');
            }
          }}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          onClick={() => onNavigate('tutor')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 38, height: 38, fontSize: '1rem', background: 'rgba(99,102,241,0.2)', color: 'var(--accent-indigo-light)' }}>
              🎓
            </div>
            <div>
              <h4 style={{ fontSize: '1rem' }}>AI Socratic Tutor</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interactive Canvas</span>
            </div>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Chat with ShikshaGuru, use the 4-step hint ladder, and manipulate real-time SVG simulations.
          </p>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-indigo-light)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
            Open Socratic Tutor <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
