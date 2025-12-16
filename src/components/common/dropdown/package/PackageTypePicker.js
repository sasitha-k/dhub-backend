import React from 'react'
import SearchableDropdown from '../SearchableDropDown';

export default function PackageTypePicker({error, value, onChange, valueKey, labelKey }) {
    const options = [
        { label: "Day Time", value: "DAY_TIME" },
        { label: "Night Distance", value: "NIGHT_DISTANCE" },
        { label: "Night Hourly", value: "NIGHT_HOURLY" },
        { label: "Airport Drop", value: "AIRPORT_DROP" },
        { label: "Long Trip", value: "LONG_TRIP" },
        { label: "Custom", value: "CUSTOM" },
    ]

  return (
    <SearchableDropdown
      error={error}
      options={options}
      value={value}
      onChange={onChange}
      labelKey={labelKey || "label"}
      valueKey={valueKey || "value"}
      placeholder={"Select package type"}
      searchPlaceholder={"Search by type.."} 
    />
  )
}
