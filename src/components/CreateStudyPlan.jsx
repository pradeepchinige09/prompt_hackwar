import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, BookOpen, Clock, Globe, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LANGUAGES } from '../data/curriculumData';

export function CreateStudyPlan({ onPlanCreated, onNavigate, currentLanguage }) {
  const [grade, setGrade] = useState('Grade 10');
  const [board, setBoard] = useState('State Board');
  const [subject, setSubject] = useState('Physics');
  const [lang, setLang] = useState(currentLanguage || 'hi');
  const [dailyMinutes, setDailyMinutes] = useState(30);
  const [learningStyle, setLearningStyle] = useState('socratic');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const newPlan = {
        grade,
        board,
        subject,
        language: lang,
        dailyMinutes,
        learningStyle,
        createdAt: new Date().toLocaleDateString(),
        currentMilestone: "Optics & Light Refraction",
        totalMilestones: 4,
        completedMilestones: 1,
        masteryScore: 76
      };

      localStorage.setItem('SHIKSHA_STUDY_PLAN', JSON.stringify(newPlan));
      setIsGenerating(false);
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      if (onPlanCreated) onPlanCreated(newPlan);
      onNavigate('dashboard');
    }, 800);
  };

  return (
    <div className="create-plan-container" id="create-study-plan-view" style={{ maxWidth: 840, margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-saffron-light)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Sparkles size={16} /> STEP 1 OF 5: PERSONALIZED CURRICULUM ONBOARDING
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Create Your Vernacular AI Study Plan</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: 620, margin: '0 auto' }}>
          Our Antigravity Pedagogical Agent customizes a structured milestone roadmap tailored to your mother tongue, grade level, and daily learning target.
        </p>
      </div>

      {/* Plan Configuration Form */}
      <form onSubmit={handleGenerate} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', padding: '2rem' }}>
        {/* Section 1: Grade & Curriculum Board */}
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} color="var(--accent-indigo-light)" /> 1. Select Grade Level & Board
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {['Grade 6-8 (Foundational)', 'Grade 9-10 (Secondary Board)', 'Grade 11-12 (Senior Secondary)'].map(g => (
              <button
                type="button"
                key={g}
                className={`topic-pill ${grade === g.split(' ')[0] + ' ' + g.split(' ')[1] ? 'active' : ''}`}
                style={{ justifyContent: 'center', padding: '0.65rem 1rem', width: '100%' }}
                onClick={() => setGrade(g.split(' ')[0] + ' ' + g.split(' ')[1])}
              >
                {g}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '0.85rem' }}>
            <span className="control-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Curriculum Board Standard:</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['State Board (Vernacular)', 'CBSE / NCERT (National)', 'ICSE / International'].map(b => (
                <button
                  type="button"
                  key={b}
                  className={`topic-pill ${board === b.split(' ')[0] + ' ' + b.split(' ')[1] ? 'active' : ''}`}
                  onClick={() => setBoard(b.split(' ')[0] + ' ' + b.split(' ')[1])}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Preferred Vernacular Language */}
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} color="var(--accent-cyan)" /> 2. Preferred Vernacular Medium
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
            {LANGUAGES.map(l => (
              <button
                type="button"
                key={l.code}
                className={`topic-pill ${lang === l.code ? 'active' : ''}`}
                style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', width: '100%' }}
                onClick={() => setLang(l.code)}
              >
                <span>{l.flag}</span>
                <span>{l.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Subject & Daily Time Goal */}
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="var(--accent-emerald)" /> 3. Primary Subject & Daily Time Commitment
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <span className="control-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Core Focus Subject:</span>
              <select className="select-custom" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: '100%' }}>
                <option value="Physics">Physics (Optics, Forces & Motion)</option>
                <option value="Biology">Biology (Photosynthesis, Cells & Respiration)</option>
                <option value="Mathematics">Mathematics (Fractions, Proportions & Ratios)</option>
              </select>
            </div>

            <div>
              <span className="control-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Daily Target Study Time:</span>
              <select className="select-custom" value={dailyMinutes} onChange={(e) => setDailyMinutes(Number(e.target.value))} style={{ width: '100%' }}>
                <option value="15">15 Minutes / Day (Micro-Learning)</option>
                <option value="30">30 Minutes / Day (Recommended Balanced)</option>
                <option value="60">60 Minutes / Day (Intensive Mastery)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="nav-tab-btn"
            style={{ padding: '0.75rem 1.25rem' }}
            onClick={() => onNavigate('dashboard')}
          >
            Skip to Dashboard →
          </button>

          <button
            type="submit"
            className="nav-tab-btn active"
            style={{ padding: '0.85rem 2rem', fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            disabled={isGenerating}
            id="submit-create-plan-btn"
          >
            <Sparkles size={18} />
            <span>{isGenerating ? 'Synthesizing AI Roadmap with Antigravity...' : 'Generate AI Study Plan →'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
