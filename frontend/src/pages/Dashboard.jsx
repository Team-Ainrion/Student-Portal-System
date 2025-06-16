<<<<<<< HEAD
import React from "react";

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Welcome to Student Portal Dashboard</h2>

      <a
        href={`/profile/${localStorage.getItem("userId")}`}
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 20px",
          backgroundColor: "#667eea",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        My Profile
      </a>
=======
// src/pages/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <p>Role: {user?.role}</p>
>>>>>>> 0edb1068920e4ef15c215b42cc9fe27d34ba8116
    </div>
  );
};

export default Dashboard;