const Pokemon = require("../models/Pokemon.model");

const addPokemon = async (req, res) => {
  try {
    const { pokeName, pokeTypes, pokeImg } = req.body;

    const newPoke = new Pokemon({
      pokeName,
      pokeTypes,
      pokeImg,
    });

    newPoke
      .save()
      .then(res.status(200).send("Pokemon registered with Success"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = {
  addPokemon,
};
