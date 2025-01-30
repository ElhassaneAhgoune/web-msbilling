import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayBills.css";
import "../../common/PrivatePages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft , faGreaterThan} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth"; // Import du hook personnalisé
import { UserContext } from "../../../contexts/UserContext"; // Import du UserContext
import UserProfileMenu from "../../common/UserProfileMenu"; // Import du composant

const DisplayBills = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const { user } = useContext(UserContext); // Récupérer les données utilisateur dynamiques

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button className="back-btn" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span>Back</span>
        </button>
        <button 
  onClick={() => navigate("/home")} 
  className="ms-billing-btn"
>
  MS-BILLING
</button>
        <UserProfileMenu user={user} onLogout={handleLogout} />
      </header>
      <div className="private-pages-content">
        <div className="sidebar">
          <div
            className="sidebar-item"
            onClick={() => navigate("/upload-bills")}
          >
            Upload Bills
          </div>
          <div className="sidebar-item active">Display Bills</div>
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
               <button onClick={() => navigate("/display-bills")} className="private-pages-Path-button">
                 DISPLAY BILLS
               </button>
             </div>

          <div className="filter-box">
            <h2>Search</h2>
            <form className="search-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Billing Date</label>
                  <select>
                    <option>Data range</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>From Date *</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>To Date *</label>
                  <input type="date" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Activity Customer Location (Country)</label>
                  <select>
                    <option>Select country</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Activity Customer Location</label>
                  <select>
                    <option>Select invoice number</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Customer Identifier</label>
                  <select>
                    <option>Select Customer Identifier</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Customer Identifier Value</label>
                  <select>
                    <option>Select Customer Identifier Value</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Billing Method</label>
                  <select>
                    <option>Select Billing Method</option>
                  </select>
                </div>
              </div>
              {/* Boutons alignés en bas à droite */}
              <div className="form-buttons-container">
                <button type="submit" className="search-btn" onClick={() => navigate("/display-bills-list")}>
                  Search
                </button>
                <button type="reset" className="clear-btn">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBills;
