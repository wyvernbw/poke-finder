import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const usePokemonQuery = (id: string) => {
  const query = trpc.pokemon.getPokemon.useQuery({ id });
  return query;
};

const Home: NextPage = () => {
  const [id, setId] = useState("");
  const query = usePokemonQuery(id);

  return (
    <div className="h-screen w-full bg-zinc-900">
      <div className="flex flex-col items-center p-8 text-white">
        <h1>Poke finder</h1>
        <SearchBar id={id} query={query} onchange={(value) => setId(value)} />
      </div>
    </div>
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
          <div className="flex items-center gap-4">
            <p>{`found ${query.data.name}`}</p>
            <img
              src={query.data.icon}
              alt=""
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        ) : (
          <p>loading...</p>
        )
      ) : (
        <p>Input a valid id</p>
      )}
    </div>
  );
};
