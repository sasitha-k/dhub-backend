import FormGroup from '@/components/common/FormGroup'
import TextInput from '@/components/common/inputs/TextInput'
import { Label } from '@/components/ui/label'

const VehiclePickupTab = ({ formData, errors, handleInputChange }) => {
  return (
    <div className="space-y-4">
      {/* Waiting Time Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup id="waiting15MinRate" errors={errors}>
          <Label htmlFor="waiting15MinRate">15 Min Waiting Rate (LKR)</Label>
          <TextInput
            id="waiting15MinRate"
            type="number"
            min="0"
            value={formData.waiting15MinRate || ''}
            onChange={(e) => handleInputChange('waiting15MinRate', parseFloat(e.target.value) || '')}
            placeholder="Enter 15 min waiting rate"
          />
        </FormGroup>
        <FormGroup id="freeWaitingMinutes" errors={errors}>
          <Label htmlFor="freeWaitingMinutes">Free Waiting Minutes</Label>
          <TextInput
            id="freeWaitingMinutes"
            type="number"
            min="0"
            value={formData.freeWaitingMinutes || ''}
            onChange={(e) => handleInputChange('freeWaitingMinutes', parseFloat(e.target.value) || '')}
            placeholder="Enter free waiting minutes"
          />
        </FormGroup>
      </div>

      {/* Extra Charge Rule */}
      <div className="grid grid-cols-1 gap-4">
        <FormGroup id="extraChargeRule" errors={errors}>
          <Label htmlFor="extraChargeRule">Extra Charge Rule</Label>
          <TextInput
            id="extraChargeRule"
            value={formData.extraChargeRule || ''}
            onChange={(e) => handleInputChange('extraChargeRule', e.target.value)}
            placeholder="Enter extra charge rule"
          />
        </FormGroup>
      </div>
    </div>
  )
}

export default VehiclePickupTab
