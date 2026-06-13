import React, { useEffect, useState } from "react";

const ChatHeader = ({ isTyping }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-[#202c33] h-16 px-4 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-3">
        <img
          src="https://ui-avatars.com/api/?name=User&background=25D366&color=fff"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <h2 className="text-white font-semibold">
            {user ? user.name : "User"}
          </h2>

          <p className="text-gray-400 text-sm">
            {isTyping ? "Typing..." : "Online"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;