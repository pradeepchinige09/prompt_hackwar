import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, Mic, MicOff, Sparkles, HelpCircle, Lightbulb, Compass, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_TOPICS } from '../data/curriculumData';
import { agentOrchestrator } from '../services/agentOrchestrator';
import { learningEngine } from '../services/learningEngine';
import { VisualConceptCanvas } from './VisualConceptCanvas';

export function StudentTutorView({ currentLanguage, onOpenTrace, externalTopic, onTopicChange }) {
  const [selectedTopic, setSelectedTopic] = useState(externalTopic || CURRICULUM_TOPICS[0]);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeThought, setActiveThought] = useState(null);
  const [activeSubagent, setActiveSubagent] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceNotification, setVoiceNotification] = useState(null);
  const [simParams, setSimParams] = useState((externalTopic || CURRICULUM_TOPICS[0]).simulationParams);

  const messagesEndRef = useRef(null);

  // Sync external topic when navigated from Roadmap or Quiz
  useEffect(() => {
    if (externalTopic && externalTopic.id !== selectedTopic.id) {
      setSelectedTopic(externalTopic);
    }
  }, [externalTopic]);

  // Localized greetings
  const greetings = {
    en: "Welcome! 🌟 Let's explore",
    hi: "नमस्ते और हार्दिक स्वागत है! 🌟 आइए मिलकर समझें",
    hinglish: "Namaste & Welcome! 🌟 Chaliye milkar explore karte hain",
    te: "నమస్కారం & స్వాగతం! 🌟 రండి కలిసి అర్థం చేసుకుందాం",
    ta: "வணக்கம் மற்றும் நல்வரவு! 🌟 வாருங்கள் ஒன்றாகப் புரிந்து கொள்வோம்",
    mr: "नमस्कार आणि मनःपूर्वक स्वागत आहे! 🌟 चला एकत्र समजून घेऊया"
  };

  // Initialize or change topic
  useEffect(() => {
    agentOrchestrator.setTopic(selectedTopic.id);
    agentOrchestrator.setLanguage(currentLanguage);
    setSimParams(selectedTopic.simulationParams);

    const initQuestion = selectedTopic.initialQuestion[currentLanguage] || selectedTopic.initialQuestion.en;
    const greetingText = greetings[currentLanguage] || greetings.en;

    setMessages([
      {
        id: 'init-1',
        sender: 'tutor',
        text: `${greetingText} **${selectedTopic.title[currentLanguage] || selectedTopic.title.en}**.\n\n${initQuestion}`,
        culturalNote: selectedTopic.culturalAnalogy[currentLanguage] || selectedTopic.culturalAnalogy.en
      }
    ]);
  }, [selectedTopic, currentLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeThought]);

  const handleSend = async (e, hintType = null) => {
    if (e) e.preventDefault();
    let query = inputVal.trim();
    let displayText = query;

    if (hintType) {
      if (hintType === 'hint') displayText = "💡 Could you give me a Socratic hint?";
      else if (hintType === 'eli10') displayText = "🎈 Can you explain this like I'm 10 years old?";
      else if (hintType === 'analogy') displayText = "🪔 Show me an everyday Indian cultural analogy.";
      else if (hintType === 'quiz') displayText = "🎯 Test my understanding with a quick knowledge check!";
      query = `[Hint Request: ${hintType}]`;
    }

    if (!query && !hintType) return;

    // Check if user answered quiz with B/White -> fire confetti
    const lower = displayText.toLowerCase();
    if (lower === 'b' || lower.includes('white') || lower.includes('option b') || lower.includes('recombine')) {
      confetti({ particleCount: 50, spread: 75, origin: { y: 0.65 } });
    }

    // Display student message
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: displayText }]);
    setInputVal('');

    // Award interaction XP & check badges
    learningEngine.recordTutorInteraction({
      topicId: selectedTopic.id,
      type: hintType === 'hint' ? 'hint' : 'inquiry'
    });

    setIsGenerating(true);
    setActiveThought('Delegating to Antigravity Socratic Agent...');

    try {
      const generator = agentOrchestrator.processUserMessage(query, hintType);
      let tutorMsgId = Date.now() + 1;
      let finalContent = "";
      let culturalNote = "";

      for await (const event of generator) {
        if (event.type === 'subagent_dispatch') {
          setActiveSubagent(event.agent);
        } else if (event.type === 'thought') {
          setActiveThought(event.thought);
        } else if (event.type === 'simulation_update') {
          setSimParams(event.params);
        } else if (event.type === 'token_delta') {
          finalContent = event.fullText;
          setMessages(prev => {
            const filtered = prev.filter(m => m.id !== tutorMsgId);
            return [...filtered, {
              id: tutorMsgId,
              sender: 'tutor',
              text: finalContent
            }];
          });
        } else if (event.type === 'done') {
          finalContent = event.fullText;
          culturalNote = event.culturalNote;
          if (hintType === 'quiz') {
            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
          }
        }
      }

      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== tutorMsgId);
        return [...filtered, {
          id: tutorMsgId,
          sender: 'tutor',
          text: finalContent,
          culturalNote
        }];
      });
    } catch (err) {
      console.error("Agent error:", err);
    } finally {
      setIsGenerating(false);
      setActiveThought(null);
      setActiveSubagent(null);
    }
  };

  // Voice Speech Recognition with graceful non-blocking fallback
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRecognition) {
      setVoiceNotification("Speech recognition is not supported in this browser environment. Please type your query below.");
      setTimeout(() => setVoiceNotification(null), 4000);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'te' ? 'te-IN' : currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'mr' ? 'mr-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotification(null);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event) => {
        setIsListening(false);
        if (event && event.error === 'not-allowed') {
          setVoiceNotification("Microphone access was denied. You can continue typing below.");
        } else {
          setVoiceNotification("Microphone input stopped. You can type below.");
        }
        setTimeout(() => setVoiceNotification(null), 4000);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(transcript);
        setVoiceNotification(null);
      };

      recognition.start();
    } catch (e) {
      console.warn("Speech recognition notice:", e.message);
      setIsListening(false);
      setVoiceNotification("Voice input is currently unavailable. Please type your question.");
      setTimeout(() => setVoiceNotification(null), 4000);
    }
  };

  return (
    <div className="student-tutor-container">
      {/* Quick Topic Switcher Bar */}
      <div className="topic-quick-pills" id="topic-selector-pills">
        {CURRICULUM_TOPICS.map(topic => (
          <button
            key={topic.id}
            className={`topic-pill ${selectedTopic.id === topic.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedTopic(topic);
              if (onTopicChange) onTopicChange(topic);
            }}
          >
            <span>{topic.subject === 'Physics' ? '⚡' : topic.subject === 'Biology' ? '🌿' : '📐'}</span>
            <span>{topic.title[currentLanguage] || topic.title.en}</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>({topic.grade})</span>
          </button>
        ))}
      </div>

      {/* Main Two-Column Grid: Tutor on Left, Interactive Simulation on Right */}
      <div className="tutor-layout-grid">
        {/* Left Column: Socratic Chat */}
        <div className="glass-card chat-container">
          <div className="chat-header">
            <div className="tutor-persona">
              <div className="tutor-avatar">
                🎓
              </div>
              <div className="persona-info">
                <h3>ShikshaGuru (शिक्षागुरु)</h3>
                <span>Socratic AI Mentor • {selectedTopic.subject}</span>
              </div>
            </div>

            <button 
              className="agent-status-pill" 
              onClick={onOpenTrace}
              title="Click to view full Google Antigravity Agent Decision Loop"
            >
              <div className="pulse-dot" />
              <span>{activeSubagent || 'Antigravity Multi-Agent Active'}</span>
            </button>
          </div>

          {/* Chat Messages Log */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                <div className="message-bubble">
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>

                  {msg.sender === 'tutor' && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        className="message-audio-btn"
                        onClick={() => agentOrchestrator.speakText(msg.text, currentLanguage)}
                        title="Listen to Vernacular Audio"
                      >
                        <Volume2 size={13} /> Listen in {currentLanguage.toUpperCase()}
                      </button>
                    </div>
                  )}

                  {/* Socratic Ladder Prompt Chips attached to latest tutor message */}
                  {msg.sender === 'tutor' && !isGenerating && (
                    <div className="hint-ladder">
                      <button className="hint-chip" onClick={() => handleSend(null, 'hint')}>
                        <Lightbulb size={12} /> Give me a hint
                      </button>
                      <button className="hint-chip" onClick={() => handleSend(null, 'eli10')}>
                        <HelpCircle size={12} /> Explain like I'm 10
                      </button>
                      <button className="hint-chip" onClick={() => handleSend(null, 'analogy')}>
                        <Compass size={12} /> Local Indian Analogy
                      </button>
                      <button className="hint-chip" onClick={() => handleSend(null, 'quiz')}>
                        <Award size={12} /> Test My Understanding
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Live Agent Thought Stream */}
            {activeThought && (
              <div className="thought-stream">
                <div className="thought-header">
                  <Sparkles size={13} />
                  <span>[Antigravity Thought Stream — {activeSubagent || 'Agent'}]</span>
                </div>
                <div>{activeThought}</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Notification Banner */}
          {voiceNotification && (
            <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', color: 'var(--accent-saffron-light)', margin: '0 1rem 0.5rem' }}>
              ℹ️ {voiceNotification}
            </div>
          )}

          {/* Input Bar */}
          <form onSubmit={handleSend} className="chat-input-bar">
            <button
              type="button"
              className={`icon-btn ${isListening ? 'active' : ''}`}
              onClick={toggleSpeechRecognition}
              title={isListening ? "Listening... click to stop" : "Speak question in Vernacular"}
              id="mic-input-btn"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input
              type="text"
              className="chat-input"
              placeholder={`Ask anything about ${selectedTopic.title[currentLanguage] || selectedTopic.title.en} (voice or text)...`}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isGenerating}
              id="student-chat-input"
            />

            <button
              type="submit"
              className="send-btn"
              disabled={isGenerating || !inputVal.trim()}
              id="send-message-btn"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

        {/* Right Column: Interactive Visual Concept Canvas */}
        <VisualConceptCanvas
          topic={selectedTopic}
          currentParams={simParams}
          onParamChange={(newParams) => {
            setSimParams(newParams);
            learningEngine.recordTutorInteraction({
              topicId: selectedTopic.id,
              type: 'simulation'
            });
          }}
        />
      </div>
    </div>
  );
}
