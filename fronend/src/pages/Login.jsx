import React, { useState } from 'react';
import { 
  Eye, EyeOff, Loader, CheckCircle2, XCircle, ShieldCheck, User, Lock, 
  Crown, Send, Shield, Users, BarChart3, DollarSign, FileText, 
  Building2, CheckCircle, Smartphone, Tablet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, backendStatus } = useAuth();
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

  const tags = [
    { text: 'Customer Management', icon: Users },
    { text: 'Fleet & Zone Tracking', icon: Building2 },
    { text: 'Finance & Billing', icon: DollarSign },
    { text: 'Reports & Analytics', icon: BarChart3 },
    { text: 'Village Operations', icon: FileText },
    { text: 'Multi-branch Support', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen w-full bg-[#030816] text-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Background Radial Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-[30%] w-[35vw] h-[35vw] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
      />

      {/* Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
        
        {/* ================= LEFT COLUMN: BRAND HERO & MOCKUPS ================= */}
        <div className="lg:col-span-7 space-y-6 lg:pr-2">
          
          {/* Header Row */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-3">
              {/* Glowing Shield HS Badge */}
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/40 border border-blue-300/30">
                <span className="text-white font-black text-lg tracking-widest">HS</span>
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white leading-none">
                  HUDI-SOFT
                </h2>
                <span className="text-xs font-bold tracking-wider text-cyan-400">SYSTEMS</span>
              </div>
            </div>

            {/* Enterprise Suite Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider shadow-inner">
              <Crown className="w-3.5 h-3.5 text-cyan-400" />
              <span>ENTERPRISE SUITE</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-3 pt-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1]">
              Smart Management <br />
              for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Smart Leaders</span>
            </h1>
            <p className="text-slate-300/80 text-xs sm:text-sm lg:text-base max-w-xl leading-relaxed">
              All-in-one management system to simplify operations, enhance efficiency and drive growth.
            </p>
          </div>

          {/* Feature Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            {tags.map((tag, i) => {
              const IconComp = tag.icon;
              return (
                <div key={i} className="flex items-center gap-2 bg-blue-950/40 border border-blue-500/20 rounded-xl px-3 py-2 backdrop-blur-md">
                  <div className="w-5 h-5 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-200 truncate">{tag.text}</span>
                </div>
              );
            })}
          </div>

          {/* Device Mockups Container (Tablet & Smartphone) */}
          <div className="relative pt-3 hidden sm:block">
            <div className="relative flex items-end gap-4">
              
              {/* Smartphone Mockup */}
              <div className="w-36 sm:w-44 rounded-[2rem] bg-slate-900 border-4 border-slate-700/80 p-2 shadow-2xl shadow-blue-950/80 relative z-20 shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-12 h-3 bg-slate-800 rounded-full mx-auto mb-2" />
                <div className="bg-slate-950 rounded-xl p-2.5 space-y-2 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-cyan-400">Mobile App</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="bg-blue-600/20 rounded-lg p-1.5 border border-blue-500/30">
                    <p className="text-[8px] text-slate-400">Total Users</p>
                    <p className="text-xs font-bold text-white">2,568</p>
                  </div>
                  <div className="h-10 bg-slate-900 rounded-lg p-1 border border-slate-800 flex items-end gap-1">
                    {[40, 65, 30, 85, 90, 70].map((val, idx) => (
                      <div key={idx} className="flex-1 bg-cyan-400/60 rounded-t-xs" style={{ height: `${val}%` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tablet / Laptop Dashboard Mockup */}
              <div className="flex-1 rounded-2xl bg-slate-900 border-4 border-slate-700/80 p-3 shadow-2xl shadow-blue-900/40 relative z-10 backdrop-blur-xl">
                {/* Tablet Top Header Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-extrabold text-white">HUDI-SOFT Dashboard</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Dashboard Mock Stats Grid */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <p className="text-[9px] text-slate-400">Customers</p>
                    <p className="text-xs font-bold text-white">2,568</p>
                    <span className="text-[8px] text-emerald-400">↑ 12.5%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <p className="text-[9px] text-slate-400">Active Workers</p>
                    <p className="text-xs font-bold text-white">156</p>
                    <span className="text-[8px] text-emerald-400">↑ 8.2%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <p className="text-[9px] text-slate-400">Attendance</p>
                    <p className="text-xs font-bold text-white">92.6%</p>
                    <span className="text-[8px] text-cyan-400">↑ 5.4%</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <p className="text-[9px] text-slate-400">Revenue</p>
                    <p className="text-xs font-bold text-cyan-300">$24,860</p>
                    <span className="text-[8px] text-emerald-400">↑ 15.3%</span>
                  </div>
                </div>

                {/* Analytics Chart & Activity Panel */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <p className="text-[9px] font-semibold text-slate-400 mb-1">Performance Overview</p>
                    <div className="h-14 w-full flex items-end gap-1.5 pt-1">
                      {[35, 55, 45, 75, 60, 90, 80, 100, 85, 95].map((h, idx) => (
                        <div key={idx} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-xs" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <p className="text-[9px] font-semibold text-slate-400">System Activity</p>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-blue-500/40 rounded-full w-full" />
                      <div className="h-1.5 bg-cyan-400/40 rounded-full w-3/4" />
                      <div className="h-1.5 bg-indigo-500/40 rounded-full w-1/2" />
                    </div>
                    <span className="text-[8px] text-emerald-400 font-semibold">● All Systems Normal</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Security Pill */}
          <div className="inline-flex items-center gap-3 bg-blue-950/60 border border-blue-500/30 rounded-xl px-4 py-2 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Trusted & Secure • Reliable • Scalable</span>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: GLOWING LOGIN FORM ================= */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-[2rem] p-[1.5px] bg-gradient-to-b from-cyan-400/60 via-blue-500/30 to-indigo-600/60 shadow-2xl shadow-blue-950">
            
            {/* Translucent Glass Card */}
            <div className="bg-[#070e24]/90 backdrop-blur-2xl rounded-[2rem] p-6 sm:p-8 space-y-6">
              
              {/* Shield Header Badge */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center relative">
                  {/* Outer Laurel Wreath Ring SVG */}
                  <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-400/30 flex items-center justify-center relative shadow-lg shadow-blue-500/30">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-blue-400 flex items-center justify-center shadow-md">
                      <span className="text-white font-black text-xl tracking-wider">HS</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Welcome Back! 👋
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">
                  Sign in to access your account
                </p>

                {/* Live System Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-semibold">
                  {backendStatus === 'checking' && (
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Loader className="w-3.5 h-3.5 animate-spin" /> System Status: Checking...
                    </span>
                  )}
                  {backendStatus === 'connected' && (
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      System Status: <strong className="font-bold">Online</strong>
                    </span>
                  )}
                  {backendStatus === 'disconnected' && (
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <XCircle className="w-3.5 h-3.5" /> System Status: <strong className="font-bold">Demo Mode</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Login Form */}
              <form className="space-y-4 pt-1" onSubmit={handleSubmit}>
                
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label htmlFor="username" className="block text-xs font-semibold text-slate-300">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-blue-800 bg-slate-950 text-blue-500 focus:ring-cyan-400"
                    />
                    <span>Remember me</span>
                  </label>
                  <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium">
                    Forgot Password?
                  </span>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-xs font-medium flex items-center gap-2">
                    <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl font-extrabold text-sm text-white shadow-xl shadow-blue-600/40 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin text-white" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Sign In To Platform</span>
                    </>
                  )}
                </button>

              </form>

              {/* Data Protection Footer */}
              <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 border-t border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Your data is protected with enterprise-grade security</span>
              </div>

              {/* Copyright */}
              <div className="text-center text-[11px] text-slate-500">
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
