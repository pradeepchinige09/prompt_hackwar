import React, { useState } from 'react';
import { X, Cpu, GitBranch, Terminal, ShieldCheck, Zap, Key, Check, BarChart2, Target, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { agentOrchestrator } from '../services/agentOrchestrator';

export function AgentTraceModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(localStorage.getItem('GEMINI_API_KEY') || '');
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('orchestration'); // 'orchestration' | 'adaptive'

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    agentOrchestrator.setApiKey(apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="trace-modal-overlay" onClick={onClose}>
      <div className="trace-modal-card" onClick={(e) => e.stopPropagation()} id="agent-trace-modal" style={{ maxWidth: 760 }}>
        {/* Header */}
        <div className="trace-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-icon-wrapper" style={{ width: 36, height: 36, fontSize: '1.1rem' }}>
              <Cpu size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Google Antigravity Glass-Box Agent Inspector</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-saffron-light)' }}>
                Multi-Agent Cognitive Pipeline & Live Trace
              </span>
            </div>
          </div>

          <button className="icon-btn" onClick={onClose} id="close-trace-modal-btn">
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <button 
            className={`nav-tab-btn ${activeTab === 'orchestration' ? 'active' : ''}`}
            onClick={() => setActiveTab('orchestration')}
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
          >
            <GitBranch size={14} /> Multi-Agent Tree
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'adaptive' ? 'active' : ''}`}
            onClick={() => setActiveTab('adaptive')}
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
            id="adaptive-pipeline-tab-btn"
          >
            <Zap size={14} /> Adaptive Learning Pipeline
          </button>
        </div>

        {/* Trace Body */}
        <div className="trace-body" style={{ maxHeight: '68vh', overflowY: 'auto', padding: '1.25rem' }}>
          {activeTab === 'orchestration' ? (
            <>
              {/* Multi-Agent Architecture Topology */}
              <div className="glass-card" style={{ background: 'var(--bg-primary)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <GitBranch size={16} color="var(--accent-indigo-light)" />
                  <h4 style={{ fontSize: '0.95rem' }}>Multi-Agent Orchestration Tree</h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(99,102,241,0.3)' }}>
                    <span className="trace-agent-tag">Primary Supervisor</span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>ShikshaSupervisor</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Intent parsing, dialog turn routing & guardrails</div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245,158,11,0.3)' }}>
                    <span className="trace-agent-tag" style={{ color: 'var(--accent-saffron-light)' }}>Subagent 1</span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>SocraticGuruAgent</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Scaffolding questions, avoids direct spoilers</div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(6,182,212,0.3)' }}>
                    <span className="trace-agent-tag" style={{ color: 'var(--accent-cyan)' }}>Subagent 2</span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>VernacularBridgeAgent</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Localizes to Hindi/Hinglish with cultural anchors</div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <span className="trace-agent-tag" style={{ color: 'var(--accent-emerald)' }}>Subagent 3</span>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>VisualSynthesisAgent</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Computes SVG ray coordinates & simulation states</div>
                  </div>
                </div>
              </div>

              {/* Live Execution Timeline */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
                  Most Recent Agent Dispatch Lifecycle
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div className="trace-step">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="trace-agent-tag">Step 1: Cognitive Ingestion</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>t = 0ms</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                      [Supervisor] Tokenizing query & verifying educational safety policy (NEP 2020 safe filters).
                    </div>
                  </div>

                  <div className="trace-step">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="trace-agent-tag" style={{ color: 'var(--accent-saffron-light)' }}>
                        Step 2: Tool Execution
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>t = 120ms</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-saffron-light)' }}>
                      → Executing tool: `curriculum_lookup(concept="Optics", targetGrade="Grade 10", board="NCF")`
                      <br />
                      ← Output: Retrieved Snell's Law & Cauchy's Dispersion formula + Misconception index #4.
                    </div>
                  </div>

                  <div className="trace-step">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="trace-agent-tag" style={{ color: 'var(--accent-cyan)' }}>
                        Step 3: Vernacular & Cultural Anchoring
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>t = 280ms</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>
                      → Delegating to VernacularCulturalBridgeAgent: Injected runner on athletic sandy field analogy.
                    </div>
                  </div>

                  <div className="trace-step active">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="trace-agent-tag" style={{ color: 'var(--accent-emerald)' }}>
                        Step 4: Vector Canvas & Speech Synthesis
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>t = 420ms</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-emerald)' }}>
                      → Triggered VisualSynthesisAgent: Re-projecting 7-color spectral coordinates on SVG Canvas.
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* FEATURE 8: Adaptive Learning Pipeline View */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div className="glass-card" style={{ background: 'var(--bg-primary)', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Brain size={16} color="var(--accent-saffron)" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Autonomous Adaptive Learning Pipeline</h4>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  The 6-stage closed-loop evaluation system continuously measures student understanding, pinpoints conceptual misunderstandings, calculates mastery tiers, and personalizes the next Socratic learning intervention.
                </p>
              </div>

              {/* 6-Stage Pipeline Trace */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div className="trace-step">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="trace-agent-tag">Stage 1: ShikshaSupervisor Ingestion</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Active</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                    Captures student answer tokens, assessment history, and current study plan parameters (Grade, Language, Board).
                  </div>
                </div>

                <div className="trace-step">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="trace-agent-tag" style={{ color: 'var(--accent-saffron-light)' }}>
                      Stage 2: Quiz Performance Analysis
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Deterministic</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-saffron-light)' }}>
                    Computes raw score, attempts, response accuracy, and historical question repetition to prevent duplicate XP gaming.
                  </div>
                </div>

                <div className="trace-step">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="trace-agent-tag" style={{ color: 'var(--accent-cyan)' }}>
                      Stage 3: Misconception Detection
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Pattern Classifier</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-cyan)' }}>
                    Matches selected distractors to cognitive misconception taxonomies (e.g. "Prism paints light" vs "Snell's wave deceleration").
                  </div>
                </div>

                <div className="trace-step">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="trace-agent-tag" style={{ color: 'var(--accent-emerald)' }}>
                      Stage 4: Mastery Calculation
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Tiered Grading</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-emerald)' }}>
                    Maps mastery percentage: 90-100% (Mastered), 75-89% (Strong), 50-74% (Developing), &lt;50% (Needs Practice).
                  </div>
                </div>

                <div className="trace-step">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="trace-agent-tag" style={{ color: '#fb7185' }}>
                      Stage 5: Adaptive Recommendation
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Personalized Dispatch</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#fb7185' }}>
                    Identifies lowest mastery concept, assigns targeted simulation mode, and generates multilingual action card for Learner Dashboard.
                  </div>
                </div>

                <div className="trace-step active">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="trace-agent-tag" style={{ color: 'var(--accent-indigo-light)' }}>
                      Stage 6: SocraticGuruAgent Scaffolding
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Closed Loop</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-indigo-light)' }}>
                    Adjusts Socratic hint depth (1-4) according to mastery level so struggling students receive foundational metaphors and advanced students receive rigorous mathematical challenges.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Optional Gemini Live API Key Integration */}
          <div className="glass-card" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Key size={16} color="var(--accent-saffron)" />
              <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-saffron-light)' }}>
                Gemini API Key Connection (Optional)
              </h4>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>
              ShikshaSetu runs entirely offline with built-in autonomous multi-agent simulation for zero-latency judging. You can optionally paste a Gemini API key from <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>Google AI Studio</a> to connect live cloud models.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="password"
                className="chat-input"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                placeholder="AIzaSy... (Gemini API Key)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button 
                className="nav-tab-btn active" 
                style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                onClick={handleSaveKey}
              >
                {isSaved ? <Check size={14} /> : 'Save Key'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
