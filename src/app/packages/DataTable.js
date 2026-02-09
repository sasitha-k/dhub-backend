import StatusBadge from "@/components/common/badges/StatusBadge";
import EditButton from "@/components/common/buttons/EditButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export function DataTable({
  items,
  handleEdit
}) {

  return (
    <div className="h-full flex flex-col">
      <div className="relative h-[550px] overflow-auto border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="min-w-[150px]">Package Name</TableHead>
              <TableHead className="min-w-[120px] hidden md:table-cell">Category</TableHead>
              <TableHead className="min-w-[120px] hidden lg:table-cell">Type</TableHead>
              <TableHead className="min-w-[100px]">Base Price</TableHead>
              <TableHead className="min-w-[200px]">Details</TableHead>
              <TableHead className="min-w-[200px] hidden sm:table-cell">Extra Rates</TableHead>
              <TableHead className="min-w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item, index) => {
              return (
              <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium align-top py-4">
                    <div className="flex flex-col gap-1">
                      <span>{item?.packageName}</span>
                      <div className="flex flex-wrap gap-1 md:hidden">
                        <StatusBadge className="text-[10px] py-0 h-4">
                          {item?.packageCategory?.replace(/_/g, " ")}
                        </StatusBadge>
                        <StatusBadge className="text-[10px] py-0 h-4 lg:hidden">
                          {item?.packageType?.replace(/_/g, " ")}
                        </StatusBadge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell align-top py-4">
                    <StatusBadge>
                      {item?.packageCategory?.replace(/_/g, " ")}
                    </StatusBadge>
                  </TableCell>
                <TableCell className="hidden lg:table-cell align-top py-4">
                  <StatusBadge>{item?.packageType?.replace(/_/g, " ")}</StatusBadge>
                </TableCell>
                <TableCell className="align-top py-4">
                    {item?.isQuoteRequired ? (
                        <span className="text-muted-foreground italic">Quote Required</span>
                    ) : (
                        item?.basePrice > 0 ? `${item?.basePrice} LKR` : "Calculated"
                    )}
                </TableCell>
                <TableCell className="align-top py-4">
                  <span className='grid gap-1 text-xs'>
                    {item?.maxDurationHours > 0 && <span>Max Duration: {item?.maxDurationHours} hrs</span>}
                    {item?.maxTravelDistanceKM > 0 && <span>Max Distance: {item?.maxTravelDistanceKM} km</span>}
                    {item?.freeWaitingMinutes > 0 && <span>Free Waiting: {item?.freeWaitingMinutes} mins</span>}
                    {item?.dayTimeStart && <span>Day Time: {item?.dayTimeStart} - {item?.dayTimeEnd}</span>}
                    {item?.serviceStartTime && <span>Service Time: {item?.serviceStartTime} - {item?.serviceEndTime}</span>}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell align-top py-4">
                    <span className='grid gap-1 text-xs'>
                        {item?.overtimeRate > 0 && <span>Overtime: {item?.overtimeRate} LKR/hr</span>}
                        {item?.lateNightRate > 0 && <span>Late Night: {item?.lateNightRate} LKR/hr</span>}
                        {item?.extraKMRate > 0 && <span>Extra KM: {item?.extraKMRate} LKR/km</span>}
                        {item?.waiting15MinRate > 0 && <span>Waiting (15m): {item?.waiting15MinRate} LKR</span>}
                        {item?.pickupOutsideColomboFee > 0 && <span>Outside Pickup: {item?.pickupOutsideColomboFee} LKR</span>}
                    </span>
                </TableCell>
                <TableCell className="align-top py-4">
                  <div className="flex gap-4">
                    <EditButton
                      onClick={() => {
                        handleEdit(item)
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
