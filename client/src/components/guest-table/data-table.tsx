"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { type PaginationState } from '@tanstack/react-table';
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  pagination: PaginationState,
  pageCount?:number,
  sorting?:SortingState,
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  onRowClick:(row:TData) =>void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  pageCount,
  sorting,
  setSorting,
  onRowClick
}: DataTableProps<TData, TValue>) {
  const [rowSelection , setRowSelection ] = useState({});
  const table = useReactTable({
    data,
    columns,
    state:{
      sorting,
      pagination,
      rowSelection
    },
    pageCount:pageCount,
    onSortingChange:setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel :getPaginationRowModel(),
    onRowSelectionChange:setRowSelection
  })

  return (
    <div id="data-table"> 
    <div className="overflow-hidden ">
      <Table>
        <TableHeader  >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow 
            key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="hover:bg-table-header" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow 
                className="text-left text-[12px] hover:bg-secondary"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={()=> {
                  onRowClick(row.original)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
     {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </div>
  )
}