# 🎓 ShikshaSetu AI (शिक्षासेतु)
### *The Vernacular Multi-Agent Education Bridge for Universal Quality Learning*

[![AI for Education](https://img.shields.io/badge/Domain-AI%20for%20Education-blue.svg)](https://un.org/sustainabledevelopment/education/)
[![UN SDG 4](https://img.shields.io/badge/UN%20SDG-4%20Quality%20Education-green.svg)](https://sdgs.un.org/goals/goal4)
[![Framework](https://img.shields.io/badge/Framework-Google%20Antigravity%20SDK-orange.svg)](https://github.com/google-antigravity/antigravity-sdk-python)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Executive Summary
Over 70% of students in rural and vernacular-medium schools in India and developing nations face a silent comprehension barrier: textbooks are standardized in formal English or high academic language, while students think and communicate in their regional mother tongues. Furthermore, in government classrooms with a 1:60 teacher-to-student ratio, personalized Socratic attention is impossible.

**ShikshaSetu AI** solves this through a **Decoupled Multi-Agent Cognitive Architecture** powered by **Google Antigravity**:
1. **Socratic Guru Agent**: Leads students through guided inquiry rather than spoon-feeding raw solutions.
2. **Vernacular & Cultural Bridge Agent**: Code-switches across Hindi, Hinglish, Telugu, Tamil, and Marathi, anchoring abstract formulas in everyday Indian life (spinning *lattu*, cricket ball on grass, sharing rotis in a thali).
3. **Interactive Visual Mental Model**: Real-time manipulable SVG canvas simulations (Optics prism dispersion, Newton's friction, photosynthesis leaf reactor).
4. **Educator Co-Pilot**: 1-click NEP 2020-aligned bilingual worksheet generator, student misconception diagnostic scanner, and classroom risk heatmaps.
5. **Neuro-Inclusive Suite**: High-legibility dyslexia mode, speech-to-text, and voice narration.
6. **2G Rural Ready**: Offline local caching and <1.5 KB compressed payloads for low-bandwidth village schools.

---

## 🏛️ System Architecture

```
                                  ┌────────────────────────┐
                                  │   Student or Teacher   │
                                  └───────────┬────────────┘
                                              │ (Voice / Text)
                                              ▼
                        ┌──────────────────────────────────────────────┐
                        │   ShikshaSupervisor (Google Antigravity)     │
                        └───────┬──────────────┬──────────────┬────────┘
                                │              │              │
        ┌───────────────────────┴────┐   ┌─────┴───────┐   ┌──┴─────────────────────────┐
        │     SocraticGuruAgent      │   │ Vernacular  │   │  VisualSynthesisAgent      │
        │ - Inquiry Scaffolding      │   │ Bridge      │   │ - Dynamic SVG Coordinates  │
        │ - Misconception Prevention │   │ - Hindi/Eng │   │ - Interactive Sliders      │
        │ - Hint Ladder Generation   │   │ - Analogies │   │ - Real-time Ray Tracing    │
        └───────────────┬────────────┘   └─────┬───────┘   └──┬─────────────────────────┘
                        │                      │              │
                        └──────────────────────┼──────────────┘
                                               │
                                               ▼
                              ┌──────────────────────────────────┐
                              │  Reactive Glass-Box UI / Canvas   │
                              │  + Voice Speech Narration        │
                              └──────────────────────────────────┘
```

---

## 🚀 Key Features

| Feature | Description | Social Impact |
| :--- | :--- | :--- |
| **Socratic Mentorship** | Guided discovery ladder: *"Give me a hint"*, *"Explain like I'm 10"*, *"Show local analogy"*, *"Quiz me"* | Eliminates rote memorization traps |
| **Vernacular Bridging** | Multi-lingual support (Hindi, Hinglish, Telugu, Tamil, Marathi) with cultural anchors | Destroys the English medium comprehension barrier |
| **Interactive Canvas** | Dynamic SVG simulations with angle and refractive index sliders | Builds lasting visual intuition |
| **Educator Co-Pilot** | 1-Click differentiated worksheet generation & student misconception diagnostic scanner | Saves teachers 10+ hours/week in multi-grade classrooms |
| **Glass-Box AI Inspector** | Real-time trace showing agent thoughts, tool executions, and subagent handoffs | 100% transparent, explainable AI |
| **Dyslexia & Accessibility** | OpenDyslexic typography mode, high-contrast, speech-to-text & TTS narration | Complete neuro-inclusion |
| **Rural 2G Mode** | Payload compressed to <1.5 KB with full offline local caching | Operates in remote villages with zero broadband |

---

## 🛠️ Technology Stack

- **Frontend Application**: React 18, Vite 5, Lucide Icons, Canvas Confetti
- **Design System**: Bespoke Cyber-Vedic Vanilla CSS with Dark/Light glassmorphism, responsive mobile-first layout
- **Agent Orchestration**: Google Antigravity SDK (`google-antigravity`), Gemini Models (2.0 / 1.5 Flash)
- **Backend API**: Python 3.13, FastAPI, Server-Sent Events (SSE) streaming
- **Accessibility & Voice**: Web Speech API (SpeechSynthesis & SpeechRecognition)

---

## ⚡ Quickstart & Running Locally

### 1. Frontend Web App
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### 2. Python Antigravity Backend (Optional)
```bash
# Navigate to backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt

# Launch FastAPI Server
python main.py
```
Backend runs at `http://localhost:8000`.

---

## 🏆 Hackathon Winning Kit
Detailed presentation scripts, judge Q&A defense battlecards, and 7-slide presentation outlines are included in:
👉 [`docs/HACKATHON_PITCH.md`](docs/HACKATHON_PITCH.md)

---

## 📜 License
Licensed under the [MIT License](LICENSE). Built with ❤️ for educational equity and UN SDG 4.