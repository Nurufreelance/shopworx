import { ReactNode } from 'react';
import { cn } from '@utils/cn';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  className?: string;
  onSearch?: (value: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onAdd?: () => void;
  onFilter?: () => void;
  showToolbar?: boolean;
  searchPlaceholder?: string;
  toolbarActions?: ReactNode;
}

export const PageLayout = ({
  title,
  children,
  className,
  onSearch,
  onRefresh,
  onExport,
  onAdd,
  onFilter,
  showToolbar = true,
  searchPlaceholder = 'Search...',
  toolbarActions,
}: PageLayoutProps) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="p-6">
        {/* Page Title */}
        <h1 className="text-[32px] font-medium text-gray-900 mb-4">
          {title}
        </h1>

        {/* Toolbar */}
        {showToolbar && (
          <div className="flex flex-wrap items-center gap-2 py-2 mb-4 border-b border-[#E5E7EB]">
            {/* Search */}
            {onSearch && (
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-[#E5E7EB] rounded focus:outline-none focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] bg-white"
                />
                <MagnifyingGlassIcon className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-1.5 ml-auto">
              {onFilter && (
                <button
                  onClick={onFilter}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  title="Filter"
                >
                  <FunnelIcon className="w-4 h-4" />
                </button>
              )}
              
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  title="Refresh"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
              )}
              
              {onExport && (
                <button
                  onClick={onExport}
                  className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  title="Export"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </button>
              )}
              
              {onAdd && (
                <button
                  onClick={onAdd}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-[#F97316] rounded hover:bg-[#EA580C] transition-colors flex items-center gap-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add New
                </button>
              )}
              
              {toolbarActions}
            </div>
          </div>
        )}

        {/* Content */}
        <div className={cn("", className)}>
          {children}
        </div>
      </div>
    </div>
  );
};