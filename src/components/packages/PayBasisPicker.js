import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const PayBasisPicker = ({value, onChange}) => {
  return (
    <Select 
                    value={value} 
                    onValueChange={onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select billing unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="km">KM</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
  )
}

export default PayBasisPicker