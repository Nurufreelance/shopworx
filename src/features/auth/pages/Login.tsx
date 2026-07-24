// src/features/auth/pages/Login.tsx
import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon, GlobeAltIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('ppc@papilonng.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = '/images/shopworx-bg.jpg';
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      console.warn('Background image failed to load, using fallback');
      setImageLoaded(false);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-end overflow-hidden">
      {/* ===== BACKGROUND IMAGE ===== */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: imageLoaded 
            ? 'url("/images/shopworx-bg.jpg")' 
            : 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* ===== LIGHT OVERLAY ON BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 via-blue-900/5 to-transparent" />

      {/* ===== STELLANTIS LOGO - TOP LEFT ===== */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
            <span className="text-white font-bold text-lg md:text-xl drop-shadow-lg">S</span>
          </div>
          <div>
            <span className="text-white text-base md:text-lg font-semibold tracking-wider drop-shadow-lg">STELLANTIS</span>
            <span className="block text-white/80 text-[10px] md:text-xs drop-shadow">ShopWorx</span>
          </div>
        </div>
      </div>

      {/* ===== LOGIN SECTION - RIGHT SIDE WITH WHITE BACKGROUND ===== */}
      <div className="relative z-10 w-full max-w-[380px] px-6 md:px-8 py-8 md:py-12 mr-0 md:mr-8 lg:mr-16">
        {/* ===== WHITE BACKGROUND CARD ===== */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* ===== LOGIN HEADER ===== */}
          <div className="mb-8">
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#1A1A2E]">
              Log in to Infinity
            </h1>
            <p className="text-[#6B7280] text-sm mt-1">
              Use your ShopWorx Account
            </p>
          </div>

          {/* ===== LOGIN FORM ===== */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <label className="block text-[#374151] text-xs font-medium mb-1.5 uppercase tracking-wider">
                Email or phone
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adeyemo@gmail.com"
                className="w-full px-0 py-2 bg-transparent border-b-2 border-[#E5E7EB] text-[#1A1A2E] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-blue-500 transition-all duration-300"
                required
              />
              <div className="h-[2px] w-0 group-focus-within:w-full bg-blue-500 transition-all duration-300"></div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-[#374151] text-xs font-medium mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-0 py-2 bg-transparent border-b-2 border-[#E5E7EB] text-[#1A1A2E] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-blue-500 transition-all duration-300 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Button - Blue */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login securely'
              )}
            </button>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#9CA3AF]">or</span>
              </div>
            </div>

            {/* Login with OTP Button - Blue Outline */}
            <button
              type="button"
              className="w-full py-3 bg-transparent hover:bg-blue-50 text-blue-600 font-medium rounded-lg transition-all duration-200 border-2 border-blue-600 hover:border-blue-700 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Login with OTP
            </button>
          </form>

          {/* ===== LANGUAGE SELECTOR ===== */}
          <div className="mt-6">
            <div className="flex items-center justify-center gap-2">
              <GlobeAltIcon className="w-4 h-4 text-[#9CA3AF]" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-[#6B7280] text-sm bg-transparent border-none focus:outline-none cursor-pointer hover:text-[#1A1A2E] transition-colors"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <p className="text-center text-white/50 text-xs mt-6 drop-shadow">
          © {new Date().getFullYear()} Stellantis. All rights reserved.
        </p>
      </div>
    </div>
  );
}