import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFileAlt, faChartBar, faBook } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import UserProfileMenu from "../common/UserProfileMenu";
import { UserContext } from "../../contexts/UserContext"; // Importer le contexte utilisateur

const Home = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user, loading } = useContext(UserContext); // Récupérer user et loading depuis le contexte
  useEffect(() => {
    if (!loading && !user) {
      // Si l'utilisateur n'est pas authentifié, redirigez vers la page de login
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement
  }

  if (!user) {
    return <div>User not found</div>; // Gérer le cas où les données utilisateur sont absentes
  }
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MS-BILLING</h1>
        <UserProfileMenu user={user} onLogout={handleLogout} />
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
          <div className="card" onClick={() => navigate("/upload-bills")}>
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
