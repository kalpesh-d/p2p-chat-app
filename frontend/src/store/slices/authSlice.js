import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const initialState = {
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
};

// Create async thunks for API calls
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const res = await axiosInstance.get("/auth/check");
    return res.data;
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      toast.success("Sign up successful");
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
      toast.success("Sign out successful");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.authUser = null;
        state.isSigningUp = false;
        state.isLoggingIn = false;
      });
  }
});

export default authSlice.reducer;
