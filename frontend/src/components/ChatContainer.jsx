import React from "react";
import { useSelector } from "react-redux";
import { fetchMessages } from "../store/slices/chatSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { format, isToday, isYesterday } from "date-fns";

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector(state => state.chat);
  const { authUser } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(selectedUser._id));
  }, [dispatch, selectedUser]);

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.createdAt);
      let dateStr;
      if (isToday(date)) {
        dateStr = "Today";
      } else if (isYesterday(date)) {
        dateStr = "Yesterday";
      } else {
        dateStr = format(date, "MMMM d, yyyy");
      }
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(message);
    });
    return groups;
  };

  if (isMessagesLoading) return <p className="h-screen flex justify-center items-center w-full">Loading...</p>;

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <ChatHeader />
      <div className="flex-1 px-10 md:px-20 overflow-y-auto bg-gray-100">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-sm">
                {date}
              </span>
            </div>
            {dateMessages.map((message) => (
              <div
                key={message._id}
                className={`flex ${message.sender === authUser._id ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === authUser._id
                    ? 'bg-[#DEE9FF] text-black rounded-br-none'
                    : 'bg-white text-black rounded-bl-none'
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
        <div className="sticky bottom-0 w-full ">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
