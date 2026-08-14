import React from "react";

const offers = [
  {
    id: 1,
    title: "50% OFF on First Order",
    subtitle: "Get amazing discounts on your first food delivery.",
    badge: "New User Offer",
  },
  {
    id: 2,
    title: "Free Delivery",
    subtitle: "Enjoy free delivery on orders above ₹299.",
    badge: "Best Deal",
  },
  {
    id: 3,
    title: "Combo Meals",
    subtitle: "Delicious food combos starting at ₹149.",
    badge: "Limited Time",
  },
];

const OfferBanner = () => {
  return (
    <section style={styles.section} data-testid="offer-banner">
      <div style={styles.header}>
        <h2 style={styles.title}>🔥 Special Food Offers</h2>
        <p style={styles.description}>
          Enjoy delicious meals with exciting discounts and exclusive deals.
        </p>
      </div>

      <div style={styles.grid}>
        {offers.map((offer) => (
          <article
            key={offer.id}
            style={styles.card}
            data-testid={`offer-card-${offer.id}`}
          >
            <span style={styles.badge}>{offer.badge}</span>
            <h3 style={styles.offerTitle}>{offer.title}</h3>
            <p style={styles.offerText}>{offer.subtitle}</p>
            <button
              style={styles.button}
              data-testid={`offer-order-btn-${offer.id}`}
            >
              Order Now 🍽️
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: { padding: "40px 24px", maxWidth: "1100px", margin: "0 auto" },
  header: { textAlign: "center", marginBottom: "25px" },
  title: { margin: 0, fontSize: "2rem", color: "#e23744" },
  description: { marginTop: "10px", color: "#6b7280", lineHeight: 1.7 },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  },
  card: {
    padding: "25px",
    borderRadius: "18px",
    background: "#fff",
    border: "1px solid #eee",
    boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "20px",
    background: "#ffe5e5",
    color: "#e23744",
    fontWeight: 700,
    fontSize: "0.85rem",
    alignSelf: "flex-start",
  },
  offerTitle: { margin: 0, fontSize: "1.4rem", color: "#111827" },
  offerText: { margin: 0, color: "#475569", lineHeight: 1.6 },
  button: {
    marginTop: "auto",
    padding: "12px 18px",
    backgroundColor: "#e23744",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
  },
};

export default OfferBanner;
