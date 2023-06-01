import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout";
import NoSsr from "~/components/no-ssr";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NoSsr>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NoSsr>
  );
};

export default api.withTRPC(MyApp);
