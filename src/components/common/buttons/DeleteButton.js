import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import React from 'react'

export default function DeleteButton({onClick, ...props }) {
  return (
                    <Button
                          variant="outline"
                          onClick={onClick}
                          className="text-red-800 h-12 hover:bg-red-800 hover:text-red-100 cursor-pointer"
                          {...props}
                        >
                        <Trash2Icon className='w-5 h-5'/>
                    </Button>
  )
}
