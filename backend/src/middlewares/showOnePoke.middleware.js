const Poke = require("../models/Pokemon.model");

const verifyOnePoke = async (req, res, next) => {
  try {
    const { pokeName } = req.body == "GET" ? req.query : req.body;

    console.log(pokeName);

    let exist = await Poke.findOne({ pokeName: pokeName });

    if (exist) return res.status(400).send({ error: "Already in pokedex" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = { verifyOnePoke };
