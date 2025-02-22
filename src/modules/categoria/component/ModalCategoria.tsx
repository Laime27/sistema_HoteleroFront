import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import {
  CrearCategoria,
  ObtenerCategoria,
  ActualizarCategoria,
} from "../servicio/categoriaServicio";

import { useMostrarMensaje } from "@/components/toastUtils";

interface ModalCategoriaProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categoriaId: string | null;
  actualizarLista: () => void;
}

interface CategoriaForm {
  nombre: string;
}

export default function ModalCategoria({
  isOpen,
  setIsOpen,
  categoriaId,
  actualizarLista,
}: ModalCategoriaProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoriaForm>({
    shouldUnregister: true,
  });

  const { mostrarMensaje } = useMostrarMensaje();

  const obtenerDatos = async () => {
    if (categoriaId) {
      try {
        const categoria = await ObtenerCategoria(categoriaId);
        if (categoria) {
          setValue("nombre", categoria.nombre);
        }
      } catch (error) {
        console.error("Error al obtener la categoría:", error);
        mostrarMensaje("error", "No se pudo cargar la categoría.");
      } finally {
      }
    } else {
      reset();
    }
  };

  useEffect(() => {
    if (isOpen) {
      obtenerDatos();
    }
  }, [isOpen]);

  const onSubmit = async (data: CategoriaForm) => {
    try {
      if (categoriaId) {
        await ActualizarCategoria(categoriaId, data.nombre);
        mostrarMensaje(
          "éxito",
          "La categoría se ha actualizado correctamente."
        );
      } else {
        await CrearCategoria(data.nombre);
        mostrarMensaje(
          "éxito",
          "La nueva categoría se ha creado exitosamente."
        );
      }
      actualizarLista();
      setIsOpen(false);
    } catch (error) {
      console.error("Error al guardar:", error);
      mostrarMensaje("error", "Ocurrió un error al guardar la categoría.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {categoriaId ? "Editar Categoría" : "Nueva Categoría"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {categoriaId ? "Editar la categoría" : "Crear una nueva categoría"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Label htmlFor="nombre">Nombre de la categoría</Label>

          <Input
            id="nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className={errors.nombre ? "border-red-500" : ""}
          />

          {errors.nombre && (
            <span className="text-red-500 text-sm">
              {errors.nombre.message}
            </span>
          )}

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Guardando..."
                : categoriaId
                ? "Actualizar"
                : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
