import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiMessageCircle,
  FiShoppingCart,
  FiUser,
  FiInfo,
  FiPhone,
} from "react-icons/fi";

import ChatBot from "./ChatBot";
import { useAuth, useCart } from "../App";

const Navbar = () => {
  const [showChat, setShowChat] = useState(false);
  const { cart } = useCart() || { cart: [] };
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "15px",
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 30px",
          background: "#e23744",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          flexWrap: "wrap",
          gap: "10px",
        }}
        data-testid="main-navbar"
      >
        <h2 style={{ margin: 0 }}>🍕 IndiansFood</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={linkStyle} data-testid="nav-home-link">
            <FiHome /> Home
          </Link>

          <Link to="/about" style={linkStyle} data-testid="nav-about-link">
            <FiInfo /> About
          </Link>

          <Link to="/contact" style={linkStyle} data-testid="nav-contact-link">
            <FiPhone /> Contact
          </Link>

          <Link
            to="/cart"
            style={{ ...linkStyle, position: "relative" }}
            data-testid="nav-cart-link"
          >
            <FiShoppingCart /> Cart
            {cartCount > 0 && (
              <span
                data-testid="nav-cart-count"
                style={{
                  background: "#fff",
                  color: "#e23744",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginLeft: "2px",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/orders" style={linkStyle} data-testid="nav-orders-link">
            🧾 Orders
          </Link>

          {user ? (
            <>
              <Link to="/profile" style={linkStyle} data-testid="nav-profile-link">
                <FiUser /> {user.firstName || user.username || "Profile"}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                style={{ ...linkStyle, background: "transparent", border: "none", cursor: "pointer" }}
                data-testid="nav-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={linkStyle} data-testid="nav-login-link">
              <FiUser /> Login
            </Link>
          )}

          <button
            onClick={() => setShowChat(!showChat)}
            data-testid="nav-chat-toggle-btn"
            style={{
              background: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "15px",
              padding: "6px 12px",
              borderRadius: "20px",
            }}
          >
            <FiMessageCircle /> Chat
          </button>
        </div>
      </nav>

      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1500,
          }}
        >
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default Navbar;
