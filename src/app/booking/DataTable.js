import StatusBadge from "@/components/common/badges/StatusBadge";
import EditButton from "@/components/common/buttons/EditButton";
import ReferenceLink from "@/components/common/ReferenceLink";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatter } from "@/constants/formatNumber";
import moment from "moment";

export function DataTable({
  items,
  handleDelete,
  handleEdit,
  handleStart
}) {

 
  return (
   
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Booking Id</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden lg:table-cell">Package</TableHead>
              <TableHead className="hidden lg:table-cell">Driver</TableHead>
              <TableHead className="hidden xl:table-cell">Description</TableHead>
              <TableHead className="hidden xl:table-cell">Pickup Location</TableHead>
              <TableHead className="hidden md:table-cell">From</TableHead>
              <TableHead className="hidden md:table-cell">To</TableHead>
              <TableHead className="hidden xl:table-cell">Trip Duration</TableHead>
              <TableHead className="hidden 2xl:table-cell">Odo Meter</TableHead>
              <TableHead className="hidden lg:table-cell">Booking Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { items?.length < 1 ? (
              <TableRow>
                <TableCell colSpan={14} className="h-24 text-center">
                  No records available for active tab.
                </TableCell>
              </TableRow>
            ) : (
              items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal hidden md:table-cell">
                  {item?.date}{" "}{item?.time}
                </TableCell>
                <TableCell className="font-normal">
                 <ReferenceLink path={`/booking/${item?._id}`} >{item?.bookingId}</ReferenceLink>
                </TableCell>
                <TableCell>
                    <div className="flex flex-col">
                        <span className="font-medium">{item?.customerName || "N/A"}</span>
                        <span className="text-xs text-muted-foreground">{item?.customerNumber}</span>
                    </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{item?.selectedPackage?.packageName || "N/A"}</TableCell>
                <TableCell className="hidden lg:table-cell">{item?.driverName || "N/A"}</TableCell>
                <TableCell className="hidden xl:table-cell max-w-[200px] truncate" title={item?.description}>{item?.description || "N/A"}</TableCell>
                <TableCell className="hidden xl:table-cell max-w-[150px] truncate" title={item?.pickupLocation}>{item?.pickupLocation || "N/A"}</TableCell>
                <TableCell className="hidden md:table-cell">{item?.from || "N/A"}</TableCell>
                <TableCell className="hidden md:table-cell">{item?.to || "N/A"}</TableCell>
                <TableCell className={"text-xs hidden xl:table-cell"}>
                  <span className="grid gap-1">
                    <span>Start : {item?.tripStartAt ? moment(item.tripStartAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span>End : {item?.tripEndAt ? moment(item.tripEndAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span className="font-semibold">
                        Duration : {item?.meta?.totalHours ? `${parseFloat(item.meta.totalHours).toFixed(2)} hrs` : 
                        (item?.tripStartAt && item?.tripEndAt ? `${moment(item.tripEndAt).diff(moment(item.tripStartAt), 'hours', true).toFixed(2)} hrs` : "N/A")}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="hidden 2xl:table-cell">
                  <span className="grid gap-1">
                    <span>Odo Start : {item.odoStart || "N/A"}</span>
                    <span>Odo End : {item.odoEnd || "N/A"}</span>
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatter.format(item?.fee)}
                </TableCell>
                <TableCell>
                  <StatusBadge>{item?.status}</StatusBadge>
                </TableCell>
                <TableCell>
                  {(item?.status === "pending" || item?.status === "ongoing") && (
                     <EditButton
                      onClick={() => {
                          handleEdit(item);
                      }}data-id="edit"
                      />
                    )}
                  {/* <DeleteButton
                    onClick={() => {
                      handleDelete(item)
                    }}data-id="delete"
                  ></DeleteButton> */}
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
  );
}
