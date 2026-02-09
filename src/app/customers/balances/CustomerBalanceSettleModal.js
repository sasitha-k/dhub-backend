import SubmitButton from "@/components/common/buttons/SubmitButton"
import CustomerPicker from "@/components/common/dropdown/customer/CustomerPicker"
import DriverPicker from "@/components/common/dropdown/driver/DriverPicker"
import FormGroup from "@/components/common/FormGroup"
import TextInput from "@/components/common/inputs/TextInput"
import { Button } from "@/components/ui/button"
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
import useCustomerBlanceSettle from "@/hooks/customers/useCustomerBlanceSettle"
import { useEffect } from "react"

export function CustomerBalanceSettleModal({
  isOpen,
  setIsOpen,
  selectedItem,
  fetchCustomers,
}) {

    const { formData, setFormData, onSubmit, isLoading, errors } = useCustomerBlanceSettle();

    useEffect(() => {
      if(selectedItem){
        setFormData({
          customerId: selectedItem?._id,
          amount: selectedItem?.customerOwesCompany,
        })
      }
    }, [selectedItem])

    const onSuccess = () => {
      setIsOpen(false);
      fetchCustomers();
    }

      const handleClose = () => {
          setIsOpen(false);
          setFormData({
            customerId: "",
            amount: "",
          })
          fetchCustomers();
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(onSuccess);
    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button className={"h-8"} variant="default">Settle</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Settle Balance</DialogTitle>
            <DialogDescription>
              Settle <span className="text-primary font-medium">{selectedItem?.firstName} {selectedItem?.lastName} </span>'s {" "} balance here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <FormGroup>
              <Label htmlFor="name-1">Customer</Label>
                          <CustomerPicker
                              valueKey={"_id"}
                value={formData?.customerId}
                onChange={(e) => setFormData({...formData, customerId: e})}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="amount">Amount</Label>
                          <TextInput
                              placeholder="Enter amount"
                              value={formData?.amount}
                              onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            />
            </FormGroup>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
                      </DialogClose>
                      <SubmitButton label="Settle Balance" isLoading={isLoading} onClick={handleSubmit}/>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
