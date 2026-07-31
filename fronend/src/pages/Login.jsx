import React, { useState } from 'react';
import { 
  Eye, EyeOff, Loader, User, Lock, ArrowRight, TrendingUp, 
  ShieldCheck, Sparkles, Zap, Check, Users, Server, Clock, 
  Building2, CreditCard, Activity, Bell, ChevronRight, Droplets
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
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
        setError(result.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const trustStats = [
    { value: '1000+', label: 'Businesses', icon: Building2 },
    { value: '250K+', label: 'Active Users', icon: Users },
    { value: '99.99%', label: 'Uptime', icon: Server },
    { value: '24/7', label: 'Support', icon: Clock },
  ];

  const features = [
    'Multi-Tenant Cloud',
    'AI Powered Analytics',
    'Enterprise Security',
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Stripe/Linear Style Bright Radial Glow Mesh Background */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-blue-400/25 via-sky-300/30 to-indigo-300/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-gradient-to-bl from-sky-300/30 via-indigo-200/30 to-blue-400/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-200/30 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Grid Matrix Background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#2563eb 1.2px, transparent 1.2px)`, backgroundSize: '32px 32px' }} 
      />

      {/* Main Split Layout Grid */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* ================= LEFT SIDE (65% PRODUCT SHOWCASE & HERO) ================= */}
        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 pr-0 lg:pr-2">
          
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-100">
              <img src="/logo.png" alt="DUR-DUR Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                DUR-DUR <span className="text-blue-600">CLEAN WATER</span>
              </h2>
              <p className="text-[11px] font-bold tracking-widest text-sky-600 uppercase mt-0.5">
                Water Cargo & Customer Platform
              </p>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
              DUR-DUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600">
                CLEAN WATER LTD.
              </span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-semibold">
              Biyo Nadiif Ah • Ammaan & Kalsooni • Adeeg Hufan
            </p>
          </div>

          {/* Official Contacts Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-blue-600 text-white rounded-full px-5 py-2.5 shadow-md text-xs font-bold">
              <span>📞 +254 748 269 584 / +254 725 727 124</span>
            </div>
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 bg-white/90 border border-slate-200/80 rounded-full px-4 py-2 shadow-sm shadow-blue-900/5 text-xs font-bold text-slate-700 backdrop-blur-md"
              >
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Real Company Poster Showcase */}
          <div className="relative pt-2 pb-4 hidden sm:block">
            <div className="relative bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-2.5 shadow-2xl shadow-blue-900/15 overflow-hidden">
              <img 
                src="/company-banner.jpg" 
                alt="DUR-DUR CLEAN WATER LTD Banner" 
                className="w-full h-auto rounded-2xl object-cover shadow-sm"
              />
            </div>
          </div>

          {/* Trust Statistics Bar */}
          <div className="pt-2 border-t border-slate-200/80 grid grid-cols-4 gap-3">
            {trustStats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="space-y-0.5">
                  <div className="flex items-center gap-1 text-blue-600">
                    <StatIcon className="w-3.5 h-3.5" />
                    <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{stat.value}</p>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= RIGHT SIDE (35% FLOATING GLASS LOGIN CARD) ================= */}
        <div className="lg:col-span-5 w-full order-1 lg:order-2">
          <div className="relative rounded-[32px] p-[1.5px] bg-gradient-to-b from-blue-400/60 via-sky-300/40 to-indigo-400/50 shadow-2xl shadow-blue-900/15">
            
            {/* White Transparent Floating Glass Card (32px rounded) */}
            <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-7 sm:p-10 space-y-6">
              
              {/* Header Title & Subtitle */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white p-1 shadow-xl shadow-blue-500/25 border border-blue-100 mb-1">
                  <img src="/logo.png" alt="DUR-DUR Logo" className="w-full h-full object-contain" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">
                  Access your DUR-DUR CLEAN WATER portal securely.
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-4.5 pt-1" onSubmit={handleSubmit}>
                
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label htmlFor="username" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <User className="w-4.5 h-4.5" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock className="w-4.5 h-4.5" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 font-medium"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1 text-xs font-medium">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Remember me</span>
                  </label>
                  <span className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors">
                    Forgot Password?
                  </span>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-rose-600 text-xs font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Primary Button (Royal Blue -> Sky Blue Gradient) */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white shadow-xl shadow-blue-600/30 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 hover:from-blue-500 hover:to-sky-400 hover:shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin text-white" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Platform</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Data Protection Security Note */}
              <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 border-t border-slate-100">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Your data is protected with enterprise-grade security</span>
              </div>

              {/* Copyright */}
              <div className="text-center text-[11px] text-slate-400 font-medium">
                © 2026 HUDI-SOFT SYSTEMS. All rights reserved.
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
