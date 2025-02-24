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

const PAGE_SIZE = 10; 

const DisplayBillsList = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const filters = location.state || {};

  const [bills, setBills] = useState(() => {
    const savedBills = sessionStorage.getItem("bills");
    return savedBills ? JSON.parse(savedBills) : [];
  });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(() => {
      const savedPage = sessionStorage.getItem("page");
      return savedPage ? JSON.parse(savedPage) : 0;
    });
  const [sortColumn, setSortColumn] = useState("csvName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        console.log(`Chargement des factures pour la page ${page}...`);
  
        const data = await displayBillsService.getCsvFiles(page, filters);
        console.log("Données reçues :", data);
  
        if (Array.isArray(data)) {
          setBills(data);
          setHasMoreData(data.length === PAGE_SIZE);
        } else {
          setBills([]);
          setHasMoreData(false);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des fichiers :", error);
        setBills([]);
        setHasMoreData(false);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBills();
  }, []); // <-- Ne pas dépendre de `bills` ici
  

  useEffect(() => {
    sessionStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);
  
  useEffect(() => {
    sessionStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  const sortBills = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);

    const sortedBills = [...bills].sort((a, b) => {
      if (column === "csvName") {
        return newSortOrder === "asc" ? a.csvName.localeCompare(b.csvName) : b.csvName.localeCompare(a.csvName);
      } else if (column === "uploadDate") {
        return newSortOrder === "asc" ? new Date(a.uploadDate) - new Date(b.uploadDate) : new Date(b.uploadDate) - new Date(a.uploadDate);
      } else if (column === "total") {
        return newSortOrder === "asc" ? a.total - b.total : b.total - a.total;
      }
      return 0;
    });

    setBills(sortedBills);
  };

  const goToNextPage = () => {
    if (hasMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleDelete = (csvName) => {
    if (window.confirm(`Are you sure you want to delete the file: ${csvName}?`)) {
      setBills((prevBills) => prevBills.filter((bill) => bill.csvName !== csvName));
    }
  };

  const handleDetails = (csvName) => {
    sessionStorage.setItem("displayBills", JSON.stringify(bills));
    sessionStorage.setItem("displayBillsPage", page);
    navigate(`/file-details/${csvName}`);
      };

  const handleDownload = (csvName) => {
    navigate(`/file-dowload/${csvName}`);
  };

  return (
    <div className="private-pages-container">
      <header className="private-pages-header">
        <button className="back-btn" onClick={() => navigate("/display-bills")}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" /> <span>Back</span>
        </button>
        <button onClick={() => navigate("/home")} className="ms-billing-btn">MS-BILLING</button>
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
          <h2>List of Bills</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="bills-table">
              <thead>
                <tr>
                  <th onClick={() => sortBills("csvName")}>CSV Name {sortColumn === "csvName" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                  <th onClick={() => sortBills("uploadDate")}>Upload Date {sortColumn === "uploadDate" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                  <th>Network</th>
                  <th onClick={() => sortBills("total")}>Total Amount {sortColumn === "total" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map((file, index) => (
                    <tr key={index}>
                      <td>{file.csvName}</td>
                      <td>{new Date(file.uploadDate).toLocaleDateString()}</td>
                      <td>{file.network}</td>
                      <td>{file.total !== undefined ? file.total.toFixed(2) : "N/A"}</td>
                      <td>
                        <button onClick={() => handleDownload(file.csvName)} className="download-btn">Download</button>
                        <button onClick={() => handleDetails(file.csvName)} className="details-btn">Details</button>
                        <button onClick={() => handleDelete(file.csvName)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">Aucune facture trouvée</td></tr>
                )}
              </tbody>
            </table>
          )}

          <div className="pagination-controls">
            <button onClick={goToPreviousPage} disabled={page === 0}>Previous Page</button>
            <button onClick={goToNextPage} disabled={!hasMoreData}>Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBillsList;
