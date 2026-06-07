import React, { useState } from "react";
import { Smile, Paperclip, Mic } from "lucide-react";

const MessageInput = ({ sendMessage, setIsTyping }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message);

    setMessage("");
    setIsTyping(false);
  };

  return (
    <div className="bg-[#202c33] p-4 flex items-center gap-3">

      <button className="text-gray-400 hover:text-white">
        <Smile size={24} />
      </button>

      <button className="text-gray-400 hover:text-white">
        <Paperclip size={24} />
      </button>

      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setIsTyping(e.target.value.length > 0);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 bg-[#2a3942] text-white px-4 py-3 rounded-lg outline-none"
      />

      <button
        onClick={handleSend}
        className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold"
      >
        Send
      </button>

      <button className="text-gray-400 hover:text-white">
        <Mic size={24} />
      </button>
    </div>
  );
};

export default MessageInput;