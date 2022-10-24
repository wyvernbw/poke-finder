import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { motion } from "framer-motion";

const usePokemonQuery = (id: string) => {
  const query = trpc.pokemon.getPokemon.useQuery({ id });
  // fetch next pokemon as well
  trpc.pokemon.getPokemon.useQuery({ id: String(Number(id) + 1) });
  return query;
};

const Home: NextPage = () => {
  const [id, setId] = useState("");
  const query = usePokemonQuery(id);

  return (
    <>
      <Head>
        <title>Poke finder</title>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500&display=swap"
          rel="stylesheet"
        />

        <link
          rel="shortcut icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐙</text></svg>"
          type="image/x-icon"
        />
      </Head>
      <div className="h-screen w-full bg-zinc-900">
        <div className="flex flex-col items-center p-8 text-white">
          <h1 className="text-xl">Poke finder</h1>
          <SearchBar id={id} query={query} onchange={(value) => setId(value)} />
        </div>
      </div>
    </>
  );
};
export default Home;

const SearchBar = ({
  id,
  query,
  onchange,
}: {
  id: string;
  query: ReturnType<typeof usePokemonQuery>;
  onchange: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-4">
        <label htmlFor="search">search a pokemon by id</label>
        <input
          type="number"
          id="search"
          onChange={(e) => onchange(e.target.value)}
          className="rounded-md px-4 py-2 text-zinc-900 opacity-60"
        />
      </div>
      {id ? (
        query.data ? (
          <motion.div className="flex items-center gap-4 " layout>
            <p>
              found{" "}
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
                {query.data.name}
              </span>
            </p>
            <motion.img
              src={query.data.icon}
              alt=""
              style={{ imageRendering: "pixelated" }}
            />
          </motion.div>
        ) : (
          <p>loading...</p>
        )
      ) : (
        <p>Input a valid id</p>
      )}
    </div>
  );
};
