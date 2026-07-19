'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  rowKey: string;
  onRowClick?: (row: any) => void;
  striped?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  onSelect?: (rows: any[]) => void;
  pagination?: {
    total: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
  isLoading?: boolean;
  emptyState?: ReactNode;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowKey,
  onRowClick,
  striped = true,
  hoverable = true,
  selectable = false,
  onSelect,
  pagination,
  isLoading = false,
  emptyState,
}) => {
  const [selectedRows, setSelectedRows] = React.useState<Set<any>>(new Set());

  const handleSelectRow = (row: any) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(row[rowKey])) {
      newSelected.delete(row[rowKey]);
    } else {
      newSelected.add(row[rowKey]);
    }
    setSelectedRows(newSelected);
    onSelect?.(Array.from(newSelected));
  };

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((row) => row[rowKey])));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-primary-600 rounded-full" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return emptyState ? <div>{emptyState}</div> : null;
  }

  return (
    <div className="overflow-x-auto rounded-[16px] border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {selectable && (
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="rounded accent-primary-600"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 font-semibold text-slate-900 text-left ${
                  column.align === 'center' ? 'text-center' : ''
                } ${column.align === 'right' ? 'text-right' : ''} ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <motion.tr
              key={row[rowKey]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`
                border-b border-slate-200 transition-colors
                ${hoverable ? 'hover:bg-slate-50 cursor-pointer' : ''}
                ${striped && index % 2 === 1 ? 'bg-slate-50' : 'bg-white'}
              `}
              onClick={() => onRowClick?.(row)}
            >
              {selectable && (
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row[rowKey])}
                    onChange={() => handleSelectRow(row)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded accent-primary-600"
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={`${row[rowKey]}-${column.key}`}
                  className={`px-4 py-3 text-slate-700 ${
                    column.align === 'center' ? 'text-center' : ''
                  } ${column.align === 'right' ? 'text-right' : ''} ${column.className || ''}`}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="text-sm text-slate-600">
            Page {pagination.currentPage} of {Math.ceil(pagination.total / pagination.pageSize)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-1 rounded-lg border border-slate-200 text-sm font-medium disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= Math.ceil(pagination.total / pagination.pageSize)}
              className="px-3 py-1 rounded-lg border border-slate-200 text-sm font-medium disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
