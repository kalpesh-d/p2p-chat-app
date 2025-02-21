const express = require("express");
const { register, login, logout } = require("../controller/authController.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.get("/login", login);
authRouter.get("/logout", logout);

module.exports = authRouter;
