// src/services/httpSignup.js

const API_URL = "http://192.168.39.223:8080/api";  // L'URL de base de votre API

// Fonction spécifique pour faire des requêtes HTTP liées au signup
export const httpSignup = async (url, method, data = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  };

  const options = {
    method: method,
    headers: headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
