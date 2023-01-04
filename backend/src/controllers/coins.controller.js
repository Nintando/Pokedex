const User = require('../models/User.model')

const updateCoins = async (req, res) => {
    try {
      const username = req.user.username;
      const coins = req.body.coins;
      const newCoins = await User.findOne({ username });
  
      newCoins.coins = coins;
  
      await newCoins.save();
      res.status(200).send({ msg: "Updated Coins !" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Une erreur est survenue" });
    }
};

module.exports = {
    updateCoins,
};