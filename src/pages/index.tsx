import { type NextPage } from "next";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  console.log(hello.data?.greeting);

  return <main></main>;
};

export default Home;
