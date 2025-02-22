import { format, isToday, isYesterday } from "date-fns";

export const groupMessagesByDate = (messages) => {
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