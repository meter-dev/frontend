/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Earthquake from "~/components/dashboard/earthquake";
import Electricity from "~/components/dashboard/electricity";
import Overview from "~/components/dashboard/overview";
import Reservoir from "~/components/dashboard/reservoir";
// import Weather from "~/components/dashboard/weather";
// import { Separator } from "~/components/ui/separator";
import useSWR from "swr";
import fetcher from "~/lib/fetcher";
import { type EletricityResource } from "~/lib/resource";

const Dashboard: NextPage = () => {
  const { data: powerData } = useSWR<{ data: EletricityResource[] }>("/report/power", fetcher);
  const { data: waterData } = useSWR("/report/dam", fetcher);
  const { data: quakeData } = useSWR("/report/eq", fetcher);
  return (
    <div className="flex w-full flex-col gap-6 md:px-6">
      <Overview />
      <Electricity data={powerData?.data.at(-1)} />
      <Reservoir data={waterData} />
      <Earthquake data={quakeData} />
      {/* <Separator className="my-1" />
      <Weather />
      <Separator className="my-1" /> */}
    </div>
  );
};

export default Dashboard;
