import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Calendar, 
  Car, 
  Bike, 
  CreditCard,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react'
import CustomerPicker from "@/components/common/dropdown/customer/CustomerPicker"
import DriverPicker from "@/components/common/dropdown/driver/DriverPicker"
import useBookingForm from "@/hooks/booking/useBookingForm"
import FormGroup from "@/components/common/FormGroup"
import DatePickerLine from "@/components/common/DatePickerLine"
import TimePicker from "@/components/common/TimePicker"
import DateTimePicker from "@/components/common/DateTimePicker"
import TextInput from "@/components/common/inputs/TextInput"

export function BookingForm({
  sheetOpen,
  handleClose,
  isNewItem,
  selectedItem,
  setSheetOpen,
  fetchBookings
}) {
  const {isLoading, errors, onSubmit, onUpdate, formData, setFormData, setErrors} = useBookingForm()

  // Load data when editing
  useEffect(() => {
    if (selectedItem && !isNewItem) {
      setFormData(selectedItem);
    } else {
      // Reset form for new booking
      setFormData({});
    }
    setErrors({});
  }, [selectedItem, isNewItem, setFormData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
   
  };


  const onSuccess = () => {
    setSheetOpen();
    fetchBookings();
  }
 

  const handleSubmit = (e) => {
    e.preventDefault();
    
  if(!isNewItem) return onUpdate(formData?._id, onSuccess)
    onSubmit(onSuccess);
    // Here you would typically make an API call
    console.log('Booking data:', formData);
    // Close the form
    setSheetOpen(false);
  };


  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {isNewItem ? <FileText className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {isNewItem ? "Create New Booking" : "Update Booking"}
          </SheetTitle>
          <SheetDescription>
            {isNewItem 
              ? "Fill in the details below to create a new booking." 
              : "Update the booking information below."
            }
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4 w-full">
          {/* Customer Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <h3 className="font-semibold">Customer</h3>
            </div>
            <div>
                <CustomerPicker
                  error={errors?.customer}
                  value={formData.customer}
                  labelKey={"firstName"}
                  valueKey={"_id"}
                  onChange={(e) => setFormData({...formData, customer: e})}
                />
            </div>
            </div>
            <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <h3 className="font-semibold">Driver</h3>
            </div>
            <div>
                <DriverPicker
                  id="driver"
                  value={formData.driver}
                  labelKey={"firstName"}
                  valueKey={"firstName"}
                  onChange={(e) => setFormData({...formData, driver: e})}
                />
            </div>
          </div>
          </div>
          <Separator />
          {/* Booking Information */}
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <h3 className="font-semibold">Booking Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <FormGroup id={"date"} errors={errors}>
                <Label htmlFor="date">Date *</Label>
                <DatePickerLine
                  error={errors?.date}
                  value={formData?.date}
                  onChange={(d) => setFormData({...formData, date: d})}
                  // disabled={disabled}
                  errors={errors}
                />
    
              </FormGroup>
             <FormGroup id={"time"} errors={errors}>
                <Label htmlFor="time"> Time *</Label>
                <TimePicker
                  error={errors?.time}
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </FormGroup>
              <FormGroup id={"pickupLocation"} errors={errors}>
                <Label htmlFor="pickupLocation">Pickup Location *</Label>
                <TextInput
                  id="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  placeholder="Enter pickup location"
                />
              </FormGroup>
              <div className="w-full grid grid-cols-2 gap-4">
                <FormGroup>
                <Label htmlFor="from">From *</Label>
                <TextInput
                  id="from"
                  value={formData.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Enter city"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="from">To *</Label>
                <TextInput
                  id="to"
                  value={formData.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  placeholder="Enter city"
                />
              </FormGroup>
              </div>
              <FormGroup id={"tripStartAt"} errors={errors}>
                <Label htmlFor="tripStartAt">Trip Start At *</Label>
                <DateTimePicker
                  error={errors?.tripStartAt}
                  value={formData?.tripStartAt}
                  onChange={(d) => setFormData({...formData, tripStartAt: d})}
                  // disabled={disabled}
                  errors={errors}
                />
    
              </FormGroup>
              <FormGroup id={"tripEndAt"} errors={errors}>
                <Label htmlFor="tripEndAt">Trip End At *</Label>
                <DateTimePicker
                  error={errors?.tripEndAt}
                  value={formData?.tripEndAt}
                  onChange={(d) => setFormData({...formData, tripEndAt: d})}
                  // disabled={disabled}
                  errors={errors}
                />
    
              </FormGroup>
              <FormGroup id={"odoStart"} errors={errors}>
                <Label htmlFor="odoStart">Odo Meter Start *</Label>
                <TextInput
                  id="odoStart"
                  value={formData.odoStart}
                  onChange={(e) => setFormData({...formData, odoStart: e.target.value})}
                  placeholder="Enter odo meter"
                />
              </FormGroup>
               <FormGroup id={"odoEnd"} errors={errors}>
                <Label htmlFor="odoEnd">Odo Meter End *</Label>
                <TextInput
                  id="odoEnd"
                  value={formData.odoEnd}
                  onChange={(e) => setFormData({...formData, odoEnd: e.target.value})}
                  placeholder="Enter odo meter"
                />
              </FormGroup>
            </div>
            <FormGroup id={"description"} errors={errors}>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter any additional description..."
                rows={3}
              />
              </FormGroup>
            </div>
          <SheetFooter className="flex gap-2">
            <Button onClick={handleSubmit} type="submit" className="flex-1">
              {isNewItem ? "Create Booking" : "Update Booking"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
