// src/features/production-planning/components/PlanningTable.tsx

import React from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { ProductionPlan } from '../types/productionPlanning';
import { format } from 'date-fns';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import { IconButton } from '@components/ui/IconButton/IconButton';

interface PlanningTableProps {
  plans: ProductionPlan[];
  onPlanClick: (planId: string) => void;
  onFavoriteToggle: (planId: string) => void;
  onCopyPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
}

export const PlanningTable: React.FC<PlanningTableProps> = ({
  plans,
  onPlanClick,
  onFavoriteToggle,
  onCopyPlan,
  onDeletePlan,
}) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'planNumber',
        header: 'Plan',
        cell: ({ row }: any) => (
          <span
            className="text-[11px] font-medium cursor-pointer hover:underline text-[#2B6CB0]"
            onClick={() => onPlanClick(row.original.id)}
          >
            {row.original.planNumber}
          </span>
        ),
        size: 120,
      },
      {
        accessorKey: 'part.name',
        header: 'Part',
        cell: ({ row }: any) => (
          <span className="text-[11px] text-[#1A1F36] truncate max-w-[180px] block">
            {row.original.part.name}
          </span>
        ),
        size: 180,
      },
      {
        accessorKey: 'color.name',
        header: 'Color',
        cell: ({ row }: any) => (
          <span className="text-[11px] text-[#8896AB]">
            {row.original.color?.name || 'NA'}
          </span>
        ),
        size: 80,
      },
      {
        accessorKey: 'equipment.name',
        header: 'Equipment',
        cell: ({ row }: any) => (
          <span className="text-[11px] text-[#1A1F36] truncate max-w-[140px] block">
            {row.original.equipment.name}
          </span>
        ),
        size: 140,
      },
      {
        accessorKey: 'plannedQuantity',
        header: 'Planned qty',
        cell: ({ row }: any) => (
          <span className="text-[11px] font-medium text-[#1A1F36] text-right block">
            {row.original.plannedQuantity.toLocaleString()}
          </span>
        ),
        size: 100,
      },
      {
        accessorKey: 'startDate',
        header: 'Start at',
        cell: ({ row }: any) => (
          <span className="text-[11px] text-[#8896AB]">
            {format(new Date(row.original.startDate), 'MMM d, HH:mm')}
          </span>
        ),
        size: 120,
      },
      {
        id: 'actions',
        header: 'Action',
        cell: ({ row }: any) => (
          <div className="flex items-center justify-center gap-0.5">
            <IconButton
              icon={
                row.original.isFavorite ? (
                  <svg className="w-3.5 h-3.5 text-[#D69E2E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              }
              onClick={() => onFavoriteToggle(row.original.id)}
              tooltip={row.original.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            />
            <IconButton
              icon={
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
              onClick={() => onCopyPlan(row.original.id)}
              tooltip="Copy plan"
            />
            <IconButton
              icon={
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
              onClick={() => onDeletePlan(row.original.id)}
              tooltip="Delete plan"
              className="hover:text-[#E53E3E] hover:bg-[#FFF5F5]"
            />
          </div>
        ),
        size: 100,
      },
    ],
    [onPlanClick, onFavoriteToggle, onCopyPlan, onDeletePlan]
  );

  const table = useReactTable({
    data: plans,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-[#EDF2F7] bg-[#F7F8FA]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-1 text-left text-[9px] font-semibold text-[#8896AB] uppercase tracking-[0.04em]"
                  style={{ width: header.column.getSize() }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#EDF2F7] hover:bg-[#F7F8FA] transition-colors duration-150"
              style={{ height: '34px' }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};