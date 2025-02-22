import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

const initialState = {
  authUser: null,
  isSignedIn: false,
  isLoginIn: false,

  isCheckingAuth: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: async (state) => {
      try {
        const res = await axiosInstance.get("/auth/check");
        state.authUser = res.data;
        // state.isSignedIn = res.data.isSignedIn;
        // state.isLoginIn = res.data.isLoginIn;
        // state.isCheckingAuth = false;
      } catch (error) {
        console.log(error);
      }
    },
    signOut: async (state) => {
      await axiosInstance.get("/auth/signout");
      state.authUser = null;
      state.isSignedIn = false;
      state.isLoginIn = false;
    },
  },
});

export const { checkAuth } = authSlice.actions;
export default authSlice.reducer;
