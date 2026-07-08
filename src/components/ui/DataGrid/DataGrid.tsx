import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
  ColDef, 
  GridOptions,
  ModuleRegistry,
} from 'ag-grid-community';
import { 
  ClientSideRowModelModule,
  FilterModule,
  SortModule,
  PaginationModule,
  RowSelectionModule,
} from 'ag-grid-community';
import { cn } from '@utils/cn';

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  FilterModule,
  SortModule,
  PaginationModule,
  RowSelectionModule,
]);

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface DataGridProps<T = any> {
  data: T[];
  columns: ColDef[];
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
  height?: number | string;
  className?: string;
  onRowClick?: (data: T) => void;
  onCellValueChanged?: (params: any) => void;
  rowSelection?: 'single' | 'multiple';
  gridOptions?: GridOptions;
}

export const DataGrid = ({
  data,
  columns,
  loading = false,
  pagination = true,
  pageSize = 50,
  height = 500,
  className,
  onRowClick,
  onCellValueChanged,
  rowSelection,
  gridOptions = {},
}: DataGridProps) => {
  const [gridApi, setGridApi] = useState<any>(null);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    minWidth: 80,
    flex: 1,
  }), []);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onRowClicked = (params: any) => {
    if (onRowClick) {
      onRowClick(params.data);
    }
  };

  const onCellValueChangedHandler = (params: any) => {
    if (onCellValueChanged) {
      onCellValueChanged(params);
    }
  };

  return (
    <div className={cn(
      "ag-theme-alpine border border-[#E5E7EB] rounded",
      className
    )}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onRowClicked={onRowClicked}
        onCellValueChanged={onCellValueChangedHandler}
        rowSelection={rowSelection}
        pagination={pagination}
        paginationPageSize={pageSize}
        loading={loading}
        style={{ height: typeof height === 'number' ? height : height }}
        animateRows={true}
        {...gridOptions}
      />
    </div>
  );
};