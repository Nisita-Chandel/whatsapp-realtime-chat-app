require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const messageRoutes = require("./src/routes/messageRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Create HTTP Server
const server = http.createServer(app);

// Create Socket Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Store Online Users
const onlineUsers = {};

// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // User joins after login
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;

    console.log("User Joined");
    console.log("User ID: ",userId);
    console.log("Socket ID:", socket.id);
    console.log("Online Users:",onlineUsers);
  });

  // Receive Message
  socket.on("send_message", (data) => {
    console.log("================================");
    console.log("Message Received");
    console.log(data);
  
    console.log("Sender ID:", data.senderId);
    console.log("Receiver ID:", data.receiverId);
  
    const receiverSocketId = onlineUsers[data.receiverId];
  
    console.log("Receiver Socket:", receiverSocketId);
  
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", data);
  
      console.log("Message Sent Successfully");
    } else {
      console.log("Receiver Not Found");
    }
  
    console.log("================================");
  });

  
  // User Disconnect
  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }

    console.log("User Disconnected:", socket.id);
  });
});

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is Running");
});

// Start Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});