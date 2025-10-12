"use client";
import { deleteBooking, getBookingById, getBookings } from "@/api/booking";
import { redirect } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();
  const [booking, setBooking] = useState(null);

  // get bookings
  const fetchBookings = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getBookings(params);
      setBookings(res?.bookings);
      // toast.success(res?.message || "Bookings Retrieved successfully");
     } catch (error) {
      setErrors(error);
      if (error?.response?.status === 401) {
      setPermissionError(error?.response?.data?.msg || "You don't have permission.");
      redirect("/");
    }
    if (error?.response?.status === 403) {
      setPermissionError(error?.response?.data?.msg || "You don't have permission.");
      redirect("/");
    }
  } finally {
    setLoading(false);
  }
  }, []);

   const findBooking = useCallback(
    async (bookingId) => {
      try {
        setLoading(true);
        const res = await getBookingById(bookingId);
        setBooking(res?.data?.booking);
        setLoading(false);
      } catch (error) {
        console.error({ error });
        setLoading(false);
      }
    },
    [setLoading, setBooking]
  );


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
    onDelete,
    booking,
    findBooking
  };
}
