// src/services/signupService.js
import http from './http';

// Exportation nommée
export const signup = async (userData) => {
  try {
    const response = await http.post("/api/auth/sign-up", userData);
    return response.data;  // Retourne la réponse de l'API
  } catch (error) {
    throw error;
  }
};
