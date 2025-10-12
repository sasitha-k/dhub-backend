import { Badge } from '@/components/ui/badge';
import { capitalizeWords } from '@/constants/CapitalizedWord';
import React from 'react'


export default function StatusBadge({ children, ...props}) {

const getClassName=() => {
    switch (children) {
         case 'confirmed':
            return "bg-green-600 text-white"
            break;
            case 'paid':
                return "bg-green-600 text-white"
                break;
        case 'completed':
            return "bg-green-600 text-white"
            break;
        case 'approved':
            return "bg-green-600 text-white"
            break;
        case 'active':
            return "bg-green-600 text-white"
            break;
        case 'Active':
            return "bg-green-600 text-white"
            break;
        case 'rejected':
            return "bg-red-600 text-white"
            break;
        case 'ongoing':
            return "bg-yellow-500 text-white"
            break;
            case 'overdue':
                return "bg-orange-500 text-white"
                break;
            case 'partial':
                return "bg-gray-400 text-white"
                break;
    
        case 'started':
            return "bg-yellow-600 text-white"
            break;
    
        case 'error':
            return "bg-red-500 px-7 w-auto text-white"
            break;
        
        case 'pending':
            return "bg-blue-600  text-white"
            break;
        
        case 'In Active':
            return "bg-muted-foreground  text-white"
            break;
    
        default:
            return "bg-blue-600  text-white"
            break;
    }
}
  return (
      <Badge className={" capitalize font-bold text-xs " + getClassName()} {...props}>
          {capitalizeWords(children)}
      </Badge>
  )
}
