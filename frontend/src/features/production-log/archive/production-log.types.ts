export type ProductionStatus =
  | "Production"
  | "Setup"
  | "Maintenance"
  | "Idle";

export type ProductionMode =
  | "Produced"
  | "Trial"
  | "Adjustment";

export type RunningStatus =
  | "Running"
  | "Stopped";

export interface ProductionLog {
  id: string;

  machine: string;

  part: string;

  colour: string;

  productionStatus: ProductionStatus;

  productionMode: ProductionMode;

  producedQty: number;

  acceptedQty: number;

  rejectedQty: number;

  scrapQty: number;

  runningStatus: RunningStatus;

  startTime: string;

  endTime: string;

  operator: string;

  shift: string;

  remarks?: string;
}