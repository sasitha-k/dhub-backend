"use client";

import React, { useEffect, useMemo } from 'react';
import { BreadcrumbProvider } from "@/hooks/providers/useBreadcrumbProvider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Car, 
  FileStack, 
  Activity, 
  PlusCircle, 
  ArrowRight,
  Calendar,
  Clock,
  UserPlus,
  ShieldCheck
} from "lucide-react";
import useBookings from "@/hooks/booking/useBookings";
import useCustomer from "@/hooks/customers/useCustomer";
import useDrivers from "@/hooks/drivers/useDrivers";
import moment from "moment";
import Link from 'next/link';
import StatusBadge from '@/components/common/badges/StatusBadge';

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
];

export default function DashboardPage() {
  const { fetchBookings, bookings, isLoading: bookingLoading } = useBookings();
  const { fetchCustomers, customers, isLoading: customerLoading } = useCustomer();
  const { fetchDrivers, drivers, isLoading: driverLoading } = useDrivers();

  useEffect(() => {
    fetchBookings();
    fetchCustomers();
    fetchDrivers();
  }, [fetchBookings, fetchCustomers, fetchDrivers]);

  const stats = useMemo(() => [
    {
      title: "Total Bookings",
      value: bookings?.length || 0,
      icon: <FileStack className="w-6 h-6 text-blue-500" />,
      description: "Lifetime bookings registered",
      color: "border-l-4 border-l-blue-500"
    },
    {
      title: "Ongoing Trips",
      value: bookings?.filter(b => b.status === "ongoing")?.length || 0,
      icon: <Activity className="w-6 h-6 text-green-500" />,
      description: "Drivers currently on the road",
      color: "border-l-4 border-l-green-500"
    },
    {
      title: "Total Customers",
      value: customers?.length || 0,
      icon: <Users className="w-6 h-6 text-purple-500" />,
      description: "Registered portal users",
      color: "border-l-4 border-l-purple-500"
    },
    {
      title: "Active Drivers",
      value: drivers?.filter(d => d.onlineStatus)?.length || 0,
      icon: <Car className="w-6 h-6 text-orange-500" />,
      description: "Drivers currently online",
      color: "border-l-4 border-l-orange-500"
    }
  ], [bookings, customers, drivers]);

  const recentBookings = useMemo(() => {
    return [...(bookings || [])]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [bookings]);

  return (
    <BreadcrumbProvider value={breadcrumbItems}>
      <div className="flex flex-col gap-8 p-4 md:p-8 w-full max-w-7xl mx-auto ">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              {moment().format("dddd, MMMM Do YYYY")}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/booking">
              <Button className="bg-primary text-primary-foreground">
                <PlusCircle className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`${stat.color} shadow-sm hover:shadow-md transition-shadow`}>
              <CardHeader className="flex flex-row items-center justify-between  pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground ">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Bookings Table */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest activity from your customers</CardDescription>
              </div>
              <Link href="/booking">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground italic">
                          No recent bookings found
                        </TableCell>
                      </TableRow>
                    ) : (
                      recentBookings.map((item) => (
                        <TableRow key={item._id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">{item.bookingId}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">{item.customerName || "N/A"}</span>
                              <span className="text-xs text-muted-foreground">{item.customerNumber}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            <div className="flex flex-col">
                              <span>{moment(item.date).format("MMM DD, YYYY")}</span>
                              <span className="text-xs text-muted-foreground">{item.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge>{item.status}</StatusBadge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/booking/${item._id}`}>
                              <Button variant="outline" size="sm">Details</Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Insights */}
          <div className="flex flex-col gap-6">
            
            {/* Quick Actions Card */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Link href="/customers" className="w-full">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <UserPlus className="w-4 h-4 mr-3 text-purple-500" />
                    Add New Customer
                  </Button>
                </Link>
                <Link href="/drivers" className="w-full">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Car className="w-4 h-4 mr-3 text-orange-500" />
                    Register Driver
                  </Button>
                </Link>
                <Link href="/reports" className="w-full">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <ShieldCheck className="w-4 h-4 mr-3 text-blue-500" />
                    System Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Help/Support Box */}
            <Card className="shadow-sm bg-primary/5 border-none">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary">System Operational</h3>
                </div>
                <p className="text-sm text-primary/80 leading-relaxed">
                  All services are currently running smoothly. Last system backup completed successfully 2 hours ago.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </BreadcrumbProvider>
  );
}