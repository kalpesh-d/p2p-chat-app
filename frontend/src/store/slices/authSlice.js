import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { socketService } from "../../lib/socket.js";

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  onlineUsers: [],
};

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      socketService.connect(res.data._id);
      return res.data;
    } catch (error) {
      console.log("Error in checkAuth:", error);
      return rejectWithValue(error.response?.data || { message: "Authentication failed" });
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      toast.success("Account created successfully");
      socketService.connect(res.data._id);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    try {
      await axiosInstance.get("/auth/signout");
      toast.success("Signed out successfully");
      socketService.disconnect();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      toast.success("Logged in successfully");
      socketService.connect(res.data._id);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.isSigningUp = false;
      })
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoggingIn = false;
      })
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.authUser = null;
        state.isSigningUp = false;
        state.isLoggingIn = false;
      })
  }
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
