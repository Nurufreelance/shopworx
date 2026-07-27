import { useState, useEffect } from 'react';

interface UseProductionPlansParams {
  machine?: string;
  shift?: string;
  status?: string;
  date?: Date;
  search?: string;
}

export function useProductionPlans(params: UseProductionPlansParams) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Mock data fetch
    const mockData = [
      {
        id: '1',
        machine: 'HT-28-HT-270',
        plan: '100-7017',
        part: 'Darvinks Visita Flip Cap',
        color: 'NA',
        equipment: 'Darvinks Visita Flip Cap',
        plannedQty: 300000,
        startAt: 'Jul 11, 12:47',
        status: 'running',
      },
      {
        id: '2',
        machine: 'HT-28-HT-270',
        plan: '100-6976',
        part: 'Darvinks Visita Flip Cap',
        color: 'NA',
        equipment: 'Darvinks Visita Flip Cap',
        plannedQty: 300000,
        startAt: 'Jul 6, 20:31',
        status: 'completed',
      },
      {
        id: '3',
        machine: 'HT-29-HT-270',
        plan: '100-6982',
        part: 'SFG - Crystal/Deep Bucket 5ltr Body',
        color: 'NA',
        equipment: 'SFG - Crystal/Deep Bucket 5ltr Body',
        plannedQty: 20000,
        startAt: 'Jul 7, 17:07',
        status: 'planned',
      },
      {
        id: '4',
        machine: 'HT-30-HT-270',
        plan: '100-7013',
        part: 'Crystal Spoon',
        color: 'NA',
        equipment: 'Crystal Spoon',
        plannedQty: 300000,
        startAt: 'Jul 11, 00:54',
        status: 'delayed',
      },
    ];

    // Apply filters
    let filtered = mockData;
    if (params.machine) {
      filtered = filtered.filter(item => item.machine === params.machine);
    }
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(item => item.status === params.status);
    }
    if (params.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.plan.toLowerCase().includes(search) ||
        item.part.toLowerCase().includes(search) ||
        item.machine.toLowerCase().includes(search)
      );
    }

    setTimeout(() => {
      setData(filtered);
      setIsLoading(false);
    }, 300);
  }, [params.machine, params.shift, params.status, params.date, params.search]);

  const refetch = () => {
    // Trigger re-fetch
  };

  return { data, isLoading, refetch };
}