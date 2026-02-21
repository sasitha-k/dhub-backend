"use client";
import { getDriverHistory } from "@/api/drivers";
import React, { useCallback, useState } from "react";

export default function useDriverHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchHistory = useCallback(async (driverId) => {
    if (!driverId) return;

    setLoading(true);
    try {
      const res = await getDriverHistory(driverId);
      console.log({ res });

      setHistory(res?.bookings ?? res?.data ?? (Array.isArray(res) ? res : []));
    } catch (error) {
      setErrors(error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchHistory,
    history,
    isLoading,
    errors,
  };
}
