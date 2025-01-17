// src/Login.js
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); // Redirige vers la page Home
  };

  return (
    <div className="login-container">
      <div className="left">
        <h1>MS-BILLING</h1>
        <p>Your digital assistant for streamlined invoicing</p>
      </div>
      <div className="right">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className="login-btn">LOGIN</button>
            {/* Lien vers la page ForgotPassword */}
            <p className="forgot-password">
              <Link to="/forgot-password">Forgot your password?</Link>
            </p>
          </form>
          <p className="signup">
            New here? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
