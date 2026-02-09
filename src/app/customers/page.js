
'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCustomer from '@/hooks/customers/useCustomer';
import CreateButton from '@/components/common/buttons/CreateButton';
import EditButton from '@/components/common/buttons/EditButton';
import { CustomerModal } from './CustomerModal';
import SearchInput from '@/components/common/inputs/SearchInput';


export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchCustomers, customers, isLoading } = useCustomer();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (filters) {
      fetchCustomers(filters);
    } else {
      fetchCustomers();
    }
  }, [filters])

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
                  { label: "Customers", href: null},
                ]}>
       <div className="flex w-auto h-auto flex-col gap-6 p-4">
        <div className='flex justify-between gap-4'>
          <div className='w-full md:w-1/2 lg:w-1/4'>
              <SearchInput
                       value={filters?.searchQuery}
                       onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                       placeholder={"Search by name"}
                     />
       </div>
           <CreateButton onClick={handleCreate}/>
       </div>
              <Card>
                <CardContent className={"overflow-x-auto"}>
                  <Table>
      <TableCaption className={""}>A list of your recent customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Address</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers?.map((item, index) => (
          <TableRow key={index} className={""}>
            <TableCell>{item?.firstName}</TableCell>
            <TableCell>{item?.lastName}</TableCell>
            <TableCell>{item?.email}</TableCell>
            <TableCell>{item?.mobile}</TableCell>
            <TableCell>{item?.address}</TableCell>
            {/* <TableCell>{item?.type}</TableCell> */}
            <TableCell className="flex gap-4">
                <EditButton
                    onClick={() => {
                      handleEdit(item)
                    }}data-id="edit"
                />
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
                </CardContent>
        </Card>
        <div className='w-full'>
          <CustomerModal
          sheetOpen={sheetOpen}
          isNewItem={isNewItem}
          selectedItem={selectedItem}
          setSheetOpen={setSheetOpen}
          fetchCustomers={fetchCustomers}
          handleClose={handleClose}
      />
      </div>
        </div>
    </BreadcrumbProvider>
  )
}
