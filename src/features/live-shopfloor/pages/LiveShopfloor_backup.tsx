import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '@components/layout/PageLayout';
import { ProductionService } from '@services/api/production.service';
import { SkeletonCard } from '@components/common/Skeleton';
import { cn } from '@utils/cn';
import { ConfigPanel } from '../components/ConfigPanel';
import { 
  TvIcon, 
  EyeIcon, 
  Cog6ToothIcon, 
  HomeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface MachineStatus {
  id: string;
  name: string;
  product: string;
  status: 'operating' | 'stopped' | 'idle' | 'down';
  downSince?: string;
  downReason?: string;
  lastUpdate: string;
  progress: number;
  availability?: number;
  performance?: number;
  quality?: number;
  oee?: number;
  produced?: number;
  target?: number;
}

export default function LiveShopfloor() {
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [machines, setMachines] = useState<MachineStatus[]>([]);
  const [stats, setStats] = useState({ total: 49, operating: 32, stopped: 11, idle: 6 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [machineData, statsData] = await Promise.all([
          ProductionService.getMachineStatus(),
          ProductionService.getMachineStats(),
        ]);
        setMachines(machineData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <PageLayout title="Live Shopfloor">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </PageLayout>
    );
  }

  // Sample machines data (will come from API)
  const redCardMachine = {
    id: '1',
    name: 'HT-27-HT-270',
    status: 'down' as const,
    downSince: '3 days',
    downReason: 'No reason',
    lastUpdate: '8 hours ago',
    progress: 0,
  };

  const greenCardMachine = {
    id: '2',
    name: 'HT-28-HT-270',
    status: 'operating' as const,
    product: 'Darvinks Visita Flip Cap - NA',
    produced: 20543,
    target: 32400,
    availability: 90.90,
    performance: 76.02,
    quality: 100.00,
    progress: 68.37,
    lastUpdate: '2 hours ago',
  };

  return (
    <PageLayout title="Shift-wise shopfloor dashboard">
      {/* Action Tabs - Right aligned with title */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2F6BFF] text-white text-[12px] font-medium rounded-[8px] hover:bg-[#1A5AEE] transition-colors shadow-sm">
            <TvIcon className="w-4 h-4" />
            Send to TV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#2F6BFF] text-[#2F6BFF] text-[12px] font-medium rounded-[8px] hover:bg-[#F6F8FB] transition-colors">
            <EyeIcon className="w-4 h-4" />
            Preview
          </button>
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#2F6BFF] text-[#2F6BFF] text-[12px] font-medium rounded-[8px] hover:bg-[#F6F8FB] transition-colors"
          >
            <Cog6ToothIcon className="w-4 h-4" />
            Configure
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#2F6BFF] text-[#2F6BFF] text-[12px] font-medium rounded-[8px] hover:bg-[#F6F8FB] transition-colors">
            <HomeIcon className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3/4 width */}
        <div className={cn("lg:col-span-3", showConfig ? "lg:col-span-3" : "lg:col-span-4")}>
          {/* Stats Summary - 4 Colored Cards (Stagnant - don't move) */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#1F2937] rounded-[12px] p-5 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider opacity-90">Machines</div>
            </div>
            <div className="bg-[#31B86A] rounded-[12px] p-5 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{stats.operating}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider opacity-90">Operating</div>
            </div>
            <div className="bg-[#EF5350] rounded-[12px] p-5 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{stats.stopped}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider opacity-90">Stopped</div>
            </div>
            <div className="bg-[#2F6BFF] rounded-[12px] p-5 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{stats.idle}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider opacity-90">Idle</div>
            </div>
          </div>

          {/* Big Cards - 2 Cards Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            {/* RED CARD - Left Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#DC2626] rounded-[12px] p-6 shadow-lg text-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{redCardMachine.name}</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="text-[11px] opacity-70">Down since</div>
                      <div className="text-lg font-bold">{redCardMachine.downSince}</div>
                    </div>
                    <div>
                      <div className="text-[11px] opacity-70">Down reason</div>
                      <div className="text-lg font-bold">{redCardMachine.downReason}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <CheckCircleIcon className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-[11px] opacity-70">Last update {redCardMachine.lastUpdate}</span>
                  </div>
                </div>
                {/* Circular Progress - Pie Chart */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40 * (0)} ${2 * Math.PI * 40}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">0%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* GREEN CARD - Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-[#16A34A] rounded-[12px] p-6 shadow-lg text-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{greenCardMachine.name}</h3>
                  <div className="text-[12px] opacity-90 mb-2">{greenCardMachine.product}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold">{greenCardMachine.produced}</span>
                    <span className="text-[11px] opacity-60">/</span>
                    <span className="text-sm font-bold">{greenCardMachine.target}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-1.5 mb-3">
                    <motion.div 
                      className="h-1.5 rounded-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${(greenCardMachine.produced / greenCardMachine.target) * 100}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider opacity-70">Availability</div>
                      <div className="text-lg font-bold">{greenCardMachine.availability}%</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider opacity-70">Performance</div>
                      <div className="text-lg font-bold">{greenCardMachine.performance}%</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[9px] uppercase tracking-wider opacity-70">Quality</div>
                      <div className="text-lg font-bold">{greenCardMachine.quality}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <CheckCircleIcon className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-[11px] opacity-70">Last update {greenCardMachine.lastUpdate}</span>
                  </div>
                </div>
                {/* Circular Progress - Pie Chart */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40 * (greenCardMachine.progress / 100)} ${2 * Math.PI * 40 * (1 - greenCardMachine.progress / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">{greenCardMachine.progress}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar - Config Panel (shown when Configure is clicked) */}
        {showConfig && (
          <div className="lg:col-span-1">
            <ConfigPanel />
          </div>
        )}
      </div>
    </PageLayout>
  );
}