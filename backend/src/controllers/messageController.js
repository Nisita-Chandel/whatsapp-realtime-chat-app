const Message = require("../models/Message");

// Save Message
const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const message = await Message.create({
      sender,
      receiver,
      text,
    });

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  sendMessage,
};