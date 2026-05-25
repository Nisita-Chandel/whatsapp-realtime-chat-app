import React, { useState ,useEffect, useRef} from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";

const AppRoutes = () => {
  const [messages, setMessages] = useState([
    { text: "Hello 👋", sender: "me" },
    { text: "Hi! Welcome", sender: "friend" },
  ]);


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
      },
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
              />
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <MessageInput sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default AppRoutes;