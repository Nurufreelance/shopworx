// src/components/layout/Header/Header.tsx

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  QuestionMarkCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { HamburgerMenu } from '../HamburgerMenu';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { isMobile } = useMobile();

  return (
    // CHANGE from dark to light header
    <header className="bg-white border-b border-[#E5E7EB] px-3 sm:px-6 py-2 sm:py-3">
      <div className="flex items-center justify-between">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-3">
          <HamburgerMenu />
          {isMobile && (
            <h1 className="text-lg font-bold text-[#1F2229]">ShopWorx</h1>
          )}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md hidden sm:block mx-4">
          <Tooltip content="Search reports & insights" position="bottom" delay={300}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // CHANGE from dark to light
                className="w-full pl-10 pr-4 py-1.5 bg-[#F6F8FB] border border-[#E5E7EB] rounded-lg text-[#1F2229] placeholder-gray-500 text-[13px] focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
            </div>
          </Tooltip>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Mobile Search Button */}
          {isMobile && (
            <Tooltip content="Search" position="bottom">
              <button className="p-2 rounded-lg hover:bg-[#F6F8FB] transition-colors">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              </button>
            </Tooltip>
          )}

          {/* Refresh Button */}
          <Tooltip content="Refresh data" position="bottom">
            <button className="p-2 rounded-lg hover:bg-[#F6F8FB] transition-colors">
              <ArrowPathIcon className="w-5 h-5 text-gray-500" />
            </button>
          </Tooltip>

          {/* Help Button */}
          <Tooltip content="Help & Documentation" position="bottom">
            <button className="p-2 rounded-lg hover:bg-[#F6F8FB] transition-colors">
              <QuestionMarkCircleIcon className="w-5 h-5 text-gray-500" />
            </button>
          </Tooltip>

          {/* Plant Selector */}
          <Tooltip content="Select plant" position="bottom">
            <select className="hidden sm:block px-2 py-1 bg-[#F6F8FB] border border-[#E5E7EB] rounded-lg text-sm text-[#1F2229] focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none">
              <option>Plant A</option>
              <option>Plant B</option>
            </select>
          </Tooltip>

          {/* Shift Selector */}
          <Tooltip content="Select shift" position="bottom">
            <select className="hidden sm:block px-2 py-1 bg-[#F6F8FB] border border-[#E5E7EB] rounded-lg text-sm text-[#1F2229] focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none">
              <option>Shift 1</option>
              <option>Shift 2</option>
            </select>
          </Tooltip>

          {/* Notifications */}
          <Tooltip content="Notifications" position="bottom">
            <button className="relative p-2 rounded-lg hover:bg-[#F6F8FB] transition-colors">
              <BellIcon className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </Tooltip>

          {/* Dark Mode Toggle */}
          <Tooltip content={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} position="bottom">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden sm:block p-2 rounded-lg hover:bg-[#F6F8FB] transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </Tooltip>

          {/* User Avatar */}
          <Tooltip content="User profile & settings" position="bottom">
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F6F8FB] transition-colors">
              <UserCircleIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gray-500" />
              <span className="hidden sm:block text-sm font-medium text-[#1F2229]">Admin</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};