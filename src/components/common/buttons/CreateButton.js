import React from 'react'
import PrimaryButton from './PrimaryButton'
import { CirclePlus } from 'lucide-react'

import { cn } from '@/lib/utils';

export default function CreateButton({onClick, children, className}) {
  return (
      <div>
        <PrimaryButton onClick={onClick} className={cn('flex gap-2', className)}>
        <CirclePlus className='w-6 h-6' />{children ? children : "Create"}
      </PrimaryButton>
   </div>
  )
}
