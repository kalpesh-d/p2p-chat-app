import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { X } from "lucide-react";
import { setSelectedUser } from "../store/slices/chatSlice";

const ChatHeader = ({ onProfileClick }) => {
  const { onlineUsers } = useSelector(state => state.auth);
  const { selectedUser } = useSelector(state => state.chat);

  const dispatch = useDispatch();

  return (
    <div className="p-2.5 border-b border-[#D9DCE0]">
      <div className="flex items-center justify-between" onClick={onProfileClick}>
        <button className="pl-2 flex items-center gap-3">
          <Avatar user={selectedUser} onlineUsers={onlineUsers} />
          <div className="text-left">
            <p className="text-lg font-medium">{selectedUser.name}</p>
            <p className="text-sm text-[#6E80A4]">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </button>

        <button onClick={() => dispatch(setSelectedUser(null))}>
          <X size={18} className="text-gray-400" />
        </button>
      </div>
    </div >
  )
};

export default ChatHeader;
