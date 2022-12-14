const User = require("../models/User.model");

const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.body == "GET" ? req.query : req.body;

    let exist = await User.findOne({ username });

    if (!exist)
      return res.status(500).send({ error: "Username doens't exist" });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = { verifyUser };
