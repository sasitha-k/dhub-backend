import React from 'react'
import SearchableDropdown from '../SearchableDropDown';

export default function PackageCategoryPicker({error, value, onChange, valueKey, labelKey }) {
    const options = [
        { label: "Day", value: "day" },
        { label: "Night", value: "night" }
    ]

  return (
    <SearchableDropdown
      error={error}
      options={options}
      value={value}
      onChange={onChange}
      labelKey={labelKey || "label"}
      valueKey={valueKey || "value"}
      placeholder={"Select package category"}
      searchPlaceholder={"Search by category.."} 
    />
  )
}
