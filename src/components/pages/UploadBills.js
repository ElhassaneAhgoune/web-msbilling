import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadBills.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudUploadAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth"; // Import du hook personnalisé


const UploadBills = () => {
  const navigate = useNavigate();
  const [fileImported, setFileImported] = useState(false); // État pour le message de succès

  // Gestion du bouton "Back"
  const handleBack = () => {
    navigate("/home");
  };

  const { handleLogout } = useAuth(); 

  // Gestion de l'importation du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Le fichier a été importé, on affiche le message de succès
      setFileImported(true);
      console.log("File imported successfully: ", file.name);
    }
  };

  return (
    <div className="upload-bills-container">
      <header className="upload-bills-header">
        <button className="back-btn" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span>Back</span>
        </button>
        <h1>UPLOAD BILLS</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </button>
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
