import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

type Content = string | number | boolean | React.ReactNode;

export interface Columns<T> {
  id: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  accessorKey?: keyof T;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Columns<T>[];
  data: T[] | undefined;
  isLoading?: boolean;
}

export function DataTable<T>({ columns, data, isLoading }: DataTableProps<T>) {
  const headers = columns.map((column) => ({
    content: column.header,
    className: column.className,
    id: column.id,
  }));

  const tableContainerClassName = "border rounded-lg px-2 bg-card";

  const tableHeader = (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <TableHeader
            className={header.className}
            key={`th-${header.id}-${index}`}
          >
            {header.content}
          </TableHeader>
        ))}
      </TableRow>
    </TableHead>
  );

  if (isLoading) {
    return (
      <div className={tableContainerClassName}>
        <Table>
          {tableHeader}
          <TableBody>
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={tableContainerClassName}>
        <Table>
          {tableHeader}
          <TableBody>
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                No data
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={tableContainerClassName}>
      <Table>
        {tableHeader}
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={`data-row-${index}`}>
              {columns?.map((cell) => (
                <TableCell
                  key={`${index}-td-${cell.id}`}
                  className={cell.className}
                >
                  {cell.accessorKey
                    ? (row[cell.accessorKey] as Content)
                    : cell.cell!(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
