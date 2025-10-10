import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

import QuestionAndAnswer from "./Pages/QuestionAndAnswer"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ShowAnswer from "./Pages/ShowAnswer"
import NotFound from "./Pages/NotFound"
import Layout from "./Components/Layout"
import { QuestionProvider } from './utils/TodayQuestion';
import { Toaster } from 'react-hot-toast';


const AuthSynchronizer = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenAndProfile = async () => {
      if (!getToken) return;

      try {
        const token = await getToken();

        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });


      } catch (error) {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          console.error("Authentication Error: Token invalid or expired. Redirecting to login.");
          navigate("/login", { replace: true });
        } else {
          console.error("Other API Error:", error.message);
        }
      }
    };

    fetchTokenAndProfile();
  }, [getToken, navigate]);

  return <Outlet />;
};


const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (!isSignedIn) return <Navigate to="/login" replace />;

  return <AuthSynchronizer />;
};


function App() {
  return (
    <BrowserRouter>
      <QuestionProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<QuestionAndAnswer />} />
              <Route path="/show" element={<ShowAnswer />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </QuestionProvider>
      <Toaster position='top-right' reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App
