// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AllProfiles from "./pages/AllProfile";
=======
import Register from "./pages/Register";
>>>>>>> 0edb1068920e4ef15c215b42cc9fe27d34ba8116

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
      <Route path="/register" element={<Register />} /> 
      <Route path="/profile/:id" element={<Profile  />} />
      <Route path="/all-profiles" element={<AllProfiles />} />
      <Route path="/forgot-password" element ={<ForgotPassword/>}/>
    </Routes>
  </Router>

=======
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
>>>>>>> 0edb1068920e4ef15c215b42cc9fe27d34ba8116
);

export default App;