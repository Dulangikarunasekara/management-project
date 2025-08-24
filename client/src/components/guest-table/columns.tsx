"use client"

import { type ColumnDef } from "@tanstack/react-table"

type Guest = {
  id: string;
  email: string;
  created: string;
}

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue, row }) => {
      console.log("Rendering ID cell:", getValue(), "Row data:", row.original);
      return <div>{getValue() as string}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue, row }) => {
      console.log("Rendering Email cell:", getValue(), "Row data:", row.original);
      return <div>{getValue() as string || 'No email'}</div>;
    },
  },
  {
    accessorKey: "created",
    header: "Created At",
    cell: ({ getValue, row }) => {
      console.log("Rendering Created cell:", getValue(), "Row data:", row.original);
      const value = getValue() as string;
      return <div>{value ? new Date(value).toLocaleString() : 'No date'}</div>;
    },
  }
]