"use client";
import { getDriverBalances } from "@/api/drivers";
import React, { useCallback, useEffect, useState } from "react";

export default function useDriverBalances() {
  const [driverBalances, setDriverBalances] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get driver balances
  const fetchDriverBalances = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getDriverBalances(params);
      setDriverBalances(res?.drivers || res || []);
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
    fetchDriverBalances,
    driverBalances,
    isLoading,
    errors,
    permissionError
  };
}
