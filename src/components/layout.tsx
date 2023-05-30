import React, { type ReactNode } from "react";
import Head from "next/head";
import Sidebar from "./sidebar";
import { Separator } from "./ui/separator";
import { api } from "~/utils/api";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = api.user.me.useQuery();

  if (!user.data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Meter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={twMerge(
          "flex min-h-screen flex-col font-sans md:flex-row",
          inter.variable,
          notoSansTC.variable
        )}
      >
        <Sidebar user={user.data} />
        <Separator orientation="vertical" className="h-screen" />
        <main className="w-full p-4">{children}</main>
      </div>
    </>
  );
};

export default Layout;
