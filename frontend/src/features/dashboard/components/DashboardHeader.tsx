// src/features/dashboard/components/DashboardHeader.tsx

import React from 'react';
import { Shift } from '../types/dashboard';

interface DashboardHeaderProps {
  shifts: Shift[];
  selectedShiftId: string | null;
  onShiftChange: (shiftId: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  shifts,
  selectedShiftId,
  onShiftChange,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] px-4 py-3">
      <div className="flex items-center max-w-7xl mx-auto">
        <h1 className="text-[20px] font-bold text-[#1E293B] whitespace-nowrap">
          Shift summary
        </h1>
        <select
          value={selectedShiftId || ''}
          onChange={(e) => onShiftChange(e.target.value)}
          className="ml-4 px-3 py-1.5 text-[14px] font-medium text-[#1E3A8A] bg-white border border-[#1E3A8A] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 cursor-pointer"
        >
          {shifts.map((shift) => (
            <option key={shift.id} value={shift.id}>
              {shift.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};