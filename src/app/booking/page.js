'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { DataTable } from './DataTable';
import { Card, CardContent } from '@/components/ui/card';
import CreateButton from '@/components/common/buttons/CreateButton';
import { BookingForm } from './BookingForm';
import TextInput from '@/components/common/inputs/TextInput';
import useBookings from '@/hooks/booking/useBookings';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmModal';

const tabs = ["pending", "inProgress", "scheduled", "completed"]

export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchBookings, bookings, isLoading, onDelete } = useBookings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
    useEffect(() => {
      fetchBookings();
    }, [])

  const handleCreate = () => {
    setIsNewItem(true);
    setSheetOpen(true);
  }

   const handleEdit = (item) => {
    setSheetOpen(true);
    setSelectedItem(item);
    setIsNewItem(false);
   }
  
    const handleDelete = (item) => {
    setIsDeleteModalOpen(true);
    setDeleteItem(item);
    }
  
  const onSuccess = () => {
    setIsDeleteModalOpen(false);
    fetchBookings();
  }
  
  // console.log('bookings :', bookings);

  return (
    <BreadcrumbProvider value={[
      { label: "Dashboard", href: "/dashboard"},
      { label: "Booking", href: "/booking" },
    ]}>
      <div className="flex w-auto h-auto flex-col gap-6 p-6">
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-4'>
          <TextInput placeholder="Search" readOnly/>
          <div className='col-span-3 lg:block hidden'></div>
          <TextInput placeholder="Date Range" readOnly/>
        </div>
        <div className='w-full flex justify-end'>
           <CreateButton onClick={handleCreate}/>
       </div>
                  <DataTable
                      items={bookings}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                  />
      </div>
      <BookingForm
        fetchBookings={fetchBookings}
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}

        setSheetOpen={setSheetOpen}
      />
      <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => onDelete(deleteItem?._id, onSuccess)}
        />
    </BreadcrumbProvider>
  )
}
