import { Button } from '@/components/ui/button'
import React from 'react'

const SubmitButton = ({isLoading, isNewItem, children, onClick, label}) => {
  return (
      <div>
          <Button onClick={onClick} type="submit" className="flex-1">
              {isLoading && isNewItem ? "Saving..." : isLoading && !isNewItem ? "Updating..." : isNewItem ? `Submit` : `Update` || children}
          </Button>
    </div>
  )
}

export default SubmitButton