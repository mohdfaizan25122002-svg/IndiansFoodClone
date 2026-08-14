import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import api from "./services/api";

// Global Cart Context
export const CartContext = createContext(null);
export const AuthContext = createContext(null);

export const useCart = () => useContext(CartContext);
export const useAuth = () => useContext(AuthContext);

function App() {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      return token && token !== "true"
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    } catch {
      return null;
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let isCurrentUser = true;

    const loadUserCart = async () => {
      if (!user) {
        setCart([]);
        return;
      }

      try {
        const { data } = await api.get("/cart");
        if (isCurrentUser) setCart(data.cart?.items || []);
      } catch {
        if (isCurrentUser) setCart([]);
      }
    };

    loadUserCart();
    return () => {
      isCurrentUser = false;
    };
  }, [user]);

  const saveCartForUser = (nextCart) => {
    const usesBackendFoods = nextCart.every((item) => /^[a-f\d]{24}$/i.test(String(item.id)));
    if (user && usesBackendFoods) {
      api.put("/cart", { items: nextCart }).catch(() => {
        // The current cart remains visible if the request fails.
      });
    }
  };

  const updateCart = (updater) => {
    setCart((previousCart) => {
      const nextCart = updater(previousCart);
      saveCartForUser(nextCart);
      return nextCart;
    });
  };

  const addToCart = (food) => {
    updateCart((prev) => {
      const exists = prev.find((i) => i.id === food.id);
      if (exists) {
        return prev.map((i) =>
          i.id === food.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const increaseQty = (id) =>
    updateCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const decreaseQty = (id) =>
    updateCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );

  const removeItem = (id) =>
    updateCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => updateCart(() => []);

  const value = {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  };

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setCart([]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={value}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderSummary />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
