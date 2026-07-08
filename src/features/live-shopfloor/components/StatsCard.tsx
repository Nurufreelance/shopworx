import { ReactNode } from 'react';
import { cn } from '@utils/cn';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color?: 'black' | 'green' | 'red' | 'gray' | 'yellow' | 'blue';
  subtitle?: string;
}

export const StatsCard = ({ title, value, icon, color = 'gray', subtitle }: StatsCardProps) => {
  const colorClasses = {
    black: 'bg-black border-gray-800 text-white',
    green: 'bg-black border-green-500/30 text-green-400 ring-1 ring-green-500/20',
    red: 'bg-black border-red-500/30 text-red-400 ring-1 ring-red-500/20',
    gray: 'bg-black border-gray-800 text-gray-300 ring-1 ring-gray-700/30',
    yellow: 'bg-black border-yellow-500/30 text-yellow-400 ring-1 ring-yellow-500/20',
    blue: 'bg-black border-blue-500/30 text-blue-400 ring-1 ring-blue-500/20',
  };

  return (
    <div className={cn(
      "rounded-lg border p-6 transition-all duration-300",
      "hover:scale-[1.02] hover:shadow-xl",
      colorClasses[color]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          {icon}
        </div>
      </div>
    </div>
  );
};