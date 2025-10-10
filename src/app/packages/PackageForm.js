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
import PayBasisPicker from '@/components/packages/PayBasisPicker'

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
        title: "",
        description: "",
        unit: "",
        pricing: {
          minimum: 0,
          minimumCharge: 0,
          perUnitCharge: 0
        }
      });
    }
  }, [selectedItem, isNewItem, setFormData]);

   const onSuccess = () => {
    fetchPackages();
     setSheetOpen(false);
     setFormData({
       title: "",
       description: "",
       unit: "",
       pricing: {
         minimum: 0,
         minimumCharge: 0,
         perUnitCharge: 0
       }
     });
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
            <Package className="h-5 w-5" />
            {isNewItem ? 'Add New Package' : 'Edit Package'}
          </SheetTitle>
          <SheetDescription>
            {isNewItem 
              ? 'Fill in the details to create a new package service.' 
              : 'Update the package information below.'
            }
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
            {/* Package Information Section */}
            <div className="space-y-4">
              <div className="grid gap-6">
                <FormGroup id={"title"} errors={errors}>
                  <Label htmlFor="title">Package Title *</Label>
                  <TextInput
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter package title"
                  />
                </FormGroup>

                <FormGroup id={"description"} errors={errors}>
                  <Label htmlFor="description">Description *</Label>
                  <TextInput
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter package description"
                  />
                </FormGroup>

                <FormGroup id={"unit"} errors={errors}>
                  <Label htmlFor="unit">Billing Unit *</Label>
                <PayBasisPicker
                  value={formData?.unit}
                  onChange={(e) => handleInputChange('unit', e) }/>
                </FormGroup>

                {/* Pricing Section */}
                <div className="border-t pt-4 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-4 w-4" />
                    <h4 className="font-medium">Pricing</h4>
                  </div>
                  
                  <FormGroup id={"minimum"} errors={errors}>
                    <Label htmlFor="minimum">Minimum Units *</Label>
                    <TextInput
                      id="minimum"
                      type="number"
                      min="1"
                      value={formData.pricing?.minimum || 1}
                      onChange={(e) => updatePricing({ minimum: parseInt(e.target.value) || 1 })}
                      placeholder="Enter minimum units"
                    />
                  </FormGroup>

                  <FormGroup id={"minimumCharge"} errors={errors}>
                    <Label htmlFor="minimumCharge">Minimum Charge *</Label>
                    <TextInput
                      id="minimumCharge"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.pricing?.minimumCharge || 0}
                      onChange={(e) => updatePricing({ minimumCharge: parseFloat(e.target.value) || 0 })}
                      placeholder="Enter minimum charge amount"
                    />
                  </FormGroup>

                  <FormGroup id={"perUnitCharge"} errors={errors}>
                    <Label htmlFor="perUnitCharge">Per Unit Charge *</Label>
                    <TextInput
                      id="perUnitCharge"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.pricing?.perUnitCharge || 0}
                      onChange={(e) => updatePricing({ perUnitCharge: parseFloat(e.target.value) || 0 })}
                      placeholder="Enter charge per unit"
                    />
                  </FormGroup>
                </div>
            </div>
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
