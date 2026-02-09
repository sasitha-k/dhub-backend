import React, { useEffect } from 'react'
import useDrivers from '@/hooks/drivers/useDrivers';
import SearchableDropdown from '../SearchableDropDown';

export default function DriverPicker({error, value, onChange, valueKey, onDriverSelect }) {
  const { fetchDrivers, isLoading, drivers } = useDrivers();
  
  useEffect(() => {
    fetchDrivers({
      status: "active"
    });
  }, [])

  const formattedItems = drivers?.map((item) => ({
   ...item,
   displayLabel: `${item?.firstName || ''} ${item?.lastName || ''} - ${item?.mobile || ''}`.trim(),
 }));
 
   const handleChange = (val) => {
     onChange(val);
     if (onDriverSelect) {
       const selected = drivers.find(c => c[valueKey] === val);
       onDriverSelect(selected);
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
