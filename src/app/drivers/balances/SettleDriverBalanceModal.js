import SubmitButton from "@/components/common/buttons/SubmitButton"
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
import useDriverBalanceSettle from "@/hooks/drivers/useDriverBalanceSettle"
import { useEffect } from "react"

export function SettleDriverBalanceModal({
  isOpen,
  setIsOpen,
  selectedItem,
  fetchDrivers,
}) {

    const { formData, setFormData, onSubmit, isLoading, errors } = useDriverBalanceSettle();

    useEffect(() => {
      if(selectedItem){
        setFormData({
          driverId: selectedItem?._id,
          amount: selectedItem?.driverOwesCompany,
        })
      }
    }, [selectedItem])

    const onSuccess = () => {
      setIsOpen(false);
      fetchDrivers();
    }

      const handleClose = () => {
          setIsOpen(false);
          setFormData({
            driverId: "",
            amount: "",
          })
          fetchDrivers();
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
              <Label htmlFor="name-1">Driver</Label>
                          <DriverPicker
                              valueKey={"_id"}
                value={formData?.driverId}
                onChange={(e) => setFormData({...formData, driverId: e})}
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
