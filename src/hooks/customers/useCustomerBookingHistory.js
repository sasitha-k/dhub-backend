"use client";
import { getCustomerBookingHistory } from "@/api/customers";
import React, { useCallback, useState } from "react";

export default function useCustomerBookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // get customer booking history
  const fetchBookingHistory = useCallback(async (customerId) => {
    if (!customerId) return;
    
    setLoading(true);
    try {
      const res = await getCustomerBookingHistory(customerId);
      setBookingHistory(res?.bookings || res || []);
    } catch (error) {
      setErrors(error);
      setBookingHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchBookingHistory,
    bookingHistory,
    isLoading,
    errors
  };
}
