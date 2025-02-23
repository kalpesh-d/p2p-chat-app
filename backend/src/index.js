const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./lib/db.js");
const authRouter = require("./routes/authRouter.js");
const messageRouter = require("./routes/messageRouter.js");

dotenv.config();
const { app, server } = require("./lib/socket.js");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})