'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider';
import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from './DataTable';
import CreateButton from '@/components/common/buttons/CreateButton';
import { BookingForm } from './BookingForm';
import useBookings from '@/hooks/booking/useBookings';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmModal';
import SearchFilter from '@/components/common/filters/SearchFilter';
import { Button } from '@/components/ui/button';
import { capitalizeWords } from '@/constants/CapitalizedWord';
import { BookingModal } from './BookingModal';
import EditButton from '@/components/common/buttons/EditButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/common/badges/StatusBadge';
import ReferenceLink from '@/components/common/ReferenceLink';
import { Card, CardContent } from '@/components/ui/card';
import moment from 'moment';
import { formatter } from '@/constants/formatNumber';

const tabs = ["pending", "ongoing", "completed"];

export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchBookings, bookings, isLoading, onDelete, findBooking, booking } = useBookings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchBookings({
      status: activeTab
    });
  },[fetchBookings, activeTab]);


  const handleCreate = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
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

  const tabs = ["pending", "ongoing", "completed"];

  const getTabCount = (status) => {
    return bookings?.filter((b) => b.status?.toLowerCase() === status.toLowerCase())?.length || 0;
  };

  return (
    <BreadcrumbProvider
      value={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Booking", href: "/booking" },
      ]}
    >
      <div className="flex h-auto flex-col gap-6 p-4">
        {/* 🔹 Header Controls */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs?.map((tab) => (
              <Button
                key={tab}
                variant={tab === activeTab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
              >
                {capitalizeWords(tab)} ({getTabCount(tab)})
              </Button>
            ))}
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
            <CreateButton onClick={handleCreate} />
          </div>
        </div>

        {/* 🔹 Table */}
        <Card>
          <CardContent className="w-full p-0">
            <div className="w-full max-h-[550px] sm:max-h-[500px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-full md:max-h-[600px] lg:max-h-[650px] xl:max-h-[700px] 2xl:max-h-[750px] overflow-x-auto overflow-y-auto">
              <Table className="w-full min-w-[800px]">
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
            {filtered?.length < 1 ? (
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
            </div>
          </CardContent>
          </Card>
      </div>

      {/* 🔹 Booking Form */}
      <BookingModal
        fetchBookings={fetchBookings}
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}
        handleClose={handleClose}
        setSheetOpen={setSheetOpen}
        findBooking={findBooking}
        booking={booking}
        setActiveTab={setActiveTab}
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
