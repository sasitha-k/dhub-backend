"use client";
import { getDriverExpenses } from "@/api/drivers";
import React, { useCallback, useState } from "react";

export default function useDriverExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchExpenses = useCallback(async (driverId) => {
    if (!driverId) return;

    setLoading(true);
    try {
      const res = await getDriverExpenses(driverId);
      setExpenses(res?.expenses || res?.data || res || []);
    } catch (error) {
      setErrors(error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchExpenses,
    expenses,
    isLoading,
    errors,
  };
}
