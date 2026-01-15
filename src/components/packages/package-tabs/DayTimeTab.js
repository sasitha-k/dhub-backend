import FormGroup from '@/components/common/FormGroup'
import TextInput from '@/components/common/inputs/TextInput'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from 'react'

const DayTimeTab
 = ({ formData, errors, handleInputChange}) => {
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
      lateNightRate: 500,
      dayTimeStart: "06:00",
      dayTimeEnd: "21:00",
      overtimeRate: 500,
    });
    }, []);

  return (
    <div className="space-y-4">
      {/* Time Configuration */}
      <div className="grid grid-cols-2 gap-4">
        <FormGroup id="dayTimeStart" errors={errors}>
          <Label htmlFor="dayTimeStart">Day Time Start</Label>
          <TextInput
            id="dayTimeStart"
            type="time"
            value={formData.dayTimeStart || "06:00"}
            onChange={(e) => handleInputChange('dayTimeStart', e.target.value)}
          />
        </FormGroup>
        <FormGroup id="dayTimeEnd" errors={errors}>
          <Label htmlFor="dayTimeEnd">Day Time End</Label>
          <TextInput
            id="dayTimeEnd"
            type="time"
            value={formData.dayTimeEnd || "21:00"}
            onChange={(e) => handleInputChange('dayTimeEnd', e.target.value)}
          />
        </FormGroup>
      </div>

      {/* Rates */}
      <div className="grid grid-cols-2 gap-4">
        <FormGroup id="overtimeRate" errors={errors}>
          <Label htmlFor="overtimeRate">Overtime Rate (LKR)</Label>
          <TextInput
            id="overtimeRate"
            type="number"
            min="0"
            value={formData.overtimeRate || 500}
            onChange={(e) => handleInputChange('overtimeRate', parseFloat(e.target.value) || "")}
            placeholder="500"
          />
        </FormGroup>
        <FormGroup id="lateNightRate" errors={errors}>
          <Label htmlFor="lateNightRate">Late Night Rate (LKR)</Label>
          <TextInput
            id="lateNightRate"
            type="number"
            min="0"
            value={formData.lateNightRate || 500}
            onChange={(e) => handleInputChange('lateNightRate', parseFloat(e.target.value) || "")}
            placeholder="500"
          />
        </FormGroup>
      </div>

      {/* Hourly Tiers */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Hourly Tiers <span className="text-red-500">*</span></Label>
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

export default DayTimeTab
