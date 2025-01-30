import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadBills.css";
import "../../common/PrivatePages.css";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudUploadAlt, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../contexts/UserContext";
import UserProfileMenu from "../../common/UserProfileMenu";

const UploadBills = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const [fileImported, setFileImported] = useState(false);
  const { user } = useContext(UserContext);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Stocker les fichiers

  // Gestion du bouton "Back"
  const handleBack = () => {
    navigate("/home");
  };

  // Gestion de l'importation du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileImported(true);
      setUploadedFiles([file]);

      console.log("Fichier importé :", file.name);

      // Lire le fichier pour récupérer plus d'infos (ex: nombre de lignes)
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split("\n").length; // Compter les lignes du fichier

        // Rediriger vers UploadBillsValidation en passant les infos du fichier
        navigate("/upload-bills-validation", {
          state: {
            files: [{ name: file.name, size: file.size, lines }]
          }
        });
      };
      reader.readAsText(file); // Lire le fichier comme un texte
    }
  };

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button className="back-btn" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span>Back</span>
        </button>
        <button onClick={() => navigate("/home")} className="ms-billing-btn">
          MS-BILLING
        </button>
        <UserProfileMenu user={user} onLogout={handleLogout} />
      </header>
      
      <div className="private-pages-content">
        <div className="sidebar">
          <div className="sidebar-item active">Upload Bills</div>
          <div className="sidebar-item" onClick={() => navigate("/display-bills")}>Display Bills</div>
          <div className="sidebar-item">Bills Summary</div>
          <div className="sidebar-item">Dashboards</div>
          <div className="sidebar-item">Catalogues Management</div>
        </div>

        <div className="main-content">
          <div className="private-pages-Path">
            <button onClick={() => navigate("/home")} className="private-pages-Path-button">
              MS-BILLING
            </button>
            <FontAwesomeIcon icon={faGreaterThan} className="private-pages-Path-icon" />
            <button onClick={() => navigate("/upload-bills")} className="private-pages-Path-button">
              UPLOAD BILLS
            </button>
          </div>

          {/* Zone de sélection du réseau */}
          <div className="select-box">
            <h>Select Network:</h>
            <form className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <select>
                    <option>Visa</option>
                    <option>MasterCard</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Zone d'upload */}
          <div className="upload-box">
            <label htmlFor="file-upload" className="upload-box-label">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" className="upload-icon" />
              <p>Click or drag your CSV file(s) to upload</p>
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            {fileImported && <p className="success-message">✅ File imported successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBills;
