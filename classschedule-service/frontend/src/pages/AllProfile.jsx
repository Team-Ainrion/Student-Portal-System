import React, { useEffect, useState } from "react";
import { getAllProfiles } from "../api/profileAPI";

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getAllProfiles().then(res => setProfiles(res.data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Profiles</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Contact</th><th>Dept</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
              <td>{p.role}</td>
              <td>{p.contact}</td>
              <td>{p.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProfiles;