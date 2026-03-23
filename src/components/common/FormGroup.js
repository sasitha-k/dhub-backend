import React from 'react'
import { cn } from "@/lib/utils";
import InlineValidationError from './errors/InlineValidationError';

export default function FormGroup({children,id,errors, className}) {
    let errorMsg = null;
    if(errors?.[id]){
      errorMsg = errors?.[id];
    }

  return (
    <div
      className={cn(
        "group w-full min-w-0",
        errorMsg != null ? "has-error border-red-400" : "flex flex-col gap-1",
        className
      )}
    >
        {children}

        <InlineValidationError errors={errors} message={errorMsg} />
    </div>
  )
}
