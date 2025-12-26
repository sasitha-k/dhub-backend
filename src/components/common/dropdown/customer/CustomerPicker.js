import React, { useEffect } from 'react'
import useCustomer from '@/hooks/customers/useCustomer'
import SearchableDropdown from '../SearchableDropDown';

export default function CustomerPicker({error, value, onChange, valueKey, labelKey, onCustomerSelect }) {
  const { fetchCustomers, isLoading, customers } = useCustomer();
  
  useEffect(() => {
    fetchCustomers();
  }, [])

      const formattedItems = customers?.map((item) => ({
  ...item,
  displayLabel: `${item?.firstName || ''} ${item?.lastName || ''} - ${item?.mobile || ''}`.trim(),
}));

  const handleChange = (val) => {
    onChange(val);
    if (onCustomerSelect) {
      const selected = customers.find(c => c[valueKey] === val);
      onCustomerSelect(selected);
    }
  }

  console.log('formattedItems : ', formattedItems)
  return (
    <SearchableDropdown
      error={error}
      options={formattedItems}
      value={value}
      onChange={handleChange}
      labelKey={"displayLabel"}
      valueKey={valueKey}
      placeholder={"Select customer"}
      searchPlaceholder={"Search by name or mobile.."} 
    />
  )
}
