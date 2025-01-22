// src/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();  // Initialiser useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic goes here
    console.log("Form Submitted", formData);
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
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="signup-btn">
              Create Account
            </button>
          </form>

          {/* Bouton Back */}
          <button onClick={handleBackClick} className="back-to-login-btn">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
