// src/services/authService.js
import http from './http';

const authService = {
  login: async (username, password) => {
    const response = await http.post("/api/auth/sign-in", { username, password });
    return response.data; // Retourne les données (par exemple, le token d'accès)
  },
  
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await http.post("/api/auth/refresh", { refreshToken });
    return response.data.accessToken; // Retourne le nouveau token
  }
};

export default authService;
