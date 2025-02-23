import { io } from "socket.io-client";

class SocketService {
  socket = null;

  connect(userId) {
    if (this.socket?.connected) return;

    this.socket = io("http://localhost:3000", {
      query: { userId },
    });
    this.socket.connect();
  }

  disconnect() {
    if (this.socket?.connected) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Add a method to get online users
  onOnlineUsers(callback) {
    if (!this.socket) return;
    this.socket.on("getOnlineUsers", callback);
  }
}

export const socketService = new SocketService();