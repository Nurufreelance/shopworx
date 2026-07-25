// src/components/layout/Header/Header.tsx

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  QuestionMarkCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';
import { useMobile } from '@context/MobileContext';
import { cn } from '@utils/cn';

// Pages that should NOT show the header
const HIDDEN_HEADER_PAGES = ['/live-shopfloor'];

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isMobile } = useMobile();
  const location = useLocation();

  // Hide header on Live Shopfloor
  if (HIDDEN_HEADER_PAGES.includes(location.pathname)) {
    return null;
  }

  // Get page title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home' || path === '/dashboard') return 'Dashboard';
    if (path.includes('production-planning')) return 'Production Planning';
    if (path.includes('production-log')) return 'Production Log';
    if (path.includes('downtime-log')) return 'Downtime Log';
    if (path.includes('master-data')) return 'Master Data';
    if (path.includes('reports/production')) return 'Production Report';
    if (path.includes('reports/downtime')) return 'Downtime Report';
    if (path.includes('reports/quality')) return 'Quality Report';
    if (path.includes('reports/performance')) return 'Performance Report';
    return '';
  };

  return (
    <header className="bg-white border-b border-[#E5E7EB] px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Page Title */}
        <div className="flex items-center">
          <h1 className="text-[15px] font-semibold text-[#1F2937]">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-5">
          {/* Search Bar - Pill shaped */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports & insights"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px] sm:w-[300px] lg:w-[380px] h-10 pl-12 pr-4 bg-white border border-[#D1D5DB] rounded-full text-[14px] text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all duration-200"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9CA3AF]" />
          </div>

          {/* Sync Icon */}
          <button 
            className="p-2 rounded-full hover:bg-[#F3F4F6] transition-all duration-150"
            title="Sync data"
          >
            <ArrowPathIcon className="w-[18px] h-[18px] text-[#6B7280]" />
          </button>

          {/* Help Icon */}
          <button 
            className="p-2 rounded-full hover:bg-[#F3F4F6] transition-all duration-150"
            title="Help & Documentation"
          >
            <QuestionMarkCircleIcon className="w-[18px] h-[18px] text-[#6B7280]" />
          </button>

          {/* Avatar - Blue circle with smiley emoji */}
          <button 
            className="w-10 h-10 rounded-full bg-[#3450D8] flex items-center justify-center hover:brightness-95 transition-all duration-150 text-[20px]"
            title="User profile"
          >
            😊
          </button>
        </div>
      </div>
    </header>
  );
};