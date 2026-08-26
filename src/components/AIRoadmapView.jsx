import React from 'react';
import { Compass, Play } from 'lucide-react';
import { CURRICULUM_TOPICS } from '../data/curriculumData';

export function AIRoadmapView({ onNavigate, onSelectTopic, currentLanguage }) {
  const milestones = [
    {
      id: "optics-prism",
      topic: CURRICULUM_TOPICS[0],
      status: "completed",
      badge: "Mastered (88%)",
      title: CURRICULUM_TOPICS[0].title[currentLanguage] || CURRICULUM_TOPICS[0].title.en,
      desc: "Snell's Law, Cauchy's dispersion, and why sunlight splits into 7 rainbow colors in a triangular prism.",
      analogy: "Athletic runners with short strides slowing down and turning sharply in sand."
    },
    {
      id: "mechanics-friction",
      topic: CURRICULUM_TOPICS[1],
      status: "active",
      badge: "Current Milestone ⚡",
      title: CURRICULUM_TOPICS[1].title[currentLanguage] || CURRICULUM_TOPICS[1].title.en,
      desc: "Newton's 1st Law, microscopic surface roughness, and opposing frictional resistance (f = μN).",
      analogy: "Rolling a cricket ball on lush outfield vs gliding on marble temple floor."
    },
    {
      id: "biology-photosynthesis",
      topic: CURRICULUM_TOPICS[2],
      status: "locked",
      badge: "Next Up (Locked 🔒)",
      title: CURRICULUM_TOPICS[2].title[currentLanguage] || CURRICULUM_TOPICS[2].title.en,
      desc: "Photosynthesis chemical equation, stomata gas exchange, and source of giant tree biomass.",
      analogy: "Leaves as miniature solar kitchens in Indian villages baking glucose from sunlight."
    },
    {
      id: "math-fractions",
      topic: CURRICULUM_TOPICS[3],
      status: "locked",
      badge: "Upcoming 🔒",
      title: CURRICULUM_TOPICS[3].title[currentLanguage] || CURRICULUM_TOPICS[3].title.en,
      desc: "Proper vs improper fractions, numerator vs denominator, and proportions in everyday meal sharing.",
      analogy: "Sharing 3 hot rotis among 4 friends in a thali (3/4th roti each)."
    }
  ];

  return (
    <div className="roadmap-container" id="ai-roadmap-view" style={{ maxWidth: 920, margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          <Compass size={16} /> STEP 3 OF 5: STRUCTURED CONCEPT TREE
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your AI Curriculum Roadmap</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: 650, margin: '0 auto' }}>
          Each milestone is mapped to National Curriculum Framework (NCF / NEP 2020) standards with progressive Socratic inquiry and interactive visual models.
        </p>
      </div>

      {/* Connected Milestones List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        {milestones.map((m, index) => (
          <div 
            key={m.id}
            className="glass-card"
            style={{ 
              borderLeft: m.status === 'completed' 
                ? '4px solid var(--accent-emerald)' 
                : m.status === 'active' 
                ? '4px solid var(--accent-saffron)' 
                : '4px solid var(--border-subtle)',
              position: 'relative',
              padding: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: '50%', 
                  background: m.status === 'completed' ? 'var(--accent-emerald-glow)' : m.status === 'active' ? 'var(--accent-saffron-glow)' : 'var(--bg-tertiary)',
                  color: m.status === 'completed' ? 'var(--accent-emerald)' : m.status === 'active' ? 'var(--accent-saffron-light)' : 'var(--text-muted)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}>
                  {m.status === 'completed' ? '✓' : index + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{m.title}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.topic.subject} • {m.topic.grade}</span>
                </div>
              </div>

              <span className={`risk-tag ${m.status === 'completed' ? 'risk-low' : m.status === 'active' ? 'risk-medium' : ''}`} style={{ fontSize: '0.75rem' }}>
                {m.badge}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '0.85rem' }}>
              {m.desc}
            </p>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--accent-saffron-light)', marginBottom: '1rem' }}>
              🪔 <strong>Cultural Analogy:</strong> {m.analogy}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="nav-tab-btn active"
                style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                onClick={() => {
                  if (onSelectTopic) onSelectTopic(m.topic);
                  onNavigate('tutor');
                }}
              >
                <Play size={13} /> Launch AI Tutor on This Concept
              </button>

              <button
                className="nav-tab-btn"
                style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                onClick={() => {
                  if (onSelectTopic) onSelectTopic(m.topic);
                  onNavigate('quiz');
                }}
              >
                Take Diagnostic Quiz →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Next Stage Navigation Banner */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', flexWrap: 'wrap', gap: '1rem', background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(99,102,241,0.1))' }}>
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Finished reviewing your curriculum roadmap?</h4>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Proceed to Step 4 to test your conceptual knowledge, then enter the Socratic Tutor!
          </span>
        </div>

        <button 
          className="nav-tab-btn active"
          style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          onClick={() => onNavigate('quiz')}
          id="roadmap-goto-quiz-btn"
        >
          <span>Step 4: Take Quiz Assessment →</span>
        </button>
      </div>
    </div>
  );
}
