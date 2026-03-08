import { useState, useEffect } from 'react';
import Bubbles from './components/Bubbles';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import AppLayout from './components/AppLayout';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import AiAgent from './pages/AiAgent';
import Schedule from './pages/Schedule';
import LearnMap from './pages/LearnMap';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Leaderboard from './pages/Leaderboard';
import Progress from './pages/Progress';
import FocusSession from './pages/FocusSession';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './i18n/ThemeContext';

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('mindpop_token');
    const savedUser = localStorage.getItem('mindpop_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('mindpop_token');
        localStorage.removeItem('mindpop_user');
      }
    }
  }, []);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('mindpop_user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
    if (userData.isNewUser) {
      setShowOnboarding(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    localStorage.removeItem('mindpop_token');
    localStorage.removeItem('mindpop_user');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Render current page content (inside AppLayout)
  const renderPageContent = () => {
    switch (currentPage) {
      case 'subjects':
        return <Subjects user={user} />;
      case 'schedule':
        return <Schedule user={user} />;
      case 'learnmap':
        return <LearnMap onNavigate={handleNavigate} />;
      case 'ai-agent':
        return <AiAgent user={user} onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile user={user} onNavigate={handleNavigate} />;
      case 'leaderboard':
        return <Leaderboard user={user} onNavigate={handleNavigate} />;
      case 'progress':
        return <Progress user={user} onNavigate={handleNavigate} />;
      case 'focus-session':
        return <FocusSession user={user} onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard user={user} onNavigate={handleNavigate} />;
    }
  };

  // Determine what main view to show
  const renderMainContent = () => {
    if (!user) return <Welcome />;
    if (showOnboarding) return <Onboarding user={user} onComplete={() => setShowOnboarding(false)} />;

    return (
      <AppLayout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPageContent()}
      </AppLayout>
    );
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="relative min-h-screen w-full flex flex-col font-display overflow-hidden bg-white dark:bg-[#1a1a2e] transition-colors duration-300">
          {(!user || showOnboarding) && <Bubbles />}
          {(!user || showOnboarding) && <Navbar onOpenAuth={openAuth} user={user} onLogout={handleLogout} />}
          <main className="flex-1 w-full min-h-screen">
            {renderMainContent()}
          </main>

          {isAuthModalOpen && (
            <AuthModal
              mode={authMode}
              onClose={() => setIsAuthModalOpen(false)}
              onAuthSuccess={handleAuthSuccess}
            />
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
