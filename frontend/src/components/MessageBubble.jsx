import React from "react";

const MessageBubble = ({ message, sender, time, status }) => {
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
        <p>{message}</p>

        <div className="flex justify-end items-center gap-1 mt-1 text-[11px]">
          <span className="text-gray-300">{time}</span>

          {sender === "me" && (
            <span
              className={
                status === "seen"
                  ? "text-sky-400"
                  : "text-gray-300"
              }
            >
              ✓✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;