import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useToast } from "@/hooks/use-toast";
  import { EliminarNivel } from "../servicio/nivelServicio"; 
  
  interface ModalEliminarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    nivelId: string | null; 
    actualizarLista: () => void;
  }
  
  export default function ModalEliminar({
    isOpen,
    setIsOpen,
    nivelId, 
    actualizarLista,
  }: ModalEliminarProps) {
    const { toast } = useToast();
  
    const handleEliminar = async () => {
      if (!nivelId) return; 
      try {
        await EliminarNivel(nivelId); 
        toast({
          className: "bg-green-700 text-white",
          title: "Nivel eliminado",
          description: "El nivel se ha eliminado correctamente.",
          duration: 2000,
        });
        actualizarLista();
        setIsOpen(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el nivel.",
          variant: "destructive",
        });
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              ¿Deseas eliminar este nivel?
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
  