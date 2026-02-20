'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState, useMemo } from 'react'
import CreateButton from '@/components/common/buttons/CreateButton';
import { DataTable } from './DataTable';
import usePackages from '@/hooks/packages/usePackages';
import SearchFilter from '@/components/common/filters/SearchFilter';
import { PackageModal } from './PackageModal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchPackages, packages, isLoading } = usePackages();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeTab, setActiveTab] = useState("day");
  
  // Memoize filterKeys to prevent unnecessary re-renders
  const filterKeys = useMemo(() => ["packageName"], []);

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

  // Calculate statistics from packages
  const statistics = useMemo(() => {
    if (!filtered || filtered.length === 0) {
      return {
        totalCount: 0,
        availableCount: 0,
        unavailableCount: 0,
      };
    }

    const totalCount = filtered.length;
    const availableCount = filtered.filter(pkg => pkg.isAvailable !== false).length;
    const unavailableCount = totalCount - availableCount;

    return {
      totalCount,
      availableCount,
      unavailableCount,
    };
  }, [filtered]);

  const handleCreateDayTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("day");
  }

  const handleCreateNightTime = () => {
    setIsNewItem(true);
    setSelectedItem(null);
    setSheetOpen(true);
    setActiveTab("night");
  }

  return (
    <BreadcrumbProvider value={[
      // { label: "Dashboard", href: "/dashboard" },
      { label: "Packages", href: null},
    ]}>
      <div className="relative pb-20 flex h-auto flex-col gap-6 p-4 md:max-w-[92%] lg:max-w-[94%] xl:max-w-[99%] 2xl:max-w-[99%] 3xl:max-w-[100%]">
        {/* 🔹 Tabs - Time Type Selection */}
        <div className="flex items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger 
                value="day" 
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:font-semibold transition-all duration-200 hover:bg-amber-50 dark:hover:bg-amber-950/20 rounded-md"
              >
                ☀️ Day Time
              </TabsTrigger>
              <TabsTrigger 
                value="night" 
                className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:font-semibold transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-md"
              >
                🌙 Night Time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 🔹 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Packages Card */}
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">Total Packages</p>
                <p className="text-3xl font-bold text-blue-600">{statistics.totalCount}</p>
                <p className="text-xs text-muted-foreground">All packages in this category</p>
              </div>
            </CardContent>
          </Card>

          {/* Available Packages Card */}
          {/* <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">Available Packages</p>
                <p className="text-3xl font-bold text-green-600">{statistics.availableCount}</p>
                <p className="text-xs text-muted-foreground">Packages currently active</p>
              </div>
            </CardContent>
          </Card> */}

          {/* Unavailable Packages Card */}
          {/* <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">Unavailable Packages</p>
                <p className="text-3xl font-bold text-yellow-600">{statistics.unavailableCount}</p>
                <p className="text-xs text-muted-foreground">Packages currently inactive</p>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* 🔹 Filters Section */}
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Search Filter */}
              <div className="w-full sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">Search</label>
                <SearchFilter
                  data={packages}
                  filterKeys={filterKeys}
                  filters={filters}
                  setFilters={setFilters}
                  onFilter={setFiltered}
                  placeholder="Search by package name"
                  data-id="search"
                  activeTab={activeTab}
                />
              </div>

              {/* 🔹 Additional Filters - Add new filters here */}
              {/* Example structure for new filters:
              <div className="w-full">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">Filter Label</label>
                <YourFilterComponent
                  value={filters?.filterKey}
                  onChange={(e) => setFilters({...filters, filterKey: e})}
                />
              </div>
              */}
            </div>
          </CardContent>
        </Card>

        {/* 🔹 Table */}
        <Card>
          <CardContent className={"overflow-x-auto"}>
            {isLoading ? (
              <div className="flex items-center justify-center h-[550px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-muted-foreground">Loading packages...</p>
                </div>
              </div>
            ) : (
              <DataTable
                items={filtered}
                handleEdit={handleEdit}
              />
            )}
          </CardContent>
        </Card>

        {/* 🔹 Fixed Create Button */}
        <div className="fixed bottom-4 right-6 z-50">

            <CreateButton
              className="bg-primary hover:text-[#FFE8A3] text-[#ffffff]"
              onClick={handleCreateDayTime}>Create Package</CreateButton>
         
        </div>
      </div>

      {/* 🔹 Package Form */}
      <PackageModal
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}
        setSheetOpen={setSheetOpen}
        fetchPackages={fetchPackages}
        handleClose={handleClose}
      />
    </BreadcrumbProvider>
  )
}
