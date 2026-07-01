import React from "react";

const MessageBubble = ({
  message,
  sender,
  senderName,
  time,
  status,
}) => {
  const isMe = sender === "me";

  return (
    <div
      className={`flex items-end mb-3 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Receiver Avatar */}
      {!isMe && (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold mr-2">
          {senderName
            ? senderName.charAt(0).toUpperCase()
            : "U"}
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`relative max-w-[70%] px-4 py-2 rounded-2xl shadow-md break-words ${
          isMe
            ? "bg-[#005c4b] text-white rounded-br-sm"
            : "bg-[#202c33] text-white rounded-bl-sm"
        }`}
      >
        {/* Sender Name (Useful for Group Chat) */}
        {!isMe && senderName && (
          <p className="text-xs text-green-400 font-semibold mb-1">
            {senderName}
          </p>
        )}

        {/* Message */}
        <p className="text-[15px] leading-6 whitespace-pre-wrap">
          {message}
        </p>

        {/* Time & Status */}
        <div className="flex justify-end items-center gap-1 mt-2">
          <span className="text-[11px] text-gray-300">
            {time}
          </span>

          {isMe && (
            <span
              className={`text-sm ${
                status === "seen"
                  ? "text-sky-400"
                  : "text-gray-300"
              }`}
            >
              ✓✓
            </span>
          )}
        </div>

        {/* Bubble Tail */}
        <div
          className={`absolute bottom-0 w-3 h-3 rotate-45 ${
            isMe
              ? "right-[-4px] bg-[#005c4b]"
              : "left-[-4px] bg-[#202c33]"
          }`}
        ></div>
      </div>

      {/* Sender Avatar */}
      {isMe && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold ml-2">
          You
        </div>
      )}
    </div>
  );
};

export default MessageBubble;