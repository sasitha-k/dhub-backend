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
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import useBookingForm from "@/hooks/booking/useBookingForm"
import { AlertCircle, FileText, Calendar, User, MapPin, DollarSign, Info } from "lucide-react"
import { useEffect, useState } from "react"
import usePackages from "@/hooks/packages/usePackages"

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
    const { fetchPackages, packages } = usePackages();

  // Load data when editing
  // console.log("first", selectedItem)
  console.log({activeTab});

  useEffect(() => {
   fetchPackages()
  }, []);
  
  
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
        packageType: selectedItem?.selectedPackage?.packageType,
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
    else if (isNewItem && sheetOpen) {
      // Set today's date in YYYY-MM-DD format when modal opens for new booking
      const today = new Date();
      const todayFormatted = today.toISOString().split('T')[0];
      setFormData({
        date: todayFormatted,
        time: "",
        customerId: "",
        customerNumber: "",
        customerName: "",
        driver: "",
        selectedPackage: "",
        packageType: "",
        description: "",
        pickupLocation: "",
        from: "",
        to: "",
        isOutstation: false,
        additionalFees: 0,
        customAmount: 0,
      })
  }
}, [selectedItem, isNewItem, findBooking, setFormData, sheetOpen, booking])

  // Open date picker when modal opens for new booking
  // useEffect(() => {
  //   if (sheetOpen && isNewItem) {
  //     // Small delay to ensure modal is fully rendered
  //     const timer = setTimeout(() => {
  //       setDatePickerOpen(true);
  //     }, 100);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setDatePickerOpen(false);
  //   }
  // }, [sheetOpen, isNewItem]);

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

  const filteredPackages = packages.filter(pkg => pkg?.packageCategory === activeTab) ?? []
  const selectedPackageInfo = filteredPackages.find(pkg => pkg?._id === formData?.selectedPackage) ?? {}

  return (
    <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Open Dialog</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[85%] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className={`rounded-t-lg px-6 pt-6 pb-4 shrink-0 ${activeTab === "day" ? "bg-amber-500 text-white" : activeTab === "night" ? "bg-indigo-700 text-white" : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"}`}>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {isNewItem ? <FileText className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {isNewItem ? "Create New Booking" : "Update Booking"}
            {!isNewItem && <StatusBadge>{booking ? booking?.status : formData?.status || selectedItem?.status}</StatusBadge>}
          </DialogTitle>
          <DialogDescription className={activeTab === "day" || activeTab === "night" ? "text-white/90" : "text-white/90"}>
            {isNewItem 
              ? "Fill in the details below to create a new booking." 
              : "Update the booking information below."
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">

            {/* Date and Time Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4" />
                <span>Date & Time</span>
              </div>
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
                  <Label htmlFor="time">Time *</Label>
                  <TimePicker
                    error={errors?.time}
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </FormGroup>
              </div>
            </div>

            <Separator />

            {/* Customer Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4" />
                <span>Customer Information</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>

            <Separator />

            {/* Driver & Package Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4" />
                <span>Driver & Package</span>
              </div>
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
                    options={filteredPackages}
                    category={activeTab}
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
            </div>

            <Separator />
          
  
            {/* Trip Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4" />
                <span>Trip Details</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label className={"mt-2"} htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className=""
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter any additional description..."
                  rows={3}
                />
              </FormGroup>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                <Switch 
                  id="isOutstation" 
                  checked={formData.isOutstation}
                  onCheckedChange={(checked) => handleInputChange('isOutstation', checked)}
                />
                <Label htmlFor="isOutstation" className="cursor-pointer">Is Outstation?</Label>
              </div>
            </div>

            <Separator />

            {/* Financial Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <DollarSign className="w-4 h-4" />
                <span>Financial Details</span>
              </div>
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
                {selectedPackageInfo?.packageType === "CUSTOM" && (
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
                )}
              </div>
            </div>

            {/* Booking Status Actions */}
            {(formData?.status === "pending" || formData?.status === "ongoing") && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Info className="w-4 h-4" />
                    <span>Booking Actions</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-md">
                    {formData?.status === "pending" ? (
                      <>
                        <Switch checked={isChecked} onCheckedChange={handleStart} id="status-switch-start"/>
                        <Label htmlFor="status-switch-start" className="cursor-pointer">
                          Start Booking
                        </Label>
                      </>
                    ) : formData?.status === "ongoing" ? (
                      <>
                        <Switch checked={isChecked} onCheckedChange={handleEnd} id="status-switch-end"/>
                        <Label htmlFor="status-switch-end" className="cursor-pointer">
                          End Booking
                        </Label>
                      </>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
        <DialogFooter className="px-6 pb-6 pt-4 shrink-0 border-t bg-gray-50">
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
