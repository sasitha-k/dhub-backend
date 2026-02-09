
'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useCustomer from '@/hooks/customers/useCustomer';
import CreateButton from '@/components/common/buttons/CreateButton';
import EditButton from '@/components/common/buttons/EditButton';
import SearchInput from '@/components/common/inputs/SearchInput';
import StatusBadge from '@/components/common/badges/StatusBadge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerModal } from '../CustomerModal';
import { CustomerBalanceSettleModal } from './CustomerBalanceSettleModal';


export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchCustomersWithBalance, customersWithBalance, isLoading } = useCustomer();
    const [filters, setFilters] = useState({});
    const [settleOpen, setSettleOpen] = useState(false);

  useEffect(() => {
    if (filters) {
      fetchCustomersWithBalance(filters);
    } else {
      fetchCustomersWithBalance();
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
        <Tabs defaultValue={"all"} value={filters?.onlineStatus} onValueChange={(e) => setFilters({...filters, onlineStatus: e})} className="">
        <TabsList className="">
          <TabsTrigger value="all" >All</TabsTrigger>
            <TabsTrigger value="true" >Online</TabsTrigger>
            <TabsTrigger value="false" >Offline</TabsTrigger>
          </TabsList>
        </Tabs>
              <Card>
                <CardContent className={"overflow-x-auto"}>
                  <Table>
      <TableCaption className={""}>A list of your recent customers with balances.</TableCaption>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-[200px]">Customer</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>License No</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="text-right">Customer Owes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customersWithBalance?.map((item, index) => (
          <TableRow key={index} className="hover:bg-muted/30">
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span className="font-bold">{item?.firstName} {item?.lastName}</span>
                <span className="text-xs text-muted-foreground">@{item?.userName}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col text-xs">
                <span>{item?.mobile}</span>
                <span className="text-muted-foreground">{item?.email}</span>
              </div>
            </TableCell>
            <TableCell className="text-xs max-w-[200px] truncate">
              {item?.address}
            </TableCell>
            <TableCell className="text-xs">{item?.licenseNumber}</TableCell>
            <TableCell className="text-xs">
              <StatusBadge>{item?.onlineStatus === false ? "Offline" : "Online"}</StatusBadge>
            </TableCell>
            <TableCell className="text-right font-semibold text-red-600">
               {item?.customerOwesCompany ? `LKR ${item.customerOwesCompany.toLocaleString()}` : "LKR 0"}
            </TableCell>
            
             <TableCell className="text-right gap-2 flex justify-end items-center pl-10">
                                <CustomerBalanceSettleModal
                                    isOpen={settleOpen}
                                    setIsOpen={setSettleOpen}
                                    selectedItem={item}
                                    fetchCustomers={fetchCustomersWithBalance}
                                />
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
          fetchCustomers={fetchCustomersWithBalance}
          handleClose={handleClose}
      />
      </div>
        </div>
    </BreadcrumbProvider>
  )
}
