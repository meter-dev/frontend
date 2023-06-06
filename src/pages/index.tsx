/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextPage } from "next";
import Earthquake from "~/components/dashboard/earthquake";
import Electricity from "~/components/dashboard/electricity";
import Overview from "~/components/dashboard/overview";
import Reservoir from "~/components/dashboard/reservoir";
// import Weather from "~/components/dashboard/weather";
import useSWR from "swr";
import fetcher from "~/lib/fetcher";
import {
  type EarthquakeResource,
  type EletricityResource,
  type WaterResource,
} from "~/lib/resource";

const Dashboard: NextPage = () => {
  const { data: powerData } = useSWR<{ data: EletricityResource[] }>("/report/power", fetcher);
  const { data: waterData } = useSWR<{ data: WaterResource[] }>("/report/dam", fetcher);
  const { data: quakeData } = useSWR<{ data: EarthquakeResource[] }>("/report/eq", fetcher);

  return (
    <div className="flex w-full flex-col gap-6 md:px-6">
      <Overview />
      <Electricity data={powerData?.data.sort((a, b) => b.timestamp - a.timestamp).at(-1)} />
      <Reservoir data={waterData?.data} />
      <Earthquake data={quakeData?.data} />
      {/* <Weather /> */}
    </div>
  );
};

export default Dashboard;
