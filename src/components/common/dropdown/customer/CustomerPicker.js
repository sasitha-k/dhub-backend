import React, { useEffect } from 'react'
import useCustomer from '@/hooks/customers/useCustomer'
import SearchableDropdown from '../SearchableDropDown';

export default function CustomerPicker({errors, id, value, onChange, valueKey, labelKey }) {
  const { fetchCustomers, isLoading, customers } = useCustomer();
  
  useEffect(() => {
    fetchCustomers();
  }, [])

  console.log('ppp', customers)
  return (
    <SearchableDropdown
      error={errors?.[id]}
      options={customers}
      value={value}
      onChange={onChange}
      labelKey={labelKey}
      valueKey={valueKey}
      placeholder={"Select customer"}
      searchPlaceholder={"Search by name.."} 
    />
  )
}
