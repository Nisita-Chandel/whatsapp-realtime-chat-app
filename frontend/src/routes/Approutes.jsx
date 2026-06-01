import React, { useState ,useEffect, useRef} from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import socket from "../socket.js";

const AppRoutes = () => {
  const [messages, setMessages] = useState([
    { text: "Hello 👋", sender: "me" ,  time: "10:00 AM", status:"✓✓"},
    { text: "Hi! Welcome", sender: "friend" ,  time: "10:01 AM",},
  ]);

  const [isTyping,setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null)

  useEffect(() =>{
    messagesEndRef.current?.scrollIntoView({
        behavior : "smooth",
    })
  },[messages])



  const sendMessage = (newMessage) => {

    socket.emit("send_message", {
      text: newMessage,
      sender: "me",
    });
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
  
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Hello",
          sender: "friend",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };
  return (
    <div className="h-screen bg-[#111b21] flex p-4">
      <div className="w-full h-full flex rounded-2xl overflow-hidden shadow-2xl">
        <Sidebar />

        <div className="flex-1 bg-cover bg-center flex flex-col"
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

export default AppRoutes;