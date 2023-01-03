const express = require("express");
const registerRouter = express.Router();
const Register = require("../controllers/register.controller");

registerRouter.post("/", Register.registerUser);

module.exports = registerRouter;
