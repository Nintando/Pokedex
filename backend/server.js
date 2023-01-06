const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// get driver connection
require("./src/Conn.js");

const userRegister = require("./src/routes/register.route");
const userLogin = require("./src/routes/login.route");
const { verifyUser } = require("./src/middlewares/verifyUser.middleware.js");

app.use(cors());
app.use(express.json());

// routes
app.use("/user/register", userRegister);
app.use("/user/login", verifyUser, userLogin);
app.use(require("./src/routes/pokemon.route"));

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
});
