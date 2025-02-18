import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface nivel {
  id: string;
  nombre: string;
}

interface TablaNivelProps {
  niveles: nivel[];
  abrirModal: (id: string) => void;
  abrirModalEliminar: (id: string) => void;
}

function TablaNivel({ niveles, abrirModal, abrirModalEliminar}: TablaNivelProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {niveles.length == 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                {" "}
                No hay datos
              </TableCell>
            </TableRow>
          ) : (
            niveles.map((nivel) => (
              <TableRow key={nivel.id}>
                <TableCell className="font-medium">{nivel.id}</TableCell>
                <TableCell>{nivel.nombre}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => abrirModal(nivel.id)}>Editar</Button>
                        <Button variant="outline" onClick={()=> abrirModalEliminar(nivel.id)} className="ml-2">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default TablaNivel;
