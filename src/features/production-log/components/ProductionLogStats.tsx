import { 
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  UsersIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { formatNumber } from '@utils/format';

interface ProductionLogStatsProps {
  stats: {
    totalProduced: number;
    totalAccepted: number;
    totalRejected: number;
    totalRework: number;
    totalScrap: number;
    acceptanceRate: number;
    rejectionRate: number;
    efficiency: number;
    activeMachines: number;
    totalOperators: number;
  };
}

export const ProductionLogStats = ({ stats }: ProductionLogStatsProps) => {
  const statCards = [
    {
      title: 'Total Produced',
      value: formatNumber(stats.totalProduced),
      icon: ChartBarIcon,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Acceptance Rate',
      value: `${stats.acceptanceRate}%`,
      icon: CheckCircleIcon,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Rejection Rate',
      value: `${stats.rejectionRate}%`,
      icon: XCircleIcon,
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Active Machines',
      value: stats.activeMachines,
      icon: Cog6ToothIcon,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Total Operators',
      value: stats.totalOperators,
      icon: UsersIcon,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Efficiency',
      value: `${stats.efficiency}%`,
      icon: ArrowPathIcon,
      color: 'bg-yellow-50 text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-card border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.title}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className={card.color + " p-2 rounded-lg"}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};