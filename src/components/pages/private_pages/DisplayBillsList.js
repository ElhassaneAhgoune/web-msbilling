import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DisplayBillsList.css";
import "../../common/PrivatePages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { UserContext } from "../../../contexts/UserContext";
import UserProfileMenu from "../../common/UserProfileMenu";
import displayBillsService from "../../../services/displayBillsService";

const DisplayBillsList = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const filters = location.state || {};

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        console.log("Appel API en cours...");
        const data = await displayBillsService.getCsvFiles(0, filters);
        console.log("Données reçues :", data);

        if (Array.isArray(data)) {
          setBills(data);
        } else {
          console.error("Format inattendu de la réponse API :", data);
          setBills([]); // Évite l'erreur si la réponse n'est pas un tableau
        }
      } catch (error) {
        console.error("Erreur lors du chargement des fichiers :", error);
        setBills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [filters]);

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button className="back-btn" onClick={() => navigate("/display-bills")}>
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
          <div className="sidebar-item" onClick={() => navigate("/bills-summary")}>Bills Summary</div>
          <div className="sidebar-item" onClick={() => navigate("/dashboards")}>Dashboards</div>
          <div className="sidebar-item" onClick={() => navigate("/catalogues-management")}>Catalogues Management</div>
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
            <FontAwesomeIcon icon={faGreaterThan} className="private-pages-Path-icon" />
            <button onClick={() => navigate("/display-bills-list")} className="private-pages-Path-button">
              BILLS LIST
            </button>
          </div>

          <h2>List of CSV Files</h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="bills-table">
              <thead>
                <tr>
                  <th>CSV Name</th>
                  <th>Upload Date</th>
                  <th>Network</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bills) && bills.length > 0 ? (
                  bills.map((file, index) => (
                    <tr key={index}>
                      <td>{file.csvName}</td>
                      <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                      <td>{file.network}</td>
                      <td>
                        <a href={file.csvUrl} target="_blank" rel="noopener noreferrer" className="details-btn">
                          Download
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Aucune facture trouvée</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayBillsList;