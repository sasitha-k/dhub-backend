import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Separator } from "@/components/ui/separator"
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
        type: "driver",
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
              ? 'Fill in the details to add a new driver to the system.' 
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
                    className={errors.firstName ? 'border-red-500' : ''}
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
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                </FormGroup>

              <FormGroup id={"userName"} errors={errors}>
                <Label htmlFor="userName">Username *</Label>
                <TextInput
                  id="userName"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  placeholder="Enter username"
                  className={errors.userName ? 'border-red-500' : ''}
                />
              </FormGroup>

              <FormGroup id={"email"} errors={errors}>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <TextInput
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
              </FormGroup>

               <FormGroup id={"mobile"} errors={errors}>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <TextInput
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter mobile number"
                    className={`pl-10 ${errors.mobile ? 'border-red-500' : ''}`}
                  />
                </div>
              </FormGroup>

              <FormGroup id={"licenseNumber"} errors={errors}>
                <Label htmlFor="licenseNumber">License Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <TextInput
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                    placeholder="Enter licenseNumber number"
                    className={`pl-10 ${errors.licenseNumber ? 'border-red-500' : ''}`}
                  />
                </div>
              </FormGroup>

              <FormGroup id={"address"} errors={errors}>
                <Label htmlFor="address">Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <TextInput
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    className={`pl-10 ${errors.address ? 'border-red-500' : ''}`}
                  />
                </div>
              </FormGroup>

               {isNewItem && (
                <FormGroup id={"password"} errors={errors}>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <TextInput
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
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
