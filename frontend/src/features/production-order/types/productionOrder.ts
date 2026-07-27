export type ProductionOrderStatus =
  | "planned"
  | "running"
  | "paused"
  | "completed"
  | "cancelled";

export interface ProductionOrder {
  id: string;

  orderNo: string;

  partNo: string;

  partName: string;

  machine: string;

  operator: string;

  mould: string;

  plannedQty: number;

  producedQty: number;

  rejectedQty: number;

  status: ProductionOrderStatus;

  priority: "Low" | "Medium" | "High";

  startTime: string;

  endTime: string;

  dueDate: string;

  customer: string;

  remarks?: string;
}