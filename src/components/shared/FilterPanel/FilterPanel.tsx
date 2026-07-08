import { ReactNode } from 'react';
import { cn } from '@utils/cn';

interface FilterPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  onReset?: () => void;
}

export const FilterPanel = ({ children, className, title = 'Filters', onReset }: FilterPanelProps) => {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Reset
          </button>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};
