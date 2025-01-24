// src/services/signupService.js
import { httpSignup } from './httpSignup';  // Importer la fonction spécifique au signup

// Fonction pour gérer le signup
export const signup = async (userData) => {
  try {
    const result = await httpSignup('/auth/sign-up', 'POST', userData);
    return result;  // Retourne la réponse de l'API
  } catch (error) {
    throw error;  // Propager l'erreur
  }
};
