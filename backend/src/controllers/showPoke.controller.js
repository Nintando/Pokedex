const User = require("../models/User.model");

const showPokedex = async (req, res) => {
  try {
    const username = req.user.username;
    const pokedex = await User.findOne(
      { username },
      {
        _id: 0,
        username: 1,
        pokedex: 1,
        coins: 1,
        isReady: 1,
        PokeFight: 1,
        result: 1,
      }
    );

    res.json(pokedex);
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = { showPokedex };
