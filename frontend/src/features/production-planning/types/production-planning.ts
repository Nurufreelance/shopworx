// src/features/production-planning/types/productionPlanning.ts

export interface ProductionPlan {
  id: string;
  orderNumber: string;
  machineName: string;
  partName: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Planned' | 'In-Progress' | 'Completed' | 'Delayed';
  plannedStartDate: string;
  plannedEndDate: string;
  plannedQuantity: number;
  completedQuantity: number;
  rejectedQuantity: number;
  oee?: number;
  operator?: string;
  notes?: string;
}

export interface ProductionPlanFilters {
  machineName?: string;
  status?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ProductionPlanStats {
  totalPlans: number;
  inProgress: number;
  completed: number;
  delayed: number;
  totalOEE: number;
}