import { type NextPage } from "next";
import Earthquake from "~/components/dashboard/earthquake";
import Electricity from "~/components/dashboard/electricity";
import Overview from "~/components/dashboard/overview";
import Reservoir from "~/components/dashboard/reservoir";
import Weather from "~/components/dashboard/weather";
import { Separator } from "~/components/ui/separator";

const Dashboard: NextPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 md:px-6">
      <Overview />
      <Electricity />
      <Reservoir />
      <Separator className="my-1" />
      <Weather />
      <Separator className="my-1" />
      <Earthquake />
    </div>
  );
};

export default Dashboard;
