import { useState, useEffect, useRef } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { ProductionService } from '@services/api/production.service';
import { 
  FunnelIcon, 
  ArrowPathIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';

// Generate mock data
const generateMockDowntimeLogs = () => {
  const machines = [
    'MI-19-HT-250', 'MI-22-HT-300', 'MI-16-HT-200', 'MI-25-OM-350',
    'MI-26-OM-450', 'MI-24-OM-350', 'MI-23-HT-300', 'MI-17-HT-200',
    'MI-21-HT-300', 'MI-18-HT-250', 'MI-20-FU-280', 'MI-15-HT-200'
  ];
  
  const reasons = [
    'Machine Communication Error',
    'No reason',
    'Power Failure',
    'Machine Shutdown',
    'Material Shortage'
  ];
  
  const logs = [];
  for (let i = 1; i <= 50; i++) {
    const machine = machines[Math.floor(Math.random() * machines.length)];
    const reason = reasons[Math.floor(Math.random() * reasons.length)];
    const shift = i < 25 ? 'Shift2' : 'Shift1';
    const hours = String(Math.floor(Math.random() * 10) + 6).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const startTime = `${hours}:${minutes}:${seconds}`;
    const endMinutes = String(Number(minutes) + Math.floor(Math.random() * 15) + 5).padStart(2, '0');
    const endTime = `${hours}:${endMinutes}:${seconds}`;
    
    logs.push({
      id: String(i),
      machine: machine,
      startTime: startTime,
      endTime: endTime,
      duration: `00:${String(Math.floor(Math.random() * 15) + 10).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      reason: reason,
      isPlanned: Math.random() > 0.8 ? 'Yes' : '-',
      shift: shift,
    });
  }
  return logs;
};

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

        <div>
          <label className="block text-[10px] font-medium text-[#6B7280] uppercase tracking-wider mb-1">Machine</label>
          <select
            value={selectedMachine}
            onChange={(e) => onMachineChange(e.target.value)}
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded-[6px] text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-[#2F6BFF]"
          >
            <option value="All Machines">All Machines</option>
            <option value="MI-19-HT-250">MI-19-HT-250</option>
            <option value="MI-22-HT-300">MI-22-HT-300</option>
            <option value="MI-16-HT-200">MI-16-HT-200</option>
            <option value="MI-25-OM-350">MI-25-OM-350</option>
          </select>
        </div>

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

export default function DowntimeLog() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [machineFilter, setMachineFilter] = useState('All Machines');
  const [shiftFilter, setShiftFilter] = useState('All Shifts');
  const [dateFilter, setDateFilter] = useState('11 Jul, 2026');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [orderBy, setOrderBy] = useState('newest');
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductionService.getDowntimeLogs({
          machine: machineFilter !== 'All Machines' ? machineFilter : undefined,
          shift: shiftFilter !== 'All Shifts' ? shiftFilter : undefined,
        });
        setLogs(data);
      } catch (error) {
        console.error('Error fetching downtime logs:', error);
        setLogs(generateMockDowntimeLogs());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [machineFilter, shiftFilter]);

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

  // Sort shifts: Shift2 first, then Shift1
  const sortedShifts = Object.keys(groupedLogs).sort((a, b) => {
    if (a === 'Shift2') return -1;
    if (b === 'Shift2') return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Fixed Header Section */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-medium text-[#1F2937]">Downtime Log</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports & insights"
                className="w-[320px] pl-10 pr-4 py-1.5 border border-[#E5E7EB] rounded-full text-[12px] bg-[#F6F8FB] focus:outline-none focus:ring-1 focus:ring-[#2F6BFF]"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2 w-4 h-4 text-[#9CA3AF]" />
            </div>
            <button className="p-1.5 text-[#6B7280] hover:text-[#1F2937] transition-colors">
              <ArrowPathIcon className="w-5 h-5" />
            </button>
            <button className="p-1.5 text-[#6B7280] hover:text-[#1F2937] transition-colors relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF5350] rounded-full" />
            </button>
            <button className="p-1">
              <UserCircleIcon className="w-8 h-8 text-[#6B7280]" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Summary - Sticky */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-2 sticky top-[68px] z-10">
        <div className="flex items-center justify-center gap-4 text-[12px] text-[#6B7280]">
          <span className="font-medium text-[#1F2937]">{logs.length} of {logs.length} records</span>
          <select 
            className="bg-transparent border-none focus:outline-none font-medium text-[#1F2937] cursor-pointer hover:text-[#2F6BFF] text-[12px]"
            value={machineFilter}
            onChange={(e) => setMachineFilter(e.target.value)}
          >
            <option>All Machines</option>
            <option>MI-19-HT-250</option>
            <option>MI-22-HT-300</option>
            <option>MI-16-HT-200</option>
            <option>MI-25-OM-350</option>
          </select>
          <span className="text-[#E5E7EB]">|</span>
          <select 
            className="bg-transparent border-none focus:outline-none font-medium text-[#1F2937] cursor-pointer hover:text-[#2F6BFF] text-[12px]"
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
          >
            <option>All Shifts</option>
            <option>Shift1</option>
            <option>Shift2</option>
          </select>
          <span className="text-[#E5E7EB]">|</span>
          <span className="font-medium text-[#1F2937]">{dateFilter}</span>
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="p-1 text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              <FunnelIcon className="w-4 h-4" />
            </button>
            <FilterPanel
              isOpen={showFilter}
              onClose={() => setShowFilter(false)}
              selectedDate={selectedDate}
              onDateChange={(date: Date) => setSelectedDate(date)}
              selectedShift={shiftFilter}
              onShiftChange={setShiftFilter}
              selectedMachine={machineFilter}
              onMachineChange={setMachineFilter}
              selectedOrder={orderBy}
              onOrderChange={setOrderBy}
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="px-4 py-2">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-[#6B7280]">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#2F6BFF] border-t-transparent" />
              <span>Fetching downtime records...</span>
            </div>
          </div>
        ) : Object.keys(groupedLogs).length === 0 ? (
          <div className="flex items-center justify-center h-64 text-[#6B7280]">
            No downtime records found
          </div>
        ) : (
          <div className="space-y-4">
            {sortedShifts.map((shift) => (
              <div key={shift}>
                {/* Shift Header - Blue */}
                <h2 className="text-[20px] font-medium text-[#2F6BFF] mb-2">
                  {shift}
                </h2>

                {/* Custom Table */}
                <div className="bg-white rounded-[8px] border border-[#E5E7EB] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead className="bg-[#F6F8FB] border-b border-[#E5E7EB] sticky top-0">
                        <tr>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Machine</th>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Downtime start</th>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Downtime end</th>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Duration</th>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Reason</th>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Is planned</th>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Action</th>
                          <th className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap">Remark</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F6F8FB]">
                        {groupedLogs[shift].map((log: any, index: number) => (
                          <tr key={log.id} className="hover:bg-[#F6F8FB] transition-colors">
                            <td className="py-2 px-3 text-[#1F2937] font-medium break-words max-w-[120px]">
                              {log.machine}
                            </td>
                            <td className="py-2 px-3 text-[#6B7280] whitespace-nowrap">{log.startTime}</td>
                            <td className="py-2 px-3 text-[#6B7280] whitespace-nowrap">{log.endTime}</td>
                            <td className="py-2 px-3 text-[#1F2937] font-medium whitespace-nowrap">{log.duration}</td>
                            <td className="py-2 px-3">
                              <span className="text-[#1F2937] underline decoration-dotted underline-offset-2 cursor-pointer hover:text-[#2F6BFF]">
                                {log.reason}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-[#6B7280] text-center">{log.isPlanned}</td>
                            <td className="py-2 px-3">
                              <button className="inline-flex items-center gap-1 px-3 py-1 border border-[#2F6BFF] rounded-[4px] text-[11px] text-[#2F6BFF] hover:bg-[#2F6BFF] hover:text-white transition-colors font-medium">
                                <ArrowUpRightIcon className="w-3 h-3" />
                                Split
                              </button>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-1 text-[#6B7280] hover:text-[#1F2937] cursor-pointer group">
                                <PencilSquareIcon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                                <span className="text-[12px]">Remark</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}