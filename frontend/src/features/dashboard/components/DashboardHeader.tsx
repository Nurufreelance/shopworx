// src/features/dashboard/components/DashboardHeader.tsx

import React, { useState } from 'react';

interface DashboardHeaderProps {
  shift?: string;
  date?: string;
  onRefresh?: () => void;
  onShiftChange?: (shift: string, date: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  shift = 'Shift1',
  date = '2026-07-24',
  onRefresh,
  onShiftChange,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(shift);
  const [selectedDate, setSelectedDate] = useState(date);

  const handleApply = () => {
    onShiftChange?.(selectedShift, selectedDate);
    setIsPopupOpen(false);
  };

  return (
    <div className="flex items-center gap-3 relative">
      {/* Shift summary label */}
      <span className="text-[13px] font-medium text-[#1F2937] whitespace-nowrap">Shift summary</span>
      
      {/* Clickable pill - opens popup */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-[4px] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
      >
        <span className="text-[12px] font-medium text-[#33479A]">{shift}, {date}</span>
      </button>

      {/* Refresh Icon */}
      <button
        onClick={onRefresh}
        className="p-1 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6] rounded-full transition-all duration-150"
        title="Refresh"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Popup - Date and Shift selector */}
      {isPopupOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setIsPopupOpen(false)} />
          <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-[8px] border border-[#E5E7EB] shadow-lg w-[240px] p-4">
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 text-[13px] text-[#1F2937] bg-white border border-[#E5E7EB] rounded-[4px] focus:outline-none focus:border-[#33479A] focus:ring-1 focus:ring-[#33479A]"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider">Shift</label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="w-full mt-1 px-3 py-1.5 text-[13px] text-[#1F2937] bg-white border border-[#E5E7EB] rounded-[4px] focus:outline-none focus:border-[#33479A] focus:ring-1 focus:ring-[#33479A]"
                >
                  <option value="Shift1">Shift 1</option>
                  <option value="Shift2">Shift 2</option>
                  <option value="Shift3">Shift 3</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[#E5E7EB]">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="flex-1 px-3 py-1.5 text-[12px] font-medium text-[#6B7280] hover:bg-[#F3F4F6] rounded-[4px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-3 py-1.5 text-[12px] font-medium text-white bg-[#33479A] hover:bg-[#2A3D82] rounded-[4px] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};