import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { signup } from "../../services/signupService";  // Importer le service de signup
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    timezone: "paris", // Vous pouvez laisser "paris" par défaut
    locale: "FR",     // Idem pour locale
    roleId: 1         // Par défaut ou selon votre logique
  });

  const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs
  const navigate = useNavigate();  // Initialiser useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const result = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        timezone: formData.timezone,
        locale: formData.locale,
        roleId: formData.roleId,
      });

      console.log("Account created successfully:", result);

      // Redirection vers la page de vérification d'email
      navigate("/verification-email");
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Signup failed: " + error.message);
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
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                required
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <button type="submit" className="signup-btn">
              Create Account
            </button>
          </form>

          <button onClick={handleBackClick} className="back-to-login-btn">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
