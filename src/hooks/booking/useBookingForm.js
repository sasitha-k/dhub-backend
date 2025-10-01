
import { createBooking, updateBooking } from '@/api/booking';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function useBookingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  // Create an inventory
  const onSubmit = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await createBooking(formData);
        if (res.status === 201) {
          toast.success(res.message);
          successCallBack();
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

  // Update an existing inventory
  const onUpdate = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await updateBooking(formData); 
        if (res.status === 200) {
          toast.success(res.message);
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

  return {
    isLoading,
    errors,
    formData,
    setFormData,
    onSubmit,
    onUpdate,
    setErrors
  };
}

