import { Button } from '@/components/ui/button'
import React from 'react'

const SubmitButton = ({isLoading, isNewItem, children, onClick, label, disabled}) => {
  return (
      <div>
          <Button disabled={isLoading} onClick={onClick} type="submit" className={`flex-1 cursor-pointer `}>
              {isLoading && isNewItem ? "Saving..." : isLoading && !isNewItem ? "Updating..." : isNewItem ? `Submit`  : label ? label : "Update"}
          </Button>
    </div>
  )
}

export default SubmitButton