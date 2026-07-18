import { useState } from 'react';

interface ShiftDowntimeProps {
  shift?: 'A' | 'B' | 'C';
}

export const ShiftDowntime = ({ shift = 'A' }: ShiftDowntimeProps) => {
  const [selectedShift, setSelectedShift] = useState<'A' | 'B' | 'C'>(shift);

  // Mock data - replace with real data later
  const records = [
    { machine: 'HT-29-HT-270', startTime: '07:25:54', endTime: '07:25:58', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:25:32', endTime: '07:25:35', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:25:10', endTime: '07:25:13', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:24:47', endTime: '07:24:51', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:24:25', endTime: '07:24:28', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:24:03', endTime: '07:24:06', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:23:40', endTime: '07:23:44', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:23:18', endTime: '07:23:21', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:22:56', endTime: '07:22:59', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:22:34', endTime: '07:22:37', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:22:11', endTime: '07:22:14', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:21:49', endTime: '07:21:52', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:21:27', endTime: '07:21:30', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:21:05', endTime: '07:21:08', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:20:42', endTime: '07:20:45', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:20:20', endTime: '07:20:23', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:19:58', endTime: '07:20:01', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:19:35', endTime: '07:19:39', reason: '', isPlanned: '' },
    { machine: 'HT-29-HT-270', startTime: '07:19:13', endTime: '07:19:16', reason: '', isPlanned: '' },
  ];

  return (
    <div className="shopworx-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-medium text-[#1F2937]">Shift Downtime</h3>
        <div className="flex gap-1">
          {(['A', 'B', 'C'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedShift(s)}
              className={`px-2.5 py-0.5 text-[10px] font-medium rounded transition-colors ${
                selectedShift === s
                  ? 'bg-[#2F6BFF] text-white'
                  : 'text-[#6B7280] hover:bg-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="text-[13px] font-medium text-[#3048A8] mb-2">
        HT-29-HT-270
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left py-1.5 text-[#6B7280] font-medium">Machine</th>
              <th className="text-left py-1.5 text-[#6B7280] font-medium">Start</th>
              <th className="text-left py-1.5 text-[#6B7280] font-medium">End</th>
              <th className="text-left py-1.5 text-[#6B7280] font-medium">Reason</th>
              <th className="text-left py-1.5 text-[#6B7280] font-medium">Planned</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index} className="border-b border-[#F6F8FB] hover:bg-[#F6F8FB] transition-colors">
                <td className="py-1 text-[#1F2937] font-medium">{record.machine}</td>
                <td className="py-1 text-[#6B7280]">{record.startTime}</td>
                <td className="py-1 text-[#6B7280]">{record.endTime}</td>
                <td className="py-1 text-[#6B7280]">{record.reason || '-'}</td>
                <td className="py-1 text-[#6B7280]">{record.isPlanned || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-2 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#6B7280]">Shift summary</span>
          <span className="text-[11px] font-medium text-[#1F2937]">Shift1, 2026-07-14</span>
        </div>
      </div>
    </div>
  );
};