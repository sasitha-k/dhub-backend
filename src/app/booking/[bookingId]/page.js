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
  AlertCircle
} from 'lucide-react'

import useBookings from '@/hooks/booking/useBookings'

export default function Page({ params }) {
const { bookingId: reference } = use(params);
const [bookingData, setBookingData] = useState(null);

const { fetchBookings, bookings, isLoading } = useBookings();

useEffect(() => {
    fetchBookings();
}, [fetchBookings]);

useEffect(() => {
    if (bookings?.length > 0 && reference) {
      const data = bookings.find((item) => item._id === reference);
      if (data) {
        setBookingData(data);
      }
    }
}, [bookings, reference]);

const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Booking", href: "/booking" },
    { label: `${bookingData?.bookingId}`, href: null },
];

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

  if (isLoading || !bookingData) {
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
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Booking {bookingData?.bookingId}</h1>
              <StatusBadge >{bookingData?.status}</StatusBadge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(bookingData?.date).toLocaleDateString()}
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {bookingData?.time}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="hidden sm:flex">
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
              <div className="text-2xl font-bold text-primary">LKR {bookingData?.fee?.toLocaleString()}</div>
              <Badge variant="outline" className="w-fit text-[10px] h-5">{bookingData?.paymentMethod || 'N/A'}</Badge>
            </CardContent>
           </Card>
           <Card>
            <CardContent className=" flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Distance</span>
              <div className="text-2xl font-bold">{bookingData?.meta?.totalDistance || '0'} km</div>
              <span className="text-xs text-muted-foreground">Estimated</span>
            </CardContent>
           </Card>
           <Card>
             <CardContent className=" flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</span>
              <div className="text-2xl font-bold">{bookingData?.meta?.totalHours ? parseFloat(bookingData.meta.totalHours).toFixed(1) : '0'} hrs</div>
               <span className="text-xs text-muted-foreground">Recorded</span>
            </CardContent>
           </Card>
           <Card>
             <CardContent className=" flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Package</span>
              <div className="text-lg font-semibold truncate" title={bookingData?.selectedPackage?.packageName}>{bookingData?.selectedPackage?.packageType?.replace('_', ' ') || 'Standard'}</div>
               <span className="text-xs text-muted-foreground truncate">{bookingData?.selectedPackage?.packageName || 'Base Package'}</span>
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
              <CardContent className="">
                  <div className="flex flex-col md:flex-row gap-4 relative">
                     {/* Connecting Line (Desktop) */}
                     <div className="hidden md:block absolute top-[1.1rem] left-4 right-4 h-[2px] bg-border/50 -z-10" />

                    <div className="flex-1 bg-background/80 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-4 w-4 rounded-full border-4 border-background bg-green-500 ring-1 ring-green-500/20" />
                        <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Pickup</span>
                      </div>
                      <div className="space-y-1 pl-6">
                        <p className="font-medium text-lg leading-none">{bookingData?.from}</p>
                        <p className="text-sm text-muted-foreground">{bookingData?.pickupLocation}</p>
                        <Badge variant="secondary" className="mt-2 text-[10px]">
                           {formatDateTime(bookingData?.tripStartAt)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-background/80 backdrop-blur-sm">
                       <div className="flex items-center gap-2 mb-3">
                        <div className="h-4 w-4 rounded-full border-4 border-background bg-red-500 ring-1 ring-red-500/20" />
                         <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Dropoff</span>
                      </div>
                      <div className="space-y-1 pl-6">
                        <p className="font-medium text-lg leading-none">{bookingData?.to}</p>
                         <p className="text-sm text-muted-foreground">{bookingData?.dropLocation}</p>
                         <Badge variant="secondary" className="mt-2 text-[10px]">
                           {formatDateTime(bookingData?.tripEndAt)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {bookingData?.description && (
                     <div className="mt-8 bg-muted/30 p-4 rounded-lg border border-border/50">
                        <p className="text-sm font-medium mb-1 flex items-center gap-2 text-muted-foreground">
                            <FileText className="w-4 h-4" /> Description
                        </p>
                        <p className="text-sm">{bookingData.description}</p>
                     </div>
                  )}
              </CardContent>
            </Card>

            {/* Odometer Proofs */}
            <Card>
              <CardHeader className="bg-muted/40 p-4">
                <CardTitle className="text-lg flex items-center gap-2">
                   <Car className="w-5 h-5 text-primary" />
                   Odometer Readings
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group relative rounded-xl border overflow-hidden bg-muted/20">
                    <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium shadow-sm z-10">Start: {bookingData?.odoStart} km</div>
                    {bookingData?.odoStartImage ? (
                        <div className="aspect-video w-full h-full overflow-hidden">
                        <img
                          src={bookingData.odoStartImage}
                          alt="Start Odometer"
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        </div>
                    ) : (
                        <div className="aspect-video w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Image Available</div>
                    )}
                  </div>
                   <div className="group relative rounded-xl border overflow-hidden bg-muted/20">
                     <div className="absolute top-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium shadow-sm z-10">End: {bookingData?.odoEnd} km</div>
                      {bookingData?.odoEndImage ? (
                        <div className="aspect-video w-full overflow-hidden">
                             <img src={bookingData.odoEndImage} alt="End Odometer" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                        </div>
                    ) : (
                        <div className="aspect-video w-full flex items-center justify-center text-muted-foreground text-sm">No Image Available</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             {/* Customer Card */}
             <Card className="p-4">
                <CardHeader>
                   <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Customer</CardTitle>
                </CardHeader>
                <CardContent className="">
                   <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {bookingData?.customerName?.charAt(0) || 'C'}
                      </div>
                      <div>
                         <p className="font-semibold">{bookingData?.customerName}</p>
                         <div className="flex items-center gap-2 text-sm">
                         <Phone className="w-4 h-4 text-muted-foreground" />
                         <span>{bookingData?.customerNumber}</span>
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
                <CardContent className="">
                   <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                         <User className="h-5 w-5" />
                      </div>
                       <div>
                         <p className="font-semibold">{bookingData?.driverName || "Assign Driver"}</p> 
                         {/* Note: driverName not in schema but assuming it might be needed or populated. Using fallback. */}
                         {/* <p className="text-sm text-muted-foreground">{bookingData?.driver ? `ID: ${bookingData.driver}` : 'No driver assigned'}</p> */}
                      </div>
                   </div>
                    {/* Add conditional driver details here if available in the future */}
                   <Button className="w-full h-9 mt-4" size="sm">
                       <PhoneCall className="w-4 h-4 mr-2" /> Call Driver
                   </Button>
                </CardContent>
             </Card>

             {/* Booking Meta */}
             <Card>
                 <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Meta</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Created</span>
                       <span>{new Date(bookingData?.createdAt).toLocaleDateString()}</span>
                    </div>
                     <div className="flex justify-between">
                       <span className="text-muted-foreground">Updated</span>
                       <span>{new Date(bookingData?.updatedAt).toLocaleDateString()}</span>
                    </div>
                 </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </BreadcrumbProvider>
  );
}
