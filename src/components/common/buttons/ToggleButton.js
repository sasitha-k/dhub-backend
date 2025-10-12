import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch'; 
import { Label } from '@/components/ui/label'; 

export default function ToggleButton({ checked, onChange }) {
 
  const [isStart, setIsStart] = useState(false);
  const [complete, setIsComplete] = useState(false);

 
  useEffect(() => {
    if (checked === 'start') {
      setIsStart(true);
    }if (checked === 'complete') {
      setIsComplete(true);
    } else {
      setIsStart(false);
    }
  }, [checked]);

  const toggleStatus = (newValue) => {
    setIsStart(newValue);
    onChange(newValue ? 'start' : 'complete'); 
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="status-switch"
        checked={isStart} 
        onCheckedChange={toggleStatus}
      />
      <Label htmlFor="status-switch">
        {isStart ? "Complete" : "Start"}
      </Label>
    </div>
  );
}
