"use client";
import { getCustomers, getCustomersWithBalance } from "@/api/customers";
import React, { useCallback, useEffect, useState } from "react";

export default function useCustomer() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [permissionError, setPermissionError] = useState();
  const [customersWithBalance, setCustomersWithBalance] = useState([]);

  // get customers
  const fetchCustomers = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getCustomers(params);
      setCustomers(res?.customers);
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

  const fetchCustomersWithBalance = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await getCustomersWithBalance(params);
      setCustomersWithBalance(res?.customers?.customers);
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
    fetchCustomers,
    customers,
    isLoading,
    errors,
    permissionError,
    fetchCustomersWithBalance,
    customersWithBalance
  };
}
