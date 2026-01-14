import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Phone, 
  MapPin, 
  Mail,
  Lock,
  AlertCircle
} from 'lucide-react'
import useDriverForm from "@/hooks/drivers/useDriverForm"
import FormGroup from "@/components/common/FormGroup"
import InlineValidationError from "@/components/common/errors/InlineValidationError"
import SubmitButton from '@/components/common/buttons/SubmitButton'
import CloseButton from '@/components/common/buttons/CloseButton'
import TextInput from '@/components/common/inputs/TextInput'

export function DriverModal({
  sheetOpen,
  isNewItem,
  selectedItem,
  setSheetOpen,
  fetchDrivers,
  handleClose
}) {
  const {isLoading, errors, onSubmit, onUpdate, formData, setFormData, setErrors} = useDriverForm()

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
        lastName: ""
      });
    }
  }, [selectedItem, isNewItem, setFormData]);

   const onSuccess = () => {
    fetchDrivers();
     setSheetOpen(false);
     setFormData({});
  }

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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  return (
    <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
      <DialogContent className="w-full md:max-w-[70%] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {isNewItem ? 'Add New Driver' : 'Edit Driver'}
          </DialogTitle>
          <DialogDescription>
            {isNewItem 
              ? 'Fill in the details to add a new driver to the system.' 
              : 'Update the driver information below.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormGroup id={"firstName"} errors={errors}>
                  <Label htmlFor="firstName">First Name *</Label>
                  <TextInput
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                  <InlineValidationError error={errors.firstName} />
                </FormGroup>

                <FormGroup id={"lastName"} errors={errors}>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <TextInput
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </FormGroup>

              <FormGroup id={"userName"} errors={errors}>
                <Label htmlFor="userName">Username *</Label>
                <TextInput
                  id="userName"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
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
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    placeholder="Enter license number"
                  />
                </div>
              </FormGroup>

              <FormGroup id={"address"} errors={errors}>
                <Label htmlFor="address">Address *</Label>
                <div className="relative">
                  <TextInput
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
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
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                </FormGroup>
              )}
            </div>
            {/* Submit Error */}
            {errors.submit && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-row gap-4 justify-end">
            <DialogClose asChild>
              <CloseButton onClick={handleClose}/>
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
  )
}
