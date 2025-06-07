// Attractive Profile.jsx (Improved Layout & UX)
import React, { useEffect, useState } from "react";
import { getProfileById, updateProfile } from "../api/profileAPI";

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfileById(userId).then(res => {
      setProfile(res);
      setForm(res);
      setLoading(false);
    });
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updateProfile(userId, form);
    setEditMode(false);
  };

  if (loading) return <p style={styles.loading}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>My Profile</h2>
        <form style={styles.form}>
          {['name', 'contact', 'address', 'department'].map(field => (
            <input
              key={field}
              name={field}
              value={form[field] || ''}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              style={styles.input}
              disabled={!editMode}
            />
          ))}

          <div style={styles.buttonContainer}>
            {editMode ? (
              <button type="button" style={styles.saveButton} onClick={handleSubmit}>Save</button>
            ) : (
              <button type="button" style={styles.editButton} onClick={() => setEditMode(true)}>Edit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "40px 30px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    transition: "all 0.3s ease",
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  editButton: {
    padding: "12px 24px",
    backgroundColor: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  saveButton: {
    padding: "12px 24px",
    backgroundColor: "#38a169",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  loading: {
    textAlign: "center",
    marginTop: "100px",
    fontSize: "18px",
    color: "#555",
  },
};

export default Profile;
