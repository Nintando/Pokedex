import Header from "../Header";
import Signup from "../components/Sign/SignUp";
import Signin from "../components/Sign/SignIn";
import CardPokedex from "../components/Cards/CardPokedex";

import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Pokedex.css";
import "../styles/pokeType.css";
import "../styles/app.css";

export default function PagePokeFight() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonEquipe, setPokemonEquipe] = useState([]);
  const [pokemonTeams, setPokemonTeams] = useState([]);
  const [userPoke, setUserPoke] = useState({});

  const token = localStorage.getItem("Token");

  // Get User Data & Show Pokemon of said User Data
  useEffect(() => {
    fetchUser();
  }, []);

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

  useEffect(() => {
    fetchPokeFighter();
  }, [pokemonTeams]);

  const fetchPokeFighter = async () => {
    const promises = pokemonTeams.map(async (pokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      return response.json();
    });
    const pokeFighterData = await Promise.all(promises);
    setPokemonEquipe(pokeFighterData);
  };

  // player Ready to fight
  const isReady = async () => {
    if (pokemonTeams.length === 0) {
      return alert("Select at least 1 pokemon ! ");
    } else {
      await fetch(`http://localhost:5000/pokeFight/ready`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isReady: true,
          PokeFight: pokemonTeams,
        }),
      }).catch((err) => console.log(err));
    }
  };

  // Get the pokemon battle
  const pokeBattle = async () => {
    await fetch(`http://localhost:5000/pokeFight/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => console.log(res.json()))
      .catch((err) => console.log(err));
  };

  const handleClickPokeFighters = (props) => {
    if (pokemonTeams.includes(props))
      return alert("pokemon existe déjà dans l'équipe");
    if (pokemonTeams.length >= 4) return alert("maximum de pokemon est de 4");
    setPokemonTeams((current) => [...current, props]);
  };

  if (token !== null) {
    return (
      <div className="app-container1">
        <Header />
        
        <div className="infoUser"> 
        <h1>Dresseur : {userPoke.username}</h1>
        <h1>Selectionner vos pokemon :  </h1></div>
        <div >
        <button className="battle-btn" onClick={pokeBattle}> Fight </button>
        <button className="ready-btn" onClick={isReady}>Ready</button>
        </div>
     

        <div className="FightCard">
          {pokemonEquipe.map((pokemon, i) => {
            return <CardPokedex key={i} pokemon={pokemon} />;
          })}
        </div>
            
  
        <div className="Pokedex">
            {pokemonList.map((pokemon) => {
              return (
                
                <div key={pokemon.id}>
                  <button className="btn-hide"
                    onClick={() => {
                      handleClickPokeFighters(pokemon.name);
                    }}
                  ><div >
                    <CardPokedex key={pokemon.id} pokemon={pokemon} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
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
