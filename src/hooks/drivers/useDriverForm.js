

import { createUser, updateUser } from '@/api/users';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function useDriverForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
    type: "driver",
    address:"",
    firstName: "",
    lastName: "",
    licenseNumber: "",
    employmentType: "full_time",
    passportImage: null,
    drivingLicenseFrontImage: null,
    drivingLicenseBackImage: null,
    nicFrontImage: null,
    nicBackImage: null,
    electricityBill1: null,
    electricityBill2: null,
    gramasewakaCertificate: null,
    vehicleNumber: "",
    vehiclePhoto: null
});

  // Helper function to convert formData to FormData if files are present
  const prepareFormData = (data) => {
    const hasFiles = Object.values(data).some(value => value instanceof File);
    
    if (hasFiles) {
      const formDataObj = new FormData();
      Object.keys(data).forEach(key => {
        const value = data[key];
        if (value !== null && value !== undefined && value !== "") {
          if (value instanceof File) {
            formDataObj.append(key, value);
          } else {
            formDataObj.append(key, value);
          }
        }
      });
      return formDataObj;
    }
    return data;
  };

  // Create a driver
  const onSubmit = useCallback(
    async (successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const dataToSend = prepareFormData(formData);
        const res = await createUser(dataToSend);
        if (res.status === 201) {
          toast.success(res.message || "Driver added successfully");
          successCallBack();
        }
      } catch (error) {
        console.error(error);

        if (error.response?.status === 422) {
          const messages = error.response.data.errors || [];
          setErrors({ submit: messages.join(", ") });
          toast.error(messages.join(", "));
        } else {
          setErrors({ submit: "Failed to create driver" });
          toast.error("Failed to create driver");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  // Update an existing driver
  const onUpdate = useCallback(
    async (_id, successCallBack) => {
      setIsLoading(true);
      setErrors({});
      try {
        const dataToSend = prepareFormData({ ...formData, _id });
        const res = await updateUser(dataToSend);
        if (res.status === 200) {
          toast.success(res.message || "Driver updated successfully");
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
          setErrors({ submit: "Failed to update driver" });
          toast.error("Failed to update driver");
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

  return {
    isLoading,
    errors,
    formData,
    setFormData,
    updateFormData,
    onSubmit,
    onUpdate,
    setErrors
  };
}

