import { useState, useEffect } from 'react';
import Bubbles from './components/Bubbles';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

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
    localStorage.removeItem('mindpop_token');
    localStorage.removeItem('mindpop_user');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col font-display overflow-hidden">
      {!showOnboarding && <Bubbles />}
      <Navbar onOpenAuth={openAuth} user={user} onLogout={handleLogout} />
      <main className="flex-1 w-full h-screen">
        {showOnboarding ? (
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        ) : (
          <Welcome />
        )}
      </main>

      {isAuthModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default App;
