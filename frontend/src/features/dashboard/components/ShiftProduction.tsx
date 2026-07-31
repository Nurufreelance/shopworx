// src/features/dashboard/components/ShiftProduction.tsx

import React, { useState } from 'react';
import { MachineGroup, ProductionRow } from '../types/dashboard';

interface ShiftProductionProps {
  groups: MachineGroup[];
  onRefreshRow?: (machine: string, plan: string) => Promise<void>;
  onRefreshAll?: () => void;
}

export const ShiftProduction: React.FC<ShiftProductionProps> = ({
  groups,
  onRefreshRow,
  onRefreshAll,
}) => {
  return (
    <div className="bg-white rounded-[12px] border border-[#F1F5F9] shadow-sm p-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-[#1F2937]">Shift production</h2>
        <button
          onClick={onRefreshAll}
          className="p-1.5 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F3F4F6] rounded-full transition-all duration-150"
          title="Refresh all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Machine Groups */}
      <div className="space-y-6">
        {groups.map((group, index) => (
          <div key={group.machine}>
            {/* Machine Title */}
            <div className="text-[16px] font-medium text-[#2F6BFF] mb-1.5">
              {group.machine}
            </div>

            {/* Equipment Selector */}
            <div className="flex items-center gap-2 bg-[#F6F8FB] rounded-[6px] px-3 py-1.5 mb-3 border border-[#E5E7EB] cursor-pointer hover:bg-[#EEF0F4] transition-colors">
              <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[12px] text-[#1F2937] flex-1">{group.equipmentLabel}</span>
              <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Production Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium">Plan</th>
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium">Part</th>
                    <th className="text-right py-1.5 pr-4 text-[#6B7280] font-medium">Produced</th>
                    <th className="text-right py-1.5 pr-4 text-[#6B7280] font-medium">Accepted</th>
                    <th className="text-right py-1.5 pr-4 text-[#6B7280] font-medium">Rejected</th>
                    <th className="text-center py-1.5 pl-3 text-[#6B7280] font-medium w-[30px]">
                      <svg className="w-3.5 h-3.5 text-[#2F6BFF] mx-auto cursor-pointer hover:text-[#1A4FD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-[#F6F8FB] hover:bg-[#F6F8FB] transition-colors duration-150">
                      <td className="py-1.5 pr-4 text-[#1F2937] font-medium">{row.plan}</td>
                      <td className="py-1.5 pr-4 text-[#6B7280]">{row.part}</td>
                      <td className="py-1.5 pr-4 text-right font-medium text-[#1F2937]">
                        {row.produced.toLocaleString()}
                      </td>
                      <td className="py-1.5 pr-4 text-right font-medium text-[#31B86A]">
                        {row.accepted.toLocaleString()}
                      </td>
                      <td className="py-1.5 pr-4 text-right font-medium text-[#EF5350]">
                        {row.rejected.toLocaleString()}
                      </td>
                      <td className="py-1.5 pl-3 text-center">
                        <button
                          onClick={() => onRefreshRow?.(group.machine, row.plan)}
                          className="p-1 rounded-full hover:bg-[#F3F4F6] transition-colors"
                          title="Refresh this row"
                        >
                          <svg className="w-3.5 h-3.5 text-[#2F6BFF] mx-auto hover:text-[#1A4FD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Divider between machine groups */}
            {index < groups.length - 1 && (
              <div className="mt-4 border-t border-[#F0F0F0]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};