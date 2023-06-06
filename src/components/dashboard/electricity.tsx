/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const MeterGauge = dynamic(() => import("./charts/gauge"), { ssr: false });
import { format } from "d3-format";
import { type EletricityResource } from "~/lib/resource";
import SkeletonGauge from "../ui/skeleton-gauge";
import { formatTime, fromNow } from "~/lib/dt";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type Area = "north" | "central" | "south" | "east" | "whole";

interface ElectricityProps {
  data?: EletricityResource;
}

const Electricity: React.FC<ElectricityProps> = ({ data }) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon icon="ion:flash" className="mr-2 h-5 w-5" />
          <span className="text-2xl font-semibold">Electricity</span>
          {data && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-3 self-end text-xs font-normal text-primary/50">
                    最後更新於：{fromNow(data?.timestamp * 1000)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-xs font-normal">{formatTime(data?.timestamp * 1000)}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-wrap gap-x-6 overflow-x-auto">
        {[
          { title: "全台", key: "whole" },
          { title: "北部", key: "north" },
          { title: "中部", key: "central" },
          { title: "南部", key: "south" },
          { title: "東部", key: "east" },
        ].map(({ title, key }) => {
          if (!data) return <SkeletonGauge key={key} />;
          const value = data[key as Area];
          return (
            <div className="flex w-[200px] flex-col items-center" key={key}>
              <MeterGauge
                title={title}
                value={value.load}
                min={Math.floor(value.max_supply / 2)}
                max={Math.ceil(value.max_supply)}
              />
              <div>備轉容量率：{format(".0%")(value.recv_rate / 100)}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Electricity;
