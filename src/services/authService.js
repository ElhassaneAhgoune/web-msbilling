// src/services/authService.js
import http from './http';

const authService = {
  login: async (username, password) => {
    const response = await http.post("/api/auth/sign-in", { username, password });
    return response.data; // Retourne les données (par exemple, le token d'accès)
  },
};

export default authService;
