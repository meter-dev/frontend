import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Icon } from "@iconify/react";

const Electricity: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-center">
        <Icon icon="ion:flash" className="mr-2 h-5 w-5" />
        <span className="text-2xl font-semibold">Electricity</span>
      </div>
      <div className="pl-6">
        <div className="flex gap-x-4">
          <Card>
            <CardHeader>
              <CardTitle>Lorem Ipsum</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-4">
              <div className="h-[120px] w-[400px] bg-slate-400" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Lorem Ipsum</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-x-4">
              <div className="h-[120px] w-[400px] bg-slate-400" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Electricity;
