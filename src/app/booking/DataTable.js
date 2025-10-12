import StatusBadge from "@/components/common/badges/StatusBadge";
import EditButton from "@/components/common/buttons/EditButton";
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
    <div className="h-full flex flex-col ">
      <div className="relative h-[550px] overflow-y-scroll border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Pickup Location</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Trip Duration</TableHead>
              <TableHead>Odo Meter</TableHead>
              <TableHead>Booking Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal">
                  {item?.date}{" "}{item?.time}
                </TableCell>
                <TableCell>{item?.customer?.name || "N/A"}</TableCell>
                <TableCell>{item?.driver?.name || "N/A"}</TableCell>
                <TableCell>{item?.description || "N/A"}</TableCell>
                <TableCell>{item?.pickupLocation || "N/A"}</TableCell>
                <TableCell>{item?.from || "N/A"}</TableCell>
                <TableCell>{item?.to || "N/A"}</TableCell>
                <TableCell className={"text-xs"}>
                  <span className="grid gap-1 ">
                    <span>Start At : {moment(item.tripStartAt).format("DD-MM-YYYY HH:MM") || "N/A"}</span>
                    <span>End At : {moment(item.tripEndAt).format("DD-MM-YYYY HH:MM") || "N/A"}</span>
                    <span>Duration : {item.tripEndAt - item.tripStartAt}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="grid gap-1">
                    <span>Odo Start : {item.odoStart || "N/A"}</span>
                    <span>Odo End : {item.odoEnd || "N/A"}</span>
                  </span>
                </TableCell>
                <TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
