import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Store user ID in localStorage
      const userId = res.data.user.id;
      localStorage.setItem("userId", userId);

      // ✅ Redirect to profile page
      navigate(`/profile/${userId}`);
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.msg || "Server error"));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Portal Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              backgroundColor: isHover ? "#5a67d8" : "#667eea",
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            Login
          </button>

          <div style={styles.links}>
            <p>
              Don't have an account?{" "}
              <a href="/register" style={styles.link}>
                Register
              </a>
            </p>
            <p>
              <a href="/forgot-password" style={styles.link}>
                Forgot Password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "50px 30px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
    width: "clamp(350px,80%,600px)",
    maxWidth: "600px",
    minHeight: "450px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor:"#fff",
    color:"#000",
    
  },
  button: {
    padding: "12px",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#667eea",
    width: "100%",
    boxSizing: "border-box",
  },
  links: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#444",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
  },
};

export default Login;