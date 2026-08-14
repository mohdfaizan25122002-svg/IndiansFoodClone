import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div data-testid="about-page">
      <Navbar />

      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>About IndiansFood 🍛</h1>
        <p style={styles.heroSub}>
          A taste of India, delivered to your doorstep.
        </p>
      </section>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Our Story</h2>
          <p style={styles.p}>
            IndiansFood was born out of a love for authentic Indian cuisine.
            From spicy biryanis to sweet gulab jamuns, we bring the flavours of
            every state right to your home. We partner with top restaurants
            across India to guarantee freshness, quality, and taste.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.feature}>
            <h3>🚴 Fast Delivery</h3>
            <p>Piping-hot food at your door in 30 minutes or less.</p>
          </div>
          <div style={styles.feature}>
            <h3>🍽️ Quality Food</h3>
            <p>Handpicked restaurants and chef-approved recipes.</p>
          </div>
          <div style={styles.feature}>
            <h3>💰 Best Prices</h3>
            <p>Exclusive discounts, combos, and free delivery deals.</p>
          </div>
          <div style={styles.feature}>
            <h3>📞 24/7 Support</h3>
            <p>Our team is always here to help you.</p>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Our Mission</h2>
          <p style={styles.p}>
            To make delicious Indian food accessible, affordable, and
            unforgettable — one order at a time.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  hero: {
    padding: "50px 20px",
    background: "linear-gradient(135deg,#ffb703,#ff6b35)",
    color: "#fff",
    textAlign: "center",
  },
  heroTitle: { margin: 0, fontSize: "2.2rem" },
  heroSub: { marginTop: "8px", opacity: 0.95 },
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  h2: { marginTop: 0, color: "#e23744" },
  p: { color: "#444", lineHeight: 1.7, margin: 0 },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  },
  feature: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    color: "#333",
  },
};

export default About;
