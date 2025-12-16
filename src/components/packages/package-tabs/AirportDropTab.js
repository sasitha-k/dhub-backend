import FormGroup from '@/components/common/FormGroup'
import TextInput from '@/components/common/inputs/TextInput'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function AirportDropTab({ formData, errors, handleInputChange }) {
  return (
    <div className="space-y-4">
      <FormGroup id="oneWayPrice" errors={errors}>
        <Label htmlFor="oneWayPrice">One Way Price (LKR)</Label>
        <TextInput
          id="oneWayPrice"
          type="number"
          min="0"
          value={formData.oneWayPrice || 2500}
          onChange={(e) => handleInputChange('oneWayPrice', parseFloat(e.target.value) || "")}
          placeholder="2500"
        />
      </FormGroup>

      <FormGroup id="serviceType" errors={errors}>
          <Label htmlFor="serviceType">Service Type</Label>
          <TextInput
            id="serviceType"
            value={formData.serviceType || "One Way (Pickup or Drop)"}
            onChange={(e) => handleInputChange('serviceType', e.target.value)}
            placeholder="One Way (Pickup or Drop)"
          />
      </FormGroup>
    </div>
  )
}