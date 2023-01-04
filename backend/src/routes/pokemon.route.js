const express = require("express");
const pokemonRoutes = express.Router();
const Auth = require("../middlewares/auth.middleware");
const Poke = require("../controllers/addPoke.controller");
const Coins = require("../controllers/coins.controller");
const Pokedex = require("../controllers/showPoke.controller");
const OnePokeInPokedex = require("../middlewares/showOnePoke.middleware");

// Routes Affichage des pokemons de l'utilisateur
pokemonRoutes.route("/pokedex").get(Auth.Auth, Pokedex.showPokedex);

// This section will help you create a new record.
pokemonRoutes
  .route("/add")
  .post(OnePokeInPokedex.verifyOnePoke, Poke.addPokemon);

// Routes Modifie les Coins de l'utilisateur
pokemonRoutes.route("/pokedex/coins").patch(Auth.Auth, Coins.updateCoins)

module.exports = pokemonRoutes;
