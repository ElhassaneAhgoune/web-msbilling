// src/services/verifyEmailService.js
import { httpVerifyEmail } from './httpVerifyEmail';  // Importer la fonction HTTP pour la vérification de l'email

// Fonction pour effectuer la vérification de l'email
export const verifyEmail = async (email, otp) => {
  try {
    const result = await httpVerifyEmail('/auth/verify-email', 'POST', { email, otp });
    return result;  // Retourne la réponse de l'API
  } catch (error) {
    throw error;  // Propager l'erreur
  }
};
