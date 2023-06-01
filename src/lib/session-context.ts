import { createContext } from "react";
import { type User } from "./user";

// eslint-disable-next-line @typescript-eslint/ban-types
const Session = createContext<{ user?: User; refetchUser: Function }>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchUser: () => {},
});

export default Session;
