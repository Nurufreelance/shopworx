// src/features/production-planning/components/ProductionList.tsx

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductionPlan {
  id: string;
  machine: string;
  plan: string;
  part: string;
  color: string;
  equipment: string;
  plannedQty: number;
  startAt: string;
  status: 'planned' | 'running' | 'completed' | 'delayed' | 'stopped' | 'idle';
}

interface ProductionListProps {
  data: ProductionPlan[];
  loading: boolean;
  onSelectMachine: (machine: string | null) => void;
  selectedMachine: string | null;
}

// Status dot colors matching screenshot
const statusDotColors = {
  planned: 'bg-[#3048A8]',
  running: 'bg-[#22C55E]',
  completed: 'bg-[#6B7280]',
  delayed: 'bg-[#EF4444]',
  stopped: 'bg-[#F59E0B]',
  idle: 'bg-[#9CA3AF]',
};

// Tooltip component for action icons
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-[#1F2937] text-white text-[10px] rounded whitespace-nowrap z-50 pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
};

export default function ProductionList({ 
  data, 
  loading,
}: ProductionListProps) {
  // Group by machine
  const groupedData = useMemo(() => {
    return data.reduce((acc, plan) => {
      if (!acc[plan.machine]) {
        acc[plan.machine] = [];
      }
      acc[plan.machine].push(plan);
      return acc;
    }, {} as Record<string, ProductionPlan[]>);
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#3048A8] border-t-transparent rounded-full animate-spin" />
          <span className="text-[13px] text-[#6B7280]">Loading production plans...</span>
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
        <p className="text-[14px] text-[#6B7280]">No production plans found</p>
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
        className="space-y-7"
      >
        {Object.entries(groupedData).map(([machine, plans], groupIndex) => (
          <motion.div
            key={machine}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.05 }}
          >
            {/* Machine Heading - No background, just blue text */}
            <div className="mb-2">
              <span className="text-[18px] font-medium text-[#3048A8]">{machine}</span>
            </div>

            {/* Table - No card, no border, no rounded corners */}
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium text-[12px] w-8">Status</th>
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium text-[12px]">Plan</th>
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium text-[12px] min-w-[120px]">Part</th>
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium text-[12px] w-16">Color</th>
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium text-[12px] min-w-[120px] hidden lg:table-cell">Equipment</th>
                    <th className="text-right py-1.5 pr-4 text-[#6B7280] font-medium text-[12px] whitespace-nowrap">Planned qty</th>
                    <th className="text-left py-1.5 pr-4 text-[#6B7280] font-medium text-[12px] whitespace-nowrap hidden sm:table-cell">Start at</th>
                    <th className="text-center py-1.5 pr-4 text-[#6B7280] font-medium text-[12px] w-20">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan, index) => (
                    <motion.tr
                      key={plan.id}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors duration-150"
                    >
                      {/* Status Dot - Always visible */}
                      <td className="py-1.5 pr-4">
                        <span className={`w-2.5 h-2.5 rounded-full inline-block ${statusDotColors[plan.status]}`} />
                      </td>
                      
                      {/* Plan - Hyperlink style */}
                      <td className="py-1.5 pr-4">
                        <a 
                          href="#" 
                          className="text-[#3048A8] font-medium hover:underline cursor-pointer transition-all"
                        >
                          {plan.plan}
                        </a>
                      </td>
                      
                      {/* Part - Allows wrapping */}
                      <td className="py-1.5 pr-4 text-[#111827] break-words leading-tight max-w-[200px]">
                        {plan.part}
                      </td>
                      
                      {/* Color */}
                      <td className="py-1.5 pr-4 text-[#6B7280]">{plan.color}</td>
                      
                      {/* Equipment - Allows wrapping */}
                      <td className="py-1.5 pr-4 text-[#6B7280] break-words leading-tight max-w-[150px] hidden lg:table-cell">
                        {plan.equipment}
                      </td>
                      
                      {/* Planned Qty - Right aligned */}
                      <td className="py-1.5 pr-4 text-right font-medium text-[#111827]">
                        {plan.plannedQty.toLocaleString()}
                      </td>
                      
                      {/* Start At - Smaller font */}
                      <td className="py-1.5 pr-4 text-[#6B7280] text-[12px] whitespace-nowrap hidden sm:table-cell">
                        {plan.startAt}
                      </td>
                      
                      {/* Action Icons with Tooltips */}
                      <td className="py-1.5 pr-4">
                        <div className="flex items-center justify-center gap-1">
                          <Tooltip content="Favorite">
                            <button className="p-1 hover:bg-[#F3F4F6] rounded transition-colors group">
                              <svg className="w-4 h-4 text-[#6B7280] group-hover:text-[#3048A8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            </button>
                          </Tooltip>
                          <Tooltip content="Duplicate">
                            <button className="p-1 hover:bg-[#F3F4F6] rounded transition-colors group">
                              <svg className="w-4 h-4 text-[#6B7280] group-hover:text-[#3048A8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}