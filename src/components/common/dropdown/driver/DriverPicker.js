import React, { useEffect } from 'react'
import useDrivers from '@/hooks/drivers/useDrivers';
import SearchableDropdown from '../SearchableDropDown';

export default function DriverPicker({error, value, onChange, valueKey, labelKey }) {
  const { fetchDrivers, isLoading, drivers } = useDrivers();
  
  useEffect(() => {
    fetchDrivers();
  }, [])

  return (
    <SearchableDropdown
      error={error}
      options={drivers}
      value={value}
      onChange={onChange}
      labelKey={labelKey}
      valueKey={valueKey}
      placeholder={"Select driver"}
      searchPlaceholder={"Search by name.."} 
    />
  )
}
