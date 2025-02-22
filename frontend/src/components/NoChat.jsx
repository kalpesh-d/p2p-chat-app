import { MessageSquare } from "lucide-react";

const NoChat = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <MessageSquare size={48} className="text-gray-400" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">No Chat Selected</h2>
          <p className="text-gray-500 text-sm">
            Select a user to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChat;
