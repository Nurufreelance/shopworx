// src/features/production-log/components/ProductionSummaryBar.tsx

import React from 'react';

interface ProductionSummaryBarProps {
  totalRecords: number;
  selectedShift: string;
  selectedMachine: string | null;
  onFilter: () => void;
  filterOpen: boolean;
}

export default function ProductionSummaryBar({
  totalRecords,
  selectedShift,
  selectedMachine,
  onFilter,
  filterOpen,
}: ProductionSummaryBarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white">
      {/* Left: Shift Title */}
      <div className="flex items-center gap-4">
        <span className="text-[18px] font-medium text-[#3048A8]">{selectedShift}</span>
      </div>

      {/* Right: Summary Info + Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
          <span>{totalRecords} of {totalRecords} records</span>
          <span className="text-[#E5E7EB]">|</span>
          <span>{selectedMachine || 'All Machines'}</span>
          <span className="text-[#E5E7EB]">|</span>
          <span>All Shifts</span>
          <span className="text-[#E5E7EB]">|</span>
          <span>11 Jul 2026</span>
        </div>

        {/* Filter Button */}
        <button
          onClick={onFilter}
          className={`p-1.5 rounded hover:bg-[#F6F8FB] transition-colors ${
            filterOpen ? 'bg-[#F6F8FB] text-[#3048A8]' : 'text-[#6B7280]'
          }`}
          aria-label="Filter"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}