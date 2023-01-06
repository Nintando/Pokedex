import { useState, useEffect } from "react";
import Card from "../components/Cards/Card";
import getPokemon from "../components/Pokemon_Fetch/Pokemon";
import Header from "../Header";
import image from "../img/t1.jpg";
export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  const next = () => {
    if (url.next) {
      const nextUrl = {
        current: url.next,
        previous: url.current,
        next: null,
      };
      setUrl(nextUrl);
      loadMorePokemon();
    }
  };

  const loadingPokemon = async () => {
    let _pokemon = await Promise.all(
      pokemon.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemon);
  };
  const loadMorePokemon = async () => {
    let newPokemon = await Promise.all(
      pokemon.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(pokemonData.concat(newPokemon));
  };

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
    loadMorePokemon();
    // eslint-disable-next-line
  }, [pokemon]);

  return (
    <div>
      <Header />
      {pokemonData.map((pokemon, i) => {
        return <Card key={i} pokemon={pokemon} />;
      })}
      <br /><br />
      {url.next && (
        <button className="btn-load-more" onClick={next}>
          Charger plus
        </button>
      )}
      <br />
    </div>
  );
}
