import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],
};

export const fetchUsers = createAsyncThunk(
  "chat/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/messages/users");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ message, userId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/messages/send/${userId}`, { content: message });
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = [];
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.isMessagesLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isMessagesLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.isSendingMessage = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSendingMessage = false;
        state.messages = [...state.messages, action.payload];
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isSendingMessage = false;
      });
  },
});

export const { setSelectedUser, setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
