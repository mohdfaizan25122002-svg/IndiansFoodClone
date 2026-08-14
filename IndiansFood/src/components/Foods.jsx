import React from "react";
import { useCart } from "../App";

const FoodCard = ({ food }) => {
  const { cart, addToCart } = useCart() || {};
  const isAdded = cart?.some((item) => item.id === food.id);

  return (
    <div style={styles.card} data-testid={`food-card-${food.id}`}>
      {food.image ? (
        <img src={food.image} alt={food.name} style={styles.image} />
      ) : (
        <div style={styles.imagePlaceholder} aria-label={food.name}>🍽️</div>
      )}
      <div style={styles.content}>
        <h3 style={styles.name}>{food.name}</h3>
        <p style={styles.category}>🍽️ {food.category}</p>
        <div style={styles.info}>
          <span style={styles.rating}>⭐ {food.rating}</span>
          <span style={styles.price}>₹{food.price}</span>
        </div>
        <p style={styles.description}>{food.description}</p>
        <button
          style={isAdded ? styles.buttonAdded : styles.button}
          onClick={() => addToCart && addToCart(food)}
          data-testid={`food-add-to-cart-btn-${food.id}`}
        >
          {isAdded ? "Added ✓" : "Add to Cart 🛒"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "280px",
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  image: { width: "100%", height: "180px", objectFit: "cover" },
  imagePlaceholder: { width: "100%", height: "180px", display: "grid", placeItems: "center", fontSize: "56px", background: "#fff3e8" },
  content: { padding: "18px" },
  name: { margin: "0", fontSize: "20px", color: "#222" },
  category: { color: "#777", margin: "8px 0" },
  info: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0",
  },
  rating: {
    background: "#27ae60",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "14px",
  },
  price: { color: "#e23744", fontWeight: "bold", fontSize: "18px" },
  description: { color: "#666", fontSize: "14px", lineHeight: "1.5" },
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
    transition: "all 0.2s ease",
  },
  buttonAdded: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(39, 174, 96, 0.35)",
  },
};

export default FoodCard;
