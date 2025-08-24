"use client"

import type { Guest } from "@/api/guest";
import { type ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue, row }) => {
      console.log("Rendering ID cell:", getValue(), "Row data:", row.original)
      return <div>{getValue() as string}</div>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue, row }) => {
      console.log("Rendering Email cell:", getValue(), "Row data:", row.original)
      return <div>{getValue() as string || 'No email'}</div>
    },
  },
  {
    accessorKey: "created",
    header: "Created At",
    cell: ({ getValue, row }) => {
      console.log("Rendering Created cell:", getValue(), "Row data:", row.original)
      const value = getValue() as string
      return <div>{value ? new Date(value).toLocaleString() : 'No date'}</div>
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ getValue, row }) => {
      const value = getValue() as string
      return <div>{value || 'No first name'}</div>
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ getValue, row }) => {
      const value = getValue() as string
      return <div>{value || 'No last name'}</div>
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ getValue, row }) => {
      const value = getValue() as string
      return <div>{value || 'No address'}</div>
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue, row }) => {
      const value = getValue() as number
      return <div>{value ?? 'No phone'}</div>
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue, row }) => {
      const value = getValue() as Date
      return <div>{value ? new Date(value).toLocaleDateString() : 'No date'}</div>
    },
  },
]