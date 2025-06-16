import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/profiles/${id}`)
      .then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.error(" Error fetching profile:", err);
        setError("Error fetching profile");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5001/api/profiles/${id}`, formData);
      setProfile(formData);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  if (loading) return <h3>🔄 Loading profile...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (!profile) return <h3>⚠️ No profile found</h3>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Profile of {profile.name}</h2>
         <input
          name="name"
          value={formData.name}
          disabled
          style={styles.input}
        />
        
        <input
          name="email"
          value={formData.email}
          disabled
          style={styles.input}
        />
        <input
          name="role"
          value={formData.role}
          disabled
          style={styles.input}
        />
         <input
          name="RegisterNumber"
          placeholder="Register Number"
          value={formData.RegisterNumber}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
        <input
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
        <button
          onClick={editMode ? handleSave : () => setEditMode(true)}
          style={styles.button}
        >
          {editMode ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight:"100vh",
    minWidth:"100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "40px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "15px",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor:"#fff",
    color:"#000",
  
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Profile;
