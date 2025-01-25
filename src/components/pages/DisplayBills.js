import React from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayBills.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth"; // Import du hook personnalisé


const DisplayBills = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  const { handleLogout } = useAuth(); 

  return (
    <div className="display-bills-container">
      <header className="display-bills-header">
        <button className="back-btn" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span>Back</span>
        </button>
        <h1>DISPLAY BILLS</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </button>
      </header>
      <div className="display-bills-content">
        <div className="sidebar">
          <div className="sidebar-item" onClick={() => navigate("/upload-bills")}>
            Upload Bills
          </div>
          <div className="sidebar-item active">Display Bills</div>
          <div className="sidebar-item">Bills Summary</div>
          <div className="sidebar-item">Dashboards</div>
          <div className="sidebar-item">Catalogues Management</div>
        </div>
        <div className="main-content">
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
                <div className="form-buttons">
                  <button type="submit" className="search-btn">
                    Search
                  </button>
                  <button type="reset" className="clear-btn">
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBills;
