

import { settleDriverBalance } from '@/api/drivers';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function useDriverBalanceSettle() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    driverId: "",
    amount: ""
});

  const onSubmit = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await settleDriverBalance(formData);
        if (res.status === 200) {
          toast.success(res.message);
          successCallBack();
        }
      } catch (error) {
        console.error(error);

        if (error.response?.status === 422) {
          const message = error.response.data.message || [];
          setErrors(message);
          toast.error(message);
        } else {
          setErrors(message);
          toast.error(message);
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
    setErrors
  };
}

