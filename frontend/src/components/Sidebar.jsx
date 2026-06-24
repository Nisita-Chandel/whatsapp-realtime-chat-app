import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.users.filter(
          (user) => user._id !== currentUser._id
        );

        setUsers(filteredUsers);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-[32%] bg-[#111b21] border-r border-[#2a3942]">

      {/* Profile */}
      <div className="h-16 bg-[#202c33] px-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
          {currentUser?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-white ml-3 font-semibold">
          {currentUser?.name}
        </h2>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-[#202c33] text-white px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* User List */}
      <div className="px-2">

        {users.map((user) => (
          <div
            key={user._id}
            className="p-3 rounded-lg cursor-pointer hover:bg-[#202c33] mb-2"
          >
            <h2 className="text-white font-medium">
              {user.name}
            </h2>

            <p className="text-sm text-gray-400">
              {user.email}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Sidebar;