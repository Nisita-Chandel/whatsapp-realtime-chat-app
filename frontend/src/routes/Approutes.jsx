import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import socket from "../socket";
import Register from "../Pages/Register";
import ChatList from "./ChatList";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello 👋",
      sender: "me",
      time: "10:00 AM",
      status: "✓✓",
    },
    {
      text: "Hi! Welcome",
      sender: "friend",
      time: "10:01 AM",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
  
    if (!currentUser?._id) return;
  
    const joinUser = () => {
      console.log("Joining User:", currentUser._id);
  
      socket.emit("join", currentUser._id);
    };
  
    if (socket.connected) {
      joinUser();
    } else {
      socket.on("connect", joinUser);
    }
  
    return () => {
      socket.off("connect", joinUser);
    };
  }, []);
 
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [
        ...prev,
        {
          text: data.text,
          sender: "friend",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  const sendMessage = (newMessage) => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "✓✓",
      },
    ]);
    
    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log("FULL USER:", currentUser);
console.log("EMAIL:", currentUser?.email);

    let receiverId = "";

if (currentUser?.email === "abhii@gmail.com") {
  receiverId = "6a3939715927643bf9344747"; // Jeet

} else if (currentUser?.email === "jeett@gmail.com") {
  receiverId = "6a3939255927643bf9344746"; // Abhi

}

console.log("Current User:", currentUser?.email);
console.log("Receiver ID:", receiverId);


    socket.emit("send_message", {
      text: newMessage,
      sender: currentUser?.name,
      senderId: currentUser?._id,
      receiverId,
      
    });
    console.log("Socket Connected?", socket.connected);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="h-screen bg-[#111b21] flex p-4">
      <div className="w-full h-full flex rounded-2xl overflow-hidden shadow-2xl">
        <Sidebar />
        <ChatList/>
        <div
          className="flex-1 bg-cover bg-center flex flex-col"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/originals/65/91/8f/65918f8e4f2e3e0b7b4d7f0e6a6b4b93.jpg')",
          }}
        >
          <ChatHeader isTyping={isTyping} />

          <div className="flex-1 p-6 overflow-y-auto">
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg.text}
                sender={msg.sender}
                time={msg.time}
                status={msg.status}
              />
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <MessageInput
            sendMessage={sendMessage}
            setIsTyping={setIsTyping}
          />

          
        </div>
        
      </div>
      
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      
      <Route path="*" element={<Navigate to="/login" />} />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" />} />

    </Routes>
  );
};

export default AppRoutes;