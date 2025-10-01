
'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import TextInput from '@/components/common/inputs/TextInput';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCustomer from '@/hooks/customers/useCustomer';


export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchCustomers, customers, isLoading } = useCustomer();

  useEffect(() => {
    fetchCustomers();
  }, [])

  const handleCreate = () => {
    setIsNewItem(true);
    setSheetOpen(true);
}

  return (
    <BreadcrumbProvider value={[
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Customers", href: null},
                ]}>
      <div className='space-y-4'>
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-4'>
          <TextInput placeholder="Search" readOnly/>
          <div className='col-span-3 lg:block hidden'></div>
          <TextInput placeholder="Date Range" readOnly/>
        </div>
              <Card>
                <CardContent>
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
                <TableCell>{item?.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
                </CardContent>
              </Card>
        </div>
    </BreadcrumbProvider>
  )
}
