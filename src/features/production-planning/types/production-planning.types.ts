export interface ProductionPlan {
  id: string;
  machineName: string;
  machineId: string;
  status: 'running' | 'stopped' | 'idle' | 'maintenance' | 'setup';
  part: string;
  partDescription: string;
  cavity: number;
  cycleTime: number;
  equipment: string;
  mould: string;
  plannedQty: number;
  actualQty: number;
  efficiency: number;
  shift?: 'A' | 'B' | 'C';
}
