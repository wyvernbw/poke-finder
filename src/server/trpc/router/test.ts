import { z } from "zod";
import { router, publicProcedure } from "./../trpc";

export const testRouter = router({
  testGreeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}`,
      };
    }),
});
