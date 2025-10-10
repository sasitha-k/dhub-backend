'use client';

import { BreadcrumbProvider } from '@/hooks/providers/useBreadcrumbProvider'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';
import TextInput from '@/components/common/inputs/TextInput';
import CreateButton from '@/components/common/buttons/CreateButton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PackageForm } from './PackageForm';
import usePackages from '@/hooks/packages/usePackages';
import EditButton from '@/components/common/buttons/EditButton';


export default function Page() {

  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchPackages, packages, isLoading } = usePackages();

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
              <Card>
                <CardContent>
                  <Table>
      <TableCaption className={""}>A list of your package services.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Pricing</TableHead>
                  {/* <TableHead></TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages?.map((item, index) => (
          <TableRow key={index} className={""}>
            <TableCell>{item?.title}</TableCell>
                <TableCell>{item?.description}</TableCell>
                <TableCell>{item?.unit}</TableCell>
            <TableCell>
              <span className='grid gap-1'>
                <span>Minimum Unit : {item?.pricing?.minimum}</span>
              <span>Minimum Charge : {item?.pricing?.minimumCharge}</span>
              <span>Per Unit Charge : {item?.pricing?.perUnitCharge}</span>
              </span>
            </TableCell>
             {/* <TableCell className="flex gap-4">
                  <EditButton
                    onClick={() => {
                      handleEdit(item)
                    }}data-id="edit"
                  />
                  <DeleteButton
                    onClick={() => {
                      handleDelete(item)
                    }}data-id="delete"
                  ></DeleteButton>
                </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
                </CardContent>
              </Card>
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
