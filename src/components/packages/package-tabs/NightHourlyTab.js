import FormGroup from '@/components/common/FormGroup'
import TextInput from '@/components/common/inputs/TextInput'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NightHourlyTab = ({ formData, errors, handleInputChange }) => {
  // Helper to update hourly tiers
  const handleTierChange = (index, field, value) => {
    const updatedTiers = [...(formData.hourlyTiers || [])];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    handleInputChange('hourlyTiers', updatedTiers);
  };

  const addTier = () => {
    const updatedTiers = [...(formData.hourlyTiers || []), { duration: '', price: '' }];
    handleInputChange('hourlyTiers', updatedTiers);
  };

  const removeTier = (index) => {
    const updatedTiers = (formData.hourlyTiers || []).filter((_, i) => i !== index);
    handleInputChange('hourlyTiers', updatedTiers);
  };
    
     useEffect(() => {
          handleInputChange({
            serviceStartTime: "18:00",
            serviceEndTime: "06:00",
            maxTravelDistanceKM: 15,
            maxTravelDistanceRate: 100,
            extraDistanceChargeRule: "Extra charge will be applied if the distance between start and end point exceeds maxTravelDistanceKM.",
          });
          }, []);

  return (
    <div className="space-y-4">
      {/* Service Time Window */}
      <div className="grid grid-cols-2 gap-4">
        <FormGroup id="serviceStartTime" errors={errors}>
          <Label htmlFor="serviceStartTime">Service Start Time</Label>
          <TextInput
            id="serviceStartTime"
            type="time"
            value={formData.serviceStartTime}
            onChange={(e) => handleInputChange('serviceStartTime', e.target.value)}
          />
        </FormGroup>
        <FormGroup id="serviceEndTime" errors={errors}>
          <Label htmlFor="serviceEndTime">Service End Time</Label>
          <TextInput
            id="serviceEndTime"
            type="time"
            value={formData.serviceEndTime}
            onChange={(e) => handleInputChange('serviceEndTime', e.target.value)}
          />
        </FormGroup>
      </div>

      {/* Geographical Limits */}
      <div className="grid grid-cols-2 gap-4">
        <FormGroup id="maxTravelDistanceKM" errors={errors}>
          <Label htmlFor="maxTravelDistanceKM">Max Travel Distance (KM)</Label>
          <TextInput
            id="maxTravelDistanceKM"
            type="number"
            min="0"
            value={formData.maxTravelDistanceKM}
            onChange={(e) => handleInputChange('maxTravelDistanceKM', parseFloat(e.target.value) || "")}
            placeholder="15"
          />
        </FormGroup>
        <FormGroup id="maxTravelDistanceRate" errors={errors}>
          <Label htmlFor="maxTravelDistanceRate">Max Distance Rate (LKR/KM)</Label>
          <TextInput
            id="maxTravelDistanceRate"
            type="number"
            min="0"
            value={formData.maxTravelDistanceRate}
            onChange={(e) => handleInputChange('maxTravelDistanceRate', parseFloat(e.target.value) || "")}
            placeholder="100"
          />
        </FormGroup>
      </div>

      <FormGroup id="extraDistanceChargeRule" errors={errors}>
          <Label htmlFor="extraDistanceChargeRule">Extra Distance Rule Description</Label>
          <Textarea
            id="extraDistanceChargeRule"
            value={formData.extraDistanceChargeRule}
            placeholder="Extra charge will be applied if the distance between start and end point exceeds maxTravelDistanceKM."
            onChange={(e) => handleInputChange('extraDistanceChargeRule', e.target.value)}
          />
      </FormGroup>

      {/* Hourly Tiers */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Hourly Tiers</Label>
          <Button type="button" variant="outline" size="sm" onClick={addTier}>
            <Plus className="h-4 w-4 mr-2" /> Add Tier
          </Button>
        </div>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Duration (hrs)</TableHead>
                <TableHead>Price (LKR)</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(formData.hourlyTiers || []).map((tier, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextInput
                      type="number"
                      value={tier.duration}
                      onChange={(e) => handleTierChange(index, 'duration', parseFloat(e.target.value) || "")}
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell>
                    <TextInput
                      type="number"
                      value={tier.price}
                      onChange={(e) => handleTierChange(index, 'price', parseFloat(e.target.value) || "")}
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeTier(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!formData.hourlyTiers?.length) && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                    No hourly tiers added
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default NightHourlyTab