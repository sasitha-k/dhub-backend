"use client";
import { getDriverLeaves } from "@/api/drivers";
import React, { useCallback, useState } from "react";

export default function useDriverLeaves() {
  const [driverLeaves, setDriverLeaves] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get driver leaves
  const fetchDriverLeaves = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getDriverLeaves(params);
      setDriverLeaves(res?.leaves || res || []);
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
    fetchDriverLeaves,
    driverLeaves,
    isLoading,
    errors,
    permissionError
  };
}
