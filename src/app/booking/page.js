'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider';
import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from './DataTable';
import CreateButton from '@/components/common/buttons/CreateButton';
import { BookingForm } from './BookingForm';
import TextInput from '@/components/common/inputs/TextInput';
import useBookings from '@/hooks/booking/useBookings';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { capitalizeWords } from '@/constants/CapitalizedWord';
import BookingStartModal from '@/components/modals/BookingStartModal';

const tabs = ["pending", "ongoing", "completed"];

export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchBookings, bookings, isLoading, onDelete } = useBookings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Filter bookings by status
  const filteredBookings = useMemo(() => {
    if (!bookings?.length) return [];
    return bookings.filter((b) => b.status?.toLowerCase() === activeTab.toLowerCase());
  }, [bookings, activeTab]);

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
    setIsModalOpen(true);
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
        { label: "Dashboard", href: "/dashboard" },
        { label: "Booking", href: "/booking" },
      ]}
    >
      <div className="flex w-auto h-auto flex-col gap-6 p-4">

        {/* 🔹 Filter / Search Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <TextInput placeholder="Search" readOnly />
          <div className="col-span-3 lg:block hidden"></div>
          <TextInput placeholder="Date Range" readOnly />
        </div>

        {/* 🔹 Tabs */}
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={tab === activeTab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
            >
              {capitalizeWords(tab)}
            </Button>
          ))}
        </div>

        {/* 🔹 Create Button */}
        <div className="w-full flex justify-end">
          <CreateButton onClick={handleCreate} />
        </div>

        {/* 🔹 Table */}
        <DataTable
          items={filteredBookings}
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
        setActiveTab={setActiveTab}
        handleEdit={handleEdit}
      />

      {/* 🔹 Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => onDelete(deleteItem?._id, onSuccess)}
      />
      <BookingStartModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItem={selectedItem}
      />
    </BreadcrumbProvider>
  );
}
