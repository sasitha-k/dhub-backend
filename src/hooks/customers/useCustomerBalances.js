"use client";
import { getCustomerBalances } from "@/api/customers";
import React, { useCallback, useEffect, useState } from "react";

export default function useCustomerBalances() {
  const [customerBalances, setCustomerBalances] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();

  // get customer balances
  const fetchCustomerBalances = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getCustomerBalances(params);
      setCustomerBalances(res?.customers || res || []);
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
    fetchCustomerBalances,
    customerBalances,
    isLoading,
    errors,
    permissionError
  };
}
