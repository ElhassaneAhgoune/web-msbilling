import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadBills.css";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudUploadAlt, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext"; // Import du UserContext
import UserProfileMenu from "../common/UserProfileMenu"; // Import du composant

const UploadBills = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const [fileImported, setFileImported] = useState(false); // État pour le message de succès
  const { user, loading } = useContext(UserContext); // Récupérer les données utilisateur dynamiques

  // Gestion du bouton "Back"
  const handleBack = () => {
    navigate("/home");
  };

  // Gestion de l'importation du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileImported(true); // Le fichier a été importé avec succès
      console.log("File imported successfully: ", file.name);
    }
  };

  // Gestion des états "loading" ou absence d'utilisateur
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="upload-bills-container">
      <header className="upload-bills-header">
        <button className="back-btn" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span>Back</span>
        </button>
        <h1>
          <span>MS-BILLING </span>
          <FontAwesomeIcon icon={faGreaterThan} size="sm" />
          <span> UPLOAD BILLS</span>
        </h1>
        <UserProfileMenu user={user} onLogout={handleLogout} /> {/* Menu utilisateur dynamique */}
      </header>
      <div className="upload-bills-content">
        <div className="sidebar">
          <div className="sidebar-item active">Upload Bills</div>
          <div
            className="sidebar-item"
            onClick={() => navigate("/display-bills")}
          >
            Display Bills
          </div>
          <div className="sidebar-item">Bills Summary</div>
          <div className="sidebar-item">Dashboards</div>
          <div className="sidebar-item">Catalogues Management</div>
        </div>
        <div className="main-content">
          <div className="upload-box">
            {/* Zone d'importation en tant que bouton */}
            <label htmlFor="file-upload" className="upload-box-label">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" className="upload-icon" />
              <p>Click or drag your CSV file(s) to upload</p>
            </label>
            {/* Input de fichier caché */}
            <input
              type="file"
              id="file-upload"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            {/* Message de succès */}
            {fileImported && <p className="success-message">File imported with success!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBills;
