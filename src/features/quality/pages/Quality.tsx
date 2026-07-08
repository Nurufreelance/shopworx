import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';
import { BarChart } from '@components/ui/Chart/BarChart';

const columnDefs: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'hour', headerName: 'Hour', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'operator', headerName: 'Operator', flex: 0.8 },
  { field: 'part', headerName: 'Part', flex: 1 },
  { field: 'plan', headerName: 'Plan', flex: 0.8 },
  { field: 'produced', headerName: 'Produced', width: 100 },
  { field: 'accepted', headerName: 'Accepted', width: 100 },
  { field: 'rejected', headerName: 'Rejected', width: 100 },
  { field: 'defectRate', headerName: 'Defect Rate', width: 100 },
  { field: 'shift', headerName: 'Shift', width: 80 },
];

const sampleData = [
  { date: '2024-01-15', hour: '08:00', machine: 'LI-43-OM-910', operator: 'Mike Johnson', part: 'Widget A', plan: 'PLN-001', produced: 145, accepted: 140, rejected: 5, defectRate: '3.4%', shift: 'A' },
  { date: '2024-01-15', hour: '09:00', machine: 'LI-44-OM-920', operator: 'Sarah Smith', part: 'Widget B', plan: 'PLN-002', produced: 82, accepted: 78, rejected: 4, defectRate: '4.9%', shift: 'A' },
  { date: '2024-01-15', hour: '10:00', machine: 'LI-45-OM-930', operator: 'Tom Wilson', part: 'Widget C', plan: 'PLN-003', produced: 0, accepted: 0, rejected: 0, defectRate: '0%', shift: 'A' },
  { date: '2024-01-15', hour: '11:00', machine: 'LI-46-OM-940', operator: 'Emma Davis', part: 'Widget D', plan: 'PLN-004', produced: 120, accepted: 115, rejected: 5, defectRate: '4.2%', shift: 'A' },
  { date: '2024-01-15', hour: '12:00', machine: 'LI-47-OM-950', operator: 'James Brown', part: 'Widget E', plan: 'PLN-005', produced: 45, accepted: 42, rejected: 3, defectRate: '6.7%', shift: 'B' },
  { date: '2024-01-15', hour: '13:00', machine: 'LI-48-OM-960', operator: 'Lisa Anderson', part: 'Widget F', plan: 'PLN-006', produced: 90, accepted: 87, rejected: 3, defectRate: '3.3%', shift: 'B' },
];

const chartData = [
  { label: 'Widget A', value: 5, color: '#3B82F6' },
  { label: 'Widget B', value: 4, color: '#10B981' },
  { label: 'Widget C', value: 0, color: '#F59E0B' },
  { label: 'Widget D', value: 5, color: '#EF4444' },
  { label: 'Widget E', value: 3, color: '#8B5CF6' },
  { label: 'Widget F', value: 3, color: '#F97316' },
];

export default function Quality() {
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
    console.log('Add Quality Check');
  };

  return (
    <PageLayout
      title="Quality"
      onSearch={handleSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
      onAdd={handleAdd}
      searchPlaceholder="Search quality records..."
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Rejected by Part</h2>
          <span className="text-xs text-gray-500">Total Rejected: <span className="font-medium text-gray-700">20</span></span>
        </div>
        <BarChart data={chartData} height={250} />
      </div>

      <DataGrid
        data={data}
        columns={columnDefs}
        height={400}
        pagination={true}
        pageSize={10}
      />
    </PageLayout>
  );
}