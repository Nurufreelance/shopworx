// src/features/dashboard/components/ShiftDowntime.tsx

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
  { machine: 'LI-44-HXM-830', startTime: '10:53:17', endTime: '10:53:30', reason: 'Tool change', isPlanned: 'Yes' },
  { machine: 'LI-44-HXM-830', startTime: '10:52:35', endTime: '10:52:45', reason: 'Material jam', isPlanned: 'No' },
  { machine: 'LI-44-HXM-830', startTime: '10:51:53', endTime: '10:52:04', reason: 'Quality check', isPlanned: 'Yes' },
  { machine: 'LI-44-HXM-830', startTime: '10:49:40', endTime: '10:49:54', reason: 'Sensor fault', isPlanned: 'No' },
  { machine: 'LI-44-HXM-830', startTime: '10:48:57', endTime: '10:49:09', reason: 'Line adjustment', isPlanned: 'Yes' },
  { machine: 'LI-44-HXM-830', startTime: '10:47:34', endTime: '10:47:41', reason: 'Operator pause', isPlanned: 'No' },
  { machine: 'LI-44-HXM-830', startTime: '10:46:53', endTime: '10:47:02', reason: 'Clamp reset', isPlanned: 'Yes' },
  { machine: 'LI-44-HXM-830', startTime: '10:45:36', endTime: '10:46:21', reason: 'Low pressure', isPlanned: 'No' },
  { machine: 'LI-44-HXM-830', startTime: '10:43:55', endTime: '10:45:04', reason: 'Mold clean', isPlanned: 'Yes' },
  { machine: 'LI-44-HXM-830', startTime: '10:41:18', endTime: '10:43:24', reason: 'Power cycle', isPlanned: 'No' },
];

export function ShiftDowntime({ shift = 'Shift2, 2026-07-20' }: ShiftDowntimeProps) {
  return (
    <div className="bg-white rounded-[4px] border border-[#E5E7EB] shadow-sm p-5">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#6B7280] mb-2">Shift downtime</p>
          <h2 className="text-[20px] font-semibold text-[#111827]">Recent downtime events</h2>
        </div>
        <span className="text-[12px] font-medium text-[#2563EB]">{shift}</span>
      </div>

      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-[180px_120px_120px_minmax(200px,1fr)_96px] gap-x-3 px-3 text-[11px] uppercase tracking-[0.18em] text-[#6B7280] mb-2">
          <div>Machine</div>
          <div>Start</div>
          <div>End</div>
          <div>Reason</div>
          <div className="text-center">Planned</div>
        </div>

        {downtimeData.map((row, index) => (
          <div
            key={index}
            className="rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] p-4 shadow-sm transition hover:border-[#D1D5DB]"
          >
            <div className="grid gap-3 md:grid-cols-[180px_120px_120px_minmax(200px,1fr)_96px] md:items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6B7280] md:hidden">Machine</p>
                <p className="text-[13px] font-semibold text-[#111827]">{row.machine}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6B7280] md:hidden">Start</p>
                <p className="text-[13px] text-[#374151]">{row.startTime}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6B7280] md:hidden">End</p>
                <p className="text-[13px] text-[#374151]">{row.endTime}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#6B7280] md:hidden">Reason</p>
                <p className="text-[13px] text-[#111827]">{row.reason}</p>
              </div>

              <div className="flex items-center justify-start md:justify-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                    row.isPlanned === 'Yes' ? 'bg-[#ECFDF5] text-[#15803D]' : 'bg-[#FEE2E2] text-[#B91C1C]'
                  }`}
                >
                  {row.isPlanned}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
