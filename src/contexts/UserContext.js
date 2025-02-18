import React, { createContext, useState, useEffect } from "react";
import axios from "../services/http"; // Assurez-vous que ce fichier gère bien les appels API

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/user/me");
        console.log("Données utilisateur récupérées :", response.data);
        setUser(response.data);
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

  // ⬇️ Ajout de setUser dans le contexte pour qu'on puisse mettre à jour les infos immédiatement après un update
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
