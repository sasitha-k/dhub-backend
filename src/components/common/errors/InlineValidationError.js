"use client";
import React from 'react'

export default function InlineValidationError({message}) {
    if (message)
    {      
        return  <div className='text-red-500 pl-3'><small>{message}</small> </div>;
    }
    return null;
}
