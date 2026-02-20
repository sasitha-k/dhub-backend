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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Package Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Base Price</TableHead>
          <TableHead>Available</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.length < 1 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
              No records available.
            </TableCell>
          </TableRow>
        ) : (
          items?.map((item, index) => {
            return (
            <TableRow 
              key={index} 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <TableCell className="font-medium">{item?.packageName}</TableCell>
              <TableCell><div className="capitalize">{item?.packageType?.replace(/_/g, " ")}</div></TableCell>
              <TableCell>
                  {item?.isQuoteRequired ? (
                      <span className="text-muted-foreground italic">Quote Required</span>
                  ) : (
                      item?.basePrice > 0 ? `${item?.basePrice} LKR` : "Calculated"
                  )}
              </TableCell>
              <TableCell>
                <StatusBadge>
                  {item?.isAvailable !== false ? 'Available' : 'Unavailable'}
                </StatusBadge>
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
          })
        )}
      </TableBody>
    </Table>
  );
}
