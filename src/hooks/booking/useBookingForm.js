
import { completeBooking, createBooking, createCreditBooking, startBooking, updateBooking } from '@/api/booking';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function useBookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const onSubmit = useCallback(
  async (successCallBack) => {
    setIsLoading(true);
    setErrors({});
    try {
      const res = await createBooking(formData);
      if (res.status === 201) {
        toast.success(res.message || "Booking created successfully");
        successCallBack();
      }
    } catch (error) {
      // console.error("Booking create error:", error.response?.data || error);

      if (error.response && error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          setErrors(validationErrors);
        } else {
          setErrors({ submit: 'Failed to submit the form' });
        }
      } finally {
        setIsLoading(false);
      }
  },
  [formData]
);

  /** Create a completed booking with the given fee (credit booking). No start/complete flow. */
  const onSubmitCredit = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      const fee = formData.fee != null && formData.fee !== '' ? parseFloat(formData.fee) : NaN;
      if (isNaN(fee) || fee < 0) {
        setErrors({ fee: 'Fee is required and must be a valid amount' });
        toast.error('Please enter a valid fee for credit booking');
        setIsLoading(false);
        return;
      }
      try {
        const payload = { ...formData, fee, paymentMethod: 'credit' };
        const res = await createCreditBooking(payload);
        if (res.status === 201) {
          toast.success(res.message || "Credit booking created successfully");
          successCallBack();
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          setErrors(validationErrors);
        } else {
          setErrors({ submit: 'Failed to create credit booking' });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  // Update an existing inventory
  const onUpdate = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await updateBooking(formData); 
        if (res.status === 200) {
          toast.success(res.message || "Booking updated successfully");
          successCallBack();
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 422) {
          const validationErrors = error.response.data.errors;
          setErrors(validationErrors);
          toast.error("Failed to update data")
        } else {
          setErrors({ submit: 'Failed to submit the form' });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  const onStartBooking = useCallback(
  async (params, successCallBack) => {
    setIsLoading(true);
    setErrors({});
    try {
      const res = await startBooking(params);
      if (res.status === 200) {
        toast.success(res.message || "Booking started successfully");
        successCallBack();
      }
    } catch (error) {
      // console.error("Booking create error:", error.response?.data || error);
      if (error.response?.status === 422) {
        const messages = error.response.data.errors || [];
        setErrors({ submit: messages.join(", ") });
        toast.error(error.response.data.message);
      } else {
        setErrors({ submit: "Failed to submit the form" });
        toast.error("Failed to submit the form");
      }
    } finally {
      setIsLoading(false);
    }
  },
  [formData]
  );
  
  const onComplete = useCallback(
  async (params, successCallBack) => {
    setIsLoading(true);
    setErrors({});
    try {
      const res = await completeBooking(params);
      if (res.status === 200) {
        toast.success(res.message || "Booking completed successfully");  
        successCallBack();
      }
    } catch (error) {
      // console.error("Booking create error:", error.response?.data || error);

      if (error.response?.status === 422) {
        const messages = error.response.data.errors || [];
        setErrors({ submit: messages.join(", ") });
        toast.error(error.response.data.message);
      } else {
        setErrors({ submit: "Failed to submit the form" });
        toast.error("Failed to submit the form");
      }
    } finally {
      setIsLoading(false);
    }
  },
  [formData]
);

  return {
    isLoading,
    errors,
    formData,
    setFormData,
    onSubmit,
    onSubmitCredit,
    onUpdate,
    setErrors,
    onStartBooking,
    onComplete
  };
}

