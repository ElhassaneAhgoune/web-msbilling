import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadBills.css";
import "../../common/PrivatePages.css";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCloudUploadAlt, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../contexts/UserContext";
import UserProfileMenu from "../../common/UserProfileMenu";
import { uploadInvoice } from "../../../services/invoiceService"; // Import du service

const UploadBills = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useContext(UserContext);
  const [network, setNetwork] = useState("Visa"); // Réseau par défaut
  const [errorMessage, setErrorMessage] = useState("");

  // Gestion du bouton "Back"
  const handleBack = () => {
    navigate("/home");
  };

  // Gestion de la sélection du réseau
  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };

  // Fonction d'upload de fichier
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validation du type de fichier (CSV uniquement)
    if (!file.name.endsWith(".csv")) {
      setErrorMessage("❌ Please upload a valid CSV file.");
      return;
    }

    setErrorMessage(""); // Réinitialiser les erreurs

    try {
      const response = await uploadInvoice(network, file);

      // Rediriger vers UploadBillsValidation avec les infos du fichier et du réseau
      navigate("/upload-bills-validation", {
        state: {
          success: true,
          files: [{ name: file.name, size: file.size }],
          network: network,
          message: "✅ File uploaded successfully!",
        },
      });
    } catch (error) {
      // En cas d'erreur, rediriger vers UploadBillsValidation avec le message d'erreur
      navigate("/upload-bills-validation", {
        state: {
          success: false,
          files: [{ name: file.name, size: file.size }],
          network: network,
          message: error.message || "❌ An error occurred during upload.",
        },
      });
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

          {/* Sélection du réseau */}
          <div className="select-box">
            <h2>Select Network:</h2>
            <form className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <select value={network} onChange={handleNetworkChange}>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Upload de fichier */}
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
          </div>

          {/* Affichage des erreurs */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadBills;
