'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { DataTable } from './DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { capitalizeWords } from '@/constants/CapitalizedWord';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import CreateButton from '@/components/common/buttons/CreateButton';
import { Input } from '@/components/ui/input';
import { BookingForm } from './BookingForm';
import TextInput from '@/components/common/inputs/TextInput';
import useBookings from '@/hooks/booking/useBookings';




const tabs = ["pending", "inProgress", "scheduled", "completed"]



export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchBookings, bookings, isLoading } = useBookings();
  
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
    setIsModalOpen(true);
    setDeleteItem(item);
    }
  
  const handleClose = () => {
    setSheetOpen(false);
    setErrors({});
  };

  
  console.log('bookings :', bookings);

  return (
    <BreadcrumbProvider value={[
      { label: "Dashboard", href: "/dashboard"},
      { label: "Booking", href: "/booking" },
    ]}>
      <div className="flex w-full flex-col gap-6">
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-4'>
          <TextInput placeholder="Search" readOnly/>
          <div className='col-span-3 lg:block hidden'></div>
          <TextInput placeholder="Date Range" readOnly/>
        </div>
        <div className='w-full flex justify-end'>
           <CreateButton onClick={handleCreate} />
       </div>
         <Card>
                <CardContent>
                  <DataTable
                      items={bookings}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                  />
                </CardContent>
              </Card>
      </div>
      <BookingForm
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}
        handleClose={handleClose}
        setSheetOpen={setSheetOpen}
      />
    </BreadcrumbProvider>
  )
}
