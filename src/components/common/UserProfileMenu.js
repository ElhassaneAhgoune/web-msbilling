import React, { useState } from "react";
import "./UserProfileMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

const UserProfileMenu = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Récupérer les initiales du prénom et du nom
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0).toUpperCase() || ""}${
      lastName?.charAt(0).toUpperCase() || ""
    }`;
  };

  return (
    <div className="user-profile-menu">
      {/* Icône ronde avec les initiales */}
      <div
        className="profile-icon"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {getInitials(user.firstName, user.lastName)}
      </div>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div className="menu-dropdown">
          <strong>User Profile</strong>
          <div className="menu-divider"></div>
          <div className="user-info">
            <p>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <FontAwesomeIcon icon={faIdBadge} style={{ marginRight: "8px" }} />
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <FontAwesomeIcon icon={faIdBadge} style={{ marginRight: "8px" }} />
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: "8px" }} />
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>
          <div className="menu-divider"></div>
          <button className="logout-btn" onClick={onLogout}>
          <strong>Logout</strong>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
