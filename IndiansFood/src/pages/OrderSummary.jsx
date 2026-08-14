import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../App";
import api from "../services/api";

function OrderSummary() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setOrders(JSON.parse(localStorage.getItem("orders")) || []);
        return;
      }

      try {
        const { data } = await api.get("/orders");
        setOrders(data.orders || []);
      } catch {
        setOrders(JSON.parse(localStorage.getItem("orders")) || []);
      }
    };

    loadOrders();
  }, [user]);

  const cancelOrder = async (orderId) => {
    if (user) {
      try {
        await api.delete(`/orders/${orderId}`);
        setOrders((current) => current.map((order) => (
          order.orderId === orderId ? { ...order, status: "Cancelled" } : order
        )));
        return;
      } catch {
        // Fall back to the local demonstration orders below.
      }
    }

    const updated = orders.filter((o) => o.orderId !== orderId);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <div data-testid="orders-page">
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <button
            style={styles.backBtn}
            onClick={() => navigate("/")}
            data-testid="orders-back-btn"
          >
            <FiArrowLeft size={25} />
          </button>
          <h1 style={styles.title}>🍽️ My Orders</h1>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>

          {orders.length === 0 ? (
            <div style={styles.empty} data-testid="empty-orders">
              <h2>🛒 No Orders Found</h2>
              <p>Order your favourite food now!</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                style={styles.orderCard}
                data-testid={`order-card-${order.orderId}`}
              >
                <div style={styles.orderHeader}>
                  <div>
                    <h3>Order #{order.orderId}</h3>
                    <small>Date: {order.date}</small>
                  </div>
                  <span style={styles.status}>🍴 {order.status || "Preparing"}</span>
                </div>

                <h3>Food Items</h3>
                {order.items.map((item, i) => (
                  <div key={i} style={styles.item}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <b>₹{item.price * item.quantity}</b>
                  </div>
                ))}

                <div style={styles.total}>Total Bill: ₹{order.total}</div>

                <div style={styles.buttons}>
                  <button
                    style={styles.cancel}
                    onClick={() => cancelOrder(order.orderId)}
                    data-testid={`cancel-order-btn-${order.orderId}`}
                  >
                    Cancel Order
                  </button>
                  <button style={styles.details}>Track Delivery 🚴</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.support}>
          <h3>📞 Need Help?</h3>
          <p>Contact IndiansFood Support</p>
          <p>Email: support@indiansfood.com</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: { minHeight: "70vh", background: "#f8f8f8", padding: "20px" },
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
  section: {
    maxWidth: "1100px",
    margin: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    color: "#e23744",
    borderBottom: "2px solid #e23744",
    paddingBottom: "10px",
  },
  empty: { textAlign: "center", padding: "40px", color: "#666" },
  orderCard: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    background: "#fff",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  status: {
    background: "#27ae60",
    color: "#fff",
    padding: "6px 15px",
    borderRadius: "20px",
    fontSize: "13px",
    height: "fit-content",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    color: "#555",
  },
  total: {
    borderTop: "1px solid #ddd",
    paddingTop: "15px",
    textAlign: "right",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#e23744",
  },
  buttons: { display: "flex", gap: "10px", marginTop: "20px" },
  cancel: {
    flex: 1,
    padding: "12px",
    background: "#e23744",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  details: {
    flex: 1,
    padding: "12px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  support: {
    marginTop: "25px",
    maxWidth: "1100px",
    margin: "25px auto 0",
    textAlign: "center",
    padding: "20px",
    background: "#fff3f3",
    borderRadius: "10px",
    color: "#333",
  },
};

export default OrderSummary;
