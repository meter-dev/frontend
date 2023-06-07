"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { RESOURCES } from "./options";

export type Rule = {
  id: number;
  name: string;
  position: string;
  resource: "RECV_RATE" | "PERCENT" | "INTENSITY";
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
    header: "規則名稱",
  },
  {
    accessorKey: "resource",
    header: "監控資源",
    cell: ({ row }) => {
      return RESOURCES.find((r) => r.value === row.original.resource)?.label;
    },
  },
  {
    accessorKey: "position",
    header: "警報規則",
    cell: ({ row }) => {
      const r = `${row.original.position} ${row.original.operator} ${row.original.value}`;
      return <div className="font-mono font-medium">{r}</div>;
    },
  },
  {
    accessorKey: "is_enable",
    header: "啟用狀態",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-1">
          <Icon
            icon={row.original.is_enable ? "mdi:check-bold" : "mdi:close-thick"}
            className={row.original.is_enable ? "text-green-500" : "text-red-500"}
          />
          {row.original.is_enable ? "啟用中" : "禁用中"}
        </div>
      );
    },
  },
  {
    header: "操作",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Button variant="link" onClick={() => row.toggleExpanded()} className="px-0">
            Edit
          </Button>
        </div>
      );
    },
  },
];
