import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import ModalCategoria from "./component/ModalCategoria";
import ModalEliminar from "./component/ModalEliminar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListarCategoria } from "./servicio/categoriaServicio";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

interface Categoria {
  id: string;
  nombre: string;
}

export default function Categoria() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEliminar, setIsOpenEliminar] = useState(false);
  const [data, setData] = useState<Categoria[]>([]);
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const columns: ColumnDef<Categoria>[] = [
    {
      accessorKey: "id",
      header: "N",
    },
    {
      accessorKey: "nombre",
      header: "Categoria",
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => abrirModal(row.original.id)}
          >
            <MdEdit />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => abrirModalEliminar(row.original.id)}
          >
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  const abrirModal = (id: string | null = null) => {
    setCategoriaId(id);
    setIsOpen(true);
  };

  const abrirModalEliminar = (id: string) => {
    setCategoriaId(id);
    setIsOpenEliminar(true);
  };

  const obtenerCategorias = async (page: number = 1) => {
    setLoading(true);
    try {
      const data = await ListarCategoria(page);
      setData(data.data);
      setCurrentPage(data.current_page);
      setTotalPages(data.last_page);
      
    } catch (error) {
      console.error("Error al obtener categorías", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCategorias(currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Categorías  </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end" >
          <Button className="mb-4" onClick={() => abrirModal()}>
            Crear Categoría
          </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-full animate-pulse" />
              ))}
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={data}
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </CardContent>
      </Card>

      <ModalCategoria
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categoriaId={categoriaId}
        actualizarLista={obtenerCategorias}
      />

      <ModalEliminar
        isOpen={isOpenEliminar}
        setIsOpen={setIsOpenEliminar}
        categoriaId={categoriaId}
        actualizarLista={obtenerCategorias}
      />

      <Toaster />
    </div>
  );
}
