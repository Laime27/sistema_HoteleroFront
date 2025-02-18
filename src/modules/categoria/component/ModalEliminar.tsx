import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useToast } from "@/hooks/use-toast";
  import { EliminarCategoria } from "../servicio/categoriaServicio";
  
  interface ModalEliminarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    categoriaId: string | null;
    actualizarLista: () => void;
  }
  
  export default function ModalEliminar({ isOpen, setIsOpen, categoriaId, actualizarLista }: ModalEliminarProps) {
    const { toast } = useToast();
  
    const handleEliminar = async () => {
      if (!categoriaId) return;
      try {
        await EliminarCategoria(categoriaId);
        toast({
            className: "bg-green-700 text-white",
          title: "Categoría eliminada",
          description: "La categoría se ha eliminado correctamente.",
          duration: 2000,
        });
        actualizarLista();
        setIsOpen(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar la categoría.",
          variant: "destructive",
        });
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              ¿Deseas eliminar esta categoría?
            </DialogTitle>
          </DialogHeader>
  
          <DialogFooter className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleEliminar}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  