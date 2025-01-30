import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UploadBillsValidation.css";
import "../../common/PrivatePages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth"; 
import { UserContext } from "../../../contexts/UserContext"; 
import UserProfileMenu from "../../common/UserProfileMenu"; 

const UploadBillsValidation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useAuth();
  const { user } = useContext(UserContext);
  const files = location.state?.files || []; // Récupérer les fichiers passés via la navigation

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button className="back-btn" onClick={() => navigate("/upload-bills")}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span>Back</span>
        </button>
        <button onClick={() => navigate("/home")} className="ms-billing-btn">MS-BILLING</button>
        <UserProfileMenu user={user} onLogout={handleLogout} />
      </header>

      <div className="private-pages-content">
        <div className="sidebar">
          <div className="sidebar-item active" onClick={() => navigate("/upload-bills")}>Upload Bills</div>
          <div className="sidebar-item" onClick={() => navigate("/display-bills")}>Display Bills</div>
          <div className="sidebar-item" onClick={() => navigate("/bills-summary")}>Bills Summary</div>
          <div className="sidebar-item" onClick={() => navigate("/dashboards")}>Dashboards</div>
          <div className="sidebar-item" onClick={() => navigate("/catalogues-management")}>Catalogues Management</div>
        </div>

        <div className="main-content">
          <div className="private-pages-Path">
            <button onClick={() => navigate("/home")} className="private-pages-Path-button">MS-BILLING</button>
            <FontAwesomeIcon icon={faGreaterThan} className="private-pages-Path-icon" />
            <button onClick={() => navigate("/upload-bills")} className="private-pages-Path-button">UPLOAD BILLS</button>
            <FontAwesomeIcon icon={faGreaterThan} className="private-pages-Path-icon" />
            <button className="private-pages-Path-button">BILL UPLOAD VERIFICATION</button>
          </div>

          <div className="validation-results">
            <h2>Upload Validation Results</h2>
            {files.length > 0 ? (
              <ul>
                {files.map((file, index) => (
                  <li key={index}>📂 {file.name} - {file.size} bytes - {file.lines} lines</li>
                ))}
              </ul>
            ) : (
              <p>⚠️ No file uploaded</p>
            )}
            <p className="success-message">✅ File(s) uploaded successfully</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadBillsValidation;
