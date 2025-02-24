import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../../common/PrivatePages.css";
import "./UpdateProfile.css";
import useAuth from "../../../hooks/useAuth";
import UserProfileMenu from "../../common/UserProfileMenu";
import { UserContext } from "../../../contexts/UserContext";
import updateUserService from "../../../services/updateUserService";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user, setUser, loading } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    timezone: "",
    locale: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" ou "error"

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    } else if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        timezone: user.timezone || "",
        locale: user.locale || "",
      });
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Réinitialisation du message

    try {
      const updatedUser = await updateUserService.updateUserProfile({
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        timezone: formData.timezone,
        locale: formData.locale,
      });

      // ✅ Mettre à jour le contexte utilisateur immédiatement
      setUser(updatedUser);

      // ✅ Sauvegarde des nouvelles données dans localStorage pour éviter le problème au refresh
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("Profile updated successfully!");
      setMessageType("success");

      
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button onClick={() => navigate("/home")} className="h-ms-billing-btn">
          MS-BILLING
        </button>
        <UserProfileMenu user={user} onLogout={handleLogout} />
      </header>

      <div className="private-pages-content">
        <div className="sidebar">
          <button className="sidebar-item" onClick={() => navigate("/home")}>
            Home
          </button>
        </div>

        <div className="private-pages-main-content">
          <div className="update-box">
            <h2>Update Profile</h2>

            {/* ✅ Affichage du message de succès/erreur */}
            {message && (
              <div className={`message ${messageType}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="update-form">
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} disabled className="readonly-field" />

              <label>Email:</label>
              <input type="email" name="email" value={formData.email} disabled className="readonly-field" />

              <label>First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

              <label>Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

              <label>Phone Number:</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

              <label>Timezone:</label>
              <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} required />

              <label>Locale:</label>
              <input type="text" name="locale" value={formData.locale} onChange={handleChange} required />

              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
