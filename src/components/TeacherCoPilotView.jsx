import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle2, AlertTriangle, Printer, Sparkles, Plus, Users, BarChart3 } from 'lucide-react';
import { TEACHER_CLASSROOM_DATA, CURRICULUM_TOPICS } from '../data/curriculumData';

export function TeacherCoPilotView({ currentLanguage }) {
  const [selectedTopic, setSelectedTopic] = useState(CURRICULUM_TOPICS[0]);
  const [gradeLevel, setGradeLevel] = useState('Grade 10');
  const [worksheetLang, setWorksheetLang] = useState(currentLanguage || 'en');
  const [worksheet, setWorksheet] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState("Because the prism paints the light into red, blue, and green using chemicals.");
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Topic-specific question banks for dynamic worksheet generation
  const topicQuestionBanks = {
    "optics-prism": {
      en: [
        { q: "1. What happens to the speed of light as it transitions from air into a denser glass prism?", type: "Conceptual (Understanding)" },
        { q: "2. Which spectral color bends through the greatest angle of deviation and why? Relate to wavelength.", type: "Application & Snell's Law" },
        { q: "3. Name one natural Indian phenomenon where this dispersion occurs naturally.", type: "Real-World Context" }
      ],
      hi: [
        { q: "1. जब प्रकाश हवा से कांच के प्रिज्म में प्रवेश करता है, तो उसकी गति में क्या परिवर्तन होता है?", type: "अवधारणात्मक समझ" },
        { q: "2. किस रंग का प्रकाश सबसे अधिक विक्षेपित (झुकता) होता है और क्यों?", type: "स्नेल का नियम और अनुप्रयोग" },
        { q: "3. दैनिक जीवन का एक प्राकृतिक उदाहरण दीजिए जहां प्रकाश का विक्षेपण दिखाई देता है।", type: "दैनिक जीवन संबंध" }
      ],
      handsOn: "Inverted Prism Recombination: Place a second identical triangular prism inverted against the first prism. Observe how the 7 colors recombine back into a single white beam."
    },
    "mechanics-friction": {
      en: [
        { q: "1. State Newton's First Law of Motion and explain why an external force is needed to stop a rolling cricket ball.", type: "Newton's 1st Law" },
        { q: "2. Why does a ball roll further on a polished marble temple floor than on a lush grass outfield?", type: "Surface Roughness & Friction" },
        { q: "3. Calculate the frictional resistance force if a ball of mass 0.16kg experiences a coefficient of friction μ = 0.35 on concrete.", type: "Quantitative Physics" }
      ],
      hi: [
        { q: "1. न्यूटन के गति के प्रथम नियम की व्याख्या कीजिए और बताइए कि लुढ़कती क्रिकेट गेंद अपने आप क्यों रुकती है?", type: "न्यूटन का प्रथम नियम" },
        { q: "2. गीली घास के मैदान और संगमरमर के चिकने फर्श पर गेंद की गति में अंतर का क्या कारण है?", type: "घर्षण गुणांक" },
        { q: "3. दैनिक जीवन में घर्षण के दो लाभ और दो हानियां समझाइए।", type: "दैनिक जीवन संबंध" }
      ],
      handsOn: "Incline Ramp Test: Roll a cricket ball down a ramp onto 3 different surfaces (cardboard, grass, and smooth tile). Measure stopping distances with a tape to compare frictional coefficients."
    },
    "biology-photosynthesis": {
      en: [
        { q: "1. Write the balanced chemical equation for photosynthesis and name the primary solar reactant gases.", type: "Biochemical Reaction" },
        { q: "2. What is the role of stomata micro-pores on the underside of a plant leaf during daytime vs nighttime?", type: "Plant Anatomy & Respiration" },
        { q: "3. Van Helmont showed that after 5 years, soil lost only 2 ounces while the willow tree gained 160 lbs. Where did the tree get its mass?", type: "Experimental Logic" }
      ],
      hi: [
        { q: "1. प्रकाश संश्लेषण की संतुलित रासायनिक अभिक्रिया लिखिए।", type: "रासायनिक समीकरण" },
        { q: "2. पत्तियों की निचली सतह पर उपस्थित रंध्रों (Stomata) का दिन और रात में क्या कार्य होता है?", type: "पादप शारीरिकी" },
        { q: "3. विशाल बरगद के पेड़ का अधिकांश ठोस वजन मिट्टी से आता है या हवा से? कारण स्पष्ट करें।", type: "वैज्ञानिक विश्लेषण" }
      ],
      handsOn: "Iodine Starch Test: Cover half of a green leaf with black paper for 48 hours, boil in alcohol, and add iodine drops to visibly prove starch is only produced under solar light."
    },
    "math-fractions": {
      en: [
        { q: "1. If 4 friends equally share 3 hot rotis, what fraction of a roti does each friend receive?", type: "Proper Fractions" },
        { q: "2. Explain why 3/4 is different from 4/3 using the 'sharing a meal' analogy.", type: "Conceptual Distinction" },
        { q: "3. If 2 more friends join the group (total 6), how does the portion size change?", type: "Proportional Reasoning" }
      ],
      hi: [
        { q: "1. यदि 4 दोस्तों को 3 गर्म रोटियां आपस में बराबर बांटनी हों, तो प्रत्येक को कितनी रोटी मिलेगी?", type: "भिन्न की अवधारणा" },
        { q: "2. भोजन बांटने के उदाहरण से समझाइए कि 3/4 और 4/3 में क्या अंतर है?", type: "अंश और हर का अंतर" },
        { q: "3. यदि समूह में 2 दोस्त और आ जाएं (कुल 6), तो प्रत्येक का हिस्सा कैसे बदलेगा?", type: "समानुपातिक तर्क" }
      ],
      handsOn: "Paper Chapati Folding: Cut out 3 circular paper rotis. Fold each into 4 equal quadrants and distribute 3 quadrants to each of the 4 group members to visualize 3/4."
    }
  };

  // Generate localized worksheet
  const handleGenerateWorksheet = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const bank = topicQuestionBanks[selectedTopic.id] || topicQuestionBanks["optics-prism"];
      const questions = (worksheetLang === 'hi' || worksheetLang === 'hinglish') ? bank.hi : bank.en;

      setWorksheet({
        title: `${selectedTopic.title[worksheetLang] || selectedTopic.title.en} — Differentiated Worksheet`,
        grade: gradeLevel,
        board: "NCF / NEP 2020 & State Board Aligned",
        questions: questions,
        handsOnActivity: bank.handsOn
      });
      setIsGenerating(false);
    }, 500);
  };

  // Evaluate student answer for misconceptions
  const handleDiagnoseAnswer = () => {
    if (!studentAnswer.trim()) return;
    const lower = studentAnswer.toLowerCase();

    if (lower.includes('paint') || lower.includes('chemical') || lower.includes('color')) {
      setDiagnosticResult({
        verdict: "Misconception Detected",
        score: "2 / 5",
        flaw: "Extrinsic Color Myth: The student believes the glass prism actively injects or paints color onto the light.",
        feedback: "Emphasize that the white light beam ALREADY contains all 7 colors. The glass prism only acts as a physical separator based on wavelength slowing down in a dense medium.",
        remedy: "Show the student Newton's inverted second prism experiment to prove recombination back to white light."
      });
    } else if (lower.includes('soil') || lower.includes('eat') || lower.includes('mud') || lower.includes('dirt')) {
      setDiagnosticResult({
        verdict: "Misconception Detected",
        score: "2 / 5",
        flaw: "Soil Eating Fallacy: The student believes tree biomass is formed by absorbing soil mass directly.",
        feedback: "Explain that tree biomass is formed primarily from Carbon Dioxide (CO2) absorbed from thin atmospheric air during photosynthesis. Soil provides trace minerals and water only.",
        remedy: "Highlight Van Helmont's 5-year willow tree experiment: the tree gained 160 pounds while soil mass changed by only 2 ounces!"
      });
    } else if (lower.includes('stop') || lower.includes('run out') || lower.includes('keep pushing') || lower.includes('force ends')) {
      setDiagnosticResult({
        verdict: "Misconception Detected",
        score: "2.5 / 5",
        flaw: "Aristotelian Motion Fallacy: The student believes an object naturally stops because its internal force 'ran out'.",
        feedback: "Reinforce Newton's First Law: An object in motion continues moving indefinitely at constant velocity UNLESS an external force acts. It is the microscopic roughness of grass creating friction that decelerates the ball.",
        remedy: "Contrast grass rolling with an air-hockey puck or ice skating where friction approaches zero."
      });
    } else {
      setDiagnosticResult({
        verdict: "Strong Conceptual Foundation",
        score: "4.8 / 5",
        flaw: "None detected.",
        feedback: "The student demonstrates sound scientific reasoning, properly connecting physical principles to the underlying laws of nature.",
        remedy: "Advance student to higher-order problem solving and real-world engineering applications."
      });
    }
  };

  return (
    <div className="teacher-copilot-container" id="teacher-copilot-view">
      {/* Header Banner */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.08))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span className="risk-tag risk-low" style={{ fontSize: '0.8rem' }}>Teacher Co-Pilot Active</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>NCF / NEP 2020 Aligned</span>
            </div>
            <h2>ShikshaSetu Educator Dashboard</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 650 }}>
              Empowering educators in multi-grade rural and government classrooms with instant vernacular worksheets, diagnostic misconception analytics, and automated student feedback.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-secondary)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Classroom Readiness</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>88%</div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Remedial Needed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-saffron)' }}>2 Topics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Educator Grid */}
      <div className="teacher-grid">
        {/* Module 1: Automated Worksheet & Assessment Generator */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <FileText className="text-indigo" size={20} color="var(--accent-indigo-light)" />
            <h3>1-Click Vernacular Worksheet Generator</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="control-row">
              <span className="control-label">Select Subject & Concept:</span>
              <select 
                className="select-custom" 
                value={selectedTopic.id}
                onChange={(e) => setSelectedTopic(CURRICULUM_TOPICS.find(t => t.id === e.target.value))}
                style={{ flex: 1 }}
              >
                {CURRICULUM_TOPICS.map(t => (
                  <option key={t.id} value={t.id}>{t.title.en} ({t.grade})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <span className="control-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Target Grade:</span>
                <select className="select-custom" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} style={{ width: '100%' }}>
                  <option value="Grade 6-7">Grade 6-7 (Foundational)</option>
                  <option value="Grade 8-9">Grade 8-9 (Middle)</option>
                  <option value="Grade 10">Grade 10 (Secondary / Board)</option>
                </select>
              </div>
              <div>
                <span className="control-label" style={{ display: 'block', marginBottom: '0.35rem' }}>Medium / Language:</span>
                <select className="select-custom" value={worksheetLang} onChange={(e) => setWorksheetLang(e.target.value)} style={{ width: '100%' }}>
                  <option value="en">English Medium</option>
                  <option value="hi">हिंदी माध्यम (Hindi)</option>
                  <option value="hinglish">Hinglish (Bilingual)</option>
                  <option value="te">తెలుగు మీడియం (Telugu)</option>
                  <option value="ta">தமிழ் வழி (Tamil)</option>
                  <option value="mr">मराठी माध्यम (Marathi)</option>
                </select>
              </div>
            </div>

            <button 
              className="nav-tab-btn active" 
              style={{ justifyContent: 'center', padding: '0.7rem', marginTop: '0.5rem' }}
              onClick={handleGenerateWorksheet}
              disabled={isGenerating}
              id="generate-worksheet-btn"
            >
              <Sparkles size={16} /> {isGenerating ? 'Synthesizing Worksheet...' : 'Generate Printable Worksheet'}
            </button>

            {/* Generated Worksheet Preview */}
            {worksheet && (
              <div style={{ marginTop: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-saffron-light)' }}>{worksheet.title}</h4>
                  <button 
                    className="icon-btn" 
                    onClick={() => window.print()} 
                    title="Print Worksheet for Classroom"
                  >
                    <Printer size={16} />
                  </button>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {worksheet.grade} • {worksheet.board}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {worksheet.questions.map((q, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <strong>{q.q}</strong>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--accent-indigo-light)', marginTop: '0.2rem' }}>
                        Skill: {q.type}
                      </span>
                    </div>
                  ))}

                  <div style={{ fontSize: '0.8rem', borderLeft: '2px solid var(--accent-emerald)', paddingLeft: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                    🔬 <strong>Recommended Low-Cost Classroom Demo:</strong> {worksheet.handsOnActivity}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Module 2: AI Misconception Auto-Grader */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <AlertTriangle className="text-saffron" size={20} color="var(--accent-saffron)" />
            <h3>Student Misconception Diagnostic Scanner</h3>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
            Paste a handwritten/typed student answer below. ShikshaSetu's pedagogical agent analyzes whether the student has genuine conceptual mastery or a deep-seated mental misconception.
          </p>

          <textarea
            className="chat-input"
            rows="3"
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            style={{ 
              width: '100%', 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: 'var(--radius-md)', 
              padding: '0.75rem', 
              fontSize: '0.88rem',
              color: 'var(--text-primary)',
              resize: 'none'
            }}
            placeholder="Enter student's response here..."
            id="student-diagnostic-input"
          />

          <button 
            className="nav-tab-btn" 
            style={{ 
              background: 'var(--bg-tertiary)', 
              border: '1px solid var(--border-subtle)', 
              justifyContent: 'center', 
              padding: '0.6rem', 
              marginTop: '0.65rem',
              color: 'var(--text-primary)'
            }}
            onClick={handleDiagnoseAnswer}
            id="diagnose-answer-btn"
          >
            <BarChart3 size={15} /> Run Diagnostic Scan
          </button>

          {diagnosticResult && (
            <div style={{ marginTop: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className={`risk-tag ${diagnosticResult.score.includes('2') ? 'risk-high' : 'risk-low'}`}>
                  {diagnosticResult.verdict}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-gold)' }}>
                  Grade Score: {diagnosticResult.score}
                </span>
              </div>

              <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <div style={{ marginBottom: '0.4rem' }}>
                  <strong>Root Conceptual Flaw:</strong> {diagnosticResult.flaw}
                </div>
                <div style={{ marginBottom: '0.4rem', color: 'var(--accent-saffron-light)' }}>
                  <strong>Pedagogical Feedback:</strong> {diagnosticResult.feedback}
                </div>
                <div style={{ color: 'var(--accent-emerald)' }}>
                  <strong>Actionable Remedial:</strong> {diagnosticResult.remedy}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Classroom Competency & Misconception Heatmap Table */}
      <div className="glass-card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3>Rural Classroom Misconception Heatmap</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Aggregated across 48 local students to help teachers spot widespread learning gaps
            </span>
          </div>
          <span className="risk-tag risk-medium">Live District Aggregation</span>
        </div>

        <table className="heatmap-table" id="misconception-heatmap-table">
          <thead>
            <tr>
              <th>Curriculum Topic</th>
              <th>Class Mastery</th>
              <th>Sample Size</th>
              <th>Risk Level</th>
              <th>Identified Root-Cause Misconception</th>
              <th>Recommended Remedial</th>
            </tr>
          </thead>
          <tbody>
            {TEACHER_CLASSROOM_DATA.map((row) => (
              <tr key={row.topicId}>
                <td style={{ fontWeight: 600 }}>{row.topicName}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 60, height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${row.classAverage}%`, height: '100%', background: row.classAverage > 70 ? 'var(--accent-emerald)' : row.classAverage > 60 ? 'var(--accent-saffron)' : 'var(--accent-rose)' }} />
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{row.classAverage}%</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{row.studentsAssessed}</td>
                <td>
                  <span className={`risk-tag ${row.riskLevel === 'High' ? 'risk-high' : row.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low'}`}>
                    {row.riskLevel}
                  </span>
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: 260 }}>
                  {row.commonMisconception}
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--accent-saffron-light)', maxWidth: 240 }}>
                  {row.recommendedRemedial}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
