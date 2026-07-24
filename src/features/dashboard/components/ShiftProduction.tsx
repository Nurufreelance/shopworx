// ==================== SHIFT PRODUCTION ====================
// src/features/dashboard/components/ShiftProduction.tsx

import { useState } from 'react';

interface ShiftProductionProps {
  shift?: string;
}

interface ProductionRow {
  machine: string;
  plan: string;
  part: string;
  produced: number;
  accepted: number;
  rejected: number;
}

const productionData: ProductionRow[] = [
  { machine: 'HT-29-HT-270', plan: '100-7103', part: 'SFG - Crystal/Deep Bucket', produced: 0, accepted: 0, rejected: 0 },
  { machine: 'HT-30-HT-270', plan: '100-7104', part: 'Crystal Spoon', produced: 41465, accepted: 41201, rejected: 264 },
  { machine: 'HT-31-HT-270', plan: '100-7105', part: 'SFG - 50cc Cap', produced: 20022, accepted: 19408, rejected: 614 },
  { machine: 'HT-32-FERO-275', plan: '100-7106', part: 'SFG - 30gm Visita Cap', produced: 0, accepted: 0, rejected: 0 },
  { machine: 'HT-34-FERO-200', plan: '100-7107', part: 'Clear Jar 500ml', produced: 8923, accepted: 8845, rejected: 78 },
  { machine: 'HT-35-HXH-260', plan: '100-7108', part: 'White Lid 40mm', produced: 15678, accepted: 15590, rejected: 88 },
  { machine: 'HT-36-HT-270', plan: '100-7109', part: 'Blue Cap 28mm', produced: 22345, accepted: 22200, rejected: 145 },
  { machine: 'HT-37-HT-270', plan: '100-7110', part: 'Green Cap 32mm', produced: 18765, accepted: 18540, rejected: 225 },
];

export function ShiftProduction({ shift = 'Shift2, 2026-07-20' }: ShiftProductionProps) {
  // Group by machine
  const groupedData = productionData.reduce((acc, row) => {
    if (!acc[row.machine]) {
      acc[row.machine] = [];
    }
    acc[row.machine].push(row);
    return acc;
  }, {} as Record<string, ProductionRow[]>);

  const machines = Object.keys(groupedData);

  return (
    <div className="bg-white rounded-[8px] border border-[#E5E7EB] shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-medium text-[#1F2937]">Shift production</h3>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#6B7280] cursor-pointer hover:text-[#1F2937]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      {/* Machine Sections - Continuous Panel Design */}
      <div className="space-y-6">
        {machines.map((machine, machineIndex) => {
          const rows = groupedData[machine];
          return (
            <div key={machineIndex}>
              {/* Machine Title - Blue, larger */}
              <div className="text-[16px] font-medium text-[#2F6BFF] mb-2">
                {machine}
              </div>

              {/* Equipment Selector */}
              <div className="flex items-center gap-2 bg-[#F6F8FB] rounded-[6px] px-3 py-1.5 mb-3 border border-[#E5E7EB] cursor-pointer hover:bg-[#EEF0F4] transition-colors">
                <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[12px] text-[#1F2937] flex-1">HT-29-HT-270</span>
                <svg className="w-3.5 h-3.5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Production Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="text-left py-1.5 pr-3 text-[#6B7280] font-medium">Plan</th>
                      <th className="text-left py-1.5 pr-3 text-[#6B7280] font-medium">Part</th>
                      <th className="text-right py-1.5 pr-3 text-[#6B7280] font-medium">Produced</th>
                      <th className="text-right py-1.5 pr-3 text-[#6B7280] font-medium">Accepted</th>
                      <th className="text-right py-1.5 pr-3 text-[#6B7280] font-medium">Rejected</th>
                      <th className="text-center py-1.5 pl-3 text-[#6B7280] font-medium w-[30px]">
                        <svg className="w-3.5 h-3.5 text-[#2F6BFF] mx-auto cursor-pointer hover:text-[#1A4FD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-[#F6F8FB] hover:bg-[#F6F8FB] transition-colors duration-150">
                        <td className="py-1.5 pr-3 text-[#1F2937]">{row.plan}</td>
                        <td className="py-1.5 pr-3 text-[#6B7280]">{row.part}</td>
                        <td className="py-1.5 pr-3 text-right font-medium text-[#1F2937]">
                          {row.produced.toLocaleString()}
                        </td>
                        <td className="py-1.5 pr-3 text-right text-[#31B86A] font-medium">
                          {row.accepted.toLocaleString()}
                        </td>
                        <td className="py-1.5 pr-3 text-right text-[#EF5350] font-medium">
                          {row.rejected.toLocaleString()}
                        </td>
                        <td className="py-1.5 pl-3 text-center">
                          <svg className="w-3.5 h-3.5 text-[#2F6BFF] mx-auto cursor-pointer hover:text-[#1A4FD4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Light separator between machines (except last) */}
              {machineIndex < machines.length - 1 && (
                <div className="mt-4 border-t border-[#F0F0F0]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}