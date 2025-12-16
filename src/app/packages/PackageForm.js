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


export function PackageForm({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="w-full md:max-w-[80%] overflow-y-auto">
        <SheetHeader>
          <div className='flex justify-between items-center gap-4'>
             <SheetTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {isNewItem ? 'Add New Package' : 'Edit Package'}
            </SheetTitle>
            <div className='flex items-center gap-2 pr-10'>
              <Checkbox
              checked={formData.isAvailable}
              onCheckedChange={() => setFormData(prev => ({...prev, isAvailable: !formData.isAvailable}))}
              />
              <Label>Is Available</Label>
            </div>
         </div>
          <SheetDescription>
            {isNewItem
              ? 'Fill in the details to create a new package service.' 
              : 'Update the package information below.'
            }
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
            {/* Package Information Section */}
            {/* type section */}
                <div className="border-t pt-4 space-y-4">
                  <FormGroup id={"packageType"} errors={errors}>
                    <Label htmlFor="packageType">Package Type</Label>
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
                      <Label htmlFor="packageName">Package Name *</Label>
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
                      <Label htmlFor="pickupOutsideColomboFee">Pickup Outside Colombo Fee *</Label>
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
                
          <SheetFooter className="flex flex-row gap-4 justify-end mt-16">
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
