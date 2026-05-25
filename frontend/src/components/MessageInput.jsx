import React, { useState } from "react";

const MessageInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message);

    setMessage("");
  };

  return (
    <div className="bg-[#202c33] p-4 flex gap-3">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 bg-[#2a3942] text-white px-4 py-3 rounded-lg outline-none"
      />

      <button
        onClick={handleSend}
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-medium cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;