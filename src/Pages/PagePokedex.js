import Header from "../Header";
import CardPokedex from "../components/Cards/CardPokedex";
import getPokedex from "../components/Pokedex";
import PokemonSearch from "../components/PokemonSearch";
import { Button, Badge } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Pokedex.css";
import "../styles/pokeType.css";

import { CgPokemon } from "react-icons/cg";
import { useState, useEffect } from "react";

export default function PageAccueil() {
  const [pokemonList, setPokemonList] = useState([]);
  const [coins, setCoins] = useState(4);
  const [pokemon, setPokemon] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);
  const initialState = {
    name: String,
    types: [String],
    url: String,
  };

  const [poke, setPoke] = useState(initialState);

  const COST = 1;
  const RandomPokemon = () => {
    if (coins < COST) {
      return alert("Vous n'avez plus de pieces ");
    }
    setCoins(coins - COST);
    const randomNumber = Math.floor(Math.random() * 905) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
      .then((res) => res.json())
      .then((pokemonData) => {
        setPokemon(pokemonData);
        console.log(pokemonData);
        setPokemonList((prevList) => [...prevList, pokemonData]);
      });
  };

  useEffect(() => {
    getPokedex().then((data) => {
      setData(data);
    });
  }, []);

  const handleClick = async () => {
    try {
      if (search.length === 0) {
        return alert("impossible");
      }
      const responce = await PokemonSearch.detail(search);
      setDetails(responce);
    } catch (err) {
      setDetails({ error: "pokemon not found" });
    }
  };

  const tab = [];
  data.map((data) => {
    tab.push(data.pokeName);
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
      .then((response) => response.json())
      .then((pokemon) => {
        setPoke({
          name: pokemon.name,
          types: pokemon.types,
          url: pokemon.sprites.front_default,
        });
      });
  }, [search]);

  const putPokeToDB = async () => {
    if (tab.includes(search)) {
      return alert("existe deja");
    } else {
      fetch("http://localhost:5000/allPokemon", {
        method: "POST",
        body: JSON.stringify({
          pokeName: poke.name,
          pokeTypes: poke.types,
          pokeImg: poke.url,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then(alert("Vous avez ajouté le pokemon dans votre Pokédex"))
        .then(window.location.reload(true));
    }
  };

  return (
    <div className="app-container">
      <Header />
      {data.map((data, i) => {
        return <CardPokedex key={i} data={data} />;
      })}
      <input
        className="SearchBar"
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        placeholder="Rercherche un pokemon"
      />
      <button onClick={handleClick}>
        <CgPokemon />
      </button>
      <div className="Pokedex">
        <div>
          <button id="gen-button" onClick={RandomPokemon}>
            Générer un pokémon aléatoire ({COST} pièces)
          </button>
          <br />

          <p>Pièces: {coins}</p>
          <div className="d-flex justify-content-center">
            {pokemonList.map((pokemon, i) => {
              return (
                <Card key={i} style={{ width: "16rem" }}>
                  <div className="rm">#{pokemon.id}</div>
                  <Card.Title className="rm">{pokemon.name}</Card.Title>
                  <Card.Img variant="top" src={pokemon.sprites.front_default} />
                  <Card.Body>
                    <Card.Text className="rm">
                      {" "}
                      {pokemon.types.map((type) => {
                        return (
                          <span className={`type ${type.type.name}`}>
                            {type.type.name}
                          </span>
                        );
                      })}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>{" "}
      </div>
      {details &&
        (details.error ? (
          <h1>{details.error}</h1>
        ) : (
          <div>
            <h1 className="Ecriture">{details.name}</h1>
            <img src={details.sprites.front_default} alt="" />
            {details.types.map((type, i) => {
              return (
                <div className={`type ${type.type.name} `} key={i}>
                  {type.type.name}
                </div>
              );
            })}

            <Button variant="success" onClick={putPokeToDB}>
              Ajouter le pokemon
            </Button>
          </div>
        ))}
      <br />
    </div>
  );
}
