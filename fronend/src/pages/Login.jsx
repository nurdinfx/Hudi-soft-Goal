import React, { useState } from 'react';
import { 
  Eye, EyeOff, Loader, User, Lock, ArrowRight, TrendingUp, 
  CheckCircle2, Bell, ShieldCheck, DollarSign, Users, CreditCard, Activity, BarChart2
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

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Dynamic Bright Ambient Background Glows & Mesh Gradients */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-300/30 to-sky-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-200/40 via-sky-200/30 to-blue-300/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#2563eb 1.2px, transparent 1.2px)`, backgroundSize: '28px 28px' }} 
      />

      {/* Main Container: Split-Screen Layout */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto">
        
        {/* ================= LEFT SIDE (65% HERO SECTION - BRIGHT PRODUCT SHOWCASE) ================= */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-4">
          
          {/* Top Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="text-white font-black text-xl tracking-wider">HS</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                HUDI-SOFT <span className="text-blue-600">SYSTEMS</span>
              </h2>
              <p className="text-xs font-semibold text-sky-600 tracking-wide mt-0.5">
                Enterprise Cloud Software
              </p>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Manage Your Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                With Confidence
              </span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              Access all your HUDI-SOFT applications from one secure, powerful platform. Simplify operations, drive efficiency, and scale seamlessly.
            </p>
          </div>

          {/* 3D-Style Device & Floating UI Showcase */}
          <div className="relative pt-4 pb-2">
            
            {/* Main Laptop & Desktop Showcase Card */}
            <div className="relative bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-2xl shadow-blue-900/10 transition-all duration-300">
              
              {/* Laptop Display Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-bold text-slate-500 tracking-wide uppercase">
                    HUDI-SOFT Enterprise Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Real-time Sync</span>
                </div>
              </div>

              {/* Dashboard Content Mockup Grid */}
              <div className="grid grid-cols-12 gap-4">
                
                {/* Left Mini Sidebar */}
                <div className="col-span-3 bg-slate-50 rounded-2xl p-3 space-y-2 border border-slate-100 hidden sm:block">
                  <div className="h-7 bg-blue-600 text-white rounded-xl text-[10px] font-bold flex items-center px-2.5 gap-2">
                    <BarChart2 className="w-3.5 h-3.5" /> Analytics
                  </div>
                  <div className="h-7 text-slate-500 rounded-xl text-[10px] font-semibold flex items-center px-2.5 gap-2 hover:bg-slate-100">
                    <Users className="w-3.5 h-3.5" /> Customers
                  </div>
                  <div className="h-7 text-slate-500 rounded-xl text-[10px] font-semibold flex items-center px-2.5 gap-2 hover:bg-slate-100">
                    <DollarSign className="w-3.5 h-3.5" /> Finance
                  </div>
                  <div className="h-7 text-slate-500 rounded-xl text-[10px] font-semibold flex items-center px-2.5 gap-2 hover:bg-slate-100">
                    <CreditCard className="w-3.5 h-3.5" /> POS Billing
                  </div>
                </div>

                {/* Main Dashboard Panel */}
                <div className="col-span-12 sm:col-span-9 space-y-3">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-3 rounded-2xl border border-blue-100">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Monthly Revenue</p>
                      <p className="text-base sm:text-lg font-black text-blue-900 mt-0.5">$48,920</p>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> +18.4%
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-3 rounded-2xl border border-sky-100">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Active Users</p>
                      <p className="text-base sm:text-lg font-black text-indigo-900 mt-0.5">12,840</p>
                      <span className="text-[10px] font-bold text-blue-600 flex items-center gap-0.5">
                        <Users className="w-3 h-3" /> High Activity
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-2xl border border-indigo-100">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">System Health</p>
                      <p className="text-base sm:text-lg font-black text-purple-900 mt-0.5">99.99%</p>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Operational
                      </span>
                    </div>
                  </div>

                  {/* Graph Visual Mockup */}
                  <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-600 uppercase">Revenue Growth Trend</span>
                      <span className="text-[10px] font-semibold text-slate-400">Jan - Dec 2026</span>
                    </div>
                    <div className="h-16 w-full flex items-end gap-1.5 pt-1">
                      {[45, 60, 50, 75, 65, 85, 95, 80, 100, 90, 85, 100].map((val, idx) => (
                        <div 
                          key={idx} 
                          className="flex-1 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-sm hover:from-blue-500 hover:to-indigo-500 transition-all" 
                          style={{ height: `${val}%` }} 
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Floating UI Card 1: Revenue Notification */}
            <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-3.5 shadow-xl shadow-blue-900/10 flex items-center gap-3 animate-float hidden sm:flex">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Payment Received</p>
                <p className="text-[11px] font-bold text-emerald-600">+$1,450.00 Approved</p>
              </div>
            </div>

            {/* Floating UI Card 2: Security Verified */}
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-3.5 shadow-xl shadow-blue-900/10 flex items-center gap-3 animate-float-delay hidden sm:flex">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Enterprise Security</p>
                <p className="text-[11px] font-semibold text-slate-500">256-bit Encrypted Protection</p>
              </div>
            </div>

            {/* Floating UI Card 3: Instant Invoice */}
            <div className="absolute bottom-1/3 -right-6 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl p-3 shadow-xl shadow-indigo-900/10 flex items-center gap-2.5 hidden md:flex">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-700">Invoice #8492 Processed</span>
            </div>

          </div>

          {/* Footer Quality Note */}
          <p className="text-xs font-medium text-slate-500 flex items-center gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Trusted by leading enterprises & organizations worldwide</span>
          </p>

        </div>

        {/* ================= RIGHT SIDE (35% LUXURIOUS BRIGHT LOGIN CARD) ================= */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-[2rem] p-[1.5px] bg-gradient-to-b from-blue-400/50 via-sky-300/30 to-indigo-400/40 shadow-2xl shadow-blue-900/15">
            
            {/* White Glass Card */}
            <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-7 sm:p-10 space-y-7">
              
              {/* Header Title */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 shadow-xl shadow-blue-500/25 mb-1">
                  <span className="text-white font-black text-2xl tracking-wider">HS</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">
                  Access all your HUDI-SOFT applications from one secure platform.
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-4 pt-1" onSubmit={handleSubmit}>
                
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

                {/* Large Blue Gradient CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white shadow-xl shadow-blue-600/30 bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin text-white" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Copyright & Security Footer */}
              <div className="pt-3 text-center border-t border-slate-100 space-y-1">
                <p className="text-[11px] text-slate-400 font-medium">
                  © 2026 HUDI-SOFT SYSTEMS. All rights reserved.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
