// src/features/production-log/components/MachineGroup.tsx

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { TextFilterModule } from 'ag-grid-community';
import { NumberFilterModule } from 'ag-grid-community';
import { TooltipModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  TooltipModule,
]);

interface ProductionLog {
  id: string;
  plan: string;
  part: string;
  colorName: string;
  productionStart: string;
  productionEnd: string;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
}

interface MachineGroupProps {
  machineName: string;
  logs: ProductionLog[];
  loading?: boolean;
  operator: string;
  onOperatorChange: (operator: string) => void;
}

const mockOperators = [
  { id: 'op1', name: 'John Doe' },
  { id: 'op2', name: 'Jane Smith' },
  { id: 'op3', name: 'Bob Johnson' },
  { id: 'op4', name: 'Alice Williams' },
];

export const MachineGroup: React.FC<MachineGroupProps> = ({
  machineName,
  logs,
  loading = false,
  operator,
  onOperatorChange,
}) => {
  const columnDefs = useMemo(() => [
    { field: 'plan', headerName: 'Plan', width: 100, cellStyle: { fontWeight: 500 } },
    { field: 'part', headerName: 'Part', width: 180, cellStyle: { color: '#6B7280' } },
    { field: 'colorName', headerName: 'Color Name', width: 100, cellStyle: { color: '#6B7280' } },
    { field: 'productionStart', headerName: 'Production start', width: 120, cellStyle: { color: '#6B7280' } },
    { field: 'productionEnd', headerName: 'Production end', width: 120, cellStyle: { color: '#6B7280' } },
    { field: 'produced', headerName: 'Produced', width: 90, cellStyle: { fontWeight: 500, textAlign: 'right' } },
    { field: 'accepted', headerName: 'Accepted', width: 90, cellStyle: { fontWeight: 500, color: '#3AA64A', textAlign: 'right' } },
    { field: 'rejected', headerName: 'Rejected', width: 90, cellStyle: { fontWeight: 500, color: '#FF3D3D', textAlign: 'right' } },
    { field: 'rework', headerName: 'Rework', width: 80, cellStyle: { color: '#6B7280', textAlign: 'right' } },
    { field: 'scrap', headerName: 'Scrap (In Kg)', width: 100, cellStyle: { color: '#F59E0B', textAlign: 'right' } },
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    headerClass: 'text-[10px] text-[#6B7280] font-normal uppercase tracking-[0.05em]',
  }), []);

  return (
    <div>
      {/* Machine Title */}
      <div className="text-[18px] font-medium text-[#1F2937] mb-1">
        {machineName}
      </div>

      {/* Operator Dropdown */}
      <select
        value={operator}
        onChange={(e) => onOperatorChange(e.target.value)}
        className="w-[280px] h-10 px-4 pr-10 text-[13px] bg-[#F3F4F6] border-0 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#33479A] appearance-none cursor-pointer hover:bg-[#E5E7EB] transition-colors"
      >
        <option value="">Select Operator</option>
        {mockOperators.map((op) => (
          <option key={op.id} value={op.id}>{op.name}</option>
        ))}
      </select>

      {/* AG Grid with auto height and scroll */}
      <div className="ag-theme-alpine w-full mt-3" style={{ height: '400px', width: '100%' }}>
        <AgGridReact
          rowData={logs}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          loading={loading}
          rowHeight={44}
          headerHeight={36}
          suppressRowClickSelection={true}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          domLayout="normal"
        />
      </div>
    </div>
  );
};

export default MachineGroup;