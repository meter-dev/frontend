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
import { formatTime } from "~/lib/dt";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
// import { Button } from "../ui/button";
import Issue from "./issue";

// export type Issue = {
//   id: string;
//   title: string;
//   description: string;
//   alertId: string;
//   status: "unresolved" | "reviewing" | "resolved";
//   assignees: string[];
//   createdAt: string;
//   updatedAt: string;
//   closedAt: string;
//   closedBy: string;
// };

export type IssueListItem = {
  id: number;
  title: string;
  status: "CREATED" | "PROCESSING" | "SOLVED";
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<IssueListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "名稱",
  },
  {
    header: "負責人",
    cell: () => {
      const assignees = ["Alice", "Bob", "Eve", "Carol"];
      return (
        <div className="flex gap-x-2">
          {assignees.slice(0, 2).map((username) => {
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
          {assignees.length > 2 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-secondary">
                {assignees.length - 2}+
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {assignees.map((username) => (
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
    accessorKey: "created_at",
    header: "建立於",
    cell: ({ row }) => {
      return formatTime(row.original.created_at);
    },
  },
  {
    header: "詳細",
    cell: ({ row }) => (
      <Issue id={row.original.id} />
      // <Dialog>
      //   <DialogTrigger>
      //     <Button variant="outline">檢視</Button>
      //   </DialogTrigger>
      //   <DialogContent className={twMerge("font-sans", fontClasses, "sm:max-w-5xl")}>
      //     <DialogHeader>
      //       <DialogTitle>
      //         {row.original.id} - {row.original.title}
      //       </DialogTitle>
      //       {/* <DialogDescription>{row.original.content}</DialogDescription> */}
      //     </DialogHeader>
      //   </DialogContent>
      // </Dialog>
    ),
  },
];
