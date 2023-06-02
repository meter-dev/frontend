"use client";

import { type ColumnDef } from "@tanstack/react-table";

export type Rule = {
  id: number;
  name: string;
  position: string;
  resource: string;
  operator: string;
  value: number;
  is_enable: boolean;
};

export const columns: ColumnDef<Rule>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "resource",
    header: "Resource",
  },
  {
    accessorKey: "position",
    header: "Rule",
    cell: ({ row }) => {
      const r = `${row.original.position} ${row.original.operator} ${row.original.value}`;
      return <div className="font-mono font-medium">{r}</div>;
    },
  },
  {
    accessorKey: "is_enable",
    header: "Status",
  },
];
