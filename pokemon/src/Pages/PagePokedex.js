import Header from "../Header";
import CardPokedex from "../components/Cards/CardPokedex";
import PokemonSearch from "../components/Pokemon_Fetch/PokemonSearch";
import Signup from "../components/Sign/SignUp";
import Signin from "../components/Sign/SignIn";

import { CgPokemon } from "react-icons/cg";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/pokeType.css";
import "../styles/app.css";

export default function PageAccueil() {
  const [pokemonList, setPokemonList] = useState([]);
  const [userPoke, setUserPoke] = useState({});
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);

  const token = localStorage.getItem("Token");

  // Get User Data & Show Pokemon of said User Data
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [userPoke.coins]);

  const fetchUser = async () => {
    await fetch("http://localhost:5000/pokedex", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserPoke(data);
        const pokeDex = data.pokedex;
        const promises = pokeDex.map(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
          );
          return response.json();
        });
        Promise.all(promises).then((pokemonData) =>
          setPokemonList(pokemonData)
        );
      })
      .catch((err) => console.log(err));
  };

  const updateCoins = (newCoins) => {
    setUserPoke({ ...userPoke, coins: newCoins });
  };

  // Update the Coins
  const coinsUpdate = async () => {
    if (userPoke.coins < 1) {
      return;
    }
    // Update the local state
    updateCoins(userPoke.coins - 1);
    // Send a PATCH request to the server
    await fetch("http://localhost:5000/pokedex/update/coins", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        coins: userPoke.coins - 1,
      }),
    }).catch((err) => console.log(err));
  };

  //Generate Random Pokemon
  const randomPokemon = () => {
    const random = Math.floor(Math.random() * 2);

    if (random === 1) {
      const randomNumber = Math.floor(Math.random() * 905) + 1;
      fetch(`http://localhost:5000/pokedex/update/pokedex`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pokedex: randomNumber,
        }),
      }).catch((err) => console.log(err));
    } else {
      const randomNumber = Math.floor(Math.random() * (10249 - 10001)) + 10001;
      fetch(`http://localhost:5000/pokedex/update/pokedex`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pokedex: randomNumber,
        }),
      }).catch((err) => console.log(err));
    }
  };

  // Modify Coins then Generate Random Pokemon as Button function
  const handleOnClick = () => {
    coinsUpdate();
    if (userPoke.coins < 1) {
      alert("Vous n'avez plus de coins");
      return;
    }
    randomPokemon();
  };

  // Search Button
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

  if (token !== null) {
    return (
      <div className="app-container">
        <Header />
        <input
          className="SearchBar"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          placeholder="Rercherche un pokemon"
        />
        <button onClick={handleClick}>
          <CgPokemon />
        </button>
        <div className="PagePokedex">
          <div>
            <button id="gen-button" onClick={handleOnClick}>
              Générer un pokémon aléatoire (1 pièces)
            </button>
            <br />

            <p className="coin">
              {userPoke.username} vous avez {userPoke.coins} pièces{" "}
            </p>
            <div className="PokedexCard2">
              {pokemonList.map((pokemon, i) => {
                return <CardPokedex key={i} pokemon={pokemon} />;
              })}
            </div>
          </div>
        </div>
        {details &&
          (details.error ? (
            <h1>{details.error}</h1>
          ) : (
            <div className="CardContainer">
              <div className="Card2">
                <h2>#{details.id}</h2>
                <h1>{details.name}</h1>
                <img src={details.sprites.front_default} alt="" />
                {details.types.map((type, i) => {
                  return (
                    <span key={i} className={`type ${type.type.name}`}>
                      {type.type.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        <br />
      </div>
    );
  } else {
    return (
      <div className="register_login">
        <Header />
        <div className="RegisterCard">
          <h1>Register</h1>

          <Signup id="register" />

          <br />
          <br />

          <h1>Login</h1>

          <Signin id="login" />
        </div>
      </div>
    );
  }
}
