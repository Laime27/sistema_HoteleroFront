import axios from "@/libs/axios";

export const ListarCategoria = async (page: number = 1) => {
  try {
    const response = await axios.get(`/categoria?page=${page}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }
    return "Error en la conexión";
  }
};

export const CrearCategoria = async (nombre: string) => {
  try {
    const response = await axios.post("/categoria", { nombre });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }
    return "Error en la conexión";
  }
};

export const ObtenerCategoria = async (id: string) => {
  try {
    const response = await axios.get(`/categoria/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }

    return "Error en la conexion";
  }
};

export const ActualizarCategoria = async (id: string, nombre: string) => {
  try {
    const response = await axios.put(`/categoria/${id}`, { nombre });
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }

    return "Error en la conexion";
  }
};

export const EliminarCategoria = async (id: string) => {
  try {
    const response = await axios.delete(`/categoria/${id}`);
    return response;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message || "Error desconocido";
    }

    return "Error en la conexion";
  }
};
