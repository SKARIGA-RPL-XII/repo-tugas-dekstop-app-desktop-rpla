import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  loadingSkeletonRows?: number;
  noDataComponent?: React.ReactNode;
  noResultsComponent?: React.ReactNode;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  loadingSkeletonRows = 5,
  noDataComponent,
  noResultsComponent,
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const renderFallback = () => {
    if (isLoading) {
      return Array.from({ length: loadingSkeletonRows }).map((_, idx) => (
        <TableRow key={`skeleton-${idx}`}>
          {columns.map((col, cidx) => (
            <TableCell key={`skeleton-${cidx}`}>
              <Skeleton className="h-4 w-full rounded-md" />
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    if (!data.length) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 p-0">
            <div className="flex flex-col items-center justify-center w-full h-full">
              {noDataComponent ?? <div>No data</div>}
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (!table.getRowModel().rows.length) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 p-0">
            <div className="flex flex-col items-center justify-center w-full h-full">
              {noResultsComponent ?? <div>No results</div>}
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return null;
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const handlePrev = () => {
    if (page > 1) onPageChange?.(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange?.(page + 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-hidden rounded-md">
        <Table>
          <TableHeader className="bg-[#E2E8F0]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow isHeader key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header?.toString() ?? header.column.id}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {renderFallback() ||
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : (cell.column.columnDef.cell as React.ReactNode) ?? cell.getValue()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {total > pageSize && !isLoading && (
        <div className="flex justify-between items-center mt-8">
          <div className="text-sm text-gray-600">
            Menampilkan {start}-{end} dari {total} data
          </div>

          <div className="flex items-center gap-1">
            <Button variant="outline" className="rounded-full p-2" onClick={handlePrev} disabled={page <= 1}>
              <ChevronLeft size={16} />
            </Button>

            {pageNumbers.map((p, idx) =>
              typeof p === "number" ? (
                <Button
                  key={idx}
                  variant={p === page ? "primary" : "outline"}
                  className="rounded-full w-8 h-8 p-0"
                  onClick={() => onPageChange?.(p)}
                >
                  {p}
                </Button>
              ) : (
                <span key={idx} className="px-2">
                  {p}
                </span>
              )
            )}

            <Button variant="outline" className="rounded-full p-2 disabled:cursor-not-allowed" onClick={handleNext} disabled={page >= totalPages}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
