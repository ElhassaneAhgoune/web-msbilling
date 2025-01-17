import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home"; // Page Home
import UploadBills from "./UploadBills"; // Page Upload Bills
import DisplayBills from "./DisplayBills"; // Page Display Bills (ajoutée)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload-bills" element={<UploadBills />} />
        <Route path="/display-bills" element={<DisplayBills />} /> {/* Ajout de DisplayBills */}
      </Routes>
    </Router>
  );
}

export default App;
