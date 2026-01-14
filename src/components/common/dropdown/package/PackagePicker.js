import React, { useEffect } from 'react'
import SearchableDropdown from '../SearchableDropDown';
import usePackages from '@/hooks/packages/usePackages';

export default function PackagePicker({error, category, value, onChange, valueKey, labelKey, onPackageSelect }) {
  const { fetchPackages, packages } = usePackages();
  
  useEffect(() => {
    fetchPackages({
      category: category
    });
  }, [category])


  // console.log('ffff', value);
  return (
    <SearchableDropdown
      error={error}
      options={packages}
      value={value}
      onChange={onChange}
      labelKey={labelKey}
      valueKey={valueKey || "_id"}
      placeholder={"Select package"}
      searchPlaceholder={"Search by package name.."} 
    />
  )
}
