'use client'

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { use, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import StatusBadge from '@/components/common/badges/StatusBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  FileText,
  PhoneCall,
  MessageSquare,
  DollarSign,
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronLeft,
  Activity,
  History
} from 'lucide-react'
import useDrivers from '@/hooks/drivers/useDrivers'
import Link from 'next/link'
import useBookings from '@/hooks/booking/useBookings'
import moment from 'moment'

export default function DriverDetailsPage({ params }) {
  const { id } = use(params);
  const { findDriver, driver, isLoading } = useDrivers();
  const { fetchBookings, bookings, isLoading: bookingsLoading } = useBookings();

  useEffect(() => {
    if (id) {
      findDriver(id);
      fetchBookings({ driver: id });
    }
  }, [id, findDriver, fetchBookings]);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Drivers", href: "/drivers/balances" },
    { label: driver ? `${driver.firstName} ${driver.lastName}` : "Details", href: null },
  ];

  if (isLoading || !driver) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground text-sm">Loading driver details...</p>
        </div>
      </div>
    )
  }

  return (
    <BreadcrumbProvider value={breadcrumbItems}>
      <div className="space-y-6 lg:p-6 p-4 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b pb-6">
          <div className="flex gap-4 items-start">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
              {driver.firstName?.[0]}{driver.lastName?.[0]}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {driver.firstName} {driver.lastName}
                </h1>
                <StatusBadge>{driver.onlineStatus ? "Online" : "Offline"}</StatusBadge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {driver.email}
                </div>
                <Separator orientation="vertical" className="hidden md:block h-4" />
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  {driver.mobile}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/drivers/balances">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to List
              </Link>
            </Button>
            <Button size="sm">
              <PhoneCall className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Driver Owes Company</p>
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-600">LKR {driver.driverOwesCompany?.toLocaleString() || "0"}</div>
              <p className="text-[10px] text-muted-foreground mt-1">Pending payments to company</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company Owes Driver</p>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-600">LKR {driver.companyOwesDriver?.toLocaleString() || "0"}</div>
              <p className="text-[10px] text-muted-foreground mt-1 text-green-600">Available for withdrawal</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card shadow-sm>
              <CardHeader className="bg-muted/40 p-4 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Driver Profile Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">Username</label>
                      <p className="font-medium">@{driver.userName || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">License Number</label>
                      <p className="font-medium">{driver.licenseNumber || "12341234"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">Address</label>
                      <div className="flex items-start gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="font-medium text-sm leading-relaxed">{driver.address || "No address provided"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">Member Since</label>
                      <p className="font-medium">{driver.createdAt ? moment(driver.createdAt).format("MMMM DD, YYYY") : "N/A"}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase">Status</label>
                        <div className="mt-1">
                             <StatusBadge>{driver.onlineStatus ? "Online" : "Offline"}</StatusBadge>
                        </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card shadow-sm>
              <CardHeader className="bg-muted/40 p-4 border-b flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Booking History
                </CardTitle>
                <Link href="/booking">
                  <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/30 text-muted-foreground text-xs uppercase font-medium">
                            <tr>
                                <th className="px-6 py-3">Booking ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Fee</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {bookings && bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-4 font-medium text-blue-600">
                                            <Link href={`/booking/${booking._id}`}>{booking.bookingId}</Link>
                                        </td>
                                        <td className="px-6 py-4">{booking.customerName}</td>
                                        <td className="px-6 py-4">{moment(booking.date).format("MMM DD, YYYY")}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge>{booking.status}</StatusBadge>
                                        </td>
                                        <td className="px-6 py-4 text-right font-semibold">LKR {booking.fee?.toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-muted-foreground italic">
                                        {bookingsLoading ? "Loading bookings..." : "No bookings assigned to this driver yet."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <Card shadow-sm>
              <CardHeader className="p-4 border-b">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Button variant="outline" className="w-full justify-start h-11" asChild>
                  <Link href={`/drivers/balances?id=${driver._id}&edit=true`}>
                    <DollarSign className="w-4 h-4 mr-3 text-green-500" />
                    Settle Account
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start h-11">
                  <MessageSquare className="w-4 h-4 mr-3 text-blue-500" />
                  Send SMS Notification
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full justify-start h-11 bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                  <XCircle className="w-4 h-4 mr-3" />
                  Suspend Driver Account
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-none shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-primary">Key Metrics</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                        <span className="text-xs text-muted-foreground">Total Bookings</span>
                        <span className="font-bold">{bookings?.length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                        <span className="text-xs text-muted-foreground">Success Rate</span>
                        <span className="font-bold text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary/10">
                        <span className="text-xs text-muted-foreground">Avg. Rating</span>
                        <span className="font-bold text-orange-500">4.9 ★</span>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BreadcrumbProvider>
  )
}

function XCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}
