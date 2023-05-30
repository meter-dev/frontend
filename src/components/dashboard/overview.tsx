import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Bulb from "../bulb";
import { Icon } from "@iconify/react";

const Overview: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-center">
        <Icon icon="ion:pulse-sharp" className="mr-2 h-5 w-5" />
        <span className="text-2xl font-semibold">Overview</span>
      </div>
      <div className="pl-6">
        <div className="flex gap-x-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Electricity</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-4">
              <div className="flex flex-col items-center gap-y-2">
                <div>竹科</div>
                <Bulb status="ok" value="78%" />
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <div>中科</div>
                <Bulb status="ok" value="79%" />
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <div>南科</div>
                <Bulb status="danger" value="18%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Reservoir</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-4">
              <div className="flex flex-col items-center gap-y-2">
                <div>竹科</div>
                <Bulb status="ok" value="98%" />
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <div>中科</div>
                <Bulb status="warning" value="49%" />
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <div>南科</div>
                <Bulb status="fatal" value="1%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Weather</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-4">
              <div className="flex flex-col items-center gap-y-2">
                <div>竹科</div>
                <span>[icon]</span>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <div>中科</div>
                <span>[icon]</span>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <div>南科</div>
                <span>[icon]</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Earthquake</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-4">Latest Report: [report]</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
