import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const pokemonRouter = router({
  getPokemon: publicProcedure
    .input(z.object({ id: z.number().int().min(1).max(905) }))
    .query(async ({ input }) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${input.id}`)
        .then((res) => res.json())
        .then((data) => ({
          name: data.species.name,
          icon: data.sprites.front_default,
        }));
    }),
});
