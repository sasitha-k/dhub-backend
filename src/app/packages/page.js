'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import TextInput from '@/components/common/inputs/TextInput';
import CreateButton from '@/components/common/buttons/CreateButton';
import { DataTable } from './DataTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PackageForm } from './PackageForm';
import usePackages from '@/hooks/packages/usePackages';


const tabs = ["pending", "onGoing", "completed"]

export default function Page() {
  const [activeTab, setActiveTab] = useState("pending");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchPackages, packages, isLoading } = usePackages();

  useEffect(() => {
    fetchPackages({ status: activeTab });
  }, [fetchPackages, activeTab])

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
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Packages", href: null},
                ]}>
     <div className="flex w-auto h-auto flex-col gap-6 p-4">
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-4'>
          <TextInput placeholder="Search" readOnly/>
          <div className='col-span-3 lg:block hidden'></div>
          <TextInput placeholder="Date Range" readOnly/>
        </div>
        <div className='w-full flex justify-end'>
           <CreateButton onClick={handleCreate}/>
       </div>
             <DataTable
               items={packages}
               handleEdit={handleEdit}
             />
        <div className='w-full'>
          <PackageForm
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
