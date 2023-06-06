import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Icon } from "@iconify/react";
import { type ColumnDef } from "@tanstack/react-table";
import Bulb from "../bulb";
import { formatTime, fromNow } from "~/lib/dt";
import { type EarthquakeResource } from "~/lib/resource";
import { DataTable } from "../ui/data-table";
import SkeletonTable from "../ui/skeleton-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

interface EarthquakeProps {
  data?: EarthquakeResource[];
}

const Earthquake: React.FC<EarthquakeProps> = ({ data }) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon icon="ion:heart-broken" className="mr-2 h-5 w-5" />
          <span className="text-2xl font-semibold">Earthquake</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {data ? (
          <DataTable columns={columns} data={data.slice(0, 5)} />
        ) : (
          <SkeletonTable row={5} col={columns.length} />
        )}
      </CardContent>
    </Card>
  );
};

const bulbStatus = (v: number) => {
  if (v <= 0) return "ok";
  if (v <= 1) return "warning";
  if (v <= 3) return "danger";
  return "danger";
};

export const columns: ColumnDef<EarthquakeResource>[] = [
  {
    accessorKey: "timestamp",
    header: "時間",
    cell: ({ row }) => {
      return (
        <div>
          <div>{fromNow(row.original.timestamp * 1000)}</div>
          <div className="text-xs text-primary/50">{formatTime(row.original.timestamp * 1000)}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "intensity-chu",
    header: "竹廠震度",
    cell: ({ row }) => {
      return (
        <Bulb
          status={bulbStatus(row.original.intensity[0])}
          value={`${row.original.intensity[0]}`}
        />
      );
    },
  },
  {
    accessorKey: "intensity-chung",
    header: "中廠震度",
    cell: ({ row }) => {
      return (
        <Bulb
          status={bulbStatus(row.original.intensity[1])}
          value={`${row.original.intensity[1]}`}
        />
      );
    },
  },
  {
    accessorKey: "intensity-nan",
    header: "南廠震度",
    cell: ({ row }) => {
      return (
        <Bulb
          status={bulbStatus(row.original.intensity[2])}
          value={`${row.original.intensity[2]}`}
        />
      );
    },
  },
  {
    accessorKey: "scale",
    header: "芮氏規模",
  },
  {
    accessorKey: "img",
    header: "報告圖",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">檢視</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-5xl">
            <DialogHeader>
              <DialogTitle>
                <div className="flex gap-x-1">
                  <Icon icon="octicon:link-external-16" className="mr-2 h-5 w-5" />
                  <a href={row.original.link} target="_blank" rel="noopener noreferrer">
                    地震報告連結點此
                  </a>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <Image
                width={900}
                height={(772 * 900) / 1030}
                src={row.original.img}
                alt="地震報告圖"
              />
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export default Earthquake;
