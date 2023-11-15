// frontend/utils/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; 

export const addUserData = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/userdata/add`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
  };
  
export const getUserDataReport = async (username, level) => {
    try {
        const response = await axios.get(`${BASE_URL}/userdata/latest/${username}/${level}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPrediction = async (level) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/predict`, { level });
      return response.data.predictedReactionTimePerShape;
    } catch (error) {
      console.error("Error fetching prediction", error);
      throw error;
    }
  };
