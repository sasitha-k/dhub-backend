// /lib/api/authorized.js

import authInstance from './authInstance';

export const getCustomers = async (params) => {
  try {
    const response = await authInstance.get('/customers', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching drivers:', error.response?.data || error.message);
    throw error;
  }
};
