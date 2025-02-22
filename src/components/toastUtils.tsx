// useMostrarMensaje.ts
import { useToast } from "@/hooks/use-toast";

export function useMostrarMensaje() {
  const { toast } = useToast();

  const mostrarMensaje = (tipo: "éxito" | "error", mensaje: string) => {
    toast({
      title: tipo === "éxito" ? "✅ Éxito" : "❌ Error",
      description: mensaje,
      variant: tipo === "error" ? "destructive" : "default",
    });
  };

  return { mostrarMensaje };
}
