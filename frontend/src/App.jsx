// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AllProfiles from "./pages/AllProfile";



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/profile/:id" element={<Profile  />} />
      <Route path="/all-profiles" element={<AllProfiles />} />
      <Route path="/forgot-password" element ={<ForgotPassword/>}/>
    </Routes>
  </Router>
);

export default App;