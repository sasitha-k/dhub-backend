"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextInput from "@/components/common/inputs/TextInput";
import StatusBadge from "@/components/common/badges/StatusBadge";
import {
  User,
  Mail,
  DollarSign,
  Calendar,
  Package,
  CheckCircle2,
  Receipt,
  History,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { addDriverExpense, addDriverBalance } from "@/api/drivers";
import useDriverBookingHistory from "@/hooks/drivers/useDriverBookingHistory";
import useDriverExpenses from "@/hooks/drivers/useDriverExpenses";
import useDriverHistory from "@/hooks/drivers/useDriverHistory";
import { formatter } from "@/constants/formatNumber";
import moment from "moment";
import { toast } from "sonner";

const EXPENSE_NOTE_OPTIONS = [
  "Uniform",
  "Party",
  "Accommodation",
  "Electricity Bill",
  "Water Bill",
];

const BALANCE_NOTE_OPTIONS = [
  "Advance Payment",
  "Bonus",
  "Adjustment",
  "Refund",
  "Settlement",
];

export function AddExpenseModal({ isOpen, onClose, driver, onSuccess }) {
  const { fetchBookingHistory, bookingHistory, isLoading } =
    useDriverBookingHistory();
  const {
    fetchExpenses,
    expenses,
    isLoading: expensesLoading,
  } = useDriverExpenses();
  const {
    fetchHistory,
    history: driverHistory,
    isLoading: historyLoading,
  } = useDriverHistory();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [noteDropdownOpen, setNoteDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceNote, setBalanceNote] = useState("");
  const [balanceNoteDropdownOpen, setBalanceNoteDropdownOpen] = useState(false);
  const [isBalanceSubmitting, setIsBalanceSubmitting] = useState(false);
  const noteDropdownRef = useRef(null);
  const balanceNoteDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        noteDropdownRef.current &&
        !noteDropdownRef.current.contains(e.target)
      ) {
        setNoteDropdownOpen(false);
      }
      if (
        balanceNoteDropdownRef.current &&
        !balanceNoteDropdownRef.current.contains(e.target)
      ) {
        setBalanceNoteDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && driver?._id) {
      fetchBookingHistory(driver._id);
      fetchExpenses(driver._id);
      fetchHistory(driver._id);
      setAmount("");
      setNote("");
      setBalanceAmount("");
      setBalanceNote("");
    }
  }, [isOpen, driver?._id, fetchBookingHistory, fetchExpenses, fetchHistory]);

  const formatCurrency = (amountVal) => {
    return `Rs. ${formatter.format(amountVal || 0)}`;
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    return moment(dateTime).format("MM-DD-YYYY HH:mm");
  };

  const formatDateShort = (dateTime) => {
    if (!dateTime) return "N/A";
    return moment(dateTime).format("MMM DD, YYYY");
  };

  // Sort expenses by date descending (newest first)
  const sortedExpenses = React.useMemo(() => {
    if (!expenses?.length) return [];
    return [...expenses].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [expenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!driver?._id) {
      toast.error("Driver is missing");
      return;
    }
    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDriverExpense(driver._id, numAmount, note || "");
      toast.success("Expense added successfully");
      onSuccess?.();
      setAmount("");
      setNote("");
      fetchExpenses(driver._id);
      fetchBookingHistory(driver._id);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "Failed to add expense",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBalanceSubmit = async (e) => {
    e.preventDefault();
    if (!driver?._id) {
      toast.error("Driver is missing");
      return;
    }
    const numAmount = Number(balanceAmount);
    if (!balanceAmount || isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsBalanceSubmitting(true);
    try {
      await addDriverBalance(driver._id, numAmount, balanceNote || "");
      toast.success("Balance added successfully");
      onSuccess?.();
      setBalanceAmount("");
      setBalanceNote("");
      fetchExpenses(driver._id);
      fetchBookingHistory(driver._id);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "Failed to add balance",
      );
    } finally {
      setIsBalanceSubmitting(false);
    }
  };

  if (!driver) return null;

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
              Driver Details
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80">
              View driver information, add expenses, and booking history
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 px-6 py-4 overflow-y-auto flex-1">
            {/* Driver Information Card */}
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
                        {driver.firstName} {driver.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-sm truncate">
                        {driver.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Company Balance
                      </p>
                      <p
                        className={`font-semibold text-sm ${
                          (driver.companyBalance || 0) < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {formatCurrency(driver.companyBalance)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-medium text-sm">
                        {driver.onlineStatus ? "Online" : "Offline"}
                        {driver.isDriverInBookings ? " · In Progress" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Transaction (Expense or Balance) */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 ml-4 text-base">
                  <DollarSign className="w-4 h-4" />
                  Add Transaction
                </CardTitle>
                <p className="text-xs text-muted-foreground ml-4 -mt-1">
                  Record an expense or add to driver balance
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <Tabs defaultValue="expense" className="w-full">
                  <TabsList className="grid w-full max-w-xs grid-cols-2 mb-4">
                    <TabsTrigger value="expense" className="gap-1.5">
                      <MinusCircle className="w-4 h-4" />
                      Add Expense
                    </TabsTrigger>
                    <TabsTrigger value="balance" className="gap-1.5">
                      <PlusCircle className="w-4 h-4" />
                      Add Balance
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="expense" className="mt-0">
                    <p className="text-xs text-muted-foreground mb-3">
                      Amounts deducted from the driver balance (e.g. uniform, bills,
                      accommodation).
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col sm:flex-row gap-3 items-end flex-wrap"
                    >
                      <div className="w-full sm:min-w-[120px] sm:max-w-[140px]">
                        <label className="text-xs text-muted-foreground mb-1 block">
                          Amount (Rs.)
                        </label>
                        <TextInput
                          type="number"
                          min="1"
                          step="1"
                          placeholder="e.g. 5000"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div
                        className="flex-1 min-w-[140px] relative"
                        ref={noteDropdownRef}
                      >
                        <label className="text-xs text-muted-foreground mb-1 block">
                          Note
                        </label>
                        <TextInput
                          placeholder="Select or type..."
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          onFocus={() => setNoteDropdownOpen(true)}
                          disabled={isSubmitting}
                        />
                        {noteDropdownOpen && !isSubmitting && (
                          <div className="absolute left-0 right-0 z-[120] mt-1 rounded-md border bg-background shadow-md max-h-48 overflow-y-auto">
                            {EXPENSE_NOTE_OPTIONS.filter((opt) =>
                              opt
                                .toLowerCase()
                                .includes((note || "").toLowerCase()),
                            ).map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setNote(option);
                                  setNoteDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-accent capitalize"
                              >
                                {option}
                              </button>
                            ))}
                            {EXPENSE_NOTE_OPTIONS.filter((opt) =>
                              opt
                                .toLowerCase()
                                .includes((note || "").toLowerCase()),
                            ).length === 0 && (
                              <div className="px-3 py-2 text-muted-foreground text-sm">
                                Type for custom note
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={
                          isSubmitting || !amount || Number(amount) <= 0
                        }
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Add Expense
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="balance" className="mt-0">
                    <p className="text-xs text-muted-foreground mb-3">
                      Amounts that will be added to the driver balance (e.g. advance
                      payment, bonus, settlement).
                    </p>
                    <form
                      onSubmit={handleBalanceSubmit}
                      className="flex flex-col sm:flex-row gap-3 items-end flex-wrap"
                    >
                      <div className="w-full sm:min-w-[120px] sm:max-w-[140px]">
                        <label className="text-xs text-muted-foreground mb-1 block">
                          Amount (Rs.)
                        </label>
                        <TextInput
                          type="number"
                          min="1"
                          step="1"
                          placeholder="e.g. 5000"
                          value={balanceAmount}
                          onChange={(e) => setBalanceAmount(e.target.value)}
                          disabled={isBalanceSubmitting}
                        />
                      </div>
                      <div
                        className="flex-1 min-w-[140px] relative"
                        ref={balanceNoteDropdownRef}
                      >
                        <label className="text-xs text-muted-foreground mb-1 block">
                          Note
                        </label>
                        <TextInput
                          placeholder="Select or type..."
                          value={balanceNote}
                          onChange={(e) => setBalanceNote(e.target.value)}
                          onFocus={() => setBalanceNoteDropdownOpen(true)}
                          disabled={isBalanceSubmitting}
                        />
                        {balanceNoteDropdownOpen && !isBalanceSubmitting && (
                          <div className="absolute left-0 right-0 z-[120] mt-1 rounded-md border bg-background shadow-md max-h-48 overflow-y-auto">
                            {BALANCE_NOTE_OPTIONS.filter((opt) =>
                              opt
                                .toLowerCase()
                                .includes((balanceNote || "").toLowerCase()),
                            ).map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setBalanceNote(option);
                                  setBalanceNoteDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-accent capitalize"
                              >
                                {option}
                              </button>
                            ))}
                            {BALANCE_NOTE_OPTIONS.filter((opt) =>
                              opt
                                .toLowerCase()
                                .includes((balanceNote || "").toLowerCase()),
                            ).length === 0 && (
                              <div className="px-3 py-2 text-muted-foreground text-sm">
                                Type for custom note
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={
                          isBalanceSubmitting ||
                          !balanceAmount ||
                          Number(balanceAmount) <= 0
                        }
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isBalanceSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Add Balance
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Separator />

            {/* Expenses List Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="flex items-center gap-2 ml-4 text-base">
                    <Receipt className="w-5 h-5" />
                    Expenses
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {expensesLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-muted-foreground text-sm">
                        Loading expenses...
                      </p>
                    </div>
                  </div>
                ) : sortedExpenses.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <div className="max-h-[350px] overflow-auto overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted hover:bg-muted border-b sticky top-0 z-20">
                            <TableHead className="w-12 font-semibold sticky top-0 bg-muted z-20 min-w-[2.5rem] border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              #
                            </TableHead>
                            <TableHead className="font-semibold min-w-[140px] sticky top-0 bg-muted z-20 border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              Date
                            </TableHead>
                            <TableHead className="font-semibold min-w-[100px] sticky top-0 bg-muted z-20 border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              Expense
                            </TableHead>
                            <TableHead className="text-right font-semibold min-w-[120px] sticky top-0 bg-muted z-20 border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              Amount (Rs.)
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedExpenses.map((expense, index) => (
                            <TableRow
                              key={expense._id || index}
                              className="hover:bg-muted/30 transition-colors"
                            >
                              <TableCell className="text-muted-foreground font-medium">
                                {index + 1}
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-0.5">
                                  <span className="font-medium">
                                    {formatDateShort(expense.createdAt)}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {expense.createdAt
                                      ? moment(expense.createdAt).format(
                                          "HH:mm",
                                        )
                                      : ""}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm font-semibold">
                                  {expense.note}
                                </span>
                              </TableCell>
                              <TableCell className="text-right font-semibold tabular-nums">
                                {formatCurrency(expense.amount)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground border rounded-md border-dashed">
                    <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">No expenses recorded</p>
                    <p className="text-xs mt-1">
                      Add an expense above to see it here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Separator />

            {/* Booking History Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 ml-4 text-base">
                  <Package className="w-5 h-5" />
                  Booking History
                  {driverHistory.length > 0 && (
                    <span className="text-sm font-normal text-muted-foreground">
                      ({driverHistory.length}{" "}
                      {driverHistory.length === 1 ? "booking" : "bookings"})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {historyLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-muted-foreground text-sm">
                        Loading booking history...
                      </p>
                    </div>
                  </div>
                ) : driverHistory.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <div className="max-h-[350px] overflow-auto overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted hover:bg-muted border-b sticky top-0 z-20">
                            <TableHead className="font-semibold min-w-[120px] sticky top-0 bg-muted z-20 border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              Booking ID
                            </TableHead>
                            <TableHead className="font-semibold min-w-[140px] sticky top-0 bg-muted z-20 border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              Date
                            </TableHead>
                            <TableHead className="font-semibold text-right min-w-[120px] sticky top-0 bg-muted z-20 border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              Company Fee
                            </TableHead>
                            <TableHead className="font-semibold text-right min-w-[120px] sticky top-0 bg-muted z-20 border-b shadow-[0_1px_0_0_hsl(var(--border))]">
                              Driver Fee
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {driverHistory.map((item, index) => (
                            <TableRow
                              key={item?.id ?? item?._id ?? index}
                              className="hover:bg-muted/30 transition-colors"
                            >
                              <TableCell className="font-medium">
                                {item?.bookingId ?? item?.booking_id ?? "N/A"}
                              </TableCell>
                              <TableCell>
                                {item?.createdAt || item?.date
                                  ? formatDateTime(
                                      item?.createdAt || item?.date,
                                    )
                                  : "N/A"}
                              </TableCell>
                              <TableCell className="text-right font-semibold tabular-nums text-green-600 dark:text-green-400">
                                {formatCurrency(
                                  item?.companyAmount ?? item?.company_fee,
                                )}
                              </TableCell>
                              <TableCell className="text-right font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                                {formatCurrency(
                                  item?.driverAmount ?? item?.driver_fee,
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground border rounded-md border-dashed">
                    <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">No booking history found.</p>
                    <p className="text-xs mt-1">
                      History from /driver/history will appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
