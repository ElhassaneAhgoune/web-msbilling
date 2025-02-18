import http from "./http";

const updateUserProfile = async (userData) => {
  try {
    const response = await http.post("api/user/update", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export default {
  updateUserProfile,
};
