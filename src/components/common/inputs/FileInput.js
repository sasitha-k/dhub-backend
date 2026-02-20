import React, { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FileInput({
  id,
  value,
  onChange,
  placeholder = "Choose file...",
  accept = "image/*",
  disabled,
  ...props
}) {
  const fileInputRef = useRef(null);
  const [objectUrl, setObjectUrl] = useState(null);
  
  // Determine the preview URL
  const fileUrl = value instanceof File 
    ? (objectUrl || URL.createObjectURL(value))
    : (typeof value === 'string' && value ? value : null);

  // Clean up object URLs when component unmounts or value changes
  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setObjectUrl(null);
      };
    } else {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl(null);
      }
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          id={id}
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          {...props}
        />
        <label
          htmlFor={id}
          className={`flex items-center gap-2 px-3 py-2 border border-primary/40 rounded-md cursor-pointer hover:bg-accent transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ImageIcon className="h-4 w-4" />
          <span className="text-sm">{placeholder}</span>
        </label>
        {fileUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {fileUrl && (
        <div className="relative w-full h-32 border border-gray-200 rounded-md overflow-hidden">
          <img
            src={fileUrl}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
