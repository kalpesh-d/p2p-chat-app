const express = require("express");
const { register, login, logout, checkAuth } = require("../controller/authController.js");
const { protectRoute } = require("../middleware/authMiddleware.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get("/check", protectRoute, checkAuth);

module.exports = authRouter;