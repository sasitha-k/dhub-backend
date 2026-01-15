'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider';
import React, { useEffect, useState, useMemo } from 'react';
import CreateButton from '@/components/common/buttons/CreateButton';
import useBookings from '@/hooks/booking/useBookings';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmModal';
import SearchFilter from '@/components/common/filters/SearchFilter';
import { BookingModal } from './BookingModal';
import EditButton from '@/components/common/buttons/EditButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/common/badges/StatusBadge';
import ReferenceLink from '@/components/common/ReferenceLink';
import { Card, CardContent } from '@/components/ui/card';
import moment from 'moment';
import { formatter } from '@/constants/formatNumber';
import StatusPicker from '@/components/common/dropdown/StatusPicker';
import DatePickerLine from '@/components/common/DatePickerLine';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchBookings, bookings, isLoading, onDelete, findBooking, booking } = useBookings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState("day_time");

  useEffect(() => {
    if (filters) {
      fetchBookings(filters)
    } else {
      fetchBookings();
    }
  },[fetchBookings, filters]);

  // console.log("bookings", bookings);

  const handleCreateDayTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("day_time")
  }

   const handleCreateNightTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("night_time")
  }

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


  return (
    <BreadcrumbProvider
      value={[
        // { label: "Dashboard", href: "/dashboard" },
        { label: "Bookings", href: "/booking" },
      ]}
    >
      <div className="relative pb-20 flex h-auto flex-col gap-6 p-4 md:max-w-[92%] lg:max-w-[94%] xl:max-w-[99%] 2xl:max-w-[99%] 3xl:max-w-[100%]">
        {/* 🔹 Header Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full sm:w-[30%] flex gap-2 items-center">
            <StatusPicker
              value={filters?.status}
              onChange={(e) => setFilters({...filters, status: e})}
            />
            <DatePickerLine
              value={filters?.date}
              onChange={(e) => setFilters({...filters, date: e})}
            />
          </div>
          {/* Right Side: Search & Create */}
          <div className="flex gap-4 flex-row sm:items-center justify-between">
            {/* Search */}
            <div className="w-full sm:w-72">
              <SearchFilter
                data={bookings}
                filterKeys={["bookingId", "customer.firstName", "customer.lastName", "customer.mobile"]}
                filters={filters}
                setFilters={setFilters}
                onFilter={setFiltered}
                placeholder="Search by ID"
                data-id="search"
              />
            </div>

            {/* Create Button */}

          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="day_time" className="data-[state=active]:bg-[#FFE8A3] data-[state=active]:text-[#4B0082]">Day Time</TabsTrigger>
            <TabsTrigger value="night_time" className="data-[state=active]:bg-[#4B0082] data-[state=active]:text-[#FFE8A3]">Night Time</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 🔹 Table */}
        <Card className="overflow-x-auto p-0 max-h-[calc(100vh-200px)]">
          <CardContent className={"p-0"}>
              <Table className="">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className={"min-w-[100px]"}>
                    Booking Id <br/> & Date Time
              </TableHead>
              <TableHead>
                     Customer & Driver
              </TableHead>
              <TableHead >Package & <br/> Description</TableHead>
              <TableHead >Location</TableHead>
              <TableHead >Trip Duration</TableHead>
              <TableHead >Odo Meter</TableHead>
              <TableHead >Booking Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead >Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.length < 1 ? (
              <TableRow>
                <TableCell colSpan={14} className="h-24 text-center">
                  No records available.
                </TableCell>
              </TableRow>
            ) : (
              filtered?.map((item, index) => (
              <TableRow key={index}>
                  <TableCell className="font-normal grid gap-1">
                    <ReferenceLink path={`/booking/${item?._id}`} >{item?.bookingId}</ReferenceLink>
                    <span>{item?.date}{" "}</span>
                    <span>{item?.time}</span>
                </TableCell>
                <TableCell>
                    <div className="flex flex-col">
                        <span className="font-semibold ">Customer : {item?.customerName || "N/A"}</span>
                      <span className="text-xs text-muted-foreground"> {item?.customerNumber}</span>
                      <span className="font-semibold mt-1">Driver : {item?.driverName || "N/A"}</span>
                    </div>
                </TableCell>
                  <TableCell>
                    <span className='grid gap-1'>
                      <span className='w-40 truncate'>{item?.selectedPackage?.packageName || "N/A"}</span>
                    <span>{item?.description || "N/A"}</span></span>
                  </TableCell>
              
                  <TableCell title={item?.pickupLocation}>
                    <span className="grid gap-1">
                       <span>Pick Up : {item?.pickupLocation || "N/A"}</span>
                    <span>From : {item?.from || "N/A"}</span>
                    <span>Drop : {item?.to || "N/A"}</span>
                    </span>
                  </TableCell>
                <TableCell className={"text-xs"}>
                  <span className="grid gap-1">
                    <span>Start : {item?.tripStartAt ? moment(item.tripStartAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span>End : {item?.tripEndAt ? moment(item.tripEndAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span className="font-semibold">
                        Duration : {item?.meta?.totalHours ? `${parseFloat(item.meta.totalHours).toFixed(2)} hrs` : 
                        (item?.tripStartAt && item?.tripEndAt ? `${moment(item.tripEndAt).diff(moment(item.tripStartAt), 'hours', true).toFixed(2)} hrs` : "N/A")}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="">
                  <span className="grid gap-1">
                    <span>Odo Start : {item.odoStart || "N/A"}</span>
                    <span>Odo End : {item.odoEnd || "N/A"}</span>
                  </span>
                </TableCell>
                  <TableCell className="font-semibold text-sm">
                  {formatter.format(item?.fee)}
                </TableCell>
                <TableCell>
                  <StatusBadge>{item?.status}</StatusBadge>
                </TableCell>
                <TableCell>
                  {(item?.status === "pending" || item?.status === "ongoing") && (
                     <EditButton
                      onClick={() => {
                          handleEdit(item);
                      }}data-id="edit"
                      />
                    )}
                  {/* <DeleteButton
                    onClick={() => {
                      handleDelete(item)
                    }}data-id="delete"
                  ></DeleteButton> */}
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="fixed bottom-4 right-6 z-50">
          {activeTab === "day_time" ? (
            <CreateButton
              className="bg-[#FFE8A3] hover:text-[#FFE8A3] text-[#4B0082]"
              onClick={handleCreateDayTime}>Create Day Time Booking</CreateButton>
          ) :
            (
              <CreateButton
                className="bg-[#4B0082] text-[#FFE8A3]"
                onClick={handleCreateNightTime}>Create Night Time Booking</CreateButton>
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
