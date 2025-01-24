import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ForgotPassword from "./components/pages/ForgotPassword";
import Home from "./components/pages/Home"; // Page Home
import UploadBills from "./components/pages/UploadBills"; // Page Upload Bills
import DisplayBills from "./components/pages/DisplayBills"; // Page Display Bills
import VerificationEmail from "./components/pages/VerificationEmail"; // Page Verification Email (ajoutée)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload-bills" element={<UploadBills />} />
        <Route path="/display-bills" element={<DisplayBills />} />
        <Route path="/verification-email" element={<VerificationEmail />} /> {/* Ajout de VerificationEmail */}
      </Routes>
    </Router>
  );
}

export default App;
