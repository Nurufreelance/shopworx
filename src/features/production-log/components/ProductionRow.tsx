// src/features/production-log/components/ProductionRow.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface ProductionLog {
  id: string;
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
}

interface ProductionRowProps {
  log: ProductionLog;
  index: number;
}

const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-[#1F2937] text-white text-[10px] rounded whitespace-nowrap z-50">
          {content}
        </div>
      )}
    </div>
  );
};

export default function ProductionRow({ log, index }: ProductionRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors duration-150"
    >
      <td className="py-2 pr-4 text-[#1F2937]">{log.plan}</td>
      <td className="py-2 pr-4 text-[#1F2937] break-words leading-tight max-w-[160px]">
        {log.part}
      </td>
      <td className="py-2 pr-4 text-[#6B7280]">{log.colorName || '-'}</td>
      <td className="py-2 pr-4 text-[#6B7280] text-[12px]">{log.productionStart}</td>
      <td className="py-2 pr-4 text-[#6B7280] text-[12px]">{log.productionEnd}</td>
      <td className="py-2 pr-4 text-right font-medium text-[#1F2937]">
        {log.produced.toLocaleString()}
      </td>
      <td className="py-2 pr-4 text-right font-medium text-[#22C55E]">
        {log.accepted.toLocaleString()}
      </td>
      <td className="py-2 pr-4 text-right font-medium text-[#EF4444]">
        {log.rejected.toLocaleString()}
      </td>
      <td className="py-2 pr-4 text-right font-medium text-[#F59E0B]">
        {log.rework.toLocaleString()}
      </td>
      <td className="py-2 pr-4 text-right font-medium text-[#F59E0B]">
        {log.scrap.toLocaleString()}
      </td>
      <td className="py-2 pr-4">
        <div className="flex items-center justify-center">
          <Tooltip content="Refresh row">
            <button className="p-1 hover:bg-[#F0F0F0] rounded transition-colors">
              <svg className="w-4 h-4 text-[#6B7280] hover:text-[#3048A8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </Tooltip>
        </div>
      </td>
    </motion.tr>
  );
}