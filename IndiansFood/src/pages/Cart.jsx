import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth, useCart } from "../App";
import api from "../services/api";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const [orderError, setOrderError] = React.useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = totalAmount > 0 && totalAmount < 299 ? 40 : 0;
  const grandTotal = totalAmount + deliveryFee;

  const placeOrder = async () => {
    if (cart.length === 0) return;
    setOrderError("");

    if (!user) {
      navigate("/login");
      return;
    }

    const usesBackendFoods = cart.every((item) => /^[a-f\d]{24}$/i.test(String(item.id)));
    if (usesBackendFoods) {
      try {
        await api.post("/orders", { items: cart });
        clearCart();
        navigate("/orders");
        return;
      } catch (err) {
        setOrderError(err.response?.data?.message || "Unable to place your order. Please try again.");
        return;
      }
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      orderId: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString(),
      items: cart,
      total: grandTotal,
    };
    orders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    clearCart();
    navigate("/orders");
  };

  return (
    <div data-testid="cart-page">
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <button
            style={styles.backBtn}
            onClick={() => navigate("/")}
            data-testid="cart-back-btn"
          >
            <FiArrowLeft size={25} />
          </button>
          <h1 style={styles.title}>🛒 Your Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div style={styles.empty} data-testid="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious food from our menu.</p>
            <button
              style={styles.orderBtn}
              onClick={() => navigate("/")}
              data-testid="cart-browse-btn"
            >
              Browse Menu 🍽️
            </button>
          </div>
        ) : (
          <div style={styles.layout}>
            <div style={styles.items}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={styles.card}
                  data-testid={`cart-item-${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                  />
                  <div style={styles.details}>
                    <h3 style={styles.name}>{item.name}</h3>
                    <p style={styles.category}>🍽️ {item.category}</p>
                    <p style={styles.price}>₹{item.price}</p>

                    <div style={styles.quantityBox}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => decreaseQty(item.id)}
                        data-testid={`cart-decrease-qty-${item.id}`}
                      >
                        -
                      </button>
                      <span style={styles.quantity} data-testid={`cart-qty-${item.id}`}>
                        {item.quantity}
                      </span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => increaseQty(item.id)}
                        data-testid={`cart-increase-qty-${item.id}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      style={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                      data-testid={`cart-remove-item-${item.id}`}
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.summary} data-testid="cart-summary">
              <h2 style={styles.summaryTitle}>Order Summary</h2>
              <div style={styles.row}>
                <span>Subtotal</span>
                <span data-testid="cart-subtotal">₹{totalAmount}</span>
              </div>
              <div style={styles.row}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ ...styles.row, ...styles.grandTotal }}>
                <span>Total</span>
                <span data-testid="cart-total">₹{grandTotal}</span>
              </div>

              <button
                style={styles.orderBtn}
                onClick={placeOrder}
                data-testid="cart-place-order-btn"
              >
                Place Order 🚀
              </button>
              {orderError && <p style={{ color: "#c0392b", marginBottom: 0 }}>{orderError}</p>}
              <button
                style={styles.clearBtn}
                onClick={clearCart}
                data-testid="cart-clear-btn"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "70vh",
    background: "#f8f8f8",
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "25px",
  },
  backBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#e23744",
  },
  title: { margin: 0, fontSize: "28px", color: "#333" },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    color: "#555",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  items: { display: "flex", flexDirection: "column", gap: "15px" },
  card: {
    display: "flex",
    gap: "20px",
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    alignItems: "center",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  details: { flex: 1 },
  name: { margin: "0", fontSize: "20px", color: "#222" },
  category: { color: "#777", margin: "8px 0" },
  price: { color: "#e23744", fontWeight: "bold", fontSize: "18px" },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "15px 0",
  },
  qtyBtn: {
    width: "35px",
    height: "35px",
    border: "none",
    background: "#e23744",
    color: "#fff",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "20px",
  },
  quantity: { fontSize: "18px", fontWeight: "bold", color: "#111" },
  removeBtn: {
    padding: "10px 18px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  summary: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    height: "fit-content",
    position: "sticky",
    top: "100px",
  },
  summaryTitle: {
    margin: "0 0 15px",
    color: "#e23744",
    borderBottom: "2px solid #e23744",
    paddingBottom: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    color: "#333",
  },
  grandTotal: {
    borderTop: "1px solid #ddd",
    marginTop: "10px",
    paddingTop: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#e23744",
  },
  orderBtn: {
    width: "100%",
    padding: "13px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "15px",
  },
  clearBtn: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    color: "#e23744",
    border: "1px solid #e23744",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Cart;
