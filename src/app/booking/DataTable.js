import StatusBadge from "@/components/common/badges/StatusBadge";
import EditButton from "@/components/common/buttons/EditButton";
import ReferenceLink from "@/components/common/ReferenceLink";
import { Card } from "@/components/ui/card";
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
     <div className="h-full flex flex-col ">
      <div className="relative max-h-[450px] md:max-h-[550px] lg:max-h-[650px] overflow-y-scroll overflow-x-auto border rounded-lg ">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead >Date</TableHead>
              <TableHead>Booking Id</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead >Package</TableHead>
              <TableHead >Driver</TableHead>
              <TableHead >Description</TableHead>
              <TableHead >Location</TableHead>
              <TableHead >Trip Duration</TableHead>
              <TableHead >Odo Meter</TableHead>
              <TableHead >Booking Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead >Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { items?.length < 1 ? (
              <TableRow>
                <TableCell colSpan={14} className="h-24 text-center">
                  No records available.
                </TableCell>
              </TableRow>
            ) : (
              items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal grid gap-1">
                    <span>{item?.date}{" "}</span>
                    <span>{item?.time}</span>
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
                <TableCell className="">{item?.selectedPackage?.packageName || "N/A"}</TableCell>
                <TableCell className="">{item?.driverName || "N/A"}</TableCell>
                <TableCell className="" title={item?.description}>{item?.description || "N/A"}</TableCell>
                  <TableCell className="grid gap-1" title={item?.pickupLocation}>
                    <span>Pick Up : {item?.pickupLocation || "N/A"}</span>
                      <span>From : {item?.from || "N/A"}</span>
                      <span>Drop : {item?.to || "N/A"}</span>
                  </TableCell>
                <TableCell className={"text-xs"}>
                  <span className="grid gap-1">
                    <span>Start : {item?.tripStartAt ? moment(item.tripStartAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span>End : {item?.tripEndAt ? moment(item.tripEndAt).format("MM-DD HH:mm") : "N/A"}</span>
                    <span className="font-semibold">
                        Duration : {item?.meta?.totalHours ? `${parseFloat(item.meta.totalHours).toFixed(2)} hrs` : 
                        (item?.tripStartAt && item?.tripEndAt ? `${moment(item.tripEndAt).diff(moment(item.tripStartAt), 'hours', true).toFixed(2)} hrs` : "N/A")}
                    </span>
                  </span>
                </TableCell>
                <TableCell className="">
                  <span className="grid gap-1">
                    <span>Odo Start : {item.odoStart || "N/A"}</span>
                    <span>Odo End : {item.odoEnd || "N/A"}</span>
                  </span>
                </TableCell>
                  <TableCell className="">
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
        </div>
      </div>    
  );
}
