import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';
import { BarChart } from '@components/ui/Chart/BarChart';

const columnDefs: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'shift', headerName: 'Shift', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'operator', headerName: 'Operator', flex: 0.8 },
  { field: 'operatorCode', headerName: 'Op Code', width: 100 },
  { field: 'plan', headerName: 'Plan', flex: 0.8 },
  { field: 'part', headerName: 'Part', flex: 0.8 },
  { field: 'efficiency', headerName: 'Efficiency', width: 100 },
  { field: 'runtime', headerName: 'Runtime (min)', width: 100 },
  { field: 'delay', headerName: 'Delay (min)', width: 100 },
  { field: 'reject', headerName: 'Reject', width: 100 },
];

const sampleData = [
  { date: '2024-01-15', shift: 'A', machine: 'LI-43-OM-910', operator: 'Mike Johnson', operatorCode: 'OP-001', plan: 'PLN-001', part: 'Widget A', efficiency: '95%', runtime: 480, delay: 45, reject: 5 },
  { date: '2024-01-15', shift: 'A', machine: 'LI-44-OM-920', operator: 'Sarah Smith', operatorCode: 'OP-002', plan: 'PLN-002', part: 'Widget B', efficiency: '88%', runtime: 420, delay: 30, reject: 4 },
  { date: '2024-01-15', shift: 'A', machine: 'LI-45-OM-930', operator: 'Tom Wilson', operatorCode: 'OP-003', plan: 'PLN-003', part: 'Widget C', efficiency: '0%', runtime: 0, delay: 60, reject: 0 },
  { date: '2024-01-15', shift: 'A', machine: 'LI-46-OM-940', operator: 'Emma Davis', operatorCode: 'OP-004', plan: 'PLN-004', part: 'Widget D', efficiency: '92%', runtime: 450, delay: 30, reject: 5 },
  { date: '2024-01-15', shift: 'B', machine: 'LI-47-OM-950', operator: 'James Brown', operatorCode: 'OP-005', plan: 'PLN-005', part: 'Widget E', efficiency: '45%', runtime: 240, delay: 90, reject: 3 },
  { date: '2024-01-15', shift: 'B', machine: 'LI-48-OM-960', operator: 'Lisa Anderson', operatorCode: 'OP-006', plan: 'PLN-006', part: 'Widget F', efficiency: '90%', runtime: 480, delay: 45, reject: 3 },
];

const chartData = [
  { label: 'Runtime', value: 480, color: '#3B82F6' },
  { label: 'Delay', value: 45, color: '#EF4444' },
  { label: 'Reject', value: 5, color: '#F59E0B' },
];

export default function Performance() {
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

  return (
    <PageLayout
      title="Performance Reports"
      onSearch={handleSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
      searchPlaceholder="Search performance records..."
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">Operator Performance</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Avg Efficiency: <span className="font-medium text-gray-700">68%</span></span>
          </div>
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