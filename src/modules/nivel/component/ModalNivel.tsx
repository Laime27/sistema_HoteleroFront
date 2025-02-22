import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CrearNivel, ObtenerNivel, ActualizarNivel} from "../servicio/nivelServicio";
import {useMostrarMensaje } from "@/components/toastUtils";


interface ModalNivelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  nivelId: string | null;
  actualizarLista: () => void;
}

interface NivelForm {
  nombre: string;
}

function ModalNivel({
  isOpen,
  setIsOpen,
  nivelId,
  actualizarLista,
}: ModalNivelProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NivelForm>({
    shouldUnregister: true,
  });
  
  const { mostrarMensaje } = useMostrarMensaje();

  const ObtenerDatoNivel = async () => {
      if(nivelId){
        const nivel = await ObtenerNivel(nivelId);
        setValue("nombre",nivel.nombre);
      }
  }

  const onSubmit = async (data: any) => {
    if (nivelId) {
      await ActualizarNivel(nivelId, data.nombre);
      mostrarMensaje("éxito", "Nivel actualizado correctamente");
    } else {
      await CrearNivel(data.nombre);
      mostrarMensaje("éxito", "Nivel creado correctamente");
    }

    actualizarLista();
    setIsOpen(false);
  };

  useEffect(()=>{
     if(isOpen){
      ObtenerDatoNivel();
     }
    
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {nivelId ? "Editar Nivel" : "Crear Nivel"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {nivelId ? "Editar Nivel" : "Crear Nivel"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>Nombre</Label>
            <Input
              type="text"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <span className="text-red-500">{errors.nombre.message}</span>
            )}

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} >
              
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Guardando..."
                  : nivelId
                  ? "Editar Nivel"
                  : "Crear Nivel"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalNivel;
