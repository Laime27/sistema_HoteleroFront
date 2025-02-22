"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Genera un arreglo de páginas para la paginación, incluyendo puntos suspensivos ("...")
 * cuando hay un rango de páginas omitido.
 *
 * @param currentPage La página actual.
 * @param totalPages El total de páginas disponibles.
 * @returns Un arreglo de números de página o el string "..." para indicar rangos omitidos.
 */
const generatePagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const delta = 2; // Número de páginas a mostrar antes y después de la página actual
  const pages: (number | string)[] = [];

  // Determinar el rango central de páginas a mostrar
  const startPage = Math.max(2, currentPage - delta);
  const endPage = Math.min(totalPages - 1, currentPage + delta);

  // Agregar las páginas dentro del rango
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Si existe un hueco entre la primera página y el inicio del rango, insertar "..."
  if (startPage > 2) {
    pages.unshift("...");
  }
  // Si existe un hueco entre el final del rango y la última página, insertar "..."
  if (endPage < totalPages - 1) {
    pages.push("...");
  }

  // Siempre incluir la primera y la última página
  pages.unshift(1);
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export function DataTable<TData>({
  columns,
  data = [],
  totalPages,
  currentPage,
  onPageChange,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  const paginationRange = generatePagination(currentPage, totalPages);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {data && data.length > 0 && table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="p-4">
        <Pagination className="flex items-center justify-end ">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                href={currentPage > 1 ? "#" : undefined}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : 0}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
                aria-label="Página anterior"
              />
            </PaginationItem>

            {paginationRange.map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page as number)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
                href={currentPage < totalPages ? "#" : undefined}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : 0}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
                aria-label="Siguiente página"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
