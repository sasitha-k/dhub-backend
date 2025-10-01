"use client";
import { getBookings } from "@/api/booking";
import React, { useCallback, useEffect, useState } from "react";

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get drivers
  const fetchBookings = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getBookings(params);
      setBookings(res?.bookings);
      // console.log("bookings",res?.bookings)
     } catch (error) {
    setErrors(error);
    if (error?.response?.data?.code === 403) {
      setPermissionError(error?.response?.data?.msg || "You don't have permission.");
    }
  } finally {
    setLoading(false);
  }
  }, []);


  return {
    fetchBookings,
    bookings,
    isLoading,
    errors,
    permissionError
  };
}
