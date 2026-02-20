"use client";

import { BreadcrumbProvider } from "@/hooks/providers/useBreadcrumbProvider";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCustomerBalances from "@/hooks/customers/useCustomerBalances";
import SearchFilter from "@/components/common/filters/SearchFilter";
import { formatter } from "@/constants/formatNumber";
import { DollarSign, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import TextInput from "@/components/common/inputs/TextInput";
import moment from "moment";
import { CustomerDetailModal } from "./CustomerDetailModal";

export default function Page() {
  const { fetchCustomerBalances, customerBalances, isLoading } =
    useCustomerBalances();
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  let [filtered, setFiltered] = useState(customerBalances);
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' or 'desc'
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Build query params object, only including non-empty values
    const params = {};
    if (filters.firstName) params.firstName = filters.firstName;
    if (filters.lastName) params.lastName = filters.lastName;
    if (filters.email) params.email = filters.email;
    if (filters.mobile) params.mobile = filters.mobile;

    fetchCustomerBalances(params);
  }, [fetchCustomerBalances, filters]);

  useEffect(() => {
    setFiltered(customerBalances);

    // Update selected customer if modal is open and customer data has changed
    if (isModalOpen && selectedCustomer?._id && customerBalances?.customers) {
      const updatedCustomer = customerBalances.customers.find(
        (c) => c._id === selectedCustomer._id,
      );
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
    }
  }, [customerBalances, isModalOpen, selectedCustomer?._id]);

  console.log({ filtered });

  // Calculate total amount owed
  const totalOwed = filtered?.totalDebtsToCompany ?? 0;

  filtered = filtered.customers ?? [];

  // Sort filtered data by customerOwesCompany
  const sortedData = React.useMemo(() => {
    if (!filtered || filtered.length === 0) return [];

    const sorted = [...filtered].sort((a, b) => {
      const amountA = a?.customerOwesCompany || 0;
      const amountB = b?.customerOwesCompany || 0;

      if (sortOrder === "asc") {
        return amountA - amountB;
      } else {
        return amountB - amountA;
      }
    });

    return sorted;
  }, [filtered, sortOrder]);

  // Format currency with Sri Lankan Rupee symbol (Rs.)
  const formatCurrency = (amount) => {
    return `Rs. ${formatter.format(amount)}`;
  };

  // Format date and time elapsed
  const formatCreatedAt = (createdAt) => {
    if (!createdAt) return "N/A";
    const date = moment(createdAt);
    const now = moment();
    const timeAgo = moment.duration(now.diff(date));

    const formattedDate = date.format("MM-DD-YYYY");
    const daysAgo = Math.floor(timeAgo.asDays());
    const hoursAgo = Math.floor(timeAgo.asHours());
    const minutesAgo = Math.floor(timeAgo.asMinutes());

    let timeElapsed = "";
    if (daysAgo > 0) {
      timeElapsed = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    } else if (hoursAgo > 0) {
      timeElapsed = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
    } else if (minutesAgo > 0) {
      timeElapsed = `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
    } else {
      timeElapsed = "Just now";
    }

    return (
      <div className="flex flex-col gap-1">
        {/* <span className="text-xs">{formattedDate}</span> */}
        <span className="text-xs text-green-800 dark:text-green-800">
          {timeElapsed}
        </span>
      </div>
    );
  };

  // Toggle sort order
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle row click to open modal
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <BreadcrumbProvider value={[{ label: "Credit Hires", href: null }]}>
      <div className="flex w-auto h-auto flex-col gap-6 p-4">
        {/* Summary Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Amount Owed
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(totalOwed)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{filtered?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  First Name
                </label>
                <TextInput
                  placeholder="Search by first name"
                  value={filters.firstName || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, firstName: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Last Name
                </label>
                <TextInput
                  placeholder="Search by last name"
                  value={filters.lastName || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, lastName: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Email
                </label>
                <TextInput
                  placeholder="Search by email"
                  value={filters.email || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Mobile
                </label>
                <TextInput
                  placeholder="Search by mobile"
                  value={filters.mobile || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, mobile: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Balances Table */}
        <Card>
          <CardContent className={"overflow-x-auto"}>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-muted-foreground text-sm">
                    Loading customer balances...
                  </p>
                </div>
              </div>
            ) : (
              <Table>
                <TableCaption className={""}>
                  A list of customers with outstanding credit balances.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    {/* <TableHead>Address</TableHead> */}
                    <TableHead>Created On</TableHead>
                    <TableHead className="text-right flex flex-row justify-end items-center">
                      <button
                        onClick={handleSort}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Amount Owed
                        {sortOrder === "asc" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData && sortedData.length > 0 ? (
                    sortedData.map((item, index) => (
                      <TableRow
                        key={index}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => handleRowClick(item)}
                      >
                        <TableCell>{item?.firstName || "N/A"}</TableCell>
                        <TableCell>{item?.lastName || "N/A"}</TableCell>
                        <TableCell>{item?.email || "N/A"}</TableCell>
                        <TableCell>{item?.mobile || "N/A"}</TableCell>
                        {/* <TableCell>{item?.address || "N/A"}</TableCell> */}
                        <TableCell>
                          {formatCreatedAt(item?.createdAt)}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          {formatCurrency(item?.customerOwesCompany || 0)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground py-8"
                      >
                        No customers with outstanding balances found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Customer Detail Modal */}
        <CustomerDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          customer={selectedCustomer}
          onSettlementSuccess={() => {
            // Refresh customer balances - this will trigger the useEffect to update selectedCustomer
            const params = {};
            if (filters.firstName) params.firstName = filters.firstName;
            if (filters.lastName) params.lastName = filters.lastName;
            if (filters.email) params.email = filters.email;
            if (filters.mobile) params.mobile = filters.mobile;
            fetchCustomerBalances(params);
          }}
        />
      </div>
    </BreadcrumbProvider>
  );
}
