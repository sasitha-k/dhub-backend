import React, { useEffect } from 'react'
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { 
  User, 
  Phone, 
  MapPin, 
  Mail,
  Lock,
  AlertCircle
} from 'lucide-react'
import FormGroup from "@/components/common/FormGroup"
import InlineValidationError from "@/components/common/errors/InlineValidationError"
import SubmitButton from '@/components/common/buttons/SubmitButton'
import CloseButton from '@/components/common/buttons/CloseButton'
import TextInput from '@/components/common/inputs/TextInput'
import useCustomerForm from '@/hooks/customers/useCustomerForm'

export function CustomerForm({
  sheetOpen,
  isNewItem,
  selectedItem,
  setSheetOpen,
  fetchCustomers,
  handleClose
}) {
  const {isLoading, errors, onSubmit, onUpdate, formData, setFormData, setErrors} = useCustomerForm()

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
        type: "customer",
        address: "",
        firstName: "",
        lastName: ""
      });
    }
  }, [selectedItem, isNewItem, setFormData]);
    
    const onSuccess = () => {
    fetchCustomers();
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
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="w-full sm:max-w-md  overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
            {isNewItem ? 'Add New Customer' : 'Edit Customer'}
          </SheetTitle>
          <SheetDescription>
            {isNewItem 
              ? 'Fill in the details to add a new customer to the system.' 
              : 'Update the customer information below.'
            }
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="grid gap-6">
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
                <TextInput
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
              </FormGroup>

               <FormGroup id={"mobile"} errors={errors}>
                <Label htmlFor="mobile">Mobile Number *</Label>
               <TextInput
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter mobile number"
                  />
              </FormGroup>

              <FormGroup id={"licenseNumber"} errors={errors}>
                <Label htmlFor="licenseNumber">License Number *</Label>
                 <TextInput
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    placeholder="Enter licenseNumber number"
                  />
              </FormGroup>

              <FormGroup id={"address"} errors={errors}>
                <Label htmlFor="address">Address *</Label>
                  <TextInput
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter complete address"
                  />
              </FormGroup>

               {isNewItem && (
                <FormGroup id={"password"} errors={errors}>
                  <Label htmlFor="password">Password *</Label>
                  <TextInput
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                    />
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

          <SheetFooter className="flex flex-row gap-4 justify-end">
            <SheetClose asChild>
              <CloseButton onClick={handleClose}/>
            </SheetClose>
            <SubmitButton
              onClick={handleSubmit}
              isNewItem={isNewItem}
              isLoading={isLoading}
            />
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
