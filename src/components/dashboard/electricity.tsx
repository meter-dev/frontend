/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const MeterGauge = dynamic(() => import("./charts/gauge"), { ssr: false });
import { format } from "d3-format";

const Electricity: React.FC = () => {
  const data = {
    north: {
      value: 1139,
      min: 711,
      max: 1421,
    },
    central: {
      value: 883,
      min: 670,
      max: 1340,
    },
    south: {
      value: 1232,
      min: 650,
      max: 1300,
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon icon="ion:flash" className="mr-2 h-5 w-5" />
          <span className="text-2xl font-semibold">Electricity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full gap-x-4 overflow-x-scroll">
        <div className="flex w-[200px] flex-col items-center">
          <MeterGauge
            title="北部"
            value={data.north.value}
            min={data.north.min}
            max={data.north.max}
          />
          <div>
            備轉容量率：{format(".0%")((data.north.max - data.north.value) / data.north.value)}
          </div>
        </div>
        <div className="flex w-[200px] flex-col items-center">
          <MeterGauge
            title="中部"
            value={data.central.value}
            min={data.central.min}
            max={data.central.max}
          />
          <div>
            備轉容量率：
            {format(".0%")((data.central.max - data.central.value) / data.central.value)}
          </div>
        </div>
        <div className="flex w-[200px] flex-col items-center">
          <MeterGauge
            title="南部"
            value={data.south.value}
            min={data.south.min}
            max={data.south.max}
          />
          <div>
            備轉容量率：{format(".0%")((data.south.max - data.south.value) / data.south.value)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Electricity;
