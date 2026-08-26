import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, Eye, Users } from 'lucide-react';

export function LandingPage({ onNavigate, currentLanguage }) {
  return (
    <div className="landing-page" id="landing-page-view">
      {/* Hero Section */}
      <section className="hero-section glass-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
          <Sparkles size={16} color="var(--accent-saffron)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-saffron-light)' }}>
            Google Antigravity Multi-Agent Architecture • UN SDG 4 Aligned
          </span>
        </div>

        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1.15, maxWidth: 900, margin: '0 auto 1.25rem', letterSpacing: '-0.03em' }}>
          Empowering Every Child With an Empathetic, <span style={{ background: 'linear-gradient(120deg, var(--accent-saffron-light), var(--accent-indigo-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vernacular Socratic AI Tutor</span>
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 740, margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
          ShikshaSetu AI addresses the widespread comprehension barrier in rural and vernacular classrooms by combining guided inquiry, Indian cultural analogies, and real-time interactive mental models.
        </p>

        {/* Primary CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="nav-tab-btn active" 
            style={{ padding: '0.85rem 1.85rem', fontSize: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            onClick={() => onNavigate('create-plan')}
            id="hero-create-plan-btn"
          >
            <span>Create Personalized Study Plan</span>
            <ArrowRight size={18} />
          </button>

          <button 
            className="nav-tab-btn" 
            style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            onClick={() => onNavigate('tutor')}
            id="hero-open-tutor-btn"
          >
            Launch AI Socratic Tutor
          </button>

          <button 
            className="nav-tab-btn" 
            style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            onClick={() => onNavigate('teacher')}
            id="hero-teacher-portal-btn"
          >
            Educator Co-Pilot
          </button>
        </div>
      </section>

      {/* Social Impact Metric Strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-saffron-light)', marginBottom: '0.25rem' }}>1:60 Ratio</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Overburdened Classrooms Supported via Socratic 1-on-1 AI</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>6 Languages</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>English, Hindi, Hinglish, Telugu, Tamil, Marathi</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.25rem' }}>4 AI Agents</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Supervisor, Socratic, Cultural & Visual Generators</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-indigo-light)', marginBottom: '0.25rem' }}>Offline Ready</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Local Cache & Lightweight Mode for Low-Bandwidth Schools</div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>The 4 Pillars of Educational Equity</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>How ShikshaSetu turns passive rote memorizers into active scientific discoverers</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 44, height: 44, background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: 'var(--accent-saffron)' }}>
              <BookOpen size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem' }}>1. Socratic Inquiry Guru</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Never hands out raw answers. Guides students step-by-step using pedagogical scaffolding, cognitive tier matching, and 4-step hint ladders.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 44, height: 44, background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: 'var(--accent-cyan)' }}>
              <Compass size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem' }}>2. Cultural Vernacular Bridge</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Anchors abstract physics and math in everyday regional anchors—like a spinning <em>lattu</em>, cricket ball on grass, or sharing rotis in a <em>thali</em>.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 44, height: 44, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--accent-indigo-light)' }}>
              <Eye size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem' }}>3. Dynamic Mental Models</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Manipulable interactive SVG simulations for Optics prism refraction, surface friction deceleration, and photosynthesis solar factories.
            </p>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 44, height: 44, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--accent-emerald)' }}>
              <Users size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem' }}>4. Educator Diagnostic Co-Pilot</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Instantly generates differentiated, bilingual worksheets aligned with NEP 2020, scans student responses for misconceptions, and tracks classroom heatmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Guided Student Journey Callout */}
      <section className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(245,158,11,0.1))' }}>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Ready to Begin Your Vernacular Learning Journey?</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 1.5rem' }}>
          Follow our 5-stage personalized learning loop: Create Study Plan → Check Dashboard → Follow AI Roadmap → Test with Quiz → Master with AI Tutor.
        </p>
        <button 
          className="nav-tab-btn active"
          style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem', borderRadius: 'var(--radius-md)' }}
          onClick={() => onNavigate('create-plan')}
          id="guided-flow-start-btn"
        >
          Step 1: Create Study Plan Now →
        </button>
      </section>
    </div>
  );
}
