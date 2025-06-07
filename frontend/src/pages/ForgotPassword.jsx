import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isHover, setIsHover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Send Reset Link
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <div style={styles.links}>
          <a href="/" style={styles.link}>Back to Login</a>
        </div>
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
    width: "clamp(350px, 80%, 600px)",
    maxWidth: "600px",
    minHeight: "350px",
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
  message: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#444",
  },
  links: {
    marginTop: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
  },
};

export default ForgotPassword;