import FormGroup from '@/components/common/FormGroup'
import TextInput from '@/components/common/inputs/TextInput'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from '@/components/ui/textarea'
import { useEffect } from 'react'

const NightDistanceTab = ({ formData, errors, handleInputChange}) => {
  // Helper to update distance tiers
  const handleTierChange = (index, field, value) => {
    const updatedTiers = [...(formData.distanceTiers || [])];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    handleInputChange('distanceTiers', updatedTiers);
  };

  const addTier = () => {
    const updatedTiers = [...(formData.distanceTiers || []), { distanceKM: '', price: '' }];
    handleInputChange('distanceTiers', updatedTiers);
  };

  const removeTier = (index) => {
    const updatedTiers = (formData.distanceTiers || []).filter((_, i) => i !== index);
    handleInputChange('distanceTiers', updatedTiers);
  };

   useEffect(() => {
      handleInputChange({
        extraKMRate: 100,
        waiting15MinRate: 300,
        freeWaitingMinutes: 15,
        maxTravelDistanceKM: 15,
        maxTravelDistanceRate: 100,
        extraDistanceChargeRule: "Extra charge will be applied if the distance between start and end point exceeds maxTravelDistanceKM.",
      });
      }, []);

  return (
    <div className="space-y-4">
      

      {/* Rates & Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormGroup id="extraKMRate" errors={errors}>
          <Label htmlFor="extraKMRate">Extra KM Rate (LKR)</Label>
          <TextInput
            id="extraKMRate"
            type="number"
            min="0"
            value={formData.extraKMRate}
            onChange={(e) => handleInputChange('extraKMRate', parseFloat(e.target.value) || "")}
            placeholder="100"
          />
        </FormGroup>
        
        <FormGroup id="waiting15MinRate" errors={errors}>
          <Label htmlFor="waiting15MinRate">Waiting Rate (per 15 min)</Label>
          <TextInput
            id="waiting15MinRate"
            type="number"
            min="0"
            value={formData.waiting15MinRate}
            onChange={(e) => handleInputChange('waiting15MinRate', parseFloat(e.target.value) || "")}
            placeholder="300"
          />
        </FormGroup>

        <FormGroup id="freeWaitingMinutes" errors={errors}>
          <Label htmlFor="freeWaitingMinutes">Free Waiting (Minutes)</Label>
          <TextInput
            id="freeWaitingMinutes"
            type="number"
            min="0"
            value={formData.freeWaitingMinutes}
            onChange={(e) => handleInputChange('freeWaitingMinutes', parseFloat(e.target.value) || "")}
            placeholder="15"
          />
        </FormGroup>

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
            value={formData.maxTravelDistanceRate || 100}
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
      {/* Distance Tiers */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Distance Tiers</Label>
          <Button type="button" variant="outline" size="sm" onClick={addTier}>
            <Plus className="h-4 w-4 mr-2" /> Add Tier
          </Button>
        </div>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distance (KM)</TableHead>
                <TableHead>Price (LKR)</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(formData.distanceTiers || []).map((tier, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextInput
                      type="number"
                      value={tier.distanceKM}
                      onChange={(e) => handleTierChange(index, 'distanceKM', parseFloat(e.target.value) || "")}
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
              {(!formData.distanceTiers?.length) && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                    No distance tiers added
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

export default NightDistanceTab