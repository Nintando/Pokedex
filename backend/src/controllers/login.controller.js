const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    User.findOne({ username }).then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck)
            return res
              .status(401)
              .send({ error: "Username or Password doesn't match !" });

          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
          );

          return res.status(200).send({
            code: 200,
            msg: "Login Successfully ! ",
            username: user.username,
            token: token,
          });
        })
        .catch((err) => {
          res.status(400).send({ err: "Username or Password doesn't match" });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  loginUser,
};
