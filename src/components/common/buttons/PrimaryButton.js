import { Button } from '@/components/ui/button'
import React from 'react'

export default function PrimaryButton({ onClick, children, ...props }) {
  return (
      <div className='w-full '>
           <Button variant="default" onClick={onClick} {...props}>{children}</Button> 
      </div>
  )
}
