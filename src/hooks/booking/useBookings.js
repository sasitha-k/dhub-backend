"use client";
import { deleteBooking, getBookings } from "@/api/booking";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get bookings
  const fetchBookings = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getBookings(params);
      setBookings(res?.bookings);
      // toast.success(res?.message || "Bookings Retrieved successfully");
     } catch (error) {
    setErrors(error);
    if (error?.response?.data?.code === 403) {
      setPermissionError(error?.response?.data?.msg || "You don't have permission.");
      redirect("/login");
    }
  } finally {
    setLoading(false);
  }
  }, []);


   const onDelete = useCallback(async (_id, onDeleteCallback) => {
    setLoading(true);
    try {
      const res = await deleteBooking({ _id });
      if (res.status === 200) {
        toast.success("Booking deleted successfully");
        onDeleteCallback();
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: "Failed to submit the form" });
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    fetchBookings,
    bookings,
    isLoading,
    errors,
    permissionError,
    onDelete
  };
}
