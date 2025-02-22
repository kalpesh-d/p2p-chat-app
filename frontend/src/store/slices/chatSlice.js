import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const initialState = {
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
};

export const fetchUsers = createAsyncThunk(
  "chat/fetchUsers",
  async () => {
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
  async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
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
    },
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
      });
  },
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
