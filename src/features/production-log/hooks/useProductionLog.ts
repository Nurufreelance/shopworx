// src/features/production-log/hooks/useProductionLog.ts

import { useState, useEffect, useMemo } from 'react';

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
  machine: string;
}

const mockLogs: ProductionLog[] = [
  {
    id: '1',
    plan: '100-6951',
    part: 'SFG - CLASSIC 16LTR BUCKET BODY',
    colorName: '-',
    productionStart: '06:46:18',
    productionEnd: '06:46:34',
    produced: 0,
    accepted: 0,
    rejected: 0,
    rework: 0,
    scrap: 0,
    machine: 'MI-24-OM-350',
  },
  {
    id: '2',
    plan: '100-7027',
    part: 'SFG - Crystal/Deep Bucket 5ltr Cover',
    colorName: '-',
    productionStart: '00:01:33',
    productionEnd: '06:22:44',
    produced: 1349,
    accepted: 1349,
    rejected: 0,
    rework: 0,
    scrap: 0,
    machine: 'MI-06-HT-120',
  },
  {
    id: '3',
    plan: '100-6987',
    part: 'SFG - Crystal/Deep Bucket 5ltr Cover',
    colorName: '-',
    productionStart: '19:00:02',
    productionEnd: '00:01:33',
    produced: 1024,
    accepted: 1024,
    rejected: 0,
    rework: 0,
    scrap: 0,
    machine: 'MI-06-HT-120',
  },
  {
    id: '4',
    plan: '100-7105',
    part: 'SFG - 50cc Cap',
    colorName: 'Blue',
    productionStart: '08:15:00',
    productionEnd: '16:30:00',
    produced: 20022,
    accepted: 19408,
    rejected: 614,
    rework: 45,
    scrap: 12.5,
    machine: 'HT-31-HT-270',
  },
  {
    id: '5',
    plan: '100-7104',
    part: 'Crystal Spoon',
    colorName: 'Crystal',
    productionStart: '07:00:00',
    productionEnd: '14:45:00',
    produced: 41465,
    accepted: 41201,
    rejected: 264,
    rework: 120,
    scrap: 8.2,
    machine: 'HT-31-HT-270',
  },
];

export const useProductionLog = () => {
  const [data, setData] = useState<ProductionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockLogs);
      setLoading(false);
    }, 500);
  }, []);

  const groupedData = useMemo(() => {
    const grouped = new Map<string, ProductionLog[]>();
    
    for (const row of data) {
      if (!grouped.has(row.machine)) {
        grouped.set(row.machine, []);
      }
      grouped.get(row.machine)?.push(row);
    }

    return Array.from(grouped.entries()).map(([machine, logs]) => ({
      machine,
      logs,
    }));
  }, [data]);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockLogs);
      setLoading(false);
    }, 500);
  };

  return { data, groupedData, loading, refresh };
};