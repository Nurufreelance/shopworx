import { useState, useEffect } from 'react';

interface ProductionLog {
  id: string;
  machineName: string;
  shift: string;
  partName: string;
  planned: number;
  produced: number;
  accepted: number;
  rejected: number;
  status: string;
}

export const useProductionLog = () => {
  const [logs, setLogs] = useState<ProductionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Mock data
    const mockLogs: ProductionLog[] = [
      {
        id: '1',
        machineName: 'HT-28-HT-270100',
        shift: 'Shift A',
        partName: 'Part A-100',
        planned: 1000,
        produced: 950,
        accepted: 920,
        rejected: 20,
        status: 'Running',
      },
      {
        id: '2',
        machineName: 'HT-28-HT-270101',
        shift: 'Shift A',
        partName: 'Part B-200',
        planned: 900,
        produced: 820,
        accepted: 800,
        rejected: 15,
        status: 'Running',
      },
      {
        id: '3',
        machineName: 'HT-28-HT-270102',
        shift: 'Shift B',
        partName: 'Part C-300',
        planned: 800,
        produced: 0,
        accepted: 0,
        rejected: 0,
        status: 'Stopped',
      },
    ];

    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 500);
  }, []);

  return { logs, loading, filters, setFilters };
};
