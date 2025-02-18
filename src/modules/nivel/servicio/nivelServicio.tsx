import axios from "@/libs/axios";

export const ListarNivel = async () => {
  try {
    const response = await axios.get("/nivel");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }
    return "Error en la conexión";
  }
};

export const CrearNivel = async (nombre: string) => {
  try {
    const response = await axios.post("/nivel", { nombre });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }
    return "Error en la conexión";
  }
};

export const ObtenerNivel = async (id: string) => {
  try {
    const response = await axios.get(`/nivel/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }
    return "Error en la conexión";
  }
};

export const ActualizarNivel = async (id: string, nombre: string) => {
  try {
    const response = await axios.put(`/nivel/${id}`, { nombre });
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }

    return "Error en la conexion";
  }
};

export const EliminarNivel = async (id: string) => {
  try {
    const response = await axios.delete(`/nivel/${id}`);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }
    return "Error en la conexión";
  }
};
