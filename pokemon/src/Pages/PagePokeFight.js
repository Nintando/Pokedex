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
  const [pokemonList, setPokemonList] = useState(initialArray);
  const [userPoke, setUserPoke] = useState({});

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

  if (token !== null) {
    return (

      <div className="app-container1">
        <Header />
        <h1>Nom de l'utilisateur : {userPoke.username}</h1>
        <div className="Pokedex">
          <div className="d-flex justify-content-center">
            {pokemonList.map((pokemon, i) => {
              return <CardPokedex key={i} pokemon={pokemon} />;
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
