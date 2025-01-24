// src/routes/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import publicRoutes from "./publicRoutes";
import Home from "../components/pages/Home";
import Dashboard from "../components/pages/Dashboard";

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Routes privées */}
      <PrivateRoute path="/home" element={<Home />} />
      <PrivateRoute path="/dashboard" element={<Dashboard />} />

      {/* Redirection vers login si l'URL ne correspond à rien */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default RoutesConfig;
