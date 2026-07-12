import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';

const columnDefs: ColDef[] = [
  { field: 'code', headerName: 'Code', width: 120 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'type', headerName: 'Type', width: 120 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'updated', headerName: 'Updated', width: 130 },
];

const mockData = [
  { code: 'M-001', name: 'Machine HT-28', type: 'Production', status: 'Active', updated: '2024-01-15' },
  { code: 'M-002', name: 'Machine HT-29', type: 'Production', status: 'Active', updated: '2024-01-14' },
  { code: 'M-003', name: 'Machine HT-30', type: 'Production', status: 'Inactive', updated: '2024-01-13' },
];

export default function MasterData() {
  const [data] = useState(mockData);

  return (
    <PageLayout title="Master Data">
      <div className="card">
        <DataGrid
          data={data}
          columns={columnDefs}
          height={500}
          pagination={true}
          pageSize={20}
        />
      </div>
    </PageLayout>
  );
}