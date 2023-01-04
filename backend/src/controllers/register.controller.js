const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, password, pokedex } = req.body;

    const userExist = await User.findOne({ username: username });

    if (userExist) {
      res.status(400).send("Username already taken !");
      return;
    }

    bcrypt.hash(password, 10).then((hashedPassword) => {
      const newUser = new User({
        username,
        password: hashedPassword,
        pokedex,
        coins: 4,
      });
      newUser.save().then(res.status(200).send("User registered with Success"));
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = {
  registerUser,
};
