import React from 'react'
import InlineValidationError from './errors/InlineValidationError';

export default function FormGroup({children,id,errors}) {
    let errorMsg = null;
    if(errors?.[id]){
      errorMsg = errors?.[id];
    }

  return (
    <div className={"group w-full " + (errorMsg != null?"has-error border-red-400":" flex gap-1 flex-col")}>
        
        {children}

        <InlineValidationError errors={errors} message={errorMsg} />
    </div>
  )
}
