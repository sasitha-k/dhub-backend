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
import useDriverLeaves from "@/hooks/drivers/useDriverLeaves";
import TextInput from "@/components/common/inputs/TextInput";
import moment from "moment";
import DatePickerLine from "@/components/common/DatePickerLine";
import DriverPicker from "@/components/common/dropdown/driver/DriverPicker";

export default function Page() {
  const { fetchDriverLeaves, driverLeaves, isLoading } = useDriverLeaves();
  const [filters, setFilters] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    driver: "",
  });
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Build query params object, only including non-empty values
    const params = {};
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.driver) params.driver = filters.driver;

    fetchDriverLeaves(params);
  }, [fetchDriverLeaves, filters]);

  useEffect(() => {
    setFiltered(
      Array.isArray(driverLeaves.leavesForTheDay)
        ? driverLeaves.leavesForTheDay
        : [],
    );
  }, [driverLeaves]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return moment(date).format("MM-DD-YYYY");
  };

  // Format date and time
  const formatDateTime = (date) => {
    if (!date) return "N/A";
    return moment(date).format("MM-DD-YYYY HH:mm");
  };

  // Calculate total leaves count
  const totalLeaves = filtered?.length || 0;

  // Calculate number of unique drivers who applied leaves
  const uniqueDriversCount = React.useMemo(() => {
    if (!filtered || filtered.length === 0) return 0;
    const uniqueDriverIds = new Set();
    filtered.forEach((item) => {
      const driverId =
        item?.driverId?._id ||
        item?.driverId ||
        item?.driver?._id ||
        item?.driver;
      if (driverId) {
        uniqueDriverIds.add(driverId);
      }
    });
    return uniqueDriverIds.size;
  }, [filtered]);

  console.log({ driverLeaves });

  return (
    <BreadcrumbProvider value={[{ label: "Driver Leaves", href: null }]}>
      <div className="flex w-auto h-auto flex-col gap-6 p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Leaves Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Total Leaves
                </p>
                <p className="text-2xl font-bold">{totalLeaves}</p>
                <p className="text-xs text-muted-foreground">
                  Leaves in selected period
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Unique Drivers Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Drivers on Leave
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {uniqueDriversCount}
                </p>
                <p className="text-xs text-muted-foreground">
                  Number of different drivers
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
                  Start Date
                </label>
                <DatePickerLine
                  value={filters.startDate}
                  onChange={(date) =>
                    setFilters({ ...filters, startDate: date })
                  }
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  End Date
                </label>
                <DatePickerLine
                  value={filters.endDate}
                  onChange={(date) => setFilters({ ...filters, endDate: date })}
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Driver
                </label>
                <DriverPicker
                  value={filters.driver}
                  labelKey="firstName"
                  valueKey="_id"
                  onChange={(driverId) =>
                    setFilters({ ...filters, driver: driverId || "" })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Leaves Table */}
        <Card>
          <CardContent className={"overflow-x-auto"}>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-muted-foreground text-sm">
                    Loading driver leaves...
                  </p>
                </div>
              </div>
            ) : (
              <Table>
                <TableCaption className={""}>
                  A list of driver leaves in the selected period.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver Name</TableHead>
                    <TableHead>Leave Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className={"text-right"}>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered && filtered.length > 0 ? (
                    filtered.map((item, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-14"
                      >
                        <TableCell>
                          {item?.driverId?.firstName && item?.driverId?.lastName
                            ? `${item.driverId.firstName} ${item.driverId.lastName}`.trim()
                            : item?.driverId?.firstName ||
                              item?.driverName ||
                              "N/A"}
                        </TableCell>
                        <TableCell>
                          {formatDate(item?.leaveDate || item?.date)}
                        </TableCell>
                        <TableCell>
                          {item?.reason || item?.description || "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatDateTime(item?.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground py-8"
                      >
                        No leaves found for the selected period.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </BreadcrumbProvider>
  );
}
