import http from "./http";

const PAGE_SIZE = 10;

const displayBillsService = {
  getCsvFiles: async (page = 0, filters = {}) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token envoyé dans l'en-tête :", token);
      console.log("Filtres envoyés :", filters);
      console.log("Appel API vers : http://ec2-54-146-132-147.compute-1.amazonaws.com:8080/api/csv-file/load");

      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );
      
      const response = await http.get(`/api/csv-file/load`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, size: PAGE_SIZE, ...cleanFilters }, // N'inclut que les filtres non vides
      });

      console.log("Réponse API reçue :", response);

      if (response.status === 204) {
        console.warn("Aucune donnée trouvée (204 No Content)");
        return [];
      }

      if (Array.isArray(response.data)) {
        console.log("Données valides reçues :", response.data);
        return response.data;
      } else {
        console.error("Format de données inattendu :", response.data);
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des fichiers CSV :", error);
      return [];
    }
  },
};


export default displayBillsService;