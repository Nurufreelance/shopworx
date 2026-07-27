export type MachineStatus =
  | "Running"
  | "Idle"
  | "Offline"
  | "Maintenance"
  | "Setup";

export interface Machine {
  id: number;
  machine: string;
  operator: string;
  product: string;
  status: MachineStatus;
  shift: string;
  efficiency: number;
  speed: number;
  updated: string;
}

export interface MachineError {
  id: number;
  time: string;
  machine: string;
  error: string;
  severity: "Low" | "Medium" | "High";
  duration: string;
  status: string;
}