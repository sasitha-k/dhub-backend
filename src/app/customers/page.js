
'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import TextInput from '@/components/common/inputs/TextInput';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCustomer from '@/hooks/customers/useCustomer';
import { CustomerForm } from './CustomerForm';
import CreateButton from '@/components/common/buttons/CreateButton';
import EditButton from '@/components/common/buttons/EditButton';
import SearchFilter from '@/components/common/filters/SearchFilter';
import { CustomerModal } from './CustomerModal';


export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchCustomers, customers, isLoading } = useCustomer();
  const [filters, setFilters] = useState({});
  const [filtered, setFiltered] = useState(customers);

  useEffect(() => {
    fetchCustomers();
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
                  { label: "Customers", href: null},
                ]}>
       <div className="flex w-auto h-auto flex-col gap-6 p-4">
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-4'>
         <SearchFilter
                              data={customers}
                              filterKeys={["firstName", "lastName"]}
                              filters={filters}
                              setFilters={setFilters}
                              onFilter={setFiltered}
                              placeholder="Search by name"
                              data-id="search"
                            />
        </div>
        <div className='w-full flex justify-end'>
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
                  <TableHead>Type</TableHead>
                   <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered?.map((item, index) => (
          <TableRow key={index} className={""}>
            <TableCell>{item?.firstName}</TableCell>
            <TableCell>{item?.lastName}</TableCell>
            <TableCell>{item?.email}</TableCell>
            <TableCell>{item?.mobile}</TableCell>
            <TableCell>{item?.address}</TableCell>
            <TableCell>{item?.type}</TableCell>
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
