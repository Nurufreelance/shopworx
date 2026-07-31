import { useState, useEffect, useCallback } from 'react';

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

interface UseProductionPlansParams {
  machine?: string;
  shift?: string;
  status?: string;
  date?: Date;
}

const mockPlans: ProductionPlan[] = [
  {
    id: '1',
    planNumber: '100-6982',
    part: 'SFG - Crystal/Deep Bucket 5ltr Body',
    machine: 'HT-29-HT-270',
    shift: 'Shift1',
    status: 'planned',
    quantity: 20000,
    produced: 0,
    startDate: '2026-07-07T17:07:00',
    endDate: '2026-07-08T17:07:00',
  },
  {
    id: '2',
    planNumber: '100-7013',
    part: 'Crystal Spoon',
    machine: 'HT-30-HT-270',
    shift: 'Shift2',
    status: 'running',
    quantity: 300000,
    produced: 150000,
    startDate: '2026-07-11T00:54:00',
    endDate: '2026-07-12T00:54:00',
  },
  {
    id: '3',
    planNumber: '100-7017',
    part: 'Darvinks Visita Flip Cap',
    machine: 'HT-31-HT-270',
    shift: 'Shift1',
    status: 'planned',
    quantity: 300000,
    produced: 0,
    startDate: '2026-07-11T12:47:00',
    endDate: '2026-07-12T12:47:00',
  },
  {
    id: '4',
    planNumber: '100-6976',
    part: 'Darvinks Visita Flip Cap',
    machine: 'HT-31-HT-270',
    shift: 'Shift2',
    status: 'running',
    quantity: 300000,
    produced: 250000,
    startDate: '2026-07-06T20:31:00',
    endDate: '2026-07-08T20:31:00',
  },
  {
    id: '5',
    planNumber: '100-7015',
    part: 'SFG - Crystal/Deep Bucket 5ltr Body',
    machine: 'HT-31-HT-270',
    shift: 'Shift1',
    status: 'idle',
    quantity: 200000,
    produced: 180000,
    startDate: '2026-07-06T20:31:00',
    endDate: '2026-07-07T20:31:00',
  },
];

export const useProductionPlans = (params: UseProductionPlansParams) => {
  const [data, setData] = useState<ProductionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...mockPlans];

      if (params.machine) {
        filtered = filtered.filter(p => p.machine === params.machine);
      }
      if (params.shift) {
        filtered = filtered.filter(p => p.shift === params.shift);
      }
      if (params.status) {
        filtered = filtered.filter(p => p.status === params.status);
      }

      setData(filtered);
      setLoading(false);
    }, 300);
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, refetch };
};
