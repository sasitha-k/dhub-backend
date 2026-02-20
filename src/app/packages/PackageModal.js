import React, { useEffect } from 'react'
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
import { 
  Package, 
  DollarSign, 
  Clock,
  AlertCircle
} from 'lucide-react'
import usePackageForm from "@/hooks/packages/usePackageForm"
import FormGroup from "@/components/common/FormGroup"
import SubmitButton from '@/components/common/buttons/SubmitButton'
import CloseButton from '@/components/common/buttons/CloseButton'
import TextInput from '@/components/common/inputs/TextInput'
import { Checkbox } from '@/components/ui/checkbox'
import PackageTypePicker from '@/components/common/dropdown/package/PackageTypePicker'
import DayTimeTab from '@/components/packages/package-tabs/DayTimeTab'
import NightDistanceTab from '@/components/packages/package-tabs/NightDistanceTab'
import NightHourlyTab from '@/components/packages/package-tabs/NightHourlyTab'
import AirportDropTab from '@/components/packages/package-tabs/AirportDropTab'
import LongTripTab from '@/components/packages/package-tabs/LongTripTab'
import CustomTab from '@/components/packages/package-tabs/CustomTab'
import VehiclePickupTab from '@/components/packages/package-tabs/VehiclePickupTab'
import PackageCategoryPicker from '@/components/common/dropdown/package/PackageCategoryPicker'


export function PackageModal({
  sheetOpen,
  isNewItem,
  selectedItem,
  setSheetOpen,
  fetchPackages,
  handleClose
}) {
  const {isLoading, errors, onSubmit, onUpdate, formData, setFormData, setErrors, updatePricing} = usePackageForm()

  // Load data when editing
  useEffect(() => {
    if (selectedItem && !isNewItem) {
      setFormData(selectedItem);
    } else {
      // Reset form for new package
      setFormData({
        packageType: '',
        packageName: '',
        basePrice: '',
        maxDurationHours: '',
        pickupOutsideColomboFee: ''
      });
    }
  }, [selectedItem, isNewItem, setFormData]);

   const onSuccess = () => {
    fetchPackages();
     setSheetOpen(false);
     setFormData({});
  }

  const handleSubmit = async () => {
      setFormData({});
    setErrors({});
    
    if (isNewItem) {
      await onSubmit(onSuccess);
    } else {
      await onUpdate(onSuccess);
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
      <DialogContent
        className="w-full md:max-w-[80%] max-h-[90vh] flex flex-col p-0 gap-0"
        closeButtonClassName="text-white"
      >
        <DialogHeader className="shrink-0 px-6 pr-12 pt-6 pb-4 border-b bg-primary text-primary-foreground rounded-md">
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {isNewItem ? 'Add New Package' : 'Edit Package'}
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/90">
            {isNewItem
              ? 'Fill in the details to create a new package service.' 
              : 'Update the package information below.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto min-h-0 px-6 pt-4 space-y-6">
            <div className="flex items-center gap-2">
              <Checkbox
                id="isAvailable"
                checked={formData.isAvailable}
                onCheckedChange={() => setFormData(prev => ({...prev, isAvailable: !formData.isAvailable}))}
              />
              <Label htmlFor="isAvailable">Is Available</Label>
            </div>
            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <FormGroup id={"category"} errors={errors}>
                    <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                    <PackageCategoryPicker
                      id="category"
                      value={formData?.packageCategory}
                      onChange={(e) => setFormData(prev => ({...prev, packageCategory: e}))}
                      placeholder="Select category"
                    />
                  </FormGroup>
                  <FormGroup id={"packageType"} errors={errors}>
                    <Label htmlFor="packageType">Package Type <span className="text-red-500">*</span></Label>
                    <PackageTypePicker
                      id="packageType"
                      value={formData?.packageType}
                      onChange={(e) => setFormData(prev => ({...prev, packageType: e}))}
                      placeholder="Select package type"
                    />
                </FormGroup>
             
                </div>

           
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <FormGroup id={"packageName"} errors={errors}>
                      <Label htmlFor="packageName">Package Name <span className="text-red-500">*</span></Label>
                      <TextInput
                        id="packageName"
                        value={formData.packageName}
                        onChange={(e) => handleInputChange('packageName', e.target.value)}
                        placeholder="Enter package name"
                      />
                    </FormGroup>
                    <FormGroup id={"basePrice"} errors={errors}>
                      <Label htmlFor="basePrice">Base Price</Label>
                      <TextInput
                        id="basePrice"
                        value={formData.basePrice}
                        onChange={(e) => handleInputChange('basePrice', e.target.value)}
                        placeholder="Enter package base price"
                      />
                    </FormGroup>
                    <FormGroup id={"maxDurationHours"} errors={errors}>
                      <Label htmlFor="maxDurationHours">Max Duration Hours</Label>
                    <TextInput
                      id="maxDurationHours"
                      placeholder="Enter maximum duration hours"
                      value={formData?.maxDurationHours}
                      onChange={(e) => handleInputChange('maxDurationHours', e.target.value)}/>
                  </FormGroup>
                  <FormGroup id={"pickupOutsideColomboFee"} errors={errors}>
                      <Label htmlFor="pickupOutsideColomboFee">Pickup Outside Colombo Fee <span className="text-red-500">*</span></Label>
                    <TextInput
                        id="pickupOutsideColomboFee"
                        placeholder="Enter pickup outside colombo fee"
                        value={formData?.pickupOutsideColomboFee}
                        onChange={(e) => handleInputChange('pickupOutsideColomboFee', e.target.value)}/>
                    </FormGroup>
                  </div>
                {formData.packageType === 'DAY_TIME' && (
                  <DayTimeTab
                    formData={formData}
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                  />
                )}
                {formData.packageType === 'NIGHT_DISTANCE' && (
                  <NightDistanceTab
                    formData={formData}
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                  />
                )}

                {formData.packageType === 'NIGHT_HOURLY' && (
                  <NightHourlyTab
                    formData={formData}
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                  />
                )}

                {formData.packageType === 'AIRPORT_DROP' && (
                  <AirportDropTab
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange}
                  />
                )}

                {formData.packageType === 'LONG_TRIP' && (
                  <LongTripTab
                    formData={formData} 
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                  />
          )}
          
          {formData.packageType === 'CUSTOM' && (
                  <CustomTab
                    formData={formData}
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                  />
                )}

          {formData.packageType === 'VEHICLE_PICKUP' && (
                  <VehiclePickupTab
                    formData={formData}
                    errors={errors} 
                    handleInputChange={handleInputChange} 
                  />
                )}
          </div>

          <DialogFooter className="shrink-0 flex flex-row gap-4 justify-end px-6 py-4 border-t bg-background">
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
