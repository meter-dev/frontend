"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { RESOURCES } from "./options";

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
    cell: ({ row }) => {
      return RESOURCES.find((r) => r.value === row.original.resource)?.label;
    },
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-1">
          <Icon
            icon={row.original.is_enable ? "mdi:check-bold" : "mdi:close-thick"}
            className={row.original.is_enable ? "text-green-500" : "text-red-500"}
          />
          {row.original.is_enable ? "Enabled" : "Disabled"}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: () => {
      return (
        <div className="flex items-center gap-x-2">
          <Button variant="link" onClick={() => alert("TODO :(")}>
            Edit
          </Button>
        </div>
      );
    },
  },
];
