import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = localStorage.getItem("userId");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Welcome, {user?.name}!</h2>
      <p>Role: {user?.role}</p>

      <a
        href={`/profile/${userId}`}
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
    </div>
  );
};

export default Dashboard;
