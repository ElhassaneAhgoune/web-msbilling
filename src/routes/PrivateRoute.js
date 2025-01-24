import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  // Vérifie si l'utilisateur est authentifié (par exemple, via un token)
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas authentifié, le rediriger vers la page de login
    return <Navigate to="/" />;
  }

  // Si l'utilisateur est authentifié, afficher l'élément (la page)
  return element;
};

export default PrivateRoute;
