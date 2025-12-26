"use client";

import { getPackages } from "@/api/packages";
import React, { useCallback, useEffect, useState } from "react";

export default function usePackages() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get packages
  const fetchPackages = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getPackages(params);
      setPackages(res?.packages);
      console.log("packages",res?.packages)
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


  return {
    fetchPackages,
    packages,
    isLoading,
    errors,
    permissionError
  };
}
