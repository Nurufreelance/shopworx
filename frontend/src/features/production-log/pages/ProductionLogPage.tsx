// src/features/production-log/pages/ProductionLogPage.tsx

import React, { useState } from 'react';
import { ProductionSummary } from '../components/ProductionSummary';
import { MachineGroup } from '../components/MachineGroup';
import { ProductionSkeleton } from '../components/ProductionSkeleton';
import { useProductionLog } from '../hooks/useProductionLog';

const ProductionLogPage = () => {
  const { groupedData, loading, refresh } = useProductionLog();
  const [operators, setOperators] = useState<Record<string, string>>({});

  const handleOperatorChange = (machine: string, operator: string) => {
    setOperators((prev) => ({ ...prev, [machine]: operator }));
  };

  if (loading) {
    return <ProductionSkeleton />;
  }

  const totalRecords = groupedData.reduce((acc, g) => acc + g.logs.length, 0);

  return (
    <div className="h-full bg-[#F7F8FA] overflow-y-auto">
      <div className="px-6 py-4">
        {/* Shift Title */}
        <div className="text-[18px] font-medium text-[#1F2937] mb-1">
          Shift2
        </div>

        {/* Summary bar */}
        <ProductionSummary total={totalRecords} />

        {/* Machine Groups */}
        <div className="space-y-6 mt-2">
          {groupedData.map((group) => (
            <MachineGroup
              key={group.machine}
              machineName={group.machine}
              logs={group.logs}
              loading={loading}
              operator={operators[group.machine] || ''}
              onOperatorChange={(op) => handleOperatorChange(group.machine, op)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductionLogPage;