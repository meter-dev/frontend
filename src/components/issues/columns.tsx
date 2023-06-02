"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { twMerge } from "tailwind-merge";
import { fontClasses } from "~/lib/fonts";

export type Issue = {
  id: string;
  title: string;
  description: string;
  alertId: string;
  status: "unresolved" | "reviewing" | "resolved";
  assignees: string[];
  createdAt: string;
  updatedAt: string;
  closedAt: string;
  closedBy: string;
};

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "alertId",
    header: "Alert",
  },
  {
    accessorKey: "assignees",
    header: "Assignees",
    cell: ({ row }) => {
      return (
        <div className="flex gap-x-2">
          {row.original.assignees.slice(0, 2).map((username) => {
            return (
              <TooltipProvider key={username}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-8 w-8">
                      {/* <AvatarImage src={user.avatar} /> */}
                      <AvatarFallback className="uppercase">{username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{username}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
          {row.original.assignees.length > 2 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-secondary">
                {row.original.assignees.length - 2}+
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {row.original.assignees.map((username) => (
                  <DropdownMenuItem key={username} className={twMerge("font-sans", fontClasses)}>
                    <Avatar key={username} className="h-8 w-8">
                      {/* <AvatarImage src={user.avatar} /> */}
                      <AvatarFallback className="uppercase">{username.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="ml-4">{username}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
