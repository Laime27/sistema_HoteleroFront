import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

interface Categoria {
  id: string;
  nombre: string;
}

interface TablaCategoriaProps {
  categorias: Categoria[];
  abrirModal: (id: string) => void;
  abrirModalEliminar: (id: string) => void;
}

function TablaCategoria({ categorias, abrirModal, abrirModalEliminar }: TablaCategoriaProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categorias.length > 0 ? (
          categorias.map((categoria) => (
            <TableRow key={categoria.id}>
              <TableCell className="font-medium">{categoria.id}</TableCell>
              <TableCell>{categoria.nombre}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => abrirModal(categoria.id)}>
                  <MdEdit />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => abrirModalEliminar(categoria.id)}
                  className="ml-2"
                >
                  <FaTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No hay categorías disponibles
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TablaCategoria;
