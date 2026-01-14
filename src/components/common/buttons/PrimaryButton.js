import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'

export default function PrimaryButton({ onClick, children, className, ...props }) {
  return (
      <div className='w-full '>
           <Button variant="default" className={cn(className)} onClick={onClick} {...props}>{children}</Button> 
      </div>
  )
}
