// src/features/dashboard/components/ShiftProduction.tsx

import { MachineGroup } from '../types/dashboard';

interface ShiftProductionProps {
  groups: MachineGroup[];
  onRefreshRow?: (machine: string, plan: string) => Promise<void>;
  onRefreshAll?: () => void;
}

export function ShiftProduction({
  groups,
  onRefreshRow,
  onRefreshAll,
}: ShiftProductionProps) {
  return (
    <div className="bg-white rounded-[4px] border border-[#E5E7EB] shadow-sm p-5">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#6B7280] mb-2">Shift production</p>
          <h2 className="text-[20px] font-semibold text-[#111827]">Production summary</h2>
        </div>
        <button
          type="button"
          onClick={onRefreshAll}
          className="inline-flex h-10 items-center justify-center rounded-[8px] border border-[#D1D5DB] bg-white px-4 text-[12px] font-semibold text-[#111827] transition hover:border-[#9CA3AF] hover:bg-[#F9FAFB]"
        >
          Refresh all
        </button>
      </div>

      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.machine} className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm">
            <div className="bg-[#EFF6FF] px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#2563EB] mb-1">Machine</p>
                  <h3 className="text-[28px] font-semibold text-[#2563EB]">{group.machine}</h3>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative min-w-[180px]">
                    <select
                      className="h-11 w-full rounded-[10px] border border-[#D1D5DB] bg-white px-3 text-[13px] font-medium text-[#111827] outline-none"
                      aria-label="Select operator"
                    >
                      <option value="operator">{group.equipmentLabel}</option>
                      <option value="operator-1">Operator 1</option>
                      <option value="operator-2">Operator 2</option>
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#6B7280]">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRefreshRow?.(group.machine, group.rows[0]?.plan ?? '')}
                    className="inline-flex h-11 items-center justify-center rounded-[10px] bg-[#2563EB] px-4 text-[13px] font-semibold text-white transition hover:bg-[#1D4ED8]"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] px-4 py-4 sm:px-5 sm:py-5">
              <div className="hidden md:grid grid-cols-[130px_minmax(240px,1fr)_96px_96px_96px_56px] gap-x-3 text-[11px] uppercase tracking-[0.18em] text-[#6B7280]">
                <div>Plan</div>
                <div>Part</div>
                <div className="text-right">Produced</div>
                <div className="text-right">Accepted</div>
                <div className="text-right">Rejected</div>
                <div className="text-center">Action</div>
              </div>

              <div className="mt-4 space-y-3">
                {group.rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-1 gap-3 rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFF] p-4 md:grid-cols-[130px_minmax(240px,1fr)_96px_96px_96px_56px] md:items-center"
                  >
                    <div>
                      <p className="text-[11px] text-[#6B7280] md:hidden">Plan</p>
                      <div className="text-[13px] font-semibold text-[#111827]">{row.plan}</div>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#6B7280] md:hidden">Part</p>
                      <div className="text-[13px] text-[#111827] break-words">{row.part}</div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-[#6B7280] md:hidden">Produced</p>
                      <div className="text-[13px] font-semibold text-[#111827]">{row.produced.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-[#6B7280] md:hidden">Accepted</p>
                      <div className="text-[13px] font-semibold text-[#16A34A]">{row.accepted.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-[#6B7280] md:hidden">Rejected</p>
                      <div className="text-[13px] font-semibold text-[#DC2626]">{row.rejected.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => onRefreshRow?.(group.machine, row.plan)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm transition hover:bg-[#EFF6FF]"
                        title="Refresh row"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
