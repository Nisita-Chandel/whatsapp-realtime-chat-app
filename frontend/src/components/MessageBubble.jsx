import React from "react";

const MessageBubble = ({ message, sender }) => {
  return (
    <div
      className={`flex mb-4 ${
        sender === "me" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-xl max-w-xs text-white ${
          sender === "me"
            ? "bg-[#005c4b]"
            : "bg-[#202c33]"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default MessageBubble;