import { DataGrid } from '@components/ui/DataGrid/DataGrid';
import { ColDef } from 'ag-grid-community';
import { ShiftGroup } from './ShiftGroup';

const columnDefs: ColDef[] = [
  { field: 'machine', headerName: 'Machine', width: 140 },
  { field: 'part', headerName: 'Part', flex: 1 },
  { field: 'color', headerName: 'Color', width: 100 },
  { field: 'startTime', headerName: 'Production Start', width: 140 },
  { field: 'endTime', headerName: 'Production End', width: 140 },
  { field: 'produced', headerName: 'Produced', width: 100 },
  { field: 'accepted', headerName: 'Accepted', width: 100 },
  { field: 'rejected', headerName: 'Rejected', width: 100 },
  { field: 'rework', headerName: 'Rework', width: 100 },
  { field: 'scrap', headerName: 'Scrap', width: 100 },
  { field: 'actions', headerName: 'Actions', width: 120 },
];

interface ProductionLogTableProps {
  shift1Data: any[];
  shift2Data: any[];
  loading?: boolean;
}

export const ProductionLogTable = ({ shift1Data, shift2Data, loading }: ProductionLogTableProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#6B7280]">
        Fetching production records...
      </div>
    );
  }

  return (
    <div>
      {shift1Data.length > 0 && (
        <ShiftGroup shift="Shift1">
          <DataGrid
            data={shift1Data}
            columns={columnDefs}
            height={300}
            pagination={false}
          />
        </ShiftGroup>
      )}
      
      {shift2Data.length > 0 && (
        <ShiftGroup shift="Shift2">
          <DataGrid
            data={shift2Data}
            columns={columnDefs}
            height={300}
            pagination={false}
          />
        </ShiftGroup>
      )}
    </div>
  );
};