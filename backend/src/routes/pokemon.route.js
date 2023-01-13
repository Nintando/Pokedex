const express = require("express");
const pokemonRoutes = express.Router();

const Auth = require("../middlewares/auth.middleware");
const Update = require("../controllers/udpateCoinsPokeArray.controller");
const Pokedex = require("../controllers/showPoke.controller");
const PokeFight = require("../controllers/pokefight.controller");

// Route Affichage des pokemons de l'utilisateur
pokemonRoutes.route("/pokedex").get(Auth.Auth, Pokedex.showPokedex);

// Route Modifie les Coins de l'utilisateur
pokemonRoutes
  .route("/pokedex/update/coins")
  .patch(Auth.Auth, Update.updateCoins);

// Route Modifie l'array des pokemons de l'utilisateur
pokemonRoutes
  .route("/pokedex/update/pokedex")
  .patch(Auth.Auth, Update.updateArrayPokemon);

// Route l'utilisateur se met en prêt
pokemonRoutes.route("/pokeFight/ready").post(Auth.Auth, PokeFight.ready);

// Route Recherche Joueurs qui sont prêt puis lance le match
pokemonRoutes.route("/pokeFight/games").get(Auth.Auth, PokeFight.games);

module.exports = pokemonRoutes;
