import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TablaCategoria from "./component/TablaCategoria";
import ModalCategoria from "./component/ModalCategoria";
import ModalEliminar from "./component/ModalEliminar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListarCategoria } from "./servicio/categoriaServicio";
import { Toaster } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationComponent from "./component/PaginationComponent";

export default function Categoria() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEliminar, setIsOpenEliminar] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

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
      console.log(data);
      setCategorias(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
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
          <CardTitle>Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="mb-4" onClick={() => abrirModal()}>
            Crear Categoría
          </Button>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-8 w-1/3 animate-pulse" />
                  <Skeleton className="h-8 w-1/4 animate-pulse" />
                  <Skeleton className="h-8 w-1/4 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <TablaCategoria
              categorias={categorias}
              abrirModal={abrirModal}
              abrirModalEliminar={abrirModalEliminar}
            />
          )}

          <PaginationComponent
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={setCurrentPage} 
          />
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
