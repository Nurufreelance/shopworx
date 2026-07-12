import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';

const columnDefs: ColDef[] = [
  { field: 'start', headerName: 'Start', width: 130 },
  { field: 'end', headerName: 'End', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 80 },
  { field: 'machine', headerName: 'Machine', width: 100 },
  { field: 'reason', headerName: 'Reason', width: 130 },
  { field: 'category', headerName: 'Category', width: 100 },
  { field: 'operator', headerName: 'Operator', width: 100 },
  { field: 'shift', headerName: 'Shift', width: 70 },
];

const mockData = [
  { start: '08:00', end: '08:30', duration: '30min', machine: 'HT-28', reason: 'Break', category: 'Planned', operator: 'John D', shift: 'A' },
  { start: '09:30', end: '10:00', duration: '30min', machine: 'HT-29', reason: 'Setup', category: 'Planned', operator: 'Sarah S', shift: 'A' },
  { start: '10:15', end: '10:45', duration: '30min', machine: 'HT-30', reason: 'Maintenance', category: 'Unplanned', operator: 'Mike W', shift: 'B' },
];

export default function Downtime() {
  const [data] = useState(mockData);

  return (
    <PageLayout title="Downtime">
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