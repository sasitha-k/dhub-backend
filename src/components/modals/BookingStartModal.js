import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import useBookingForm from "@/hooks/booking/useBookingForm";
import TextInput from "../common/inputs/TextInput";
import { Label } from "../ui/label";

export default function BookingStartModal({
  isOpen,
  setIsOpen,
  onClose,
  selectedItem,
}) {
  const { onStartBooking, onComplete, isLoading } = useBookingForm();
  const [formData, setFormData] = useState({
    bookingId: "",
    odoStart: "",
    odoEnd: "",
    status: "",
  });

    
    // console.log('bb', selectedItem);
  // 🧠 Populate form data when modal opens or item changes
  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem)}
  }, [selectedItem]);

  // 🧩 Handle start/complete
  const handleComplete = async () => {
    try {
      if (formData.status === "pending") {
        await onStartBooking({
          bookingId: formData.bookingId,
          odoStart: formData.odoStart,
        });
      } else {
        await onComplete({
          bookingId: formData.bookingId,
          odoEnd: formData.odoEnd,
        });
      }

      // ✅ Close and reset after success
      onClose?.();
      setFormData({ bookingId: "", odoStart: "", odoEnd: "", status: "" });
    } catch (err) {
      console.error("Booking action failed:", err);
    }
  };

  const isPending = formData.status === "pending";

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader data-id="confirm-message">
          <AlertDialogTitle>
            {isPending ? "Start Booking" : "Complete Booking"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            <span className="space-y-2">
              <Label>{isPending ? "Odo Start" : "Odo End"}</Label>
              <TextInput
                value={isPending ? formData.odoStart : formData.odoEnd}
                placeholder={
                  isPending ? "Enter start meter" : "Enter end meter"
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [isPending ? "odoStart" : "odoEnd"]: e.target.value,
                  })
                }
              />
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-gray-500 text-white border-none hover:text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={onClose}
            data-id="confirmation-model-cancel-button"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary text-white hover:text-primary border-none px-4 py-2 rounded hover:bg-background"
            onClick={handleComplete}
            disabled={isLoading}
            data-id="confirmation-model-confirm-button"
          >
            {isLoading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
