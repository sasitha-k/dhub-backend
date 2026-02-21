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
import useDriverBalances from "@/hooks/drivers/useDriverBalances";
import TextInput from "@/components/common/inputs/TextInput";
import { formatter } from "@/constants/formatNumber";
import { ArrowUp, ArrowDown } from "lucide-react";
import moment from "moment";
import SearchableDropdown from "@/components/common/dropdown/SearchableDropDown";
import { AddExpenseModal } from "./AddExpenseModal";

export default function Page() {
  const { fetchDriverBalances, driverBalances, isLoading } =
    useDriverBalances();
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    onlineStatus: "all",
    isDriverInBooking: "all",
  });
  const [activeSort, setActiveSort] = useState("companyBalance"); // 'companyBalance' or 'recentlyActive'
  const [sortValue, setSortValue] = useState(1); // 1 for sort

  useEffect(() => {
    // Build query params object, only including non-empty values
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.onlineStatus && filters.onlineStatus !== "all")
      params.onlineStatus = filters.onlineStatus;

    // Add isDriverInBooking parameter only if not "all"
    if (filters.isDriverInBooking && filters.isDriverInBooking !== "all") {
      params.isDriverInBooking = filters.isDriverInBooking === "true";
    }

    // Add sort parameter based on active sort
    if (activeSort === "companyBalance") {
      params.companyBalance = sortValue;
    } else if (activeSort === "recentlyActive") {
      params.recentlyActive = sortValue;
    }

    fetchDriverBalances(params);
  }, [fetchDriverBalances, filters, activeSort, sortValue]);

  let filtered = driverBalances?.drivers || driverBalances || [];

  // After refetch (e.g. after adding expense), update selectedDriver so modal shows fresh driver data
  useEffect(() => {
    if (selectedDriver?._id && filtered?.length) {
      const updated = filtered.find((d) => d._id === selectedDriver._id);
      if (updated) {
        setSelectedDriver(updated);
      }
    }
  }, [filtered]);

  // Calculate totals for company balance
  const balanceTotals = React.useMemo(() => {
    if (!filtered || filtered.length === 0) {
      return {
        companyOwesDrivers: 0,
        driversOweCompany: 0,
      };
    }

    const companyOwesDrivers = filtered.reduce((sum, driver) => {
      const balance = driver?.companyBalance || 0;
      return sum + (balance < 0 ? Math.abs(balance) : 0);
    }, 0);

    const driversOweCompany = filtered.reduce((sum, driver) => {
      const balance = driver?.companyBalance || 0;
      return sum + (balance > 0 ? balance : 0);
    }, 0);

    return {
      companyOwesDrivers,
      driversOweCompany,
    };
  }, [filtered]);

  // Format currency with Sri Lankan Rupee symbol (Rs.)
  const formatCurrency = (amount) => {
    return `Rs. ${formatter.format(amount || 0)}`;
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
        <span className="text-xs text-green-800 dark:text-green-800">
          {timeElapsed}
        </span>
      </div>
    );
  };

  // Toggle sort for companyBalance
  const handleCompanyBalanceSort = () => {
    if (activeSort === "companyBalance") {
      // Toggle between 1 and -1 (or 0 to disable)
      setSortValue((prev) => (prev === 1 ? -1 : 1));
    } else {
      setActiveSort("companyBalance");
      setSortValue(1);
    }
  };

  // Toggle sort for recentlyActive
  const handleRecentlyActiveSort = () => {
    if (activeSort === "recentlyActive") {
      // Toggle between 1 and -1 (or 0 to disable)
      setSortValue((prev) => (prev === 1 ? -1 : 1));
    } else {
      setActiveSort("recentlyActive");
      setSortValue(1);
    }
  };

  const openExpenseModal = (driver) => {
    setSelectedDriver(driver);
    setExpenseModalOpen(true);
  };

  const closeExpenseModal = () => {
    setExpenseModalOpen(false);
    setSelectedDriver(null);
  };

  const refetchBalances = () => {
    const params = {};
    if (filters.name) params.name = filters.name;
    if (filters.onlineStatus && filters.onlineStatus !== "all")
      params.onlineStatus = filters.onlineStatus;
    if (filters.isDriverInBooking && filters.isDriverInBooking !== "all") {
      params.isDriverInBooking = filters.isDriverInBooking === "true";
    }
    if (activeSort === "companyBalance") {
      params.companyBalance = sortValue;
    } else if (activeSort === "recentlyActive") {
      params.recentlyActive = sortValue;
    }
    fetchDriverBalances(params);
  };

  return (
    <BreadcrumbProvider value={[{ label: "Driver Balances", href: null }]}>
      <div className="flex w-auto h-auto flex-col gap-6 p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Drivers Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Total Drivers
                </p>
                <p className="text-2xl font-bold">{filtered?.length || 0}</p>
                <p className="text-xs text-muted-foreground">
                  Total number of drivers
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Owes Drivers Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Company Owes Drivers
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(balanceTotals.companyOwesDrivers)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total amount company needs to pay
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Drivers Owe Company Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Drivers Owe Company
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(balanceTotals.driversOweCompany)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total amount drivers need to pay
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Name
                </label>
                <TextInput
                  placeholder="Search by name"
                  value={filters.name || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, name: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Online Status
                </label>
                <SearchableDropdown
                  options={[
                    { id: 1, label: "Online", value: "true" },
                    { id: 2, label: "Offline", value: "false" },
                    { id: 3, label: "All", value: "all" },
                  ]}
                  value={filters.onlineStatus || "all"}
                  onChange={(value) =>
                    setFilters({ ...filters, onlineStatus: value })
                  }
                  labelKey="label"
                  valueKey="value"
                  placeholder="Select online status"
                  searchPlaceholder="Search by status.."
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Driver Status
                </label>
                <SearchableDropdown
                  options={[
                    { id: 1, label: "In Progress", value: "true" },
                    { id: 2, label: "Available", value: "false" },
                    { id: 3, label: "All", value: "all" },
                  ]}
                  value={filters.isDriverInBooking || "all"}
                  onChange={(value) =>
                    setFilters({ ...filters, isDriverInBooking: value })
                  }
                  labelKey="label"
                  valueKey="value"
                  placeholder="Select driver status"
                  searchPlaceholder="Search by status.."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Balances Table */}
        <Card>
          <CardContent className={"overflow-x-auto"}>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-muted-foreground text-sm">
                    Loading driver balances...
                  </p>
                </div>
              </div>
            ) : (
              <Table>
                <TableCaption className={""}>
                  A list of drivers with company balances.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Online Status</TableHead>
                    <TableHead>In Booking</TableHead>
                    <TableHead>
                      <button
                        onClick={handleRecentlyActiveSort}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                      >
                        Recently Active
                        {activeSort === "recentlyActive" &&
                          (sortValue === 1 ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          ))}
                      </button>
                    </TableHead>
                    <TableHead className="text-right">
                      <button
                        onClick={handleCompanyBalanceSort}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-auto font-medium"
                      >
                        Company Balance
                        {activeSort === "companyBalance" &&
                          (sortValue === 1 ? (
                            <ArrowUp className="w-4 h-4" />
                          ) : (
                            <ArrowDown className="w-4 h-4" />
                          ))}
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered && filtered.length > 0 ? (
                    filtered.map((item, index) => (
                          <TableRow
                            key={index}
                            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-14 cursor-pointer"
                            onClick={() => openExpenseModal(item)}
                          >
                            <TableCell>{item?.firstName || "N/A"}</TableCell>
                            <TableCell>{item?.lastName || "N/A"}</TableCell>
                            <TableCell>{item?.email || "N/A"}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  item?.onlineStatus
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {item?.onlineStatus ? "Online" : "Offline"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  item?.isDriverInBookings
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {item?.isDriverInBookings
                                  ? "In Progress"
                                  : "Available"}
                              </span>
                            </TableCell>
                            <TableCell>
                              {formatCreatedAt(item?.updatedAt)}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {formatCurrency(item?.companyBalance || 0)}
                            </TableCell>
                          </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground py-8"
                      >
                        No drivers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <AddExpenseModal
          isOpen={expenseModalOpen}
          onClose={closeExpenseModal}
          driver={selectedDriver}
          onSuccess={refetchBalances}
        />
      </div>
    </BreadcrumbProvider>
  );
}
