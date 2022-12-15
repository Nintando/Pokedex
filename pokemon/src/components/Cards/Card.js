import getPokedex from "../Pokedex";

import { useState, useEffect } from "react";

export default function Card({ pokemon }) {
  const [data, setData] = useState([]);
  let name = pokemon.name;
  let types = pokemon.types;
  let url = pokemon.sprites.front_default;

  useEffect(() => {
    getPokedex().then((data) => {
      setData(data);
    });
  }, []);

  const tab = [];
  data.map((data) => {
    tab.push(data.pokeName);
  });

  const putPokeToDB = async () => {
    if (tab.includes(name)) {
      return alert("existe deja");
    } else {
      fetch("http://localhost:5000/allPokemon", {
        method: "POST",
        body: JSON.stringify({
          pokeName: name,
          pokeTypes: types,
          pokeImg: url,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then(alert("Vous avez ajouté le pokemon dans votre Pokédex"))
        .then(window.location.reload(true))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="Card">
      <div className="Card_img">
        <img src={pokemon.sprites.front_default} alt="" /> <br />
      </div>

      <div className="Card_name">{pokemon.name}</div>
      <div className="Card_types">
        {pokemon.types.map((type) => {
          return <div className="Card_type">{type.type.name}</div>;
        })}
      </div>
      <button onClick={putPokeToDB}>Ajouter au pokédex</button>
    </div>
  );
}
