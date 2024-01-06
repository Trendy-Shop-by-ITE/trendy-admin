// authApi.js
import api from "../../../app/api"; // Import your Axios instance

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/user/login/admin", credentials);
    return response;
  } catch (error) {
    throw error;
  }
};



