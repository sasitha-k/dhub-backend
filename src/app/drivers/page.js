"use client";

import { BreadcrumbProvider } from "@/hooks/providers/useBreadcrumbProvider";
import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CreateButton from "@/components/common/buttons/CreateButton";
import EditButton from "@/components/common/buttons/EditButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDrivers from "@/hooks/drivers/useDrivers";
import SearchFilter from "@/components/common/filters/SearchFilter";
import { DriverModal } from "./DriverModal";

export default function Page() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { fetchDrivers, drivers, isLoading } = useDrivers();
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});

  const filterKeys = useMemo(
    () => ["firstName", "lastName", "email", "mobile", "licenseNumber"],
    [],
  );

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  useEffect(() => {
    if (drivers && drivers.length > 0 && !filters?.search) {
      setFiltered(drivers);
    } else if (drivers && drivers.length === 0) {
      setFiltered([]);
    }
  }, [drivers, filters?.search]);

  const handleCreate = () => {
    setIsNewItem(true);
    setSheetOpen(true);
  };

  const handleEdit = (item) => {
    setIsNewItem(false);
    setSheetOpen(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSheetOpen(false);
  };

  const statistics = useMemo(() => {
    if (!filtered || filtered.length === 0) {
      return { totalCount: 0, partTimeCount: 0, fullTimeCount: 0 };
    }
    const totalCount = filtered.length;
    const partTimeCount = filtered.filter(
      (d) => d?.employmentType === "part_time",
    ).length;
    const fullTimeCount = totalCount - partTimeCount;
    return { totalCount, partTimeCount, fullTimeCount };
  }, [filtered]);

  return (
    <BreadcrumbProvider value={[{ label: "Drivers", href: null }]}>
      <div className="relative pb-20 flex h-auto flex-col gap-6 p-4 md:max-w-[92%] lg:max-w-[94%] xl:max-w-[99%] 2xl:max-w-[99%] 3xl:max-w-[100%]">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Drivers
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {statistics.totalCount}
                </p>
                <p className="text-xs text-muted-foreground">All drivers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Full Time
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {statistics.fullTimeCount}
                </p>
                <p className="text-xs text-muted-foreground">
                  Full time drivers
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Part Time
                </p>
                <p className="text-3xl font-bold text-amber-600">
                  {statistics.partTimeCount}
                </p>
                <p className="text-xs text-muted-foreground">
                  Part time drivers
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="w-full sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <label className="text-sm font-medium mb-2 block text-muted-foreground">
                  Search
                </label>
                <SearchFilter
                  data={drivers ?? []}
                  filterKeys={filterKeys}
                  filters={filters}
                  setFilters={setFilters}
                  onFilter={setFiltered}
                  placeholder="Search by name, email, mobile or license"
                  data-id="search"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className={"overflow-x-auto"}>
            <Table>
              <TableCaption className={""}>A list of your recent drivers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Employment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Loading drivers...
                    </TableCell>
                  </TableRow>
                ) : !filtered?.length ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No drivers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((item, index) => (
                    <TableRow key={item?._id ?? index} className={""}>
                      <TableCell>{item?.firstName}</TableCell>
                      <TableCell>{item?.lastName}</TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell>{item?.mobile}</TableCell>
                      <TableCell>{item?.licenseNumber}</TableCell>
                      <TableCell>
                        {item?.employmentType === "part_time"
                          ? "Part Time"
                          : "Full Time"}
                      </TableCell>
                      <TableCell>{item?.type}</TableCell>
                      <TableCell className="flex gap-4">
                        <EditButton
                          onClick={() => handleEdit(item)}
                          data-id="edit"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="fixed bottom-4 right-6 z-50">
          <CreateButton
            className="bg-primary hover:text-[#FFE8A3] text-[#ffffff]"
            onClick={handleCreate}
          >
            Create Driver
          </CreateButton>
        </div>
      </div>

      <DriverModal
        sheetOpen={sheetOpen}
        isNewItem={isNewItem}
        selectedItem={selectedItem}
        setSheetOpen={setSheetOpen}
        fetchDrivers={fetchDrivers}
        handleClose={handleClose}
      />
    </BreadcrumbProvider>
  );
}
