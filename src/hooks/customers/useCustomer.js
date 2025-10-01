"use client";
import { getCustomers } from "@/api/customers";
import React, { useCallback, useEffect, useState } from "react";

export default function useCustomer() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get customers
  const fetchCustomers = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getCustomers(params);
      setCustomers(res?.customers);
      // console.log("drivers",res?.customers)
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
    fetchCustomers,
    customers,
    isLoading,
    errors,
    permissionError
  };
}
