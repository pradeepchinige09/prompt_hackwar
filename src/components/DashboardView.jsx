import React from 'react';
import { Sparkles, ArrowRight, Flame, Award, BookOpen, Clock, Target, CheckCircle2, Play, Sliders } from 'lucide-react';
import { CURRICULUM_TOPICS } from '../data/curriculumData';

export function DashboardView({ studyPlan, onNavigate, currentLanguage }) {
  const plan = studyPlan || {
    grade: "Grade 10",
    board: "State Board",
    subject: "Physics",
    language: currentLanguage || "hi",
    dailyMinutes: 30,
    masteryScore: 76,
    completedMilestones: 1,
    totalMilestones: 4
  };

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
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome Back, Scholar! 🌟</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620 }}>
              You're making steady progress on your personalized Vernacular STEM learning journey. Socratic Tutor is ready for your next milestone.
            </p>
          </div>

          <button 
            className="nav-tab-btn active"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem', borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => onNavigate('roadmap')}
            id="dash-continue-roadmap-btn"
          >
            <span>Continue to AI Roadmap</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Conceptual Mastery</span>
            <Award size={18} color="var(--accent-saffron)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-saffron-light)' }}>{plan.masteryScore}%</div>
          <div style={{ width: '100%', height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, marginTop: '0.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${plan.masteryScore}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-saffron), var(--accent-indigo))' }} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Learning Streak</span>
            <Flame size={18} color="var(--accent-rose)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fb7185' }}>5 Days Active 🔥</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Consistent daily practice</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Curriculum Milestones</span>
            <Target size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {plan.completedMilestones} / {plan.totalMilestones}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Next: Newton's Laws & Friction</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Target</span>
            <Clock size={18} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{plan.dailyMinutes} mins</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>18 mins logged today</div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>Next Steps in Your Journey</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div 
          className="glass-card" 
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'transform var(--transition-fast)' }}
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
