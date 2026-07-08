import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { BarChart } from '@components/ui/Chart/BarChart';
import { ColDef } from 'ag-grid-community';

const columnDefs: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'hour', headerName: 'Hour', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'department', headerName: 'Department', flex: 0.8 },
  { field: 'category', headerName: 'Category', flex: 0.8 },
  { field: 'reason', headerName: 'Downtime Reason', flex: 1.2 },
  { field: 'reasonCode', headerName: 'Reason Code', width: 100 },
  { field: 'duration', headerName: 'Duration (min)', width: 100 },
  { field: 'shift', headerName: 'Shift', width: 80 },
  { field: 'operator', headerName: 'Operator', flex: 0.8 },
];

const sampleData = [
  { 
    date: '2024-01-15', 
    hour: '08:00', 
    machine: 'LI-43-OM-910', 
    department: 'Production',
    category: 'Unplanned',
    reason: 'Machine Breakdown',
    reasonCode: 'UNP-001',
    duration: 45,
    shift: 'A',
    operator: 'Mike Johnson',
  },
  { 
    date: '2024-01-15', 
    hour: '09:30', 
    machine: 'LI-44-OM-920', 
    department: 'Production',
    category: 'Planned',
    reason: 'Scheduled Maintenance',
    reasonCode: 'PLN-001',
    duration: 30,
    shift: 'A',
    operator: 'Sarah Smith',
  },
  { 
    date: '2024-01-15', 
    hour: '10:15', 
    machine: 'LI-45-OM-930', 
    department: 'Quality',
    category: 'Unplanned',
    reason: 'Material Shortage',
    reasonCode: 'UNP-003',
    duration: 60,
    shift: 'A',
    operator: 'Tom Wilson',
  },
  { 
    date: '2024-01-15', 
    hour: '11:00', 
    machine: 'LI-46-OM-940', 
    department: 'Production',
    category: 'Break',
    reason: 'Lunch Break',
    reasonCode: 'BRK-001',
    duration: 30,
    shift: 'A',
    operator: 'Emma Davis',
  },
  { 
    date: '2024-01-15', 
    hour: '12:30', 
    machine: 'LI-47-OM-950', 
    department: 'Maintenance',
    category: 'Maintenance',
    reason: 'Preventive Maintenance',
    reasonCode: 'MNT-001',
    duration: 90,
    shift: 'B',
    operator: 'James Brown',
  },
  { 
    date: '2024-01-15', 
    hour: '14:00', 
    machine: 'LI-48-OM-960', 
    department: 'Production',
    category: 'Setup',
    reason: 'Machine Setup',
    reasonCode: 'SET-001',
    duration: 45,
    shift: 'B',
    operator: 'Lisa Anderson',
  },
  { 
    date: '2024-01-15', 
    hour: '15:30', 
    machine: 'LI-49-OM-970', 
    department: 'Quality',
    category: 'Quality',
    reason: 'Quality Inspection',
    reasonCode: 'QTY-001',
    duration: 30,
    shift: 'B',
    operator: 'Robert Taylor',
  },
];

const chartData = [
  { label: 'Unplanned', value: 105, color: '#EF4444' },
  { label: 'Planned', value: 30, color: '#3B82F6' },
  { label: 'Maintenance', value: 90, color: '#F59E0B' },
  { label: 'Break', value: 30, color: '#8B5CF6' },
  { label: 'Setup', value: 45, color: '#10B981' },
  { label: 'Quality', value: 30, color: '#F97316' },
];

export default function DowntimeLog() {
  const [data] = useState(sampleData);

  const handleSearch = (value: string) => {
    console.log('Search:', value);
  };

  const handleRefresh = () => {
    console.log('Refresh');
  };

  const handleExport = () => {
    console.log('Export');
  };

  const handleAdd = () => {
    console.log('Add Downtime');
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  return (
    <PageLayout
      title="Downtime Log"
      onSearch={handleSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onAdd={handleAdd}
      onFilter={handleFilter}
      searchPlaceholder="Search downtime logs..."
    >
      {/* Chart first */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Downtime by Category</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Total Downtime: <span className="font-medium text-gray-700">330 min</span></span>
          </div>
        </div>
        <BarChart data={chartData} height={250} />
      </div>

      {/* Table second */}
      <DataGrid
        data={data}
        columns={columnDefs}
        height={450}
        pagination={true}
        pageSize={20}
      />
    </PageLayout>
  );
}