import React, { useState } from 'react';
import { 
  Eye, EyeOff, Loader, CheckCircle2, XCircle, ShieldCheck, User, Lock, 
  ArrowRight, Crown, Check, Activity, Shield, Cloud, RefreshCw
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

  const features = [
    { text: 'Real-time Analytics', icon: Activity },
    { text: 'Secure & Reliable', icon: ShieldCheck },
    { text: 'Multi-platform', icon: CheckCircle2 },
    { text: 'Role Based Access', icon: Shield },
    { text: 'Cloud Backup', icon: Cloud },
    { text: '99.9% Uptime', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen w-full bg-[#070913] text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Gradient Mesh & Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#a855f7 1px, transparent 1px)`, backgroundSize: '36px 36px' }} 
      />

      {/* Outer Main Container */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ================= LEFT COLUMN: HERO SECTION ================= */}
        <div className="lg:col-span-7 space-y-8 pr-0 lg:pr-4">
          
          {/* Top Brand Header */}
          <div className="flex items-center gap-4">
            {/* Hexagon Logo Badge */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-400/30">
              <span className="text-white font-black text-xl tracking-wider">HS</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                HUDI-SOFT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">SYSTEMS</span>
              </h2>
            </div>

            {/* Enterprise Suite Badge */}
            <div className="ml-auto sm:ml-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Crown className="w-3.5 h-3.5 text-purple-400" />
              <span>ENTERPRISE SUITE</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4 pt-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Smart Management <br />
              for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">Smart Leaders</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Powerful, Secure and Complete Management Solution for Modern Organizations
            </p>
          </div>

          {/* Feature List Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl px-3.5 py-2.5 backdrop-blur-md">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Dashboard Visual Preview Card */}
          <div className="relative pt-4 hidden sm:block">
            <div className="relative rounded-2xl bg-slate-900/80 border border-purple-500/20 p-5 backdrop-blur-xl shadow-2xl overflow-hidden group">
              
              {/* Card Title & Stats header */}
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dashboard Overview</span>
                </div>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-medium">
                  Live System Active
                </span>
              </div>

              {/* Sample Stat Badges */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Users</p>
                  <p className="text-lg font-bold text-white mt-0.5">12,540</p>
                  <span className="text-[10px] text-emerald-400 font-medium">↑ +12.5% this month</span>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Revenue</p>
                  <p className="text-lg font-bold text-purple-300 mt-0.5">$45,780</p>
                  <span className="text-[10px] text-emerald-400 font-medium">↑ +18.2% this month</span>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Active Projects</p>
                  <p className="text-lg font-bold text-blue-300 mt-0.5">125</p>
                  <span className="text-[10px] text-purple-400 font-medium">99.9% Uptime</span>
                </div>
              </div>

              {/* Mini Chart Graphic Wave */}
              <div className="h-16 w-full flex items-end gap-1 pt-2">
                {[40, 55, 35, 70, 60, 85, 95, 75, 90, 65, 80, 100].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-purple-600/30 to-purple-400 rounded-t-sm hover:from-purple-500 hover:to-blue-400 transition-all duration-300" 
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* Floating Shield Badge */}
              <div className="absolute bottom-4 left-4 bg-purple-950/90 border border-purple-500/40 rounded-xl p-3 backdrop-blur-md shadow-xl flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-600/30 text-purple-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Enterprise Security</p>
                  <p className="text-[10px] text-purple-300/80">Trusted & Secure Platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Footer */}
          <div className="pt-2 flex items-center gap-4 text-slate-400 text-xs font-medium border-t border-slate-800/80">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> React / Vite</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> TypeScript</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Tailwind CSS</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Node.js & Mongo</span>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: LOGIN FORM CARD ================= */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 via-indigo-500/20 to-blue-500/40 shadow-2xl shadow-purple-950/60">
            
            {/* Inner Glass Card */}
            <div className="bg-[#0b0d1e]/90 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 space-y-6">
              
              {/* Hexagon Logo Badge */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 shadow-xl shadow-purple-600/30 border border-purple-400/40">
                  <span className="text-white font-black text-2xl tracking-wider">HS</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Back!</span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Sign in to your account and continue
                </p>

                {/* Server Connection Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold">
                  {backendStatus === 'checking' && (
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Loader className="w-3.5 h-3.5 animate-spin" /> Checking Server...
                    </span>
                  )}
                  {backendStatus === 'connected' && (
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <ShieldCheck className="w-3.5 h-3.5" /> Secure Backend Online
                    </span>
                  )}
                  {backendStatus === 'disconnected' && (
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <XCircle className="w-3.5 h-3.5" /> Demo Mode Active
                    </span>
                  )}
                </div>
              </div>

              {/* Login Form */}
              <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
                
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label htmlFor="username" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    USERNAME
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    PASSWORD
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
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

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                    />
                    <span>Remember me</span>
                  </label>
                  <span className="text-purple-400 hover:text-purple-300 cursor-pointer font-medium">
                    Forgot Password?
                  </span>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-xs font-medium flex items-center gap-2 animate-shake">
                    <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white shadow-xl shadow-purple-600/30 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin text-white" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Platform</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Social Login Options */}
              <div className="space-y-4 pt-2">
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-800 w-full" />
                  <span className="bg-[#0b0d1e] px-3 text-[11px] text-slate-500 font-medium uppercase tracking-wider absolute">
                    or continue with
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Google */}
                  <button type="button" className="flex items-center justify-center py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#ea4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                      <path fill="#4285f4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                      <path fill="#fbbc05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.3c0 2.8.7 5.5 1.9 7.9l3.7-2.9z" />
                      <path fill="#34a853" d="M12 23.5c3.2 0 6-1.1 8-2.9l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.6C3.7 20.3 7.5 23.5 12 23.5z" />
                    </svg>
                  </button>
                  {/* Microsoft */}
                  <button type="button" className="flex items-center justify-center py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z" />
                      <path fill="#81bc06" d="M12 1h10v10H12z" />
                      <path fill="#05a6f0" d="M1 12h10v10H1z" />
                      <path fill="#ffba08" d="M12 12h10v10H12z" />
                    </svg>
                  </button>
                  {/* Apple */}
                  <button type="button" className="flex items-center justify-center py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl hover:bg-slate-900 transition-colors text-white">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.18.67-2.88 1.49-.63.73-1.18 1.89-1.03 3.03 1.12.09 2.25-.57 2.92-1.4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Admin Contact Footer Link */}
              <div className="pt-2 text-center text-xs text-slate-400">
                Don't have an account?{' '}
                <span className="text-purple-400 font-semibold hover:text-purple-300 cursor-pointer">
                  Contact Administrator
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
