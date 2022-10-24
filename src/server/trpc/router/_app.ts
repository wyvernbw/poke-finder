// src/server/router/_app.ts
import { router } from "../trpc";

import { exampleRouter } from "./example";
import { pokemonRouter } from "./pokemon";
import { testRouter } from "./test";

export const appRouter = router({
  example: exampleRouter,
  test: testRouter,
  pokemon: pokemonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
