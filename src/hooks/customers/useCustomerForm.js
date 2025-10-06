

import { createUser, updateUser } from '@/api/users';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function useCustomerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
    type: "customer",
    address:"",
    firstName: "",
    lastName: ""
});

  // Create an inventory
  const onSubmit = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await createUser(formData);
        if (res.status === 201) {
          toast.success("Customer added successfully");
          successCallBack();
        }
      } catch (error) {
        console.error(error);

        if (error.response?.status === 422) {
        const messages = error.response.data.errors || [];
        setErrors({ submit: messages.join(", ") });
        toast.error(messages.join(", "));
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

  // Update an existing inventory
  const onUpdate = useCallback(
    async (_id, successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await updateUser(formData);
        if (res.status === 200) {
          toast.success("Customer updated successfully");
          successCallBack();
        } else {
          throw new Error("Failed to update data");
        }
      } catch (error) {
        console.error(error);

        if (error.response?.status === 422) {
        const messages = error.response.data.errors || [];
        setErrors({ submit: messages.join(", ") });
        toast.error(messages.join(", "));
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
    setErrors
  };
}

