export interface MachineStatus {
  id: string;
  name: string;
  status: 'operating' | 'stopped' | 'idle' | 'maintenance' | 'setup';
  currentProduct?: string;
  operator?: string;
  efficiency?: number;
  productionRate?: number;
  lastUpdate: Date;
  shift: 'A' | 'B' | 'C';
  color: string; // For the card background
}

export interface ShopfloorStats {
  totalMachines: number;
  operating: number;
  stopped: number;
  idle: number;
  maintenance: number;
  setup: number;
  overallEfficiency: number;
  productionRate: number;
  activeOperators: number;
  shift: 'A' | 'B' | 'C';
  lastUpdated: Date;
}

export interface LiveShopfloorFilters {
  shift?: 'A' | 'B' | 'C';
  status?: string;
  search?: string;
}

export const STATUS_COLORS = {
  operating: { bg: 'bg-green-500', text: 'text-green-400', dot: 'bg-green-400', cardBg: 'bg-black' },
  stopped: { bg: 'bg-red-500', text: 'text-red-400', dot: 'bg-red-400', cardBg: 'bg-black' },
  idle: { bg: 'bg-gray-800', text: 'text-gray-400', dot: 'bg-gray-600', cardBg: 'bg-black' },
  maintenance: { bg: 'bg-yellow-500', text: 'text-yellow-400', dot: 'bg-yellow-400', cardBg: 'bg-black' },
  setup: { bg: 'bg-blue-500', text: 'text-blue-400', dot: 'bg-blue-400', cardBg: 'bg-black' },
};