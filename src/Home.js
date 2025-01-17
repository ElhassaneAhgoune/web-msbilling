import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFileAlt, faChartBar, faBook, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate(); // Initialiser useNavigate

  // Fonction pour gérer le clic sur Logout
  const handleLogout = () => {
    navigate("/"); // Redirige vers la page de Login
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MS-BILLING</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" /> {/* Icône Logout */}
        </button>
      </header>
      <div className="home-content">
        <div className="sidebar">
          <Link to="/upload-bills" className="sidebar-item">Upload Bills</Link>
          <Link to="/display-bills" className="sidebar-item">Display Bills</Link>
          <Link to="/bills-summary" className="sidebar-item">Bills Summary</Link>
          <Link to="/dashboards" className="sidebar-item">Dashboards</Link>
          <Link to="/catalogues-management" className="sidebar-item">Catalogues Management</Link>
        </div>
        <div className="main-content">
        <div className="card" onClick={() => navigate("/upload-bills")} >
          <div className="card-icon">
            <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" />
          </div>
           <p>Upload Bills</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faFileAlt} size="2x" />
            </div>
            <p>Display Bills</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faChartBar} size="2x" />
            </div>
            <p>Dashboards</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faBook} size="2x" />
            </div>
            <p>Catalogue Management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
