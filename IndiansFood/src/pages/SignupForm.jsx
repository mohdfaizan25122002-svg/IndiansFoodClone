import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import "./SignupForm.css";
import api from "../services/api";

const SignupForm = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim().toLowerCase();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value;
    const cpassword = cpasswordRef.current.value;

    if (!name) {
      setError("Please enter your full name.");
      return;
    }
    if (password !== cpassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be minimum 6 characters.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/auth/signup", { name, email, phone, password });
      setSignupSuccess(true);
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create your account. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container" data-testid="signup-page">
      <div className="signup-box">
        <h1 className="logo">
          <GiMeal size={35} color="#FF6B35" />
          <span>INDIANSFOOD</span>
        </h1>

        <p className="title">Create your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            ref={nameRef}
            className="signup-input"
            required
            data-testid="signup-name-input"
          />
          <input
            type="email"
            placeholder="Email Address"
            ref={emailRef}
            className="signup-input"
            required
            data-testid="signup-email-input"
          />
          <input
            type="tel"
            placeholder="Phone Number (10 digits)"
            ref={phoneRef}
            className="signup-input"
            required
            data-testid="signup-phone-input"
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            ref={passwordRef}
            className="signup-input"
            required
            data-testid="signup-password-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={cpasswordRef}
            className="signup-input"
            required
            data-testid="signup-cpassword-input"
          />

          <button type="submit" className="signup-btn" disabled={isSubmitting} data-testid="signup-submit-btn">
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <p className="error-msg" data-testid="signup-error-msg">
            ⚠️ {error}
          </p>
        )}

        {signupSuccess && (
          <h3 className="success-msg" data-testid="signup-success-msg">
            ✅ Signup Successful
          </h3>
        )}

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link" data-testid="signup-login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
