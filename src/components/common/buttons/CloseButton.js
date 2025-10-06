import { Button } from '@/components/ui/button'
import React from 'react'

const CloseButton = ({onClick}) => {
  return (
      <div>
           <Button variant="outline" onClick={onClick}>
                Cancel
              </Button>
    </div>
  )
}

export default CloseButton