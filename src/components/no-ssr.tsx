import dynamic from "next/dynamic";
import React, { type ReactNode } from "react";

const NoSsr: React.FC<{ children: ReactNode }> = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
