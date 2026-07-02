import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

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

  // Search Filter
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="w-[32%] bg-[#111b21] border-r border-[#2a3942] flex flex-col">

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#202c33] text-white px-4 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Chat List */}
      <ChatList
        users={filteredUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default Sidebar;