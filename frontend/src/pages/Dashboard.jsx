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
    </div>
  );
};

export default Dashboard;