// src/features/production-planning/pages/ProductionPlanning.tsx

import { useState, useEffect } from 'react';
import { ProductionPlan } from '../types/productionPlanning';
import { useProductionPlans } from '../hooks/useProductionPlanning';
import { PlanningTable } from '../components/PlanningTable';
import FiltersDrawer from '../components/FiltersDrawer';
import { AddPlanModal } from '../components/AddPlanModal';
import { ReorderPlansModal } from '../components/ReorderPlansModal';
import { TimelineView } from '../components/TimelineView';
import { EquipmentChangeModal } from '../components/EquipmentChangeModal';

export default function ProductionPlanning() {
  const [loading, setLoading] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2026-08-02T00:00:00'));
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [isEquipmentChangeOpen, setIsEquipmentChangeOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('table');
  const [listView, setListView] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [isListMenuOpen, setIsListMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [planItems, setPlanItems] = useState<ProductionPlan[]>([]);

  const { data: plans = [], refetch } = useProductionPlans({
    machine: selectedMachine || undefined,
    shift: selectedShift !== 'all' ? selectedShift : undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    date: selectedDate,
    listView,
    search: searchQuery || undefined,
  });

  useEffect(() => {
    setPlanItems(plans);
  }, [plans]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAddPlanSave = (newPlan: any) => {
    setPlanItems((prev) => [
      {
        id: `${Date.now()}`,
        planNumber: newPlan.part,
        part: { id: newPlan.part, name: newPlan.part, code: newPlan.part },
        color: { id: 'NA', name: 'NA', code: 'NA' },
        equipment: { id: newPlan.machine, name: newPlan.machine, code: newPlan.machine, department: 'Molding' },
        plannedQuantity: Number(newPlan.quantity) || 0,
        producedQuantity: 0,
        rejectedQuantity: 0,
        startDate: newPlan.startAt,
        endDate: newPlan.startAt,
        status: 'planned',
        priority: 'medium',
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Planner',
      },
      ...prev,
    ]);
    setIsAddPlanOpen(false);
  };

  const handleReorderSave = (reorderedPlans: any[]) => {
    setPlanItems(reorderedPlans);
  };

  const periodEnd = new Date(selectedDate);
  if (listView === 'Week') periodEnd.setDate(periodEnd.getDate() + 6);
  if (listView === 'Month') periodEnd.setDate(periodEnd.getDate() + 29);

  const visiblePlans = planItems;

  const handleFavoriteToggle = (planId: string) => {
    setPlanItems((prev) => prev.map((plan) => plan.id === planId ? { ...plan, isFavorite: !plan.isFavorite } : plan));
  };

  const handleCopyPlan = (planId: string) => {
    const plan = planItems.find((item) => item.id === planId);
    if (!plan) return;
    const copy = { ...plan, id: `${Date.now()}`, planNumber: `${plan.planNumber}-copy`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    setPlanItems((prev) => [copy, ...prev]);
  };

  const handleDeletePlan = (planId: string) => {
    setPlanItems((prev) => prev.filter((plan) => plan.id !== planId));
  };

  return (
    <div className="flex h-screen bg-[#F4F5F7]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-[#F7F8FA] border-b border-[#D8DDE6] px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[16px] font-semibold text-[#1A1F36]">Production Planning</h1>
          </div>
        </div>

        <div className="bg-white border-b border-[#D8DDE6] px-6 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#1A1F36]">
                {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - {periodEnd.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEquipmentChangeOpen(true)}
                className="h-10 inline-flex items-center gap-2 rounded-[4px] bg-[#10B981] px-4 text-[12px] font-semibold text-white hover:bg-[#0F766E] transition"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-white text-[#10B981]">↔</span>
                Equipment Change
              </button>
              <button
                type="button"
                onClick={() => setIsAddPlanOpen(true)}
                className="h-10 inline-flex items-center justify-center rounded-[4px] bg-[#2563EB] px-4 text-[12px] font-semibold text-white hover:bg-[#1D4ED8] transition"
              >
                + Add new plan
              </button>
              <button
                type="button"
                onClick={() => setIsReorderOpen(true)}
                className="h-10 inline-flex items-center justify-center rounded-[4px] border border-[#3B82C4] bg-white px-4 text-[12px] font-semibold text-[#3B82C4] hover:bg-[#EFF6FF] transition"
              >
                Re-order plans
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsListMenuOpen((prev) => !prev)}
                  className="h-10 inline-flex items-center justify-between rounded-[4px] border border-[#D8DDE6] bg-white px-4 text-[12px] font-medium text-[#1F2937] hover:bg-[#F8FAFC] transition"
                >
                  List
                  <span className="ml-2 text-[#6B7280]">▾</span>
                </button>
                {isListMenuOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-white shadow-lg">
                    {(['Day', 'Week', 'Month'] as const).map((view) => (
                      <button
                        key={view}
                        type="button"
                        onClick={() => {
                          setListView(view);
                          setIsListMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-[12px] text-[#1F2937] hover:bg-[#F8FAFC]"
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(true)}
                className="h-10 inline-flex items-center justify-center rounded-[4px] border border-[#D8DDE6] bg-white px-4 text-[12px] font-medium text-[#1F2937] hover:bg-[#F8FAFC] transition"
              >
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <div className="h-full overflow-auto">
            {viewMode === 'timeline' ? (
              <TimelineView plans={visiblePlans} selectedDate={selectedDate} onMachineSelect={setSelectedMachine} />
            ) : (
              <PlanningTable
                plans={visiblePlans}
                onPlanClick={(id) => console.log('Clicked plan', id)}
                onFavoriteToggle={handleFavoriteToggle}
                onCopyPlan={handleCopyPlan}
                onDeletePlan={handleDeletePlan}
              />
            )}
          </div>
        </div>
      </div>

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

      <AddPlanModal isOpen={isAddPlanOpen} onClose={() => setIsAddPlanOpen(false)} onSave={handleAddPlanSave} />
      <ReorderPlansModal isOpen={isReorderOpen} onClose={() => setIsReorderOpen(false)} plans={planItems} onSave={handleReorderSave} />
      <EquipmentChangeModal isOpen={isEquipmentChangeOpen} onClose={() => setIsEquipmentChangeOpen(false)} plans={planItems} />
    </div>
  );
}
