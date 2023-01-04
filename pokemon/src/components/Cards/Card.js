import getPokedex from "../Pokedex";
import "../../styles/pokeType.css";
import { useState, useEffect } from "react";

export default function Card({ pokemon }) {
  const [data, setData] = useState([]);
  const [Stats, setStats] = useState(false);
  let name = pokemon.name;
  let types = pokemon.types;
  let url = pokemon.sprites.front_default;

  useEffect(() => {
    getPokedex().then((data) => {
      setData(data);
    });
  }, []);

  const showStats = () => {
    setStats(true);
  };

  const hideStats = () => {
    setStats(false);
  };

  const tab = [];
  // eslint-disable-next-line
  data.map((data) => {
    tab.push(data.pokeName);
  });

  return (
    <div
      className="Card"
      key={pokemon._id}
      onMouseEnter={showStats}
      onMouseLeave={hideStats}
    >
      <div className="Card_Container">
        <div># {pokemon.id}</div>
        <div className="Card_name">{pokemon.name}</div>
        <div className="Card_img">
          <img src={pokemon.sprites.front_default} alt="" /> <br />
        </div>
        {pokemon.types.map((type, i) => {
          return (
            <div className={`type ${type.type.name} `} key={i}>
              {type.type.name}
            </div>
          );
        })}
      </div>
      {Stats && (
        <div className="stats">
          <p>PV: {pokemon.stats[5].base_stat}</p>
          <p>Attaque: {pokemon.stats[4].base_stat}</p>
          <p>Défense: {pokemon.stats[3].base_stat}</p>
          <p>Defense speciale: {pokemon.stats[2].base_stat}</p>
          <p>Attaque speciale: {pokemon.stats[1].base_stat}</p>
          <p>Vitesse: {pokemon.stats[0].base_stat}</p>
        </div>
      )}
    </div>
  );
}
