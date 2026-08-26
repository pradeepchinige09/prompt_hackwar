import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, RotateCcw, Award, Play, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_TOPICS } from '../data/curriculumData';

export function QuizView({ onNavigate, currentLanguage }) {
  const [selectedTopicId, setSelectedTopicId] = useState('optics-prism');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Topic Quiz Question Banks
  const quizBanks = {
    'optics-prism': [
      {
        question: "When white sunlight enters a glass prism from air, which spectral color bends the MOST?",
        options: [
          { text: "Red light (longest wavelength)", isCorrect: false },
          { text: "Violet light (shortest wavelength)", isCorrect: true },
          { text: "Yellow light (mid-spectrum)", isCorrect: false },
          { text: "All colors bend at the exact same angle", isCorrect: false }
        ],
        explanation: "Violet light has the shortest wavelength (~400nm) and interacts more with the dense glass medium, decelerating the most and bending through the greatest angle of deviation."
      },
      {
        question: "What did Sir Isaac Newton's inverted second prism experiment prove?",
        options: [
          { text: "Prisms paint light with physical chemical dyes", isCorrect: false },
          { text: "White light originally contains all 7 colors, which recombine back into white", isCorrect: true },
          { text: "Glass destroys light rays over distance", isCorrect: false },
          { text: "Only mirrors can reflect sunlight", isCorrect: false }
        ],
        explanation: "By placing an inverted prism against the first prism, the 7 separated colors recombined back into a single beam of pure white light, proving white sunlight already contains all 7 colors."
      },
      {
        question: "According to Snell's Law (n₁ sin θ₁ = n₂ sin θ₂), when light enters a DENSER optical medium, it bends:",
        options: [
          { text: "Towards the normal line", isCorrect: true },
          { text: "Away from the normal line", isCorrect: false },
          { text: "Straight through without any change in angle", isCorrect: false },
          { text: "Backwards into the light source", isCorrect: false }
        ],
        explanation: "When entering a optically denser medium (higher refractive index n₂ > n₁), the velocity of light slows down, causing the ray to bend towards the normal."
      }
    ],
    'mechanics-friction': [
      {
        question: "Why does a cricket ball rolling on lush grass stop on its own, according to Newton's 1st Law?",
        options: [
          { text: "Because its internal pushing force naturally ran out", isCorrect: false },
          { text: "Because microscopic ridges between the grass and leather ball create an opposing frictional force", isCorrect: true },
          { text: "Because gravity pulls objects backwards horizontally", isCorrect: false },
          { text: "Because balls can only move for 5 seconds by law of nature", isCorrect: false }
        ],
        explanation: "An object in motion continues moving forever unless acted on by an external net force. Microscopic interlocking between the rough grass blades and the cricket ball generates kinetic friction (f = μN) which decelerates the ball."
      },
      {
        question: "On which surface will a heavy box slide the FURTHEST with the same initial push?",
        options: [
          { text: "Wet mud and grass (μ = 0.65)", isCorrect: false },
          { text: "Rough concrete road (μ = 0.35)", isCorrect: false },
          { text: "Polished marble temple floor (μ = 0.05)", isCorrect: true },
          { text: "Gravel cobblestones (μ = 0.80)", isCorrect: false }
        ],
        explanation: "Polished marble has an extremely low coefficient of friction (μ ≈ 0.05), resulting in minimal resistive force and allowing maximum gliding distance."
      }
    ],
    'biology-photosynthesis': [
      {
        question: "Where does the majority of the dry biomass and heavy wood of a giant Banyan tree come from?",
        options: [
          { text: "Eating rich soil particles directly through roots", isCorrect: false },
          { text: "Carbon dioxide gas captured from atmospheric air during photosynthesis", isCorrect: true },
          { text: "Dissolved fertilizer chemicals in groundwater", isCorrect: false },
          { text: "Sunlight photons having physical heavy weight", isCorrect: false }
        ],
        explanation: "Plants use solar energy to chemically bind carbon dioxide (CO₂) from the air and water (H₂O) into solid glucose and cellulose polymers. Soil supplies only trace minerals and water."
      }
    ],
    'math-fractions': [
      {
        question: "If 4 friends equally share 3 hot rotis, what fraction of a roti does each person receive?",
        options: [
          { text: "4/3 of a roti (more than 1 whole roti)", isCorrect: false },
          { text: "3/4 of a roti (three quarters)", isCorrect: true },
          { text: "1/4 of a roti", isCorrect: false },
          { text: "1 whole roti each", isCorrect: false }
        ],
        explanation: "When sharing 3 rotis among 4 people: Items ÷ People = 3 ÷ 4 = 3/4. Each friend gets 3 quarter-slices (75% of a roti)."
      }
    ]
  };

  const currentQuestions = quizBanks[selectedTopicId] || quizBanks['optics-prism'];
  const q = currentQuestions[currentQIndex];

  const handleSelectOption = (opt) => {
    if (selectedOption !== null) return; // Prevent changing after answer
    setSelectedOption(opt);

    if (opt.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex + 1 < currentQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="quiz-container" id="quiz-assessment-view" style={{ maxWidth: 840, margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '1.75rem 1.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-saffron-light)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          <Sparkles size={16} /> STEP 4 OF 5: CONCEPT MASTERY SELF-ASSESSMENT
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Vernacular Concept Diagnostic Quiz</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 620, margin: '0 auto' }}>
          Test your conceptual understanding. Get instant feedback debunking common scientific myths before heading into the Socratic Tutor!
        </p>

        {/* Topic Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          {CURRICULUM_TOPICS.map(t => (
            <button
              key={t.id}
              className={`topic-pill ${selectedTopicId === t.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedTopicId(t.id);
                handleReset();
              }}
            >
              {t.title[currentLanguage] || t.title.en}
            </button>
          ))}
        </div>
      </div>

      {!isFinished ? (
        <div className="glass-card" style={{ padding: '2rem' }}>
          {/* Progress Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
              Question {currentQIndex + 1} of {currentQuestions.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-saffron-light)', fontWeight: 700 }}>
              Current Score: {score}
            </span>
          </div>

          {/* Question Text */}
          <h3 style={{ fontSize: '1.15rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            {q.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {q.options.map((opt, idx) => {
              let btnStyle = {
                textAlign: 'left',
                padding: '0.9rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: selectedOption === null ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)'
              };

              if (selectedOption !== null) {
                if (opt.isCorrect) {
                  btnStyle.background = 'rgba(16, 185, 129, 0.2)';
                  btnStyle.borderColor = 'var(--accent-emerald)';
                  btnStyle.color = '#34d399';
                } else if (selectedOption === opt && !opt.isCorrect) {
                  btnStyle.background = 'rgba(244, 63, 94, 0.2)';
                  btnStyle.borderColor = 'var(--accent-rose)';
                  btnStyle.color = '#fb7185';
                }
              }

              return (
                <button
                  key={idx}
                  style={btnStyle}
                  onClick={() => handleSelectOption(opt)}
                  disabled={selectedOption !== null}
                >
                  <span><strong>{String.fromCharCode(65 + idx)}.</strong> {opt.text}</span>
                  {selectedOption !== null && opt.isCorrect && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
                  {selectedOption === opt && !opt.isCorrect && <XCircle size={18} color="var(--accent-rose)" />}
                </button>
              );
            })}
          </div>

          {/* Feedback Card when answered */}
          {selectedOption !== null && (
            <div style={{ background: selectedOption.isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${selectedOption.isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`, borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.35rem', color: selectedOption.isCorrect ? 'var(--accent-emerald)' : 'var(--accent-saffron-light)' }}>
                {selectedOption.isCorrect ? '🎉 Correct Observation!' : '💡 Conceptual Misconception Identified'}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {q.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="nav-tab-btn active"
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.92rem' }}
                onClick={handleNext}
                id="quiz-next-question-btn"
              >
                {currentQIndex + 1 < currentQuestions.length ? 'Next Question →' : 'View Results & Continue →'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Results Screen */
        <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          <div className="brand-icon-wrapper" style={{ width: 64, height: 64, fontSize: '2rem', margin: '0 auto 1rem', background: 'rgba(16,185,129,0.2)', color: 'var(--accent-emerald)' }}>
            🏆
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Assessment Complete!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
            You scored <strong>{score} out of {currentQuestions.length}</strong> ({Math.round((score / currentQuestions.length) * 100)}% Mastery).
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button
              className="nav-tab-btn"
              style={{ padding: '0.75rem 1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={handleReset}
            >
              <RotateCcw size={16} /> Retake Quiz
            </button>

            <button
              className="nav-tab-btn active"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
              onClick={() => onNavigate('tutor')}
              id="quiz-master-with-tutor-btn"
            >
              <Sparkles size={18} />
              <span>Step 5: Master in AI Socratic Tutor →</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
