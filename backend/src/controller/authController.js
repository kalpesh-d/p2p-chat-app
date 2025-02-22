const { generateToken } = require("../lib/utils.js")
const User = require("../models/userModel.js")
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // check if email exists
    const user = await User.findOne({ email })
    user && res.status(400).json({ message: "Email already exists" })

    // generate hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user
    const newUser = await User({
      name,
      email,
      password: hashedPassword
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      })
    }
  } catch (error) {
    console.log(`Register error: ${error.message}`)
    res.status(500).json({ message: "Internal server error" })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // check if name & password fields are provided
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" })
    }
    // Compare provided password with hashed password stored in database
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" })
    }

    // Generate JWT token and set it in cookie
    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.log(`Login error: ${error.message}`)
    res.status(500).json({ message: "Internal server error" })
  }
}

const logout = (req, res) => {
  try {
    // clear cookie to logout
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    console.log(`Logout error: ${error.message}`)
    res.status(500).json({ message: "Internal server error" })
  }
}

// check if user is authenticated
const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log(`Check auth error: ${error.message}`)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = { register, login, logout, checkAuth };