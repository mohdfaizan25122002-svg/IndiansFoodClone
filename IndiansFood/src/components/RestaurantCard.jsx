import React from "react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div style={styles.card} data-testid={`restaurant-card-${restaurant.id}`}>
      <img src={restaurant.image} alt={restaurant.name} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.name}>{restaurant.name}</h3>
        <p style={styles.cuisine}>🍽️ {restaurant.cuisine}</p>
        <div style={styles.info}>
          <span style={styles.rating}>⭐ {restaurant.rating}</span>
          <span style={styles.time}>🕒 {restaurant.deliveryTime}</span>
        </div>
        <p style={styles.location}>📍 {restaurant.location}</p>
        <button style={styles.button} data-testid={`restaurant-view-menu-btn-${restaurant.id}`}>
          View Menu 🍴
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "300px",
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
    transition: "0.3s",
  },
  image: { width: "100%", height: "190px", objectFit: "cover" },
  content: { padding: "18px" },
  name: { margin: "0", fontSize: "22px", color: "#222" },
  cuisine: { color: "#666", margin: "8px 0" },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "12px 0",
  },
  rating: {
    background: "#24963f",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  time: { color: "#555", fontSize: "14px" },
  location: { color: "#777", fontSize: "14px" },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#e23744",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default RestaurantCard;
