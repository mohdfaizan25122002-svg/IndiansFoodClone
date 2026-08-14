import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import "./LoginForm.css";
import api from "../services/api";
import { useAuth } from "../App";

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = emailRef.current.value.trim().toLowerCase();
    const password = passwordRef.current.value.trim();

    setIsSubmitting(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data.user, data.token);
      setLoginSuccess(true);
      setTimeout(() => navigate("/", { replace: true }), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container" data-testid="login-page">
      <div className="login-box">
        <h1 className="logo">
          <GiMeal size={35} color="#FF6B35" />
          <span>INDIANSFOOD</span>
        </h1>

        <p className="title">Welcome Back</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            ref={emailRef}
            className="login-input"
            required
            data-testid="login-email-input"
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="login-input"
            required
            data-testid="login-password-input"
          />
          <button type="submit" className="login-btn" disabled={isSubmitting} data-testid="login-submit-btn">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="error-msg" data-testid="login-error-msg">
            ⚠️ {error}
          </p>
        )}

        {loginSuccess && (
          <h3 className="success-msg" data-testid="login-success-msg">
            ✅ Login Successful
          </h3>
        )}

        <p className="login-text">
          Don't have an account?{" "}
          <Link to="/signup" className="login-link" data-testid="login-signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
