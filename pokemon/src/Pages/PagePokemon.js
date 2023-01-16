import Card from "../components/Cards/Card";
import getPokemon from "../components/Pokemon_Fetch/Pokemon";
import Header from "../Header";

import { useState, useEffect } from "react";

export default function App() {
  // State for stocking data of the API
  const [pokemon, setPokemon] = useState([]);

  // State for stocking info of Pokemons
  const [pokemonData, setPokemonData] = useState([]);

  // State for stocking URLs to help navigate between pages
  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  // Function to navigate to the next page
  const next = () => {
    const nextUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };
    setUrl(nextUrl);
  };

  // Function to navigate to the previous page
  const previous = () => {
    const previousUrl = {
      current: url.previous,
      next: url.current,
      previous: null,
    };
    setUrl(previousUrl);
  };

  // Function to load Pokemon data
  const loadingPokemon = async () => {
    let _pokemon = await Promise.all(
      pokemon.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemon);
  };

  // UseEffect help to load the API each time the url.current change
  useEffect(() => {
    fetch(url.current)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.results);
        setUrl({
          current: url.current,
          next: data.next,
          previous: data.previous,
        });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [url.current]);

  useEffect(() => {
    loadingPokemon();
    // eslint-disable-next-line
  }, [pokemon]);

  return (
    <div className="bck">
      <div className="HeaderPokemon">
        <Header />
      </div>
      <div className="PokeBody">
        {pokemonData.map((pokemon, i) => {
          return <Card key={i} pokemon={pokemon} />;
        })}
        <div className="action_btn">
          {url.previous && (
            <button className="btn-load" onClick={previous}>
              Previous
            </button>
          )}
          {url.next && (
            <button className="btn-load" onClick={next}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
