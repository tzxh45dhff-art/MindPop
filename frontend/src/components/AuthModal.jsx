import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const AuthModal = ({ mode: initialMode, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState(initialMode || 'login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setName('');
    setError('');
    setSuccessMsg('');
  };

  const switchMode = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('mindpop_token', data.access_token);
      onAuthSuccess({ username, token: data.access_token });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Signup failed');
      }

      setSuccessMsg('Account created! Logging you in...');

      // Auto-login after signup
      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        localStorage.setItem('mindpop_token', loginData.access_token);
        setTimeout(() => {
          onAuthSuccess({ username, name, token: loginData.access_token, isNewUser: true });
        }, 800);
      } else {
        // Signup succeeded but auto-login failed, switch to login
        setTimeout(() => {
          switchMode('login');
          setSuccessMsg('Account created! Please log in.');
        }, 800);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-white border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-[90%] max-w-md p-8 animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-[#F1F0DE] border-[3px] border-black flex items-center justify-center text-xl font-black hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-4xl font-black tracking-tight text-black mb-2">
          {mode === 'login' ? 'Welcome Back!' : 'Join MindPop!'}
        </h2>
        <p className="text-sm font-bold tracking-[0.15em] text-gray-500 mb-6">
          {mode === 'login'
            ? 'LOG IN TO YOUR ACCOUNT'
            : 'CREATE YOUR ACCOUNT'}
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border-[3px] border-red-500 px-4 py-2 mb-4 font-bold text-red-700 text-sm shadow-[3px_3px_0px_0px_rgba(239,68,68,0.5)]">
            {error}
          </div>
        )}

        {/* Success */}
        {successMsg && (
          <div className="bg-green-100 border-[3px] border-green-500 px-4 py-2 mb-4 font-bold text-green-700 text-sm shadow-[3px_3px_0px_0px_rgba(34,197,94,0.5)]">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-extrabold tracking-wide text-black mb-1">
                FULL NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full border-[3px] border-black px-4 py-3 text-base font-bold bg-[#F1F0DE] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(239,135,40,1)] transition-shadow placeholder:text-gray-400"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-extrabold tracking-wide text-black mb-1">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
              className="w-full border-[3px] border-black px-4 py-3 text-base font-bold bg-[#F1F0DE] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(239,135,40,1)] transition-shadow placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-extrabold tracking-wide text-black mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="w-full border-[3px] border-black px-4 py-3 text-base font-bold bg-[#F1F0DE] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(239,135,40,1)] transition-shadow placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EF8728] border-[4px] border-black px-6 py-3 text-lg font-extrabold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading
              ? '⏳ Please wait...'
              : mode === 'login'
                ? '🚀 Log In'
                : '✨ Sign Up'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-sm font-bold text-gray-500">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
            className="text-[#EF8728] font-extrabold text-base underline underline-offset-4 hover:text-black transition-colors mt-1"
          >
            {mode === 'login' ? 'Sign Up Here' : 'Log In Here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
