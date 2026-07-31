// src/features/dashboard/pages/Dashboard.tsx

import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardHeader } from '../components/DashboardHeader';
import { OEEDonut } from '../components/OEEDonut';
import { MetricCarousel } from '../components/MetricCarousel';
import { AvailabilityChart } from '../components/AvailabilityChart';
import { ParetoChart } from '../components/ParetoChart';
import { ShiftProduction } from '../components/ShiftProduction';

const Dashboard = () => {
  const { 
    shifts, 
    selectedShiftId, 
    setSelectedShiftId, 
    data, 
    loading, 
    error, 
    refresh,
    refreshRow,
  } = useDashboard();

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

  const metrics = data?.metrics || [];

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      {/* Sticky Header */}
      <DashboardHeader
        shifts={shifts}
        selectedShiftId={selectedShiftId}
        onShiftChange={setSelectedShiftId}
      />

      {/* Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Panel - Sticky on desktop */}
          <div className="lg:w-[380px] lg:sticky lg:top-[72px] lg:self-start lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto bg-[#FAFBFC] border-r border-[#E2E8F0] pr-4">
            <div className="bg-white rounded-[12px] border border-[#F1F5F9] shadow-sm p-4 space-y-6">
              
              {/* Block 1: Shift OEE */}
              <div>
                <h2 className="text-[14px] font-semibold text-[#1E293B] mb-3">Shift OEE</h2>
                <div className="flex flex-col items-center">
                  <OEEDonut
                    value={data?.oeeMetrics?.oee || 0}
                    trend={data?.oeeMetrics?.trend || 0}
                    label="OEE"
                  />
                  <div className="mt-4 w-full">
                    <MetricCarousel metrics={metrics} />
                  </div>
                </div>
              </div>

              {/* Block 2: Availability Comparison */}
              <div>
                <h2 className="text-[14px] font-semibold text-[#1E293B] mb-3">Availability comparision</h2>
                <AvailabilityChart
                  data={data?.availabilityComparison || []}
                  loading={loading}
                />
              </div>

              {/* Block 3: Downtime by Machine */}
              <div>
                <h2 className="text-[14px] font-semibold text-[#1E293B] mb-3">Downtime by machine</h2>
                <ParetoChart
                  data={data?.downtimeByMachine || []}
                  loading={loading}
                />
              </div>

              {/* Block 4: Downtime by Reason */}
              <div>
                <h2 className="text-[14px] font-semibold text-[#1E293B] mb-3">Downtime by reason</h2>
                <ParetoChart
                  data={data?.downtimeByReason || []}
                  loading={loading}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Shift Production */}
          <div className="flex-1">
            <ShiftProduction
              groups={data?.productionGroups || []}
              onRefreshRow={refreshRow}
              onRefreshAll={refresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;