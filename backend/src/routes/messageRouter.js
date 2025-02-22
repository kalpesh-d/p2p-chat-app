const express = require("express");

const { protectRoute } = require("../middleware/authMiddleware.js");
const { getUsersForSidebar, getMessages, sendMessage } = require("../controller/messageController.js");

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);

messageRouter.post("/send/:id", protectRoute, sendMessage);

module.exports = messageRouter;