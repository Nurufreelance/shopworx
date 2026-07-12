import { useState } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';

const columnDefs: ColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'shift', headerName: 'Shift', width: 70 },
  { field: 'machine', headerName: 'Machine', width: 100 },
  { field: 'operator', headerName: 'Operator', width: 100 },
  { field: 'produced', headerName: 'Produced', width: 80 },
  { field: 'target', headerName: 'Target', width: 80 },
  { field: 'efficiency', headerName: 'Efficiency', width: 80 },
  { field: 'downtime', headerName: 'Downtime', width: 80 },
  { field: 'quality', headerName: 'Quality', width: 80 },
];

const mockData = [
  { date: '2024-01-15', shift: 'A', machine: 'HT-28', operator: 'John D', produced: 135, target: 160, efficiency: '84%', downtime: '30min', quality: '96%' },
  { date: '2024-01-15', shift: 'A', machine: 'HT-29', operator: 'Sarah S', produced: 100, target: 200, efficiency: '50%', downtime: '20min', quality: '98%' },
  { date: '2024-01-15', shift: 'B', machine: 'HT-30', operator: 'Mike W', produced: 0, target: 150, efficiency: '0%', downtime: '40min', quality: '95%' },
];

export default function Reports() {
  const [data] = useState(mockData);
  const [activeTab, setActiveTab] = useState('production');

  const tabs = ['Production', 'Downtime', 'Quality', 'Performance'];

  return (
    <PageLayout title="Reports">
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-1.5 text-[11px] font-medium rounded-[8px] transition-colors ${
              activeTab === tab.toLowerCase()
                ? 'bg-[#2F6BFF] text-white'
                : 'text-[#6B7280] hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="card">
        <DataGrid
          data={mockData}
          columns={columnDefs}
          height={500}
          pagination={true}
          pageSize={20}
        />
      </div>
    </PageLayout>
  );
}