import http from './http'; // Importer l'instance HTTP

// Fonction pour uploader un fichier
export const uploadInvoice = async (network, file) => {
  const apiUrl = network === 'Visa'
    ? '/api/invoices/upload/visa'
    : '/api/invoices/upload/mastercard';

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await http.post(apiUrl, formData, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Retourner les données de l'API en cas de succès
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Une erreur est survenue lors de l\'upload.');
    } else {
      throw new Error('Erreur inconnue lors de l\'upload.');
    }
  }
};
