import React from "react";

const ChatHeader = ({ isTyping }) => {
  return (
    <div className="h-16 bg-[#202c33] px-5 flex items-center border-b border-[#2a3942]">
      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
        F
      </div>

      <div className="ml-3">
        <h2 className="text-white font-medium">Friend</h2>

        <p className="text-sm text-gray-400">
          {isTyping ? "typing..." : "online"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;