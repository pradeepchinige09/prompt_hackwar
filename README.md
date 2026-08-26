# 🎓 ShikshaSetu AI (शिक्षासेतु)
### *The Vernacular Multi-Agent Education Bridge for Universal Quality Learning*

[![AI for Education](https://img.shields.io/badge/Domain-AI%20for%20Education-blue.svg)](https://un.org/sustainabledevelopment/education/)
[![UN SDG 4](https://img.shields.io/badge/UN%20SDG-4%20Quality%20Education-green.svg)](https://sdgs.un.org/goals/goal4)
[![Framework](https://img.shields.io/badge/Framework-Google%20Antigravity%20SDK-orange.svg)](https://github.com/google-antigravity/antigravity-sdk-python)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Executive Summary & Problem Statement
Over 70% of students in rural and vernacular-medium schools in India and developing nations face a silent comprehension barrier: textbooks are standardized in formal English or high academic language, while students think and communicate in their regional mother tongues. Furthermore, in government classrooms with a 1:60 teacher-to-student ratio, personalized Socratic attention is impossible.

Generic chatbots dump raw formulaic English answers, encouraging rote memorization without building conceptual intuition.

**ShikshaSetu AI (शिक्षासेतु)** solves this through a **Decoupled Multi-Agent Cognitive Architecture** powered by **Google Antigravity**:
1. **Socratic Guru Agent**: Leads students through guided inquiry rather than spoon-feeding raw solutions.
2. **Vernacular & Cultural Bridge Agent**: Code-switches across Hindi, Hinglish, Telugu, Tamil, and Marathi, anchoring abstract formulas in everyday Indian life (spinning *lattu*, cricket ball on grass, sharing rotis in a thali).
3. **Interactive Visual Mental Model**: Real-time manipulable SVG canvas simulations (Optics prism dispersion, Newton's friction, photosynthesis leaf reactor, fractional roti portions).
4. **Educator Co-Pilot**: 1-click NEP 2020-aligned bilingual worksheet generator, student misconception diagnostic scanner, and classroom risk heatmaps.
5. **Neuro-Inclusive Suite**: High-legibility dyslexia mode, speech-to-text, and voice narration.
6. **2G Rural Ready**: Offline local caching and lightweight UI with paused heavy animations for low-connectivity village schools.

---

## 🏛️ System & Multi-Agent Architecture

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

### Google Antigravity SDK Integration
- **`ShikshaSupervisor`**: Manages session state, cognitive difficulty tiers, and coordinates agent handoffs.
- **`SocraticGuruAgent`**: Uses 4-step hint scaffolding (*"Hint"*, *"ELI10"*, *"Analogy"*, *"Quiz Check"*) to prevent spoon-feeding.
- **`VernacularCulturalBridgeAgent`**: Injects localized cultural analogies into 6 Indian languages (`en`, `hi`, `hinglish`, `te`, `ta`, `mr`).
- **`VisualSynthesisAgent`**: Generates and updates real-time interactive SVG mental models synchronized with the dialog.
- **`FastAPI SSE Bridge`**: Streams token and reasoning deltas asynchronously from `backend/agent_system.py` to the frontend with zero-latency autonomous offline fallback.

---

## 🚀 Key Features

| Feature | Description | Social Impact |
| :--- | :--- | :--- |
| **Adaptive Learning Engine** | Deterministic closed-loop evaluation mapping mastery tiers (`Mastered`, `Strong`, `Developing`, `Needs Practice`) | Eliminates one-size-fits-all rote education |
| **Student Progress Analytics** | Live dashboard tracking conceptual mastery across all 4 topics, accuracy rates, and identified gaps | Empowers students with transparent self-awareness |
| **Anti-Duplication Gamification** | XP progression, level ranks, and 6 badges ("First Step", "Physics Explorer", "Quiz Champion") with de-duplication | Sustains high intrinsic motivation across Grades 6-12 |
| **Personalized Recommendations** | "Your Next Learning Step" card recommending targeted simulations and Socratic inquiry based on lowest mastery | Focuses student energy on high-leverage cognitive gaps |
| **Socratic Mentorship** | Guided discovery ladder: *"Give me a hint"*, *"Explain like I'm 10"*, *"Show local analogy"*, *"Quiz me"* | Eliminates rote memorization traps |
| **Vernacular Bridging** | Multi-lingual support (Hindi, Hinglish, Telugu, Tamil, Marathi) with cultural anchors | Destroys the English medium comprehension barrier |
| **Interactive Mental Models** | Dynamic SVG simulations with angle, friction, sunlight, and fraction sliders | Builds lasting visual intuition |
| **Educator Co-Pilot** | 1-Click differentiated bilingual worksheet generator with print & text export, student names, and marking rubric | Saves teachers 10+ hours/week in multi-grade classrooms |
| **Glass-Box AI Inspector** | Real-time trace showing agent thoughts, tool calls, and the 6-stage Adaptive Learning Pipeline | 100% transparent, explainable AI |
| **Dyslexia & Accessibility** | OpenDyslexic typography mode, high-contrast, speech-to-text & TTS narration | Complete neuro-inclusion |
| **Rural 2G Mode** | Lightweight bundle with full offline local caching and paused animations | Operates in remote villages with zero broadband |

---

## 🧭 Complete End-to-End User Flow

```
Landing Page ───► Create Study Plan ───► Learner Dashboard ───► AI Roadmap ───► Diagnostic Quiz ───► Socratic AI Tutor
     │                                           ▲                                     │                       │
     │                                           └────── Adaptive Recommendations ─────┴── (Auto-Updated XP) ──┘
     └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Landing Page**: Explains educational equity mission, social impact metrics, 4 core pillars, and launches personalized onboarding.
2. **Create Study Plan**: Onboarding wizard configuring Grade (6-12), Board (State Board, CBSE, ICSE), Vernacular Medium, and Daily Time Commitment.
3. **Learner Dashboard**: Features the prominent **"Your Next Learning Step"** adaptive recommendation card, **"Learning Analytics & Mastery"** topic progress bars, and **"Achievements & Badges"** showcase.
4. **AI Roadmap**: Visual milestone tree covering Optics, Newton's Laws & Friction, Photosynthesis, and Fractions with direct Socratic launch.
5. **Diagnostic Quiz**: Multi-topic assessment with instant misconception debunking, celebratory confetti, educational feedback, and adaptive handoff.
6. **Socratic AI Tutor**: Real-time dialogue with Socratic Guru, 4-step hint ladder, Web Speech synthesis, and interactive SVG simulations.
7. **Educator Co-Pilot**: Teacher diagnostic scanner and bilingual NEP 2020 worksheet generator with dedicated **"Print Worksheet"** and **"Export Worksheet (.txt)"** capabilities.
8. **Glass-Box Inspector**: Live agent trace and architecture inspector featuring both the **Multi-Agent Tree** and the **6-Stage Adaptive Learning Pipeline**.

---

## 🛠️ Technology Stack

- **Frontend Application**: React 18, Vite 5, Lucide Icons, Canvas Confetti
- **Design System**: Bespoke Cyber-Vedic Vanilla CSS with Dark/Light glassmorphism, responsive mobile-first layout
- **Agent Orchestration**: Google Antigravity SDK (`google-antigravity`), Gemini Models (2.0 / 1.5 Flash)
- **Backend API**: Python 3.13, FastAPI, Server-Sent Events (SSE) streaming
- **Accessibility & Voice**: Web Speech API (SpeechSynthesis & SpeechRecognition)

---

## 📂 Project Structure

```text
shikshasetu-ai/
├── .env.example              # Environment variables template (optional Gemini API key)
├── .gitignore                # Git exclusions (node_modules, pycache, build artifacts)
├── index.html                # Single-page app HTML root with Google Fonts
├── package.json              # Frontend dependencies and Vite scripts
├── vite.config.js            # Vite configuration
├── README.md                 # Primary documentation
├── backend/
│   ├── agent_system.py       # Google Antigravity multi-agent cognitive architecture
│   ├── main.py               # FastAPI server with SSE streaming endpoint
│   └── requirements.txt      # Python dependencies (fastapi, uvicorn, pydantic)
├── docs/
│   └── HACKATHON_PITCH.md    # 3-min winning pitch script, 7-slide deck, judge Q&A
├── scripts/
│   └── verify_project.mjs    # Automated end-to-end test and validation script
└── src/
    ├── App.jsx               # Main application container & view router
    ├── main.jsx              # React root mount
    ├── index.css             # Unified Cyber-Vedic design system
    ├── components/
    │   ├── LandingPage.jsx             # Hero, impact stats & guided flow CTAs
    │   ├── CreateStudyPlan.jsx         # 3-stage onboarding wizard
    │   ├── DashboardView.jsx           # Student learner dashboard & stats
    │   ├── AIRoadmapView.jsx           # Visual curriculum milestone tree
    │   ├── QuizView.jsx                # Topic diagnostic quiz & instant explanations
    │   ├── StudentTutorView.jsx        # Socratic Guru chat & voice narration
    │   ├── VisualConceptCanvas.jsx     # Interactive SVG mental model simulations
    │   ├── TeacherCoPilotView.jsx      # Worksheet generator & misconception scanner
    │   ├── AgentTraceModal.jsx         # Antigravity glass-box agent inspector
    │   ├── Navbar.jsx                  # Navigation, vernacular switcher & accessibility
    │   └── OfflineLowBandwidthBanner.jsx # Rural 2G mode toggle
    ├── data/
    │   └── curriculumData.js           # Multi-lingual STEM data & cultural analogies
    └── services/
        └── agentOrchestrator.js        # Multi-agent bridge with backend SSE & offline fallback
```

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
Backend API will run at `http://localhost:8000`.

---

## ⚠️ Known Limitations & Demo Notes

1. **Offline-First Resiliency**: ShikshaSetu is engineered to demo flawlessly with 100% autonomy offline using localized multi-agent models. Connecting an optional Gemini API key via the Glass-Box Inspector unlocks live Gemini 2.0 / 1.5 Flash cloud generation.
2. **Browser Voice Recognition**: Speech-to-text uses the standard Web Speech API (`webkitSpeechRecognition`). It runs natively on Chromium-based browsers (Chrome, Edge) on `localhost` or HTTPS with microphone permission enabled.

---

## 🏆 Hackathon Winning Pitch Kit
Detailed 3-minute presentation scripts, judge Q&A defense battlecards, and 7-slide presentation outlines are located in:
👉 [`docs/HACKATHON_PITCH.md`](docs/HACKATHON_PITCH.md)

---

## 📜 License
Licensed under the [MIT License](LICENSE). Built with ❤️ for educational equity and UN SDG 4.