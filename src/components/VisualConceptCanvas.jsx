import React, { useState } from 'react';
import { Eye, Sparkles, Layers, Play } from 'lucide-react';

export function VisualConceptCanvas({ topic, currentParams, onParamChange }) {
  const [angle, setAngle] = useState(currentParams?.incidenceAngle || 45);
  const [refractiveIndex, setRefractiveIndex] = useState(currentParams?.refractiveIndex || 1.52);
  const [surface, setSurface] = useState('grass');
  const [ballPosition, setBallPosition] = useState(120);
  const [isRolling, setIsRolling] = useState(false);
  const [stomataOpen, setStomataOpen] = useState(true);
  const [sunlight, setSunlight] = useState(80);
  const [numRotis, setNumRotis] = useState(3);
  const [numFriends, setNumFriends] = useState(4);
  const [activeTab, setActiveTab] = useState('visual');

  const simulationType = topic?.simulationType || 'prism';

  const rollIntervalRef = React.useRef(null);

  // Sync parameters when topic changes
  React.useEffect(() => {
    if (topic?.simulationParams) {
      if (topic.simulationParams.incidenceAngle !== undefined) setAngle(topic.simulationParams.incidenceAngle);
      if (topic.simulationParams.refractiveIndex !== undefined) setRefractiveIndex(topic.simulationParams.refractiveIndex);
      if (topic.simulationParams.surface !== undefined) setSurface(topic.simulationParams.surface);
    }
    if (rollIntervalRef.current) {
      clearInterval(rollIntervalRef.current);
      setIsRolling(false);
    }
  }, [topic]);

  React.useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    };
  }, []);

  // Friction ball roll animation with safe cleanup
  const handleRollBall = () => {
    if (isRolling) return;
    setIsRolling(true);
    setBallPosition(70);

    const maxDist = surface === 'grass' ? 180 : surface === 'concrete' ? 270 : 360;
    let current = 70;
    if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    rollIntervalRef.current = setInterval(() => {
      current += 6;
      if (current >= maxDist) {
        if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
        setIsRolling(false);
      }
      setBallPosition(current);
    }, 25);
  };

  return (
    <div className="glass-card visual-canvas-card" id="visual-concept-canvas">
      <div className="canvas-header">
        <div className="canvas-title">
          <div className="brand-icon-wrapper" style={{ width: 34, height: 34, fontSize: '1rem' }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3>Interactive Mental Model</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Dynamic Simulation & Cultural Anchor
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button 
            className={`nav-tab-btn ${activeTab === 'visual' ? 'active' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            onClick={() => setActiveTab('visual')}
          >
            <Eye size={14} /> Simulation
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'analogy' ? 'active' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            onClick={() => setActiveTab('analogy')}
          >
            <Layers size={14} /> Local Analogy
          </button>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <>
          {/* Viewport for SVG Render */}
          <div className="simulation-viewport">
            {simulationType === 'prism' && (
              <PrismSVG angle={angle} refractiveIndex={refractiveIndex} />
            )}

            {simulationType === 'friction' && (
              <FrictionSVG surface={surface} ballX={ballPosition} isRolling={isRolling} />
            )}

            {simulationType === 'photosynthesis' && (
              <PhotosynthesisSVG stomataOpen={stomataOpen} sunlight={sunlight} />
            )}

            {simulationType === 'fractions' && (
              <FractionsSVG totalItems={numRotis} totalPeople={numFriends} />
            )}
          </div>

          {/* Interactive Sliders / Controls */}
          <div className="interactive-controls">
            {simulationType === 'prism' && (
              <>
                <div className="control-row">
                  <span className="control-label">Angle of Incidence (θ₁):</span>
                  <input 
                    type="range" 
                    min="25" 
                    max="65" 
                    value={angle} 
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAngle(val);
                      if (onParamChange) onParamChange({ ...currentParams, incidenceAngle: val });
                    }}
                    className="slider-custom"
                    id="prism-angle-slider"
                    aria-label="Angle of Incidence in degrees"
                  />
                  <span className="control-value">{angle}°</span>
                </div>

                <div className="control-row">
                  <span className="control-label">Medium Refractive Index (n₂):</span>
                  <select 
                    value={refractiveIndex} 
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setRefractiveIndex(val);
                      if (onParamChange) onParamChange({ ...currentParams, refractiveIndex: val });
                    }}
                    className="select-custom"
                    style={{ flex: 1, maxWidth: 220 }}
                    aria-label="Medium Refractive Index"
                  >
                    <option value="1.33">Water (n = 1.33)</option>
                    <option value="1.52">Crown Glass (n = 1.52)</option>
                    <option value="1.66">Flint Glass (n = 1.66)</option>
                    <option value="2.42">Diamond (n = 2.42)</option>
                  </select>
                  <span className="control-value">{refractiveIndex}</span>
                </div>
              </>
            )}

            {simulationType === 'friction' && (
              <>
                <div className="control-row">
                  <span className="control-label">Surface Material:</span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {[
                      { id: 'grass', name: 'Rough Grass (μ=0.6)' },
                      { id: 'concrete', name: 'Concrete (μ=0.3)' },
                      { id: 'ice', name: 'Marble/Ice (μ=0.05)' }
                    ].map(s => (
                      <button
                        key={s.id}
                        className={`topic-pill ${surface === s.id ? 'active' : ''}`}
                        onClick={() => {
                          setSurface(s.id);
                          setBallPosition(120);
                        }}
                        aria-pressed={surface === s.id}
                        aria-label={`Select surface material: ${s.name}`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="control-row" style={{ marginTop: '0.4rem' }}>
                  <button 
                    className="nav-tab-btn active" 
                    onClick={handleRollBall}
                    disabled={isRolling}
                    style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}
                    aria-label="Roll Cricket Ball on surface"
                  >
                    <Play size={14} /> {isRolling ? 'Rolling...' : 'Roll Cricket Ball'}
                  </button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-saffron-light)' }}>
                    {surface === 'grass' ? 'Stops quickly due to high interlocking ridges!' : surface === 'concrete' ? 'Moderate skid distance' : 'Glides with minimal resistance!'}
                  </span>
                </div>
              </>
            )}

            {simulationType === 'photosynthesis' && (
              <>
                <div className="control-row">
                  <span className="control-label">Sunlight Intensity:</span>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sunlight} 
                    onChange={(e) => setSunlight(Number(e.target.value))}
                    className="slider-custom"
                    aria-label="Sunlight Intensity percentage"
                  />
                  <span className="control-value">{sunlight}%</span>
                </div>

                <div className="control-row">
                  <span className="control-label">Stomata Micro-Pores:</span>
                  <button 
                    className={`nav-tab-btn ${stomataOpen ? 'active' : ''}`}
                    onClick={() => setStomataOpen(!stomataOpen)}
                    aria-pressed={stomataOpen}
                    aria-label={stomataOpen ? "Close Stomata Micro-Pores" : "Open Stomata Micro-Pores"}
                  >
                    {stomataOpen ? '☀️ Open (Gas Exchange Active)' : '🌙 Closed (Night Mode)'}
                  </button>
                  <span className="control-value" style={{ color: 'var(--accent-emerald)' }}>
                    {stomataOpen && sunlight > 20 ? `${Math.round(sunlight * 0.45)} O₂ bubbles/min` : '0 O₂/min'}
                  </span>
                </div>
              </>
            )}

            {simulationType === 'fractions' && (
              <>
                <div className="control-row">
                  <span className="control-label">Hot Rotis to Share:</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="4" 
                    value={numRotis} 
                    onChange={(e) => setNumRotis(Number(e.target.value))}
                    className="slider-custom"
                    aria-label="Number of Hot Rotis to share"
                  />
                  <span className="control-value">{numRotis} Rotis</span>
                </div>

                <div className="control-row">
                  <span className="control-label">Friends Sharing:</span>
                  <input 
                    type="range" 
                    min="2" 
                    max="6" 
                    value={numFriends} 
                    onChange={(e) => setNumFriends(Number(e.target.value))}
                    className="slider-custom"
                    aria-label="Number of Friends sharing rotis"
                  />
                  <span className="control-value">{numFriends} Friends</span>
                </div>

                <div style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--accent-saffron-light)', fontWeight: 'bold' }}>
                  Result: {numRotis} ÷ {numFriends} = {numRotis}/{numFriends} Roti per friend ({Math.round((numRotis / numFriends) * 100)}% portion)
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="analogy-card">
          <div className="analogy-title">
            <Sparkles size={16} /> Regional Cultural Intuition Anchor
          </div>
          <p className="analogy-body">
            {topic?.culturalAnalogy?.en || "Connects classroom STEM concepts to everyday village and suburban life."}
          </p>
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--accent-saffron-light)' }}>
            💡 <strong>Pedagogical Impact:</strong> In multilingual classrooms, students often struggle with abstract textbook jargon. Anchoring concepts in familiar physical phenomena helps build durable conceptual intuition before introducing formal mathematical formulas.
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Interactive SVG 1: Equilateral Prism Dispersion
// -------------------------------------------------------------
function PrismSVG({ angle, refractiveIndex }) {
  const safeAngle = Math.max(25, Math.min(65, Number(angle) || 45));
  const safeRI = Math.max(1.1, Math.min(2.5, Number(refractiveIndex) || 1.52));
  const devFactor = (safeRI - 1) * 35;
  const startX = 40;
  const startY = 160 + (safeAngle - 45) * 1.5;
  const hitX = 145;
  const hitY = 145;

  const colors = [
    { name: 'Red', hex: '#ef4444', dev: devFactor * 0.85, wl: '700nm' },
    { name: 'Orange', hex: '#f97316', dev: devFactor * 0.92, wl: '620nm' },
    { name: 'Yellow', hex: '#eab308', dev: devFactor * 1.0, wl: '580nm' },
    { name: 'Green', hex: '#22c55e', dev: devFactor * 1.08, wl: '530nm' },
    { name: 'Blue', hex: '#06b6d4', dev: devFactor * 1.18, wl: '470nm' },
    { name: 'Indigo', hex: '#6366f1', dev: devFactor * 1.28, wl: '430nm' },
    { name: 'Violet', hex: '#a855f7', dev: devFactor * 1.4, wl: '400nm' }
  ];

  return (
    <svg viewBox="0 0 420 280" width="100%" height="260" style={{ overflow: 'visible' }} role="img" aria-label="Equilateral Glass Prism Light Dispersion Simulation">
      <defs>
        <linearGradient id="whiteBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Triangular Prism */}
      <polygon 
        points="190,40 120,230 260,230" 
        fill="rgba(99, 102, 241, 0.12)" 
        stroke="rgba(129, 140, 248, 0.7)" 
        strokeWidth="2.5" 
      />
      <text x="190" y="220" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle" fontFamily="monospace">
        Glass Prism (n={refractiveIndex})
      </text>

      {/* Incident White Light Beam */}
      <line 
        x1={startX} 
        y1={startY} 
        x2={hitX} 
        y2={hitY} 
        stroke="url(#whiteBeam)" 
        strokeWidth="3.5" 
        filter="url(#glow)"
      />
      <text x={startX} y={startY - 8} fill="#ffffff" fontSize="10" fontWeight="bold">
        White Light Ray
      </text>

      {/* Dispersed Rays inside and exiting */}
      {colors.map((c, i) => {
        const exitX = 225;
        const exitY = 160 + i * 4;
        const screenX = 380;
        const screenY = 90 + i * 22 + (angle - 45) * 0.8 + (c.dev * 0.4);

        return (
          <g key={c.name}>
            <line x1={hitX} y1={hitY} x2={exitX} y2={exitY} stroke={c.hex} strokeWidth="1.6" opacity="0.85" />
            <line x1={exitX} y1={exitY} x2={screenX} y2={screenY} stroke={c.hex} strokeWidth="2" filter="url(#glow)" />
            <circle cx={screenX} cy={screenY} r="3" fill={c.hex} />
            <text x={screenX + 8} y={screenY + 4} fill={c.hex} fontSize="9" fontWeight="600" fontFamily="monospace">
              {c.name} ({c.wl})
            </text>
          </g>
        );
      })}

      {/* Virtual Projection Screen */}
      <line x1="375" y1="70" x2="375" y2="250" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="4 2" />
      <text x="375" y="60" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">
        Spectral Screen
      </text>
    </svg>
  );
}

// -------------------------------------------------------------
// Interactive SVG 2: Friction & Newton's Law
// -------------------------------------------------------------
function FrictionSVG({ surface, ballX = 120, isRolling = false }) {
  const frictionMap = {
    grass: { mu: 0.6, label: 'Lush Grass Outfield', stopDist: '12m', color: '#10b981' },
    concrete: { mu: 0.3, label: 'Concrete Road', stopDist: '28m', color: '#64748b' },
    ice: { mu: 0.05, label: 'Polished Marble Floor', stopDist: '85m', color: '#06b6d4' }
  };

  const current = frictionMap[surface] || frictionMap.grass;

  return (
    <svg viewBox="0 0 420 260" width="100%" height="240" role="img" aria-label="Microscopic Surface Friction and Ball Deceleration Simulation">
      <defs>
        <linearGradient id="ballGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>

      {/* Surface Base */}
      <rect x="20" y="180" width="380" height="25" fill={current.color} opacity="0.3" rx="4" />
      <line x1="20" y1="180" x2="400" y2="180" stroke={current.color} strokeWidth="3" />

      {/* Cricket Ball with dynamic X position */}
      <g transform={`translate(${ballX - 120}, 0)`}>
        <circle cx="120" cy="155" r="25" fill="url(#ballGrad)" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M 100 155 Q 120 135 140 155" stroke="#ffffff" strokeWidth="2" fill="none" strokeDasharray="3 2" />

        {/* Vectors */}
        {isRolling && (
          <>
            <line x1="120" y1="155" x2="190" y2="155" stroke="#38bdf8" strokeWidth="2.5" />
            <polygon points="190,151 198,155 190,159" fill="#38bdf8" />
            <text x="135" y="145" fill="#38bdf8" fontSize="10" fontWeight="bold">v &gt; 0</text>
          </>
        )}

        {/* Opposing Friction Force */}
        <line x1="120" y1="178" x2="60" y2="178" stroke="#f43f5e" strokeWidth="2.5" />
        <polygon points="60,174 52,178 60,182" fill="#f43f5e" />
        <text x="50" y="196" fill="#f43f5e" fontSize="9" fontWeight="bold">f = μ·N</text>
      </g>

      {/* Data Card */}
      <rect x="250" y="25" width="150" height="75" rx="8" fill="rgba(15,23,42,0.9)" stroke="var(--border-subtle)" />
      <text x="260" y="45" fill="var(--text-secondary)" fontSize="10">Surface: {current.label}</text>
      <text x="260" y="65" fill="var(--accent-saffron-light)" fontSize="11" fontWeight="bold">Friction (μ): {current.mu}</text>
      <text x="260" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold">Stopping Dist: ~{current.stopDist}</text>
    </svg>
  );
}

// -------------------------------------------------------------
// Interactive SVG 3: Photosynthesis Leaf Factory
// -------------------------------------------------------------
function PhotosynthesisSVG({ stomataOpen, sunlight = 80 }) {
  const sunColor = sunlight > 40 ? '#f59e0b' : '#64748b';

  return (
    <svg viewBox="0 0 420 260" width="100%" height="240" role="img" aria-label="Photosynthesis Leaf Stomata Gas Exchange Simulation">
      {/* Sun */}
      <circle cx="60" cy="50" r="26" fill={sunColor} filter={sunlight > 40 ? "drop-shadow(0 0 15px #f59e0b)" : "none"} />
      <line x1="60" y1="15" x2="60" y2="5" stroke={sunColor} strokeWidth="3" />
      <line x1="95" y1="50" x2="105" y2="50" stroke={sunColor} strokeWidth="3" />

      {/* Sunlight Ray to Leaf */}
      {sunlight > 20 && (
        <>
          <line x1="85" y1="65" x2="180" y2="110" stroke="#fbbf24" strokeWidth={sunlight > 60 ? 3 : 1.5} strokeDasharray="5 3" />
          <text x="110" y="80" fill="#fbbf24" fontSize="10" fontWeight="bold">Solar Photons ({sunlight}%)</text>
        </>
      )}

      {/* Plant Leaf Cross-Section */}
      <path d="M 140 170 Q 240 70 360 140 Q 250 230 140 170 Z" fill={sunlight > 20 ? "#15803d" : "#0f391b"} stroke="#22c55e" strokeWidth="2.5" />
      <path d="M 140 170 Q 250 145 355 140" stroke="#86efac" strokeWidth="2" fill="none" />

      {/* Chloroplasts */}
      <circle cx="220" cy="130" r="7" fill="#4ade80" />
      <circle cx="250" cy="120" r="8" fill="#4ade80" />
      <circle cx="280" cy="135" r="7" fill="#4ade80" />

      {/* Gas Arrows */}
      <text x="140" y="115" fill="#38bdf8" fontSize="10" fontWeight="bold">6 CO₂ (Air)</text>
      <text x="120" y="210" fill="#06b6d4" fontSize="10" fontWeight="bold">6 H₂O (Roots)</text>
      <text x="320" y="105" fill="#facc15" fontSize="10" fontWeight="bold">C₆H₁₂O₆ (Glucose)</text>
      <text x="320" y="195" fill="#4ade80" fontSize="10" fontWeight="bold">6 O₂ (Oxygen!)</text>

      {/* Stomata status */}
      <rect x="20" y="200" width="140" height="35" rx="6" fill="rgba(15,23,42,0.9)" stroke="var(--border-subtle)" />
      <text x="28" y="222" fill={stomataOpen ? "#34d399" : "#f43f5e"} fontSize="10" fontWeight="bold">
        Stomata: {stomataOpen ? "OPEN (Active)" : "CLOSED (Night)"}
      </text>
    </svg>
  );
}

// -------------------------------------------------------------
// Interactive SVG 4: Fractions Sharing (Rotis)
// -------------------------------------------------------------
function FractionsSVG({ totalItems = 3, totalPeople = 4 }) {
  const safeItems = Math.max(1, Math.min(4, Number(totalItems) || 3));
  const safePeople = Math.max(2, Math.min(6, Number(totalPeople) || 4));
  const rotis = Array.from({ length: safeItems });
  const friends = Array.from({ length: safePeople });

  return (
    <svg viewBox="0 0 420 240" width="100%" height="220" role="img" aria-label="Fractions and Food Sharing Visual Math Simulation">
      <defs>
        <linearGradient id="rotiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* Rotis drawn dynamically */}
      {rotis.map((_, idx) => {
        const cx = 50 + idx * 75;
        return (
          <g key={idx}>
            <circle cx={cx} cy="75" r="28" fill="url(#rotiGrad)" stroke="#fde68a" strokeWidth="2" />
            <line x1={cx - 28} y1="75" x2={cx + 28} y2="75" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1={cx} y1="47" x2={cx} y2="103" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x={cx} y="79" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              Roti #{idx + 1}
            </text>
          </g>
        );
      })}

      {/* Dividing arrow */}
      <text x="360" y="75" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
        ÷ {totalPeople}
      </text>

      {/* Friends Avatars distributed dynamically */}
      {friends.map((_, i) => {
        const step = 360 / (totalPeople + 1);
        const x = 30 + (i + 1) * step;
        return (
          <g key={i}>
            <circle cx={x} cy="170" r="16" fill="var(--bg-tertiary)" stroke="var(--accent-indigo)" strokeWidth="1.5" />
            <text x={x} y="174" fill="#ffffff" fontSize="11" textAnchor="middle">👤</text>
            <text x={x} y="200" fill="var(--accent-saffron-light)" fontSize="9" fontWeight="bold" textAnchor="middle">
              {totalItems}/{totalPeople}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
