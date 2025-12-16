"use client";

import { createPackage, updatePackage } from '@/api/packages';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function usePackageForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  // Create a package
  const onSubmit = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await createPackage(formData);
          if (res.status === 201) {
            toast.success(res.message || "Package created successfully");
          successCallBack();
        }
      } catch (error) {
        console.error(error);

         if (error.response?.status === 422) {
        const messages = error.response.data.errors || [];
        setErrors({ submit: messages.join(", ") });
        toast.error('Please fill all the required fields');
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

  // Update an existing package
  const onUpdate = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const res = await updatePackage({ ...formData});
        if (res.status === 200) {
          toast.success(res.message || "Package updated successfully");
          successCallBack();
        } else {
          throw new Error("Failed to update package");
        }
      } catch (error) {
        console.error(error);

        if (error.response?.status === 422) {
          const messages = error.response.data.errors || [];
          setErrors({ submit: messages.join(", ") });
          toast.error(error.response.data.message);
        } else {
          setErrors({ submit: "Failed to update package" });
          toast.error("Failed to update package");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  // Update form data
  const updateFormData = (updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Update pricing data
  const updatePricing = (pricingUpdates) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        ...pricingUpdates
      }
    }));
  };

  return {
    isLoading,
    errors,
    formData,
    setFormData,
    updateFormData,
    updatePricing,
    onSubmit,
    onUpdate,
    setErrors
  };
}
