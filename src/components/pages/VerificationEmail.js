import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../services/verifyEmailService";  // Importer le service de vérification
import "./Signup.css";  // Utilisation du même style que Signup

const VerificationEmail = () => {
  const [email, setEmail] = useState("");  // L'état pour l'email
  const [otp, setOtp] = useState("");  // L'état pour l'OTP
  const [message, setMessage] = useState("");  // L'état pour les messages de succès/erreur
  const navigate = useNavigate();  // Initialiser useNavigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      // Appel à l'API de vérification de l'email
      const result = await verifyEmail(email, otp);
      console.log("Email verified:", result);

      // Si la vérification réussie, rediriger vers la page de login
      setMessage("Email verified successfully!");
      setTimeout(() => navigate("/"), 2000);  // Rediriger après un délai

    } catch (error) {
      console.error("Error during email verification:", error);
      setMessage("Verification failed: " + error.message);  // Afficher l'erreur
    }
  };

  const handleBackClick = () => {
    navigate("/");  // Rediriger vers la page de login
  };

  return (
    <div className="signup-container">
      <div className="left">
        <h1>MS-BILLING</h1>
        <p>Your digital assistant for streamlined invoicing</p>
      </div>
      <div className="right">
        <div className="signup-box">
          <h2>Email Verification</h2>
          <form onSubmit={handleVerify}>
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

            <div className="input-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                required
              />
            </div>

            <button type="submit" className="signup-btn">
              Verify
            </button>
          </form>

          {message && <p>{message}</p>}  {/* Afficher un message de succès ou d'erreur */}

          <button onClick={handleBackClick} className="back-to-login-btn">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmail;
