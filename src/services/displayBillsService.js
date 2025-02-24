import http from "./http"; 

const PAGE_SIZE = 10;  // Fixé à 10 pour chaque page

/**
 * Formate uploadDate en YYYY-MM-DD (évite les erreurs API liées au format de date)
 */
const formatDateForAPI = (dateString) => {
  if (!dateString) return null;
  try {
    return new Date(dateString).toISOString().split("T")[0]; // Garde uniquement la partie date
  } catch (error) {
    console.error("Erreur formatage date :", error);
    return null;
  }
};


const displayBillsService = {
  getCsvFiles: async (page = 0, filters = {}) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Aucun token trouvé, l'utilisateur est peut-être déconnecté.");
        return [];
      }

      console.log("Token envoyé dans l'en-tête :", token);
      console.log("Filtres avant nettoyage :", filters);

      // Nettoyer et formater les filtres avant d'envoyer la requête
      const cleanFilters = Object.fromEntries(
        Object.entries({
          ...filters,
          uploadDate: formatDateForAPI(filters.uploadDate), // Formatage correct
        }).filter(([_, value]) => value !== null && value !== "") // Supprime les valeurs vides
      );

      console.log("Filtres envoyés après nettoyage :", cleanFilters);

      // Requête API
      const response = await http.get("/api/csv-file/load", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page, size: PAGE_SIZE, ...cleanFilters }, // Pagination avec 10 lignes par page
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

      // Si l'API retourne un message d'erreur, l'afficher
      if (error.response) {
        console.error("Détails de l'erreur API :", error.response.data);
      }

      return [];
    }
  },
};

export default displayBillsService;
