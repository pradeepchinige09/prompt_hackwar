import React, { useState, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, XCircle, RotateCcw, Zap, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_TOPICS } from '../data/curriculumData';
import { learningEngine } from '../services/learningEngine';

export function QuizView({ onNavigate, currentLanguage, initialTopicId, onTopicSelect }) {
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId || 'optics-prism');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [incorrectList, setIncorrectList] = useState([]);
  const [misconceptionsList, setMisconceptionsList] = useState([]);
  const [quizResultSummary, setQuizResultSummary] = useState(null);

  // Sync when initial topic changes from Roadmap
  useEffect(() => {
    if (initialTopicId && initialTopicId !== selectedTopicId) {
      setSelectedTopicId(initialTopicId);
      setCurrentQIndex(0);
      setSelectedOption(null);
      setScore(0);
      setIncorrectList([]);
      setMisconceptionsList([]);
      setQuizResultSummary(null);
      setIsFinished(false);
    }
  }, [initialTopicId]);

  // Comprehensive 4-Choice Question Banks for all 4 Topics
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
        explanation: "When entering an optically denser medium (higher refractive index n₂ > n₁), the velocity of light slows down, causing the ray to bend towards the normal."
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
      },
      {
        question: "Why is it harder to get a heavy stalled car moving from a dead stop than to keep it rolling once moving?",
        options: [
          { text: "Static friction coefficient (μs) is higher than kinetic friction (μk)", isCorrect: true },
          { text: "Cars become physically lighter once the wheels turn", isCorrect: false },
          { text: "Newton's laws do not apply to stationary objects", isCorrect: false },
          { text: "Air resistance pushes backwards only when standing still", isCorrect: false }
        ],
        explanation: "Microscopic surface imperfections form temporary cold welds when at rest. Overcoming static friction requires more initial force than maintaining motion against kinetic friction (μk < μs)."
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
      },
      {
        question: "What life-sustaining gas is released into the atmosphere as a byproduct when water molecules split in photosynthesis?",
        options: [
          { text: "Oxygen (O₂) gas", isCorrect: true },
          { text: "Nitrogen (N₂) gas", isCorrect: false },
          { text: "Carbon monoxide (CO) gas", isCorrect: false },
          { text: "Methane (CH₄) gas", isCorrect: false }
        ],
        explanation: "In the thylakoid light reactions, solar photons photolyze water (2H₂O → 4H⁺ + 4e⁻ + O₂), releasing Oxygen gas as a vital byproduct that supports aerobic life on Earth."
      },
      {
        question: "How do leaf stomata pores respond during an extremely dry, scorching afternoon?",
        options: [
          { text: "Guard cells close the pores to prevent critical water loss (transpiration)", isCorrect: true },
          { text: "Pores burst wide open to harvest more sunlight", isCorrect: false },
          { text: "Stomata completely dissolve under heat", isCorrect: false },
          { text: "Leaves pump water into surrounding dry air", isCorrect: false }
        ],
        explanation: "Guard cells lose turgidity in response to high heat and water stress, closing stomata apertures to conserve internal moisture through transpiration control."
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
      },
      {
        question: "Which of the following correctly describes the conceptual difference between 3/4 and 4/3?",
        options: [
          { text: "3/4 is a proper fraction (< 1 whole); 4/3 is an improper fraction (> 1 whole)", isCorrect: true },
          { text: "Both fractions represent the exact same quantity", isCorrect: false },
          { text: "3/4 is larger than 4/3 because 3 is written first", isCorrect: false },
          { text: "Neither fraction can be visualized using food sharing", isCorrect: false }
        ],
        explanation: "3/4 = 0.75 (a part of a single unit). 4/3 = 1.33 (one whole unit plus an additional third). The numerator indicates parts taken; denominator indicates equal divisions."
      },
      {
        question: "If 3 rotis are shared equally among 6 children, what is each child's portion in simplest fractional form?",
        options: [
          { text: "1/2 of a roti (half a roti)", isCorrect: true },
          { text: "2/1 (two whole rotis)", isCorrect: false },
          { text: "1/6 of a roti", isCorrect: false },
          { text: "3/2 rotis", isCorrect: false }
        ],
        explanation: "3 rotis ÷ 6 children = 3/6. Dividing both the numerator and denominator by 3 gives 1/2 (half a roti each)."
      }
    ]
  };

  const currentQuestions = quizBanks[selectedTopicId] || quizBanks['optics-prism'];
  const q = currentQuestions[currentQIndex] || currentQuestions[0];

  const handleSelectOption = (opt) => {
    if (selectedOption !== null) return; // Prevent changing after answer or inflating score
    setSelectedOption(opt);

    if (opt.isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectList(prev => [...prev, q.question]);
      setMisconceptionsList(prev => [...prev, q.explanation]);
    }
  };

  const handleNext = () => {
    if (currentQIndex + 1 < currentQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      const attemptId = `quiz_${selectedTopicId}_${Date.now()}`;
      const summary = learningEngine.recordQuizResult({
        attemptId,
        topicId: selectedTopicId,
        score,
        totalQuestions: currentQuestions.length,
        incorrectAnswers: incorrectList,
        misconceptions: misconceptionsList
      });
      setQuizResultSummary(summary);
      setIsFinished(true);
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIncorrectList([]);
    setMisconceptionsList([]);
    setQuizResultSummary(null);
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
                if (onTopicSelect) onTopicSelect(t.id);
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
                  aria-pressed={selectedOption === opt}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt.text}`}
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
        /* Quiz Complete Results Screen with Educational Feedback & Adaptive Handoff */
        <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 64, height: 64, fontSize: '2rem', margin: '0 auto 1rem', background: 'rgba(16,185,129,0.2)', color: 'var(--accent-emerald)' }}>
              🏆
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Assessment Complete!
            </h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.25rem' }}>
              <span className={`risk-tag ${score === currentQuestions.length ? 'risk-low' : score >= 2 ? 'risk-low' : 'risk-high'}`} style={{ fontSize: '0.85rem' }}>
                Mastery Level: {quizResultSummary?.topicTier || (score >= 2 ? 'Strong' : 'Needs Practice')} ({Math.round((score / currentQuestions.length) * 100)}%)
              </span>
              <span style={{ background: 'rgba(245,158,11,0.2)', color: 'var(--accent-saffron-light)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Zap size={14} /> +{quizResultSummary?.earnedXP || (50 + score * 20)} XP Earned!
              </span>
            </div>
          </div>

          {/* Newly Unlocked Badges Celebration */}
          {quizResultSummary?.newlyUnlockedBadges?.length > 0 && (
            <div style={{ background: 'rgba(245,158,11,0.15)', border: '1.5px solid rgba(245,158,11,0.4)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem' }}>🌟</div>
              <div style={{ fontWeight: 800, color: 'var(--accent-saffron-light)', fontSize: '0.95rem' }}>
                New Badge Unlocked: {quizResultSummary.newlyUnlockedBadges.map(b => b.toUpperCase().replace('_', ' ')).join(', ')}!
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Your achievements have been recorded in your Learner Dashboard.
              </div>
            </div>
          )}

          {/* Diagnostic Breakdown: Strong vs Weak Areas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                <CheckCircle2 size={16} /> Concept Strengths ({score}/{currentQuestions.length})
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {score > 0 ? `Demonstrated solid conceptual intuition on ${score} core curriculum questions.` : 'Foundational concepts require review.'}
              </p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: incorrectList.length > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                <AlertCircle size={16} /> Targeted Focus Areas ({currentQuestions.length - score})
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {misconceptionsList.length > 0 ? misconceptionsList[0] : 'No persistent misconceptions detected in this round.'}
              </p>
            </div>
          </div>

          {/* Adaptive Learning Recommendation Card */}
          <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(245,158,11,0.1))', border: '1.5px solid var(--accent-indigo)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-saffron-light)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <Zap size={14} /> ADAPTIVE RECOMMENDATION
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              {score < currentQuestions.length ? 'Remedial Reinforcement: Socratic Tutor & Mental Models' : 'Concept Mastered: Explore Cultural Analogies & Next Milestone'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              {score < currentQuestions.length 
                ? 'Our adaptive engine recommends opening the Socratic Tutor to experiment with the interactive sliders before retaking the assessment.'
                : 'Excellent mastery! Advance to the next concept on your AI Roadmap or explore local Indian analogies.'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="nav-tab-btn active"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => {
                  if (onTopicSelect) onTopicSelect(selectedTopicId);
                  onNavigate('tutor');
                }}
                id="quiz-adaptive-continue-btn"
              >
                <Sparkles size={16} />
                <span>Continue Learning in Socratic Tutor →</span>
              </button>

              <button
                className="nav-tab-btn"
                style={{ padding: '0.75rem 1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                onClick={handleReset}
              >
                <RotateCcw size={15} /> Retake Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
