import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../App";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const loadProfile = async () => {
      try {
        const { data } = await api.get("/auth/profile");
        setProfile(data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load your profile.");
      }
    };

    loadProfile();
  }, [navigate, user]);

  const details = profile || user;

  return (
    <div>
      <Navbar />
      <main style={styles.main}>
        <section style={styles.card}>
          <h1 style={styles.title}>My Profile</h1>
          {error ? (
            <p style={styles.error}>{error}</p>
          ) : !details ? (
            <p>Loading your account details...</p>
          ) : (
            <div style={styles.details}>
              <p><strong>Name:</strong> {[details.firstName, details.lastName].filter(Boolean).join(" ") || details.name}</p>
              <p><strong>Username:</strong> {details.username || "Not set"}</p>
              <p><strong>Email:</strong> {details.email}</p>
              <p><strong>Phone:</strong> {details.phone || "Not provided"}</p>
              <p><strong>Role:</strong> {details.role || "user"}</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  main: { minHeight: "70vh", padding: "48px 20px", background: "#f8f8f8" },
  card: { maxWidth: "620px", margin: "0 auto", background: "#fff", padding: "32px", borderRadius: "14px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" },
  title: { marginTop: 0, color: "#e23744" },
  details: { lineHeight: 1.8, color: "#333" },
  error: { color: "#c0392b" },
};

export default Profile;
