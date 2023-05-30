import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  me: publicProcedure.query(async () => {
    const user = await fetch("http://localhost:8000/api/user/me")
      .then((res) => res.json())
      .then((data) => z.object({ name: z.string(), avatar: z.string() }).parse(data))
      .catch(() => null);

    if (!user) {
      return {
        name: "Guest",
        avatar: "",
        visitor: true,
      };
    }
    return {
      name: "Test User",
      avatar: "https://picsum.photos/id/38/120/120.jpg",
      visitor: false,
    };
  }),
});
