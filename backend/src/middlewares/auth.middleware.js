const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) return res.status(401).send(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Authetification Failed !" });
  }
};

module.exports = {
  Auth,
};
