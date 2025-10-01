// /lib/api/authorized.js

import authInstance from './authInstance';

export const getDrivers = async (params) => {
  try {
    const response = await authInstance.get('/drivers', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching drivers:', error.response?.data || error.message);
    throw error;
  }
};

export const createDriver = async (params) => {
  try {
    const response = await authInstance.post('/drivers', { params });
    return response.data;
  } catch (error) {
    console.error('Error create driver:', error.response?.data || error.message);
    throw error;
  }
};

export const updateDriver = async (params) => {
  try {
    const response = await authInstance.put('/drivers', { params });
    return response.data;
  } catch (error) {
    console.error('Error update driver:', error.response?.data || error.message);
    throw error;
  }
};
