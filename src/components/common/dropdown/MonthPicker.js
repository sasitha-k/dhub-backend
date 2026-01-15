import React, { useEffect } from 'react'
import SearchableDropdown from './SearchableDropDown'

export default function MonthPicker({error, value, onChange, }) {
    const options = [
        { id: 1, label: "January", value: "january" },
        { id: 2, label: "February", value: "february" },
        { id: 3, label: "March", value: "march" },
        { id: 4, label: "April", value: "april" },
        { id: 5, label: "May", value: "may" },
        { id: 6, label: "June", value: "june" },
        { id: 7, label: "July", value: "july" },
        { id: 8, label: "August", value: "august" },
        { id: 9, label: "September", value: "september" },
        { id: 10, label: "October", value: "october" },
        { id: 11, label: "November", value: "november" },
        { id: 12, label: "December", value: "december" }
            
            
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

