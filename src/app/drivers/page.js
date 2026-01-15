'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import TextInput from '@/components/common/inputs/TextInput';
import CreateButton from '@/components/common/buttons/CreateButton';
import EditButton from '@/components/common/buttons/EditButton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useDrivers from '@/hooks/drivers/useDrivers';
import { DriverForm } from './DriverForm';
import { DriverModal } from './DriverModal';


export default function Page() {

  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchDrivers, drivers, isLoading } = useDrivers();

  useEffect(() => {
    fetchDrivers();
  }, [])

  const handleCreate = () => {
    setIsNewItem(true);
    setSheetOpen(true);
  }

  const handleEdit = (item) => {
    setIsNewItem(false);
    setSheetOpen(true);
    setSelectedItem(item);
  }

   const handleClose = () => {
    setSheetOpen(false);
  }

  return (
    <BreadcrumbProvider value={[
                  // { label: "Dashboard", href: "/dashboard" },
                  { label: "Drivers", href: null},
                ]}>
     <div className="flex w-auto h-auto flex-col gap-6 p-4">
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-4'>
          <TextInput placeholder="Search" readOnly/>
          <div className='col-span-3 lg:block hidden'></div>
          <TextInput placeholder="Date Range" readOnly/>
        </div>
        <div className='w-full flex justify-end'>
           <CreateButton onClick={handleCreate}/>
       </div>
              <Card>
                <CardContent>
                  <Table>
      <TableCaption className={""}>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers?.map((item, index) => (
          <TableRow key={index} className={""}>
            <TableCell>{item?.firstName}</TableCell>
                <TableCell>{item?.lastName}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.mobile}</TableCell>
                <TableCell>{item?.licenseNumber}</TableCell>
            <TableCell>{item?.type}</TableCell>
             <TableCell className="flex gap-4">
                  <EditButton
                    onClick={() => {
                      handleEdit(item)
                    }}data-id="edit"
                  />
                  {/* <DeleteButton
                    onClick={() => {
                      handleDelete(item)
                    }}data-id="delete"
                  ></DeleteButton> */}
                </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
                </CardContent>
              </Card>
        <div className='w-full'>
          <DriverModal
          sheetOpen={sheetOpen}
          isNewItem={isNewItem}
          selectedItem={selectedItem}
          setSheetOpen={setSheetOpen}
          fetchDrivers={fetchDrivers}
          handleClose={handleClose}
      />
      </div>
        </div>
    </BreadcrumbProvider>
  )
}
