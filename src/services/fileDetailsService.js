import http from "./http";

const fileDetailsService = {
  getFileDetails: async (csvName, networkType) => {
    try {
      const response = await http.get(`/api/csv-file/load/${networkType}/${csvName}`, {
        params: { csvName, page: 0, size: 10 },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des détails du fichier :", error);
      throw error;
    }
  },
};

export default fileDetailsService;
