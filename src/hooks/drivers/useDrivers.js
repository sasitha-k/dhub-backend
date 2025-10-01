"use client";
import { getDrivers } from "@/api/drivers";
import React, { useCallback, useEffect, useState } from "react";

export default function useDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get drivers
  const fetchDrivers = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getDrivers(params);
      setDrivers(res?.drivers);
      // console.log("drivers",res?.drivers)
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
    fetchDrivers,
    drivers,
    isLoading,
    errors,
    permissionError
  };
}
