
import { completeBooking, createBooking, startBooking, updateBooking } from '@/api/booking';
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


  // Update an existing inventory
  const onUpdate = useCallback(
    async (_id, successCallBack) => {
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
  async (params, handleSuccess) => {
    setIsLoading(true);
    setErrors({});
    try {
      const res = await startBooking(params);
      if (res.status === 200) {
        toast.success(res.message || "Booking started successfully");
        handleSuccess();
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
  async (params, handleSuccess) => {
    setIsLoading(true);
    setErrors({});
    try {
      const res = await completeBooking(params);
      if (res.status === 200) {
        toast.success(res.message || "Booking completed successfully");  
        handleSuccess();
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
    onUpdate,
    setErrors,
    onStartBooking,
    onComplete
  };
}

