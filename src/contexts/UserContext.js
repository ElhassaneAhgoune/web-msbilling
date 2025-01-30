// contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "../services/http"; // Assurez-vous que ce fichier gère bien les appels API

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction qui récupère l'utilisateur depuis l'API ou le localStorage
    const fetchUser = async () => {
      try {
        // D'abord vérifier si un utilisateur est déjà présent dans localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Utilisation des données locales
          setLoading(false);
          return;
        }

        // Si non, récupérer l'utilisateur via l'API
        const response = await axios.get("/api/user/me");
        console.log("Données utilisateur récupérées :", response.data); // Debug : affichez les données utilisateur
        setUser(response.data);
        // Sauvegarder les données utilisateur dans le localStorage pour une utilisation ultérieure
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
