import { Navigate, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

import { checkAuth } from "./store/slices/authSlice";
import { socketService } from "./lib/socket.js";
import { setOnlineUsers } from "./store/slices/authSlice";

import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (authUser) {
      socketService.onOnlineUsers((users) => {
        dispatch(setOnlineUsers(users));
      });
    }
  }, [authUser, dispatch]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
