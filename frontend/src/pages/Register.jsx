import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      setMessage(res.data.msg || "Registered successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("student");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed!");
      console.error("Registration Error:", err.response || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
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

          {/* Role dropdown */}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
            required
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>


        <div style={styles.links}>
          <p>
            Already have an account?{" "}
            <a href="/" style={styles.link}>Back to Login</a>
          </p>
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
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  message: {
    marginBottom: "15px",
    color: "green",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",

    background:"#fff",
    color:"#000",

  },
  button: {
    padding: "12px",
    backgroundColor: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
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

export default Register;