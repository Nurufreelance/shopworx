import { MachineStatus, STATUS_COLORS } from '../types/live-shopfloor.types';
import { cn } from '@utils/cn';
import { formatDate } from '@utils/format';

interface MachineCardProps {
  machine: MachineStatus;
  onClick?: () => void;
}

export const MachineCard = ({ machine, onClick }: MachineCardProps) => {
  const statusColors = STATUS_COLORS[machine.status] || STATUS_COLORS.idle;
  const isIdle = machine.status === 'idle';
  const isOperating = machine.status === 'operating';
  const isStopped = machine.status === 'stopped';

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-lg p-4 cursor-pointer transition-all duration-300",
        "bg-black border border-gray-800 hover:border-gray-600",
        "hover:scale-[1.02] hover:shadow-2xl",
        "min-h-[140px] flex flex-col justify-between",
        isOperating && "ring-2 ring-green-500/50",
        isStopped && "ring-2 ring-red-500/50",
        isIdle && "ring-2 ring-gray-600/30"
      )}
    >
      {/* Status Indicator Dot */}
      <div className="absolute top-3 right-3 flex items-center space-x-2">
        <span className={cn(
          "relative flex h-3 w-3",
          isOperating && "animate-pulse"
        )}>
          <span className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            statusColors.dot,
            isOperating && "animate-ping"
          )} />
          <span className={cn(
            "relative inline-flex rounded-full h-3 w-3",
            statusColors.dot
          )} />
        </span>
        <span className={cn(
          "text-xs font-medium uppercase tracking-wider",
          statusColors.text
        )}>
          {machine.status}
        </span>
      </div>

      {/* Machine Name */}
      <div className="mt-2">
        <h3 className="text-sm font-bold text-white tracking-wide">
          {machine.name}
        </h3>
      </div>

      {/* Machine Details */}
      <div className="space-y-1.5">
        {!isIdle && machine.currentProduct && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Product</span>
            <span className="text-xs text-gray-300 font-medium">{machine.currentProduct}</span>
          </div>
        )}
        
        {!isIdle && machine.operator && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Operator</span>
            <span className="text-xs text-gray-400">{machine.operator}</span>
          </div>
        )}

        {!isIdle && machine.efficiency !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Efficiency</span>
            <span className={cn(
              "text-xs font-bold",
              machine.efficiency >= 90 ? "text-green-400" :
              machine.efficiency >= 75 ? "text-yellow-400" :
              "text-red-400"
            )}>
              {machine.efficiency}%
            </span>
          </div>
        )}

        {!isIdle && machine.productionRate && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Rate</span>
            <span className="text-xs text-gray-300">{machine.productionRate}/hr</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between">
        <span className="text-[10px] text-gray-600">
          Shift {machine.shift}
        </span>
        <span className="text-[9px] text-gray-600">
          {formatDate(machine.lastUpdate, 'HH:mm:ss')}
        </span>
      </div>
    </div>
  );
};