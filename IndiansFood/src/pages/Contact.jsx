import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({ ...form, date: new Date().toLocaleString() });
    localStorage.setItem("messages", JSON.stringify(messages));
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div data-testid="contact-page">
      <Navbar />

      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>📞 Contact Us</h1>
        <p style={styles.heroSub}>
          We'd love to hear from you. Send us a message anytime.
        </p>
      </section>

      <div style={styles.layout}>
        <div style={styles.info}>
          <h2 style={styles.infoTitle}>Reach Out</h2>
          <p style={styles.infoRow}>
            <FiMail size={22} color="#e23744" /> faizamd70786@gmail.com
          </p>
          <p style={styles.infoRow}>
            <FiPhone size={22} color="#e23744" /> +91 7078691597
          </p>
          <p style={styles.infoRow}>
            <FiMapPin size={22} color="#e23744" /> Bareilly, Uttar Pradesh, India
          </p>

          <h3 style={{ marginTop: "20px", color: "#111" }}>Working Hours</h3>
          <p style={{ color: "#555" }}>Mon - Sun: 10:00 AM - 11:00 PM</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit} data-testid="contact-form">
          <h2 style={{ marginTop: 0, color: "#111" }}>Send a Message</h2>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
            data-testid="contact-name-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
            data-testid="contact-email-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            style={{ ...styles.input, resize: "vertical" }}
            data-testid="contact-message-input"
          />
          <button type="submit" style={styles.btn} data-testid="contact-submit-btn">
            Send Message ✉️
          </button>
          {sent && (
            <p style={styles.success} data-testid="contact-success-msg">
              ✅ Message sent successfully!
            </p>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  hero: {
    padding: "50px 20px",
    background: "linear-gradient(135deg,#e23744,#ff6b35)",
    color: "#fff",
    textAlign: "center",
  },
  heroTitle: { margin: 0, fontSize: "2.2rem" },
  heroSub: { marginTop: "8px", opacity: 0.9 },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "0 20px",
  },
  info: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  infoTitle: { marginTop: 0, color: "#e23744" },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#333",
    marginBottom: "12px",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#111",
    fontFamily: "inherit",
  },
  btn: {
    padding: "13px",
    background: "#e23744",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  success: { color: "green", margin: 0 },
};

export default Contact;
