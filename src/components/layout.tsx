import React, { type ReactNode } from "react";
import Head from "next/head";
import Sidebar from "./sidebar";
import { Separator } from "./ui/separator";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Session from "~/lib/session-context";
import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import { type User } from "~/lib/user";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, mutate } = useSWR<{ data: User }>("/user/me", fetcher);

  return (
    <>
      <Head>
        <title>Meter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Session.Provider
        value={{
          user: data?.data,
          refetchUser: mutate,
        }}
      >
        <div
          className={twMerge(
            "flex h-screen flex-col font-sans md:flex-row",
            inter.variable,
            notoSansTC.variable
          )}
        >
          <Sidebar user={data?.data} />
          <Separator orientation="vertical" className="h-screen" />
          <main className="w-full overflow-y-auto p-4">{children}</main>
        </div>
      </Session.Provider>
    </>
  );
};

export default Layout;
