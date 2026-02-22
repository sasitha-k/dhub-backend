"use client";

import { BreadcrumbProvider } from "@/hooks/providers/useBreadcrumbProvider";
import React, { useEffect, useState, useMemo } from "react";
import CreateButton from "@/components/common/buttons/CreateButton";
import useBookings from "@/hooks/booking/useBookings";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmModal";
import SearchFilter from "@/components/common/filters/SearchFilter";
import { BookingModal } from "./BookingModal";
import EditButton from "@/components/common/buttons/EditButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/common/badges/StatusBadge";
import ReferenceLink from "@/components/common/ReferenceLink";
import { Card, CardContent } from "@/components/ui/card";
import moment from "moment";
import { formatter } from "@/constants/formatNumber";
import StatusPicker from "@/components/common/dropdown/StatusPicker";
import DatePickerLine from "@/components/common/DatePickerLine";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchBookings, bookings, isLoading, onDelete, findBooking, booking } =
    useBookings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: moment().format("YYYY-MM-DD"),
  });
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("day");

  useEffect(() => {
    if (filters) {
      fetchBookings(filters);
    } else {
      fetchBookings();
    }
  }, [filters]);

  // Initialize filtered when bookings change and there's no search filter
  // (SearchFilter will handle updating filtered when there's a search)
  useEffect(() => {
    if (bookings && bookings.length > 0 && !filters?.search) {
      // Filter by activeTab only when there's no search
      const filteredByTab = bookings.filter((item) => {
        const packageCategory = item?.selectedPackage?.packageCategory;
        if (activeTab === "day") {
          return (
            packageCategory === "day_time" ||
            packageCategory === "day" ||
            !packageCategory
          );
        } else if (activeTab === "night") {
          return (
            packageCategory === "night_time" || packageCategory === "night"
          );
        }
        return true;
      });
      setFiltered(filteredByTab);
    } else if (bookings && bookings.length === 0) {
      setFiltered([]);
    }
  }, [bookings, activeTab, filters?.search]);

  // console.log("bookings", bookings);

  const handleCreateDayTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("day");
  };

  const handleCreateNightTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("night");
  };

  const handleEdit = (item) => {
    setSheetOpen(true);
    setSelectedItem(item);
    setIsNewItem(false);
  };

  const handleStart = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = (item) => {
    setIsDeleteModalOpen(true);
    setDeleteItem(item);
  };

  const onSuccess = () => {
    setIsDeleteModalOpen(false);
    fetchBookings();
  };

  const handleClose = () => {
    setSheetOpen(false);
  };

  // Calculate statistics from bookings
  const statistics = useMemo(() => {
    if (!bookings || bookings.length === 0) {
      return {
        pendingCount: 0,
        completedCount: 0,
        totalFee: 0,
      };
    }

    // Filter by active tab (day/night time)
    const filteredByTab = bookings.filter((item) => {
      const packageCategory = item?.selectedPackage?.packageCategory;
      if (activeTab === "day") {
        return packageCategory === "day_time" || packageCategory === "day";
      } else if (activeTab === "night") {
        return packageCategory === "night_time" || packageCategory === "night";
      }
      return true;
    });

    const pendingCount = filteredByTab.filter(
      (item) => item?.status === "pending",
    ).length;

    const completedCount = filteredByTab.filter(
      (item) => item?.status === "completed",
    ).length;

    const totalFee = filteredByTab.reduce((sum, item) => {
      return sum + (parseFloat(item?.fee) || 0);
    }, 0);

    return {
      pendingCount,
      completedCount,
      totalFee,
    };
  }, [bookings, activeTab]);

  return (
    <BreadcrumbProvider
      value={[
        // { label: "Dashboard", href: "/dashboard" },
        { label: "Bookings", href: "/booking" },
      ]}
    >
      <div className="relative pb-20 flex h-auto flex-col gap-6 p-4 md:max-w-[92%] lg:max-w-[94%] xl:max-w-[99%] 2xl:max-w-[99%] 3xl:max-w-[100%]">
        {/* 🔹 Tabs - Time Type Selection */}
        <div className="flex items-center justify-between gap-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger
                value="day"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:font-semibold transition-all duration-200 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-md"
              >
                ☀️ Day Time
              </TabsTrigger>
              <TabsTrigger
                value="night"
                className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:font-semibold transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-md"
              >
                🌙 Night Time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 🔹 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pending Bookings Card */}
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Bookings
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {statistics.pendingCount}
                </p>
                <p className="text-xs text-muted-foreground">
                  Bookings awaiting confirmation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Completed Bookings Card */}
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Bookings
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {statistics.completedCount}
                </p>
                <p className="text-xs text-muted-foreground">
                  Successfully completed trips
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Total Booking Fee Card */}
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Booking Fee
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatter.format(statistics.totalFee)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total revenue from bookings
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 🔹 Filters Section */}
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Status
                </label>
                <StatusPicker
                  value={filters?.status}
                  onChange={(e) => setFilters({ ...filters, status: e })}
                />
              </div>

              {/* Date Filter */}
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Date
                </label>
                <DatePickerLine
                  value={filters?.date}
                  onChange={(e) => setFilters({ ...filters, date: e })}
                />
              </div>

              {/* Search Filter - Full width on smaller screens, spans 2 columns on larger */}
              <div className="w-full sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Search
                </label>
                <SearchFilter
                  data={bookings}
                  activeTab={activeTab}
                  filterKeys={[
                    "bookingId",
                    "customer.firstName",
                    "customer.lastName",
                    "customer.mobile",
                  ]}
                  filters={filters}
                  setFilters={setFilters}
                  onFilter={setFiltered}
                  placeholder="Search by Booking ID, Customer Name, or Mobile"
                  data-id="search"
                />
              </div>

              {/* 🔹 Additional Filters - Add new filters here */}
              {/* Example structure for new filters:
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">Filter Label</label>
                <YourFilterComponent
                  value={filters?.filterKey}
                  onChange={(e) => setFilters({...filters, filterKey: e})}
                />
              </div>
              */}
            </div>
          </CardContent>
        </Card>

        {/* 🔹 Table */}
        <Card className="overflow-x-auto p-0 max-h-[calc(100vh-200px)]">
          <CardContent className={"p-0"}>
            <Table className="">
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead className={"min-w-[100px]"}>Booking Id</TableHead>
                  <TableHead className={"min-w-[100px]"}>Date Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Booking Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  // Use filtered data if available, otherwise filter bookings by activeTab
                  const displayData =
                    filtered && filtered.length > 0
                      ? filtered
                      : (bookings || []).filter((item) => {
                          const packageCategory =
                            item?.selectedPackage?.packageCategory;
                          if (activeTab === "day") {
                            return (
                              packageCategory === "day_time" ||
                              packageCategory === "day"
                            );
                          } else if (activeTab === "night") {
                            return (
                              packageCategory === "night_time" ||
                              packageCategory === "night"
                            );
                          }
                          return true;
                        });

                  if (displayData.length < 1) {
                    return (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No records available.
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return displayData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-normal">
                        <ReferenceLink path={`/booking/${item?._id}`}>
                          {item?.bookingId}
                        </ReferenceLink>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center gap-2">
                          <span className="font-semibold">
                            {moment(item?.date).format("DD-MM-YYYY")}{" "}
                          </span>
                          <span className="font-semibold">{item?.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold ">
                            {item?.customerName || "N/A"}
                          </span>
                          {/* <span className="text-xs text-muted-foreground">
                            {" "}
                            {item?.customerNumber}
                          </span> */}
                          {/* <span className="font-semibold mt-1">
                            Driver : {item?.driver?.firstName ?? ""}{" "}
                            {item?.driver.lastName ?? ""}
                          </span> */}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {/* <span className="font-semibold ">
                            Customer : {item?.customerName || "N/A"}
                          </span> */}
                          <span className="font-semibold mt-1">
                            {item?.driver?.firstName ?? ""}{" "}
                            {item?.driver.lastName ?? ""}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="grid gap-1">
                          {activeTab === "day" ? (
                            <span className="w-40 truncate font-semibold text-amber-500">
                              {item?.selectedPackage?.packageName || "N/A"}
                            </span>
                          ) : (
                            <span className="w-40 truncate font-semibold text-indigo-700">
                              {item?.selectedPackage?.packageName || "N/A"}
                            </span>
                          )}
                        </span>
                      </TableCell>

                      <TableCell title={item?.pickupLocation}>
                        <span className="grid gap-1">
                          {/* <span>Pick Up : {item?.pickupLocation || "N/A"}</span> */}
                          <span>From : {item?.from || "N/A"}</span>
                          <span>Drop : {item?.to || "N/A"}</span>
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-sm">
                        {formatter.format(item?.fee)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge>{item?.status}</StatusBadge>
                      </TableCell>
                      <TableCell>
                        {(item?.status === "pending" ||
                          item?.status === "ongoing") && (
                          <EditButton
                            onClick={() => {
                              handleEdit(item);
                            }}
                            data-id="edit"
                          />
                        )}
                        {/* <DeleteButton
                    onClick={() => {
                      handleDelete(item)
                    }}data-id="delete"
                  ></DeleteButton> */}
                      </TableCell>
                    </TableRow>
                  ));
                })()}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="fixed bottom-4 right-6 z-50">
          {activeTab === "day" ? (
            <CreateButton
              className="bg-amber-500 hover:text-[#FFE8A3] text-[#ffffff]"
              onClick={handleCreateDayTime}
            >
              Create Day Time Booking
            </CreateButton>
          ) : (
            <CreateButton
              className="bg-indigo-700 text-[#ffffff]"
              onClick={handleCreateNightTime}
            >
              Create Night Time Booking
            </CreateButton>
          )}
        </div>
      </div>
      {/* 🔹 Booking Form */}
      <BookingModal
        activeTab={activeTab}
        fetchBookings={fetchBookings}
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}
        handleClose={handleClose}
        setSheetOpen={setSheetOpen}
        findBooking={findBooking}
        booking={booking}
      />

      {/* 🔹 Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => onDelete(deleteItem?._id, onSuccess)}
      />
    </BreadcrumbProvider>
  );
}
