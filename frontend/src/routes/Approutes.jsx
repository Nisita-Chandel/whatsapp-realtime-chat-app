import React, { useState ,useEffect, useRef} from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";

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
    setMessages([
      ...messages,
      {
        text: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "✓✓",
      }
    ]);
  };

  return (
    <div className="h-screen bg-[#111b21] flex p-4">
      <div className="w-full h-full flex rounded-2xl overflow-hidden shadow-2xl">
        <Sidebar />

        <div className="flex-1 bg-[#0b141a] flex flex-col">
          <ChatHeader />

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