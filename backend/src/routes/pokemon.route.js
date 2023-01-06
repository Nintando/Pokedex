const express = require("express");
const pokemonRoutes = express.Router();
const Auth = require("../middlewares/auth.middleware");
const Poke = require("../controllers/addPoke.controller");
const Update = require("../controllers/udpateCoinsPokeArray.controller");
const Pokedex = require("../controllers/showPoke.controller");
const OnePokeInPokedex = require("../middlewares/showOnePoke.middleware");

// Routes Affichage des pokemons de l'utilisateur
pokemonRoutes.route("/pokedex").get(Auth.Auth, Pokedex.showPokedex);

// This section will help you create a new record.
pokemonRoutes
  .route("/add")
  .post(OnePokeInPokedex.verifyOnePoke, Poke.addPokemon);

// Routes Modifie les Coins de l'utilisateur
pokemonRoutes.route("/pokedex/update/coins").patch(Auth.Auth, Update.updateCoins)

// Routes Modifie l'array des pokemons de l'utilisateur
pokemonRoutes.route("/pokedex/update/pokedex").patch(Auth.Auth, Update.updateArrayPokemon)


module.exports = pokemonRoutes;
