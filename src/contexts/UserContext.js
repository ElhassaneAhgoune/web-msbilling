import React, { createContext, useState, useEffect } from "react";
import axios from "../services/http"; // Assurez-vous que ce fichier gère bien les appels API

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/me");
        console.log("Données utilisateur récupérées :", response.data); // Debug : affichez les données utilisateur
        setUser(response.data);
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
