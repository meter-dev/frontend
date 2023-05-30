import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import fetcher from "../fetcher";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const result = await fetcher
        .post("/auth/login", { username: input.username, password: input.password })
        .then((res) => z.string().parse(res.data))
        .catch(() => null);
      return result;
    }),
});
