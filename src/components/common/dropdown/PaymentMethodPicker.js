import React, { useEffect } from 'react'
import SearchableDropdown from './SearchableDropDown'

export default function PaymentMethodPicker({error, value, onChange, }) {
    const options = [
        { id: 1, label: "Cash", value: "cash" },
        { id: 1, label: "Card", value: "card" },
        { id: 1, label: "Credit", value: "credit" },
        { id: 1, label: "Online Transfer", value: "onlineTransfer" },
        { id: 1, label: "Other", value: "other" }
            
  ]

  return (
    <SearchableDropdown
      error={error}
      options={options}
      value={value}
      onChange={onChange}
      labelKey={"label"}
      valueKey={"value"}
      placeholder={"Select payment method"}
      searchPlaceholder={"Search by payment method.."} 
    />
  )
}

