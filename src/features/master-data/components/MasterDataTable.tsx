import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { cn } from '@utils/cn';
import { formatDate } from '@utils/format';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface MasterDataTableProps {
  data: any[];
  columns: Column[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onCreate: () => void;
  onSearch: (term: string) => void;
  title: string;
  isLoading?: boolean;
}

export const MasterDataTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreate,
  onSearch,
  title,
  isLoading = false,
}: MasterDataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button
          onClick={onCreate}
          className="btn-primary inline-flex items-center text-sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 2} className="px-4 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="px-4 py-8 text-center text-gray-500">
                    No items found
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-sm">
                        {col.render 
                          ? col.render(item[col.key], item)
                          : item[col.key]?.toString() || '-'
                        }
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onToggleStatus(item.id)}
                        className="flex items-center space-x-1 text-sm"
                      >
                        {item.isActive ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircleIcon className="w-4 h-4 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <XCircleIcon className="w-4 h-4 mr-1" />
                            Inactive
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};