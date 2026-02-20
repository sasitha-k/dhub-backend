import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Phone, MapPin, Mail, Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import useDriverForm from "@/hooks/drivers/useDriverForm";
import FormGroup from "@/components/common/FormGroup";
import InlineValidationError from "@/components/common/errors/InlineValidationError";
import SubmitButton from "@/components/common/buttons/SubmitButton";
import CloseButton from "@/components/common/buttons/CloseButton";
import TextInput from "@/components/common/inputs/TextInput";
import FileInput from "@/components/common/inputs/FileInput";
import { uploadFile } from "@/api/upload";

export function DriverModal({
  sheetOpen,
  isNewItem,
  selectedItem,
  setSheetOpen,
  fetchDrivers,
  handleClose,
}) {
  const {
    isLoading,
    errors,
    onSubmit,
    onUpdate,
    formData,
    setFormData,
    setErrors,
  } = useDriverForm();

  const [uploadingField, setUploadingField] = useState(null);

  // Load data when editing
  useEffect(() => {
    if (selectedItem && !isNewItem) {
      setFormData(selectedItem);
    } else {
      // Reset form for new driver
      setFormData({
        userName: "",
        email: "",
        password: "",
        mobile: "",
        type: "driver",
        address: "",
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
        vehiclePhoto: null,
      });
    }
  }, [selectedItem, isNewItem, setFormData]);

  const onSuccess = () => {
    fetchDrivers();
    setSheetOpen(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (isNewItem) {
      await onSubmit(onSuccess);
    } else {
      await onUpdate(formData._id, onSuccess);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleFileChange = async (field, file) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, [field]: null }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
      return;
    }

    setUploadingField(field);
    setErrors((prev) => ({ ...prev, [field]: null }));
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({ ...prev, [field]: url }));
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Upload failed";
      setErrors((prev) => ({ ...prev, [field]: message }));
      toast.error(message);
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
      <DialogContent
        className="w-full md:max-w-[70%] max-h-[90vh] flex flex-col p-0 gap-0"
        closeButtonClassName="text-white"
      >
        <DialogHeader className="shrink-0 px-6 pr-12 pt-6 pb-4 border-b bg-primary text-primary-foreground rounded-md">
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {isNewItem ? "Add New Driver" : "Edit Driver"}
          </DialogTitle>
          <DialogDescription>
            {isNewItem
              ? "Fill in the details to add a new driver to the system."
              : "Update the driver information below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto min-h-0 px-6 pt-4">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormGroup id={"firstName"} errors={errors}>
                    <Label htmlFor="firstName">First Name *</Label>
                    <TextInput
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="Enter first name"
                    />
                    <InlineValidationError error={errors.firstName} />
                  </FormGroup>

                  <FormGroup id={"lastName"} errors={errors}>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <TextInput
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Enter last name"
                    />
                  </FormGroup>

                  <FormGroup id={"userName"} errors={errors}>
                    <Label htmlFor="userName">Username *</Label>
                    <TextInput
                      id="userName"
                      value={formData.userName}
                      onChange={(e) =>
                        handleInputChange("userName", e.target.value)
                      }
                      placeholder="Enter username"
                    />
                  </FormGroup>

                  <FormGroup id={"email"} errors={errors}>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <TextInput
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter email address"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup id={"mobile"} errors={errors}>
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <div className="relative">
                      <TextInput
                        id="mobile"
                        value={formData.mobile}
                        onChange={(e) =>
                          handleInputChange("mobile", e.target.value)
                        }
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup id={"licenseNumber"} errors={errors}>
                    <Label htmlFor="licenseNumber">License Number *</Label>
                    <div className="relative">
                      <TextInput
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          handleInputChange("licenseNumber", e.target.value)
                        }
                        placeholder="Enter license number"
                      />
                    </div>
                  </FormGroup>

                  <FormGroup id={"employmentType"} errors={errors}>
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select
                      value={formData.employmentType || "full_time"}
                      onValueChange={(value) =>
                        handleInputChange("employmentType", value)
                      }
                    >
                      <SelectTrigger id="employmentType" className="w-full">
                        <SelectValue placeholder="Select full time or part time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time">Full Time</SelectItem>
                        <SelectItem value="part_time">Part Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormGroup>

                  <FormGroup id={"address"} errors={errors}>
                    <Label htmlFor="address">Address *</Label>
                    <div className="relative">
                      <TextInput
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Enter complete address"
                      />
                    </div>
                  </FormGroup>

                  {isNewItem && (
                    <FormGroup id={"password"} errors={errors}>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <TextInput
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          placeholder="Enter password"
                        />
                      </div>
                    </FormGroup>
                  )}
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Vehicle Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormGroup id={"vehicleNumber"} errors={errors}>
                    <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                    <TextInput
                      id="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={(e) =>
                        handleInputChange("vehicleNumber", e.target.value)
                      }
                      placeholder="Enter vehicle number"
                    />
                    <InlineValidationError error={errors.vehicleNumber} />
                  </FormGroup>

                  <FormGroup id={"vehiclePhoto"} errors={errors}>
                    <Label htmlFor="vehiclePhoto">Vehicle Photo *</Label>
                    <FileInput
                      id="vehiclePhoto"
                      value={formData.vehiclePhoto}
                      onChange={(file) =>
                        handleFileChange("vehiclePhoto", file)
                      }
                      placeholder="Upload vehicle photo"
                      disabled={uploadingField === "vehiclePhoto"}
                    />
                    <InlineValidationError error={errors.vehiclePhoto} />
                  </FormGroup>
                </div>
              </div>

              {/* Document Images Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Identity Documents
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormGroup id={"passportImage"} errors={errors}>
                    <Label htmlFor="passportImage">Passport Image *</Label>
                    <FileInput
                      id="passportImage"
                      value={formData.passportImage}
                      onChange={(file) =>
                        handleFileChange("passportImage", file)
                      }
                      placeholder="Upload passport image"
                      disabled={uploadingField === "passportImage"}
                    />
                    <InlineValidationError error={errors.passportImage} />
                  </FormGroup>

                  <FormGroup id={"nicFrontImage"} errors={errors}>
                    <Label htmlFor="nicFrontImage">NIC Front Image *</Label>
                    <FileInput
                      id="nicFrontImage"
                      value={formData.nicFrontImage}
                      onChange={(file) =>
                        handleFileChange("nicFrontImage", file)
                      }
                      placeholder="Upload NIC front image"
                      disabled={uploadingField === "nicFrontImage"}
                    />
                    <InlineValidationError error={errors.nicFrontImage} />
                  </FormGroup>

                  <FormGroup id={"nicBackImage"} errors={errors}>
                    <Label htmlFor="nicBackImage">NIC Back Image *</Label>
                    <FileInput
                      id="nicBackImage"
                      value={formData.nicBackImage}
                      onChange={(file) =>
                        handleFileChange("nicBackImage", file)
                      }
                      placeholder="Upload NIC back image"
                      disabled={uploadingField === "nicBackImage"}
                    />
                    <InlineValidationError error={errors.nicBackImage} />
                  </FormGroup>
                </div>
              </div>

              {/* Driving License Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Driving License
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormGroup id={"drivingLicenseFrontImage"} errors={errors}>
                    <Label htmlFor="drivingLicenseFrontImage">
                      Driving License Front Image *
                    </Label>
                    <FileInput
                      id="drivingLicenseFrontImage"
                      value={formData.drivingLicenseFrontImage}
                      onChange={(file) =>
                        handleFileChange("drivingLicenseFrontImage", file)
                      }
                      placeholder="Upload driving license front image"
                      disabled={uploadingField === "drivingLicenseFrontImage"}
                    />
                    <InlineValidationError
                      error={errors.drivingLicenseFrontImage}
                    />
                  </FormGroup>

                  <FormGroup id={"drivingLicenseBackImage"} errors={errors}>
                    <Label htmlFor="drivingLicenseBackImage">
                      Driving License Back Image *
                    </Label>
                    <FileInput
                      id="drivingLicenseBackImage"
                      value={formData.drivingLicenseBackImage}
                      onChange={(file) =>
                        handleFileChange("drivingLicenseBackImage", file)
                      }
                      placeholder="Upload driving license back image"
                      disabled={uploadingField === "drivingLicenseBackImage"}
                    />
                    <InlineValidationError
                      error={errors.drivingLicenseBackImage}
                    />
                  </FormGroup>
                </div>
              </div>

              {/* Address Verification Documents Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Verification Documents
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormGroup id={"electricityBill1"} errors={errors}>
                    <Label htmlFor="electricityBill1">
                      Electricity Bill 1 *
                    </Label>
                    <FileInput
                      id="electricityBill1"
                      value={formData.electricityBill1}
                      onChange={(file) =>
                        handleFileChange("electricityBill1", file)
                      }
                      placeholder="Upload first electricity bill"
                      disabled={uploadingField === "electricityBill1"}
                    />
                    <InlineValidationError error={errors.electricityBill1} />
                  </FormGroup>

                  <FormGroup id={"electricityBill2"} errors={errors}>
                    <Label htmlFor="electricityBill2">
                      Electricity Bill 2 *
                    </Label>
                    <FileInput
                      id="electricityBill2"
                      value={formData.electricityBill2}
                      onChange={(file) =>
                        handleFileChange("electricityBill2", file)
                      }
                      placeholder="Upload second electricity bill"
                      disabled={uploadingField === "electricityBill2"}
                    />
                    <InlineValidationError error={errors.electricityBill2} />
                  </FormGroup>

                  <FormGroup id={"gramasewakaCertificate"} errors={errors}>
                    <Label htmlFor="gramasewakaCertificate">
                      Gramasewaka Certificate *
                    </Label>
                    <FileInput
                      id="gramasewakaCertificate"
                      value={formData.gramasewakaCertificate}
                      onChange={(file) =>
                        handleFileChange("gramasewakaCertificate", file)
                      }
                      placeholder="Upload Gramasewaka certificate"
                      disabled={uploadingField === "gramasewakaCertificate"}
                    />
                    <InlineValidationError
                      error={errors.gramasewakaCertificate}
                    />
                  </FormGroup>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="shrink-0 flex flex-row gap-4 justify-end px-6 py-4 border-t bg-background">
            <DialogClose asChild>
              <CloseButton onClick={handleClose} />
            </DialogClose>
            <SubmitButton
              onClick={handleSubmit}
              isNewItem={isNewItem}
              isLoading={isLoading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
