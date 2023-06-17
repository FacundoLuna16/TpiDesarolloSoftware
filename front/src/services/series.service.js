import axios from "axios";

const urlResource = "http://localhost:4000/api/series";

async function Buscar(Titulo) {
    try {
      const resp = await axios.get(urlResource, {
        params: { Titulo },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar las series.");
    }
}
  
async function BuscarPorId(item) {
    try {
      const resp = await axios.get(urlResource + "/" + item.IdSerie);
      return resp.data.item;
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al buscar la serie por ID.");
    }
}
  
async function Grabar(item) {
    try {
      if (!item.IdSerie) {
        const resp = await axios.post(urlResource, item);
        return resp.data;
      } else {
        await axios.put(urlResource + "/" + item.IdSerie, item);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al grabar la serie.");
    }
}
  
async function Eliminar(id) {
    try {
      await axios.delete(urlResource + "/" + id);
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al eliminar la serie.");
    }
}

export const seriesService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};