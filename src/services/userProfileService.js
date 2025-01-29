// src/services/userProfileService.js
import http from './http';

const userProfileService = {
  fetchUserProfile: async () => {
    const response = await http.get("/api/user/me");
    return response.data;  // Retourne les données du profil utilisateur
  },
};

export default userProfileService;
