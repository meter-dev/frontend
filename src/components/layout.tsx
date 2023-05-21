import React, { type ReactNode } from "react";
import Head from "next/head";
import Sidebar from "./sidebar";
import { Separator } from "./ui/separator";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Meter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <Separator orientation="vertical" className="h-screen" />
        <main className="w-full p-4">{children}</main>
      </div>
    </>
  );
};

export default Layout;
