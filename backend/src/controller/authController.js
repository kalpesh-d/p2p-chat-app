const register = (req, res) => {
  const { username, email, password } = req.body;
}

const login = (req, res) => {
  res.status(200).json({ message: "Login successful" });
}

const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
}

module.exports = { register, login, logout };