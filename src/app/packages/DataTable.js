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
            {items?.map((item, index) => {
              const getRowClassName = () => {
                switch (item?.status?.toLowerCase()) {
                  case 'completed':
                    return 'bg-green-50 hover:bg-green-100 border-l-4 border-green-500';
                  case 'onGoing':
                    return 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500';
                  case 'pending':
                    return 'bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-500';
                  default:
                    return 'hover:bg-gray-50';
                }
              };

              return (
              <TableRow key={index} className={getRowClassName()}>
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
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
