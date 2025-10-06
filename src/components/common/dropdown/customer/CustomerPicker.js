import React, { useEffect } from 'react'
import useCustomer from '@/hooks/customers/useCustomer'
import SearchableDropdown from '../SearchableDropDown';

export default function CustomerPicker({error, value, onChange, valueKey, labelKey }) {
  const { fetchCustomers, isLoading, customers } = useCustomer();
  
  useEffect(() => {
    fetchCustomers();
  }, [])

  // console.log('customers : ', customers)
  return (
    <SearchableDropdown
      error={error}
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
