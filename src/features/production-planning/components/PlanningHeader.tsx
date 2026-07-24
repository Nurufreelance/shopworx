// src/features/production-planning/components/PlanningHeader.tsx

import React from 'react';
import PlanningToolbar from './PlanningToolbar';

// ===== Helper Components =====

const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-[#1F2937] text-white text-[10px] rounded whitespace-nowrap z-50 pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
};

const IconButton = ({ 
  children, 
  onClick, 
  tooltip,
  ariaLabel 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  tooltip: string;
  ariaLabel: string;
}) => {
  return (
    <Tooltip content={tooltip}>
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        className="p-1.5 rounded-full hover:bg-[#F9FAFB] transition-colors duration-150 cursor-pointer group"
      >
        <span className="text-[#6B7280] group-hover:text-[#3048A8] transition-colors duration-150">
          {children}
        </span>
      </button>
    </Tooltip>
  );
};

// ===== Main Header Component =====

interface PlanningHeaderProps {
  onRefresh: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInfoClick?: () => void;
  onSettingsClick?: () => void;
  onSyncClick?: () => void;
  onHelpClick?: () => void;
  // Toolbar actions
  onAddPlan: () => void;
  onReorder: () => void;
  onFilters: () => void;
}

export default function PlanningHeader({
  onRefresh,
  searchQuery,
  onSearchChange,
  onInfoClick,
  onSettingsClick,
  onSyncClick,
  onHelpClick,
  onAddPlan,
  onReorder,
  onFilters,
}: PlanningHeaderProps) {
  return (
    <div className="bg-white">
      {/* Row 1: Title + Icons | Search + Icons */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-[18px] font-medium text-[#111827]">Production Planning</h1>
          <div className="flex items-center gap-0.5 ml-1">
            <IconButton onClick={onInfoClick} tooltip="Information" ariaLabel="Information">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </IconButton>
            <IconButton onClick={onSettingsClick} tooltip="Settings" ariaLabel="Settings">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </IconButton>
            <IconButton onClick={onRefresh} tooltip="Refresh" ariaLabel="Refresh">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </IconButton>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reports & insights"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-[380px] pl-9 pr-4 py-1.5 text-[13px] text-[#111827] placeholder-[#6B7280] bg-white border border-[#D1D5DB] rounded-full focus:ring-2 focus:ring-[#3048A8] focus:border-transparent outline-none transition-all"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <IconButton onClick={onSyncClick} tooltip="Sync data" ariaLabel="Sync data">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </IconButton>
          <IconButton onClick={onHelpClick} tooltip="Help" ariaLabel="Help">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </IconButton>
          <div className="w-7 h-7 rounded-full bg-[#3048A8] flex items-center justify-center text-white text-xs font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Row 2: Date + Toolbar */}
      <div className="flex items-center justify-between px-4 pb-3">
        <p className="text-[16px] text-[#6B7280]">11 Jul, 2026 - 11 Jul, 2026</p>
        <PlanningToolbar
          onAddPlan={onAddPlan}
          onReorder={onReorder}
          onFilters={onFilters}
        />
      </div>
    </div>
  );
}