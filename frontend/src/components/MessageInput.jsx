import React, { useState } from "react";
import { Smile ,Paperclip,Mic} from "lucide-react";
const MessageInput = ({ sendMessage ,setIsTyping}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message);

    setMessage("");
  };

  return (
    <div className="bg-[#202c33] p-4 flex gap-3">
       <button className="text-gray-400 hover:text-white px-2">
    <Smile size={26} />
    </button>

    <button className="text-gray-400 hover:text-white px-2">
  <Paperclip size={24} />
</button>

<button className="text-gray-400 hover:text-white px-2">
  <Mic size={24} />
</button>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => {setMessage(e.target.value);
          setIsTyping(true);

          setTimeout(() => {
            setIsTyping(false);
          },1000);
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
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-medium cursor-pointer"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;