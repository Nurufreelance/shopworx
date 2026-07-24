import React from 'react';

interface ProductionLogToolbarProps {
  filters?: any;
  setFilters?: (filters: any) => void;
}

export const ProductionLogToolbar: React.FC<ProductionLogToolbarProps> = ({ 
  filters, 
  setFilters 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <input
        type="text"
        placeholder="Search logs..."
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">All Machines</option>
        <option value="HT-28-HT-270100">HT-28-HT-270100</option>
        <option value="HT-28-HT-270101">HT-28-HT-270101</option>
      </select>
      <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">All Shifts</option>
        <option value="Shift A">Shift A</option>
        <option value="Shift B">Shift B</option>
      </select>
    </div>
  );
};
