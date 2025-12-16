import FormGroup from '@/components/common/FormGroup'
import TextInput from '@/components/common/inputs/TextInput'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import React, { useEffect } from 'react'
import { Card } from '@/components/ui/card'

export default function LongTripTab({ formData, errors, handleInputChange }) {
  // Helper to update exclusion notes
  const handleNoteChange = (index, value) => {
    const updatedNotes = [...(formData.exclusionNotes || [])];
    updatedNotes[index] = value;
    handleInputChange('exclusionNotes', updatedNotes);
  };

  const addNote = () => {
    const updatedNotes = [...(formData.exclusionNotes || []), ""];
    handleInputChange('exclusionNotes', updatedNotes);
  };

  const removeNote = (index) => {
    const updatedNotes = (formData.exclusionNotes || []).filter((_, i) => i !== index);
    handleInputChange('exclusionNotes', updatedNotes);
  };
    
      useEffect(() => {
          handleInputChange({
            maxWorkingHours: 0,
            overtimeRate: 500,
          });
          }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">

        <FormGroup id="overtimeRate" errors={errors}>
          <Label htmlFor="overtimeRate">Overtime Rate (LKR)</Label>
          <TextInput
            id="overtimeRate"
            type="number"
            min="0"
            value={formData.overtimeRate}
            onChange={(e) => handleInputChange('overtimeRate', parseFloat(e.target.value) || "")}
            placeholder="500"
          />
        </FormGroup>
      </div>

       <div className="flex items-center space-x-2 py-2">
        <Checkbox 
            id="isQuoteRequired"
            checked={formData.isQuoteRequired !== false} // Default to true if undefined
            onCheckedChange={(checked) => handleInputChange('isQuoteRequired', checked)}
        />
        <Label htmlFor="isQuoteRequired" className="font-normal cursor-pointer">
            Quote Required (Costs like meals/accommodation need approval)
        </Label>
      </div>

      {/* Exclusion Notes */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Exclusion Notes</Label>
          <Button type="button" variant="outline" size="sm" onClick={addNote}>
            <Plus className="h-4 w-4 mr-2" /> Add Note
          </Button>
        </div>
        
        <Card className="p-4 space-y-2">
            {(formData.exclusionNotes || ["Meal costs are NOT included in the base rate.", "Accommodation costs are NOT included in the base rate."]).map((note, index) => (
            <div key={index} className="flex gap-2 items-center">
                <div className="flex-1">
                <TextInput
                    value={note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                    placeholder="Enter exclusion note"
                />
                </div>
                <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeNote(index)}
                >
                <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            ))}
            {(!formData.exclusionNotes?.length && !formData.exclusionNotes) && (
                 <p className="text-sm text-muted-foreground text-center py-2">No notes added.</p>
            )}
        </Card>
      </div>
    </div>
  )
}