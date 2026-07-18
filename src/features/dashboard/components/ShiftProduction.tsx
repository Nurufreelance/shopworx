import { useState } from 'react';

interface ShiftProductionProps {
  shift?: 'A' | 'B' | 'C';
}

export const ShiftProduction = ({ shift = 'A' }: ShiftProductionProps) => {
  const [selectedShift, setSelectedShift] = useState<'A' | 'B' | 'C'>(shift);

  // Mock data - replace with real data later
  const data = [
    { machine: 'HT-28-HT-270', plan: '100-7017', part: 'Darvinks Visita Flip Cap', produced: 8759, accepted: 8759, rejected: 0 },
    { machine: 'HT-29-HT-270', plan: '100-6982', part: 'SFG - Crystal/Deep Bucket', produced: 0, accepted: 0, rejected: 0 },
    { machine: 'HT-30-HT-270', plan: '100-7013', part: 'Crystal Spoon', produced: 41465, accepted: 41201, rejected: 264 },
    { machine: 'HT-32-FERO-275', plan: '100-7004', part: 'SFG - 50cc Cap', produced: 20022, accepted: 19408, rejected: 614 },
    { machine: 'HT-34-FERO-200', plan: '100-7019', part: 'SFG - 30gm Visita Cap', produced: 0, accepted: 0, rejected: 0 },
  ];

  return (
    <div className="shopworx-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-medium text-[#1F2937]">Shift Production</h3>
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

      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left py-1.5 text-[#6B7280] font-medium">Machine</th>
              <th className="text-left py-1.5 text-[#6B7280] font-medium">Plan</th>
              <th className="text-left py-1.5 text-[#6B7280] font-medium">Part</th>
              <th className="text-right py-1.5 text-[#6B7280] font-medium">Produced</th>
              <th className="text-right py-1.5 text-[#6B7280] font-medium">Accepted</th>
              <th className="text-right py-1.5 text-[#6B7280] font-medium">Rejected</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-[#F6F8FB] hover:bg-[#F6F8FB] transition-colors">
                <td className="py-1 font-medium text-[#1F2937]">{item.machine}</td>
                <td className="py-1 text-[#6B7280]">{item.plan}</td>
                <td className="py-1 text-[#6B7280]">{item.part}</td>
                <td className="py-1 text-right font-medium text-[#1F2937]">
                  {item.produced.toLocaleString()}
                </td>
                <td className="py-1 text-right text-[#31B86A] font-medium">
                  {item.accepted.toLocaleString()}
                </td>
                <td className="py-1 text-right text-[#EF5350] font-medium">
                  {item.rejected.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};