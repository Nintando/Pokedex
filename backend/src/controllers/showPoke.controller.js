const Poke = require("../models/Pokemon.model");

const showPokedex = async (req, res) => {
  try {
    const pokedex = await Poke.find(
      {},
      { _id: 0, pokeName: 1, pokeTypes: 1, pokeImg: 1 }
    );

    res.json(pokedex);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = { showPokedex };
