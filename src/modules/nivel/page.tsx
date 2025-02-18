import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TablaNivel from "./component/TablaNivel";
import ModalNivel from "./component/ModalNivel";
import { ListarNivel } from "./servicio/nivelServicio";
import ModalEliminar from "./component/ModalEliminar";

export default function Nivel() {
  const [niveles, setNiveles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [nivelId, setNivelId] = useState<string | null>(null);

  const [isOpenEliminar, setIsOpenEliminar] = useState(false);

  const abrirModal = (id: string | null = null) => {
    setNivelId(id);
    setIsOpen(true);
  }

  const abrirModalEliminar = (id: string) => {
    setNivelId(id);
    setIsOpenEliminar(true);
  }

  const obtenerListaNiveles = async () => {
    const data = await ListarNivel();
    setNiveles(data);
  };


  useEffect(() => {
    obtenerListaNiveles();
  }, []);




  return (
    <>
      <Button onClick={() => abrirModal()}>Crear Nivel</Button>

      <TablaNivel niveles={niveles} 
        abrirModal={abrirModal} 
        abrirModalEliminar={abrirModalEliminar}
      />

      <ModalNivel isOpen={isOpen} setIsOpen={setIsOpen} nivelId={nivelId} actualizarLista={obtenerListaNiveles} />

      <ModalEliminar isOpen={isOpenEliminar} setIsOpen={setIsOpenEliminar} nivelId={nivelId} actualizarLista={obtenerListaNiveles} />


    </>
  );
}
