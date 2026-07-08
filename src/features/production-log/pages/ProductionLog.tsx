import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';
import { BarChart } from '@components/ui/Chart/BarChart';

const columnDefs: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'hour', headerName: 'Hour', width: 80 },
  { field: 'machine', headerName: 'Machine', flex: 1 },
  { field: 'operator', headerName: 'Operator', flex: 1 },
  { field: 'product', headerName: 'Product', flex: 1 },
  { field: 'produced', headerName: 'Produced', width: 100 },
  { field: 'target', headerName: 'Target', width: 100 },
  { field: 'efficiency', headerName: 'Efficiency', width: 100 },
  { field: 'shift', headerName: 'Shift', width: 80 },
];

const sampleData = [
  { date: '2024-01-15', hour: '08:00', machine: 'LI-43-OM-910', operator: 'Mike Johnson', product: 'Widget A', produced: 145, target: 160, efficiency: '91%', shift: 'A' },
  { date: '2024-01-15', hour: '09:00', machine: 'LI-44-OM-920', operator: 'Sarah Smith', product: 'Widget B', produced: 82, target: 100, efficiency: '82%', shift: 'A' },
  { date: '2024-01-15', hour: '10:00', machine: 'LI-45-OM-930', operator: 'Tom Wilson', product: 'Widget C', produced: 0, target: 200, efficiency: '0%', shift: 'A' },
  { date: '2024-01-15', hour: '11:00', machine: 'LI-46-OM-940', operator: 'Emma Davis', product: 'Widget D', produced: 120, target: 150, efficiency: '80%', shift: 'A' },
  { date: '2024-01-15', hour: '12:00', machine: 'LI-47-OM-950', operator: 'James Brown', product: 'Widget E', produced: 45, target: 180, efficiency: '25%', shift: 'B' },
];

const chartData = [
  { label: '08:00', value: 145 },
  { label: '09:00', value: 82 },
  { label: '10:00', value: 0 },
  { label: '11:00', value: 120 },
  { label: '12:00', value: 45 },
];

export default function ProductionLog() {
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
      title="Production Log"
      onSearch={handleSearch}
      onRefresh={handleRefresh}
      onExport={handleExport}
    >
      {/* Chart first */}
      <div className="mb-4">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Production by Hour</h2>
        <BarChart data={chartData} height={250} />
      </div>

      {/* Table second */}
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