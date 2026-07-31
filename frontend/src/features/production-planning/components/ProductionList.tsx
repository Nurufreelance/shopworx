// src/features/production-planning/components/ProductionList.tsx

import React from 'react';

interface ProductionPlan {
  id: string;
  planNumber: string;
  part: string;
  machine: string;
  shift: string;
  status: string;
  quantity: number;
  produced: number;
  startDate: string;
  endDate: string;
}

interface ProductionListProps {
  data: ProductionPlan[];
  loading: boolean;
  onSelectMachine: (machine: string | null) => void;
}

const ProductionList: React.FC<ProductionListProps> = ({ data, loading, onSelectMachine }) => {
  if (loading) {
    return <div className="text-center py-8 text-[#7C8798]">Loading production plans...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-8 text-[#7C8798]">No production plans found</div>;
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-[#E8F5EE] text-[#2E9B6E]';
      case 'stopped':
        return 'bg-[#FDE8E8] text-[#D94A4A]';
      case 'idle':
        return 'bg-[#FDF5E8] text-[#D4A13E]';
      default:
        return 'bg-[#EBF2F9] text-[#3B82C4]';
    }
  };

  return (
    <div className="bg-white border border-[#D8DDE6] rounded-[2px] overflow-hidden">
      <table className="w-full text-[12px] border-collapse">
        <thead className="bg-[#F7F8FA] border-b border-[#D8DDE6]">
          <tr>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Plan</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Part</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Shift</th>
            <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Status</th>
            <th className="px-3 py-2 text-right text-[10px] font-semibold text-[#7C8798] uppercase tracking-[0.04em]">Produced / Qty</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0F1F3]">
          {data.map((plan) => (
            <tr key={plan.id} className="hover:bg-[#F7F8FA] transition-colors">
              <td className="px-3 py-2 text-[12px] font-medium text-[#3B82C4]">{plan.planNumber}</td>
              <td className="px-3 py-2 text-[12px] text-[#1A1F36]">{plan.part}</td>
              <td className="px-3 py-2 text-[12px] text-[#7C8798]">{plan.shift}</td>
              <td className="px-3 py-2">
                <span className={`text-[11px] px-2 py-0.5 rounded-[2px] ${getStatusStyles(plan.status)}`}>
                  {plan.status}
                </span>
              </td>
              <td className="px-3 py-2 text-right text-[12px] font-medium text-[#1A1F36]">
                {plan.produced.toLocaleString()} / {plan.quantity.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionList;