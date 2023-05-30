import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import fetcher from "../fetcher";

export const userRouter = createTRPCRouter({
  signup: publicProcedure
    .input(z.object({ email: z.string().email(), username: z.string(), password: z.string() }))
    .output(z.any())
    .mutation(async ({ input }) => {
      return await fetcher
        .post("/user/signup", {
          email: input.email,
          name: input.username,
          password: input.password,
        })
        .then((res: { data: { id: string } }) => ({ ok: true, data: res.data.id }))
        .catch((err: { errorCode: string }) => {
          console.error(err);
          return { ok: false, data: err };
        });
    }),
  me: publicProcedure.query(async () => {
    const user = await fetcher
      .get("/user/me")
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
