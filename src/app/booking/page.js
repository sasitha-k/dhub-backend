'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState, useMemo } from 'react';
import CreateButton from '@/components/common/buttons/CreateButton';
import useBookings from '@/hooks/booking/useBookings';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmModal';
import { BookingModal } from './BookingModal';
import EditButton from '@/components/common/buttons/EditButton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/common/badges/StatusBadge';
import ReferenceLink from '@/components/common/ReferenceLink';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import moment from 'moment';
import { formatter } from '@/constants/formatNumber';
import StatusPicker from '@/components/common/dropdown/StatusPicker';
import DatePickerLine from '@/components/common/DatePickerLine';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchInput from '@/components/common/inputs/SearchInput';
import CustomerPicker from '@/components/common/dropdown/customer/CustomerPicker';
import DriverPicker from '@/components/common/dropdown/driver/DriverPicker';
import PaymentMethodPicker from '@/components/common/dropdown/PaymentMethodPicker';
import FormGroup from '@/components/common/FormGroup';
import { Label } from '@/components/ui/label';
import { Funnel } from 'lucide-react';


export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchBookings, bookings, isLoading, onDelete, findBooking, booking } = useBookings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [activeTab, setActiveTab] = useState("day");

  useEffect(() => {
    if (activeTab || filters?.status) {
      fetchBookings({
        ...filters,
        packageCategory: activeTab
      })
    } else {
      fetchBookings();
    }
  },[activeTab, filters]);

  // console.log("bookings", bookings);

  const handleCreateDayTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("day")
  }

   const handleCreateNightTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("night")
  }

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


  return (
    <BreadcrumbProvider
      value={[
        { label: "Bookings", href: "/booking" },
      ]}
    >
      <div className="relative pb-20 flex h-auto flex-col gap-6 p-2 sm:p-4 w-full">
        {/* 🔹 Header Controls */}
          <Card>
            <CardHeader>
              <h1 className='flex gap-2'>
                <Funnel />Filters
              </h1>
            </CardHeader>
           <CardContent className="w-full flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <FormGroup>
              <Label>Date</Label>
               <DatePickerLine
              value={filters?.date}
              onChange={(e) => setFilters({...filters, date: e})}
            />
            </FormGroup>
             <FormGroup>
              <Label>Status</Label>
             <StatusPicker
              value={filters?.status}
              onChange={(e) => setFilters({...filters, status: e})}
            />
            </FormGroup>
            <FormGroup>
              <Label>Customer</Label>
            <CustomerPicker
              valueKey={'_id'}
              value={filters?.customer}
              onChange={(e) => setFilters({...filters, customer: e})}
            />
            </FormGroup>
            <FormGroup>
              <Label>Driver</Label>
             <DriverPicker
              valueKey={'_id'}
              value={filters?.driver}
              onChange={(e) => setFilters({...filters, driver: e})}
            />
            </FormGroup>
            <FormGroup>
              <Label>Payment Method</Label>
             <PaymentMethodPicker
              value={filters?.paymentMethod}
              onChange={(e) => setFilters({...filters, paymentMethod: e})}
            />
              </FormGroup>
            </CardContent>  
          </Card>
        <div className='flex flex-col md:flex-row gap-4'>
           <Tabs value={activeTab} onValueChange={setActiveTab} className="">
          <TabsList className="">
            <TabsTrigger value="day" className="flex-1 sm:flex-none data-[state=active]:bg-[#FFE8A3] data-[state=active]:text-[#4B0082]">Day Time</TabsTrigger>
            <TabsTrigger value="night" className="flex-1 sm:flex-none data-[state=active]:bg-[#4B0082] data-[state=active]:text-[#FFE8A3]">Night Time</TabsTrigger>
          </TabsList>
        </Tabs>
          <div className='w-full lg:w-1/4'>
            <SearchInput
                value={filters?.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                placeholder={"Search by ID"}
              />
      </div>
       </div>
        {/* 🔹 Table */}
        <Card className="overflow-x-auto p-0 max-h-[calc(100vh-200px)]">
          <CardContent className={"p-0"}>
              <Table className="">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className={"min-w-[100px]"}>
                    Booking Id <br/> & Date Time
              </TableHead>
              <TableHead>
                     Customer & Driver
              </TableHead>
              <TableHead >Package & <br/> Description</TableHead>
              <TableHead >Location</TableHead>
              <TableHead >Trip Duration</TableHead>
              <TableHead >Odo Meter</TableHead>
              <TableHead >Booking Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead >Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings?.length < 1 ? (
              <TableRow>
                <TableCell colSpan={14} className="h-24 text-center">
                  No records available.
                </TableCell>
              </TableRow>
            ) : (
              bookings?.map((item, index) => (
              <TableRow key={index}>
                  <TableCell className="font-normal grid gap-1">
                    <ReferenceLink path={`/booking/${item?._id}`} >{item?.bookingId}</ReferenceLink>
                    <span>{moment(item?.date).format("DD-MM-YYYY")}{" "}</span>
                    <span>{item?.time}</span>
                </TableCell>
                <TableCell>
                    <div className="flex flex-col">
                        <span className="font-semibold ">Customer : {item?.customerName || "N/A"}</span>
                      <span className="text-xs text-muted-foreground"> {item?.customerNumber}</span>
                      <span className="font-semibold mt-1">Driver : {item?.driverName || "N/A"}</span>
                    </div>
                </TableCell>
                  <TableCell>
                    <span className='grid gap-1'>
                      <span className='w-40 truncate'>{item?.selectedPackage?.packageName || "N/A"}</span>
                       <span className='w-40 truncate capitalize'>{item?.selectedPackage?.packageCategory || "N/A"}</span>
                      <span>{item?.description || "N/A"}</span>
                    </span>
                  </TableCell>
              
                  <TableCell title={item?.pickupLocation}>
                    <span className="grid gap-1">
                       <span>Pick Up : {item?.pickupLocation || "N/A"}</span>
                    <span>From : {item?.from || "N/A"}</span>
                    <span>Drop : {item?.to || "N/A"}</span>
                    </span>
                  </TableCell>
                <TableCell className={"text-xs"}>
                  <span className="grid gap-1">
                    <span>Start : {item?.tripStartAt ? moment(item.tripStartAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span>End : {item?.tripEndAt ? moment(item.tripEndAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span className="font-semibold">
                        Duration : {item?.meta?.totalHours ? `${parseFloat(item.meta.totalHours).toFixed(2)} hrs` : 
                        (item?.tripStartAt && item?.tripEndAt ? `${moment(item.tripEndAt).diff(moment(item.tripStartAt), 'hours', true).toFixed(2)} hrs` : "N/A")}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="">
                  <span className="grid gap-1">
                    <span>Odo Start : {item.odoStart || "N/A"}</span>
                    <span>Odo End : {item.odoEnd || "N/A"}</span>
                  </span>
                </TableCell>
                  <TableCell className="font-semibold text-sm">
                  {formatter.format(item?.fee)}
                </TableCell>
                <TableCell>
                  <StatusBadge>{item?.status}</StatusBadge>
                </TableCell>
                <TableCell>
                  {(item?.status === "pending" || item?.status === "ongoing") && (
                     <EditButton
                      onClick={() => {
                          handleEdit(item);
                      }}data-id="edit"
                      />
                    )}
                  {/* <DeleteButton
                    onClick={() => {
                      handleDelete(item)
                    }}data-id="delete"
                  ></DeleteButton> */}
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="fixed bottom-6 right-6 z-40 sm:bottom-10 sm:right-10">
          {activeTab === "day" ? (
            <CreateButton
              className="shadow-2xl h-14 px-6 rounded-full bg-[#FFE8A3] hover:bg-[#ffe085] text-[#4B0082] border-none"
              onClick={handleCreateDayTime}>
              <span className="hidden sm:inline">Create Day Time Booking</span>
              <span className="sm:hidden">Create Day</span>
            </CreateButton>
          ) :
            (
              <CreateButton
                className="shadow-2xl h-14 px-6 rounded-full bg-[#4B0082] hover:bg-[#3d006a] text-[#FFE8A3] border-none"
                onClick={handleCreateNightTime}>
                <span className="hidden sm:inline">Create Night Time Booking</span>
                <span className="sm:hidden">Create Night</span>
              </CreateButton>
          )}
        </div>
      </div>

      {/* 🔹 Booking Form */}
      <BookingModal
        activeTab={activeTab}
        fetchBookings={fetchBookings}
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}
        handleClose={handleClose}
        setSheetOpen={setSheetOpen}
        findBooking={findBooking}
        booking={booking}
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
