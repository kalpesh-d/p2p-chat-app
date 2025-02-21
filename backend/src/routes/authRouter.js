const express = require("express");
const { register, login, logout, updateProfile, checkAuth } = require("../controller/authController.js");
const { protectRoute } = require("../middleware/authMiddleware.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.put("/update-profile", protectRoute, updateProfile);

authRouter.get("/check", protectRoute, checkAuth);

module.exports = authRouter;