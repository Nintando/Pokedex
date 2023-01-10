import Header from "../Header";
import Signup from "../components/Sign/SignUp";
import Signin from "../components/Sign/SignIn";
import CardPokedex from "../components/Cards/CardPokedex";

import { useState, useEffect, useMemo } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Pokedex.css";
import "../styles/pokeType.css";
import "../styles/app.css";

export default function PagePokeFight() {
  const initialArray = useMemo(() => [], []);
  const initialArray2 = useMemo(() => [], []);
  const [pokemonList, setPokemonList] = useState(initialArray);
  const [pokemonEquipe, setPokemonEquipe] = useState(initialArray2);
  const [userPoke, setUserPoke] = useState({});
  const [pokeName, setPokeName] = useState("");
  const [ready, setReady] = useState(false);

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
        const p2 = () => {
          const pokeEquipe = data.PokeFight;
          pokeEquipe.map(async (pokemon) => {
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
              .then((response) => response.json())
              .then((pokemon) => {
                initialArray2.push(pokemon);
              });
          });
        };
        setPokemonList(initialArray);
        setPokemonEquipe(initialArray2);
        p();
        p2();
      })
      .catch((err) => console.log(err));
  };

  console.log(userPoke);

  const arrayFighter = userPoke.PokeFight;

  // player Ready to fight
  const isReady = async () => {
    if (arrayFighter.length === 0) {
      return alert("Select at least 1 pokemon ! ");
    } else {
      setReady(true);
      await fetch(`http://localhost:5000/pokeFight/ready`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isReady: ready,
        }),
      }).catch((err) => console.log(err));
    }
  };

  // Player choose which pokemon to use
  const pokeFighters = async (name) => {
    await fetch(`http://localhost:5000/pokeFight/matchmaking`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        PokeFight: name,
      }),
    }).catch((err) => console.log(err));
  };

  if (token !== null) {
    return (
      <div className="app-container1">
        <Header />
        <h1>Nom de l'utilisateur : {userPoke.username}</h1>
        <button onClick={isReady}>Ready</button>
        <h1>Votre Equipe : </h1>

        <div>
          {pokemonEquipe.map((pokemon, i) => {
            return <CardPokedex key={i} pokemon={pokemon} />;
          })}
        </div>

        <div className="Pokedex">
          <div className="d-flex justify-content-center">
            {pokemonList.map((pokemon, i) => {
              return (
                <div key={i}>
                  <button
                    onClick={() => {
                      pokeFighters(pokemon.name);
                    }}
                  >
                    <CardPokedex key={i} pokemon={pokemon} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
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
