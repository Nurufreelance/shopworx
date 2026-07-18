import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'secure' | 'otp'>('secure');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, method: loginMethod });
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-4">
      <div className="w-full max-w-[380px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-bold text-[#1A1A2E] tracking-tight">
            ShopWorx
          </h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Log in to Infinity
          </p>
          <p className="text-[12px] text-[#9CA3AF] mt-0.5">
            Use your ShopWorx Account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-6">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-[12px] font-medium text-[#374151] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 text-[13px] border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] focus:border-transparent bg-[#F9FAFB] placeholder:text-[#9CA3AF] transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label className="block text-[12px] font-medium text-[#374151] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 text-[13px] border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] focus:border-transparent bg-[#F9FAFB] placeholder:text-[#9CA3AF] pr-10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Method Toggle */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[12px] text-[#6B7280]">Login</span>
              <div className="flex bg-[#F3F4F6] rounded-[8px] p-0.5">
                <button
                  type="button"
                  onClick={() => setLoginMethod('secure')}
                  className={`px-4 py-1.5 text-[12px] font-medium rounded-[6px] transition-all ${
                    loginMethod === 'secure'
                      ? 'bg-white text-[#1A1A2E] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#1A1A2E]'
                  }`}
                >
                  securely
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`px-4 py-1.5 text-[12px] font-medium rounded-[6px] transition-all ${
                    loginMethod === 'otp'
                      ? 'bg-white text-[#1A1A2E] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#1A1A2E]'
                  }`}
                >
                  with otp
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#2F6BFF] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#1A5AEE] transition-colors shadow-sm hover:shadow-md"
            >
              Log in securely
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* OTP Login Button */}
          <button
            onClick={() => setLoginMethod('otp')}
            className="w-full py-2.5 border border-[#E5E7EB] text-[#1A1A2E] text-[13px] font-medium rounded-[8px] hover:bg-[#F9FAFB] transition-colors"
          >
            Login with otp
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <GlobeAltIcon className="w-4 h-4 text-[#6B7280]" />
          <select className="text-[11px] text-[#6B7280] bg-transparent border-none focus:outline-none cursor-pointer hover:text-[#1A1A2E] transition-colors">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </div>
  );
}