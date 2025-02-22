import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayBills.css";
import "../../common/PrivatePages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { UserContext } from "../../../contexts/UserContext";
import UserProfileMenu from "../../common/UserProfileMenu";

const DisplayBills = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useContext(UserContext);

  // États pour les nouveaux filtres
  const [filters, setFilters] = useState({
    csvName: "",
    network: "",
    uploadDate: "",
  });

  // Gestion du changement des inputs
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Gestion du bouton "Search"
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/display-bills-list", { state: filters }); // Passer les filtres à la page DisplayBillsList
  };

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
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
          <div className="sidebar-item" onClick={() => navigate("/upload-bills")}>Upload Bills</div>
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
            <form className="search-form" onSubmit={handleSearch}>
              <div className="form-row">
                <div className="form-group">
                  <label>CSV Name</label>
                  <input
                    type="text"
                    name="csvName"
                    value={filters.csvName}
                    onChange={handleChange}
                    placeholder="Enter CSV Name"
                  />
                </div>
                <div className="form-group">
                  <label>Network</label>
                  <select name="network" value={filters.network} onChange={handleChange}>
                    <option value="">Select Network</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Upload Date</label>
                  <input
                    type="date"
                    name="uploadDate"
                    value={filters.uploadDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-buttons-container">
                <button type="submit" className="search-btn">Search</button>
                <button type="reset" className="clear-btn" onClick={() => setFilters({ csvName: "", network: "", uploadDate: "" })}>
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