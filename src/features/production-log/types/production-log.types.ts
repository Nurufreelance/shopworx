export interface ProductionLogEntry {
  id: string;
  machineId: string;
  machineName: string;
  operator: string;
  planId?: string;
  productId: string;
  productName: string;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
  productionTime: number; // in minutes
  timestamp: Date;
  shift: 'A' | 'B' | 'C';
  status: 'running' | 'completed' | 'paused' | 'stopped';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductionLogDto {
  machineId: string;
  operator: string;
  planId?: string;
  productId: string;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
  productionTime: number;
  shift: 'A' | 'B' | 'C';
  notes?: string;
}

export interface ProductionLogFilters {
  machineId?: string;
  operator?: string;
  shift?: 'A' | 'B' | 'C';
  dateFrom?: Date;
  dateTo?: Date;
  status?: string;
}

export interface ProductionLogStats {
  totalProduced: number;
  totalAccepted: number;
  totalRejected: number;
  totalRework: number;
  totalScrap: number;
  acceptanceRate: number;
  rejectionRate: number;
  efficiency: number;
  activeMachines: number;
  totalOperators: number;
}