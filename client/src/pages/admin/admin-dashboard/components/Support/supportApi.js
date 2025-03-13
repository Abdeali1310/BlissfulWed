import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/support";

// 📌 Submit a support request
export const submitSupportRequest = async (requestData) => {
  try {
    const response = await axios.post(`${API_URL}/submit`, requestData);
    return response.data;
  } catch (error) {
    console.error("Error submitting request:", error);
    throw error;
  }
};

// 📌 Get all requests (For Admin)
export const fetchRequests = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

// 📌 Mark a request as resolved
export const resolveRequest = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/resolve/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error resolving request:", error);
    throw error;
  }
};
