const express = require("express");
const loginRouter = express.Router();
const Login = require("../controllers/login.controller");

loginRouter.post("/", Login.loginUser);

module.exports = loginRouter;
