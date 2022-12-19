import Header from "../Header";
import CardPokedex from "../components/Cards/CardPokedex";
import getPokedex from "../components/Pokedex";
import PokemonSearch from "../components/PokemonSearch";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { CgPokemon } from "react-icons/cg";
import { useState, useEffect } from "react";

export default function PageAccueil() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);
  const initialState = {
    name: String,
    types: [String],
    url: String,
  };
  const [poke, setPoke] = useState(initialState);

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
  // eslint-disable-next-line
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

  const delPokedex = async () => {
    fetch("http://localhost:5000/myPokedex", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(alert("Vous avez supprimer votre Pokédex"))
      .then(window.location.reload(true));
  };

 
  return (
    
      <div className="app-container" >
  
      <Header />
      {data.map((data, i) => {
        return <CardPokedex key={i} data={data} />;
      })}
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <div className="Pokedex">
        <h3 className="Ecriture">Rercherche d'un Pokemon</h3>
        <input className="SearchBar" value={search} onChange={(evt) => setSearch(evt.target.value)} />
        <button onClick={handleClick}><CgPokemon /></button>

        {details &&
          (details.error ? (
            <h1>{details.error}</h1>
          ) : (
            <div>
              <h1 className="Ecriture">{details.name}</h1>
              <img src={details.sprites.front_default} alt="" />
              {details.types.map((type, i) => {
                return (
                  <div className="Card_type" key={i}>
                    {type.type.name}
                  </div>
                );
              })}
              <Button variant="success" onClick={putPokeToDB}>
                Ajouter le pokemon
              </Button>
            </div>
          ))}<br/>
          <br/>  <br/>  <br/>  
          <button className="btn-del" onClick={delPokedex}>Supprimer Pokedex</button>
      </div>
      
    </div>
    
  );
}
