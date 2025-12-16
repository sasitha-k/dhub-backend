import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import FormGroup from "@/components/common/FormGroup";
import TextInput from "@/components/common/inputs/TextInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CustomTab = ({ formData, errors, handleInputChange }) => {

     useEffect(() => {
        if (!formData.notes || formData.notes.length === 0) {
            handleInputChange('notes', ["Amount will be decided by the company"]);
        }
     }, []);

    const addNote = () => {
        const currentNotes = Array.isArray(formData.notes) ? formData.notes : [];
        handleInputChange('notes', [...currentNotes, ""]);
    };

    const removeNote = (index) => {
        const currentNotes = Array.isArray(formData.notes) ? [...formData.notes] : [];
        currentNotes.splice(index, 1);
        handleInputChange('notes', currentNotes);
    };

    const handleNoteChange = (index, value) => {
        const currentNotes = Array.isArray(formData.notes) ? [...formData.notes] : [];
        currentNotes[index] = value;
        handleInputChange('notes', currentNotes);
    };

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Notes</Label>
          <Button type="button" variant="outline" size="sm" onClick={addNote}>
            <Plus className="h-4 w-4 mr-2" /> Add Note
          </Button>
        </div>
        
        <Card className="p-4 space-y-2">
            {(Array.isArray(formData.notes) ? formData.notes : []).map((note, index) => (
            <div key={index} className="flex gap-2 items-center">
                <div className="flex-1">
                <TextInput
                    value={note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                    placeholder="Enter note"
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
            {(!formData.notes?.length) && (
                 <p className="text-sm text-muted-foreground text-center py-2">No notes added.</p>
            )}
        </Card>
      </div>
    );
}

export default CustomTab;
