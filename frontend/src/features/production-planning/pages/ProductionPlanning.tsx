// src/features/production-planning/pages/ProductionPlanning.tsx

import { useState, useEffect } from 'react';
import ProductionList from '../components/ProductionList';
import PlanningToolbar from '../components/PlanningToolbar';
import FiltersDrawer from '../components/FiltersDrawer';
import { useProductionPlans } from '../hooks/useProductionPlanning';

export default function ProductionPlanning() {
  const [loading, setLoading] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'overview' | 'production' | 'timeline' | 'planning' | 'jobs'>('overview');

  const { data: plans = [], refetch } = useProductionPlans({
    machine: selectedMachine || undefined,
    shift: selectedShift !== 'all' ? selectedShift : undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    date: selectedDate,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-[#F4F5F7]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Compact */}
        <div className="bg-[#F7F8FA] border-b border-[#D8DDE6] px-4 flex-shrink-0" style={{ height: '48px' }}>
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <h1 className="text-[16px] font-medium text-[#1A1F36]">Production Planning</h1>
              <span className="text-[12px] text-[#7C8798]">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short',
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <PlanningToolbar 
              onRefresh={refetch} 
              onFiltersToggle={() => setIsFiltersOpen(true)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[#D8DDE6] px-4 flex-shrink-0" style={{ height: '40px' }}>
          <div className="flex items-center gap-6 h-full">
            {['Overview', 'Production', 'Timeline', 'Planning', 'Jobs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setViewMode(tab.toLowerCase() as any)}
                className={`text-[12px] font-medium h-full border-b-2 transition-colors ${
                  viewMode === tab.toLowerCase() 
                    ? 'border-[#3B82C4] text-[#1A1F36]' 
                    : 'border-transparent text-[#7C8798] hover:text-[#1A1F36]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border-b border-[#D8DDE6] px-4 flex-shrink-0" style={{ height: '44px' }}>
          <div className="flex items-center h-full">
            {/* Left Group - Actions */}
            <div className="flex items-center gap-2">
              <select className="h-8 px-3 text-[12px] bg-[#F7F8FA] border border-[#D8DDE6] rounded-[2px] focus:outline-none focus:border-[#3B82C4] text-[#1A1F36]">
                <option>HT-28</option>
                <option>HT-29</option>
                <option>HT-30</option>
                <option>HT-31</option>
              </select>

              <div className="w-px h-5 bg-[#D8DDE6]" />

              <button className="h-8 px-3 text-[12px] font-medium text-white bg-[#3B82C4] hover:bg-[#2F6FA3] rounded-[2px] transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                Add New Plan
              </button>

              <button className="h-8 px-3 text-[12px] font-medium text-[#424B5A] bg-[#F7F8FA] hover:bg-[#EEF0F3] rounded-[2px] transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Re-order
              </button>

              <button className="h-8 px-3 text-[12px] font-medium text-[#424B5A] bg-[#F7F8FA] hover:bg-[#EEF0F3] rounded-[2px] transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
                Expand All
              </button>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right Group - Utilities */}
            <div className="flex items-center gap-1">
              <button className="h-8 px-3 text-[12px] font-medium text-[#424B5A] bg-[#F7F8FA] hover:bg-[#EEF0F3] rounded-[2px] transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Views ▼
              </button>

              <div className="relative w-[180px]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-8 pl-7 pr-3 text-[12px] bg-[#F7F8FA] border border-[#D8DDE6] rounded-[2px] focus:outline-none focus:border-[#3B82C4] placeholder:text-[#A0A8B5]"
                />
                <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A0A8B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button className="p-1.5 text-[#7C8798] hover:text-[#1A1F36] hover:bg-[#F7F8FA] rounded-[2px] transition-colors" title="Refresh">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              <button className="p-1.5 text-[#7C8798] hover:text-[#1A1F36] hover:bg-[#F7F8FA] rounded-[2px] transition-colors" title="Filters" onClick={() => setIsFiltersOpen(true)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>

              <button className="p-1.5 text-[#7C8798] hover:text-[#1A1F36] hover:bg-[#F7F8FA] rounded-[2px] transition-colors" title="Export">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              <button className="p-1.5 text-[#7C8798] hover:text-[#1A1F36] hover:bg-[#F7F8FA] rounded-[2px] transition-colors" title="Settings">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Table - Full remaining space with scroll */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="h-full overflow-y-scroll overflow-x-scroll">
            <ProductionList 
              data={plans} 
              loading={loading}
              onSelectMachine={setSelectedMachine}
            />
          </div>
        </div>
      </div>

      {/* Filters Drawer */}
      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
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