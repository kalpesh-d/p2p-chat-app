const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized token" })
    }

    const user = await User.findById(decoded.userId).select("-password") // exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(`Protect route error: ${error.message}`)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = { protectRoute }