// /lib/api/authorized.js

import authInstance from "./authInstance";


export const getBookings = async () => {
  try {
    const res = await authInstance.get("/bookings");
    return res.data;
  } catch (err) {
    console.error("Error fetching bookings:", err?.response?.data || err.message);
    throw err;
  }
};

export const createBooking = async (params) => {
  try {
    const response = await authInstance.post('/booking', { params });
    return response.data;
  } catch (error) {
    console.error('Error create booking:', error.response?.data || error.message);
    throw error;
  }
};

export const updateBooking = async (params) => {
  try {
    const response = await authInstance.put('/booking', { params });
    return response.data;
  } catch (error) {
    console.error('Error update booking:', error.response?.data || error.message);
    throw error;
  }
};