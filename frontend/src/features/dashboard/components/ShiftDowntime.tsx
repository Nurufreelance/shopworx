// ==================== SHIFT DOWNTIME ====================
// src/features/dashboard/components/ShiftDowntime.tsx

import { useState } from 'react';

interface ShiftDowntimeProps {
  shift?: string;
}

interface DowntimeRow {
  machine: string;
  startTime: string;
  endTime: string;
  reason: string;
  isPlanned: string;
}

const downtimeData: DowntimeRow[] = [
  { machine: 'LI-44-HXM-830', startTime: '10:53:17', endTime: '10:53:30', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:52:35', endTime: '10:52:45', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:51:53', endTime: '10:52:04', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:49:40', endTime: '10:49:54', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:48:57', endTime: '10:49:09', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:47:34', endTime: '10:47:41', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:46:53', endTime: '10:47:02', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:45:36', endTime: '10:46:21', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:43:55', endTime: '10:45:04', reason: '', isPlanned: '' },
  { machine: 'LI-44-HXM-830', startTime: '10:41:18', endTime: '10:43:24', reason: '', isPlanned: '' },
];

export function ShiftDowntime({ shift = 'Shift2, 2026-07-20' }: ShiftDowntimeProps) {
  return (
    <div className="bg-white rounded-[8px] border border-[#E5E7EB] shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-medium text-[#1F2937]">Shift downtime</h3>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#6B7280] cursor-pointer hover:text-[#1F2937]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>

      {/* Machine Title - Blue like production */}
      <div className="text-[16px] font-medium text-[#2F6BFF] mb-3">
        LI-44-HXM-830
      </div>

      {/* Downtime Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[10px] border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left py-1.5 pr-3 text-[#6B7280] font-medium">Machine</th>
              <th className="text-left py-1.5 pr-3 text-[#6B7280] font-medium">Downtime start</th>
              <th className="text-left py-1.5 pr-3 text-[#6B7280] font-medium">Downtime end</th>
              <th className="text-left py-1.5 pr-3 text-[#6B7280] font-medium">Reason</th>
              <th className="text-left py-1.5 pr-3 text-[#6B7280] font-medium">Is planned</th>
            </tr>
          </thead>
          <tbody>
            {downtimeData.map((row, index) => (
              <tr key={index} className="border-b border-[#F6F8FB] hover:bg-[#F6F8FB] transition-colors duration-150">
                <td className="py-1.5 pr-3 text-[#1F2937] font-medium">{row.machine}</td>
                <td className="py-1.5 pr-3 text-[#6B7280]">{row.startTime}</td>
                <td className="py-1.5 pr-3 text-[#6B7280]">{row.endTime}</td>
                <td className="py-1.5 pr-3 text-[#6B7280]">{row.reason || '-'}</td>
                <td className="py-1.5 pr-3 text-[#6B7280]">{row.isPlanned || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}