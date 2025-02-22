import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../store/slices/chatSlice";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const selectedUser = useSelector(state => state.chat.selectedUser);
  const dispatch = useDispatch();

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Don't send if message is empty or only whitespace
    if (!message.trim()) return;
    // Dispatch action to send message
    dispatch(sendMessage({
      message: message.trim(),
      userId: selectedUser._id
    }));
    setMessage("");
  };

  return (
    <div className="py-4 w-full">
      <form onSubmit={handleSendMessage}>
        <div className="flex-1 flex items-center gap-2 outline-0 rounded-lg bg-white">
          <input
            className="w-full pl-3 py-2 placeholder:text-sm focus:outline-none min-h-[50px] max-h-[120px] overflow-y-auto"
            placeholder="Type a message..."
            value={message}
            rows={1}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* Send button - hidden on sm, changes color based on message content */}
          <button
            type="submit"
            className={`hidden sm:flex rounded-lg px-4 py-2 ${!message.trim() ? "text-gray-400" : "text-blue-500"}`} disabled={!message.trim()}>
            <Send size={18} className="rotate-45" />
          </button>
        </div>
      </form>
    </div>
  )
};

export default MessageInput;
