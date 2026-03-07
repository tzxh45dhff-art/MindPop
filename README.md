# MindPop 🧠💥

MindPop is a state-of-the-art, AI-powered learning platform designed to revolutionize the educational experience. With a striking **Neo-Brutalist design**, it offers a premium, high-energy environment for students to master their subjects.

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

---

Built with ❤️ for the future of learning.
