// src/features/production-log/components/MachineSection.tsx

import React, { useState } from 'react';
import EquipmentSelector from './EquipmentSelector';
import ProductionTable from './ProductionTable';

interface ProductionLog {
  id: string;
  machine: string;
  plan: string;
  part: string;
  colorName: string;
  productionStart: string;
  productionEnd: string;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
  equipment?: string;
}

interface MachineSectionProps {
  machine: string;
  logs: ProductionLog[];
}

export default function MachineSection({ machine, logs }: MachineSectionProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  // Get unique equipment options - with fallback
  const equipmentOptions = Array.from(
    new Set(logs.map(log => log.equipment || log.machine))
  ).filter(Boolean) as string[];

  return (
    <div className="mb-10">
      {/* Machine Title */}
      <div className="text-[17px] font-normal text-[#3048A8] mb-3">{machine}</div>

      {/* Equipment Selector */}
      <div className="mb-3">
        <EquipmentSelector
          options={equipmentOptions.length > 0 ? equipmentOptions : [machine]}
          selectedValue={selectedEquipment}
          onSelect={setSelectedEquipment}
        />
      </div>

      {/* Production Table - NO totals prop */}
      <ProductionTable logs={logs} />
    </div>
  );
}