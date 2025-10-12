import React, { useEffect } from 'react'
import SearchableDropdown from '../SearchableDropDown';
import usePackages from '@/hooks/packages/usePackages';

export default function PackagePicker({error, value, onChange, valueKey, labelKey }) {
  const { fetchPackages, isLoading, packages } = usePackages();
  
  useEffect(() => {
    fetchPackages();
  }, [])

  return (
    <SearchableDropdown
      error={error}
      options={packages}
      value={value}
      onChange={onChange}
      labelKey={labelKey}
      valueKey={valueKey}
      placeholder={"Select package"}
      searchPlaceholder={"Search by name.."} 
    />
  )
}
