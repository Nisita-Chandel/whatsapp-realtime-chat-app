import React from "react";

const MessageBubble = ({ message, sender, time, status }) => {
  const isMe = sender === "me";

  return (
    <div
      className={`flex mb-3 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[70%] px-4 py-2 rounded-2xl shadow-md break-words transition-all duration-300 ${
          isMe
            ? "bg-[#005c4b] text-white rounded-br-sm"
            : "bg-[#202c33] text-white rounded-bl-sm"
        }`}
      >
        {/* Message */}
        <p className="text-[15px] leading-6">{message}</p>

        {/* Time & Tick */}
        <div className="flex justify-end items-center gap-1 mt-2">
          <span className="text-[11px] text-gray-300">
            {time}
          </span>

          {isMe && (
            <span
              className={`text-sm font-semibold ${
                status === "seen"
                  ? "text-sky-400"
                  : "text-gray-300"
              }`}
            >
              ✓✓
            </span>
          )}
        </div>

        {/* Chat Bubble Tail */}
        <div
          className={`absolute bottom-0 w-3 h-3 ${
            isMe
              ? "right-[-4px] bg-[#005c4b]"
              : "left-[-4px] bg-[#202c33]"
          } rotate-45`}
        ></div>
      </div>
    </div>
  );
};

export default MessageBubble;