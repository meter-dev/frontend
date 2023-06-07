/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import SkeletonTable from "../ui/skeleton-table";
import { type Rule, columns } from "./columns";
import { useState } from "react";
import RuleForm from "./rule-form";

interface RuleTableProps {
  data?: Rule[];
  onSuccess: () => void;
}

const RuleTable: React.FC<RuleTableProps> = ({ data, onSuccess }) => {
  return (
    <div className="w-full">
      {data ? (
        <DataTable columns={columns} data={data} onSuccess={onSuccess} />
      ) : (
        <SkeletonTable row={5} col={columns.length} />
      )}
    </div>
  );
};

export default RuleTable;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSuccess: () => void;
}

function DataTable<TData, TValue>({ columns, data, onSuccess }: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <>
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <tr key={`${row.id}-expanded`}>
                    <td colSpan={columns.length}>
                      <div className="px-10 pb-10 pt-6">
                        <div className="mb-2 text-xl font-medium">
                          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                          {/* @ts-ignore */}
                          修改警告規則：{data[row.index].id}
                        </div>
                        <RuleForm
                          editRule={{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            id: data[row.index].id,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            name: data[row.index].name,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            position: data[row.index].position,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            resource: data[row.index].resource,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            operator: data[row.index].operator,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            value: data[row.index].value,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            is_enable: data[row.index].is_enable,
                          }}
                          onCancel={() => row.toggleExpanded()}
                          onSuccess={() => {
                            row.toggleExpanded();
                            onSuccess();
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                查無結果
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
