import { useState, useEffect, useRef } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ProductionService } from '@services/api/production.service';
import { ColDef } from 'ag-grid-community';
import { 
  FunnelIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const columnDefs: ColDef[] = [
  { 
    field: 'plan', 
    headerName: 'Plan', 
    width: 100,
    cellStyle: { fontSize: '11px' }
  },
  { 
    field: 'part', 
    headerName: 'Part', 
    flex: 1,
    cellStyle: { fontSize: '11px' }
  },
  { 
    field: 'color', 
    headerName: 'Color', 
    width: 80,
    cellStyle: { fontSize: '11px' }
  },
  { 
    field: 'startTime', 
    headerName: 'Production Start', 
    width: 130,
    cellStyle: { fontSize: '11px' }
  },
  { 
    field: 'endTime', 
    headerName: 'Production End', 
    width: 130,
    cellStyle: { fontSize: '11px' }
  },
  { 
    field: 'produced', 
    headerName: 'Produced', 
    width: 90,
    cellStyle: { fontSize: '11px', fontWeight: '500' }
  },
  { 
    field: 'accepted', 
    headerName: 'Accepted', 
    width: 90,
    cellStyle: { fontSize: '11px', fontWeight: '500', color: '#31B86A' }
  },
  { 
    field: 'rejected', 
    headerName: 'Rejected', 
    width: 90,
    cellStyle: { fontSize: '11px', fontWeight: '500', color: '#EF5350' }
  },
  { 
    field: 'rework', 
    headerName: 'Rework', 
    width: 80,
    cellStyle: { fontSize: '11px' }
  },
  { 
    field: 'scrap', 
    headerName: 'Scrap', 
    width: 80,
    cellStyle: { fontSize: '11px' }
  },
  { 
    field: 'actions', 
    headerName: '', 
    width: 100,
    cellRenderer: () => (
      <div className="flex items-center gap-1">
        <button className="text-[#6B7280] hover:text-[#1F2937] p-1 rounded hover:bg-[#F6F8FB] transition-colors" title="Edit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button className="text-[#6B7280] hover:text-[#1F2937] p-1 rounded hover:bg-[#F6F8FB] transition-colors" title="View">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button className="text-[#EF5350] hover:text-[#C62828] p-1 rounded hover:bg-[#F6F8FB] transition-colors" title="Delete">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    )
  },
];

// Filter Panel Component
const FilterPanel = ({ 
  isOpen, 
  onClose,
  selectedDate,
  onDateChange,
  selectedShift,
  onShiftChange,
  selectedMachine,
  onMachineChange,
  selectedOrder,
  onOrderChange
}: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    onDateChange(new Date(currentYear, currentMonth, day));
  };

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth && selectedDate?.getFullYear() === currentYear;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-[10px] border border-[#E5E7EB] shadow-lg p-4 z-50">
      {/* Calendar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[13px] font-medium text-[#1F2937]">
            {months[currentMonth]} {currentYear}
          </h4>
          <div className="flex gap-1">
            <button onClick={handlePrevMonth} className="p-1 rounded hover:bg-[#F6F8FB]">
              <ChevronLeftIcon className="w-4 h-4 text-[#6B7280]" />
            </button>
            <button onClick={handleNextMonth} className="p-1 rounded hover:bg-[#F6F8FB]">
              <ChevronRightIcon className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center text-[9px] text-[#6B7280] font-medium py-1">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="text-center py-1" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`text-center py-1 text-[11px] rounded-full transition-colors ${
                  isSelected(day) ? 'bg-[#2F6BFF] text-white' : 'hover:bg-[#F6F8FB] text-[#1F2937]'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Shift Filter */}
        <div>
          <label className="block text-[10px] font-medium text-[#6B7280] uppercase tracking-wider mb-1">Shift</label>
          <select
            value={selectedShift}
            onChange={(e) => onShiftChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-[6px] text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#2F6BFF]"
          >
            <option value="All Shifts">All Shifts</option>
            <option value="Shift1">Shift 1</option>
            <option value="Shift2">Shift 2</option>
          </select>
        </div>

        {/* Machine Filter */}
        <div>
          <label className="block text-[10px] font-medium text-[#6B7280] uppercase tracking-wider mb-1">Machine</label>
          <select
            value={selectedMachine}
            onChange={(e) => onMachineChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-[6px] text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#2F6BFF]"
          >
            <option value="All Machines">All Machines</option>
            <option value="HT-27-HT-270">HT-27-HT-270</option>
            <option value="HT-28-HT-270">HT-28-HT-270</option>
            <option value="HT-29-HT-270">HT-29-HT-270</option>
            <option value="HT-30-HT-270">HT-30-HT-270</option>
            <option value="MI-01-HT-86">MI-01-HT-86</option>
            <option value="MI-02-HT-86">MI-02-HT-86</option>
          </select>
        </div>

        {/* Order By Filter */}
        <div>
          <label className="block text-[10px] font-medium text-[#6B7280] uppercase tracking-wider mb-1">Order By</label>
          <select
            value={selectedOrder}
            onChange={(e) => onOrderChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-[6px] text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#2F6BFF]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function ProductionLog() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [machineFilter, setMachineFilter] = useState('All Machines');
  const [shiftFilter, setShiftFilter] = useState('All Shifts');
  const [dateFilter, setDateFilter] = useState(new Date('2026-07-11'));
  const [orderBy, setOrderBy] = useState('newest');
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductionService.getLogs({
          machine: machineFilter !== 'All Machines' ? machineFilter : undefined,
          shift: shiftFilter !== 'All Shifts' ? shiftFilter : undefined,
          order: orderBy,
          search: searchTerm || undefined,
        });
        
        // Debug: Check what data is returned
        console.log('Fetched logs:', data);
        
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [machineFilter, shiftFilter, orderBy, searchTerm]);

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group logs by shift
  const groupedLogs = logs.reduce((acc: any, log: any) => {
    const shift = log.shift || 'Shift2';
    if (!acc[shift]) acc[shift] = [];
    acc[shift].push(log);
    return acc;
  }, {});

  // Debug: Check grouped logs
  console.log('Grouped logs:', groupedLogs);
  console.log('Shift keys:', Object.keys(groupedLogs));

  return (
    <PageLayout
      title="Production Log"
      onSearch={(value) => setSearchTerm(value)}
      searchPlaceholder="Search reports & insights"
    >
      {/* Filter Summary with Filter Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-[11px] text-[#6B7280]">
        <div className="flex items-center gap-4">
          <span className="font-medium text-[#1F2937]">{logs.length} of {logs.length} records</span>
          <select 
            className="bg-transparent border-none focus:outline-none font-medium text-[#1F2937]"
            value={machineFilter}
            onChange={(e) => setMachineFilter(e.target.value)}
          >
            <option>All Machines</option>
            <option>HT-28-HT-270</option>
            <option>MI-24-OM-350</option>
          </select>
          <select 
            className="bg-transparent border-none focus:outline-none font-medium text-[#1F2937]"
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
          >
            <option>All Shifts</option>
            <option>Shift1</option>
            <option>Shift2</option>
          </select>
          <span>—</span>
          <span className="font-medium text-[#1F2937]">
            {dateFilter.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center gap-2" ref={filterRef}>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="p-1.5 text-[#6B7280] hover:text-[#1F2937] transition-colors relative"
          >
            <FunnelIcon className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-[#6B7280] hover:text-[#1F2937] transition-colors">
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          {/* Filter Panel */}
          <FilterPanel
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            selectedDate={dateFilter}
            onDateChange={(date: Date) => setDateFilter(date)}
            selectedShift={shiftFilter}
            onShiftChange={setShiftFilter}
            selectedMachine={machineFilter}
            onMachineChange={setMachineFilter}
            selectedOrder={orderBy}
            onOrderChange={setOrderBy}
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64 text-[#6B7280]">
          Fetching production records...
        </div>
      ) : Object.keys(groupedLogs).length === 0 ? (
        <div className="flex items-center justify-center h-64 text-[#6B7280]">
          No production records found
        </div>
      ) : (
        <div className="space-y-6">
          {Object.keys(groupedLogs).map((shift) => (
            <div key={shift}>
              {/* Shift Header - Blue */}
              <h2 className="text-[18px] font-medium text-[#2F6BFF] mb-3">
                {shift}
              </h2>
              <DataGrid
                data={groupedLogs[shift]}
                columns={columnDefs}
                height={300}
                pagination={false}
              />
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}