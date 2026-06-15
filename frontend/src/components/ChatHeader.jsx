import React, { useEffect, useState } from "react";

const ChatHeader = ({ isTyping }) => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  
    window.location.href = "/login";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-[#202c33] h-16 flex items-center justify-between px-5 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <img
          src="https://ui-avatars.com/api/?name=User&background=25D366&color=fff"
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
  
        <div>
          <h2 className="text-white font-semibold text-lg">
            {user?.name || "User"}
          </h2>
  
          <p className="text-sm text-gray-400">
            {isTyping ? "Typing..." : "Online"}
          </p>
        </div>
      </div>
  
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default ChatHeader;