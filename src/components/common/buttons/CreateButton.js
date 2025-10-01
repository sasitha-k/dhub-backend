import React from 'react'
import PrimaryButton from './PrimaryButton'
import { CirclePlus } from 'lucide-react'

export default function CreateButton({onClick}) {
  return (
      <div>
        <PrimaryButton onClick={onClick} className='flex gap-2'>
        <CirclePlus className='w-6 h-6' />Create</PrimaryButton>
   </div>
  )
}
