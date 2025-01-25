import React, { createContext, useContext, useState, useEffect } from "react";

// Crée un contexte utilisateur
const UserContext = createContext();

// Fournisseur du contexte utilisateur
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Si les données utilisateur sont stockées dans localStorage, les restaurer
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mettre à jour localStorage chaque fois que l'utilisateur change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => {
  return useContext(UserContext);
};
