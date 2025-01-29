// src/services/verifyEmailService.js
import http from './http';

// Exportation nommée
export const verifyEmail = async (email, otp) => {
  try {
    const response = await http.post("/api/auth/verify-email", { email, otp });
    return response.data;  // Retourne la réponse de l'API
  } catch (error) {
    throw error;
  }
};
