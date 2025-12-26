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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
           <DataTable
          items={filtered}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isLoading={isLoading}
          handleStart={handleStart}
        />
      </div>

      {/* 🔹 Booking Form */}
      <BookingForm
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
