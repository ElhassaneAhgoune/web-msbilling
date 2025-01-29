// src/ForgotPassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importer useNavigate
import "./ForgotPassword.css";
import "../../common/PublicPages.css"


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");  // État pour afficher le message de confirmation
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu pourrais appeler une API pour envoyer l'email de réinitialisation, mais pour le moment, affichons un message
    setMessage("An email has been sent to reset your password.");
  };

  const handleBackClick = () => {
    navigate("/");  // Rediriger vers la page de login
  };

  return (
    <div className="public-pages-container">
      <div className="left">
        <h1>MS-BILLING</h1>
        <p>Your digital assistant for streamlined invoicing</p>
      </div>
      <div className="right">
        <div className="public-pages-boxes">
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="reset-btn">
              Reset Password
            </button>
          </form>

          {/* Afficher le message après la soumission */}
          {message && <p className="success-message">{message}</p>}

          {/* Bouton Back */}
          <button onClick={handleBackClick} className="back-to-login-btn">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
