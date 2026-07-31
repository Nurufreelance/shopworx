import { useState, useEffect } from 'react';
import SummaryCards from '../components/SummaryCards';
import ProductionList from '../components/ProductionList';
import PlanningToolbar from '../components/PlanningToolbar';
import RightFilterPanel from '@components/layout/RightFilterPanel';
import { useProductionPlans } from '../hooks/useProductionPlanning';

export default function ProductionPlanning() {
  const [loading, setLoading] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: plans = [], refetch } = useProductionPlans({
    machine: selectedMachine || undefined,
    shift: selectedShift !== 'all' ? selectedShift : undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    date: selectedDate,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    planned: plans.length,
    running: plans.filter(p => p.status === 'running').length,
    stopped: plans.filter(p => p.status === 'stopped').length,
    idle: plans.filter(p => p.status === 'idle').length,
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Title and Toolbar */}
        <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[24px] font-medium text-[#1F2937]">Production Planning</h1>
              <p className="text-[12px] text-[#6B7280]">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <PlanningToolbar onRefresh={refetch} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="px-6 py-4">
          <SummaryCards stats={stats} />
        </div>

        {/* Production List */}
        <div className="flex-1 overflow-hidden px-6">
          <ProductionList 
            data={plans} 
            loading={loading}
            onSelectMachine={setSelectedMachine}
          />
        </div>
      </div>

      {/* Right Filter Panel */}
      <RightFilterPanel
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        selectedShift={selectedShift}
        onShiftChange={setSelectedShift}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedMachine={selectedMachine}
        onMachineChange={setSelectedMachine}
      />
    </div>
  );
}