const Message = require('../models/messageModel')
const User = require('../models/userModel')

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // Find all users except the logged in user and exclude their passwords from the results
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");


    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error getting users for sidebar", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params
    const myId = req.user._id
    // Find all messages between the logged in user and the selected user
    // Sort by createdAt in ascending order to show oldest messages first
    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: receiverId },
        { sender: receiverId, receiver: myId }
      ]
    }).sort({ createdAt: 1 })

    res.status(200).json(messages)
  } catch (error) {
    console.log("Error getting messages", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

const sendMessage = async (req, res) => {
  try {
    const { content } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    })

    await newMessage.save()
    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Error sending message", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = { getUsersForSidebar, getMessages, sendMessage };