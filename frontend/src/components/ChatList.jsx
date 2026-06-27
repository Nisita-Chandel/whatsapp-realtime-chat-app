import React from "react";

const ChatList = ({ users = [] }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {users.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No users found
        </div>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-3 p-3 cursor-pointer border-b border-[#2a3942] hover:bg-[#202c33] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <h2 className="text-white font-semibold">
                {user.name}
              </h2>

              <p className="text-sm text-gray-400">
                {user.email}
              </p>
            </div>

            <div>
              <span
                className={`w-3 h-3 rounded-full block ${
                  user.isOnline
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              ></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatList;