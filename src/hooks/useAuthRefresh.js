// src/hooks/useAuthRefresh.js
import { useEffect } from "react";
import authService from "../services/authService"; // Assure-toi d'avoir ce service

const useAuthRefresh = () => {
  useEffect(() => {
    // Vérifie si le refreshToken est présent dans le localStorage
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshInterval = setInterval(async () => {
        try {
          // Rafraîchit le token
          const newToken = await authService.refreshToken(); // Assure-toi que refreshToken() est une méthode valide dans ton service
          // Mets à jour les en-têtes ou le token dans ta configuration API
          localStorage.setItem("accessToken", newToken);
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }, 1000 * 60 * 15); // Rafraîchit toutes les 15 minutes

      return () => clearInterval(refreshInterval); // Nettoie l'intervalle lors de la destruction du composant
    }
  }, []);
};

export default useAuthRefresh;
