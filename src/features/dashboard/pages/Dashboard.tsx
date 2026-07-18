import { useState } from 'react';
import { ShiftOEE } from '../components/ShiftOEE';
import { ShiftProduction } from '../components/ShiftProduction';
import { ShiftDowntime } from '../components/ShiftDowntime';

export default function Dashboard() {
  const [selectedShift, setSelectedShift] = useState<'A' | 'B' | 'C'>('A');

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Shift Selector */}
      <div className="flex gap-2 mb-4">
        {(['A', 'B', 'C'] as const).map((shift) => (
          <button
            key={shift}
            onClick={() => setSelectedShift(shift)}
            className={`px-4 py-1.5 text-[11px] font-medium rounded transition-colors ${
              selectedShift === shift
                ? 'bg-[#2F6BFF] text-white'
                : 'bg-[#F6F8FB] text-[#6B7280] hover:bg-gray-200'
            }`}
          >
            Shift {shift}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN - Shift OEE */}
        <div className="p-1">
          <ShiftOEE shift={selectedShift} />
        </div>

        {/* RIGHT COLUMN - Shift Production + Shift Downtime */}
        <div className="p-1 space-y-4">
          <ShiftProduction shift={selectedShift} />
          <ShiftDowntime shift={selectedShift} />
        </div>
      </div>
    </div>
  );
}