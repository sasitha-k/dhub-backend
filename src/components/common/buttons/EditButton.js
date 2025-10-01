import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import React from 'react'

export default function EditButton({onClick, ...props }) {
  return (
       <Button
            variant="outline"
            onClick={onClick}
            className="text-muted-foreground h-12 hover:bg-primary bg-background hover:text-background cursor-pointer"
            {...props}
            >
            <PencilIcon className='w-5 h-5'/>
        </Button>
  )
}
