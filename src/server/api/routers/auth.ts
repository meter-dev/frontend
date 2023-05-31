import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  // login: publicProcedure
  //   .input(z.object({ username: z.string(), password: z.string() }))
  //   .output(z.any())
  //   .mutation(async ({ input }) => {
  //     return await fetcher
  //       .post("/auth/token", { username: input.username, password: input.password })
  //       .then((res: { data: string }) => ({ ok: true, data: res.data }))
  //       .catch((err: { errorCode: string }) => {
  //         console.error(err);
  //         return { ok: false, data: err };
  //       });
  //   }),
});
