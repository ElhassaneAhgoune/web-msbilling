import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService"; // Importer le service d'authentification
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fonction utilitaire pour décoder un JWT (si nécessaire pour vérifier l'expiration)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  // Gestion du login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { accessToken } = await authService.login(username, password);

      // Vérification si le token est valide ou expiré
      const decodedToken = parseJwt(accessToken);
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        throw new Error("Token expired, please try again.");
      }

      // Stocker le token dans le localStorage
      localStorage.setItem("accessToken", accessToken);

      // Redirection vers Home
      navigate("/home");

      // Forcer un rechargement (utile si un état global pose problème)
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message ||
          "Invalid username or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
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
