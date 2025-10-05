import StatusBadge from "@/components/common/badges/StatusBadge";
import DeleteButton from "@/components/common/buttons/DeleteButton";
import EditButton from "@/components/common/buttons/EditButton";
import ReferenceLink from "@/components/common/ReferenceLink";
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
import moment from "moment";

export function DataTable({
  items,
  handleDelete,
  handleEdit
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal">
                  {item?.date}{" "}{item?.time}
                </TableCell>
                <TableCell>{item?.customer?.name || "N/A"}</TableCell>
                <TableCell>{item?.driver || "N/A"}</TableCell>
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
                <TableCell className="flex gap-4">
                  <EditButton
                    onClick={() => {
                      handleEdit(item)
                    }}data-id="edit"
                  />
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
