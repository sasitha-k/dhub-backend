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

export function DataTable({
  items,
  handleDelete,
  handleEdit
}) {

 
  return (
    <div>
      <Table>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
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
            <TableCell >
              <span className="grid gap-1 ">
                <span>Start At : {item.tripStartAt}</span>
              <span>End At : {item.tripEndAt}</span>
              </span>
            </TableCell>
            <TableCell >
              <span className="grid gap-1">
                <span>Odo Start : {item.odoStart}</span>
              <span>Odo End : {item.odoEnd}</span>
              </span>
              
            </TableCell>
            <TableCell className="flex gap-4">
                    {/* <HasPermission permission={"inventory.update"}> */}
                      <EditButton
                        onClick={() => {
                          handleEdit(item)
                        }}data-id="edit"
                      />
                    {/* </HasPermission> */}
                    {/* <HasPermission permission={"inventory.delete"}> */}
                      <DeleteButton
                        onClick={() => {
                          handleDelete(item)
                        }}data-id="delete"
                      ></DeleteButton>
                    {/* </HasPermission> */}
                  </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
