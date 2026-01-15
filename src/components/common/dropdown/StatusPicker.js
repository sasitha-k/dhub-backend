import React, { useEffect } from 'react'
import SearchableDropdown from './SearchableDropDown'

export default function StatusPicker({error, value, onChange, }) {
    const options = [
        { id: 1, label: "Pending", value: "pending" },
        { id: 1, label: "Arrived", value: "arrived" },
        { id: 1, label: "Ongoing", value: "ongoing" },
        { id: 1, label: "Completed", value: "completed" },
        { id: 1, label: "Cancelled", value: "cancelled" }
            
  ]

  return (
    <SearchableDropdown
      error={error}
      options={options}
      value={value}
      onChange={onChange}
      labelKey={"label"}
      valueKey={"value"}
      placeholder={"Select status"}
      searchPlaceholder={"Search by status.."} 
    />
  )
}

