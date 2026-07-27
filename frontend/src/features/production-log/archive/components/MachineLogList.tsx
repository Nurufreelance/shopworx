// src/features/production-log/components/MachineLogList.tsx

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MachineLogSection from './MachineLogSection';

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
  operator?: string;
  equipment?: string;
}

interface MachineLogListProps {
  data: ProductionLog[];
  loading: boolean;
  onSelectMachine: (machine: string | null) => void;
  selectedMachine: string | null;
}

export default function MachineLogList({
  data,
  loading,
  onSelectMachine,
  selectedMachine,
}: MachineLogListProps) {
  // Group by machine
  const groupedData = useMemo(() => {
    return data.reduce((acc, log) => {
      if (!acc[log.machine]) {
        acc[log.machine] = [];
      }
      acc[log.machine].push(log);
      return acc;
    }, {} as Record<string, ProductionLog[]>);
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#3048A8] border-t-transparent rounded-full animate-spin" />
          <span className="text-[13px] text-[#6B7280]">Loading production logs...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <svg className="w-12 h-12 text-[#D1D5DB] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h11.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V17a2 2 0 01-2 2z" />
        </svg>
        <p className="text-[14px] text-[#6B7280]">No production logs found</p>
        <p className="text-[12px] text-[#9CA3AF] mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-8"
      >
        {Object.entries(groupedData).map(([machine, logs], groupIndex) => (
          <MachineLogSection
            key={machine}
            machine={machine}
            logs={logs}
            onSelectMachine={onSelectMachine}
            selectedMachine={selectedMachine}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}