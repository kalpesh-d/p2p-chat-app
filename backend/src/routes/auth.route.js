const express = require("express");

const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Register");
})

router.get("/login", (req, res) => {
  res.send("Login");
})

router.get("/logout", (req, res) => {
  res.send("Logout");
})

module.exports = router;