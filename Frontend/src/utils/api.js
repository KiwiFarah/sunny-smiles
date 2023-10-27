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
  

export const getUserDataReport = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/userdata/report`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
