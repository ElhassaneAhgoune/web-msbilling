import axios from 'axios';

const API_URL = 'http://ec2-52-3-213-37.compute-1.amazonaws.com:8080/api/user/me';

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'accept': '*/*',
      },
      // Ajouter des en-têtes si un token ou une authentification est nécessaire
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
