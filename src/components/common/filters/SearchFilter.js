'use client';

import React, { useEffect, useMemo, useRef } from "react";
import SearchInput from "../inputs/SearchInput";

export default function SearchFilter({ activeTab, data = [], filterKeys = [], filters, setFilters,  onFilter, placeholder = "Search...", ...props }) {
  
  const searchValue = filters?.search || '';
  const prevFilteredDataRef = useRef();

  // Handle search change - update filters with "search" key for API query
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    
    // Update filters state with "search" key to trigger API query
    setFilters({
      ...filters,
      search: searchValue || undefined
    });
  };

  // Memoize filtered data to avoid unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const searchValueLower = searchValue?.toLowerCase() || '';
    
    // If searchValue is set, it means the API is handling the search filtering
    // So we only need to filter by activeTab (day/night)
    // Otherwise, do client-side filtering by both category and search text
    const isApiSearching = !!searchValue;
    
    // Filter by activeTab and search text
    // Handle both booking structure (item?.selectedPackage?.packageCategory) and package structure (item?.packageCategory)
    return data.filter((item) => {
      // Filter by category (day/night)
      const packageCategory = item?.selectedPackage?.packageCategory || item?.packageCategory;
      let matchesCategory = true;
      if (activeTab === "day") {
        matchesCategory = packageCategory === "day_time" || packageCategory === "day";
      } else if (activeTab === "night") {
        matchesCategory = packageCategory === "night_time" || packageCategory === "night";
      }
      
      // Only do client-side search filtering if API is not handling the search
      let matchesSearch = true;
      if (!isApiSearching && searchValueLower && filterKeys.length > 0) {
        matchesSearch = filterKeys.some(key => {
          // Handle nested properties (e.g., "customer.firstName")
          const keys = key.split('.');
          let value = item;
          for (const k of keys) {
            value = value?.[k];
            if (value === undefined || value === null) break;
          }
          return value && String(value).toLowerCase().includes(searchValueLower);
        });
      }
      
      return matchesCategory && matchesSearch;
    });
  }, [data, activeTab, searchValue, filterKeys]);

  // Update parent component with filtered data
  // Only call onFilter if the filtered data actually changed
  useEffect(() => {
    if (onFilter) {
      // Compare current filtered data with previous to avoid infinite loops
      const prevData = prevFilteredDataRef.current;
      const prevDataString = prevData ? JSON.stringify(prevData) : null;
      const currentDataString = JSON.stringify(filteredData);
      
      if (prevDataString !== currentDataString) {
        prevFilteredDataRef.current = filteredData;
        onFilter(filteredData);
      }
    }
  }, [filteredData, onFilter]);


  return (
    <SearchInput
      value={searchValue}
      onChange={handleSearchChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
