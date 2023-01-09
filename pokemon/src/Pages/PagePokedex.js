import Header from "../Header";
import CardPokedex from "../components/Cards/CardPokedex";
import PokemonSearch from "../components/Pokemon_Fetch/PokemonSearch";
import Signup from "../components/Sign/SignUp";
import Signin from "../components/Sign/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Pokedex.css";
import "../styles/pokeType.css";
import "../styles/app.css";

import { CgPokemon } from "react-icons/cg";
import { useState, useEffect, useMemo } from "react";

export default function PageAccueil() {
  const initialArray = useMemo(() => [], []);
  const [pokemonList, setPokemonList] = useState(initialArray);
  const [userPoke, setUserPoke] = useState({});
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);

  const token = localStorage.getItem("Token");

  // Get User Data & Show Pokemon of said User Data
  useEffect(() => {
    fetchUser();
  }, [pokemonList]);

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
        const p = () => {
          const pokeDex = data.pokedex;
          pokeDex.map(async (pokemon) => {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
              .then((response) => response.json())
              .then((pokemon) => {
                initialArray.push(pokemon);
              });
          });
        };
        setPokemonList(initialArray);
        p();
      })
      .catch((err) => console.log(err));
  };

  // Update the Coins
  const coinsUpdate = () => {
    if (userPoke.coins < 1) {
      return;
    }
    // modifie Coins
    fetch("http://localhost:5000/pokedex/update/coins", {
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
      window.location.reload();
      return;
    }
    randomPokemon();
    window.location.reload();
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
        <div className="Pokedex">
          <div>
            <button id="gen-button" onClick={handleOnClick}>
              Générer un pokémon aléatoire (1 pièces)
            </button>
            <br />

            <p className="coin">
              {userPoke.username} vous avez {userPoke.coins} pièces{" "}
            </p>
            <div className="d-flex justify-content-center">
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
            </div>
          ))}
        <br />
      </div>
    );
  } else {
    return (
      <div className="register_login">
        <Header />
        <h1>Register</h1>

        <Signup id="register" />

        <br />
        <br />

        <h1>Login</h1>

        <Signin id="login" />
      </div>
    );
  }
}
