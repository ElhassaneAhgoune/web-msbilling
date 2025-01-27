import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext"; // Assurez-vous d'importer le Provider
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ForgotPassword from "./components/pages/ForgotPassword";
import Home from "./components/pages/Home";
import UploadBills from "./components/pages/UploadBills";
import DisplayBills from "./components/pages/DisplayBills";
import VerificationEmail from "./components/pages/VerificationEmail";
import PrivateRoute from "./routes/PrivateRoute";


function App() {
  return (
    <UserProvider>
      {/* Envelopper les routes avec UserProvider */}
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
          <Route path="/display-bills" element={<PrivateRoute element={<DisplayBills />} />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
