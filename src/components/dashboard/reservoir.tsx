import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { type WaterResource } from "~/lib/resource";
import SkeletonLiquid from "../ui/skeleton-liquid";
const MeterLiquid = dynamic(() => import("./charts/liquid"), { ssr: false });

interface ReservoirProps {
  data?: WaterResource[];
}

const LG = 160;
const MD = 130;

const MixedReservoir: React.FC<{ data?: WaterResource }> = ({ data }) => {
  if (!data) return <SkeletonLiquid width={LG} />;
  return (
    <MeterLiquid
      title={data.name}
      width={LG}
      timestamp={data.timestamp}
      storage={data.storage}
      percent={data.percent / 100}
    />
  );
};
const IndivReservoir: React.FC<{ data?: WaterResource }> = ({ data }) => {
  if (!data) return <SkeletonLiquid width={MD} />;
  return (
    <MeterLiquid
      title={data.name}
      width={MD}
      timestamp={data.timestamp}
      storage={data.storage}
      percent={data.percent / 100}
    />
  );
};

const Reservoir: React.FC<ReservoirProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon icon="ion:water-sharp" className="mr-2 h-5 w-5" />
          <span className="text-2xl font-semibold">Reservoir</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-wrap justify-between">
        <div className="grid grid-cols-3 place-content-center gap-2">
          <div className="col-span-3 flex w-full justify-center">
            {<MixedReservoir data={data?.find((d) => d.name === "竹")} />}
          </div>
          {["石門水庫", "寶山第二水庫", "永和山水庫"].map((name) => (
            <IndivReservoir key={name} data={data?.find((d) => d.name === name)} />
          ))}
        </div>

        <div className="grid grid-cols-2 place-content-center gap-2">
          <div className="col-span-2 flex w-full justify-center">
            {<MixedReservoir data={data?.find((d) => d.name === "中")} />}
          </div>
          {["鯉魚潭水庫", "德基水庫"].map((name) => (
            <IndivReservoir key={name} data={data?.find((d) => d.name === name)} />
          ))}
        </div>

        <div className="grid grid-cols-3 place-content-center gap-2">
          <div className="col-span-3 flex w-full justify-center">
            {<MixedReservoir data={data?.find((d) => d.name === "南")} />}
          </div>
          {["南化水庫", "曾文水庫", "烏山頭水庫"].map((name) => (
            <IndivReservoir key={name} data={data?.find((d) => d.name === name)} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Reservoir;
