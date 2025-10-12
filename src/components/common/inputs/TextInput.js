import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function TextInput({
  label,
  children,
  onChange,
  type,
  value,
  name,
  placeholder,
  disabled,
  ...props
}) {
  const id = label ?? children;
  return (
      <Input
        type={type ? type : "text"}
        className={`text-sm placeholder:text-gray-400 text-muted-foreground placeholder:text-xs ${
          disabled ? "text-primary font-medium" : ""
        }`}
        id={id}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
  );
}
