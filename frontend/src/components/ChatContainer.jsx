import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchMessages, addMessage } from "../store/slices/chatSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { format } from "date-fns";
import Profile from "./Profile.jsx";
import { groupMessagesByDate } from "../lib/messageDate";
import { socketService } from "../lib/socket";

const ChatContainer = () => {
  const [showProfile, setShowProfile] = useState(false);
  const messageEndRef = useRef(null);

  const { messages, isMessagesLoading, selectedUser } = useSelector(state => state.chat);
  const { authUser, onlineUsers } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(selectedUser._id));

    // Listen for new messages
    socketService.onNewMessage((message) => {
      // Only add message if it's from/to the selected user
      if (message.sender === selectedUser._id || message.receiver === selectedUser._id) {
        dispatch(addMessage(message));
      }
    });

    return () => {
      socketService.offNewMessage();
    };
  }, [dispatch, selectedUser._id]);

  useEffect(() => {
    if (messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // if (isMessagesLoading) return <p className="h-screen flex justify-center items-center mx-auto">Loading...</p>;

  // Group messages by date (Today, Yesterday, or specific date)
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 flex">
      <div className="flex-1 flex flex-col bg-gray-50">
        <ChatHeader onProfileClick={() => setShowProfile(!showProfile)} />
        {/* Main chat messages area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
          <div className="flex-1 overflow-y-auto px-10 md:px-20">
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date}>
                {/* Date separator */}
                <div className="flex justify-center my-4">
                  <span className="bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-sm">
                    {date}
                  </span>
                </div>
                {/* Message bubbles */}
                {dateMessages.map((message) => (
                  <div
                    key={message._id}
                    ref={messageEndRef}
                    className={`flex ${message.sender === authUser._id ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === authUser._id
                        ? 'bg-[#DEE9FF] text-black rounded-br-none' // User's messages (blue)
                        : 'bg-white text-black rounded-bl-none' // Other's messages (white)
                        }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <span className="text-xs mt-1 block text-gray-500">
                        {format(new Date(message.createdAt), "h:mm a")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Message input at bottom */}
          <MessageInput />
        </div>
      </div>

      {/* Profile sidebar - only shown when showProfile is true */}
      {showProfile && (
        <div className="w-[300px] border-l border-[#D9DCE0] bg-white">
          <Profile
            onlineUsers={onlineUsers}
            selectedUser={selectedUser}
            setShowProfile={setShowProfile}
          />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;