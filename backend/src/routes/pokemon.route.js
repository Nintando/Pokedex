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

// Route Indique si l'utilisateur est prêt pour le combat
pokemonRoutes.route("/pokeFight/ready").patch(Auth.Auth, PokeFight.matchmaking);

// Route Ajoute un pokemon pour le combat
pokemonRoutes.route("/pokeFight/team").patch(Auth.Auth, PokeFight.teamFighter);

module.exports = pokemonRoutes;
