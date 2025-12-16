'use client';

import React, { useState, useEffect } from "react";
import SearchInput from "../inputs/SearchInput";

export default function SearchFilter({ data = [], filterKeys = [], filters, setFilters,  onFilter, placeholder = "Search...", ...props }) {
  const [filter, setFilter] = useState(filters);
  useEffect(() => {
    if (!data || data?.length === 0) {
      onFilter();
      return;
    }

    if (!filter?.searchQuery) {
      onFilter(data);
      return;
    }

    const filteredData = data?.filter((item) =>
      filterKeys?.some((key) => {
        const keys = key?.split("."); 
        let value = item;

        for (const k of keys) {
          value = value?.[k]; 
          if (!value) return false;
        }

        return value.toString().toLowerCase().includes(filter?.searchQuery.toLowerCase());
      })
    );

    onFilter(filteredData);
  }, [filter?.searchQuery, data]);


  return (
    <>
      {filters ? (
       <SearchInput
          value={filter?.searchQuery}
          onChange={(e) => setFilter({...filter, searchQuery: e.target.value})}
          placeholder={placeholder}
        />
      ) : (
          <SearchInput
          value={filter?.searchQuery}
          onChange={(e) => setFilters({...filter, searchQuery: e.target.value})}
          placeholder={placeholder}
        />
      ) }
    </>
  );
}
