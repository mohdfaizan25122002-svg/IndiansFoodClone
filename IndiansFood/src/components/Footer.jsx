import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer} data-testid="site-footer">
      <div style={styles.section}>
        <h3 style={styles.title}>🍕 IndiansFood</h3>
        <p style={styles.text}>
          India's favorite food delivery platform. Order delicious food from
          your favorite restaurants and enjoy fast delivery at your doorstep.
        </p>
      </div>

      <div style={styles.links}>
        <div style={styles.linkBlock}>
          <h4 style={styles.linkTitle}>Explore</h4>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/cart" style={styles.link}>Cart</Link>
          <Link to="/orders" style={styles.link}>My Orders</Link>
          <Link to="/about" style={styles.link}>About</Link>
        </div>

        <div style={styles.linkBlock}>
          <h4 style={styles.linkTitle}>Customer Support</h4>
          <Link to="/contact" style={styles.link}>Contact Us</Link>
          <Link to="/contact" style={styles.link}>Help & FAQ</Link>
          <Link to="/orders" style={styles.link}>Order Tracking</Link>
          <Link to="/contact" style={styles.link}>Feedback</Link>
        </div>

        <div style={styles.linkBlock}>
          <h4 style={styles.linkTitle}>Popular Food</h4>
          <span style={styles.link}>🍕 Pizza</span>
          <span style={styles.link}>🍔 Burger</span>
          <span style={styles.link}>🍛 Indian Thali</span>
          <span style={styles.link}>🍜 Chinese</span>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.bottomText}>
          © {new Date().getFullYear()} IndiansFood. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    padding: "35px 25px",
    backgroundColor: "#111827",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    marginTop: "40px",
  },
  section: { maxWidth: "700px" },
  title: { margin: 0, fontSize: "1.8rem", color: "#ffb703" },
  text: { marginTop: "10px", lineHeight: 1.7, color: "#d1d5db" },
  links: {
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    flexWrap: "wrap",
  },
  linkBlock: { minWidth: "160px" },
  linkTitle: { marginBottom: "12px", color: "#ffffff", fontSize: "1.1rem" },
  link: {
    display: "block",
    color: "#9ca3af",
    textDecoration: "none",
    marginBottom: "8px",
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  bottom: {
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "15px",
  },
  bottomText: { margin: 0, color: "#9ca3af", fontSize: "0.9rem" },
};

export default Footer;
