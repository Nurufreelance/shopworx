// src/features/production-planning/components/PlanningToolbar.tsx

import React, { useState, useRef, useEffect } from 'react';

interface PlanningToolbarProps {
  onAddPlan: () => void;
  onReorder: () => void;
  onFilters: () => void;
}

// (Tooltip and CustomDropdown components as before, but keep them inside)
// For brevity, I'll include them inline.

export default function PlanningToolbar({
  onAddPlan,
  onReorder,
  onFilters,
}: PlanningToolbarProps) {
  const [viewMode, setViewMode] = useState('List');
  const viewOptions = ['List', 'Grid', 'Calendar'];

  return (
    <div className="flex items-center gap-2">
      {/* Equipment Change */}
      <button className="flex items-center gap-1.5 px-3 py-1 bg-[#22C55E] text-white text-[12px] font-medium rounded-[4px] hover:bg-[#16A34A] transition-colors whitespace-nowrap">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Equipment Change
      </button>

      {/* Add New Plan */}
      <button
        onClick={onAddPlan}
        className="flex items-center gap-1.5 px-3 py-1 bg-[#3048A8] text-white text-[12px] font-medium rounded-[4px] hover:bg-[#1A2D6B] transition-colors whitespace-nowrap"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add New Plan
      </button>

      {/* Re-order Plans */}
      <button
        onClick={onReorder}
        className="flex items-center gap-1.5 px-3 py-1 border border-[#3048A8] text-[#3048A8] text-[12px] font-medium rounded-[4px] hover:bg-[#F0F4FF] transition-colors whitespace-nowrap"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        Re-order Plans
      </button>

      {/* Separator */}
      <span className="w-px h-5 bg-[#E5E7EB]" />

      {/* List Dropdown */}
      <CustomDropdown value={viewMode} options={viewOptions} onChange={setViewMode} />

      {/* Filters */}
      <button
        onClick={onFilters}
        className="flex items-center gap-1.5 px-3 py-1 border border-[#3048A8] text-[#3048A8] text-[12px] font-medium rounded-[4px] hover:bg-[#F0F4FF] transition-colors whitespace-nowrap"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </button>
    </div>
  );
}

// CustomDropdown component (same as before, but with compact styling)
const CustomDropdown = ({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1 text-[12px] text-[#111827] bg-white border border-[#E5E7EB] rounded-[4px] hover:bg-[#F9FAFB] transition-colors whitespace-nowrap"
      >
        {value}
        <svg className={`w-3.5 h-3.5 text-[#6B7280] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 py-1 bg-white border border-[#E5E7EB] rounded-[4px] shadow-lg min-w-[100px] z-50">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full px-3 py-1.5 text-[12px] text-left hover:bg-[#F9FAFB] transition-colors ${opt === value ? 'text-[#3048A8] font-medium' : 'text-[#111827]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};