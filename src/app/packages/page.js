'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import CreateButton from '@/components/common/buttons/CreateButton';
import { DataTable } from './DataTable';
import { PackageForm } from './PackageForm';
import usePackages from '@/hooks/packages/usePackages';
import SearchFilter from '@/components/common/filters/SearchFilter';
import { Button } from '@/components/ui/button';
import { capitalizeWords } from '@/constants/CapitalizedWord';
import { PackageModal } from './PackageModal';

const tabs = ["DAY_TIME", "NIGHT_DISTANCE", "NIGHT_HOURLY", "AIRPORT_DROP", "LONG_TRIP", "CUSTOM"];

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchPackages, packages, isLoading } = usePackages();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages])

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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full justify-end">
            {/* Search */}
            <div className="w-full sm:w-72">
              <SearchFilter
                data={packages}
                filterKeys={["packageName"]}
                filters={filters}
                setFilters={setFilters}
                onFilter={setFiltered}
                placeholder="Search by package name"
                data-id="search"
              />
            </div>

            {/* Create Button */}
            <CreateButton onClick={handleCreate} />
          </div>

        {/* Table */}
        <DataTable
          items={filtered}
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
