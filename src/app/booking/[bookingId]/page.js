'use client'

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { use, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatusBadge from '@/components/common/badges/StatusBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Bike, 
  CreditCard, 
  FileText,
  Edit,
  PhoneCall,
  MessageSquare,
  Navigation,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Package,
  Timer,
  Route
} from 'lucide-react'

import useBookings from '@/hooks/booking/useBookings'
import { BookingModal } from '../BookingModal'

export default function Page({ params }) {
const { bookingId: reference } = use(params);

  const { fetchBookings, booking, isLoading, findBooking } = useBookings();
  const [selectedItem, setSelectedItem] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

useEffect(() => {
  if (reference) {
    findBooking(reference);
  }
}, [findBooking, reference]);

const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Booking", href: "/booking" },
    { label: `${booking?.bookingId}`, href: null },
];

// console.log('first', booking);
const handleEdit = (booking) => {
    setSheetOpen(true);
    setSelectedItem(booking);
    setIsNewItem(false);
};
  
  const handleClose = () => {
    setSheetOpen(false);
  }
  
const handleStatusUpdate = (newStatus) => {
    console.log("Update status to:", newStatus);
};

const formatDateTime = (dateTime) => {
  if (!dateTime) return "N/A";
  const date = new Date(dateTime);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) + ' ' + date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

if (isLoading || !booking) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground text-sm">Loading booking details...</p>
      </div>
    </div>
  )
}

return (
    <BreadcrumbProvider value={items}>
      <div className="space-y-6 lg:p-6 p-4 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Booking <span className="text-blue-700">{booking?.bookingId}</span></h1>
              <StatusBadge >{booking?.status}</StatusBadge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(booking?.date).toLocaleDateString()}
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {booking?.time}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => handleEdit(booking)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            {/* <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Invoice
            </Button> */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Fee</span>
              <div className="text-2xl font-bold text-primary">LKR {booking?.fee?.toLocaleString()}</div>
              <Badge variant="outline" className="w-fit text-[10px] h-5">{booking?.paymentMethod || 'N/A'}</Badge>
              {booking?.cashAmount && (
                <span className="text-xs text-muted-foreground mt-1">Cash: LKR {booking.cashAmount.toLocaleString()}</span>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Distance</span>
              <div className="text-2xl font-bold">{booking?.meta?.totalMilage || booking?.odoEnd - booking?.odoStart || '0'} km</div>
              <span className="text-xs text-muted-foreground">Estimated</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</span>
              <div className="text-2xl font-bold">
                {booking?.meta?.totalHours 
                  ? `${parseFloat(booking.meta.totalHours).toFixed(2)} hrs`
                  : (booking?.tripStartAt && booking?.tripEndAt
                    ? `${((new Date(booking.tripEndAt) - new Date(booking.tripStartAt)) / (1000 * 60 * 60)).toFixed(2)} hrs`
                    : '0 hrs')}
              </div>
              <span className="text-xs text-muted-foreground">Recorded</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Package</span>
              <div className="text-lg font-semibold truncate" title={booking?.selectedPackage?.packageName}>{booking?.selectedPackage?.packageType?.replace('_', ' ') || 'Standard'}</div>
              <span className="text-xs text-muted-foreground truncate">{booking?.selectedPackage?.packageName || 'Base Package'}</span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Journey Details */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/40 p-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  Journey Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 relative">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden md:block absolute top-[1.1rem] left-4 right-4 h-[2px] bg-border/50 -z-10" />
                  <div className="flex-1 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-4 w-4 rounded-full border-4 border-background bg-green-500 ring-1 ring-green-500/20" />
                      <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Pickup</span>
                    </div>
                    <div className="space-y-1 pl-6">
                      <p className="font-medium text-lg leading-none">{booking?.from}</p>
                      <p className="text-sm text-muted-foreground">{booking?.pickupLocation}</p>
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        {formatDateTime(booking?.tripStartAt)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-4 w-4 rounded-full border-4 border-background bg-red-500 ring-1 ring-red-500/20" />
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Dropoff</span>
                    </div>
                    <div className="space-y-1 pl-6">
                      <p className="font-medium text-lg leading-none">{booking?.to}</p>
                      <p className="text-sm text-muted-foreground">{booking?.dropLocation}</p>
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        {formatDateTime(booking?.tripEndAt)}
                      </Badge>
                    </div>
                  </div>
                </div>
                {booking?.description && (
                  <div className="mt-8 bg-muted/30 p-4 rounded-lg border border-border/50">
                    <p className="text-sm font-medium mb-1 flex items-center gap-2 text-muted-foreground">
                      <FileText className="w-4 h-4" /> Description
                    </p>
                    <p className="text-sm">{booking.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Package Details & Fee Breakdown */}
            {(booking?.selectedPackage || booking?.meta) && (
              <Card>
                <CardHeader className="bg-muted/40 p-4">
                  <CardTitle className="text-lg flex items-center gap-2 justify-between">
                  {/* <div className='w-1/2 flex items-center gap-2'>
                    <Package className="w-5 h-5 text-primary" />
                    Package Details
                  </div> */}
                  <div className='w-1/2 flex gap-2 items-center'>
                     <DollarSign className="w-4 h-4" />
                        Fee Breakdown
                  </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  {/* Package Details Section */}
                  {booking?.selectedPackage && (
                  <>
                    <div className='w-full'>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                        {booking.meta.relevantTier && (
                          <div className="grid gap-1 p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-muted-foreground">Base Price ({booking.meta.relevantTier.distanceKM} km tier)</span>
                            <span className="font-semibold">LKR {booking.meta.relevantTier.price?.toLocaleString() || 0}</span>
                          </div>
                        )}
                        {booking.meta.extraKmCharge > 0 && (
                          <div className="grid gap-1 p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-muted-foreground">
                              Extra KM ({booking.meta.extraKms || 0} km × LKR {booking.meta.extraKMRate || 0})
                            </span>
                            <span className="font-semibold">LKR {booking.meta.extraKmCharge?.toLocaleString() || 0}</span>
                          </div>
                        )}
                        {booking.meta.waitingCharge > 0 && (
                          <div className="grid gap-1 p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-muted-foreground">
                              Waiting Charge ({booking.meta.chargeableWaitingMinutes > 0 ? Math.ceil(booking.meta.chargeableWaitingMinutes) : 0} min)
                            </span>
                            <span className="font-semibold">LKR {booking.meta.waitingCharge?.toLocaleString() || 0}</span>
                          </div>
                        )}
                        {booking.meta.additionalFees > 0 && (
                          <div className="grid gap-1 p-3 bg-muted/30 rounded-lg">
                            <span className="text-sm text-muted-foreground">Additional Fees</span>
                            <span className="font-semibold">LKR {booking.meta.additionalFees?.toLocaleString() || 0}</span>
                          </div>
                        )}
                      </div>
                      </div>
                     
                    </>
                  )}

                  {/* Fee Breakdown Section */}
                  {booking?.meta && (
                    <div>
                     <Separator className="my-4" />
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                        <span className="text-base font-semibold">Total Fee</span>
                        <span className="text-xl font-bold text-primary">LKR {booking?.fee?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          
          {/* Odometer Proofs */}
            <Card>
              <CardHeader className="bg-muted/40 p-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  Odometer Readings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group relative rounded-xl border overflow-hidden bg-muted/20">
                    <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium shadow-sm z-10">Start: {booking?.odoStart} km</div>
                    {booking?.odoStartImage ? (
                      <div className="aspect-video w-full h-full overflow-hidden">
                        <img
                          src={booking.odoStartImage}
                          alt="Start Odometer"
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Image Available</div>
                    )}
                  </div>
                  <div className="group relative rounded-xl border overflow-hidden bg-muted/20">
                    <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium shadow-sm z-10">End: {booking?.odoEnd} km</div>
                    {booking?.odoEndImage ? (
                      <div className="aspect-video w-full overflow-hidden">
                        <img src={booking.odoEndImage} alt="End Odometer" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    ) : (
                      <div className="aspect-video w-full flex items-center justify-center text-muted-foreground text-sm">No Image Available</div>
                    )}
                  </div>
                </div>
                {booking?.odoStart && booking?.odoEnd && (
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Distance Traveled</span>
                      <span className="text-lg font-bold">{parseInt(booking.odoEnd) - parseInt(booking.odoStart)} km</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 h-auto">
            {/* Customer Card */}
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {booking?.customerName?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <p className="font-semibold">{booking?.customerName}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{booking?.customerNumber}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full h-9 mt-4" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message Customer
                </Button>
              </CardContent>
            </Card>

            {/* Driver Card */}
            <Card className="p-4">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Driver</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{booking?.driverName || "Assign Driver"}</p>
                  </div>
                </div>
                <Button className="w-full h-9 mt-4" size="sm">
                  <PhoneCall className="w-4 h-4 mr-2" /> Call Driver
                </Button>
              </CardContent>
            </Card>

            {/* Booking Meta */}
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Booking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{booking?.updatedAt ? new Date(booking.updatedAt).toLocaleDateString() : 'N/A'}</span>
                </div>
                {booking?.meta && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Distance</span>
                        <span className="font-medium">{booking.meta.totalMilage || 0} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Duration</span>
                        <span className="font-medium">{booking.meta.totalHours ? `${parseFloat(booking.meta.totalHours).toFixed(2)} hrs` : '0 hrs'}</span>
                      </div>
                      {booking.meta.extraKms > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Extra Kilometers</span>
                          <span className="font-medium">{booking.meta.extraKms} km</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

           {/* Waiting Periods */}
            {booking?.waitingPeriods && booking.waitingPeriods.length > 0 && (
              <Card className={"capitalize h-auto"}>
                <CardHeader className="bg-muted/40 p-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Timer className="w-5 h-5 text-primary" />
                    Waiting Periods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {booking.waitingPeriods.map((period, index) => {
                      const startTime = new Date(period.startTime);
                      const endTime = new Date(period.endTime);
                      const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));
                      return (
                        <div key={period._id || index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Period {index + 1}</span>
                            <span className="text-sm font-medium">
                              {startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <Badge variant="secondary">{durationMinutes} min</Badge>
                        </div>
                      );
                    })}
                    {booking.meta && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Waiting Time</span>
                          <span className="text-sm font-semibold">{Math.round(booking.meta.totalWaitingMinutes || 0)} minutes</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-muted-foreground">Chargeable Minutes</span>
                          <span className="text-sm">{booking.meta.chargeableWaitingMinutes > 0 ? Math.ceil(booking.meta.chargeableWaitingMinutes) : 0} min</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
          </div>
        </div>
    </div>
    
      <BookingModal
        fetchBookings={fetchBookings}
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}
        handleClose={handleClose}
        setSheetOpen={setSheetOpen}
        findBooking={findBooking}
        booking={booking}
      />
    </BreadcrumbProvider>
  );
}
