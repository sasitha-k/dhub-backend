"use client";
import { getDriverBookingHistory } from "@/api/drivers";
import React, { useCallback, useState } from "react";

export default function useDriverBookingHistory() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchBookingHistory = useCallback(async (driverId) => {
    if (!driverId) return;

    setLoading(true);
    try {
      const res = await getDriverBookingHistory(driverId);
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
    errors,
  };
}
