import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DisplayBillsList.css";
import "../../common/PrivatePages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { UserContext } from "../../../contexts/UserContext";
import UserProfileMenu from "../../common/UserProfileMenu";
import fileDetailsService from "../../../services/fileDetailsService.js";

const PAGE_SIZE = 10;

const FileDetails = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useContext(UserContext);
  const { csvName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const networkType = csvName.toLowerCase().includes("visa") ? "visa" : "master-card";
        const response = await fileDetailsService.getFileDetails(csvName, networkType);

        setData(response);
        setHasMoreData(response.length >= PAGE_SIZE);
      } catch (error) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [csvName, page]);

  const goToNextPage = () => {
    if (hasMoreData) setPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    if (page > 0) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button className="back-btn" onClick={() => navigate("/display-bills-list")}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" /> <span>Back</span>
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
            <FontAwesomeIcon icon={faGreaterThan} className="private-pages-Path-icon" />
            <button onClick={() => navigate(`/file-details/${csvName}`)} className="private-pages-Path-button">
              BILL DETAILS
            </button>
          </div>
          
          <h2>Bill Details</h2>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="table-container">
  <div className="table-wrapper">
    <table className="bills-table">
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          )}

          <div className="pagination-controls">
            <button onClick={goToPreviousPage} disabled={page === 0}>
              Previous Page
            </button>
            <button onClick={goToNextPage} disabled={!hasMoreData}>
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
