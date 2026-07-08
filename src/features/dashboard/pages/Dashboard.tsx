import { useState } from 'react';
import { 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { MachineCard } from '../components/MachineCard';
import { StatsCard } from '../components/StatsCard';
import { cn } from '@utils/cn';
import { PageLayout } from '@components/layout/PageLayout';

// Mock data - replace with API calls later
const mockMachines = [
  {
    id: '1',
    name: 'LI-43-OM-910',
    status: 'running' as const,
    operator: 'Mike Johnson',
    currentProduct: 'Widget A',
    progress: { current: 135, target: 160 },
    efficiency: 95,
    oee: 87,
    shift: 'Shift A',
  },
  {
    id: '2',
    name: 'LI-44-OM-920',
    status: 'running' as const,
    operator: 'Sarah Smith',
    currentProduct: 'Widget B',
    progress: { current: 82, target: 100 },
    efficiency: 88,
    oee: 82,
    shift: 'Shift A',
  },
  {
    id: '3',
    name: 'LI-45-OM-930',
    status: 'idle' as const,
    operator: 'Tom Wilson',
    currentProduct: 'Widget C',
    progress: { current: 0, target: 200 },
    efficiency: 0,
    oee: 0,
    shift: 'Shift A',
  },
  {
    id: '4',
    name: 'LI-46-OM-940',
    status: 'running' as const,
    operator: 'Emma Davis',
    currentProduct: 'Widget D',
    progress: { current: 120, target: 150 },
    efficiency: 92,
    oee: 85,
    shift: 'Shift A',
  },
  {
    id: '5',
    name: 'LI-47-OM-950',
    status: 'maintenance' as const,
    operator: 'James Brown',
    currentProduct: 'Widget E',
    progress: { current: 45, target: 180 },
    efficiency: 45,
    oee: 40,
    shift: 'Shift B',
  },
  {
    id: '6',
    name: 'LI-48-OM-960',
    status: 'running' as const,
    operator: 'Lisa Anderson',
    currentProduct: 'Widget F',
    progress: { current: 90, target: 120 },
    efficiency: 90,
    oee: 83,
    shift: 'Shift B',
  },
  {
    id: '7',
    name: 'LI-49-OM-970',
    status: 'offline' as const,
    operator: 'Robert Taylor',
    currentProduct: 'Widget G',
    progress: { current: 0, target: 100 },
    efficiency: 0,
    oee: 0,
    shift: 'Shift B',
  },
  {
    id: '8',
    name: 'LI-50-OM-980',
    status: 'running' as const,
    operator: 'Maria Garcia',
    currentProduct: 'Widget H',
    progress: { current: 200, target: 200 },
    efficiency: 98,
    oee: 92,
    shift: 'Shift B',
  },
];

export default function Dashboard() {
  const [machines] = useState(mockMachines);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const stats = {
    totalMachines: machines.length,
    running: machines.filter(m => m.status === 'running').length,
    idle: machines.filter(m => m.status === 'idle').length,
    offline: machines.filter(m => m.status === 'offline').length,
    maintenance: machines.filter(m => m.status === 'maintenance').length,
  };

  return (
    <PageLayout title="Dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center px-4 py-2 border border-[#E5E7EB] rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ArrowPathIcon className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-[#3B82F6] rounded text-sm font-medium text-[#3B82F6] bg-white hover:bg-blue-50 transition-colors">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Machine
          </button>
        </div>
      </div>

      {/* Stats Grid - ShopWorx style cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-[#E5E7EB] rounded p-4">
          <p className="text-sm text-gray-500">Total Machines</p>
          <p className="text-2xl font-medium text-gray-900">{stats.totalMachines}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded p-4">
          <p className="text-sm text-gray-500">Running</p>
          <p className="text-2xl font-medium text-green-600">{stats.running}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded p-4">
          <p className="text-sm text-gray-500">Idle / Offline</p>
          <p className="text-2xl font-medium text-yellow-600">{stats.idle + stats.offline}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded p-4">
          <p className="text-sm text-gray-500">In Maintenance</p>
          <p className="text-2xl font-medium text-red-600">{stats.maintenance}</p>
        </div>
      </div>

      {/* Machine Cards Grid - ShopWorx style cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-gray-900">Machine Overview</h2>
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
              Running
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></span>
              Idle
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
              Offline
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-orange-500 mr-1.5"></span>
              Maintenance
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {machines.map((machine) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              onExpand={() => console.log(`Expanding ${machine.name}`)}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}