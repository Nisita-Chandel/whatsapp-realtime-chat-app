import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[32%] bg-[#111b21] border-r border-[#2a3942]">

      {/* Profile */}
      <div className="h-16 bg-[#202c33] px-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
          N
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-[#202c33] text-white px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Chat list */}
      <div className="px-2">
        <div className="p-3 rounded-lg bg-[#202c33] cursor-pointer hover:bg-[#2a3942]">
          <h2 className="text-white font-medium">Friend</h2>
          <p className="text-sm text-gray-400">Hey there 👋</p>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;