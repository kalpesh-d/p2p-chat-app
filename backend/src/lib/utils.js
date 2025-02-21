const jwt = require("jsonwebtoken")

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // prevent js from accessing the cookie
    sameSite: "strict", // prevent cross-site request forgery
    secure: process.env.ENV === "dev" ? false : true,
  })

  return token;
}

module.exports = { generateToken }