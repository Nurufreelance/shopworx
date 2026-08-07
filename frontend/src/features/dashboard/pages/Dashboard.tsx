// src/features/dashboard/pages/Dashboard.tsx

import { useMemo } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardHeader } from '../components/DashboardHeader';
import { ShiftOEE } from '../components/ShiftOEE';
import { ShiftProduction } from '../components/ShiftProduction';
import { ShiftDowntime } from '../components/ShiftDowntime';

const Dashboard = () => {
  const {
    shifts,
    selectedShiftId,
    setSelectedShiftId,
    data,
    error,
    refresh,
    refreshRow,
  } = useDashboard();

  const selectedShiftLabel = useMemo(
    () =>
      shifts.find((shift) => shift.id === selectedShiftId)?.label || data?.shift?.label || 'Shift',
    [shifts, selectedShiftId, data?.shift?.label]
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        <button onClick={refresh} className="px-4 py-2 bg-[#2F6BFF] text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      {/* Sticky Header */}
      <DashboardHeader
        shifts={shifts}
        selectedShiftId={selectedShiftId}
        onShiftChange={setSelectedShiftId}
      />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <ShiftOEE shift={selectedShiftLabel} />

          <div className="flex flex-col gap-4">
            <ShiftProduction
              groups={data?.productionGroups || []}
              onRefreshRow={refreshRow}
              onRefreshAll={refresh}
            />
            <ShiftDowntime shift={selectedShiftLabel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;