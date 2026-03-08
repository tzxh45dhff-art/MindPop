# MindPop 🧠💥

MindPop is a state-of-the-art, AI-powered learning platform designed to revolutionize the educational experience. With a striking **Neo-Brutalist design**, it offers a premium, high-energy environment for students to master their subjects.

---

## 🌟 What MindPop Can Do

MindPop transforms the traditional, often isolated study experience into a dynamic, personalized journey. It simplifies complex academic tasks by providing an **AI-powered Doubt Solver** that interprets handwritten notes and diagrams instantly, making high-stakes problem-solving safer and more efficient. For students, this means no more getting stuck for hours; the AI acts as a 24/7 personalized mentor that understands their specific subject context and addresses them by name.

Beyond doubt resolution, MindPop makes managing a diverse curriculum easier through its **Visual Knowledge Maps** and **Multi-Language Support**. By offering parity across five major languages, it breaks down accessibility barriers for non-native speakers. The integrated **Focus Timer** and **Gamified Leaderboards** drive consistent engagement, helping students build sustainable study habits. Whether you're mastering Quantum Physics in Hindi or reviewing Algebra in Spanish, MindPop provides a secure, high-energy ecosystem where students don't just study—they excel.

---


## 🚀 Key Features

- **Dynamic Dashboard**: Centralized hub for current focus topics and recently missed questions.
- **Multi-Language Support**: Fully translated interface in **English, हिन्दी (Hindi), Español, Français, and 中文 (Mandarin)**.
- **Dark & Light Mode**: Seamless theme switching for comfortable learning at any time.
- **Mind Architecture Tree**: A visualized knowledge graph to track your learning journey.
- **AI Agent & Doubt Solver**: Instant answers to subject-specific queries using advanced AI models.
- **Live Tutor Integration**: Quick access to human experts for real-time help.
- **Global Leaderboard**: Compete with other learners and track your efficiency score.
- **Performance Analytics**: Detailed progress breakdown by subject and weekly statistics.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (functional components & hooks)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Neo-Brutalist Aesthetic)
- **State Management**: React Context (Language & Theme)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **API Style**: RESTful
- **Validation**: Pydantic Models

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://www.python.org/) (v3.9+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tzxh45dhff-art/MindPop.git
   cd MindPop
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

---

## 📂 Project Structure

```text
MindPop/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # View components (Dashboard, Profile, etc.)
│   │   ├── i18n/       # Language & Theme Contexts
│   │   └── services/   # API & AI integrations
├── backend/            # FastAPI application
│   ├── app/
│   │   ├── routes/     # API Endpoints
│   │   ├── services/   # Business logic
│   │   └── models/     # Pydantic data schemas
└── README.md           # Project documentation
```

## 🎨 Design Philosophy
MindPop uses a **Neo-Brutalist** design system, characterized by:
- Bold, high-contrast colors.
- Thick black borders and drop shadows (hard shadows).
- Vibrant typography.
- Interactive, "alive" UI elements.

## 🏆 Presentation & Judging

MindPop is designed for high-impact demonstrations. If you are presenting to judges, focus on these flows:
1.  **The Personalized Kick-off**: Show how the dashboard greets you by name and highlights your current study focus.
2.  **Multilingual Parity**: Switch languages in settings to show the robust translation engine.
3.  **The AI Doubt Solver**: Show the AI interacting with subject context (Physics/Math) and its personalized conversational style.
4.  **Premium Aesthetics**: Rapidly toggle between Dark and Light modes to show off the Neo-Brutalist styling.

---

## 🛠️ Technical Hurdles & Solutions

Building a platform as dynamic as MindPop came with unique challenges:

-   **The "Neo-Brutalist" Layout Shift**: Traditional responsive design often struggles with the thick, fixed-pixel borders of Neo-Brutalism. In early versions, cards would overlap or borders would "double up." We solved this by implementing a **Strict Box-Sizing** model and using CSS Grid with `gap` properties instead of standard margins, ensuring every border remains crisp regardless of screen size.
-   **Maintaining AI Context**: Initially, the AI would "forget" the student's name or current subject after a few messages. We overcame this by building a **Sliding Memory Window** in the `aiService.js`, which dynamically re-injects the System Prompt and current study context (Subject/Topic) into every interaction without hititng token limits.
-   **Multilingual Script Alignment**: Languages like Hindi and Mandarin have different line heights than English, which broke our perfectly aligned cards. We implemented **Relative Vertical Scaling** and robust flexbox containers to ensure the UI remains "pixel-perfect" across all 5 supported languages.

---

Built with ❤️ for the future of learning.
