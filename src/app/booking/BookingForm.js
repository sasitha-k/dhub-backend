import { useState, useEffect } from "react"
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
  AlertCircle,
  Package,
  WalletCards
} from 'lucide-react'
import CustomerPicker from "@/components/common/dropdown/customer/CustomerPicker"
import DriverPicker from "@/components/common/dropdown/driver/DriverPicker"
import useBookingForm from "@/hooks/booking/useBookingForm"
import FormGroup from "@/components/common/FormGroup"
import DatePickerLine from "@/components/common/DatePickerLine"
import TimePicker from "@/components/common/TimePicker"
import DateTimePicker from "@/components/common/DateTimePicker"
import TextInput from "@/components/common/inputs/TextInput"
import SubmitButton from "@/components/common/buttons/SubmitButton"
import CloseButton from "@/components/common/buttons/CloseButton"
import { Switch } from "@/components/ui/switch"
import PackagePicker from "@/components/common/dropdown/package/PackagePicker"

export function BookingForm({
  sheetOpen,
  handleClose,
  isNewItem,
  selectedItem,
  setSheetOpen,
  fetchBookings,
  setActiveTab,
  handleEdit
}) {
  const {isLoading, errors, onSubmit, onUpdate, formData, setFormData, setErrors, onStartBooking, onComplete} = useBookingForm()
  const [isChecked, setIsChecked] = useState(false);
  // Load data when editing
  useEffect(() => {
    if (selectedItem && !isNewItem) {
      setFormData(selectedItem);
    } else {
      // Reset form for new booking
      setFormData({});
    }
    setErrors({});
    setIsChecked(false);
  }, [selectedItem, isNewItem, setFormData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSuccess = () => {
    setSheetOpen(false);
    fetchBookings();
  }

  const handleStartSuccess = () => {
    setIsChecked(true);
    // Navigate to ongoing tab and refresh data
    setActiveTab("ongoing");
    fetchBookings();
    // Keep the same booking open in the sheet
    // The booking status will be updated to "ongoing" so it will show the correct switch
  }

  const handleEndSuccess = () => {
    setIsChecked(true);
    // Navigate to completed tab and refresh data
    setActiveTab("completed");
    fetchBookings();
    // Keep the same booking open in the sheet
  }

  const handleStart = (checked) => {
    if (formData?.status === "pending") {
      if (checked) {
        onStartBooking({
          bookingId: formData?._id,
          odoStart: formData?.odoStart,
        },
        handleStartSuccess);
      }
    }
  }

  const handleEnd = (checked) => {
    if (formData?.status === "ongoing") {
      if (checked) {
        onComplete({
          bookingId: formData?._id,
          odoEnd: formData?.odoEnd,
        },
        handleEndSuccess);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!isNewItem) return onUpdate(formData?._id, onSuccess)
    onSubmit(onSuccess);
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
                  valueKey={"_id"}
                  onChange={(e) => setFormData({...formData, driver: e})}
                />
            </div>
            </div>
            <div className="space-y-1">
            <div className="flex items-center gap-2">
              <WalletCards className="w-4 h-4"/>
              <h3 className="font-semibold">Package</h3>
            </div>
            <div>
                <PackagePicker
                  id="package"
                  value={formData.method}
                  labelKey={"title"}
                  valueKey={"_id"}
                  onChange={(e) => setFormData({...formData, method: e})}
                />
            </div>
            </div>
          </div>
          <div className="flex items-end space-x-2 justify-end">
              {formData?.status === "pending" ? (
                <div className="flex items-center space-x-2">
                   <Switch checked={isChecked} onCheckedChange={handleStart}/>
                    <Label htmlFor="status-switch">
                      Start Booking
                    </Label>
               </div>
              ) : formData?.status === "ongoing" ? (
                  <div className="flex items-center space-x-2">
                   <Switch checked={isChecked} onCheckedChange={handleEnd}/>
                    <Label htmlFor="status-switch">
                      End Booking
                    </Label>
               </div>
              ) :
                null
              }
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
