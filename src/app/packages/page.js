'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import CreateButton from '@/components/common/buttons/CreateButton';
import { DataTable } from './DataTable';
import usePackages from '@/hooks/packages/usePackages';
import { PackageModal } from './PackageModal';
import SearchInput from '@/components/common/inputs/SearchInput';
import PackageCategoryPicker from '@/components/common/dropdown/package/PackageCategoryPicker';

const tabs = ["DAY_TIME", "NIGHT_DISTANCE", "NIGHT_HOURLY", "AIRPORT_DROP", "LONG_TRIP", "CUSTOM"];

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchPackages, packages, isLoading } = usePackages();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if(filters){
      fetchPackages(filters);
    } else {
      fetchPackages();
    }
  }, [fetchPackages, filters])

  const handleCreate = () => {
    setIsNewItem(true);
    setSheetOpen(true);
  }

  const handleEdit = (item) => {
    setIsNewItem(false);
    setSheetOpen(true);
    setSelectedItem(item);
  }

  const handleClose = () => {
    setSheetOpen(false);
  }
  
 

  return (
    <BreadcrumbProvider value={[
      // { label: "Dashboard", href: "/dashboard" },
      { label: "Packages", href: null},
    ]}>
      <div className="flex h-auto flex-col gap-6 p-4">
         {/* Right Side: Search & Create */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full justify-between">
            {/* Search */}
            <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
              <SearchInput
                value={filters?.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                placeholder="Search by package name"
                data-id="search"
            />
            <PackageCategoryPicker
              value={filters?.packageCategory}
              onChange={(e) => setFilters({...filters, packageCategory: e})}
              placeholder="Select package category"
              data-id="category"
            />
            </div>

            {/* Create Button */}
            <CreateButton onClick={handleCreate} />
          </div>

        {/* Table */}
        <DataTable
          items={packages}
          handleEdit={handleEdit}
        />

        {/* Package Form */}
        <div className='w-full'>
          <PackageModal
            sheetOpen={sheetOpen}
            isNewItem={isNewItem}
            selectedItem={selectedItem}
            setSheetOpen={setSheetOpen}
            fetchPackages={fetchPackages}
            handleClose={handleClose}
          />
        </div>
      </div>
    </BreadcrumbProvider>
  )
}
