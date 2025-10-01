'use client'

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { use, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatusBadge from '@/components/common/badges/StatusBadge'
import PrimaryButton from '@/components/common/buttons/PrimaryButton'
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

export default function Page({ params }) {
    const { reference } = use(params);

  const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Booking", href: "/booking" },
    { label: reference, href: null },
  ];

  // Mock booking data - in real app this would come from API
  const [bookingData, setBookingData] = useState({
    referenceNumber: reference,
    customer: {
      name: "Supun Madusanka",
      mobile: "0783456784",
      customerId: "CUS0001",
      email: "supun@example.com",
      address: "No. 123, Main Street, Colombo 03"
    },
    driver: {
      name: "Kamal Perera",
      mobile: "0771234567",
      driverId: "DRV0001",
      email: "kamal@example.com",
      vehicleNumber: "ABC-1234",
      vehicleType: "Sedan"
    },
    rider: {
      name: "Nimal Silva",
      mobile: "0769876543",
      riderId: "RID0001",
      email: "nimal@example.com"
    },
    scheduledAt: "2025-01-15 14:30",
    pickupLocation: "Hilton Hotel, Colombo 03",
    dropLocation: "Bandaranaike International Airport",
    totalAmount: "4354.00",
    status: "inProgress",
    paymentStatus: "paid",
    bookingDate: "2025-01-10",
    notes: "Customer requested early pickup due to flight schedule",
    distance: "35.5 km",
    estimatedDuration: "45 minutes"
  });

  const handleStatusUpdate = (newStatus) => {
    setBookingData(prev => ({ ...prev, status: newStatus }));
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <BreadcrumbProvider value={items}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Booking Details</h1>
            <p className="text-muted-foreground">Reference: {reference}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Booking
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </div>

        {/* Status and Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                  <StatusBadge>{bookingData.status}</StatusBadge>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                  <Badge variant={bookingData.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                    {bookingData.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Call Customer
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send SMS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled Date & Time</p>
                    <p className="font-medium">{formatDateTime(bookingData.scheduledAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Date</p>
                    <p className="font-medium">{new Date(bookingData.bookingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{bookingData.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Duration</p>
                    <p className="font-medium">{bookingData.estimatedDuration}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Pickup Location</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <p className="font-medium">{bookingData.pickupLocation}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Drop Location</p>
                    <div className="flex items-start gap-2">
                      <Navigation className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <p className="font-medium">{bookingData.dropLocation}</p>
                    </div>
                  </div>
                </div>

                {bookingData.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Notes</p>
                      <p className="text-sm bg-muted p-3 rounded-md">{bookingData.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{bookingData.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer ID</p>
                    <p className="font-medium">{bookingData.customer.customerId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium">{bookingData.customer.mobile}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{bookingData.customer.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{bookingData.customer.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Driver Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{bookingData.driver.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Driver ID</p>
                    <p className="font-medium">{bookingData.driver.driverId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium">{bookingData.driver.mobile}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{bookingData.driver.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle Number</p>
                    <p className="font-medium">{bookingData.driver.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle Type</p>
                    <p className="font-medium">{bookingData.driver.vehicleType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rider Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bike className="w-5 h-5" />
                  Rider Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{bookingData.rider.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rider ID</p>
                    <p className="font-medium">{bookingData.rider.riderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium">{bookingData.rider.mobile}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{bookingData.rider.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-bold text-lg">LKR {bookingData.totalAmount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status</span>
                    <Badge variant={bookingData.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                      {bookingData.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Management */}
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant={bookingData.status === 'pending' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => handleStatusUpdate('pending')}
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Pending
                  </Button>
                  <Button 
                    variant={bookingData.status === 'inProgress' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => handleStatusUpdate('inProgress')}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    In Progress
                  </Button>
                  <Button 
                    variant={bookingData.status === 'completed' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => handleStatusUpdate('completed')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </Button>
                  <Button 
                    variant={bookingData.status === 'cancelled' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => handleStatusUpdate('cancelled')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancelled
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Call Driver
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Customer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Navigation className="w-4 h-4 mr-2" />
                    Track Location
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Route
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BreadcrumbProvider>
  );
}
