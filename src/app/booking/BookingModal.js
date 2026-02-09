import StatusBadge from "@/components/common/badges/StatusBadge"
import CloseButton from "@/components/common/buttons/CloseButton"
import SubmitButton from "@/components/common/buttons/SubmitButton"
import DatePickerLine from "@/components/common/DatePickerLine"
import CustomerPicker from "@/components/common/dropdown/customer/CustomerPicker"
import DriverPicker from "@/components/common/dropdown/driver/DriverPicker"
import PackagePicker from "@/components/common/dropdown/package/PackagePicker"
import FormGroup from "@/components/common/FormGroup"
import TextInput from "@/components/common/inputs/TextInput"
import TimePicker from "@/components/common/TimePicker"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import useBookingForm from "@/hooks/booking/useBookingForm"
import { AlertCircle, FileText } from "lucide-react"
import { useEffect, useState } from "react"

export function BookingModal({
     sheetOpen,
  handleClose,
  isNewItem,
  selectedItem,
  setSheetOpen,
  fetchBookings,
  handleEdit,
  findBooking,
  booking,
  activeTab
}) {
    const {isLoading, errors, onSubmit, onUpdate, formData, setFormData, setErrors, onStartBooking, onComplete} = useBookingForm()
    const [isChecked, setIsChecked] = useState(false);
  // Load data when editing
  // console.log("first", selectedItem)
  
  useEffect(() => {
    if (isChecked && !isNewItem) {
      findBooking(selectedItem?._id);
      setFormData({
        ...booking,
        // Ensure keys map correctly if backend differs
      });
    } else if (selectedItem && !isNewItem) {
      setIsChecked(false)
      // Map existing item to form fields
      setFormData({
        _id: selectedItem?._id,
        date: selectedItem?.date,
        time: selectedItem?.time,
        customerNumber: selectedItem?.customerNumber,
        customerName: selectedItem?.customerName,
        driver: selectedItem?.driver,
        description: selectedItem?.description,
        pickupLocation: selectedItem?.pickupLocation,
        from: selectedItem?.from,
        to: selectedItem?.to,
        isOutstation: selectedItem?.isOutstation,
        additionalFees: selectedItem?.additionalFees,
        customAmount: selectedItem?.customAmount,
        customerId: selectedItem.customer || "",
        selectedPackage: selectedItem.selectedPackage?._id || ""
      });
    }
    else {
      setFormData({
        date: "",
        time: "",
        customerId: "",
        customerNumber: "",
        customerName: "",
        driver: "",
        selectedPackage: "",
        description: "",
        pickupLocation: "",
        from: "",
        to: "",
        isOutstation: false,
        additionalFees: 0,
        customAmount: 0,
      })
  }
}, [selectedItem, isNewItem, findBooking, setFormData])

// console.log("booking :", booking)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onSuccess = () => {
    setSheetOpen(false);
    fetchBookings();
  }

  const handleStartSuccess = () => {
    setIsChecked(true);
    fetchBookings();
    findBooking(formData?._id);
    // setSheetOpen(false);
  }

  const handleEndSuccess = () => {
    setIsChecked(true);
    fetchBookings();
    findBooking(formData?._id);
    // setSheetOpen(false);
  }

  const handleStart = () => {
    if (formData?.status === "pending") {
        onStartBooking({
          bookingId: formData?._id,
          odoStart: formData?.odoStart,
        },
          handleStartSuccess
        );
    }
  }

  const handleEnd = () => {
    if (formData?.status === "ongoing") {
        onComplete({
          bookingId: formData?._id,
          odoEnd: formData?.odoEnd,
        },
          handleEndSuccess
        );
    }
  }

  const handleSubmit = () => {
    if (!isNewItem && selectedItem) {
      onUpdate(onSuccess)
    } else if (isNewItem) {
      onSubmit(onSuccess);
    }
  };
  return (
    <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
        <DialogContent className="w-[95%] sm:w-[90%] sm:max-w-[700px] lg:max-w-[900px] max-h-[95vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
            {isNewItem ? <FileText className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {isNewItem ? "Create New Booking" : "Update Booking"}
            {!isNewItem && <StatusBadge>{booking ? booking?.status : formData?.status || selectedItem?.status}</StatusBadge>}
            </DialogTitle>
            <DialogDescription>
               {isNewItem 
              ? "Fill in the details below to create a new booking." 
              : "Update the booking information below."
            }
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-6">
           <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6 w-full">

            {/* Date and Time */}
            <div className="flex flex-col md:flex-row gap-4">
              <FormGroup id={"date"} errors={errors} className="flex-1">
                <Label htmlFor="date">Date *</Label>
                <DatePickerLine
                  error={errors?.date}
                  value={formData?.date}
                  onChange={(d) => setFormData({...formData, date: d})}
                />
              </FormGroup>
               <FormGroup id={"time"} errors={errors} className="flex-1">
                <Label htmlFor="time"> Time *</Label>
                <TimePicker
                  error={errors?.time}
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </FormGroup>
            </div>

          {/* Customer Selection */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormGroup id={"customerId"} errors={errors}>
                <Label htmlFor="customerId">Customer</Label>
                <CustomerPicker
                  error={errors?.customerId}
                  value={formData.customerId}
                  labelKey={"firstName"}
                  valueKey={"_id"}
                  onChange={(e) => setFormData({...formData, customerId: e})}
                  onCustomerSelect={(customer) => {
                    if (customer) {
                      const fullName = `${customer?.firstName || ''} ${customer?.lastName || ''}`.trim();
                      setFormData(prev => ({
                        ...prev,
                        customerName: fullName,
                        customerNumber: customer?.mobile || ''
                      }));
                    }
                  }}
                />
            </FormGroup>

            
                <FormGroup id={"customerName"} errors={errors}>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <TextInput
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Enter name"
                  />
                </FormGroup>

                <FormGroup id={"customerNumber"} errors={errors}>
                  <Label htmlFor="customerNumber">Customer Number</Label>
                  <TextInput
                    id="customerNumber"
                    value={formData.customerNumber}
                    onChange={(e) => handleInputChange('customerNumber', e.target.value)}
                    placeholder="Enter number"
                  />
                </FormGroup>
          </div>

           {/* Driver and Package */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup id={"driver"} errors={errors}>
                <Label htmlFor="driver">Driver</Label>
                <DriverPicker
                  id="driver"
                  value={formData.driver}
                  labelKey={"firstName"}
                  valueKey={"_id"}
                  onChange={(e) => setFormData({...formData, driver: e})}
                  error={errors?.driver}
                />
              </FormGroup>

             <FormGroup id={"selectedPackage"} errors={errors}>
                <Label htmlFor="selectedPackage">Package</Label>
                <PackagePicker
                  packageCategory={activeTab}
                  id="selectedPackage"
                  value={formData.selectedPackage}
                  labelKey={"packageName"}
                  valueKey={"_id"}
                  onChange={(e) => setFormData({...formData, selectedPackage: e})}
                  onPackageSelect={(pkg) => setFormData(prev => ({...prev, packageType: pkg?.packageType}))}
                  error={errors?.selectedPackage}
                />
            </FormGroup>
           </div>
          
  
          {/* Trip Details */}
         <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <FormGroup id={"pickupLocation"} errors={errors}>
                <Label htmlFor="pickupLocation">Pickup Location *</Label>
                <TextInput
                  id="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                  placeholder="Enter pickup location"
                />
              </FormGroup>
              
              
                <FormGroup id={"from"} errors={errors}>
                <Label htmlFor="from">From</Label>
                <TextInput
                  id="from"
                  value={formData.from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                  placeholder="Enter city"
                />
              </FormGroup>
              <FormGroup id={"to"} errors={errors}>
                <Label htmlFor="to">To</Label>
                <TextInput
                  id="to"
                  value={formData.to}
                  onChange={(e) => handleInputChange('to', e.target.value)}
                  placeholder="Enter city"
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

           {/* Options */}
           <div className="flex items-center space-x-2">
            <Switch 
              id="isOutstation" 
              checked={formData.isOutstation}
              onCheckedChange={(checked) => handleInputChange('isOutstation', checked)}
            />
            <Label htmlFor="isOutstation">Is Outstation?</Label>
          </div>

           {/* Financials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormGroup id={"additionalFees"} errors={errors}>
                        <Label htmlFor="additionalFees">Additional Fees</Label>
                        <TextInput
                          id="additionalFees"
                          type="number"
                          value={formData.additionalFees}
                          onChange={(e) => handleInputChange('additionalFees', e.target.value)}
                          placeholder="0.00"
                        />
                      </FormGroup>
                      {formData?.packageType === "CUSTOM" && (
                      <FormGroup id={"customAmount"} errors={errors}>
                        <Label htmlFor="customAmount">Custom Amount</Label>
                        <TextInput
                          id="customAmount"
                          type="number"
                          value={formData.customAmount}
                          onChange={(e) => handleInputChange('customAmount', e.target.value)}
                          placeholder="0.00"
                        />
                      </FormGroup>
                      ) }
                    </div>
            
              <div className="flex items-end space-x-2 justify-end">
             {/* Retained Start/End logic if needed, partially commented or kept if relevant to new structure.
                 For now, primarily rendering the new input fields.
              */}
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
          </form>
          </div>
          <DialogFooter className="p-6 pt-2 border-t flex flex-row gap-2 justify-end">
            <DialogClose asChild>
              <CloseButton />
            </DialogClose>
             <SubmitButton
              onClick={handleSubmit}
              isNewItem={isNewItem}
              isLoading={isLoading}
            />
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
