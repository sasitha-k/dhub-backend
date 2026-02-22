"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/common/badges/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Package,
  CheckCircle2,
} from "lucide-react";
import useCustomerBookingHistory from "@/hooks/customers/useCustomerBookingHistory";
import { formatter } from "@/constants/formatNumber";
import moment from "moment";
import { settleCustomerCredit } from "@/api/customers";
import { toast } from "sonner";
import TextInput from "@/components/common/inputs/TextInput";

export function CustomerDetailModal({
  isOpen,
  onClose,
  customer,
  onSettlementSuccess,
}) {
  const { fetchBookingHistory, bookingHistory, isLoading } =
    useCustomerBookingHistory();
  const [settlementAmount, setSettlementAmount] = useState("");
  const [isSettling, setIsSettling] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (isOpen && customer?._id) {
      fetchBookingHistory(customer._id);
      setSettlementAmount("");
    }
  }, [isOpen, customer?._id, fetchBookingHistory]);

  const formatCurrency = (amount) => {
    return `Rs. ${formatter.format(amount || 0)}`;
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    return moment(dateTime).format("MM-DD-YYYY HH:mm");
  };

  const handleSettlementClick = () => {
    if (!settlementAmount || parseFloat(settlementAmount) <= 0) {
      toast.error("Please enter a valid settlement amount");
      return;
    }

    if (!customer?._id) {
      toast.error("Customer ID is missing");
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleSettlementConfirm = async () => {
    setShowConfirmDialog(false);

    if (!settlementAmount || parseFloat(settlementAmount) <= 0) {
      toast.error("Please enter a valid settlement amount");
      return;
    }

    if (!customer?._id) {
      toast.error("Customer ID is missing");
      return;
    }

    setIsSettling(true);
    try {
      const res = await settleCustomerCredit(customer._id, settlementAmount);
      toast.success(res.message || "Credit settled successfully");
      setSettlementAmount("");
      // Refresh data
      if (onSettlementSuccess) {
        onSettlementSuccess();
      }
      // Refresh booking history
      fetchBookingHistory(customer._id);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "Failed to settle credit",
      );
    } finally {
      setIsSettling(false);
    }
  };

  if (!customer) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        [data-radix-dialog-content] button[aria-label="Close"] svg {
          color: white !important;
        }
        [data-radix-dialog-content] button[aria-label="Close"]:hover svg {
          color: white !important;
          opacity: 1 !important;
        }
      `,
        }}
      />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col p-0 [&>button]:text-white [&>button:hover]:text-white [&>button:hover]:opacity-100">
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0 bg-primary text-primary-foreground rounded-md">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <User className="w-6 h-6" />
              Customer Details
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              View customer information and booking history
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 px-6 py-4 overflow-y-auto flex-1">
            {/* Customer Information Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 ml-4 text-base">
                  <User className="w-4 h-4" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium text-sm truncate">
                        {customer.firstName} {customer.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-sm truncate">
                        {customer.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Mobile</p>
                      <p className="font-medium text-sm">
                        {customer.mobile || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="font-medium text-sm truncate">
                        {customer.address || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Amount Owed
                      </p>
                      <p className="font-semibold text-primary text-sm">
                        {formatCurrency(customer.customerOwesCompany)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Created On
                      </p>
                      <p className="font-medium text-sm">
                        {customer.createdAt
                          ? formatDateTime(customer.createdAt)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settlement Section */}
            {customer.customerOwesCompany > 0 && (
              <>
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 ml-4 text-base">
                      <DollarSign className="w-4 h-4" />
                      Settle Credit Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                      <div className="flex-1 w-full">
                        <label className="text-xs text-muted-foreground mb-1 block">
                          Settlement Amount
                        </label>
                        <TextInput
                          type="number"
                          placeholder="Enter amount"
                          value={settlementAmount}
                          onChange={(e) => setSettlementAmount(e.target.value)}
                          disabled={isSettling}
                        />
                      </div>
                      <Button
                        onClick={handleSettlementClick}
                        disabled={
                          isSettling ||
                          !settlementAmount ||
                          parseFloat(settlementAmount) <= 0
                        }
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isSettling ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                            Settling...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Settle
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Outstanding balance:{" "}
                      <span className="font-semibold text-primary">
                        {formatCurrency(customer.customerOwesCompany)}
                      </span>
                    </p>
                  </CardContent>
                </Card>
                <Separator />
              </>
            )}

            {/* Booking History Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 ml-4">
                  <Package className="w-5 h-5" />
                  Booking History
                  {bookingHistory.length > 0 && (
                    <span className="text-sm font-normal text-muted-foreground">
                      ({bookingHistory.length}{" "}
                      {bookingHistory.length === 1 ? "booking" : "bookings"})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-muted-foreground text-sm">
                        Loading booking history...
                      </p>
                    </div>
                  </div>
                ) : bookingHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Booking ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Package</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Credit</TableHead>
                          <TableHead>Start Time</TableHead>
                          <TableHead>End Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookingHistory.map((booking, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {booking.bookingId || "N/A"}
                            </TableCell>
                            <TableCell>
                              {booking.date
                                ? moment(booking.date).format("DD-MM-YYYY")
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              {booking.selectedPackage?.packageName || "N/A"}
                            </TableCell>
                            <TableCell>
                              <StatusBadge>
                                {booking.status || "N/A"}
                              </StatusBadge>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(booking.fee)}
                            </TableCell>
                            <TableCell>
                              {(() => {
                                const credit =
                                  parseFloat(booking.cashAmount || 0) -
                                  parseFloat(booking.fee || 0);
                                const isNegative = credit < 0;
                                return (
                                  <span
                                    className={`font-semibold ${isNegative ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                                  >
                                    {formatCurrency(Math.abs(credit))}
                                  </span>
                                );
                              })()}
                            </TableCell>
                            <TableCell>
                              {booking.tripStartAt
                                ? formatDateTime(booking.tripStartAt)
                                : "N/A"}
                            </TableCell>
                            <TableCell>
                              {booking.tripEndAt
                                ? formatDateTime(booking.tripEndAt)
                                : "N/A"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No booking history found for this customer.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>

        {/* Settlement Confirmation Dialog */}
        <AlertDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Settlement</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to settle{" "}
                <span className="font-semibold text-primary">
                  {formatCurrency(settlementAmount)}
                </span>{" "}
                for{" "}
                <span className="font-semibold text-primary">
                  {customer.firstName} {customer.lastName}
                </span>
                ?
                <br />
                <br />
                Outstanding balance:{" "}
                <span className="font-semibold">
                  {formatCurrency(customer.customerOwesCompany)}
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-gray-500 text-white border-none hover:text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-primary text-white hover:text-white border-none px-4 py-2 rounded hover:bg-primary/90"
                onClick={handleSettlementConfirm}
              >
                Confirm Settlement
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>
    </>
  );
}
