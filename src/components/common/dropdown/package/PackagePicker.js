import React, { useEffect } from 'react'
import SearchableDropdown from '../SearchableDropDown';
import usePackages from '@/hooks/packages/usePackages';

export default function PackagePicker({error, value, onChange, valueKey, labelKey, onPackageSelect }) {
  const { fetchPackages, isLoading, packages } = usePackages();
  
  useEffect(() => {
    fetchPackages();
  }, [])

  // console.log("packages", packages);

  const handleChange = (val) => {
    onChange(val);
    if (onPackageSelect) {
      const selected = packages.find(p => p[valueKey] === val);
      onPackageSelect(selected);
    }
  }

  return (
    <SearchableDropdown
      error={error}
      options={packages}
      value={value}
      onChange={handleChange}
      labelKey={labelKey}
      valueKey={valueKey}
      placeholder={"Select package"}
      searchPlaceholder={"Search by package name.."} 
    />
  )
}
