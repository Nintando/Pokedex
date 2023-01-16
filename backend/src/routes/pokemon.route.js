const express = require("express");
const pokemonRoutes = express.Router();

const Auth = require("../middlewares/auth.middleware");
const Update = require("../controllers/udpateCoinsPokeArray.controller");
const Pokedex = require("../controllers/showPoke.controller");
const PokeFight = require("../controllers/pokefight.controller");

// Route Show Pokemons of User
pokemonRoutes.route("/pokedex").get(Auth.Auth, Pokedex.showPokedex);

// Route modify Coins of User
pokemonRoutes
  .route("/pokedex/update/coins")
  .patch(Auth.Auth, Update.updateCoins);

// Route Modify Array of Pokemons User
pokemonRoutes
  .route("/pokedex/update/pokedex")
  .patch(Auth.Auth, Update.updateArrayPokemon);

// Route User set to ready: false
pokemonRoutes
  .route("/pokeFight/readyFalse")
  .post(Auth.Auth, PokeFight.readyFalse);

// Route Search Users who are Ready to Fight
pokemonRoutes.route("/pokeFight/games").post(Auth.Auth, PokeFight.games);

module.exports = pokemonRoutes;
