const express = require("express")

const authRoutes = require("./routes/auth.route.js");

const app = express();
const PORT = 3000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})