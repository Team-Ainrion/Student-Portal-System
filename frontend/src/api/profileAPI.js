// src/api/profileAPI.js
import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/profiles", // change port if your profile service uses another
  headers: {
    "Content-Type": "application/json",
  },
});

// Get profile by user ID
export const getProfileById = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

// Update profile by user ID
export const updateProfile = async (id, data) => {
  const response = await API.put(`/${id}`, data);
  return response.data;
};

// Get all profiles (for admin)
export const getAllProfiles = async () => {
  const response = await API.get("/");
  return response.data;
};