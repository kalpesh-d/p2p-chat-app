import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser } from "../store/slices/chatSlice";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Avatar from "./Avatar";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const { users, selectedUser, isUserLoading, onlineUsers } = useSelector(state => state.chat);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  if (isUserLoading) return <div className="h-screen flex items-center justify-center border-r border-[#D9DCE0]">Loading...</div>;

  return (
    <aside className="h-full w-40 lg:w-88 border-r border-[#D9DCE0] flex flex-col items-baseline transition-all duration-200 pr-4">
      <img src="/logo.png" alt="logo" className="h-10 w-auto object-contain my-4" />

      <div className="w-full mt-2">
        <div className="relative bg-[#F5F5F5] w-full h-full rounded-3xl">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 h-10 placeholder:text-sm focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="w-full mt-6">
        {filteredUsers.map(user => (
          <button key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className={`px-2 py-3 flex items-center gap-3 rounded-lg w-full hover:bg-base-300 transition-colors hover:bg-gray-100 duration-300
            ${selectedUser?._id === user._id ? "bg-gray-200" : ""}`}>
            <Avatar user={user} onlineUsers={onlineUsers} />
            <div className="text-left min-w-0">
              <p className="truncate font-medium">{user.name}</p>
              <p className="truncate font-medium text-sm text-[#6E80A4]">{user.name}</p>
              {/* last message */}
            </div>
          </button>
        ))}
      </div>
    </aside >
  );
};

export default SideBar;
