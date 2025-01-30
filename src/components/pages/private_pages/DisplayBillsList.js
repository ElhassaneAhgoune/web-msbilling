import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayBillsList.css";
import "../../common/PrivatePages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth"; 
import { UserContext } from "../../../contexts/UserContext"; 
import UserProfileMenu from "../../common/UserProfileMenu"; 

const DisplayBillsList = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useContext(UserContext);

  // Simuler les données des factures (remplace avec des données dynamiques si nécessaire)
  const [bills] = useState([
    { id: "B001", date: "2024-01-25", reference: "REF123", details: "Details 1" },
    { id: "B002", date: "2024-01-26", reference: "REF124", details: "Details 2" },
    { id: "B003", date: "2024-01-27", reference: "REF125", details: "Details 3" }
  ]);

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
                       <FontAwesomeIcon icon={faGreaterThan} className="private-pages-Path-icon" />
                       <button onClick={() => navigate("/display-bills-list")} className="private-pages-Path-button">
                        BILLS LIST
                       </button>
                     </div>
          

          <div className="bills-table-container">
            <h2>List of Bills</h2>
            <table className="bills-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Bill Date</th>
                  <th>Bill Reference</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.id}</td>
                    <td>{bill.date}</td>
                    <td>{bill.reference}</td>
                    <td>
                      <button className="details-btn">View Details</button>
                      <button className="delete-btn">Delete Bill</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DisplayBillsList;

