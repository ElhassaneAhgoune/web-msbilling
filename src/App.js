import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext"; 
import Login from "./components/pages/public_pages/Login";
import Signup from "./components/pages/public_pages/Signup";
import ForgotPassword from "./components/pages/public_pages/ForgotPassword";
import Home from "./components/pages/private_pages/Home";
import UploadBills from "./components/pages/private_pages/UploadBills";
import UploadBillsValidation from "./components/pages/private_pages/UploadBillsValidation";
import DisplayBills from "./components/pages/private_pages/DisplayBills";
import UpdateProfile from "./components/pages/private_pages/UpdateProfile";
import DisplayBillsList from "./components/pages/private_pages/DisplayBillsList"; // ✅ Ajout de DisplayBillsList
import VerificationEmail from "./components/pages/public_pages/VerificationEmail";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verification-email" element={<VerificationEmail />} />

          {/* Routes protégées */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/upload-bills" element={<PrivateRoute element={<UploadBills />} />} />
          <Route path="/Upload-bills-validation" element={<PrivateRoute element={<UploadBillsValidation />} />} /> {/* ✅ Ajout de la route */}
          <Route path="/display-bills" element={<PrivateRoute element={<DisplayBills />} />} />
          <Route path="/display-bills-list" element={<PrivateRoute element={<DisplayBillsList />} />} /> {/* ✅ Ajout de la route */}
          <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile />} />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
