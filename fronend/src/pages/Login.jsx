import React, { useState } from 'react';
import { Eye, EyeOff, Loader, CheckCircle, XCircle, ShieldCheck, User, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, backendStatus } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(formData);
      
      if (result.success) {
        window.location.href = '/';
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-slate-950 font-sans selection:bg-blue-500 selection:text-white">
      {/* Dynamic Animated Background Gradients & Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/25 rounded-full blur-[140px] animate-pulse delay-1000" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full blur-[130px] animate-pulse delay-700" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-950/50 transition-all duration-300">
          
          {/* Brand & Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4 relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-16 w-16 bg-slate-900 border border-blue-500/40 rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-2xl font-black tracking-wider">
                  HS
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              Enterprise Suite
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              WELCOME <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">HUDI-SOFT-SYSTEMS</span>
            </h1>
            <p className="mt-2 text-sm text-slate-400 font-medium">
              AND ENJOY YOUR MANAGEMENT EXPERIENCE
            </p>
          </div>

          {/* Backend Status Pill */}
          <div className="mb-6 bg-slate-950/60 rounded-2xl p-3 border border-slate-800/90 flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Server Status
            </span>
            <div className="flex items-center space-x-2">
              {backendStatus === 'checking' && (
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Loader className="w-3.5 h-3.5 animate-spin" />
                  <span>Connecting...</span>
                </div>
              )}
              {backendStatus === 'connected' && (
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Online</span>
                </div>
              )}
              {backendStatus === 'disconnected' && (
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Demo Mode</span>
                </div>
              )}
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3.5 text-red-400 text-xs font-medium flex items-center gap-2.5 animate-headShake">
                <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl py-3.5 px-4 font-bold text-sm text-white shadow-lg shadow-blue-600/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In To Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              HUDI-SOFT SYSTEMS Enterprise Edition • Secured Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
