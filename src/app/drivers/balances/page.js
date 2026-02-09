'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CreateButton from '@/components/common/buttons/CreateButton';
import EditButton from '@/components/common/buttons/EditButton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useDrivers from '@/hooks/drivers/useDrivers';
import { DriverModal } from '../DriverModal';
import StatusBadge from '@/components/common/badges/StatusBadge';
import SearchInput from '@/components/common/inputs/SearchInput';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReferenceLink from '@/components/common/ReferenceLink';
import { Button } from '@/components/ui/button';
import { SettleDriverBalanceModal } from './SettleDriverBalanceModal';


export default function Page() {

  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
const { fetchDriversWithBalance, driversWithBalance, isLoading } = useDrivers();
    const [filters, setFilters] = useState({});
    const [settleOpen, setSettleOpen] = useState(false);

  useEffect(() => {
    if(filters){
      fetchDriversWithBalance(filters);
    } else {
      fetchDriversWithBalance();
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


  return (
    <BreadcrumbProvider value={[
      { label: "Drivers with Balances", href: null},
    ]}>
      
      <div className='flex flex-col md:flex-row gap-4 lg:justify-between '>
        <div className='w-full lg:w-1/4'>
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
     <div className="flex w-auto h-auto flex-col gap-6">
        <Card>
          <CardContent>
            <Table>
              <TableCaption className={""}>A list of your recent drivers with balances.</TableCaption>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[200px]">Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="hidden lg:table-cell">Address</TableHead>
                  <TableHead className="hidden md:table-cell">License No</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Driver Owes</TableHead>
                  <TableHead className="text-right">Company Owes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
      <TableBody>
        {driversWithBalance?.map((item, index) => (
          <TableRow key={index} className="hover:bg-muted/30">
            <TableCell className="font-medium">
              <div className="flex flex-col">
                {/* <ReferenceLink path={`/drivers/${item?._id}`} className="font-bold"> */}
                  {item?.firstName} {item?.lastName}
                {/* </ReferenceLink> */}
                <span className="text-xs text-muted-foreground">@{item?.userName}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col text-xs">
                <span>{item?.mobile}</span>
                <span className="text-muted-foreground">{item?.email}</span>
              </div>
            </TableCell>
            <TableCell className="hidden lg:table-cell text-xs max-w-[200px] truncate">
              {item?.address}
            </TableCell>
            <TableCell className="hidden md:table-cell text-xs">{item?.licenseNumber}</TableCell>
            <TableCell>
              <StatusBadge>{item?.onlineStatus ? "Online" : "Offline"}</StatusBadge>
            </TableCell>
            <TableCell className="text-right font-semibold text-red-600">
               {item?.driverOwesCompany ? `LKR ${item.driverOwesCompany.toLocaleString()}` : "LKR 0"}
            </TableCell>
            <TableCell className="text-right font-semibold text-green-600">
               {item?.companyOwesDriver ? `LKR ${item.companyOwesDriver.toLocaleString()}` : "LKR 0"}
            </TableCell>
                <TableCell className="text-right gap-2 flex items-center justify-end pl-10">
                    <SettleDriverBalanceModal
                        isOpen={settleOpen}
                        setIsOpen={setSettleOpen}
                        selectedItem={item}
                        fetchDrivers={fetchDriversWithBalance}
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
          <DriverModal
            sheetOpen={sheetOpen}
            isNewItem={isNewItem}
            selectedItem={selectedItem}
            setSheetOpen={setSheetOpen}
            fetchDrivers={fetchDriversWithBalance}
          />
        </div>
        <div className="fixed bottom-6 right-6 z-40 md:hidden">
          <CreateButton 
            className="shadow-2xl h-14 w-14 rounded-full p-0 flex items-center justify-center border-none"
            onClick={handleCreate}
          />
        </div>
        </div>
    </BreadcrumbProvider>
  )
}
