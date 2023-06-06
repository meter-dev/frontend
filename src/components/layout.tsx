import React, { useEffect, type ReactNode, useState } from "react";
import Head from "next/head";
import Sidebar from "./sidebar";
import { Separator } from "./ui/separator";
import { twMerge } from "tailwind-merge";
import Session from "~/lib/session-context";
import fetcher from "~/lib/fetcher";
import useSWR from "swr";
import { type User } from "~/lib/user";
import { fontClasses } from "~/lib/fonts";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, mutate } = useSWR<{ data: User }>("/me", fetcher, {
    revalidateOnFocus: false,
  });

  const [autoLogout, setAutoLogout] = useState(false);

  useEffect(() => {
    if (!error) {
      setAutoLogout(false);
      return;
    }
    if (error && !autoLogout) {
      // todo: show modal
      // todo: should set this in fetcher interceptor, not here
      if (window.location.pathname !== "/login") {
        window.location.pathname = "/login";
      }
      setAutoLogout(true);
    }
  }, [error, autoLogout]);

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
        <div className={twMerge("flex h-screen flex-col font-sans md:flex-row", fontClasses)}>
          <Sidebar user={data?.data} />
          <Separator orientation="vertical" className="h-screen" />
          <main className="w-full overflow-y-auto p-4">{children}</main>
        </div>
      </Session.Provider>
    </>
  );
};

export default Layout;
