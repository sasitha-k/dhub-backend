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
    <div className="h-full flex flex-col ">
      <div className="relative h-[550px] overflow-y-scroll border rounded-lg">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Pricing</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal">{item?.title}</TableCell>
                <TableCell>{item?.description}</TableCell>
                <TableCell>{item?.unit}</TableCell>
                <TableCell>
                  <span className='grid gap-1 text-xs'>
                    <span>Min Unit: {item?.pricing?.minimum}</span>
                    <span>Min Charge: {item?.pricing?.minimumCharge}</span>
                    <span>Per Unit: {item?.pricing?.perUnitCharge}</span>
                  </span>
                </TableCell>
                <TableCell className="flex gap-4">
                  <EditButton
                    onClick={() => {
                      handleEdit(item)
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
