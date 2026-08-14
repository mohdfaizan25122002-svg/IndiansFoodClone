import React from "react";

const CategoryCard = ({ category, onClick }) => {
  if (!category) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>No Category Found</h3>
      </div>
    );
  }

  return (
    <div
      style={styles.card}
      onClick={() => onClick && onClick(category)}
      data-testid={`category-card-${category.id}`}
    >
      {category.image ? (
        <img src={category.image} alt={category.name} style={styles.image} />
      ) : (
        <div style={styles.imagePlaceholder} aria-label={category.name}>
          {category.icon || "🍽️"}
        </div>
      )}
      <div style={styles.content}>
        <h3 style={styles.title}>
          {category.icon} {category.name}
        </h3>
        <p style={styles.description}>{category.description}</p>
        <button style={styles.button} data-testid={`category-explore-btn-${category.id}`}>
          Explore Food 🍽️
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "250px",
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
    transition: "0.3s",
    margin: "10px",
  },
  image: { width: "100%", height: "160px", objectFit: "cover" },
  imagePlaceholder: { width: "100%", height: "160px", display: "grid", placeItems: "center", fontSize: "52px", background: "#fff3e8" },
  content: { padding: "18px" },
  title: { margin: "0", fontSize: "20px", color: "#222" },
  description: { color: "#666", fontSize: "14px", lineHeight: "1.5", margin: "10px 0" },
  button: {
    width: "100%",
    padding: "10px",
    background: "#e23744",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CategoryCard;
