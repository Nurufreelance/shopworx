export interface DowntimeLog {
  id: string;
  machineId: string;
  machineName: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  reason: string;
  reasonCode: string;
  reasonCategory: 'planned' | 'unplanned' | 'maintenance' | 'break' | 'setup' | 'quality' | 'other';
  operator: string;
  shift: 'A' | 'B' | 'C';
  remarks?: string;
  status: 'active' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDowntimeLogDto {
  machineId: string;
  startTime: Date;
  endTime?: Date;
  reason: string;
  reasonCode: string;
  reasonCategory: 'planned' | 'unplanned' | 'maintenance' | 'break' | 'setup' | 'quality' | 'other';
  operator: string;
  shift: 'A' | 'B' | 'C';
  remarks?: string;
}

export interface UpdateDowntimeLogDto {
  endTime?: Date;
  duration?: number;
  reason?: string;
  reasonCode?: string;
  reasonCategory?: 'planned' | 'unplanned' | 'maintenance' | 'break' | 'setup' | 'quality' | 'other';
  operator?: string;
  shift?: 'A' | 'B' | 'C';
  remarks?: string;
  status?: 'active' | 'resolved';
}

export interface DowntimeLogFilters {
  machineId?: string;
  operator?: string;
  shift?: 'A' | 'B' | 'C';
  reasonCategory?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: 'active' | 'resolved';
}

export interface DowntimeLogStats {
  totalDowntime: number; // in minutes
  totalEvents: number;
  activeEvents: number;
  averageDuration: number;
  mostCommonReason: string;
  mostCommonReasonCount: number;
  machinesAffected: number;
  availability: number; // percentage
  mtbf: number; // Mean Time Between Failures (minutes)
  mttr: number; // Mean Time To Repair (minutes)
  oeeImpact: number; // percentage
  downtimeByCategory: {
    category: string;
    duration: number;
    count: number;
  }[];
  downtimeByMachine: {
    machineId: string;
    machineName: string;
    duration: number;
    count: number;
  }[];
}

export interface DowntimeReason {
  code: string;
  name: string;
  category: 'planned' | 'unplanned' | 'maintenance' | 'break' | 'setup' | 'quality' | 'other';
  description?: string;
}

export const DOWNTIME_REASONS: DowntimeReason[] = [
  // Planned
  { code: 'PLN-001', name: 'Scheduled Maintenance', category: 'planned' },
  { code: 'PLN-002', name: 'Planned Setup Change', category: 'planned' },
  { code: 'PLN-003', name: 'Tool Change', category: 'planned' },
  
  // Unplanned
  { code: 'UNP-001', name: 'Machine Breakdown', category: 'unplanned' },
  { code: 'UNP-002', name: 'Power Outage', category: 'unplanned' },
  { code: 'UNP-003', name: 'Material Shortage', category: 'unplanned' },
  { code: 'UNP-004', name: 'Operator Unavailable', category: 'unplanned' },
  
  // Maintenance
  { code: 'MNT-001', name: 'Preventive Maintenance', category: 'maintenance' },
  { code: 'MNT-002', name: 'Emergency Repair', category: 'maintenance' },
  { code: 'MNT-003', name: 'Cleaning', category: 'maintenance' },
  
  // Break
  { code: 'BRK-001', name: 'Lunch Break', category: 'break' },
  { code: 'BRK-002', name: 'Tea Break', category: 'break' },
  { code: 'BRK-003', name: 'Shift Change', category: 'break' },
  
  // Setup
  { code: 'SET-001', name: 'Machine Setup', category: 'setup' },
  { code: 'SET-002', name: 'Calibration', category: 'setup' },
  { code: 'SET-003', name: 'Testing', category: 'setup' },
  
  // Quality
  { code: 'QTY-001', name: 'Quality Inspection', category: 'quality' },
  { code: 'QTY-002', name: 'Rework', category: 'quality' },
  
  // Other
  { code: 'OTH-001', name: 'Waiting for Parts', category: 'other' },
  { code: 'OTH-002', name: 'Waiting for Instructions', category: 'other' },
];

export const REASON_CATEGORIES = {
  planned: { label: 'Planned', color: 'bg-blue-100 text-blue-800' },
  unplanned: { label: 'Unplanned', color: 'bg-red-100 text-red-800' },
  maintenance: { label: 'Maintenance', color: 'bg-orange-100 text-orange-800' },
  break: { label: 'Break', color: 'bg-yellow-100 text-yellow-800' },
  setup: { label: 'Setup', color: 'bg-purple-100 text-purple-800' },
  quality: { label: 'Quality', color: 'bg-indigo-100 text-indigo-800' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-800' },
} as const;