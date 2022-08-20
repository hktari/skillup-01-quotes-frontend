
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
import AuthProvider, { RequireAuth, useAuth } from "./components/AuthProvider";
import UserProfilePage from "./components/UserProfilePage";
import QuotesProvider from "./components/QuotesProvider";

function App() {
  return (
    <AuthProvider>
      <QuotesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPageNewUser />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="dashboard" element={
                <RequireAuth>
                  <LandingPage />
                </RequireAuth>} />
              <Route path="userProfile/:id" element={
                <RequireAuth>
                  <UserProfilePage />
                </RequireAuth>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </QuotesProvider>
    </AuthProvider>
  );
}

export default App