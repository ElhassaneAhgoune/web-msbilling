import axios from "axios";

// Créer une instance Axios avec la configuration de base
const http = axios.create({
  baseURL: "http://192.168.39.223:8080/", // Remplacez par l'URL de votre backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajout d'un intercepteur pour gérer automatiquement les tokens, si nécessaire
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
