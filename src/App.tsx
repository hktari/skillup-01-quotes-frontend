
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import LandingPageNewUser from './components/LandingPageNewUser';
import Header from './components/Header';
import { User } from './services/interface';
import Footer from './components/Footer';
import authApi from './services/authApi';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Layout from "./components/Layout";
import AuthProvider, { useAuth } from "./components/AuthProvider";

function App() {
  const tmp_user = {
    id: 1,
    username: "Wade Warren",
    profileImg: {
      thumbnailUrl: "/assets/images/mock/profile-thumbnail2.webp"
    },
    karmaPoints: 154
  };
  // const tmp_user : User | null = null;
  
  const {user, isLoggedIn} = useAuth()

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={isLoggedIn() ? <LandingPage /> : <LandingPageNewUser />} />
            <Route path="/login" element={<LoginPage />}>
            </Route>
            <Route path="/signup" element={<SignupPage />}>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App