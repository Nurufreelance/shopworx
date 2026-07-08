import { useState } from 'react';
import { useMobile } from '@context/MobileContext';
import {
  CpuChipIcon,
  PlayCircleIcon,
  StopCircleIcon,
  CircleStackIcon,
  ArrowPathIcon,
  PlayIcon,
  PauseIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';
import { useLiveShopfloor } from '../hooks/useLiveShopfloor';
import { MachineCard } from '../components/MachineCard';
import { StatsCard } from '../components/StatsCard';

export default function LiveShopfloor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');

  const { 
    machines, 
    stats, 
    isLoading, 
    isLive, 
    toggleLive, 
    refetch 
  } = useLiveShopfloor({
    search: searchTerm || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
    shift: shiftFilter === 'all' ? undefined : shiftFilter as any,
  });

  // Filter machines
  const filteredMachines = machines.filter(machine => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return machine.name.toLowerCase().includes(search) ||
        machine.currentProduct?.toLowerCase().includes(search) ||
        machine.operator?.toLowerCase().includes(search);
    }
    return true;
  });

  return (
    <div className="space-y-6 bg-gray-950 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Shopfloor</h1>
          <p className="text-sm text-gray-400 mt-1">Real-time machine monitoring dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-black/50 rounded-lg px-3 py-1.5 border border-gray-800">
            <span className={cn(
              "relative flex h-2.5 w-2.5",
              isLive && "animate-pulse"
            )}>
              <span className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                isLive ? "bg-green-400 animate-ping" : "bg-gray-500"
              )} />
              <span className={cn(
                "relative inline-flex rounded-full h-2.5 w-2.5",
                isLive ? "bg-green-500" : "bg-gray-500"
              )} />
            </span>
            <span className="text-xs font-medium text-gray-400">
              {isLive ? 'Live' : 'Paused'}
            </span>
          </div>
          <button
            onClick={toggleLive}
            className={cn(
              "p-2 rounded-lg transition-colors border",
              isLive 
                ? "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20" 
                : "bg-gray-700/30 border-gray-600 text-gray-400 hover:bg-gray-700/50"
            )}
          >
            {isLive ? (
              <PauseIcon className="w-4 h-4" />
            ) : (
              <PlayIcon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => refetch()}
            className="p-2 rounded-lg bg-black/50 border border-gray-800 hover:bg-gray-800 transition-colors"
          >
            <ArrowPathIcon className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Machines"
          value={stats?.totalMachines || 0}
          icon={<CpuChipIcon className="w-6 h-6" />}
          color="black"
          subtitle="49 machines monitored"
        />
        <StatsCard
          title="Operating"
          value={stats?.operating || 0}
          icon={<PlayCircleIcon className="w-6 h-6" />}
          color="green"
          subtitle={`${stats?.operating || 0}% of total`}
        />
        <StatsCard
          title="Stopped"
          value={stats?.stopped || 0}
          icon={<StopCircleIcon className="w-6 h-6" />}
          color="red"
          subtitle={`${stats?.stopped || 0}% of total`}
        />
        <StatsCard
          title="Idle"
          value={stats?.idle || 0}
          icon={<CircleStackIcon className="w-6 h-6" />}
          color="gray"
          subtitle={`${stats?.idle || 0}% of total`}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-black/50 rounded-lg border border-gray-800 p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Efficiency</p>
          <p className="text-lg font-bold text-white">{stats?.overallEfficiency?.toFixed(1) || 0}%</p>
        </div>
        <div className="bg-black/50 rounded-lg border border-gray-800 p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Production Rate</p>
          <p className="text-lg font-bold text-white">{stats?.productionRate?.toFixed(0) || 0}/hr</p>
        </div>
        <div className="bg-black/50 rounded-lg border border-gray-800 p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Active Operators</p>
          <p className="text-lg font-bold text-white">{stats?.activeOperators || 0}</p>
        </div>
        <div className="bg-black/50 rounded-lg border border-gray-800 p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Shift</p>
          <p className="text-lg font-bold text-white">{stats?.shift || 'A'}</p>
        </div>
        <div className="bg-black/50 rounded-lg border border-gray-800 p-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Last Updated</p>
          <p className="text-sm font-medium text-gray-300">
            {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : '-'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-black/30 rounded-lg border border-gray-800 p-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search machines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          <option value="all">All Status</option>
          <option value="operating">Operating</option>
          <option value="stopped">Stopped</option>
          <option value="idle">Idle</option>
          <option value="maintenance">Maintenance</option>
          <option value="setup">Setup</option>
        </select>
        <select
          value={shiftFilter}
          onChange={(e) => setShiftFilter(e.target.value)}
          className="px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        >
          <option value="all">All Shifts</option>
          <option value="A">Shift A</option>
          <option value="B">Shift B</option>
          <option value="C">Shift C</option>
        </select>
      </div>

      {/* Machine Grid - 7x7 for 49 machines */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
        {isLoading ? (
          Array.from({ length: 49 }).map((_, i) => (
            <div key={i} className="bg-black/30 rounded-lg border border-gray-800 p-4 min-h-[140px] animate-pulse">
              <div className="h-4 bg-gray-800 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-800 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-800 rounded w-2/3"></div>
            </div>
          ))
        ) : filteredMachines.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">No machines found matching your criteria</p>
          </div>
        ) : (
          filteredMachines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-800 pt-4">
        <span>Total Machines: {machines.length}</span>
        <span>Displaying {filteredMachines.length} machines</span>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
