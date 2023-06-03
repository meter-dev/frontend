import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
const MeterLiquid = dynamic(() => import("./charts/liquid"), { ssr: false });

const Reservoir: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon icon="ion:water-sharp" className="mr-2 h-5 w-5" />
          <span className="text-2xl font-semibold">Reservoir</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full gap-x-4 overflow-x-auto">
        <div className="flex w-[200px] flex-col items-center">
          <MeterLiquid title="石門水庫" width={200} percent={0.451} />
        </div>
        <div className="flex w-[200px] flex-col items-center">
          <MeterLiquid title="寶山水庫" width={200} percent={0.857} />
        </div>
        <div className="flex w-[200px] flex-col items-center">
          <MeterLiquid title="曾文水庫" width={200} percent={0.07} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Reservoir;
